import { describe, expect, it } from 'vitest'
import { EARTH_RADIUS_KM } from '@/sim/constants'
import {
  elevationDeg,
  evaluateCoverage,
  footprintHalfAngleRad,
  userPositionKm,
} from '@/sim/coverage'
import { oneWayLightTimeMs, semiMajorAxisKm } from '@/sim/orbit'
import {
  expectNear,
  expectVecNear,
  labParams,
  sat,
  vecNorm,
} from '@test/support'

/** User on the equator at lon 0 → ECEF ≈ (R, 0, 0). */
const EQUATOR_USER = userPositionKm(0, 0)

describe('userPositionKm', () => {
  it('places equator lon 0 on +X at Earth radius', () => {
    expectNear(vecNorm(EQUATOR_USER), EARTH_RADIUS_KM)
    expectVecNear(EQUATOR_USER, [EARTH_RADIUS_KM, 0, 0], { absolute: 1e-6 })
  })

  it('places the north pole on +Z', () => {
    const north = userPositionKm(90, 0)
    expectVecNear(north, [0, 0, EARTH_RADIUS_KM], { absolute: 1e-6 })
  })

  it('preserves radius for mid-latitude users', () => {
    expectNear(vecNorm(userPositionKm(40, -74)), EARTH_RADIUS_KM)
  })
})

describe('elevationDeg', () => {
  it('is ~90° for a satellite directly above the equator user', () => {
    const zenith = sat('zenith', [EARTH_RADIUS_KM + 550, 0, 0])
    expectNear(elevationDeg(EQUATOR_USER, zenith.position), 90, { absolute: 1e-4 })
  })

  it('is negative when the satellite is on the far side of Earth', () => {
    const farSide = sat('far', [-EARTH_RADIUS_KM - 550, 0, 0])
    expect(elevationDeg(EQUATOR_USER, farSide.position)).toBeLessThan(0)
  })

  it('returns -90 when sat and user coincide (degenerate LOS)', () => {
    expect(elevationDeg(EQUATOR_USER, EQUATOR_USER)).toBe(-90)
  })
})

describe('evaluateCoverage', () => {
  const base = labParams({
    userLatDeg: 0,
    userLonDeg: 0,
    minElevationDeg: 25,
  })

  it('is offline with empty constellation', () => {
    const snap = evaluateCoverage(base, [])
    expect(snap.online).toBe(false)
    expect(snap.satsInView).toBe(0)
    expect(snap.servingSatId).toBeNull()
    expect(snap.oneWayLatencyMs).toBeNull()
    expect(snap.rangeKm).toBeNull()
  })

  it('serves the highest-elevation in-view satellite', () => {
    const high = sat('high', [EARTH_RADIUS_KM + 550, 0, 0])
    // Offset so elev is positive but lower than zenith
    const lower = sat('lower', [EARTH_RADIUS_KM + 550, 800, 0])
    const snap = evaluateCoverage(base, [lower, high])

    expect(snap.online).toBe(true)
    expect(snap.servingSatId).toBe('high')
    expect(snap.satsInView).toBe(2)
    expect(snap.inViewIds).toEqual(expect.arrayContaining(['high', 'lower']))
    expect(snap.servingElevationDeg).toBeGreaterThan(80)
    expectNear(snap.rangeKm!, 550, { relative: 1e-4 })
    expectNear(snap.oneWayLatencyMs!, oneWayLightTimeMs(snap.rangeKm!))
  })

  it('ignores satellites below min elevation', () => {
    const below = sat('low', [-EARTH_RADIUS_KM - 400, 0, 0])
    const snap = evaluateCoverage(base, [below])
    expect(snap.online).toBe(false)
    expect(snap.satsInView).toBe(0)
  })

  it('breaks elevation ties by shorter slant range', () => {
    // Two sats along the same radial ray: same elev ~90°, closer wins
    const far = sat('far', [EARTH_RADIUS_KM + 900, 0, 0])
    const near = sat('near', [EARTH_RADIUS_KM + 500, 0, 0])
    const snap = evaluateCoverage(base, [far, near])
    expect(snap.servingSatId).toBe('near')
    expect(snap.rangeKm!).toBeLessThan(600)
  })

  it('raises the bar when minElevationDeg is stricter', () => {
    // Moderately elevated sat — in view at 10° min elev, out at 80°
    const angled = sat('angled', [EARTH_RADIUS_KM + 400, 1200, 0])
    const elev = elevationDeg(EQUATOR_USER, angled.position)
    expect(elev).toBeGreaterThan(10)
    expect(elev).toBeLessThan(80)

    const loose = evaluateCoverage({ ...base, minElevationDeg: 10 }, [angled])
    const strict = evaluateCoverage({ ...base, minElevationDeg: 80 }, [angled])
    expect(loose.online).toBe(true)
    expect(strict.online).toBe(false)
  })
})

describe('footprintHalfAngleRad', () => {
  it('is larger at higher altitude for the same min elevation', () => {
    const low = footprintHalfAngleRad(400, 25)
    const high = footprintHalfAngleRad(1100, 25)
    expect(high).toBeGreaterThan(low)
    expect(low).toBeGreaterThan(0)
  })

  it('shrinks when minimum elevation increases', () => {
    const open = footprintHalfAngleRad(550, 10)
    const tight = footprintHalfAngleRad(550, 40)
    expect(open).toBeGreaterThan(tight)
  })

  it('matches the geometric formula λ = arccos((R/a) cos ε) − ε', () => {
    const altitudeKm = 550
    const minElevationDeg = 25
    const a = semiMajorAxisKm(altitudeKm)
    const el = (minElevationDeg * Math.PI) / 180
    const expected = Math.acos((EARTH_RADIUS_KM / a) * Math.cos(el)) - el
    expectNear(footprintHalfAngleRad(altitudeKm, minElevationDeg), expected)
  })
})
