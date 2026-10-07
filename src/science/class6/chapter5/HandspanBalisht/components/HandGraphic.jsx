import React from 'react';

// Crisp, scalable SVG representation of an outstretched handspan (balisht)
// displaying measurement span from thumb tip to little finger tip
export default function HandGraphic({ 
  width = 160, 
  height = 130, 
  skinTone = '#FBBF24', 
  strokeColor = '#B45309',
  showMeasureLine = true,
  label = "Handspan (Balisht)",
  spanValue = "15 cm"
}) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`skinGrad-${skinTone}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor={skinTone} />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="handShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Palm & Fingers Path (Outstretched right hand seen from top) */}
        <g filter="url(#handShadow)">
          {/* Wrist base */}
          <path
            d="M 88 150 C 95 155, 105 155, 112 150 L 118 115 C 118 115, 100 112, 82 115 Z"
            fill={`url(#skinGrad-${skinTone})`}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Palm Body */}
          <path
            d="M 80 115 
               C 65 105, 55 90, 50 78 
               C 42 62, 30 52, 22 45 
               C 16 38, 25 30, 34 36 
               C 46 44, 62 60, 72 68 
               C 72 50, 70 28, 73 18 
               C 75 10, 85 10, 88 18 
               C 92 30, 94 52, 94 62 
               C 96 46, 98 18, 103 10 
               C 106 2, 116 3, 118 11 
               C 121 25, 120 52, 118 64 
               C 124 50, 132 26, 137 20 
               C 142 12, 151 16, 149 25 
               C 146 38, 140 60, 136 72 
               C 146 62, 164 46, 172 42 
               C 180 38, 188 47, 180 56 
               C 168 70, 148 94, 135 108 
               C 128 114, 122 115, 118 115 
               Z"
            fill={`url(#skinGrad-${skinTone})`}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Palm Crease Lines */}
          <path d="M 68 82 Q 95 95 125 84" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 78 96 Q 100 106 122 96" stroke="rgba(180, 83, 9, 0.35)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 52 70 Q 75 88 80 110" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>

        {/* Finger Tips Indicator Dots */}
        {/* Thumb Tip */}
        <circle cx="26" cy="40" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
        {/* Little Finger Tip */}
        <circle cx="176" cy="48" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />

        {/* Measurement Span Line between Thumb Tip & Little Finger Tip */}
        {showMeasureLine && (
          <g>
            {/* Guide Extension lines */}
            <line x1="26" y1="40" x2="26" y2="15" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="176" y1="48" x2="176" y2="15" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Span Arrow Line */}
            <line x1="26" y1="18" x2="176" y2="18" stroke="#EF4444" strokeWidth="2.5" />
            <polygon points="26,18 34,14 34,22" fill="#EF4444" />
            <polygon points="176,18 168,14 168,22" fill="#EF4444" />

            {/* Span Value Badge */}
            <rect x="74" y="6" width="54" height="22" rx="11" fill="#EF4444" />
            <text x="101" y="21" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Outfit, Inter, sans-serif">
              {spanValue}
            </text>
          </g>
        )}
      </svg>
      {label && (
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', marginTop: '0.2rem' }}>
          {label}
        </span>
      )}
    </div>
  );
}
