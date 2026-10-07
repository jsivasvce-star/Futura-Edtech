import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../../services/elevenLabsService';
import coverVideo from '../assets/chapter3_cover_video.mp4';

export default function Chapter3CoverPage({
  classNum = 6,
  subjectName = "CHAPTER 3 · SCIENCE",
  chapterNum = 3,
  title = "Mindful Eating: A Path to a Healthy Body",
  topics = "Food Variety · Nutrients · Food Testing · Balanced Diet · Healthy Living",
  onBack,
  onNext,
  bgImage,
  bgVideo = coverVideo,
}) {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWord, setActiveWord] = useState('');

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const toggleVoice = useCallback(() => {
    if (isPlaying) {
      stopNarration();
      setIsPlaying(false);
      setActiveWord('');
      return;
    }

    setIsPlaying(true);
    const textToSpeak = "Welcome to Class 6 Science, Chapter 3: Mindful Eating, A Path to a Healthy Body. In this interactive module, we explore food variety across regions, essential nutrients, laboratory tests for starch, fats, and proteins, balanced diet, and mindful lifestyle choices. Click Begin Chapter to start your journey!";

    // Simple word highlight simulator synchronized with speech
    const words = [
      { word: 'mindful', delay: 1200 },
      { word: 'eating', delay: 1800 },
      { word: 'path', delay: 2300 },
      { word: 'healthy', delay: 2800 },
      { word: 'body', delay: 3200 },
      { word: 'variety', delay: 5500 },
      { word: 'nutrients', delay: 7500 },
      { word: 'testing', delay: 9800 },
      { word: 'diet', delay: 12000 },
      { word: 'living', delay: 14000 },
      { word: 'begin', delay: 16500 }
    ];

    const timeouts = words.map(item => 
      setTimeout(() => {
        setActiveWord(item.word);
      }, item.delay)
    );

    speakNaturalIndianMale({
      text: textToSpeak,
      onEnd: () => {
        setIsPlaying(false);
        setActiveWord('');
      },
      onError: () => {
        setIsPlaying(false);
        setActiveWord('');
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isPlaying]);

  const handleNext = () => {
    stopNarration();
    setIsPlaying(false);
    if (onNext) onNext();
  };

  const handleBack = () => {
    stopNarration();
    setIsPlaying(false);
    if (onBack) onBack();
  };

  const topicList = [
    { key: 'variety', label: 'Food Variety', isActive: activeWord === 'variety' },
    { key: 'nutrients', label: 'Nutrients', isActive: activeWord === 'nutrients' },
    { key: 'testing', label: 'Food Testing', isActive: activeWord === 'testing' },
    { key: 'diet', label: 'Balanced Diet', isActive: activeWord === 'diet' },
    { key: 'living', label: 'Healthy Living', isActive: activeWord === 'living' }
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
          : 'radial-gradient(130% 120% at 75% 15%, #064E3B 0%, #03140F 100%)',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Video (Matching Attached Screenshot) */}
      {bgVideo && (
        <video
          disablePictureInPicture
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

      {/* Decorative Frame Overlays */}
      <style>{`
        .cover-frame-ch3 {
          position: absolute;
          inset: clamp(12px, 2vw, 24px);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 12px;
          pointer-events: none;
          z-index: 10;
        }
        .cover-tick-ch3 {
          position: absolute;
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(52, 211, 153, 0.65);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes buttonAuraPulseCh3 {
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

      <div className="cover-frame-ch3" />

      {/* Grid Coordinates (Matching Screenshot) */}
      <span className="cover-tick-ch3" style={{ top: '84px', left: '36px' }}>NUTRIENTS·100°</span>
      <span className="cover-tick-ch3" style={{ bottom: '84px', left: '36px' }}>WHOLESOME·FOOD</span>
      <span className="cover-tick-ch3" style={{ bottom: '84px', right: '84px' }}>BALANCED·THALI</span>

      {/* Top Left: Back to Chapters Button (Matching Screenshot) */}
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
        {/* Top Floating Badge (Matching Screenshot) */}
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
            background: 'rgba(6, 30, 20, 0.48)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: 'clamp(2rem, 3.5vw, 3rem) clamp(1.8rem, 4vw, 3.5rem)',
            borderRadius: '16px',
            border: isPlaying ? '1.5px solid rgba(52, 211, 153, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
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
          {/* Main Title (Chapter 3: Mindful Eating: A Path to a Healthy Body) */}
          <h1
            style={{
              fontSize: 'clamp(34px, 4.8vw, 54px)',
              fontWeight: '900',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '2px',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.2',
            }}
          >
            {/* Mindful */}
            <span
              style={{
                color: activeWord === 'mindful' ? '#34d399' : '#fdfbf7',
                textShadow: activeWord === 'mindful'
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: activeWord === 'mindful' ? 'scale(1.10)' : 'scale(1)',
                background: activeWord === 'mindful' ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              Mindful
            </span>{' '}

            {/* Eating: */}
            <span
              style={{
                color: activeWord === 'eating' ? '#34d399' : '#fdfbf7',
                textShadow: activeWord === 'eating'
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: activeWord === 'eating' ? 'scale(1.10)' : 'scale(1)',
                background: activeWord === 'eating' ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              Eating:
            </span><br />

            {/* A Path to a Healthy Body */}
            <span
              style={{
                color: activeWord === 'path' || activeWord === 'healthy' || activeWord === 'body' ? '#34d399' : '#fdfbf7',
                textShadow: activeWord === 'path' || activeWord === 'healthy' || activeWord === 'body'
                  ? '0 0 24px rgba(52, 211, 153, 0.95), 0 0 45px rgba(16, 185, 129, 0.8), 2px 2px 0px #064e3b'
                  : '2px 2px 0px #064e3b, 4px 4px 15px rgba(6, 78, 59, 0.9)',
                transform: activeWord === 'path' || activeWord === 'healthy' || activeWord === 'body' ? 'scale(1.08)' : 'scale(1)',
                background: activeWord === 'path' || activeWord === 'healthy' || activeWord === 'body' ? 'rgba(16, 185, 129, 0.35)' : 'transparent',
                borderRadius: '8px',
                padding: '0 6px',
                transition: 'all 0.18s ease',
                display: 'inline-block',
              }}
            >
              A Path to a Healthy Body
            </span>
          </h1>

          {/* Subtitle Pill (Matching Screenshot) */}
          <div
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              fontWeight: '700',
              color: '#fbbf24',
              background: 'rgba(6, 40, 25, 0.55)',
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
                    color: t.isActive ? '#ffffff' : '#fbbf24',
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

        {/* Bottom CTA Button: "Begin Chapter →" (Matching Screenshot) */}
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
            border: activeWord === 'begin'
              ? '2.5px solid #ffffff'
              : '2px solid #f59e0b',
            color: '#000000',
            fontWeight: '800',
            letterSpacing: '0.5px',
            boxShadow: activeWord === 'begin'
              ? '0 0 35px rgba(245, 158, 11, 0.95), 0 0 60px rgba(251, 191, 36, 0.75)'
              : isBtnHovered
              ? '0 10px 30px rgba(245, 158, 11, 0.5), 0 0 20px rgba(251, 191, 36, 0.4)'
              : '0 6px 20px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            transform: activeWord === 'begin'
              ? 'scale(1.05)'
              : isBtnHovered
              ? 'scale(1.04) translateY(-2px)'
              : 'none',
            transition: 'all 0.2s ease',
            animation: activeWord === 'begin' ? 'buttonAuraPulseCh3 1.8s infinite ease-in-out' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Begin Chapter</span>
          <ArrowLeft
            style={{
              transform: 'rotate(180deg)',
              color: '#000000',
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
