import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chapter4Cover({ onStartJourney, onBack }) {
  return (
    <div className="chapter4-cover-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Outfit:wght@400;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap');

        .chapter4-cover-wrapper {
          --gold: #F59E0B;
          --gold-light: #FCD34D;
          --gold-glow: rgba(245, 158, 11, 0.4);
          --ink: #FFFFFF;
          --font-display: 'Outfit', 'Space Grotesk', system-ui, sans-serif;
          --font-serif: 'Cinzel', serif;

          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          font-family: var(--font-display);
          color: var(--ink);
          overflow: hidden;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          z-index: 10;
        }

        /* Ambient Glow behind the Canvas Stage */
        .cover-ambient-glow {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.08) 0%, rgba(0, 0, 0, 0.95) 75%);
          pointer-events: none;
          z-index: 0;
        }

        /* Central Framed Artwork Stage - Exact 1024x571 Native Image Size */
        .cover-stage {
          position: relative;
          width: 1024px;
          height: 571px;
          min-width: 1024px;
          min-height: 571px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.95);
          background: #000000;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Background Thematic Image - Exact 1:1 Pixel Match */
        .cover-bg-image {
          position: absolute;
          inset: 0;
          width: 1024px;
          height: 571px;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* Bottom Gold Plaque Engraved Branding */
        .cover-plaque-label {
          position: absolute;
          left: 39.5%;
          bottom: 2.8%;
          width: 21.0%;
          height: 9.0%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 0.75vw, 12px);
          padding: 0 clamp(4px, 0.6vw, 10px);
          box-sizing: border-box;
          pointer-events: none;
          z-index: 3;
        }

        .plaque-brand-badge {
          width: clamp(20px, 2.2vw, 32px);
          height: clamp(20px, 2.2vw, 32px);
          border-radius: 6px;
          background: linear-gradient(135deg, #3D280B 0%, #201303 100%);
          color: #ECC05D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(10px, 1.1vw, 16px);
          letter-spacing: -0.02em;
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            0 1px 3px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(80, 52, 16, 0.7);
          flex-shrink: 0;
        }

        .plaque-brand-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          line-height: 1.1;
        }

        .plaque-brand-name {
          font-family: var(--font-display);
          font-size: clamp(0.76rem, 1.08vw, 1.15rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #2B1B06;
          text-transform: uppercase;
          text-shadow: 
            0 1px 0 rgba(255, 255, 255, 0.55),
            0 -1px 0 rgba(0, 0, 0, 0.25);
        }

        .plaque-brand-tag {
          font-family: var(--font-display);
          font-size: clamp(0.44rem, 0.62vw, 0.68rem);
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #452E0A;
          text-transform: uppercase;
          margin-top: 1px;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
          white-space: nowrap;
        }

        /* Top-Left Back Navigation Button */
        .cover-back-btn {
          position: absolute;
          top: clamp(16px, 2.5vh, 28px);
          left: clamp(16px, 2.5vw, 28px);
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          border: 1.5px solid rgba(245, 158, 11, 0.4);
          background: rgba(10, 14, 26, 0.85);
          backdrop-filter: blur(12px);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
          transition: all 0.22s ease;
        }

        .cover-back-btn:hover {
          border-color: #F59E0B;
          background: rgba(245, 158, 11, 0.2);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
        }

        /* Responsive Viewports - Keeps Native 1024x571 Size */
        @media (max-width: 1060px) {
          .chapter4-cover-wrapper {
            overflow: auto;
          }
        }
      `}</style>

      {/* Ambient Outer Glow */}
      <div className="cover-ambient-glow" />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onBack || (() => window.history.back())}
        className="cover-back-btn"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </motion.button>

      {/* Main Artwork Stage */}
      <div 
        className="cover-stage"
        onClick={onStartJourney}
        style={{ cursor: 'pointer' }}
        title="Click to start the journey"
      >
        {/* Background Image Provided by User */}
        <img
          src="/assets/chapter4_cover_bg.jpg"
          alt="Exploring Magnets Cover Artwork"
          className="cover-bg-image"
        />

        {/* Engraved Gold Plaque Branding */}
        <div className="cover-plaque-label">
          <div className="plaque-brand-badge">Fx</div>
          <div className="plaque-brand-info">
            <span className="plaque-brand-name">FuturaX</span>
            <span className="plaque-brand-tag">AI-NATIVE LEARNING LAB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
