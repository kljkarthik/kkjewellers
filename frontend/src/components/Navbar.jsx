import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, User, LogOut, ChevronDown, Lock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useCustomer } from '../context/CustomerContext';
import SearchModal from './SearchModal';

const Navbar = () => {
  const { settings } = useSettings();
  const { isAuthenticated: isCustomerAuth, wishlistCount, logout: customerLogout } = useCustomer();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Bridal', path: '/collections?collection=bridal-collection' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080908]/92 backdrop-blur-md text-pearl-100 py-4 border-b border-[#BFA76A]/30 shadow-2xl'
            : 'bg-gradient-to-b from-[#050605]/90 via-[#050605]/40 to-transparent text-pearl-100 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-gold-500/60 bg-obsidian-950 flex items-center justify-center font-serif text-gold-500 font-bold text-base tracking-widest group-hover:border-gold-400 transition-colors">
              KK
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                isScrolled ? 'text-gold-500' : 'text-pearl-100 group-hover:text-gold-400'
              }`}>
                {settings?.businessName || 'KK JEWELLERS'}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-gold-500 font-bold'
                      : 'text-pearl-100 hover:text-gold-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search, Wishlist, Profile/Login & Admin Link */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-pearl-100 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1"
            >
              <Search className="w-3.5 h-3.5 text-gold-500" /> Search
            </button>

            {/* WISHLIST BUTTON */}
            <Link
              to={isCustomerAuth ? "/account/wishlist" : "/login"}
              className="text-xs uppercase tracking-[0.2em] font-medium text-pearl-100 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1 relative"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4 text-gold-500" />
              {wishlistCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-gold-500 text-obsidian-950 font-bold text-[9px] flex items-center justify-center -ml-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CUSTOMER ACCOUNT DROPDOWN / SIGN IN BUTTON */}
            {isCustomerAuth ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="px-4 py-2 bg-obsidian-950 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-obsidian-950 text-[11px] font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" /> MY ACCOUNT <ChevronDown className="w-3 h-3" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-obsidian-950 border border-gold-500/40 shadow-2xl py-2 z-50 text-left font-mono text-xs animate-in fade-in zoom-in duration-200">
                    <Link
                      to="/account"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-pearl-100 hover:bg-obsidian-900 hover:text-gold-400 uppercase"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account/wishlist"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-pearl-100 hover:bg-obsidian-900 hover:text-gold-400 uppercase flex items-center justify-between"
                    >
                      Wishlist {wishlistCount > 0 && <span className="text-gold-500">({wishlistCount})</span>}
                    </Link>
                    <Link
                      to="/account/enquiries"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-pearl-100 hover:bg-obsidian-900 hover:text-gold-400 uppercase"
                    >
                      My Enquiries
                    </Link>
                    <Link
                      to="/account/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-pearl-100 hover:bg-obsidian-900 hover:text-gold-400 uppercase"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-obsidian-600 my-1"></div>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        customerLogout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-4 py-2 text-rose-400 hover:bg-rose-950/40 uppercase font-bold flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs uppercase tracking-[0.2em] font-medium text-pearl-100 hover:text-gold-400 transition-colors py-1"
              >
                Sign In
              </Link>
            )}

            {/* ADMIN PORTAL ICON LINK */}
            <Link
              to="/admin/login"
              className="p-2 text-gold-500 hover:text-gold-400 border border-gold-500/30 bg-obsidian-950 hover:border-gold-400 transition-all flex items-center justify-center"
              title="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button onClick={() => setSearchOpen(true)} className="text-gold-500 p-1">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gold-500 p-1">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian-950/98 text-pearl-100 border-b border-gold-500/30 px-6 py-6 space-y-3 backdrop-blur-lg animate-in slide-in-from-top duration-300 text-left font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-[0.2em] font-medium py-3 border-b border-obsidian-700 text-pearl-100 hover:text-gold-400"
              >
                {link.name}
              </Link>
            ))}

            {isCustomerAuth ? (
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-[0.2em] font-bold py-3 border-b border-obsidian-700 text-gold-400"
              >
                My Customer Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-[0.2em] font-bold py-3 border-b border-obsidian-700 text-gold-400"
              >
                Sign In / Register
              </Link>
            )}

            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-[0.2em] font-mono font-bold py-3 text-gold-500 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Admin Portal
            </Link>
          </div>
        )}
      </header>

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
