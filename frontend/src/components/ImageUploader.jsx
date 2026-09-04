import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import api from '../services/api';

const ImageUploader = ({ value, onChange, label = "Upload Photo", className = "", folder = "kk-jewellers/products" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.imageUrl) {
        onChange(response.data.imageUrl);
      } else {
        fallbackBase64(file);
      }
    } catch (err) {
      console.warn("Backend Cloudinary upload failed, falling back to data URL:", err);
      fallbackBase64(file);
    } finally {
      setUploading(false);
    }
  };

  const fallbackBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const inputId = React.useId();

  return (
    <div className={`space-y-2 text-left font-mono text-xs ${className}`}>
      {label && <label className="block text-[11px] font-bold text-gold-500 uppercase tracking-wider mb-1">{label}</label>}

      {value ? (
        <div className="relative aspect-video max-h-48 overflow-hidden bg-obsidian-950 border border-gold-500/50 group">
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-rose-600 text-white rounded hover:bg-rose-500 transition-colors flex items-center gap-1 font-bold text-xs"
            >
              <X className="w-4 h-4" /> Remove Photo
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed p-6 text-center transition-all cursor-pointer bg-obsidian-950 ${
            dragActive
              ? 'border-gold-400 bg-gold-500/10'
              : 'border-gold-500/30 hover:border-gold-400/80 hover:bg-obsidian-900'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            id={inputId}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <label htmlFor={inputId} className="cursor-pointer block space-y-2">
            <div className="w-10 h-10 rounded-full bg-obsidian-900 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin text-gold-400" /> : <Upload className="w-5 h-5" />}
            </div>
            <p className="text-pearl-100 font-bold text-xs uppercase tracking-wider">
              {uploading ? "Uploading to Cloudinary..." : "Click to Choose Photo or Drag & Drop"}
            </p>
            <p className="text-[10px] text-pearl-300">
              Supports JPG, PNG, WEBP up to 10MB
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
