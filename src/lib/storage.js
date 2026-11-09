import { initialEvents, initialGallery, initialSiteSettings } from '../data/initialData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  EVENTS: 'anahad_events_v1',
  GALLERY: 'anahad_gallery_v1',
  SETTINGS: 'anahad_settings_v1',
  APPLICATIONS: 'anahad_applications_v1',
  ADMIN_AUTH: 'anahad_admin_session_v1',
};

// Safe LocalStorage helpers
export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

export const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
};

// Events API
export const fetchEvents = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase fetch failed, using local storage", e);
    }
  }
  return getStoredData(STORAGE_KEYS.EVENTS, initialEvents);
};

export const saveEvent = async (event) => {
  const current = getStoredData(STORAGE_KEYS.EVENTS, initialEvents);
  let updated;
  if (event.id) {
    updated = current.map(item => item.id === event.id ? { ...item, ...event } : item);
  } else {
    const newEvent = { ...event, id: Date.now() };
    updated = [newEvent, ...current];
  }
  setStoredData(STORAGE_KEYS.EVENTS, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      if (event.id) {
        await supabase.from('events').upsert(event);
      } else {
        await supabase.from('events').insert([event]);
      }
    } catch (e) {
      console.warn("Supabase event save failed", e);
    }
  }
  return updated;
};

export const deleteEvent = async (id) => {
  const current = getStoredData(STORAGE_KEYS.EVENTS, initialEvents);
  const updated = current.filter(item => item.id !== id);
  setStoredData(STORAGE_KEYS.EVENTS, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('events').delete().eq('id', id);
    } catch (e) {
      console.warn("Supabase event delete failed", e);
    }
  }
  return updated;
};

// Gallery API
export const fetchGallery = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Supabase gallery fetch failed", e);
    }
  }
  return getStoredData(STORAGE_KEYS.GALLERY, initialGallery);
};

export const saveGalleryPhoto = async (photo) => {
  const current = getStoredData(STORAGE_KEYS.GALLERY, initialGallery);
  const newPhoto = { ...photo, id: Date.now() };
  const updated = [newPhoto, ...current];
  setStoredData(STORAGE_KEYS.GALLERY, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('gallery').insert([newPhoto]);
    } catch (e) {
      console.warn("Supabase gallery save failed", e);
    }
  }
  return updated;
};

export const deleteGalleryPhoto = async (id) => {
  const current = getStoredData(STORAGE_KEYS.GALLERY, initialGallery);
  const updated = current.filter(item => item.id !== id);
  setStoredData(STORAGE_KEYS.GALLERY, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('gallery').delete().eq('id', id);
    } catch (e) {
      console.warn("Supabase gallery delete failed", e);
    }
  }
  return updated;
};

// Applications / Join Submissions
export const submitApplication = async (applicationData) => {
  const current = getStoredData(STORAGE_KEYS.APPLICATIONS, []);
  const newApp = {
    ...applicationData,
    id: Date.now(),
    submittedAt: new Date().toISOString()
  };
  const updated = [newApp, ...current];
  setStoredData(STORAGE_KEYS.APPLICATIONS, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('applications').insert([newApp]);
    } catch (e) {
      console.warn("Supabase application submission failed", e);
    }
  }
  return newApp;
};

export const fetchApplications = () => {
  return getStoredData(STORAGE_KEYS.APPLICATIONS, []);
};

// Site Settings
export const fetchSettings = () => {
  return getStoredData(STORAGE_KEYS.SETTINGS, initialSiteSettings);
};

export const saveSettings = (newSettings) => {
  const current = getStoredData(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  const merged = { ...current, ...newSettings };
  setStoredData(STORAGE_KEYS.SETTINGS, merged);
  return merged;
};

// Admin Session
export const getAdminSession = () => {
  return getStoredData(STORAGE_KEYS.ADMIN_AUTH, null);
};

export const setAdminSession = (user) => {
  setStoredData(STORAGE_KEYS.ADMIN_AUTH, user);
};

export const clearAdminSession = () => {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
};
