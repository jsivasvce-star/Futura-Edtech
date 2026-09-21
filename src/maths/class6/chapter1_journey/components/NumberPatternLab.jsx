/* eslint-disable react/prop-types, no-unused-vars */
import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

// ── 10 LAB PATTERNS SPECIFICATION (ALL 10 COMPLETE SEQUENCES) ──
const PATTERNS_CONFIG = [
  {
    id: 'all_ones',
    index: 1,
    title: "All 1's",
    emoji: '1️⃣',
    themeColor: '#64748b',
    accentBg: '#f1f5f9',
    sequenceDisplay: '1, 1, 1, 1, 1, 1, ...',
    ruleText: 'The number stays the same.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1 = 1', note: '1 single object' },
      { stageNum: 2, value: 1, label: 'Stage 2', equation: '1 → 1', note: 'Still exactly 1 object' },
      { stageNum: 3, value: 1, label: 'Stage 3', equation: '1 → 1', note: 'No change, still 1 object' },
      { stageNum: 4, value: 1, label: 'Stage 4', equation: '1 → 1', note: 'Always remains 1 object' },
      { stageNum: 5, value: 1, label: 'Stage 5', equation: '1 → 1', note: 'Continues with 1' }
    ]
  },
  {
    id: 'counting',
    index: 2,
    title: 'Counting Numbers',
    emoji: '🔢',
    themeColor: '#d97706',
    accentBg: '#fef3c7',
    sequenceDisplay: '1, 2, 3, 4, 5, 6, 7, ...',
    ruleText: 'One more is added each time.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1', note: '1 starting block' },
      { stageNum: 2, value: 2, label: 'Stage 2', equation: '1 + 1 = 2', note: 'Add 1 more block' },
      { stageNum: 3, value: 3, label: 'Stage 3', equation: '2 + 1 = 3', note: 'Add 1 more block' },
      { stageNum: 4, value: 4, label: 'Stage 4', equation: '3 + 1 = 4', note: 'Add 1 more block' },
      { stageNum: 5, value: 5, label: 'Stage 5', equation: '4 + 1 = 5', note: 'Add 1 more block' },
      { stageNum: 6, value: 6, label: 'Stage 6', equation: '5 + 1 = 6', note: 'Add 1 more block' },
      { stageNum: 7, value: 7, label: 'Stage 7', equation: '6 + 1 = 7', note: 'Add 1 more block' },
      { stageNum: 8, value: 8, label: 'Stage 8', equation: '7 + 1 = 8', note: '7 + 1 = 8 (7 → 8)' }
    ]
  },
  {
    id: 'odd_numbers',
    index: 3,
    title: 'Odd Numbers',
    emoji: '🔵',
    themeColor: '#2563eb',
    accentBg: '#dbeafe',
    sequenceDisplay: '1, 3, 5, 7, 9, 11, 13, ...',
    ruleText: '2 more are added each time.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1', note: '1 single block (unpaired)' },
      { stageNum: 2, value: 3, label: 'Stage 2', equation: '1 + 2 = 3', note: 'Add 2 blocks (1 pair + 1 unpaired)' },
      { stageNum: 3, value: 5, label: 'Stage 3', equation: '3 + 2 = 5', note: 'Add 2 blocks (2 pairs + 1 unpaired)' },
      { stageNum: 4, value: 7, label: 'Stage 4', equation: '5 + 2 = 7', note: 'Add 2 blocks (3 pairs + 1 unpaired)' },
      { stageNum: 5, value: 9, label: 'Stage 5', equation: '7 + 2 = 9', note: 'Add 2 blocks (4 pairs + 1 unpaired)' },
      { stageNum: 6, value: 11, label: 'Stage 6', equation: '9 + 2 = 11', note: 'Add 2 blocks (5 pairs + 1 unpaired)' },
      { stageNum: 7, value: 13, label: 'Stage 7', equation: '11 + 2 = 13', note: 'Add 2 blocks (6 pairs + 1 unpaired)' },
      { stageNum: 8, value: 15, label: 'Stage 8', equation: '13 + 2 = 15', note: 'Add 2 blocks → 13 + 2 = 15' }
    ]
  },
  {
    id: 'even_numbers',
    index: 4,
    title: 'Even Numbers',
    emoji: '👫',
    themeColor: '#dc2626',
    accentBg: '#fee2e2',
    sequenceDisplay: '2, 4, 6, 8, 10, 12, 14, ...',
    ruleText: 'We add 2 each time.',
    stages: [
      { stageNum: 1, value: 2, label: 'Stage 1', equation: '2', note: '1 complete pair (2 objects)' },
      { stageNum: 2, value: 4, label: 'Stage 2', equation: '2 + 2 = 4', note: 'Add 1 pair (+2) → 2 pairs (4 objects)' },
      { stageNum: 3, value: 6, label: 'Stage 3', equation: '4 + 2 = 6', note: 'Add 1 pair (+2) → 3 pairs (6 objects)' },
      { stageNum: 4, value: 8, label: 'Stage 4', equation: '6 + 2 = 8', note: 'Add 1 pair (+2) → 4 pairs (8 objects)' },
      { stageNum: 5, value: 10, label: 'Stage 5', equation: '8 + 2 = 10', note: 'Add 1 pair (+2) → 5 pairs (10 objects)' },
      { stageNum: 6, value: 12, label: 'Stage 6', equation: '10 + 2 = 12', note: 'Add 1 pair (+2) → 6 pairs (12 objects)' },
      { stageNum: 7, value: 14, label: 'Stage 7', equation: '12 + 2 = 14', note: 'Add 1 pair (+2) → 7 pairs (14 objects)' },
      { stageNum: 8, value: 16, label: 'Stage 8', equation: '14 + 2 = 16', note: 'Add 1 pair (+2) → 8 pairs (16 objects)' }
    ]
  },
  {
    id: 'triangular',
    index: 5,
    title: 'Triangular Numbers',
    emoji: '🔺',
    themeColor: '#059669',
    accentBg: '#d1fae5',
    sequenceDisplay: '1, 3, 6, 10, 15, 21, 28, ...',
    ruleText: 'Each new stage adds one more row.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1', note: 'Row 1 has 1 dot' },
      { stageNum: 2, value: 3, label: 'Stage 2', equation: '1 + 2 = 3', note: 'Add Row 2 (+2 dots) → Total 3' },
      { stageNum: 3, value: 6, label: 'Stage 3', equation: '3 + 3 = 6', note: 'Add Row 3 (+3 dots) → Total 6' },
      { stageNum: 4, value: 10, label: 'Stage 4', equation: '6 + 4 = 10', note: 'Add Row 4 (+4 dots) → Total 10' },
      { stageNum: 5, value: 15, label: 'Stage 5', equation: '10 + 5 = 15', note: 'Add Row 5 (+5 dots) → Total 15' },
      { stageNum: 6, value: 21, label: 'Stage 6', equation: '15 + 6 = 21', note: 'Add Row 6 (+6 dots) → Total 21' },
      { stageNum: 7, value: 28, label: 'Stage 7', equation: '21 + 7 = 28', note: 'Add Row 7 (+7 dots) → Total 28' },
      { stageNum: 8, value: 36, label: 'Stage 8', equation: '28 + 8 = 36', note: 'Add Row 8 (+8 dots) → Total 36' }
    ]
  },
  {
    id: 'squares',
    index: 6,
    title: 'Square Numbers',
    emoji: '🟨',
    themeColor: '#b45309',
    accentBg: '#fef3c7',
    sequenceDisplay: '1, 4, 9, 16, 25, 36, 49, ...',
    ruleText: 'The same number is multiplied by itself.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1 × 1 = 1', note: '1 row of 1 = 1' },
      { stageNum: 2, value: 4, label: 'Stage 2', equation: '2 × 2 = 4', note: '2 rows of 2 = 4' },
      { stageNum: 3, value: 9, label: 'Stage 3', equation: '3 × 3 = 9', note: '3 rows of 3 = 9' },
      { stageNum: 4, value: 16, label: 'Stage 4', equation: '4 × 4 = 16', note: '4 rows of 4 = 16' },
      { stageNum: 5, value: 25, label: 'Stage 5', equation: '5 × 5 = 25', note: '5 rows of 5 = 25' },
      { stageNum: 6, value: 36, label: 'Stage 6', equation: '6 × 6 = 36', note: '6 rows of 6 = 36' },
      { stageNum: 7, value: 49, label: 'Stage 7', equation: '7 × 7 = 49', note: '7 rows of 7 = 49' },
      { stageNum: 8, value: 64, label: 'Stage 8', equation: '8 × 8 = 64', note: '8 rows of 8 = 64' }
    ]
  },
  {
    id: 'cubes',
    index: 7,
    title: 'Cube Numbers',
    emoji: '🧊',
    themeColor: '#7c3aed',
    accentBg: '#ede9fe',
    sequenceDisplay: '1, 8, 27, 64, 125, 216, ...',
    ruleText: 'The same number is multiplied three times.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1 × 1 × 1 = 1', note: '1 cube (1×1×1)' },
      { stageNum: 2, value: 8, label: 'Stage 2', equation: '2 × 2 × 2 = 8', note: '8 cubes assembled (2×2×2)' },
      { stageNum: 3, value: 27, label: 'Stage 3', equation: '3 × 3 × 3 = 27', note: '27 cubes assembled (3×3×3)' },
      { stageNum: 4, value: 64, label: 'Stage 4', equation: '4 × 4 × 4 = 64', note: '64 cubes assembled (4×4×4)' },
      { stageNum: 5, value: 125, label: 'Stage 5', equation: '5 × 5 × 5 = 125', note: '125 cubes assembled (5×5×5)' },
      { stageNum: 6, value: 216, label: 'Stage 6', equation: '6 × 6 × 6 = 216', note: '216 cubes assembled (6×6×6)' },
      { stageNum: 7, value: 343, label: 'Stage 7', equation: '7 × 7 × 7 = 343', note: '7 × 7 × 7 = 343 unit cubes' }
    ]
  },
  {
    id: 'virahanka',
    index: 8,
    title: 'Virahānka Numbers',
    emoji: '🌀',
    themeColor: '#0284c7',
    accentBg: '#e0f2fe',
    sequenceDisplay: '1, 2, 3, 5, 8, 13, 21, ...',
    ruleText: 'Add the previous two numbers to get the next number.',
    stages: [
      { stageNum: 1, value: 3, label: 'Step 1', prevA: 1, prevB: 2, equation: '1 + 2 = 3', note: 'Blocks [1] and [2] combine into [3]' },
      { stageNum: 2, value: 5, label: 'Step 2', prevA: 2, prevB: 3, equation: '2 + 3 = 5', note: 'Blocks [2] and [3] combine into [5]' },
      { stageNum: 3, value: 8, label: 'Step 3', prevA: 3, prevB: 5, equation: '3 + 5 = 8', note: 'Blocks [3] and [5] combine into [8]' },
      { stageNum: 4, value: 13, label: 'Step 4', prevA: 5, prevB: 8, equation: '5 + 8 = 13', note: 'Blocks [5] and [8] combine into [13]' },
      { stageNum: 5, value: 21, label: 'Step 5', prevA: 8, prevB: 13, equation: '8 + 13 = 21', note: 'Blocks [8] and [13] combine into [21]' },
      { stageNum: 6, value: 34, label: 'Step 6', prevA: 13, prevB: 21, equation: '13 + 21 = 34', note: 'Blocks [13] and [21] combine into [34]' }
    ]
  },
  {
    id: 'powers_of_2',
    index: 9,
    title: 'Powers of 2',
    emoji: '⚡',
    themeColor: '#db2777',
    accentBg: '#fce7f3',
    sequenceDisplay: '1, 2, 4, 8, 16, 32, 64, ...',
    ruleText: 'Each number is multiplied by 2.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1', note: '1 starting object' },
      { stageNum: 2, value: 2, label: 'Stage 2', equation: '1 × 2 = 2', note: '1 doubles into 2 objects' },
      { stageNum: 3, value: 4, label: 'Stage 3', equation: '2 × 2 = 4', note: '2 doubles into 4 objects' },
      { stageNum: 4, value: 8, label: 'Stage 4', equation: '4 × 2 = 8', note: '4 doubles into 8 objects' },
      { stageNum: 5, value: 16, label: 'Stage 5', equation: '8 × 2 = 16', note: '8 doubles into 16 objects' },
      { stageNum: 6, value: 32, label: 'Stage 6', equation: '16 × 2 = 32', note: '16 doubles into 32 objects' },
      { stageNum: 7, value: 64, label: 'Stage 7', equation: '32 × 2 = 64', note: '32 doubles into 64 objects' },
      { stageNum: 8, value: 128, label: 'Stage 8', equation: '64 × 2 = 128', note: '64 doubles into 128 objects' }
    ]
  },
  {
    id: 'powers_of_3',
    index: 10,
    title: 'Powers of 3',
    emoji: '🌿',
    themeColor: '#0d9488',
    accentBg: '#ccfbf1',
    sequenceDisplay: '1, 3, 9, 27, 81, 243, 729, ...',
    ruleText: 'Each number is multiplied by 3.',
    stages: [
      { stageNum: 1, value: 1, label: 'Stage 1', equation: '1', note: '1 starting object' },
      { stageNum: 2, value: 3, label: 'Stage 2', equation: '1 × 3 = 3', note: 'Triples into 1 cluster of 3' },
      { stageNum: 3, value: 9, label: 'Stage 3', equation: '3 × 3 = 9', note: 'Triples into 3 clusters of 3 = 9' },
      { stageNum: 4, value: 27, label: 'Stage 4', equation: '9 × 3 = 27', note: 'Triples into 9 clusters of 3 = 27' },
      { stageNum: 5, value: 81, label: 'Stage 5', equation: '27 × 3 = 81', note: 'Triples into 27 clusters of 3 = 81' },
      { stageNum: 6, value: 243, label: 'Stage 6', equation: '81 × 3 = 243', note: 'Triples into 81 clusters of 3 = 243' },
      { stageNum: 7, value: 729, label: 'Stage 7', equation: '243 × 3 = 729', note: 'Triples into 243 clusters of 3 = 729' },
      { stageNum: 8, value: 2187, label: 'Stage 8', equation: '729 × 3 = 2187', note: 'Triples: 729 × 3 = 2187' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// MINI CARD PREVIEWS (Used in the 10 Home Cards)
// ─────────────────────────────────────────────────────────────────────────────
function MiniPatternPreview({ patternId, color }) {
  switch (patternId) {
    case 'all_ones':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '42px' }}>
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, #94a3b8, ${color})`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            />
          ))}
        </div>
      );
    case 'counting':
      return (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px', height: '42px' }}>
          {[1, 2, 3, 4, 5].map((count) => (
            <div
              key={count}
              style={{
                width: '14px',
                height: `${count * 7}px`,
                background: color,
                borderRadius: '3px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}
            />
          ))}
        </div>
      );
    case 'odd_numbers':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '42px' }}>
          {[1, 3, 5, 7].map((num) => (
            <div
              key={num}
              style={{
                fontSize: '0.82rem',
                fontWeight: 900,
                color: '#ffffff',
                background: color,
                padding: '3px 6px',
                borderRadius: '6px'
              }}
            >
              {num}
            </div>
          ))}
        </div>
      );
    case 'even_numbers':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '42px' }}>
          {[1, 2, 3, 4].map((pairIdx) => (
            <div
              key={pairIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                padding: '2px 4px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px dashed #dc2626',
                borderRadius: '5px'
              }}
            >
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: color }} />
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: color }} />
            </div>
          ))}
        </div>
      );
    case 'triangular':
      return (
        <svg viewBox="0 0 100 44" style={{ width: '90px', height: '42px' }}>
          <circle cx="50" cy="8" r="4.5" fill={color} />
          <circle cx="43" cy="21" r="4.5" fill={color} />
          <circle cx="57" cy="21" r="4.5" fill={color} />
          <circle cx="36" cy="34" r="4.5" fill={color} />
          <circle cx="50" cy="34" r="4.5" fill={color} />
          <circle cx="64" cy="34" r="4.5" fill={color} />
        </svg>
      );
    case 'squares':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '42px' }}>
          <div style={{ width: '12px', height: '12px', background: color, borderRadius: '2px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 8px)', gap: '2px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: '8px', height: '8px', background: color, borderRadius: '1.5px' }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 7px)', gap: '2px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} style={{ width: '7px', height: '7px', background: color, borderRadius: '1px' }} />
            ))}
          </div>
        </div>
      );
    case 'cubes':
      return (
        <svg viewBox="0 0 80 44" style={{ width: '80px', height: '42px' }}>
          <polygon points="40,6 55,14 40,22 25,14" fill="#a78bfa" />
          <polygon points="25,14 40,22 40,36 25,28" fill="#7c3aed" />
          <polygon points="40,22 55,14 55,28 40,36" fill="#5b21b6" />
        </svg>
      );
    case 'virahanka':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', height: '42px' }}>
          <div style={{ padding: '3px 6px', background: '#38bdf8', color: '#0369a1', fontWeight: 900, borderRadius: '4px', fontSize: '0.78rem' }}>13</div>
          <span style={{ fontWeight: 900, color: '#0284c7', fontSize: '0.8rem' }}>+</span>
          <div style={{ padding: '3px 6px', background: '#38bdf8', color: '#0369a1', fontWeight: 900, borderRadius: '4px', fontSize: '0.78rem' }}>21</div>
          <span style={{ fontWeight: 900, color: '#0284c7', fontSize: '0.8rem' }}>→</span>
          <div style={{ padding: '3px 8px', background: color, color: '#fff', fontWeight: 900, borderRadius: '4px', fontSize: '0.82rem' }}>34</div>
        </div>
      );
    case 'powers_of_2':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px' }}>
          {[1, 2, 4, 8].map((val) => (
            <div
              key={val}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: color,
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {val}
            </div>
          ))}
        </div>
      );
    case 'powers_of_3':
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px' }}>
          {[1, 3, 9, 27].map((val) => (
            <div
              key={val}
              style={{
                padding: '2px 5px',
                borderRadius: '4px',
                background: color,
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 900
              }}
            >
              {val}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN LAB VISUAL CANVAS RENDERERS (2X LARGER, HIGH CONTRAST)
// ─────────────────────────────────────────────────────────────────────────────

// 1. ALL 1'S VISUAL
function AllOnesVisual({ activeStageIndex }) {
  const currentStage = activeStageIndex + 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Stages Progression Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        padding: '8px 16px',
        background: '#ffffff',
        borderRadius: '14px',
        border: '2.5px solid #cbd5e1',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        {[1, 2, 3, 4, 5].map((stg) => {
          const isCurrent = stg === currentStage;
          return (
            <div key={stg} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                borderRadius: '12px',
                background: isCurrent ? '#e2e8f0' : '#ffffff',
                border: isCurrent ? '3px solid #334155' : '2px solid #cbd5e1',
                transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.22s ease'
              }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#334155' }}>
                  Stage {stg}
                </span>
                {/* 2X Larger Object */}
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #94a3b8, #334155)',
                  boxShadow: isCurrent ? '0 0 18px rgba(51, 65, 85, 0.55)' : '0 3px 8px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '2.0rem'
                }}>
                  1
                </div>
              </div>
              {stg < 5 && <span style={{ color: '#475569', fontWeight: 900, fontSize: '1.8rem' }}>→</span>}
            </div>
          );
        })}
      </div>

      {/* 2X Larger Explanation Pill */}
      <div style={{
        padding: '4px 22px',
        borderRadius: '35px',
        background: '#f1f5f9',
        border: '2.5px solid #94a3b8',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '1.8rem' }}>💎</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#0f172a' }}>
          “The number stays the same: 1”
        </span>
      </div>
    </div>
  );
}

