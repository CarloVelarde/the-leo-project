# Code-alongs

**Stance:** Main path stays conceptual. Optional Python re-expresses high-signal models (~10–15 min), in-browser. Never blocks Next.

## Shipped MVP

| Exercise | After | ~min |
|----------|--------|------|
| Light-time GEO vs LEO | M2 · Delay | 12 |
| Orbital period vs altitude | M3 · Latency | 12 |
| Coverage sparse vs dense | M5 · Density | 15 |
| Count handoffs | M6 · Handovers | 12 |
| Path hops (BFS) | M7 · Mesh | 15 |

- Routes: `/code`, `/code/:exerciseId`  
- Cards: `CodeAlongCard` on matching lesson pages  
- Runtime: Pyodide (CDN), lazy on first Run  
- UI: clean editor, Run / Run checks, Reset, Show solution  

## Rules

- Code only where quantitative models matter (not every page)  
- Time labels match difficulty  
- Same lab model assumptions  
- Checks = pure asserts + `CHECK_OK`  
- Colab/download later  

## Edit

Exercises: `src/code/exercises.ts` · Runner: `src/code/pyodideRunner.ts`
