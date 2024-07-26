const { test, expect, beforeEach, describe } = require("@playwright/test");
const { blogListLogin } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "John Doe",
        username: "nobody",
        password: "passwordsAreForLosers",
      },
    });

    await page.goto("http://localhost:5174");
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
      await page.getByRole("button", { name: "New blog" }).click();
      await page
        .getByPlaceholder("type title here")
        .fill("The world is a simulation programmed in Lisp");
      await page.getByPlaceholder("type author here").fill("Bored Senior Developer");
      await page.getByPlaceholder("type url here").fill("http://awakenprogrammersheeple.edu.lol/");
      await page.getByRole("button", { name: "create" }).click();

      await expect(
        page.getByText("The world is a simulation programmed in Lisp", { exact: true })
      ).toBeVisible();
    });
  });
});
