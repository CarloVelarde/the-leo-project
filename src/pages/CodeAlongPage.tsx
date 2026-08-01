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
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:max-w-5xl sm:px-6">
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

      <main className="mx-auto max-w-3xl px-4 py-8 sm:max-w-5xl sm:px-6">
        {/* Title block */}
        <p className="text-xs font-medium tracking-wide text-ink-faint">
          Optional · Python · about {ex.minutes} minutes
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {ex.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{ex.goal}</p>

        {/* Instructions — clear hierarchy, readable type */}
        <section className="mt-8 rounded-2xl border border-line bg-paper shadow-sm">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold tracking-tight text-ink">What to do</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Complete the functions in the editor below, then use <strong className="font-medium text-ink">Run checks</strong>.
            </p>
          </div>

          <ol className="space-y-0 px-5 py-2 sm:px-6">
            {ex.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 border-b border-line py-4 last:border-b-0"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="pt-0.5 text-[15px] leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>

          <div className="space-y-3 border-t border-line bg-paper-elevated/80 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
                When checks pass
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink">{ex.success}</p>
            </div>
            {ex.predict ? (
              <div className="rounded-lg border border-line bg-paper px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
                  Think first
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{ex.predict}</p>
              </div>
            ) : null}
            <p className="text-xs leading-relaxed text-ink-faint">
              Uses the same simplified lab model (circular orbits, vacuum light-time where relevant).
              Not a full RF simulation.
            </p>
          </div>
        </section>

        {/* Editor */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-elevated px-4 py-2.5">
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
                  setShowSolution(false)
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
            className="min-h-[340px] w-full resize-y bg-[#111111] p-4 font-mono text-sm leading-relaxed text-[#f0f0f0] outline-none"
            style={{ tabSize: 4 }}
            aria-label="Python editor"
          />
        </div>

        {/* Output */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-paper-elevated px-4 py-2.5">
            <span className="text-xs font-medium text-ink-faint">Output</span>
            {result?.checked ? (
              <span
                className={[
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                  result.ok
                    ? 'bg-ink text-paper'
                    : 'border border-line text-ink-muted',
                ].join(' ')}
              >
                {result.ok ? 'Checks passed' : 'Checks failed'}
              </span>
            ) : null}
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap bg-paper p-4 font-mono text-[13px] leading-relaxed text-ink-muted">
            {busy || loadingRuntime
              ? loadingRuntime
                ? 'Downloading Python runtime (first time only)…'
                : 'Running…'
              : result
                ? [result.output, result.error].filter(Boolean).join('\n') || '(no output)'
                : 'Run your code, or Run checks when you are ready.'}
          </pre>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Done exploring?{' '}
          <Link to={lessonHref} className="font-medium text-ink underline-offset-2 hover:underline">
            Return to the lesson
          </Link>
          . Coding never blocks Next.
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
        'rounded-full px-3.5 py-1.5 text-xs font-medium disabled:opacity-50',
        secondary
          ? 'border border-line text-ink hover:border-ink'
          : 'bg-inverse text-paper hover:opacity-90',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
