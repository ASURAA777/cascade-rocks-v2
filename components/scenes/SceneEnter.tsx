"use client";

import { useMemo } from "react";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { createProgressRef } from "@/lib/motion/progressRef";
import { getSceneById } from "@/content/scenes";
import { R3FCanvas } from "@/components/three/R3FCanvas";
import { TerrainHero } from "@/components/three/TerrainHero";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { CinematicType } from "@/components/primitives/CinematicType";

const scene = getSceneById("enter")!;

/**
 * Scene 01 — Enter The Estate. Scene Travel, pinned, R3F hero.
 * BLUEPRINT.md §4 row 1, §5.1. DESIGN.md §5: open on cloud, not land — the
 * brand name is the smallest, last element on screen.
 */
export function SceneEnter() {
  const progress = useMemo(() => createProgressRef(), []);

  const ref = useScrollScene<HTMLElement>(({ root, ScrollTrigger }) => {
    registerSceneActivation(root, "enter");
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => (window.innerWidth < 768 ? "+=120%" : "+=250%"),
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
      id="enter"
      aria-labelledby="enter-heading"
      className="relative h-screen w-full overflow-hidden bg-ink text-mist"
    >
      <R3FCanvas
        className="absolute inset-0 z-[var(--z-scene)]"
        fallback={
          <MediaSlot id="enter.hero" priority sizes="100vw" className="object-cover" />
        }
      >
        <TerrainHero progress={progress} />
      </R3FCanvas>

      {/* Minimum-contrast scrim for light text over the (potentially light,
          misty) hero — ARCHITECTURE.md §13: enforced structurally, not left
          to asset luck. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[var(--z-scene)] bg-gradient-to-b from-ink/10 via-ink/35 to-ink/60"
      />

      <div className="relative z-[var(--z-chrome)] flex h-full flex-col items-center justify-center px-gutter text-center">
        <CinematicType as="h1" id="enter-heading" className="max-w-4xl text-hero font-display">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <CinematicType
            as="p"
            delay={0.15}
            className="mt-6 max-w-xl text-body-lg font-body text-mist/85"
          >
            {scene.subheadline}
          </CinematicType>
        )}
        {scene.body?.[0] && (
          <CinematicType
            as="p"
            delay={0.35}
            className="mt-10 text-caption font-body tracking-[0.2em] text-mist/70 uppercase"
          >
            {scene.body[0]}
          </CinematicType>
        )}
      </div>
    </section>
  );
}
