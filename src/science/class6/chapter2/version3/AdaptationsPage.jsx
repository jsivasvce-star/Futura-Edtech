import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight, Play, Pause } from 'lucide-react';
import useWordSyncAudio from './narration/useWordSyncAudio';
import desertNarrationAudio from './narration/audio/04_DesertAdaptations.mp3';
import desertNarrationData from './narration/desertNarration.json';
import desertCamelFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_desert_camel_fullscreen.jpg';

// Real-time word highlight wrapper for popup text
const BioWord = ({ children, index, activeIndex, isPlaying, color = 'emerald' }) => {
  const isActive = isPlaying && (Array.isArray(index) ? index.includes(activeIndex) : activeIndex === index);
  const isAmber = color === 'amber';
  const isCyan = color === 'cyan';
  const highlightBg = isAmber
    ? 'rgba(245, 158, 11, 0.50)'
    : isCyan
    ? 'rgba(6, 182, 212, 0.50)'
    : 'rgba(16, 185, 129, 0.50)';
  const highlightShadow = isAmber
    ? '0 0 16px rgba(245, 158, 11, 0.95), inset 0 0 8px rgba(255, 255, 255, 0.6)'
    : isCyan
    ? '0 0 16px rgba(34, 211, 238, 0.95), inset 0 0 8px rgba(255, 255, 255, 0.6)'
    : '0 0 16px rgba(52, 211, 153, 0.95), inset 0 0 8px rgba(255, 255, 255, 0.6)';
  const highlightTextShadow = isAmber
    ? '0 0 12px rgba(245, 158, 11, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)'
    : isCyan
    ? '0 0 12px rgba(34, 211, 238, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)'
    : '0 0 12px rgba(52, 211, 153, 0.95), 0 2px 4px rgba(0, 0, 0, 0.9)';

  return (
    <span
      style={{
        display: 'inline-block',
        color: isActive ? '#FFFFFF' : 'inherit',
        background: isActive ? highlightBg : 'transparent',
        borderRadius: isActive ? '6px' : '0px',
        padding: isActive ? '0 5px' : '0px',
        margin: isActive ? '0 1px' : '0px',
        boxShadow: isActive ? highlightShadow : 'none',
        transform: isActive ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
        textShadow: isActive ? highlightTextShadow : 'inherit',
      }}
    >
      {children}
    </span>
  );
};

