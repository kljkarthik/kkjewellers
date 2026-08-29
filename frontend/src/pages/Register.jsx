import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Calendar, Sparkles, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCustomer } from '../context/CustomerContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    preferredCategory: 'Bridal Collection'
  });

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useCustomer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreedTerms) {
      setError('Please agree to the Privacy Policy and Terms of Use.');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate('/account');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Email or Mobile may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 py-10 sm:py-16 relative overflow-hidden text-left">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/60"></div>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-xl bg-obsidian-950 border border-gold-500/40 shadow-2xl p-5 sm:p-12 relative z-10 animate-in zoom-in duration-300">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-6 sm:mb-8 border-b border-obsidian-600 pb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-lg sm:text-xl mx-auto mb-3">
              KK
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-gold-400 uppercase tracking-wide">
              JOIN KK JEWELLERS
            </h1>
            <p className="text-xs text-pearl-300 font-mono">
              Create your personal jewellery experience.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                />
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth & Preferred Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Date of Birth (Optional)</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Preferred Jewellery</label>
                <select
                  value={formData.preferredCategory}
                  onChange={e => setFormData({ ...formData, preferredCategory: e.target.value })}
                  className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                >
                  <option value="Bridal Collection">Bridal Collection</option>
                  <option value="Royal 22K Gold">Royal 22K Gold</option>
                  <option value="Solitaire Diamonds">Solitaire Diamonds</option>
                  <option value="Contemporary Fine Jewellery">Contemporary Fine Jewellery</option>
                  <option value="Men's Jewellery">Men's Jewellery</option>
                </select>
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-pearl-300 py-1">
                <input
                  type="checkbox"
                  required
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 accent-gold-500"
                />
                <span>I agree to the Privacy Policy and Terms of Use of KK JEWELLERS.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.25em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all mt-4 min-h-[48px]"
            >
              {loading ? 'Creating Personal Account...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-obsidian-600 text-center text-xs text-pearl-300 font-mono">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-400 font-bold hover:underline uppercase inline-block py-1">
              SIGN IN
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
