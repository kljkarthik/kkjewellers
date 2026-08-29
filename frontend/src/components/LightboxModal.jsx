import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const LightboxModal = ({ isOpen, onClose, images = [], currentIndex = 0, setCurrentIndex }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !images.length) return null;

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 text-pearl-100 hover:text-gold-400 p-3 rounded-full bg-obsidian-900/80 border border-gold-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-50 text-pearl-100 hover:text-gold-400 p-2.5 sm:p-3 rounded-full bg-obsidian-900/80 border border-gold-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-50 text-pearl-100 hover:text-gold-400 p-2.5 sm:p-3 rounded-full bg-obsidian-900/80 border border-gold-500/30 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </>
      )}

      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center p-2">
        <img
          src={currentImage.imageUrl || currentImage}
          alt={currentImage.title || 'KK JEWELLERS Gallery'}
          className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain shadow-2xl border border-gold-500/30"
        />
        {currentImage.title && (
          <div className="mt-3 sm:mt-4 text-center">
            <h4 className="font-serif text-lg sm:text-xl text-gold-400 font-semibold uppercase">{currentImage.title}</h4>
            {currentImage.category && (
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pearl-300 font-mono block mt-1">{currentImage.category}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
