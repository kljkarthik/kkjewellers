import React from 'react';

export const EditorialMarquee = ({ 
  items = [
    'KK JEWELLERS',
    'TIMELESS ELEGANCE',
    'ROYAL FINE JEWELLERY',
    'BIS 916 HALLMARKED',
    'BESPOKE BRIDAL SUITES'
  ],
  speed = '40s',
  className = ''
}) => {
  const content = items.join('   ✦   ');

  return (
    <div className={`w-full overflow-hidden border-y border-gold-500/20 bg-obsidian-950/80 py-4 sm:py-6 relative z-10 select-none ${className}`}>
      <div className="w-max flex animate-marquee whitespace-nowrap">
        <span className="font-serif text-2xl sm:text-4xl uppercase tracking-[0.25em] text-transparent [-webkit-text-stroke:1px_rgba(191,167,106,0.55)] hover:[-webkit-text-stroke:1px_#BFA76A] hover:text-gold-400/20 transition-all duration-300 px-4">
          {content}   ✦   {content}   ✦   
        </span>
        <span className="font-serif text-2xl sm:text-4xl uppercase tracking-[0.25em] text-transparent [-webkit-text-stroke:1px_rgba(191,167,106,0.55)] hover:[-webkit-text-stroke:1px_#BFA76A] hover:text-gold-400/20 transition-all duration-300 px-4 aria-hidden">
          {content}   ✦   {content}   ✦   
        </span>
      </div>
    </div>
  );
};

export default EditorialMarquee;
