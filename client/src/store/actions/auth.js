import { addError, removeError } from "./error";
import { SET_CURRENT_USER } from "../actionTypes";
import api from "../../services/api";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const setToken = (token) => {
  api.setToken(token);
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    api.setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async (dispatch) => {
    try {
      const response = await api.call("post", `auth/${path}`, data);

      // Log the full response to debug any issues
      console.log("Full API Response:", response);

      // Ensure response has `data` before destructuring
      if (!response || !response.token) {
        throw new Error("Invalid API response: Missing token");
      }

      // Log the response data specifically
      console.log("API Response Data:", response);

      // Ensure response contains a token
      if (!response.data.token) {
        throw new Error("Invalid API response: Missing token");
      }

      // Extract token and user details
      const { token, ...user } = response.data;

      // Ensure token exists before setting it
      if (!token) throw new Error("Missing token in API response");

      // Store the token and update API header
      localStorage.setItem("jwtToken", token);
      api.setToken(token);

      // Log user data before dispatching
      console.log("User data before dispatch:", user);

      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      console.error("Authentication Error:", err);

      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "An unknown error occurred";

      // Log the error message for debugging

      console.log(err.response.data);
      const { error } = err.response.data;

      // Log the exact error for debugging
      // console.error(
      //   "Authentication Error:",
      //   err.response?.data || err.response || err.message
      // );

      console.log("Full Error Object:", err);
      console.log("Error Response:", err.response);
      console.log("Resolved Error Message:", errorMessage);
      dispatch(addError(error.message));
    }
  };
};
