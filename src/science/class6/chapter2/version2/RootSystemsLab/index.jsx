import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Award, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext';
import darkForestBg from '../../../../../assets/dark_forest_bg.jpg';
import ch2RootSystemsMacro from '../../../../../assets/ch2_root_systems_macro.jpg';
import { rootLabAudio } from './rootLabAudio';
import RootLoupeStage from './RootLoupeStage';
import ExcavationPitStage from './ExcavationPitStage';

// Excavation view (plant in pot / before digging)
import mustard1Img from '../../../../../assets/mustard_1.png';
import grass1Img from '../../../../../assets/grass_1.png';
import hib1Img from '../../../../../assets/hib_1.png';
import marigold1Img from '../../../../../assets/marigold_1.png';
import wheat1Img from '../../../../../assets/wheat_1.png';

// Fully dug state
import mustard2Img from '../../../../../assets/mustard_2.png';
import grass2Img from '../../../../../assets/grass_2.png';
import hib2Img from '../../../../../assets/hib_2.png';
import marigold2Img from '../../../../../assets/marigold_2.png';
import wheat2Img from '../../../../../assets/wheat_2.png';

// Root close-up (washed)
import tap1Img from '../../../../../assets/tap_1.png';
import fib1Img from '../../../../../assets/fib_1.png';

const PLANT_IMG_1 = { mustard: mustard1Img, grass: grass1Img, hibiscus: hib1Img, marigold: marigold1Img, wheat: wheat1Img };
const PLANT_IMG_2 = { mustard: mustard2Img, grass: grass2Img, hibiscus: hib2Img, marigold: marigold2Img, wheat: wheat2Img };
const ROOT_CLOSE_IMG = { taproot: tap1Img, fibrous: fib1Img };
import activity26Cover from './activity26_cover.jpg';
import specimen01TapBlended from './specimen_01_tap_blended.png';
import specimen02CropsBlended from './specimen_02_crops_blended.png';
import specimen03OnionBlended from './specimen_03_onion_blended.png';
import specimen04GrassBlended from './specimen_04_grass_blended.png';
import specimen05MaizeBlended from './specimen_05_maize_blended.png';
import specimen06OverviewBlended from './specimen_06_overview_blended.png';

// =========================================================================
// FULLSCREEN SPECIMEN SLIDES (ACTIVITY 2.6) — EXACT 16:9 HD SPECIMENS
// =========================================================================
const ROOT_SPECIMEN_SLIDES = [
  {
    id: 0,
    num: '00',
    name: 'Activity 2.6: Let Us Find Out',
    type: 'Cover',
    image: activity26Cover
  },
  {
    id: 1,
    num: '01',
    name: 'Taproot Vegetables (Mustard, Carrot, Radish, Beetroot, Turnip)',
    shortTitle: 'Taproot Examples',
    type: 'Taproot System',
    image: specimen01TapBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 2,
    num: '02',
    name: 'Taproot Crops & Trees (Pea, Gram, Bean, Tomato, Sunflower, Hibiscus, Rose, Mango, Neem)',
    shortTitle: 'Taproot Crops & Trees',
    type: 'Taproot System',
    image: specimen02CropsBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 3,
    num: '03',
    name: 'Onion Fibrous Root',
    shortTitle: 'Onion',
    type: 'Fibrous Root System',
    image: specimen03OnionBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 4,
    num: '04',
    name: 'Grass Fibrous Root',
    shortTitle: 'Grass',
    type: 'Fibrous Root System',
    image: specimen04GrassBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 5,
    num: '05',
    name: 'Maize Fibrous Root',
    shortTitle: 'Maize',
    type: 'Fibrous Root System',
    image: specimen05MaizeBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  },
  {
    id: 6,
    num: '06',
    name: 'Fibrous Root Overview (Grass, Wheat, Rice, Maize, Onion)',
    shortTitle: 'Fibrous Root Overview',
    type: 'Fibrous Root System',
    image: specimen06OverviewBlended // Ultra-HD 2.7K crisp blended specimen matching reference fade
  }
];


const PLANTS = [
  { id: 'mustard', name: 'Mustard', emoji: '🌼', rootType: 'taproot', rootColor: '#b45309', potColor: '#b45309',
    desc: 'One thick main root (taproot) going deep into the soil, with many small side roots branching from it.',
    stemColor: '#16a34a', leaves: 3 },
  { id: 'grass', name: 'Common Grass', emoji: '🌾', rootType: 'fibrous', rootColor: '#4d7c0f', potColor: '#65a30d',
    desc: 'Many thin, hair-like roots of roughly equal thickness arising from the base — called fibrous roots.',
    stemColor: '#22c55e', leaves: 5 },
  { id: 'hibiscus', name: 'Hibiscus', emoji: '🌺', rootType: 'taproot', rootColor: '#92400e', potColor: '#c2410c',
    desc: 'A clear taproot system — one dominant root going deep with many lateral (side) roots.',
    stemColor: '#15803d', leaves: 4 },
  { id: 'wheat', name: 'Wheat', emoji: '🌾', rootType: 'fibrous', rootColor: '#78350f', potColor: '#d97706',
    desc: 'Dense fibrous root system — a bunch of equally thin roots spreading out from the stem base.',
    stemColor: '#ca8a04', leaves: 4 },
  { id: 'marigold', name: 'Marigold', emoji: '🌼', rootType: 'taproot', rootColor: '#9a3412', potColor: '#ea580c',
    desc: 'Taproot system with one main root and fine lateral roots — easily visible when the plant is dug up.',
    stemColor: '#15803d', leaves: 3 },
];

const ROOT_LABELS = [
  { id: 'taproot', label: 'Taproot System', icon: '🥕', color: '#f59e0b', desc: 'One thick main root + side branches' },
  { id: 'fibrous', label: 'Fibrous Root System', icon: '🌾', color: '#84cc16', desc: 'Many thin, equal roots from base' },
];

const PLANT_TRAITS = {
  mustard: {
    badge: 'Dicot · Taproot',
    desc: 'Thick dominant taproot penetrating deep into soil with small lateral feeder rootlets.'
  },
  grass: {
    badge: 'Monocot · Fibrous',
    desc: 'Many slender, hair-like roots of equal thickness branching directly from stem base.'
  },
  hibiscus: {
    badge: 'Dicot · Taproot',
    desc: 'Prominent primary taproot extending downward with branching lateral side roots.'
  },
  wheat: {
    badge: 'Monocot · Fibrous',
    desc: 'Dense cluster of equally thin fibrous roots anchoring the shallow topsoil.'
  },
  marigold: {
    badge: 'Dicot · Taproot',
    desc: 'Sturdy central taproot system with fine lateral branches visible upon excavation.'
  },
};

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
    height: '34px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.65
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

