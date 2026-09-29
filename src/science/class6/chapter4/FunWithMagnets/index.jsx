import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, Compass, CheckCircle2, XCircle, ArrowRight,
  Sparkles, RotateCcw, Zap, ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FunWithMagnets.css';
import MazeGame, { getAvailableDirections, NODES_MAP, playElectricLightningSound } from './MazeGame';
import DidYouKnow from './DidYouKnow';
import Quiz from './Quiz';
import { useTheme } from '../../../../ThemeContext.jsx';

// ══════════════════════════════════════════════════════════════════════════════
// NAVIGATION — 8 steps
// ══════════════════════════════════════════════════════════════════════════════
const STEPS_NAV = [
  { id: 0, label: '1. Intro' },
  { id: 1, label: '2. Maglev' },
  { id: 2, label: '3. Float' },
  { id: 3, label: '4. Move' },
  { id: 4, label: '5. E-Magnet' },
  { id: 5, label: '6. Expedition' },
  { id: 6, label: '7. Care' },
  { id: 7, label: '8. Facts' },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED DESIGN TOKENS & LAYOUT HELPERS
// ══════════════════════════════════════════════════════════════════════════════
const DARK_BG = 'linear-gradient(135deg, #020817 0%, #0A1628 55%, #0D1F3C 100%)';
const CARD_GLASS = {
  background: 'rgba(15,23,42,0.90)',
  border: '1.5px solid rgba(56,189,248,0.28)',
  borderRadius: '20px',
  backdropFilter: 'blur(14px)',
};
const TEXT_HEADING = '#E0F2FE';
const TEXT_BODY = '#94A3B8';
const ACCENT_BLUE = '#06B6D4';
const ACCENT_AMBER = '#F59E0B';

function CinematicWrap({ children, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: DARK_BG,
      borderRadius: '20px',
      display: 'flex', flexDirection: 'row',
      gap: '1.25rem', padding: '0.85rem',
      boxSizing: 'border-box', overflow: 'hidden',
      position: 'relative',
      ...style
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.14) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        opacity: 0.55, pointerEvents: 'none', borderRadius: '20px'
      }} />
      <div style={{
        position: 'absolute', top: '-15%', right: '-5%', width: '450px', height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'row', gap: '1.25rem'
      }}>
        {children}
      </div>
    </div>
  );
}

function LeftPanel({ children, style = {} }) {
  return (
    <div style={{
      flex: '1.15', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      ...CARD_GLASS,
      padding: '1.25rem 1.1rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );
}

function RightPanel({ children, style = {} }) {
  return (
    <div style={{
      flex: '0.85', height: '100%', display: 'flex', flexDirection: 'column',
      gap: '1rem', overflowY: 'auto',
      ...CARD_GLASS,
      padding: '1.5rem 1.35rem',
      boxSizing: 'border-box',
      ...style
    }}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: 'rgba(6,182,212,0.15)', border: `1.5px solid ${ACCENT_BLUE}`,
      color: '#67E8F9', padding: '0.35rem 0.9rem', borderRadius: '20px',
      fontSize: '0.77rem', fontWeight: 800, letterSpacing: '0.7px',
      width: 'fit-content', flexShrink: 0
    }}>
      {children}
    </div>
  );
}

function ProceedBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '0.9rem 1.5rem', borderRadius: '28px', border: 'none',
      background: disabled
        ? 'rgba(30,41,59,0.8)'
        : `linear-gradient(135deg, ${ACCENT_AMBER} 0%, #D97706 100%)`,
      color: disabled ? '#64748B' : '#FFFFFF',
      fontWeight: 900, fontSize: '0.95rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 6px 20px rgba(245,158,11,0.4)',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      transition: 'all 0.25s ease', width: '100%', justifyContent: 'center',
      marginTop: 'auto', flexShrink: 0
    }}>
      {children} {!disabled && <ArrowRight size={18} color="#FFFFFF" />}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 0 — Can a Train Float? — Cinematic Intro Question (Full-Bleed Maglevfront.png)
