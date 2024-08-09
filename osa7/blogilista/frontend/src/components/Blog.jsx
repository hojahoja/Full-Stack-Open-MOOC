import { increaseBlogLikes, initializeBlogList, removeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: blogId } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));

  const handleRemoveBlog = (id) => {
    if (confirm(`Do you want to remove blog:`)) {
      dispatch(removeBlog(id));
      navigate("/");
    }
  };

  if (!blog) return <div>loading...</div>;

  const { url, likes, author, title } = blog;
  const userOwnsBlog = loggedUser
    ? blog.user.id === loggedUser.id || blog.user === loggedUser.id
    : false;
  return (
    <div>
      <h2>{title}</h2>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <div>
        <span>likes {likes}</span>
        <button onClick={() => dispatch(increaseBlogLikes(blog.id))}>like</button>
      </div>
      added by {author} <br />
      {userOwnsBlog && <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>}
    </div>
  );
};

export default Blog;
