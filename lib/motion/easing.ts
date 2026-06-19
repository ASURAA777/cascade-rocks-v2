/**
 * Single custom ease used across the entire site — ARCHITECTURE.md §4.3.
 * One ease everywhere is what makes the motion read as "directed by one
 * hand" rather than assembled from per-component defaults.
 */
export const EASE_CINEMATIC = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Same curve, as the numeric tuple Framer Motion's `ease` expects (GSAP/CSS take the string above). */
export const EASE_CINEMATIC_BEZIER: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  scene: 1.1,
  micro: 0.4,
} as const;
