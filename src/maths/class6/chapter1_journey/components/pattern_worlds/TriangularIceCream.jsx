import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

/**
 * 5. TRIANGULAR NUMBERS — ICE-CREAM DISPLAY
 * Sequence: 1, 3, 6, 10, 15...
 * 
 * Concept: Each new row contains one more object than the previous row.
 * Real-life Scenario: A realistic ice-cream shop display parlor counter.
 * 
 * Interaction:
 * - Student advances stages: 1 → 3 → 6 → 10 → 15
 * - Student clicks "Add the next row"
 * - New row is added at the bottom with one more cone than the row above:
 *   Stage 1: 1
 *   Stage 2: 2 + 1 = 3
 *   Stage 3: 3 + 2 + 1 = 6
 *   Stage 4: 4 + 3 + 2 + 1 = 10
 *   Stage 5: 5 + 4 + 3 + 2 + 1 = 15
 * - Discovery: "1 → 3 → 6 → 10 → 15 (Each new row adds one more cone than before)."
 */

const ICE_CREAM_STAGES = [
  { stage: 1, total: 1, rows: [1], label: 'Stage 1 (1 cone)' },
  { stage: 2, total: 3, rows: [1, 2], label: 'Stage 2 (1 + 2 = 3 cones)' },
  { stage: 3, total: 6, rows: [1, 2, 3], label: 'Stage 3 (1 + 2 + 3 = 6 cones)' },
  { stage: 4, total: 10, rows: [1, 2, 3, 4], label: 'Stage 4 (1 + 2 + 3 + 4 = 10 cones)' },
  { stage: 5, total: 15, rows: [1, 2, 3, 4, 5], label: 'Stage 5 (1 + 2 + 3 + 4 + 5 = 15 cones)' }
];

export default function TriangularIceCream() {
  const [stageIdx, setStageIdx] = useState(2); // default to 6 cones

  const current = ICE_CREAM_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < ICE_CREAM_STAGES.length - 1) {
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
      backgroundColor: '#120208',
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
          src="/images/patterns/ice_cream_real.jpg"
          alt="4K Footage of Italian Gelato Parlor Counter"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            filter: 'contrast(1.05) saturate(1.08) brightness(0.88)',
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
        background: 'rgba(20, 4, 10, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🍨</span>
          <span style={{ color: '#fecdd3', fontSize: '1rem', fontWeight: 800 }}>
            Ice-Cream Display: <strong style={{ color: '#ffffff' }}>Add the next row</strong>
          </span>
          <span style={{
            background: 'rgba(244, 63, 94, 0.25)',
            border: '1px solid rgba(244, 63, 94, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#ffe4e6',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.total} Total Cones ({current.rows.length} Rows)
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
            <span>Prev Row</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === ICE_CREAM_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === ICE_CREAM_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              border: `1px solid ${stageIdx === ICE_CREAM_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#fb7185'}`,
              borderRadius: '6px',
              color: stageIdx === ICE_CREAM_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: stageIdx === ICE_CREAM_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === ICE_CREAM_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(225, 29, 72, 0.4)'
            }}
          >
            <span>Add Row (+{stageIdx + 2})</span>
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
            title="Reset to 1 Cone"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC ICE-CREAM PARLOR DISPLAY COUNTER ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '24px',
        boxSizing: 'border-box'
      }}>
        {/* Glass display parlor case frame overlay */}
        <div style={{
          position: 'relative',
          width: '540px',
          background: 'rgba(15, 5, 10, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '20px',
          padding: '16px 20px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Shop Display Banner */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(190, 18, 60, 0.9) 0%, rgba(225, 29, 72, 0.9) 50%, rgba(190, 18, 60, 0.9) 100%)',
            borderRadius: '6px',
            padding: '3px 14px',
            color: '#ffffff',
            fontSize: '0.78rem',
            fontWeight: 900,
            letterSpacing: '0.5px',
            marginBottom: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }}>
            🍨 PARLOUR DISPLAY: TRIANGULAR CONE STACK
          </div>

          {/* Triangular Cones Arrangement */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            {current.rows.map((rowSize, rIdx) => (
              <div
                key={rIdx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  animation: 'fadeInScale 0.35s ease forwards'
                }}
              >
                {Array.from({ length: rowSize }).map((_, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      width: '32px',
                      height: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.7))'
                    }}
                    title={`Cone in Row ${rIdx + 1}`}
                  >
                    {/* Creamy Artisan Gelato Scoop */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 30%, #fff1f2 0%, #f43f5e 50%, #9f1239 100%)',
                      boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), inset 1px 1px 3px rgba(255,255,255,0.7)',
                      zIndex: 2
                    }} />
                    {/* Waffle Cone Body with Natural Waffle Grid */}
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '11px solid transparent',
                      borderRight: '11px solid transparent',
                      borderTop: '18px solid #d97706',
                      marginTop: '-5px',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      zIndex: 1
                    }} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Display Platter Shelf */}
          <div style={{
            width: '460px',
            height: '8px',
            borderRadius: '4px',
            background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
            marginTop: '4px'
          }} />
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(31, 2, 12, 0.95) 0%, rgba(15, 1, 6, 0.98) 100%)',
        borderTop: '1.5px solid rgba(244, 63, 94, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🍦</span>
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Triangular Cones:</strong> {current.rows.map(r => `${r}`).join(' + ')} = <strong style={{ color: '#f43f5e' }}>{current.total} Total Ice Creams</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(244, 63, 94, 0.18)',
          border: '1.5px solid #f43f5e',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#ffe4e6',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#fb7185" />
          <span>Each new row adds <strong>one more object than the previous row</strong></span>
        </div>
      </div>
    </div>
  );
}
