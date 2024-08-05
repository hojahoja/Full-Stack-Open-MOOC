import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogList } from "./reducers/blogReducer";
import { userLogin, setLoggedSession, userLogout } from "./reducers/loggedUserReducer";
import useField from "./hooks";

const LoginForm = ({ dispatch }) => {
  const { reset: resetUsername, ...userField } = useField("text");
  const { reset: resetPassword, ...passField } = useField("password");

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = { username: userField.value, password: passField.value };
    dispatch(userLogin(credentials));

    resetPassword();
    resetUsername();
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...userField} name="Username" />
        </div>
        <div>
          password
          <input {...passField} name="Password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

const BlogList = ({ dispatch, user, blogs }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
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
      </div>
      <div>
        {user && <BlogList dispatch={dispatch} user={user} blogs={blogs} />}
        {!user && <LoginForm dispatch={dispatch} />}
      </div>
    </div>
  );
};

export default App;
