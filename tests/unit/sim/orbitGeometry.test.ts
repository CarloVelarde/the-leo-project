import { describe, expect, it } from 'vitest'
import { EARTH_RADIUS_KM } from '@/sim/constants'
import {
  groundTrackPoint,
  kmToUnit,
  sampleFootprintOnUnitSphere,
  sampleOrbitRingKm,
} from '@/sim/orbitGeometry'
import { semiMajorAxisKm } from '@/sim/orbit'
import { expectNear, expectVecNear, vecNorm } from '@test/support'

describe('sampleOrbitRingKm', () => {
  it('returns the requested sample count on the circular radius a', () => {
    const altitudeKm = 550
    const a = semiMajorAxisKm(altitudeKm)
    const ring = sampleOrbitRingKm(altitudeKm, 53, 0, 48)
    expect(ring).toHaveLength(48)
    for (const p of ring) {
      expectNear(vecNorm(p), a, { relative: 1e-9 })
    }
  })
})

describe('sampleFootprintOnUnitSphere', () => {
  it('places ring points slightly above the unit sphere', () => {
    const satKm = [semiMajorAxisKm(550), 0, 0] as const
    const pts = sampleFootprintOnUnitSphere(satKm, 0.2, 32)
    expect(pts.length).toBe(33) // closed loop: samples + 1
    for (const p of pts) {
      expectNear(vecNorm(p), 1.004, { relative: 1e-6 })
    }
  })
})

describe('kmToUnit', () => {
  it('scales Earth-radius vectors to unit length', () => {
    const unit = kmToUnit([EARTH_RADIUS_KM, 0, 0])
    expectVecNear(unit, [1, 0, 0])
  })
})

describe('groundTrackPoint', () => {
  it('projects the sat onto the unit sphere at the given height', () => {
    const satKm = [0, 0, semiMajorAxisKm(550)] as const
    const g = groundTrackPoint(satKm, 1.006)
    expectVecNear(g, [0, 0, 1.006], { absolute: 1e-9 })
  })
})
