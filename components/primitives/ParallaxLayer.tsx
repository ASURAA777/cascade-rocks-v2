"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";

interface ParallaxLayerProps {
  /** -1..1. 0 reads as the background-most plane, higher values drift more (foreground). */
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Depth Parallax — ARCHITECTURE.md §4.2 primitive 4. Stack 2–4 of these
 * (foreground texture / midground subject / background atmosphere, per
 * DESIGN.md §4's three-plane rule) inside a relatively-positioned scene
 * container, each with a different `speed`, to fake spatial depth
 * without 3D cost.
 */
export function ParallaxLayer({ speed = 0.2, className, children }: ParallaxLayerProps) {
  const ref = useScrollScene<HTMLDivElement>(({ root, gsap }) => {
    gsap.fromTo(
      root,
      { yPercent: -speed * 20 },
      {
        yPercent: speed * 20,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
