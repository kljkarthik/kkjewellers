import axios from 'axios';

// Get API base URL from VITE_API_URL or fallback to production Render backend / local proxy
const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.trim() : '';

  if (!url) {
    if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'))) {
      url = 'https://kk-jewellers-backend.onrender.com/api';
    } else {
      url = '/api';
    }
  }

  // Ensure base URL always ends with /api (without trailing slash)
  if (url.startsWith('http') && !url.endsWith('/api')) {
    url = url.replace(/\/+$/, '') + '/api';
  }

  return url;
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
