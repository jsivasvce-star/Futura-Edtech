import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import nutrientsBgImg from '../assets/nutrients_and_protective_nutrients.jpg';

export default function NutrientsProtectivePage({ onBack, onNext }) {
  const [showPopup, setShowPopup] = useState(true);

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

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#03140E',
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
        src={nutrientsBgImg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(22px) brightness(0.6)',
          transform: 'scale(1.08)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. Main Full-Screen Cinematic Image Without Distortion */}
      <img
        src={nutrientsBgImg}
        alt="Nutrients and Protective Nutrients - Family Meal"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(2, 18, 13, 0.45) 100%)',
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
          zIndex: 60,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 800,
          padding: '8px 22px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          transition: 'all 0.15s ease',
        }}
      >
        <ArrowLeft size={22} color="#FFFFFF" />
        <span>Back</span>
      </motion.button>

      {/* Right Center Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setShowPopup(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'absolute',
          right: showPopup ? 'calc(min(460px, 42vw) + 36px)' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 65,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid #FEF08A',
          color: '#FEF08A',
          borderRadius: '999px',
          padding: '10px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), 0 0 14px rgba(254, 240, 138, 0.4)',
          transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        title={showPopup ? 'Hide popup' : 'Show popup'}
      >
        <Sparkles size={22} color="#FEF08A" />
        {showPopup ? <ChevronRight size={22} color="#FEF08A" /> : <ChevronLeft size={22} color="#FEF08A" />}
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 40, y: '-50%', scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, x: 40, y: '-50%', scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              zIndex: 50,
              width: 'min(460px, 42vw)',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              background: 'rgba(2, 24, 18, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '2px solid rgba(254, 240, 138, 0.85)',
              borderRadius: '24px',
              padding: '18px 22px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderBottom: '2px solid rgba(254, 240, 138, 0.4)',
                paddingBottom: '8px',
              }}
            >
              <Sparkles size={24} color="#FBBF24" />
              <h2
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#FEF08A',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)',
                }}
              >
                Nutrients & Protective Nutrients
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '2px 0',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: '1.35',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Nutrients give energy, support growth, repair our body, protect it from diseases and maintain bodily functions.
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    color: '#38BDF8',
                    letterSpacing: '0.01em',
                    marginBottom: '4px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Major nutrients:
                </div>
                <div
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: '1.35',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Carbohydrates, proteins, fats, vitamins and minerals.
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <ShieldCheck size={24} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#A7F3D0',
                    lineHeight: '1.35',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Vitamins and minerals are called protective nutrients because they protect us from diseases.
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    color: '#FBBF24',
                    letterSpacing: '0.01em',
                    marginBottom: '4px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Sources:
                </div>
                <div
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: '1.35',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Milk, green vegetables, fruits and wholegrains.
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FEF08A',
                    lineHeight: '1.35',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  They are needed in small amounts, but they are essential for a healthy body.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Bottom-Right: Next Navigation Button */}
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '24px',
          zIndex: 60,
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          border: '2px solid #FEF08A',
          color: '#FFFFFF',
          fontSize: '22px',
          fontWeight: 900,
          padding: '10px 28px',
          borderRadius: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
          transition: 'all 0.15s ease',
        }}
      >
        <span>Next</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
