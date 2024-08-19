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
    <div className="container mx-auto flex w-full flex-col items-center justify-center md:w-fit lg:w-full">
      <div className="sticky top-0 z-10 m-6 w-full lg:w-full">
        <NavBar />
        <div className="my-2 empty:hidden ">
          <Notification />
        </div>
      </div>
      {!user ? (
        <div className="mt-24">
          <h1 className="pb-4">Log in to application</h1>
          <LoginForm />
        </div>
      ) : (
        <div className="mx-auto w-full">
          <h1 className="pb-2 text-center">Blog App</h1>
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
