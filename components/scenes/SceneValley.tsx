"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { SceneFog } from "@/components/primitives/SceneFog";

const scene = getSceneById("valley")!;

/**
 * Scene 02 — Discover The Valley. Scene Travel, pinned, 2D parallax (no
 * R3F — ARCHITECTURE.md Risk note: 2D layers are "likely sufficient"
 * here, confirmed in BLUEPRINT.md §9 Open Items). The four short lines
 * stagger in as a real scrubbed GSAP timeline, not a viewport reveal —
 * DESIGN.md §5: "map-like, calm, oriented" pacing.
 */
export function SceneValley() {
  const ref = useScrollScene<HTMLElement>(({ root, gsap }) => {
    registerSceneActivation(root, "valley");

    const lines = root.querySelectorAll<HTMLElement>("[data-valley-line]");
    const bg = root.querySelector<HTMLElement>("[data-valley-bg]");

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => (window.innerWidth < 768 ? "+=110%" : "+=200%"),
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    })
      .fromTo(bg, { scale: 1.15 }, { scale: 1, ease: "none", duration: 1 }, 0)
      .from(lines, { opacity: 0, y: 24, stagger: 0.22, ease: "none", duration: 1 }, 0.05);
  });

  return (
    <section
      ref={ref}
      id="valley"
      aria-labelledby="valley-heading"
      className="relative h-screen w-full overflow-hidden bg-stone text-ink"
    >
      <div data-valley-bg className="absolute inset-0">
        <MediaSlot id="valley.flyover" sizes="100vw" className="object-cover" />
      </div>
      <SceneFog />

      <h2 id="valley-heading" className="sr-only">
        {scene.headline}
      </h2>

      <div className="relative z-[var(--z-chrome)] flex h-full flex-col items-center justify-center gap-4 px-gutter text-center">
        {scene.body?.map((line) => (
          <p key={line} data-valley-line className="text-headline font-display text-ink">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
