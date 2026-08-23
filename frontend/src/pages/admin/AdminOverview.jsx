import React, { useState, useEffect } from 'react';
import { Package, FolderTree, Layers, Sparkles, MessageSquare, Calendar, ArrowUpRight, RefreshCw, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, enqRes, appRes] = await Promise.all([
        API.get('/admin/dashboard/stats'),
        API.get('/admin/enquiries'),
        API.get('/admin/appointments')
      ]);
      setStats(statsRes.data);
      setRecentEnquiries((enqRes.data || []).slice(0, 5));
      setRecentAppointments((appRes.data || []).slice(0, 5));
    } catch (err) {
      console.error('Error fetching admin dashboard overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-pearl-100">
        <RefreshCw className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">
            Dashboard Metrics
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            KK JEWELLERS digital showroom live operational status & lead synchronisation.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2.5 bg-obsidian-900 border border-gold-500/40 hover:bg-gold-500 hover:text-obsidian-950 text-gold-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Status
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400">Total Products</p>
            <h3 className="font-serif text-3xl font-bold text-pearl-100 mt-1">{stats?.totalProducts || 0}</h3>
            <span className="text-[11px] text-pearl-300 font-mono">Active Catalogue Items</span>
          </div>
          <div className="w-12 h-12 bg-obsidian-950 border border-gold-500/40 text-gold-500 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400">New Enquiries</p>
            <h3 className="font-serif text-3xl font-bold text-pearl-100 mt-1">{stats?.newEnquiriesCount || 0}</h3>
            <span className="text-[11px] text-gold-300 font-bold font-mono">Customer Leads</span>
          </div>
          <div className="w-12 h-12 bg-obsidian-950 border border-gold-500/40 text-gold-500 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400">Pending Visits</p>
            <h3 className="font-serif text-3xl font-bold text-pearl-100 mt-1">{stats?.upcomingAppointmentsCount || 0}</h3>
            <span className="text-[11px] text-gold-300 font-bold font-mono">Showroom Bookings</span>
          </div>
          <div className="w-12 h-12 bg-obsidian-950 border border-gold-500/40 text-gold-500 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400">Taxonomies</p>
            <h3 className="font-serif text-3xl font-bold text-pearl-100 mt-1">
              {stats?.totalCategories || 0} / {stats?.totalCollections || 0}
            </h3>
            <span className="text-[11px] text-pearl-300 font-mono">Categories & Collections</span>
          </div>
          <div className="w-12 h-12 bg-obsidian-950 border border-gold-500/40 text-gold-500 flex items-center justify-center">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tables Grid: Recent Enquiries & Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries Card */}
        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-obsidian-600 pb-3">
            <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gold-500" /> Recent Customer Enquiries
            </h3>
          </div>

          <div className="divide-y divide-obsidian-700">
            {recentEnquiries.length === 0 ? (
              <p className="text-xs text-pearl-300 py-6 text-center">No customer enquiries received yet.</p>
            ) : (
              recentEnquiries.map(enq => (
                <div key={enq.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-xs text-pearl-100">{enq.customerName} <span className="text-pearl-300 font-normal">({enq.phone})</span></p>
                    <p className="text-[11px] text-gold-400 font-mono">{enq.productName ? `${enq.productName} (${enq.productCode})` : 'General Enquiry'}</p>
                  </div>
                  <span className={`text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 border ${
                    enq.status === 'NEW' ? 'bg-gold-500 text-obsidian-950 border-gold-400' : 'bg-obsidian-950 text-pearl-300 border-obsidian-600'
                  }`}>
                    {enq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Showroom Visit Appointments */}
        <div className="bg-obsidian-900 p-6 border border-obsidian-600 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-obsidian-600 pb-3">
            <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-500" /> Showroom Visit Bookings
            </h3>
          </div>

          <div className="divide-y divide-obsidian-700">
            {recentAppointments.length === 0 ? (
              <p className="text-xs text-pearl-300 py-6 text-center">No upcoming showroom visits booked yet.</p>
            ) : (
              recentAppointments.map(app => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-xs text-pearl-100">{app.customerName} <span className="text-pearl-300 font-normal">({app.phone})</span></p>
                    <p className="text-[11px] text-gold-400 font-mono">Date: {app.preferredDate} &bull; Time: {app.preferredTime}</p>
                  </div>
                  <span className={`text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 border ${
                    app.status === 'CONFIRMED' ? 'bg-gold-500 text-obsidian-950 border-gold-400' : 'bg-obsidian-950 text-pearl-300 border-obsidian-600'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
