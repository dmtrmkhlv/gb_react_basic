import {useEffect, Fragment} from 'react';
import { useDispatch, useSelector  } from "react-redux";
import { getIsAuth, initAuthAction } from "../../store/user/reducer";
import styles from './../../styles/App.module.css';
import { Home, Chats, Profile, Gists, Login, SingUp} from "./../../routes";
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import { PublicRoute, PrivateRoute } from "../../hocs";
import {getHomeLink, getProfileLink, getChatsByIdLink, getChats, getGists, getSingUp, getLogin} from "../../navigation";
import {Button, ButtonGroup} from '@mui/material';
export const AllRoutes = () => {

  const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(initAuthAction);
  }, []);
  
    return (
        <BrowserRouter>
        <Fragment>
          <header className={styles.Wrapper}>
            <ButtonGroup className={styles.App + " " + styles.Header__app} variant="contained" aria-label="outlined primary button group">
              <Link className={styles.Header__link} to="/">
                <Button className={styles.Header__button}>Home</Button>
              </Link>  
              <Link className={styles.Header__link} to="/profile">
                <Button className={styles.Header__button}>Profile</Button>
              </Link>
              <Link className={styles.Header__link} to="/chats">
                <Button className={styles.Header__button}>Chats</Button>
              </Link>
              <Link className={styles.Header__link} to="/gists">
                <Button className={styles.Header__button}>Gists</Button>
              </Link>
              <Link className={styles.Header__link} to="/SingUp">
                <Button className={styles.Header__button}>Registration</Button>
              </Link>
              <Link className={styles.Header__link} to="/login">
                <Button className={styles.Header__button}>Login</Button>
              </Link>
            </ButtonGroup>
          </header>

          <Routes>
            <Route exact path={getHomeLink()} element={< Home />}></Route>
            <Route exact path={getChatsByIdLink()} element={< Chats/>}></Route>
            <Route exact path={getChats()} element={< Chats/>}></Route>
            <Route exact path={getGists()} element={< Gists/>}></Route>
            <Route
              path={getProfileLink()}
              element={
                <PrivateRoute auth={isAuth} redirectTo="/login">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path={getSingUp()}
              element={
                <PublicRoute auth={isAuth} redirectTo="/profile">
                  <SingUp />
                </PublicRoute>
              }
            />
            <Route
              path={getLogin()}
              element={
                <PublicRoute auth={isAuth} redirectTo="/profile">
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
          </Fragment>
        </BrowserRouter>
    );
  };
  
  