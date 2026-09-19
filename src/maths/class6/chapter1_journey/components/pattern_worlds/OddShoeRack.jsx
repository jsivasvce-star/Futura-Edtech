import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, AlertCircle, Sparkles } from 'lucide-react';

/**
 * 3. ODD NUMBERS — SHOE RACK
 * Sequence: 1, 3, 5, 7, 9...
 * 
 * Concept: One object is always left without a partner.
 * Real-life Scenario: A realistic wooden entryway shoe rack.
 * 
 * Interaction:
 * - Student advances through odd numbers: 1, 3, 5, 7, 9
 * - Student clicks "Pair the shoes"
 * - Shoes physically slide into complete pairs (👧👦 pairs)
 * - Exactly ONE solitary shoe remains without a partner on the shelf!
 * - Discovery: "Odd numbers always leave one object without a partner."
 */

const SHOE_STAGES = [
  { count: 1, pairs: 0, remainder: 1, label: '1 Shoe' },
  { count: 3, pairs: 1, remainder: 1, label: '3 Shoes (1 Pair + 1 Left)' },
  { count: 5, pairs: 2, remainder: 1, label: '5 Shoes (2 Pairs + 1 Left)' },
  { count: 7, pairs: 3, remainder: 1, label: '7 Shoes (3 Pairs + 1 Left)' },
  { count: 9, pairs: 4, remainder: 1, label: '9 Shoes (4 Pairs + 1 Left)' }
];

export default function OddShoeRack() {
  const [stageIdx, setStageIdx] = useState(1); // default to 3 shoes for immediate pairing demonstration

  const current = SHOE_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < SHOE_STAGES.length - 1) {
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
      backgroundColor: '#0c0805',
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
          src="/images/patterns/shoe_rack_real.jpg"
          alt="4K Footage of Entryway Oak Shoe Rack"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 55%',
            filter: 'contrast(1.05) saturate(1.06) brightness(0.9)',
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
        background: 'rgba(18, 10, 5, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>👞</span>
          <span style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 800 }}>
            Shoe Rack: <strong style={{ color: '#fca5a5' }}>Pair the shoes</strong>
          </span>
          <span style={{
            background: 'rgba(239, 68, 68, 0.25)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#fecaca',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.pairs} {current.pairs === 1 ? 'Pair' : 'Pairs'} + 1 Unpaired!
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
            <span>Prev Odd</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === SHOE_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === SHOE_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              border: `1px solid ${stageIdx === SHOE_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#f87171'}`,
              borderRadius: '6px',
              color: stageIdx === SHOE_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: stageIdx === SHOE_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === SHOE_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(220, 38, 38, 0.4)'
            }}
          >
            <span>Add Shoes (+2)</span>
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
            title="Reset to 1 Shoe"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── PHOTOREALISTIC LEATHER SHOE RACK INTERACTIVE DISPLAY ── */}
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
        {/* Entryway Shoe Display Glass/Wood Case Tray */}
        <div style={{
          width: '560px',
          background: 'rgba(18, 10, 5, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.8)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px'
        }}>
          {/* Rack Header Board */}
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px dashed rgba(251, 191, 36, 0.3)',
            paddingBottom: '6px'
          }}>
            <span style={{ color: '#fed7aa', fontSize: '0.88rem', fontWeight: 800 }}>
              Entryway Solid Oak Shoe Rack
            </span>
            <span style={{ color: '#fca5a5', fontSize: '0.88rem', fontWeight: 900 }}>
              Total: {current.count} Shoes
            </span>
          </div>

          {/* Shoes Layout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            width: '100%'
          }}>
            {/* 1. Complete Paired Shoes */}
            {current.pairs > 0 && Array.from({ length: current.pairs }).map((_, pIdx) => (
              <div
                key={pIdx}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1.5px solid rgba(59, 130, 246, 0.6)',
                  borderRadius: '12px',
                  padding: '6px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                  animation: 'fadeInScale 0.35s ease forwards'
                }}
              >
                {/* Twin paired handcrafted brown leather shoes with stitches */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '24px',
                    borderRadius: '8px 14px 4px 6px',
                    background: 'linear-gradient(135deg, #78350f 0%, #451a03 60%, #1c0a02 100%)',
                    border: '1px solid rgba(254, 215, 170, 0.4)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.7)',
                    position: 'relative'
                  }}>
                    {/* Realistic lace stitch */}
                    <div style={{ position: 'absolute', top: '4px', left: '8px', width: '12px', height: '2px', background: '#d97706' }} />
                  </div>
                  <div style={{
                    width: '32px',
                    height: '24px',
                    borderRadius: '8px 14px 4px 6px',
                    background: 'linear-gradient(135deg, #78350f 0%, #451a03 60%, #1c0a02 100%)',
                    border: '1px solid rgba(254, 215, 170, 0.4)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.7)',
                    position: 'relative'
                  }}>
                    {/* Realistic lace stitch */}
                    <div style={{ position: 'absolute', top: '4px', left: '8px', width: '12px', height: '2px', background: '#d97706' }} />
                  </div>
                </div>
                <span style={{
                  background: 'rgba(37, 99, 235, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  padding: '1px 8px',
                  borderRadius: '10px'
                }}>
                  Pair #{pIdx + 1}
                </span>
              </div>
            ))}

            {/* 2. The Unpaired Lone Shoe */}
            <div style={{
              background: 'rgba(127, 29, 29, 0.65)',
              border: '2px dashed #ef4444',
              borderRadius: '12px',
              padding: '6px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.35)',
              animation: 'bounce 0.4s ease forwards'
            }}>
              <div style={{
                width: '34px',
                height: '25px',
                borderRadius: '8px 14px 4px 6px',
                background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 60%, #450a0a 100%)',
                border: '1.5px solid #fca5a5',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.6)',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '4px', left: '8px', width: '14px', height: '2px', background: '#fef08a' }} />
              </div>
              <span style={{
                background: '#dc2626',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <AlertCircle size={10} /> 1 Left Alone!
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
        background: 'linear-gradient(180deg, rgba(26, 15, 7, 0.95) 0%, rgba(14, 8, 4, 0.98) 100%)',
        borderTop: '1.5px solid rgba(239, 68, 68, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} color="#fca5a5" />
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Shoe Pairing Discovery:</strong> {current.count} Shoes = <strong>{current.pairs} {current.pairs === 1 ? 'Pair' : 'Pairs'}</strong> + <strong style={{ color: '#fca5a5' }}>1 Unpaired Shoe</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.18)',
          border: '1.5px solid #ef4444',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#fee2e2',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#fca5a5" />
          <span>Odd numbers always leave <strong>one object without a partner</strong></span>
        </div>
      </div>
    </div>
  );
}
