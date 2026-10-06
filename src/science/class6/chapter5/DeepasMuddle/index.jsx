/* eslint-disable react/prop-types, no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { voiceService, ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './DeepasMuddle.css';

// Original high-resolution story assets
import scene1Img from '../../../../assets/ch5_scene1.jpg';
import scene2Img from '../../../../assets/ch5_scene2.jpg';
import scene3Img from '../../../../assets/ch5_scene3.jpg';
import scene4Img from '../../../../assets/ch5_scene4.jpg';

export default function DeepasMuddle({ onBackToDashboard, onComplete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [spokenCharIndex, setSpokenCharIndex] = useState(-1);

  const delayTimerRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  // 4 Curated Story Scenes faithfully reflecting the NCERT narrative
  const scenes = [
    {
      id: 1,
      title: "Deepa's New School Year",
      img: scene1Img,
      narration: "Deepa, a curious eleven-year-old girl, lives in Haryana. With the new school year starting, she needs a brand new uniform because she has grown taller!",
      dialogue: "My old uniform is too short now... time for a new one!",
      bottomText: "Deepa, a curious 11-year-old girl from Haryana, is getting ready for the new school year. Having grown taller, she needs a brand new school uniform!"
    },
    {
      id: 2,
      title: "At The Cloth Shop",
      img: scene2Img,
      narration: "Her mother takes her to a cloth shop and asks for a two-metre cloth piece. The shopkeeper carefully measures the cloth using a long metal measuring rod.",
      dialogue: "Two metres of uniform cloth, please!",
      bottomText: "Deepa's mother takes her to a cloth shop and asks for a two-metre cloth piece. The shopkeeper measures it accurately using a long metal measuring rod."
    },
    {
      id: 3,
      title: "Taking Measurements",
      img: scene3Img,
      narration: "Next, the tailor takes her measurements using a flexible measuring tape. Her mother instructs him to increase the uniform length by char angula (four fingers width).",
      dialogue: "Please increase the length by char angula (four fingers width).",
      bottomText: "The tailor takes Deepa's measurements with a flexible measuring tape. Her mother instructs him to increase the uniform's length by 'char angula' (four fingers width)."
    },
    {
      id: 4,
      title: "Classroom Discussion & Questions",
      img: scene4Img,
      narration: "In class, Deepa wonders: Are the tape and rod similar to the ruler in her geometry box? What did mother mean by char angula? She shares her questions with friends Anish, Hardeep, Padma, and Tasneem, sparking a lively discussion!",
      dialogue: "Why do we use different tools to measure length?",
      bottomText: "Are the tape and rod similar to the scale in a geometry box? What did mother mean by 'char angula'? Deepa discusses these questions with Anish, Hardeep, Padma, and Tasneem!"
    }
  ];

  // Stop any ongoing speech playback
  const stopSpeech = () => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    voiceService.stop();
    setIsPlaying(false);
    setSpokenCharIndex(-1);
  };

  // Play narration audio for the active scene with word-by-word karaoke synchronization
  const playSceneAudio = (pageIndex) => {
    stopSpeech();
    if (isCompleted || isMuted) return;

    const currentScene = scenes[pageIndex - 1];
    if (!currentScene) return;

    setIsPlaying(true);
    setActiveLineIndex(0);
    setSpokenCharIndex(-1);

    const speechText = currentScene.bottomText;

    voiceService.speak({
      text: speechText,
      role: 'teacher',
      voiceId: ELEVENLABS_VOICES.indian_male_teacher || ELEVENLABS_VOICES.teacher,
      onBoundary: (charIndex) => {
        setSpokenCharIndex(charIndex);
      },
      onEnd: () => {
        setIsPlaying(false);
        setSpokenCharIndex(-1);
      },
      onError: () => {
        setIsPlaying(false);
        setSpokenCharIndex(-1);
      }
    });
  };

  // Page navigation & audio triggers
  useEffect(() => {
    if (isCompleted) {
      stopSpeech();
      return;
    }

    // Trigger smooth narration with brief delay upon page transition
    delayTimerRef.current = setTimeout(() => {
      if (!isCompleted && !isMuted) {
        playSceneAudio(currentPage);
      }
    }, 600);

    return () => {
      stopSpeech();
    };
  }, [currentPage, isMuted, isCompleted]);

  const handleNext = () => {
    stopSpeech();
    if (currentPage < scenes.length) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    stopSpeech();
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handleFinish = () => {
    stopSpeech();
    setIsCompleted(true);
  };

  const toggleMute = () => {
    if (isPlaying || !isMuted) {
      stopSpeech();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      playSceneAudio(currentPage);
    }
  };

  // Word-by-word karaoke text renderer (Light theme: Dark Slate text with Radiant Amber highlight)
  const renderKaraokeText = (text, charIndex) => {
    if (!text) return null;
    const words = text.split(' ');
    let currentPos = 0;

    return words.map((word, i) => {
      const startPos = currentPos;
      const endPos = currentPos + word.length;
      const nextPos = endPos + 1;
      currentPos = nextPos;

      const isCurrentWord = isPlaying && charIndex >= startPos && charIndex < nextPos;
      const isPastWord = isPlaying && charIndex >= nextPos;

      let color = '#1E293B';
      let fontWeight = 800;
      let textShadow = 'none';

      if (isCurrentWord) {
        color = '#D97706'; // Warm Radiant Amber Highlight
        fontWeight = 900;
        textShadow = '0 0 1px rgba(217, 119, 6, 0.4)';
      } else if (isPastWord) {
        color = '#0F172A'; // Deep Slate for spoken words
        fontWeight = 850;
      }

      return (
        <React.Fragment key={i}>
          <span
            style={{
              color,
              fontWeight,
              textShadow,
              transition: 'color 0.12s ease'
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  const currentScene = scenes[currentPage - 1];

  return (
    <div className="deepa-story-viewport">
      {/* Dynamic Ambient Background Vectors */}
      <svg
        className="deepa-ambient-lines"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 450 C 200 120, 500 120, 720 450 C 940 780, 1240 780, 1540 450"
          stroke="rgba(245, 158, 11, 0.15)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M-100 450 C 200 220, 500 220, 720 450 C 940 680, 1240 680, 1540 450"
          stroke="rgba(56, 189, 248, 0.12)"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>

      {/* Top Header Bar: Story Progress & Audio Controls */}
      <header className="deepa-top-header">
        {/* Left: Progress Badge */}
        <div className="deepa-header-badge">
          <div className="deepa-page-pills">
            {scenes.map((s, idx) => (
              <div
                key={s.id}
                className={`deepa-page-dot ${
                  currentPage === idx + 1 ? 'active' : currentPage > idx + 1 ? 'completed' : ''
                }`}
                title={`Scene ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Audio / Voiceover Controls */}
        <div className="deepa-top-controls">
          <button
            onClick={() => playSceneAudio(currentPage)}
            className="deepa-control-btn"
            title="Replay Story Narration"
          >
            <RotateCcw size={18} />
            <span>Replay Audio</span>
          </button>

          <button
            onClick={toggleMute}
            className={`deepa-control-btn ${isMuted ? 'muted' : 'unmuted'}`}
            title={isMuted ? 'Unmute Story Voiceover' : 'Mute Story Voiceover'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isMuted ? 'Voice Muted' : 'Voice ON'}</span>
          </button>
        </div>
      </header>

      {/* Stage Wrapper displaying Full-Resolution Unaltered Image */}
      <div className="deepa-stage-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            className="deepa-image-frame"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src={currentScene.img}
              alt={currentScene.title}
              className="deepa-story-img"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ==========================================================================
          BOTTOM NARRATIVE CONTAINER — LIGHT THEME (Centered, Bold, Crisp & Clean)
          ========================================================================== */}
      <motion.div
        className="deepa-bottom-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Container Top Meta Row */}
        <div className="deepa-container-header">
          <div className="deepa-scene-title-wrapper">
            <span className="deepa-scene-index-badge">PAGE {currentPage} OF 4</span>
            <h2 className="deepa-scene-heading">{currentScene.title}</h2>
          </div>

          {isPlaying && (
            <div className="deepa-audio-playing-indicator">
              <div className="deepa-audio-wave">
                <span className="deepa-audio-bar" />
                <span className="deepa-audio-bar" />
                <span className="deepa-audio-bar" />
              </div>
              <span>Narrating...</span>
            </div>
          )}
        </div>

        {/* Narrative Text — Light Theme, Large, Bold & Concise with real-time word highlighting */}
        <p className="deepa-story-text">
          {renderKaraokeText(currentScene.bottomText, spokenCharIndex)}
        </p>

        {/* Navigation Action Buttons Row */}
        <div className="deepa-container-nav-row">
          <button
            onClick={handleBack}
            className="deepa-nav-btn"
            title={currentPage > 1 ? "Go to Previous Page" : "Back to Chapter 5 Flow"}
          >
            <ArrowLeft size={20} />
            <span>{currentPage > 1 ? 'Previous' : 'Back to Chart'}</span>
          </button>

          {currentPage < scenes.length ? (
            <button
              onClick={handleNext}
              className="deepa-nav-btn primary-btn"
              title="Proceed to Next Page"
            >
              <span>Next Page</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="deepa-nav-btn finish-btn"
              title="Finish Story & Open Activity"
            >
              <Sparkles size={20} />
              <span>Complete Story</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* ==========================================================================
          STORY COMPLETION MODAL
          ========================================================================== */}
      {isCompleted && (
        <div className="deepa-completion-overlay">
          <div className="deepa-completion-card">
            {/* Top Success Icon */}
            <div className="deepa-completion-icon">
              <CheckCircle2 size={44} color="#FFFFFF" strokeWidth={2.5} />
            </div>

            {/* Outlined Status Badge */}
            <div className="deepa-completion-badge">
              <span>✓</span> Story Completed
            </div>

            {/* Main Title */}
            <h2 className="deepa-completion-title">
              Deepa's Muddle Solved!
            </h2>

            {/* Subtext Description */}
            <p className="deepa-completion-desc">
              Deepa and her friends discovered that measuring length accurately requires standard units rather than body parts. Are you ready to explore handspan and standard measurement?
            </p>

            {/* Continue to Activity Button */}
            <button
              onClick={() => {
                if (onComplete) {
                  onComplete();
                } else if (onBackToDashboard) {
                  onBackToDashboard();
                }
              }}
              className="deepa-completion-cta"
            >
              <span>Continue to Activity 5.1</span>
              <ArrowRight size={22} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
