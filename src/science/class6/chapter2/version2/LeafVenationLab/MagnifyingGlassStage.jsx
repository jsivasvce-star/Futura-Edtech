import React, { useState, useRef, useEffect } from 'react';
import { venationAudio } from './venationAudio';

export default function MagnifyingGlassStage({ leaf, isLight }) {
  const containerRef = useRef(null);
  const [lensState, setLensState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isReady: false
  });
  const [zoom, setZoom] = useState(2.8); // 2.0x, 2.8x, 4.0x
  const [isDragging, setIsDragging] = useState(false);

  // Initialize lens position to center of stage once container is measured
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLensState({
      x: rect.width * 0.5,
      y: rect.height * 0.5,
      width: rect.width,
      height: rect.height,
      isReady: true
    });
  }, [leaf.id]);

  const updatePosition = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    const x = Math.max(20, Math.min(rect.width - 20, rawX));
    const y = Math.max(20, Math.min(rect.height - 20, rawY));

    setLensState(prev => ({
      ...prev,
      x,
      y,
      width: rect.width,
      height: rect.height,
      isReady: true
    }));
    venationAudio.playLoupeMove();
  };

  const handlePointerMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    updatePosition(clientX, clientY);
  };

  const lensRadius = 95; // 190px diameter

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        userSelect: 'none',
        cursor: 'none', // Hide standard cursor inside the stage for realistic lens tracking
        overflow: 'hidden',
        background: '#0F172A',
        borderRadius: '16px',
        border: '2px solid #14452F',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.35)'
      }}
    >
      {/* Full-width Edge-to-Edge Base Leaf Specimen (ZERO blank space) */}
      <img
        src={leaf.image}
        alt={leaf.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          borderRadius: '14px',
          filter: 'brightness(0.96) contrast(1.05)'
        }}
      />

      {/* Subtle vignette border around stage for realistic microscope / lightbox table feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
        pointerEvents: 'none',
        borderRadius: '14px'
      }} />

      {/* Top Floating Zoom Controls */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '14px',
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(20, 69, 47, 0.94)',
        padding: '6px 12px',
        borderRadius: '14px',
        border: '1.8px solid #10B981',
        boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
      }}>
        <span style={{ fontSize: '18px', color: '#D1FAE5', fontWeight: '900', marginRight: '4px' }}>
          Zoom:
        </span>
        {[
          { level: 2.0, label: '2.0×' },
          { level: 2.8, label: '2.8×' },
          { level: 3.8, label: '3.8×' }
        ].map(opt => (
          <button
            key={opt.level}
            onClick={(e) => {
              e.stopPropagation();
              setZoom(opt.level);
              venationAudio.playSwitch();
            }}
            style={{
              background: zoom === opt.level ? '#F59E0B' : 'rgba(255,255,255,0.12)',
              color: zoom === opt.level ? '#000000' : '#FFFFFF',
              border: zoom === opt.level ? '1.5px solid #FCD34D' : '1px solid transparent',
              borderRadius: '8px',
              padding: '4px 12px',
              fontSize: '18px',
              fontWeight: '900',
              fontFamily: '"Outfit", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ==================== HIGH-DEFINITION BRASS MAGNIFYING LOUPE ==================== */}
      {lensState.isReady && (
        <div
          style={{
            position: 'absolute',
            left: `${lensState.x}px`,
            top: `${lensState.y}px`,
            width: `${lensRadius * 2}px`,
            height: `${lensRadius * 2}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 16px 36px rgba(0,0,0,0.55), inset 0 0 20px rgba(0,0,0,0.45)',
            border: '6px solid #D97706', // Outer brass frame
            outline: '3px solid #78350F', // Inner rim bevel
            zIndex: 20,
            pointerEvents: 'none',
            background: '#0B291A'
          }}
        >
          {/* Magnified High-Fidelity Leaf Image */}
          <img
            src={leaf.image}
            alt=""
            style={{
              position: 'absolute',
              left: `${lensRadius - zoom * lensState.x}px`,
              top: `${lensRadius - zoom * lensState.y}px`,
              width: `${zoom * lensState.width}px`,
              height: `${zoom * lensState.height}px`,
              objectFit: 'cover',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              filter: 'contrast(1.35) brightness(1.18) saturate(1.2)', // Makes xylem & phloem veins jump out
              transformOrigin: 'top left'
            }}
          />

          {/* Micro-capillary vascular contrast booster */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            background: leaf.venation === 'reticulate'
              ? 'radial-gradient(circle at center, rgba(16,185,129,0.3) 0%, transparent 70%)'
              : 'linear-gradient(90deg, transparent 35%, rgba(16,185,129,0.35) 50%, transparent 65%)'
          }} />

          {/* Realistic Optical Glass Reflection & Curved Glare */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          {/* Chromatic Edge Aberration Ring */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 16px rgba(56, 189, 248, 0.35), inset 0 0 28px rgba(0,0,0,0.5)',
            pointerEvents: 'none'
          }} />

          {/* Precision Optical Reticle (Crosshairs & Tick Marks) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '15px',
            right: '15px',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.55)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '15px',
            bottom: '15px',
            width: '1px',
            background: 'rgba(255, 255, 255, 0.55)',
            pointerEvents: 'none'
          }} />

          {/* Center Target Ring */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '36px',
            height: '36px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1.5px dashed rgba(255, 255, 255, 0.75)',
            pointerEvents: 'none'
          }} />
        </div>
      )}

      {/* Ergonomic Brass & Wood Handle extending from the loupe */}
      {lensState.isReady && (
        <div
          style={{
            position: 'absolute',
            left: `${lensState.x}px`,
            top: `${lensState.y}px`,
            width: '20px',
            height: '95px',
            transform: 'translate(56px, 56px) rotate(45deg)',
            background: 'linear-gradient(90deg, #451A03 0%, #78350F 25%, #B45309 50%, #78350F 75%, #451A03 100%)',
            borderRadius: '8px',
            boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
            border: '2px solid #D97706',
            zIndex: 19,
            pointerEvents: 'none'
          }}
        >
          {/* Brass Ferrule Ring */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '16px',
            background: 'linear-gradient(90deg, #D97706 0%, #FDE68A 50%, #D97706 100%)',
            borderBottom: '1px solid #78350F'
          }} />
        </div>
      )}
    </div>
  );
}
