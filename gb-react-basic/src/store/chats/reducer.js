import {ADD_CHAT_SUCCESS, ADD_CHAT_LOADING, REMOVE_CHAT, RESET_CHAT} from "./actions";


const initialState = {
  chats: [],
  isLoading: false,
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case ADD_CHAT_SUCCESS: {
      return {
        ...state,
        chats: [
          ...state.chats,
          action.payload,
        ]
      }
    }
    case REMOVE_CHAT: {
      return {
        ...state,
        chats: state.chats.filter((item) => item.id !== action.payload),
      }
    }
    case RESET_CHAT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}