// 2. COUNTING NUMBERS VISUAL
function CountingNumbersVisual({ activeStageIndex }) {
  const count = activeStageIndex + 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Visual Building Canvas */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '12px',
        padding: '10px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #fed7aa',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(217, 119, 6, 0.08)'
      }}>
        {Array.from({ length: count }).map((_, i) => {
          const itemNum = i + 1;
          const isNewlyAdded = itemNum === count;
          return (
            <div
              key={itemNum}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                animation: isNewlyAdded ? 'popBounce 0.35s ease-out' : 'none'
              }}
            >
              {isNewlyAdded && (
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#b45309',
                  background: '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1.5px solid #f59e0b'
                }}>
                  +1 Added!
                </span>
              )}
              {/* 2X Larger Sphere */}
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: isNewlyAdded
                  ? 'radial-gradient(circle at 35% 35%, #fbbf24, #d97706)'
                  : 'radial-gradient(circle at 35% 35%, #fed7aa, #ea580c)',
                boxShadow: isNewlyAdded ? '0 0 18px rgba(217, 119, 6, 0.65)' : '0 4px 10px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1.9rem',
                border: isNewlyAdded ? '3px solid #ffffff' : 'none'
              }}>
                {itemNum}
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#78350f' }}>#{itemNum}</span>
            </div>
          );
        })}
      </div>

      {/* 2X Larger Explanation Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#fef3c7',
        border: '2.5px solid #f59e0b',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>💡</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#78350f' }}>
          “One more is added each time.”
        </span>
      </div>
    </div>
  );
}

// 3. ODD NUMBERS VISUAL
function OddNumbersVisual({ activeStageIndex }) {
  const oddValues = [1, 3, 5, 7, 9, 11, 13, 15];
  const count = oddValues[activeStageIndex] || 1;
  const numPairs = Math.floor(count / 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Objects Canvas: Pairs + 1 Unpaired */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        padding: '10px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #bfdbfe',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)'
      }}>
        {/* Render Pairs */}
        {Array.from({ length: numPairs }).map((_, pIdx) => {
          const isLatestPair = pIdx === numPairs - 1;
          return (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '4px 8px',
                background: isLatestPair ? '#eff6ff' : '#f8fafc',
                border: `2px dashed ${isLatestPair ? '#2563eb' : '#94a3b8'}`,
                borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #60a5fa, #2563eb)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #60a5fa, #2563eb)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                }} />
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#1e40af' }}>Pair {pIdx + 1}</span>
            </div>
          );
        })}

        {/* The 1 Solitary Unpaired Object */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          padding: '4px 12px',
          background: '#fef2f2',
          border: '2.5px solid #ef4444',
          borderRadius: '10px',
          animation: 'pulseGlow 1.8s infinite ease-in-out'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626)',
            boxShadow: '0 0 14px rgba(239, 68, 68, 0.6)'
          }} />
          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#b91c1c' }}>1 Unpaired!</span>
        </div>
      </div>

      {/* 2X Larger Explanation Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#dbeafe',
        border: '2.5px solid #3b82f6',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🔵</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#1e40af' }}>
          “2 more are added each time.” (Always leaves 1 unpaired)
        </span>
      </div>
    </div>
  );
}

// 4. EVEN NUMBERS VISUAL
function EvenNumbersVisual({ activeStageIndex }) {
  const evenValues = [2, 4, 6, 8, 10, 12, 14, 16];
  const count = evenValues[activeStageIndex] || 2;
  const numPairs = count / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Objects Canvas: Neat Partner Pairs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        padding: '10px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #fecaca',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.08)'
      }}>
        {Array.from({ length: numPairs }).map((_, pIdx) => {
          const isNewlyAddedPair = pIdx === numPairs - 1;
          return (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                background: isNewlyAddedPair ? '#fff1f2' : '#f8fafc',
                border: isNewlyAddedPair ? '3px solid #dc2626' : '2px solid #cbd5e1',
                borderRadius: '10px',
                boxShadow: isNewlyAddedPair ? '0 0 14px rgba(220, 38, 38, 0.35)' : 'none',
                animation: isNewlyAddedPair ? 'popBounce 0.35s ease-out' : 'none'
              }}
            >
              {isNewlyAddedPair && (
                <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#dc2626' }}>+2 New!</span>
              )}
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                }} />
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f87171, #dc2626)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.18)'
                }} />
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#991b1b' }}>Pair {pIdx + 1}</span>
            </div>
          );
        })}
      </div>

      {/* 2X Larger Explanation Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#fee2e2',
        border: '2.5px solid #ef4444',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>👫</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#991b1b' }}>
          “We add 2 each time.” (Complete partner pairs)
        </span>
      </div>
    </div>
  );
}

// 5. TRIANGULAR NUMBERS VISUAL
function TriangularNumbersVisual({ activeStageIndex }) {
  const numRows = activeStageIndex + 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Symmetrically Centered Triangle */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #a7f3d0',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(5, 150, 105, 0.08)'
      }}>
        {Array.from({ length: numRows }).map((_, rIdx) => {
          const rowNum = rIdx + 1;
          const isLatestRow = rowNum === numRows;
          return (
            <div
              key={rowNum}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '3px',
                animation: isLatestRow ? 'popBounce 0.3s ease-out' : 'none'
              }}
            >
              {Array.from({ length: rowNum }).map((_, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    width: numRows > 6 ? '24px' : '28px',
                    height: numRows > 6 ? '24px' : '28px',
                    borderRadius: '50%',
                    background: isLatestRow
                      ? 'radial-gradient(circle at 35% 35%, #34d399, #059669)'
                      : 'radial-gradient(circle at 35% 35%, #6ee7b7, #10b981)',
                    boxShadow: isLatestRow ? '0 0 12px rgba(5, 150, 105, 0.6)' : '0 3px 6px rgba(0,0,0,0.12)',
                    border: isLatestRow ? '2.5px solid #ffffff' : 'none'
                  }}
                />
              ))}
              <span style={{
                fontSize: '1.05rem',
                fontWeight: 900,
                color: isLatestRow ? '#047857' : '#94a3b8',
                marginLeft: '8px'
              }}>
                Row {rowNum} (+{rowNum})
              </span>
            </div>
          );
        })}
      </div>

      {/* 2X Larger Explanation Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#d1fae5',
        border: '2.5px solid #10b981',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🔺</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#065f46' }}>
          “Each new stage adds one more row.” (+2, +3, +4, +5...)
        </span>
      </div>
    </div>
  );
}

// 6. SQUARE NUMBERS VISUAL
function SquareNumbersVisual({ activeStageIndex }) {
  const dimension = activeStageIndex + 1;
  const total = dimension * dimension;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Physical Growing Square Grid */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #fde68a',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(180, 83, 9, 0.08)'
      }}>
        {/* Dimension Label Top */}
        <div style={{ fontSize: 'clamp(1.15rem, 1.35vw, 1.6rem)', fontWeight: 900, color: '#b45309', marginBottom: '4px' }}>
          {dimension} columns × {dimension} rows = {total} squares
        </div>

        {/* Grid of Squares */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gap: '3px',
          padding: '6px',
          background: '#fffbeb',
          border: '2.5px solid #b45309',
          borderRadius: '10px'
        }}>
          {Array.from({ length: total }).map((_, sIdx) => {
            const row = Math.floor(sIdx / dimension);
            const col = sIdx % dimension;
            const isBorderNew = (row === dimension - 1 || col === dimension - 1);
            const squareSize = dimension > 6 ? '19px' : dimension > 4 ? '25px' : '34px';
            return (
              <div
                key={sIdx}
                style={{
                  width: squareSize,
                  height: squareSize,
                  background: isBorderNew
                    ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)',
                  borderRadius: '4px',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                  border: '1.5px solid #b45309'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 2X Larger Formula & Rule Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#fef3c7',
        border: '2.5px solid #f59e0b',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🟨</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#92400e' }}>
          “The same number is multiplied by itself.” (n × n)
        </span>
      </div>
    </div>
  );
}

// 7. CUBE NUMBERS VISUAL (Isometric 3D Cube Structure)
function CubeNumbersVisual({ activeStageIndex }) {
  const n = Math.min(activeStageIndex + 1, 5); // Render up to 5 for depth performance
  const total = Math.pow(activeStageIndex + 1, 3);

  const unitSize = n === 1 ? 46 : n === 2 ? 30 : n === 3 ? 22 : n === 4 ? 16 : 13;
  const isoX = (x, y) => (x - y) * unitSize * 0.866;
  const isoY = (x, y, z) => (x + y) * unitSize * 0.5 - z * unitSize;

  const voxels = [];
  for (let z = 0; z < n; z++) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        voxels.push({ x, y, z });
      }
    }
  }
  voxels.sort((a, b) => (a.x + a.y + a.z) - (b.x + b.y + b.z));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* 3D Isometric Canvas */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #ddd6fe',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.08)'
      }}>
        <svg viewBox="-140 -85 280 170" style={{ width: '100%', height: '120px' }}>
          {voxels.map(({ x, y, z }, idx) => {
            const cx = isoX(x, y);
            const cy = isoY(x, y, z);
            const s = unitSize;
            const w = s * 0.866;
            const h = s * 0.5;

            return (
              <g key={idx} transform={`translate(${cx}, ${cy})`}>
                <polygon
                  points={`0,${-s} ${w},${-h} 0,0 ${-w},${-h}`}
                  fill="#c4b5fd"
                  stroke="#6d28d9"
                  strokeWidth="0.9"
                />
                <polygon
                  points={`${-w},${-h} 0,0 0,${s} ${-w},${h}`}
                  fill="#8b5cf6"
                  stroke="#6d28d9"
                  strokeWidth="0.9"
                />
                <polygon
                  points={`0,0 ${w},${-h} ${w},${h} 0,${s}`}
                  fill="#6d28d9"
                  stroke="#4c1d95"
                  strokeWidth="0.9"
                />
              </g>
            );
          })}
        </svg>

        <div style={{ fontSize: 'clamp(1.15rem, 1.35vw, 1.6rem)', fontWeight: 900, color: '#6d28d9', marginTop: '2px' }}>
          {activeStageIndex + 1} × {activeStageIndex + 1} × {activeStageIndex + 1} = {total} unit cubes
        </div>
      </div>

      {/* 2X Larger Cube Rule Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#ede9fe',
        border: '2.5px solid #8b5cf6',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🧊</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#5b21b6' }}>
          “The same number is multiplied three times.” (n × n × n)
        </span>
      </div>
    </div>
  );
}

// 8. VIRAHĀNKA NUMBERS VISUAL (Combining Two Blocks)
function VirahankaVisual({ activeStageIndex }) {
  const steps = [
    { a: 1, b: 2, sum: 3 },
    { a: 2, b: 3, sum: 5 },
    { a: 3, b: 5, sum: 8 },
    { a: 5, b: 8, sum: 13 },
    { a: 8, b: 13, sum: 21 },
    { a: 13, b: 21, sum: 34 }
  ];

  const currentStep = steps[activeStageIndex] || steps[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* 2X Larger Combination Arena */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '12px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #bae6fd',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.08)'
      }}>
        {/* Block A */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0369a1' }}>Previous #1</span>
          <div style={{
            width: '78px',
            height: '78px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '2.2rem',
            boxShadow: '0 5px 12px rgba(2, 132, 199, 0.4)'
          }}>
            {currentStep.a}
          </div>
        </div>

        {/* Plus Symbol */}
        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0284c7' }}>
          +
        </span>

        {/* Block B */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0369a1' }}>Previous #2</span>
          <div style={{
            width: '78px',
            height: '78px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '2.2rem',
            boxShadow: '0 5px 12px rgba(2, 132, 199, 0.4)'
          }}>
            {currentStep.b}
          </div>
        </div>

        {/* Arrow */}
        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0284c7' }}>→</span>

        {/* Result Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0284c7' }}>Combined Sum</span>
          <div style={{
            width: '92px',
            height: '92px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            border: '3.5px solid #38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '2.5rem',
            boxShadow: '0 0 20px rgba(2, 132, 199, 0.6)'
          }}>
            {currentStep.sum}
          </div>
        </div>
      </div>

      {/* 2X Larger Virahānka Rule Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#e0f2fe',
        border: '2.5px solid #0284c7',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🌀</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#0369a1' }}>
          “Add the previous two numbers to get the next number.”
        </span>
      </div>
    </div>
  );
}

// 9. POWERS OF 2 VISUAL (Doubling Branches)
function PowersOfTwoVisual({ activeStageIndex }) {
  const stage = activeStageIndex + 1;
  const count = Math.pow(2, stage - 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Doubling Progression Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '10px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #fbcfe8',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(219, 39, 119, 0.08)'
      }}>
        {Array.from({ length: Math.min(count, 32) }).map((_, i) => (
          <div
            key={i}
            style={{
              width: count > 16 ? '32px' : count > 8 ? '42px' : '52px',
              height: count > 16 ? '32px' : count > 8 ? '42px' : '52px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #f472b6, #db2777)',
              boxShadow: '0 0 14px rgba(219, 39, 119, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: count > 16 ? '0.95rem' : '1.35rem',
              animation: 'popBounce 0.35s ease-out'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* 2X Larger Doubling Equation Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#fce7f3',
        border: '2.5px solid #db2777',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>⚡</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#9d174d' }}>
          “Each number is multiplied by 2.” (Doubles every step)
        </span>
      </div>
    </div>
  );
}

// 10. POWERS OF 3 VISUAL (Tripling Clusters)
function PowersOfThreeVisual({ activeStageIndex }) {
  const stage = activeStageIndex + 1;
  const numClusters = stage === 1 ? 1 : Math.pow(3, stage - 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* Clusters of 3 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        padding: '10px 18px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '2.5px solid #99f6e4',
        minHeight: 'auto',
        width: '92%',
        boxSizing: 'border-box',
        boxShadow: '0 4px 14px rgba(13, 148, 136, 0.08)'
      }}>
        {stage === 1 ? (
          <div style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #2dd4bf, #0d9488)',
            boxShadow: '0 0 16px rgba(13, 148, 136, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '2.0rem'
          }}>
            1
          </div>
        ) : (
          Array.from({ length: Math.min(numClusters, 27) }).map((_, cIdx) => (
            <div
              key={cIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: '#f0fdfa',
                border: '2px solid #2dd4bf',
                borderRadius: '10px'
              }}
            >
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #2dd4bf, #0d9488)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.18)'
                  }}
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* 2X Larger Tripling Rule Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 22px',
        background: '#ccfbf1',
        border: '2.5px solid #0d9488',
        borderRadius: '35px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🌿</span>
        <span style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.5rem)', fontWeight: 900, color: '#115e59' }}>
          “Each number is multiplied by 3.” (Triples every step)
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN LAB VIEW SWITCHER
// ─────────────────────────────────────────────────────────────────────────────
function PatternVisualCanvas({ pattern, activeStageIndex }) {
  switch (pattern.id) {
    case 'all_ones':
      return <AllOnesVisual activeStageIndex={activeStageIndex} />;
    case 'counting':
      return <CountingNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'odd_numbers':
      return <OddNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'even_numbers':
      return <EvenNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'triangular':
      return <TriangularNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'squares':
      return <SquareNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'cubes':
      return <CubeNumbersVisual activeStageIndex={activeStageIndex} />;
    case 'virahanka':
      return <VirahankaVisual activeStageIndex={activeStageIndex} />;
    case 'powers_of_2':
      return <PowersOfTwoVisual activeStageIndex={activeStageIndex} />;
    case 'powers_of_3':
      return <PowersOfThreeVisual activeStageIndex={activeStageIndex} />;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NUMBER PATTERN LAB COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function NumberPatternLab() {
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const selectedPattern = PATTERNS_CONFIG.find((p) => p.id === selectedPatternId) || null;

  // Handle pattern selection
  const handleSelectPattern = (id) => {
    setSelectedPatternId(id);
    setActiveStageIndex(0);
  };

  // Back to cards home
  const handleBackToHome = () => {
    setSelectedPatternId(null);
  };

  // Next pattern in sequence
  const handleNextPattern = () => {
    if (!selectedPattern) return;
    const currentIdx = PATTERNS_CONFIG.findIndex((p) => p.id === selectedPattern.id);
    const nextIdx = (currentIdx + 1) % PATTERNS_CONFIG.length;
    handleSelectPattern(PATTERNS_CONFIG[nextIdx].id);
  };

  // Previous pattern in sequence
  const handlePrevPattern = () => {
    if (!selectedPattern) return;
    const currentIdx = PATTERNS_CONFIG.findIndex((p) => p.id === selectedPattern.id);
    const prevIdx = (currentIdx - 1 + PATTERNS_CONFIG.length) % PATTERNS_CONFIG.length;
    handleSelectPattern(PATTERNS_CONFIG[prevIdx].id);
  };

  return (
    <div style={{
      flex: '1 1 auto',
      minHeight: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fbf9f5',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes popBounce {
          0% { transform: scale(0.65) translateY(-8px); opacity: 0; }
          60% { transform: scale(1.12) translateY(2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.06); filter: brightness(1.2); }
        }
      `}</style>

      {/* ── VIEW 1: NUMBER PATTERN LAB HOME (10 INTERACTIVE CARDS - 5x2 SINGLE SCREEN) ── */}
      {!selectedPattern ? (
        <div style={{
          flex: '1 1 auto',
          minHeight: 0,
          height: '100%',
          width: '100%',
          padding: '10px 14px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gap: '10px'
        }}>
          {PATTERNS_CONFIG.map((pattern) => (
            <div
              key={pattern.id}
              onClick={() => handleSelectPattern(pattern.id)}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: `2px solid ${pattern.themeColor}38`,
                borderTop: `6px solid ${pattern.themeColor}`,
                padding: '8px 12px 10px 12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                transition: 'all 0.18s ease',
                position: 'relative',
                boxSizing: 'border-box',
                minHeight: 0,
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 18px ${pattern.themeColor}2e`;
                e.currentTarget.style.borderColor = pattern.themeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = `${pattern.themeColor}38`;
              }}
            >
              {/* Top Row: Index Badge & Title & Emoji */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                  <span style={{
                    fontSize: 'clamp(0.95rem, 1.05vw, 1.2rem)',
                    fontWeight: 900,
                    color: pattern.themeColor,
                    background: pattern.accentBg,
                    padding: '2px 7px',
                    borderRadius: '6px',
                    border: `1.5px solid ${pattern.themeColor}55`,
                    flexShrink: 0,
                    lineHeight: 1
                  }}>
                    #{pattern.index}
                  </span>
                  <h3 style={{
                    margin: 0,
                    fontSize: 'clamp(1.15rem, 1.28vw, 1.48rem)',
                    fontWeight: 900,
                    color: '#091124',
                    lineHeight: 1.15,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {pattern.title}
                  </h3>
                </div>
                <span style={{ fontSize: 'clamp(1.4rem, 1.6vw, 1.85rem)', lineHeight: 1, flexShrink: 0 }}>
                  {pattern.emoji}
                </span>
              </div>

              {/* Mini Visual Representation */}
              <div style={{
                padding: '4px 6px',
                background: '#f8fafc',
                borderRadius: '8px',
                margin: '3px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #e2e8f0',
                flex: '1 1 auto',
                minHeight: '36px',
                maxHeight: '52px',
                overflow: 'hidden'
              }}>
                <MiniPatternPreview patternId={pattern.id} color={pattern.themeColor} />
              </div>

              {/* Sequence numbers text - High Prominence */}
              <div style={{
                fontSize: 'clamp(1.12rem, 1.26vw, 1.45rem)',
                fontWeight: 900,
                color: '#091124',
                background: '#f1f5f9',
                border: `1.5px solid ${pattern.themeColor}44`,
                borderRadius: '7px',
                padding: '4px 6px',
                margin: '2px 0 4px 0',
                textAlign: 'center',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 0
              }}>
                {pattern.sequenceDisplay}
              </div>

              {/* Explanation/Rule text - Bold and Clear */}
              <div style={{
                fontSize: 'clamp(0.9rem, 1.02vw, 1.15rem)',
                fontWeight: 800,
                color: '#1e293b',
                lineHeight: 1.25,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '2.4em',
                flexShrink: 0
              }}>
                {pattern.ruleText}
              </div>

              {/* Bottom Row: Enter Lab Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop: '5px',
                borderTop: '1.5px solid #f1f5f9',
                marginTop: 'auto',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: 'clamp(1.02rem, 1.15vw, 1.28rem)',
                  fontWeight: 900,
                  color: pattern.themeColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>Enter Lab</span>
                  <ChevronRight size={18} strokeWidth={3} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── VIEW 2: VISUAL NUMBER-BUILDING LABORATORY (2X LARGER, COMPACT SCREEN-FIT) ── */
        <div style={{
          flex: 1,
          minHeight: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4px 16px 8px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Quick Pattern Switcher Pills with Back to Home Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            marginBottom: '4px',
            flexShrink: 0
          }}>
            <button
              type="button"
              onClick={handleBackToHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 18px',
                background: '#ffffff',
                border: '2.5px solid #0f172a',
                borderRadius: '25px',
                color: '#0f172a',
                fontSize: 'clamp(1.02rem, 1.15vw, 1.35rem)',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <ArrowLeft size={18} strokeWidth={2.6} />
              <span>← All 10 Patterns</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', flex: 1 }}>
              {PATTERNS_CONFIG.map((p) => {
                const isActive = p.id === selectedPattern.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPattern(p.id)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '25px',
                      background: isActive ? p.themeColor : '#ffffff',
                      color: isActive ? '#ffffff' : '#1e293b',
                      border: `2px solid ${isActive ? p.themeColor : '#cbd5e1'}`,
                      fontSize: 'clamp(0.92rem, 1.05vw, 1.18rem)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      boxShadow: isActive ? `0 2px 8px ${p.themeColor}44` : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{p.emoji}</span>
                    <span>{p.index}. {p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Laboratory Main Container - Fit Single Screen */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
            background: '#ffffff',
            borderRadius: '16px',
            border: `3px solid ${selectedPattern.themeColor}55`,
            boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
            padding: '8px 14px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* ── STEP 1: SEE THE NUMBERS (2X LARGER) ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '2px solid #cbd5e1',
              flexWrap: 'nowrap',
              gap: '12px',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <span style={{ fontSize: 'clamp(2.4rem, 2.8vw, 3.2rem)', lineHeight: 1 }}>
                  {selectedPattern.emoji}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: 'clamp(1.05rem, 1.2vw, 1.35rem)',
                      fontWeight: 900,
                      color: selectedPattern.themeColor,
                      background: selectedPattern.accentBg,
                      padding: '2px 10px',
                      borderRadius: '8px',
                      border: `1.5px solid ${selectedPattern.themeColor}55`
                    }}>
                      Pattern #{selectedPattern.index}
                    </span>
                    <h2 style={{
                      margin: 0,
                      fontSize: 'clamp(1.45rem, 1.75vw, 2.2rem)',
                      fontWeight: 900,
                      color: '#091124',
                      whiteSpace: 'nowrap'
                    }}>
                      {selectedPattern.title}
                    </h2>
                  </div>
                  <div style={{
                    fontSize: 'clamp(1.2rem, 1.4vw, 1.75rem)',
                    fontWeight: 900,
                    color: '#0f172a',
                    marginTop: '2px',
                    whiteSpace: 'nowrap'
                  }}>
                    Sequence: <strong style={{ color: selectedPattern.themeColor }}>{selectedPattern.sequenceDisplay}</strong>
                  </div>
                </div>
              </div>

              {/* Stage Stepper Buttons (2X LARGER, NO DEMONSTRATE NEXT) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <span style={{ fontSize: 'clamp(1.0rem, 1.15vw, 1.3rem)', fontWeight: 900, color: '#475569' }}>
                  STAGE:
                </span>
                {selectedPattern.stages.map((stg, sIdx) => {
                  const isActive = activeStageIndex === sIdx;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveStageIndex(sIdx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: isActive ? selectedPattern.themeColor : '#ffffff',
                        color: isActive ? '#ffffff' : '#0f172a',
                        border: `2.5px solid ${isActive ? selectedPattern.themeColor : '#94a3b8'}`,
                        fontSize: 'clamp(1.05rem, 1.2vw, 1.35rem)',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? `0 2px 8px ${selectedPattern.themeColor}44` : 'none'
                      }}
                    >
                      {stg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── STEP 2: WATCH THEM BUILD (PHYSICAL VISUAL CANVAS - 2X LARGER) ── */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)',
              borderRadius: '14px',
              border: '2px solid #cbd5e1',
              padding: '4px 14px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Active Stage Indicator Badge */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 2
              }}>
                <span style={{
                  fontSize: 'clamp(1.1rem, 1.25vw, 1.45rem)',
                  fontWeight: 900,
                  color: selectedPattern.themeColor,
                  background: selectedPattern.accentBg,
                  padding: '4px 16px',
                  borderRadius: '25px',
                  border: `2px solid ${selectedPattern.themeColor}66`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  Stage {activeStageIndex + 1}: {selectedPattern.stages[activeStageIndex]?.note}
                </span>
              </div>

              {/* Physical Growth Visual */}
              <PatternVisualCanvas
                pattern={selectedPattern}
                activeStageIndex={activeStageIndex}
              />
            </div>

            {/* ── STEP 3: UNDERSTAND HOW THEY CHANGE (2X LARGER, NO AUTO BUILD, NO DEMO NEXT) ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '12px 18px',
              background: '#f8fafc',
              borderRadius: '14px',
              border: '2.5px solid #cbd5e1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              flexShrink: 0,
              minHeight: '84px',
              boxSizing: 'border-box'
            }}>
              {/* Left: Logic & Transition Explanation - 2X Larger, High Contrast, Fully Visible */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.45rem', lineHeight: 1 }}>💡</span>
                  <span style={{
                    fontSize: 'clamp(1.15rem, 1.3vw, 1.48rem)',
                    fontWeight: 900,
                    color: '#091124',
                    letterSpacing: '0.02em',
                    lineHeight: 1.35
                  }}>
                    UNDERSTAND HOW THEY CHANGE:
                  </span>
                </div>
                <div style={{
                  margin: 0,
                  fontSize: 'clamp(1.22rem, 1.42vw, 1.75rem)',
                  fontWeight: 800,
                  color: '#1e293b',
                  lineHeight: 1.45,
                  wordBreak: 'break-word'
                }}>
                  Rule: <strong style={{ color: selectedPattern.themeColor }}>{selectedPattern.ruleText}</strong>
                  <span style={{ margin: '0 10px', color: '#94a3b8', fontWeight: 900 }}>—</span>
                  Transition:{' '}
                  <strong style={{ color: '#091124', fontSize: 'clamp(1.3rem, 1.55vw, 1.95rem)' }}>
                    {selectedPattern.stages[activeStageIndex]?.equation}
                  </strong>
                </div>
              </div>

              {/* Right: Controls (ONLY "Previous" and "Next Pattern" - NO DEMONSTRATE NEXT, NO AUTO BUILD) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0
              }}>
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (activeStageIndex > 0) {
                      setActiveStageIndex(activeStageIndex - 1);
                    } else {
                      handlePrevPattern();
                    }
                  }}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '2.5px solid #94a3b8',
                    color: '#0f172a',
                    fontSize: 'clamp(1.15rem, 1.3vw, 1.45rem)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = selectedPattern.themeColor;
                    e.currentTarget.style.color = selectedPattern.themeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#94a3b8';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                >
                  <ChevronLeft size={22} strokeWidth={2.8} />
                  <span>Previous</span>
                </button>

                {/* Next Pattern in Lab */}
                <button
                  type="button"
                  onClick={handleNextPattern}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: selectedPattern.themeColor,
                    border: `2.5px solid ${selectedPattern.themeColor}`,
                    color: '#ffffff',
                    fontSize: 'clamp(1.15rem, 1.3vw, 1.45rem)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: `0 3px 10px ${selectedPattern.themeColor}55`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>Next Pattern</span>
                  <ArrowRight size={20} strokeWidth={2.8} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
