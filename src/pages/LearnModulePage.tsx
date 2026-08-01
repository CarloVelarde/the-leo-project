import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModuleBySlug, MODULES } from '@/content/modules'
import { setLastModule } from '@/lib/progress'
import { MdxContent } from '@/ui/MdxProvider'

const moduleLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  'why-leo': () => import('@/content/modules/m1-why-leo.mdx'),
  orbits: () => import('@/content/modules/m2-orbits.mdx'),
  'constellation-design': () => import('@/content/modules/m3-constellation-design.mdx'),
  'beams-and-handoffs': () => import('@/content/modules/m4-beams-and-handoffs.mdx'),
  'what-makes-it-special': () => import('@/content/modules/m5-what-makes-it-special.mdx'),
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
      <p className="mb-6 text-sm text-slate-500">
        <Link to="/learn" className="text-slate-400 hover:text-white">
          Learn
        </Link>
        <span className="mx-2">/</span>
        Module {meta.order}
      </p>

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
