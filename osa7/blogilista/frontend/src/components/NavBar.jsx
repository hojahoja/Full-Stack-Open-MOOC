import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loggedUserReducer";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navStyle = {
    backgroundColor: "#DCDCDC",
    padding: 5,
  };
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  if (user) {
    return (
      <div style={navStyle}>
        <Link style={{ margin: 4 }} to="/">
          blogs
        </Link>
        <Link style={{ margin: 4 }} to="/users">
          users
        </Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
};

export default NavBar;
