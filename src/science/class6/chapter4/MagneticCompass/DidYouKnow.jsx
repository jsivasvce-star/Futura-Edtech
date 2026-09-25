import React from 'react';
import './MagneticCompass.css';

export default function DidYouKnow() {
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

        {/* Bottom Overlay Container - Exactly 2 Lines with Enlarged Bold Text */}
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
          justifyContent: 'center',
          gap: '0.35rem',
          boxSizing: 'border-box'
        }}>
          <p style={{
            margin: 0,
            fontSize: '1.75rem',
            lineHeight: '1.38',
            color: '#173B5F',
            fontWeight: 900,
            letterSpacing: '-0.015em',
            textAlign: 'left'
          }}>
            Matsya Yantra: India's Ancient Compass! Ancient Indian sailors navigated open seas using a magnetized iron fish called Matsya-yantra floating in oil.
          </p>
          <p style={{
            margin: 0,
            fontSize: '1.75rem',
            lineHeight: '1.38',
            color: '#173B5F',
            fontWeight: 900,
            letterSpacing: '-0.015em',
            textAlign: 'left'
          }}>
            Just like modern compasses, it aligned with Earth's magnetic poles to guide ships safely even under cloudy skies.
          </p>
        </div>
      </div>
    </div>
  );
}
