import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Message} from "../";
import styles from '../../styles/App.module.css';
import {Button} from '@mui/material';
import {addMessageAction} from "../../store/messages/actions";
import {getMessagesFromReducer} from "../../store/messages/selectors";

export const MessageList = (props) => {
  const messageList = useSelector(getMessagesFromReducer);
  const chatId = props.chatId;
  const dispatch = useDispatch();

  const timeId = useRef(null);
  const inputFocus = useRef(null);

  const addMessageWithThunk = (chatId, message, e) => (dispatch, getState) => {
    dispatch(addMessageAction(chatId, message));
    setTimeout(() => {e.target.parentNode.firstChild.firstChild.scrollIntoView({block: "end", behavior: "smooth"});
     }, 0);
    if (message.author !== "admin") {
        if (timeId.current) {
          clearTimeout(timeId.current);
        }
       const botMessage = "Hello! We have received your message and will reply soon.";
       timeId.current = setTimeout(() => {
         dispatch(addMessageAction(chatId, botMessage, "admin"));
         e.target.parentNode.firstChild.firstChild.scrollIntoView({block: "end", behavior: "smooth"});
        }, 1500);
    }
  }

  const pushNewMessage = useCallback((e) => {
    e.preventDefault();
    let message = e.target.elements.text.value;
    if (message.length > 0) {
      e.target.reset();
      dispatch(addMessageWithThunk(chatId, message, e));
    }
    inputFocus.current.focus();
  }, [dispatch]);

  return ( 
    <> 
      <div className={styles.Message__wrapper}>
        <div data-chat={chatId} className={styles.Message__list}>
          {messageList[chatId]?.map((message) => {
              return <Message key={message.id} message={message}/>
            })}
        </div>
      </div> 
      <form className = {styles.Message__form} onSubmit = {pushNewMessage} > 
        <input ref={inputFocus} name="text" type="text"/> 
        <Button type = "submit" variant = "contained" > Send </Button>
      </form > 
    </>
  );
};
