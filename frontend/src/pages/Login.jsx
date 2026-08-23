import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ShieldAlert, Key, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCustomer } from '../context/CustomerContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useCustomer();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(identifier, password);
      navigate('/account');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please check your email/mobile and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-20">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 py-16 relative overflow-hidden text-left">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/60"></div>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-obsidian-950 border border-gold-500/40 shadow-2xl p-8 sm:p-10 relative z-10 animate-in zoom-in duration-300">
          
          <div className="text-center space-y-2 mb-6 border-b border-obsidian-600 pb-6">
            <div className="w-12 h-12 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-xl mx-auto mb-3">
              KK
            </div>
            <h1 className="font-serif text-3xl font-normal text-gold-400 uppercase tracking-wide">
              WELCOME BACK
            </h1>
            <p className="text-xs text-pearl-300 font-mono">
              Continue discovering the world of KK JEWELLERS.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Email / Mobile *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                <input
                  type="text"
                  required
                  placeholder="Email or Mobile"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider">Password *</label>
                <Link to="/forgot-password" className="text-[11px] font-mono text-gold-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-pearl-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="accent-gold-500"
                />
                <span>Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? 'Authenticating...' : 'SIGN IN'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-obsidian-600 text-center text-xs text-pearl-300 font-mono space-y-2">
            <div>
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-400 font-bold hover:underline uppercase">
                CREATE ACCOUNT
              </Link>
            </div>
            <div>
              <Link to="/admin/login" className="text-gold-500 hover:text-gold-400 text-[11px] inline-flex items-center gap-1 uppercase">
                <Lock className="w-3 h-3" /> Admin Staff Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
