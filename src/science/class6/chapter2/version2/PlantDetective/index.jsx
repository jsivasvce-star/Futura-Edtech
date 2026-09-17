import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, ArrowLeft, CheckCircle2, ArrowRight, Ruler, Eye, 
  Sparkles, RotateCcw, Zap, Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext';
import tulsi24Img from '../../../../../assets/tulsi_2.4.png';
import tulsiFlexImg from '../../../../../assets/tulsi_flex.png';
import rose24Img from '../../../../../assets/rose_2.4.png';
import roseFlexImg from '../../../../../assets/rose_flex.png';
import neem24Img from '../../../../../assets/neem_2.4.png';
import neemFlexImg from '../../../../../assets/neem_flex.png';

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
      leaves: { x: 50, y: 26 },
      stem: { x: 50, y: 52 },
      base: { x: 50, y: 78 }
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
      leaves: { x: 50, y: 26 },
      stem: { x: 50, y: 52 },
      base: { x: 50, y: 78 }
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
      leaves: { x: 50, y: 24 },
      stem: { x: 50, y: 52 },
      base: { x: 50, y: 78 }
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
  plantA: tulsi24Img,
  plantB: rose24Img,
  plantC: neem24Img
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

export default function PlantDetective({ onBackToDashboard, onNextActivity }) {
  const { theme } = useTheme();
  const [selectedPlantId, setSelectedPlantId] = useState('plantA');
  const [subPage, setSubPage] = useState(1); // 1: Archives, 2: Detective Lab Bench
  const [activeTool, setActiveTool] = useState('loupe'); // 'loupe' | 'bend' | 'scale'
  const [loupeZone, setLoupeZone] = useState('stem'); // 'leaves' | 'stem' | 'base'
  const [bendLevel, setBendLevel] = useState(0); // 0 to 100%

  // Real optical lens coordinates & zoom
  const [lensPos, setLensPos] = useState({ x: 50, y: 52 });
  const [zoomLevel, setZoomLevel] = useState(2.8); // 2.8x or 4.2x optical magnification
  const [isDraggingLens, setIsDraggingLens] = useState(false);
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
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
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
        background: 'transparent',
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
          background: #FFFFFF;
          border: 1.8px solid rgba(20, 69, 47, 0.25);
          color: #14452F;
          font-size: 16px;
          font-weight: 800;
          padding: 6px 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'Outfit', sans-serif;
          text-align: center;
          flex: 1;
        }
        .clue-chip.selected {
          background: #14452F;
          color: #FFFFFF;
          border-color: #10B981;
          box-shadow: 0 2px 8px rgba(20, 69, 47, 0.25);
        }

        .verdict-stamp {
          border-radius: 12px;
          font-size: 16px;
          font-weight: 900;
          padding: 10px;
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
          0% { top: 24%; opacity: 0.85; }
          50% { top: 90%; opacity: 1; }
          100% { top: 24%; opacity: 0.85; }
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
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FCD34D;
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
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
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

          {/* Slogan-Style Botanical Centered Header */}
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
              <ArrowLeft size={18} />
              <span>Dashboard</span>
            </button>

            {/* Center: Title flanked by Vine Branches, Sprout, and Sanskrit Motto */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TitleVineBranch side="left" />
                <div style={{
                  fontSize: '22px',
                  fontWeight: '900',
                  color: '#F8FAFC',
                  fontFamily: '"Fraunces", Georgia, serif',
                  textAlign: 'center',
                  letterSpacing: '-0.3px',
                  textShadow: '0 1px 2px rgba(20, 69, 47, 0.1)'
                }}>
                  Activity 2.4 · Plant Detective Bureau
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
                padding: '1px 14px',
                borderRadius: '999px',
                marginTop: '1px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.06)'
              }}>
                ✦ सर्वभूतहिते रताः · Herbs, Shrubs, and Trees Laboratory ✦
              </div>
            </div>

            {/* Right: Solved Cases Trophy Pill */}
            <div style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              padding: '5px 16px',
              borderRadius: '999px',
              fontSize: '16px',
              fontWeight: '900',
              boxShadow: '0 4px 12px rgba(20, 69, 47, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Award size={18} color="#FBBF24" />
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
              const traits = PLANT_TRAITS[plant.id] || {
                stem: 'Botanical cortex',
                branch: 'Lateral growth',
                height: 'Field specimen'
              };

              return (
                <div
                  key={plant.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.50)',
                    border: `2.4px solid ${isSolved ? '#059669' : '#14452F'}`,
                    borderRadius: '18px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isSolved ? '0 8px 24px rgba(5, 150, 105, 0.18)' : '0 8px 24px rgba(20, 69, 47, 0.12)',
                    position: 'relative',
                    overflow: 'hidden',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: '5px' }}>
                    {/* Top Case Badge & Classified Status Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{
                        background: isSolved ? '#059669' : '#14452F',
                        color: '#FFFFFF',
                        padding: '3px 10px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '900',
                        fontFamily: '"JetBrains Mono", monospace'
                      }}>
                        {plant.caseCode}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#92400E', whiteSpace: 'nowrap' }}>
                          📂 CLASSIFIED
                        </span>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '900',
                          color: isSolved ? '#065F46' : '#B91C1C',
                          background: isSolved ? '#D1FAE5' : '#FEE2E2',
                          border: `1.5px solid ${isSolved ? '#6EE7B7' : '#FCA5A5'}`,
                          padding: '2px 8px',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap'
                        }}>
                          {isSolved ? '✓ SOLVED' : '● UNRESOLVED'}
                        </span>
                      </div>
                    </div>

                    {/* Plant Case Title */}
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', margin: '2px 0' }}>
                      {plant.displayName}
                    </div>

                    {/* Specimen Chamber with Active Bio-Scan Animation - Enlarged to 215px */}
                    <div style={{
                      height: '215px',
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%)',
                      borderRadius: '14px',
                      border: '2px solid #D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 12px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 3px 8px rgba(20, 69, 47, 0.08)'
                    }}>
                      {/* Integrated Top HUD Header Strip */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '25px',
                        background: 'rgba(20, 69, 47, 0.94)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 10px',
                        zIndex: 3
                      }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '16px',
                          fontWeight: '900',
                          color: '#34D399',
                          fontFamily: '"JetBrains Mono", monospace'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: '#34D399',
                            animation: 'scanPulseDot 1.4s ease-in-out infinite'
                          }} />
                          BIO-SCAN ACTIVE
                        </span>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '800',
                          color: '#A7F3D0',
                          fontFamily: '"JetBrains Mono", monospace'
                        }}>
                          2.8× MACRO
                        </span>
                      </div>

                      {/* Viewfinder Corner Brackets */}
                      <span style={{ position: 'absolute', top: '27px', left: '8px', fontSize: '18px', lineHeight: 1, color: '#059669', fontWeight: '900', userSelect: 'none' }}>⌜</span>
                      <span style={{ position: 'absolute', top: '27px', right: '8px', fontSize: '18px', lineHeight: 1, color: '#059669', fontWeight: '900', userSelect: 'none' }}>⌝</span>
                      <span style={{ position: 'absolute', bottom: '6px', left: '8px', fontSize: '18px', lineHeight: 1, color: '#059669', fontWeight: '900', userSelect: 'none' }}>⌞</span>
                      <span style={{ position: 'absolute', bottom: '6px', right: '8px', fontSize: '18px', lineHeight: 1, color: '#059669', fontWeight: '900', userSelect: 'none' }}>⌟</span>

                      {/* Animated Bio-Scan Laser Beam Moving Vertically */}
                      <div style={{
                        position: 'absolute',
                        left: '4px',
                        right: '4px',
                        height: '2.5px',
                        background: isSolved 
                          ? 'linear-gradient(90deg, transparent 0%, #10B981 18%, #34D399 50%, #10B981 82%, transparent 100%)'
                          : 'linear-gradient(90deg, transparent 0%, #10B981 18%, #6EE7B7 50%, #10B981 82%, transparent 100%)',
                        boxShadow: isSolved 
                          ? '0 0 12px 2px rgba(16, 185, 129, 0.85)'
                          : '0 0 12px 2px rgba(16, 185, 129, 0.95)',
                        animation: 'bioScanLine 2.8s ease-in-out infinite',
                        pointerEvents: 'none',
                        zIndex: 2
                      }} />

                      {/* Ambient Holographic Light */}
                      <div style={{
                        position: 'absolute',
                        inset: '25px 6px 6px 6px',
                        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.14) 0%, transparent 70%)',
                        animation: 'bioScanGlow 3s ease-in-out infinite',
                        pointerEvents: 'none'
                      }} />

                      {/* Specimen Plant Image - Substantially Enlarged to 175px */}
                      <img
                        src={PLANT_IMAGES[plant.id]}
                        alt={plant.displayName}
                        style={{
                          maxHeight: '175px',
                          maxWidth: '90%',
                          objectFit: 'contain',
                          position: 'relative',
                          zIndex: 1,
                          marginTop: '20px',
                          filter: 'drop-shadow(0 6px 14px rgba(20, 69, 47, 0.25))',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </div>

                    {/* Forensic Botanical Traits Dossier Table */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#059669' }}>🌿</span> Stem:
                        </span>
                        <span style={{ color: '#0F172A', fontWeight: '800' }}>{traits.stem}</span>
                      </div>

                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#D97706' }}>🌳</span> Branches:
                        </span>
                        <span style={{ color: '#0F172A', fontWeight: '800' }}>{traits.branch}</span>
                      </div>

                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#2563EB' }}>📏</span> Height:
                        </span>
                        <span style={{ color: '#0F172A', fontWeight: '800' }}>{traits.height}</span>
                      </div>
                    </div>

                    {/* Target Classification Banner */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(20, 69, 47, 0.06)',
                      border: '1.5px dashed rgba(20, 69, 47, 0.25)',
                      borderRadius: '10px',
                      padding: '6px 12px'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🔬</span> Classification Target:
                      </span>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '900',
                        color: isSolved ? '#059669' : '#D97706',
                        fontFamily: '"Outfit", sans-serif'
                      }}>
                        {isSolved ? `Solved: ${plant.realName} (${plant.category})` : 'Herb, Shrub, or Tree?'}
                      </span>
                    </div>
                  </div>

                  {/* Slogan-Style Action Button */}
                  <button
                    onClick={() => {
                      setSelectedPlantId(plant.id);
                      setSubPage(2);
                      playSound('click');
                    }}
                    style={{
                      background: isSolved ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '9px 16px',
                      fontSize: '18px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: isSolved ? '0 4px 14px rgba(5, 150, 105, 0.35)' : '0 4px 14px rgba(217, 119, 6, 0.38)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      flexShrink: 0
                    }}
                  >
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
                onClick={onBackToDashboard}
                aria-label="Previous Page"
              >
                ← Previous Page
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
                boxShadow: '0 3px 10px rgba(20, 69, 47, 0.3)'
              }}>
                Activity 2.4 · {solvedCount} / 3 Cases Solved
              </div>
            </div>

            {/* Right Navigation Button: Next Activity */}
            <div>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  if (onNextActivity) onNextActivity();
                  else onBackToDashboard('next_activity');
                }}
                aria-label="Next Activity"
              >
                <span>Next: Act 2.5 Leaf Venation</span>
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
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '2.5px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 1.2rem',
            background: 'rgba(15, 23, 42, 0.50)',
            borderBottom: '2.5px solid rgba(20, 69, 47, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => {
                  setSubPage(1);
                  playSound('click');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  borderRadius: '10px',
                  padding: '5px 12px',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={16} />
                <span>Archives</span>
              </button>
            </div>

            {/* Status & Next Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isCaseSolved ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#065F46',
                  background: '#D1FAE5',
                  border: '1.8px solid #059669',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '900'
                }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>IDENTIFIED: {activePlant.realName}</span>
                </div>
              ) : (
                <div style={{
                  color: '#92400E',
                  background: 'rgba(245, 158, 11, 0.18)',
                  border: '1.8px dashed #D97706',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '900'
                }}>
                  🕵️‍♂️ Active Investigation
                </div>
              )}

              <button
                onClick={handleNextCase}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                <span>Next Case</span>
                <ArrowRight size={16} />
              </button>
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
                background: 'rgba(15, 23, 42, 0.50)',
                border: '2px solid #D4AF37',
                borderRadius: '14px',
                padding: '5px 8px'
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
                background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.7) 0%, rgba(250,248,242,0.5) 65%, rgba(235,227,207,0.4) 100%)',
                borderRadius: '20px',
                border: '2.5px solid rgba(20, 69, 47, 0.5)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'inset 0 2px 14px rgba(20, 69, 47, 0.1)'
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
                        <img
                          ref={plantImgRef}
                          onLoad={updatePlantMetrics}
                          src={PLANT_IMAGES[activePlant.id]}
                          alt={activePlant.displayName}
                          style={{
                            maxHeight: '78%',
                            maxWidth: '74%',
                            height: 'auto',
                            width: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 14px 28px rgba(20, 69, 47, 0.22))',
                            pointerEvents: 'none',
                            userSelect: 'none'
                          }}
                        />

                        {/* ============================================================ */}
                        {/* UNIFIED SVG DETECTIVE MAGNIFYING GLASS (STRAIGHT HANDLE)     */}
                        {/* ============================================================ */}
                        <div
                          onMouseDown={() => setIsDraggingLens(true)}
                          onTouchStart={() => setIsDraggingLens(true)}
                          style={{
                            position: 'absolute',
                            left: `calc(${lensPos.x}% - 120px)`,
                            top: `calc(${lensPos.y}% - 95px)`,
                            width: '240px',
                            height: '320px',
                            cursor: isDraggingLens ? 'grabbing' : 'grab',
                            zIndex: 20,
                            transition: isDraggingLens ? 'none' : 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            userSelect: 'none'
                          }}
                        >
                          <svg width="240" height="320" viewBox="0 0 240 320" style={{ overflow: 'visible', filter: 'drop-shadow(0 20px 42px rgba(0,0,0,0.38)) drop-shadow(0 6px 16px rgba(20,69,47,0.24))' }}>
                            <defs>
                              {/* Polished Cylindrical Metallic Brass / Gold Bezel Gradient */}
                              <linearGradient id="goldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFBEB" />
                                <stop offset="15%" stopColor="#FDE68A" />
                                <stop offset="35%" stopColor="#D97706" />
                                <stop offset="55%" stopColor="#FFFBEB" />
                                <stop offset="75%" stopColor="#B45309" />
                                <stop offset="100%" stopColor="#78350F" />
                              </linearGradient>

                              {/* Rich Carved Mahogany Wooden Handle Gradient (Vertical Grain) */}
                              <linearGradient id="mahoganyWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#B45309" />
                                <stop offset="25%" stopColor="#78350F" />
                                <stop offset="60%" stopColor="#451A03" />
                                <stop offset="85%" stopColor="#2A0B00" />
                                <stop offset="100%" stopColor="#170500" />
                              </linearGradient>

                              {/* Subtle Edge Contact Shadow Inside Bezel (100% Crystal-Clear Center) */}
                              <radialGradient id="opticalGlassDepth" cx="50%" cy="50%" r="50%">
                                <stop offset="85%" stopColor="rgba(0, 0, 0, 0)" />
                                <stop offset="100%" stopColor="rgba(15, 23, 42, 0.18)" />
                              </radialGradient>

                              {/* Vivid High-Contrast Lens Filter for Superb Botanical Clarity */}
                              <filter id="vividOptics">
                                <feColorMatrix type="matrix" values="
                                  1.10  0     0     0  0.01
                                  0     1.10  0     0  0.01
                                  0     0     1.06  0  0.01
                                  0     0     0     1  0
                                " />
                                <feComponentTransfer>
                                  <feFuncR type="linear" slope="1.06" intercept="-0.02" />
                                  <feFuncG type="linear" slope="1.06" intercept="-0.02" />
                                  <feFuncB type="linear" slope="1.04" intercept="-0.02" />
                                </feComponentTransfer>
                              </filter>

                              {/* Circular Aperture Clip Path (Center at 120,95, radius 82) */}
                              <clipPath id="lensAperture">
                                <circle cx="120" cy="95" r="82" />
                              </clipPath>
                            </defs>

                            {/* 1. SEAMLESS BRASS NECK & CARVED MAHOGANY HANDLE (EXTENDING STRAIGHT DOWN) */}
                            <g transform="translate(120, 186)">
                              {/* Solid Brass Connector Sleeve with Rivets */}
                              <rect x="-11" y="0" width="22" height="18" rx="3" fill="url(#goldBezel)" stroke="#78350F" strokeWidth="1.2" />
                              <line x1="-11" y1="5" x2="11" y2="5" stroke="#FFFBEB" strokeWidth="1.5" />
                              <line x1="-11" y1="12" x2="11" y2="12" stroke="#78350F" strokeWidth="1.5" />
                              <circle cx="0" cy="8.5" r="2" fill="#451A03" />

                              {/* Ergonomic Straight Turned Wooden Handle */}
                              <path
                                d="M -10 18 C -14 30, -14 55, -9 75 C -7 90, -10 106, -11 118 L 11 118 C 10 106, 7 90, 9 75 C 14 55, 14 30, 10 18 Z"
                                fill="url(#mahoganyWood)"
                                stroke="#1E0700"
                                strokeWidth="1.6"
                              />
                              
                              {/* Polished Brass Turned Accent Rings */}
                              <rect x="-12" y="32" width="24" height="4" rx="1" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
                              <rect x="-11.5" y="42" width="23" height="3" rx="1" fill="#D97706" />
                              <rect x="-10" y="80" width="20" height="2.5" rx="1" fill="#F59E0B" opacity="0.9" />

                              {/* Bottom Brass Pommel Finial Cap */}
                              <rect x="-11" y="118" width="22" height="10" rx="3" fill="url(#goldBezel)" stroke="#78350F" strokeWidth="1.2" />
                              <circle cx="0" cy="123" r="2.5" fill="#78350F" />
                              <circle cx="0" cy="130" r="3.5" fill="url(#goldBezel)" stroke="#78350F" strokeWidth="1" />
                            </g>

                            {/* 2. INNER GLASS BACKGROUND TINT */}
                            <circle cx="120" cy="95" r="82" fill="#FAF8F2" />

                            {/* 3. CRYSTAL-CLEAR OPTICALLY MAGNIFIED SPECIMEN IMAGE */}
                            <g clipPath="url(#lensAperture)" filter="url(#vividOptics)">
                              <image
                                href={PLANT_IMAGES[activePlant.id]}
                                x={magnifiedImgX}
                                y={magnifiedImgY}
                                width={magnifiedImgW}
                                height={magnifiedImgH}
                                preserveAspectRatio="none"
                              />
                            </g>

                            {/* 4. INNER BEZEL CONTACT SHADOW */}
                            <circle cx="120" cy="95" r="82" fill="url(#opticalGlassDepth)" pointerEvents="none" />

                            {/* 8. INNER BRASS RETENTION BEVEL GROOVE */}
                            <circle
                              cx="120"
                              cy="95"
                              r="82"
                              fill="none"
                              stroke="#3A1700"
                              strokeWidth="2"
                            />
                            <circle
                              cx="120"
                              cy="95"
                              r="81"
                              fill="none"
                              stroke="#FEF3C7"
                              strokeWidth="0.8"
                              opacity="0.6"
                            />

                            {/* 9. MAIN HEAVY BEVELED METALLIC BRASS RIM */}
                            <circle
                              cx="120"
                              cy="95"
                              r="87"
                              fill="none"
                              stroke="url(#goldBezel)"
                              strokeWidth="10"
                            />

                            {/* 10. POLISHED OUTER RIM DROP HIGHLIGHT */}
                            <circle
                              cx="120"
                              cy="95"
                              r="92.5"
                              fill="none"
                              stroke="#78350F"
                              strokeWidth="1.8"
                            />
                            <circle
                              cx="119"
                              cy="94"
                              r="92"
                              fill="none"
                              stroke="#FFFBEB"
                              strokeWidth="1.2"
                              opacity="0.65"
                            />
                          </svg>
                        </div>
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
                          <line x1="300" y1="105" x2="300" y2="88" stroke="#14452F" strokeWidth="2.5" />
                          <text x="295" y="80" textAnchor="end" fill="#14452F" fontSize="16" fontWeight="900">0° Upright</text>

                          {/* 15° Tick */}
                          <line x1="362.1" y1="113.2" x2="366.8" y2="95.8" stroke="#DC2626" strokeWidth="2" />
                          <text x="372" y="90" fill="#DC2626" fontSize="16" fontWeight="900">15°</text>

                          {/* 35° Tick */}
                          <line x1="437.6" y1="148.4" x2="447.8" y2="134.4" stroke="#F59E0B" strokeWidth="2" />
                          <text x="454" y="130" fill="#D97706" fontSize="16" fontWeight="900">35°</text>

                          {/* 60° Max Tick */}
                          <line x1="507.8" y1="225" x2="522.5" y2="216.5" stroke="#10B981" strokeWidth="2.5" />
                          <text x="530" y="222" fill="#059669" fontSize="16" fontWeight="900">60° Max</text>

                          {/* Zone Category Badges on Protractor */}
                          <text x="325" y="66" fill="#DC2626" fontSize="16" fontWeight="900">Trunk Rigidity</text>
                          <text x="410" y="105" fill="#D97706" fontSize="16" fontWeight="900">Shrub Resistance</text>
                          <text x="475" y="175" fill="#059669" fontSize="16" fontWeight="900">Herb Flexibility</text>

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

                          {/* Target Angle Flag Indicator */}
                          <circle cx={laserX} cy={laserY} r="18" fill={activePlant.bendResult.color} stroke="#FFFFFF" strokeWidth="2.5" />
                          <text x={laserX} y={laserY + 5} textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900">
                            {Math.round(currentDeflectionAngle)}°
                          </text>
                        </svg>

                        {/* Top-Left HUD Forensic Biomechanics Card */}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '14px',
                          background: 'rgba(15, 23, 42, 0.45)',
                          backdropFilter: 'blur(8px)',
                          border: '2px solid #D4AF37',
                          borderRadius: '16px',
                          padding: '10px 14px',
                          boxShadow: '0 8px 24px rgba(20, 69, 47, 0.14)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '3px',
                          maxWidth: '300px',
                          zIndex: 15,
                          pointerEvents: 'none'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                              Deflection:
                            </span>
                            <span style={{
                              fontSize: '22px',
                              fontWeight: '900',
                              color: activePlant.bendResult.color,
                              fontFamily: '"JetBrains Mono", monospace'
                            }}>
                              {Math.round(currentDeflectionAngle)}°
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '800', color: '#4B5563' }}>
                              Applied Force:
                            </span>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                              {appliedForce}
                            </span>
                          </div>

                          <div style={{
                            fontSize: '16px',
                            fontWeight: '900',
                            color: activePlant.bendResult.color,
                            background: activePlant.bendResult.color + '1A',
                            border: `1.5px solid ${activePlant.bendResult.color}`,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            marginTop: '2px'
                          }}>
                            {activePlant.bendResult.badge}
                          </div>

                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#374151', lineHeight: 1.3, marginTop: '2px' }}>
                            {activePlant.bendResult.bubble}
                          </div>
                        </div>

                        {/* Interactive Plant Specimen Anchored in Rig */}
                        <div
                          onMouseDown={() => setIsDraggingStem(true)}
                          onTouchStart={() => setIsDraggingStem(true)}
                          style={{
                            position: 'absolute',
                            bottom: '44px',
                            left: '50%',
                            marginLeft: '-130px',
                            width: '260px',
                            height: '310px',
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

                        {/* Heavy-Duty Forensic Specimen Vice Clamp at Base */}
                        <div style={{
                          position: 'absolute',
                          bottom: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          zIndex: 12,
                          pointerEvents: 'none'
                        }}>
                          {/* Isometric Terracotta Root Pot */}
                          <div style={{
                            width: '110px',
                            height: '30px',
                            background: 'linear-gradient(180deg, #9A3412 0%, #7C2D12 100%)',
                            borderRadius: '4px 4px 10px 10px',
                            border: '2px solid #431407',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '-8px'
                          }}>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: '#FED7AA' }}>🌱 Root Ball</span>
                          </div>

                          {/* Solid Steel Vice Mechanism with Brass Adjustment Wheels */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                            border: '2px solid #F59E0B',
                            borderRadius: '12px',
                            padding: '5px 16px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                            color: '#FFFFFF'
                          }}>
                            <div style={{ width: '10px', height: '20px', background: '#F59E0B', borderRadius: '3px', border: '1.5px solid #78350F' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '18px' }}>🔩</span>
                              <span style={{ fontSize: '16px', fontWeight: '900', color: '#FEF3C7' }}>
                                BOTANICAL VICE · BASE LOCKED
                              </span>
                            </div>
                            <div style={{ width: '10px', height: '20px', background: '#F59E0B', borderRadius: '3px', border: '1.5px solid #78350F' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 3. BOTTOM TACTILE CONTROL STRIP (Always In View) */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  borderTop: '2px solid rgba(20, 69, 47, 0.2)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  {activeTool === 'loupe' && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                        <Eye size={18} color="#D97706" />
                        <span>Inspecting: {activePlant.loupeFindings[loupeZone].title}</span>
                      </div>

                      {/* Optical Zoom Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>Zoom:</span>
                        <button
                          onClick={() => { setZoomLevel(2.8); playSound('click'); }}
                          style={{
                            background: zoomLevel === 2.8 ? '#D97706' : '#FFFFFF',
                            color: zoomLevel === 2.8 ? '#FFFFFF' : '#14452F',
                            border: '1.8px solid #D97706',
                            borderRadius: '8px',
                            padding: '3px 10px',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer'
                          }}
                        >
                          2.8×
                        </button>
                        <button
                          onClick={() => { setZoomLevel(4.2); playSound('zoom'); }}
                          style={{
                            background: zoomLevel === 4.2 ? '#D97706' : '#FFFFFF',
                            color: zoomLevel === 4.2 ? '#FFFFFF' : '#14452F',
                            border: '1.8px solid #D97706',
                            borderRadius: '8px',
                            padding: '3px 10px',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer'
                          }}
                        >
                          4.2× Macro
                        </button>
                      </div>

                      <span style={{ fontSize: '16px', color: '#059669', fontWeight: '800' }}>
                        ✨ Tip: Drag the lens freely over any part of the plant!
                      </span>
                    </div>
                  )}

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

                      {/* Tactile Preset Buttons */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handlePresetBend(35)}
                          style={{
                            background: bendLevel === 35 ? '#14452F' : '#FFFFFF',
                            color: bendLevel === 35 ? '#FFFFFF' : '#14452F',
                            border: '1.8px solid #D4AF37',
                            borderRadius: '8px',
                            padding: '4px 10px',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer'
                          }}
                        >
                          🖐️ Gentle (35%)
                        </button>

                        <button
                          onClick={() => handlePresetBend(100)}
                          style={{
                            background: bendLevel === 100 ? '#14452F' : '#FFFFFF',
                            color: bendLevel === 100 ? '#FFFFFF' : '#14452F',
                            border: '1.8px solid #D4AF37',
                            borderRadius: '8px',
                            padding: '4px 10px',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer'
                          }}
                        >
                          💪 Max Pull (100%)
                        </button>

                        <button
                          onClick={handleReleaseButton}
                          style={{
                            background: '#FFFFFF',
                            color: '#D97706',
                            border: '1.8px solid #D97706',
                            borderRadius: '8px',
                            padding: '4px 10px',
                            fontSize: '16px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <RotateCcw size={14} />
                          <span>Release / Spring</span>
                        </button>
                      </div>

                      <span style={{ fontSize: '16px', color: '#059669', fontWeight: '800', whiteSpace: 'nowrap' }}>
                        ✨ Tip: Drag stem or use buttons!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT 32%: COMPACT DETECTIVE EVIDENCE LOG (ZERO SCROLLBAR)                */}
            {/* ========================================================================= */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.50)',
              border: '2.5px solid rgba(20, 69, 47, 0.5)',
              borderRadius: '20px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(20, 69, 47, 0.1)',
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
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                  {activePlant.displayName}
                </div>
              </div>

              {/* DETECTIVE CLUE CARD (MOVED TO RIGHT EVIDENCE LOG) */}
              <div style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '8px 10px',
                border: '1.8px solid #FDE68A',
                boxShadow: '0 3px 10px rgba(20, 69, 47, 0.16)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px' }}>💡</span>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#A7F3D0' }}>
                      Detective Clue:
                    </span>
                  </div>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '900',
                    background: '#10B981',
                    color: '#064E3B',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap'
                  }}>
                    {activeTool === 'loupe' && activePlant.loupeFindings[loupeZone].clue}
                    {activeTool === 'bend' && activePlant.bendResult.badge}
                  </span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#F0FDF4', lineHeight: 1.3 }}>
                  {activeTool === 'loupe' && activePlant.loupeFindings[loupeZone].desc}
                  {activeTool === 'bend' && activePlant.bendResult.bubble}
                </div>
              </div>

              {/* Clue 1: Stem Texture */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                    1. Stem Texture
                  </span>
                  {currentAnswers.stem !== null && <span style={{ fontSize: '16px', color: '#059669', fontWeight: '900' }}>✓ Logged</span>}
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
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                    2. Branching Habit
                  </span>
                  {currentAnswers.branch !== null && <span style={{ fontSize: '16px', color: '#059669', fontWeight: '900' }}>✓ Logged</span>}
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
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
                    3. Stem Flexibility
                  </span>
                  {currentAnswers.flex !== null && <span style={{ fontSize: '16px', color: '#059669', fontWeight: '900' }}>✓ Logged</span>}
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
                borderTop: '2px dashed rgba(20, 69, 47, 0.25)',
                paddingTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
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
          backdropFilter: 'blur(8px)',
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
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#059669', marginBottom: '10px' }}>
              Master Chief Botanist Rank Awarded
            </div>

            <div style={{ fontSize: '16px', lineHeight: '1.5', color: '#2D3748', fontWeight: '700', marginBottom: '1.5rem' }}>
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
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                Play Again
              </button>
              <button
                onClick={onBackToDashboard}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                Return to Chapter Map ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
