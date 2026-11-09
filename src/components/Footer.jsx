import React from 'react';
import { Sparkles, MessageCircle, Instagram, Mail, Heart, ArrowUp, Shield } from 'lucide-react';

export default function Footer({ onOpenAdmin, settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-vedic-deep border-t border-vedic-border/80 pt-16 pb-12 overflow-hidden text-vedic-cream/80 text-sm">
      {/* Subtle top golden light line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-vedic-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-vedic-border/50">
          
          {/* Col 1: Branding & Intro (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/anahad-logo.png"
                alt="Anahad Logo"
                className="w-14 h-14 object-contain filter drop-shadow"
              />
              <img
                src="/images/mnnit-logo.png"
                alt="MNNIT Allahabad"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-serif text-xl font-bold gold-gradient-text tracking-wider block">
                  ANAHAD BAND
                </span>
                <span className="font-devanagari text-xs text-vedic-saffron font-semibold block">
                  अनहद मंडली • MNNIT Allahabad
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-vedic-cream/70 max-w-sm leading-relaxed">
              A student-driven musical, spiritual and cultural community at Motilal Nehru National Institute of Technology Allahabad. Uniting students through classical ragas, kirtans, theatrical drama, and Vedic celebrations.
            </p>

            <p className="text-xs italic text-vedic-gold-light font-medium">
              "Where Every Talent Finds Its Rhythm."
            </p>

            {/* Social & Chat Pills */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all"
                title="Official WhatsApp Group"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${settings?.email || 'anahad.mnnit@gmail.com'}`}
                className="w-9 h-9 rounded-xl bg-vedic-surface border border-vedic-border hover:border-vedic-gold text-vedic-cream hover:text-vedic-gold flex items-center justify-center transition-all"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={settings?.instagramLink || "https://instagram.com/anahad_mnnit"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-vedic-surface border border-vedic-border hover:border-vedic-gold text-vedic-cream hover:text-pink-400 flex items-center justify-center transition-all"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-vedic-gold transition-colors">
                  About Anahad
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="hover:text-vedic-gold transition-colors">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-vedic-gold transition-colors">
                  Events & Performances
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-vedic-gold transition-colors">
                  Sacred Photo Gallery
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-vedic-gold transition-colors">
                  Show Your Talent (Join)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-vedic-gold transition-colors">
                  Student Coordinators
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Celebrations & Activities (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Key Celebrations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-vedic-cream/70">
              <li>• Deepotsav at Seminar Hall Forecourt</li>
              <li>• Sri Ram Navami Mahotsav & Bhajans</li>
              <li>• Sri Krishna Janmashtami Maha-Kirtan</li>
              <li>• Weekend Acoustic Bhajan Sandhya</li>
              <li>• Sanatan Theatrical Stage Plays</li>
            </ul>

            <div className="pt-3">
              <a
                href="#join"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md hover:brightness-110 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Our Club</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-vedic-muted">
          <div>
            © {new Date().getFullYear()} ANAHAD BAND (अनहद मंडली), MNNIT Allahabad. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-vedic-gold flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-vedic-gold flex items-center gap-1 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