// Custom Shoot Systems (Above ground parts)
const MustardShootSVG = () => (
  <svg width="80" height="100" viewBox="0 0 100 110">
    <path d="M50 110 Q50 60 48 30 T54 5" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M48 65 Q30 50 25 45" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 50 Q70 42 75 35" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 75 C10 70 8 50 25 45 C30 50 32 60 30 75 Z" fill="#15803d" stroke="#14532d" strokeWidth="1" />
    <path d="M30 75 Q20 58 25 45" fill="none" stroke="#4ade80" strokeWidth="0.8" opacity="0.6" />
    <path d="M70 75 C90 70 92 50 75 45 C70 50 68 60 70 75 Z" fill="#15803d" stroke="#14532d" strokeWidth="1" />
    <path d="M70 75 Q80 58 75 45" fill="none" stroke="#4ade80" strokeWidth="0.8" opacity="0.6" />
    <path d="M35 55 C18 52 20 38 32 35 C35 40 37 48 35 55 Z" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
    <path d="M65 55 C82 52 80 38 68 35 C65 40 63 48 65 55 Z" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
    <circle cx="54" cy="5" r="4" fill="#eab308" />
    <circle cx="50" cy="2" r="3" fill="#fbbf24" />
    <circle cx="58" cy="8" r="3" fill="#fef08a" />
    <circle cx="48" cy="8" r="3" fill="#fef08a" />
    <circle cx="25" cy="45" r="3" fill="#eab308" />
    <circle cx="22" cy="42" r="2.5" fill="#fef08a" />
    <circle cx="75" cy="35" r="3" fill="#eab308" />
    <circle cx="78" cy="32" r="2.5" fill="#fef08a" />
  </svg>
);

const GrassShootSVG = () => (
  <svg width="80" height="100" viewBox="0 0 100 110">
    <defs>
      <linearGradient id="grassGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
      <linearGradient id="grassGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#166534" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <path d="M50 110 Q35 60 20 20 Q35 60 50 110" fill="url(#grassGrad1)" />
    <path d="M50 110 Q65 60 80 20 Q65 60 50 110" fill="url(#grassGrad1)" />
    <path d="M48 110 Q25 70 10 40 Q30 75 48 110" fill="url(#grassGrad2)" />
    <path d="M52 110 Q75 70 90 40 Q70 75 52 110" fill="url(#grassGrad2)" />
    <path d="M50 110 Q50 50 45 10 Q52 50 50 110" fill="url(#grassGrad1)" />
    <path d="M49 110 Q40 60 30 30 Q44 65 49 110" fill="url(#grassGrad2)" />
    <path d="M51 110 Q60 60 70 30 Q56 65 51 110" fill="url(#grassGrad2)" />
  </svg>
);

const HibiscusShootSVG = () => (
  <svg width="80" height="100" viewBox="0 0 100 110">
    <path d="M50 110 Q50 65 52 40" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M52 40 Q35 25 30 20" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M52 40 Q65 28 72 25" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35 75 C20 70 18 55 32 50 C38 52 40 62 35 75 Z" fill="#14532d" stroke="#166534" strokeWidth="1" />
    <path d="M65 75 C80 70 82 55 68 50 C62 52 60 62 65 75 Z" fill="#14532d" stroke="#166534" strokeWidth="1" />
    <path d="M28 42 C18 38 16 28 26 25 C30 27 32 34 28 42 Z" fill="#166534" />
    <path d="M72 42 C82 38 84 28 74 25 C70 27 68 34 72 42 Z" fill="#166534" />
    <g transform="translate(52, 35)">
      <circle cx="-12" cy="-6" r="13" fill="#dc2626" />
      <circle cx="12" cy="-6" r="13" fill="#dc2626" />
      <circle cx="-10" cy="10" r="13" fill="#b91c1c" />
      <circle cx="10" cy="10" r="13" fill="#b91c1c" />
      <circle cx="0" cy="-14" r="13" fill="#ef4444" />
      <circle cx="0" cy="0" r="6" fill="#7f1d1d" />
      <line x1="0" y1="0" x2="14" y2="-22" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="-22" r="1.8" fill="#eab308" />
      <circle cx="11" cy="-20" r="1.5" fill="#facc15" />
      <circle cx="15" cy="-18" r="1.5" fill="#facc15" />
      <circle cx="17" cy="-21" r="1.5" fill="#facc15" />
    </g>
  </svg>
);

const WheatShootSVG = () => (
  <svg width="80" height="100" viewBox="0 0 100 110">
    <path d="M50 110 Q50 50 48 35 T52 5" fill="none" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 85 Q20 70 12 55 Q35 75 50 85" fill="#84cc16" />
    <path d="M50 85 Q80 70 88 55 Q65 75 50 85" fill="#84cc16" />
    <path d="M48 65 Q25 50 18 35 Q38 52 48 65" fill="#a3e635" opacity="0.9" />
    <path d="M52 65 Q75 50 82 35 Q62 52 52 65" fill="#a3e635" opacity="0.9" />
    <g transform="translate(50, 5)">
      <line x1="0" y1="35" x2="0" y2="0" stroke="#ca8a04" strokeWidth="2" />
      {[
        { x: -5, y: 30, r: 40 }, { x: 5, y: 25, r: -40 },
        { x: -5, y: 20, r: 40 }, { x: 5, y: 15, r: -40 },
        { x: -4, y: 10, r: 40 }, { x: 4, y: 5, r: -40 },
        { x: 0, y: -2, r: 0 }
      ].map((g, i) => (
        <g key={i} transform={`translate(${g.x}, ${g.y}) rotate(${g.r})`}>
          <ellipse cx="0" cy="0" rx="4" ry="6" fill="#fbbf24" stroke="#ca8a04" strokeWidth="0.8" />
          <line x1="0" y1="-6" x2={g.x < 0 ? -12 : 12} y2="-18" stroke="#ca8a04" strokeWidth="0.5" />
        </g>
      ))}
    </g>
  </svg>
);

const MarigoldShootSVG = () => (
  <svg width="80" height="100" viewBox="0 0 100 110">
    <path d="M50 110 Q50 65 48 40" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M48 65 Q30 50 25 45" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 55 Q70 42 75 35" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <g transform="translate(25, 45) rotate(-35)">
      <line x1="0" y1="20" x2="0" y2="-10" stroke="#14532d" strokeWidth="1.5" />
      {[-8, 0, 8].map((y) => (
        <React.Fragment key={y}>
          <line x1="0" y1={y} x2="-8" y2={y-3} stroke="#14532d" strokeWidth="1" />
          <line x1="0" y1={y} x2="8" y2={y-3} stroke="#14532d" strokeWidth="1" />
        </React.Fragment>
      ))}
    </g>
    <g transform="translate(75, 35) rotate(35)">
      <line x1="0" y1="20" x2="0" y2="-10" stroke="#14532d" strokeWidth="1.5" />
      {[-8, 0, 8].map((y) => (
        <React.Fragment key={y}>
          <line x1="0" y1={y} x2="-8" y2={y-3} stroke="#14532d" strokeWidth="1" />
          <line x1="0" y1={y} x2="8" y2={y-3} stroke="#14532d" strokeWidth="1" />
        </React.Fragment>
      ))}
    </g>
    <g transform="translate(48, 38)">
      <path d="M-8 0 Q0 8 8 0 L5 -6 L-5 -6 Z" fill="#15803d" />
      <circle cx="0" cy="-6" r="15" fill="#ea580c" />
      <circle cx="0" cy="-6" r="12" fill="#f97316" />
      <circle cx="-6" cy="-10" r="8" fill="#facc15" />
      <circle cx="6" cy="-10" r="8" fill="#facc15" />
      <circle cx="-8" cy="-3" r="8" fill="#f97316" />
      <circle cx="8" cy="-3" r="8" fill="#f97316" />
      <circle cx="0" cy="-6" r="9" fill="#facc15" />
      <circle cx="0" cy="-6" r="6" fill="#eab308" />
      <circle cx="0" cy="-6" r="3" fill="#ca8a04" />
    </g>
  </svg>
);

