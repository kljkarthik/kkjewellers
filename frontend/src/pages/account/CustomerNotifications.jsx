import React, { useState, useEffect } from 'react';
import { Bell, Check, RefreshCw, CheckCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { getCustomerNotifications, markNotificationRead } from '../../services/customerAuthService';

const CustomerNotifications = () => {
  const { customer, refreshCustomerData } = useCustomer();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!customer?.id) return;
    setLoading(true);
    try {
      const data = await getCustomerNotifications(customer.id);
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [customer]);

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    await fetchNotifications();
    await refreshCustomerData();
  };

  const handleMarkAllRead = async () => {
    for (const n of notifications.filter(n => !n.isRead)) {
      await markNotificationRead(n.id);
    }
    await fetchNotifications();
    await refreshCustomerData();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <Bell className="w-6 h-6 text-gold-500" /> NOTIFICATIONS
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Important updates on your appointments, enquiries, and collection launches.
          </p>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-obsidian-900 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-all"
          >
            <CheckCheck className="w-4 h-4" /> MARK ALL AS READ
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-pearl-300">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-600 space-y-4">
          <Bell className="w-12 h-12 text-gold-500/40 mx-auto" />
          <p className="font-serif text-xl text-gold-400 font-bold uppercase">No Notifications</p>
          <p className="text-xs text-pearl-300">You are all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-5 border transition-all flex items-start justify-between gap-4 ${
                !n.isRead
                  ? 'bg-obsidian-900 border-gold-500/50 shadow-md'
                  : 'bg-obsidian-950 border-obsidian-600 opacity-75'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {!n.isRead && <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>}
                  <h3 className="font-serif text-base font-bold text-pearl-100 uppercase">{n.title}</h3>
                </div>
                <p className="text-xs text-pearl-300 font-light leading-relaxed">{n.message}</p>
                <span className="text-[10px] font-mono text-gold-500 block pt-1">
                  {n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                </span>
              </div>

              {!n.isRead && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  className="p-2 bg-obsidian-950 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 transition-colors shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerNotifications;
