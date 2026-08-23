import API from './api';

export const customerRegister = async (data) => {
  const response = await API.post('/auth/register', data);
  if (response.data.token) {
    localStorage.setItem('kk_customer_token', response.data.token);
    localStorage.setItem('kk_customer_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const customerLogin = async (identifier, password) => {
  const response = await API.post('/auth/login', { identifier, password });
  if (response.data.token) {
    localStorage.setItem('kk_customer_token', response.data.token);
    localStorage.setItem('kk_customer_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const sendCustomerOtp = async (mobile) => {
  const response = await API.post('/auth/otp-send', { mobile });
  return response.data;
};

export const verifyCustomerOtp = async (mobile, otp) => {
  const response = await API.post('/auth/otp-verify', { mobile, otp });
  if (response.data.token) {
    localStorage.setItem('kk_customer_token', response.data.token);
    localStorage.setItem('kk_customer_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const customerLogout = () => {
  localStorage.removeItem('kk_customer_token');
  localStorage.removeItem('kk_customer_user');
};

export const getStoredCustomer = () => {
  const user = localStorage.getItem('kk_customer_user');
  return user ? JSON.parse(user) : null;
};

// Customer Portal API calls
export const getCustomerProfile = async (id) => {
  const response = await API.get('/customer/profile', { params: { customerId: id } });
  return response.data;
};

export const updateCustomerProfile = async (data) => {
  const response = await API.put('/customer/profile', data);
  if (response.data) {
    const stored = getStoredCustomer();
    const updated = { ...stored, ...response.data };
    localStorage.setItem('kk_customer_user', JSON.stringify(updated));
  }
  return response.data;
};

export const getCustomerWishlist = async (customerId) => {
  const response = await API.get('/customer/wishlist', { params: { customerId } });
  return response.data;
};

export const toggleWishlistItem = async (productId, customerId) => {
  const response = await API.post(`/customer/wishlist/${productId}`, null, { params: { customerId } });
  return response.data;
};

export const getSavedCollections = async (customerId) => {
  const response = await API.get('/customer/collections', { params: { customerId } });
  return response.data;
};

export const toggleSavedCollection = async (collectionId, customerId) => {
  const response = await API.post(`/customer/collections/${collectionId}`, null, { params: { customerId } });
  return response.data;
};

export const getCustomerEnquiries = async (customerId) => {
  const response = await API.get('/customer/enquiries', { params: { customerId } });
  return response.data;
};

export const getCustomerAppointments = async (customerId) => {
  const response = await API.get('/customer/appointments', { params: { customerId } });
  return response.data;
};

export const cancelCustomerAppointment = async (id, customerId) => {
  const response = await API.put(`/customer/appointments/${id}/cancel`, null, { params: { customerId } });
  return response.data;
};

export const getCustomerNotifications = async (customerId) => {
  const response = await API.get('/customer/notifications', { params: { customerId } });
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await API.put(`/customer/notifications/${id}/read`);
  return response.data;
};
