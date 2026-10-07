import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react';
import { playCurveSound } from './audioHelper';

export default function AnishVerandahStory() {
  const [selectedTool, setSelectedTool] = useState('none'); // 'ruler' | 'thread'
  const [lightsTurnedOn, setLightsTurnedOn] = useState(false);

  const handleChooseTool = (tool) => {
    setSelectedTool(tool);
    if (tool === 'thread') {
      playCurveSound('trace');
    } else {
      playCurveSound('click');
    }
  };

  const handleToggleLights = () => {
    playCurveSound('success');
    setLightsTurnedOn(!lightsTurnedOn);
  };

  return (
    <div className="verandah-story-component">
      {/* Top Problem Inquiry Banner */}
      <div className="story-inquiry-card">
        <div className="inquiry-left">
          <span className="inquiry-badge">NCERT Fig. 5.7 Context</span>
          <h4 className="inquiry-title">Decorating the Verandah Arch with Fairy Lights</h4>
          <p className="inquiry-desc">
            Anish and his parents are fixing electric string lights on the curved arch for a celebration. 
            <strong> How can they measure the exact length of string lights needed?</strong>
          </p>
        </div>
        <div className="tool-select-buttons">
          <button
            onClick={() => handleChooseTool('ruler')}
            className={`tool-btn ${selectedTool === 'ruler' ? 'active-ruler' : ''}`}
          >
            <span>📏 Try Rigid Metre Scale</span>
          </button>
          <button
            onClick={() => handleChooseTool('thread')}
            className={`tool-btn ${selectedTool === 'thread' ? 'active-thread' : ''}`}
          >
            <span>🧵 Use Flexible Thread / Tape</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Verandah House Canvas */}
      <div className="verandah-canvas-card">
        <div className="verandah-scene-stage">
          {/* House Sky / Night Backdrop */}
          <div className={`verandah-sky ${lightsTurnedOn ? 'night-glow' : 'day-sky'}`}>
            {lightsTurnedOn && (
              <div className="celebration-particles">
                <Sparkles className="sparkle-float-1" color="#FBBF24" size={24} />
                <Sparkles className="sparkle-float-2" color="#38BDF8" size={20} />
                <Sparkles className="sparkle-float-3" color="#F43F5E" size={22} />
              </div>
            )}
          </div>

          {/* House Verandah Arch Architectural Vector */}
          <svg className="verandah-arch-svg" viewBox="0 0 600 240" fill="none">
            {/* House Wall & Pillars */}
            <rect x="40" y="80" width="40" height="150" fill="#78350F" rx="4" />
            <rect x="520" y="80" width="40" height="150" fill="#78350F" rx="4" />
            <rect x="20" y="60" width="560" height="24" fill="#92400E" rx="4" />

            {/* Verandah Curved Arch Path */}
            <path
              id="archPath"
              d="M 80 180 C 140 70, 460 70, 520 180"
              stroke="#CBD5E1"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />

            {/* Rigid Ruler Simulation Attempt (Fails to bend) */}
            {selectedTool === 'ruler' && (
              <g>
                <line x1="80" y1="180" x2="520" y2="180" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
                <text x="300" y="205" fill="#DC2626" fontSize="13" fontWeight="900" textAnchor="middle">
                  ⚠️ Rigid stick only measures a straight chord (cannot follow curved arch!)
                </text>
              </g>
            )}

            {/* Flexible Thread / String Light Simulation Attempt (Hugs curve perfectly) */}
            {selectedTool === 'thread' && (
              <g>
                <path
                  d="M 80 180 C 140 70, 460 70, 520 180"
                  stroke={lightsTurnedOn ? '#FBBF24' : '#DC2626'}
                  strokeWidth="6"
                  strokeDasharray={lightsTurnedOn ? '4 8' : 'none'}
                  strokeLinecap="round"
                  filter={lightsTurnedOn ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))' : 'none'}
                />

                {/* Glowing light bulb nodes along arch if turned on */}
                {lightsTurnedOn && [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((pos, i) => (
                  <circle
                    key={i}
                    cx={80 + pos * 440}
                    cy={180 - Math.sin(pos * Math.PI) * 95}
                    r="6"
                    fill={['#FBBF24', '#38BDF8', '#F43F5E', '#34D399', '#A855F7'][i % 5]}
                    filter="drop-shadow(0 0 6px white)"
                  />
                ))}
              </g>
            )}

            {/* Arch Base Points A and B */}
            <circle cx="80" cy="180" r="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
            <text x="80" y="220" fill="#1E293B" fontSize="13" fontWeight="900" textAnchor="middle">Point A</text>

            <circle cx="520" cy="180" r="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
            <text x="520" y="220" fill="#1E293B" fontSize="13" fontWeight="900" textAnchor="middle">Point B</text>
          </svg>
        </div>

        {/* Bottom Interactive Explanation & Light Switch */}
        <div className="scene-footer-action-bar">
          <div className="scene-status-text">
            {selectedTool === 'none' && (
              <span>👆 Click a tool above to help Anish measure the verandah arch!</span>
            )}
            {selectedTool === 'ruler' && (
              <span className="fail-msg">
                <strong>Why it fails:</strong> A rigid metre stick cannot bend along curves. It leaves large gaps and measures only a straight shortcut chord!
              </span>
            )}
            {selectedTool === 'thread' && (
              <span className="success-msg">
                <strong>Method Success:</strong> By laying a flexible thread along the arch from Point A to Point B, Anish finds the arch requires exactly <strong>3.6 metres (360 cm)</strong> of string lights!
              </span>
            )}
          </div>

          {selectedTool === 'thread' && (
            <button
              onClick={handleToggleLights}
              className={`glow-lights-btn ${lightsTurnedOn ? 'on' : 'off'}`}
            >
              <Lightbulb size={16} />
              <span>{lightsTurnedOn ? 'Turn Off Celebration Lights' : '💡 Light Up Celebration Arch!'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
