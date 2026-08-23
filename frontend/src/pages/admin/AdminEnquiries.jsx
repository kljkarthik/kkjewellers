import React, { useState, useEffect } from 'react';
import { Eye, Trash2, X, RefreshCw, MessageCircle } from 'lucide-react';
import API from '../../services/api';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [status, setStatus] = useState('NEW');
  const [notes, setNotes] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/enquiries');
      setEnquiries(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenView = (e) => {
    setSelectedEnquiry(e);
    setStatus(e.status || 'NEW');
    setNotes(e.internalNotes || '');
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    try {
      await API.put(`/admin/enquiries/${selectedEnquiry.id}`, { status, internalNotes: notes });
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Failed to update enquiry status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete enquiry record?')) {
      await API.delete(`/admin/enquiries/${id}`);
      fetchData();
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Enquiry Lead Management</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Track and respond to customer catalogue enquiries and customization requests.</p>
        </div>
        <button onClick={fetchData} className="px-4 py-2 bg-obsidian-900 border border-gold-500/40 text-gold-500 hover:bg-gold-500 hover:text-obsidian-950 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="bg-obsidian-900 border border-obsidian-600 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-pearl-100"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold-500" /></div>
        ) : (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-obsidian-950 text-gold-500 uppercase tracking-widest text-[11px] border-b border-obsidian-600">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone / Email</th>
                <th className="p-4">Product Reference</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {enquiries.map(e => (
                <tr key={e.id} className="hover:bg-obsidian-950/60 transition-colors">
                  <td className="p-4 font-bold text-pearl-100 font-serif uppercase">{e.customerName}</td>
                  <td className="p-4 text-pearl-300">{e.phone}<br /><span className="text-[10px] text-gold-500">{e.email || 'No Email'}</span></td>
                  <td className="p-4 font-mono text-gold-400">{e.productName ? `${e.productName} (${e.productCode})` : 'General Catalogue Inquiry'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase border ${
                      e.status === 'NEW' ? 'bg-gold-500 text-obsidian-950 border-gold-400' :
                      e.status === 'CONTACTED' ? 'bg-obsidian-950 text-gold-400 border-gold-500/40' :
                      e.status === 'CLOSED' ? 'bg-obsidian-950 text-pearl-300 border-obsidian-600' : 'bg-emerald-950 text-gold-300 border-gold-500/50'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenView(e)} className="p-1.5 bg-obsidian-950 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 border border-gold-500/30 transition-colors" title="View & Update"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(e.id)} className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-gold-500/40 shadow-2xl w-full max-w-lg p-6 space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between border-b border-obsidian-600 pb-3">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase">Enquiry Details ({selectedEnquiry.customerName})</h3>
              <button onClick={() => setModalOpen(false)} className="text-pearl-300 hover:text-pearl-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <p><strong className="text-gold-500">Customer:</strong> {selectedEnquiry.customerName}</p>
              <p><strong className="text-gold-500">Phone:</strong> {selectedEnquiry.phone} &bull; <strong className="text-gold-500">Email:</strong> {selectedEnquiry.email || 'N/A'}</p>
              {selectedEnquiry.productName && (
                <p><strong className="text-gold-500">Product:</strong> {selectedEnquiry.productName} (Code: {selectedEnquiry.productCode})</p>
              )}
              <div className="p-3 bg-obsidian-950 border border-obsidian-600">
                <strong className="text-gold-500 block mb-1">Message:</strong>
                <p className="italic font-sans text-pearl-200">"{selectedEnquiry.message}"</p>
              </div>

              <div>
                <label className="block font-bold text-gold-500 uppercase mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100">
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                  <option value="INTERESTED">INTERESTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gold-500 uppercase mb-1">Internal Admin Notes</label>
                <textarea rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add private notes on WhatsApp call/quote sent..." className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + selectedEnquiry.customerName + ', regarding your KK JEWELLERS enquiry...')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 shadow-obsidian-glow"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <button onClick={handleUpdate} className="flex-1 py-3 bg-obsidian-950 border border-gold-500/40 text-pearl-100 hover:bg-gold-500 hover:text-obsidian-950 font-bold uppercase tracking-widest transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