export default function AdaptationsPage({ onPreviousPage, onNext, onBack }) {
  const [showPopup, setShowPopup] = useState(false);

  // Real narration audio + word-level highlight sync
  const {
    isPlaying: isPlayingDesertAudio,
    activeWordIndex: desertActiveWordIndex,
    play: playDesertNarration,
    pause: pauseDesertNarration,
  } = useWordSyncAudio(desertNarrationAudio, desertNarrationData.desert.words, {
    autoPlay: false,
    onEnd: () => {},
  });

  const toggleDesertAudio = () => {
    if (isPlayingDesertAudio) {
      pauseDesertNarration();
    } else {
      playDesertNarration().catch((err) => {
        console.warn('Desert narration audio error:', err);
      });
    }
  };

  useEffect(() => {
    return () => {
      pauseDesertNarration();
    };
  }, []);

  const handlePrevClick = () => {
    pauseDesertNarration();
    if (onPreviousPage) onPreviousPage();
    else if (onBack) onBack();
  };

  const handleNextClick = () => {
    pauseDesertNarration();
    if (onNext) onNext();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes bioPanelLeftEnter {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          65% {
            opacity: 1;
            transform: translateX(3px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .bio-panel-left-enter {
          animation: bioPanelLeftEnter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .bio-nav-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          border: 1.8px solid rgba(255, 255, 255, 0.35);
          border-radius: 12px;
          padding: 9px 24px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15);
          position: relative;
          overflow: hidden;
          z-index: 10;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.65);
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.14) 100%);
          color: #FFFDF0;
          border-color: #FBBF24;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 0 20px rgba(245, 158, 11, 0.5);
        }

        .bio-cta-btn {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%);
          color: #FFFBEB;
          border: 2px solid rgba(253, 230, 138, 0.85);
          border-radius: 12px;
          padding: 8px 24px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }
        .bio-cta-btn:hover {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 48%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(135deg, rgba(16, 185, 129, 0.88) 0%, rgba(4, 120, 87, 0.94) 100%);
          color: #FFFFFF;
          border-color: #FEF08A;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90);
        }
        .ch2-circle-btn:hover {
          transform: scale(1.08);
          border-color: #FEF08A;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
        }
        @keyframes subtlePulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(52, 211, 153, 0.5); }
          50% { box-shadow: 0 0 25px rgba(52, 211, 153, 0.9); }
        }
      `}</style>

      {/* Fullscreen Scenery Background */}
      <img
        src={desertCamelFullscreenImage}
        alt="Desert Adaptations - Camel in desert landscape"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
          zIndex: 0
        }}
      />

      {/* Top Center Title: Adaptations (Deep Obsidian-Emerald Banner) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 35,
        pointerEvents: 'none',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '2px solid rgba(253, 230, 138, 0.85)',
        borderRadius: '12px',
        padding: '7px 28px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 900,
          fontFamily: '"Cinzel", Georgia, serif',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FFFBEB',
          lineHeight: 1.15,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
        }}>
          Adaptations
        </h1>
      </div>


      {/* Bottom-Left: Previous Page Button */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '24px',
        zIndex: 45,
        pointerEvents: 'auto'
      }}>
        <button
          type="button"
          className="bio-nav-btn"
          onClick={handlePrevClick}
          aria-label="Previous Page"
          style={{
            padding: '8px 22px',
            fontSize: '16px',
            borderRadius: '10px'
          }}
        >
          ← Previous Page
        </button>
      </div>

      {/* Bottom-Right: Next Page Button */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '24px',
        zIndex: 35
      }}>
        <button
          type="button"
          className="bio-cta-btn"
          onClick={handleNextClick}
          aria-label="Next Page"
          style={{
            padding: '8px 24px',
            fontSize: '16px',
            borderRadius: '10px'
          }}
        >
          <span>Next Page</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </button>
      </div>

      {/* Interactive Popup Message: Desert Adaptations */}
      {showPopup && (
        <div
          className="bio-panel-left-enter"
          style={{
            position: 'absolute',
            top: '16px',
            left: '18px',
            width: 'min(480px, 42vw)',
            maxHeight: 'calc(100vh - 76px)',
            zIndex: 40,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(2px)',
            background: 'transparent',
            border: '1.8px solid rgba(251, 191, 36, 0.55)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(245, 158, 11, 0.20)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Inner content wrapper with padding */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: 'clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)',
            gap: 'clamp(8px, 1.2vh, 14px)',
            position: 'relative',
            zIndex: 5,
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}>
            {/* Top bar: Pill Badge + Circle Narration Button + Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, rgba(40, 24, 6, 0.70) 0%, rgba(20, 12, 3, 0.60) 100%)',
                color: '#34D399',
                border: '1.5px solid rgba(52, 211, 153, 0.55)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                padding: '5px 16px',
                borderRadius: '22px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}>
                <span style={{ fontSize: '18px' }}>🌵</span>
                <span style={{ color: '#34D399' }}>ADAPTATION</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Play / Pause Narration Button inside popup */}
                <button
                  type="button"
                  onClick={toggleDesertAudio}
                  aria-label={isPlayingDesertAudio ? 'Pause Narration' : 'Play Narration'}
                  title={isPlayingDesertAudio ? 'Pause Narration' : 'Play Narration'}
                  style={{
                    background: isPlayingDesertAudio
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                    border: '1.8px solid #34D399',
                    boxShadow: isPlayingDesertAudio
                      ? '0 0 16px rgba(52, 211, 153, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                      : '0 4px 12px rgba(0, 0, 0, 0.35), 0 0 10px rgba(52, 211, 153, 0.25)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '13px',
                    fontFamily: '"Outfit", sans-serif',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = '#6EE7B7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = '#34D399';
                  }}
                >
                  {isPlayingDesertAudio ? (
                    <>
                      <Pause size={15} fill="#FFFFFF" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={15} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                      <span>Play</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  aria-label="Close message and view full scenery"
                  title="View full scenery photo"
                  style={{
                    background: 'rgba(28, 16, 4, 0.65)',
                    border: '1.5px solid rgba(255, 255, 255, 0.30)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.95)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.85)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(28, 16, 4, 0.65)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                </button>
              </div>
            </div>

            {/* Title Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '20px',
                margin: 0,
                color: '#34D399',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(52, 211, 153, 0.65), 0 0 40px rgba(16, 185, 129, 0.25)'
              }}>
                <BioWord index={0} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>DESERT</BioWord>{' '}
                <BioWord index={1} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>ADAPTATIONS</BioWord>
              </h2>
            </div>

            {/* Info Panel: Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Section 1: What Is Adaptation? */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(110, 231, 183, 0.4)'
                }}>
                  <span style={{ fontSize: '18px' }}>🦎</span>
                  <span>
                    <BioWord index={2} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>What</BioWord>{' '}
                    <BioWord index={3} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>Is</BioWord>{' '}
                    <BioWord index={4} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>Adaptation?</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#E2E8F0',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}>
                  <BioWord index={5} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>A</BioWord>{' '}
                  <BioWord index={6} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>feature</BioWord>{' '}
                  <BioWord index={7} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>or</BioWord>{' '}
                  <BioWord index={8} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>behaviour</BioWord>{' '}
                  <BioWord index={9} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>that</BioWord>{' '}
                  <BioWord index={10} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>helps</BioWord>{' '}
                  <BioWord index={11} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>a</BioWord>{' '}
                  <BioWord index={12} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>living</BioWord>{' '}
                  <BioWord index={13} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>thing</BioWord>{' '}
                  <BioWord index={14} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>survive</BioWord>{' '}
                  <BioWord index={15} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>in</BioWord>{' '}
                  <BioWord index={16} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>its</BioWord>{' '}
                  <BioWord index={17} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>habitat.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 2: The Ship of the Desert */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#7DD3FC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(125, 211, 252, 0.4)'
                }}>
                  <span style={{ fontSize: '18px' }}>🐪</span>
                  <span>
                    <BioWord index={18} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>The</BioWord>{' '}
                    <BioWord index={19} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>Ship</BioWord>{' '}
                    <BioWord index={20} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>of</BioWord>{' '}
                    <BioWord index={21} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>the</BioWord>{' '}
                    <BioWord index={22} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>Desert</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#E0F2FE',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}>
                  <BioWord index={23} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>A</BioWord>{' '}
                  <BioWord index={24} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>camel’s</BioWord>{' '}
                  <BioWord index={25} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>broad,</BioWord>{' '}
                  <BioWord index={26} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>padded</BioWord>{' '}
                  <BioWord index={27} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>feet</BioWord>{' '}
                  <BioWord index={28} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>help</BioWord>{' '}
                  <BioWord index={29} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>prevent</BioWord>{' '}
                  <BioWord index={30} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>it</BioWord>{' '}
                  <BioWord index={31} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>from</BioWord>{' '}
                  <BioWord index={32} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>sinking</BioWord>{' '}
                  <BioWord index={33} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>into</BioWord>{' '}
                  <BioWord index={34} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>sand.</BioWord>{' '}
                  <BioWord index={35} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>Its</BioWord>{' '}
                  <BioWord index={36} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>long</BioWord>{' '}
                  <BioWord index={37} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>eyelashes</BioWord>{' '}
                  <BioWord index={38} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>help</BioWord>{' '}
                  <BioWord index={39} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>protect</BioWord>{' '}
                  <BioWord index={40} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>its</BioWord>{' '}
                  <BioWord index={41} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>eyes</BioWord>{' '}
                  <BioWord index={42} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>from</BioWord>{' '}
                  <BioWord index={43} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>blowing</BioWord>{' '}
                  <BioWord index={44} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio}>dust.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 3: Saving Water */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                }}>
                  <span style={{ fontSize: '18px' }}>💧</span>
                  <span>
                    <BioWord index={45} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">Saving</BioWord>{' '}
                    <BioWord index={46} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">Water</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#FEF3C7',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}>
                  <BioWord index={47} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">Camels</BioWord>{' '}
                  <BioWord index={48} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">conserve</BioWord>{' '}
                  <BioWord index={49} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">water</BioWord>{' '}
                  <BioWord index={50} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">by</BioWord>{' '}
                  <BioWord index={51} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">reducing</BioWord>{' '}
                  <BioWord index={52} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">water</BioWord>{' '}
                  <BioWord index={53} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">loss</BioWord>{' '}
                  <BioWord index={54} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">from</BioWord>{' '}
                  <BioWord index={55} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">their</BioWord>{' '}
                  <BioWord index={56} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">bodies.</BioWord>{' '}
                  <BioWord index={57} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">This</BioWord>{' '}
                  <BioWord index={58} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">helps</BioWord>{' '}
                  <BioWord index={59} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">them</BioWord>{' '}
                  <BioWord index={60} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">survive</BioWord>{' '}
                  <BioWord index={61} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">for</BioWord>{' '}
                  <BioWord index={62} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">long</BioWord>{' '}
                  <BioWord index={63} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">periods</BioWord>{' '}
                  <BioWord index={64} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">without</BioWord>{' '}
                  <BioWord index={65} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">drinking.</BioWord>
                </div>
              </div>

              {/* Callout box: Think */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 100%)',
                border: '1.5px solid rgba(253, 230, 138, 0.45)',
                borderRadius: '14px',
                padding: '10px 14px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                <div style={{
                  fontSize: '18px',
                  color: '#FCD34D',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontFamily: '"Outfit", sans-serif',
                  lineHeight: 1.5,
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                }}>
                  <BioWord index={66} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">Think:</BioWord>{' '}
                  <BioWord index={67} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">Why</BioWord>{' '}
                  <BioWord index={68} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">is</BioWord>{' '}
                  <BioWord index={69} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">saving</BioWord>{' '}
                  <BioWord index={70} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">water</BioWord>{' '}
                  <BioWord index={71} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">important</BioWord>{' '}
                  <BioWord index={72} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">in</BioWord>{' '}
                  <BioWord index={73} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">a</BioWord>{' '}
                  <BioWord index={74} activeIndex={desertActiveWordIndex} isPlaying={isPlayingDesertAudio} color="amber">desert?</BioWord>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left-Side Center Arrow Trigger: Opens Popup */}
      {!showPopup && (
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          title="Open Desert Adaptations Notes"
          aria-label="Open Desert Adaptations Notes"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 35,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px 12px 14px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#FFFBEB',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderLeft: 'none',
            borderRadius: '0 20px 20px 0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            cursor: 'pointer',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 900,
            fontSize: '15px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            e.currentTarget.style.borderColor = '#FEF08A';
            e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
          }}
        >
          <BookOpen size={18} color="#FFFBEB" strokeWidth={2.5} />
          <ChevronRight size={22} color="#FFFFFF" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
