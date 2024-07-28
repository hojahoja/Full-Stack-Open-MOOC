const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "APPLY_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const applyFilter = (filter) => {
  return {
    type: "APPLY_FILTER",
    payload: filter,
  };
};

export default filterReducer;
