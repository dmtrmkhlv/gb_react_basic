export const ADD_MESSAGE = 'MESSAGES_ADD_MESSAGE';

export const addMessageAction = (chatId, message, author) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
  author,
});