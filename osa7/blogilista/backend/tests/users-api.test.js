const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const { test, before, beforeEach, describe, after } = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./testing-helper");
const app = require("../app");
const api = supertest(app);

describe("When the db already has some users", () => {
  beforeEach(async () => {
    const passwordHash = "pretendThisPasswordIsHashed";
    const user = new User({ username: "MOG", passwordHash });

    await User.deleteMany({}).where("username").nin("GOD");
    await user.save();
  });

  describe("creating a new user", () => {
    //Remove username used for authentication in the other test file until I find a better solution
    const concurrencyCorrection = (usersAtStart, usersAtEnd) => {
      const rule = (acc, u) => (u.username !== "GOD" ? acc + 1 : acc);

      const beforePost = usersAtStart.reduce(rule, 0);
      const afterPost = usersAtEnd.reduce(rule, 0);
      return { beforePost, afterPost };
    };

    const postNewUserAndCheckDbLength = async (statusCode, user, expectedIncrement) => {
      const usersAtStart = await helper.usersInDb();

      const result = await api
        .post("/api/users")
        .send(user)
        .expect(statusCode)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      /*Because of multiple test files running concurrently the other test might insert it's user into the shared DB
      before usersAtStart is declared or after it which has the side effect of increasing one or both*/
      const amountOfUsers = concurrencyCorrection(usersAtStart, usersAtEnd);
      assert.strictEqual(amountOfUsers.afterPost, amountOfUsers.beforePost + expectedIncrement);
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

describe("When db has an user with a proper password", () => {
  before(async () => {
    await User.deleteMany({}).where("username").nin("GOD");
    const passwordHash = await bcrypt.hash("PretendThisIsAProperPassword", 10);
    const user = new User({ username: "DOG", passwordHash });
    await user.save();
  });
  describe("logging in", () => {
    const loginTestTemplate = {
      testName: "with wrong password doesn't give user a token",
      username: "DOG",
      password: "IncorrectPassword",
      expectedStatusCode: 401,
      expectedResult: false,
      expectedError: "invalid username or password",
    };

    const loginVariations = [
      {
        testName: "with nonexistent username doesn't give user a token",
        username: "WHO?",
      },
      {
        testName: "with correct credentials gives user a token",
        password: "PretendThisIsAProperPassword",
        expectedStatusCode: 200,
        expectedResult: true,
        expectedError: undefined,
      },
    ];

    const loginTestCases = helper.createTestCases(loginTestTemplate, loginVariations);

    for (const testCase of loginTestCases) {
      test(testCase.testName, async () => {
        const result = await api
          .post("/api/login")
          .send({ username: testCase.username, password: testCase.password })
          .expect(testCase.expectedStatusCode)
          .expect("Content-Type", /application\/json/);

        assert.strictEqual(typeof result.body.token === "string", testCase.expectedResult);
        assert.strictEqual(result.body.error, testCase.expectedError);
      });
    }
  });
});

after(async () => {
  await mongoose.connection.close();
});
