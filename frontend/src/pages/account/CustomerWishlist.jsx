import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, RefreshCw } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { getCustomerWishlist } from '../../services/customerAuthService';
import ProductCard from '../../components/ProductCard';

const CustomerWishlist = () => {
  const { customer, toggleWishlist } = useCustomer();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!customer?.id) return;
    setLoading(true);
    try {
      const data = await getCustomerWishlist(customer.id);
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching customer wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [customer]);

  const handleRemove = async (productId) => {
    await toggleWishlist(productId);
    await fetchWishlist();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-gold-400 uppercase tracking-wide flex items-center gap-2">
            <Heart className="w-6 h-6 text-gold-500 fill-gold-500" /> MY WISHLIST
          </h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">
            Your saved fine jewellery pieces.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-pearl-300">
          {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Saved
        </span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-pearl-300">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-2" />
          <p className="text-xs font-mono">Loading your wishlist...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-600 space-y-4">
          <Heart className="w-12 h-12 text-gold-500/40 mx-auto" />
          <p className="font-serif text-xl text-gold-400 font-bold uppercase">Your Wishlist is Empty</p>
          <p className="text-xs text-pearl-300 max-w-sm mx-auto">
            Browse our catalogue and click the heart icon on any piece to save it here.
          </p>
          <Link
            to="/collections"
            className="inline-block px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow"
          >
            EXPLORE CATALOGUE
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const product = item.product;
            if (!product) return null;
            return (
              <div key={item.id} className="relative group">
                <ProductCard product={product} />
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-3 left-3 z-20 p-2 bg-obsidian-950/80 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors shadow-md"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerWishlist;
