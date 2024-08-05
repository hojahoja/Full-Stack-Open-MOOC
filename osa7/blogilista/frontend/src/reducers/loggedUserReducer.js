import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotification } from "./notificationReducer";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedUser } = loggedUserSlice.actions;

export const setLoggedSession = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogConnoisseur");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setLoggedUser(user));
      window.localStorage.setItem("loggedBlogConnoisseur", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(showNotification(exception.response.data.error, true));
    }
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch(setLoggedUser(null));
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogConnoisseur");
  };
};

export default loggedUserSlice.reducer;
