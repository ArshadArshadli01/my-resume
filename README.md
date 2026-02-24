# 📄 My Resume — Portfolio & PDF Generator

A modern, one-page portfolio website with a built-in PDF resume generator, JSON upload editor, and PWA support. Built with **Next.js 16**, **React 19**, **Once UI**, and **@react-pdf/renderer**.

---

## ✨ Features

- **Portfolio Website** — Personal landing page driven by `resume-site-data.json`
- **PDF Resume** — Auto-generated at `/resume` via `@react-pdf/renderer`
- **PDF Generator** — Upload `resume-pdf-data.json` at `/upload`, toggle sections, and generate a PDF in a new tab at `/resume/generate`
- **Dynamic Manifest** — PWA manifest generated from `.env` at build time
- **Dark Mode** — System / manual toggle via Once UI
- **Docker Ready** — Standalone output with Dockerfile included

---

## 🚀 Quick Start (0 → Running)

### Prerequisites

| Tool | Version |
|------|---------|
| **Node.js** | 20.17+ |
| **npm** | 10+ |

### 1. Clone the repo

```bash
git clone https://github.com/ArshadArshadli01/my-resume.git
cd my-resume
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example and adjust values:

```bash
cp .env.example .env
```

Or create `.env` manually — see [Environment Variables](#-environment-variables) below.

### 4. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Production Build

### Option A — Static / Node.js

```bash
npm run build
npm start
```

### Option B — Docker

```bash
docker compose up -d --build
```

The included `Dockerfile` uses Next.js standalone output. The `docker-compose.yaml` maps port **3000**.

---

## 📂 Project Structure

```
my-resume/
├── public/                    # Static assets (icons, images, sample JSON)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home / About page
│   │   ├── manifest.ts        # Dynamic PWA manifest (from .env)
│   │   ├── resume/
│   │   │   ├── page.tsx       # PDF resume (from static resume-pdf-data.json)
│   │   │   └── generate/
│   │   │       └── page.tsx   # PDF generator (from uploaded JSON via sessionStorage)
│   │   ├── upload/
│   │   │   └── page.tsx       # JSON upload editor + PDF generator
│   │   └── api/               # API routes (OG image generation)
│   ├── components/
│   │   ├── pdf/               # @react-pdf/renderer components
│   │   │   └── resume/        # Heading, Section, Experience, Education, etc.
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── resources/
│   │   ├── resume-site-data.json  # ✏️ Website data source
│   │   ├── resume-pdf-data.json   # ✏️ PDF data source
│   │   ├── content.tsx            # Maps site JSON → typed content
│   │   ├── once-ui.config.ts      # UI theme & effects
│   │   └── icons.ts               # Icon registry
│   └── types/                 # TypeScript type definitions
├── .env                       # Environment variables
├── .env.example               # Template for .env
├── Dockerfile                 # Production Docker image
├── docker-compose.yaml
└── package.json
```

---

## 📑 Data Files

The resume data is split into two purpose-specific JSON files:

| File | Used By | Purpose |
|------|---------|---------|
| `resume-site-data.json` | Website (`/`) | Controls all content on the portfolio page. Each section has a `show` flag. |
| `resume-pdf-data.json` | PDF (`/resume`) & Upload (`/upload`) | Flat structure matching the PDF renderer. Each section has a `show` flag. The `person.avatar` field accepts a URL. |

### Editing Your Resume

1. **Website** — Edit `src/resources/resume-site-data.json`
2. **PDF** — Edit `src/resources/resume-pdf-data.json`
3. **Via UI** — Go to `/upload`, download the **sample JSON** for reference, upload your JSON, toggle sections on/off, then:
   - Click **🚀 Generate PDF** to open the PDF in a new tab
   - Click **⬇ Download JSON** to save your modified JSON

---

## 🔧 Environment Variables

All public variables are prefixed with `NEXT_PUBLIC_` and are safe to embed in client bundles.

### Personal Info

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_FIRST_NAME` | `Arshad` | First name |
| `NEXT_PUBLIC_LAST_NAME` | `Arshadli` | Last name |
| `NEXT_PUBLIC_ROLE` | `Backend Developer` | Job title |
| `NEXT_PUBLIC_LOCATION` | `Baku, Azerbaijan` | Location |
| `NEXT_PUBLIC_TIMEZONE` | `Asia/Baku` | IANA timezone |
| `NEXT_PUBLIC_EMAIL` | `arshad.arshadli02@gmail.com` | Primary email |
| `NEXT_PUBLIC_EMAIL_WORK` | `work@arshadli.me` | Work email |
| `NEXT_PUBLIC_PHONE` | `+994 55 656 03 07` | Phone |

### Social Links

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GITHUB` | GitHub profile URL |
| `NEXT_PUBLIC_LINKEDIN` | LinkedIn profile URL |

### Site & PWA

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_BASE_URL` | `https://arshadli.me` | Canonical base URL |
| `NEXT_PUBLIC_SITE_TITLE` | `Arshad Arshadli Portfolio` | `<title>` tag |
| `NEXT_PUBLIC_THEME_COLOR` | `#17161b` | PWA theme + bg color |
| `NEXT_PUBLIC_MANIFEST_NAME` | `Arshad Arshadli CV` | PWA manifest `name` |
| `NEXT_PUBLIC_MANIFEST_SHORT_NAME` | `AA CV` | PWA manifest `short_name` |
| `NEXT_PUBLIC_MANIFEST_DISPLAY` | `standalone` | PWA display mode |

---

## 🧭 Routes

| Route | Description |
|-------|-------------|
| `/` | Portfolio home page |
| `/resume` | PDF resume viewer (static, from `resume-pdf-data.json`) |
| `/upload` | Upload JSON → preview sections → generate PDF |
| `/resume/generate` | PDF viewer for uploaded data (reads from `sessionStorage`) |

---

## 🧰 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run biome-write` | Format code with Biome |
| `npm run lint` | Run ESLint |

---

## 📄 License

MIT — see [LICENSE](./LICENSE).