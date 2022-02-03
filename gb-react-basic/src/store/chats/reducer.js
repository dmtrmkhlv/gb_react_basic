import { ADD_CHAT, REMOVE_CHAT } from "./actions";
import { nanoid } from 'nanoid';

const initialState = {
  chatList: [
    {
        id:"1",
        title: "chat #1",
      },
      {
        id:"2",
        title: "chat #2",
      },
      {
        id:"3",
        title: "chat #3",
      }
  ],
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        chatList: [
          ...state.chatList,
          {
            id: `id${nanoid()}`,
            title: action.title,
          },
        ],
      };
      case REMOVE_CHAT:
          return{
              ...state,
              chatList: [...state.chatList.filter((chat)=>chat.id !== action.id)]
          }
    default:
      return state;
  }
};