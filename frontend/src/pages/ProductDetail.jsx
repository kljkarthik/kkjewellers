import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Mail, Calendar, ChevronLeft, ChevronRight, ZoomIn, ShieldCheck, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import EnquiryModal from '../components/EnquiryModal';
import BookVisitModal from '../components/BookVisitModal';
import LightboxModal from '../components/LightboxModal';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { getProductByCode, getProducts } from '../services/productService';
import { useSettings } from '../context/SettingsContext';

const ProductDetail = () => {
  const { productCode } = useParams();
  const { settings } = useSettings();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals & Magnifier state
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, px: 0, py: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - left;
    const py = e.clientY - top;
    const x = (px / width) * 100;
    const y = (py / height) * 100;
    setMagnifierPos({ x, y, px, py });
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProductByCode(productCode);
        setProduct(data);
        setSelectedImageIndex(0);

        if (data && data.category) {
          const related = await getProducts({ category: data.category.slug });
          setRelatedProducts((related || []).filter(p => p.productCode !== data.productCode).slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Jewellery item not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [productCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-900 flex flex-col font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-32 flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <RefreshCw className="w-10 h-10 text-gold-500 animate-spin mx-auto" />
            <p className="font-serif text-lg text-gold-400 uppercase tracking-widest">Loading Jewellery Details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-obsidian-900 flex flex-col font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-32 flex-grow text-center">
          <h2 className="font-serif text-3xl text-gold-400 font-bold mb-4 uppercase">Piece Not Found</h2>
          <p className="text-pearl-300 text-sm mb-6">{error}</p>
          <Link to="/collections" className="px-8 py-3.5 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest">
            RETURN TO CATALOGUE
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[selectedImageIndex]?.imageUrl || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80';

  // Configurable WhatsApp Enquiry Message
  const whatsappNumber = settings?.whatsappNumber || '919876543210';
  const whatsappMessage = `Hello KK JEWELLERS, I am interested in ${product.name} (${product.productCode}). I would like to know more about this piece.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-20">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="bg-obsidian-950 border-b border-obsidian-600 py-3.5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-xs font-mono text-pearl-300 flex items-center gap-2">
          <Link to="/" className="hover:text-gold-400">HOME</Link> /
          <Link to="/collections" className="hover:text-gold-400">COLLECTIONS</Link> /
          <span className="text-gold-400 uppercase">{product.category?.name || 'JEWELLERY'}</span> /
          <span className="text-pearl-100 font-bold">{product.productCode}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Large Photography + Thumbnail Slider + Zoom */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div
              className="relative aspect-square overflow-hidden bg-obsidian-950 border border-gold-500/30 group magnifier-container"
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
              />

              {/* Magnifier Lens Circular Lens */}
              {showMagnifier && (
                <div
                  className="magnifier-lens hidden md:block"
                  style={{
                    width: '180px',
                    height: '180px',
                    top: `${magnifierPos.py - 90}px`,
                    left: `${magnifierPos.px - 90}px`,
                    backgroundImage: `url("${currentImage}")`,
                    backgroundSize: '250%',
                    backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                  }}
                />
              )}

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 p-3 bg-obsidian-950/80 border border-gold-500/40 text-gold-400 hover:text-gold-300 transition-colors shadow-lg z-20"
                title="Fullscreen High-Res View"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {/* Prev / Next Image Overlay Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-obsidian-950/80 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 transition-colors shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-obsidian-950/80 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 transition-colors shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-gold-400 scale-105 shadow-md' : 'border-gold-500/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Action Buttons */}
          <div className="lg:col-span-5 space-y-6 bg-obsidian-950 p-8 border border-gold-500/30 text-left">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gold-500 mb-1">
                <span>SKU: {product.productCode}</span>
                {product.collection && <span className="uppercase tracking-widest text-pearl-300 font-bold">{product.collection.name}</span>}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-pearl-100 uppercase tracking-wide mb-3">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                {product.material && (
                  <span className="px-3 py-1 bg-gold-500 text-obsidian-950 font-bold uppercase">
                    {product.material}
                  </span>
                )}
                {product.purity && (
                  <span className="px-3 py-1 bg-obsidian-900 border border-gold-500/40 text-gold-400 font-medium">
                    PURITY: {product.purity}
                  </span>
                )}
                {product.weight && (
                  <span className="px-3 py-1 bg-obsidian-900 border border-gold-500/40 text-gold-400 font-medium">
                    APPROX. WEIGHT: {product.weight}
                  </span>
                )}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-obsidian-900 border border-obsidian-600 text-xs font-mono">
              <div>
                <span className="text-pearl-300 uppercase block">Category</span>
                <span className="font-bold text-gold-400">{product.category?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-pearl-300 uppercase block">Occasion</span>
                <span className="font-bold text-gold-400">{product.occasion || 'Luxury'}</span>
              </div>
              <div>
                <span className="text-pearl-300 uppercase block">Gender</span>
                <span className="font-bold text-gold-400">{product.gender || 'Unisex'}</span>
              </div>
              <div>
                <span className="text-pearl-300 uppercase block">Purity Standard</span>
                <span className="font-bold text-gold-400">BIS 916 Certified</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif text-base font-bold text-gold-500 uppercase tracking-wider">Craftsmanship Details</h4>
              <p className="text-pearl-300 text-xs leading-relaxed font-light">
                {product.fullDescription || product.shortDescription}
              </p>
            </div>

            {/* CONVERSION BUTTONS (STRICTLY NO CART / BUY NOW) */}
            <div className="space-y-3 pt-4 border-t border-obsidian-600">
              
              {/* ENQUIRE NOW Button */}
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-obsidian-glow flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> ENQUIRE NOW
              </button>

              {/* WHATSAPP ENQUIRE Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-obsidian-900 hover:bg-obsidian-800 text-gold-400 border border-gold-500/40 font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WHATSAPP ENQUIRE
              </a>

              {/* BOOK SHOWROOM VISIT Button */}
              <button
                onClick={() => setVisitModalOpen(true)}
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-pearl-100 border border-gold-500/30 font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-gold-500" /> BOOK SHOWROOM VISIT
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-pearl-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>BIS 916 Hallmark &bull; Confidential Price Quote on Enquiry</span>
            </div>
          </div>
        </div>

        {/* RELATED JEWELLERY */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-obsidian-600">
            <h2 className="font-serif text-3xl font-normal text-gold-400 uppercase tracking-wider mb-8 text-left">
              SIMILAR PIECES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals & Floating WhatsApp */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        product={product}
      />
      <BookVisitModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        initialCollection={product.collection?.name || ''}
      />
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        currentIndex={selectedImageIndex}
        setCurrentIndex={setSelectedImageIndex}
      />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default ProductDetail;
