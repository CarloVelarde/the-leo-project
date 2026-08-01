import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '@/lib/theme'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm tracking-wide transition-opacity',
    isActive ? 'text-ink opacity-100' : 'text-ink opacity-60 hover:opacity-100',
  ].join(' ')

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.18em] text-ink uppercase no-underline"
        >
          Starlink Edu
        </Link>
        <nav className="flex flex-wrap items-center gap-5 sm:gap-7">
          <NavLink to="/learn" className={navClass}>
            Learn
          </NavLink>
          <NavLink to="/simulate" className={navClass}>
            Lab
          </NavLink>
          <NavLink to="/code" className={navClass}>
            Code
          </NavLink>
          <NavLink to="/glossary" className={navClass}>
            Glossary
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:border-ink hover:text-ink"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}
