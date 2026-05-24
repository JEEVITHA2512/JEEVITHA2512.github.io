# AGENT.md — Jeevitha Murugan Portfolio

This file documents all the work done by the Replit AI Agent to build and deploy this portfolio website.

---

## Project Overview

A pixel-perfect portfolio website cloned from [someshbagadiya.dev](https://www.someshbagadiya.dev/) and fully rebuilt with Jeevitha Murugan's professional profile.

**Live Preview:** Hosted on Replit  
**Repository:** https://github.com/Shreesh-Sree/Jeevitha-Portfolio  

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | Wouter |
| State/Data | TanStack React Query |
| Language | TypeScript |
| Package Manager | pnpm (monorepo) |
| Backend | Express 5 (Node.js) |

---

## Work Done

### 1. Project Scaffolding
- Set up a **pnpm monorepo** workspace with TypeScript project references
- Bootstrapped a `react-vite` artifact at `artifacts/portfolio/` using Replit's artifact system
- Configured Vite with path aliases (`@/`), host binding (`0.0.0.0`), and base URL support for Replit's proxy routing
- Registered the portfolio artifact at preview path `/` so it loads at the root URL

### 2. Portfolio Clone — Design & Layout
- Cloned the visual design of [someshbagadiya.dev](https://www.someshbagadiya.dev/) including:
  - Subtle **grid background** pattern (CSS `background-image` linear gradients)
  - **Sticky navbar** with scroll-spy active link detection and red underline indicator
  - **Dark mode toggle** (moon/sun icon) with full light/dark theme support
  - **Gradient profile photo** frame (pink → red → orange gradient ring)
  - **Card-based layout** with hover shadows and lift transitions
  - Inter font via Google Fonts
  - Responsive design for mobile, tablet, and desktop

### 3. CSS Theme System
- Replaced all placeholder `red` color values in `index.css` with proper HSL design tokens
- Configured CSS custom properties for light and dark mode:
  - `--background`, `--foreground`, `--card`, `--border`, `--primary`, `--secondary`, `--muted`, etc.
  - **Primary color:** `hsl(0 84% 60%)` — red (`#EF4444`) for name highlights and accents
  - **Secondary color:** `hsl(217 91% 60%)` — blue (`#3B82F6`) for CTA buttons
  - **Background:** `hsl(210 20% 98%)` — light gray (`#F9FAFB`)
  - Dark mode with `hsl(215 28% 11%)` dark background

### 4. Navbar Component (`Navbar.tsx`)
- Fixed top navigation with backdrop blur on scroll
- **JM** logo badge (dark square, rounded) linking to top
- Nav links: About, Experience, Education, Projects, Publications, Contact
- Active section tracking via scroll position (`IntersectionObserver`-style logic)
- Red underline indicator on active link
- Mobile hamburger menu with slide-down overlay
- Dark mode toggle button

### 5. About Section (`About.tsx`)
- **Hero text:** "Hi, I'm / Jeevitha Murugan" with name in red, subtitle in gray
- Tagline: "Engineering the Future with Generative AI & Data | AWS Community Builder (AI) | GenAI Engineer @ BigTapp"
- **Stats cards:** 2+ Years Experience · 450+ Students Mentored
- **About Me card** with green "Ask AI anything" badge, bio text, and Key Technologies pills
- Key technologies: Python, TensorFlow, PyTorch, LangChain, Rasa, MLflow, Azure, AWS, Hugging Face, Agentic AI, Apache Spark, CrewAI, FastAPI, Streamlit
- Navigation arrows and "About" page indicator
- **Right panel:** JM initials avatar with violet/purple gradient inside a pink-orange gradient ring
- "Driven by *curiosity*, empowered by *resilience*." tagline with colored italic text
- GitHub, LinkedIn, and Email icon links with correct URLs

### 6. Experience Section (`Experience.tsx`)
- Vertical timeline layout with primary-colored connector line and dot markers
- **4 roles documented:**
  1. **BigTapp Analytics** — Generative AI & Data Science Engineer (June 2025 – Present)
  2. **Blackstraw** — Software Engineer Intern (Sep 2024 – Jun 2025)
     - Agentic AI multi-agent pipelines with CrewAI + OpenLit
     - Microsoft Fabric Analytics pipeline + Power BI dashboards (60% reduction in manual analysis)
     - Azure Bot telemetry analysis with KQL
  3. **Lifease Solutions LLP** — Intern Data Scientist (Jul 2023 – Oct 2023)
     - Audio preprocessing with Librosa, MFCC, STFT, Mel-spectrograms
     - CNN, Bi-LSTM, AutoEncoder models for audio denoising
     - Audo AI API integration; TTS/STT R&D; PyQt GUI tools
  4. **Tactii (formerly TalentAccurate)** — Developer Intern (Jan 2022 – Oct 2022)
     - Rasa + SpaCy NLU chatbot pipelines
     - Flask APIs + Streamlit dashboards with explainable sentiment analysis
     - ClickHouse schema for session logging and performance monitoring
- Bullet-point highlights per role using `ChevronRight` icons
- Skill tag chips per role

### 7. Education Section (`Education.tsx`)
- **Education cards:**
  - BTech in Artificial Intelligence and Data Science — St. Joseph's College Of Engineering (Nov 2021 – May 2025)
  - 12th — St. Johns Sr. Sec. School & Junior College (2006–2021)
- **Certifications grid (6 cards):**
  - AWS Certified AI Practitioner
  - Microsoft Azure AI Engineer Associate
  - Microsoft Fabric Analytics Associate
  - Databricks Certified Data Engineer Associate
  - IBM Data Science Professional Certificate
  - Google Cybersecurity Certificate
- **Honors & Awards grid (5 cards):**
  - 2nd Runner up — Cosmic Innovation Challenge (Microgravity Track)
  - Winner — UI Path Hack-a-bot
  - 3rd Place — Hack-a-Cloud
  - Winner — Case Study Competition
  - SIH Finalist

### 8. Projects Section (`Projects.tsx`)
- 3-column responsive card grid with hover lift + shadow effects
- **6 project cards** based on actual work:
  1. Multi-Agent Code Migration Pipeline (CrewAI, OpenLit)
  2. Fabric Analytics Sales Dashboard (Microsoft Fabric, Power BI)
  3. Audio Denoising Deep Learning Models (CNN, Bi-LSTM, AutoEncoder)
  4. Domain-Specific NLU Chatbot (Rasa, SpaCy)
  5. Smart Sprinkler System — *Patent* (ML + IoT)
  6. Multilingual Audio to Braille Translator — *Patent* (AI + Cloud)
- GitHub and external link icons per card
- Tech stack tags in monospace font

### 9. Publications Section (`Publications.tsx`)
- **2 Research Papers:**
  - "Data-driven Machine Learning Models for Risk Stratification and Prediction of Emergence Delirium in Pediatric Patients Underwent Tonsillectomy/Adenotonsillectomy"
  - "Payday Loans — Blessing or Growth Suppressor? Machine Learning Analysis"
- **2 Patents (separate subsection):**
  - Smart Sprinkler System: Leveraging Machine Learning and IoT for Heat Mapping
  - Multilingual Audio to Braille Translator System Incorporating AI Transcription and Cloud Computing
- "Read More Articles" CTA button (blue)
- Lightbulb icon for patents, BookOpen icon for papers

### 10. Contact Section (`Contact.tsx`)
- Left panel: email (`jeevithamurugan.2512@gmail.com`), location (Chennai, Tamil Nadu, India), social icon links
- AWS Community Builder callout card
- Right panel: contact form (Name, Email, Message) with validation
- Submit handler with loading state

### 11. Theme Toggle (`ThemeToggle.tsx`)
- Moon/Sun icon toggle
- Persists dark/light class on `<html>` element
- Smooth CSS transition on all color tokens

### 12. GitHub Push
- Used the **GitHub REST API** (no git CLI) to push all 79 source files to the repository
- Authenticated via `GITHUB_PAT` secret stored in Replit Secrets
- Created blobs, built a Git tree, made a commit, and updated the `main` branch ref
- Repository: https://github.com/Shreesh-Sree/Jeevitha-Portfolio

---

## File Structure

```
artifacts/portfolio/
├── index.html                    # Vite entry HTML
├── package.json                  # Dependencies (React, Tailwind, Framer Motion, etc.)
├── vite.config.ts                # Vite config with path aliases and host binding
├── tsconfig.json                 # TypeScript config
├── components.json               # shadcn/ui config
├── public/
│   ├── favicon.svg
│   └── opengraph.jpg
└── src/
    ├── App.tsx                   # Root app with router + providers
    ├── main.tsx                  # React DOM entry point
    ├── index.css                 # Global styles, CSS theme tokens, grid background
    ├── pages/
    │   ├── Home.tsx              # Main page — mounts all sections
    │   └── not-found.tsx         # 404 page
    ├── components/
    │   ├── Navbar.tsx            # Sticky nav with scroll-spy & dark mode toggle
    │   ├── ThemeToggle.tsx       # Dark/light mode button
    │   └── sections/
    │       ├── About.tsx         # Hero, stats, bio, tech skills, profile avatar
    │       ├── Experience.tsx    # Timeline of 4 work roles
    │       ├── Education.tsx     # Degrees, 6 certifications, 5 awards
    │       ├── Projects.tsx      # 6 project cards
    │       ├── Publications.tsx  # 2 papers + 2 patents
    │       └── Contact.tsx       # Contact form + social links
    ├── components/ui/            # shadcn/ui component library (40+ components)
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    └── lib/
        └── utils.ts              # cn() utility for class merging
```

---

## Key Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "tailwindcss": "^4",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "wouter": "latest",
  "@tanstack/react-query": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

---

## How to Run Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm --filter @workspace/portfolio run dev

# Build for production
pnpm --filter @workspace/portfolio run build
```

---

*Generated by Replit Agent — May 2026*
