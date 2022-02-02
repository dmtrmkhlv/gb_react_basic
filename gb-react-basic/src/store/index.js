import { createStore, combineReducers } from 'redux';
import {profileReducer} from "./profile/reducer.js";
import {chatsReducer} from "./chats/reducer.js";
import {messagesReducer} from "./messages/reducer.js";

export const store = createStore(
    combineReducers({
        profile: profileReducer,
        chats: chatsReducer,
        messages: messagesReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&                        
    window.__REDUX_DEVTOOLS_EXTENSION__()
);