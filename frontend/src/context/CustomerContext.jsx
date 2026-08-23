import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredCustomer,
  customerLogin as loginApi,
  customerRegister as registerApi,
  verifyCustomerOtp as otpVerifyApi,
  customerLogout as logoutApi,
  getCustomerWishlist,
  toggleWishlistItem,
  getCustomerNotifications
} from '../services/customerAuthService';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCustomerData = async (user) => {
    if (!user || !user.id) return;
    try {
      const [wishlistItems, notifications] = await Promise.all([
        getCustomerWishlist(user.id),
        getCustomerNotifications(user.id)
      ]);
      if (Array.isArray(wishlistItems)) {
        const ids = new Set(wishlistItems.map(item => item.product?.id).filter(Boolean));
        setWishlistIds(ids);
      }
      if (Array.isArray(notifications)) {
        setUnreadCount(notifications.filter(n => !n.isRead).length);
      }
    } catch (err) {
      console.error('Error fetching customer data:', err);
    }
  };

  useEffect(() => {
    const user = getStoredCustomer();
    if (user) {
      setCustomer(user);
      fetchCustomerData(user);
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    const data = await loginApi(identifier, password);
    setCustomer(data);
    await fetchCustomerData(data);
    return data;
  };

  const register = async (formData) => {
    const data = await registerApi(formData);
    setCustomer(data);
    await fetchCustomerData(data);
    return data;
  };

  const loginWithOtp = async (mobile, otp) => {
    const data = await otpVerifyApi(mobile, otp);
    setCustomer(data);
    await fetchCustomerData(data);
    return data;
  };

  const logout = () => {
    logoutApi();
    setCustomer(null);
    setWishlistIds(new Set());
    setUnreadCount(0);
  };

  const toggleWishlist = async (productId) => {
    if (!customer) return { requiresLogin: true };
    try {
      const res = await toggleWishlistItem(productId, customer.id);
      setWishlistIds(prev => {
        const next = new Set(prev);
        if (res.saved) {
          next.add(productId);
        } else {
          next.delete(productId);
        }
        return next;
      });
      return { success: true, saved: res.saved };
    } catch (err) {
      console.error('Error toggling wishlist item:', err);
      return { success: false, error: err.message };
    }
  };

  const isWishlisted = (productId) => {
    return wishlistIds.has(productId);
  };

  return (
    <CustomerContext.Provider value={{
      customer,
      isAuthenticated: !!customer,
      login,
      register,
      loginWithOtp,
      logout,
      wishlistCount: wishlistIds.size,
      wishlistIds,
      toggleWishlist,
      isWishlisted,
      unreadCount,
      refreshCustomerData: () => fetchCustomerData(customer),
      loading
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
