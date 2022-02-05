export const ADD_MESSAGE = 'MESSAGES_ADD_MESSAGE';

export const addMessageAction = (chatId, message, author) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
  author,
});

export const addMessageWithThunk = (chatId, message, scrollToBottom, timeId) => (dispatch, getState) => {
  dispatch(addMessageAction(chatId, message));
  setTimeout(() => {scrollToBottom.scrollIntoView({block: "end", behavior: "smooth"});
   }, 0);
  if (message.author !== "admin") {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
     const botMessage = "Hello! We have received your message and will reply soon.";
     timeId.current = setTimeout(() => {
       dispatch(addMessageAction(chatId, botMessage, "admin"));
       scrollToBottom.scrollIntoView({block: "end", behavior: "smooth"});
      }, 1500);
  }
}