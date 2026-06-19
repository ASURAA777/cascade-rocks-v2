"use client";

import { motion } from "framer-motion";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { EASE_CINEMATIC_BEZIER } from "@/lib/motion/easing";
import { getSceneById } from "@/content/scenes";
import { reviews } from "@/content/reviews";
import { CinematicType } from "@/components/primitives/CinematicType";
import { TrustCard } from "@/components/primitives/TrustCard";

const scene = getSceneById("stories")!;
const offsets = [
  "md:translate-y-6 md:-rotate-1",
  "md:-translate-y-4 md:rotate-1",
  "md:translate-y-10 md:rotate-0",
];

/**
 * Scene 10 — Guest Stories. Editorial Reveal + floating TrustCards.
 * ARCHITECTURE.md §5.2: data-driven from content/reviews.ts, ships with
 * placeholder entries today, swaps to real reviews with no component change.
 */
export function SceneStories() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "stories");
  });

  return (
    <section
      ref={ref}
      id="stories"
      aria-labelledby="stories-heading"
      className="relative w-full bg-mist py-scene-y text-ink"
    >
      <div className="mx-auto max-w-5xl px-gutter text-center">
        <CinematicType as="h2" id="stories-heading" className="text-headline font-display">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <p className="mt-4 text-body-lg font-body text-ink/70">{scene.subheadline}</p>
        )}

        <div className="mt-20 flex flex-wrap items-start justify-center gap-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE_CINEMATIC_BEZIER, delay: index * 0.12 }}
              className={offsets[index % offsets.length]}
            >
              <TrustCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
