import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collections?query=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-wine-950/80 backdrop-blur-md transition-opacity">
      <div className="bg-ivory-50 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gold-400/30 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-ivory-200 flex items-center justify-between">
          <h3 className="font-serif text-xl text-wine-900 font-bold">Search KK JEWELLERS Catalogue</h3>
          <button 
            onClick={onClose}
            className="p-2 text-ivory-600 hover:text-wine-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="p-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-gold-600" />
            <input
              type="text"
              autoFocus
              placeholder="Search by jewellery name, SKU code (e.g. KK-NK-001), category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-13 pr-12 py-4 bg-white border border-ivory-300 rounded-xl focus:outline-none focus:border-gold-500 text-ivory-900 text-lg shadow-inner font-sans"
            />
            <button
              type="submit"
              className="absolute right-3 bg-wine-800 hover:bg-wine-900 text-gold-300 p-2.5 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-ivory-600 font-semibold mb-3">Popular Searches</p>
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
                  className="px-3.5 py-1.5 bg-ivory-100 hover:bg-gold-100 text-wine-900 text-xs rounded-full border border-ivory-200 transition-colors"
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
