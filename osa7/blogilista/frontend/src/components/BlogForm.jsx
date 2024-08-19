import { useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";
import useField from "../hooks";
import Input from "./base-ux/StyledInput";
import Button from "./base-ux/StyledButton";

const BlogForm = () => {
  const { reset: resetTitle, ...titleField } = useField("text");
  const { reset: resetAuthor, ...authorField } = useField("text");
  const { reset: resetUrl, ...urlField } = useField("text");

  const toggleRef = useRef();
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = { title: titleField.value, author: authorField.value, url: urlField.value };

    dispatch(createNewBlog(newBlog));
    toggleRef.current.toggleVisibility();
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <div
      className={`flex flex-col flex-wrap px-6 py-2 [&_button[class*=bg-white]]:w-3/12
        [&_button]:rounded [&_button]:p-2.5`}>
      <Togglable buttonLabel={"New blog"} ref={toggleRef}>
        <h2 className="text-center">create new</h2>
        <form className="my-2 flex flex-col space-y-3" onSubmit={addBlog}>
          <Input {...titleField} label="Title" />
          <Input {...authorField} label="Author" />
          <Input {...urlField} label="URL" />
          <Button className="w-3/12" type="submit">
            create
          </Button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
