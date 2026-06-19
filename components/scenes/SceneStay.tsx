"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";

const scene = getSceneById("stay")!;

const fragments = [
  { slot: "stay.bedroom", caption: "Nine Queen Bedrooms." },
  { slot: "stay.living", caption: "Four Living Rooms That Become More Bedrooms When You Need Them." },
  { slot: "stay.bathroom", caption: "Seven Bathrooms, Each With Its Own Geyser." },
  { slot: "stay.dining", caption: "A Courtyard That Opens Onto A Waterfall." },
];

/**
 * Scene 05 — Your Stay. Scroll-Scrubbed Exploration, pinned.
 * ARCHITECTURE.md §4.2 primitive 5: a horizontal walkthrough driven by
 * vertical scroll, no cards, no grids, no listing-style room tour —
 * BLUEPRINT.md §11.3: the same Lenis-normalized scroll drives this on
 * touch too, no separate swipe-gesture library.
 */
export function SceneStay() {
  const ref = useScrollScene<HTMLElement>(({ root, gsap }) => {
    registerSceneActivation(root, "stay");

    const track = root.querySelector<HTMLElement>("[data-stay-track]");
    if (!track) return;

    const distance = () => track.scrollWidth - root.clientWidth;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${distance() * 1.4}`,
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
      id="stay"
      aria-labelledby="stay-heading"
      data-cursor-label="Drag To Explore"
      className="relative h-screen w-full overflow-hidden bg-ink text-mist"
    >
      <h2 id="stay-heading" className="sr-only">
        {scene.headline}
      </h2>

      <div className="absolute top-0 left-0 z-[var(--z-chrome)] px-gutter pt-16">
        <CinematicType as="h3" className="text-headline font-display">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <p className="mt-2 text-body font-body text-mist/70">{scene.subheadline}</p>
        )}
      </div>

      <div data-stay-track className="flex h-full w-max will-change-transform">
        {fragments.map((fragment) => (
          <div key={fragment.slot} className="relative flex h-full w-screen shrink-0 items-end p-gutter">
            <div className="absolute inset-0">
              <MediaSlot id={fragment.slot} sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <p className="relative max-w-md text-body-lg font-display text-mist">
              {fragment.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
