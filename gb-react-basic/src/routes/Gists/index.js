import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';
import {selectGists, selectGistsError, selectGistsLoading} from "../../store/gists/selectors";
import { getAllGists } from "../../store/gists/actions";

export const Gists = (props) => {

  //  const initialState = {
  //   page: 1,
  //   per_page: 6,
  //   total: 12,
  //   total_pages: 0,
  //   data: [],
  // }

  //  const [gists, setGists] = useState(initialState);
  //  const [error, setError] = useState(false);
  //  const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const gists = useSelector(selectGists);
   const error = useSelector(selectGistsError);
   const loading = useSelector(selectGistsLoading);

  //  const reset = () => {
  //   setGists(initialState);
  // }

  const requestGists = () => {
    dispatch(getAllGists());
  };


  //  const requestGists = async () => {
  //   setLoading(true);
  //   setError(false);

  //   try {
  //     const response = await fetch(API_URL_PUBLIC);

  //     if (!response.ok) {
  //       throw new Error(`Request failed with status ${response.status}`);
  //     }

  //     const result = await response.json();

  //     setGists(result);
  //   } catch (err) {
  //     setError(true);
  //     console.warn(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    requestGists();
  }, []);

  const reload = ()=>{
    // reset();
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
        loading && <p className={styles.App}>Loading...</p>
      }
        {gists?.data?.map(renderGist)}
    </div>
  );
};