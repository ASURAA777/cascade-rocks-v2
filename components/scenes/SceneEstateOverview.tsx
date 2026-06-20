"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { EASE_CINEMATIC } from "@/lib/motion/easing";
import { getSceneById } from "@/content/scenes";

const scene = getSceneById("estate")!;

/**
 * A photo item defines one tile in the collage grid.
 * l/t/w/h are all percentages of the section's 100vw × 100vh bounding box.
 * clipFrom is the GSAP fromTo start clipPath — each column reveals from a
 * different direction so the whole composition feels alive, not mechanical.
 * pos is the timeline insert position (0–1 scale; totalDuration = 1).
 */
type PhotoItem = {
  src: string;
  alt: string;
  l: number;
  t: number;
  w: number;
  h: number;
  clipFrom: string;
  pos: number;
};

/**
 * Three-column magazine layout.
 *
 *  ┌──────────────────────┬───────────────┬───────────────────────┐
 *  │  estate-roofline     │  veranda-view │  bedroom-03           │
 *  │  (0-38%, 0-57%)      │  (39-66%,0-28%)│  (67-100%, 0-52%)    │
 *  │                      ├───────────────┤                       │
 *  │                      │  bedroom-08   │                       │
 *  ├──────────────────────┤  (39-66%,29-56%)├───────────────────────┤
 *  │  group-lawn          ├───────────────┤  bedroom-04           │
 *  │  (0-38%, 58-100%)    │ courtyard-view│  (67-100%, 53-77%)   │
 *  │                      │(39-66%,57-83%)├──────────┬────────────┤
 *  │                      ├───────────────┤bedroom-11│ bedroom-14 │
 *  │                      │aerial-02      │(67-84%,  │(84-100%,   │
 *  │                      │(39-66%,84-100%)│78-100%)  │ 78-100%)   │
 *  └──────────────────────┴───────────────┴──────────┴────────────┘
 *
 * Columns are separated by a 1% dark gap that reads as a crisp editorial rule.
 * Left column reveals from the left. Center from top/bottom alternating.
 * Right column reveals from the right. All are staggered so the eye travels
 * across the composition as the user scrolls.
 */
const PHOTOS: PhotoItem[] = [
  // ─── LEFT COLUMN — reveals left → right ───────────────────────────
  {
    src: "/media/estate/collage/estate-roofline.jpg",
    alt: "Cascade Rocks estate roofline against the Nilgiri sky",
    l: 0, t: 0, w: 38, h: 57,
    clipFrom: "inset(0% 100% 0% 0%)",
    pos: 0,
  },
  {
    src: "/media/estate/collage/group-lawn.jpg",
    alt: "The estate's open acre of lawn under a wide Nilgiri sky",
    l: 0, t: 58, w: 38, h: 42,
    clipFrom: "inset(0% 100% 0% 0%)",
    pos: 0.06,
  },

  // ─── CENTER COLUMN — alternates top ↓ and bottom ↑ reveals ───────
  {
    src: "/media/estate/collage/veranda-view.jpg",
    alt: "Veranda chair overlooking the valley at dawn",
    l: 39, t: 0, w: 27, h: 28,
    clipFrom: "inset(100% 0% 0% 0%)",
    pos: 0.13,
  },
  {
    src: "/media/estate/collage/bedroom-08.jpg",
    alt: "Bedroom 8 — warm afternoon light across the queen bed",
    l: 39, t: 29, w: 27, h: 27,
    clipFrom: "inset(100% 0% 0% 0%)",
    pos: 0.19,
  },
  {
    src: "/media/estate/collage/courtyard-view.jpg",
    alt: "The estate courtyard that opens directly onto the waterfall",
    l: 39, t: 57, w: 27, h: 26,
    clipFrom: "inset(0% 0% 100% 0%)",
    pos: 0.25,
  },
  {
    src: "/media/estate/collage/estate-aerial-02.jpg",
    alt: "Aerial view of the estate and surrounding tea plantations",
    l: 39, t: 84, w: 27, h: 16,
    clipFrom: "inset(0% 0% 100% 0%)",
    pos: 0.31,
  },

  // ─── RIGHT COLUMN — reveals right → left ──────────────────────────
  {
    src: "/media/estate/collage/bedroom-03.jpg",
    alt: "Bedroom 3 — queen suite with hillside view",
    l: 67, t: 0, w: 33, h: 52,
    clipFrom: "inset(0% 0% 0% 100%)",
    pos: 0.09,
  },
  {
    src: "/media/estate/collage/bedroom-04.jpg",
    alt: "Bedroom 4 — morning light through the windows",
    l: 67, t: 53, w: 33, h: 24,
    clipFrom: "inset(0% 0% 0% 100%)",
    pos: 0.21,
  },
  {
    src: "/media/estate/collage/bedroom-11.jpg",
    alt: "Bedroom 11 interior detail",
    l: 67, t: 78, w: 17, h: 22,
    clipFrom: "inset(0% 0% 100% 0%)",
    pos: 0.28,
  },
  {
    src: "/media/estate/collage/bedroom-14.jpg",
    alt: "Bedroom 14 interior detail",
    l: 84, t: 78, w: 16, h: 22,
    clipFrom: "inset(0% 0% 100% 0%)",
    pos: 0.34,
  },
];

