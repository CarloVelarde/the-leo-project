import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const alias = {
  '@': path.resolve(rootDir, './src'),
  '@test': path.resolve(rootDir, './tests'),
}

/**
 * Dedicated Vitest config (not the full Vite app pipeline).
 * Unit/BDD suites import pure modules; skip MDX/Tailwind plugins for speed.
 */
export default defineConfig({
  resolve: { alias },
  test: {
    // Shared defaults for every project below
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    setupFiles: ['./tests/support/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      // Domain + pure adapters first; UI/WebGL not in the gate yet
      include: ['src/sim/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/sim/index.ts',
        'src/sim/types.ts', // type-only module
        'src/lib/theme.tsx', // React theme chrome; not pure domain
        'src/lib/site.ts', // public URL constants
      ],
    },
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.{test,spec}.ts'],
          setupFiles: ['./tests/support/setup.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'bdd',
          environment: 'node',
          include: ['tests/bdd/**/*.{test,spec}.ts'],
          setupFiles: ['./tests/support/setup.ts'],
        },
      },
    ],
  },
})
