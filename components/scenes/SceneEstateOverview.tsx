"use client";

import { useMemo } from "react";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { createProgressRef } from "@/lib/motion/progressRef";
import { getSceneById } from "@/content/scenes";
import { R3FCanvas } from "@/components/three/R3FCanvas";
import { EstateOverview3D } from "@/components/three/EstateOverview3D";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { CinematicType } from "@/components/primitives/CinematicType";

const scene = getSceneById("estate")!;

/**
 * Scene 04 — Estate Overview. Scene Travel, pinned, R3F aerial massing
 * model with the site's one bounded drag-orbit interaction.
 * ARCHITECTURE.md §1.2/§10.1, BLUEPRINT.md §5.2.
 */
export function SceneEstateOverview() {
  const progress = useMemo(() => createProgressRef(), []);

  const ref = useScrollScene<HTMLElement>(({ root, ScrollTrigger }) => {
    registerSceneActivation(root, "estate");
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => (window.innerWidth < 768 ? "+=130%" : "+=220%"),
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });
  });

  return (
    <section
      ref={ref}
      id="estate"
      aria-labelledby="estate-heading"
      className="relative h-screen w-full overflow-hidden bg-stone text-ink"
    >
      <R3FCanvas
        className="absolute inset-0 z-[var(--z-scene)]"
        data-cursor-label="Drag To Explore"
        fallback={
          <MediaSlot id="estate.overview" priority sizes="100vw" className="object-cover" />
        }
      >
        <EstateOverview3D progress={progress} />
      </R3FCanvas>

      {/* Minimum-contrast scrim for dark text — ARCHITECTURE.md §13: this
          scene's light stage is "midday clarity" (light), but real aerial
          photography can still carry darker shadowed patches behind type. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[var(--z-scene)] bg-gradient-to-t from-mist/65 via-mist/15 to-transparent"
      />

      <div className="relative z-[var(--z-chrome)] flex h-full flex-col items-center justify-end px-gutter pb-20 text-center">
        <CinematicType as="h2" id="estate-heading" className="max-w-3xl text-headline font-display">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <CinematicType
            as="p"
            delay={0.15}
            className="mt-4 max-w-xl text-body-lg font-body text-ink/80"
          >
            {scene.subheadline}
          </CinematicType>
        )}
      </div>
    </section>
  );
}
