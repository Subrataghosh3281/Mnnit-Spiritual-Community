import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, CheckCircle2, Heart, Music, Users, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitApplication } from '../lib/storage';

export default function JoinSection({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    year: '1st Year',
    branch: '',
    phone: '',
    email: '',
    skills: [],
    whyToJoin: '',
    spiritualOrMusicActivity: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const skillOptions = [
    'Classical Vocals',
    'Devotional / Bhajan Singing',
    'Harmonium / Keyboard',
    'Tabla / Mridanga / Dholak',
    'Acoustic Guitar',
    'Flute / Bansuri',
    'Drama & Stage Acting',
    'Rangoli & Visual Art',
    'Sound & Stage Logistics',
    'Photography & Media',
    'Devotional Enthusiast / Listener'
  ];

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number so we can contact you.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6F1E', '#F59E0B', '#FCD34D', '#10B981']
      });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert('Error submitting form, but your application is saved locally!');
    }
  };

  return (
    <section id="join" className="relative py-24 bg-vedic-deep overflow-hidden">
      {/* Background Sacred Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-vedic-saffron/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-vedic-saffron/20 text-vedic-saffron-light border border-vedic-saffron/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Spiritual & Musical Family</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span className="text-white">Your Talent Deserves a Stage. </span>
            <span className="gold-gradient-text block sm:inline">Show Us What You've Got!</span>
          </h2>

          <p className="font-devanagari text-lg text-vedic-gold">
            चाहे आप गाते हों, वाद्य बजाते हों, नाटक करते हों या रंगोली बनाते हों — अनहद में आपका स्वागत है।
          </p>

          <p className="text-sm sm:text-base text-vedic-cream/85 max-w-2xl mx-auto leading-relaxed">
            Whether you sing, play an instrument, perform drama, create art, love rangoli or simply have a passion for Indian culture, Anahad welcomes you. You don't need to be a professional. Bring your talent, creativity and enthusiasm and become part of our family.
          </p>
        </div>

        {/* 3 Prominent Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Option 1: WhatsApp Group Card (Prominent Callout) */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/40 hover:border-emerald-400/70 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 fill-emerald-400/20" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Join Anahad WhatsApp Group</h3>
              <p className="text-xs sm:text-sm text-vedic-cream/80 leading-relaxed">
                Connect directly with MNNIT Allahabad’s official spiritual & musical circle. Get instant updates on upcoming bhajans, kirtans, rehearsals, and festive celebrations.
              </p>
            </div>
            <div className="pt-5">
              <a
                href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Official WhatsApp Group</span>
              </a>
            </div>
          </div>

          {/* Option 2: Attend Upcoming Events */}
          <div className="p-6 rounded-2xl glass-panel border border-vedic-border/80 hover:border-vedic-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-vedic-saffron/20 border border-vedic-saffron/40 flex items-center justify-center text-vedic-saffron group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Attend Our Events</h3>
              <p className="text-xs sm:text-sm text-vedic-cream/80 leading-relaxed">
                Want to experience an evening of soul-stirring kirtan or volunteer at Deepotsav? Reserve your seat or register as an attendee for our upcoming gatherings.
              </p>
            </div>
            <div className="pt-5">
              <a
                href="#events"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-vedic-surface hover:bg-vedic-card text-vedic-cream border border-vedic-border hover:border-vedic-gold/40 flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-vedic-gold" />
                <span>Browse Upcoming Events</span>
              </a>
            </div>
          </div>

          {/* Option 3: Join Our Club */}
          <div className="p-6 rounded-2xl glass-panel border border-vedic-gold/40 hover:border-vedic-gold/70 transition-all duration-300 flex flex-col justify-between group shadow-xl bg-gradient-to-b from-vedic-card to-vedic-surface">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-vedic-gold/20 border border-vedic-gold/40 flex items-center justify-center text-vedic-gold group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Show Your Talent</h3>
              <p className="text-xs sm:text-sm text-vedic-cream/80 leading-relaxed">
                Fill the membership application below. We regularly hold informal jams, training circles, and auditions where you can hone your skills with seniors.
              </p>
            </div>
            <div className="pt-5">
              <a
                href="#application-form"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep flex items-center justify-center gap-2 shadow-lg shadow-vedic-saffron/20 hover:brightness-110 transition-all"
              >
                <span>Fill Application Below</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Application Form */}
        <div id="application-form" className="max-w-3xl mx-auto rounded-3xl glass-panel border-2 border-vedic-gold/40 p-6 sm:p-10 shadow-2xl relative">
          
          <div className="text-center space-y-2 mb-8">
            <span className="font-devanagari text-vedic-saffron text-sm font-semibold">॥ श्री गणेशाय नमः ॥</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Anahad Band Membership Form
            </h3>
            <p className="text-xs sm:text-sm text-vedic-cream/70">
              Open for all students of MNNIT Allahabad (B.Tech, M.Tech, MCA, PhD)
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-vedic-surface/90 border border-emerald-500/50 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                Application Received with Joy!
              </h4>
              <p className="text-sm text-vedic-cream/85 max-w-md mx-auto leading-relaxed">
                Thank you for applying to <strong className="text-vedic-gold">ANAHAD BAND</strong>, {formData.name}. Our student coordinators will reach out to you on WhatsApp / Phone soon!
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={settings?.whatsappGroupLink || "https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Our WhatsApp Group Now</span>
                </a>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      year: '1st Year',
                      branch: '',
                      phone: '',
                      email: '',
                      skills: [],
                      whyToJoin: '',
                      spiritualOrMusicActivity: '',
                    });
                  }}
                  className="text-xs text-vedic-muted hover:text-vedic-gold underline"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                    Year of Study *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white text-sm focus:outline-none focus:border-vedic-gold"
                  >
                    <option value="1st Year">1st Year (Freshers)</option>
                    <option value="2nd Year">2nd Year (Sophomores)</option>
                    <option value="3rd Year">3rd Year (Pre-final)</option>
                    <option value="4th Year">4th Year (Final Year)</option>
                    <option value="M.Tech / MCA / PhD">Postgraduate (M.Tech / MCA / PhD)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Branch & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                    Branch / Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. CSE / ECE / Mechanical / Civil / Biotech"
                    className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold"
                  />
                </div>
              </div>

              {/* Row 3: College Email */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                  Email Address (College / Personal) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ramesh.2023xxxx@mnnit.ac.in"
                  className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold"
                />
              </div>

              {/* Row 4: Skills & Talents Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-2">
                  Skills & Talents (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {skillOptions.map((skill) => {
                    const selected = formData.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selected
                            ? 'bg-vedic-saffron/25 border-vedic-gold text-vedic-gold-light shadow-sm'
                            : 'bg-vedic-surface/60 border-vedic-border/60 text-vedic-cream/80 hover:border-vedic-border'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Why To Join (Specific User Request) */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                  Why do you want to join Anahad? *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.whyToJoin}
                  onChange={(e) => setFormData({ ...formData, whyToJoin: e.target.value })}
                  placeholder="Tell us what draws you to Anahad — your passion for music, spirituality, stage drama, or campus cultural events..."
                  className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold resize-none"
                ></textarea>
              </div>

              {/* Row 6: Any Music or Spiritual Activity (Specific User Request) */}
              <div>
                <label className="block text-xs font-semibold text-vedic-gold-light mb-1.5">
                  Any previous musical, theatrical or spiritual activity experience?
                </label>
                <textarea
                  rows="2"
                  value={formData.spiritualOrMusicActivity}
                  onChange={(e) => setFormData({ ...formData, spiritualOrMusicActivity: e.target.value })}
                  placeholder="e.g. Played tabla at school, sing bhajans at home, love attending kirtans, interested in learning harmonium..."
                  className="w-full px-4 py-3 rounded-xl bg-vedic-surface/80 border border-vedic-border/80 text-white placeholder-vedic-muted/50 text-sm focus:outline-none focus:border-vedic-gold resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-vedic-saffron via-amber-500 to-vedic-gold text-vedic-deep shadow-xl shadow-vedic-saffron/30 hover:shadow-vedic-saffron/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Membership Application</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
