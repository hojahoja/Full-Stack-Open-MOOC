import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../reducers/loggedUserReducer";
import useField from "../hooks";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser);
  const { reset: resetUsername, ...userField } = useField("text");
  const { reset: resetPassword, ...passField } = useField("password");

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = { username: userField.value, password: passField.value };
    dispatch(userLogin(credentials));

    resetPassword();
    resetUsername();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  if (user) {
    return (
      <>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </>
    );
  } else {
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
  }
};

export default LoginForm;
