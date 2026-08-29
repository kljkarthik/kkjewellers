import API from './api';
import { fetchWithCache } from './cacheService';

export const getProducts = async (params = {}) => {
  const response = await API.get('/products', { params });
  return response.data;
};

export const getProductByCode = async (code) => {
  const response = await API.get(`/products/code/${code}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await API.get('/products/featured');
  return response.data;
};

export const getNewArrivals = async () => {
  const response = await API.get('/products/new-arrivals');
  return response.data;
};

export const getCategories = async () => {
  return fetchWithCache('categories', async () => {
    const response = await API.get('/categories');
    return response.data;
  }, 10 * 60 * 1000);
};

export const getCollections = async () => {
  return fetchWithCache('collections', async () => {
    const response = await API.get('/collections');
    return response.data;
  }, 10 * 60 * 1000);
};
