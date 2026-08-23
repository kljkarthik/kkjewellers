import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Key, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: identify, 2: reset password, 3: success
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleIdentify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { identifier });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'No customer account found with specified email/mobile.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await API.post('/auth/reset-password', { identifier, newPassword });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-20">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 py-16 text-left">
        <div className="w-full max-w-md bg-obsidian-950 border border-gold-500/40 shadow-2xl p-8 sm:p-10">
          
          <div className="text-center space-y-2 mb-6 border-b border-obsidian-600 pb-6">
            <h1 className="font-serif text-3xl font-normal text-gold-400 uppercase tracking-wide">
              RECOVER ACCESS
            </h1>
            <p className="text-xs text-pearl-300 font-mono">
              Reset your KK JEWELLERS customer password.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleIdentify} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">
                  Registered Email / Mobile *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="text"
                    required
                    placeholder="Enter email or mobile"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all"
              >
                {loading ? 'Verifying Account...' : 'CONTINUE'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">New Password *</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Confirm New Password *</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all"
              >
                {loading ? 'Updating Password...' : 'UPDATE PASSWORD'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4 font-mono">
              <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-gold-400 uppercase">PASSWORD UPDATED</h4>
              <p className="text-xs text-pearl-300">Your customer password has been reset successfully.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-4 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow"
              >
                SIGN IN NOW
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-obsidian-600 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-pearl-300 hover:text-gold-400 uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4 text-gold-500" /> Return to Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
