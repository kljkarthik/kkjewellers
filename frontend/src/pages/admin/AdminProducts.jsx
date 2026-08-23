import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, X, RefreshCw, Sparkles } from 'lucide-react';
import API from '../../services/api';
import ImageUploader from '../../components/ImageUploader';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    categoryId: '',
    collectionId: '',
    material: 'Gold',
    purity: '22K',
    weight: '',
    gender: 'Women',
    occasion: 'Wedding',
    shortDescription: '',
    fullDescription: '',
    featured: false,
    newArrival: true,
    active: true,
    imageUrlsText: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, colRes] = await Promise.all([
        API.get('/admin/products'),
        API.get('/admin/categories'),
        API.get('/admin/collections')
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      setCollections(colRes.data || []);
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      productCode: `KK-NK-00${products.length + 1}`,
      categoryId: categories[0]?.id || '',
      collectionId: collections[0]?.id || '',
      material: 'Gold',
      purity: '22K',
      weight: '35.0 gms',
      gender: 'Women',
      occasion: 'Wedding',
      shortDescription: '',
      fullDescription: '',
      featured: false,
      newArrival: true,
      active: true,
      imageUrlsText: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProduct(p);
    const urls = (p.images || []).map(i => i.imageUrl).join('\n');
    setFormData({
      name: p.name || '',
      productCode: p.productCode || '',
      categoryId: p.category?.id || '',
      collectionId: p.collection?.id || '',
      material: p.material || 'Gold',
      purity: p.purity || '22K',
      weight: p.weight || '',
      gender: p.gender || 'Women',
      occasion: p.occasion || 'Wedding',
      shortDescription: p.shortDescription || '',
      fullDescription: p.fullDescription || '',
      featured: p.featured || false,
      newArrival: p.newArrival || false,
      active: p.active !== false,
      imageUrlsText: urls || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/admin/products/${id}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.productCode) {
      setFormError('Product Name and Unique SKU Code are required.');
      return;
    }

    setSaving(true);
    setFormError('');

    // Parse image URLs
    const urls = formData.imageUrlsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      productCode: formData.productCode,
      category: formData.categoryId ? { id: parseInt(formData.categoryId) } : null,
      collection: formData.collectionId ? { id: parseInt(formData.collectionId) } : null,
      material: formData.material,
      purity: formData.purity,
      weight: formData.weight,
      gender: formData.gender,
      occasion: formData.occasion,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      featured: formData.featured,
      newArrival: formData.newArrival,
      active: formData.active,
      images: urls.map((url, idx) => ({
        imageUrl: url,
        primaryImage: idx === 0,
        displayOrder: idx
      }))
    };

    try {
      if (editingProduct) {
        await API.put(`/admin/products/${editingProduct.id}`, payload);
      } else {
        await API.post('/admin/products', payload);
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to save product details.');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Product Management</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Create, edit, feature, and manage digital jewellery catalogue items.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-gold-500" />
        <input
          type="text"
          placeholder="Filter by product name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-obsidian-950 border border-gold-500/30 text-xs text-pearl-100 focus:outline-none focus:border-gold-400 font-mono"
        />
      </div>

      {/* Products Table */}
      <div className="bg-obsidian-900 border border-obsidian-600 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-pearl-100">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-obsidian-950 text-gold-500 uppercase tracking-widest text-[11px] border-b border-obsidian-600">
                <tr>
                  <th className="py-4 px-4">Item</th>
                  <th className="py-4 px-4">SKU / Code</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Material / Purity</th>
                  <th className="py-4 px-4">Status Badges</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-700">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-obsidian-950/60 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={p.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=300&q=80'}
                        alt=""
                        className="w-10 h-10 object-cover border border-gold-500/40"
                      />
                      <div>
                        <p className="font-serif font-bold text-pearl-100 text-sm uppercase">{p.name}</p>
                        <p className="text-[10px] text-pearl-300">{p.weight || 'No weight specified'}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gold-400">{p.productCode}</td>
                    <td className="py-3.5 px-4 text-pearl-200">{p.category?.name || 'Unassigned'}</td>
                    <td className="py-3.5 px-4 text-pearl-300">{p.material} ({p.purity})</td>
                    
                    <td className="py-3.5 px-4 space-x-1">
                      {p.featured && <span className="bg-gold-500 text-obsidian-950 text-[10px] font-bold px-2 py-0.5 uppercase">Featured</span>}
                      {p.newArrival && <span className="bg-obsidian-950 border border-gold-500/40 text-gold-400 text-[10px] font-bold px-2 py-0.5 uppercase">New Arrival</span>}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 bg-obsidian-950 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 border border-gold-500/30 transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-obsidian-900 w-full max-w-2xl border border-gold-500/40 shadow-2xl my-8 text-left">
            
            <div className="bg-obsidian-950 text-pearl-100 p-6 flex items-center justify-between border-b border-gold-500/30">
              <h3 className="font-serif text-xl text-gold-400 font-bold uppercase">
                {editingProduct ? `Edit Product (${editingProduct.productCode})` : 'Add New Jewellery Product'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-pearl-300 hover:text-pearl-100">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-mono text-xs">
              {formError && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">SKU / Product Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.productCode}
                    onChange={e => setFormData({ ...formData, productCode: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-gold-400 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Collection</label>
                  <select
                    value={formData.collectionId}
                    onChange={e => setFormData({ ...formData, collectionId: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  >
                    <option value="">-- Select Collection --</option>
                    {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Material</label>
                  <select
                    value={formData.material}
                    onChange={e => setFormData({ ...formData, material: e.target.value })}
                    className="w-full p-2 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Purity</label>
                  <input
                    type="text"
                    placeholder="22K / 18K"
                    value={formData.purity}
                    onChange={e => setFormData({ ...formData, purity: e.target.value })}
                    className="w-full p-2 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Weight</label>
                  <input
                    type="text"
                    placeholder="35.0 gms"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full p-2 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Occasion</label>
                  <select
                    value={formData.occasion}
                    onChange={e => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Festival">Festival</option>
                    <option value="Party">Party</option>
                    <option value="Daily Wear">Daily Wear</option>
                  </select>
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Upload Primary Product Photo"
                  value={formData.primaryImageUpload || ''}
                  onChange={(val) => {
                    setFormData(prev => {
                      const lines = prev.imageUrlsText ? prev.imageUrlsText.split('\n').filter(Boolean) : [];
                      if (val) {
                        lines[0] = val;
                      } else {
                        lines.shift();
                      }
                      return {
                        ...prev,
                        primaryImageUpload: val,
                        imageUrlsText: lines.join('\n')
                      };
                    });
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Additional Product Image URLs (One per line)</label>
                <textarea
                  rows="3"
                  value={formData.imageUrlsText}
                  onChange={e => setFormData({ ...formData, imageUrlsText: e.target.value })}
                  placeholder="Paste additional picture URLs or upload above..."
                  className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Full Description</label>
                <textarea
                  rows="3"
                  value={formData.fullDescription}
                  onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-pearl-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-gold-500"
                  /> Mark Featured
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-pearl-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newArrival}
                    onChange={e => setFormData({ ...formData, newArrival: e.target.checked })}
                    className="accent-gold-500"
                  /> Mark New Arrival
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-pearl-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    className="accent-gold-500"
                  /> Active / Visible
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow mt-4"
              >
                {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Save Product')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
