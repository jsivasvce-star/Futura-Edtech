import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Award, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext';
import darkForestBg from '../../../../../assets/dark_forest_bg.jpg';
import ch2LeafVenationMacro from '../../../../../assets/ch2_leaf_venation_macro.jpg';

import hibLeafImg from '../../../../../assets/hib_leaf.png';
import bananaLeafImg from '../../../../../assets/banana_leaf.png';
import grassLeafImg from '../../../../../assets/grass_leaf.png';
import roseLeafImg from '../../../../../assets/rose_leaf.png';
import maizeLeafImg from '../../../../../assets/maize_leaf.png';

import MagnifyingGlassStage from './MagnifyingGlassStage';
import BacklightStage from './BacklightStage';
import AnatomyStage from './AnatomyStage';
import CompareStage from './CompareStage';
import { venationAudio } from './venationAudio';
import specimen01HibiscusBlended from './specimen_01_hibiscus_blended.png';
import specimen02BananaBlended from './specimen_02_banana_blended.png';
import specimen03GrassBlended from './specimen_03_grass_blended.png';
import specimen04NeemBlended from './specimen_04_neem_blended.png';
import specimen05MangoBlended from './specimen_05_mango_blended.png';
import specimen06RoseBlended from './specimen_06_rose_blended.png';
import specimen07CompareBlended from './specimen_07_compare_blended.png';

// =========================================================================
// FULLSCREEN SPECIMEN SLIDES (ACTIVITY 2.5) — EXACT 16:9 HD SPECIMENS
// =========================================================================
const VENATION_SPECIMEN_SLIDES = [
  {
    id: 1,
    num: '01',
    name: 'Hibiscus Leaf',
    venation: 'Reticulate',
    image: specimen01HibiscusBlended
  },
  {
    id: 2,
    num: '02',
    name: 'Banana Leaf',
    venation: 'Parallel',
    image: specimen02BananaBlended
  },
  {
    id: 3,
    num: '03',
    name: 'Grass Leaf',
    venation: 'Parallel',
    image: specimen03GrassBlended
  },
  {
    id: 4,
    num: '04',
    name: 'Neem Leaf',
    venation: 'Reticulate',
    image: specimen04NeemBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 5,
    num: '05',
    name: 'Mango Leaf',
    venation: 'Reticulate',
    image: specimen05MangoBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 6,
    num: '06',
    name: 'Rose Leaf',
    venation: 'Reticulate',
    image: specimen06RoseBlended
  },
  {
    id: 7,
    num: '07',
    name: 'Different Leaves, Different Patterns',
    venation: 'Compare',
    image: specimen07CompareBlended
  }
];

const LEAVES = [
  {
    id: 'hibiscus',
    name: 'Hibiscus (Gudhal)',
    herbariumTag: 'HERBARIUM · I',
    botanicalName: 'Hibiscus rosa-sinensis',
    emoji: '🌺',
    bladeForm: 'Broad Oval Blade',
    venation: 'reticulate',
    desc: 'A broad oval leaf. When held to light, you see a central midrib with a fine net-like web of veins branching in all directions.',
    hint: 'Net-like pattern spreading from a central rib',
    plantGroup: 'Dicotyledon (Dicot)',
    rootType: 'Taproot System',
    keyTrait: 'Branching Net Web',
    image: hibLeafImg,
    venationType: 'Reticulate',
    color: '#dc2626',
  },
  {
    id: 'banana',
    name: 'Banana Plant',
    herbariumTag: 'HERBARIUM · II',
    botanicalName: 'Musa acuminata',
    emoji: '🍌',
    bladeForm: 'Giant Paddle Leaf',
    venation: 'parallel',
    desc: 'A long, wide leaf. When held to light, veins run straight and parallel from the midrib to the leaf edges — like lines on a ruled page.',
    hint: 'Long parallel lines running side by side',
    plantGroup: 'Monocotyledon (Monocot)',
    rootType: 'Fibrous Root System',
    keyTrait: 'Parallel Ribbons',
    image: bananaLeafImg,
    venationType: 'Parallel',
    color: '#ca8a04',
  },
  {
    id: 'grass',
    name: 'Common Grass',
    herbariumTag: 'HERBARIUM · III',
    botanicalName: 'Poaceae Family',
    emoji: '🌾',
    bladeForm: 'Slender Linear Blade',
    venation: 'parallel',
    desc: 'A narrow blade. Veins are fine and run exactly parallel to each other from base to tip — very easy to see when backlit.',
    hint: 'Thin lines running parallel to the long axis of the blade',
    plantGroup: 'Monocotyledon (Monocot)',
    rootType: 'Fibrous Root System',
    keyTrait: 'Continuous Parallel',
    image: grassLeafImg,
    venationType: 'Parallel',
    color: '#16a34a',
  },
  {
    id: 'rose',
    name: 'Garden Rose',
    herbariumTag: 'HERBARIUM · IV',
    botanicalName: 'Rosa indica',
    emoji: '🌹',
    bladeForm: 'Oval Serrated Leaflet',
    venation: 'reticulate',
    desc: 'A small oval leaflet. The central midrib is prominent and lateral veins branch out forming a complex reticulate (net) pattern.',
    hint: 'Branching network — like cracks in dried mud',
    plantGroup: 'Dicotyledon (Dicot)',
    rootType: 'Taproot System',
    keyTrait: 'Reticulate Mesh',
    image: roseLeafImg,
    venationType: 'Reticulate',
    color: '#e11d48',
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    herbariumTag: 'HERBARIUM · V',
    botanicalName: 'Zea mays',
    emoji: '🌽',
    bladeForm: 'Long Sword Blade',
    venation: 'parallel',
    desc: 'A long sword-shaped leaf. When held to light, clearly visible parallel veins run side-by-side the entire length of the blade.',
    hint: 'Clear parallel lines — no branching, just straight lines',
    plantGroup: 'Monocotyledon (Monocot)',
    rootType: 'Fibrous Root System',
    keyTrait: 'Parallel Tracks',
    image: maizeLeafImg,
    venationType: 'Parallel',
    color: '#d97706',
  },
];

