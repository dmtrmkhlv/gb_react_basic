import {chatRef} from "../../services/firebase"

export const ADD_CHAT_FAIL = 'ADD_CHAT_FAIL'
export const ADD_CHAT_SUCCESS = 'ADD_CHAT_SUCCESS'
export const ADD_CHAT_LOADING = 'ADD_CHAT_LOADING'
export const REMOVE_CHAT = 'REMOVE_CHAT'
export const RESET_CHAT = 'RESET_CHAT'

export const resetChats = () => ({
  type: RESET_CHAT,
})

export const addChatFailAction = (error) => ({
  type: ADD_CHAT_FAIL,
  payload: error
})

export const addChatLoadingAction = (isLoading) => ({
  type: ADD_CHAT_LOADING,
  payload: isLoading
})

export const addChatSuccessAction = (chat) => ({
  type: ADD_CHAT_SUCCESS,
  payload: chat
})

export const removeChatAction = (chatID) => ({
  type: REMOVE_CHAT,
  payload: chatID
})

export const addChatAction = (chat) => (dispatch) => {
  chatRef.push(chat, (error) => {
    if (error) {
      dispatch(addChatFailAction(error));
    }
  })
}

export const addChatTracker = (dispatch) => {
  chatRef.on('child_added', (snapshot) => {
    dispatch(addChatSuccessAction({
      ...snapshot.val(),
      id: snapshot.key,
    }))
  })
}

export const addChatOffTracker = (dispatch) => {
  dispatch(resetChats());
  chatRef.off('child_added');
}


export const removeChatCommand = (chatId) => (dispatch) =>{
  chatRef.child(chatId).remove((error) => {
    if (error) {
      dispatch(addChatFailAction(error));
    }
  })
}

export const removeChatTracker = (dispatch) => {
  chatRef.on('child_removed', (snapshot) => {
    dispatch(removeChatAction(snapshot.key))
  })
}

export const removeChatOffTracker = () => {
  chatRef.off('child_removed');
}