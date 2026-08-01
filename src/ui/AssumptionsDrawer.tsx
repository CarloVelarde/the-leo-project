import { useState } from 'react'

export function AssumptionsDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-space-700 bg-space-900/80 text-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-300"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium">Model assumptions</span>
        <span className="text-slate-500">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-space-700 px-4 py-3 text-slate-400">
          <li>Circular Keplerian orbits; constant altitude; no drag or J2.</li>
          <li>Spherical Earth; geometric elevation mask (not terrain or buildings).</li>
          <li>Coverage = line-of-sight above min elevation — not a full RF link budget.</li>
          <li>Parametric constellation (planes × sats), not live Starlink TLEs.</li>
          <li>
            Starlink is a case study for LEO mega-constellations; we do not reverse-engineer
            proprietary algorithms.
          </li>
        </ul>
      ) : null}
    </div>
  )
}
