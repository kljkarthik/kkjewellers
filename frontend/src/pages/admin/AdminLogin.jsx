import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Key, ShieldAlert, ArrowLeft, RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset Password State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetTargetUsername, setResetTargetUsername] = useState('');
  const [resetNewUsername, setResetNewUsername] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Backend server on Render is spinning up (free tier cold start). Please wait 30 seconds and click Sign In again.');
      } else if (err.response?.status === 404 || err.response?.data === 'Not Found') {
        setError('Backend API unreachable or URL incorrect. Please check VITE_API_URL or wait for Render backend to finish waking up.');
      } else {
        setError(err.response?.data?.error || 'Invalid admin credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!resetNewPassword) {
      setError('Please enter a new password.');
      setLoading(false);
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setError('New password and confirmation password do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await API.post('/admin/auth/reset-password', {
        username: resetTargetUsername.trim(),
        newUsername: resetNewUsername.trim() || undefined,
        newPassword: resetNewPassword.trim()
      });

      setSuccess(res.data?.message || 'Password updated successfully! Logging you in...');
      
      const finalUsername = resetNewUsername.trim() || resetTargetUsername.trim();
      const finalPassword = resetNewPassword.trim();

      // Automatically sign in with new credentials
      setTimeout(async () => {
        try {
          await login(finalUsername, finalPassword);
          navigate('/admin/dashboard');
        } catch {
          setIsResetMode(false);
          setUsername(finalUsername);
          setPassword(finalPassword);
        }
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset admin password.');
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
      <div className="w-full max-w-sm sm:max-w-md bg-obsidian-900 rounded-none shadow-2xl overflow-hidden border border-gold-500/40 relative z-10 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-obsidian-950 text-pearl-100 p-6 sm:p-8 text-center border-b border-gold-500/30">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-lg sm:text-xl mx-auto mb-3">
            KK
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gold-500 tracking-[0.2em] uppercase">KK JEWELLERS</h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-pearl-300 font-mono mt-1">
            {isResetMode ? 'RESET ADMIN CREDENTIALS' : 'ADMIN PORTAL'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8 font-mono text-xs">
          
          {error && (
            <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-950/80 border border-gold-500/50 text-gold-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-gold-400" />
              <span>{success}</span>
            </div>
          )}

          {!isResetMode ? (
            /* NORMAL LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">Username / Email *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider">Password *</label>
                  <button
                    type="button"
                    onClick={() => { setIsResetMode(true); setError(''); setSuccess(''); }}
                    className="text-[10px] text-gold-400 hover:text-gold-300 underline uppercase tracking-wider min-h-[36px] flex items-center"
                  >
                    Forgot / Change Password?
                  </button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow transition-all flex items-center justify-center gap-2 mt-2 min-h-[48px]"
              >
                {loading ? 'Authenticating...' : (
                  <>
                    <Lock className="w-4 h-4" /> SIGN IN TO ADMIN
                  </>
                )}
              </button>
            </form>
          ) : (
            /* RESET PASSWORD FORM */
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">Target Account Username *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={resetTargetUsername}
                    onChange={(e) => setResetTargetUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">New Username (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter new username if changing"
                  value={resetNewUsername}
                  onChange={(e) => setResetNewUsername(e.target.value)}
                  className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">New Password *</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="Enter new strong password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">Confirm New Password *</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsResetMode(false); setError(''); setSuccess(''); }}
                  className="w-1/3 py-3 bg-obsidian-950 hover:bg-obsidian-800 text-pearl-300 border border-obsidian-700 font-bold uppercase tracking-wider text-xs min-h-[44px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-wider text-xs shadow-obsidian-glow flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {loading ? 'Resetting...' : (
                    <>
                      <Shield className="w-4 h-4" /> RESET PASSWORD
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Return to Public Website */}
          <div className="mt-8 pt-6 border-t border-obsidian-700 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono font-bold text-pearl-300 hover:text-gold-400 uppercase tracking-widest transition-colors min-h-[44px]"
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
