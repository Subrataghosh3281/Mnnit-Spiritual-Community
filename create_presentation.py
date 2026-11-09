import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # blank layout

    # Vedic Colors
    C_NAVY = RGBColor(8, 13, 26)        # #080D1A
    C_SURFACE = RGBColor(15, 23, 42)    # #0F172A
    C_CARD = RGBColor(22, 33, 56)       # #162138
    C_SAFFRON = RGBColor(255, 111, 30)  # #FF6F1E
    C_GOLD = RGBColor(245, 158, 11)     # #F59E0B
    C_GOLD_LT = RGBColor(252, 211, 77)  # #FCD34D
    C_CREAM = RGBColor(255, 251, 235)   # #FFFBEB
    C_MUTED = RGBColor(148, 163, 184)   # #94A3B8
    C_EMERALD = RGBColor(16, 185, 129)  # #10B981

    img_dir = r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\public\images"
    gal_dir = os.path.join(img_dir, "gallery")
    logo_path = os.path.join(img_dir, "anahad-logo.png")
    mnnit_path = os.path.join(img_dir, "mnnit-logo.png")

    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_NAVY
        bg.line.color.rgb = C_NAVY
        return bg

    def add_header(slide, tag, title, subtitle=None):
        # Top banner tag
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(0.4))
        p = tb.text_frame.paragraphs[0]
        p.text = tag.upper()
        p.font.name = "Georgia"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_SAFFRON

        # Main Title
        tb2 = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.7))
        p2 = tb2.text_frame.paragraphs[0]
        p2.text = title
        p2.font.name = "Georgia"
        p2.font.size = Pt(26)
        p2.font.bold = True
        p2.font.color.rgb = C_CREAM

        if subtitle:
            p2_sub = tb2.text_frame.add_paragraph()
            p2_sub.text = subtitle
            p2_sub.font.name = "Arial"
            p2_sub.font.size = Pt(12)
            p2_sub.font.color.rgb = C_GOLD_LT

        # Gold accent line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.65), Inches(11.733), Inches(0.03))
        line.fill.solid()
        line.fill.fore_color.rgb = C_GOLD
        line.line.color.rgb = C_GOLD

    # ==========================================
    # SLIDE 1: Title & Hero Cover
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_bg(s1)

    # Logos on top left
    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(0.8), Inches(0.8), height=Inches(1.2))
    if os.path.exists(mnnit_path):
        s1.shapes.add_picture(mnnit_path, Inches(2.2), Inches(0.8), height=Inches(1.1))

    # Badge Pill
    badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.3), Inches(4.5), Inches(0.4))
    badge.fill.solid()
    badge.fill.fore_color.rgb = C_SURFACE
    badge.line.color.rgb = C_GOLD
    p_b = badge.text_frame.paragraphs[0]
    p_b.text = "OFFICIAL DIGITAL IDENTITY & PLATFORM"
    p_b.font.size = Pt(10)
    p_b.font.bold = True
    p_b.font.color.rgb = C_GOLD_LT
    p_b.alignment = PP_ALIGN.CENTER

    # Main Headline
    tb_title = s1.shapes.add_textbox(Inches(0.8), Inches(2.8), Inches(7.2), Inches(2.2))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    p1 = tf_t.paragraphs[0]
    p1.text = "ANAHAD BAND"
    p1.font.name = "Georgia"
    p1.font.size = Pt(44)
    p1.font.bold = True
    p1.font.color.rgb = C_GOLD

    p2 = tf_t.add_paragraph()
    p2.text = "अनहद मंडली • MNNIT ALLAHABAD"
    p2.font.name = "Georgia"
    p2.font.size = Pt(20)
    p2.font.bold = True
    p2.font.color.rgb = C_SAFFRON

    p3 = tf_t.add_paragraph()
    p3.text = '"Where Every Talent Finds Its Rhythm"'
    p3.font.name = "Georgia"
    p3.font.size = Pt(16)
    p3.font.italic = True
    p3.font.color.rgb = C_CREAM

    # Identity Description Box
    desc_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.1), Inches(6.8), Inches(1.6))
    desc_box.fill.solid()
    desc_box.fill.fore_color.rgb = C_SURFACE
    desc_box.line.color.rgb = C_CARD
    tf_desc = desc_box.text_frame
    tf_desc.word_wrap = True
    p_d1 = tf_desc.paragraphs[0]
    p_d1.text = "Music • Devotion • Culture • Creativity"
    p_d1.font.size = Pt(13)
    p_d1.font.bold = True
    p_d1.font.color.rgb = C_GOLD_LT
    p_d2 = tf_desc.add_paragraph()
    p_d2.text = "A student-driven musical, spiritual, and cultural community at Motilal Nehru National Institute of Technology (MNNIT) Allahabad, uniting youth through bhajans, kirtans, theatre, and sacred Vedic traditions."
    p_d2.font.size = Pt(11)
    p_d2.font.color.rgb = C_MUTED

    # Right Hero Image (Photo 4 - On stage performance)
    img_hero = os.path.join(gal_dir, "photo-4.jpg")
    if os.path.exists(img_hero):
        pic = s1.shapes.add_picture(img_hero, Inches(8.0), Inches(1.3), width=Inches(4.5))
        # Caption below photo
        c_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.0), Inches(5.9), Inches(4.5), Inches(0.8))
        c_box.fill.solid()
        c_box.fill.fore_color.rgb = C_SURFACE
        c_box.line.color.rgb = C_GOLD
        p_c = c_box.text_frame.paragraphs[0]
        p_c.text = "Live Stage Performance – Anahad Classical Ensemble"
        p_c.font.size = Pt(11)
        p_c.font.bold = True
        p_c.font.color.rgb = C_CREAM
        p_c2 = c_box.text_frame.add_paragraph()
        p_c2.text = "Seminar Hall, MNNIT Allahabad Campus"
        p_c2.font.size = Pt(9)
        p_c2.font.color.rgb = C_MUTED

    # ==========================================
    # SLIDE 2: Executive Summary & Ethos
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_bg(s2)
    add_header(s2, "Community Overview", "About Anahad Band & Philosophical Ethos", "Where Engineering Rigor Meets Sacred Cultural Heritage")

    # 4 Pillar Cards
    pillars = [
        ("Music (संगीत)", "Classical ragas, light devotional vocals, harmonium, tabla, mridanga, acoustic guitars, and flute.", C_GOLD),
        ("Devotion (भक्ति)", "Congregational Harinam Sankirtan, Sri Ram Navami, Janmashtami, and Deepotsav celebrations.", C_SAFFRON),
        ("Culture (संस्कृति)", "Sanatana theatrical drama, Ramayana enactments, sacred rangoli arts, and Vedic rituals.", C_GOLD_LT),
        ("Creativity (सृजन)", "Scriptwriting, bulletin art boards, acoustic jam sessions, and inclusive student collaboration.", C_CREAM),
    ]

    for i, (title, desc, col) in enumerate(pillars):
        x = Inches(0.8 + i * 2.95)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.0), Inches(2.8), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = col
        tf = card.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Georgia"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = col
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = C_MUTED

    # Narrative banner on bottom
    bot_card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.5), Inches(11.7), Inches(2.4))
    bot_card.fill.solid()
    bot_card.fill.fore_color.rgb = C_CARD
    bot_card.line.color.rgb = C_GOLD
    tf_b = bot_card.text_frame
    tf_b.word_wrap = True
    pb1 = tf_b.paragraphs[0]
    pb1.text = 'The Philosophy of "Anāhata Nāda" (अनहद नाद):'
    pb1.font.name = "Georgia"
    pb1.font.size = Pt(15)
    pb1.font.bold = True
    pb1.font.color.rgb = C_GOLD_LT

    pb2 = tf_b.add_paragraph()
    pb2.text = 'In Indian sacred literature, "Anāhad" refers to the unstruck, self-existing cosmic sound of creation. At MNNIT Allahabad—an premier institution celebrated for research and engineering—Anahad Band provides students a welcoming, ego-free sanctuary to connect with their spiritual roots, experience pure musical joy, and build lifelong bonds across all departments (CSE, ECE, Mechanical, Civil, EE, Biotech, MCA, M.Tech, and PhD).'
    pb2.font.size = Pt(11)
    pb2.font.color.rgb = C_CREAM

    pb3 = tf_b.add_paragraph()
    pb3.text = '"नाहं वसामि वैकुण्ठे योगिनां हृदये न च। मद्भक्ता यत्र गायन्ति तत्र तिष्ठामि नारद॥" — Where My devotees sing, there I dwell.'
    pb3.font.size = Pt(11)
    pb3.font.italic = True
    pb3.font.color.rgb = C_SAFFRON

    # ==========================================
    # SLIDE 3: Website Architecture & Design System
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_bg(s3)
    add_header(s3, "Design & Aesthetics", "UI/UX Architecture & Indian Cultural Aesthetics", "Inspired by Hack36.in, SAC MNNIT & Modern Professional Platforms")

    # Left: Aesthetics system
    aes_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.9))
    aes_card.fill.solid()
    aes_card.fill.fore_color.rgb = C_SURFACE
    aes_card.line.color.rgb = C_GOLD
    tf_a = aes_card.text_frame
    tf_a.word_wrap = True
    pa1 = tf_a.paragraphs[0]
    pa1.text = "Visual System & Design Rules"
    pa1.font.name = "Georgia"
    pa1.font.size = Pt(16)
    pa1.font.bold = True
    pa1.font.color.rgb = C_GOLD_LT

    rules = [
        ("🎨 Color Palette", "Deep Navy (#080D1A), Charcoal, Saffron (#FF6F1E), Divine Gold (#F59E0B), and Warm Chandan Cream (#FFFBEB)."),
        ("🔤 Typography", "Cinzel Decorative (Headings), Cinzel (Serif), Plus Jakarta Sans (UI body), Rozha One & Tiro Devanagari (Hindi)."),
        ("🪔 Sacred Motifs", "Rotating mandala geometries, glowing clay diyas, bansuri soundwaves, and Dhanush-Baan emblems."),
        ("🎵 Ambient Tanpura", "Built-in pure Web Audio API synthesizer playing meditative Sa-Pa drone harmonies on-demand without audio files."),
        ("📱 Responsiveness", "Tailwind CSS fluid layouts optimized for Android mobile, tablets, and high-DPI desktop displays.")
    ]
    for r_title, r_desc in rules:
        p_t = tf_a.add_paragraph()
        p_t.text = r_title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_CREAM
        p_d = tf_a.add_paragraph()
        p_d.text = r_desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_MUTED

    # Right: Sections breakdown
    sec_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.9))
    sec_card.fill.solid()
    sec_card.fill.fore_color.rgb = C_CARD
    sec_card.line.color.rgb = C_SAFFRON
    tf_s = sec_card.text_frame
    tf_s.word_wrap = True
    ps1 = tf_s.paragraphs[0]
    ps1.text = "Website Blueprint (8 Core Sections)"
    ps1.font.name = "Georgia"
    ps1.font.size = Pt(16)
    ps1.font.bold = True
    ps1.font.color.rgb = C_SAFFRON

    sections_list = [
        ("A. Hero Section", "Branding, MNNIT crest, tagline, CTAs, interactive audio player."),
        ("B. About Us", "History, purpose, vision, 4 spiritual-musical pillars, shlokas."),
        ("C. What We Do", "6 interactive discipline cards with photos and highlight tags."),
        ("D. Events & Performances", "Filterable calendar (Upcoming & Celebrated), register modal."),
        ("E. Photo Gallery", "All 20 authentic photos, masonry grid, categories, lightbox."),
        ("F. Show Your Talent (Join)", "Interactive student membership form + WhatsApp group integration."),
        ("G. Coordinators & Contact", "4 student leads, direct phone, WhatsApp chat, campus map."),
        ("H. Admin Control Center", "Secure portal for event CRUD, photo uploads, and CSV exports.")
    ]
    for s_name, s_detail in sections_list:
        p_st = tf_s.add_paragraph()
        p_st.text = f"• {s_name}: {s_detail}"
        p_st.font.size = Pt(10)
        p_st.font.color.rgb = C_CREAM

    # ==========================================
    # SLIDE 4: What We Do (6 Disciplines)
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_bg(s4)
    add_header(s4, "Disciplines & Offerings", "What We Do: Creative & Devotional Arts", "Diverse Expressions of Talent Under One Harmonious Banner")

    disciplines = [
        ("1. Singing & Music", "Classical ragas, semi-classical bhajans, and vocal harmonizing training.", "photo-4.jpg"),
        ("2. Bhajans & Kirtans", "Congregational Harinam Sankirtan with harmonium, mridanga, and kartals.", "photo-15.jpg"),
        ("3. Devotional Celebrations", "Deepotsav with 1000+ diyas, Ram Navami, and Janmashtami Abhishekam.", "photo-1.jpg"),
        ("4. Drama & Theatre", "Stage plays of Ramayana and cultural epics with traditional costumes.", "photo-5.jpg"),
        ("5. Rangoli & Visual Art", "Intricate sacred floor mandalas, floral art, and hand-lettered notice boards.", "photo-13.jpg"),
        ("6. College Fests", "High-energy musical acts at SAC cultural nights and student inductions.", "photo-11.jpg"),
    ]

    for i, (d_title, d_desc, d_img) in enumerate(disciplines):
        col_idx = i % 3
        row_idx = i // 3
        x = Inches(0.8 + col_idx * 3.95)
        y = Inches(2.0 + row_idx * 2.5)

        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.8), Inches(2.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = C_GOLD
        tf = card.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = d_title
        p.font.name = "Georgia"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_GOLD_LT

        p2 = tf.add_paragraph()
        p2.text = d_desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = C_MUTED

        # Thumbnail image
        img_p = os.path.join(gal_dir, d_img)
        if os.path.exists(img_p):
            s4.shapes.add_picture(img_p, x + Inches(0.15), y + Inches(1.15), width=Inches(3.5), height=Inches(1.0))

    # ==========================================
    # SLIDE 5: Major Events & Celebrations
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_bg(s5)
    add_header(s5, "Events & Gatherings", "Major Campus Celebrations & Performances", "Uniting MNNIT Allahabad in Devotion, Unity, and Joy")

    ev_cards = [
        ("Deepotsav Mahotsav", "Seminar Hall Forecourt", "1000+ clay diyas, traditional rangoli, divine Aarti, and soulful Bhajan Sandhya by Anahad Band.", "photo-1.jpg", "Completed"),
        ("Sri Ram Navami Utsav", "Seminar Hall", "Honoring Bhagwan Shri Ram with devotional bhajans, Ramcharitmanas stutis, and art exhibitions.", "photo-9.jpg", "Completed"),
        ("Janmashtami & Abhishekam", "Student Activity Center", "Sacred Vedic snana ceremony with conch shell (Shankha), midnight Harinam kirtan, and Mayur dance.", "photo-18.jpg", "Completed"),
        ("Acoustic Bhajan Sandhya", "Hostel Assembly Hall", "Unplugged evening of devotional acoustic guitar, tabla, harmonium, and soulful group chanting.", "photo-15.jpg", "Upcoming"),
    ]

    for i, (title, venue, desc, img, status) in enumerate(ev_cards):
        x = Inches(0.8 + i * 2.95)
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.0), Inches(2.8), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = C_GOLD if status == "Upcoming" else C_CARD

        # Image
        img_p = os.path.join(gal_dir, img)
        if os.path.exists(img_p):
            s5.shapes.add_picture(img_p, x + Inches(0.15), Inches(2.15), width=Inches(2.5), height=Inches(1.6))

        tf = card.text_frame
        tf.word_wrap = True
        # Spacer
        for _ in range(7):
            tf.add_paragraph()

        p_stat = tf.add_paragraph()
        p_stat.text = f"● {status.upper()}"
        p_stat.font.size = Pt(9.5)
        p_stat.font.bold = True
        p_stat.font.color.rgb = C_EMERALD if status == "Upcoming" else C_SAFFRON

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.name = "Georgia"
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = C_CREAM

        p_v = tf.add_paragraph()
        p_v.text = f"📍 {venue}"
        p_v.font.size = Pt(9)
        p_v.font.color.rgb = C_GOLD_LT

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(9)
        p_d.font.color.rgb = C_MUTED

    # ==========================================
    # SLIDE 6: Photo Gallery Showcase
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_bg(s6)
    add_header(s6, "Sacred Visual Archive", "20 Authentic Photographs Integrated", "Real Glimpses from Anahad Band Performances & Campus Festivities")

    gal_pics = [
        ("photo-1.jpg", "Deepotsav Entrance"),
        ("photo-4.jpg", "Anahad Stage Ensemble"),
        ("photo-6.jpg", "Royal Court Drama"),
        ("photo-10.jpg", "Members in Pranām"),
        ("photo-12.jpg", "Divine Sanctum Altar"),
        ("photo-14.jpg", "Maha Mantra Chorus"),
        ("photo-17.jpg", "Rehearsal Jam Session"),
        ("photo-20.jpg", "Ecstatic Chanting"),
    ]

    for i, (fn, cap) in enumerate(gal_pics):
        col = i % 4
        row = i // 4
        x = Inches(0.8 + col * 2.95)
        y = Inches(2.0 + row * 2.5)

        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(2.8), Inches(2.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = C_GOLD

        img_p = os.path.join(gal_dir, fn)
        if os.path.exists(img_p):
            s6.shapes.add_picture(img_p, x + Inches(0.1), y + Inches(0.1), width=Inches(2.6), height=Inches(1.6))

        tf = card.text_frame
        tf.word_wrap = True
        for _ in range(6):
            tf.add_paragraph()
        p = tf.add_paragraph()
        p.text = cap
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_CREAM
        p.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 7: Show Your Talent (Join Form & Community)
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_bg(s7)
    add_header(s7, "Student Induction", '"Show Your Talent" – Join Anahad Community', "Welcoming Singers, Instrumentalists, Actors, Artists & Devotional Enthusiasts")

    # Left: Form inputs explanation
    form_card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.0), Inches(5.8), Inches(4.9))
    form_card.fill.solid()
    form_card.fill.fore_color.rgb = C_SURFACE
    form_card.line.color.rgb = C_GOLD
    tf_f = form_card.text_frame
    tf_f.word_wrap = True
    pf1 = tf_f.paragraphs[0]
    pf1.text = "Membership Application Form Fields"
    pf1.font.name = "Georgia"
    pf1.font.size = Pt(16)
    pf1.font.bold = True
    pf1.font.color.rgb = C_GOLD_LT

    fields = [
        ("Full Name & Email", "Personal/College email for official correspondence."),
        ("Year of Study & Branch", "1st Year Freshers to PhD scholars (all branches welcome)."),
        ("WhatsApp & Phone Number", "Direct mobile contact for rehearsal & event coordination."),
        ("Skills & Talents", "Multi-select: Vocals, Harmonium, Tabla/Mridanga, Guitar, Flute, Drama/Acting, Rangoli, Sound/Media."),
        ("Why to Join Anahad?", "Expression of student's passion for music, culture, and spirituality."),
        ("Previous Experience", "Past background in musical, theatrical, or spiritual gatherings.")
    ]
    for f_title, f_desc in fields:
        p_ft = tf_f.add_paragraph()
        p_ft.text = f"✔ {f_title}: "
        p_ft.font.size = Pt(10.5)
        p_ft.font.bold = True
        p_ft.font.color.rgb = C_CREAM
        p_ft.font.color.rgb = C_SAFFRON
        p_fd = tf_f.add_paragraph()
        p_fd.text = f"   {f_desc}"
        p_fd.font.size = Pt(9.5)
        p_fd.font.color.rgb = C_MUTED

    # Right: WhatsApp Channel & Community Card
    wa_card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.9), Inches(2.0), Inches(5.6), Inches(4.9))
    wa_card.fill.solid()
    wa_card.fill.fore_color.rgb = C_CARD
    wa_card.line.color.rgb = C_EMERALD
    tf_w = wa_card.text_frame
    tf_w.word_wrap = True
    pw1 = tf_w.paragraphs[0]
    pw1.text = "Direct Community Engagement"
    pw1.font.name = "Georgia"
    pw1.font.size = Pt(16)
    pw1.font.bold = True
    pw1.font.color.rgb = C_EMERALD

    wa_points = [
        ("💬 Official WhatsApp Group", "Direct invitation link: https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif"),
        ("⚡ Real-Time Notifications", "Weekly kirtan timings, rehearsal schedules, and fest participation alerts."),
        ("🎉 Interactive Experience", "Instant celebratory confetti animation upon submitting application."),
        ("💾 Dual-Layer Storage", "Immediate offline persistence via localStorage + Supabase cloud database sync."),
        ("📊 Coordinator Instant Review", "Submissions can be exported directly to CSV for Google Sheets integration.")
    ]
    for w_title, w_desc in wa_points:
        p_wt = tf_w.add_paragraph()
        p_wt.text = w_title
        p_wt.font.size = Pt(11)
        p_wt.font.bold = True
        p_wt.font.color.rgb = C_CREAM
        p_wd = tf_w.add_paragraph()
        p_wd.text = w_desc
        p_wd.font.size = Pt(9.5)
        p_wd.font.color.rgb = C_MUTED

    # ==========================================
    # SLIDE 8: Student Coordinators Directory
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_bg(s8)
    add_header(s8, "Leadership & Contact", "Student Coordinators & Campus Outreach", "Motilal Nehru National Institute of Technology Allahabad")

    coords = [
        ("Arpit Srivastava", "9311694460", "Lead Student Coordinator", "Music & Coordination"),
        ("Subrata Ghosh", "8391842765", "Student Coordinator", "Events & Cultural Outreach"),
        ("Neeraj Sharma", "7852076730", "Student Coordinator", "Spiritual Activities & Logistics"),
        ("Varun Kumar", "9142352216", "Student Coordinator", "Media & Public Relations"),
    ]

    for i, (name, phone, role, badge) in enumerate(coords):
        x = Inches(0.8 + i * 2.95)
        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.0), Inches(2.8), Inches(2.8))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = C_GOLD
        tf = card.text_frame
        tf.word_wrap = True

        p_b = tf.paragraphs[0]
        p_b.text = badge.upper()
        p_b.font.size = Pt(9)
        p_b.font.bold = True
        p_b.font.color.rgb = C_SAFFRON

        p_n = tf.add_paragraph()
        p_n.text = name
        p_n.font.name = "Georgia"
        p_n.font.size = Pt(15)
        p_n.font.bold = True
        p_n.font.color.rgb = C_CREAM

        p_r = tf.add_paragraph()
        p_r.text = role
        p_r.font.size = Pt(10)
        p_r.font.color.rgb = C_GOLD_LT

        p_i = tf.add_paragraph()
        p_i.text = "MNNIT Allahabad"
        p_i.font.size = Pt(9)
        p_i.font.color.rgb = C_MUTED

        p_p = tf.add_paragraph()
        p_p.text = f"📞 +91 {phone}"
        p_p.font.size = Pt(11)
        p_p.font.bold = True
        p_p.font.color.rgb = C_CREAM

        p_w = tf.add_paragraph()
        p_w.text = "💬 WhatsApp Enabled"
        p_w.font.size = Pt(9)
        p_w.font.color.rgb = C_EMERALD

    # Campus Base Details Card
    base_card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.1), Inches(11.7), Inches(1.8))
    base_card.fill.solid()
    base_card.fill.fore_color.rgb = C_CARD
    base_card.line.color.rgb = C_GOLD
    tf_bc = base_card.text_frame
    tf_bc.word_wrap = True
    pbc1 = tf_bc.paragraphs[0]
    pbc1.text = "Official Campus Correspondence & Location"
    pbc1.font.name = "Georgia"
    pbc1.font.size = Pt(14)
    pbc1.font.bold = True
    pbc1.font.color.rgb = C_GOLD_LT

    pbc2 = tf_bc.add_paragraph()
    pbc2.text = "📍 Address: Motilal Nehru National Institute of Technology (MNNIT) Allahabad, Teliarganj, Prayagraj, Uttar Pradesh - 211004, India"
    pbc2.font.size = Pt(10.5)
    pbc2.font.color.rgb = C_CREAM

    pbc3 = tf_bc.add_paragraph()
    pbc3.text = "✉️ Email: anahad.mnnit@gmail.com  |  📸 Instagram: @anahad_mnnit  |  🔗 WhatsApp Community: https://chat.whatsapp.com/HTotuzjgWJOLb6m8bmMyif"
    pbc3.font.size = Pt(10)
    pbc3.font.color.rgb = C_MUTED

    # ==========================================
    # SLIDE 9: Admin Control Center
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_bg(s9)
    add_header(s9, "Governance & Operations", "Admin Control Center & Content Management", "Empowering Student Leads to Manage Content Seamlessly Without Code")

    admin_features = [
        ("🔐 Authentication & Security", "Password-protected admin session (PIN: anahad108). Public site remains strictly read-only for security.", C_SAFFRON),
        ("📅 Event Management", "Add new events, set categories (Festival, Celebration, Kirtan, Drama, Art), update timings, venues, and delete past listings.", C_GOLD),
        ("📸 Gallery Photo Uploads", "Upload fresh event photos directly via file picker or image URL, assign categories, and publish to gallery instantly.", C_GOLD_LT),
        ("📋 Membership Submissions", "Review incoming student applications submitted through the website with 1-click Export to CSV for Excel / Google Sheets.", C_EMERALD),
        ("⚙️ Site Links & Settings", "Update official WhatsApp group URL, coordinator phone numbers, official email, and Google Forms on the fly.", C_CREAM),
    ]

    for i, (a_title, a_desc, a_col) in enumerate(admin_features):
        y = Inches(1.9 + i * 1.0)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(0.88))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = a_col
        tf = card.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = a_title
        p1.font.name = "Georgia"
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = a_col
        p2 = tf.add_paragraph()
        p2.text = a_desc
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = C_MUTED

    # ==========================================
    # SLIDE 10: Tech Stack & Deployment Architecture
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_bg(s10)
    add_header(s10, "Technology & DevOps", "Full-Stack Architecture & Deployment Pipeline", "High-Performance Modern Web Engineering")

    tech_pillars = [
        ("Frontend Stack", [
            "React.js 18 (Component Architecture)",
            "Vite 6 (Sub-second HMR & Rollup)",
            "Tailwind CSS (Vedic Custom Theme)",
            "Lucide React (Sacred & UI Icons)",
            "Canvas Confetti (Celebration FX)"
        ], C_GOLD),
        ("Hosting & DevOps", [
            "Render Static Site Hosting",
            "Auto-deployment on Git push",
            "render.yaml Blueprint included",
            "SPA Redirects (/index.html)",
            "High-speed CDN & free SSL"
        ], C_SAFFRON),
        ("Backend & Data", [
            "Supabase PostgreSQL (Optional)",
            "Row Level Security (RLS) policies",
            "localStorage Dual-Layer sync",
            "Zero breaking dependencies",
            "CSV Application Export engine"
        ], C_EMERALD),
        ("Code Repository", [
            "GitHub Repository configured",
            "Subrataghosh3281/Mnnit-Spiritual-Community",
            "Complete source code pushed",
            "55 committed files & assets",
            "Clean branch tracking"
        ], C_GOLD_LT),
    ]

    for i, (stack_title, stack_items, col) in enumerate(tech_pillars):
        x = Inches(0.8 + i * 2.95)
        card = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.0), Inches(2.8), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = col
        tf = card.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = stack_title
        p_t.font.name = "Georgia"
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        for item in stack_items:
            p_i = tf.add_paragraph()
            p_i.text = f"• {item}"
            p_i.font.size = Pt(9.5)
            p_i.font.color.rgb = C_CREAM

    # Save presentation in project dir & brain dir
    out_path_1 = r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\ANAHAD_BAND_MNNIT_Official_Presentation.pptx"
    out_path_2 = r"C:\Users\USER\.gemini\antigravity\brain\ab932ff0-9793-44e4-ba82-5d4908de880f\ANAHAD_BAND_MNNIT_Official_Presentation.pptx"

    prs.save(out_path_1)
    prs.save(out_path_2)
    print("Presentation saved successfully to:")
    print("1.", out_path_1)
    print("2.", out_path_2)

if __name__ == "__main__":
    create_deck()
