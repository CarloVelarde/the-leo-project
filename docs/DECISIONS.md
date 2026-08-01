# Decisions log

Locked choices. Change only deliberately; update ROADMAP/PRODUCT when reversing.

| ID | Topic | Decision | Rationale |
|----|--------|----------|-----------|
| D1 | Audience | Zero space background; algebra + basic trig OK | Technical public education without gatekeeping |
| D2 | Depth model | Intuitive main path + Advanced expanders | Dual track without intimidation |
| D3 | Framing | Starlink as **case study** for LEO mega-constellations | Concrete and motivating; disclaim proprietary internals |
| D4 | Success context | Public education site | Clarity/trust over LMS features |
| D5 | Sim fidelity v1 | Circular Kepler + geometric coverage; parametric shells | Teachable, performant, honest if labeled |
| D6 | Flagship sim | 3D WebGL (R3F) required for identity | Differentiator vs static articles |
| D7 | Live TLEs | Deferred; not default pedagogy | Noisy; ops-heavy |
| D8 | Backend | None in v1; localStorage progress | Ship static site; keep adapters swappable |
| D9 | UI system | White primary, black/white Tesla-Starlink aesthetic; light default + dark mode | Calm reading + modern product feel |
| D10 | Lesson format | Multi-page modules, minimal scroll, Next/Previous | Focus and lower fatigue |
| D11 | Curriculum shape | Core M1–M8 + optional tracks (math, safety, DTC) | Complete story without encyclopedia sprawl |
| D12 | Code learning | Optional Python code-alongs ~15 min, mostly in-browser; rare deeper projects | Stickiness without burnout; not a Python course |
| D13 | Code vs main path | Companion doors from modules; never block conceptual Next | Completion rates + inclusivity |
| D14 | Autograding | Pure functions + tolerances only at first | Maintainable; high signal |
| D15 | Sources | Curated high-quality set in `sources.ts` | Trust and maintainability |

## Open / soft decisions

| Topic | Lean | Notes |
|-------|------|-------|
| Code runtime | Pyodide in-app for MVP | Confirm at Phase 2 start |
| Content consolidation | `lessonPages.tsx` primary | MDX files may be archived |
| License | TBD | Educational project |
| Deploy host | Static (Pages/Netlify/etc.) | Not chosen yet |
