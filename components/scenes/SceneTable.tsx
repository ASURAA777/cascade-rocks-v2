"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { registerSceneActivation } from "@/lib/motion/useActiveScene";
import { getSceneById } from "@/content/scenes";
import { CinematicType } from "@/components/primitives/CinematicType";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { ParallaxLayer } from "@/components/primitives/ParallaxLayer";

const scene = getSceneById("table")!;

export function SceneTable() {
  const ref = useScrollScene<HTMLElement>(({ root }) => {
    registerSceneActivation(root, "table");
  });

  return (
    <section
      ref={ref}
      id="table"
      aria-labelledby="table-heading"
      className="relative w-full overflow-hidden bg-mist py-scene-y text-ink"
    >
      <div className="mx-auto max-w-6xl px-gutter">

        {/* Heading */}
        <div className="text-center">
          <CinematicType as="h2" id="table-heading" className="text-headline font-display">
            {scene.headline}
          </CinematicType>
          {scene.subheadline && (
            <p className="mt-4 text-body-lg font-body text-ink/70">{scene.subheadline}</p>
          )}
        </div>

        {/* Cascade composition */}
        <div className="relative mt-16 h-[95vh] md:h-[88vh]">

          {/* ── Mountain silhouettes ── */}

          {/* Bottom-left mountains — peaks pointing UP */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-[48%] h-[42%] z-[1]">
            {/* Back range */}
            <div className="absolute inset-0" style={{
              clipPath: "polygon(0% 100%, 0% 52%, 9% 32%, 20% 50%, 32% 14%, 44% 40%, 57% 6%, 69% 36%, 81% 20%, 92% 44%, 100% 30%, 100% 100%)",
              background: "#cdc8be",
              opacity: 0.6,
            }} />
            {/* Front range */}
            <div className="absolute inset-0" style={{
              clipPath: "polygon(0% 100%, 0% 68%, 11% 52%, 24% 66%, 37% 40%, 50% 58%, 63% 36%, 76% 54%, 88% 44%, 100% 58%, 100% 100%)",
              background: "#b0aaa0",
              opacity: 0.5,
            }} />
          </div>

          {/* Top-right mountains — peaks pointing DOWN (inverted) */}
          <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 w-[48%] h-[38%] z-[1]">
            {/* Back range (inverted) */}
            <div className="absolute inset-0" style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 48%, 91% 30%, 80% 56%, 68% 22%, 56% 52%, 43% 16%, 31% 48%, 19% 28%, 8% 52%, 0% 36%)",
              background: "#cdc8be",
              opacity: 0.6,
            }} />
            {/* Front range (inverted) */}
            <div className="absolute inset-0" style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 30%, 89% 48%, 77% 20%, 64% 46%, 52% 14%, 39% 44%, 27% 26%, 14% 48%, 3% 32%, 0% 0%)",
              background: "#b0aaa0",
              opacity: 0.5,
            }} />
          </div>

          {/* ── Images ── */}

          {/* 1 — Top-left */}
          <ParallaxLayer speed={0.08} className="absolute top-[0%] left-[2%] w-[44%] md:w-[38%] z-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl">
              <MediaSlot id="table.hall" sizes="(min-width: 768px) 38vw, 44vw" className="object-cover" />
            </div>
          </ParallaxLayer>

          {/* 2 — Center, overlaps bottom-right of image 1 */}
          <ParallaxLayer speed={0.20} className="absolute top-[20%] left-[20%] w-[58%] md:w-[52%] z-20">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl">
              <MediaSlot id="table.chef" sizes="(min-width: 768px) 52vw, 58vw" className="object-cover" />
            </div>
          </ParallaxLayer>

          {/* 3 — Bottom-right, overlaps corner of image 2 */}
          <ParallaxLayer speed={0.34} className="absolute top-[46%] right-[2%] w-[44%] md:w-[36%] z-30">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl">
              <MediaSlot id="table.dish" sizes="(min-width: 768px) 36vw, 44vw" className="object-cover" />
            </div>
          </ParallaxLayer>

        </div>
      </div>
    </section>
  );
}
