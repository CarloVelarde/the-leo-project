/**
 * Lazy-load Pyodide from CDN only when a code-along runs.
 * Not bundled into the main lesson app chunk.
 */

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (opts: { batched: (s: string) => void }) => void
  setStderr: (opts: { batched: (s: string) => void }) => void
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>
  }
}

const PYODIDE_VERSION = '0.27.5'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
const SCRIPT_URL = `${INDEX_URL}pyodide.js`

let loadPromise: Promise<PyodideInterface> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      if (window.loadPyodide) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Pyodide script failed')))
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Pyodide from CDN'))
    document.head.appendChild(s)
  })
}

export async function getPyodide(): Promise<PyodideInterface> {
  if (!loadPromise) {
    loadPromise = (async () => {
      await loadScript(SCRIPT_URL)
      if (!window.loadPyodide) {
        throw new Error('loadPyodide missing after script load')
      }
      return window.loadPyodide({ indexURL: INDEX_URL })
    })()
  }
  return loadPromise
}

export type RunResult = {
  ok: boolean
  checked: boolean
  output: string
  error?: string
}

/**
 * Run user code, optionally followed by test harness.
 * Tests should print CHECK_OK on success.
 */
export async function runPython(
  userCode: string,
  testCode?: string,
): Promise<RunResult> {
  const chunks: string[] = []
  try {
    const py = await getPyodide()
    py.setStdout({ batched: (s) => chunks.push(s) })
    py.setStderr({ batched: (s) => chunks.push(s) })

    await py.runPythonAsync(userCode)

    if (testCode) {
      await py.runPythonAsync(testCode)
      const output = chunks.join('')
      const ok = output.includes('CHECK_OK')
      return { ok, checked: true, output }
    }

    return { ok: true, checked: false, output: chunks.join('') || '(no output)' }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return {
      ok: false,
      checked: Boolean(testCode),
      output: chunks.join(''),
      error: msg,
    }
  }
}
