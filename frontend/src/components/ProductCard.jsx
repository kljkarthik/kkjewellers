import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useCustomer } from '../context/CustomerContext';

const ProductCard = ({ product, priority = false }) => {
  const primaryImage = product.primaryImageUrl 
    || product.images?.find(i => i.primaryImage)?.imageUrl 
    || product.images?.[0]?.imageUrl 
    || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80';

  const [imgSrc, setImgSrc] = useState(primaryImage);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(primaryImage);
    setImgLoaded(false);
  }, [primaryImage]);

  const { isAuthenticated, isWishlisted, toggleWishlist } = useCustomer();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isWishlisted(product.id);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    await toggleWishlist(product.id);
  };

  return (
    <div className="group bg-obsidian-900 hover:bg-obsidian-700 rounded-none overflow-hidden border border-obsidian-600 hover:border-gold-500/80 transition-all duration-500 flex flex-col h-full relative text-left">
      
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-obsidian-950">
        {/* Skeleton Placeholder while image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-obsidian-800 animate-pulse flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] font-mono text-gold-500/50 uppercase tracking-widest">KK JEWELLERS</span>
          </div>
        )}

        <img
          src={imgSrc}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgSrc('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80');
            setImgLoaded(true);
          }}
          alt={product.name}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out filter brightness-95 group-hover:brightness-100 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none"></div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.newArrival && (
            <span className="bg-obsidian-950/90 text-gold-400 text-[8px] sm:text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 border border-gold-500/40">
              New Arrival
            </span>
          )}
          {product.featured && (
            <span className="bg-gold-500 text-obsidian-950 text-[8px] sm:text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 flex items-center gap-1">
              <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> Signature
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 p-2 sm:p-2.5 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center rounded-full border transition-all ${
            wishlisted
              ? 'bg-gold-500 border-gold-400 text-obsidian-950 scale-110 shadow-obsidian-glow'
              : 'bg-obsidian-950/80 border-gold-500/30 text-pearl-300 hover:text-gold-400 hover:border-gold-400'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${wishlisted ? 'fill-obsidian-950 scale-110' : ''}`} />
        </button>

        {/* Material Tag */}
        {product.material && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-obsidian-950/90 text-pearl-300 text-[9px] sm:text-[10px] font-mono tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 border border-gold-500/30">
            {product.purity ? `${product.purity} ${product.material}` : product.material}
          </span>
        )}
      </div>

      {/* Editorial Details */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-grow bg-obsidian-900 group-hover:bg-obsidian-700 transition-colors border-t border-obsidian-600 relative">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-gold-500 mb-1">
          <span className="uppercase tracking-widest text-pearl-300">{product.category?.name || 'Jewellery'}</span>
          <span className="font-bold text-gold-400">{product.productCode}</span>
        </div>

        <Link to={`/product/${product.productCode}`}>
          <h3 className="font-serif text-sm sm:text-lg font-normal text-pearl-100 group-hover:text-gold-400 transition-colors line-clamp-1 mb-1 sm:mb-2 tracking-wide uppercase">
            {product.name}
          </h3>
        </Link>

        <p className="text-pearl-300 text-[11px] sm:text-xs line-clamp-2 mb-3 sm:mb-4 font-light leading-relaxed flex-grow">
          {product.shortDescription || product.fullDescription}
        </p>

        {/* Card Footer: VIEW PIECE → */}
        <div className="pt-2 sm:pt-3 border-t border-obsidian-600 flex items-center justify-between relative">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-pearl-300 truncate max-w-[50%]">
            {product.collection?.name || 'Heritage'}
          </span>
          <Link
            to={`/product/${product.productCode}`}
            className="text-[10px] sm:text-xs font-bold text-gold-500 hover:text-gold-400 uppercase tracking-widest flex items-center gap-1 sm:gap-1.5 transition-all group-hover:translate-x-1 sm:group-hover:translate-x-2 duration-300"
          >
            VIEW PIECE <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>

        {/* Expanding Gold Underline Accent on Hover */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500"></div>
      </div>

      {/* Guest Login Prompt Modal for Wishlist */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-gold-500/50 p-5 sm:p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-gold-500 mx-auto" />
            <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-400 uppercase">SIGN IN TO SAVE THIS PIECE</h4>
            <p className="text-xs text-pearl-300">
              Create a free customer account or sign in to build your personal jewellery wishlist.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { setShowAuthModal(false); navigate('/login'); }}
                className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-obsidian-glow min-h-[44px]"
              >
                SIGN IN
              </button>
              <button
                onClick={() => { setShowAuthModal(false); navigate('/register'); }}
                className="w-full py-3 bg-obsidian-950 text-pearl-100 border border-gold-500/30 text-xs font-bold uppercase tracking-widest min-h-[44px]"
              >
                CREATE ACCOUNT
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-[11px] text-pearl-300 hover:underline pt-1 font-mono min-h-[44px]"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
