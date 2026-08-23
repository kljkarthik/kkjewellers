import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';
import { getCustomerEnquiries } from '../../services/customerAuthService';

const CustomerEnquiries = () => {
  const { customer } = useCustomer();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    if (!customer?.id) return;
    setLoading(true);
    try {
      const data = await getCustomerEnquiries(customer.id);
      setEnquiries(data || []);
    } catch (err) {
      console.error('Error fetching customer enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [customer]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 bg-gold-500 text-obsidian-950 font-mono text-[10px] font-bold uppercase">RECEIVED</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-1 bg-emerald-950 border border-gold-500/50 text-gold-400 font-mono text-[10px] font-bold uppercase">CONTACTED</span>;
      case 'FOLLOW_UP':
        return <span className="px-2.5 py-1 bg-obsidian-900 border border-amber-500/50 text-amber-400 font-mono text-[10px] font-bold uppercase font-mono">FOLLOW-UP</span>;
      case 'INTERESTED':
        return <span className="px-2.5 py-1 bg-gold-400 text-obsidian-950 font-mono text-[10px] font-bold uppercase">INTERESTED</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-1 bg-obsidian-900 border border-obsidian-600 text-pearl-300 font-mono text-[10px] font-bold uppercase">CLOSED</span>;
      default:
        return <span className="px-2.5 py-1 bg-obsidian-900 text-pearl-300 font-mono text-[10px] uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-gold-500" /> MY ENQUIRIES
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Track customer service responses and price quotes for your enquiries.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-pearl-300">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-600 space-y-4">
          <MessageSquare className="w-12 h-12 text-gold-500/40 mx-auto" />
          <p className="font-serif text-xl text-gold-400 font-bold uppercase">No Active Enquiries</p>
          <p className="text-xs text-pearl-300 max-w-sm mx-auto">
            You haven't submitted any jewellery enquiries yet. Click below to explore our piece details and send an enquiry.
          </p>
          <Link
            to="/collections"
            className="inline-block px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow"
          >
            BROWSE JEWELLERY
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(enq => (
            <div key={enq.id} className="bg-obsidian-900 border border-gold-500/30 p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-600 pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-pearl-100 uppercase">
                    {enq.productName ? `${enq.productName} (${enq.productCode})` : 'General Showroom Enquiry'}
                  </h3>
                  <span className="text-[11px] text-pearl-300 font-mono flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    Submitted on {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                </div>
                <div>{getStatusBadge(enq.status)}</div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-pearl-200 leading-relaxed font-light bg-obsidian-950 p-4 border border-obsidian-600">
                  "{enq.message}"
                </p>
              </div>

              {enq.productCode && (
                <div className="pt-2 flex justify-end">
                  <Link
                    to={`/product/${enq.productCode}`}
                    className="text-xs font-mono text-gold-400 hover:underline uppercase flex items-center gap-1"
                  >
                    VIEW PIECE DETAILS <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerEnquiries;
