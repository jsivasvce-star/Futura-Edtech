import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Sprout, Sparkles } from 'lucide-react';

/**
 * 6. SQUARE NUMBERS — PLANT GARDEN
 * Sequence: 1, 4, 9, 16, 25...
 * 
 * Concept: Equal number of rows and columns.
 * Real-life Scenario: A realistic garden nursery with terracotta potted plants.
 * 
 * Interaction:
 * - Student advances through square stages: 1×1 → 2×2 → 3×3 → 4×4 → 5×5
 * - Student clicks "Grow garden grid"
 * - Plants physically fill out equal rows and equal columns on the garden bed
 * - Discovery: "Same number of rows × same number in each row."
 */

const GARDEN_STAGES = [
  { size: 1, total: 1, label: '1 × 1 = 1 Plant' },
  { size: 2, total: 4, label: '2 × 2 = 4 Plants' },
  { size: 3, total: 9, label: '3 × 3 = 9 Plants' },
  { size: 4, total: 16, label: '4 × 4 = 16 Plants' },
  { size: 5, total: 25, label: '5 × 5 = 25 Plants' }
];

export default function SquarePlantGarden() {
  const [stageIdx, setStageIdx] = useState(2); // default to 3x3 = 9 plants

  const current = GARDEN_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < GARDEN_STAGES.length - 1) {
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
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      userSelect: 'none',
      overflow: 'hidden',
      backgroundColor: '#021a14',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* ── REAL 4K CINEMATIC FOOTAGE BACKDROP ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/images/patterns/garden_real.jpg"
          alt="4K Footage of Real Botanical Nursery Garden"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            filter: 'contrast(1.05) saturate(1.06) brightness(0.88)',
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
        background: 'rgba(2, 30, 22, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sprout size={20} color="#4ade80" />
          <span style={{ color: '#dcfce7', fontSize: '1rem', fontWeight: 800 }}>
            Plant Garden: <strong style={{ color: '#ffffff' }}>Grow garden grid</strong>
          </span>
          <span style={{
            background: 'rgba(34, 197, 94, 0.25)',
            border: '1px solid rgba(34, 197, 94, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#86efac',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.size} Rows × {current.size} Columns ({current.total} Plants)
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
            disabled={stageIdx === GARDEN_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === GARDEN_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              border: `1px solid ${stageIdx === GARDEN_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#4ade80'}`,
              borderRadius: '6px',
              color: stageIdx === GARDEN_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: stageIdx === GARDEN_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === GARDEN_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(22, 163, 74, 0.4)'
            }}
          >
            <span>Grow Garden Grid ({stageIdx + 2} × {stageIdx + 2})</span>
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
            title="Reset to 1x1 Plant"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC ELEVATED GARDEN SOIL BED & POTS CANVAS ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}>
        {/* Fertile Dark Garden Soil Bed */}
        <div style={{
          background: 'rgba(20, 10, 4, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '20px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.85)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Garden Bed Label */}
          <div style={{
            color: '#fde68a',
            fontSize: '0.78rem',
            fontWeight: 900,
            letterSpacing: '0.5px',
            marginBottom: '4px'
          }}>
            🌱 SQUARE SOIL BED: {current.size} ROWS × {current.size} COLUMNS
          </div>

          {/* Square Grid of Terracotta Potted Plants */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${current.size}, 1fr)`,
            gap: `${Math.max(6, 16 - current.size * 2)}px`,
            justifyItems: 'center',
            alignItems: 'center'
          }}>
            {Array.from({ length: current.size }).map((_, r) =>
              Array.from({ length: current.size }).map((_, c) => {
                const potSize = Math.max(34, 54 - current.size * 4);
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      width: `${potSize}px`,
                      height: `${potSize}px`,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 30%, #ea580c 0%, #c2410c 45%, #7c2d12 85%, #451a03 100%)',
                      border: '1.5px solid rgba(254, 215, 170, 0.7)',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      animation: 'fadeInScale 0.3s ease forwards'
                    }}
                    title={`Plant at Row ${r + 1}, Column ${c + 1}`}
                  >
                    {/* Rich Moist Soil Center in Pot */}
                    <div style={{
                      width: `${potSize * 0.7}px`,
                      height: `${potSize * 0.7}px`,
                      borderRadius: '50%',
                      background: '#1c0e04',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)'
                    }}>
                      {/* Realistic Green Seedling Leaf */}
                      <div style={{
                        width: `${potSize * 0.38}px`,
                        height: `${potSize * 0.38}px`,
                        borderRadius: '0 60% 0 60%',
                        background: 'linear-gradient(135deg, #4ade80 0%, #15803d 100%)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
                        transform: 'rotate(-25deg)'
                      }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(2, 44, 34, 0.95) 0%, rgba(1, 22, 17, 0.98) 100%)',
        borderTop: '1.5px solid rgba(34, 197, 94, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🪴</span>
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Square Garden Discovery:</strong> {current.size} Rows × {current.size} in each row = <strong style={{ color: '#4ade80' }}>{current.total} Total Plants</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.18)',
          border: '1px solid #22c55e',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#dcfce7',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#4ade80" />
          <span>Same number of rows × same in each row: <strong>{current.size}² = {current.total}</strong></span>
        </div>
      </div>
    </div>
  );
}
