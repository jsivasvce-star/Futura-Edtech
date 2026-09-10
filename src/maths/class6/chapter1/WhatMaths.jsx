import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Sparkles,
  Search,
  Lightbulb,
  Rocket,
  CheckCircle,
  HelpCircle,
  Shapes,
  Binary,
  Compass,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import './what-maths.css';

// ── 3D REALISTIC VISUAL COMPONENT 1: NUMBERS & SEQUENCES ──
function Visual3DNumbers({ isActive }) {
  return (
    <div className={`wm-3d-visual-container ${isActive ? 'is-active' : ''}`}>
      <svg viewBox="0 0 260 95" className="wm-3d-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cubeTop1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="cubeLeft1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="cubeRight1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="cubeTop2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="cubeLeft2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <linearGradient id="cubeRight2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
          </linearGradient>

          <filter id="cubeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Floor grid / shadow line */}
        <ellipse cx="130" cy="78" rx="115" ry="12" fill="rgba(0,0,0,0.35)" filter="blur(4px)" />
        <path d="M 20 74 L 240 74" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Connecting laser sequence vector */}
        <path d="M 38 48 Q 95 38, 150 32 T 222 24" fill="none" stroke="url(#beamGrad)" strokeWidth="2" strokeDasharray="4 2" className="wm-beam-pulse" />

        {/* Cube 1: Number 2 */}
        <g transform="translate(18, 28)" filter="url(#cubeShadow)" className="wm-cube-float wm-cube-1">
          <polygon points="20,0 40,10 20,20 0,10" fill="url(#cubeTop1)" stroke="#fef3c7" strokeWidth="0.8" />
          <polygon points="0,10 20,20 20,44 0,34" fill="url(#cubeLeft1)" />
          <polygon points="20,20 40,10 40,34 20,44" fill="url(#cubeRight1)" />
          <text x="20" y="14" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="900" transform="skewY(-12) rotate(10 20 14)">2</text>
        </g>

        {/* Cube 2: Number 4 */}
        <g transform="translate(76, 22)" filter="url(#cubeShadow)" className="wm-cube-float wm-cube-2">
          <polygon points="20,0 40,10 20,20 0,10" fill="url(#cubeTop1)" stroke="#fef3c7" strokeWidth="0.8" />
          <polygon points="0,10 20,20 20,44 0,34" fill="url(#cubeLeft1)" />
          <polygon points="20,20 40,10 40,34 20,44" fill="url(#cubeRight1)" />
          <text x="20" y="14" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="900" transform="skewY(-12) rotate(10 20 14)">4</text>
        </g>

        {/* Cube 3: Number 8 */}
        <g transform="translate(134, 16)" filter="url(#cubeShadow)" className="wm-cube-float wm-cube-3">
          <polygon points="20,0 40,10 20,20 0,10" fill="url(#cubeTop2)" stroke="#fef3c7" strokeWidth="0.8" />
          <polygon points="0,10 20,20 20,44 0,34" fill="url(#cubeLeft2)" />
          <polygon points="20,20 40,10 40,34 20,44" fill="url(#cubeRight2)" />
          <text x="20" y="14" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" transform="skewY(-12) rotate(10 20 14)">8</text>
        </g>

        {/* Cube 4: Number 16 (Elevated Hero) */}
        <g transform="translate(192, 10)" filter="url(#cubeShadow)" className="wm-cube-float wm-cube-4">
          <polygon points="22,0 44,11 22,22 0,11" fill="url(#cubeTop2)" stroke="#fef08a" strokeWidth="1.2" />
          <polygon points="0,11 22,22 22,48 0,37" fill="url(#cubeLeft2)" />
          <polygon points="22,22 44,11 44,37 22,48" fill="url(#cubeRight2)" />
          <text x="22" y="15" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" transform="skewY(-12) rotate(10 22 15)">16</text>
        </g>

        {/* Multiplier tags */}
        <g fontSize="8" fontWeight="800" fill="#fde047">
          <text x="66" y="24" textAnchor="middle">×2</text>
          <text x="124" y="18" textAnchor="middle">×2</text>
          <text x="182" y="12" textAnchor="middle">×2</text>
        </g>
      </svg>
    </div>
  );
}

