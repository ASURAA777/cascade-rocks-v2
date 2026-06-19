"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActiveScene } from "@/lib/motion/useActiveScene";
import { getCTAForScene } from "@/content/cta";
import { site } from "@/content/site";
import { lenisInstance } from "@/lib/motion/useLenis";
import { EASE_CINEMATIC_BEZIER, DURATION } from "@/lib/motion/easing";

/**
 * The five-state Contextual CTA — ARCHITECTURE.md §6. Label crossfades
 * (small upward fade/slide, never an abrupt swap) as useActiveScene()
 * changes; visual weight graduates from ghost ("soft") to fully filled
 * ("direct") across the five states. A separate aria-live region
 * announces the label change exactly once per transition.
 */
export function ContextualCTA() {
  const activeScene = useActiveScene();
  const cta = getCTAForScene(activeScene);
  const isDirect = cta.intent === "direct";

  function handleClick() {
    if (activeScene === "book") {
      window.open(site.contactChannels[0].value, "_blank", "noopener,noreferrer");
      return;
    }
    lenisInstance.current?.scrollTo("#book", { duration: 1.6 });
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`overflow-hidden rounded-full px-7 py-3 font-body text-caption tracking-[0.15em] whitespace-nowrap uppercase transition-colors ${
          isDirect
            ? "bg-mist text-ink hover:bg-mist/90"
            : "border border-mist/50 text-mist hover:border-mist"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={cta.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.micro, ease: EASE_CINEMATIC_BEZIER }}
            className="inline-block"
          >
            {cta.label}
          </motion.span>
        </AnimatePresence>
      </button>
      <span aria-live="polite" className="sr-only">
        {cta.label}
      </span>
    </>
  );
}
