/**
 * Shared content contracts — BLUEPRINT.md §3.
 * Every file in content/ implements these types. Components never accept
 * ad hoc prop shapes for content; they read through these contracts only.
 * This is the literal mechanism that makes asset/copy replacement a data
 * edit rather than a component change (ARCHITECTURE.md §7.1).
 */

export type LightStage =
  | "morning-mist"
  | "midday-clarity"
  | "golden-hour"
  | "dusk"
  | "evening";

export type SceneId =
  | "enter"
  | "valley"
  | "private"
  | "estate"
  | "stay"
  | "table"
  | "experiences"
  | "nature"
  | "comfort"
  | "stories"
  | "plan"
  | "book";

export type MotionPrimitive =
  | "scene-travel"
  | "editorial-reveal"
  | "depth-parallax"
  | "scrubbed-exploration";

export interface MediaSlot {
  id: string;
  type: "image" | "video" | "model3d";
  src: string;
  poster?: string;
  alt: string;
  credit?: "placeholder" | "final";
}

export interface SceneContent {
  id: SceneId;
  order: number;
  anchor: string;
  label: string;
  lightStage: LightStage;
  headline: string;
  subheadline?: string;
  body?: string[];
  mediaSlots: string[];
  motionPrimitive: MotionPrimitive;
  pinned: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  mediaSlot: string;
}

export type ReviewSource = "google" | "booking" | "direct";

export interface Review {
  id: string;
  source: ReviewSource;
  author: string;
  quote: string;
  rating?: number;
  date?: string;
}

export type ContactChannelType = "whatsapp" | "phone" | "email" | "form" | "maps";

export interface ContactChannelDef {
  type: ContactChannelType;
  label: string;
  value: string;
}

export type CTAIntent = "soft" | "direct";

export interface CTAState {
  sceneIds: SceneId[];
  label: string;
  intent: CTAIntent;
}

export interface SiteContent {
  brandName: string;
  brandStatement: string;
  location: {
    region: string;
    fromOoty: string;
    fromCoonoor: string;
  };
  contactChannels: ContactChannelDef[];
  seoKeywords: string[];
}
