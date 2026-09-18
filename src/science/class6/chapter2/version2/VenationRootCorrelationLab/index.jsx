import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Award,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { correlationAudio } from './correlationAudio';

// High-Resolution Botanical Photographic Assets
// 1. Lemon Grass
import grassPlantImg from '../../../../../assets/grass_1.png';
import lemongrassLeafImg from '../../../../../assets/lemongrass_leaf.png';
import lemongrassRootImg from '../../../../../assets/lemongrass_root.png';

// 2. Marigold
import marigoldPlantImg from '../../../../../assets/marigold_1.png';
import marigoldLeafImg from '../../../../../assets/marigold_leaf.png';
import marigoldRootImg from '../../../../../assets/marigold_root.png';

// 3. Sadabahar (Periwinkle)
import sadabaharPlantImg from '../../../../../assets/sadabahar_plant.png';
import sadabaharLeafImg from '../../../../../assets/sadabahar_leaf.png';
import sadabaharRootImg from '../../../../../assets/sadabahar_root.png';

// 4. Mustard
import mustardPlantImg from '../../../../../assets/mustard_1.png';
import mustardLeafImg from '../../../../../assets/mustard_leaf.png';
import mustardRootImg from '../../../../../assets/mustard_root.png';

// 5. Chickpea (Gram)
import chickpeaPlantImg from '../../../../../assets/chickpea_plant.png';
import chickpeaLeafImg from '../../../../../assets/chickpea_leaf.png';
import chickpeaRootImg from '../../../../../assets/chickpea_root.png';

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
// BOTANICAL SPECIMEN DATA (5 PLANTS FROM NCERT TABLE 2.4)
// ============================================================

const PLANTS_DATA = [
  {
    id: 'lemongrass',
    num: '01',
    name: 'Lemon Grass',
    family: 'Poaceae (Monocot)',
    venation: 'parallel',
    root: 'fibrous',
    plantImg: grassPlantImg,
    leafImg: lemongrassLeafImg,
    rootImg: lemongrassRootImg,
    hint: 'Slender lemon grass blade with parallel longitudinal veins. Uprooting shows a dense cluster of fibrous roots originating from the stem base.',
    botanicalNote: 'Monocot plant: parallel venation channels sap through parallel vascular bundles, supported by adventitious fibrous roots.'
  },
  {
    id: 'marigold',
    num: '02',
    name: 'Marigold',
    family: 'Asteraceae (Dicot)',
    venation: 'reticulate',
    root: 'taproot',
    plantImg: marigoldPlantImg,
    leafImg: marigoldLeafImg,
    rootImg: marigoldRootImg,
    hint: 'Serrated pinnate marigold leaf with a distinct central midrib and branching vein network. Excavation reveals a stout central taproot with lateral branch rootlets.',
    botanicalNote: 'Dicot plant: the reticulate vein network delivers water efficiently from the deep central taproot across every serrated leaf lobe.'
  },
  {
    id: 'sadabahar',
    num: '03',
    name: 'Sadabahar (Periwinkle)',
    family: 'Apocynaceae (Dicot)',
    venation: 'reticulate',
    root: 'taproot',
    plantImg: sadabaharPlantImg,
    leafImg: sadabaharLeafImg,
    rootImg: sadabaharRootImg,
    hint: 'Glossy oval leaves with prominent pale midrib and fine net-like veins. Ground excavation reveals a deep, woody primary taproot.',
    botanicalNote: 'Evergreen dicot shrub: sturdy taproot system allows it to reach deep water tables, reflected in glossy reticulate foliage.'
  },
  {
    id: 'mustard',
    num: '04',
    name: 'Mustard',
    family: 'Brassicaceae (Dicot)',
    venation: 'reticulate',
    root: 'taproot',
    plantImg: mustardPlantImg,
    leafImg: mustardLeafImg,
    rootImg: mustardRootImg,
    hint: 'Broad wavy mustard leaf with a stout central vein and intricate netted side-veins. Excavation exposes a thick conical primary taproot.',
    botanicalNote: 'Classic dicot herb: central primary taproot elongates directly from the embryo radicle during seed germination.'
  },
  {
    id: 'chickpea',
    num: '05',
    name: 'Chickpea (Gram)',
    family: 'Fabaceae (Dicot)',
    venation: 'reticulate',
    root: 'taproot',
    plantImg: chickpeaPlantImg,
    leafImg: chickpeaLeafImg,
    rootImg: chickpeaRootImg,
    hint: 'Feathery compound leaves with delicate oval leaflets showing fine net venation. Supported by a conical taproot with lateral feeder roots.',
    botanicalNote: 'Leguminous dicot: taproot system penetrates deeply to anchor the plant and host nitrogen-fixing nodules.'
  }
];

