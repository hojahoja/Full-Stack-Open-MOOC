const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");
const helper = require("./testing-helper");
const { multipleBlogs: initialBlogs } = require("./testing-helper");
const api = supertest(app);

describe("when bloglist api already has some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  test("returns the blogs in a JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
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

    test("returns 404 Not found with nonexistent id", async () => {
      const nonexistentID = "669372b942d28ca379809a3c";
      await api.get(`/api/blogs/${nonexistentID}`).expect(404);
    });

    test("returns 400 Bad request with invalid id", async () => {
      await api.get("/api/blogs/123213213").expect(400);
    });
  });
  describe("addition of a new blog", () => {
    const postBlog = async (blog, expectedStatusCode) => {
      await api
        .post("/api/blogs")
        .send(blog)
        .expect(expectedStatusCode)
        .expect("Content-Type", /application\/json/);
    };

    const assertCorrectBlogValues = async (expectedTitle, expectedLikes) => {
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

      const resultBlog = blogsAtEnd[blogsAtEnd.length - 1];
      assert.strictEqual(resultBlog.title, expectedTitle);
      assert.strictEqual(resultBlog.likes, expectedLikes);
    };

    test("succeeds with valid data", async () => {
      const someBlog = {
        title: "The universe is a simulation written in Lisp",
        author: "Raving Lunatic",
        url: "http://Programmersrevelationisnow.gg/",
        likes: 777,
      };

      await postBlog(someBlog, 201);
      await assertCorrectBlogValues("The universe is a simulation written in Lisp", 777);
    });

    test("succeeds with no likes field in data", async () => {
      const someBlog = {
        title: "Why Holy C is heretical",
        author: "Raving Lunatic",
        url: "http://Programmersrevelationisnow.gg/",
      };

      await postBlog(someBlog, 201);
      await assertCorrectBlogValues("Why Holy C is heretical", 0);
    });

    test("with no URL returns 400 bad request", async () => {
      const someBlog = {
        title: "Temple OS will lead you astray",
        author: "Raving Lunatic",
        likes: 0,
      };
      await postBlog(someBlog, 400);
    });
    test("with no title returns 400 bad request", async () => {
      const someBlog = {
        author: "Raving Lunatic",
        likes: 0,
        url: "http://Programmersrevelationisnow.gg/",
      };

      await postBlog(someBlog, 400);
    });
  });
  describe("removal of a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const deletedBlog = blogsAtStart[0];

      await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      const containsDeletedBlog = blogsAtEnd.reduce(
        (acc, blog) => (acc ? true : blog.id === deletedBlog.id),
        false
      );
      assert.strictEqual(containsDeletedBlog, false);
    });

    const dbUnchangedWithID = async (testID, expectedStatus) => {
      const blogsAtStart = await helper.blogsInDb();

      await api.delete(`/api/blogs/${testID}`).expect(expectedStatus);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    };

    test("doesn't change list size with a nonexistent id", async () => {
      const nonexistentID = "669372b942d28ca379809a3c";
      await dbUnchangedWithID(nonexistentID, 204);
    });

    test("returns 400 Bad Request with invalid id", async () => {
      const invalidID = "123213123";
      await dbUnchangedWithID(invalidID, 400);
    });
  });
  describe("updating a specific blog with put", () => {
    test("increments the number of likes by one", async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api.put(`/api/blogs/${blogsAtStart[0].id}`).expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd[0].likes, blogsAtStart[0].likes + 1);
    });
    test("doesn't change any other value than likes", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const changedBlog = {
        ...blogsAtStart[0],
        title: "u got pwned",
        author: "script kiddie",
        url: "lol.com",
        likes: 666,
      };
      await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(changedBlog).expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      const { likes: originalLikes, ...originalEntries } = blogsAtStart[0];
      const { likes: postUpdateLikes, ...postUpdateEntries } = blogsAtEnd[0];

      assert.strictEqual(postUpdateLikes, originalLikes + 1);
      assert.deepStrictEqual(postUpdateEntries, originalEntries);
    });
    test("returns 404 Not found with nonexistent id", async () => {
      const nonexistentID = "669372b942d28ca379809a3c";
      await api.put(`/api/blogs/${nonexistentID}`).expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
