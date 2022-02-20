export const getChatsFromReducer = (state) => state.chats;
export const getChats = (state) => getChatsFromReducer(state).chats;
export const getChatsIsLoading = (state) => getChatsFromReducer(state).isLoading;
export const hasChatSelector = (chatID) => (state) => getChats(state).findIndex(({id}) => id.toString() === chatID) !== -1;