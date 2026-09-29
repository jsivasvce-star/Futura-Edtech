import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight, Play, Pause } from 'lucide-react';
import useWordSyncAudio from './narration/useWordSyncAudio';
import botanyNarrationAudio from './narration/audio/05_HerbsShrubsTreesClimbers.mp3';
import botanyNarrationData from './narration/botanyNarration.json';
import botanyGreenhouseFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_botany_greenhouse_fullscreen.jpg';

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

export default function PlantGroupsPage({ onPreviousPage, onNext, onBack }) {
  const [showPopup, setShowPopup] = useState(false);

  // Real narration audio + word-level highlight sync
  const {
    isPlaying: isPlayingBotanyAudio,
    activeWordIndex: botanyActiveWordIndex,
    play: playBotanyNarration,
    pause: pauseBotanyNarration,
    toggle: toggleBotanyAudio,
  } = useWordSyncAudio(botanyNarrationAudio, botanyNarrationData.botany.words, {
    autoPlay: false,
    onEnd: () => {},
  });

  const toggleAudio = () => {
    if (isPlayingBotanyAudio) {
      pauseBotanyNarration();
    } else {
      if (playBotanyNarration) {
        playBotanyNarration().catch((err) => {
          console.warn('Botany narration audio error:', err);
        });
      } else {
        toggleBotanyAudio();
      }
    }
  };

  useEffect(() => {
    return () => {
      pauseBotanyNarration();
    };
  }, []);

  const handlePrevClick = () => {
    pauseBotanyNarration();
    if (onPreviousPage) onPreviousPage();
    else if (onBack) onBack();
  };

  const handleNextClick = () => {
    pauseBotanyNarration();
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
        src={botanyGreenhouseFullscreenImage}
        alt="Plant Groups - Botany Greenhouse with Herbs, Shrubs, Trees, and Climbers"
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

      {/* Top Center Title: Plant Groups (Deep Obsidian-Emerald Banner) */}
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
          Plant Groups
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

      {/* Interactive Popup Message: Herbs, Shrubs, Trees & Climbers */}
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
            border: '1.8px solid rgba(167, 243, 208, 0.55)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(16, 185, 129, 0.20)',
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

            {/* Top bar: Pill Badge + Play/Pause Narration Button + Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, rgba(6, 28, 18, 0.70) 0%, rgba(2, 18, 10, 0.60) 100%)',
                color: '#A7F3D0',
                border: '1.5px solid rgba(110, 231, 183, 0.55)',
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
                <span style={{ fontSize: '18px' }}>🌱</span>
                <span style={{ color: '#34D399' }}>PLANT GROUPS</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Play / Pause Narration Button inside popup */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-label={isPlayingBotanyAudio ? 'Pause Narration' : 'Play Narration'}
                  title={isPlayingBotanyAudio ? 'Pause Narration' : 'Play Narration'}
                  style={{
                    background: isPlayingBotanyAudio
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                    border: '1.8px solid #34D399',
                    boxShadow: isPlayingBotanyAudio
                      ? '0 0 16px rgba(16, 185, 129, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                      : '0 4px 12px rgba(0, 0, 0, 0.35), 0 0 10px rgba(16, 185, 129, 0.25)',
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
                  {isPlayingBotanyAudio ? (
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

                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  aria-label="Close message and view full scenery"
                  title="View full scenery photo"
                  style={{
                    background: 'rgba(2, 18, 10, 0.65)',
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
                    e.currentTarget.style.background = 'rgba(2, 18, 10, 0.65)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                </button>
              </div>
            </div>

            {/* Title Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
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
                <BioWord index={0} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>HERBS,</BioWord>{' '}
                <BioWord index={1} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>SHRUBS,</BioWord>{' '}
                <BioWord index={2} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>TREES</BioWord>{' '}
                <BioWord index={3} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>&amp;</BioWord>{' '}
                <BioWord index={4} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>CLIMBERS</BioWord>
              </h2>
            </div>

            {/* Info Panel: Content Sections */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* Section 1: Herbs — Tomato */}
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
                  <span style={{ fontSize: '18px' }}>🍅</span>
                  <span>Herbs — Tomato</span>
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
                  <BioWord index={11} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>Usually</BioWord>{' '}
                  <BioWord index={12} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>small</BioWord>{' '}
                  <BioWord index={13} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>plants</BioWord>{' '}
                  <BioWord index={14} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>with</BioWord>{' '}
                  <BioWord index={15} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>soft,</BioWord>{' '}
                  <BioWord index={16} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>green</BioWord>{' '}
                  <BioWord index={17} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>stems.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 2: Shrubs — Rose */}
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
                  <span style={{ fontSize: '18px' }}>🌹</span>
                  <span>Shrubs — Rose</span>
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
                  <BioWord index={23} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">Woody</BioWord>{' '}
                  <BioWord index={24} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">plants</BioWord>{' '}
                  <BioWord index={25} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">with</BioWord>{' '}
                  <BioWord index={26} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">many</BioWord>{' '}
                  <BioWord index={27} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">branches</BioWord>{' '}
                  <BioWord index={28} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">growing</BioWord>{' '}
                  <BioWord index={29} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">near</BioWord>{' '}
                  <BioWord index={30} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">the</BioWord>{' '}
                  <BioWord index={31} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="cyan">ground.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 3: Trees — Mango */}
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
                  <span style={{ fontSize: '18px' }}>🥭</span>
                  <span>Trees — Mango</span>
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
                  <BioWord index={36} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">Grow</BioWord>{' '}
                  <BioWord index={37} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">tall,</BioWord>{' '}
                  <BioWord index={38} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">with</BioWord>{' '}
                  <BioWord index={39} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">a</BioWord>{' '}
                  <BioWord index={40} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">thick,</BioWord>{' '}
                  <BioWord index={41} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">woody</BioWord>{' '}
                  <BioWord index={42} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">trunk</BioWord>{' '}
                  <BioWord index={43} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">and</BioWord>{' '}
                  <BioWord index={44} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">branches</BioWord>{' '}
                  <BioWord index={45} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">higher</BioWord>{' '}
                  <BioWord index={46} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">above</BioWord>{' '}
                  <BioWord index={47} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">the</BioWord>{' '}
                  <BioWord index={48} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">ground.</BioWord>
                </div>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* Section 4: Climbers — Money Plant */}
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
                  <span style={{ fontSize: '18px' }}>🪴</span>
                  <span>Climbers — Money Plant</span>
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
                  <BioWord index={54} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>Have</BioWord>{' '}
                  <BioWord index={55} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>weak</BioWord>{' '}
                  <BioWord index={56} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>stems</BioWord>{' '}
                  <BioWord index={57} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>and</BioWord>{' '}
                  <BioWord index={58} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>need</BioWord>{' '}
                  <BioWord index={59} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>support</BioWord>{' '}
                  <BioWord index={60} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>to</BioWord>{' '}
                  <BioWord index={61} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>grow</BioWord>{' '}
                  <BioWord index={62} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio}>upwards.</BioWord>
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
                  <BioWord index={63} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">Think:</BioWord>{' '}
                  <BioWord index={64} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">Which</BioWord>{' '}
                  <BioWord index={65} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">plant</BioWord>{' '}
                  <BioWord index={66} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">in</BioWord>{' '}
                  <BioWord index={67} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">this</BioWord>{' '}
                  <BioWord index={68} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">picture</BioWord>{' '}
                  <BioWord index={69} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">needs</BioWord>{' '}
                  <BioWord index={70} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">support</BioWord>{' '}
                  <BioWord index={71} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">to</BioWord>{' '}
                  <BioWord index={72} activeIndex={botanyActiveWordIndex} isPlaying={isPlayingBotanyAudio} color="amber">climb?</BioWord>
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
          title="Open Plant Classification Notes"
          aria-label="Open Plant Classification Notes"
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
