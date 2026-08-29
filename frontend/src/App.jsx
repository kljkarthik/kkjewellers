import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';

// Public Catalogue Pages (Lazy Loaded for Initial Bundle Reduction)
const Home = lazy(() => import('./pages/Home'));
const Collections = lazy(() => import('./pages/Collections'));
const NewArrivals = lazy(() => import('./pages/NewArrivals'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));

// Customer Auth & Portal Pages
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const CustomerAccountLayout = lazy(() => import('./pages/account/CustomerAccountLayout'));
const CustomerDashboard = lazy(() => import('./pages/account/CustomerDashboard'));
const CustomerProfile = lazy(() => import('./pages/account/CustomerProfile'));
const CustomerWishlist = lazy(() => import('./pages/account/CustomerWishlist'));
const CustomerSavedCollections = lazy(() => import('./pages/account/CustomerSavedCollections'));
const CustomerEnquiries = lazy(() => import('./pages/account/CustomerEnquiries'));
const CustomerAppointments = lazy(() => import('./pages/account/CustomerAppointments'));
const CustomerNotifications = lazy(() => import('./pages/account/CustomerNotifications'));
const CustomerSettings = lazy(() => import('./pages/account/CustomerSettings'));

// Admin Management Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboardLayout = lazy(() => import('./pages/admin/AdminDashboardLayout'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminCollections = lazy(() => import('./pages/admin/AdminCollections'));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'));
const AdminCustomerDetail = lazy(() => import('./pages/admin/AdminCustomerDetail'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminSecurity = lazy(() => import('./pages/admin/AdminSecurity'));

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

// Suspense Fallback Loader
const PageLoader = () => (
  <div className="min-h-[70vh] bg-obsidian-950 flex flex-col items-center justify-center space-y-4">
    <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-xs font-serif uppercase tracking-[0.2em] text-gold-400">Loading KK Jewellers...</span>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <SettingsProvider>
          <Suspense fallback={<PageLoader />}>
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
                <Route path="security" element={<AdminSecurity />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </SettingsProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
