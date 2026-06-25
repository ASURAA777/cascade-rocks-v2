"use client";

import { useEffect, useRef, useState } from "react";
import { scenes } from "@/content/scenes";
import { useActiveScene } from "@/lib/motion/useActiveScene";
import { lenisInstance } from "@/lib/motion/useLenis";

interface ChromeOverlayProps {
  children?: React.ReactNode;
}

export function ChromeOverlay({ children }: ChromeOverlayProps) {
  const [indexOpen, setIndexOpen] = useState(false);
  const activeScene = useActiveScene();
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!indexOpen) return;
    firstItemRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIndexOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [indexOpen]);

  function goToScene(anchor: string) {
    setIndexOpen(false);
    lenisInstance.current?.scrollTo(anchor, { duration: 1.4 });
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[var(--z-chrome)]">
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-6 h-40 w-px -translate-y-1/2 bg-mist/20"
        >
          <div
            className="w-full origin-top"
            style={{
              height: "100%",
              transform: "scaleY(var(--light-progress))",
              backgroundColor: "rgb(var(--scrim-color))",
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setIndexOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={indexOpen}
          className="pointer-events-auto absolute right-gutter bottom-8 font-body text-caption tracking-[0.2em] text-mist mix-blend-difference uppercase"
        >
          Index
        </button>

        <div className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2">
          {children}
        </div>
      </div>

      {indexOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Scene Index"
          className="fixed inset-0 z-[var(--z-overlay)] flex flex-col items-center justify-center gap-3 bg-ink/95 px-gutter text-mist"
        >
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              ref={index === 0 ? firstItemRef : undefined}
              type="button"
              onClick={() => goToScene(scene.anchor)}
              className={`font-display text-headline transition-opacity ${
                activeScene === scene.id ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
            >
              {scene.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIndexOpen(false)}
            className="mt-10 font-body text-caption tracking-[0.2em] text-mist/70 uppercase"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
