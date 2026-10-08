import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Ruler, Compass, AlertCircle, ArrowRight } from 'lucide-react';
import HandGraphic from './HandGraphic';
import { playSpanSound } from './audioHelper';

export const BODY_UNITS_DATA = [
  {
    id: 'handspan',
    name: 'Handspan (Balisht)',
    hindi: 'बालिश्त',
    icon: '🖐️',
    speaker: 'Deepa',
    speakerQuote: '“Let us use our handspan. I will show you how to use it. My mother calls it balisht.”',
    definition: 'Distance from the tip of the thumb to the tip of the little finger on a fully outstretched hand.',
    approxValue: '14 – 18 cm',
    commonUse: 'Measuring classroom desks, books, small cloth pieces, and craft items.',
    limitations: 'Varies with age, gender, and individual hand size.'
  },
  {
    id: 'arm_cubit',
    name: 'Arm Length / Cubit (Haath)',
    hindi: 'हाथ',
    icon: '💪',
    speaker: 'Hardeep',
    speakerQuote: '“I have seen my grandmother measuring cloth by the length of her arm.”',
    definition: 'Distance from the elbow joint to the tip of the middle finger (historically known as a Cubit or Haath).',
    approxValue: '45 – 50 cm',
    commonUse: 'Drapers, flower garland sellers (gajra), and tailors measuring cloth pieces.',
    limitations: 'A taller person with longer arms sells longer cloth than a shorter person.'
  },
  {
    id: 'strides',
    name: 'Strides / Pace (Kadam)',
    hindi: 'कदम',
    icon: '🚶',
    speaker: 'Padma',
    speakerQuote: '“Have you ever seen how a farmer measures length to divide his field into beds? He walks and counts his strides.”',
    definition: 'Distance covered in one full walking step (heel of back foot to heel of front foot).',
    approxValue: '70 – 90 cm',
    commonUse: 'Farmers dividing agricultural land beds, cricket pitch length, playground marking.',
    limitations: 'Walking speed, slope, and leg length alter stride length drastically.'
  },
  {
    id: 'foot',
    name: 'Foot Length (Pag)',
    hindi: 'पग',
    icon: '🦶',
    speaker: 'Anish',
    speakerQuote: '“Oh, not just the length of strides—sometimes they also use the length of their feet to measure.”',
    definition: 'Distance from the back of the heel to the tip of the longest toe.',
    approxValue: '22 – 28 cm',
    commonUse: 'Measuring room floor length, carpets, playground boundaries.',
    limitations: 'Adult feet are much longer than children’s feet.'
  },
  {
    id: 'angula',
    name: 'Four Fingers (Char Angula)',
    hindi: 'चार अंगुल',
    icon: '✋',
    speaker: 'Deepa’s Mother',
    speakerQuote: '“Please increase the uniform length by char angula (four fingers width).”',
    definition: 'Combined width of four fingers placed side-by-side (index, middle, ring, little).',
    approxValue: '6 – 8 cm',
    commonUse: 'Ancient Indian medicine (Ayurveda), tailoring adjustments, traditional woodwork.',
    limitations: 'Finger thickness differs significantly across people.'
  }
];

