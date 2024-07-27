const blogListLogin = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username);
  await page.locator('input[name="Password"]').fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByPlaceholder("type title here").fill(title);
  await page.getByPlaceholder("type author here").fill(author);
  await page.getByPlaceholder("type url here").fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(title, { exact: true }).waitFor();
};

export { blogListLogin, createBlog };
