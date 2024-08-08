import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import loggedUserReducer from "./reducers/loggedUserReducer";
import { blogAppApi } from "./features/apiSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    [blogAppApi.reducerPath]: blogAppApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogAppApi.middleware),
});

export default store;
