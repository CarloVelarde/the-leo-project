import { describe, expect, it } from 'vitest'
import { generateConstellation, totalSatellites } from '@/sim/constellation'
import { semiMajorAxisKm } from '@/sim/orbit'
import { expectNear, labParams, vecDistance, vecNorm } from '@test/support'

describe('totalSatellites', () => {
  it('is planes × sats per plane', () => {
    expect(totalSatellites({ planes: 12, satsPerPlane: 20 })).toBe(240)
  })
})

describe('generateConstellation', () => {
  const params = labParams({
    planes: 3,
    satsPerPlane: 4,
    altitudeKm: 550,
    inclinationDeg: 53,
  })

  it('emits the expected count of unique ids', () => {
    const sats = generateConstellation(params, 0)
    expect(sats).toHaveLength(totalSatellites(params))
    const ids = new Set(sats.map((s) => s.id))
    expect(ids.size).toBe(sats.length)
  })

  it('places every sat on the circular shell radius a = R_e + h', () => {
    const a = semiMajorAxisKm(params.altitudeKm)
    for (const s of generateConstellation(params, 0)) {
      expectNear(vecNorm(s.position), a, { relative: 1e-9 })
    }
  })

  it('tags plane and index metadata consistently', () => {
    const sats = generateConstellation(params, 0)
    for (const s of sats) {
      expect(s.id).toBe(`p${s.planeIndex}-s${s.indexInPlane}`)
      expect(s.planeIndex).toBeGreaterThanOrEqual(0)
      expect(s.planeIndex).toBeLessThan(params.planes)
      expect(s.indexInPlane).toBeGreaterThanOrEqual(0)
      expect(s.indexInPlane).toBeLessThan(params.satsPerPlane)
    }
  })

  it('advances positions with time (mean motion)', () => {
    const t0 = generateConstellation(params, 0)
    const t1 = generateConstellation(params, 600)
    let moved = 0
    for (let i = 0; i < t0.length; i++) {
      if (vecDistance(t0[i]!.position, t1[i]!.position) > 1) moved += 1
    }
    expect(moved).toBe(t0.length)
  })

  it('keeps equatorial inclination in the XY plane (z ≈ 0)', () => {
    const equatorial = labParams({
      planes: 2,
      satsPerPlane: 3,
      altitudeKm: 550,
      inclinationDeg: 0,
    })
    for (const s of generateConstellation(equatorial, 0)) {
      expectNear(s.position[2], 0, { absolute: 1e-6 })
    }
  })
})
