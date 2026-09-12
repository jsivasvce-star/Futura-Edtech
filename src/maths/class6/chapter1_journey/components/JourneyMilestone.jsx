import React from 'react';
import { ArrowRight, Award } from 'lucide-react';

// ── VISUAL 1.1: WHAT IS MATHEMATICS (COMPASS, RULER, GEOMETRIC SYMBOLS) ──
function Visual1_1() {
  return (
    <div className="milestone-visual visual-1-1">
      <svg viewBox="0 0 140 80" className="milestone-svg">
        <circle cx="70" cy="40" r="32" fill="rgba(245, 158, 11, 0.08)" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="70,18 96,56 44,56" fill="rgba(251, 191, 36, 0.18)" stroke="#d97706" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="70" cy="43" r="13" fill="none" stroke="#b45309" strokeWidth="1.2" />
        <line x1="30" y1="62" x2="110" y2="62" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
        {[35, 45, 55, 65, 75, 85, 95, 105].map(x => (
          <line key={x} x1={x} y1="62" x2={x % 20 === 15 ? "56" : "58"} stroke="#78350f" strokeWidth="1" />
        ))}
        <text x="24" y="30" fill="#9a3412" fontSize="11" fontFamily="serif" fontStyle="italic" fontWeight="bold">π</text>
        <text x="108" y="32" fill="#d97706" fontSize="12" fontFamily="serif" fontWeight="bold">∑</text>
        <text x="104" y="52" fill="#78350f" fontSize="10" fontFamily="serif">∞</text>
        <text x="22" y="52" fill="#b45309" fontSize="10" fontFamily="monospace" fontWeight="bold">1,2,3</text>
      </svg>
    </div>
  );
}

// ── VISUAL 1.2: PATTERNS IN NUMBERS (3D CONNECTED SEQUENCE BLOCKS) ──
function Visual1_2() {
  return (
    <div className="milestone-visual visual-1-2">
      <div className="sequence-block-row">
        {[
          { num: '2', bg: '#f59e0b', text: '#1c1917' },
          { num: '4', bg: '#d97706', text: '#ffffff' },
          { num: '6', bg: '#ea580c', text: '#ffffff' },
          { num: '8', bg: '#c2410c', text: '#ffffff' }
        ].map((block, i) => (
          <React.Fragment key={i}>
            <div className="num-3d-block" style={{ background: block.bg, color: block.text }}>
              <span>{block.num}</span>
            </div>
            {i < 3 && <span className="seq-arrow">→</span>}
          </React.Fragment>
        ))}
        <span className="seq-arrow">→</span>
        <div className="num-3d-block question-block">
          <span>?</span>
        </div>
      </div>
    </div>
  );
}

