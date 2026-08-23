import API from './api';

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
  const response = await API.get('/categories');
  return response.data;
};

export const getCollections = async () => {
  const response = await API.get('/collections');
  return response.data;
};
