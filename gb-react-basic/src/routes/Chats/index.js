import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/App.module.css';
import {MessageList, NoChat} from "../../components";
import {List, ListItem, Card, Button} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Link, useParams } from "react-router-dom";
import { addChatAction, removeChatAction } from "../../store/chats/actions";

export const Chats = (props) => {

  const { chatId } = useParams();
  const chats = useSelector((state) => state.chats.chatList);
  const [newChatName, setNewChatName] = useState("new chat");
  const dispatch = useDispatch();

  const checkChatId = ((array, searchId)=>{
    return array.find((chat) => chat.id === searchId);
  });

  const addNewChat = useCallback(() => {
    dispatch(addChatAction(newChatName));
  }, [newChatName, dispatch]);


  const removeChat = (id)=>{
    dispatch(removeChatAction(id));
  }

  let messageList;
  
  if(chatId && checkChatId(chats, chatId)){
    messageList = <MessageList chatId={chatId}/>
  }
  if(chatId && !checkChatId(chats, chatId)){
    messageList = <NoChat text={`chat #${chatId} doesn't exist`}/>;
  }
  if(!chatId){
    messageList = <NoChat text={`Please select chat`}/>;
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
          {messageList}
        </div>
      </Card>
    </div>
  );
};
