import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { initializeBlogList } from "./reducers/blogReducer";
import { setLoggedSession } from "./reducers/loggedUserReducer";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(setLoggedSession());
    dispatch(initializeBlogList());
  }, [dispatch]);

  return (
    <div>
      <div>
        <NavBar />
        <Notification />
      </div>
      {!user ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blog app</h2>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
