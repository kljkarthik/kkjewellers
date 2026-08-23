import React from 'react';

const MarqueeTicker = () => {
  const items = [
    "BIS HALLMARKED 22K GOLD",
    "GIA & IGI CERTIFIED DIAMONDS",
    "BESPOKE CUSTOM JEWELLERY",
    "100% LIFETIME EXCHANGE GUARANTEE",
    "HANDCRAFTED IN INDIA",
    "ROYAL BRIDAL SANCTUARY",
    "INSURED SHOWROOM DELIVERY"
  ];

  return (
    <div className="bg-emerald-950 border-y border-gold-500/30 py-3.5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, idx) => (
          <span key={idx} className="text-gold-300 text-xs font-mono font-bold uppercase tracking-[0.25em] px-8 flex items-center gap-6">
            {text}
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60 inline-block shadow-gold-glow"></span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: 300%;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarqueeTicker;
