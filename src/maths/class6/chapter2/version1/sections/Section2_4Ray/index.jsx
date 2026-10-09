/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Lightbulb, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import './ray.css';

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * SECTION 2.4 — RAY (किरण)
 * Class 6 Mathematics · Discovery Learning Experience
 * 
 * REDESIGNED FULL-SCREEN TEACHING FLOW (Steps 1 through 5):
 * 1. REAL-WORLD LIGHTHOUSE: Fixed starting point A, beam into distance, directional arrow.
 * 2. TORCH LIGHT EXPERIMENT: Point A at torch head, point P along beam, arrow beyond P.
 * 3. TRANSFORM INTO A MATHEMATICAL DIAGRAM: Smooth comparison to clean geometric ray AP, notation & definition.
 * 4. INTERACTIVE RAY BUILDER: Full-screen interactive canvas to aim ray AP in 360° with live protractor.
 * 5. RAY IDENTIFICATION ACTIVITY: 3 distinct vector diagrams (Segment, Ray, Line) with clear comparison.
 * ══════════════════════════════════════════════════════════════════════════════
 */

// Synthesized Web Audio Sound Effects
const playEducationalTone = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'correct') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.14, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.25);
      });
    } else if (type === 'wrong') {
      [280, 220].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.12, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.2);
      });
    } else if (type === 'torch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Audio Context not allowed before interaction
  }
};

