import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Sparkles, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { coordinators } from '../data/initialData';

export default function Contact({ settings }) {
  return (
    <section id="contact" className="relative py-24 bg-vedic-navy overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-vedic-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-saffron/15 text-vedic-saffron-light border border-vedic-saffron/30">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Connect With Student Leads</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">Contact </span>
            <span className="gold-gradient-text">Coordinators</span>
          </h2>

          <p className="font-devanagari text-lg text-vedic-gold">सम्पर्क सूत्र • अनहद मंडली</p>

          <p className="text-sm sm:text-base text-vedic-cream/80 max-w-2xl mx-auto">
            Have a question about upcoming kirtans, Deepotsav celebrations, or joining Anahad? Feel free to call or WhatsApp any of our student coordinators.
          </p>
        </div>

        {/* 4 Coordinators Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coordinators.map((c, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-vedic-border/70 hover:border-vedic-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Badge & Avatar */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vedic-saffron/20 to-vedic-gold/20 border border-vedic-gold/40 flex items-center justify-center text-vedic-gold font-serif text-lg font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-vedic-surface text-vedic-gold-light border border-vedic-border">
                    {c.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-vedic-gold transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-vedic-saffron font-medium">{c.role}</p>
                  <p className="text-xs text-vedic-muted">{c.department}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-vedic-cream/90 bg-vedic-surface/80 px-3 py-2 rounded-xl border border-vedic-border/60">
                    <Phone className="w-4 h-4 text-vedic-gold" />
                    <span>+91 {c.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 grid grid-cols-2 gap-2 mt-2">
                <a
                  href={`tel:+91${c.phone}`}
                  className="py-2 px-3 rounded-lg text-xs font-bold bg-vedic-surface hover:bg-vedic-card text-vedic-cream border border-vedic-border text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-vedic-gold" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/91${c.phone}?text=Hare%20Krishna!%20I%20am%20an%20MNNIT%20student%20interested%20in%20Anahad%20Band.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Official Details & Location Banner */}
        <div className="rounded-3xl glass-panel border border-vedic-gold/30 p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-vedic-saffron font-bold">
                Campus Base & Correspondence
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Motilal Nehru National Institute of Technology Allahabad
              </h3>

              <div className="space-y-3 pt-2 text-sm text-vedic-cream/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-vedic-saffron shrink-0 mt-0.5" />
                  <span>{settings?.location || 'MNNIT Allahabad Campus, Teliarganj, Prayagraj, Uttar Pradesh - 211004, India'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-vedic-gold shrink-0" />
                  <a href={`mailto:${settings?.email || 'anahad.mnnit@gmail.com'}`} className="hover:text-vedic-gold underline">
                    {settings?.email || 'anahad.mnnit@gmail.com'}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <a
                    href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Official MNNIT Spiritual & Cultural WhatsApp Group
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Button Box */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 bg-vedic-surface/80 p-6 rounded-2xl border border-vedic-border/80">
              <h4 className="font-serif text-lg font-bold text-vedic-gold-light">
                Ready to Join Us?
              </h4>
              <p className="text-xs text-vedic-cream/75 leading-relaxed">
                Connect directly on our official WhatsApp community group to never miss a bhajan sandhya, rehearsal, or festival alert.
              </p>
              
              <a
                href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Anahad WhatsApp Group</span>
              </a>

              <a
                href="#join"
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-vedic-card hover:bg-vedic-surface text-vedic-cream border border-vedic-border flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-vedic-gold" />
                <span>Fill Membership Form</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
