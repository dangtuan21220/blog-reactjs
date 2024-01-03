import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { authSlice } from "./slice/auth";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export type RootStore = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
