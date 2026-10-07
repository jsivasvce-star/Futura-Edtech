import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, Ruler, RefreshCw } from 'lucide-react';
import { playCurveSound } from './audioHelper';

export default function CustomCurveTracer() {
  const [curveBend, setCurveBend] = useState(60); // -80 to +80
  const [curveWaves, setCurveWaves] = useState(2); // 1 or 2 or 3

  // Calculate approximate arc length based on bend & wave count
  const baseWidthCm = 15.0;
  const stretchFactor = 1 + (Math.abs(curveBend) / 100) * 0.45 * (curveWaves * 0.7);
  const calculatedLengthCm = (baseWidthCm * stretchFactor).toFixed(1);

  // Generate SVG Path
  const getPath = () => {
    if (curveWaves === 1) {
      return `M 50 100 Q 275 ${100 - curveBend} 500 100`;
    } else if (curveWaves === 2) {
      return `M 50 100 C 160 ${100 - curveBend}, 390 ${100 + curveBend}, 500 100`;
    } else {
      return `M 50 100 C 130 ${100 - curveBend}, 200 ${100 + curveBend}, 275 100 C 350 ${100 - curveBend}, 420 ${100 + curveBend}, 500 100`;
    }
  };

  const handleSliderChange = (val) => {
    playCurveSound('click');
    setCurveBend(val);
  };

  return (
    <div className="custom-tracer-container">
      {/* Top Controls Card */}
      <div className="tracer-controls-card">
        <div className="ctrl-header-row">
          <div className="ctrl-title-group">
            <Sliders size={16} color="#D97706" />
            <h4 className="ctrl-title">Interactive Curve Simulator</h4>
          </div>
          <span className="ctrl-badge">Live Thread Physics</span>
        </div>

        <div className="sliders-row">
          <div className="slider-group">
            <label className="slider-label">Curve Bend (Curvature): <strong>{curveBend > 0 ? `+${curveBend}` : curveBend}</strong></label>
            <input
              type="range"
              min="-80"
              max="80"
              value={curveBend}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="curve-slider"
            />
          </div>

          <div className="wave-buttons-group">
            <span className="slider-label">Waves:</span>
            {[1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => { setCurveWaves(w); playCurveSound('click'); }}
                className={`wave-btn ${curveWaves === w ? 'active' : ''}`}
              >
                {w === 1 ? 'Single Arc' : w === 2 ? 'S-Curve' : 'Multi-Wave'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Curve Display & Straightened Comparison */}
      <div className="tracer-stage-card">
        <div className="svg-display-box">
          <svg className="custom-curve-svg" viewBox="0 0 550 170" fill="none">
            {/* Grid */}
            <defs>
              <pattern id="tracerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(203, 213, 225, 0.35)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tracerGrid)" rx="10" />

            {/* Custom Curved Line */}
            <path
              d={getPath()}
              stroke="#D97706"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Flexible Thread Overlay */}
            <path
              d={getPath()}
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeDasharray="5 3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Start Knot A */}
            <circle cx="50" cy="100" r="6" fill="#78350F" />
            <text x="50" y="125" fill="#78350F" fontSize="11" fontWeight="900" textAnchor="middle">Knot A</text>

            {/* End Point B */}
            <circle cx="500" cy="100" r="6" fill="#2563EB" />
            <text x="500" y="125" fill="#2563EB" fontSize="11" fontWeight="900" textAnchor="middle">Ink Mark B</text>

            {/* Straight Chord Reference (Dashed Gray Line) */}
            <line x1="50" y1="100" x2="500" y2="100" stroke="rgba(100, 116, 139, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Live Calculation & Comparison Callout */}
        <div className="tracer-readout-strip">
          <div className="readout-item">
            <span className="item-label">Straight Shortcut Distance (A to B):</span>
            <span className="item-val">15.0 cm</span>
          </div>

          <div className="readout-item highlight">
            <span className="item-label">Actual Curved Path Length (Thread):</span>
            <span className="item-val bold-amber">{calculatedLengthCm} cm</span>
          </div>

          <div className="readout-item">
            <span className="item-label">Extra Length due to Curvature:</span>
            <span className="item-val green-val">+{(calculatedLengthCm - 15.0).toFixed(1)} cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
