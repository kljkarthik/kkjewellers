import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, XCircle, RefreshCw, Plus } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { getCustomerAppointments, cancelCustomerAppointment } from '../../services/customerAuthService';
import BookVisitModal from '../../components/BookVisitModal';

const CustomerAppointments = () => {
  const { customer } = useCustomer();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const fetchAppointments = async () => {
    if (!customer?.id) return;
    setLoading(true);
    try {
      const data = await getCustomerAppointments(customer.id);
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching customer appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [customer]);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this showroom visit appointment?')) {
      await cancelCustomerAppointment(id, customer.id);
      await fetchAppointments();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/50 text-amber-400 font-mono text-[10px] font-bold uppercase">PENDING</span>;
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 bg-gold-500 text-obsidian-950 font-mono text-[10px] font-bold uppercase">CONFIRMED</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 bg-emerald-950 border border-gold-500/40 text-gold-400 font-mono text-[10px] font-bold uppercase">COMPLETED</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 bg-obsidian-900 border border-obsidian-600 text-pearl-300 font-mono text-[10px] font-bold uppercase">CANCELLED</span>;
      default:
        return <span className="px-2.5 py-1 bg-obsidian-900 text-pearl-300 font-mono text-[10px] uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gold-500" /> MY APPOINTMENTS
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Manage your flagship showroom VIP consultation visits.
          </p>
        </div>

        <button
          onClick={() => setBookModalOpen(true)}
          className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-obsidian-glow"
        >
          <Plus className="w-4 h-4" /> BOOK VISIT
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-pearl-300">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-600 space-y-4">
          <Calendar className="w-12 h-12 text-gold-500/40 mx-auto" />
          <p className="font-serif text-xl text-gold-400 font-bold uppercase">No Upcoming Visits</p>
          <p className="text-xs text-pearl-300 max-w-sm mx-auto">
            Book a private VIP lounge consultation to view our bridal and fine jewellery collections.
          </p>
          <button
            onClick={() => setBookModalOpen(true)}
            className="px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow"
          >
            BOOK SHOWROOM VISIT NOW
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => (
            <div key={app.id} className="bg-obsidian-900 border border-gold-500/30 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-pearl-100 uppercase">{app.collectionName || 'Bridal Collection'}</span>
                  {getStatusBadge(app.status)}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-pearl-300">
                  <span className="flex items-center gap-1.5 text-gold-400">
                    <Calendar className="w-3.5 h-3.5" /> Date: {app.preferredDate}
                  </span>
                  <span className="flex items-center gap-1.5 text-gold-400">
                    <Clock className="w-3.5 h-3.5" /> Time: {app.preferredTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-pearl-300">
                    <MapPin className="w-3.5 h-3.5 text-gold-500" /> Flagship Showroom Lounge
                  </span>
                </div>

                {app.message && (
                  <p className="text-xs text-pearl-300 italic font-light">"{app.message}"</p>
                )}
              </div>

              {app.status === 'PENDING' && (
                <button
                  onClick={() => handleCancel(app.id)}
                  className="px-4 py-2 border border-rose-500/40 text-rose-400 hover:bg-rose-950/60 text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <BookVisitModal
        isOpen={bookModalOpen}
        onClose={() => {
          setBookModalOpen(false);
          fetchAppointments();
        }}
      />
    </div>
  );
};

export default CustomerAppointments;
