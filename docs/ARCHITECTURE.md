# Architecture

## Stack (current)

| Layer | Choice |
|-------|--------|
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Routing | React Router 7 |
| 3D | Three.js + React Three Fiber + Drei |
| Styles | Tailwind CSS v4 (`@theme` tokens + CSS variables for light/dark) |
| Math in lessons | KaTeX (via remark-math / rehype-katex where MDX used) |
| Lesson bodies | Primarily `lessonPages.tsx` React nodes |
| Backend | **None** (static SPA) |

## High-level layout

```
src/
  app/                 # App.tsx routes, layout (Header/Footer/RootLayout)
  pages/               # Route pages (Home, Learn, LessonReader, Simulate, Glossary, About)
  content/
    curriculum.ts      # Module + page metadata (IDs, titles, order)
    lessonPages.tsx    # Page body content (prose + interactives)
    sources.ts         # Curated external sources
    glossary/terms.ts
    modules.ts         # Older module catalog (may overlap; prefer curriculum.ts)
    modules/*.mdx      # Longer MDX drafts (legacy / deep content; not primary reader)
  sim/                 # Pure orbital/coverage math (no WebGL) — testable
  three/               # R3F scene: Earth, LabCore, CameraRig, rings, markers
  ui/                  # Design-system pieces + lab coach + interactives/
  lib/                 # theme, progress (localStorage), labParams (URL state)
```

## Key systems

### Theme

- `src/lib/theme.tsx` — `ThemeProvider`, `useTheme`, `localStorage` key `starlink-edu:theme`  
- CSS variables on `html[data-theme=light|dark]` in `src/index.css`  
- Default: **light** (white paper, black ink)

### Curriculum reader

- Routes: `/learn/:slug`, `/learn/:slug/:pageId` → `LessonReaderPage`  
- Sidebar: pages in module + jump list of core modules  
- Keyboard: ArrowLeft / ArrowRight between pages  
- Progress: `src/lib/progress.ts` (localStorage)

### Simulation model (`src/sim/`)

| Module | Responsibility |
|--------|----------------|
| `constants.ts` | Earth radius, μ, c, GEO altitude, default lab params |
| `orbit.ts` | Period, speed, light-time |
| `constellation.ts` | Walker-like parametric shell positions |
| `coverage.ts` | Elevation, serving sat, in-view set |
| `handoff.ts` | Serving-sat change tracker |
| `scenarios.ts` | Named lab presets |
| `insights.ts` | Aggregate stats for UI |

**Fidelity policy:** circular Kepler; spherical Earth; geometric min elevation; no drag/J2/RF by default. Document in lab assumptions UI.

### 3D lab (`src/three/` + `SimulatePage`)

- Single sim clock in `LabCore` (sats, link, footprint, ground track, handoffs)  
- `ConstellationScene` composes Earth + LabCore + camera rig  
- URL query params for shareable lab state (`lib/labParams.ts`)  
- Coach: `ui/LabCoach.tsx` · Status: `ui/LabStatusStrip.tsx`

### Interactives (`src/ui/interactives/`)

Quizzes, latency calculator, coverage sandbox, handoff demo, diagrams, mini-sim embed, video embed, etc. Prefer **one interactive per lesson page**.

## Routing map

| Path | Page |
|------|------|
| `/` | Home (photo hero) |
| `/learn` | Curriculum index |
| `/learn/:slug/:pageId` | Lesson reader |
| `/simulate` | Lab |
| `/glossary`, `/glossary/:termId` | Glossary |
| `/about` | About |

## Future: code-alongs

Planned under `/code/*` with **lazy-loaded** in-browser Python runtime. See [CODE_ALONGS.md](./CODE_ALONGS.md). Do not ship Python runtime on the main lesson bundle.

Long-term: parity tests between TS `src/sim` and Python kernels.

## Future: backend

Progress and saved lab states currently local-only. Keep adapters (`loadProgress` / `saveProgress`) swappable without rewriting UI.

## Commands

```bash
npm install
npm run dev
npm run build    # tsc -b && vite build
npm run preview
```

## Constraints for contributors / agents

1. Do not invent proprietary Starlink algorithm details.  
2. Keep conceptual path calm; optional features opt-in.  
3. Prefer pure functions in `sim/` for anything scientific.  
4. Match design tokens (`ink`, `paper`, `line`, `inverse`) — avoid reintroducing old “space neon” as default.  
5. Update docs when changing product decisions or roadmap.
