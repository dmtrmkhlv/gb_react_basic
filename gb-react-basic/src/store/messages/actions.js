import {messagesRef} from "../../services/firebase";
import { nanoid } from 'nanoid';
export const ADD_MESSAGE = 'MESSAGES_ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES_DELETE_MESSAGE';
export const CHANGE_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT';
export const REMOVE_ALL_MESSAGES_BY_CHAT_ID = 'REMOVE_ALL_MESSAGES_BY_CHAT_ID'


export const addMessageAction = (chatId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    message
  },
});

export const deleteMessagesAction = (messageId) => ({
  type: DELETE_MESSAGE,
  messageId
});

export const deleteAllMessagesByChatIdAction = (chatId) => ({
  type: REMOVE_ALL_MESSAGES_BY_CHAT_ID,
  payload: chatId
});

export const changeMessage = (chatId,messageId, text) => ({
  type: CHANGE_MESSAGE_TEXT,
  payload: {
    chatId,
    id: messageId,
    text
  }
})

export const addMessageWithThunk = (chatID, message, timeId, moveToLastMessage) => (dispatch, getState) => {
  // dispatch(addMessageAction(chatId, message));

  if (message.author !== "admin") {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    message.text = "Hello! We have received your message and will reply soon.";
    message.author = "admin";
    message.id = nanoid();
   timeId.current = setTimeout(() => {
     dispatch(addMessageAction(chatID, message));
     moveToLastMessage(chatID);
    }, 1500);
}
}

export const addMessagesCommand = (chatID, message) => () => {
  messagesRef.child(chatID).push(message, (error) => {
    if (error) {
      console.log(error);
    }
  })
}

export const addMessagesTracker = (chatID) => (dispatch) => {
  messagesRef.child(chatID).on('child_added', (snapshot) => {
    let message = snapshot.val();
    message.id = snapshot.key;
    dispatch(addMessageAction(chatID, message));
  })
}

export const addMessagesOffTracker = (chatID) =>  (dispatch) => {
  dispatch(deleteAllMessagesByChatIdAction(chatID));
  messagesRef.child(chatID).off('child_added');
}

export const removeMessagesCommand = () => {

}
export const removeMessagesTracker = () => {}
export const removeMessagesOffTracker = () => {}


export const changeMessagesCommand = (chatID,messageId, text) => (dispatch)=> {
  messagesRef.child(chatID).child(messageId).update({
    text
  }, (error) => {
    if (error) {
      console.log(error);
    }
  })
}
export const changeMessagesTracker = (chatID) => (dispatch) => {
  messagesRef.child(chatID).on('child_changed', (snapshot) => {
    dispatch(changeMessage(chatID, snapshot.key, snapshot.val().text));
  })
}
export const changeMessagesOffTracker = (chatID) => () => {
  messagesRef.child(chatID).off('child_changed')
}