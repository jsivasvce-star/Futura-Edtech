import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, ArrowLeft, CheckCircle2, ArrowRight, Ruler, Eye, 
  Sparkles, RotateCcw, Zap, Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext';
import tulsi24Img from '../../../../../assets/tulsi_2.4.png';
import tulsiFlexImg from './images/pd_alpha_flex_v2.png';
import rose24Img from '../../../../../assets/rose_2.4.png';
import roseFlexImg from './images/pd_beta_flex_v2.png';
import potRealisticImg from './images/pd_pot_realistic.png';
import neem24Img from '../../../../../assets/neem_2.4.png';
import neemFlexImg from './images/pd_gamma_flex_v2.png';
import bureauBgImg from './images/pd_bureau_bg.jpg';
import alphaSpecimenImg from './images/pd_alpha_specimen.png';
import alphaBenchImg from './images/pd_alpha_bench.png';
import betaBenchImg from './images/pd_beta_bench.png';
import gammaBenchImg from './images/pd_gamma_bench_v2.png';
import gammaCardImg from './images/pd_gamma_card_v2.png';

// =========================================================================
// SLOGAN PAGE BOTANICAL ORNAMENTS & NATURE MOTIFS
// =========================================================================

// Top Hanging Tree Foliage in corners (matching Slogan Page poster design)
const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: 'clamp(120px, 12vw, 170px)',
    height: 'clamp(65px, 8vh, 90px)',
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

// Leafy Vine Branch extending outwards flanking title (matching Slogan Page)
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

// Botanical Sprout Motif directly beneath title (matching Slogan Page)
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

// Bottom Nature Silhouette Meadow Panorama (matching Slogan Page)
const BottomNatureSilhouette = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '34px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.75
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

// Forensic traits breakdown for covering card space with rich scientific intel (concise single-line values)
const PLANT_TRAITS = {
  plantA: {
    stem: 'Soft & Green',
    branch: 'Few or None',
    height: 'Short (0.4 m)'
  },
  plantB: {
    stem: 'Hard & Thin Woody',
    branch: 'Near Ground Base',
    height: 'Medium (1.6 m)'
  },
  plantC: {
    stem: 'Thick Hard Trunk',
    branch: 'High on Trunk',
    height: 'Tall (> 5 m)'
  }
};

// =========================================================================
// NCERT CLASS 6 SCIENCE: TABLE 2.1 - CATEGORIES OF PLANTS (HERB, SHRUB, TREE)
// REALISTIC DETECTIVE BOTANICAL DATABASE
// =========================================================================
const MYSTERY_PLANTS = [
  {
    id: 'plantA',
    caseCode: 'CASE #1 · ALPHA',
    displayName: 'Mystery Plant Alpha',
    realName: 'Holy Basil (Tulsi)',
    botanicalName: 'Ocimum sanctum',
    category: 'Herb',
    emoji: '🌿',
    summary: 'Herbs have green, soft, tender stems and stay short with few branches.',
    scaleMeters: 0.4,
    zones: {
      leaves: { x: 68, y: 26 },
      stem: { x: 68, y: 52 },
      base: { x: 68, y: 78 }
    },
    loupeFindings: {
      leaves: {
        title: 'Delicate Aromatic Leaves',
        desc: 'Look through lens: Soft green leaves with fine veins and sweet aroma. No thorns!',
        clue: 'Soft foliage without thorns'
      },
      stem: {
        title: 'Juicy Green Tender Stem',
        desc: 'Look through lens: Stem is bright green and soft. Full of sap, zero hard wood!',
        clue: 'Stem is Soft & Green'
      },
      base: {
        title: 'Shallow Root Base',
        desc: 'Look through lens: Slender green stem enters the soil directly with no thick trunk.',
        clue: 'Branches: Few or none'
      }
    },
    bendResult: {
      angle: 48,
      bubble: '🌟 Boing! Super soft & flexible — bends 48° easily without cracking!',
      color: '#10B981',
      badge: 'Soft & Tender Stem'
    },
    heightResult: {
      desc: 'Only 0.4 m tall (Below knee) — Much shorter than a 6th grader (< 1 m)',
      badge: 'Shorter than Student (< 1 m)'
    },
    funFact: 'Tulsi is worshipped across India and famous for soothing teas and natural Ayurvedic wellness!',
    correctAnswers: {
      stem: 0,    // 0: Soft & Green
      branch: 0,  // 0: Few / None
      flex: 0,    // 0: Soft & Flexible
      category: 'Herb'
    }
  },
  {
    id: 'plantB',
    caseCode: 'CASE #2 · BETA',
    displayName: 'Mystery Plant Beta',
    realName: 'Wild Rose Bush',
    botanicalName: 'Rosa rubiginosa',
    category: 'Shrub',
    emoji: '🌺',
    summary: 'Shrubs have hard, thin woody stems that branch near the ground.',
    scaleMeters: 1.6,
    zones: {
      leaves: { x: 68, y: 26 },
      stem: { x: 68, y: 52 },
      base: { x: 68, y: 78 }
    },
    loupeFindings: {
      leaves: {
        title: 'Serrated Leaflets & Blooms',
        desc: 'Look through lens: Vibrant red petals surrounded by compound serrated leaves.',
        clue: 'Thorny bush foliage'
      },
      stem: {
        title: 'Thin Woody Stem with Prickles',
        desc: 'Look through lens: Stem is hard and woody, but thin (not a trunk). Armed with prickles!',
        clue: 'Stem is Hard & Woody'
      },
      base: {
        title: 'Bushy Ground Junction',
        desc: 'Look through lens: Multiple separate woody stems branch out directly at ground level.',
        clue: 'Branches near ground base'
      }
    },
    bendResult: {
      angle: 18,
      bubble: '⚠️ Creeeak! Stiff & woody — resists bending and stops at 18°!',
      color: '#F59E0B',
      badge: 'Stiff Woody Stem'
    },
    heightResult: {
      desc: '1.6 m tall (Eye level) — About the same height as a 6th grader (1 – 2.5 m)',
      badge: 'About Student Height (1 - 2.5 m)'
    },
    funFact: 'Rose bushes produce sweet fragrant flowers and thorny stems to protect themselves from grazing animals!',
    correctAnswers: {
      stem: 1,    // 1: Thin Woody
      branch: 1,  // 1: Near Base
      flex: 1,    // 1: Stiff Woody
      category: 'Shrub'
    }
  },
  {
    id: 'plantC',
    caseCode: 'CASE #3 · GAMMA',
    displayName: 'Mystery Plant Gamma',
    realName: 'Neem Tree',
    botanicalName: 'Azadirachta indica',
    category: 'Tree',
    emoji: '🌳',
    summary: 'Trees grow very tall with a thick hard woody trunk branching high above.',
    scaleMeters: 12.0,
    zones: {
      leaves: { x: 68, y: 24 },
      stem: { x: 68, y: 52 },
      base: { x: 68, y: 72 }
    },
    loupeFindings: {
      leaves: {
        title: 'High Sun Canopy',
        desc: 'Look through lens: Sickle-shaped compound leaflets swaying high in the sunshine.',
        clue: 'Canopy high in the sky'
      },
      stem: {
        title: 'Massive Bark Trunk',
        desc: 'Look through lens: Single colossal woody trunk encased in rough, cracked dark brown bark.',
        clue: 'Thick, hard trunk with bark'
      },
      base: {
        title: 'Giant Root Flare',
        desc: 'Look through lens: Massive solid timber base anchored deeply into earth by powerful roots.',
        clue: 'Single trunk, branches high up'
      }
    },
    bendResult: {
      angle: 0,
      bubble: '🛑 Clunk! Rock solid — 0° deflection! Human hands cannot bend a giant trunk!',
      color: '#DC2626',
      badge: 'Rigid Massive Trunk'
    },
    heightResult: {
      desc: '12.0 m tall — Towers 8 times taller than a 6th grader (> 5 m)!',
      badge: 'Much Taller than Student (> 5 m)'
    },
    funFact: 'Neem is known as "Nature\'s Pharmacy" because its bitter leaves and twigs have powerful medicinal qualities!',
    correctAnswers: {
      stem: 2,    // 2: Thick Trunk
      branch: 2,  // 2: High Above
      flex: 2,    // 2: Rigid Trunk
      category: 'Tree'
    }
  }
];

