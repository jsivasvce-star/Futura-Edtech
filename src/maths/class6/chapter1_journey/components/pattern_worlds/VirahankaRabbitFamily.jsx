import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Sparkles, Plus } from 'lucide-react';

/**
 * 8. VIRAHANKA NUMBERS — RABBIT FAMILY
 * Sequence: 1, 2, 3, 5, 8, 13...
 * 
 * Concept: The previous two numbers combine to make the next number.
 * Real-life Scenario: A realistic grassy meadow with a growing rabbit family.
 * 
 * Interaction:
 * - Student advances stages: 1 → 2 → 3 → 5 → 8 → 13
 * - Short instruction: "Look at the last two numbers."
 * - At each stage, visually shows: [Previous Group 1] + [Previous Group 2] = New Family Count!
 *   1 + 2 = 3
 *   2 + 3 = 5
 *   3 + 5 = 8
 *   5 + 8 = 13
 * - Discovery: "Look at the last two numbers. Add them. You get the next number."
 */

const RABBIT_STAGES = [
  { stage: 1, total: 1, prev1: 0, prev2: 1, label: '1 Bunny' },
  { stage: 2, total: 2, prev1: 1, prev2: 1, label: '2 Bunnies' },
  { stage: 3, total: 3, prev1: 1, prev2: 2, label: '1 + 2 = 3 Bunnies' },
  { stage: 4, total: 5, prev1: 2, prev2: 3, label: '2 + 3 = 5 Bunnies' },
  { stage: 5, total: 8, prev1: 3, prev2: 5, label: '3 + 5 = 8 Bunnies' },
  { stage: 6, total: 13, prev1: 5, prev2: 8, label: '5 + 8 = 13 Bunnies' }
];

export default function VirahankaRabbitFamily() {
  const [stageIdx, setStageIdx] = useState(2); // default to stage 3 (1+2=3)

  const current = RABBIT_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < RABBIT_STAGES.length - 1) {
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
      backgroundColor: '#031a0e',
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
          src="/images/patterns/rabbit_real.jpg"
          alt="4K Footage of Real Wildlife Meadow European Rabbits"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
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
        background: 'rgba(3, 30, 14, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🐇</span>
          <span style={{ color: '#dcfce7', fontSize: '1rem', fontWeight: 800 }}>
            Rabbit Family: <strong style={{ color: '#ffffff' }}>Look at the last two numbers</strong>
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
            Stage {current.stage} ({current.total} Rabbits)
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
            <span>Prev Family</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === RABBIT_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === RABBIT_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              border: `1px solid ${stageIdx === RABBIT_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#4ade80'}`,
              borderRadius: '6px',
              color: stageIdx === RABBIT_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: stageIdx === RABBIT_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === RABBIT_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(22, 163, 74, 0.4)'
            }}
          >
            <span>Next Family</span>
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
            title="Reset to 1 Bunny"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC SUNNY MEADOW RABBIT FAMILY DISPLAY ── */}
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
        {/* Grassy Meadow Enclosure Card */}
        <div style={{
          width: '560px',
          background: 'rgba(5, 32, 16, 0.68)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '24px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.85)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Visual Adding Demonstration Formula */}
          {stageIdx >= 2 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(2, 20, 10, 0.85)',
              padding: '6px 18px',
              borderRadius: '16px',
              border: '1.5px solid rgba(74, 222, 128, 0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              {/* Previous Group 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fef08a', fontWeight: 900, fontSize: '1.15rem' }}>
                  {current.prev1}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#bbf7d0', fontWeight: 700 }}>Rabbits</span>
              </div>

              <Plus size={16} color="#4ade80" strokeWidth={3} />

              {/* Previous Group 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fef08a', fontWeight: 900, fontSize: '1.15rem' }}>
                  {current.prev2}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#bbf7d0', fontWeight: 700 }}>Rabbits</span>
              </div>

              <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.1rem' }}>=</span>

              {/* Sum / Current Total */}
              <div style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                padding: '2px 10px',
                borderRadius: '8px',
                border: '1px solid #86efac',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '1.2rem' }}>
                  {current.total}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 800 }}>Total</span>
              </div>
            </div>
          ) : (
            <div style={{
              background: 'rgba(2, 20, 10, 0.85)',
              padding: '5px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(74, 222, 128, 0.5)',
              color: '#dcfce7',
              fontSize: '0.85rem',
              fontWeight: 800
            }}>
              Initial Rabbit Population: Starting with {current.total} rabbit
            </div>
          )}

          {/* Rabbits on the Meadow with Realistic Fur and Form */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '500px',
            maxHeight: '120px',
            overflowY: 'auto',
            padding: '4px'
          }}>
            {Array.from({ length: current.total }).map((_, rIdx) => (
              <div
                key={rIdx}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f1f5f9 50%, #cbd5e1 85%, #94a3b8 100%)',
                  border: '1.5px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.6), inset -2px -2px 4px rgba(0,0,0,0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  animation: 'fadeInScale 0.35s ease forwards'
                }}
                title={`Rabbit #${rIdx + 1}`}
              >
                {/* Soft pink inner ear tip */}
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  width: '10px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#fbcfe8'
                }} />
                {/* Gentle eye dot */}
                <div style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#1e293b',
                  marginTop: '4px'
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(5, 46, 22, 0.95) 0%, rgba(2, 26, 13, 0.98) 100%)',
        borderTop: '1.5px solid rgba(34, 197, 94, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🐇</span>
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            {stageIdx >= 2 ? (
              <span>
                <strong>Virahāṅka Rule:</strong> Last two numbers: <strong>{current.prev1} + {current.prev2} = {current.total}</strong> Rabbits!
              </span>
            ) : (
              <span>
                <strong>First Stage:</strong> Starting rabbit population = <strong>{current.total}</strong>.
              </span>
            )}
          </span>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.18)',
          border: '1.5px solid #22c55e',
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
          <span>Look at the last two numbers. <strong>Add them. You get the next number!</strong></span>
        </div>
      </div>
    </div>
  );
}
