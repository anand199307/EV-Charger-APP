import { configureStore } from "@reduxjs/toolkit";
import TableItems from "./slices/TableSlice";
import Authdetails from "./slices/AuthSlice";
import UserDetails from "./slices/UserSlice";
import storage from "redux-persist/lib/storage";
import hostReducer from "./slices/HostSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/FormSlice";

export const persistConfig = {
  key: "root",
  storage,

  // whitelist: ["persist:root"],

    whitelist: ["Authdetails", "hostReducer"],
};

const rootReducer = combineReducers({
  tableCart: TableItems,
  user: UserDetails,
  form: formReducer,
  auth: Authdetails,
  // host: Hostdetails,
  host: hostReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
