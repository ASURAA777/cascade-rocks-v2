"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsapConfig";

function checkCapability(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  return finePointer && !reducedMotion;
}

/**
 * Custom contextual cursor — ARCHITECTURE.md §16.2. Desktop/fine-pointer
 * only, fully disabled on touch and prefers-reduced-motion (not
 * degraded in place — it simply never mounts). Expands with a label over
 * any element carrying data-cursor-label (the bounded-orbit zone in
 * Scene 04, the scrub-exploration zones in Scenes 05/07, "Listen" in
 * Scene 08). Purely decorative — default focus/cursor behavior underneath
 * is untouched.
 *
 * Uses plain useRef for the dot/ring nodes (not a setState-driven ref
 * callback) — an inline `ref={(node) => setState(...)}` creates a new
 * callback identity every render, which React treats as detach+reattach
 * on every render, which calls setState again: an infinite render loop
 * caught by React as "Maximum update depth exceeded."
 */
export function CustomCursor() {
  const [capable, setCapable] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // One-time client capability probe — see R3FCanvas.tsx for the same pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(checkCapability());
  }, []);

  useEffect(() => {
    if (!capable || !dotRef.current || !ringRef.current) return;

    document.body.classList.add("cursor-none-desktop");

    const setDotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" });
    const setRingX = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" });

    function onMove(event: PointerEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor-label]"
      );
      const nextLabel = target?.dataset.cursorLabel ?? null;
      setLabel(nextLabel);

      const dotHalf = 3;
      const ringHalf = nextLabel ? 40 : 16;
      setDotX(event.clientX - dotHalf);
      setDotY(event.clientY - dotHalf);
      setRingX(event.clientX - ringHalf);
      setRingY(event.clientY - ringHalf);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("cursor-none-desktop");
    };
  }, [capable]);

  if (!capable) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[var(--z-overlay)]">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-mist mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border border-mist mix-blend-difference transition-[width,height] duration-200 ${
          label ? "h-20 w-20" : "h-8 w-8"
        }`}
      >
        {label && (
          <span className="text-center font-body text-[0.65rem] tracking-wide text-mist uppercase">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