const OPTIONS = [
  { id: 'reticulate', label: 'Reticulate (Net-like)', icon: '🕸️', color: '#7c3aed' },
  { id: 'parallel', label: 'Parallel (Straight lines)', icon: '📏', color: '#0891b2' },
];

const WORKBENCH_TOOLS = [
  { id: 'loupe', label: 'Magnifying Loupe', icon: '🔍', desc: '3.5× Optical Zoom' },
  { id: 'torch', label: 'Backlight Torch', icon: '🔦', desc: 'Transillumination' },
  { id: 'anatomy', label: 'Leaf Anatomy', icon: '🏷️', desc: 'X-Ray Pinpoints' },
  { id: 'compare', label: 'Compare Specimen', icon: '⚖️', desc: 'Dual Contrast' },
];

// =========================================================================
// SLOGAN PAGE BOTANICAL ORNAMENTS & NATURE MOTIFS
// =========================================================================

const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: 'clamp(110px, 11vw, 160px)',
    height: 'clamp(60px, 7vh, 85px)',
    pointerEvents: 'none',
    zIndex: 4,
    overflow: 'hidden',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.95
  }}>
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
      <path d="M125 54 C142 48, 158 58, 160 72 C146 77, 131 69, 125 54 Z" fill="#52B788" />
      <path d="M60 60 C76 55, 90 68, 90 82 C76 86, 64 76, 60 60 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="48"
    height="22"
    viewBox="0 0 80 32"
    fill="none"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      flexShrink: 0,
      opacity: 0.95
    }}
  >
    <path d="M75 16 C55 14, 35 8, 8 2" stroke="#1B4D3E" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#2D6A4F" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#40916C" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#52B788" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#2D6A4F" />
  </svg>
);

const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px' }}>
    <svg width="26" height="16" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#1B4D3E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#40916C" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#52B788" />
    </svg>
  </div>
);

const BottomNatureSilhouette = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '32px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.7
  }}>
    <svg width="100%" height="100%" viewBox="0 0 1200 50" preserveAspectRatio="none" fill="none">
      <path d="M0 36 Q300 22 600 32 T1200 26 L1200 50 L0 50 Z" fill="#2D6A4F" opacity="0.3" />
      <path d="M0 40 Q320 30 640 38 T1200 34 L1200 50 L0 50 Z" fill="#14452F" opacity="0.5" />
      <circle cx="95" cy="28" r="12" fill="#14452F" opacity="0.45" />
      <rect x="93" y="36" width="4" height="10" fill="#14452F" opacity="0.45" />
      <path d="M210 22 Q215 18 220 22 Q225 18 230 22" stroke="#14452F" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <path d="M245 16 Q249 12 253 16 Q257 12 261 16" stroke="#14452F" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      <circle cx="1080" cy="26" r="14" fill="#14452F" opacity="0.45" />
      <rect x="1078" y="34" width="4" height="12" fill="#14452F" opacity="0.45" />
    </svg>
  </div>
);

