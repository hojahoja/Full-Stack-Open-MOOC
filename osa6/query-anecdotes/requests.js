import axios from "axios";
const baseUrl = "/anecdotes";

export const getAll = async () => (await axios.get(baseUrl)).data;
