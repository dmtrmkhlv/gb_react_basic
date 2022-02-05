import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {profileReducer} from "./profile/reducer.js";
import {chatsReducer} from "./chats/reducer.js";
import {messagesReducer} from "./messages/reducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({
        profile: profileReducer,
        chats: chatsReducer,
        messages: messagesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);