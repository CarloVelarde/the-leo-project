# Curriculum

## Pedagogy principles

1. **Zero space background; technical tone.** No talking down; no assumed orbital mechanics.  
2. **Internet before orbits.** Shared vocabulary (packet, latency, RTT) before GEO/LEO.  
3. **Page-sized lessons.** Prefer Next over long scroll walls.  
4. **Progressive disclosure.** Main path stands alone; Advanced + Go deeper are opt-in.  
5. **Same simplified models** across lessons, lab, and (planned) Python: circular Kepler, geometric elevation, parametric shells.  
6. **Honesty.** Label approximations; cite public sources; avoid proprietary algorithm claims.  
7. **Avoid burnout.** Optional tracks and code-alongs never block the conceptual path.

## Structure

```
Core path (required identity)     Optional tracks              Planned code layer
─────────────────────────────     ────────────────             ──────────────────
M1–M8 page sequences              Orbit math                   Code-alongs (~15 min)
                                  Space safety                 Deeper projects (rare)
                                  Direct-to-cell
```

### Routes

| Route | Role |
|-------|------|
| `/learn` | Path index |
| `/learn/:slug/:pageId` | Lesson reader (page-by-page) |
| `/simulate` | Constellation lab |
| `/glossary` | Searchable glossary |
| `/about` | Methods, sources stance |

### Source of truth (code)

| Concern | File(s) |
|---------|---------|
| Module/page metadata | `src/content/curriculum.ts` |
| Page bodies (current) | `src/content/lessonPages.tsx` |
| Legacy/long MDX (may still exist) | `src/content/modules/*.mdx` |
| Module meta (older catalog) | `src/content/modules.ts` |
| Sources catalog | `src/content/sources.ts` |
| Glossary | `src/content/glossary/terms.ts` |

> **Note for implementers:** Prefer editing `curriculum.ts` + `lessonPages.tsx` for the live reader. Keep metadata and page IDs in sync.

## Core path (M1–M8)

| # | Slug | Title | Intent |
|---|------|-------|--------|
| 1 | `internet-foundations` | How the Internet Actually Moves Data | Packets, routers, latency vs bandwidth, RTT |
| 2 | `geo-problem` | Why Ordinary Satellite Internet Felt Slow | GEO ~35,786 km, light-time, coverage trade-offs |
| 3 | `leo-advantage` | Low Earth Orbit: Why Closer Changes Everything | LEO definition, latency win, coverage problem |
| 4 | `launch-and-ops` | Getting Satellites into Orbit & Keeping Them There | Lifecycle, station-keeping, ion thrusters, deorbit |
| 5 | `constellation-design` | What a Constellation Actually Is | Shells, planes, inclination, phasing, density |
| 6 | `user-terminal` | Your Terminal Talking to a Fast-Moving Satellite | Phased arrays, elevation, handovers |
| 7 | `space-network` | The Bigger Network | User link, gateway, ISL, routing as dynamic graph |
| 8 | `end-to-end` | Putting It All Together | Packet journey, latency stack, capstone experiments |

Each module is split into **short pages** (intro → concept → interactive/lab → quiz/sources). See `curriculum.ts` for exact `pageId`s.

## Optional tracks

| Slug | Title | Intent |
|------|-------|--------|
| `optional-orbit-math` | Orbit math that actually helps | Period, light-time, footprint formulas |
| `optional-space-safety` | Debris, astronomy, and space safety | Density, deorbit, independent tracking |
| `optional-direct-to-cell` | Direct-to-cell and future evolution | Phone link budgets, lower shells |

## Lesson page pattern

1. Page title + short objectives (“On this page”)  
2. 2–4 short paragraphs of prose  
3. One interactive when useful (quiz, diagram, calculator, mini-sim, video)  
4. Optional Advanced expander  
5. Lab deep-link when relevant  
6. Final page: quiz + Further reading  

## Sources policy

- Prefer **primary / official / standard educational** sources.  
- Catalog in `sources.ts`; surface via `InlineSource` and `FurtherReading`.  
- Strong set includes: MDN, HPBN (Grigorik), Khan Academy, Crash Course CS, ESA Types of orbits, Starlink Technology, Starlink Space Safety altitudes, Jonathan McDowell Starlink stats, FCC materials (as legal envelope).  
- Time-sensitive numbers (sat counts, shell altitudes): **date and link**, don’t hardcode as eternal truth.

## Lab as curriculum

The lab is not a toy appendix. Core expectations:

- Experiments: sparse vs dense, altitude trade, high latitude, etc. (`src/sim/scenarios.ts`)  
- First-run **Lab coach** + reopenable “How this lab works”  
- Plain-language **status strip** under the viewport  
- Model assumptions drawer  

Code-alongs (when built) must use the **same** sim assumptions documented in the lab.

## Assessment

| Mechanism | Role |
|-----------|------|
| In-page quizzes | Immediate intuition checks |
| Lab experiments | Spatial / systems intuition |
| Advanced sections | Optional math depth |
| Code-alongs (planned) | Optional quantitative re-expression |
| Capstone projects (planned) | Rare portfolio-grade practice |
