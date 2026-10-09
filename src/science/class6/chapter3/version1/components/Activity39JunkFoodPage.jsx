import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, AlertTriangle, ShieldCheck, ChevronRight, ChevronLeft, Table2, Info, Sparkles } from 'lucide-react';
import junkFoodImg from '../assets/activity_3_9_junk_food.jpg';

const JUNK_FOOD_DATA = [
  {
    parameter: 'Calories',
    wafers: 'High',
    candy: 'High',
    drinks: 'High',
    chana: 'Lower',
    chanaGood: true,
  },
  {
    parameter: 'Sugar and fat',
    wafers: 'High fat',
    candy: 'High',
    drinks: 'High sugar',
    chana: 'Low fat',
    chanaGood: true,
  },
  {
    parameter: 'Proteins, minerals, vitamins',
    wafers: 'Low',
    candy: 'Very low',
    drinks: 'Very low',
    chana: 'High protein',
    chanaGood: true,
  },
  {
    parameter: 'Dietary fibre',
    wafers: 'Low',
    candy: 'Very low',
    drinks: 'Very low',
    chana: 'High',
    chanaGood: true,
  },
  {
    parameter: 'Junk food?',
    wafers: 'Yes',
    candy: 'Yes',
    drinks: 'Yes',
    chana: 'No',
    isVerdict: true,
  },
];

