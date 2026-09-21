import React, { useState, useRef, useEffect } from 'react';
import { rootLabAudio } from './rootLabAudio';
import ch2RootSystemsMacro from '../../../../../assets/ch2_root_systems_macro.jpg';

// Ultra-Realistic 3D Stainless Steel Garden Trowel with Turned Beechwood Handle
const RealisticTrowel = ({ angle = 0, isDigging = false }) => (
  <svg
    width="92"
    height="92"
    viewBox="0 0 100 100"
    style={{
      transform: `rotate(${angle}deg) translateY(${isDigging ? 6 : 0}px) scale(${isDigging ? 1.08 : 1})`,
      transition: 'transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)',
      filter: 'drop-shadow(0 8px 16px rgba(20, 69, 47, 0.5))'
    }}
  >
    <defs>
      {/* Polished Stainless Steel Blade Gradient */}
      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="20%" stopColor="#F1F5F9" />
        <stop offset="50%" stopColor="#CBD5E1" />
        <stop offset="80%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* Turned Beechwood Handle Grain */}
      <linearGradient id="handleWood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#78350F" />
        <stop offset="25%" stopColor="#B45309" />
        <stop offset="60%" stopColor="#D97706" />
        <stop offset="85%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>

      {/* Brass Ferrule Gradient */}
      <linearGradient id="brassCollar" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="80%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>

      {/* Trowel Drop Shadow */}
      <filter id="bladeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Beechwood Handle & Steel Shank (Rotated 45° for natural grip) */}
    <g transform="translate(18, 18) rotate(-45)">
      {/* Turned Beechwood Pommel */}
      <ellipse cx="12" cy="5" rx="7" ry="6" fill="#78350F" stroke="#451A03" strokeWidth="0.8" />
      <path d="M12 2 Q15 4 12 7" stroke="#FEF3C7" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Ergonomic Turned Beechwood Grip Body */}
      <path
        d="M7 7 C5 18, 6 32, 9 44 L15 44 C18 32, 19 18, 17 7 Z"
        fill="url(#handleWood)"
        stroke="#451A03"
        strokeWidth="1"
      />
      {/* Fine Wood Grain Lines */}
      <path d="M10 10 Q11 26 10 40" stroke="rgba(69, 26, 3, 0.45)" strokeWidth="0.8" fill="none" />
      <path d="M13 12 Q14 28 13 38" stroke="rgba(254, 243, 199, 0.4)" strokeWidth="0.8" fill="none" />

      {/* Heavy Brass Ferrule Collar */}
      <rect x="7" y="44" width="10" height="7" rx="1.5" fill="url(#brassCollar)" stroke="#78350F" strokeWidth="0.8" />
      <line x1="7" y1="47.5" x2="17" y2="47.5" stroke="#FEF3C7" strokeWidth="0.7" opacity="0.6" />

      {/* Heavy-duty Forged Steel Neck Shank */}
      <path d="M10 51 L10 60 L14 60 L14 51 Z" fill="#475569" stroke="#1E293B" strokeWidth="0.8" />

      {/* Concave Polished Steel Scoop Blade */}
      <path
        d="M2 60 C4 72, 9 90, 12 98 C15 90, 20 72, 22 60 C16 63, 8 63, 2 60 Z"
        fill="url(#bladeGrad)"
        stroke="#1E293B"
        strokeWidth="1.4"
      />

      {/* Blade Spine Ridge Center Highlight */}
      <path d="M12 61 L12 95" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

      {/* Blade Left Concave Shadow */}
      <path d="M3 62 C5 72, 9 86, 11 94 L11 62 Z" fill="#334155" opacity="0.35" />

      {/* Clinging Subterranean Loam Clods on Blade Tip */}
      <ellipse cx="12" cy="94" rx="3.5" ry="2" fill="#3E2723" opacity="0.85" />
      <circle cx="10" cy="91" r="1.5" fill="#4E342E" opacity="0.75" />
      <circle cx="14" cy="92" r="1.2" fill="#5D4037" opacity="0.75" />
    </g>
  </svg>
);

