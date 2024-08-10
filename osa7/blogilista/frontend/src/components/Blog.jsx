import { addCommentToBlog, increaseBlogLikes, removeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useField from "../hooks";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: blogId } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));
  const { reset: resetComment, ...commentField } = useField("text");

  const handleRemoveBlog = () => {
    if (confirm(`Do you want to remove blog:`)) {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog.id, commentField.value));
    resetComment();
  };

  if (!blog) return <div>loading...</div>;

  const { url, likes, author, title, comments } = blog;
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
      {userOwnsBlog && <button onClick={handleRemoveBlog}>remove</button>}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input {...commentField} />
          <button>add comment</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={`${comments}${index}`}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
