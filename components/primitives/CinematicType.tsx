"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_CINEMATIC_BEZIER, DURATION } from "@/lib/motion/easing";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: "0.4em", clipPath: "inset(0 0 100% 0)" },
  shown: { opacity: 1, y: "0em", clipPath: "inset(0 0 0% 0)" },
};

interface CinematicTypeProps {
  as?: keyof typeof TAGS;
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Editorial Reveal — ARCHITECTURE.md §4.2 primitive 3. A held title-card
 * reveal triggered by entering the viewport (a discrete event, not
 * scroll-scrubbed) — the correct Framer Motion use case per BLUEPRINT.md
 * §1's GSAP/Framer division of labor. `prefers-reduced-motion` is
 * handled globally via <MotionConfig reducedMotion="user"> in Experience.
 */
export function CinematicType({ as = "h2", id, children, className, delay = 0 }: CinematicTypeProps) {
  const Component = TAGS[as];

  return (
    <Component
      id={id}
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: DURATION.scene, ease: EASE_CINEMATIC_BEZIER, delay }}
    >
      {children}
    </Component>
  );
}
