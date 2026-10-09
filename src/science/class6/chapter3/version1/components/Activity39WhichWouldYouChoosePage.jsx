import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import chooseImg from '../assets/activity_3_9_which_would_you_choose.jpg';

export default function Activity39WhichWouldYouChoosePage({ onBack, onNext }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        onNext?.();
      } else if (e.key === 'ArrowLeft') {
        onBack?.();
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
        background: '#0B1C14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Ambient Blurred Backdrop to smoothly fill wide/tall viewports */}
      <img
        src={chooseImg}
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
        src={chooseImg}
        alt="Activity 3.9: Which would you choose – and why?"
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(6, 20, 14, 0.45) 100%)',
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
        <span>Back to Table</span>
      </motion.button>

      {/* 5. Top-Right: Chapter Activity Badge */}
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
        <HelpCircle size={18} color="#FBBF24" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Activity 3.9 · Reflection
        </span>
      </div>

      {/* 6. Interactive Bottom Choice Bar (Prompts student reflection) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '90vw',
        }}
      >
        {/* Choice Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button
            type="button"
            onClick={() => setSelectedChoice('wafers')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: selectedChoice === 'wafers'
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.85) 0%, rgba(185, 28, 28, 0.9) 100%)'
                : 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              border: selectedChoice === 'wafers'
                ? '2px solid #FCA5A5'
                : '2px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '16px',
              padding: '10px 20px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)',
            }}
          >
            <span>🥔 Potato Wafers</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setSelectedChoice('chana')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: selectedChoice === 'chana'
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.95) 100%)'
                : 'rgba(7, 30, 22, 0.85)',
              backdropFilter: 'blur(12px)',
              border: selectedChoice === 'chana'
                ? '2px solid #86EFAC'
                : '2px solid rgba(52, 211, 153, 0.5)',
              borderRadius: '16px',
              padding: '10px 20px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)',
            }}
          >
            <span>🌰 Roasted Chana</span>
            <Sparkles size={16} color="#FEF08A" />
          </motion.button>
        </div>

        {/* Dynamic Explanation Popup Card */}
        <AnimatePresence>
          {selectedChoice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                background: selectedChoice === 'chana'
                  ? 'rgba(6, 44, 30, 0.95)'
                  : 'rgba(45, 15, 15, 0.95)',
                backdropFilter: 'blur(14px)',
                border: selectedChoice === 'chana'
                  ? '2px solid #34D399'
                  : '2px solid #F87171',
                borderRadius: '16px',
                padding: '12px 20px',
                color: '#FFFFFF',
                maxWidth: '560px',
                textAlign: 'center',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {selectedChoice === 'chana' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <CheckCircle2 size={20} color="#34D399" style={{ flexShrink: 0 }} />
                  <span>
                    <strong style={{ color: '#86EFAC' }}>Excellent Wholesome Choice!</strong> Roasted chana gives your growing body steady energy, high protein for muscles, dietary fibre for digestion, and only 1/5th the fat!
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <AlertTriangle size={20} color="#F87171" style={{ flexShrink: 0 }} />
                  <span>
                    <strong style={{ color: '#FCA5A5' }}>Think Again!</strong> Potato wafers taste crunchy and salty, but contain over 5× more fat, minimal protein, and lots of sodium that strain your health.
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 7. Bottom-Right: Next Navigation Button */}
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
        <span>Junk Food Alert</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
