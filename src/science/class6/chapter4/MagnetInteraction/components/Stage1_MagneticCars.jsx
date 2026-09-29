import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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

// ─── Luminous Yellow Magnetic Field Orbital Rings ───
function MagneticFieldRings() {
  return (
    <div className="magnetic-field-rings-container">
      {/* Outer revolving yellow orbital ring */}
      <div className="magnetic-field-ring-1" />
      {/* Inner revolving yellow orbital ring */}
      <div className="magnetic-field-ring-2" />
    </div>
  );
}

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

  // Move the bar magnet slightly backward on top of the car
  // Left car faces right -> backward is to the left (40%)
  // Right car faces left -> backward is to the right (60%)
  const magnetLeftPos = isLeftCar ? '41%' : '59%';

  return (
    <div 
      style={{
        position: 'relative',
        width: '320px',
        height: '142px',
        userSelect: 'none',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
        transition: 'filter 0.2s ease',
      }}
    >
      {/* ── Standardized Bar Magnet (Slightly larger, increased subtle gap above car roof, positioned backward) ── */}
      <div style={{
        position: 'absolute',
        top: '-29px',
        left: magnetLeftPos,
        transform: 'translateX(-50%)',
        width: '168px',
        height: '38px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '700px'
      }}>
        {/* Subtle Glowing Yellow Orbital Magnetic Field Rings */}
        <MagneticFieldRings />

        {/* Animated 3D Flip Container for Magnet */}
        <motion.div
          animate={{ rotateY: isFlipping ? 180 : 0 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          style={{
            width: '100%',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))'
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

// ─── Main Step 1 Component (Full-Width Immersive Canvas) ───
export default function Stage1_MagneticCars({ carsMode = 'same', animTrigger = 0 }) {
  // Physical Positions on 0-24 cm ruler
  // Scale in background image spans from 4.8% (0 cm) to 95.2% (24 cm).
  // Total span = 90.4%. Center (12.0 cm) is at 50.0%.
  // Starting positions:
  // - Left Car (Car A, facing right): nose at posA. Rear sits at ruler start (0.0 cm to 5.2 cm).
  // - Right Car (Car B, facing left): nose at posB. Rear sits at ruler end (18.8 cm to 24.0 cm).
  const START_A = 5.2;
  const START_B = 18.8;
  const TOTAL_TRACK_CM = 24.0;

  const [posA, setPosA] = useState(START_A); // cm (Left car nose)
  const [posB, setPosB] = useState(START_B); // cm (Right car nose)

  // Standard Bar Magnets:
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
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxSizing: 'border-box'
        }}
      >
        {/* Soft Ambient Depth Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 0%, rgba(15, 23, 42, 0.01) 50%, rgba(0, 0, 0, 0.12) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

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
              width: '41%',
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
                fontSize: 'clamp(0.85rem, 1.15vw, 1.15rem)',
                fontWeight: 900,
                letterSpacing: '0.015em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 0 2px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                {carsMode === 'same' ? (
                  <>
                    <span style={{ color: '#FBBF24' }}>⚡</span>
                    <span>Same Poles (N ↔ N) : Magnetic Repulsion</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#F87171' }}>🧲</span>
                    <span>Opposite Poles (N → S) : Magnetic Attraction</span>
                  </>
                )}
              </span>
            </div>

            {/* Lower Main Board Explanatory Text Area - Concise text with large, legible typography */}
            <div style={{
              position: 'absolute',
              top: '34%',
              bottom: '9%',
              left: '6%',
              right: '6%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box',
              padding: '0 12px',
            }}>
              <p style={{
                margin: 0,
                color: '#FFFFFF',
                fontFamily: 'Inter, Outfit, sans-serif',
                fontSize: 'clamp(1.05rem, 1.48vw, 1.42rem)',
                fontWeight: 850,
                lineHeight: 1.34,
                letterSpacing: '0.005em',
                textShadow: '0 2px 5px rgba(0, 0, 0, 0.95), 0 0 3px #000000',
              }}>
                {carsMode === 'same'
                  ? 'Like poles repel! When both cars face each other with identical poles (N ↔ N), an invisible magnetic force pushes them apart without touching.'
                  : 'Unlike poles attract! When the cars face each other with opposite poles (N → S), a powerful magnetic force pulls them together until they touch.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── Interactive Track Plane: Cars positioned directly on top of the 3D White Scale ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          {/* ── Left Wooden Car (Car A, Facing Right - Nose anchored at percentA) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `${percentA}%`,
              transform: 'translateX(-100%)',
              bottom: '27.4%',
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

          {/* ── Right Wooden Car (Car B, Facing Left - Nose anchored at percentB) ── */}
          <div 
            style={{
              position: 'absolute',
              left: `${percentB}%`,
              transform: 'translateX(0%)',
              bottom: '27.4%',
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
        </div>
      </div>
    </div>
  );
}
