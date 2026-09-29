import React, { useRef, useEffect } from 'react';
import dicotImgSrc from '../../../../../assets/dicot_1.png';
import maizeImgSrc from '../../../../../assets/maize_intact_realistic.png';

/**
 * RealisticSeedBeaker
 * Volumetric high-DPI 2D Canvas rendering of a 3D Borosilicate Glass Hydration Beaker:
 * - Real 100% photorealistic photographic chickpea (dicot_1.png) and maize (maize_intact_realistic.png)
 * - Seamless transparent backgrounds, no white boxes, strictly NO text drawn inside the canvas/image
 * - Real-time fizzy micro-bubbles streaming out of the chickpea micropyle
 * - Smooth physical imbibition swelling with day selection
 * - Porcelain specimen dish and curved fluid meniscus with caustics
 */
export default function RealisticSeedBeaker({ soakDay, isAutoSoaking }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const bubblesRef = useRef([]);
  const timeRef = useRef(0);

  const dicotImgRef = useRef(null);
  const maizeImgRef = useRef(null);
  const imagesLoadedRef = useRef(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        imagesLoadedRef.current = true;
      }
    };

    const dImg = new Image();
    dImg.src = dicotImgSrc;
    dImg.onload = checkLoaded;
    dicotImgRef.current = dImg;

    const mImg = new Image();
    mImg.src = maizeImgSrc;
    mImg.onload = checkLoaded;
    maizeImgRef.current = mImg;
  }, []);

  // Spawn bubble stream from micropyle
  useEffect(() => {
    const interval = setInterval(() => {
      if (soakDay > 0) {
        // Chickpea micropyle bubbles (left seed)
        bubblesRef.current.push({
          x: 190 + (Math.random() - 0.5) * 8,
          y: 312,
          radius: 2.0 + Math.random() * 2.8,
          speedY: 1.3 + Math.random() * 1.5,
          wiggleSpeed: 2.2 + Math.random() * 3,
          wiggleAmp: 1.0 + Math.random() * 1.2,
          opacity: 0.9,
          life: 0
        });

        // Maize occasional micro-bubble
        if (Math.random() < 0.25) {
          bubblesRef.current.push({
            x: 326 + (Math.random() - 0.5) * 10,
            y: 320,
            radius: 1.5 + Math.random() * 2.0,
            speedY: 1.1 + Math.random() * 1.2,
            wiggleSpeed: 2 + Math.random() * 2,
            wiggleAmp: 0.7,
            opacity: 0.75,
            life: 0
          });
        }
      }
    }, soakDay === 0 ? 10000 : soakDay === 1 ? 180 : soakDay === 2 ? 110 : 220);

    return () => clearInterval(interval);
  }, [soakDay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = 520;
    const displayHeight = 440;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    let running = true;

    // Swelling factors
    const chickpeaScaleTarget = 1 + (soakDay / 3) * 0.35;
    const maizeScaleTarget = 1 + (soakDay / 3) * 0.18;
    let chickpeaScale = chickpeaScaleTarget;
    let maizeScale = maizeScaleTarget;

    const render = () => {
      if (!running) return;
      timeRef.current += 0.025;
      const t = timeRef.current;

      // Smooth interpolation for swelling
      chickpeaScale += (chickpeaScaleTarget - chickpeaScale) * 0.08;
      maizeScale += (maizeScaleTarget - maizeScale) * 0.08;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // ----------------------------------------------------
      // 1. SOFT SHADOW UNDER GLASS BEAKER
      // ----------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(260, 412, 170, 16, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10, 59, 36, 0.22)';
      ctx.filter = 'blur(9px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();

      // Beaker dimensions
      const bLeft = 90;
      const bRight = 430;
      const bTop = 42;
      const bBottom = 402;
      const bRadius = 32;

      // ----------------------------------------------------
      // 2. BEAKER GLASS BACK WALL & TINT
      // ----------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bLeft, bTop);
      ctx.lineTo(bLeft, bBottom - bRadius);
      ctx.quadraticCurveTo(bLeft, bBottom, bLeft + bRadius, bBottom);
      ctx.lineTo(bRight - bRadius, bBottom);
      ctx.quadraticCurveTo(bRight, bBottom, bRight, bBottom - bRadius);
      ctx.lineTo(bRight, bTop);
      ctx.closePath();

      const glassGrad = ctx.createLinearGradient(bLeft, bTop, bRight, bBottom);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      glassGrad.addColorStop(0.5, 'rgba(215, 243, 230, 0.22)');
      glassGrad.addColorStop(1, 'rgba(180, 230, 210, 0.45)');
      ctx.fillStyle = glassGrad;
      ctx.fill();
      ctx.restore();

      // ----------------------------------------------------
      // 3. WATER BODY WITH MENISCUS
      // ----------------------------------------------------
      const waterTop = 150; // Level corresponding to ~200ml
      const wave = Math.sin(t * 1.8) * 1.4;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bLeft + 3, waterTop + wave);
      ctx.bezierCurveTo(
        180, waterTop + 6 + wave,
        340, waterTop + 6 + wave,
        bRight - 3, waterTop + wave
      );
      ctx.lineTo(bRight - 3, bBottom - bRadius);
      ctx.quadraticCurveTo(bRight - 3, bBottom - 3, bRight - bRadius, bBottom - 3);
      ctx.lineTo(bLeft + bRadius, bBottom - 3);
      ctx.quadraticCurveTo(bLeft + 3, bBottom - 3, bLeft + 3, bBottom - bRadius);
      ctx.closePath();

      const waterGrad = ctx.createLinearGradient(260, waterTop, 260, bBottom);
      waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.34)');
      waterGrad.addColorStop(0.35, 'rgba(45, 180, 160, 0.40)');
      waterGrad.addColorStop(1, 'rgba(16, 120, 90, 0.60)');
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // Top curved water meniscus highlight
      ctx.beginPath();
      ctx.moveTo(bLeft + 3, waterTop + wave);
      ctx.bezierCurveTo(
        180, waterTop + 6 + wave,
        340, waterTop + 6 + wave,
        bRight - 3, waterTop + wave
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.lineWidth = 2.8;
      ctx.stroke();
      ctx.restore();

      // ----------------------------------------------------
      // 4. SUBMERGED PORCELAIN SPECIMEN DISH
      // ----------------------------------------------------
      const dishY = 372;
      ctx.save();
      // Dish shadow on beaker floor
      ctx.beginPath();
      ctx.ellipse(260, dishY + 8, 130, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 44, 30, 0.40)';
      ctx.fill();

      // Outer dish rim
      ctx.beginPath();
      ctx.ellipse(260, dishY, 130, 24, 0, 0, Math.PI * 2);
      const dishGrad = ctx.createLinearGradient(260, dishY - 22, 260, dishY + 24);
      dishGrad.addColorStop(0, '#FFFFFF');
      dishGrad.addColorStop(0.6, '#E2E8F0');
      dishGrad.addColorStop(1, '#CBD5E1');
      ctx.fillStyle = dishGrad;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(20, 69, 47, 0.45)';
      ctx.stroke();

      // Inner dish basin
      ctx.beginPath();
      ctx.ellipse(260, dishY - 2, 118, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210, 235, 225, 0.68)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      // ----------------------------------------------------
      // 5. DRAW REAL PHOTOGRAPHIC SEEDS (SUBMERGED & SHADED)
      // ----------------------------------------------------
      // A. CHICKPEA SEED (DICOT) - LEFT SIDE
      if (dicotImgRef.current && dicotImgRef.current.complete) {
        ctx.save();
        const cX = 196;
        const cY = 338;
        const baseW = 84;
        const baseH = 94;
        const curW = baseW * chickpeaScale;
        const curH = baseH * chickpeaScale;

        // Contact shadow on dish
        ctx.beginPath();
        ctx.ellipse(cX, cY + curH * 0.42, curW * 0.42, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 45, 30, 0.58)';
        ctx.filter = 'blur(3px)';
        ctx.fill();
        ctx.filter = 'none';

        // Draw photorealistic chickpea
        ctx.drawImage(
          dicotImgRef.current,
          cX - curW / 2,
          cY - curH / 2,
          curW,
          curH
        );

        // Subtle water refraction caustics on seed
        ctx.beginPath();
        ctx.ellipse(cX - curW * 0.15, cY - curH * 0.1, curW * 0.25, curH * 0.35, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fill();
        ctx.restore();
      }

      // B. MAIZE KERNEL (MONOCOT) - RIGHT SIDE
      if (maizeImgRef.current && maizeImgRef.current.complete) {
        ctx.save();
        const mX = 324;
        const mY = 338;
        const baseW = 76;
        const baseH = 94;
        const curW = baseW * maizeScale;
        const curH = baseH * maizeScale;

        // Contact shadow on dish
        ctx.beginPath();
        ctx.ellipse(mX, mY + curH * 0.42, curW * 0.42, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 45, 30, 0.54)';
        ctx.filter = 'blur(3px)';
        ctx.fill();
        ctx.filter = 'none';

        // Draw photorealistic maize kernel
        ctx.drawImage(
          maizeImgRef.current,
          mX - curW / 2,
          mY - curH / 2,
          curW,
          curH
        );

        // Subtle water refraction caustics on seed
        ctx.beginPath();
        ctx.ellipse(mX - curW * 0.15, mY - curH * 0.1, curW * 0.25, curH * 0.35, -0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        ctx.restore();
      }

      // ----------------------------------------------------
      // 6. RISING MICRO-BUBBLES (FROM CHICKPEA MICROPYLE)
      // ----------------------------------------------------
      ctx.save();
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        b.life += 0.016;
        b.y -= b.speedY;
        b.x += Math.sin(t * b.wiggleSpeed) * b.wiggleAmp;

        if (b.y < waterTop + 4) {
          bubblesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }
      ctx.restore();

      // ----------------------------------------------------
      // 7. BEAKER GRADUATION MARKINGS (Crisp Borosilicate Etchings)
      // ----------------------------------------------------
      ctx.save();
      ctx.font = "bold 16px 'Outfit', sans-serif";
      ctx.fillStyle = '#14452F';
      ctx.strokeStyle = '#14452F';
      ctx.lineWidth = 2.4;

      const marks = [
        { ml: '250 ml', y: 120 },
        { ml: '200 ml', y: 170 },
        { ml: '150 ml', y: 220 },
        { ml: '100 ml', y: 270 },
        { ml: '50 ml', y: 320 }
      ];

      marks.forEach((m) => {
        ctx.beginPath();
        ctx.moveTo(bLeft + 8, m.y);
        ctx.lineTo(bLeft + 32, m.y);
        ctx.stroke();

        ctx.fillText(m.ml, bLeft + 38, m.y + 5);
      });
      ctx.restore();

      // ----------------------------------------------------
      // 8. GLASS FRONT SPECULAR HIGHLIGHTS & BEAKER LIP
      // ----------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bLeft, bTop);
      ctx.lineTo(bLeft, bBottom - bRadius);
      ctx.quadraticCurveTo(bLeft, bBottom, bLeft + bRadius, bBottom);
      ctx.lineTo(bRight - bRadius, bBottom);
      ctx.quadraticCurveTo(bRight, bBottom, bRight, bBottom - bRadius);
      ctx.lineTo(bRight, bTop);
      ctx.lineWidth = 4.8;
      ctx.strokeStyle = 'rgba(20, 69, 47, 0.58)';
      ctx.stroke();

      // Left specular gloss vertical beam
      const glossGrad = ctx.createLinearGradient(bLeft, bTop, bLeft + 40, bTop);
      glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
      glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGrad;
      ctx.fillRect(bLeft + 4, bTop + 8, 28, bBottom - bTop - 18);

      // Right specular gloss vertical beam
      const rightGloss = ctx.createLinearGradient(bRight - 24, bTop, bRight, bTop);
      rightGloss.addColorStop(0, 'rgba(255, 255, 255, 0)');
      rightGloss.addColorStop(1, 'rgba(255, 255, 255, 0.48)');
      ctx.fillStyle = rightGloss;
      ctx.fillRect(bRight - 24, bTop + 8, 20, bBottom - bTop - 18);

      // Beaker Top Lip
      ctx.beginPath();
      ctx.ellipse(260, bTop, (bRight - bLeft) / 2 + 6, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();
      ctx.lineWidth = 2.6;
      ctx.strokeStyle = 'rgba(20, 69, 47, 0.68)';
      ctx.stroke();
      ctx.restore();

      // ZERO canvas badge text drawn on or over the seeds!
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [soakDay]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: 'auto',
          maxWidth: '100%',
          height: 'auto',
          maxHeight: 'calc(100% - 44px)',
          aspectRatio: '520 / 440',
          display: 'block'
        }}
      />

      {/* CLEAN EXTERNAL SPECIMEN LABELS UNDERNEATH THE BEAKER (NO TEXT ON THE IMAGE) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            background: '#14452F',
            color: '#D1FAE5',
            borderRadius: '16px',
            padding: '6px 18px',
            fontSize: '16px',
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 3px 8px rgba(20, 69, 47, 0.22)'
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34D399' }} />
          <span>Specimen A: Chickpea (Dicot)</span>
        </div>

        <div
          style={{
            background: '#D97706',
            color: '#FEF3C7',
            borderRadius: '16px',
            padding: '6px 18px',
            fontSize: '16px',
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 3px 8px rgba(217, 119, 6, 0.25)'
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FCD34D' }} />
          <span>Specimen B: Maize (Monocot)</span>
        </div>
      </div>
    </div>
  );
}

