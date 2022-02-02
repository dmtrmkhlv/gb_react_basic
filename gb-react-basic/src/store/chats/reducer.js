import { ADD_CHAT } from "./actions";
import { nanoid } from 'nanoid';

const initialState = {
  chatList: [],
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
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};