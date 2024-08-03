import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, isError: false, timerId: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.timerId);
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const showNotification = (message, isError = false, time = 5) => {
  return (dispatch) => {
    const timerId = setTimeout(() => {
      dispatch(setNotification({ message: null, isError: false, timerId: null }));
    }, time * 1000);
    dispatch(setNotification({ message, isError, timerId }));
  };
};

export default notificationSlice.reducer;
