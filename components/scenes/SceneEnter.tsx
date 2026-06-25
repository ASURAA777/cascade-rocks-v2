"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";

const scene = getSceneById("enter")!;

/**
 * Scene 01 - Enter The Estate.
 * Full-bleed video background, autoplay muted loop.
 * "Cascade Rocks" is the sole hero text; subheadline sits below.
 * R3F terrain removed in favour of real footage.
 */
export function SceneEnter() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "enter");
  });

  return (
    <section
      ref={ref}
      id="enter"
      aria-labelledby="enter-heading"
      className="relative h-screen w-full overflow-hidden bg-ink text-mist"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://res.cloudinary.com/domvgpvwp/video/upload/v1782399006/cascade-rocks-landing-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Scrim — text always legible over any frame of the video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/60"
      />

      {/* Hero content */}
      <div className="relative z-[var(--z-chrome)] flex h-full flex-col items-center justify-center px-gutter text-center">
        <CinematicType as="h1" id="enter-heading" className="text-hero font-display">
          Cascade Rocks
        </CinematicType>
        {scene.subheadline && (
          <CinematicType
            as="p"
            delay={0.2}
            className="mt-6 max-w-xl text-body-lg font-body text-mist/85"
          >
            {scene.subheadline}
          </CinematicType>
        )}
      </div>
    </section>
  );
}
