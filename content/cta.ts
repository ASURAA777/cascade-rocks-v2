import type { CTAState, SceneId } from "@/types/content";

/**
 * The five-state Contextual CTA — ARCHITECTURE.md §6.
 * <ContextualCTA> (Milestone 7) subscribes to useActiveScene() and looks
 * up the matching state here. Visual weight (handled in the component,
 * not here) graduates from "soft" to "direct" across this ordered list —
 * "Begin Your Journey" is closer to a ghost link, "Book Cascade Rocks" is
 * the only fully filled, high-contrast button on the site.
 */
export const ctaStates: CTAState[] = [
  {
    sceneIds: ["enter"],
    label: "Begin Your Journey",
    intent: "soft",
  },
  {
    sceneIds: ["valley", "private", "estate"],
    label: "Explore The Estate",
    intent: "soft",
  },
  {
    sceneIds: ["stay", "table", "experiences", "nature", "comfort"],
    label: "Plan Your Escape",
    intent: "soft",
  },
  {
    sceneIds: ["stories", "plan"],
    label: "Check Availability",
    intent: "direct",
  },
  {
    sceneIds: ["book"],
    label: "Book Cascade Rocks",
    intent: "direct",
  },
];

export function getCTAForScene(sceneId: SceneId): CTAState {
  const state = ctaStates.find((s) => s.sceneIds.includes(sceneId));
  return state ?? ctaStates[0];
}
