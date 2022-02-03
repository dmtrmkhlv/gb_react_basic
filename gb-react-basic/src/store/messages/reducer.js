import { ADD_MESSAGE } from "./actions";
import { nanoid } from 'nanoid';

const initialState = {
  // to be stored like this {[chatId]: [{id, text, author}]}
  messageList: {
    1: [{id: "1DbpNUXY9tYqea7hUcxQ",author: "admin", date: 1643119846117, text: "Hello…1"}]
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const currentList = state.messageList[action.chatId] || [];

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: [
            ...currentList,
            {
              id: action.chatId + nanoid(),
              author: action.author || "user",
              text: action.message,
              date: new Date(),
            },
          ],
        },
      };
    }
    default:
      return state;
  }
};
