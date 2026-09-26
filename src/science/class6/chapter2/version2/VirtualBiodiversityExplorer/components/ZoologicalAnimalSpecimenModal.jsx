import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Play, Pause, RefreshCw } from 'lucide-react';
import useWordSyncAudio from '../../narration/useWordSyncAudio';
import NarratedWords from '../../narration/NarratedWords';

import sparrowNarrationAudio from '../../narration/audio/Sparrow.mp3';
import sparrowNarrationData from '../../narration/sparrowNarration.json';

import squirrelNarrationAudio from '../../narration/audio/Squirrel.mp3';
import squirrelNarrationData from '../../narration/squirrelNarration.json';

import butterflyNarrationAudio from '../../narration/audio/Butterfly.mp3';
import butterflyNarrationData from '../../narration/butterflyNarration.json';

import frogNarrationAudio from '../../narration/audio/Frog.mp3';
import frogNarrationData from '../../narration/frogNarration.json';

import cowNarrationAudio from '../../narration/audio/Cow.mp3';
import cowNarrationData from '../../narration/cowNarration.json';

import crowNarrationAudio from '../../narration/audio/Crow.mp3';
import crowNarrationData from '../../narration/crowNarration.json';

const frogNarrationConfig = {
  audio: frogNarrationAudio,
  words: frogNarrationData.frog.words,
  sections: {
    habitat: { start: 7, end: 15, activeStart: 0 },
    movement: { start: 15, end: 27, activeStart: 15 },
    adaptations: { start: 27, end: 45, activeStart: 27 },
    think: { start: 47, end: 55, activeStart: 45 },
  }
};

const ANIMAL_NARRATIONS = {
  sparrow: {
    audio: sparrowNarrationAudio,
    words: sparrowNarrationData.sparrow.words,
    sections: {
      habitat: { start: 9, end: 18, activeStart: 4 },
      movement: { start: 19, end: 29, activeStart: 18 },
      adaptations: { start: 30, end: 49, activeStart: 29 },
      think: { start: 51, end: 60, activeStart: 49 },
    }
  },
  squirrel: {
    audio: squirrelNarrationAudio,
    words: squirrelNarrationData.squirrel.words,
    sections: {
      habitat: { start: 9, end: 17, activeStart: 4 },
      movement: { start: 18, end: 23, activeStart: 17 },
      adaptations: { start: 24, end: 37, activeStart: 23 },
      think: { start: 39, end: 47, activeStart: 37 },
    }
  },
  butterfly: {
    audio: butterflyNarrationAudio,
    words: butterflyNarrationData.butterfly.words,
    sections: {
      habitat: { start: 6, end: 13, activeStart: 0 },
      movement: { start: 14, end: 22, activeStart: 13 },
      adaptations: { start: 22, end: 41, activeStart: 22 },
      think: { start: 43, end: 51, activeStart: 41 },
    }
  },
  frog: frogNarrationConfig,
  indianpondfrog: frogNarrationConfig,
  cow: {
    audio: cowNarrationAudio,
    words: cowNarrationData.cow.words,
    sections: {
      habitat: { start: 9, end: 15, activeStart: 0 },
      movement: { start: 16, end: 26, activeStart: 15 },
      adaptations: { start: 26, end: 44, activeStart: 26 },
      think: { start: 46, end: 54, activeStart: 44 },
    }
  },
  crow: {
    audio: crowNarrationAudio,
    words: crowNarrationData.crow.words,
    sections: {
      habitat: { start: 9, end: 17, activeStart: 0 },
      movement: { start: 18, end: 28, activeStart: 17 },
      adaptations: { start: 30, end: 40, activeStart: 28 },
      feeding: { start: 43, end: 49, activeStart: 40 },
      think: { start: 51, end: 59, activeStart: 49 },
    }
  }
};

