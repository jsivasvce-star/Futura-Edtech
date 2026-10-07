import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check } from 'lucide-react';
import './point.css';

/**
 * High-Definition Photorealistic Vectors of Real-World Tools
 */

// 1. Realistic Sharpened Yellow Pencil
function RealisticPencil({ 
  width = 340, 
  height = 180, 
  highlightTip = false, 
  onClickTip = null,
  onClickBody = null,
  onClickPaper = null
}) {
  return (
    <svg 
      viewBox="0 0 360 200" 
      width={width} 
      height={height} 
      style={{ overflow: 'visible', filter: 'drop-shadow(0 12px 24px rgba(15, 23, 42, 0.12))' }}
    >
      <defs>
        {/* Soft Drop Shadow under pencil */}
        <filter id="pencilShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="8" dy="16" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.14" />
        </filter>
        {/* Wood collar gradient */}
        <linearGradient id="pencilWoodCone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="50%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        {/* Eraser gradient */}
        <linearGradient id="eraserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="60%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        {/* Ferrule metallic gradient */}
        <linearGradient id="ferruleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="30%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Pencil Assembly rotated at 38 degrees */}
      <g transform="rotate(-38 90 140)">
        {/* Main Hexagonal Barrel (3 visible faceted planes) */}
        <g onClick={onClickBody} style={{ cursor: onClickBody ? 'pointer' : 'default' }}>
          {/* Top highlight facet */}
          <rect x="90" y="126" width="180" height="9" fill="#FDE047" />
          {/* Middle facet */}
          <rect x="90" y="135" width="180" height="10" fill="#EAB308" />
          {/* Bottom shadow facet */}
          <rect x="90" y="145" width="180" height="9" fill="#CA8A04" />
          {/* Hot foil branding stripe */}
          <rect x="150" y="139" width="70" height="2.5" fill="#FEF08A" opacity="0.8" rx="1" />

          {/* Aluminum Ferrule */}
          <rect x="270" y="125" width="22" height="30" fill="url(#ferruleGrad)" rx="1.5" />
          <line x1="277" y1="125" x2="277" y2="155" stroke="#334155" strokeWidth="1" opacity="0.6" />
          <line x1="284" y1="125" x2="284" y2="155" stroke="#334155" strokeWidth="1" opacity="0.6" />

          {/* Pink Rubber Eraser */}
          <rect x="292" y="126" width="16" height="28" fill="url(#eraserGrad)" rx="3" />
        </g>

        {/* Sharpened Cedar Wood Cone */}
        <polygon points="90,126 50,139.5 90,154" fill="url(#pencilWoodCone)" />
        {/* Subtle wood grains */}
        <path d="M 85 128 Q 70 135 60 139" stroke="#C2410C" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M 85 152 Q 70 144 60 140" stroke="#C2410C" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* Sharp Graphite Lead Core */}
        <polygon points="62,135 44,139.5 62,144" fill="#0F172A" />

        {/* Microscopic Pinpoint Tip */}
        <circle 
          cx="44" 
          cy="139.5" 
          r={highlightTip ? "6" : "3.5"} 
          fill={highlightTip ? "#0284C7" : "#0F172A"}
          onClick={onClickTip}
          style={{ cursor: onClickTip ? 'pointer' : 'default', transition: 'all 0.22s ease' }}
        />
        {highlightTip && (
          <circle cx="44" cy="139.5" r="11" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="3,2" />
        )}
      </g>
    </svg>
  );
}

