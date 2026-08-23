import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredAdminUser, adminLogin as loginApi, adminRegister as registerApi, adminLogout as logoutApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getStoredAdminUser();
    if (user) {
      setAdmin(user);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await loginApi(username, password);
    setAdmin(data);
    return data;
  };

  const register = async (username, password, fullName, email) => {
    const data = await registerApi(username, password, fullName, email);
    setAdmin(data);
    return data;
  };

  const logout = () => {
    logoutApi();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
