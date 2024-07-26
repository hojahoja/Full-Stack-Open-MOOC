const { test, expect, beforeEach, describe } = require("@playwright/test");
const { blogListLogin, createBlog } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "John Doe",
        username: "nobody",
        password: "passwordsAreForLosers",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
  });

  describe("logging in", () => {
    test("should fail with incorrect credentials", async ({ page }) => {
      await blogListLogin(page, "nobody", "incorrect");

      const errorBox = page.getByText("invalid username or password");
      await expect(errorBox).toBeVisible();
      await expect(errorBox).toHaveCSS("border-color", "rgb(255, 0, 0)");
    });

    test("should succeed with incorrect credentials", async ({ page }) => {
      await blogListLogin(page, "nobody", "passwordsAreForLosers");

      await expect(page.getByText("John Doe logged in")).toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      blogListLogin(page, "nobody", "passwordsAreForLosers");
    });

    test("a new blog can be created", async ({ page }) => {
      createBlog(
        page,
        "The world is a simulation programmed in Lisp",
        "Bored Senior Developer",
        "http://awakenprogrammersheeple.edu.lol/"
      );

      await expect(
        page.getByText("The world is a simulation programmed in Lisp", { exact: true })
      ).toBeVisible();
    });
    describe("and the list contains a blog", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "Test title", "Tester", "pretend this is an url");
      });
      test("clicking likes twice should increment the like counter by two", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        const likeButton = page.getByRole("button", { name: "like" });

        await expect(page.getByText("likes 0")).toBeVisible();
        await likeButton.click();
        await likeButton.click();
        await expect(page.getByText("likes 2")).toBeVisible();
      });
      test("the creator of the blog should be able to delete it", async ({ page }) => {
        const blogToRemove = page.getByText("Test title", { exact: true });
        await expect(blogToRemove).toBeVisible();

        await page.getByRole("button", { name: "view" }).click();
        page.once("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();

        await expect(blogToRemove).toHaveCount(0);
        await expect(blogToRemove).not.toBeVisible();
      });
      test("only the creator of the blog can see the remove button", async ({ page, request }) => {
        await request.post("/api/users", {
          data: { name: "John Test", username: "tester", password: "test" },
        });

        await page.getByRole("button", { name: "logout" }).click();
        await blogListLogin(page, "tester", "test");
        await createBlog(page, "Another Title", "Author 2", "some url");

        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "view" }).last().click();

        await expect(
          page.getByText("Test title", { exact: true }).locator("../..")
        ).not.toContainText("remove");
        await expect(
          page.getByText("Another Title", { exact: true }).locator("../..")
        ).toContainText("remove");
      });
    });
  });
});
