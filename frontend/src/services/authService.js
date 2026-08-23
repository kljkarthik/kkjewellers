import API from './api';

export const adminLogin = async (username, password) => {
  const response = await API.post('/admin/auth/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('kk_admin_token', response.data.token);
    localStorage.setItem('kk_admin_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const adminRegister = async (username, password, fullName, email) => {
  const response = await API.post('/admin/auth/register', { username, password, fullName, email });
  if (response.data.token) {
    localStorage.setItem('kk_admin_token', response.data.token);
    localStorage.setItem('kk_admin_user', JSON.stringify(response.data));
  }
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem('kk_admin_token');
  localStorage.removeItem('kk_admin_user');
};

export const getStoredAdminUser = () => {
  const user = localStorage.getItem('kk_admin_user');
  return user ? JSON.parse(user) : null;
};
