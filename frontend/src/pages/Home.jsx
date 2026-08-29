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
      <section className="py-24 bg-obsidian-700 border-y border-gold-500/20 text-pearl-100 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-mono font-semibold">
              CURATED EXPRESSIONS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase">
              THE SIGNATURE COLLECTIONS
            </h2>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
            <p className="font-serif italic text-base text-pearl-300 font-light">
              Curated expressions of craftsmanship and timeless design.
            </p>
          </div>

          {/* Large Image Editorial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureCollections.map((col, idx) => (
              <Link
                key={idx}
                to={`/collections?collection=${col.slug}`}
                className="group relative h-[460px] overflow-hidden border border-obsidian-600 hover:border-gold-500/80 transition-all duration-700 flex flex-col justify-end p-8 text-left bg-obsidian-950"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-90"
                  loading="lazy"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent group-hover:opacity-75 transition-opacity"></div>

                <div className="relative z-10 space-y-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="font-mono text-xs font-bold text-gold-500 uppercase tracking-widest block">
                    0{idx + 1} &bull; COLLECTION
                  </span>

                  <h3 className="font-serif text-2xl font-normal text-pearl-100 uppercase tracking-wider group-hover:text-gold-400 transition-colors">
                    {col.title}
                  </h3>

                  <p className="text-xs text-pearl-300 font-light leading-relaxed">
                    {col.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-500 pt-2 group-hover:text-gold-400">
                    EXPLORE COLLECTION <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>

                  <div className="w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 — PRODUCT CATALOGUE */}
      <section className="py-24 bg-obsidian-900 border-b border-obsidian-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-mono font-semibold">
              HOUSE OF KK JEWELLERS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase">
              SIGNATURE PIECES
            </h2>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
            <p className="font-serif italic text-base text-pearl-300 font-light">
              A curated selection of masterworks from our fine jewellery catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 19 — THE BRIDAL EDIT */}
      <section className="relative py-36 bg-obsidian-950 text-pearl-100 overflow-hidden border-b border-gold-500/30">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=80"
            alt="The Bridal Edit"
            className="w-full h-full object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-mono font-semibold block">
            ROYAL BRIDAL SANCTUARY
          </span>

          <h2 className="font-serif text-5xl sm:text-7xl font-normal text-gold-400 tracking-wider uppercase">
            THE BRIDAL EDIT
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-pearl-100 font-light">
            “For moments that become memories.”
          </p>

          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto font-light leading-relaxed">
            From heavy uncut Polki chokers to long temple harams and emerald drop matha pattis, our bridal suite is engineered to make every Indian bride radiate timeless heritage.
          </p>

          <div className="pt-6">
            <Link
              to="/collections?collection=bridal-collection"
              className="inline-flex items-center gap-3 px-10 py-4 bg-obsidian-900 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-obsidian-950 font-bold text-xs uppercase tracking-[0.25em] transition-all duration-400 shadow-obsidian-glow"
            >
              DISCOVER BRIDAL <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 20 — HERITAGE SECTION */}
      <section className="py-0 bg-obsidian-900 border-b border-obsidian-600">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="relative h-[500px] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80"
              alt="Craftsmanship Artistry"
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-1000"
            />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
          </div>

          <div className="bg-obsidian-900 p-12 lg:p-20 flex flex-col justify-center space-y-6 text-left relative">
            <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-mono font-semibold">
              OUR TRADITION
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase leading-tight">
              CRAFTED THROUGH GENERATIONS
            </h2>

            <p className="font-serif italic text-xl text-gold-400 font-light leading-relaxed border-l-2 border-gold-500 pl-4">
              Where traditional artistry meets contemporary design.
            </p>

            <p className="text-xs sm:text-sm text-pearl-300 leading-relaxed font-light">
              For over three decades, KK JEWELLERS has defined Indian luxury. By seamlessly weaving royal temple architectural motifs with modern lightweight comfort, our master goldsmiths create timeless pieces trusted across generations.
            </p>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-500 hover:text-gold-400 transition-colors group"
              >
                DISCOVER OUR HERITAGE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 26 — NEW ARRIVALS */}
      <section className="py-24 bg-obsidian-950 border-b border-obsidian-600 text-pearl-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-mono font-semibold">
              LATEST CREATIONS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-pearl-100 tracking-wider uppercase">
              NEW ARRIVALS
            </h2>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/collections"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-obsidian-900 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-obsidian-950 text-xs font-bold uppercase tracking-[0.25em] transition-all"
            >
              DISCOVER MORE <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 27 — FLAGSHIP SHOWROOM */}
      <section className="py-28 bg-obsidian-900 text-pearl-100 relative overflow-hidden border-b border-gold-500/20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-mono font-semibold block">
            FLAGSHIP LOCATION
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-gold-400 uppercase tracking-wider">
            KK JEWELLERS SHOWROOM
          </h2>

          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto font-light leading-relaxed">
            Visit our flagship showroom to discover 22K hallmarked gold and certified solitaire diamonds in person.
          </p>

          {settings?.googleMapsUrl && (
            <div className="pt-4">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-9 py-4 bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-obsidian-glow"
              >
                <MapPin className="w-4 h-4" /> GET DIRECTIONS
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Modals & Floating WhatsApp */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryItems}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
      <EnquiryModal 
        isOpen={customEnquiryOpen} 
        onClose={() => setCustomEnquiryOpen(false)} 
        product={{ name: 'Bespoke Custom Jewellery Request', productCode: 'CUSTOM-DESIGN' }} 
      />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Home;
