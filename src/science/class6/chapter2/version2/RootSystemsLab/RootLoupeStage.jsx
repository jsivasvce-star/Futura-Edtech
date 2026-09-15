import React, { useState, useRef, useEffect } from 'react';
import { rootLabAudio } from './rootLabAudio';

const BOTANICAL_NAMES = {
  mustard: { scientific: 'Brassica nigra', family: 'Brassicaceae', group: 'Dicotyledon' },
  grass: { scientific: 'Cynodon dactylon', family: 'Poaceae', group: 'Monocotyledon' },
  hibiscus: { scientific: 'Hibiscus rosa-sinensis', family: 'Malvaceae', group: 'Dicotyledon' },
  wheat: { scientific: 'Triticum aestivum', family: 'Poaceae', group: 'Monocotyledon' },
  marigold: { scientific: 'Tagetes erecta', family: 'Asteraceae', group: 'Dicotyledon' }
};

export default function RootLoupeStage({
  plant,
  rootType,
  plantName,
  rootImg,
  isMuted = false
}) {
  const containerRef = useRef(null);
  const [lensState, setLensState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isReady: false
  });
  const [zoom, setZoom] = useState(2.8);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const currentRootType = plant?.rootType || rootType || 'taproot';
  const currentPlantName = plant?.name || plantName || 'Plant Specimen';
  const plantId = plant?.id || 'mustard';
  const botanicalInfo = BOTANICAL_NAMES[plantId] || {
    scientific: 'Plantae spec.',
    family: 'Angiospermae',
    group: currentRootType === 'taproot' ? 'Dicotyledon' : 'Monocotyledon'
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLensState({
      x: rect.width * 0.52,
      y: rect.height * 0.44,
      width: rect.width,
      height: rect.height,
      isReady: true
    });
    setActiveHotspot(null);
  }, [plantId]);

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
    rootLabAudio.playLoupeMove(isMuted);
  };

  const handlePointerMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    updatePosition(clientX, clientY);
  };

  const lensRadius = 110; // 220px large high-precision optical loupe

  const hotspots = currentRootType === 'taproot' ? [
    {
      id: 'lateral',
      index: 1,
      label: 'Lateral Roots',
      x: 82,
      y: 44,
      targetX: 64,
      targetY: 52,
      note: 'Smaller side roots branching out from the main central root to anchor the plant and absorb moisture and mineral nutrients.'
    }
  ] : [
    {
      id: 'cluster',
      index: 1,
      label: 'Fibrous Roots',
      x: 82,
      y: 42,
      targetX: 60,
      targetY: 52,
      note: 'Many thin, thread-like roots of roughly equal thickness arising from the base of the stem.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0 }}>
      {/* Top Loupe Controls Bar (Positioned outside the image canvas so image stays 100% clean) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FCFBF7',
        border: '1.8px solid #14452F',
        borderRadius: '12px',
        padding: '5px 12px',
        boxShadow: '0 2px 8px rgba(20, 69, 47, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🌿</span>
          <div style={{
            fontSize: '16px',
            fontWeight: '900',
            color: '#14452F',
            fontFamily: '"Fraunces", Georgia, serif'
          }}>
            {currentPlantName}
          </div>
          <span style={{
            fontSize: '16px',
            color: '#475569',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif'
          }}>
            ({botanicalInfo.scientific})
          </span>
        </div>

        {/* Magnification Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '16px', color: '#14452F', fontWeight: '900' }}>
            🔍 Loupe:
          </span>
          {[
            { level: 2.0, label: '2.0×' },
            { level: 2.8, label: '2.8×' },
            { level: 3.8, label: '3.8×' }
          ].map(opt => (
            <button
              key={opt.level}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(opt.level);
                rootLabAudio.playSwitch(isMuted);
              }}
              style={{
                background: zoom === opt.level ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#FAF8F2',
                color: zoom === opt.level ? '#FFFFFF' : '#14452F',
                border: zoom === opt.level ? '1.5px solid #FCD34D' : '1.5px solid #14452F',
                borderRadius: '8px',
                padding: '2px 9px',
                fontSize: '16px',
                fontWeight: '900',
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: zoom === opt.level ? '0 2px 6px rgba(217, 119, 6, 0.35)' : 'none'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Root Specimen Canvas (100% Text-Free on the Image) */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '260px',
          userSelect: 'none',
          cursor: 'none',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FAF7EE 0%, #F4ECE0 45%, #E9DEC8 100%)',
          borderRadius: '16px',
          border: '2.5px solid #14452F',
          boxShadow: 'inset 0 4px 18px rgba(20, 69, 47, 0.16)'
        }}
      >
        {/* Archival Herbarium Millimeter Paper Grid Texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          backgroundImage: `
            linear-gradient(to right, rgba(20, 69, 47, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 69, 47, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          pointerEvents: 'none'
        }} />

        {/* High-Resolution Root Specimen Plate (100% Unobstructed Image) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 16px',
          pointerEvents: 'none'
        }}>
          <img
            src={rootImg}
            alt={currentPlantName + ' root'}
            style={{
              maxWidth: '92%',
              maxHeight: '94%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              filter: 'drop-shadow(0 8px 20px rgba(20, 69, 47, 0.35))'
            }}
          />
        </div>

        {/* Unobtrusive Minimal Pin Indicators with Fine Leader Lines (No text banners on root) */}
        {hotspots.map(hs => {
          const isSelected = activeHotspot?.id === hs.id;
          return (
            <React.Fragment key={hs.id}>
              {/* Fine Leader Line from Pin to Target Zone */}
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 14
                }}
              >
                <line
                  x1={`${hs.x}%`}
                  y1={`${hs.y}%`}
                  x2={`${hs.targetX}%`}
                  y2={`${hs.targetY}%`}
                  stroke={isSelected ? '#F59E0B' : '#14452F'}
                  strokeWidth={isSelected ? '2.4' : '1.5'}
                  strokeDasharray="4 4"
                  opacity={isSelected ? 1 : 0.65}
                />
                <circle
                  cx={`${hs.targetX}%`}
                  cy={`${hs.targetY}%`}
                  r={isSelected ? 4 : 2.5}
                  fill={isSelected ? '#F59E0B' : '#14452F'}
                />
              </svg>

              {/* Minimalist 3D Pearl Pin (Number only, zero text on image) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hs);
                  rootLabAudio.playSwitch(isMuted);
                }}
                title={hs.label}
                style={{
                  position: 'absolute',
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isSelected
                    ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                    : 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  color: '#FFFFFF',
                  border: isSelected ? '2px solid #FEF3C7' : '2px solid #FFFFFF',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  zIndex: 16,
                  boxShadow: isSelected
                    ? '0 0 14px rgba(245, 158, 11, 0.7), 0 3px 8px rgba(0,0,0,0.3)'
                    : '0 3px 8px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {hs.index}
              </button>
            </React.Fragment>
          );
        })}

        {/* Realistic Heavy Brass Botanical Field Loupe */}
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
              boxShadow: `
                0 18px 40px rgba(0, 0, 0, 0.58),
                0 0 0 3px #78350F,
                0 0 0 7px #D97706,
                0 0 0 10px #B45309,
                inset 0 0 24px rgba(0, 0, 0, 0.48)
              `,
              zIndex: 22,
              pointerEvents: 'none',
              background: '#FAF4E8'
            }}
          >
            {/* Magnified Root View */}
            <img
              src={rootImg}
              alt={currentPlantName}
              style={{
                position: 'absolute',
                width: `${lensState.width * zoom}px`,
                height: `${lensState.height * zoom}px`,
                left: `${lensRadius - lensState.x * zoom}px`,
                top: `${lensRadius - lensState.y * zoom}px`,
                objectFit: 'contain',
                maxWidth: 'none',
                filter: 'contrast(1.18) brightness(1.05) drop-shadow(0 4px 10px rgba(20,69,47,0.4))'
              }}
            />

            {/* Optical Glass Convex Glare Arc */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 68%)',
              pointerEvents: 'none'
            }} />

            {/* Specular Streak Reflection */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              left: '25%',
              width: '20px',
              height: '140%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent)',
              transform: 'rotate(35deg)',
              pointerEvents: 'none'
            }} />

            {/* Fine Reticle Crosshair */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '32px',
              height: '32px',
              transform: 'translate(-50%, -50%)',
              border: '1.2px dashed rgba(20, 69, 47, 0.5)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}>
              <div style={{ position: 'absolute', top: '50%', left: '-8px', right: '-8px', height: '1px', background: 'rgba(20, 69, 47, 0.4)' }} />
              <div style={{ position: 'absolute', left: '50%', top: '-8px', bottom: '-8px', width: '1px', background: 'rgba(20, 69, 47, 0.4)' }} />
            </div>
          </div>
        )}
      </div>

      {/* Anatomical Feature Selection Strip (Cleanly outside the image) */}
      <div style={{
        display: 'flex',
        gap: '6px',
        alignItems: 'center'
      }}>
        {hotspots.map(hs => {
          const isSelected = activeHotspot?.id === hs.id;
          return (
            <button
              key={hs.id}
              type="button"
              onClick={() => {
                setActiveHotspot(hs);
                rootLabAudio.playSwitch(isMuted);
              }}
              style={{
                flex: 1,
                background: isSelected ? '#14452F' : '#FCFBF7',
                color: isSelected ? '#FFFFFF' : '#14452F',
                border: isSelected ? '2px solid #10B981' : '1.5px solid #14452F',
                borderRadius: '10px',
                padding: '5px 8px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: isSelected ? '0 3px 10px rgba(20, 69, 47, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span>📍 {hs.index}.</span>
              <span>{hs.label}</span>
            </button>
          );
        })}
      </div>

      {/* Field Notebook Callout Card (Outside the image) */}
      {activeHotspot && (
        <div style={{
          background: '#FCFBF7',
          color: '#14452F',
          padding: '8px 14px',
          borderRadius: '12px',
          border: '2px solid #14452F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.15)'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '900',
              color: '#064E3B',
              fontFamily: '"Fraunces", Georgia, serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>📍</span>
              <span>Feature {activeHotspot.index}: {activeHotspot.label}</span>
            </div>
            <div style={{
              fontSize: '16px',
              color: '#1E293B',
              fontWeight: '600',
              lineHeight: '1.35',
              marginTop: '2px'
            }}>
              {activeHotspot.note}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveHotspot(null)}
            style={{
              background: '#EAF7EE',
              border: '1.5px solid #14452F',
              color: '#14452F',
              borderRadius: '8px',
              padding: '3px 10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '900'
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
