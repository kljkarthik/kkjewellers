import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, RefreshCw, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollRevealText from '../components/typography/ScrollRevealText';
import { getProducts, getCategories, getCollections } from '../services/productService';

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filters state
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [collection, setCollection] = useState(searchParams.get('collection') || '');
  const [material, setMaterial] = useState(searchParams.get('material') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || '');

  // Lock body scroll when filter drawer is open on mobile
  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [filterDrawerOpen]);

  // Fetch categories & collections on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catData, colData] = await Promise.all([
          getCategories(),
          getCollections()
        ]);
        setCategories(catData || []);
        setCollectionsList(colData || []);
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  const [productsError, setProductsError] = useState(null);

  // Fetch products whenever filters change
  const fetchFilteredProducts = async () => {
    setLoading(true);
    setProductsError(null);
    try {
      const data = await getProducts({
        query: query.trim(),
        category,
        collection,
        material,
        gender,
        occasion
      });
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      setProductsError('Unable to load jewellery catalogue. Please check your connection or retry.');
    } finally {
      setLoading(false);
    }
  };

  // Sync state when URL searchParams change
  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setCategory(searchParams.get('category') || '');
    setCollection(searchParams.get('collection') || '');
    setMaterial(searchParams.get('material') || '');
    setGender(searchParams.get('gender') || '');
    setOccasion(searchParams.get('occasion') || '');
  }, [searchParams]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [query, category, collection, material, gender, occasion]);

  const resetFilters = () => {
    setQuery('');
    setCategory('');
    setCollection('');
    setMaterial('');
    setGender('');
    setOccasion('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-obsidian-950 text-pearl-100 py-10 sm:py-16 border-b border-gold-500/30 text-center px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block mb-2">
            FINE JEWELLERY CATALOGUE
          </span>
          <ScrollRevealText
            text="THE COLLECTIONS"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-gold-400 uppercase tracking-wide justify-center flex"
          />
          <p className="text-xs sm:text-sm text-pearl-300 max-w-xl mx-auto mt-2 sm:mt-3 font-light leading-relaxed">
            Explore handcrafted 22K gold, certified solitaire diamond ornaments, and royal Indian bridal suites.
          </p>
        </div>
      </section>

      {/* Main Filter & Grid Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow w-full">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-obsidian-600">
          
          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gold-500" />
            <input
              type="text"
              placeholder="Search by name or SKU (e.g. KK-NK-001)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-medium min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="md:hidden px-4 py-2.5 bg-obsidian-950 text-gold-400 border border-gold-500/40 text-xs font-bold uppercase tracking-widest flex items-center gap-2 min-h-[44px]"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>

            <span className="text-xs text-pearl-300 font-mono">
              Showing <strong className="text-gold-400 font-bold">{products.length}</strong> masterworks
            </span>

            {(category || collection || material || gender || occasion || query) && (
              <button
                onClick={resetFilters}
                className="text-xs text-gold-500 hover:text-gold-400 font-bold flex items-center gap-1 uppercase tracking-widest min-h-[44px]"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Animated Quick Category Pill Tabs (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => setCategory('')}
            className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 min-h-[40px] ${
              category === ''
                ? 'bg-gold-500 text-obsidian-950 shadow-obsidian-glow scale-105'
                : 'bg-obsidian-950 text-pearl-200 border border-gold-500/30 hover:border-gold-400 hover:text-gold-400'
            }`}
          >
            All Categories
          </button>
          {categories.map((catItem) => {
            const isSelected = category === catItem.slug;
            return (
              <button
                key={catItem.id}
                onClick={() => setCategory(catItem.slug)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 min-h-[40px] ${
                  isSelected
                    ? 'bg-gold-500 text-obsidian-950 shadow-obsidian-glow scale-105'
                    : 'bg-obsidian-950 text-pearl-200 border border-gold-500/30 hover:border-gold-400 hover:text-gold-400'
                }`}
              >
                {catItem.name}
              </button>
            );
          })}
        </div>

        {/* Layout: Sidebar (Desktop) + 2-Column Product Grid (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block space-y-6 bg-obsidian-950 p-6 border border-gold-500/30 text-left h-fit">
            <div className="flex items-center justify-between border-b border-obsidian-600 pb-3">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold-500" /> Filter Catalogue
              </h3>
              {(category || collection || material || gender || occasion) && (
                <button onClick={resetFilters} className="text-[11px] font-mono text-gold-500 hover:underline">Reset</button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Collection Filter */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-2">Collection</label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full p-2.5 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400"
              >
                <option value="">All Collections</option>
                {collectionsList.map((col) => (
                  <option key={col.id} value={col.slug}>{col.name}</option>
                ))}
              </select>
            </div>

            {/* Material Filter */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-2">Material</label>
              <div className="space-y-1.5 text-xs">
                {['', 'Gold', 'Diamond', 'Silver'].map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer text-pearl-300 hover:text-gold-400 py-1">
                    <input
                      type="radio"
                      name="material"
                      checked={material === m}
                      onChange={() => setMaterial(m)}
                      className="accent-gold-500"
                    />
                    {m === '' ? 'All Materials' : m}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2.5 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400"
              >
                <option value="">All Genders</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gold-500 uppercase tracking-wider mb-2">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-2.5 bg-obsidian-900 border border-gold-500/30 text-xs text-pearl-100 focus:border-gold-400"
              >
                <option value="">All Occasions</option>
                <option value="Wedding">Wedding</option>
                <option value="Engagement">Engagement</option>
                <option value="Festival">Festival</option>
                <option value="Party">Party</option>
                <option value="Daily Wear">Daily Wear</option>
              </select>
            </div>
          </div>

          {/* Product Grid Column (2 Columns on Mobile, 3 on Desktop) */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-64 sm:h-80 bg-obsidian-950 border border-obsidian-600"></div>
                ))}
              </div>
            ) : productsError ? (
              <div className="bg-obsidian-950 p-8 sm:p-12 border border-gold-500/30 text-center space-y-4">
                <p className="font-serif text-xl sm:text-2xl text-gold-400 font-bold uppercase">Catalogue Unavailable</p>
                <p className="text-xs text-pearl-300">{productsError}</p>
                <button
                  onClick={fetchFilteredProducts}
                  className="px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow min-h-[44px]"
                >
                  Retry Loading Catalogue
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-obsidian-950 p-8 sm:p-12 border border-gold-500/30 text-center space-y-4">
                <p className="font-serif text-xl sm:text-2xl text-gold-400 font-bold uppercase">No Matching Jewellery Found</p>
                <p className="text-xs text-pearl-300">Try adjusting your filters or search keywords.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-widest shadow-obsidian-glow min-h-[44px]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} priority={idx < 6} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Backdrop & Sheet */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-obsidian-950/80 backdrop-blur-md md:hidden">
          <div className="bg-obsidian-900 w-4/5 max-w-sm h-full p-6 overflow-y-auto space-y-6 text-left border-l border-gold-500/40 animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-obsidian-600 pb-4">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase">Filter Jewellery</h3>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-2 text-pearl-300 hover:text-gold-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close Filter Drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gold-500 uppercase mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gold-500 uppercase mb-2">Collection</label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
              >
                <option value="">All Collections</option>
                {collectionsList.map((col) => (
                  <option key={col.id} value={col.slug}>{col.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gold-500 uppercase mb-2">Material</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
              >
                <option value="">All Materials</option>
                <option value="Gold">Gold</option>
                <option value="Diamond">Diamond</option>
                <option value="Silver">Silver</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gold-500 uppercase mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 min-h-[44px]"
              >
                <option value="">All Genders</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full py-3.5 bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-obsidian-glow min-h-[44px]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default Collections;
