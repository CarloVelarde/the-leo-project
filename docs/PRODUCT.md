# Product

**The Leo Project** ([theleoproject.app](https://theleoproject.app/)) — public education site: how **Starlink-style LEO mega-constellations** work—from Internet basics to end-to-end connectivity—via page-by-page lessons, a guided 3D lab, and optional Python code-alongs.

**Not** affiliated with SpaceX. No reverse-engineering of proprietary algorithms.

## Audience

- No space background  
- Technical (algebra / basic trig OK)  
- Self-paced; desktop-first for the lab  

## Principles

1. **Main path stays conceptual and calm** (pages, quizzes, lab moments).  
2. **Lab is the spine** for spatial intuition (coach + status + experiments).  
3. **Optional depth** (Advanced, optional tracks, code-alongs)—never block Next.  
4. **Same simplified models** everywhere (circular Kepler, geometric elevation, parametric shells).  
5. **Trust:** assumptions visible; sources curated; time-sensitive numbers dated.  
6. **Navigation:** prev/next pages, module jump, home/path/glossary/lab/code from the reader.  

## Identity

Differentiation: **curriculum + simulation**, not a blog post or a bare globe.

Success: learner can explain LEO vs GEO latency, use the lab to break/fix coverage, and trust the model labels.

## Non-goals (now)

Auth/LMS, live TLEs as default, full RF products, Python bootcamp, VR/multiplayer.

## UX

White primary / black type (Tesla–Starlink lean); light default + dark mode; page-based lessons; lab taught, not just dumped.

## Decisions (summary)

| | Choice |
|--|--------|
| Framing | Starlink as case study for LEO broadband |
| Sim | 3D WebGL; circular Kepler + geometric coverage |
| Backend | None v1; `localStorage` progress |
| Code learning | Optional ~15 min Python, mostly in-browser; rare projects |
| Content live path | `curriculum.ts` + `lessonPages.tsx` |

Deviate when needed; if a row above changes in a lasting way, update this file.
