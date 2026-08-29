import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collections?query=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-obsidian-950/90 backdrop-blur-md transition-opacity">
      <div className="bg-obsidian-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-none shadow-2xl border border-gold-500/40 animate-in fade-in zoom-in duration-200 text-left">
        <div className="p-4 sm:p-6 border-b border-obsidian-600 flex items-center justify-between">
          <h3 className="font-serif text-lg sm:text-xl text-gold-400 font-bold uppercase tracking-wider">Search Catalogue</h3>
          <button 
            onClick={onClose}
            className="p-2 text-pearl-300 hover:text-gold-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 space-y-6 font-sans">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gold-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search by name, SKU (e.g. KK-NK-001)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-obsidian-950 border border-gold-500/30 text-xs sm:text-sm text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[48px]"
            />
            <button
              type="submit"
              className="absolute right-2 bg-gold-500 hover:bg-gold-400 text-obsidian-950 p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors shadow-obsidian-glow"
              aria-label="Submit Search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-500 font-mono font-bold mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Kundan Choker', 'Solitaire Ring', 'Bridal Haar', 'Temple Jhumkas', 'Men\'s Signet Ring', '22K Bangles'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchTerm(tag);
                    navigate(`/collections?query=${encodeURIComponent(tag)}`);
                    onClose();
                  }}
                  className="px-3.5 py-2 bg-obsidian-950 hover:bg-gold-500 hover:text-obsidian-950 text-pearl-200 text-xs rounded-full border border-gold-500/30 transition-all font-mono min-h-[38px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
