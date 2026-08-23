import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, Eye, Heart, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/customers', {
        params: { search: search.trim(), status: statusFilter }
      });
      setCustomers(response.data || []);
    } catch (err) {
      console.error('Error fetching admin customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, statusFilter]);

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-6 h-6 text-gold-500" /> Customer Management
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Registered customer accounts, wishlist analytics & lead history.
          </p>
        </div>

        <button
          onClick={fetchCustomers}
          className="px-4 py-2 bg-obsidian-900 border border-gold-500/40 hover:bg-gold-500 hover:text-obsidian-950 text-gold-500 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
        >
          <RefreshCw className="w-4 h-4" /> Refresh List
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-obsidian-900 p-4 border border-obsidian-600">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gold-500" />
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-pearl-300">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-obsidian-950 border border-gold-500/30 text-xs font-mono text-pearl-100"
            >
              <option value="ALL">All Accounts</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-obsidian-900 border border-obsidian-600 overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-obsidian-950 border-b border-obsidian-600 text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider">
              <th className="p-4">Customer Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Wishlist</th>
              <th className="p-4">Enquiries</th>
              <th className="p-4">Visits</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-700 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-pearl-300">
                  <RefreshCw className="w-6 h-6 animate-spin text-gold-500 mx-auto mb-2" />
                  <span>Loading customer list...</span>
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-pearl-300">
                  No registered customers found matching criteria.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-obsidian-950/60 transition-colors">
                  <td className="p-4 font-bold text-pearl-100">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="p-4 text-pearl-300">{c.email}</td>
                  <td className="p-4 text-gold-400">{c.mobile}</td>
                  <td className="p-4 text-pearl-200">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-gold-500" /> {c.wishlistCount}
                    </span>
                  </td>
                  <td className="p-4 text-pearl-200">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-gold-500" /> {c.enquiryCount}
                    </span>
                  </td>
                  <td className="p-4 text-pearl-200">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-500" /> {c.appointmentCount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      c.status === 'ACTIVE'
                        ? 'bg-gold-500 text-obsidian-950 border-gold-400'
                        : 'bg-obsidian-950 text-pearl-300 border-obsidian-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/customers/${c.id}`}
                      className="px-3 py-1.5 bg-obsidian-950 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 text-[11px] font-bold uppercase transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Profile
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