// ── VISUAL 1.3: VISUALISING NUMBER SEQUENCES (ASCENDING 3D STAIRCASE) ──
function Visual1_3() {
  return (
    <div className="milestone-visual visual-1-3">
      <div className="staircase-container">
        {[1, 2, 3, 4, 5].map((tier, colIdx) => (
          <div key={colIdx} className="stair-column">
            {Array.from({ length: tier }).map((_, blockIdx) => (
              <div
                key={blockIdx}
                className="stair-block"
                style={{
                  background:
                    colIdx === 0
                      ? '#fbbf24'
                      : colIdx === 1
                      ? '#f59e0b'
                      : colIdx === 2
                      ? '#ea580c'
                      : colIdx === 3
                      ? '#c2410c'
                      : '#9a3412'
                }}
              />
            ))}
            <span className="stair-label">{tier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VISUAL 1.4: RELATIONS AMONG NUMBER SEQUENCES (CONNECTED NODES MATRIX) ──
function Visual1_4() {
  return (
    <div className="milestone-visual visual-1-4">
      <svg viewBox="0 0 150 75" className="milestone-svg">
        <line x1="30" y1="24" x2="75" y2="24" stroke="#d97706" strokeWidth="1.8" />
        <line x1="75" y1="24" x2="120" y2="24" stroke="#d97706" strokeWidth="1.8" />
        <line x1="30" y1="56" x2="75" y2="56" stroke="#b45309" strokeWidth="1.8" />
        <line x1="75" y1="56" x2="120" y2="56" stroke="#b45309" strokeWidth="1.8" />
        <line x1="30" y1="24" x2="30" y2="56" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="75" y1="24" x2="75" y2="56" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="120" y1="24" x2="120" y2="56" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />

        {[
          { cx: 30, val: '2', bg: '#f59e0b' },
          { cx: 75, val: '4', bg: '#f59e0b' },
          { cx: 120, val: '6', bg: '#f59e0b' }
        ].map((node, i) => (
          <g key={`top-${i}`}>
            <circle cx={node.cx} cy="24" r="11" fill={node.bg} stroke="#78350f" strokeWidth="1.5" />
            <text x={node.cx} y="28" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="900">{node.val}</text>
          </g>
        ))}

        {[
          { cx: 30, val: '3', bg: '#d97706' },
          { cx: 75, val: '6', bg: '#d97706' },
          { cx: 120, val: '9', bg: '#d97706' }
        ].map((node, i) => (
          <g key={`bot-${i}`}>
            <circle cx={node.cx} cy="56" r="11" fill={node.bg} stroke="#451a03" strokeWidth="1.5" />
            <text x={node.cx} y="60" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">{node.val}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── VISUAL 1.5: PATTERNS IN SHAPES (REPEATING GEOMETRIC TESSELLATION) ──
function Visual1_5() {
  return (
    <div className="milestone-visual visual-1-5">
      <svg viewBox="0 0 150 75" className="milestone-svg">
        <polygon points="26,24 38,50 14,50" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.8" strokeLinejoin="round" />
        <text x="26" y="64" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="800">3</text>

        <rect x="49" y="27" width="22" height="22" rx="2" fill="rgba(217, 119, 6, 0.25)" stroke="#d97706" strokeWidth="1.8" />
        <text x="60" y="64" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="800">4</text>

        <polygon points="95,24 107,34 102,49 88,49 83,34" fill="rgba(234, 88, 12, 0.25)" stroke="#ea580c" strokeWidth="1.8" strokeLinejoin="round" />
        <text x="95" y="64" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="800">5</text>

        <polygon points="130,24 141,31 141,45 130,52 119,45 119,31" fill="rgba(194, 65, 12, 0.25)" stroke="#c2410c" strokeWidth="1.8" strokeLinejoin="round" />
        <text x="130" y="64" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="800">6</text>
      </svg>
    </div>
  );
}

// ── VISUAL 1.6: FROM SHAPES TO NUMBERS (SHAPES -> NUMBER TRANSLATION) ──
function Visual1_6() {
  return (
    <div className="milestone-visual visual-1-6">
      <div className="shapes-to-num-row">
        <div className="shape-box-cluster">
          <div className="mini-shape mini-tri" />
          <div className="mini-shape mini-circle" />
          <div className="mini-shape mini-square" />
        </div>

        <div className="transform-arrow">↓</div>

        <div className="num-box-cluster">
          <span className="mini-num-pill pill-1">1</span>
          <span className="mini-num-pill pill-2">2</span>
          <span className="mini-num-pill pill-3">3</span>
        </div>
      </div>
    </div>
  );
}

// ── VISUAL SUMMARY: CHAPTER CHECKPOINT SEAL ──
function VisualSummary() {
  return (
    <div className="milestone-visual visual-summary">
      <div className="summary-seal-badge">
        <div className="seal-ring">
          <Award size={26} className="seal-icon" />
        </div>
        <div className="summary-tags-row">
          <span className="summary-chip">6 Pattern Worlds</span>
          <span className="summary-chip">Mastered</span>
        </div>
      </div>
    </div>
  );
}

// ── VISUAL QUIZ: INTERACTIVE PUZZLE STATION ──
function VisualQuiz() {
  return (
    <div className="milestone-visual visual-quiz">
      <div className="quiz-station-container">
        <div className="puzzle-piece puzzle-left">🧩</div>
        <div className="quiz-central-badge">
          <span className="quiz-question-mark">?</span>
        </div>
        <div className="puzzle-piece puzzle-right">🏆</div>
      </div>
    </div>
  );
}

export default function JourneyMilestone({
  node,
  status, // 'completed' | 'active' | 'upcoming'
  onSelect,
  onHover,
  isHovered
}) {
  const isSummary = node.id === 'summary';
  const isQuiz = node.id === 'quiz';
  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  const renderVisual = () => {
    switch (node.id) {
      case '1.1': return <Visual1_1 />;
      case '1.2': return <Visual1_2 />;
      case '1.3': return <Visual1_3 />;
      case '1.4': return <Visual1_4 />;
      case '1.5': return <Visual1_5 />;
      case '1.6': return <Visual1_6 />;
      case 'summary': return <VisualSummary />;
      case 'quiz': return <VisualQuiz />;
      default: return null;
    }
  };

  const getMilestoneClasses = () => {
    let classes = `journey-milestone-node node-${node.id.replace('.', '_')}`;
    if (isActive) classes += ' active-milestone';
    if (isCompleted) classes += ' completed-milestone';
    if (!isActive && !isCompleted) classes += ' upcoming-milestone';
    if (isSummary) classes += ' summary-milestone';
    if (isQuiz) classes += ' quiz-milestone';
    if (isHovered) classes += ' hovered-milestone';
    return classes;
  };

  return (
    <div
      className={getMilestoneClasses()}
      onClick={() => onSelect(node)}
      onMouseEnter={() => onHover && onHover(node.id)}
      onMouseLeave={() => onHover && onHover(null)}
      id={`milestone-${node.id.replace('.', '_')}`}
    >
      {/* Milestone Top Indicator: Pin Dot & Step Badge */}
      <div className="milestone-pin-header">
        <div className="milestone-pin-dot">
          <div className="pin-inner-core" />
        </div>

        <span className="milestone-id-badge">
          {node.displayId}
        </span>
      </div>

      {/* Embedded 3D Math Visual Concept */}
      <div className="milestone-visual-wrapper">
        {renderVisual()}
      </div>

      {/* Lesson Heading / Title */}
      <div className="milestone-title-wrapper">
        <h3 className="milestone-title">
          {node.title}
        </h3>
      </div>

      {/* Interactive Action Button */}
      <button
        className="milestone-action-btn"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
      >
        {isQuiz ? (
          <>START QUIZ <ArrowRight size={15} /></>
        ) : (
          <>EXPLORE <ArrowRight size={15} /></>
        )}
      </button>
    </div>
  );
}
