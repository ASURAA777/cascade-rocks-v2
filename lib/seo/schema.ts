import { site } from "@/content/site";

const SITE_URL = "https://www.cascade-rocks-kotagiri.com";

/**
 * LodgingBusiness JSON-LD — ARCHITECTURE.md §8.2/§9. Coordinates are an
 * approximate Kotagiri town-center pin pending the property's exact
 * survey coordinates; update once available, no other change needed.
 */
export function buildLodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.brandName,
    description: site.brandStatement,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kotagiri",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.4256,
      longitude: 76.8525,
    },
    amenityFeature: [
      "Fiber Broadband WiFi",
      "Music System",
      "Karaoke",
      "Disco Lights",
      "Dancing Zone",
      "UPS Backup",
      "Geysers In Every Bathroom",
      "Bonfire Area",
      "Large Lawn",
      "Parking For Tempo Traveller Or 6 Cars",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    numberOfRooms: 9,
    sameAs: [] as string[],
  };
}
