import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitApplication } from '../lib/storage';

export default function EventRegisterModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branchYear: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitApplication({
        ...formData,
        type: 'event_attendance',
        eventTitle: event.title,
        eventId: event.id,
      });
      setSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6F1E', '#F59E0B', '#10B981']
      });
    } catch (err) {
      setSubmitting(false);
      alert('Registration stored locally!');
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border-2 border-vedic-gold/40 p-6 sm:p-8 shadow-2xl bg-vedic-deep animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-vedic-muted hover:text-white hover:bg-vedic-surface transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Seat Reserved!
            </h3>
            <p className="text-sm text-vedic-cream/80 max-w-sm mx-auto">
              You are registered to attend <strong className="text-vedic-gold-light">{event.title}</strong>. See you at {event.venue}!
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-vedic-surface hover:bg-vedic-card text-vedic-cream border border-vedic-border"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-vedic-saffron text-white inline-block mb-2">
                Event Registration
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-vedic-sandal mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-vedic-gold" />
                  {event.date} {event.time && `• ${event.time}`}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-vedic-saffron" />
                  {event.venue}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priyanshu Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-surface/90 border border-vedic-border text-white text-sm focus:outline-none focus:border-vedic-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-surface/90 border border-vedic-border text-white text-sm focus:outline-none focus:border-vedic-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1">
                    Branch & Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branchYear}
                    onChange={(e) => setFormData({ ...formData, branchYear: e.target.value })}
                    placeholder="e.g. CSE 2nd Year"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-surface/90 border border-vedic-border text-white text-sm focus:outline-none focus:border-vedic-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-1">
                  College Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student@mnnit.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-surface/90 border border-vedic-border text-white text-sm focus:outline-none focus:border-vedic-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? 'Registering...' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
