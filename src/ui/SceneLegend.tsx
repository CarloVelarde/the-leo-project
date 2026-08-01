export function SceneLegend() {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg border border-space-700/80 bg-space-950/75 px-3 py-2 text-[11px] text-slate-300 backdrop-blur">
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#3d8fb5]" /> Idle sat
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#5eead4]" /> In view
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#80ed99]" /> Serving + link / footprint
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#f4a261]" /> User + ground track
        </li>
      </ul>
    </div>
  )
}
