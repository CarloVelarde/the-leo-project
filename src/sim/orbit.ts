import { C_KM_S, EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from './constants'

/** Semi-major axis for a circular orbit at altitude h (km). */
export function semiMajorAxisKm(altitudeKm: number): number {
  return EARTH_RADIUS_KM + altitudeKm
}

/**
 * Orbital period for a circular Keplerian orbit (seconds).
 * T = 2π √(a³ / μ)
 */
export function orbitalPeriodSeconds(altitudeKm: number): number {
  const a = semiMajorAxisKm(altitudeKm)
  return 2 * Math.PI * Math.sqrt((a * a * a) / MU_EARTH_KM3_S2)
}

export function orbitalPeriodMinutes(altitudeKm: number): number {
  return orbitalPeriodSeconds(altitudeKm) / 60
}

/** Circular orbit speed (km/s). */
export function orbitalSpeedKms(altitudeKm: number): number {
  const a = semiMajorAxisKm(altitudeKm)
  return Math.sqrt(MU_EARTH_KM3_S2 / a)
}

/** One-way light time for a straight-line distance (ms). */
export function oneWayLightTimeMs(distanceKm: number): number {
  return (distanceKm / C_KM_S) * 1000
}

/**
 * Approximate slant range to a sat at altitude h when elevation = 90° (nadir).
 * For v1 insight panel; full geometry lives in coverage.ts later.
 */
export function nadirDistanceKm(altitudeKm: number): number {
  return altitudeKm
}
