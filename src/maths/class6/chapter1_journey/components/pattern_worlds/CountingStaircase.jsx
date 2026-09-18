import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Video, Footprints, Sparkles, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';

/**
 * 2. COUNTING NUMBERS — REALISTIC ARCHITECTURAL STAIRCASE
 * Sequence: 1 → 2 → 3 → 4 → 5 → 6 → …
 *
 * Visual Concept:
 * - Photorealistic live-action 4K video clip recording a person climbing an architectural
 *   solid oak & concrete staircase in a sunlit university atrium.
 * - Gimbal tracking shot follows the climber upward.
 * - Sequence progression: Starts with 1 step, then reveals 2, then 3, then 4, then 5, then 6.
 * - Each stage clearly demonstrates adding exactly ONE physical step.
 *
 * Pedagogical Goal:
 * - Visualizes the fundamental counting progression (+1 each time) through physical elevation.
 */

const STAIR_STAGES = [
  { step: 1, count: 1, label: 'Step 1', time: '00:00 - 00:03', note: 'Base elevation: 1 Step' },
  { step: 2, count: 2, label: 'Step 2', time: '00:03 - 00:07', note: 'Climbed +1: Total 2 Steps' },
  { step: 3, count: 3, label: 'Step 3', time: '00:07 - 00:11', note: 'Climbed +1: Total 3 Steps' },
  { step: 4, count: 4, label: 'Step 4', time: '00:11 - 00:15', note: 'Climbed +1: Total 4 Steps' },
  { step: 5, count: 5, label: 'Step 5', time: '00:15 - 00:19', note: 'Climbed +1: Total 5 Steps' },
  { step: 6, count: 6, label: 'Step 6', time: '00:19 - 00:24', note: 'Climbed +1: Total 6 Steps' },
  { step: 0, count: 6, label: 'Wide View', time: '00:24 - 00:28', note: 'Full Flight Overview (1 to 6)' }
];

