import { MDXProvider } from '@mdx-js/react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'

const components = {
  a: (props: ComponentProps<'a'>) => {
    const href = props.href ?? ''
    if (href.startsWith('/')) {
      return (
        <Link to={href} className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
          {props.children}
        </Link>
      )
    }
    return (
      <a
        {...props}
        className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        rel="noreferrer"
        target="_blank"
      />
    )
  },
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="mt-8 mb-3 text-xl font-semibold text-ink" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="mt-6 mb-2 text-lg font-medium text-ink" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="mb-4 text-base leading-relaxed text-ink-muted" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-ink-muted" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-ink-muted" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="my-4 border-l-2 border-ink pl-4 text-ink-muted italic" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="rounded bg-paper-elevated px-1.5 py-0.5 font-mono text-sm text-ink" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className="border border-line bg-paper-elevated px-3 py-2 font-semibold text-ink" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border border-line px-3 py-2 text-ink-muted" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <hr className="my-8 border-line" {...props} />,
}

export function MdxContent({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
