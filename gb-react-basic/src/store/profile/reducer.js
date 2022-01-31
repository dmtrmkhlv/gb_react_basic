import {CHANGE_PROJECT} from "./actions";

const initialState = {
  name: "Profile #1",
  isShow: true
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PROJECT: {
      return {
          ...state,
          isShow: !state.isShow,
      }
    }
    default: {
      return state;
    }
  }
}