import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LightboxModal from '../components/LightboxModal';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { getGallery } from '../services/settingsService';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Jewellery', 'Bridal', 'Showroom', 'Craftsmanship', 'Events'];

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true);
      try {
        const data = await getGallery(selectedCategory);
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      <section className="bg-obsidian-950 text-pearl-100 py-10 sm:py-16 border-b border-gold-500/30 text-center px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-500 font-mono font-semibold block mb-2">
            VISUAL HERITAGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-gold-400 uppercase tracking-wide">
            EDITORIAL GALLERY
          </h1>
          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto mt-2 sm:mt-3 font-light leading-relaxed">
            Immerse yourself in photos of our master artisan creations, flagship showroom lounges, and royal bridal events.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow w-full">
        
        {/* Category Tabs (Horizontally scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all border whitespace-nowrap min-h-[44px] ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 border-gold-400 shadow-obsidian-glow'
                  : 'bg-obsidian-950 text-pearl-200 border-obsidian-600 hover:border-gold-500/50 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (2 Columns on Mobile, 3 on Desktop) */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-48 sm:h-64 bg-obsidian-950 border border-obsidian-600"></div>)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-obsidian-950 border border-gold-500/30 px-4">
            <p className="font-serif text-xl sm:text-2xl text-gold-400 font-bold uppercase">No Photos in this Category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-obsidian-950 border border-obsidian-600 hover:border-gold-500/80 transition-all duration-500"
              >
                <img
                  src={item.imageUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80';
                  }}
                  alt={item.title}
                  loading={index < 6 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-3 sm:p-6 text-left">
                  <span className="text-[9px] sm:text-[10px] font-mono text-gold-500 uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-serif text-xs sm:text-lg font-normal text-pearl-100 group-hover:text-gold-400 transition-colors uppercase tracking-wider line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={items}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Gallery;
