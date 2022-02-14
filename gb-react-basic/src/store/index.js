import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import {profileReducer} from "./profile/reducer.js";
import {chatsReducer} from "./chats/reducer.js";
import {messagesReducer} from "./messages/reducer.js";
import {gistsReducer} from "./gists/reducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// создаем объект конфигурации для persist
const persistConfig = {
    key: 'root',
    storage,
  }

// комбинируем редьюсеры
const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    gists: gistsReducer
});

// оборачиваем редьюсеры в persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// создаем store с использованием persistedReducer
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

// создаем persistor
export const persistor = persistStore(store);