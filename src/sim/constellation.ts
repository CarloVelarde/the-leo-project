import type { LabParams, SatelliteState } from './types'
import { EARTH_RADIUS_KM } from './constants'
import { orbitalPeriodSeconds, semiMajorAxisKm } from './orbit'

/**
 * Generate satellite positions for a simple Walker-like shell:
 * evenly spaced planes in RAAN, evenly spaced sats in mean anomaly.
 * Positions are in a simple ECI-like frame (km), circular orbits.
 */
export function generateConstellation(
  params: LabParams,
  timeSeconds: number,
): SatelliteState[] {
  const { planes, satsPerPlane, altitudeKm, inclinationDeg } = params
  const a = semiMajorAxisKm(altitudeKm)
  const period = orbitalPeriodSeconds(altitudeKm)
  const meanMotion = (2 * Math.PI) / period
  const inc = (inclinationDeg * Math.PI) / 180

  const sats: SatelliteState[] = []

  for (let p = 0; p < planes; p++) {
    const raan = (2 * Math.PI * p) / planes
    for (let s = 0; s < satsPerPlane; s++) {
      const phase0 = (2 * Math.PI * s) / satsPerPlane
      // Simple plane phasing offset for more even coverage
      const planePhase = (2 * Math.PI * p) / (planes * satsPerPlane)
      const anomaly = phase0 + planePhase + meanMotion * timeSeconds

      const cosR = Math.cos(raan)
      const sinR = Math.sin(raan)
      const cosI = Math.cos(inc)
      const sinI = Math.sin(inc)
      const cosU = Math.cos(anomaly)
      const sinU = Math.sin(anomaly)

      // PQW → ECI for circular orbit (argument of latitude = anomaly)
      const x = a * (cosR * cosU - sinR * sinU * cosI)
      const y = a * (sinR * cosU + cosR * sinU * cosI)
      const z = a * (sinU * sinI)

      sats.push({
        id: `p${p}-s${s}`,
        planeIndex: p,
        indexInPlane: s,
        position: [x, y, z],
      })
    }
  }

  return sats
}

export function totalSatellites(params: Pick<LabParams, 'planes' | 'satsPerPlane'>): number {
  return params.planes * params.satsPerPlane
}

/** Normalize km ECI position to unit-ish radius for rendering on a unit Earth sphere. */
export function toRenderPosition(
  positionKm: readonly [number, number, number],
  earthRadiusRender = 1,
): [number, number, number] {
  const scale = earthRadiusRender / EARTH_RADIUS_KM
  return [positionKm[0] * scale, positionKm[1] * scale, positionKm[2] * scale]
}
