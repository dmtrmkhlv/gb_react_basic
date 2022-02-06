import {useCallback, useRef} from 'react';
import {useDispatch} from "react-redux";
import {addMessageWithThunk} from "../store/messages/actions";
import {useMoveToLastMessage} from "./useMoveToLastMessage";


export const useMessageInput = ({chatId}) => {

    const timeId = useRef(null);
    const inputFocus = useRef(null);
    const dispatch = useDispatch();
    const {moveToLastMessage} = useMoveToLastMessage({chatId});
  
    const pushNewMessage = useCallback((e) => {
        e.preventDefault();
    
        let message = e.target.elements.text.value;
        if (message.length > 0) {
          e.target.reset();
          dispatch(addMessageWithThunk(chatId, message, timeId));
          moveToLastMessage(chatId)
        }
        inputFocus.current.focus();
      }, [moveToLastMessage, chatId, dispatch]);

    return {
        pushNewMessage,
        inputFocus
    }
  }