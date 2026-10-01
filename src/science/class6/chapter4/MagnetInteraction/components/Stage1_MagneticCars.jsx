import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import MovingFieldArrows from './MovingFieldArrows';
import '../MagnetInteraction.css';

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

// ─── High-Resolution Wooden Toy Jeep with Antenna, Magnet & Glowing Magnetic Lines ───
function HighResWoodenJeep({ 
  carSide, // 'left' (faces right) or 'right' (faces left)
  carsMode // 'same' (repulsion) or 'different' (attraction)
}) {
  const isLeftCar = carSide === 'left';
  const jeepImageSrc = isLeftCar 
    ? '/MagnetInteraction/jeep_with_magnet_and_lines_left.png' 
    : (carsMode === 'same'
        ? '/MagnetInteraction/jeep_with_magnet_and_lines_right_repel.png'
        : '/MagnetInteraction/jeep_with_magnet_and_lines_right_attract.png');

  const glowingLinesSrc = isLeftCar
    ? '/MagnetInteraction/magnetic_glowing_lines_left.png'
    : (carsMode === 'same'
        ? '/MagnetInteraction/magnetic_glowing_lines_right_repel.png'
        : '/MagnetInteraction/magnetic_glowing_lines_right_attract.png');

  return (
    <div 
      style={{
        position: 'relative',
        width: '285px',
        userSelect: 'none',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.32))',
      }}
    >
      {/* ── Base Layer: Jeep with Magnet and Magnetic Field Lines & Arrows ── */}
      <img
        src={jeepImageSrc}
        alt={isLeftCar ? "Left Wooden Toy Jeep with Magnet & Magnetic Lines" : "Right Wooden Toy Jeep with Magnet & Magnetic Lines"}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* ── Glowing Overlay Layer: Exact Solid Yellow Lines & Arrows Glowing on Top ── */}
      <img
        src={glowingLinesSrc}
        alt="Luminous Magnetic Field Lines & Arrows"
        className="magnetic-glowing-lines-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* ── Continuously Moving Magnetic Field Arrows ── */}
      <MovingFieldArrows
        carSide={carSide}
        carsMode={carsMode}
      />
    </div>
  );
}

