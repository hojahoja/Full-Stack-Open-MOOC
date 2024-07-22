import { useState } from "react";

const Blog = ({ blog }) => {
  const [fullyVisible, setFullyVisible] = useState(false);
  const { url, likes, author, title } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => setFullyVisible(!fullyVisible);

  const additionalInfo = () => {
    return (
      <>
        {url}
        <div>
          likes {likes} <button>like</button>
        </div>
        {author}
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
