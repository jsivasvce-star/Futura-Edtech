import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRightLeft, Sparkles, Ruler, Compass, RefreshCw } from 'lucide-react';
import { playMetricSound } from './audioHelper';

export default function MetricLadderConverter() {
  const [baseValue, setBaseValue] = useState(2); // 2 units
  const [baseUnit, setBaseUnit] = useState('m'); // 'km' | 'm' | 'cm' | 'mm'

  // Convert everything to standard metres first
  const getMetres = () => {
    switch (baseUnit) {
      case 'km': return baseValue * 1000;
      case 'm': return baseValue;
      case 'cm': return baseValue / 100;
      case 'mm': return baseValue / 1000;
      default: return baseValue;
    }
  };

  const currentMetres = getMetres();
  const kmVal = currentMetres / 1000;
  const mVal = currentMetres;
  const cmVal = currentMetres * 100;
  const mmVal = currentMetres * 1000;
  const inchVal = (cmVal / 2.54).toFixed(2);
  const footVal = (cmVal / 30.48).toFixed(2);

  const presetValues = [
    { label: '1 Kilometre (km)', val: 1, unit: 'km' },
    { label: '1 Metre (m)', val: 1, unit: 'm' },
    { label: '15 Centimetres (cm)', val: 15, unit: 'cm' },
    { label: '1 Millimetre (mm)', val: 1, unit: 'mm' },
    { label: '1 Inch (in)', val: 2.54, unit: 'cm' }
  ];

  const handleSelectPreset = (p) => {
    playMetricSound('click');
    setBaseValue(p.val);
    setBaseUnit(p.unit);
  };

  return (
    <div className="metric-ladder-component">
      {/* Top Value Controller Bar */}
      <div className="ladder-controller-card">
        <div className="controller-header">
          <div className="ctrl-title-group">
            <ArrowRightLeft size={17} color="#D97706" />
            <h4 className="ctrl-title">Interactive Metric Scale Converter</h4>
          </div>
          <span className="ctrl-badge">SI Length System</span>
        </div>

        {/* Input & Unit Switcher */}
        <div className="controller-inputs-row">
          <div className="input-group">
            <label className="input-label">Enter Length Value:</label>
            <input
              type="number"
              min="0.1"
              max="10000"
              step="any"
              value={baseValue}
              onChange={(e) => setBaseValue(Math.max(0.001, parseFloat(e.target.value) || 1))}
              className="metric-number-input"
            />
          </div>

          <div className="unit-buttons-group">
            {['km', 'm', 'cm', 'mm'].map((u) => (
              <button
                key={u}
                onClick={() => { playMetricSound('click'); setBaseUnit(u); }}
                className={`unit-choice-btn ${baseUnit === u ? 'active' : ''}`}
              >
                {u.toUpperCase()} ({u})
              </button>
            ))}
          </div>
        </div>

        {/* Presets Row */}
        <div className="presets-strip">
          <span className="presets-label">NCERT Standards:</span>
          {presetValues.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="preset-pill-btn"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Multi-Tier Metric Conversion Tiles */}
      <div className="metric-tiles-grid">
        {/* Kilometre Tile */}
        <div className={`metric-unit-tile ${baseUnit === 'km' ? 'highlighted-source' : ''}`}>
          <div className="tile-top-row">
            <span className="unit-symbol-badge km-badge">km</span>
            <span className="unit-full-name">Kilometre (Large Distance)</span>
          </div>
          <div className="tile-main-value">
            {kmVal >= 1000 ? kmVal.toLocaleString() : kmVal.toFixed(kmVal < 0.01 ? 5 : 3)} <span className="unit-abbr">km</span>
          </div>
          <div className="tile-footer-formula">
            <span>1 km = 1,000 m</span>
          </div>
        </div>

        {/* Metre Tile (SI Base Unit) */}
        <div className={`metric-unit-tile si-primary ${baseUnit === 'm' ? 'highlighted-source' : ''}`}>
          <div className="tile-top-row">
            <span className="unit-symbol-badge m-badge">m</span>
            <span className="unit-full-name">Metre (SI Standard Unit)</span>
            <span className="si-star-pill">★ SI BASE</span>
          </div>
          <div className="tile-main-value">
            {mVal >= 1000 ? mVal.toLocaleString() : mVal.toFixed(mVal < 0.1 ? 3 : 2)} <span className="unit-abbr">m</span>
          </div>
          <div className="tile-footer-formula">
            <span>1 m = 100 cm = 1,000 mm</span>
          </div>
        </div>

        {/* Centimetre Tile */}
        <div className={`metric-unit-tile ${baseUnit === 'cm' ? 'highlighted-source' : ''}`}>
          <div className="tile-top-row">
            <span className="unit-symbol-badge cm-badge">cm</span>
            <span className="unit-full-name">Centimetre (Medium Length)</span>
          </div>
          <div className="tile-main-value">
            {cmVal >= 10000 ? cmVal.toLocaleString() : cmVal.toFixed(cmVal < 0.1 ? 2 : 1)} <span className="unit-abbr">cm</span>
          </div>
          <div className="tile-footer-formula">
            <span>1 cm = 10 mm = 0.01 m</span>
          </div>
        </div>

        {/* Millimetre Tile */}
        <div className={`metric-unit-tile ${baseUnit === 'mm' ? 'highlighted-source' : ''}`}>
          <div className="tile-top-row">
            <span className="unit-symbol-badge mm-badge">mm</span>
            <span className="unit-full-name">Millimetre (Tiny Length)</span>
          </div>
          <div className="tile-main-value">
            {mmVal >= 100000 ? mmVal.toLocaleString() : mmVal.toFixed(0)} <span className="unit-abbr">mm</span>
          </div>
          <div className="tile-footer-formula">
            <span>1 mm = 0.1 cm = 0.001 m</span>
          </div>
        </div>
      </div>

      {/* Traditional Units "Do you know?" Bar (Inches & Feet) */}
      <div className="traditional-units-banner">
        <div className="banner-left-content">
          <div className="did-you-know-tag">💡 Do You Know? (NCERT Page 83)</div>
          <p className="traditional-desc">
            In earlier days, units like <strong>inch</strong> and <strong>foot</strong> were used. Many geometry scales still display inch markings on the opposite side:
          </p>
        </div>
        <div className="traditional-readouts-col">
          <div className="inch-chip">
            <span className="inch-badge">1 Inch</span>
            <span className="inch-equal">=</span>
            <span className="inch-metric">2.54 cm</span>
            <span className="live-convert">({inchVal} in for this value)</span>
          </div>
          <div className="foot-chip">
            <span className="inch-badge">1 Foot</span>
            <span className="inch-equal">=</span>
            <span className="inch-metric">12 in (30.48 cm)</span>
            <span className="live-convert">({footVal} ft for this value)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
