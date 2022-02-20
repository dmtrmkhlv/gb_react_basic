import {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {addMessagesCommand, addMessagesTracker, addMessagesOffTracker, addMessageWithThunk} from "../store/messages/actions";
import {useMoveToLastMessage} from "./useMoveToLastMessage";


export const useMessageInput = ({chatId}) => {

    const timeId = useRef(null);
    const inputFocus = useRef(null);
    const dispatch = useDispatch();
    const {moveToLastMessage} = useMoveToLastMessage({chatId});

    useEffect(()=>{
      if(chatId)
      dispatch(addMessagesTracker(chatId));
      return() => {
        if(chatId)
        dispatch(addMessagesOffTracker(chatId))
      }
     
    },[chatId, dispatch])
  
    const pushNewMessage = useCallback((e) => {
        e.preventDefault();
   
        let message = {
          text: e.target.elements.text.value,
          author: "user"
        };
        if (message.text.length > 0) {
          e.target.reset();
          dispatch(addMessagesCommand(chatId, message));
          dispatch(addMessageWithThunk(chatId, message, timeId, moveToLastMessage))
          moveToLastMessage(chatId);
          
        }
        inputFocus.current.focus();
      }, [moveToLastMessage, chatId, dispatch]);

    return {
        pushNewMessage,
        inputFocus
    }


  }