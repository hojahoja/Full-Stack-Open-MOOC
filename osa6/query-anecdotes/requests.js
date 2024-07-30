import axios from "axios";
const baseUrl = "/anecdotes";

export const getAllAnecdotes = async () => (await axios.get(baseUrl)).data;

export const createAnecdote = async (newAnecdote) => (await axios.post(baseUrl, newAnecdote)).data;
