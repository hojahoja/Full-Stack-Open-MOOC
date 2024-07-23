import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((b1, b2) => b2.likes - b1.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogConnoisseur");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showStatusMessage = (message, isError) => {
    setStatusMessage({ message, isError });
    setTimeout(() => {
      setStatusMessage({ message: null, isError: false });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogConnoisseur", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showStatusMessage(exception.response.data.error, true);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("loggedBlogConnoisseur");
  };

  const blogFormRef = useRef();

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showStatusMessage(`Added a new blog ${returnedBlog.title}`);
    } catch (exception) {
      const errorMessage = exception.response.data.error;
      showStatusMessage(errorMessage, true);
      if (errorMessage === "Session has expired") {
        setUser(null);
        window.localStorage.removeItem("loggedBlogConnoisseur");
      }
    }
  };

  const handleUpdateBlog = async (blog) => {
    const incrementLikeAndUpdateBloglist = (increment) => {
      blog.likes += increment;
      setBlogs(
        blogs.map((b) => (b.id !== blog.id ? b : blog)).sort((b1, b2) => b2.likes - b1.likes)
      );
    };

    try {
      incrementLikeAndUpdateBloglist(1);
      await blogService.update(blog.id);
    } catch (exception) {
      showStatusMessage(exception.response.data.error, true);
      incrementLikeAndUpdateBloglist(-1);
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification message={statusMessage.message} isError={statusMessage.isError} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogForm = () => {
    return (
      <Togglable buttonLabel={"New blog"} ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    );
  };

  const blogList = () => {
    return (
      <>
        <div>
          <h2>blogs</h2>
          <Notification message={statusMessage.message} isError={statusMessage.isError} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
        <div>{blogForm()}</div>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div>{!user && loginForm()}</div>
      <div>{user && blogList()}</div>
    </div>
  );
};

export default App;
