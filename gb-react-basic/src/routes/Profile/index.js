import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';

import { changeProjectAction } from "../../store/profile/actions";

export const Profile = (props) => {
  const { isShow, name } = useSelector((state) => state);

  const dispatch = useDispatch();

  const setShowName = useCallback(() => {
    dispatch(changeProjectAction());
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
    </div>
  );
};