import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Search, Sparkles, Ruler, Info, CheckCircle2 } from 'lucide-react';
import { playMetricSound } from './audioHelper';

export default function RulerMillimeterZoom() {
  const [selectedCm, setSelectedCm] = useState(5); // Window from 5 cm to 6 cm
  const [hoveredMm, setHoveredMm] = useState(null);

  const handleSelectSegment = (cm) => {
    playMetricSound('zoom');
    setSelectedCm(cm);
  };

  return (
    <div className="ruler-zoom-component">
      {/* 15-cm Ruler Presentation Stage */}
      <div className="ruler-overview-card">
        <div className="ruler-card-header">
          <div className="ruler-title-line">
            <span className="figure-tag">Fig. 5.3: A 15-cm Scale</span>
            <span className="scale-type-pill">Markings from 0 to 15 cm</span>
          </div>
          <span className="hint-pill">Click any 1 cm section to inspect in Microscope</span>
        </div>

        {/* 15-cm Physical Scale Graphic */}
        <div className="physical-ruler-container">
          <div className="ruler-body-board">
            <div className="ruler-wood-texture" />

            {/* Scale Markings 0 to 15 */}
            {Array.from({ length: 16 }).map((_, cm) => {
              const leftPercent = (cm / 15) * 100;
              const isSelectedStart = cm === selectedCm;
              return (
                <div key={cm} className="ruler-major-mark" style={{ left: `${leftPercent}%` }}>
                  <div className="major-tick-line" />
                  <span className="major-tick-num">{cm}</span>

                  {/* Micro sub-ticks between cm markers (except at 15) */}
                  {cm < 15 && (
                    <div className="sub-ticks-cluster">
                      {Array.from({ length: 9 }).map((_, mm) => (
                        <div
                          key={mm}
                          className={`mini-tick ${mm === 4 ? 'mid-tick' : ''}`}
                          style={{ left: `${((mm + 1) / 10) * (100 / 15)}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Draggable/Selectable Highlight Lens over the selected 1 cm */}
            <motion.div
              className="ruler-lens-highlight"
              style={{
                left: `${(selectedCm / 15) * 100}%`,
                width: `${(1 / 15) * 100}%`
              }}
              layout
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div className="lens-glass-effect" />
              <div className="lens-label-badge">
                <Search size={11} />
                <span>{selectedCm} - {selectedCm + 1} cm</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Click Segment Buttons below ruler */}
          <div className="segment-quick-bar">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((cm) => (
              <button
                key={cm}
                onClick={() => handleSelectSegment(cm)}
                className={`segment-btn ${selectedCm === cm ? 'active' : ''}`}
              >
                {cm}-{cm + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Microscope High-Magnification Viewport (1 cm Magnified 10x) */}
      <div className="microscope-viewport-card">
        <div className="microscope-header">
          <div className="micro-title-group">
            <ZoomIn size={18} color="#D97706" />
            <h4 className="micro-heading">
              10× Microscope Zoom: Between {selectedCm} cm and {selectedCm + 1} cm
            </h4>
          </div>
          <div className="least-count-badge">
            <Sparkles size={14} color="#059669" />
            <span>Smallest Measurable Value (Least Count) = 1 mm (0.1 cm)</span>
          </div>
        </div>

        {/* Magnified 1 cm Bar divided into 10 mm */}
        <div className="magnified-stage">
          <div className="magnified-ruler-track">
            {/* Start Major Mark */}
            <div className="magnified-endpoint start">
              <div className="major-marker-bar" />
              <span className="major-marker-label">{selectedCm}.0 cm</span>
            </div>

            {/* 10 Equal Divisions (Millimetres) */}
            <div className="millimeter-divisions-grid">
              {Array.from({ length: 10 }).map((_, idx) => {
                const mmNum = idx + 1;
                const isHovered = hoveredMm === mmNum;
                const isMid5 = mmNum === 5;
                const decimalCm = (selectedCm + mmNum * 0.1).toFixed(1);

                return (
                  <div
                    key={idx}
                    className={`mm-division-slot ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => { setHoveredMm(mmNum); playMetricSound('click'); }}
                    onMouseLeave={() => setHoveredMm(null)}
                    onClick={() => { setHoveredMm(mmNum); playMetricSound('click'); }}
                  >
                    {/* Tick Mark */}
                    <div className={`mm-tick-pointer ${isMid5 ? 'half-cm-pointer' : ''}`} />

                    {/* Millimeter Number Tag */}
                    <span className="mm-index-text">{mmNum} mm</span>

                    {/* Equivalent cm label */}
                    <span className="mm-cm-equiv">{decimalCm} cm</span>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="mm-floating-tooltip">
                        <strong>{mmNum} mm</strong>
                        <span>= { (mmNum * 0.1).toFixed(1) } cm</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* End Major Mark */}
            <div className="magnified-endpoint end">
              <div className="major-marker-bar" />
              <span className="major-marker-label">{selectedCm + 1}.0 cm</span>
            </div>
          </div>
        </div>

        {/* Live Millimeter Inspector Readout */}
        <div className="millimeter-readout-row">
          <div className="readout-chip key-formula">
            <span className="readout-label">Fundamental Formula</span>
            <span className="readout-val">1 cm = 10 mm</span>
          </div>

          <div className="readout-chip fraction-formula">
            <span className="readout-label">Single Division Fraction</span>
            <span className="readout-val">1 mm = 0.1 cm (1/10 cm)</span>
          </div>

          <div className="readout-chip live-inspected">
            <span className="readout-label">Inspected Point</span>
            <span className="readout-val highlight">
              {hoveredMm ? `${hoveredMm} mm = ${(hoveredMm * 0.1).toFixed(1)} cm` : 'Hover/Tap any mm division'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
