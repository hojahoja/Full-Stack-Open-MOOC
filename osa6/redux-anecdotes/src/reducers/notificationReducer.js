import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", timerId: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const { message, newTimerId } = action.payload;
      clearTimeout(state.timerId);
      state.timerId = newTimerId;
      state.message = message;
    },
    hideNotification() {
      return initialState;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, timer) => (dispatch) => {
  const newTimerId = setTimeout(() => {
    dispatch(hideNotification());
  }, timer * 1000);

  dispatch(showNotification({ message, newTimerId }));
};

export default notificationSlice.reducer;