// ── 3D REALISTIC VISUAL COMPONENT 2: SHAPES & PATTERNS ──
function Visual3DShapes({ isActive }) {
  return (
    <div className={`wm-3d-visual-container ${isActive ? 'is-active' : ''}`}>
      <svg viewBox="0 0 260 95" className="wm-3d-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="prismFace1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="prismFace2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
        </defs>

        {/* Shadows */}
        <ellipse cx="45" cy="74" rx="22" ry="7" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />
        <ellipse cx="105" cy="74" rx="20" ry="7" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />
        <ellipse cx="165" cy="74" rx="22" ry="7" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />
        <ellipse cx="220" cy="74" rx="18" ry="7" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />

        {/* Geometric Tessellation Construction Background */}
        <polygon points="45,22 105,22 75,70" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="105,22 165,22 135,70" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="165,22 225,22 195,70" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Shape 1: 3D Tetrahedron / Pyramid */}
        <g transform="translate(25, 20)" className="wm-shape-rotate-1">
          <polygon points="20,6 40,48 20,54" fill="url(#prismFace1)" stroke="#fef3c7" strokeWidth="0.8" />
          <polygon points="20,6 0,48 20,54" fill="url(#prismFace2)" stroke="#fde047" strokeWidth="0.8" />
          <polygon points="0,48 20,54 40,48" fill="#78350f" />
        </g>

        {/* Shape 2: 3D Glossy Sphere */}
        <g transform="translate(85, 26)" className="wm-shape-pulse">
          <circle cx="20" cy="24" r="18" fill="url(#sphereGrad)" stroke="#fef08a" strokeWidth="0.8" />
          <ellipse cx="15" cy="17" rx="5" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-30 15 17)" />
        </g>

        {/* Shape 3: 3D Faceted Hexagonal Prism (Hero Rotating) */}
        <g transform="translate(142, 16)" className="wm-shape-rotate-2">
          <polygon points="22,6 38,15 38,36 22,45 6,36 6,15" fill="url(#diamondGrad)" stroke="#fef3c7" strokeWidth="1" />
          <polygon points="22,6 38,15 22,25 6,15" fill="#fef08a" opacity="0.7" />
          <line x1="22" y1="25" x2="22" y2="45" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          <line x1="6" y1="15" x2="22" y2="25" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
          <line x1="38" y1="15" x2="22" y2="25" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
        </g>

        {/* Shape 4: 3D Golden Cube */}
        <g transform="translate(202, 24)" className="wm-shape-rotate-1">
          <polygon points="16,0 32,8 16,16 0,8" fill="url(#cubeTop1)" stroke="#fef3c7" strokeWidth="0.8" />
          <polygon points="0,8 16,16 16,36 0,28" fill="url(#cubeLeft1)" />
          <polygon points="16,16 32,8 32,28 16,36" fill="url(#cubeRight1)" />
        </g>

        {/* Pattern Repeat indicator */}
        <text x="130" y="86" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="800" letterSpacing="0.1em">
          △ ◯ ⬡ ◻ △ ◯ ⬡ ◻ (REPEATING RULE)
        </text>
      </svg>
    </div>
  );
}

