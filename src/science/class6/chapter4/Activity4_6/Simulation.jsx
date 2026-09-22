import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  RotateCcw, 
  ArrowRight, 
  Compass as CompassIcon, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Play, 
  BookOpen
} from 'lucide-react';
import ExactCompass from '../components/ExactCompass.jsx';

const getBearingName = (deg) => {
  const norm = ((deg % 360) + 360) % 360;
  if (norm >= 337.5 || norm < 22.5) return 'N';
  if (norm >= 22.5 && norm < 67.5) return 'NE';
  if (norm >= 67.5 && norm < 112.5) return 'E';
  if (norm >= 112.5 && norm < 157.5) return 'SE';
  if (norm >= 157.5 && norm < 202.5) return 'S';
  if (norm >= 202.5 && norm < 247.5) return 'SW';
  if (norm >= 247.5 && norm < 292.5) return 'W';
  if (norm >= 292.5 && norm < 337.5) return 'NW';
  return '';
};

function playMagneticSound(type = 'snap') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    if (type === 'snap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.45);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {}
}

function getCatmullRomSplinePoint(points, t) {
  const numSegments = points.length - 3;
  const p = Math.max(0, Math.min(t, 1)) * numSegments;
  const i = Math.min(Math.floor(p), numSegments - 1);
  const u = p - i;

  const p0 = points[i];
  const p1 = points[i + 1];
  const p2 = points[i + 2];
  const p3 = points[i + 3];

  const u2 = u * u;
  const u3 = u2 * u;

  const x = 0.5 * (
    (2 * p1[0]) +
    (-p0[0] + p2[0]) * u +
    (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 +
    (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3
  );

  const y = 0.5 * (
    (2 * p1[1]) +
    (-p0[1] + p2[1]) * u +
    (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 +
    (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3
  );

  return { x, y };
}

export default function Simulation({ onComplete, onNext }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [compassAngle, setCompassAngle] = useState(0);
  const compassAngleRef = useRef(0);

  const setContinuousCompassAngle = useCallback((targetDeg) => {
    const prev = compassAngleRef.current;
    const delta = ((targetDeg - prev) % 360 + 540) % 360 - 180;
    const nextAngle = prev + delta;
    compassAngleRef.current = nextAngle;
    setCompassAngle(nextAngle);
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  isFlippedRef.current = isFlipped;

  const [pos, setPos] = useState({ x: -260, y: 230 });
  const posRef = useRef({ x: -260, y: 230 });
  posRef.current = pos;

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStation, setCurrentStation] = useState('corner');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const workspaceRef = useRef(null);
  const animFrameRef = useRef(null);
  const cancelSequenceRef = useRef(false);
  const timeoutsRef = useRef([]);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const img1 = new Image();
    img1.src = '/assets/magnet_bar_steampunk_ns.png';
    const img2 = new Image();
    img2.src = '/assets/magnet_bar_steampunk_sn.png';
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Fullscreen request failed: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const updateCompassPhysics = useCallback((x, y, flipped) => {
    const distCenter = Math.hypot(x, y);

    if (distCenter >= 330) {
      setContinuousCompassAngle(0);
      return;
    }

    const distTopLeft = Math.hypot(x - (-215), y - (-210));
    const distBottomRight = Math.hypot(x - 215, y - 205);

    if (distTopLeft < 90) {
      const blend = Math.max(0, 1 - distTopLeft / 90);
      const finalAngle = !flipped 
        ? 360 - 45 * blend 
        : 45 * blend;
      setContinuousCompassAngle((finalAngle + 360) % 360);
      return;
    }

    if (distBottomRight < 90) {
      const blend = Math.max(0, 1 - distBottomRight / 90);
      const finalAngle = !flipped 
        ? 360 - 45 * blend 
        : 45 * blend;
      setContinuousCompassAngle((finalAngle + 360) % 360);
      return;
    }

    const halfLen = 45;
    const leftPoleX = x - halfLen;
    const leftPoleY = y;
    const rightPoleX = x + halfLen;
    const rightPoleY = y;

    const northPoleX = flipped ? rightPoleX : leftPoleX;
    const northPoleY = flipped ? rightPoleY : leftPoleY;
    const southPoleX = flipped ? leftPoleX : rightPoleX;
    const southPoleY = flipped ? leftPoleY : rightPoleY;

    const B_EARTH = 1.0;
    const K_MAGNETIC = 1200000;
    const EPSILON_SQ = 2400;
    const R_MAX = 560;

    let fx = 0;
    let fy = -B_EARTH;

    const distN = Math.hypot(northPoleX, northPoleY);
    if (distN < R_MAX) {
      const falloff = Math.max(0, 1 - distN / R_MAX);
      const forceN = (K_MAGNETIC / (distN * distN + EPSILON_SQ)) * falloff * falloff;
      fx += (-northPoleX / distN) * forceN;
      fy += (-northPoleY / distN) * forceN;
    }

    const distS = Math.hypot(southPoleX, southPoleY);
    if (distS < R_MAX) {
      const falloff = Math.max(0, 1 - distS / R_MAX);
      const forceS = (K_MAGNETIC / (distS * distS + EPSILON_SQ)) * falloff * falloff;
      fx += (southPoleX / distS) * forceS;
      fy += (southPoleY / distS) * forceS;
    }

    const targetRad = Math.atan2(fx, -fy);
    let targetDeg = targetRad * (180 / Math.PI);
    targetDeg = (targetDeg + 360) % 360;

    setContinuousCompassAngle(targetDeg);
  }, [setContinuousCompassAngle]);

  useEffect(() => {
    updateCompassPhysics(pos.x, pos.y, isFlipped);
  }, [pos, isFlipped, updateCompassPhysics]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(() => {
      if (!cancelSequenceRef.current) fn();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const animateAlongSpline = useCallback((points, duration = 1400, onCompleteCallback) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(true);
    playMagneticSound('whoosh');

    const startTime = performance.now();

    const frame = (currentTime) => {
      if (cancelSequenceRef.current) {
        setIsAnimating(false);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentPoint = getCatmullRomSplinePoint(points, ease);
      setPos(currentPoint);
      updateCompassPhysics(currentPoint.x, currentPoint.y, isFlippedRef.current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      } else {
        const lastPoint = points[points.length - 2];
        setPos({ x: lastPoint[0], y: lastPoint[1] });
        updateCompassPhysics(lastPoint[0], lastPoint[1], isFlippedRef.current);
        setIsAnimating(false);
        playMagneticSound('snap');
        if (onCompleteCallback && !cancelSequenceRef.current) onCompleteCallback();
      }
    };

    animFrameRef.current = requestAnimationFrame(frame);
  }, [updateCompassPhysics]);

  const handleFlipMagnet = () => {
    if (isAnimating) return;
    playMagneticSound('snap');
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    isFlippedRef.current = nextFlipped;
    updateCompassPhysics(pos.x, pos.y, nextFlipped);
  };

  const runFullSequence = () => {
    if (isAnimating) return;

    clearAllTimeouts();
    cancelSequenceRef.current = false;

    const currentFlipped = isFlippedRef.current;
    setCurrentStation('top-left');
    setCurrentStep(2);

    const startX = posRef.current.x;
    const startY = posRef.current.y;

    const splinePoints1 = [
      [startX, startY],
      [startX, startY],
      [-260, 60],
      [-245, -80],
      [-215, -210],
      [-215, -210]
    ];

    animateAlongSpline(splinePoints1, 1400, () => {
      updateCompassPhysics(-215, -210, currentFlipped);

      addTimeout(() => {
        setCurrentStation('bottom-right');
        setCurrentStep(3);

        const splinePoints2 = [
          [-215, -210],
          [-215, -210],
          [-80, -250],
          [80, -250],
          [240, -100],
          [250, 60],
          [215, 205],
          [215, 205]
        ];

        animateAlongSpline(splinePoints2, 1800, () => {
          updateCompassPhysics(215, 205, currentFlipped);

          addTimeout(() => {
            setCurrentStation('corner');
            setCurrentStep(4);

            const splinePoints3 = [
              [215, 205],
              [215, 205],
              [80, 260],
              [-80, 265],
              [-260, 230],
              [-260, 230]
            ];

            animateAlongSpline(splinePoints3, 1400, () => {
              compassAngleRef.current = 0;
              setCompassAngle(0);
              updateCompassPhysics(-260, 230, currentFlipped);
              if (onComplete) onComplete();
            });
          }, 3000);
        });
      }, 2800);
    });
  };

  const handlePointerDown = (e) => {
    if (isAnimating) return;
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: pos.x,
      startY: pos.y
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    const newX = Math.max(-290, Math.min(290, dragStartRef.current.startX + dx));
    const newY = Math.max(-260, Math.min(260, dragStartRef.current.startY + dy));
    setPos({ x: newX, y: newY });
    updateCompassPhysics(newX, newY, isFlipped);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  let positionDisplay = 'Start • Farther from compass';
  if (currentStation === 'top-left') {
    positionDisplay = 'Station 1 • Top-Left Station';
  } else if (currentStation === 'bottom-right') {
    positionDisplay = 'Station 2 • Bottom-Right Station';
  } else if (currentStep === 4) {
    positionDisplay = 'Return • Settled at Start';
  }

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '520px 1fr',
        gap: '1.25rem',
        padding: '0.5rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Left Column: 2× Scaled Typography with Exact Layout & Content */}
      <div className="stage-left-column">
        {/* Container 1: Explore the compass */}
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
          {/* Header */}
          <h3 style={{ margin: 0, fontSize: '2.15rem', fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.02em' }}>
            Explore the compass
          </h3>

          {/* 4 Numbered Steps with 2× Scaled Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Click Start Demo to move the magnet through four positions.' },
              { num: '2', text: 'Watch the needle turn as the magnet moves nearby.' },
              { num: '3', text: 'Move the magnet farther away and watch the needle settle.' },
              { num: '4', text: 'Flip or drag the magnet to explore a new direction.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #214A70 0%, #0A1931 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(10, 25, 49, 0.3)'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontSize: '1.45rem',
                  color: '#173B5F',
                  fontWeight: 700,
                  lineHeight: 1.35
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Yellow Lightbulb Tip Callout */}
          <div style={{
            background: '#FEF9C3',
            border: '1.5px solid #FDE047',
            borderRadius: '16px',
            padding: '0.75rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <span style={{ fontSize: '1.6rem' }}>💡</span>
            <span style={{ fontSize: '1.38rem', fontWeight: 800, color: '#1E1B4B', lineHeight: 1.25 }}>
              A compass needle is a small magnet.
            </span>
          </div>
        </div>

        {/* Container 2: Observation status */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '2.15rem', fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.02em' }}>
              Observation status
            </h3>
            <span style={{
              background: '#DCFCE7',
              color: '#15803D',
              fontWeight: 900,
              fontSize: '1.15rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '20px',
              border: '1.5px solid #86EFAC'
            }}>
              Step {currentStep} of 4
            </span>
          </div>

          {/* Status Box 1: Magnet position */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#173B5F' }}>
              Magnet position
            </span>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1E1B4B' }}>
              {positionDisplay}
            </span>
          </div>

          {/* Status Box 2: Magnet orientation */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#173B5F' }}>
              Magnet orientation
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Visual 2-Pole Magnet Pill */}
              <div style={{
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #0F172A',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  background: isFlipped ? '#1D4ED8' : '#DC2626',
                  color: '#FFFFFF',
                  padding: '3px 12px',
                  fontWeight: 900,
                  fontSize: '1.15rem'
                }}>
                  {isFlipped ? 'S' : 'N'}
                </div>
                <div style={{
                  background: isFlipped ? '#DC2626' : '#1D4ED8',
                  color: '#FFFFFF',
                  padding: '3px 12px',
                  fontWeight: 900,
                  fontSize: '1.15rem'
                }}>
                  {isFlipped ? 'N' : 'S'}
                </div>
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1E1B4B' }}>
                {isFlipped ? 'S → N' : 'N → S'}
              </span>
            </div>
          </div>

          {/* Helper Prompt Text */}
          <div style={{ fontSize: '1.25rem', color: '#173B5F', fontWeight: 600 }}>
            Watch what changes when the magnet moves closer.
          </div>

          {/* Bottom Action Button: Proceed to Quiz */}
          <button
            type="button"
            onClick={onNext}
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

      {/* Right Column: Nautical Sea Workspace Arena with Compass */}
      <div 
        ref={workspaceRef}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid #173B5F',
          backgroundImage: `url('/nautical_map_compass_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.25), 0 8px 32px rgba(6, 78, 59, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
      >
        {/* Top Control Bar across Activity Area */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
          pointerEvents: 'none',
          gap: '0.75rem'
        }}>
          {/* Left: Live Bearing Badge */}
          <div style={{
            pointerEvents: 'auto',
            background: 'rgba(255, 253, 245, 0.96)',
            border: '1.5px solid #EADBB6',
            borderRadius: '16px',
            padding: '0.45rem 1.05rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8px)',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#173B5F', fontSize: '0.95rem', fontWeight: 900 }}>
              <CompassIcon size={20} color="#173B5F" />
              <span>BEARING: <strong style={{ color: '#0369A1' }}>{Math.round((compassAngle % 360 + 360) % 360)}°</strong> {getBearingName(compassAngle)}</span>
            </div>
          </div>

          {/* Right: Fullscreen Button */}
          <div style={{ pointerEvents: 'auto', flexShrink: 0 }}>
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '14px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: '#0F172A',
                fontSize: '0.85rem',
                fontWeight: 800,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              {isFullscreen ? <Minimize2 size={16} color="#0F172A" /> : <Maximize2 size={16} color="#0F172A" />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>

        {/* Central Arena: Compass + Flat Horizontal Dual-Pole Bar Magnet */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              zIndex: 10
            }}
          >
            <ExactCompass 
              rotation={compassAngle} 
              size={310} 
              onCenterClick={() => setCompassAngle(0)} 
              onClick={() => setCompassAngle(0)} 
            />
          </div>

          {/* Flat Horizontal Dual-Pole Bar Magnet */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)`,
              position: 'absolute',
              cursor: isAnimating ? 'default' : 'grab',
              zIndex: 30,
              userSelect: 'none',
              touchAction: 'none',
              willChange: 'transform'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <div 
                onClick={!isAnimating ? handleFlipMagnet : undefined}
                title="Click to Flip Polarity (North ↔ South)"
                style={{
                  width: '168px',
                  height: '56px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isAnimating ? 'default' : 'pointer',
                  userSelect: 'none',
                  filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.2))',
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isAnimating) e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isAnimating) e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  key={isFlipped ? 'steampunk-sn' : 'steampunk-ns'}
                  src={isFlipped ? '/assets/magnet_bar_steampunk_sn.png' : '/assets/magnet_bar_steampunk_ns.png'}
                  alt={isFlipped ? "Bar Magnet (South-North Polarity)" : "Bar Magnet (North-South Polarity)"}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom-Right Corner Action Controls: "Flip Magnet" & "Start Demo" */}
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 35,
          pointerEvents: 'auto'
        }}>
          <button
            type="button"
            onClick={handleFlipMagnet}
            disabled={isAnimating}
            title="Flip Magnet Polarity (North ↔ South)"
            style={{
              padding: '0.65rem 1.35rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #E2E8F0',
              color: '#173B5F',
              fontWeight: 900,
              fontSize: '1.05rem',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              opacity: isAnimating ? 0.6 : 1
            }}
          >
            <RefreshCw size={18} color="#173B5F" />
            <span>Flip Magnet</span>
          </button>

          <button
            type="button"
            onClick={runFullSequence}
            disabled={isAnimating}
            className="gold-glow-btn"
            style={{
              padding: '0.65rem 1.65rem',
              borderRadius: '16px',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '1.15rem',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              transition: 'all 0.25s ease',
              opacity: isAnimating ? 0.85 : 1,
              boxShadow: '0 4px 18px rgba(217, 119, 6, 0.45)'
            }}
          >
            <Play size={20} fill="#FFFFFF" color="#FFFFFF" className={isAnimating ? 'animate-pulse' : ''} />
            <span>{isAnimating ? 'Running...' : 'Start Demo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}