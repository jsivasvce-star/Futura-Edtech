import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Info, ArrowRight, Lock, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import MagnetActivityBackground from './MagnetActivityBackground';

const STEPS = [
  {
    id: "carA",
    name: "Magnetic Airplane A (Left Lane)",
    instruction: "Click Airplane A below, then click the left flight corridor to place it.",
    hint: "Place Airplane A in the left airspace lane.",
  },
  {
    id: "carB",
    name: "Magnetic Airplane B (Right Lane)",
    instruction: "Click Airplane B below, then click the right flight corridor to place it.",
    hint: "Place Airplane B in the right airspace lane.",
  }
];

// ─── Airplane thumbnail card (click to select) ───
function TrayItemCard({ step, isPlaced, isUnlocked, isSelected, onClick, renderThumbnail }) {
  const isDisabled = isPlaced || !isUnlocked;
  const isCurrent = isUnlocked && !isPlaced;

  return (
    <div
      onClick={() => !isDisabled && onClick(step.id)}
      style={{
        opacity: isDisabled ? (isPlaced ? 0.75 : 0.5) : 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '16px',
        background: isPlaced ? '#DCFCE7' : isSelected ? '#FEF9C3' : isCurrent ? '#FEF3C7' : '#FFFFFF',
        border: isPlaced
          ? '1.5px solid #86EFAC'
          : isSelected
          ? '2.5px solid #D97706'
          : isCurrent
          ? '2px solid #F59E0B'
          : '1.5px solid #FDE68A',
        color: '#064E3B',
        cursor: isDisabled ? (isPlaced ? 'default' : 'not-allowed') : 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        fontWeight: 800,
        boxShadow: isSelected
          ? '0 0 0 3px rgba(217,119,6,0.3), 0 6px 18px rgba(217,119,6,0.22)'
          : isCurrent
          ? '0 4px 14px rgba(245, 158, 11, 0.18)'
          : '0 2px 8px rgba(0,0,0,0.03)',
        userSelect: 'none',
        boxSizing: 'border-box',
        flex: 1,
        minHeight: 0,
        transform: isSelected ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      <div style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        background: isPlaced ? '#F0FDF4' : '#FFFBEB',
        border: `1.5px solid ${isPlaced ? '#A7F3D0' : '#FDE68A'}`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        opacity: isUnlocked ? 1 : 0.4,
        padding: '0.85rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '10px',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: isPlaced ? '#059669' : isUnlocked ? '#D97706' : '#CBD5E1',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontWeight: 900
        }}>
          {step.id === 'carA' ? '1' : '2'}
        </div>
        {renderThumbnail(step.id)}
      </div>

      <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
        <div style={{ fontSize: '1.18rem', fontWeight: 900, color: isPlaced ? '#047857' : '#064E3B' }}>{step.name}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
          {isPlaced ? (
            <><CheckCircle2 size={18} style={{ color: '#16A34A' }} /> <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#15803D' }}>Placed in Airspace</span></>
          ) : !isUnlocked ? (
            <><Lock size={16} style={{ color: '#94A3B8' }} /> <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#94A3B8' }}>Locked</span></>
          ) : isSelected ? (
            <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#92400E' }}>✓ Selected — click a corridor</span>
          ) : (
            <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#92400E' }}>👆 Click to select</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Clickable canvas zone ───
function CanvasArea({ children, onZoneClick }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#020617',
        border: 'none',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 35px rgba(6, 78, 59, 0.15)',
      }}
    >
      {/* 3D WebGL Background */}
      <MagnetActivityBackground />

      {/* Center Dashed Corridor Divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        borderLeft: '2px dashed rgba(255, 255, 255, 0.65)',
        transform: 'translateX(-50%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Left zone hit-area */}
      <div
        onClick={() => onZoneClick('left')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '50%',
          zIndex: 8,
          cursor: 'pointer'
        }}
        title="Left flight corridor"
      />

      {/* Right zone hit-area */}
      <div
        onClick={() => onZoneClick('right')}
        style={{
          position: 'absolute',
          inset: 0,
          left: '50%',
          width: '50%',
          zIndex: 8,
          cursor: 'pointer'
        }}
        title="Right flight corridor"
      />

      {/* Content renders on top of hit-areas */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
}

export default function Stage1_Build({ onComplete, onNext }) {
  const [placed, setPlaced] = useState({ carA: false, carB: false });
  const [selectedId, setSelectedId] = useState(null); // which tray item is "selected"
  const [success, setSuccess] = useState(false);
  const [activePopup, setActivePopup] = useState(0); // 0: carA, 1: carB, 2: observe, null: hidden
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Map zone → placed airplane
  const zoneMap = { left: 'carA', right: 'carB' };
  const positionMap = { carA: '25%', carB: '75%' };

  React.useEffect(() => {
    if (placed.carA && !placed.carB) {
      setActivePopup(1);
    } else if (placed.carA && placed.carB) {
      setActivePopup(2);
    }
  }, [placed]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  const isStepUnlocked = (stepId) => {
    if (stepId === 'carA') return true;
    if (stepId === 'carB') return placed.carA;
    return false;
  };

  const handleTrayClick = (id) => {
    if (placed[id] || !isStepUnlocked(id)) return;
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleZoneClick = (zone) => {
    if (!selectedId) return;

    const targetId = zoneMap[zone];
    // Only allow placing in the correct corridor
    if (selectedId !== targetId) {
      // Wrong corridor — give a quick visual shake signal (no-op, just deselect)
      setSelectedId(null);
      return;
    }

    const newPlaced = { ...placed, [selectedId]: true };
    setPlaced(newPlaced);
    setSelectedId(null);

    if (Object.values(newPlaced).every(Boolean)) {
      setSuccess(true);
    }
  };

  const handleReset = () => {
    setPlaced({ carA: false, carB: false });
    setSuccess(false);
    setActivePopup(0);
    setSelectedId(null);
  };

  const renderThumbnail = (id) => (
    <img
      src="/MagnetInteraction/real_airliner_north_south.png"
      alt={id === 'carA' ? 'Airplane A' : 'Airplane B'}
      style={{ width: '100%', height: '100%', maxHeight: '120px', objectFit: 'contain' }}
    />
  );

  return (
    <div style={{
      padding: '0.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      background: 'transparent',
      position: 'relative'
    }}>

      {/* Main 2-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 440px',
        gap: '1.25rem',
        flex: 1,
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box'
      }}>
        {/* LEFT Column: Clickable Activity Area */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 0,
          overflow: 'hidden',
          borderRadius: '24px'
        }}>
          <CanvasArea onZoneClick={handleZoneClick}>
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                zIndex: 40,
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '12px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                color: '#0F172A',
                fontSize: '0.78rem',
                fontWeight: 800,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s ease',
                pointerEvents: 'auto'
              }}
            >
              {isFullscreen ? <Minimize2 size={14} color="#0F172A" /> : <Maximize2 size={14} color="#0F172A" />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>

            {/* Click-zone hint overlays (only when an item is selected) */}
            {selectedId && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0, left: 0, width: '50%',
                  background: selectedId === 'carA' ? 'rgba(245,158,11,0.18)' : 'rgba(100,116,139,0.12)',
                  border: selectedId === 'carA' ? '3px dashed rgba(245,158,11,0.65)' : '3px dashed rgba(100,116,139,0.3)',
                  borderRadius: '24px 0 0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 5
                }}>
                  <span style={{
                    color: selectedId === 'carA' ? '#F59E0B' : '#94A3B8',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                  }}>
                    {selectedId === 'carA' ? '👆 Click here' : 'Wrong lane'}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0, right: 0, width: '50%',
                  background: selectedId === 'carB' ? 'rgba(245,158,11,0.18)' : 'rgba(100,116,139,0.12)',
                  border: selectedId === 'carB' ? '3px dashed rgba(245,158,11,0.65)' : '3px dashed rgba(100,116,139,0.3)',
                  borderRadius: '0 24px 24px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 5
                }}>
                  <span style={{
                    color: selectedId === 'carB' ? '#F59E0B' : '#94A3B8',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                  }}>
                    {selectedId === 'carB' ? '👆 Click here' : 'Wrong lane'}
                  </span>
                </div>
              </>
            )}

            {/* Placed Airplane A */}
            {placed.carA && (
              <div style={{
                position: 'absolute',
                left: '25%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}>
                <img
                  src="/MagnetInteraction/real_airliner_north_south.png"
                  alt="Airplane A"
                  style={{
                    width: 'clamp(320px, 36vw, 460px)',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 22px 42px rgba(0,0,0,0.65))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            )}

            {/* Placed Airplane B */}
            {placed.carB && (
              <div style={{
                position: 'absolute',
                left: '75%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}>
                <img
                  src="/MagnetInteraction/real_airliner_north_south.png"
                  alt="Airplane B"
                  style={{
                    width: 'clamp(320px, 36vw, 460px)',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 22px 42px rgba(0,0,0,0.65))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            )}
          </CanvasArea>
        </div>

        {/* RIGHT Column: Two Golden Containers */}
        <div className="stage-right-column" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.65rem',
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box'
        }}>
          {/* Container 1: Steps of Instructions */}
          <div className="stage-container-1" style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '1.4rem 1.6rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '19.5px', fontWeight: 900, color: '#1E1B4B' }}>
              Steps of Instructions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#D97706', marginTop: '0.48rem', flexShrink: 0 }} />
                <span style={{ fontSize: '17.5px', color: '#78350F', lineHeight: 1.45, fontWeight: 700 }}>
                  Click Airplane A in the tray below to select it, then click the left flight corridor.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#D97706', marginTop: '0.48rem', flexShrink: 0 }} />
                <span style={{ fontSize: '17.5px', color: '#78350F', lineHeight: 1.45, fontWeight: 700 }}>
                  Click Airplane B to select it, then click the right parallel flight corridor.
                </span>
              </div>
            </div>
          </div>

          {/* Container 2: Flight Components & Controls */}
          <div className="stage-container-2" style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '1.4rem 1.6rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            flex: 1,
            minHeight: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '19.5px', fontWeight: 900, color: '#1E1B4B' }}>
                Flight Components
              </h3>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '14px',
                  background: '#FFFFFF',
                  color: '#92400E',
                  border: '1.5px solid #FDE68A',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '15px',
                  fontWeight: 800,
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <RotateCcw size={15} color="#D97706" /> Reset
              </button>
            </div>

            {/* Flight Components List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minHeight: 0 }}>
              {STEPS.map((step) => (
                <TrayItemCard
                  key={step.id}
                  step={step}
                  isPlaced={placed[step.id]}
                  isUnlocked={isStepUnlocked(step.id)}
                  isSelected={selectedId === step.id}
                  onClick={handleTrayClick}
                  renderThumbnail={renderThumbnail}
                />
              ))}
            </div>

            {/* Proceed to Explore Button */}
            <button
              onClick={() => { onComplete(); onNext(); }}
              disabled={!success}
              className={success ? 'gold-glow-btn' : ''}
              style={{
                width: '100%',
                padding: '0.85rem 1.4rem',
                fontSize: '17.5px',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                background: success ? undefined : '#F1F5F9',
                color: success ? '#FFFFFF' : '#94A3B8',
                border: success ? undefined : '1.5px solid #CBD5E1',
                cursor: success ? 'pointer' : 'not-allowed',
                marginTop: 'auto',
                transition: 'all 0.25s ease'
              }}
            >
              Proceed to Explore <ArrowRight size={20} color={success ? '#FFFFFF' : '#94A3B8'} />
            </button>
          </div>
        </div>
      </div>

      {/* Instruction Popups */}
      <AnimatePresence>
        {activePopup !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(2, 6, 23, 0.65)',
              zIndex: 100,
              backdropFilter: 'blur(6px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #FDE68A',
                borderRadius: '24px',
                padding: '2.2rem',
                maxWidth: '440px',
                boxShadow: '0 12px 40px rgba(69, 26, 3, 0.2)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              <div style={{ width: '58px', height: '58px', background: '#FEF3C7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FDE68A' }}>
                <Info size={30} color="#D97706" />
              </div>

              <h3 style={{ margin: 0, color: '#064E3B', fontSize: '1.45rem', fontWeight: 900 }}>
                {activePopup === 0 && 'Step 1: Left Airspace'}
                {activePopup === 1 && 'Step 2: Right Airspace'}
                {activePopup === 2 && 'Observation'}
              </h3>

              <p style={{ margin: 0, color: '#065F46', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.6 }}>
                {activePopup === 0 && (
                  <>Click <strong>Airplane A</strong> in the tray, then click the <strong>Left flight corridor</strong>.</>
                )}
                {activePopup === 1 && (
                  <>Click <strong>Airplane B</strong> in the tray, then click the <strong>Right parallel flight corridor</strong>.</>
                )}
                {activePopup === 2 && (
                  <>Observe the magnetic poles (Front: North [N], Rear: South [S]) before proceeding to test flight interactions!</>
                )}
              </p>

              <button
                onClick={() => setActivePopup(null)}
                className="gold-glow-btn"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.85rem 2.6rem',
                  borderRadius: '25px',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Got it! <CheckCircle2 size={18} color="#FFFFFF" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
