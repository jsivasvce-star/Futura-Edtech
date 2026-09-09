/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ExactCompass from '../components/ExactCompass.jsx';

const STATIONS = [
  { name: 'North', code: 'N', deg: 0 },
  { name: 'North-East', code: 'NE', deg: 45 },
  { name: 'East', code: 'E', deg: 90 },
  { name: 'South-East', code: 'SE', deg: 135 },
  { name: 'South', code: 'S', deg: 180 },
  { name: 'South-West', code: 'SW', deg: 225 },
  { name: 'West', code: 'W', deg: 270 },
  { name: 'North-West', code: 'NW', deg: 315 },
];

export default function Chapter4Cover({ onStartJourney, onBack }) {
  // Sequential clockwise movement through 8 directional stations with discernible pauses:
  // N (0°) -> NE (45°) -> E (90°) -> SE (135°) -> S (180°) -> SW (225°) -> W (270°) -> NW (315°) -> N (360°)
  const [compassAngle, setCompassAngle] = useState(0);
  const [activeStation, setActiveStation] = useState(STATIONS[0]);
  const animFrameRef = useRef(null);
  const impulseRef = useRef(0);
  const impulseTimeRef = useRef(0);

  useEffect(() => {
    let startTime = null;
    const PAUSE_DURATION = 1.25; // Clearly discernible pause at each direction (1.25s)
    const TRAVEL_DURATION = 0.85; // Smooth graceful clockwise movement between stations (0.85s)
    const STEP_DURATION = PAUSE_DURATION + TRAVEL_DURATION; // 2.10s per station

    const animateNeedle = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = (timestamp - startTime) / 1000;

      // Current station cycle index & time within the step
      const stepIndex = Math.floor(t / STEP_DURATION);
      const localTime = t - stepIndex * STEP_DURATION;
      const stationIndex = stepIndex % 8;

      setActiveStation(STATIONS[stationIndex]);

      const fromAngle = stepIndex * 45;
      let baseAngle = fromAngle;

      if (localTime < PAUSE_DURATION) {
        // --- PAUSE PHASE at current direction (clearly discernible) ---
        // Realistic damped magnetic settling overshoot when arriving at station
        const settling = stepIndex > 0
          ? 3.4 * Math.exp(-localTime * 6.5) * Math.sin(localTime * 18)
          : 0;
        // Fine organic jewel pivot breathing during the rest of the pause
        const microBreath = Math.sin(localTime * 3.2) * 0.28;
        baseAngle = fromAngle + settling + microBreath;
      } else {
        // --- TRAVEL PHASE: Smooth clockwise sweep from fromAngle to next angle ---
        const travelTime = localTime - PAUSE_DURATION;
        const p = Math.min(1, Math.max(0, travelTime / TRAVEL_DURATION));
        // Quintic smoothstep for smooth acceleration and deceleration
        const ease = p * p * p * (p * (p * 6 - 15) + 10);
        // Subtle magnetic sway during motion
        const sway = Math.sin(p * Math.PI) * Math.sin(p * Math.PI * 2.5) * 1.5;
        baseAngle = fromAngle + ease * 45 + sway;
      }

      // User interactive perturbation (decaying damped oscillation on click)
      let clickImpulse = 0;
      if (impulseRef.current > 0.05) {
        const dtImpulse = (timestamp - impulseTimeRef.current) / 1000;
        clickImpulse = impulseRef.current * Math.exp(-dtImpulse * 2.8) * Math.sin(dtImpulse * 15);
        if (dtImpulse > 2.2) impulseRef.current = 0;
      }

      setCompassAngle(baseAngle + clickImpulse);
      animFrameRef.current = requestAnimationFrame(animateNeedle);
    };

    animFrameRef.current = requestAnimationFrame(animateNeedle);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleCompassInteractiveJolt = () => {
    impulseRef.current = 65;
    impulseTimeRef.current = performance.now();
  };

  // Stagger animation timing variants for theatrical, sequential reveal
  const badgeVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, delay: 0.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, delay: 0.65, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 1.15, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, delay: 1.65, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="chapter4-cover-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap');

        .chapter4-cover-wrapper {
          --bronze-dark: #2A1705;
          --bronze-accent: #B45309;
          --ink-deep: #1c1815;
          --ink-body: #3a2818;
          --gold-primary: #F59E0B;
          --gold-dark: #D97706;
          --font-serif: 'Cinzel', Georgia, serif;
          --font-sans: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #0c0805;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          user-select: none;
        }

        /* 16:9 Artwork Stage - Synchronized precisely with the background image coordinates */
        .cover-art-stage {
          position: relative;
          width: max(100vw, calc(100vh * (1376 / 768)));
          height: max(100vh, calc(100vw * (768 / 1376)));
          aspect-ratio: 1376 / 768;
          flex-shrink: 0;
        }

        /* Edge-to-Edge Full Background Backdrop */
        .cover-bg-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle Ambient Warm Vignette */
        .cover-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 65% 50%, rgba(0, 0, 0, 0) 35%, rgba(15, 10, 5, 0.28) 100%);
          z-index: 1;
        }

        /* Authentic Navigational Artifact Stage Area:
           - Multi-layered organic aged-parchment texture with burnt perimeter vignette
           - Fine vintage double border in antique burnished brass (#b38b47) & inner hairline (#8c672e)
           - Four metallic corner pins/rivets
           - Faint vector magnetic field & astrolabe watermark engraving (10% opacity)
           - Multi-layered physical drop shadow
        */
        .hero-compass-overlay {
          position: absolute;
          top: 27.6%;
          bottom: 31.5%;
          left: 53%;
          right: 1.8%;
          z-index: 10;
          border-radius: 24px;
          background: 
            radial-gradient(ellipse at 50% 50%, rgba(254, 250, 240, 0.82) 0%, rgba(246, 236, 218, 0.72) 55%, rgba(235, 218, 192, 0.68) 85%, rgba(214, 188, 150, 0.78) 100%),
            radial-gradient(circle at 12% 15%, rgba(175, 125, 65, 0.16) 0%, transparent 45%),
            radial-gradient(circle at 88% 85%, rgba(150, 100, 45, 0.18) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(120, 75, 25, 0.08) 100%);
          backdrop-filter: blur(14px) saturate(125%) sepia(20%);
          -webkit-backdrop-filter: blur(14px) saturate(125%) sepia(20%);
          border: 1.5px solid #b38b47;
          box-shadow: 
            0 16px 36px -8px rgba(35, 18, 5, 0.55),
            0 4px 12px rgba(0, 0, 0, 0.25),
            inset 0 0 45px rgba(90, 50, 20, 0.35),
            inset 0 0 12px rgba(60, 30, 10, 0.45);
          padding: clamp(16px, 1.8vw, 26px) clamp(20px, 2.2vw, 32px);
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Fine Vintage Inner Offset Hairline Border (inset by 6px) */
        .hero-compass-overlay::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 0.8px solid rgba(140, 103, 46, 0.55);
          border-radius: calc(24px - 6px);
          pointer-events: none;
          z-index: 2;
        }

        /* Subtle Metallic Brass Pins / Corner Rivets */
        .card-rivet {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #FDE68A 0%, #D97706 55%, #78350F 100%);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.7);
          pointer-events: none;
          z-index: 3;
        }
        .card-rivet.tl { top: 11px; left: 11px; }
        .card-rivet.tr { top: 11px; right: 11px; }
        .card-rivet.bl { bottom: 11px; left: 11px; }
        .card-rivet.br { bottom: 11px; right: 11px; }

        /* Faint Watermark Engraving (10% Opacity) */
        .card-engraving-watermark {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.10;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Dedicated Content Layer for Sequential Reveal Elements */
        .hero-content-layer {
          position: relative;
          z-index: 5;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        }

        /* Tagline Badge */
        .hero-tagline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.38rem 0.95rem;
          border-radius: 999px;
          background: rgba(255, 252, 244, 0.92);
          border: 1.2px solid rgba(168, 118, 55, 0.6);
          box-shadow: 0 2px 8px rgba(45, 25, 10, 0.1);
          font-family: var(--font-sans);
          font-size: clamp(0.76rem, 0.88vw, 0.92rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--bronze-dark);
          text-transform: uppercase;
        }

        .hero-tagline-icon {
          color: var(--bronze-accent);
          stroke-width: 2.4px;
        }

        /* Hero Main Title - Extra Large in Deep Iron-Gall Ink */
        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 3.6vw, 4.2rem);
          font-weight: 900;
          line-height: 1.02;
          margin: 0;
          color: var(--ink-deep);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-shadow: 
            0 1px 1px rgba(255, 255, 255, 0.95),
            0 2px 8px rgba(45, 25, 10, 0.18);
        }

        /* Hero Body Description - Warm Sepia Dot Notation */
        .hero-description {
          font-family: var(--font-sans);
          font-size: clamp(1.25rem, 1.7vw, 1.85rem);
          line-height: 1.4;
          letter-spacing: 0.06em;
          color: var(--ink-body);
          margin: 0;
          max-width: 100%;
          font-weight: 800;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.85);
        }

        /* CTA Wrapper & Button */
        .hero-cta-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
        }

        .hero-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: clamp(0.6rem, 1.1vh, 0.82rem) clamp(1.4rem, 1.9vw, 2.3rem);
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 65%, #B45309 100%);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: clamp(0.92rem, 1.1vw, 1.15rem);
          letter-spacing: 0.04em;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 
            0 4px 16px rgba(217, 119, 6, 0.45),
            0 8px 24px rgba(217, 119, 6, 0.25);
          transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s ease;
          z-index: 1;
        }

        /* Continuous Warm Amber/Brass Breathing Glow */
        .hero-cta-btn-pulse {
          animation: ctaAmberPulse 2.8s ease-in-out infinite alternate;
        }

        @keyframes ctaAmberPulse {
          0% {
            box-shadow: 
              0 4px 14px rgba(217, 119, 6, 0.45),
              0 0 12px rgba(245, 158, 11, 0.25);
          }
          100% {
            box-shadow: 
              0 6px 22px rgba(217, 119, 6, 0.75),
              0 0 24px rgba(245, 158, 11, 0.6);
          }
        }

        /* Radiant Shimmer Sweep */
        .hero-cta-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          animation: shimmerSweep 3.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        @keyframes shimmerSweep {
          0% { left: -75%; }
          50%, 100% { left: 175%; }
        }

        .hero-cta-btn:hover {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 
            0 6px 24px rgba(217, 119, 6, 0.75),
            0 14px 32px rgba(217, 119, 6, 0.45);
          background: linear-gradient(135deg, #FBBF24 0%, #D97706 100%);
        }

        .hero-cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Top-Left Back Navigation */
        .cover-back-btn {
          position: absolute;
          top: clamp(20px, 3vh, 32px);
          left: clamp(20px, 3vw, 32px);
          z-index: 50;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          border: 1.2px solid rgba(168, 118, 55, 0.5);
          background: rgba(255, 252, 245, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--bronze-dark);
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: clamp(0.82rem, 0.9vw, 0.92rem);
          letter-spacing: 0.02em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(35, 20, 8, 0.16);
          transition: all 0.22s ease;
        }

        .cover-back-btn:hover {
          transform: translateY(-1px) scale(1.03);
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(180, 130, 70, 0.85);
          box-shadow: 0 6px 18px rgba(35, 20, 8, 0.22);
        }

        /* Prominent Activity 4.6 Exact Interactive Compass:
           - Balanced prominent scale: 26.5% width
           - Positioned at left: 31.4%, top: 49%
           - Deep dimensional drop shadow
        */
        .cover-compass-overlay-wrapper {
          position: absolute;
          left: 31.4%;
          top: 49%;
          width: 26.5%;
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 6;
          cursor: pointer;
          filter: drop-shadow(0 20px 42px rgba(25, 12, 4, 0.58));
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .cover-compass-overlay-wrapper:hover {
          filter: drop-shadow(0 26px 52px rgba(217, 119, 6, 0.55));
          transform: translate(-50%, -50%) scale(1.025);
        }

        /* Elegant Antique Navigational Station Pill */
        .compass-station-pill {
          position: absolute;
          top: 101%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 999px;
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 252, 244, 0.96) 0%, rgba(244, 233, 212, 0.92) 100%);
          border: 1.5px solid #b38b47;
          box-shadow: 
            0 8px 22px rgba(28, 14, 4, 0.38),
            inset 0 0 10px rgba(120, 70, 20, 0.18);
          white-space: nowrap;
          pointer-events: none;
          backdrop-filter: blur(8px);
        }

        .compass-station-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #D97706;
          box-shadow: 0 0 6px #F59E0B;
        }

        .compass-station-text {
          font-family: var(--font-sans);
          font-size: clamp(0.74rem, 0.85vw, 0.84rem);
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #451a03;
          text-transform: uppercase;
        }

        .compass-station-deg {
          color: #b45309;
          font-weight: 700;
          font-size: 0.78rem;
        }

        .cover-back-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      {/* 16:9 Stage matching exact artwork coordinate space */}
      <div className="cover-art-stage">
        {/* Edge-to-Edge Nautical Physics Collage Full Backdrop */}
        <img
          src="/assets/chapter4_cover_bg.jpg"
          alt="Nautical physics collage background"
          className="cover-bg-backdrop"
        />

        {/* Subtle Warm Vignette Overlay */}
        <div className="cover-vignette" />

        {/* Activity 4.6 Exact Interactive Compass Overlay */}
        <div 
          className="cover-compass-overlay-wrapper"
          onClick={handleCompassInteractiveJolt}
          title={`Activity 4.6 Compass • Heading ${activeStation.name} (${activeStation.code}) • Click to disturb magnetic field`}
        >
          <ExactCompass
            size="100%"
            rotation={compassAngle}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            showThumbLoop={true}
            onCenterClick={handleCompassInteractiveJolt}
          />

          {/* Distinct Directional Station Badge */}
          <div className="compass-station-pill">
            <span className="compass-station-dot" />
            <span className="compass-station-text">
              Heading: {activeStation.name} ({activeStation.code})
            </span>
            <span className="compass-station-deg">• {activeStation.deg}°</span>
          </div>
        </div>

        {/* Authentic Navigational Artifact Stage with Fine Double Border, Corner Rivets & Watermark */}
        <div className="hero-compass-overlay">
          {/* Metallic Corner Rivets */}
          <div className="card-rivet tl" />
          <div className="card-rivet tr" />
          <div className="card-rivet bl" />
          <div className="card-rivet br" />

          {/* Faint Vector Watermark Engraving (10% Opacity) */}
          <div className="card-engraving-watermark">
            <svg viewBox="0 0 400 300" width="100%" height="100%" fill="none" stroke="#784718" strokeWidth="1" strokeDasharray="3 3">
              <circle cx="200" cy="150" r="110" strokeWidth="0.8" opacity="0.7" />
              <circle cx="200" cy="150" r="75" strokeWidth="0.6" />
              <circle cx="200" cy="150" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d="M 90 150 C 90 70, 310 70, 310 150 C 310 230, 90 230, 90 150" strokeWidth="0.9" />
              <path d="M 60 150 C 60 40, 340 40, 340 150 C 340 260, 60 260, 60 150" strokeWidth="0.7" strokeDasharray="4 4" />
              <path d="M 120 150 C 120 100, 280 100, 280 150 C 280 200, 120 200, 120 150" strokeWidth="0.6" />
              <line x1="200" y1="20" x2="200" y2="280" strokeWidth="0.5" opacity="0.6" />
              <line x1="40" y1="150" x2="360" y2="150" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>

          {/* Interactive Content Layer with Sequential Reveal */}
          <div className="hero-content-layer">
            {/* Step 1: Metadata Tagline Badge */}
            <motion.div
              className="hero-tagline"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <Zap size={14} className="hero-tagline-icon" />
              <span>GRADE 6 • SCIENCE • CHAPTER 4</span>
            </motion.div>

            {/* Step 2: Headline with ink-settle blur-to-sharp animation */}
            <motion.h1
              className="hero-title"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Exploring Magnets
            </motion.h1>

            {/* Step 3: Body Description in 5-word dot notation */}
            <motion.p
              className="hero-description"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              • Magnets  • Poles  • Compass  • Fields  • Forces
            </motion.p>

            {/* Step 4: Glowing CTA Button with pulsating amber aura */}
            <motion.div
              className="hero-cta-wrapper"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                className="hero-cta-btn hero-cta-btn-pulse"
                onClick={onStartJourney}
              >
                <span>Start the journey</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Top-Left Back Navigation Button */}
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={onBack || (() => window.history.back())}
        className="cover-back-btn"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </motion.button>
    </div>
  );
}
