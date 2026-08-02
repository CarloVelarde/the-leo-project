import { describe, expect, it } from 'vitest'
import { EARTH_RADIUS_KM } from '@/sim/constants'
import { generateConstellation } from '@/sim/constellation'
import { orbitalPeriodSeconds, semiMajorAxisKm } from '@/sim/orbit'
import {
  dot3,
  expectNear,
  expectVecNear,
  labParams,
  orbitalPlaneNormal,
  vecDistance,
  vecNorm,
} from '@test/support'

describe('constellation orbital geometry (rigorous)', () => {
  const params = labParams({
    planes: 6,
    satsPerPlane: 8,
    altitudeKm: 550,
    inclinationDeg: 53,
  })

  it('returns to the same positions after one orbital period', () => {
    const period = orbitalPeriodSeconds(params.altitudeKm)
    const t0 = generateConstellation(params, 0)
    const tT = generateConstellation(params, period)
    expect(t0).toHaveLength(tT.length)
    for (let i = 0; i < t0.length; i++) {
      expectVecNear(tT[i]!.position, t0[i]!.position, { absolute: 1e-4 })
    }
  })

  it('advances ~90° of true anomaly after a quarter period', () => {
    const period = orbitalPeriodSeconds(params.altitudeKm)
    const a = semiMajorAxisKm(params.altitudeKm)
    const t0 = generateConstellation(params, 0)
    const tQ = generateConstellation(params, period / 4)
    // Chord length for 90° on circle of radius a is a√2
    const expectedChord = a * Math.SQRT2
    for (let i = 0; i < t0.length; i++) {
      expectNear(vecDistance(t0[i]!.position, tQ[i]!.position), expectedChord, {
        relative: 1e-5,
      })
    }
  })

  it('respects inclination: |z| ≤ a sin(i) and reaches near that envelope', () => {
    const a = semiMajorAxisKm(params.altitudeKm)
    const sinI = Math.sin((params.inclinationDeg * Math.PI) / 180)
    const zMax = a * sinI
    let maxAbsZ = 0
    // Sample over half a period so anomalies cover the orbit
    const period = orbitalPeriodSeconds(params.altitudeKm)
    for (const t of [0, period * 0.15, period * 0.35, period * 0.55, period * 0.75]) {
      for (const s of generateConstellation(params, t)) {
        expect(Math.abs(s.position[2])).toBeLessThanOrEqual(zMax + 1e-6)
        maxAbsZ = Math.max(maxAbsZ, Math.abs(s.position[2]))
      }
    }
    // With many sats/times, envelope should be nearly reached
    expect(maxAbsZ).toBeGreaterThan(0.9 * zMax)
  })

  it('keeps each plane coplanar with classical ĥ(Ω, i)', () => {
    const inc = (params.inclinationDeg * Math.PI) / 180
    const sats = generateConstellation(params, 123)
    for (let p = 0; p < params.planes; p++) {
      const raan = (2 * Math.PI * p) / params.planes
      const h = orbitalPlaneNormal(raan, inc)
      const planeSats = sats.filter((s) => s.planeIndex === p)
      expect(planeSats.length).toBe(params.satsPerPlane)
      for (const s of planeSats) {
        // r · ĥ = 0 for circular orbit in that plane
        expectNear(dot3(s.position, h), 0, { absolute: 1e-5 })
      }
    }
  })

  it('spaces RAAN evenly around the equator for successive planes', () => {
    // Sub-satellite longitudes at t=0 for first sat of each plane differ by 360°/planes
    // Use plane normals' equatorial projections as RAAN check
    const inc = (params.inclinationDeg * Math.PI) / 180
    const angles: number[] = []
    for (let p = 0; p < params.planes; p++) {
      const raan = (2 * Math.PI * p) / params.planes
      const h = orbitalPlaneNormal(raan, inc)
      angles.push(Math.atan2(h[0], -h[1])) // recovers Ω
    }
    const step = (2 * Math.PI) / params.planes
    for (let p = 1; p < params.planes; p++) {
      let d = angles[p]! - angles[0]!
      while (d < 0) d += 2 * Math.PI
      while (d >= 2 * Math.PI) d -= 2 * Math.PI
      expectNear(d, p * step, { absolute: 1e-9 })
    }
  })

  it('places the shell outside Earth (a > R_e)', () => {
    const a = semiMajorAxisKm(params.altitudeKm)
    expect(a).toBeGreaterThan(EARTH_RADIUS_KM)
    for (const s of generateConstellation(params, 0)) {
      expect(vecNorm(s.position)).toBeGreaterThan(EARTH_RADIUS_KM)
    }
  })
})
