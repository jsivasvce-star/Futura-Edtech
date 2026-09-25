import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Compass as CompassIcon,
  Sparkles,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RefreshCw,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import ExactCompass from '../components/ExactCompass.jsx';
import Barrier3DCanvas from './components/Barrier3DCanvas.jsx';
import bgWood from '../../../../assets/ch4.8_image1.png';
import bgGlass from '../../../../assets/ch4.8_image2.png';
import bgPlastic from '../../../../assets/ch4.8_image3.png';
import bgCardboard from '../../../../assets/ch4.8_image4.png';

// Web Audio API Sound Synthesizer for Magnetic Clicks & Whoosh
function playMagneticSound(type = 'snap') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    if (type === 'snap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'glide') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(360, now + 0.35);
      osc.frequency.linearRampToValueAtTime(280, now + 0.6);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch (e) { }
}

const getBearingName = (deg) => {
  const norm = ((deg % 360) + 360) % 360;
  if (norm >= 337.5 || norm < 22.5) return 'N';
  if (norm >= 22.5 && norm < 67.5) return 'NE';
  if (norm >= 67.5 && norm < 112.5) return 'E';
  if (norm >= 112.5 && norm < 157.5) return 'SE';
  if (norm >= 157.5 && norm < 202.5) return 'S';
  if (norm >= 202.5 && norm < 247.5) return 'SW';
  if (norm >= 247.5 && norm < 292.5) return 'W';
  if (norm >= 292.5 && norm < 337.5) return 'NW';
  return '';
};

// -------------------------------------------------------------
// 1. Ultra-Realistic 3D Alnico Steel Bar Magnet Component (180px x 54px)
// -------------------------------------------------------------
const MagnetVisual = ({ isFlipped, isTesting }) => (
  <div style={{
    width: '180px',
    height: '54px',
    position: 'relative',
    userSelect: 'none',
    filter: isTesting
      ? 'drop-shadow(0 18px 28px rgba(0,0,0,0.75)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.45))'
      : 'drop-shadow(0 12px 20px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
    transform: isTesting ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.2s ease, filter 0.2s ease'
  }}>
    <svg width="180" height="54" viewBox="0 0 210 62" style={{ overflow: 'visible' }}>
      <defs>
        {/* Soft Dynamic Ground Ambient Shadow */}
        <filter id="magSoftShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
        </filter>

        {/* North Pole (Metallic Lacquered Red) */}
        <linearGradient id="northMetalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFA4A4" />
          <stop offset="8%" stopColor="#EF4444" />
          <stop offset="45%" stopColor="#DC2626" />
          <stop offset="75%" stopColor="#B91C1C" />
          <stop offset="92%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        {/* South Pole (Metallic Lacquered Cobalt Blue) */}
        <linearGradient id="southMetalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="8%" stopColor="#3B82F6" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="75%" stopColor="#1D4ED8" />
          <stop offset="92%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Polished Nickel Steel Center Band */}
        <linearGradient id="nickelCenterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="15%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="85%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* 3D Cylindrical Top Highlight Reflection */}
        <linearGradient id="specularHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.65)" />
        </linearGradient>
      </defs>

      {/* Main Bar Magnet Chassis */}
      <g transform={isFlipped ? "rotate(180 105 31)" : ""}>
        {/* Outer Steel Bevel Edge */}
        <rect x="2" y="2" width="206" height="58" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

        {/* Left Pole (North - Red) */}
        <path d="M 12 4 L 102 4 L 102 58 L 12 58 C 7 58 3 54 3 49 L 3 13 C 3 8 7 4 12 4 Z" fill="url(#northMetalGrad)" />

        {/* Right Pole (South - Blue) */}
        <path d="M 108 4 L 198 4 C 203 4 207 8 207 13 L 207 49 C 207 54 203 58 198 58 L 108 58 Z" fill="url(#southMetalGrad)" />

        {/* Center Polished Nickel Isolation Joint */}
        <rect x="102" y="4" width="6" height="54" fill="url(#nickelCenterGrad)" stroke="#1E293B" strokeWidth="0.8" />
        <line x1="105" y1="4" x2="105" y2="58" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.8" />

        {/* Top Edge Cylindrical Specular Glint */}
        <rect x="8" y="5" width="194" height="4" rx="2" fill="url(#specularHighlight)" opacity="0.45" />

        {/* Bottom Ambient Reflection Rim */}
        <rect x="8" y="54" width="194" height="2" rx="1" fill="#000000" opacity="0.5" />

        {/* North Pole 3D Engraved 'N' Typography */}
        <g transform="translate(52, 33)">
          <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fill="#450A0A" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
            N
          </text>
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#FFFFFF" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
            N
          </text>
        </g>

        {/* South Pole 3D Engraved 'S' Typography */}
        <g transform="translate(158, 33)">
          <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fill="#0F172A" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
            S
          </text>
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#FFFFFF" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
            S
          </text>
        </g>
      </g>
    </svg>
  </div>
);

