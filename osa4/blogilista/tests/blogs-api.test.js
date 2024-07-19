const { test, describe, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const helper = require("./testing-helper");
const { multipleBlogs: initialBlogs } = require("./testing-helper");
const api = supertest(app);

describe("when bloglist api already has some blogs", () => {
  let validToken;
  let loggedUser;
  before(async () => {
    await User.deleteOne({ username: "GOD" });
    const passwordHash = await bcrypt.hash("safePasswordTrustMe", 10);
    loggedUser = new User({ username: "GOD", passwordHash });
    await loggedUser.save();

    const result = await api
      .post("/api/login")
      .send({ username: "GOD", password: "safePasswordTrustMe" });

    validToken = result.body.token;
  });

  beforeEach(async () => {
    loggedUser.blogs = initialBlogs.map((id) => id);
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
    await loggedUser.save();
  });
  describe("viewing all blogs", () => {
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
    const postBlog = async (blog, expectedStatusCode, token = validToken) => {
      await api
        .post("/api/blogs")
        .send(blog)
        .set("Authorization", "Bearer " + token)
        .expect(expectedStatusCode)
        .expect("Content-Type", /application\/json/);
    };

    const additionTemplate = {
      testName: "succeeds with valid data",
      title: "The universe is a simulation written in Lisp",
      author: "Raving Lunatic",
      url: "http://Programmersrevelationisnow.gg/",
      likes: 777,
      expectedStatus: 201,
      expectedLikes: 777,
      increment: 1,
    };

    const additionVariations = [
      {
        testName: "succeeds with no likes field in data",
        title: "Why Holy C is heretical",
        likes: undefined,
        expectedLikes: 0,
      },
      {
        testName: "fails with no URL and returns 400 bad request",
        url: undefined,
        expectedStatus: 400,
        increment: 0,
      },
      {
        testName: "fails with no title and returns 400 bad request",
        title: undefined,
        expectedStatus: 400,
        increment: 0,
      },
      {
        testName: "fails with invalid token and returns 401 unauthorized",
        expectedStatus: 401,
        increment: 0,
        token: "invalid token",
      },
    ];

    const postBlogCases = helper.createTestCases(additionTemplate, additionVariations);

    for (const testCase of postBlogCases) {
      test(testCase.testName, async () => {
        const someBlog = {
          title: testCase.title,
          author: testCase.author,
          url: testCase.url,
          likes: testCase.likes,
        };

        await postBlog(someBlog, testCase.expectedStatus, testCase.token);
        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length + testCase.increment);

        if (testCase.expectedStatus === 201) {
          const resultBlog = blogsAtEnd[blogsAtEnd.length - 1];
          assert.strictEqual(resultBlog.title, testCase.title);
          assert.strictEqual(resultBlog.likes, testCase.expectedLikes);
        }
      });
    }
  });
  describe("removal of a specific blog", () => {
    const deleteAndPassResults = async (testID, status, token = validToken) => {
      const blogsAtStart = await helper.blogsInDb();

      const response = await api
        .delete(`/api/blogs/${testID}`)
        .set("Authorization", "Bearer " + token)
        .expect(status);

      const blogsAtEnd = await helper.blogsInDb();
      return { response, blogsAtStart, blogsAtEnd };
    };

    const checkUserBlogs = async (deletedBlogId, blogsAtEnd, asExpected) => {
      const user = await User.findById(loggedUser.id);

      const databaseContainsDeletedBlog = blogsAtEnd.reduce(
        (acc, blog) => (acc ? true : blog.id === deletedBlogId),
        false
      );

      assert.strictEqual(user.blogs.includes(deletedBlogId), asExpected);
      assert.strictEqual(databaseContainsDeletedBlog, asExpected);
    };

    const deletionTestCases = [
      {
        testName: "fails with nonexistent id",
        id: "669372b942d28ca379809a3c",
        expectedStatus: 204,
        containsBlog: false,
        increment: 0,
      },
      {
        testName: "fails with invalid token",
        id: "5a422b891b54a676234d17fa",
        expectedStatus: 401,
        token: "nonsense",
        containsBlog: true,
        increment: 0,
      },
      {
        testName: "succeeds with a valid id",
        id: "5a422b891b54a676234d17fa",
        expectedStatus: 204,
        containsBlog: false,
        increment: -1,
      },
    ];

    for (const testCases of deletionTestCases) {
      test(testCases.testName, async () => {
        const { id, expectedStatus, token, containsBlog, increment } = testCases;
        const results = await deleteAndPassResults(id, expectedStatus, token);

        assert.strictEqual(results.blogsAtEnd.length, results.blogsAtStart.length + increment);
        await checkUserBlogs(id, results.blogsAtEnd, containsBlog);
      });
    }
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