// ── 3D REALISTIC VISUAL COMPONENT 3: SYMMETRY ──
function Visual3DSymmetry({ isActive }) {
  return (
    <div className={`wm-3d-visual-container ${isActive ? 'is-active' : ''}`}>
      <svg viewBox="0 0 260 95" className="wm-3d-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="symWingLeft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="symWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="mirrorLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#fde047" stopOpacity="1" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <filter id="mirrorGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floor grid & reflections */}
        <ellipse cx="130" cy="76" rx="100" ry="10" fill="rgba(0,0,0,0.35)" filter="blur(4px)" />

        {/* Central Vertical Mirror Axis */}
        <line x1="130" y1="8" x2="130" y2="82" stroke="url(#mirrorLine)" strokeWidth="2.5" strokeDasharray="5 3" filter="url(#mirrorGlow)" />
        <circle cx="130" cy="12" r="3.5" fill="#fde047" />
        <circle cx="130" cy="78" r="3.5" fill="#38bdf8" />

        {/* LEFT SYMMETRICAL WING / FACETS */}
        <g transform="translate(130, 45) scale(-1, 1)" className="wm-sym-wing-left">
          {/* Main 3D Facet */}
          <polygon points="8,-32 58,-20 72,5 42,22 6,8" fill="url(#symWingRight)" stroke="#fef3c7" strokeWidth="1" />
          {/* Inner Highlight Polygon */}
          <polygon points="12,-18 46,-10 54,6 30,14" fill="#fef08a" opacity="0.6" />
          {/* Lower Facet */}
          <polygon points="6,8 42,22 28,32 4,18" fill="#9a3412" stroke="#d97706" strokeWidth="0.8" />
          {/* Specular Vertex Nodes */}
          <circle cx="58" cy="-20" r="3" fill="#ffffff" />
          <circle cx="72" cy="5" r="3" fill="#fde047" />
          <circle cx="42" cy="22" r="2.5" fill="#ffffff" />
        </g>

        {/* RIGHT SYMMETRICAL WING / FACETS */}
        <g transform="translate(130, 45)" className="wm-sym-wing-right">
          {/* Main 3D Facet */}
          <polygon points="8,-32 58,-20 72,5 42,22 6,8" fill="url(#symWingRight)" stroke="#fef3c7" strokeWidth="1" />
          {/* Inner Highlight Polygon */}
          <polygon points="12,-18 46,-10 54,6 30,14" fill="#fef08a" opacity="0.6" />
          {/* Lower Facet */}
          <polygon points="6,8 42,22 28,32 4,18" fill="#9a3412" stroke="#d97706" strokeWidth="0.8" />
          {/* Specular Vertex Nodes */}
          <circle cx="58" cy="-20" r="3" fill="#ffffff" />
          <circle cx="72" cy="5" r="3" fill="#fde047" />
          <circle cx="42" cy="22" r="2.5" fill="#ffffff" />
        </g>

        {/* Reflection coordinate labels */}
        <text x="65" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="800">
          (-x, y)
        </text>
        <text x="130" y="90" textAnchor="middle" fill="#fde047" fontSize="7.5" fontWeight="900">
          MIRROR AXIS
        </text>
        <text x="195" y="86" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="800">
          (+x, y)
        </text>
      </svg>
    </div>
  );
}

// ── 3D REALISTIC VISUAL COMPONENT 4: EVERYDAY PATTERNS ──
function Visual3DEveryday({ isActive }) {
  return (
    <div className={`wm-3d-visual-container ${isActive ? 'is-active' : ''}`}>
      <svg viewBox="0 0 260 95" className="wm-3d-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="clockBezel" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="90%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <radialGradient id="sunGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="80%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </radialGradient>
          <linearGradient id="orbitArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Shadows */}
        <ellipse cx="60" cy="76" rx="28" ry="8" fill="rgba(0,0,0,0.4)" filter="blur(3px)" />
        <ellipse cx="180" cy="76" rx="45" ry="8" fill="rgba(0,0,0,0.3)" filter="blur(4px)" />

        {/* 1. 3D Analog Clock (Cycles of Time) */}
        <g transform="translate(60, 42)" className="wm-clock-group">
          {/* Bezel Ring with metallic 3D depth */}
          <circle cx="0" cy="0" r="26" fill="url(#clockBezel)" stroke="#fde047" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="21" fill="#0f172a" stroke="#d97706" strokeWidth="0.8" />
          
          {/* Ticks 12, 3, 6, 9 */}
          {[0, 90, 180, 270].map((deg, i) => (
            <line
              key={i}
              x1="0"
              y1="-19"
              x2="0"
              y2="-15"
              stroke="#fef08a"
              strokeWidth="1.5"
              transform={`rotate(${deg})`}
            />
          ))}
          {/* Rotating Hands */}
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" className="wm-hand-hour" />
          <line x1="0" y1="0" x2="11" y2="0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="wm-hand-minute" />
          <circle cx="0" cy="0" r="2.5" fill="#fde047" />
        </g>

        {/* 2. Celestial Diurnal Orbit Arc (Day & Night Pattern) */}
        <path d="M 120 62 C 140 18, 210 18, 235 62" fill="none" stroke="url(#orbitArc)" strokeWidth="1.8" strokeDasharray="4 2" />

        {/* Glowing 3D Sun */}
        <g transform="translate(160, 28)" className="wm-sun-pulse">
          <circle cx="0" cy="0" r="11" fill="url(#sunGlow)" stroke="#fef08a" strokeWidth="1" />
          {/* Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
            <line
              key={i}
              x1="0"
              y1="-14"
              x2="0"
              y2="-17"
              stroke="#f59e0b"
              strokeWidth="1.2"
              transform={`rotate(${ang})`}
            />
          ))}
        </g>

        {/* 3D Crescent Moon */}
        <g transform="translate(225, 48)">
          <path d="M -2,-8 A 8,8 0 0,0 6,8 A 6,6 0 0,1 -2,-8" fill="#e2e8f0" stroke="#fde047" strokeWidth="0.8" />
        </g>

        {/* 3. Repeating Footsteps / Tile Waveform */}
        <g transform="translate(130, 72)" fill="#f59e0b" opacity="0.8">
          <rect x="0" y="0" width="8" height="4" rx="2" />
          <rect x="14" y="-3" width="8" height="4" rx="2" />
          <rect x="28" y="0" width="8" height="4" rx="2" />
          <rect x="42" y="-3" width="8" height="4" rx="2" />
          <rect x="56" y="0" width="8" height="4" rx="2" />
          <rect x="70" y="-3" width="8" height="4" rx="2" />
        </g>

        <text x="180" y="88" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="800">
          DAILY CYCLES & RHYTHMS
        </text>
      </svg>
    </div>
  );
}

