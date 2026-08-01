# Starlink Edu

Interactive public education site for **Starlink-style LEO satellite constellations**: orbits, mega-constellation design, coverage, handoffs, and a 3D simulation lab.

> Not affiliated with SpaceX. Pedagogical models only — see the lab’s model assumptions.

## Stack

| Layer | Choice |
|-------|--------|
| App | Vite + React 19 + TypeScript |
| Routing | React Router |
| 3D | Three.js + React Three Fiber + Drei |
| Content | MDX (+ remark-math / rehype-katex) |
| Styles | Tailwind CSS v4 |
| Math model | Pure TypeScript in `src/sim/` |

**No backend in v1.** Progress uses `localStorage` (`src/lib/progress.ts`) so a future API can replace the adapter without rewriting the UI.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview production build
```

## Project structure

```
src/
  app/           # App shell, layout, routes
  pages/         # Route-level pages
  content/       # MDX modules + glossary data
  sim/           # Pure orbital / coverage math (no WebGL)
  three/         # R3F scene graph
  ui/            # Shared UI (Advanced, LabButton, panels)
  lib/           # Progress, URL lab params helpers
```

## Learning path (core)

Page-by-page modules (minimal scroll, Next/Previous). Routes: `/learn/:slug/:pageId`.

1. How the Internet Actually Moves Data  
2. Why Ordinary Satellite Internet Felt Slow (GEO)  
3. Low Earth Orbit: Why Closer Changes Everything  
4. Getting Satellites into Orbit & Keeping Them There  
5. What a Constellation Actually Is  
6. Your Terminal Talking to a Fast-Moving Satellite  
7. The Bigger Network: Lasers, Gateways, and Routing  
8. Putting It All Together  

Optional tracks: orbit math, space safety, direct-to-cell.

## UI

- Starlink / Tesla–inspired black & white system (white primary, light default)
- Light / dark mode toggle (persisted)
- Full-bleed photographic landing page
- Lesson reader: sidebar outline + module jump menu + sticky next page

Curriculum structure: `src/content/curriculum.ts` + `src/content/lessonPages.tsx`  
Interactives: `src/ui/interactives/`  
Sources: `src/content/sources.ts`  

## License

Educational project — license TBD.
