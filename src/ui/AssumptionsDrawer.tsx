import { useState } from 'react'

export function AssumptionsDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-line bg-paper text-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-ink"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium">Model assumptions</span>
        <span className="text-ink-faint">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-line px-4 py-3 text-ink-muted">
          <li>Circular Keplerian orbits; constant altitude; no drag or J2.</li>
          <li>Spherical Earth; geometric elevation mask.</li>
          <li>Coverage = line-of-sight above min elevation — not full RF.</li>
          <li>Parametric constellation, not live Starlink TLEs.</li>
          <li>Starlink is a case study; no proprietary algorithm reverse-engineering.</li>
        </ul>
      ) : null}
    </div>
  )
}