// Ultra-Realistic Laboratory Wash Flask / Water Spray Bottle
const RealisticWashBottle = () => (
  <svg width="84" height="84" viewBox="0 0 90 90" style={{ filter: 'drop-shadow(0 6px 14px rgba(2, 132, 199, 0.45))' }}>
    <defs>
      <linearGradient id="translucentBottle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#E0F2FE" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id="washNozzleBrass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="45%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>
    {/* Translucent Flask Body */}
    <path d="M30 38 L24 74 C23 82, 67 82, 66 74 L60 38 Z" fill="url(#translucentBottle)" stroke="#0284C7" strokeWidth="2" />
    {/* Water Inside Flask */}
    <path d="M25 60 Q45 64 65 60 L66 74 C65 81, 25 81, 24 74 Z" fill="rgba(14, 165, 233, 0.55)" />
    {/* Volume Calibration Marks */}
    <line x1="38" y1="50" x2="52" y2="50" stroke="#0369A1" strokeWidth="1.4" opacity="0.8" />
    <line x1="36" y1="58" x2="54" y2="58" stroke="#0369A1" strokeWidth="1.4" opacity="0.8" />
    <line x1="38" y1="66" x2="52" y2="66" stroke="#0369A1" strokeWidth="1.4" opacity="0.8" />
    {/* Bottle Neck & Cap */}
    <rect x="37" y="30" width="16" height="9" rx="2" fill="#0369A1" stroke="#075985" strokeWidth="1" />
    {/* Curved Delivery Tube & Nozzle */}
    <path d="M45 30 Q45 12 26 10 Q18 8 10 14" fill="none" stroke="url(#washNozzleBrass)" strokeWidth="4.5" strokeLinecap="round" />
    <ellipse cx="9" cy="14" rx="4" ry="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.2" />
  </svg>
);

