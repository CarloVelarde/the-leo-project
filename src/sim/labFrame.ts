/**
 * Pure lab frame — single source of truth for constellation + coverage +
 * display-scale geometry. LabCore (WebGL) and tests both consume this so
 * what the UI draws cannot drift from the model.
 */
import { EARTH_RADIUS_KM } from './constants'
import { generateConstellation, toRenderPosition, totalSatellites } from './constellation'
import {
  evaluateCoverage,
  footprintHalfAngleRad,
  userPositionKm,
} from './coverage'
import {
  buildFootprintDisc,
  groundTrackPoint,
  sampleFootprintOnUnitSphere,
} from './orbitGeometry'
import { orbitalPeriodMinutes, orbitalSpeedKms, semiMajorAxisKm } from './orbit'
import type { CoverageSnapshot, LabParams, SatelliteState } from './types'

/** Default footprint tessellation — matches LabCore / OrbitRings fidelity. */
export const LAB_FOOTPRINT_SAMPLES = 64

export type LabFrame = {
  simTimeSeconds: number
  satellites: SatelliteState[]
  /** Unit-Earth render positions, parallel to `satellites`. */
  renderPositions: [number, number, number][]
  coverage: CoverageSnapshot
  userKm: [number, number, number]
  userRender: [number, number, number]
  /** Geometric half-angle of the visibility footprint (always defined). */
  footprintHalfAngleRad: number
  /** Closed footprint ring on the unit sphere when online; else null. */
  footprintRingUnit: [number, number, number][] | null
  footprintDisc: { positions: Float32Array; indices: Uint16Array } | null
  /** Sub-satellite ground-track sample when online; else null. */
  groundTrackSample: [number, number, number] | null
  /** Circular shell radius in unit-Earth coordinates (a / R_e). */
  shellRenderRadius: number
  orbitalPeriodMin: number
  orbitalSpeedKms: number
  totalSatellites: number
}

export type LabFrameOptions = {
  footprintSamples?: number
}

/**
 * Build one simulation frame at `timeSeconds` (sim clock, not wall clock).
 * This is what the constellation lab displays for sats, link, footprint, and stats.
 */
export function computeLabFrame(
  params: LabParams,
  timeSeconds: number,
  options: LabFrameOptions = {},
): LabFrame {
  const footprintSamples = options.footprintSamples ?? LAB_FOOTPRINT_SAMPLES
  const satellites = generateConstellation(params, timeSeconds)
  const coverage = evaluateCoverage(params, satellites)
  const userKm = userPositionKm(params.userLatDeg, params.userLonDeg)
  const userRender = toRenderPosition(userKm)
  const renderPositions = satellites.map((s) => toRenderPosition(s.position))
  const half = footprintHalfAngleRad(params.altitudeKm, params.minElevationDeg)
  const shellRenderRadius = semiMajorAxisKm(params.altitudeKm) / EARTH_RADIUS_KM

  let footprintRingUnit: [number, number, number][] | null = null
  let footprintDisc: { positions: Float32Array; indices: Uint16Array } | null = null
  let groundTrackSample: [number, number, number] | null = null

  if (coverage.online && coverage.servingPositionKm) {
    footprintRingUnit = sampleFootprintOnUnitSphere(
      coverage.servingPositionKm,
      half,
      footprintSamples,
    )
    footprintDisc = buildFootprintDisc(
      coverage.servingPositionKm,
      half,
      footprintSamples,
    )
    groundTrackSample = groundTrackPoint(coverage.servingPositionKm)
  }

  return {
    simTimeSeconds: timeSeconds,
    satellites,
    renderPositions,
    coverage,
    userKm,
    userRender,
    footprintHalfAngleRad: half,
    footprintRingUnit,
    footprintDisc,
    groundTrackSample,
    shellRenderRadius,
    orbitalPeriodMin: orbitalPeriodMinutes(params.altitudeKm),
    orbitalSpeedKms: orbitalSpeedKms(params.altitudeKm),
    totalSatellites: satellites.length,
  }
}

/** Fleet size the lab allocates for instancing (never zero). */
export function labInstanceCount(params: LabParams): number {
  return Math.max(1, totalSatellites(params))
}
