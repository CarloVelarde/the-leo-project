import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm transition-colors',
    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200',
  ].join(' ')

export function Header() {
  return (
    <header className="border-b border-space-800 bg-space-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <NavLink to="/" className="text-sm font-semibold tracking-wide text-white no-underline">
          Starlink <span className="text-accent">Edu</span>
        </NavLink>
        <nav className="flex flex-wrap items-center gap-5">
          <NavLink to="/learn" className={linkClass}>
            Learn
          </NavLink>
          <NavLink to="/simulate" className={linkClass}>
            Simulate
          </NavLink>
          <NavLink to="/glossary" className={linkClass}>
            Glossary
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
