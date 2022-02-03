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

  const getTail = ((array) => {
    return array[array?.length - 1];
  });

  const authorIs = ((name, message) => {
    return name === message.author;
  });

  const pushNewMessage = useCallback((e) => {
    e.preventDefault();
    let message = e.target.elements.text.value;
    if (message.length > 0) {
      e.target.reset();
      inputFocus.current.focus();
      dispatch(addMessageAction(chatId, message));
      let scrollToBottom = document.querySelector(`[data-chat='${chatId}']`);
      scrollToBottom.scrollIntoView(false);

      if (authorIs("user", getTail((messageList[chatId])))) {
        if (timeId.current) {
          clearTimeout(timeId.current);
        }
        timeId.current = setTimeout(() => {
          dispatch(addMessageAction(chatId, "Hello! We have received your message and will reply soon.", "admin"));
        }, 1500);
      }
    }
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