// 2. Realistic Drafting Compass
function RealisticCompass({ 
  width = 240, 
  height = 200, 
  highlightTip = false, 
  onClickTip = null,
  onClickHinge = null
}) {
  return (
    <svg 
      viewBox="0 0 240 220" 
      width={width} 
      height={height} 
      style={{ overflow: 'visible', filter: 'drop-shadow(0 12px 24px rgba(15, 23, 42, 0.12))' }}
    >
      <defs>
        <linearGradient id="compassSteel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="35%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      {/* Top Spindle & Knurled Pivot Knob */}
      <g onClick={onClickHinge} style={{ cursor: onClickHinge ? 'pointer' : 'default' }}>
        <rect x="114" y="10" width="12" height="24" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
        {/* Knurled grips */}
        <line x1="114" y1="16" x2="126" y2="16" stroke="#94A3B8" strokeWidth="1" />
        <line x1="114" y1="22" x2="126" y2="22" stroke="#94A3B8" strokeWidth="1" />
        <line x1="114" y1="28" x2="126" y2="28" stroke="#94A3B8" strokeWidth="1" />
        {/* Main Hinge Disc */}
        <circle cx="120" y="44" r="14" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <circle cx="120" y="44" r="6" fill="#475569" />
      </g>

      {/* Left Leg: Steel Needle Leg */}
      <path d="M 114 48 L 68 160 L 64 160 L 110 48 Z" fill="url(#compassSteel)" stroke="#475569" strokeWidth="1" />
      {/* Precision Needle Chuck & Steel Point */}
      <polygon points="68,160 58,198 64,160" fill="#334155" />
      {/* Needle Stylus Pinpoint Tip */}
      <circle 
        cx="58" 
        cy="198" 
        r={highlightTip ? "6.5" : "3.5"} 
        fill={highlightTip ? "#0284C7" : "#0F172A"} 
        onClick={onClickTip}
        style={{ cursor: onClickTip ? 'pointer' : 'default' }}
      />
      {highlightTip && (
        <circle cx="58" cy="198" r="12" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="3,2" />
      )}

      {/* Right Leg: Pencil Lead Leg */}
      <path d="M 126 48 L 172 160 L 176 160 L 130 48 Z" fill="url(#compassSteel)" stroke="#475569" strokeWidth="1" />
      {/* Thumb Screws */}
      <circle cx="174" cy="154" r="5" fill="#CA8A04" stroke="#854D0E" strokeWidth="1" />
      {/* Pencil Lead Point */}
      <polygon points="172,160 178,195 176,160" fill="#1E293B" />
    </svg>
  );
}

// 3. Realistic Sewing Needle
function RealisticNeedle({ 
  width = 280, 
  height = 100, 
  highlightTip = false, 
  onClickTip = null,
  onClickEye = null
}) {
  return (
    <svg 
      viewBox="0 0 280 100" 
      width={width} 
      height={height} 
      style={{ overflow: 'visible', filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.12))' }}
    >
      <defs>
        <linearGradient id="needleChrome" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="25%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Trailing Red Silk Thread Looping Through Eye */}
      <path 
        d="M 240 50 Q 252 35 268 40 Q 280 44 288 32 Q 295 24 300 36" 
        fill="none" 
        stroke="#EF4444" 
        strokeWidth="2.2" 
        strokeLinecap="round"
        opacity="0.85" 
      />

      {/* Tapered Surgical Steel Needle Shaft */}
      <path 
        d="M 250 50 L 90 48.2 L 35 50 L 90 51.8 Z" 
        fill="url(#needleChrome)" 
        stroke="#64748B" 
        strokeWidth="0.8" 
      />

      {/* Precision Elongated Eye Slot */}
      <g onClick={onClickEye} style={{ cursor: onClickEye ? 'pointer' : 'default' }}>
        <ellipse cx="242" cy="50" rx="9" ry="2.2" fill="#334155" />
      </g>

      {/* Razor-Sharp Needle Tip */}
      <circle 
        cx="35" 
        cy="50" 
        r={highlightTip ? "6.5" : "3"} 
        fill={highlightTip ? "#0284C7" : "#0F172A"} 
        onClick={onClickTip}
        style={{ cursor: onClickTip ? 'pointer' : 'default' }}
      />
      {highlightTip && (
        <circle cx="35" cy="50" r="12" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="3,2" />
      )}
    </svg>
  );
}

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * SECTION 2.1: POINT — COMPLETE FULL-SCREEN LEARNING APPLICATION (8 SCREENS)
 * ══════════════════════════════════════════════════════════════════════════════
 */
