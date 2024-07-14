const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list-helper");
const testHelper = require("./test_helper");

const listWithOneBlog = testHelper.listWithOneBlog;
const multipleBlogs = testHelper.multipleBlogs;
const listWithNoLikes = testHelper.listWithNoLikes;

describe("List Helper", () => {
  describe("mostLikes", () => {
    test("returns null when given an empty list", () => {
      assert.strictEqual(listHelper.mostLikes([]), null);
    });

    test("returns a real author object when the author has no likes", () => {
      const result = listHelper.mostLikes(listWithNoLikes);
      const expect = { author: "Robert C. Martin", likes: 0 };
      assert.deepStrictEqual(result, expect);
    });

    test("returns the author from a list with one entry", () => {
      const result = listHelper.mostLikes(listWithOneBlog);
      const expect = { author: "Edsger W. Dijkstra", likes: 5 };
      assert.deepStrictEqual(result, expect);
    });

    test("returns the correct author from a bigger list", () => {
      const result = listHelper.mostLikes(multipleBlogs);
      const expect = { author: "Edsger W. Dijkstra", likes: 17 };
      assert.deepStrictEqual(result, expect);
    });
  });

  describe("mostBlogs", () => {
    test("returns null when given an empty list", () => {
      assert.strictEqual(listHelper.mostBlogs([]), null);
    });

    test("returns the author from a list with one entry", () => {
      const result = listHelper.mostBlogs(listWithOneBlog);
      const expect = { author: "Edsger W. Dijkstra", blogs: 1 };
      assert.deepStrictEqual(result, expect);
    });

    test("returns the correct author from a bigger list", () => {
      const result = listHelper.mostBlogs(multipleBlogs);
      const expect = { author: "Robert C. Martin", blogs: 3 };
      assert.deepStrictEqual(result, expect);
    });
  });

  describe("favoriteBlog", () => {
    test("returns a real blog in a list with zero likes", () =>
      assert.strictEqual(listHelper.favoriteBlog(listWithNoLikes), listWithNoLikes[1]));

    test("of an empty list is null", () => assert.strictEqual(listHelper.favoriteBlog([]), null));

    test("returns the blog from a list with one entry", () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      assert.strictEqual(result, listWithOneBlog[0]);
    });

    test("returns the correct blog in a bigger list", () => {
      const result = listHelper.favoriteBlog(multipleBlogs);
      assert.strictEqual(result, multipleBlogs[2]);
    });
  });

  describe("Total likes", () => {
    test("of empty list is zero", () => assert.strictEqual(listHelper.totalLikes([]), 0));

    test("when list has only one blog equals the likes of that", () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      assert.strictEqual(result, 5);
    });

    test("of a bigger list calculated right", () => {
      const result = listHelper.totalLikes(multipleBlogs);
      assert.strictEqual(result, 36);
    });
  });
});