// ══════════════════════════════════════════════════════════════════════════════
function Step0Intro({ onNext, onBack }) {
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (val) => {
    setAnswer(val);
    setTimeout(() => onNext(), 800);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 2.5rem 1.6rem 2.5rem',
      boxSizing: 'border-box',
      backgroundImage: "url('/FunWithMagnets/Maglevfront.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Top Header Center Plaque (Single continuous line with reduced font size) */}
      <div style={{
        alignSelf: 'center',
        background: 'rgba(255, 253, 245, 0.96)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid #FDE68A',
        borderRadius: '24px',
        padding: '0.65rem 2.2rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 20,
        whiteSpace: 'nowrap',
        maxWidth: '96%',
        marginTop: '0.25rem'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.95rem',
          fontWeight: 900,
          color: '#0F172A',
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          Activity 4.9: Fun with Magnets — Maglev Train &amp; Magnetic Town Expedition
        </h1>
      </div>

      {/* Main Left-Aligned Question & Interactive 3-Option Stack - Positioned comfortably above bottom nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          maxWidth: '620px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
          marginBottom: '0.75rem'
        }}
      >
        {/* Cyan Pill Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(6, 182, 212, 0.25)',
          border: '1.5px solid #38BDF8',
          color: '#E0F2FE',
          padding: '0.3rem 0.9rem',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 900,
          letterSpacing: '0.6px',
          width: 'fit-content',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
        }}>
          ⚡ ACTIVITY 4.9 • FUN WITH MAGNETS • MAGLEV TRAIN
        </div>

        {/* Main Heading */}
        <h1 style={{
          margin: 0,
          fontSize: '2.2rem',
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          textShadow: '0 4px 24px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.9)'
        }}>
          Can a train move without its wheels touching the track?
        </h1>

        {/* 3 Interactive Option Buttons matching Image 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.1rem' }}>
          {/* Option 1: Yes */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer('yes')}
            style={{
              padding: '0.62rem 1.15rem',
              borderRadius: '16px',
              border: answer === 'yes' ? '2px solid #22C55E' : '1.5px solid rgba(56, 189, 248, 0.45)',
              background: answer === 'yes' ? 'rgba(5, 150, 105, 0.85)' : 'rgba(15, 23, 42, 0.72)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: '#FFFFFF',
              fontWeight: 900,
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)'
            }}>
              ✓
            </div>
            <span style={{ fontSize: '1.12rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
              Yes — magnetic forces make it possible!
            </span>
          </motion.button>

          {/* Option 2: No */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer('no')}
            style={{
              padding: '0.62rem 1.15rem',
              borderRadius: '16px',
              border: answer === 'no' ? '2px solid #EF4444' : '1.5px solid rgba(56, 189, 248, 0.45)',
              background: answer === 'no' ? 'rgba(220, 38, 38, 0.85)' : 'rgba(15, 23, 42, 0.72)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: '#FFFFFF',
              fontWeight: 900,
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)'
            }}>
              ✕
            </div>
            <span style={{ fontSize: '1.12rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
              No — trains must have wheels touching the track
            </span>
          </motion.button>

          {/* Option 3: Discover */}
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer('discover')}
            style={{
              padding: '0.62rem 1.15rem',
              borderRadius: '16px',
              border: '2px solid #FDE68A',
              background: answer === 'discover' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(15, 23, 42, 0.72)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.35), 0 4px 14px rgba(0,0,0,0.35)',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(30, 41, 59, 0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              🚀
            </div>
            <span style={{ fontSize: '1.12rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
              Let's Discover Together!
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Navigation Buttons (Back on Left, Next on Right) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        width: '100%',
        marginTop: '0'
      }}>
        <button
          onClick={onBack}
          className="navy-btn"
          style={{
            padding: '0.75rem 2.2rem',
            fontSize: '1.15rem',
            fontWeight: 900,
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
            color: '#FFFFFF',
            border: '1.5px solid #2B6CB0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(23, 59, 95, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={22} color="#FFFFFF" /> Back
        </button>

        <button
          onClick={onNext}
          className="gold-glow-btn"
          style={{
            padding: '0.75rem 2.6rem',
            fontSize: '1.15rem',
            fontWeight: 900,
            borderRadius: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          Next <ArrowRight size={22} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — What is a Maglev Train? — Video Player & Physics Overview (Image 2 Match)
// ══════════════════════════════════════════════════════════════════════════════
function Step1Maglev() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: '1.5rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '100%',
      alignItems: 'stretch'
    }}>
      {/* ── LEFT CONTAINER: CLEAN CARD & EMBEDDED MAGLEV VIDEO ── */}
      <div style={{
        height: '100%',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        padding: '1.4rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden'
      }}>
        {/* Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.55rem 1.35rem',
            borderRadius: '22px',
            fontSize: '1.45rem',
            fontWeight: 900,
            letterSpacing: '0.5px'
          }}>
            🎥 HIGH-SPEED MAGLEV IN MOTION
          </div>
        </div>

        {/* Responsive Video Containment */}
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#0F172A',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <video
            src="/FunWithMagnets/maglev.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* ── RIGHT CONTAINER: SCALED TYPOGRAPHY & SCIENCE PRINCIPLES ── */}
      <div style={{
        height: '100%',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        padding: '1.4rem 1.6rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.85rem',
        overflow: 'hidden'
      }}>
        {/* Main Title */}
        <h2 style={{
          margin: 0,
          color: '#173B5F',
          fontSize: '3.1rem',
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          flexShrink: 0
        }}>
          What is a Maglev Train?
        </h2>

        {/* Lead Paragraph */}
        <p style={{
          margin: 0,
          color: '#214A70',
          fontSize: '1.62rem',
          lineHeight: 1.42,
          fontWeight: 650,
          flexShrink: 0
        }}>
          A <strong style={{ color: '#0284C7', fontWeight: 900 }}>Maglev train</strong> (Magnetic Levitation) uses synchronized electromagnetic forces rather than mechanical wheels. It lifts off the track and glides through the air frictionless!
        </p>

        {/* Attraction Card */}
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #BBF7D0',
          borderRadius: '18px',
          padding: '1.1rem 1.45rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#15803D', fontWeight: 900, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#3B82F6', display: 'inline-block' }} />
              1. Magnetic Attraction (Opposite Poles)
            </span>
            <span style={{
              color: '#166534',
              fontWeight: 900,
              fontSize: '1.35rem',
              fontFamily: 'monospace',
              background: '#DCFCE7',
              padding: '0.25rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #86EFAC'
            }}>
              N ↔ S
            </span>
          </div>
          <p style={{ margin: 0, color: '#214A70', fontSize: '1.45rem', lineHeight: 1.42, fontWeight: 600 }}>
            When <strong style={{ color: '#173B5F', fontWeight: 900 }}>opposite magnetic poles</strong> face each other, they attract with powerful pulling force. This force pulls the Maglev train forward down the line.
          </p>
        </div>

        {/* Repulsion Card */}
        <div style={{
          background: '#FEF2F2',
          border: '1.5px solid #FECACA',
          borderRadius: '18px',
          padding: '1.1rem 1.45rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#B91C1C', fontWeight: 900, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
              2. Magnetic Repulsion (Like Poles)
            </span>
            <span style={{
              color: '#991B1B',
              fontWeight: 900,
              fontSize: '1.35rem',
              fontFamily: 'monospace',
              background: '#FEE2E2',
              padding: '0.25rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #FCA5A5'
            }}>
              N ↔ N / S ↔ S
            </span>
          </div>
          <p style={{ margin: 0, color: '#214A70', fontSize: '1.45rem', lineHeight: 1.42, fontWeight: 600 }}>
            When <strong style={{ color: '#173B5F', fontWeight: 900 }}>like magnetic poles</strong> face each other, they push forcefully apart. This upward repulsion force lifts the heavy train completely off the track!
          </p>
        </div>

        {/* Bottom Insight Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '18px',
          padding: '1.1rem 1.45rem',
          flexShrink: 0
        }}>
          <p style={{ margin: 0, color: '#78350F', fontSize: '1.52rem', lineHeight: 1.42, fontWeight: 750 }}>
            💡 <strong style={{ color: '#92400E', fontWeight: 900 }}>Zero Track Contact:</strong> Without wheel friction or engine drag, Maglev trains operate silently and glide smoothly at speeds over 500 km/h!
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — How Does the Train Float? — Levitation Physics Slider (Image 1 Match)
// ══════════════════════════════════════════════════════════════════════════════
function Step2Float({ onNext }) {
  const [strength, setStrength] = useState(8);

  const liftPx = Math.round((strength / 100) * 20);
  const glowA = strength / 100;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.4rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '100%',
      alignItems: 'stretch'
    }}>
      {/* ── LEFT CONTAINER: STATION PHOTO + 2x2 PRINCIPLE GRID ── */}
      <div style={{
        height: '100%',
        minHeight: 0,
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        padding: '1.35rem 1.6rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.85rem',
        overflow: 'hidden'
      }}>
        {/* Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.5rem 1.35rem',
            borderRadius: '22px',
            fontSize: '1.35rem',
            fontWeight: 900,
            letterSpacing: '0.5px'
          }}>
            📐 MAGLEV LEVITATION PRINCIPLE
          </div>
        </div>

        {/* Full-width Station Image with Increased Height */}
        <div style={{
          width: '100%',
          height: '215px',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1.5px solid #CBD5E1',
          background: '#F1F5F9',
          boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <img
            src="/FunWithMagnets/scilev_real_platform.jpg"
            alt="SCI-Lev Maglev station platform"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block'
            }}
          />
        </div>

        {/* 2x2 Grid of Principle Cards with Enlarged Typography */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.85rem',
          width: '100%',
          flex: 1,
          minHeight: 0,
          alignItems: 'stretch'
        }}>
          {/* Card 1: Electric Current Flows */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            padding: '1.05rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#F0F9FF',
                padding: '0.25rem 0.55rem',
                borderRadius: '10px',
                border: '1px solid #BAE6FD'
              }}>⚡</span>
              <span style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.01em' }}>
                Electric Current Flows
              </span>
            </div>
            <p style={{ margin: 0, color: '#214A70', fontSize: '1.42rem', lineHeight: 1.4, fontWeight: 600 }}>
              Electricity runs through copper coils embedded in the track guideway.
            </p>
          </div>

          {/* Card 2: Magnetic Field Appears */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            padding: '1.05rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#ECFEFF',
                padding: '0.25rem 0.55rem',
                borderRadius: '10px',
                border: '1px solid #A5F3FC'
              }}>🔵</span>
              <span style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.01em' }}>
                Magnetic Field Appears
              </span>
            </div>
            <p style={{ margin: 0, color: '#214A70', fontSize: '1.42rem', lineHeight: 1.4, fontWeight: 600 }}>
              The electric coils generate a powerful upward-pointing magnetic field.
            </p>
          </div>

          {/* Card 3: Train Lifts Off */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            padding: '1.05rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#F0FDF4',
                padding: '0.25rem 0.55rem',
                borderRadius: '10px',
                border: '1px solid #BBF7D0'
              }}>🚅</span>
              <span style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.01em' }}>
                Train Lifts Off
              </span>
            </div>
            <p style={{ margin: 0, color: '#214A70', fontSize: '1.42rem', lineHeight: 1.4, fontWeight: 600 }}>
              The magnetic field repels the train's superconducting magnets, lifting it up.
            </p>
          </div>

          {/* Card 4: Gap is Precisely Controlled */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            padding: '1.05rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#FFFBEB',
                padding: '0.25rem 0.55rem',
                borderRadius: '10px',
                border: '1px solid #FDE68A'
              }}>📐</span>
              <span style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.01em' }}>
                Gap is Precisely Controlled
              </span>
            </div>
            <p style={{ margin: 0, color: '#214A70', fontSize: '1.42rem', lineHeight: 1.4, fontWeight: 600 }}>
              Sensors adjust current continuously to maintain a stable 10mm levitation gap.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT CONTAINER: LEVITATION SIMULATION & CONTROLS ── */}
      <div style={{
        height: '100%',
        minHeight: 0,
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        padding: '1.35rem 1.6rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.85rem',
        overflow: 'hidden'
      }}>
        {/* Title & Body with Enlarged Typography */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flexShrink: 0 }}>
          <h2 style={{
            margin: 0,
            color: '#173B5F',
            fontSize: '3.1rem',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.025em'
          }}>
            How Does the Train Float?
          </h2>
          <p style={{
            margin: 0,
            color: '#214A70',
            fontSize: '2.15rem',
            lineHeight: 1.42,
            fontWeight: 650
          }}>
            Electromagnetic coils are embedded in the guideway track below the train. When electric current flows through them, they create a powerful upward magnetic force that lifts the train.
          </p>
        </div>

        {/* Train & Levitation Zone */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '4px'
        }}>
          {/* High-Speed Maglev Train Model with Visible Levitation Uplift */}
          <motion.div
            animate={{ y: -liftPx }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            style={{
              position: 'relative',
              zIndex: 4,
              width: '96%',
              maxWidth: '680px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/FunWithMagnets/maglev_bullet_3car_floating.png"
              alt="Transrapid 3-Car Maglev Bullet Train"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.35))'
              }}
            />
          </motion.div>

          {/* Dynamic Levitation Gap & Upward Magnetic Field Flux */}
          <div style={{
            position: 'relative',
            width: '92%',
            height: `${Math.max(6, liftPx)}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            pointerEvents: 'none',
            transition: 'height 0.15s ease',
            zIndex: 3
          }}>
            {strength > 0 && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.75) 0%, rgba(14,165,233,0) 80%)',
                filter: 'blur(5px)',
                opacity: 0.4 + glowA * 0.6
              }} />
            )}

            {strength > 5 && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(k => (
              <motion.div
                key={k}
                animate={{
                  opacity: [0.3, 0.95, 0.3],
                  scaleY: [0.7, 1.3, 0.7]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + (k % 3) * 0.2,
                  ease: 'easeInOut'
                }}
                style={{
                  width: 3.5,
                  height: '100%',
                  background: 'linear-gradient(180deg, #0284C7 0%, #38BDF8 100%)',
                  boxShadow: '0 0 8px rgba(14,165,233,0.9)',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>

          {/* Realistic Concrete Guideway Track */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '42px',
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #475569 0%, #334155 40%, #1E293B 100%)',
            borderTop: '2px solid #94A3B8',
            borderBottom: '2px solid #0F172A',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            {/* Induction Stator Coils */}
            <div style={{
              position: 'absolute',
              top: '2px',
              left: 0,
              right: 0,
              height: '12px',
              backgroundImage: 'repeating-linear-gradient(90deg, #B45309 0px, #F59E0B 4px, #D97706 8px, #78350F 12px, #334155 16px)',
              opacity: 0.92
            }} />
            <div style={{
              position: 'absolute',
              bottom: '3px',
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(180deg, #94A3B8 0%, #64748B 50%, #334155 100%)'
            }} />
          </div>
        </div>

        {/* Coil State Pills: EM 1 - EM 6 */}
        <div style={{
          width: '100%',
          height: '42px',
          background: '#1E293B',
          borderRadius: '14px',
          border: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 0.5rem',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '64px',
                height: '32px',
                padding: '0 0.5rem',
                borderRadius: '8px',
                background: strength > 0 ? '#0284C7' : '#334155',
                border: `1.5px solid ${strength > 0 ? '#38BDF8' : '#475569'}`,
                boxShadow: strength > 0 ? `0 0 10px rgba(56,189,248,${0.5 + glowA * 0.5})` : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <span style={{
                color: strength > 0 ? '#FFFFFF' : '#94A3B8',
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '0.4px'
              }}>
                EM {i}
              </span>
            </div>
          ))}
        </div>

        {/* Slider Row with Battery Icon, Percentage Badge, and Action Button */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#0F172A', fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.9rem' }}>🔋</span> Electromagnetic Strength
            </span>
            <span style={{
              color: strength > 0 ? '#0284C7' : '#64748B',
              fontWeight: 900,
              fontSize: '1.8rem',
              fontFamily: 'monospace',
              background: '#F0F9FF',
              padding: '0.35rem 1.25rem',
              borderRadius: '12px',
              border: '1.5px solid #BAE6FD'
            }}>
              {strength}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#0284C7',
              cursor: 'pointer',
              height: '12px',
              borderRadius: '6px'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.15rem', flexWrap: 'nowrap', gap: '0.65rem' }}>
            <span style={{ color: '#334155', fontSize: '1.55rem', fontWeight: 800 }}>
              0% (On Track)
            </span>
            <span style={{ color: '#334155', fontSize: '1.55rem', fontWeight: 800 }}>
              50% (Lift-Off)
            </span>
            <button
              onClick={() => {
                if (strength >= 50) {
                  onNext();
                } else {
                  setStrength(prev => Math.min(100, prev + 25));
                }
              }}
              className={strength >= 50 ? 'gold-glow-btn' : ''}
              style={{
                background: strength >= 50 ? undefined : '#0284C7',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                padding: '0.9rem 2rem',
                fontSize: '1.55rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: strength >= 50 ? undefined : '0 4px 14px rgba(2, 132, 199, 0.35)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {strength >= 50 ? 'Next: How Does It Move?' : 'Increase magnetic strength'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 3 — How Does the Train Move? — Continuous Traveling Wave Propulsion (Image 4 Match)
// ══════════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════════
// STEP 3 — How Does the Train Move? — Continuous Traveling Wave Propulsion
// ══════════════════════════════════════════════════════════════════════════════
const PROP_INFO = [
  {
    title: 'Stage 1: Coil 1 ON (Initial Pull Forward)',
    desc: 'Coil 1 turns ON, generating magnetic attraction that pulls the front of the train into forward motion towards Coil 1.',
    activeCoils: [true, false, false, false, false],
    pattern: ['ON', 'OFF', 'OFF', 'OFF', 'OFF'],
    tag: '⚡ STAGE 1: COIL 1 ACTIVE',
    speed: 140,
    flux: '1.45 T',
    frequency: '90 Hz'
  },
  {
    title: 'Stage 2: Overlapping Relay (Coil 2 ON • Coil 1 Hand-Off)',
    desc: 'When the train touches Coil 2, Coil 2 turns ON while Coil 1 remains active to maintain momentum. Only after the hand-off does Coil 1 disengage.',
    activeCoils: [true, true, false, false, false],
    pattern: ['ON', 'ON', 'OFF', 'OFF', 'OFF'],
    tag: '🌊 STAGE 2: OVERLAPPING RELAY',
    speed: 280,
    flux: '1.75 T',
    frequency: '150 Hz'
  },
  {
    title: 'Stage 3: Overlapping Relay (Coil 3 ON • Coil 2 Hand-Off)',
    desc: 'When the train touches Coil 3, Coil 3 turns ON while Coil 2 remains active, sustaining continuous magnetic pull without dead zones.',
    activeCoils: [false, true, true, false, false],
    pattern: ['OFF', 'ON', 'ON', 'OFF', 'OFF'],
    tag: '⚡ STAGE 3: OVERLAPPING RELAY',
    speed: 420,
    flux: '2.10 T',
    frequency: '220 Hz'
  },
  {
    title: 'Stage 4: Overlapping Relay (Coil 4 ON • Coil 3 Hand-Off)',
    desc: 'When the train touches Coil 4, Coil 4 turns ON while Coil 3 remains active, smoothly accelerating the train forward.',
    activeCoils: [false, false, true, true, false],
    pattern: ['OFF', 'OFF', 'ON', 'ON', 'OFF'],
    tag: '⚡ STAGE 4: OVERLAPPING RELAY',
    speed: 480,
    flux: '2.05 T',
    frequency: '240 Hz'
  },
  {
    title: 'Stage 5: Overlapping Relay (Coil 5 ON • Coil 4 Hand-Off)',
    desc: 'When the train touches Coil 5, Coil 5 turns ON while Coil 4 remains active, seamlessly guiding the train across the sector.',
    activeCoils: [false, false, false, true, true],
    pattern: ['OFF', 'OFF', 'OFF', 'ON', 'ON'],
    tag: '🚅 STAGE 5: OVERLAPPING RELAY',
    speed: 510,
    flux: '1.95 T',
    frequency: '260 Hz'
  },
  {
    title: 'Stage 6: Smooth Track Exit (All Coils Standby)',
    desc: 'When the train completely clears Coil 5, Coil 5 turns OFF. The train keeps gliding smoothly across the viaduct.',
    activeCoils: [false, false, false, false, false],
    pattern: ['OFF', 'OFF', 'OFF', 'OFF', 'OFF'],
    tag: '🏁 STAGE 6: RUN COMPLETED',
    speed: 0,
    flux: '0.00 T',
    frequency: '0 Hz'
  }
];

function Step3Move({
  onNext,
  propStep = -1,
  autoPlay = false,
  viewedAll = false,
  isTranslating = false,
  handleNextStep,
  handleToggleAutoPlay,
  handleReset,
  handlePrev,
  onSetPropStep,
  onSetViewedAll
}) {
  const cur = propStep >= 0 ? PROP_INFO[propStep] : null;
  const activeCoils = cur ? cur.activeCoils : [false, false, false, false, false];
  const currentSpeed = cur ? cur.speed : 0;
  const currentFlux = cur ? cur.flux : '0.00 T';

  const trainRef = useRef(null);
  const coilRef0 = useRef(null);
  const coilRef1 = useRef(null);
  const coilRef2 = useRef(null);
  const coilRef3 = useRef(null);
  const coilRef4 = useRef(null);

  const coilRefs = [coilRef0, coilRef1, coilRef2, coilRef3, coilRef4];
  const [liveCoils, setLiveCoils] = useState([false, false, false, false, false]);

  // Overlapping touch-triggered sequential hand-off:
  // When train touches the next coil, next coil turns ON while current coil stays active.
  // After passing the hand-off window, the previous coil turns off.
  useEffect(() => {
    if (!autoPlay || !isTranslating) return;

    let animId;
    const checkCollisions = () => {
      if (trainRef.current && onSetPropStep) {
        const trainRect = trainRef.current.getBoundingClientRect();
        const trainFront = trainRect.right; // Front nose of the forward-moving train

        const r0 = coilRef0.current ? coilRef0.current.getBoundingClientRect() : null;
        const r1 = coilRef1.current ? coilRef1.current.getBoundingClientRect() : null;
        const r2 = coilRef2.current ? coilRef2.current.getBoundingClientRect() : null;
        const r3 = coilRef3.current ? coilRef3.current.getBoundingClientRect() : null;
        const r4 = coilRef4.current ? coilRef4.current.getBoundingClientRect() : null;

        if (r0 && r1 && r2 && r3 && r4) {
          const overlapMargin = 30; // px past entrance where both coils remain active

          if (trainFront < r1.left) {
            // Approaching Coil 1 -> Coil 1 active
            setLiveCoils([true, false, false, false, false]);
            onSetPropStep(0);
          } else if (trainFront >= r1.left && trainFront < r1.right + overlapMargin) {
            // Train touches Coil 2 -> Coil 2 turns ON, Coil 1 REMAINS ON (Overlap!)
            setLiveCoils([true, true, false, false, false]);
            onSetPropStep(1);
          } else if (trainFront >= r1.right + overlapMargin && trainFront < r2.left) {
            // Past Coil 2 hand-off -> Coil 1 OFF, Coil 2 stays ON
            setLiveCoils([false, true, false, false, false]);
            onSetPropStep(1);
          } else if (trainFront >= r2.left && trainFront < r2.right + overlapMargin) {
            // Train touches Coil 3 -> Coil 3 turns ON, Coil 2 REMAINS ON (Overlap!)
            setLiveCoils([false, true, true, false, false]);
            onSetPropStep(2);
          } else if (trainFront >= r2.right + overlapMargin && trainFront < r3.left) {
            // Past Coil 3 hand-off -> Coil 2 OFF, Coil 3 stays ON
            setLiveCoils([false, false, true, false, false]);
            onSetPropStep(2);
          } else if (trainFront >= r3.left && trainFront < r3.right + overlapMargin) {
            // Train touches Coil 4 -> Coil 4 turns ON, Coil 3 REMAINS ON (Overlap!)
            setLiveCoils([false, false, true, true, false]);
            onSetPropStep(3);
          } else if (trainFront >= r3.right + overlapMargin && trainFront < r4.left) {
            // Past Coil 4 hand-off -> Coil 3 OFF, Coil 4 stays ON
            setLiveCoils([false, false, false, true, false]);
            onSetPropStep(3);
          } else if (trainFront >= r4.left && trainFront < r4.right + overlapMargin) {
            // Train touches Coil 5 -> Coil 5 turns ON, Coil 4 REMAINS ON (Overlap!)
            setLiveCoils([false, false, false, true, true]);
            onSetPropStep(4);
          } else if (trainFront >= r4.right + overlapMargin && trainFront < r4.right + 220) {
            // Past Coil 5 hand-off -> Coil 4 OFF, Coil 5 stays ON
            setLiveCoils([false, false, false, false, true]);
            onSetPropStep(4);
          } else if (trainFront >= r4.right + 220) {
            // Train cleared all coils -> All standby
            setLiveCoils([false, false, false, false, false]);
            onSetPropStep(5);
            if (onSetViewedAll) onSetViewedAll(true);
          }
        }
      }
      animId = requestAnimationFrame(checkCollisions);
    };

    animId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animId);
  }, [autoPlay, isTranslating, onSetPropStep, onSetViewedAll]);

  // Realistic horizontal positions aligned with the 5 Stator Coils
  const getTrainLeft = () => {
    if (autoPlay) {
      return isTranslating ? '120%' : '-54%';
    }
    if (propStep === -1) return '-54%';
    if (propStep === 0) return '-45%'; // Front nose approaching Coil 1
    if (propStep === 1) return '-26%'; // Front nose crossing Coil 1, approaching Coil 2
    if (propStep === 2) return '-7%';  // Front nose crossing Coil 2, approaching Coil 3
    if (propStep === 3) return '12%';  // Front nose crossing Coil 3, approaching Coil 4
    if (propStep === 4) return '31%';  // Front nose crossing Coil 4, approaching Coil 5
    if (propStep === 5) return '120%'; // Front nose crossing Coil 5, gliding across viaduct
    return '-54%';
  };

  const getTrainTransition = () => {
    if (autoPlay) {
      return isTranslating ? 'left 10s linear' : 'none';
    }
    return 'left 1.4s cubic-bezier(0.25, 1, 0.5, 1)';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      overflow: 'hidden',
      gap: '0.85rem',
      maxWidth: '100%'
    }}>
      {/* ── 1. PRIMARY INTERACTIVE ACTIVITY AREA (TOP CARD) — EXPANDED TALLER (FLEX 1.9) ── */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(23, 59, 95, 0.08)',
        padding: '0.95rem 1.45rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.65rem',
        flex: '1.9',
        minHeight: 0
      }}>
        {/* Controls Row & Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.55rem',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
            border: '1.5px solid #A5F3FC',
            color: '#0891B2',
            padding: '0.45rem 1.25rem',
            borderRadius: '18px',
            fontSize: '1.05rem',
            fontWeight: 900,
            letterSpacing: '0.4px'
          }}>
            ⚡ ELECTROMAGNETIC PROPULSION SIMULATION
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{
              background: '#F0F9FF',
              border: '1.5px solid #BAE6FD',
              color: '#0284C7',
              padding: '0.4rem 1.1rem',
              borderRadius: '12px',
              fontSize: '1.02rem',
              fontWeight: 900,
              fontFamily: 'monospace'
            }}>
              SPEED: {currentSpeed} km/h • {currentFlux}
            </span>
          </div>
        </div>

        {/* Pristine Clean Alpine Viaduct Canvas with Embedded Linear Stator Coils */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '310px',
          maxHeight: '440px',
          backgroundImage: "url('/FunWithMagnets/maglev_viaduct_clean_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          boxShadow: 'inset 0 2px 14px rgba(0,0,0,0.18), 0 6px 24px rgba(0,0,0,0.08)'
        }}>
          {/* 3-Car Floating Maglev Train Model smoothly gliding across the magnetic track */}
          <div style={{
            position: 'absolute',
            bottom: '22%',
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 10,
            overflow: 'visible',
            pointerEvents: 'none'
          }}>
            <div
              ref={trainRef}
              className="maglev-float-animation"
              style={{
                position: 'absolute',
                left: getTrainLeft(),
                bottom: 0,
                width: 'clamp(600px, 54vw, 900px)',
                transition: getTrainTransition(),
                willChange: 'left',
                display: 'block'
              }}
            >
              <img
                src="/FunWithMagnets/maglev_bullet_3car_floating.png"
                alt="Transrapid 3-Car Maglev Bullet Train"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.48))'
                }}
              />

              {/* Levitation Glow Cushion */}
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '30px',
                right: '30px',
                height: '10px',
                background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.95) 0%, rgba(56,189,248,0) 80%)',
                filter: 'blur(4px)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>

          {/* Exact 5 Interactive Electromagnetic Stator Coils Positioned Visibly Set Over the Track as a Bridge Structure */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '3%',
            right: '3%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 15,
            pointerEvents: 'none'
          }}>
            {[0, 1, 2, 3, 4].map(idx => {
              const isActive = (autoPlay && isTranslating ? liveCoils : activeCoils)[idx];
              return (
                <div
                  key={idx}
                  ref={coilRefs[idx]}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Upper Bridge Structure Gantry Top Rail */}
                  <div style={{
                    width: '100%',
                    height: '3px',
                    borderRadius: '2px',
                    background: isActive 
                      ? 'linear-gradient(90deg, #38BDF8 0%, #FDE047 50%, #38BDF8 100%)' 
                      : 'linear-gradient(90deg, #64748B 0%, #94A3B8 50%, #64748B 100%)',
                    boxShadow: isActive ? '0 0 10px #38BDF8' : 'none',
                    marginBottom: '3px',
                    transition: 'all 0.25s ease'
                  }} />

                  {/* Main Coil Module */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '0.35rem 1.05rem',
                      borderRadius: '10px',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.98) 0%, rgba(3, 105, 161, 0.98) 100%)' 
                        : 'rgba(15, 23, 42, 0.92)',
                      border: isActive ? '1.5px solid #38BDF8' : '1.5px solid rgba(148, 163, 184, 0.45)',
                      boxShadow: isActive 
                        ? 'inset 0 1px 3px rgba(255,255,255,0.4), 0 0 20px rgba(56,189,248,0.95), 0 4px 12px rgba(0,0,0,0.5)' 
                        : 'inset 0 2px 6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {/* Embedded Stator Linear Notch */}
                    <span style={{
                      width: '6px',
                      height: '14px',
                      borderRadius: '2px',
                      background: isActive ? '#FDE047' : '#64748B',
                      boxShadow: isActive ? '0 0 8px #FDE047' : 'none',
                      display: 'inline-block'
                    }} />
                    <span style={{
                      color: isActive ? '#FFFFFF' : '#E2E8F0',
                      fontSize: '0.96rem',
                      fontWeight: 900,
                      letterSpacing: '0.4px'
                    }}>
                      Coil {idx + 1}
                    </span>
                    <span style={{
                      background: isActive ? '#38BDF8' : '#334155',
                      color: isActive ? '#0369A1' : '#94A3B8',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      padding: '0.12rem 0.52rem',
                      borderRadius: '4px'
                    }}>
                      {isActive ? '⚡ ON' : 'OFF'}
                    </span>
                  </div>

                  {/* Structural Vertical Support Legs Anchored Over the Track */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '85%',
                    marginTop: '2px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '10px',
                      background: isActive ? 'linear-gradient(to bottom, #38BDF8, #475569)' : '#475569',
                      borderRadius: '1px'
                    }} />
                    <div style={{
                      width: '4px',
                      height: '10px',
                      background: isActive ? 'linear-gradient(to bottom, #38BDF8, #475569)' : '#475569',
                      borderRadius: '1px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. TWO BOTTOM BOXES (Substantially Enlarged High-Impact Typography) ── */}
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.28fr 1fr',
        gap: '0.85rem',
        alignItems: 'stretch',
        flex: '1',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        {/* LEFT BOX: Interactive Phase Guidance */}
        <div style={{
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '1.5px solid #CBD5E1',
          borderRadius: '22px',
          padding: '1.15rem 1.55rem',
          boxSizing: 'border-box',
          boxShadow: '0 6px 26px rgba(23, 59, 95, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            {propStep < 0 ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', alignItems: 'flex-start' }}
              >
                <div style={{
                  color: '#0284C7',
                  fontWeight: 900,
                  fontSize: 'clamp(1.65rem, 1.95vw, 2.25rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  lineHeight: 1.2
                }}>
                  <span>🔬</span> How Does the Maglev Train Move Forward?
                </div>
                <p style={{ margin: 0, color: '#214A70', fontSize: 'clamp(1.3rem, 1.5vw, 1.65rem)', lineHeight: 1.45, fontWeight: 600 }}>
                  Unlike conventional trains that rely on an engine turning wheels against metal rails, a Maglev train is propelled entirely by <strong style={{ color: '#173B5F', fontWeight: 900 }}>synchronized traveling electromagnetic waves</strong> embedded along the track guideway.
                </p>
                <p style={{ margin: 0, color: '#173B5F', fontSize: 'clamp(1.2rem, 1.4vw, 1.52rem)', lineHeight: 1.4, fontWeight: 700 }}>
                  Click <strong style={{ color: '#0284C7', fontWeight: 900 }}>"Next Step ▶"</strong> or <strong style={{ color: '#D97706', fontWeight: 900 }}>"▶ Auto-play"</strong> to witness each phase of the continuous propulsion cycle!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={propStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
                    border: '1.5px solid #06B6D4',
                    color: '#0891B2',
                    borderRadius: '12px',
                    padding: '0.42rem 1.15rem',
                    fontWeight: 900,
                    fontSize: 'clamp(1.15rem, 1.25vw, 1.38rem)'
                  }}>
                    {propStep === 5 ? 'COMPLETED' : `STEP ${propStep + 1} OF 5`}
                  </span>
                  <span style={{
                    background: '#E2E8F0',
                    border: '1.5px solid #CBD5E1',
                    color: '#173B5F',
                    borderRadius: '12px',
                    padding: '0.42rem 1.15rem',
                    fontWeight: 900,
                    fontSize: 'clamp(1.15rem, 1.25vw, 1.38rem)'
                  }}>
                    {PROP_INFO[propStep]?.tag}
                  </span>
                </div>
                <h3 style={{ margin: 0, color: '#173B5F', fontWeight: 900, fontSize: 'clamp(1.75rem, 2.1vw, 2.35rem)', lineHeight: 1.2 }}>
                  {PROP_INFO[propStep]?.title}
                </h3>
                <p style={{ margin: 0, color: '#214A70', fontSize: 'clamp(1.35rem, 1.55vw, 1.68rem)', lineHeight: 1.45, fontWeight: 600 }}>
                  {PROP_INFO[propStep]?.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT BOX: Light-Yellow Quote Card & Progress Pill */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '22px',
          padding: '1.15rem 1.55rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '0.9rem',
          boxShadow: '0 6px 26px rgba(245, 158, 11, 0.08)',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: 'clamp(2.4rem, 2.8vw, 3.2rem)', lineHeight: 1 }}>💡</span>
            <p style={{
              margin: 0,
              color: '#78350F',
              fontSize: 'clamp(1.4rem, 1.6vw, 1.72rem)',
              lineHeight: 1.45,
              fontWeight: 800
            }}>
              "Instead of an engine pushing against track friction, computer-synchronized electromagnets pull from ahead and push from behind in an ultra-fast traveling magnetic wave."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 4 — Electromagnetic Control — Hero Media & Physics Principles (Image 5 Match)
// ══════════════════════════════════════════════════════════════════════════════
function Step4Control() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: '1.5rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '100%',
      alignItems: 'stretch'
    }}>
      {/* ── LEFT CONTAINER: HERO MEDIA CARD & ELECTROMAGNET COIL TRACK ── */}
      <div style={{
        height: '100%',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        padding: '1.4rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden'
      }}>
        {/* Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.55rem 1.35rem',
            borderRadius: '22px',
            fontSize: '1.45rem',
            fontWeight: 900,
            letterSpacing: '0.5px'
          }}>
            🧬 ELECTROMAGNET OPERATION &amp; CONTROL
          </div>
        </div>

        {/* Responsive Media Containment */}
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#000000',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <img
            src="/FunWithMagnets/maglev_crosssection.jpg"
            alt="Electromagnet coils embedded in track guideway"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
        </div>
      </div>

      {/* ── RIGHT CONTAINER: SCALED TYPOGRAPHY & SCIENCE PRINCIPLES ── */}
      <div 
        className="custom-scrollbar"
        style={{
          height: '100%',
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '1.5px solid #CBD5E1',
          borderRadius: '24px',
          boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
          padding: '1.4rem 1.6rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '0.75rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Title (Single Line) */}
        <h2 style={{
          margin: 0,
          color: '#173B5F',
          fontSize: '2.75rem',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          Why Do We Use Electromagnets?
        </h2>

        {/* Lead description */}
        <p style={{
          margin: 0,
          color: '#214A70',
          fontSize: '1.6rem',
          lineHeight: 1.42,
          fontWeight: 650,
          flexShrink: 0
        }}>
          Unlike permanent magnets, an <strong style={{ color: '#0284C7', fontWeight: 900 }}>electromagnet's magnetic force can be switched ON and OFF instantly</strong> — and even reversed in milliseconds — simply by regulating the electric current flowing through its coils.
        </p>

        {/* 4 Key Advantages List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexShrink: 0 }}>
          <div style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.65rem', letterSpacing: '-0.01em' }}>
            ✨ Key Advantages of Electromagnets:
          </div>
          {[
            { icon: '⚡', title: 'Instant ON / OFF Switching', desc: 'Energize or de-energize the magnetic field at lightning speed.' },
            { icon: '🔄', title: 'Reversible Polarity (N ↔ S)', desc: 'Swap North and South poles instantly by reversing current direction.' },
            { icon: '📊', title: 'Variable Force Control', desc: 'Precisely modulate magnetic strength by adjusting voltage and amperage.' },
            { icon: '🎯', title: 'Computer Synchronization', desc: 'Coordinate thousands of track coils simultaneously for seamless train levitation and glide.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.1rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: '1.5px solid #E2E8F0',
              borderRadius: '16px',
              padding: '0.95rem 1.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <span style={{
                fontSize: '2.1rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.65rem',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                flexShrink: 0
              }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#173B5F', fontWeight: 900, fontSize: '1.55rem', letterSpacing: '-0.01em' }}>{item.title}</span>
                <span style={{ color: '#214A70', fontWeight: 600, fontSize: '1.36rem', lineHeight: 1.38 }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function FunWithMagnets({ onBackToDashboard, onComplete }) {
  const { theme } = useTheme();

  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [ext, setExt] = useState({});
  const [showMazeSolveModal, setShowMazeSolveModal] = useState(false);
  const [showFinalCompletionModal, setShowFinalCompletionModal] = useState(false);
  const [predictAns, setPredictAns] = useState(null);

  // Step 3 Propulsion Simulation State & Auto-play Engine
  const [propStep, setPropStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [viewedAll, setViewedAll] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const autoPlaySeqRef = useRef(0);

  useEffect(() => {
    if (!autoPlay) {
      setIsTranslating(false);
      return;
    }

    let isMounted = true;
    autoPlaySeqRef.current += 1;
    const currentSeqId = autoPlaySeqRef.current;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const executeAutoPlay = async () => {
      while (isMounted && autoPlaySeqRef.current === currentSeqId) {
        // Step 0: Immediately activate Coil 1 and initiate smooth train movement
        setPropStep(0);
        setIsTranslating(true);

        // Train glides smoothly across the 5 coils for 10s (exact touch-triggered sequential hand-offs occur in real-time as the front crosses each coil box)
        await sleep(10000);
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Reset train back to start seamlessly for next loop iteration
        setIsTranslating(false);
        setPropStep(0);
        await sleep(150);
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;
      }
    };

    executeAutoPlay();

    return () => {
      isMounted = false;
    };
  }, [autoPlay]);

  const handleStep3Prev = (e) => {
    e?.stopPropagation();
    setAutoPlay(false);
    setIsTranslating(false);
    setPropStep(p => Math.max(-1, p - 1));
  };

  const handleStep3NextStep = (e) => {
    e?.stopPropagation();
    setAutoPlay(false);
    setIsTranslating(false);
    setPropStep(prev => {
      const next = Math.min(prev + 1, 5);
      if (next >= 4) setViewedAll(true);
      return next;
    });
  };

  const handleStep3ToggleAutoPlay = (e) => {
    e?.stopPropagation();
    setAutoPlay(prev => {
      const next = !prev;
      if (next) {
        setPropStep(0);
        setIsTranslating(true);
      } else {
        setIsTranslating(false);
      }
      return next;
    });
  };

  const handleStep3Reset = (e) => {
    e?.stopPropagation();
    setAutoPlay(false);
    setIsTranslating(false);
    setPropStep(-1);
  };

  const [mazeVisitedCount, setMazeVisitedCount] = useState({ count: 1, total: 14 });
  const [currentNodeId, setCurrentNodeId] = useState('node_0_0');
  const [isMoving, setIsMoving] = useState(false);
  const [hintDir, setHintDir] = useState(null);
  const [qHard, setQHard] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mazeResetRef = useRef(null);
  const mazeDirectionMoveRef = useRef(null);
  const mazeHintRef = useRef(null);

  const addXP = (n) => setXp(prev => prev + n);
  const go = (i) => setStep(i);

  const handleMazeSolve = useCallback(() => {
    setExt(prev => ({ ...prev, maze: true }));
    setXp(prev => prev + 200);
    setShowMazeSolveModal(true);
  }, []);

  const handleVisitedCountChange = useCallback((count, total) => {
    setMazeVisitedCount({ count, total });
  }, []);

  const handleNodeChange = useCallback((nodeId, moving) => {
    setCurrentNodeId(nodeId);
    setIsMoving(moving);
  }, []);

  const handleRegisterReset = useCallback((fn) => { mazeResetRef.current = fn; }, []);
  const handleRegisterDirectionMove = useCallback((fn) => { mazeDirectionMoveRef.current = fn; }, []);
  const handleRegisterHint = useCallback((fn) => { mazeHintRef.current = fn; }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      maxHeight: '100vh', 
      margin: '0 auto',
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: step === 0 ? '0' : '1.1rem 1.4rem',
      backgroundImage: step === 0 ? 'none' : "url('/SuspendedMagnet/science_lab_bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>

      {/* ── Main Content — Full Display Viewport ── */}
      <main style={{
        width: '100%', flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'row', overflow: 'hidden',
        position: 'relative', zIndex: 1
      }}>
        {/* STEP 0 — Cinematic Intro Question */}
        {step === 0 && <Step0Intro onNext={() => go(1)} onBack={onBackToDashboard} />}

        {/* STEP 1 — Maglev Concept: Attraction & Repulsion */}
        {step === 1 && <Step1Maglev />}

        {/* STEP 2 — How Does It Float: Levitation Slider */}
        {step === 2 && <Step2Float onNext={() => go(3)} />}

        {/* STEP 3 — How Does It Move: Propulsion Sequence */}
        {step === 3 && (
          <Step3Move
            onNext={() => go(4)}
            propStep={propStep}
            autoPlay={autoPlay}
            viewedAll={viewedAll}
            isTranslating={isTranslating}
            handleNextStep={handleStep3NextStep}
            handleToggleAutoPlay={handleStep3ToggleAutoPlay}
            handleReset={handleStep3Reset}
            handlePrev={handleStep3Prev}
            onSetPropStep={setPropStep}
            onSetViewedAll={setViewedAll}
          />
        )}

        {/* STEP 4 — Electromagnetic Control: ON/OFF Video Demo (Routes to Expedition) */}
        {step === 4 && <Step4Control />}

        {/* STEP 5 — Magnetic Town Expedition (MazeGame) */}
        {step === 5 && (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* Left Activity Area: Flexible Width */}
            <div style={{
              flex: '1 1 0%',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              boxSizing: 'border-box',
              padding: '0'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid #A7F3D0',
                boxShadow: '0 12px 35px rgba(6,78,59,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0F172A'
              }}>
                <MazeGame
                  onSolve={handleMazeSolve}
                  isSolved={ext.maze}
                  onVisitedCountChange={handleVisitedCountChange}
                  onNodeChange={handleNodeChange}
                  hintDir={hintDir}
                  registerReset={handleRegisterReset}
                  registerDirectionMove={handleRegisterDirectionMove}
                  registerHint={handleRegisterHint}
                />

                {/* Maze Solved Modal */}
                <AnimatePresence>
                  {showMazeSolveModal && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(6, 78, 59, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        style={{ 
                          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
                          borderRadius: '28px', 
                          padding: '2.8rem 3.5rem', 
                          maxWidth: '640px', 
                          width: '90%',
                          textAlign: 'center', 
                          border: '2px solid #E2E8F0', 
                          boxShadow: '0 20px 50px rgba(217, 119, 6, 0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1.5rem'
                        }}
                      >
                        <h2 style={{ margin: 0, color: '#064E3B', fontSize: '2.5rem', fontWeight: 900 }}>Destination Reached! 🎯🎉</h2>
                        <p style={{ margin: 0, color: '#334155', fontSize: '1.65rem', lineHeight: '1.55', fontWeight: 700 }}>
                          Outstanding navigation! The magnet smoothly guided the train across the 3D railway grid to the destination beacon!
                        </p>
                        <button 
                          onClick={() => {
                            setShowMazeSolveModal(false);
                            go(6);
                          }}
                          className="gold-glow-btn"
                          style={{
                            padding: '1.15rem 3.2rem',
                            fontSize: '1.45rem',
                            fontWeight: 900,
                            borderRadius: '40px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }}
                        >
                          Next: Magnet Care <ArrowRight size={24} color="#FFFFFF" />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Control Area: Clean 350px Width, Fully Contained without Clipping */}
            <div style={{ 
              flex: '0 0 350px', 
              width: '350px',
              maxWidth: '350px',
              background: 'transparent', 
              border: 'none', 
              borderRadius: '24px', 
              padding: '0.1rem 0', 
              boxShadow: 'none', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              alignItems: 'stretch',
              minWidth: 0,
              height: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
              gap: '0.5rem'
            }}>
              {/* 1. Sleek Compact Instruction Guide Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid #FFFFFF',
                borderRadius: '20px',
                padding: '0.85rem 1.15rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                width: '100%',
                maxWidth: '440px',
                boxSizing: 'border-box',
                flexShrink: 0
              }}>
                {/* Prominent Scaled Highlight Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%)',
                  border: '1.5px solid #6EE7B7',
                  borderRadius: '14px',
                  padding: '0.65rem 0.85rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(6, 95, 70, 0.08)'
                }}>
                  <div style={{
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    color: '#065F46',
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em'
                  }}>
                    Magnetic train can move without touching the tracks!
                  </div>
                </div>

                {/* Concise 3-Line How-To-Play Guide (Dark Blue & Numbered List) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '1.45rem', fontWeight: 800, color: '#0C2340', lineHeight: '1.3' }}>
                    <span style={{ color: '#0C2340', fontWeight: 900, minWidth: '22px' }}>1.</span>
                    <span>Use the D-PAD HUD or keyboard arrows to steer.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '1.45rem', fontWeight: 800, color: '#0C2340', lineHeight: '1.3' }}>
                    <span style={{ color: '#0C2340', fontWeight: 900, minWidth: '22px' }}>2.</span>
                    <span>Magnetic coils pull the train smoothly from node to node.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '1.45rem', fontWeight: 800, color: '#0C2340', lineHeight: '1.3' }}>
                    <span style={{ color: '#0C2340', fontWeight: 900, minWidth: '22px' }}>3.</span>
                    <span>Reach the Destination Goal beacon to complete the expedition!</span>
                  </div>
                </div>
              </div>

              {/* 2. Compact D-Pad HUD */}
              {(() => {
                const availableDirs = getAvailableDirections(currentNodeId);
                const currentStationName = NODES_MAP[currentNodeId]?.shortName || 'Start';
                return (
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.5px solid #FFFFFF', 
                    borderRadius: '20px', 
                    padding: '0.85rem 1.15rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.65rem',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                    width: '100%',
                    maxWidth: '420px',
                    boxSizing: 'border-box',
                    flexShrink: 0
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #E2E8F0', paddingBottom: '0.45rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#173B5F', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        <Compass size={18} color="#173B5F" />
                        <span>D-PAD HUD CONTROLS</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#173B5F', fontWeight: 900, background: '#EAF2F6', padding: '2px 8px', borderRadius: '10px', border: '1.5px solid #E2E8F0' }}>
                        {currentStationName}
                      </div>
                    </div>

                    {/* 3x3 D-Pad Buttons Matrix */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 54px)',
                      gridTemplateRows: 'repeat(3, 54px)',
                      gap: '7px',
                      margin: '0.1rem auto',
                      justifyContent: 'center',
                      opacity: isMoving ? 0.6 : 1
                    }}>
                      {/* NORTH */}
                      <button
                        type="button"
                        disabled={isMoving || !availableDirs['N']}
                        onClick={() => {
                          playElectricLightningSound();
                          if (mazeDirectionMoveRef.current) mazeDirectionMoveRef.current('up');
                        }}
                        style={{
                          gridColumn: 2,
                          background: availableDirs['N'] ? '#FFFFFF' : '#EAF2F6',
                          color: availableDirs['N'] ? '#173B5F' : '#D1D5DB',
                          border: `2px solid ${hintDir === 'N' ? '#214A70' : (availableDirs['N'] ? '#214A70' : '#E5E7EB')}`,
                          borderRadius: '14px',
                          fontSize: '13px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['N']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'N' ? '0 0 14px #214A70' : (availableDirs['N'] ? '0 3px 8px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▲</span>
                        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '2px' }}>N</span>
                      </button>

                      {/* WEST */}
                      <button
                        type="button"
                        disabled={isMoving || !availableDirs['W']}
                        onClick={() => {
                          playElectricLightningSound();
                          if (mazeDirectionMoveRef.current) mazeDirectionMoveRef.current('left');
                        }}
                        style={{
                          gridColumn: 1,
                          gridRow: 2,
                          background: availableDirs['W'] ? '#FFFFFF' : '#EAF2F6',
                          color: availableDirs['W'] ? '#173B5F' : '#D1D5DB',
                          border: `2px solid ${hintDir === 'W' ? '#214A70' : (availableDirs['W'] ? '#214A70' : '#E5E7EB')}`,
                          borderRadius: '14px',
                          fontSize: '13px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['W']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'W' ? '0 0 14px #214A70' : (availableDirs['W'] ? '0 3px 8px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>◀</span>
                        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '2px' }}>W</span>
                      </button>

                      {/* CENTER STATION BADGE */}
                      <div style={{
                        gridColumn: 2,
                        gridRow: 2,
                        background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                        borderRadius: '14px',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '10.5px',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textAlign: 'center',
                        padding: '2px',
                        boxShadow: '0 3px 8px rgba(217, 119, 6, 0.35)'
                      }}>
                        {currentStationName}
                      </div>

                      {/* EAST */}
                      <button
                        type="button"
                        disabled={isMoving || !availableDirs['E']}
                        onClick={() => {
                          playElectricLightningSound();
                          if (mazeDirectionMoveRef.current) mazeDirectionMoveRef.current('right');
                        }}
                        style={{
                          gridColumn: 3,
                          gridRow: 2,
                          background: availableDirs['E'] ? '#FFFFFF' : '#EAF2F6',
                          color: availableDirs['E'] ? '#173B5F' : '#D1D5DB',
                          border: `2px solid ${hintDir === 'E' ? '#214A70' : (availableDirs['E'] ? '#214A70' : '#E5E7EB')}`,
                          borderRadius: '14px',
                          fontSize: '13px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['E']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'E' ? '0 0 14px #214A70' : (availableDirs['E'] ? '0 3px 8px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▶</span>
                        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '2px' }}>E</span>
                      </button>

                      {/* SOUTH */}
                      <button
                        type="button"
                        disabled={isMoving || !availableDirs['S']}
                        onClick={() => {
                          playElectricLightningSound();
                          if (mazeDirectionMoveRef.current) mazeDirectionMoveRef.current('down');
                        }}
                        style={{
                          gridColumn: 2,
                          gridRow: 3,
                          background: availableDirs['S'] ? '#FFFFFF' : '#EAF2F6',
                          color: availableDirs['S'] ? '#173B5F' : '#D1D5DB',
                          border: `2px solid ${hintDir === 'S' ? '#214A70' : (availableDirs['S'] ? '#214A70' : '#E5E7EB')}`,
                          borderRadius: '14px',
                          fontSize: '13px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['S']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'S' ? '0 0 14px #214A70' : (availableDirs['S'] ? '0 3px 8px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▼</span>
                        <span style={{ fontSize: '12px', lineHeight: 1, marginTop: '2px' }}>S</span>
                      </button>
                    </div>

                    {/* Action Button: Reset */}
                    <button
                      type="button"
                      onClick={() => {
                        if (mazeResetRef.current) mazeResetRef.current();
                        setHintDir(null);
                      }}
                      disabled={isMoving}
                      style={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1.5px solid #E2E8F0',
                        padding: '7px 12px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        color: '#173B5F',
                        fontWeight: 900,
                        cursor: isMoving ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(217, 119, 6, 0.08)'
                      }}
                    >
                      <RotateCcw size={15} /> Reset Expedition
                    </button>

                    {/* Proceed Button */}
                    <button
                      onClick={() => go(6)}
                      disabled={!ext.maze}
                      className={ext.maze ? "gold-glow-btn" : ""}
                      style={{ 
                        width: '100%', 
                        padding: '0.85rem 1.4rem', 
                        fontSize: '1.05rem', 
                        fontWeight: 900, 
                        borderRadius: '14px', 
                        background: ext.maze ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#F1F5F9', 
                        color: ext.maze ? '#FFFFFF' : '#94A3B8', 
                        border: ext.maze ? '1.5px solid rgba(254, 240, 138, 0.85)' : '1.5px solid #E2E8F0', 
                        cursor: ext.maze ? 'pointer' : 'not-allowed', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.6rem',
                        boxShadow: ext.maze ? '0 4px 16px rgba(217, 119, 6, 0.4)' : 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      Proceed to Magnet Care <ArrowRight size={18} color={ext.maze ? '#FFFFFF' : '#94A3B8'} />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* STEP 6 — Magnet Care & Assessment */}
        {step === 6 && (
          <Quiz onComplete={() => go(7)} />
        )}

      {/* STEP 7: DID YOU KNOW */}
      {step === 7 && (
        <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
          <DidYouKnow />
        </div>
      )}
      </main>

      {/* ── Bottom Footer Navigation — ACROSS ALL NON-INTRO PAGES (step > 0) ── */}
      {step > 0 && (
        <footer style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.75rem',
          marginTop: '0.75rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid #FFFFFF',
          borderRadius: '32px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          flexShrink: 0,
          zIndex: 100,
          maxWidth: '98%',
          margin: '0.75rem auto 0 auto',
          width: '100%',
          boxSizing: 'border-box',
          gap: '1rem'
        }}>
          {/* Back Button on Left */}
          <button
            onClick={() => go(step - 1)}
            className="navy-btn"
            style={{
              padding: '0.65rem 1.8rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
              color: '#FFFFFF',
              border: '1.5px solid #2B6CB0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              boxShadow: '0 4px 14px rgba(23, 59, 95, 0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <ArrowLeft size={20} color="#FFFFFF" /> Back
          </button>

          {/* Central Progress indicator - Step Badge only without heading names */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            fontWeight: 900,
            flexShrink: 0
          }}>
            <span style={{
              background: '#ECFDF5',
              padding: '0.35rem 1.25rem',
              borderRadius: '16px',
              border: '1.5px solid #A7F3D0',
              color: '#065F46',
              boxShadow: '0 2px 6px rgba(6, 95, 70, 0.08)'
            }}>
              Step {step} of {STEPS_NAV.length - 1}
            </span>
          </div>

          {/* Centered-Right Simulation Control Buttons for Step 3 */}
          {step === 3 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginLeft: 'auto',
              flexShrink: 0
            }}>
              {/* Next Step Button */}
              <button
                onClick={handleStep3NextStep}
                disabled={propStep >= 5}
                className={propStep < 5 ? "gold-glow-btn" : ""}
                style={{
                  padding: '0.65rem 1.55rem',
                  borderRadius: '20px',
                  background: propStep < 5 ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : '#F1F5F9',
                  color: propStep < 5 ? '#FFFFFF' : '#94A3B8',
                  border: propStep < 5 ? '1.5px solid #38BDF8' : '1.5px solid #CBD5E1',
                  fontWeight: 900,
                  fontSize: '1.02rem',
                  cursor: propStep >= 5 ? 'not-allowed' : 'pointer',
                  boxShadow: propStep < 5 ? '0 4px 14px rgba(2,132,199,0.35)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                Next Step ▶
              </button>

              {/* Auto-play Button */}
              <button
                onClick={handleStep3ToggleAutoPlay}
                className="gold-glow-btn"
                style={{
                  padding: '0.65rem 1.55rem',
                  borderRadius: '20px',
                  border: autoPlay ? '1.5px solid #F59E0B' : '1.5px solid #FDE68A',
                  background: autoPlay ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  color: autoPlay ? '#FFFFFF' : '#92400E',
                  fontWeight: 900,
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  boxShadow: autoPlay ? '0 0 16px rgba(245,158,11,0.5)' : '0 4px 14px rgba(245,158,11,0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                {autoPlay ? '⏸ Pause' : '▶ Auto-play'}
              </button>

              {/* Reset Button */}
              <button
                onClick={handleStep3Reset}
                className="navy-btn"
                style={{
                  padding: '0.65rem 1.35rem',
                  borderRadius: '20px',
                  border: '1.5px solid #2B6CB0',
                  background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.02rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(23, 59, 95, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                ↺ Reset
              </button>

              {/* Next Button to Step 4 */}
              <button
                onClick={() => go(4)}
                disabled={!viewedAll}
                className={viewedAll ? "gold-glow-btn" : ""}
                style={{
                  padding: '0.65rem 2rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  borderRadius: '25px',
                  background: viewedAll ? undefined : '#E2E8F0',
                  color: viewedAll ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  cursor: viewedAll ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: viewedAll ? undefined : 'none',
                  transition: 'all 0.2s ease',
                  marginLeft: '0.4rem'
                }}
              >
                Next <ArrowRight size={20} color={viewedAll ? "#FFFFFF" : "#94A3B8"} />
              </button>
            </div>
          ) : (
            /* Next Button on Right for other steps */
            <button
              onClick={() => {
                if (step < STEPS_NAV.length - 1) {
                  go(step + 1);
                } else if (onComplete) {
                  onComplete();
                } else if (onBackToDashboard) {
                  onBackToDashboard();
                }
              }}
              className="gold-glow-btn"
              style={{
                padding: '0.65rem 2rem',
                fontSize: '1.05rem',
                fontWeight: 900,
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                flexShrink: 0
              }}
            >
              {step === STEPS_NAV.length - 1 ? 'Finish Activity' : 'Next'} <ArrowRight size={20} color="#FFFFFF" />
            </button>
          )}
        </footer>
      )}
    </div>
  );
}
