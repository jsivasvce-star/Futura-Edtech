import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RotateCcw, RotateCw, ArrowRight, BookOpen, Leaf, Compass, Maximize2, Minimize2 } from 'lucide-react';

export default function Stage2_Floating({ onComplete }) {
  const [step, setStep] = useState('settled');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
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
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleTurnCork = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setStep('floating');
    setSpinCount(prev => prev + 1);

    const extraTurns = (Math.floor(Math.random() * 2) + 2) * 360;
    const direction = Math.random() > 0.5 ? 1 : -1;
    setRotationAngle(prev => prev + direction * extraTurns);

    setTimeout(() => {
      setRotationAngle(0);
      setTimeout(() => {
        setIsSpinning(false);
        setStep('settled');
      }, 700);
    }, 1100);
  };

  const handleReset = () => {
    setIsSpinning(false);
    setRotationAngle(0);
    setSpinCount(0);
    setStep('settled');
  };

  const renderCorkWithNeedle = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', perspective: '1200px', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(55deg)' }}>
        
        {isSpinning && (
          <>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: [0.6, 2.6], opacity: [0.85, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
              style={{ 
                position: 'absolute', top: -95, left: -95, width: 190, height: 190, 
                borderRadius: '50%', border: '2.5px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.7)',
                pointerEvents: 'none' 
              }}
            />
            <motion.div 
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: [0.4, 2.0], opacity: [0.75, 0] }}
              transition={{ duration: 0.9, delay: 0.35, repeat: Infinity, ease: 'easeOut' }}
              style={{ 
                position: 'absolute', top: -95, left: -95, width: 190, height: 190, 
                borderRadius: '50%', border: '2.5px solid rgba(253, 230, 138, 0.8)',
                pointerEvents: 'none' 
              }}
            />
          </>
        )}
        
        <motion.div
          animate={{ 
            z: [0, 5, 0],
            rotateX: [0, 1.5, 0] 
          }}
          transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }}
        >
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, width: 0, height: 0,
              transformStyle: 'preserve-3d', cursor: 'pointer', pointerEvents: 'auto'
            }}
            animate={{ rotateZ: rotationAngle }}
            transition={{ type: 'spring', stiffness: 100, damping: 14, mass: 1.1 }}
            onClick={handleTurnCork}
            title="Click to gently turn the floating compass cork"
          >
            <div style={{ position: 'absolute', width: 104, height: 104, left: -52, top: -52, transformStyle: 'preserve-3d' }}>
              <div style={{ 
                position: 'absolute', width: 114, height: 114, left: -5, top: -5, 
                borderRadius: '50%', background: 'rgba(3, 105, 161, 0.45)', 
                filter: 'blur(8px)', transform: 'translateZ(-4px)' 
              }} />

              {/* Realistic Cork Disc Slices */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{ 
                  position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', 
                  background: i === 15 
                    ? 'radial-gradient(circle at 35% 35%, #D4A373 0%, #BC6C25 50%, #8C4A15 100%)' 
                    : (i % 2 === 0 ? '#BC6C25' : '#A2591B'), 
                  boxShadow: i === 15 ? 'inset 0 0 12px rgba(0, 0, 0, 0.35), 0 0 4px rgba(245, 158, 11, 0.3)' : 'none',
                  border: i === 15 ? '1.5px solid #E9C46A' : 'none',
                  transform: `translateZ(${i * 0.8}px)` 
                }} />
              ))}

              {/* Extracted Magnetized Needle placed on top of cork */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateZ(18px) translate(-50%, -50%) rotate(-90deg)',
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.65)) drop-shadow(0 0 8px rgba(245, 158, 11, 0.45))',
                pointerEvents: 'none',
                width: '270px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/MagneticCompass/needle_magnetized.png"
                  alt="Magnetized needle"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: '0.5rem', 
      display: 'flex', 
      gap: '1.25rem', 
      height: '100%', 
      minHeight: 0, 
      overflow: 'hidden', 
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Left Side: 3D Ceramic Water Bowl & Floating Compass (65% width) */}
      <div style={{
        flex: '0 0 65%',
        maxWidth: '65%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '100%',
          flex: 1, 
          minHeight: '380px', 
          backgroundImage: `url('/floating_compass_bowl_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1.5px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)'
        }}>
          {/* Top Left Observation Badge mirroring Image 1 */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            zIndex: 30,
            background: '#FFFBEB',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.45rem 1.15rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            pointerEvents: 'none'
          }}>
            <Compass size={22} color="#92400E" strokeWidth={2.5} />
            <span style={{ fontSize: '1.1rem', color: '#1E1B4B', fontWeight: 900 }}>
              Observation: <span style={{ fontWeight: 700, color: '#334155' }}>Needle has settled</span>
            </span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.85rem',
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
            {isFullscreen ? <Minimize2 size={16} color="#0F172A" /> : <Maximize2 size={16} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* Floating Cork & Needle Layer in Center of Bowl */}
          <div style={{
            width: '450px',
            height: '410px',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0.2rem'
          }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {renderCorkWithNeedle()}
            </div>
          </div>

          {/* Bottom Floating Card mirroring Image 1 */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            width: '92%',
            maxWidth: '680px',
            background: '#FFFBEB',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.85rem 1.4rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #064E3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <Compass size={28} color="#064E3B" strokeWidth={2.5} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#064E3B',
                lineHeight: 1.25,
                letterSpacing: '-0.01em'
              }}>
                The needle settles approximately north–south.
              </div>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#334155',
                lineHeight: 1.25
              }}>
                You have made a simple magnetic compass.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: 2× Scaled Typography with Exact Layout (35% width) */}
      <div className="stage-right-column" style={{ flex: '0 0 35%', maxWidth: '35%' }}>
        {/* Container 1: Observe and repeat */}
        <div 
          className="stage-container-1"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.2rem 1.55rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row without "Compass ready" label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={30} color="#173B5F" strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '2.1rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Observe and repeat
              </h3>
            </div>
          </div>

          {/* Numbered Steps 1 to 3 with Warm Gold Step Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Let the water become still.' },
              { num: '2', text: 'Watch the needle stop turning.' },
              { num: '3', text: 'Turn the cork gently. Observe again.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  color: '#173B5F',
                  fontWeight: 700,
                  lineHeight: 1.35
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tip / Leaf Callout Green Box */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '16px',
            padding: '0.75rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              background: '#DCFCE7',
              padding: '0.45rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16A34A',
              flexShrink: 0
            }}>
              <Leaf size={24} color="#16A34A" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
              Keep nearby magnets and iron objects away.
            </span>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '0.1rem' }}>
            <button
              onClick={handleTurnCork}
              disabled={isSpinning}
              className={!isSpinning ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.35,
                padding: '0.95rem 1.4rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.65rem',
                background: isSpinning ? '#CBD5E1' : undefined,
                color: isSpinning ? '#64748B' : '#FFFFFF',
                border: isSpinning ? 'none' : undefined,
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCw size={24} className={isSpinning ? 'spin-anim' : ''} /> {isSpinning ? 'Turning Cork...' : 'Turn Cork Gently'}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 0.75,
                padding: '0.95rem 1.2rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.55rem',
                background: '#FFFBEB',
                color: '#92400E',
                border: '1.5px solid #FDE68A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={22} color="#92400E" /> Reset
            </button>
          </div>
        </div>

        {/* Container 2: What did you discover? */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.2rem 1.55rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle size={22} color="#FFFFFF" />
            </div>
            <h3 style={{ margin: 0, fontSize: '2.1rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
              What did you discover?
            </h3>
          </div>

          {/* Discovery Text */}
          <p style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#1E1B4B',
            lineHeight: 1.45,
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            The magnetized needle settles approximately north–south. Earth's magnetic field turns the needle, while the cork lets it rotate freely.
          </p>

          {/* Tip / Leaf Callout Green Box */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '16px',
            padding: '0.75rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              background: '#DCFCE7',
              padding: '0.45rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16A34A',
              flexShrink: 0
            }}>
              <Leaf size={24} color="#16A34A" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
              Water supports the cork. The cork supports the needle.
            </span>
          </div>

          {/* Helper Prompt Text */}
          <div style={{ fontSize: '1.25rem', color: '#475569', fontWeight: 600 }}>
            Repeat the test and compare the direction.
          </div>

          {/* Bottom Action Button: Proceed to Quiz */}
          <button
            onClick={onComplete}
            className="gold-glow-btn"
            style={{
              width: '100%',
              padding: '0.95rem 1.8rem',
              fontSize: '1.45rem',
              fontWeight: 900,
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Proceed to Quiz <ArrowRight size={22} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}

