"use client";

import Image from "next/image";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { activities } from "@/content/activities";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";

const scene = getSceneById("experiences")!;

/* ── Tea Factory: 5-image collage (3-top / 2-bottom) ── */
const TEA_FACTORY_IMAGES = [
  { src: "/media/experiences/teafactory-1.jpg", alt: "Tea factory — withering floor" },
  { src: "/media/experiences/teafactory-2.jpg", alt: "Tea factory — rolling machine" },
  { src: "/media/experiences/teafactory-3.jpg", alt: "Tea factory — drying chamber" },
  { src: "/media/experiences/teafactory-4.jpg", alt: "Tea factory — sorting floor" },
  { src: "/media/experiences/teafactory-5.jpg", alt: "Tea factory — finished leaf" },
];

function TeaFactoryCollage() {
  return (
    <div className="absolute inset-0 bg-ink">
      <div style={{ position: "absolute", left: "0%", top: "0%", width: "38%", height: "55%", overflow: "hidden" }}>
        <Image src={TEA_FACTORY_IMAGES[0].src} alt={TEA_FACTORY_IMAGES[0].alt} fill sizes="38vw" className="object-cover" />
      </div>
      <div style={{ position: "absolute", left: "39%", top: "0%", width: "30%", height: "55%", overflow: "hidden" }}>
        <Image src={TEA_FACTORY_IMAGES[1].src} alt={TEA_FACTORY_IMAGES[1].alt} fill sizes="30vw" className="object-cover" />
      </div>
      <div style={{ position: "absolute", left: "70%", top: "0%", width: "30%", height: "55%", overflow: "hidden" }}>
        <Image src={TEA_FACTORY_IMAGES[2].src} alt={TEA_FACTORY_IMAGES[2].alt} fill sizes="30vw" className="object-cover" />
      </div>
      <div style={{ position: "absolute", left: "0%", top: "56%", width: "49%", height: "44%", overflow: "hidden" }}>
        <Image src={TEA_FACTORY_IMAGES[3].src} alt={TEA_FACTORY_IMAGES[3].alt} fill sizes="49vw" className="object-cover" />
      </div>
      <div style={{ position: "absolute", left: "50%", top: "56%", width: "50%", height: "44%", overflow: "hidden" }}>
        <Image src={TEA_FACTORY_IMAGES[4].src} alt={TEA_FACTORY_IMAGES[4].alt} fill sizes="50vw" className="object-cover" />
      </div>
    </div>
  );
}

/* ── Strawberry Farm: 3-image collage (1 tall left / 2 stacked right) ── */
const FARM_IMAGES = [
  { src: "/media/experiences/farmvisit-1.jpg", alt: "Strawberry farm — picking rows" },
  { src: "/media/experiences/farmvisit-2.png", alt: "Strawberry farm — fresh berries" },
  { src: "/media/experiences/farmvisit-3.png", alt: "Strawberry farm — estate grounds" },
];

function StrawberryFarmCollage() {
  return (
    <div className="absolute inset-0 bg-ink">
      {/* Left — tall full-height panel */}
      <div style={{ position: "absolute", left: "0%", top: "0%", width: "49%", height: "100%", overflow: "hidden" }}>
        <Image src={FARM_IMAGES[0].src} alt={FARM_IMAGES[0].alt} fill sizes="49vw" className="object-cover" />
      </div>
      {/* Right top */}
      <div style={{ position: "absolute", left: "50%", top: "0%", width: "50%", height: "49%", overflow: "hidden" }}>
        <Image src={FARM_IMAGES[1].src} alt={FARM_IMAGES[1].alt} fill sizes="50vw" className="object-cover" />
      </div>
      {/* Right bottom */}
      <div style={{ position: "absolute", left: "50%", top: "51%", width: "50%", height: "49%", overflow: "hidden" }}>
        <Image src={FARM_IMAGES[2].src} alt={FARM_IMAGES[2].alt} fill sizes="50vw" className="object-cover" />
      </div>
    </div>
  );
}

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

      {/* Top scrim — keeps heading legible over any background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 z-[9] h-48 bg-gradient-to-b from-ink/70 to-transparent"
      />

      <div className="absolute top-0 left-0 z-10 px-gutter pt-16">
        <CinematicType as="h3" className="text-headline font-display text-mist">
          {scene.headline}
        </CinematicType>
        {scene.subheadline && (
          <p className="mt-2 text-body font-body text-mist/75">{scene.subheadline}</p>
        )}
      </div>

      <div data-experiences-track className="flex h-full w-max will-change-transform">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex h-full w-screen shrink-0 items-end p-gutter">

            {activity.id === "tea-factory" ? (
              <TeaFactoryCollage />
            ) : activity.id === "strawberry-farm" ? (
              <StrawberryFarmCollage />
            ) : (
              <div className="absolute inset-0">
                <MediaSlot id={activity.mediaSlot} sizes="100vw" className="object-cover" />
              </div>
            )}

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
