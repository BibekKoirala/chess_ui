import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore
} from 'redux-persist';
import { combineReducers } from "redux";
import { userReducer } from "./Reducer/UserInfoReducer";

const persistConfig = {
    key: 'chess_store',
    keyPrefix: '',
    storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({User: userReducer}))
export const store = configureStore({reducer: persistedReducer});

export const persistor = persistStore(store);