"use client";

import { MotionConfig } from "framer-motion";
import { useLenis } from "@/lib/motion/useLenis";
import { LightProgressionLayer } from "@/components/experience/LightProgressionLayer";
import { ChromeOverlay } from "@/components/experience/ChromeOverlay";
import { ContextualCTA } from "@/components/primitives/ContextualCTA";
import { CustomCursor } from "@/components/experience/CustomCursor";
import { Preloader } from "@/components/experience/Preloader";
import { SceneEnter } from "@/components/scenes/SceneEnter";
import { SceneValley } from "@/components/scenes/SceneValley";
import { ScenePrivate } from "@/components/scenes/ScenePrivate";
import { SceneEstateOverview } from "@/components/scenes/SceneEstateOverview";
import { SceneStay } from "@/components/scenes/SceneStay";
import { SceneTable } from "@/components/scenes/SceneTable";
import { SceneExperiences } from "@/components/scenes/SceneExperiences";
import { SceneNature } from "@/components/scenes/SceneNature";
import { SceneComfort } from "@/components/scenes/SceneComfort";
import { SceneStories } from "@/components/scenes/SceneStories";
import { ScenePlan } from "@/components/scenes/ScenePlan";
import { SceneBook } from "@/components/scenes/SceneBook";

/**
 * The single connected cinematic timeline — ARCHITECTURE.md §5.1.
 * Owns the one scroll authority (Lenis + GSAP ticker) and the global
 * light-progression layer; renders all 12 scenes, in order, with no
 * reordering/omission logic. <MotionConfig reducedMotion="user"> is the
 * one place prefers-reduced-motion is wired into every Framer Motion
 * animation on the site (ARCHITECTURE.md §12/§13).
 */
export function Experience() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <LightProgressionLayer />

      <main>
        <SceneEnter />
        <SceneValley />
        <ScenePrivate />
        <SceneEstateOverview />
        <SceneStay />
        <SceneTable />
        <SceneExperiences />
        <SceneNature />
        <SceneComfort />
        <SceneStories />
        <ScenePlan />
        <SceneBook />
      </main>

      <ChromeOverlay>
        <ContextualCTA />
      </ChromeOverlay>

      <CustomCursor />
      <Preloader />
    </MotionConfig>
  );
}
