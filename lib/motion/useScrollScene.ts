"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollSceneBuilder<T extends HTMLElement> = (args: {
  root: T;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}) => void;

/**
 * Per-scene ScrollTrigger ownership — BLUEPRINT.md §6.
 * Each scene opens its own gsap.context() scoped to its root element and
 * reverts it on unmount. This is the leak-free cleanup contract that lets
 * a 12-scene single-route app survive resize/hot-reload/fast-scroll
 * without orphaned triggers (ARCHITECTURE.md §5.3, §11).
 */
export function useScrollScene<T extends HTMLElement>(
  builder: ScrollSceneBuilder<T>,
  deps: unknown[] = []
): RefObject<T | null> {
  const rootRef = useRef<T | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      builder({ root, gsap, ScrollTrigger });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
