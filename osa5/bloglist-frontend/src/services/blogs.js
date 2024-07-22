import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const create = async (newBlog) => {
  const auth = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, auth);

  return response.data;
};

const update = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};
export default { getAll, setToken, create, update };
