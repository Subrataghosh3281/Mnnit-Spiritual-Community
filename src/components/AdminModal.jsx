import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Calendar,
  Settings,
  Users,
  Save,
  Download,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import {
  saveEvent,
  deleteEvent,
  saveGalleryPhoto,
  deleteGalleryPhoto,
  fetchApplications,
  saveSettings,
  getAdminSession,
  setAdminSession,
  clearAdminSession,
} from '../lib/storage';

export default function AdminModal({
  isOpen,
  onClose,
  events,
  setEvents,
  gallery,
  setGallery,
  settings,
  setSettings,
}) {
  const [session, setSession] = useState(getAdminSession());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('events'); // events, gallery, applications, settings

  // Form states
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Festival',
    date: new Date().toISOString().split('T')[0],
    time: '6:00 PM',
    venue: 'Seminar Hall, MNNIT Allahabad',
    status: 'Upcoming',
    description: '',
    image: '',
    featured: false,
  });
  const [editingEventId, setEditingEventId] = useState(null);

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Performances',
    description: '',
    image: '',
  });

  const [settingsForm, setSettingsForm] = useState(settings || {});
  const [applications, setApplications] = useState(fetchApplications());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin pin / password
    if (password === 'anahad108' || password === 'admin@mnnit' || password === 'mnnit2024') {
      const userSession = {
        role: 'admin',
        username: 'anahad_admin',
        timestamp: Date.now(),
      };
      setAdminSession(userSession);
      setSession(userSession);
      setLoginError('');
      setApplications(fetchApplications());
    } else {
      setLoginError('Invalid Admin Password. (Default: anahad108)');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
    setPassword('');
  };

  // Handle Image File to Base64
  const handleImageFileChange = (e, formSetter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formSetter((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Event handlers
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.title) return;

    const payload = {
      ...eventForm,
      id: editingEventId || undefined,
      image: eventForm.image || '/images/gallery/photo-1.jpg',
    };

    const updated = await saveEvent(payload);
    setEvents(updated);
    setEventForm({
      title: '',
      category: 'Festival',
      date: new Date().toISOString().split('T')[0],
      time: '6:00 PM',
      venue: 'Seminar Hall, MNNIT Allahabad',
      status: 'Upcoming',
      description: '',
      image: '',
      featured: false,
    });
    setEditingEventId(null);
    showNotice('Event saved successfully!');
  };

  const handleEditEvent = (ev) => {
    setEventForm({
      title: ev.title,
      category: ev.category || 'Festival',
      date: ev.date || '',
      time: ev.time || '',
      venue: ev.venue || '',
      status: ev.status || 'Upcoming',
      description: ev.description || '',
      image: ev.image || '',
      featured: Boolean(ev.featured),
    });
    setEditingEventId(ev.id);
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = await deleteEvent(id);
      setEvents(updated);
      showNotice('Event removed.');
    }
  };

  // Gallery handlers
  const handleSaveGalleryPhoto = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) {
      alert('Please provide a photo title and image file or URL.');
      return;
    }

    const payload = {
      ...galleryForm,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    const updated = await saveGalleryPhoto(payload);
    setGallery(updated);
    setGalleryForm({
      title: '',
      category: 'Performances',
      description: '',
      image: '',
    });
    showNotice('Photo added to gallery!');
  };

  const handleDeleteGalleryPhoto = async (id) => {
    if (window.confirm('Delete this photo from gallery?')) {
      const updated = await deleteGalleryPhoto(id);
      setGallery(updated);
      showNotice('Photo deleted.');
    }
  };

  // Settings handlers
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updated = saveSettings(settingsForm);
    setSettings(updated);
    showNotice('Site settings updated!');
  };

  // Export Applications to CSV
  const handleExportApplications = () => {
    if (!applications || applications.length === 0) {
      alert('No applications submitted yet.');
      return;
    }

    const headers = ['Name', 'Year', 'Branch', 'Phone', 'Email', 'Skills', 'WhyToJoin', 'PastExperience', 'Date'];
    const rows = applications.map((a) => [
      `"${a.name || ''}"`,
      `"${a.year || ''}"`,
      `"${a.branch || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${(a.skills || []).join('; ')}"`,
      `"${(a.whyToJoin || '').replace(/"/g, '""')}"`,
      `"${(a.spiritualOrMusicActivity || '').replace(/"/g, '""')}"`,
      `"${a.submittedAt || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `anahad_club_applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showNotice = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl glass-panel border-2 border-vedic-gold/40 p-5 sm:p-8 shadow-2xl bg-vedic-navy max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-vedic-border/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vedic-saffron/20 border border-vedic-saffron/40 flex items-center justify-center text-vedic-saffron">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Anahad Admin Control Center</span>
                {session && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Active Admin
                  </span>
                )}
              </h3>
              <p className="text-xs text-vedic-muted">
                Manage events, photo gallery, student applications & site settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {session && (
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500/10"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-vedic-muted hover:text-white hover:bg-vedic-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 shrink-0 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Content Body */}
        {!session ? (
          /* Login Form */
          <div className="py-12 flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-vedic-card border border-vedic-gold/40 flex items-center justify-center text-vedic-gold mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <h4 className="font-serif text-xl font-bold text-white">
              Administrator Login
            </h4>
            <p className="text-xs text-vedic-cream/75">
              Enter administrator password to access the event management, gallery uploads, and applications.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-3 pt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. anahad108)"
                className="w-full px-4 py-3 rounded-xl bg-vedic-surface border border-vedic-border text-white text-sm focus:outline-none focus:border-vedic-gold text-center"
              />

              {loginError && (
                <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-vedic-saffron to-vedic-gold text-vedic-deep shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                Sign In to Admin
              </button>

              <div className="text-[11px] text-vedic-muted pt-2">
                Tip: Default password is <code className="text-vedic-gold">anahad108</code>
              </div>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden pt-4">
            
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 border-b border-vedic-border/70 pb-3 shrink-0 overflow-x-auto">
              {[
                { id: 'events', label: 'Events Management', icon: Calendar, count: events.length },
                { id: 'gallery', label: 'Gallery Photos', icon: ImageIcon, count: gallery.length },
                { id: 'applications', label: 'Club Applications', icon: Users, count: applications.length },
                { id: 'settings', label: 'Site Links & Settings', icon: Settings },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-vedic-gold text-vedic-deep font-bold shadow-sm'
                        : 'bg-vedic-surface/80 text-vedic-cream/80 hover:text-vedic-gold border border-vedic-border/60'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        activeTab === tab.id ? 'bg-vedic-deep text-vedic-gold font-bold' : 'bg-vedic-card text-vedic-muted'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Tab Views */}
            <div className="flex-1 overflow-y-auto pt-4 pr-1 space-y-6">
              
              {/* TAB 1: EVENTS */}
              {activeTab === 'events' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Event Creation Form (5 cols) */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-vedic-surface/70 border border-vedic-border space-y-4">
                    <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-vedic-gold" />
                      <span>{editingEventId ? 'Edit Event' : 'Create New Event'}</span>
                    </h4>

                    <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-vedic-gold-light mb-1">Event Title *</label>
                        <input
                          type="text"
                          required
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="e.g. Sri Ram Navami Mahotsav"
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-vedic-gold-light mb-1">Category</label>
                          <select
                            value={eventForm.category}
                            onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                          >
                            <option value="Festival">Festival</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Kirtan">Kirtan</option>
                            <option value="Drama">Drama</option>
                            <option value="Art">Art</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-vedic-gold-light mb-1">Status</label>
                          <select
                            value={eventForm.status}
                            onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-vedic-gold-light mb-1">Date</label>
                          <input
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-vedic-gold-light mb-1">Time</label>
                          <input
                            type="text"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="6:00 PM"
                            className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Venue</label>
                        <input
                          type="text"
                          value={eventForm.venue}
                          onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                          placeholder="e.g. Seminar Hall, MNNIT Allahabad"
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Description</label>
                        <textarea
                          rows="3"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Event details..."
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Photo (Upload or URL)</label>
                        <div className="space-y-1.5">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileChange(e, setEventForm)}
                            className="text-[11px] text-vedic-muted"
                          />
                          <input
                            type="text"
                            value={eventForm.image}
                            onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                            placeholder="or paste image URL /images/gallery/photo-1.jpg"
                            className="w-full px-3 py-1.5 rounded-lg bg-vedic-card border border-vedic-border text-white text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          type="submit"
                          className="flex-1 py-2 px-3 rounded-lg font-bold text-xs bg-vedic-gold text-vedic-deep hover:bg-vedic-gold-light flex items-center justify-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{editingEventId ? 'Update Event' : 'Add Event'}</span>
                        </button>
                        {editingEventId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingEventId(null);
                              setEventForm({
                                title: '',
                                category: 'Festival',
                                date: new Date().toISOString().split('T')[0],
                                time: '6:00 PM',
                                venue: 'Seminar Hall, MNNIT Allahabad',
                                status: 'Upcoming',
                                description: '',
                                image: '',
                                featured: false,
                              });
                            }}
                            className="py-2 px-3 rounded-lg text-xs bg-vedic-surface border border-vedic-border text-vedic-cream"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Events List (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-white">Current Events ({events.length})</h4>
                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                      {events.map((ev) => (
                        <div
                          key={ev.id}
                          className="p-3.5 rounded-xl bg-vedic-surface/60 border border-vedic-border/70 flex items-center justify-between gap-3 hover:border-vedic-gold/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={ev.image || '/images/gallery/photo-1.jpg'}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover border border-vedic-border shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-serif text-xs sm:text-sm font-bold text-white truncate">
                                {ev.title}
                              </h5>
                              <p className="text-[11px] text-vedic-sandal truncate">
                                {ev.date} • {ev.category} • <span className={ev.status === 'Upcoming' ? 'text-emerald-400 font-bold' : 'text-vedic-muted'}>{ev.status}</span>
                              </p>
                              <p className="text-[10px] text-vedic-muted truncate">{ev.venue}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleEditEvent(ev)}
                              className="p-1.5 rounded-lg bg-vedic-card text-vedic-gold hover:bg-vedic-surface transition-colors"
                              title="Edit Event"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="p-1.5 rounded-lg bg-vedic-card text-rose-400 hover:bg-rose-500/20 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GALLERY PHOTOS */}
              {activeTab === 'gallery' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Upload Photo Form (5 cols) */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-vedic-surface/70 border border-vedic-border space-y-4">
                    <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-vedic-gold" />
                      <span>Upload New Photograph</span>
                    </h4>

                    <form onSubmit={handleSaveGalleryPhoto} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-vedic-gold-light mb-1">Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          placeholder="e.g. Deepotsav Celebration at Seminar Hall"
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Category</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold"
                        >
                          <option value="Performances">Performances</option>
                          <option value="Festivals">Festivals</option>
                          <option value="Traditions">Traditions</option>
                          <option value="Drama">Drama</option>
                          <option value="Art">Art</option>
                          <option value="Memories">Memories</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Caption / Description</label>
                        <textarea
                          rows="2"
                          value={galleryForm.description}
                          onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                          placeholder="Photo description..."
                          className="w-full px-3 py-2 rounded-lg bg-vedic-card border border-vedic-border text-white focus:outline-none focus:border-vedic-gold resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Image Source (Upload or URL) *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, setGalleryForm)}
                          className="text-[11px] text-vedic-muted mb-2 block"
                        />
                        <input
                          type="text"
                          value={galleryForm.image}
                          onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                          placeholder="or paste URL e.g. /images/gallery/photo-1.jpg"
                          className="w-full px-3 py-1.5 rounded-lg bg-vedic-card border border-vedic-border text-white text-[11px]"
                        />
                      </div>

                      {galleryForm.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-vedic-gold">
                          <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-vedic-gold text-vedic-deep hover:bg-vedic-gold-light flex items-center justify-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Add Photo to Gallery</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Photo Gallery Grid (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="font-serif text-sm font-bold text-white">Photos ({gallery.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
                      {gallery.map((photo) => (
                        <div
                          key={photo.id}
                          className="group relative rounded-xl overflow-hidden bg-vedic-surface border border-vedic-border aspect-[4/3]"
                        >
                          <img
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                            <span className="text-[10px] text-vedic-gold font-bold truncate">
                              {photo.title}
                            </span>
                            <button
                              onClick={() => handleDeleteGalleryPhoto(photo.id)}
                              className="self-end p-1.5 rounded bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: APPLICATIONS */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">
                        Student Membership Submissions ({applications.length})
                      </h4>
                      <p className="text-xs text-vedic-muted">
                        Responses submitted by MNNIT students via the Show Your Talent form
                      </p>
                    </div>

                    <button
                      onClick={handleExportApplications}
                      className="py-2 px-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {applications.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-vedic-surface/40 border border-vedic-border space-y-2">
                      <Users className="w-8 h-8 text-vedic-muted mx-auto" />
                      <p className="text-sm text-vedic-cream/80">No student applications submitted yet.</p>
                      <p className="text-xs text-vedic-muted">
                        When students submit the form in the "Show Your Talent" section, their details appear here instantly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 rounded-xl bg-vedic-surface/70 border border-vedic-border/80 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="font-serif text-sm font-bold text-white">
                                {app.name}
                              </span>
                              <span className="text-xs text-vedic-gold-light ml-2">
                                ({app.year} • {app.branch})
                              </span>
                            </div>
                            <span className="text-[10px] text-vedic-muted">
                              {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : ''}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-vedic-cream/90">
                            <span>📞 <strong>{app.phone}</strong></span>
                            <span>✉️ <strong>{app.email}</strong></span>
                            {app.skills && app.skills.length > 0 && (
                              <span className="text-vedic-saffron">
                                🎨 {app.skills.join(', ')}
                              </span>
                            )}
                          </div>

                          {app.whyToJoin && (
                            <p className="text-xs text-vedic-cream/80 bg-vedic-card/80 p-2.5 rounded-lg border border-vedic-border/50">
                              <strong className="text-vedic-gold-light">Why join:</strong> {app.whyToJoin}
                            </p>
                          )}

                          {app.spiritualOrMusicActivity && (
                            <p className="text-xs text-vedic-cream/80 bg-vedic-card/80 p-2.5 rounded-lg border border-vedic-border/50">
                              <strong className="text-vedic-saffron">Past Music/Spiritual experience:</strong> {app.spiritualOrMusicActivity}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SETTINGS & LINKS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-vedic-surface/60 border border-vedic-border space-y-5">
                  <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                    <Settings className="w-4 h-4 text-vedic-gold" />
                    <span>Manage External Links & Contact Info</span>
                  </h4>

                  <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-vedic-gold-light mb-1">
                        Official WhatsApp Community / Group Link *
                      </label>
                      <input
                        type="url"
                        value={settingsForm.whatsappGroupLink || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappGroupLink: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-card border border-vedic-border text-white text-xs focus:outline-none focus:border-vedic-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-vedic-gold-light mb-1">
                        Google Form Link (Optional Club Application Form)
                      </label>
                      <input
                        type="url"
                        value={settingsForm.googleFormLink || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, googleFormLink: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-card border border-vedic-border text-white text-xs focus:outline-none focus:border-vedic-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-vedic-gold-light mb-1">Official Email</label>
                        <input
                          type="email"
                          value={settingsForm.email || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-card border border-vedic-border text-white text-xs focus:outline-none focus:border-vedic-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-vedic-gold-light mb-1">Instagram Link</label>
                        <input
                          type="url"
                          value={settingsForm.instagramLink || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, instagramLink: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-card border border-vedic-border text-white text-xs focus:outline-none focus:border-vedic-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-vedic-gold-light mb-1">Campus Location Details</label>
                      <input
                        type="text"
                        value={settingsForm.location || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-vedic-card border border-vedic-border text-white text-xs focus:outline-none focus:border-vedic-gold"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-vedic-gold text-vedic-deep hover:bg-vedic-gold-light transition-all flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Settings Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
