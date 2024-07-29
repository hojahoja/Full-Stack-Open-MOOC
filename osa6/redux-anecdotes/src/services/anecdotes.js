import axios from "axios";
const baseUrl = "/anecdotes";

const getAll = async () => (await axios.get(baseUrl)).data;

const create = async (content) => (await axios.post(baseUrl, { content, votes: 0 })).data;

export default { getAll, create };
