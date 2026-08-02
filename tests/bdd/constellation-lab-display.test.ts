import { expect } from 'vitest'
import { elevationDeg } from '@/sim/coverage'
import { HandoffTracker } from '@/sim/handoff'
import { computeLabFrame } from '@/sim/labFrame'
import { orbitalPeriodSeconds } from '@/sim/orbit'
import { getScenario } from '@/sim/scenarios'
import { feature, scenario, vecNorm } from '@test/support'

/**
 * Product-level contracts for what the constellation lab shows learners.
 */
feature('Constellation lab display accuracy', () => {
  scenario('live stats stay consistent with the geometric model at each sim time', () => {
    const params = getScenario('default')!.params
    const period = orbitalPeriodSeconds(params.altitudeKm)

    for (const t of [0, period * 0.1, period * 0.4, period * 0.7]) {
      const frame = computeLabFrame(params, t)
      const { coverage } = frame

      // Panel: satellite count
      expect(frame.totalSatellites).toBe(params.planes * params.satsPerPlane)

      // Panel: sats in view is count of ids above min elevation
      let recomputed = 0
      for (const s of frame.satellites) {
        if (elevationDeg(frame.userKm, s.position) >= params.minElevationDeg) {
          recomputed += 1
        }
      }
      expect(coverage.satsInView).toBe(recomputed)

      // Drawn sats sit above unit Earth; user on surface
      expect(frame.shellRenderRadius).toBeGreaterThan(1)
      expect(vecNorm(frame.userRender)).toBeCloseTo(1, 9)
      for (const r of frame.renderPositions) {
        expect(vecNorm(r)).toBeCloseTo(frame.shellRenderRadius, 9)
      }

      if (coverage.online) {
        expect(coverage.servingElevationDeg!).toBeGreaterThanOrEqual(params.minElevationDeg)
        expect(frame.footprintRingUnit).not.toBeNull()
        expect(frame.groundTrackSample).not.toBeNull()
      }
    }
  })

  scenario('raising min elevation never increases sats in view', () => {
    const base = getScenario('dense')!.params
    const t = 120
    const low = computeLabFrame({ ...base, minElevationDeg: 10 }, t)
    const high = computeLabFrame({ ...base, minElevationDeg: 40 }, t)
    expect(high.coverage.satsInView).toBeLessThanOrEqual(low.coverage.satsInView)
    expect(high.footprintHalfAngleRad).toBeLessThan(low.footprintHalfAngleRad)
  })

  scenario('handoffs only occur when the serving satellite id actually changes', () => {
    const params = getScenario('sparse')!.params
    const tracker = new HandoffTracker()
    let last: string | null | undefined
    let switches = 0

    for (let t = 0; t <= 3600; t += 5) {
      const frame = computeLabFrame(params, t)
      const id = frame.coverage.servingSatId
      tracker.observe(id, t)
      if (last !== undefined && id !== last && id !== null) {
        // count only gains/switches (same rule as HandoffTracker)
        switches += 1
      }
      // pure drops offline do not increment our switches when going to null
      if (last !== undefined && id !== last && id === null) {
        // no-op for switch count
      }
      last = id
    }

    expect(tracker.count).toBe(switches)
  })

  scenario('after one orbit the constellation configuration repeats (closed circular shell)', () => {
    const params = getScenario('default')!.params
    const period = orbitalPeriodSeconds(params.altitudeKm)
    const a = computeLabFrame(params, 0)
    const b = computeLabFrame(params, period)

    for (let i = 0; i < a.satellites.length; i++) {
      const pa = a.satellites[i]!.position
      const pb = b.satellites[i]!.position
      const d = Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2])
      expect(d).toBeLessThan(0.01) // km — numerical noise only
    }
  })
})