const BARRIER_HEIGHT = 420;

// Standard material thickness width calculator for physical clearance & collision
const getMaterialWidth = (type, thickness, stage = 1) => {
  if (type === 'wood' && stage === 4) return 880 + thickness * 20;
  if (type === 'wood') return 480 + thickness * 20;
  if (type === 'cardboard') return 480 + thickness * 20;
  if (type === 'plastic') return 460 + thickness * 20;
  return 480 + thickness * 18;
};

const getMaterialHeight = (type, stage = 1) => {
  if (type === 'wood' && stage === 4) return 560;
  if (type === 'cardboard') return 480;
  if (type === 'plastic') return 480;
  if (type === 'glass') return 480;
  return BARRIER_HEIGHT;
};

// 3D WebGL Material Barrier Visual Renderer
const MaterialBarrierVisual = ({ type, stage = 1, thickness = 1 }) => {
  const isTree = type === 'wood' && stage === 4;
  const width = isTree ? '100%' : getMaterialWidth(type, thickness, stage);
  const height = isTree ? '100%' : getMaterialHeight(type, stage);
  return <Barrier3DCanvas type={type} stage={stage} thickness={thickness} width={width} height={height} />;
};

const MATERIALS = [
  {
    id: 'glass',
    name: 'Glass',
    itemLabel: 'Small Glass',
    fullName: 'Small Crystal Glass Tumbler',
    type: 'glass',
    stage: 1,
    icon: '🥛',
    desc: 'Small crystal glass tumbler',
    deflection: { angle: -48, label: 'High Deflection', fieldPower: '85%' }
  },
  {
    id: 'plastic',
    name: 'Plastic box',
    itemLabel: 'Plastic Container',
    fullName: 'Airtight Plastic Kitchen Container',
    type: 'plastic',
    stage: 4,
    icon: '🍱',
    desc: 'Airtight clear plastic kitchen container',
    deflection: { angle: -38, label: 'Medium-High Deflection', fieldPower: '70%' }
  },
  {
    id: 'cardboard',
    name: 'Card board',
    itemLabel: 'Shipping Box',
    fullName: 'Large Shipping Cardboard Box',
    type: 'cardboard',
    stage: 4,
    icon: '📦',
    desc: 'Large shipping cardboard box',
    deflection: { angle: -28, label: 'Moderate Deflection', fieldPower: '55%' }
  },
  {
    id: 'wood',
    name: 'Wood',
    itemLabel: 'Wood',
    fullName: 'Wood Block',
    type: 'wood',
    stage: 4,
    icon: '🪵',
    desc: 'Living oak tree trunk',
    deflection: { angle: -18, label: 'Subtle Deflection', fieldPower: '38%' }
  }
];

const COMPASS_SIZE = 240;
const COMPASS_RADIUS = 120;

