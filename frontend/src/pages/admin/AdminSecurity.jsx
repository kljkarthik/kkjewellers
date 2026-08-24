import React, { useState } from 'react';
import { Shield, Key, Lock, User, CheckCircle2, ShieldAlert } from 'lucide-react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminSecurity = () => {
  const { admin } = useAuth();

  const [credForm, setCredForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!credForm.currentPassword) {
      setError('Current password is required to save security changes.');
      return;
    }

    if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    if (!credForm.newUsername && !credForm.newPassword) {
      setError('Please enter a new username or a new password to update.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.put('/admin/auth/profile', {
        currentPassword: credForm.currentPassword,
        newUsername: credForm.newUsername.trim() || undefined,
        newPassword: credForm.newPassword.trim() || undefined
      });

      if (res.data && res.data.token) {
        localStorage.setItem('kk_admin_token', res.data.token);
        if (res.data.username) {
          localStorage.setItem('kk_admin_username', res.data.username);
        }
      }

      setSuccess('Admin Security Credentials (Username & Password) updated successfully!');
      setCredForm({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update admin security credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="border-b border-obsidian-600 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider flex items-center gap-3">
            <Shield className="w-8 h-8 text-gold-500" /> Account Security & Password
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-1">
            Update your administrator login username and change your access password.
          </p>
        </div>

        <div className="bg-obsidian-950 border border-gold-500/30 px-4 py-2 text-right">
          <span className="text-[10px] text-pearl-300 uppercase font-mono block">Logged In As</span>
          <span className="text-xs font-bold font-mono text-gold-400 uppercase">{admin?.username || localStorage.getItem('kk_admin_username') || 'admin'}</span>
        </div>
      </div>

      {/* Main Security Form Card */}
      <div className="bg-obsidian-900 border border-gold-500/40 shadow-2xl p-6 sm:p-8 font-mono text-xs space-y-6">
        
        {error && (
          <div className="p-4 bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-950/90 border border-gold-500/60 text-gold-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Current Password */}
          <div className="bg-obsidian-950 p-4 border border-gold-500/30 space-y-2">
            <label className="block text-xs font-bold text-gold-400 uppercase flex items-center gap-2">
              <Key className="w-4 h-4 text-gold-500" /> 1. Enter Current Password (Required) *
            </label>
            <input
              type="password"
              required
              placeholder="Enter your current password to authorize changes"
              value={credForm.currentPassword}
              onChange={e => setCredForm({ ...credForm, currentPassword: e.target.value })}
              className="w-full p-3 bg-obsidian-900 border border-gold-500/40 text-xs text-gold-300 focus:outline-none focus:border-gold-400 font-bold"
            />
          </div>

          {/* Step 2: New Username */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-gold-400 uppercase border-b border-obsidian-700 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-gold-500" /> 2. Change Admin Username (Optional)
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">New Username</label>
              <input
                type="text"
                placeholder="Leave blank if keeping current username"
                value={credForm.newUsername}
                onChange={e => setCredForm({ ...credForm, newUsername: e.target.value })}
                className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-pearl-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          {/* Step 3: New Password */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-gold-400 uppercase border-b border-obsidian-700 pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold-500" /> 3. Change Admin Password (Optional)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">New Strong Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={credForm.newPassword}
                  onChange={e => setCredForm({ ...credForm, newPassword: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-pearl-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={credForm.confirmPassword}
                  onChange={e => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-pearl-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all mt-4"
          >
            {loading ? 'Updating Credentials...' : (
              <>
                <Shield className="w-4 h-4" /> SAVE USERNAME & PASSWORD CHANGES
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminSecurity;
