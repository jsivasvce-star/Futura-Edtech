/* eslint-disable react/prop-types, no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, CheckCircle2, Sparkles, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import PatternVisualCinema from './PatternVisualCinema';
import DuskCarPatternCinema from './DuskCarPatternCinema';
import ConceptExplorationModules from './ConceptExplorationModules';
import NumberPatternLab from './NumberPatternLab';

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

// ── 10 VISUAL PREDICT & DISCOVER DATA ──
const VISUAL_PATTERNS_DATA = {
  all_ones: {
    title: "All 1's",
    emoji: '1️⃣',
    accentColor: '#64748b',
    steps: [
      { num: 1 },
      { num: 1 },
      { num: 1 },
      { num: 1 }
    ],
    mysteries: [
      { num: 1 },
      { num: 1 },
      { num: 1 }
    ],
    expectedAnswers: [1, 1, 1],
    equation: '1 = 1 = 1',
    rule: 'The visual shape and quantity always stays exactly 1 (never changes).'
  },
  counting: {
    title: 'Counting Numbers',
    emoji: '🔢',
    accentColor: '#d97706',
    steps: [
      { num: 1, count: 1 },
      { num: 2, count: 2 },
      { num: 3, count: 3 },
      { num: 4, count: 4 }
    ],
    mysteries: [
      { num: 5, count: 5 },
      { num: 6, count: 6 },
      { num: 7, count: 7 }
    ],
    expectedAnswers: [5, 6, 7],
    equation: '4 + 1 = 5, 5 + 1 = 6, 6 + 1 = 7',
    rule: 'Add exactly 1 block at every step (+1).'
  },
  odd_numbers: {
    title: 'Odd Numbers',
    emoji: '🔵',
    accentColor: '#2563eb',
    steps: [
      { num: 1, val: 1 },
      { num: 3, val: 3 },
      { num: 5, val: 5 },
      { num: 7, val: 7 }
    ],
    mysteries: [
      { num: 9, val: 9 },
      { num: 11, val: 11 },
      { num: 13, val: 13 }
    ],
    expectedAnswers: [9, 11, 13],
    equation: '7 + 2 = 9, 9 + 2 = 11, 11 + 2 = 13',
    rule: 'Add 2 each time (always leaves 1 unpaired dot).'
  },
  even_numbers: {
    title: 'Even Numbers',
    emoji: '👫',
    accentColor: '#dc2626',
    steps: [
      { num: 2, val: 2 },
      { num: 4, val: 4 },
      { num: 6, val: 6 },
      { num: 8, val: 8 }
    ],
    mysteries: [
      { num: 10, val: 10 },
      { num: 12, val: 12 },
      { num: 14, val: 14 }
    ],
    expectedAnswers: [10, 12, 14],
    equation: '8 + 2 = 10, 10 + 2 = 12, 12 + 2 = 14',
    rule: 'Add 2 each time (forms complete pairs of 2).'
  },
  triangular: {
    title: 'Triangular Numbers',
    emoji: '🔺',
    accentColor: '#059669',
    steps: [
      { num: 1, rows: 1 },
      { num: 3, rows: 2 },
      { num: 6, rows: 3 },
      { num: 10, rows: 4 }
    ],
    mysteries: [
      { num: 15, rows: 5 },
      { num: 21, rows: 6 },
      { num: 28, rows: 7 }
    ],
    expectedAnswers: [15, 21, 28],
    equation: '10 + 5 = 15, 15 + 6 = 21, 21 + 7 = 28',
    rule: 'Add one more triangle than the previous row (+2, +3, +4, +5, +6, +7).'
  },
  squares: {
    title: 'Square Numbers',
    emoji: '🟨',
    accentColor: '#d97706',
    steps: [
      { num: 1, size: 1 },
      { num: 4, size: 2 },
      { num: 9, size: 3 },
      { num: 16, size: 4 }
    ],
    mysteries: [
      { num: 25, size: 5 },
      { num: 36, size: 6 },
      { num: 49, size: 7 }
    ],
    expectedAnswers: [25, 36, 49],
    equation: '5² = 25, 6² = 36, 7² = 49',
    rule: 'Square the position number (n × n equal rows & columns).'
  },
  cubes: {
    title: 'Cube Numbers',
    emoji: '🧊',
    accentColor: '#7c3aed',
    steps: [
      { num: 1, size: 1 },
      { num: 8, size: 2 },
      { num: 27, size: 3 },
      { num: 64, size: 4 }
    ],
    mysteries: [
      { num: 125, size: 5 },
      { num: 216, size: 6 },
      { num: 343, size: 7 }
    ],
    expectedAnswers: [125, 216, 343],
    alternateAnswers: [64, 125, 216],
    equation: '5³ = 125, 6³ = 216, 7³ = 343',
    rule: 'Multiply a number by itself three times (n × n × n solid 3D cubes).'
  },
  virahanka: {
    title: 'Virahānka Numbers',
    emoji: '🌀',
    accentColor: '#0284c7',
    steps: [
      { num: 1, type: 'base', val: 1 },
      { num: 2, type: 'base', val: 2 },
      { num: 3, type: 'sum', p1: 1, p2: 2 },
      { num: 5, type: 'sum', p1: 2, p2: 3 }
    ],
    mysteries: [
      { num: 8, type: 'sum', p1: 3, p2: 5 },
      { num: 13, type: 'sum', p1: 5, p2: 8 },
      { num: 21, type: 'sum', p1: 8, p2: 13 }
    ],
    expectedAnswers: [8, 13, 21],
    equation: '3 + 5 = 8, 5 + 8 = 13, 8 + 13 = 21',
    rule: 'Add the previous two numbers together to get the next number.'
  },
  powers_of_2: {
    title: 'Powers of 2',
    emoji: '⚡',
    accentColor: '#db2777',
    steps: [
      { num: 1, power: 0 },
      { num: 2, power: 1 },
      { num: 4, power: 2 },
      { num: 8, power: 3 }
    ],
    mysteries: [
      { num: 16, power: 4 },
      { num: 32, power: 5 },
      { num: 64, power: 6 }
    ],
    expectedAnswers: [16, 32, 64],
    equation: '8 × 2 = 16, 16 × 2 = 32, 32 × 2 = 64',
    rule: 'Multiply by 2 each time (doubles at every step).'
  },
  powers_of_3: {
    title: 'Powers of 3',
    emoji: '🌿',
    accentColor: '#0d9488',
    steps: [
      { num: 1, power: 0 },
      { num: 3, power: 1 },
      { num: 9, power: 2 },
      { num: 27, power: 3 }
    ],
    mysteries: [
      { num: 81, power: 4 },
      { num: 243, power: 5 },
      { num: 729, power: 6 }
    ],
    expectedAnswers: [81, 243, 729],
    alternateAnswers: [27, 81, 243],
    equation: '27 × 3 = 81, 81 × 3 = 243, 243 × 3 = 729',
    rule: 'Multiply by 3 each time (triples at every step).'
  }
};

// ── ISOMETRIC 3D CUBE RENDERER FOR CUBES SEQUENCE (COMPLETE, UNCLIPPED & BOLD) ──
const renderIsometricCube = (size) => {
  // Edge unit u chosen so that overall height stays centered and completely inside 78px
  const u = size === 1 ? 28 : size === 2 ? 15 : size === 3 ? 10.5 : size === 4 ? 7.8 : size === 5 ? 6.2 : size === 6 ? 5.2 : 4.4;
  const cos30 = 0.866;
  const sin30 = 0.5;
  const svgWidth = 96;
  const svgHeight = 78;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;

  const topFaces = [];
  const leftFaces = [];
  const rightFaces = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const z = size - 1;
      const px = cx + (x - y) * u * cos30;
      const py = cy + (x + y) * u * sin30 - z * u;
      topFaces.push(
        `M ${px} ${py - u} L ${px + u * cos30} ${py - u + u * sin30} L ${px} ${py} L ${px - u * cos30} ${py - u + u * sin30} Z`
      );
    }
  }

  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      const x = size - 1;
      const px = cx + (x - y) * u * cos30;
      const py = cy + (x + y) * u * sin30 - z * u;
      rightFaces.push(
        `M ${px} ${py} L ${px + u * cos30} ${py - u + u * sin30} L ${px + u * cos30} ${py + u * sin30} L ${px} ${py + u} Z`
      );
    }
  }

  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const y = size - 1;
      const px = cx + (x - y) * u * cos30;
      const py = cy + (x + y) * u * sin30 - z * u;
      leftFaces.push(
        `M ${px - u * cos30} ${py - u + u * sin30} L ${px} ${py} L ${px} ${py + u} L ${px - u * cos30} ${py + u * sin30} Z`
      );
    }
  }

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible', filter: 'drop-shadow(0 2px 5px rgba(91, 33, 182, 0.25))' }}>
      {topFaces.map((d, i) => (
        <path key={`top-${i}`} d={d} fill="#c4b5fd" stroke="#2e1065" strokeWidth="1.2" strokeLinejoin="round" />
      ))}
      {leftFaces.map((d, i) => (
        <path key={`left-${i}`} d={d} fill="#8b5cf6" stroke="#2e1065" strokeWidth="1.2" strokeLinejoin="round" />
      ))}
      {rightFaces.map((d, i) => (
        <path key={`right-${i}`} d={d} fill="#5b21b6" stroke="#2e1065" strokeWidth="1.2" strokeLinejoin="round" />
      ))}
    </svg>
  );
};

// ── VISUAL SHAPE RENDERER (LARGE, BOLD, HIGH-CONTRAST & COMPLETELY UNCLIPPED) ──
const renderVisualItem = (seqId, item, color) => {
  if (!item) return null;

  // 1. ALL 1s: Same single star repeatedly, completely unclipped
  if (seqId === 'all_ones') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>
        <svg width="56" height="56" viewBox="-5 -5 110 110" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <polygon
            points="50,5 63,35 95,38 71,60 78,92 50,75 22,92 29,60 5,38 37,35"
            fill="url(#goldStar)"
            stroke="#78350f"
            strokeWidth="3.5"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 3px 6px rgba(180,83,9,0.35))' }}
          />
        </svg>
      </div>
    );
  }

  // 2. COUNTING NUMBERS: Exactly that many identical blocks/boxes, arranged cleanly without overflow
  if (seqId === 'counting') {
    const count = item.count || item.num;
    const boxSize = count === 1 ? 32 : count === 2 ? 26 : count === 3 ? 22 : count === 4 ? 20 : count <= 6 ? 18 : 16;
    const maxWidth = count === 1 ? '36px' : count === 2 ? '62px' : count === 3 ? '78px' : count === 4 ? '48px' : count <= 6 ? '66px' : '78px';
    return (
      <div style={{
        display: 'flex',
        gap: '3px',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: maxWidth,
        padding: '2px',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${boxSize}px`,
              height: `${boxSize}px`,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '5px',
              border: '2px solid #78350f',
              boxShadow: '0 2px 4px rgba(217,119,6,0.25)',
              flexShrink: 0
            }}
          />
        ))}
      </div>
    );
  }

  // 3. ODD NUMBERS: Exact 1, 3, 5, 7, 9, 11, 13 objects with pairs + lone odd dot, completely visible
  if (seqId === 'odd_numbers') {
    const pairs = Math.floor(item.val / 2);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5px',
        padding: '2px',
        boxSizing: 'border-box'
      }}>
        {pairs > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3px',
            maxWidth: '86px'
          }}>
            {Array.from({ length: pairs }).map((_, p) => (
              <div
                key={p}
                style={{
                  display: 'flex',
                  gap: '2.5px',
                  padding: '2px 4px',
                  background: '#dbeafe',
                  borderRadius: '5px',
                  border: '1.5px solid #3b82f6',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1d4ed8', border: '1px solid #1e3a8a' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1d4ed8', border: '1px solid #1e3a8a' }} />
              </div>
            ))}
          </div>
        )}
        {/* Lone odd unit */}
        <div style={{
          padding: '2px 6px',
          background: '#fef3c7',
          borderRadius: '5px',
          border: '1.5px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d97706', border: '1px solid #78350f' }} />
        </div>
      </div>
    );
  }

  // 4. EVEN NUMBERS: Exactly 2, 4, 6, 8, 10, 12, 14 objects in clean 2-column pair grids, completely unclipped
  if (seqId === 'even_numbers') {
    const pairs = item.val / 2;
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3px',
        padding: '2px',
        maxWidth: pairs === 1 ? '44px' : '86px',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: pairs }).map((_, p) => (
          <div
            key={p}
            style={{
              display: 'flex',
              gap: '2.5px',
              padding: '2px 4px',
              background: '#fee2e2',
              borderRadius: '5px',
              border: '1.5px solid #ef4444',
              flexShrink: 0
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dc2626', border: '1px solid #7f1d1d' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dc2626', border: '1px solid #7f1d1d' }} />
          </div>
        ))}
      </div>
    );
  }

  // 5. TRIANGULAR NUMBERS: Complete triangle arrangements, 100% unclipped
  if (seqId === 'triangular') {
    const rows = item.rows;
    const triSize = rows === 1 ? 26 : rows === 2 ? 20 : rows === 3 ? 16 : rows === 4 ? 13 : rows === 5 ? 11 : rows === 6 ? 9.5 : 8.5;
    const gap = rows <= 4 ? 2 : 1.5;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${gap}px`,
        padding: '2px',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: `${gap}px`, justifyContent: 'center' }}>
            {Array.from({ length: r + 1 }).map((_, d) => (
              <svg key={d} width={triSize} height={triSize} viewBox="0 0 24 24" style={{ overflow: 'visible', flexShrink: 0 }}>
                <polygon
                  points="12,2 23,22 1,22"
                  fill="#10b981"
                  stroke="#064e3b"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // 6. SQUARE NUMBERS: Complete 1x1, 2x2, 3x3, 4x4... grids, fully visible
  if (seqId === 'squares') {
    const s = item.size;
    const tileSize = s === 1 ? 44 : s === 2 ? 22 : s === 3 ? 16 : s === 4 ? 12 : s === 5 ? 10 : s === 6 ? 8.5 : 7.5;
    const gap = s <= 4 ? 2 : 1.5;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${s}, ${tileSize}px)`,
        gap: `${gap}px`,
        padding: '2.5px',
        background: 'rgba(217, 119, 6, 0.08)',
        borderRadius: '6px',
        border: '1.5px solid #d97706',
        boxShadow: '0 2px 5px rgba(217,119,6,0.18)',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: s * s }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '2px',
              border: '1px solid #78350f',
              boxSizing: 'border-box'
            }}
          />
        ))}
      </div>
    );
  }

  // 7. CUBE NUMBERS: Complete 3D cube structures with full structure visible
  if (seqId === 'cubes') {
    return renderIsometricCube(item.size);
  }

  // 8. VIRAHANKA NUMBERS: Visuals representing previous-two-number addition, completely visible
  if (seqId === 'virahanka') {
    if (item.type === 'base') {
      return (
        <div style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px'
        }}>
          {Array.from({ length: item.val }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '28px',
                height: '34px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1.2rem',
                border: '1.5px solid #0369a1',
                boxShadow: '0 2px 5px rgba(2,132,199,0.25)'
              }}
            >
              1
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        padding: '2px 5px',
        background: 'rgba(2,132,199,0.08)',
        borderRadius: '7px',
        border: '1.5px solid #38bdf8',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{
            padding: '1px 5px',
            borderRadius: '4px',
            background: '#e0f2fe',
            border: '1.2px solid #0284c7',
            fontWeight: 900,
            fontSize: '0.85rem',
            color: '#0369a1',
            lineHeight: 1.1
          }}>
            {item.p1}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#0284c7' }}>+</span>
          <span style={{
            padding: '1px 5px',
            borderRadius: '4px',
            background: '#e0f2fe',
            border: '1.2px solid #0284c7',
            fontWeight: 900,
            fontSize: '0.85rem',
            color: '#0369a1',
            lineHeight: 1.1
          }}>
            {item.p2}
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0284c7', lineHeight: 1 }}>
          ⬇
        </div>
        <div style={{
          padding: '2px 8px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          borderRadius: '5px',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '1.18rem',
          lineHeight: 1.1,
          boxShadow: '0 2px 5px rgba(2,132,199,0.25)',
          border: '1.2px solid #075985'
        }}>
          {item.num}
        </div>
      </div>
    );
  }

  // 9. POWERS OF 2: Complete doubling visual (1 → 2 → 4 → 8 → 16 → 32 → 64), 100% visible
  if (seqId === 'powers_of_2') {
    const count = Math.pow(2, item.power);
    const cols = count === 1 ? 1 : count === 2 ? 2 : count === 4 ? 2 : count === 8 ? 4 : count === 16 ? 4 : 8;
    const bSize = count === 1 ? 36 : count === 2 ? 24 : count === 4 ? 18 : count === 8 ? 14 : count === 16 ? 11 : count === 32 ? 8 : 7;
    const gap = count >= 32 ? 1.2 : 2;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${bSize}px)`,
        gap: `${gap}px`,
        padding: '2.5px',
        background: 'rgba(219, 39, 119, 0.08)',
        borderRadius: '6px',
        border: '1.5px solid #db2777',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${bSize}px`,
              height: `${bSize}px`,
              background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
              borderRadius: '2px',
              border: '1px solid #831843',
              boxSizing: 'border-box'
            }}
          />
        ))}
      </div>
    );
  }

  // 10. POWERS OF 3: Complete tripling visual, fully visible and unclipped
  if (seqId === 'powers_of_3') {
    const power = item.power;
    if (power === 0) {
      return (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
          border: '2px solid #115e59',
          boxShadow: '0 2px 5px rgba(13,148,136,0.3)'
        }} />
      );
    }
    if (power === 1) {
      return (
        <div style={{
          display: 'flex',
          gap: '3px',
          padding: '3px 6px',
          background: 'rgba(13,148,136,0.1)',
          borderRadius: '6px',
          border: '1.5px solid #0d9488'
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0d9488', border: '1.5px solid #115e59' }} />
          ))}
        </div>
      );
    }
    if (power === 2) {
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 14px)',
          gap: '2.5px',
          padding: '3.5px',
          background: 'rgba(13,148,136,0.08)',
          borderRadius: '6px',
          border: '1.5px solid #0d9488'
        }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#0d9488', border: '1.5px solid #115e59' }} />
          ))}
        </div>
      );
    }
    if (power === 3) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5px',
          padding: '2.5px 3px',
          background: 'rgba(13,148,136,0.08)',
          borderRadius: '6px',
          border: '1.5px solid #0d9488',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[0, 1].map((c) => (
              <div key={c} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 7.5px)',
                gap: '1.2px',
                padding: '2px',
                background: 'rgba(13,148,136,0.2)',
                borderRadius: '3px',
                border: '1px solid #14b8a6'
              }}>
                {Array.from({ length: 9 }).map((_, d) => (
                  <div key={d} style={{ width: '7.5px', height: '7.5px', borderRadius: '50%', background: '#0d9488', border: '1px solid #115e59' }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 7.5px)',
            gap: '1.2px',
            padding: '2px',
            background: 'rgba(13,148,136,0.2)',
            borderRadius: '3px',
            border: '1px solid #14b8a6'
          }}>
            {Array.from({ length: 9 }).map((_, d) => (
              <div key={d} style={{ width: '7.5px', height: '7.5px', borderRadius: '50%', background: '#0d9488', border: '1px solid #115e59' }} />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 5.5px)',
        gap: '1.2px',
        padding: '2.5px',
        background: 'rgba(13,148,136,0.1)',
        borderRadius: '5px',
        border: '1.5px solid #0d9488',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: 81 }).map((_, i) => (
          <div key={i} style={{ width: '5.5px', height: '5.5px', borderRadius: '50%', background: '#0d9488', border: '0.5px solid #115e59' }} />
        ))}
      </div>
    );
  }

  return null;
};

