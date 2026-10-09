import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Scale, Sparkles, ChevronRight, ChevronLeft, Table2, Info } from 'lucide-react';
import classroomImg from '../assets/activity_3_9_classroom_compare.jpg';

const NUTRITION_COMPARISON = [
  {
    parameter: 'Energy',
    wafers: '536 kcal',
    chana: '355 kcal',
    highlight: 'chana',
    tag: 'Moderate energy',
  },
  {
    parameter: 'Fats',
    wafers: '35.0 g',
    chana: '6.26 g',
    highlight: 'chana',
    tag: '5x less fat in chana',
  },
  {
    parameter: 'Carbohydrates',
    wafers: '53.0 g',
    chana: '58.58 g',
    highlight: 'neutral',
    tag: 'Complex carbs',
  },
  {
    parameter: 'Proteins',
    wafers: '7.0 g',
    chana: '18.64 g',
    highlight: 'chana',
    tag: 'Nearly 3x protein!',
  },
  {
    parameter: 'Dietary fibre',
    wafers: '4.8 g',
    chana: '16.8 g',
    highlight: 'chana',
    tag: '3.5x more fibre!',
  },
];

export default function Activity39LetUsComparePage({ onBack, onNext }) {
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
        background: '#0B1C14',
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
        src={classroomImg}
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

      {/* 2. Main Full-Screen Cinematic Image */}
      <img
        src={classroomImg}
        alt="Activity 3.9: Let us compare - Potato Wafers vs Roasted Chana"
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

      {/* 4. Top Center Title Banner: "Activity 3.9: Let us compare" */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: 'rgba(7, 30, 22, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '2px solid rgba(254, 240, 138, 0.85)',
          borderRadius: '999px',
          padding: '8px 28px 8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.55), 0 0 24px rgba(250, 204, 21, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '999px',
            padding: '5px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 10px rgba(217, 119, 6, 0.45)',
            flexShrink: 0,
          }}
        >
          <Scale size={18} color="#FFFFFF" />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Activity 3.9
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 900,
            color: '#FEF08A',
            letterSpacing: '0.02em',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Let us compare</span>
          <Sparkles size={18} color="#FBBF24" style={{ opacity: 0.9 }} />
        </h1>
      </motion.div>

      {/* 5. Top-Left: Back Navigation Button */}
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
          background: 'rgba(7, 30, 22, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(167, 243, 208, 0.5)',
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
        <span>Back</span>
      </motion.button>

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
        title={showPopup ? 'Hide comparison table' : 'Show comparison table'}
      >
        <Table2 size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Table' : 'Show Table'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Comparison Popup: “ Let us compare ” */}
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
              maxHeight: 'calc(100vh - 110px)',
              overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(7, 30, 22, 0.92) 0%, rgba(3, 18, 12, 0.95) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '20px 24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(250, 204, 21, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Popup Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={24} color="#FBBF24" />
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
                  “ Let us compare ”
                </h2>
              </div>
            </div>

            {/* Subtitle Instruction */}
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#D1FAE5',
                lineHeight: '1.5',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                background: 'rgba(6, 78, 59, 0.4)',
                border: '1px solid rgba(167, 243, 208, 0.3)',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <Info size={18} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Read the nutritional information for a packet of potato wafers and a packet of roasted chana.</span>
            </div>

            {/* Comparison Table */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1.5px solid rgba(254, 240, 138, 0.4)',
                background: 'rgba(0, 0, 0, 0.35)',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: 'rgba(16, 185, 129, 0.25)',
                      borderBottom: '1.5px solid rgba(254, 240, 138, 0.4)',
                    }}
                  >
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#FEF08A',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Per 100 g
                    </th>
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#FDE047',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textAlign: 'right',
                      }}
                    >
                      Potato wafers
                    </th>
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '15px',
                        fontWeight: 900,
                        color: '#86EFAC',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        textAlign: 'right',
                      }}
                    >
                      Roasted chana
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NUTRITION_COMPARISON.map((row, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={row.parameter}
                        style={{
                          background: isEven ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.25)',
                          borderBottom: index < NUTRITION_COMPARISON.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                        }}
                      >
                        <td
                          style={{
                            padding: '11px 14px',
                            fontSize: '15px',
                            fontWeight: 800,
                            color: '#FFFFFF',
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>{row.parameter}</span>
                            <span style={{ fontSize: '11px', color: '#6EE7B7', fontWeight: 600 }}>
                              {row.tag}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: '11px 14px',
                            fontSize: '15px',
                            fontWeight: 800,
                            color: row.parameter === 'Fats' ? '#F87171' : '#FDE68A',
                            textAlign: 'right',
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {row.wafers}
                        </td>
                        <td
                          style={{
                            padding: '11px 14px',
                            fontSize: '15px',
                            fontWeight: 900,
                            color: '#34D399',
                            textAlign: 'right',
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {row.chana}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Takeaway Insight Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                border: '1.5px solid rgba(251, 191, 36, 0.45)',
                borderRadius: '14px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Sparkles size={20} color="#FBBF24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '13px', color: '#FEF3C7', lineHeight: '1.45', fontWeight: 600 }}>
                <strong style={{ color: '#FDE047' }}>Health Takeaway:</strong> Roasted chana provides <strong>nearly 3x more protein</strong> and <strong>3.5x more dietary fibre</strong> with only <strong>one-fifth the fat</strong> of fried wafers!
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
        <span>Compare Nutrients</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
