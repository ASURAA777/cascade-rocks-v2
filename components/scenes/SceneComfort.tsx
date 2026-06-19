"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { ParallaxLayer } from "@/components/primitives/ParallaxLayer";

const scene = getSceneById("comfort")!;

/**
 * Scene 09 — Modern Comforts. Depth Parallax (minimal), natural height.
 * DESIGN.md §5: "the most ordinary imagery on the site, deliberately —
 * reassurance, not spectacle." Facilities render as a quiet flowing list
 * of labels rather than an icon grid, consistent with the no-card-grid
 * mandate at this stage (no icon asset library exists yet either).
 */
export function SceneComfort() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "comfort");
  });

  return (
    <section
      ref={ref}
      id="comfort"
      aria-labelledby="comfort-heading"
      className="relative w-full overflow-hidden bg-ink py-scene-y text-mist"
    >
      <div className="mx-auto max-w-5xl px-gutter">
        <div className="text-center">
          <CinematicType as="h2" id="comfort-heading" className="text-headline font-display">
            {scene.headline}
          </CinematicType>
          {scene.subheadline && (
            <p className="mt-4 text-body-lg font-body text-mist/70">{scene.subheadline}</p>
          )}
        </div>

        <div className="relative mt-16 h-[60vh] overflow-hidden">
          <ParallaxLayer speed={0.1} className="absolute inset-0">
            <MediaSlot id="comfort.lamp" sizes="100vw" className="object-cover" />
          </ParallaxLayer>
          <ParallaxLayer speed={0.3} className="absolute bottom-[8%] right-[10%] w-[32%]">
            <div className="relative aspect-square w-full overflow-hidden shadow-xl">
              <MediaSlot id="comfort.lights" sizes="32vw" className="object-cover" />
            </div>
          </ParallaxLayer>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {scene.body?.map((line) => (
            <p key={line} className="text-body font-body text-mist/85">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
