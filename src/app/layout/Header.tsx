import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { GITHUB_REPO_URL, SITE_NAME } from '@/lib/site'
import { useTheme } from '@/lib/theme'
import { GitHubIcon } from '@/ui/GitHubIcon'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm tracking-wide transition-opacity',
    isActive ? 'text-ink opacity-100' : 'text-ink opacity-60 hover:opacity-100',
  ].join(' ')

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-3 py-3 text-base no-underline transition-colors',
    isActive
      ? 'bg-paper-elevated font-medium text-ink'
      : 'text-ink-muted hover:bg-paper-elevated hover:text-ink',
  ].join(' ')

const NAV = [
  { to: '/learn', label: 'Learn' },
  { to: '/simulate', label: 'Lab' },
  { to: '/code', label: 'Code' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About' },
] as const

export function Header() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="min-w-0 shrink text-xs font-semibold tracking-[0.14em] text-ink uppercase no-underline sm:text-sm sm:tracking-[0.18em]"
        >
          <span className="block truncate">{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink opacity-60 transition-opacity hover:opacity-100"
            aria-label="View source on GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:border-ink hover:text-ink"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-muted"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            ) : (
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-paper md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-3 py-3 sm:px-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={mobileNavClass}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-md px-3 py-3 text-base text-ink-muted no-underline hover:bg-paper-elevated hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              <GitHubIcon size={18} />
              GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
