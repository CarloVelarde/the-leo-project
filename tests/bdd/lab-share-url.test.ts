import { expect } from 'vitest'
import {
  labParamsFromSearch,
  labParamsToSearch,
  labPath,
} from '@/lib/labParams'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import { feature, labParams, scenario } from '@test/support'

/**
 * Product contract: lab experiments are shareable via the query string.
 * This is BDD (workflow/contract), not a re-test of string helpers in isolation.
 */
feature('Shareable lab URL', () => {
  scenario('round-trips a customized experiment through the query string', () => {
    const experiment = labParams({
      planes: 24,
      satsPerPlane: 40,
      altitudeKm: 570,
      inclinationDeg: 70,
      minElevationDeg: 30,
      userLatDeg: 51.5,
      userLonDeg: -0.12,
      timeScale: 120,
    })

    const search = labParamsToSearch(experiment)
    const restored = labParamsFromSearch(`?${search}`)

    expect(restored).toEqual(experiment)
  })

  scenario('falls back to defaults when the query is empty or garbage', () => {
    expect(labParamsFromSearch('')).toEqual({ ...DEFAULT_LAB_PARAMS })
    expect(labParamsFromSearch('?planes=nope&alt=')).toEqual({ ...DEFAULT_LAB_PARAMS })
  })

  scenario('builds a /simulate path that reopens the same settings', () => {
    const path = labPath({ altitudeKm: 600, planes: 18 })
    expect(path.startsWith('/simulate?')).toBe(true)

    const query = path.slice(path.indexOf('?'))
    const restored = labParamsFromSearch(query)

    expect(restored.altitudeKm).toBe(600)
    expect(restored.planes).toBe(18)
    expect(restored.satsPerPlane).toBe(DEFAULT_LAB_PARAMS.satsPerPlane)
  })
})
