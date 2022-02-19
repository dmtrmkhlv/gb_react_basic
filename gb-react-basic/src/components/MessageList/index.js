import {Message} from "../Message";
import styles from '../../styles/App.module.css';
import {Button} from '@mui/material';
import {chatIsExist} from "../../hocs"

const MessageListRender= (props) => {
  const chatId = props.chatId;
  const messages = props.messages.messages;
  const pushNewMessage = props.pushNewMessage;
  const inputFocus = props.inputFocus;

  return ( 
    <> 
      <div className={styles.Message__wrapper}>
        <div data-chat={chatId} className={styles.Message__list}>
          {messages[chatId]?.map((message) => {
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

export const MessageList = chatIsExist(MessageListRender);