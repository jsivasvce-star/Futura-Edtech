import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import activity32Img from '../assets/activity3_2_regional_food.jpg';

export default function Activity32RegionalFoodPage({ onBack, onNext }) {
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
      }}
    >
      {/* Ambient Blurred Background to fill full screen seamlessly */}
      <img
        src={activity32Img}
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

      {/* Main Full Screen Image Aligned Without Overlap on Left and Right */}
      <img
        src={activity32Img}
        alt="Activity 3.2: Food in Different Regions"
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

      {/* Subtle ambient vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 70%, rgba(2, 24, 17, 0.35) 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* 2. Bottom Left: Back Button (Glossy Green & Cream Panel) */}
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '24px',
          zIndex: 50,
          background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.35) 0%, rgba(6, 50, 36, 0.90) 18%, rgba(4, 38, 28, 0.94) 50%, rgba(2, 26, 18, 0.98) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '2px solid #FEFCE8',
          color: '#FEF08A',
          fontSize: '24px',
          fontWeight: 900,
          padding: '6px 28px',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(167, 243, 208, 0.2), inset 0 2px 3px rgba(255, 255, 255, 0.75), inset 0 -2px 2px rgba(0, 0, 0, 0.35)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.15s ease',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(251, 191, 36, 0.4)',
          overflow: 'hidden',
        }}
      >
        {/* Top Half Gloss Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '48%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(254, 252, 232, 0.1) 100%)',
            pointerEvents: 'none',
          }}
        />
        <ArrowLeft size={20} color="#FEF08A" style={{ position: 'relative', zIndex: 2 }} />
        <span style={{ position: 'relative', zIndex: 2 }}>Back</span>
      </motion.button>

      {/* 3. Bottom Right: Next Button (Glossy Green & Cream Panel) */}
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '24px',
          zIndex: 50,
          background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.45) 0%, rgba(16, 185, 129, 0.95) 18%, rgba(5, 150, 105, 0.96) 50%, rgba(4, 120, 87, 0.98) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '2.5px solid #FEFCE8',
          color: '#FEF08A',
          fontSize: '24px',
          fontWeight: 900,
          padding: '6px 32px',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 6px 22px rgba(4, 46, 35, 0.45), 0 0 18px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -2px 3px rgba(0, 0, 0, 0.35)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.15s ease',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(251, 191, 36, 0.4)',
          overflow: 'hidden',
        }}
      >
        {/* Top Half Gloss Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '48%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(254, 252, 232, 0.15) 100%)',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 2 }}>Next</span>
        <ArrowRight size={20} color="#FEF08A" style={{ position: 'relative', zIndex: 2 }} />
      </motion.button>
    </div>
  );
}
