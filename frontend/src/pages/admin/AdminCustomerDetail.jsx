import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, Heart, MessageSquare, RefreshCw } from 'lucide-react';
import API from '../../services/api';

const AdminCustomerDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/admin/customers/${id}`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching admin customer detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-pearl-100">
        <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
        <p className="font-mono text-xs">Loading customer profile...</p>
      </div>
    );
  }

  if (!data || !data.customer) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="font-serif text-xl text-gold-400">Customer Profile Not Found</p>
        <Link to="/admin/customers" className="px-6 py-2.5 bg-gold-500 text-obsidian-950 text-xs font-mono font-bold uppercase">
          RETURN TO CUSTOMER LIST
        </Link>
      </div>
    );
  }

  const customer = data.customer;
  const wishlist = data.wishlist || [];
  const enquiries = data.enquiries || [];
  const appointments = data.appointments || [];

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div className="space-y-1">
          <Link to="/admin/customers" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-gold-500 hover:underline uppercase mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Customers
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pearl-100 uppercase">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="text-xs text-pearl-300 font-mono">
            Customer ID: #{customer.id} &bull; Registered on {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN') : 'N/A'}
          </p>
        </div>

        <span className="px-3 py-1.5 bg-gold-500 text-obsidian-950 font-mono text-xs font-bold uppercase">
          {customer.status}
        </span>
      </div>

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-obsidian-900 p-6 border border-gold-500/30 space-y-2">
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">EMAIL ADDRESS</span>
          <p className="text-sm font-mono font-bold text-pearl-100">{customer.email}</p>
        </div>

        <div className="bg-obsidian-900 p-6 border border-gold-500/30 space-y-2">
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">MOBILE NUMBER</span>
          <p className="text-sm font-mono font-bold text-pearl-100">{customer.mobile}</p>
        </div>

        <div className="bg-obsidian-900 p-6 border border-gold-500/30 space-y-2">
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">PREFERRED JEWELLERY</span>
          <p className="text-sm font-mono font-bold text-gold-400">{customer.preferredCategory || 'Bridal Collection'}</p>
        </div>
      </div>

      {/* Grid: Wishlist & Interaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Wishlist Items */}
        <div className="bg-obsidian-900 p-6 border border-obsidian-600 space-y-4">
          <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold-500" /> Customer Wishlist ({wishlist.length})
          </h3>

          <div className="divide-y divide-obsidian-700 font-mono text-xs">
            {wishlist.length === 0 ? (
              <p className="py-4 text-pearl-300 text-center">No items saved in wishlist.</p>
            ) : (
              wishlist.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-pearl-100">{item.product?.name}</p>
                    <span className="text-[11px] text-gold-500">SKU: {item.product?.productCode}</span>
                  </div>
                  <Link to={`/product/${item.product?.productCode}`} target="_blank" className="text-gold-400 hover:underline">
                    View Piece
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Customer Enquiries & Appointments */}
        <div className="space-y-8">
          
          <div className="bg-obsidian-900 p-6 border border-obsidian-600 space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold-500" /> Enquiry History ({enquiries.length})
            </h3>

            <div className="divide-y divide-obsidian-700 font-mono text-xs">
              {enquiries.length === 0 ? (
                <p className="py-4 text-pearl-300 text-center">No submitted enquiries.</p>
              ) : (
                enquiries.map(enq => (
                  <div key={enq.id} className="py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-pearl-100">{enq.productName || 'General Enquiry'}</p>
                      <span className="px-2 py-0.5 bg-obsidian-950 text-gold-400 border border-gold-500/30 text-[10px]">
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-pearl-300 italic font-sans text-xs">"{enq.message}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-obsidian-900 p-6 border border-obsidian-600 space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold-500" /> Showroom Appointments ({appointments.length})
            </h3>

            <div className="divide-y divide-obsidian-700 font-mono text-xs">
              {appointments.length === 0 ? (
                <p className="py-4 text-pearl-300 text-center">No booked appointments.</p>
              ) : (
                appointments.map(app => (
                  <div key={app.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-pearl-100">{app.collectionName || 'Bridal Collection'}</p>
                      <span className="text-gold-500">Date: {app.preferredDate} &bull; Time: {app.preferredTime}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-obsidian-950 text-gold-400 border border-gold-500/30 text-[10px]">
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetail;
