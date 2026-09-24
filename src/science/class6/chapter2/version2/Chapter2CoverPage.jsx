import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  // Audio setup and tick listener
  useEffect(() => {
    const audio = new Audio(introNarrationAudio);
    audioRef.current = audio;

    const tick = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleVoice = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Audio play error:', err);
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (onNext) onNext();
  };

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (onBack) onBack();
  };

  // Word-level active highlights
  // "Welcome to Diversity in the Living World!" (0.0s - 2.15s) and "variety of living things is called diversity" (7.8s - 10.15s)
  const isDiversityActive = isPlaying && (
    (currentTime >= 0.65 && currentTime < 1.20) || 
    (currentTime >= 9.55 && currentTime < 10.15)
  );
  const isInActive = isPlaying && (currentTime >= 1.20 && currentTime < 1.35);
  const isTheActive = isPlaying && (currentTime >= 1.35 && currentTime < 1.45);
  const isLivingActive = isPlaying && (
    (currentTime >= 1.45 && currentTime < 1.75) || 
    (currentTime >= 7.85 && currentTime < 8.25) || 
    (currentTime >= 19.50 && currentTime < 19.85)
  );
  const isWorldActive = isPlaying && (currentTime >= 1.75 && currentTime < 2.15);

  // Subtitle topic active highlights:
  // "plants" (4.50 - 4.95s), "animals" (5.40 - 5.95s), "habitats" (12.20 - 12.70s), "adaptation" (14.35 - 15.00s), "classification" (16.75 - 17.80s)
  const isPlantsActive = isPlaying && (currentTime >= 4.45 && currentTime < 5.00);
  const isAnimalsActive = isPlaying && (currentTime >= 5.35 && currentTime < 6.00);
  const isHabitatsActive = isPlaying && (currentTime >= 12.15 && currentTime < 12.80);
  const isAdaptationActive = isPlaying && (currentTime >= 14.30 && currentTime < 15.10);
  const isClassificationActive = isPlaying && (currentTime >= 16.70 && currentTime < 17.85);

  // Past spoken topics (subtle visual confirmation)
  const hasPlantsSpoken = isPlaying && currentTime >= 5.00;
  const hasAnimalsSpoken = isPlaying && currentTime >= 6.00;
  const hasHabitatsSpoken = isPlaying && currentTime >= 12.80;
  const hasAdaptationSpoken = isPlaying && currentTime >= 15.10;
  const hasClassificationSpoken = isPlaying && currentTime >= 17.85;

  // CTA button active highlights:
  // "Ready? Let's begin the chapter!" (21.05s - 23.50s)
  const isButtonPhaseActive = isPlaying && (currentTime >= 21.05 && currentTime <= 23.60);
  const isBeginActive = isPlaying && (currentTime >= 22.35 && currentTime < 22.85);
  const isChapterActive = isPlaying && (currentTime >= 22.85 && currentTime <= 23.60);

  const topicList = [
    { key: 'plants', label: 'Plants', isActive: isPlantsActive, isSpoken: hasPlantsSpoken },
    { key: 'animals', label: 'Animals', isActive: isAnimalsActive, isSpoken: hasAnimalsSpoken },
    { key: 'habitats', label: 'Habitats', isActive: isHabitatsActive, isSpoken: hasHabitatsSpoken },
    { key: 'adaptation', label: 'Adaptation', isActive: isAdaptationActive, isSpoken: hasAdaptationSpoken },
    { key: 'classification', label: 'Classification', isActive: isClassificationActive, isSpoken: hasClassificationSpoken }
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
        <video
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

      {/* Decorative Overlays */}
      <style>{`
        .cover-frame-ch2 {
          position: absolute;
          inset: clamp(12px, 2vw, 24px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          pointer-events: none;
          z-index: 10;
        }
        .cover-tick-ch2 {
          position: absolute;
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(52, 211, 153, 0.55);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes buttonAuraPulse {
          0%, 100% {
            box-shadow: 0 0 35px rgba(245, 158, 11, 0.95), 0 0 60px rgba(251, 191, 36, 0.75);
            transform: scale(1.04);
          }
          50% {
            box-shadow: 0 0 50px rgba(245, 158, 11, 1), 0 0 80px rgba(251, 191, 36, 0.9);
            transform: scale(1.07);
          }
        }
      `}</style>

      <div className="cover-frame-ch2" />

      {/* Grid Coordinates (Matching Screenshot) */}
      <span className="cover-tick-ch2" style={{ top: '84px', left: '36px' }}>BIOMASS·90°</span>
      <span className="cover-tick-ch2" style={{ bottom: '84px', left: '36px' }}>ECOSYSTEM</span>
      <span className="cover-tick-ch2" style={{ bottom: '84px', right: '84px' }}>BIOSPHERE</span>

      {/* Top Left: Back to Chapters Button */}
      <button
        type="button"
        onClick={handleBack}
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

      {/* Top Right: Voice Over Button (Matching Screenshot) */}
      <button
        type="button"
        onClick={toggleVoice}
        style={{
          position: 'absolute',
          top: 'clamp(18px, 3vw, 36px)',
          right: 'clamp(18px, 3vw, 36px)',
          zIndex: 25,
          color: isPlaying ? '#ffffff' : '#000000',
          background: isPlaying ? '#10b981' : '#fbbf24',
          padding: '8px 18px',
          borderRadius: '8px',
          fontWeight: '800',
          boxShadow: isPlaying 
            ? '0 0 20px rgba(16, 185, 129, 0.8), 0 4px 15px rgba(0,0,0,0.4)' 
            : '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(251, 191, 36, 0.4)',
          border: isPlaying ? '1px solid #059669' : '1px solid #f59e0b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          transition: 'all 0.2s ease',
        }}
        title={isPlaying ? "Stop Voice Over" : "Listen to Chapter Introduction"}
      >
        {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{isPlaying ? 'Stop Voice' : 'Voice Over'}</span>
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
            backdropFilter: 'blur(12px)',
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

        {/* Center Frosted Glass Popup Card (Matching Screenshot) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            background: 'rgba(6, 30, 20, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: 'clamp(2rem, 3.5vw, 3rem) clamp(1.8rem, 4vw, 3.5rem)',
            borderRadius: '16px',
            border: isPlaying ? '1.5px solid rgba(52, 211, 153, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: isPlaying
              ? '0 14px 44px rgba(0,0,0,0.65), 0 0 30px rgba(16, 185, 129, 0.25), inset 0 0 25px rgba(255,255,255,0.06)'
              : '0 8px 32px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem',
            textAlign: 'center',
            transition: 'border 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          {/* Main Title with Real-Time Word Highlighting */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '900',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '2px',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.18',
            }}
          >
            {/* Diversity */}
            <span
              style={{
                color: isDiversityActive ? '#34d399' : '#fdfbf7',
                textShadow: isDiversityActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: isDiversityActive ? 'scale(1.10)' : 'scale(1)',
                background: isDiversityActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              Diversity
            </span>{' '}

            {/* in */}
            <span
              style={{
                color: isInActive ? '#34d399' : '#fdfbf7',
                textShadow: isInActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: isInActive ? 'scale(1.10)' : 'scale(1)',
                background: isInActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '6px',
                padding: '0 4px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              in
            </span>{' '}

            {/* the */}
            <span
              style={{
                color: isTheActive ? '#34d399' : '#fdfbf7',
                textShadow: isTheActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: isTheActive ? 'scale(1.10)' : 'scale(1)',
                background: isTheActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '6px',
                padding: '0 4px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              the
            </span><br />

            {/* Living */}
            <span
              style={{
                color: isLivingActive ? '#34d399' : '#fdfbf7',
                textShadow: isLivingActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: isLivingActive ? 'scale(1.10)' : 'scale(1)',
                background: isLivingActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              Living
            </span>{' '}

            {/* World */}
            <span
              style={{
                color: isWorldActive ? '#34d399' : '#fdfbf7',
                textShadow: isWorldActive
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: isWorldActive ? 'scale(1.10)' : 'scale(1)',
                background: isWorldActive ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              World
            </span>
          </h1>

          {/* Subtitle Pill with Individual Word Highlighting */}
          <div
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              fontWeight: '700',
              color: '#fbbf24',
              background: 'rgba(6, 40, 25, 0.5)',
              backdropFilter: 'blur(6px)',
              padding: '8px 24px',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.5)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
              letterSpacing: '1px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {topicList.map((t, idx) => (
              <React.Fragment key={t.key}>
                <span
                  style={{
                    color: t.isActive 
                      ? '#ffffff' 
                      : t.isSpoken 
                      ? '#6ee7b7' 
                      : '#fbbf24',
                    background: t.isActive
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)'
                      : 'transparent',
                    border: t.isActive ? '1.5px solid #6ee7b7' : '1.5px solid transparent',
                    boxShadow: t.isActive
                      ? '0 0 20px rgba(52, 211, 153, 0.95), 0 3px 10px rgba(0,0,0,0.5)'
                      : 'none',
                    borderRadius: '6px',
                    padding: t.isActive ? '2px 10px' : '2px 4px',
                    transform: t.isActive ? 'scale(1.12)' : 'scale(1)',
                    transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-block',
                    textShadow: t.isActive ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
                  }}
                >
                  {t.label}
                </span>
                {idx < topicList.length - 1 && (
                  <span style={{ color: 'rgba(251, 191, 36, 0.65)', margin: '0 2px' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button: "Begin Chapter →" */}
        <button
          type="button"
          onClick={handleNext}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            marginTop: '0.4rem',
            padding: '16px 42px',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            borderRadius: '12px',
            background: isBtnHovered
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            border: isButtonPhaseActive
              ? '2.5px solid #ffffff'
              : '2px solid #f59e0b',
            color: '#000000',
            fontWeight: '800',
            letterSpacing: '0.5px',
            boxShadow: isButtonPhaseActive
              ? '0 0 35px rgba(245, 158, 11, 0.95), 0 0 60px rgba(251, 191, 36, 0.75)'
              : isBtnHovered
              ? '0 10px 30px rgba(245, 158, 11, 0.5), 0 0 20px rgba(251, 191, 36, 0.4)'
              : '0 6px 20px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            transform: isButtonPhaseActive
              ? 'scale(1.05)'
              : isBtnHovered
              ? 'scale(1.04) translateY(-2px)'
              : 'none',
            transition: 'all 0.2s ease',
            animation: isButtonPhaseActive ? 'buttonAuraPulse 1.8s infinite ease-in-out' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Word: Begin */}
          <span
            style={{
              color: isBeginActive ? '#ffffff' : '#000000',
              background: isBeginActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              border: isBeginActive ? '1px solid #a7f3d0' : '1px solid transparent',
              boxShadow: isBeginActive ? '0 0 16px rgba(16, 185, 129, 0.9)' : 'none',
              borderRadius: '6px',
              padding: isBeginActive ? '2px 8px' : '0',
              textShadow: isBeginActive ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
              transform: isBeginActive ? 'scale(1.1)' : 'none',
              transition: 'all 0.14s ease',
              display: 'inline-block',
            }}
          >
            Begin
          </span>

          {/* Word: Chapter */}
          <span
            style={{
              color: isChapterActive ? '#ffffff' : '#000000',
              background: isChapterActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              border: isChapterActive ? '1px solid #a7f3d0' : '1px solid transparent',
              boxShadow: isChapterActive ? '0 0 16px rgba(16, 185, 129, 0.9)' : 'none',
              borderRadius: '6px',
              padding: isChapterActive ? '2px 8px' : '0',
              textShadow: isChapterActive ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
              transform: isChapterActive ? 'scale(1.1)' : 'none',
              transition: 'all 0.14s ease',
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
            size={18}
          />
        </button>
      </div>

      {/* Bottom Right Speaker Circle (Matching Screenshot) */}
      <button
        type="button"
        onClick={toggleVoice}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: isPlaying ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: isPlaying ? '1.5px solid #34d399' : '1px solid rgba(255, 255, 255, 0.2)',
          color: isPlaying ? '#34d399' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 25,
          boxShadow: isPlaying ? '0 0 16px rgba(52, 211, 153, 0.7)' : '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
        }}
        title={isPlaying ? "Stop Voice Over" : "Listen to Chapter Introduction"}
      >
        {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
