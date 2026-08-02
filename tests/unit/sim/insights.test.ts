import { describe, expect, it } from 'vitest'
import { totalSatellites } from '@/sim/constellation'
import { computeInsights } from '@/sim/insights'
import { orbitalPeriodMinutes, orbitalSpeedKms } from '@/sim/orbit'
import { labParams } from '@test/support'

describe('computeInsights', () => {
  it('composes period, speed, fleet size, and coverage for a lab snapshot', () => {
    const params = labParams({
      planes: 6,
      satsPerPlane: 10,
      altitudeKm: 550,
      userLatDeg: 0,
      userLonDeg: 0,
    })
    const insights = computeInsights(params, 0)

    expect(insights.totalSatellites).toBe(totalSatellites(params))
    expect(insights.orbitalPeriodMin).toBe(orbitalPeriodMinutes(params.altitudeKm))
    expect(insights.orbitalSpeedKms).toBe(orbitalSpeedKms(params.altitudeKm))
    expect(insights.coverage.satsInView).toBeGreaterThanOrEqual(0)
    expect(typeof insights.coverage.online).toBe('boolean')
  })
})
