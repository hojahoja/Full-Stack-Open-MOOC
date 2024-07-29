import { createSlice } from "@reduxjs/toolkit";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const noteToChange = state.find((a) => a.id === id);
      noteToChange.votes += 1;

      return state.sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
