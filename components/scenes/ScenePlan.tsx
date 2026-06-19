"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";

const scene = getSceneById("plan")!;

/**
 * Scene 11 — Plan Your Escape. Editorial Reveal, natural height.
 * DESIGN.md §5: wide, layered group-context imagery — warmth and
 * capacity, never a brochure grid of icons.
 */
export function ScenePlan() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "plan");
  });

  return (
    <section
      ref={ref}
      id="plan"
      aria-labelledby="plan-heading"
      className="relative w-full bg-bark py-scene-y text-mist"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-gutter text-center">
        <CinematicType as="h2" id="plan-heading" className="text-headline font-display">
          {scene.headline}
        </CinematicType>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <MediaSlot id="plan.lawn" sizes="100vw" className="object-cover" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {scene.body?.map((line) => (
            <CinematicType key={line} as="p" className="text-body-lg font-body text-mist/90">
              {line}
            </CinematicType>
          ))}
        </div>
      </div>
    </section>
  );
}
