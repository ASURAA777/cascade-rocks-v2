"use client";

import { useMemo } from "react";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { createProgressRef } from "@/lib/motion/progressRef";
import { getSceneById } from "@/content/scenes";
import { site } from "@/content/site";
import { R3FCanvas } from "@/components/three/R3FCanvas";
import { FinalLandscape } from "@/components/three/FinalLandscape";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { CinematicType } from "@/components/primitives/CinematicType";
import { ContactChannel } from "@/components/primitives/ContactChannel";

const scene = getSceneById("book")!;

/**
 * Scene 12 — Book Your Stay. Scene Travel, pinned, R3F closing "exhale".
 * ARCHITECTURE.md §10.1: evening, bonfire-glow light rig. Contact actions
 * are typographic and minimal, laid quietly over the lower portion of
 * the frame (DESIGN.md §5, Scene 12).
 */
export function SceneBook() {
  const progress = useMemo(() => createProgressRef(), []);

  const ref = useScrollScene<HTMLElement>(({ root, ScrollTrigger }) => {
    registerSceneActivation(root, "book");
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => (window.innerWidth < 768 ? "+=110%" : "+=180%"),
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
      id="book"
      aria-labelledby="book-heading"
      className="relative h-screen w-full overflow-hidden bg-ink text-mist"
    >
      <R3FCanvas
        className="absolute inset-0 z-[var(--z-scene)]"
        fallback={<MediaSlot id="book.hero" priority sizes="100vw" className="object-cover" />}
      >
        <FinalLandscape progress={progress} />
      </R3FCanvas>

      {/* Minimum-contrast scrim — ARCHITECTURE.md §13, same safeguard as Scene 01. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[var(--z-scene)] bg-gradient-to-t from-ink/55 via-ink/20 to-ink/10"
      />

      <div className="relative z-[var(--z-chrome)] flex h-full flex-col items-center justify-center gap-10 px-gutter text-center">
        <div>
          <CinematicType as="h2" id="book-heading" className="max-w-3xl text-hero font-display">
            {scene.headline}
          </CinematicType>
          {scene.subheadline && (
            <CinematicType as="p" delay={0.15} className="mt-4 text-body-lg font-body text-mist/85">
              {scene.subheadline}
            </CinematicType>
          )}
        </div>

        <nav aria-label="Contact Cascade Rocks" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {site.contactChannels.map((channel) => (
            <ContactChannel key={channel.type} channel={channel} />
          ))}
        </nav>
      </div>
    </section>
  );
}
