/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

import scene1Img from './assets/scene1_2.2.png';
import scene2Img from './assets/scene2_2.2.png';
import scene3Img from './assets/scene3_2.2.png';
import scene4Img from './assets/Scene4_2.2.png';
import scene5Img from './assets/scene5_2.2.png';
import scene6Img from './assets/scene6_2.2.png';

import voice1Audio from './assets/1_voice2.2.mp3';
import voice2Audio from './assets/2_voice2.2.mp3';
import voice3Audio from './assets/3_voice2.2.mp3';
import voice4Audio from './assets/4_voice2.2.mp3';
import voice5Audio from './assets/5_voice2.2.mp3';
import voice6Audio from './assets/6_voice2.2.mp3';

import './lineSegment.css';

/**
 * 6 Scene Assets with exact Audio and Subtitle mappings for Section 2.2 Line Segment
 */
const SCENES = [
  {
    id: 1,
    image: scene1Img,
    audio: voice1Audio,
    text: "Imagine you are standing at the school gate. You want to reach your classroom. How can you get there?",
    alt: "Scene 1: Standing at the school gate"
  },
  {
    id: 2,
    image: scene2Img,
    audio: voice2Audio,
    text: "There are different ways to reach the classroom. We can take a curved path, a zig-zag path, or a straight path. Which path do you think will take us there in the shortest way?",
    alt: "Scene 2: Curved, zig-zag, and straight paths"
  },
  {
    id: 3,
    image: scene3Img,
    audio: voice3Audio,
    text: "Look at these three paths from the school gate to the classroom. The curved path is longer, and the zig-zag path is also longer. The straight path takes the shortest route from the gate to the classroom.",
    alt: "Scene 3: Comparing the three paths"
  },
  {
    id: 4,
    image: scene4Img,
    audio: voice4Audio,
    text: "The straight path has two fixed endpoints. We call these endpoints A and B. The straight path connecting A and B is called a line segment.",
    alt: "Scene 4: Endpoints A and B defining a line segment"
  },
  {
    id: 5,
    image: scene5Img,
    audio: voice5Audio,
    text: "This straight path has two endpoints, A and B. The line segment starts at A and ends at B, and both endpoints are part of the line segment. We can name this line segment AB.",
    alt: "Scene 5: Naming the line segment AB"
  },
  {
    id: 6,
    image: scene6Img,
    audio: voice6Audio,
    text: "We can name the same line segment in two ways: AB or BA. Even though the order of the letters changes, both names represent the same line segment.",
    alt: "Scene 6: Naming as AB or BA"
  }
];

/**
 * 5-Question Assessment — Clean, text-focused, 4 options each
 */
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    number: 1,
    question: "Which path is the shortest from A to B?",
    options: [
      { id: 'curved', label: "Curved path" },
      { id: 'zigzag', label: "Zig-zag path" },
      { id: 'straight', label: "Straight path" },
      { id: 'none', label: "None of these" }
    ],
    correctId: 'straight',
    hint: "Think about which route connects the same two points without any extra turns or bends."
  },
  {
    id: 2,
    number: 2,
    question: "What are the endpoints of this line segment?",
    options: [
      { id: 'ab', label: "A and B" },
      { id: 'ac', label: "A and C" },
      { id: 'bc', label: "B and C" },
      { id: 'cd', label: "C and D" }
    ],
    correctId: 'ab',
    hint: "A line segment is determined by the two points where it begins and ends."
  },
  {
    id: 3,
    number: 3,
    question: "What makes the line segment AB different from the other paths?",
    options: [
      { id: 'no_endpoints', label: "It has no endpoints." },
      { id: 'shortest_path', label: "It is the shortest path from A to B." },
      { id: 'extends_forever', label: "It extends forever." },
      { id: 'one_endpoint', label: "It has only one endpoint." }
    ],
    correctId: 'shortest_path',
    hint: "Compare the length of the different routes between the same two points."
  },
  {
    id: 4,
    number: 4,
    question: "Which points are included in the line segment AB?",
    options: [
      { id: 'only_a', label: "Only A" },
      { id: 'only_b', label: "Only B" },
      { id: 'both_ab', label: "A and B" },
      { id: 'neither', label: "Neither A nor B" }
    ],
    correctId: 'both_ab',
    hint: "Look at both ends of the segment. The endpoints are part of the segment."
  },
  {
    id: 5,
    number: 5,
    question: "How can we name this line segment?",
    options: [
      { id: 'ab_only', label: "AB only" },
      { id: 'ba_only', label: "BA only" },
      { id: 'ab_or_ba', label: "AB or BA" },
      { id: 'a_or_b', label: "A or B" }
    ],
    correctId: 'ab_or_ba',
    hint: "The two endpoint letters can be written in either order when naming the same segment."
  }
];

