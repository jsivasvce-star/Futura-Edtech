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
        opacity: isUnlocked ? 1 : 0.5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.85rem 1rem',
        borderRadius: '16px',
        background: '#FFFFFF',
        border: isUnlocked ? '1.5px solid #0A2540' : '1.5px solid #E2E8F0',
        cursor: isDisabled ? (isPlaced ? 'default' : 'not-allowed') : 'pointer',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        boxShadow: isUnlocked ? '0 2px 8px rgba(10, 37, 64, 0.06)' : 'none'
      }}
    >
      {/* Centered top display of the magnetic airplane asset in soft grey/off-white box */}
      <div style={{
        width: '100%',
        height: '95px',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        boxSizing: 'border-box'
      }}>
        {renderThumbnail(step.id)}
      </div>

      <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
        <div style={{ fontSize: '16.5px', fontWeight: 800, color: isUnlocked ? '#0A2540' : '#94A3B8' }}>
          {step.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'center' }}>
          {isPlaced ? (
            <>
              <CheckCircle2 size={16} color="#16A34A" />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#15803D' }}>Placed in Corridor</span>
            </>
          ) : !isUnlocked ? (
            <>
              <Lock size={15} color="#94A3B8" />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#94A3B8' }}>Locked</span>
            </>
          ) : (
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0A2540' }}>👆 Click to Place in Corridor</span>
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
        gridTemplateColumns: '1fr 500px',
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

        {/* RIGHT Column: Steps and Controls Panel matching Reference */}
        <div className="stage-right-column" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          height: 'fit-content',
          maxHeight: '100%',
          minHeight: 0,
          boxSizing: 'border-box'
        }}>
          {/* Card 1: Steps of Instructions */}
          <div className="stage-container-1" style={{
            background: '#FFFDF5',
            border: '1.5px solid #0A2540',
            borderRadius: '24px',
            padding: '1.25rem 1.45rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.95rem',
            height: 'fit-content',
            flexShrink: 0
          }}>
            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#0A2540', textAlign: 'left' }}>
              Steps of Instructions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="gold-step-badge" style={{ width: '42px', height: '42px', fontSize: '24px', marginTop: '3px' }}>
                  1
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '28px', color: '#0A2540', lineHeight: 1.3, fontWeight: 800 }}>
                    Click Airplane A in the tray below
                  </span>
                  <span style={{ fontSize: '24px', color: '#334155', lineHeight: 1.35, fontWeight: 600, marginTop: '3px' }}>
                    It will Placed it into the left flight corridor.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="gold-step-badge" style={{ width: '42px', height: '42px', fontSize: '24px', marginTop: '3px' }}>
                  2
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '28px', color: '#0A2540', lineHeight: 1.3, fontWeight: 800 }}>
                    Click Airplane B in the tray below
                  </span>
                  <span style={{ fontSize: '24px', color: '#334155', lineHeight: 1.35, fontWeight: 600, marginTop: '3px' }}>
                    It will Placed it into the right flight corridor.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Flight Components */}
          <div className="stage-container-2" style={{
            background: '#FFFFFF',
            border: '1.5px solid #0A2540',
            borderRadius: '24px',
            padding: '1.15rem 1.35rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            height: 'fit-content',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 900, color: '#0A2540' }}>
                Flight Components
              </h3>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  background: '#FFFFFF',
                  color: '#0A2540',
                  border: '1.5px solid #0A2540',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '16px',
                  fontWeight: 800,
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <RotateCcw size={16} color="#0A2540" /> Reset
              </button>
            </div>

            {/* Flight Components List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
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
                fontSize: '22px',
                fontWeight: 800,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: success ? undefined : '#F8FAFC',
                color: success ? '#FFFFFF' : '#CBD5E1',
                border: success ? undefined : '1.5px solid #E2E8F0',
                cursor: success ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              Proceed to Explore <ArrowRight size={22} color={success ? '#FFFFFF' : '#CBD5E1'} />
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
