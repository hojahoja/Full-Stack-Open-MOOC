import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { beforeEach } from "vitest";

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
    expect(element).toBeDefined();
  });

  test("should render title, url, likes and author", async () => {
    return "TBC";
  });
});
