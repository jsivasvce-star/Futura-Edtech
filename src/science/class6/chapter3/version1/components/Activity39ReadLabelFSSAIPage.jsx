import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ScanLine, ShieldCheck, Sparkles, ChevronRight, ChevronLeft, Award, FileText, CheckCircle2 } from 'lucide-react';
import readLabelImg from '../assets/activity_3_9_read_the_label_fssai.jpg';

export default function Activity39ReadLabelFSSAIPage({ onBack, onNext }) {
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
        src={readLabelImg}
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
        src={readLabelImg}
        alt="Read the label. Choose wisely. - Food Fortification & FSSAI"
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
        <span>Ultimate Wealth</span>
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
        <ShieldCheck size={18} color="#34D399" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Activity 3.9 · Food Labels & FSSAI
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
        <FileText size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Details' : 'Show Details'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Popup: Food Labels, Fortification & FSSAI */}
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
                gap: '10px',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '10px',
              }}
            >
              <ScanLine size={24} color="#34D399" />
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
                Food Labels & Fortification
              </h2>
            </div>

            {/* Paragraph 1: Nutrient Information on Covers */}
            <div
              style={{
                background: 'rgba(6, 78, 59, 0.4)',
                border: '1.5px solid rgba(167, 243, 208, 0.35)',
                borderRadius: '14px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontSize: '13px', fontWeight: 800 }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span>Nutritional Labels:</span>
              </div>
              <div style={{ fontSize: '14.5px', lineHeight: '1.55', color: '#FFFFFF', fontWeight: 500 }}>
                Packaged food items must have information about the nutrients on their cover. The information should list the amount of each nutrient.
              </div>
            </div>

            {/* Paragraph 2: Food Fortification */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                border: '1.5px solid rgba(251, 191, 36, 0.45)',
                borderRadius: '14px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDE047', fontSize: '13px', fontWeight: 800 }}>
                <Sparkles size={18} color="#FBBF24" />
                <span>What is Fortification?</span>
              </div>
              <div style={{ fontSize: '14.5px', lineHeight: '1.55', color: '#FEF3C7', fontWeight: 500 }}>
                Sometimes, more nutrients are added to the food during processing (<strong>fortification</strong>) to improve its nutritional quality. <strong>Iodised salt</strong> and some <strong>baby foods</strong> are examples of fortified foods.
              </div>
            </div>

            {/* Paragraph 3: FSSAI Authority */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.1) 100%)',
                border: '2px solid rgba(52, 211, 153, 0.55)',
                borderRadius: '14px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#86EFAC', fontSize: '13px', fontWeight: 800 }}>
                <Award size={18} color="#34D399" />
                <span>Government Regulation:</span>
              </div>
              <div style={{ fontSize: '14.5px', lineHeight: '1.55', color: '#E2E8F0', fontWeight: 500 }}>
                The <strong>Food Safety and Standards Authority of India (FSSAI)</strong> is a government agency that regulates food quality in India.
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
        <span>Millets & Nutrition</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
