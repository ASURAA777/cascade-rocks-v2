import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildLodgingBusinessSchema } from "@/lib/seo/schema";
import "./globals.css";

/**
 * Typeface substitution notice (DESIGN.md §2, BLUEPRINT.md §9 Open Items):
 * Canela / GT Sectra Display / Reckless and Neue Montreal / General Sans
 * are the art-directed targets but are commercial, unlicensed faces.
 * Fraunces (variable, high-contrast editorial serif) and Inter (warm
 * grotesk) are structurally equivalent stand-ins loaded the same way the
 * final faces would be — swapping later is a one-line change in this file.
 */
const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#1a1714",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = buildLodgingBusinessSchema();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a
          href="#enter"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-overlay)] focus:rounded focus:bg-mist focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
