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

## Learning path (v1)

1. Why LEO? Starlink in context  
2. Orbits without fear  
3. Designing a mega-constellation  
4. Beams & handoffs  
5. What makes it special  

## License

Educational project — license TBD.
