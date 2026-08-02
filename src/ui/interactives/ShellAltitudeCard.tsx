import { Figure } from './Figure'

/**
 * Dated public shell bands from Starlink Space Safety (EOY 2026 plan).
 * Marketing pages may still say “~550 km” — prefer dated safety docs in lessons.
 */
export function ShellAltitudeCard() {
  return (
    <Figure
      caption="Planned primary LEO bands as published for end-of-2026 planning. Plans change — re-check the source."
      credit="Starlink Space Safety · Constellation Altitudes (as of curriculum build, 2026)"
    >
      <div className="space-y-3 text-sm">
        <div className="rounded-md border border-line px-4 py-3">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Broadband shells (V1 + V2)
          </p>
          <p className="mt-1 font-medium text-ink">~450–490 km</p>
          <p className="mt-1 text-xs text-ink-muted">
            Multiple inclinations (e.g. 43°, 53°, 70°, ~97°) for latitude coverage.
          </p>
        </div>
        <div className="rounded-md border border-line px-4 py-3">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Lower band (DTC + V3 broadband planning)
          </p>
          <p className="mt-1 font-medium text-ink">~330–370 km</p>
          <p className="mt-1 text-xs text-ink-muted">
            Direct-to-cell and next-gen broadband shells in a lower band — different service class.
          </p>
        </div>
        <p className="text-xs leading-relaxed text-ink-muted">
          Operator materials describe an ongoing <strong className="font-medium text-ink">shell
          lowering</strong> campaign from earlier ~500+ km operations. Independent catalogs (e.g.
          McDowell) show what is actually flying — not always identical to a planning table.
        </p>
      </div>
    </Figure>
  )
}
