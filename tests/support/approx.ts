import { expect } from 'vitest'

export type NearOptions = {
  /** Relative tolerance vs |expected| (default 1e-6). */
  relative?: number
  /** Floor absolute tolerance (default 1e-9). */
  absolute?: number
}

/**
 * Floating-point compare suited to orbital quantities (km, s, degrees).
 * Prefer this over `toBeCloseTo` for large magnitudes.
 */
export function expectNear(
  actual: number,
  expected: number,
  options: NearOptions = {},
): void {
  const relative = options.relative ?? 1e-6
  const absolute = options.absolute ?? 1e-9

  expect(Number.isFinite(actual), `actual not finite: ${actual}`).toBe(true)
  expect(Number.isFinite(expected), `expected not finite: ${expected}`).toBe(true)

  const tol = Math.max(absolute, Math.abs(expected) * relative)
  expect(
    Math.abs(actual - expected),
    `expected ${actual} to be within ${tol} of ${expected}`,
  ).toBeLessThanOrEqual(tol)
}

/** Euclidean distance between two 3-vectors (km or unitless). */
export function vecDistance(
  a: readonly number[],
  b: readonly number[],
): number {
  const dx = (a[0] ?? 0) - (b[0] ?? 0)
  const dy = (a[1] ?? 0) - (b[1] ?? 0)
  const dz = (a[2] ?? 0) - (b[2] ?? 0)
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/** Vector length (km or unitless). */
export function vecNorm(v: readonly number[]): number {
  return Math.sqrt((v[0] ?? 0) ** 2 + (v[1] ?? 0) ** 2 + (v[2] ?? 0) ** 2)
}

/** Component-wise near-equality for ECI / unit vectors. */
export function expectVecNear(
  actual: readonly number[],
  expected: readonly number[],
  options: NearOptions = {},
): void {
  expect(actual.length).toBe(expected.length)
  for (let i = 0; i < expected.length; i++) {
    expectNear(actual[i]!, expected[i]!, options)
  }
}
