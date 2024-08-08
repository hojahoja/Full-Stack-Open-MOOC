import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { initializeBlogList } from "./reducers/blogReducer";
import { setLoggedSession } from "./reducers/loggedUserReducer";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import UserList from "./components/UserList";
import User from "./components/User";

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
            <Routes>
              <Route path="/" element={<BlogList blogs={blogs} />} />
              <Route path="/users" element={<UserList />} />
              <Route path="users/:id" element={<User />} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
