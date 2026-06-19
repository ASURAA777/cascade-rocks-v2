"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { ParallaxLayer } from "@/components/primitives/ParallaxLayer";

const scene = getSceneById("table")!;

/**
 * Scene 06 — The Table. Depth Parallax, natural height. Three planes —
 * background hall, midground chef portrait, foreground dish detail —
 * each drifting at a different speed (ARCHITECTURE.md §4.2 primitive 4,
 * DESIGN.md §4.2 three-plane rule). Deliberately irregular/overlapping
 * placement, not a grid.
 */
export function SceneTable() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "table");
  });

  return (
    <section
      ref={ref}
      id="table"
      aria-labelledby="table-heading"
      className="relative w-full overflow-hidden bg-mist py-scene-y text-ink"
    >
      <div className="mx-auto max-w-6xl px-gutter">
        <div className="text-center">
          <CinematicType as="h2" id="table-heading" className="text-headline font-display">
            {scene.headline}
          </CinematicType>
          {scene.subheadline && (
            <p className="mt-4 text-body-lg font-body text-ink/70">{scene.subheadline}</p>
          )}
        </div>

        <div className="relative mt-20 h-[120vh] md:h-[90vh]">
          <ParallaxLayer speed={0.08} className="absolute inset-x-0 top-0 h-2/3 w-full">
            <div className="relative h-full w-full overflow-hidden">
              <MediaSlot id="table.hall" sizes="100vw" className="object-cover" />
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.22} className="absolute top-[18%] left-[8%] w-[55%] md:w-[42%]">
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl">
              <MediaSlot id="table.chef" sizes="(min-width: 768px) 42vw, 55vw" className="object-cover" />
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.35} className="absolute bottom-[6%] right-[6%] w-[40%] md:w-[28%]">
            <div className="relative aspect-square w-full overflow-hidden shadow-xl">
              <MediaSlot id="table.dish" sizes="(min-width: 768px) 28vw, 40vw" className="object-cover" />
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
