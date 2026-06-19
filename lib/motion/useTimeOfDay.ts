"use client";

import { useEffect, useState } from "react";
import type { LightStage } from "@/types/content";

/**
 * The Temporal Light System — ARCHITECTURE.md §3.2/§4.6, BLUEPRINT.md §2.2/§5.4.
 *
 * `getLightStage` is a pure function so it can be called identically from
 * React (DOM gradient layer) and from an R3F `useFrame` loop (light rig) —
 * one source of truth for color across the whole site, 3D included
 * (BLUEPRINT.md §10.3). `applyLightProgress` is the single place that
 * mutates the shared, render-free progress store AND writes the CSS
 * custom properties the DOM gradient layer reads — exactly one write per
 * scroll tick, never per-element filters (BLUEPRINT.md §14).
 */

export interface LightStageValues {
  tint: string; // "r g b" — CSS rgb()-ready
  fog: string;
  scrimOpacity: number;
  sunElevation: number; // 0–1, normalized sun height for R3F light rigs
}

interface Anchor extends LightStageValues {
  at: number;
  stage: LightStage;
}

function hex(value: string): [number, number, number] {
  const n = parseInt(value.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbString([r, g, b]: [number, number, number]): string {
  return `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

const ANCHOR_DATA: { at: number; stage: LightStage; tint: string; fog: string; scrimOpacity: number; sunElevation: number }[] = [
  { at: 0, stage: "morning-mist", tint: "#C9D2D6", fog: "#DCE2E0", scrimOpacity: 0.2, sunElevation: 0.3 },
  { at: 0.25, stage: "midday-clarity", tint: "#F2F0E6", fog: "#EDEAE0", scrimOpacity: 0.08, sunElevation: 0.85 },
  { at: 0.5, stage: "golden-hour", tint: "#E8C275", fog: "#D9A24E", scrimOpacity: 0.22, sunElevation: 0.35 },
  { at: 0.75, stage: "dusk", tint: "#6E7A95", fog: "#4F5B72", scrimOpacity: 0.35, sunElevation: 0.1 },
  { at: 1, stage: "evening", tint: "#2B2018", fog: "#1C140F", scrimOpacity: 0.5, sunElevation: 0.02 },
];

const ANCHORS: Anchor[] = ANCHOR_DATA.map((a) => ({
  at: a.at,
  stage: a.stage,
  tint: rgbString(hex(a.tint)),
  fog: rgbString(hex(a.fog)),
  scrimOpacity: a.scrimOpacity,
  sunElevation: a.sunElevation,
}));

/** Pure interpolation — safe to call from React render or an R3F frame loop. */
export function getLightStage(progress: number): LightStageValues {
  const p = Math.min(1, Math.max(0, progress));
  let lower = ANCHOR_DATA[0];
  let upper = ANCHOR_DATA[ANCHOR_DATA.length - 1];

  for (let i = 0; i < ANCHOR_DATA.length - 1; i++) {
    if (p >= ANCHOR_DATA[i].at && p <= ANCHOR_DATA[i + 1].at) {
      lower = ANCHOR_DATA[i];
      upper = ANCHOR_DATA[i + 1];
      break;
    }
  }

  const span = upper.at - lower.at;
  const t = span === 0 ? 0 : (p - lower.at) / span;
  const tint = lerpRgb(hex(lower.tint), hex(upper.tint), t);
  const fog = lerpRgb(hex(lower.fog), hex(upper.fog), t);

  return {
    tint: rgbString(tint),
    fog: rgbString(fog),
    scrimOpacity: lerp(lower.scrimOpacity, upper.scrimOpacity, t),
    sunElevation: lerp(lower.sunElevation, upper.sunElevation, t),
  };
}

/** Nearest named stage for a given progress — used for discrete UI state (chrome glow, cursor). */
export function getNearestStage(progress: number): LightStage {
  let nearest = ANCHORS[0];
  let bestDistance = Infinity;
  for (const anchor of ANCHORS) {
    const distance = Math.abs(anchor.at - progress);
    if (distance < bestDistance) {
      bestDistance = distance;
      nearest = anchor;
    }
  }
  return nearest.stage;
}

/**
 * Render-free shared store. The global ScrollTrigger (LightProgressionLayer)
 * mutates this directly every scroll tick; R3F light rigs read it inside
 * useFrame. No React state subscription in the hot path — see
 * ARCHITECTURE.md §4.6's "one global trigger, cheap write" rationale.
 */
export const lightProgressState = { value: 0 };

const STAGE_CHANGE_EVENT = "cascade:lightstagechange";

/** Single write point: DOM custom properties + the shared store + a discrete stage-change event. */
export function applyLightProgress(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  lightProgressState.value = p;

  const stageValues = getLightStage(p);
  const root = document.documentElement.style;
  root.setProperty("--light-progress", String(p));
  root.setProperty("--scrim-color", stageValues.tint);
  root.setProperty("--scrim-opacity", String(stageValues.scrimOpacity));

  const nearest = getNearestStage(p);
  if (nearest !== lastDispatchedStage) {
    lastDispatchedStage = nearest;
    document.dispatchEvent(new CustomEvent<LightStage>(STAGE_CHANGE_EVENT, { detail: nearest }));
  }
}

let lastDispatchedStage: LightStage | null = null;

/** Discrete (not per-frame) subscription — for UI that only cares which named stage is active. */
export function useNearestLightStage(): LightStage {
  const [stage, setStage] = useState<LightStage>("morning-mist");

  useEffect(() => {
    const handler = (event: Event) => {
      setStage((event as CustomEvent<LightStage>).detail);
    };
    document.addEventListener(STAGE_CHANGE_EVENT, handler);
    return () => document.removeEventListener(STAGE_CHANGE_EVENT, handler);
  }, []);

  return stage;
}
