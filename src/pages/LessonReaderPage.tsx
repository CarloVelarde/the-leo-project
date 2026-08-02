import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { SITE_NAME } from '@/lib/site'
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

  useEffect(() => {
    if (!navOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [navOpen])

  // Keyboard: ← → for pages
  useEffect(() => {
    if (!mod || pageIndex < 0) return
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }
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
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Top bar — mobile-first compact chrome */}
        <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
          <div className="flex h-12 items-center justify-between gap-2 px-3 sm:h-14 sm:gap-3 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button
                type="button"
                className="shrink-0 rounded-md border border-line px-2 py-1.5 text-xs text-ink lg:hidden"
                onClick={() => {
                  setModuleMenuOpen(false)
                  setNavOpen(true)
                }}
              >
                Outline
              </button>
              <div className="relative min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setNavOpen(false)
                    setModuleMenuOpen((o) => !o)
                  }}
                  className="flex w-full max-w-full items-center gap-1.5 text-left text-sm font-medium text-ink"
                >
                  <span className="min-w-0 flex-1 truncate">
                    <span className="text-ink-faint sm:hidden">
                      {mod.track === 'core' ? `M${mod.order}` : 'Opt'}
                    </span>
                    <span className="hidden sm:inline">
                      {mod.track === 'core' ? `Module ${mod.order}` : 'Optional'}
                    </span>
                    <span className="text-ink-faint"> · </span>
                    {mod.title}
                  </span>
                  <span className="shrink-0 text-ink-faint" aria-hidden>
                    ▾
                  </span>
                </button>
                {moduleMenuOpen ? (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-30 cursor-default bg-transparent"
                      aria-label="Close module menu"
                      onClick={() => setModuleMenuOpen(false)}
                    />
                    <div className="absolute top-full left-0 z-40 mt-2 max-h-[min(70vh,24rem)] w-[min(calc(100vw-1.5rem),20rem)] overflow-auto rounded-lg border border-line bg-paper py-2 shadow-xl">
                      <p className="px-3 py-1 text-[10px] font-semibold tracking-widest text-ink-faint uppercase">
                        Jump to module
                      </p>
                      {CURRICULUM.map((m) => (
                        <Link
                          key={m.id}
                          to={`/learn/${m.slug}/${m.pages[0]!.id}`}
                          onClick={() => setModuleMenuOpen(false)}
                          className={[
                            'block px-3 py-2.5 text-sm no-underline',
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
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[11px] text-ink-faint tabular-nums sm:text-xs">
                {pageIndex + 1}/{mod.pages.length}
              </span>
              <button
                type="button"
                onClick={toggle}
                className="rounded-full border border-line px-2 py-1 text-[11px] text-ink-muted hover:border-ink hover:text-ink sm:px-3 sm:text-xs"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
              <Link
                to="/learn"
                className="px-1 text-xs text-ink-muted no-underline hover:text-ink sm:px-0"
              >
                Exit
              </Link>
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-line">
          <div
            className="h-full bg-ink transition-all duration-300"
            style={{ width: `${((pageIndex + 1) / mod.pages.length) * 100}%` }}
          />
        </div>

        {/* Page content */}
        <div className="flex min-h-0 flex-1 flex-col">
          <article className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
            <p className="mb-2 text-xs font-medium tracking-widest text-ink-faint uppercase">
              {page.navLabel}
            </p>
            <h1 className="mb-5 text-2xl font-semibold tracking-tight text-balance text-ink sm:mb-6 sm:text-4xl">
              {page.title}
            </h1>
            <div className="lesson-prose min-w-0">
              <MdxContent>{body}</MdxContent>
            </div>
          </article>

          {/* Page nav footer — safe area for notched phones */}
          <footer className="sticky bottom-0 border-t border-line bg-paper/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
              {prev ? (
                <Link
                  to={`/learn/${mod.slug}/${prev.id}`}
                  className="min-w-0 max-w-[42%] truncate text-sm text-ink-muted no-underline hover:text-ink"
                >
                  ← {prev.navLabel}
                </Link>
              ) : (
                <Link
                  to="/learn"
                  className="text-sm text-ink-muted no-underline hover:text-ink"
                >
                  ← Path
                </Link>
              )}
              {next ? (
                <Link
                  to={`/learn/${mod.slug}/${next.id}`}
                  className="shrink-0 rounded-full bg-inverse px-4 py-2.5 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90 sm:px-6"
                >
                  <span className="sm:hidden">Next</span>
                  <span className="hidden sm:inline">Next · {next.navLabel}</span>
                </Link>
              ) : nextModule ? (
                <Link
                  to={`/learn/${nextModule.slug}/${nextModule.pages[0]!.id}`}
                  className="shrink-0 rounded-full bg-inverse px-4 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90 sm:px-6"
                >
                  Next module →
                </Link>
              ) : (
                <Link
                  to="/simulate"
                  className="shrink-0 rounded-full bg-inverse px-4 py-2.5 text-sm font-medium text-paper no-underline hover:opacity-90 sm:px-6"
                >
                  Open lab →
                </Link>
              )}
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile outline drawer */}
      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close outline"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-paper shadow-2xl">
            <div className="flex h-12 items-center justify-between border-b border-line px-4 sm:h-14">
              <span className="text-sm font-semibold text-ink">Outline</span>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm text-ink-muted"
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
          {SITE_NAME}
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
        <ul className="mt-1 max-h-40 overflow-y-auto">
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
        <div className="mt-2 space-y-0.5 border-t border-line pt-2">
          <Link
            to="/learn"
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-xs text-ink-muted no-underline hover:text-ink"
          >
            Learning path
          </Link>
          <Link
            to="/glossary"
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-xs text-ink-muted no-underline hover:text-ink"
          >
            Glossary
          </Link>
          <Link
            to="/simulate"
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-xs text-ink-muted no-underline hover:text-ink"
          >
            3D lab
          </Link>
          <Link
            to="/code"
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-xs text-ink-muted no-underline hover:text-ink"
          >
            Code-alongs
          </Link>
          <Link
            to="/"
            onClick={onNavigate}
            className="block rounded-md px-2 py-2 text-xs text-ink-faint no-underline hover:text-ink"
          >
            Home
          </Link>
        </div>
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
