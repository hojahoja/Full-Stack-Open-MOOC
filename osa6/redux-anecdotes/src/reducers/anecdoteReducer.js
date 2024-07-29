import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const { id, increment } = action.payload;
      state.forEach((a) => {
        if (a.id === id) a.votes += increment;
      });

      return state.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => async (dispatch) =>
  dispatch(setAnecdotes(await anecdoteService.getAll()));

export const createAnecdote = (content) => async (dispatch) =>
  dispatch(appendAnecdote(await anecdoteService.create(content)));

export const voteAnecdote = (anecdote) => async (dispatch) => {
  try {
    dispatch(incrementVote({ id: anecdote.id, increment: 1 }));
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 });
  } catch (exception) {
    console.error(exception.message);
    dispatch(incrementVote({ id: anecdote.id, increment: -1 }));
  }
};

export default anecdotesSlice.reducer;
