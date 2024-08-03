import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  test("should have correct values when submitted", async () => {
    const mockCreateBlog = vi.fn();

    render(<BlogForm createBlog={mockCreateBlog} />);

    const inputs = ["title", "author", "url"];

    for (const inputText of inputs) {
      const inputBox = screen.getByPlaceholderText(`type ${inputText} here`);
      await userEvent.type(inputBox, `type ${inputText} here`);
    }
    await userEvent.click(screen.getByText("create"));

    inputs.forEach((input) => {
      expect(mockCreateBlog.mock.calls[0][0][input]).toBe(`type ${input} here`);
    });
  });
});
