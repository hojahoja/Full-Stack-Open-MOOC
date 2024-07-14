const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");
const helper = require("./testing-helper");
const { multipleBlogs } = require("./testing-helper");
const api = supertest(app);

describe("when bloglist api already has some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(multipleBlogs);
  });

  test("returns the blogs in a JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, multipleBlogs.length);
  });
  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const expectedBlog = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${expectedBlog.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultBlog.body, expectedBlog);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
