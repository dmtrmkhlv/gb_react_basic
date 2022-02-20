import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactJson from "react-json-view";
import styles from '../../styles/App.module.css';
import {getProfilesFromReducer} from "../../store/profile/selectors";
import { changeProfileStatusAction } from "../../store/profile/actions";
import { getUser } from "../../store/user/reducer";

export const Profile = (props) => {
  const user = useSelector(getUser);

  const { isShow, name } = useSelector(getProfilesFromReducer);

  const dispatch = useDispatch();

  const setShowName = useCallback(() => {
    dispatch(changeProfileStatusAction());
  }, [dispatch]);

  return (
    <div className={styles.Wrapper + " " + styles.Profile}>
        <h1 className={styles.App}>Profile</h1>
        <div className={styles.App}>
        {<label>{name}</label>}
          <input 
            type="checkbox" 
            name="showProject" 
            id="showProject"
            checked={isShow}
            value={isShow}
            onChange={setShowName}
          ></input>
          <span>{isShow ? "on" : "off"}</span>
        </div>
        <div className={styles.App}>
          <ReactJson src={user?.toJSON()} />
        </div>
    </div>
  );
};