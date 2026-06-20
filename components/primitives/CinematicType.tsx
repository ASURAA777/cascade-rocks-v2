"use client";

import { useScrollScene } from "@/lib/motion/useScrollScene";
import { EASE_CINEMATIC, DURATION } from "@/lib/motion/easing";

const TAGS = { h1: "h1", h2: "h2", h3: "h3", p: "p" } as const;

interface CinematicTypeProps {
  as?: keyof typeof TAGS;
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const HIDDEN_STYLE: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(0.4em)",
  clipPath: "inset(0 0 100% 0)",
};

/**
 * Editorial Reveal — ARCHITECTURE.md §4.2 primitive 3.
 *
 * Originally built on Framer Motion's `whileInView` per BLUEPRINT.md §1's
 * "discrete viewport-entry events are Framer Motion's job" rule. A live
 * browser audit found it never fires on this page — confirmed with a
 * manual IntersectionObserver test that also returned ratio:0 for a
 * definitely-on-screen sanity element (the persistent CTA), reproduced in
 * both headless and headed real Chromium — leaving every headline
 * permanently stuck at its hidden state. Rebuilt on GSAP ScrollTrigger
 * (`once: true`, not scrubbed — still a discrete trigger, not continuous
 * motion) instead, since that mechanism is proven reliable everywhere
 * else on this page (every pin/parallax effect already depends on it).
 * `prefers-reduced-motion` is checked directly rather than via
 * <MotionConfig> since this primitive no longer uses Framer Motion.
 */
export function CinematicType({ as = "h2", id, children, className, delay = 0 }: CinematicTypeProps) {
  const Tag = TAGS[as];

  const ref = useScrollScene<HTMLElement>(({ root, gsap, ScrollTrigger }) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(root, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" });
      return;
    }

    ScrollTrigger.create({
      trigger: root,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(root, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: DURATION.scene,
          delay,
          ease: EASE_CINEMATIC,
        });
      },
    });
  });

  return (
    <Tag
      // Safe: useScrollScene<HTMLElement> covers every tag this primitive renders.
      ref={ref as unknown as React.Ref<HTMLHeadingElement>}
      id={id}
      className={className}
      style={HIDDEN_STYLE}
    >
      {children}
    </Tag>
  );
}
