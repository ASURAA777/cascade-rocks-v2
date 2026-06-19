"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getLightStage, lightProgressState } from "@/lib/motion/useTimeOfDay";
import type { ProgressRef } from "@/lib/motion/progressRef";
import { buildTerrainGeometry } from "./terrain";

interface TerrainHeroProps {
  progress: ProgressRef;
}

/**
 * Scene 01 — BLUEPRINT.md §5.1. Scene Travel: a slow camera pull-back and
 * rise out of low, close, misty terrain. Light rig starts at
 * morning-mist values via the shared useTimeOfDay store (BLUEPRINT.md §10.3).
 */
export function TerrainHero({ progress }: TerrainHeroProps) {
  const geometry = useMemo(() => buildTerrainGeometry(), []);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { scene, camera } = useThree();

  useMemo(() => {
    // Mutating the Three.js scene returned by useThree() is the documented
    // way to set fog — it is not React-managed state.
    // eslint-disable-next-line react-hooks/immutability
    scene.fog = new THREE.Fog(0xffffff, 8, 40);
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
      lightRef.current.intensity = 0.6 + stage.sunElevation * 0.8;
      lightRef.current.position.set(-4, 2 + stage.sunElevation * 6, 4);
    }

    const p = progress.value;
    camera.position.set(0, THREE.MathUtils.lerp(0.6, 4.5, p), THREE.MathUtils.lerp(6, 16, p));
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight ref={lightRef} position={[-4, 4, 4]} intensity={1} />
      <mesh geometry={geometry} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#cfd6d2" flatShading />
      </mesh>
    </>
  );
}
