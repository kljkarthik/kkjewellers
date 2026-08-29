import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderTree, Layers, Users,
  MessageSquare, Image, Settings, LogOut, Menu, X, Globe, Shield 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const AdminDashboardLayout = () => {
  const { admin, logout } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Collections', path: '/admin/collections', icon: Layers },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
    { name: 'Change Password', path: '/admin/security', icon: Shield },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex font-sans text-pearl-100">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-obsidian-950 text-pearl-100 border-r border-gold-500/30 shrink-0">
        
        {/* Brand */}
        <div className="p-6 border-b border-obsidian-600 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-lg">
            KK
          </div>
          <div className="text-left">
            <h2 className="font-serif text-base font-bold text-gold-500 tracking-wider uppercase">
              {settings?.businessName || 'KK JEWELLERS'}
            </h2>
            <span className="text-[9px] text-pearl-300 uppercase tracking-widest font-mono">Management Portal</span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-obsidian-glow'
                    : 'text-pearl-200 hover:bg-obsidian-900 hover:text-gold-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-obsidian-950' : 'text-gold-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-obsidian-600 space-y-2">
          <Link
            to="/"
            className="w-full px-4 py-2.5 bg-obsidian-900 hover:bg-gold-500 hover:text-obsidian-950 text-gold-500 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-gold-500/30 transition-colors"
          >
            <Globe className="w-4 h-4 text-gold-500" /> View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-rose-500/40"
          >
            <LogOut className="w-4 h-4" /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-obsidian-950 border-b border-gold-500/30 px-6 py-4 flex items-center justify-between shadow-md text-pearl-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-gold-500"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2 text-left">
              <Shield className="w-5 h-5 text-gold-500 hidden sm:block" />
              <h1 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider">
                Admin Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-mono text-gold-400 hover:text-gold-300 border-b border-gold-500/40 pb-0.5 hidden sm:flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> Public Catalogue &rarr;
            </Link>

            <Link
              to="/admin/security"
              className="text-right border-l border-obsidian-600 pl-4 hover:opacity-80 transition-opacity group cursor-pointer block"
              title="Click to Change Username & Password"
            >
              <p className="text-xs font-bold text-pearl-100 group-hover:text-gold-400 flex items-center gap-1">
                {admin?.fullName || 'Master Admin'} <Shield className="w-3 h-3 text-gold-500" />
              </p>
              <p className="text-[10px] text-gold-500 font-mono font-semibold uppercase">{admin?.username || localStorage.getItem('kk_admin_username') || 'admin'}</p>
            </Link>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="p-6 sm:p-8 flex-grow overflow-y-auto bg-obsidian-900 text-pearl-100">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-sm lg:hidden flex">
          <div className="w-4/5 max-w-xs bg-obsidian-950 text-pearl-100 h-full p-6 flex flex-col justify-between animate-in slide-in-from-left">
            <div>
              <div className="flex items-center justify-between border-b border-obsidian-600 pb-4 mb-4">
                <h2 className="font-serif text-lg font-bold text-gold-400 uppercase">KK JEWELLERS</h2>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-pearl-300">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-xs font-mono font-semibold uppercase tracking-wider ${
                        isActive ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-pearl-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-gold-500" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2 pt-4 border-t border-obsidian-600">
              <Link to="/" onClick={() => setMobileSidebarOpen(false)} className="w-full py-2.5 bg-gold-500 text-obsidian-950 text-xs font-mono font-bold uppercase rounded-none flex items-center justify-center gap-2 shadow-obsidian-glow">
                <Globe className="w-4 h-4" /> View Public Site
              </Link>
              <button onClick={handleLogout} className="w-full py-2.5 bg-rose-950 text-rose-300 text-xs font-mono font-bold uppercase rounded-none flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardLayout;
