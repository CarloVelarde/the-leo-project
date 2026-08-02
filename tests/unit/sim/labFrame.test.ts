import { describe, expect, it } from 'vitest'
import { EARTH_RADIUS_KM } from '@/sim/constants'
import { elevationDeg, userPositionKm } from '@/sim/coverage'
import { toRenderPosition } from '@/sim/constellation'
import { computeLabFrame, labInstanceCount } from '@/sim/labFrame'
import { oneWayLightTimeMs, semiMajorAxisKm } from '@/sim/orbit'
import { sampleOrbitRingKm } from '@/sim/orbitGeometry'
import {
  centralAngleRad,
  expectNear,
  expectVecNear,
  independentElevationDeg,
  independentFootprintHalfAngleRad,
  labParams,
  LEO_SHELL_550,
  vecNorm,
} from '@test/support'

describe('computeLabFrame — display contracts', () => {
  const params = labParams({
    planes: 12,
    satsPerPlane: 20,
    altitudeKm: 550,
    inclinationDeg: 53,
    minElevationDeg: 25,
    userLatDeg: 40,
    userLonDeg: -74,
  })

  it('draws satellites on a shell above the unit Earth sphere', () => {
    const frame = computeLabFrame(params, 0)
    const expectedR = semiMajorAxisKm(params.altitudeKm) / EARTH_RADIUS_KM
    expectNear(frame.shellRenderRadius, expectedR)
    expect(frame.shellRenderRadius).toBeGreaterThan(1)

    for (const r of frame.renderPositions) {
      expectNear(vecNorm(r), frame.shellRenderRadius, { relative: 1e-9 })
    }
  })

  it('places the user marker on the unit sphere surface', () => {
    const frame = computeLabFrame(params, 0)
    expectNear(vecNorm(frame.userRender), 1, { absolute: 1e-9 })
    expectVecNear(frame.userRender, toRenderPosition(frame.userKm))
  })

  it('keeps render scale consistent: render = km / R_e', () => {
    const frame = computeLabFrame(params, 0)
    for (let i = 0; i < frame.satellites.length; i++) {
      const km = frame.satellites[i]!.position
      const render = frame.renderPositions[i]!
      expectVecNear(render, [km[0] / EARTH_RADIUS_KM, km[1] / EARTH_RADIUS_KM, km[2] / EARTH_RADIUS_KM])
    }
  })

  it('matches independent elevation for every satellite', () => {
    const frame = computeLabFrame(params, 42)
    const user = frame.userKm
    for (const s of frame.satellites) {
      const app = elevationDeg(user, s.position)
      const indep = independentElevationDeg(user, s.position)
      expectNear(app, indep, { absolute: 1e-9 })
    }
  })

  it('inViewIds and serving sat agree with the elevation mask', () => {
    const frame = computeLabFrame(params, 0)
    const { coverage } = frame
    const user = frame.userKm
    const inView = new Set(coverage.inViewIds)

    for (const s of frame.satellites) {
      const elev = elevationDeg(user, s.position)
      if (elev >= params.minElevationDeg) {
        expect(inView.has(s.id), `${s.id} elev ${elev} should be in view`).toBe(true)
      } else {
        expect(inView.has(s.id), `${s.id} elev ${elev} should be out of view`).toBe(false)
      }
    }

    expect(coverage.satsInView).toBe(coverage.inViewIds.length)

    if (coverage.online) {
      expect(coverage.servingSatId).not.toBeNull()
      expect(inView.has(coverage.servingSatId!)).toBe(true)
      expect(coverage.servingElevationDeg!).toBeGreaterThanOrEqual(params.minElevationDeg)
      // Serving has max elevation among in-view
      for (const s of frame.satellites) {
        if (!inView.has(s.id)) continue
        const elev = elevationDeg(user, s.position)
        expect(elev).toBeLessThanOrEqual(coverage.servingElevationDeg! + 1e-9)
      }
      expectNear(
        coverage.oneWayLatencyMs!,
        oneWayLightTimeMs(coverage.rangeKm!),
      )
    } else {
      expect(coverage.servingSatId).toBeNull()
      expect(coverage.rangeKm).toBeNull()
      expect(coverage.oneWayLatencyMs).toBeNull()
    }
  })

  it('uses footprint half-angle from the geometric visibility formula', () => {
    const frame = computeLabFrame(params, 0)
    const a = semiMajorAxisKm(params.altitudeKm)
    const expected = independentFootprintHalfAngleRad(
      EARTH_RADIUS_KM,
      a,
      params.minElevationDeg,
    )
    expectNear(frame.footprintHalfAngleRad, expected)
  })

  it('when online, footprint ring sits on the unit sphere at angle λ from SSP', () => {
    // Prefer a frame that is online; scan a few times if needed
    let frame = computeLabFrame(params, 0)
    if (!frame.coverage.online) {
      for (let t = 0; t < 6000; t += 30) {
        frame = computeLabFrame(params, t)
        if (frame.coverage.online) break
      }
    }
    expect(frame.coverage.online).toBe(true)
    expect(frame.footprintRingUnit).not.toBeNull()
    expect(frame.groundTrackSample).not.toBeNull()

    const ssp = frame.coverage.servingPositionKm!
    const half = frame.footprintHalfAngleRad
    const ring = frame.footprintRingUnit!

    for (const p of ring) {
      expectNear(vecNorm(p), 1.004, { relative: 1e-5 })
      // Direction from Earth center to ring point makes angle ≈ half with SSP
      const angle = centralAngleRad(ssp, [p[0], p[1], p[2]])
      expectNear(angle, half, { absolute: 2e-3 })
    }

    // Ground track is sub-satellite, slightly above unit sphere
    const gt = frame.groundTrackSample!
    expectNear(vecNorm(gt), 1.006, { absolute: 1e-9 })
    expectNear(centralAngleRad(ssp, gt), 0, { absolute: 1e-9 })
  })

  it('footprint disc center lies along the serving-sat radial', () => {
    const frame = computeLabFrame(LEO_SHELL_550, 0)
    if (!frame.coverage.online || !frame.footprintDisc) return

    const ssp = frame.coverage.servingPositionKm!
    const cx = frame.footprintDisc.positions[0]!
    const cy = frame.footprintDisc.positions[1]!
    const cz = frame.footprintDisc.positions[2]!
    expectNear(centralAngleRad(ssp, [cx, cy, cz]), 0, { absolute: 1e-6 })
    expect(frame.footprintDisc.indices.length).toBe(64 * 3)
  })

  it('orbit rings share the shell radius and plane normals with the constellation', () => {
    const frame = computeLabFrame(params, 0)
    for (let p = 0; p < params.planes; p++) {
      const raan = (2 * Math.PI * p) / params.planes
      const ringKm = sampleOrbitRingKm(params.altitudeKm, params.inclinationDeg, raan, 48)
      for (const pt of ringKm) {
        expectNear(vecNorm(toRenderPosition(pt)), frame.shellRenderRadius, {
          relative: 1e-9,
        })
      }
    }
  })

  it('insight numbers match the frame fields the panel displays', () => {
    const frame = computeLabFrame(params, 100)
    expect(frame.totalSatellites).toBe(params.planes * params.satsPerPlane)
    expect(frame.totalSatellites).toBe(frame.satellites.length)
    expect(labInstanceCount(params)).toBe(frame.totalSatellites)
    expect(frame.orbitalPeriodMin).toBeGreaterThan(90)
    expect(frame.orbitalPeriodMin).toBeLessThan(100)
    expect(frame.orbitalSpeedKms).toBeGreaterThan(7)
    expect(frame.orbitalSpeedKms).toBeLessThan(8)
  })

  it('user lat/lon mapping matches the marker used in the scene', () => {
    const frame = computeLabFrame(params, 0)
    expectVecNear(frame.userKm, userPositionKm(params.userLatDeg, params.userLonDeg))
  })
})

describe('computeLabFrame — offline / sparse edge', () => {
  it('hides footprint and ground track when no sat is in view', () => {
    const sparse = labParams({
      planes: 1,
      satsPerPlane: 1,
      altitudeKm: 550,
      inclinationDeg: 53,
      minElevationDeg: 45,
      // Antipode-ish user relative to a single mid-latitude shell often offline
      userLatDeg: -70,
      userLonDeg: 120,
    })
    // Search for an offline sample
    let offline = false
    for (let t = 0; t < 8000; t += 60) {
      const frame = computeLabFrame(sparse, t)
      if (!frame.coverage.online) {
        offline = true
        expect(frame.footprintRingUnit).toBeNull()
        expect(frame.footprintDisc).toBeNull()
        expect(frame.groundTrackSample).toBeNull()
        expect(frame.coverage.satsInView).toBe(0)
        break
      }
    }
    expect(offline).toBe(true)
  })
})
