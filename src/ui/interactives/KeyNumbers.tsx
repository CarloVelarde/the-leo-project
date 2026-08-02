type Item = {
  label: string
  value: string
  hint?: string
}

type KeyNumbersProps = {
  items: Item[]
  caption?: string
}

/** Sparse numeric cards — one idea per cell, no chart junk. */
export function KeyNumbers({ items, caption }: KeyNumbersProps) {
  return (
    <div className="my-6">
      <div
        className={`grid gap-3 ${items.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}
      >
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-lg border border-line bg-paper-elevated px-4 py-3"
          >
            <p className="text-[10px] font-semibold tracking-[0.15em] text-ink-faint uppercase">
              {it.label}
            </p>
            <p className="mt-1 font-mono text-lg font-medium tabular-nums text-ink">{it.value}</p>
            {it.hint ? <p className="mt-1 text-xs text-ink-muted">{it.hint}</p> : null}
          </div>
        ))}
      </div>
      {caption ? <p className="mt-2 text-xs text-ink-faint">{caption}</p> : null}
    </div>
  )
}
