import * as THREE from 'three';

/**
 * Procedural High-Resolution Texture Generator for 3D Bar Magnet
 * Adheres strictly to the authentic reference image and Activity 4.3 requirements:
 * - North Pole: Bold red brushed finish with serif "N", navigation arrow, "geographic North", "North-seeking pole"
 * - Equator / Center Band: Ivory parchment with etched magnetic field lines (iron filings) and "Field iron filings"
 * - South Pole: Deep ocean-blue brushed finish with serif "S", inverted navigation arrow, "geographic South", "South-seeking pole"
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

  // ---------------------------------------------------------------------------
  // 1. END-CAP RENDERING
  // ---------------------------------------------------------------------------
  if (isEndCap) {
    const isNorth = capPole === 'N';
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    if (isNorth) {
      bgGrad.addColorStop(0, '#681111');
      bgGrad.addColorStop(0.3, '#941B1B');
      bgGrad.addColorStop(0.7, '#B91C1C');
      bgGrad.addColorStop(1, '#5E0E0E');
    } else {
      bgGrad.addColorStop(0, '#0A2540');
      bgGrad.addColorStop(0.3, '#0F4C81');
      bgGrad.addColorStop(0.7, '#1E40AF');
      bgGrad.addColorStop(1, '#071A2E');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed metallic noise
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 0; y < height; y += 3) {
      if (Math.random() > 0.4) {
        ctx.fillRect(0, y, width, 1.2);
      }
    }

    // Outer beveled brass rim
    ctx.lineWidth = 4;
    ctx.strokeStyle = isNorth ? 'rgba(254, 202, 202, 0.65)' : 'rgba(191, 219, 254, 0.65)';
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Centered prominent serif letter
    ctx.fillStyle = '#FFFDF5';
    ctx.font = `900 ${Math.round(height * 0.52)}px "Playfair Display", "Cinzel", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillText(isNorth ? 'N' : 'S', width / 2, height / 2);

    return canvas;
  }

  // ---------------------------------------------------------------------------
  // 2. LONG FACE RENDERING (FRONT, TOP, BACK)
  // Dimensions & Zone Boundaries
  // ---------------------------------------------------------------------------
  // Back face has poles swapped (South on left, North on right) for 3D rotational continuity
  const northOnLeft = !isBackFace;

  const equatorRatio = isTopFace ? 0.26 : 0.22;
  const poleRatio = (1 - equatorRatio) / 2;

  const xDivider1 = Math.round(width * poleRatio);
  const xDivider2 = Math.round(width * (poleRatio + equatorRatio));

  const leftZoneIsNorth = northOnLeft;

  // ---------------------------------------------------------------------------
  // A. DRAW LEFT POLE ZONE
  // ---------------------------------------------------------------------------
  const leftGrad = ctx.createLinearGradient(0, 0, 0, height);
  if (leftZoneIsNorth) {
    leftGrad.addColorStop(0, '#6D1212');
    leftGrad.addColorStop(0.18, '#8D1818');
    leftGrad.addColorStop(0.5, '#A82020');
    leftGrad.addColorStop(0.82, '#851515');
    leftGrad.addColorStop(1, '#560D0D');
  } else {
    leftGrad.addColorStop(0, '#09213A');
    leftGrad.addColorStop(0.18, '#0E3B68');
    leftGrad.addColorStop(0.5, '#134D85');
    leftGrad.addColorStop(0.82, '#0E3760');
    leftGrad.addColorStop(1, '#061729');
  }
  ctx.fillStyle = leftGrad;
  ctx.fillRect(0, 0, xDivider1, height);

  // ---------------------------------------------------------------------------
  // B. DRAW RIGHT POLE ZONE
  // ---------------------------------------------------------------------------
  const rightGrad = ctx.createLinearGradient(0, 0, 0, height);
  if (!leftZoneIsNorth) {
    rightGrad.addColorStop(0, '#6D1212');
    rightGrad.addColorStop(0.18, '#8D1818');
    rightGrad.addColorStop(0.5, '#A82020');
    rightGrad.addColorStop(0.82, '#851515');
    rightGrad.addColorStop(1, '#560D0D');
  } else {
    rightGrad.addColorStop(0, '#09213A');
    rightGrad.addColorStop(0.18, '#0E3B68');
    rightGrad.addColorStop(0.5, '#134D85');
    rightGrad.addColorStop(0.82, '#0E3760');
    rightGrad.addColorStop(1, '#061729');
  }
  ctx.fillStyle = rightGrad;
  ctx.fillRect(xDivider2, 0, width - xDivider2, height);

  // Horizontal brushed metal micro-streaks on both poles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let y = 2; y < height - 2; y += 3) {
    if (Math.random() > 0.35) {
      ctx.fillRect(0, y, xDivider1, 1.2);
      ctx.fillRect(xDivider2, y, width - xDivider2, 1.2);
    }
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  for (let y = 3; y < height - 2; y += 4) {
    if (Math.random() > 0.4) {
      ctx.fillRect(0, y, xDivider1, 1.2);
      ctx.fillRect(xDivider2, y, width - xDivider2, 1.2);
    }
  }

  // ---------------------------------------------------------------------------
  // C. DRAW EQUATOR / CENTER BAND (IVORY PARCHMENT & ETCHED FIELD LINES)
  // ---------------------------------------------------------------------------
  const equatorWidth = xDivider2 - xDivider1;
  const eqGrad = ctx.createLinearGradient(xDivider1, 0, xDivider2, 0);
  eqGrad.addColorStop(0, '#E8DCB8');
  eqGrad.addColorStop(0.08, '#F7F1DF');
  eqGrad.addColorStop(0.5, '#FFFDF6');
  eqGrad.addColorStop(0.92, '#F7F1DF');
  eqGrad.addColorStop(1, '#E8DCB8');
  ctx.fillStyle = eqGrad;
  ctx.fillRect(xDivider1, 0, equatorWidth, height);

  // Top/bottom parchment shading
  const eqVertGrad = ctx.createLinearGradient(0, 0, 0, height);
  eqVertGrad.addColorStop(0, 'rgba(100, 60, 20, 0.15)');
  eqVertGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.2)');
  eqVertGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.0)');
  eqVertGrad.addColorStop(1, 'rgba(80, 45, 15, 0.22)');
  ctx.fillStyle = eqVertGrad;
  ctx.fillRect(xDivider1, 0, equatorWidth, height);

  // Detailed etched magnetic field lines (iron filings pattern) arching between poles
  ctx.save();
  ctx.beginPath();
  ctx.rect(xDivider1 + 2, 0, equatorWidth - 4, height);
  ctx.clip();

  const numFieldLines = isTopFace ? 16 : 10;
  const centerY = height / 2;

  for (let i = 0; i < numFieldLines; i++) {
    const norm = (i / (numFieldLines - 1)) * 2 - 1; // -1 to 1
    const distFromCenter = Math.abs(norm);
    const archDirection = norm >= 0 ? 1 : -1;
    const maxBow = distFromCenter * (height * 0.44);

    const alpha = 0.35 + (1 - distFromCenter) * 0.45;
    ctx.strokeStyle = `rgba(50, 28, 10, ${alpha})`;
    ctx.lineWidth = 1.1 + (1 - distFromCenter) * 0.7;

    // Arching cubic bezier field curve
    ctx.beginPath();
    ctx.moveTo(xDivider1 - 15, centerY + norm * (height * 0.25));
    ctx.bezierCurveTo(
      xDivider1 + equatorWidth * 0.3, centerY + norm * (height * 0.3) + archDirection * maxBow,
      xDivider2 - equatorWidth * 0.3, centerY + norm * (height * 0.3) + archDirection * maxBow,
      xDivider2 + 15, centerY + norm * (height * 0.25)
    );
    ctx.stroke();

    // Dense iron filings particles along the field curves
    const filingDots = isTopFace ? 32 : 20;
    ctx.fillStyle = `rgba(32, 16, 6, ${alpha * 0.9})`;
    for (let d = 0; d < filingDots; d++) {
      const t = d / filingDots;
      // Evaluate cubic bezier point
      const u = 1 - t;
      const cp1Y = centerY + norm * (height * 0.3) + archDirection * maxBow;
      const cp2Y = cp1Y;
      const pX = u * u * u * (xDivider1) +
                 3 * u * u * t * (xDivider1 + equatorWidth * 0.3) +
                 3 * u * t * t * (xDivider2 - equatorWidth * 0.3) +
                 t * t * t * (xDivider2);
      const pY = u * u * u * (centerY + norm * (height * 0.25)) +
                 3 * u * u * t * cp1Y +
                 3 * u * t * t * cp2Y +
                 t * t * t * (centerY + norm * (height * 0.25));

      const jitterX = (Math.random() - 0.5) * 3;
      const jitterY = (Math.random() - 0.5) * 2;
      const dotRadius = Math.random() > 0.6 ? 1.5 : 1.0;
      ctx.fillRect(pX + jitterX, pY + jitterY, dotRadius * 1.6, dotRadius);
    }
  }
  ctx.restore();

  // Polished brass seams at the left & right boundary of the Equator band
  const drawBrassSeam = (x) => {
    // Dark shadow recess
    ctx.fillStyle = 'rgba(25, 12, 4, 0.6)';
    ctx.fillRect(x - 2, 0, 4, height);
    // Brass highlight bar
    const brassGrad = ctx.createLinearGradient(x - 1, 0, x + 1, 0);
    brassGrad.addColorStop(0, '#92400E');
    brassGrad.addColorStop(0.5, '#FDE68A');
    brassGrad.addColorStop(1, '#78350F');
    ctx.fillStyle = brassGrad;
    ctx.fillRect(x - 1.2, 0, 2.4, height);
  };
  drawBrassSeam(xDivider1);
  drawBrassSeam(xDivider2);

  // ---------------------------------------------------------------------------
  // D. EQUATOR LABEL: "Field iron filings"
  // ---------------------------------------------------------------------------
  const equatorCenterX = (xDivider1 + xDivider2) / 2;
  const eqPillWidth = Math.min(equatorWidth * 0.88, 380);
  const eqPillHeight = isTopFace ? 34 : 26;
  const eqPillY = isTopFace ? (height * 0.5 - eqPillHeight / 2) : (height * 0.5 - eqPillHeight / 2);

  // Vintage cartouche plaque backing for the text
  ctx.save();
  ctx.fillStyle = 'rgba(255, 253, 246, 0.94)';
  ctx.strokeStyle = '#B38B47';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(equatorCenterX - eqPillWidth / 2, eqPillY, eqPillWidth, eqPillHeight, 6);
  } else {
    ctx.rect(equatorCenterX - eqPillWidth / 2, eqPillY, eqPillWidth, eqPillHeight);
  }
  ctx.fill();
  ctx.stroke();

  // Plaque brass pins on ends
  ctx.fillStyle = '#B45309';
  ctx.beginPath();
  ctx.arc(equatorCenterX - eqPillWidth / 2 + 8, eqPillY + eqPillHeight / 2, 2.5, 0, Math.PI * 2);
  ctx.arc(equatorCenterX + eqPillWidth / 2 - 8, eqPillY + eqPillHeight / 2, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#3A1E0A';
  ctx.font = `800 ${isTopFace ? 16 : 13}px "Playfair Display", "Cinzel", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;
  ctx.fillText('FIELD IRON FILINGS', equatorCenterX, eqPillY + eqPillHeight / 2);
  ctx.restore();

  // ---------------------------------------------------------------------------
  // E. DRAW NORTH POLE DETAILS
  // ---------------------------------------------------------------------------
  const northStartX = leftZoneIsNorth ? 0 : xDivider2;
  const northWidth = leftZoneIsNorth ? xDivider1 : (width - xDivider2);
  const northCenterX = northStartX + northWidth / 2;

  const renderPoleDetails = ({
    centerX,
    isNorth,
    baseY = centerY
  }) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const primaryColor = '#FFFDF8';
    const subColor = isNorth ? '#FEE2E2' : '#E0F2FE';
    const accentColor = isNorth ? '#FECACA' : '#BAE6FD';

    if (isTopFace) {
      // ---------------- TOP FACE (Generous 380px vertical canvas) ----------------
      // 1. Directional Arrow Icon (Compass pointer)
      const arrowY = baseY - 82;
      ctx.save();
      ctx.translate(centerX, arrowY);
      // North arrow points left towards North tip (or up); South arrow points right towards South tip
      ctx.beginPath();
      if (isNorth) {
        // Pointing Left (towards physical North edge)
        ctx.moveTo(-22, 0);
        ctx.lineTo(16, -12);
        ctx.lineTo(10, 0);
        ctx.lineTo(16, 12);
        ctx.closePath();
      } else {
        // Pointing Right (towards physical South edge)
        ctx.moveTo(22, 0);
        ctx.lineTo(-16, -12);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-16, 12);
        ctx.closePath();
      }
      ctx.fillStyle = primaryColor;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.strokeStyle = isNorth ? '#991B1B' : '#0F4C81';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      // 2. Clear serif "N" / "S" and Title
      ctx.fillStyle = primaryColor;
      ctx.font = '900 68px "Playfair Display", "Cinzel", Georgia, serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 2;
      ctx.fillText(isNorth ? 'NORTH' : 'SOUTH', centerX, baseY - 15);

      // 3. Annotation: "geographic North" / "geographic South"
      ctx.font = 'italic 700 22px "Playfair Display", Georgia, serif';
      ctx.fillStyle = subColor;
      ctx.shadowBlur = 4;
      ctx.fillText(isNorth ? 'geographic North' : 'geographic South', centerX, baseY + 36);

      // 4. Annotation: "North-seeking pole" / "South-seeking pole"
      ctx.font = '800 17px "Outfit", system-ui, sans-serif';
      ctx.fillStyle = accentColor;
      ctx.letterSpacing = '1.5px';
      ctx.fillText(isNorth ? 'NORTH-SEEKING POLE' : 'SOUTH-SEEKING POLE', centerX, baseY + 66);
    } else {
      // ---------------- FRONT / BACK FACE (Compact 260px vertical canvas) ----------------
      // Horizontal balanced composition
      const offsetTitleX = centerX - 60;
      const offsetDetailsX = centerX + 80;

      // 1. Large prominent serif "N" or "S"
      ctx.fillStyle = primaryColor;
      ctx.font = '900 72px "Playfair Display", "Cinzel", Georgia, serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillText(isNorth ? 'N' : 'S', offsetTitleX - 45, baseY);

      // 2. Full Name "NORTH" / "SOUTH"
      ctx.font = '900 32px "Playfair Display", "Cinzel", Georgia, serif';
      ctx.fillText(isNorth ? 'NORTH' : 'SOUTH', offsetTitleX + 45, baseY - 12);

      // 3. Navigation Arrow Icon beside Title
      ctx.save();
      ctx.translate(offsetTitleX + 45, baseY + 20);
      ctx.beginPath();
      if (isNorth) {
        ctx.moveTo(-16, 0);
        ctx.lineTo(12, -8);
        ctx.lineTo(7, 0);
        ctx.lineTo(12, 8);
      } else {
        ctx.moveTo(16, 0);
        ctx.lineTo(-12, -8);
        ctx.lineTo(-7, 0);
        ctx.lineTo(-12, 8);
      }
      ctx.closePath();
      ctx.fillStyle = primaryColor;
      ctx.fill();
      ctx.restore();

      // 4. Annotations stacked on the side
      ctx.textAlign = 'left';
      ctx.font = 'italic 700 17px "Playfair Display", Georgia, serif';
      ctx.fillStyle = subColor;
      ctx.fillText(isNorth ? 'geographic North' : 'geographic South', offsetDetailsX - 25, baseY - 10);

      ctx.font = '800 13px "Outfit", system-ui, sans-serif';
      ctx.fillStyle = accentColor;
      ctx.fillText(isNorth ? 'North-seeking pole' : 'South-seeking pole', offsetDetailsX - 25, baseY + 14);
    }

    ctx.restore();
  };

  // Render Left Pole Details
  renderPoleDetails({
    centerX: northStartX + northWidth / 2,
    isNorth: leftZoneIsNorth,
    baseY: height / 2
  });

  // Render Right Pole Details
  const rightStartX = leftZoneIsNorth ? xDivider2 : 0;
  const rightWidth = leftZoneIsNorth ? (width - xDivider2) : xDivider1;
  renderPoleDetails({
    centerX: rightStartX + rightWidth / 2,
    isNorth: !leftZoneIsNorth,
    baseY: height / 2
  });

  // ---------------------------------------------------------------------------
  // F. OVERALL BEVEL HIGHLIGHTS & AMBIENT CONTACT SHADOWS
  // ---------------------------------------------------------------------------
  // Top specular highlight edge
  const topSpecular = ctx.createLinearGradient(0, 0, 0, 4);
  topSpecular.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
  topSpecular.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = topSpecular;
  ctx.fillRect(0, 0, width, 4);

  // Bottom contact shadow edge
  const botShadow = ctx.createLinearGradient(0, height - 5, 0, height);
  botShadow.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
  botShadow.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = botShadow;
  ctx.fillRect(0, height - 5, width, 5);

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