// ─── Main Step 1 Component (Full-Width Immersive Canvas) ───
export default function Stage1_MagneticCars({ carsMode = 'same', animTrigger = 0 }) {
  // Physical Positions on 0-24 cm ruler
  // Scale in background image spans from 4.8% (0 cm) to 95.2% (24 cm).
  // Total span = 90.4%. Center (12.0 cm) is at 50.0%.
  // Starting positions with wider physical retreat on scale:
  // - Left Jeep (Car A, facing right): nose starts at 6.2 cm (rear stays comfortably at 1.0 cm on scale)
  // - Right Jeep (Car B, facing left): nose starts at 17.8 cm (rear stays comfortably at 23.0 cm on scale)
  const START_A = 6.2;
  const START_B = 17.8;
  const TOTAL_TRACK_CM = 24.0;

  const [posA, setPosA] = useState(START_A); // cm (Left car nose)
  const [posB, setPosB] = useState(START_B); // cm (Right car nose)

  // Standard Bar Magnets:
  // - Left car: 'SN' -> North pole faces right toward Car B.
  // - Right car:
  //     carsMode === 'same' -> 'NS' (North faces left -> N-N Repulsion).
  //     carsMode === 'different' -> 'SN' (South faces left -> N-S Attraction).
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
      // Phase 1 (0 -> 1.50s): Inward approach from starting position (6.2cm / 17.8cm) to close proximity (11.2cm / 12.8cm, gap = 1.6cm)
      // Phase 2 (1.50 -> 3.10s): Strong repulsion push backward to starting positions (6.2cm / 17.8cm) strictly on scale
      // Phase 3 (3.10 -> 3.90s): Generous pause at starting positions before restarting loop
      const T_APPROACH = 1500; // ms
      const T_REPEL = 1600;    // ms
      const T_PAUSE = 800;     // ms
      const CYCLE_DURATION = T_APPROACH + T_REPEL + T_PAUSE;

      const targetPosA = 11.2;   // Left car nose comes close to 11.2 cm
      const targetPosB = 12.8;   // Right car nose comes close to 12.8 cm (gap = 1.6 cm, close repulsion!)

      const animateSamePoles = (currentTime) => {
        const totalElapsed = currentTime - animStartTimeRef.current;
        const elapsed = totalElapsed % CYCLE_DURATION;

        // Reset sound flag at start of each new cycle
        if (elapsed < 100) {
          humPlayed = false;
        }

        if (elapsed < T_APPROACH) {
          // 1. Inward Approach Phase (Coming closer together)
          const progress = Math.min(elapsed / T_APPROACH, 1);
          const ease = easeOutQuad(progress);
          const curA = START_A + (targetPosA - START_A) * ease;
          const curB = START_B + (targetPosB - START_B) * ease;
          setPosA(curA);
          setPosB(curB);

          if (progress > 0.88 && !humPlayed) {
            humPlayed = true;
            audioEngine.playRepelHum();
          }
        } else if (elapsed < T_APPROACH + T_REPEL) {
          // 2. Repulsion Push Phase (Reverse backward to start positions on scale)
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
          // 3. Clear Settle Pause at Starting Positions
          setPosA(START_A);
          setPosB(START_B);
        }

        animFrameRef.current = requestAnimationFrame(animateSamePoles);
      };

      animFrameRef.current = requestAnimationFrame(animateSamePoles);

    } else {
      // ─── Different Poles (N–S Attraction & Zero-Gap Crash Endless Loop):
      // Phase 1 (0 -> 1.50s): Move inward from starting positions (6.2cm / 17.8cm) with magnetic acceleration
      // Crash and fully touch at center of track (posA = 12.0, posB = 12.0) with ZERO GAP!
      // Phase 2 (1.50 -> 2.90s): Hold docked in contact
      // Phase 3 (2.90 -> 3.90s): Smooth reset back to starting positions (6.2cm / 17.8cm) strictly over the scale
      const T_ATTRACT = 1500; // ms
      const T_HOLD = 1400;    // ms
      const T_RESET = 1000;   // ms
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
          // 3. Smooth Reset Back to Starting Positions
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
    runAnimationSequence(carsMode);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [carsMode, animTrigger, runAnimationSequence]);

  // Convert ruler cm (0 to 24) to container percentage along the white scale
  // Ruler 0cm mark is at 4.8%, 24cm mark is at 95.2% (span = 90.4%)
  const percentA = 4.8 + (posA / TOTAL_TRACK_CM) * 90.4;
  const percentB = 4.8 + (posB / TOTAL_TRACK_CM) * 90.4;

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
      {/* ── Full-Width Photorealistic Laboratory Table Stage (Bright, Vivid, Crystal Clear) ── */}
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
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.08) contrast(1.06) saturate(1.12)',
          imageRendering: '-webkit-optimize-contrast',
          boxSizing: 'border-box'
        }}
      >
        {/* ── Centered Top Fixed Wooden Board Pop-Up (Clean Text on Wooden Container) ── */}
        <div style={{
          position: 'absolute',
          top: '0.65rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          width: 'clamp(620px, 68vw, 980px)',
          pointerEvents: 'none',
          userSelect: 'none',
          filter: 'drop-shadow(0 10px 28px rgba(0, 0, 0, 0.45))'
        }}>
          {/* Base Wooden Board Image */}
          <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            <img
              src="/MagnetInteraction/wooden_board_blank.png"
              alt="Magnetic Interaction Information Banner"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Top Small Plaque Title Area - Centered inside the brass plaque plate */}
            <div style={{
              position: 'absolute',
              top: '8.8%',
              height: '18.7%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '45%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box',
              padding: '0 6px',
            }}>
              <span style={{
                color: '#FFFFFF',
                fontFamily: 'Inter, Outfit, sans-serif',
                fontSize: 'clamp(0.95rem, 1.25vw, 1.25rem)',
                fontWeight: 900,
                letterSpacing: '0.02em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 0 2px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                {carsMode === 'same' ? 'Same Poles (N<->N)' : 'Opposite poles (N<->S)'}
              </span>
            </div>

            {/* Lower Main Board Explanatory Text Area - Spanning across 3 lines with justified alignment */}
            <div style={{
              position: 'absolute',
              top: '32%',
              bottom: '8%',
              left: '8%',
              right: '8%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              padding: '0 8px',
            }}>
              <p style={{
                margin: 0,
                color: '#FFFFFF',
                fontFamily: 'Inter, Outfit, sans-serif',
                fontSize: 'clamp(1.1rem, 1.48vw, 1.45rem)',
                fontWeight: 850,
                lineHeight: 1.4,
                textAlign: 'justify',
                textJustify: 'inter-word',
                letterSpacing: '0.005em',
                textShadow: '0 2px 5px rgba(0, 0, 0, 0.95), 0 0 3px #000000',
                width: '100%',
              }}>
                {carsMode === 'same'
                  ? 'Like poles repel! When both cars face each other with identical poles (N ↔ N), an invisible magnetic force pushes them apart without touching.'
                  : 'Unlike poles attract! When the cars face each other with opposite poles (N → S), a powerful magnetic force pulls them together until they touch.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── Interactive Track Plane: Wooden Toy Jeeps with Magnet & Magnetic Lines positioned on Track ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          {/* ── Left Wooden Toy Jeep (Jeep A, Facing Right - Nose anchored at percentA) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `${percentA}%`,
              transform: 'translateX(-100%)',
              bottom: '28.5%',
              zIndex: 6,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <HighResWoodenJeep
              carSide="left"
              carsMode={carsMode}
            />
          </div>

          {/* ── Right Wooden Toy Jeep (Jeep B, Facing Left - Nose anchored at percentB) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `${percentB}%`,
              transform: 'translateX(0%)',
              bottom: '28.5%',
              zIndex: 6,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <HighResWoodenJeep
              carSide="right"
              carsMode={carsMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


