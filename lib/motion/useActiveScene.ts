"use client";

import { useSyncExternalStore } from "react";
import { ScrollTrigger } from "./gsapConfig";
import type { SceneId } from "@/types/content";

/**
 * Cross-component "which scene is dominant right now" store —
 * ARCHITECTURE.md §6.2, BLUEPRINT.md §4.1/§11.
 *
 * Implemented as 12 lightweight ScrollTrigger.create({ onEnter, onEnterBack })
 * callbacks (one registered per scene, via registerSceneActivation below),
 * not a separate IntersectionObserver tree — cheaper, and guaranteed to
 * stay in sync with the same Lenis-driven scroll authority everything
 * else uses. Consumed via useSyncExternalStore so updates are discrete
 * (only on actual scene change), matching the "debounced, not continuous"
 * aria-live requirement in ARCHITECTURE.md §13.
 */

let activeScene: SceneId = "enter";
const listeners = new Set<() => void>();

function setActiveScene(id: SceneId) {
  if (id === activeScene) return;
  activeScene = id;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): SceneId {
  return activeScene;
}

function getServerSnapshot(): SceneId {
  return "enter";
}

export function useActiveScene(): SceneId {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Call from inside a scene's own gsap.context() (useScrollScene builder)
 * to register that scene's activation trigger. Trigger bounds (top 60% /
 * bottom 40%) match BLUEPRINT.md §4.1.2.
 */
export function registerSceneActivation(root: HTMLElement, id: SceneId) {
  ScrollTrigger.create({
    trigger: root,
    start: "top 60%",
    end: "bottom 40%",
    onEnter: () => setActiveScene(id),
    onEnterBack: () => setActiveScene(id),
  });
}
