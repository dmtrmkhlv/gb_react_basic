export const ADD_MESSAGE = 'MESSAGES_ADD_MESSAGE';

export const addMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
});