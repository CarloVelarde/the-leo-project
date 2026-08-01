/**
 * Optional Python code-alongs — only high-signal concepts.
 * Isolated per exercise; shared constants match src/sim.
 */

export type CodeExercise = {
  id: string
  title: string
  /** Lesson module slug */
  moduleSlug: string
  /** Lesson page that shows the optional card */
  pageId: string
  minutes: number
  summary: string
  goal: string
  /** Shown above editor */
  prompt: string
  starterCode: string
  solutionCode: string
  /** Appended after user code; print CHECK_OK on success */
  testCode: string
  predict?: string
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
    goal: 'Implement one-way light time and compare GEO (~36,000 km) to LEO (550 km).',
    prompt:
      'Fill in one_way_ms(distance_km). Use C_KM_S (km/s). Return milliseconds. Then complete geo_vs_leo() to return (geo_ms, leo_ms) for GEO altitude and 550 km (one-way).',
    predict: 'Before running: is GEO one-way delay closer to 10 ms, 100 ms, or 1000 ms?',
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
    goal: 'Implement period_minutes(altitude_km) and compare 550 km vs 1100 km.',
    prompt:
      'Circular orbit: a = EARTH_RADIUS_KM + h, T = 2π √(a³/μ) seconds. Implement period_minutes(h).',
    predict: 'If you double altitude from 550→1100 km, does period increase or decrease?',
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
    goal: 'Given elevation samples over time, compute online fraction and compare sparse vs dense.',
    prompt:
      'online_fraction(elevations_deg, min_elev) = share of samples with elevation ≥ min_elev. Then compare two pre-built sample lists.',
    predict: 'Will dense_elevations have a higher online_fraction than sparse_elevations at min_elev=25°?',
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
    goal: 'Count how many times the serving sat id changes (ignoring None gaps for drops).',
    prompt:
      'count_handoffs(sequence) counts times consecutive non-None serving ids differ. Going offline (None) does not count; coming back to a new sat does.',
    predict: 'In [A, A, B, B, None, C], how many handoffs?',
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
    summary: 'Shortest hop count on a small graph — intuition for ISL routing as a graph problem.',
    goal: 'BFS hop distance between nodes (unweighted).',
    prompt:
      'Given adj adjacency list, hops(start, goal) returns fewest edges or -1 if unreachable. Graph is undirected in the tests.',
    predict: 'On a line A-B-C-D, hops(A,D) is?',
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
