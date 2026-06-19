import Image from "next/image";
import { getMedia } from "@/content/media";

interface MediaSlotProps {
  id: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * The placeholder/final-asset abstraction — ARCHITECTURE.md §5.2, §14.
 * Every image/video on the site renders through this component, never a
 * raw <img>/<video>. Swapping a placeholder for final photography is an
 * edit to content/media.ts only — this component's code never changes.
 *
 * Requires a positioned (relative/absolute) parent with a defined size —
 * it renders with `fill`.
 */
export function MediaSlot({ id, className, priority = false, sizes = "100vw" }: MediaSlotProps) {
  const slot = getMedia(id);

  if (slot.type === "video") {
    return (
      <video
        className={className}
        src={slot.src}
        poster={slot.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={slot.alt}
      />
    );
  }

  // Placeholder-era gradients are SVG; real photography (jpg/avif/webp) will
  // automatically pass through Next's optimizer once swapped in media.ts —
  // no change needed here when that happens.
  const isVectorPlaceholder = slot.src.endsWith(".svg");

  return (
    <Image
      src={slot.src}
      alt={slot.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isVectorPlaceholder}
      className={className}
    />
  );
}
