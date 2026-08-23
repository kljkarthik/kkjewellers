import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';

// Public Catalogue Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import NewArrivals from './pages/NewArrivals';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// Customer Auth & Portal Pages
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CustomerAccountLayout from './pages/account/CustomerAccountLayout';
import CustomerDashboard from './pages/account/CustomerDashboard';
import CustomerProfile from './pages/account/CustomerProfile';
import CustomerWishlist from './pages/account/CustomerWishlist';
import CustomerSavedCollections from './pages/account/CustomerSavedCollections';
import CustomerEnquiries from './pages/account/CustomerEnquiries';
import CustomerAppointments from './pages/account/CustomerAppointments';
import CustomerNotifications from './pages/account/CustomerNotifications';
import CustomerSettings from './pages/account/CustomerSettings';

// Admin Management Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboardLayout from './pages/admin/AdminDashboardLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCollections from './pages/admin/AdminCollections';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCustomerDetail from './pages/admin/AdminCustomerDetail';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminGallery from './pages/admin/AdminGallery';
import AdminSettings from './pages/admin/AdminSettings';

// Protected Route Guard for Admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

// Protected Route Guard for Customer
const ProtectedCustomerRoute = ({ children }) => {
  const { isAuthenticated, loading } = useCustomer();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <SettingsProvider>
          <Routes>
            {/* Public Catalogue Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/product/:productCode" element={<ProductDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Customer Authentication Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Customer Account Routes */}
            <Route
              path="/account"
              element={
                <ProtectedCustomerRoute>
                  <CustomerAccountLayout />
                </ProtectedCustomerRoute>
              }
            >
              <Route index element={<CustomerDashboard />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="wishlist" element={<CustomerWishlist />} />
              <Route path="collections" element={<CustomerSavedCollections />} />
              <Route path="enquiries" element={<CustomerEnquiries />} />
              <Route path="appointments" element={<CustomerAppointments />} />
              <Route path="notifications" element={<CustomerNotifications />} />
              <Route path="settings" element={<CustomerSettings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboardLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="collections" element={<AdminCollections />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="customers/:id" element={<AdminCustomerDetail />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SettingsProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
