"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;
function ensurePlugins() {
  if (!pluginsRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    pluginsRegistered = true;
  }
}

/**
 * Single scroll authority — BLUEPRINT.md §6. Lenis owns smooth scroll;
 * gsap.ticker drives Lenis's raf loop; Lenis's scroll event drives
 * ScrollTrigger.update. There is exactly one scroll authority on the
 * page — never native scroll, Lenis, and an independent rAF loop
 * competing. Mounted once, at the top of <Experience>.
 */
/**
 * Module-level singleton so any component (ChromeOverlay's Scene Index,
 * for instance) can drive scroll-to without prop-drilling the instance
 * down from <Experience>. Mirrors the lightProgressState pattern.
 */
export const lenisInstance: { current: Lenis | null } = { current: null };

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ensurePlugins();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false, // native touch momentum reads better than simulated
      duration: prefersReducedMotion ? 0.1 : 1.2,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    lenisInstance.current = lenis;

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance.current = null;
    };
  }, []);

  return lenisRef;
}
