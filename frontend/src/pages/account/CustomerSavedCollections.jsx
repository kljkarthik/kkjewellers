import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, RefreshCw } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { getSavedCollections, toggleSavedCollection } from '../../services/customerAuthService';

const CustomerSavedCollections = () => {
  const { customer } = useCustomer();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    if (!customer?.id) return;
    setLoading(true);
    try {
      const data = await getSavedCollections(customer.id);
      setCollections(data || []);
    } catch (err) {
      console.error('Error fetching saved collections:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [customer]);

  const handleRemove = async (collectionId) => {
    await toggleSavedCollection(collectionId, customer.id);
    await fetchCollections();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-gold-500" /> SAVED COLLECTIONS
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Your favourite signature jewellery collections.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-pearl-300">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-600 space-y-4">
          <Bookmark className="w-12 h-12 text-gold-500/40 mx-auto" />
          <p className="font-serif text-xl text-gold-400 font-bold uppercase">No Saved Collections</p>
          <p className="text-xs text-pearl-300 max-w-sm mx-auto">
            Save entire collection lines like Bridal Heritage or Solitaire Elegance for quick access.
          </p>
          <Link
            to="/collections"
            className="inline-block px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow"
          >
            BROWSE COLLECTIONS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {collections.map(item => {
            const col = item.collection;
            if (!col) return null;
            return (
              <div key={item.id} className="bg-obsidian-900 border border-gold-500/30 p-6 flex flex-col justify-between space-y-4 relative group">
                <button
                  onClick={() => handleRemove(col.id)}
                  className="absolute top-4 right-4 p-2 text-pearl-300 hover:text-rose-400 transition-colors"
                  title="Remove collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">SIGNATURE LINE</span>
                  <h3 className="font-serif text-xl font-bold text-pearl-100 uppercase">{col.name}</h3>
                  <p className="text-xs text-pearl-300 leading-relaxed font-light">{col.description}</p>
                </div>

                <Link
                  to={`/collections?collection=${col.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold-400 hover:underline uppercase tracking-wider"
                >
                  EXPLORE PIECES <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerSavedCollections;
