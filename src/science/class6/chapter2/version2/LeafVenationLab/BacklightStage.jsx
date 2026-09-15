import React, { useState, useRef } from 'react';
import { venationAudio } from './venationAudio';

export default function BacklightStage({ leaf }) {
  const containerRef = useRef(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [intensity, setIntensity] = useState('high'); // 'high' | 'ultra' | 'off'

  const handlePointerMove = (e) => {
    if (!containerRef.current || intensity === 'off') return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = Math.max(15, Math.min(85, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((clientY - rect.top) / rect.height) * 100));

    setLightPos({ x, y });
  };

  const toggleIntensity = () => {
    venationAudio.playSwitch();
    setIntensity(prev => {
      if (prev === 'off') return 'high';
      if (prev === 'high') return 'ultra';
      return 'off';
    });
  };

  const isLit = intensity !== 'off';
  const lightRadius = intensity === 'ultra' ? 240 : 170;
  const glowOpacity = intensity === 'ultra' ? 0.95 : 0.75;

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => isDragging && handlePointerMove(e)}
      onTouchMove={(e) => handlePointerMove(e)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
        background: isLit
          ? 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)'
          : 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(240,248,242,0.6) 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(20, 69, 47, 0.25)',
        transition: 'background 0.4s ease'
      }}
    >
      {/* Light Source / Sunbeam Transillumination Orb */}
      {isLit && (
        <div
          style={{
            position: 'absolute',
            left: `${lightPos.x}%`,
            top: `${lightPos.y}%`,
            width: `${lightRadius * 2}px`,
            height: `${lightRadius * 2}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(245, 158, 11, 0.65) 45%, rgba(245, 158, 11, 0.15) 70%, transparent 85%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: glowOpacity,
            transition: 'width 0.3s, height 0.3s, opacity 0.3s'
          }}
        />
      )}

      {/* Leaf Specimen Stage - Full Width & Height */}
      <img
        src={leaf.image}
        alt={leaf.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '14px',
          filter: isLit
            ? (intensity === 'ultra'
                ? 'brightness(1.35) contrast(1.35) drop-shadow(0 0 45px rgba(253, 224, 71, 0.9))'
                : 'brightness(1.2) contrast(1.2) drop-shadow(0 0 28px rgba(251, 191, 36, 0.75))')
            : 'brightness(0.92) contrast(1.05)',
          transform: isLit ? 'scale(1.02)' : 'scale(1)',
          transition: 'filter 0.35s ease, transform 0.35s ease',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* Dynamic vascular glowing veins highlight */}
      {isLit && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            zIndex: 4,
            opacity: intensity === 'ultra' ? 0.7 : 0.45,
            background: 'radial-gradient(circle at center, rgba(255, 255, 200, 0.8) 0%, transparent 75%)'
          }}
        />
      )}

      {/* Draggable Torch Puck Indicator */}
      {isLit && (
        <div
          style={{
            position: 'absolute',
            left: `${lightPos.x}%`,
            top: `${lightPos.y}%`,
            width: '42px',
            height: '42px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2.5px solid #FEF08A',
            background: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 0 15px #FDE047, inset 0 0 8px #F59E0B',
            zIndex: 6,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '18px'
          }}
        >
          💡
        </div>
      )}

      {/* Top Floating Controls */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <button
          onClick={toggleIntensity}
          style={{
            background: isLit ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#FAF8F2',
            color: isLit ? '#FFFFFF' : '#14452F',
            border: '2px solid #D97706',
            borderRadius: '12px',
            padding: '6px 14px',
            fontSize: '16px',
            fontWeight: '900',
            fontFamily: '"Outfit", sans-serif',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{intensity === 'off' ? '🔦 Turn On Backlight' : (intensity === 'ultra' ? '☀️ Max Sunlight' : '💡 Backlight Active')}</span>
        </button>
      </div>

    </div>
  );
}
