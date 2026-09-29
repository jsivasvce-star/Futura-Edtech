/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, Fragment } from 'react';
import {
  ChevronRight,
  X,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './pattern-lab.css';

// ── VISUAL PATTERN RULE OVERLAY (ARROWS & LABELS DIRECTLY ON SEQUENCE) ──
function PatternRuleOverlay({ concept, isSolved, cardPositions }) {
  const badgeBg = '#fef9c3'; // soft/light yellow
  const badgeBorder = '#f59e0b'; // golden yellow
  const badgeText = '#854d0e'; // dark golden/brown text for clear contrast
  const arrowColor = '#ec4899'; // pink/magenta curved arrows & arrowheads

  // Fallback if cards have not yet been measured
  const getPos = (i) => {
    if (cardPositions && cardPositions[i] && cardPositions[i].width > 0) {
      return cardPositions[i];
    }
    return {
      x: 102 + i * 216,
      y: 145,
      width: 204,
      height: 290
    };
  };

  const isVirahanka = concept.key === 'virahanka';

  if (isVirahanka) {
    // Virahanka: each number is formed by adding the previous two numbers
    // 1 + 2 -> 3, 2 + 3 -> 5, 3 + 5 -> 8, 5 + 8 -> 13, 8 + 13 -> 21
    // Final step into target (index 7): dual connecting arrows from 13 (index 5) and 21 (index 6) into ? (or 34)
    const prevSteps = [
      { from: 1, to: 2, label: '1 + 2 → 3' },
      { from: 2, to: 3, label: '2 + 3 → 5' },
      { from: 3, to: 4, label: '3 + 5 → 8' },
      { from: 4, to: 5, label: '5 + 8 → 13' },
      { from: 5, to: 6, label: '8 + 13 → 21' }
    ];

    const c5 = getPos(5);
    const c6 = getPos(6);
    const c7 = getPos(7);
    const cardH = c7.height || 260;
    const yCenter = c7.y || (cardH / 2);
    const yBase = yCenter - Math.min(52, cardH * 0.22);

    // Arrow 1 from 13 (index 5) to target (index 7)
    const startX_13 = c5.x + 28;
    const endX_7_a = c7.x - 28;
    const midX_13_7 = (startX_13 + endX_7_a) / 2;
    const peakY_13 = yCenter - Math.min(94, cardH * 0.38);
    const pathD_13 = `M ${startX_13} ${yBase} Q ${midX_13_7} ${peakY_13} ${endX_7_a} ${yBase - 6}`;

    // Arrow 2 from 21 (index 6) to target (index 7)
    const startX_21 = c6.x + 28;
    const endX_7_b = c7.x - 18;
    const midX_21_7 = (startX_21 + endX_7_b) / 2;
    const peakY_21 = yCenter - Math.min(72, cardH * 0.29);
    const pathD_21 = `M ${startX_21} ${yBase} Q ${midX_21_7} ${peakY_21} ${endX_7_b} ${yBase}`;

    const targetLabel = isSolved ? '13 + 21 = 34' : '13 + 21 → ?';

    return (
      <div className="pl-rule-overlay-layer" aria-hidden="true">
        <svg className="pl-rule-arrows-svg">
          <defs>
            <marker
              id={`ruleArrowhead-${concept.id}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={arrowColor} />
            </marker>
          </defs>

          {/* Previous progression arrows */}
          {prevSteps.map((step, idx) => {
            const pFrom = getPos(step.from);
            const pTo = getPos(step.to);
            const cardH = pTo.height || 260;
            const span = pTo.x - pFrom.x;
            const midX = (pFrom.x + pTo.x) / 2;
            const yMid = pTo.y || (cardH / 2);
            const yB = yMid - Math.min(52, cardH * 0.22);
            const yP = yMid - Math.min(76, cardH * 0.32);
            const sX = pFrom.x + Math.min(28, span * 0.16);
            const eX = pTo.x - Math.min(28, span * 0.16);
            const d = `M ${sX} ${yB} Q ${midX} ${yP} ${eX} ${yB}`;

            return (
              <path
                key={idx}
                d={d}
                fill="none"
                stroke={arrowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                markerEnd={`url(#ruleArrowhead-${concept.id})`}
                className="pl-rule-arrow-path"
              />
            );
          })}

          {/* Dual connecting arrows into target index 7 */}
          <path
            d={pathD_13}
            fill="none"
            stroke={arrowColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            markerEnd={`url(#ruleArrowhead-${concept.id})`}
            className="pl-rule-arrow-path"
          />
          <path
            d={pathD_21}
            fill="none"
            stroke={arrowColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            markerEnd={`url(#ruleArrowhead-${concept.id})`}
            className="pl-rule-arrow-path"
          />
        </svg>

        {/* Labels for previous steps */}
        {prevSteps.map((step, idx) => {
          const pFrom = getPos(step.from);
          const pTo = getPos(step.to);
          const cardH = pTo.height || 260;
          const midX = (pFrom.x + pTo.x) / 2;
          const yMid = pTo.y || (cardH / 2);
          const labelY = yMid - Math.min(88, cardH * 0.37);

          return (
            <div
              key={idx}
              className="pl-rule-indicator-label"
              style={{
                left: `${midX}px`,
                top: `${labelY}px`,
                borderColor: badgeBorder,
                color: badgeText,
                background: badgeBg
              }}
            >
              {step.label}
            </div>
          );
        })}

        {/* Target rule label directly above target number */}
        <div
          className={`pl-rule-indicator-label pl-rule-target-label ${isSolved ? 'is-solved' : ''}`}
          style={{
            left: `${c7.x}px`,
            top: `${yCenter - Math.min(108, cardH * 0.44)}px`,
            borderColor: badgeBorder,
            color: badgeText,
            background: badgeBg
          }}
        >
          {targetLabel}
        </div>
      </div>
    );
  }

  // Standard pairwise concepts (all 9 other concepts)
  let labels = [];
  switch (concept.key) {
    case 'all_ones':
      labels = ['same', 'same', 'same', 'same', 'same', 'same', 'same'];
      break;
    case 'counting':
      labels = ['+1', '+1', '+1', '+1', '+1', '+1', '+1'];
      break;
    case 'odd':
      labels = ['+2', '+2', '+2', '+2', '+2', '+2', '+2'];
      break;
    case 'even':
      labels = ['+2', '+2', '+2', '+2', '+2', '+2', '+2'];
      break;
    case 'triangular':
      labels = ['+2', '+3', '+4', '+5', '+6', '+7', '+8'];
      break;
    case 'square':
      labels = ['2²', '3²', '4²', '5²', '6²', '7²', '8²'];
      break;
    case 'cube':
      labels = ['2³', '3³', '4³', '5³', '6³', '7³', '8³'];
      break;
    case 'powers_of_2':
      labels = ['×2', '×2', '×2', '×2', '×2', '×2', '×2'];
      break;
    case 'powers_of_3':
      labels = ['×3', '×3', '×3', '×3', '×3', '×3', '×3'];
      break;
    default:
      labels = ['+1', '+1', '+1', '+1', '+1', '+1', '+1'];
  }

  return (
    <div className="pl-rule-overlay-layer" aria-hidden="true">
      <svg className="pl-rule-arrows-svg">
        <defs>
          <marker
            id={`ruleArrowhead-${concept.id}`}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={arrowColor} />
          </marker>
        </defs>

        {labels.map((_, i) => {
          const c1 = getPos(i);
          const c2 = getPos(i + 1);
          const cardH = c1.height || 260;
          const span = c2.x - c1.x;
          const midX = (c1.x + c2.x) / 2;
          const yCenter = c1.y || (cardH / 2);
          const yBase = yCenter - Math.min(52, cardH * 0.22);
          const yPeak = yCenter - Math.min(76, cardH * 0.32);
          const startX = c1.x + Math.min(28, span * 0.16);
          const endX = c2.x - Math.min(28, span * 0.16);
          const d = `M ${startX} ${yBase} Q ${midX} ${yPeak} ${endX} ${yBase}`;

          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={arrowColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              markerEnd={`url(#ruleArrowhead-${concept.id})`}
              className="pl-rule-arrow-path"
            />
          );
        })}
      </svg>

      {labels.map((label, i) => {
        const c1 = getPos(i);
        const c2 = getPos(i + 1);
        const cardH = c1.height || 260;
        const midX = (c1.x + c2.x) / 2;
        const yCenter = c1.y || (cardH / 2);
        const labelY = yCenter - Math.min(88, cardH * 0.37);
        const isLast = i === labels.length - 1;

        return (
          <div
            key={i}
            className={`pl-rule-indicator-label ${isLast && isSolved ? 'is-solved' : ''}`}
            style={{
              left: `${midX}px`,
              top: `${labelY}px`,
              borderColor: badgeBorder,
              color: badgeText,
              background: badgeBg
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

// ── THINKING CHILD ILLUSTRATION COMPONENT ──
function ThinkingChild() {
  return (
    <div className="pl-thinking-character-wrapper" aria-hidden="true">
      <img
        src="/assets/thinking_child.png"
        alt="Thinking student"
        className="pl-thinking-character-img"
        draggable={false}
      />
    </div>
  );
}

// ── 10 MASTER PATTERN SEQUENCES & INTERACTIVE QUESTION CONTENT ──
const CONCEPTS = [
  {
    id: 1,
    key: 'all_ones',
    title: 'All 1s',
    subtitle: 'A new position, same number',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 1, 1, 1, 1, 1, 1, 1],
    options: [1, 2, 0, 10],
    correctOption: 1,
    hint: 'Look carefully at the numbers. Does the value change from one position to the next?',
    nextLabel: 'Counting numbers',
    accentColor: '#38bdf8'
  },
  {
    id: 2,
    key: 'counting',
    title: 'Counting numbers',
    subtitle: 'Move forward, one number at a time.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 2, 3, 4, 5, 6, 7, 8],
    options: [8, 9, 6, 10],
    correctOption: 8,
    hint: 'Look at how the numbers increase. Each number is one more than the number before it.',
    nextLabel: 'Odd numbers',
    accentColor: '#10b981'
  },
  {
    id: 3,
    key: 'odd',
    title: 'Odd numbers',
    subtitle: 'Start with 1. Jump over every other number.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 3, 5, 7, 9, 11, 13, 15],
    options: [14, 15, 16, 17],
    correctOption: 15,
    hint: 'Look at the difference between consecutive numbers. The sequence increases by the same amount each time.',
    nextLabel: 'Even numbers',
    accentColor: '#f59e0b'
  },
  {
    id: 4,
    key: 'even',
    title: 'Even numbers',
    subtitle: 'Start with a pair. Add another pair.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [2, 4, 6, 8, 10, 12, 14, 16],
    options: [15, 16, 17, 18],
    correctOption: 16,
    hint: 'Look at how much is added each time. The numbers increase by 2.',
    nextLabel: 'Triangular numbers',
    accentColor: '#a855f7'
  },
  {
    id: 5,
    key: 'triangular',
    title: 'Triangular numbers',
    subtitle: 'The amount we add grows by one.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 3, 6, 10, 15, 21, 28, 36],
    options: [34, 35, 36, 38],
    correctOption: 36,
    hint: 'Look at the differences: 2, 3, 4, 5, 6, 7... What comes after adding 7?',
    nextLabel: 'Square numbers',
    accentColor: '#f43f5e'
  },
  {
    id: 6,
    key: 'square',
    title: 'Square numbers',
    subtitle: 'Multiply a counting number by itself.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 4, 9, 16, 25, 36, 49, 64],
    options: [56, 60, 64, 72],
    correctOption: 64,
    hint: 'Think of 1 × 1, 2 × 2, 3 × 3... What number comes from 8 × 8?',
    nextLabel: 'Cube numbers',
    accentColor: '#06b6d4'
  },
  {
    id: 7,
    key: 'cube',
    title: 'Cube numbers',
    subtitle: 'Use the same factor three times.',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 8, 27, 64, 125, 216, 343, 512],
    options: [343, 421, 512, 625],
    correctOption: 512,
    hint: 'Think of 1³, 2³, 3³, 4³... What is 8 × 8 × 8?',
    nextLabel: 'Virahānka numbers',
    accentColor: '#6366f1'
  },
  {
    id: 8,
    key: 'virahanka',
    title: 'Virahānka numbers',
    subtitle: 'Two neighbours make the next number.',
    sideBadge: 'a + b',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 2, 3, 5, 8, 13, 21, 34],
    options: [31, 32, 34, 35],
    correctOption: 34,
    hint: 'Look at how each number is made. Add the two numbers immediately before it.',
    nextLabel: 'Powers of 2',
    accentColor: '#eab308'
  },
  {
    id: 9,
    key: 'powers_of_2',
    title: 'Powers of 2',
    subtitle: 'Double the whole amount.',
    sideBadge: '× 2',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 2, 4, 8, 16, 32, 64, 128],
    options: [96, 112, 128, 132],
    correctOption: 128,
    hint: 'Each number is multiplied by 2 to get the next number.',
    nextLabel: 'Powers of 3',
    accentColor: '#0ea5e9'
  },
  {
    id: 10,
    key: 'powers_of_3',
    title: 'Powers of 3',
    subtitle: 'Three copies make the next term.',
    sideBadge: '× 3',
    totalTerms: 8,
    missingIndex: 7,
    terms: [1, 3, 9, 27, 81, 243, 729, 2187],
    options: [1458, 1620, 2187, 2430],
    correctOption: 2187,
    hint: 'Each number is multiplied by 3 to get the next number.',
    nextLabel: 'Activity Complete',
    accentColor: '#10b981'
  }
];

export default function PatternLabVideoExperience({ onClose, onCompleteNode }) {
  const [currentConceptIdx, setCurrentConceptIdx] = useState(0);
  
  // Concept attempts and answers state map: { [conceptId]: { isSolved, wrongAttempts, selectedOption, feedback } }
  const [conceptStateMap, setConceptStateMap] = useState({});

  const [completedConceptIds, setCompletedConceptIds] = useState([]);
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [showConceptMapModal, setShowConceptMapModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const concept = CONCEPTS[currentConceptIdx];
  const audioRef = useRef(null);
  const audioTimerRef = useRef(null);
  const explanationAudioRef = useRef(null);

  const [cardPositions, setCardPositions] = useState([]);
  const cardsRowRef = useRef(null);
  const cardRefs = useRef([]);

  const currentConceptState = conceptStateMap[concept.id] || {
    isSolved: false,
    wrongAttempts: 0,
    selectedOption: null,
    feedback: null
  };
  const isConceptSolved = currentConceptState.isSolved;
  const showVisualRule = isConceptSolved || (currentConceptState.wrongAttempts >= 2);

  // Measure card coordinates for overlay placement
  const updateCardPositions = () => {
    if (!cardsRowRef.current) return;
    const rowEl = cardsRowRef.current;
    const rowRect = rowEl.getBoundingClientRect();
    const positions = cardRefs.current.map((cardEl, i) => {
      if (!cardEl) {
        return { x: 102 + i * 216, y: 145, width: 204, height: 290 };
      }
      const rect = cardEl.getBoundingClientRect();
      return {
        x: rect.left - rowRect.left + rect.width / 2,
        y: rect.top - rowRect.top + rect.height / 2,
        top: rect.top - rowRect.top,
        left: rect.left - rowRect.left,
        width: rect.width,
        height: rect.height
      };
    });
    setCardPositions(positions);
  };

  useEffect(() => {
    updateCardPositions();
    const timer = setTimeout(updateCardPositions, 60);

    const handleResize = () => updateCardPositions();
    window.addEventListener('resize', handleResize);

    let observer;
    if (cardsRowRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateCardPositions();
      });
      observer.observe(cardsRowRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [currentConceptIdx, isConceptSolved]);

  // ── VOICE NARRATION PLAYBACK ──
  // Plays naturally once after the complete number sequence appears
  useEffect(() => {
    // Stop any previously playing narration
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (audioTimerRef.current) {
      clearTimeout(audioTimerRef.current);
      audioTimerRef.current = null;
    }

    let isCancelled = false;

    const playAudio = () => {
      if (isCancelled) return;
      const audioUrl = `/audio/patterns/concept${concept.id}.mp3`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const handleFirstInteraction = () => {
            if (!isCancelled && audioRef.current === audio) {
              audio.play().catch(() => {});
            }
            window.removeEventListener('pointerdown', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };
          window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
        });
      }
    };

    // Play naturally after the sequence appears on screen
    audioTimerRef.current = setTimeout(playAudio, 600);

    return () => {
      isCancelled = true;
      if (audioTimerRef.current) {
        clearTimeout(audioTimerRef.current);
        audioTimerRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [concept.id]);

  // Load a new sequence
  const loadConcept = (idx) => {
    if (explanationAudioRef.current) {
      explanationAudioRef.current.pause();
      explanationAudioRef.current.currentTime = 0;
      explanationAudioRef.current = null;
    }
    setCurrentConceptIdx(idx);
  };

  // Cleanup explanation audio on unmount
  useEffect(() => {
    return () => {
      if (explanationAudioRef.current) {
        explanationAudioRef.current.pause();
        explanationAudioRef.current.currentTime = 0;
        explanationAudioRef.current = null;
      }
    };
  }, []);

  // Answer option selection logic
  const handleSelectAnswer = (opt) => {
    if (isConceptSolved) return; // Sequence already completed

    // Immediately stop the currently playing page-opening voice on any answer click
    if (audioTimerRef.current) {
      clearTimeout(audioTimerRef.current);
      audioTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (opt === concept.correctOption) {
      setConceptStateMap(prev => ({
        ...prev,
        [concept.id]: {
          ...prev[concept.id],
          isSolved: true,
          selectedOption: opt,
          feedback: 'correct'
        }
      }));

      // Add to completed concepts
      if (!completedConceptIds.includes(concept.id)) {
        setCompletedConceptIds(prev => [...prev, concept.id]);
      }

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });

      // ── AUDIO SYSTEM 2: Play NEW explanatory voice ONLY on correct answer ──
      // (Completely separate from existing page-opening voice in audioRef; leaves audioRef undisturbed)
      try {
        if (explanationAudioRef.current) {
          explanationAudioRef.current.pause();
          explanationAudioRef.current.currentTime = 0;
          explanationAudioRef.current = null;
        }
        const expAudio = new Audio(`/audio/patterns/explanation_concept${concept.id}.mp3`);
        explanationAudioRef.current = expAudio;
        expAudio.play().catch(() => {});
      } catch (err) {
        console.warn('Explanatory audio play error:', err);
      }
    } else {
      const currentWrong = currentConceptState.wrongAttempts || 0;
      const newWrongCount = currentWrong + 1;
      setConceptStateMap(prev => ({
        ...prev,
        [concept.id]: {
          ...prev[concept.id],
          wrongAttempts: newWrongCount,
          selectedOption: opt,
          feedback: 'wrong'
        }
      }));
    }
  };

  // Advance to next sequence
  const handleNextConcept = () => {
    if (currentConceptIdx < CONCEPTS.length - 1) {
      loadConcept(currentConceptIdx + 1);
    } else {
      // Completed all 10 concepts
      if (onCompleteNode) {
        onCompleteNode('1.2');
      }
      if (onClose) {
        onClose();
      }
    }
  };

  const handlePrevConcept = () => {
    if (currentConceptIdx > 0) {
      loadConcept(currentConceptIdx - 1);
    }
  };

  return (
    <div className="pattern-lab-root" id="pattern-lab-experience-root">
      {/* ── CREAMY-WHITE AMBIENT BACKGROUND LAYER ── */}
      <div className="pattern-lab-bg-layer" />
      <div className="pattern-lab-bg-overlay" />

      {/* ── MAIN INTERFACE FRAME ── */}
      <div className="pattern-lab-frame">
        {/* Top-Center "Back to Map" Navigation Button */}
        <button
          type="button"
          className="pl-top-back-btn"
          onClick={onClose}
          aria-label="Back to Map"
        >
          <ArrowLeft size={16} />
          <span>Back to Map</span>
        </button>

        {/* 2. BODY WORKSPACE */}
        <main className="pl-body">

          {/* Top Info Container */}
          <div className="pl-top-area">
            {/* Concept Header */}
            <div className="pl-concept-header">
              <div className="pl-concept-info">
                <div className="pl-concept-tag">
                  <span>Number Patterns 1.2</span>
                  <span className="pl-tag-divider">·</span>
                  <span>Concept {String(concept.id).padStart(2, '0')}/{CONCEPTS.length}</span>
                </div>
                <h1 className="pl-concept-title">{concept.title}</h1>
                <p className="pl-concept-subtitle">{concept.subtitle}</p>
              </div>

              {concept.sideBadge && (
                <div className="pl-concept-side-badge">
                  {concept.sideBadge}
                </div>
              )}
            </div>
          </div>

          {/* 3. NUMBER PATTERN CARDS ROW (PROMINENT CENTERED HERO SEQUENCE) */}
          <div className="pl-cards-row-container">
            <div className="pl-cards-row" ref={cardsRowRef} style={{ position: 'relative' }}>
              {showVisualRule && (
                <PatternRuleOverlay
                  concept={concept}
                  isSolved={isConceptSolved}
                  cardPositions={cardPositions}
                />
              )}
              {Array.from({ length: 8 }).map((_, i) => {
                const isTarget = i === concept.missingIndex;
                const isRevealed = isTarget ? isConceptSolved : true;
                const termVal = isTarget
                  ? (isConceptSolved ? concept.terms[i] : '?')
                  : concept.terms[i];
                const isLongVal = String(termVal).length >= 4;

                return (
                  <div
                    key={i}
                    ref={el => (cardRefs.current[i] = el)}
                    className={`pl-term-card ${isRevealed ? 'revealed' : 'locked-target'}`}
                  >
                    <div
                      className={`pl-card-number-val ${!isRevealed ? 'question-mark' : ''} ${isLongVal ? 'long-term' : ''} ${isTarget && isConceptSolved ? 'just-revealed' : ''}`}
                    >
                      {termVal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. INTERACTIVE QUESTION AREA (FITS EXACT 248 PX EMPTY SPACE) */}
          <div className="pl-common-activity-box pl-interactive-question-box">
            {/* Thinking child + thought bubble ("What number should come next?") */}
            <div className="pl-question-hero">
              <ThinkingChild />
              <div className="pl-thought-bubble-container">
                <div className="pl-thought-bubble">
                  <span className="pl-thought-text">
                    What number should<br />come next?
                  </span>
                </div>
                <div className="pl-thought-trail" aria-hidden="true">
                  <div className="pl-trail-dot-1" />
                  <div className="pl-trail-dot-2" />
                </div>
              </div>
            </div>

            {/* Multiple Choice Options */}
            <div className="pl-options-row">
              {concept.options.map((opt) => {
                const isSelected = currentConceptState.selectedOption === opt;
                const isCorrect = isConceptSolved && isSelected;
                const isWrong = isSelected && !isConceptSolved;

                return (
                  <button
                    key={opt}
                    type="button"
                    className={`pl-next-option-btn ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => handleSelectAnswer(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Interactive Feedback / Revealed Complete Sequence Below Options */}
            <div className="pl-feedback-area">
              {!isConceptSolved && currentConceptState.wrongAttempts > 0 && (
                <div className="pl-feedback-wrong">
                  <span>Try again!</span>
                </div>
              )}
              {isConceptSolved && (
                <div className="pl-revealed-sequence-strip" role="status" aria-label="Completed number sequence">
                  {concept.terms.map((term, idx) => {
                    const isNewlyRevealed = idx === concept.missingIndex;
                    return (
                      <Fragment key={idx}>
                        <span className={`pl-seq-strip-num ${isNewlyRevealed ? 'is-emphasized' : ''}`}>
                          {term}
                        </span>
                        {idx < concept.terms.length - 1 && (
                          <span className="pl-seq-strip-arrow" aria-hidden="true">→</span>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </main>

        {/* 5. FOOTER PROGRESS & STEPPER */}
        <footer className="pl-footer">
          <div className="pl-footer-left">
            {currentConceptIdx === 0 ? (
              <button
                type="button"
                className="pl-chapter-flow-btn"
                onClick={onClose}
              >
                <span>Activity 1.1</span>
              </button>
            ) : (
              <button
                type="button"
                className="pl-prev-btn"
                onClick={handlePrevConcept}
              >
                <span>← Previous concept</span>
              </button>
            )}
          </div>

          <div className="pl-footer-center">
            <div className="pl-pagination-dots">
              {CONCEPTS.map((c, idx) => {
                const isCurrent = idx === currentConceptIdx;
                const isCompleted = completedConceptIds.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`pl-dot ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => loadConcept(idx)}
                    title={`Jump to ${c.title}`}
                  />
                );
              })}
            </div>
            <span className="pl-discoveries-counter">
              {completedConceptIds.length} / {CONCEPTS.length} discoveries
            </span>
          </div>

          <div className="pl-footer-right">
            <button
              type="button"
              className="pl-next-btn"
              onClick={handleNextConcept}
            >
              <span>Next: {concept.nextLabel}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>

      </div>

      {/* ── MODAL 1: CONCEPT MAP MODAL ── */}
      {showConceptMapModal && (
        <div className="pl-modal-backdrop" onClick={() => setShowConceptMapModal(false)}>
          <div className="pl-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pl-modal-header">
              <h2 className="pl-modal-title">Concept Map — 1.2 Number Patterns</h2>
              <button type="button" className="pl-modal-close-btn" onClick={() => setShowConceptMapModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="pl-modal-content">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                {CONCEPTS.map((c, idx) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      loadConcept(idx);
                      setShowConceptMapModal(false);
                    }}
                    style={{
                      background: idx === currentConceptIdx ? '#e0f2fe' : '#f8fafc',
                      border: `1.5px solid ${idx === currentConceptIdx ? '#0284c7' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 800 }}>CONCEPT {String(c.id).padStart(2, '0')}</div>
                    <h4 style={{ margin: '4px 0 6px 0', fontSize: '1.05rem', color: '#0f172a' }}>{c.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569' }}>{c.subtitle}</p>
                    <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                      {completedConceptIds.includes(c.id) ? '✓ Discovered' : '○ Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: CLASSROOM PRESENTATION MODAL ── */}
      {showClassroomModal && (
        <div className="pl-modal-backdrop" onClick={() => setShowClassroomModal(false)}>
          <div className="pl-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pl-modal-header">
              <h2 className="pl-modal-title">Classroom View — Pedagogical Notes</h2>
              <button type="button" className="pl-modal-close-btn" onClick={() => setShowClassroomModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="pl-modal-content">
              <h3 style={{ color: '#0284c7', margin: '0 0 8px 0' }}>Ganita Prakash Grade 6 · Chapter 1</h3>
              <p style={{ color: '#334155', lineHeight: 1.6 }}>
                Number sequences build the foundation of algebra and pattern recognition. In this digital laboratory,
                students discover arithmetic progressions, geometric doubling, triangular summations, square and cube powers,
                and Fibonacci (Virahānka) recursion through progressive term revelation and interactive prediction checkpoints.
              </p>
              <div style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
                <strong style={{ color: '#0f172a' }}>Teaching Tip:</strong> <span style={{ color: '#334155' }}>Encourage students to observe the rate of change
                and gap distances between successive terms before predicting the next term.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: HELP MODAL ── */}
      {showHelpModal && (
        <div className="pl-modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="pl-modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="pl-modal-header">
              <h2 className="pl-modal-title">Pattern Lab Quick Guide</h2>
              <button type="button" className="pl-modal-close-btn" onClick={() => setShowHelpModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="pl-modal-content" style={{ color: '#334155', lineHeight: 1.6, fontSize: '0.9rem' }}>
              <p>• <strong>Step 1: Watch the Pattern</strong>: Observe how each term changes across positions.</p>
              <p>• <strong>Step 2: Learning Checkpoint</strong>: Find the missing number by selecting the correct option.</p>
              <p>• <strong>Step 3: Correct Answer & Explanation</strong>: See the rule and proceed with &ldquo;See why it works &rarr;&rdquo;.</p>
              <p>• <strong>Step 4: Concept Discovered</strong>: Learn the discovered concept and replay or advance to the next pattern.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
