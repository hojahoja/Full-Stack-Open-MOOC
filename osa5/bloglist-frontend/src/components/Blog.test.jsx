import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "Test title!",
      author: "testerMan",
      url: "http://www.testerBester.com/",
      likes: 1,
    };
    container = render(<Blog blog={blog} />).container;
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
});
