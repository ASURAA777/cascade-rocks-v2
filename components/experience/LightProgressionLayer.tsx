"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { applyLightProgress } from "@/lib/motion/useTimeOfDay";

/**
 * Global Light Progression — ARCHITECTURE.md §4.6.
 * One document-scoped ScrollTrigger drives the entire morning-mist →
 * evening sweep. This is the only place day-to-evening is painted on the
 * DOM side: a single fixed tint layer, one CSS property written per
 * scroll tick (BLUEPRINT.md §14) — never per-element image filters.
 */
export function LightProgressionLayer() {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => applyLightProgress(self.progress),
    });

    applyLightProgress(0);

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-light-layer)]"
      style={{
        backgroundColor: "rgb(var(--scrim-color) / var(--scrim-opacity))",
        mixBlendMode: "soft-light",
      }}
    />
  );
}
