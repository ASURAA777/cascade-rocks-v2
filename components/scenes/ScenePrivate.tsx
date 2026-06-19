"use client";

import { motion } from "framer-motion";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { EASE_CINEMATIC_BEZIER } from "@/lib/motion/easing";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";

const scene = getSceneById("private")!;
const images = ["private.gate", "private.veranda", "private.table"];

/**
 * Scene 03 — The Private Estate. Editorial Reveal, natural height.
 * DESIGN.md §5: near-abstraction — a closed gate, an empty chair, an
 * empty table. Compositional emptiness is the entire message.
 */
export function ScenePrivate() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "private");
  });

  return (
    <section
      ref={ref}
      id="private"
      aria-labelledby="private-heading"
      className="relative w-full bg-mist py-scene-y text-ink"
    >
      <h2 id="private-heading" className="sr-only">
        {scene.headline}
      </h2>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-16 px-gutter text-center">
        {scene.body?.map((line, index) => (
          <div key={line} className="flex flex-col items-center gap-10">
            <CinematicType as="h3" className="text-headline font-display">
              {line}
            </CinematicType>
            {images[index] && (
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, ease: EASE_CINEMATIC_BEZIER }}
                className="relative aspect-[16/10] w-full max-w-xl overflow-hidden"
              >
                <MediaSlot
                  id={images[index]}
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
