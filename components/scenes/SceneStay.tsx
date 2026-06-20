"use client";

import Image from "next/image";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";

const scene = getSceneById("stay")!;

const fragments = [
  { src: "/media/estate/collage/bedroom-03.jpg", alt: "Bedroom 3 at Cascade Rocks", caption: "Nine Queen Bedrooms." },
  { src: "/media/estate/collage/bedroom-04.jpg", alt: "Bedroom 4 at Cascade Rocks", caption: "Every Bedroom, Entirely Yours." },
  { src: "/media/estate/collage/bedroom-08.jpg", alt: "Bedroom 8 at Cascade Rocks", caption: "Queen Beds. Warm Mornings. Hill Views." },
  { src: "/media/estate/collage/bedroom-11.jpg", alt: "Bedroom 11 at Cascade Rocks", caption: "Seven Bathrooms, Each With Its Own Geyser." },
  { src: "/media/stay/bathroom-02.jpg", alt: "Bathroom at Cascade Rocks", caption: "Seven Bathrooms, Each With Its Own Geyser." },
  { src: "/media/stay/dining-hall.jpg", alt: "Dining hall at Cascade Rocks", caption: "A Courtyard That Opens Onto A Waterfall." },
];

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
      <h2 id="stay-heading" className="sr-only">{scene.headline}</h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[9] h-52 bg-gradient-to-b from-ink/75 to-transparent"
      />

      <div className="absolute top-0 left-0 z-[var(--z-chrome)] px-gutter pt-16">
        <CinematicType as="h3" className="text-headline font-display text-mist">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <p className="mt-2 text-body font-body text-mist/70">{scene.subheadline}</p>
        )}
      </div>

      <div data-stay-track className="flex h-full w-max will-change-transform">
        {fragments.map((fragment) => (
          <div key={fragment.src} className="relative flex h-full w-screen shrink-0 items-end p-gutter">
            <div className="absolute inset-0">
              <Image src={fragment.src} alt={fragment.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <p className="relative max-w-md text-body-lg font-display text-mist">{fragment.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