export default function Activity39JunkFoodPage({ onBack, onNext }) {
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
        background: '#1A0C06',
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
        src={junkFoodImg}
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
        src={junkFoodImg}
        alt="Activity 3.9: High in calories, low in nutrients - Junk Food"
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
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(20, 8, 4, 0.45) 100%)',
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
          background: 'rgba(28, 12, 6, 0.88)',
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
        <span>Which Would You Choose?</span>
      </motion.button>

      {/* 5. Top-Right: Activity Badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(28, 12, 6, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(248, 113, 113, 0.75)',
          borderRadius: '999px',
          padding: '6px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
        }}
      >
        <AlertTriangle size={18} color="#F87171" />
        <span
          style={{
            color: '#FECACA',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Activity 3.9 · Junk Food Alert
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
          right: showPopup ? 'calc(min(760px, 58vw) + 24px)' : '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 65,
          background: 'rgba(28, 12, 6, 0.92)',
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
        <Table2 size={20} color="#FEF08A" />
        <span style={{ fontSize: '14px', fontWeight: 800 }}>
          {showPopup ? 'Hide Table' : 'Show Table'}
        </span>
        {showPopup ? <ChevronRight size={18} color="#FEF08A" /> : <ChevronLeft size={18} color="#FEF08A" />}
      </motion.button>

      {/* 7. Interactive Junk Food Information Popup */}
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
              width: 'min(760px, 58vw)',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              background: 'linear-gradient(145deg, rgba(32, 14, 8, 0.94) 0%, rgba(18, 7, 3, 0.96) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '2px solid rgba(254, 240, 138, 0.9)',
              borderRadius: '24px',
              padding: '22px 26px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(239, 68, 68, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Header: Title at 24px */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '2px solid rgba(254, 240, 138, 0.35)',
                paddingBottom: '12px',
              }}
            >
              <AlertTriangle size={26} color="#F59E0B" />
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
                Junk Food: High in Calories, Low in Nutrients
              </h2>
            </div>

            {/* Paragraph Text (Bold Content at 20px) */}
            <div
              style={{
                fontSize: '20px',
                lineHeight: '1.55',
                color: '#FED7AA',
                fontWeight: 800,
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1.5px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '14px',
                padding: '14px 18px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              Some foods have high calories due to high sugar and fat content. Moreover, they contain very low amounts of proteins, minerals, vitamins and dietary fibres. These foods are called junk foods. These foods include potato wafers, candy bars and carbonated drinks.
            </div>

            {/* Comparison Table */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1.5px solid rgba(254, 240, 138, 0.4)',
                background: 'rgba(0, 0, 0, 0.4)',
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
                      background: 'rgba(239, 68, 68, 0.25)',
                      borderBottom: '1.5px solid rgba(254, 240, 138, 0.4)',
                    }}
                  >
                    {/* Subheading: Column Headers at 21px - 22px */}
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#FEF08A',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Feature
                    </th>
                    <th
                      style={{
                        padding: '12px 10px',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#FDE047',
                        textAlign: 'center',
                      }}
                    >
                      Potato wafers
                    </th>
                    <th
                      style={{
                        padding: '12px 10px',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#FDE047',
                        textAlign: 'center',
                      }}
                    >
                      Candy bars
                    </th>
                    <th
                      style={{
                        padding: '12px 10px',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#FDE047',
                        textAlign: 'center',
                      }}
                    >
                      Carbonated drinks
                    </th>
                    <th
                      style={{
                        padding: '12px 10px',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#86EFAC',
                        textAlign: 'center',
                        background: 'rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      Roasted chana
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {JUNK_FOOD_DATA.map((row, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={row.parameter}
                        style={{
                          background: row.isVerdict
                            ? 'rgba(0, 0, 0, 0.6)'
                            : isEven
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.2)',
                          borderBottom: index < JUNK_FOOD_DATA.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                        }}
                      >
                        {/* Table Row Content: Bold at 20px */}
                        <td
                          style={{
                            padding: '12px 14px',
                            fontSize: '20px',
                            fontWeight: 800,
                            color: row.isVerdict ? '#FEF08A' : '#FFFFFF',
                          }}
                        >
                          {row.parameter}
                        </td>
                        <td
                          style={{
                            padding: '12px 10px',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 800,
                            color: row.isVerdict ? '#F87171' : '#FCA5A5',
                          }}
                        >
                          {row.isVerdict ? (
                            <span style={{
                              background: 'rgba(239, 68, 68, 0.25)',
                              border: '1.5px solid #F87171',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              fontWeight: 800,
                              fontSize: '20px',
                            }}>
                              Yes ⚠️
                            </span>
                          ) : (
                            row.wafers
                          )}
                        </td>
                        <td
                          style={{
                            padding: '12px 10px',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 800,
                            color: row.isVerdict ? '#F87171' : '#FCA5A5',
                          }}
                        >
                          {row.isVerdict ? (
                            <span style={{
                              background: 'rgba(239, 68, 68, 0.25)',
                              border: '1.5px solid #F87171',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              fontWeight: 800,
                              fontSize: '20px',
                            }}>
                              Yes ⚠️
                            </span>
                          ) : (
                            row.candy
                          )}
                        </td>
                        <td
                          style={{
                            padding: '12px 10px',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 800,
                            color: row.isVerdict ? '#F87171' : '#FCA5A5',
                          }}
                        >
                          {row.isVerdict ? (
                            <span style={{
                              background: 'rgba(239, 68, 68, 0.25)',
                              border: '1.5px solid #F87171',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              fontWeight: 800,
                              fontSize: '20px',
                            }}>
                              Yes ⚠️
                            </span>
                          ) : (
                            row.drinks
                          )}
                        </td>
                        <td
                          style={{
                            padding: '12px 10px',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 800,
                            color: '#34D399',
                            background: 'rgba(16, 185, 129, 0.15)',
                          }}
                        >
                          {row.isVerdict ? (
                            <span style={{
                              background: 'rgba(16, 185, 129, 0.3)',
                              border: '1.5px solid #34D399',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              color: '#86EFAC',
                              fontWeight: 800,
                              fontSize: '20px',
                            }}>
                              No ✅
                            </span>
                          ) : (
                            row.chana
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Summary Insight */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
                border: '1.5px solid rgba(52, 211, 153, 0.45)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <ShieldCheck size={26} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Subheading: 22px */}
                <div style={{ color: '#86EFAC', fontSize: '22px', fontWeight: 600 }}>
                  Mindful Eating Lesson:
                </div>
                {/* Lesson Content: Bold at 20px */}
                <div style={{ fontSize: '20px', color: '#D1FAE5', lineHeight: '1.5', fontWeight: 800 }}>
                  Packaged junk foods spike energy temporarily but starve the body of essential building blocks. Wholesome snacks like roasted chana protect and strengthen you!
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
        <span>Ultimate Wealth</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
