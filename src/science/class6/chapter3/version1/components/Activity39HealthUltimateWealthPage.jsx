import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, HeartPulse, Sparkles, ChevronRight, ChevronLeft, HelpCircle, CheckCircle2, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import healthWealthImg from '../assets/activity_3_9_health_ultimate_wealth.jpg';

export default function Activity39HealthUltimateWealthPage({ onBack, onNext }) {
  const [showPopup, setShowPopup] = useState(true);
  const [revealedAnswer, setRevealedAnswer] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        onNext?.();
      } else if (e.key === 'ArrowLeft') {
        onBack?.();
      } else if (e.key === 'Escape') {
        setShowPopup((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onBack]);

  const handleReveal = () => {
    setRevealedAnswer(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#071A12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Ambient Blurred Backdrop */}
      <img
        src={healthWealthImg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(24px) brightness(0.65)',
          transform: 'scale(1.08)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. Main Full-Screen Cinematic Image Without Distortion */}
      <img
        src={healthWealthImg}
        alt="Health is the Ultimate Wealth - Activity 3.9"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          objectPosition: 'center',
          display: 'block',
          zIndex: 5,
        }}
      />

      {/* 3. Subtle Ambient Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(4, 18, 12, 0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* 4. Top-Left: Back Navigation Button */}
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          zIndex: 50,
          background: 'rgba(7, 30, 22, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(167, 243, 208, 0.55)',
          color: '#E2E8F0',
          fontSize: '18px',
          fontWeight: 800,
          padding: '8px 22px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          transition: 'all 0.15s ease',
        }}
      >
        <ArrowLeft size={20} color="#E2E8F0" />
        <span>Junk Food Alert</span>
      </motion.button>

      {/* 5. Top-Right: Activity Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(7, 30, 22, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(254, 240, 138, 0.75)',
          borderRadius: '999px',
          padding: '6px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
        }}
      >
        <HeartPulse size={18} color="#34D399" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Activity 3.9 · Dr. Poshita
        </span>
      </div>

      {/* 6. Floating Toggle Button for Popup */}
      <motion.button
        type="button"
        onClick={() => setShowPopup((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'absolute',
          right: showPopup ? 'calc(min(620px, 52vw) + 24px)' : '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 65,
          background: 'rgba(7, 30, 22, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid #FEF08A',
          color: '#FEF08A',
          borderRadius: '999px',
          padding: '10px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55), 0 0 16px rgba(254, 240, 138, 0.35)',
          transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        title={showPopup ? 'Hide popup' : 'Show popup'}
      >
        <Sparkles size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Insights' : 'Show Insights'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Popup: Dr. Poshita & Health is the Ultimate Wealth */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, x: 50, y: '-50%', scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              zIndex: 50,
              width: 'min(620px, 52vw)',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(6, 32, 22, 0.94) 0%, rgba(3, 18, 12, 0.96) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '22px 26px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(16, 185, 129, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '12px',
              }}
            >
              <HeartPulse size={26} color="#34D399" />
              <h2
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#FEF08A',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)',
                }}
              >
                Health is the Ultimate Wealth
              </h2>
            </div>

            {/* Paragraph 1: Health Impact (Bold Content, 20px) */}
            <div
              style={{
                fontSize: '20px',
                lineHeight: '1.55',
                color: '#FECACA',
                fontWeight: 800,
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1.5px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '14px',
                padding: '14px 18px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              Consuming these foods frequently is not good as these are not healthy for our body. They make a person obese. Such a person may suffer from several health problems.
            </div>

            {/* Quote Card: Dr Poshita's Statement */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.1) 100%)',
                border: '2px solid rgba(52, 211, 153, 0.55)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              {/* Subheading: 22px */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontSize: '22px', fontWeight: 600 }}>
                <Quote size={22} color="#34D399" />
                <span>Dr Poshita’s Advice:</span>
              </div>
              {/* Quote Headline: 24px */}
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#FEF08A',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                }}
              >
                “Health is the Ultimate Wealth.”
              </div>
              {/* Content Description: 20px, Bold */}
              <div style={{ fontSize: '20px', lineHeight: '1.55', color: '#E2E8F0', fontWeight: 800 }}>
                We should take care of our body to stay healthy. Eating a balanced diet and avoiding junk food contribute towards a healthy body. Good health is essential for leading a happy life.
              </div>
            </div>

            {/* Interactive "Think!" Card with Tap-to-Reveal */}
            <div
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1.5px solid rgba(251, 191, 36, 0.5)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Subheading: 22px */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={24} color="#FBBF24" />
                <span style={{ fontSize: '22px', fontWeight: 600, color: '#FEF08A' }}>
                  Think!
                </span>
              </div>
              {/* Question Content: 20px, Bold */}
              <div style={{ fontSize: '20px', color: '#FEF3C7', lineHeight: '1.5', fontWeight: 800 }}>
                Which of the two foods you studied in Activity 3.9 could be labelled as junk food?
              </div>

              {!revealedAnswer ? (
                <motion.button
                  type="button"
                  onClick={handleReveal}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #FEF08A',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 22px',
                    fontSize: '18px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    alignSelf: 'flex-start',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
                  }}
                >
                  <Sparkles size={18} color="#FFFFFF" />
                  <span>Tap to reveal answer</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.25)',
                    border: '1.5px solid #F87171',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <CheckCircle2 size={24} color="#34D399" />
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
                    Potato wafers.
                  </span>
                  <span style={{ fontSize: '16px', color: '#FECACA', fontWeight: 700 }}>
                    (High fat & sodium, low nutrient density)
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Bottom-Right: Next Navigation Button */}
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          zIndex: 50,
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          border: '2px solid #FEF08A',
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 900,
          padding: '10px 28px',
          borderRadius: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 26px rgba(217, 119, 6, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
          transition: 'all 0.15s ease',
        }}
      >
        <span>Read the Label</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
