# Curriculum

## Pedagogy

- Internet vocabulary before orbits  
- No engineering background assumed; explain terms on first use  
- Friendly high school science voice (analogies, recap boxes, reinforcement)  
- Page focused lessons; modest scroll OK when clarity needs it  
- Progressive disclosure (Advanced / sources opt-in)  
- Honest simplified models; cite sources; no proprietary claims  
- Date time-sensitive shell counts and altitudes  
- Related links, glossary, lab, and code stay one hop away  

## Core path (M1–M8)

Logical beginner order: **shared Internet words → GEO distance tax → LEO + regimes → fleet ops → constellation geometry → terminal → space network → synthesis + honesty.**

| # | Slug | Focus |
|---|------|--------|
| 1 | `internet-foundations` | Packets, latency, TCP/loss, access paths |
| 2 | `geo-problem` | GEO delay + long-fat-pipe networking pain |
| 3 | `leo-advantage` | LEO + regimes + constellation need |
| 4 | `launch-and-ops` | Launch, station-keep, deorbit |
| 5 | `constellation-design` | Shells, density, **capacity**, catalogs |
| 6 | `user-terminal` | Spectrum, arrays, elevation/obstruction, handovers |
| 7 | `space-network` | Links, **gateway scarcity**, mesh, payload |
| 8 | `end-to-end` | Multi-factor performance, lab, honesty |

## Optional tracks

| Slug | Focus |
|------|--------|
| `optional-orbit-math` | Period, light-time, footprint |
| `optional-space-safety` | Debris, deorbit, astronomy |
| `optional-direct-to-cell` | Dish vs DTC |
| `optional-code-path` | Exercise map, compose, **sweep**, **portfolio** |
| `optional-comparative` | LEO dish / DTC / GEO HTS / other NGSO design points |

Live pages: `/learn/:slug/:pageId`. Metadata: `curriculum.ts` + `modules.ts`. Bodies: `lessonPages.tsx`.

## Accuracy contract

| Do | Don't |
|----|--------|
| Prefer Space Safety docs for shell altitudes (dated) | Treat marketing “~550 km” as eternal |
| McDowell / CelesTrak for fleet literacy | Invent proprietary routing/beam schedules |
| Light-time as a floor; real RTT is higher | Claim “LEO = zero latency” |
| Circular Kepler + geometric elevation (labeled) | Imply full RF product fidelity |
| Compare architecture axes | Brand war or undated speed-test rankings |

## Lab role

Experiments + coach + status strip + assumptions. Same model contract as lessons and code-alongs.

## Code-alongs

See `docs/CODE_ALONGS.md`.

## Editing lessons

1. Page meta in `curriculum.ts`  
2. Module meta / objectives in `modules.ts`  
3. Body in `lessonPages.tsx` under `` `${slug}/${pageId}` ``  
4. One primary interactive per page when possible  
5. New terms → glossary; new links → `sources.ts`  
6. Related navigation via `RelatedLinks` where it helps  

**Voice:** precise, adult, calm. Prefer “problem class” over secret-sauce claims. Date time-sensitive stats.
