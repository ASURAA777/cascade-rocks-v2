import type { SiteContent } from "@/types/content";

/**
 * Global brand/contact/SEO facts. `contactChannels` values below are
 * structurally correct placeholders (consistent with the rest of the
 * placeholder-asset strategy) — replace with the estate's real WhatsApp
 * number, phone, email, and Maps link before launch. No component reads
 * a hardcoded contact value anywhere else in the codebase; they all read
 * through this file.
 */
export const site: SiteContent = {
  brandName: "Cascade Rocks",
  brandStatement: "A Private Estate In Kotagiri",
  location: {
    region: "Kotagiri, Nilgiri Hills, Tamil Nadu",
    fromOoty: "45 Minutes From Ooty",
    fromCoonoor: "25 Minutes From Coonoor",
  },
  contactChannels: [
    {
      type: "whatsapp",
      label: "Message On WhatsApp",
      value: "https://wa.me/910000000000",
    },
    {
      type: "phone",
      label: "Call The Estate",
      value: "tel:+910000000000",
    },
    {
      type: "email",
      label: "Send An Email",
      value: "mailto:stay@cascade-rocks-kotagiri.com",
    },
    {
      // No form-handling/email-delivery service (e.g. Formspree, a server
      // action backed by SMTP) is specified in BLUEPRINT.md's stack, so
      // this resolves to a pre-filled mailto rather than a fabricated
      // backend. Swap to a real submission handler once one is chosen.
      type: "form",
      label: "Send An Inquiry",
      value: "mailto:stay@cascade-rocks-kotagiri.com?subject=Inquiry%20-%20Cascade%20Rocks",
    },
    {
      type: "maps",
      label: "View On Google Maps",
      value: "https://maps.google.com/?q=Kotagiri,Nilgiris,Tamil+Nadu",
    },
  ],
  seoKeywords: [
    "Cascade Rocks",
    "Cascade Rocks Kotagiri",
    "Cascade Rocks Nilgiris",
    "Private Estate Kotagiri",
    "Luxury Stay Kotagiri",
    "Group Stay Kotagiri",
    "Private Villa Nilgiris",
    "Estate Stay Near Ooty",
    "Luxury Estate Near Coonoor",
  ],
};
