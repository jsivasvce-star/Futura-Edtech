import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ZoomIn,
  Scissors,
  Droplets,
  Sparkles,
  Layers,
  Award,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import dicot1Img from '../../../../assets/dicot_1.png';
import diImg from '../../../../assets/di.png';
import chickpeaSplitImg from '../../../../assets/chickpea_split.png';
import maizeCutImg from '../../../../assets/maize_cut.png';
import maizeIntactImg from '../../../../assets/maize_intact_realistic.png';
import { seedLabAudio } from './seedLabAudio';
import RealisticSeedBeaker from './RealisticSeedBeaker';

// ============================================================
// ORNATE BOTANICAL SVG ELEMENTS (EXACT MATCH TO SLOGAN PAGE)
// ============================================================

const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="54"
    height="26"
    viewBox="0 0 80 32"
    fill="none"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      flexShrink: 0,
      opacity: 0.95
    }}
  >
    <path
      d="M75 16 C55 14, 35 8, 8 2"
      stroke="#1B4D3E"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#2D6A4F" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#40916C" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#52B788" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#2D6A4F" />
    <path d="M40 18 C44 22, 43 27, 39 29 C35 31, 31 28, 32 23 C33 20, 37 17, 40 18 Z" fill="#40916C" />
  </svg>
);

const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px', marginBottom: '4px' }}>
    <svg width="28" height="18" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#1B4D3E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#40916C" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#52B788" />
    </svg>
  </div>
);

const TopCornerFoliage = ({ side = 'left' }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      [side]: 0,
      width: 'clamp(130px, 13vw, 200px)',
      height: 'clamp(70px, 8vh, 100px)',
      pointerEvents: 'none',
      zIndex: 4,
      overflow: 'hidden',
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      opacity: 0.95
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="none" fill="none">
      <path d="M0 0 C45 22, 100 38, 155 32 C175 30, 192 24, 200 18" stroke="#0D3B24" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M65 28 C88 50, 122 66, 150 70" stroke="#1B4D3E" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 16 C50 38, 72 65, 88 86" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M38 12 C54 2, 74 10, 80 24 C68 31, 48 26, 38 12 Z" fill="#2D6A4F" />
      <path d="M75 22 C96 14, 118 22, 124 38 C110 45, 88 38, 75 22 Z" fill="#14452F" />
      <path d="M118 28 C140 20, 162 27, 168 43 C154 50, 132 43, 118 28 Z" fill="#40916C" />
      <path d="M150 28 C172 22, 188 30, 194 43 C180 49, 164 43, 150 28 Z" fill="#2D6A4F" />
      <path d="M55 33 C72 27, 88 38, 90 52 C76 57, 60 49, 55 33 Z" fill="#52B788" />
      <path d="M92 44 C108 38, 125 48, 126 62 C112 67, 97 59, 92 44 Z" fill="#40916C" />
    </svg>
  </div>
);

const TopMountainBackdrop = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '8%',
      right: '8%',
      height: '90px',
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.16,
      overflow: 'hidden'
    }}
  >
    <svg width="100%" height="90" viewBox="0 0 1000 90" preserveAspectRatio="none" fill="none">
      <path d="M0 80 Q160 36 260 62 T520 32 T760 58 T1000 42 L1000 90 L0 90 Z" fill="#52B788" />
      <path d="M100 85 Q290 42 440 68 T720 46 T1000 62 L1000 90 L0 90 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

const CardCornerLeaves = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 52 52"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '6px' : 'auto',
        bottom: position.includes('bottom') ? '6px' : 'auto',
        left: position.includes('left') ? '6px' : 'auto',
        right: position.includes('right') ? '6px' : 'auto',
        transform: transforms[position],
        opacity: 0.85,
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      <path d="M6 6 C18 9, 28 18, 32 30 C34 36, 32 44, 28 50" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 12 C18 9, 25 12, 26 18 C27 23, 21 26, 16 23 C12 20, 9 15, 12 12 Z" fill="#1B4D3E" />
      <path d="M22 22 C29 19, 36 22, 37 28 C37 33, 31 36, 26 33 C21 30, 19 25, 22 22 Z" fill="#2D6A4F" />
      <path d="M8 25 C13 22, 19 24, 20 29 C20 33, 15 36, 11 34 C7 32, 6 27, 8 25 Z" fill="#40916C" />
    </svg>
  );
};

const BottomNatureSilhouettes = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '48px',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.28,
      zIndex: 1
    }}
  >
    <svg width="100%" height="48" viewBox="0 0 1200 48" preserveAspectRatio="none" fill="none">
      <path d="M0 36 Q220 22 440 32 T880 26 T1200 34 L1200 48 L0 48 Z" fill="#52B788" />
      <path d="M0 40 Q320 28 640 38 T1200 32 L1200 48 L0 48 Z" fill="#2D6A4F" />
      <circle cx="110" cy="30" r="12" fill="#1B4D3E" />
      <circle cx="124" cy="26" r="9" fill="#1B4D3E" />
      <rect x="115" y="34" width="4" height="12" fill="#1B4D3E" />
      <path d="M210 20 Q215 16 220 20 Q225 16 230 20" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M820 18 Q825 14 830 18 Q835 14 840 18" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="1020" cy="26" r="14" fill="#1B4D3E" />
      <circle cx="1036" cy="22" r="10" fill="#1B4D3E" />
      <rect x="1025" y="32" width="4" height="14" fill="#1B4D3E" />
    </svg>
  </div>
);

