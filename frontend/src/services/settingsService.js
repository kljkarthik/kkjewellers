import API from './api';

export const getWebsiteSettings = async () => {
  const response = await API.get('/settings');
  return response.data;
};

export const getGallery = async (category) => {
  const response = await API.get('/gallery', { params: { category } });
  return response.data;
};
