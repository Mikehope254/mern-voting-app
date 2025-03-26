//import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index.js";

const DEFAULT_STATE = {
  error: { message: null },
};

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunk.default),
//   devTools: process.env.NODE_ENV !== "production",
// });

export const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
