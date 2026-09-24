import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, ArrowRight, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import ExactCompass from '../../components/ExactCompass.jsx';

export default function Stage2_Conclusion({ onComplete }) {
  const [needleAngle, setNeedleAngle] = useState(0); // 0deg = North
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const [customTransition, setCustomTransition] = useState(null);

  // 1. Deflect sequence (Autospin is disabled per user request):
  // - Rotate fast in clockwise direction
  // - Complete ONE FULL ROTATION in anticlockwise slowly (-360°)
  // - Stop stably in the North-South direction (0°)
  const handleDeflect = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const current = typeof needleAngle === 'number' 
      ? needleAngle 
      : (Array.isArray(needleAngle) ? needleAngle[needleAngle.length - 1] : 0);

    // Calculate next North-South target angle (exact multiple of 360°)
    const baseTarget = Math.ceil(current / 360) * 360;
    const finalNorthSouth = (baseTarget <= current) ? baseTarget + 720 : baseTarget + 360;
    
    // Peak clockwise overshoot is exactly one full 360° turn beyond North-South
    const peakClockwise = finalNorthSouth + 360;

    const animDuration = 3.6; // seconds
    setNeedleAngle([current, peakClockwise, finalNorthSouth]);
    setCustomTransition({
      duration: animDuration,
      times: [0, 0.35, 1],
      ease: ["easeOut", "easeInOut"]
    });

    setTimeout(() => {
      setNeedleAngle(0);
      setCustomTransition(null);
      setIsSpinning(false);
    }, animDuration * 1000 + 50);
  };

  return (
    <div style={{ 
      padding: '0.5rem 1rem', 
      display: 'flex', 
      gap: '1.25rem', 
      height: '100%', 
      minHeight: 0, 
      overflow: 'hidden', 
      boxSizing: 'border-box',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent'
    }}>
      {/* Left Side: Interactive Compass Lab Scene (65% width) */}
      <div style={{ 
        flex: '0 0 65%',
        maxWidth: '65%', 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0,
        height: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Scene Container with Exact Compass from Activity 4.7 */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '100%', 
            flex: 1, 
            minHeight: '380px', 
            borderRadius: '24px', 
            border: '1.5px solid rgba(255, 255, 255, 0.8)', 
            overflow: 'hidden', 
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)', 
            backgroundImage: `url('/SuspendedMagnet/conclusion_bg.jpg')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          {/* Top Left Floating Badge Overlay */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '20px',
              padding: '0.45rem 1.1rem',
              fontSize: '0.95rem',
              fontWeight: 900,
              color: '#0284C7',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Compass size={18} color="#0284C7" /> COMPASS DIAL ALIGNMENT
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: '16px',
              right: '20px',
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            {isFullscreen ? <Minimize2 size={15} color="#0F172A" /> : <Maximize2 size={15} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* Activity 4.7 Exact Compass Assembly with Matching Top Brass Thumb Loop */}
          <div style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 20, 
            marginTop: '24px' 
          }}>
            <ExactCompass 
              rotation={needleAngle} 
              size={290} 
              showThumbLoop={true} 
              onClick={handleDeflect} 
              transition={customTransition} 
            />
          </div>
        </div>
      </div>

      {/* Right Side: Scientific Finding & Interactive Controls (35% width) */}
      <div className="stage-right-column" style={{ flex: '0 0 35%', maxWidth: '35%' }}>
        {/* Container 1: Scientific Finding & Explanation */}
        <div 
          className="stage-container-1"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Sparkles size={28} color="#173B5F" strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '2.15rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Stage 2: Conclusion
              </h3>
            </div>

            {/* Bullet Points with Dot Bullets & Increased Font Size */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '16px',
                  padding: '0.95rem 1.25rem',
                  boxShadow: '0 2px 8px rgba(23, 59, 95, 0.04)'
                }}
              >
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#173B5F',
                  marginTop: '0.65rem',
                  flexShrink: 0
                }} />
                <p style={{
                  margin: 0,
                  fontSize: '1.45rem',
                  color: '#173B5F',
                  fontWeight: 650,
                  lineHeight: 1.4
                }}>
                  A freely suspended magnet or compass needle always aligns along the <strong style={{ color: '#0F172A', fontWeight: 900 }}>North–South direction</strong>.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '16px',
                  padding: '0.95rem 1.25rem',
                  boxShadow: '0 2px 8px rgba(23, 59, 95, 0.04)'
                }}
              >
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#173B5F',
                  marginTop: '0.65rem',
                  flexShrink: 0
                }} />
                <p style={{
                  margin: 0,
                  fontSize: '1.45rem',
                  color: '#173B5F',
                  fontWeight: 650,
                  lineHeight: 1.4
                }}>
                  The Sun's position provides an East–West reference to verify the magnet's North–South axis.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #CBD5E1',
            borderRadius: '16px',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <span style={{ fontSize: '1.65rem' }}>🧭</span>
            <span style={{ fontSize: '1.35rem', color: '#173B5F', fontWeight: 750, lineHeight: 1.35 }}>
              This directional property has guided global navigation for centuries.
            </span>
          </div>
        </div>

        {/* Container 2: Compass Controls & Action with Increased Typography */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.015em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Compass size={28} color="#173B5F" strokeWidth={2.5} /> Compass Deflection Test
            </div>
            <p style={{ fontSize: '1.4rem', color: '#173B5F', fontWeight: 650, margin: 0, lineHeight: 1.35 }}>
              Tap below to deflect the compass needle and observe it oscillate back to the North-South axis:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={handleDeflect}
              disabled={isSpinning}
              className={!isSpinning ? 'gold-glow-btn' : ''}
              style={{
                width: '100%',
                padding: '1.05rem 1.4rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '16px',
                background: isSpinning ? '#CBD5E1' : undefined,
                color: isSpinning ? '#64748B' : '#FFFFFF',
                border: isSpinning ? 'none' : undefined,
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCw size={26} className={isSpinning ? 'spin-anim' : ''} />
              {isSpinning ? 'Deflecting Needle...' : 'Deflect Compass Needle'}
            </button>

            {onComplete && (
              <button
                onClick={onComplete}
                className="gold-glow-btn"
                style={{
                  width: '100%',
                  padding: '1.05rem 1.4rem',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Proceed to Quiz <ArrowRight size={24} color="#FFFFFF" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
