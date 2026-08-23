import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach JWT token for admin endpoints
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('kk_admin_token');
  if (token && config.url.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
