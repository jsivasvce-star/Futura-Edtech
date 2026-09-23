import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './MagneticCompass.css';

const MATSYA_YANTRA_TEXT = "Ancient Indian sailors navigated open seas using a magnetized iron fish called Matsya-yantra floating in oil. Just like modern compasses, it aligned with Earth's magnetic poles to guide ships safely even under cloudy skies.";

export default function DidYouKnow() {
  const { speak, stop, isPlaying, spokenCharIndex } = useHybridVoice();

  const ELEVENLABS_DID_YOU_KNOW_VOICE_ID = ELEVENLABS_VOICES?.did_you_know || 'nPczCjzI2devNBz1zQrb';

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleToggleSpeak = () => {
    if (isPlaying) {
      stop();
    } else {
      speak({
        text: `Matsya Yantra: India's Ancient Compass! ${MATSYA_YANTRA_TEXT}`,
        voiceId: ELEVENLABS_DID_YOU_KNOW_VOICE_ID,
        role: 'did_you_know'
      });
    }
  };

  const renderHighlightedSpeech = (fullText, currentlyPlaying, charIndex) => {
    if (!currentlyPlaying || charIndex === undefined || charIndex === null || charIndex < 0) {
      return <span>{fullText}</span>;
    }

    const titleOffset = 42; // offset for "Matsya Yantra: India's Ancient Compass! "
    const adjustedIndex = charIndex - titleOffset;
    const words = fullText.split(' ');
    let currentPos = 0;

    return words.map((word, i) => {
      const startPos = currentPos;
      const endPos = currentPos + word.length;
      currentPos = endPos + 1;

      const isCurrentWord = adjustedIndex >= startPos && adjustedIndex <= endPos + 2;

      return (
        <span
          key={i}
          style={{
            color: isCurrentWord ? '#B45309' : 'darkblue',
            backgroundColor: isCurrentWord ? '#FEF3C7' : 'transparent',
            borderRadius: isCurrentWord ? '6px' : '0',
            padding: isCurrentWord ? '0 4px' : '0',
            fontWeight: 900,
            transition: 'all 0.1s ease',
            display: 'inline-block',
            marginRight: '0.38rem'
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.4rem 0.6rem',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Full-width Centered Image Container */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A'
      }}>
        {/* Full-span Centered Sunset Ship Artwork */}
        <img
          src="/MagneticCompass/matsya_yantra.jpg"
          alt="Matsya Yantra: India's Ancient Compass"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />

        {/* Bottom Overlay Container - 2 Lines with 2x Text Size */}
        <div style={{
          position: 'absolute',
          bottom: '1.1rem',
          left: '1.2rem',
          right: '1.2rem',
          background: '#FFFFFF',
          border: '2px solid #000000',
          borderRadius: '18px',
          padding: '1.1rem 1.6rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxSizing: 'border-box'
        }}>
          {/* Header Row with Title & Audio Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'darkblue',
              fontSize: '1.65rem',
              fontWeight: 900,
              letterSpacing: '-0.01em'
            }}>
              <span style={{ fontSize: '1.75rem' }}>🧭</span>
              <span>Matsya Yantra: India's Ancient Compass!</span>
            </div>

            {/* Audio Listen Button */}
            <button
              onClick={handleToggleSpeak}
              title={isPlaying ? 'Stop Audio' : 'Listen to story'}
              style={{
                background: isPlaying ? 'darkblue' : '#FFFFFF',
                border: '2px solid darkblue',
                borderRadius: '12px',
                padding: '0.4rem 1rem',
                color: isPlaying ? '#FFFFFF' : 'darkblue',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '1rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 139, 0.2)',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
            >
              {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{isPlaying ? 'Stop' : 'Listen'}</span>
            </button>
          </div>

          {/* 2-Line High-Impact Text (2x font size) */}
          <div style={{
            fontSize: '1.75rem',
            lineHeight: '1.42',
            color: 'darkblue',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            <p style={{ margin: 0 }}>
              {renderHighlightedSpeech(
                "Ancient Indian sailors navigated open seas using a magnetized iron fish called Matsya-yantra floating in oil.",
                isPlaying,
                spokenCharIndex
              )}
            </p>
            <p style={{ margin: 0 }}>
              {renderHighlightedSpeech(
                "Just like modern compasses, it aligned with Earth's magnetic poles to guide ships safely even under cloudy skies.",
                isPlaying,
                spokenCharIndex
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
