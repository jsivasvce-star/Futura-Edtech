import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Trees, Sparkles } from 'lucide-react';

/**
 * 10. POWERS OF 3 — BRANCHING TREE
 * Sequence: 1, 3, 9, 27, 81...
 * 
 * Concept: Triple every time.
 * Real-life Scenario: A realistic orchard tree branching in nature.
 * 
 * Interaction:
 * - Start with 1 branch
 * - Student clicks "Grow the tree"
 * - Every existing branch sprouts 3 new branches!
 *   1 → 3 → 9 → 27 → 81
 * - Discovery: "Every time, the number becomes three times (× 3)."
 */

const TREE_STAGES = [
  { stage: 1, branches: 1, label: '1 Main Trunk Branch (3⁰)', tier: 1 },
  { stage: 2, branches: 3, label: '3 Branches (1 × 3 = 3)', tier: 2 },
  { stage: 3, branches: 9, label: '9 Branches (3 × 3 = 9)', tier: 3 },
  { stage: 4, branches: 27, label: '27 Branches (9 × 3 = 27)', tier: 4 },
  { stage: 5, branches: 81, label: '81 Branches Canopy (27 × 3 = 81)', tier: 5 }
];

export default function PowersOfThreeBranchingTree() {
  const [stageIdx, setStageIdx] = useState(1); // default to 3 branches

  const current = TREE_STAGES[stageIdx];

  const handleNext = () => {
    if (stageIdx < TREE_STAGES.length - 1) {
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
      backgroundColor: '#04111d',
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
          src="/images/patterns/tree_real.jpg"
          alt="4K Footage of Real Majestic Oak Tree in Sunlit Botanical Park"
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
        background: 'rgba(4, 17, 30, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trees size={20} color="#38bdf8" />
          <span style={{ color: '#bae6fd', fontSize: '1rem', fontWeight: 800 }}>
            Branching Tree: <strong style={{ color: '#ffffff' }}>Grow the tree</strong>
          </span>
          <span style={{
            background: 'rgba(56, 189, 248, 0.25)',
            border: '1px solid rgba(56, 189, 248, 0.6)',
            borderRadius: '6px',
            padding: '2px 8px',
            color: '#e0f2fe',
            fontSize: '0.8rem',
            fontWeight: 800,
            backdropFilter: 'blur(6px)'
          }}>
            {current.branches} Branches (3^{stageIdx})
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
            <span>Prev Stage</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={stageIdx === TREE_STAGES.length - 1}
            style={{
              padding: '6px 16px',
              background: stageIdx === TREE_STAGES.length - 1
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: `1px solid ${stageIdx === TREE_STAGES.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#38bdf8'}`,
              borderRadius: '6px',
              color: stageIdx === TREE_STAGES.length - 1 ? '#64748b' : '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 900,
              cursor: stageIdx === TREE_STAGES.length - 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: stageIdx === TREE_STAGES.length - 1 ? 'none' : '0 2px 8px rgba(2, 132, 199, 0.4)'
            }}
          >
            <span>Grow Tree (Triple to {current.branches * 3})</span>
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
            title="Reset to 1 Branch"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── REALISTIC BRANCHING TREE CANVAS ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Tree display backdrop glass container */}
        <div style={{
          position: 'relative',
          width: '560px',
          background: 'rgba(4, 18, 32, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '24px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.8)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>

        {/* ── TREE STRUCTURE SVG ── */}
        <div style={{
          position: 'relative',
          width: '460px',
          height: '220px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 3
        }}>
          <svg width="460" height="220" viewBox="0 0 460 220" style={{ overflow: 'visible' }}>
            {/* Trunk */}
            <path
              d="M 230 220 Q 230 180 230 160"
              stroke="#78350f"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />

            {/* Stage 1: 1 Main branch */}
            {stageIdx >= 0 && (
              <path
                d="M 230 160 Q 230 140 230 125"
                stroke="#92400e"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Stage 2: 3 Triad Branches (Left, Center, Right) */}
            {stageIdx >= 1 && (
              <g>
                <path d="M 230 125 Q 200 105 170 85" stroke="#a16207" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 230 125 Q 230 100 230 75" stroke="#a16207" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 230 125 Q 260 105 290 85" stroke="#a16207" strokeWidth="8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Stage 3: 9 Sub-branches (3 from each of the 3) */}
            {stageIdx >= 2 && (
              <g>
                {/* From Left (170, 85) */}
                <path d="M 170 85 Q 150 70 130 55" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 170 85 Q 165 65 160 48" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 170 85 Q 185 68 195 52" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />

                {/* From Center (230, 75) */}
                <path d="M 230 75 Q 215 55 210 38" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 230 75 Q 230 50 230 35" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 230 75 Q 245 55 250 38" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />

                {/* From Right (290, 85) */}
                <path d="M 290 85 Q 275 68 265 52" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 290 85 Q 295 65 300 48" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 290 85 Q 310 70 330 55" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Stage 4: 27 Leaves/twigs canopy */}
            {stageIdx >= 3 && (
              <g>
                {[
                  { x: 130, y: 55 }, { x: 160, y: 48 }, { x: 195, y: 52 },
                  { x: 210, y: 38 }, { x: 230, y: 35 }, { x: 250, y: 38 },
                  { x: 265, y: 52 }, { x: 300, y: 48 }, { x: 330, y: 55 }
                ].map((tip, tIdx) => (
                  <g key={tIdx}>
                    <circle cx={tip.x - 6} cy={tip.y - 12} r="5" fill="#4ade80" />
                    <circle cx={tip.x} cy={tip.y - 16} r="6" fill="#22c55e" />
                    <circle cx={tip.x + 6} cy={tip.y - 12} r="5" fill="#4ade80" />
                  </g>
                ))}
              </g>
            )}

            {/* Stage 5: 81 Full Blossom Canopy */}
            {stageIdx >= 4 && (
              <g>
                {Array.from({ length: 54 }).map((_, i) => {
                  const cx = 110 + (i * 240) / 54 + (i % 3) * 6;
                  const cy = 20 + ((i * 17) % 35);
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={4 + (i % 3)}
                      fill={i % 2 === 0 ? '#86efac' : '#4ade80'}
                      opacity="0.9"
                    />
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Grass Orchard Mound */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '520px',
          height: '24px',
          borderRadius: '20px 20px 0 0',
          background: 'linear-gradient(180deg, #15803d 0%, #166534 50%, #14532d 100%)',
          borderTop: '2.5px solid #4ade80',
          boxShadow: '0 6px 14px rgba(0,0,0,0.7)',
          zIndex: 2
        }} />
        </div>
      </div>

      {/* ── BOTTOM PEDAGOGICAL BREAKDOWN ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(8, 23, 41, 0.95) 0%, rgba(4, 11, 20, 0.98) 100%)',
        borderTop: '1.5px solid rgba(56, 189, 248, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Trees size={18} color="#38bdf8" />
          <span style={{ color: '#f8fafc', fontSize: '0.98rem', fontWeight: 700 }}>
            <strong>Tree Branching Growth:</strong> Every branch splits into 3 → <strong style={{ color: '#38bdf8' }}>{current.branches} Branches</strong>.
          </span>
        </div>

        <div style={{
          background: 'rgba(56, 189, 248, 0.18)',
          border: '1.5px solid #38bdf8',
          borderRadius: '20px',
          padding: '4px 16px',
          color: '#e0f2fe',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>Every time, <strong>the number becomes three times (1 → 3 → 9 → 27 → 81)</strong></span>
        </div>
      </div>
    </div>
  );
}