const CLUE_OPTIONS = {
  stem: [
    { label: '🌿 Soft & Green', idx: 0 },
    { label: '🪵 Thin Woody', idx: 1 },
    { label: '🌲 Thick Trunk', idx: 2 }
  ],
  branch: [
    { label: '🍃 Few / None', idx: 0 },
    { label: '🌱 Near Base', idx: 1 },
    { label: '🌳 High Above', idx: 2 }
  ],
  flex: [
    { label: '🌿 Soft & Flexible', idx: 0 },
    { label: '🪵 Stiff (Resists)', idx: 1 },
    { label: '🌲 Rigid (Zero Bend)', idx: 2 }
  ]
};

const PLANT_IMAGES = {
  plantA: alphaBenchImg,
  plantB: betaBenchImg,
  plantC: gammaBenchImg
};

// Archive case-card portraits (lens zones are tuned against PLANT_IMAGES, so keep them separate)
const CARD_IMAGES = {
  plantA: alphaSpecimenImg,
  plantB: rose24Img,
  plantC: gammaCardImg
};

const PLANT_FLEX_IMAGES = {
  plantA: tulsiFlexImg,
  plantB: roseFlexImg,
  plantC: neemFlexImg
};

// Procedural audio synthesizer
const playSound = (type = 'click') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'stamp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'creak') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(190, now + 0.08);
      osc.frequency.linearRampToValueAtTime(110, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'zoom') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.18, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.25);
      });
    } else if (type === 'thud') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    // Audio fallback
  }
};

