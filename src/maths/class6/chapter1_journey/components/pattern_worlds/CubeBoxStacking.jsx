import { useState, useRef } from 'react';
import { Box, RotateCcw, ChevronRight, ChevronLeft, Compass, Sparkles } from 'lucide-react';

/**
 * 7. CUBE NUMBERS — BOX STACKING
 * Sequence: 1, 8, 27, 64...
 * 
 * Concept: Length × width × height.
 * Real-life Scenario: A realistic workshop study desk with stackable wooden storage boxes.
 * 
 * Interaction:
 * - Student advances stages: 1³ (1) → 2³ (8) → 3³ (27) → 4³ (64)
 * - Student clicks "Build the next layer"
 * - Student can click & drag to rotate the 3D stack in 360° to inspect length, width, and height!
 * - Discovery: "Now we have height too: Length × Width × Height."
 */

const BOX_STAGES = [
  { size: 1, total: 1, label: '1 × 1 × 1 = 1 Box', scale: 1.35 },
  { size: 2, total: 8, label: '2 × 2 × 2 = 8 Boxes', scale: 1.1 },
  { size: 3, total: 27, label: '3 × 3 × 3 = 27 Boxes', scale: 0.9 },
  { size: 4, total: 64, label: '4 × 4 × 4 = 64 Boxes', scale: 0.72 }
];