const PlantShootSVG = ({ plantId }) => {
  switch (plantId) {
    case 'mustard': return <MustardShootSVG />;
    case 'grass': return <GrassShootSVG />;
    case 'hibiscus': return <HibiscusShootSVG />;
    case 'wheat': return <WheatShootSVG />;
    case 'marigold': return <MarigoldShootSVG />;
    default: return null;
  }
};

// Custom Root Systems (Below ground parts)
const MustardRootSVG = ({ color, isWashed }) => {
  const rootColor = isWashed ? '#d97706' : color;
  const hairColor = isWashed ? '#fcd34d' : 'rgba(217,119,6,0.3)';
  
  return (
    <svg width="140" height="180" viewBox="0 0 140 180">
      <path d="M 70 0 Q 68 30 73 60 T 67 110 T 70 150" fill="none" stroke={rootColor} strokeWidth={isWashed ? 7 : 5} strokeLinecap="round" />
      <path d="M 69 25 Q 40 35 30 50" fill="none" stroke={rootColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 71 35 Q 100 45 110 60" fill="none" stroke={rootColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 71 55 Q 42 70 32 90" fill="none" stroke={rootColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 70 70 Q 102 85 112 105" fill="none" stroke={rootColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 68 95 Q 48 110 42 125" fill="none" stroke={rootColor} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 69 110 Q 90 125 94 140" fill="none" stroke={rootColor} strokeWidth="1.2" strokeLinecap="round" />
      {isWashed && (
        <g stroke={hairColor} strokeWidth="0.6" fill="none" opacity="0.75">
          <path d="M 68 15 Q 60 12 56 15" />
          <path d="M 72 18 Q 80 16 84 20" />
          <path d="M 68 45 Q 58 45 52 48" />
          <path d="M 72 48 Q 82 48 88 52" />
          <path d="M 69 80 Q 60 82 55 86" />
          <path d="M 70 85 Q 78 88 82 92" />
          <path d="M 40 38 Q 30 35 25 38" />
          <path d="M 33 45 Q 22 43 18 48" />
          <path d="M 98 47 Q 108 45 114 49" />
          <path d="M 103 55 Q 115 54 120 59" />
          <path d="M 45 68 Q 35 66 30 70" />
          <path d="M 35 80 Q 24 78 20 83" />
        </g>
      )}
    </svg>
  );
};

const GrassRootSVG = ({ color, isWashed }) => {
  const rootColor = isWashed ? '#84cc16' : color;
  const hairColor = isWashed ? '#bef264' : 'rgba(132,204,22,0.3)';

  return (
    <svg width="140" height="180" viewBox="0 0 140 180">
      <g stroke={rootColor} fill="none" strokeLinecap="round">
        <path d="M 70 0 Q 40 30 20 120 Q 15 145 10 160" strokeWidth="1.8" />
        <path d="M 70 0 Q 50 40 35 130 Q 30 150 25 165" strokeWidth="1.6" />
        <path d="M 70 0 Q 55 50 45 140 Q 42 155 40 170" strokeWidth="1.5" />
        <path d="M 70 0 Q 30 35 15 100 Q 10 125 5 140" strokeWidth="1.5" opacity="0.8" />
        <path d="M 70 0 Q 68 40 68 135 Q 69 155 70 175" strokeWidth="1.8" />
        <path d="M 70 0 Q 72 40 73 145 Q 72 160 72 178" strokeWidth="1.6" />
        <path d="M 70 0 Q 100 30 120 120 Q 125 145 130 160" strokeWidth="1.8" />
        <path d="M 70 0 Q 90 40 105 130 Q 110 150 115 165" strokeWidth="1.6" />
        <path d="M 70 0 Q 85 50 95 140 Q 98 155 100 170" strokeWidth="1.5" />
        <path d="M 70 0 Q 110 35 125 100 Q 130 125 135 140" strokeWidth="1.5" opacity="0.8" />
      </g>
      {isWashed && (
        <g stroke={hairColor} strokeWidth="0.6" fill="none" opacity="0.8">
          <path d="M 28 42 Q 18 55 12 70" />
          <path d="M 33 60 Q 22 75 16 90" />
          <path d="M 40 80 Q 28 98 22 115" />
          <path d="M 112 42 Q 122 55 128 70" />
          <path d="M 107 60 Q 118 75 124 90" />
          <path d="M 100 80 Q 112 98 118 115" />
          <path d="M 68 60 Q 58 80 54 100" />
          <path d="M 72 70 Q 82 90 86 110" />
        </g>
      )}
    </svg>
  );
};

const HibiscusRootSVG = ({ color, isWashed }) => {
  const rootColor = isWashed ? '#7c2d12' : color;
  const hairColor = isWashed ? '#ea580c' : 'rgba(124,45,18,0.3)';

  return (
    <svg width="140" height="180" viewBox="0 0 140 180">
      <path d="M 70 0 Q 65 35 72 70 T 66 120 T 70 160" fill="none" stroke={rootColor} strokeWidth={isWashed ? 11 : 8} strokeLinecap="round" />
      <path d="M 67 20 Q 30 30 18 55" fill="none" stroke={rootColor} strokeWidth={isWashed ? 4 : 3} strokeLinecap="round" />
      <path d="M 72 30 Q 110 40 122 65" fill="none" stroke={rootColor} strokeWidth={isWashed ? 4 : 3} strokeLinecap="round" />
      <path d="M 71 55 Q 38 72 26 98" fill="none" stroke={rootColor} strokeWidth={isWashed ? 3 : 2.2} strokeLinecap="round" />
      <path d="M 70 70 Q 105 90 118 115" fill="none" stroke={rootColor} strokeWidth={isWashed ? 3 : 2.2} strokeLinecap="round" />
      <path d="M 68 95 Q 45 115 38 135" fill="none" stroke={rootColor} strokeWidth={isWashed ? 2 : 1.5} strokeLinecap="round" />
      <path d="M 69 112 Q 95 130 102 150" fill="none" stroke={rootColor} strokeWidth={isWashed ? 2 : 1.5} strokeLinecap="round" />
      {isWashed && (
        <g stroke={hairColor} strokeWidth="0.8" fill="none" opacity="0.85">
          <path d="M 28 32 Q 18 38 10 45" />
          <path d="M 22 45 Q 12 55 5 65" />
          <path d="M 110 42 Q 120 48 128 55" />
          <path d="M 115 55 Q 125 65 132 75" />
          <path d="M 33 80 Q 22 90 15 105" />
          <path d="M 108 100 Q 118 112 122 125" />
        </g>
      )}
    </svg>
  );
};

const WheatRootSVG = ({ color, isWashed }) => {
  const rootColor = isWashed ? '#d97706' : color;
  const hairColor = isWashed ? '#fde68a' : 'rgba(217,119,6,0.3)';

  return (
    <svg width="140" height="180" viewBox="0 0 140 180">
      <g stroke={rootColor} fill="none" strokeLinecap="round">
        <path d="M 70 0 Q 55 35 40 110 T 30 165" strokeWidth="1.8" />
        <path d="M 70 0 Q 60 40 50 120 T 45 175" strokeWidth="1.6" />
        <path d="M 70 0 Q 66 45 60 130 T 58 178" strokeWidth="1.5" />
        <path d="M 70 0 Q 74 45 80 130 T 82 178" strokeWidth="1.5" />
        <path d="M 70 0 Q 80 40 90 120 T 95 175" strokeWidth="1.6" />
        <path d="M 70 0 Q 85 35 100 110 T 110 165" strokeWidth="1.8" />
        <path d="M 70 0 Q 45 25 25 90 T 15 145" strokeWidth="1.5" opacity="0.85" />
        <path d="M 70 0 Q 95 25 115 90 T 125 145" strokeWidth="1.5" opacity="0.85" />
      </g>
      {isWashed && (
        <g stroke={hairColor} strokeWidth="0.6" fill="none" opacity="0.75">
          <path d="M 46 65 Q 36 80 30 95" />
          <path d="M 52 80 Q 42 100 36 120" />
          <path d="M 94 65 Q 104 80 110 95" />
          <path d="M 88 80 Q 98 100 104 120" />
          <path d="M 33 45 Q 22 60 15 75" />
          <path d="M 107 45 Q 118 60 125 75" />
        </g>
      )}
    </svg>
  );
};

const MarigoldRootSVG = ({ color, isWashed }) => {
  const rootColor = isWashed ? '#b45309' : color;
  const hairColor = isWashed ? '#ffedd5' : 'rgba(180,83,9,0.3)';

  return (
    <svg width="140" height="180" viewBox="0 0 140 180">
      <path d="M 70 0 Q 68 35 71 70 T 67 125 T 70 155" fill="none" stroke={rootColor} strokeWidth={isWashed ? 8 : 6} strokeLinecap="round" />
      <g stroke={rootColor} fill="none" strokeLinecap="round">
        <path d="M 68 15 Q 38 25 25 40" strokeWidth="2.2" />
        <path d="M 72 20 Q 102 30 115 45" strokeWidth="2.2" />
        <path d="M 69 35 Q 40 48 28 65" strokeWidth="2.0" />
        <path d="M 71 40 Q 100 52 112 70" strokeWidth="2.0" />
        <path d="M 70 58 Q 42 75 30 95" strokeWidth="1.6" />
        <path d="M 70 65 Q 98 80 110 100" strokeWidth="1.6" />
        <path d="M 69 85 Q 48 102 40 120" strokeWidth="1.2" />
        <path d="M 70 95 Q 92 112 98 130" strokeWidth="1.2" />
      </g>
      {isWashed && (
        <g stroke={hairColor} strokeWidth="0.75" fill="none" opacity="0.85">
          <path d="M 32 30 Q 22 35 15 42" />
          <path d="M 36 33 Q 28 42 22 50" />
          <path d="M 30 52 Q 20 60 12 70" />
          <path d="M 34 56 Q 25 68 18 80" />
          <path d="M 108 35 Q 118 40 125 47" />
          <path d="M 104 38 Q 112 48 118 58" />
          <path d="M 110 58 Q 120 66 128 76" />
          <path d="M 106 63 Q 115 75 122 88" />
        </g>
      )}
    </svg>
  );
};

const PlantRootSVG = ({ plantId, color, isWashed }) => {
  switch (plantId) {
    case 'mustard': return <MustardRootSVG color={color} isWashed={isWashed} />;
    case 'grass': return <GrassRootSVG color={color} isWashed={isWashed} />;
    case 'hibiscus': return <HibiscusRootSVG color={color} isWashed={isWashed} />;
    case 'wheat': return <WheatRootSVG color={color} isWashed={isWashed} />;
    case 'marigold': return <MarigoldRootSVG color={color} isWashed={isWashed} />;
    default: return null;
  }
};

export default function RootSystemsLab({ onBackToDashboard, onPreviousPage, onNext, initialSpecimenIndex = 0, onStateChange }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [phase, setPhase] = useState('specimens'); // 'specimens' | 'lab'
  const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);
  useEffect(() => { if (onStateChange) onStateChange(specimenIndex); }, [specimenIndex, onStateChange]);

  // Title pill: shown for 7s on each slide, then auto-hides; moving the
  // cursor up near the top of the screen brings it back.
  const [showTitle, setShowTitle] = useState(true);
  const titleHideTimerRef = useRef(null);

  const scheduleTitleHide = () => {
    if (titleHideTimerRef.current) clearTimeout(titleHideTimerRef.current);
    titleHideTimerRef.current = setTimeout(() => setShowTitle(false), 7000);
  };

  useEffect(() => {
    if (phase !== 'specimens') return;
    setShowTitle(true);
    scheduleTitleHide();
    return () => {
      if (titleHideTimerRef.current) clearTimeout(titleHideTimerRef.current);
    };
  }, [phase, specimenIndex]);

  const handleSpecimenStageMouseMove = (e) => {
    if (e.clientY < 90 && !showTitle) {
      setShowTitle(true);
      scheduleTitleHide();
    }
  };

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [digProgress, setDigProgress] = useState({});
  const [digging, setDigging] = useState(null);
  const [washed, setWashed] = useState({});
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [allDone, setAllDone] = useState(false);
  const [subPage, setSubPage] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSelectPlant = (plantId) => {
    rootLabAudio.playSwitch(isMuted);
    setSelectedPlant(plantId);
    setSubPage(2);
  };

  const handleNextPlant = () => {
    rootLabAudio.playSwitch(isMuted);
    const currentIndex = PLANTS.findIndex(p => p.id === selectedPlant);
    const nextIndex = (currentIndex + 1) % PLANTS.length;
    setSelectedPlant(PLANTS[nextIndex].id);
  };

  const plant = PLANTS.find(p => p.id === selectedPlant);
  const progress = digProgress[selectedPlant] || 0;
  const isFullyDug = progress >= 100;
  const isWashed = washed[selectedPlant];
  const doneCount = Object.keys(checked).filter(k => checked[k]).length;

  const containerBg = `url(${darkForestBg}) center/cover no-repeat fixed`;
  const textColor = '#0f172a';
  const textMuted = '#334155';
  const textFaint = '#475569';
  
  const sidebarBg = 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.96) 100%)';
  const sidebarBorder = 'rgba(167, 243, 208, 0.95)';
  const resetBtnBorder = 'rgba(167, 243, 208, 0.95)';
  const resetBtnColor = '#0f172a';
  
  const mainBg = 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.96) 100%)';
  const cardBg = '#ffffff';
  const cardBorder = 'rgba(167, 243, 208, 0.95)';
  
  const excavationViewBg = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
  const soilGradient = 'linear-gradient(180deg, #b45309 0%, #7c2d12 50%, #451a03 100%)';
  const soilBorder = '#b45309';
  
  const progressTrackBg = '#cbd5e1';
  
  const buttonDugBg = '#f1f5f9';
  const buttonDugText = '#064e3b';
  
  const closeUpDescBg = 'rgba(240, 250, 244, 0.98)';
  const closeUpDescText = '#064e3b';
  
  const classificationAlertText = '#0f172a';
  const optBg = '#ffffff';
  const optBorder = 'rgba(167, 243, 208, 0.95)';
  const optText = '#0f172a';
  
  const doneOverlayBg = 'rgba(248, 250, 252, 0.98)';
  const doneOverlaySub = '#334155';
  const doneRedoBg = '#cbd5e1';
  const doneRedoText = '#0f172a';

  useEffect(() => {
    if (!digging) return;

    let timer;
    const tick = () => {
      setDigProgress(prev => {
        const cur = prev[digging] || 0;
        if (cur >= 100) {
          setDigging(null);
          return prev;
        }
        timer = setTimeout(tick, 80);
        return { ...prev, [digging]: Math.min(100, cur + 4) };
      });
    };

    timer = setTimeout(tick, 80);
    return () => clearTimeout(timer);
  }, [digging]);

  const handleDig = () => {
    if (!selectedPlant || isFullyDug) return;
    setDigging(selectedPlant);
  };

  const handleWash = () => {
    if (!isFullyDug) return;
    setWashed(prev => ({ ...prev, [selectedPlant]: true }));
  };

  const handleCheck = (plantId) => {
    const correct = PLANTS.find(p => p.id === plantId).rootType;
    const isRight = answers[plantId] === correct;
    setChecked(prev => ({ ...prev, [plantId]: isRight }));
    if (isRight) {
      rootLabAudio.playSuccessChime(isMuted);
      const newChecked = { ...checked, [plantId]: true };
      if (Object.keys(newChecked).filter(k => newChecked[k]).length === PLANTS.length) {
        setAllDone(true);
        confetti({ particleCount: 160, spread: 85, origin: { y: 0.5 } });
      }
    } else {
      rootLabAudio.playErrorBuzz(isMuted);
    }
  };

  const handleReset = () => {
    rootLabAudio.playSwitch(isMuted);
    setSelectedPlant(null); setDigProgress({}); setDigging(null);
    setWashed({}); setAnswers({}); setChecked({}); setAllDone(false);
    setActiveFilter('all');
    setSubPage(1);
  };

  useEffect(() => {
    if (phase !== 'specimens') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (specimenIndex > 0) {
          setSpecimenIndex(prev => prev - 1);
        } else if (onPreviousPage) {
          onPreviousPage();
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
        } else if (onNext) {
          onNext();
        } else {
          setPhase('lab');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, specimenIndex, onPreviousPage, onNext]);

  if (phase === 'specimens') {
    const activeSlide = ROOT_SPECIMEN_SLIDES[specimenIndex];
    return (
      <div
        onMouseMove={handleSpecimenStageMouseMove}
        style={{
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

        {/* Title pill (Habitats Page style, hidden on the cover slide - title already appears on the wooden sign in the image) */}
        {activeSlide.num !== '00' && (() => {
          const displayTitle = activeSlide.shortTitle || activeSlide.name;
          const isLong = displayTitle.length > 18;
          return (
            <div style={{
              position: 'absolute',
              top: showTitle ? '10px' : '-90px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '78vw',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '2px solid rgba(253, 230, 138, 0.85)',
              borderRadius: '14px',
              padding: isLong ? '8px 24px' : '8px 32px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
              opacity: showTitle ? 1 : 0,
              pointerEvents: showTitle ? 'auto' : 'none',
              transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
              zIndex: 1010
            }}>
              <h1 style={{
                margin: 0,
                fontSize: isLong ? '20px' : '28px',
                fontWeight: 900,
                fontFamily: '"Fraunces", Georgia, serif',
                color: '#FFFBEB',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
              }}>
                {displayTitle}
              </h1>
            </div>
          );
        })()}

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
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '26px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
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
          backdropFilter: 'blur(4px)',
          zIndex: 1010,
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
        }}>
          {ROOT_SPECIMEN_SLIDES.map((s, idx) => (
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
            {specimenIndex + 1} / {ROOT_SPECIMEN_SLIDES.length}
          </span>
        </div>

        {/* Floating Bottom Right: Next Slide or Next Activity */}
        <button
          onClick={() => {
            if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
            } else if (onNext) {
              onNext();
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
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '28px',
            padding: '11px 26px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1 ? (
            <>Next <ArrowRight size={20} /></>
          ) : (
            <>Next: Act 2.7 Correlation <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', color: '#F8FAFC', fontFamily: '"Outfit", sans-serif', overflow: 'hidden', padding: '0.6rem', boxSizing: 'border-box' }}>
      <style>{`
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

        /* Realistic Botanical & Soil Respiration Animations */
        @keyframes plantBreatheSway {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          30% {
            transform: translateY(-3px) rotate(0.8deg) scale(1.02);
          }
          70% {
            transform: translateY(-1.5px) rotate(-0.6deg) scale(1.01);
          }
        }

        @keyframes soilGlowPulse {
          0%, 100% {
            opacity: 0.45;
            filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.3));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.55));
          }
        }

        @keyframes sunbeamEarthSweep {
          0% {
            transform: translateX(-140%) rotate(25deg);
            opacity: 0;
          }
          35% {
            opacity: 0.65;
          }
          100% {
            transform: translateX(240%) rotate(25deg);
            opacity: 0;
          }
        }

        .botanical-plant-card {
          background: #FCFBF7;
          border: 2px solid #14452F;
          border-radius: 18px;
          padding: 10px 10px 8px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 6px 18px rgba(20, 69, 47, 0.08);
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease, border-color 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .botanical-plant-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 14px 28px rgba(20, 69, 47, 0.16);
          border-color: #10B981;
        }

        .botanical-plant-card:hover .plant-floating-specimen {
          transform: scale(1.08) translateY(-4px) !important;
          filter: drop-shadow(0 8px 16px rgba(20, 69, 47, 0.35)) !important;
        }

        .botanical-plant-card:hover .soil-bed-glow {
          opacity: 0.95 !important;
          transform: scale(1.15) !important;
        }

        .botanical-plant-card:hover .sunbeam-sweep-line {
          animation: sunbeamEarthSweep 1.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
        }
      `}</style>

      {/* ==================== PAGE 1: SPECIMEN SELECTION GRID (SLOGAN PAGE STYLE) ==================== */}
      {subPage === 1 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(4px)',
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

          {/* Slogan Page Header with Vine Branches, Sprout & Sanskrit Motto */}
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
            {/* Spacer to keep title centered (Dashboard button removed; Back/Next now live only in bottom corners) */}
            <div style={{ width: '1px' }} />

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
                  Activity 2.6 · Root Excavation Station
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
                ✦ मूलाधारः सर्वपादपानाम् · Taproot &amp; Fibrous Systems ✦
              </div>
            </div>

            {/* Right: Sound Toggle + Reset Lab */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsMuted(m => !m)}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  padding: '5px 12px',
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
                {isMuted ? <VolumeX size={16} color="#DC2626" /> : <Volume2 size={16} color="#10B981" />}
                <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  padding: '5px 14px',
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
          </div>

          {/* Macro Soil Profile Comparison Banner (Botanical Subterranean Stratum) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.50)',
            border: '2px solid #D4AF37',
            borderRadius: '16px',
            padding: '7px 14px',
            margin: '0.3rem 0 0.4rem 0',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)',
            position: 'relative',
            zIndex: 3,
            flexShrink: 0
          }}>
            <div style={{
              width: '135px',
              height: '62px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1.8px solid #D4AF37',
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}>
              <img src={ch2RootSystemsMacro} alt="Root Systems Macro Soil Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                insetInline: 0,
                background: 'rgba(20, 69, 47, 0.88)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '900',
                textAlign: 'center',
                padding: '1px 0'
              }}>
                Earth Stratum
              </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  rootLabAudio.playSwitch(isMuted);
                  setActiveFilter(prev => prev === 'taproot' ? 'all' : 'taproot');
                }}
                style={{
                  background: activeFilter === 'taproot' ? '#FAF5EB' : '#FCFBF7',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: activeFilter === 'taproot' ? '2.5px solid #10B981' : '1.8px solid #14452F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  boxShadow: activeFilter === 'taproot' ? '0 0 14px rgba(16, 185, 129, 0.4)' : '0 2px 6px rgba(20, 69, 47, 0.06)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                    🥕 Taproot System (Mustard, Hibiscus, Marigold)
                  </div>
                  <div style={{ fontSize: '16px', color: '#1E293B', fontWeight: '600', marginTop: '1px' }}>
                    One dominant vertical taproot penetrating deep + branching lateral roots
                  </div>
                </div>
                <div style={{
                  background: activeFilter === 'taproot' ? '#10B981' : '#EAF7EE',
                  color: activeFilter === 'taproot' ? '#FFFFFF' : '#14452F',
                  border: '1.8px solid #FDE68A',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  fontSize: '16px',
                  fontWeight: '900',
                  whiteSpace: 'nowrap'
                }}>
                  {activeFilter === 'taproot' ? 'Active Filter ✓' : 'Filter Dicots'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  rootLabAudio.playSwitch(isMuted);
                  setActiveFilter(prev => prev === 'fibrous' ? 'all' : 'fibrous');
                }}
                style={{
                  background: activeFilter === 'fibrous' ? '#FFFBEB' : '#FCFBF7',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: activeFilter === 'fibrous' ? '2.5px solid #F59E0B' : '1.8px solid #14452F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  boxShadow: activeFilter === 'fibrous' ? '0 0 14px rgba(245, 158, 11, 0.4)' : '0 2px 6px rgba(20, 69, 47, 0.06)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                    🌾 Fibrous Root System (Common Grass, Wheat)
                  </div>
                  <div style={{ fontSize: '16px', color: '#1E293B', fontWeight: '600', marginTop: '1px' }}>
                    Dense cluster of equal hair-like roots radiating outward from stem base
                  </div>
                </div>
                <div style={{
                  background: activeFilter === 'fibrous' ? '#F59E0B' : '#FEF3C7',
                  color: activeFilter === 'fibrous' ? '#FFFFFF' : '#92400E',
                  border: '1.5px solid #F59E0B',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  fontSize: '16px',
                  fontWeight: '900',
                  whiteSpace: 'nowrap'
                }}>
                  {activeFilter === 'fibrous' ? 'Active Filter ✓' : 'Filter Monocots'}
                </div>
              </button>
            </div>
          </div>

          {/* 5 Plant Specimen Cards Grid (Interactive Botanical Plates) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.65rem',
            flex: 1,
            minHeight: 0,
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 3,
            margin: '0.2rem 0 0.3rem 0'
          }}>
            {PLANTS.map((p, idx) => {
              const isCheckedTrue = checked[p.id] === true;
              const isCheckedFalse = checked[p.id] === false;
              const isDug = digProgress[p.id] >= 100;
              const cardBorderColor = isCheckedTrue ? '#10B981' : isCheckedFalse ? '#DC2626' : '#14452F';
              const traits = PLANT_TRAITS[p.id] || { badge: 'Specimen', desc: p.desc };
              const matchesFilter = activeFilter === 'all' || p.rootType === activeFilter;

              return (
                <div
                  key={p.id}
                  className="botanical-plant-card"
                  onClick={() => handleSelectPlant(p.id)}
                  style={{
                    border: `2px solid ${cardBorderColor}`,
                    boxShadow: isCheckedTrue ? '0 8px 22px rgba(16, 185, 129, 0.18)' : '0 6px 18px rgba(20, 69, 47, 0.08)',
                    opacity: matchesFilter ? 1 : 0.36,
                    filter: matchesFilter ? 'none' : 'grayscale(40%)',
                    transform: matchesFilter ? 'none' : 'scale(0.98)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, gap: '5px' }}>
                    {/* Herbarium Index Tag & Status Seal Header */}
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
                        🌱 #{idx + 1}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '900',
                          color: isCheckedTrue ? '#065F46' : isCheckedFalse ? '#991B1B' : isDug ? '#92400E' : '#14452F',
                          background: isCheckedTrue ? '#D1FAE5' : isCheckedFalse ? '#FEE2E2' : isDug ? '#FEF3C7' : '#EAF7EE',
                          border: `1.5px solid ${isCheckedTrue ? '#6EE7B7' : isCheckedFalse ? '#FCA5A5' : isDug ? '#FDE68A' : '#A7F3D0'}`,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap'
                        }}>
                          {isCheckedTrue ? (p.rootType === 'taproot' ? 'Taproot' : 'Fibrous') : isCheckedFalse ? 'Retry Dig' : isDug ? 'Dug & Ready' : 'Field Pot'}
                        </span>
                      </div>
                    </div>

                    {/* Realistic Soil & Terrarium Showcase Mound */}
                    <div style={{
                      width: '100%',
                      height: '118px',
                      borderRadius: '14px',
                      background: 'linear-gradient(180deg, #FAF4E8 0%, #EDE4D0 60%, #E2D7BE 100%)',
                      border: '1.8px solid #D4AF37',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 2px 8px rgba(20, 69, 47, 0.08)'
                    }}>
                      {/* Subterranean Loam Soil Bed Gradient at bottom */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '38%',
                        background: 'linear-gradient(180deg, rgba(62, 39, 35, 0.0) 0%, rgba(62, 39, 35, 0.85) 60%, #2A150B 100%)',
                        pointerEvents: 'none',
                        zIndex: 1
                      }} />

                      {/* Subterranean Nutrient Aurora / Mycelium Glow */}
                      <div
                        className="soil-bed-glow"
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          width: '68px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.5) 0%, rgba(245, 158, 11, 0.25) 60%, transparent 100%)',
                          animation: 'soilGlowPulse 3s ease-in-out infinite alternate',
                          pointerEvents: 'none',
                          zIndex: 2,
                          transition: 'all 0.3s ease'
                        }}
                      />

                      {/* Sweeping Sunbeam Angle on Hover */}
                      <div
                        className="sunbeam-sweep-line"
                        style={{
                          position: 'absolute',
                          top: '-50%',
                          left: 0,
                          width: '35%',
                          height: '200%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)',
                          transform: 'translateX(-150%) rotate(25deg)',
                          pointerEvents: 'none',
                          zIndex: 3
                        }}
                      />

                      {/* Live Plant Specimen with Organic Breathe & Sway Animation */}
                      <img
                        src={PLANT_IMG_1[p.id]}
                        alt={p.name}
                        className="plant-floating-specimen"
                        style={{
                          maxWidth: '86%',
                          maxHeight: '86%',
                          objectFit: 'contain',
                          position: 'relative',
                          zIndex: 2,
                          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2))',
                          animation: 'plantBreatheSway 4.5s ease-in-out infinite',
                          animationDelay: `${idx * 0.4}s`,
                          transition: 'transform 0.25s ease, filter 0.25s ease'
                        }}
                      />
                    </div>

                    {/* Specimen Botanical Name & Trait Pill (Stacked to prevent any text clipping) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: 900,
                          color: '#F8FAFC',
                          fontFamily: '"Fraunces", Georgia, serif',
                          whiteSpace: 'nowrap'
                        }}>
                          {p.name}
                        </span>
                      </div>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'rgba(20, 69, 47, 0.08)',
                        color: '#064E3B',
                        border: '1.2px solid rgba(20, 69, 47, 0.25)',
                        padding: '1px 8px',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '800',
                        width: 'fit-content'
                      }}>
                        {traits.badge}
                      </div>
                    </div>

                    {/* Concise NCERT Botanical Description (Zero Truncation) */}
                    <div style={{
                      fontSize: '16px',
                      color: '#1E293B',
                      fontWeight: '600',
                      lineHeight: '1.35',
                      minHeight: '44px'
                    }}>
                      {traits.desc}
                    </div>
                  </div>

                  {/* Card Bottom Interactive Action Button */}
                  <div style={{ paddingTop: '0.4rem', borderTop: '1.5px solid rgba(20, 69, 47, 0.2)', marginTop: '0.3rem' }}>
                    {isCheckedTrue ? (
                      <div style={{
                        background: '#EAF7EE',
                        color: '#F8FAFC',
                        border: '1.8px solid #FDE68A',
                        padding: '7px 10px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: '900',
                        textAlign: 'center',
                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.15)'
                      }}>
                        ✅ {p.rootType === 'taproot' ? 'Taproot' : 'Fibrous Root'}
                      </div>
                    ) : isCheckedFalse ? (
                      <div style={{
                        background: '#FEE2E2',
                        color: '#B91C1C',
                        border: '1.5px solid #DC2626',
                        padding: '7px 10px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: '900',
                        textAlign: 'center'
                      }}>
                        ❌ Retry Dig
                      </div>
                    ) : isDug ? (
                      <div style={{
                        background: '#FEF3C7',
                        color: '#92400E',
                        border: '1.5px solid #F59E0B',
                        padding: '7px 10px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: '900',
                        textAlign: 'center',
                        boxShadow: '0 2px 6px rgba(245, 158, 11, 0.15)'
                      }}>
                        ⛏️ Dug Up &amp; Ready
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleSelectPlant(p.id); }}
                        style={{
                          width: '100%',
                          padding: '8px 0',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          color: '#ffffff',
                          fontWeight: '900',
                          fontSize: '16px',
                          border: '1.8px solid #FDE68A',
                          cursor: 'pointer',
                          boxShadow: '0 3px 10px rgba(20, 69, 47, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Examine Roots</span>
                        <span>➔</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================== Slogan-Style Bottom Navigation Footer ==================== */}
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
            {/* Left Navigation Button: Back (single) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={onPreviousPage || onBackToDashboard}
                aria-label="Previous Page"
              >
                ← Back
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
                🥕 Specimen Slides
              </button>
            </div>

            {/* Center Solved/Progress Indicator with Globe & Leaves Motif */}
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
                <span>Activity 2.6 · {doneCount} of {PLANTS.length} Roots Identified</span>
                <div style={{ width: '60px', height: 6, background: 'rgba(15, 23, 42, 0.45)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#34D399', width: `${(doneCount / PLANTS.length) * 100}%`, transition: 'width 0.4s' }} />
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
                aria-label="Next: Act 2.7 Correlation"
              >
                <span>Next: Act 2.7 Correlation</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PAGE 2: EXCAVATION & CLASSIFICATION WORKBENCH ==================== */}
      {subPage === 2 && plant && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.50)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '2.5px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          padding: '0.45rem 1.4rem 0.4rem'
        }}>
          {/* Slogan Page Foliage Motifs */}
          <TopCornerFoliage side="left" />
          <TopCornerFoliage side="right" />
          <BottomNatureSilhouette />

          {/* Workbench Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2.5px solid rgba(20, 69, 47, 0.2)',
            paddingBottom: '0.35rem',
            position: 'relative',
            zIndex: 10,
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={() => { rootLabAudio.playSwitch(isMuted); setSubPage(1); }}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px',
                  fontWeight: '900',
                  padding: '5px 14px',
                  borderRadius: '12px',
                  boxShadow: '0 3px 8px rgba(20, 69, 47, 0.1)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <ArrowLeft size={18} color="#14452F" />
                <span>Back to Specimens</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>{plant.emoji}</span>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#F8FAFC',
                  fontFamily: '"Fraunces", Georgia, serif',
                  whiteSpace: 'nowrap'
                }}>
                  {plant.name} · Root Excavation
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsMuted(m => !m)}
                style={{
                  background: 'rgba(15, 23, 42, 0.50)',
                  border: '2px solid #D4AF37',
                  color: '#F8FAFC',
                  padding: '5px 12px',
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
                {isMuted ? <VolumeX size={16} color="#DC2626" /> : <Volume2 size={16} color="#10B981" />}
                <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
              </button>

              <span style={{
                fontSize: '16px',
                color: '#F8FAFC',
                fontWeight: '900',
                background: 'rgba(20, 69, 47, 0.08)',
                border: '1.5px solid rgba(20, 69, 47, 0.2)',
                padding: '4px 12px',
                borderRadius: '10px'
              }}>
                Done: {doneCount} / {PLANTS.length}
              </span>

              <button
                type="button"
                onClick={handleNextPlant}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '1.8px solid #FDE68A',
                  color: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(20, 69, 47, 0.25)'
                }}
              >
                <span>Next Specimen</span>
                <ArrowRight size={16} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Workbench Grid: Left = Excavation Pit, Right = Loupe & Classification */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            padding: '0.4rem 0',
            position: 'relative',
            zIndex: 5
          }}>
            {/* Left Column: Interactive Excavation Pit */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.50)',
              borderRadius: '18px',
              padding: '0.85rem 1rem',
              border: '2px solid #D4AF37',
              boxShadow: '0 6px 20px rgba(20,69,47,0.08)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px'
              }}>
                <div style={{
                  fontSize: '18px',
                  color: '#F8FAFC',
                  fontWeight: '900',
                  fontFamily: '"Fraunces", Georgia, serif'
                }}>
                  ⛏️ Station 1: Interactive Digging Pit
                </div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: isFullyDug ? '#065F46' : '#92400E',
                  background: isFullyDug ? '#D1FAE5' : '#FEF3C7',
                  border: `1.5px solid ${isFullyDug ? '#10B981' : '#F59E0B'}`,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {isFullyDug ? (isWashed ? 'Roots Washed Clean' : 'Excavated · Ready to Rinse') : 'Drag / Click Trowel to Dig'}
                </span>
              </div>

              <ExcavationPitStage
                plant={plant}
                plantImg1={PLANT_IMG_1[selectedPlant]}
                plantImg2={PLANT_IMG_2[selectedPlant]}
                progress={progress}
                onDig={(delta) => {
                  setDigProgress(prev => {
                    const cur = prev[selectedPlant] || 0;
                    return { ...prev, [selectedPlant]: Math.min(100, cur + (delta || 10)) };
                  });
                }}
                onQuickDig={() => {
                  setDigProgress(prev => ({ ...prev, [selectedPlant]: 100 }));
                }}
                isFullyDug={isFullyDug}
                isWashed={isWashed}
                onWash={() => {
                  setWashed(prev => ({ ...prev, [selectedPlant]: true }));
                  rootLabAudio.playWaterSplash(isMuted);
                }}
                isMuted={isMuted}
              />
            </div>

            {/* Right Column: Magnifying Loupe & Root Classification */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.50)',
              borderRadius: '18px',
              padding: '0.85rem 1rem',
              border: '2px solid #D4AF37',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 6px 20px rgba(20,69,47,0.08)',
              minHeight: 0
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px'
              }}>
                <div style={{
                  fontSize: '18px',
                  color: '#F8FAFC',
                  fontWeight: '900',
                  fontFamily: '"Fraunces", Georgia, serif'
                }}>
                  🔬 Station 2: Botanical Loupe &amp; Classification
                </div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: isWashed ? '#15803D' : '#475569',
                  background: isWashed ? '#DCFCE7' : '#E2E8F0',
                  border: `1.5px solid ${isWashed ? '#86EFAC' : '#CBD5E1'}`,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {isWashed ? 'Loupe Active' : 'Locked until Roots Rinsed'}
                </span>
              </div>

              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                {!isWashed ? (
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#EDE7D8',
                    borderRadius: '14px',
                    border: '1.8px dashed #14452F',
                    padding: '1.2rem',
                    textAlign: 'center',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '24px' }}>🪣</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#FBBF24', fontFamily: '"Fraunces", Georgia, serif' }}>
                      Underground Soil Covering Roots
                    </div>
                    <div style={{ fontSize: '16px', color: '#2A3B2C', fontWeight: '700', maxWidth: '340px', lineHeight: '1.4' }}>
                      {isFullyDug
                        ? 'Roots are excavated but covered in mud! Click below or in Station 1 to wash them.'
                        : 'Dig up the plant in Station 1 first to uncover its underground root structure!'}
                    </div>
                    {isFullyDug ? (
                      <button
                        type="button"
                        onClick={() => {
                          setWashed(prev => ({ ...prev, [selectedPlant]: true }));
                          rootLabAudio.playWaterSplash(isMuted);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          color: '#FFFFFF',
                          border: '1.5px solid #FCD34D',
                          borderRadius: '12px',
                          padding: '8px 18px',
                          fontSize: '16px',
                          fontWeight: '900',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                        }}
                      >
                        <span>💧 Wash Roots Now</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setDigProgress(prev => ({ ...prev, [selectedPlant]: 100 }));
                          rootLabAudio.playTrowelDig(isMuted);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          color: '#FFFFFF',
                          border: '1.8px solid #FDE68A',
                          borderRadius: '12px',
                          padding: '8px 18px',
                          fontSize: '16px',
                          fontWeight: '900',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.3)'
                        }}
                      >
                        <span>⚡ Excavate Roots Now</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <RootLoupeStage
                    plant={plant}
                    rootImg={ROOT_CLOSE_IMG[plant?.rootType]}
                    rootType={plant?.rootType}
                    plantName={plant?.name}
                    isMuted={isMuted}
                  />
                )}
              </div>

              {/* Classification Buttons */}
              <div style={{
                borderTop: '2px solid rgba(212, 175, 55, 0.45)',
                paddingTop: '0.6rem',
                marginTop: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <div style={{ fontSize: '16px', color: '#F8FAFC', fontWeight: '800' }}>
                    Classify root system of <strong style={{ color: '#F8FAFC', fontSize: '18px' }}>{plant.name}</strong>:
                  </div>
                  {checked[selectedPlant] === true && (
                    <span style={{ color: '#15803D', fontWeight: '900', fontSize: '16px' }}>
                      ✅ Correct!
                    </span>
                  )}
                  {checked[selectedPlant] === false && (
                    <span style={{ color: '#DC2626', fontWeight: '900', fontSize: '16px' }}>
                      ❌ Re-examine the root.
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {ROOT_LABELS.map(opt => {
                    const isSelected = answers[selectedPlant] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          if (!checked[selectedPlant]) {
                            rootLabAudio.playSwitch(isMuted);
                            setAnswers(a => ({ ...a, [selectedPlant]: opt.id }));
                          }
                        }}
                        style={{
                          background: isSelected ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                          border: isSelected ? '2.5px solid #10B981' : '1.8px solid #14452F',
                          color: isSelected ? '#FFFFFF' : '#14452F',
                          padding: '6px 14px',
                          borderRadius: '12px',
                          cursor: checked[selectedPlant] ? 'default' : 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontWeight: '800',
                          boxShadow: isSelected ? '0 4px 12px rgba(20,69,47,0.25)' : 'none'
                        }}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}

                  {answers[selectedPlant] && !checked[selectedPlant] && (
                    <button
                      type="button"
                      onClick={() => handleCheck(selectedPlant)}
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        border: '1.8px solid #FDE68A',
                        color: '#ffffff',
                        padding: '6px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '900',
                        boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
                      }}
                    >
                      Verify ✓
                    </button>
                  )}

                  {checked[selectedPlant] === true && (
                    <button
                      type="button"
                      onClick={() => { rootLabAudio.playSwitch(isMuted); setSubPage(1); }}
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        border: '1.5px solid #FCD34D',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 3px 10px rgba(217, 119, 6, 0.35)'
                      }}
                    >
                      Select Another Plant ➔
                    </button>
                  )}

                  {checked[selectedPlant] === false && (
                    <button
                      type="button"
                      onClick={() => {
                        rootLabAudio.playSwitch(isMuted);
                        setAnswers(a => ({ ...a, [selectedPlant]: null }));
                        setChecked(c => { const n = { ...c }; delete n[selectedPlant]; return n; });
                      }}
                      style={{
                        background: '#FEE2E2',
                        border: '1.5px solid #DC2626',
                        color: '#DC2626',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '800'
                      }}
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All done overlay */}
      {allDone && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.50)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', zIndex: 50, textAlign: 'center', padding: '2rem' }}>
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
            <Award size={64} color="#14452F" style={{ filter: 'drop-shadow(0 4px 12px rgba(20, 69, 47, 0.3))' }} />
            <h2 style={{ color: '#FBBF24', margin: 0, fontSize: '24px', fontWeight: '900', fontFamily: '"Fraunces", Georgia, serif' }}>Root Explorer Badge!</h2>
            <p style={{ color: '#2A3B2C', maxWidth: 460, lineHeight: 1.6, fontSize: '16px', fontWeight: '600', textAlign: 'center' }}>
              You correctly identified all 5 root systems!<br />
              <strong style={{ color: '#F8FAFC' }}>Mustard, Hibiscus, Marigold</strong> → Taproot System<br />
              <strong style={{ color: '#F8FAFC' }}>Grass, Wheat</strong> → Fibrous Root System<br /><br />
              <span style={{ fontSize: '16px', color: '#4B5563', fontStyle: 'italic' }}>Notice the pattern? Continue to Activity 2.7 to discover how this connects to leaf venation!</span>
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button onClick={handleReset} style={{ background: 'rgba(15, 23, 42, 0.50)', border: '1.8px solid #D4AF37', color: '#F8FAFC', padding: '0.75rem 1.85rem', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '800' }}>Redo Lab</button>
              <button onClick={() => onBackToDashboard('next_activity')} style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', border: '1.8px solid #FDE68A', color: '#ffffff', padding: '0.75rem 1.85rem', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '900', boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)' }}>Next: Relate &amp; Analyse ➔</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
