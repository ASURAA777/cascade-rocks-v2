"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { SceneFog } from "@/components/primitives/SceneFog";

const scene = getSceneById("nature")!;

/**
 * Scene 08 — Meet Nature. Editorial Reveal, the slowest-paced scene on
 * the site. ARCHITECTURE.md §2: emotional peak (calm), deliberately no
 * extra in-scene CTA — the persistent contextual CTA already covers it.
 * DESIGN.md §5: pure landscape, held long, enormous negative space.
 */
export function SceneNature() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "nature");
  });

  return (
    <section
      ref={ref}
      id="nature"
      aria-labelledby="nature-heading"
      data-cursor-label="Listen"
      className="relative w-full overflow-hidden bg-ink py-scene-y text-mist"
    >
      <div className="absolute inset-0 opacity-40">
        <MediaSlot id="nature.tree" sizes="100vw" className="object-cover" />
      </div>
      <SceneFog />

      <h2 id="nature-heading" className="sr-only">
        {scene.headline}
      </h2>

      <div className="relative z-[var(--z-chrome)] mx-auto flex max-w-2xl flex-col items-center gap-32 px-gutter text-center">
        {scene.body?.map((line, index) => (
          <CinematicType key={line} as="h3" delay={index * 0.1} className="text-headline font-display">
            {line}
          </CinematicType>
        ))}
      </div>
    </section>
  );
}
