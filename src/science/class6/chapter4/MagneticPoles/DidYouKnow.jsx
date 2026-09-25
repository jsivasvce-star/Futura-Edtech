import React from 'react';
import './MagneticPoles.css';

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
        {/* Full-span Centered Earth Magnetism & Poles Artwork */}
        <img
          src="/MagneticPoles/did_you_know_earth_magnetism.jpg"
          alt="Earth Magnetic Field and Magnetic Poles"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />

        {/* Ambient Dark Gradient on Bottom for Rich Visual Contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 45%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* Bottom Overlay Container - Single Page Overlaid Card */}
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
            Earth is a Giant Magnet: Earth itself acts like a gigantic magnet with its own magnetic field. This invisible shield protects our planet from cosmic particles and directs magnetic compass needles.
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
            Poles Always Exist in Pairs: Magnetic poles cannot exist in isolation. When a magnet is broken into pieces, each piece instantly develops its own North and South pole, with attraction always concentrated at the ends.
          </p>
        </div>
      </div>
    </div>
  );
}
