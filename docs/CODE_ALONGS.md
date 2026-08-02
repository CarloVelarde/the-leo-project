# Code-alongs

**Stance:** Main path stays conceptual. Optional Python re-expresses high-signal models (~10–15 min), in-browser. Never blocks Next.

## Shipped exercises

| Exercise | After | ~min |
|----------|--------|------|
| Light-time GEO vs LEO | M2 · Delay | 12 |
| Orbital period vs altitude | M3 · Latency | 12 |
| Coverage sparse vs dense | M5 · Density | 15 |
| Coverage Monte Carlo | M5 · Capacity | 15 |
| Elevation gate | M6 · Elevation | 12 |
| Contact windows | M6 · Elevation | 12 |
| Count handoffs | M6 · Handovers | 12 |
| Handoff policy compare | M6 · Handovers | 12 |
| Path hops (BFS) | M7 · Mesh | 15 |
| Weighted path (Dijkstra) | M7 · Mesh | 15 |
| ISL graph from geometry | M7 · Mesh | 15 |
| Compose: light-time × hops | Optional code · Compose | 12 |
| Parameter sweep: altitude | Optional code · Sweep | 12 |
| Capstone path delay | M8 · Lab | 12 |

- Routes: `/code`, `/code/:exerciseId`  
- Cards: `CodeAlongCard` (`exerciseId` when a page has more than one)  
- Runtime: Pyodide (CDN), lazy on first Run  
- Track: `optional-code-path` (map, compose, sweep, portfolio)  

## Rules

- Code only where quantitative models matter  
- Same lab constants (`EARTH_RADIUS_KM`, `MU_EARTH`, `C_KM_S`)  
- Checks = pure asserts + `CHECK_OK`  
- Label toys: hops ≠ ms; circular ≠ full ephemeris; heuristics ≠ proprietary algorithms  

## Difficulty ladder

```
L0 units → L1 formula → L2 aggregate → L3 events → L4 graphs → L5 compose / sweep / geometry graphs
```

## Edit

Exercises: `src/code/exercises.ts` · Runner: `src/code/pyodideRunner.ts`
