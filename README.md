# Starlink Edu

Interactive public education site for **Starlink-style LEO satellite constellations**: calm page-by-page lessons, a guided 3D constellation lab, and (planned) optional Python code-alongs.

> **Not affiliated with SpaceX or Starlink.** Pedagogical models only — see the lab’s model assumptions.

## Documentation

**Start with the docs** — product intent, curriculum, roadmap, and architecture for humans and coding agents:

| Doc | Description |
|-----|-------------|
| [docs/README.md](docs/README.md) | Docs index |
| [docs/PRODUCT.md](docs/PRODUCT.md) | Vision, audience, principles |
| [docs/CURRICULUM.md](docs/CURRICULUM.md) | Learning path & pedagogy |
| [docs/CODE_ALONGS.md](docs/CODE_ALONGS.md) | Optional Python code-along plan |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phased roadmap |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack & repo map |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Locked decisions |
| [AGENTS.md](AGENTS.md) | Guidance for AI coding agents |

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview production build
```

## Stack

| Layer | Choice |
|-------|--------|
| App | Vite + React 19 + TypeScript |
| Routing | React Router |
| 3D | Three.js + React Three Fiber + Drei |
| Styles | Tailwind CSS v4 (black/white theme, light default) |
| Math model | Pure TypeScript in `src/sim/` |
| Backend | None (static SPA; progress in `localStorage`) |

## Project structure

```
src/
  app/           # Routes, layout
  pages/         # Home, Learn, Lesson reader, Lab, Glossary, About
  content/       # Curriculum metadata, lesson pages, sources, glossary
  sim/           # Pure orbital / coverage math (no WebGL)
  three/         # R3F constellation scene
  ui/            # Design system, lab coach, interactives
  lib/           # Theme, progress, lab URL params
docs/            # Product & engineering documentation
```

## Learning path (core)

Page-by-page modules. Routes: `/learn/:slug/:pageId`.

1. How the Internet Actually Moves Data  
2. Why Ordinary Satellite Internet Felt Slow (GEO)  
3. Low Earth Orbit: Why Closer Changes Everything  
4. Getting Satellites into Orbit & Keeping Them There  
5. What a Constellation Actually Is  
6. Your Terminal Talking to a Fast-Moving Satellite  
7. The Bigger Network: Lasers, Gateways, and Routing  
8. Putting It All Together  

Optional tracks: orbit math, space safety, direct-to-cell.  
Planned: optional in-browser Python code-alongs (see [docs/CODE_ALONGS.md](docs/CODE_ALONGS.md)).

## Product stance (summary)

- **Main path:** conceptual, calm, page-sized lessons + quizzes + lab moments.  
- **Lab:** powerful 3D sim with coach, status strip, and experiments.  
- **Code:** optional ~15 min Python re-expressions of the same models; rare deeper projects.  
- **Trust:** public sources, explicit assumptions, no proprietary reverse-engineering.

## License

Educational project — license TBD.
