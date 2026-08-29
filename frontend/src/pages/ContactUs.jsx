import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useSettings } from '../context/SettingsContext';
import { submitEnquiry, bookAppointment } from '../services/leadService';

const ContactUs = () => {
  const { settings } = useSettings();
  
  const [activeTab, setActiveTab] = useState('enquiry'); // 'enquiry' | 'appointment'

  // Enquiry Form
  const [enquiryForm, setEnquiryForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Appointment Form
  const todayStr = new Date().toISOString().split('T')[0];
  const [appointForm, setAppointForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    preferredDate: todayStr,
    preferredTime: '11:00 AM',
    collectionName: 'Bridal Collection',
    message: ''
  });
  const [appointLoading, setAppointLoading] = useState(false);
  const [appointSuccess, setAppointSuccess] = useState(false);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    try {
      await submitEnquiry(enquiryForm);
      setEnquirySuccess(true);
    } catch (err) {
      alert('Failed to send enquiry.');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleAppointSubmit = async (e) => {
    e.preventDefault();
    setAppointLoading(true);
    try {
      await bookAppointment(appointForm);
      setAppointSuccess(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to book appointment.');
    } finally {
      setAppointLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '919440156446'}?text=${encodeURIComponent('Hello KK JEWELLERS, I would like to get directions and visit your showroom.')}`;

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      <section className="bg-obsidian-950 text-pearl-100 py-10 sm:py-20 border-b border-gold-500/30 text-center px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block mb-2">
            FLAGSHIP LOUNGE & CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-gold-400 uppercase tracking-wide">
            EXPERIENCE KK JEWELLERS
          </h1>
          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto mt-2 sm:mt-3 font-light leading-relaxed">
            Discover our collections in person at our flagship showroom lounge. Private bridal consultation suites available.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 flex-grow w-full space-y-8 sm:space-y-16">
        
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-900 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-500 mx-auto">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-gold-400 uppercase">Showroom Address</h3>
            <p className="text-xs text-pearl-300 font-light leading-relaxed">{settings?.address}</p>
          </div>

          <div className="bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-900 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-500 mx-auto">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-gold-400 uppercase">Phone Concierge</h3>
            <p className="text-xs text-pearl-100 font-mono font-bold">{settings?.phone}</p>
            <p className="text-[11px] text-pearl-300">Mon - Sun: 10:30 AM - 08:30 PM</p>
          </div>

          <div className="bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-900 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-500 mx-auto">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-gold-400 uppercase">WhatsApp Concierge</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-xs text-gold-400 font-mono font-bold hover:underline block py-1">
              +{(settings?.whatsappNumber)} (Click to Chat)
            </a>
          </div>

          <div className="bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-900 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-500 mx-auto">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-gold-400 uppercase">Email Enquiries</h3>
            <p className="text-xs text-pearl-100 font-mono font-bold">{settings?.email}</p>
          </div>
        </div>

        {/* Section 28 & 30 Form & Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Form Container */}
          <div className="lg:col-span-7 bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 shadow-2xl text-left">
            
            {/* Tab Selector Buttons */}
            <div className="flex border-b border-obsidian-600 mb-6 sm:mb-8">
              <button
                onClick={() => setActiveTab('enquiry')}
                className={`flex-1 py-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest transition-colors min-h-[44px] ${
                  activeTab === 'enquiry'
                    ? 'border-b-2 border-gold-500 text-gold-500'
                    : 'text-pearl-300 hover:text-gold-400'
                }`}
              >
                MAKE AN ENQUIRY
              </button>
              <button
                onClick={() => setActiveTab('appointment')}
                className={`flex-1 py-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest transition-colors min-h-[44px] ${
                  activeTab === 'appointment'
                    ? 'border-b-2 border-gold-500 text-gold-500'
                    : 'text-pearl-300 hover:text-gold-400'
                }`}
              >
                BOOK SHOWROOM VISIT
              </button>
            </div>

            {/* TAB 1: MAKE AN ENQUIRY FORM */}
            {activeTab === 'enquiry' && (
              enquirySuccess ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-gold-500 mx-auto animate-bounce" />
                  <h4 className="font-serif text-2xl font-bold text-gold-400 uppercase">THANK YOU</h4>
                  <p className="text-xs text-pearl-300 font-mono">Our jewellery specialist will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={enquiryForm.customerName}
                      onChange={e => setEnquiryForm({ ...enquiryForm, customerName: e.target.value })}
                      className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400 min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={enquiryForm.phone}
                        onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={enquiryForm.email}
                        onChange={e => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Message *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Specify your enquiry..."
                      value={enquiryForm.message}
                      onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={enquiryLoading}
                    className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all min-h-[48px]"
                  >
                    <Send className="w-4 h-4" /> SEND ENQUIRY
                  </button>
                </form>
              )
            )}

            {/* TAB 2: BOOK SHOWROOM VISIT */}
            {activeTab === 'appointment' && (
              appointSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-gold-500 mx-auto animate-bounce" />
                  <h4 className="font-serif text-2xl font-bold text-gold-400 uppercase">Appointment Confirmed</h4>
                  <p className="text-xs text-pearl-300 font-mono">We look forward to welcoming you to KK JEWELLERS!</p>
                </div>
              ) : (
                <form onSubmit={handleAppointSubmit} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={appointForm.customerName}
                      onChange={e => setAppointForm({ ...appointForm, customerName: e.target.value })}
                      className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={appointForm.phone}
                        onChange={e => setAppointForm({ ...appointForm, phone: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Email</label>
                      <input
                        type="email"
                        value={appointForm.email}
                        onChange={e => setAppointForm({ ...appointForm, email: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={appointForm.preferredDate}
                        onChange={e => setAppointForm({ ...appointForm, preferredDate: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase mb-1">Preferred Time *</label>
                      <select
                        value={appointForm.preferredTime}
                        onChange={e => setAppointForm({ ...appointForm, preferredTime: e.target.value })}
                        className="w-full p-3 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={appointLoading}
                    className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-obsidian-glow flex items-center justify-center gap-2 transition-all min-h-[48px]"
                  >
                    <Calendar className="w-4 h-4" /> REQUEST A VISIT
                  </button>
                </form>
              )
            )}
          </div>

          {/* Right Google Maps & Location Directions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-obsidian-950 p-5 sm:p-8 border border-gold-500/30 shadow-2xl space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-400 uppercase">Showroom Map</h3>
              <p className="text-xs text-pearl-300 font-light">{settings?.address}</p>

              <div className="aspect-[4/3] overflow-hidden bg-obsidian-900 border border-gold-500/30">
                <iframe
                  title="KK JEWELLERS Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.428456184511!2d81.1917804!3d17.0118298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a365e70dec22845%3A0x96133a8e2d0219a1!2sKK%20JEWELLERS!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full border-0 filter invert contrast-125 saturate-50"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              {settings?.googleMapsUrl && (
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-colors shadow-obsidian-glow min-h-[44px]"
                >
                  <MapPin className="w-4 h-4" /> GET DIRECTIONS
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default ContactUs;
