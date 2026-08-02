import { Link } from 'react-router-dom'
import { GITHUB_REPO_URL } from '@/lib/site'
import { GitHubIcon } from '@/ui/GitHubIcon'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Educational project. Not affiliated with SpaceX or Starlink.</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/about" className="text-ink-muted no-underline hover:text-ink">
            Methods
          </Link>
          <Link to="/learn" className="text-ink-muted no-underline hover:text-ink">
            Learn
          </Link>
          <Link to="/simulate" className="text-ink-muted no-underline hover:text-ink">
            Lab
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-muted no-underline hover:text-ink"
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
