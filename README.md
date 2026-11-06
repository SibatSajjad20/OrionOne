# Orion One — Web Application

> **Where the Lake Meets Living** — A signature luxury lakefront development in DHA Phase III, Islamabad by **SP Builders**.

---

## Technical Stack

- **Framework**: Next.js 16 (App Router, Turbopack, standalone output)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4, custom brand CSS variables
- **Motion & Smooth Scroll**: Lenis 1.3, GSAP 3.15 (ScrollTrigger)
- **3D Interactive Islands**: Three.js (dynamic client islands with SSR disabled)
- **Deployment Platform**: Hostinger Node.js Web Apps (or any standard Node.js 20/22 runtime)

---

## Local Development & Smoke Test

### 1. Installation
```bash
npm ci
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Smoke Test
To verify production build and runtime parity locally:
```bash
npm run build
npm run start
```
Or test the standalone Node.js server directly:
```bash
node .next/standalone/server.js
```

---

## Hostinger Node.js Web App Deployment

When setting up or verifying the web application in **Hostinger hPanel**:

| Setting | Value |
|---|---|
| **Application Type** | `Next.js` |
| **Node.js Version** | `20.x` or `22.x` (LTS) |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` (or `node .next/standalone/server.js`) |
| **Output Directory** | `.next` (Hostinger wraps standalone) |
| **Deployment Branch** | `fix/hostinger-ready-and-home-perf` (or merged `main`) |

### Environment Variables (hPanel)

Configure the following under **Environment Variables** in hPanel:

| Variable | Recommended Value | Purpose |
|---|---|---|
| `NODE_ENV` | `production` | Enables production optimizations and disables dev toolbars |
| `PORT` | Auto-assigned | Port managed by Hostinger reverse proxy |
| `NEXT_PUBLIC_ENABLE_AGENTATION` | `false` | Ensures dev feedback toolbar is inactive |

---

## Brand Integrity Rules

- **Brand Colors**: Moss (`#153D3D`), Sand (`#EDE5DA`), Mint (`#62AA9E`), Stone (`#808080`), Martian (`#B2CE93`).
- **Typography**: Luxia Display (Headings), Luxia Regular (Editorial/Subheadings), Montserrat (Body/UI).
- **Logo**: Do NOT rotate, skew, or recolor the white signature logos.
