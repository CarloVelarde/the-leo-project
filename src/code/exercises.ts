/**
 * Optional Python code-alongs — high-signal concepts only.
 */

export type CodeExercise = {
  id: string
  title: string
  moduleSlug: string
  pageId: string
  minutes: number
  summary: string
  /** One-line outcome */
  goal: string
  /** Numbered requirements shown in the task panel */
  steps: string[]
  /** What “Run checks” expects, in plain language */
  success: string
  /** Optional think-first question */
  predict?: string
  starterCode: string
  solutionCode: string
  testCode: string
}

const PRELUDE = `# Shared constants (same model as the 3D lab)
EARTH_RADIUS_KM = 6371.0
MU_EARTH = 398600.4418  # km^3/s^2
C_KM_S = 299792.458
GEO_ALTITUDE_KM = 35786.0
import math
`

export const CODE_EXERCISES: CodeExercise[] = [
  {
    id: 'light-time',
    title: 'Light-time: GEO vs LEO',
    moduleSlug: 'geo-problem',
    pageId: 'delay',
    minutes: 12,
    summary: 'Compute pure propagation delay from distance — why GEO feels slow.',
    goal: 'Compare one-way light time for GEO vs a 550 km LEO hop.',
    steps: [
      'Implement one_way_ms(distance_km) — convert distance (km) to milliseconds using C_KM_S.',
      'Formula: time_ms = distance_km / C_KM_S × 1000.',
      'Implement geo_vs_leo() — return (geo_ms, leo_ms) using GEO_ALTITUDE_KM and 550 km (one-way only).',
      'Click Run checks when both functions are done.',
    ],
    success: 'Checks pass when GEO one-way is ~119 ms and LEO 550 km is ~1.8 ms.',
    predict: 'Is GEO one-way delay closer to 10 ms, 100 ms, or 1000 ms?',
    starterCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    """One-way light time in milliseconds for distance in km."""
    # TODO: return distance_km / C_KM_S * 1000
    raise NotImplementedError

def geo_vs_leo() -> tuple[float, float]:
    """Return (geo_one_way_ms, leo_550km_one_way_ms)."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    """One-way light time in milliseconds for distance in km."""
    return distance_km / C_KM_S * 1000.0

def geo_vs_leo() -> tuple[float, float]:
    return one_way_ms(GEO_ALTITUDE_KM), one_way_ms(550.0)
`,
    testCode: `
g, l = geo_vs_leo()
assert abs(one_way_ms(300000) - 1000.0) < 0.01, "one_way_ms: 300000 km should be ~1000 ms"
assert abs(g - 119.37) < 0.5, f"GEO one-way expected ~119 ms, got {g}"
assert abs(l - 1.83) < 0.2, f"LEO 550 km one-way expected ~1.8 ms, got {l}"
assert g > 50 * l, "GEO should be much larger than LEO light-time"
print("CHECK_OK")
print(f"GEO one-way ≈ {g:.2f} ms · LEO 550 km ≈ {l:.2f} ms · ratio ≈ {g/l:.0f}×")
`,
  },
  {
    id: 'orbital-period',
    title: 'Orbital period vs altitude',
    moduleSlug: 'leo-advantage',
    pageId: 'latency',
    minutes: 12,
    summary: 'Kepler period for circular orbits — what the lab period readout uses.',
    goal: 'Compute circular-orbit period and see how it grows with altitude.',
    steps: [
      'Implement period_minutes(altitude_km).',
      'Use a = EARTH_RADIUS_KM + altitude_km and T = 2π √(a³ / MU_EARTH) in seconds, then convert to minutes.',
      'Implement compare_altitudes() — return periods at 550 km and 1100 km.',
      'Run checks to verify both values.',
    ],
    success: 'Period at 550 km ≈ 96 min; at 1100 km ≈ 107 min (higher → longer).',
    predict: 'If altitude goes from 550 → 1100 km, does period increase or decrease?',
    starterCode: `${PRELUDE}
def period_minutes(altitude_km: float) -> float:
    """Orbital period in minutes for a circular orbit at altitude_km."""
    # TODO: a = EARTH_RADIUS_KM + altitude_km
    # T_sec = 2 * math.pi * math.sqrt(a**3 / MU_EARTH)
    raise NotImplementedError

def compare_altitudes() -> tuple[float, float]:
    """Return periods (minutes) at 550 km and 1100 km."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def period_minutes(altitude_km: float) -> float:
    a = EARTH_RADIUS_KM + altitude_km
    t_sec = 2 * math.pi * math.sqrt(a**3 / MU_EARTH)
    return t_sec / 60.0

def compare_altitudes() -> tuple[float, float]:
    return period_minutes(550.0), period_minutes(1100.0)
`,
    testCode: `
p550, p1100 = compare_altitudes()
assert abs(period_minutes(0) - 84.4) < 1.5, f"surface-skimming period ~84 min, got {period_minutes(0)}"
assert abs(p550 - 95.6) < 1.5, f"550 km period expected ~96 min, got {p550}"
assert p1100 > p550, "Higher altitude should have longer period"
assert abs(p1100 - 107.2) < 2.0, f"1100 km period expected ~107 min, got {p1100}"
print("CHECK_OK")
print(f"550 km → {p550:.1f} min · 1100 km → {p1100:.1f} min")
`,
  },
  {
    id: 'coverage-sample',
    title: 'Coverage sample: sparse vs dense',
    moduleSlug: 'constellation-design',
    pageId: 'density',
    minutes: 15,
    summary: 'Estimate how often a user is “online” — same geometric idea as the lab.',
    goal: 'Measure online fraction from elevation samples for sparse vs dense skies.',
    steps: [
      'Implement online_fraction(elevations_deg, min_elev) — fraction of samples with elevation ≥ min_elev (return 0..1).',
      'Use the lists sparse_elevations and dense_elevations already in the starter.',
      'Implement sparse_vs_dense(min_elev=25) — return (sparse_fraction, dense_fraction).',
      'Run checks at min elevation 25°.',
    ],
    success: 'Dense should be fully online at 25°; sparse only a small share of samples.',
    predict: 'At 25° min elevation, is dense online more often than sparse?',
    starterCode: `${PRELUDE}
# Synthetic elevation samples (deg) over time — stand-ins for lab geometry
sparse_elevations = [-10, -5, 5, 12, 20, 28, 15, 8, -2, -8, 3, 18, 30, 22, 10]
dense_elevations  = [40, 35, 50, 28, 45, 60, 33, 42, 55, 38, 48, 52, 30, 44, 58]

def online_fraction(elevations_deg: list[float], min_elev: float) -> float:
    """Fraction of samples with elevation >= min_elev (0..1)."""
    # TODO
    raise NotImplementedError

def sparse_vs_dense(min_elev: float = 25.0) -> tuple[float, float]:
    """Return (sparse_fraction, dense_fraction)."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
sparse_elevations = [-10, -5, 5, 12, 20, 28, 15, 8, -2, -8, 3, 18, 30, 22, 10]
dense_elevations  = [40, 35, 50, 28, 45, 60, 33, 42, 55, 38, 48, 52, 30, 44, 58]

def online_fraction(elevations_deg: list[float], min_elev: float) -> float:
    if not elevations_deg:
        return 0.0
    ok = sum(1 for e in elevations_deg if e >= min_elev)
    return ok / len(elevations_deg)

def sparse_vs_dense(min_elev: float = 25.0) -> tuple[float, float]:
    return online_fraction(sparse_elevations, min_elev), online_fraction(dense_elevations, min_elev)
`,
    testCode: `
assert abs(online_fraction([0, 10, 30], 25) - 1/3) < 1e-9
assert online_fraction([], 25) == 0.0
s, d = sparse_vs_dense(25.0)
assert d > s, f"dense should beat sparse, got sparse={s}, dense={d}"
assert abs(s - 2/15) < 1e-9, f"sparse expected 2/15, got {s}"
assert d == 1.0, f"dense expected 1.0 at 25°, got {d}"
print("CHECK_OK")
print(f"Online fraction @25° — sparse {s*100:.0f}% · dense {d*100:.0f}%")
`,
  },
  {
    id: 'handoff-count',
    title: 'Count handoffs',
    moduleSlug: 'user-terminal',
    pageId: 'handoff',
    minutes: 12,
    summary: 'Detect serving-satellite switches — the same idea as the lab handoff counter.',
    goal: 'Count how many times the serving satellite changes over a sequence.',
    steps: [
      'Implement count_handoffs(serving_ids) where each entry is a sat id string or None (offline).',
      'Count a handoff when the serving id changes from one non-None sat to a different non-None sat.',
      'Going offline (A → None) does not count. Coming back to a new sat (None → B) counts if there was a previous sat.',
      'Repeated same id does not count.',
    ],
    success: 'Examples: [A,B,C] → 2 handoffs; [A,A,B,None,C] → 2 handoffs.',
    predict: 'For [A, A, B, B, None, C], how many handoffs?',
    starterCode: `${PRELUDE}
def count_handoffs(serving_ids: list[str | None]) -> int:
    """
    Count serving-sat switches.
    - Ignore repeated same id
    - A → B counts as 1
    - A → None does not count
    - None → B counts as 1 if there was a previous serving sat
    """
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def count_handoffs(serving_ids: list[str | None]) -> int:
    count = 0
    last: str | None = None
    for sid in serving_ids:
        if sid is None:
            continue
        if last is not None and sid != last:
            count += 1
        last = sid
    return count
`,
    testCode: `
assert count_handoffs([]) == 0
assert count_handoffs(["A", "A", "A"]) == 0
assert count_handoffs(["A", "B", "B", "C"]) == 2
assert count_handoffs(["A", "A", "B", "B", None, "C"]) == 2
assert count_handoffs([None, "A", None, "A"]) == 0
assert count_handoffs([None, "A", None, "B"]) == 1
print("CHECK_OK")
print("handoffs(['A','B',None,'C']) =", count_handoffs(["A", "B", None, "C"]))
`,
  },
  {
    id: 'path-hops',
    title: 'Path hops on a tiny sat graph',
    moduleSlug: 'space-network',
    pageId: 'mesh',
    minutes: 15,
    summary: 'Shortest hop count on a small graph — intuition for ISL routing.',
    goal: 'Find the fewest hops between two nodes on an unweighted graph (BFS).',
    steps: [
      'Implement hops(adj, start, goal) where adj maps node → list of neighbors.',
      'Return the number of edges on the shortest path (0 if start == goal).',
      'Return -1 if goal is unreachable.',
      'Use BFS (deque is imported in the starter).',
    ],
    success: 'On line A–B–C–D, hops(A, D) is 3. On the sample mesh, U → GW is 2 hops.',
    predict: 'On a line A–B–C–D, what is hops(A, D)?',
    starterCode: `${PRELUDE}
from collections import deque

def hops(adj: dict[str, list[str]], start: str, goal: str) -> int:
    """Unweighted shortest path length in hops, or -1 if unreachable."""
    # TODO: BFS
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
from collections import deque

def hops(adj: dict[str, list[str]], start: str, goal: str) -> int:
    if start == goal:
        return 0
    q = deque([(start, 0)])
    seen = {start}
    while q:
        node, d = q.popleft()
        for nb in adj.get(node, []):
            if nb in seen:
                continue
            if nb == goal:
                return d + 1
            seen.add(nb)
            q.append((nb, d + 1))
    return -1
`,
    testCode: `
line = {"A": ["B"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C"]}
assert hops(line, "A", "A") == 0
assert hops(line, "A", "D") == 3
assert hops(line, "B", "D") == 2
mesh = {"U": ["S1"], "S1": ["U", "S2", "GW"], "S2": ["S1", "S3"], "S3": ["S2", "GW"], "GW": ["S1", "S3"]}
assert hops(mesh, "U", "GW") == 2
assert hops(mesh, "U", "S3") == 3
assert hops({"A": []}, "A", "Z") == -1
print("CHECK_OK")
print("U → GW hops:", hops(mesh, "U", "GW"))
`,
  },
]

export function getExercise(id: string): CodeExercise | undefined {
  return CODE_EXERCISES.find((e) => e.id === id)
}

export function getExerciseForPage(
  moduleSlug: string,
  pageId: string,
): CodeExercise | undefined {
  return CODE_EXERCISES.find((e) => e.moduleSlug === moduleSlug && e.pageId === pageId)
}

export function exercisesForModule(moduleSlug: string): CodeExercise[] {
  return CODE_EXERCISES.filter((e) => e.moduleSlug === moduleSlug)
}
