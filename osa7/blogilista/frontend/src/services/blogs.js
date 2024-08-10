import axios from "axios";
const baseUrl = "/api/blogs";
const auth = { headers: { Authorization: null } };

const setToken = (newToken) => (auth.headers.Authorization = `Bearer ${newToken}`);

const getAll = async () => (await axios.get(baseUrl)).data;

const create = async (newBlog) => (await axios.post(baseUrl, newBlog, auth)).data;

const createBlogComment = async (id, comment) =>
  (await axios.post(`${baseUrl}/${id}/comments`, { comment })).data;

const update = async (id) => (await axios.put(`${baseUrl}/${id}`)).data;

const remove = (id) => axios.delete(`${baseUrl}/${id}`, auth);

export default { getAll, setToken, create, createBlogComment, update, remove };
