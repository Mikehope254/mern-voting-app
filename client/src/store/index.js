import { configureStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index.js";

const DEFAULT_STATE = {
  error: { message: null },
};

export const store = configureStore(rootReducer, DEFAULT_STATE);
