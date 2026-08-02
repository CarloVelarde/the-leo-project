import { expect } from 'vitest'
import { evaluateCoverage } from '@/sim/coverage'
import { generateConstellation } from '@/sim/constellation'
import { computeInsights } from '@/sim/insights'
import { getScenario } from '@/sim/scenarios'
import { feature, scenario } from '@test/support'

/**
 * Lab product contracts: density, altitude, and scenarios change what learners see.
 */
feature('Lab coverage behavior', () => {
  scenario('a dense shell is online more often than a sparse shell at the same time', () => {
    const sparse = getScenario('sparse')!
    const dense = getScenario('dense')!
    const t = 0

    const sparseCov = evaluateCoverage(
      sparse.params,
      generateConstellation(sparse.params, t),
    )
    const denseCov = evaluateCoverage(
      dense.params,
      generateConstellation(dense.params, t),
    )

    expect(dense.params.planes * dense.params.satsPerPlane).toBeGreaterThan(
      sparse.params.planes * sparse.params.satsPerPlane,
    )
    expect(denseCov.satsInView).toBeGreaterThanOrEqual(sparseCov.satsInView)
    // Default mid-latitude user: dense shell should be online at t=0
    expect(denseCov.online).toBe(true)
  })

  scenario('higher altitude increases free-space latency when a sat is serving', () => {
    const low = getScenario('default')!
    const high = getScenario('high-altitude')!

    const lowInsights = computeInsights(low.params, 0)
    const highInsights = computeInsights(high.params, 0)

    expect(high.params.altitudeKm).toBeGreaterThan(low.params.altitudeKm)
    // When both online, higher shell → longer range → higher one-way light time
    if (lowInsights.coverage.online && highInsights.coverage.online) {
      expect(highInsights.coverage.oneWayLatencyMs!).toBeGreaterThan(
        lowInsights.coverage.oneWayLatencyMs!,
      )
    } else {
      // Still assert the orbital insight the lab panel shows
      expect(highInsights.orbitalPeriodMin).toBeGreaterThan(lowInsights.orbitalPeriodMin)
    }
  })

  scenario('scenario catalog exposes stable ids for the lab presets UI', () => {
    for (const id of ['sparse', 'dense', 'high-altitude', 'high-latitude', 'default'] as const) {
      const s = getScenario(id)
      expect(s, `missing scenario ${id}`).toBeDefined()
      expect(s!.params.planes).toBeGreaterThan(0)
      expect(s!.params.satsPerPlane).toBeGreaterThan(0)
    }
    expect(getScenario('not-a-real-scenario')).toBeUndefined()
  })
})
