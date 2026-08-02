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
  {
    id: 'elevation-gate',
    title: 'Elevation gate',
    moduleSlug: 'user-terminal',
    pageId: 'elevation',
    minutes: 12,
    summary: 'Geometric elevation from altitude + ground range — same idea as the lab mask.',
    goal: 'Decide whether a sat is usable above a min elevation.',
    steps: [
      'Implement elev_deg(h_km, ground_range_km) using spherical-Earth geometry (flat toy is OK if documented).',
      'Use: elev = degrees(atan2(h_km, ground_range_km)) as a simple flat-Earth teaching model.',
      'Implement is_visible(h_km, ground_range_km, min_elev) — True if elev >= min_elev.',
      'Run checks for 25° and 40° masks.',
    ],
    success: 'Sat at 550 km over 800 km ground range is visible at 25° but not at 40° (flat model).',
    predict: 'Does raising min elevation make more or fewer ground ranges “online”?',
    starterCode: `${PRELUDE}
def elev_deg(h_km: float, ground_range_km: float) -> float:
    """Simple flat-Earth elevation (deg): atan2(height, ground range)."""
    # TODO: return math.degrees(math.atan2(h_km, ground_range_km))
    raise NotImplementedError

def is_visible(h_km: float, ground_range_km: float, min_elev: float) -> bool:
    """True if elev_deg >= min_elev."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def elev_deg(h_km: float, ground_range_km: float) -> float:
    return math.degrees(math.atan2(h_km, ground_range_km))

def is_visible(h_km: float, ground_range_km: float, min_elev: float) -> bool:
    return elev_deg(h_km, ground_range_km) >= min_elev
`,
    testCode: `
e = elev_deg(550.0, 800.0)
assert 30 < e < 40, f"expected ~34.5°, got {e}"
assert is_visible(550.0, 800.0, 25.0) is True
assert is_visible(550.0, 800.0, 40.0) is False
assert is_visible(550.0, 100.0, 40.0) is True
assert elev_deg(550.0, 0.0) == 90.0
print("CHECK_OK")
print(f"elev(550 km, 800 km ground) ≈ {e:.1f}°")
`,
  },
  {
    id: 'contact-window',
    title: 'Contact windows',
    moduleSlug: 'user-terminal',
    pageId: 'elevation',
    minutes: 12,
    summary: 'From a visibility timeline, measure online samples and contact segments.',
    goal: 'Turn a 0/1 visibility sequence into contact stats (events, not continuous RF).',
    steps: [
      'visibility is a list of 0/1 samples over time (1 = online).',
      'Implement online_fraction(visibility) — mean of the samples (0..1).',
      'Implement count_contacts(visibility) — number of contiguous runs of 1s.',
      'Implement longest_contact(visibility) — length of longest run of 1s (0 if none).',
    ],
    success: 'On [0,1,1,1,0,0,1,1], fraction=5/8, contacts=2, longest=3.',
    predict: 'How many separate contacts in [1,1,0,1,0,1,1,1]?',
    starterCode: `${PRELUDE}
def online_fraction(visibility: list[int]) -> float:
    """Fraction of samples that are 1. Empty → 0.0."""
    # TODO
    raise NotImplementedError

def count_contacts(visibility: list[int]) -> int:
    """Number of contiguous runs of 1s."""
    # TODO
    raise NotImplementedError

def longest_contact(visibility: list[int]) -> int:
    """Length of the longest run of 1s."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def online_fraction(visibility: list[int]) -> float:
    if not visibility:
        return 0.0
    return sum(1 for v in visibility if v) / len(visibility)

def count_contacts(visibility: list[int]) -> int:
    count = 0
    prev = 0
    for v in visibility:
        if v and not prev:
            count += 1
        prev = v
    return count

def longest_contact(visibility: list[int]) -> int:
    best = cur = 0
    for v in visibility:
        if v:
            cur += 1
            best = max(best, cur)
        else:
            cur = 0
    return best
`,
    testCode: `
v = [0, 1, 1, 1, 0, 0, 1, 1]
assert abs(online_fraction(v) - 5 / 8) < 1e-9
assert count_contacts(v) == 2
assert longest_contact(v) == 3
assert online_fraction([]) == 0.0
assert count_contacts([0, 0, 0]) == 0
assert longest_contact([1, 1, 1]) == 3
assert count_contacts([1, 1, 0, 1, 0, 1, 1, 1]) == 3
print("CHECK_OK")
print("contacts:", count_contacts(v), "longest:", longest_contact(v))
`,
  },
  {
    id: 'coverage-mc',
    title: 'Coverage: Monte Carlo sample',
    moduleSlug: 'constellation-design',
    pageId: 'capacity',
    minutes: 15,
    summary: 'Estimate online fraction from random elevation draws — sampling honesty.',
    goal: 'Compare two sample sizes of synthetic elevations against a min elev mask.',
    steps: [
      'online_fraction(elevations, min_elev) as in the sparse/dense exercise.',
      'mc_coverage(seed, n, min_elev) — use the provided draw_elevations(seed, n) helper.',
      'Return fraction online for n samples (synthetic: denser sky → higher elevs).',
      'Run checks: larger n is still in (0, 1]; dense seed beats sparse seed.',
    ],
    success: 'Dense-like seed has higher online fraction than sparse-like seed at 25°.',
    predict: 'Does increasing n change the true sky, or only the estimate stability?',
    starterCode: `${PRELUDE}
import random

def draw_elevations(seed: int, n: int, kind: str) -> list[float]:
    """Synthetic elevations (deg). kind is 'sparse' or 'dense'."""
    rng = random.Random(seed)
    if kind == "dense":
        return [rng.uniform(20, 70) for _ in range(n)]
    return [rng.uniform(-15, 35) for _ in range(n)]

def online_fraction(elevations_deg: list[float], min_elev: float) -> float:
    # TODO
    raise NotImplementedError

def mc_coverage(seed: int, n: int, kind: str, min_elev: float = 25.0) -> float:
    """Online fraction from n synthetic samples."""
    # TODO: elevs = draw_elevations(seed, n, kind); return online_fraction(elevs, min_elev)
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
import random

def draw_elevations(seed: int, n: int, kind: str) -> list[float]:
    rng = random.Random(seed)
    if kind == "dense":
        return [rng.uniform(20, 70) for _ in range(n)]
    return [rng.uniform(-15, 35) for _ in range(n)]

def online_fraction(elevations_deg: list[float], min_elev: float) -> float:
    if not elevations_deg:
        return 0.0
    return sum(1 for e in elevations_deg if e >= min_elev) / len(elevations_deg)

def mc_coverage(seed: int, n: int, kind: str, min_elev: float = 25.0) -> float:
    return online_fraction(draw_elevations(seed, n, kind), min_elev)
`,
    testCode: `
assert abs(online_fraction([0, 10, 30], 25) - 1 / 3) < 1e-9
s = mc_coverage(1, 200, "sparse", 25.0)
d = mc_coverage(1, 200, "dense", 25.0)
assert 0.0 <= s <= 1.0 and 0.0 < d <= 1.0
assert d > s, f"dense should beat sparse, got sparse={s}, dense={d}"
s2 = mc_coverage(1, 50, "sparse", 25.0)
assert 0.0 <= s2 <= 1.0
print("CHECK_OK")
print(f"MC @25° — sparse {s*100:.0f}% · dense {d*100:.0f}% (n=200)")
`,
  },
  {
    id: 'weighted-path',
    title: 'Weighted path delay (Dijkstra)',
    moduleSlug: 'space-network',
    pageId: 'mesh',
    minutes: 15,
    summary: 'Min total edge weight vs hop count — hops ≠ milliseconds.',
    goal: 'Shortest path by delay weight on a tiny sat graph.',
    steps: [
      'Graph: adj maps node → list of (neighbor, weight_ms).',
      'Implement path_delay_ms(adj, start, goal) — Dijkstra; return min total weight.',
      'Return -1.0 if unreachable; 0.0 if start == goal.',
      'Compare with hop-only intuition on the sample mesh.',
    ],
    success: 'On the sample, U→GW min delay is 12 ms (not the 3-hop path).',
    predict: 'Can a path with more hops have lower total delay?',
    starterCode: `${PRELUDE}
import heapq

def path_delay_ms(
    adj: dict[str, list[tuple[str, float]]],
    start: str,
    goal: str,
) -> float:
    """Min sum of edge weights from start to goal, or -1.0 if unreachable."""
    # TODO: Dijkstra with heapq
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
import heapq

def path_delay_ms(
    adj: dict[str, list[tuple[str, float]]],
    start: str,
    goal: str,
) -> float:
    if start == goal:
        return 0.0
    dist = {start: 0.0}
    pq: list[tuple[float, str]] = [(0.0, start)]
    while pq:
        d, node = heapq.heappop(pq)
        if node == goal:
            return d
        if d > dist.get(node, float("inf")):
            continue
        for nb, w in adj.get(node, []):
            nd = d + w
            if nd < dist.get(nb, float("inf")):
                dist[nb] = nd
                heapq.heappush(pq, (nd, nb))
    return -1.0
`,
    testCode: `
# U-S1(5)-GW(7) = 12; U-S1-S2(3)-GW(20) = 28; U-S3(100) long way
mesh = {
    "U": [("S1", 5.0)],
    "S1": [("U", 5.0), ("GW", 7.0), ("S2", 3.0)],
    "S2": [("S1", 3.0), ("GW", 20.0)],
    "S3": [("GW", 1.0)],
    "GW": [("S1", 7.0), ("S2", 20.0), ("S3", 1.0)],
}
assert path_delay_ms(mesh, "U", "U") == 0.0
assert abs(path_delay_ms(mesh, "U", "GW") - 12.0) < 1e-9
assert path_delay_ms(mesh, "U", "S3") == -1.0
# Unreachable
assert path_delay_ms({"A": []}, "A", "Z") == -1.0
# More hops, less delay: A-B-C with light edges vs A-C heavy
g = {"A": [("B", 1.0), ("C", 100.0)], "B": [("A", 1.0), ("C", 1.0)], "C": [("A", 100.0), ("B", 1.0)]}
assert abs(path_delay_ms(g, "A", "C") - 2.0) < 1e-9
print("CHECK_OK")
print("U → GW delay:", path_delay_ms(mesh, "U", "GW"), "ms")
`,
  },
  {
    id: 'sweep-altitude',
    title: 'Parameter sweep: altitude',
    moduleSlug: 'optional-code-path',
    pageId: 'sweep',
    minutes: 12,
    summary: 'Table period and light-time floors across altitudes — sensitivity, not product RTT.',
    goal: 'Return rows of (altitude_km, period_min, one_way_ms) for a list of altitudes.',
    steps: [
      'Reuse period and light-time formulas from earlier exercises.',
      'Implement sweep(altitudes_km) → list of (h, period_minutes, one_way_ms).',
      'one_way_ms uses altitude as distance (nadir toy — same as light-time exercise).',
      'Run checks on [340, 550, 1100].',
    ],
    success: 'Higher altitude → longer period and larger one-way light-time.',
    predict: 'Does 1100 km roughly double 550 km light-time, or less than double?',
    starterCode: `${PRELUDE}
def period_minutes(altitude_km: float) -> float:
    a = EARTH_RADIUS_KM + altitude_km
    return 2 * math.pi * math.sqrt(a**3 / MU_EARTH) / 60.0

def one_way_ms(distance_km: float) -> float:
    return distance_km / C_KM_S * 1000.0

def sweep(altitudes_km: list[float]) -> list[tuple[float, float, float]]:
    """Return [(h, period_min, one_way_ms), ...] for each altitude."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def period_minutes(altitude_km: float) -> float:
    a = EARTH_RADIUS_KM + altitude_km
    return 2 * math.pi * math.sqrt(a**3 / MU_EARTH) / 60.0

def one_way_ms(distance_km: float) -> float:
    return distance_km / C_KM_S * 1000.0

def sweep(altitudes_km: list[float]) -> list[tuple[float, float, float]]:
    return [(h, period_minutes(h), one_way_ms(h)) for h in altitudes_km]
`,
    testCode: `
rows = sweep([340.0, 550.0, 1100.0])
assert len(rows) == 3
assert rows[0][0] == 340.0
assert rows[1][1] < rows[2][1], "period should grow with altitude"
assert rows[0][2] < rows[1][2] < rows[2][2], "light-time should grow with altitude"
assert abs(rows[1][2] - 1.83) < 0.2
print("CHECK_OK")
for h, t, ms in rows:
    print(f"  h={h:.0f} km → T={t:.1f} min · one-way={ms:.2f} ms")
`,
  },
  {
    id: 'isl-from-geometry',
    title: 'ISL graph from geometry',
    moduleSlug: 'space-network',
    pageId: 'mesh',
    minutes: 15,
    summary: 'Build sat-to-sat edges if distance < threshold — graph from geometry, not hand-wiring.',
    goal: 'From 2D positions, return an adjacency dict for unweighted BFS.',
    steps: [
      'positions: dict name → (x, y) in km (toy plane).',
      'Implement dist(a, b) Euclidean.',
      'Implement build_isl_graph(positions, max_range_km) — undirected edges if dist < max_range.',
      'No self-loops. Neighbors can be in any order.',
    ],
    success: 'Three collinear sats at 0, 500, 1000 km with max_range 600 link A-B and B-C only.',
    predict: 'If max_range is 400 km on that line, how many edges?',
    starterCode: `${PRELUDE}
def dist(p: tuple[float, float], q: tuple[float, float]) -> float:
    # TODO
    raise NotImplementedError

def build_isl_graph(
    positions: dict[str, tuple[float, float]],
    max_range_km: float,
) -> dict[str, list[str]]:
    """Undirected graph: edge if 0 < dist < max_range_km."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def dist(p: tuple[float, float], q: tuple[float, float]) -> float:
    return math.hypot(p[0] - q[0], p[1] - q[1])

def build_isl_graph(
    positions: dict[str, tuple[float, float]],
    max_range_km: float,
) -> dict[str, list[str]]:
    names = list(positions.keys())
    g = {n: [] for n in names}
    for i, a in enumerate(names):
        for b in names[i + 1 :]:
            d = dist(positions[a], positions[b])
            if 0 < d < max_range_km:
                g[a].append(b)
                g[b].append(a)
    return g
`,
    testCode: `
pos = {"A": (0.0, 0.0), "B": (500.0, 0.0), "C": (1000.0, 0.0)}
g = build_isl_graph(pos, 600.0)
assert set(g["A"]) == {"B"}
assert set(g["B"]) == {"A", "C"}
assert set(g["C"]) == {"B"}
g2 = build_isl_graph(pos, 400.0)
assert g2["A"] == [] and g2["B"] == [] and g2["C"] == []
assert dist((0, 0), (3, 4)) == 5.0
print("CHECK_OK")
print("graph @600 km:", g)
`,
  },
  {
    id: 'handoff-policy',
    title: 'Handoff policy compare',
    moduleSlug: 'user-terminal',
    pageId: 'handoff',
    minutes: 12,
    summary: 'Sticky vs pick-highest-elev — heuristics, not “the” algorithm.',
    goal: 'Count serving switches under two simple policies on the same elev timeline.',
    steps: [
      'samples: list of dict sat_id → elev_deg (only visible sats; may be empty).',
      'policy_sticky(samples): keep current sat while elev >= 25; else pick max elev sat.',
      'policy_max_elev(samples): always pick sat with highest elev (or None if empty).',
      'Return handoff counts for both (same count_handoffs rule as earlier exercise).',
    ],
    success: 'On the sample timeline, max-elev handoffs >= sticky handoffs.',
    predict: 'Does always chasing the highest elev sat usually hand off more often?',
    starterCode: `${PRELUDE}
MIN_ELEV = 25.0

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

def pick_max(elevs: dict[str, float]) -> str | None:
    if not elevs:
        return None
    return max(elevs.items(), key=lambda kv: kv[1])[0]

def policy_max_elev(samples: list[dict[str, float]]) -> list[str | None]:
    # TODO: each step pick_max(sample)
    raise NotImplementedError

def policy_sticky(samples: list[dict[str, float]]) -> list[str | None]:
    # TODO: keep last while still in sample and elev >= MIN_ELEV; else pick_max
    raise NotImplementedError

def compare_policies(samples: list[dict[str, float]]) -> tuple[int, int]:
    """Return (sticky_handoffs, max_elev_handoffs)."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
MIN_ELEV = 25.0

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

def pick_max(elevs: dict[str, float]) -> str | None:
    if not elevs:
        return None
    return max(elevs.items(), key=lambda kv: kv[1])[0]

def policy_max_elev(samples: list[dict[str, float]]) -> list[str | None]:
    return [pick_max(s) for s in samples]

def policy_sticky(samples: list[dict[str, float]]) -> list[str | None]:
    out: list[str | None] = []
    cur: str | None = None
    for elevs in samples:
        if cur is not None and cur in elevs and elevs[cur] >= MIN_ELEV:
            out.append(cur)
            continue
        cur = pick_max({k: v for k, v in elevs.items() if v >= MIN_ELEV})
        if cur is None:
            cur = pick_max(elevs)
        out.append(cur)
    return out

def compare_policies(samples: list[dict[str, float]]) -> tuple[int, int]:
    return (
        count_handoffs(policy_sticky(samples)),
        count_handoffs(policy_max_elev(samples)),
    )
`,
    testCode: `
samples = [
    {"A": 40.0},
    {"A": 35.0, "B": 50.0},
    {"A": 30.0, "B": 55.0},
    {"B": 40.0},
    {"B": 20.0, "C": 45.0},
]
st, mx = compare_policies(samples)
assert mx >= st, f"max-elev should hand off at least as often, sticky={st}, max={mx}"
assert st >= 1 and mx >= 2
assert count_handoffs(["A", "A", "B"]) == 1
print("CHECK_OK")
print(f"sticky handoffs={st} · max-elev handoffs={mx}")
`,
  },
  {
    id: 'compose-delay-hops',
    title: 'Compose: light-time × hops',
    moduleSlug: 'optional-code-path',
    pageId: 'compose',
    minutes: 12,
    summary: 'Toy end-to-end: one-hop light-time times hop count — not full RF latency.',
    goal: 'Combine d/c with a hop count into a simple path delay estimate.',
    steps: [
      'Implement one_way_ms(distance_km) as in the GEO light-time exercise.',
      'Implement path_delay_ms(distance_km, hops) = one_way_ms(distance_km) * hops.',
      'Implement leo_vs_geo_mesh() — LEO 550 km over 3 hops vs GEO altitude over 2 hops (one-way each hop).',
      'Run checks. Remember: this ignores processing, queues, and non-straight paths.',
    ],
    success: 'LEO 3-hop path delay ≪ GEO 2-hop path delay under pure light-time.',
    predict: 'Is 3 LEO hops at 550 km still much less light-time than 2 GEO hops?',
    starterCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    """One-way light time in milliseconds."""
    # TODO
    raise NotImplementedError

def path_delay_ms(distance_km: float, hops: int) -> float:
    """Toy: one_way_ms * hops (same distance each hop)."""
    # TODO
    raise NotImplementedError

def leo_vs_geo_mesh() -> tuple[float, float]:
    """Return (leo_3hop_ms, geo_2hop_ms) using 550 km and GEO_ALTITUDE_KM."""
    # TODO
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    return distance_km / C_KM_S * 1000.0

def path_delay_ms(distance_km: float, hops: int) -> float:
    return one_way_ms(distance_km) * hops

def leo_vs_geo_mesh() -> tuple[float, float]:
    return path_delay_ms(550.0, 3), path_delay_ms(GEO_ALTITUDE_KM, 2)
`,
    testCode: `
assert abs(one_way_ms(300000) - 1000.0) < 0.01
assert abs(path_delay_ms(300000, 2) - 2000.0) < 0.01
leo, geo = leo_vs_geo_mesh()
assert abs(leo - 3 * 1.834) < 0.2, f"LEO 3-hop expected ~5.5 ms, got {leo}"
assert abs(geo - 2 * 119.37) < 1.0, f"GEO 2-hop expected ~239 ms, got {geo}"
assert leo * 20 < geo, "LEO multi-hop light-time should still beat GEO"
print("CHECK_OK")
print(f"LEO 3 hops ≈ {leo:.2f} ms · GEO 2 hops ≈ {geo:.2f} ms")
`,
  },
  {
    id: 'e2e-light-hops',
    title: 'Capstone: path delay estimate',
    moduleSlug: 'end-to-end',
    pageId: 'lab',
    minutes: 12,
    summary: 'Same toy model as the programmer path — light-time × hops for intuition.',
    goal: 'Estimate pure propagation for a multi-hop path using lab constants.',
    steps: [
      'Implement one_way_ms(distance_km).',
      'Implement path_delay_ms(distance_km, hops).',
      'Return leo_3hop and geo_2hop delays from leo_vs_geo_mesh().',
      'Run checks; note this is a floor, not user-experience RTT.',
    ],
    success: 'Checks match GEO 2-hop ~239 ms light-time vs LEO 3-hop ~5.5 ms.',
    predict: 'Does adding one LEO hop erase the GEO advantage?',
    starterCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    # TODO: distance_km / C_KM_S * 1000
    raise NotImplementedError

def path_delay_ms(distance_km: float, hops: int) -> float:
    # TODO
    raise NotImplementedError

def leo_vs_geo_mesh() -> tuple[float, float]:
    # TODO: (path_delay_ms(550, 3), path_delay_ms(GEO_ALTITUDE_KM, 2))
    raise NotImplementedError
`,
    solutionCode: `${PRELUDE}
def one_way_ms(distance_km: float) -> float:
    return distance_km / C_KM_S * 1000.0

def path_delay_ms(distance_km: float, hops: int) -> float:
    return one_way_ms(distance_km) * hops

def leo_vs_geo_mesh() -> tuple[float, float]:
    return path_delay_ms(550.0, 3), path_delay_ms(GEO_ALTITUDE_KM, 2)
`,
    testCode: `
leo, geo = leo_vs_geo_mesh()
assert abs(path_delay_ms(550.0, 3) - leo) < 1e-9
assert abs(geo - 2 * one_way_ms(GEO_ALTITUDE_KM)) < 1e-9
assert leo < 10 and geo > 200
print("CHECK_OK")
print(f"Toy path delay — LEO×3 ≈ {leo:.2f} ms · GEO×2 ≈ {geo:.2f} ms")
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
