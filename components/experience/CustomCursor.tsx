"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

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
 */
export function CustomCursor() {
  const [capable, setCapable] = useState(false);
  const [refs, setRefs] = useState<{ dot: HTMLDivElement | null; ring: HTMLDivElement | null }>({
    dot: null,
    ring: null,
  });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // One-time client capability probe — see R3FCanvas.tsx for the same pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(checkCapability());
  }, []);

  useEffect(() => {
    if (!capable || !refs.dot || !refs.ring) return;

    document.body.classList.add("cursor-none-desktop");

    const setDotX = gsap.quickTo(refs.dot, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(refs.dot, "y", { duration: 0.12, ease: "power3.out" });
    const setRingX = gsap.quickTo(refs.ring, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(refs.ring, "y", { duration: 0.35, ease: "power3.out" });

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
  }, [capable, refs]);

  if (!capable) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[var(--z-overlay)]">
      <div
        ref={(node) => setRefs((prev) => ({ ...prev, dot: node }))}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-mist mix-blend-difference"
      />
      <div
        ref={(node) => setRefs((prev) => ({ ...prev, ring: node }))}
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
