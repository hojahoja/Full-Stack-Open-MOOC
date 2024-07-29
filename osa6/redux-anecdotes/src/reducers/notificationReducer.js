import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "InitialPlaceHolder",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
  },
});

export default notificationSlice.reducer;
