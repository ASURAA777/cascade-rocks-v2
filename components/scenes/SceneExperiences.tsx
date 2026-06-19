"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { activities } from "@/content/activities";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";

const scene = getSceneById("experiences")!;

/**
 * Scene 07 — Estate Experiences. Scroll-Scrubbed Exploration, pinned.
 * Same horizontal-walkthrough mechanism as Scene 05, driven entirely by
 * content/activities.ts — the full activity list, each one "a memory
 * waiting to be discovered" (DESIGN.md §5), not a feature grid.
 */
export function SceneExperiences() {
  const ref = useScrollScene<HTMLElement>(({ root, gsap }) => {
    registerSceneActivation(root, "experiences");

    const track = root.querySelector<HTMLElement>("[data-experiences-track]");
    if (!track) return;

    const distance = () => track.scrollWidth - root.clientWidth;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${distance() * 1.2}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section
      ref={ref}
      id="experiences"
      aria-labelledby="experiences-heading"
      data-cursor-label="Drag To Explore"
      className="relative h-screen w-full overflow-hidden bg-mist text-ink"
    >
      <h2 id="experiences-heading" className="sr-only">
        {scene.headline}
      </h2>

      <div className="absolute top-0 left-0 z-[var(--z-chrome)] px-gutter pt-16">
        <CinematicType as="h3" className="text-headline font-display text-ink">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <p className="mt-2 text-body font-body text-ink/70">{scene.subheadline}</p>
        )}
      </div>

      <div data-experiences-track className="flex h-full w-max will-change-transform">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex h-full w-screen shrink-0 items-end p-gutter">
            <div className="absolute inset-0">
              <MediaSlot id={activity.mediaSlot} sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <div className="relative max-w-md">
              <p className="text-headline font-display text-mist">{activity.title}</p>
              <p className="mt-2 text-body font-body text-mist/85">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
