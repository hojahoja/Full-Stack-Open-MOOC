import axios from "axios";
const baseUrl = "/anecdotes";

const getAll = async () => (await axios.get(baseUrl)).data;

export default { getAll };
