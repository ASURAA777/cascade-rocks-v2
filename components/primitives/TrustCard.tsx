import type { Review } from "@/types/content";

interface TrustCardProps {
  review: Review;
  className?: string;
}

/**
 * Scene 10 testimonial unit — ARCHITECTURE.md §5.2. Reads as an
 * overheard fragment, not a marketing quote-card (DESIGN.md §5): no
 * border, no shadow, no box — just type and air.
 */
export function TrustCard({ review, className }: TrustCardProps) {
  return (
    <figure className={`max-w-sm text-left ${className ?? ""}`}>
      <blockquote className="text-body-lg font-display text-ink/90 italic">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-caption font-body tracking-wide text-ink/60">
        {review.author}
        {review.rating ? ` · ${review.rating}/5` : ""}
      </figcaption>
    </figure>
  );
}
