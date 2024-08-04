import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

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

export const { setBlogs, addBlog, updateBlogLikes, filterBlogs } = blogSlice.actions;

export const initializeBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch(setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)));
  };
};

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch(addBlog(createdBlog));
  };
};

export const increaseBlogLikes = (id) => {
  return async (dispatch) => {
    dispatch(updateBlogLikes({ id, increment: 1 }));
    try {
      await blogService.update(id);
    } catch (exception) {
      dispatch(updateBlogLikes({ id, increment: -1 }));
      dispatch(showNotification(exception.response.data.error, true));
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(filterBlogs(id));
    } catch (exception) {
      dispatch(showNotification(exception.response.data.error, true));
    }
  };
};
export default blogSlice.reducer;