export default function ZoologicalAnimalSpecimenModal({ animal, onClose, animalImage, ncertRecord }) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-display NCERT Observation Popup after 5 seconds of viewing the full-screen specimen
  useEffect(() => {
    setShowDetailPopup(false);
    const timer = setTimeout(() => {
      setShowDetailPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [animal]);

  const animalKey = (animal?.id || animal?.name || '').toLowerCase().replace(/\s+/g, '');
  const currentNarration = ANIMAL_NARRATIONS[animalKey] || null;
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
        audioRef.current.play().catch(console.error);
      }
      return;
    }
    toggleSpeech();
  };

  const habitatSec = currentNarration?.sections?.habitat;
  const movementSec = currentNarration?.sections?.movement;
  const adaptationsSec = currentNarration?.sections?.adaptations;
  const feedingSec = currentNarration?.sections?.feeding;
  const thinkSec = currentNarration?.sections?.think;

  const isHabitatActive = isSpeaking && habitatSec && activeWordIndex >= (habitatSec.activeStart ?? habitatSec.start) && activeWordIndex < habitatSec.end;
  const isMovementActive = isSpeaking && movementSec && activeWordIndex >= (movementSec.activeStart ?? movementSec.start) && activeWordIndex < movementSec.end;
  const isAdaptationsActive = isSpeaking && adaptationsSec && activeWordIndex >= (adaptationsSec.activeStart ?? adaptationsSec.start) && activeWordIndex < adaptationsSec.end;
  const isFeedingActive = isSpeaking && feedingSec && activeWordIndex >= (feedingSec.activeStart ?? feedingSec.start) && activeWordIndex < feedingSec.end;
  const isThinkActive = isSpeaking && thinkSec && activeWordIndex >= (thinkSec.activeStart ?? thinkSec.start) && activeWordIndex < thinkSec.end;

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

  const habitatText = ncertRecord?.habitat || ncertRecord?.whereFound || animal.category || 'Surrounding habitat';
  const movementText = ncertRecord?.movement || 'Active natural movement';
  const adaptationText = ncertRecord?.adaptations || 'Specialized body adaptations';
  const feedingText = ncertRecord?.feeding || null;
  const thinkText = ncertRecord?.think || (animal.id === 'sparrow' ? 'How does the sparrow’s beak help it eat seeds?' : (animal.id === 'squirrel' ? 'Which features help a squirrel climb and balance?' : (animal.id === 'butterfly' ? 'Which body part helps a butterfly drink nectar?' : (animal.id === 'frog' || animal.id === 'indian pond frog' ? 'How do webbed feet help a frog swim?' : (animal.id === 'cow' ? 'Why does a cow need broad grinding teeth?' : (animal.id === 'crow' ? 'How does the crow’s beak help it feed?' : null))))));

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
        src={animalImage} 
        alt={animal.name} 
        style={{ 
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          zIndex: 1,
          filter: 'contrast(1.04) brightness(1.02)'
        }} 
      />

      {/* Cinematic Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 35% 50%, transparent 45%, rgba(4, 22, 14, 0.45) 85%, rgba(2, 14, 9, 0.72) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />

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
        padding: '6px 12px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 24px rgba(245, 158, 11, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
        boxSizing: 'border-box'
      }}>
        {/* Back to Animals Button */}
        <button
          type="button"
          onClick={() => {
            if (isSpeaking) pauseSpeech();
            onClose();
          }}
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#FFFBEB',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '24px',
            padding: '8px 24px',
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
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
            e.currentTarget.style.color = '#FFFBEB';
          }}
          title="Return to Zoological Field Scanner"
        >
          <ChevronLeft size={18} strokeWidth={2.8} />
          <span>Back to Animals</span>
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
          title={showDetailPopup ? 'Hide observations and view full specimen image' : 'Show zoological observation details'}
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
          width: 'min(48vw, 620px)',
          minWidth: '320px',
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
                <span>🐾</span>
                <span>TABLE 2.2</span>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Play / Pause / Replay Narration Button in Header */}
                {hasNarration && (
                  <button
                    type="button"
                    onClick={handleToggleNarration}
                    title={isSpeaking ? 'Pause narration' : (isCompleted ? 'Replay narration' : 'Play narration')}
                    style={{
                      background: isSpeaking 
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.85) 0%, rgba(185, 28, 28, 0.95) 100%)' 
                        : (isCompleted 
                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(29, 78, 216, 0.95) 100%)' 
                            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.90) 0%, rgba(217, 119, 6, 0.98) 100%)'),
                      border: '1.2px solid rgba(255, 255, 255, 0.45)',
                      borderRadius: '12px',
                      padding: '4px 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#FFFFFF',
                      fontSize: '18px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {isSpeaking ? (
                      <>
                        <Pause size={16} strokeWidth={2.8} />
                        <span>Pause</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <RefreshCw size={16} strokeWidth={2.8} />
                        <span>Replay</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} strokeWidth={2.8} fill="#FFFFFF" />
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

            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.25) 100%)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                {animal.emoji}
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
                  {animal.popupName || animal.name}
                </h3>
                <div style={{
                  fontSize: '20px',
                  color: '#6EE7B7',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  marginTop: '1px',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)'
                }}>
                  Zoological Field Specimen Record
                </div>
              </div>
            </div>

            {/* Observation Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(6px, 1vh, 10px)'
            }}>
              {/* 1. WHERE FOUND */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isHabitatActive ? '5px solid #F59E0B' : '4px solid #10B981',
                background: isHabitatActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isHabitatActive ? '0 12px 12px 0' : '0px',
                padding: isHabitatActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isHabitatActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isHabitatActive ? '#FDE047' : '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🏡 WHERE FOUND</span>
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
                  {hasNarration && habitatSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(habitatSec.start, habitatSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={habitatSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    habitatText
                  )}
                </div>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* 2. MOVEMENT */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isMovementActive ? '5px solid #F59E0B' : '4px solid #34D399',
                background: isMovementActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isMovementActive ? '0 12px 12px 0' : '0px',
                padding: isMovementActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isMovementActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isMovementActive ? '#FDE047' : '#A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🐾 MOVEMENT</span>
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
                  {hasNarration && movementSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(movementSec.start, movementSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={movementSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    movementText
                  )}
                </div>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />

              {/* 3. BODY ADAPTATIONS */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                borderLeft: isAdaptationsActive ? '5px solid #F59E0B' : '4px solid #F472B6',
                background: isAdaptationsActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                borderRadius: isAdaptationsActive ? '0 12px 12px 0' : '0px',
                padding: isAdaptationsActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                boxShadow: isAdaptationsActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                transition: 'all 0.25s ease'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isAdaptationsActive ? '#FDE047' : '#FBCFE8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: '"Outfit", sans-serif',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineHeight: 1.15
                }}>
                  <span>🔬 {animalKey === 'crow' ? 'BODY FEATURES' : 'BODY ADAPTATIONS'}</span>
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
                  {hasNarration && adaptationsSec ? (
                    <NarratedWords
                      words={currentNarration.words.slice(adaptationsSec.start, adaptationsSec.end)}
                      activeIndex={activeWordIndex}
                      baseIndex={adaptationsSec.start}
                      activeStyle={karaokeActiveStyle}
                      spokenStyle={spokenStyle}
                      wordStyle={wordBaseStyle}
                    />
                  ) : (
                    adaptationText
                  )}
                </div>
              </div>

              {/* 4. FEEDING (if present, e.g. Crow) */}
              {feedingText && (
                <>
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.02) 100%)' }} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    borderLeft: isFeedingActive ? '5px solid #F59E0B' : '4px solid #3B82F6',
                    background: isFeedingActive ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.20) 0%, rgba(245, 158, 11, 0.04) 100%)' : 'transparent',
                    borderRadius: isFeedingActive ? '0 12px 12px 0' : '0px',
                    padding: isFeedingActive ? '6px 10px 8px 12px' : '2px 0 2px 10px',
                    boxShadow: isFeedingActive ? '0 0 18px rgba(245, 158, 11, 0.35)' : 'none',
                    transition: 'all 0.25s ease'
                  }}>
                    <div style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: isFeedingActive ? '#FDE047' : '#93C5FD',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                      lineHeight: 1.15
                    }}>
                      <span>🍽️ FEEDING</span>
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
                      {hasNarration && feedingSec ? (
                        <NarratedWords
                          words={currentNarration.words.slice(feedingSec.start, feedingSec.end)}
                          activeIndex={activeWordIndex}
                          baseIndex={feedingSec.start}
                          activeStyle={karaokeActiveStyle}
                          spokenStyle={spokenStyle}
                          wordStyle={wordBaseStyle}
                        />
                      ) : (
                        feedingText
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* 5. THINK QUESTION */}
              {thinkText && (
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
                        thinkText
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
