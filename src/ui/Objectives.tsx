type ObjectivesProps = {
  items: string[]
}

export function Objectives({ items }: ObjectivesProps) {
  if (items.length === 0) return null
  return (
    <section className="my-6 rounded-xl border border-space-700 bg-space-900/50 px-5 py-4">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
        By the end of this module
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
