import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, UtensilsCrossed } from 'lucide-react';
import componentsOfFoodIntroImg from '../assets/components_of_food_intro.jpg';

export default function ComponentsOfFoodIntroPage({ onBack, onNext }) {
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
      {/* 1. Ambient Blurred Backdrop to smoothly fill wide/tall viewports */}
      <img
        src={componentsOfFoodIntroImg}
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
        src={componentsOfFoodIntroImg}
        alt="3.2. What are the Components of Food?"
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
          background: 'radial-gradient(ellipse at center, transparent 72%, rgba(2, 24, 17, 0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* 4. Top Center Title: " 3.2. What are the Components of Food? " */}
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
          background: 'rgba(2, 38, 28, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid rgba(254, 240, 138, 0.75)',
          borderRadius: '999px',
          padding: '8px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.65), 0 0 20px rgba(254, 240, 138, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)',
            flexShrink: 0,
          }}
        >
          <UtensilsCrossed size={18} color="#FFFFFF" />
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: '26px',
            fontWeight: 900,
            color: '#FEF08A',
            letterSpacing: '0.01em',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(254, 240, 138, 0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          3.2. What are the Components of Food?
        </h1>
      </motion.div>

      {/* 5. Navigation Controls */}
      {/* Top Left: Back Navigation Button */}
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
          background: 'rgba(2, 38, 28, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          transition: 'all 0.15s ease',
        }}
      >
        <ArrowLeft size={22} color="#A7F3D0" />
        <span>Culinary Practices Evolution</span>
      </motion.button>

      {/* Bottom Right: Next Navigation Button */}
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '24px',
          zIndex: 50,
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
        <span>Scene 1: Food Festival</span>
        <ArrowRight size={22} color="#FFFFFF" />
      </motion.button>
    </div>
  );
}
