import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-space-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Educational model of LEO mega-constellations. Not affiliated with SpaceX.</p>
        <div className="flex gap-4">
          <Link to="/about" className="text-slate-400 hover:text-white">
            Methods & sources
          </Link>
          <Link to="/simulate" className="text-slate-400 hover:text-white">
            Lab
          </Link>
        </div>
      </div>
    </footer>
  )
}
