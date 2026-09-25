/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  CheckCircle,
  ChevronRight,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './pattern-lab.css';

// ── 10 MASTER PATTERN SEQUENCES & 4-STEP LEARNING CONTENT ──
const CONCEPTS = [
  {
    id: 1,
    key: 'all_ones',
    title: 'All 1s',
    subtitle: 'A new position, same number',
    totalTerms: 8,
    terms: [1, 1, 1, 1, 1, 1, 1, 1],
    sublabels: ['', '', '', '', '', '', '', ''],
    connectors: [],
    watchInstruction: 'Watch how the numbers change from term to term. Follow the positions — does the value ever change?',
    question: 'What is the next number?',
    sequenceClue: '1, 1, 1, 1, 1, 1, 1, ?',
    options: [1, 2, 8],
    correctOption: 1,
    explanation: '1 stays 1, however far the sequence continues. Every term has the exact same value.',
    discoveredConcept: 'All 1s',
    completeSequence: '1, 1, 1, 1, 1, 1, 1, 1',
    discoveredRule: 'Every term is 1. Moving to a new position does not change the value.',
    nextLabel: 'Counting numbers',
    accentColor: '#38bdf8'
  },
  {
    id: 2,
    key: 'counting',
    title: 'Counting numbers',
    subtitle: 'Move forward, one number at a time.',
    totalTerms: 8,
    terms: [1, 2, 3, 4, 5, 6, 7, 8],
    sublabels: ['Position 1', 'Position 2', 'Position 3', 'Position 4', 'Position 5', 'Position 6', 'Position 7', 'Position 8'],
    connectors: [],
    watchInstruction: 'Watch how each number grows. Observe the gap between each pair of neighbours.',
    question: 'What is the next number?',
    sequenceClue: '1, 2, 3, 4, 5, 6, 7, ?',
    options: [7, 8, 9],
    correctOption: 8,
    explanation: 'Start at 1 and add 1 each time. 7 + 1 = 8: one more at every step.',
    discoveredConcept: 'Counting numbers',
    completeSequence: '1, 2, 3, 4, 5, 6, 7, 8',
    discoveredRule: 'The counting sequence starts 1, 2, 3... Each term increases by 1 at every step.',
    nextLabel: 'Odd numbers',
    accentColor: '#10b981'
  },
  {
    id: 3,
    key: 'odd',
    title: 'Odd numbers',
    subtitle: 'Start with 1. Jump over every other number.',
    totalTerms: 8,
    terms: [1, 3, 5, 7, 9, 11, 13, 15],
    sublabels: ['2 × 1 - 1', '2 × 2 - 1', '2 × 3 - 1', '2 × 4 - 1', '2 × 5 - 1', '2 × 6 - 1', '2 × 7 - 1', '2 × 8 - 1'],
    connectors: [],
    watchInstruction: 'Watch how the numbers change from term to term. The jumps stay the same even as the numbers get larger.',
    question: 'What is the next number?',
    sequenceClue: '1, 3, 5, 7, 9, 11, 13, ?',
    options: [14, 15, 16],
    correctOption: 15,
    explanation: 'Start at 1. Repeated jumps of +2 keep the numbers odd: 13 + 2 = 15.',
    discoveredConcept: 'Odd numbers',
    completeSequence: '1, 3, 5, 7, 9, 11, 13, 15',
    discoveredRule: 'Each term increases by 2. These are consecutive odd numbers.',
    nextLabel: 'Even numbers',
    accentColor: '#f59e0b'
  },
  {
    id: 4,
    key: 'even',
    title: 'Even numbers',
    subtitle: 'Start with a pair. Add another pair.',
    totalTerms: 8,
    terms: [2, 4, 6, 8, 10, 12, 14, 16],
    sublabels: ['2 × 1', '2 × 2', '2 × 3', '2 × 4', '2 × 5', '2 × 6', '2 × 7', '2 × 8'],
    connectors: [],
    watchInstruction: 'Watch how each pair appears. Compare this sequence with the odd numbers.',
    question: 'What is the next number?',
    sequenceClue: '2, 4, 6, 8, 10, 12, 14, ?',
    options: [15, 16, 18],
    correctOption: 16,
    explanation: 'Start at 2 and add 2 at every step: 14 + 2 = 16.',
    discoveredConcept: 'Even numbers',
    completeSequence: '2, 4, 6, 8, 10, 12, 14, 16',
    discoveredRule: 'Each term is a whole number of pairs: 2, 4, 6, 8... The gap between neighbours is always 2.',
    nextLabel: 'Triangular numbers',
    accentColor: '#a855f7'
  },
  {
    id: 5,
    key: 'triangular',
    title: 'Triangular numbers',
    subtitle: 'The amount we add grows by one.',
    totalTerms: 8,
    terms: [1, 3, 6, 10, 15, 21, 28, 36],
    sublabels: ['1', '1 + 2', '1 + ... + 3', '1 + ... + 4', '1 + ... + 5', '1 + ... + 6', '1 + ... + 7', '1 + ... + 8'],
    connectors: [],
    watchInstruction: 'Look at the jumps: +2, +3, +4, +5, +6, +7. Notice how the added step increases by 1 each time.',
    question: 'What is the next number?',
    sequenceClue: '1, 3, 6, 10, 15, 21, 28, ?',
    options: [35, 36, 37],
    correctOption: 36,
    explanation: 'The added amount grows by 1 (+2, +3, +4, +5, +6, +7, +8). 28 + 8 = 36.',
    discoveredConcept: 'Triangular numbers',
    completeSequence: '1, 3, 6, 10, 15, 21, 28, 36',
    discoveredRule: 'Each new triangle gains a row with one more dot: +2, +3, +4, +5, +6, +7, +8...',
    nextLabel: 'Square numbers',
    accentColor: '#f43f5e'
  },
  {
    id: 6,
    key: 'square',
    title: 'Square numbers',
    subtitle: 'Multiply a counting number by itself.',
    totalTerms: 8,
    terms: [1, 4, 9, 16, 25, 36, 49, 64],
    sublabels: ['1 × 1', '2 × 2', '3 × 3', '4 × 4', '5 × 5', '6 × 6', '7 × 7', '8 × 8'],
    connectors: [],
    watchInstruction: 'Read the multiplication beneath each number. Equal factors make squares.',
    question: 'What is the next number?',
    sequenceClue: '1, 4, 9, 16, 25, 36, 49, ?',
    options: [56, 64, 72],
    correctOption: 64,
    explanation: 'The 8th term is 8 × 8 = 64 (or 49 + 15 = 64). Equal factors make squares.',
    discoveredConcept: 'Square numbers',
    completeSequence: '1, 4, 9, 16, 25, 36, 49, 64',
    discoveredRule: 'The nth square number is n × n. Adding consecutive odd numbers (+3, +5, +7, +9...) produces the squares.',
    nextLabel: 'Cube numbers',
    accentColor: '#06b6d4'
  },
  {
    id: 7,
    key: 'cube',
    title: 'Cube numbers',
    subtitle: 'Use the same factor three times.',
    totalTerms: 7,
    terms: [1, 8, 27, 64, 125, 216, 343],
    sublabels: ['1 × 1 × 1', '2 × 2 × 2', '3 × 3 × 3', '4 × 4 × 4', '5 × 5 × 5', '6 × 6 × 6', '7 × 7 × 7'],
    connectors: [],
    watchInstruction: 'Length, width, and height all grow together using the same factor three times (n³).',
    question: 'What is the next number?',
    sequenceClue: '1, 8, 27, 64, 125, 216, ?',
    options: [216, 343, 512],
    correctOption: 343,
    explanation: 'Term 7 uses the factor 7 three times: 7 × 7 × 7 = 343.',
    discoveredConcept: 'Cube numbers',
    completeSequence: '1, 8, 27, 64, 125, 216, 343',
    discoveredRule: 'A cube of side n has n × n × n unit cubes (n³). 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343.',
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
    terms: [1, 2, 3, 5, 8, 13, 21, 34],
    sublabels: ['Starting term', 'Starting term', '1 + 2', '2 + 3', '3 + 5', '5 + 8', '8 + 13', '13 + 21'],
    connectors: [],
    watchInstruction: 'After 1 and 2, add the previous two terms to make the next: 1+2=3, 2+3=5, 3+5=8...',
    question: 'What is the next number?',
    sequenceClue: '1, 2, 3, 5, 8, 13, 21, ?',
    options: [29, 34, 42],
    correctOption: 34,
    explanation: 'Add the two previous neighbours: 13 + 21 = 34.',
    discoveredConcept: 'Virahānka (Fibonacci) numbers',
    completeSequence: '1, 2, 3, 5, 8, 13, 21, 34',
    discoveredRule: 'Start with 1 and 2. Every subsequent term is the sum of its two preceding neighbours.',
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
    terms: [1, 2, 4, 8, 16, 32, 64, 128],
    sublabels: ['2⁰', '2¹', '2²', '2³', '2⁴', '2⁵', '2⁶', '2⁷'],
    connectors: [],
    watchInstruction: 'A constant multiplier causes rapid doubling. Two copies make the next term.',
    question: 'What is the next number?',
    sequenceClue: '1, 2, 4, 8, 16, 32, 64, ?',
    options: [96, 128, 256],
    correctOption: 128,
    explanation: 'Multiply the previous term by 2: 64 × 2 = 128. The whole amount doubles each time.',
    discoveredConcept: 'Powers of 2',
    completeSequence: '1, 2, 4, 8, 16, 32, 64, 128',
    discoveredRule: 'The rule is repeated multiplication by 2 (2ⁿ). Each step doubles the previous amount.',
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
    terms: [1, 3, 9, 27, 81, 243, 729, 2187],
    sublabels: ['3⁰', '3¹', '3²', '3³', '3⁴', '3⁵', '3⁶', '3⁷'],
    connectors: [],
    watchInstruction: 'Follow the repeated ×3 link between neighbours. Three copies triple the amount each step.',
    question: 'What is the next number?',
    sequenceClue: '1, 3, 9, 27, 81, 243, 729, ?',
    options: [1458, 2187, 6561],
    correctOption: 2187,
    explanation: 'Start at 1. Triple the previous number each time: 729 × 3 = 2187.',
    discoveredConcept: 'Powers of 3',
    completeSequence: '1, 3, 9, 27, 81, 243, 729, 2187',
    discoveredRule: 'Repeated multiplication by 3 (3ⁿ). Consecutive terms grow by a factor of 3.',
    nextLabel: 'Activity Complete',
    accentColor: '#10b981'
  }
];

