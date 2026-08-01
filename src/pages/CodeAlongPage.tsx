import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getExercise } from '@/code/exercises'
import { getPyodide, runPython, type RunResult } from '@/code/pyodideRunner'
import { getCurriculumModule } from '@/content/curriculum'
import { useTheme } from '@/lib/theme'
import { PythonCodeEditor } from '@/ui/PythonCodeEditor'

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

  const mod = getCurriculumModule(ex.moduleSlug)
  const lessonPage = mod?.pages.find((p) => p.id === ex.pageId)
  const lessonHref = `/learn/${ex.moduleSlug}/${ex.pageId}`
  const moduleStartHref = mod
    ? `/learn/${mod.slug}/${mod.pages[0]!.id}`
    : `/learn/${ex.moduleSlug}`

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <nav className="flex min-w-0 items-center gap-2 text-sm">
            <Link to="/" className="font-medium text-ink no-underline hover:opacity-70">
              Home
            </Link>
            <span className="text-ink-faint">/</span>
            <Link to="/code" className="text-ink-muted no-underline hover:text-ink">
              Code
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="truncate text-ink-muted">{ex.title}</span>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
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
              Lesson
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
        {/* Compact assignment header */}
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {ex.title}
          </h1>
          <p className="text-xs text-ink-faint">Python · ~{ex.minutes} min · optional</p>
        </div>
        <p className="mb-4 text-sm text-ink-muted">{ex.goal}</p>

        {/* Slim task list — primary content before the editor */}
        <section className="mb-4 rounded-xl border border-line bg-paper px-4 py-3">
          <ol className="space-y-2">
            {ex.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-snug text-ink">
                <span className="w-5 shrink-0 font-mono text-xs font-semibold text-ink-faint tabular-nums">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 border-t border-line pt-3 text-xs text-ink-muted">
            <span className="font-medium text-ink">Pass when: </span>
            {ex.success}
          </p>
        </section>

        {/* Editor first-class */}
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper-elevated px-3 py-2">
            <span className="font-mono text-xs text-ink-faint">main.py</span>
            <div className="flex flex-wrap gap-1.5">
              <ActionBtn
                disabled={busy || loadingRuntime}
                onClick={() => onRun(false)}
                secondary
              >
                {loadingRuntime ? 'Loading…' : busy ? 'Running…' : 'Run'}
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
                {showSolution ? 'Hide solution' : 'Solution'}
              </ActionBtn>
            </div>
          </div>
          <div className={theme === 'light' ? 'bg-[#f6f8fa]' : 'bg-[#0d1117]'}>
            <PythonCodeEditor
              value={code}
              onChange={setCode}
              theme={theme === 'light' ? 'light' : 'dark'}
              minHeight="380px"
            />
          </div>
        </div>

        {/* Compact output */}
        <div className="mt-3 overflow-hidden rounded-xl border border-line">
          <div className="flex items-center gap-2 border-b border-line bg-paper-elevated px-3 py-2">
            <span className="text-xs text-ink-faint">Output</span>
            {result?.checked ? (
              <span
                className={[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                  result.ok ? 'bg-ink text-paper' : 'border border-line text-ink-muted',
                ].join(' ')}
              >
                {result.ok ? 'Passed' : 'Failed'}
              </span>
            ) : null}
          </div>
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap bg-paper px-3 py-2.5 font-mono text-xs leading-relaxed text-ink-muted">
            {busy || loadingRuntime
              ? loadingRuntime
                ? 'Downloading Python (first time)…'
                : 'Running…'
              : result
                ? [result.output, result.error].filter(Boolean).join('\n') || '(no output)'
                : 'Run or Run checks when ready.'}
          </pre>
        </div>

        {/* Secondary — collapsed by default */}
        <div className="mt-4 space-y-1 border-t border-line pt-3">
          {ex.predict ? (
            <Details summary="Think first">
              <p className="text-sm text-ink">{ex.predict}</p>
            </Details>
          ) : null}

          <Details summary="Related lessons">
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to={lessonHref} className="font-medium text-ink underline-offset-2 hover:underline">
                  {lessonPage?.title ?? 'Related page'}
                </Link>
                {mod ? (
                  <span className="text-ink-muted">
                    {' '}
                    · {mod.track === 'core' ? `Module ${mod.order}` : 'Optional'}: {mod.title}
                  </span>
                ) : null}
              </li>
              {mod && mod.pages[0]!.id !== ex.pageId ? (
                <li>
                  <Link
                    to={moduleStartHref}
                    className="text-ink underline-offset-2 hover:underline"
                  >
                    Start of module
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/simulate" className="text-ink underline-offset-2 hover:underline">
                  Constellation lab
                </Link>
              </li>
            </ul>
          </Details>

          <Details summary="Editor tips">
            <p className="text-sm text-ink-muted">
              Enter keeps indent · Tab / Shift+Tab · Ctrl/Cmd+Z undo · brackets auto-close.
              Same simplified lab model (not full RF).
            </p>
          </Details>
        </div>
      </main>
    </div>
  )
}

function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-transparent open:border-line open:bg-paper-elevated">
      <summary className="cursor-pointer list-none px-2 py-2 text-xs font-medium text-ink-muted marker:content-none hover:text-ink [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-ink-faint transition-transform group-open:rotate-90" aria-hidden>
            ▸
          </span>
          {summary}
        </span>
      </summary>
      <div className="px-3 pb-3 pt-0">{children}</div>
    </details>
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
