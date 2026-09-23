import { useState } from 'react';
import { RotateCcw, ChevronLeft, Scissors, Sparkles } from 'lucide-react';

/**
 * 9. POWERS OF 2 — PIZZA CUTTING
 * Sequence: 1, 2, 4, 8, 16, 32...
 * 
 * Concept: Double every time.
 * Real-life Scenario: A realistic freshly baked pizza on a round wooden cutting board.
 * 
 * Interaction:
 * - Student clicks "CUT AGAIN"
 * - Pizza cutter knife physically slices across, dividing each piece into two equal halves!
 *   1 whole pizza → 2 pieces → 4 pieces → 8 pieces → 16 pieces → 32 pieces
 * - Discovery: "Every time, the number becomes double (× 2)."
 */

const PIZZA_STAGES = [
  { stage: 1, pieces: 1, label: '1 Whole Pizza', cutLines: 0 },
  { stage: 2, pieces: 2, label: '2 Slices (1 Cut)', cutLines: 1 },
  { stage: 3, pieces: 4, label: '4 Slices (2 Cuts)', cutLines: 2 },
  { stage: 4, pieces: 8, label: '8 Slices (4 Cuts)', cutLines: 4 },
  { stage: 5, pieces: 16, label: '16 Slices (8 Cuts)', cutLines: 8 },
  { stage: 6, pieces: 32, label: '32 Slices (16 Cuts)', cutLines: 16 }
];

export default function PowersOfTwoPizzaCutting() {
  const [stageIdx, setStageIdx] = useState(2); // default to 4 slices
  const [cutEffect, setCutEffect] = useState(false);

  const current = PIZZA_STAGES[stageIdx];

  const handleCutAgain = () => {
    if (stageIdx < PIZZA_STAGES.length - 1) {
      setCutEffect(true);
      setStageIdx(prev => prev + 1);
      setTimeout(() => setCutEffect(false), 500);
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
      backgroundColor: '#0c0602',
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
          src="/images/patterns/pizza_real.jpg"
          alt="4K Footage of Real Artisan Stone-Baked Pizza on Wooden Board"
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
        background: 'rgba(18, 8, 3, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🍕</span>
          <span style={{ color: '#fed7aa', fontSize: '1rem', fontWeight: 800 }}>
            Pizza Cutting: <strong style={{ color: '#ffffff' }}>Cut again to double</strong>
          </span>
          <span style={{
            background: 'rgba(249, 115, 22, 0.25)',
            border: '1px solid rgba(249, 115, 22, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#ffedd5',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.pieces} Slices (2^{stageIdx})
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
            <span>Join Back</span>
          </button>

          <button
            type="button"
            onClick={handleCutAgain}
            disabled={stageIdx === PIZZA_STAGES.length - 1}
            style={{
              padding: '6px 18px',
              background: stageIdx === PIZZA_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              border: `1.5px solid ${stageIdx === PIZZA_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#fed7aa'}`,
              borderRadius: '6px',
              color: stageIdx === PIZZA_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 900,
              cursor: stageIdx === PIZZA_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: stageIdx === PIZZA_STAGES.length - 1 ? 'none' : '0 2px 10px rgba(234, 88, 12, 0.5)'
            }}
          >
            <Scissors size={16} />
            <span>CUT AGAIN (Double to {current.pieces * 2})</span>
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
            title="Reset to 1 Whole Pizza"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC PIZZA ON WOODEN CUTTING BOARD CANVAS ── */}
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
        {/* Round Wooden Cutting Board */}
        <div style={{
          width: '270px',
          height: '270px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #78350f 0%, #451a03 70%, #1c0802 100%)',
          border: '5px solid #92400e',
          boxShadow: '0 24px 52px rgba(0,0,0,0.9), inset 0 2px 8px rgba(255,255,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Pizza Cutting Board Handle */}
          <div style={{
            position: 'absolute',
            left: '-44px',
            width: '44px',
            height: '24px',
            borderRadius: '12px 0 0 12px',
            background: 'linear-gradient(180deg, #92400e 0%, #78350f 100%)',
            border: '2px solid #b45309',
            boxShadow: '0 6px 12px rgba(0,0,0,0.6)'
          }} />

          {/* ── THE FRESHLY BAKED PIZZA ── */}
          <div style={{
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 45% 40%, #fde047 0%, #f59e0b 35%, #ea580c 70%, #9a3412 90%, #78350f 100%)',
            border: '8px solid #b45309', // Crispy Crust
            boxShadow: '0 8px 24px rgba(0,0,0,0.7), inset 0 2px 8px rgba(255,255,255,0.4)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Tomato Sauce & Cheese Swirls */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #fef08a 10%, #ea580c 70%)',
              opacity: 0.85
            }} />

            {/* Basil Leaves & Toppings */}
            {[
              { top: '30px', left: '45px' },
              { top: '50px', right: '40px' },
              { bottom: '40px', left: '60px' },
              { bottom: '45px', right: '55px' },
              { top: '85px', left: '90px' }
            ].map((topPos, tIdx) => (
              <div
                key={tIdx}
                style={{
                  position: 'absolute',
                  ...topPos,
                  width: '12px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#15803d',
                  border: '1px solid #166534',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                }}
              />
            ))}

            {/* ── PHYSICAL SLICE CUTTING LINES (Dividing by powers of 2) ── */}
            {current.cutLines >= 1 && (
              /* Vertical Cut (2 pieces) */
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '3px',
                background: '#451a03',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 4px rgba(0,0,0,0.8)'
              }} />
            )}

            {current.cutLines >= 2 && (
              /* Horizontal Cut (4 pieces) */
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: '3px',
                background: '#451a03',
                transform: 'translateY(-50%)',
                boxShadow: '0 0 4px rgba(0,0,0,0.8)'
              }} />
            )}

            {current.cutLines >= 4 && (
              /* Diagonal Cuts (8 pieces) */
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '3px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(45deg)',
                  boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '3px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(-45deg)',
                  boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                }} />
              </>
            )}

            {current.cutLines >= 8 && (
              /* 16 pieces cuts */
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(22.5deg)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(-22.5deg)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(67.5deg)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  background: '#451a03',
                  transform: 'translateX(-50%) rotate(-67.5deg)'
                }} />
              </>
            )}

            {current.cutLines >= 16 && (
              /* 32 pieces cuts */
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '1.5px',
                    background: '#451a03',
                    transform: `translateX(-50%) rotate(${11.25 + idx * 22.5}deg)`
                  }}
                />
              ))
            )}

            {/* Cut flash effect */}
            {cutEffect && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 80%)',
                animation: 'ping 0.4s ease-out'
              }} />
            )}

            {/* Central Badge */}
            <div style={{
              position: 'relative',
              zIndex: 6,
              background: '#b91c1c',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.6)'
            }}>
              <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.1rem' }}>
                {current.pieces}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(26, 10, 3, 0.95) 0%, rgba(12, 5, 1, 0.98) 100%)',
        borderTop: '1.5px solid rgba(249, 115, 22, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🍕</span>
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Pizza Cutting Division:</strong> Slicing each piece in half doubles the slices → <strong style={{ color: '#fb923c' }}>{current.pieces} Equal Slices</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(249, 115, 22, 0.18)',
          border: '1.5px solid #ea580c',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#fed7aa',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#fb923c" />
          <span>Every cut, <strong>the number doubles (1 → 2 → 4 → 8 → 16 → 32)</strong></span>
        </div>
      </div>
    </div>
  );
}
