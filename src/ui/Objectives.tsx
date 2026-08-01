type ObjectivesProps = {
  items: string[]
}

export function Objectives({ items }: ObjectivesProps) {
  if (items.length === 0) return null
  return (
    <section className="my-6 rounded-lg border border-line bg-paper-elevated px-5 py-4">
      <h2 className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        On this page
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-ink-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
