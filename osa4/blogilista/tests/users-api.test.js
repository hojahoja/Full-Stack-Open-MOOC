const mongoose = require("mongoose");
const supertest = require("supertest");
const { test, beforeEach, describe, after } = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./testing-helper");
const app = require("../app");
const api = supertest(app);

describe("When the db already has one user", () => {
  beforeEach(async () => {
    const passwordHash = "pretendThisPasswordIsHashed";
    const user = new User({ username: "MOG", passwordHash });

    await User.deleteMany({});
    await user.save();
  });

  describe("creating a new user", () => {
    const postNewUserAndCheckDbLength = async (statusCode, user, expectedIncrement) => {
      const usersAtStart = await helper.usersInDb();

      const result = await api
        .post("/api/users")
        .send(user)
        .expect(statusCode)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + expectedIncrement);
      return { result, usersAtStart, usersAtEnd };
    };

    test("succeeds with an unique name", async () => {
      const newUser = {
        username: "BerzErkki",
        name: "Erkki Esimerkki",
        password: "LOL",
      };

      const usersAtEnd = (await postNewUserAndCheckDbLength(201, newUser, 1)).usersAtEnd;

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    const userAddFailTestCases = [
      {
        testName: "existing username",
        username: "MOG",
        password: "Lisp",
        expectedError: "username has to be unique",
      },
      {
        testName: "too short username",
        username: "G",
        password: "Lisp",
        expectedError: "is shorter than the minimum allowed length",
      },
      {
        testName: "no username",
        username: undefined,
        password: "Lisp",
        expectedError: "Path `username` is required",
      },
      {
        testName: "invalid password",
        username: "Joe",
        password: "L",
        expectedError: "malformatted password",
      },
    ];

    for (const testCase of userAddFailTestCases) {
      test(`with ${testCase.testName} fails and returns 400 Bad Request and the expected error message`, async () => {
        const newUser = {
          username: testCase.username,
          name: "Average Joe",
          password: testCase.password,
        };

        const result = (await postNewUserAndCheckDbLength(400, newUser, 0)).result;
        assert(result.body.error.includes(testCase.expectedError));
      });
    }
  });
});

after(async () => {
  await mongoose.connection.close();
});
