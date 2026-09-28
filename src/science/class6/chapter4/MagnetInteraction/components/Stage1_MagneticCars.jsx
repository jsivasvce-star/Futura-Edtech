import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── Synthesized Web Audio Sound Engine ───
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playModeSwitch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (_) {}
  }

  playSnap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (_) {}
  }

  playRepelHum() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(75, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch (_) {}
  }
}

const audioEngine = new SoundEngine();

// ─── High-Resolution Wooden Car with Standard Bar Magnet ───
function HighResWoodenCar({ 
  carSide, // 'left' (faces right) or 'right' (faces left)
  magnetAsset, // '/assets/vintage_bar_magnet_ns.png' or '/assets/vintage_bar_magnet_sn.png'
  isFlipping
}) {
  const isLeftCar = carSide === 'left';
  const carImageSrc = isLeftCar 
    ? '/MagnetInteraction/car_left_facing_right.png' 
    : '/MagnetInteraction/car_right_facing_left.png';

  return (
    <div 
      style={{
        position: 'relative',
        width: '260px',
        height: '135px',
        userSelect: 'none',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.38))',
        transition: 'filter 0.2s ease',
      }}
    >
      {/* ── Standardized Bar Magnet (From Activity 4.6 Compass & Bar Magnet) ── */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '145px',
        height: '34px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '700px'
      }}>
        {/* Animated 3D Flip Container for Magnet */}
        <motion.div
          animate={{ rotateY: isFlipping ? 180 : 0 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))'
          }}
        >
          <img 
            src={magnetAsset}
            alt="Standard Bar Magnet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              pointerEvents: 'none'
            }}
          />
        </motion.div>
      </div>

      {/* ── High-Resolution Handcrafted Wooden Car Body ── */}
      <img
        src={carImageSrc}
        alt={isLeftCar ? "Left Wooden Toy Car (Facing Right)" : "Right Wooden Toy Car (Facing Left)"}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

