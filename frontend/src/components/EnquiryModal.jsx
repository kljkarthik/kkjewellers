import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { submitEnquiry } from '../services/leadService';

const EnquiryModal = ({ isOpen, onClose, product = null }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productId: '',
    productName: '',
    productCode: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        productId: product.id || '',
        productName: product.name || '',
        productCode: product.productCode || '',
        message: `Hello KK JEWELLERS, I am interested in ${product.name} (Product Code: ${product.productCode}). Please share price estimates and customization details.`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        message: 'Hello KK JEWELLERS, I would like to inquire about your jewellery collection.'
      }));
    }
    setSuccess(false);
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.message) {
      setError('Please provide your Name, Mobile Number, and Message.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await submitEnquiry(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md">
      <div className="bg-emerald-900 w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-gold-500/40 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="bg-emerald-950 text-ivory-50 p-6 flex items-center justify-between border-b border-gold-500/30">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold block">
              HOUSE OF KK JEWELLERS
            </span>
            <h3 className="font-serif text-2xl text-gold-400 font-bold uppercase tracking-wider">
              MAKE IT YOURS
            </h3>
            <p className="text-xs text-ivory-300 font-light mt-0.5">
              Interested in a piece? Our jewellery specialists would be delighted to assist you.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-ivory-400 hover:text-gold-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl text-gold-300 font-bold uppercase">Enquiry Sent Successfully</h4>
              <p className="text-ivory-200 text-xs font-light max-w-md mx-auto leading-relaxed">
                Thank you for your inquiry. Our senior jewellery master will connect with you via call or WhatsApp shortly.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gold-500 text-emerald-950 text-xs font-bold uppercase tracking-widest"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
              {error && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono">
                  {error}
                </div>
              )}

              {product && (
                <div className="p-3 bg-emerald-950 border border-gold-500/30 flex items-center gap-3">
                  {product.images && product.images[0] && (
                    <img 
                      src={product.images[0].imageUrl} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover border border-gold-500/40"
                    />
                  )}
                  <div>
                    <p className="font-serif text-xs font-bold text-ivory-50 uppercase">{product.name}</p>
                    <p className="text-[11px] text-gold-400 font-mono font-semibold">SKU: {product.productCode}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-ivory-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-emerald-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-ivory-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-emerald-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-ivory-400" />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-emerald-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-gold-400 uppercase mb-1">Message *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-emerald-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold text-xs uppercase tracking-[0.25em] shadow-gold-glow flex items-center justify-center gap-2 transition-all"
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send className="w-4 h-4" /> SEND ENQUIRY
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
