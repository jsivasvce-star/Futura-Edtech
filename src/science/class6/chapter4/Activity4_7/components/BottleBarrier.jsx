import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 2D Transparent Billboard Image Mesh — Realistic Plastic Kitchen Container Barrier
 *
 * Uses canvas-based background alpha-keying on /assets/plastic_container_new.jpg
 * to cleanly remove the white/neutral background and produce a 32-bit transparent
 * canvas texture for Three.js, so the container displays with vivid clarity.
 *
 * Keying strategy:
 *  - A pixel is considered "background" when it is very bright (near-white) AND
 *    relatively unsaturated (near-grey). Such pixels are made transparent with an
 *    antialiased edge falloff, preserving the coloured lid and translucent walls.
 */

let cachedTexture = null;

/**
 * Load the JPEG, key out the white background on an offscreen canvas, and return
 * a THREE.CanvasTexture with alpha transparency.
 */
function createAlphaKeyedTexture() {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/plastic_container_new.jpg';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Luminance — how "bright" the pixel is (0–255)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Chrominance — max deviation from grey (saturation proxy, 0–255)
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const saturation = maxC - minC;

        // A pixel is background if it is very bright AND unsaturated (near-white or pale grey)
        // Threshold: luminance > 230 AND saturation < 35
        const bgStrength = Math.max(
          0,
          Math.min(
            1,
            ((luminance - 210) / 25) * (1 - saturation / 40)
          )
        );

        // Apply antialiased transparency: partially transparent at edges
        data[i + 3] = Math.round((1 - bgStrength) * 255);
      }

      ctx.putImageData(imageData, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      resolve(tex);
    };

    img.onerror = () => {
      // Fallback: plain TextureLoader (no alpha keying)
      const loader = new THREE.TextureLoader();
      const tex = loader.load('/assets/plastic_container_new.jpg');
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
  });
}

function usePlasticContainerTexture() {
  return useMemo(() => {
    if (cachedTexture) return cachedTexture;

    // Create a temporary 1×1 placeholder texture immediately (avoids null map issues)
    const placeholder = new THREE.DataTexture(
      new Uint8Array([255, 255, 255, 0]),
      1, 1,
      THREE.RGBAFormat
    );
    placeholder.needsUpdate = true;

    // Asynchronously key and replace
    createAlphaKeyedTexture().then((tex) => {
      // Copy properties into the placeholder so the mesh updates automatically
      placeholder.image = tex.image;
      placeholder.colorSpace = tex.colorSpace;
      placeholder.anisotropy = tex.anisotropy;
      placeholder.generateMipmaps = tex.generateMipmaps;
      placeholder.minFilter = tex.minFilter;
      placeholder.magFilter = tex.magFilter;
      placeholder.needsUpdate = true;
      cachedTexture = placeholder;
    });

    cachedTexture = placeholder;
    return placeholder;
  }, []);
}

// ─── Modern Airtight Plastic Kitchen Food Container Component ───
function PlasticKitchenContainer({ thickness = 1 }) {
  const texture = usePlasticContainerTexture();

  // Scale the billboard proportionally; thicker = slightly larger
  const scale = 1 + (thickness - 1) * 0.12;
  const height = 4.6 * scale;   // slightly taller for the new asset
  const width  = 4.3 * scale;

  return (
    <group position={[0, -2.85, 0]}>
      {/* Main billboard face */}
      <mesh position={[0, height / 2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.04}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle shadow disc on the countertop to ground the container */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ellipseGeometry args={[width * 0.42, width * 0.18, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent={true}
          opacity={0.18}
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
