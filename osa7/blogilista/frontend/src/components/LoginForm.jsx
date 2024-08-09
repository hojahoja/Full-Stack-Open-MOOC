import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/loggedUserReducer";
import useField from "../hooks";

const LoginForm = () => {
  const dispatch = useDispatch();
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

export default LoginForm;
