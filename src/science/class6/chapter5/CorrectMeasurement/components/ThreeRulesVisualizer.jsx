import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Eye, Ruler, AlertTriangle, Sparkles, RefreshCw, Scissors } from 'lucide-react';
import { playMeasureSound } from './audioHelper';

export default function ThreeRulesVisualizer() {
  const [activeRule, setActiveRule] = useState('placement'); // 'placement' | 'eye_position' | 'broken_scale'
  
  // Rule 1 state: 'correct' (straight) or 'slanted' (incorrect)
  const [placementMode, setPlacementMode] = useState('correct');
  
  // Rule 2 state: 'A' (left), 'B' (center/top - correct), 'C' (right)
  const [eyePosition, setEyePosition] = useState('B');
  
  // Rule 3 state: broken scale start mark
  const [brokenStartCm, setBrokenStartCm] = useState(1.0);
  const pencilActualLength = 8.4; // 8.4 cm pencil

  return (
    <div className="three-rules-container">
      {/* Top 3 Rules Selector Pills */}
      <div className="rules-selector-strip">
        <button
          onClick={() => { setActiveRule('placement'); playMeasureSound('click'); }}
          className={`rule-pill-btn ${activeRule === 'placement' ? 'active' : ''}`}
        >
          <Ruler size={16} />
          <span>Rule 1: Scale Placement (Fig 5.4)</span>
        </button>

        <button
          onClick={() => { setActiveRule('eye_position'); playMeasureSound('click'); }}
          className={`rule-pill-btn ${activeRule === 'eye_position' ? 'active' : ''}`}
        >
          <Eye size={16} />
          <span>Rule 2: Eye Position (Fig 5.5)</span>
        </button>

        <button
          onClick={() => { setActiveRule('broken_scale'); playMeasureSound('click'); }}
          className={`rule-pill-btn ${activeRule === 'broken_scale' ? 'active' : ''}`}
        >
          <Scissors size={16} />
          <span>Rule 3: Broken Scale (Fig 5.6)</span>
        </button>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="rule-interactive-stage-card">
        {/* ===================================================================
            RULE 1: SCALE PLACEMENT (Straight vs Slanted)
            =================================================================== */}
        {activeRule === 'placement' && (
          <div className="rule-view-box">
            <div className="rule-view-header">
              <div className="view-title-group">
                <span className="fig-badge">NCERT Fig. 5.4</span>
                <h4 className="view-title">Keep the scale straight along the length</h4>
              </div>
              <div className="toggle-mode-buttons">
                <button
                  onClick={() => { setPlacementMode('correct'); playMeasureSound('align'); }}
                  className={`mode-btn ${placementMode === 'correct' ? 'correct-active' : ''}`}
                >
                  <CheckCircle2 size={15} />
                  <span>(a) Correct Placement</span>
                </button>
                <button
                  onClick={() => { setPlacementMode('slanted'); playMeasureSound('wrong'); }}
                  className={`mode-btn ${placementMode === 'slanted' ? 'wrong-active' : ''}`}
                >
                  <XCircle size={15} />
                  <span>(b) Incorrect (Slanted)</span>
                </button>
              </div>
            </div>

            {/* Visual Canvas */}
            <div className="canvas-workbench">
              {/* Wooden Workdesk Background */}
              <div className="desk-surface">
                {/* Yellow Pencil to measure (Length = 10 cm on canvas) */}
                <div className="desk-pencil-object">
                  <div className="pencil-eraser" />
                  <div className="pencil-metal-ring" />
                  <div className="pencil-body">
                    <span>HB Pencil (10.0 cm)</span>
                  </div>
                  <div className="pencil-tip-cone">
                    <div className="lead-tip" />
                  </div>
                </div>

                {/* Ruler Graphic (Straight or Tilted) */}
                <motion.div
                  className={`interactive-ruler-board ${placementMode === 'slanted' ? 'tilted-ruler' : 'straight-ruler'}`}
                  animate={{
                    rotate: placementMode === 'slanted' ? -6.5 : 0,
                    y: placementMode === 'slanted' ? -8 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className="ruler-ticks-track">
                    {Array.from({ length: 16 }).map((_, cm) => (
                      <div key={cm} className="ruler-cm-tick" style={{ left: `${(cm / 15) * 100}%` }}>
                        <div className="tick-notch" />
                        <span className="tick-digit">{cm}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Explanation Feedback Bar */}
            <div className={`rule-feedback-banner ${placementMode === 'correct' ? 'positive' : 'negative'}`}>
              {placementMode === 'correct' ? (
                <>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>
                    <strong>(a) Correct:</strong> The scale is placed in direct contact with the pencil, perfectly along its length. Reading = <strong>10.0 cm</strong>.
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} color="#DC2626" />
                  <span>
                    <strong>(b) Incorrect:</strong> Placing the ruler slanted makes the line longer than the true length, giving a false reading of <strong>10.8 cm</strong>!
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            RULE 2: EYE POSITION & PARALLAX ERROR
            =================================================================== */}
        {activeRule === 'eye_position' && (
          <div className="rule-view-box">
            <div className="rule-view-header">
              <div className="view-title-group">
                <span className="fig-badge">NCERT Fig. 5.5</span>
                <h4 className="view-title">Look vertically straight from above the point</h4>
              </div>
              <div className="eye-selector-buttons">
                <button
                  onClick={() => { setEyePosition('A'); playMeasureSound('click'); }}
                  className={`eye-choice-btn ${eyePosition === 'A' ? 'selected' : ''}`}
                >
                  <span>Eye 'A' (Left Slant)</span>
                </button>
                <button
                  onClick={() => { setEyePosition('B'); playMeasureSound('align'); }}
                  className={`eye-choice-btn correct ${eyePosition === 'B' ? 'selected' : ''}`}
                >
                  <CheckCircle2 size={14} />
                  <span>Eye 'B' (Direct Top)</span>
                </button>
                <button
                  onClick={() => { setEyePosition('C'); playMeasureSound('click'); }}
                  className={`eye-choice-btn ${eyePosition === 'C' ? 'selected' : ''}`}
                >
                  <span>Eye 'C' (Right Slant)</span>
                </button>
              </div>
            </div>

            {/* Visual Eye Beam Canvas */}
            <div className="canvas-workbench">
              <div className="eye-diagram-box">
                {/* 3 Eyes Positioned at top (A, B, C) */}
                <div className="eyes-row">
                  <div
                    className={`eye-station ${eyePosition === 'A' ? 'active-eye' : ''}`}
                    onClick={() => { setEyePosition('A'); playMeasureSound('click'); }}
                  >
                    <span className="eye-icon">👁️</span>
                    <span className="eye-label">Position A</span>
                  </div>

                  <div
                    className={`eye-station ${eyePosition === 'B' ? 'active-eye correct-eye' : ''}`}
                    onClick={() => { setEyePosition('B'); playMeasureSound('align'); }}
                  >
                    <span className="eye-icon">👁️</span>
                    <span className="eye-label">Position B (Correct)</span>
                  </div>

                  <div
                    className={`eye-station ${eyePosition === 'C' ? 'active-eye' : ''}`}
                    onClick={() => { setEyePosition('C'); playMeasureSound('click'); }}
                  >
                    <span className="eye-icon">👁️</span>
                    <span className="eye-label">Position C</span>
                  </div>
                </div>

                {/* Sight Beams SVG */}
                <svg className="sight-beams-svg" viewBox="0 0 500 130" fill="none">
                  {/* Beam from Eye A */}
                  <line
                    x1="100" y1="20" x2="230" y2="105"
                    stroke={eyePosition === 'A' ? '#DC2626' : 'rgba(203, 213, 225, 0.4)'}
                    strokeWidth={eyePosition === 'A' ? 3 : 1.5}
                    strokeDasharray={eyePosition === 'A' ? 'none' : '4 4'}
                  />
                  {/* Beam from Eye B (Straight down) */}
                  <line
                    x1="250" y1="20" x2="250" y2="105"
                    stroke={eyePosition === 'B' ? '#059669' : 'rgba(203, 213, 225, 0.4)'}
                    strokeWidth={eyePosition === 'B' ? 3.5 : 1.5}
                  />
                  {/* Beam from Eye C */}
                  <line
                    x1="400" y1="20" x2="270" y2="105"
                    stroke={eyePosition === 'C' ? '#DC2626' : 'rgba(203, 213, 225, 0.4)'}
                    strokeWidth={eyePosition === 'C' ? 3 : 1.5}
                    strokeDasharray={eyePosition === 'C' ? 'none' : '4 4'}
                  />

                  {/* Target Pencil Tip Pointer at 7.5 cm (X=250) */}
                  <circle cx="250" cy="105" r="5" fill="#2563EB" />
                </svg>

                {/* Object Tip & Scale Alignment */}
                <div className="pencil-scale-preview-bar">
                  <div className="target-pencil-tip">
                    <span className="tip-name">Pencil Tip</span>
                  </div>
                  <div className="scale-readout-strip">
                    <span className="strip-cm">7.0</span>
                    <span className={`strip-cm ${eyePosition === 'A' ? 'apparent-mark' : ''}`}>7.3</span>
                    <span className={`strip-cm ${eyePosition === 'B' ? 'true-mark' : ''}`}>7.5 cm (True)</span>
                    <span className={`strip-cm ${eyePosition === 'C' ? 'apparent-mark' : ''}`}>7.7</span>
                    <span className="strip-cm">8.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parallax Result Callout */}
            <div className={`rule-feedback-banner ${eyePosition === 'B' ? 'positive' : 'negative'}`}>
              {eyePosition === 'B' ? (
                <>
                  <CheckCircle2 size={18} color="#059669" />
                  <span>
                    <strong>Eye B is Correct:</strong> Directly vertical above the tip. True Reading = <strong>7.5 cm</strong> (Zero Parallax Error).
                  </span>
                </>
              ) : eyePosition === 'A' ? (
                <>
                  <XCircle size={18} color="#DC2626" />
                  <span>
                    <strong>Eye A (Left Angle) is Wrong:</strong> Slanted view causes Parallax Error, giving an incorrect lower reading of <strong>7.3 cm</strong>!
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={18} color="#DC2626" />
                  <span>
                    <strong>Eye C (Right Angle) is Wrong:</strong> Slanted view causes Parallax Error, giving an incorrect higher reading of <strong>7.7 cm</strong>!
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            RULE 3: BROKEN ZERO MARK TECHNIQUE
            =================================================================== */}
        {activeRule === 'broken_scale' && (
          <div className="rule-view-box">
            <div className="rule-view-header">
              <div className="view-title-group">
                <span className="fig-badge">NCERT Fig. 5.6</span>
                <h4 className="view-title">Zero Mark Broken? Start from any full mark!</h4>
              </div>
              <div className="start-mark-buttons">
                <span className="start-label">Choose Starting Mark:</span>
                {[1.0, 2.0, 3.0].map((mark) => (
                  <button
                    key={mark}
                    onClick={() => { setBrokenStartCm(mark); playMeasureSound('align'); }}
                    className={`start-btn ${brokenStartCm === mark ? 'active' : ''}`}
                  >
                    Start at {mark.toFixed(1)} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Broken Scale Visual Canvas */}
            <div className="canvas-workbench">
              <div className="broken-scale-stage">
                {/* 8.4 cm Object */}
                <div
                  className="measured-object-bar"
                  style={{
                    left: `${(brokenStartCm / 15) * 100}%`,
                    width: `${(pencilActualLength / 15) * 100}%`
                  }}
                >
                  <span className="object-label">Pencil (Actual Length = 8.4 cm)</span>
                  <div className="object-end-arrow left-arrow">▲ Start: {brokenStartCm.toFixed(1)} cm</div>
                  <div className="object-end-arrow right-arrow">▲ End: {(brokenStartCm + pencilActualLength).toFixed(1)} cm</div>
                </div>

                {/* Broken Ruler Graphic (Damaged 0 - 0.8 cm) */}
                <div className="broken-ruler-body">
                  {/* Jagged Left Broken Edge */}
                  <div className="broken-edge-jagged">
                    <span className="broken-tag">Broken 0 Mark ⚠️</span>
                  </div>

                  {/* Ticks starting clearly from 1.0 */}
                  <div className="broken-ruler-ticks">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const cm = i + 1; // 1 to 15
                      const isStart = cm === Math.floor(brokenStartCm);
                      const isEnd = cm === Math.floor(brokenStartCm + pencilActualLength);

                      return (
                        <div key={cm} className="broken-tick" style={{ left: `${(cm / 15) * 100}%` }}>
                          <div className={`tick-bar ${isStart || isEnd ? 'highlighted-tick' : ''}`} />
                          <span className={`tick-num ${isStart || isEnd ? 'highlighted-text' : ''}`}>{cm}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Formula Banner */}
            <div className="broken-calc-banner">
              <div className="calc-equation">
                <span className="part">Actual Length</span>
                <span className="symbol">=</span>
                <span className="part end-val">End Mark ({(brokenStartCm + pencilActualLength).toFixed(1)} cm)</span>
                <span className="symbol">−</span>
                <span className="part start-val">Start Mark ({brokenStartCm.toFixed(1)} cm)</span>
                <span className="symbol">=</span>
                <span className="part result-val">8.4 cm ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
