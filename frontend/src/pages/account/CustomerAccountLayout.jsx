import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Heart,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import { useCustomer } from '../../context/CustomerContext';

const CustomerAccountLayout = () => {
  const { customer, logout, wishlistCount, unreadCount } = useCustomer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/account', icon: LayoutDashboard, end: true },
    { label: 'My Profile', path: '/account/profile', icon: User },
    { label: 'My Wishlist', path: '/account/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Saved Collections', path: '/account/collections', icon: Bookmark },
    { label: 'My Enquiries', path: '/account/enquiries', icon: MessageSquare },
    { label: 'Notifications', path: '/account/notifications', icon: Bell, badge: unreadCount },
    { label: 'Settings', path: '/account/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-20">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-obsidian-950 border-b border-gold-500/30 py-8 text-left">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gold-500">
              MY CUSTOMER ACCOUNT
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-gold-400 uppercase tracking-wide">
              WELCOME BACK, {customer?.firstName || 'MEMBER'}
            </h1>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-pearl-300">
            <span className="px-3 py-1.5 bg-obsidian-900 border border-gold-500/40 text-gold-400 font-bold uppercase">
              {customer?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main Account Portal Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-obsidian-950 border border-gold-500/30 p-4 text-left space-y-1">
            <div className="px-4 py-3 border-b border-obsidian-600 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-500">ACCOUNT NAVIGATION</span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-gold-500 text-obsidian-950 shadow-obsidian-glow font-extrabold'
                        : 'text-pearl-200 hover:bg-obsidian-900 hover:text-gold-400'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-obsidian-900 text-gold-400 border border-gold-500/40 text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-950/40 transition-colors pt-4 border-t border-obsidian-600 mt-4"
            >
              <LogOut className="w-4 h-4" /> LOG OUT
            </button>
          </aside>

          {/* Account Portal Main Content Container */}
          <section className="lg:col-span-9 bg-obsidian-950 border border-gold-500/30 p-6 sm:p-8 min-h-[500px]">
            <Outlet />
          </section>
        </div>
      </main>

      {/* Mobile Bottom Quick Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/95 backdrop-blur-md border-t border-gold-500/30 flex items-center justify-around py-2">
        <NavLink to="/account" end className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? 'text-gold-400 font-bold' : 'text-pearl-300'}`}>
          <LayoutDashboard className="w-5 h-5 mb-0.5" /> Overview
        </NavLink>
        <NavLink to="/account/wishlist" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono relative ${isActive ? 'text-gold-400 font-bold' : 'text-pearl-300'}`}>
          <Heart className="w-5 h-5 mb-0.5" /> Wishlist
          {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-obsidian-950 text-[9px] font-bold flex items-center justify-center">{wishlistCount}</span>}
        </NavLink>
        <NavLink to="/account/enquiries" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? 'text-gold-400 font-bold' : 'text-pearl-300'}`}>
          <MessageSquare className="w-5 h-5 mb-0.5" /> Enquiries
        </NavLink>
        <NavLink to="/account/profile" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? 'text-gold-400 font-bold' : 'text-pearl-300'}`}>
          <User className="w-5 h-5 mb-0.5" /> Profile
        </NavLink>
      </div>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default CustomerAccountLayout;
