import { 
  ADD_MESSAGE,
  DELETE_MESSAGE,
  CHANGE_MESSAGE_TEXT,
  REMOVE_ALL_MESSAGES_BY_CHAT_ID
 } from "./actions";

const initialState = {
  // to be stored like this {[chatId]: [{id, text, author}]}
  messages: {
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
       const currentMessageList = state.messages[action.payload.chatId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: [
            ...currentMessageList,
            action.payload.message,
          ],
        },
      };
    }
    case DELETE_MESSAGE:{
      const copyMessages = {...state.messages};

      delete copyMessages[action.payload];
      return {
        ...state,
        messages: copyMessages,
      }
    }
    case REMOVE_ALL_MESSAGES_BY_CHAT_ID: {

      const copyMessages = {...state.messages};

      delete copyMessages[action.payload];

      return {
        ...state,
        messages: copyMessages,
      }
    }
    default:
      return state;
  }
};
