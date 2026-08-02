import { describe, expect, it } from 'vitest'
import { C_KM_S, EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from '@/sim/constants'
import {
  oneWayLightTimeMs,
  orbitalPeriodMinutes,
  orbitalPeriodSeconds,
  orbitalSpeedKms,
} from '@/sim/orbit'
import { expectNear } from '@test/support'

/** Independent Kepler evaluation for a circular orbit (not imported from app). */
function keplerPeriodSeconds(altitudeKm: number): number {
  const a = EARTH_RADIUS_KM + altitudeKm
  return 2 * Math.PI * Math.sqrt((a * a * a) / MU_EARTH_KM3_S2)
}

function keplerSpeedKms(altitudeKm: number): number {
  const a = EARTH_RADIUS_KM + altitudeKm
  return Math.sqrt(MU_EARTH_KM3_S2 / a)
}

describe('orbitalPeriodSeconds', () => {
  it('matches circular Kepler period at LEO 550 km', () => {
    const altitudeKm = 550
    expectNear(orbitalPeriodSeconds(altitudeKm), keplerPeriodSeconds(altitudeKm))
  })

  it('increases with altitude (LEO vs GEO-like)', () => {
    expect(orbitalPeriodSeconds(550)).toBeLessThan(orbitalPeriodSeconds(35_786))
  })

  it('is about 95–96 minutes at 550 km (pedagogical LEO ballpark)', () => {
    const minutes = orbitalPeriodMinutes(550)
    expect(minutes).toBeGreaterThan(95)
    expect(minutes).toBeLessThan(97)
  })
})

describe('orbitalSpeedKms', () => {
  it('matches circular Kepler speed at 550 km', () => {
    expectNear(orbitalSpeedKms(550), keplerSpeedKms(550))
  })

  it('is slower at higher altitude', () => {
    expect(orbitalSpeedKms(550)).toBeGreaterThan(orbitalSpeedKms(1200))
  })
})

describe('oneWayLightTimeMs', () => {
  it('is distance / c in milliseconds', () => {
    const distanceKm = 550
    expectNear(oneWayLightTimeMs(distanceKm), (distanceKm / C_KM_S) * 1000)
  })

  it('scales linearly with range', () => {
    expectNear(oneWayLightTimeMs(1000), 2 * oneWayLightTimeMs(500))
  })
})
