import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Truck,
  Heart,
  Leaf,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import goLocalImg from '../assets/go_local_reduce_food_miles.jpg';

export default function GoLocalReduceFoodMilesPage({ onBack, onNext }) {
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
    confetti({ particleCount: 45, spread: 55, origin: { y: 0.75 } });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#1A0E04',
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
        src={goLocalImg}
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
        src={goLocalImg}
        alt="Go local, reduce food miles - Comparison between long-distance transport and local farm markets"
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(26, 14, 4, 0.45) 100%)',
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
          background: 'rgba(28, 14, 4, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(251, 191, 36, 0.55)',
          color: '#FEF08A',
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
        <ArrowLeft size={20} color="#FEF08A" />
        <span>Food Miles Video</span>
      </motion.button>

      {/* 5. Top-Right: Category Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(28, 14, 4, 0.88)',
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
        <Leaf size={18} color="#34D399" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Go Local
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
          right: showPopup ? 'calc(min(540px, 48vw) + 24px)' : '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 65,
          background: 'rgba(28, 14, 4, 0.92)',
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
          {showPopup ? 'Hide Details' : 'Show Details'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Popup: Go Local, Reduce Food Miles */}
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
              width: 'min(540px, 48vw)',
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(28, 15, 6, 0.95) 0%, rgba(15, 8, 3, 0.97) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '20px 24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(245, 158, 11, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '10px',
              }}
            >
              <Truck size={24} color="#FBBF24" />
              <h2
                style={{
                  margin: 0,
                  fontSize: '21px',
                  fontWeight: 900,
                  color: '#FEF08A',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)',
                }}
              >
                What Are Food Miles?
              </h2>
            </div>

            {/* Definition Box */}
            <div
              style={{
                fontSize: '14.5px',
                lineHeight: '1.6',
                color: '#FED7AA',
                background: 'rgba(28, 15, 6, 0.65)',
                border: '1.5px solid rgba(251, 191, 36, 0.35)',
                borderRadius: '16px',
                padding: '12px 16px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              The entire distance travelled by a bag of wheat or any other food item, from the <strong>producer to the consumer</strong>, is known as its <strong>food miles</strong>.
            </div>

            {/* Why Reducing Food Miles is Important */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.08) 100%)',
                border: '2px solid rgba(52, 211, 153, 0.55)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div style={{ fontSize: '14.5px', fontWeight: 900, color: '#86EFAC', letterSpacing: '0.02em' }}>
                Reducing food miles is important because:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#FFFFFF', fontWeight: 600, lineHeight: '1.45' }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>It helps to <strong>cut down the cost and pollution</strong> during its transport</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#FFFFFF', fontWeight: 600, lineHeight: '1.45' }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>It helps <strong>support local farmers</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#FFFFFF', fontWeight: 600, lineHeight: '1.45' }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>It keeps our <strong>food fresh and healthy</strong></span>
                </div>
              </div>
            </div>

            {/* Interactive "Think!" Card with Tap-to-Reveal */}
            <div
              style={{
                background: 'rgba(251, 191, 36, 0.12)',
                border: '1.5px solid rgba(251, 191, 36, 0.55)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} color="#FBBF24" />
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#FEF08A' }}>
                  Think!
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#FEF3C7', lineHeight: '1.5', fontWeight: 600 }}>
                How would eating local food help reduce food miles?
              </div>

              {!revealedAnswer ? (
                <motion.button
                  type="button"
                  onClick={handleReveal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #FEF08A',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Tap to reveal explanation</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: '13.5px',
                    lineHeight: '1.5',
                    color: '#FEF08A',
                    background: 'rgba(217, 119, 6, 0.25)',
                    border: '1.5px solid #F59E0B',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontWeight: 600,
                  }}
                >
                  🌾 <strong>Answer:</strong> When we consume food grown in our own region or local communities, the food travels very short distances from farm to market. This reduces truck transport, cuts greenhouse gas emissions, lowers transport costs, and ensures fresh, nutrient-rich food on our plates!
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
        <span>Go Local Video</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