/**
 * Subtle feedback tones using Web Audio API
 */
const playTone = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.26);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else if (type === 'wrong') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    }
  } catch {
    // AudioContext might be deferred until user gesture
  }
};

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT: SECTION 2.2 LINE SEGMENT
   ══════════════════════════════════════════════════════════════════════════════ */
export default function Section2_2LineSegment({ onBackToMap, onBack, onBackTo2_1, onNextSection }) {
  // viewMode: 'scenes' (Scenes 1-6) | 'assessment' (Questions 1-5) | 'complete'
  const [viewMode, setViewMode] = useState('scenes');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0); // 0 to 5
  const [questionIndex, setQuestionIndex] = useState(0); // 0 to 4
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  const audioRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  const totalScenes = SCENES.length;
  const currentScene = SCENES[currentSceneIndex];
  const isFirstScene = currentSceneIndex === 0;

  // Stop currently playing audio and start the audio for a given scene
  const playSceneAudio = useCallback((index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const scene = SCENES[index];
    if (!scene || !scene.audio) return;

    const newAudio = new Audio(scene.audio);
    audioRef.current = newAudio;

    const playPromise = newAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Autoplay deferred:', err);
      });
    }
  }, []);

  // When switching scene index: stop previous audio and play new audio
  useEffect(() => {
    if (viewMode === 'scenes') {
      playSceneAudio(currentSceneIndex);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [viewMode, currentSceneIndex, playSceneAudio]);

  // Clean up audio and timer on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // Clear auto-advance timer on question or mode change
  useEffect(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, [questionIndex, viewMode]);

  // Launch confetti upon reaching completion state
  useEffect(() => {
    if (viewMode === 'complete') {
      try {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#0284C7', '#38BDF8', '#10B981', '#F59E0B']
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [viewMode]);

  // Handle "Next" action across Scenes, Questions, and Completion
  const handleNext = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (viewMode === 'scenes') {
      if (currentSceneIndex < totalScenes - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
      } else {
        // After Scene 6: Enter 5-Question Assessment
        setViewMode('assessment');
        setQuestionIndex(0);
        setSelectedOptionId(null);
        setFeedback(null);
      }
    } else if (viewMode === 'assessment') {
      if (feedback === 'correct') {
        if (questionIndex < ASSESSMENT_QUESTIONS.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setSelectedOptionId(null);
          setFeedback(null);
        } else {
          // After Question 5: Show completion state
          setViewMode('complete');
        }
      }
    }
  }, [viewMode, currentSceneIndex, totalScenes, feedback, questionIndex]);

  // Handle "Prev" action across Scenes and Questions
  const handlePrev = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (viewMode === 'scenes') {
      if (currentSceneIndex > 0) {
        setCurrentSceneIndex((prev) => prev - 1);
      }
    } else if (viewMode === 'assessment') {
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setSelectedOptionId(null);
        setFeedback(null);
      } else {
        // Back to Scene 6 from Question 1
        setViewMode('scenes');
        setCurrentSceneIndex(totalScenes - 1);
      }
    } else if (viewMode === 'complete') {
      // Back to Question 5 from Completion
      setViewMode('assessment');
      setQuestionIndex(ASSESSMENT_QUESTIONS.length - 1);
      setSelectedOptionId(ASSESSMENT_QUESTIONS[ASSESSMENT_QUESTIONS.length - 1].correctId);
      setFeedback('correct');
    }
  }, [viewMode, currentSceneIndex, questionIndex, totalScenes]);

  const handleReturnToMap = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (onBackToMap) {
      onBackToMap();
    } else if (onBack) {
      onBack();
    }
  };

  const handleReturnTo2_1 = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (onBackTo2_1) {
      onBackTo2_1();
    } else {
      handleReturnToMap();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (viewMode === 'scenes') {
          handleNext();
        } else if (viewMode === 'assessment' && feedback === 'correct') {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (viewMode === 'scenes') {
          if (!isFirstScene) handlePrev();
        } else {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, viewMode, isFirstScene, feedback]);

  // Option selection handler in assessment
  const handleSelectOption = (optionId) => {
    setSelectedOptionId(optionId);
    const q = ASSESSMENT_QUESTIONS[questionIndex];

    if (optionId === q.correctId) {
      setFeedback('correct');
      playTone('correct');

      // Clear any prior timer
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }

      // Automatically proceed to the next question after a short, smooth transition
      autoAdvanceTimerRef.current = setTimeout(() => {
        if (questionIndex < ASSESSMENT_QUESTIONS.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setSelectedOptionId(null);
          setFeedback(null);
        } else {
          setViewMode('complete');
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      playTone('wrong');

      // Keep student on same question, do not auto-advance
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
    }
  };

  const currentQ = ASSESSMENT_QUESTIONS[questionIndex];
  const isCorrect = feedback === 'correct';

  /* ══════════════════════════════════════════════════════════════════════════════
     VIEW 1: SCENES 1–6 (LESSON NARRATION) — KEPT 100% INTACT
     ══════════════════════════════════════════════════════════════════════════════ */
  if (viewMode === 'scenes') {
    return (
      <div
        className="lineseg-root-container"
        id="section-2-2-line-segment-fullscreen"
      >
        {/* Top-Left: "Back to 2.1" */}
        <button
          onClick={handleReturnTo2_1}
          className="lineseg-top-nav-btn lineseg-top-left-btn"
          id="lineseg-back-to-2-1-btn"
          title="Return to Section 2.1 Point"
        >
          ← Back to 2.1
        </button>

        {/* Top-Center: "Back to Map" */}
        <button
          onClick={handleReturnToMap}
          className="lineseg-top-map-btn"
          id="lineseg-back-to-map-btn"
          title="Return to Chapter 2 V1 Map"
        >
          Back to Map
        </button>

        {/* Main Area: Full Available Screen Lesson Image (100vw) */}
        <main className="lineseg-stage-main">
          <div className="lineseg-image-frame">
            <img
              key={currentScene.id}
              src={currentScene.image}
              alt={currentScene.alt}
              className="lineseg-scene-img"
            />
          </div>

          {/* Plain Lesson Text Directly Below Image */}
          <div className="lineseg-text-container" id="lineseg-caption-box">
            <p className="lineseg-lesson-text">
              {currentScene.text}
            </p>
          </div>
        </main>

        {/* Bottom-Left: ← */}
        <div className="lineseg-corner-btn-prev">
          <button
            onClick={handlePrev}
            disabled={isFirstScene}
            className="lineseg-nav-btn secondary"
            id="lineseg-prev-btn"
            title="Previous Scene"
            aria-label="Previous"
          >
            ←
          </button>
        </div>

        {/* Bottom-Right: → (Clicking on Scene 6 starts assessment) */}
        <div className="lineseg-corner-btn-next">
          <button
            onClick={handleNext}
            className={`lineseg-nav-btn primary ${currentSceneIndex === totalScenes - 1 ? 'ready-assessment' : ''}`}
            id="lineseg-next-btn"
            title={currentSceneIndex === totalScenes - 1 ? "Start Assessment" : "Next Scene"}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════════
     VIEW 2: FINAL COMPLETION STATE ("2.2 LINE SEGMENT COMPLETED")
     ══════════════════════════════════════════════════════════════════════════════ */
  if (viewMode === 'complete') {
    return (
      <div className="lineseg-app-fullscreen-root lineseg-assessment-theme" id="lineseg-completion-screen">
        <div className="lineseg-desk-surface" />

        {/* Top Header — Clean, only "Back to Map" */}
        <header className="lineseg-assessment-topbar">
          <div className="lineseg-topbar-left">
            <button
              onClick={handleReturnToMap}
              className="lineseg-clean-pill-btn"
              title="Return to Chapter 2 Map"
            >
              <span>Back to Map</span>
            </button>
          </div>

          <div className="lineseg-topbar-center">
            <h1 className="lineseg-topbar-title">2.2 — Line Segment</h1>
          </div>

          <div className="lineseg-topbar-right">
            <span className="lineseg-simple-completed-badge">
              ✓ Completed
            </span>
          </div>
        </header>

        {/* Clean, Simple Completion Card */}
        <main className="lineseg-stage-container">
          <div className="lineseg-simple-completion-card">
            <div className="lineseg-simple-check-wrap">
              <CheckCircle2 size={56} className="lineseg-simple-check-icon" />
            </div>

            <h2 className="lineseg-simple-completion-title">
              2.2 LINE SEGMENT COMPLETED
            </h2>

            <div className="lineseg-simple-completed-indicator">
              ✓ Completed
            </div>

            <div className="lineseg-simple-action-row">
              <button
                className="lineseg-btn-secondary"
                onClick={() => {
                  setViewMode('assessment');
                  setQuestionIndex(0);
                  setSelectedOptionId(null);
                  setFeedback(null);
                }}
              >
                <RotateCcw size={16} />
                <span>Restart Assessment</span>
              </button>

              {onNextSection && (
                <button
                  className="lineseg-btn-primary"
                  onClick={onNextSection}
                >
                  <span>Next Section: 2.3 Line</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════════
     VIEW 3: SIMPLIFIED 5-QUESTION ASSESSMENT SECTION
     - Top-left header: Only "Back to Map" (Back to 2.1 completely removed)
     - Question card contains ONLY:
       1. Question
       2. Answer options
       3. Correct/wrong feedback or hint when needed
     - No Next button inside the card (no empty space left)
     - Automatic transition to next question after correct answer
     - Bottom-left (←) and bottom-right (→) arrows kept outside the card
     ══════════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="lineseg-app-fullscreen-root lineseg-assessment-theme" id="lineseg-assessment-screen">
      <div className="lineseg-desk-surface" />

      {/* Top Header — Only "Back to Map", no "Back to 2.1" */}
      <header className="lineseg-assessment-topbar">
        <div className="lineseg-topbar-left">
          <button
            onClick={handleReturnToMap}
            className="lineseg-clean-pill-btn"
            id="lineseg-assessment-back-map"
            title="Return to Chapter 2 Map"
          >
            <span>Back to Map</span>
          </button>
        </div>

        <div className="lineseg-topbar-center">
          <h1 className="lineseg-topbar-title">2.2 — Line Segment Assessment</h1>
        </div>

        <div className="lineseg-topbar-right">
          <span className="lineseg-q-count-text">
            Question {currentQ.number} of {ASSESSMENT_QUESTIONS.length}
          </span>
        </div>
      </header>

      {/* Main Spacious Question Card */}
      <main className="lineseg-stage-container">
        <div className="lineseg-clean-q-card" key={currentQ.id}>
          {/* Question Text */}
          <h2 className="lineseg-clean-q-title">
            {currentQ.question}
          </h2>

          {/* 4 Answer Options */}
          <div className="lineseg-clean-options-grid">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOptionId === opt.id;
              const isWrong = isSelected && feedback === 'wrong';
              const isOptionCorrect = (isSelected && feedback === 'correct') || (isCorrect && opt.id === currentQ.correctId);
              const letterBadge = ['A', 'B', 'C', 'D'][optIdx];

              return (
                <button
                  key={opt.id}
                  className={`lineseg-clean-option-btn ${isOptionCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isCorrect}
                  aria-label={`Option ${letterBadge}: ${opt.label}`}
                >
                  <span className="lineseg-clean-opt-letter">{letterBadge}</span>
                  <span className="lineseg-clean-opt-label">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Area: Hint on wrong, subtle confirmation on correct */}
          {feedback === 'wrong' && (
            <div className="lineseg-clean-hint-box">
              <span className="lineseg-clean-hint-label">Hint:</span>
              <span className="lineseg-clean-hint-text">{currentQ.hint}</span>
            </div>
          )}

          {feedback === 'correct' && (
            <div className="lineseg-clean-correct-box">
              <span className="lineseg-clean-correct-tag">✓ Correct</span>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Corner Navigation Buttons (Outside Question Card) */}
      <div className="lineseg-corner-btn-prev">
        <button
          onClick={handlePrev}
          className="lineseg-nav-btn secondary"
          id="lineseg-assessment-prev-btn"
          title={questionIndex === 0 ? "Back to Scene 6" : "Previous Question"}
          aria-label="Previous"
        >
          ←
        </button>
      </div>

      <div className="lineseg-corner-btn-next">
        <button
          onClick={handleNext}
          disabled={!isCorrect}
          className={`lineseg-nav-btn primary ${isCorrect ? 'enabled-glow' : ''}`}
          id="lineseg-assessment-next-btn"
          title={
            !isCorrect
              ? "Select the correct option to continue"
              : questionIndex === ASSESSMENT_QUESTIONS.length - 1
              ? "Finish Assessment"
              : "Next Question"
          }
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}
