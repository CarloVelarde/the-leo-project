import { evaluateCoverage } from './coverage'
import { generateConstellation, totalSatellites } from './constellation'
import { orbitalPeriodMinutes, orbitalSpeedKms } from './orbit'
import type { LabParams, SimInsights } from './types'

export function computeInsights(params: LabParams, timeSeconds = 0): SimInsights {
  const sats = generateConstellation(params, timeSeconds)
  return {
    orbitalPeriodMin: orbitalPeriodMinutes(params.altitudeKm),
    orbitalSpeedKms: orbitalSpeedKms(params.altitudeKm),
    totalSatellites: totalSatellites(params),
    coverage: evaluateCoverage(params, sats),
  }
}
