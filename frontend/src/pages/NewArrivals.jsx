import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollRevealText from '../components/typography/ScrollRevealText';
import { getNewArrivals } from '../services/productService';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const data = await getNewArrivals();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArrivals();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      <section className="bg-obsidian-950 text-pearl-100 py-10 sm:py-16 border-b border-gold-500/30 text-center px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block mb-2">
            FRESH CREATIONS
          </span>
          <ScrollRevealText
            text="NEW ARRIVALS"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-gold-400 uppercase tracking-wide justify-center flex"
          />
          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto mt-2 sm:mt-3 font-light leading-relaxed">
            Be the first to discover our latest handcrafted 22K gold and certified solitaire diamond additions.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 flex-grow w-full">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4].map(n => <div key={n} className="h-64 sm:h-80 bg-obsidian-950 border border-obsidian-600"></div>)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-obsidian-950 border border-gold-500/30 px-4">
            <p className="font-serif text-xl sm:text-2xl text-gold-400 font-bold uppercase">No New Arrivals Currently Listed</p>
            <p className="text-xs text-pearl-300 mt-2">Check back soon for new handcrafted additions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        )}
      </main>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default NewArrivals;
