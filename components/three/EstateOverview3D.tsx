"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getLightStage, lightProgressState } from "@/lib/motion/useTimeOfDay";
import type { ProgressRef } from "@/lib/motion/progressRef";

interface EstateOverview3DProps {
  progress: ProgressRef;
}

const MAX_ORBIT_OFFSET = THREE.MathUtils.degToRad(15);

/**
 * Scene 04 — BLUEPRINT.md §5.2, ARCHITECTURE.md §16.3. The site's one
 * signature bounded interaction: scroll drives a descending/orbiting
 * camera toward a near-top-down "map" settle; a desktop pointer-drag adds
 * a bounded ±15° azimuth nudge on top of that scroll-driven base path,
 * always springing back on release. Scroll remains authoritative — the
 * drag is an offset, never a replacement.
 *
 * Massing is deliberately abstracted blocks (house / courtyard / lawn /
 * waterfall strip / terraces), not photoreal — DESIGN.md §5, Scene 04:
 * "an architectural-model aesthetic," clarity over drama.
 */
export function EstateOverview3D({ progress }: EstateOverview3DProps) {
  const { scene, camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const dragOffset = useRef(0);
  const dragTarget = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const [labelsVisible, setLabelsVisible] = useState(false);

  useMemo(() => {
    // Mutating the Three.js scene returned by useThree() is the documented
    // way to set fog — it is not React-managed state.
    // eslint-disable-next-line react-hooks/immutability
    scene.fog = new THREE.Fog(0xffffff, 10, 50);
  }, [scene]);

  useFrame(() => {
    const stage = getLightStage(lightProgressState.value);

    if (scene.fog instanceof THREE.Fog) {
      const [fr, fg, fb] = stage.fog.split(" ").map(Number);
      scene.fog.color.setRGB(fr / 255, fg / 255, fb / 255);
    }

    if (lightRef.current) {
      const [tr, tg, tb] = stage.tint.split(" ").map(Number);
      lightRef.current.color.setRGB(tr / 255, tg / 255, tb / 255);
      lightRef.current.intensity = 0.7 + stage.sunElevation * 0.6;
      lightRef.current.position.set(2, 3 + stage.sunElevation * 8, 2);
    }

    dragOffset.current = THREE.MathUtils.lerp(
      dragOffset.current,
      isDragging.current ? dragTarget.current : 0,
      isDragging.current ? 0.2 : 0.08
    );

    const p = progress.value;
    const azimuth = THREE.MathUtils.lerp(-0.6, 0, p) + dragOffset.current;
    const elevation = THREE.MathUtils.lerp(0.55, 1.45, p);
    const radius = THREE.MathUtils.lerp(14, 9, p);

    camera.position.set(
      Math.sin(azimuth) * radius * Math.cos(elevation - 1),
      Math.sin(elevation) * radius,
      Math.cos(azimuth) * radius * Math.cos(elevation - 1)
    );
    camera.lookAt(0, 0, 0);

    if (p > 0.85 && !labelsVisible) setLabelsVisible(true);
  });

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    isDragging.current = true;
    lastPointerX.current = event.clientX;
  }

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    if (!isDragging.current) return;
    const delta = (event.clientX - lastPointerX.current) * 0.004;
    lastPointerX.current = event.clientX;
    dragTarget.current = THREE.MathUtils.clamp(
      dragTarget.current + delta,
      -MAX_ORBIT_OFFSET,
      MAX_ORBIT_OFFSET
    );
  }

  function handlePointerUp() {
    isDragging.current = false;
    dragTarget.current = 0;
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight ref={lightRef} position={[2, 6, 2]} intensity={1} />

      {/* Invisible drag-capture plane — the only pointer-driven interaction on the site */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Main house volume */}
      <mesh position={[-1.5, 0.4, -1]}>
        <boxGeometry args={[3, 0.8, 2]} />
        <meshStandardMaterial color="#cfc6b8" flatShading />
      </mesh>

      {/* Courtyard */}
      <mesh position={[1.6, 0.05, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#cdbfa0" flatShading />
      </mesh>

      {/* Lawn */}
      <mesh position={[0, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#7c8a68" flatShading />
      </mesh>

      {/* Waterfall stand-in */}
      <mesh position={[2.3, 0.03, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 1.6]} />
        <meshStandardMaterial color="#c7dde0" flatShading transparent opacity={0.85} />
      </mesh>

      {/* Surrounding tea terraces */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-4 - i * 1.2, -0.1 - i * 0.05, -3 - i * 1.4]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[6, 1]} />
          <meshStandardMaterial color="#8a9a6f" flatShading />
        </mesh>
      ))}

      {labelsVisible && (
        <>
          <Html position={[0, 0.3, 3]} center className="pointer-events-none">
            <span className="font-body text-caption tracking-wide text-mist/90">Lawn</span>
          </Html>
          <Html position={[1.6, 0.3, 0.8]} center className="pointer-events-none">
            <span className="font-body text-caption tracking-wide text-mist/90">Courtyard</span>
          </Html>
          <Html position={[2.3, 0.3, 1.6]} center className="pointer-events-none">
            <span className="font-body text-caption tracking-wide text-mist/90">Waterfall</span>
          </Html>
        </>
      )}
    </>
  );
}