export default function Section2_4Ray({
  onBackToMap,
  onBack,
  onBackTo2_3,
  onNextSection
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Step 1: Lighthouse states
  const [lighthouseBeamOn, setLighthouseBeamOn] = useState(true);
  const [lighthouseAngle, setLighthouseAngle] = useState(0);

  // Step 2: Torch states
  const [torchBeamOn, setTorchBeamOn] = useState(true);
  const [pointPPos, setPointPPos] = useState(55); // % along beam

  // Step 3: Transition Slider states
  const [diagramTransition, setDiagramTransition] = useState(65);

  // Step 4: Interactive Ray Builder states
  const [builderOrigin] = useState({ x: 190, y: 240 });
  const [builderAngle, setBuilderAngle] = useState(20);
  const [builderDistanceP, setBuilderDistanceP] = useState(240);
  const [isAiming, setIsAiming] = useState(false);

  // Step 5: Identification Activity states
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const sound = useCallback((type) => {
    if (soundEnabled) playEducationalTone(type);
  }, [soundEnabled]);

  const handleStepChange = (step) => {
    sound('click');
    setCurrentStep(step);
  };

  const handleRestart = () => {
    sound('click');
    setCurrentStep(1);
    setLighthouseBeamOn(true);
    setLighthouseAngle(0);
    setTorchBeamOn(true);
    setPointPPos(55);
    setDiagramTransition(65);
    setBuilderAngle(20);
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const stepsMeta = [
    { id: 1, label: "1. Lighthouse" },
    { id: 2, label: "2. Torch Experiment" },
    { id: 3, label: "3. Math Diagram" },
    { id: 4, label: "4. Ray Builder" },
    { id: 5, label: "5. Identify Ray" }
  ];

  return (
    <div className="ray24-root-container" id="section-2-4-ray-root">
      {/* Background blueprint decorative grid */}
      <div className="ray24-blueprint-grid" />

      {/* ════════════════════════ TOPBAR (58px) ════════════════════════ */}
      <header className="ray24-topbar">
        <div className="ray24-topbar-left">
          <button
            onClick={() => {
              sound('click');
              if (onBackToMap) onBackToMap();
              else if (onBack) onBack();
            }}
            className="ray24-back-btn"
            title="Return to Chapter 2 Flow"
            id="ray24-back-btn"
          >
            <ArrowLeft size={18} strokeWidth={2.6} />
            <span>Chapter Flow</span>
          </button>

          <div className="ray24-title-wrap">
            <span className="ray24-badge">GRADE 6 • CHAPTER 2 • SECTION 2.4</span>
            <h1 className="ray24-section-name">Ray (किरण)</h1>
          </div>
        </div>

        {/* Center Progress Navigation Pills */}
        <nav className="ray24-step-pills" aria-label="Step navigation">
          {stepsMeta.map((s) => (
            <button
              key={s.id}
              onClick={() => handleStepChange(s.id)}
              className={`ray24-step-pill ${currentStep === s.id ? 'active' : ''}`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="ray24-topbar-right">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) sound('click');
            }}
            className="ray24-action-btn"
            title={soundEnabled ? "Mute audio" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>Sound</span>
          </button>

          <button
            onClick={handleRestart}
            className="ray24-action-btn"
            title="Reset All Controls"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* ════════════════════════ FULL-SCREEN MAIN STAGE ════════════════════════ */}
      <main className="ray24-main-stage">
        
        {/* ────────────────── STEP 1: REAL-WORLD LIGHTHOUSE ────────────────── */}
        {currentStep === 1 && (
          <>
            {/* Left 63% Viewport: Full-height HD Lighthouse Image & Overlay */}
            <div className="ray24-visual-viewport">
              <img
                src="/assets/maths/class6/chapter2/ray_lighthouse_hd.jpg"
                alt="Realistic Lighthouse emitting a beam of light"
                className="ray24-media-img"
              />

              <svg className="ray24-svg-overlay" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                  <marker
                    id="arrowGold1"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="9"
                    markerHeight="9"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#F59E0B" />
                  </marker>
                </defs>

                {lighthouseBeamOn && (
                  <>
                    {/* Beam Glow */}
                    <polygon
                      points={`310,122 1000,${122 - 60 + lighthouseAngle * 4} 1000,${122 + 90 + lighthouseAngle * 4}`}
                      fill="url(#beamGradStep1)"
                      opacity="0.34"
                      style={{ mixBlendMode: 'screen' }}
                    />
                    <linearGradient id="beamGradStep1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0.05" />
                    </linearGradient>

                    {/* Mathematical Center Ray Line */}
                    <line
                      x1="310"
                      y1="122"
                      x2="980"
                      y2={122 + lighthouseAngle * 3}
                      stroke="#F59E0B"
                      strokeWidth="4.5"
                      strokeDasharray="8 6"
                      markerEnd="url(#arrowGold1)"
                    />

                    {/* Point A at the Lantern Source */}
                    <circle cx="310" cy="122" r="16" fill="rgba(245, 158, 11, 0.4)" />
                    <circle cx="310" cy="122" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />

                    {/* Point A Tag */}
                    <g transform="translate(268, 66)">
                      <rect x="0" y="0" width="84" height="30" rx="6" fill="#0F172A" fillOpacity="0.92" />
                      <text x="42" y="20" fill="#FDE68A" fontSize="15" fontWeight="900" textAnchor="middle">
                        Point A
                      </text>
                    </g>

                    {/* Extending Ray Tag */}
                    <g transform={`translate(900, ${110 + lighthouseAngle * 3})`}>
                      <rect x="0" y="0" width="76" height="28" rx="6" fill="#0F172A" fillOpacity="0.92" />
                      <text x="38" y="19" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
                        Ray ⟶
                      </text>
                    </g>
                  </>
                )}
              </svg>
            </div>

            {/* Right 37% Sidebar: Clean, Large-Text Explanations & Controls */}
            <div className="ray24-content-sidebar">
              <div>
                <div className="ray24-step-header-area">
                  <span className="ray24-step-pill-tag">STEP 1 OF 5 • REAL-WORLD EXAMPLE</span>
                  <h2 className="ray24-step-main-title">REAL-WORLD LIGHTHOUSE</h2>
                  <p className="ray24-step-subtitle-text">
                    A ray starts at one point and continues in one direction.
                  </p>
                </div>

                <div className="ray24-pedagogy-body">
                  <div className="ray24-section-card-block">
                    <span className="ray24-block-label">OBSERVE</span>
                    <p className="ray24-observe-text">
                      A lighthouse shines light towards the sea.
                    </p>
                  </div>

                  <div className="ray24-section-card-block accent-warm">
                    <span className="ray24-block-label">REMEMBER</span>
                    <ul className="ray24-bullets-list">
                      <li>
                        <strong className="ray24-hl-bold">Point A</strong> is the <span className="ray24-hl-yellow">starting point</span>.
                      </li>
                      <li>
                        The <strong className="ray24-hl-orange">arrow</strong> shows the direction of the ray.
                      </li>
                      <li>
                        A ray continues <span className="ray24-hl-yellow">endlessly</span> in one direction.
                      </li>
                    </ul>
                  </div>

                  {/* Interactive Controls */}
                  <div className="ray24-control-group">
                    <div className="ray24-control-row">
                      <span>Lighthouse Beam</span>
                      <span style={{ color: lighthouseBeamOn ? '#D97706' : '#64748B' }}>
                        {lighthouseBeamOn ? 'LIGHT ON' : 'LIGHT OFF'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound('torch');
                        setLighthouseBeamOn(!lighthouseBeamOn);
                      }}
                      className={`ray24-btn-toggle ${lighthouseBeamOn ? 'active' : ''}`}
                    >
                      <Lightbulb size={18} />
                      <span>{lighthouseBeamOn ? 'Turn Beam OFF' : 'Turn Beam ON'}</span>
                    </button>

                    <div className="ray24-control-row" style={{ marginTop: '6px' }}>
                      <span>Rotate Beam</span>
                      <span>{lighthouseAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={lighthouseAngle}
                      onChange={(e) => setLighthouseAngle(Number(e.target.value))}
                      className="ray24-slider"
                    />
                  </div>
                </div>
              </div>

              <div className="ray24-takeaway-banner">
                <CheckCircle2 size={22} color="#16A34A" />
                <span><strong>Key Rule:</strong> A ray has <strong>1 fixed starting point</strong> and extends forever in 1 direction.</span>
              </div>
            </div>
          </>
        )}

        {/* ────────────────── STEP 2: TORCH LIGHT EXPERIMENT ────────────────── */}
        {currentStep === 2 && (
          <>
            {/* Left 63% Viewport: Torch HD Image with Point A and Point P */}
            <div className="ray24-visual-viewport">
              <img
                src="/assets/maths/class6/chapter2/ray_torch_hd.jpg"
                alt="Realistic Torch emitting a straight beam of light"
                className="ray24-media-img"
              />

              <svg className="ray24-svg-overlay" viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                  <marker
                    id="arrowCyan2"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="9"
                    markerHeight="9"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#38BDF8" />
                  </marker>
                </defs>

                {torchBeamOn && (
                  <>
                    {/* Ray centerline from Torch Head (Point A at 404, 312) to End (970, 312) */}
                    <line
                      x1="404"
                      y1="312"
                      x2="970"
                      y2="312"
                      stroke="#38BDF8"
                      strokeWidth="4.5"
                      strokeDasharray="6 4"
                      markerEnd="url(#arrowCyan2)"
                    />

                    {/* Point A at Torch Head */}
                    <circle cx="404" cy="312" r="16" fill="rgba(56, 189, 248, 0.35)" />
                    <circle cx="404" cy="312" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />

                    <g transform="translate(360, 258)">
                      <rect x="0" y="0" width="88" height="30" rx="6" fill="#0F172A" fillOpacity="0.92" />
                      <text x="44" y="20" fill="#7DD3FC" fontSize="15" fontWeight="900" textAnchor="middle">
                        Point A
                      </text>
                    </g>

                    {/* Point P along the beam */}
                    {(() => {
                      const px = 404 + ((940 - 404) * (pointPPos / 100));
                      return (
                        <g>
                          <circle cx={px} cy="312" r="15" fill="rgba(245, 158, 11, 0.35)" />
                          <circle cx={px} cy="312" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
                          <g transform={`translate(${px - 36}, 258)`}>
                            <rect x="0" y="0" width="72" height="30" rx="6" fill="#0F172A" fillOpacity="0.92" />
                            <text x="36" y="20" fill="#FDE68A" fontSize="15" fontWeight="900" textAnchor="middle">
                              Point P
                            </text>
                          </g>
                        </g>
                      );
                    })()}

                    {/* Arrow extends beyond P label */}
                    <g transform="translate(860, 266)">
                      <rect x="0" y="0" width="105" height="28" rx="6" fill="#0F172A" fillOpacity="0.92" />
                      <text x="52" y="19" fill="#38BDF8" fontSize="13" fontWeight="900" textAnchor="middle">
                        Extends Past P ⟶
                      </text>
                    </g>
                  </>
                )}
              </svg>
            </div>

            {/* Right 37% Sidebar: Short, Bold Bullet Explanations */}
            <div className="ray24-content-sidebar">
              <div>
                <div className="ray24-step-header-area">
                  <span className="ray24-step-pill-tag">STEP 2 OF 5 • EXPERIMENT</span>
                  <h2 className="ray24-step-main-title">TORCH LIGHT EXPERIMENT</h2>
                  <p className="ray24-step-subtitle-text">
                    A straight beam of light starts at the torch and travels outward.
                  </p>
                </div>

                <div className="ray24-pedagogy-body">
                  <div className="ray24-section-card-block">
                    <span className="ray24-block-label">OBSERVE</span>
                    <p className="ray24-observe-text">
                      Switch on the torch to trace the path of the light beam.
                    </p>
                  </div>

                  <div className="ray24-section-card-block accent-warm">
                    <span className="ray24-block-label">REMEMBER</span>
                    <ul className="ray24-bullets-list">
                      <li>
                        <strong className="ray24-hl-bold">Point A</strong> is the <span className="ray24-hl-yellow">fixed starting point</span> at the torch bulb.
                      </li>
                      <li>
                        <strong className="ray24-hl-bold">Point P</strong> is a point along the beam of light.
                      </li>
                      <li>
                        The light <span className="ray24-hl-yellow">does not stop at P</span>—it continues endlessly beyond P!
                      </li>
                    </ul>
                  </div>

                  {/* Interactive Controls */}
                  <div className="ray24-control-group">
                    <div className="ray24-control-row">
                      <span>Torch Flashlight</span>
                      <span style={{ color: torchBeamOn ? '#0284C7' : '#64748B' }}>
                        {torchBeamOn ? 'BEAM ACTIVE' : 'OFF'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound('torch');
                        setTorchBeamOn(!torchBeamOn);
                      }}
                      className={`ray24-btn-toggle ${torchBeamOn ? 'active' : ''}`}
                    >
                      <Flame size={18} />
                      <span>{torchBeamOn ? 'Turn Torch OFF' : 'Turn Torch ON'}</span>
                    </button>

                    <div className="ray24-control-row" style={{ marginTop: '6px' }}>
                      <span>Move Point P Along Beam</span>
                      <span>{pointPPos}%</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="85"
                      value={pointPPos}
                      onChange={(e) => setPointPPos(Number(e.target.value))}
                      className="ray24-slider"
                    />
                  </div>
                </div>
              </div>

              <div className="ray24-takeaway-banner">
                <CheckCircle2 size={22} color="#16A34A" />
                <span><strong>Key Rule:</strong> A ray passes through points like <strong>P</strong> without stopping!</span>
              </div>
            </div>
          </>
        )}

        {/* ────────── STEP 3: TRANSFORM INTO MATHEMATICAL DIAGRAM ────────── */}
        {currentStep === 3 && (
          <>
            {/* Left 63% Viewport: Morph from Torch to Blueprint Diagram */}
            <div className="ray24-visual-viewport blueprint-mode">
              <img
                src="/assets/maths/class6/chapter2/ray_torch_hd.jpg"
                alt="Torch fading into geometric ray"
                className="ray24-media-img"
                style={{
                  opacity: Math.max(0, (100 - diagramTransition) / 100),
                  filter: 'grayscale(70%) brightness(0.55)',
                  transition: 'opacity 0.15s ease'
                }}
              />

              <svg className="ray24-svg-overlay" viewBox="0 0 1000 600">
                <defs>
                  <marker
                    id="mathArrow3"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#D97706" />
                  </marker>
                </defs>

                {/* Blueprint grid lines */}
                <g opacity={(diagramTransition / 100) * 0.35} stroke="#38BDF8" strokeWidth="1">
                  <line x1="120" y1="180" x2="880" y2="180" strokeDasharray="4 6" />
                  <line x1="120" y1="300" x2="880" y2="300" strokeDasharray="4 6" />
                  <line x1="120" y1="420" x2="880" y2="420" strokeDasharray="4 6" />
                </g>

                {/* The Pure Geometric Ray AP */}
                <g>
                  <line
                    x1="220"
                    y1="300"
                    x2="880"
                    y2="300"
                    stroke="#F59E0B"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    markerEnd="url(#mathArrow3)"
                  />

                  {/* Fixed Starting Point A */}
                  <circle cx="220" cy="300" r="11" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
                  <text x="220" y="345" fill="#FFFFFF" fontSize="24" fontWeight="900" textAnchor="middle">
                    A
                  </text>
                  <text x="220" y="372" fill="#FDE68A" fontSize="14" fontWeight="800" textAnchor="middle">
                    (Fixed Starting Point)
                  </text>

                  {/* Point P on Ray */}
                  <circle cx="560" cy="300" r="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
                  <text x="560" y="345" fill="#FFFFFF" fontSize="24" fontWeight="900" textAnchor="middle">
                    P
                  </text>
                  <text x="560" y="372" fill="#93C5FD" fontSize="14" fontWeight="800" textAnchor="middle">
                    (Point on Ray)
                  </text>

                  {/* Extending Arrow Label */}
                  <g transform="translate(895, 290)">
                    <text x="0" y="16" fill="#F59E0B" fontSize="15" fontWeight="900">
                      Extends Endlessly ⟶
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Right 37% Sidebar: Notation & Definition */}
            <div className="ray24-content-sidebar">
              <div>
                <div className="ray24-step-header-area">
                  <span className="ray24-step-pill-tag">STEP 3 OF 5 • MATHEMATICAL DIAGRAM</span>
                  <h2 className="ray24-step-main-title">MATHEMATICAL DIAGRAM</h2>
                  <p className="ray24-step-subtitle-text">
                    Transition from real light to clean geometric ray AP.
                  </p>
                </div>

                <div className="ray24-pedagogy-body">
                  {/* Clean Notation Box */}
                  <div className="ray24-notation-box">
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#92400E', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        MATHEMATICAL NOTATION
                      </span>
                      <div className="ray24-symbol-large">
                        <span className="arrow-top">⟶</span>
                        <span>AP</span>
                      </div>
                    </div>
                    <div style={{ maxWidth: '170px' }}>
                      <p style={{ margin: 0, fontSize: '0.96rem', fontWeight: 700, color: '#1E293B' }}>
                        Read as <strong>"Ray AP"</strong>. Arrow begins over <strong>A</strong> and points over <strong>P</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="ray24-section-card-block accent-warm">
                    <span className="ray24-block-label">DEFINITION</span>
                    <p style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: '#78350F', lineHeight: '1.4' }}>
                      "A ray starts at one fixed point and extends endlessly in one direction."
                    </p>
                    <ul className="ray24-bullets-list">
                      <li>
                        <strong className="ray24-hl-bold">Point A</strong> is the <span className="ray24-hl-yellow">fixed starting point</span>.
                      </li>
                      <li>
                        <strong className="ray24-hl-bold">Point P</strong> is a point along the ray.
                      </li>
                      <li>
                        The <strong className="ray24-hl-orange">single arrow</strong> shows endless extension past P.
                      </li>
                    </ul>
                  </div>

                  {/* Transition Slider */}
                  <div className="ray24-control-group">
                    <div className="ray24-control-row">
                      <span>Real Torch</span>
                      <span>Geometric Ray</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={diagramTransition}
                      onChange={(e) => setDiagramTransition(Number(e.target.value))}
                      className="ray24-slider"
                    />
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#64748B', textAlign: 'center' }}>
                      Slide to compare the physical light beam with its geometric diagram.
                    </span>
                  </div>
                </div>
              </div>

              <div className="ray24-takeaway-banner">
                <CheckCircle2 size={22} color="#16A34A" />
                <span>In notation <strong>AP⟶</strong>, the first letter is always the starting point!</span>
              </div>
            </div>
          </>
        )}

        {/* ───────────── STEP 4: INTERACTIVE RAY BUILDER ───────────── */}
        {currentStep === 4 && (
          <>
            {/* Left 63% Viewport: Full-height 360° Ray Construction Canvas */}
            <div className="ray24-visual-viewport blueprint-mode">
              <svg
                className="ray24-svg-overlay"
                viewBox="0 0 1000 600"
                style={{ cursor: isAiming ? 'crosshair' : 'default' }}
                onMouseDown={() => setIsAiming(true)}
                onMouseUp={() => setIsAiming(false)}
                onMouseMove={(e) => {
                  if (!isAiming) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = ((e.clientX - rect.left) / rect.width) * 1000;
                  const mouseY = ((e.clientY - rect.top) / rect.height) * 600;
                  const dx = mouseX - builderOrigin.x;
                  const dy = mouseY - builderOrigin.y;
                  let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
                  setBuilderAngle(Math.round(deg));
                }}
              >
                <defs>
                  <marker
                    id="builderArrow4"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="10"
                    markerHeight="10"
                    orient="auto"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#F59E0B" />
                  </marker>
                </defs>

                {/* 360° Guide Circle */}
                <circle cx={builderOrigin.x} cy={builderOrigin.y} r="210" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeDasharray="6 6" />

                {(() => {
                  const rad = (builderAngle * Math.PI) / 180;
                  const rayLen = 640;
                  const endX = builderOrigin.x + Math.cos(rad) * rayLen;
                  const endY = builderOrigin.y + Math.sin(rad) * rayLen;

                  const px = builderOrigin.x + Math.cos(rad) * builderDistanceP;
                  const py = builderOrigin.y + Math.sin(rad) * builderDistanceP;

                  return (
                    <g>
                      {/* Active Ray Line with Arrow */}
                      <line
                        x1={builderOrigin.x}
                        y1={builderOrigin.y}
                        x2={endX}
                        y2={endY}
                        stroke="#F59E0B"
                        strokeWidth="5.5"
                        markerEnd="url(#builderArrow4)"
                      />

                      {/* Starting Point A */}
                      <circle cx={builderOrigin.x} cy={builderOrigin.y} r="16" fill="rgba(245, 158, 11, 0.35)" />
                      <circle cx={builderOrigin.x} cy={builderOrigin.y} r="10" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
                      <text x={builderOrigin.x - 26} y={builderOrigin.y - 20} fill="#FFFFFF" fontSize="24" fontWeight="900">
                        A
                      </text>

                      {/* Point P on the Ray */}
                      <circle cx={px} cy={py} r="14" fill="rgba(56, 189, 248, 0.35)" />
                      <circle cx={px} cy={py} r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
                      <text x={px + 14} y={py - 16} fill="#7DD3FC" fontSize="24" fontWeight="900">
                        P
                      </text>

                      {/* Angular Arc Preview */}
                      <path
                        d={`M ${builderOrigin.x + 60} ${builderOrigin.y} A 60 60 0 ${Math.abs(builderAngle) > 180 ? 1 : 0} ${builderAngle >= 0 ? 1 : 0} ${builderOrigin.x + Math.cos(rad) * 60} ${builderOrigin.y + Math.sin(rad) * 60}`}
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                      />
                    </g>
                  );
                })()}

                <text x="500" y="560" fill="#94A3B8" fontSize="15" fontWeight="700" textAnchor="middle">
                  Click or drag anywhere on the canvas, or use the angle slider to aim Ray AP!
                </text>
              </svg>
            </div>

            {/* Right 37% Sidebar: Construction Controls */}
            <div className="ray24-content-sidebar">
              <div>
                <div className="ray24-step-header-area">
                  <span className="ray24-step-pill-tag">STEP 4 OF 5 • WORKSHOP</span>
                  <h2 className="ray24-step-main-title">INTERACTIVE RAY BUILDER</h2>
                  <p className="ray24-step-subtitle-text">
                    Build and aim your own ray in any 360° direction.
                  </p>
                </div>

                <div className="ray24-pedagogy-body">
                  <div className="ray24-section-card-block">
                    <span className="ray24-block-label">OBSERVE</span>
                    <p className="ray24-observe-text">
                      Point A stays locked as the origin, while the ray extends infinitely through Point P.
                    </p>
                  </div>

                  {/* Live Construction Card */}
                  <div className="ray24-notation-box">
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#92400E', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        ACTIVE RAY
                      </span>
                      <div className="ray24-symbol-large">
                        <span className="arrow-top">⟶</span>
                        <span>AP</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 900, color: '#D97706' }}>
                        Angle: {builderAngle}°
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748B' }}>
                        Starts at A ⟶ Passes P
                      </span>
                    </div>
                  </div>

                  {/* Interactive Controls */}
                  <div className="ray24-control-group">
                    <div className="ray24-control-row">
                      <span>Rotate Direction</span>
                      <span style={{ color: '#D97706' }}>{builderAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={builderAngle}
                      onChange={(e) => setBuilderAngle(Number(e.target.value))}
                      className="ray24-slider"
                    />

                    <div className="ray24-control-row" style={{ marginTop: '6px' }}>
                      <span>Position of Point P</span>
                      <span>{builderDistanceP}px</span>
                    </div>
                    <input
                      type="range"
                      min="140"
                      max="360"
                      value={builderDistanceP}
                      onChange={(e) => setBuilderDistanceP(Number(e.target.value))}
                      className="ray24-slider"
                    />

                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => { sound('click'); setBuilderAngle(0); }}
                        className="ray24-btn-toggle"
                        style={{ flex: 1, padding: '7px 8px', fontSize: '0.88rem' }}
                      >
                        Horizontal (0°)
                      </button>
                      <button
                        onClick={() => { sound('click'); setBuilderAngle(-90); }}
                        className="ray24-btn-toggle"
                        style={{ flex: 1, padding: '7px 8px', fontSize: '0.88rem' }}
                      >
                        Upward (-90°)
                      </button>
                      <button
                        onClick={() => { sound('click'); setBuilderAngle(45); }}
                        className="ray24-btn-toggle"
                        style={{ flex: 1, padding: '7px 8px', fontSize: '0.88rem' }}
                      >
                        Slanted (45°)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ray24-takeaway-banner">
                <CheckCircle2 size={22} color="#16A34A" />
                <span>A ray can point in <strong>any direction</strong>—it always has exactly <strong>1 starting point</strong>!</span>
              </div>
            </div>
          </>
        )}

        {/* ───────────── STEP 5: RAY IDENTIFICATION ACTIVITY ───────────── */}
        {currentStep === 5 && (
          <>
            {/* Left 63% Viewport: Full-screen Vector Diagram Quiz */}
            <div className="ray24-visual-viewport blueprint-mode">
              <div className="ray24-quiz-container">
                <h3 className="ray24-quiz-prompt-title">
                  Which geometric figure is a <span style={{ color: '#F59E0B' }}>Ray</span>?
                </h3>
                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#CBD5E1', textAlign: 'center' }}>
                  Click the figure that starts at one fixed point and extends endlessly in one direction.
                </p>

                <div className="ray24-quiz-grid-fullscreen">
                  {/* Option A: Line Segment */}
                  <button
                    onClick={() => {
                      setSelectedOption('segment');
                      setHasAnswered(true);
                      sound('wrong');
                    }}
                    className={`ray24-quiz-card-btn ${selectedOption === 'segment' ? 'selected-wrong' : ''}`}
                    id="option-line-segment"
                  >
                    <span className="ray24-quiz-badge-tag">Figure 1</span>
                    <svg width="220" height="85" viewBox="0 0 220 85">
                      <line x1="35" y1="42" x2="185" y2="42" stroke="#475569" strokeWidth="4.5" />
                      <circle cx="35" cy="42" r="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
                      <circle cx="185" cy="42" r="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
                      <text x="35" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">A</text>
                      <text x="185" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">B</text>
                    </svg>
                    <strong style={{ fontSize: '1.05rem', color: '#0F172A' }}>Has 2 Endpoints</strong>
                  </button>

                  {/* Option B: Ray (CORRECT) */}
                  <button
                    onClick={() => {
                      setSelectedOption('ray');
                      setHasAnswered(true);
                      sound('correct');
                    }}
                    className={`ray24-quiz-card-btn ${selectedOption === 'ray' ? 'selected-correct' : ''}`}
                    id="option-ray"
                  >
                    <span className="ray24-quiz-badge-tag" style={{ background: '#FEF3C7', color: '#92400E' }}>Figure 2</span>
                    <svg width="220" height="85" viewBox="0 0 220 85">
                      <defs>
                        <marker id="quizArrow5" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="9" markerHeight="9" orient="auto">
                          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#D97706" />
                        </marker>
                      </defs>
                      <line x1="35" y1="42" x2="190" y2="42" stroke="#D97706" strokeWidth="4.5" markerEnd="url(#quizArrow5)" />
                      <circle cx="35" cy="42" r="8" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
                      <circle cx="130" cy="42" r="6" fill="#D97706" />
                      <text x="35" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">A</text>
                      <text x="130" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">P</text>
                    </svg>
                    <strong style={{ fontSize: '1.05rem', color: '#D97706' }}>1 Endpoint + 1 Arrow</strong>
                  </button>

                  {/* Option C: Line */}
                  <button
                    onClick={() => {
                      setSelectedOption('line');
                      setHasAnswered(true);
                      sound('wrong');
                    }}
                    className={`ray24-quiz-card-btn ${selectedOption === 'line' ? 'selected-wrong' : ''}`}
                    id="option-line"
                  >
                    <span className="ray24-quiz-badge-tag">Figure 3</span>
                    <svg width="220" height="85" viewBox="0 0 220 85">
                      <defs>
                        <marker id="qLineL" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                          <path d="M 10 1.5 L 1 5 L 10 8.5 z" fill="#475569" />
                        </marker>
                        <marker id="qLineR" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#475569" />
                        </marker>
                      </defs>
                      <line x1="25" y1="42" x2="195" y2="42" stroke="#475569" strokeWidth="4.5" markerStart="url(#qLineL)" markerEnd="url(#qLineR)" />
                      <circle cx="70" cy="42" r="6" fill="#475569" />
                      <circle cx="150" cy="42" r="6" fill="#475569" />
                      <text x="70" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">X</text>
                      <text x="150" y="74" fill="#0F172A" fontSize="17" fontWeight="900" textAnchor="middle">Y</text>
                    </svg>
                    <strong style={{ fontSize: '1.05rem', color: '#0F172A' }}>Arrows on Both Ends</strong>
                  </button>
                </div>

                {hasAnswered && (
                  <div style={{
                    width: '100%',
                    maxWidth: '860px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: selectedOption === 'ray' ? '#DCFCE7' : '#FEE2E2',
                    border: `2px solid ${selectedOption === 'ray' ? '#16A34A' : '#DC2626'}`,
                    color: selectedOption === 'ray' ? '#14532D' : '#7F1D1D'
                  }}>
                    {selectedOption === 'ray' ? (
                      <>
                        <CheckCircle2 size={26} color="#16A34A" />
                        <span><strong>Spot on! Figure 2 is Ray AP.</strong> It starts at point A and extends endlessly in one direction!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={26} color="#DC2626" />
                        <span>
                          {selectedOption === 'segment' 
                            ? 'Figure 1 has 2 fixed endpoints—that is a Line Segment.' 
                            : 'Figure 3 has 2 arrows—that is a Straight Line extending both ways.'}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right 37% Sidebar: Comparison Summary */}
            <div className="ray24-content-sidebar">
              <div>
                <div className="ray24-step-header-area">
                  <span className="ray24-step-pill-tag">STEP 5 OF 5 • COMPARISON</span>
                  <h2 className="ray24-step-main-title">RAY IDENTIFICATION</h2>
                  <p className="ray24-step-subtitle-text">
                    Master the differences between the three core geometric figures.
                  </p>
                </div>

                <div className="ray24-pedagogy-body">
                  <div className="ray24-section-card-block accent-warm">
                    <span className="ray24-block-label">GEOMETRIC COMPARISON</span>
                    <ul className="ray24-bullets-list">
                      <li>
                        <strong className="ray24-hl-bold">Line Segment:</strong> Has <span className="ray24-hl-yellow">2 fixed endpoints</span> and measurable length.
                      </li>
                      <li>
                        <strong className="ray24-hl-orange">Ray (⭐):</strong> Has <span className="ray24-hl-yellow">1 fixed starting point</span> and 1 arrow extending endlessly.
                      </li>
                      <li>
                        <strong className="ray24-hl-bold">Straight Line:</strong> Has <span className="ray24-hl-yellow">NO endpoints</span> and extends both ways.
                      </li>
                    </ul>
                  </div>

                  <div className="ray24-control-group">
                    <button
                      onClick={() => {
                        sound('correct');
                        setSelectedOption('ray');
                        setHasAnswered(true);
                      }}
                      className="ray24-btn-toggle active"
                    >
                      <Check size={18} />
                      <span>Highlight Correct Ray</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ray24-takeaway-banner">
                <CheckCircle2 size={22} color="#16A34A" />
                <span><strong>Congratulations!</strong> You have completed Section 2.4 Ray!</span>
              </div>
            </div>
          </>
        )}

      </main>

      {/* ════════════════════════ BOTTOM NAVIGATION (62px) ════════════════════════ */}
      <footer className="ray24-bottom-nav">
        <button
          onClick={() => {
            if (currentStep > 1) {
              sound('click');
              setCurrentStep(currentStep - 1);
            } else if (onBackTo2_3) {
              sound('click');
              onBackTo2_3();
            }
          }}
          className="ray24-nav-btn prev"
          id="ray24-prev-btn"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span>{currentStep === 1 ? 'Previous: 2.3 Line' : 'Previous Step'}</span>
        </button>

        <span className="ray24-step-status-indicator">
          Step {currentStep} of 5
        </span>

        <button
          onClick={() => {
            if (currentStep < 5) {
              sound('click');
              setCurrentStep(currentStep + 1);
            } else if (onNextSection) {
              sound('click');
              onNextSection();
            }
          }}
          className="ray24-nav-btn next"
          id="ray24-next-btn"
        >
          <span>{currentStep === 5 ? 'Next: 2.5 Angle' : 'Next Step'}</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </footer>

    </div>
  );
}
