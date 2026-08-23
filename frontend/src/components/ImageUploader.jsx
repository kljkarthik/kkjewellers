import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

const ImageUploader = ({ value, onChange, label = "Upload Photo", className = "" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

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
            className="hidden"
          />
          <label htmlFor={inputId} className="cursor-pointer block space-y-2">
            <div className="w-10 h-10 rounded-full bg-obsidian-900 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-pearl-100 font-bold text-xs uppercase tracking-wider">
              Click to Choose Photo or Drag & Drop
            </p>
            <p className="text-[10px] text-pearl-300">
              Supports JPG, PNG, WEBP, GIF (High Quality)
            </p>
          </label>
        </div>
      )}

      {/* Optional Toggle to enter URL manually */}
      <div className="flex items-center justify-between text-[10px] text-pearl-300 pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-gold-400 hover:underline flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" /> {showUrlInput ? "Hide Direct URL Field" : "Enter Image Web URL manually"}
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          placeholder="https://example.com/photo.jpg"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2.5 bg-obsidian-950 border border-gold-500/30 text-pearl-100 text-xs font-mono"
        />
      )}
    </div>
  );
};

export default ImageUploader;
