# Agents

**Do not load the full `docs/` set every session.** Use the task to pick what (if anything) to open.

| Task | Doc |
|------|-----|
| Small fix / obvious code change | None required |
| Product or scope | `docs/PRODUCT.md` |
| Lessons / modules | `docs/CURRICULUM.md` |
| Python / code-alongs | `docs/CODE_ALONGS.md` |
| Structure / stack | `docs/ARCHITECTURE.md` |
| Priorities | `docs/ROADMAP.md` |

Docs are **lanes**: follow them by default; cross them when a better path is clear. If you make a **lasting** product, curriculum, or roadmap change, update the matching doc in the same work.

## Defaults

- Main path: conceptual and calm; optional features stay opt-in  
- No proprietary Starlink algorithm claims  
- Sim/lab science: circular Kepler + geometric elevation + parametric shells (unless labeled otherwise)  
- UI tokens: `ink` / `paper` / `line` / `inverse`  
- No backend unless asked  

## Verify

```bash
npm run build
npm test
```

Index: [docs/README.md](docs/README.md).
