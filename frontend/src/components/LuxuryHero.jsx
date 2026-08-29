import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

const LuxuryHero = () => {
  return (
    <section className="relative h-screen min-h-[640px] sm:min-h-[720px] w-full bg-obsidian-950 flex items-center justify-center overflow-hidden">
      
      {/* Photographic Background with Ken Burns Animation & Deep Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=80"
          alt="KK JEWELLERS Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-110 animate-ken-burns"
        />
        {/* Deep Obsidian Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/95 via-obsidian-950/70 to-obsidian-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/70"></div>
      </div>

      {/* Floating Gold Particles Effect */}
      <div className="gold-particle-container">
        <div className="gold-particle" style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
        <div className="gold-particle" style={{ top: '40%', left: '75%', animationDelay: '3s' }}></div>
        <div className="gold-particle" style={{ top: '65%', left: '30%', animationDelay: '6s' }}></div>
        <div className="gold-particle" style={{ top: '80%', left: '85%', animationDelay: '9s' }}></div>
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 text-left">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Small Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-8 sm:w-10 bg-gold-500"></span>
            <span className="font-mono text-gold-400 text-[10px] sm:text-xs tracking-[0.3em] font-semibold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" /> EST. 2017 &bull; KK JEWELLERS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-normal text-pearl-100 uppercase tracking-tight leading-[1.05] sm:leading-[0.95]">
            JEWELS THAT <br />
            <span className="gold-shimmer-text italic font-serif">DEFINE YOUR LEGACY.</span>
          </h1>

          {/* Gold Line Animation */}
          <div className="h-0.5 bg-gradient-to-r from-gold-500 via-gold-400 to-transparent animate-expand-line"></div>

          {/* Supporting Text */}
          <p className="font-serif italic text-base sm:text-2xl text-pearl-200 tracking-wide font-light max-w-xl">
            Timeless craftsmanship. Exceptional jewellery. Created for generations.
          </p>

          {/* Button */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              to="/collections"
              className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-gold-500 text-obsidian-950 font-sans font-bold text-xs uppercase tracking-[0.25em] transition-all duration-400 shadow-obsidian-glow flex items-center justify-center gap-2 group gold-sweep-btn min-h-[48px]"
            >
              EXPLORE CATALOGUE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold-400/80 animate-pulse">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.35em] font-semibold text-gold-400">
          SCROLL TO DISCOVER
        </span>
        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-gold-500 to-transparent"></div>
        <ChevronDown className="w-4 h-4 text-gold-400" />
      </div>
    </section>
  );
};

export default LuxuryHero;
