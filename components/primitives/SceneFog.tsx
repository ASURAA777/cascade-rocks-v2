interface SceneFogProps {
  className?: string;
}

/**
 * Atmospheric Drift — ARCHITECTURE.md §4.2 primitive 2. Slow,
 * scroll-independent ambient motion used as connective tissue between
 * pinned scenes. Implemented as pure CSS keyframe animation (transform +
 * filter only) rather than a JS rAF loop — the browser compositor runs
 * this off the main thread entirely, which is a stricter reading of
 * "never blocks main-thread scroll work" than a manual rAF loop would be.
 * Tinted from --scrim-color so the fog always matches the current light
 * stage with zero extra JS (globals.css owns the keyframes/CSS class).
 */
export function SceneFog({ className }: SceneFogProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="cascade-fog-blob cascade-fog-blob--a" />
      <div className="cascade-fog-blob cascade-fog-blob--b" />
    </div>
  );
}
