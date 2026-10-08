import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw, Ruler, ArrowRight, MapPin } from 'lucide-react';
import { playPositionSound } from './audioHelper';

export default function KabaddiCourtMarker({ onCompleteCourt }) {
  const [markedStep, setMarkedStep] = useState(1); // 1: Pick Ref Point | 2: Boundary | 3: Midline | 4: Baulk & Bonus Lines

  const handleNextStep = () => {
    playPositionSound('chuna');
    if (markedStep < 4) {
      setMarkedStep(prev => prev + 1);
      if (markedStep === 3 && onCompleteCourt) {
        onCompleteCourt();
      }
    } else {
      setMarkedStep(1);
    }
  };

  const handleReset = () => {
    playPositionSound('click');
    setMarkedStep(1);
  };

  return (
    <div className="kabaddi-marker-component">
      {/* Top Banner */}
      <div className="kabaddi-header-card">
        <div className="kabaddi-title-group">
          <span className="court-tag">NCERT Fig. 5.10 & 5.11</span>
          <h4 className="court-title">Drawing the Kabaddi Court with Limestone (Chuna)</h4>
        </div>
        <span className="sports-day-pill">🏆 Sports Day Prep</span>
      </div>

      {/* Main Interactive Sports Field Workbench */}
      <div className="sports-ground-card">
        <div className="ground-stage-box">
          <svg className="kabaddi-field-svg" viewBox="0 0 540 180" fill="none">
            {/* Ground Grass / Clay Surface */}
            <rect width="100%" height="100%" fill="#EA580C" rx="12" />
            <rect x="20" y="15" width="500" height="150" fill="#C2410C" rx="8" />

            {/* Reference Point Pin at Corner A */}
            <g transform="translate(40, 30)">
              <circle cx="0" cy="0" r="8" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="2.5" />
              <text x="0" y="-12" fill="#FEF3C7" fontSize="11" fontWeight="900" textAnchor="middle">Reference Point (0,0)</text>
            </g>

            {/* Step 2: Outer Boundary Line (13m x 10m) */}
            {markedStep >= 2 && (
              <rect
                x="40" y="30" width="460" height="120"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeDasharray="none"
                fill="rgba(255, 255, 255, 0.08)"
              />
            )}

            {/* Step 3: Midline (at 6.5m from end) */}
            {markedStep >= 3 && (
              <g>
                <line x1="270" y1="30" x2="270" y2="150" stroke="#FFFFFF" strokeWidth="4" />
                <text x="270" y="24" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">Midline (6.5 m)</text>
              </g>
            )}

            {/* Step 4: Baulk Lines & Bonus Lines */}
            {markedStep >= 4 && (
              <g>
                {/* Left Baulk Line */}
                <line x1="160" y1="30" x2="160" y2="150" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="5 3" />
                <text x="160" y="24" fill="#FEF3C7" fontSize="9" fontWeight="800" textAnchor="middle">Baulk Line</text>

                {/* Left Bonus Line */}
                <line x1="110" y1="30" x2="110" y2="150" stroke="#FDE68A" strokeWidth="2.5" />
                <text x="110" y="24" fill="#FDE68A" fontSize="9" fontWeight="800" textAnchor="middle">Bonus</text>

                {/* Right Baulk Line */}
                <line x1="380" y1="30" x2="380" y2="150" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="5 3" />
                <text x="380" y="24" fill="#FEF3C7" fontSize="9" fontWeight="800" textAnchor="middle">Baulk Line</text>

                {/* Right Bonus Line */}
                <line x1="430" y1="30" x2="430" y2="150" stroke="#FDE68A" strokeWidth="2.5" />
                <text x="430" y="24" fill="#FDE68A" fontSize="9" fontWeight="800" textAnchor="middle">Bonus</text>
              </g>
            )}
          </svg>
        </div>

        {/* Step Guide & Action Footer */}
        <div className="court-action-footer">
          <div className="step-explain-text">
            {markedStep === 1 && (
              <span><strong>Deepa says:</strong> “Let us first fix Corner Point A as our <strong>Reference Point</strong> from which all distances will be measured with the long tape.”</span>
            )}
            {markedStep === 2 && (
              <span><strong>Padma & Hardeep:</strong> Measure 13 m length & 10 m width from reference corner and lay white boundary line with chuna powder.</span>
            )}
            {markedStep === 3 && (
              <span><strong>Marking Midline:</strong> Measuring 6.5 m from the reference line to divide the court into two equal halves.</span>
            )}
            {markedStep === 4 && (
              <span className="court-done-text">
                ✓ <strong>Kabaddi Court Completed:</strong> Baulk lines and bonus lines marked accurately with zero confusion thanks to a fixed reference point!
              </span>
            )}
          </div>

          <div className="court-btn-group">
            <button onClick={handleReset} className="reset-court-btn" title="Restart Marking">
              <RotateCcw size={15} />
            </button>

            <button onClick={handleNextStep} className="next-court-cta">
              <span>{markedStep === 1 ? 'Step 2: Draw Boundary' : markedStep === 2 ? 'Step 3: Draw Midline' : markedStep === 3 ? 'Step 4: Draw Baulk & Bonus' : 'Re-draw Court'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
