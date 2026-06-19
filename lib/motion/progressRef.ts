/**
 * Lenis/ScrollTrigger-to-R3F bridge — BLUEPRINT.md §5.2/§5.4.
 * A scene's own ScrollTrigger writes its local 0–1 progress into this
 * plain mutable object every scroll tick; the scene's R3F camera reads it
 * inside useFrame. No React state, no per-frame re-renders — the same
 * "write once, read elsewhere" pattern as lightProgressState.
 */
export interface ProgressRef {
  value: number;
}

export function createProgressRef(): ProgressRef {
  return { value: 0 };
}
