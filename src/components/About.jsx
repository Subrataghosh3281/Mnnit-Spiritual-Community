import React from 'react';
import { Heart, Music, Sparkles, Users, Award, BookOpen, Quote } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Anāhata Nāda (The Eternal Sound)",
      hindi: "अनहद नाद की अनुभूति",
      desc: "Inspired by the Vedic philosophy of Anāhata—the unstruck sound that resonates within all creation—we celebrate music as an offering of devotion and pure consciousness.",
      icon: Music,
    },
    {
      title: "Cultural Roots & Heritage",
      hindi: "सनातन सांस्कृतिक धरोहर",
      desc: "Keeping alive our rich traditions of Ram Navami, Janmashtami, Deepotsav, classical ragas, theatrical storytelling, and sacred art amidst our rigorous technical education.",
      icon: Sparkles,
    },
    {
      title: "Student Brotherhood & Fellowship",
      hindi: "सत्संग एवं बंधुत्व",
      desc: "A warm, ego-free sanctuary where students across all departments (CSE, ECE, ME, CE, EE, Biotech, MCA, M.Tech) gather, share melodies, learn, and grow together.",
      icon: Users,
    },
    {
      title: "Inclusivity of All Talents",
      hindi: "सर्व-प्रतिभा सम्मान",
      desc: "You don't need to be an expert classical maestro. Whether you sing, play tabla or guitar, act in plays, create rangoli, or simply love listening to bhajans, Anahad is your family.",
      icon: Heart,
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-vedic-deep/70 overflow-hidden">
      {/* Background Decorative Motifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-vedic-saffron/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-vedic-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-saffron/15 text-vedic-saffron-light border border-vedic-saffron/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Purpose</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">About </span>
            <span className="gold-gradient-text">ANAHAD BAND</span>
          </h2>
          <p className="font-devanagari text-xl text-vedic-gold">अनहद मंडली • मोतीलाल नेहरू राष्ट्रीय प्रौद्योगिकी संस्थान</p>
          <p className="text-sm sm:text-base text-vedic-cream/80 leading-relaxed">
            Rooted in the sacred confluence of Prayagraj, Anahad Band is MNNIT Allahabad’s student-driven community celebrating Indian music, spiritual devotion, theatre, and artistic heritage.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Photos Composite */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-vedic-gold/30 shadow-xl group">
              <img
                src="/images/gallery/photo-10.jpg"
                alt="Anahad Mandali Members in Pranam"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vedic-deep/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs uppercase tracking-wider text-vedic-saffron font-bold">MNNIT Allahabad</p>
                <h4 className="font-serif text-lg font-bold text-white">United in Devotion and Harmony</h4>
                <p className="text-xs text-vedic-sandal">Anahad members offering pranām following a campus performance.</p>
              </div>
            </div>

            {/* Sub-gallery pair */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-vedic-border/70 group h-44">
                <img
                  src="/images/gallery/photo-17.jpg"
                  alt="Anahad Jamming & Rehearsals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-xs font-semibold text-vedic-gold-light">Acoustic Jamming Sessions</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-vedic-border/70 group h-44">
                <img
                  src="/images/gallery/photo-14.jpg"
                  alt="Maha Mantra Chorus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-xs font-semibold text-vedic-gold-light">Hari-Nama Sankirtan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story & Mission Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-vedic-gold/20 relative">
              <Quote className="w-8 h-8 text-vedic-saffron/30 absolute top-4 right-4" />
              <h3 className="font-serif text-2xl font-bold text-vedic-gold-light mb-3">
                Where Engineering Meets Soulful Melody
              </h3>
              <p className="text-sm sm:text-base text-vedic-cream/85 leading-relaxed mb-4">
                At an institute renowned for rigorous engineering research and technical excellence, <strong className="text-white font-semibold">ANAHAD BAND (अनहद मंडली)</strong> emerged from a shared longing among students for spiritual grounding, authentic Indian culture, and heartfelt music.
              </p>
              <p className="text-sm sm:text-base text-vedic-cream/85 leading-relaxed">
                Whether organizing the majestic <strong className="text-vedic-saffron">Deepotsav with thousands of clay lamps</strong>, staging compelling theatrical plays of the Ramayana, or singing uplifting kirtans with harmonium and mridanga, Anahad is a sanctuary where students find joy, brotherhood, and a lifelong artistic family.
              </p>
            </div>

            {/* Sacred Shloka Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-vedic-card via-vedic-surface to-vedic-card border border-vedic-gold/30 text-center">
              <p className="font-devanagari text-lg sm:text-xl text-vedic-gold-light font-bold mb-1">
                "नाहं वसामि वैकुण्ठे योगिनां हृदये न च। मद्भक्ता यत्र गायन्ति तत्र तिष्ठामि नारद॥"
              </p>
              <p className="text-xs text-vedic-cream/75 italic">
                — "I dwell neither in Vaikuntha nor in the hearts of yogis; wherever My devotees sing My glories, there I reside, O Narada."
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-vedic-surface/60 border border-vedic-border text-center">
                <span className="block font-serif text-2xl font-bold text-vedic-gold">100+</span>
                <span className="text-[11px] text-vedic-muted">Active Student Members</span>
              </div>
              <div className="p-3.5 rounded-xl bg-vedic-surface/60 border border-vedic-border text-center">
                <span className="block font-serif text-2xl font-bold text-vedic-saffron">25+</span>
                <span className="text-[11px] text-vedic-muted">Festivals & Kirtans</span>
              </div>
              <div className="p-3.5 rounded-xl bg-vedic-surface/60 border border-vedic-border text-center">
                <span className="block font-serif text-2xl font-bold text-vedic-gold-light">1000+</span>
                <span className="text-[11px] text-vedic-muted">Diyas Lit Every Deepotsav</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel glass-panel-hover border border-vedic-border/70 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vedic-saffron/20 to-vedic-gold/20 border border-vedic-gold/40 flex items-center justify-center mb-4 text-vedic-gold">
                  <v.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">{v.title}</h4>
                <p className="font-devanagari text-xs text-vedic-saffron mb-3">{v.hindi}</p>
                <p className="text-xs sm:text-sm text-vedic-cream/75 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
