/* eslint-disable react/prop-types */
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chapter4Cover({ onStartJourney, onBack }) {
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
          --ink-deep: #161007;
          --ink-body: #2C1F12;
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

        /* Thematic Showcase Stage Area:
           - Blends organically into the vintage parchment collage
           - Frosted vellum glass with sepia warmth and subtle inner edge burn
           - Sits in the compass diagram zone without concealing the corner insets
        */
        .hero-compass-overlay {
          position: absolute;
          top: 27.6%;
          bottom: 31.5%;
          left: 53%;
          right: 1.8%;
          z-index: 10;
          border-radius: 24px;
          background: radial-gradient(
            ellipse at center,
            rgba(254, 250, 240, 0.68) 0%,
            rgba(248, 239, 224, 0.55) 60%,
            rgba(238, 222, 198, 0.46) 100%
          );
          backdrop-filter: blur(14px) saturate(125%) sepia(16%);
          -webkit-backdrop-filter: blur(14px) saturate(125%) sepia(16%);
          border: 1.5px solid rgba(168, 122, 62, 0.52);
          box-shadow: 
            inset 0 0 45px rgba(70, 42, 14, 0.16),
            inset 0 1px 2px rgba(255, 255, 255, 0.75),
            0 16px 40px rgba(35, 18, 6, 0.24);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          padding: clamp(15px, 1.7vw, 24px) clamp(18px, 2.2vw, 30px);
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Tagline Badge */
        .hero-tagline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.38rem 0.95rem;
          border-radius: 999px;
          background: rgba(255, 252, 244, 0.9);
          border: 1.2px solid rgba(168, 118, 55, 0.55);
          box-shadow: 0 2px 8px rgba(45, 25, 10, 0.08);
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

        /* Hero Main Title - Large */
        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.0rem, 2.8vw, 3.2rem);
          font-weight: 900;
          line-height: 1.05;
          margin: 0;
          color: var(--ink-deep);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-shadow: 
            0 1px 1px rgba(255, 255, 255, 0.95),
            0 2px 8px rgba(45, 25, 10, 0.18);
        }

        /* Hero Body Description - Medium */
        .hero-description {
          font-family: var(--font-sans);
          font-size: clamp(1.0rem, 1.28vw, 1.25rem);
          line-height: 1.5;
          color: var(--ink-body);
          margin: 0;
          max-width: 100%;
          font-weight: 550;
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

        {/* Thematic Showcase Stage Area with Sequential Reveal */}
        <div className="hero-compass-overlay">
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

          {/* Step 3: Body Description with high contrast against the vellum glass */}
          <motion.p
            className="hero-description"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            Hands-on physics labs for every chapter activity. Experience real magnetic fields,
            settling compasses, and iron filings gathering at the poles.
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