// ============================================================
// STAGE DEFINITIONS & ANATOMICAL PIN DATA
// ============================================================

const STAGES = [
  { id: 'soak', num: '01', title: 'Hydration Chamber', sub: 'Imbibition & Swelling' },
  { id: 'peel', num: '02', title: 'Dissection Tray', sub: 'Peel & Longitudinal Cut' },
  { id: 'compare', num: '03', title: 'Optical Loupe', sub: 'Embryo Anatomy Pinning' }
];

const CHICKPEA_PINS = [
  {
    id: 'plumule',
    num: '1',
    name: 'Plumule (Baby Shoot)',
    role: 'Develops into the future stem and green leaves',
    x: 48,
    y: 38,
    detail: 'The delicate embryonic shoot apex. Upon germination, it elongates upward toward sunlight to form the seedling’s first true leaves.'
  },
  {
    id: 'radicle',
    num: '2',
    name: 'Radicle (Baby Root)',
    role: 'Grows directly into the primary taproot',
    x: 52,
    y: 64,
    detail: 'The lower tip of the embryo axis. It emerges first through the micropyle pore, anchoring the plant deeply with secondary branch roots.'
  },
  {
    id: 'cotyledon',
    num: '3',
    name: 'Cotyledons (Two Seed Leaves)',
    role: 'Dense nutritive reservoir of protein & starch',
    x: 28,
    y: 50,
    detail: 'Chickpea seeds possess exactly two large, fleshy cotyledons that supply food energy until the first green leaves can photosynthesize.'
  }
];

const MAIZE_PINS = [
  {
    id: 'endosperm',
    num: '1',
    name: 'Endosperm (Starch Reservoir)',
    role: 'Massive bulky nutritive starch tissue',
    x: 50,
    y: 28,
    detail: 'Occupies the upper two-thirds of the maize kernel. Packed with starch grains and surrounded by an outer aleurone protein layer.'
  },
  {
    id: 'scutellum',
    num: '2',
    name: 'Scutellum (Single Cotyledon)',
    role: 'Shield-shaped single cotyledon absorbing nutrients',
    x: 42,
    y: 58,
    detail: 'Monocots have only one specialized shield-shaped cotyledon called the scutellum. It secretes enzymes to digest endosperm starch and funnels sugar to the embryo.'
  },
  {
    id: 'embryo',
    num: '3',
    name: 'Embryo Axis (Coleoptile & Radicle)',
    role: 'Protected baby plant with protective sheaths',
    x: 62,
    y: 68,
    detail: 'The plumule is sheathed inside a protective cone called the coleoptile, while the radicle is encased within the coleorhiza sheath.'
  }
];

