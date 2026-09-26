import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Play, Pause, RefreshCw, X } from 'lucide-react';
import useWordSyncAudio from '../../narration/useWordSyncAudio';
import NarratedWords from '../../narration/NarratedWords';

import roseNarrationAudio from '../../narration/audio/Rose.mp3';
import roseNarrationData from '../../narration/roseNarration.json';

import hibiscusNarrationAudio from '../../narration/audio/Hibiscus.mp3';
import hibiscusNarrationData from '../../narration/hibiscusNarration.json';

import sunflowerNarrationAudio from '../../narration/audio/Sunflower.mp3';
import sunflowerNarrationData from '../../narration/sunflowerNarration.json';

import waterlilyNarrationAudio from '../../narration/audio/WaterLily.mp3';
import waterlilyNarrationData from '../../narration/waterlilyNarration.json';

import tulsiNarrationAudio from '../../narration/audio/Tulsi.mp3';
import tulsiNarrationData from '../../narration/tulsiNarration.json';

import neemNarrationAudio from '../../narration/audio/Neem.mp3';
import neemNarrationData from '../../narration/neemNarration.json';

import grassNarrationAudio from '../../narration/audio/Grass.mp3';
import grassNarrationData from '../../narration/grassNarration.json';

const PLANT_NARRATIONS = {
  rose: {
    audio: roseNarrationAudio,
    words: roseNarrationData.rose.words,
    sections: {
      stem: { start: 5, end: 14 },
      leaves: { start: 14, end: 22 },
      flowers: { start: 22, end: 27 },
      notes: { start: 27, end: 33 },
      think: { start: 33, end: 43 },
    }
  },
  hibiscus: {
    audio: hibiscusNarrationAudio,
    words: hibiscusNarrationData.hibiscus.words,
    sections: {
      stem: { start: 4, end: 12 },
      leaves: { start: 12, end: 17 },
      flowers: { start: 17, end: 21 },
      notes: { start: 21, end: 30 },
      think: { start: 30, end: 35 },
    }
  },
  sunflower: {
    audio: sunflowerNarrationAudio,
    words: sunflowerNarrationData.sunflower.words,
    sections: {
      stem: { start: 4, end: 11 },
      leaves: { start: 11, end: 18 },
      flowers: { start: 18, end: 28 },
      notes: { start: 28, end: 42 },
      think: { start: 42, end: 50 },
    }
  },
  waterlily: {
    audio: waterlilyNarrationAudio,
    words: waterlilyNarrationData.waterlily.words,
    sections: {
      notes: { start: 5, end: 14 },
      stem: { start: 15, end: 23 },
      leaves: { start: 24, end: 32 },
      flowers: { start: 32, end: 42 },
      think: { start: 44, end: 53 },
    }
  },
  tulsi: {
    audio: tulsiNarrationAudio,
    words: tulsiNarrationData.tulsi.words,
    sections: {
      stem: { start: 6, end: 17, activeStart: 5 },
      leaves: { start: 18, end: 26, activeStart: 17 },
      flowers: { start: 27, end: 35, activeStart: 26 },
      notes: { start: 37, end: 47, activeStart: 35 },
      think: { start: 49, end: 57, activeStart: 47 },
    }
  },
  neem: {
    audio: neemNarrationAudio,
    words: neemNarrationData.neem.words,
    sections: {
      stem: { start: 6, end: 16, activeStart: 4 },
      leaves: { start: 17, end: 27, activeStart: 16 },
      flowers: { start: 30, end: 34, activeStart: 27 },
      notes: { start: 34, end: 43, activeStart: 34 },
      think: { start: 45, end: 54, activeStart: 43 },
    }
  },
  grass: {
    audio: grassNarrationAudio,
    words: grassNarrationData.grass.words,
    sections: {
      stem: { start: 6, end: 14, activeStart: 5 },
      leaves: { start: 17, end: 23, activeStart: 14 },
      flowers: { start: 26, end: 33, activeStart: 23 },
      notes: { start: 33, end: 46, activeStart: 33 },
      think: { start: 48, end: 57, activeStart: 46 },
    }
  }
};

