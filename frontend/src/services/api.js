import axios from 'axios';

// Get API base URL from VITE_API_URL or fallback to production Render backend / local proxy
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'))) {
    return 'https://kk-jewellers-backend.onrender.com/api';
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000, // 45s timeout to allow free-tier Render backend cold starts to finish
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
