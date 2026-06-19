import type { Metadata } from "next";
import { site } from "@/content/site";

export const SITE_URL = "https://www.cascade-rocks-kotagiri.com";

/**
 * Centralized metadata builder — ARCHITECTURE.md §8.2. Keywords/title/
 * description are woven from content/site.ts so SEO copy lives in the
 * same content layer as everything else, not duplicated in app/layout.tsx.
 */
export function buildMetadata(): Metadata {
  const title = `${site.brandName} — ${site.brandStatement}`;
  const description =
    "A private estate hidden in the Nilgiri Hills, Kotagiri — waterfalls, tea plantations and unforgettable stays come together, 45 minutes from Ooty, 25 minutes from Coonoor.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${site.brandName}`,
    },
    description,
    keywords: site.seoKeywords,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: site.brandName,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
