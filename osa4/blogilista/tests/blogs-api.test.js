const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");
const { multipleBlogs } = require("./test_helper");
const api = supertest(app);

describe("when bloglist api already has some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(multipleBlogs);
  });

  test("returns the correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, multipleBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
