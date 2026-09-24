import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import useWordSyncAudio from './narration/useWordSyncAudio';
import introNarrationData from './narration/introNarration.json';
import introNarrationAudio from './narration/audio/01_Intro-WelcomeToDiversity.mp3';

export default function Chapter2CoverPage({
  classNum = 6,
  subjectName = "CHAPTER 2 · BIOLOGY",
  chapterNum = 2,
  title = "Diversity in the Living World",
  topics = "Plants · Animals · Habitats · Adaptation · Classification",
  onBack,
  onNext,
  bgImage,
  bgVideo,
}) {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isCircleHovered, setIsCircleHovered] = useState(false);

  // Synchronized Audio & Word Highlight Hook
  const {
    isPlaying,
    activeWordIndex,
    currentTime,
    toggle,
    pause,
  } = useWordSyncAudio(introNarrationAudio, introNarrationData.intro.words, {
    autoPlay: false,
  });

  // Stop narration on unmount
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  // Active word checks for Title: "Diversity in the Living World"
  // Word indices in introNarrationData:
  // 2: Diversity (0.65 - 1.20s), also 21: diversity (9.55 - 10.15s)
  // 3: in (1.20 - 1.35s)
  // 4: the (1.35 - 1.45s)
  // 5: Living (1.45 - 1.75s), also 17: living (7.85 - 8.25s), 35: living (19.50 - 19.85s)
  // 6: World! (1.75 - 2.15s)
  const isDiversityActive = isPlaying && (activeWordIndex === 2 || activeWordIndex === 21 || (currentTime >= 0.65 && currentTime < 1.20) || (currentTime >= 9.55 && currentTime < 10.15));
  const isInActive = isPlaying && (activeWordIndex === 3 || (currentTime >= 1.20 && currentTime < 1.35));
  const isTheActive = isPlaying && (activeWordIndex === 4 || (currentTime >= 1.35 && currentTime < 1.45));
  const isLivingActive = isPlaying && (activeWordIndex === 5 || activeWordIndex === 17 || activeWordIndex === 35 || (currentTime >= 1.45 && currentTime < 1.75));
  const isWorldActive = isPlaying && (activeWordIndex === 6 || (currentTime >= 1.75 && currentTime < 2.15));

  // Active word checks for Subtitle: "Plants · Animals · Habitats · Adaptation · Classification"
  // 11: plants (4.50 - 4.95s)
  // 13: animals (5.40 - 5.95s)
  // 25: habitats (12.20 - 12.70s)
  // 27: adaptation (14.35 - 15.00s)
  // 31: classification (16.75 - 17.80s)
  const isPlantsActive = isPlaying && (activeWordIndex === 11 || (currentTime >= 4.45 && currentTime < 5.00));
  const isAnimalsActive = isPlaying && (activeWordIndex === 13 || (currentTime >= 5.35 && currentTime < 6.00));
  const isHabitatsActive = isPlaying && (activeWordIndex === 25 || (currentTime >= 12.15 && currentTime < 12.80));
  const isAdaptationActive = isPlaying && (activeWordIndex === 27 || (currentTime >= 14.30 && currentTime < 15.10));
  const isClassificationActive = isPlaying && (activeWordIndex === 31 || (currentTime >= 16.70 && currentTime < 17.85));

  // Active checks for Button: "Begin Chapter →"
  // 39: begin (22.40 - 22.75s)
  // 41: chapter (22.90 - 23.35s)
  // Whole phrase "Ready? Let's begin the chapter!": 21.05s - 23.50s
  const isButtonPhaseActive = isPlaying && (currentTime >= 21.05 && currentTime <= 23.60);
  const isBeginActive = isPlaying && (activeWordIndex === 39 || (currentTime >= 22.35 && currentTime < 22.85));
  const isChapterActive = isPlaying && (activeWordIndex === 41 || (currentTime >= 22.85 && currentTime <= 23.60));

  const subtitleTopics = [
    { label: 'Plants', isActive: isPlantsActive },
    { label: 'Animals', isActive: isAnimalsActive },
    { label: 'Habitats', isActive: isHabitatsActive },
    { label: 'Adaptation', isActive: isAdaptationActive },
    { label: 'Classification', isActive: isClassificationActive },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        color: '#e8ebff',
        background: bgImage
          ? `url(${bgImage}) no-repeat center center / cover`
          : bgVideo
          ? 'none'
          : 'radial-gradient(130% 120% at 75% 15%, #0d2015 0%, #060e0a 100%)',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Video */}
      {bgVideo && (
        <video disablePictureInPicture
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.95,
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      )}

      {/* Decorative CSS Styles */}
      <style>{`
        @keyframes subtlePulseGlow {
          0%, 100% {
            box-shadow: 0 0 16px rgba(52, 211, 153, 0.45), inset 0 0 10px rgba(52, 211, 153, 0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 28px rgba(52, 211, 153, 0.85), inset 0 0 14px rgba(52, 211, 153, 0.45);
            transform: scale(1.06);
          }
        }
        @keyframes buttonAuraPulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(245, 158, 11, 0.7), 0 0 45px rgba(251, 191, 36, 0.4);
            transform: scale(1.02);
          }
          50% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.95), 0 0 65px rgba(251, 191, 36, 0.7);
            transform: scale(1.06);
          }
        }
        .ch2-circle-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.8) !important;
          transform: scale(1.1) !important;
        }
        .ch2-circle-btn:active {
          transform: scale(0.95) !important;
        }
        .cover-frame-v2 {
          position: absolute;
          inset: clamp(12px, 2vw, 24px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          pointer-events: none;
          z-index: 10;
        }
        .cover-tick-v2 {
          position: absolute;
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(52, 211, 153, 0.55);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div className="cover-frame-v2" />

      {/* Grid Coordinates */}
      <span className="cover-tick-v2" style={{ top: '84px', left: '36px' }}>BIOMASS·90°</span>
      <span className="cover-tick-v2" style={{ top: '36px', right: '36px' }}>0.28°N</span>
      <span className="cover-tick-v2" style={{ bottom: '84px', left: '36px' }}>ECOSYSTEM</span>
      <span className="cover-tick-v2" style={{ bottom: '84px', right: '84px' }}>BIOSPHERE</span>

      {/* Top Left: Back to Chapters Button */}
      <button
        type="button"
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 'clamp(18px, 3vw, 36px)',
          left: 'clamp(18px, 3vw, 36px)',
          zIndex: 25,
          color: '#000000',
          background: '#fbbf24',
          padding: '8px 18px',
          borderRadius: '8px',
          fontWeight: '800',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(251, 191, 36, 0.4)',
          border: '1px solid #f59e0b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.background = '#f59e0b';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.background = '#fbbf24';
        }}
      >
        <ArrowLeft size={16} /> Back to Chapters
      </button>

      {/* Center Main Stage */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem',
          width: '92%',
          maxWidth: '860px',
          padding: '1rem',
        }}
      >
        {/* Top Floating Badge */}
        <span
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(52, 211, 153, 0.35)',
            padding: '8px 24px',
            borderRadius: '30px',
            fontSize: 'clamp(12px, 1.2vw, 15px)',
            fontWeight: '800',
            letterSpacing: '2px',
            color: '#34d399',
            boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
          }}
        >
          CLASS {classNum} · {subjectName}
        </span>

        {/* Center Frosted Glass Card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            background: 'rgba(6, 30, 20, 0.52)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: 'clamp(2rem, 3.5vw, 3rem) clamp(1.8rem, 4vw, 3.5rem)',
            borderRadius: '24px',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 14px 44px rgba(0,0,0,0.6), inset 0 0 25px rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.4rem',
            textAlign: 'center',
          }}
        >
          {/* Single Transparent Circle Button to Start/Pause Narration */}
          <button
            type="button"
            className="ch2-circle-btn"
            onClick={toggle}
            onMouseEnter={() => setIsCircleHovered(true)}
            onMouseLeave={() => setIsCircleHovered(false)}
            title={isPlaying ? 'Pause Audio Narration' : 'Start Audio Narration (Voice Over)'}
            aria-label={isPlaying ? 'Pause Audio Narration' : 'Start Audio Narration'}
            style={{
              position: 'absolute',
              top: 'clamp(14px, 2vw, 20px)',
              right: 'clamp(14px, 2vw, 22px)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: isPlaying
                ? 'rgba(16, 185, 129, 0.3)'
                : isCircleHovered
                ? 'rgba(255, 255, 255, 0.22)'
                : 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: isPlaying
                ? '2px solid #34d399'
                : '1.5px solid rgba(255, 255, 255, 0.45)',
              boxShadow: isPlaying
                ? '0 0 20px rgba(52, 211, 153, 0.8), inset 0 0 10px rgba(52, 211, 153, 0.35)'
                : '0 4px 14px rgba(0, 0, 0, 0.35)',
              color: isPlaying ? '#34d399' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              outline: 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: isPlaying ? 'subtlePulseGlow 2.2s infinite ease-in-out' : 'none',
              zIndex: 10,
            }}
          >
            {isPlaying ? (
              <Pause size={20} fill="#34d399" color="#34d399" />
            ) : (
              <Play size={20} fill="#ffffff" color="#ffffff" style={{ marginLeft: '2px' }} />
            )}
          </button>

          {/* Main Title with Real-Time Word Highlighting */}
          <h1
            style={{
              fontSize: 'clamp(36px, 4.8vw, 56px)',
              fontWeight: '900',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '2px',
              margin: 0,
              lineHeight: '1.18',
              textAlign: 'center',
            }}
          >
            {/* Word: Diversity */}
            <span
              style={{
                color: isDiversityActive ? '#34d399' : '#fdfbf7',
                textShadow: isDiversityActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 18px rgba(6, 78, 59, 0.95)',
                transform: isDiversityActive ? 'scale(1.12)' : 'none',
                background: isDiversityActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '10px',
                padding: '0 6px',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
            >
              Diversity
            </span>{' '}
            {/* Word: in */}
            <span
              style={{
                color: isInActive ? '#34d399' : '#fdfbf7',
                textShadow: isInActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 18px rgba(6, 78, 59, 0.95)',
                transform: isInActive ? 'scale(1.12)' : 'none',
                background: isInActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 4px',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
            >
              in
            </span>{' '}
            {/* Word: the */}
            <span
              style={{
                color: isTheActive ? '#34d399' : '#fdfbf7',
                textShadow: isTheActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 18px rgba(6, 78, 59, 0.95)',
                transform: isTheActive ? 'scale(1.12)' : 'none',
                background: isTheActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 4px',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
            >
              the
            </span><br />
            {/* Word: Living */}
            <span
              style={{
                color: isLivingActive ? '#34d399' : '#fdfbf7',
                textShadow: isLivingActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 18px rgba(6, 78, 59, 0.95)',
                transform: isLivingActive ? 'scale(1.12)' : 'none',
                background: isLivingActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '10px',
                padding: '0 6px',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
            >
              Living
            </span>{' '}
            {/* Word: World */}
            <span
              style={{
                color: isWorldActive ? '#34d399' : '#fdfbf7',
                textShadow: isWorldActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 18px rgba(6, 78, 59, 0.95)',
                transform: isWorldActive ? 'scale(1.12)' : 'none',
                background: isWorldActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '10px',
                padding: '0 6px',
                transition: 'all 0.15s ease',
                display: 'inline-block',
              }}
            >
              World
            </span>
          </h1>

          {/* Subtitle Topics Pill with Individual Word Highlighting */}
          <div
            style={{
              background: 'rgba(6, 40, 25, 0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '8px 22px',
              borderRadius: '10px',
              border: '1px solid rgba(251, 191, 36, 0.55)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {subtitleTopics.map((topic, idx) => (
              <React.Fragment key={topic.label}>
                <span
                  style={{
                    fontSize: 'clamp(14px, 1.6vw, 17px)',
                    fontWeight: topic.isActive ? '900' : '700',
                    color: topic.isActive ? '#ffffff' : '#fbbf24',
                    background: topic.isActive
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)'
                      : 'transparent',
                    border: topic.isActive ? '1.5px solid #6ee7b7' : '1.5px solid transparent',
                    boxShadow: topic.isActive
                      ? '0 0 18px rgba(52, 211, 153, 0.9), 0 3px 10px rgba(0,0,0,0.5)'
                      : 'none',
                    borderRadius: '8px',
                    padding: topic.isActive ? '3px 12px' : '3px 6px',
                    transform: topic.isActive ? 'scale(1.12)' : 'none',
                    transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-block',
                    letterSpacing: '0.8px',
                    textShadow: topic.isActive ? '0 0 10px rgba(255, 255, 255, 0.7)' : 'none',
                  }}
                >
                  {topic.label}
                </span>
                {idx < subtitleTopics.length - 1 && (
                  <span style={{ color: 'rgba(251, 191, 36, 0.65)', margin: '0 2px' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Floating CTA Button with Word-Level Audio Highlighting */}
        <button
          type="button"
          onClick={() => {
            pause();
            if (onNext) onNext();
          }}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            marginTop: '0.5rem',
            padding: '15px 46px',
            fontSize: 'clamp(17px, 1.7vw, 20px)',
            borderRadius: '14px',
            background: isBtnHovered
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            border: isButtonPhaseActive
              ? '2.5px solid #ffffff'
              : '2px solid #f59e0b',
            color: '#000000',
            fontWeight: '900',
            letterSpacing: '0.6px',
            boxShadow: isButtonPhaseActive
              ? '0 0 35px rgba(245, 158, 11, 0.95), 0 0 60px rgba(251, 191, 36, 0.75)'
              : isBtnHovered
              ? '0 10px 30px rgba(245, 158, 11, 0.5), 0 0 20px rgba(251, 191, 36, 0.4)'
              : '0 8px 24px rgba(0, 0, 0, 0.55)',
            cursor: 'pointer',
            transform: isButtonPhaseActive
              ? 'scale(1.06)'
              : isBtnHovered
              ? 'scale(1.03) translateY(-2px)'
              : 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: isButtonPhaseActive ? 'buttonAuraPulse 1.8s infinite ease-in-out' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Word: Begin */}
          <span
            style={{
              color: isBeginActive ? '#ffffff' : '#000000',
              background: isBeginActive ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
              borderRadius: '6px',
              padding: isBeginActive ? '2px 8px' : '0',
              textShadow: isBeginActive ? '0 0 12px rgba(255, 255, 255, 0.9)' : 'none',
              transform: isBeginActive ? 'scale(1.1)' : 'none',
              transition: 'all 0.12s ease',
              display: 'inline-block',
            }}
          >
            Begin
          </span>

          {/* Word: Chapter */}
          <span
            style={{
              color: isChapterActive ? '#ffffff' : '#000000',
              background: isChapterActive ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
              borderRadius: '6px',
              padding: isChapterActive ? '2px 8px' : '0',
              textShadow: isChapterActive ? '0 0 12px rgba(255, 255, 255, 0.9)' : 'none',
              transform: isChapterActive ? 'scale(1.1)' : 'none',
              transition: 'all 0.12s ease',
              display: 'inline-block',
            }}
          >
            Chapter
          </span>

          <ArrowLeft
            style={{
              transform: 'rotate(180deg)',
              color: isButtonPhaseActive ? '#ffffff' : '#000000',
              transition: 'color 0.2s ease',
            }}
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
