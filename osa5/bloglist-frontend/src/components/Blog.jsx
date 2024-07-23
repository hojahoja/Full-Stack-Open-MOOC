import { useState } from "react";

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
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

  const additionalInfo = () => {
    const userOwnsBlog = blog.user.id === user.id || blog.user === user.id;
    return (
      <>
        {url}
        <div>
          likes {likes} <button onClick={() => updateBlog(blog)}>like</button>
        </div>
        {author}
        <div>{userOwnsBlog && <button onClick={() => removeBlog(blog)}>remove</button>}</div>
      </>
    );
  };

  return (
    <div style={blogStyle}>
      <div>
        {title} <button onClick={toggleVisibility}>{fullyVisible ? "hide" : "view"}</button>
      </div>
      {fullyVisible && additionalInfo()}
    </div>
  );
};

export default Blog;
