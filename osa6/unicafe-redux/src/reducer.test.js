import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  const incrementTestCases = [
    { name: "good", action: "GOOD", expectedState: { ...initialState, good: 1 } },
    { name: "ok", action: "OK", expectedState: { ...initialState, ok: 1 } },
    { name: "bad", action: "BAD", expectedState: { ...initialState, bad: 1 } },
  ];

  for (const testCase of incrementTestCases) {
    test(`${testCase.name} is incremented`, () => {
      const action = {
        type: testCase.action,
      };
      const state = initialState;

      deepFreeze(state);
      const newState = counterReducer(state, action);
      expect(newState).toEqual(testCase.expectedState);
    });
  }
  test("ZERO resets everything back to initial state", () => {
    const state = { good: 4, ok: 2, bad: 3 };
    const action = { type: "ZERO" };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
