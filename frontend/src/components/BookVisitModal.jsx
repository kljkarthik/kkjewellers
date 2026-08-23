import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-950/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gold-400/40 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="bg-wine-900 text-ivory-50 p-6 flex items-center justify-between relative border-b border-gold-500/30">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> VIP Experience
            </span>
            <h3 className="font-serif text-2xl text-gold-300 font-bold">Book Showroom Visit</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-ivory-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
              <h4 className="font-serif text-2xl text-wine-900 font-bold mb-2">Visit Scheduled</h4>
              <p className="text-ivory-700 text-sm mb-6 max-w-md mx-auto">
                We are delighted to host you! Our concierge team will confirm your private showroom suite appointment for <span className="font-semibold text-wine-900">{formData.preferredDate}</span> at <span className="font-semibold text-wine-900">{formData.preferredTime}</span>.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-wine-800 hover:bg-wine-900 text-gold-300 rounded-lg text-sm uppercase tracking-wider font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-ivory-600" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-ivory-600" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-ivory-600" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-ivory-600" />
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Preferred Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-ivory-600" />
                    <select
                      value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
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
                <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Interested Collection</label>
                <select
                  value={formData.collectionName}
                  onChange={e => setFormData({ ...formData, collectionName: e.target.value })}
                  className="w-full p-2.5 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
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
                <label className="block text-xs font-semibold text-ivory-800 uppercase tracking-wider mb-1">Special Requirements (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Mention specific ornaments or design preferences..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-ivory-50/50 border border-ivory-300 rounded-lg text-sm text-ivory-900 focus:outline-none focus:border-gold-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-wine-800 hover:bg-wine-900 text-gold-300 rounded-xl font-semibold uppercase tracking-widest text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
