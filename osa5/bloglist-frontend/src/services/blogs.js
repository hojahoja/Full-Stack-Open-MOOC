import axios from "axios";
const baseUrl = "/api/blogs";
const auth = { headers: { Authorization: null } };

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (newToken) => (auth.headers.Authorization = `Bearer ${newToken}`);

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, auth);
  return response.data;
};

const update = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const remove = (id) => axios.delete(`${baseUrl}/${id}`, auth);

export default { getAll, setToken, create, update, remove };
