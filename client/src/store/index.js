import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";

const DEFAULT_STATE = {
  error: { message: null },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk.default),
  devTools: process.env.NODE_ENV !== "production",
});
