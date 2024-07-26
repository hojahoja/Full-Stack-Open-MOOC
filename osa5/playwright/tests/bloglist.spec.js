const { test, expect, beforeEach, describe } = require("@playwright/test");

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
});
