import {useState, useEffect, useRef} from 'react';
import {Message} from "../";
import styles from '../../styles/App.module.css';
import {Button} from '@mui/material';

export const MessageList = (props) => {
  let chatList = props.chats;
  let chatId = props.chatId;
  const [chats, setChats] = useState(chatList);
  const timeId = useRef(null);
  const inputFocus = useRef(null);
  const getTail = ((array) => {
    return array[array.length - 1];
  });

  const authorIs = ((name, message) => {
    return name === message.author;
  });

  const getIndexOf = ((array, searchId) => {
    return array.indexOf(array.find((chat) => chat.id == searchId));
  })

  const pushNewMessage = (array, chatId, newMessage) => {
    let currentChatMessages = array.find((chat) => chat.id == chatId).messages;
    currentChatMessages = [
      ...currentChatMessages,
      newMessage
    ];
    let currentIndex = array.indexOf(array.find((chat) => chat.id == chatId));
    let newChats = [...array];
    newChats[currentIndex].messages = currentChatMessages;
    return newChats;
  }

  useEffect(()=>{
    setChats([...chatList]);
  },[chatList])

  useEffect(() => {
    if (inputFocus.current){
      inputFocus.current.focus();
    }
    let currentMessageArr = chats[getIndexOf(chats, chatId)].messages;
    if (currentMessageArr.length === 0) {
      return;
    }

    if (authorIs("user", getTail((currentMessageArr)))) {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
      timeId.current = setTimeout(() => {
        setChats(pushNewMessage(chats, chatId, {
          author: "admin",
          text: "Hello! We have received your message and will reply soon.",
          date: Date.now()
        }))
      }, 1500);
    }
    let scrollToBottom = document.querySelector(`[data-chat='${chatId}']`);
    scrollToBottom.scrollIntoView(false);
  }, [chats]);

  return ( 
  <> 
    <div className={styles.Message__wrapper}>
        <div data-chat={chatId} className={styles.Message__list}>
        {chats.find((chat) => chat.id == chatId).messages.map((message) => {
            return <Message key={message.date} message={message}/>
            })}
        </div>
    </div> 
    <form className = {styles.Message__form}
        onSubmit = {(e) => {
            e.preventDefault();
            if (e.target.elements.text.value.length > 0) {
                setChats(pushNewMessage(chats, chatId, {
                author: "user",
                text: e.target.elements.text.value,
                date: Date.now()
                }));
                e.target.reset(); 
                inputFocus.current.focus();
            }
        }
        } > 
    <input ref={inputFocus} name="text" type="text"/> 
    <Button type = "submit" variant = "contained" > Send </Button>
    </form > 
</>);
};
