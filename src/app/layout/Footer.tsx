import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Educational project. Not affiliated with SpaceX or Starlink.</p>
        <div className="flex gap-6">
          <Link to="/about" className="text-ink-muted no-underline hover:text-ink">
            Methods
          </Link>
          <Link to="/learn" className="text-ink-muted no-underline hover:text-ink">
            Learn
          </Link>
          <Link to="/simulate" className="text-ink-muted no-underline hover:text-ink">
            Lab
          </Link>
        </div>
      </div>
    </footer>
  )
}
