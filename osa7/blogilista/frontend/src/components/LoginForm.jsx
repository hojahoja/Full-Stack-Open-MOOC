import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/loggedUserReducer";
import useField from "../hooks";
import Button from "./base-ux/StyledButton";
import Input from "./base-ux/StyledInput";

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
      <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
        <div>
          <Input {...userField} name="Username" label="Username" />
        </div>
        <div>
          <Input {...passField} name="Password" label="Password" />
        </div>
        <Button className="py-2" type="submit">
          login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
