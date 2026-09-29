import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, ChevronRight, Play, Pause } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';
import rhododendronsFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_rhododendrons_fullscreen.jpg';
import fig213Image from './DiversityInTheLivingWorldNew/images/ch2_rhododendrons_fig213.png';

export default function RhododendronsPage({ onPreviousPage, onNext, onBack }) {
  const [showPopup, setShowPopup] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const narrationText = "Rhododendrons across mountain regions. Maya talks about seeing plants with beautiful bright flowers, rhododendrons, in the Shola forests of Nilgiris. Here, rhododendrons are of shorter height and have smaller leaves to survive through the heavy winds on mountain tops. However, Pema, who is from Sikkim, mentions that she has observed rhododendrons in the nearby mountains to be taller. So, even plants such as rhododendrons may exhibit different features in different regions to survive the conditions of those regions. Think: Why do rhododendrons grow shorter with smaller leaves on windy mountain tops in the Nilgiris, while growing taller in Sikkim?";

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopNarration();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakNaturalIndianMale({
        text: narrationText,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const handlePrevClick = () => {
    stopNarration();
    setIsPlayingAudio(false);
    if (onPreviousPage) onPreviousPage();
    else if (onBack) onBack();
  };

  const handleNextClick = () => {
    stopNarration();
    setIsPlayingAudio(false);
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
          padding: 9px 26px;
          font-size: 16px;
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
          fontSize: '24px',
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

      {/* Interactive Popup Message: Rhododendrons Across Mountain Regions */}
      {showPopup && (
        <div
          className="bio-panel-left-enter"
          style={{
            position: 'absolute',
            top: '16px',
            left: '18px',
            width: 'min(490px, 44vw)',
            maxHeight: 'calc(100vh - 76px)',
            zIndex: 40,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'linear-gradient(145deg, rgba(8, 20, 14, 0.88) 0%, rgba(12, 34, 24, 0.92) 100%)',
            border: '1.8px solid rgba(251, 191, 36, 0.65)',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(245, 158, 11, 0.25)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Inner content wrapper with scrollbar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 'clamp(14px, 2vh, 18px) clamp(16px, 2vw, 22px)',
            gap: 'clamp(8px, 1.2vh, 12px)',
            position: 'relative',
            zIndex: 5,
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}>
            {/* Top bar: Pill Badge + Play Narration Button + Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, rgba(40, 24, 6, 0.75) 0%, rgba(20, 12, 3, 0.70) 100%)',
                color: '#F472B6',
                border: '1.5px solid rgba(244, 114, 182, 0.65)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                padding: '5px 16px',
                borderRadius: '22px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}>
                <span style={{ fontSize: '18px' }}>🌺</span>
                <span>RHODODENDRONS</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Play / Pause Audio Narration */}
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
                    padding: '4px 14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '16px',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#A7F3D0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                NCERT Science · Grade 6 · Page 26
              </div>
              <h2 style={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '22px',
                color: '#FEF08A',
                lineHeight: 1.25,
                margin: 0,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 16px rgba(251, 191, 36, 0.35)'
              }}>
                Rhododendrons in Different Mountain Regions
              </h2>
            </div>

            {/* Section 1: Nilgiri Shola Forests */}
            <div style={{
              background: 'rgba(15, 30, 22, 0.60)',
              border: '1.5px solid rgba(52, 211, 153, 0.40)',
              borderRadius: '14px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span>🍃</span>
                <span>Nilgiri Shola Forests (South India)</span>
              </div>
              <div style={{
                fontSize: '16px',
                color: '#ECFDF5',
                lineHeight: 1.5,
                fontWeight: 500,
                fontFamily: '"Inter", sans-serif',
                textAlign: 'justify'
              }}>
                Maya talks about seeing plants with beautiful bright flowers, <b>rhododendrons</b>, in the Shola forests of Nilgiris. Here, rhododendrons are of <b>shorter height</b> and have <b>smaller leaves</b> to survive through the heavy winds on mountain tops.
              </div>
            </div>

            {/* Section 2: Sikkim Mountains */}
            <div style={{
              background: 'rgba(15, 30, 22, 0.60)',
              border: '1.5px solid rgba(56, 189, 248, 0.40)',
              borderRadius: '14px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: '"Outfit", sans-serif'
              }}>
                <span>🌲</span>
                <span>Sikkim Mountains (Eastern Himalayas)</span>
              </div>
              <div style={{
                fontSize: '16px',
                color: '#E0F2FE',
                lineHeight: 1.5,
                fontWeight: 500,
                fontFamily: '"Inter", sans-serif',
                textAlign: 'justify'
              }}>
                However, Pema, who is from Sikkim, mentions that she has observed rhododendrons in the nearby mountains to be <b>taller</b> (Fig. 2.13). In protected valleys with deep moisture, they flourish into magnificent tall trees.
              </div>
            </div>

            {/* Textbook Fig. 2.13 Preview */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(245, 241, 229, 0.15)',
              border: '1.5px solid rgba(253, 230, 138, 0.45)',
              borderRadius: '12px',
              padding: '8px 12px'
            }}>
              <div style={{
                width: '90px',
                height: '65px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1.5px solid #FDE68A',
                flexShrink: 0,
                background: '#ffffff'
              }}>
                <img
                  src={fig213Image}
                  alt="Fig. 2.13: Different features of rhododendrons"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: '15px', color: '#FFFBEB', lineHeight: 1.45 }}>
                <b style={{ color: '#FDE68A' }}>Fig. 2.13:</b> Different features of rhododendrons. Even plants of the same genus exhibit distinct heights and leaf sizes tailored to local weather.
              </div>
            </div>

            {/* Core Principle */}
            <div style={{
              fontSize: '16px',
              color: '#FEF3C7',
              lineHeight: 1.5,
              fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
              borderLeft: '3px solid #F59E0B',
              paddingLeft: '10px'
            }}>
              So, even plants such as rhododendrons may exhibit different features in different regions to survive the conditions of those regions.
            </div>

            {/* Callout box: Think */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.18) 100%)',
              border: '1.8px solid rgba(253, 230, 138, 0.65)',
              borderRadius: '14px',
              padding: '10px 14px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>💡</span>
              <div style={{
                fontSize: '17px',
                color: '#FCD34D',
                fontWeight: 800,
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1.45,
                textAlign: 'justify'
              }}>
                <span style={{ color: '#FFFFFF', textDecoration: 'underline' }}>Think:</span> Why do rhododendrons grow shorter with smaller leaves on windy mountain tops in the Nilgiris, while growing taller in Sikkim? How do physical features help plants survive specific regional climates?
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
          title="Open Rhododendrons Notes"
          aria-label="Open Rhododendrons Notes"
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
