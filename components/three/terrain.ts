import * as THREE from "three";

/**
 * Shared low-poly terrain builder for TerrainHero and FinalLandscape —
 * BLUEPRINT.md §5.1/§5.3 "shared low-poly terrain module". Vertex
 * displacement via layered sine waves rather than a heightmap texture or
 * noise dependency — deliberately lightweight per ARCHITECTURE.md §9.2's
 * "geometry stays low-poly" mandate, upgradeable to a real heightmap
 * later without changing the call sites.
 */
export function buildTerrainGeometry(): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(40, 40, 64, 64);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const height =
      Math.sin(x * 0.15) * 1.2 + Math.cos(y * 0.18) * 1.0 + Math.sin((x + y) * 0.08) * 1.6;
    position.setZ(i, height);
  }

  geometry.computeVertexNormals();
  return geometry;
}
