# Product roadmap

Phased intentionally. **Do not expand scope mid-phase** without updating this file and DECISIONS.md.

Status legend: **Done** · **Next** · **Later** · **Idea**

---

## Phase 0 — Foundation — **Done**

- [x] Product vision & core feature freeze (public edu, Starlink case study, narrow+deep → evolved to full M1–M8)  
- [x] Vite + React + TS + Tailwind + R3F + router  
- [x] Pure TS sim core (`src/sim/`)  
- [x] 3D constellation lab (coverage, link, handoffs, scenarios)  
- [x] Research-backed curriculum M1–M8 + optional tracks  
- [x] Sources catalog + glossary  
- [x] Page-by-page lesson reader  
- [x] Black/white UI, light default, dark mode  
- [x] Lab coach + status strip + experiments  

---

## Phase 1 — Polish & coherence — **Next**

Focus: make what exists feel finished and consistent.

- [ ] Audit every lesson page for length, typography, and single-interactive discipline  
- [ ] Consolidate content sources of truth (prefer `curriculum.ts` + `lessonPages.tsx`; retire or generate from dead MDX if unused)  
- [ ] Lab performance pass (large sat counts, mobile)  
- [ ] Accessibility pass (lesson keyboard nav already partial; focus traps, contrast)  
- [ ] Replace Unsplash heroes with licensed/self-hosted assets if needed for production  
- [ ] Glossary: cross-links from lessons; ensure all key terms covered  
- [ ] About page: methods + assumptions + source policy summary  
- [ ] Unit tests for `src/sim/` (Vitest) — period, elevation, handoff  

---

## Phase 2 — Code-alongs MVP — **Next** (after Phase 1 or in parallel if scoped tightly)

See [CODE_ALONGS.md](./CODE_ALONGS.md).

- [ ] Decide runtime: in-browser Python (Pyodide) vs Colab-first hybrid (**lean Pyodide for MVP**)  
- [ ] Python package mirroring `src/sim` kernels  
- [ ] `/code` index + exercise page shell  
- [ ] 4–6 Layer A/B exercises wired from M2, M3, M5, M6  
- [ ] “Optional code along” cards on matching lesson pages  
- [ ] Show-solution UX + time labels  
- [ ] Lazy-load Python runtime (do not bloat main lesson bundle)  

---

## Phase 3 — Deeper practice & lab depth — **Later**

- [ ] Hidden tests for pure-function exercises  
- [ ] 1–2 portfolio projects (coverage CLI; handoff analyzer) + rubric  
- [ ] Lab: multi-sat ground tracks, filled-footprint polish, shareable narrative URLs for experiments  
- [ ] Light “check your intuition” progress summary (still no accounts)  
- [ ] Optional: ISL overlay conceptual mode in 3D lab  

---

## Phase 4 — Platform & reach — **Later / Idea**

- [ ] Backend for syncing progress & saved lab states (adapter already anticipated)  
- [ ] Search across lessons + glossary  
- [ ] Deploy pipeline (Cloudflare Pages / Netlify / etc.) + custom domain  
- [ ] Analytics that respect privacy (page funnel only)  
- [ ] Classroom mode (shareable classroom codes) — only if demand  
- [ ] Live TLE “reality mode” as advanced lab toggle (pedagogy secondary)  

---

## Explicit backlog (do not prioritize unless asked)

- Full RF / weather link budget product  
- Debris N-body simulator  
- VR  
- Mandatory accounts  
- LMS export  
- Multiplayer  

---

## Definition of done (per feature)

A feature is done when:

1. It matches PRODUCT principles (calm main path, honest models).  
2. It builds (`npm run build`).  
3. User-facing copy has sources or assumptions where claims are made.  
4. Docs updated if it changes roadmap or locked decisions.  

---

## Suggested near-term sequence

1. Phase 1 content/source-of-truth cleanup + sim tests  
2. Phase 2 code-along MVP (4 exercises + Pyodide shell)  
3. Deploy public preview  
4. Phase 3 projects + lab extras based on feedback  
