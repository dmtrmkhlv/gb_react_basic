import {useSelector} from "react-redux";
import {useParams } from "react-router-dom";
import {NoChat} from "../components";
import {getChats} from "../store/chats/selectors";

export const chatIsExist = (MessageList) => {

  return (props) => {
    const { chatId } = useParams();
    const chats = useSelector(getChats);

    const checkChatId = ((array, searchId)=>{
      return array.find((chat) => chat.id === searchId);
    });
  
    if(chatId && checkChatId(chats, chatId)){
      return <MessageList {...props}/>
    }
    if(chatId && !checkChatId(chats, chatId)){
      return <NoChat text={`chat #${chatId} doesn't exist`}/>;
    }
    if(!chatId){
      return <NoChat text={`Please select chat`}/>;
    }
  }

};