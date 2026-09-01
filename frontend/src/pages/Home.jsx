import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LuxuryHero from '../components/LuxuryHero';
import ProductCard from '../components/ProductCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
import LightboxModal from '../components/LightboxModal';
import EnquiryModal from '../components/EnquiryModal';
import { getFeaturedProducts, getNewArrivals } from '../services/productService';
import { getGallery } from '../services/settingsService';
import { useSettings } from '../context/SettingsContext';

const Home = () => {
  const { settings } = useSettings();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [customEnquiryOpen, setCustomEnquiryOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featData, newData, galData] = await Promise.all([
          getFeaturedProducts(),
          getNewArrivals(),
          getGallery('Showroom')
        ]);
        setFeaturedProducts(featData || []);
        setNewArrivals(newData || []);
        setGalleryItems(galData || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    fetchData();
  }, []);

  const signatureCollections = [
    {
      title: "Royal Gold",
      slug: "gold-jewellery",
      desc: "Handcrafted 22K antique gold chokers, temple harams, and nakshi kadas.",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80"
    },
    {
      title: "Bridal Heritage",
      slug: "bridal-collection",
      desc: "Traditional bridal suites, uncut Polki neckpieces, and emerald drop matha pattis.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
    },
    {
      title: "Diamond Elegance",
      slug: "diamond-jewellery",
      desc: "GIA certified solitaire rings, diamond drop earrings, and modern tennis bracelets.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"
    },
    {
      title: "Contemporary",
      slug: "contemporary-collection",
      desc: "Sleek lightweight gold ornaments crafted for modern celebrations.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    },
    {
      title: "Men's Collection",
      slug: "mens-collection",
      desc: "Royal gold signet rings, heavy kada bangles, and gemstone cufflinks.",
      image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950">
      <Navbar />

      {/* SECTION 7 & 8 — 100vh CINEMATIC HERO */}
      <LuxuryHero />

      {/* SECTION 11 — THE SIGNATURE COLLECTIONS */}
      <section className="py-16 sm:py-24 bg-obsidian-700 border-y border-gold-500/20 text-pearl-100 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold">
              CURATED EXPRESSIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase">
              THE SIGNATURE COLLECTIONS
            </h2>
            <div className="w-20 sm:w-24 h-0.5 bg-gold-500 mx-auto"></div>
            <p className="font-serif italic text-sm sm:text-base text-pearl-300 font-light">
              Curated expressions of craftsmanship and timeless design.
            </p>
          </div>

          {/* Large Image Editorial Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {signatureCollections.map((col, idx) => (
              <Link
                key={idx}
                to={`/collections?collection=${col.slug}`}
                className="group relative h-[360px] sm:h-[460px] overflow-hidden border border-obsidian-600 hover:border-gold-500/80 transition-all duration-700 flex flex-col justify-end p-5 sm:p-8 text-left bg-obsidian-950"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-90"
                  loading="lazy"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent group-hover:opacity-75 transition-opacity"></div>

                <div className="relative z-10 space-y-2 sm:space-y-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-gold-500 uppercase tracking-widest block">
                    0{idx + 1} &bull; COLLECTION
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-pearl-100 uppercase tracking-wider group-hover:text-gold-400 transition-colors">
                    {col.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-pearl-300 font-light leading-relaxed line-clamp-2">
                    {col.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-500 pt-1 sm:pt-2 group-hover:text-gold-400">
                    EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform" />
                  </span>

                  <div className="w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 — PRODUCT CATALOGUE (2 Columns on Mobile!) */}
      <section className="py-16 sm:py-24 bg-obsidian-900 border-b border-obsidian-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold">
              HOUSE OF KK JEWELLERS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase">
              SIGNATURE PIECES
            </h2>
            <div className="w-20 sm:w-24 h-0.5 bg-gold-500 mx-auto"></div>
            <p className="font-serif italic text-sm sm:text-base text-pearl-300 font-light">
              A curated selection of masterworks from our fine jewellery catalogue.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 19 — THE BRIDAL EDIT */}
      <section className="relative py-20 sm:py-36 bg-obsidian-950 text-pearl-100 overflow-hidden border-b border-gold-500/30">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=80"
            alt="The Bridal Edit"
            className="w-full h-full object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-400 font-mono font-semibold block">
            ROYAL BRIDAL SANCTUARY
          </span>

          <h2 className="font-serif text-3xl sm:text-7xl font-normal text-gold-400 tracking-wider uppercase">
            THE BRIDAL EDIT
          </h2>

          <p className="font-serif italic text-lg sm:text-3xl text-pearl-100 font-light">
            “For moments that become memories.”
          </p>

          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto font-light leading-relaxed">
            From heavy uncut Polki chokers to long temple harams and emerald drop matha pattis, our bridal suite is engineered to make every Indian bride radiate timeless heritage.
          </p>

          <div className="pt-4 sm:pt-6">
            <Link
              to="/collections?collection=bridal-collection"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-obsidian-900 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-obsidian-950 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-400 shadow-obsidian-glow min-h-[44px]"
            >
              DISCOVER BRIDAL <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 20 — HERITAGE SECTION */}
      <section className="py-0 bg-obsidian-900 border-b border-obsidian-600">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="relative h-[320px] sm:h-[450px] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80"
              alt="Craftsmanship Artistry"
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-1000"
            />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
          </div>

          <div className="bg-obsidian-900 p-6 sm:p-12 lg:p-20 flex flex-col justify-center space-y-4 sm:space-y-6 text-left relative">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-400 font-mono font-semibold">
              OUR TRADITION
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase leading-tight">
              CRAFTED THROUGH GENERATIONS
            </h2>

            <p className="font-serif italic text-base sm:text-xl text-gold-400 font-light leading-relaxed border-l-2 border-gold-500 pl-3 sm:pl-4">
              Where traditional artistry meets contemporary design.
            </p>

            <p className="text-xs sm:text-sm text-pearl-300 leading-relaxed font-light">
              For over three decades, KK JEWELLERS has defined Indian luxury. By seamlessly weaving royal temple architectural motifs with modern lightweight comfort, our master goldsmiths create timeless pieces trusted across generations.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-500 hover:text-gold-400 transition-colors group min-h-[44px]"
              >
                OUR HERITAGE STORY <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 25 — STORE LOCATOR BANNER */}
      <section className="py-16 sm:py-24 bg-obsidian-950 text-center border-b border-gold-500/20 px-4">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gold-500 mx-auto" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-400 font-mono font-semibold block">
            VISIT OUR FLAGSHIP SHOWROOM
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-pearl-100 uppercase tracking-wider">
            {settings?.businessName || 'KK JEWELLERS'}, KAMAVARAPUKOTA
          </h2>
          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto font-light leading-relaxed">
            {settings?.address || 'KK JEWELLERS, Main Road, Kamavarapukota, Andhra Pradesh'}
          </p>
          <div className="pt-2 sm:pt-4">
            <button
              onClick={() => setCustomEnquiryOpen(true)}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.2em] shadow-obsidian-glow min-h-[44px]"
            >
              BOOK PRIVATE SHOWROOM APPOINTMENT
            </button>
          </div>
        </div>
      </section>

      {/* Modals & Floating WhatsApp */}
      <EnquiryModal
        isOpen={customEnquiryOpen}
        onClose={() => setCustomEnquiryOpen(false)}
      />
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryItems}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Home;
