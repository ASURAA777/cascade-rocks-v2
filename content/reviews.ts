import type { Review } from "@/types/content";

/**
 * Guest Stories — Scene 10. ARCHITECTURE.md §7.3: ships seeded with
 * placeholder entries, ready for real Google/Booking/direct reviews
 * later. Entries are deliberately written as obvious placeholders rather
 * than fabricated guest quotes — shipping invented testimonials credited
 * to real platforms would misrepresent guests who never stayed. Replace
 * each entry's `quote`/`author`/`rating` with real review data when it
 * exists; `<TrustCard>` (Milestone 6) needs no changes either way.
 */
export const reviews: Review[] = [
  {
    id: "placeholder-1",
    source: "direct",
    author: "Guest review pending",
    quote: "Real guest stories will appear here once available — this card is a layout placeholder.",
  },
  {
    id: "placeholder-2",
    source: "google",
    author: "Google review pending",
    quote: "Real guest stories will appear here once available — this card is a layout placeholder.",
  },
  {
    id: "placeholder-3",
    source: "booking",
    author: "Booking platform review pending",
    quote: "Real guest stories will appear here once available — this card is a layout placeholder.",
  },
];
