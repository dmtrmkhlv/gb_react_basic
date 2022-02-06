import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';
import {MessageList} from "../../components";
import {List, ListItem, Card, Button} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Link, useParams } from "react-router-dom";
import { addChatAction, removeChatAction } from "../../store/chats/actions";
import { deleteMessagesAction } from "../../store/messages/actions";
import {getMessagesFromReducer} from "../../store/messages/selectors";
import {getChatsFromReducer} from "../../store/chats/selectors";
import {useMessageInput} from "../../hooks/useMessageInput";

export const Chats = (props) => {

  const { chatId } = useParams();
  const chats = useSelector(getChatsFromReducer);
  const messageList = useSelector(getMessagesFromReducer);
  const{pushNewMessage, inputFocus} = useMessageInput({chatId})
  const [newChatName, setNewChatName] = useState("new chat");
  const dispatch = useDispatch();

  const addNewChat = useCallback(() => {
    dispatch(addChatAction(newChatName));
  }, [newChatName, dispatch]);


  const removeChat = (id)=>{
    dispatch(removeChatAction(id));
    dispatch(deleteMessagesAction(id))
  }

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.App}>Chats</h1>
      <Card className={styles.App}>
        <List className={styles.Chat}>
        {chats.map((chat) => {
            return <Link className={styles.Chat__link} key={chat.id} to={`/chats/${chat.id}`}>
            <ListItem style={{ backgroundColor: +chat.id === +chatId ? "#e2e2e2" : "initial" }} className={styles.Chat__item} key={chat.id}>{chat.title}
              <div onClick={()=>{removeChat(chat.id)}} className={styles.Chat__item__delete}><DeleteOutlinedIcon /></div>
            </ListItem>
        </Link> ;
              })}
          <Button variant = "outlined" onClick={addNewChat}> Add new chat </Button>
        </List>
        <div className={styles.Message__box}>
          <MessageList pushNewMessage={pushNewMessage} inputFocus={inputFocus} messageList={messageList} chatId={chatId} chats={chats}/>
        </div>
      </Card>
    </div>
  );
};
