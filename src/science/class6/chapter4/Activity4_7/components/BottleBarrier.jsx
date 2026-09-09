import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * 2D Transparent Billboard Image Mesh PET Plastic Bottle Barrier with 4 Evolution Stages:
 * - Stage 1: 200 mL Compact Pocket Water Bottle (Shorter, medium-wide stout base) -> /assets/bottle_200ml.png
 * - Stage 2: 500 mL Standard Spring Water Bottle (Balanced mid-size height & standard cylindrical width) -> /assets/bottle_500ml.png
 * - Stage 3: 1 Litre Sports Ribbed Water Bottle (Tallest height with appropriately wide cylindrical diameter) -> /assets/bottle_1l.png
 * - Stage 4: 20 Litre Commercial Dispenser Jug / Canister -> /assets/bottle_20l.png
 */

// ─── Offscreen Canvas Texture Cache & Processor with Transparent Margin Padding ───
const bottleTextureCache = new Map();

function useBottleTexture(url) {
  const [texture, setTexture] = useState(() => bottleTextureCache.get(url) || null);

  useEffect(() => {
    if (bottleTextureCache.has(url)) {
      setTexture(bottleTextureCache.get(url));
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      if (!isMounted) return;

      // Add 12% transparent padding around all 4 sides so bottle artwork never touches borders
      const padRatio = 0.12;
      const origW = img.naturalWidth || img.width;
      const origH = img.naturalHeight || img.height;
      const targetW = Math.round(origW * (1 + padRatio * 2));
      const targetH = Math.round(origH * (1 + padRatio * 2));

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, targetW, targetH);

      const drawX = Math.round(origW * padRatio);
      const drawY = Math.round(origH * padRatio);
      ctx.drawImage(img, drawX, drawY, origW, origH);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // High-precision background removal: eliminate studio gradient, white halo, and floor shadows
      const w = canvas.width;
      const h = canvas.height;
      const visited = new Uint8Array(w * h);
      const queue = [];

      // Pass 1: Clear obvious outer margins and neutral background
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const minVal = Math.min(r, g, b);
          const maxVal = Math.max(r, g, b);
          const isNeutral = (maxVal - minVal) < 28;
          const brightness = (r + g + b) / 3;

          // For the plastic bottle, the subject is strictly centered horizontally within [34%, 66%]
          // and vertically within [12%, 86.5%]
          const inOuterMargin = (x < w * 0.34 || x > w * 0.66 || y < h * 0.12 || y > h * 0.865);
          
          if (inOuterMargin && (isNeutral || brightness > 180)) {
            data[idx + 3] = 0;
            visited[y * w + x] = 1;
            queue.push(x, y);
          } else if (isNeutral && brightness > 190) {
            data[idx + 3] = 0;
            visited[y * w + x] = 1;
            queue.push(x, y);
          } else if (brightness > 230 && (maxVal - minVal) < 35) {
            data[idx + 3] = 0;
            visited[y * w + x] = 1;
            queue.push(x, y);
          }
        }
      }

      // Pass 2: BFS flood-fill from border inwards to clear any remaining backdrop shadow/halo
      let head = 0;
      while (head < queue.length) {
        const qx = queue[head++];
        const qy = queue[head++];

        const neighbors = [
          [qx + 1, qy],
          [qx - 1, qy],
          [qx, qy + 1],
          [qx, qy - 1]
        ];

        for (let n = 0; n < 4; n++) {
          const [nx, ny] = neighbors[n];
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nPos = ny * w + nx;
            if (!visited[nPos]) {
              const nIdx = nPos * 4;
              const nr = data[nIdx];
              const ng = data[nIdx + 1];
              const nb = data[nIdx + 2];
              const nMin = Math.min(nr, ng, nb);
              const nMax = Math.max(nr, ng, nb);
              const isNeutral = (nMax - nMin) < 30;
              const brightness = (nr + ng + nb) / 3;

              // If neighbor is neutral backdrop shadow or bright studio glow, clear it
              if ((isNeutral && brightness > 160) || brightness > 225) {
                visited[nPos] = 1;
                data[nIdx + 3] = 0;
                queue.push(nx, ny);
              }
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      bottleTextureCache.set(url, tex);
      setTexture(tex);
    };

    return () => {
      isMounted = false;
    };
  }, [url]);

  return texture;
}

// ─── Stage 1: 200 mL Pocket Bottle (Shorter height, medium-wide stout base) ───
function Bottle200ml({ thickness = 1 }) {
  const texture = useBottleTexture('/assets/bottle_200ml.png');
  if (!texture) return null;

  const scale = 1 + (thickness - 1) * 0.14;
  // Natural realistic stout bottle proportions (expanded width)
  const height = 3.0 * scale;
  const width = 2.85 * scale;

  return (
    <group position={[0, -2.7, 0]}>
      <mesh position={[0, height / 2, 0]} visible={Boolean(texture)}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.08}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Stage 2: 500 mL Spring Water Bottle (Balanced mid-size height & standard cylindrical width) ───
function Bottle500ml({ thickness = 1 }) {
  const texture = useBottleTexture('/assets/bottle_500ml.png');
  if (!texture) return null;

  const scale = 1 + (thickness - 1) * 0.14;
  // Balanced standard cylindrical water bottle proportions (expanded width)
  const height = 3.7 * scale;
  const width = 2.95 * scale;

  return (
    <group position={[0, -3.0, 0]}>
      <mesh position={[0, height / 2, 0]} visible={Boolean(texture)}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.08}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Stage 3: 1 Litre Sports Bottle (Tallest height with appropriately wide cylindrical diameter) ───
function Bottle1Litre({ thickness = 1 }) {
  const texture = useBottleTexture('/assets/bottle_1l.png');
  if (!texture) return null;

  const scale = 1 + (thickness - 1) * 0.14;
  // Tallest height with wide sturdy diameter
  const height = 4.25 * scale;
  const width = 3.25 * scale;

  return (
    <group position={[0, -3.2, 0]}>
      <mesh position={[0, height / 2, 0]} visible={Boolean(texture)}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.08}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Stage 4: Modern Reusable Plastic Water Bottle (BPA-Free Translucent Blue) ───
function PlasticWaterBottle({ thickness = 1 }) {
  const texture = useBottleTexture('/assets/plastic_bottle.png');
  if (!texture) return null;

  const scale = 1 + (thickness - 1) * 0.14;
  const height = 4.4 * scale;
  const width = 3.6 * scale;

  return (
    <group position={[0, -3.1, 0]}>
      <mesh position={[0, height / 2, 0]} visible={Boolean(texture)}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color="#ffffff"
          transparent={true}
          alphaTest={0.2}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Master Bottle Barrier Component (Switches among 4 Stages) ───
export default function BottleBarrier({ stage = 2, thickness = 1 }) {
  if (stage === 1) return <Bottle200ml thickness={thickness} />;
  if (stage === 2) return <Bottle500ml thickness={thickness} />;
  if (stage === 3) return <Bottle1Litre thickness={thickness} />;
  return <PlasticWaterBottle thickness={thickness} />;
}
