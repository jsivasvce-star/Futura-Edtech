import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw, Ruler, ArrowRight, RefreshCw, Scissors } from 'lucide-react';
import { playCurveSound } from './audioHelper';

const CURVE_SAMPLES = [
  {
    id: 'river',
    name: 'Wavy River Stream',
    icon: '🌊',
    pathD: 'M 50 110 C 130 40, 180 180, 270 90 C 350 20, 420 160, 520 80',
    lengthCm: 18.5,
    color: '#0284C7',
    bgColor: '#E0F2FE'
  },
  {
    id: 'arch',
    name: 'Verandah Arch Arc',
    icon: '🏛️',
    pathD: 'M 60 140 C 140 30, 440 30, 520 140',
    lengthCm: 22.4,
    color: '#D97706',
    bgColor: '#FEF3C7'
  },
  {
    id: 'petal',
    name: 'Flower Petal Contour',
    icon: '🌸',
    pathD: 'M 70 120 C 180 30, 300 50, 380 130 C 440 170, 480 90, 520 110',
    lengthCm: 16.0,
    color: '#E11D48',
    bgColor: '#FFE4E6'
  }
];

export default function ThreadMeasurementLab({ onCompleteLab }) {
  const [selectedCurveId, setSelectedCurveId] = useState('river');
  const [labStep, setLabStep] = useState(1); // 1: Trace on Curve | 2: Straighten Thread | 3: Ruler Readout
  const [completedCurves, setCompletedCurves] = useState({});

  const currentCurve = CURVE_SAMPLES.find(c => c.id === selectedCurveId) || CURVE_SAMPLES[0];

  const handleSelectCurve = (id) => {
    playCurveSound('click');
    setSelectedCurveId(id);
    setLabStep(1);
  };

  const handleNextStep = () => {
    if (labStep === 1) {
      playCurveSound('trace');
      setLabStep(2);
    } else if (labStep === 2) {
      playCurveSound('straighten');
      setLabStep(3);
      playCurveSound('success');
      const updated = { ...completedCurves, [currentCurve.id]: true };
      setCompletedCurves(updated);
      if (Object.keys(updated).length === CURVE_SAMPLES.length && onCompleteLab) {
        onCompleteLab();
      }
    } else {
      setLabStep(1);
    }
  };

  const handleResetCurrent = () => {
    playCurveSound('click');
    setLabStep(1);
  };

  return (
    <div className="thread-lab-container">
      {/* Top Header Strip: Curve Sample Selector */}
      <div className="curve-samples-strip">
        <span className="strip-label">1. Choose Curved Line to Measure:</span>
        <div className="curve-pills-row">
          {CURVE_SAMPLES.map((curve) => {
            const isSelected = curve.id === selectedCurveId;
            const isDone = !!completedCurves[curve.id];
            return (
              <button
                key={curve.id}
                onClick={() => handleSelectCurve(curve.id)}
                className={`curve-pill-btn ${isSelected ? 'selected' : ''}`}
                style={{
                  borderColor: isSelected ? curve.color : '#CBD5E1',
                  backgroundColor: isSelected ? curve.bgColor : '#FFFFFF'
                }}
              >
                <span className="pill-icon">{curve.icon}</span>
                <span className="pill-name" style={{ color: isSelected ? curve.color : '#0F172A' }}>
                  {curve.name}
                </span>
                {isDone && <CheckCircle2 size={15} color="#10B981" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="thread-stage-card">
        {/* Step Indicator Header */}
        <div className="stage-step-banner">
          <div className="step-tag-bubble">
            <span>STEP {labStep} OF 3:</span>
          </div>
          <h4 className="step-title-text">
            {labStep === 1 && "Trace thread along the curve from Knot 'A' to Point 'B' (Fig 5.8)"}
            {labStep === 2 && "Mark Point 'B' with ink and straighten the thread horizontally"}
            {labStep === 3 && `Align straightened thread against Metre Scale — Length = ${currentCurve.lengthCm} cm!`}
          </h4>
        </div>

        {/* Dynamic Visual Workbench */}
        <div className="thread-visual-workbench">
          <svg className="workbench-svg" viewBox="0 0 580 180" fill="none">
            {/* Background Grid */}
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" rx="12" />

            {/* STEP 1: Curved Line Display */}
            {labStep === 1 && (
              <g>
                {/* Background Guide Line */}
                <path
                  d={currentCurve.pathD}
                  stroke={currentCurve.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Overlaid Flexible White Thread */}
                <path
                  d={currentCurve.pathD}
                  stroke="#DC2626"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Knot A */}
                <circle cx="50" cy="110" r="7" fill="#78350F" />
                <text x="50" y="140" fill="#78350F" fontSize="12" fontWeight="900" textAnchor="middle">Knot A</text>

                {/* Ink Mark B */}
                <circle cx="520" cy="80" r="7" fill="#2563EB" />
                <text x="520" y="110" fill="#2563EB" fontSize="12" fontWeight="900" textAnchor="middle">Ink Mark B</text>
              </g>
            )}

            {/* STEP 2: Thread Straightening Animation */}
            {labStep === 2 && (
              <g>
                {/* Ghost Curved Outline */}
                <path
                  d={currentCurve.pathD}
                  stroke="rgba(203, 213, 225, 0.6)"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Straightened Horizontal Thread */}
                <motion.line
                  x1="50" y1="90" x2={50 + currentCurve.lengthCm * 20} y2="90"
                  stroke="#DC2626"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ opacity: 0, scaleY: 2 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Knot A */}
                <circle cx="50" cy="90" r="7" fill="#78350F" />
                <text x="50" y="120" fill="#78350F" fontSize="12" fontWeight="900" textAnchor="middle">Knot A (0 cm)</text>

                {/* Ink Mark B */}
                <circle cx={50 + currentCurve.lengthCm * 20} cy="90" r="7" fill="#2563EB" />
                <text x={50 + currentCurve.lengthCm * 20} y="120" fill="#2563EB" fontSize="12" fontWeight="900" textAnchor="middle">Ink Mark B</text>
              </g>
            )}

            {/* STEP 3: Ruler Aligned Underneath */}
            {labStep === 3 && (
              <g>
                {/* Straightened Thread */}
                <line
                  x1="50" y1="50" x2={50 + currentCurve.lengthCm * 20} y2="50"
                  stroke="#DC2626"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="6" fill="#78350F" />
                <text x="50" y="35" fill="#78350F" fontSize="11" fontWeight="900" textAnchor="middle">Knot A (0 cm)</text>

                <circle cx={50 + currentCurve.lengthCm * 20} cy="50" r="6" fill="#2563EB" />
                <text x={50 + currentCurve.lengthCm * 20} y="35" fill="#2563EB" fontSize="11" fontWeight="900" textAnchor="middle">
                  Ink B ({currentCurve.lengthCm} cm)
                </text>

                {/* 25-cm Wooden Ruler Body */}
                <rect x="50" y="70" width="500" height="55" rx="6" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />

                {/* Ruler Markings 0 to 25 cm */}
                {Array.from({ length: 26 }).map((_, cm) => {
                  const xPos = 50 + cm * 20;
                  if (xPos > 550) return null;
                  const isMatch = cm === Math.floor(currentCurve.lengthCm);

                  return (
                    <g key={cm}>
                      <line x1={xPos} y1="70" x2={xPos} y2={cm % 5 === 0 ? "90" : "80"} stroke="#451A03" strokeWidth={cm % 5 === 0 ? "2" : "1"} />
                      {cm % 2 === 0 && (
                        <text x={xPos} y="105" fill="#451A03" fontSize="10" fontWeight="850" textAnchor="middle" fontFamily="JetBrains Mono">
                          {cm}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Navigation & Step Controls */}
        <div className="lab-step-action-bar">
          <div className="step-result-callout">
            {labStep === 1 && <span>1️⃣ Lay thread along the curve and place ink mark at point B.</span>}
            {labStep === 2 && <span>2️⃣ Pull the thread taut into a straight horizontal line.</span>}
            {labStep === 3 && (
              <span className="success-callout">
                ✓ <strong>Result:</strong> Measured Curved Length = <strong>{currentCurve.lengthCm} cm</strong>!
              </span>
            )}
          </div>

          <div className="action-buttons-group">
            <button onClick={handleResetCurrent} className="reset-lab-btn" title="Restart Curve Measurement">
              <RotateCcw size={15} />
            </button>

            <button onClick={handleNextStep} className="next-step-cta">
              <span>{labStep === 1 ? 'Step 2: Straighten Thread' : labStep === 2 ? 'Step 3: Place on Ruler' : 'Measure Again'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
