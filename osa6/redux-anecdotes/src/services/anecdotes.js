import axios from "axios";
const baseUrl = "/anecdotes";

const getAll = async () => (await axios.get(baseUrl)).data;

const create = async (content) => (await axios.post(baseUrl, { content, votes: 0 })).data;

const update = async (id, newObject) => (await axios.put(`${baseUrl}/${id}`, newObject)).data;

export default { getAll, create, update };
