/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Check 
} from 'lucide-react';
import scene1Img from './assets/2.3_1.png';
import scene2Img from './assets/2.3_2.png';
import scene3Img from './assets/2.3_3.png';
import scene1Audio from './assets/2.3_1audio.mp3';
import scene2Audio from './assets/2.3_2audio.mp3';
import scene3Audio from './assets/2.3_3audio.mp3';
import './line.css';

/**
 * SECTION 2.3 — LINE
 * Class 6 Mathematics · Discovery Learning Experience
 * Sequential 3-Scene Story followed by the Interactive Line Discovery Activity.
 */

/**
 * 3 Sequential Story Scenes for Section 2.3 Line
 * Assets: 2.3_1, 2.3_2, 2.3_3
 * Audio: 2.3_1audio, 2.3_2audio, 2.3_3audio
 */
const STORY_SCENES = [
  {
    id: 1,
    image: scene1Img,
    audio: scene1Audio,
    text: "Look at the wide open sky. Now, imagine a perfectly straight path stretching across it. We can imagine this path continuing further and further in both directions.",
    alt: "Scene 1: Wide open sky with a straight path",
  },
  {
    id: 2,
    image: scene2Img,
    audio: scene2Audio,
    text: "Now imagine the path continuing to the left and to the right. It keeps extending in both directions. Can you find where this path ends? We cannot find an end because we are imagining it continuing without stopping.",
    alt: "Scene 2: Path continuing to the left and to the right",
  },
  {
    id: 3,
    image: scene3Img,
    audio: scene3Audio,
    text: "In mathematics, we use this idea to understand a line. A line extends forever in both directions and has no endpoints. If we mark two points on the line as A and B, we can call it line AB. So, any two points determine one unique line.",
    alt: "Scene 3: Understanding a line in mathematics",
  },
];

// Synthesized Web Audio tones
const playEducationalTone = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'extend') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.32);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (type === 'correct') {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.11, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.3);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.3);
      });
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch {
    // Audio is non-blocking
  }
};

