import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { userReducer } from "./Reducer/UserInfoReducer";
import { settingReducer } from "./Reducer/SettingsReducer";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";

const persistConfig = {
  key: "chess_store",
  keyPrefix: "",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  User: userReducer,
  setting: settingReducer,
});
export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
