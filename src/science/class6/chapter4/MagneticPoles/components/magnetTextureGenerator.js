import * as THREE from 'three';

/**
 * Procedural High-Resolution Texture Generator for 3D Bar Magnet
 * Activity 4.3: Poles of Magnet (Class 6 Science — Observe iron filings & magnetic poles)
 * - Purely solid red and blue across both halves (no center white band or divider)
 * - Only "North" on the North half and "South" on the South half (all other labels and arrows removed)
 */

export function generateMagnetCanvas({
  width = 2400,
  height = 300,
  isTopFace = false,
  isBackFace = false,
  isEndCap = false,
  capPole = 'N' // 'N' or 'S'
}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Pure, solid, vibrant Red and Blue (No dark edge lines or shadow bands)
  const RED = '#DC2626';
  const BLUE = '#2563EB';

  // ---------------------------------------------------------------------------
  // 1. END-CAP RENDERING (SOLID RED FOR NORTH, SOLID BLUE FOR SOUTH)
  // ---------------------------------------------------------------------------
  if (isEndCap) {
    const isNorth = capPole === 'N';
    ctx.fillStyle = isNorth ? RED : BLUE;
    ctx.fillRect(0, 0, width, height);

    // Centered label: "North" or "South" - clear, bold, crisp
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 70px "Outfit", system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 2;
    ctx.fillText(isNorth ? 'North' : 'South', width / 2, height / 2);

    return canvas;
  }

  // ---------------------------------------------------------------------------
  // 2. LONG FACE RENDERING (FRONT, TOP, BACK)
  // Two pure solid halves meeting directly at center (midX = width / 2)
  // Completely flat, clean, solid color with zero shadow lines or edge darkening
  // ---------------------------------------------------------------------------
  const northOnLeft = !isBackFace;
  const midX = width / 2;

  // Left Half (X: 0 to midX)
  const leftZoneIsNorth = northOnLeft;
  ctx.fillStyle = leftZoneIsNorth ? RED : BLUE;
  ctx.fillRect(0, 0, midX, height);

  // Right Half (X: midX to width)
  ctx.fillStyle = !leftZoneIsNorth ? RED : BLUE;
  ctx.fillRect(midX, 0, width - midX, height);

  // ---------------------------------------------------------------------------
  // 3. LABELS: ONLY "North" AND "South" - MUCH CLEARER AND SLIGHTLY LARGER
  // ---------------------------------------------------------------------------
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 2;

  // Front & Back face height is 260px; Top face is 380px.
  // Slightly larger, crisp, highly legible font sizes
  const fontSize = isTopFace ? 118 : 96;
  ctx.font = `900 ${fontSize}px "Outfit", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;

  const leftCenterX = midX / 2; // X = 600
  const rightCenterX = midX + midX / 2; // X = 1800
  const centerY = height / 2;

  // Left half label: "North" if left is North, "South" if left is South
  const leftText = leftZoneIsNorth ? 'North' : 'South';
  ctx.fillText(leftText, leftCenterX, centerY);

  // Right half label: "South" if left is North, "North" if left is South
  const rightText = leftZoneIsNorth ? 'South' : 'North';
  ctx.fillText(rightText, rightCenterX, centerY);

  ctx.restore();

  return canvas;
}

/**
 * Creates and caches the 5 Three.js CanvasTextures needed for the 3D Bar Magnet
 */
export function createCustomMagnetTextures() {
  const frontCanvas = generateMagnetCanvas({ width: 2400, height: 260, isTopFace: false, isBackFace: false });
  const topCanvas = generateMagnetCanvas({ width: 2400, height: 380, isTopFace: true, isBackFace: false });
  const backCanvas = generateMagnetCanvas({ width: 2400, height: 260, isTopFace: false, isBackFace: true });
  const northCapCanvas = generateMagnetCanvas({ width: 380, height: 260, isEndCap: true, capPole: 'N' });
  const southCapCanvas = generateMagnetCanvas({ width: 380, height: 260, isEndCap: true, capPole: 'S' });

  const configureTexture = (c) => {
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  };

  return {
    front: configureTexture(frontCanvas),
    top: configureTexture(topCanvas),
    back: configureTexture(backCanvas),
    northCap: configureTexture(northCapCanvas),
    southCap: configureTexture(southCapCanvas)
  };
}
