# ORION ONE — DESIGN & ARCHITECTURE SPECIFICATION (`DESIGN.md`)

> **MANDATORY DIRECTIVE FOR ALL AGENTS & DEVELOPERS:**
> This document is the single source of truth for the Orion One brand, aesthetic, typography, color palette, copywriting tone, and technical design architecture.
> **Follow these guidelines strictly on EVERY new page, section, or component.**
> **ABSOLUTELY NO AI-SLOP DESIGN.** No generic purple/blue gradients, no cookie-cutter SaaS layouts, no stock-sounding marketing copy, and no unapproved colors or fonts. Every pixel must feel grounded, unhurried, and architecturally deliberate.

---

## 1. Brand Identity & Pillars

- **Project Name:** Orion One
- **Developer:** SP Builders
- **Location:** Sector F, DHA Phase III, Islamabad (Beside Lakeview Commercial & Dancing Fountains)
- **Official Tagline:** *"Where the Lake Meets Living."*
- **Brand Essence:** A landmark lakefront destination in Islamabad redefining modern living through residences, commercial terraces, wellness, and hospitality.
- **Reference Register:** Aman's stillness, Apple's confidence-through-simplicity, Porsche's precision, Foster + Partners' architectural intelligence, Four Seasons Private Residences' warmth without excess.

### The 4 Core Brand Pillars
Every section, message, visual, and UI card must trace back to one of these four pillars:
1. **Lakefront (Water at the Core):** Open water, walking edges, shoreline promenade, and uninterrupted horizon views.
2. **Wellness (Movement & Recovery):** Serenity, landscaped trails, spa, steam & sauna, double-height gym, and indoor/outdoor jogging tracks.
3. **Community (Vibrant Gathering):** Open-air dining terraces, retail arcade, coffee culture, and social spaces connecting residents and visitors.
4. **Luxury (Architectural Restraint):** Organic fluid curves, material honesty, and quiet authority. Never ostentatious or loud.

---

## 2. Color Palette & Usage Ratios

Strictly adhere to the brand distribution ratio:
$$\text{Moss Green (55\%)} \quad\cdot\quad \text{Sand Beige (20\%)} \quad\cdot\quad \text{Mint Green (15\%)} \quad\cdot\quad \text{Stone Grey (10\%)} \quad\cdot\quad \text{Martian Green (Accent)}$$

| Role | Name | Hex Code | Tailwind Token | CSS / Usage Guide |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas / Primary BG** | Moss Green | `#153D3D` | `bg-[#153D3D]`, `--color-moss` | Primary page & canvas background anchor |
| **Deep Surface / Cards** | Moss Dark | `#0d2828` | `bg-[#0d2828]`, `--color-moss-dark` | Footer, drawers, card containers, inputs |
| **Deepest Abyssal** | Moss Deep | `#081a1a` | `bg-[#081a1a]`, `--color-moss-deep` | Backdrop overlays, scrollbar track |
| **Primary Typography** | Sand Beige | `#EDE5DA` | `text-[#EDE5DA]`, `--color-sand` | Headlines, primary text, subtle borders |
| **Muted Editorial** | Sand Muted | `#C9BFB1` | `text-[#C9BFB1]`, `--color-sand-muted` | Secondary body text, gradient fallbacks |
| **Primary Accent / Vitality** | Mint Green | `#62AA9E` | `text-[#62AA9E]`, `bg-[#62AA9E]` | CTAs, active states, key icons, badges |
| **Hover / Accent Light** | Mint Light | `#7EC1B6` | `hover:bg-[#7EC1B6]` | Interactive hover highlights |
| **Landscape Accent** | Martian Green | `#B2CE93` | `text-[#B2CE93]`, `--color-martian` | Botanical, landscape & nature highlights |
| **Subdued Neutral** | Stone Grey | `#808080` | `text-[#808080]`, `--color-stone` | Captions, timestamps, disabled/muted meta |

### Ambient Surfaces & Utility Classes (from `globals.css`)
- **Page Ambient Radial Gradient:**  
  `background: radial-gradient(circle at 50% 0%, #1c4e4e 0%, #153D3D 45%, #0a1e1e 100%) fixed;`
- **Text Sand Gradient:** `.text-sand-gradient`  
  `linear-gradient(135deg, #FFFFFF 0%, #EDE5DA 50%, #C9BFB1 100%)` with text clipping.
- **Text Mint Gradient:** `.text-mint-gradient`  
  `linear-gradient(135deg, #9fe0d6 0%, #62AA9E 60%, #153D3D 100%)` with text clipping.