export default function BotanicalPlantSpecimenModal({ plant, onClose, plantImage }) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-display NCERT Observation Popup after 5 seconds of viewing the full-screen specimen
  useEffect(() => {
    setShowDetailPopup(false);
    const timer = setTimeout(() => {
      setShowDetailPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [plant]);

  const plantKey = (plant?.id || plant?.name || '').toLowerCase().replace(/\s+/g, '');
  const currentNarration = PLANT_NARRATIONS[plantKey] || null;
  const hasNarration = Boolean(currentNarration);
  const words = currentNarration ? currentNarration.words : [];

  const handleAudioEnd = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const {
    isPlaying: isSpeaking,
    activeWordIndex,
    toggle: toggleSpeech,
    pause: pauseSpeech,
    audioRef
  } = useWordSyncAudio(currentNarration ? currentNarration.audio : null, words, {
    autoPlay: false,
    onEnd: handleAudioEnd
  });

  const handleToggleNarration = () => {
    if (!hasNarration) return;
    if (isCompleted) {
      setIsCompleted(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
    toggleSpeech();
  };

  const handleClose = () => {
    pauseSpeech();
    onClose();
  };

  const stemSec = currentNarration?.sections?.stem;
  const leavesSec = currentNarration?.sections?.leaves;
  const flowersSec = currentNarration?.sections?.flowers;
  const notesSec = currentNarration?.sections?.notes;
  const thinkSec = currentNarration?.sections?.think;

  const isStemActive = isSpeaking && stemSec && activeWordIndex >= (stemSec.activeStart ?? (stemSec.start > 10 ? stemSec.start - 1 : stemSec.start)) && activeWordIndex < stemSec.end;
  const isLeavesActive = isSpeaking && leavesSec && activeWordIndex >= (leavesSec.activeStart ?? (leavesSec.start > 10 ? leavesSec.start - 1 : leavesSec.start)) && activeWordIndex < leavesSec.end;
  const isFlowersActive = isSpeaking && flowersSec && activeWordIndex >= (flowersSec.activeStart ?? flowersSec.start) && activeWordIndex < flowersSec.end;
  const isNotesActive = isSpeaking && notesSec && activeWordIndex >= (notesSec.activeStart ?? notesSec.start) && activeWordIndex < notesSec.end;
  const isThinkActive = isSpeaking && thinkSec && activeWordIndex >= (thinkSec.activeStart ?? (thinkSec.start > 20 ? thinkSec.start - 2 : thinkSec.start)) && activeWordIndex < thinkSec.end;

  const karaokeActiveStyle = {
    color: '#0F172A',
    background: 'linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)',
    padding: '1px 6px',
    borderRadius: '5px',
    fontWeight: 900,
    boxShadow: '0 0 16px rgba(253, 224, 71, 0.95), 0 2px 6px rgba(0, 0, 0, 0.85)',
    display: 'inline-block',
    transform: 'scale(1.06)'
  };

  const spokenStyle = {
    color: '#FFFFFF',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)'
  };

  const wordBaseStyle = {
    color: isSpeaking ? 'rgba(255, 255, 255, 0.8)' : '#FFFFFF'
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999999,
        background: '#04160E',
        overflow: 'hidden',
        fontFamily: '"Outfit", sans-serif',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {/* 1. Edge-to-Edge Fullscreen Specimen Image */}
      <img 
        src={plantImage} 
        alt={plant.name} 
        style={{ 
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'fill',
          display: 'block',
          zIndex: 1
        }} 
      />

      {/* 2. Bottom-Center Floating Control Pill */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(14px, 2.5vh, 22px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.45) 100%), rgba(2, 20, 12, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1.8px solid rgba(253, 230, 138, 0.60)',
        borderRadius: '32px',
        padding: '6px 14px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 24px rgba(245, 158, 11, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
        boxSizing: 'border-box'
      }}>
        {/* Back to Garden Button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#FFFBEB',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '24px',
            padding: '8px 22px',
            fontSize: '16px',
            fontWeight: 900,
            fontFamily: '"Outfit", sans-serif',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.borderColor = '#FEF08A';
            e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)';
            e.currentTarget.style.color = '#FFFBEB';
          }}
          title="Return to Botanical Garden"
        >
          <ChevronLeft size={18} strokeWidth={2.8} />
          <span>Back to Garden</span>
        </button>

        {/* Show / Hide Observations Button */}
        <button
          type="button"
          onClick={() => setShowDetailPopup(!showDetailPopup)}
          style={{
            background: showDetailPopup
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 48%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(4, 120, 87, 0.98) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            color: showDetailPopup ? '#FFFFFF' : '#FFFBEB',
            border: showDetailPopup
              ? '2px solid #6EE7B7'
              : '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '24px',
            padding: '8px 24px',
            fontSize: '16px',
            fontWeight: 900,
            fontFamily: '"Outfit", sans-serif',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: showDetailPopup
              ? '0 0 24px rgba(52, 211, 153, 0.85), 0 10px 30px rgba(0, 0, 0, 0.70), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)'
              : '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
            textShadow: showDetailPopup
              ? '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(110, 231, 183, 0.85)'
              : '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.borderColor = showDetailPopup ? '#A7F3D0' : '#FEF08A';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = showDetailPopup ? '#6EE7B7' : 'rgba(253, 230, 138, 0.85)';
            e.currentTarget.style.color = showDetailPopup ? '#FFFFFF' : '#FFFBEB';
          }}
          title={showDetailPopup ? 'Hide observations and view full specimen image' : 'Show botanical observation details'}
        >
          <span>{showDetailPopup ? '✕ Hide Observations' : '📋 Show Observations'}</span>
        </button>
      </div>

      {/* 3. Slogan Page Style Translucent Observation Popup */}
      {showDetailPopup && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(50vw, 650px)',
          minWidth: '330px',
          maxHeight: 'calc(100vh - clamp(60px, 8vh, 80px))',
          background: 'transparent',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          borderRadius: '24px',
          boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.25), inset -1px -1px 2px rgba(0, 0, 0, 0.3), 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(16, 185, 129, 0.2)',
          zIndex: 35,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {/* Glossy specular reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '34%',
              background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2,
              borderRadius: '24px 24px 0 0'
            }}
          />

          {/* Inner Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 'clamp(10px, 1.4vh, 16px) clamp(14px, 1.8vw, 22px)',
            gap: 'clamp(6px, 1vh, 10px)',
            position: 'relative',
            zIndex: 5,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {/* Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.2) 100%)',
                color: '#A7F3D0',
                border: '1.2px solid rgba(110, 231, 183, 0.45)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                padding: '4px 14px',
                borderRadius: '20px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                fontSize: '20px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🌿</span>
                <span>TABLE 2.1</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Play Button in Popup */}
                {hasNarration && (
                  <button
                    type="button"
                    onClick={handleToggleNarration}
                    aria-label={isSpeaking ? 'Pause' : (isCompleted ? 'Replay' : 'Play')}
                    title={isSpeaking ? 'Pause Narration' : (isCompleted ? 'Replay Narration' : 'Play Narration')}
                    style={{
                      background: isSpeaking
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      border: isSpeaking ? '1.5px solid #6EE7B7' : '1.5px solid #FDE68A',
                      boxShadow: isSpeaking
                        ? '0 0 16px rgba(16, 185, 129, 0.8), 0 2px 8px rgba(0,0,0,0.4)'
                        : '0 4px 14px rgba(217, 119, 6, 0.4)',
                      borderRadius: '16px',
                      padding: '4px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '15px',
                      fontFamily: '"Outfit", sans-serif',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = isSpeaking ? '#6EE7B7' : '#FDE68A';
                    }}
                  >
                    {isSpeaking ? (
                      <>
                        <Pause size={14} fill="#FFFFFF" />
                        <span>Pause</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <RefreshCw size={14} strokeWidth={2.8} />
                        <span>Replay</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowDetailPopup(false)}
                  title="Hide observations and view full specimen image"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1.2px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '12px',
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FEF3C7',
                    fontSize: '20px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.4)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#FEF3C7';
                  }}
                >
                  <span>✕ Close</span>
                </button>
              </div>
            </div>

            {/* Specimen Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.25) 100%)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                {plant.emoji}
              </div>
              <div>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '24px',
                  margin: 0,
                  color: '#FCD34D',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.85), 0 0 16px rgba(252, 211, 77, 0.5)'
                }}>
                  {plant.popupName || plant.name}
                </h3>
                <div style={{
                  fontSize: '18px',
                  color: '#6EE7B7',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  marginTop: '1px',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)'
                }}>
                  Botanical Field Specimen Record
                </div>
              </div>
            </div>

            {/* Info Panel: Botanical Observations */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(6px, 1vh, 10px)'
            }}>
              {/* 1. STEM */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isStemActive ? '5px solid #F59E0B' : '4px solid #10B981',
                background: isStemActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isStemActive ? '0 12px 12px 0' : '0px',
                padding: isStemActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isStemActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isStemActive ? '#FDE047' : '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🌱 STEM</span>
                </div>
                <div style={{
                  fontSize: '20px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.85)'
                }}>
                  {hasNarration && stemSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(stemSec.start, stemSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={stemSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    plant.tableInfo?.stem || '—'
                  )}
                </div>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* 2. LEAVES */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isLeavesActive ? '5px solid #F59E0B' : '4px solid #34D399',
                background: isLeavesActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isLeavesActive ? '0 12px 12px 0' : '0px',
                padding: isLeavesActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isLeavesActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isLeavesActive ? '#FDE047' : '#A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🍃 LEAVES</span>
                </div>
                <div style={{
                  fontSize: '20px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.85)'
                }}>
                  {hasNarration && leavesSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(leavesSec.start, leavesSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={leavesSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    plant.tableInfo?.leaves || '—'
                  )}
                </div>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* 3. FLOWERS */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isFlowersActive ? '5px solid #F59E0B' : '4px solid #F472B6',
                background: isFlowersActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isFlowersActive ? '0 12px 12px 0' : '0px',
                padding: isFlowersActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isFlowersActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isFlowersActive ? '#FDE047' : '#FBCFE8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🌸 FLOWERS</span>
                </div>
                <div style={{
                  fontSize: '20px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.85)'
                }}>
                  {hasNarration && flowersSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(flowersSec.start, flowersSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={flowersSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    plant.tableInfo?.flowers || '—'
                  )}
                </div>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* 4. OTHER OBSERVATIONS */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isNotesActive ? '5px solid #F59E0B' : '4px solid #3B82F6',
                background: isNotesActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isNotesActive ? '0 12px 12px 0' : '0px',
                padding: isNotesActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isNotesActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isNotesActive ? '#FDE047' : '#93C5FD',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>📖 OTHER OBSERVATIONS</span>
                </div>
                <div style={{
                  fontSize: '20px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.85)'
                }}>
                  {hasNarration && notesSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(notesSec.start, notesSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={notesSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    plant.tableInfo?.notes || '—'
                  )}
                </div>
              </div>

              {/* 5. THINK QUESTION */}
              {(plant.tableInfo?.think || (plant.id === 'sunflower' ? 'Do mature sunflower heads keep following the sun?' : (plant.id === 'rose' ? 'How is a compound leaf different from a simple leaf?' : (plant.id === 'hibiscus' ? 'What makes hibiscus a shrub?' : (plant.id === 'tulsi' ? 'What does “aromatic” tell us about tulsi leaves?' : (plant.id === 'neem' ? 'Which features help you identify neem as a tree?' : (plant.id === 'grass' ? 'What pattern can you see in the leaf veins?' : null))))))) && (
                <>
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    borderLeft: isThinkActive ? '5px solid #FDE047' : '4px solid #F59E0B',
                    paddingLeft: '10px',
                    background: isThinkActive ? 'rgba(245, 158, 11, 0.28)' : 'rgba(245, 158, 11, 0.12)',
                    borderRadius: '0 10px 10px 0',
                    padding: '6px 10px 8px 10px',
                    boxShadow: isThinkActive ? '0 0 22px rgba(253, 224, 71, 0.5)' : 'none',
                    transition: 'all 0.25s ease'
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#FDE047',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)',
                      lineHeight: 1.15
                    }}>
                      <span>💡 Think:</span>
                    </div>
                    <div style={{
                      fontSize: '20px',
                      color: '#FEF9C3',
                      fontWeight: 600,
                      lineHeight: 1.35,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
                    }}>
                      {hasNarration && thinkSec ? (
                        <NarratedWords
                          words={currentNarration.words.slice(thinkSec.start, thinkSec.end)}
                          activeIndex={activeWordIndex}
                          baseIndex={thinkSec.start}
                          activeStyle={karaokeActiveStyle}
                          spokenStyle={spokenStyle}
                          wordStyle={wordBaseStyle}
                        />
                      ) : (
                        plant.tableInfo?.think || (plant.id === 'sunflower' ? 'Do mature sunflower heads keep following the sun?' : (plant.id === 'rose' ? 'How is a compound leaf different from a simple leaf?' : (plant.id === 'hibiscus' ? 'What makes hibiscus a shrub?' : (plant.id === 'tulsi' ? 'What does “aromatic” tell us about tulsi leaves?' : (plant.id === 'neem' ? 'Which features help you identify neem as a tree?' : (plant.id === 'grass' ? 'What pattern can you see in the leaf veins?' : null))))))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
