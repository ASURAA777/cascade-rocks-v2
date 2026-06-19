"use client";

import { Canvas } from "@react-three/fiber";

/**
 * Isolated so next/dynamic(..., { ssr: false }) in R3FCanvas.tsx can
 * exclude the actual <Canvas>/WebGL bootstrap from the server bundle
 * entirely (BLUEPRINT.md §1, §5.2), while R3FCanvas itself stays a plain
 * client component handling capability/visibility logic.
 */
export function CanvasInner({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "low-power" }}
      camera={{ fov: 45, position: [0, 2, 10] }}
    >
      {children}
    </Canvas>
  );
}
