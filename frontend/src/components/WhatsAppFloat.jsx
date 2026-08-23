import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const WhatsAppFloat = () => {
  const { settings } = useSettings();
  const phone = settings?.whatsappNumber || '919440156446';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hello KK JEWELLERS, I would like to inquire about your jewellery collections and showroom visits.')}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      title="Contact on WhatsApp"
      aria-label="Contact KK JEWELLERS on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out text-xs font-semibold uppercase tracking-wider">
        Chat with Us
      </span>
    </a>
  );
};

export default WhatsAppFloat;
