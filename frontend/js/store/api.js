import axios from 'axios';
import cookie from 'cookie';

const api = axios.create();
api.interceptors.request.use((config) => {
  const { csrftoken } = cookie.parse(document.cookie);
  const user = JSON.parse(localStorage.getItem('user'));
  if (csrftoken) {
    config.headers['X-CSRFTOKEN'] = csrftoken;
  }
  if (user) {
    config.headers['Authorization'] = `Token ${user.token}`;
  }
  return config;
});

export default api;
