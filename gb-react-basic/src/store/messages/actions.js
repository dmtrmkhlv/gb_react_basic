export const ADD_MESSAGE = 'MESSAGES_ADD_MESSAGE';
export const DELETE_MESSAGES = 'MESSAGES_DELETE_MESSAGES';

export const addMessageAction = (chatId, message, author) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
  author,
});

export const deleteMessagesAction = (chatId) => ({
  type: DELETE_MESSAGES,
  chatId
});

export const addMessageWithThunk = (chatId, message, timeId) => (dispatch, getState) => {
  dispatch(addMessageAction(chatId, message));

  if (message.author !== "admin") {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
     const botMessage = "Hello! We have received your message and will reply soon.";
     timeId.current = setTimeout(() => {
       dispatch(addMessageAction(chatId, botMessage, "admin"));
      }, 1500);
  }
}