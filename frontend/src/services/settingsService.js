import API from './api';
import { fetchWithCache } from './cacheService';

export const getWebsiteSettings = async () => {
  return fetchWithCache('website_settings', async () => {
    const response = await API.get('/settings');
    return response.data;
  }, 10 * 60 * 1000); // 10 minutes cache
};

export const getGallery = async (category = 'All') => {
  const cacheKey = `gallery_${category || 'All'}`;
  return fetchWithCache(cacheKey, async () => {
    const response = await API.get('/gallery', { params: { category } });
    return response.data;
  }, 5 * 60 * 1000); // 5 minutes cache
};
