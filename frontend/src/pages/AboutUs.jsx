import React from 'react';
import { ShieldCheck, Gem, HeartHandshake, Award, Quote } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollRevealText from '../components/typography/ScrollRevealText';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-950 pt-16 sm:pt-20">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative py-10 sm:py-20 bg-obsidian-950 text-pearl-100 border-b border-gold-500/30 overflow-hidden text-center px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block mb-2">
            LEGACY & HERITAGE
          </span>
          <ScrollRevealText
            text="ABOUT KK JEWELLERS"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-gold-400 uppercase tracking-wide justify-center flex"
          />
          <p className="font-serif italic text-sm sm:text-xl text-pearl-200 mt-2 sm:mt-3 font-light max-w-2xl mx-auto leading-relaxed">
            “Timeless craftsmanship. Exceptional jewellery. Created for generations.”
          </p>
        </div>
      </section>

      {/* Main Storytelling Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 flex-grow space-y-12 sm:space-y-24">
        
        {/* SEGMENT 1: THE FOUNDER */}
        <div className="bg-obsidian-950 border border-gold-500/40 p-5 sm:p-8 lg:p-14 shadow-2xl relative overflow-hidden text-left">
          
          <div className="mb-6 sm:mb-8 border-b border-obsidian-600 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block">
                THE FOUNDER
              </span>
              <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-pearl-100 uppercase mt-1">
                KARPURAM KRISHNA MURTHY
              </h2>
            </div>
            <Quote className="w-10 h-10 text-gold-500/30 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Image Container */}
            <div className="lg:col-span-6 relative group mx-auto w-full">
              <div className="relative border border-gold-500/50 p-2 sm:p-3 bg-obsidian-900 shadow-2xl">
                <div className="overflow-hidden border border-gold-500/30 relative">
                  <img
                    src="/founder.jpg"
                    alt="Karpuram Krishna Murthy - Founder, KK JEWELLERS"
                    className="w-full h-auto max-h-[380px] sm:max-h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-gold-400 border-t border-obsidian-700 pt-2 text-center sm:text-left">
                  <span className="font-serif font-bold text-pearl-100 text-xs sm:text-sm">KARPURAM KRISHNA MURTHY</span>
                  <span className="text-[9px] sm:text-[10px] text-obsidian-950 bg-gold-500 font-bold uppercase tracking-widest px-3 py-1">
                    FOUNDER & VISIONARY
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div>
                <p className="font-mono text-[10px] sm:text-xs text-gold-400 font-bold uppercase tracking-[0.2em] mb-1">
                  THE MAN BEHIND KK JEWELLERS
                </p>
                <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-pearl-100 italic font-light">
                  "Every enduring journey begins with a vision."
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4 text-pearl-200 text-xs sm:text-base leading-relaxed font-light border-l-2 border-gold-500 pl-4 sm:pl-6 py-1 sm:py-2">
                <p className="text-pearl-200 font-sans leading-relaxed">
                  For <strong>Karpuram Krishna Murthy</strong>, known as <strong>KK</strong>, that vision was to create something built not only around jewellery, but around trust, relationships, craftsmanship and the timeless emotions that jewellery represents.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-pearl-300">
                <div className="p-3 bg-obsidian-900 border border-obsidian-700">
                  <span className="text-gold-500 font-bold block text-xs sm:text-sm font-serif">VISION</span>
                  Trust & Personal Relationships
                </div>
                <div className="p-3 bg-obsidian-900 border border-obsidian-700">
                  <span className="text-gold-500 font-bold block text-xs sm:text-sm font-serif">CRAFTSMANSHIP</span>
                  Timeless Indian Heritage
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEGMENT 2: OUR STORY & HERITAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left">
          <div className="space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold block">
              OUR JOURNEY
            </span>
            
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-pearl-100 leading-tight uppercase">
              Our Story & Heritage
            </h2>

            <p className="text-pearl-200 text-xs sm:text-base leading-relaxed font-light">
              KK JEWELLERS began its journey on <strong>14 April 2017</strong>, with a simple yet meaningful vision — to bring together the timeless beauty of jewellery, the richness of Indian traditions, and a commitment to creating pieces that become part of life's most memorable moments.
            </p>

            <p className="text-pearl-300 text-xs sm:text-base leading-relaxed font-light">
              What began as a vision has grown into a jewellery destination built around trust, craftsmanship, elegance, and personal relationships.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-gold-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-950 border border-gold-500/40">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500" /> BIS 916 Hallmarked Gold
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-950 border border-gold-500/40">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500" /> Certified Solitaires
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-gold-500/40 shadow-2xl bg-obsidian-950">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=80"
              alt="KK JEWELLERS Heritage & Showroom"
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* SEGMENT 3: CORE PILLARS */}
        <div className="bg-obsidian-950 p-6 sm:p-12 border border-gold-500/30 text-center">
          <div className="max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500 font-mono font-semibold">WHAT GUIDES US</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-pearl-100 uppercase">Our Pillar Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center space-y-3 p-5 sm:p-6 bg-obsidian-900 border border-obsidian-600">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-950 rounded-full flex items-center justify-center text-gold-500 mx-auto border border-gold-500/40">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-400 uppercase">Absolute Purity</h3>
              <p className="text-xs text-pearl-300 leading-relaxed font-light">
                100% BIS 916 Hallmarked Gold and GIA/IGI certified natural solitaire diamonds with zero compromise.
              </p>
            </div>

            <div className="text-center space-y-3 p-5 sm:p-6 bg-obsidian-900 border border-obsidian-600">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-950 rounded-full flex items-center justify-center text-gold-500 mx-auto border border-gold-500/40">
                <Gem className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-400 uppercase">Heritage Artistry</h3>
              <p className="text-xs text-pearl-300 leading-relaxed font-light">
                Preserving ancient Indian jewellery arts including Nakshi embossing, Kundan Meenakari, and filigree.
              </p>
            </div>

            <div className="text-center space-y-3 p-5 sm:p-6 bg-obsidian-900 border border-obsidian-600">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-obsidian-950 rounded-full flex items-center justify-center text-gold-500 mx-auto border border-gold-500/40">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-400 uppercase">Personal Relationships</h3>
              <p className="text-xs text-pearl-300 leading-relaxed font-light">
                We take pride in building lifelong trust with families, celebrating life's most memorable occasions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default AboutUs;
