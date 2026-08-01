# Architecture

## Stack

Vite · React 19 · TypeScript · React Router · R3F/Drei · Tailwind v4 · no backend.

```bash
npm run dev | build | preview
```

## Layout

```
src/app/        routes, layout
src/pages/      Home, Learn, LessonReader, Simulate, Glossary, About
src/content/    curriculum.ts, lessonPages.tsx, sources.ts, glossary/
src/sim/        pure orbital/coverage math (no WebGL)
src/three/      R3F scene (LabCore owns sim clock)
src/ui/         chrome, LabCoach, interactives/
src/lib/        theme, progress, labParams
```

## Conventions

| Area | Notes |
|------|--------|
| Theme | CSS vars + `lib/theme.tsx`; tokens `ink` / `paper` / `line` / `inverse` |
| Lessons | `/learn/:slug/:pageId` → `LessonReaderPage` |
| Lab state | URL query via `labParams.ts` |
| Sim fidelity | Circular Kepler, geometric elevation, parametric shells |
| Progress | `localStorage` (`progress.ts`); keep swappable |
| Science code | Prefer pure functions in `sim/` |

Future code-alongs: lazy `/code/*` only—don’t load Python on lesson routes.