export default function Simulation({ onComplete, onNext }) {
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);
  const [workspaceSize, setWorkspaceSize] = useState({ width: 840, height: 560 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isObjectArrived, setIsObjectArrived] = useState(false);
  const [magnetApproached, setMagnetApproached] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [needleRotation, setNeedleRotation] = useState(0); // Initially at 0° North-South!
  const [thickness, setThickness] = useState(1);
  const [observations, setObservations] = useState({
    glass: null,
    plastic: null,
    cardboard: null,
    wood: null
  });

  const [feedback, setFeedback] = useState({
    type: 'info',
    text: '🚀 Starting Auto Demo: Crystal glass (Small Glass) moving into center position... Needle at North-South (0° N).'
  });

  const workspaceContainerRef = useRef(null);
  const arrivalTimerRef = useRef(null);
  const magnetMoveTimerRef = useRef(null);
  const needleDeflectTimerRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  const activeItem = MATERIALS[selectedMaterialIndex] || MATERIALS[0];
  const activeMaterial = activeItem.type;
  const currentStage = activeItem.stage;

  // Measure dynamic workspace dimensions
  useEffect(() => {
    if (!workspaceContainerRef.current) return;
    const updateSize = () => {
      if (workspaceContainerRef.current) {
        const rect = workspaceContainerRef.current.getBoundingClientRect();
        if (rect.width > 50 && rect.height > 50) {
          setWorkspaceSize({ width: rect.width, height: rect.height });
        }
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(workspaceContainerRef.current);
    return () => ro.disconnect();
  }, []);

  // Midpoints
  const centerY = workspaceSize.height ? (workspaceSize.height / 2) : 280;
  const centerX = workspaceSize.width ? (workspaceSize.width / 2) : 420;

  // Geometry calculations
  const matWidth = getMaterialWidth(activeMaterial, thickness, currentStage);
  const matHeight = getMaterialHeight(activeMaterial, currentStage);
  const compassX = Math.max(500, workspaceSize.width - COMPASS_RADIUS - 35);
  const magnetX = 145;

  const isTreeStage = false;

  // Safe distance calculations: guarantee the magnet NEVER touches any object
  // Cardboard has wider footprint (~95px half-width); container & glass have ~60px half-width
  const barrierClearance = activeMaterial === 'cardboard' ? 145 : 125;
  const magnetFarLeft = isTreeStage ? 15 : 25;
  let rightOffset = -25;
  if (activeMaterial === 'glass') rightOffset = 10;
  else if (activeMaterial === 'wood') rightOffset = 95;
  else if (activeMaterial === 'cardboard') rightOffset = 90;
  
  const magnetCloseLeft = isTreeStage
    ? Math.max(25, Math.round(centerX - 270))
    : Math.max(45, Math.round(centerX - 180 - barrierClearance) + rightOffset);

  const magnetLeft = magnetApproached ? magnetCloseLeft : magnetFarLeft;

  // Helper to trigger object slide-in, magnet approach, and realistic needle deflection
  const triggerObjectArrival = useCallback((targetIndex = 0, isAutoMode = isAutoPlaying) => {
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    if (magnetMoveTimerRef.current) clearTimeout(magnetMoveTimerRef.current);
    if (needleDeflectTimerRef.current) clearTimeout(needleDeflectTimerRef.current);
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

    const targetItem = MATERIALS[targetIndex] || MATERIALS[0];
    const targetDefl = targetItem.deflection;
    const targetAngle = isFlipped ? -targetDefl.angle : targetDefl.angle;

    // STEP 1: INITIAL STATE (Needle at North-South 0°, Magnet parked at distance)
    setIsObjectArrived(false);
    setNeedleRotation(0);
    setMagnetApproached(false);
    playMagneticSound('whoosh');

    setFeedback({
      type: 'info',
      text: `📦 Moving ${targetItem.itemLabel} (${targetItem.name}) into center position... Compass needle resting at North-South (0° N).`
    });

    // STEP 2: OBJECT SETTLES IN PLACE (t = 800ms)
    arrivalTimerRef.current = setTimeout(() => {
      setIsObjectArrived(true);
      playMagneticSound('snap');

      setFeedback({
        type: 'info',
        text: `📍 ${targetItem.itemLabel} set in place! Waiting 1s before magnet approaches...`
      });

      // STEP 3: AFTER 1 SEC (1000ms), MAGNET COMES CLOSE (WITHOUT TOUCHING OBJECT)
      magnetMoveTimerRef.current = setTimeout(() => {
        setMagnetApproached(true);
        playMagneticSound('glide');

        setFeedback({
          type: 'info',
          text: `🧲 Magnet moving close to ${targetItem.itemLabel}...`
        });

        // STEP 4: AFTER 0.3 SEC (300ms), NEEDLE DEFLECTION SHOWN
        needleDeflectTimerRef.current = setTimeout(() => {
          setNeedleRotation(targetAngle);
          playMagneticSound('snap');

          const dirName = targetAngle < 0 ? 'North-West (NW)' : 'North-East (NE)';
          const degVal = Math.round(((targetAngle % 360) + 360) % 360);

          setFeedback({
            type: 'success',
            text: `✨ Magnet close to ${targetItem.itemLabel}! Magnetic field penetrates through ➔ Red North Needle deflects to ${degVal}° in ${dirName} (${targetDefl.label})!`
          });

          // Mark observation
          setObservations(prev => {
            const updated = { ...prev, [targetItem.id]: 'deflects' };
            const allTested = MATERIALS.every(m => updated[m.id] === 'deflects');
            if (allTested && onComplete) {
              onComplete();
            }
            return updated;
          });

          // STEP 5: SEQUENTIAL AUTO-TOUR ADVANCE (if auto mode enabled)
          if (isAutoMode) {
            if (targetIndex < MATERIALS.length - 1) {
              autoAdvanceTimerRef.current = setTimeout(() => {
                // Magnet glides back and needle resets to 0° North-South
                setMagnetApproached(false);
                setNeedleRotation(0);

                setTimeout(() => {
                  const nextIdx = targetIndex + 1;
                  setSelectedMaterialIndex(nextIdx);
                  triggerObjectArrival(nextIdx, true);
                }, 600);
              }, 3200); // 3.2s observation time
            } else {
              autoAdvanceTimerRef.current = setTimeout(() => {
                setIsAutoPlaying(false);
                setFeedback({
                  type: 'success',
                  text: `🎉 Auto-Demo complete! All 4 items demonstrate magnetic penetration.`
                });
              }, 3200);
            }
          }
        }, 300); // exactly 0.3sec after magnet approaches
      }, 1000); // exactly 1.0sec after object settles in place
    }, 800); // 800ms for object transition to set in place
  }, [isAutoPlaying, isFlipped, onComplete]);

  // Initial enter behavior: automatically run in order from 0 to 3
  useEffect(() => {
    setSelectedMaterialIndex(0);
    setIsAutoPlaying(true);
    triggerObjectArrival(0, true);

    return () => {
      if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
      if (magnetMoveTimerRef.current) clearTimeout(magnetMoveTimerRef.current);
      if (needleDeflectTimerRef.current) clearTimeout(needleDeflectTimerRef.current);
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []); // Run once on mount

  // Handle Manual Material Switching
  const handleSelectObject = (idx) => {
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    if (magnetMoveTimerRef.current) clearTimeout(magnetMoveTimerRef.current);
    if (needleDeflectTimerRef.current) clearTimeout(needleDeflectTimerRef.current);
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

    setSelectedMaterialIndex(idx);
    setIsAutoPlaying(false);
    triggerObjectArrival(idx, false);
  };

  // Toggle Auto-Demo Play/Pause
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
      if (magnetMoveTimerRef.current) clearTimeout(magnetMoveTimerRef.current);
      if (needleDeflectTimerRef.current) clearTimeout(needleDeflectTimerRef.current);
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      setIsAutoPlaying(false);
      setFeedback({
        type: 'info',
        text: '⏸ Auto-Demo paused. Click any barrier button to test manually or resume Auto-Demo.'
      });
    } else {
      setIsAutoPlaying(true);
      const startIdx = selectedMaterialIndex >= MATERIALS.length - 1 ? 0 : selectedMaterialIndex;
      setSelectedMaterialIndex(startIdx);
      triggerObjectArrival(startIdx, true);
    }
  };

  const flipMagnet = () => {
    playMagneticSound('snap');
    setIsFlipped(prev => {
      const nextFlipped = !prev;
      const currentItem = MATERIALS[selectedMaterialIndex] || MATERIALS[0];
      const targetDefl = currentItem.deflection;
      const newAngle = nextFlipped ? -targetDefl.angle : targetDefl.angle;

      if (magnetApproached) {
        setNeedleRotation(newAngle);
      } else {
        setNeedleRotation(0);
      }

      const dirName = newAngle < 0 ? 'North-West (NW)' : 'North-East (NE)';
      const degVal = Math.round(((newAngle % 360) + 360) % 360);
      const polarityLabel = nextFlipped ? '[S][N]' : '[N][S]';

      setFeedback({
        type: 'info',
        text: `🔄 Flipped to ${polarityLabel}! Red North Needle ${magnetApproached ? `deflects to ${degVal}° in ${dirName}` : 'resting at 0° North-South'}.`
      });

      return nextFlipped;
    });
  };

  const handleReset = () => {
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    if (magnetMoveTimerRef.current) clearTimeout(magnetMoveTimerRef.current);
    if (needleDeflectTimerRef.current) clearTimeout(needleDeflectTimerRef.current);
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

    setIsFlipped(false);
    setThickness(1);
    setSelectedMaterialIndex(0);
    setNeedleRotation(0);
    setMagnetApproached(false);
    setObservations({ glass: null, plastic: null, cardboard: null, wood: null });
    setIsAutoPlaying(true);
    triggerObjectArrival(0, true);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const allCompleted = MATERIALS.every(m => observations[m.id] === 'deflects');

  return (
    <div style={{
      padding: '0.65rem',
      display: 'grid',
      gridTemplateColumns: '1fr 430px',
      gap: '1.25rem',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative'
    }}>

      {/* Left Column: Two Golden Containers (Instructions & Controls) */}
      <div className="stage-right-column" style={{
        order: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.65rem',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        overflowY: 'auto',
        paddingRight: '0.4rem'
      }}>
        {/* Container 1: Explore the magnetic force */}
        <div className="stage-container-1" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '24px',
          padding: '1.2rem',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          flexShrink: 0
        }}>
          <h3 style={{ margin: 0, fontSize: '23.6px', fontWeight: 900, color: '#1E293B' }}>
            Explore the magnetic force
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '23.7px', flexShrink: 0, boxShadow: '0 4px 10px rgba(33, 74, 112, 0.3)' }}>1</div>
              <span style={{ fontSize: '23.7px', color: '#334155', lineHeight: 1.45, fontWeight: 700, paddingTop: '2px' }}>
                Choose a barrier: glass, plastic, cardboard or wood.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '23.7px', flexShrink: 0, boxShadow: '0 4px 10px rgba(33, 74, 112, 0.3)' }}>2</div>
              <span style={{ fontSize: '23.7px', color: '#334155', lineHeight: 1.45, fontWeight: 700, paddingTop: '2px' }}>
                Watch the compass needle as the magnet stays nearby.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '23.7px', flexShrink: 0, boxShadow: '0 4px 10px rgba(33, 74, 112, 0.3)' }}>3</div>
              <span style={{ fontSize: '23.7px', color: '#334155', lineHeight: 1.45, fontWeight: 700, paddingTop: '2px' }}>
                Flip the magnet and observe the change in direction.
              </span>
            </div>
          </div>
          <div style={{ background: '#EAF2F6', border: '1.5px solid #214A70', borderRadius: '16px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.2rem' }}>
            <div style={{ width: '38.5px', height: '38.5px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 5px rgba(33, 74, 112, 0.15)' }}>
              <span style={{ fontSize: '22px' }}>💡</span>
            </div>
            <span style={{ fontSize: '22.3px', color: '#173B5F', fontWeight: 800, lineHeight: 1.3 }}>
              Keep the magnet and compass at the same distance.
            </span>
          </div>
        </div>

        <div className="stage-container-2" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '24px',
          padding: '0.75rem 1rem',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '27.1px', fontWeight: 900, color: '#1E293B' }}>
              Choose a barrier
            </h3>
            <span style={{
              background: '#DCFCE7',
              color: '#16A34A',
              fontWeight: 900,
              fontSize: '18.4px',
              padding: '0.35rem 0.8rem',
              borderRadius: '20px',
            }}>
              4 materials
            </span>
          </div>

          {/* Standalone Material Barrier Cards (2x2 Grid) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.4rem',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {MATERIALS.map((mat, idx) => {
              const isSelected = selectedMaterialIndex === idx;

              return (
                <button
                  key={mat.id}
                  onClick={() => handleSelectObject(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '16px',
                    border: isSelected ? '2.5px solid #3B82F6' : '1.5px solid #E2E8F0',
                    background: isSelected ? '#EFF6FF' : '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 14px rgba(59, 130, 246, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    gap: '0.6rem',
                    boxSizing: 'border-box',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#93C5FD';
                      e.currentTarget.style.background = '#F8FAFC';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.background = '#FFFFFF';
                    }
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    background: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    flexShrink: 0
                  }}>
                    {mat.icon}
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '20.7px', color: '#1E293B', flex: 1, wordBreak: 'break-word', lineHeight: 1.2 }}>
                    {mat.name === 'Card board' ? <>Card<br/>board</> : mat.name === 'Plastic box' ? <>Plastic<br/>box</> : mat.name}
                  </div>

                  {isSelected && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: '#22C55E', color: 'white', flexShrink: 0 }}>
                      <CheckCircle2 size={18} color="#FFFFFF" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Proceed Button */}
          <button
            onClick={onNext}
            className="gold-glow-btn"
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '20px',
              fontSize: '20.5px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              border: 'none',
            }}
          >
            Proceed to Concept Check <ArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Right Column: Ocean Themed Interactive Stage */}
      <div style={{ order: 1, flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem', height: '100%', minHeight: 0 }}>

        {/* Top Header Stage Bar */}
        <div style={{
          padding: '0.5rem 0.9rem',
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Selected Barrier Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '5px 12px',
            background: '#FFFFFF',
            border: '1.5px solid #A7F3D0',
            borderRadius: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#065F46' }}>
              SELECTED: <span style={{ color: '#173B5F', marginLeft: '4px' }}>{MATERIALS[selectedMaterialIndex].itemLabel}</span>
            </span>
          </div>

          {/* Auto-Demo Tour Control & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              onClick={toggleAutoPlay}
              title={isAutoPlaying ? "Pause Auto-Tour (1 to 4)" : "Start Auto-Tour (1 to 4)"}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '1.14rem',
                fontWeight: 900,
                borderRadius: '16px',
                border: isAutoPlaying ? '1.5px solid #173B5F' : '1.5px solid #A7F3D0',
                background: isAutoPlaying ? 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)' : '#FFFFFF',
                color: isAutoPlaying ? '#FFFFFF' : '#065F46',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: isAutoPlaying ? '0 4px 14px rgba(217, 119, 6, 0.35)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isAutoPlaying) {
                  e.currentTarget.style.borderColor = '#10B981';
                  e.currentTarget.style.background = '#ECFDF5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isAutoPlaying) {
                  e.currentTarget.style.borderColor = '#A7F3D0';
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
              AUTO PLAY (1–4)
            </button>

            <button
              onClick={flipMagnet}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '1.14rem',
                fontWeight: 900,
                borderRadius: '16px',
                border: isFlipped ? '1.5px solid #1D4ED8' : '1.5px solid #A7F3D0',
                background: isFlipped ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : '#FFFFFF',
                color: isFlipped ? '#FFFFFF' : '#065F46',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: isFlipped ? '0 4px 14px rgba(29, 78, 216, 0.35)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isFlipped) {
                  e.currentTarget.style.borderColor = '#10B981';
                  e.currentTarget.style.background = '#ECFDF5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isFlipped) {
                  e.currentTarget.style.borderColor = '#A7F3D0';
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              <RotateCcw size={14} /> FLIP MAGNET
            </button>
          </div>
        </div>

        {/* Deep Ocean Interactive Workspace */}
        <div
          id="simulation-workspace"
          ref={workspaceContainerRef}
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #A7F3D0',
            background: 'radial-gradient(ellipse at center, #1E3A8A 0%, #0F172A 100%)',
            boxShadow: 'inset 0 0 70px rgba(0,0,0,0.5)'
          }}
        >
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '14px',
              padding: '0.4rem 0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#0F172A',
              fontSize: '0.78rem',
              fontWeight: 800,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            {isFullscreen ? <Minimize2 size={15} color="#0F172A" /> : <Maximize2 size={15} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* 1. Vintage Wooden Study Desk Background for Crystal Glass */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgGlass})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              opacity: activeMaterial === 'glass' ? 1 : 0,
              transition: 'opacity 0.45s ease-in-out',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* 2. Modern Kitchen Counter Background for Plastic Container */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgPlastic})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              opacity: activeMaterial === 'plastic' ? 1 : 0,
              transition: 'opacity 0.45s ease-in-out',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* 3. Shipping Port Cargo Harbor Background for Shipping Box */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgCardboard})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              opacity: activeMaterial === 'cardboard' ? 1 : 0,
              transition: 'opacity 0.45s ease-in-out',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* 4. Deep Ancient Forest Background for Tree */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgWood})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              opacity: activeMaterial === 'wood' ? 1 : 0,
              transition: 'opacity 0.45s ease-in-out',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Draggable / Fixed Objects Stage */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>



            {/* Stationary Compass on Right Side with Smooth Red North Needle Deflection */}
            <div 
              style={{ 
                position: 'absolute', 
                left: isTreeStage ? compassX - COMPASS_RADIUS - 10 : compassX - COMPASS_RADIUS, 
                top: isTreeStage ? centerY + 175 - COMPASS_RADIUS : centerY - COMPASS_RADIUS,
                transform: isTreeStage ? 'scale(0.55)' : 'scale(1)',
                transformOrigin: 'center center',
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 20, 
                pointerEvents: 'none',
                userSelect: 'none',
                filter: (activeMaterial === 'glass' || activeMaterial === 'cardboard' || activeMaterial === 'wood') 
                  ? 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.55))' 
                  : undefined
              }}
            >
              <ExactCompass 
                rotation={needleRotation} 
                size={COMPASS_SIZE} 
                transition={{ type: 'spring', stiffness: 70, damping: 12, restDelta: 0.01 }}
              />
            </div>

            {/* Left Bar Magnet (Smooth Glide Towards Barrier & Return) */}
            <div 
              style={{ 
                position: 'absolute', 
                left: `${magnetLeft}px`, 
                top: activeMaterial === 'plastic' ? centerY + 15 : (isTreeStage ? centerY + 175 - 27 : centerY - 27),
                transform: isTreeStage ? 'scale(0.55)' : 'scale(1)',
                transformOrigin: 'center center',
                transition: 'left 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 25, 
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={flipMagnet}
              title={`Click to flip magnet polarity (${isFlipped ? '[S][N] ➔ [N][S]' : '[N][S] ➔ [S][N]'})`}
            >
              <MagnetVisual isFlipped={isFlipped} isTesting={true} />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}