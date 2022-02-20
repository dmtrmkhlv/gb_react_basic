import {
  CHANGE_NAME_PROFILE,
  CHANGE_STATUS_PROFILE,
  REMOVE_PROFILE
} from "./actions";

export const initialState = {
    name: "Profile #1",
    isShow: true
}

export const profileReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CHANGE_STATUS_PROFILE: {
      return {
          ...state,
          isShow: !state.isShow,
      }
    }
    case CHANGE_NAME_PROFILE: {
      return {
          ...state,
          name: action.payload,
      }
    }
    case REMOVE_PROFILE: {
      return {};
    }
    default: {
      return state;
    }
  }
}