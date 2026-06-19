import type { MediaSlot } from "@/types/content";

/**
 * The asset-swap mechanism — ARCHITECTURE.md §7.2, BLUEPRINT.md §3.
 *
 * Every visual moment in the journey is keyed here. Components never
 * hardcode a path; they render <MediaSlot id="..." /> and look it up in
 * this manifest. Replacing a placeholder with final photography/video is
 * editing exactly one line below — `src` (and `type`, if a still becomes
 * a video) — with zero component, layout, or animation changes.
 *
 * Until real assets exist, every slot points at one of the five graded
 * light-stage gradients in /public/placeholders/gradients/ (matching the
 * scene's light stage), per DESIGN.md §7's "grade-ability" and
 * "compositional match" placeholder requirements. `alt` already describes
 * the eventual final shot per the DESIGN.md §7 sourcing brief, so
 * accessibility/SEO text is correct even while the visual is a stand-in.
 */
export const media: Record<string, MediaSlot> = {
  "enter.hero": {
    id: "enter.hero",
    type: "image",
    src: "/placeholders/gradients/morning-mist.svg",
    alt: "Misty hill valley at dawn, low horizon, the Nilgiri Hills not yet fully revealed",
    credit: "placeholder",
  },
  "valley.flyover": {
    id: "valley.flyover",
    type: "image",
    src: "/placeholders/gradients/morning-mist.svg",
    alt: "Wide tea-terrace landscape receding into morning mist toward Ooty and Coonoor",
    credit: "placeholder",
  },
  "private.gate": {
    id: "private.gate",
    type: "image",
    src: "/placeholders/gradients/morning-mist.svg",
    alt: "A closed estate gate in soft morning light, no one in frame",
    credit: "placeholder",
  },
  "private.veranda": {
    id: "private.veranda",
    type: "image",
    src: "/placeholders/gradients/morning-mist.svg",
    alt: "An empty veranda chair overlooking the hills at dawn",
    credit: "placeholder",
  },
  "private.table": {
    id: "private.table",
    type: "image",
    src: "/placeholders/gradients/morning-mist.svg",
    alt: "A long table set for many, empty of people, in clearing morning mist",
    credit: "placeholder",
  },
  "estate.overview": {
    id: "estate.overview",
    type: "image",
    src: "/placeholders/gradients/midday-clarity.svg",
    alt: "High aerial view of the estate: main house, courtyard, waterfall and lawn seen as one",
    credit: "placeholder",
  },
  "stay.bedroom": {
    id: "stay.bedroom",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Warm late-afternoon light across a queen bedroom corner",
    credit: "placeholder",
  },
  "stay.living": {
    id: "stay.living",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "A living room window framing the lawn in golden-hour light",
    credit: "placeholder",
  },
  "stay.bathroom": {
    id: "stay.bathroom",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Bathroom detail with geyser, soft natural light",
    credit: "placeholder",
  },
  "stay.dining": {
    id: "stay.dining",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Glimpse through an open doorway into the dining hall",
    credit: "placeholder",
  },
  "table.chef": {
    id: "table.chef",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Chef Subrata Pandey's hands plating a dish, steam rising",
    credit: "placeholder",
  },
  "table.dish": {
    id: "table.dish",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Close detail of a plated dish catching golden-hour light",
    credit: "placeholder",
  },
  "table.hall": {
    id: "table.hall",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Empty dining hall table set for many, catching late light",
    credit: "placeholder",
  },
  "experiences.teaFactory": {
    id: "experiences.teaFactory",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "A hand brushing fresh tea leaves at the estate's tea factory",
    credit: "placeholder",
  },
  "experiences.waterfallTrek": {
    id: "experiences.waterfallTrek",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Bare feet crossing a brook on the waterfall trek",
    credit: "placeholder",
  },
  "experiences.brook": {
    id: "experiences.brook",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "A brook winding through the forest near the estate",
    credit: "placeholder",
  },
  "experiences.jamaraiForest": {
    id: "experiences.jamaraiForest",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Canopy light filtering through the Jamarai Mini Forest Trek",
    credit: "placeholder",
  },
  "experiences.teaService": {
    id: "experiences.teaService",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Tea poured at a quiet estate tea service, steam rising from the cup",
    credit: "placeholder",
  },
  "experiences.strawberryFarm": {
    id: "experiences.strawberryFarm",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "A strawberry held mid-pick, dew still on it, at the estate's strawberry farm",
    credit: "placeholder",
  },
  "experiences.cattleShed": {
    id: "experiences.cattleShed",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Cool morning light inside the estate's cattle shed during milking",
    credit: "placeholder",
  },
  "experiences.bonfire": {
    id: "experiences.bonfire",
    type: "image",
    src: "/placeholders/gradients/golden-hour.svg",
    alt: "Smoke curling from an evening bonfire just beginning to catch",
    credit: "placeholder",
  },
  "nature.tree": {
    id: "nature.tree",
    type: "image",
    src: "/placeholders/gradients/dusk.svg",
    alt: "A single tree silhouette against a fading dusk sky",
    credit: "placeholder",
  },
  "comfort.lamp": {
    id: "comfort.lamp",
    type: "image",
    src: "/placeholders/gradients/evening.svg",
    alt: "A single warm lamp beside a sofa in the evening",
    credit: "placeholder",
  },
  "comfort.lights": {
    id: "comfort.lights",
    type: "image",
    src: "/placeholders/gradients/evening.svg",
    alt: "Disco lights caught mid-pulse in the estate's dancing zone",
    credit: "placeholder",
  },
  "stories.veranda": {
    id: "stories.veranda",
    type: "image",
    src: "/placeholders/gradients/evening.svg",
    alt: "A quiet veranda at evening, the hour for reflecting on a stay",
    credit: "placeholder",
  },
  "plan.lawn": {
    id: "plan.lawn",
    type: "image",
    src: "/placeholders/gradients/evening.svg",
    alt: "The estate's large lawn under string and lamp light, set for a gathering",
    credit: "placeholder",
  },
  "book.hero": {
    id: "book.hero",
    type: "image",
    src: "/placeholders/gradients/evening.svg",
    alt: "The estate at night: bonfire glow, lit windows, hills silhouetted against a darkening sky",
    credit: "placeholder",
  },
};

export function getMedia(id: string): MediaSlot {
  const slot = media[id];
  if (!slot) {
    throw new Error(`No media slot registered for id "${id}". Add it to content/media.ts.`);
  }
  return slot;
}
