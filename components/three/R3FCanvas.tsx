"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CanvasInner = dynamic(
  () => import("./CanvasInner").then((mod) => mod.CanvasInner),
  { ssr: false }
);

interface R3FCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Required — 3D is always an enhancement, never a hard dependency. ARCHITECTURE.md §5.2/§9. */
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Mobile/capability fallback policy — ARCHITECTURE.md §10.4: default is
 * static/video fallback on touch-primary and reduced-motion visitors
 * unless device-tested otherwise. Revisit this check after real device
 * testing (BLUEPRINT.md §9 open item), not before.
 */
function checkCapability(): boolean {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  if (reducedMotion || coarsePointer) return false;

  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Lazy-mounted R3F wrapper — ARCHITECTURE.md §5.2/§9.2. IntersectionObserver
 * gated in both directions: mounts only as the scene nears viewport, and
 * unmounts once scrolled well past to free GPU memory (BLUEPRINT.md §14).
 */
export function R3FCanvas({ fallback, children, ...rest }: R3FCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // One-time client capability probe (matchMedia/canvas.getContext have no
    // SSR/render-time equivalent) — not derived state, so the usual
    // "don't setState in an effect" alternative doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(checkCapability());
  }, []);

  useEffect(() => {
    if (!capable || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShouldRender(entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [capable]);

  return (
    <div ref={containerRef} {...rest}>
      {capable && shouldRender ? <CanvasInner>{children}</CanvasInner> : fallback}
    </div>
  );
}
