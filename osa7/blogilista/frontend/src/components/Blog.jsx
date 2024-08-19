import { addCommentToBlog, increaseBlogLikes, removeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useField from "../hooks";
import Button from "./base-ux/StyledButton";
import Input from "./base-ux/StyledInput";

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
    <div className="flex flex-col items-center px-6">
      <div className="flex min-h-60 w-full flex-col justify-evenly space-y-2 rounded-md border-2 p-4 text-lg">
        <h3>{title}</h3>
        <a
          className="text-[#0000EE] underline visited:text-[#551A8B] hover:no-underline active:text-green-900"
          href={url}
          target="_blank"
          rel="noreferrer">
          {url}
        </a>
        <div>
          <span className="relative bottom-1 my-auto mr-1">likes {likes}</span>
          <Button
            className="relative bottom-1 text-base"
            color="white"
            onClick={() => dispatch(increaseBlogLikes(blog.id))}>
            like
          </Button>
        </div>
        added by {author} <br />
        {userOwnsBlog && (
          <Button className="self-end text-base" color="white" onClick={handleRemoveBlog}>
            remove
          </Button>
        )}
      </div>
      <div className="w-full px-6">
        <h3 className="mb-1">Comments</h3>
        <form className="flex justify-between space-x-2" onSubmit={handleAddComment}>
          <Input label="text" {...commentField} />
          <Button className="my-0.5 whitespace-nowrap" color="white">
            add comment
          </Button>
        </form>
        <ul className="mt-2 flex w-full flex-col rounded border empty:hidden">
          {comments.map((comment, index) => (
            <li className=" p-2 hover:bg-slate-50" key={`${comments}${index}`}>
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
