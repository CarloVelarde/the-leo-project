# Curriculum

## Pedagogy

- Internet vocabulary before orbits  
- Page-sized lessons (Next over long scroll)  
- Progressive disclosure (Advanced / sources opt-in)  
- Honest simplified models; cite sources; no proprietary claims  

## Core path (M1–M8)

| # | Slug | Focus |
|---|------|--------|
| 1 | `internet-foundations` | Packets, latency, RTT |
| 2 | `geo-problem` | GEO distance delay |
| 3 | `leo-advantage` | LEO + need for constellation |
| 4 | `launch-and-ops` | Launch, station-keep, deorbit |
| 5 | `constellation-design` | Shells, planes, density |
| 6 | `user-terminal` | Phased arrays, handovers |
| 7 | `space-network` | Gateway, ISL, routing |
| 8 | `end-to-end` | Synthesis + lab capstone |

Optional: `optional-orbit-math`, `optional-space-safety`, `optional-direct-to-cell`.

Live pages: `/learn/:slug/:pageId`. Metadata: `src/content/curriculum.ts`. Bodies: `src/content/lessonPages.tsx`. Exact page IDs live in code—not duplicated here.

## Lab role

Experiments + coach + status strip + assumptions. Same model contract as lessons (and future code-alongs).

## Editing lessons

1. Page meta in `curriculum.ts`  
2. Body in `lessonPages.tsx` under `` `${slug}/${pageId}` ``  
3. One primary interactive per page when possible  
4. New terms → glossary; new links → `sources.ts`  

**Voice:** precise, adult, calm. Prefer “problem class” over secret-sauce claims. Date time-sensitive stats.
