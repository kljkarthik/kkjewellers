import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, RefreshCw } from 'lucide-react';
import API from '../../services/api';
import ImageUploader from '../../components/ImageUploader';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Jewellery',
    imageUrl: '',
    displayOrder: 0,
    active: true
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/gallery');
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'Jewellery', imageUrl: '', displayOrder: items.length + 1, active: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (g) => {
    setEditingItem(g);
    setFormData({ title: g.title || '', category: g.category || 'Jewellery', imageUrl: g.imageUrl || '', displayOrder: g.displayOrder || 0, active: g.active !== false });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete gallery item?')) {
      await API.delete(`/admin/gallery/${id}`);
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await API.put(`/admin/gallery/${editingItem.id}`, formData);
    } else {
      await API.post('/admin/gallery', formData);
    }
    setModalOpen(false);
    fetchData();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Gallery Management</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Upload and curate showroom, bridal, and exhibition photos.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Gallery Photo
        </button>
      </div>

      <div className="bg-obsidian-900 border border-obsidian-600 shadow-2xl overflow-hidden p-6">
        {loading ? (
          <div className="p-12 text-center text-pearl-100"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold-500" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map(g => (
              <div key={g.id} className="relative border border-gold-500/30 overflow-hidden bg-obsidian-950 group">
                <img src={g.imageUrl} alt="" className="w-full h-48 object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500" />
                <div className="p-4 bg-obsidian-900 border-t border-obsidian-600 flex items-center justify-between font-mono text-xs">
                  <div>
                    <h4 className="font-serif font-bold text-pearl-100 uppercase text-sm">{g.title || 'Untitled'}</h4>
                    <span className="text-[10px] uppercase font-mono text-gold-500">{g.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenEdit(g)} className="p-1.5 bg-obsidian-950 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 border border-gold-500/30 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(g.id)} className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-gold-500/40 shadow-2xl w-full max-w-md p-6 space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between border-b border-obsidian-600 pb-3">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase">{editingItem ? 'Edit Photo' : 'Add Photo'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-pearl-300 hover:text-pearl-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100">
                  <option value="Jewellery">Jewellery</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Events">Events</option>
                  <option value="Collections">Collections</option>
                </select>
              </div>
              <div>
                <ImageUploader
                  label="Upload Gallery Photo"
                  value={formData.imageUrl}
                  onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                />
              </div>
              <button type="submit" className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow">
                Save Photo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