export default function SeedDissectionLab({ onBackToDashboard, onNextActivity }) {
  const containerRef = useRef(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Step 1: Hydration state
  const [soakDay, setSoakDay] = useState(0); // 0, 1, 2, 3
  const [isAutoSoaking, setIsAutoSoaking] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  // Step 2: Dissection tray state
  const [activeSpecimen, setActiveSpecimen] = useState('chickpea');
  const [activeTool, setActiveTool] = useState('tweezers');
  const [chickpeaPeelProgress, setChickpeaPeelProgress] = useState(0);
  const [chickpeaSplitProgress, setChickpeaSplitProgress] = useState(0);
  const [maizeCutProgress, setMaizeCutProgress] = useState(0);
  const [toolAlertMessage, setToolAlertMessage] = useState('');

  // Step 3: Optical Loupe state
  const [loupeSpecimen, setLoupeSpecimen] = useState('chickpea');
  const [loupeZoom, setLoupeZoom] = useState(2.0);
  const [selectedPinId, setSelectedPinId] = useState('plumule');


  const currentStep = STAGES[currentStepIndex].id;

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    seedLabAudio.setMuted(next);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isAutoSoaking && soakDay < 3) {
      timer = setTimeout(() => {
        setSoakDay(prev => {
          const next = prev + 1;
          seedLabAudio.playBubbleFizz(isMuted);
          seedLabAudio.playGlassClink(isMuted);
          const newBubbles = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            left: 36 + Math.random() * 28,
            size: 7 + Math.random() * 9,
            duration: 1.2 + Math.random() * 0.7,
            delay: Math.random() * 0.3
          }));
          setBubbles(newBubbles);
          if (next >= 3) {
            setIsAutoSoaking(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isAutoSoaking, soakDay, isMuted]);

  const handleManualSoakDay = (day) => {
    setSoakDay(day);
    seedLabAudio.playSwitch(isMuted);
    seedLabAudio.playBubbleFizz(isMuted);
    const newBubbles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      left: 36 + Math.random() * 28,
      size: 7 + Math.random() * 9,
      duration: 1.2 + Math.random() * 0.7,
      delay: Math.random() * 0.3
    }));
    setBubbles(newBubbles);
  };

  const handlePeelChickpea = () => {
    if (activeTool !== 'tweezers') {
      setToolAlertMessage('Select the Precision Tweezers to peel the delicate seed coat!');
      return;
    }
    setToolAlertMessage('');
    seedLabAudio.playTweezersPeel(isMuted);
    setChickpeaPeelProgress(prev => Math.min(100, prev + 35));
  };

  const handleSplitChickpea = () => {
    seedLabAudio.playSwitch(isMuted);
    setChickpeaSplitProgress(prev => Math.min(100, prev + 50));
  };

  const handleCutMaize = () => {
    if (activeTool !== 'scalpel') {
      setToolAlertMessage('Tweezers cannot peel maize! In grains, the fruit wall is fused with the seed coat. Select the Surgical Scalpel to make a longitudinal slice.');
      return;
    }
    setToolAlertMessage('');
    seedLabAudio.playScalpelCut(isMuted);
    setMaizeCutProgress(prev => Math.min(100, prev + 35));
  };

  const handleResetLab = () => {
    seedLabAudio.playSwitch(isMuted);
    setCurrentStepIndex(0);
    setSoakDay(0);
    setIsAutoSoaking(false);
    setBubbles([]);
    setActiveSpecimen('chickpea');
    setActiveTool('tweezers');
    setChickpeaPeelProgress(0);
    setChickpeaSplitProgress(0);
    setMaizeCutProgress(0);
    setToolAlertMessage('');
    setLoupeSpecimen('chickpea');
    setLoupeZoom(2.0);
    setSelectedPinId('plumule');
  };

  const handleNextStep = () => {
    if (currentStepIndex < STAGES.length - 1) {
      seedLabAudio.playSwitch(isMuted);
      setCurrentStepIndex(prev => prev + 1);
    } else if (onNextActivity) {
      seedLabAudio.playSwitch(isMuted);
      onNextActivity();
    } else if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      seedLabAudio.playSwitch(isMuted);
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const chickpeaScale = 1 + (soakDay / 3) * 0.35;
  const maizeScale = 1 + (soakDay / 3) * 0.18;
  const waterAbsorbedGrams = (soakDay * 0.62).toFixed(2);
  const testaElasticity = soakDay === 0 ? 'Rigid / Brittle' : soakDay === 1 ? 'Wrinkled' : soakDay === 2 ? 'Loose / Soft' : 'Fully Hydrated & Slipping';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        background: 'linear-gradient(180deg, #D6EDFA 0%, #E8F7EE 16%, #F3FAF5 48%, #E5F5EB 82%, #D5EFE0 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(4px, 0.7vh, 8px) clamp(10px, 1.2vw, 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        color: '#1F2937'
      }}
    >
      <TopCornerFoliage side="left" />
      <TopCornerFoliage side="right" />
      <TopMountainBackdrop />
      <BottomNatureSilhouettes />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        @keyframes biologyFadeIn {
          from { opacity: 0; transform: scale(0.992) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-bio-stage {
          animation: biologyFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .bio-nav-btn {
          background: #14452F;
          color: #D1FAE5;
          border: 1.5px solid #2D6A4F;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 3px 10px rgba(20, 69, 47, 0.25);
          position: relative;
          z-index: 10;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: #1B5E3C;
          color: #FFFFFF;
          border-color: #10B981;
          transform: translateY(-1px);
          box-shadow: 0 5px 14px rgba(20, 69, 47, 0.35);
        }
        .bio-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FCD34D;
          border-radius: 12px;
          padding: 11px 24px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.38);
          position: relative;
          z-index: 10;
        }
        .bio-cta-btn:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.48);
        }

        .bio-parchment-card {
          background: linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 55%, #ECE5D5 100%);
          border: 2px solid #194720;
          border-radius: 20px;
          box-shadow: 0 10px 28px rgba(15, 74, 50, 0.14), inset 0 0 0 2px rgba(45, 106, 79, 0.10);
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        .bio-step-pill {
          padding: 9px 18px;
          border-radius: 22px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 0.9; }
          100% { transform: translateY(-210px) scale(1.3); opacity: 0; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. TOP HEADER SECTION: STRICTLY NON-OVERLAPPING CLEAN LAYOUT */}
      {/* ============================================================ */}
      {/* 1. TOP HEADER SECTION: COMPACT, BALANCED & ZERO OVERLAP     */}
      {/* ============================================================ */}
      <header
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1540px',
          textAlign: 'center',
          flexShrink: 0,
          marginBottom: 'clamp(2px, 0.4vh, 4px)',
          zIndex: 20
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '12px'
          }}
        >
          {/* LEFT: DASHBOARD BUTTON */}
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBackToDashboard}
            aria-label="Back to Dashboard"
            style={{ padding: '6px 14px', fontSize: '16px', flexShrink: 0 }}
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
            <span>Dashboard</span>
          </button>

          {/* CENTER: BADGES & TITLE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '2px 14px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
                }}
              >
                CLASS 6 • SCIENCE
              </span>
              <span
                style={{
                  background: '#14452F',
                  color: '#34D399',
                  borderRadius: '16px',
                  padding: '2px 14px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #10B981',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
                }}
              >
                ACTIVITY 2.8 • BOTANY LAB
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TitleVineBranch side="left" />
              <h1
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 900,
                  fontSize: '20px',
                  color: '#0A3B24',
                  margin: 0,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap'
                }}
              >
                Seed Dissection & Anatomy Station
              </h1>
              <TitleVineBranch side="right" />
            </div>
          </div>

          {/* RIGHT: SOUND, RESET, FULLSCREEN ROW */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={toggleMute}
              style={{
                background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(20, 69, 47, 0.92)',
                color: isMuted ? '#DC2626' : '#D1FAE5',
                border: `1.5px solid ${isMuted ? '#EF4444' : '#2D6A4F'}`,
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '16px',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetLab}
              title="Reset Station to Beginning"
              style={{
                background: 'rgba(20, 69, 47, 0.92)',
                color: '#D1FAE5',
                border: '1.5px solid #2D6A4F',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '16px',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              <RefreshCw size={15} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'rgba(20, 69, 47, 0.92)',
                color: '#D1FAE5',
                border: '1.5px solid #2D6A4F',
                borderRadius: '8px',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 3. MAIN SCIENTIFIC STAGE VIEWPORT (100% FIT, ZERO SCROLL)    */}
      {/* ============================================================ */}
      <main
        className="animate-bio-stage"
        style={{
          width: '100%',
          maxWidth: '1540px',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(3px, 0.5vh, 6px)',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* ========================================================== */}
        {/* STAGE 1: HYDRATION CHAMBER (REALISTIC BOROSILICATE BEAKER) */}
        {/* ========================================================== */}
        {currentStep === 'soak' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.6vh, 6px)', height: '100%', minHeight: 0, flex: 1, overflow: 'hidden' }}>
            {/* INSTRUCTIONAL BANNER */}
            <div
              className="bio-parchment-card"
              style={{
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#14452F',
                    color: '#34D399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <FlaskConical size={20} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: '#14452F',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '1px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      STAGE 01
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#0A3B24',
                        fontFamily: '"Fraunces", Georgia, serif',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Borosilicate Hydration Beaker & Degassing
                    </h2>
                  </div>
                  <p style={{ margin: '1px 0 0 0', fontSize: '16px', color: '#1B4D3E', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Submerge dry seeds in water. Observe imbibition—water influx through the micropyle causing cell expansion.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleNextStep}
                style={{ padding: '5px 14px', fontSize: '16px', flexShrink: 0 }}
              >
                <span>Proceed to Dissection Tray</span>
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* 2-COLUMN WORKSPACE: 70% MODEL (LEFT) + 30% CONTENT (RIGHT) */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'calc(70% - clamp(6px, 0.8vw, 10px)) calc(30% - clamp(6px, 0.8vw, 10px))',
                gap: 'clamp(8px, 1vw, 14px)',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}
            >
              {/* LEFT: 70% MODEL - REALISTIC BOROSILICATE GLASS BEAKER */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="bottom-right" />
                <RealisticSeedBeaker soakDay={soakDay} isAutoSoaking={isAutoSoaking} />
              </div>

              {/* RIGHT: 30% CONTENT - CHRONOLOGY & TELEMETRY */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'clamp(3px, 0.5vh, 6px)',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <span
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    CHRONOLOGY
                  </span>
                  <h3
                    style={{
                      margin: '3px 0 1px 0',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#0A3B24',
                      fontFamily: '"Fraunces", Georgia, serif'
                    }}
                  >
                    Simulated 72-Hour Immersion
                  </h3>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1B4D3E', fontWeight: 600, lineHeight: 1.3 }}>
                    Step through the 3-day timeline to inspect physical swelling and progressive softening of the seed coat.
                  </p>
                </div>

                {/* DAY SELECTION BUTTONS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', position: 'relative', zIndex: 5 }}>
                  {[0, 1, 2, 3].map((d) => {
                    const isCur = soakDay === d;
                    return (
                      <button
                        key={d}
                        onClick={() => handleManualSoakDay(d)}
                        style={{
                          padding: '5px 2px',
                          borderRadius: '8px',
                          background: isCur ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                          border: isCur ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                          color: isCur ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1px',
                          boxShadow: isCur ? '0 2px 8px rgba(20, 69, 47, 0.3)' : '0 1px 3px rgba(0,0,0,0.06)'
                        }}
                      >
                        <span>Day {d}</span>
                        <span style={{ fontSize: '16px', opacity: 0.85 }}>{d * 24}h</span>
                      </button>
                    );
                  })}
                </div>

                {/* AUTO SIMULATE BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    seedLabAudio.playSwitch(isMuted);
                    setSoakDay(0);
                    setIsAutoSoaking(true);
                  }}
                  disabled={isAutoSoaking}
                  className="bio-cta-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '6px 14px', fontSize: '16px' }}
                >
                  <Sparkles size={18} />
                  <span>{isAutoSoaking ? 'Simulating 72-Hour Immersion...' : 'Simulate 3-Day Hydration Cycle'}</span>
                </button>

                {/* TELEMETRY READOUTS */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.82)',
                    border: '1.5px solid #2D6A4F',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    position: 'relative',
                    zIndex: 5
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 700 }}>Water Mass Absorbed:</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#0A3B24', fontFamily: "'Outfit', sans-serif" }}>
                      +{waterAbsorbedGrams} g / seed
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 700 }}>Chickpea Expansion:</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#D97706', fontFamily: "'Outfit', sans-serif" }}>
                      +{Math.round((chickpeaScale - 1) * 100)}% Volume
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 700 }}>Testa Elasticity:</span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#0A3B24' }}>
                      {testaElasticity}
                    </span>
                  </div>
                </div>

                {/* BOTANICAL NOTE */}
                <div
                  style={{
                    background: '#EAF7EE',
                    borderLeft: '4px solid #10B981',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '16px',
                    color: '#0F3822',
                    lineHeight: 1.35,
                    position: 'relative',
                    zIndex: 5,
                    textAlign: 'justify'
                  }}
                >
                  <strong>Botanical Principle:</strong> Water penetrates through the <em>micropyle</em> pore into the cotyledons, initiating active enzyme synthesis and loosening the pectin layer of the seed coat.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 2: SURGICAL DISSECTION TRAY & TOOLS                  */}
        {/* ========================================================== */}
        {currentStep === 'peel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.6vh, 6px)', height: '100%', minHeight: 0, flex: 1, overflow: 'hidden' }}>
            {/* INSTRUCTIONAL BANNER */}
            <div
              className="bio-parchment-card"
              style={{
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#14452F',
                    color: '#34D399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Scissors size={20} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: '#14452F',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '1px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      STAGE 02
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#0A3B24',
                        fontFamily: '"Fraunces", Georgia, serif',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Peeling True Seed Coats vs Fused Grain Walls
                    </h2>
                  </div>
                  <p style={{ margin: '1px 0 0 0', fontSize: '16px', color: '#1B4D3E', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Select Precision Tweezers to peel the chickpea testa. Select the Surgical Scalpel to slice the maize kernel.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleNextStep}
                style={{ padding: '5px 14px', fontSize: '16px', flexShrink: 0 }}
              >
                <span>Advance to Optical Loupe</span>
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* ERROR / TOOL ALERT NOTIFICATION */}
            {toolAlertMessage && (
              <div
                style={{
                  background: '#FEE2E2',
                  border: '1.5px solid #DC2626',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#991B1B',
                  fontSize: '16px',
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{toolAlertMessage}</span>
              </div>
            )}

            {/* 2-COLUMN WORKSPACE: 70% MODEL (LEFT) + 30% CONTENT (RIGHT) */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'calc(70% - clamp(6px, 0.8vw, 10px)) calc(30% - clamp(6px, 0.8vw, 10px))',
                gap: 'clamp(8px, 1vw, 14px)',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}
            >
              {/* LEFT: 70% MODEL - DISSECTION PAN */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="bottom-right" />

                {/* CENTIMETER CALIBRATION RULER */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 8px 4px 8px',
                    borderBottom: '1.5px dashed #14452F',
                    position: 'relative',
                    zIndex: 5,
                    flexShrink: 0
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cm) => (
                    <span
                      key={cm}
                      style={{
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#14452F',
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {cm}cm
                    </span>
                  ))}
                </div>

                {/* SPECIMEN DISPLAY AREA */}
                <div
                  style={{
                    width: '100%',
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 0',
                    position: 'relative',
                    zIndex: 5,
                    overflow: 'hidden'
                  }}
                >
                  {activeSpecimen === 'chickpea' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%', height: '100%', justifyContent: 'center' }}>
                      <div
                        style={{
                          width: '100%',
                          flex: 1,
                          minHeight: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(220,240,230,0.3) 100%)',
                          borderRadius: '12px',
                          border: '1px solid rgba(20, 69, 47, 0.15)',
                          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
                          overflow: 'hidden'
                        }}
                      >
                        {chickpeaSplitProgress >= 100 ? (
                          <img
                            src={chickpeaSplitImg}
                            alt="Split Chickpea Showing Embryo Axis"
                            style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', filter: 'drop-shadow(0 8px 18px rgba(10, 59, 36, 0.25))' }}
                          />
                        ) : chickpeaPeelProgress >= 100 ? (
                          <img
                            src={diImg}
                            alt="Peeled Chickpea Cotyledons"
                            style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', filter: 'drop-shadow(0 8px 18px rgba(10, 59, 36, 0.25))' }}
                          />
                        ) : (
                          <img
                            src={dicot1Img}
                            alt="Chickpea Seed with Seed Coat"
                            style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', filter: 'drop-shadow(0 8px 18px rgba(10, 59, 36, 0.25))' }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          background: '#14452F',
                          color: '#D1FAE5',
                          borderRadius: '12px',
                          padding: '4px 14px',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          flexShrink: 0
                        }}
                      >
                        {chickpeaSplitProgress >= 100
                          ? 'Cotyledons Parted: Embryo Axis Exposed'
                          : chickpeaPeelProgress >= 100
                          ? 'Testa Removed: Fleshy Cotyledons Revealed'
                          : `Seed Coat Peel Progress: ${chickpeaPeelProgress}%`}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%', height: '100%', justifyContent: 'center' }}>
                      <div
                        style={{
                          width: '100%',
                          flex: 1,
                          minHeight: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(220,240,230,0.3) 100%)',
                          borderRadius: '12px',
                          border: '1px solid rgba(20, 69, 47, 0.15)',
                          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
                          overflow: 'hidden'
                        }}
                      >
                        {maizeCutProgress >= 100 ? (
                          <img
                            src={maizeCutImg}
                            alt="Longitudinal Section of Maize"
                            style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', filter: 'drop-shadow(0 8px 18px rgba(10, 59, 36, 0.25))' }}
                          />
                        ) : (
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            <img
                              src={maizeIntactImg}
                              alt="Whole Intact Maize Grain"
                              style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain', filter: 'drop-shadow(0 8px 18px rgba(10, 59, 36, 0.25))' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '16px',
                                bottom: '16px',
                                left: '50%',
                                width: '3px',
                                borderLeft: '3px dashed #DC2626',
                                transform: 'translateX(-50%)',
                                opacity: activeTool === 'scalpel' ? 0.95 : 0.4
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          background: '#14452F',
                          color: '#FDE68A',
                          borderRadius: '12px',
                          padding: '4px 14px',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          flexShrink: 0
                        }}
                      >
                        {maizeCutProgress >= 100
                          ? 'Longitudinal Section: Endosperm & Scutellum Exposed'
                          : `Longitudinal Section Progress: ${maizeCutProgress}%`}
                      </div>
                    </div>
                  )}
                </div>

                {/* SPECIMEN SWITCHER BUTTONS */}
                <div style={{ display: 'flex', gap: '8px', width: '100%', position: 'relative', zIndex: 5, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => {
                      seedLabAudio.playSwitch(isMuted);
                      setActiveSpecimen('chickpea');
                      setToolAlertMessage('');
                    }}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: activeSpecimen === 'chickpea' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                      border: activeSpecimen === 'chickpea' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                      color: activeSpecimen === 'chickpea' ? '#FFFFFF' : '#14452F',
                      fontSize: '16px',
                      fontWeight: 800,
                      fontFamily: "'Outfit', sans-serif",
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Specimen A: Chickpea (Dicot)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      seedLabAudio.playSwitch(isMuted);
                      setActiveSpecimen('maize');
                      setToolAlertMessage('');
                    }}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '8px',
                      background: activeSpecimen === 'maize' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                      border: activeSpecimen === 'maize' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                      color: activeSpecimen === 'maize' ? '#FFFFFF' : '#14452F',
                      fontSize: '16px',
                      fontWeight: 800,
                      fontFamily: "'Outfit', sans-serif",
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Specimen B: Maize (Monocot)
                  </button>
                </div>
              </div>

              {/* RIGHT: 30% CONTENT - SURGICAL INSTRUMENT DOCK */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(3px, 0.5vh, 6px)',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <span
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    INSTRUMENTS
                  </span>
                  <h3
                    style={{
                      margin: '3px 0 1px 0',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#0A3B24',
                      fontFamily: '"Fraunces", Georgia, serif'
                    }}
                  >
                    Surgical Dissection Dock
                  </h3>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1B4D3E', fontWeight: 600, lineHeight: 1.3 }}>
                    Select the instrument based on whether dissecting a true seed or a cereal grain.
                  </p>
                </div>

                {/* INSTRUMENT SELECTORS */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', position: 'relative', zIndex: 5 }}>
                  <button
                    type="button"
                    onClick={() => {
                      seedLabAudio.playSwitch(isMuted);
                      setActiveTool('tweezers');
                      setToolAlertMessage('');
                    }}
                    style={{
                      padding: '6px 4px',
                      borderRadius: '8px',
                      background: activeTool === 'tweezers' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                      border: activeTool === 'tweezers' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                      color: activeTool === 'tweezers' ? '#FFFFFF' : '#14452F',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    <Scissors size={20} />
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>Tweezers</span>
                    <span style={{ fontSize: '16px', opacity: 0.85 }}>Peel Testa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      seedLabAudio.playSwitch(isMuted);
                      setActiveTool('scalpel');
                      setToolAlertMessage('');
                    }}
                    style={{
                      padding: '6px 4px',
                      borderRadius: '8px',
                      background: activeTool === 'scalpel' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                      border: activeTool === 'scalpel' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                      color: activeTool === 'scalpel' ? '#FFFFFF' : '#14452F',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    <Layers size={20} />
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>Scalpel</span>
                    <span style={{ fontSize: '16px', opacity: 0.85 }}>Section Cut</span>
                  </button>
                </div>

                {/* PROCEDURAL ACTION BUTTONS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', zIndex: 5 }}>
                  {activeSpecimen === 'chickpea' ? (
                    <>
                      <button
                        type="button"
                        onClick={handlePeelChickpea}
                        disabled={chickpeaPeelProgress >= 100}
                        className="bio-cta-btn"
                        style={{ width: '100%', justifyContent: 'center', padding: '6px 12px', fontSize: '16px' }}
                      >
                        <Scissors size={18} />
                        <span>{chickpeaPeelProgress >= 100 ? 'Testa Fully Peeled' : 'Grip & Peel Seed Coat'}</span>
                      </button>

                      {chickpeaPeelProgress >= 100 && (
                        <button
                          type="button"
                          onClick={handleSplitChickpea}
                          disabled={chickpeaSplitProgress >= 100}
                          className="bio-cta-btn"
                          style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)', borderColor: '#10B981', padding: '6px 12px', fontSize: '16px' }}
                        >
                          <Layers size={18} />
                          <span>{chickpeaSplitProgress >= 100 ? 'Cotyledons Parted' : 'Part Cotyledons Along Axis'}</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCutMaize}
                      disabled={maizeCutProgress >= 100}
                      className="bio-cta-btn"
                      style={{ width: '100%', justifyContent: 'center', padding: '6px 12px', fontSize: '16px' }}
                    >
                      <Layers size={18} />
                      <span>{maizeCutProgress >= 100 ? 'Section Cut Complete' : 'Perform Longitudinal Section'}</span>
                    </button>
                  )}
                </div>

                {/* BOTANICAL PRINCIPLE */}
                <div
                  style={{
                    background: '#EAF7EE',
                    borderLeft: '4px solid #10B981',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '16px',
                    color: '#0F3822',
                    lineHeight: 1.35,
                    position: 'relative',
                    zIndex: 5,
                    textAlign: 'justify'
                  }}
                >
                  <strong>Botanical Insight:</strong> In chickpeas, the seed coat is free from the pod wall. In maize, the grain is a single-seeded fruit (caryopsis) where the fruit wall and seed coat are fused.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 3: OPTICAL LOUPE & BOTANICAL ANATOMY PINNING        */}
        {/* ========================================================== */}
        {currentStep === 'compare' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.6vh, 6px)', height: '100%', minHeight: 0, flex: 1, overflow: 'hidden' }}>
            {/* INSTRUCTIONAL BANNER */}
            <div
              className="bio-parchment-card"
              style={{
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#14452F',
                    color: '#34D399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ZoomIn size={20} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: '#14452F',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '1px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      STAGE 03
                    </span>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#0A3B24',
                        fontFamily: '"Fraunces", Georgia, serif',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Embryo Axis & Cotyledon Micro-Structures
                    </h2>
                  </div>
                  <p style={{ margin: '1px 0 0 0', fontSize: '16px', color: '#1B4D3E', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Inspect the exposed embryo under brass optical magnification. Click numbered pearl pins to examine landmarks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleNextStep}
                style={{ padding: '5px 14px', fontSize: '16px', flexShrink: 0 }}
              >
                <span>Next</span>
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* 2-COLUMN WORKSPACE: 70% MODEL (LEFT) + 30% CONTENT (RIGHT) */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'calc(70% - clamp(6px, 0.8vw, 10px)) calc(30% - clamp(6px, 0.8vw, 10px))',
                gap: 'clamp(8px, 1vw, 14px)',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}
            >
              {/* LEFT: 70% MODEL - BRASS OPTICAL LOUPE */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="bottom-right" />

                {/* CONTROLS BAR: SPECIMEN TOGGLE & ZOOM */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    position: 'relative',
                    zIndex: 5,
                    flexShrink: 0
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        seedLabAudio.playSwitch(isMuted);
                        setLoupeSpecimen('chickpea');
                        setSelectedPinId('plumule');
                      }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '8px',
                        background: loupeSpecimen === 'chickpea' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                        border: loupeSpecimen === 'chickpea' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                        color: loupeSpecimen === 'chickpea' ? '#FFFFFF' : '#14452F',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Dicot: Chickpea
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        seedLabAudio.playSwitch(isMuted);
                        setLoupeSpecimen('maize');
                        setSelectedPinId('endosperm');
                      }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '8px',
                        background: loupeSpecimen === 'maize' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                        border: loupeSpecimen === 'maize' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                        color: loupeSpecimen === 'maize' ? '#FFFFFF' : '#14452F',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Monocot: Maize
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#14452F', marginRight: '2px' }}>Zoom:</span>
                    {[2.0, 3.5, 5.0].map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => {
                          seedLabAudio.playLoupeMove(isMuted);
                          setLoupeZoom(z);
                        }}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: loupeZoom === z ? '#D97706' : 'rgba(255, 255, 255, 0.85)',
                          border: loupeZoom === z ? '1.5px solid #FCD34D' : '1px solid #2D6A4F',
                          color: loupeZoom === z ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: 'pointer'
                        }}
                      >
                        {z.toFixed(1)}×
                      </button>
                    ))}
                  </div>
                </div>

                {/* BRASS OPTICAL LOUPE HOUSING */}
                <div
                  style={{
                    position: 'relative',
                    width: 'clamp(230px, 32vh, 310px)',
                    height: 'clamp(230px, 32vh, 310px)',
                    borderRadius: '50%',
                    border: '8px solid #D97706',
                    boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6), 0 10px 26px rgba(10, 59, 36, 0.28)',
                    background: 'radial-gradient(circle at center, rgba(167, 243, 208, 0.25) 0%, rgba(20, 69, 47, 0.85) 100%)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      width: '85%',
                      height: '85%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: `scale(${loupeZoom * 0.52})`,
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={loupeSpecimen === 'chickpea' ? chickpeaSplitImg : maizeCutImg}
                      alt="Dissected Specimen"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))' }}
                    />

                    {/* NUMBERED PEARL PINS (STRICT ZERO TEXT ON TOP) */}
                    {(loupeSpecimen === 'chickpea' ? CHICKPEA_PINS : MAIZE_PINS).map((pin) => {
                      const isSelected = selectedPinId === pin.id;
                      return (
                        <button
                          key={pin.id}
                          type="button"
                          onClick={() => {
                            seedLabAudio.playSwitch(isMuted);
                            setSelectedPinId(pin.id);
                          }}
                          style={{
                            position: 'absolute',
                            left: `${pin.x}%`,
                            top: `${pin.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isSelected ? '#DC2626' : '#14452F',
                            border: '2px solid #FFFFFF',
                            boxShadow: isSelected ? '0 0 12px #DC2626' : '0 4px 8px rgba(0,0,0,0.45)',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: 900,
                            fontFamily: "'Outfit', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 20
                          }}
                        >
                          {pin.num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 700, textAlign: 'center', position: 'relative', zIndex: 5, flexShrink: 0 }}>
                  💡 Click pearl pins <strong>[1]</strong>, <strong>[2]</strong>, or <strong>[3]</strong> to inspect their botanical role.
                </div>
              </div>

              {/* RIGHT: 30% CONTENT - PIN DOSSIER CARD */}
              <div
                className="bio-parchment-card"
                style={{
                  padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(3px, 0.5vh, 6px)',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <span
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    PIN DOSSIER
                  </span>
                  <h3
                    style={{
                      margin: '3px 0 1px 0',
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#0A3B24',
                      fontFamily: '"Fraunces", Georgia, serif'
                    }}
                  >
                    Botanical Micro-Structure
                  </h3>
                  <p style={{ margin: 0, fontSize: '16px', color: '#1B4D3E', fontWeight: 600, lineHeight: 1.3 }}>
                    Detailed physiological examination of selected landmark.
                  </p>
                </div>

                {/* SELECTED PIN DETAILS */}
                {(() => {
                  const currentPinList = loupeSpecimen === 'chickpea' ? CHICKPEA_PINS : MAIZE_PINS;
                  const activePin = currentPinList.find((p) => p.id === selectedPinId) || currentPinList[0];

                  return (
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1.5px solid #14452F',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        position: 'relative',
                        zIndex: 5,
                        boxShadow: '0 2px 8px rgba(20, 69, 47, 0.1)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#14452F',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: 900,
                            fontFamily: "'Outfit', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {activePin.num}
                        </div>
                        <div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif' }}>
                            {activePin.name}
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>
                            {activePin.role}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: '16px',
                          color: '#1F2937',
                          lineHeight: 1.35,
                          background: '#F8FAF9',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          textAlign: 'justify'
                        }}
                      >
                        {activePin.detail}
                      </div>
                    </div>
                  );
                })()}

                {/* PIN LIST BUTTONS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative', zIndex: 5 }}>
                  <h4 style={{ margin: '1px 0', fontSize: '16px', fontWeight: 800, color: '#0A3B24' }}>
                    All Visible Structures:
                  </h4>
                  {(loupeSpecimen === 'chickpea' ? CHICKPEA_PINS : MAIZE_PINS).map((p) => {
                    const isSelected = selectedPinId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          seedLabAudio.playSwitch(isMuted);
                          setSelectedPinId(p.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: isSelected ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                          border: isSelected ? '1.5px solid #10B981' : '1px solid #2D6A4F',
                          color: isSelected ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: isSelected ? '#10B981' : 'rgba(20, 69, 47, 0.15)',
                            color: isSelected ? '#064E3B' : '#14452F',
                            fontSize: '16px',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {p.num}
                        </span>
                        <span style={{ flex: 1 }}>{p.name}</span>
                        {isSelected && <CheckCircle2 size={16} color="#34D399" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* 4. BOTTOM NAVIGATION BAR (MATCHING SLOGAN PAGE EXACTLY)      */}
      {/* ============================================================ */}
      <footer
        style={{
          width: '100%',
          maxWidth: '1380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          padding: '0 4px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 20
        }}
      >
        <button
          type="button"
          className="bio-nav-btn"
          disabled={currentStepIndex === 0}
          onClick={handlePrevStep}
          aria-label="Previous Step"
        >
          ← Previous Step
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <svg width="22" height="15" viewBox="0 0 24 16" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 12, 2 14 Z" fill="#2D6A4F" />
              <path d="M6 10 C10 6, 16 4, 22 2 C18 8, 12 10, 6 10 Z" fill="#52B788" />
            </svg>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#EAF7EE',
                border: '1.8px solid #14452F',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14452F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <svg width="22" height="15" viewBox="0 0 24 16" fill="none">
              <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 12, 2 14 Z" fill="#2D6A4F" />
              <path d="M6 10 C10 6, 16 4, 22 2 C18 8, 12 10, 6 10 Z" fill="#52B788" />
            </svg>
          </div>

          <div
            style={{
              background: '#14452F',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '4px 20px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.05em',
              boxShadow: '0 3px 10px rgba(20, 69, 47, 0.32)'
            }}
          >
            Stage {currentStepIndex + 1} / {STAGES.length}
          </div>
        </div>

        <button
          type="button"
          className="bio-cta-btn"
          onClick={handleNextStep}
          aria-label="Next"
        >
          <span>Next</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