// =========================================================================
// FULLSCREEN SPECIMEN SLIDES (ACTIVITY 2.7) — EXACT 16:9 HD SPECIMENS
// =========================================================================
const CORRELATION_SPECIMEN_SLIDES = [
  {
    id: 1,
    num: '01',
    name: 'Lemongrass',
    venation: 'Parallel venation',
    root: 'Fibrous root system',
    image: '/activities/class6_chapter2/correlation/lemongrass.png'
  },
  {
    id: 2,
    num: '02',
    name: 'Marigold',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: '/activities/class6_chapter2/correlation/marigold.png'
  },
  {
    id: 3,
    num: '03',
    name: 'Sadabahar (Periwinkle)',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: '/activities/class6_chapter2/correlation/sadabhar.png'
  },
  {
    id: 4,
    num: '04',
    name: 'Chickpea',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: '/activities/class6_chapter2/correlation/chickpea.png'
  },
  {
    id: 5,
    num: '05',
    name: 'Wheat',
    venation: 'Parallel venation',
    root: 'Fibrous root system',
    image: '/activities/class6_chapter2/correlation/wheat.png'
  }
];

export default function VenationRootCorrelationLab({ onBackToDashboard, onPreviousPage, onNext }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('specimens'); // 'specimens' | 'lab'
  const [specimenIndex, setSpecimenIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Specimen Selection
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);
  const [inspectionView, setInspectionView] = useState('plant'); // 'plant' | 'leaf' | 'root'

  // Table 2.4 Answers State
  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(PLANTS_DATA.map((p) => [p.id, { venation: null, root: null }]))
  );
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});
  const [showEurekaModal, setShowEurekaModal] = useState(false);

  const activePlant = PLANTS_DATA[selectedPlantIndex];
  const allFilled = PLANTS_DATA.every((p) => answers[p.id].venation && answers[p.id].root);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    correlationAudio.setMuted(next);
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

  const handleSelectPlant = (index) => {
    correlationAudio.playSpecimenSelect(isMuted);
    setSelectedPlantIndex(index);
    setInspectionView('plant');
  };

  const handleNextPlant = () => {
    correlationAudio.playSwitch(isMuted);
    setSelectedPlantIndex((prev) => (prev + 1) % PLANTS_DATA.length);
    setInspectionView('plant');
  };

  const handlePrevPlant = () => {
    correlationAudio.playSwitch(isMuted);
    setSelectedPlantIndex((prev) => (prev - 1 + PLANTS_DATA.length) % PLANTS_DATA.length);
    setInspectionView('plant');
  };

  const handleToggleInspectionView = (view) => {
    correlationAudio.playToggleView(isMuted);
    setInspectionView(view);
  };

  const handleSetAnswer = (plantId, field, value) => {
    if (checked) return;
    correlationAudio.playOptionSelect(isMuted);
    setAnswers((prev) => ({
      ...prev,
      [plantId]: { ...prev[plantId], [field]: value }
    }));
  };

  const handleCheckAnswers = () => {
    correlationAudio.playSwitch(isMuted);
    const res = {};
    PLANTS_DATA.forEach((p) => {
      res[p.id] = {
        venation: answers[p.id].venation === p.venation,
        root: answers[p.id].root === p.root
      };
    });
    setResults(res);
    setChecked(true);

    const isAllCorrect = PLANTS_DATA.every((p) => res[p.id].venation && res[p.id].root);
    if (isAllCorrect) {
      correlationAudio.playSuccessChime(isMuted);
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.55 }
      });
      setTimeout(() => {
        setShowEurekaModal(true);
      }, 700);
    }
  };

  const handleResetLab = () => {
    correlationAudio.playSwitch(isMuted);
    setAnswers(Object.fromEntries(PLANTS_DATA.map((p) => [p.id, { venation: null, root: null }])));
    setChecked(false);
    setResults({});
    setShowEurekaModal(false);
    setSelectedPlantIndex(0);
    setInspectionView('plant');
  };

  useEffect(() => {
    if (phase !== 'specimens') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setSpecimenIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
        } else {
          setPhase('lab');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, specimenIndex]);

  if (phase === 'specimens') {
    const activeSlide = CORRELATION_SPECIMEN_SLIDES[specimenIndex];
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
            backdropFilter: 'blur(8px)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Floating Bottom Center: Progress Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(4, 26, 16, 0.85)',
          border: '1.5px solid rgba(110, 231, 183, 0.4)',
          borderRadius: '24px',
          padding: '7px 18px',
          backdropFilter: 'blur(10px)',
          zIndex: 1010,
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
        }}>
          {CORRELATION_SPECIMEN_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSpecimenIndex(idx)}
              style={{
                width: idx === specimenIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: idx === specimenIndex ? '#34D399' : 'rgba(255, 255, 255, 0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease'
              }}
              title={`Specimen ${s.num}: ${s.name}`}
            />
          ))}
          <span style={{ color: '#A7F3D0', fontWeight: 800, fontSize: '14px', marginLeft: '6px', fontFamily: '"Outfit", sans-serif' }}>
            {specimenIndex + 1} / {CORRELATION_SPECIMEN_SLIDES.length}
          </span>
        </div>

        {/* Floating Bottom Right: Next Slide or Enter Lab */}
        <button
          onClick={() => {
            if (specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
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
          {specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1 ? (
            <>Next <ArrowRight size={20} /></>
          ) : (
            <>Enter Activity 2.7 Lab <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(4px, 0.8vh, 8px) clamp(10px, 1.2vw, 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Outfit", "Plus Jakarta Sans", system-ui, sans-serif',
        color: '#F8FAFC'
      }}
    >
      <TopCornerFoliage side="left" />
      <TopCornerFoliage side="right" />
      <TopMountainBackdrop />
      <BottomNatureSilhouettes />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        /* Justified text formatting */
        p, .bio-desc-text {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto;
        }

        .bio-nav-btn {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #F1F5F9;
          border: 1.8px solid rgba(255, 255, 255, 0.25);
          border-radius: 10px;
          padding: 6px 14px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          position: relative;
          z-index: 10;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: rgba(245, 158, 11, 0.25);
          color: #FBBF24;
          border-color: #F59E0B;
          transform: translateY(-1px);
        }
        .bio-nav-btn:disabled {
          opacity: 0.32;
          cursor: not-allowed;
          box-shadow: none;
        }

        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.8px solid #FDE68A;
          border-radius: 10px;
          padding: 6px 18px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.42);
          position: relative;
          z-index: 10;
        }
        .bio-cta-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          border-color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.55);
        }
        .bio-cta-btn:disabled {
          opacity: 0.32;
          cursor: not-allowed;
          box-shadow: none;
        }

        .bio-parchment-card {
          background: rgba(15, 23, 42, 0.50);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1.8px solid rgba(245, 158, 11, 0.4);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          color: #F8FAFC;
          transition: all 0.22s ease;
        }
        .bio-parchment-card:hover {
          border-color: rgba(245, 158, 11, 0.65);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45), 0 0 18px rgba(245, 158, 11, 0.25);
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. COMPACT STREAMLINED HEADER SECTION (ZERO SCROLL FIT)      */}
      {/* ============================================================ */}
      <header
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1540px',
          textAlign: 'center',
          flexShrink: 0,
          marginBottom: 'clamp(2px, 0.5vh, 6px)',
          zIndex: 20
        }}
      >
        {/* TOP CONTROLS BAR: DASHBOARD (LEFT) & TOOLS (RIGHT) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* LEFT: DASHBOARD BUTTON */}
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBackToDashboard}
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={16} strokeWidth={2.4} />
            <span>Dashboard</span>
          </button>

          {/* CENTER: BADGES & MAIN TITLE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
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
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.24)'
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
                  border: '1.8px solid #FDE68A',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.24)'
                }}
              >
                ACTIVITY 2.7 • BOTANY LAB
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <TitleVineBranch side="left" />
              <h1
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 900,
                  fontSize: '22px',
                  color: '#F8FAFC',
                  margin: 0,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  textShadow: '0 1px 4px rgba(10, 59, 36, 0.10)'
                }}
              >
                Venation ↔ Root Correlation Lab
              </h1>
              <TitleVineBranch side="right" />
            </div>
            <TitleSprout />
          </div>

          {/* RIGHT: SOUND, RESET, FULLSCREEN ROW */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.18)'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetLab}
              title="Reset Observations"
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
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.18)'
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
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.18)'
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* INSTRUCTIONAL BANNER (STREAMLINED & JUSTIFIED) */}
        <div
          className="bio-parchment-card"
          style={{
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            width: '100%',
            maxWidth: '1540px',
            margin: '4px auto 0',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#14452F',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Eye size={18} />
            </div>
            <div style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 600, textAlign: 'justify', lineHeight: 1.35, flex: 1, minWidth: 0 }}>
              <strong style={{ color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', marginRight: '6px', fontSize: '16px' }}>
                Correlation Task:
              </strong>
              Select a plant specimen from the dock, inspect its <strong>[Leaf Venation]</strong> and <strong>[Root System]</strong> in the 70% botanical viewer, then record observations in Table 2.4.
            </div>
          </div>

          <div
            style={{
              background: '#14452F',
              color: '#FDE68A',
              padding: '4px 14px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {PLANTS_DATA.filter((p) => answers[p.id].venation && answers[p.id].root).length} / {PLANTS_DATA.length} Recorded
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN WORKSPACE: 70% IMAGE ALLOCATION + 30% CONTENT ALLOCATION */}
      {/* ========================================================================= */}
      <main
        style={{
          width: '100%',
          maxWidth: '1540px',
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'calc(70% - clamp(6px, 0.8vw, 10px)) calc(30% - clamp(6px, 0.8vw, 10px))',
          gap: 'clamp(10px, 1.2vw, 18px)',
          alignItems: 'stretch',
          position: 'relative',
          zIndex: 10,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {/* ========================================================== */}
        {/* LEFT COLUMN (70%): BOTANICAL SPECIMEN DISPLAY WORKBENCH    */}
        {/* ========================================================== */}
        {/* LEFT COLUMN (70%): BOTANICAL SPECIMEN DISPLAY WORKBENCH    */}
        {/* ========================================================== */}
        <section
          className="bio-parchment-card"
          style={{
            padding: 'clamp(6px, 0.9vh, 10px) clamp(8px, 1vw, 12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(4px, 0.6vh, 6px)',
            height: '100%',
            minHeight: 0,
            boxSizing: 'border-box'
          }}
        >
          <CardCornerLeaves position="top-left" />
          <CardCornerLeaves position="bottom-right" />

          {/* TOP TOOLBAR: ACTIVE SPECIMEN TITLE, 3-WAY VIEW SWITCHER & NEXT/PREV NAVIGATION */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '4px 10px',
              border: '1.5px solid #2D6A4F',
              position: 'relative',
              zIndex: 5,
              flexShrink: 0,
              gap: '8px'
            }}
          >
            {/* SPECIMEN COUNTER & NAME */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', minWidth: 0, flexShrink: 1 }}>
              <span
                style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif",
                  whiteSpace: 'nowrap'
                }}
              >
                {selectedPlantIndex + 1} / {PLANTS_DATA.length}
              </span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', whiteSpace: 'nowrap' }}>
                {activePlant.name}
              </h2>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#10B981', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}>
                ({activePlant.family})
              </span>
            </div>

            {/* 3-WAY VIEW SWITCHER */}
            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => handleToggleInspectionView('plant')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  background: inspectionView === 'plant' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                  border: inspectionView === 'plant' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                  color: inspectionView === 'plant' ? '#FFFFFF' : '#14452F',
                  fontSize: '16px',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                🌱 Whole Plant
              </button>

              <button
                type="button"
                onClick={() => handleToggleInspectionView('leaf')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  background: inspectionView === 'leaf' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                  border: inspectionView === 'leaf' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                  color: inspectionView === 'leaf' ? '#FFFFFF' : '#14452F',
                  fontSize: '16px',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                🍃 Leaf Macro
              </button>

              <button
                type="button"
                onClick={() => handleToggleInspectionView('root')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  background: inspectionView === 'root' ? '#14452F' : 'rgba(255, 255, 255, 0.85)',
                  border: inspectionView === 'root' ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                  color: inspectionView === 'root' ? '#FFFFFF' : '#14452F',
                  fontSize: '16px',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                🥕 Root System
              </button>
            </div>

            {/* SPECIMEN NAVIGATION: PREV & NEXT BUTTONS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handlePrevPlant}
                aria-label="Previous Specimen"
                style={{
                  padding: '4px 10px',
                  borderRadius: '7px',
                  background: 'rgba(15, 23, 42, 0.45)',
                  border: '1.5px solid #2D6A4F',
                  color: '#F8FAFC',
                  fontSize: '16px',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                ← Prev
              </button>

              <button
                type="button"
                onClick={handleNextPlant}
                aria-label="Next Specimen"
                style={{
                  padding: '4px 14px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '2px solid #047857',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Next Specimen</span>
                <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
              </button>
            </div>
          </div>

          {/* 8K SPECIMEN PHOTOGRAPHIC DISPLAY VIEWPORT (70% ALLOCATION, ZERO EMPTY SPACE) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              minHeight: 0,
              borderRadius: '12px',
              background: '#0B291A',
              border: '2px solid #D4AF37',
              boxShadow: '0 4px 20px rgba(10, 59, 36, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5
            }}
          >
            <img
              key={`${activePlant.id}-${inspectionView}`}
              src={
                inspectionView === 'plant'
                  ? activePlant.plantImg
                  : inspectionView === 'leaf'
                  ? activePlant.leafImg
                  : activePlant.rootImg
              }
              alt={`${activePlant.name} ${inspectionView}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25))',
                transition: 'transform 0.25s ease'
              }}
            />

            {/* VIEW IDENTIFIER BADGE */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(20, 69, 47, 0.88)',
                backdropFilter: 'blur(6px)',
                color: '#D1FAE5',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '16px',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                zIndex: 6
              }}
            >
              {inspectionView === 'plant'
                ? 'Specimen Portrait'
                : inspectionView === 'leaf'
                ? `8K Leaf Macro (${activePlant.venation === 'parallel' ? 'Parallel' : 'Reticulate'})`
                : `8K Excavated Root (${activePlant.root === 'taproot' ? 'Taproot' : 'Fibrous'})`}
            </div>

            {/* INTEGRATED OBSERVATION GUIDE DOCKED AT BOTTOM OF IMAGE */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(180deg, rgba(10, 42, 26, 0) 0%, rgba(10, 42, 26, 0.82) 28%, rgba(10, 42, 26, 0.95) 100%)',
                backdropFilter: 'blur(6px)',
                padding: '10px 16px 8px 16px',
                color: '#E6F9EE',
                fontSize: '16px',
                lineHeight: 1.35,
                textAlign: 'justify',
                borderTop: '1px solid rgba(52, 211, 153, 0.25)',
                zIndex: 6
              }}
            >
              <strong style={{ color: '#6EE7B7' }}>Observation Guide:</strong> {activePlant.hint}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* RIGHT COLUMN (30%): TABLE 2.4 BOTANICAL FIELD NOTEBOOK     */}
        {/* ========================================================== */}
        <section
          className="bio-parchment-card"
          style={{
            padding: 'clamp(8px, 1.1vh, 12px) clamp(10px, 1.2vw, 14px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'clamp(4px, 0.6vh, 6px)',
            height: '100%',
            minHeight: 0,
            boxSizing: 'border-box'
          }}
        >
          <CardCornerLeaves position="top-right" />
          <CardCornerLeaves position="bottom-left" />

          {/* NOTEBOOK HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 5, flexShrink: 0 }}>
            <div>
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
                FIELD NOTEBOOK
              </span>
              <h2 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                Table 2.4 · Venation & Root
              </h2>
            </div>

            <div style={{ fontSize: '16px', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Outfit', sans-serif" }}>
              5 Specimens
            </div>
          </div>

          {/* MINI COLUMN LEGEND */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              padding: '0 4px',
              fontSize: '16px',
              fontWeight: 800,
              color: '#F8FAFC',
              flexShrink: 0
            }}
          >
            <div style={{ textAlign: 'center', borderBottom: '1.5px solid rgba(20, 69, 47, 0.25)', paddingBottom: '1px' }}>
              🍃 Leaf Venation
            </div>
            <div style={{ textAlign: 'center', borderBottom: '1.5px solid rgba(20, 69, 47, 0.25)', paddingBottom: '1px' }}>
              🥕 Root System
            </div>
          </div>

          {/* 5 COMPACT PLANT ROWS IN TABLE 2.4 (FIT ON SCREEN WITHOUT SCROLL) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(3px, 0.5vh, 6px)',
              position: 'relative',
              zIndex: 5,
              flex: 1,
              minHeight: 0
            }}
          >
            {PLANTS_DATA.map((plant, idx) => {
              const isSelected = selectedPlantIndex === idx;
              const plantAns = answers[plant.id];
              const plantRes = results[plant.id];
              const isAnswered = plantAns.venation && plantAns.root;

              return (
                <div
                  key={plant.id}
                  onClick={() => handleSelectPlant(idx)}
                  style={{
                    background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)',
                    border: isSelected ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                    borderRadius: '10px',
                    padding: '4px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    boxShadow: isSelected ? '0 2px 10px rgba(16, 185, 129, 0.20)' : '0 1px 3px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  {/* PLANT NAME & NUMBER WITH COMPLETION STATUS */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isSelected ? '#10B981' : '#14452F',
                          color: isSelected ? '#064E3B' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: 900,
                          fontFamily: "'Outfit', sans-serif"
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                        {plant.name}
                      </span>
                    </div>

                    {isAnswered && (
                      <span style={{ fontSize: '16px', color: '#10B981', fontWeight: 900 }}>
                        {checked ? (plantRes?.venation && plantRes?.root ? '✅ 100%' : '⚠️ Review') : '✓ Done'}
                      </span>
                    )}
                  </div>

                  {/* 2-COLUMN BUTTONS: VENATION (LEFT) | ROOT SYSTEM (RIGHT) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {/* LEAF VENATION PAIR */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetAnswer(plant.id, 'venation', 'reticulate');
                        }}
                        style={{
                          padding: '3px 2px',
                          borderRadius: '6px',
                          background: plantAns.venation === 'reticulate' ? '#14452F' : 'rgba(255, 255, 255, 0.9)',
                          border: plantAns.venation === 'reticulate' ? '2px solid #10B981' : '1.2px solid #2D6A4F',
                          color: plantAns.venation === 'reticulate' ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: checked ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Reticulate Venation"
                      >
                        <span>Reticulate</span>
                        {checked && plantAns.venation === 'reticulate' && (
                          <span>{plantRes?.venation ? '✅' : '❌'}</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetAnswer(plant.id, 'venation', 'parallel');
                        }}
                        style={{
                          padding: '3px 2px',
                          borderRadius: '6px',
                          background: plantAns.venation === 'parallel' ? '#14452F' : 'rgba(255, 255, 255, 0.9)',
                          border: plantAns.venation === 'parallel' ? '2px solid #10B981' : '1.2px solid #2D6A4F',
                          color: plantAns.venation === 'parallel' ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: checked ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Parallel Venation"
                      >
                        <span>Parallel</span>
                        {checked && plantAns.venation === 'parallel' && (
                          <span>{plantRes?.venation ? '✅' : '❌'}</span>
                        )}
                      </button>
                    </div>

                    {/* ROOT SYSTEM PAIR */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetAnswer(plant.id, 'root', 'taproot');
                        }}
                        style={{
                          padding: '3px 2px',
                          borderRadius: '6px',
                          background: plantAns.root === 'taproot' ? '#14452F' : 'rgba(255, 255, 255, 0.9)',
                          border: plantAns.root === 'taproot' ? '2px solid #10B981' : '1.2px solid #2D6A4F',
                          color: plantAns.root === 'taproot' ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: checked ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Taproot System"
                      >
                        <span>Taproot</span>
                        {checked && plantAns.root === 'taproot' && (
                          <span>{plantRes?.root ? '✅' : '❌'}</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetAnswer(plant.id, 'root', 'fibrous');
                        }}
                        style={{
                          padding: '3px 2px',
                          borderRadius: '6px',
                          background: plantAns.root === 'fibrous' ? '#14452F' : 'rgba(255, 255, 255, 0.9)',
                          border: plantAns.root === 'fibrous' ? '2px solid #10B981' : '1.2px solid #2D6A4F',
                          color: plantAns.root === 'fibrous' ? '#FFFFFF' : '#14452F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: checked ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap'
                        }}
                        title="Fibrous Root System"
                      >
                        <span>Fibrous</span>
                        {checked && plantAns.root === 'fibrous' && (
                          <span>{plantRes?.root ? '✅' : '❌'}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CHECK / SUBMIT BUTTON */}
          <div style={{ position: 'relative', zIndex: 5, flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleCheckAnswers}
              disabled={!allFilled}
              className="bio-cta-btn"
              style={{ width: '100%', justifyContent: 'center', padding: '7px 16px', fontSize: '16px' }}
            >
              <Sparkles size={18} />
              <span>{allFilled ? 'Verify & Check Table 2.4' : 'Fill All 5 Rows to Check'}</span>
            </button>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 3. GOLDEN BOTANICAL CORRELATION LAW SYNTHESIS (EUREKA MODAL) */}
      {/* ============================================================ */}
      {showEurekaModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 45, 30, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
        >
          <div
            className="bio-parchment-card"
            style={{
              width: '100%',
              maxWidth: '820px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
              position: 'relative'
            }}
          >
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />
            <CardCornerLeaves position="bottom-left" />
            <CardCornerLeaves position="bottom-right" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 5 }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#14452F',
                  color: '#FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Award size={36} />
              </div>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#14452F',
                    color: '#34D399',
                    borderRadius: '16px',
                    padding: '3px 14px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: '4px'
                  }}
                >
                  EUREKA! THE GRAND DISCOVERY
                </div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                  The Golden Law of Botanical Correlation
                </h2>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '16px', color: '#1B4D3E', fontWeight: 600, lineHeight: 1.5, position: 'relative', zIndex: 5 }}>
              Congratulations! By analyzing Table 2.4, you discovered the fundamental botanical rule connecting plant leaves to their root systems:
            </p>

            {/* 2-COLUMN SYNTHESIS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', position: 'relative', zIndex: 5 }}>
              {/* DICOT LAW */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px',
                  border: '2px solid #D4AF37',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                  🕸️ Reticulate Venation
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#10B981', fontFamily: "'Outfit', sans-serif" }}>
                  ALWAYS HAS ➔ 🥕 Taproot
                </div>
                <div style={{ fontSize: '16px', color: '#374151' }}>
                  Marigold, Sadabahar, Mustard, Chickpea (Dicots)
                </div>
              </div>

              {/* MONOCOT LAW */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px',
                  border: '2px solid #D97706',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                  📏 Parallel Venation
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#D97706', fontFamily: "'Outfit', sans-serif" }}>
                  ALWAYS HAS ➔ 🌾 Fibrous Roots
                </div>
                <div style={{ fontSize: '16px', color: '#374151' }}>
                  Lemon Grass, Wheat, Maize, Grass (Monocots)
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#EAF7EE',
                borderLeft: '4px solid #10B981',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '16px',
                color: '#0F3822',
                lineHeight: 1.5,
                position: 'relative',
                zIndex: 5
              }}
            >
              💡 <strong>Botanist’s Superpower:</strong> You NEVER need to pull out a plant from the soil to know its root system! Just inspect its leaf venation, and you can reliably predict whether it has a taproot or fibrous root system!
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', position: 'relative', zIndex: 5, marginTop: '6px' }}>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  setShowEurekaModal(false);
                  if (onNext) onNext();
                }}
              >
                <span>Advance to Activity 2.8: Seed Dissection</span>
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. BOTTOM NAVIGATION BAR (MATCHING SLOGAN PAGE EXACTLY)      */}
      {/* ============================================================ */}
      <footer
        style={{
          width: '100%',
          maxWidth: '1540px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          padding: 'clamp(2px, 0.4vh, 4px) 4px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onPreviousPage}
            aria-label="Previous Activity"
          >
            ← Previous Activity
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
            🔍 Specimen Slides
          </button>
        </div>

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
                border: '1.8px solid #D4AF37',
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
              <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 10, 6 10 Z" fill="#2D6A4F" />
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
            Activity 2.7 · Table 2.4 Correlation Lab
          </div>
        </div>

        <button
          type="button"
          className="bio-cta-btn"
          onClick={onNext}
          aria-label="Next Activity"
        >
          <span>Next: Act 2.8 Seed Dissection</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
