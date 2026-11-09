import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Events from './components/Events';
import PhotoGallery from './components/PhotoGallery';
import JoinSection from './components/JoinSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import EventRegisterModal from './components/EventRegisterModal';
import { fetchEvents, fetchGallery, fetchSettings } from './lib/storage';

export default function App() {
  const [settings, setSettings] = useState(fetchSettings());
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [evData, galData] = await Promise.all([
          fetchEvents(),
          fetchGallery(),
        ]);
        setEvents(evData);
        setGallery(galData);
      } catch (err) {
        console.error("Error loading initial data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-vedic-navy text-vedic-cream relative selection:bg-vedic-saffron selection:text-white">
      {/* Top Navbar */}
      <Navbar
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section A: Hero */}
        <Hero settings={settings} />

        {/* Section B: About Us */}
        <About />

        {/* Section C: What We Do */}
        <WhatWeDo />

        {/* Section D: Events & Performances */}
        <Events
          events={events}
          onRegisterEvent={(ev) => setRegisterEvent(ev)}
        />

        {/* Section E: Photo Gallery */}
        <PhotoGallery photos={gallery} />

        {/* Section F: Join Anahad – Show Your Talent */}
        <JoinSection settings={settings} />

        {/* Section G: Contact Details */}
        <Contact settings={settings} />
      </main>

      {/* Section H: Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Admin Control Center Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        events={events}
        setEvents={setEvents}
        gallery={gallery}
        setGallery={setGallery}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Event Attendance Registration Modal */}
      {registerEvent && (
        <EventRegisterModal
          event={registerEvent}
          onClose={() => setRegisterEvent(null)}
        />
      )}
    </div>
  );
}
