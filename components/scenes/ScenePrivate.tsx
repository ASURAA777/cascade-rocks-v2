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
 * Scene 03 - The Private Estate. Editorial Reveal, natural height.
 * Mountain silhouettes on left and right fill the empty flanks of the
 * centered content column. They use position:sticky so they follow the
 * viewport as the user scrolls through the multi-screen section.
 * Two clip-path layers per side create a foreground/background depth effect.
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

      {/* Sticky mountain decorations - follow the viewport through this scene.
          marginBottom: -100vh cancels the layout height so content position
          is unaffected. pointer-events-none keeps all clicks on the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 h-screen w-full overflow-visible"
        style={{ marginBottom: "-100vh" }}
      >
        {/* Left mountain cluster */}
        <div className="absolute left-0 top-0 h-full w-[28%]">
          {/* Back range - lighter, taller peaks */}
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(0% 100%, 0% 48%, 20% 18%, 34% 40%, 55% 5%, 70% 30%, 86% 16%, 100% 34%, 100% 100%)",
              background: "#cdc8be",
              opacity: 0.55,
            }}
          />
          {/* Front range - darker, lower foothills */}
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(0% 100%, 0% 66%, 16% 54%, 30% 62%, 50% 46%, 68% 58%, 84% 50%, 100% 57%, 100% 100%)",
              background: "#b0aaa0",
              opacity: 0.45,
            }}
          />
        </div>

        {/* Right mountain cluster - mirrored composition */}
        <div className="absolute right-0 top-0 h-full w-[28%]">
          {/* Back range */}
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(0% 34%, 14% 16%, 30% 30%, 45% 5%, 66% 40%, 80% 18%, 100% 48%, 100% 100%, 0% 100%)",
              background: "#cdc8be",
              opacity: 0.55,
            }}
          />
          {/* Front range */}
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(0% 57%, 16% 50%, 32% 58%, 50% 46%, 70% 62%, 84% 54%, 100% 66%, 100% 100%, 0% 100%)",
              background: "#b0aaa0",
              opacity: 0.45,
            }}
          />
        </div>
      </div>

      {/* Content - renders on top of the sticky mountains */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-16 px-gutter text-center">
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
