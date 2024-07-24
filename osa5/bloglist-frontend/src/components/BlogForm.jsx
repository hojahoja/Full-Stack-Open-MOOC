import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    await createBlog({ title, author, url });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        author:
        <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url:
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
