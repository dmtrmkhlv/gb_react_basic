export const ADD_CHAT = "CHATS_ADD_CHAT";
export const REMOVE_CHAT = "CHATS_REMOVE_CHAT";

export const addChatAction = (title) => ({
  type: ADD_CHAT,
  title,
});

export const removeChatAction = (id) => ({
  type: REMOVE_CHAT,
  id,
});
