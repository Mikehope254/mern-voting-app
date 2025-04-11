import axios from 'axios';

const host = 'http://localhost:4000/api';

export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const call = async (method, path, data = {}) => {
  try {
    const res = await axios({
      method,
      url: `${host}/${path}`,
      data,
    });
    return res.data;
  } catch (err) {
    // Optionally log error or standardize response
    console.error(
      `API ${method.toUpperCase()} ${path} failed:`,
      (err.response && err.response.data) || err.message,
    );
    throw (err.response && err.response.data) || err;
  }
};

export default { setToken, call };
