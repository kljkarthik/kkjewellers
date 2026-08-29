import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { bookAppointment } from '../services/leadService';

const BookVisitModal = ({ isOpen, onClose, initialCollection = '' }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    preferredDate: todayStr,
    preferredTime: '11:30 AM',
    collectionName: initialCollection || 'Bridal Collection',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await bookAppointment(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book showroom appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/90 backdrop-blur-md">
      <div className="bg-obsidian-900 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-none shadow-2xl border border-gold-500/40 animate-in fade-in duration-300 text-left">
        
        {/* Header */}
        <div className="bg-obsidian-950 text-pearl-100 p-4 sm:p-6 flex items-center justify-between border-b border-gold-500/30">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> VIP EXPERIENCE
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-gold-400 font-bold uppercase tracking-wider">BOOK SHOWROOM VISIT</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-pearl-300 hover:text-gold-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl text-gold-300 font-bold uppercase">Visit Scheduled</h4>
              <p className="text-pearl-200 text-xs font-light max-w-md mx-auto leading-relaxed">
                We are delighted to host you! Our concierge team will confirm your private showroom suite appointment for <span className="font-semibold text-gold-400">{formData.preferredDate}</span> at <span className="font-semibold text-gold-400">{formData.preferredTime}</span>.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {error && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Preferred Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-pearl-300" />
                    <select
                      value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                    >
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Interested Collection</label>
                <select
                  value={formData.collectionName}
                  onChange={e => setFormData({ ...formData, collectionName: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 min-h-[44px]"
                >
                  <option value="Bridal Collection">Bridal Collection</option>
                  <option value="Traditional Collection">Traditional Collection</option>
                  <option value="Contemporary Collection">Contemporary Collection</option>
                  <option value="Festival Collection">Festival Collection</option>
                  <option value="Daily Wear Collection">Daily Wear Collection</option>
                  <option value="Custom Bespoke Order">Custom Bespoke Order</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Special Requirements (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Mention specific ornaments or design preferences..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 min-h-[48px]"
              >
                {loading ? 'Booking Visit...' : 'Confirm Showroom Visit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookVisitModal;
