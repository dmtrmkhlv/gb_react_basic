import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';
import {selectGists, selectGistsError, selectGistsLoading} from "../../store/gists/selectors";
import { getAllGists } from "../../store/gists/actions";

export const Gists = (props) => {

   const dispatch = useDispatch();
   const gists = useSelector(selectGists);
   const error = useSelector(selectGistsError);
   const loading = useSelector(selectGistsLoading);

  const requestGists = () => {
    dispatch(getAllGists());
  };

  useEffect(() => {
    requestGists();
  }, []);

  const reload = ()=>{
    requestGists();
  }

  const renderGist = useCallback(
    (gist) => 
      <div key={gist.id} className={styles.App}>
        <p >Name: {gist.name} </p>
        <p >Year: {gist.year} </p>
        <p >Color: {gist.color} </p>
        <p >Value: {gist.pantone_value}</p>
      </div>
    ,
    []
  );

  return (
    <div className={styles.Wrapper + " " + styles.Profile}>
        <h1 className={styles.App}>Gists</h1>
        {
          error && <div className={styles.App}>
            <p>Loading Error!</p>
          <button onClick={reload}>Reload</button>
          </div>
        }
        {
        loading == 1 && <p className={styles.App}>Loading...</p>
      }
        {gists?.data?.map(renderGist)}
    </div>
  );
};