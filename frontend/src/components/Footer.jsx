import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Youtube, ShieldCheck, Lock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();

  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '919440156446'}?text=${encodeURIComponent('Hello KK JEWELLERS, I am exploring your digital catalogue.')}`;

  return (
    <footer className="bg-obsidian-950 text-pearl-200 border-t border-gold-500/30 pt-16 pb-8 relative overflow-hidden font-sans text-left">
      
      {/* Thin Gold Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Gold Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold-500/60 bg-obsidian-900 flex items-center justify-center font-serif text-gold-500 font-bold text-lg">
                KK
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gold-500 tracking-[0.2em] uppercase">
                  {settings?.businessName || 'KK JEWELLERS'}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-pearl-300 font-mono">
                  {settings?.tagline || 'EST. 2017 &bull; Royal Fine Jewellery'}
                </p>
              </div>
            </div>

            <p className="text-xs text-pearl-300 leading-relaxed font-light">
              {settings?.footerDescription || 'KK JEWELLERS is a premier Indian jewellery house renowned for handcrafted 22K gold, certified solitaire diamond ornaments, and bespoke royal bridal collections.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 border border-gold-500/30 bg-obsidian-900 flex items-center justify-center text-gold-500 hover:text-gold-400 hover:border-gold-400 transition-colors" title="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 border border-gold-500/30 bg-obsidian-900 flex items-center justify-center text-gold-500 hover:text-gold-400 hover:border-gold-400 transition-colors" title="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 border border-gold-500/30 bg-obsidian-900 flex items-center justify-center text-gold-500 hover:text-gold-400 hover:border-gold-400 transition-colors" title="YouTube">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-8 h-8 border border-gold-500/30 bg-obsidian-800 flex items-center justify-center text-gold-400 hover:bg-obsidian-700 transition-colors" title="WhatsApp">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Minimal Navigation */}
          <div>
            <h4 className="font-serif text-xs font-bold text-gold-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-obsidian-600">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-[0.2em] font-medium">
              <li>
                <Link to="/collections" className="text-pearl-300 hover:text-gold-400 transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-pearl-300 hover:text-gold-400 transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/collections?collection=bridal-collection" className="text-pearl-300 hover:text-gold-400 transition-colors">Bridal Collection</Link>
              </li>
              <li>
                <Link to="/about" className="text-pearl-300 hover:text-gold-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-pearl-300 hover:text-gold-400 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-pearl-300 hover:text-gold-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Fine Collections */}
          <div>
            <h4 className="font-serif text-xs font-bold text-gold-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-obsidian-600">
              FINE COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-pearl-300 font-light">
              <li>
                <Link to="/collections?category=gold-jewellery" className="hover:text-gold-400 transition-colors">&bull; Royal 22K Gold</Link>
              </li>
              <li>
                <Link to="/collections?category=diamond-jewellery" className="hover:text-gold-400 transition-colors">&bull; Certified Solitaires</Link>
              </li>
              <li>
                <Link to="/collections?category=necklaces" className="hover:text-gold-400 transition-colors">&bull; Uncut Polki Chokers</Link>
              </li>
              <li>
                <Link to="/collections?category=bangles" className="hover:text-gold-400 transition-colors">&bull; Nakshi Carved Kadas</Link>
              </li>
              <li>
                <Link to="/collections?category=earrings" className="hover:text-gold-400 transition-colors">&bull; Temple Jhumka Earrings</Link>
              </li>
              <li>
                <Link to="/collections?category=mens-jewellery" className="hover:text-gold-400 transition-colors">&bull; Men's Signet Rings</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Showroom */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-gold-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-obsidian-600">
              FLAGSHIP SHOWROOM
            </h4>
            <div className="space-y-3 text-xs text-pearl-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <p>{settings?.address || 'KK JEWELLERS, Main Road, Tanuku, Andhra Pradesh'}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${settings?.phone}`} className="hover:text-gold-400 transition-colors">{settings?.phone || '+91 9440156446'}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${settings?.email}`} className="hover:text-gold-400 transition-colors">{settings?.email || 'enquiry@kkjewellers.com'}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <p>{settings?.openingHours || 'Mon - Sun: 10:30 AM - 08:30 PM'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-obsidian-600 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pearl-300 font-mono">
          <p>&copy; {new Date().getFullYear()} KK JEWELLERS. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-500">
              <ShieldCheck className="w-4 h-4 text-gold-500" /> BIS 916 Hallmarked Gold & GIA Certified Diamonds
            </span>
            <Link to="/admin/login" className="text-gold-500 hover:text-gold-400 flex items-center gap-1 uppercase">
              <Lock className="w-3 h-3" /> Admin Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
