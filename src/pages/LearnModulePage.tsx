import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModuleBySlug, MODULES } from '@/content/modules'
import { setLastModule } from '@/lib/progress'
import { MdxContent } from '@/ui/MdxProvider'

const moduleLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  'internet-foundations': () => import('@/content/modules/m1-internet-foundations.mdx'),
  'geo-problem': () => import('@/content/modules/m2-geo-problem.mdx'),
  'leo-advantage': () => import('@/content/modules/m3-leo-advantage.mdx'),
  'launch-and-ops': () => import('@/content/modules/m4-launch-and-ops.mdx'),
  'constellation-design': () => import('@/content/modules/m5-constellation-design.mdx'),
  'user-terminal': () => import('@/content/modules/m6-user-terminal.mdx'),
  'space-network': () => import('@/content/modules/m7-space-network.mdx'),
  'end-to-end': () => import('@/content/modules/m8-end-to-end.mdx'),
}

export function LearnModulePage() {
  const { slug = '' } = useParams()
  const meta = getModuleBySlug(slug)
  const loader = moduleLoaders[slug]

  useEffect(() => {
    if (meta) setLastModule(meta.id)
  }, [meta])

  if (!meta || !loader) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl text-white">Module not found</h1>
        <Link to="/learn" className="mt-4 inline-block">
          ← Back to path
        </Link>
      </div>
    )
  }

  const Content = lazy(loader)
  const idx = MODULES.findIndex((m) => m.id === meta.id)
  const prev = idx > 0 ? MODULES[idx - 1] : null
  const next = idx >= 0 && idx < MODULES.length - 1 ? MODULES[idx + 1] : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-2 text-sm text-slate-500">
        <Link to="/learn" className="text-slate-400 hover:text-white">
          Learn
        </Link>
        <span className="mx-2">/</span>
        Module {meta.order}
        <span className="mx-2">·</span>
        ~{meta.minutes} min
      </p>
      <p className="mb-8 text-sm text-slate-500">{meta.goal}</p>

      <MdxContent>
        <Suspense fallback={<p className="text-slate-400">Loading module…</p>}>
          <Content />
        </Suspense>
      </MdxContent>

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-space-800 pt-8 text-sm">
        {prev ? (
          <Link to={`/learn/${prev.slug}`} className="text-slate-400 hover:text-white">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/learn/${next.slug}`} className="text-accent hover:text-white">
            {next.title} →
          </Link>
        ) : (
          <Link to="/simulate" className="text-accent hover:text-white">
            Open the lab →
          </Link>
        )}
      </nav>
    </article>
  )
}