export default function Section2_3Line({ onBackToMap, onBack, onBackTo2_2, onNextSection }) {
  // Phase: 'story' (3-scene introductory story) | 'activity' (interactive line discovery)
  const [viewPhase, setViewPhase] = useState('story');
  const [storyScene, setStoryScene] = useState(1); // 1 | 2 | 3

  // Activity stage: 1 | 2 | 3 | 4 | 5 | 6
  const [currentStage, setCurrentStage] = useState(1);

  // Stage 4 discovery question selection: null | 'has_end' | 'no_end'
  const [stage4Answer, setStage4Answer] = useState(null);

  // Audio Reference for scene narration
  const audioRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const playStoryAudio = useCallback((sceneNum) => {
    stopAudio();

    const scene = STORY_SCENES[sceneNum - 1];
    if (!scene || !scene.audio) return;

    const newAudio = new Audio(scene.audio);
    audioRef.current = newAudio;

    const playPromise = newAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Audio autoplay deferred:', err);
      });
    }
  }, [stopAudio]);

  // Synchronize scene audio
  useEffect(() => {
    if (viewPhase === 'story') {
      playStoryAudio(storyScene);
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
    };
  }, [viewPhase, storyScene, playStoryAudio, stopAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Exit back to map
  const handleExit = () => {
    stopAudio();
    if (onBack) onBack();
    else if (onBackToMap) onBackToMap();
  };

  // Full reset back to Scene 1
  const handleReset = () => {
    stopAudio();
    playEducationalTone('click');
    setViewPhase('story');
    setStoryScene(1);
    setCurrentStage(1);
    setStage4Answer(null);
  };

  // Reset discovery activity only
  const handleResetActivity = () => {
    playEducationalTone('click');
    setCurrentStage(1);
    setStage4Answer(null);
  };

  // Story Navigation
  const handleStoryNext = useCallback(() => {
    playEducationalTone('click');
    if (storyScene === 1) {
      setStoryScene(2);
    } else if (storyScene === 2) {
      setStoryScene(3);
    } else if (storyScene === 3) {
      stopAudio();
      setViewPhase('activity');
      setCurrentStage(1);
    }
  }, [storyScene, stopAudio]);

  const handleStoryPrev = useCallback(() => {
    playEducationalTone('click');
    if (storyScene === 2) {
      setStoryScene(1);
    } else if (storyScene === 3) {
      setStoryScene(2);
    }
  }, [storyScene]);

  const handleBackTo2_2 = useCallback(() => {
    stopAudio();
    playEducationalTone('click');
    if (onBackTo2_2) {
      onBackTo2_2();
    } else {
      handleExit();
    }
  }, [onBackTo2_2, stopAudio]);

  // Interactive Stages Navigation (Back to Scene 3 from Stage 1, step-by-step between stages)
  const handleInteractivePrev = useCallback(() => {
    playEducationalTone('click');
    if (currentStage === 1) {
      setViewPhase('story');
      setStoryScene(3);
    } else {
      setCurrentStage((prev) => prev - 1);
    }
  }, [currentStage]);

  const handleInteractiveNext = useCallback(() => {
    playEducationalTone('click');
    if (currentStage < 6) {
      setCurrentStage((prev) => prev + 1);
    } else {
      if (onNextSection) {
        onNextSection();
      } else {
        handleExit();
      }
    }
  }, [currentStage, onNextSection]);

  // Keyboard navigation for story scenes and interactive stages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewPhase === 'story') {
        if (e.key === 'ArrowRight') {
          handleStoryNext();
        } else if (e.key === 'ArrowLeft') {
          if (storyScene > 1) {
            handleStoryPrev();
          } else {
            handleBackTo2_2();
          }
        }
      } else if (viewPhase === 'activity') {
        if (e.key === 'ArrowRight') {
          handleInteractiveNext();
        } else if (e.key === 'ArrowLeft') {
          handleInteractivePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewPhase, storyScene, handleStoryNext, handleStoryPrev, handleBackTo2_2, handleInteractiveNext, handleInteractivePrev]);

  // Activity Navigation (internal action steps)
  const handleNextStage = useCallback(() => {
    playEducationalTone('click');
    if (currentStage < 6) {
      setCurrentStage((prev) => prev + 1);
    }
  }, [currentStage]);

  // Stage 1 Action: Extend Beyond A
  const handleStage1ExtendA = () => {
    playEducationalTone('extend');
    setCurrentStage(2);
  };

  // Stage 2 Action: Extend Beyond B
  const handleStage2ExtendB = () => {
    playEducationalTone('extend');
    setCurrentStage(3);
  };

  // Stage 4 Action: Select Answer
  const handleSelectStage4 = (choice) => {
    setStage4Answer(choice);
    if (choice === 'no_end') {
      playEducationalTone('correct');
    } else {
      playEducationalTone('click');
    }
  };

  /* ══════════════════════════════════════════════════════════════════════════
     GEOMETRY COORDINATES (SVG ViewBox: 0 0 1000 240)
     Canvas Center Y = 120
     Point A: (340, 120)
     Point B: (660, 120)
     Left Arrow Tip: (60, 120)
     Right Arrow Tip: (940, 120)
     ══════════════════════════════════════════════════════════════════════════ */
  const ptAx = 340;
  const ptBx = 660;
  const ptY = 120;
  const leftTipX = 60;
  const rightTipX = 940;

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 1: 3-SCENE STORY SECTION (DEDICATED 90% VISUAL + 10% BOTTOM CONTROL AREA)
  // ══════════════════════════════════════════════════════════════════════════
  if (viewPhase === 'story') {
    const currentScene = STORY_SCENES[storyScene - 1];

    return (
      <div className="line23-story-root" id="ch2-v1-section-2_3-story">
        {/* TOP 90% — MAIN VISUAL / IMAGE AREA */}
        <section className="line23-story-visual-area">
          <div className="line23-story-image-frame">
            <img
              key={currentScene.id}
              src={currentScene.image}
              alt={currentScene.alt}
              className="line23-story-scene-img"
            />
          </div>
        </section>

        {/* BOTTOM 10% — DEDICATED UI / CONTROL AREA */}
        <footer className="line23-story-control-bar" id="line23-story-control-bar">
          {/* LEFT: Existing Back / Back to Map button */}
          <div className="line23-story-bar-left">
            <button
              onClick={storyScene === 1 ? handleBackTo2_2 : handleStoryPrev}
              className="line23-story-nav-btn secondary"
              id="line23-story-btn-prev"
              title={storyScene === 1 ? "Return to Section 2.2 Line Segment" : "Previous Scene"}
              aria-label="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
              <span>Back</span>
            </button>
          </div>

          {/* CENTER: Existing explanation / learning text */}
          <div className="line23-story-bar-center" id="line23-story-caption-box">
            <p className="line23-story-lesson-text">
              {currentScene.text}
            </p>
          </div>

          {/* RIGHT: Existing Next button */}
          <div className="line23-story-bar-right">
            <button
              onClick={handleStoryNext}
              className="line23-story-nav-btn primary"
              id="line23-story-btn-next"
              title={storyScene === 3 ? "Start Interactive Activity" : "Next Scene"}
              aria-label="Next"
            >
              <span>Next</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 2: EXISTING 2.3 LINE INTERACTIVE CONCEPT / ACTIVITY
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="line23-root-container" id="ch2-v1-section-2_3">
      {/* Background Blueprint Grid */}
      <div className="line23-blueprint-grid" />

      {/* ── TOP HEADER (Back and Restart controls remain accessible) ── */}
      <header className="line23-topbar">
        <div className="line23-topbar-left">
          <button
            onClick={handleExit}
            className="line23-back-btn"
            title="Back to Chapter 2 Sections"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="line23-title-wrap">
            <span className="line23-badge">CHAPTER 2 · LINES AND ANGLES</span>
            <h1 className="line23-section-name">2.3 — Line</h1>
          </div>
        </div>

        <div className="line23-topbar-right">
          <button
            onClick={handleReset}
            className="line23-restart-btn"
            title="Restart Lesson"
          >
            <RotateCcw size={16} />
            <span>Restart</span>
          </button>
        </div>
      </header>

      {/* ── FULL-SCREEN MAIN ACTIVITY (NO CARDS-IN-CARDS, USES FULL VIEWPORT) ── */}
      <main className="line23-fullscreen-main">

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 1 — START WITH TWO POINTS
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 1 && (
          <>
            {/* 1. Large Heading */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">Start with two points</h2>
              <p className="line23-stage-subtitle">Points A and B form a line segment</p>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Base Segment AB */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Point A (Endpoint) */}
                <circle cx={ptAx} cy={ptY} r="24" className="line23-point-halo" />
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0284C7" fontFamily="Space Grotesk, sans-serif">
                  Endpoint A
                </text>

                {/* Point B (Endpoint) */}
                <circle cx={ptBx} cy={ptY} r="24" className="line23-point-halo" />
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0284C7" fontFamily="Space Grotesk, sans-serif">
                  Endpoint B
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation */}
            <div className="line23-explanation-box">
              <p className="line23-explanation-text">
                Points A and B form a <strong style={{ color: '#0284C7' }}>line segment</strong>.
              </p>
            </div>

            {/* 4. Large Action Control */}
            <div className="line23-action-area">
              <button
                className="line23-action-btn-large"
                onClick={handleStage1ExtendA}
              >
                <span>Extend beyond A ←</span>
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 2 — EXTEND BEYOND A
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 2 && (
          <>
            {/* 1. Large Heading */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">The line extends beyond A</h2>
              <p className="line23-stage-subtitle">The path now continues past point A</p>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Left Extension with Arrow */}
                <line x1={ptAx} y1={ptY} x2={leftTipX} y2={ptY} className="line23-stroke-ext" />
                <path d={`M ${leftTipX + 20} ${ptY - 14} L ${leftTipX} ${ptY} L ${leftTipX + 20} ${ptY + 14}`} className="line23-arrowhead" />

                {/* Base Segment from A to B */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Point A */}
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point A
                </text>

                {/* Point B (Endpoint) */}
                <circle cx={ptBx} cy={ptY} r="24" className="line23-point-halo" />
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0284C7" fontFamily="Space Grotesk, sans-serif">
                  Endpoint B
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation */}
            <div className="line23-explanation-box">
              <p className="line23-explanation-text">
                Now extend the line beyond point B.
              </p>
            </div>

            {/* 4. Large Action Control */}
            <div className="line23-action-area">
              <button
                className="line23-action-btn-large"
                onClick={handleStage2ExtendB}
              >
                <span>Extend beyond B →</span>
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 3 — THE LINE EXTENDS BEYOND B
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 3 && (
          <>
            {/* 1. Large Heading & Subtitle */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">THE LINE EXTENDS BEYOND B</h2>
              <p className="line23-stage-subtitle">Growing in both directions</p>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Left Line & Arrow */}
                <line x1={ptAx} y1={ptY} x2={leftTipX} y2={ptY} className="line23-stroke-ext" />
                <path d={`M ${leftTipX + 20} ${ptY - 14} L ${leftTipX} ${ptY} L ${leftTipX + 20} ${ptY + 14}`} className="line23-arrowhead" />

                {/* Center Segment */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Right Line & Arrow */}
                <line x1={ptBx} y1={ptY} x2={rightTipX} y2={ptY} className="line23-stroke-ext" />
                <path d={`M ${rightTipX - 20} ${ptY - 14} L ${rightTipX} ${ptY} L ${rightTipX - 20} ${ptY + 14}`} className="line23-arrowhead" />

                {/* Point A */}
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point A
                </text>

                {/* Point B */}
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point B
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation */}
            <div className="line23-explanation-box">
              <p className="line23-explanation-text line23-explanation-highlight">
                The line has now been extended beyond both A and B.
              </p>
            </div>

            {/* 4. Large Action Control */}
            <div className="line23-action-area">
              <button
                className="line23-action-btn-large"
                onClick={handleNextStage}
              >
                <span>Proceed to Discovery Question</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 4 — DISCOVERY QUESTION
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 4 && (
          <>
            {/* 1. Large Heading */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">Can you find the end of this line?</h2>
              <p className="line23-stage-subtitle">Think carefully about what the arrows mean</p>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Left Line & Arrow */}
                <line x1={ptAx} y1={ptY} x2={leftTipX} y2={ptY} className="line23-stroke-center" />
                <g className={stage4Answer === 'no_end' ? "line23-pulse-arrows" : ""} style={{ transformOrigin: `${leftTipX}px ${ptY}px` }}>
                  <path d={`M ${leftTipX + 20} ${ptY - 14} L ${leftTipX} ${ptY} L ${leftTipX + 20} ${ptY + 14}`} className="line23-arrowhead" />
                </g>

                {/* Center Segment */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Right Line & Arrow */}
                <line x1={ptBx} y1={ptY} x2={rightTipX} y2={ptY} className="line23-stroke-center" />
                <g className={stage4Answer === 'no_end' ? "line23-pulse-arrows" : ""} style={{ transformOrigin: `${rightTipX}px ${ptY}px` }}>
                  <path d={`M ${rightTipX - 20} ${ptY - 14} L ${rightTipX} ${ptY} L ${rightTipX - 20} ${ptY + 14}`} className="line23-arrowhead" />
                </g>

                {/* Point A */}
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point A
                </text>

                {/* Point B */}
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point B
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation / Feedback */}
            <div className="line23-explanation-box">
              {stage4Answer === 'no_end' ? (
                <div className="line23-feedback-banner-large correct">
                  <Check size={22} strokeWidth={3} />
                  <span>Correct! A line has no endpoints. It extends forever in both directions.</span>
                </div>
              ) : stage4Answer === 'has_end' ? (
                <div className="line23-feedback-banner-large try-again">
                  <span>Look at the arrows! The arrows show that it never stops moving outward.</span>
                </div>
              ) : (
                <p className="line23-explanation-text">
                  Does this line have an end?
                </p>
              )}
            </div>

            {/* 4. Large Action Choices */}
            <div className="line23-action-area">
              <button
                className={`line23-choice-btn-large ${stage4Answer === 'has_end' ? 'selected-incorrect' : ''}`}
                onClick={() => handleSelectStage4('has_end')}
              >
                <span>Has an end</span>
              </button>

              <button
                className={`line23-choice-btn-large ${stage4Answer === 'no_end' ? 'selected-correct' : ''}`}
                onClick={() => handleSelectStage4('no_end')}
              >
                <span>No end</span>
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 5 — CONCEPT
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 5 && (
          <>
            {/* 1. Large Heading */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">A line extends forever in both directions.</h2>
              <span className="line23-highlight-badge">No endpoints</span>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Left Line & Arrow */}
                <line x1={ptAx} y1={ptY} x2={leftTipX} y2={ptY} className="line23-stroke-center" />
                <g className="line23-pulse-arrows" style={{ transformOrigin: `${leftTipX}px ${ptY}px` }}>
                  <path d={`M ${leftTipX + 20} ${ptY - 14} L ${leftTipX} ${ptY} L ${leftTipX + 20} ${ptY + 14}`} className="line23-arrowhead" />
                </g>

                {/* Center Segment */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Right Line & Arrow */}
                <line x1={ptBx} y1={ptY} x2={rightTipX} y2={ptY} className="line23-stroke-center" />
                <g className="line23-pulse-arrows" style={{ transformOrigin: `${rightTipX}px ${ptY}px` }}>
                  <path d={`M ${rightTipX - 20} ${ptY - 14} L ${rightTipX} ${ptY} L ${rightTipX - 20} ${ptY + 14}`} className="line23-arrowhead" />
                </g>

                {/* Point A */}
                <circle cx={ptAx} cy={ptY} r="24" className="line23-point-halo" />
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point A
                </text>

                {/* Point B */}
                <circle cx={ptBx} cy={ptY} r="24" className="line23-point-halo" />
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point B
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation */}
            <div className="line23-explanation-box">
              <p className="line23-explanation-text">
                A line has <strong>no endpoints</strong>. The two arrows signify that it continues endlessly in both opposite directions.
              </p>
            </div>

            {/* 4. Large Action Control */}
            <div className="line23-action-area">
              <button
                className="line23-action-btn-large"
                onClick={handleNextStage}
              >
                <span>Next: Name the Line</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STAGE 6 — NAME THE LINE
            ════════════════════════════════════════════════════════════════════ */}
        {currentStage === 6 && (
          <>
            {/* 1. Large Heading */}
            <div className="line23-stage-header">
              <h2 className="line23-stage-title">Line AB</h2>
              <p className="line23-stage-subtitle">Representing and Naming a Line</p>
            </div>

            {/* 2. Large Central Line Visual */}
            <div className="line23-visual-box">
              <svg className="line23-main-svg" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
                <line x1="30" y1={ptY} x2="970" y2={ptY} stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Left Line & Arrow */}
                <line x1={ptAx} y1={ptY} x2={leftTipX} y2={ptY} className="line23-stroke-center" />
                <path d={`M ${leftTipX + 20} ${ptY - 14} L ${leftTipX} ${ptY} L ${leftTipX + 20} ${ptY + 14}`} className="line23-arrowhead" />

                {/* Center Segment */}
                <line x1={ptAx} y1={ptY} x2={ptBx} y2={ptY} className="line23-stroke-center" />

                {/* Right Line & Arrow */}
                <line x1={ptBx} y1={ptY} x2={rightTipX} y2={ptY} className="line23-stroke-center" />
                <path d={`M ${rightTipX - 20} ${ptY - 14} L ${rightTipX} ${ptY} L ${rightTipX - 20} ${ptY + 14}`} className="line23-arrowhead" />

                {/* Point A */}
                <circle cx={ptAx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptAx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  A
                </text>
                <text x={ptAx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point A
                </text>

                {/* Point B */}
                <circle cx={ptBx} cy={ptY} r="12" className="line23-point-dot" />
                <text x={ptBx} y={ptY - 26} textAnchor="middle" fontSize="38" fontWeight="900" fill="#0F172A" fontFamily="Space Grotesk, sans-serif">
                  B
                </text>
                <text x={ptBx} y={ptY + 36} textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B" fontFamily="Space Grotesk, sans-serif">
                  Point B
                </text>

                {/* Lowercase letter name m below the line */}
                <text x="500" y={ptY + 54} textAnchor="middle" fontSize="34" fontStyle="italic" fontWeight="900" fill="#0284C7" fontFamily="Space Grotesk, serif">
                  m
                </text>
              </svg>
            </div>

            {/* 3. Large Bold Explanation & Notation */}
            <div className="line23-explanation-box">
              <div className="line23-notation-display">
                <span className="line23-notation-symbol">↔AB</span>
                <span className="line23-notation-name">or Line <em>m</em></span>
              </div>
              <p className="line23-explanation-text" style={{ marginTop: '6px' }}>
                <strong>Any two points determine one unique line.</strong>
              </p>
              <p style={{ fontSize: '1.05rem', color: '#64748B', margin: '2px 0 0 0', fontWeight: 600 }}>
                Sometimes a line is named using a letter, such as <strong>line m</strong>.
              </p>
            </div>

            {/* 4. Large Action Controls: Bottom-Left Restart, Bottom-Right Next Section */}
            <div className="line23-final-bottom-row">
              <button
                className="line23-choice-btn-large"
                onClick={handleResetActivity}
              >
                <RotateCcw size={18} />
                <span>Restart Discovery</span>
              </button>

              <button
                className="line23-action-btn-large"
                onClick={onNextSection || handleExit}
              >
                <span>Next Section: 2.4 Ray</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}
      </main>

      {/* ── BOTTOM CORNER NAVIGATION CONTROLS (STAGES 1–5 ONLY) ── */}
      {currentStage < 6 && (
        <footer className="line23-activity-nav-bar" id="line23-activity-nav-bar">
          <div className="line23-activity-nav-left">
            <button
              onClick={handleInteractivePrev}
              className="line23-story-nav-btn secondary"
              id="line23-activity-btn-back"
              title={currentStage === 1 ? "Back to Scene 3" : `Back to Step ${currentStage - 1}`}
              aria-label="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
              <span>Back</span>
            </button>
          </div>

          <div className="line23-activity-nav-right">
            <button
              onClick={handleInteractiveNext}
              className="line23-story-nav-btn primary"
              id="line23-activity-btn-next"
              title={`Next: Step ${currentStage + 1}`}
              aria-label="Next"
            >
              <span>Next</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
