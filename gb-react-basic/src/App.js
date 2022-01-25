import './App.css';
import {useState, useEffect, useRef} from 'react';
import {Message} from "./components";
import {Button, List, ListItem, Card} from '@mui/material';
import { nanoid } from 'nanoid';

function App() {
  const timeId = useRef(null);
  const inputFocus = useRef(null);
  const [messageList, setMessageList] = useState([]);
  const chatList = [
    {
      id:nanoid(),
      name: "chat #1"
    },
    {
      id:nanoid(),
      name: "chat #2"
    },
    {
      id:nanoid(),
      name: "chat #3"
    }
  ];

  const getTail = ((array)=>{
    return array[array.length - 1];
  });

  const authorIs = ((name, message)=>{
    return name === message.author;
  });

  useEffect(() => {
    inputFocus.current.focus();
    if (messageList.length === 0) {
      return;
    }
    // if (messageList[messageList.length - 1].author !== "admin") {
    if (authorIs("user", getTail((messageList) ))) {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
      timeId.current = setTimeout(() => {
        setMessageList([
          ...messageList, {
            author: "admin",
            text: "Hello! We have received your message and will reply soon.",
            date: Date.now()
          }
        ]);
      }, 1500);
    }
  }, [messageList]);

  return (
    <div className="Wrapper">
      <Card className="App">
        <List className='Chat'>
        {chatList.map((chat) => {
                return <ListItem className='Chat__item' key={chat.id}>{chat.name}</ListItem>
              })}
        </List>
        <div className='Message__box'>
          <div className='Message__wrapper'>
            <div className='Message__list'>
              {messageList.map((message) => {
                return <Message key={message.date} message={message}/>
              })}
            </div>
          </div>
          <form
            className='Message__form'
            onSubmit={(e) => {
            e.preventDefault();
            if (e.target.elements.text.value.length > 0) {
              setMessageList([
                ...messageList, {
                  author: "user",
                  text: e.target.elements.text.value,
                  date: Date.now()
                }
              ]);
              e.target.reset();
              inputFocus.current.focus();
            }
          }}>
            <input ref={inputFocus} name="text" type="text"/>
            <Button type="submit" variant="contained">Send</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default App;
