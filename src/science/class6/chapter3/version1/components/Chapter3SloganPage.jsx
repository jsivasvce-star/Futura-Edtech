import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../../services/elevenLabsService';
import sloganBgImage from '../assets/chapter3_slogan_bg.png';

export default function Chapter3SloganPage({ onBack, onEnterLab }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const toggleSloganAudio = () => {
    if (isPlayingAudio) {
      stopNarration();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const speechText = "Koharuk? Koharuk? Koharuk? Hitabhuk, Mitabhuk, Ritubhuk! Who is healthy? Who is healthy? Who is healthy? One who eats food that is wholesome, one who eats in moderate quantities, and one who eats food appropriate for the season, time, and place.";

    speakNaturalIndianMale({
      text: speechText,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleNext = () => {
    stopNarration();
    setIsPlayingAudio(false);
    if (onEnterLab) onEnterLab();
  };

  const handleBack = () => {
    stopNarration();
    setIsPlayingAudio(false);
    if (onBack) onBack();
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#03140F',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Full-Screen Background Image (The Slogan & Healthy Living Scene) */}
      <img
        src={sloganBgImage}
        alt="Chapter 3 Slogan: Koharuk? Hitabhuk, Mitabhuk, Ritubhuk"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Subtle Bottom Gradient Vignette to Enhance Button Readability */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Top Right: Voice Over Narration Button */}
      <button
        type="button"
        onClick={toggleSloganAudio}
        style={{
          position: 'absolute',
          top: 'clamp(18px, 3vw, 36px)',
          right: 'clamp(18px, 3vw, 36px)',
          zIndex: 30,
          color: isPlayingAudio ? '#ffffff' : '#000000',
          background: isPlayingAudio ? '#10b981' : '#fbbf24',
          padding: '8px 18px',
          borderRadius: '8px',
          fontWeight: '800',
          boxShadow: isPlayingAudio 
            ? '0 0 20px rgba(16, 185, 129, 0.8), 0 4px 15px rgba(0,0,0,0.4)' 
            : '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(251, 191, 36, 0.4)',
          border: isPlayingAudio ? '1px solid #059669' : '1px solid #f59e0b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: 'clamp(12px, 1.2vw, 14px)',
          transition: 'all 0.2s ease',
        }}
        title={isPlayingAudio ? "Stop Audio" : "Listen to Shloka Recitation"}
      >
        {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span>{isPlayingAudio ? 'Stop Voice' : 'Voice Over'}</span>
      </button>

      {/* Bottom Left Corner: Back Button */}
      <button
        type="button"
        onClick={handleBack}
        onMouseEnter={() => setIsBackHovered(true)}
        onMouseLeave={() => setIsBackHovered(false)}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 3vw, 36px)',
          left: 'clamp(20px, 3vw, 36px)',
          zIndex: 30,
          color: '#000000',
          background: isBackHovered ? '#f59e0b' : '#fbbf24',
          padding: '12px 28px',
          borderRadius: '12px',
          fontWeight: '800',
          boxShadow: isBackHovered
            ? '0 8px 25px rgba(0, 0, 0, 0.7), 0 0 20px rgba(251, 191, 36, 0.6)'
            : '0 4px 16px rgba(0, 0, 0, 0.6), 0 0 12px rgba(251, 191, 36, 0.35)',
          border: '2px solid #f59e0b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          transform: isBackHovered ? 'translateY(-2px) scale(1.02)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Bottom Right Corner: Next Button */}
      <button
        type="button"
        onClick={handleNext}
        onMouseEnter={() => setIsNextHovered(true)}
        onMouseLeave={() => setIsNextHovered(false)}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 3vw, 36px)',
          right: 'clamp(20px, 3vw, 36px)',
          zIndex: 30,
          color: '#000000',
          background: isNextHovered
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          padding: '12px 32px',
          borderRadius: '12px',
          fontWeight: '800',
          boxShadow: isNextHovered
            ? '0 8px 25px rgba(245, 158, 11, 0.6), 0 0 25px rgba(251, 191, 36, 0.6)'
            : '0 4px 16px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.45)',
          border: '2px solid #f59e0b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          transform: isNextHovered ? 'translateY(-2px) scale(1.03)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <span>Next</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
