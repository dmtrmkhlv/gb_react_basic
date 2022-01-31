import styles from './styles/App.module.css';
import {Home, Chats, Profile} from "./routes";
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import {getHomeLink, getProfileLink, getChatsByIdLink, getChats} from "./navigation";
import {Button, ButtonGroup} from '@mui/material';
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>

    <BrowserRouter>
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
        </ButtonGroup>
      </header>

      <Routes>
        <Route exact path={getHomeLink()} element={< Home />}></Route>
        <Route path={getProfileLink()} element={< Profile />}></Route>
        <Route exact path={getChatsByIdLink()} element={< Chats/>}></Route>
        <Route exact path={getChats()} element={< Chats/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
