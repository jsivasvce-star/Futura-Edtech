import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, CheckCircle2, Sparkles, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import PatternVisualCinema from './PatternVisualCinema';
import DuskCarPatternCinema from './DuskCarPatternCinema';

// ── 10 TEXTBOOK NUMBER SEQUENCES DATA ──
const SEQUENCES = [
  {
    id: 'all_ones',
    title: 'All 1’s',
    emoji: '1️⃣',
    accentColor: '#64748b',
    numbers: [1, 1, 1, 1, 1],
    sequenceDisplay: '1, 1, 1, 1, 1, ...',
    rule: 'Always stays 1.',
    explanation: 'One single polished ball filmed from multiple cinematic camera angles. The quantity strictly remains ONE in every scene.',
    videoSrc: '/videos/patterns/all_ones.mp4',
    videoTitle: 'All 1’s — Single Focus Object Across Scenes',
    predictQuestion: [1, 1, 1, 1],
    predictAnswers: [1, 1, 1],
    formula: 'aₙ = 1'
  },
  {
    id: 'counting',
    title: 'Counting Numbers',
    emoji: '🔢',
    accentColor: '#d97706',
    numbers: [1, 2, 3, 4, 5, 6, 7],
    sequenceDisplay: '1, 2, 3, 4, 5, 6, 7, ...',
    rule: 'Add 1 each time (+1).',
    explanation: 'Real wooden balls placed on the table one-by-one: 1, 2, 3, 4, 5, 6. Each stage naturally adds 1 ball beside the previous ones.',
    videoSrc: '/videos/patterns/counting.mp4',
    videoTitle: 'Counting Numbers — Natural One-by-One Placement',
    predictQuestion: [1, 2, 3, 4],
    predictAnswers: [5, 6, 7],
    formula: 'aₙ = n'
  },
  {
    id: 'odd_numbers',
    title: 'Odd Numbers',
    emoji: '🔵',
    accentColor: '#2563eb',
    numbers: [1, 3, 5, 7, 9, 11, 13],
    sequenceDisplay: '1, 3, 5, 7, 9, 11, 13, ...',
    rule: 'Add 2 each time (leaves 1 unpaired).',
    explanation: 'Real objects grouped into pairs: 1, 3, 5, 7, 9. Notice that pairing always leaves exactly ONE solitary object without a partner!',
    videoSrc: '/videos/patterns/odd_numbers.mp4',
    videoTitle: 'Odd Numbers — Grouping in Pairs Leaves 1 Unpaired',
    predictQuestion: [1, 3, 5, 7],
    predictAnswers: [9, 11, 13],
    formula: 'aₙ = 2n - 1'
  },
  {
    id: 'even_numbers',
    title: 'Even Numbers',
    emoji: '👫',
    accentColor: '#dc2626',
    numbers: [2, 4, 6, 8, 10, 12, 14],
    sequenceDisplay: '2, 4, 6, 8, 10, 12, 14, ...',
    rule: 'Add 2 each time (forms complete pairs).',
    explanation: 'Class 6 school students standing neatly in pairs on the school ground: 2 students (1 pair), 4 students (2 pairs), 6 students (3 pairs), 8 students (4 pairs), 10 students (5 pairs). Every student has a partner!',
    videoSrc: '/videos/patterns/even_numbers.mp4',
    videoTitle: 'Even Numbers — Real Students Standing in Partner Pairs',
    predictQuestion: [2, 4, 6, 8],
    predictAnswers: [10, 12, 14],
    formula: 'aₙ = 2n'
  },
  {
    id: 'triangular',
    title: 'Triangular Numbers',
    emoji: '🔺',
    accentColor: '#059669',
    numbers: [1, 3, 6, 10, 15, 21, 28],
    sequenceDisplay: '1, 3, 6, 10, 15, 21, 28, ...',
    rule: 'Add one more row than previous (+2, +3, +4, +5...).',
    explanation: 'Real wooden balls arranged into equilateral triangle rows from an overhead camera: Row 1 (1), Row 2 (1+2=3), Row 3 (1+2+3=6), Row 4 (1+2+3+4=10), Row 5 (1+2+3+4+5=15).',
    videoSrc: '/videos/patterns/triangular.mp4',
    videoTitle: 'Triangular Numbers — Real Wooden Balls Layered in Triangles',
    predictQuestion: [1, 3, 6, 10],
    predictAnswers: [15, 21, 28],
    formula: 'Tₙ = n(n+1)/2'
  },
  {
    id: 'squares',
    title: 'Square Numbers',
    emoji: '🟨',
    accentColor: '#d97706',
    numbers: [1, 4, 9, 16, 25, 36, 49],
    sequenceDisplay: '1, 4, 9, 16, 25, 36, 49, ...',
    rule: 'Square numbers form equal rows and columns (n × n).',
    explanation: 'Hardwood floor tiles and blocks physically forming equal square arrangements: 1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=25.',
    videoSrc: '/videos/patterns/squares.mp4',
    videoTitle: 'Square Numbers — Floor Tiles & Blocks Forming Equal Square Grids',
    predictQuestion: [1, 4, 9, 16],
    predictAnswers: [25, 36, 49],
    formula: 'aₙ = n²'
  },
  {
    id: 'cubes',
    title: 'Cube Numbers',
    emoji: '🧊',
    accentColor: '#7c3aed',
    numbers: [1, 8, 27, 64, 125, 216],
    sequenceDisplay: '1, 8, 27, 64, 125, 216, ...',
    rule: 'Multiply a number by itself three times (n × n × n).',
    explanation: 'Real small wooden building blocks physically assembled into solid 3D cubes showing true height, width, and depth: 1³, 2³=8, 3³=27, 4³=64.',
    videoSrc: '/videos/patterns/cubes.mp4',
    videoTitle: 'Cube Numbers — Real 3D Physical Cube Structures with Depth',
    predictQuestion: [1, 8, 27],
    predictAnswers: [64, 125, 216],
    formula: 'aₙ = n³'
  },
  {
    id: 'virahanka',
    title: 'Virahānka Numbers',
    emoji: '🌀',
    accentColor: '#0284c7',
    numbers: [1, 2, 3, 5, 8, 13, 21],
    sequenceDisplay: '1, 2, 3, 5, 8, 13, 21, ...',
    rule: 'Add the previous two quantities to get the next quantity.',
    explanation: 'Two physical groups of objects slide together and combine: [1] + [2] → 3, then [2] + [3] → 5, then [3] + [5] → 8, then [5] + [8] → 13. The next number comes from the previous two combined!',
    videoSrc: '/videos/patterns/virahanka.mp4',
    videoTitle: 'Virahānka Numbers — Previous Two Physical Groups Combining',
    predictQuestion: [1, 2, 3, 5],
    predictAnswers: [8, 13, 21],
    formula: 'Fₙ = Fₙ₋₁ + Fₙ₋₂'
  },
  {
    id: 'powers_of_2',
    title: 'Powers of 2',
    emoji: '⚡',
    accentColor: '#db2777',
    numbers: [1, 2, 4, 8, 16, 32, 64],
    sequenceDisplay: '1, 2, 4, 8, 16, 32, 64, ...',
    rule: 'Multiply by 2 each time (doubles every step).',
    explanation: 'Physical stacks of objects visibly doubling at every stage: 1 → 2 → 4 → 8 → 16. The camera pulls back as the group expands.',
    videoSrc: '/videos/patterns/powers_of_2.mp4',
    videoTitle: 'Powers of 2 — Physical Quantities Doubling at Each Stage',
    predictQuestion: [1, 2, 4, 8],
    predictAnswers: [16, 32, 64],
    formula: 'aₙ = 2ⁿ⁻¹'
  },
  {
    id: 'powers_of_3',
    title: 'Powers of 3',
    emoji: '🌿',
    accentColor: '#0d9488',
    numbers: [1, 3, 9, 27, 81, 243, 729],
    sequenceDisplay: '1, 3, 9, 27, 81, 243, 729, ...',
    rule: 'Multiply by 3 each time (triples every step).',
    explanation: 'Physical objects arranged in clearly separated tripling clusters: 1 → 3 (one triad) → 9 (three triads) → 27 (nine triads). Each stage has 3 times the previous stage!',
    videoSrc: '/videos/patterns/powers_of_3.mp4',
    videoTitle: 'Powers of 3 — Physical Quantities Tripling into 3 Clusters',
    predictQuestion: [1, 3, 9],
    predictAnswers: [27, 81, 243],
    formula: 'aₙ = 3ⁿ⁻¹'
  }
];

