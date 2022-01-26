import {useState} from 'react';
import styles from '../../styles/App.module.css';
import {MessageList, NoChat} from "../../components";
import {List, ListItem, Card, Button} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { nanoid } from 'nanoid';
import {Link, useParams } from "react-router-dom";


export const Chats = (props) => {

  const { chatId } = useParams();
  const chatList = [
    {
      id:nanoid(),
      title: "chat #1",
      messages: [{author: "admin", date: 1643119846117, text: "Hello…1"}]
    },
    {
      id:2,
      title: "chat #2",
      messages: [{author: "admin", date: 1643119846117, text: "Hello…2"}]
    },
    {
      id:3,
      title: "chat #3",
      messages: [{author: "admin", date: 1643119846117, text: "Hello…3"}]
    }
  ];

  const [chats, setChats] = useState(chatList);
  const checkChatId = ((array, searchId)=>{
    return array.find((chat) => chat.id == searchId);
  });

  const addNewChat = ()=>{
    setChats([...chats, {
      id:nanoid(),
      title: "new chat",
      messages: []
    }])
  }

  const removeChat = (id)=>{
    setChats([...chats.filter((chat)=>chat.id != id)]);
  }

  let messageList;
  if(chatId && checkChatId(chats, chatId)){
    messageList = <MessageList chats={chats} chatId={chatId}/>
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
            <ListItem style={{ backgroundColor: chat.id == chatId ? "#e2e2e2" : "initial" }} className={styles.Chat__item} key={chat.id}>{chat.title}
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
