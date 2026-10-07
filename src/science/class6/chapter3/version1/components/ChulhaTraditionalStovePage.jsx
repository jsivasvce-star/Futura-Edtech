import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Leaf, Lightbulb, 
  Sparkles, Flame, EyeOff
} from 'lucide-react';
import chulhaBg from '../assets/chulha_cooking_bg.jpg';

export default function ChulhaTraditionalStovePage({ onBack, onNext }) {
  // Card is visible after 4 seconds automatically
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const KEY_FEATURES = [
    {
      icon: '🪵',
      text: 'Uses wood, leaves or biomass as fuel'
    },
    {
      icon: '🍃',
      text: 'Food is cooked slowly, giving a smoky flavour'
    },
    {
      icon: '🏺',
      text: 'Made of mud, clay or bricks'
    },
    {
      icon: '🔥',
      text: 'Common in rural areas and used since ancient times'
    },
    {
      icon: '⏳',
      text: 'Requires more time and manual fuel gathering'
    }
  ];

  const RELATED_QUESTIONS = [
    {
      num: '01',
      badgeColor: '#EF4444',
      badgeShadow: 'rgba(239, 68, 68, 0.5)',
      question: 'Why do foods cooked slowly over firewood in a mud chulha develop a distinct rich smoky aroma?'
    },
    {
      num: '02',
      badgeColor: '#22C55E',
      badgeShadow: 'rgba(34, 197, 94, 0.5)',
      question: 'What natural biomass fuels were gathered in villages, and why was gathering them daily hard physical work?'
    },
    {
      num: '03',
      badgeColor: '#3B82F6',
      badgeShadow: 'rgba(59, 130, 246, 0.5)',
      question: 'How did indoor smoke from burning firewood affect the health and breathing of cooks and family members?'
    }
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#041F17',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Fullscreen Photorealistic Village Kitchen Background */}
      <img
        src={chulhaBg}
        alt="Traditional Chulha Village Kitchen"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Vignette & Contrast Enhancer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Floating Top-Left Back Navigation Button */}
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          zIndex: 30,
          background: 'rgba(2, 38, 28, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '2px solid rgba(52, 211, 153, 0.5)',
          color: '#A7F3D0',
          fontSize: '20px',
          fontWeight: 800,
          padding: '8px 22px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <ArrowLeft size={22} color="#A7F3D0" />
        Crop Book
      </motion.button>

      {/* Floating Top-Right Next Navigation Button */}
      {!showCard && (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            zIndex: 35,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: '2px solid #FEF08A',
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 900,
            padding: '8px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(217, 119, 6, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          }}
        >
          <span>Next</span>
          <ArrowRight size={22} color="#FFFFFF" />
        </motion.button>
      )}

      {/* Floating Bottom-Right Next Navigation Button */}
      {!showCard && (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '28px',
            zIndex: 35,
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
            boxShadow: '0 8px 25px rgba(217, 119, 6, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          }}
        >
          <span>Next</span>
          <ArrowRight size={24} color="#FFFFFF" />
        </motion.button>
      )}

      {/* 3. Floating Left-Center Toggle Icon */}
      <motion.button
        type="button"
        onClick={() => setShowCard(prev => !prev)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        animate={!showCard ? {
          scale: [1, 1.08, 1],
          boxShadow: [
            '0 0 10px rgba(245, 158, 11, 0.4)',
            '0 0 22px rgba(254, 240, 138, 0.8)',
            '0 0 10px rgba(245, 158, 11, 0.4)',
          ],
        } : {}}
        transition={!showCard ? { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } : {}}
        style={{
          position: 'absolute',
          left: '18px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(2, 38, 28, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '2px solid #F59E0B',
          color: '#FEF08A',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.65)',
        }}
        title={showCard ? 'Hide Details' : 'Show Details'}
      >
        <Flame size={24} color="#FEF08A" />
      </motion.button>

      {/* 4. Main Glass Card on the Right - Appears after 4s */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: '28px',
              top: '20px',
              bottom: '20px',
              width: '52vw',
              maxWidth: '760px',
              minWidth: '560px',
              zIndex: 20,
              background: 'rgba(2, 24, 18, 0.76)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              boxSizing: 'border-box',
              gap: '8px',
            }}
          >
            {/* A. Top Header Banner: Chulha (Traditional Stove) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  background: 'linear-gradient(90deg, #B45309 0%, #D97706 40%, #B45309 100%)',
                  border: '2px solid rgba(254, 240, 138, 0.6)',
                  borderRadius: '999px',
                  padding: '6px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(180, 83, 9, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BookOpen size={20} color="#FFFFFF" />
                  </div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: '0.01em',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    Chulha (Traditional Stove)
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Leaf size={22} color="#86EFAC" />
                  <button
                    type="button"
                    onClick={() => setShowCard(false)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1.5px solid rgba(254, 240, 138, 0.6)',
                      color: '#FEF08A',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      fontSize: '20px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    title="Minimize to view full kitchen"
                  >
                    <EyeOff size={18} color="#FEF08A" />
                    <span>Minimize</span>
                  </button>
                </div>
              </div>

              {/* Subtitle / Definition */}
              <p
                style={{
                  margin: '2px 4px 0 4px',
                  fontSize: '20px',
                  color: '#F3F4F6',
                  lineHeight: '1.3',
                  fontWeight: 700,
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                A chulha is a traditional cooking stove that uses wood, leaves or other biomass as fuel. It has been used for centuries in many parts of India, especially in rural areas.
              </p>
            </div>

            {/* B. Section 1: Key Features */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.32)',
                border: '1.5px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '16px',
                padding: '10px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxSizing: 'border-box',
              }}
            >
              {/* Section Pill Header */}
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'linear-gradient(90deg, #D97706 0%, #B45309 60%, rgba(180, 83, 9, 0.8) 100%)',
                  border: '1.5px solid #FDE047',
                  borderRadius: '999px',
                  padding: '3px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 3px 10px rgba(217, 119, 6, 0.45)',
                }}
              >
                <div
                  style={{
                    background: '#FEF08A',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lightbulb size={14} color="#92400E" />
                </div>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                  }}
                >
                  Key Features
                </span>
              </div>

              {/* List of 5 Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {KEY_FEATURES.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#FFFFFF',
                      fontSize: '20px',
                      fontWeight: 700,
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Section 2: THINK BOX - Related Questions (Answers removed) */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.38)',
                border: '1.5px solid rgba(250, 204, 21, 0.45)',
                borderRadius: '16px',
                padding: '10px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              {/* Think Box Pill Header */}
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'linear-gradient(90deg, #D97706 0%, #B45309 60%, rgba(180, 83, 9, 0.8) 100%)',
                  border: '1.5px solid #FDE047',
                  borderRadius: '999px',
                  padding: '3px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 3px 10px rgba(217, 119, 6, 0.45)',
                }}
              >
                <div
                  style={{
                    background: '#FEF08A',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={14} color="#92400E" />
                </div>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                  }}
                >
                  Think Box • Related Questions
                </span>
              </div>

              {/* 3 Related Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {RELATED_QUESTIONS.map((qItem, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(254, 240, 138, 0.25)',
                      borderRadius: '12px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Number Circle Badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: qItem.badgeColor,
                        boxShadow: `0 3px 10px ${qItem.badgeShadow}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: 900,
                      }}
                    >
                      {qItem.num}
                    </div>

                    {/* Question Content */}
                    <div
                      style={{
                        color: '#FEF08A',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: '1.25',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {qItem.question}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Bottom Navigation Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '14px',
                paddingTop: '2px',
              }}
            >
              <motion.button
                type="button"
                onClick={onNext}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '2px solid #FEF08A',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: 900,
                  padding: '8px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(217, 119, 6, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
                }}
              >
                <span>Next: Modern Gas Stove</span>
                <ArrowRight size={20} color="#FFFFFF" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