export default function CubeBoxStacking() {
  const [stageIdx, setStageIdx] = useState(1); // default to 2³ = 8 boxes
  const [rotation, setRotation] = useState({ x: -25, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const current = BOX_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < BOX_STAGES.length - 1) {
      setStageIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (stageIdx > 0) {
      setStageIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStageIdx(0);
    setRotation({ x: -25, y: 35 });
  };

  // 3D Orbit drag controls
  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = {
      x: e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0,
      y: e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setRotation(prev => ({
      x: Math.max(-75, Math.min(75, prev.x - deltaY * 0.45)),
      y: (prev.y + deltaX * 0.45) % 360
    }));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const boxPixelSize = Math.max(34, 64 - current.size * 7);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
        backgroundColor: '#0c0703',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {/* ── REAL 4K CINEMATIC FOOTAGE BACKDROP ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/images/patterns/blocks_real.jpg"
          alt="4K Footage of Real Woodworking Workshop Studio Table"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            filter: 'contrast(1.05) saturate(1.06) brightness(0.86)',
            transform: `scale(${1 + stageIdx * 0.015})`,
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
        {/* Subtle camera lens vignette overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)',
          pointerEvents: 'none'
        }} />
        {/* Cinematic 4K REC indicator */}
        <div style={{
          position: 'absolute',
          top: '64px',
          right: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.65)',
          padding: '3px 9px',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.15)',
          fontSize: '0.72rem',
          color: '#f8fafc',
          letterSpacing: '0.08em',
          fontWeight: 700,
          pointerEvents: 'none'
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
          <span>4K UHD 60FPS</span>
        </div>
      </div>

      {/* ── TOP HUD CONTROLS ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        background: 'rgba(18, 10, 4, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={20} color="#f59e0b" />
          <span style={{ color: '#fef3c7', fontSize: '1rem', fontWeight: 800 }}>
            Box Stacking: <strong style={{ color: '#ffffff' }}>Build the next layer</strong>
          </span>
          <span style={{
            background: 'rgba(217, 119, 6, 0.25)',
            border: '1px solid rgba(245, 158, 11, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#fde68a',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.size} × {current.size} × {current.size} = {current.total} Boxes
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={stageIdx === 0}
            style={{
              padding: '6px 12px',
              background: stageIdx === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: stageIdx === 0 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: stageIdx === 0 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ChevronLeft size={16} />
            <span>Smaller</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === BOX_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === BOX_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              border: `1px solid ${stageIdx === BOX_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#f59e0b'}`,
              borderRadius: '6px',
              color: stageIdx === BOX_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: stageIdx === BOX_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === BOX_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(217, 119, 6, 0.4)'
            }}
          >
            <span>Build Next Layer ({(stageIdx + 2)}³)</span>
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            title="Reset to 1 Box"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── 3D WOODEN DESK & ROTATABLE CUBE BOXES CANVAS ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '260px',
        overflow: 'hidden',
        perspective: '1200px'
      }}>
        {/* Tabletop Surface Base shadow */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          width: '420px',
          height: '18px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* 3D Rotatable Stack of Wooden Boxes */}
        <div style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${current.scale})`,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          {/* X, Y, Z coordinates */}
          {Array.from({ length: current.size }).map((_, z) =>
            Array.from({ length: current.size }).map((_, y) =>
              Array.from({ length: current.size }).map((_, x) => {
                const offsetX = (x - (current.size - 1) / 2) * (boxPixelSize + 3);
                const offsetY = (y - (current.size - 1) / 2) * (boxPixelSize + 3);
                const offsetZ = (z - (current.size - 1) / 2) * (boxPixelSize + 3);

                return (
                  <div
                    key={`${x}-${y}-${z}`}
                    style={{
                      position: 'absolute',
                      width: `${boxPixelSize}px`,
                      height: `${boxPixelSize}px`,
                      transformStyle: 'preserve-3d',
                      transform: `translate3d(${offsetX}px, ${offsetY}px, ${offsetZ}px)`
                    }}
                  >
                    {/* Front Face (Warm polished oak) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, #d97706 0%, #b45309 60%, #92400e 100%)',
                      border: '1.5px solid #fde68a',
                      transform: `translateZ(${boxPixelSize / 2}px)`,
                      boxShadow: 'inset 0 0 6px rgba(255,255,255,0.2)'
                    }} />

                    {/* Back Face */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#78350f',
                      border: '1.5px solid #92400e',
                      transform: `rotateY(180deg) translateZ(${boxPixelSize / 2}px)`
                    }} />

                    {/* Top Face (Light hit) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, #fef08a 0%, #f59e0b 80%)',
                      border: '1.5px solid #ffffff',
                      transform: `rotateX(90deg) translateZ(${boxPixelSize / 2}px)`,
                      boxShadow: 'inset 0 0 8px rgba(255,255,255,0.5)'
                    }} />

                    {/* Bottom Face */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#451a03',
                      border: '1.5px solid #78350f',
                      transform: `rotateX(-90deg) translateZ(${boxPixelSize / 2}px)`
                    }} />

                    {/* Left Face (Shadowed) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, #b45309 0%, #78350f 100%)',
                      border: '1.5px solid #d97706',
                      transform: `rotateY(-90deg) translateZ(${boxPixelSize / 2}px)`
                    }} />

                    {/* Right Face */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, #d97706 0%, #92400e 100%)',
                      border: '1.5px solid #fde68a',
                      transform: `rotateY(90deg) translateZ(${boxPixelSize / 2}px)`
                    }} />
                  </div>
                );
              })
            )
          )}
        </div>

        {/* Orbit drag hint */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(20, 11, 5, 0.8)',
          padding: '4px 12px',
          borderRadius: '16px',
          border: '1px solid rgba(217, 119, 6, 0.35)',
          color: '#fef3c7',
          fontSize: '0.78rem',
          fontWeight: 700,
          pointerEvents: 'none'
        }}>
          <Compass size={14} color="#f59e0b" />
          <span>Click & Drag to Rotate 3D</span>
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 11, 5, 0.95) 0%, rgba(10, 5, 2, 0.98) 100%)',
        borderTop: '1.5px solid rgba(217, 119, 6, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box size={18} color="#f59e0b" />
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>3D Box Stacking:</strong> Length ({current.size}) × Width ({current.size}) × Height ({current.size}) = <strong style={{ color: '#fbbf24' }}>{current.total} Total Boxes</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(217, 119, 6, 0.18)',
          border: '1.5px solid #d97706',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#fef3c7',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#f59e0b" />
          <span>Now we have height too: <strong>{current.size}³ = {current.total}</strong></span>
        </div>
      </div>
    </div>
  );
}
