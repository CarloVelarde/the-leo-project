# Architecture

## Stack

Vite · React 19 · TypeScript · React Router · R3F/Drei · Tailwind v4 · no backend · Vitest.

```bash
npm run dev | build | preview | lint | test | test:coverage
```

CI: `.github/workflows/ci.yml` — `npm ci` → lint → test → build (Node 22).

Frontend-only long-term: static SPA; domain math and lab run in the browser.

## Layout

```
src/app/        routes, layout
src/pages/      Home, Learn, LessonReader, Simulate, Glossary, About
src/content/    curriculum.ts, lessonPages.tsx, sources.ts, glossary/
src/sim/        pure orbital/coverage math + labFrame (no WebGL)
src/three/      R3F scene (LabCore owns clock; draws computeLabFrame)
src/ui/         chrome, LabCoach, interactives/
src/lib/        theme, progress, labParams
tests/unit/     unit tests (pure modules / formulas)
tests/bdd/      product scenarios (Feature / Scenario)
tests/support/  fixtures + shared assertions (no suites)
```

## Conventions

| Area | Notes |
|------|--------|
| Theme | CSS vars + `lib/theme.tsx`; tokens `ink` / `paper` / `line` / `inverse` |
| Lessons | `/learn/:slug/:pageId` → `LessonReaderPage` |
| Lab state | URL query via `labParams.ts` |
| Sim fidelity | Circular Kepler, geometric elevation, parametric shells |
| Lab display | `computeLabFrame` is the pure snapshot LabCore renders + insights use |
| Progress | `localStorage` (`progress.ts`); keep swappable |
| Science code | Prefer pure functions in `sim/` |
| Tests | Vitest `unit`/`bdd`; rigorous lab geometry in `labFrame` + constellation suites; see [tests/README.md](../tests/README.md) |

Future code-alongs: lazy `/code/*` only—don’t load Python on lesson routes.

