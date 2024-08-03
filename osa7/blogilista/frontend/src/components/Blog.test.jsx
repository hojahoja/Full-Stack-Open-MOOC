import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  let container;
  let updateMock;

  beforeEach(() => {
    updateMock = vi.fn();

    const blog = {
      title: "Test title!",
      author: "testerMan",
      url: "http://www.testerBester.com/",
      likes: 1,
    };
    container = render(<Blog blog={blog} updateBlog={updateMock} />).container;
  });

  test("should always render blog title", () => {
    const element = screen.getByText("Test title!");
  });

  test("should render title, url, likes and author after view button has been clicked", async () => {
    const clicker = userEvent.setup();
    const button = screen.getByText("view");
    await clicker.click(button);

    let element = screen.getByText("Test title!");
    element = screen.getByText("testerMan", { exact: false });
    element = screen.getByText("http://www.testerBester.com/", { exact: false });
    element = screen.getByText("likes 1", { exact: false });
  });

  test("prop updateBlog should get activated twice when clicking like twice", async () => {
    const clicker = userEvent.setup();
    const viewButton = screen.getByText("view");
    await clicker.click(viewButton);

    const likeButton = screen.getByText("like");
    await clicker.click(likeButton);
    await clicker.click(likeButton);

    expect(updateMock.mock.calls).toHaveLength(2);
  });
});