export default function BodyUnitsExplorer() {
  const [selectedUnitId, setSelectedUnitId] = useState('handspan');
  const [activeObjectLengthCm, setActiveObjectLengthCm] = useState(150); // 150 cm cloth/ground

  const currentUnit = BODY_UNITS_DATA.find(u => u.id === selectedUnitId) || BODY_UNITS_DATA[0];

  const handleSelect = (id) => {
    playSpanSound('switch');
    setSelectedUnitId(id);
  };

  return (
    <div className="body-units-explorer-container">
      {/* Unit Selector Cards */}
      <div className="unit-cards-grid">
        {BODY_UNITS_DATA.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          return (
            <div
              key={unit.id}
              onClick={() => handleSelect(unit.id)}
              className={`body-unit-select-card ${isSelected ? 'active' : ''}`}
            >
              <div className="unit-card-icon">{unit.icon}</div>
              <div className="unit-card-text">
                <strong className="unit-card-title">{unit.name}</strong>
                <span className="unit-card-hindi">{unit.hindi}</span>
              </div>
              <span className="unit-card-speaker">Mentioned by {unit.speaker}</span>
            </div>
          );
        })}
      </div>

      {/* Detailed Interactive Inspector for Selected Unit */}
      <div className="unit-detail-inspector-card">
        {/* Header Strip */}
        <div className="inspector-header">
          <div className="inspector-title-group">
            <span className="inspector-badge">TRADITIONAL NON-STANDARD UNIT</span>
            <h3 className="inspector-name">
              {currentUnit.name} <span className="hindi-tag">({currentUnit.hindi})</span>
            </h3>
          </div>
          <div className="approx-value-pill">
            <Ruler size={16} />
            <span>Approx: {currentUnit.approxValue}</span>
          </div>
        </div>

        {/* Story Quote Callout */}
        <div className="story-quote-callout">
          <div className="quote-avatar-bubble">💬</div>
          <div className="quote-body">
            <span className="quote-speaker">{currentUnit.speaker} in Chapter 5:</span>
            <p className="quote-text">{currentUnit.speakerQuote}</p>
          </div>
        </div>

        {/* Visual Demonstration Board */}
        <div className="unit-visual-demo-board">
          <div className="demo-left-art">
            {currentUnit.id === 'handspan' && (
              <HandGraphic width={180} height={140} label="Thumb tip to Little finger tip" spanValue="~15 cm" />
            )}
            {currentUnit.id === 'arm_cubit' && (
              <div className="arm-graphic-placeholder">
                <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
                  <path d="M 20 80 Q 80 75 140 60 L 190 35 L 205 32" stroke="#B45309" strokeWidth="14" strokeLinecap="round" />
                  {/* Elbow */}
                  <circle cx="20" cy="80" r="10" fill="#EF4444" />
                  <text x="20" y="105" fontSize="11" fontWeight="800" fill="#EF4444" textAnchor="middle">Elbow Joint</text>
                  {/* Finger Tip */}
                  <circle cx="205" cy="32" r="8" fill="#EF4444" />
                  <text x="185" y="18" fontSize="11" fontWeight="800" fill="#EF4444" textAnchor="middle">Middle Finger Tip</text>
                  {/* Measurement Span */}
                  <line x1="20" y1="50" x2="205" y2="50" stroke="#059669" strokeWidth="2.5" strokeDasharray="4 4" />
                  <rect x="75" y="38" width="70" height="22" rx="11" fill="#059669" />
                  <text x="110" y="53" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">1 Haath (Cubit)</text>
                </svg>
              </div>
            )}
            {currentUnit.id === 'strides' && (
              <div className="strides-graphic-box">
                <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
                  {/* Back Foot */}
                  <ellipse cx="40" cy="85" rx="20" ry="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                  {/* Front Foot */}
                  <ellipse cx="180" cy="85" rx="20" ry="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                  {/* Stride Span Line */}
                  <line x1="40" y1="50" x2="180" y2="50" stroke="#2563EB" strokeWidth="2.5" />
                  <polygon points="40,50 48,46 48,54" fill="#2563EB" />
                  <polygon points="180,50 172,46 172,54" fill="#2563EB" />
                  <rect x="75" y="38" width="70" height="22" rx="11" fill="#2563EB" />
                  <text x="110" y="53" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">1 Stride (Kadam)</text>
                </svg>
              </div>
            )}
            {currentUnit.id === 'foot' && (
              <div className="foot-graphic-box">
                <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
                  {/* Foot Sole */}
                  <path d="M 30 55 C 30 35, 60 35, 90 40 C 130 45, 170 30, 190 45 C 195 55, 185 70, 160 70 C 120 70, 70 75, 30 65 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
                  {/* Heel */}
                  <circle cx="30" cy="58" r="6" fill="#EF4444" />
                  {/* Longest Toe */}
                  <circle cx="190" cy="45" r="6" fill="#EF4444" />
                  {/* Span Line */}
                  <line x1="30" y1="20" x2="190" y2="20" stroke="#7C3AED" strokeWidth="2.5" />
                  <polygon points="30,20 38,16 38,24" fill="#7C3AED" />
                  <polygon points="190,20 182,16 182,24" fill="#7C3AED" />
                  <rect x="75" y="8" width="70" height="22" rx="11" fill="#7C3AED" />
                  <text x="110" y="23" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">1 Foot (Pag)</text>
                </svg>
              </div>
            )}
            {currentUnit.id === 'angula' && (
              <div className="angula-graphic-box">
                <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
                  {/* 4 Fingers together */}
                  <rect x="50" y="30" width="22" height="60" rx="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                  <rect x="75" y="24" width="24" height="66" rx="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                  <rect x="102" y="27" width="23" height="63" rx="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                  <rect x="128" y="38" width="20" height="52" rx="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                  {/* Width Span Line */}
                  <line x1="50" y1="12" x2="148" y2="12" stroke="#DC2626" strokeWidth="2.5" />
                  <polygon points="50,12 58,8 58,16" fill="#DC2626" />
                  <polygon points="148,12 140,8 140,16" fill="#DC2626" />
                  <rect x="62" y="0" width="74" height="22" rx="11" fill="#DC2626" />
                  <text x="99" y="15" fill="#FFFFFF" fontSize="10" fontWeight="800" textAnchor="middle">Char Angula</text>
                </svg>
              </div>
            )}
          </div>

          <div className="demo-right-details">
            <div className="detail-item">
              <strong className="detail-label">Definition:</strong>
              <p className="detail-value">{currentUnit.definition}</p>
            </div>
            <div className="detail-item">
              <strong className="detail-label">Traditional Everyday Uses:</strong>
              <p className="detail-value">{currentUnit.commonUse}</p>
            </div>
            <div className="detail-item limitation">
              <strong className="detail-label">
                <AlertCircle size={15} color="#DC2626" />
                Why it fails as a Standard Unit:
              </strong>
              <p className="detail-value warning-text">{currentUnit.limitations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