export default function PatternsInNumbersExplore({ onClose, onCompleteNode }) {
  // Navigation Tabs: 'opening' | 'lab' | 'discover' | 'figure_it_out'
  const [activeTab, setActiveTab] = useState('opening');

  // Lab State
  const [activeSeqId, setActiveSeqId] = useState('counting');
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isAutoTour, setIsAutoTour] = useState(false);

  // Predict & Discover State (Step 1 Observe -> Step 2 Predict -> Step 3 Discover)
  const [predictSeqId, setPredictSeqId] = useState('squares');
  const [predictInputs, setPredictInputs] = useState(['', '', '']);
  const [isChoiceCorrect, setIsChoiceCorrect] = useState(false);
  const [inputErrors, setInputErrors] = useState([false, false, false]);
  const [predictErrorMessage, setPredictErrorMessage] = useState('');

  // Figure It Out State
  const [fioSeqId, setFioSeqId] = useState('all_ones');
  const [fioInputs, setFioInputs] = useState(['', '', '']);
  const [fioRuleInput, setFioRuleInput] = useState('');
  const [fioSubmitted, setFioSubmitted] = useState(false);
  const [fioSuccess, setFioSuccess] = useState(false);

  const videoRef = useRef(null);
  const predictVideoRef = useRef(null);

  const currentSequence = SEQUENCES.find((s) => s.id === activeSeqId) || SEQUENCES[1];
  const currentPredictSeq = SEQUENCES.find((s) => s.id === predictSeqId) || SEQUENCES[5];
  const currentVisualPattern = VISUAL_PATTERNS_DATA[predictSeqId] || VISUAL_PATTERNS_DATA.squares;
  const currentFioSeq = SEQUENCES.find((s) => s.id === fioSeqId) || SEQUENCES[0];

  // Predict & Discover Handlers
  const handleSelectPredictSeq = (seqId) => {
    setPredictSeqId(seqId);
    setPredictInputs(['', '', '']);
    setIsChoiceCorrect(false);
    setInputErrors([false, false, false]);
    setPredictErrorMessage('');
  };

  const handleCheckPredictAnswers = () => {
    const seq = VISUAL_PATTERNS_DATA[predictSeqId];
    if (!seq) return;
    const expected = seq.expectedAnswers;
    const alt = seq.alternateAnswers || null;

    const trimmed = predictInputs.map((v) => v.trim());
    if (trimmed.some((v) => v === '')) {
      setPredictErrorMessage('Please enter all 3 consecutive next numbers in the boxes.');
      return;
    }

    const nums = trimmed.map((v) => parseInt(v, 10));
    const isPrimaryMatch = nums.every((n, i) => n === expected[i]);
    const isAltMatch = alt ? nums.every((n, i) => n === alt[i]) : false;

    if (isPrimaryMatch || isAltMatch) {
      setIsChoiceCorrect(true);
      setInputErrors([false, false, false]);
      setPredictErrorMessage('');
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 }
      });
    } else {
      const target = isAltMatch ? alt : expected;
      const errs = nums.map((n, i) => n !== target[i]);
      setInputErrors(errs);
      setPredictErrorMessage('Almost! Check the numbers highlighted in red and try again.');
    }
  };

  const handleNextPredictSeq = () => {
    const currIdx = SEQUENCES.findIndex((s) => s.id === predictSeqId);
    const nextSeq = SEQUENCES[(currIdx + 1) % SEQUENCES.length];
    handleSelectPredictSeq(nextSeq.id);
  };

  // Handle Figure It Out submission / validation (Stays strictly on the Figure It Out page)
  const handleCheckFio = () => {
    const expected = currentFioSeq.predictAnswers;
    const n0 = parseInt(fioInputs[0].trim(), 10);
    const n1 = parseInt(fioInputs[1].trim(), 10);
    const n2 = parseInt(fioInputs[2].trim(), 10);

    const isMatch = (
      (!isNaN(n0) && !isNaN(n1) && !isNaN(n2)) &&
      ((n0 === expected[0] && n1 === expected[1] && n2 === expected[2]) ||
       (currentFioSeq.id === 'cubes' && n0 === 125 && n1 === 216 && n2 === 343))
    );

    if (isMatch) {
      setFioSuccess(true);
      setFioSubmitted(true);
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 }
      });
      // Do not navigate away - stay on Figure It Out page
    } else {
      setFioSuccess(false);
      setFioSubmitted(true);
    }
  };

  // Advance Figure It Out to next sequence in the exact prescribed order
  const handleNextFioSeq = () => {
    const currIdx = SEQUENCES.findIndex((s) => s.id === fioSeqId);
    const nextSeq = SEQUENCES[(currIdx + 1) % SEQUENCES.length];
    setFioSeqId(nextSeq.id);
    setFioInputs(['', '', '']);
    setFioRuleInput('');
    setFioSubmitted(false);
    setFioSuccess(false);
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

        {/* Mode Switcher Tabs */}
        <nav style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
          {[
            { id: 'opening', label: '🏙️ 1. Patterns Are Everywhere' },
            { id: 'lab', label: '🔢 2. Number Pattern Lab' },
            { id: 'discover', label: '🔍 3. Predict & Discover' },
            { id: 'concept', label: '💡 4. Concept' },
            { id: 'figure_it_out', label: '✍️ 5. Figure It Out' }
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
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '16px'
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
                    fontSize: 'clamp(1.95rem, 2.35vw, 2.75rem)',
                    fontWeight: 900,
                    color: '#091124',
                    lineHeight: 1.15
                  }}>
                    Patterns Are Everywhere!
                  </h1>
                  <p style={{
                    margin: '0 0 14px 0',
                    fontSize: 'clamp(1.25rem, 1.42vw, 1.6rem)',
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
                    padding: '16px 20px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                  }}>
                    <h3 style={{
                      margin: '0 0 6px 0',
                      fontSize: 'clamp(1.45rem, 1.65vw, 1.9rem)',
                      fontWeight: 900,
                      color: '#0f172a'
                    }}>
                      What is Number Theory?
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(1.22rem, 1.36vw, 1.55rem)',
                      fontWeight: 700,
                      color: '#334155',
                      lineHeight: 1.45
                    }}>
                      The branch of Mathematics that studies patterns in whole numbers is called <strong>Number Theory</strong>. Number sequences are among the most basic and fascinating types of patterns that mathematicians study!
                    </p>
                  </div>
                </div>

                {/* Interactive Question Card */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  border: '2.5px solid #3b82f6',
                  borderRadius: '14px',
                  padding: '22px 24px',
                  boxShadow: '0 6px 18px rgba(59, 130, 246, 0.15)'
                }}>
                  <div>
                    <h3 style={{
                      margin: '0 0 10px 0',
                      fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)',
                      fontWeight: 900,
                      color: '#1e3a8a'
                    }}>
                      ❓ Can You Spot the Pattern?
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(1.3rem, 1.5vw, 1.7rem)',
                      fontWeight: 700,
                      color: '#1e40af',
                      lineHeight: 1.48
                    }}>
                      Watch real educational tabletop clips where physical objects are placed, grouped, stacked, and arranged into mathematical sequences!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lab')}
                    style={{
                      width: '100%',
                      padding: '16px 28px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: 'clamp(1.35rem, 1.55vw, 1.75rem)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                      fontFamily: '"Times New Roman", Times, Georgia, serif'
                    }}
                  >
                    <span>Enter Number Pattern Lab</span>
                    <ChevronRight size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 2: NUMBER PATTERN LAB ═══════════════ */}
        {activeTab === 'lab' && (
          <NumberPatternLab />
        )}

        {/* ═══════════════ TAB 3: PREDICT & DISCOVER ═══════════════ */}
        {activeTab === 'discover' && (
          <div style={{
            flex: 1,
            height: 'calc(100vh - 56px)',
            maxHeight: 'calc(100vh - 56px)',
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            padding: '8px 14px 10px 14px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* ── LEFT SIDEBAR: 10 SEQUENCE OPTIONS VERTICALLY (NO SCROLLBAR) ── */}
            <div style={{
              width: '245px',
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '3px',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}>
              <div style={{
                padding: '2px 4px 5px 4px',
                borderBottom: '2px solid #cbd5e1',
                marginBottom: '1px',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#78350f',
                  background: '#fef3c7',
                  border: '1.5px solid #d97706',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  display: 'inline-block'
                }}>
                  Step 1: Choose Sequence
                </span>
                <h3 style={{
                  margin: '3px 0 0 0',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  color: '#1e3a8a'
                }}>
                  10 Number Patterns
                </h3>
              </div>

              {SEQUENCES.map((s) => {
                const isSelected = predictSeqId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectPredictSeq(s.id)}
                    style={{
                      flex: 1,
                      minHeight: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '3px 10px',
                      background: isSelected ? 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)' : '#ffffff',
                      border: isSelected ? `2.5px solid ${s.accentColor}` : '1.5px solid #cbd5e1',
                      borderLeft: isSelected ? `7px solid ${s.accentColor}` : '3px solid #cbd5e1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                      boxShadow: isSelected ? `0 3px 10px ${s.accentColor}25` : 'none',
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <span style={{ fontSize: '1.35rem', flexShrink: 0 }}>{s.emoji}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: '1.15rem',
                          fontWeight: 900,
                          color: isSelected ? s.accentColor : '#1e293b',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {s.title}
                        </div>
                        <div style={{
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          color: isSelected ? s.accentColor : '#64748b',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {s.sequenceDisplay.slice(0, 15)}...
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} color={isSelected ? s.accentColor : '#64748b'} style={{ flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>

            {/* ── RIGHT MAIN PANEL: 1. OBSERVE → 2. PREDICT → 3. DISCOVER (NO SCROLLBAR) ── */}
            <div style={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '6px',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}>
              {/* Top Workflow Breadcrumb / Stage Tracker */}
              <div style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '12px',
                padding: '5px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.65rem' }}>{currentVisualPattern.emoji}</span>
                  <div>
                    <h2 style={{
                      margin: 0,
                      fontSize: '1.65rem',
                      fontWeight: 900,
                      color: '#1e3a8a'
                    }}>
                      {currentVisualPattern.title}
                    </h2>
                  </div>
                </div>

                {/* 1. OBSERVE → 2. PREDICT → 3. DISCOVER Steps Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    padding: '4px 14px',
                    background: '#eff6ff',
                    border: '2px solid #2563eb',
                    borderRadius: '20px',
                    fontWeight: 900,
                    fontSize: '1.12rem',
                    color: '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>👀</span>
                    <span>1. OBSERVE</span>
                  </div>

                  <span style={{ color: '#64748b', fontWeight: 900, fontSize: '1.2rem' }}>➔</span>

                  <div style={{
                    padding: '4px 14px',
                    background: isChoiceCorrect ? '#f1f5f9' : '#fef3c7',
                    border: `2px solid ${isChoiceCorrect ? '#94a3b8' : '#f59e0b'}`,
                    borderRadius: '20px',
                    fontWeight: 900,
                    fontSize: '1.12rem',
                    color: isChoiceCorrect ? '#64748b' : '#b45309',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>❓</span>
                    <span>2. PREDICT</span>
                  </div>

                  <span style={{ color: '#64748b', fontWeight: 900, fontSize: '1.2rem' }}>➔</span>

                  <div style={{
                    padding: '4px 14px',
                    background: isChoiceCorrect ? '#d1fae5' : '#f8fafc',
                    border: `2px solid ${isChoiceCorrect ? '#10b981' : '#cbd5e1'}`,
                    borderRadius: '20px',
                    fontWeight: 900,
                    fontSize: '1.12rem',
                    color: isChoiceCorrect ? '#047857' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isChoiceCorrect ? '0 2px 8px rgba(16,185,129,0.25)' : 'none'
                  }}>
                    <span>💡</span>
                    <span>3. DISCOVER</span>
                  </div>
                </div>
              </div>

              {/* Main Visual Display Card */}
              <div style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '14px',
                padding: '8px 14px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '6px',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                {/* ── 1. OBSERVE SECTION: 7 STEP CARDS (4 GIVEN + 3 MYSTERIES) ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.45rem',
                      fontWeight: 900,
                      color: '#1e3a8a'
                    }}>
                      1. OBSERVE
                    </h3>
                    <span style={{ fontSize: '1.12rem', color: '#0f766e', fontWeight: 800 }}>
                      Study how the mathematical shapes grow
                    </span>
                  </div>

                  {/* Horizontal Step Cards Sequence: 4 steps + 3 mysteries (7 cards total, all visible at once) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '5px 8px',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                  }}>
                    {/* 1. Render Given Steps (Step 1 to Step 4) */}
                    {currentVisualPattern.steps.map((step, idx) => (
                      <React.Fragment key={`step-${idx}`}>
                        <div style={{
                          flex: 1,
                          minWidth: 0,
                          height: '190px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '5px 4px 4px 4px',
                          background: '#ffffff',
                          border: '2px solid #cbd5e1',
                          borderRadius: '10px',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
                          boxSizing: 'border-box',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          {/* Top: STEP N (Contrasting Dark Blue) */}
                          <span style={{
                            fontSize: '0.95rem',
                            fontWeight: 900,
                            color: '#1e3a8a',
                            letterSpacing: '0.04em',
                            lineHeight: 1.1,
                            flexShrink: 0
                          }}>
                            STEP {idx + 1}
                          </span>

                          {/* Center: Large Visual (Dedicated Height Zone, Completely Contained) */}
                          <div style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '86px',
                            maxHeight: '94px',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                            padding: '1px 0'
                          }}>
                            {renderVisualItem(predictSeqId, step, currentVisualPattern.accentColor)}
                          </div>

                          {/* Bottom: Large Number (Orange / Golden Accent, Clear Separation) */}
                          <div style={{
                            fontSize: '2.45rem',
                            fontWeight: 900,
                            color: '#c2410c',
                            lineHeight: 1,
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            fontFamily: '"Times New Roman", Times, Georgia, serif'
                          }}>
                            {step.num}
                          </div>
                        </div>

                        {/* Arrow (Medium Blue/Grey) */}
                        <span style={{ fontSize: '1.45rem', color: '#64748b', fontWeight: 900, flexShrink: 0 }}>➔</span>
                      </React.Fragment>
                    ))}

                    {/* 2. Render 3 Consecutive Mystery / Revealed Cards (Next 1, Next 2, Next 3) */}
                    {currentVisualPattern.mysteries.map((mystery, mIdx) => {
                      const isRevealed = isChoiceCorrect;
                      return (
                        <React.Fragment key={`mystery-${mIdx}`}>
                          <div style={{
                            flex: 1,
                            minWidth: 0,
                            height: '190px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '5px 4px 4px 4px',
                            background: isRevealed
                              ? 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)'
                              : '#ffffff',
                            border: isRevealed
                              ? '2.5px solid #10b981'
                              : '2.5px dashed #f59e0b',
                            borderRadius: '10px',
                            boxShadow: isRevealed
                              ? '0 4px 14px rgba(16,185,129,0.25)'
                              : '0 3px 8px rgba(245,158,11,0.15)',
                            boxSizing: 'border-box',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                          }}>
                            {/* Top: Next # (Orange/Golden Accent, or Emerald when revealed) */}
                            <span style={{
                              fontSize: '0.95rem',
                              fontWeight: 900,
                              color: isRevealed ? '#047857' : '#b45309',
                              letterSpacing: '0.04em',
                              lineHeight: 1.1,
                              flexShrink: 0
                            }}>
                              {isRevealed ? `NEXT #${mIdx + 1} ✓` : `NEXT #${mIdx + 1}`}
                            </span>

                            {/* Center: Unclipped Drawing Area (Dedicated Height Zone, Completely Contained) */}
                            <div style={{
                              flex: 1,
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '86px',
                              maxHeight: '94px',
                              overflow: 'hidden',
                              boxSizing: 'border-box',
                              padding: '1px 0'
                            }}>
                              {isRevealed ? (
                                renderVisualItem(predictSeqId, mystery, currentVisualPattern.accentColor)
                              ) : (
                                <div style={{
                                  width: '52px',
                                  height: '52px',
                                  borderRadius: '50%',
                                  background: '#fef3c7',
                                  border: '2.5px dashed #f59e0b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '2.4rem',
                                  fontWeight: 900,
                                  color: '#d97706',
                                  boxShadow: '0 3px 8px rgba(217,119,6,0.18)'
                                }}>
                                  ?
                                </div>
                              )}
                            </div>

                            {/* Bottom: Number (Orange/Golden Accent, or Emerald when revealed, Clear Separation) */}
                            <div style={{
                              fontSize: '2.45rem',
                              fontWeight: 900,
                              color: isRevealed ? '#047857' : '#d97706',
                              lineHeight: 1,
                              height: '38px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}>
                              {isRevealed ? mystery.num : '?'}
                            </div>
                          </div>

                          {mIdx < 2 && (
                            <span style={{ fontSize: '1.45rem', color: '#64748b', fontWeight: 900, flexShrink: 0 }}>➔</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* ── 2. PREDICT SECTION: "What comes next?" — 3 CONSECUTIVE NUMBER INPUTS ── */}
                <div style={{
                  padding: '8px 14px',
                  background: '#f8fafc',
                  border: '2px solid #cbd5e1',
                  borderRadius: '12px',
                  flexShrink: 0,
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.45rem',
                      fontWeight: 900,
                      color: '#1e3a8a'
                    }}>
                      2. PREDICT: What comes next?
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '1.18rem',
                      fontWeight: 900,
                      color: '#0f766e'
                    }}>
                      Enter the next THREE consecutive numbers in the sequence:
                    </p>
                  </div>

                  {/* 3 Separate Input Boxes + Submit Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {[0, 1, 2].map((idx) => (
                      <React.Fragment key={idx}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.12rem', fontWeight: 900, color: '#b45309' }}>
                            Next #{idx + 1}:
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={predictInputs[idx]}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              setPredictInputs((prev) => {
                                const u = [...prev];
                                u[idx] = val;
                                return u;
                              });
                              setInputErrors((prev) => {
                                const u = [...prev];
                                u[idx] = false;
                                return u;
                              });
                              setPredictErrorMessage('');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCheckPredictAnswers();
                              }
                            }}
                            disabled={isChoiceCorrect}
                            placeholder="?"
                            style={{
                              width: '88px',
                              height: '48px',
                              textAlign: 'center',
                              fontSize: '2.2rem',
                              fontWeight: 900,
                              color: isChoiceCorrect ? '#047857' : inputErrors[idx] ? '#dc2626' : '#0e7490',
                              background: isChoiceCorrect ? '#ecfdf5' : inputErrors[idx] ? '#fef2f2' : '#f0fdfa',
                              border: `2.5px solid ${isChoiceCorrect ? '#10b981' : inputErrors[idx] ? '#ef4444' : '#0e7490'}`,
                              borderRadius: '10px',
                              outline: 'none',
                              boxShadow: isChoiceCorrect ? '0 3px 10px rgba(16,185,129,0.22)' : '0 2px 6px rgba(14,116,144,0.12)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          />
                        </div>
                        {idx < 2 && (
                          <span style={{ fontSize: '1.5rem', color: '#64748b', fontWeight: 900 }}>➔</span>
                        )}
                      </React.Fragment>
                    ))}

                    {/* Check / Submit Button */}
                    {!isChoiceCorrect ? (
                      <button
                        type="button"
                        onClick={handleCheckPredictAnswers}
                        style={{
                          marginLeft: 'auto',
                          padding: '10px 24px',
                          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(217,119,6,0.35)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Times New Roman", Times, Georgia, serif'
                        }}
                      >
                        <span>Check Answers</span>
                        <span>✓</span>
                      </button>
                    ) : (
                      <div style={{
                        marginLeft: 'auto',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 18px',
                        background: '#d1fae5',
                        border: '2px solid #10b981',
                        borderRadius: '10px',
                        color: '#047857',
                        fontWeight: 900,
                        fontSize: '1.2rem'
                      }}>
                        <span>✓ All 3 Answers Correct!</span>
                      </div>
                    )}
                  </div>

                  {predictErrorMessage && (
                    <p style={{
                      margin: '5px 0 0 0',
                      color: '#dc2626',
                      fontWeight: 900,
                      fontSize: '1.1rem'
                    }}>
                      ⚠️ {predictErrorMessage}
                    </p>
                  )}
                </div>

                {/* ── 3. DISCOVER SECTION: COMPLETED PATTERN WITH SHORT RULE ── */}
                {isChoiceCorrect && (
                  <div style={{
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    border: '2.5px solid #10b981',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#047857', lineHeight: 1 }}>
                        {currentVisualPattern.mysteries.map((m) => m.num).join(', ')}
                      </span>
                      <span style={{
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        color: '#047857',
                        background: '#ffffffea',
                        padding: '3px 14px',
                        borderRadius: '16px',
                        border: '2px solid #10b981'
                      }}>
                        {currentVisualPattern.equation}
                      </span>
                      <span style={{
                        fontSize: '1.28rem',
                        fontWeight: 900,
                        color: '#064e3b'
                      }}>
                        Rule: {currentVisualPattern.rule}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextPredictSeq}
                      style={{
                        padding: '10px 22px',
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
                        fontFamily: '"Times New Roman", Times, Georgia, serif'
                      }}
                    >
                      <span>Next Pattern</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 4: CONCEPT (3 REAL-WORLD INTERACTIVE MODULES) ═══════════════ */}
        {activeTab === 'concept' && (
          <ConceptExplorationModules />
        )}

        {/* ═══════════════ TAB 5: FIGURE IT OUT ═══════════════ */}
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

            {/* Sequence Selector Chips (1 to 10 in exact prescribed order) */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {SEQUENCES.map((s, idx) => (
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
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {idx + 1}. {s.emoji} {s.title}
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
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#78350f',
                  background: '#fef3c7',
                  border: '1.5px solid #d97706',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  marginBottom: '6px'
                }}>
                  Pattern {SEQUENCES.findIndex((s) => s.id === fioSeqId) + 1} of 10
                </span>
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
                        setFioSubmitted(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckFio();
                      }}
                      style={{
                        width: '120px',
                        height: '52px',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        textAlign: 'center',
                        border: fioSubmitted
                          ? (fioSuccess ? '2.5px solid #10b981' : '2.5px solid #dc2626')
                          : '2px solid #64748b',
                        background: fioSubmitted
                          ? (fioSuccess ? '#ecfdf5' : '#fef2f2')
                          : '#ffffff',
                        color: fioSubmitted
                          ? (fioSuccess ? '#047857' : '#dc2626')
                          : '#0f172a',
                        borderRadius: '8px',
                        outline: 'none',
                        boxShadow: fioSubmitted
                          ? (fioSuccess ? '0 2px 8px rgba(16, 185, 129, 0.2)' : '0 2px 8px rgba(220, 38, 38, 0.2)')
                          : 'none',
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

              {/* Validation Feedback Banner */}
              {fioSubmitted && (
                <div style={{
                  padding: '14px 20px',
                  borderRadius: '12px',
                  background: fioSuccess ? '#d1fae5' : '#fef2f2',
                  border: `2.5px solid ${fioSuccess ? '#10b981' : '#dc2626'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: fioSuccess ? '0 4px 14px rgba(16,185,129,0.22)' : '0 4px 14px rgba(220,38,38,0.18)',
                  animation: 'fadeIn 0.25s ease-in-out'
                }}>
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: fioSuccess ? '#047857' : '#dc2626',
                    flexShrink: 0
                  }}>
                    {fioSuccess ? '✓' : '✗'}
                  </span>
                  <div>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1.55rem',
                      fontWeight: 900,
                      color: fioSuccess ? '#065f46' : '#991b1b',
                      letterSpacing: '0.02em'
                    }}>
                      {fioSuccess ? '✓ Correct Answer!' : '✗ Wrong Answer. Try Again!'}
                    </h4>
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: fioSuccess ? '#047857' : '#b91c1c'
                    }}>
                      {fioSuccess
                        ? `Next three numbers: ${currentFioSeq.predictAnswers.join(', ')}. Discovered Rule: “${currentFioSeq.rule}”`
                        : `Please recheck your numbers for this pattern and try again.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons: CHECK ANSWER & NEXT PATTERN */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={handleCheckFio}
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>✓</span>
                  <span>CHECK ANSWER</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFioSeq}
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>→</span>
                  <span>NEXT PATTERN</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
