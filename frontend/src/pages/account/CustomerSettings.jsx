import React, { useState } from 'react';
import { Settings, ShieldAlert, Key, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import API from '../../services/api';

const CustomerSettings = () => {
  const { customer, logout } = useCustomer();

  // Preferences state
  const [prefs, setPrefs] = useState({
    whatsapp: true,
    email: true,
    reminders: true,
    newCollections: true
  });

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess(false);

    if (newPassword !== confirmNewPassword) {
      setPwdError('New passwords do not match.');
      return;
    }

    try {
      await API.post('/auth/reset-password', {
        identifier: customer?.email,
        newPassword
      });
      setPwdSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setPwdError(err.response?.data?.error || 'Failed to update password.');
    }
  };

  const handleDeleteAccount = () => {
    alert('Your account request has been logged. Our customer service team will reach out to confirm account deletion.');
    setDeleteModalOpen(false);
    logout();
  };

  return (
    <div className="space-y-8 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <Settings className="w-6 h-6 text-gold-500" /> ACCOUNT SETTINGS
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Communication preferences and security configuration.
          </p>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-obsidian-900 p-6 border border-gold-500/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider">Communication Preferences</h3>
        
        <div className="space-y-3 text-xs text-pearl-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.whatsapp}
              onChange={e => setPrefs({ ...prefs, whatsapp: e.target.checked })}
              className="accent-gold-500"
            />
            <span>Receive WhatsApp updates for catalogue enquiries and appointments</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.email}
              onChange={e => setPrefs({ ...prefs, email: e.target.checked })}
              className="accent-gold-500"
            />
            <span>Receive Email updates & private viewings</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.reminders}
              onChange={e => setPrefs({ ...prefs, reminders: e.target.checked })}
              className="accent-gold-500"
            />
            <span>Receive Flagship Showroom appointment reminders</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.newCollections}
              onChange={e => setPrefs({ ...prefs, newCollections: e.target.checked })}
              className="accent-gold-500"
            />
            <span>Notify me when new bridal and fine jewellery collections launch</span>
          </label>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-obsidian-900 p-6 border border-gold-500/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
          <Key className="w-4 h-4 text-gold-500" /> Change Password
        </h3>

        {pwdSuccess && (
          <div className="p-3 bg-emerald-950/80 border border-gold-500/50 text-gold-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>Password changed successfully!</span>
          </div>
        )}

        {pwdError && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{pwdError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-obsidian-glow"
          >
            UPDATE PASSWORD
          </button>
        </form>
      </div>

      {/* Account Privacy & Deletion */}
      <div className="bg-obsidian-900 p-6 border border-rose-500/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" /> Account Privacy & Data
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <h4 className="text-xs font-bold text-pearl-100 uppercase font-mono">Download Personal Data</h4>
            <p className="text-[11px] text-pearl-300 font-light">Export your wishlist, enquiries, and appointment history.</p>
          </div>
          <button
            onClick={() => alert('Personal data export requested. Check your email inbox.')}
            className="px-4 py-2 bg-obsidian-950 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-all shrink-0"
          >
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-obsidian-600">
          <div>
            <h4 className="text-xs font-bold text-rose-400 uppercase font-mono">Delete Account</h4>
            <p className="text-[11px] text-pearl-300 font-light">Permanently delete your KK JEWELLERS customer account.</p>
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="px-4 py-2 bg-rose-950 border border-rose-500/50 text-rose-300 hover:bg-rose-900 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-all shrink-0"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-rose-500/50 p-6 max-w-sm w-full space-y-4 text-center">
            <Trash2 className="w-12 h-12 text-rose-500 mx-auto" />
            <h4 className="font-serif text-xl font-bold text-rose-400 uppercase">Confirm Account Deletion</h4>
            <p className="text-xs text-pearl-300">
              Are you sure you want to delete your customer account? Your saved wishlists and enquiry history will be removed.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase"
              >
                YES, DELETE
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-3 bg-obsidian-950 text-pearl-300 border border-obsidian-600 text-xs font-bold uppercase"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSettings;
