import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, MapPin, Compass } from 'lucide-react';
import JourneyMilestone from './components/JourneyMilestone';
import InteractiveModal from './components/InteractiveModal';
import './journey.css';

const CHAPTER_NODES = [
  {
    id: '1.1',
    displayId: '1.1',
    title: 'What is Mathematics?',
    step: 1
  },
  {
    id: '1.2',
    displayId: '1.2',
    title: 'Patterns in Numbers',
    step: 2
  },
  {
    id: '1.3',
    displayId: '1.3',
    title: 'Visualising Number Sequences',
    step: 3
  },
  {
    id: '1.4',
    displayId: '1.4',
    title: 'Relations Among Number Sequences',
    step: 4
  },
  {
    id: '1.5',
    displayId: '1.5',
    title: 'Patterns in Shapes',
    step: 5
  },
  {
    id: '1.6',
    displayId: '1.6',
    title: 'From Shapes to Numbers',
    step: 6
  },
  {
    id: 'summary',
    displayId: 'SUMMARY',
    title: 'Summary Review',
    step: 7
  },
  {
    id: 'quiz',
    displayId: 'QUIZ',
    title: 'Pattern Master Challenge',
    step: 8
  }
];

export default function Class6MathsChapter1Journey({ onBackToDashboard }) {
  const [completedNodeIds, setCompletedNodeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('class6_maths_c1_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeNodeId, setActiveNodeId] = useState(() => {
    const nodeOrder = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', 'summary', 'quiz'];
    try {
      const saved = localStorage.getItem('class6_maths_c1_completed');
      const completed = saved ? JSON.parse(saved) : [];
      const firstIncomplete = nodeOrder.find(id => !completed.includes(id));
      return firstIncomplete || '1.1';
    } catch {
      return '1.1';
    }
  });

  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeForModal, setSelectedNodeForModal] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('class6_maths_c1_completed', JSON.stringify(completedNodeIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedNodeIds]);

  const handleCompleteNode = (nodeId) => {
    const nodeOrder = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', 'summary', 'quiz'];
    const currentIdx = nodeOrder.indexOf(nodeId);

    if (!completedNodeIds.includes(nodeId)) {
      setCompletedNodeIds(prev => [...prev, nodeId]);
    }

    if (currentIdx < nodeOrder.length - 1) {
      const nextId = nodeOrder[currentIdx + 1];
      setActiveNodeId(nextId);
    }

    setSelectedNodeForModal(null);
  };

  const getNodeStatus = (nodeId) => {
    if (completedNodeIds.includes(nodeId)) return 'completed';
    if (nodeId === activeNodeId) return 'active';
    return 'upcoming';
  };

  const topTierNodes = CHAPTER_NODES.slice(0, 4);
  const bottomTierNodes = CHAPTER_NODES.slice(4, 8);

  return (
    <div className="journey-container">
      {/* Subtle Warm Mathematical Drafting Background */}
      <div className="journey-ambient-bg" />
      <div className="journey-ambient-glow journey-ambient-glow-1" />
      <div className="journey-ambient-glow journey-ambient-glow-2" />

      {/* ── HEADER ── */}
      <header className="journey-header">
        <button
          className="journey-back-btn"
          onClick={onBackToDashboard}
          title="Back to Class 6th Mathematics"
        >
          <ArrowLeft size={18} /> Back to Mathematics
        </button>

        <div className="journey-title-center">
          <h1 className="journey-main-title">PATTERNS IN MATHEMATICS</h1>
          <span className="journey-chapter-tag-sub">CHAPTER 1</span>
        </div>

        <div className="journey-header-right-meta">
          <span className="journey-badge-pill">
            <Compass size={14} className="journey-badge-icon" />
            LEARNING JOURNEY
          </span>
        </div>
      </header>

      {/* ── MAIN CONTINUOUS MATHEMATICAL JOURNEY MAP ── */}
      <main className="journey-map-canvas">
        {/* Continuous SVG Golden/Copper Flowing Path */}
        <svg className="journey-svg-path-layer" viewBox="0 0 1400 620" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="30%" stopColor="#d97706" />
              <stop offset="65%" stopColor="#ea580c" />
              <stop offset="85%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Construction Guidelines */}
          <line x1="80" y1="160" x2="1320" y2="160" stroke="#fef3c7" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <line x1="80" y1="460" x2="1320" y2="460" stroke="#fef3c7" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />

          {/* Top Tier Flow (1.1 -> 1.2 -> 1.3 -> 1.4) */}
          <path
            d="M 180 160 L 520 160 L 860 160 L 1200 160"
            stroke="url(#pathGoldGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            filter="url(#pathGlow)"
          />

          {/* Connecting Serpentine Curve from 1.4 down to 1.5 */}
          <path
            d="M 1200 160 C 1360 160, 1360 460, 180 460"
            stroke="url(#pathGoldGradient)"
            strokeWidth="3"
            strokeDasharray="6 4"
            fill="none"
            opacity="0.65"
          />

          {/* Bottom Tier Flow (1.5 -> 1.6 -> SUMMARY -> QUIZ) */}
          <path
            d="M 180 460 L 520 460 L 860 460 L 1200 460"
            stroke="url(#pathGoldGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            filter="url(#pathGlow)"
          />

          {/* Milestone Waypoint Circles along the path */}
          {[180, 520, 860, 1200].map((x, i) => (
            <g key={`top-pt-${i}`}>
              <circle cx={x} cy="160" r="7" fill="#fffbeb" stroke="#d97706" strokeWidth="2.5" />
              <circle cx={x} cy="160" r="3" fill="#f59e0b" />
            </g>
          ))}

          {[180, 520, 860, 1200].map((x, i) => (
            <g key={`bot-pt-${i}`}>
              <circle cx={x} cy="460" r="7" fill="#fffbeb" stroke="#d97706" strokeWidth="2.5" />
              <circle cx={x} cy="460" r="3" fill="#f59e0b" />
            </g>
          ))}
        </svg>

        {/* ── TOP PATHWAY SECTION: 1.1 → 1.2 → 1.3 → 1.4 ── */}
        <div className="journey-pathway-tier tier-top">
          {topTierNodes.map(node => (
            <JourneyMilestone
              key={node.id}
              node={node}
              status={getNodeStatus(node.id)}
              onSelect={(n) => setSelectedNodeForModal(n)}
              onHover={(id) => setHoveredNodeId(id)}
              isHovered={hoveredNodeId === node.id}
            />
          ))}
        </div>

        {/* ── BOTTOM PATHWAY SECTION: 1.5 → 1.6 → SUMMARY → QUIZ ── */}
        <div className="journey-pathway-tier tier-bottom">
          {bottomTierNodes.map(node => (
            <JourneyMilestone
              key={node.id}
              node={node}
              status={getNodeStatus(node.id)}
              onSelect={(n) => setSelectedNodeForModal(n)}
              onHover={(id) => setHoveredNodeId(id)}
              isHovered={hoveredNodeId === node.id}
            />
          ))}
        </div>
      </main>

      {/* ── INTERACTIVE MODAL VIEWER ── */}
      {selectedNodeForModal && (
        <InteractiveModal
          node={selectedNodeForModal}
          onClose={() => setSelectedNodeForModal(null)}
          onCompleteNode={handleCompleteNode}
        />
      )}
    </div>
  );
}