export default function PatternLabVideoExperience({ onClose, onCompleteNode }) {
  const [currentConceptIdx, setCurrentConceptIdx] = useState(0);
  
  // ── 4-STEP LEARNING FLOW STATE ──
  // 1: WATCH THE PATTERN
  // 2: LEARNING CHECKPOINT (QUESTION)
  // 3: CORRECT ANSWER + EXPLANATION
  // 4: CONCEPT DISCOVERED
  const [learningStep, setLearningStep] = useState(1);

  const [revealedCount, setRevealedCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wrongOption, setWrongOption] = useState(null);
  const [completedConceptIds, setCompletedConceptIds] = useState([]);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [showConceptMapModal, setShowConceptMapModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const concept = CONCEPTS[currentConceptIdx];
  const maxQuestionIndex = concept.totalTerms; // 8 or 7
  const timerRef = useRef(null);

  // Auto-progression in Step 1 (Watch mode)
  useEffect(() => {
    if (learningStep === 1 && isPlaying) {
      if (revealedCount < maxQuestionIndex - 1) {
        timerRef.current = setTimeout(() => {
          setRevealedCount(prev => prev + 1);
        }, 1200);
      } else {
        // Reached end of watchable terms before checkpoint
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [learningStep, isPlaying, revealedCount, maxQuestionIndex]);

  // Load a new sequence
  const loadConcept = (idx) => {
    setCurrentConceptIdx(idx);
    setLearningStep(1);
    setRevealedCount(1);
    setIsPlaying(true);
    setSelectedOption(null);
    setWrongOption(null);
  };

  // Replay current concept from Step 1
  const handleReplay = () => {
    setLearningStep(1);
    setRevealedCount(1);
    setIsPlaying(true);
    setSelectedOption(null);
    setWrongOption(null);
  };

  // Transition from Step 1 -> Step 2
  const handleStartCheckpoint = () => {
    setIsPlaying(false);
    setRevealedCount(maxQuestionIndex - 1);
    setLearningStep(2);
    setSelectedOption(null);
    setWrongOption(null);
  };

  // Step 2: Answer option click
  const handleOptionClick = (opt) => {
    if (learningStep >= 3) return;

    if (opt === concept.correctOption) {
      setSelectedOption(opt);
      setWrongOption(null);
      // Reveal the target card (e.g. 8th term)
      setRevealedCount(maxQuestionIndex);
      // Advance to Step 3: Correct Answer / Explanation
      setLearningStep(3);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 }
      });
    } else {
      setWrongOption(opt);
      setTimeout(() => setWrongOption(null), 750);
    }
  };

  // Step 3 -> Step 4 Transition
  // CRITICAL: Absolutely NO alert(), NO new window, strictly in-page transition!
  const handleSeeWhy = () => {
    setLearningStep(4);
    
    // Register concept completion & animate score
    if (!completedConceptIds.includes(concept.id)) {
      setCompletedConceptIds(prev => [...prev, concept.id]);
      setScoreAnimation(true);
      setTimeout(() => setScoreAnimation(false), 1400);
    }
  };

  // Step 4: Advance to next sequence
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
            <div className="pl-cards-row">
              {Array.from({ length: maxQuestionIndex }).map((_, i) => {
                const isRevealed = i < revealedCount;
                const termVal = isRevealed ? concept.terms[i] : '?';
                const isLongVal = String(termVal).length >= 4;

                return (
                  <div
                    key={i}
                    className={`pl-term-card ${isRevealed ? 'revealed' : 'locked-target'}`}
                    style={{
                      borderColor: isRevealed ? concept.accentColor : '#cbd5e1',
                      boxShadow: isRevealed ? `0 12px 32px ${concept.accentColor}35, 0 3px 8px rgba(0,0,0,0.05)` : 'none'
                    }}
                  >
                    <div className={`pl-card-number-val ${!isRevealed ? 'question-mark' : ''} ${isLongVal ? 'long-term' : ''}`}>
                      {termVal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. ONE LARGE COMMON ACTIVITY BOX (FIXED 1600 × 430 PX ACROSS ALL 4 STAGES) */}
          <div className="pl-common-activity-box">
            
            {/* ── STAGE 1: WATCH THE PATTERN ── */}
            {learningStep === 1 && (
              <div className="pl-stage-content pl-stage-watch">
                <div className="pl-stage-eyebrow">WATCH THE PATTERN</div>
                <h3 className="pl-stage-title">What changes from picture to picture?</h3>
                <p className="pl-stage-instruction">{concept.watchInstruction}</p>
                <button
                  type="button"
                  className="pl-watch-try-btn"
                  onClick={handleStartCheckpoint}
                >
                  <span>I'm ready. Let me try →</span>
                </button>
              </div>
            )}

            {/* ── STAGE 2: LEARNING CHECKPOINT ── */}
            {learningStep === 2 && (
              <div className="pl-stage-content pl-stage-checkpoint-layout">
                <div className="pl-stage-left">
                  <span className="pl-stage-eyebrow">LEARNING CHECKPOINT</span>
                  <h3 className="pl-checkpoint-question">{concept.question}</h3>
                  <div className="pl-checkpoint-seq-clue">{concept.sequenceClue}</div>
                </div>

                <div className="pl-stage-right">
                  <div className="pl-checkpoint-options">
                    {concept.options.map((opt) => {
                      const isWrong = wrongOption === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pl-option-btn ${isWrong ? 'wrong' : ''}`}
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── STAGE 3: CORRECT ANSWER / EXPLANATION ── */}
            {learningStep === 3 && (
              <div className="pl-stage-content pl-stage-checkpoint-layout stage-3-answered">
                <div className="pl-stage-left">
                  <span className="pl-stage-eyebrow">LEARNING CHECKPOINT</span>
                  <h3 className="pl-checkpoint-question">{concept.question}</h3>
                  <div className="pl-checkpoint-seq-clue">{concept.sequenceClue}</div>
                  <div className="pl-checkpoint-feedback-note">
                    <CheckCircle size={18} color="#10b981" />
                    <span>{concept.explanation}</span>
                  </div>
                </div>

                <div className="pl-stage-right pl-stage-right-actions">
                  <div className="pl-checkpoint-options">
                    {concept.options.map((opt) => {
                      const isCorrect = opt === concept.correctOption;
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pl-option-btn ${isCorrect ? 'correct' : ''}`}
                          disabled
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    type="button"
                    className="pl-see-why-btn"
                    onClick={handleSeeWhy}
                  >
                    <span>See why it works →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STAGE 4: CONCEPT DISCOVERED ── */}
            {learningStep === 4 && (
              <div className="pl-stage-content pl-stage-discovered">
                <div className="pl-discovered-tag">
                  <CheckCircle size={18} />
                  <span>CONCEPT DISCOVERED</span>
                </div>
                <h3 className="pl-discovered-heading">{concept.discoveredConcept}</h3>
                <div className="pl-discovered-sequence-pill">
                  {concept.completeSequence}
                </div>
                <p className="pl-discovered-explanation">{concept.discoveredRule}</p>
                
                <button
                  type="button"
                  className="pl-replay-concept-btn"
                  onClick={handleReplay}
                >
                  <RotateCcw size={15} />
                  <span>↻ Replay this concept</span>
                </button>
              </div>
            )}

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
                <span>Chapter flow</span>
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
              <p>• <strong>Step 2: Learning Checkpoint</strong>: Predict the next number by selecting the correct option.</p>
              <p>• <strong>Step 3: Correct Answer & Explanation</strong>: See the rule and proceed with "See why it works →".</p>
              <p>• <strong>Step 4: Concept Discovered</strong>: Learn the discovered concept and replay or advance to the next pattern.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
