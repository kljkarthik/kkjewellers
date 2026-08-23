import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const LightboxModal = ({ isOpen, onClose, images = [], currentIndex = 0, setCurrentIndex }) => {
  if (!isOpen || !images.length) return null;

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white hover:text-gold-400 p-2 rounded-full bg-white/10 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 z-50 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 z-50 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={currentImage.imageUrl || currentImage}
          alt={currentImage.title || 'KK JEWELLERS Gallery'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-gold-500/30"
        />
        {currentImage.title && (
          <div className="mt-4 text-center">
            <h4 className="font-serif text-xl text-gold-300 font-semibold">{currentImage.title}</h4>
            {currentImage.category && (
              <span className="text-xs uppercase tracking-widest text-ivory-300 font-mono">{currentImage.category}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
