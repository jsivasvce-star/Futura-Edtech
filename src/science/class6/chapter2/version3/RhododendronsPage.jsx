import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';
import useWordSyncAudio from './narration/useWordSyncAudio';
import rhododendronsNarrationAudio from './narration/audio/rhododendrons.mp3';
import rhododendronsNarrationData from './narration/rhododendronsNarration.json';
import rhododendronsFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_rhododendrons_fullscreen.jpg';

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

export default function RhododendronsPage({ onPreviousPage, onNext, onBack }) {
  const [showPopup, setShowPopup] = useState(true);

  // Synchronized audio narration with real-time word highlight
  const {
    isPlaying: isPlayingAudio,
    activeWordIndex,
    play: playAudio,
    pause: pauseAudio,
  } = useWordSyncAudio(rhododendronsNarrationAudio, rhododendronsNarrationData.rhododendrons.words, {
    autoPlay: false,
    onEnd: () => { },
  });

  const toggleAudio = () => {
    if (isPlayingAudio) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handlePrevClick = () => {
    pauseAudio();
    if (onPreviousPage) onPreviousPage();
    else if (onBack) onBack();
  };

  const handleNextClick = () => {
    pauseAudio();
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

        @keyframes bioPanelRightEnter {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          65% {
            opacity: 1;
            transform: translateX(-3px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .bio-panel-right-enter {
          animation: bioPanelRightEnter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .bio-nav-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          border: 1.8px solid rgba(255, 255, 255, 0.35);
          border-radius: 12px;
          padding: 10px 24px;
          font-size: 22px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
          padding: 10px 26px;
          font-size: 22px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), 0 0 14px rgba(245, 158, 11, 0.35);
          position: relative;
          overflow: hidden;
          z-index: 10;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95), 0 0 12px rgba(253, 230, 138, 0.45);
        }
        .bio-cta-btn:hover {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 48%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(135deg, rgba(16, 185, 129, 0.88) 0%, rgba(4, 120, 87, 0.94) 100%);
          color: #FFFFFF;
          border-color: #FEF08A;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90);
        }
      `}</style>

      {/* Fullscreen Scenery Background: Blooming Rhododendrons in Mountain Valley */}
      <img
        src={rhododendronsFullscreenImage}
        alt="Rhododendrons in full bloom with mountain snow peaks"
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

      {/* Top Center Title: Rhododendrons (Deep Obsidian-Emerald Banner) */}
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
          fontSize: '26px',
          fontWeight: 900,
          fontFamily: '"Cinzel", Georgia, serif',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FFFBEB',
          lineHeight: 1.15,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
        }}>
          Rhododendrons
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
            padding: '10px 24px',
            fontSize: '22px',
            borderRadius: '12px'
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
            padding: '10px 26px',
            fontSize: '22px',
            borderRadius: '12px'
          }}
        >
          <span>Next Page</span>
          <ArrowRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Interactive Popup Message: Rhododendrons Across Mountain Regions (Right Top Corner) */}
      {showPopup && (
        <div
          className="bio-panel-right-enter"
          style={{
            position: 'absolute',
            top: '16px',
            right: '18px',
            width: 'min(540px, 46vw)',
            maxHeight: 'calc(100vh - 84px)',
            zIndex: 40,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            background: 'transparent',
            border: '2px solid rgba(251, 191, 36, 0.60)',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(245, 158, 11, 0.20)',
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
            padding: 'clamp(14px, 1.8vh, 18px) clamp(16px, 1.8vw, 22px)',
            gap: 'clamp(8px, 1.2vh, 12px)',
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
                background: 'linear-gradient(135deg, rgba(40, 24, 6, 0.75) 0%, rgba(20, 12, 3, 0.65) 100%)',
                color: '#34D399',
                border: '1.5px solid rgba(52, 211, 153, 0.55)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                padding: '5px 16px',
                borderRadius: '22px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: '22px',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}>
                <span style={{ fontSize: '22px' }}>🌺</span>
                <span style={{ color: '#34D399' }}>RHODODENDRONS</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Play / Pause Narration Button inside popup */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-label={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                  title={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                  style={{
                    background: isPlayingAudio
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                    border: '1.8px solid #34D399',
                    boxShadow: isPlayingAudio
                      ? '0 0 16px rgba(52, 211, 153, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                      : '0 4px 12px rgba(0, 0, 0, 0.35), 0 0 10px rgba(52, 211, 153, 0.25)',
                    borderRadius: '20px',
                    padding: '5px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '22px',
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
                  {isPlayingAudio ? (
                    <>
                      <Pause size={18} fill="#FFFFFF" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                      <span>Play</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    pauseAudio();
                    setShowPopup(false);
                  }}
                  aria-label="Close message and view full scenery"
                  title="View full scenery photo"
                  style={{
                    background: 'rgba(28, 16, 4, 0.65)',
                    border: '1.5px solid rgba(255, 255, 255, 0.30)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    width: '40px',
                    height: '40px',
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
                  <span style={{ fontSize: '22px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                </button>
              </div>
            </div>

            {/* Title Section (26px) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '26px',
                margin: 0,
                color: '#34D399',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(52, 211, 153, 0.65), 0 0 40px rgba(16, 185, 129, 0.25)'
              }}>
                <BioWord index={0} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>MOUNTAIN</BioWord>{' '}
                <BioWord index={1} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>RHODODENDRONS</BioWord>
              </h2>
            </div>

            {/* Info Panel: Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Section 1: Nilgiri Shola Forests (Subheading 24px, Content 22px justified) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(110, 231, 183, 0.4)'
                }}>
                  <span style={{ fontSize: '24px' }}>🍃</span>
                  <span>
                    <BioWord index={2} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>Nilgiri</BioWord>{' '}
                    <BioWord index={3} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>Shola</BioWord>{' '}
                    <BioWord index={4} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>Forests</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '22px',
                  color: '#E2E8F0',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 700,
                  lineHeight: 1.45,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify'
                }}>
                  <BioWord index={5} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>Short</BioWord>{' '}
                  <BioWord index={6} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>height</BioWord>{' '}
                  <BioWord index={7} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>and</BioWord>{' '}
                  <BioWord index={8} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>smaller</BioWord>{' '}
                  <BioWord index={9} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>leaves</BioWord>{' '}
                  <BioWord index={10} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>withstand</BioWord>{' '}
                  <BioWord index={11} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>violent</BioWord>{' '}
                  <BioWord index={12} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>mountain</BioWord>{' '}
                  <BioWord index={13} activeIndex={activeWordIndex} isPlaying={isPlayingAudio}>winds.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 2: Sikkim Mountains (Subheading 24px, Content 22px justified) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#7DD3FC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(125, 211, 252, 0.4)'
                }}>
                  <span style={{ fontSize: '24px' }}>🌲</span>
                  <span>
                    <BioWord index={14} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">Sikkim</BioWord>{' '}
                    <BioWord index={15} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">Mountains</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '22px',
                  color: '#E0F2FE',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 700,
                  lineHeight: 1.45,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify'
                }}>
                  <BioWord index={16} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">Sheltered,</BioWord>{' '}
                  <BioWord index={17} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">moist</BioWord>{' '}
                  <BioWord index={18} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">mountain</BioWord>{' '}
                  <BioWord index={19} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">valleys</BioWord>{' '}
                  <BioWord index={20} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">support</BioWord>{' '}
                  <BioWord index={21} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">tall</BioWord>{' '}
                  <BioWord index={22} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">tree</BioWord>{' '}
                  <BioWord index={23} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="cyan">growth.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 3: Regional Adaptation (Subheading 24px, Content 22px justified) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#FDE68A',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(253, 230, 138, 0.4)'
                }}>
                  <span style={{ fontSize: '24px' }}>🏔️</span>
                  <span>
                    <BioWord index={24} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">Regional</BioWord>{' '}
                    <BioWord index={25} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">Adaptation</BioWord>
                  </span>
                </div>
                <div style={{
                  fontSize: '22px',
                  color: '#FEF3C7',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 700,
                  lineHeight: 1.45,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify'
                }}>
                  <BioWord index={26} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">Same</BioWord>{' '}
                  <BioWord index={27} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">plant</BioWord>{' '}
                  <BioWord index={28} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">species</BioWord>{' '}
                  <BioWord index={29} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">develop</BioWord>{' '}
                  <BioWord index={30} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">distinct</BioWord>{' '}
                  <BioWord index={31} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">features</BioWord>{' '}
                  <BioWord index={32} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">to</BioWord>{' '}
                  <BioWord index={33} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">survive</BioWord>{' '}
                  <BioWord index={34} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">local</BioWord>{' '}
                  <BioWord index={35} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">climates.</BioWord>
                </div>
              </div>

              {/* Callout box: Think (Icon 24px, Content 22px justified) */}
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
                <span style={{ fontSize: '24px', lineHeight: 1 }}>💡</span>
                <div style={{
                  fontSize: '22px',
                  color: '#FCD34D',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontFamily: '"Outfit", sans-serif',
                  lineHeight: 1.45,
                  textAlign: 'justify',
                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                }}>
                  <BioWord index={36} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">Think:</BioWord>{' '}
                  <BioWord index={37} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">Why</BioWord>{' '}
                  <BioWord index={38} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">do</BioWord>{' '}
                  <BioWord index={39} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">rhododendrons</BioWord>{' '}
                  <BioWord index={40} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">stay</BioWord>{' '}
                  <BioWord index={41} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">short</BioWord>{' '}
                  <BioWord index={42} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">on</BioWord>{' '}
                  <BioWord index={43} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">windy</BioWord>{' '}
                  <BioWord index={44} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">peaks,</BioWord>{' '}
                  <BioWord index={45} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">but</BioWord>{' '}
                  <BioWord index={46} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">grow</BioWord>{' '}
                  <BioWord index={47} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">tall</BioWord>{' '}
                  <BioWord index={48} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">across</BioWord>{' '}
                  <BioWord index={49} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">sheltered</BioWord>{' '}
                  <BioWord index={50} activeIndex={activeWordIndex} isPlaying={isPlayingAudio} color="amber">valleys?</BioWord>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right-Side Center Arrow Trigger: Opens Popup */}
      {!showPopup && (
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          title="Open Rhododendrons Notes"
          aria-label="Open Rhododendrons Notes"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 35,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 14px 12px 18px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#FFFBEB',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRight: 'none',
            borderRadius: '20px 0 0 20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            cursor: 'pointer',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 900,
            fontSize: '22px',
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
          <ChevronLeft size={24} color="#FFFFFF" strokeWidth={3} />
          <BookOpen size={20} color="#FFFBEB" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
