# Tests

## Layout

| Path | Kind | What belongs here |
|------|------|-------------------|
| `tests/unit/` | **Unit** | One module or pure function. No product story language. Fast, isolated. |
| `tests/bdd/` | **BDD** | User/product scenarios (`Feature` / `Scenario`). Behavior contracts, not formula checks. |
| `tests/support/` | Shared | Fixtures, `expectNear`, memory storage, BDD helpers. No tests here. |

## What we prioritize

| Priority | Target | Why |
|----------|--------|-----|
| High | `sim/labFrame` | **Display contract** — what LabCore draws and insights show |
| High | `sim/orbit`, `coverage`, `constellation`, `handoff` | Lab truth; independent geometry checks |
| High | `lib/labParams`, `lib/progress` | Shareable lab + resume progress contracts |
| Medium | `orbitGeometry`, `insights`, scenarios catalog | Rings, footprints, composed snapshots |
| Skip for now | React chrome, R3F draw calls, MDX copy | WebGL harness; model is tested via `labFrame` |

### Constellation lab accuracy

Tests lock the pedagogical model (not full RF / real ephemerides):

- Circular Kepler shell; positions close after one period  
- Plane coplanarity (RAAN + inclination); inclination z-envelope  
- Unit-Earth render scale (`a / R_e`); user on the unit sphere  
- In-view / serving sat vs min elevation; latency = range / c  
- Footprint half-angle λ and ring points at that angle from SSP  
- Dense vs sparse / elev mask product scenarios

## Commands

```bash
npm test              # unit + bdd once
npm run test:unit     # unit only
npm run test:bdd      # bdd only
npm run test:watch    # watch mode
npm run test:coverage # coverage for sim/ + lib/
```

## Conventions

1. **Import from `vitest` explicitly** — no globals.
2. **Import app code via `@/`**; shared test utils via `@test/support`.
3. **Reuse support helpers** — `labParams()`, `sat()`, `expectNear` / `expectVecNear`, `createMemoryStorage()`.
4. **Do not test trivial code** — skip pure pass-through UI, obvious constants, one-line wrappers.
5. **Keep suites independent** — no order dependence; stub `localStorage` per file when needed.

## Unit vs BDD

| | **Unit** (`tests/unit`) | **BDD** (`tests/bdd`) |
|--|-------------------------|------------------------|
| Question | Does this function/class obey the model? | Does this product workflow hold? |
| Style | `describe` / `it` | `feature` / `scenario` |
| Example | Kepler period at 550 km | Dense shell has more in-view sats than sparse |
| Example | HandoffTracker ignores pure offline drops | Learner progress does not duplicate modules |

If a check is a formula or branch, put it in **unit**. If it protects a multi-step learner/lab contract, put it in **bdd**.
