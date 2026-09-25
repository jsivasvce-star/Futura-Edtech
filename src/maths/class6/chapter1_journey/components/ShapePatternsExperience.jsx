import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, CheckCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import './pattern-lab.css';
import './shape-patterns.css';

// ═══════════════════════════════════════════════════════════════════════════
// HIGH-CONTRAST VECTOR GEOMETRIC SHAPES FOR CREAMY-WHITE EDUCATIONAL THEME
// ═══════════════════════════════════════════════════════════════════════════

// 1. Regular Polygon Generator
function PolygonSVG({ sides, accentColor = '#0284c7' }) {
  const cx = 52;
  const cy = 52;
  const r = 38;
  const points = [];
  const initialOffset = sides % 2 === 1 ? -Math.PI / 2 : (sides === 4 ? -Math.PI / 4 : -Math.PI / 2 + Math.PI / sides);

  for (let i = 0; i < sides; i++) {
    const angle = initialOffset + (i * 2 * Math.PI) / sides;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push([x, y]);
  }

  const pointsStr = points.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <svg viewBox="0 0 104 104" width="100%" height="100%" style={{ overflow: 'visible' }}>
      <polygon
        points={pointsStr}
        fill={accentColor}
        fillOpacity="0.09"
        stroke={accentColor}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {points.map((p, idx) => (
        <circle
          key={idx}
          cx={p[0]}
          cy={p[1]}
          r="4"
          fill="#ffffff"
          stroke={accentColor}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

// 2. Complete Graph Kn Generator
function CompleteGraphSVG({ points: numPoints, accentColor = '#db2777' }) {
  const cx = 52;
  const cy = 52;
  const r = 36;
  const vertices = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / numPoints;
    vertices.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }

  const edges = [];
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
      edges.push([vertices[i], vertices[j]]);
    }
  }

  return (
    <svg viewBox="0 0 104 104" width="100%" height="100%" style={{ overflow: 'visible' }}>
      {edges.map((e, idx) => (
        <line
          key={`edge-${idx}`}
          x1={e[0][0]}
          y1={e[0][1]}
          x2={e[1][0]}
          y2={e[1][1]}
          stroke={accentColor}
          strokeWidth="2"
          strokeOpacity="0.8"
        />
      ))}
      {vertices.map((v, idx) => (
        <circle
          key={`vert-${idx}`}
          cx={v[0]}
          cy={v[1]}
          r="4.5"
          fill="#e11d48"
          stroke="#ffffff"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

// 3. Stacked Squares Generator
function StackedSquaresSVG({ n }) {
  const totalSize = 74;
  const cx = 52;
  const cy = 52;
  const startX = cx - totalSize / 2;
  const startY = cy - totalSize / 2;
  const gap = n > 4 ? 2 : 2.5;
  const tileSize = (totalSize - (n - 1) * gap) / n;

  const rects = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      rects.push({
        x: startX + c * (tileSize + gap),
        y: startY + r * (tileSize + gap),
        size: tileSize
      });
    }
  }

  return (
    <svg viewBox="0 0 104 104" width="100%" height="100%">
      {rects.map((rc, idx) => (
        <rect
          key={idx}
          x={rc.x}
          y={rc.y}
          width={rc.size}
          height={rc.size}
          rx={Math.min(3, rc.size * 0.22)}
          fill="#f59e0b"
          fillOpacity="0.9"
          stroke="#d97706"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

// 4. Stacked Triangles Generator
function StackedTrianglesSVG({ rows }) {
  const totalWidth = 76;
  const totalHeight = 66;
  const cx = 52;
  const cy = 52;
  const topY = cy - totalHeight / 2;
  const rowHeight = totalHeight / rows;
  const baseWidth = totalWidth / rows;

  const triangles = [];

  for (let r = 0; r < rows; r++) {
    const rowY = topY + r * rowHeight;
    const countUp = r + 1;
    const countDown = r;
    const rowStartX = cx - (countUp * baseWidth) / 2;

    for (let i = 0; i < countUp; i++) {
      const x0 = rowStartX + i * baseWidth;
      const x1 = x0 + baseWidth;
      const xMid = x0 + baseWidth / 2;
      const yBottom = rowY + rowHeight;
      const yTop = rowY;
      triangles.push({
        points: `${x0},${yBottom} ${x1},${yBottom} ${xMid},${yTop}`,
        isUp: true
      });
    }

    for (let i = 0; i < countDown; i++) {
      const xMid = rowStartX + i * baseWidth + baseWidth / 2;
      const x0 = xMid;
      const x1 = x0 + baseWidth;
      const xApex = x0 + baseWidth / 2;
      const yTop = rowY;
      const yBottom = rowY + rowHeight;
      triangles.push({
        points: `${x0},${yTop} ${x1},${yTop} ${xApex},${yBottom}`,
        isUp: false
      });
    }
  }

  return (
    <svg viewBox="0 0 104 104" width="100%" height="100%">
      {triangles.map((t, idx) => (
        <polygon
          key={idx}
          points={t.points}
          fill={t.isUp ? '#10b981' : '#047857'}
          stroke="#059669"
          strokeWidth="1.2"
          fillOpacity={t.isUp ? 0.95 : 0.85}
        />
      ))}
    </svg>
  );
}

// 5. Koch Snowflake Generator
function generateKochPoints(p1, p2, depth) {
  if (depth === 0) return [p1, p2];
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const pA = [p1[0] + dx / 3, p1[1] + dy / 3];
  const pB = [p1[0] + (2 * dx) / 3, p1[1] + (2 * dy) / 3];
  const angle = -Math.PI / 3;
  const peakX = pA[0] + (dx / 3) * Math.cos(angle) - (dy / 3) * Math.sin(angle);
  const peakY = pA[1] + (dx / 3) * Math.sin(angle) + (dy / 3) * Math.cos(angle);
  const pPeak = [peakX, peakY];

  return [
    ...generateKochPoints(p1, pA, depth - 1).slice(0, -1),
    ...generateKochPoints(pA, pPeak, depth - 1).slice(0, -1),
    ...generateKochPoints(pPeak, pB, depth - 1).slice(0, -1),
    ...generateKochPoints(pB, p2, depth - 1)
  ];
}

function KochSnowflakeSVG({ depth, count }) {
  const cx = 52;
  const cy = 52;
  const r = 38;

  const v1 = [cx, cy - r];
  const v2 = [cx + r * Math.sin((2 * Math.PI) / 3), cy - r * Math.cos((2 * Math.PI) / 3)];
  const v3 = [cx - r * Math.sin((2 * Math.PI) / 3), cy - r * Math.cos((2 * Math.PI) / 3)];

  const edge1 = generateKochPoints(v1, v2, Math.min(depth, 3));
  const edge2 = generateKochPoints(v2, v3, Math.min(depth, 3));
  const edge3 = generateKochPoints(v3, v1, Math.min(depth, 3));

  const allPoints = [...edge1.slice(0, -1), ...edge2.slice(0, -1), ...edge3];
  const pointsStr = allPoints.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <svg viewBox="0 0 104 104" width="100%" height="100%">
      <polygon
        points={pointsStr}
        fill="rgba(99, 102, 241, 0.1)"
        stroke="#4f46e5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g transform="translate(52, 52)">
        <circle r="15" fill="#ede9fe" stroke="#6366f1" strokeWidth="1.8" />
        <text
          y="4.5"
          textAnchor="middle"
          fill="#3730a3"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          {count}
        </text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 1.5 CONCEPTS DATASET (AUTHENTIC TABLE 3 SHAPE SEQUENCES)
// ═══════════════════════════════════════════════════════════════════════════
const CONCEPTS = [
  {
    id: 1,
    title: 'Regular polygons',
    subtitle: 'One more side. One more corner.',
    accentColor: '#0284c7',
    watchSubtext: 'Triangle, square, pentagon, hexagon, heptagon... Every side is the same length.',
    watchInstruction: 'Count the sides of each shape. What changes from one shape to the next?',
    question: 'How many sides will the next shape have?',
    sequenceClue: '3, 4, 5, 6, 7 sides so far.',
    options: [7, 8, 9],
    correctOption: 8,
    explanation: 'An octagon: 8 equal sides, 8 corners.',
    discoveredConcept: 'An octagon: 8 equal sides, 8 corners.',
    completeSequence: '3, 4, 5, 6, 7, 8 sides',
    discoveredRule: 'The rule: add one side (and one corner) each time. The sequence of sides is 3, 4, 5, 6, 7, 8... — the counting numbers, starting at 3.',
    nextLabel: 'Complete graphs',
    terms: [
      { stepLabel: 'PICTURE 1', label: '3 sides', type: 'polygon', sides: 3 },
      { stepLabel: 'PICTURE 2', label: '4 sides', type: 'polygon', sides: 4 },
      { stepLabel: 'PICTURE 3', label: '5 sides', type: 'polygon', sides: 5 },
      { stepLabel: 'PICTURE 4', label: '6 sides', type: 'polygon', sides: 6 },
      { stepLabel: 'PICTURE 5', label: '7 sides', type: 'polygon', sides: 7 },
      { stepLabel: 'PICTURE 6', label: '8 sides', type: 'polygon', sides: 8 }
    ],
    connector: '+1'
  },
  {
    id: 2,
    title: 'Complete graphs',
    subtitle: 'Every point joined to every other point.',
    accentColor: '#db2777',
    watchSubtext: 'Every pair of points is connected by a straight line.',
    watchInstruction: 'Each shape adds one point, then joins it to all the other points.',
    question: 'How many points will the next shape have?',
    sequenceClue: '2, 3, 4, 5, 6 points so far.',
    options: [6, 7, 8],
    correctOption: 7,
    explanation: 'Seven points, each joined to the other six.',
    discoveredConcept: 'Seven points, each joined to the other six.',
    completeSequence: '2, 3, 4, 5, 6, 7 points',
    discoveredRule: 'The rule: add one point and join it to every point already there. The points go 2, 3, 4, 5, 6, 7... while the lines go 1, 3, 6, 10, 15, 21... — triangular numbers!',
    nextLabel: 'Stacked squares',
    terms: [
      { stepLabel: 'PICTURE 1', label: '2 points', type: 'graph', points: 2 },
      { stepLabel: 'PICTURE 2', label: '3 points', type: 'graph', points: 3 },
      { stepLabel: 'PICTURE 3', label: '4 points', type: 'graph', points: 4 },
      { stepLabel: 'PICTURE 4', label: '5 points', type: 'graph', points: 5 },
      { stepLabel: 'PICTURE 5', label: '6 points', type: 'graph', points: 6 },
      { stepLabel: 'PICTURE 6', label: '7 points', type: 'graph', points: 7 }
    ],
    connector: '+1 pt'
  },
  {
    id: 3,
    title: 'Stacked squares',
    subtitle: 'A bigger square, built from little squares.',
    accentColor: '#d97706',
    watchSubtext: '1 = 1, 2 × 2 = 4, 3 × 3 = 9, 4 × 4 = 16, 5 × 5 = 25 little squares.',
    watchInstruction: 'Each shape is a square grid of little squares. Watch a new row and column arrive.',
    question: 'How many little squares are in the bottom row of the next shape?',
    sequenceClue: 'The bottom rows have 1, 2, 3, 4, 5 little squares so far.',
    options: [5, 6, 7],
    correctOption: 6,
    explanation: 'Six little squares along each side.',
    discoveredConcept: 'Six little squares along each side.',
    completeSequence: '1 × 1, 2 × 2, 3 × 3, 4 × 4, 5 × 5, 6 × 6',
    discoveredRule: 'The rule: each shape is a square with one more little square along each side. The side lengths are 1, 2, 3, 4, 5, 6... counting numbers.',
    nextLabel: 'Stacked triangles',
    terms: [
      { stepLabel: 'PICTURE 1', label: '1 × 1', type: 'squares', n: 1 },
      { stepLabel: 'PICTURE 2', label: '2 × 2', type: 'squares', n: 2 },
      { stepLabel: 'PICTURE 3', label: '3 × 3', type: 'squares', n: 3 },
      { stepLabel: 'PICTURE 4', label: '4 × 4', type: 'squares', n: 4 },
      { stepLabel: 'PICTURE 5', label: '5 × 5', type: 'squares', n: 5 },
      { stepLabel: 'PICTURE 6', label: '6 × 6', type: 'squares', n: 6 }
    ],
    connector: '+row'
  },
  {
    id: 4,
    title: 'Stacked triangles',
    subtitle: 'Rows of little triangles make a big triangle.',
    accentColor: '#059669',
    watchSubtext: 'Each row has 2 more little triangles than the row above it.',
    watchInstruction: 'Each shape adds one more row of little triangles at the bottom.',
    question: 'How many little triangles are in the bottom row of the next shape?',
    sequenceClue: 'The bottom rows have 1, 3, 5, 7, 9 little triangles so far.',
    options: [9, 10, 11],
    correctOption: 11,
    explanation: 'A sixth row with 11 little triangles: 6 up, 5 down.',
    discoveredConcept: 'A sixth row with 11 little triangles: 6 up, 5 down.',
    completeSequence: '1 row, 2 rows, 3 rows, 4 rows, 5 rows, 6 rows',
    discoveredRule: 'The rule: add a new bottom row with two more little triangles (one more pointing up, one more pointing down). The rows go 1, 3, 5, 7, 9, 11... — the odd numbers.',
    nextLabel: 'Koch snowflake',
    terms: [
      { stepLabel: 'PICTURE 1', label: '1 row', type: 'triangles', rows: 1 },
      { stepLabel: 'PICTURE 2', label: '2 rows', type: 'triangles', rows: 2 },
      { stepLabel: 'PICTURE 3', label: '3 rows', type: 'triangles', rows: 3 },
      { stepLabel: 'PICTURE 4', label: '4 rows', type: 'triangles', rows: 4 },
      { stepLabel: 'PICTURE 5', label: '5 rows', type: 'triangles', rows: 5 },
      { stepLabel: 'PICTURE 6', label: '6 rows', type: 'triangles', rows: 6 }
    ],
    connector: '+row'
  },
  {
    id: 5,
    title: 'Koch snowflake',
    subtitle: 'Every straight line grows a bump.',
    accentColor: '#4f46e5',
    watchSubtext: 'Start with a triangle. Then put a bump on every straight line.',
    watchInstruction: 'Each straight segment is replaced by a "speed bump": 4 shorter segments.',
    question: 'Each straight segment is replaced by how many smaller segments?',
    sequenceClue: 'Look closely at one side of the triangle after the first step.',
    options: [2, 3, 4],
    correctOption: 4,
    explanation: 'Four pieces per segment. The snowflake keeps growing finer.',
    discoveredConcept: 'Four pieces per segment. The snowflake keeps growing finer.',
    completeSequence: '3, 12, 48, 192, 768 segments',
    discoveredRule: 'The rule: every segment becomes 4 segments (two flat pieces and two sloping pieces of the bump). So the number of segments multiplies by 4 at every step: 3, 12, 48, 192, 768...',
    nextLabel: 'Activity 1.6',
    terms: [
      { stepLabel: 'STEP 0', label: 'triangle', type: 'koch', depth: 0, count: 3 },
      { stepLabel: 'STEP 1', label: '1 bump', type: 'koch', depth: 1, count: 12 },
      { stepLabel: 'STEP 2', label: '2 bumps', type: 'koch', depth: 2, count: 48 },
      { stepLabel: 'STEP 3', label: '3 bumps', type: 'koch', depth: 3, count: 192 },
      { stepLabel: 'STEP 4', label: '4 bumps', type: 'koch', depth: 4, count: 768 }
    ],
    connector: '×4'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// NEW BACKGROUND THEME FOR 1.5 PATTERNS IN SHAPES
// Soft warm-white / ivory base with sophisticated pastel geometric repeating motifs
// Pattern sequence: Square → Triangle → Circle → Square → Triangle → Circle
// ═══════════════════════════════════════════════════════════════════════════
function ShapePatternsBackgroundTheme() {
  const topFriezeCount = 28;
  const friezeItems = Array.from({ length: topFriezeCount }, (_, idx) => {
    const shapeType = idx % 3; // 0: square, 1: triangle, 2: circle
    const colors = [
      { stroke: '#0d9488', fill: '#ccfbf1' }, // soft teal
      { stroke: '#ea580c', fill: '#ffedd5' }, // gentle orange
      { stroke: '#7c3aed', fill: '#ede9fe' }, // light lavender
      { stroke: '#0284c7', fill: '#e0f2fe' }, // muted blue
      { stroke: '#d97706', fill: '#fef3c7' }  // pale yellow
    ];
    const color = colors[idx % colors.length];
    return { idx, shapeType, color };
  });

  return (
    <div className="shapes-bg-theme-container" aria-hidden="true">
      {/* ── AMBIENT WARM IVORY BASE & PASTEL MESH GRADIENTS ── */}
      <div className="shapes-bg-base-canvas" />
      <div className="shapes-bg-pastel-ambient-mesh" />

      {/* ── VECTOR GEOMETRIC MOTIFS & REPEATING PATTERNS ── */}
      <svg
        className="shapes-bg-svg-layer"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle mathematical dot grid */}
          <pattern id="shapes-math-dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.1" fill="#64748b" fillOpacity="0.14" />
          </pattern>

          {/* Radial mask that keeps the CENTER completely clean and pristine */}
          <radialGradient id="shapes-mask-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="88%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </radialGradient>
          <mask id="shapes-center-clearance-mask">
            <rect width="1920" height="1080" fill="url(#shapes-mask-grad)" />
          </mask>

          {/* Soft shadow filter for delicate geometric depth */}
          <filter id="subtle-geom-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.03" />
          </filter>
        </defs>

        {/* 1. Subtle background dot grid masked to fade out away from center */}
        <rect width="1920" height="1080" fill="url(#shapes-math-dot-grid)" mask="url(#shapes-center-clearance-mask)" />

        {/* ── TOP ARCHITECTURAL FRIEZE (y ≈ 24): Square → Triangle → Circle sequence ── */}
        <g className="shapes-top-frieze" opacity="0.85">
          <line x1="280" y1="24" x2="1640" y2="24" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.5" />
          {friezeItems.map(({ idx, shapeType, color }) => {
            const cx = 310 + idx * 48;
            const cy = 24;
            if (shapeType === 0) {
              return (
                <rect
                  key={`top-sq-${idx}`}
                  x={cx - 6}
                  y={cy - 6}
                  width="12"
                  height="12"
                  rx="2.5"
                  stroke={color.stroke}
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  fill={color.fill}
                  fillOpacity="0.1"
                />
              );
            }
            if (shapeType === 1) {
              return (
                <polygon
                  key={`top-tr-${idx}`}
                  points={`${cx},${cy - 6.5} ${cx - 6.5},${cy + 5.5} ${cx + 6.5},${cy + 5.5}`}
                  stroke={color.stroke}
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  fill={color.fill}
                  fillOpacity="0.1"
                  strokeLinejoin="round"
                />
              );
            }
            return (
              <circle
                key={`top-cr-${idx}`}
                cx={cx}
                cy={cy}
                r="5.5"
                stroke={color.stroke}
                strokeWidth="1.2"
                strokeOpacity="0.32"
                fill={color.fill}
                fillOpacity="0.1"
              />
            );
          })}
        </g>

        {/* ── BOTTOM ARCHITECTURAL FRIEZE (y ≈ 1056): Square → Triangle → Circle sequence ── */}
        <g className="shapes-bottom-frieze" opacity="0.85">
          <line x1="280" y1="1056" x2="1640" y2="1056" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.5" />
          {friezeItems.map(({ idx, shapeType, color }) => {
            const cx = 310 + idx * 48;
            const cy = 1056;
            if (shapeType === 0) {
              return (
                <rect
                  key={`bot-sq-${idx}`}
                  x={cx - 6}
                  y={cy - 6}
                  width="12"
                  height="12"
                  rx="2.5"
                  stroke={color.stroke}
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  fill={color.fill}
                  fillOpacity="0.1"
                />
              );
            }
            if (shapeType === 1) {
              return (
                <polygon
                  key={`bot-tr-${idx}`}
                  points={`${cx},${cy - 6.5} ${cx - 6.5},${cy + 5.5} ${cx + 6.5},${cy + 5.5}`}
                  stroke={color.stroke}
                  strokeWidth="1.2"
                  strokeOpacity="0.32"
                  fill={color.fill}
                  fillOpacity="0.1"
                  strokeLinejoin="round"
                />
              );
            }
            return (
              <circle
                key={`bot-cr-${idx}`}
                cx={cx}
                cy={cy}
                r="5.5"
                stroke={color.stroke}
                strokeWidth="1.2"
                strokeOpacity="0.32"
                fill={color.fill}
                fillOpacity="0.1"
              />
            );
          })}
        </g>

        {/* ── LEFT FLANK PATTERN COLUMN (x ≈ 70 to 140, y ≈ 130 to 950) ── */}
        {/* Core repeating rhythm: Square → Triangle → Circle → Square → Triangle → Circle → Square */}
        <g className="shapes-left-flank" filter="url(#subtle-geom-shadow)">
          {/* Main vertical drafting axis */}
          <line x1="72" y1="120" x2="72" y2="940" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.45" />

          {/* Item 1 (y: 170): SQUARE [Soft Teal] */}
          <g transform="translate(72, 170)">
            <rect x="-20" y="-20" width="40" height="40" rx="6" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.35" fill="#ccfbf1" fillOpacity="0.12" />
            <rect x="-10" y="-10" width="20" height="20" rx="3" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Item 2 (y: 290): TRIANGLE [Gentle Orange] */}
          <g transform="translate(72, 290)">
            <polygon points="0,-22 -20,16 20,16" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.35" fill="#ffedd5" fillOpacity="0.12" strokeLinejoin="round" />
            <polygon points="0,-11 -10,8 10,8" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" strokeLinejoin="round" />
          </g>

          {/* Item 3 (y: 410): CIRCLE [Light Lavender] */}
          <g transform="translate(72, 410)">
            <circle cx="0" cy="0" r="21" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.35" fill="#ede9fe" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="11" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" />
            <circle cx="0" cy="0" r="2" fill="#7c3aed" fillOpacity="0.4" />
          </g>

          {/* Item 4 (y: 530): SQUARE [Muted Blue] */}
          <g transform="translate(72, 530)">
            <rect x="-20" y="-20" width="40" height="40" rx="6" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.35" fill="#e0f2fe" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="10" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Item 5 (y: 650): TRIANGLE [Pale Yellow] */}
          <g transform="translate(72, 650)">
            <polygon points="0,-22 -20,16 20,16" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.35" fill="#fef3c7" fillOpacity="0.15" strokeLinejoin="round" />
            <circle cx="0" cy="4" r="6" stroke="#d97706" strokeWidth="1" strokeOpacity="0.22" fill="none" />
          </g>

          {/* Item 6 (y: 770): CIRCLE [Soft Teal] */}
          <g transform="translate(72, 770)">
            <circle cx="0" cy="0" r="21" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.35" fill="#ccfbf1" fillOpacity="0.12" />
            <rect x="-8" y="-8" width="16" height="16" rx="2" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Item 7 (y: 890): SQUARE [Gentle Orange] */}
          <g transform="translate(72, 890)">
            <rect x="-20" y="-20" width="40" height="40" rx="6" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.35" fill="#ffedd5" fillOpacity="0.12" />
            <polygon points="0,-9 -8,7 8,7" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeLinejoin="round" />
          </g>

          {/* Secondary offset rhythm column at x = 142 */}
          <line x1="142" y1="190" x2="142" y2="870" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx="142" cy="230" r="10" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.3" fill="#fef3c7" fillOpacity="0.08" />
          <rect x="133" y="341" width="18" height="18" rx="3" stroke="#0284c7" strokeWidth="1.2" strokeOpacity="0.3" fill="#e0f2fe" fillOpacity="0.08" />
          <polygon points="142,460 133,478 151,478" stroke="#0d9488" strokeWidth="1.2" strokeOpacity="0.3" fill="#ccfbf1" fillOpacity="0.08" strokeLinejoin="round" />
          <circle cx="142" cy="590" r="10" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.3" fill="#ffedd5" fillOpacity="0.08" />
          <rect x="133" y="701" width="18" height="18" rx="3" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.3" fill="#ede9fe" fillOpacity="0.08" />
          <polygon points="142,820 133,838 151,838" stroke="#0284c7" strokeWidth="1.2" strokeOpacity="0.3" fill="#e0f2fe" fillOpacity="0.08" strokeLinejoin="round" />
        </g>

        {/* ── RIGHT FLANK PATTERN COLUMN (x ≈ 1780 to 1850, y ≈ 130 to 950) ── */}
        {/* Core repeating rhythm: Circle → Triangle → Square → Circle → Triangle → Square → Circle */}
        <g className="shapes-right-flank" filter="url(#subtle-geom-shadow)">
          {/* Main vertical drafting axis */}
          <line x1="1848" y1="120" x2="1848" y2="940" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.45" />

          {/* Item 1 (y: 170): CIRCLE [Muted Blue] */}
          <g transform="translate(1848, 170)">
            <circle cx="0" cy="0" r="21" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.35" fill="#e0f2fe" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="11" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" />
            <circle cx="0" cy="0" r="2" fill="#0284c7" fillOpacity="0.4" />
          </g>

          {/* Item 2 (y: 290): TRIANGLE [Soft Teal] */}
          <g transform="translate(1848, 290)">
            <polygon points="0,-22 -20,16 20,16" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.35" fill="#ccfbf1" fillOpacity="0.12" strokeLinejoin="round" />
            <polygon points="0,-11 -10,8 10,8" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" strokeLinejoin="round" />
          </g>

          {/* Item 3 (y: 410): SQUARE [Light Lavender] */}
          <g transform="translate(1848, 410)">
            <rect x="-20" y="-20" width="40" height="40" rx="6" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.35" fill="#ede9fe" fillOpacity="0.12" />
            <rect x="-10" y="-10" width="20" height="20" rx="3" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Item 4 (y: 530): CIRCLE [Gentle Orange] */}
          <g transform="translate(1848, 530)">
            <circle cx="0" cy="0" r="21" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.35" fill="#ffedd5" fillOpacity="0.12" />
            <polygon points="0,-8 -7,6 7,6" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeLinejoin="round" />
          </g>

          {/* Item 5 (y: 650): TRIANGLE [Pale Yellow] */}
          <g transform="translate(1848, 650)">
            <polygon points="0,-22 -20,16 20,16" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.35" fill="#fef3c7" fillOpacity="0.15" strokeLinejoin="round" />
            <circle cx="0" cy="4" r="6" stroke="#d97706" strokeWidth="1" strokeOpacity="0.22" fill="none" />
          </g>

          {/* Item 6 (y: 770): SQUARE [Muted Blue] */}
          <g transform="translate(1848, 770)">
            <rect x="-20" y="-20" width="40" height="40" rx="6" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.35" fill="#e0f2fe" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="10" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Item 7 (y: 890): CIRCLE [Light Lavender] */}
          <g transform="translate(1848, 890)">
            <circle cx="0" cy="0" r="21" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.35" fill="#ede9fe" fillOpacity="0.12" />
            <rect x="-8" y="-8" width="16" height="16" rx="2" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.25" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Secondary offset rhythm column at x = 1778 */}
          <line x1="1778" y1="190" x2="1778" y2="870" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.4" />
          <rect x="1769" y="221" width="18" height="18" rx="3" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.3" fill="#ffedd5" fillOpacity="0.08" />
          <polygon points="1778,340 1769,358 1787,358" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.3" fill="#ede9fe" fillOpacity="0.08" strokeLinejoin="round" />
          <circle cx="1778" cy="470" r="10" stroke="#0284c7" strokeWidth="1.2" strokeOpacity="0.3" fill="#e0f2fe" fillOpacity="0.08" />
          <rect x="1769" y="581" width="18" height="18" rx="3" stroke="#0d9488" strokeWidth="1.2" strokeOpacity="0.3" fill="#ccfbf1" fillOpacity="0.08" />
          <polygon points="1778,700 1769,718 1787,718" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.3" fill="#fef3c7" fillOpacity="0.08" strokeLinejoin="round" />
          <circle cx="1778" cy="830" r="10" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.3" fill="#ffedd5" fillOpacity="0.08" />
        </g>

        {/* ── CORNER ARCHITECTURAL CONSTELLATIONS ── */}
        {/* Top-Left Corner: Nested Square → Triangle → Circle */}
        <g transform="translate(68, 64)" filter="url(#subtle-geom-shadow)">
          <rect x="-28" y="-28" width="56" height="56" rx="8" stroke="#0284c7" strokeWidth="1.3" strokeOpacity="0.3" strokeDasharray="5 4" fill="#e0f2fe" fillOpacity="0.06" />
          <polygon points="0,-18 -16,14 16,14" stroke="#ea580c" strokeWidth="1.3" strokeOpacity="0.32" fill="#ffedd5" fillOpacity="0.08" strokeLinejoin="round" />
          <circle cx="0" cy="4" r="6" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.35" fill="#ede9fe" fillOpacity="0.12" />
        </g>

        {/* Top-Right Corner: Concentric Circle → Rotated Square → Triangle */}
        <g transform="translate(1852, 64)" filter="url(#subtle-geom-shadow)">
          <circle cx="0" cy="0" r="30" stroke="#7c3aed" strokeWidth="1.3" strokeOpacity="0.3" strokeDasharray="5 4" fill="#ede9fe" fillOpacity="0.06" />
          <rect x="-16" y="-16" width="32" height="32" rx="4" transform="rotate(45)" stroke="#0d9488" strokeWidth="1.3" strokeOpacity="0.32" fill="#ccfbf1" fillOpacity="0.08" />
          <polygon points="0,-10 -9,8 9,8" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.35" fill="#fef3c7" fillOpacity="0.12" strokeLinejoin="round" />
        </g>

        {/* Bottom-Left Corner: Inverted Triangle → Square → Circle */}
        <g transform="translate(68, 1016)" filter="url(#subtle-geom-shadow)">
          <polygon points="0,-28 -28,24 28,24" stroke="#d97706" strokeWidth="1.3" strokeOpacity="0.3" strokeDasharray="5 4" fill="#fef3c7" fillOpacity="0.06" strokeLinejoin="round" />
          <rect x="-14" y="-4" width="28" height="28" rx="4" stroke="#0284c7" strokeWidth="1.3" strokeOpacity="0.32" fill="#e0f2fe" fillOpacity="0.08" />
          <circle cx="0" cy="10" r="7" stroke="#0d9488" strokeWidth="1.2" strokeOpacity="0.35" fill="#ccfbf1" fillOpacity="0.12" />
        </g>

        {/* Bottom-Right Corner: Outer Square → Circle → Inward Triangle */}
        <g transform="translate(1852, 1016)" filter="url(#subtle-geom-shadow)">
          <rect x="-28" y="-28" width="56" height="56" rx="8" stroke="#0d9488" strokeWidth="1.3" strokeOpacity="0.3" strokeDasharray="5 4" fill="#ccfbf1" fillOpacity="0.06" />
          <circle cx="0" cy="0" r="18" stroke="#ea580c" strokeWidth="1.3" strokeOpacity="0.32" fill="#ffedd5" fillOpacity="0.08" />
          <polygon points="0,-8 -9,9 9,9" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.35" fill="#ede9fe" fillOpacity="0.12" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: 1.5 PATTERNS IN SHAPES
// Uses the EXACT UI/Layout system of 1.2 Patterns in Numbers
// ═══════════════════════════════════════════════════════════════════════════
export default function ShapePatternsExperience({ onClose, onCompleteNode }) {
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

  const concept = CONCEPTS[currentConceptIdx];
  const totalTerms = concept.terms.length;
  const timerRef = useRef(null);

  // Auto-progression in Step 1 (Watch mode)
  useEffect(() => {
    if (learningStep === 1 && isPlaying) {
      if (revealedCount < totalTerms - 1) {
        timerRef.current = setTimeout(() => {
          setRevealedCount(prev => prev + 1);
        }, 1250);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [learningStep, isPlaying, revealedCount, totalTerms]);

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
    setRevealedCount(totalTerms - 1);
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
      setRevealedCount(totalTerms);
      setLearningStep(3);

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
  const handleSeeWhy = () => {
    setLearningStep(4);
    if (!completedConceptIds.includes(concept.id)) {
      setCompletedConceptIds(prev => [...prev, concept.id]);
    }
  };

  // Step 4: Advance to next sequence
  const handleNextConcept = () => {
    if (currentConceptIdx < CONCEPTS.length - 1) {
      loadConcept(currentConceptIdx + 1);
    } else {
      if (onCompleteNode) onCompleteNode('1.5');
      if (onClose) onClose();
    }
  };

  const handlePrevConcept = () => {
    if (currentConceptIdx > 0) {
      loadConcept(currentConceptIdx - 1);
    }
  };

  const renderShapeVisual = (term, color) => {
    switch (term.type) {
      case 'polygon':
        return <PolygonSVG sides={term.sides} accentColor={color} />;
      case 'graph':
        return <CompleteGraphSVG points={term.points} accentColor={color} />;
      case 'squares':
        return <StackedSquaresSVG n={term.n} />;
      case 'triangles':
        return <StackedTrianglesSVG rows={term.rows} />;
      case 'koch':
        return <KochSnowflakeSVG depth={term.depth} count={term.count} />;
      default:
        return null;
    }
  };

  return (
    <div className="pattern-lab-root" id="shape-patterns-experience-root">
      {/* ── 1.5 PATTERNS IN SHAPES: EXCLUSIVE BACKGROUND THEME ── */}
      <ShapePatternsBackgroundTheme />

      {/* ── MAIN INTERFACE FRAME (EXACT SAME AS 1.2) ── */}
      <div className="pattern-lab-frame">
        {/* ── BODY WORKSPACE ── */}
        <main className="pl-body">
          {/* Top Info Container */}
          <div className="pl-top-area">
            {/* Concept Header */}
            <div className="pl-concept-header">
              <div className="pl-concept-info">
                <div className="pl-concept-tag">
                  <span>Patterns in Shapes 1.5</span>
                  <span className="pl-tag-divider">·</span>
                  <span>Concept {String(concept.id).padStart(2, '0')}/{CONCEPTS.length}</span>
                </div>
                <h1 className="pl-concept-title">{concept.title}</h1>
                <p className="pl-concept-subtitle">{concept.subtitle}</p>
              </div>
            </div>
          </div>

          {/* ── SHAPES PATTERN CARDS ROW (PROMINENT CENTERED HERO SEQUENCE) ── */}
          <div className="pl-cards-row-container">
            <div className="pl-cards-row">
              {concept.terms.map((term, i) => {
                const isRevealed = i < revealedCount;

                return (
                  <div
                    key={i}
                    className={`pl-term-card ${isRevealed ? 'revealed' : 'locked-target'}`}
                    style={{
                      borderColor: isRevealed ? concept.accentColor : '#cbd5e1',
                      boxShadow: isRevealed
                        ? `0 12px 32px ${concept.accentColor}30, 0 3px 8px rgba(0,0,0,0.05)`
                        : 'none'
                    }}
                  >
                    {isRevealed ? (
                      <div className="pl-shape-card-inner">
                        <span className="pl-shape-step-label">{term.stepLabel}</span>
                        <div className="pl-shape-visual-box">
                          {renderShapeVisual(term, concept.accentColor)}
                        </div>
                      </div>
                    ) : (
                      <div className="pl-card-number-val question-mark">?</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── ONE LARGE COMMON ACTIVITY BOX (1420 × 248 PX ACROSS ALL 4 STAGES) ── */}
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

            {/* ── STAGE 2: LEARNING CHECKPOINT (QUESTION) ── */}
            {learningStep === 2 && (
              <div className="pl-stage-content pl-checkpoint-vertical-layout">
                <div className="pl-checkpoint-header-row">
                  <span className="pl-stage-eyebrow">LEARNING CHECKPOINT</span>
                </div>

                <h3 className="pl-checkpoint-question">{concept.question}</h3>
                <div className="pl-checkpoint-seq-clue">{concept.sequenceClue}</div>

                <div className="pl-checkpoint-options-row">
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
            )}

            {/* ── STAGE 3: CORRECT ANSWER / EXPLANATION ── */}
            {learningStep === 3 && (
              <div className="pl-stage-content pl-checkpoint-vertical-layout stage-3-answered">
                <div className="pl-checkpoint-header-row">
                  <span className="pl-stage-eyebrow">LEARNING CHECKPOINT</span>
                </div>

                <h3 className="pl-checkpoint-question">{concept.question}</h3>

                <div className="pl-checkpoint-options-row">
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

                <div className="pl-checkpoint-bottom-feedback-row">
                  <div className="pl-checkpoint-feedback-note">
                    <CheckCircle size={18} color="#10b981" />
                    <span>{concept.explanation}</span>
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

            {/* ── STAGE 4: CONCEPT DISCOVERED (MATCHING EXACT 1.2 STYLING) ── */}
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
                  <span>Replay this concept</span>
                </button>
              </div>
            )}
          </div>
        </main>

        {/* ── FOOTER PROGRESS & NAVIGATION (EXACT SAME AS 1.2) ── */}
        <footer className="pl-footer">
          <div className="pl-footer-left">
            <button
              type="button"
              className="pl-prev-btn"
              onClick={currentConceptIdx === 0 ? onClose : handlePrevConcept}
            >
              <span>{currentConceptIdx === 0 ? '← Activity 1.4' : '← Previous concept'}</span>
            </button>
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
    </div>
  );
}