- **Glass Moss Bar:** `.glass-moss`  
  `background: rgba(21, 61, 61, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(237, 229, 218, 0.12);`
- **Glass Moss Card:** `.glass-moss-card`  
  `radial-gradient(circle at top left, rgba(39, 110, 112, 0.45), rgba(13, 40, 40, 0.75)); backdrop-filter: blur(20px); border: 1px solid rgba(98, 170, 158, 0.25); box-shadow: 0 20px 50px rgba(5, 18, 18, 0.7);`
- **Glow Borders:** `.border-mint-glow` (`border: 1px solid rgba(98, 170, 158, 0.4); box-shadow: 0 0 24px rgba(98, 170, 158, 0.2);`) and `.border-sand-subtle` (`border: 1px solid rgba(237, 229, 218, 0.15);`).

---

## 3. Typography System

The site uses a strict two-font system. Never introduce a third font.

### Font Families
1. **Luxia (Serif Display)** — `--font-luxia` / `font-serif-heading`
   - **Usage:** All H1 & H2 section headlines, editorial pull-quotes, large chapter numbers, prominent titles.
   - **Weight:** Regular (400).
   - **Letter-spacing:** `-0.01em` (compact, refined editorial poise).
   - **Editorial Quotes:** `font-editorial-quote` (`font-serif italic`).
2. **Montserrat (Grotesque Sans-Serif)** — `--font-montserrat` / `font-sans-body`
   - **Usage:** Body copy, navigational items, form inputs, captions, numeric counters, badges, and CTAs.
   - **Weights:** 300 (Light for body copy), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).

### Typographic Hierarchy & Specifications
- **Eyebrow / Super-title:**  
  `text-[10px]` or `text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#62AA9E] font-semibold font-sans-body`
- **Display / Hero H1:**  
  `font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE5DA] tracking-tight leading-[1.08]`
- **Section Heading H2:**  
  `font-serif-heading text-2xl sm:text-4xl lg:text-5xl font-light text-[#EDE5DA] tracking-tight`
- **Section Sub-Heading / Lead Body:**  
  `font-sans-body text-sm sm:text-base text-[#EDE5DA]/90 font-light leading-relaxed max-w-2xl`
- **Body Paragraphs:**  
  `font-sans-body text-xs sm:text-sm text-[#EDE5DA]/80 font-light leading-relaxed`
- **Chapter / Ordinal Markers:**  
  `font-sans-body text-[10px] sm:text-xs tracking-[0.3em] text-[#62AA9E] uppercase font-semibold` (e.g. `01. ARCHITECTURE`)
- **Button / Action Copy:**  
  `font-sans-body text-[11px] font-bold uppercase tracking-[0.2em]`

---

## 4. Iconography & Mark Rules

- **Icon Library:** `lucide-react` line icons exclusively.
- **Stroke & Style:** Single-weight line style. `1.5pt` stroke weight scaled proportionally. Rounded caps and joins.
- **Fill Rule:** **OUTLINE STYLE ONLY. NO SOLID FILLS.**
- **Icon Colors:** Mint Green (`#62AA9E`) on dark moss surfaces; Sand Beige (`#EDE5DA`) or White for secondary navigation.
- **Primary Logo:** Sun-over-water horizon icon + serif wordmark (`/new-logo.png`).
  - Minimum clear space: equal to icon height $x$ on all four sides.
  - Digital minimum height: `24px` for standalone icon, `40px` (`h-10`) for full lock-up.
- **Logo Misuse (Strict Prohibition):**
  - Do NOT distort, squish, or stretch.
  - Do NOT rotate or alter angle.
  - Do NOT recolor off-palette (e.g. no random blues, reds, or yellows).
  - Do NOT place inside clumsy containers, heavy shadows, or boxed badges.

---

## 5. Copywriting & Tone Standards (Content Bible)

### The Anti-Buzzword Filter (BANNED WORDS)
We never sound like a generic developer brochure or an AI text generator.
| Never Say (Banned AI / Real Estate Clichés) | What We Say Instead (Restrained & Sensory) |
| :--- | :--- |
| "Luxury apartments" | "Residences overlooking the water" / "Lakefront living" |
| "Book now" / "Buy today" | "Book a Private Tour" / "Register Interest" |
| "Best investment opportunity" | "A rare position on a finite shoreline" |
| "World-class amenities" | "Spaces built around movement, quiet, and recovery" |
| "State-of-the-art" | "Intelligently considered finishes and engineering" |
| "Dream home" / "Once in a lifetime" | "A home for people who know what they will not compromise on" |
| "Unlock modern living" / "Welcome to Orion" | "Where the City Meets the Water" |

