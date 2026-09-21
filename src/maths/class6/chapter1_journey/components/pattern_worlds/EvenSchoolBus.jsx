import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Bus, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * 4. EVEN NUMBERS — SCHOOL BUS
 * Sequence: 2, 4, 6, 8, 10...
 * 
 * Concept: Everything can be paired.
 * Real-life Scenario: A realistic school bus interior with twin passenger seats.
 * 
 * Interaction:
 * - Student advances through even numbers: 2, 4, 6, 8, 10
 * - Student clicks "Fill the seats"
 * - School backpacks / student buddies occupy twin seats in complete pairs
 * - Every object gets a partner! Exactly 0 left alone!
 * - Discovery: "Even numbers can be completely divided into pairs."
 */

const BUS_STAGES = [
  {
    count: 2,
    pairs: 1,
    label: '2 Seats (1 Pair)',
    pairsData: [
      { id: 1, items: ['🎒', '🎒'], label: 'Row 1' }
    ]
  },
  {
    count: 4,
    pairs: 2,
    label: '4 Seats (2 Pairs)',
    pairsData: [
      { id: 1, items: ['🎒', '🎒'], label: 'Row 1' },
      { id: 2, items: ['🎒', '🎒'], label: 'Row 2' }
    ]
  },
  {
    count: 6,
    pairs: 3,
    label: '6 Seats (3 Pairs)',
    pairsData: [
      { id: 1, items: ['🎒', '🎒'], label: 'Row 1' },
      { id: 2, items: ['🎒', '🎒'], label: 'Row 2' },
      { id: 3, items: ['🎒', '🎒'], label: 'Row 3' }
    ]
  },
  {
    count: 8,
    pairs: 4,
    label: '8 Seats (4 Pairs)',
    pairsData: [
      { id: 1, items: ['🎒', '🎒'], label: 'Row 1' },
      { id: 2, items: ['🎒', '🎒'], label: 'Row 2' },
      { id: 3, items: ['🎒', '🎒'], label: 'Row 3' },
      { id: 4, items: ['🎒', '🎒'], label: 'Row 4' }
    ]
  },
  {
    count: 10,
    pairs: 5,
    label: '10 Seats (5 Pairs)',
    pairsData: [
      { id: 1, items: ['🎒', '🎒'], label: 'Row 1' },
      { id: 2, items: ['🎒', '🎒'], label: 'Row 2' },
      { id: 3, items: ['🎒', '🎒'], label: 'Row 3' },
      { id: 4, items: ['🎒', '🎒'], label: 'Row 4' },
      { id: 5, items: ['🎒', '🎒'], label: 'Row 5' }
    ]
  }
];

export default function EvenSchoolBus() {
  const [stageIdx, setStageIdx] = useState(1); // default to 4 seats (2 pairs)

  const current = BUS_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < BUS_STAGES.length - 1) {
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
      backgroundColor: '#0a0d16',
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
          src="/images/patterns/school_bus_real.jpg"
          alt="4K Footage of Real School Bus Interior"
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
        background: 'rgba(10, 15, 26, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bus size={20} color="#facc15" />
          <span style={{ color: '#fef08a', fontSize: '1rem', fontWeight: 800 }}>
            School Bus: <strong style={{ color: '#ffffff' }}>Fill the seats</strong>
          </span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.25)',
            border: '1px solid rgba(16, 185, 129, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#6ee7b7',
            fontSize: '0.8rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(6px)'
          }}>
            <CheckCircle2 size={12} />
            {current.pairs} Complete {current.pairs === 1 ? 'Pair' : 'Pairs'} (0 Left Alone)
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
            <span>Prev Pair</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === BUS_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === BUS_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
              border: `1px solid ${stageIdx === BUS_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#fde047'}`,
              borderRadius: '6px',
              color: stageIdx === BUS_STAGES.length - 1 ? '#64748b' : '#000000',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: stageIdx === BUS_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === BUS_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(234, 179, 8, 0.4)'
            }}
          >
            <span>Fill Next Pair (+2)</span>
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
            title="Reset to 2 Seats"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC SCHOOL BUS INTERIOR CANVAS ── */}
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
        {/* Real Passenger Seating Tray Overlay */}
        <div style={{
          width: '560px',
          background: 'rgba(10, 15, 28, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.8)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Destination Header Banner */}
          <div style={{
            width: '100%',
            background: 'rgba(2, 132, 199, 0.85)',
            borderRadius: '8px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(186, 230, 253, 0.5)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
            <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.5px' }}>
              🚌 SCHOOL BUS #6 — SEATED IN PAIRS
            </span>
            <span style={{ color: '#fef08a', fontSize: '0.82rem', fontWeight: 900 }}>
              {current.count} Bags Seated
            </span>
          </div>

          {/* Central Bus Aisle with Twin Seat Rows */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxHeight: '145px',
            overflowY: 'auto',
            padding: '4px'
          }}>
            {current.pairsData.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1.5px solid rgba(96, 165, 250, 0.6)',
                  borderRadius: '12px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.6)',
                  animation: 'fadeInScale 0.35s ease forwards'
                }}
              >
                {/* Twin Vinyl Seat 1 with Bag */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 60%, #0f172a 100%)',
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    color: '#ffffff',
                    fontWeight: 900
                  }}>
                    A
                  </div>
                </div>

                {/* Partner link divider */}
                <div style={{
                  width: '2px',
                  height: '20px',
                  background: '#fde047',
                  borderRadius: '1px',
                  boxShadow: '0 0 4px #fde047'
                }} />

                {/* Twin Vinyl Seat 2 with Bag */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 60%, #0f172a 100%)',
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    color: '#ffffff',
                    fontWeight: 900
                  }}>
                    B
                  </div>
                </div>

                <span style={{
                  color: '#93c5fd',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginLeft: '2px'
                }}>
                  Pair #{idx + 1}
                </span>
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
        background: 'linear-gradient(180deg, rgba(28, 10, 2, 0.95) 0%, rgba(14, 5, 1, 0.98) 100%)',
        borderTop: '1.5px solid rgba(234, 179, 8, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color="#6ee7b7" />
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Bus Seating Discovery:</strong> {current.count} Bags = <strong>{current.pairs} Complete {current.pairs === 1 ? 'Pair' : 'Pairs'}</strong>. No seat or bag is left alone!
          </span>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.18)',
          border: '1.5px solid #10b981',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#d1fae5',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#6ee7b7" />
          <span>Even numbers <strong>can be completely divided into pairs (2 × {current.pairs} = {current.count})</strong></span>
        </div>
      </div>
    </div>
  );
}
