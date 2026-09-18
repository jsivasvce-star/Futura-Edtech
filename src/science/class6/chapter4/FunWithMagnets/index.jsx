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
// NAVIGATION — 9 steps
// ══════════════════════════════════════════════════════════════════════════════
const STEPS_NAV = [
  { id: 0, label: '1. Intro' },
  { id: 1, label: '2. Maglev' },
  { id: 2, label: '3. Float' },
  { id: 3, label: '4. Move' },
  { id: 4, label: '5. E-Magnet' },
  { id: 5, label: '6. Challenge' },
  { id: 6, label: '7. Expedition' },
  { id: 7, label: '8. Care' },
  { id: 8, label: '9. Facts' },
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
function Step0Intro({ onNext }) {
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (val) => {
    setAnswer(val);
    setTimeout(() => onNext(), 950);
  };

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      borderRadius: '20px', display: 'flex', alignItems: 'center',
    }}>
      {/* Full-width cinematic hero background image - clean and untinted */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/FunWithMagnets/maglev_intro_hero.jpg"
          alt="Maglev train levitating above electromagnetic track"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Content over the image: Transparent glass container for the question */}
      <div style={{
        position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center',
        width: '100%', height: '100%', padding: '2rem 3rem',
        boxSizing: 'border-box'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '24px',
            padding: '2.25rem 2.5rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            maxWidth: '640px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(6, 182, 212, 0.25)', border: `1.5px solid ${ACCENT_BLUE}`,
            color: '#67E8F9', padding: '0.4rem 1rem', borderRadius: '20px',
            fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.8px', width: 'fit-content'
          }}>
            ⚡ ACTIVITY 4.9 · FUN WITH MAGNETS · MAGLEV TRAIN
          </div>

          <h1 style={{
            margin: 0, fontSize: '2.4rem', fontWeight: 900,
            color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.025em',
            textShadow: '0 2px 16px rgba(0,0,0,0.7)'
          }}>
            Can a train move without its wheels touching the track?
          </h1>

          <p style={{
            margin: 0, color: '#E2E8F0', fontSize: '1.08rem', lineHeight: 1.6, fontWeight: 500,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)'
          }}>
            The train in this image is <strong style={{ color: '#FDE047' }}>floating above the track</strong> — no wheels, no contact. What do you think makes this possible?
          </p>

          {/* Answer buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.25rem' }}>
            {[
              { val: 'yes', label: '✅ Yes — magnetic forces make it possible!', color: '#FFFFFF', border: '#10B981', bg: 'rgba(5, 150, 105, 0.45)' },
              { val: 'no', label: '❌ No — trains must have wheels touching the track', color: '#FFFFFF', border: '#EF4444', bg: 'rgba(220, 38, 38, 0.4)' },
              { val: 'discover', label: "🚀 Let's Discover Together!", color: '#FFFFFF', border: '#F59E0B', bg: 'linear-gradient(135deg, rgba(245,158,11,0.6) 0%, rgba(217,119,6,0.75) 100%)', large: true },
            ].map(btn => (
              <motion.button
                key={btn.val}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(btn.val)}
                style={{
                  padding: btn.large ? '1.1rem 1.6rem' : '0.9rem 1.4rem',
                  borderRadius: '16px',
                  border: `2px solid ${answer === btn.val ? btn.border : 'rgba(255,255,255,0.2)'}`,
                  background: answer === btn.val ? btn.bg : 'rgba(15, 23, 42, 0.55)',
                  color: btn.color,
                  fontSize: btn.large ? '1.08rem' : '0.98rem',
                  fontWeight: 800, cursor: 'pointer', textAlign: 'left',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.25s ease',
                  boxShadow: answer === btn.val ? `0 0 22px ${btn.border}88` : '0 4px 12px rgba(0,0,0,0.2)',
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
                  color: '#FFFFFF', fontWeight: 800, fontSize: '1rem',
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(6,182,212,0.3)',
                  border: '1.5px solid rgba(103,232,249,0.6)',
                  borderRadius: '14px', backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.3)'
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
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — What is a Maglev Train? — Attraction & Repulsion
// ══════════════════════════════════════════════════════════════════════════════
function Step1Maglev({ onNext }) {
  const [mode, setMode] = useState(null);
  const [viewed, setViewed] = useState({ attract: false, repel: false });

  const selectMode = (m) => {
    setMode(m);
    setViewed(v => ({ ...v, [m === 'attract' ? 'attract' : 'repel']: true }));
  };

  const canProceed = viewed.attract && viewed.repel;
  const fieldColor = mode === 'repel' ? '#EF4444' : '#06B6D4';
  const rightX = mode === 'attract' ? -55 : mode === 'repel' ? 55 : 0;

  const MagnetBar = ({ pole1, pole2, isRight }) => (
    <div style={{ display: 'flex', borderRadius: '14px', overflow: 'hidden', boxShadow: mode ? `0 0 28px ${fieldColor}66` : '0 4px 20px rgba(0,0,0,0.5)', transition: 'box-shadow 0.4s ease' }}>
      <div style={{ background: pole1 === 'N' ? '#DC2626' : '#1D4ED8', color: '#fff', padding: '1.1rem 1.35rem', fontWeight: 900, fontSize: '1.4rem', minWidth: '56px', textAlign: 'center', letterSpacing: '-1px' }}>{pole1}</div>
      <div style={{ background: '#1A2332', padding: '1.1rem 2.25rem', display: 'flex', alignItems: 'center', color: '#334155', fontWeight: 800, fontSize: '1rem' }}>━━━━━━</div>
      <div style={{ background: pole2 === 'S' ? '#1D4ED8' : '#DC2626', color: '#fff', padding: '1.1rem 1.35rem', fontWeight: 900, fontSize: '1.4rem', minWidth: '56px', textAlign: 'center', letterSpacing: '-1px' }}>{pole2}</div>
    </div>
  );

  return (
    <CinematicWrap>
      <LeftPanel>
        <div style={{ color: '#67E8F9', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
          🧲 Interactive Magnet Physics Demo
        </div>

        {/* Magnet pair row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>Fixed Magnet</span>
            <MagnetBar pole1="N" pole2="S" />
          </div>

          {/* Field gap visualization */}
          <div style={{ width: 80, height: 90, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {mode && [...Array(5)].map((_, i) => (
              <motion.div key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.9 - i * 0.15 }}
                transition={{ delay: i * 0.055 }}
                style={{
                  position: 'absolute',
                  top: `${i * 16 + 8}px`,
                  left: 0, right: 0,
                  height: 3,
                  background: mode === 'attract'
                    ? `linear-gradient(90deg, ${fieldColor}cc, ${fieldColor}44)`
                    : `linear-gradient(90deg, ${fieldColor}44, ${fieldColor}cc)`,
                  borderRadius: '2px',
                }}
              />
            ))}
            <AnimatePresence mode="wait">
              {mode && (
                <motion.div key={mode}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: 'absolute', top: '35%',
                    color: fieldColor, fontWeight: 900, fontSize: '1.4rem',
                    textShadow: `0 0 14px ${fieldColor}`,
                    zIndex: 2
                  }}
                >
                  {mode === 'attract' ? '←→' : '→ ←'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right (moving) magnet */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>Moving Magnet</span>
            <motion.div
              animate={{ x: rightX }}
              transition={{ type: 'spring', stiffness: 130, damping: 16 }}
            >
              <MagnetBar
                pole1={mode === 'attract' ? 'S' : 'N'}
                pole2={mode === 'attract' ? 'N' : 'S'}
              />
            </motion.div>
          </div>
        </div>

        {/* Status label */}
        <AnimatePresence mode="wait">
          {mode ? (
            <motion.div key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: '1.5rem',
                color: fieldColor, fontWeight: 900, fontSize: '1.35rem',
                textAlign: 'center', textShadow: `0 0 18px ${fieldColor}`,
                padding: '0.6rem 1.5rem', borderRadius: '14px',
                background: `${fieldColor}18`, border: `1.5px solid ${fieldColor}44`,
              }}
            >
              {mode === 'attract' ? '🔵 N → ← S — ATTRACTION FORCE!' : '🔴 N → → N — REPULSION FORCE!'}
            </motion.div>
          ) : (
            <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ marginTop: '1.5rem', color: '#64748B', fontWeight: 700, fontSize: '0.92rem', textAlign: 'center' }}>
              Press a button below to see magnetic forces in action!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { mode: 'attract', label: '🔵 Try Attraction (N→S)', activeColor: '#06B6D4', activeBg: 'rgba(6,182,212,0.2)', activeBorder: '#06B6D4', inactiveBorder: 'rgba(6,182,212,0.3)' },
            { mode: 'repel', label: '🔴 Try Repulsion (N→N)', activeColor: '#FCA5A5', activeBg: 'rgba(239,68,68,0.2)', activeBorder: '#EF4444', inactiveBorder: 'rgba(239,68,68,0.3)' },
          ].map(btn => (
            <motion.button key={btn.mode}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => selectMode(btn.mode)}
              style={{
                padding: '0.85rem 1.5rem', borderRadius: '16px',
                border: `2.5px solid ${mode === btn.mode ? btn.activeBorder : btn.inactiveBorder}`,
                background: mode === btn.mode ? btn.activeBg : 'rgba(15,23,42,0.75)',
                color: mode === btn.mode ? btn.activeColor : '#94A3B8',
                fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer',
                boxShadow: mode === btn.mode ? `0 0 22px ${btn.activeBorder}55` : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <div style={{ marginTop: '1rem', color: '#475569', fontSize: '0.78rem', fontWeight: 700 }}>
          {!viewed.attract && '— Try Attraction first'}
          {viewed.attract && !viewed.repel && '— Now try Repulsion!'}
          {canProceed && '✅ Both forces explored! Proceed on the right →'}
        </div>
      </LeftPanel>

      <RightPanel>
        <Badge>🚅 MAGLEV = MAGNETIC LEVITATION</Badge>

        <h2 style={{ margin: 0, color: TEXT_HEADING, fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.28 }}>
          What is a Maglev Train?
        </h2>

        <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.97rem', lineHeight: 1.65 }}>
          A <strong style={{ color: '#67E8F9' }}>Maglev train</strong> (Magnetic Levitation) uses powerful magnetic forces instead of wheels and engines. Two key magnetic effects make it work:
        </p>

        {/* Attraction card */}
        <motion.div
          animate={{
            borderColor: mode === 'attract' ? '#06B6D4' : 'rgba(6,182,212,0.22)',
            boxShadow: mode === 'attract' ? '0 0 22px rgba(6,182,212,0.35)' : 'none'
          }}
          transition={{ duration: 0.35 }}
          style={{ background: 'rgba(6,182,212,0.08)', border: '1.5px solid rgba(6,182,212,0.22)', borderRadius: '16px', padding: '1rem 1.2rem' }}
        >
          <div style={{ color: '#67E8F9', fontWeight: 900, fontSize: '0.95rem', marginBottom: '0.35rem' }}>🔵 Attraction — Opposite Poles</div>
          <div style={{ color: '#4ADE80', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.35rem', fontFamily: 'monospace', letterSpacing: '2px' }}>N → ← S</div>
          <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.88rem', lineHeight: 1.55 }}>
            When <strong style={{ color: '#67E8F9' }}>opposite poles face each other</strong> (North → South), magnets pull powerfully toward each other. This attractive force is used to <em>move</em> the Maglev train forward.
          </p>
        </motion.div>

        {/* Repulsion card */}
        <motion.div
          animate={{
            borderColor: mode === 'repel' ? '#EF4444' : 'rgba(239,68,68,0.22)',
            boxShadow: mode === 'repel' ? '0 0 22px rgba(239,68,68,0.35)' : 'none'
          }}
          transition={{ duration: 0.35 }}
          style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.22)', borderRadius: '16px', padding: '1rem 1.2rem' }}
        >
          <div style={{ color: '#FCA5A5', fontWeight: 900, fontSize: '0.95rem', marginBottom: '0.35rem' }}>🔴 Repulsion — Same Poles</div>
          <div style={{ color: '#FBBF24', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.35rem', fontFamily: 'monospace', letterSpacing: '2px' }}>N → → N &nbsp;/&nbsp; S ← ← S</div>
          <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.88rem', lineHeight: 1.55 }}>
            When <strong style={{ color: '#FCA5A5' }}>like poles face each other</strong>, magnets push forcefully apart. This repulsion force is used to <em>lift</em> the Maglev train off the track!
          </p>
        </motion.div>

        <div style={{ background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.28)', borderRadius: '14px', padding: '0.8rem 1rem' }}>
          <p style={{ margin: 0, color: '#FDE68A', fontSize: '0.88rem', lineHeight: 1.58, fontWeight: 700 }}>
            💡 <strong>Try both buttons on the left</strong> — you'll see the magnets physically move toward or away from each other, just like inside a real Maglev train!
          </p>
        </div>

        <ProceedBtn onClick={onNext} disabled={!canProceed}>
          {canProceed ? 'Next: How Does It Float?' : (!viewed.attract ? 'Try Attraction first' : 'Now try Repulsion!')}
        </ProceedBtn>
      </RightPanel>
    </CinematicWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — How Does the Train Float? — Levitation Physics Slider
// ══════════════════════════════════════════════════════════════════════════════
function Step2Float({ onNext }) {
  const [strength, setStrength] = useState(0);

  // Maximum lift of ~36px corresponds to full 10mm levitation
  const liftPx = Math.round((strength / 100) * 36);
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
    }}>
      {/* ── LEFT CONTAINER: LIGHT SCHEME, FULL-WIDTH IMAGE + 4 INDICATORS AT BOTTOM ── */}
      <div style={{
        flex: '1.1',
        height: '100%',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '2px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        padding: '1.25rem',
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
          justifyContent: 'space-between',
          width: '100%',
          flexShrink: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            padding: '0.35rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.5px'
          }}>
            📐 MAGLEV LEVITATION PRINCIPLE
          </div>
          <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>
            Figure 4.9 · Guideway Cross-Section
          </span>
        </div>

        {/* Full-width Image spanning edge-to-edge without empty margins */}
        <div style={{
          width: '100%',
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
            src="/FunWithMagnets/maglev_crosssection.jpg"
            alt="Maglev cross-section blueprint"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '310px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* 4 Indicator Containers placed at the bottom */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          width: '100%',
          marginTop: 'auto',
          flexShrink: 0
        }}>
          {/* Row 1, Col 1: Electric Current Flows */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            border: '1.5px solid #7DD3FC',
            borderRadius: '16px',
            padding: '0.85rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            boxShadow: '0 2px 10px rgba(14,165,233,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.15rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.45rem',
                borderRadius: '10px',
                border: '1px solid #BAE6FD'
              }}>⚡</span>
              <span style={{ color: '#0369A1', fontWeight: 900, fontSize: '0.88rem' }}>
                Electric Current Flows
              </span>
            </div>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.81rem', lineHeight: 1.5 }}>
              Electricity runs through copper coils embedded in the track guideway.
            </p>
          </div>

          {/* Row 1, Col 2: Magnetic Field Appears */}
          <div style={{
            background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
            border: '1.5px solid #67E8F9',
            borderRadius: '16px',
            padding: '0.85rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            boxShadow: '0 2px 10px rgba(6,182,212,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.15rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.45rem',
                borderRadius: '10px',
                border: '1px solid #A5F3FC'
              }}>🔵</span>
              <span style={{ color: '#0E7490', fontWeight: 900, fontSize: '0.88rem' }}>
                Magnetic Field Appears
              </span>
            </div>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.81rem', lineHeight: 1.5 }}>
              The electric coils generate a powerful upward-pointing magnetic field.
            </p>
          </div>

          {/* Row 2, Col 1: Train Lifts Off */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            border: '1.5px solid #86EFAC',
            borderRadius: '16px',
            padding: '0.85rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            boxShadow: '0 2px 10px rgba(34,197,94,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.15rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.45rem',
                borderRadius: '10px',
                border: '1px solid #BBF7D0'
              }}>🚅</span>
              <span style={{ color: '#15803D', fontWeight: 900, fontSize: '0.88rem' }}>
                Train Lifts Off
              </span>
            </div>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.81rem', lineHeight: 1.5 }}>
              The magnetic field repels the train's superconducting magnets, lifting it up.
            </p>
          </div>

          {/* Row 2, Col 2: Gap is Precisely Controlled */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1.5px solid #FCD34D',
            borderRadius: '16px',
            padding: '0.85rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            boxShadow: '0 2px 10px rgba(245,158,11,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.15rem',
                background: '#FFFFFF',
                padding: '0.25rem 0.45rem',
                borderRadius: '10px',
                border: '1px solid #FDE68A'
              }}>📐</span>
              <span style={{ color: '#B45309', fontWeight: 900, fontSize: '0.88rem' }}>
                Gap is Precisely Controlled
              </span>
            </div>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.81rem', lineHeight: 1.5 }}>
              Sensors adjust current continuously to maintain a stable 10mm levitation gap.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT CONTAINER: LIGHT SCHEME, INTERACTIVE SIMULATION AT TOP + CONTENT BENEATH ── */}
      <div style={{
        flex: '0.9',
        height: '100%',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '2px solid #BAE6FD',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        padding: '1.25rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        overflowY: 'auto'
      }}>
        {/* Interactive Train Lifting Activity simulation container at the top */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
          border: '1.5px solid #CBD5E1',
          borderRadius: '18px',
          padding: '1rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          flexShrink: 0
        }}>
          {/* Header with status badges */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{
                width: 9, height: 9, borderRadius: '50%',
                background: strength > 0 ? '#0284C7' : '#94A3B8',
                boxShadow: strength > 0 ? '0 0 10px #38BDF8' : 'none',
                transition: 'all 0.25s'
              }} />
              <span style={{ color: '#0F172A', fontWeight: 900, fontSize: '0.82rem', letterSpacing: '0.5px' }}>
                TRAIN LIFTING SIMULATION
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <span style={{
                background: '#FFFBEB', border: '1.5px solid #FCD34D',
                color: '#B45309', padding: '0.2rem 0.6rem', borderRadius: '10px',
                fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace'
              }}>
                Gap: {gapMm} mm
              </span>
              <span style={{
                background: '#F0F9FF', border: '1.5px solid #7DD3FC',
                color: '#0369A1', padding: '0.2rem 0.6rem', borderRadius: '10px',
                fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace'
              }}>
                Force: {magneticForce} N
              </span>
            </div>
          </div>

          {/* Interactive Visual Stage — Light clean testing dock with ONLY the train model visibly lifting */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '170px',
            background: 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
            borderRadius: '14px',
            border: '1.5px solid #CBD5E1',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 0.5rem 0.5rem 0.5rem',
            boxSizing: 'border-box'
          }}>
            {/* Soft background grid lines */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px', pointerEvents: 'none'
            }} />

            {/* Glowing magnetic cushion aura when active */}
            {strength > 0 && (
              <div style={{
                position: 'absolute',
                bottom: 34,
                left: '5%',
                right: '5%',
                height: 30,
                background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.45) 0%, rgba(14,165,233,0) 75%)',
                opacity: 0.4 + glowA * 0.6,
                filter: 'blur(6px)',
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease'
              }} />
            )}

            {/* REALISTIC MAGLEV TRAIN — Vector rendered with NO black box, only the train lifts */}
            <motion.div
              animate={{ y: -liftPx }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              style={{
                position: 'relative',
                zIndex: 3,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformOrigin: 'bottom center'
              }}
            >
              <svg viewBox="0 0 540 96" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                  {/* Roof pearlescent gradient */}
                  <linearGradient id="trainWhiteRoof" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>
                  {/* Aero cyan stripe */}
                  <linearGradient id="trainAeroCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  {/* Skirt gradient */}
                  <linearGradient id="trainLowerSkirt" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                  {/* Window glass */}
                  <linearGradient id="trainWindows" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="35%" stopColor="#0F172A" />
                    <stop offset="70%" stopColor="#0284C7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0C4A6E" />
                  </linearGradient>
                  {/* Glow filter for coils */}
                  <filter id="superCoilGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation={1.5 + glowA * 2.5} result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Train Aerodynamic Shell */}
                <path
                  d="M 22 68
                     L 22 26
                     Q 26 12, 48 12
                     L 415 12
                     Q 470 12, 510 36
                     Q 532 50, 526 62
                     Q 516 68, 485 68
                     Z"
                  fill="url(#trainWhiteRoof)"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                />

                {/* Electric Cyan Aero Wave Stripe */}
                <path
                  d="M 22 46
                     L 425 46
                     Q 475 46, 516 58
                     L 513 64
                     Q 470 52, 422 52
                     L 22 52
                     Z"
                  fill="url(#trainAeroCyan)"
                />

                {/* Amber Racing Trim */}
                <path
                  d="M 22 53
                     L 428 53
                     Q 472 53, 510 63
                     L 508 65
                     Q 470 55, 428 55
                     L 22 55
                     Z"
                  fill="#F59E0B"
                />

                {/* Cockpit Driver Windshield */}
                <path
                  d="M 448 18
                     L 486 18
                     Q 514 36, 520 48
                     L 472 48
                     Q 458 35, 448 18
                     Z"
                  fill="url(#trainWindows)"
                  stroke="#0284C7"
                  strokeWidth="1"
                />
                <path d="M 454 22 Q 482 22, 504 42" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />

                {/* Front Projector Headlight */}
                <ellipse cx="522" cy="55" rx="3.5" ry="2.2" fill="#38BDF8" />
                <ellipse cx="522" cy="55" rx="1.8" ry="1.1" fill="#FFFFFF" />

                {/* Passenger Windows (5 panoramic modules) */}
                {[60, 130, 200, 270, 340].map((wx, i) => (
                  <g key={i}>
                    <rect
                      x={wx}
                      y="20"
                      width="54"
                      height="20"
                      rx="4"
                      fill="url(#trainWindows)"
                      stroke="#64748B"
                      strokeWidth="1"
                    />
                    <line x1={wx + 6} y1="22" x2={wx + 20} y2="38" stroke="#FFFFFF" strokeWidth="1" opacity="0.25" />
                  </g>
                ))}

                {/* Side Brand Decal */}
                <text x="235" y="62" fill="#0369A1" fontSize="8" fontWeight="900" letterSpacing="1.5px">
                  MAGLEV 01 · FUTURA HIGH-SPEED
                </text>

                {/* Undercarriage Skirt (wraps down around track) */}
                <rect x="22" y="68" width="468" height="15" rx="3" fill="url(#trainSkirtGrad)" stroke="#1E293B" strokeWidth="1" />

                {/* Superconducting Magnet Pods */}
                {[45, 115, 185, 255, 325, 395].map((mx, idx) => (
                  <g key={idx}>
                    <rect
                      x={mx}
                      y="71"
                      width="46"
                      height="9"
                      rx="3"
                      fill={strength > 0 ? `rgba(6,182,212,${0.35 + glowA * 0.65})` : "#1E293B"}
                      stroke={strength > 0 ? "#06B6D4" : "#475569"}
                      strokeWidth="1.2"
                      filter={strength > 5 ? "url(#superCoilGlow)" : "none"}
                    />
                    <circle cx={mx + 10} cy="75.5" r="2.2" fill={strength > 0 ? "#67E8F9" : "#64748B"} />
                    <circle cx={mx + 36} cy="75.5" r="2.2" fill={strength > 0 ? "#67E8F9" : "#64748B"} />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Dynamic Levitation Gap & Upward Magnetic Field Flux */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: `${Math.max(6, liftPx)}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              pointerEvents: 'none',
              transition: 'height 0.1s ease',
              margin: '1px 0'
            }}>
              {/* Dynamic Ground Shadow underneath the train */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '6%',
                right: '8%',
                height: '4px',
                background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0) 75%)',
                opacity: Math.max(0.12, 0.45 - (liftPx / 36) * 0.3),
                transform: `scaleX(${1 + (liftPx / 36) * 0.15})`,
                filter: `blur(${1 + (liftPx / 36) * 3}px)`,
                transition: 'all 0.15s ease'
              }} />

              {/* Pulsating upward flux rays when active */}
              {strength > 5 && [1, 2, 3, 4, 5, 6, 7].map(k => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.35, 0.95, 0.35],
                    scaleY: [0.8, 1.25, 0.8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.75 + (k % 3) * 0.2,
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

              {/* Levitation Gap Caliper badge */}
              {strength > 0 && (
                <div style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: '#FFFFFF',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                  border: '1.5px solid #F59E0B',
                  boxShadow: '0 2px 8px rgba(245,158,11,0.25)',
                  zIndex: 5
                }}>
                  <span style={{ color: '#D97706', fontSize: '0.75rem', fontWeight: 900 }}>↕</span>
                  <span style={{ color: '#B45309', fontWeight: 900, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    {gapMm} mm
                  </span>
                </div>
              )}
            </div>

            {/* High-Tech Guideway Track with 6 Stator Coils */}
            <div style={{
              width: '100%',
              height: '32px',
              background: 'linear-gradient(180deg, #94A3B8 0%, #64748B 100%)',
              borderRadius: '8px',
              border: '1.5px solid #475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 0.5rem',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
            }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '20px',
                    borderRadius: '5px',
                    background: strength > 0
                      ? `linear-gradient(180deg, #0284C7 0%, #0369A1 100%)`
                      : 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                    border: `1.5px solid ${strength > 0 ? '#38BDF8' : '#64748B'}`,
                    boxShadow: strength > 0 ? `0 0 10px rgba(14,165,233,${0.4 + glowA * 0.5})` : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span style={{
                    color: strength > 0 ? '#FFFFFF' : '#CBD5E1',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    letterSpacing: '0.3px'
                  }}>
                    EM {i}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Control */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 800 }}>
                🔋 Electromagnetic Strength
              </span>
              <span style={{
                color: strength > 0 ? '#0284C7' : '#64748B',
                fontWeight: 900,
                fontSize: '0.92rem',
                fontFamily: 'monospace',
                background: '#F0F9FF',
                padding: '0.15rem 0.55rem',
                borderRadius: '8px',
                border: '1px solid #BAE6FD'
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
                height: '7px',
                borderRadius: '4px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.72rem', fontWeight: 700, marginTop: '0.2rem' }}>
              <span>0% (On Track)</span>
              <span>50% (Lift-Off)</span>
              <span>100% (Full 10mm Hover)</span>
            </div>
          </div>
        </div>

        {/* Content displayed beneath the simulation */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          border: '1.5px solid #7DD3FC',
          color: '#0369A1',
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          fontSize: '0.77rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          width: 'fit-content'
        }}>
          🔬 MAGNETIC LEVITATION PHYSICS
        </div>

        <h2 style={{ margin: 0, color: '#0F172A', fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.25 }}>
          How Does the Train Float?
        </h2>

        <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Electromagnetic coils are embedded in the guideway track below the train. When electric current flows through them, they create a powerful <strong style={{ color: '#0284C7' }}>upward magnetic force</strong> that lifts the train.
        </p>

        {/* Force Balance Card — Clean Light Scheme */}
        <div style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
          border: '1.5px solid #CBD5E1',
          borderRadius: '16px',
          padding: '1rem 1.15rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
        }}>
          <div style={{ color: '#0F172A', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.4px' }}>
            ⚖️ Force Balance:
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0.65rem 0.9rem',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
              <div style={{ color: '#0284C7', fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>↑</div>
              <div style={{ color: '#0369A1', fontWeight: 800, fontSize: '0.82rem' }}>Magnetic Force</div>
              <div style={{ color: '#0284C7', fontWeight: 900, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                {magneticForce} N
              </div>
            </div>
            <div style={{ color: '#94A3B8', fontWeight: 900, fontSize: '1.1rem' }}>vs</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
              <div style={{ color: '#D97706', fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>↓</div>
              <div style={{ color: '#B45309', fontWeight: 800, fontSize: '0.82rem' }}>Weight / Gravity</div>
              <div style={{ color: '#D97706', fontWeight: 900, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                9.8 N/kg
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: '0.6rem',
            color: strength < 20 ? '#64748B' : strength < 55 ? '#B45309' : strength < 85 ? '#15803D' : '#0369A1',
            fontSize: '0.84rem',
            lineHeight: 1.5,
            fontWeight: 700
          }}>
            {strength < 20 ? '⚪ Increase magnetic strength to lift the train above the guideway.' :
             strength < 55 ? '🟡 Magnetic force is building — train begins to rise from the track.' :
             strength < 85 ? '🟢 Balanced levitation — train hovers stably at optimal height!' :
             '🔵 Maximum magnetic power — full levitation, maximum gap achieved!'}
          </div>
        </div>

        <ProceedBtn onClick={onNext} disabled={strength < 50}>
          {strength >= 50 ? 'Next: How Does It Move?' : `Increase strength to 50% to test lift (currently ${strength}%)`}
        </ProceedBtn>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 3 — How Does the Train Move? — Propulsion Sequence
// ══════════════════════════════════════════════════════════════════════════════
function Step3Move({ onNext }) {
  const [propStep, setPropStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [viewedAll, setViewedAll] = useState(false);
  const timerRef = useRef(null);

  const PROP_INFO = [
    {
      title: 'Step 1 — Pull (Ahead Magnet ON)',
      desc: 'The electromagnet directly in front of the train activates. Its magnetic field lines reach toward the train. Attraction pulls the train forward!',
      activeCoil: 1, trainIdx: 0
    },
    {
      title: 'Step 2 — Release (Arrive & Switch OFF)',
      desc: 'Just as the train arrives at the magnet\'s position, the electromagnet switches OFF. This prevents the train from being held back by attraction.',
      activeCoil: -1, trainIdx: 1
    },
    {
      title: 'Step 3 — Next (Next Ahead Magnet ON)',
      desc: 'The next electromagnet further ahead switches ON. The traveling magnetic field effectively moves forward along the track.',
      activeCoil: 2, trainIdx: 1
    },
    {
      title: 'Step 4 — Follow (Train Catches Up)',
      desc: 'The sequence repeats: ON → OFF → ON → OFF. The train smoothly chases the traveling magnetic field along the entire track!',
      activeCoil: 3, trainIdx: 2
    },
  ];

  const COIL_XS = [70, 170, 270, 370, 470];
  const TRAIN_DX = [0, 100, 200]; // delta x for train position

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setPropStep(prev => {
          const next = (prev + 1) % 4;
          if (next === 3) setViewedAll(true);
          return next;
        });
      }, 1900);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [autoPlay]);

  const goNext = () => {
    setAutoPlay(false);
    setPropStep(prev => {
      const next = Math.min(prev + 1, 3);
      if (next === 3) setViewedAll(true);
      return next;
    });
  };

  const cur = propStep >= 0 ? PROP_INFO[propStep] : null;
  const activeCoil = cur?.activeCoil ?? -1;
  const trainDx = cur ? TRAIN_DX[cur.trainIdx] : 0;

  return (
    <CinematicWrap style={{ flexDirection: 'column', gap: '0.85rem' }}>
      {/* Main animation panel */}
      <div style={{ flex: 1.5, width: '100%', ...CARD_GLASS, padding: '1rem 1.25rem', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ color: '#67E8F9', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            ⚡ Electromagnetic Propulsion Track
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => { setAutoPlay(false); setPropStep(p => Math.max(-1, p - 1)); }}
              disabled={propStep < 0}
              style={{ padding: '0.45rem 0.85rem', borderRadius: '10px', border: '1.5px solid rgba(56,189,248,0.3)', background: 'rgba(15,23,42,0.7)', color: propStep < 0 ? '#334155' : '#94A3B8', fontWeight: 800, fontSize: '0.8rem', cursor: propStep < 0 ? 'not-allowed' : 'pointer' }}>
              ◀ Prev
            </button>
            <button onClick={goNext}
              disabled={propStep >= 3}
              style={{ padding: '0.45rem 0.85rem', borderRadius: '10px', border: `1.5px solid ${propStep < 3 ? 'rgba(6,182,212,0.5)' : 'rgba(56,189,248,0.15)'}`, background: propStep < 3 ? 'rgba(6,182,212,0.18)' : 'rgba(15,23,42,0.5)', color: propStep < 3 ? '#67E8F9' : '#334155', fontWeight: 800, fontSize: '0.8rem', cursor: propStep >= 3 ? 'not-allowed' : 'pointer' }}>
              Next ▶
            </button>
            <button onClick={() => setAutoPlay(p => !p)}
              style={{ padding: '0.45rem 0.85rem', borderRadius: '10px', border: `1.5px solid ${autoPlay ? '#F59E0B' : 'rgba(245,158,11,0.3)'}`, background: autoPlay ? 'rgba(245,158,11,0.2)' : 'rgba(15,23,42,0.7)', color: autoPlay ? '#FBBF24' : '#94A3B8', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {autoPlay ? '⏸ Pause' : '▶ Auto-play'}
            </button>
            <button onClick={() => { setAutoPlay(false); setPropStep(-1); }}
              style={{ padding: '0.45rem 0.85rem', borderRadius: '10px', border: '1.5px solid rgba(56,189,248,0.18)', background: 'rgba(15,23,42,0.7)', color: '#64748B', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Track SVG */}
        <svg viewBox="0 0 550 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', flex: 1 }}>
          <defs>
            <filter id="s3CoilGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Track */}
          <rect x="12" y="110" width="528" height="22" rx="8" fill="#1A2535" stroke="#2D3F52" strokeWidth="1.5" />
          <line x1="12" y1="114" x2="540" y2="114" stroke="#38BDF8" strokeWidth="1.5" opacity="0.35" />
          <line x1="12" y1="128" x2="540" y2="128" stroke="#38BDF8" strokeWidth="1.5" opacity="0.35" />

          {/* Coils */}
          {COIL_XS.map((cx, i) => {
            const isActive = i === activeCoil;
            return (
              <g key={i}>
                <rect x={cx - 30} y="96" width="60" height="14" rx="5"
                  fill={isActive ? 'rgba(6,182,212,0.85)' : 'rgba(20,35,52,0.95)'}
                  stroke={isActive ? '#67E8F9' : '#2D3F52'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  filter={isActive ? "url(#s3CoilGlow)" : "none"}
                />
                <text x={cx} y="106" textAnchor="middle" fill={isActive ? '#FFFFFF' : '#4B5E72'} fontSize="9" fontWeight="bold">
                  {isActive ? '⚡ ON' : 'OFF'}
                </text>
                {/* Active field lines pointing toward train */}
                {isActive && [-18, -6, 6, 18].map((dx, j) => (
                  <line key={j} x1={cx + dx} y1="95" x2={cx + dx} y2={68}
                    stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4,3" opacity={0.7 - j * 0.1} />
                ))}
                {isActive && (
                  <ellipse cx={cx} cy={62} rx="26" ry="9"
                    fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.6" />
                )}
                {/* Coil number */}
                <text x={cx} y="148" textAnchor="middle" fill="#2D3F52" fontSize="9">Coil {i + 1}</text>
              </g>
            );
          })}

          {/* Direction arrow line */}
          {[130, 230, 330, 430].map((ax, i) => (
            <text key={i} x={ax} y="58" textAnchor="middle" fill="#2D3F52" fontSize="18" opacity="0.7">→</text>
          ))}
          <text x="275" y="30" textAnchor="middle" fill="#2D3F52" fontSize="10" fontWeight="bold" opacity="0.6">Direction of Travel ➔</text>

          {/* TRAIN */}
          <motion.g
            animate={{ x: trainDx }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          >
            {/* Maglev skirt */}
            <rect x="18" y="106" width="120" height="14" rx="5" fill="rgba(14,116,144,0.85)" stroke="#06B6D4" strokeWidth="1.5" />
            {/* Train body */}
            <rect x="12" y="66" width="132" height="42" rx="10" fill="#1C2A35" stroke="#2D3F52" strokeWidth="1.5" />
            {/* Top accent */}
            <rect x="12" y="66" width="132" height="5" rx="2" fill="#0EA5E9" opacity="0.8" />
            {/* Bottom accent */}
            <rect x="12" y="100" width="132" height="6" rx="3" fill="#F59E0B" />
            {/* Windows */}
            {[20, 58, 96].map((wx, i) => (
              <rect key={i} x={wx} y="74" width="28" height="18" rx="4" fill="#0C4A6E" stroke="#0EA5E9" strokeWidth="1" />
            ))}
            {/* Nose */}
            <path d="M144 66 Q162 87 144 108 Z" fill="#1A2535" stroke="#2D3F52" strokeWidth="1" />
            <path d="M144 69 Q159 87 144 105" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.7" />
            <text x="78" y="88" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontWeight="bold">MAGLEV</text>
          </motion.g>
        </svg>

        {/* ON/OFF pattern */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: TEXT_BODY, fontSize: '0.8rem', fontWeight: 700 }}>Magnetic Pattern:</span>
          {['ON', 'OFF', 'ON', 'OFF', 'ON'].map((s, i) => (
            <span key={i} style={{ padding: '0.22rem 0.6rem', borderRadius: '8px', fontWeight: 900, fontSize: '0.75rem', background: s === 'ON' ? 'rgba(6,182,212,0.22)' : 'rgba(30,41,59,0.8)', color: s === 'ON' ? '#67E8F9' : '#475569', border: `1px solid ${s === 'ON' ? 'rgba(6,182,212,0.4)' : '#334155'}` }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom info row */}
      <div style={{ flex: 0.5, width: '100%', display: 'flex', gap: '0.85rem', minHeight: 0 }}>
        {/* Step description */}
        <div style={{ flex: 2.2, ...CARD_GLASS, padding: '0.9rem 1.1rem', boxSizing: 'border-box', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {propStep < 0 ? (
              <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ color: '#67E8F9', fontWeight: 900, fontSize: '0.95rem', marginBottom: '0.4rem' }}>🔬 How Does the Maglev Train Move Forward?</div>
                <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.87rem', lineHeight: 1.6 }}>
                  Instead of an engine pushing against the track, <strong style={{ color: '#67E8F9' }}>controlled magnetic forces pull and push the train forward</strong>. Press "Next" or "Auto-play" to see each of the 4 steps!
                </p>
              </motion.div>
            ) : (
              <motion.div key={propStep} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ background: 'rgba(6,182,212,0.2)', border: '1.5px solid #06B6D4', color: '#67E8F9', borderRadius: '8px', padding: '0.15rem 0.6rem', fontWeight: 900, fontSize: '0.75rem' }}>{propStep + 1}/4</span>
                  <span style={{ color: TEXT_HEADING, fontWeight: 900, fontSize: '0.92rem' }}>{PROP_INFO[propStep].title}</span>
                </div>
                <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.86rem', lineHeight: 1.6 }}>{PROP_INFO[propStep].desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quote + Proceed */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ ...CARD_GLASS, padding: '0.75rem 0.9rem', flex: 1, display: 'flex', alignItems: 'center', borderColor: 'rgba(245,158,11,0.28)', background: 'rgba(245,158,11,0.07)' }}>
            <p style={{ margin: 0, color: '#FDE68A', fontSize: '0.83rem', lineHeight: 1.55, fontWeight: 700, fontStyle: 'italic' }}>
              "Instead of an engine pushing against the track, controlled magnetic forces pull and push the train forward."
            </p>
          </div>
          <ProceedBtn onClick={onNext} disabled={!viewedAll}>
            {viewedAll ? 'Next: EM Control' : `Watch all 4 steps`}
          </ProceedBtn>
        </div>
      </div>
    </CinematicWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 4 — Electromagnetic Control — ON/OFF Demo
// ══════════════════════════════════════════════════════════════════════════════
function Step4Control({ onNext }) {
  const [powerOn, setPowerOn] = useState(false);
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setPowerOn(p => !p);
    setToggled(true);
  };

  return (
    <CinematicWrap>
      <LeftPanel>
        <div style={{ color: '#67E8F9', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          ⚡ Electromagnet Control Demo
        </div>

        <svg viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '380px', flex: 1 }}>
          <defs>
            <filter id="s4GlowF">
              <feGaussianBlur stdDeviation={powerOn ? 5 : 1} result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="s4CoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B7280" /><stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>

          {/* Battery */}
          <rect x="30" y="105" width="52" height="80" rx="8" fill="#1A2535" stroke={powerOn ? '#FBBF24' : '#2D3F52'} strokeWidth="2.5" />
          <text x="56" y="140" textAnchor="middle" fill={powerOn ? '#FBBF24' : '#4B5E72'} fontSize="18">⚡</text>
          <text x="56" y="158" textAnchor="middle" fill={powerOn ? '#FBBF24' : '#4B5E72'} fontSize="9" fontWeight="bold">POWER</text>
          {/* Battery terminals */}
          <line x1="45" y1="103" x2="67" y2="103" stroke={powerOn ? '#FBBF24' : '#4B5E72'} strokeWidth="3.5" />
          <line x1="50" y1="187" x2="62" y2="187" stroke={powerOn ? '#FBBF24' : '#4B5E72'} strokeWidth="2.5" />

          {/* Wire circuit path */}
          <path d="M 56 105 L 56 58 L 315 58 L 365 58 L 365 250 L 315 250 L 56 250 L 56 187"
            fill="none" stroke={powerOn ? '#374151' : '#1A2535'} strokeWidth="5" strokeLinecap="round" />

          {/* Electricity flow animation along wire */}
          {powerOn && (
            <motion.path
              d="M 56 105 L 56 58 L 315 58 L 365 58 L 365 250 L 315 250 L 56 250 L 56 187"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="20 16"
              animate={{ strokeDashoffset: [0, -144] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 5px #FBBF24)' }}
              opacity="0.85"
            />
          )}

          {/* IRON CORE */}
          <rect x="165" y="128" width="150" height="64" rx="9" fill="url(#s4CoreGrad)" stroke="#9CA3AF" strokeWidth="2" />
          <text x="240" y="163" textAnchor="middle" fill="#D1D5DB" fontSize="11" fontWeight="bold">Iron Core</text>

          {/* WIRE COIL WRAPPINGS (helical) */}
          {[0,1,2,3,4,5,6,7,8,9,10].map(i => {
            const cx = 170 + i * 13.5;
            return (
              <g key={i}>
                <path d={`M ${cx} 123 Q ${cx + 6.75} 108 ${cx + 13.5} 123`} fill="none"
                  stroke={powerOn ? '#06B6D4' : '#2D4060'} strokeWidth="2.5"
                  filter={powerOn ? "url(#s4GlowF)" : "none"} />
                <path d={`M ${cx} 192 Q ${cx + 6.75} 207 ${cx + 13.5} 192`} fill="none"
                  stroke={powerOn ? '#06B6D4' : '#2D4060'} strokeWidth="2.5"
                  filter={powerOn ? "url(#s4GlowF)" : "none"} />
              </g>
            );
          })}

          {/* Pole labels */}
          <text x="168" y="118" textAnchor="middle" fill={powerOn ? '#EF4444' : '#475569'} fontSize="16" fontWeight="900">N</text>
          <text x="318" y="118" textAnchor="middle" fill={powerOn ? '#3B82F6' : '#475569'} fontSize="16" fontWeight="900">S</text>

          {/* Magnetic field lines from each pole */}
          {powerOn && [-28,-14,0,14,28].map((dy, i) => (
            <g key={i}>
              <motion.path
                d={`M 162 ${160 + dy} Q 115 ${160 + dy * 0.5} 105 160`}
                fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="6,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.65 - Math.abs(i - 2) * 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              />
              <motion.path
                d={`M 318 ${160 + dy} Q 365 ${160 + dy * 0.5} 378 160`}
                fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.65 - Math.abs(i - 2) * 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              />
            </g>
          ))}

          {/* Status label */}
          <rect x="130" y="278" width="220" height="28" rx="8"
            fill={powerOn ? 'rgba(6,182,212,0.2)' : 'rgba(20,35,52,0.85)'}
            stroke={powerOn ? '#06B6D4' : '#2D3F52'} strokeWidth="1.5" />
          <text x="240" y="296" textAnchor="middle" fill={powerOn ? '#67E8F9' : '#475569'} fontSize="11" fontWeight="bold">
            {powerOn ? '⚡ Magnetic Field ACTIVE' : '○ No Magnetic Field'}
          </text>
        </svg>

        {/* Power button */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={toggle}
          style={{
            marginTop: '0.85rem', padding: '0.9rem 2.25rem', borderRadius: '18px', border: 'none',
            background: powerOn
              ? 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)'
              : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            color: '#FFFFFF', fontWeight: 900, fontSize: '1.05rem', cursor: 'pointer',
            boxShadow: powerOn ? '0 6px 24px rgba(6,182,212,0.5)' : '0 6px 24px rgba(239,68,68,0.45)',
            display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'all 0.3s ease',
          }}
        >
          {powerOn ? <><Zap size={21} /> POWER OFF</> : <><ZapOff size={21} /> POWER ON</>}
        </motion.button>
      </LeftPanel>

      <RightPanel>
        <Badge>🔌 ELECTROMAGNETIC CONTROL</Badge>

        <h2 style={{ margin: 0, color: TEXT_HEADING, fontSize: '1.48rem', fontWeight: 900, lineHeight: 1.28 }}>
          Why Do We Use Electromagnets?
        </h2>

        <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.95rem', lineHeight: 1.65 }}>
          Unlike permanent magnets, an <strong style={{ color: '#67E8F9' }}>electromagnet's magnetic force can be switched ON and OFF</strong> — and even reversed — simply by controlling the electric current flowing through it.
        </p>

        {/* Chain reaction visualization */}
        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1.5px solid rgba(56,189,248,0.2)', borderRadius: '16px', padding: '1rem 1.1rem' }}>
          <div style={{ color: '#67E8F9', fontWeight: 900, fontSize: '0.85rem', marginBottom: '0.7rem' }}>⚡ The Chain Reaction:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.45rem' }}>
            {['Electricity', '→', 'Coil', '→', 'Magnetic Field', '→', 'Train Moves'].map((s, i) => (
              s === '→' ? (
                <motion.span key={i}
                  animate={{ color: powerOn ? '#06B6D4' : '#334155' }}
                  style={{ fontSize: '1.1rem', fontWeight: 900, transition: 'color 0.4s' }}>→</motion.span>
              ) : (
                <motion.div key={i}
                  animate={{
                    background: powerOn ? 'rgba(6,182,212,0.18)' : 'rgba(20,35,52,0.85)',
                    borderColor: powerOn ? 'rgba(6,182,212,0.5)' : '#2D3F52',
                    color: powerOn ? '#67E8F9' : '#4B5E72'
                  }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  style={{ padding: '0.35rem 0.7rem', borderRadius: '10px', border: '1.5px solid #2D3F52', fontWeight: 800, fontSize: '0.8rem' }}>
                  {s}
                </motion.div>
              )
            ))}
          </div>
        </div>

        {/* Key advantages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ color: '#E0F2FE', fontWeight: 800, fontSize: '0.88rem' }}>✨ Why Electromagnets Are So Useful:</div>
          {[
            { icon: '⚡', text: 'Can be switched ON and OFF instantly with electricity' },
            { icon: '🔄', text: 'Magnetic polarity (N/S) reversed by reversing current direction' },
            { icon: '📊', text: 'Strength precisely controlled by varying current level' },
            { icon: '🎯', text: 'Perfect for fast, dynamic, computer-controlled systems like Maglev!' },
          ].map((item, i) => (
            <motion.div key={i}
              animate={{ background: powerOn ? 'rgba(6,182,212,0.09)' : 'rgba(15,23,42,0.5)' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.6rem', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.1)' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: TEXT_BODY, fontSize: '0.84rem', lineHeight: 1.5 }}>{item.text}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.28)', borderRadius: '14px', padding: '0.8rem 1rem' }}>
          <p style={{ margin: 0, color: '#FDE68A', fontSize: '0.88rem', lineHeight: 1.58, fontWeight: 700 }}>
            🚀 <strong>You're now ready!</strong> In the next challenge, you'll actually control a Maglev train using these electromagnetic principles — just like a real Maglev system!
          </p>
        </div>

        <ProceedBtn onClick={onNext} disabled={!toggled}>
          {toggled ? 'Next: Challenge — Control It!' : 'Press POWER ON / OFF first'}
        </ProceedBtn>
      </RightPanel>
    </CinematicWrap>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 5 — Challenge: Control the Maglev! — Mini Control Demo
// ══════════════════════════════════════════════════════════════════════════════
function Step5Challenge({ onNext }) {
  const [trainPos, setTrainPos] = useState('C');
  const [activeJunction, setActiveJunction] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [done, setDone] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const TARGET = 'E';

  const JUNCTIONS = {
    C: { cx: 200, cy: 150, label: 'CTR' },
    N: { cx: 200, cy: 52,  label: 'N' },
    S: { cx: 200, cy: 248, label: 'S' },
    E: { cx: 326, cy: 150, label: 'E' },
    W: { cx: 74,  cy: 150, label: 'W' },
  };

  const handleMove = (dir) => {
    if (isMoving || done) return;
    setActiveJunction(dir);
    setIsMoving(true);
    setMoveCount(c => c + 1);
    setTimeout(() => {
      setTrainPos(dir);
      setIsMoving(false);
      setActiveJunction(null);
      if (dir === TARGET) setDone(true);
    }, 950);
  };

  const reset = () => {
    setTrainPos('C');
    setActiveJunction(null);
    setIsMoving(false);
    setDone(false);
    setMoveCount(0);
  };

  const tPos = JUNCTIONS[trainPos];
  const targetPos = JUNCTIONS[TARGET];

  return (
    <CinematicWrap>
      <LeftPanel>
        <div style={{ color: '#67E8F9', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          🎮 Maglev Control Challenge
        </div>

        {/* Bird's-eye map SVG */}
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '380px', flex: 1 }}>
          <defs>
            <filter id="s5JGlow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="s5TGlow"><feGaussianBlur stdDeviation="9" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <radialGradient id="s5TgtGrad"><stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" /><stop offset="100%" stopColor="#D97706" stopOpacity="0.4" /></radialGradient>
          </defs>

          {/* TRACKS */}
          <line x1="200" y1="52" x2="200" y2="248" stroke="#1A2535" strokeWidth="20" strokeLinecap="round" />
          <line x1="200" y1="52" x2="200" y2="248" stroke="#2D3F52" strokeWidth="15" strokeLinecap="round" />
          <line x1="196" y1="52" x2="196" y2="248" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.35" />
          <line x1="204" y1="52" x2="204" y2="248" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.35" />

          <line x1="74" y1="150" x2="326" y2="150" stroke="#1A2535" strokeWidth="20" strokeLinecap="round" />
          <line x1="74" y1="150" x2="326" y2="150" stroke="#2D3F52" strokeWidth="15" strokeLinecap="round" />
          <line x1="74" y1="146" x2="326" y2="146" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.35" />
          <line x1="74" y1="154" x2="326" y2="154" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.35" />

          {/* Magnetic beam from active junction to train */}
          {activeJunction && (() => {
            const from = JUNCTIONS[activeJunction];
            const to = JUNCTIONS[trainPos];
            return (
              <motion.line x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
                stroke="#06B6D4" strokeWidth="5" strokeDasharray="12,7"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 1, 0.6] }}
                transition={{ duration: 0.5, repeat: 2 }}
                style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }}
              />
            );
          })()}

          {/* Junction nodes (N, S, E, W) */}
          {['N', 'S', 'E', 'W'].map(key => {
            const pos = JUNCTIONS[key];
            const isTarget = key === TARGET;
            const isActive = key === activeJunction;
            const isReached = done && key === trainPos;
            const r = isActive ? 24 : 20;
            return (
              <g key={key}>
                {/* Target pulse ring */}
                {isTarget && !done && (
                  <motion.circle cx={pos.cx} cy={pos.cy} r={26}
                    fill="none" stroke="#F59E0B" strokeWidth="2"
                    animate={{ r: [26, 42], opacity: [0.9, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }} />
                )}
                <circle cx={pos.cx} cy={pos.cy} r={r}
                  fill={isTarget && !done ? 'url(#s5TgtGrad)' : isActive ? 'rgba(6,182,212,0.7)' : isReached ? 'rgba(74,222,128,0.65)' : 'rgba(20,35,52,0.95)'}
                  stroke={isTarget && !done ? '#F59E0B' : isActive ? '#06B6D4' : isReached ? '#4ADE80' : '#2D3F52'}
                  strokeWidth={isActive || isTarget ? 3 : 2}
                  filter={isActive ? "url(#s5JGlow)" : isTarget ? "url(#s5TGlow)" : "none"}
                />
                <text x={pos.cx} y={pos.cy + 5} textAnchor="middle"
                  fill={isActive || isReached ? '#FFFFFF' : isTarget && !done ? '#FFFFFF' : '#4B5E72'}
                  fontSize={isTarget && !done ? '16' : '13'} fontWeight="bold"
                >
                  {isTarget && !done ? '🎯' : isReached ? '✓' : key}
                </text>
                {isActive && (
                  <text x={pos.cx} y={pos.cy - 30} textAnchor="middle" fill="#67E8F9" fontSize="9" fontWeight="bold">⚡ EM ON</text>
                )}
              </g>
            );
          })}

          {/* Center hub */}
          <circle cx="200" cy="150" r="15" fill="rgba(15,23,42,0.95)" stroke="#2D3F52" strokeWidth="2" />
          <text x="200" y="154" textAnchor="middle" fill="#4B5E72" fontSize="8" fontWeight="bold">CTR</text>

          {/* TRAIN */}
          <motion.g
            animate={{ x: tPos.cx, y: tPos.cy }}
            initial={{ x: JUNCTIONS['C'].cx, y: JUNCTIONS['C'].cy }}
            transition={{ type: 'spring', stiffness: 115, damping: 18 }}
          >
            <rect x="-20" y="-13" width="40" height="26" rx="7"
              fill={done ? '#052E16' : '#0F2235'}
              stroke={done ? '#4ADE80' : '#06B6D4'}
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.55))' }}
            />
            <rect x="-20" y="10" width="40" height="6" rx="2" fill="#0E7490" opacity="0.85" />
            <rect x="-14" y="-8" width="12" height="8" rx="2" fill="#0C4A6E" stroke="#0EA5E9" strokeWidth="0.8" />
            <rect x="2" y="-8" width="12" height="8" rx="2" fill="#0C4A6E" stroke="#0EA5E9" strokeWidth="0.8" />
            {done && <text x="0" y="4" textAnchor="middle" fill="#4ADE80" fontSize="9" fontWeight="bold">✓</text>}
          </motion.g>

          {/* Cardinal labels */}
          <text x="200" y="22" textAnchor="middle" fill="#2D3F52" fontSize="11" fontWeight="bold">NORTH</text>
          <text x="200" y="285" textAnchor="middle" fill="#2D3F52" fontSize="11" fontWeight="bold">SOUTH</text>
          <text x="28" y="154" textAnchor="middle" fill="#2D3F52" fontSize="10" fontWeight="bold">W</text>
          <text x="372" y="154" textAnchor="middle" fill={done ? '#4ADE80' : '#F59E0B'} fontSize="10" fontWeight="bold">E 🎯</text>
        </svg>

        {/* Moves counter + reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.65rem' }}>
          <span style={{ color: TEXT_BODY, fontSize: '0.83rem', fontWeight: 700 }}>
            Moves: <span style={{ color: '#67E8F9', fontWeight: 900 }}>{moveCount}</span>
          </span>
          <button onClick={reset}
            style={{ padding: '0.4rem 0.85rem', borderRadius: '10px', border: '1px solid #334155', background: 'rgba(15,23,42,0.7)', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </LeftPanel>

      <RightPanel>
        <Badge>🎮 CHALLENGE: CONTROL THE MAGLEV!</Badge>

        <h2 style={{ margin: 0, color: TEXT_HEADING, fontSize: '1.48rem', fontWeight: 900, lineHeight: 1.28 }}>
          {done ? '🎉 Mission Complete!' : 'Guide the Train to the Target!'}
        </h2>

        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'rgba(74,222,128,0.12)', border: '1.5px solid #4ADE80', borderRadius: '16px', padding: '1rem 1.2rem', color: '#4ADE80', fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.6 }}>
            🎉 Excellent! The East electromagnetic junction activated, creating a magnetic field that attracted and pulled the train smoothly across the track! You now understand how electromagnetic control works in a real Maglev system!
          </motion.div>
        ) : (
          <p style={{ margin: 0, color: TEXT_BODY, fontSize: '0.95rem', lineHeight: 1.65 }}>
            The target is the <strong style={{ color: '#FBBF24' }}>🎯 East junction</strong>. Press the direction buttons below to activate electromagnetic junctions and guide the train!
          </p>
        )}

        {/* D-Pad controls */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ color: '#4B5E72', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.8px' }}>
            {isMoving ? '⚡ Electromagnetic Pull Active...' : '— SELECT DIRECTION —'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 62px)', gridTemplateRows: 'repeat(3, 62px)', gap: '8px' }}>
            {/* N */}
            <button onClick={() => handleMove('N')} disabled={isMoving || done || trainPos === 'N'}
              style={{ gridColumn: 2, borderRadius: '14px', border: `2px solid ${!isMoving && trainPos !== 'N' ? '#38BDF8' : '#2D3F52'}`, background: !isMoving && trainPos !== 'N' ? '#1A2B3C' : '#0A1420', color: !isMoving && trainPos !== 'N' ? '#FFFFFF' : '#4B5E72', fontWeight: 900, fontSize: '0.8rem', cursor: (isMoving || done || trainPos === 'N') ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', transition: 'all 0.2s' }}>
              <span>▲</span><span>N</span>
            </button>
            {/* W */}
            <button onClick={() => handleMove('W')} disabled={isMoving || done || trainPos === 'W'}
              style={{ gridColumn: 1, gridRow: 2, borderRadius: '14px', border: `2px solid ${!isMoving && trainPos !== 'W' ? '#38BDF8' : '#2D3F52'}`, background: !isMoving && trainPos !== 'W' ? '#1A2B3C' : '#0A1420', color: !isMoving && trainPos !== 'W' ? '#FFFFFF' : '#4B5E72', fontWeight: 900, fontSize: '0.8rem', cursor: (isMoving || done || trainPos === 'W') ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', transition: 'all 0.2s' }}>
              <span>◀</span><span>W</span>
            </button>
            {/* Center */}
            <div style={{ gridColumn: 2, gridRow: 2, background: done ? 'linear-gradient(135deg,#166534,#15803D)' : 'linear-gradient(135deg,#0284C7,#0369A1)', borderRadius: '14px', display: 'grid', placeItems: 'center', color: '#FFFFFF', fontWeight: 900, fontSize: '0.72rem', textAlign: 'center' }}>
              {done ? '✓ DONE' : 'START'}
            </div>
            {/* E — target direction highlighted */}
            <button onClick={() => handleMove('E')} disabled={isMoving || done || trainPos === 'E'}
              style={{ gridColumn: 3, gridRow: 2, borderRadius: '14px', border: `2.5px solid ${!isMoving && trainPos !== 'E' ? '#F59E0B' : '#2D3F52'}`, background: !isMoving && trainPos !== 'E' ? '#1C1200' : '#0A1420', color: !isMoving && trainPos !== 'E' ? '#FBBF24' : '#4B5E72', fontWeight: 900, fontSize: '0.8rem', cursor: (isMoving || done || trainPos === 'E') ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', boxShadow: !isMoving && trainPos !== 'E' ? '0 0 14px rgba(245,158,11,0.4)' : 'none', transition: 'all 0.2s' }}>
              <span>E 🎯</span><span>▶</span>
            </button>
            {/* S */}
            <button onClick={() => handleMove('S')} disabled={isMoving || done || trainPos === 'S'}
              style={{ gridColumn: 2, gridRow: 3, borderRadius: '14px', border: `2px solid ${!isMoving && trainPos !== 'S' ? '#38BDF8' : '#2D3F52'}`, background: !isMoving && trainPos !== 'S' ? '#1A2B3C' : '#0A1420', color: !isMoving && trainPos !== 'S' ? '#FFFFFF' : '#4B5E72', fontWeight: 900, fontSize: '0.8rem', cursor: (isMoving || done || trainPos === 'S') ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', transition: 'all 0.2s' }}>
              <span>▼</span><span>S</span>
            </button>
          </div>
        </div>

        {/* What-happens explanation */}
        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1.5px solid rgba(56,189,248,0.18)', borderRadius: '14px', padding: '0.8rem 1rem' }}>
          <div style={{ color: '#67E8F9', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.5rem' }}>When you press a direction:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
            {[
              'Electricity flows to the target junction electromagnet',
              'Magnetic field activates — attraction force appears',
              'Train is pulled forward along the track',
              'Previous electromagnet switches off as train arrives',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: TEXT_BODY, fontSize: '0.81rem' }}>
                <span style={{ color: '#06B6D4', fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span> {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '0.7rem 0.95rem' }}>
          <p style={{ margin: 0, color: '#FDE68A', fontSize: '0.83rem', lineHeight: 1.55, fontWeight: 700 }}>
            💡 Hint: Press the <strong>E (East) 🎯</strong> button to reach the target junction!
          </p>
        </div>

        <ProceedBtn onClick={onNext} disabled={!done}>
          {done ? 'Excellent! Enter the Full Town Expedition →' : 'Reach the 🎯 East junction first'}
        </ProceedBtn>
      </RightPanel>
    </CinematicWrap>
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
      width: '100%', height: '100vh', maxHeight: '100vh',
      margin: '0 auto', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', boxSizing: 'border-box',
      padding: '0.4rem 0.75rem',
      backgroundColor: '#FFFFFF', position: 'relative',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>

      {/* ── Top Header Bar ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center', padding: '0.55rem 1.1rem',
        marginBottom: '0.55rem',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '1.5px solid #FDE68A', borderRadius: '24px',
        boxShadow: '0 6px 24px rgba(217,119,6,0.08)',
        flexShrink: 0, position: 'relative', zIndex: 100
      }}>
        {/* Back button */}
        <button onClick={onBackToDashboard} style={{
          padding: '0.55rem 1.05rem', fontSize: '0.9rem', gap: '0.45rem',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: '#FFFFFF', border: 'none', borderRadius: '14px',
          fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center',
          boxShadow: '0 4px 14px rgba(217,119,6,0.35)', transition: 'all 0.2s ease'
        }}>
          <ArrowLeft size={17} color="#FFFFFF" /> Back to Chapter 4
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            <Compass size={26} style={{ color: '#D97706' }} />
            Activity 4.9: Fun with Magnets
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 800 }}>Class 6 Science — Maglev Train &amp; Magnetic Town Expedition</span>
        </div>

        {/* Nav tabs — scrollable row of 9 pills */}
        <nav style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', flexShrink: 0, maxWidth: '680px', paddingBottom: '2px' }}>
          {STEPS_NAV.map(nav => {
            const isActive = step === nav.id;
            return (
              <button key={nav.id} onClick={() => go(nav.id)}
                style={{
                  padding: '0.5rem 0.9rem',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  border: isActive ? 'none' : '1.5px solid #CBD5E1',
                  background: isActive ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#334155',
                  borderRadius: '22px', cursor: 'pointer', fontWeight: 900,
                  fontSize: '0.82rem', whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(217,119,6,0.35)' : 'none',
                  flexShrink: 0
                }}>
                {nav.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Main Content ── */}
      <main style={{
        width: '100%', flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'row', overflow: 'hidden',
        position: 'relative', zIndex: 1
      }}>
        {/* STEP 0 — Cinematic Intro Question */}
        {step === 0 && <Step0Intro onNext={() => go(1)} />}

        {/* STEP 1 — Maglev Concept: Attraction & Repulsion */}
        {step === 1 && <Step1Maglev onNext={() => go(2)} />}

        {/* STEP 2 — How Does It Float: Levitation Slider */}
        {step === 2 && <Step2Float onNext={() => go(3)} />}

        {/* STEP 3 — How Does It Move: Propulsion Sequence */}
        {step === 3 && <Step3Move onNext={() => go(4)} />}

        {/* STEP 4 — Electromagnetic Control: ON/OFF Demo */}
        {step === 4 && <Step4Control onNext={() => go(5)} />}

        {/* STEP 5 — Challenge: Mini Control */}
        {step === 5 && <Step5Challenge onNext={() => go(6)} />}

        {/* STEP 6 — Magnetic Town Expedition (MazeGame) */}
        {step === 6 && (
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
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(6,78,59,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        style={{ background: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%)', borderRadius: '24px', padding: '2.5rem 3rem', maxWidth: '520px', width: '90%', textAlign: 'center', border: '1.5px solid #FDE68A', boxShadow: '0 20px 50px rgba(217,119,6,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                        <h2 style={{ margin: 0, color: '#064E3B', fontSize: '1.8rem', fontWeight: 900 }}>Destination Reached! 🎯🎉</h2>
                        <p style={{ margin: 0, color: '#334155', fontSize: '1.1rem', lineHeight: '1.5', fontWeight: 600 }}>
                          Outstanding navigation! The magnet smoothly guided the train across the 3D railway grid to the destination beacon!
                        </p>
                        <button onClick={() => { setShowMazeSolveModal(false); go(7); }}
                          style={{ padding: '1.1rem 3rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '40px', background: 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)', color: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 6px 20px rgba(217,119,6,0.45)', transition: 'all 0.25s ease' }}>
                          Next: Magnet Care <ArrowRight size={22} color="#FFFFFF" />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: D-Pad controls */}
            <div style={{ flex: '1.05', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '1rem', minWidth: 0, height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
              {/* Instructions */}
              <div style={{ background: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%)', border: '1.5px solid #FDE68A', borderRadius: '20px', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 6px 20px rgba(217,119,6,0.08)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#78350F', fontWeight: 900, fontSize: '22px' }}>
                  <Sparkles size={26} color="#D97706" />
                  <span>How Electromagnetic Control Works:</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#78350F', fontSize: '36px', lineHeight: 1.35, fontWeight: 800 }}>
                  <p style={{ margin: 0 }}>• Electromagnetic poles activate at nearby track junctions.</p>
                  <p style={{ margin: 0 }}>• Selecting a pole fires an attractive magnetic lightning tether.</p>
                  <p style={{ margin: 0 }}>• Magnetic pull glides your train smoothly to that station!</p>
                  <p style={{ margin: 0 }}>• Use the poles or D-Pad to reach the destination beacon 🎯!</p>
                </div>
              </div>

              {/* D-Pad HUD */}
              {(() => {
                const availableDirs = getAvailableDirections(currentNodeId);
                const currentStationName = NODES_MAP[currentNodeId]?.shortName || 'Grand';
                return (
                  <div style={{ background: '#0F172A', border: '2.5px solid #38BDF8', borderRadius: '20px', padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 10px 30px rgba(0,0,0,0.55)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#BAE6FD', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        <Compass size={17} color="#38BDF8" /><span>D-PAD HUD CONTROLS</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 900, background: 'rgba(56,189,248,0.15)', padding: '3px 10px', borderRadius: '10px', border: '1.5px solid rgba(56,189,248,0.35)' }}>
                        Station: {currentStationName}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 56px)', gridTemplateRows: 'repeat(3, 56px)', gap: '8px', margin: '0.2rem auto', justifyContent: 'center', opacity: isMoving ? 0.6 : 1 }}>
                      {/* N */}
                      <button type="button" disabled={isMoving || !availableDirs['N']} onClick={() => mazeDirectionMoveRef.current?.('up')}
                        style={{ gridColumn: 2, background: availableDirs['N'] ? '#1E293B' : '#0B1120', color: availableDirs['N'] ? '#FFFFFF' : '#475569', border: `2px solid ${hintDir === 'N' ? '#F59E0B' : (availableDirs['N'] ? '#38BDF8' : '#334155')}`, borderRadius: '16px', fontSize: '14px', fontWeight: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: (isMoving || !availableDirs['N']) ? 'not-allowed' : 'pointer', boxShadow: hintDir === 'N' ? '0 0 14px #F59E0B' : (availableDirs['N'] ? '0 4px 10px rgba(56,189,248,0.25)' : 'none'), transition: 'all 0.2s ease' }}>
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▲</span><span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>N</span>
                      </button>
                      {/* W */}
                      <button type="button" disabled={isMoving || !availableDirs['W']} onClick={() => mazeDirectionMoveRef.current?.('left')}
                        style={{ gridColumn: 1, gridRow: 2, background: availableDirs['W'] ? '#1E293B' : '#0B1120', color: availableDirs['W'] ? '#FFFFFF' : '#475569', border: `2px solid ${hintDir === 'W' ? '#F59E0B' : (availableDirs['W'] ? '#38BDF8' : '#334155')}`, borderRadius: '16px', fontSize: '14px', fontWeight: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: (isMoving || !availableDirs['W']) ? 'not-allowed' : 'pointer', boxShadow: hintDir === 'W' ? '0 0 14px #F59E0B' : (availableDirs['W'] ? '0 4px 10px rgba(56,189,248,0.25)' : 'none'), transition: 'all 0.2s ease' }}>
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>◀</span><span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>W</span>
                      </button>
                      {/* Center */}
                      <div style={{ gridColumn: 2, gridRow: 2, background: 'linear-gradient(135deg,#0284C7 0%,#0369A1 100%)', borderRadius: '16px', display: 'grid', placeItems: 'center', fontSize: '11.5px', fontWeight: 900, color: '#FFFFFF', textAlign: 'center', padding: '2px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 10px rgba(2,132,199,0.3)' }}>
                        {currentStationName}
                      </div>
                      {/* E */}
                      <button type="button" disabled={isMoving || !availableDirs['E']} onClick={() => mazeDirectionMoveRef.current?.('right')}
                        style={{ gridColumn: 3, gridRow: 2, background: availableDirs['E'] ? '#1E293B' : '#0B1120', color: availableDirs['E'] ? '#FFFFFF' : '#475569', border: `2px solid ${hintDir === 'E' ? '#F59E0B' : (availableDirs['E'] ? '#38BDF8' : '#334155')}`, borderRadius: '16px', fontSize: '14px', fontWeight: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: (isMoving || !availableDirs['E']) ? 'not-allowed' : 'pointer', boxShadow: hintDir === 'E' ? '0 0 14px #F59E0B' : (availableDirs['E'] ? '0 4px 10px rgba(56,189,248,0.25)' : 'none'), transition: 'all 0.2s ease' }}>
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▶</span><span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>E</span>
                      </button>
                      {/* S */}
                      <button type="button" disabled={isMoving || !availableDirs['S']} onClick={() => mazeDirectionMoveRef.current?.('down')}
                        style={{ gridColumn: 2, gridRow: 3, background: availableDirs['S'] ? '#1E293B' : '#0B1120', color: availableDirs['S'] ? '#FFFFFF' : '#475569', border: `2px solid ${hintDir === 'S' ? '#F59E0B' : (availableDirs['S'] ? '#38BDF8' : '#334155')}`, borderRadius: '16px', fontSize: '14px', fontWeight: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: (isMoving || !availableDirs['S']) ? 'not-allowed' : 'pointer', boxShadow: hintDir === 'S' ? '0 0 14px #F59E0B' : (availableDirs['S'] ? '0 4px 10px rgba(56,189,248,0.25)' : 'none'), transition: 'all 0.2s ease' }}>
                        <span style={{ fontSize: '13px', lineHeight: 1 }}>▼</span><span style={{ fontSize: '14px', lineHeight: 1, marginTop: '2px' }}>S</span>
                      </button>
                    </div>

                    {/* Reset */}
                    <button type="button" onClick={() => { mazeResetRef.current?.(); setHintDir(null); }} disabled={isMoving}
                      style={{ width: '100%', background: '#334155', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 800, cursor: isMoving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.2rem' }}>
                      <RotateCcw size={16} /> Reset Expedition
                    </button>

                    {/* Proceed */}
                    <button onClick={() => go(7)} disabled={!ext.maze}
                      style={{ width: '100%', padding: '0.9rem 1.25rem', fontSize: '1.02rem', fontWeight: 900, borderRadius: '16px', background: ext.maze ? 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)' : '#1E293B', color: ext.maze ? '#FFFFFF' : '#64748B', border: ext.maze ? 'none' : '1px solid #334155', cursor: ext.maze ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', boxShadow: ext.maze ? '0 4px 16px rgba(217,119,6,0.4)' : 'none', transition: 'all 0.25s ease', marginTop: '0.25rem' }}>
                      Proceed to Magnet Care <ArrowRight size={18} color={ext.maze ? '#FFFFFF' : '#64748B'} />
                    </button>
                  </div>
                );
              })()}
            </div>
          </>
        )}

        {/* STEP 7 — Magnet Care & Assessment */}
        {step === 7 && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '100%', maxWidth: '1000px', maxHeight: '100%', overflowY: 'auto', background: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%)', border: '1.5px solid #FDE68A', borderRadius: '24px', padding: '2rem 2.5rem', boxShadow: '0 10px 32px rgba(217,119,6,0.08)', boxSizing: 'border-box' }}>
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
                  let bgColor = '#FFFFFF', borderColor = '#FDE68A', textColor = '#78350F', icon = null;
                  if (qHard) {
                    if (isCorrect) { bgColor = '#DCFCE7'; borderColor = '#16A34A'; textColor = '#065F46'; icon = <CheckCircle2 size={22} color="#16A34A" />; }
                    else if (isSelected) { bgColor = '#FEE2E2'; borderColor = '#EF4444'; textColor = '#991B1B'; icon = <XCircle size={22} color="#EF4444" />; }
                  }
                  return (
                    <button key={idx} onClick={() => { if (qHard) return; setQHard({ correct: c.ok, selectedIndex: idx }); if (c.ok) addXP(20); }}
                      style={{ padding: '1.05rem 1.4rem', borderRadius: '16px', textAlign: 'left', fontSize: '1.05rem', fontWeight: 700, background: bgColor, border: `2px solid ${borderColor}`, color: textColor, cursor: qHard ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.25s ease', boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="key" style={{ marginRight: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#FEF3C7', fontSize: '0.88rem', color: '#78350F', fontWeight: 900 }}>{['A','B','C','D'][idx]}</span>
                        {c.label}
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {qHard && (
                <div style={{ marginTop: '1rem' }}>
                  <div className="reveal show" style={{ padding: '1rem 1.35rem', background: '#F0FDF4', borderLeft: `5px solid ${qHard.correct ? '#16A34A' : '#D97706'}`, border: '1.5px solid #A7F3D0', borderRadius: '18px', color: '#334155', fontWeight: 600, fontSize: '1rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    <b style={{ color: qHard.correct ? '#16A34A' : '#D97706' }}>{qHard.correct ? '✓ Correct!' : '✗ Incorrect.'} Mistreatment weakened it — careful storage prevents it.</b> Dropping, knocking and heat disturb the aligned magnetic domains. Store magnets in pairs with unlike poles together!
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <button onClick={() => go(8)}
                      style={{ padding: '0.95rem 2.6rem', borderRadius: '30px', border: 'none', background: 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)', color: '#FFFFFF', fontWeight: 900, fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(217,119,6,0.45)', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'all 0.25s ease' }}>
                      Continue to Did You Know <ArrowRight size={20} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showFinalCompletionModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6,78,59,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(6px)' }}>
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    style={{ background: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%)', borderRadius: '24px', padding: '2.5rem 3rem', maxWidth: '520px', width: '90%', textAlign: 'center', border: '1.5px solid #FDE68A', boxShadow: '0 20px 50px rgba(217,119,6,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                    <h2 style={{ margin: 0, color: '#064E3B', fontSize: '1.8rem', fontWeight: 900 }}>Activity Completed! 🎉</h2>
                    <p style={{ margin: 0, color: '#334155', fontSize: '1.2rem', lineHeight: '1.5', fontWeight: 600 }}>
                      Outstanding job! You've mastered 3D town map navigation and magnet care!
                    </p>
                    <button onClick={() => { setShowFinalCompletionModal(false); go(8); }}
                      style={{ padding: '1.1rem 3rem', background: 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)', color: '#FFFFFF', border: 'none', borderRadius: '40px', fontSize: '1.15rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 6px 20px rgba(217,119,6,0.4)', transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      Continue to Did You Know <ArrowRight size={22} color="#FFFFFF" />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* STEP 8 — Did You Know */}
        {step === 8 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
            <DidYouKnow
              onComplete={() => { if (onComplete) onComplete(); else if (onBackToDashboard) onBackToDashboard(); }}
              onBackToQuiz={() => go(7)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