### Copywriting Rules
1. **Moments over features:** Describe the experience of light, water, and atmosphere rather than listing raw specs.
2. **Restraint builds prestige:** Let the reader arrive at "luxury" themselves. Never use the word "luxury" gratuitously.
3. **Pacing:** Sentences should feel calm, measured, and unhurried. Avoid hype, exclamation marks, or aggressive sales jargon.

---

## 6. Layout, Component & Technical Architecture

### Tech Stack Conventions
- **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4** (`@theme` variables in `globals.css`).
- **Smooth Scroll:** Handled globally by `Lenis` via `SmoothScroll.tsx`. Native `scroll-behavior: smooth` is disabled in CSS to prevent conflicting jitter.
- **Animation Standard:** GSAP 3 with `ScrollTrigger` plugin for scrubbed sequences; Framer Motion for discrete interactive UI transitions.
- **Viewport & Hydration:** Standard root layout utilizes `suppressHydrationWarning` on `<html>` and `<head>` with programmatic scroll restoration.

### Component Structure Checklist for New Pages
Every new page or section must follow these structural standards:

1. **Page Container:**
   ```tsx
   <div className="relative min-h-screen bg-[#153D3D] text-[#EDE5DA] overflow-x-hidden selection:bg-[#62AA9E] selection:text-[#153D3D]">
   ```
2. **Navigation Header (`Header.tsx`):**
   - Use the fixed glass-morphism header (`bg-[#153D3D]/80 backdrop-blur-xl border-b border-[#EDE5DA]/10`).
   - Include direct WhatsApp concierge desk link (`+923009079164`) and "Book a Tour" drawer trigger.
3. **Form & Inquiry Drawer (`InquiryDrawer.tsx`):**
   - Dark moss theme (`bg-[#153D3D] border-l border-[#EDE5DA]/15`).
   - Fields: Full Name, Phone / WhatsApp, Interest Type (`Residences`, `Commercial Space`, `Investment`), Preferred Timing.
   - Discrete focus states: `focus:border-[#62AA9E]`.
4. **Footer Anchor (`Footer.tsx`):**
   - Grounded dark moss block (`bg-[#0d2828] border-t border-[#EDE5DA]/15`).
   - Ambient top accent glow: `bg-gradient-to-r from-transparent via-[#62AA9E]/40 to-transparent`.
   - Show Suite & Headquarters Address:  
     *4th Floor, District 101, Business District, Bahria Town (Phase VIII), Rawalpindi / Islamabad.*
   - Contact: `+92 300 9079 164` | `info@orionone.com.pk`.
   - Show Suite Hours: `Open Daily · 10AM – 7PM`.

---

## 7. The Anti-AI-Slop Manifesto (Strict Prohibitions)

1. **NO Generic UI Grids:** Do not create standard 3-box SaaS feature cards with generic rounded icons floating in colorful squares.
2. **NO Unbranded Colors:** Do not use Tailwind default purples (`indigo-*`, `violet-*`), blues (`sky-*`, `blue-*`), or stark zinc grays. All neutrals must have warm Sand (`#EDE5DA`) or Stone (`#808080`) undertones.
3. **NO Generic Illustrations:** Never use stock vectors, cartoon avatars, or generic isometric 3D mockups.
4. **NO Bouncy Spring Physics:** Motion must be cinematic and weighted (duration: 500ms–800ms, smooth cubic ease, no cartoonish rubber-banding).
5. **NO Wall-of-Text Blocks:** Use airy whitespace, generous line heights (`leading-relaxed`), and prominent typography with clear hierarchy.

---

## 8. Checklist for Building Any New Page or Section

Before deploying or finalizing any new page, verify every item:
- [ ] **Background:** Uses `#153D3D` or `#0d2828` with subtle ambient radial vignette.
- [ ] **Typography:** All major headlines use `var(--font-luxia)` (`font-serif-heading`); all body/UI uses `var(--font-montserrat)` (`font-sans-body`).
- [ ] **Letter Spacing:** Eyebrows and labels have `tracking-[0.25em]` to `tracking-[0.35em] uppercase`.
- [ ] **Palette Ratios:** Dominant 55% Moss Green, 20% Sand Beige, 15% Mint Green, 10% Stone Grey.
- [ ] **Copy Review:** Checked against the banned words list; tone is unhurried, architectural, and restrained.
- [ ] **Icons:** Only single-weight line icons from `lucide-react` with outline styling.
- [ ] **Responsive Design:** Mobile menu, touch targets (minimum 44px for buttons), no horizontal overflow.
- [ ] **Components:** Integrates properly with `Header`, `Footer`, and `InquiryDrawer`.