export default function ExcavationPitStage({
  plant,
  plantImg1,
  plantImg2,
  progress = 0,
  onDig,
  onQuickDig,
  isFullyDug = false,
  isWashed = false,
  onWash,
  isMuted = false
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [waterStreams, setWaterStreams] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 120, y: 150, visible: false });
  const [trowelAngle, setTrowelAngle] = useState(0);
  const [lastX, setLastX] = useState(null);
  const containerRef = useRef(null);

  // Depth geological horizon data
  const getDepthHorizon = (pct) => {
    if (pct >= 100) return { label: 'Horizon C · Deep Substratum (-40 cm)', color: '#10B981', note: '100% Excavated · Bedrock anchorage revealed' };
    if (pct >= 65) return { label: 'Horizon B · Dense Loam (-25 cm)', color: '#F59E0B', note: 'Lateral feeder roots emerging' };
    if (pct >= 30) return { label: 'Horizon A · Mineral Soil (-15 cm)', color: '#D97706', note: 'Crown root zone scraped' };
    if (pct > 0) return { label: 'Horizon O · Organic Humus (-5 cm)', color: '#B45309', note: 'Surface crust excavated' };
    return { label: 'Surface Topsoil (0 cm)', color: '#78350F', note: 'Loam undisturbed' };
  };

  const currentHorizon = getDepthHorizon(progress);

  // Dynamic high-pressure water stream
  const triggerWaterEffects = () => {
    const streams = Array.from({ length: 22 }).map(() => ({
      id: Math.random(),
      startX: 30 + Math.random() * 40,
      startY: 15 + Math.random() * 20,
      endX: 25 + Math.random() * 50,
      endY: 55 + Math.random() * 35,
      size: Math.random() * 3.5 + 2,
      opacity: Math.random() * 0.5 + 0.5
    }));
    setWaterStreams(streams);

    setTimeout(() => {
      setWaterStreams([]);
    }, 750);
  };

  const handlePointerDown = (e) => {
    if (isFullyDug) return;
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setCursorPos({ x, y, visible: true });
    setLastX(x);
    if (onDig) onDig(10);
    rootLabAudio.playTrowelDig(isMuted);
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (lastX !== null) {
      const deltaX = x - lastX;
      setTrowelAngle(Math.max(-26, Math.min(26, deltaX * 1.9)));
    }
    setLastX(x);
    setCursorPos({ x, y, visible: true });

    if (isDragging && !isFullyDug) {
      if (onDig) onDig(7);
      rootLabAudio.playTrowelDig(isMuted);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTrowelAngle(0);
    setLastX(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0 }}>
      {/* Subterranean Geological Trench Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onMouseEnter={() => setCursorPos(c => ({ ...c, visible: true }))}
        onMouseLeave={() => {
          setIsDragging(false);
          setCursorPos(c => ({ ...c, visible: false }));
          setTrowelAngle(0);
        }}
        style={{
          position: 'relative',
          flex: 1,
          minHeight: '320px',
          background: `radial-gradient(ellipse at 50% 30%, #FAF6EE 0%, #EFE8D6 55%, #DCD1BA 100%)`,
          borderRadius: '16px',
          border: '2.5px solid rgba(20, 69, 47, 0.5)',
          overflow: 'hidden',
          boxShadow: 'inset 0 4px 18px rgba(20, 69, 47, 0.16)',
          userSelect: 'none',
          cursor: !isFullyDug ? 'none' : (isWashed ? 'default' : 'pointer')
        }}
      >
        {/* Clean Natural Earth Subterranean Strata Texture (Procedural, 100% Text-Free) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(234, 222, 200, 0.3) 0%, rgba(197, 178, 147, 0.4) 50%, rgba(168, 144, 108, 0.5) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Live Plant Specimen (Fills canvas with zero text on the image) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '8px',
          zIndex: 4,
          pointerEvents: 'none'
        }}>
          <img
            src={isFullyDug ? plantImg2 : plantImg1}
            alt={plant.name}
            style={{
              maxHeight: '96%',
              maxWidth: '96%',
              objectFit: 'contain',
              filter: isWashed
                ? 'drop-shadow(0 8px 20px rgba(20, 69, 47, 0.4)) brightness(1.02)'
                : 'drop-shadow(0 6px 14px rgba(20, 69, 47, 0.35))',
              transition: 'transform 0.25s ease, filter 0.25s ease'
            }}
          />
        </div>

        {/* Dynamic Organic Earthen Soil Horizon Layer (Smoothly Unveils Roots) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${Math.max(0, 100 - progress)}%`,
          background: 'linear-gradient(180deg, #4A2810 0%, #361B09 30%, #241106 70%, #150903 100%)',
          transition: isDragging ? 'none' : 'height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          zIndex: 6,
          pointerEvents: 'none',
          boxShadow: '0 -6px 20px rgba(21, 9, 3, 0.55)'
        }}>
          {/* Realistic Crumbled Organic Soil Horizon Crest with Multi-Tier Edges */}
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: 0,
            right: 0,
            height: '18px',
            overflow: 'hidden'
          }}>
            <svg width="100%" height="18" viewBox="0 0 1200 18" preserveAspectRatio="none">
              <path
                d="M0,18 L0,7 Q50,2 100,8 Q160,14 220,5 Q280,1 340,9 Q400,16 460,6 Q520,1 580,9 Q640,16 700,7 Q760,2 820,8 Q880,15 940,6 Q1000,1 1060,9 Q1120,15 1200,7 L1200,18 Z"
                fill="#4A2810"
              />
              <path
                d="M0,18 L0,10 Q80,4 160,9 Q240,15 320,7 Q400,2 480,10 Q560,17 640,8 Q720,3 800,10 Q880,16 960,8 Q1040,2 1120,9 Q1160,5 1200,10 L1200,18 Z"
                fill="#361B09"
                opacity="0.75"
              />
            </svg>
          </div>

          {/* Embedded Subterranean Micro-Gravel & Loam Specks */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, #FEF3C7 1px, transparent 1.5px),
              radial-gradient(circle at 65% 45%, #D97706 1.5px, transparent 2px),
              radial-gradient(circle at 40% 70%, #92400E 2px, transparent 2.5px),
              radial-gradient(circle at 85% 80%, #FEF3C7 1px, transparent 1.5px)
            `,
            backgroundSize: '48px 48px',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Muddy Water Washing Overlay (when fully dug but before rinse) */}
        {isFullyDug && !isWashed && (
          <div
            onClick={() => {
              triggerWaterEffects();
              if (onWash) onWash();
              rootLabAudio.playWaterSplash(isMuted);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(74, 40, 16, 0.65) 0%, rgba(36, 17, 6, 0.88) 100%)',
              backdropFilter: 'blur(2px)',
              zIndex: 9,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              animation: 'plantBreatheSway 3s ease-in-out infinite'
            }}>
              <RealisticWashBottle />
              <div style={{
                background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                color: '#FFFFFF',
                border: '2px solid #38BDF8',
                borderRadius: '16px',
                padding: '8px 22px',
                fontSize: '16px',
                fontWeight: '900',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>💧 Click to Wash Soil with Water Jet</span>
              </div>
              <div style={{
                fontSize: '16px',
                color: '#F0F9FF',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
                Roots unearthed! Spray water jet to rinse clinging loam and reveal branching.
              </div>
            </div>
          </div>
        )}

        {/* Animated High-Pressure Water Spray Streams on Click */}
        {waterStreams.map(st => (
          <svg
            key={st.id}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 15
            }}
          >
            <line
              x1={`${st.startX}%`}
              y1={`${st.startY}%`}
              x2={`${st.endX}%`}
              y2={`${st.endY}%`}
              stroke="#38BDF8"
              strokeWidth={st.size}
              strokeDasharray="4 6"
              strokeLinecap="round"
              opacity={st.opacity}
            />
          </svg>
        ))}

        {/* Realistic 3D Trowel Tool Following Pointer */}
        {cursorPos.visible && !isFullyDug && (
          <div style={{
            position: 'absolute',
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-38%, -62%)',
            pointerEvents: 'none',
            zIndex: 25
          }}>
            <RealisticTrowel angle={trowelAngle} isDigging={isDragging} />
          </div>
        )}
      </div>

      {/* Real Geological Strata Indicator & Progress Bar */}
      <div style={{
        background: '#FCFBF7',
        border: '1.8px solid #14452F',
        borderRadius: '14px',
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '0 2px 8px rgba(20, 69, 47, 0.06)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>⛏️</span>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '900', color: currentHorizon.color }}>
                {currentHorizon.label}
              </span>
              <div style={{ fontSize: '16px', color: '#334155', fontWeight: '600' }}>
                {currentHorizon.note}
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: '900',
            color: progress >= 100 ? '#065F46' : '#92400E',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            {progress}%
          </span>
        </div>

        <div style={{
          height: 10,
          background: '#E2E8F0',
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid #14452F',
          marginTop: '2px'
        }}>
          <div style={{
            height: '100%',
            background: progress >= 100
              ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)',
            width: `${progress}%`,
            transition: 'width 0.15s ease'
          }} />
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {!isFullyDug ? (
          <>
            <button
              type="button"
              onClick={() => {
                if (onDig) onDig(15);
                rootLabAudio.playTrowelDig(isMuted);
              }}
              style={{
                flex: 2,
                background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                color: '#FFFFFF',
                border: '1.5px solid #10B981',
                borderRadius: '12px',
                padding: '9px 14px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(20, 69, 47, 0.3)'
              }}
            >
              <span>⛏️ Excavate Loam Soil</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '16px' }}>(+15%)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onQuickDig) onQuickDig();
                rootLabAudio.playTrowelDig(isMuted);
              }}
              style={{
                flex: 1,
                background: 'rgba(250, 248, 242, 0.65)',
                color: '#14452F',
                border: '1.8px solid #14452F',
                borderRadius: '12px',
                padding: '9px 12px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              ⚡ Quick Excavate
            </button>
          </>
        ) : !isWashed ? (
          <>
            <button
              type="button"
              onClick={() => {
                triggerWaterEffects();
                if (onWash) onWash();
                rootLabAudio.playWaterSplash(isMuted);
              }}
              style={{
                flex: 2,
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '1.5px solid #FCD34D',
                borderRadius: '12px',
                padding: '9px 14px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.4)'
              }}
            >
              <span>💧 Wash Clinging Mud Off Roots</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerWaterEffects();
                if (onWash) onWash();
                rootLabAudio.playWaterSplash(isMuted);
              }}
              style={{
                flex: 1,
                background: 'rgba(250, 248, 242, 0.65)',
                color: '#14452F',
                border: '1.8px solid #14452F',
                borderRadius: '12px',
                padding: '9px 12px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              ⚡ Instant Rinse
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={{
              background: 'rgba(250, 248, 242, 0.65)',
              border: '1.8px solid #14452F',
              borderRadius: '12px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 8px rgba(20, 69, 47, 0.06)'
            }}>
              <span style={{ fontSize: '24px' }}>🌿</span>
              <div style={{ fontSize: '16px', color: '#14452F', fontWeight: '700', lineHeight: 1.35 }}>
                <strong style={{ color: '#064E3B' }}>{plant.name}</strong> subterranean root system fully uncovered. Now examine lateral branches and root hairs under the optical loupe.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
