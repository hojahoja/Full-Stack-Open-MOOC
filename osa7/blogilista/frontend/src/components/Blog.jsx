import { useState } from "react";
import PropTypes from "prop-types";
import { increaseBlogLikes, removeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [fullyVisible, setFullyVisible] = useState(false);
  const { url, likes, author, title } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const toggleVisibility = () => {
    setFullyVisible(!fullyVisible);
  };

  const handleRemoveBlog = (id) => {
    if (confirm(`Do you want to remove blog:`)) {
      dispatch(removeBlog(id));
    }
  };

  const additionalInfo = () => {
    const userOwnsBlog = user ? blog.user.id === user.id || blog.user === user.id : false;
    return (
      <>
        {url}
        <div>
          <span>likes {likes}</span>{" "}
          <button onClick={() => dispatch(increaseBlogLikes(blog.id))}>like</button>
        </div>
        {author}
        <div>
          {userOwnsBlog && <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>}
        </div>
      </>
    );
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>{title}</span>{" "}
        <button onClick={toggleVisibility}>{fullyVisible ? "hide" : "view"}</button>
      </div>
      {fullyVisible && additionalInfo()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
