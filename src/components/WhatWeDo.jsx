import React from 'react';
import { whatWeDo } from '../data/initialData';
import { Mic2, Music4, Sparkles, Drama, Palette, Flame, ArrowUpRight } from 'lucide-react';

export default function WhatWeDo() {
  const iconMap = {
    Mic2: Mic2,
    Music4: Music4,
    Sparkles: Sparkles,
    Drama: Drama,
    Palette: Palette,
    Flame: Flame,
  };

  return (
    <section id="what-we-do" className="relative py-24 bg-vedic-navy overflow-hidden">
      {/* Subtle mandala background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-vedic-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-gold/15 text-vedic-gold border border-vedic-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative & Spiritual Disciplines</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">What </span>
            <span className="gold-gradient-text">We Do</span>
          </h2>
          <p className="font-devanagari text-lg text-vedic-saffron">विविध कलाएं • एक अनहद भाव</p>
          <p className="text-sm sm:text-base text-vedic-cream/80 max-w-2xl mx-auto">
            From classical raga renditions and energetic kirtans to stage plays and floral rangoli art, discover how Anahad brings student creativity to life.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeDo.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-vedic-border/70 hover:border-vedic-gold/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-vedic-gold/10"
              >
                {/* Card Top Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vedic-card via-vedic-card/40 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-vedic-navy/90 backdrop-blur-md border border-vedic-gold/50 flex items-center justify-center text-vedic-gold shadow-md">
                    <IconComponent className="w-5 h-5 text-vedic-gold-light" />
                  </div>

                  {/* Hindi Subtitle Tag */}
                  <div className="absolute bottom-3 left-4">
                    <span className="font-devanagari text-xs font-semibold px-2.5 py-1 rounded-md bg-vedic-saffron/90 text-white shadow-sm">
                      {item.hindi}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-vedic-gold-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-vedic-cream/80 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights Pills */}
                  <div className="pt-2 border-t border-vedic-border/50">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-vedic-surface text-vedic-cream/90 border border-vedic-border/60"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#join"
                      className="inline-flex items-center gap-1 text-xs font-bold text-vedic-saffron hover:text-vedic-gold transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Participate with us</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Bottom Golden Line */}
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-vedic-saffron via-vedic-gold to-vedic-saffron transition-all duration-500" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
