/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import './section.css';

export default function Chapter2InteractiveSection({ section, onBack }) {
  // Common interactive states
  const [angle1, setAngle1] = useState(45);
  const [angle2, setAngle2] = useState(70);
  const [flashlightOn, setFlashlightOn] = useState(true);
  const [isSuperposed, setIsSuperposed] = useState(false);
  const [selectedSpecialType, setSelectedSpecialType] = useState('right');
  const [drawingStep, setDrawingStep] = useState(1);

  // Render specific content based on section.id
  const renderInteractiveContent = () => {
    switch (section.id) {
      case '2.4': // Ray
        return null;

      case '2.5': // Angle
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>What is an Angle?</h3>
              <p>An <strong>Angle</strong> is formed when two rays originate from the same common starting point, called the <strong>Vertex</strong>.</p>
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 280" className="ch2-stage-svg">
                {/* Vertex Point O */}
                <circle cx="200" cy="200" r="8" fill="#DB2777" stroke="#FFFFFF" strokeWidth="2" />
                <text x="180" y="230" fill="#0F172A" fontWeight="800" fontSize="16">Vertex O</text>

                {/* Base Ray OA (horizontal) */}
                <line x1="200" y1="200" x2="550" y2="200" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
                <polygon points="560,200 540,192 540,208" fill="#DB2777" />
                <text x="565" y="205" fill="#0F172A" fontWeight="800" fontSize="16">Ray OA</text>

                {/* Rotating Arm Ray OB */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos((-angle1 * Math.PI) / 180) * 350}
                  y2={200 + Math.sin((-angle1 * Math.PI) / 180) * 350}
                  stroke="#9D174D"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <polygon
                  points={`${200 + Math.cos((-angle1 * Math.PI) / 180) * 360},${200 + Math.sin((-angle1 * Math.PI) / 180) * 360} ${200 + Math.cos((-angle1 * Math.PI) / 180) * 340 - Math.sin((-angle1 * Math.PI) / 180) * 8},${200 + Math.sin((-angle1 * Math.PI) / 180) * 340 + Math.cos((-angle1 * Math.PI) / 180) * 8} ${200 + Math.cos((-angle1 * Math.PI) / 180) * 340 + Math.sin((-angle1 * Math.PI) / 180) * 8},${200 + Math.sin((-angle1 * Math.PI) / 180) * 340 - Math.cos((-angle1 * Math.PI) / 180) * 8}`}
                  fill="#9D174D"
                />
                <text
                  x={200 + Math.cos((-angle1 * Math.PI) / 180) * 360 + 10}
                  y={200 + Math.sin((-angle1 * Math.PI) / 180) * 360}
                  fill="#0F172A"
                  fontWeight="800"
                  fontSize="16"
                >
                  Ray OB
                </text>

                {/* Angle Arc */}
                <path
                  d={`M 280 200 A 80 80 0 0 0 ${200 + Math.cos((-angle1 * Math.PI) / 180) * 80} ${200 + Math.sin((-angle1 * Math.PI) / 180) * 80}`}
                  fill="rgba(219, 39, 119, 0.15)"
                  stroke="#DB2777"
                  strokeWidth="2.5"
                />
                <text
                  x={200 + Math.cos(((-angle1 / 2) * Math.PI) / 180) * 110}
                  y={200 + Math.sin(((-angle1 / 2) * Math.PI) / 180) * 110}
                  fill="#BE185D"
                  fontWeight="900"
                  fontSize="20"
                >
                  θ = {angle1}°
                </text>
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <div className="ch2-control-group">
                <label>Adjust Angle Size: <strong>{angle1}°</strong> ({angle1 < 90 ? 'Acute Angle' : angle1 === 90 ? 'Right Angle' : 'Obtuse Angle'})</label>
                <input
                  type="range"
                  min="15"
                  max="165"
                  value={angle1}
                  onChange={(e) => setAngle1(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        );

      case '2.6': // Comparing Angles
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Comparing Angles by Superposition</h3>
              <p>To compare two angles, we can place one angle directly on top of the other so that their vertices and one arm coincide.</p>
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 260" className="ch2-stage-svg">
                {/* Angle 1 (Blue) */}
                <g transform={isSuperposed ? 'translate(220, 20)' : 'translate(100, 20)'}>
                  <line x1="80" y1="180" x2="260" y2="180" stroke="#0284C7" strokeWidth="4" />
                  <line
                    x1="80"
                    y1="180"
                    x2={80 + Math.cos((-angle1 * Math.PI) / 180) * 180}
                    y2={180 + Math.sin((-angle1 * Math.PI) / 180) * 180}
                    stroke="#0284C7"
                    strokeWidth="4"
                  />
                  <path
                    d={`M 130 180 A 50 50 0 0 0 ${80 + Math.cos((-angle1 * Math.PI) / 180) * 50} ${180 + Math.sin((-angle1 * Math.PI) / 180) * 50}`}
                    fill="rgba(2, 132, 199, 0.2)"
                    stroke="#0284C7"
                    strokeWidth="2"
                  />
                  <circle cx="80" cy="180" r="6" fill="#0284C7" />
                  <text x="70" y="210" fill="#0284C7" fontWeight="800" fontSize="16">Angle 1 (θ₁ = {angle1}°)</text>
                </g>

                {/* Angle 2 (Green) */}
                <g transform={isSuperposed ? 'translate(220, 20)' : 'translate(380, 20)'}>
                  <line x1="80" y1="180" x2="260" y2="180" stroke="#10B981" strokeWidth="4" />
                  <line
                    x1="80"
                    y1="180"
                    x2={80 + Math.cos((-angle2 * Math.PI) / 180) * 180}
                    y2={180 + Math.sin((-angle2 * Math.PI) / 180) * 180}
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  <path
                    d={`M 130 180 A 50 50 0 0 0 ${80 + Math.cos((-angle2 * Math.PI) / 180) * 50} ${180 + Math.sin((-angle2 * Math.PI) / 180) * 50}`}
                    fill="rgba(16, 185, 129, 0.2)"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  <circle cx="80" cy="180" r="6" fill="#10B981" />
                  <text x="70" y="210" fill="#10B981" fontWeight="800" fontSize="16">Angle 2 (θ₂ = {angle2}°)</text>
                </g>
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <div className="ch2-controls-row">
                <div className="ch2-control-group">
                  <label>Angle 1 (Blue): <strong>{angle1}°</strong></label>
                  <input type="range" min="20" max="90" value={angle1} onChange={(e) => setAngle1(Number(e.target.value))} />
                </div>
                <div className="ch2-control-group">
                  <label>Angle 2 (Green): <strong>{angle2}°</strong></label>
                  <input type="range" min="20" max="90" value={angle2} onChange={(e) => setAngle2(Number(e.target.value))} />
                </div>
              </div>
              <button
                className={`ch2-action-toggle-btn ${isSuperposed ? 'active' : ''}`}
                onClick={() => setIsSuperposed(!isSuperposed)}
              >
                <span>{isSuperposed ? 'Separate Angles' : 'Superpose Angles (Overlap Test)'}</span>
              </button>
            </div>
          </div>
        );

      case '2.7': // Making Rotating Arms
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Making Rotating Arms</h3>
              <p>Fix two strips with a drawing pin at one end. Keep one arm fixed and rotate the other arm to observe how angles grow!</p>
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 280" className="ch2-stage-svg">
                {/* Circular protractor dial in background */}
                <circle cx="350" cy="180" r="140" fill="rgba(29, 78, 216, 0.04)" stroke="rgba(29, 78, 216, 0.2)" strokeWidth="2" />
                <line x1="210" y1="180" x2="490" y2="180" stroke="rgba(29, 78, 216, 0.2)" strokeDasharray="3 3" />
                <line x1="350" y1="40" x2="350" y2="180" stroke="rgba(29, 78, 216, 0.2)" strokeDasharray="3 3" />

                {/* Fixed Arm (Horizontal) */}
                <rect x="350" y="172" width="160" height="16" rx="8" fill="#94A3B8" />
                <circle cx="350" cy="180" r="5" fill="#475569" />

                {/* Rotating Blue Arm */}
                <g transform={`rotate(${-angle1}, 350, 180)`}>
                  <rect x="350" y="171" width="160" height="18" rx="9" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="490" cy="180" r="4" fill="#FFFFFF" />
                </g>

                {/* Brass Pivot Pin */}
                <circle cx="350" cy="180" r="10" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />

                {/* Sweeping Arc */}
                <path
                  d={`M 410 180 A 60 60 0 0 0 ${350 + Math.cos((-angle1 * Math.PI) / 180) * 60} ${180 + Math.sin((-angle1 * Math.PI) / 180) * 60}`}
                  fill="rgba(29, 78, 216, 0.15)"
                  stroke="#1D4ED8"
                  strokeWidth="2.5"
                />
                <text x="350" y="240" textAnchor="middle" fill="#0F172A" fontWeight="900" fontSize="22">
                  Rotation: {angle1}° ({angle1 < 90 ? 'Acute' : angle1 === 90 ? 'Right' : angle1 < 180 ? 'Obtuse' : 'Straight'})
                </text>
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <div className="ch2-control-group">
                <label>Drag Arm Rotation: <strong>{angle1}°</strong></label>
                <input type="range" min="0" max="180" value={angle1} onChange={(e) => setAngle1(Number(e.target.value))} />
              </div>
            </div>
          </div>
        );

      case '2.8': // Special Types of Angles
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Special Types of Angles</h3>
              <p>Explore the fundamental angle classifications based on their degree measure.</p>
            </div>

            <div className="ch2-special-type-tabs">
              {['acute', 'right', 'obtuse', 'straight', 'reflex'].map((type) => (
                <button
                  key={type}
                  className={`ch2-type-tab-btn ${selectedSpecialType === type ? 'active' : ''}`}
                  onClick={() => setSelectedSpecialType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 240" className="ch2-stage-svg">
                {selectedSpecialType === 'right' && (
                  <g transform="translate(280, 40)">
                    <line x1="40" y1="160" x2="200" y2="160" stroke="#7C3AED" strokeWidth="4" />
                    <line x1="40" y1="160" x2="40" y2="0" stroke="#7C3AED" strokeWidth="4" />
                    <rect x="40" y="130" width="30" height="30" fill="rgba(124, 58, 237, 0.2)" stroke="#7C3AED" strokeWidth="2" />
                    <circle cx="40" cy="160" r="6" fill="#7C3AED" />
                    <text x="90" y="90" fill="#7C3AED" fontWeight="900" fontSize="22">Right Angle = 90°</text>
                  </g>
                )}

                {selectedSpecialType === 'acute' && (
                  <g transform="translate(280, 40)">
                    <line x1="40" y1="160" x2="200" y2="160" stroke="#10B981" strokeWidth="4" />
                    <line x1="40" y1="160" x2="160" y2="40" stroke="#10B981" strokeWidth="4" />
                    <path d="M 90 160 A 50 50 0 0 0 75 125" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="2" />
                    <circle cx="40" cy="160" r="6" fill="#10B981" />
                    <text x="120" y="110" fill="#10B981" fontWeight="900" fontSize="22">Acute Angle &lt; 90°</text>
                  </g>
                )}

                {selectedSpecialType === 'obtuse' && (
                  <g transform="translate(280, 40)">
                    <line x1="120" y1="160" x2="260" y2="160" stroke="#F59E0B" strokeWidth="4" />
                    <line x1="120" y1="160" x2="0" y2="40" stroke="#F59E0B" strokeWidth="4" />
                    <path d="M 170 160 A 50 50 0 0 0 85 125" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" strokeWidth="2" />
                    <circle cx="120" cy="160" r="6" fill="#F59E0B" />
                    <text x="90" y="20" fill="#D97706" fontWeight="900" fontSize="22">Obtuse Angle: 90° &lt; θ &lt; 180°</text>
                  </g>
                )}

                {selectedSpecialType === 'straight' && (
                  <g transform="translate(250, 40)">
                    <line x1="0" y1="140" x2="280" y2="140" stroke="#0284C7" strokeWidth="4" />
                    <circle cx="140" cy="140" r="6" fill="#0284C7" />
                    <path d="M 200 140 A 60 60 0 0 0 80 140" fill="rgba(2, 132, 199, 0.2)" stroke="#0284C7" strokeWidth="2" />
                    <text x="140" y="60" textAnchor="middle" fill="#0284C7" fontWeight="900" fontSize="22">Straight Angle = 180°</text>
                  </g>
                )}

                {selectedSpecialType === 'reflex' && (
                  <g transform="translate(250, 40)">
                    <line x1="140" y1="100" x2="280" y2="100" stroke="#EC4899" strokeWidth="4" />
                    <line x1="140" y1="100" x2="40" y2="180" stroke="#EC4899" strokeWidth="4" />
                    <circle cx="140" cy="100" r="6" fill="#EC4899" />
                    <path d="M 190 100 A 50 50 0 1 1 80 150" fill="rgba(236, 72, 153, 0.2)" stroke="#EC4899" strokeWidth="2" />
                    <text x="140" y="40" textAnchor="middle" fill="#EC4899" fontWeight="900" fontSize="22">Reflex Angle: 180° &lt; θ &lt; 360°</text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        );

      case '2.9': // Measuring Angles
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Using a Protractor to Measure Angles</h3>
              <p>Align the protractor center with the vertex and align the baseline with ray OA. Read the degree where ray OB intersects the scale!</p>
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 280" className="ch2-stage-svg">
                {/* Protractor Shape */}
                <g transform="translate(350, 200)">
                  <path d="M -160 0 A 160 160 0 0 1 160 0 Z" fill="rgba(2, 132, 199, 0.12)" stroke="#0284C7" strokeWidth="2.5" />
                  <line x1="-160" y1="0" x2="160" y2="0" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" fill="#0284C7" />

                  {/* Degree ticks */}
                  {[0, 30, 45, 60, 90, 120, 135, 150, 180].map((deg) => (
                    <g key={deg} transform={`rotate(${-deg})`}>
                      <line x1="140" y1="0" x2="160" y2="0" stroke="#0284C7" strokeWidth="1.5" />
                      <text x="125" y="4" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="700">
                        {deg}°
                      </text>
                    </g>
                  ))}

                  {/* Measured Angle Ray */}
                  <line
                    x1="0"
                    y1="0"
                    x2={Math.cos((-angle1 * Math.PI) / 180) * 190}
                    y2={Math.sin((-angle1 * Math.PI) / 180) * 190}
                    stroke="#D97706"
                    strokeWidth="3.5"
                  />
                  <line x1="0" y1="0" x2="190" y2="0" stroke="#D97706" strokeWidth="3.5" />
                </g>

                <text x="350" y="250" textAnchor="middle" fill="#0F172A" fontWeight="900" fontSize="20">
                  Protractor Reading: {angle1}°
                </text>
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <div className="ch2-control-group">
                <label>Rotate Target Angle: <strong>{angle1}°</strong></label>
                <input type="range" min="10" max="170" value={angle1} onChange={(e) => setAngle1(Number(e.target.value))} />
              </div>
            </div>
          </div>
        );

      case '2.10': // Drawing Angles
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Drawing Angles Step-by-Step</h3>
              <p>Learn how to construct a geometric angle using a straight ruler and protractor.</p>
            </div>

            <div className="ch2-special-type-tabs">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  className={`ch2-type-tab-btn ${drawingStep === step ? 'active' : ''}`}
                  onClick={() => setDrawingStep(step)}
                >
                  Step {step}: {step === 1 ? 'Draw Base Ray' : step === 2 ? 'Mark Degree with Protractor' : 'Draw Terminal Ray'}
                </button>
              ))}
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 240" className="ch2-stage-svg">
                {/* Step 1: Base Ray */}
                <circle cx="200" cy="170" r="6" fill="#0284C7" />
                <line x1="200" y1="170" x2="500" y2="170" stroke="#0284C7" strokeWidth="3.5" />
                <text x="180" y="200" fill="#0F172A" fontWeight="800">Point O</text>

                {drawingStep >= 2 && (
                  /* Step 2: Protractor & pencil mark */
                  <g>
                    <circle
                      cx={200 + Math.cos((-60 * Math.PI) / 180) * 160}
                      cy={170 + Math.sin((-60 * Math.PI) / 180) * 160}
                      r="5"
                      fill="#EF4444"
                    />
                    <text
                      x={200 + Math.cos((-60 * Math.PI) / 180) * 160 + 10}
                      y={170 + Math.sin((-60 * Math.PI) / 180) * 160}
                      fill="#EF4444"
                      fontWeight="800"
                    >
                      Mark B at 60°
                    </text>
                  </g>
                )}

                {drawingStep === 3 && (
                  /* Step 3: Connect ray */
                  <g>
                    <line
                      x1="200"
                      y1="170"
                      x2={200 + Math.cos((-60 * Math.PI) / 180) * 220}
                      y2={170 + Math.sin((-60 * Math.PI) / 180) * 220}
                      stroke="#10B981"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 250 170 A 50 50 0 0 0 225 126"
                      fill="rgba(16, 185, 129, 0.2)"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                    <text x="260" y="150" fill="#10B981" fontWeight="900" fontSize="18">Angle = 60°</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <button
                className="ch2-action-toggle-btn active"
                onClick={() => setDrawingStep((prev) => (prev < 3 ? prev + 1 : 1))}
              >
                <span>{drawingStep < 3 ? `Next: Step ${drawingStep + 1} →` : 'Restart Construction ↺'}</span>
              </button>
            </div>
          </div>
        );

      case '2.11': // Types of Angles and Their Measures
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>Angle Spectrum & Measures Overview</h3>
              <p>Review the full spectrum of angles and their exact degree boundaries.</p>
            </div>

            <div className="ch2-visual-stage">
              <svg viewBox="0 0 700 260" className="ch2-stage-svg">
                {/* 360-degree Color Wheel */}
                <g transform="translate(350, 130)">
                  {/* Acute Sector (0 to 90) */}
                  <path d="M 0 0 L 100 0 A 100 100 0 0 0 0 -100 Z" fill="#10B981" opacity="0.85" />
                  {/* Obtuse Sector (90 to 180) */}
                  <path d="M 0 0 L 0 -100 A 100 100 0 0 0 -100 0 Z" fill="#F59E0B" opacity="0.85" />
                  {/* Reflex Sector (180 to 360) */}
                  <path d="M 0 0 L -100 0 A 100 100 0 0 0 100 0 Z" fill="#EC4899" opacity="0.85" />

                  <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <text x="60" y="-45" fill="#FFFFFF" fontWeight="900" fontSize="13">Acute</text>
                  <text x="-75" y="-45" fill="#FFFFFF" fontWeight="900" fontSize="13">Obtuse</text>
                  <text x="0" y="60" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">Reflex (180°-360°)</text>
                  <text x="115" y="5" fill="#0F172A" fontWeight="800" fontSize="12">0° / 360°</text>
                  <text x="5" y="-110" fill="#0F172A" fontWeight="800" fontSize="12">90°</text>
                  <text x="-145" y="5" fill="#0F172A" fontWeight="800" fontSize="12">180°</text>
                </g>
              </svg>
            </div>

            <div className="ch2-controls-panel">
              <div className="ch2-quick-facts-row">
                <span className="ch2-fact-pill" style={{ borderLeft: '4px solid #10B981' }}>Acute: 0° to 90°</span>
                <span className="ch2-fact-pill" style={{ borderLeft: '4px solid #7C3AED' }}>Right: Exactly 90°</span>
                <span className="ch2-fact-pill" style={{ borderLeft: '4px solid #F59E0B' }}>Obtuse: 90° to 180°</span>
                <span className="ch2-fact-pill" style={{ borderLeft: '4px solid #0284C7' }}>Straight: Exactly 180°</span>
                <span className="ch2-fact-pill" style={{ borderLeft: '4px solid #EC4899' }}>Reflex: 180° to 360°</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="ch2-interactive-card">
            <div className="ch2-concept-desc">
              <h3>{section.title}</h3>
              <p>Interactive laboratory for {section.title}.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="ch2-section-view-root" id={`ch2-section-${section.id.replace('.', '_')}`}>
      {/* Top Header with Back Navigation */}
      <header className="ch2-section-topbar">
        <div className="ch2-section-topbar-left">
          <button
            onClick={onBack}
            className="ch2-top-back-btn"
            title="Back to Chapter Flow"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="ch2-section-title-wrap">
            <span className="ch2-section-badge">GRADE 6 • MATHEMATICS • CHAPTER 2</span>
            <h2 className="ch2-section-name">{section.fullName || `${section.badge || section.number} — ${section.title}`}</h2>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="ch2-section-main-canvas">
        {renderInteractiveContent()}
      </main>
    </div>
  );
}
