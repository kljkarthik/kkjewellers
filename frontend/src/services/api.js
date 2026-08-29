import axios from 'axios';

// Get API base URL from env or fallback to Render production backend / local dev server
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://kk-jewellers-backend.onrender.com/api';
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s timeout for free-tier Render backend spin up
});

// Interceptor to attach JWT token for authenticated endpoints
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('kk_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
