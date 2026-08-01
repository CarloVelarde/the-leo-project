import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  CURRICULUM,
  getCurriculumModule,
  getPageIndex,
  type CurriculumModule,
} from '@/content/curriculum'
import { getLessonPage } from '@/content/lessonPages'
import { setLastModule } from '@/lib/progress'
import { useTheme } from '@/lib/theme'
import { MdxContent } from '@/ui/MdxProvider'

export function LessonReaderPage() {
  const { slug = '', pageId } = useParams()
  const navigate = useNavigate()
  const mod = getCurriculumModule(slug)
  const { theme, toggle } = useTheme()
  const [navOpen, setNavOpen] = useState(false)
  const [moduleMenuOpen, setModuleMenuOpen] = useState(false)

  const resolvedPageId = pageId ?? mod?.pages[0]?.id
  const pageIndex = mod && resolvedPageId ? getPageIndex(mod, resolvedPageId) : -1
  const page = mod && pageIndex >= 0 ? mod.pages[pageIndex] : null

  useEffect(() => {
    if (mod) setLastModule(mod.id)
  }, [mod])

  useEffect(() => {
    setNavOpen(false)
    setModuleMenuOpen(false)
    window.scrollTo(0, 0)
  }, [slug, resolvedPageId])

  // Keyboard: ← → for pages
  useEffect(() => {
    if (!mod || pageIndex < 0) return
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' && pageIndex < mod.pages.length - 1) {
        navigate(`/learn/${mod.slug}/${mod.pages[pageIndex + 1]!.id}`)
      }
      if (e.key === 'ArrowLeft' && pageIndex > 0) {
        navigate(`/learn/${mod.slug}/${mod.pages[pageIndex - 1]!.id}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mod, pageIndex, navigate])

  const body = useMemo(() => {
    if (!mod || !resolvedPageId) return null
    return getLessonPage(mod.slug, resolvedPageId)
  }, [mod, resolvedPageId])

  if (!mod) {
    return <Navigate to="/learn" replace />
  }

  if (!pageId) {
    return <Navigate to={`/learn/${mod.slug}/${mod.pages[0]!.id}`} replace />
  }

  if (!page || body == null) {
    return <Navigate to={`/learn/${mod.slug}/${mod.pages[0]!.id}`} replace />
  }

  const prev = pageIndex > 0 ? mod.pages[pageIndex - 1] : null
  const next = pageIndex < mod.pages.length - 1 ? mod.pages[pageIndex + 1] : null
  const nextModule = nextModuleAfter(mod)

  return (
    <div className="flex min-h-screen flex-col bg-paper lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-paper lg:flex">
        <SidebarContent
          mod={mod}
          pageId={page.id}
          onNavigate={() => undefined}
        />
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-paper/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-line px-2 py-1 text-xs text-ink lg:hidden"
              onClick={() => setNavOpen(true)}
            >
              Outline
            </button>
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setModuleMenuOpen((o) => !o)}
                className="flex max-w-[min(100vw-8rem,20rem)] items-center gap-2 truncate text-left text-sm font-medium text-ink"
              >
                <span className="truncate">
                  {mod.track === 'core' ? `Module ${mod.order}` : 'Optional'} · {mod.title}
                </span>
                <span className="text-ink-faint" aria-hidden>
                  ▾
                </span>
              </button>
              {moduleMenuOpen ? (
                <div className="absolute top-full left-0 z-40 mt-2 max-h-[70vh] w-80 overflow-auto rounded-lg border border-line bg-paper py-2 shadow-xl">
                  <p className="px-3 py-1 text-[10px] font-semibold tracking-widest text-ink-faint uppercase">
                    Jump to module
                  </p>
                  {CURRICULUM.map((m) => (
                    <Link
                      key={m.id}
                      to={`/learn/${m.slug}/${m.pages[0]!.id}`}
                      onClick={() => setModuleMenuOpen(false)}
                      className={[
                        'block px-3 py-2 text-sm no-underline',
                        m.id === mod.id
                          ? 'bg-paper-elevated font-medium text-ink'
                          : 'text-ink-muted hover:bg-paper-elevated hover:text-ink',
                      ].join(' ')}
                    >
                      {m.track === 'core' ? `${m.order}. ` : ''}
                      {m.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-xs text-ink-faint sm:inline">
              {pageIndex + 1}/{mod.pages.length}
            </span>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <Link
              to="/learn"
              className="text-xs text-ink-muted no-underline hover:text-ink"
            >
              Exit
            </Link>
          </div>
        </header>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-line">
          <div
            className="h-full bg-ink transition-all duration-300"
            style={{ width: `${((pageIndex + 1) / mod.pages.length) * 100}%` }}
          />
        </div>

        {/* Page content — viewport-first */}
        <div className="flex flex-1 flex-col">
          <article className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
            <p className="mb-2 text-xs font-medium tracking-widest text-ink-faint uppercase">
              {page.navLabel}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {page.title}
            </h1>
            <div className="lesson-prose min-h-0 flex-1">
              <MdxContent>{body}</MdxContent>
            </div>
          </article>

          {/* Page nav footer */}
          <footer className="sticky bottom-0 border-t border-line bg-paper/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              {prev ? (
                <Link
                  to={`/learn/${mod.slug}/${prev.id}`}
                  className="text-sm text-ink-muted no-underline hover:text-ink"
                >
                  ← {prev.navLabel}
                </Link>
              ) : (
                <Link to="/learn" className="text-sm text-ink-muted no-underline hover:text-ink">
                  ← Path
                </Link>
              )}
              {next ? (
                <Link
                  to={`/learn/${mod.slug}/${next.id}`}
                  className="rounded-full bg-inverse px-6 py-2.5 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
                >
                  Next · {next.navLabel}
                </Link>
              ) : nextModule ? (
                <Link
                  to={`/learn/${nextModule.slug}/${nextModule.pages[0]!.id}`}
                  className="rounded-full bg-inverse px-6 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90"
                >
                  Next module →
                </Link>
              ) : (
                <Link
                  to="/simulate"
                  className="rounded-full bg-inverse px-6 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90"
                >
                  Open lab →
                </Link>
              )}
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile drawer */}
      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close outline"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-paper shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="text-sm font-semibold text-ink">Outline</span>
              <button
                type="button"
                className="text-sm text-ink-muted"
                onClick={() => setNavOpen(false)}
              >
                Close
              </button>
            </div>
            <SidebarContent mod={mod} pageId={page.id} onNavigate={() => setNavOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SidebarContent({
  mod,
  pageId,
  onNavigate,
}: {
  mod: CurriculumModule
  pageId: string
  onNavigate: () => void
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="border-b border-line px-4 py-5">
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.18em] text-ink uppercase no-underline"
          onClick={onNavigate}
        >
          Starlink Edu
        </Link>
        <p className="mt-4 text-xs text-ink-faint">
          {mod.track === 'core' ? `Module ${mod.order}` : 'Optional track'}
        </p>
        <p className="mt-1 text-sm font-medium leading-snug text-ink">{mod.title}</p>
      </div>

      <div className="px-2 py-3">
        <p className="px-2 py-1 text-[10px] font-semibold tracking-widest text-ink-faint uppercase">
          In this module
        </p>
        <ol className="mt-1">
          {mod.pages.map((p, i) => {
            const active = p.id === pageId
            return (
              <li key={p.id}>
                <Link
                  to={`/learn/${mod.slug}/${p.id}`}
                  onClick={onNavigate}
                  className={[
                    'flex items-start gap-3 rounded-md px-2 py-2.5 text-sm no-underline transition-colors',
                    active
                      ? 'bg-paper-elevated font-medium text-ink'
                      : 'text-ink-muted hover:bg-paper-elevated/80 hover:text-ink',
                  ].join(' ')}
                >
                  <span className="font-mono text-xs text-ink-faint tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{p.navLabel}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-auto border-t border-line px-2 py-3">
        <p className="px-2 py-1 text-[10px] font-semibold tracking-widest text-ink-faint uppercase">
          All modules
        </p>
        <ul className="mt-1 max-h-48 overflow-y-auto">
          {CURRICULUM.filter((m) => m.track === 'core').map((m) => (
            <li key={m.id}>
              <Link
                to={`/learn/${m.slug}/${m.pages[0]!.id}`}
                onClick={onNavigate}
                className={[
                  'block truncate rounded-md px-2 py-2 text-xs no-underline',
                  m.id === mod.id
                    ? 'font-semibold text-ink'
                    : 'text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {m.order}. {m.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/learn"
          onClick={onNavigate}
          className="mt-2 block px-2 py-2 text-xs text-ink-faint no-underline hover:text-ink"
        >
          ← Learning path
        </Link>
      </div>
    </div>
  )
}

function nextModuleAfter(mod: CurriculumModule): CurriculumModule | null {
  const core = CURRICULUM.filter((m) => m.track === 'core')
  if (mod.track === 'core') {
    const i = core.findIndex((m) => m.id === mod.id)
    return i >= 0 && i < core.length - 1 ? core[i + 1]! : null
  }
  const opt = CURRICULUM.filter((m) => m.track === 'optional')
  const i = opt.findIndex((m) => m.id === mod.id)
  return i >= 0 && i < opt.length - 1 ? opt[i + 1]! : null
}