export default function WhatMaths({ onNext, onPrev, onBack }) {
  const [currentSlide, setCurrentSlide] = useState(1);

  // ── SLIDE 1 STATE ──
  const [activeDiscoveryId, setActiveDiscoveryId] = useState('numbers');
  const discoveryCards = [
    {
      id: 'numbers',
      title: 'Numbers & Sequences',
      icon: '🔢',
      preview: '2, 4, 8, 16...',
      explanation: 'Numbers can follow rules and repeat in interesting ways.',
      visual: (isActive) => <Visual3DNumbers isActive={isActive} />
    },
    {
      id: 'shapes',
      title: 'Shapes & Patterns',
      icon: '📐',
      preview: '△ ⬡ ◻ ⬡ △',
      explanation: 'Geometric figures fit together and create beautiful regular structures.',
      visual: (isActive) => <Visual3DShapes isActive={isActive} />
    },
    {
      id: 'symmetry',
      title: 'Symmetry',
      icon: '🦋',
      preview: '◧ ◨ (Mirror)',
      explanation: 'Balance and reflection appear in geometry, art, and natural crystals.',
      visual: (isActive) => <Visual3DSymmetry isActive={isActive} />
    },
    {
      id: 'everyday',
      title: 'Everyday Patterns',
      icon: '⏰',
      preview: 'Sun, Clock, Steps',
      explanation: 'Time, music rhythms, calendar cycles, and steps follow mathematical orders.',
      visual: (isActive) => <Visual3DEveryday isActive={isActive} />
    }
  ];

  // ── SLIDE 2 STATE ──
  const [selectedDetectiveAnswer, setSelectedDetectiveAnswer] = useState(null);
  const [detectiveFeedback, setDetectiveFeedback] = useState('');

  const handleDetectiveChoice = (choice) => {
    setSelectedDetectiveAnswer(choice);
    if (choice === 10) {
      setDetectiveFeedback('Great! You found the pattern.');
    } else {
      setDetectiveFeedback('Look closely: Each step adds +2. Try again!');
    }
  };

  // ── SLIDE 3 STATE ──
  const [selectedEverydayId, setSelectedEverydayId] = useState('shopping');
  const everydayObjects = [
    {
      id: 'shopping',
      title: 'Shopping',
      icon: '🛒',
      explanation: 'Maths helps us count and calculate.'
    },
    {
      id: 'cooking',
      title: 'Cooking',
      icon: '🥣',
      explanation: 'Maths helps us measure quantities.'
    },
    {
      id: 'playing',
      title: 'Playing',
      icon: '⚽',
      explanation: 'Maths helps us understand position and distance.'
    },
    {
      id: 'weather',
      title: 'Weather',
      icon: '⛅',
      explanation: 'Maths helps us observe and compare patterns.'
    },
    {
      id: 'technology',
      title: 'Technology',
      icon: '💻',
      explanation: 'Maths helps computers work with numbers and logic.'
    }
  ];

  // ── SLIDE 4 STATE ──
  const [activeChallengeTab, setActiveChallengeTab] = useState('number');
  const [challengeAnswers, setChallengeAnswers] = useState({
    number: null,
    shape: null,
    sequence: null
  });

  const challenges = {
    number: {
      title: 'A. Number Pattern',
      prompt: 'What number comes next in triangular growth?',
      sequence: ['1', '3', '6', '10', '?'],
      options: [12, 14, 15],
      correct: 15,
      rule: 'Step increases: +2, +3, +4, +5 → Next is 10 + 5 = 15!'
    },
    shape: {
      title: 'B. Shape Pattern',
      prompt: 'Counting polygon sides: 3 sides → 4 sides → 5 sides → ?',
      sequence: ['△ (3)', '◻ (4)', '⬠ (5)', '?'],
      options: ['Hexagon (6)', 'Circle', 'Star'],
      correct: 'Hexagon (6)',
      rule: 'Each polygon gains +1 side! 5 + 1 = 6 (Hexagon).'
    },
    sequence: {
      title: 'C. Sequence Pattern',
      prompt: 'Alternating rotation pattern: ⬆ → ➡ → ⬇ → ?',
      sequence: ['⬆', '➡', '⬇', '?'],
      options: ['⬅', '⬆', '↗'],
      correct: '⬅',
      rule: 'Rotating 90° clockwise at each step!'
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < 4) {
      setCurrentSlide(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    } else if (onPrev) {
      onPrev();
    }
  };

  const handleBackToOverview = () => {
    if (onBack) {
      onBack();
    } else if (onPrev) {
      onPrev();
    }
  };

  return (
    <div className="wm-page-container">
      {/* Background Decorative Mathematics Art */}
      <div className="wm-bg-grid" />
      <svg className="wm-bg-svg-art" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1400" cy="180" r="140" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 6" />
        <polygon points="1200,600 1350,850 1050,850" stroke="#d97706" strokeWidth="1.5" />
        <line x1="80" y1="200" x2="600" y2="200" stroke="#b45309" strokeWidth="1" strokeDasharray="6 6" />
        <text x="1100" y="320" fill="#9a3412" fontSize="26" fontFamily="serif" fontStyle="italic">π, ∑, ∞, θ, Δ</text>
        <text x="180" y="780" fill="#b45309" fontSize="22" fontFamily="monospace">f(n) = 2n + 1</text>
      </svg>

      {/* ── TOP NAVIGATION HEADER ── */}
      <header className="wm-header">
        <button
          className="wm-nav-btn"
          onClick={handleBackToOverview}
          title="Back to Chapter 1 Overview"
        >
          <ArrowLeft size={16} /> Back to Chapter 1
        </button>

        <div className="wm-header-center">
          <span className="wm-chapter-pill">CHAPTER 1 · SECTION 1.1</span>
          <span className="wm-slide-badge">Slide {currentSlide} of 4</span>
        </div>

        <button
          className="wm-nav-btn"
          onClick={handleBackToOverview}
          title="Return to Home / Overview"
        >
          <Home size={16} /> Home
        </button>
      </header>

      {/* ── MAIN 2-COLUMN VIEWPORT ── */}
      <main className="wm-main-viewport">
        {/* ════════════════════════════════════════════════════════════════
            SLIDE 1: WHAT IS MATHEMATICS?
           ════════════════════════════════════════════════════════════════ */}
        {currentSlide === 1 && (
          <>
            {/* LEFT 45%: Lesson Content */}
            <section className="wm-left-panel">
              <div>
                <div className="wm-section-tag">
                  <Compass size={15} /> Core Concept
                </div>
                <h2 className="wm-lesson-title">What is Mathematics?</h2>

                <div className="wm-text-block">
                  <p>
                    Mathematics is not only about numbers and calculations.
                  </p>
                  <p>
                    It is also about <span className="wm-highlight">looking for patterns</span> and <span className="wm-highlight">understanding why</span> those <span className="wm-highlight">patterns happen</span>.
                  </p>
                  <p>
                    We can find patterns everywhere — in nature, at home, in school, in games, and even in the sky.
                  </p>
                </div>
              </div>

              <div className="wm-takeaway-box">
                <Sparkles size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>Maths is all around us!</span>
              </div>
            </section>

            {/* RIGHT 55%: Interactive Activity */}
            <section className="wm-right-panel">
              <div className="wm-activity-header">
                <span className="wm-activity-badge">
                  <Search size={14} /> Interactive Exploration
                </span>
                <h3 className="wm-activity-title">Tap to discover the Maths hiding inside!</h3>
              </div>

              <div className="wm-discovery-grid">
                {discoveryCards.map(card => {
                  const isActive = activeDiscoveryId === card.id;
                  return (
                    <div
                      key={card.id}
                      className={`wm-discovery-card ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveDiscoveryId(card.id)}
                    >
                      <div className="wm-card-top">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span className="wm-card-icon">{card.icon}</span>
                          <h4 className="wm-card-title">{card.title}</h4>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'monospace', fontWeight: 800 }}>
                          {card.preview}
                        </span>
                      </div>

                      {/* 3D Realistic Visual Stage */}
                      <div className="wm-card-3d-stage">
                        {card.visual(isActive)}
                      </div>

                      <p className="wm-card-explanation">{card.explanation}</p>

                      <span className="wm-card-status-chip">
                        {isActive ? '✓ Active Discovery' : 'Tap to Explore'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="wm-takeaway-box" style={{ marginTop: 'auto', background: 'rgba(15, 27, 56, 0.8)' }}>
                <Lightbulb size={18} style={{ color: '#fde047', flexShrink: 0 }} />
                <span style={{ fontSize: '0.86rem', color: '#cbd5e1' }}>
                  Select any card above to see how mathematics connects numbers, shapes, and rhythms.
                </span>
              </div>
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SLIDE 2: BECOME A PATTERN DETECTIVE
           ════════════════════════════════════════════════════════════════ */}
        {currentSlide === 2 && (
          <>
            {/* LEFT 45%: Lesson Content */}
            <section className="wm-left-panel">
              <div>
                <div className="wm-section-tag">
                  <Search size={15} /> Investigation
                </div>
                <h2 className="wm-lesson-title">Become a Pattern Detective!</h2>

                <div className="wm-text-block">
                  <p>
                    Mathematicians look carefully at things around them.
                  </p>
                  <p>
                    They notice what <span className="wm-highlight">repeats</span>, what <span className="wm-highlight">changes</span>, and what <span className="wm-highlight">comes next</span>.
                  </p>
                  <p>
                    Finding a pattern is only the beginning.
                  </p>
                  <p>
                    The next question is: <span className="wm-highlight-orange">‘WHY does this pattern happen?’</span>
                  </p>
                </div>
              </div>

              <div className="wm-takeaway-box">
                <Lightbulb size={20} style={{ color: '#fde047', flexShrink: 0 }} />
                <span>Great detectives always ask: "What is the rule?"</span>
              </div>
            </section>

            {/* RIGHT 55%: Interactive Activity */}
            <section className="wm-right-panel">
              <div className="wm-activity-header">
                <span className="wm-activity-badge">
                  <HelpCircle size={14} /> Pattern Detective Challenge
                </span>
                <h3 className="wm-activity-title">What Comes Next?</h3>
              </div>

              <div className="wm-detective-challenge">
                {/* 3D Sequence Display */}
                <div className="wm-sequence-display">
                  <div className="wm-seq-box">2</div>
                  <span className="wm-seq-arrow">→</span>
                  <div className="wm-seq-box">4</div>
                  <span className="wm-seq-arrow">→</span>
                  <div className="wm-seq-box">6</div>
                  <span className="wm-seq-arrow">→</span>
                  <div className="wm-seq-box">8</div>
                  <span className="wm-seq-arrow">→</span>
                  <div className="wm-seq-box target-box">
                    {selectedDetectiveAnswer === 10 ? '10' : '?'}
                  </div>
                </div>

                {/* Answer Options */}
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Select the missing number:
                  </div>
                  <div className="wm-options-row">
                    {[9, 10, 11, 12].map(num => (
                      <button
                        key={num}
                        className={`wm-choice-btn ${
                          selectedDetectiveAnswer === num
                            ? num === 10
                              ? 'selected-correct'
                              : 'selected-wrong'
                            : ''
                        }`}
                        onClick={() => handleDetectiveChoice(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback & 3-Step Workflow */}
                {detectiveFeedback && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: selectedDetectiveAnswer === 10 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: `1.5px solid ${selectedDetectiveAnswer === 10 ? '#f59e0b' : '#ef4444'}`,
                    color: selectedDetectiveAnswer === 10 ? '#fde047' : '#fca5a5',
                    fontSize: '0.9rem',
                    fontWeight: 800
                  }}>
                    {detectiveFeedback}
                  </div>
                )}

                {selectedDetectiveAnswer === 10 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 800, marginBottom: '0.4rem' }}>
                      MATHEMATICAL DETECTIVE METHOD:
                    </div>
                    <div className="wm-workflow-row">
                      <div className="wm-workflow-card">
                        <span className="wm-wf-step">1. Find Pattern</span>
                        <span className="wm-wf-desc">Notice sequence increases by +2 each step.</span>
                      </div>
                      <div className="wm-workflow-card">
                        <span className="wm-wf-step">2. Ask Why</span>
                        <span className="wm-wf-desc">Because these are consecutive even numbers.</span>
                      </div>
                      <div className="wm-workflow-card">
                        <span className="wm-wf-step">3. Explain It</span>
                        <span className="wm-wf-desc">Formula: Term = 2 × n (position).</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SLIDE 3: MATHS IN EVERYDAY LIFE
           ════════════════════════════════════════════════════════════════ */}
        {currentSlide === 3 && (
          <>
            {/* LEFT 45%: Lesson Content */}
            <section className="wm-left-panel">
              <div>
                <div className="wm-section-tag">
                  <Layers size={15} /> Real World Connections
                </div>
                <h2 className="wm-lesson-title">Maths in Everyday Life</h2>

                <div className="wm-text-block">
                  <p>
                    We use mathematical thinking every day, often without noticing it.
                  </p>
                </div>

                <div className="wm-examples-list">
                  <div className="wm-example-item">
                    <span className="wm-example-category">Shopping →</span>
                    <span className="wm-example-desc">counting and calculating</span>
                  </div>
                  <div className="wm-example-item">
                    <span className="wm-example-category">Cooking →</span>
                    <span className="wm-example-desc">measuring ingredients</span>
                  </div>
                  <div className="wm-example-item">
                    <span className="wm-example-category">Playing →</span>
                    <span className="wm-example-desc">position, distance and movement</span>
                  </div>
                  <div className="wm-example-item">
                    <span className="wm-example-category">Weather →</span>
                    <span className="wm-example-desc">observing patterns</span>
                  </div>
                  <div className="wm-example-item">
                    <span className="wm-example-category">Technology →</span>
                    <span className="wm-example-desc">numbers, patterns and logic</span>
                  </div>
                </div>
              </div>

              <div className="wm-takeaway-box">
                <Sparkles size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem' }}>
                  Mathematics can be creative like art and logical like science.
                </span>
              </div>
            </section>

            {/* RIGHT 55%: Interactive Activity */}
            <section className="wm-right-panel">
              <div className="wm-activity-header">
                <span className="wm-activity-badge">
                  <Shapes size={14} /> Interactive Everyday Explorer
                </span>
                <h3 className="wm-activity-title">Tap an object where you can find Mathematics!</h3>
              </div>

              <div className="wm-everyday-grid">
                {everydayObjects.map(item => {
                  const isActive = selectedEverydayId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`wm-everyday-card ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedEverydayId(item.id)}
                    >
                      <span className="wm-everyday-icon">{item.icon}</span>
                      <span className="wm-everyday-title">{item.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Detail Reveal Box */}
              {selectedEverydayId && (
                <div className="wm-everyday-detail-box">
                  <span className="wm-detail-icon">
                    {everydayObjects.find(o => o.id === selectedEverydayId)?.icon}
                  </span>
                  <div>
                    <div className="wm-detail-title">
                      {everydayObjects.find(o => o.id === selectedEverydayId)?.title}
                    </div>
                    <p className="wm-detail-text">
                      {everydayObjects.find(o => o.id === selectedEverydayId)?.explanation}
                    </p>
                  </div>
                </div>
              )}

              <div className="wm-takeaway-box" style={{ marginTop: 'auto', background: 'rgba(15, 27, 56, 0.8)' }}>
                <TrendingUp size={18} style={{ color: '#fde047', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Tap all 5 scenes above to see how mathematics powers our daily life!
                </span>
              </div>
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SLIDE 4: WHY DO PATTERNS MATTER?
           ════════════════════════════════════════════════════════════════ */}
        {currentSlide === 4 && (
          <>
            {/* LEFT 45%: Lesson Content */}
            <section className="wm-left-panel">
              <div>
                <div className="wm-section-tag">
                  <Rocket size={15} /> The Big Picture
                </div>
                <h2 className="wm-lesson-title">Why Do Patterns Matter?</h2>

                <div className="wm-text-block">
                  <p>
                    Finding patterns can help us understand the world and solve bigger problems.
                  </p>
                </div>

                <div className="wm-pillars-container">
                  <div className="wm-pillar-card">
                    <div className="wm-pillar-title">
                      <Rocket size={14} /> SPACE EXPLORATION
                    </div>
                    <p className="wm-pillar-body">
                      Scientists study patterns in the motion of stars, planets and satellites. Understanding these patterns helped humans develop space technology.
                    </p>
                  </div>

                  <div className="wm-pillar-card">
                    <div className="wm-pillar-title">
                      <Binary size={14} /> GENOMES & HEALTH
                    </div>
                    <p className="wm-pillar-body">
                      Scientists study patterns in genomes. Understanding these patterns can help scientists understand health and disease.
                    </p>
                  </div>
                </div>

                <div className="wm-text-block" style={{ marginTop: '0.8rem' }}>
                  <p>
                    Mathematics doesn’t stop at: <span className="wm-highlight">‘What is the pattern?’</span>
                  </p>
                  <p>
                    It also asks: <span className="wm-highlight-orange">‘Why does the pattern exist?’</span>
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT 55%: Interactive Activity */}
            <section className="wm-right-panel">
              <div className="wm-activity-header">
                <span className="wm-activity-badge">
                  <Search size={14} /> Pattern Challenge Station
                </span>
                <h3 className="wm-activity-title">Maths Detective Challenge</h3>
              </div>

              <div className="wm-challenges-container">
                {/* Tabs */}
                <div className="wm-challenge-tabs">
                  {Object.entries(challenges).map(([key, item]) => (
                    <button
                      key={key}
                      className={`wm-challenge-tab ${activeChallengeTab === key ? 'active' : ''}`}
                      onClick={() => setActiveChallengeTab(key)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                {/* Active Challenge Box */}
                {(() => {
                  const ch = challenges[activeChallengeTab];
                  const userAns = challengeAnswers[activeChallengeTab];
                  const isSolved = userAns === ch.correct;

                  return (
                    <div className="wm-active-challenge-box">
                      <span className="wm-challenge-prompt">{ch.prompt}</span>

                      <div className="wm-challenge-display">
                        {ch.sequence.map((seq, i) => (
                          <React.Fragment key={i}>
                            <span style={{ color: seq === '?' && isSolved ? '#fde047' : '#ffffff' }}>
                              {seq === '?' && isSolved ? ch.correct : seq}
                            </span>
                            {i < ch.sequence.length - 1 && <span style={{ color: '#f59e0b' }}>→</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="wm-challenge-options">
                        {ch.options.map((opt, idx) => (
                          <button
                            key={idx}
                            className={`wm-mini-btn ${userAns === opt ? 'selected' : ''}`}
                            onClick={() => setChallengeAnswers(prev => ({ ...prev, [activeChallengeTab]: opt }))}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {userAns && (
                        <div style={{
                          fontSize: '0.8rem',
                          color: isSolved ? '#fde047' : '#fca5a5',
                          fontWeight: 700
                        }}>
                          {isSolved ? `✓ Correct! ${ch.rule}` : 'Try again! Look for the underlying pattern.'}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Final Grand Takeaway */}
                <div className="wm-grand-takeaway">
                  <div className="wm-tri-pillars">
                    <div className="wm-tri-item">🔍 Find Patterns</div>
                    <div className="wm-tri-item">💡 Understand WHY</div>
                    <div className="wm-tri-item">🚀 Use What You Learn</div>
                  </div>
                  <p className="wm-final-statement">
                    “Mathematics is the adventure of discovering patterns and understanding the world around us!”
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* ── BOTTOM SLIDE NAVIGATION & PROGRESS DOTS ── */}
      <footer className="wm-footer-nav">
        <button
          className="wm-action-btn-prev"
          onClick={handlePrevSlide}
          disabled={currentSlide === 1}
        >
          <ArrowLeft size={16} /> Previous Slide
        </button>

        <div className="wm-dots-row">
          {[1, 2, 3, 4].map(slideNum => (
            <button
              key={slideNum}
              className={`wm-dot-btn ${currentSlide === slideNum ? 'active' : ''}`}
              onClick={() => setCurrentSlide(slideNum)}
              title={`Go to Slide ${slideNum}`}
            />
          ))}
        </div>

        <button
          className="wm-action-btn-next"
          onClick={handleNextSlide}
        >
          {currentSlide === 4 ? (
            <>Complete Section 1.1 <CheckCircle size={17} /></>
          ) : (
            <>Next Slide <ArrowRight size={17} /></>
          )}
        </button>
      </footer>
    </div>
  );
}
