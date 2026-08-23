import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, MessageSquare, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { getCustomerEnquiries, getCustomerAppointments, getSavedCollections } from '../../services/customerAuthService';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/productService';

const CustomerDashboard = () => {
  const { customer, wishlistCount } = useCustomer();
  const [savedColCount, setSavedColCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!customer?.id) return;
      try {
        const [cols, enqs, apps, prods] = await Promise.all([
          getSavedCollections(customer.id),
          getCustomerEnquiries(customer.id),
          getCustomerAppointments(customer.id),
          getProducts({ featured: true })
        ]);
        setSavedColCount(Array.isArray(cols) ? cols.length : 0);
        setEnquiriesCount(Array.isArray(enqs) ? enqs.length : 0);
        setAppointmentsCount(Array.isArray(apps) ? apps.length : 0);
        setRecommended((prods || []).slice(0, 3));
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, [customer]);

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gold-400 uppercase tracking-wide">
          WELCOME BACK, {customer?.firstName || 'MEMBER'}
        </h2>
        <p className="text-xs text-pearl-300 font-mono mt-1">
          Discover pieces curated for your style and track your showroom inquiries.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link to="/account/wishlist" className="bg-obsidian-900 p-5 border border-gold-500/30 hover:border-gold-400 transition-all group">
          <div className="flex items-center justify-between">
            <Heart className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold text-pearl-100">{wishlistCount}</span>
          </div>
          <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mt-3">WISHLIST</h3>
          <p className="text-[11px] text-pearl-300 font-mono">Saved Pieces</p>
        </Link>

        <Link to="/account/collections" className="bg-obsidian-900 p-5 border border-gold-500/30 hover:border-gold-400 transition-all group">
          <div className="flex items-center justify-between">
            <Bookmark className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold text-pearl-100">{savedColCount}</span>
          </div>
          <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mt-3">SAVED COLLECTIONS</h3>
          <p className="text-[11px] text-pearl-300 font-mono">Favourite Lines</p>
        </Link>

        <Link to="/account/enquiries" className="bg-obsidian-900 p-5 border border-gold-500/30 hover:border-gold-400 transition-all group">
          <div className="flex items-center justify-between">
            <MessageSquare className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold text-pearl-100">{enquiriesCount}</span>
          </div>
          <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mt-3">MY ENQUIRIES</h3>
          <p className="text-[11px] text-pearl-300 font-mono">Submitted Requests</p>
        </Link>

        <Link to="/account/appointments" className="bg-obsidian-900 p-5 border border-gold-500/30 hover:border-gold-400 transition-all group">
          <div className="flex items-center justify-between">
            <Calendar className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold text-pearl-100">{appointmentsCount}</span>
          </div>
          <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider mt-3">APPOINTMENTS</h3>
          <p className="text-[11px] text-pearl-300 font-mono">Showroom Visits</p>
        </Link>
      </div>

      {/* Recommended Collections */}
      <div className="pt-6 border-t border-obsidian-600 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-500" /> Recommended For You
          </h3>
          <Link to="/collections" className="text-xs font-mono text-gold-500 hover:underline flex items-center gap-1">
            VIEW CATALOGUE <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recommended.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommended.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
