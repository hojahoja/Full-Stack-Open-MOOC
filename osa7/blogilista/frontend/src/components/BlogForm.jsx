import { useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import useField from "../hooks";

const BlogForm = () => {
  const { reset: resetTitle, ...titleField } = useField("text");
  const { reset: resetAuthor, ...authorField } = useField("text");
  const { reset: resetUrl, ...urlField } = useField("text");

  const toggleRef = useRef();
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = { title: titleField.value, author: authorField.value, url: urlField.value };

    dispatch(createNewBlog(newBlog));
    toggleRef.current.toggleVisibility();

    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <Togglable buttonLabel={"New blog"} ref={toggleRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input {...titleField} placeholder="type title here" />
        <br />
        author:
        <input {...authorField} placeholder="type author here" />
        <br />
        url:
        <input {...urlField} placeholder="type url here" />
        <br />
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