export default function PlantDetective({ onBackToDashboard, onNextActivity, nextLabel }) {
  const { theme } = useTheme();
  const [selectedPlantId, setSelectedPlantId] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('case') || 'plantA';
  });
  const [subPage, setSubPage] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const p = parseInt(params.get('subPage'), 10);
    return (p === 1 || p === 2) ? p : 1;
  });
  const [activeTool, setActiveTool] = useState('loupe'); // 'loupe' | 'bend' | 'scale'
  const [loupeZone, setLoupeZone] = useState('stem'); // 'leaves' | 'stem' | 'base'
  const [bendLevel, setBendLevel] = useState(0); // 0 to 100%

  // Real optical lens coordinates & zoom
  const [lensPos, setLensPos] = useState({ x: 68, y: 52 });
  const [zoomLevel, setZoomLevel] = useState(2.8); // 2.8x or 4.2x optical magnification
  const [isDraggingLens, setIsDraggingLens] = useState(false);
  const lensOn = true; // magnifier is always in hand on the bench
  const stageRef = useRef(null);
  const plantImgRef = useRef(null);

  // Dynamic specimen bounding metrics for pixel-perfect optical magnification
  const [plantMetrics, setPlantMetrics] = useState({
    w: 240,
    h: 270,
    left: 180,
    top: 25,
    stageW: 600,
    stageH: 330
  });

  const updatePlantMetrics = () => {
    if (plantImgRef.current && stageRef.current) {
      const imgRect = plantImgRef.current.getBoundingClientRect();
      const stageRect = stageRef.current.getBoundingClientRect();
      if (imgRect.width > 0 && imgRect.height > 0 && stageRect.width > 0 && stageRect.height > 0) {
        setPlantMetrics({
          w: imgRect.width,
          h: imgRect.height,
          left: imgRect.left - stageRect.left,
          top: imgRect.top - stageRect.top,
          stageW: stageRect.width,
          stageH: stageRect.height
        });
      }
    }
  };

  useEffect(() => {
    updatePlantMetrics();
    const handleResize = () => updatePlantMetrics();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(updatePlantMetrics, 60);
    const timer2 = setTimeout(updatePlantMetrics, 320);

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updatePlantMetrics());
      if (stageRef.current) observer.observe(stageRef.current);
      if (plantImgRef.current) observer.observe(plantImgRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearTimeout(timer2);
      if (observer) observer.disconnect();
    };
  }, [selectedPlantId, activeTool]);

  // Student deductions for 3 plants
  const [answers, setAnswers] = useState({
    plantA: { stem: null, branch: null, flex: null, category: null },
    plantB: { stem: null, branch: null, flex: null, category: null },
    plantC: { stem: null, branch: null, flex: null, category: null }
  });

  const [results, setResults] = useState({
    plantA: false,
    plantB: false,
    plantC: false
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [springOffset, setSpringOffset] = useState(0); // Damped elastic bounce angle
  const [isDraggingStem, setIsDraggingStem] = useState(false);
  const springAnimRef = useRef(null);

  const activePlant = MYSTERY_PLANTS.find(p => p.id === selectedPlantId) || MYSTERY_PLANTS[0];
  const currentAnswers = answers[selectedPlantId];
  const isCaseSolved = results[selectedPlantId] === true;
  const solvedCount = Object.values(results).filter(Boolean).length;

  useEffect(() => {
    if (springAnimRef.current) cancelAnimationFrame(springAnimRef.current);
    setBendLevel(0);
    setSpringOffset(0);
    setIsDraggingStem(false);
    setLoupeZone('stem');
    const target = activePlant.zones.stem;
    setLensPos(target);
    setTimeout(updatePlantMetrics, 40);
  }, [selectedPlantId]);

  // Update lens position when clicking preset zones
  const handleSelectZone = (zoneKey) => {
    setLoupeZone(zoneKey);
    const target = activePlant.zones[zoneKey];
    if (target) {
      setLensPos(target);
    }
    playSound('zoom');
  };

  // Dragging interaction for both Magnifier and Stem Bend Test
  const handleStageMouseMove = (e) => {
    if (activeTool === 'loupe') {
      if (!isDraggingLens || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const xPct = Math.max(20, Math.min(80, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(20, Math.min(80, ((e.clientY - rect.top) / rect.height) * 100));
      setLensPos({ x: xPct, y: yPct });

      if (yPct < 38) {
        setLoupeZone('leaves');
      } else if (yPct > 66) {
        setLoupeZone('base');
      } else {
        setLoupeZone('stem');
      }
    } else if (activeTool === 'bend') {
      if (!isDraggingStem || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const plantCenterX = rect.left + rect.width * 0.5;
      const deltaX = Math.max(0, clientX - plantCenterX);
      const maxRange = rect.width * 0.36;
      const rawPct = Math.min(100, Math.max(0, (deltaX / maxRange) * 100));

      if (activePlant.id === 'plantC') {
        // Tree: solid trunk refuses to bend
        setBendLevel(0);
        setSpringOffset(Math.sin(Date.now() * 0.05) * 0.6);
      } else {
        setBendLevel(rawPct);
        setSpringOffset(0);
      }
    }
  };

  const handleStageMouseUp = () => {
    if (isDraggingLens) {
      setIsDraggingLens(false);
      playSound('click');
    }
    if (isDraggingStem) {
      setIsDraggingStem(false);
      if (springAnimRef.current) cancelAnimationFrame(springAnimRef.current);

      if (activePlant.id === 'plantA' && bendLevel > 6) {
        // Damped elastic spring-back oscillation for Herb
        playSound('boing');
        let f = 0;
        const initialDisp = (bendLevel / 100) * 48;
        const animateSpring = () => {
          f += 1;
          const decay = Math.exp(-f * 0.12);
          const osc = Math.cos(f * 0.55) * initialDisp * decay;
          if (decay > 0.015) {
            setSpringOffset(osc);
            springAnimRef.current = requestAnimationFrame(animateSpring);
          } else {
            setSpringOffset(0);
            setBendLevel(0);
          }
        };
        springAnimRef.current = requestAnimationFrame(animateSpring);
      } else if (activePlant.id === 'plantB' && bendLevel > 6) {
        // Woody fibrous snap back for Shrub
        playSound('creak');
        setBendLevel(0);
        setSpringOffset(0);
      } else if (activePlant.id === 'plantC') {
        playSound('thud');
        setBendLevel(0);
        setSpringOffset(0);
      } else {
        setBendLevel(0);
        setSpringOffset(0);
      }
    }
  };

  const handlePresetBend = (pct) => {
    if (springAnimRef.current) cancelAnimationFrame(springAnimRef.current);
    setSpringOffset(0);
    setBendLevel(pct);
    if (activePlant.id === 'plantC') {
      playSound('thud');
    } else if (activePlant.id === 'plantB') {
      playSound('creak');
    } else {
      playSound('boing');
    }
  };

  const handleReleaseButton = () => {
    if (springAnimRef.current) cancelAnimationFrame(springAnimRef.current);
    if (activePlant.id === 'plantA' && bendLevel > 6) {
      playSound('boing');
      let f = 0;
      const initialDisp = (bendLevel / 100) * 48;
      const animateSpring = () => {
        f += 1;
        const decay = Math.exp(-f * 0.12);
        const osc = Math.cos(f * 0.55) * initialDisp * decay;
        if (decay > 0.015) {
          setSpringOffset(osc);
          springAnimRef.current = requestAnimationFrame(animateSpring);
        } else {
          setSpringOffset(0);
          setBendLevel(0);
        }
      };
      springAnimRef.current = requestAnimationFrame(animateSpring);
    } else if (activePlant.id === 'plantB') {
      playSound('creak');
      setBendLevel(0);
      setSpringOffset(0);
    } else if (activePlant.id === 'plantC') {
      playSound('thud');
      setBendLevel(0);
      setSpringOffset(0);
    } else {
      setBendLevel(0);
      setSpringOffset(0);
    }
  };

  const handleSelectClue = (type, idx) => {
    setAnswers(prev => ({
      ...prev,
      [selectedPlantId]: {
        ...prev[selectedPlantId],
        [type]: idx
      }
    }));
    playSound('click');
  };

  const handleStampCategory = (cat) => {
    const isCorrect = cat === activePlant.correctAnswers.category;
    setAnswers(prev => ({
      ...prev,
      [selectedPlantId]: {
        ...prev[selectedPlantId],
        category: cat
      }
    }));

    if (isCorrect) {
      playSound('stamp');
      setTimeout(() => playSound('fanfare'), 220);
      const updated = { ...results, [selectedPlantId]: true };
      setResults(updated);

      if (updated.plantA && updated.plantB && updated.plantC) {
        setTimeout(() => {
          setShowCelebration(true);
          confetti({ particleCount: 240, spread: 90, origin: { y: 0.6 } });
        }, 400);
      }
    } else {
      playSound('creak');
    }
  };

  const handleNextCase = () => {
    const currentIndex = MYSTERY_PLANTS.findIndex(p => p.id === selectedPlantId);
    const nextIndex = (currentIndex + 1) % MYSTERY_PLANTS.length;
    setSelectedPlantId(MYSTERY_PLANTS[nextIndex].id);
    setActiveTool('loupe');
    setLoupeZone('stem');
    setBendLevel(0);
    setSpringOffset(0);
    playSound('click');
  };

  const isTree = activePlant.category === 'Tree';
  const isShrub = activePlant.category === 'Shrub';

  // Realistic deflection physics angle
  const currentDeflectionAngle = Math.max(0, Math.min(60,
    (bendLevel / 100) * activePlant.bendResult.angle + springOffset
  ));

  const appliedForce = activePlant.id === 'plantC'
    ? (bendLevel > 0 || isDraggingStem ? '8.0+ N (Max Strain)' : '0.0 N')
    : activePlant.id === 'plantB'
      ? `${((bendLevel / 100) * 4.2).toFixed(1)} N`
      : `${((bendLevel / 100) * 1.5).toFixed(1)} N`;

  // Dynamic lens-to-plant optical mapping
  const stageLensX = (lensPos.x / 100) * plantMetrics.stageW;
  const stageLensY = (lensPos.y / 100) * plantMetrics.stageH;
  const relX = stageLensX - plantMetrics.left;
  const relY = stageLensY - plantMetrics.top;
  const magnifiedImgX = 120 - relX * zoomLevel;
  const magnifiedImgY = 95 - relY * zoomLevel;
  const magnifiedImgW = plantMetrics.w * zoomLevel;
  const magnifiedImgH = plantMetrics.h * zoomLevel;
  const metricsReady = plantMetrics.stageW > 0 && plantMetrics.stageH > 0;
  const lensLeft = metricsReady ? `${stageLensX - 120}px` : `calc(${lensPos.x}% - 120px)`;
  const lensTop = metricsReady ? `${stageLensY - 95}px` : `calc(${lensPos.y}% - 95px)`;

  return (
    <div
      onMouseUp={handleStageMouseUp}
      onTouchEnd={handleStageMouseUp}
      style={{
        flex: 1,
        minHeight: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${bureauBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0B1F14',
        color: 'var(--ink)',
        fontFamily: '"Outfit", sans-serif',
        overflow: 'hidden',
        padding: '0.6rem',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Outfit:wght@700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

        /* Text Justification & Font Size Constraint */
        p, .detective-desc, .leaf-info-text {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto;
        }

        .detective-tool-tab {
          background: rgba(250, 248, 242, 0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 2px solid #14452F;
          color: #14452F;
          font-size: 16px;
          font-weight: 900;
          padding: 7px 16px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.16s ease;
          font-family: 'Outfit', sans-serif;
        }
        .detective-tool-tab.active {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border-color: #10B981;
          box-shadow: 0 4px 12px rgba(20, 69, 47, 0.25);
        }

        .clue-chip {
          background: linear-gradient(180deg, #FFFFFF 0%, #F3FAF4 100%);
          border: 2px solid rgba(15, 23, 42, 0.10);
          color: #14532D;
          font-size: 14.5px;
          font-weight: 800;
          padding: 6px 9px;
          border-radius: 11px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'Outfit', sans-serif;
          text-align: left;
          line-height: 1.2;
          flex: 1;
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.25);
        }
        .clue-chip:hover {
          border-color: #86EFAC;
        }
        .clue-chip.selected {
          background: #F2FDF5;
          color: #14532D;
          border-color: #22C55E;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .verdict-stamp {
          border-radius: 11px;
          font-size: 14.5px;
          font-weight: 900;
          padding: 7px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 6px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          font-family: 'Outfit', sans-serif;
          flex: 1;
        }
        .verdict-stamp:hover {
          transform: translateY(-2px);
        }

        @keyframes pulseGrip {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); box-shadow: 0 6px 18px rgba(217, 119, 6, 0.6); }
        }

        @keyframes bioScanLine {
          0%   { top: 2%;  opacity: 0; }
          10%  { opacity: 1; }
          50%  { top: 96%; opacity: 1; }
          60%  { opacity: 0; }
          100% { top: 2%;  opacity: 0; }
        }
        @keyframes bioScanGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.65; }
        }
        @keyframes scanPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        /* Botanical Slogan-Style Bottom Navigation Buttons */
        .bio-nav-btn {
          background: #14452F;
          color: #D1FAE5;
          border: 1.5px solid #2D6A4F;
          border-radius: 10px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
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
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFBEB;
          border: 1.8px solid rgba(253, 230, 138, 0.85);
          border-radius: 10px;
          padding: 8px 22px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25);
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
      `}</style>

      {/* ========================================================================= */}
      {/* SUBPAGE 1: CASE ARCHIVES / SELECTION CATALOG (SLOGAN PAGE BOTANICAL STYLE) */}
      {/* ========================================================================= */}
      {subPage === 1 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          borderRadius: '24px',
          padding: '0.5rem 1.4rem 0.4rem',
          boxShadow: 'none',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Slogan-Style Botanical Centered Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '0.3rem',
            position: 'relative',
            zIndex: 5,
            flexShrink: 0
          }}>
            {/* Spacer to keep title centered (Dashboard button removed; Back/Next now live only in bottom corners) */}
            <div style={{ width: '1px' }} />

            {/* Bureau title: Activity 2.4 with Attractive Bold Golden Banner */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px' }}>
              <div style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                borderRadius: '14px',
                padding: '8px 32px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
                textAlign: 'center'
              }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: '"Cinzel", "Outfit", Georgia, serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFBEB',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
                }}>
                  Activity 2.4 · Plant Detective Bureau
                </h1>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: '800',
                color: '#FDE68A',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)'
              }}>
                Investigate · Observe · Classify
              </div>
            </div>

            {/* Right: Solved Cases Trophy Pill */}
            <div style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#FFFBEB',
              padding: '6px 18px',
              borderRadius: '999px',
              fontSize: '20px',
              fontWeight: '900',
              border: '2px solid rgba(253, 230, 138, 0.85)',
              boxShadow: '0 10px 26px rgba(0, 0, 0, 0.65), 0 0 16px rgba(245, 158, 11, 0.22)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Award size={20} color="#FBBF24" />
              <span>Solved: {solvedCount} / 3 Cases</span>
            </div>
          </div>

          {/* 3 Mystery Plant Cards (Balanced height & clean layout) */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            padding: '0.2rem 0',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 3
          }}>
            {MYSTERY_PLANTS.map(plant => {
              const isSolved = results[plant.id] === true;
              const [caseNo, codeName] = plant.caseCode.split('·').map(s => s.trim());
              const traits = PLANT_TRAITS[plant.id] || {
                stem: 'Botanical cortex',
                branch: 'Lateral growth',
                height: 'Field specimen'
              };

              return (
                <div
                  key={plant.id}
                  style={{
                    background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.38) 0%, rgba(4, 24, 15, 0.50) 100%)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: `2.4px solid ${isSolved ? '#059669' : 'rgba(110, 231, 183, 0.45)'}`,
                    borderRadius: '18px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSolved ? '0 14px 34px rgba(0, 0, 0, 0.45)' : '0 14px 34px rgba(0, 0, 0, 0.45)',
                    position: 'relative',
                    overflow: 'hidden',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '5px' }}>
                    {/* Case label + code name */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                      <div>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '900',
                          color: '#A7F3D0',
                          letterSpacing: '0.16em',
                          fontFamily: '"JetBrains Mono", monospace',
                          textTransform: 'uppercase'
                        }}>
                          {caseNo}
                        </div>
                        <div style={{
                          fontSize: '32px',
                          fontWeight: '900',
                          color: '#FFFFFF',
                          fontFamily: '"Fraunces", Georgia, serif',
                          letterSpacing: '0.01em',
                          lineHeight: 1.05
                        }}>
                          {codeName}
                        </div>
                      </div>
                      {isSolved && (
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '900',
                          color: '#065F46',
                          background: '#D1FAE5',
                          border: '1.5px solid #6EE7B7',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap'
                        }}>
                          ✓ SOLVED
                        </span>
                      )}
                    </div>

                    {/* Specimen Photo Frame - clean, plain presentation */}
                    <div style={{
                      flex: 1,
                      minHeight: '215px',
                      background: 'linear-gradient(180deg, #F4FBF2 0%, #DCF0DA 100%)',
                      borderRadius: '14px',
                      border: '2px solid rgba(167, 243, 208, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 3px 8px rgba(20, 69, 47, 0.08)'
                    }}>
                      {/* Sweeping green bio-scan */}
                      <div style={{
                        position: 'absolute',
                        left: '6px',
                        right: '6px',
                        height: '3px',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, transparent 0%, #10B981 16%, #A7F3D0 50%, #10B981 84%, transparent 100%)',
                        boxShadow: '0 0 14px 3px rgba(16, 185, 129, 0.85)',
                        animation: 'bioScanLine 3.4s ease-in-out infinite',
                        pointerEvents: 'none',
                        zIndex: 3
                      }} />
                      <div style={{
                        position: 'absolute',
                        inset: '6px',
                        background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.20) 0%, transparent 70%)',
                        animation: 'bioScanGlow 3.4s ease-in-out infinite',
                        pointerEvents: 'none',
                        zIndex: 2
                      }} />

                      <img
                        src={CARD_IMAGES[plant.id]}
                        alt={plant.displayName}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '96%',
                          objectFit: 'contain',
                          position: 'relative',
                          zIndex: 1,
                          filter: 'drop-shadow(0 6px 14px rgba(20, 69, 47, 0.25))',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </div>

                    {/* Botanical Traits */}
                    {(() => {
                      const rows = [
                        { icon: '🌿', label: 'Stem:', value: traits.stem, accent: '#FFFFFF' },
                        { icon: '🌳', label: 'Branches:', value: traits.branch, accent: '#FFFFFF' },
                        { icon: '📏', label: 'Height:', value: traits.height, accent: '#FFFFFF' },
                        {
                          icon: '🎯',
                          label: 'Classification Target:',
                          value: isSolved ? `${plant.realName} (${plant.category})` : 'Herb, Shrub, or Tree?',
                          accent: isSolved ? '#6EE7B7' : '#FCD34D'
                        }
                      ];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', padding: '2px 2px 0' }}>
                          {rows.map((row, ri) => (
                            <div
                              key={row.label}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                fontSize: '20px',
                                fontWeight: '800',
                                paddingTop: ri === 3 ? '7px' : 0,
                                borderTop: ri === 3 ? '1.5px solid rgba(167, 243, 208, 0.22)' : 'none'
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#D1FAE5', whiteSpace: 'nowrap' }}>
                                <span>{row.icon}</span> {row.label}
                              </span>
                              <span style={{
                                color: row.accent,
                                fontWeight: '900',
                                textAlign: 'right',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Slogan-Style Action Button */}
                  <button
                    onClick={() => {
                      setSelectedPlantId(plant.id);
                      setSubPage(2);
                      playSound('click');
                    }}
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      color: '#FFFBEB',
                      border: '2px solid rgba(253, 230, 138, 0.85)',
                      borderRadius: '999px',
                      padding: '11px 16px',
                      fontSize: '21px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    <span>🌿</span>
                    <span>{isSolved ? 'Review Case Evidence' : 'Start Investigation'}</span>
                    <ArrowRight size={18} />
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
            {/* Left Navigation Button: Back (single, bottom-left corner) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={onBackToDashboard}
                aria-label="Previous Page"
              >
                ← Back
              </button>
            </div>

            {/* Right Navigation Button: Next Activity */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  if (onNextActivity) onNextActivity();
                  else if (onBackToDashboard) onBackToDashboard('next_activity');
                }}
                aria-label="Next Activity"
              >
                <span>{nextLabel || "Next: Table 2.3"}</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 2: INTERACTIVE DETECTIVE LAB (70% STAGE / 30% EVIDENCE FILE)      */}
      {/* ========================================================================= */}
      {subPage === 2 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          marginTop: '4px',
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          border: 'none',
          borderRadius: '24px',
          boxShadow: 'none',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Floating Archives button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.2rem 6px',
            flexShrink: 0,
            background: 'transparent',
            border: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => {
                  setSubPage(1);
                  playSound('click');
                }}
                style={{
                  background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.95) 0%, rgba(4, 24, 15, 0.97) 100%)',
                  border: '2px solid rgba(110, 231, 183, 0.45)',
                  color: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '6px 16px',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.40)'
                }}
              >
                <ArrowLeft size={16} />
                <span>Archives</span>
              </button>
            </div>

            {/* Top Center Title on Bench: Activity 2.4 Attractive Bold Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: '2px solid rgba(254, 240, 138, 0.85)',
              borderRadius: '12px',
              padding: '5px 22px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 16px rgba(245, 158, 11, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.7)',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 30
            }}>
              <h1 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 900,
                fontFamily: '"Cinzel", "Outfit", Georgia, serif',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                lineHeight: 1.15,
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.65), 0 0 10px rgba(0, 0, 0, 0.35)'
              }}>
                Activity 2.4 · Plant Detective
              </h1>
            </div>

            {/* Status & Next Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            </div>
          </div>

          {/* MAIN 68% / 32% STAGE */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 68fr) minmax(0, 32fr)',
            gap: '12px',
            padding: '10px 12px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* ========================================================================= */}
            {/* LEFT 68%: INTERACTIVE FORENSIC BENCH                                      */}
            {/* ========================================================================= */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '100%',
              minHeight: 0,
              overflow: 'hidden'
            }}>
              {/* 2 Step-by-Step Detective Tool Tabs */}
              <div style={{
                display: 'flex',
                gap: '8px',
                alignSelf: 'flex-start',
                flexShrink: 0,
                background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.93) 0%, rgba(4, 24, 15, 0.96) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '2px solid rgba(110, 231, 183, 0.40)',
                borderRadius: '14px',
                padding: '5px 8px',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.40)'
              }}>
                <button
                  className={`detective-tool-tab ${activeTool === 'loupe' ? 'active' : ''}`}
                  onClick={() => { setActiveTool('loupe'); playSound('click'); }}
                >
                  <span>🔬 Step 1: Detective Magnifier</span>
                </button>
                <button
                  className={`detective-tool-tab ${activeTool === 'bend' ? 'active' : ''}`}
                  onClick={() => { setActiveTool('bend'); playSound('click'); }}
                >
                  <span>🖐️ Step 2: Stem Bend Test</span>
                </button>
              </div>

              {/* Main Interactive Stage Box */}
              <div style={{
                flex: 1,
                minHeight: 0,
                position: 'relative',
                background: 'transparent',
                borderRadius: '20px',
                border: 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none'
              }}>
                {/* CENTER INTERACTIVE VISUAL CANVAS */}
                <div 
                  ref={stageRef}
                  onMouseMove={handleStageMouseMove}
                  style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                >
                  
                  {/* ---------------------------------------------------- */}
                  {/* TOOL 1: SEAMLESS REALISTIC DETECTIVE MAGNIFYING LENS */}
                  {/* ---------------------------------------------------- */}
                  {activeTool === 'loupe' && (
                    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Specimen Center Canvas with Full Magnifying Glass Setup */}
                      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {/* Base Plant Image - Cleanly Sized without Overlap */}
                        {/* Specimen stays in the layout so the lens can measure against it,
                            but is not painted - only the magnified view inside the glass shows. */}
                        <img
                          ref={plantImgRef}
                          onLoad={updatePlantMetrics}
                          src={PLANT_IMAGES[activePlant.id]}
                          alt={activePlant.displayName}
                          aria-hidden="false"
                          style={{
                            maxHeight: '80%',
                            maxWidth: '68%',
                            height: 'auto',
                            width: 'auto',
                            objectFit: 'contain',
                            marginBottom: '6px',
                            transform: 'translate(clamp(110px, 13vw, 260px), -3vh)',
                            opacity: 1,
                            filter: 'drop-shadow(0 16px 32px rgba(10, 40, 24, 0.45))',
                            transition: 'opacity 0.2s ease',
                            pointerEvents: 'none',
                            userSelect: 'none'
                          }}
                        />

                        {/* ============================================================ */}
                        {/* UNIFIED SVG DETECTIVE MAGNIFYING GLASS                       */}
                        {/* ============================================================ */}
                        {lensOn && (
                        <div
                          onMouseDown={() => setIsDraggingLens(true)}
                          onTouchStart={() => setIsDraggingLens(true)}
                          style={{
                            position: 'absolute',
                            left: lensLeft,
                            top: lensTop,
                            width: '240px',
                            height: '320px',
                            cursor: isDraggingLens ? 'grabbing' : 'grab',
                            zIndex: 20,
                            transition: isDraggingLens ? 'none' : 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            userSelect: 'none'
                          }}
                        >
                          <svg
                            width="240"
                            height="320"
                            viewBox="0 0 240 320"
                            style={{
                              overflow: 'visible',
                              filter: 'drop-shadow(0 16px 30px rgba(0, 0, 0, 0.42)) drop-shadow(0 4px 9px rgba(0, 0, 0, 0.28))'
                            }}
                          >
                            <defs>
                              {/* Polished gold, lit from the upper left */}
                              <linearGradient id="pdGold" x1="12%" y1="0%" x2="88%" y2="100%">
                                <stop offset="0%" stopColor="#FFF3C4" />
                                <stop offset="14%" stopColor="#F6D982" />
                                <stop offset="30%" stopColor="#E8BC55" />
                                <stop offset="46%" stopColor="#C89A2E" />
                                <stop offset="60%" stopColor="#FFF1C8" />
                                <stop offset="76%" stopColor="#DCB14A" />
                                <stop offset="90%" stopColor="#A87F1E" />
                                <stop offset="100%" stopColor="#7E5C12" />
                              </linearGradient>

                              {/* Collar / pommel banding */}
                              <linearGradient id="pdGoldBand" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8A6414" />
                                <stop offset="18%" stopColor="#E7C264" />
                                <stop offset="38%" stopColor="#FFF4CE" />
                                <stop offset="62%" stopColor="#DDB44C" />
                                <stop offset="84%" stopColor="#A17A1C" />
                                <stop offset="100%" stopColor="#6E4F0E" />
                              </linearGradient>

                              {/* Dark figured ebony grip */}
                              <linearGradient id="pdWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2A1206" />
                                <stop offset="16%" stopColor="#5A2E14" />
                                <stop offset="34%" stopColor="#7A4420" />
                                <stop offset="52%" stopColor="#4E2611" />
                                <stop offset="74%" stopColor="#2E1408" />
                                <stop offset="100%" stopColor="#170902" />
                              </linearGradient>

                              <clipPath id="pdAperture">
                                <circle cx="120" cy="95" r="76" />
                              </clipPath>
                            </defs>

                            {/* ---------- Handle assembly, falling to the lower left ---------- */}
                            <g transform="translate(43, 129) rotate(66)">
                              {/* Stepped gold collar */}
                              <rect x="-13" y="-6" width="26" height="15" rx="4" fill="url(#pdGold)" stroke="#7E5C12" strokeWidth="1" />
                              <rect x="-15" y="8" width="30" height="9" rx="3.5" fill="url(#pdGoldBand)" stroke="#7E5C12" strokeWidth="0.9" />
                              <rect x="-12.5" y="16" width="25" height="22" rx="4" fill="url(#pdGold)" stroke="#7E5C12" strokeWidth="1" />
                              <rect x="-14" y="37" width="28" height="8" rx="3" fill="url(#pdGoldBand)" stroke="#7E5C12" strokeWidth="0.9" />

                              {/* Ebony grip */}
                              <path
                                d="M -12 45 C -13.5 70, -13.5 108, -12 138 L 12 138 C 13.5 108, 13.5 70, 12 45 Z"
                                fill="url(#pdWood)"
                                stroke="#120701"
                                strokeWidth="1.2"
                              />
                              {/* Grain striations */}
                              <path d="M -6.5 50 C -8 78, -8 110, -6.5 134" stroke="#8A5024" strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round" />
                              <path d="M -1 49 C -2 80, -2 108, -1 135" stroke="#6E3A17" strokeWidth="1.1" fill="none" opacity="0.5" strokeLinecap="round" />
                              <path d="M 5 51 C 4 80, 4 108, 5 133" stroke="#3A1B0A" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />
                              <path d="M 9 53 C 8.2 80, 8.2 106, 9 131" stroke="#1C0C03" strokeWidth="1.6" fill="none" opacity="0.5" strokeLinecap="round" />

                              {/* Gold pommel */}
                              <rect x="-13.5" y="136" width="27" height="9" rx="3.5" fill="url(#pdGoldBand)" stroke="#7E5C12" strokeWidth="0.9" />
                              <path d="M -12.5 144 L 12.5 144 L 10 162 Q 0 166 -10 162 Z" fill="url(#pdGold)" stroke="#7E5C12" strokeWidth="1" />
                            </g>

                            {/* ---------- Glass ---------- */}
                            <circle cx="120" cy="95" r="76" fill="rgba(236, 250, 244, 0.10)" />

                            <g clipPath="url(#pdAperture)">
                              <image
                                href={PLANT_IMAGES[activePlant.id]}
                                x={magnifiedImgX}
                                y={magnifiedImgY}
                                width={magnifiedImgW}
                                height={magnifiedImgH}
                                preserveAspectRatio="none"
                              />
                            </g>

                            {/* Specular sheen */}
                            <g clipPath="url(#pdAperture)" pointerEvents="none">
                              <ellipse cx="88" cy="52" rx="40" ry="21" fill="#FFFFFF" opacity="0.26" transform="rotate(-32 88 52)" />
                              <ellipse cx="150" cy="140" rx="22" ry="11" fill="#FFFFFF" opacity="0.10" transform="rotate(-32 150 140)" />
                            </g>

                            {/* ---------- Heavy polished gold rim ---------- */}
                            <circle cx="120" cy="95" r="76" fill="none" stroke="#4A3407" strokeWidth="2" opacity="0.65" />
                            <circle cx="120" cy="95" r="83" fill="none" stroke="url(#pdGold)" strokeWidth="14" />
                            <circle cx="120" cy="95" r="77.5" fill="none" stroke="#FFF6D6" strokeWidth="1.4" opacity="0.65" />
                            <circle cx="120" cy="95" r="89.4" fill="none" stroke="#FFF2C6" strokeWidth="1.3" opacity="0.5" />
                            <circle cx="120" cy="95" r="90.6" fill="none" stroke="#6E4F0E" strokeWidth="1.2" opacity="0.7" />

                            {/* Small knob on the rim, upper right */}
                            <g transform="translate(189, 43) rotate(38)">
                              <rect x="-8" y="-9" width="16" height="12" rx="3" fill="url(#pdGoldBand)" stroke="#7E5C12" strokeWidth="0.9" />
                              <rect x="-6" y="-14" width="12" height="6" rx="2.5" fill="url(#pdGold)" stroke="#7E5C12" strokeWidth="0.8" />
                            </g>
                          </svg>
                        </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* TOOL 2: REALISTIC TACTILE STEM BEND RIG (NCERT BIOMECHANICS) */}
                  {/* ---------------------------------------------------- */}
                  {activeTool === 'bend' && (() => {
                    const angleRad = (currentDeflectionAngle * Math.PI) / 180;
                    const laserX = 300 + 240 * Math.sin(angleRad);
                    const laserY = 345 - 240 * Math.cos(angleRad);

                    return (
                      <div 
                        onMouseDown={() => setIsDraggingStem(true)}
                        onTouchStart={() => setIsDraggingStem(true)}
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          overflow: 'hidden',
                          userSelect: 'none',
                          cursor: isDraggingStem ? 'grabbing' : 'default'
                        }}
                      >
                        {/* Background Precision Angular Protractor Dial */}
                        <svg
                          viewBox="0 0 600 390"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 1
                          }}
                        >
                          <defs>
                            <linearGradient id="protractorArcShine" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FAF8F2" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#14452F" stopOpacity="0.1" />
                            </linearGradient>
                            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Swept Angle Filled Sector */}
                          <path
                            d={`M 300 345 L 300 105 A 240 240 0 0 1 ${laserX} ${laserY} Z`}
                            fill={activePlant.bendResult.color}
                            opacity="0.09"
                          />

                          {/* Faint Concentric Alignment Arcs */}
                          <path
                            d="M 300 105 A 240 240 0 0 1 507.8 225"
                            fill="none"
                            stroke="#14452F"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            opacity="0.28"
                          />
                          <path
                            d="M 300 165 A 180 180 0 0 1 455.8 255"
                            fill="none"
                            stroke="#14452F"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                            opacity="0.18"
                          />

                          {/* 1. Rigid Trunk Zone: 0° - 15° (Red) */}
                          <path
                            d="M 300 105 A 240 240 0 0 1 362.1 113.2"
                            fill="none"
                            stroke="#DC2626"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          {/* 2. Stiff Shrub Zone: 15° - 35° (Amber) */}
                          <path
                            d="M 362.1 113.2 A 240 240 0 0 1 437.6 148.4"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="8"
                          />
                          {/* 3. Flexible Herb Zone: 35° - 60° (Green) */}
                          <path
                            d="M 437.6 148.4 A 240 240 0 0 1 507.8 225"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />

                          {/* Radial Angle Marks & Text Readouts */}
                          {/* 0° Upright */}
                          <line x1="300" y1="105" x2="300" y2="86" stroke="#0F172A" strokeWidth="2.5" />
                          <g stroke="#FFFFFF" strokeWidth="3.4" paintOrder="stroke" strokeLinejoin="round">
                            <text x="300" y="58" textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="900">0°</text>
                            <text x="300" y="76" textAnchor="middle" fill="#0F172A" fontSize="13.5" fontWeight="800">Upright</text>

                            {/* 15° Trunk Rigidity */}
                            <text x="392" y="66" textAnchor="middle" fill="#DC2626" fontSize="17" fontWeight="900">15°</text>
                            <text x="392" y="84" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="800">Trunk Rigidity</text>

                            {/* 35° Shrub Resistance */}
                            <text x="482" y="110" textAnchor="middle" fill="#D97706" fontSize="17" fontWeight="900">35°</text>
                            <text x="482" y="128" textAnchor="middle" fill="#D97706" fontSize="13" fontWeight="800">Shrub Resistance</text>

                            {/* 60° Max (Herb Flexibility) */}
                            <text x="522" y="206" textAnchor="middle" fill="#059669" fontSize="17" fontWeight="900">60°</text>
                            <text x="522" y="224" textAnchor="middle" fill="#059669" fontSize="12.5" fontWeight="800">Max (Herb Flexibility)</text>
                          </g>

                          <line x1="362.1" y1="113.2" x2="368.5" y2="94" stroke="#DC2626" strokeWidth="2.4" />
                          <line x1="437.6" y1="148.4" x2="450" y2="132" stroke="#F59E0B" strokeWidth="2.4" />
                          <line x1="507.8" y1="225" x2="524" y2="215" stroke="#10B981" strokeWidth="2.6" />

                          {/* Live Radiant Laser Pointer Line */}
                          <line
                            x1="300"
                            y1="345"
                            x2={laserX}
                            y2={laserY}
                            stroke={activePlant.bendResult.color}
                            strokeWidth="3.2"
                            strokeDasharray="6 4"
                            filter="url(#laserGlow)"
                          />

                          {/* Current-bend tick on the arc */}
                          <line
                            x1={300 + 224 * Math.sin(angleRad)}
                            y1={345 - 224 * Math.cos(angleRad)}
                            x2={300 + 258 * Math.sin(angleRad)}
                            y2={345 - 258 * Math.cos(angleRad)}
                            stroke="#15803D"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />

                          {/* "N deg / Current Bend" callout — fixed in the left free space near "Upright" */}
                          <g transform="translate(80, 150)">
                            <rect
                              x="0"
                              y="0"
                              width="118"
                              height="52"
                              rx="11"
                              fill="rgba(10, 58, 34, 0.94)"
                              stroke="#4ADE80"
                              strokeWidth="2"
                            />
                            <text x="59" y="23" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900">
                              {Math.round(currentDeflectionAngle)}°
                            </text>
                            <text x="59" y="41" textAnchor="middle" fill="#A7F3D0" fontSize="13" fontWeight="800">
                              Current Bend
                            </text>
                          </g>
                        </svg>

                        {/* Interactive Plant Specimen Anchored in Rig */}
                        <div
                          onMouseDown={() => setIsDraggingStem(true)}
                          onTouchStart={() => setIsDraggingStem(true)}
                          style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            marginLeft: '-105px',
                            width: '360px',
                            height: '400px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            transformOrigin: '50% 92%',
                            transform: `rotate(${currentDeflectionAngle}deg)`,
                            transition: isDraggingStem ? 'none' : 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            cursor: isDraggingStem ? 'grabbing' : 'grab',
                            zIndex: 10,
                            userSelect: 'none'
                          }}
                        >
                          <img
                            src={PLANT_FLEX_IMAGES[activePlant.id]}
                            alt={activePlant.displayName}
                            style={{
                              maxHeight: '100%',
                              maxWidth: '100%',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 14px 28px rgba(20, 69, 47, 0.28))',
                              pointerEvents: 'none'
                            }}
                          />

                          {/* Tactile Pull Handle Attached to Upper Stem */}
                          <div
                            style={{
                              position: 'absolute',
                              right: '-16px',
                              top: '38%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                              color: '#FFFFFF',
                              border: '2px solid #FFFBEB',
                              borderRadius: '999px',
                              padding: '4px 10px',
                              fontSize: '16px',
                              fontWeight: '900',
                              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)',
                              cursor: 'grab',
                              whiteSpace: 'nowrap',
                              animation: !isDraggingStem && bendLevel === 0 ? 'pulseGrip 1.8s infinite ease-in-out' : 'none'
                            }}
                          >
                            <span>🖐️</span>
                            <span>{isDraggingStem ? 'Pulling...' : 'Drag to Bend'}</span>
                          </div>
                        </div>

                        {/* Plant sits directly on the table, root/soil clump resting on the surface */}
                        <div style={{
                          position: 'absolute',
                          bottom: '2px',
                          left: '50%',
                          marginLeft: '-45px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          zIndex: 8,
                          pointerEvents: 'none'
                        }}>
                          {/* Soft contact shadow grounding the specimen on the table surface */}
                          <div style={{
                            width: '170px',
                            height: '22px',
                            borderRadius: '50%',
                            background: 'radial-gradient(ellipse at center, rgba(20, 12, 4, 0.42) 0%, rgba(20, 12, 4, 0.18) 55%, transparent 80%)',
                            marginBottom: '2px'
                          }} />

                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 3. BOTTOM CONTROL STRIP - bend test only; the magnifier bench stays clear */}
                {activeTool === 'bend' && (
                <div style={{
                  background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.93) 0%, rgba(4, 24, 15, 0.96) 100%)',
                  border: '2px solid rgba(110, 231, 183, 0.40)',
                  borderRadius: '16px',
                  marginTop: '8px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  boxShadow: '0 10px 26px rgba(0, 0, 0, 0.40)',
                  overflow: 'hidden'
                }}>
                  {activeTool === 'bend' && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '14px' }}>
                      {/* Interactive Applied Force Slider */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC', whiteSpace: 'nowrap' }}>
                          Force: {Math.round(bendLevel)}%
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={bendLevel}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setBendLevel(val);
                            setSpringOffset(0);
                            if (val > 10) {
                              if (activePlant.id === 'plantC') playSound('thud');
                              else if (activePlant.id === 'plantB') playSound('creak');
                              else playSound('boing');
                            }
                          }}
                          style={{
                            flex: 1,
                            accentColor: activePlant.bendResult.color,
                            cursor: 'pointer',
                            height: '8px'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                )}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT 32%: COMPACT DETECTIVE EVIDENCE LOG (ZERO SCROLLBAR)                */}
            {/* ========================================================================= */}
            <div style={{
              background: `
                linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0) 32%),
                linear-gradient(170deg, rgba(27, 107, 69, 0.55) 0%, rgba(16, 73, 47, 0.60) 45%, rgba(8, 44, 27, 0.66) 100%)
              `,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(2px)',
              border: '2px solid rgba(134, 239, 172, 0.55)',
              borderRadius: '22px',
              padding: '11px 13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              height: '100%',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              boxShadow: [
                'inset 0 1.5px 0 rgba(255, 255, 255, 0.30)',
                'inset 0 -1.5px 0 rgba(0, 0, 0, 0.35)',
                'inset 0 30px 52px -30px rgba(190, 255, 220, 0.22)',
                '0 18px 42px rgba(0, 0, 0, 0.52)'
              ].join(', '),
              boxSizing: 'border-box'
            }}>
              {/* Notebook Header */}
              <div style={{ borderBottom: '2px solid rgba(20, 69, 47, 0.2)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#D97706', fontFamily: '"JetBrains Mono", monospace' }}>
                    {activePlant.caseCode}
                  </span>
                  <span style={{ fontSize: '18px' }}>{activePlant.emoji}</span>
                </div>
              </div>

              {/* DETECTIVE CLUE CARD (MOVED TO RIGHT EVIDENCE LOG) */}
              <div style={{
                background: 'linear-gradient(150deg, rgba(38, 54, 22, 0.96) 0%, rgba(24, 40, 18, 0.97) 100%)',
                borderRadius: '14px',
                padding: '8px 11px',
                border: '2px solid rgba(217, 174, 74, 0.85)',
                boxShadow: '0 8px 22px rgba(0, 0, 0, 0.42)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <span style={{ fontSize: '21px', lineHeight: 1.1, flexShrink: 0 }}>💡</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>
                  <span style={{
                    alignSelf: 'flex-start',
                    fontSize: '14.5px',
                    fontWeight: '900',
                    color: '#0B3B22',
                    background: '#6EE7B7',
                    padding: '1px 10px',
                    borderRadius: '7px',
                    whiteSpace: 'nowrap'
                  }}>
                    Detective Clue:
                  </span>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#F4FBEF', lineHeight: 1.3 }}>
                    {activeTool === 'loupe' && activePlant.loupeFindings[loupeZone].desc}
                    {activeTool === 'bend' && activePlant.bendResult.bubble}
                  </div>
                </div>
              </div>

              {/* Clue 1: Stem Texture */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '900', color: '#F8FAFC' }}>
                    1. Stem Texture
                  </span>
                  {currentAnswers.stem !== null && <span style={{ fontSize: '13px', color: '#6EE7B7', fontWeight: '900' }}>✓ Logged</span>}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {CLUE_OPTIONS.stem.map(opt => (
                    <button
                      key={opt.idx}
                      onClick={() => handleSelectClue('stem', opt.idx)}
                      className={`clue-chip ${currentAnswers.stem === opt.idx ? 'selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clue 2: Branching Position */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '900', color: '#F8FAFC' }}>
                    2. Branching Habit
                  </span>
                  {currentAnswers.branch !== null && <span style={{ fontSize: '13px', color: '#6EE7B7', fontWeight: '900' }}>✓ Logged</span>}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {CLUE_OPTIONS.branch.map(opt => (
                    <button
                      key={opt.idx}
                      onClick={() => handleSelectClue('branch', opt.idx)}
                      className={`clue-chip ${currentAnswers.branch === opt.idx ? 'selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clue 3: Stem Flexibility (Bend Test) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '900', color: '#F8FAFC' }}>
                    3. Stem Flexibility
                  </span>
                  {currentAnswers.flex !== null && <span style={{ fontSize: '13px', color: '#6EE7B7', fontWeight: '900' }}>✓ Logged</span>}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {CLUE_OPTIONS.flex.map(opt => (
                    <button
                      key={opt.idx}
                      onClick={() => handleSelectClue('flex', opt.idx)}
                      className={`clue-chip ${currentAnswers.flex === opt.idx ? 'selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Deduction Verdict Section */}
              <div style={{
                borderTop: '1.5px solid rgba(167, 243, 208, 0.28)',
                paddingTop: '9px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14.5px', fontWeight: '900', color: '#F8FAFC' }}>
                  Final Deduction: What Category Is It?
                </span>

                {isCaseSolved ? (
                  <div style={{
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px', fontWeight: '900' }}>★ CASE CRACKED: {activePlant.category.toUpperCase()}!</span>
                      <span style={{ fontSize: '16px' }}>✓</span>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif', marginTop: '2px' }}>
                      {activePlant.realName}
                    </div>
                    <div style={{ fontSize: '16px', marginTop: '3px', opacity: 0.95 }}>
                      {activePlant.funFact}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { cat: 'Herb', label: '🌿 HERB', color: '#10B981' },
                      { cat: 'Shrub', label: '🌺 SHRUB', color: '#F59E0B' },
                      { cat: 'Tree', label: '🌳 TREE', color: '#059669' }
                    ].map(item => (
                      <button
                        key={item.cat}
                        onClick={() => handleStampCategory(item.cat)}
                        className="verdict-stamp"
                        style={{
                          background: currentAnswers.category === item.cat ? '#14452F' : '#FFFFFF',
                          color: currentAnswers.category === item.cat ? '#FFFFFF' : '#14452F',
                          border: `2px solid ${item.color}`,
                          boxShadow: currentAnswers.category === item.cat ? '0 4px 12px rgba(20, 69, 47, 0.25)' : 'none'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Friendly Hint if Wrong */}
                {currentAnswers.category && !isCaseSolved && (
                  <div style={{
                    background: '#FEF2F2',
                    border: '1.5px solid #EF4444',
                    borderRadius: '8px',
                    padding: '6px 8px',
                    fontSize: '16px',
                    color: '#991B1B',
                    fontWeight: '800'
                  }}>
                    ❌ Clues don't match! Try checking the Stem Bend test on the left!
                  </div>
                )}

                {/* Case Panel CTA */}
                <button
                  onClick={handleNextCase}
                  style={{
                    marginTop: '3px',
                    width: '100%',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    color: '#FFFBEB',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    borderRadius: '13px',
                    padding: '9px 16px',
                    fontSize: '16.5px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '9px',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)',
                    flexShrink: 0
                  }}
                >
                  <Search size={19} />
                  <span>{isCaseSolved ? 'Next Case' : 'Start Investigation'}</span>
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal when All 3 Solved */}
      {showCelebration && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.78)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          zIndex: 50
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.50)',
            border: '2.8px solid #14452F',
            borderRadius: '24px',
            padding: '2rem',
            maxWidth: '520px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
          }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              marginBottom: '1rem'
            }}>
              <Award size={42} />
            </div>

            <div style={{ fontSize: '24px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '6px' }}>
              Detective Badge Earned! 🏆
            </div>
            <div style={{ fontSize: '21px', fontWeight: '900', color: '#059669', marginBottom: '10px' }}>
              Master Chief Botanist Rank Awarded
            </div>

            <div style={{ fontSize: '18px', lineHeight: '1.5', color: '#2D3748', fontWeight: '700', marginBottom: '1.5rem' }}>
              Outstanding work! You investigated, tested stem flexibility, and measured heights to crack all 3 cases:<br />
              <strong>Alpha</strong> = Tulsi (Herb) · <strong>Beta</strong> = Rose (Shrub) · <strong>Gamma</strong> = Neem (Tree)
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setAnswers({
                    plantA: { stem: null, branch: null, height: null, category: null },
                    plantB: { stem: null, branch: null, height: null, category: null },
                    plantC: { stem: null, branch: null, height: null, category: null }
                  });
                  setResults({ plantA: false, plantB: false, plantC: false });
                  setShowCelebration(false);
                  setSelectedPlantId('plantA');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                Play Again
              </button>
              <button
                onClick={() => {
                  if (onNextActivity) onNextActivity();
                  else if (onBackToDashboard) onBackToDashboard();
                }}
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#FFFBEB',
                  border: '2px solid rgba(253, 230, 138, 0.85)',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 10px 26px rgba(0, 0, 0, 0.65), 0 0 16px rgba(245, 158, 11, 0.22)'
                }}
              >
                {nextLabel ? nextLabel : 'Return to Chapter Map ➔'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
