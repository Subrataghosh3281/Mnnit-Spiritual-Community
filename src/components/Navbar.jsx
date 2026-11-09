import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Shield, MessageCircle, ChevronRight, Music } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar({ onOpenAdmin, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Join Us', href: '#join' },
    { name: 'Coordinators', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-vedic-navy/95 backdrop-blur-md border-b border-vedic-border/70 shadow-lg shadow-black/40 py-2.5'
          : 'bg-gradient-to-b from-vedic-deep/90 via-vedic-navy/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Institute Identity */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Anahad Logo */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-vedic-gold/60 p-0.5 bg-vedic-surface/80 group-hover:border-vedic-saffron transition-all duration-300 group-hover:scale-105 shadow-md shadow-vedic-gold/10">
              <img
                src="/images/anahad-logo.svg"
                alt="Anahad Band Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* MNNIT Allahabad Crest */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-vedic-border/80 p-0.5 bg-white/10 hidden xs:flex items-center justify-center group-hover:border-vedic-gold/60 transition-all duration-300">
              <img
                src="/images/mnnit-logo.png"
                alt="MNNIT Allahabad Emblem"
                className="w-full h-full object-contain filter drop-shadow"
                onError={(e) => {
                  // Fallback to text if missing
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Text Title */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider gold-gradient-text">
                  ANAHAD
                </span>
                <span className="font-devanagari text-xs sm:text-sm text-vedic-saffron font-semibold">
                  (अनहद मंडली)
                </span>
              </div>
              <span className="text-[10px] sm:text-xs tracking-widest text-vedic-muted font-medium uppercase">
                MNNIT Allahabad
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-vedic-cream/90 hover:text-vedic-gold hover:bg-vedic-surface/60 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Drone Player */}
            <AudioPlayer />

            {/* WhatsApp Group Quick Pill */}
            <a
              href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/25 hover:border-emerald-400 transition-all duration-300 shadow-sm"
              title="Join Official Anahad WhatsApp Group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20" />
              <span>WhatsApp</span>
            </a>

            {/* Join Button */}
            <a
              href="#join"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md shadow-vedic-saffron/20 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span>Join Club</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            {/* Admin Key Icon */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-vedic-muted hover:text-vedic-gold hover:bg-vedic-surface/80 transition-colors duration-200"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-vedic-cream hover:bg-vedic-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-vedic-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-vedic-card/95 backdrop-blur-xl border-b border-vedic-border/80 px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-vedic-cream hover:text-vedic-gold hover:bg-vedic-surface/70"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-vedic-border/50 flex flex-col gap-2.5">
            <a
              href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm bg-emerald-600/20 text-emerald-400 border border-emerald-500/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Group</span>
            </a>
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep"
            >
              <span>Join Our Community</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
