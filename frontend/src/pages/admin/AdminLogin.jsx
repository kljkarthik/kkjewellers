import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Key, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Access restricted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden text-left">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/60"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md bg-obsidian-900 rounded-none shadow-2xl overflow-hidden border border-gold-500/40 relative z-10 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-obsidian-950 text-pearl-100 p-8 text-center border-b border-gold-500/30">
          <div className="w-12 h-12 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-xl mx-auto mb-3">
            KK
          </div>
          <h2 className="font-serif text-2xl font-bold text-gold-500 tracking-[0.2em] uppercase">KK JEWELLERS</h2>
          <p className="text-xs uppercase tracking-[0.25em] text-pearl-300 font-mono mt-1">ADMIN PORTAL</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          
          {error && (
            <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Username / Email *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Password *</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Authenticating...' : (
                <>
                  <Lock className="w-4 h-4" /> SIGN IN TO ADMIN
                </>
              )}
            </button>
          </form>

          {/* Return to Public Website */}
          <div className="mt-8 pt-6 border-t border-obsidian-700 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pearl-300 hover:text-gold-400 uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gold-500" /> Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
