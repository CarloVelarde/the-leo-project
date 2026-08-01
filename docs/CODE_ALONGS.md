# Optional Python code-alongs

## Locked product stance

> Keep the **main path conceptual and calm**; attach **optional Python code-alongs** that re-express the same physics/network models in **~15 minutes**, **mostly in-browser**, with a **few deeper projects** for portfolio-grade practice.

This is a **companion layer**, not a second required course and not a general Python bootcamp.

## Goals

| Goal | Design implication |
|------|-------------------|
| Stickiness | Code maps 1:1 to a lesson concept just learned |
| No burnout | Never block Next page on coding; timeboxed labels |
| Meaning for CS grads | Tiny real models, not toy syntax drills |
| Consistency | Same simplified physics as `src/sim/` and the 3D lab |
| Maintainability | Pure functions + light checks before a heavy judge |

## Three layers

| Layer | Time | Who | Format |
|-------|------|-----|--------|
| **A · See the code** | 3–8 min | Everyone who opts in | Working snippet; read → run → change one number |
| **B · Tinker** | ~10–25 min | Optional | One incomplete function; plot or numeric feedback |
| **C · Build** | ~2–6 hr | Rare (2–3 per whole course) | Project outline + local/Colab; rubric later |

**Default density:** Layer A/B on roughly half the modules; Layer C only at strategic points (e.g. after M5 density, after M6 handoffs, after M8).

## Presentation (planned UX)

On relevant lesson pages, an optional card:

```
Optional code along · ~15 min · Python
Re-express this idea with a tiny model.
[ Start in browser ]  [ Colab ]  [ Download .py ]
```

Route sketch (not necessarily implemented yet):

- `/code` — index of exercises  
- `/code/:moduleSlug/:exerciseId` — exercise runner  

Progress: `localStorage` first (same philosophy as lesson progress).

## Runtime strategy

### Phase 1 (recommended first ship)

- **In-browser Python** (e.g. Pyodide / JupyterLite-style embedding) for Layers A–B  
- Shared pure-Python helpers mirroring `src/sim` formulas (`period`, `light_time`, `elevation`, `online_fraction`, handoff detect)  
- Checks: `assert` / simple expected outputs / `pytest.approx`-style tolerances for floats  
- Solutions available via “Show solution” after attempt (or always for Layer A)

### Phase 2

- Hidden tests for pure kernels only  
- Exercise catalog with difficulty + time badges  

### Phase 3

- 1–2 local/Colab projects with README + rubric  
- Optional lockfile / `uv` one-liner setup doc  

### Explicitly out of scope early

- Competitive programming platform  
- Mandatory Docker  
- Autograding full open-ended simulations without fixtures  
- Replacing the 3D lab with notebooks  

## Autograding policy

| Autograde | Do not autograde first |
|-----------|-------------------------|
| Pure functions with fixed fixtures | Full free-form apps |
| Bool / int results; floats with tolerance | Exact float bit equality |
| Handoff count over a canned time series | “Any correct networking stack” |

Open-ended plots: self-check prompts (“curve should fall as altitude rises”).

## Exercise inventory (planned)

| After module | Exercise idea | Layer | Notes |
|--------------|---------------|-------|-------|
| M1 | Sum hop delays → RTT; chatty vs bulk | A | Network intuition |
| M2 | `one_way_ms(d)`; GEO vs LEO table | A/B | Same c as lab |
| M3 | Kepler period vs altitude | B | Plot optional |
| M4 | Toy propellant/station-keeping counter | A | Conceptual |
| M5 | Generate constellation; sample online % | B | Align with lab scenarios |
| M6 | Detect serving-sat changes (handoffs) | B | Autogradable kernel |
| M7 | BFS/Dijkstra on small static sat graph | B | Dynamic graph intro |
| M8 | Reproduce sparse vs dense experiment | B/C | Capstone light |
| Opt math | Footprint half-angle | B | Match lab geometry |
| Opt safety | Qualitative decay-time toy | A | Careful, non-scare |

Exact IDs and prompts to be added under `docs/exercises/` or `src/code/` when implementation starts.

## Anti-burnout rules

1. Label every exercise with a time estimate.  
2. One learning objective per exercise.  
3. Scaffold: complete code → one blank → open problem.  
4. Never require code to finish the conceptual path.  
5. Solutions and explanations available (learning > gatekeeping).  
6. Allow AI assistants in 2026, but keep a **predict-before-run** and short reflection prompt so cognition stays in the loop.

## Shared model contract

Code-alongs **must** document the same assumptions as the lab:

- Circular Keplerian orbits; constant altitude  
- Spherical Earth; geometric min-elevation mask  
- Parametric shells (planes × sats), not live TLEs by default  
- Not a full RF link budget  

Constants should match `src/sim/constants.ts` (or be generated from one shared definition later).

## Implementation notes (when building)

- Prefer a `packages/sim-py` or `python/starlink_edu/` pure library rather than duplicating formulas ad hoc.  
- Long-term ideal: single source of truth for orbital/coverage math (TS ↔ Python parity tests).  
- Keep browser bundle impact in mind; lazy-load the Python runtime only on `/code/*` routes.
