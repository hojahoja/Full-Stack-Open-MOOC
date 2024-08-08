import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogList } from "./reducers/blogReducer";
import { setLoggedSession } from "./reducers/loggedUserReducer";
import UserList from "./components/UserList";
import LoginForm from "./components/LoginForm";

const BlogList = ({ blogs }) => {
  return (
    <>
      <BlogForm />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(setLoggedSession());
    dispatch(initializeBlogList());
  }, [dispatch]);

  return (
    <div>
      <div>
        {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
        <Notification />
        <LoginForm />
      </div>
      <div>
        {user && (
          <>
            <UserList />
            <BlogList blogs={blogs} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
