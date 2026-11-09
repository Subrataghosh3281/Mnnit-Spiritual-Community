# 🕉️ ANAHAD BAND (अनहद मंडली) – MNNIT Allahabad
### The Official Musical, Spiritual & Cultural Community Website
> *"Where Every Talent Finds Its Rhythm."* • *"जहाँ हर प्रतिभा पाती है अपनी ताल"*

[![MNNIT Allahabad](https://img.shields.io/badge/MNNIT-Allahabad-orange.svg)](https://www.mnnit.ac.in)
[![Music & Devotion](https://img.shields.io/badge/Culture-Music%20%E2%80%A2%20Devotion%20%E2%80%A2%20Tradition-amber.svg)](#)
[![Built with React + Vite](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20CSS-blue.svg)](https://vitejs.dev)
[![Deployed on Render](https://img.shields.io/badge/Hosting-Render-46E3B7.svg)](https://render.com)

---

## 🌸 About Anahad Band

**ANAHAD BAND (अनहद मंडली)** is a student-driven musical, spiritual, and cultural community at **Motilal Nehru National Institute of Technology (MNNIT), Allahabad**.

Inspired by the Vedic philosophy of *Anāhata Nāda* (the eternal, unstruck sound of creation), Anahad unites engineering students through:
- **Ram Navami & Janmashtami Mahotsav**
- **Deepotsav at MNNIT Seminar Hall** with 1000+ sacred clay diyas
- **Soulful Bhajans & Congregational Kirtans** with harmonium, mridanga, and tabla
- **Sanatana Natya & Theatrical Plays** (Ramayana & cultural dramas)
- **Sacred Rangoli & Artistic bulletin boards**
- **Acoustic weekend jam sessions & student fellowship**

---

## ✨ Features & Architecture

### 🎨 1. Indian Cultural Aesthetics & Contemporary Web Design
- **Palette**: Deep Vedic Navy (`#080D1A`), Charcoal, Saffron (`#FF6F1E`), Divine Gold (`#F59E0B`), and Warm Chandan Cream (`#FFFBEB`).
- **Typography**: Google Fonts *Cinzel Decorative*, *Cinzel*, *Plus Jakarta Sans*, *Rozha One*, and *Tiro Devanagari Hindi*.
- **Sacred Geometry**: Rotating mandala rings, diya warm glow accents, and subtle soundwave visualizers.
- **Ambient Tanpura Dhwani**: Built-in pure Web Audio API synthesizer that plays gentle Sa-Pa harmonics on demand without external audio files.

### 🏛️ 2. Official Branding
- **Official MNNIT Allahabad Crest** directly integrated from `mnnit.ac.in`.
- **Custom Vector Anahad Band Logo** with sacred 36-bead mala, divine Bansuri (flute), peacock feather (Mayur Pankh), glowing Om (ॐ), and soundwave naad.

### 📸 3. High-Resolution Photo Gallery (20 Original Photos)
- All 20 authentic photographs from MNNIT performances, Deepotsav, Janmashtami Abhishekam, Ram Navami, and kirtan gatherings.
- Responsive masonry grid with category filters (*Performances*, *Festivals*, *Traditions*, *Drama*, *Art*, *Memories*).
- Click-to-expand lightbox with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).

### 📝 4. "Show Your Talent" – Student Membership Form
- Directly integrated into the page with input fields requested by coordinators:
  - Full Name
  - Year of Study (1st Year to PhD)
  - Department / Branch
  - WhatsApp & Phone Number
  - College Email
  - Multi-select Skills (Classical Vocals, Harmonium, Tabla/Mridanga, Guitar, Flute, Drama/Acting, Rangoli/Art, etc.)
  - **Why to join Anahad**
  - **Any previous musical or spiritual activity experience**
- Confetti celebration upon submission + immediate storage in `localStorage` (with Supabase cloud support).

### 💬 5. Direct WhatsApp Community Integration
- Connects directly to the official MNNIT spiritual group:
  👉 [Join Official WhatsApp Group](https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2)

### 📞 6. Student Coordinators Directory
- **Arpit Srivastava** (Lead Student Coordinator): `+91 9311694460`
- **Subrata Ghosh** (Student Coordinator): `+91 8391842765`
- **Neeraj Sharma** (Student Coordinator): `+91 7852076730`
- **Varun Kumar** (Student Coordinator): `+91 9142352216`
- Quick one-click "Call" and "WhatsApp Chat" buttons for every coordinator.

### 🛡️ 7. Full-Featured Admin Control Center
- Accessible via the Shield icon in the navbar or footer.
- **Default Admin Password**: `anahad108`
- **Events Management**: Add new events, update existing ones, upload event photos, or remove events.
- **Gallery Management**: Upload new photos with category, title, and description.
- **Applications Viewer**: View all student membership submissions with one-click **Export to CSV** for easy opening in Microsoft Excel / Google Sheets!
- **Settings Editor**: Update the WhatsApp group URL, official email, and contact info without editing source code.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (tested on Node.js v24.10)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory.

---

## 🌐 Deployment to Render (100% Free & Easy)

### Method A: Connect GitHub to Render (Recommended)
1. Initialize git and push your repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Official ANAHAD BAND Website"
   git remote add origin https://github.com/YOUR_USERNAME/anahad-band-mnnit.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** → **Static Site**.
4. Select your `anahad-band-mnnit` repository.
5. Set:
   - **Name**: `anahad-band-mnnit`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Click **Create Static Site**.
7. Render will automatically build and deploy your site with free SSL (`https://anahad-band-mnnit.onrender.com`).

### Method B: Render Blueprint (`render.yaml`)
A ready-to-use `render.yaml` file is included in the project root. On Render, select **New +** → **Blueprint**, connect your repo, and Render will automatically configure all settings and deploy!

---

## 🗄️ Optional Supabase Setup

The website works **100% out of the box** without Supabase using resilient browser `localStorage`. 

If you wish to enable cloud database synchronization:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and paste the contents of `supabase_schema.sql`.
3. In your project root, create a `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Rebuild the application (`npm run build`).

---

## 👥 Student Coordinators Contact
For inquiries, event invites, or collaborations:
- **Location**: MNNIT Allahabad Campus, Teliarganj, Prayagraj, UP 211004
- **Official WhatsApp Group**: [https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif](https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif?s=sh&p=a&iam=2)
- **Email**: `anahad.mnnit@gmail.com`
- **Instagram**: `@anahad_mnnit`
