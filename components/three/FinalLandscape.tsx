"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getLightStage, lightProgressState } from "@/lib/motion/useTimeOfDay";
import type { ProgressRef } from "@/lib/motion/progressRef";
import { buildTerrainGeometry } from "./terrain";

interface FinalLandscapeProps {
  progress: ProgressRef;
}

/**
 * Scene 12 — BLUEPRINT.md §5.3. The closing "exhale": camera settles into
 * one calm static frame rather than continuing to travel. Light rig sits
 * at "evening" — a warm point light stands in for bonfire/lamplight glow
 * (DESIGN.md §5, Scene 12) alongside the shared directional rig.
 */
export function FinalLandscape({ progress }: FinalLandscapeProps) {
  const geometry = useMemo(() => buildTerrainGeometry(), []);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { scene, camera } = useThree();

  useMemo(() => {
    // Mutating the Three.js scene returned by useThree() is the documented
    // way to set fog — it is not React-managed state.
    // eslint-disable-next-line react-hooks/immutability
    scene.fog = new THREE.Fog(0x000000, 6, 30);
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
      lightRef.current.intensity = 0.3 + stage.sunElevation * 1.2;
      lightRef.current.position.set(3, 1 + stage.sunElevation * 3, -2);
    }

    const p = progress.value;
    camera.position.set(
      THREE.MathUtils.lerp(2, 0, p),
      THREE.MathUtils.lerp(3.5, 2.2, p),
      THREE.MathUtils.lerp(13, 9, p)
    );
    camera.lookAt(0, 0.5, 0);
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight ref={lightRef} position={[3, 2, -2]} intensity={1} />
      <pointLight position={[0, 0.6, 2]} color="#e8a857" intensity={1.4} distance={6} />
      <mesh geometry={geometry} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#3a2f24" flatShading />
      </mesh>
    </>
  );
}
