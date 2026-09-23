import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Info, ArrowRight, Lock, Maximize2, Minimize2 } from 'lucide-react';
import MagnetActivityBackground from './MagnetActivityBackground';

const STEPS = [
  {
    id: "carA",
    name: "Magnetic Airplane A (Left Lane)",
    instruction: "Click Airplane A in the tray below to place it into the left flight corridor.",
    hint: "Place Airplane A in the left airspace lane.",
  },
  {
    id: "carB",
    name: "Magnetic Airplane B (Right Lane)",
    instruction: "Click Airplane B in the tray below to place it into the right flight corridor.",
    hint: "Place Airplane B in the right airspace lane.",
  }
];

// ─── Airplane thumbnail card (one-click direct placement) ───
function TrayItemCard({ step, isPlaced, isUnlocked, onClick, renderThumbnail }) {
  const isDisabled = isPlaced || !isUnlocked;

  return (
    <div
      onClick={() => !isDisabled && onClick(step.id)}
      style={{
        opacity: isDisabled ? (isPlaced ? 0.85 : 0.45) : 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '18px',
        background: isPlaced ? '#DCFCE7' : isUnlocked ? '#FFFFFF' : '#F8FAFC',
        border: isPlaced
          ? '2px solid #86EFAC'
          : isUnlocked
          ? '2px solid #214A70'
          : '1.5px solid #E2E8F0',
        color: '#064E3B',
        cursor: isDisabled ? (isPlaced ? 'default' : 'not-allowed') : 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        fontWeight: 800,
        boxShadow: isPlaced
          ? '0 2px 10px rgba(16, 185, 129, 0.12)'
          : isUnlocked
          ? '0 4px 16px rgba(23, 59, 95, 0.12)'
          : '0 2px 6px rgba(0,0,0,0.03)',
        userSelect: 'none',
        boxSizing: 'border-box',
        flex: 1,
        minHeight: 0
      }}
    >
      <div style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        background: isPlaced ? '#F0FDF4' : '#F3F7F9',
        border: `1.5px solid ${isPlaced ? '#A7F3D0' : '#E2E8F0'}`,
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        opacity: isUnlocked ? 1 : 0.4,
        padding: '0.85rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {renderThumbnail(step.id)}
      </div>

      <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
        <div style={{ fontSize: '1.35rem', fontWeight: 900, color: isPlaced ? '#047857' : '#173B5F', letterSpacing: '-0.01em' }}>
          {step.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'center' }}>
          {isPlaced ? (
            <><CheckCircle2 size={20} style={{ color: '#16A34A' }} /> <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803D' }}>Placed in Airspace</span></>
          ) : !isUnlocked ? (
            <><Lock size={18} style={{ color: '#94A3B8' }} /> <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#94A3B8' }}>Locked</span></>
          ) : (
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#173B5F' }}>👆 Click to Place in Corridor</span>
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
      {/* 3D WebGL / Canvas Background */}
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
  const [success, setSuccess] = useState(false);
  const [activePopup, setActivePopup] = useState(0); // 0: carA, 1: carB, 2: observe, null: hidden
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Map zone → placed airplane
  const zoneMap = { left: 'carA', right: 'carB' };

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

  // Direct 1-click plane placement
  const handleTrayClick = (id) => {
    if (placed[id] || !isStepUnlocked(id)) return;
    const newPlaced = { ...placed, [id]: true };
    setPlaced(newPlaced);

    if (Object.values(newPlaced).every(Boolean)) {
      setSuccess(true);
    }
  };

  const handleZoneClick = (zone) => {
    const targetId = zoneMap[zone];
    if (placed[targetId] || !isStepUnlocked(targetId)) return;
    handleTrayClick(targetId);
  };

  const handleReset = () => {
    setPlaced({ carA: false, carB: false });
    setSuccess(false);
    setActivePopup(0);
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
          gap: '1.25rem',
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box'
        }}>
          {/* Container 1: Steps of Instructions (Tightened Height, Crisp Alignment) */}
          <div className="stage-container-1" style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '1rem 1.4rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <h3 style={{ margin: 0, fontSize: '23px', fontWeight: 900, color: '#1E1B4B' }}>
              Steps of Instructions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div className="gold-step-badge" style={{ flexShrink: 0, marginTop: '3px' }}>1</div>
                <span style={{ fontSize: '21px', color: '#173B5F', lineHeight: 1.35, fontWeight: 700 }}>
                  Click Airplane A in the tray below to place it into the left flight corridor.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div className="gold-step-badge" style={{ flexShrink: 0, marginTop: '3px' }}>2</div>
                <span style={{ fontSize: '21px', color: '#173B5F', lineHeight: 1.35, fontWeight: 700 }}>
                  Click Airplane B in the tray below to place it into the right flight corridor.
                </span>
              </div>
            </div>
          </div>

          {/* Container 2: Flight Components & Controls */}
          <div className="stage-container-2" style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '1.35rem 1.6rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            flex: 1,
            minHeight: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '21px', fontWeight: 900, color: '#1E1B4B' }}>
                Flight Components
              </h3>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '14px',
                  background: '#FFFFFF',
                  color: '#173B5F',
                  border: '1.5px solid #E2E8F0',
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
                <RotateCcw size={15} color="#173B5F" /> Reset
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
                fontSize: '18px',
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

      {/* Instruction Popups (Substantially Enlarged) */}
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
              transition={{ type: 'spring', bounce: 0.45, duration: 0.55 }}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '28px',
                padding: '2.8rem 3rem',
                maxWidth: '580px',
                width: '92%',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.45rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              <div style={{ width: '76px', height: '76px', background: '#EAF2F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2.5px solid #CBD5E1' }}>
                <Info size={38} color="#173B5F" />
              </div>

              <h3 style={{ margin: 0, color: '#173B5F', fontSize: '1.95rem', fontWeight: 900 }}>
                {activePopup === 0 && 'Step 1: Left Airspace'}
                {activePopup === 1 && 'Step 2: Right Airspace'}
                {activePopup === 2 && 'Observation'}
              </h3>

              <p style={{ margin: 0, color: '#334155', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.65 }}>
                {activePopup === 0 && (
                  <>Click <strong>Airplane A</strong> in the tray below to place it into the <strong>Left flight corridor</strong>.</>
                )}
                {activePopup === 1 && (
                  <>Click <strong>Airplane B</strong> in the tray below to place it into the <strong>Right parallel flight corridor</strong>.</>
                )}
                {activePopup === 2 && (
                  <>Observe the magnetic poles (Front: North [N], Rear: South [S]) before proceeding to test flight interactions!</>
                )}
              </p>

              <button
                onClick={() => setActivePopup(null)}
                className="gold-glow-btn"
                style={{
                  marginTop: '0.6rem',
                  padding: '0.95rem 3.5rem',
                  borderRadius: '25px',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                Got it! <CheckCircle2 size={22} color="#FFFFFF" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
