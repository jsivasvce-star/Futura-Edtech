import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import scene2Img from '../assets/food_festival_scene2_carbs.jpg';

export default function FoodFestivalScene2Page({ onBack, onNext }) {
  const fullText =
    'When we miss a meal, we feel tired. Glucose gives instant energy. Wheat, rice, maize, potato, banana and sugar are carbohydrates.';

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    let index = 0;
    // 1x human reading speed: ~45ms per character (approx 220 words per minute)
    const interval = setInterval(() => {
      index += 1;
      setCharCount(index);
      if (index >= fullText.length) {
        clearInterval(interval);
        const nextTimer = setTimeout(() => {
          if (onNext) onNext();
        }, 1500);
        return () => clearTimeout(nextTimer);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullText, onNext]);
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
        src={scene2Img}
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
        src={scene2Img}
        alt="Scene 2: Carbohydrates & Energy"
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
        <span>Scene 1: Food Festival</span>
      </motion.button>

      {/* 5. Top-Right: Scene Badge & Next Navigation */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            background: 'rgba(2, 38, 28, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid rgba(250, 204, 21, 0.65)',
            borderRadius: '999px',
            padding: '6px 18px',
            color: '#FEF08A',
            fontSize: '18px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          <Sparkles size={18} color="#FACC15" />
          <span>SCENE 2</span>
        </div>

        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            border: '2px solid #FEF08A',
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 900,
            padding: '8px 22px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(217, 119, 6, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
            transition: 'all 0.15s ease',
          }}
        >
          <span>Scene 3</span>
          <ArrowRight size={20} color="#FFFFFF" />
        </motion.button>
      </div>

      {/* 6. Bottom Story Subtitle (24px Gold Font, Never Hidden) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: '92vw',
          maxWidth: '1360px',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '24px',
            fontWeight: 800,
            color: '#FEF08A',
            letterSpacing: '0.015em',
            lineHeight: 1.35,
            textShadow:
              '0 2px 6px rgba(0, 0, 0, 1), 0 0 16px rgba(0, 0, 0, 0.95), 0 0 32px rgba(0, 0, 0, 0.9), -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000',
          }}
        >
          {fullText.slice(0, charCount)}
          {charCount < fullText.length && (
            <span style={{ color: '#FFFFFF', fontWeight: 900, marginLeft: '4px' }}>|</span>
          )}
        </span>
      </div>
    </div>
  );
}
