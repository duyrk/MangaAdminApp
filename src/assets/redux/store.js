import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mangaReducer from "./mangaSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
  manga: mangaReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: {
    persistedReducer,
  },
});
