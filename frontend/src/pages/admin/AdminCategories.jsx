import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, RefreshCw } from 'lucide-react';
import API from '../../services/api';
import ImageUploader from '../../components/ImageUploader';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    coverImage: '',
    displayOrder: 0,
    active: true
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/categories');
      setCategories(res.data || []);
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
    setFormData({ name: '', slug: '', description: '', coverImage: '', displayOrder: categories.length + 1, active: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingItem(c);
    setFormData({ name: c.name, slug: c.slug, description: c.description || '', coverImage: c.coverImage || '', displayOrder: c.displayOrder || 0, active: c.active !== false });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      await API.delete(`/admin/categories/${id}`);
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
    const payload = { ...formData, slug };

    if (editingItem) {
      await API.put(`/admin/categories/${editingItem.id}`, payload);
    } else {
      await API.post('/admin/categories', payload);
    }
    setModalOpen(false);
    fetchData();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Category Management</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Organize jewellery taxonomies (Gold, Diamond, Bridal, Rings, etc.).</p>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Create Category
        </button>
      </div>

      <div className="bg-obsidian-900 border border-obsidian-600 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-pearl-100"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold-500" /></div>
        ) : (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-obsidian-950 text-gold-500 uppercase tracking-widest text-[11px] border-b border-obsidian-600">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-700">
              {categories.map(c => (
                <tr key={c.id} className="hover:bg-obsidian-950/60 transition-colors">
                  <td className="p-4 font-serif font-bold text-pearl-100 uppercase flex items-center gap-3">
                    {c.coverImage && <img src={c.coverImage} className="w-8 h-8 object-cover border border-gold-500/40" alt="" />}
                    {c.name}
                  </td>
                  <td className="p-4 font-mono text-gold-400">{c.slug}</td>
                  <td className="p-4 text-pearl-300">{c.displayOrder}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(c)} className="p-1.5 bg-obsidian-950 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 border border-gold-500/30 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-obsidian-900 border border-gold-500/40 shadow-2xl w-full max-w-md p-6 space-y-4 text-left font-mono text-xs">
            <div className="flex justify-between border-b border-obsidian-600 pb-3">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase">{editingItem ? 'Edit Category' : 'Create Category'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-pearl-300 hover:text-pearl-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100" />
              </div>
              <div>
                <ImageUploader
                  label="Category Cover Photo"
                  value={formData.coverImage}
                  onChange={(val) => setFormData({ ...formData, coverImage: val })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Description</label>
                <textarea rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow">
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
