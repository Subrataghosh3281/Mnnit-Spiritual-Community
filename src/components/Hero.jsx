import React from 'react';
import { Sparkles, MessageCircle, ChevronDown, Music, Heart, Flame, Compass, ArrowRight } from 'lucide-react';

export default function Hero({ settings }) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Sacred Gradients & Divine Mandala Rings */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep ambient radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-gradient-to-tr from-vedic-saffron/15 via-vedic-gold/10 to-transparent rounded-full blur-3xl opacity-70 animate-pulse-glow" />
        
        {/* Subtle rotating sacred geometry mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-vedic-gold/10 rounded-full animate-spin-slow opacity-40">
          <div className="absolute inset-4 border border-vedic-saffron/10 rounded-full border-dashed" />
          <div className="absolute inset-16 border border-vedic-gold/5 rounded-full" />
        </div>

        {/* Sacred Diya warm glow base */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-vedic-saffron/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Branding, Typography, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Institute & Cultural Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-vedic-surface/90 border border-vedic-gold/40 text-vedic-gold-light shadow-sm">
                <img src="/images/anahad-logo.png" alt="Anahad Logo" className="w-5 h-5 object-contain" />
                <span>ANAHAD BAND</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-vedic-surface/90 border border-vedic-border text-vedic-cream/90 shadow-sm">
                <img src="/images/mnnit-logo.png" alt="MNNIT" className="w-4 h-4 object-contain" />
                MNNIT Allahabad
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-vedic-saffron/20 border border-vedic-saffron/40 text-vedic-saffron-light">
                <Sparkles className="w-3.5 h-3.5" />
                अनहद मंडली
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                <span className="block text-white">Feel the Rhythm.</span>
                <span className="block gold-gradient-text">Celebrate the Culture.</span>
              </h1>
              <p className="font-devanagari text-lg sm:text-xl text-vedic-saffron font-medium pt-1">
                "जहाँ हर प्रतिभा पाती है अपनी ताल"
              </p>
            </div>

            {/* Tagline & Identity */}
            <p className="font-sans text-base sm:text-lg text-vedic-cream/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <span className="text-vedic-gold-light font-semibold">"{settings?.tagline || 'Where Every Talent Finds Its Rhythm.'}"</span>{' '}
              {settings?.subheadline || 'A student-driven musical, spiritual and cultural community uniting engineering students through bhajans, kirtans, theatrical drama, sacred celebrations, and creative arts at Motilal Nehru National Institute of Technology Allahabad.'}
            </p>

            {/* 4 Identity Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0 pt-1">
              {[
                { icon: Music, label: 'Music', hindi: 'संगीत', color: 'from-amber-500/20 to-amber-600/10' },
                { icon: Heart, label: 'Devotion', hindi: 'भक्ति', color: 'from-orange-500/20 to-orange-600/10' },
                { icon: Flame, label: 'Culture', hindi: 'संस्कृति', color: 'from-rose-500/20 to-rose-600/10' },
                { icon: Sparkles, label: 'Creativity', hindi: 'सृजन', color: 'from-yellow-500/20 to-yellow-600/10' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl bg-gradient-to-b ${item.color} border border-vedic-border/60 backdrop-blur-sm hover:border-vedic-gold/40 transition-all`}
                >
                  <item.icon className="w-4 h-4 text-vedic-gold mb-1" />
                  <span className="text-xs font-bold text-vedic-cream">{item.label}</span>
                  <span className="text-[10px] text-vedic-saffron font-medium">{item.hindi}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#join"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-vedic-saffron via-amber-500 to-vedic-gold text-vedic-deep shadow-lg shadow-vedic-saffron/25 hover:shadow-vedic-saffron/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Join Our Community</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Join WhatsApp Group</span>
              </a>

              <a
                href="#about"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm bg-vedic-card/80 hover:bg-vedic-surface text-vedic-cream border border-vedic-border/80 hover:border-vedic-gold/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-vedic-gold" />
                <span>Explore Journey</span>
              </a>
            </div>

            {/* Coordinator Quick Info Callout */}
            <div className="pt-2 text-xs text-vedic-muted flex items-center justify-center lg:justify-start gap-4">
              <span>🌟 Open to All Branches & Batches</span>
              <span>•</span>
              <span>📍 MNNIT Allahabad Campus</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase with Real Photos & Sacred Altar Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card (Anahad Musicians on Stage - Photo 4) */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-vedic-gold/40 shadow-2xl shadow-black/80 bg-vedic-card group">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/images/gallery/photo-4.jpg"
                    alt="Anahad Classical Ensemble in Kirtan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-vedic-deep via-transparent to-transparent opacity-90" />
                
                {/* Floating Badge on Main Card */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-vedic-saffron text-white mb-1">
                      Live Performance
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white drop-shadow">
                      Anahad Band on MNNIT Stage
                    </h3>
                    <p className="text-xs text-vedic-sandal drop-shadow">
                      Harmonium, Mridanga & Soulful Bhajans
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-vedic-surface/95 px-2.5 py-1 rounded-lg border border-vedic-gold/40 text-xs text-vedic-gold shadow-md">
                    <img src="/images/anahad-logo.png" alt="Anahad Logo" className="w-5 h-5 object-contain" />
                    <span className="font-serif font-bold">अनहद मंडली</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Card (Deepotsav / Altar - Photo 1) */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 rounded-xl overflow-hidden border border-vedic-gold/50 shadow-2xl bg-vedic-card transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square w-full">
                  <img
                    src="/images/gallery/photo-1.jpg"
                    alt="Deepotsav at MNNIT Seminar Hall"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 bg-vedic-deep/95 border-t border-vedic-border">
                  <p className="text-[10px] font-bold text-vedic-gold-light truncate">MNNIT Deepotsav</p>
                  <p className="text-[9px] text-vedic-muted">1000+ Diyas & Rangoli</p>
                </div>
              </div>

              {/* Overlapping Top-Right Badge (Deity Darshan - Photo 12) */}
              <div className="hidden sm:flex items-center gap-3 absolute -top-6 -right-6 px-3.5 py-2.5 rounded-xl bg-vedic-surface/95 border border-vedic-gold/50 shadow-xl backdrop-blur-md transform rotate-2 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-vedic-gold/40">
                  <img
                    src="/images/gallery/photo-12.jpg"
                    alt="Divine Radha Krishna"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-vedic-gold-light">Devotion & Grace</p>
                  <p className="text-[10px] text-vedic-cream/80">भक्ति रस संकीर्तन</p>
                </div>
              </div>

              {/* Decorative Diya Corner Accent */}
              <div className="absolute -bottom-4 -right-4 p-2 bg-vedic-card rounded-full border border-vedic-gold/40 shadow-lg text-vedic-gold">
                <Flame className="w-5 h-5 text-vedic-saffron fill-vedic-saffron/40 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-vedic-muted">Explore</span>
        <ChevronDown className="w-4 h-4 text-vedic-gold animate-bounce" />
      </div>
    </section>
  );
}