export default function Section2_1Point({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1); // 1 to 8

  // Screen 1: Touch State
  const [s1Touched, setS1Touched] = useState(false);
  const [s1Zoomed, setS1Zoomed] = useState(false);

  // Screen 2: 3 Objects Explored
  const [s2Inspected, setS2Inspected] = useState({ pencil: false, compass: false, needle: false });

  // Screen 3: Discover Quiz
  const [s3Selected, setS3Selected] = useState(null); // 'A' | 'B' | 'C'
  const [s3AnsweredCorrect, setS3AnsweredCorrect] = useState(false);
  const [s3ShowHint, setS3ShowHint] = useState(false);

  // Screen 6: Naming Points Clicked
  const [s6ClickedPoint, setS6ClickedPoint] = useState(null); // 'P' | 'Z' | 'T'

  // Screen 7: Sequential Identification
  const [s7Stage, setS7Stage] = useState(0); // 0: pencil, 1: compass, 2: needle
  const [s7Feedback, setS7Feedback] = useState(null); // 'correct' | 'wrong'

  // Screen 8: Final Challenge
  const [s8Tips, setS8Tips] = useState({ pencil: false, compass: false, needle: false });

  return (
    <div className="point-app-fullscreen-root" id="section-2-1-point-fullscreen">
      {/* Background Wooden Desk Ambient Texture */}
      <div className="point-desk-surface" />

      {/* ── Top Header (Clean, Compact, No 1-8 Circles) ── */}
      <header className="point-app-header">
        <div className="point-header-left">
          <button
            onClick={onBack}
            className="point-back-btn"
            title="Return to Chapter 2 Sections"
          >
            <ArrowLeft size={16} />
            <span>Back to Sections</span>
          </button>
          <div className="point-header-titles">
            <span className="point-header-badge">CLASS 6 MATHEMATICS · CHAPTER 2</span>
            <h1 className="point-header-title">2.1 — Point</h1>
          </div>
        </div>
      </header>

      {/* ── Full-Screen Viewport Stage (100vh · Zero Scroll) ── */}
      <main className="point-fullscreen-stage">

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 1: REAL WORLD INTRO (DESK + PAPER + PENCIL)
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">Where exactly did the pencil touch?</h2>
              <p className="point-stage-subtitle">Click the exact tiny mark where the sharp pencil tip meets the paper.</p>
            </div>

            <div className="point-stage-central-scene">
              {/* Full-width Realistic Drafting Paper on Desk */}
              <div 
                className="point-desk-paper-canvas"
                style={{
                  transform: s1Zoomed ? 'scale(1.15) translate(-20px, -15px)' : 'scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Paper Grid & Red Left Margin Rule */}
                <div className="point-paper-faint-lines" />
                <div className="point-paper-margin-line" />

                {/* Large Realistic Sharpened Pencil Touching Down */}
                <div style={{ position: 'absolute', top: '15%', right: '12%', width: '420px', height: '220px' }}>
                  <RealisticPencil width={420} height={220} highlightTip={s1Touched} />
                </div>

                {/* Target Tiny Dot at Touch Point */}
                <div 
                  className="point-touch-target-wrap"
                  style={{ top: '68%', left: '46%' }}
                  onClick={() => {
                    setS1Touched(true);
                    setS1Zoomed(true);
                  }}
                  title="Click the pencil touch location"
                >
                  <div className="point-blue-pulse-ring" />
                  <div 
                    className="point-touch-dot-core" 
                    style={{ 
                      transform: s1Touched ? 'scale(2.2)' : 'scale(1)',
                      background: s1Touched ? '#0284C7' : '#0F172A' 
                    }} 
                  />
                </div>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              {s1Touched ? (
                <button 
                  className="point-continue-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <span className="point-instruction-hint">
                  👆 Click the dot on the paper to continue
                </span>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 2: POINTS ARE AROUND US
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">Points Are Around Us</h2>
              <p className="point-stage-subtitle">Look closely at the pointed tip of each object.</p>
            </div>

            <div className="point-stage-central-scene">
              <div className="point-trio-space">
                {/* 1. Sharp Pencil Tip */}
                <div 
                  className={`point-trio-item ${s2Inspected.pencil ? 'inspected' : ''}`}
                  onClick={() => setS2Inspected(prev => ({ ...prev, pencil: true }))}
                >
                  <div className="point-trio-svg-wrap">
                    <RealisticPencil width={260} height={140} highlightTip={s2Inspected.pencil} />
                  </div>
                  <h3 className="point-trio-item-title">Sharp Pencil Tip</h3>
                  {s2Inspected.pencil ? (
                    <span className="point-trio-pill">Pencil tip → •</span>
                  ) : (
                    <span className="point-trio-inspect-hint">Click to inspect tip</span>
                  )}
                </div>

                {/* 2. Compass Tip */}
                <div 
                  className={`point-trio-item ${s2Inspected.compass ? 'inspected' : ''}`}
                  onClick={() => setS2Inspected(prev => ({ ...prev, compass: true }))}
                >
                  <div className="point-trio-svg-wrap">
                    <RealisticCompass width={180} height={160} highlightTip={s2Inspected.compass} />
                  </div>
                  <h3 className="point-trio-item-title">Compass Tip</h3>
                  {s2Inspected.compass ? (
                    <span className="point-trio-pill">Compass tip → •</span>
                  ) : (
                    <span className="point-trio-inspect-hint">Click to inspect tip</span>
                  )}
                </div>

                {/* 3. Needle Tip */}
                <div 
                  className={`point-trio-item ${s2Inspected.needle ? 'inspected' : ''}`}
                  onClick={() => setS2Inspected(prev => ({ ...prev, needle: true }))}
                >
                  <div className="point-trio-svg-wrap">
                    <RealisticNeedle width={240} height={90} highlightTip={s2Inspected.needle} />
                  </div>
                  <h3 className="point-trio-item-title">Needle Tip</h3>
                  {s2Inspected.needle ? (
                    <span className="point-trio-pill">Needle tip → •</span>
                  ) : (
                    <span className="point-trio-inspect-hint">Click to inspect tip</span>
                  )}
                </div>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-continue-btn"
                disabled={!(s2Inspected.pencil && s2Inspected.compass && s2Inspected.needle)}
                onClick={() => setCurrentStep(3)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 3: DISCOVER THE IDEA
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">What do these examples have in common?</h2>
              <p className="point-stage-subtitle">Think carefully about the pencil tip, compass point, and needle end.</p>
            </div>

            <div className="point-stage-central-scene">
              <div className="point-discover-layout">
                {/* Visual Preview of 3 Objects */}
                <div className="point-discover-objects-preview">
                  <div style={{ width: '180px' }}><RealisticPencil width={180} height={90} highlightTip /></div>
                  <div style={{ width: '100px' }}><RealisticCompass width={110} height={100} highlightTip /></div>
                  <div style={{ width: '160px' }}><RealisticNeedle width={170} height={60} highlightTip /></div>
                </div>

                {/* 3 Large Selectable Options */}
                <div className="point-discover-options-list">
                  <button 
                    className={`point-discover-btn ${s3Selected === 'A' ? 'correct' : ''}`}
                    onClick={() => {
                      setS3Selected('A');
                      setS3AnsweredCorrect(true);
                      setS3ShowHint(false);
                    }}
                  >
                    <span className="point-option-circle">A</span>
                    <span>They show a <strong className="point-keyword-highlight">precise location</strong></span>
                  </button>

                  <button 
                    className={`point-discover-btn ${s3Selected === 'B' ? 'wrong' : ''}`}
                    onClick={() => {
                      setS3Selected('B');
                      setS3AnsweredCorrect(false);
                      setS3ShowHint(true);
                    }}
                  >
                    <span className="point-option-circle">B</span>
                    <span>They have a large area</span>
                  </button>

                  <button 
                    className={`point-discover-btn ${s3Selected === 'C' ? 'wrong' : ''}`}
                    onClick={() => {
                      setS3Selected('C');
                      setS3AnsweredCorrect(false);
                      setS3ShowHint(true);
                    }}
                  >
                    <span className="point-option-circle">C</span>
                    <span>They have a measurable length</span>
                  </button>
                </div>

                {/* Conceptual Hint Banner */}
                {s3ShowHint && (
                  <div className="point-hint-banner">
                    "Look closely at the exact location shown by the tip."
                  </div>
                )}
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-continue-btn"
                disabled={!s3AnsweredCorrect}
                onClick={() => setCurrentStep(4)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 4: UNDERSTAND A POINT
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">The Mathematical Point</h2>
            </div>

            <div className="point-stage-central-scene">
              <div className="point-math-reveal-space">
                {/* Slow Gentle Zooming Mathematical Dot */}
                <div className="point-glowing-dot-hero">
                  <div className="point-pure-math-dot" />
                </div>

                <p className="point-statement-large">
                  "A <strong className="point-keyword-highlight">point</strong> tells us exactly where something is."
                </p>

                <div className="point-formula-card">
                  "A <strong className="point-keyword-highlight">point</strong> determines a <strong className="point-keyword-highlight">precise location</strong>, but it has no length, breadth or height."
                </div>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-continue-btn"
                onClick={() => setCurrentStep(5)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 5: REAL WORLD → MATHEMATICS
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 5 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">From Real Objects to Pure Geometry</h2>
            </div>

            <div className="point-stage-central-scene">
              <div className="point-math-reveal-space">
                {/* Real World Transformation Formula */}
                <div style={{ display: 'flex', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'center' }}>
                  <div className="point-trans-col">
                    <span className="point-trans-label">Pencil tip</span>
                    <div className="point-trans-arrow">↓</div>
                    <span className="point-trans-dot">•</span>
                  </div>

                  <div className="point-trans-col">
                    <span className="point-trans-label">Compass tip</span>
                    <div className="point-trans-arrow">↓</div>
                    <span className="point-trans-dot">•</span>
                  </div>

                  <div className="point-trans-col">
                    <span className="point-trans-label">Needle tip</span>
                    <div className="point-trans-arrow">↓</div>
                    <span className="point-trans-dot">•</span>
                  </div>
                </div>

                {/* Clean Mathematical Workspace with 3 Dots */}
                <div className="point-dots-workspace">
                  <div className="point-pure-math-dot" />
                  <div className="point-pure-math-dot" />
                  <div className="point-pure-math-dot" />
                </div>

                <p className="point-statement-large">
                  "These dots represent <strong className="point-keyword-highlight">points</strong>."
                </p>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-continue-btn"
                onClick={() => setCurrentStep(6)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 6: NAMING POINTS
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 6 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">We name a <strong className="point-keyword-highlight">point</strong> using a single capital letter</h2>
              <p className="point-stage-subtitle">Click on <strong className="point-keyword-highlight">Point P</strong>, <strong className="point-keyword-highlight">Point Z</strong>, or <strong className="point-keyword-highlight">Point T</strong> to identify each one.</p>
            </div>

            <div className="point-stage-central-scene">
              <div className="point-naming-stage">
                {/* Point P */}
                <div 
                  className={`point-node-interactive ${s6ClickedPoint === 'P' ? 'active' : ''}`}
                  onClick={() => setS6ClickedPoint('P')}
                  title="Click Point P"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="point-node-center-dot" />
                    <span className="point-node-big-letter">P</span>
                  </div>
                  <span className="point-node-tag">Point P</span>
                </div>

                {/* Point Z */}
                <div 
                  className={`point-node-interactive ${s6ClickedPoint === 'Z' ? 'active' : ''}`}
                  onClick={() => setS6ClickedPoint('Z')}
                  title="Click Point Z"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="point-node-center-dot" />
                    <span className="point-node-big-letter">Z</span>
                  </div>
                  <span className="point-node-tag">Point Z</span>
                </div>

                {/* Point T */}
                <div 
                  className={`point-node-interactive ${s6ClickedPoint === 'T' ? 'active' : ''}`}
                  onClick={() => setS6ClickedPoint('T')}
                  title="Click Point T"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="point-node-center-dot" />
                    <span className="point-node-big-letter">T</span>
                  </div>
                  <span className="point-node-tag">Point T</span>
                </div>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-continue-btn"
                disabled={!s6ClickedPoint}
                onClick={() => setCurrentStep(7)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 7: FIND THE POINT
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 7 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">Which part can help us imagine a <strong className="point-keyword-highlight">point</strong>?</h2>
              <p className="point-stage-subtitle">
                {s7Stage === 0 && "Look at the realistic pencil touching the paper."}
                {s7Stage === 1 && "Look at the drafting compass."}
                {s7Stage === 2 && "Look at the sewing needle."}
              </p>
            </div>

            <div className="point-stage-central-scene">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {/* Object Display */}
                <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s7Stage === 0 && <RealisticPencil width={320} height={180} highlightTip={s7Feedback === 'correct'} />}
                  {s7Stage === 1 && <RealisticCompass width={200} height={180} highlightTip={s7Feedback === 'correct'} />}
                  {s7Stage === 2 && <RealisticNeedle width={280} height={90} highlightTip={s7Feedback === 'correct'} />}
                </div>

                {/* 3 Real Choices */}
                <div className="point-choices-row">
                  {s7Stage === 0 && (
                    <>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Pencil body
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'correct' ? 'correct' : ''}`}
                        onClick={() => setS7Feedback('correct')}
                      >
                        Pencil tip
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Paper
                      </button>
                    </>
                  )}

                  {s7Stage === 1 && (
                    <>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Compass hinge
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'correct' ? 'correct' : ''}`}
                        onClick={() => setS7Feedback('correct')}
                      >
                        Compass tip
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Paper
                      </button>
                    </>
                  )}

                  {s7Stage === 2 && (
                    <>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Needle eye
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'correct' ? 'correct' : ''}`}
                        onClick={() => setS7Feedback('correct')}
                      >
                        Needle tip
                      </button>
                      <button 
                        className={`point-choice-pill-btn ${s7Feedback === 'wrong' ? 'wrong' : ''}`}
                        onClick={() => setS7Feedback('wrong')}
                      >
                        Cloth
                      </button>
                    </>
                  )}
                </div>

                {/* Feedback Line */}
                <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                  {s7Feedback === 'correct' && (
                    <p style={{ margin: 0, color: '#15803D', fontWeight: 900, fontSize: 'clamp(1.2rem, 2.2vh, 1.55rem)' }}>
                      "Yes! The tip gives us an idea of a <strong className="point-keyword-highlight" style={{ color: '#15803D' }}>point</strong>."
                    </p>
                  )}
                  {s7Feedback === 'wrong' && (
                    <p style={{ margin: 0, color: '#B91C1C', fontWeight: 800, fontSize: 'clamp(1.1rem, 2vh, 1.35rem)' }}>
                      "Look at the exact place where the pencil touches the paper."
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              {s7Feedback === 'correct' && s7Stage < 2 && (
                <button 
                  className="point-continue-btn"
                  onClick={() => {
                    setS7Stage(prev => prev + 1);
                    setS7Feedback(null);
                  }}
                >
                  <span>Next Object</span>
                  <ArrowRight size={18} />
                </button>
              )}
              {s7Feedback === 'correct' && s7Stage === 2 && (
                <button 
                  className="point-continue-btn"
                  onClick={() => setCurrentStep(8)}
                >
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SCREEN 8: FINAL MINI CHALLENGE & COMPLETION
            ══════════════════════════════════════════════════════════════ */}
        {currentStep === 8 && (
          <>
            <div className="point-stage-banner">
              <h2 className="point-stage-question">Which parts can help us imagine a <strong className="point-keyword-highlight">point</strong>?</h2>
              <p className="point-stage-subtitle">Click the pointed tip of each object below.</p>
            </div>

            <div className="point-stage-central-scene">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
                <div className="point-trio-space" style={{ maxHeight: '240px' }}>
                  {/* Object 1: Pencil */}
                  <div 
                    className={`point-trio-item ${s8Tips.pencil ? 'inspected' : ''}`}
                    onClick={() => setS8Tips(prev => ({ ...prev, pencil: true }))}
                  >
                    <div className="point-trio-svg-wrap">
                      <RealisticPencil width={200} height={100} highlightTip={s8Tips.pencil} />
                    </div>
                    {s8Tips.pencil ? (
                      <span className="point-trio-pill" style={{ background: '#DCFCE7', color: '#16A34A', borderColor: '#86EFAC' }}>
                        • Point
                      </span>
                    ) : (
                      <span className="point-trio-inspect-hint">Click the tip</span>
                    )}
                  </div>

                  {/* Object 2: Compass */}
                  <div 
                    className={`point-trio-item ${s8Tips.compass ? 'inspected' : ''}`}
                    onClick={() => setS8Tips(prev => ({ ...prev, compass: true }))}
                  >
                    <div className="point-trio-svg-wrap">
                      <RealisticCompass width={140} height={120} highlightTip={s8Tips.compass} />
                    </div>
                    {s8Tips.compass ? (
                      <span className="point-trio-pill" style={{ background: '#DCFCE7', color: '#16A34A', borderColor: '#86EFAC' }}>
                        • Point
                      </span>
                    ) : (
                      <span className="point-trio-inspect-hint">Click the tip</span>
                    )}
                  </div>

                  {/* Object 3: Needle */}
                  <div 
                    className={`point-trio-item ${s8Tips.needle ? 'inspected' : ''}`}
                    onClick={() => setS8Tips(prev => ({ ...prev, needle: true }))}
                  >
                    <div className="point-trio-svg-wrap">
                      <RealisticNeedle width={190} height={70} highlightTip={s8Tips.needle} />
                    </div>
                    {s8Tips.needle ? (
                      <span className="point-trio-pill" style={{ background: '#DCFCE7', color: '#16A34A', borderColor: '#86EFAC' }}>
                        • Point
                      </span>
                    ) : (
                      <span className="point-trio-inspect-hint">Click the tip</span>
                    )}
                  </div>
                </div>

                {/* Final Summary Card on Completion */}
                {s8Tips.pencil && s8Tips.compass && s8Tips.needle && (
                  <div className="point-completion-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      <span className="point-hero-title">POINT</span>
                      <span className="point-hero-symbol">•</span>
                    </div>
                    <p className="point-completion-statement">
                      "A <strong className="point-keyword-highlight">point</strong> determines a <strong className="point-keyword-highlight">precise location</strong>."
                    </p>
                    <p className="point-completion-substatement">
                      "<strong className="point-keyword-highlight">Points</strong> can be named using capital letters."
                    </p>
                    <span className="point-complete-badge">
                      2.1 Point Complete
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="point-bottom-controls-bar">
              <button 
                className="point-secondary-btn"
                onClick={() => {
                  setCurrentStep(1);
                  setS1Touched(false);
                  setS1Zoomed(false);
                  setS2Inspected({ pencil: false, compass: false, needle: false });
                  setS3Selected(null);
                  setS3AnsweredCorrect(false);
                  setS6ClickedPoint(null);
                  setS7Stage(0);
                  setS7Feedback(null);
                  setS8Tips({ pencil: false, compass: false, needle: false });
                }}
              >
                <RotateCcw size={16} />
                <span>Restart Lesson</span>
              </button>

              <button 
                className="point-continue-btn"
                onClick={onBack}
              >
                <ArrowLeft size={18} />
                <span>Back to Sections</span>
              </button>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
