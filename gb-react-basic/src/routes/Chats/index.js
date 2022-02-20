import {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';
import {MessageList} from "../../components";
import {List, ListItem, Card, Button} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Link, useParams } from "react-router-dom";
import { addChatAction, addChatTracker, addChatOffTracker, removeChatCommand, removeChatTracker, removeChatOffTracker} from "../../store/chats/actions";
import { deleteMessagesAction } from "../../store/messages/actions";
import {getMessages} from "../../store/messages/selectors";
import {getChats} from "../../store/chats/selectors";
import {useMessageInput} from "../../hooks/useMessageInput";
import {useMoveToLastMessage} from "../../hooks/useMoveToLastMessage";

export const Chats = (props) => {

  const { chatId } = useParams();
  const chats = useSelector(getChats);
  const messages = useSelector(getMessages);
  const{pushNewMessage, inputFocus} = useMessageInput({chatId});
  const {moveToLastMessage} = useMoveToLastMessage({chatId});
  const [newChatName, setNewChatName] = useState("new chat");
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(addChatTracker);
    dispatch(removeChatTracker);
    return()=>{
      dispatch(addChatOffTracker);
      dispatch(removeChatOffTracker);
    }
  },[dispatch])

  const addNewChat = useCallback(() => {
    dispatch(addChatAction({title: newChatName}));
  }, [newChatName, dispatch]);


  const removeChat = (id)=>{
    dispatch(removeChatCommand(id));
    dispatch(deleteMessagesAction(id))
  }

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.App}>Chats</h1>
      <Card className={styles.App}>
        <List className={styles.Chat}>
        {chats.map((chat) => {
            return <Link className={styles.Chat__link} key={chat.id} to={`/chats/${chat.id}`}>
            <ListItem onClick={()=>{moveToLastMessage(chat.id)}} style={{ backgroundColor: +chat.id === +chatId ? "#e2e2e2" : "initial" }} className={styles.Chat__item} key={chat.id}>{chat.title}
              <div onClick={()=>{removeChat(chat.id)}} className={styles.Chat__item__delete}><DeleteOutlinedIcon /></div>
            </ListItem>
        </Link> ;
              })}
          <Button variant = "outlined" onClick={addNewChat}> Add new chat </Button>
        </List>
        <div className={styles.Message__box}>
          <MessageList pushNewMessage={pushNewMessage} inputFocus={inputFocus} messages={messages} chatId={chatId} chats={chats}/>
        </div>
      </Card>
    </div>
  );
};
