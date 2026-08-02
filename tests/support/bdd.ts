import { describe, it } from 'vitest'

/**
 * Lightweight BDD wrappers over Vitest.
 * Keeps scenario language explicit without a separate Gherkin runner.
 *
 * Unit suites: use plain `describe` / `it` under tests/unit.
 * BDD suites: use `feature` / `scenario` under tests/bdd only.
 */

export function feature(name: string, fn: () => void): void {
  describe(`Feature: ${name}`, fn)
}

export function scenario(name: string, fn: () => void | Promise<void>): void {
  it(`Scenario: ${name}`, fn)
}
