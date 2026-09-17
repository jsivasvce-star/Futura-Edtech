import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import module1Video from '../../../../assets/module 1_cell.mp4';
import module3Video from '../../../../assets/module 3.mp4';

// ══════════════════════════════════════════════════════════════════
// MODULE 1: UNDER THE MICROSCOPE — CELLS DOUBLE (1 → 2 → 4 → 8 → 16)
// ══════════════════════════════════════════════════════════════════
function MicroscopeCellDoublingModule() {
  const [stage, setStage] = useState(0); // 0: 1 cell, 1: 2 cells, 2: 4 cells, 3: 8 cells, 4: 16 cells
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const STAGES = [
    { count: 1, label: 'Stage 1', formula: '1 cell (Initial)', multiply: '1', note: 'Single parent cell observed under 400× optical zoom.' },
    { count: 2, label: 'Stage 2', formula: '1 × 2 = 2', multiply: 'Doubled (×2)', note: 'First mitosis division: 1 parent cell splits into 2 daughter cells.' },
    { count: 4, label: 'Stage 3', formula: '2 × 2 = 4', multiply: 'Doubled (×2)', note: 'Second cycle: Both cells divide simultaneously, producing 4 cells.' },
    { count: 8, label: 'Stage 4', formula: '4 × 2 = 8', multiply: 'Doubled (×2)', note: 'Third cycle: 4 cells split into 8 living cells.' },
    { count: 16, label: 'Stage 5', formula: '8 × 2 = 16', multiply: 'Doubled (×2)', note: 'Fourth cycle: 8 cells split into 16 cells in an active micro-colony.' }
  ];

  // Video play/pause sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStage((prev) => {
        const next = (prev + 1) % STAGES.length;
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = (next / STAGES.length) * videoRef.current.duration;
        }
        return next;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isPlaying, STAGES.length]);

  const handleManualStep = (nextIdx) => {
    const targetIdx = (nextIdx + STAGES.length) % STAGES.length;
    setStage(targetIdx);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (targetIdx / STAGES.length) * videoRef.current.duration;
      if (isPlaying) videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
      gap: '24px',
      alignItems: 'stretch',
      height: '100%'
    }}>
      {/* LEFT: Scientific Microscope Laboratory Viewport */}
      <div style={{
        background: '#0c1322',
        borderRadius: '16px',
        border: '2px solid #334155',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Microscope Top Bar */}
        <div style={{
          padding: '10px 18px',
          background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
          borderBottom: '2.5px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🔬</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc' }}>
                Under the Microscope: Living Cell Division
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
                Biological Doubling Sequence • 400× High Magnification
              </span>
            </div>
          </div>
          <span style={{
            background: '#fef3c7',
            border: '1.5px solid #f59e0b',
            color: '#78350f',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 800
          }}>
            {STAGES[stage].count} {STAGES[stage].count === 1 ? 'CELL' : 'CELLS'}
          </span>
        </div>

        {/* Module 1 Video Viewport */}
        <div style={{
          flex: 1,
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#000000',
          overflow: 'hidden'
        }}>
          <video
            ref={videoRef}
            src={module1Video}
            autoPlay
            loop
            muted
            playsInline
            controls
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.duration) {
                const dur = videoRef.current.duration;
                const progress = videoRef.current.currentTime / dur;
                const s = Math.min(STAGES.length - 1, Math.max(0, Math.floor(progress * STAGES.length)));
                setStage(s);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Interactive Microscope Controls Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(11, 19, 36, 0.98)',
          borderTop: '1.5px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: isPlaying ? '#dc2626' : '#d97706',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, Georgia, serif'
              }}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleManualStep((stage - 1 + STAGES.length) % STAGES.length);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Previous Division Step"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleManualStep((stage + 1) % STAGES.length);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Next Division Step"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
                handleManualStep(0);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: '#94a3b8',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Restart from 1 Cell"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Quick Stage Chips */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {STAGES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  handleManualStep(idx);
                }}
                style={{
                  padding: '5px 10px',
                  background: stage === idx ? '#f59e0b' : '#1e293b',
                  color: stage === idx ? '#0f172a' : '#94a3b8',
                  border: `1.5px solid ${stage === idx ? '#f59e0b' : '#334155'}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                {s.count}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Pedagogical Concept & Sequence Rule Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 0
      }}>
        {/* Sequence Banner */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          padding: '8px 16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          flexShrink: 0
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
            fontWeight: 900,
            color: '#78350f',
            background: '#fef3c7',
            border: '1.5px solid #f59e0b',
            padding: '2px 10px',
            borderRadius: '14px',
            marginBottom: '6px'
          }}>
            Doubling Sequence Progression
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(1.7rem, 2.2vw, 2.5rem)',
            fontWeight: 900,
            color: '#0f172a'
          }}>
            {[1, 2, 4, 8, 16].map((num, i) => (
              <React.Fragment key={num}>
                <span style={{
                  padding: '3px 12px',
                  borderRadius: '8px',
                  background: STAGES[stage].count === num ? '#d97706' : '#f8fafc',
                  color: STAGES[stage].count === num ? '#ffffff' : '#0f172a',
                  border: `2px solid ${STAGES[stage].count === num ? '#b45309' : '#cbd5e1'}`,
                  transition: 'all 0.25s ease',
                  boxShadow: STAGES[stage].count === num ? '0 3px 10px rgba(217, 119, 6, 0.35)' : 'none'
                }}>
                  {num}
                </span>
                {i < 4 && <span style={{ color: '#d97706', fontSize: '1.4rem', fontWeight: 900 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Rule Highlight Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '12px',
          padding: '8px 16px',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.12)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>💡</span>
            <h4 style={{ margin: 0, fontSize: 'clamp(1.6rem, 1.95vw, 2.2rem)', fontWeight: 900, color: '#78350f', lineHeight: 1.15 }}>
              The Mathematical Rule: Multiply by 2 (× 2)
            </h4>
          </div>
          <p style={{
            margin: '0 0 6px 0',
            fontSize: 'clamp(1.35rem, 1.6vw, 1.75rem)',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.25
          }}>
            Every division cycle <strong style={{ color: '#78350f', fontWeight: 900 }}>doubles</strong> the existing number of cells.
          </p>
          <div style={{
            background: '#ffffff',
            border: '2px solid #fcd34d',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: 'clamp(1.45rem, 1.7vw, 1.95rem)',
            fontWeight: 900,
            color: '#0f172a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 900 }}>Current State:</span>
            <span style={{ color: '#d97706', fontWeight: 900 }}>{STAGES[stage].formula}</span>
          </div>
        </div>

        {/* Step-by-Step Breakdown Table */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          padding: '8px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 0
        }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: 'clamp(1.5rem, 1.75vw, 2.05rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
            Step-by-Step Multiplication:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, justifyContent: 'space-between', minHeight: 0 }}>
            {STAGES.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: stage === idx ? '#fef3c7' : '#f8fafc',
                  border: `1.5px solid ${stage === idx ? '#d97706' : '#e2e8f0'}`,
                  fontWeight: 900,
                  fontSize: 'clamp(1.3rem, 1.5vw, 1.65rem)',
                  color: stage === idx ? '#78350f' : '#0f172a',
                  lineHeight: 1.2
                }}
              >
                <span style={{ fontWeight: 900 }}>{s.label}: <strong style={{ color: stage === idx ? '#d97706' : '#0f172a', fontWeight: 900 }}>{s.count} cells</strong></span>
                <span style={{ fontWeight: 900, color: stage === idx ? '#d97706' : '#0f172a' }}>{s.formula}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MODULE 2: REALISTIC PHYSICAL SEQUENCE MACHINE (ALL 10 SEQUENCES)
// ══════════════════════════════════════════════════════════════════
const SEQUENCE_OPTIONS = [
  {
    id: 'all_ones',
    label: 'All 1s',
    title: "All 1's Machine Sequence",
    accentColor: '#64748b',
    ruleBadge: 'STAYS 1',
    rulePlate: 'RULE: aₙ = 1 (Zero Added)',
    ruleTitle: 'The Constant Rule: Always 1',
    ruleFormula: 'aₙ = 1 (Zero Added to Previous)',
    explanation: 'A constant rule where zero is added at each cycle. The number entering the machine remains 1 at the output!',
    steps: [
      { input: 1, rule: 'stays 1', output: 1, formula: '1 → 1 (No change)', label: 'Cycle 1: 1 enters → stays 1 → 1 exits' },
      { input: 1, rule: 'stays 1', output: 1, formula: '1 → 1 (No change)', label: 'Cycle 2: 1 enters → stays 1 → 1 exits' },
      { input: 1, rule: 'stays 1', output: 1, formula: '1 → 1 (No change)', label: 'Cycle 3: 1 enters → stays 1 → 1 exits' },
      { input: 1, rule: 'stays 1', output: 1, formula: '1 → 1 (No change)', label: 'Cycle 4: 1 enters → stays 1 → 1 exits' }
    ],
    fullSequence: [1, 1, 1, 1, 1]
  },
  {
    id: 'counting',
    label: 'Counting numbers',
    title: 'Counting Numbers Sequence',
    accentColor: '#d97706',
    ruleBadge: '+1 ADDER',
    rulePlate: 'RULE: Nₙ₊₁ = Nₙ + 1',
    ruleTitle: 'The Successor Rule: Add 1 (+1)',
    ruleFormula: 'Previous Number + 1 = Next Number',
    explanation: 'Every step adds exactly 1 to the previous quantity: 1, 2, 3, 4, 5, 6... Each output becomes the input for the next cycle!',
    steps: [
      { input: 1, rule: '+ 1', output: 2, formula: '1 + 1 = 2', label: 'Cycle 1: 1 enters → +1 → 2 exits' },
      { input: 2, rule: '+ 1', output: 3, formula: '2 + 1 = 3', label: 'Cycle 2: 2 enters → +1 → 3 exits' },
      { input: 3, rule: '+ 1', output: 4, formula: '3 + 1 = 4', label: 'Cycle 3: 3 enters → +1 → 4 exits' },
      { input: 4, rule: '+ 1', output: 5, formula: '4 + 1 = 5', label: 'Cycle 4: 4 enters → +1 → 5 exits' },
      { input: 5, rule: '+ 1', output: 6, formula: '5 + 1 = 6', label: 'Cycle 5: 5 enters → +1 → 6 exits' }
    ],
    fullSequence: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'odd_numbers',
    label: 'Odd numbers',
    title: 'Odd Numbers Sequence',
    accentColor: '#2563eb',
    ruleBadge: '+2 ADDER',
    rulePlate: 'RULE: Nₙ₊₁ = Nₙ + 2',
    ruleTitle: 'The Odd Step Rule: Add 2 (+2)',
    ruleFormula: 'Previous Odd Number + 2 = Next Odd Number',
    explanation: 'Starting at 1, the machine advances in steps of 2: 1, 3, 5, 7, 9... Notice that paired quantities always leave 1 remainder!',
    steps: [
      { input: 1, rule: '+ 2', output: 3, formula: '1 + 2 = 3', label: 'Cycle 1: 1 enters → +2 → 3 exits' },
      { input: 3, rule: '+ 2', output: 5, formula: '3 + 2 = 5', label: 'Cycle 2: 3 enters → +2 → 5 exits' },
      { input: 5, rule: '+ 2', output: 7, formula: '5 + 2 = 7', label: 'Cycle 3: 5 enters → +2 → 7 exits' },
      { input: 7, rule: '+ 2', output: 9, formula: '7 + 2 = 9', label: 'Cycle 4: 7 enters → +2 → 9 exits' }
    ],
    fullSequence: [1, 3, 5, 7, 9]
  },
  {
    id: 'even_numbers',
    label: 'Even numbers',
    title: 'Even Numbers Sequence',
    accentColor: '#dc2626',
    ruleBadge: '+2 ADDER',
    rulePlate: 'RULE: Nₙ₊₁ = Nₙ + 2',
    ruleTitle: 'The Even Pair Rule: Add 2 (+2)',
    ruleFormula: 'Previous Even Number + 2 = Next Even Number',
    explanation: 'Starting at 2, the machine advances by adding 2 every cycle: 2, 4, 6, 8, 10... Every item forms a complete partner pair!',
    steps: [
      { input: 2, rule: '+ 2', output: 4, formula: '2 + 2 = 4', label: 'Cycle 1: 2 enters → +2 → 4 exits' },
      { input: 4, rule: '+ 2', output: 6, formula: '4 + 2 = 6', label: 'Cycle 2: 4 enters → +2 → 6 exits' },
      { input: 6, rule: '+ 2', output: 8, formula: '6 + 2 = 8', label: 'Cycle 3: 6 enters → +2 → 8 exits' },
      { input: 8, rule: '+ 2', output: 10, formula: '8 + 2 = 10', label: 'Cycle 4: 8 enters → +2 → 10 exits' }
    ],
    fullSequence: [2, 4, 6, 8, 10]
  },
  {
    id: 'triangular',
    label: 'Triangular numbers',
    title: 'Triangular Numbers Sequence',
    accentColor: '#059669',
    ruleBadge: '+ BASE ROW',
    rulePlate: 'RULE: Tₙ = Tₙ₋₁ + n',
    ruleTitle: 'The Triangular Rule: Add Next Base (+n)',
    ruleFormula: 'Tₙ = Previous Total + Row Number',
    explanation: 'Each step adds one more row than the previous: +2, +3, +4, +5. The running totals (1, 3, 6, 10, 15) form triangle layers!',
    steps: [
      { input: 1, rule: '+2', output: 3, formula: '1 + 2 = 3', label: 'Cycle 1: 1 enters → +2 → 3 exits' },
      { input: 3, rule: '+3', output: 6, formula: '3 + 3 = 6', label: 'Cycle 2: 3 enters → +3 → 6 exits' },
      { input: 6, rule: '+4', output: 10, formula: '6 + 4 = 10', label: 'Cycle 3: 6 enters → +4 → 10 exits' },
      { input: 10, rule: '+5', output: 15, formula: '10 + 5 = 15', label: 'Cycle 4: 10 enters → +5 → 15 exits' }
    ],
    fullSequence: [1, 3, 6, 10, 15]
  },
  {
    id: 'squares',
    label: 'Squares',
    title: 'Square Numbers Sequence',
    accentColor: '#d97706',
    ruleBadge: 'n × n (n²)',
    rulePlate: 'RULE: N = n · n (n²)',
    ruleTitle: 'The Square Rule: Multiply By Itself (n²)',
    ruleFormula: 'Square = Side × Side (n × n)',
    explanation: 'Square numbers form equal rows and columns: 2²=4, 3²=9, 4²=16, 5²=25. The machine squares each input number n to give n²!',
    steps: [
      { input: 2, rule: '2² (2×2)', output: 4, formula: '2² = 2 × 2 = 4', label: 'Cycle 1: 2 enters → 2² → 4 exits' },
      { input: 3, rule: '3² (3×3)', output: 9, formula: '3² = 3 × 3 = 9', label: 'Cycle 2: 3 enters → 3² → 9 exits' },
      { input: 4, rule: '4² (4×4)', output: 16, formula: '4² = 4 × 4 = 16', label: 'Cycle 3: 4 enters → 4² → 16 exits' },
      { input: 5, rule: '5² (5×5)', output: 25, formula: '5² = 5 × 5 = 25', label: 'Cycle 4: 5 enters → 5² → 25 exits' }
    ],
    fullSequence: [4, 9, 16, 25]
  },
  {
    id: 'cubes',
    label: 'Cubes',
    title: 'Cube Numbers Sequence',
    accentColor: '#7c3aed',
    ruleBadge: 'n × n × n (n³)',
    rulePlate: 'RULE: N = n · n · n (n³)',
    ruleTitle: 'The Cube Rule: 3D Dimension Volume (n³)',
    ruleFormula: 'Cube = Length × Width × Height (n³)',
    explanation: 'Multiplies a number by itself three times: 2³=8, 3³=27, 4³=64, 5³=125. The volume grows rapidly in 3D space!',
    steps: [
      { input: 2, rule: '2³ (2×2×2)', output: 8, formula: '2³ = 2 × 2 × 2 = 8', label: 'Cycle 1: 2 enters → 2³ → 8 exits' },
      { input: 3, rule: '3³ (3×3×3)', output: 27, formula: '3³ = 3 × 3 × 3 = 27', label: 'Cycle 2: 3 enters → 3³ → 27 exits' },
      { input: 4, rule: '4³ (4×4×4)', output: 64, formula: '4³ = 4 × 4 × 4 = 64', label: 'Cycle 3: 4 enters → 4³ → 64 exits' },
      { input: 5, rule: '5³ (5×5×5)', output: 125, formula: '5³ = 5 × 5 × 5 = 125', label: 'Cycle 4: 5 enters → 5³ → 125 exits' }
    ],
    fullSequence: [8, 27, 64, 125]
  },
  {
    id: 'virahanka',
    label: 'Virahanka numbers',
    title: 'Virahānka Sequence (Fibonacci)',
    accentColor: '#0284c7',
    ruleBadge: 'SUM PREV 2',
    rulePlate: 'RULE: Fₙ = Fₙ₋₁ + Fₙ₋₂',
    ruleTitle: 'The Virahānka Rule: Add Previous Two Terms',
    ruleFormula: 'Fₙ = Fₙ₋₁ + Fₙ₋₂',
    explanation: 'Discovered by ancient Indian scholar Virahānka for Sanskrit poetic meters! Each new term is the exact sum of the two preceding terms: 1, 2, 3, 5, 8, 13, 21...',
    steps: [
      { input: '1, 2', rule: '1 + 2', output: 3, formula: '1 + 2 = 3', label: 'Cycle 1: [1, 2] enter → 1 + 2 → 3 exits' },
      { input: '2, 3', rule: '2 + 3', output: 5, formula: '2 + 3 = 5', label: 'Cycle 2: [2, 3] enter → 2 + 3 → 5 exits' },
      { input: '3, 5', rule: '3 + 5', output: 8, formula: '3 + 5 = 8', label: 'Cycle 3: [3, 5] enter → 3 + 5 → 8 exits' },
      { input: '5, 8', rule: '5 + 8', output: 13, formula: '5 + 8 = 13', label: 'Cycle 4: [5, 8] enter → 5 + 8 → 13 exits' }
    ],
    fullSequence: [1, 2, 3, 5, 8, 13]
  },
  {
    id: 'powers_of_2',
    label: 'Powers of 2',
    title: 'Powers of 2 Sequence',
    accentColor: '#db2777',
    ruleBadge: '×2 DOUBLER',
    rulePlate: 'RULE: Nₙ₊₁ = 2 · Nₙ',
    ruleTitle: 'The Binary Doubling Rule: Multiply by 2 (×2)',
    ruleFormula: 'Previous Quantity × 2 = Next Quantity',
    explanation: 'Every cycle multiplies the quantity by 2: 1, 2, 4, 8, 16, 32... Each step doubles the previous amount in exponential growth!',
    steps: [
      { input: 1, rule: '× 2', output: 2, formula: '1 × 2 = 2', label: 'Cycle 1: 1 enters → ×2 → 2 exits' },
      { input: 2, rule: '× 2', output: 4, formula: '2 × 2 = 4', label: 'Cycle 2: 2 enters → ×2 → 4 exits' },
      { input: 4, rule: '× 2', output: 8, formula: '4 × 2 = 8', label: 'Cycle 3: 4 enters → ×2 → 8 exits' },
      { input: 8, rule: '× 2', output: 16, formula: '8 × 2 = 16', label: 'Cycle 4: 8 enters → ×2 → 16 exits' }
    ],
    fullSequence: [1, 2, 4, 8, 16]
  },
  {
    id: 'powers_of_3',
    label: 'Powers of 3',
    title: 'Powers of 3 Sequence',
    accentColor: '#0d9488',
    ruleBadge: '×3 TRIPLER',
    rulePlate: 'RULE: Nₙ₊₁ = 3 · Nₙ',
    ruleTitle: 'The Tripling Rule: Multiply by 3 (×3)',
    ruleFormula: 'Previous Quantity × 3 = Next Quantity',
    explanation: 'Every cycle multiplies the quantity by 3: 1, 3, 9, 27, 81... Each term is three times larger than the preceding term!',
    steps: [
      { input: 1, rule: '× 3', output: 3, formula: '1 × 3 = 3', label: 'Cycle 1: 1 enters → ×3 → 3 exits' },
      { input: 3, rule: '× 3', output: 9, formula: '3 × 3 = 9', label: 'Cycle 2: 3 enters → ×3 → 9 exits' },
      { input: 9, rule: '× 3', output: 27, formula: '9 × 3 = 27', label: 'Cycle 3: 9 enters → ×3 → 27 exits' },
      { input: 27, rule: '× 3', output: 81, formula: '27 × 3 = 81', label: 'Cycle 4: 27 enters → ×3 → 81 exits' }
    ],
    fullSequence: [1, 3, 9, 27, 81]
  }
];

function SequenceMachineModule() {
  const [selectedSeq, setSelectedSeq] = useState('even_numbers');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeSeq = SEQUENCE_OPTIONS.find((s) => s.id === selectedSeq) || SEQUENCE_OPTIONS[3];
  const steps = activeSeq.steps;
  const current = steps[step] || steps[0];

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => {
        // If triangular numbers reach Cycle 4 (index 3), stop progression
        if (selectedSeq === 'triangular' && prev >= steps.length - 1) {
          setIsPlaying(false);
          setIsProcessing(false);
          return prev;
        }
        setIsProcessing(true);
        setTimeout(() => {
          setStep((p) => {
            if (selectedSeq === 'triangular' && p >= steps.length - 1) {
              setIsPlaying(false);
              setIsProcessing(false);
              return p;
            }
            return (p + 1) % steps.length;
          });
          setIsProcessing(false);
        }, 950);
        return prev;
      });
    }, 3400);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length, selectedSeq]);

  const handleStepClick = (nextStep) => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsProcessing(false);
    }, 450);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
      gap: '24px',
      alignItems: 'stretch',
      height: '100%'
    }}>
      {/* LEFT: Realistic Mechanical Sequence Machine */}
      <div style={{
        background: '#0c1322',
        borderRadius: '16px',
        border: '2px solid #334155',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Machine Top Plate with Dropdown & Status */}
        <div style={{
          padding: '12px 18px',
          background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
          borderBottom: '2.5px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.6rem' }}>⚙️</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc' }}>
                Mathematical Sequence Machine
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
                Rule Processor: [ {activeSeq.ruleBadge} ] • Step {step + 1} of {steps.length}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Sequence Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label htmlFor="sequence-select" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8' }}>
                Sequence:
              </label>
              <select
                id="sequence-select"
                value={selectedSeq}
                onChange={(e) => {
                  setSelectedSeq(e.target.value);
                  setStep(0);
                  setIsProcessing(false);
                }}
                style={{
                  padding: '6px 12px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  border: '1.5px solid #f59e0b',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                }}
              >
                <option value="all_ones">All 1s</option>
                <option value="counting">Counting numbers</option>
                <option value="odd_numbers">Odd numbers</option>
                <option value="even_numbers">Even numbers</option>
                <option value="triangular">Triangular numbers</option>
                <option value="squares">Squares</option>
                <option value="cubes">Cubes</option>
                <option value="virahanka">Virahanka numbers</option>
                <option value="powers_of_2">Powers of 2</option>
                <option value="powers_of_3">Powers of 3</option>
              </select>
            </div>

            <span style={{
              background: isProcessing ? 'rgba(239, 68, 68, 0.25)' : 'rgba(34, 197, 94, 0.25)',
              border: `1.5px solid ${isProcessing ? '#ef4444' : '#22c55e'}`,
              color: isProcessing ? '#fca5a5' : '#86efac',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 900
            }}>
              {isProcessing ? '⚙️ PROCESSING...' : '● READY'}
            </span>
          </div>
        </div>

        {/* Photorealistic Physical Machine Viewport */}
        <div style={{
          flex: 1,
          minHeight: '340px',
          position: 'relative',
          overflow: 'hidden',
          background: '#0c1322 url(/images/patterns/sequence_machine_lab.jpg) center center / cover no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid rgba(255,255,255,0.1)'
        }}>
          {/* Subtle Vignette & Lighting Filter for cinematic depth */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 60% 45%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* 1. INPUT NUMBER TOKEN (Over left metal hopper at x: 25%, y: 35%) */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '20.5%',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#fef08a',
              background: 'rgba(15, 23, 42, 0.88)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(250, 204, 21, 0.6)',
              marginBottom: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
            }}>
              INPUT TOKEN
            </span>
            <div
              key={`in-${selectedSeq}-${step}`}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fef08a 0%, #ca8a04 55%, #713f12 100%)',
                border: '2.5px solid #fef9c3',
                boxShadow: '0 10px 24px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#422006',
                fontSize: String(current.input).length > 2 ? '1.35rem' : '1.75rem',
                fontWeight: 900,
                textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                transform: isProcessing ? 'translateY(16px) scale(0.88)' : 'translateY(0) scale(1)',
                opacity: isProcessing ? 0.85 : 1,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {current.input}
            </div>
          </div>

          {/* 2. REVOLVING BRASS GEARS & INTEGRATED MACHINE RULE (Inside central mechanical chamber at x: 42%, y: 44%) */}
          <div style={{
            position: 'absolute',
            top: '36%',
            left: '42%',
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Rotating Mechanical Gear Assembly */}
            <div style={{ position: 'relative', width: '76px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width="76"
                height="76"
                viewBox="0 0 100 100"
                style={{
                  animation: isProcessing ? 'gearSpinFast 0.9s linear infinite' : 'gearSpinSlow 6s linear infinite',
                  transformOrigin: 'center',
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))'
                }}
              >
                <defs>
                  <radialGradient id="brassGearGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#78350f" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="38" fill="url(#brassGearGrad)" stroke="#fef08a" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="16" fill="#1e293b" stroke="#ca8a04" strokeWidth="2" />
                <circle cx="50" cy="50" r="6" fill="#fef08a" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <rect
                    key={deg}
                    x="45"
                    y="2"
                    width="10"
                    height="12"
                    rx="2"
                    fill="#ca8a04"
                    stroke="#fef08a"
                    strokeWidth="1"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}
              </svg>
            </div>

            {/* Machine Rule Integrated Into Rotating Mechanism Base */}
            <div
              key={`gear-rule-${selectedSeq}-${step}`}
              style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
                border: '1.5px solid #ca8a04',
                borderTop: '2px solid #fef08a',
                borderRadius: '14px',
                padding: '3px 12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.7), inset 0 1px 2px rgba(254, 240, 138, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transform: isProcessing ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                backdropFilter: 'blur(4px)'
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>⚙️</span>
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 900,
                color: '#fef08a',
                letterSpacing: '0.5px',
                textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                fontFamily: '"Times New Roman", Times, Georgia, serif'
              }}>
                {selectedSeq === 'cubes'
                  ? 'MACHINE RULE: n × n × n'
                  : selectedSeq === 'squares'
                  ? 'MACHINE RULE: n × n'
                  : selectedSeq === 'triangular'
                  ? `MACHINE RULE: ${current.rule.replace(/\s+/g, '')}`
                  : selectedSeq === 'all_ones'
                  ? 'MACHINE RULE: stays 1'
                  : selectedSeq === 'counting'
                  ? 'MACHINE RULE: n + 1'
                  : selectedSeq === 'odd_numbers' || selectedSeq === 'even_numbers'
                  ? 'MACHINE RULE: n + 2'
                  : selectedSeq === 'virahanka'
                  ? `MACHINE RULE: ${current.rule}`
                  : selectedSeq === 'powers_of_2'
                  ? 'MACHINE RULE: × 2'
                  : selectedSeq === 'powers_of_3'
                  ? 'MACHINE RULE: × 3'
                  : `RULE: ${activeSeq.ruleBadge}`}
              </span>
            </div>
          </div>

          {/* 3. OUTPUT NUMBER TOKEN (Emerging down chute into brass collection tray at x: 79%, y: 52%) */}
          <div style={{
            position: 'absolute',
            top: '52%',
            left: '78.5%',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '1px',
              color: '#86efac',
              background: 'rgba(15, 23, 42, 0.88)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(34, 197, 94, 0.6)',
              marginBottom: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
            }}>
              OUTPUT RESULT
            </span>
            <div
              key={`out-${selectedSeq}-${step}`}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #86efac 0%, #059669 60%, #064e3b 100%)',
                border: '2.5px solid #bbf7d0',
                boxShadow: '0 12px 28px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: String(current.output).length > 2 ? '1.4rem' : '1.85rem',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                animation: isProcessing ? 'none' : 'tokenChuteEmerge 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
              }}
            >
              {current.output}
            </div>
          </div>

          {/* 5. TELEMETRY FLOW BAR (INPUT NUMBER → MACHINE APPLIES RULE → OUTPUT NEXT NUMBER) */}
          <div style={{
            zIndex: 2,
            marginTop: 'auto',
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
            borderTop: '1.5px solid rgba(245, 158, 11, 0.35)',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backdropFilter: 'blur(6px)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8' }}>INPUT NUMBER:</span>
              <span style={{
                background: '#1e293b',
                border: '1.5px solid #facc15',
                color: '#fef08a',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '1.15rem',
                fontWeight: 900
              }}>
                {current.input}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>➔</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8' }}>MACHINE RULE:</span>
              <span style={{
                background: 'rgba(245, 158, 11, 0.18)',
                border: '1.5px solid #f59e0b',
                color: '#fbbf24',
                padding: '3px 12px',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: 900
              }}>
                ⚙️ {current.rule}
              </span>
              <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>➔</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8' }}>OUTPUT NEXT NUMBER:</span>
              <span style={{
                background: '#064e3b',
                border: '1.5px solid #34d399',
                color: '#a7f3d0',
                padding: '3px 12px',
                borderRadius: '6px',
                fontSize: '1.25rem',
                fontWeight: 900
              }}>
                {current.output}
              </span>
            </div>
          </div>
        </div>

        {/* Machine Interactive Controls */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(11, 19, 36, 0.98)',
          borderTop: '1.5px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: isPlaying ? '#dc2626' : '#059669',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, Georgia, serif'
              }}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleStepClick((step - 1 + steps.length) % steps.length);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Previous Step"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                if (selectedSeq === 'triangular' && step >= steps.length - 1) {
                  return;
                }
                handleStepClick((step + 1) % steps.length);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: (selectedSeq === 'triangular' && step >= steps.length - 1) ? '#64748b' : '#f8fafc',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: (selectedSeq === 'triangular' && step >= steps.length - 1) ? 'default' : 'pointer'
              }}
              title={selectedSeq === 'triangular' && step >= steps.length - 1 ? 'Cycle 4 Reached (Stopped)' : 'Process Next Token'}
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleStepClick(0);
              }}
              style={{
                padding: '8px 12px',
                background: '#1e293b',
                color: '#94a3b8',
                border: '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Reset Machine"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Quick Step Selectors */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {steps.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  handleStepClick(idx);
                }}
                style={{
                  padding: '5px 12px',
                  background: step === idx ? '#f59e0b' : '#1e293b',
                  color: step === idx ? '#0f172a' : '#94a3b8',
                  border: `1.5px solid ${step === idx ? '#f59e0b' : '#334155'}`,
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                {s.input} → {s.output}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Pedagogical Concept & Sequence Rule Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 0
      }}>
        {/* Sequence Banner */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          padding: '8px 16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          flexShrink: 0
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
            fontWeight: 900,
            color: '#78350f',
            background: '#fef3c7',
            border: '1.5px solid #f59e0b',
            padding: '2px 10px',
            borderRadius: '14px',
            marginBottom: '6px'
          }}>
            {activeSeq.title}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(1.6rem, 2.1vw, 2.4rem)',
            fontWeight: 900,
            color: '#0f172a',
            flexWrap: 'wrap'
          }}>
            {activeSeq.fullSequence.map((num, i) => {
              const isCurrent = current.output === num;
              return (
                <React.Fragment key={i}>
                  <span style={{
                    padding: '3px 12px',
                    borderRadius: '8px',
                    background: isCurrent ? '#d97706' : '#f8fafc',
                    color: isCurrent ? '#ffffff' : '#0f172a',
                    border: `2px solid ${isCurrent ? '#b45309' : '#cbd5e1'}`,
                    transition: 'all 0.25s ease',
                    boxShadow: isCurrent ? '0 3px 10px rgba(217, 119, 6, 0.35)' : 'none'
                  }}>
                    {num}
                  </span>
                  {i < activeSeq.fullSequence.length - 1 && (
                    <span style={{ color: '#d97706', fontSize: '1.4rem', fontWeight: 900 }}>→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Rule Highlight Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '12px',
          padding: '8px 16px',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.12)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>💡</span>
            <h4 style={{ margin: 0, fontSize: 'clamp(1.6rem, 1.95vw, 2.2rem)', fontWeight: 900, color: '#78350f', lineHeight: 1.15 }}>
              {activeSeq.ruleTitle}
            </h4>
          </div>
          <p style={{
            margin: '0 0 6px 0',
            fontSize: 'clamp(1.35rem, 1.6vw, 1.75rem)',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.25
          }}>
            <strong style={{ fontWeight: 900 }}>{activeSeq.ruleFormula}</strong>
          </p>
          <div style={{
            background: '#ffffff',
            border: '2px solid #fcd34d',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: 'clamp(1.45rem, 1.7vw, 1.95rem)',
            fontWeight: 900,
            color: '#0f172a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 900 }}>Current Operation:</span>
            <span style={{ color: '#d97706', fontWeight: 900 }}>{current.formula}</span>
          </div>
        </div>

        {/* Step-by-Step Machine Log */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          padding: '8px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 0
        }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: 'clamp(1.5rem, 1.75vw, 2.05rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
            Machine Execution Log:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, justifyContent: 'space-between', minHeight: 0 }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '3px 12px',
                  borderRadius: '6px',
                  background: step === idx ? '#fef3c7' : '#f8fafc',
                  border: `1.5px solid ${step === idx ? '#d97706' : '#e2e8f0'}`,
                  fontWeight: 900,
                  fontSize: 'clamp(1.25rem, 1.45vw, 1.6rem)',
                  color: step === idx ? '#78350f' : '#0f172a',
                  lineHeight: 1.2
                }}
              >
                <span style={{ fontWeight: 900 }}>Cycle {idx + 1}: Input <strong style={{ fontWeight: 900 }}>{s.input}</strong></span>
                <span style={{ color: '#94a3b8', margin: '0 4px', fontWeight: 900 }}>|</span>
                <span style={{ fontWeight: 900 }}>Rule: <strong style={{ color: '#b45309', fontWeight: 900 }}>{s.rule}</strong></span>
                <span style={{ color: '#94a3b8', margin: '0 4px', fontWeight: 900 }}>|</span>
                <span style={{ color: '#059669', fontWeight: 900 }}>Output: <strong style={{ fontWeight: 900 }}>{s.output}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MODULE 3: TEN RUPEES A DAY — REPEATED ADDITION (₹10 → ₹20 → ₹30 → ₹40 → ₹50)
// ══════════════════════════════════════════════════════════════════
function TenRupeesADayModule() {
  const [day, setDay] = useState(1); // 1 to 5 days
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const DAYS = [
    { day: 1, total: 10, formula: '1 × ₹10 = ₹10', added: '+₹10', note: 'Day 1 savings placed in the jar.' },
    { day: 2, total: 20, formula: '2 × ₹10 = ₹20', added: '+₹10', note: 'Second ₹10 coin added. Total reaches ₹20.' },
    { day: 3, total: 30, formula: '3 × ₹10 = ₹30', added: '+₹10', note: 'Third ₹10 coin added. Total reaches ₹30.' },
    { day: 4, total: 40, formula: '4 × ₹10 = ₹40', added: '+₹10', note: 'Fourth ₹10 coin added. Total reaches ₹40.' },
    { day: 5, total: 50, formula: '5 × ₹10 = ₹50', added: '+₹10', note: 'Fifth ₹10 coin added. Total reaches ₹50.' },
    { day: 6, total: 60, formula: '6 × ₹10 = ₹60', added: '+₹10', note: 'Sixth ₹10 coin added. Total reaches ₹60.' },
    { day: 7, total: 70, formula: '7 × ₹10 = ₹70', added: '+₹10', note: 'Seventh ₹10 coin added. Total reaches ₹70.' },
    { day: 8, total: 80, formula: '8 × ₹10 = ₹80', added: '+₹10', note: 'Eighth ₹10 coin added. Total reaches ₹80.' },
    { day: 9, total: 90, formula: '9 × ₹10 = ₹90', added: '+₹10', note: 'Ninth ₹10 coin added. Total reaches ₹90.' },
    { day: 10, total: 100, formula: '10 × ₹10 = ₹100', added: '+₹10', note: 'Tenth ₹10 coin added. Total reaches ₹100.' }
  ];

  // Video play/pause sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDay((prev) => {
        const next = (prev % DAYS.length) + 1;
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = ((next - 1) / 10) * videoRef.current.duration;
        }
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, DAYS.length]);

  const handleStepDay = (nextDay) => {
    const targetDay = Math.max(1, Math.min(10, nextDay));
    setDay(targetDay);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = ((targetDay - 1) / 10) * videoRef.current.duration;
      if (isPlaying) videoRef.current.play().catch(() => {});
    }
  };

  const current = DAYS[day - 1];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.28fr) minmax(0, 1fr)',
      gap: '12px',
      alignItems: 'stretch',
      height: '100%',
      minHeight: 0,
      maxHeight: '100%'
    }}>
      {/* LEFT: Realistic Savings Container Studio */}
      <div style={{
        background: '#0c1322',
        borderRadius: '14px',
        border: '2px solid #334155',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        minHeight: 0
      }}>
        {/* Top Header */}
        <div style={{
          padding: '6px 14px',
          background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
          borderBottom: '2.5px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <span style={{ fontSize: '2.2rem', lineHeight: 1, flexShrink: 0 }}>💰</span>
            <div style={{ minWidth: 0 }}>
              <h3 style={{
                margin: 0,
                fontSize: 'clamp(1.8rem, 2.2vw, 2.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15
              }}>
                Ten Rupees A Day: Savings Progression
              </h3>
              <span style={{
                display: 'block',
                marginTop: '1px',
                fontSize: 'clamp(1.3rem, 1.5vw, 1.65rem)',
                color: '#fbbf24',
                fontWeight: 900,
                lineHeight: 1.15
              }}>
                Repeated Addition Pattern • Day {day} of 10
              </span>
            </div>
          </div>
          <span style={{
            background: '#fef3c7',
            border: '2px solid #f59e0b',
            color: '#78350f',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: 'clamp(1.6rem, 1.9vw, 2.2rem)',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}>
            Total: ₹{current.total}
          </span>
        </div>

        {/* Module 3 Video Viewport */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#000000',
          overflow: 'hidden'
        }}>
          <video
            ref={videoRef}
            src={module3Video}
            autoPlay
            loop
            muted
            playsInline
            controls
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.duration) {
                const dur = videoRef.current.duration;
                const progress = videoRef.current.currentTime / dur;
                const d = Math.min(10, Math.max(1, Math.floor(progress * 10) + 1));
                setDay(d);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Jar Interactive Controls Bar */}
        <div style={{
          padding: '6px 10px',
          background: 'rgba(11, 19, 36, 0.98)',
          borderTop: '1.5px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
          flexWrap: 'nowrap',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                background: isPlaying ? '#dc2626' : '#d97706',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: 'clamp(1.3rem, 1.5vw, 1.7rem)',
                fontWeight: 900,
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, Georgia, serif',
                lineHeight: 1.15,
                whiteSpace: 'nowrap'
              }}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleStepDay(Math.max(1, day - 1));
              }}
              style={{
                padding: '5px 8px',
                background: '#1e293b',
                color: '#f8fafc',
                border: '1.5px solid #475569',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Previous Day"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                handleStepDay(Math.min(DAYS.length, day + 1));
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 9px',
                background: '#d97706',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: 'clamp(1.3rem, 1.5vw, 1.65rem)',
                fontWeight: 900,
                cursor: 'pointer',
                lineHeight: 1.15,
                whiteSpace: 'nowrap'
              }}
              title="Add Next Day (+₹10)"
            >
              <span>+ Day</span>
              <ChevronRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
                handleStepDay(1);
              }}
              style={{
                padding: '5px 8px',
                background: '#1e293b',
                color: '#94a3b8',
                border: '1.5px solid #475569',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Empty Jar (Reset to Day 1)"
            >
              <RotateCcw size={17} />
            </button>
          </div>

          {/* Quick Day Chips */}
          <div style={{ display: 'flex', gap: '2px', flexWrap: 'nowrap', flexShrink: 0 }}>
            {DAYS.map((d) => (
              <button
                key={d.day}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  handleStepDay(d.day);
                }}
                style={{
                  padding: '3px 5px',
                  background: day === d.day ? '#f59e0b' : '#1e293b',
                  color: day === d.day ? '#0f172a' : '#94a3b8',
                  border: `1.5px solid ${day === d.day ? '#f59e0b' : '#334155'}`,
                  borderRadius: '5px',
                  fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
                  fontWeight: 900,
                  cursor: 'pointer',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap'
                }}
              >
                D{d.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Pedagogical Concept & Sequence Rule Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        justifyContent: 'flex-start',
        height: '100%',
        minHeight: 0
      }}>
        {/* Rule Highlight Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '12px',
          padding: '6px 14px',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.12)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>💡</span>
              <h4 style={{
                margin: 0,
                fontSize: 'clamp(1.8rem, 2.2vw, 2.45rem)',
                fontWeight: 900,
                color: '#78350f',
                lineHeight: 1.15
              }}>
                The Rule: Add ₹10 Each Day (+₹10)
              </h4>
            </div>
            <div style={{
              background: '#ffffff',
              border: '2px solid #fcd34d',
              borderRadius: '8px',
              padding: '2px 10px',
              fontSize: 'clamp(1.6rem, 1.9vw, 2.15rem)',
              fontWeight: 900,
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ fontWeight: 900 }}>Day {day} Total:</span>
              <span style={{ color: '#d97706', fontWeight: 900 }}>{day} × ₹10 = ₹{current.total}</span>
            </div>
          </div>
          <p style={{
            margin: '2px 0 0 0',
            fontSize: 'clamp(1.6rem, 1.9vw, 2.25rem)',
            fontWeight: 900,
            color: '#78350f',
            lineHeight: 1.15
          }}>
            <strong style={{ fontWeight: 900 }}>Total Savings = ₹10 × Number of Days</strong>
          </p>
        </div>

        {/* Step-by-Step Savings Ledger */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          padding: '6px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 0
        }}>
          <h4 style={{
            margin: '0 0 3px 0',
            fontSize: 'clamp(1.6rem, 1.85vw, 2.2rem)',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.15
          }}>
            Daily Savings Ledger (10 Days):
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            flex: 1,
            justifyContent: 'space-between',
            minHeight: 0
          }}>
            {DAYS.map((d) => (
              <div
                key={d.day}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '2px 10px',
                  borderRadius: '6px',
                  background: day === d.day ? '#fef3c7' : '#f8fafc',
                  border: `1.5px solid ${day === d.day ? '#d97706' : '#e2e8f0'}`,
                  fontWeight: 900,
                  fontSize: 'clamp(1.35rem, 1.55vw, 1.7rem)',
                  color: day === d.day ? '#78350f' : '#1e293b',
                  lineHeight: 1.15
                }}
              >
                <span style={{ fontWeight: 900 }}>Day {d.day}: <strong style={{ fontWeight: 900 }}>+₹10</strong></span>
                <span style={{ fontWeight: 900 }}>{d.formula}</span>
                <span style={{ color: '#d97706', fontWeight: 900 }}>Total: <strong style={{ fontWeight: 900 }}>₹{d.total}</strong></span>
              </div>
            ))}
          </div>

          {/* Bottom Explanatory Text */}
          <div style={{
            marginTop: '3px',
            padding: '3px 10px',
            background: '#fef3c7',
            borderRadius: '6px',
            border: '1.5px solid #fde68a',
            fontSize: 'clamp(1.35rem, 1.55vw, 1.7rem)',
            fontWeight: 900,
            color: '#78350f',
            textAlign: 'center',
            lineHeight: 1.15
          }}>
            one ₹10 coin a day — the total climbs in equal steps of 10
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN CONCEPT EXPLORATION COMPONENT WITH 3 MODULES
// ══════════════════════════════════════════════════════════════════
export default function ConceptExplorationModules() {
  const [activeModule, setActiveModule] = useState(1); // 1, 2, or 3

  const MODULE_TABS = [
    {
      id: 1,
      title: 'Module 1: Under the Microscope',
      icon: '🔬',
      accentColor: '#d97706'
    },
    {
      id: 2,
      title: 'Module 2: Sequence Machine',
      icon: '⚙️',
      accentColor: '#d97706'
    },
    {
      id: 3,
      title: 'Module 3: Ten Rupees A Day',
      icon: '💰',
      accentColor: '#d97706'
    }
  ];

  return (
    <div style={{
      flex: '1 0 auto',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 24px 18px 24px',
      boxSizing: 'border-box',
      gap: '14px'
    }}>
      {/* ── TOP MODULE SELECTOR ROW (3 LARGE INTERACTIVE LEARNING EXPERIENCES) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        flexShrink: 0
      }}>
        {MODULE_TABS.map((tab) => {
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveModule(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                border: `2.5px solid ${isActive ? tab.accentColor : '#cbd5e1'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isActive ? `0 6px 18px ${tab.accentColor}25` : '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.18s ease',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{tab.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  margin: 0,
                  fontSize: 'clamp(1.05rem, 1.2vw, 1.3rem)',
                  fontWeight: 900,
                  color: isActive ? '#0f172a' : '#475569',
                  fontFamily: '"Times New Roman", Times, Georgia, serif'
                }}>
                  {tab.title}
                </h4>
              </div>
              {isActive && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: tab.accentColor
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE MODULE FULL-SCREEN INTERACTIVE CANVAS ── */}
      <div style={{
        flex: 1,
        minHeight: 0,
        position: 'relative'
      }}>
        {activeModule === 1 && <MicroscopeCellDoublingModule />}
        {activeModule === 2 && <SequenceMachineModule />}
        {activeModule === 3 && <TenRupeesADayModule />}
      </div>

      {/* Embedded Spin Keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes gearSpinFast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gearSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tokenChuteEmerge {
          0% { transform: translateY(-24px) scale(0.7); opacity: 0; }
          60% { transform: translateY(4px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes coinDrop {
          0% { transform: translate(-50%, -80px) scale(0.9); opacity: 0; }
          60% { transform: translate(-50%, 4px) scale(1.03); opacity: 1; }
          80% { transform: translate(-50%, -2px) scale(0.98); }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
