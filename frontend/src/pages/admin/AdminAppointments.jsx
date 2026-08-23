import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Edit3, X, RefreshCw } from 'lucide-react';
import API from '../../services/api';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('PENDING');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/appointments');
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenEdit = (a) => {
    setSelectedApp(a);
    setStatus(a.status || 'PENDING');
    setModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;
    try {
      await API.put(`/admin/appointments/${selectedApp.id}`, { status });
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Failed to update appointment status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete appointment?')) {
      await API.delete(`/admin/appointments/${id}`);
      fetchData();
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Showroom Visit Appointments</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Manage VIP showroom consultation visits and private suite bookings.</p>
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
                <th className="p-4">Phone</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Interested Collection</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {appointments.map(a => (
                <tr key={a.id} className="hover:bg-obsidian-950/60 transition-colors">
                  <td className="p-4 font-bold text-pearl-100 font-serif uppercase">{a.customerName}</td>
                  <td className="p-4 font-mono text-gold-400">{a.phone}</td>
                  <td className="p-4 font-bold text-pearl-100">{a.preferredDate} @ {a.preferredTime}</td>
                  <td className="p-4 text-pearl-300">{a.collectionName || 'General Visit'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase border ${
                      a.status === 'CONFIRMED' ? 'bg-gold-500 text-obsidian-950 border-gold-400' :
                      a.status === 'PENDING' ? 'bg-amber-950 text-amber-400 border-amber-500/50' :
                      a.status === 'CANCELLED' ? 'bg-rose-950 text-rose-300 border-rose-500/40' : 'bg-obsidian-950 text-pearl-300 border-obsidian-600'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(a)} className="p-1.5 bg-obsidian-950 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 border border-gold-500/30 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-gold-500/40 shadow-2xl w-full max-w-md p-6 space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between border-b border-obsidian-600 pb-3">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase">Update Appointment</h3>
              <button onClick={() => setModalOpen(false)} className="text-pearl-300 hover:text-pearl-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <p><strong className="text-gold-500">Customer:</strong> {selectedApp.customerName} ({selectedApp.phone})</p>
              <p><strong className="text-gold-500">Date & Time:</strong> {selectedApp.preferredDate} at {selectedApp.preferredTime}</p>
              {selectedApp.message && <p className="italic bg-obsidian-950 p-2.5 border border-obsidian-600 font-sans text-pearl-200">"{selectedApp.message}"</p>}

              <div>
                <label className="block font-bold text-gold-500 uppercase mb-1">Appointment Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100">
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <button onClick={handleUpdateStatus} className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow">
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
