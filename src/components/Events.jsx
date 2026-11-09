import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function Events({ events, onRegisterEvent }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Upcoming', 'Festival', 'Celebration', 'Kirtan', 'Drama', 'Art'];

  const filteredEvents = events.filter((ev) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Upcoming') return ev.status === 'Upcoming';
    return ev.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="events" className="relative py-24 bg-vedic-deep/90 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-vedic-saffron/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-saffron/15 text-vedic-saffron-light border border-vedic-saffron/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Spiritual Gatherings & Stages</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Events & </span>
            <span className="gold-gradient-text">Performances</span>
          </h2>
          <p className="font-devanagari text-lg text-vedic-gold">उत्सव एवं सांस्कृतिक प्रस्तुतियाँ</p>
          <p className="text-sm sm:text-base text-vedic-cream/80 max-w-2xl mx-auto">
            Experience the divine energy of Ram Navami, Janmashtami, Deepotsav, and our vibrant musical assemblies across MNNIT Allahabad.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md shadow-vedic-saffron/20 font-bold scale-105'
                  : 'bg-vedic-card/80 text-vedic-cream/80 border border-vedic-border/70 hover:text-vedic-gold hover:border-vedic-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="group rounded-2xl overflow-hidden glass-panel border border-vedic-border/80 hover:border-vedic-gold/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Event Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={ev.image || '/images/gallery/photo-1.jpg'}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/images/gallery/photo-1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vedic-card via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        ev.status === 'Upcoming'
                          ? 'bg-emerald-500/90 text-white animate-pulse'
                          : 'bg-vedic-surface/90 text-vedic-gold-light border border-vedic-gold/40'
                      }`}
                    >
                      {ev.status === 'Upcoming' ? 'Upcoming Event' : 'Celebrated'}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {ev.category}
                    </span>
                  </div>
                </div>

                {/* Event Meta Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-vedic-gold transition-colors">
                    {ev.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-vedic-sandal/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-vedic-gold shrink-0" />
                      <span>{ev.date}</span>
                      {ev.time && <span className="text-vedic-muted">• {ev.time}</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-vedic-saffron shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-vedic-cream/80 line-clamp-3 leading-relaxed pt-1">
                    {ev.description}
                  </p>
                </div>
              </div>

              {/* Event Bottom Actions */}
              <div className="p-6 pt-0 border-t border-vedic-border/40 mt-4 flex items-center justify-between">
                {ev.status === 'Upcoming' ? (
                  <button
                    onClick={() => onRegisterEvent(ev)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Register to Attend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="#gallery"
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-vedic-surface hover:bg-vedic-card text-vedic-cream/90 border border-vedic-border/80 hover:border-vedic-gold/40 text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View in Gallery</span>
                    <Sparkles className="w-3.5 h-3.5 text-vedic-gold" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
