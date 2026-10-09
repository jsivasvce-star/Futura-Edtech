import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, UtensilsCrossed, Sparkles, ChevronRight, ChevronLeft, Heart, CheckCircle2 } from 'lucide-react';
import milletsTasteImg from '../assets/have_you_tasted_millets.jpg';

const TRADITIONAL_MILLET_DISHES = [
  { name: 'Ragi Mudde / Balls', benefit: 'Super rich in calcium for bone strength' },
  { name: 'Jowar & Bajra Bhakri', benefit: 'High dietary fibre, excellent for digestion' },
  { name: 'Millet Porridge / Kanji', benefit: 'Cooling, nutrient-dense breakfast' },
  { name: 'Millet Khichdi & Upma', benefit: 'Complex carbohydrates for steady all-day energy' },
];

export default function HaveYouTastedMilletsPage({ onBack, onNext }) {
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
        background: '#180B04',
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
        src={milletsTasteImg}
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
        src={milletsTasteImg}
        alt="Have you tasted millets? - Traditional Indian Millet Diet"
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(24, 10, 4, 0.45) 100%)',
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
          background: 'rgba(28, 12, 4, 0.88)',
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
        <span>Native Crops & Sanwa</span>
      </motion.button>

      {/* 5. Top-Right: Category Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(28, 12, 4, 0.88)',
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
        <Heart size={18} color="#FBBF24" />
        <span
          style={{
            color: '#FEF08A',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Traditional Indian Diet
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
          background: 'rgba(28, 12, 4, 0.92)',
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
        <UtensilsCrossed size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Details' : 'Show Details'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Popup: Have you tasted millets? */}
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
              background: 'linear-gradient(145deg, rgba(32, 14, 5, 0.94) 0%, rgba(18, 7, 2, 0.96) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '20px 24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(245, 158, 11, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
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
              <UtensilsCrossed size={24} color="#F59E0B" />
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
                Have you tasted millets?
              </h2>
            </div>

            {/* Question Callout Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1.5px solid rgba(251, 191, 36, 0.55)',
                borderRadius: '16px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Sparkles size={22} color="#FBBF24" style={{ flexShrink: 0 }} />
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#FEF08A',
                  lineHeight: '1.4',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                }}
              >
                Have you ever had food items made from these millets?
              </div>
            </div>

            {/* Core Paragraph Provided by User */}
            <div
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#FED7AA',
                background: 'rgba(28, 12, 4, 0.65)',
                border: '1.5px solid rgba(251, 191, 36, 0.35)',
                borderRadius: '16px',
                padding: '14px 18px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              Millets are <strong>small-sized grains</strong> and have been an integral part of the Indian diet for centuries. They have regained popularity due to their <strong>numerous health benefits</strong>.
            </div>

            {/* Traditional Delicacies Showcase Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.08) 100%)',
                border: '1.5px solid rgba(52, 211, 153, 0.5)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#86EFAC', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Traditional Millet Delicacies:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {TRADITIONAL_MILLET_DISHES.map((dish) => (
                  <div
                    key={dish.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: '#FFFFFF',
                    }}
                  >
                    <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: '#FEF08A' }}>{dish.name}</strong>: <span style={{ color: '#D1FAE5' }}>{dish.benefit}</span>
                    </div>
                  </div>
                ))}
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
        <span>Millets as Nutri-Cereals</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
