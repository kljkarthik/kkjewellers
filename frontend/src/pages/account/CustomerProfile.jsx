import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { updateCustomerProfile } from '../../services/customerAuthService';

const CustomerProfile = () => {
  const { customer, refreshCustomerData } = useCustomer();

  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    mobile: customer?.mobile || '',
    dateOfBirth: customer?.dateOfBirth || '',
    preferredCategory: customer?.preferredCategory || 'Bridal Collection'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await updateCustomerProfile(formData);
      await refreshCustomerData();
      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide">
            MY PROFILE
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Manage your personal details and consultation preferences.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-widest transition-all shadow-obsidian-glow"
          >
            EDIT PROFILE
          </button>
        )}
      </div>

      {success && (
        <div className="p-3 bg-emerald-950/80 border border-gold-500/50 text-gold-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold-400" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">First Name</label>
            <input
              type="text"
              disabled={!isEditing}
              required
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Last Name</label>
            <input
              type="text"
              disabled={!isEditing}
              required
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              disabled={!isEditing}
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Mobile Number</label>
            <input
              type="tel"
              disabled={!isEditing}
              required
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Date of Birth</label>
            <input
              type="date"
              disabled={!isEditing}
              value={formData.dateOfBirth || ''}
              onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-1">Preferred Category</label>
            <select
              disabled={!isEditing}
              value={formData.preferredCategory}
              onChange={e => setFormData({ ...formData, preferredCategory: e.target.value })}
              className={`w-full p-3 bg-obsidian-900 border ${isEditing ? 'border-gold-500/40 text-pearl-100' : 'border-obsidian-600 text-pearl-300'} text-xs font-medium`}
            >
              <option value="Bridal Collection">Bridal Collection</option>
              <option value="Royal 22K Gold">Royal 22K Gold</option>
              <option value="Solitaire Diamonds">Solitaire Diamonds</option>
              <option value="Contemporary Fine Jewellery">Contemporary Fine Jewellery</option>
              <option value="Men's Jewellery">Men's Jewellery</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow"
            >
              {loading ? 'Saving...' : 'SAVE CHANGES'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-obsidian-900 text-pearl-300 border border-obsidian-600 text-xs font-bold uppercase tracking-widest"
            >
              CANCEL
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerProfile;
