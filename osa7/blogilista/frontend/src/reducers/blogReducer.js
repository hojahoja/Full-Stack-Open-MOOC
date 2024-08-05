import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";
import { userLogout } from "./loggedUserReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogLikes(state, action) {
      const { id, increment } = action.payload;
      const blogToUpdate = state.find((blog) => blog.id === id);
      blogToUpdate.likes += increment;
      state.sort((a, b) => b.likes - a.likes);
    },
    filterBlogs(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const thunks = () => {
  const errorHandler = (dispatch, exception) => {
    const errorMessage = exception.response.data.error;
    dispatch(showNotification(errorMessage, true));
    if (errorMessage === "Session has expired") {
      dispatch(userLogout());
    }
  };

  return {
    initializeBlogList: () => {
      return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)));
      };
    },

    createNewBlog: (newBlog) => {
      return async (dispatch) => {
        try {
          const createdBlog = await blogService.create(newBlog);
          dispatch(addBlog(createdBlog));
          dispatch(showNotification(`Added a new blog ${newBlog.title}`));
        } catch (exception) {
          errorHandler(dispatch, exception);
        }
      };
    },

    increaseBlogLikes: (id) => {
      return async (dispatch) => {
        dispatch(updateBlogLikes({ id, increment: 1 }));
        try {
          await blogService.update(id);
        } catch (exception) {
          dispatch(updateBlogLikes({ id, increment: -1 }));
          errorHandler(dispatch, exception);
        }
      };
    },

    removeBlog: (id) => {
      return async (dispatch) => {
        try {
          await blogService.remove(id);
          dispatch(filterBlogs(id));
        } catch (exception) {
          errorHandler(dispatch, exception);
        }
      };
    },
  };
};

export const { setBlogs, addBlog, updateBlogLikes, filterBlogs } = blogSlice.actions;
export const { initializeBlogList, createNewBlog, increaseBlogLikes, removeBlog } = thunks();
export default blogSlice.reducer;
