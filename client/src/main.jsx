import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./containers/App.jsx";
import React from "react";
import { Provider } from "react-redux";
import api from "./services/api";
import { store } from "./store";
import { setCurrentUser, addError } from "./store/actions/index.js";
import { setToken } from "./services/api";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

//Check for jwt token in local storage before rendering
// if (localStorage.jwtToken) {
//   setToken(localStorage.jwtToken);
//   try {
//     //jwtDecode used instead of decode
//     store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
//   } catch (err) {
//     store.dispatch(setCurrentUser({}));
//     store.dispatch(addError(err));
//   }
// }
if (localStorage.jwtToken) {
  try {
    const decodedToken = jwtDecode(localStorage.jwtToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      console.warn("JWT expired, logging out.");
      localStorage.removeItem("jwtToken");
    } else {
      store.dispatch(setCurrentUser(decodedToken));
    }
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    localStorage.removeItem("jwtToken");
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
