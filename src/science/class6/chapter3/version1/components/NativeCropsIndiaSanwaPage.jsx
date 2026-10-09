import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sprout, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Wheat } from 'lucide-react';
import sanwaImg from '../assets/native_crops_of_india_sanwa.jpg';

export default function NativeCropsIndiaSanwaPage({ onBack, onNext }) {
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
        background: '#0E1A0E',
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
        src={sanwaImg}
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
        src={sanwaImg}
        alt="Native crops of India - Fig. 3.9: Sanwa (Barnyard millet)"
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(6, 24, 14, 0.45) 100%)',
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
          background: 'rgba(7, 30, 20, 0.88)',
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
        <span>Millets Overview</span>
      </motion.button>

      {/* 5. Top-Right: Figure Tag Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(7, 30, 20, 0.88)',
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
        <Wheat size={18} color="#FBBF24" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}
        >
          Fig. 3.9: Sanwa (Barnyard millet)
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
          right: showPopup ? 'calc(min(520px, 46vw) + 24px)' : '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 65,
          background: 'rgba(7, 30, 20, 0.92)',
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
        <Sprout size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Info' : 'Show Info'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Popup: Native Crops of India & Sanwa */}
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
              width: 'min(520px, 46vw)',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(6, 32, 22, 0.94) 0%, rgba(3, 18, 12, 0.96) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '20px 24px',
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
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sprout size={24} color="#34D399" />
                <h2
                  style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#FEF08A',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  Native Crops of India
                </h2>
              </div>
              <span
                style={{
                  background: 'rgba(251, 191, 36, 0.2)',
                  border: '1px solid #FBBF24',
                  borderRadius: '999px',
                  padding: '3px 12px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#FEF08A',
                }}
              >
                Fig. 3.9
              </span>
            </div>

            {/* Paragraph Text */}
            <div
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#ECFDF5',
                background: 'rgba(6, 78, 59, 0.35)',
                border: '1.5px solid rgba(167, 243, 208, 0.3)',
                borderRadius: '16px',
                padding: '14px 18px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              You may have heard of <strong>jowar</strong>, <strong>bajra</strong>, <strong>ragi</strong> and <strong>sanwa</strong>. These are native crops of India. These can be easily cultivated in different climatic conditions. These highly nutritious grains are also called <strong>millets</strong>.
            </div>

            {/* Figure 3.9 Caption Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                border: '1.5px solid rgba(251, 191, 36, 0.45)',
                borderRadius: '14px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Sparkles size={20} color="#FBBF24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FEF3C7' }}>
                <strong style={{ color: '#FDE047' }}>Fig. 3.9:</strong> Sanwa (Barnyard millet)
              </div>
            </div>

            {/* Key Points Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.1) 100%)',
                border: '2px solid rgba(52, 211, 153, 0.55)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#86EFAC', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Key Points:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#FFFFFF', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0 }} />
                  <span><strong>Millets:</strong> jowar, bajra, ragi, sanwa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#FFFFFF', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0 }} />
                  <span><strong>Native crops</strong> of India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: '#FFFFFF', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#34D399" style={{ flexShrink: 0 }} />
                  <span><strong>Grow easily</strong> in different climatic conditions</span>
                </div>
              </div>
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
        <span>Have You Tasted Millets?</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
