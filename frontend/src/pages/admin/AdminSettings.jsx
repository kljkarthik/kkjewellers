import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import ImageUploader from '../../components/ImageUploader';

const AdminSettings = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    logoUrl: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    googleMapsUrl: '',
    openingHours: '',
    instagram: '',
    facebook: '',
    youtube: '',
    footerDescription: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/settings');
      if (res.data) setFormData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await API.put('/admin/settings', formData);
      await refreshSettings();
      setSuccess(true);
    } catch (err) {
      alert('Failed to update website settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-obsidian-600 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-500 uppercase tracking-wider">Website Settings</h2>
          <p className="text-xs text-pearl-300 font-mono mt-0.5">Configure global showroom contact details, WhatsApp number, and address.</p>
        </div>
      </div>

      <div className="bg-obsidian-900 border border-obsidian-600 shadow-2xl p-8 max-w-4xl font-mono text-xs">
        {loading ? (
          <div className="p-12 text-center text-pearl-100"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold-500" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-3 bg-emerald-950/80 border border-gold-500/50 text-gold-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Website Settings updated successfully! Public website has been synchronized.</span>
              </div>
            )}

            {/* General Brand Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider border-b border-obsidian-600 pb-2">Brand Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Business Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Upload Brand Logo Photo"
                  value={formData.logoUrl}
                  onChange={(val) => setFormData({ ...formData, logoUrl: val })}
                />
              </div>
            </div>

            {/* Communication & WhatsApp */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider border-b border-obsidian-600 pb-2">Showroom Contact & WhatsApp</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={formData.whatsappNumber}
                    onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-gold-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
              </div>
            </div>

            {/* Location & Hours */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider border-b border-obsidian-600 pb-2">Physical Location & Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Showroom Address</label>
                  <textarea
                    rows="2"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Google Maps URL</label>
                  <textarea
                    rows="2"
                    value={formData.googleMapsUrl}
                    onChange={e => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100 font-mono"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={e => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                />
              </div>
            </div>

            {/* Social Media & Footer */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider border-b border-obsidian-600 pb-2">Social Links & Footer</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                    className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold-500 uppercase mb-1">Footer Brand Summary</label>
                <textarea
                  rows="3"
                  value={formData.footerDescription}
                  onChange={e => setFormData({ ...formData, footerDescription: e.target.value })}
                  className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-gold-500 text-obsidian-950 font-bold uppercase tracking-widest text-xs shadow-obsidian-glow flex items-center justify-center gap-2"
            >
              {saving ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" /> Save Website Settings
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
