import { createSlice } from "@reduxjs/toolkit";

const loggedUserSlicer = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedUser } = loggedUserSlicer.actions;

export default loggedUserSlicer.reducer;
