import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getExercise } from '@/code/exercises'
import { getPyodide, runPython, type RunResult } from '@/code/pyodideRunner'
import { useTheme } from '@/lib/theme'

export function CodeAlongPage() {
  const { exerciseId = '' } = useParams()
  const ex = getExercise(exerciseId)
  const { theme, toggle } = useTheme()

  const [code, setCode] = useState(ex?.starterCode ?? '')
  const [result, setResult] = useState<RunResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [loadingRuntime, setLoadingRuntime] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [runtimeReady, setRuntimeReady] = useState(false)

  useEffect(() => {
    if (ex) {
      setCode(ex.starterCode)
      setResult(null)
      setShowSolution(false)
    }
  }, [ex])

  const ensureRuntime = useCallback(async () => {
    if (runtimeReady) return
    setLoadingRuntime(true)
    try {
      await getPyodide()
      setRuntimeReady(true)
    } finally {
      setLoadingRuntime(false)
    }
  }, [runtimeReady])

  async function onRun(withTests: boolean) {
    if (!ex) return
    setBusy(true)
    setResult(null)
    try {
      await ensureRuntime()
      const res = await runPython(code, withTests ? ex.testCode : undefined)
      setResult(res)
    } catch (e) {
      setResult({
        ok: false,
        checked: withTests,
        output: '',
        error: e instanceof Error ? e.message : String(e),
      })
    } finally {
      setBusy(false)
    }
  }

  if (!ex) {
    return <Navigate to="/code" replace />
  }

  const lessonHref = `/learn/${ex.moduleSlug}/${ex.pageId}`

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <Link to="/code" className="text-ink-muted no-underline hover:text-ink">
              Code
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="truncate font-medium text-ink">{ex.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <Link
              to={lessonHref}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted no-underline hover:border-ink hover:text-ink"
            >
              Back to lesson
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
          Optional code-along · Python · ~{ex.minutes} min
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{ex.title}</h1>
        <p className="mt-2 max-w-2xl text-ink-muted">{ex.goal}</p>

        <div className="mt-6 grid gap-4 rounded-xl border border-line bg-paper-elevated p-4 text-sm text-ink-muted sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
              Task
            </p>
            <p className="mt-1 text-ink">{ex.prompt}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
              Model
            </p>
            <p className="mt-1">
              Same simplified lab model: circular orbits, geometric ideas, vacuum light-time. Not
              full RF.
            </p>
            {ex.predict ? (
              <p className="mt-2 text-ink">
                <span className="font-medium">Before you run: </span>
                {ex.predict}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-elevated px-4 py-2">
            <span className="font-mono text-xs text-ink-faint">main.py</span>
            <div className="flex flex-wrap gap-2">
              <ActionBtn
                disabled={busy || loadingRuntime}
                onClick={() => onRun(false)}
                secondary
              >
                {loadingRuntime ? 'Loading Python…' : busy ? 'Running…' : 'Run'}
              </ActionBtn>
              <ActionBtn disabled={busy || loadingRuntime} onClick={() => onRun(true)}>
                Run checks
              </ActionBtn>
              <ActionBtn
                secondary
                onClick={() => {
                  setCode(ex.starterCode)
                  setResult(null)
                }}
              >
                Reset
              </ActionBtn>
              <ActionBtn
                secondary
                onClick={() => {
                  setShowSolution((s) => !s)
                  if (!showSolution) setCode(ex.solutionCode)
                }}
              >
                {showSolution ? 'Hide solution' : 'Show solution'}
              </ActionBtn>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="min-h-[320px] w-full resize-y bg-[#0d0d0d] p-4 font-mono text-[13px] leading-relaxed text-[#e8e8e8] outline-none"
            style={{ tabSize: 4 }}
            aria-label="Python editor"
          />
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          <div className="border-b border-line bg-paper-elevated px-4 py-2 font-mono text-xs text-ink-faint">
            Output
            {result?.checked ? (
              <span
                className={[
                  'ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase',
                  result.ok ? 'bg-ink text-paper' : 'border border-line text-ink-muted',
                ].join(' ')}
              >
                {result.ok ? 'Checks passed' : 'Checks failed'}
              </span>
            ) : null}
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap bg-paper p-4 font-mono text-xs text-ink-muted">
            {busy || loadingRuntime
              ? loadingRuntime
                ? 'Downloading Python runtime (first time only)…'
                : 'Running…'
              : result
                ? [result.output, result.error].filter(Boolean).join('\n') || '(no output)'
                : 'Run your code or run checks when ready.'}
          </pre>
        </div>

        <p className="mt-6 text-sm text-ink-muted">
          Done exploring?{' '}
          <Link to={lessonHref} className="font-medium text-ink underline-offset-2 hover:underline">
            Return to the lesson
          </Link>{' '}
          — the next page is never blocked by coding.
        </p>
      </main>
    </div>
  )
}

function ActionBtn({
  children,
  onClick,
  disabled,
  secondary,
}: {
  children: string
  onClick: () => void
  disabled?: boolean
  secondary?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50',
        secondary
          ? 'border border-line text-ink hover:border-ink'
          : 'bg-inverse text-paper hover:opacity-90',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
