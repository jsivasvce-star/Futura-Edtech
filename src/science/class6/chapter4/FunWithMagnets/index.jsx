import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, Compass, CheckCircle2, XCircle, ArrowRight,
  Sparkles, Maximize2, Minimize2, RotateCcw, Zap, ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FunWithMagnets.css';
import MazeGame, { getAvailableDirections, NODES_MAP, playElectricLightningSound } from './MazeGame';
import DidYouKnow from './DidYouKnow';
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
// STEP 0 — Can a Train Float? — Cinematic Intro Question
// ══════════════════════════════════════════════════════════════════════════════
function Step0Intro({ onNext, onBack }) {
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (val) => {
    setAnswer(val);
    setTimeout(() => onNext(), 1100);
  };

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
      padding: '1.5rem 3.5rem', boxSizing: 'border-box'
    }}>
      {/* Content: Fully transparent container for the question */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          padding: '1rem 0',
          maxWidth: '780px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Badge — Solid White Text */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          background: 'rgba(6, 182, 212, 0.5)', border: '2px solid rgba(255, 255, 255, 0.75)',
          color: '#FFFFFF', padding: '0.55rem 1.25rem', borderRadius: '24px',
          fontSize: '1.05rem', fontWeight: 900, letterSpacing: '0.8px', width: 'fit-content',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
        }}>
          ⚡ ACTIVITY 4.9 · FUN WITH MAGNETS · MAGLEV TRAIN
        </div>

        <h1 style={{
          margin: 0, fontSize: '3rem', fontWeight: 900,
          color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.025em',
          textShadow: '0 3px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.9)'
        }}>
          Can a train move without its wheels touching the track?
        </h1>

        {/* Answer buttons in default interactive styling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.35rem' }}>
          {[
            {
              val: 'yes',
              label: '✅ Yes — magnetic forces make it possible!',
              border: '#34D399',
              selectedBg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(16, 185, 129, 0.95) 100%)'
            },
            {
              val: 'no',
              label: '❌ No — trains must have wheels touching the track',
              border: '#F87171',
              selectedBg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.85) 0%, rgba(239, 68, 68, 0.95) 100%)'
            },
            {
              val: 'discover',
              label: "🚀 Let's Discover Together!",
              border: '#FDE68A',
              selectedBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              large: true
            },
          ].map(btn => (
            <motion.button
              key={btn.val}
              whileHover={{ scale: 1.025, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(btn.val)}
              style={{
                padding: btn.large ? '1.25rem 1.8rem' : '1.05rem 1.6rem',
                borderRadius: '18px',
                border: `2px solid ${answer === btn.val ? btn.border : 'rgba(255,255,255,0.25)'}`,
                background: answer === btn.val ? btn.selectedBg : 'rgba(15, 23, 42, 0.58)',
                color: '#FFFFFF',
                fontSize: btn.large ? '1.25rem' : '1.15rem',
                fontWeight: 900,
                cursor: 'pointer',
                textAlign: 'left',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.25s ease',
                boxShadow: answer === btn.val ? `0 0 22px ${btn.border}88` : '0 4px 14px rgba(0,0,0,0.25)',
                textShadow: '0 1px 4px rgba(0,0,0,0.35)'
              }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: '#FFFFFF', fontWeight: 900, fontSize: '1.15rem',
                padding: '1rem 1.4rem',
                background: 'rgba(6,182,212,0.45)',
                border: '2px solid rgba(103,232,249,0.85)',
                borderRadius: '16px', backdropFilter: 'blur(14px)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                textShadow: '0 1px 6px rgba(0,0,0,0.4)'
              }}
            >
              {answer === 'yes'
                ? "🎉 Exactly right! Now let's explore HOW magnetic forces achieve this!"
                : answer === 'no'
                ? "🤔 Surprising but true — Maglev trains really do float! Let's find out how →"
                : "🚀 Perfect! Let's dive into the incredible science of Maglev trains!"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Navigation Buttons (Back & Next) */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', left: '2.5rem', right: '2.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 50, pointerEvents: 'none'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          style={{
            pointerEvents: 'auto',
            padding: '0.95rem 2rem',
            fontSize: '1.15rem',
            fontWeight: 900,
            borderRadius: '35px',
            background: 'rgba(15, 23, 42, 0.75)',
            color: '#FFFFFF',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={22} color="#FFFFFF" /> Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          style={{
            pointerEvents: 'auto',
            padding: '0.95rem 2.4rem',
            fontSize: '1.15rem',
            fontWeight: 900,
            borderRadius: '35px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#FFFFFF',
            border: '2px solid #FDE68A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          Next <ArrowRight size={22} color="#FFFFFF" />
        </motion.button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — What is a Maglev Train? — Video Player & Physics Overview
// ══════════════════════════════════════════════════════════════════════════════
function Step1Maglev() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: '1.25rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '98%',
      margin: '0 auto'
    }}>
      {/* ── LEFT CONTAINER: CLEAN WHITE CARD & EMBEDDED MAGLEV VIDEO ── */}
      <div style={{
        flex: '1.1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.35rem',
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
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.5rem 1.2rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 900,
            letterSpacing: '0.6px'
          }}>
            🎥 HIGH-SPEED MAGLEV IN MOTION
          </div>
        </div>

        {/* Responsive Video Containment */}
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1.5px solid #CBD5E1',
          background: '#0F172A',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
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

      {/* ── RIGHT CONTAINER: SCALED TYPOGRAPHY & SCIENCE PRINCIPLES (NO SCROLLING) ── */}
      <div style={{
        flex: '1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.15rem 1.45rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.65rem',
        overflow: 'hidden'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          border: '1.5px solid #A7F3D0',
          color: '#065F46',
          padding: '0.35rem 1rem',
          borderRadius: '20px',
          fontSize: '1.05rem',
          fontWeight: 900,
          letterSpacing: '0.6px',
          width: 'fit-content',
          flexShrink: 0
        }}>
          🚅 MAGLEV = MAGNETIC LEVITATION
        </div>

        {/* Main Title */}
        <h2 style={{
          margin: 0,
          color: '#0F172A',
          fontSize: '2.5rem',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          flexShrink: 0
        }}>
          What is a Maglev Train?
        </h2>

        {/* Lead Paragraph */}
        <p style={{
          margin: 0,
          color: '#334155',
          fontSize: '1.45rem',
          lineHeight: 1.4,
          fontWeight: 600,
          flexShrink: 0
        }}>
          A <strong style={{ color: '#0284C7', fontWeight: 900 }}>Maglev train</strong> (Magnetic Levitation) uses synchronized electromagnetic forces rather than mechanical wheels. It lifts off the track and glides through the air frictionless!
        </p>

        {/* Attraction Card */}
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #BBF7D0',
          borderRadius: '16px',
          padding: '0.85rem 1.15rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#15803D', fontWeight: 900, fontSize: '1.45rem' }}>
              🔵 1. Magnetic Attraction (Opposite Poles)
            </span>
            <span style={{
              color: '#166534',
              fontWeight: 900,
              fontSize: '1.2rem',
              fontFamily: 'monospace',
              background: '#DCFCE7',
              padding: '0.2rem 0.6rem',
              borderRadius: '8px',
              border: '1px solid #86EFAC'
            }}>
              N ↔ S
            </span>
          </div>
          <p style={{ margin: 0, color: '#334155', fontSize: '1.35rem', lineHeight: 1.35, fontWeight: 600 }}>
            When <strong>opposite magnetic poles</strong> face each other, they attract with powerful pulling force. This force pulls the Maglev train forward down the line.
          </p>
        </div>

        {/* Repulsion Card */}
        <div style={{
          background: '#FEF2F2',
          border: '1.5px solid #FECACA',
          borderRadius: '16px',
          padding: '0.85rem 1.15rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#B91C1C', fontWeight: 900, fontSize: '1.45rem' }}>
              🔴 2. Magnetic Repulsion (Like Poles)
            </span>
            <span style={{
              color: '#991B1B',
              fontWeight: 900,
              fontSize: '1.2rem',
              fontFamily: 'monospace',
              background: '#FEE2E2',
              padding: '0.2rem 0.6rem',
              borderRadius: '8px',
              border: '1px solid #FCA5A5'
            }}>
              N ↔ N / S ↔ S
            </span>
          </div>
          <p style={{ margin: 0, color: '#334155', fontSize: '1.35rem', lineHeight: 1.35, fontWeight: 600 }}>
            When <strong>like magnetic poles</strong> face each other, they push forcefully apart. This upward repulsion force lifts the heavy train completely off the track!
          </p>
        </div>

        {/* Bottom Insight Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '16px',
          padding: '0.85rem 1.15rem',
          flexShrink: 0
        }}>
          <p style={{ margin: 0, color: '#78350F', fontSize: '1.35rem', lineHeight: 1.35, fontWeight: 700 }}>
            💡 <strong>Zero Track Contact:</strong> Without wheel friction or engine drag, Maglev trains operate silently and glide smoothly at speeds over 500 km/h!
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — How Does the Train Float? — Levitation Physics Slider
// ══════════════════════════════════════════════════════════════════════════════
function Step2Float() {
  const [strength, setStrength] = useState(8);

  // Maximum lift of ~20px provides a clear levitation gap while keeping train fully visible
  const liftPx = Math.round((strength / 100) * 20);
  const gapMm = Math.round(strength / 10);
  const magneticForce = (strength / 100 * 9.8).toFixed(1);
  const glowA = strength / 100;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: '1.25rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '96%',
      margin: '0 auto',
      padding: '0.15rem 0'
    }}>
      {/* ── LEFT CONTAINER: CLEAN WHITE CARD, REAL SCI-LEV PLATFORM PHOTO + EXPANDED TYPOGRAPHY CARDS ── */}
      <div style={{
        flex: '1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.2rem 1.35rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        overflowY: 'auto'
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
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 900,
            letterSpacing: '0.6px'
          }}>
            📐 MAGLEV LEVITATION PRINCIPLE
          </div>
        </div>

        {/* Full-width Image spanning upper section cleanly */}
        <div style={{
          width: '100%',
          height: '245px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1.5px solid #CBD5E1',
          background: '#F1F5F9',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <img
            src="/FunWithMagnets/scilev_real_platform.jpg"
            alt="SCI-Lev Transrapid Maglev real station platform"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block'
            }}
          />
        </div>

        {/* 4 Indicator Containers: Scaled-up Typography (24px titles, 20px descriptions) & Full-height space utilization */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          width: '100%',
          flex: 1,
          marginTop: 'auto'
        }}>
          {/* Card 1: Electric Current Flows */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#F0F9FF',
                padding: '0.3rem 0.6rem',
                borderRadius: '10px',
                border: '1px solid #BAE6FD'
              }}>⚡</span>
              <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '28px' }}>
                Electric Current Flows
              </span>
            </div>
            <p style={{ margin: 0, color: '#334155', fontSize: '22px', lineHeight: 1.38, fontWeight: 600 }}>
              Electricity runs through copper coils embedded in the track guideway.
            </p>
          </div>

          {/* Card 2: Magnetic Field Appears */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#ECFEFF',
                padding: '0.3rem 0.6rem',
                borderRadius: '10px',
                border: '1px solid #A5F3FC'
              }}>🔵</span>
              <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '28px' }}>
                Magnetic Field Appears
              </span>
            </div>
            <p style={{ margin: 0, color: '#334155', fontSize: '22px', lineHeight: 1.38, fontWeight: 600 }}>
              The electric coils generate a powerful upward-pointing magnetic field.
            </p>
          </div>

          {/* Card 3: Train Lifts Off */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#F0FDF4',
                padding: '0.3rem 0.6rem',
                borderRadius: '10px',
                border: '1px solid #BBF7D0'
              }}>🚅</span>
              <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '28px' }}>
                Train Lifts Off
              </span>
            </div>
            <p style={{ margin: 0, color: '#334155', fontSize: '22px', lineHeight: 1.38, fontWeight: 600 }}>
              The magnetic field repels the train's superconducting magnets, lifting it up.
            </p>
          </div>

          {/* Card 4: Gap is Precisely Controlled */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{
                fontSize: '1.85rem',
                background: '#FFFBEB',
                padding: '0.3rem 0.6rem',
                borderRadius: '10px',
                border: '1px solid #FDE68A'
              }}>📐</span>
              <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '28px' }}>
                Gap is Precisely Controlled
              </span>
            </div>
            <p style={{ margin: 0, color: '#334155', fontSize: '22px', lineHeight: 1.38, fontWeight: 600 }}>
              Sensors adjust current continuously to maintain a stable 10mm levitation gap.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT CONTAINER: SCALED TYPOGRAPHY, ENLARGED TRAIN & TRACK MODELS + FORCE BALANCE ── */}
      <div style={{
        flex: '1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.35rem 1.6rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.75rem',
        overflowY: 'auto'
      }}>
        {/* Top Explanation Heading & Scaled Body Copy expanding downwards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
          <h2 style={{
            margin: 0,
            color: '#0F172A',
            fontSize: '3.1rem',
            fontWeight: 900,
            lineHeight: 1.18,
            letterSpacing: '-0.025em'
          }}>
            How Does the Train Float?
          </h2>
          <p style={{
            margin: 0,
            color: '#334155',
            fontSize: '2.25rem',
            lineHeight: 1.48,
            fontWeight: 600
          }}>
            Electromagnetic coils are embedded in the guideway track below the train. When electric current flows through them, they create a powerful upward magnetic force that lifts the train.
          </p>
        </div>

        {/* Train & Levitation Zone */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '2px'
        }}>
              {/* Prominent High-Speed Maglev Train Model with Visible Levitation Uplift */}
              <motion.div
                animate={{ y: -liftPx }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                style={{
                  position: 'relative',
                  zIndex: 4,
                  width: '96%',
                  maxWidth: '560px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src="/FunWithMagnets/transrapid_train_clean.png"
                  alt="Transrapid Maglev Bullet Train"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.3))'
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
                {/* Glowing magnetic cushion aura when active */}
                {strength > 0 && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.55) 0%, rgba(14,165,233,0) 80%)',
                    filter: 'blur(5px)',
                    opacity: 0.4 + glowA * 0.6
                  }} />
                )}

                {/* Pulsating upward flux rays when active */}
                {strength > 5 && [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => (
                  <motion.div
                    key={k}
                    animate={{
                      opacity: [0.3, 0.9, 0.3],
                      scaleY: [0.7, 1.3, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + (k % 3) * 0.2,
                      ease: 'easeInOut'
                    }}
                    style={{
                      width: 2.5,
                      height: '100%',
                      background: 'linear-gradient(180deg, #0284C7 0%, #38BDF8 100%)',
                      boxShadow: '0 0 6px rgba(14,165,233,0.8)',
                      borderRadius: '2px'
                    }}
                  />
                ))}
              </div>

              {/* Real Industrial Steel Guideway Track with Copper Stator Coils */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '46px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1.5px solid #334155',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                zIndex: 2
              }}>
                <img
                  src="/FunWithMagnets/transrapid_track_clean.png"
                  alt="Transrapid Maglev Guideway Track"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Sleek Dark Slate EM 1 - EM 6 Status Row — 2x Font Scaled */}
            <div style={{
              width: '100%',
              height: '38px',
              marginTop: '6px',
              background: '#1E293B',
              borderRadius: '8px',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 0.5rem',
              boxSizing: 'border-box'
            }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '56px',
                    height: '28px',
                    padding: '0 0.4rem',
                    borderRadius: '6px',
                    background: strength > 0 ? '#0284C7' : '#334155',
                    border: `1.5px solid ${strength > 0 ? '#38BDF8' : '#475569'}`,
                    boxShadow: strength > 0 ? `0 0 8px rgba(56,189,248,${0.5 + glowA * 0.5})` : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span style={{
                    color: strength > 0 ? '#FFFFFF' : '#94A3B8',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    letterSpacing: '0.4px'
                  }}>
                    EM {i}
                  </span>
                </div>
              ))}
            </div>

          {/* Slider Control & Action Area — 2x Scaled Typography */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#334155', fontSize: '1.85rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <span>🔋</span> Electromagnetic Strength
              </span>
              <span style={{
                color: strength > 0 ? '#0284C7' : '#64748B',
                fontWeight: 900,
                fontSize: '1.92rem',
                fontFamily: 'monospace',
                background: '#F0F9FF',
                padding: '0.35rem 0.95rem',
                borderRadius: '10px',
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
                height: '10px',
                borderRadius: '5px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: '#64748B', fontSize: '1.6rem', fontWeight: 800 }}>
                0% (On Track)
              </span>
              <span style={{ color: '#64748B', fontSize: '1.6rem', fontWeight: 800 }}>
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
                style={{
                  background: strength >= 50 ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.7rem 1.45rem',
                  fontSize: '1.72rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: strength >= 50 ? '0 4px 14px rgba(217, 119, 6, 0.35)' : '0 2px 8px rgba(2, 132, 199, 0.25)',
                  transition: 'all 0.2s ease'
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
// STEP 3 — How Does the Train Move? — Continuous Traveling Wave Propulsion
// ══════════════════════════════════════════════════════════════════════════════
function Step3Move({ onNext }) {
  const [propStep, setPropStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [viewedAll, setViewedAll] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const autoPlaySeqRef = useRef(0);

  // 5-Stage Continuous Traveling Wave Sequence Definitions
  const PROP_INFO = [
    {
      title: 'Step 1 — Initial Launch (Coil 2 ON)',
      desc: 'Coil 2 energizes directly ahead of the train. Its attractive magnetic force pulls the train from Coil 1, initiating smooth, steady forward translation across the guideway without wheels.',
      activeCoils: [false, true, false, false, false],
      pattern: ['OFF', 'ON', 'OFF', 'OFF', 'OFF'],
      tag: '⚡ STAGE 1: COIL 2 ENERGIZED'
    },
    {
      title: 'Step 2 — Dynamic Sequential Handoff (Coil 3 ON, Coil 2 OFF)',
      desc: 'As the train crosses past Coil 2, Coil 2 immediately switches OFF (preventing backward magnetic drag) while Coil 3 switches ON ahead, maintaining uninterrupted forward velocity.',
      activeCoils: [false, false, true, false, false],
      pattern: ['OFF', 'OFF', 'ON', 'OFF', 'OFF'],
      tag: '🌊 STAGE 2: TRAVELING WAVE RELAY'
    },
    {
      title: 'Step 3 — Mid-Track Traveling Wave (Coil 4 ON, Coil 3 OFF)',
      desc: 'As the train glides past Coil 3, Coil 3 turns OFF and Coil 4 activates. The magnetic wave travels seamlessly down the line, pulling the train across mid-track in one continuous glide.',
      activeCoils: [false, false, false, true, false],
      pattern: ['OFF', 'OFF', 'OFF', 'ON', 'OFF'],
      tag: '⚡ STAGE 3: MID-TRACK PROPULSION'
    },
    {
      title: 'Step 4 — Terminal Approach (Coil 5 ON, Coil 4 OFF)',
      desc: 'As the train clears Coil 4, Coil 4 deactivates and Coil 5 energizes. The final stator electromagnet pulls the train smoothly into the terminal station.',
      activeCoils: [false, false, false, false, true],
      pattern: ['OFF', 'OFF', 'OFF', 'OFF', 'ON'],
      tag: '🚅 STAGE 4: TERMINAL PULL'
    },
    {
      title: 'Step 5 — Arrival & Safe Shutdown (All Coils OFF)',
      desc: 'The train arrives safely at the terminal, completing its frictionless edge-to-edge flight. All track coils safely shut OFF until the next scheduled departure wave.',
      activeCoils: [false, false, false, false, false],
      pattern: ['OFF', 'OFF', 'OFF', 'OFF', 'OFF'],
      tag: '🏁 STAGE 5: RUN COMPLETED'
    },
  ];

  // Auto-play staging & continuous uninterrupted traveling wave timeline
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
        // Step 0: Reset at start
        setPropStep(-1);
        setIsTranslating(false);
        await sleep(1500);
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Stage 1: Initial Launch (Coil 2 ON & Start Continuous Glide)
        setPropStep(0);
        setIsTranslating(true); // Train begins continuous, uninterrupted linear glide
        await sleep(2500); // Crosses past Coil 2 at 2.5s
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Stage 2: Dynamic Sequential Handoff (Coil 3 ON, Coil 2 OFF)
        setPropStep(1);
        await sleep(2500); // Crosses past Coil 3 at 5.0s
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Stage 3: Mid-Track Traveling Wave (Coil 4 ON, Coil 3 OFF)
        setPropStep(2);
        await sleep(2500); // Crosses past Coil 4 at 7.5s
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Stage 4: Terminal Approach (Coil 5 ON, Coil 4 OFF)
        setPropStep(3);
        await sleep(2500); // Reaches Coil 5 at 10.0s
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;

        // Stage 5: Arrival & Safe Shutdown (All Coils OFF)
        setPropStep(4);
        setViewedAll(true);
        await sleep(3500); // Hold at terminal
        if (!isMounted || autoPlaySeqRef.current !== currentSeqId) break;
      }
    };

    executeAutoPlay();

    return () => {
      isMounted = false;
    };
  }, [autoPlay]);

  const goNext = () => {
    setAutoPlay(false);
    setIsTranslating(false);
    setPropStep(prev => {
      const next = Math.min(prev + 1, 4);
      if (next === 4) setViewedAll(true);
      return next;
    });
  };

  const cur = propStep >= 0 ? PROP_INFO[propStep] : null;
  const activeCoils = cur ? cur.activeCoils : [false, false, false, false, false];
  const currentPattern = cur ? cur.pattern : ['OFF', 'OFF', 'OFF', 'OFF', 'OFF'];

  const getTrainLeft = () => {
    if (autoPlay) {
      return isTranslating ? 'calc(100% - 430px)' : '0px';
    }
    if (propStep === -1) return '0px';
    if (propStep === 0) return 'calc((100% - 430px) * 0.22)';
    if (propStep === 1) return 'calc((100% - 430px) * 0.48)';
    if (propStep === 2) return 'calc((100% - 430px) * 0.72)';
    if (propStep === 3) return 'calc((100% - 430px) * 0.90)';
    if (propStep === 4) return 'calc(100% - 430px)';
    return '0px';
  };

  const getTrainTransition = () => {
    if (autoPlay && isTranslating) {
      return 'left 10s linear';
    }
    return 'left 0.8s ease-out';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '0.65rem 1rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      gap: '0.65rem'
    }}>
      {/* ── 1. PRIMARY INTERACTIVE ACTIVITY AREA (STANDALONE SINGLE-SCREEN FIT) ── */}
      <div style={{
        width: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
        padding: '0.85rem 1.25rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.65rem',
        flex: '1.35',
        minHeight: 0
      }}>
        {/* Controls Row & Scaled Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
            border: '1.5px solid #A5F3FC',
            color: '#0891B2',
            padding: '0.45rem 1.15rem',
            borderRadius: '20px',
            fontSize: '1.15rem',
            fontWeight: 900,
            letterSpacing: '0.5px'
          }}>
            ⚡ ELECTROMAGNETIC PROPULSION SIMULATION
          </div>

          {/* Interactive Navigation Controls */}
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setAutoPlay(false); setIsTranslating(false); setPropStep(p => Math.max(-1, p - 1)); }}
              disabled={propStep < 0}
              style={{
                padding: '0.45rem 1.05rem',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                background: propStep < 0 ? '#F1F5F9' : '#FFFFFF',
                color: propStep < 0 ? '#94A3B8' : '#334155',
                fontWeight: 900,
                fontSize: '1.05rem',
                cursor: propStep < 0 ? 'not-allowed' : 'pointer',
                boxShadow: propStep < 0 ? 'none' : '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              ◀ Prev
            </button>
            <button
              onClick={goNext}
              disabled={propStep >= 4}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '10px',
                border: propStep < 4 ? '1.5px solid #0284C7' : '1.5px solid #CBD5E1',
                background: propStep < 4 ? '#0284C7' : '#F1F5F9',
                color: propStep < 4 ? '#FFFFFF' : '#94A3B8',
                fontWeight: 900,
                fontSize: '1.05rem',
                cursor: propStep >= 4 ? 'not-allowed' : 'pointer',
                boxShadow: propStep < 4 ? '0 2px 8px rgba(2,132,199,0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Next Step ▶
            </button>
            <button
              onClick={() => setAutoPlay(p => !p)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '10px',
                border: autoPlay ? '1.5px solid #D97706' : '1.5px solid #F59E0B',
                background: autoPlay ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#FFFBEB',
                color: autoPlay ? '#FFFFFF' : '#B45309',
                fontWeight: 900,
                fontSize: '1.05rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 8px rgba(245,158,11,0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              {autoPlay ? '⏸ Pause' : '▶ Auto-play'}
            </button>
            <button
              onClick={() => { setAutoPlay(false); setIsTranslating(false); setPropStep(-1); }}
              style={{
                padding: '0.45rem 1.05rem',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                background: '#F8FAFC',
                color: '#64748B',
                fontWeight: 800,
                fontSize: '1.05rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Realistic Interactive Simulation Canvas with Provided User Assets */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '170px',
          maxHeight: '235px',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 55%, #E2E8F0 100%)',
          borderRadius: '14px',
          border: '1.5px solid #CBD5E1',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0.5rem 1rem',
          boxSizing: 'border-box',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.03)'
        }}>
          {/* Engineering Blueprint Grid Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none'
          }} />

          {/* Direction of Travel Indicator Banner */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #CBD5E1',
            borderRadius: '20px',
            padding: '0.25rem 0.85rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            zIndex: 5
          }}>
            <span style={{ color: '#0369A1', fontSize: '0.95rem', fontWeight: 900, letterSpacing: '0.5px' }}>
              Direction of Travel ➔ ➔ ➔
            </span>
          </div>

          {/* Moving Provided User Maglev Train Model — Explicit Continuous Translation */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '105px',
            zIndex: 4,
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: '4px',
            overflow: 'visible'
          }}>
            <div
              style={{
                position: 'absolute',
                left: getTrainLeft(),
                bottom: '0px',
                width: '420px',
                transition: getTrainTransition(),
                willChange: 'left',
                display: 'block'
              }}
            >
              <img
                src="/FunWithMagnets/transrapid_train_clean.png"
                alt="Transrapid Maglev Bullet Train"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.3))'
                }}
              />

              {/* Levitation Glow Cushion under the train */}
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                left: '15px',
                right: '15px',
                height: '8px',
                background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.75) 0%, rgba(56,189,248,0) 80%)',
                filter: 'blur(3px)',
                pointerEvents: 'none'
              }} />
            </div>
          </div>

          {/* Real Industrial Steel Guideway Rail Track Structure */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '62px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            {/* Real Industrial Guideway Track Image Layer */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '46px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1.5px solid #334155',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
            }}>
              <img
                src="/FunWithMagnets/transrapid_track_clean.png"
                alt="Transrapid Maglev Guideway Track"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* 5 Electromagnetic Stator Coil Status Markers ON the Track — Coils 1 through 5 */}
              <div style={{
                position: 'absolute',
                bottom: '4px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-around',
                padding: '0 2.5rem',
                zIndex: 6,
                pointerEvents: 'none'
              }}>
                {[0, 1, 2, 3, 4].map(idx => {
                  const isActive = activeCoils[idx];
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.22rem 0.75rem',
                        borderRadius: '6px',
                        background: isActive ? '#0284C7' : 'rgba(15, 23, 42, 0.88)',
                        border: `1.5px solid ${isActive ? '#38BDF8' : '#475569'}`,
                        boxShadow: isActive ? '0 0 14px rgba(56,189,248,0.95)' : '0 2px 4px rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span style={{
                        color: isActive ? '#FFFFFF' : '#CBD5E1',
                        fontSize: '0.95rem',
                        fontWeight: 900,
                        letterSpacing: '0.3px'
                      }}>
                        Coil {idx + 1}
                      </span>
                      <span style={{
                        background: isActive ? '#38BDF8' : '#334155',
                        color: isActive ? '#0369A1' : '#94A3B8',
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        padding: '0.12rem 0.4rem',
                        borderRadius: '4px'
                      }}>
                        {isActive ? '⚡ ON' : 'OFF'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Synchronized Magnetic Sequence Pattern Status Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '0.45rem 1rem'
        }}>
          <span style={{ color: '#1E293B', fontSize: '1.05rem', fontWeight: 900 }}>
            Traveling Wave Status:
          </span>
          {currentPattern.map((s, i) => (
            <span
              key={i}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '8px',
                fontWeight: 900,
                fontSize: '0.95rem',
                background: s === 'ON' ? 'rgba(6,182,212,0.22)' : '#E2E8F0',
                color: s === 'ON' ? '#0284C7' : '#64748B',
                border: `1.5px solid ${s === 'ON' ? '#0284C7' : '#CBD5E1'}`,
                boxShadow: s === 'ON' ? '0 0 8px rgba(2,132,199,0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Coil {i + 1}: {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. TWO BOTTOM BOXES (TYPOGRAPHY FULLY SCALED TO FILL INTERIOR SPACE) ── */}
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: '0.85rem',
        alignItems: 'stretch',
        flex: '1',
        minHeight: 0
      }}>
        {/* LEFT BOX: Dynamically changing content scaled up to fill container from top */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          padding: '1.25rem 1.6rem',
          boxSizing: 'border-box',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          overflowY: 'auto'
        }}>
          <AnimatePresence mode="wait">
            {propStep < 0 ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', alignItems: 'flex-start' }}
              >
                <div style={{
                  color: '#0284C7',
                  fontWeight: 900,
                  fontSize: '2.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  lineHeight: 1.25
                }}>
                  <span>🔬</span> How Does the Maglev Train Move Forward?
                </div>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.6rem', lineHeight: 1.55, fontWeight: 600 }}>
                  Unlike conventional trains that rely on an engine turning wheels against metal rails, a Maglev train is propelled entirely by <strong style={{ color: '#0F172A', fontWeight: 900 }}>synchronized traveling electromagnetic waves</strong> embedded along the track guideway. Click <strong style={{ color: '#0284C7', fontWeight: 900 }}>"Next Step ▶"</strong> or <strong style={{ color: '#D97706', fontWeight: 900 }}>"▶ Auto-play"</strong> above to witness each phase of the propulsion cycle!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={propStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
                    border: '1.5px solid #06B6D4',
                    color: '#0891B2',
                    borderRadius: '10px',
                    padding: '0.35rem 0.95rem',
                    fontWeight: 900,
                    fontSize: '1.15rem'
                  }}>
                    STEP {propStep + 1} OF 5
                  </span>
                  <span style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    borderRadius: '10px',
                    padding: '0.35rem 0.85rem',
                    fontWeight: 900,
                    fontSize: '1.12rem'
                  }}>
                    {PROP_INFO[propStep].tag}
                  </span>
                </div>
                <h3 style={{ margin: 0, color: '#0F172A', fontWeight: 900, fontSize: '2.05rem', lineHeight: 1.25 }}>
                  {PROP_INFO[propStep].title}
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.6rem', lineHeight: 1.55, fontWeight: 600 }}>
                  {PROP_INFO[propStep].desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT BOX: Fixed Takeaway Box scaled up by one extra level */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '16px',
          padding: '1.25rem 1.6rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>💡</span>
            <p style={{
              margin: 0,
              color: '#78350F',
              fontSize: '1.8rem',
              lineHeight: 1.55,
              fontWeight: 800
            }}>
              "Instead of an engine pushing against track friction, computer-synchronized electromagnets pull from ahead and push from behind in an ultra-fast traveling magnetic wave."
            </p>
          </div>

          <button
            onClick={onNext}
            disabled={!viewedAll}
            style={{
              background: viewedAll ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#E2E8F0',
              color: viewedAll ? '#FFFFFF' : '#94A3B8',
              border: 'none',
              borderRadius: '14px',
              padding: '0.9rem 1.8rem',
              fontSize: '1.35rem',
              fontWeight: 900,
              cursor: viewedAll ? 'pointer' : 'not-allowed',
              boxShadow: viewedAll ? '0 4px 14px rgba(217, 119, 6, 0.35)' : 'none',
              transition: 'all 0.2s ease',
              width: '100%',
              textAlign: 'center'
            }}
          >
            {viewedAll ? 'Next: Electromagnet Control ▶' : 'Watch all 5 steps to proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 4 — Electromagnetic Control — Video & Physics Principles
// ══════════════════════════════════════════════════════════════════════════════
function Step4Control() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: '1.25rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      maxWidth: '98%',
      margin: '0 auto'
    }}>
      {/* ── LEFT CONTAINER: CLEAN WHITE CARD & EMBEDDED ELECTROMAGNET VIDEO ── */}
      <div style={{
        flex: '1.1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.35rem',
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
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.5rem 1.2rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 900,
            letterSpacing: '0.6px'
          }}>
            🎥 ELECTROMAGNET OPERATION & CONTROL
          </div>
        </div>

        {/* Responsive Video Containment */}
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1.5px solid #CBD5E1',
          background: '#0F172A',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <video
            src="/FunWithMagnets/Emagnet.mp4"
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
        flex: '1',
        height: '100%',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '22px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
        padding: '1.5rem 1.65rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        overflowY: 'auto'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
          border: '1.5px solid #A5F3FC',
          color: '#0891B2',
          padding: '0.45rem 1.15rem',
          borderRadius: '20px',
          fontSize: '0.98rem',
          fontWeight: 900,
          letterSpacing: '0.6px',
          width: 'fit-content',
          flexShrink: 0
        }}>
          🔌 ELECTROMAGNETIC CONTROL
        </div>

        {/* Title */}
        <h2 style={{
          margin: 0,
          color: '#0F172A',
          fontSize: '2.2rem',
          fontWeight: 900,
          lineHeight: 1.25,
          letterSpacing: '-0.02em'
        }}>
          Why Do We Use Electromagnets?
        </h2>

        {/* Lead description */}
        <p style={{
          margin: 0,
          color: '#334155',
          fontSize: '1.3rem',
          lineHeight: 1.55,
          fontWeight: 600
        }}>
          Unlike permanent magnets, an <strong style={{ color: '#0284C7', fontWeight: 900 }}>electromagnet's magnetic force can be switched ON and OFF instantly</strong> — and even reversed in milliseconds — simply by regulating the electric current flowing through its coils.
        </p>

        {/* Chain Reaction Flow Card */}
        <div style={{
          background: '#F0F9FF',
          border: '1.5px solid #BAE6FD',
          borderRadius: '18px',
          padding: '1.1rem 1.35rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          <div style={{ color: '#0369A1', fontWeight: 900, fontSize: '1.25rem' }}>
            ⚡ Instant Magnetic Chain Reaction:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
            {['Electric Current', '➔', 'Copper Coil', '➔', 'Magnetic Field', '➔', 'Train Propelled'].map((stepText, idx) => (
              stepText === '➔' ? (
                <span key={idx} style={{ color: '#0284C7', fontSize: '1.3rem', fontWeight: 900 }}>➔</span>
              ) : (
                <span key={idx} style={{
                  background: '#FFFFFF',
                  border: '1px solid #7DD3FC',
                  color: '#0C4A6E',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: '0 1px 4px rgba(2, 132, 199, 0.08)'
                }}>
                  {stepText}
                </span>
              )
            ))}
          </div>
        </div>

        {/* 4 Key Advantages List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ color: '#0F172A', fontWeight: 900, fontSize: '1.28rem' }}>
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
              gap: '0.85rem',
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '14px',
              padding: '0.8rem 1.1rem'
            }}>
              <span style={{
                fontSize: '1.45rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.55rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                flexShrink: 0
              }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '1.15rem' }}>{item.title}</span>
                <span style={{ color: '#475569', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.4 }}>{item.desc}</span>
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
      width: '100%', 
      height: '100vh', 
      maxHeight: '100vh', 
      margin: '0 auto',
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '0.4rem 0.75rem',
      backgroundColor: 'transparent',
      position: 'relative',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>

      {/* Top Header Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.65rem 1.25rem',
        marginBottom: '0.65rem',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100
      }}>
        {/* Left: Back to Chapter 4 Button */}
        <button 
          onClick={onBackToDashboard}
          style={{ 
            position: 'relative', zIndex: 100,
            padding: '0.6rem 1.15rem', 
            fontSize: '0.92rem', 
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '14px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" /> Back to Chapter 4
        </button>

        {/* Center: Title & Subtitle */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.42rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            <Compass size={28} style={{ color: '#173B5F' }} />
            Activity 4.9: Fun with Magnets
          </h2>
          <span style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 800 }}>Class 6 Science — 3D Magnetic Town Expedition & Magnet Care</span>
        </div>

        {/* Right: Tabbed Step Navigation Pills */}
        <nav style={{ display: 'flex', gap: '0.5rem', margin: 0 }}>
          {STEPS_NAV.map(nav => {
            const isActive = step === nav.id;
            
            return (
              <button
                key={nav.id}
                onClick={() => go(nav.id)}
                style={{
                  padding: '0.6rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  border: isActive ? 'none' : '1.5px solid #CBD5E1',
                  background: isActive ? 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#334155',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.92rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(217, 119, 6, 0.35)' : 'none'
                }}
              >
                {nav.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Active Stage Panel */}
      <main style={{ 
        width: '100%', 
        flex: 1, 
        minHeight: 0, 
        display: 'flex', 
        flexDirection: 'row', 
        overflow: 'hidden', 
        position: 'relative', 
        zIndex: 1,
        gap: '0.85rem'
      }}>
        {/* STEP 0: PREDICT */}
        {step === 0 && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '100%', maxWidth: '1000px', maxHeight: '100%', overflowY: 'auto', background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', border: '1.5px solid #E2E8F0', borderRadius: '24px', padding: '2rem 2.5rem', boxShadow: '0 10px 32px rgba(217, 119, 6, 0.08)', boxSizing: 'border-box', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: '#D1FAE5', color: '#065F46', padding: '0.4rem 0.95rem', borderRadius: '18px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.2px', marginBottom: '0.75rem' }}>
                <Sparkles size={16} color="#065F46" /> SECTION 4.5 · FUN WITH MAGNETS
              </div>

              <h1 style={{ fontSize: '1.45rem', color: '#064E3B', fontWeight: 900, margin: '0 0 0.6rem 0', lineHeight: 1.3 }}>
                Magnets can exert force and guide objects through materials.
              </h1>
              <p className="lead" style={{ fontSize: '1.12rem', lineHeight: 1.6, color: '#334155', margin: '0 0 1.2rem 0', fontWeight: 600 }}>
                You can guide a walking <strong>City Explorer</strong> across a <strong>3D Town Map</strong> using a leading magnet! Predict: how can a magnet guide and pull a walking explorer without touching directly?
              </p>
              
              <div className="choices" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: "The board is covered with sticky adhesive", ok: false, xp: 0 },
                  { label: "Magnetic force acts through non-magnetic materials to attract the magnetic badge", ok: true, xp: 10 },
                  { label: "Gravity pulls the walker sideways", ok: false, xp: 0 },
                  { label: "Static electricity controls the explorer", ok: false, xp: 0 }
                ].map((c, idx) => {
                  const isSelected = predictAns && predictAns.selectedIndex === idx;
                  const isCorrect = c.ok;
                  
                  let bgColor = '#F8FAFC';
                  let borderColor = '#CBD5E1';
                  let textColor = '#1E293B';
                  let icon = null;

                  if (predictAns) {
                    if (isCorrect) {
                      bgColor = '#DCFCE7';
                      borderColor = '#16A34A';
                      textColor = '#065F46';
                      icon = <CheckCircle2 size={22} color="#16A34A" />;
                    } else if (isSelected) {
                      bgColor = '#FEE2E2';
                      borderColor = '#EF4444';
                      textColor = '#991B1B';
                      icon = <XCircle size={22} color="#EF4444" />;
                    }
                  }

                  return (
                    <button 
                      key={idx} 
                      onClick={() => {
                        if (predictAns) return;
                        setPredictAns({ correct: c.ok, selectedIndex: idx });
                        if (c.ok) addXP(c.xp);
                      }}
                      style={{
                        padding: '1.05rem 1.4rem',
                        borderRadius: '16px',
                        textAlign: 'left',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        background: bgColor,
                        border: `2px solid ${borderColor}`,
                        color: textColor,
                        cursor: predictAns ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="key" style={{ marginRight: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#E2E8F0', fontSize: '0.88rem', color: '#0F172A', fontWeight: 900 }}>{['A','B','C','D'][idx]}</span>
                        {c.label}
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>
              
              {predictAns && (
                <div className="reveal show" style={{ marginTop: '1rem', padding: '1rem 1.35rem', background: '#F0FDF4', borderLeft: `5px solid ${predictAns.correct ? '#16A34A' : '#173B5F'}`, border: '1.5px solid #A7F3D0', borderRadius: '18px', color: '#334155', fontWeight: 600, fontSize: '1rem', lineHeight: 1.55 }}>
                  <b style={{ color: predictAns.correct ? '#16A34A' : '#173B5F' }}>{predictAns.correct ? '✓ Correct!' : '✗ Not quite.'} Magnetic Force Through Materials!</b> A magnet's invisible magnetic field passes through non-magnetic surfaces, pulling and guiding magnetic objects smoothly across the board!
                </div>
              )}

              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <button 
                  disabled={!predictAns} 
                  onClick={() => go(1)}
                  style={{
                    padding: '0.95rem 2.6rem',
                    borderRadius: '30px',
                    border: 'none',
                    background: predictAns ? 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)' : '#CBD5E1',
                    color: predictAns ? '#FFFFFF' : '#64748B',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    cursor: predictAns ? 'pointer' : 'not-allowed',
                    boxShadow: predictAns ? '0 4px 16px rgba(217, 119, 6, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  Start Town Expedition <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content — Full Display Viewport ── */}
      <main style={{
        width: '100%', flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'row', overflow: 'hidden',
        position: 'relative', zIndex: 1
      }}>
        {/* STEP 0 — Cinematic Intro Question */}
        {step === 0 && <Step0Intro onNext={() => go(1)} onBack={onBackToDashboard} />}

        {/* STEP 1 — Maglev Concept: Attraction & Repulsion */}
        {step === 1 && <Step1Maglev onNext={() => go(2)} />}

        {/* STEP 2 — How Does It Float: Levitation Slider */}
        {step === 2 && <Step2Float onNext={() => go(3)} />}

        {/* STEP 3 — How Does It Move: Propulsion Sequence */}
        {step === 3 && <Step3Move onNext={() => go(4)} />}

        {/* STEP 4 — Electromagnetic Control: ON/OFF Video Demo (Routes to Expedition) */}
        {step === 4 && <Step4Control onNext={() => go(5)} />}

        {/* STEP 5 — Magnetic Town Expedition (MazeGame) */}
        {step === 5 && (
          <>
            {/* Left: Simulation Canvas Frame */}
            <div style={{ flex: '1.4', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, height: '100%', boxSizing: 'border-box', padding: '0.2rem 0' }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', height: '100%', maxHeight: '100%', maxWidth: '100%', width: 'auto', borderRadius: '24px', overflow: 'hidden', border: '2px solid #A7F3D0', boxShadow: '0 12px 35px rgba(6,78,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
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
                {/* Fullscreen button */}
                <button onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  style={{ position: 'absolute', top: 14, right: 14, zIndex: 40, background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(255,255,255,0.85)', borderRadius: '12px', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#0F172A', fontSize: '0.78rem', fontWeight: 800, backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', transition: 'all 0.2s ease' }}>
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>

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
                          borderRadius: '24px', 
                          padding: '2.5rem 3rem', 
                          maxWidth: '520px', 
                          width: '90%',
                          textAlign: 'center', 
                          border: '1.5px solid #E2E8F0',
                          boxShadow: '0 20px 50px rgba(217, 119, 6, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1.25rem'
                        }}
                      >
                        <h2 style={{ margin: 0, color: '#064E3B', fontSize: '1.8rem', fontWeight: 900 }}>Destination Reached! 🎯🎉</h2>
                        <p style={{ margin: 0, color: '#334155', fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 600 }}>
                          Outstanding navigation! The magnet smoothly guided the train across the 3D railway grid to the destination beacon!
                        </p>
                        <button 
                          onClick={() => {
                            setShowMazeSolveModal(false);
                            go(2);
                          }}
                          style={{
                            padding: '1.1rem 3rem',
                            fontSize: '1.15rem',
                            fontWeight: 900,
                            borderRadius: '40px',
                            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                            color: '#FFFFFF',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 6px 20px rgba(217, 119, 6, 0.45)',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          Next: Magnet Care <ArrowRight size={22} color="#FFFFFF" />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Control & Observation Panel */}
            <div style={{ 
              flex: '1.05', 
              background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
              border: '1.5px solid #E2E8F0', 
              borderRadius: '24px', 
              padding: '1.4rem 1.5rem', 
              boxShadow: '0 10px 32px rgba(217, 119, 6, 0.08)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              gap: '1rem', 
              minWidth: 0,
              overflowY: 'auto' 
            }}>
              {/* Magnetic Principles Explanation Box */}
              <div style={{
                background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
                border: '1.5px solid #E2E8F0',
                borderRadius: '20px',
                padding: '1.2rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#173B5F', fontWeight: 900, fontSize: '1.25rem' }}>
                  <Sparkles size={24} color="#173B5F" />
                  <span>How Electromagnetic Control Works:</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', color: '#173B5F', fontSize: '1.08rem', lineHeight: 1.5, fontWeight: 700 }}>
                  <p style={{ margin: 0 }}>
                    • Electromagnetic poles activate at nearby track junctions.
                  </p>
                  <p style={{ margin: 0 }}>
                    • Selecting a pole fires an attractive magnetic lightning tether.
                  </p>
                  <p style={{ margin: 0 }}>
                    • Magnetic pull glides your train smoothly to that station!
                  </p>
                  <p style={{ margin: 0 }}>
                    • Use the poles or D-Pad to reach the destination beacon 🎯!
                  </p>
                </div>
              </div>

              {/* D-Pad HUD */}
              {(() => {
                const availableDirs = getAvailableDirections(currentNodeId);
                const currentStationName = NODES_MAP[currentNodeId]?.shortName || 'Grand';
                return (
                  <div style={{ 
                    background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
                    border: '1.5px solid #E2E8F0', 
                    borderRadius: '20px', 
                    padding: '1.15rem 1.25rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.8rem',
                    boxShadow: '0 4px 16px rgba(217, 119, 6, 0.08)'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.55rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#173B5F', fontWeight: 900, fontSize: '0.92rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        <Compass size={18} color="#173B5F" />
                        <span>D-PAD HUD CONTROLS</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#173B5F', fontWeight: 900, background: '#EAF2F6', padding: '3px 10px', borderRadius: '10px', border: '1.5px solid #E2E8F0' }}>
                        Station: {currentStationName}
                      </div>
                    </div>

                    {/* 3x3 D-Pad Buttons Matrix */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 56px)',
                      gridTemplateRows: 'repeat(3, 56px)',
                      gap: '8px',
                      margin: '0.2rem auto',
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
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['N']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'N' ? '0 0 14px #214A70' : (availableDirs['N'] ? '0 4px 10px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▲</span>
                        <span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>N</span>
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
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['W']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'W' ? '0 0 14px #214A70' : (availableDirs['W'] ? '0 4px 10px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>◀</span>
                        <span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>W</span>
                      </button>

                      {/* CENTER STATION BADGE */}
                      <div style={{
                        gridColumn: 2,
                        gridRow: 2,
                        background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                        borderRadius: '16px',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '11.5px',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textAlign: 'center',
                        padding: '2px',
                        boxShadow: '0 4px 10px rgba(217, 119, 6, 0.35)'
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
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['E']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'E' ? '0 0 14px #214A70' : (availableDirs['E'] ? '0 4px 10px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▶</span>
                        <span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>E</span>
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
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: 900,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: (isMoving || !availableDirs['S']) ? 'not-allowed' : 'pointer',
                          boxShadow: hintDir === 'S' ? '0 0 14px #214A70' : (availableDirs['S'] ? '0 4px 10px rgba(217, 119, 6, 0.2)' : 'none'),
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▼</span>
                        <span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>S</span>
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
                        padding: '10px 14px',
                        borderRadius: '14px',
                        fontSize: '0.92rem',
                        color: '#173B5F',
                        fontWeight: 900,
                        cursor: isMoving ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '0.2rem',
                        boxShadow: '0 2px 6px rgba(217, 119, 6, 0.1)'
                      }}
                    >
                      <RotateCcw size={16} /> Reset Expedition
                    </button>

                    {/* Proceed Button */}
                    <button
                      onClick={() => go(2)}
                      disabled={!ext.maze}
                      style={{ 
                        width: '100%', 
                        padding: '0.95rem 1.4rem', 
                        fontSize: '1.05rem', 
                        fontWeight: 900, 
                        borderRadius: '16px', 
                        background: ext.maze ? 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)' : '#F1F5F9', 
                        color: ext.maze ? '#FFFFFF' : '#94A3B8', 
                        border: ext.maze ? 'none' : '1.5px solid #E2E8F0', 
                        cursor: ext.maze ? 'pointer' : 'not-allowed', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.55rem',
                        boxShadow: ext.maze ? '0 4px 16px rgba(217, 119, 6, 0.4)' : 'none',
                        transition: 'all 0.25s ease',
                        marginTop: '0.25rem'
                      }}
                    >
                      Proceed to Magnet Care <ArrowRight size={18} color={ext.maze ? '#FFFFFF' : '#94A3B8'} />
                    </button>
                  </div>
                );
              })()}
            </div>
          </>
        )}

        {/* STEP 6 — Magnet Care & Assessment */}
        {step === 6 && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '100%', maxWidth: '1000px', maxHeight: '100%', overflowY: 'auto', background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', border: '1.5px solid #E2E8F0', borderRadius: '24px', padding: '2rem 2.5rem', boxShadow: '0 10px 32px rgba(217, 119, 6, 0.08)', boxSizing: 'border-box' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: '#D1FAE5', color: '#065F46', padding: '0.4rem 0.95rem', borderRadius: '18px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.2px', marginBottom: '0.75rem' }}>
                <Sparkles size={16} color="#065F46" /> MAGNET CARE &amp; ASSESSMENT
              </div>
              <h1 style={{ fontSize: '1.45rem', color: '#064E3B', fontWeight: 900, margin: '0 0 0.6rem 0', lineHeight: 1.3 }}>
                How should magnets be stored safely?
              </h1>
              <p className="lead" style={{ fontSize: '1.12rem', lineHeight: 1.6, color: '#334155', margin: '0 0 1.2rem 0', fontWeight: 600 }}>
                Test your knowledge on caring for magnets to maintain their magnetic strength over time.
              </p>

              <div className="choices" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: "Keep them near heating devices and hammer them periodically", ok: false },
                  { label: "Heat and knocking scrambled its magnetism; in future, store magnets in pairs with unlike poles together and avoid heat and drops", ok: true },
                  { label: "Magnets always fade in exactly six months; nothing can be done", ok: false },
                  { label: "The toolbox absorbed the pins; empty the toolbox", ok: false }
                ].map((c, idx) => {
                  const isSelected = qHard && qHard.selectedIndex === idx;
                  const isCorrect = c.ok;
                  
                  let bgColor = '#FFFFFF';
                  let borderColor = '#E2E8F0';
                  let textColor = '#173B5F';
                  let icon = null;

                  if (qHard) {
                    if (isCorrect) { bgColor = '#DCFCE7'; borderColor = '#16A34A'; textColor = '#065F46'; icon = <CheckCircle2 size={22} color="#16A34A" />; }
                    else if (isSelected) { bgColor = '#FEE2E2'; borderColor = '#EF4444'; textColor = '#991B1B'; icon = <XCircle size={22} color="#EF4444" />; }
                  }
                  return (
                    <button key={idx} onClick={() => { if (qHard) return; setQHard({ correct: c.ok, selectedIndex: idx }); if (c.ok) addXP(20); }}
                      style={{ padding: '1.05rem 1.4rem', borderRadius: '16px', textAlign: 'left', fontSize: '1.05rem', fontWeight: 700, background: bgColor, border: `2px solid ${borderColor}`, color: textColor, cursor: qHard ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.25s ease', boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="key" style={{ marginRight: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#EAF2F6', fontSize: '0.88rem', color: '#173B5F', fontWeight: 900 }}>{['A','B','C','D'][idx]}</span>
                        {c.label}
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {qHard && (
                <div style={{ marginTop: '1rem' }}>
                  <div className="reveal show" style={{ padding: '1rem 1.35rem', background: '#F0FDF4', borderLeft: `5px solid ${qHard.correct ? '#16A34A' : '#173B5F'}`, border: '1.5px solid #A7F3D0', borderRadius: '18px', color: '#334155', fontWeight: 600, fontSize: '1rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    <b style={{ color: qHard.correct ? '#16A34A' : '#173B5F' }}>{qHard.correct ? '✓ Correct!' : '✗ Incorrect.'} Mistreatment weakened it - and careful storage prevents it.</b> Dropping, knocking and heat disturb the aligned magnetic domains. Store magnets in pairs with unlike poles together!
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <button 
                      onClick={() => go(3)}
                      style={{ padding: '0.95rem 2.6rem', borderRadius: '30px', border: 'none', background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)', color: '#FFFFFF', fontWeight: 900, fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(217, 119, 6, 0.45)', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'all 0.25s ease' }}
                    >
                      Continue to Did You Know <ArrowRight size={20} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showFinalCompletionModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6, 78, 59, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(6px)' }}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{ 
                      background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
                      borderRadius: '24px', 
                      padding: '2.5rem 3rem', 
                      maxWidth: '520px', 
                      width: '90%',
                      textAlign: 'center', 
                      border: '1.5px solid #E2E8F0',
                      boxShadow: '0 20px 50px rgba(217, 119, 6, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.25rem'
                    }}
                  >
                    <h2 style={{ margin: 0, color: '#064E3B', fontSize: '1.8rem', fontWeight: 900 }}>Activity Completed! 🎉</h2>
                    <p style={{ margin: 0, color: '#334155', fontSize: '1.2rem', lineHeight: '1.5', fontWeight: 600 }}>
                      Outstanding job! You've mastered 3D town map navigation and magnet care!
                    </p>

                    <button
                      onClick={() => {
                        setShowFinalCompletionModal(false);
                        go(3);
                      }}
                      style={{
                        padding: '1.1rem 3rem',
                        background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '40px',
                        fontSize: '1.15rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)',
                        transition: 'all 0.25s ease',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      Continue to Did You Know <ArrowRight size={22} color="#FFFFFF" />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

      {/* STEP 3: DID YOU KNOW */}
      {step === 3 && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'transparent' }}>
          {/* Compact header for Did You Know step */}
          <div style={{ padding: '0.55rem 1.25rem', background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', border: '1.5px solid #E2E8F0', borderRadius: '0 0 20px 20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(217,119,6,0.08)' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#064E3B' }}>✨ Did You Know? — Fascinating Magnetism Facts</span>
            <button onClick={() => go(2)} style={{ padding: '0.5rem 1.15rem', background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)', color: '#FFFFFF', border: 'none', borderRadius: '14px', fontWeight: 900, fontSize: '0.92rem', cursor: 'pointer', boxShadow: '0 3px 10px rgba(217,119,6,0.3)' }}>← Back to Magnet Care</button>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <DidYouKnow
              onComplete={() => { if (onComplete) onComplete(); else if (onBackToDashboard) onBackToDashboard(); }}
              onBackToQuiz={() => go(6)}
            />
          </div>
        )}
      </main>

      {/* ── Bottom Footer Navigation — ACROSS ALL NON-INTRO PAGES (step > 0) ── */}
      {step > 0 && (
        <footer style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1.4rem',
          marginTop: '0.45rem',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid #FDE68A',
          borderRadius: '22px',
          boxShadow: '0 6px 20px rgba(217,119,6,0.12)',
          flexShrink: 0,
          zIndex: 100,
          maxWidth: '96%',
          margin: '0.45rem auto 0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Back Button on Left */}
          <button
            onClick={() => go(step - 1)}
            style={{
              padding: '0.65rem 1.6rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              borderRadius: '25px',
              background: 'rgba(15, 23, 42, 0.88)',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={20} color="#FFFFFF" /> Back
          </button>

          {/* Central Progress indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.05rem',
            fontWeight: 900,
            color: '#064E3B'
          }}>
            <span style={{ background: '#ECFDF5', padding: '0.25rem 0.75rem', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
              Step {step} of {STEPS_NAV.length - 1}
            </span>
            <span style={{ color: '#D97706' }}>•</span>
            <span style={{ color: '#047857', fontWeight: 800 }}>{STEPS_NAV[step]?.label}</span>
          </div>

          {/* Next Button on Right */}
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
            style={{
              padding: '0.65rem 1.9rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              border: '1.5px solid #FDE68A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            {step === STEPS_NAV.length - 1 ? 'Finish Activity' : 'Next'} <ArrowRight size={20} color="#FFFFFF" />
          </button>
        </footer>
      )}
    </div>
  );
}