// ─── Original Metric Ruler Track Guide Rail ───
function MetricRulerTrack() {
  const cmMarks = [];
  const totalCm = 24;

  for (let i = 0; i <= totalCm; i++) {
    cmMarks.push(i);
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: '68px',
      left: '25px',
      right: '25px',
      height: '56px',
      background: 'linear-gradient(180deg, #E2E8F0 0%, #CBD5E1 30%, #94A3B8 85%, #64748B 100%)',
      borderRadius: '8px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.45), inset 0 2px 2px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(0,0,0,0.4)',
      border: '1.5px solid #475569',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'visible',
      userSelect: 'none',
      zIndex: 2
    }}>
      {/* Top Guide Rail Ridge */}
      <div style={{
        height: '6px',
        width: '100%',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
        borderBottom: '1px solid #475569'
      }} />

      {/* Metric Centimeter and Millimeter Ticks SVG */}
      <svg 
        style={{ 
          width: '100%', 
          height: '46px', 
          overflow: 'visible' 
        }} 
        viewBox="0 0 1000 46" 
        preserveAspectRatio="none"
      >
        {cmMarks.map((cm) => {
          const xPercent = (cm / totalCm) * 1000;
          return (
            <g key={cm}>
              {/* Major 1cm Tick Line */}
              <line 
                x1={xPercent} 
                y1="0" 
                x2={xPercent} 
                y2="20" 
                stroke="#1E293B" 
                strokeWidth="2.4" 
              />
              {/* Centimeter Numerals */}
              <text 
                x={xPercent} 
                y="36" 
                textAnchor="middle" 
                fill="#0F172A" 
                fontSize="14" 
                fontWeight="800"
                fontFamily="JetBrains Mono, Inter, monospace"
              >
                {cm}
              </text>

              {/* 5mm Half-cm Tick */}
              {cm < totalCm && (
                <line 
                  x1={xPercent + (1000 / totalCm) * 0.5} 
                  y1="0" 
                  x2={xPercent + (1000 / totalCm) * 0.5} 
                  y2="13" 
                  stroke="#475569" 
                  strokeWidth="1.8" 
                />
              )}

              {/* 1mm Fine Sub-ticks */}
              {cm < totalCm && [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9].map((fraction, idx) => (
                <line 
                  key={idx}
                  x1={xPercent + (1000 / totalCm) * fraction} 
                  y1="0" 
                  x2={xPercent + (1000 / totalCm) * fraction} 
                  y2="8" 
                  stroke="#64748B" 
                  strokeWidth="1.1" 
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Center Track Sliding Channel */}
      <div style={{
        position: 'absolute',
        bottom: '3px',
        left: '10px',
        right: '10px',
        height: '4px',
        background: '#334155',
        borderRadius: '2px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)'
      }} />
    </div>
  );
}

// ─── Main Step 1 Component (Full-Width Immersive Canvas) ───
export default function Stage1_MagneticCars({ carsMode = 'same', animTrigger = 0 }) {
  // Physical Positions on 0-24 cm ruler
  // Anchoring:
  // - Left Car (Car A, facing right): nose is at posA cm. Rear is at (posA - carLength).
  //   START_A = 5.2 cm -> Car A sits perfectly between 0.0 cm and 5.2 cm.
  // - Right Car (Car B, facing left): nose is at posB cm. Rear is at (posB + carLength).
  //   START_B = 18.8 cm -> Car B sits perfectly between 18.8 cm and 24.0 cm (cannot move past ruler end).
  // - Full collision contact in center occurs when posA = 12.0 cm and posB = 12.0 cm (ZERO GAP!).
  const START_A = 5.2;
  const START_B = 18.8;
  const TOTAL_TRACK_CM = 24.0;

  const [posA, setPosA] = useState(START_A); // cm (Left car nose)
  const [posB, setPosB] = useState(START_B); // cm (Right car nose)

  // Standard Bar Magnets from Activity 4.6 (Compass and Bar Magnet):
  // - Left car: 'SN' -> North pole faces right toward Car B.
  // - Right car:
  //     carsMode === 'same' -> 'NS' (North faces left -> N-N Repulsion).
  //     carsMode === 'different' -> 'SN' (South faces left -> N-S Attraction).
  const magnetAssetA = '/assets/vintage_bar_magnet_sn.png'; // N faces right
  const magnetAssetB = carsMode === 'same' 
    ? '/assets/vintage_bar_magnet_ns.png' // N faces left
    : '/assets/vintage_bar_magnet_sn.png'; // S faces left

  const [isFlippingB, setIsFlippingB] = useState(false);

  // Animation frame and timing refs
  const animFrameRef = useRef(null);
  const animStartTimeRef = useRef(null);

  // Easing helper functions
  const easeOutQuad = (t) => t * (2 - t);
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeInQuad = (t) => t * t;

  // ─── Automated Continuous Endless Loop Animation Sequence ───
  const runAnimationSequence = useCallback((mode) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    animStartTimeRef.current = performance.now();
    let humPlayed = false;
    let snapPlayed = false;

    if (mode === 'same') {
      // ─── Same Poles (N–N Repulsion Endless Loop):
      // Phase 1 (0 -> 1.35s): Inward approach from opposite ends to safe distance (gap = 2.8cm)
      // Phase 2 (1.35 -> 2.70s): Repulsion push backward away from each other to starting ends
      // Phase 3 (2.70 -> 3.30s): Brief pause at ends before restarting loop
      const T_APPROACH = 1350; // ms
      const T_REPEL = 1350;    // ms
      const T_PAUSE = 600;     // ms
      const CYCLE_DURATION = T_APPROACH + T_REPEL + T_PAUSE;

      const targetPosA = 10.6;   // Left car nose reaches 10.6 cm
      const targetPosB = 13.4;   // Right car nose reaches 13.4 cm (Safe 2.8 cm gap, zero physical contact)

      const animateSamePoles = (currentTime) => {
        const totalElapsed = currentTime - animStartTimeRef.current;
        const elapsed = totalElapsed % CYCLE_DURATION;

        // Reset sound flag at start of each new cycle
        if (elapsed < 100) {
          humPlayed = false;
        }

        if (elapsed < T_APPROACH) {
          // 1. Inward Approach Phase
          const progress = Math.min(elapsed / T_APPROACH, 1);
          const ease = easeOutQuad(progress);
          const curA = START_A + (targetPosA - START_A) * ease;
          const curB = START_B + (targetPosB - START_B) * ease;
          setPosA(curA);
          setPosB(curB);

          if (progress > 0.85 && !humPlayed) {
            humPlayed = true;
            audioEngine.playRepelHum();
          }
        } else if (elapsed < T_APPROACH + T_REPEL) {
          // 2. Repulsion Push Phase (Reverse backward to ends)
          if (!humPlayed) {
            humPlayed = true;
            audioEngine.playRepelHum();
          }

          const repelProgress = Math.min((elapsed - T_APPROACH) / T_REPEL, 1);
          const ease = easeInOutCubic(repelProgress);
          const curA = targetPosA + (START_A - targetPosA) * ease;
          const curB = targetPosB + (START_B - targetPosB) * ease;
          setPosA(curA);
          setPosB(curB);
        } else {
          // 3. Brief Settle Pause at Starting Ends
          setPosA(START_A);
          setPosB(START_B);
        }

        animFrameRef.current = requestAnimationFrame(animateSamePoles);
      };

      animFrameRef.current = requestAnimationFrame(animateSamePoles);

    } else {
      // ─── Different Poles (N–S Attraction & Zero-Gap Crash Endless Loop):
      // Phase 1 (0 -> 1.40s): Move inward from opposite ends with magnetic acceleration
      // Crash and fully touch at center of track (posA = 12.0, posB = 12.0) with ZERO GAP!
      // Phase 2 (1.40 -> 2.70s): Hold docked in contact
      // Phase 3 (2.70 -> 3.50s): Smooth reset back to opposite starting ends
      const T_ATTRACT = 1400; // ms
      const T_HOLD = 1300;    // ms
      const T_RESET = 800;    // ms
      const CYCLE_DURATION = T_ATTRACT + T_HOLD + T_RESET;

      const dockCenter = 12.0; // 12.0 cm (Both car noses meet exactly at center line with ZERO GAP)

      const animateDifferentPoles = (currentTime) => {
        const totalElapsed = currentTime - animStartTimeRef.current;
        const elapsed = totalElapsed % CYCLE_DURATION;

        // Reset sound flag at start of each new cycle
        if (elapsed < 100) {
          snapPlayed = false;
        }

        if (elapsed < T_ATTRACT) {
          // 1. Magnetic Pull & Acceleration Phase
          const progress = Math.min(elapsed / T_ATTRACT, 1);
          const ease = 0.35 * easeInOutCubic(progress) + 0.65 * easeInQuad(progress);
          const curA = START_A + (dockCenter - START_A) * ease;
          const curB = START_B + (dockCenter - START_B) * ease;
          setPosA(curA);
          setPosB(curB);

          if (progress > 0.94 && !snapPlayed) {
            snapPlayed = true;
            audioEngine.playSnap();
          }
        } else if (elapsed < T_ATTRACT + T_HOLD) {
          // 2. Full Contact Docked Phase (Zero gap)
          if (!snapPlayed) {
            snapPlayed = true;
            audioEngine.playSnap();
          }
          setPosA(dockCenter);
          setPosB(dockCenter);
        } else {
          // 3. Smooth Reset Back to Opposite Ends
          const resetProgress = Math.min((elapsed - (T_ATTRACT + T_HOLD)) / T_RESET, 1);
          const ease = easeInOutCubic(resetProgress);
          const curA = dockCenter + (START_A - dockCenter) * ease;
          const curB = dockCenter + (START_B - dockCenter) * ease;
          setPosA(curA);
          setPosB(curB);
        }

        animFrameRef.current = requestAnimationFrame(animateDifferentPoles);
      };

      animFrameRef.current = requestAnimationFrame(animateDifferentPoles);
    }
  }, [START_A, START_B]);

  // Trigger automated endless loop animation on mount, mode change, or re-click trigger
  useEffect(() => {
    audioEngine.playModeSwitch();
    setIsFlippingB(true);
    const flipTimer = setTimeout(() => setIsFlippingB(false), 380);

    runAnimationSequence(carsMode);

    return () => {
      clearTimeout(flipTimer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [carsMode, animTrigger, runAnimationSequence]);

  // Convert cm to container pixel percentages
  const percentA = (posA / TOTAL_TRACK_CM) * 100;
  const percentB = (posB / TOTAL_TRACK_CM) * 100;

  return (
    <div 
      style={{ 
        width: '100%',
        height: '100%', 
        minHeight: 0, 
        overflow: 'hidden', 
        boxSizing: 'border-box',
        padding: '0.4rem 0.6rem',
        position: 'relative'
      }}
    >
      {/* ── Full-Width Photorealistic Laboratory Table Stage ── */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          border: '1.5px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundImage: `url('/MagnetInteraction/wooden_lab_bench_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          boxSizing: 'border-box',
          padding: '1.5rem',
          paddingBottom: '2.5rem'
        }}
      >
        {/* Soft Background Depth-of-Field Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 0%, rgba(15, 23, 42, 0.02) 60%, rgba(0, 0, 0, 0.18) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* ── Central Main Interactive Arena ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '290px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3
        }}>
          {/* ── Left Wooden Car (Car A, Facing Right - Anchored at front nose) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `calc(${percentA}% - 25px)`,
              transform: 'translateX(-100%)',
              bottom: '102px',
              zIndex: 6,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <HighResWoodenCar
              carSide="left"
              magnetAsset={magnetAssetA}
              isFlipping={false}
            />
          </div>

          {/* ── Right Wooden Car (Car B, Facing Left - Anchored at front nose) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `calc(${percentB}% - 25px)`,
              bottom: '102px',
              zIndex: 6,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <HighResWoodenCar
              carSide="right"
              magnetAsset={magnetAssetB}
              isFlipping={isFlippingB}
            />
          </div>

          {/* ── Original Metric Scale Ruler Track ── */}
          <MetricRulerTrack />
        </div>
      </div>
    </div>
  );
}