/**
 * Scene 04 — Estate Overview.
 *
 * Replaces the R3F massing model with a full-bleed editorial photo collage.
 * Ten real estate photographs tile a 3-column grid (left 38% / center 27% /
 * right 33%, with 1% dark gaps between columns). On scroll each tile
 * clip-path-reveals from a direction consistent with its column, staggered
 * so the eye sweeps across the composition. A Ken-Burns scale (1.1 → 1)
 * runs concurrently on every image for depth. The headline + subhead enter
 * at ~62% scroll progress via the same scrubbed GSAP timeline.
 *
 * GSAP `animation: tl, scrub: 1.5` drives everything — no manual onUpdate.
 * The section stays pinned for the same +=220% desktop / +=150% mobile
 * distance as the original scene so the surrounding scenes are unaffected.
 */
export function SceneEstateOverview() {
  const photoRefs = useRef<(HTMLDivElement | null)[]>(
    Array(PHOTOS.length).fill(null),
  );
  const textRef = useRef<HTMLDivElement>(null);

  const ref = useScrollScene<HTMLElement>(({ root, gsap, ScrollTrigger }) => {
    registerSceneActivation(root, "estate");

    const tl = gsap.timeline({
      defaults: { ease: EASE_CINEMATIC },
    });

    // ── Per-photo clip-path reveal + Ken-Burns scale ──────────────────
    PHOTOS.forEach((photo, i) => {
      const wrapper = photoRefs.current[i];
      if (!wrapper) return;
      const img = wrapper.querySelector("img");

      // Reveal the tile from its column direction
      tl.fromTo(
        wrapper,
        { clipPath: photo.clipFrom },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28 },
        photo.pos,
      );

      // Simultaneously pull the image from slightly zoomed in to 1:1
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.12 },
          { scale: 1, duration: 0.42, ease: "power2.out" },
          photo.pos,
        );
      }
    });

    // ── Headline + subhead enter after photos are largely revealed ────
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        0.62,
      );
    }

    // Anchor the timeline end so GSAP maps scroll → timeline correctly
    tl.to({}, { duration: 0 }, 1.0);

    // Scrub drives the timeline; scrub:1.5 gives a cinematic trailing feel
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => (window.innerWidth < 768 ? "+=150%" : "+=220%"),
      pin: true,
      pinSpacing: true,
      animation: tl,
      scrub: 1.5,
    });
  });

  return (
    <section
      ref={ref}
      id="estate"
      aria-labelledby="estate-collage-heading"
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* ── Photo tiles ─────────────────────────────────────────────── */}
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          ref={(el) => {
            photoRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: `${photo.l}%`,
            top: `${photo.t}%`,
            width: `${photo.w}%`,
            height: `${photo.h}%`,
            // GSAP will override this on tick; the initial value keeps the
            // tile hidden before the timeline first runs.
            clipPath: photo.clipFrom,
            overflow: "hidden",
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>
      ))}

      {/* ── Gradient scrim — legibility for light text over varied photos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10
                   bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
      />

      {/* ── Headline + subhead ──────────────────────────────────────── */}
      <div
        ref={textRef}
        style={{ opacity: 0 }}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col
                   items-center px-gutter pb-20 text-center text-mist"
      >
        <h2
          id="estate-collage-heading"
          className="max-w-3xl text-headline font-display"
        >
          {scene.headline}
        </h2>
        {scene.subheadline && (
          <p className="mt-4 max-w-xl text-body-lg font-body text-mist/80">
            {scene.subheadline}
          </p>
        )}
        <p className="mt-8 text-caption font-body tracking-[0.2em] text-mist/50 uppercase">
          Scroll To Explore
        </p>
      </div>
    </section>
  );
}
