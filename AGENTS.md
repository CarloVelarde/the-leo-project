# Guidance for coding agents

Read this before making large changes.

## Mission

Build and improve **Starlink Edu**: a public education site about Starlink-style LEO constellations (lessons + 3D lab + planned optional Python code-alongs). Not affiliated with SpaceX.

## Read first

1. [docs/PRODUCT.md](docs/PRODUCT.md)  
2. [docs/CURRICULUM.md](docs/CURRICULUM.md)  
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)  
4. [docs/ROADMAP.md](docs/ROADMAP.md)  
5. [docs/DECISIONS.md](docs/DECISIONS.md)  
6. For coding features: [docs/CODE_ALONGS.md](docs/CODE_ALONGS.md)  

## Non-negotiables

- Keep the **main learning path conceptual and calm**.  
- Optional features (Advanced, code-alongs, deep projects) must stay **opt-in**.  
- Do **not** invent proprietary Starlink algorithms or reverse-engineering claims.  
- Scientific UI must match **lab model assumptions** (circular Kepler, geometric elevation, parametric shells) unless explicitly labeled otherwise.  
- Prefer white/black design tokens (`ink`, `paper`, `line`, `inverse`) — see `src/index.css`.  
- No backend unless the task explicitly adds one; use/extend localStorage adapters.  

## Where to edit

| Task | Primary files |
|------|----------------|
| Lesson pages / order | `src/content/curriculum.ts`, `src/content/lessonPages.tsx` |
| Sources | `src/content/sources.ts` |
| Glossary | `src/content/glossary/terms.ts` |
| Orbital math | `src/sim/*` (keep pure, testable) |
| 3D lab | `src/three/*`, `src/pages/SimulatePage.tsx`, `src/ui/LabCoach.tsx` |
| Theme / chrome | `src/index.css`, `src/lib/theme.tsx`, `src/app/layout/*` |
| Product docs | `docs/*` |

## Verification

```bash
npm run build
```

Update docs when you change product decisions, curriculum structure, or roadmap status.

## Code-along stance (locked)

Optional Python ~15 min exercises, mostly in-browser later; rare portfolio projects. Do not turn the core path into a mandatory coding course. Details: [docs/CODE_ALONGS.md](docs/CODE_ALONGS.md).
