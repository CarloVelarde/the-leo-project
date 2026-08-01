import { MDXProvider } from '@mdx-js/react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'

const components = {
  a: (props: ComponentProps<'a'>) => {
    const href = props.href ?? ''
    if (href.startsWith('/')) {
      return (
        <Link to={href} className="text-accent hover:text-white">
          {props.children}
        </Link>
      )
    }
    return (
      <a {...props} className="text-accent hover:text-white" rel="noreferrer" target="_blank" />
    )
  },
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="mt-10 mb-3 text-xl font-semibold text-slate-100" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="mt-8 mb-2 text-lg font-medium text-slate-200" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="mb-4 text-base leading-relaxed text-slate-300" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-accent/50 pl-4 text-slate-400 italic"
      {...props}
    />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="rounded bg-space-800 px-1.5 py-0.5 font-mono text-sm text-accent" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-semibold text-slate-100" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-slate-300" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="border border-space-700 bg-space-900 px-3 py-2 font-semibold text-slate-100" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border border-space-700 px-3 py-2 align-top" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <hr className="my-10 border-space-800" {...props} />,
}

export function MdxContent({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
