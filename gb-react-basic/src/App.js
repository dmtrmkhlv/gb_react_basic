import './App.css';
import {useState, useEffect} from 'react';
import {Message} from "./components";

function App() {
  const [messageList, setMessageList] = useState([]);
  const [timeId, setTimeId] = useState();

  useEffect(() => {
    if (messageList.length === 0) {
      return;
    }
    if (messageList[messageList.length - 1].author !== "admin") {
      if (timeId) {
        clearTimeout(timeId);
      }
      setTimeId(setTimeout(() => {
        setMessageList([
          ...messageList, {
            author: "admin",
            text: "Hello! We have received your message and will reply soon.",
            date: Date.now()
          }
        ]);
      }, 1500));
    }
  }, [messageList]);

  return (
    <div className="Wrapper">
      <div className="App">
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
            }
          }}>
            <input name="text" type="text"/>
            <button >Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
