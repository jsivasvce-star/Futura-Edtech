import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 2D Transparent Billboard Image Mesh Realistic Plastic Kitchen Container Barrier:
 * - High-detail realistic asset fitting the modern Scandinavian kitchen countertop environment
 * - Texture: /assets/plastic_container.png (Pristine 32-bit alpha transparency with zero white background)
 */

let cachedTexture = null;

function usePlasticContainerTexture() {
  return useMemo(() => {
    if (cachedTexture) return cachedTexture;
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/assets/plastic_container.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    cachedTexture = tex;
    return tex;
  }, []);
}

// ─── Modern Airtight Plastic Kitchen Food Container Component ───
function PlasticKitchenContainer({ thickness = 1 }) {
  const texture = usePlasticContainerTexture();

  const scale = 1 + (thickness - 1) * 0.12;
  const height = 4.3 * scale;
  const width = 4.1 * scale;

  return (
    <group position={[0, -2.85, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.01}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Master Plastic Barrier Component ───
export default function BottleBarrier({ stage = 4, thickness = 1 }) {
  return <PlasticKitchenContainer thickness={thickness} />;
}