export default function CountingStaircase() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const timerRef = useRef(null);

  const activeStage = STAIR_STAGES[currentStageIdx];
  const isWide = activeStage.step === 0;
  const currentStepNumber = isWide ? 6 : activeStage.step;

  // Auto-play timer simulating natural continuous video footage playback
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev + 1) % STAIR_STAGES.length);
    }, 3500);

    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update video timeline scrubber percentage
  useEffect(() => {
    const total = STAIR_STAGES.length;
    const progress = ((currentStageIdx + 1) / total) * 100;
    setVideoProgress(progress);
  }, [currentStageIdx]);

  const handleNext = () => {
    setCurrentStageIdx((prev) => (prev + 1) % STAIR_STAGES.length);
  };

  const handlePrev = () => {
    setCurrentStageIdx((prev) => (prev === 0 ? STAIR_STAGES.length - 1 : prev - 1));
  };

  const handleSelectStage = (idx) => {
    setCurrentStageIdx(idx);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    setIsPlaying(true);
  };

  // Gimbal tracking camera transform calculations
  // Simulates a Steadicam operator following the climber up the staircase
  const getGimbalTransform = () => {
    if (isWide) {
      return { scale: 1.0, translateX: 0, translateY: 0 };
    }
    const trackingCoordinates = {
      1: { scale: 1.55, translateX: 8, translateY: 14 },
      2: { scale: 1.50, translateX: 5, translateY: 9 },
      3: { scale: 1.45, translateX: 2, translateY: 4 },
      4: { scale: 1.40, translateX: -1, translateY: -2 },
      5: { scale: 1.35, translateX: -4, translateY: -8 },
      6: { scale: 1.30, translateX: -7, translateY: -14 }
    };
    return trackingCoordinates[activeStage.step] || { scale: 1.0, translateX: 0, translateY: 0 };
  };

  const cameraTransform = getGimbalTransform();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      userSelect: 'none',
      overflow: 'hidden',
      backgroundColor: '#070b14',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* ── REAL 4K CINEMATIC FOOTAGE BACKDROP ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/images/patterns/staircase_real.jpg"
          alt="Architectural Staircase in Atrium"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 58%',
            filter: 'contrast(1.08) saturate(1.06) brightness(0.86)',
            transform: `scale(${cameraTransform.scale * 1.03}) translate(${cameraTransform.translateX * 0.25}%, ${cameraTransform.translateY * 0.25}%)`,
            transition: 'transform 1.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />

        {/* Natural daylight window spill from left & realistic lens vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 35%, rgba(254,243,199,0.12) 0%, rgba(15,23,42,0.45) 60%, rgba(7,11,20,0.85) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Polished Concrete Atrium Floor Shadow Base */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '38%',
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(7, 11, 20, 1) 100%)',
          borderTop: '2px solid rgba(254, 215, 170, 0.2)',
          boxShadow: 'inset 0 4px 20px rgba(255,255,255,0.08), 0 -12px 30px rgba(0,0,0,0.85)'
        }}>
          {/* Subtle reflection of staircase treads on polished floor */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.14) 0%, transparent 65%)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* ── TOP HUD / CAMERA METADATA BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        background: 'rgba(10, 15, 29, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              boxShadow: isPlaying ? '0 0 8px #ef4444' : 'none',
              animation: isPlaying ? 'pulse 1.2s infinite' : 'none'
            }} />
            <span style={{ color: '#fca5a5', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em' }}>
              {isPlaying ? 'REC LIVE' : 'PAUSED'}
            </span>
          </div>

          <span style={{ color: '#f8fafc', fontSize: '0.92rem', fontWeight: 800 }}>
            Atrium Staircase: <span style={{ color: '#fde68a' }}>Counting Progression (1 → 2 → 3 → 4 → 5 → 6...)</span>
          </span>
        </div>

        {/* Video Camera Controls & Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            color: '#cbd5e1',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(255,255,255,0.08)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Video size={13} color="#f59e0b" />
            <span>4K UHD • 30 FPS • GIMBAL TRACKING • 35mm f/2.4</span>
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: isPlaying ? 'rgba(217, 119, 6, 0.25)' : 'rgba(34, 197, 94, 0.25)',
              border: isPlaying ? '1px solid #d97706' : '1px solid #16a34a',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause Clip' : 'Play Clip'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: '#cbd5e1',
              cursor: 'pointer'
            }}
            title="Reset to Step 1"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── CINEMATIC CAMERA STAGE: 6 PHYSICAL ARCHITECTURAL STAIR STEPS ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Dynamic Gimbal Tracking Rig */}
        <div style={{
          width: '100%',
          maxWidth: '920px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '32px',
          transform: `scale(${cameraTransform.scale}) translate(${cameraTransform.translateX}%, ${cameraTransform.translateY}%)`,
          transition: 'transform 1.3s cubic-bezier(0.25, 1, 0.5, 1)',
          transformOrigin: '40% 70%'
        }}>
          {/* ── REALISTIC STAIRCASE FLIGHT RIG (Revealing 1 -> 2 -> 3 -> 4 -> 5 -> 6) ── */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '8px',
            padding: '20px 24px',
            background: 'rgba(10, 15, 28, 0.65)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 24px 50px rgba(0,0,0,0.85)'
          }}>
            {[1, 2, 3, 4, 5, 6].map((stepNum) => {
              const isRevealed = stepNum <= currentStepNumber;
              const isCurrentClimberStep = !isWide && activeStage.step === stepNum;
              const stepHeight = stepNum * 32; // Physical elevation height: 32px per step

              return (
                <div
                  key={stepNum}
                  onClick={() => {
                    setCurrentStageIdx(stepNum - 1);
                    setIsPlaying(false);
                  }}
                  style={{
                    width: '92px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.5s ease',
                    opacity: isRevealed ? 1 : 0.28,
                    filter: isRevealed ? 'none' : 'grayscale(80%) brightness(0.6)'
                  }}
                  title={`Step ${stepNum}: Elevation of ${stepNum} step units`}
                >
                  {/* ── REALISTIC CLIMBER FOOTSTEP POSITION RETICLE ── */}
                  {isCurrentClimberStep && (
                    <div style={{
                      position: 'absolute',
                      bottom: `${stepHeight + 10}px`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10,
                      animation: 'fadeIn 0.35s ease'
                    }}>
                      {/* Optical Camera Crosshair Tracking Target */}
                      <div style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.7)',
                        whiteSpace: 'nowrap'
                      }}>
                        <Footprints size={12} strokeWidth={2.5} />
                        <span>CLIMBER AT STEP {stepNum}</span>
                      </div>

                      {/* Realistic Athletic Footwear Contact Impression */}
                      <div style={{
                        marginTop: '4px',
                        width: '28px',
                        height: '10px',
                        borderRadius: '6px',
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(254, 240, 138, 0.9) 0%, rgba(217, 119, 6, 0.7) 100%)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.8), 0 0 10px #f59e0b'
                      }} />
                    </div>
                  )}

                  {/* Physical Quantity Badges: Exactly N markers showing the accumulated steps */}
                  <div style={{
                    position: 'absolute',
                    bottom: `${stepHeight - 26}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px',
                    zIndex: 4
                  }}>
                    {Array.from({ length: stepNum }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: isRevealed
                            ? 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fde047 60%, #b45309 100%)'
                            : 'rgba(255,255,255,0.2)',
                          boxShadow: isRevealed ? '0 0 6px #fde047' : 'none',
                          border: '1px solid rgba(255,255,255,0.7)'
                        }}
                      />
                    ))}
                  </div>

                  {/* ── PHYSICAL ARCHITECTURAL STEP OBJECT (Solid Oak Tread + Concrete Riser) ── */}
                  <div style={{
                    width: '100%',
                    height: `${stepHeight}px`,
                    position: 'relative',
                    borderRadius: '4px 4px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isRevealed
                      ? '0 14px 28px rgba(0,0,0,0.75), inset 0 2px 5px rgba(255,255,255,0.3)'
                      : '0 4px 10px rgba(0,0,0,0.4)',
                    border: isCurrentClimberStep
                      ? '2px solid #fde047'
                      : isRevealed
                        ? '1.5px solid rgba(254, 215, 170, 0.6)'
                        : '1px solid rgba(255, 255, 255, 0.15)',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease'
                  }}>
                    {/* Top Solid Oak Tread Surface */}
                    <div style={{
                      height: '14px',
                      background: isRevealed
                        ? 'linear-gradient(90deg, #d97706 0%, #f59e0b 35%, #b45309 75%, #78350f 100%)'
                        : 'linear-gradient(90deg, #475569 0%, #334155 100%)',
                      borderBottom: '2px solid #78350f',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {/* Brass Anti-Slip Nosing Strip on Front Edge */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: isRevealed ? '#fef08a' : 'rgba(255,255,255,0.3)',
                        boxShadow: isRevealed ? '0 1px 3px rgba(0,0,0,0.5)' : 'none'
                      }} />
                    </div>

                    {/* Architectural Concrete / Stone Vertical Riser */}
                    <div style={{
                      flex: 1,
                      background: isRevealed
                        ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 60%, #020617 100%)'
                        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {/* Deep cast shadow under the tread nosing */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 100%)'
                      }} />

                      {/* Step Number Engraving */}
                      <span style={{
                        color: isRevealed ? '#f8fafc' : '#64748b',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        textShadow: '0 2px 6px rgba(0,0,0,0.95)'
                      }}>
                        {stepNum}
                      </span>
                    </div>
                  </div>

                  {/* Floor Label Tag */}
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <span style={{
                      color: isCurrentClimberStep ? '#fde047' : isRevealed ? '#e2e8f0' : '#64748b',
                      fontSize: '0.82rem',
                      fontWeight: 800
                    }}>
                      Step {stepNum}
                    </span>
                    <span style={{
                      color: isRevealed ? '#fbbf24' : '#475569',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}>
                      +{stepNum === 1 ? '1 Base' : '1 Step'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── VIDEO SCRUBBER & CAMERA TIMELINE BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        background: 'rgba(7, 11, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '10px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Continuous Video Timeline Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 700 }}>
            {activeStage.time.split(' - ')[0]}
          </span>

          <div style={{
            flex: 1,
            height: '6px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: `${videoProgress}%`,
              backgroundColor: '#f59e0b',
              boxShadow: '0 0 10px #f59e0b',
              transition: 'width 0.6s linear'
            }} />
          </div>

          <span style={{ color: '#94a3b8', fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 700 }}>
            00:28
          </span>
        </div>

        {/* Step Navigation & View Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#f8fafc',
                padding: '4px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Previous Step"
            >
              <ChevronLeft size={14} />
            </button>

            {STAIR_STAGES.map((stg, idx) => {
              const isActive = currentStageIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectStage(idx)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: isActive
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    border: isActive
                      ? '1px solid #fde68a'
                      : '1px solid rgba(255,255,255,0.12)',
                    boxShadow: isActive ? '0 2px 8px rgba(245, 158, 11, 0.5)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {stg.step === 0 ? <Maximize2 size={11} /> : null}
                  <span>{stg.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleNext}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#f8fafc',
                padding: '4px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Next Step"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Mathematical Discovery Banner */}
          <div style={{
            background: 'rgba(217, 119, 6, 0.18)',
            border: '1.5px solid #f59e0b',
            borderRadius: '16px',
            padding: '4px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fef3c7',
            fontSize: '0.86rem',
            fontWeight: 800
          }}>
            <Sparkles size={14} color="#fbbf24" />
            <span>
              <strong>Counting Numbers Rule:</strong> Each climb physically adds 1 step: <strong style={{ color: '#fde047', fontSize: '0.96rem' }}>1 → 2 → 3 → 4 → 5 → 6...</strong> (+1 each time)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
