import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, AlertCircle, Compass, HelpCircle, Eye, Hand } from 'lucide-react';
import { playMeasureSound } from './audioHelper';

export default function FlexibleTapeAndRules() {
  const [selectedTarget, setSelectedTarget] = useState('tree_trunk'); // 'tree_trunk' | 'chest' | 'desk'
  const [deviceChoice, setDeviceChoice] = useState('flexible_tape'); // 'rigid_meter' | 'flexible_tape'
  const [notationTestAnswers, setNotationTestAnswers] = useState({});

  const targets = [
    {
      id: 'tree_trunk',
      name: 'Tree Trunk Girth',
      icon: '🌳',
      shape: 'Curved Cylinder (Round)',
      idealDevice: 'flexible_tape',
      explanation: 'A curved tree trunk requires a flexible tailor’s tape that wraps snugly around the circumference. A rigid straight wooden scale cannot bend!'
    },
    {
      id: 'chest',
      name: 'Chest / Waist Size',
      icon: '👕',
      shape: 'Curved Human Body',
      idealDevice: 'flexible_tape',
      explanation: 'Tailors use flexible ribbon tapes because human bodies are contoured and non-linear.'
    },
    {
      id: 'desk',
      name: 'Classroom Desk Width',
      icon: '🪑',
      shape: 'Flat Straight Surface',
      idealDevice: 'rigid_meter',
      explanation: 'Straight flat surfaces are measured cleanly with a standard straight metre rod or wooden ruler.'
    }
  ];

  const currentTarget = targets.find(t => t.id === selectedTarget) || targets[0];
  const isMatchCorrect = deviceChoice === currentTarget.idealDevice;

  const NOTATION_RULES = [
    {
      id: 1,
      rule: "No Plural 's'",
      bad: "10 cms / 5 ms",
      good: "10 cm / 5 m",
      desc: "Symbols never take 's' for plural."
    },
    {
      id: 2,
      rule: "Always Lowercase",
      bad: "15 CM / 2 Metres",
      good: "15 cm / 2 m",
      desc: "km, m, cm, mm are always lowercase."
    },
    {
      id: 3,
      rule: "Space between Number & Unit",
      bad: "25cm / 100m",
      good: "25 cm / 100 m",
      desc: "Always leave one clear space."
    },
    {
      id: 4,
      rule: "No Full Stop after Symbol",
      bad: "5 m. / 10 cm.",
      good: "5 m / 10 cm",
      desc: "No period unless ending a sentence."
    }
  ];

  return (
    <div className="flexible-and-rules-container">
      {/* Top Half: Curved vs Straight Measurement Device Sandbox */}
      <div className="flexible-device-card">
        <div className="device-card-header">
          <span className="card-tag">Curved vs Straight Measurement</span>
          <h4 className="card-title">Why are tailor's measuring tapes flexible?</h4>
        </div>

        <div className="device-interactive-row">
          {/* Left: Target Selection */}
          <div className="target-selection-col">
            <span className="col-label">1. Choose Object:</span>
            <div className="targets-list">
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTarget(t.id); playMeasureSound('click'); }}
                  className={`target-btn ${selectedTarget === t.id ? 'active' : ''}`}
                >
                  <span className="t-icon">{t.icon}</span>
                  <div className="t-info">
                    <strong className="t-name">{t.name}</strong>
                    <span className="t-shape">{t.shape}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Device Choice & Visual Simulation */}
          <div className="device-choice-col">
            <span className="col-label">2. Pick Measurement Tool:</span>
            <div className="device-options-buttons">
              <button
                onClick={() => { setDeviceChoice('flexible_tape'); playMeasureSound('align'); }}
                className={`dev-btn ${deviceChoice === 'flexible_tape' ? 'selected' : ''}`}
              >
                <span>🎗️ Flexible Tailor’s Tape</span>
              </button>
              <button
                onClick={() => { setDeviceChoice('rigid_meter'); playMeasureSound('align'); }}
                className={`dev-btn ${deviceChoice === 'rigid_meter' ? 'selected' : ''}`}
              >
                <span>📏 Rigid Wooden Metre Scale</span>
              </button>
            </div>

            {/* Simulation Feedback */}
            <div className={`device-sim-feedback ${isMatchCorrect ? 'success' : 'warning'}`}>
              {isMatchCorrect ? (
                <>
                  <CheckCircle2 size={18} color="#059669" />
                  <span><strong>Ideal Choice!</strong> {currentTarget.explanation}</span>
                </>
              ) : (
                <>
                  <AlertCircle size={18} color="#D97706" />
                  <span><strong>Inconvenient!</strong> {deviceChoice === 'rigid_meter' ? 'A stiff wooden stick cannot bend around round contours.' : 'A flexible ribbon might sag when measuring straight wooden boards.'}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Half: Scientific SI Notation Rules & Braille Scales */}
      <div className="rules-and-tactile-grid">
        {/* Notation Rules Table */}
        <div className="notation-rules-card">
          <div className="rules-header">
            <Sparkles size={16} color="#D97706" />
            <strong className="rules-title">Official NCERT Writing Rules:</strong>
          </div>

          <div className="rules-rows-list">
            {NOTATION_RULES.map((r) => (
              <div key={r.id} className="rule-item-row">
                <div className="rule-badge">{r.rule}</div>
                <div className="rule-examples">
                  <span className="bad-syntax">✗ {r.bad}</span>
                  <span className="good-syntax">✓ {r.good}</span>
                </div>
                <span className="rule-desc">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visually Challenged Students Tactile Scales Box */}
        <div className="tactile-scales-card">
          <div className="tactile-header">
            <Hand size={18} color="#2563EB" />
            <strong className="tactile-title">Accessibility & Braille Scales:</strong>
          </div>
          <p className="tactile-desc">
            Visually challenged students use special tactile scales with <strong>raised tactile bumps and Braille markings</strong> that can be accurately read by feeling them with fingertips!
          </p>
          <div className="tactile-visual-chip">
            <span className="dot-emboss">• 1 cm • 2 cm • 3 cm (Raised Dots)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
