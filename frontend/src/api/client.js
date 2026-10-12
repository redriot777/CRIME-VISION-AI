import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Network error — unable to reach the server.'));
    }
    const msg = error.response?.data?.detail || error.response?.data?.message || error.message;
    return Promise.reject(new Error(msg));
  }
);

export default client;