export default function LeafVenationLab({ onBackToDashboard, onPreviousPage, onNext }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [phase, setPhase] = useState('specimens'); // 'specimens' | 'lab'
  const [specimenIndex, setSpecimenIndex] = useState(0);

  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [allDone, setAllDone] = useState(false);
  const [subPage, setSubPage] = useState(1);
  const [workbenchTool, setWorkbenchTool] = useState('loupe');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (phase !== 'specimens') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setSpecimenIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex < VENATION_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
        } else {
          setPhase('lab');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, specimenIndex]);

  const leaf = LEAVES.find(l => l.id === selectedLeaf);
  const doneCount = Object.keys(checked).filter(k => checked[k]).length;

  const toggleMute = () => {
    const nextVal = !isMuted;
    setIsMuted(nextVal);
    venationAudio.setMuted(nextVal);
  };

  const handleCheck = (leafId) => {
    const correct = LEAVES.find(l => l.id === leafId).venation;
    const isRight = answers[leafId] === correct;
    setChecked(prev => ({ ...prev, [leafId]: isRight }));
    if (isRight) {
      venationAudio.playSuccessChime();
      const newChecked = { ...checked, [leafId]: true };
      if (Object.keys(newChecked).filter(k => newChecked[k]).length === LEAVES.length) {
        setAllDone(true);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      }
    }
  };

  const handleReset = () => {
    setSelectedLeaf(null);
    setAnswers({});
    setChecked({});
    setAllDone(false);
    setSubPage(1);
    setWorkbenchTool('loupe');
  };

  const handleSelectLeaf = (leafId) => {
    setSelectedLeaf(leafId);
    setSubPage(2);
    setWorkbenchTool('loupe');
    venationAudio.playSwitch();
  };

  const handleNextLeaf = () => {
    const currentIndex = LEAVES.findIndex(l => l.id === selectedLeaf);
    const nextIndex = (currentIndex + 1) % LEAVES.length;
    setSelectedLeaf(LEAVES[nextIndex].id);
    venationAudio.playSwitch();
  };

  if (phase === 'specimens') {
    const activeSlide = VENATION_SPECIMEN_SLIDES[specimenIndex];
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#07160E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1000
      }}>
        <style>{`
          html, body, #root {
            overflow: hidden !important;
            height: 100vh !important;
          }
        `}</style>

        {/* Exact 16:9 Aspect-Ratio Container without pixel break */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vh * (16 / 9))',
          maxHeight: 'calc(100vw * (9 / 16))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={activeSlide.image}
            alt={activeSlide.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5))'
            }}
          />
        </div>

        {/* Floating Bottom Left Control: Back */}
        <button
          onClick={() => {
            if (specimenIndex > 0) {
              setSpecimenIndex(prev => prev - 1);
              venationAudio.playSwitch();
            } else if (onPreviousPage) {
              onPreviousPage();
            } else if (onBackToDashboard) {
              onBackToDashboard();
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '2px solid #CBD5E1',
            borderRadius: '26px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 800,
            color: '#1E293B',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(2px)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Floating Bottom Right: Next Slide or Enter Lab */}
        <button
          onClick={() => {
            if (specimenIndex < VENATION_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
              venationAudio.playSwitch();
            } else {
              setPhase('lab');
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
            border: '2px solid #86EFAC',
            borderRadius: '28px',
            padding: '11px 26px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 6px 22px rgba(22, 101, 52, 0.5)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {specimenIndex < VENATION_SPECIMEN_SLIDES.length - 1 ? (
            <>Next <ArrowRight size={20} /></>
          ) : (
            <>Enter Activity 2.5 Lab <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', color: '#F8FAFC', fontFamily: 'var(--geo-font)', overflow: 'hidden', padding: '0.6rem', boxSizing: 'border-box' }}>
      <style>{`
        /* Botanical Slogan-Style Bottom Navigation Buttons */
        .bio-nav-btn {
          background: #14452F;
          color: #D1FAE5;
          border: 1.5px solid #2D6A4F;
          border-radius: 12px;
          padding: 10px 24px;
          font-size: 18px;
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
        .bio-nav-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .bio-nav-btn:disabled {
          opacity: 0.32;
          cursor: not-allowed;
          box-shadow: none;
        }

        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FCD34D;
          border-radius: 12px;
          padding: 10px 26px;
          font-size: 18px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.38);
          position: relative;
          z-index: 10;
        }
        .bio-cta-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.48);
        }
        .bio-cta-btn:active:not(:disabled) {
          transform: translateY(1px);
        }

        .bench-tool-btn {
          background: rgba(250, 248, 242, 0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          color: #14452F;
          border: 1.8px solid #14452F;
          border-radius: 12px;
          padding: 8px 18px;
          font-size: 18px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(20, 69, 47, 0.1);
        }
        .bench-tool-btn.active {
          background: #14452F;
          color: #FFFFFF;
          border-color: #10B981;
          box-shadow: 0 4px 12px rgba(20, 69, 47, 0.3);
          transform: translateY(-1px);
        }

        /* Realistic Botanical Transillumination & Leaf Breathing Animations */
        @keyframes leafFloatBreathe {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
          }
          33% {
            transform: translateY(-5px) rotate(1.4deg) scale(1.03);
            filter: drop-shadow(0 10px 22px rgba(52, 211, 153, 0.55));
          }
          66% {
            transform: translateY(2px) rotate(-1.2deg) scale(0.99);
            filter: drop-shadow(0 5px 12px rgba(0, 0, 0, 0.4));
          }
        }

        @keyframes sunbeamSweep {
          0% {
            transform: translate(-140%, -30%) rotate(25deg);
            opacity: 0;
          }
          20% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.95;
          }
          80% {
            opacity: 0.55;
          }
          100% {
            transform: translate(160%, 50%) rotate(25deg);
            opacity: 0;
          }
        }

        @keyframes chloroplastPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.92);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.12);
          }
        }

        .botanical-leaf-card:hover .leaf-floating-specimen {
          transform: scale(1.06) translateY(-4px) !important;
          filter: drop-shadow(0 12px 24px rgba(52, 211, 153, 0.65)) !important;
        }
        .botanical-leaf-card:hover .chloroplast-corona {
          opacity: 0.95 !important;
          transform: scale(1.2) !important;
        }
      `}</style>
      
      {/* ==================== PAGE 1: LEAF SPECIMEN SELECTION GRID (SLOGAN PAGE STYLE) ==================== */}
      {subPage === 1 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '2.5px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          padding: '0.45rem 1.4rem 0.4rem',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Slogan Page Hanging Corner Foliage */}
          <TopCornerFoliage side="left" />
          <TopCornerFoliage side="right" />

          {/* Slogan Page Bottom Nature Silhouette */}
          <BottomNatureSilhouette />

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2.5px solid rgba(20, 69, 47, 0.2)',
            paddingBottom: '0.3rem',
            position: 'relative',
            zIndex: 5,
            flexShrink: 0
          }}>
            {/* Left: Back to Dashboard */}
            <button
              onClick={onBackToDashboard}
              style={{
                background: 'rgba(15, 23, 42, 0.50)',
                border: '2px solid #D4AF37',
                color: '#F8FAFC',
                borderRadius: '12px',
                padding: '5px 14px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 3px 8px rgba(20, 69, 47, 0.1)',
                transition: 'transform 0.15s ease'
              }}
            >
              <ArrowLeft size={18} color="#14452F" />
              <span>Back to Dashboard</span>
            </button>

            {/* Center: Slogan Title with Vine Branches, Sprout, and Sanskrit Motto */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TitleVineBranch side="left" />
                <div style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#FBBF24',
                  fontFamily: '"Fraunces", Georgia, serif',
                  textAlign: 'center',
                  letterSpacing: '-0.3px',
                  textShadow: '0 1px 2px rgba(20, 69, 47, 0.1)'
                }}>
                  Activity 2.5 · Leaf Venation Laboratory
                </div>
                <TitleVineBranch side="right" />
              </div>

              <TitleSprout />

              <div style={{
                fontSize: '16px',
                color: '#064E3B',
                fontWeight: '800',
                fontFamily: '"Outfit", sans-serif',
                background: 'rgba(20, 69, 47, 0.08)',
                border: '1.5px solid rgba(20, 69, 47, 0.2)',
                padding: '2px 14px',
                borderRadius: '999px',
                marginTop: '1px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.06)'
              }}>
                ✦ सर्वभूतहिते रताः · Reticulate & Parallel Venation ✦
              </div>
            </div>

            {/* Right: Reset Lab */}
            <button
              onClick={handleReset}
              style={{
                background: 'rgba(15, 23, 42, 0.50)',
                border: '2px solid #D4AF37',
                color: '#F8FAFC',
                padding: '7px 14px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 3px 8px rgba(20, 69, 47, 0.1)'
              }}
            >
              <RefreshCw size={16} color="#14452F" />
              <span>Reset Lab</span>
            </button>
          </div>

          {/* 5 Specimen Cards Grid - Unique Botanical Herbarium Plates */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.65rem',
            flex: 1,
            minHeight: 0,
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 3,
            margin: '0.4rem 0 0.3rem 0'
          }}>
            {LEAVES.map((l, idx) => {
              const isCheckedTrue = checked[l.id] === true;
              const isCheckedFalse = checked[l.id] === false;

              return (
                <div
                  key={l.id}
                  className="botanical-leaf-card"
                  onClick={() => handleSelectLeaf(l.id)}
                  style={{
                    background: '#FCFBF7',
                    border: isCheckedTrue ? '2.5px solid #059669' : '2px solid #1B4D3E',
                    borderRadius: '18px',
                    padding: '10px 10px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '6px',
                    boxShadow: isCheckedTrue ? '0 8px 22px rgba(5, 150, 105, 0.16)' : '0 6px 18px rgba(20, 69, 47, 0.08)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = isCheckedTrue ? '0 12px 26px rgba(5, 150, 105, 0.24)' : '0 10px 24px rgba(20, 69, 47, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isCheckedTrue ? '0 8px 22px rgba(5, 150, 105, 0.16)' : '0 6px 18px rgba(20, 69, 47, 0.08)';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: '5px' }}>
                    {/* Botanical Herbarium Tag & Verified Seal Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{
                        background: '#EAF7EE',
                        color: '#1B4D3E',
                        border: '1.5px solid #2D6A4F',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '900',
                        fontFamily: '"JetBrains Mono", monospace',
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap'
                      }}>
                        🌿 #{idx + 1}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '900',
                          color: isCheckedTrue ? '#065F46' : isCheckedFalse ? '#991B1B' : '#854D0E',
                          background: isCheckedTrue ? '#D1FAE5' : isCheckedFalse ? '#FEE2E2' : '#FEF3C7',
                          border: `1.5px solid ${isCheckedTrue ? '#6EE7B7' : isCheckedFalse ? '#FCA5A5' : '#FDE68A'}`,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap'
                        }}>
                          {isCheckedTrue ? '✓ VERIFIED' : isCheckedFalse ? '● RETRY' : '● UNTESTED'}
                        </span>
                      </div>
                    </div>

                    {/* Leaf Common Name & Latin Botanical Classification */}
                    <div style={{ margin: '1px 0 0 0' }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#F8FAFC',
                        fontFamily: '"Fraunces", Georgia, serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <span style={{ fontSize: '1.25rem' }}>{l.emoji}</span>
                        <span>{l.name}</span>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontStyle: 'italic',
                        color: '#047857',
                        fontWeight: '700',
                        marginTop: '1px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {l.botanicalName}
                      </div>
                    </div>

                    {/* Sunlight Transillumination Light-Stage Mount */}
                    <div style={{
                      height: '195px',
                      background: 'linear-gradient(180deg, #0A2417 0%, #04140C 100%)',
                      borderRadius: '14px',
                      border: '2px solid #2D6A4F',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 0 6px 0',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 3px 12px rgba(0, 0, 0, 0.45)'
                    }}>
                      {/* Naturalist Light-Stage Sleek Single-Line Banner Strip */}
                      <div style={{
                        width: '100%',
                        height: '24px',
                        background: 'rgba(27, 77, 62, 0.94)',
                        backdropFilter: 'blur(2px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        borderBottom: '1px solid rgba(52, 211, 153, 0.25)',
                        zIndex: 3
                      }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '900',
                          color: '#34D399',
                          fontFamily: '"JetBrains Mono", monospace',
                          letterSpacing: '0.03em'
                        }}>
                          ☀️ LIGHT-STAGE · 4×
                        </span>
                      </div>

                      {/* Luminous Chloroplast Backlight Corona with Pulse Animation */}
                      <div
                        className="chloroplast-corona"
                        style={{
                          position: 'absolute',
                          inset: '20px 8px 8px 8px',
                          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.35) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 75%)',
                          animation: `chloroplastPulse ${3.8 + (idx % 3) * 0.4}s ease-in-out infinite`,
                          animationDelay: `${idx * 0.5}s`,
                          transition: 'all 0.3s ease',
                          pointerEvents: 'none'
                        }}
                      />

                      {/* Translucent Sunlight Ray / Vein Illumination Sweep Animation */}
                      <div style={{
                        position: 'absolute',
                        top: '-30%',
                        left: '-40%',
                        width: '180%',
                        height: '160%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 35%, rgba(110, 231, 183, 0.3) 48%, rgba(254, 240, 138, 0.38) 52%, rgba(110, 231, 183, 0.28) 56%, transparent 75%)',
                        animation: `sunbeamSweep ${4.4 + (idx % 2) * 0.6}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                        animationDelay: `${idx * 0.85}s`,
                        pointerEvents: 'none',
                        zIndex: 2
                      }} />

                      {/* Specimen Leaf Image with Realistic Breathing & Sway Animation */}
                      <img
                        src={l.image}
                        alt={l.name}
                        className="leaf-floating-specimen"
                        style={{
                          maxHeight: '142px',
                          maxWidth: '90%',
                          objectFit: 'contain',
                          position: 'relative',
                          zIndex: 1,
                          marginTop: '2px',
                          animation: `leafFloatBreathe ${4.6 + (idx % 3) * 0.5}s ease-in-out infinite`,
                          animationDelay: `${idx * 0.65}s`,
                          transition: 'transform 0.3s ease, filter 0.3s ease'
                        }}
                      />

                      {/* Bottom Naturalist Inspection Cue */}
                      <div style={{
                        fontSize: '16px',
                        color: '#A7F3D0',
                        fontWeight: '700',
                        textAlign: 'center',
                        zIndex: 2,
                        fontFamily: '"Outfit", sans-serif',
                        lineHeight: 1
                      }}>
                        ✨ Sunlight reveals veins
                      </div>
                    </div>

                    {/* Leaf Morphology & Architecture Dossier - Clean Single-Line Rows */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '7px 9px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <span style={{ color: '#059669' }}>🌿</span>
                        <span style={{ color: '#0F172A' }}>{l.bladeForm}</span>
                      </div>

                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <span style={{ color: '#D97706' }}>🌱</span>
                        <span style={{ color: '#0F172A' }}>{l.plantGroup.includes('Dicot') ? 'Dicot · Taproot' : 'Monocot · Fibrous'}</span>
                      </div>

                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <span style={{ color: '#2563EB' }}>🔬</span>
                        <span style={{
                          fontWeight: '900',
                          color: isCheckedTrue ? '#059669' : isCheckedFalse ? '#DC2626' : '#D97706'
                        }}>
                          {isCheckedTrue ? `✓ ${l.venationType}` : isCheckedFalse ? 'Retry Diagnosis' : 'Net or Parallel?'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botanical Inspection Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectLeaf(l.id);
                    }}
                    style={{
                      background: isCheckedTrue
                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                        : 'linear-gradient(135deg, #1B4D3E 0%, #14452F 100%)',
                      color: '#FFFFFF',
                      border: isCheckedTrue ? '2px solid #34D399' : '2px solid #52B788',
                      borderRadius: '12px',
                      padding: '9px 12px',
                      fontSize: '17px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: isCheckedTrue
                        ? '0 4px 14px rgba(5, 150, 105, 0.35)'
                        : '0 4px 14px rgba(27, 77, 62, 0.35)',
                      fontFamily: '"Outfit", sans-serif',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isCheckedTrue ? (
                      <span>✓ Verified Specimen</span>
                    ) : (
                      <>
                        <span>🔍 Inspect Veins</span>
                        <span style={{ fontSize: '18px' }}>➔</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ==================== Slogan-Style Bottom Navigation Footer (Back, Previous Page & Next) ==================== */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '4px',
            padding: '2px 4px 0',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 20,
            flexShrink: 0
          }}>
            {/* Left Navigation Buttons: Back & Previous Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={onBackToDashboard}
                aria-label="Back to Dashboard"
              >
                ← Back
              </button>

              <button
                type="button"
                className="bio-nav-btn"
                onClick={onPreviousPage || onBackToDashboard}
                aria-label="Previous Page"
              >
                ← Previous Page
              </button>

              <button
                type="button"
                className="bio-nav-btn"
                onClick={() => {
                  setSpecimenIndex(0);
                  setPhase('specimens');
                }}
                style={{ background: '#064E3B', borderColor: '#34D399', color: '#D1FAE5' }}
                aria-label="View Specimen Slides"
              >
                🌿 Specimen Slides
              </button>
            </div>

            {/* Center Solved/Progress Indicator with Globe & Leaves Motif (matching Slogan Page) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <svg width="22" height="15" viewBox="0 0 24 16" fill="none" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 12, 2 14 Z" fill="#2D6A4F" />
                  <path d="M6 10 C10 6, 16 4, 22 2 C18 8, 12 10, 6 10 Z" fill="#52B788" />
                </svg>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#EAF7EE',
                  border: '1.8px solid #D4AF37',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14452F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

              <div style={{
                background: '#14452F',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '3px 18px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '16px',
                letterSpacing: '0.04em',
                boxShadow: '0 3px 10px rgba(20, 69, 47, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>Activity 2.5 · {doneCount} / {LEAVES.length} Leaves Identified</span>
                <div style={{ width: '60px', height: 6, background: 'rgba(15, 23, 42, 0.45)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#34D399', width: `${(doneCount / LEAVES.length) * 100}%`, transition: 'width 0.4s' }} />
                </div>
              </div>
            </div>

            {/* Right Navigation Button: Next Activity */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  if (onNext) onNext();
                  else if (onBackToDashboard) onBackToDashboard('next_activity');
                }}
                aria-label="Next: Act 2.6 Root Systems"
              >
                <span>Next: Act 2.6 Root Systems</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PAGE 2: HIGH-FIDELITY BOTANICAL LAB WORKBENCH ==================== */}
      {subPage === 2 && leaf && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '2.5px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)',
          padding: '0.45rem 1.4rem 0.4rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Top Corner Foliage */}
          <TopCornerFoliage side="left" />
          <TopCornerFoliage side="right" />

          {/* Workbench Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2.5px solid rgba(20, 69, 47, 0.25)',
            paddingBottom: '0.4rem',
            position: 'relative',
            zIndex: 5,
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setSubPage(1)}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '800',
                  padding: '7px 16px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <ArrowLeft size={20} color="#14452F" />
                <span>Leaf Grid</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{leaf.emoji}</span>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif' }}>
                  {leaf.name} Inspection Bench
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Sound Mute Toggle */}
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute Lab Sounds' : 'Mute Lab Sounds'}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  padding: '7px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '18px',
                  fontWeight: '800'
                }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
              </button>

              <span style={{ fontSize: '20px', color: '#F8FAFC', fontWeight: '900' }}>
                Progress: {doneCount} / {LEAVES.length}
              </span>

              <button
                onClick={handleNextLeaf}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '1.8px solid #FDE68A',
                  color: '#ffffff',
                  padding: '8px 18px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.25)'
                }}
              >
                Next Specimen ➔
              </button>
            </div>
          </div>

          {/* Workbench Tool Selector Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '6px 0',
            position: 'relative',
            zIndex: 5,
            flexShrink: 0
          }}>
            {WORKBENCH_TOOLS.map(tool => (
              <button
                key={tool.id}
                className={`bench-tool-btn ${workbenchTool === tool.id ? 'active' : ''}`}
                onClick={() => {
                  setWorkbenchTool(tool.id);
                  venationAudio.playSwitch();
                }}
              >
                <span style={{ fontSize: '20px' }}>{tool.icon}</span>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          {/* Main Inspection Area: Split Stage & Diagnosis Panel */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr',
            gap: '16px',
            position: 'relative',
            zIndex: 4,
            overflow: 'hidden'
          }}>
            {/* Left: Dynamic Interactive Botanical Stage */}
            <div style={{
              height: '100%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {workbenchTool === 'loupe' && <MagnifyingGlassStage leaf={leaf} isLight={isLight} />}
              {workbenchTool === 'torch' && <BacklightStage leaf={leaf} />}
              {workbenchTool === 'anatomy' && <AnatomyStage leaf={leaf} />}
              {workbenchTool === 'compare' && <CompareStage currentLeaf={leaf} allLeaves={LEAVES} />}
            </div>

            {/* Right: Botanical Diagnosis & NCERT Lab Notebook (Fully Covers Space) */}
            {/* Right: Botanical Diagnosis & NCERT Lab Notebook (Fully Fits With Zero Scroll) */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.50)',
              border: '2.5px solid rgba(20, 69, 47, 0.5)',
              borderRadius: '18px',
              padding: '14px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(20, 69, 47, 0.12)',
              overflow: 'hidden',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid rgba(20,69,47,0.2)',
                  paddingBottom: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif', lineHeight: '1.2' }}>
                      {leaf.name}
                    </div>
                    <div style={{ fontSize: '16px', color: '#047857', fontWeight: '800', marginTop: '2px' }}>
                      Botanical Lab Specimen
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', lineHeight: '1' }}>{leaf.emoji}</div>
                </div>

                {/* Leaf Description */}
                <div style={{
                  fontSize: '17px',
                  color: '#1E293B',
                  fontWeight: '600',
                  lineHeight: '1.45'
                }}>
                  {leaf.desc}
                </div>

                {/* NCERT Botanical Quick-Facts Card */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: 'rgba(20, 69, 47, 0.05)',
                  border: '1.8px solid rgba(20, 69, 47, 0.22)',
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                      🌿 Plant Group:
                    </div>
                    <div style={{ fontSize: '16px', color: '#047857', fontWeight: '800', marginTop: '2px' }}>
                      {leaf.plantGroup}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                      🌱 Root System:
                    </div>
                    <div style={{ fontSize: '16px', color: '#047857', fontWeight: '800', marginTop: '2px' }}>
                      {leaf.rootType}
                    </div>
                  </div>
                </div>
              </div>

              {/* NCERT Classification Question & Buttons */}
              <div style={{ borderTop: '2px solid rgba(20,69,47,0.2)', paddingTop: '10px' }}>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#F8FAFC', marginBottom: '8px' }}>
                  What venation pattern do you see in this leaf?
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: answers[selectedLeaf] || checked[selectedLeaf] !== undefined ? '8px' : '0px' }}>
                  {OPTIONS.map(opt => {
                    const isSelected = answers[selectedLeaf] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !checked[selectedLeaf] && setAnswers(a => ({ ...a, [selectedLeaf]: opt.id }))}
                        style={{
                          background: isSelected ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                          border: isSelected ? '2.5px solid #10B981' : '2px solid #14452F',
                          color: isSelected ? '#FFFFFF' : '#14452F',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          cursor: checked[selectedLeaf] ? 'default' : 'pointer',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontWeight: '900',
                          boxShadow: isSelected ? '0 4px 14px rgba(20, 69, 47, 0.25)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {answers[selectedLeaf] && !checked[selectedLeaf] && (
                  <button
                    onClick={() => handleCheck(selectedLeaf)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      border: '1.8px solid #FDE68A',
                      color: '#ffffff',
                      padding: '10px 0',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '19px',
                      fontWeight: '900',
                      boxShadow: '0 4px 16px rgba(20, 69, 47, 0.35)'
                    }}
                  >
                    Verify Diagnosis ✓
                  </button>
                )}

                {checked[selectedLeaf] === true && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '2px solid #10B981',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    textAlign: 'center'
                  }}>
                    <div style={{ color: '#047857', fontWeight: '900', fontSize: '18px' }}>
                      ✅ Correct! It has {leaf.venationType} venation.
                    </div>
                  </div>
                )}

                {checked[selectedLeaf] === false && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '2px solid #EF4444',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ color: '#B91C1C', fontWeight: '900', fontSize: '17px' }}>
                      ❌ Look at the light/loupe pattern again!
                    </div>
                    <button
                      onClick={() => {
                        setAnswers(a => ({ ...a, [selectedLeaf]: null }));
                        setChecked(c => {
                          const n = { ...c };
                          delete n[selectedLeaf];
                          return n;
                        });
                      }}
                      style={{
                        background: '#EF4444',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '800'
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ==================== Slogan-Style Bottom Navigation Footer in Workbench ==================== */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '4px',
            padding: '2px 4px 0',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 20,
            flexShrink: 0
          }}>
            {/* Left Navigation Buttons: Back & Previous Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={() => setSubPage(1)}
                aria-label="Back to Grid"
              >
                ← Back to Grid
              </button>

              <button
                type="button"
                className="bio-nav-btn"
                onClick={onPreviousPage || onBackToDashboard}
                aria-label="Previous Page"
              >
                ← Previous Page
              </button>
            </div>

            {/* Center Progress Pill */}
            <div style={{
              background: '#14452F',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '3px 18px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.04em',
              boxShadow: '0 3px 10px rgba(20, 69, 47, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>Activity 2.5 · {doneCount} / {LEAVES.length} Leaves Identified</span>
              <div style={{ width: '60px', height: 6, background: 'rgba(15, 23, 42, 0.45)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#34D399', width: `${(doneCount / LEAVES.length) * 100}%`, transition: 'width 0.4s' }} />
              </div>
            </div>

            {/* Right Navigation Button: Next Activity */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  if (onNext) onNext();
                  else if (onBackToDashboard) onBackToDashboard('next_activity');
                }}
                aria-label="Next: Act 2.6 Root Systems"
              >
                <span>Next: Act 2.6 Root Systems</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All done overlay */}
      {allDone && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.50)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', zIndex: 50, textAlign: 'center', padding: '2rem' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.50)',
            border: '2px solid #D4AF37',
            borderRadius: '24px',
            padding: '2.5rem 3rem',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)',
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <Award size={68} color="#14452F" style={{ filter: 'drop-shadow(0 4px 12px rgba(20,69,47,0.3))' }} />
            <h2 style={{ color: '#FBBF24', margin: 0, fontSize: '24px', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif' }}>Venation Expert Badge!</h2>
            <p style={{ color: '#2A3B2C', maxWidth: 480, lineHeight: 1.6, fontSize: '16px', fontWeight: '600', textAlign: 'center' }}>
              You correctly identified all 5 leaf venation patterns!<br />
              <strong style={{ color: '#F8FAFC' }}>Hibiscus, Rose</strong> → Reticulate (net-like)<br />
              <strong style={{ color: '#F8FAFC' }}>Banana, Grass, Maize</strong> → Parallel (straight lines)
            </p>
            <p style={{ color: '#4B5563', fontSize: '16px', maxWidth: 460, fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center' }}>
              Remember: Plants with reticulate venation usually have taproots. Plants with parallel venation usually have fibrous roots!
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button onClick={handleReset} style={{ background: 'rgba(15, 23, 42, 0.50)', border: '1.8px solid #D4AF37', color: '#F8FAFC', padding: '0.75rem 1.85rem', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '800' }}>Redo Lab</button>
              <button
                onClick={() => {
                  if (onNext) onNext();
                  else if (onBackToDashboard) onBackToDashboard('next_activity');
                }}
                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', border: '1.8px solid #FDE68A', color: '#fff', padding: '0.75rem 1.85rem', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '900', boxShadow: '0 4px 12px rgba(20, 69, 47, 0.35)' }}
              >
                Next: Act 2.6 Root Systems ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
