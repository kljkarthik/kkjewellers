import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWebsiteSettings } from '../services/settingsService';

const SettingsContext = createContext();

const defaultSettings = {
  businessName: 'KK JEWELLERS',
  tagline: 'EST. 2017 • Royal Fine Jewellery',
  logoUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80',
  phone: '+91 9440156446',
  whatsappNumber: '919440156446',
  email: 'enquiry@kkjewellers.com',
  address: 'KK JEWELLERS, Main Road, Kamavarapukota, Andhra Pradesh',
  googleMapsUrl: 'https://www.google.com/maps/place/KK+JEWELLERS/@17.0118298,81.1917804,17z/data=!4m14!1m7!3m6!1s0x3a365e70dec22845:0x96133a8e2d0219a1!2sKK+JEWELLERS!8m2!3d17.0118298!4d81.1943553!16s%2Fg%2F11g7z8t869!3m5!1s0x3a365e70dec22845:0x96133a8e2d0219a1!8m2!3d17.0118298!4d81.1943553!16s%2Fg%2F11g7z8t869',
  openingHours: 'Mon - Sun: 10:30 AM - 08:30 PM',
  instagram: 'https://instagram.com/kkjewellers_official',
  facebook: 'https://facebook.com/kkjewellers.official',
  youtube: 'https://youtube.com/@kkjewellers',
  footerDescription: 'KK JEWELLERS is a premier Indian jewellery destination renowned for handcrafted gold, certified solitaire diamond ornaments, and bespoke royal bridal collections passed down through generations.'
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getWebsiteSettings();
      if (data && data.businessName) {
        setSettings(data);
      }
    } catch (err) {
      console.warn('Using default settings fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