export default function PatternsInNumbersExplore({ onClose, onCompleteNode }) {
  // Navigation Tabs: 'opening' | 'lab' | 'discover' | 'figure_it_out'
  const [activeTab, setActiveTab] = useState('opening');

  // Lab State
  const [activeSeqId, setActiveSeqId] = useState('counting');
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isAutoTour, setIsAutoTour] = useState(false);

  // Predict & Discover State
  const [predictSeqId, setPredictSeqId] = useState('even_numbers');
  const [userInputs, setUserInputs] = useState(['', '', '']);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);

  // Figure It Out State
  const [fioSeqId, setFioSeqId] = useState('triangular');
  const [fioInputs, setFioInputs] = useState(['', '', '']);
  const [fioRuleInput, setFioRuleInput] = useState('');
  const [fioSubmitted, setFioSubmitted] = useState(false);
  const [fioSuccess, setFioSuccess] = useState(false);

  const videoRef = useRef(null);
  const predictVideoRef = useRef(null);

  const currentSequence = SEQUENCES.find((s) => s.id === activeSeqId) || SEQUENCES[1];
  const currentPredictSeq = SEQUENCES.find((s) => s.id === predictSeqId) || SEQUENCES[3];
  const currentFioSeq = SEQUENCES.find((s) => s.id === fioSeqId) || SEQUENCES[4];

  // Auto-play video on category change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlayingVideo) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSequence.videoSrc, isPlayingVideo, activeTab]);

  // Auto-tour across sequences
  useEffect(() => {
    if (activeTab !== 'lab' || !isAutoTour) return;
    const interval = setInterval(() => {
      setActiveSeqId((prevId) => {
        const idx = SEQUENCES.findIndex((s) => s.id === prevId);
        const nextIdx = (idx + 1) % SEQUENCES.length;
        return SEQUENCES[nextIdx].id;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab, isAutoTour]);

  // Handle Predict & Discover Check
  const handleCheckPrediction = () => {
    const expected = currentPredictSeq.predictAnswers;
    const num0 = parseInt(userInputs[0].trim(), 10);
    const num1 = parseInt(userInputs[1].trim(), 10);
    const num2 = parseInt(userInputs[2].trim(), 10);

    if (num0 === expected[0] && num1 === expected[1] && num2 === expected[2]) {
      setIsCorrect(true);
      setShowError(false);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } else {
      setShowError(true);
      setIsCorrect(false);
    }
  };

  const handleResetPrediction = (seqId) => {
    setPredictSeqId(seqId);
    setUserInputs(['', '', '']);
    setIsCorrect(false);
    setShowError(false);
  };

  // Handle Figure It Out submission
  const handleCheckFio = () => {
    const expected = currentFioSeq.predictAnswers;
    const n0 = parseInt(fioInputs[0].trim(), 10);
    const n1 = parseInt(fioInputs[1].trim(), 10);
    const n2 = parseInt(fioInputs[2].trim(), 10);

    if (n0 === expected[0] && n1 === expected[1] && n2 === expected[2] && fioRuleInput.trim().length > 3) {
      setFioSuccess(true);
      setFioSubmitted(true);
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 }
      });
      if (onCompleteNode) onCompleteNode('1.2');
    } else {
      setFioSuccess(false);
      setFioSubmitted(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#faf7f2',
      fontFamily: '"Times New Roman", Times, Georgia, serif',
      boxSizing: 'border-box'
    }}>
      {/* ── TOP HEADER & NAVIGATION BAR ── */}
      <header style={{
        flexShrink: 0,
        width: '100%',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderBottom: '1.5px solid #e2d9c8',
        boxSizing: 'border-box',
        gap: '16px'
      }}>
        {/* Back Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: '#ffffff',
            border: '2px solid #94a3b8',
            borderRadius: '10px',
            fontSize: 'clamp(1.1rem, 1.25vw, 1.35rem)',
            fontWeight: 800,
            color: '#0f172a',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            fontFamily: '"Times New Roman", Times, Georgia, serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#d97706';
            e.currentTarget.style.color = '#d97706';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#94a3b8';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Main Journey</span>
        </button>

        {/* 4 Mode Switcher Tabs */}
        <nav style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
          {[
            { id: 'opening', label: '🏙️ 1. Patterns Are Everywhere' },
            { id: 'lab', label: '🔢 2. Number Pattern Lab' },
            { id: 'discover', label: '🔍 3. Predict & Discover' },
            { id: 'figure_it_out', label: '✍️ 4. Figure It Out' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 20px',
                  background: isActive
                    ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
                    : '#ffffff',
                  color: isActive ? '#ffffff' : '#0f172a',
                  border: `2px solid ${isActive ? '#92400e' : '#cbd5e1'}`,
                  borderRadius: '10px',
                  fontSize: 'clamp(1.1rem, 1.25vw, 1.35rem)',
                  fontWeight: 900,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? '0 3px 10px rgba(217, 119, 6, 0.35)' : 'none',
                  fontFamily: '"Times New Roman", Times, Georgia, serif'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <main style={{
        flex: 1,
        minHeight: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>

        {/* ═══════════════ TAB 1: OPENING EXPERIENCE ═══════════════ */}
        {activeTab === 'opening' && (
          <div style={{
            flex: '1 0 auto',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 24px 20px 24px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}>
              {/* LEFT: Realistic 3D Continuous Dusk Drive Car Animation */}
              <div style={{
                background: '#070b14',
                borderRadius: '16px',
                border: '2px solid #334155',
                boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: '440px',
                position: 'relative'
              }}>
                <div style={{
                  padding: '10px 18px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🚗</span>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.35rem, 1.55vw, 1.8rem)',
                      fontWeight: 900,
                      color: '#ffffff'
                    }}>
                      Real-World Dusk Drive — Equal-Step Fare Pattern
                    </h3>
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  minHeight: '260px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000000',
                  overflow: 'hidden'
                }}>
                  <DuskCarPatternCinema />
                </div>

                <div style={{
                  padding: '12px 18px',
                  background: 'linear-gradient(180deg, #0b1120 0%, #151e2e 100%)',
                  borderTop: '2px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>💡</span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.18rem, 1.35vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#f8fafc',
                    lineHeight: 1.4
                  }}>
                    <strong style={{ color: '#38bdf8' }}>Equal Steps in Everyday Life: </strong>
                    As the car travels along the road, kilometre markers pass at equal distances, and the taxi meter increases by the same fixed amount (+₹15) after every single kilometre.
                  </p>
                </div>
              </div>

              {/* RIGHT: High-Contrast Pedagogical Storyboard */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}>
                <div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    color: '#b45309',
                    background: '#fef3c7',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: '1.5px solid #f59e0b',
                    marginBottom: '8px'
                  }}>
                    Chapter 1.2 Introduction
                  </span>
                  <h1 style={{
                    margin: '0 0 10px 0',
                    fontSize: 'clamp(1.9rem, 2.3vw, 2.7rem)',
                    fontWeight: 900,
                    color: '#091124',
                    lineHeight: 1.15
                  }}>
                    Patterns Are Everywhere!
                  </h1>
                  <p style={{
                    margin: '0 0 14px 0',
                    fontSize: 'clamp(1.22rem, 1.38vw, 1.55rem)',
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1.45
                  }}>
                    “Among the most basic patterns that occur in mathematics are patterns of numbers, particularly patterns of whole numbers: 0, 1, 2, 3, 4, ...”
                  </p>
                  <div style={{
                    background: '#ffffff',
                    border: '2px solid #cbd5e1',
                    borderLeft: '8px solid #d97706',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                  }}>
                    <h3 style={{
                      margin: '0 0 6px 0',
                      fontSize: 'clamp(1.35rem, 1.5vw, 1.75rem)',
                      fontWeight: 900,
                      color: '#0f172a'
                    }}>
                      What is Number Theory?
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.28vw, 1.45rem)',
                      fontWeight: 700,
                      color: '#334155',
                      lineHeight: 1.4
                    }}>
                      The branch of Mathematics that studies patterns in whole numbers is called <strong>Number Theory</strong>. Number sequences are among the most basic and fascinating types of patterns that mathematicians study!
                    </p>
                  </div>
                </div>

                {/* Interactive Question Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  border: '2.5px solid #3b82f6',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  boxShadow: '0 6px 18px rgba(59, 130, 246, 0.15)'
                }}>
                  <h3 style={{
                    margin: '0 0 6px 0',
                    fontSize: 'clamp(1.4rem, 1.6vw, 1.85rem)',
                    fontWeight: 900,
                    color: '#1e3a8a'
                  }}>
                    ❓ Can You Spot the Pattern?
                  </h3>
                  <p style={{
                    margin: '0 0 14px 0',
                    fontSize: 'clamp(1.15rem, 1.28vw, 1.45rem)',
                    fontWeight: 700,
                    color: '#1e40af',
                    lineHeight: 1.35
                  }}>
                    Watch real educational tabletop clips where physical objects are placed, grouped, stacked, and arranged into mathematical sequences!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lab')}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: 'clamp(1.25rem, 1.4vw, 1.6rem)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                      fontFamily: '"Times New Roman", Times, Georgia, serif'
                    }}
                  >
                    <span>Enter Number Pattern Lab</span>
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 2: NUMBER PATTERN LAB ═══════════════ */}
        {activeTab === 'lab' && (
          <div style={{
            flex: '1 0 auto',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 22px 16px 22px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.28fr) minmax(0, 1fr)',
              gap: '20px',
              alignItems: 'stretch'
            }}>
              {/* LEFT: Cinematic Real-Life Video Theater */}
              <div style={{
                background: '#070b14',
                borderRadius: '16px',
                border: '2px solid #334155',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  padding: '10px 18px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.9rem', lineHeight: 1 }}>{currentSequence.emoji}</span>
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: 'clamp(1.35rem, 1.55vw, 1.85rem)',
                        fontWeight: 900,
                        color: '#ffffff'
                      }}>
                        {currentSequence.title} — Real-Life Physical Visual
                      </h3>
                      <span style={{ fontSize: '0.92rem', color: currentSequence.accentColor, fontWeight: 800 }}>
                        Formula: {currentSequence.formula}
                      </span>
                    </div>
                  </div>

                  {/* Auto Tour Control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setIsAutoTour(!isAutoTour)}
                      style={{
                        padding: '6px 14px',
                        background: isAutoTour ? 'rgba(245, 158, 11, 0.32)' : 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${isAutoTour ? '#fbbf24' : '#94a3b8'}`,
                        borderRadius: '8px',
                        color: isAutoTour ? '#fbbf24' : '#f1f5f9',
                        fontSize: '0.98rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={15} color={isAutoTour ? '#fbbf24' : '#cbd5e1'} />
                      <span>Auto Tour</span>
                    </button>
                  </div>
                </div>

                {/* Concept-Specific Real-World Visual & Physical Stage Studio */}
                <div style={{
                  flex: '1 1 auto',
                  minHeight: '280px',
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <PatternVisualCinema
                    mode="lab"
                    sequenceId={currentSequence.id}
                    videoSrc={currentSequence.videoSrc}
                    videoTitle={currentSequence.videoTitle}
                    accentColor={currentSequence.accentColor}
                  />
                </div>

                {/* Bottom Math Connection Banner */}
                <div style={{
                  padding: '12px 18px',
                  background: 'linear-gradient(180deg, #0b1120 0%, #151e2e 100%)',
                  borderTop: '2px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>💡</span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.2rem, 1.35vw, 1.55rem)',
                    fontWeight: 700,
                    color: '#f8fafc',
                    lineHeight: 1.4
                  }}>
                    <strong style={{ color: '#38bdf8' }}>Rule: </strong>
                    {currentSequence.rule}
                  </p>
                </div>
              </div>

              {/* RIGHT: Sequence Selection (10 Textbook Cards) */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div style={{ flexShrink: 0 }}>
                  <h2 style={{
                    margin: '0 0 4px 0',
                    fontSize: 'clamp(1.65rem, 1.95vw, 2.35rem)',
                    fontWeight: 900,
                    color: '#091124',
                    lineHeight: 1.2
                  }}>
                    10 Fundamental Sequences
                  </h2>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.15rem, 1.28vw, 1.45rem)',
                    fontWeight: 700,
                    color: '#1e293b'
                  }}>
                    Click any sequence to watch its real-life cinematic footage auto-play.
                  </p>
                </div>

                {/* Scrollable list of 10 cards */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flex: 1,
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}>
                  {SEQUENCES.map((seq) => {
                    const isSelected = activeSeqId === seq.id;
                    return (
                      <div
                        key={seq.id}
                        onClick={() => {
                          setActiveSeqId(seq.id);
                          setIsAutoTour(false);
                        }}
                        style={{
                          background: '#ffffff',
                          border: isSelected ? `2.5px solid ${seq.accentColor}` : '2px solid #cbd5e1',
                          borderLeft: isSelected ? `8px solid ${seq.accentColor}` : '3.5px solid #94a3b8',
                          borderRadius: '10px',
                          padding: '8px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '1.6rem' }}>{seq.emoji}</span>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h4 style={{
                                margin: 0,
                                fontSize: 'clamp(1.2rem, 1.35vw, 1.55rem)',
                                fontWeight: 900,
                                color: isSelected ? '#000000' : '#0f172a'
                              }}>
                                {seq.title}
                              </h4>
                              {isSelected && (
                                <span style={{
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  background: `${seq.accentColor}22`,
                                  color: seq.accentColor,
                                  padding: '2px 8px',
                                  borderRadius: '8px'
                                }}>
                                  Active Video
                                </span>
                              )}
                            </div>
                            <p style={{
                              margin: '2px 0 0 0',
                              fontSize: 'clamp(1.05rem, 1.18vw, 1.32rem)',
                              fontWeight: 700,
                              color: isSelected ? '#0f172a' : '#334155'
                            }}>
                              {seq.sequenceDisplay}
                            </p>
                          </div>
                        </div>
                        <span style={{
                          fontSize: '1.2rem',
                          color: isSelected ? seq.accentColor : '#94a3b8',
                          fontWeight: 900
                        }}>
                          ▶
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Takeaway Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  border: '2.5px solid #d97706',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.8rem' }}>💡</span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.18rem, 1.35vw, 1.55rem)',
                    fontWeight: 900,
                    color: '#78350f'
                  }}>
                    {currentSequence.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 3: PREDICT & DISCOVER ═══════════════ */}
        {activeTab === 'discover' && (
          <div style={{
            flex: '1 0 auto',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 24px 20px 24px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}>
              {/* LEFT: Real-life video player for active prediction */}
              <div style={{
                background: '#070b14',
                borderRadius: '16px',
                border: '2px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '380px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '10px 18px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.8rem' }}>{currentPredictSeq.emoji}</span>
                    <h3 style={{ margin: 0, fontSize: 'clamp(1.3rem, 1.5vw, 1.75rem)', fontWeight: 900, color: '#ffffff' }}>
                      {currentPredictSeq.title} — Real-World Scenario
                    </h3>
                  </div>
                  {isCorrect && (
                    <span style={{
                      background: '#059669',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontWeight: 900,
                      fontSize: '0.9rem'
                    }}>
                      ✓ Correct Prediction!
                    </span>
                  )}
                </div>

                <div style={{
                  flex: 1,
                  minHeight: '280px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <PatternVisualCinema
                    mode="predict"
                    sequenceId={currentPredictSeq.id}
                    accentColor={currentPredictSeq.accentColor}
                    isSolved={isCorrect}
                  />
                </div>

                <div style={{
                  padding: '12px 18px',
                  background: isCorrect ? 'linear-gradient(180deg, #064e3b 0%, #065f46 100%)' : 'linear-gradient(180deg, #0b1120 0%, #151e2e 100%)',
                  borderTop: `2px solid ${isCorrect ? '#34d399' : 'rgba(56, 189, 248, 0.4)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>{isCorrect ? '🎉' : '🔍'}</span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.18rem, 1.35vw, 1.52rem)',
                    fontWeight: 700,
                    color: '#f8fafc'
                  }}>
                    {isCorrect
                      ? `Discovered Rule: “${currentPredictSeq.rule}” — Exact continuation confirmed by the real physical arrangement!`
                      : 'Observe the sequence. Type the next three numbers to discover the rule!'}
                  </p>
                </div>
              </div>

              {/* RIGHT: Prediction Input Form */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                    {SEQUENCES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleResetPrediction(s.id)}
                        style={{
                          padding: '6px 12px',
                          background: predictSeqId === s.id ? s.accentColor : '#ffffff',
                          color: predictSeqId === s.id ? '#ffffff' : '#0f172a',
                          border: `1.5px solid ${s.accentColor}`,
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {s.emoji} {s.title}
                      </button>
                    ))}
                  </div>

                  <h2 style={{
                    margin: '12px 0 6px 0',
                    fontSize: 'clamp(1.65rem, 1.95vw, 2.35rem)',
                    fontWeight: 900,
                    color: '#091124'
                  }}>
                    Predict the Next 3 Numbers
                  </h2>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.15rem, 1.28vw, 1.45rem)',
                    fontWeight: 700,
                    color: '#1e293b'
                  }}>
                    Look at the sequence below and fill in the missing numbers:
                  </p>

                  {/* Sequence Row with 3 Input Boxes */}
                  <div style={{
                    background: '#ffffff',
                    border: '2.5px solid #cbd5e1',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    margin: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    {currentPredictSeq.predictQuestion.map((num, i) => (
                      <span key={i} style={{
                        fontSize: 'clamp(1.6rem, 2vw, 2.2rem)',
                        fontWeight: 900,
                        color: '#0f172a'
                      }}>
                        {num},
                      </span>
                    ))}

                    {/* 3 Answer Boxes */}
                    {[0, 1, 2].map((boxIdx) => (
                      <input
                        key={boxIdx}
                        type="number"
                        placeholder="?"
                        value={userInputs[boxIdx]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUserInputs((prev) => {
                            const updated = [...prev];
                            updated[boxIdx] = val;
                            return updated;
                          });
                        }}
                        style={{
                          width: '72px',
                          height: '54px',
                          textAlign: 'center',
                          fontSize: '1.8rem',
                          fontWeight: 900,
                          color: isCorrect ? '#065f46' : '#0f172a',
                          background: isCorrect ? '#d1fae5' : '#f8fafc',
                          border: `2.5px solid ${isCorrect ? '#10b981' : showError ? '#ef4444' : '#64748b'}`,
                          borderRadius: '10px',
                          outline: 'none',
                          fontFamily: '"Times New Roman", Times, Georgia, serif'
                        }}
                      />
                    ))}
                  </div>

                  {showError && (
                    <p style={{ color: '#dc2626', fontWeight: 800, fontSize: '1.2rem', margin: '6px 0' }}>
                      ⚠️ Not quite! Check the difference between consecutive numbers and try again.
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleCheckPrediction}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: 'clamp(1.25rem, 1.4vw, 1.6rem)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
                      fontFamily: '"Times New Roman", Times, Georgia, serif'
                    }}
                  >
                    <CheckCircle2 size={22} />
                    <span>Check Answer & Verify Rule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleResetPrediction(predictSeqId)}
                    style={{
                      padding: '12px 18px',
                      background: '#ffffff',
                      color: '#475569',
                      border: '2px solid #94a3b8',
                      borderRadius: '10px',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: '"Times New Roman", Times, Georgia, serif'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 4: FIGURE IT OUT ═══════════════ */}
        {activeTab === 'figure_it_out' && (
          <div style={{
            flex: '1 0 auto',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 24px 20px 24px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: '14px',
              padding: '18px 24px',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>✍️</span>
                <div>
                  <h1 style={{
                    margin: 0,
                    fontSize: 'clamp(1.75rem, 2.1vw, 2.5rem)',
                    fontWeight: 900,
                    color: '#091124'
                  }}>
                    Figure It Out: Class 6 Challenge
                  </h1>
                  <p style={{
                    margin: '4px 0 0 0',
                    fontSize: 'clamp(1.15rem, 1.28vw, 1.45rem)',
                    fontWeight: 700,
                    color: '#334155'
                  }}>
                    “Rewrite each sequence and write the next three numbers. Then write in your own words the rule for forming the numbers.”
                  </p>
                </div>
              </div>
            </div>

            {/* Sequence Selector Chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {SEQUENCES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setFioSeqId(s.id);
                    setFioInputs(['', '', '']);
                    setFioRuleInput('');
                    setFioSubmitted(false);
                    setFioSuccess(false);
                  }}
                  style={{
                    padding: '6px 14px',
                    background: fioSeqId === s.id ? '#d97706' : '#ffffff',
                    color: fioSeqId === s.id ? '#ffffff' : '#0f172a',
                    border: `2px solid ${fioSeqId === s.id ? '#b45309' : '#cbd5e1'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {s.emoji} {s.title}
                </button>
              ))}
            </div>

            {/* Selected Challenge Card */}
            <div style={{
              background: '#ffffff',
              border: '2.5px solid #cbd5e1',
              borderRadius: '14px',
              padding: '20px 24px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.6rem', fontWeight: 900, color: '#091124' }}>
                  Sequence: {currentFioSeq.title} ({currentFioSeq.sequenceDisplay})
                </h3>
                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#475569' }}>
                  Given numbers: <strong>{currentFioSeq.predictQuestion.join(', ')}, ...</strong>
                </p>
              </div>

              {/* Input for Next Three Numbers */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Write the next three numbers:
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[0, 1, 2].map((idx) => (
                    <input
                      key={idx}
                      type="number"
                      placeholder={`Next #${idx + 1}`}
                      value={fioInputs[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFioInputs((prev) => {
                          const u = [...prev];
                          u[idx] = val;
                          return u;
                        });
                      }}
                      style={{
                        width: '120px',
                        height: '52px',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        textAlign: 'center',
                        border: '2px solid #64748b',
                        borderRadius: '8px',
                        outline: 'none',
                        fontFamily: '"Times New Roman", Times, Georgia, serif'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Input for Rule */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Write in your own words the rule for forming these numbers:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Add 2 each time / multiply by 3 each step..."
                  value={fioRuleInput}
                  onChange={(e) => setFioRuleInput(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    padding: '0 16px',
                    border: '2px solid #64748b',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    fontFamily: '"Times New Roman", Times, Georgia, serif'
                  }}
                />
              </div>

              {/* Validation Feedback */}
              {fioSubmitted && (
                <div style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: fioSuccess ? '#d1fae5' : '#fee2e2',
                  border: `2px solid ${fioSuccess ? '#059669' : '#dc2626'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {fioSuccess ? <Award size={28} color="#059669" /> : <span>⚠️</span>}
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: fioSuccess ? '#065f46' : '#991b1b' }}>
                      {fioSuccess ? 'Outstanding Work!' : 'Check your numbers or rule!'}
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 700, color: fioSuccess ? '#047857' : '#7f1d1d' }}>
                      {fioSuccess
                        ? `Correct next numbers: ${currentFioSeq.predictAnswers.join(', ')}. Discovered Rule: “${currentFioSeq.rule}”`
                        : `Hint: The expected next three numbers are ${currentFioSeq.predictAnswers.join(', ')}. Be sure to describe the rule.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckFio}
                style={{
                  alignSelf: 'flex-start',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
                  fontFamily: '"Times New Roman", Times, Georgia, serif'
                }}
              >
                Submit My Rule & Numbers
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
