"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { EASE_CINEMATIC_BEZIER } from "@/lib/motion/easing";

const MIN_DURATION_MS = 2200;
const REDUCED_DURATION_MS = 200;

/**
 * Bespoke arrival sequence — ARCHITECTURE.md §16.1. A short, skippable
 * mist-dissolve logo assembly doubling as the asset-preload window. No
 * forced minimum watch time: any pointerdown/keydown dismisses it
 * immediately. prefers-reduced-motion skips straight to a plain
 * cross-fade. Locks page scroll while visible so the visitor can't start
 * scrolling through Scene 01 underneath it.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(prefersReduced);

    const timer = window.setTimeout(
      () => setVisible(false),
      prefersReduced ? REDUCED_DURATION_MS : MIN_DURATION_MS
    );

    function skip() {
      setVisible(false);
    }
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC_BEZIER }}
          className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center bg-ink"
        >
          <motion.p
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(18px)" }
            }
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: reducedMotion ? 0.3 : 1.6, ease: EASE_CINEMATIC_BEZIER }}
            className="font-display text-headline text-mist"
          >
            {site.brandName}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
