import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loggedUserReducer";
import { Link } from "react-router-dom";
import Button from "./base-ux/StyledButton";

const NavBar = () => {
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  if (user) {
    return (
      <nav className="lg:w-full">
        <ul
          className={`round-1 flex items-center justify-center space-x-6 rounded-xl bg-slate-100 px-12 font-bold
            lg:justify-evenly`}>
          <li>
            <Link
              className="block from-slate-100 from-70% to-slate-200 to-80% p-2 hover:bg-gradient-to-tr"
              to="/">
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className="block from-slate-100 from-70% to-slate-200 to-80% p-2 hover:bg-gradient-to-tr"
              to="/users">
              Users
            </Link>
          </li>
          <li>
            <p className="whitespace-nowrap">{user.name} logged in</p>
          </li>
          <li>
            <Button color="white" onClick={handleLogout}>
              logout
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
};

export default NavBar;
