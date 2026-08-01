export function SceneLegend() {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md border border-white/15 bg-black/70 px-3 py-2 text-[11px] text-white/80 backdrop-blur">
      <ul className="space-y-1">
        <li>Cyan · idle sat</li>
        <li>Teal · in view</li>
        <li>Green · serving + link</li>
        <li>Orange · user + ground track</li>
      </ul>
    </div>
  )
}
