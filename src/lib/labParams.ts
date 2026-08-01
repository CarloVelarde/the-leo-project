import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import type { LabParams } from '@/sim/types'

/** Parse lab params from URLSearchParams (shareable lab states). */
export function labParamsFromSearch(search: string): LabParams {
  const q = new URLSearchParams(search)
  const num = (key: string, fallback: number) => {
    const v = q.get(key)
    if (v === null || v === '') return fallback
    const n = Number(v)
    return Number.isFinite(n) ? n : fallback
  }

  return {
    planes: num('planes', DEFAULT_LAB_PARAMS.planes),
    satsPerPlane: num('sats', DEFAULT_LAB_PARAMS.satsPerPlane),
    altitudeKm: num('alt', DEFAULT_LAB_PARAMS.altitudeKm),
    inclinationDeg: num('inc', DEFAULT_LAB_PARAMS.inclinationDeg),
    minElevationDeg: num('elev', DEFAULT_LAB_PARAMS.minElevationDeg),
    userLatDeg: num('lat', DEFAULT_LAB_PARAMS.userLatDeg),
    userLonDeg: num('lon', DEFAULT_LAB_PARAMS.userLonDeg),
    timeScale: num('speed', DEFAULT_LAB_PARAMS.timeScale),
  }
}

export function labParamsToSearch(params: LabParams): string {
  const q = new URLSearchParams({
    planes: String(params.planes),
    sats: String(params.satsPerPlane),
    alt: String(params.altitudeKm),
    inc: String(params.inclinationDeg),
    elev: String(params.minElevationDeg),
    lat: String(params.userLatDeg),
    lon: String(params.userLonDeg),
    speed: String(params.timeScale),
  })
  return q.toString()
}

export function labPath(params: Partial<LabParams> = {}): string {
  const merged = { ...DEFAULT_LAB_PARAMS, ...params }
  return `/simulate?${labParamsToSearch(merged)}`
}
