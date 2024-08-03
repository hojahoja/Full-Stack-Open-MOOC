import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { showNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(showNotification(message, isError));
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
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogConnoisseur");
  };

  const blogFormRef = useRef();

  const handleNewBlog = async (newBlog) => {
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
        blogService.setToken(null);
        window.localStorage.removeItem("loggedBlogConnoisseur");
      }
    }
  };

  const handleUpdateBlog = async (blogToUpdate) => {
    const incrementLikeAndUpdateBloglist = (increment) => {
      blogToUpdate.likes += increment;
      setBlogs(
        blogs
          .map((b) => (b.id !== blogToUpdate.id ? b : blogToUpdate))
          .sort((b1, b2) => b2.likes - b1.likes)
      );
    };

    try {
      incrementLikeAndUpdateBloglist(1);
      await blogService.update(blogToUpdate.id);
    } catch (exception) {
      showStatusMessage(exception.response.data.error, true);
      incrementLikeAndUpdateBloglist(-1);
    }
  };

  const handleRemoveBlog = async (blogToRemove) => {
    try {
      if (confirm(`Do you want to remove blog: ${blogToRemove.title}`)) {
        await blogService.remove(blogToRemove.id);
        setBlogs(blogs.filter((b) => b.id !== blogToRemove.id));
      }
    } catch (exception) {
      showStatusMessage(exception.response.data.error, true);
    }
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification />
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
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
    );
  };

  const blogList = () => {
    return (
      <>
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
        <div>{blogForm()}</div>
        <div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={handleUpdateBlog}
              removeBlog={handleRemoveBlog}
              user={user}
            />
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
