/** Physical and model constants (SI-friendly where noted). */

/** Earth mean radius (km) */
export const EARTH_RADIUS_KM = 6371

/** Earth gravitational parameter μ (km³/s²) */
export const MU_EARTH_KM3_S2 = 398600.4418

/** Speed of light (km/s) */
export const C_KM_S = 299_792.458

/** GEO altitude approximation (km) */
export const GEO_ALTITUDE_KM = 35_786

/** Default lab parameters for a pedagogical LEO shell */
export const DEFAULT_LAB_PARAMS = {
  planes: 12,
  satsPerPlane: 20,
  altitudeKm: 550,
  inclinationDeg: 53,
  minElevationDeg: 25,
  userLatDeg: 40,
  userLonDeg: -74,
  timeScale: 60,
} as const

/** Safe control ranges for the lab UI */
export const LAB_PARAM_RANGES = {
  planes: { min: 1, max: 72, step: 1 },
  satsPerPlane: { min: 1, max: 80, step: 1 },
  altitudeKm: { min: 300, max: 1200, step: 10 },
  inclinationDeg: { min: 0, max: 90, step: 1 },
  minElevationDeg: { min: 10, max: 50, step: 1 },
  userLatDeg: { min: -80, max: 80, step: 1 },
  userLonDeg: { min: -180, max: 180, step: 1 },
  timeScale: { min: 1, max: 600, step: 1 },
} as const
