// Class 6 Science Chapter 2 Interactive Slogan & Exploration Page
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowRight, ArrowLeft, X, Sparkles, Eye, BookOpen, ChevronRight } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';
import useWordSyncAudio from './narration/useWordSyncAudio';
import sloganNarrationData from './narration/sloganPageNarration.json';
import bioNarrationAudio from './narration/audio/03_HabitatsAndTheBiosphere.mp3';

// Cinematic Real Living Nature Photograph (National Geographic Sanctuary)
import cinematicLivingNatureImage from './DiversityInTheLivingWorldNew/images/ch2_cinematic_living_nature.jpg';
import biosphereHabitatsFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_biosphere_habitats_fullscreen.jpg';
import desertCamelFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_desert_camel_fullscreen.jpg';
import botanyGreenhouseFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_botany_greenhouse_fullscreen.jpg';
import sacredGroveFullscreenImage from './DiversityInTheLivingWorldNew/images/ch2_sacred_grove_fullscreen.jpg';
import cleanNatureImage from './DiversityInTheLivingWorldNew/images/ch2_cinematic_nature_clean.jpg';

// Individual 8K realistic assets for the 4 facts
import biomesImage from './DiversityInTheLivingWorldNew/images/ch2_biodiversity_hero.jpg';
import adaptationImage from './DiversityInTheLivingWorldNew/images/ch2_desert_thar.jpg';
import botanyImage from './DiversityInTheLivingWorldNew/images/ch2_plant_detective.jpg';
import conservationImage from './DiversityInTheLivingWorldNew/images/ch2_sacred_grove.jpg';

const TOTAL_PAGES = 5;

// Golden & Emerald Leafy Vine Branch extending outwards flanking the main title
const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="54"
    height="26"
    viewBox="0 0 80 32"
    fill="none"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      flexShrink: 0,
      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.45))'
    }}
  >
    <path
      d="M75 16 C55 14, 35 8, 8 2"
      stroke="#F59E0B"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#D97706" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#F59E0B" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#34D399" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#D97706" />
    <path d="M40 18 C44 22, 43 27, 39 29 C35 31, 31 28, 32 23 C33 20, 37 17, 40 18 Z" fill="#10B981" />
  </svg>
);

// Botanical Sprout Motif directly beneath the title in the center with golden glow
const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' }}>
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#D97706" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#34D399" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#FEF08A" />
    </svg>
  </div>
);

// Top Hanging Tree Foliage in corners (matching reference poster design)
const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: 'clamp(140px, 14vw, 220px)',
    height: 'clamp(80px, 9vh, 120px)',
    pointerEvents: 'none',
    zIndex: 4,
    overflow: 'hidden',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.95
  }}>
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="none" fill="none">
      {/* Primary Vine Branches */}
      <path d="M0 0 C45 22, 100 38, 155 32 C175 30, 192 24, 200 18" stroke="#0D3B24" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M65 28 C88 50, 122 66, 150 70" stroke="#1B4D3E" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 16 C50 38, 72 65, 88 86" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Lush Layered Leaves */}
      <path d="M38 12 C54 2, 74 10, 80 24 C68 31, 48 26, 38 12 Z" fill="#2D6A4F" />
      <path d="M75 22 C96 14, 118 22, 124 38 C110 45, 88 38, 75 22 Z" fill="#14452F" />
      <path d="M118 28 C140 20, 162 27, 168 43 C154 50, 132 43, 118 28 Z" fill="#40916C" />
      <path d="M150 28 C172 22, 188 30, 194 43 C180 49, 164 43, 150 28 Z" fill="#2D6A4F" />
      
      {/* Drooping Tender Leaves */}
      <path d="M55 33 C72 27, 88 38, 90 52 C76 57, 60 49, 55 33 Z" fill="#52B788" />
      <path d="M92 44 C108 38, 125 48, 126 62 C112 67, 97 59, 92 44 Z" fill="#40916C" />
      <path d="M125 54 C142 48, 158 58, 160 72 C146 77, 131 69, 125 54 Z" fill="#52B788" />
      <path d="M60 60 C76 55, 90 68, 90 82 C76 86, 64 76, 60 60 Z" fill="#2D6A4F" />
      <path d="M22 34 C36 28, 50 36, 52 50 C38 54, 26 46, 22 34 Z" fill="#40916C" />
    </svg>
  </div>
);

// Soft Mountain Silhouette Backdrop behind the title
const TopMountainBackdrop = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: '8%',
    right: '8%',
    height: '100px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.18,
    overflow: 'hidden'
  }}>
    <svg width="100%" height="100" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none">
      <path d="M0 90 Q160 42 260 70 T520 38 T760 66 T1000 48 L1000 100 L0 100 Z" fill="#52B788" />
      <path d="M100 95 Q290 48 440 75 T720 52 T1000 70 L1000 100 L0 100 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

// Realistic Detailed Botanical Leaf Cluster for the 4 corners of the popup box
const RealisticCornerBotanical = ({ position = 'top-left' }) => {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');
  
  return (
    <div
      style={{
        position: 'absolute',
        top: isTop ? '-3px' : 'auto',
        bottom: !isTop ? '-3px' : 'auto',
        left: isLeft ? '-3px' : 'auto',
        right: !isLeft ? '-3px' : 'auto',
        width: '68px',
        height: '68px',
        pointerEvents: 'none',
        zIndex: 12,
        transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
        filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.28))'
      }}
    >
      <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
        {/* Main curved vine branch */}
        <path d="M4 4 C18 8, 38 18, 54 38 C58 44, 62 52, 64 62" stroke="#14532D" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M4 4 C18 8, 38 18, 54 38" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />

        {/* Primary Leaf 1 - Extending along top edge */}
        <path d="M12 6 C24 2, 42 6, 52 16 C38 20, 24 18, 12 6 Z" fill="#15803D" />
        <path d="M14 7 C26 3, 40 7, 50 15 C42 16, 28 14, 14 7 Z" fill="#22C55E" opacity="0.65" />
        <path d="M12 6 C28 10, 38 13, 52 16" stroke="#BBF7D0" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M22 8 L26 13 M32 10 L38 15 M42 12 L46 16" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Primary Leaf 2 - Extending along left edge */}
        <path d="M6 12 C2 24, 6 42, 16 52 C20 38, 18 24, 6 12 Z" fill="#166534" />
        <path d="M7 14 C3 26, 7 40, 15 50 C16 42, 14 28, 7 14 Z" fill="#4ADE80" opacity="0.6" />
        <path d="M6 12 C10 28, 13 38, 16 52" stroke="#BBF7D0" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M8 22 L13 26 M10 32 L15 38 M12 42 L16 46" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Central Corner Tropical Leaf - Diagonally protruding with organic shading */}
        <path d="M16 16 C28 20, 38 32, 44 48 C34 46, 22 36, 16 16 Z" fill="#14532D" />
        <path d="M18 18 C28 22, 36 32, 42 46 C35 44, 25 35, 18 18 Z" fill="#15803D" />
        <path d="M16 16 C26 26, 34 36, 44 48" stroke="#86EFAC" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M24 24 L30 25 M28 29 L35 32 M33 35 L39 39" stroke="rgba(254, 240, 138, 0.6)" strokeWidth="0.9" strokeLinecap="round" />

        {/* Small tender sprout leaves */}
        <path d="M26 14 C34 11, 42 16, 43 23 C36 24, 29 20, 26 14 Z" fill="#86EFAC" />
        <path d="M14 26 C11 34, 16 42, 23 43 C24 36, 20 29, 14 26 Z" fill="#4ADE80" />

        {/* Golden dewdrops / botanical spores */}
        <circle cx="16" cy="16" r="2.2" fill="#F59E0B" />
        <circle cx="16" cy="16" r="1.1" fill="#FEF3C7" />
        <circle cx="28" cy="10" r="1.5" fill="#FEF08A" opacity="0.85" />
        <circle cx="10" cy="28" r="1.5" fill="#FEF08A" opacity="0.85" />
      </svg>
    </div>
  );
};

// Leaf Ivy Corner Flourish SVG matching the reference image's parchment scroll
const CardCornerLeaves = ({ position = 'top-left', opacity = 0.5 }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 52 52"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '8px' : 'auto',
        bottom: position.includes('bottom') ? '8px' : 'auto',
        left: position.includes('left') ? '8px' : 'auto',
        right: position.includes('right') ? '8px' : 'auto',
        transform: transforms[position],
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <path d="M6 6 C18 9, 28 18, 32 30 C34 36, 32 44, 28 50" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 12 C18 9, 25 12, 26 18 C27 23, 21 26, 16 23 C12 20, 9 15, 12 12 Z" fill="#1B4D3E" />
      <path d="M22 22 C29 19, 36 22, 37 28 C37 33, 31 36, 26 33 C21 30, 19 25, 22 22 Z" fill="#2D6A4F" />
      <path d="M8 25 C13 22, 19 24, 20 29 C20 33, 15 36, 11 34 C7 32, 6 27, 8 25 Z" fill="#40916C" />
      <path d="M7 38 C11 35, 16 37, 17 41 C17 45, 13 47, 9 45 C6 43, 5 40, 7 38 Z" fill="#1B4D3E" />
    </svg>
  );
};

// Ornate Botanical Divider in Card (matching the reference image)
const CardLeafDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    width: '100%',
    margin: 'clamp(6px, 1.1vh, 12px) 0'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, #2D6A4F)' }} />
    <svg width="34" height="18" viewBox="0 0 40 22" fill="none">
      <path d="M20 20 C20 12, 20 4, 20 2" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10 C14 7, 7 10, 6 15 C7 19, 13 19, 18 15 C20 13, 20 11, 20 10 Z" fill="#2D6A4F" />
      <path d="M20 10 C26 7, 33 10, 34 15 C33 19, 27 19, 22 15 C20 13, 20 11, 20 10 Z" fill="#40916C" />
    </svg>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #2D6A4F, transparent)' }} />
  </div>
);

// Royal Burnished Gold Corner Filigree for Ancient Manuscript Scroll
const RoyalCornerOrnament = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'none',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 64 64"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '7px' : 'auto',
        bottom: position.includes('bottom') ? '7px' : 'auto',
        left: position.includes('left') ? '7px' : 'auto',
        right: position.includes('right') ? '7px' : 'auto',
        transform: transforms[position],
        opacity: 0.42,
        pointerEvents: 'none',
        zIndex: 3
      }}
    >
      <path d="M6 34 C6 18, 18 6, 34 6" stroke="rgba(254, 240, 138, 0.8)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 42 C12 24, 24 12, 42 12" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" />
      <polygon points="8,8 14,4 18,8 12,14" fill="rgba(254, 240, 138, 0.75)" />
      <circle cx="8" cy="8" r="2.5" fill="rgba(217, 119, 6, 0.6)" />
      <path d="M18 18 C24 12, 34 16, 36 24 C30 26, 22 22, 18 18 Z" fill="rgba(254, 240, 138, 0.65)" />
      <path d="M18 18 C12 24, 16 34, 24 36 C26 30, 22 22, 18 18 Z" fill="rgba(255, 255, 255, 0.5)" />
      <circle cx="34" cy="34" r="2" fill="rgba(254, 240, 138, 0.8)" />
    </svg>
  );
};

// Royal Centerpiece Lotus & Sunbeam Gold Divider
const RoyalParchmentDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '84%',
    margin: 'clamp(6px, 1.2vh, 12px) auto'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.6))' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ fontSize: '10px', color: '#FEF08A' }}>✦</span>
      <svg width="32" height="18" viewBox="0 0 40 22" fill="none">
        <path d="M20 2 C16 9, 8 13, 2 15 C8 17, 16 21, 20 21 C24 21, 32 17, 38 15 C32 13, 24 9, 20 2 Z" fill="#F59E0B" />
        <circle cx="20" cy="13" r="3.2" fill="#78350F" />
        <circle cx="20" cy="13" r="1.6" fill="#FEF3C7" />
      </svg>
      <span style={{ fontSize: '10px', color: '#FEF08A' }}>✦</span>
    </div>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, rgba(254, 240, 138, 0.6), transparent)' }} />
  </div>
);

// Bottom Nature Silhouette Panorama with trees, deer, birds, and meadow waves (matching reference poster)
const BottomNatureSilhouettes = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '56px',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0.32,
    zIndex: 1
  }}>
    <svg width="100%" height="56" viewBox="0 0 1200 56" preserveAspectRatio="none" fill="none">
      {/* Rolling Meadow Grassy Banks */}
      <path d="M0 42 Q220 26 440 38 T880 32 T1200 40 L1200 56 L0 56 Z" fill="#52B788" />
      <path d="M0 46 Q320 34 640 44 T1200 38 L1200 56 L0 56 Z" fill="#2D6A4F" />
      
      {/* Left Trees */}
      <circle cx="110" cy="34" r="14" fill="#1B4D3E" />
      <circle cx="126" cy="30" r="10" fill="#1B4D3E" />
      <rect x="116" y="40" width="4" height="12" fill="#1B4D3E" />
      
      {/* Flying Birds Left */}
      <path d="M210 24 Q215 19 220 24 Q225 19 230 24" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M245 18 Q249 14 253 18 Q257 14 261 18" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Grass Tufts */}
      <path d="M350 42 L352 34 M352 42 L356 32 M354 42 L360 35" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M430 44 L432 36 M432 44 L436 34 M434 44 L440 37" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      
      {/* Flying Birds Right */}
      <path d="M820 22 Q825 17 830 22 Q835 17 840 22" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Leaping Deer Silhouette (Right side) */}
      <g transform="translate(895, 18) scale(0.65)">
        {/* Antlers */}
        <path d="M16 6 L22 0 M18 4 L23 3 M20 2 L25 1" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round" />
        {/* Head & Body */}
        <path d="M14 8 C16 6, 20 8, 18 12 L15 17 L8 18 C5 19, 2 22, 0 24 L2 28 L5 23 L14 22 L20 30 L22 30 L17 21 C22 20, 24 18, 22 14 Z" fill="#1B4D3E" />
        {/* Legs */}
        <path d="M14 20 L24 28 M16 20 L25 26" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 22 L-3 30 M3 22 L-1 31" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      
      {/* Right Trees & Pine */}
      <circle cx="1020" cy="30" r="16" fill="#1B4D3E" />
      <circle cx="1038" cy="26" r="12" fill="#1B4D3E" />
      <rect x="1026" y="38" width="5" height="14" fill="#1B4D3E" />
      
      <polygon points="1075,14 1065,30 1085,30" fill="#14452F" />
      <polygon points="1075,22 1062,38 1088,38" fill="#14452F" />
      <polygon points="1075,30 1058,46 1092,46" fill="#14452F" />
      <rect x="1073" y="46" width="4" height="8" fill="#14452F" />
    </svg>
  </div>
);

// Brief & Crisp Curriculum Cards for Page 3 (Desert & Surrounding Adaptation, NCERT Grade 6 Curiosity pp. 25-27)
const PAGE_3_CARDS = [
  {
    icon: '🐫',
    title: 'Camel Adaptations',
    desc: 'Long legs and wide hooves prevent sinking in sand, humps store food, and zero sweating saves vital water.',
    isAmber: true
  },
  {
    icon: '🌵',
    title: 'Desert & Mountain Plants',
    desc: 'Desert plants store water in swollen fleshy stems, while mountain deodars have sloping branches so snow slides off.',
    isAmber: false
  },
  {
    icon: '🐟',
    title: 'Aquatic Streamlining',
    desc: 'Fish have smooth streamlined bodies to glide through water, showing how body shape adapts to the habitat.',
    isAmber: true
  }
];

// Curriculum Topics & Lessons for Page 4 (Botanical Taxonomy, NCERT Grade 6 Curiosity pp. 16-20)
const PAGE_4_LESSONS = [
  {
    id: 'habits',
    badge: '03 · PLANT GROUPS',
    shortTab: '01 · Stem Groups',
    title: 'Herbs, Shrubs, Trees & Climbers',
    icon: '🌱',
    cards: [
      {
        icon: '🍅',
        title: 'Herbs (Tomato Plant)',
        desc: 'Short plants with soft, green stems that bend easily.'
      },
      {
        icon: '🌹',
        title: 'Shrubs (Rose Bush)',
        desc: 'Medium plants with woody stems branching near the ground.'
      },
      {
        icon: '🥭',
        title: 'Trees (Mango Tree)',
        desc: 'Tall plants with one thick trunk branching high up.'
      }
    ],
    desc: 'Plants are classified into herbs with soft green stems, shrubs branching near the ground, and tall woody trees.',
    audioText: 'Grouping Plants. Herbs have soft green stems like the tomato. Shrubs have woody stems branching near the ground like the rose. Trees develop tall, thick brown trunks like the mango.'
  },
  {
    id: 'venation',
    badge: '03 · LEAF & ROOT',
    shortTab: '02 · Veins & Roots',
    title: 'Leaf Venation & Root Correlation',
    icon: '🍃',
    cards: [
      {
        icon: '🕸️',
        title: 'Reticulate & Taproots',
        desc: 'Net-like veins pair with a deep central taproot.'
      },
      {
        icon: '🌾',
        title: 'Parallel & Fibrous Roots',
        desc: 'Parallel veins pair with thin, fibrous root clusters.'
      },
      {
        icon: '🪴',
        title: 'Climbers & Creepers',
        desc: 'Weak-stemmed plants that climb with support or creep along soil.'
      }
    ],
    desc: 'Leaf venation links directly to root systems: reticulate leaves have taproots, and parallel leaves have fibrous roots.',
    audioText: 'Venation and Roots. Leaves with net-like reticulate venation develop deep taproots, while leaves with parallel venation form fibrous root clusters.'
  },
  {
    id: 'seeds',
    badge: '03 · SEED COTYLEDONS',
    shortTab: '03 · Cotyledons',
    title: 'Monocot vs Dicot Seed Architecture',
    icon: '🌰',
    cards: [
      {
        icon: '🌰',
        title: 'Dicotyledon (Chickpea)',
        desc: 'Splits into two cotyledons; has net-veined leaves and a taproot.'
      },
      {
        icon: '🌽',
        title: 'Monocotyledon (Maize)',
        desc: 'Has one cotyledon; leaves show parallel veins, roots are fibrous.'
      },
      {
        icon: '🌱',
        title: 'The Botanical Triad Rule',
        desc: 'Cotyledon count, vein pattern, and root type are all linked.'
      }
    ],
    desc: 'Dicot seeds have two cotyledons and taproots; monocot seeds have one cotyledon and fibrous roots.',
    audioText: 'Dicot and Monocot Seeds. Dicot seeds like chickpea split into two cotyledons and have taproots. Monocot seeds like maize have one cotyledon and fibrous roots.'
  }
];

// Curriculum Topics & Lessons for Page 5 (Sacred Groves & Conservation, NCERT Grade 6 Curiosity pp. 22-23, 29)
const PAGE_5_LESSONS = [
  {
    id: 'sacred_groves',
    badge: '04 · SACRED FORESTS',
    shortTab: '01 · Sacred Groves',
    title: 'Traditionally Protected Sacred Groves',
    icon: '🌳',
    cards: [
      {
        icon: '🌳',
        title: 'Undisturbed Forests',
        desc: 'Virgin forests kept safe by local communities’ cultural reverence.'
      },
      {
        icon: '🌿',
        title: 'Medicinal Plant Haven',
        desc: 'Shelters native wildlife and valuable medicinal plants.'
      },
      {
        icon: '🤝',
        title: 'Community Conservation',
        desc: 'Local rules ban cutting trees or harming animals here.'
      }
    ],
    desc: 'Sacred groves are community-protected virgin forest patches across India safeguarding rare medicinal flora.',
    audioText: 'Sacred Groves. Sacred groves are undisturbed forest patches protected by local communities across India, safeguarding diverse animals and invaluable medicinal plants.'
  },
  {
    id: 'janaki_ammal',
    badge: '04 · SCIENTIST LEGACY',
    shortTab: '02 · Janaki Ammal',
    title: 'Dr. E.K. Janaki Ammal & Plant Heritage',
    icon: '🧬',
    cards: [
      {
        icon: '🧬',
        title: 'Pioneering Indian Botanist',
        desc: 'Botanist (1897–1984) who led the Botanical Survey of India.'
      },
      {
        icon: '🏞️',
        title: 'Save Silent Valley Movement',
        desc: 'Helped save Kerala’s pristine Silent Valley rainforest.'
      },
      {
        icon: '🌾',
        title: 'Protecting Wild Gene Pools',
        desc: 'Studied sugarcane and wild-plant chromosomes to protect biodiversity.'
      }
    ],
    desc: 'Dr. E.K. Janaki Ammal documented India’s plant wealth and championed the Save Silent Valley movement.',
    audioText: 'Dr. E.K. Janaki Ammal. An Indian botanist who documented India’s plant biodiversity, headed the Botanical Survey of India, and helped save the pristine Silent Valley rainforest.'
  },
  {
    id: 'biodiversity',
    badge: '04 · LIVING PLANET',
    shortTab: '03 · Living Planet',
    title: 'Protecting Habitats & Biodiversity',
    icon: '🌍',
    cards: [
      {
        icon: '🌍',
        title: 'What is Biodiversity?',
        desc: 'The rich variety of plants and animals sharing our planet.'
      },
      {
        icon: '🛡️',
        title: 'Protecting Habitats',
        desc: 'Every organism needs its habitat for food, water, and shelter.'
      },
      {
        icon: '📜',
        title: 'Ensuring Life Thrives',
        desc: 'Protecting biodiversity keeps our planet full of thriving life.'
      }
    ],
    desc: 'We must protect habitats and biodiversity to ensure our planet remains vibrant and full of living wonders.',
    audioText: 'Protecting Biodiversity. We must protect natural habitats so that plants and animals have food and shelter, ensuring our planet remains vibrant and full of life.'
  }
];

const PAGE_3_FACTS = [
  {
    badge: '02 · MORPHOLOGY & ADAPTATION',
    title: 'Adaptation & Survival',
    icon: '🐫',
    image: adaptationImage,
    alt: 'Camel exhibiting specialized desert survival adaptations in Thar desert',
    desc: 'Discover how organisms develop specialized anatomical traits over generations to flourish in harsh climatic extremes.'
  },
  {
    badge: '03 · BOTANICAL TAXONOMY',
    title: 'Botanical Diversity',
    icon: '🌿',
    image: botanyImage,
    alt: 'Botanical classification of tender herbs, shrubs, tree saplings, and vines',
    desc: 'Classify herbs, shrubs, trees, leaf venation patterns, taproots vs fibrous roots, and monocot vs dicot seed cotyledons.'
  },
  {
    badge: '04 · ECOLOGY & CONSERVATION',
    title: 'Conservation & Ethics',
    icon: '🕊️',
    image: conservationImage,
    alt: 'Protected sacred grove in Western Ghats with ancient banyan trees and flying hornbill',
    desc: 'Learn how sacred groves and pioneering botanists like Dr. E.K. Janaki Ammal protected India’s irreplaceable biodiversity.'
  }
];

export default function Chapter2SloganPage({
  chapterNum = 2,
  title = "Diversity in the Living World",
  onBack,
  onEnterLab,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingSloganAudio, setIsPlayingSloganAudio] = useState(false);
  const [isPlayingMeaningAudio, setIsPlayingMeaningAudio] = useState(false);
  const [isPlayingWhyStudyAudio, setIsPlayingWhyStudyAudio] = useState(false);
  const [isPlayingBioAudio, setIsPlayingBioAudio] = useState(false);
  const [isPlayingAdaptationAudio, setIsPlayingAdaptationAudio] = useState(false);
  const [isPlayingBotanyAudio, setIsPlayingBotanyAudio] = useState(false);
  const [isPlayingConservationAudio, setIsPlayingConservationAudio] = useState(false);
  const [isSloganPopOpen, setIsSloganPopOpen] = useState(true);
  const [showPage2Popup, setShowPage2Popup] = useState(false);
  const [showPage3Popup, setShowPage3Popup] = useState(false);
  const [showPage4Popup, setShowPage4Popup] = useState(false);
  const [showPage5Popup, setShowPage5Popup] = useState(false);
  const [page3ActiveTab, setPage3ActiveTab] = useState(0);
  const [page4ActiveTab, setPage4ActiveTab] = useState(0);
  const [page5ActiveTab, setPage5ActiveTab] = useState(0);
  
  const sloganAudioRef = useRef(null);
  const meaningAudioRef = useRef(null);
  const whyStudyAudioRef = useRef(null);
  const containerRef = useRef(null);

  // Real narration audio + word-level highlight sync for the Habitats & Biosphere page
  const {
    activeWordIndex: bioActiveWordIndex,
    play: playBioNarration,
    pause: pauseBioNarration,
  } = useWordSyncAudio(bioNarrationAudio, sloganNarrationData.bio.words, {
    autoPlay: false,
    onEnd: () => setIsPlayingBioAudio(false),
  });

  // Stop audio on page change or unmount
  useEffect(() => {
    return () => {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        sloganAudioRef.current = null;
      }
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        meaningAudioRef.current = null;
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        whyStudyAudioRef.current = null;
      }
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);
      setIsPlayingBioAudio(false);
      setIsPlayingAdaptationAudio(false);
      setIsPlayingBotanyAudio(false);
      setIsPlayingConservationAudio(false);
    };
  }, [currentPage]);

  // Page 2: Trigger attractive popup message after 4 seconds of full-image viewing
  useEffect(() => {
    if (currentPage === 2) {
      setShowPage2Popup(false);
      const timer = setTimeout(() => {
        setShowPage2Popup(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowPage2Popup(false);
      if (isPlayingBioAudio) {
        stopNarration();
        setIsPlayingBioAudio(false);
      }
    }
  }, [currentPage]);

  // Page 3: Trigger attractive popup message after 4 seconds of full-image viewing
  useEffect(() => {
    if (currentPage === 3) {
      setShowPage3Popup(false);
      const timer = setTimeout(() => {
        setShowPage3Popup(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowPage3Popup(false);
      if (isPlayingAdaptationAudio) {
        stopNarration();
        setIsPlayingAdaptationAudio(false);
      }
    }
  }, [currentPage]);

  // Page 4: Trigger attractive popup message after 4 seconds of full-image viewing
  useEffect(() => {
    if (currentPage === 4) {
      setShowPage4Popup(false);
      const timer = setTimeout(() => {
        setShowPage4Popup(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowPage4Popup(false);
      if (isPlayingBotanyAudio) {
        stopNarration();
        setIsPlayingBotanyAudio(false);
      }
    }
  }, [currentPage]);

  // Page 5: Trigger attractive popup message after 4 seconds of full-image viewing
  useEffect(() => {
    if (currentPage === 5) {
      setShowPage5Popup(false);
      const timer = setTimeout(() => {
        setShowPage5Popup(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowPage5Popup(false);
      if (isPlayingConservationAudio) {
        stopNarration();
        setIsPlayingConservationAudio(false);
      }
    }
  }, [currentPage]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentPage < TOTAL_PAGES) {
          setCurrentPage(prev => prev + 1);
        } else if (onEnterLab) {
          onEnterLab();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else if (onBack) {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, onEnterLab, onBack]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Toggle Sanskrit Shloka recitation audio
  const toggleSloganAudio = () => {
    if (isPlayingSloganAudio) {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        sloganAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingSloganAudio(false);
    } else {
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        setIsPlayingMeaningAudio(false);
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        setIsPlayingWhyStudyAudio(false);
      }
      stopNarration();

      if (!sloganAudioRef.current) {
        sloganAudioRef.current = new Audio('/activities/ch2_slogan_voice.mp3');
        sloganAudioRef.current.onended = () => setIsPlayingSloganAudio(false);
        sloganAudioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Subhāshitam.",
            onEnd: () => setIsPlayingSloganAudio(false),
            onError: () => setIsPlayingSloganAudio(false)
          });
          setIsPlayingSloganAudio(true);
        };
      }
      sloganAudioRef.current.currentTime = 0;
      sloganAudioRef.current.play().then(() => {
        setIsPlayingSloganAudio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Subhāshitam.",
          onEnd: () => setIsPlayingSloganAudio(false),
          onError: () => setIsPlayingSloganAudio(false)
        });
        setIsPlayingSloganAudio(true);
      });
    }
  };

  // Toggle English Meaning narration audio
  const toggleMeaningAudio = () => {
    if (isPlayingMeaningAudio) {
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        meaningAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingMeaningAudio(false);
    } else {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        setIsPlayingSloganAudio(false);
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        setIsPlayingWhyStudyAudio(false);
      }
      stopNarration();

      speakNaturalIndianMale({
        text: "Trees stand in the Sun and give shade to others. Their fruits are also for others. Likewise, good people bear all hardships and bring welfare to others. They give to others whatever they have earned.",
        onEnd: () => setIsPlayingMeaningAudio(false),
        onError: () => setIsPlayingMeaningAudio(false)
      });
      setIsPlayingMeaningAudio(true);
    }
  };

  // Toggle "Why study this chapter?" Voiceover
  const toggleWhyStudyAudio = () => {
    if (isPlayingWhyStudyAudio) {
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        whyStudyAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingWhyStudyAudio(false);
    } else {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        setIsPlayingSloganAudio(false);
      }
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        setIsPlayingMeaningAudio(false);
      }
      stopNarration();

      if (!whyStudyAudioRef.current) {
        whyStudyAudioRef.current = new Audio('/activities/ch2_why_study_voice.mp3');
        whyStudyAudioRef.current.onended = () => setIsPlayingWhyStudyAudio(false);
        whyStudyAudioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Why study this chapter? In this chapter, we explore Diversity in the Living World. Just like the trees in this ancient verse selflessly support all other life by offering shade and food, every living organism is interconnected. Plants, animals, and humans depend on each other, forming a beautiful, cooperative web of life.",
            onEnd: () => setIsPlayingWhyStudyAudio(false),
            onError: () => setIsPlayingWhyStudyAudio(false)
          });
          setIsPlayingWhyStudyAudio(true);
        };
      }
      whyStudyAudioRef.current.currentTime = 0;
      whyStudyAudioRef.current.play().then(() => {
        setIsPlayingWhyStudyAudio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Why study this chapter? In this chapter, we explore Diversity in the Living World. Just like the trees in this ancient verse selflessly support all other life by offering shade and food, every living organism is interconnected. Plants, animals, and humans depend on each other, forming a beautiful, cooperative web of life.",
          onEnd: () => setIsPlayingWhyStudyAudio(false),
          onError: () => setIsPlayingWhyStudyAudio(false)
        });
        setIsPlayingWhyStudyAudio(true);
      });
    }
  };

  // Toggle Page 2 Biosphere & Habitats lesson narration
  const toggleBioAudio = () => {
    if (isPlayingBioAudio) {
      pauseBioNarration();
      setIsPlayingBioAudio(false);
    } else {
      if (sloganAudioRef.current) sloganAudioRef.current.pause();
      if (meaningAudioRef.current) meaningAudioRef.current.pause();
      if (whyStudyAudioRef.current) whyStudyAudioRef.current.pause();
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);

      playBioNarration();
      setIsPlayingBioAudio(true);
    }
  };

  // Toggle Page 3 Adaptation & Survival lesson narration
  const toggleAdaptationAudio = () => {
    if (isPlayingAdaptationAudio) {
      stopNarration();
      setIsPlayingAdaptationAudio(false);
    } else {
      if (sloganAudioRef.current) sloganAudioRef.current.pause();
      if (meaningAudioRef.current) meaningAudioRef.current.pause();
      if (whyStudyAudioRef.current) whyStudyAudioRef.current.pause();
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);
      setIsPlayingBioAudio(false);

      speakNaturalIndianMale({
        text: "Desert Adaptations. What Is Adaptation? A feature or behaviour that helps a living thing survive in its habitat. The Ship of the Desert: A camel’s broad, padded feet help prevent it from sinking into sand. Its long eyelashes help protect its eyes from blowing dust. Saving Water: Camels conserve water by reducing water loss from their bodies. This helps them survive for long periods without drinking. Think: Why is saving water important in a desert?",
        onEnd: () => setIsPlayingAdaptationAudio(false),
        onError: () => setIsPlayingAdaptationAudio(false)
      });
      setIsPlayingAdaptationAudio(true);
    }
  };

  // Toggle Page 4 Botany & Plant Detective lesson narration
  const toggleBotanyAudio = () => {
    if (isPlayingBotanyAudio) {
      stopNarration();
      setIsPlayingBotanyAudio(false);
    } else {
      if (sloganAudioRef.current) sloganAudioRef.current.pause();
      if (meaningAudioRef.current) meaningAudioRef.current.pause();
      if (whyStudyAudioRef.current) whyStudyAudioRef.current.pause();
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);
      setIsPlayingBioAudio(false);
      setIsPlayingAdaptationAudio(false);

      speakNaturalIndianMale({
        text: "Herbs, Shrubs, Trees, and Climbers. Herbs like the tomato plant are usually small plants with soft green stems. Shrubs like the rose are woody plants with many branches growing near the ground. Trees like the mango grow tall with a thick woody trunk and branches higher above the ground. Climbers like the money plant have weak stems and need support to grow upwards. Think: Which plant in this picture needs support to climb?",
        onEnd: () => setIsPlayingBotanyAudio(false),
        onError: () => setIsPlayingBotanyAudio(false)
      });
      setIsPlayingBotanyAudio(true);
    }
  };

  // Toggle Page 5 Sacred Groves & Conservation lesson narration
  const toggleConservationAudio = () => {
    if (isPlayingConservationAudio) {
      stopNarration();
      setIsPlayingConservationAudio(false);
    } else {
      if (sloganAudioRef.current) sloganAudioRef.current.pause();
      if (meaningAudioRef.current) meaningAudioRef.current.pause();
      if (whyStudyAudioRef.current) whyStudyAudioRef.current.pause();
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);
      setIsPlayingBioAudio(false);
      setIsPlayingAdaptationAudio(false);
      setIsPlayingBotanyAudio(false);

      speakNaturalIndianMale({
        text: "Sacred Groves. Protected by Tradition: Sacred groves are patches of forest protected by local communities because of their cultural or religious importance. A Home for Wildlife: They shelter native wildlife and help protect valuable medicinal plants. Community Conservation: Local rules help prevent tree cutting and harm to animals, keeping these forests safe. Think: How does protecting a forest help the plants and animals living there?",
        onEnd: () => setIsPlayingConservationAudio(false),
        onError: () => setIsPlayingConservationAudio(false)
      });
      setIsPlayingConservationAudio(true);
    }
  };

  // Force-hide global floating music / volume button while slogan page is mounted
  useEffect(() => {
    const musicControls = document.getElementById('global-theme-music-controls');
    if (musicControls) {
      musicControls.style.setProperty('display', 'none', 'important');
    }
    return () => {
      if (musicControls) {
        musicControls.style.display = '';
      }
    };
  }, []);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
    } else if (onEnterLab) {
      onEnterLab();
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap');

        @keyframes biologyFadeIn {
          from { opacity: 0; transform: scale(0.992) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-bio-stage {
          animation: biologyFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes bioPopupEnter {
          0% {
            opacity: 0;
            transform: translate(-50%, -46%) scale(0.92);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50.5%) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .bio-popup-enter {
          animation: bioPopupEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bioPanelLeftEnter {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          65% {
            opacity: 1;
            transform: translateX(3px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .bio-panel-left-enter {
          animation: bioPanelLeftEnter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bioPopupLeftEnter {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(-28px) scale(0.95);
          }
          65% {
            opacity: 1;
            transform: translateY(-50%) translateX(4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
          }
        }
        .bio-popup-left-enter {
          animation: bioPopupLeftEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bioPillFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }
        .bio-pill-float {
          animation: bioPillFloat 3s ease-in-out infinite;
        }
        /* Force-hide global floating music / volume controls to prevent any corner overlap */
        #global-theme-music-controls {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          opacity: 0 !important;
        }
        .bio-nav-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          border: 1.8px solid rgba(255, 255, 255, 0.35);
          border-radius: 12px;
          padding: 9px 24px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15);
          position: relative;
          overflow: hidden;
          z-index: 10;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.65);
        }
        .bio-nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg);
          transition: 0.5s ease;
          pointer-events: none;
        }
        .bio-nav-btn:hover:not(:disabled)::before {
          left: 140%;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.14) 100%);
          color: #FFFDF0;
          border-color: #FBBF24;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 0 20px rgba(245, 158, 11, 0.5);
        }
        .bio-nav-btn:active:not(:disabled) {
          transform: translateY(1px) scale(0.99);
        }
        .bio-nav-btn:disabled {
          opacity: 0.28;
          cursor: not-allowed;
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.45);
          box-shadow: none;
        }
        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.8px solid #FDE68A;
          border-radius: 12px;
          padding: 9px 28px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(217, 119, 6, 0.5), 0 0 16px rgba(245, 158, 11, 0.4);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }
        .bio-cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: skewX(-20deg);
          transition: 0.5s ease;
          pointer-events: none;
        }
        .bio-cta-btn:hover::before {
          left: 140%;
        }
        .bio-cta-btn:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #B45309 100%);
          border-color: #FFFFFF;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(217, 119, 6, 0.7), 0 0 22px rgba(245, 158, 11, 0.6);
        }
        .bio-photo-box {
          flex: 0 0 65%;
          width: 65%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45), inset 0 0 0 2px rgba(212, 175, 55, 0.35);
          border: 2.5px solid #D4AF37;
          background: #071A11;
          position: relative;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-photo-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.55), 0 0 30px rgba(245, 158, 11, 0.35), inset 0 0 0 2.5px rgba(245, 158, 11, 0.6);
          border-color: #F59E0B;
        }
        .bio-shloka-box {
          flex: 0 0 clamp(380px, 35vw, 490px);
          width: clamp(380px, 35vw, 490px);
          max-height: 94%;
          align-self: center;
          background: rgba(15, 23, 42, 0.38);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1.5px 2px rgba(255, 255, 255, 0.50), 0 0 20px rgba(254, 240, 138, 0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: clamp(16px, 2.2vh, 26px) clamp(18px, 2vw, 26px);
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-shloka-box:hover {
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.48);
          border-color: rgba(254, 240, 138, 0.75);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55), inset 0 1.5px 2px rgba(255, 255, 255, 0.65), 0 0 25px rgba(245, 158, 11, 0.30);
        }
        .bio-glass-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0.08) 100%);
          pointer-events: none;
          opacity: 0.4;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          z-index: 5;
        }
        .bio-shloka-box:hover .bio-glass-glare,
        .bio-photo-box:hover .bio-glass-glare {
          opacity: 0.95;
        }
        .bio-quote-pill {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #FEF3C7;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 22px;
          padding: 6px 24px;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 16px;
          letterSpacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .bio-quote-pill:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.12) 100%);
          border-color: #F59E0B;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 16px rgba(245, 158, 11, 0.4);
        }
        .bio-voice-inline-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FDE68A;
          border-radius: 18px;
          padding: 5px 14px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 10px rgba(217, 119, 6, 0.4);
          transition: all 0.2s ease;
        }
        .bio-voice-inline-btn:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #B45309 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.55);
        }
        .bio-fact-column {
          flex: 1 1 32%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }
        .bio-fact-image-frame {
          width: 100%;
          flex: 1 1 56%;
          min-height: 150px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35), inset 0 0 0 2px rgba(212, 175, 55, 0.35);
          background: #0B3B24;
          border: 2px solid #D4AF37;
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-fact-image-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.45), 0 0 24px rgba(245, 158, 11, 0.35);
          border-color: #F59E0B;
        }
        .bio-fact-card {
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1.8px solid #D4AF37;
          border-radius: 20px;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          padding: clamp(12px, 1.6vh, 18px) clamp(16px, 1.8vw, 22px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 0 0 auto;
          text-align: justify;
          text-justify: inter-word;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-fact-card:hover {
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.55);
          border-color: #F59E0B;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 0 0 22px rgba(245, 158, 11, 0.35);
        }
      `}</style>

      {/* ============================================================ */}
      {/* FULLSCREEN LIVING ECOSYSTEM BACKGROUND IMAGE                 */}
      {/* ============================================================ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#04130B'
      }}>
        <img
          src={
            currentPage === 1
              ? cinematicLivingNatureImage
              : currentPage === 2
              ? biosphereHabitatsFullscreenImage
              : currentPage === 3
              ? desertCamelFullscreenImage
              : currentPage === 4
              ? botanyGreenhouseFullscreenImage
              : sacredGroveFullscreenImage
          }
          alt="Living Ecosystem - Diversity in the Living World"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: (currentPage === 1 || currentPage === 2) ? 'right center' : 'center center',
            display: 'block',
            imageRendering: 'high-quality',
            transform: 'translateZ(0) scale(1.01)',
            backfaceVisibility: 'hidden',
            filter: currentPage === 2
              ? 'contrast(0.80) saturate(0.85) brightness(1.03) blur(1.1px)'
              : 'contrast(0.88) saturate(0.92) brightness(1.04) blur(0.5px)'
          }}
        />
      </div>

      {/* Floating Fullscreen Control for Page 1 (Top-Right) */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          zIndex: 35
        }}>
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
              color: '#FEF3C7',
              border: '1.8px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F59E0B';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      )}

      {/* Page 1 Bottom-Left: Back Button */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '24px',
          zIndex: 35
        }}>
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBack}
            aria-label="Back to Cover"
            style={{
              padding: '7px 20px',
              fontSize: '14px',
              borderRadius: '10px'
            }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Page 1 Bottom-Right: Next Page Button */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '24px',
          zIndex: 35
        }}>
          <button
            type="button"
            className="bio-cta-btn"
            onClick={handleNext}
            aria-label="Next Page"
            style={{
              padding: '7px 22px',
              fontSize: '14px',
              borderRadius: '10px'
            }}
          >
            <span>Next Page</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}



      {/* ============================================================ */}
      {/* PAGE 1: FULLSCREEN LIVING ECOSYSTEM WITH SANSKRIT SLOGAN     */}
      {/* (NO POP-UP BOX, NO TITLE, INTERACTIVE AUDIO HOTSPOTS)        */}
      {/* ============================================================ */}
      {currentPage === 1 && (
        <div
          className="animate-bio-stage"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            flex: '1 1 auto',
            minHeight: 0,
            overflow: 'hidden',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* ============================================================ */}
      {/* PAGE 2: FULLSCREEN BIOSPHERE & HABITATS SCENERY WITH POPUP   */}
      {/* ============================================================ */}
      {currentPage === 2 && (
        <>
          {/* Floating Fullscreen Control for Page 2 (Top-Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            zIndex: 35
          }}>
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
                color: '#FEF3C7',
                border: '1.8px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Top Center Textbook Title in Complementary Golden Amber */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.35) 100%)',
              border: '1.5px solid #F59E0B',
              borderRadius: '20px',
              padding: '2px 14px',
              marginBottom: '2px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(4px)'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FEF3C7',
                fontFamily: '"Outfit", sans-serif'
              }}>
                CLASS 6 SCIENCE • CHAPTER 2
              </span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              fontFamily: '"Fraunces", Georgia, serif',
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(245, 158, 11, 0.45)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15
            }}>
              🌿 Section 2.1: Diversity in Plants and Animals 🌿
            </h1>
          </div>

          {/* Page 2 Bottom-Left: Previous Page Button (hidden when popup covers it) */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            zIndex: 35,
            opacity: showPage2Popup ? 0 : 1,
            pointerEvents: showPage2Popup ? 'none' : 'auto',
            transition: 'opacity 0.2s ease'
          }}>
            <button
              type="button"
              className="bio-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Page"
              style={{
                padding: '8px 22px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              ← Previous Page
            </button>
          </div>

          {/* Page 2 Bottom-Right: Next Page Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            zIndex: 35
          }}>
            <button
              type="button"
              className="bio-cta-btn"
              onClick={handleNext}
              aria-label="Next Page"
              style={{
                padding: '8px 24px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              <span>Next Page</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>

          {/* ATTRACTIVE POPUP MESSAGE: BIOSPHERE & HABITATS (TRANSPARENT GLASS PANEL POPUP WITH BLUR IN FONT AREA ONLY & COMPLEMENTARY COLORS) */}
          {showPage2Popup && (
            <div
              className="bio-panel-left-enter"
              style={{
                position: 'absolute',
                top: '16px',
                left: '18px',
                width: 'min(480px, 42vw)',
                maxHeight: 'calc(100vh - 36px)',
                zIndex: 40,
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                background: 'transparent',
                border: '1.8px solid rgba(110, 231, 183, 0.55)',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(16, 185, 129, 0.20)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Inner content wrapper with padding */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 'clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)',
                gap: 'clamp(8px, 1.2vh, 14px)',
                position: 'relative',
                zIndex: 5,
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>

                {/* Top bar: Pill Badge + Close Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(6, 28, 18, 0.70) 0%, rgba(2, 18, 10, 0.60) 100%)',
                    color: '#A7F3D0',
                    border: '1.5px solid rgba(110, 231, 183, 0.55)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                    padding: '5px 16px',
                    borderRadius: '22px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                  }}>
                    <span style={{ fontSize: '18px' }}>🌿</span>
                    <span style={{ color: '#34D399' }}>HABITATS</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowPage2Popup(false)}
                    aria-label="Close message and view full scenery"
                    title="View full scenery photo"
                    style={{
                      background: 'rgba(2, 18, 10, 0.65)',
                      border: '1.5px solid rgba(255, 255, 255, 0.30)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.95)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.85)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(2, 18, 10, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                  </button>
                </div>

                {/* Title Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <h2 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '20px',
                    margin: 0,
                    color: '#34D399',
                    lineHeight: 1.25,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(52, 211, 153, 0.65), 0 0 40px rgba(16, 185, 129, 0.25)'
                  }}>
                    HABITATS &amp; THE BIOSPHERE
                  </h2>
                </div>

                {/* Info Panel: Content Sections */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {/* Section 1: A Shared Home */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#6EE7B7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(110, 231, 183, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🏡</span>
                      <span>A Shared Home</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E2E8F0',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      A habitat is the natural home where living things get what they need to survive.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 2: Look Around */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#7DD3FC',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(125, 211, 252, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🦌</span>
                      <span>Look Around</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E0F2FE',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      The deer and peacock drink from the stream. Trees shelter the squirrel. Plants use sunlight to make food.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 3: The Biosphere */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🌍</span>
                      <span>The Biosphere</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FEF3C7',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      All parts of Earth where life exists—on land, in water, and in the air.
                    </div>
                  </div>

                  {/* Callout box: Think */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 100%)',
                    border: '1.5px solid rgba(253, 230, 138, 0.45)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                    <div style={{
                      fontSize: '18px',
                      color: '#FCD34D',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1.5,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                    }}>
                      Think: What might happen if the stream dried up?
                    </div>
                  </div>
                </div>

                {/* Read-along caption: real narration audio with word-by-word highlight */}
                {isPlayingBioAudio && (
                  <div style={{
                    background: 'rgba(2, 18, 10, 0.55)',
                    border: '1.5px solid rgba(110, 231, 183, 0.45)',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    marginTop: 'clamp(4px, 0.8vh, 8px)',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    fontFamily: '"Outfit", sans-serif',
                    color: 'rgba(254, 240, 138, 0.55)'
                  }}>
                    {sloganNarrationData.bio.words.map((w, i) => (
                      <span
                        key={i}
                        style={{
                          color: i === bioActiveWordIndex ? '#FFFFFF' : 'rgba(254, 240, 138, 0.55)',
                          background: i === bioActiveWordIndex ? 'rgba(16, 185, 129, 0.75)' : 'transparent',
                          borderRadius: i === bioActiveWordIndex ? '5px' : 0,
                          padding: i === bioActiveWordIndex ? '0 3px' : 0,
                          transition: 'background 0.12s ease, color 0.12s ease'
                        }}
                      >
                        {w.word}{i < sloganNarrationData.bio.words.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </div>
                )}

                {/* Note: Listen Explanation and View Full Scenery buttons removed as requested */}
              </div>
            </div>
          )}

          {/* Left-Side Center Arrow Trigger: Opens Page 2 Popup */}
          {!showPage2Popup && (
            <button
              type="button"
              onClick={() => setShowPage2Popup(true)}
              title="Open Biosphere & Habitats Notes"
              aria-label="Open Biosphere & Habitats Notes"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px 12px 14px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderLeft: 'none',
                borderRadius: '0 20px 20px 0',
                boxShadow: '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '15px',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217, 119, 6, 0.75), 0 2px 12px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)';
              }}
            >
              <BookOpen size={18} color="#FFFFFF" strokeWidth={2.5} />
              <ChevronRight size={22} color="#FFFFFF" strokeWidth={3} />
            </button>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 3: FULLSCREEN DESERT CAMEL SCENERY WITH POPUP           */}
      {/* ============================================================ */}
      {currentPage === 3 && (
        <>
          {/* Floating Fullscreen Control for Page 3 (Top-Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            zIndex: 35
          }}>
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
                color: '#FEF3C7',
                border: '1.8px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Top Title: Chapter 2 Section 2.2 matching textbook */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(2, 132, 199, 0.35) 100%)',
              border: '1.5px solid #38BDF8',
              borderRadius: '20px',
              padding: '2px 14px',
              marginBottom: '2px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(4px)'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#E0F2FE',
                fontFamily: '"Outfit", sans-serif'
              }}>
                CLASS 6 SCIENCE • CHAPTER 2
              </span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              fontFamily: '"Fraunces", Georgia, serif',
              background: 'linear-gradient(135deg, #BAE6FD 0%, #38BDF8 50%, #0284C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(56, 189, 248, 0.45)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15
            }}>
              🐫 Section 2.2: Habitats & Adaptations 🐫
            </h1>
          </div>

          {/* Page 3 Bottom-Left: Previous Page Button (hidden when popup covers it) */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            zIndex: 35,
            opacity: showPage3Popup ? 0 : 1,
            pointerEvents: showPage3Popup ? 'none' : 'auto',
            transition: 'opacity 0.2s ease'
          }}>
            <button
              type="button"
              className="bio-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Page"
              style={{
                padding: '8px 22px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              ← Previous Page
            </button>
          </div>

          {/* Page 3 Bottom-Right: Next Page Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            zIndex: 35
          }}>
            <button
              type="button"
              className="bio-cta-btn"
              onClick={handleNext}
              aria-label="Next Page"
              style={{
                padding: '8px 24px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              <span>Next Page</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>

          {/* ATTRACTIVE POPUP MESSAGE: DESERT ADAPTATIONS (TRANSPARENT GLASS PANEL POPUP WITH BLUR & COMPLEMENTARY COLORS) */}
          {showPage3Popup && (
            <div
              className="bio-panel-left-enter"
              style={{
                position: 'absolute',
                top: '16px',
                left: '18px',
                width: 'min(480px, 42vw)',
                maxHeight: 'calc(100vh - 36px)',
                zIndex: 40,
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                background: 'transparent',
                border: '1.8px solid rgba(251, 191, 36, 0.55)',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(245, 158, 11, 0.20)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Inner content wrapper with padding */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 'clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)',
                gap: 'clamp(8px, 1.2vh, 14px)',
                position: 'relative',
                zIndex: 5,
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>

                {/* Top bar: Pill Badge + Close Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(40, 24, 6, 0.70) 0%, rgba(20, 12, 3, 0.60) 100%)',
                    color: '#FDE68A',
                    border: '1.5px solid rgba(251, 191, 36, 0.55)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                    padding: '5px 16px',
                    borderRadius: '22px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                  }}>
                    <span style={{ fontSize: '18px' }}>🌵</span>
                    <span style={{ color: '#F59E0B' }}>ADAPTATION</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowPage3Popup(false)}
                    aria-label="Close message and view full scenery"
                    title="View full scenery photo"
                    style={{
                      background: 'rgba(28, 16, 4, 0.65)',
                      border: '1.5px solid rgba(255, 255, 255, 0.30)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.95)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.85)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(28, 16, 4, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                  </button>
                </div>

                {/* Title Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <h2 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '20px',
                    margin: 0,
                    color: '#F59E0B',
                    lineHeight: 1.25,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(245, 158, 11, 0.65), 0 0 40px rgba(217, 119, 6, 0.25)'
                  }}>
                    DESERT ADAPTATIONS
                  </h2>
                </div>

                {/* Info Panel: Content Sections */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {/* Section 1: What Is Adaptation? */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🦎</span>
                      <span>What Is Adaptation?</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FEF3C7',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      A feature or behaviour that helps a living thing survive in its habitat.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 2: The Ship of the Desert */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🐪</span>
                      <span>The Ship of the Desert</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FEF3C7',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      A camel’s broad, padded feet help prevent it from sinking into sand. Its long eyelashes help protect its eyes from blowing dust.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 3: Saving Water */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#22D3EE',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(34, 211, 238, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>💧</span>
                      <span>Saving Water</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E0F2FE',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Camels conserve water by reducing water loss from their bodies. This helps them survive for long periods without drinking.
                    </div>
                  </div>

                  {/* Callout box: Think */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 100%)',
                    border: '1.5px solid rgba(253, 230, 138, 0.45)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                    <div style={{
                      fontSize: '18px',
                      color: '#FCD34D',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1.5,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                    }}>
                      Think: Why is saving water important in a desert?
                    </div>
                  </div>
                </div>

                {/* Note: Listen Explanation and View Full Scenery buttons removed as requested */}
              </div>
            </div>
          )}

          {/* Left-Side Center Arrow Trigger: Opens Page 3 Popup */}
          {!showPage3Popup && (
            <button
              type="button"
              onClick={() => setShowPage3Popup(true)}
              title="Open Desert Habitats Notes"
              aria-label="Open Desert Habitats Notes"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px 12px 14px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderLeft: 'none',
                borderRadius: '0 20px 20px 0',
                boxShadow: '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '15px',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217, 119, 6, 0.75), 0 2px 12px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)';
              }}
            >
              <BookOpen size={18} color="#FFFFFF" strokeWidth={2.5} />
              <ChevronRight size={22} color="#FFFFFF" strokeWidth={3} />
            </button>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 4: FULLSCREEN PLANT DETECTIVE GREENHOUSE WITH POPUP     */}
      {/* ============================================================ */}
      {currentPage === 4 && (
        <>
          {/* Floating Fullscreen Control for Page 4 (Top-Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            zIndex: 35
          }}>
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
                color: '#FEF3C7',
                border: '1.8px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Top Title: Chapter 2 Section 2.3 matching textbook */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.35) 100%)',
              border: '1.5px solid #F59E0B',
              borderRadius: '20px',
              padding: '2px 14px',
              marginBottom: '2px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(4px)'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FEF3C7',
                fontFamily: '"Outfit", sans-serif'
              }}>
                CLASS 6 SCIENCE • CHAPTER 2
              </span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              fontFamily: '"Fraunces", Georgia, serif',
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(245, 158, 11, 0.45)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15
            }}>
              🌿 Section 2.3: Plants – Form and Function 🌿
            </h1>
          </div>

          {/* Page 4 Bottom-Left: Previous Page Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            zIndex: 35,
            opacity: showPage4Popup ? 0 : 1,
            pointerEvents: showPage4Popup ? 'none' : 'auto',
            transition: 'opacity 0.25s ease'
          }}>
            <button
              type="button"
              className="bio-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Page"
              style={{
                padding: '8px 22px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              ← Previous Page
            </button>
          </div>

          {/* Page 4 Bottom-Right: Next Page Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            zIndex: 35
          }}>
            <button
              type="button"
              className="bio-cta-btn"
              onClick={handleNext}
              aria-label="Next Page"
              style={{
                padding: '8px 24px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              <span>Next Page</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>

          {/* ATTRACTIVE POPUP MESSAGE: HERBS, SHRUBS, TREES & CLIMBERS */}
          {showPage4Popup && (
            <div
              className="bio-panel-left-enter"
              style={{
                position: 'absolute',
                top: '16px',
                left: '18px',
                width: 'min(480px, 42vw)',
                maxHeight: 'calc(100vh - 36px)',
                zIndex: 40,
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                background: 'transparent',
                border: '1.8px solid rgba(167, 243, 208, 0.55)',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(16, 185, 129, 0.20)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Inner content wrapper with padding */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 'clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)',
                gap: 'clamp(8px, 1.2vh, 14px)',
                position: 'relative',
                zIndex: 5,
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>

                {/* Top bar: Pill Badge + Close Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(6, 28, 18, 0.70) 0%, rgba(2, 18, 10, 0.60) 100%)',
                    color: '#A7F3D0',
                    border: '1.5px solid rgba(110, 231, 183, 0.55)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                    padding: '5px 16px',
                    borderRadius: '22px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                  }}>
                    <span style={{ fontSize: '18px' }}>🌱</span>
                    <span style={{ color: '#34D399' }}>PLANT GROUPS</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowPage4Popup(false)}
                    aria-label="Close message and view full scenery"
                    title="View full scenery photo"
                    style={{
                      background: 'rgba(2, 18, 10, 0.65)',
                      border: '1.5px solid rgba(255, 255, 255, 0.30)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.95)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.85)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(2, 18, 10, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                  </button>
                </div>

                {/* Title Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <h2 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '20px',
                    margin: 0,
                    color: '#34D399',
                    lineHeight: 1.25,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(52, 211, 153, 0.65), 0 0 40px rgba(16, 185, 129, 0.25)'
                  }}>
                    HERBS, SHRUBS, TREES &amp; CLIMBERS
                  </h2>
                </div>

                {/* Info Panel: Content Sections */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {/* Section 1: Herbs — Tomato */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#6EE7B7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(110, 231, 183, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🍅</span>
                      <span>Herbs — Tomato</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E2E8F0',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Usually small plants with soft, green stems.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 2: Shrubs — Rose */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FDA4AF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(253, 164, 175, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🌹</span>
                      <span>Shrubs — Rose</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FFE4E6',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Woody plants with many branches growing near the ground.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 3: Trees — Mango */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🥭</span>
                      <span>Trees — Mango</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FEF3C7',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Grow tall, with a thick, woody trunk and branches higher above the ground.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 4: Climbers — Money Plant */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#A78BFA',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(167, 139, 250, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🪴</span>
                      <span>Climbers — Money Plant</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#EDE9FE',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Have weak stems and need support to grow upwards.
                    </div>
                  </div>

                  {/* Callout box: Think */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.16) 100%)',
                    border: '1.5px solid rgba(167, 243, 208, 0.45)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                    <div style={{
                      fontSize: '18px',
                      color: '#FCD34D',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1.5,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                    }}>
                      Think: Which plant in this picture needs support to climb?
                    </div>
                  </div>
                </div>

                {/* Note: Listen Explanation and View Full Scenery buttons removed as requested */}
              </div>
            </div>
          )}

          {/* Left-Side Center Arrow Trigger: Opens Page 4 Popup */}
          {!showPage4Popup && (
            <button
              type="button"
              onClick={() => setShowPage4Popup(true)}
              title="Open Plant Classification Notes"
              aria-label="Open Plant Classification Notes"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px 12px 14px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderLeft: 'none',
                borderRadius: '0 20px 20px 0',
                boxShadow: '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '15px',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217, 119, 6, 0.75), 0 2px 12px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)';
              }}
            >
              <BookOpen size={18} color="#FFFFFF" strokeWidth={2.5} />
              <ChevronRight size={22} color="#FFFFFF" strokeWidth={3} />
            </button>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* PAGE 5: FULLSCREEN SACRED GROVES & CONSERVATION WITH POPUP   */}
      {/* ============================================================ */}
      {currentPage === 5 && (
        <>
          {/* Floating Fullscreen Control for Page 5 (Top-Right) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            zIndex: 35
          }}>
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
                color: '#FEF3C7',
                border: '1.8px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Top Title: Chapter 2 Section 2.4 matching textbook */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.35) 100%)',
              border: '1.5px solid #F59E0B',
              borderRadius: '20px',
              padding: '2px 14px',
              marginBottom: '2px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(4px)'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FEF3C7',
                fontFamily: '"Outfit", sans-serif'
              }}>
                CLASS 6 SCIENCE • CHAPTER 2
              </span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 900,
              fontFamily: '"Fraunces", Georgia, serif',
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(245, 158, 11, 0.45)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15
            }}>
              🕊️ Section 2.4: Biodiversity & Conservation 🕊️
            </h1>
          </div>

          {/* Page 5 Bottom-Left: Previous Page Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '24px',
            zIndex: 35,
            opacity: showPage5Popup ? 0 : 1,
            pointerEvents: showPage5Popup ? 'none' : 'auto',
            transition: 'opacity 0.25s ease'
          }}>
            <button
              type="button"
              className="bio-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Page"
              style={{
                padding: '8px 22px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              ← Previous Page
            </button>
          </div>

          {/* Page 5 Bottom-Right: Explore the Living World! CTA Button */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            zIndex: 35
          }}>
            <button
              type="button"
              className="bio-cta-btn"
              onClick={handleNext}
              aria-label="Explore Diversity in the Living World"
              style={{
                padding: '9px 26px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              <span>🌿 Explore the Living World!</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* ATTRACTIVE POPUP MESSAGE: SACRED GROVES */}
          {showPage5Popup && (
            <div
              className="bio-panel-left-enter"
              style={{
                position: 'absolute',
                top: '16px',
                left: '18px',
                width: 'min(480px, 42vw)',
                maxHeight: 'calc(100vh - 36px)',
                zIndex: 40,
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                background: 'transparent',
                border: '1.8px solid rgba(167, 243, 208, 0.55)',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 0 24px rgba(16, 185, 129, 0.20)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Inner content wrapper with padding */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 'clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)',
                gap: 'clamp(8px, 1.2vh, 14px)',
                position: 'relative',
                zIndex: 5,
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>

                {/* Top bar: Pill Badge + Close Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(24, 36, 14, 0.70) 0%, rgba(12, 22, 8, 0.60) 100%)',
                    color: '#A7F3D0',
                    border: '1.5px solid rgba(110, 231, 183, 0.55)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                    padding: '5px 16px',
                    borderRadius: '22px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                  }}>
                    <span style={{ fontSize: '18px' }}>🦚</span>
                    <span style={{ color: '#34D399' }}>CONSERVATION</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowPage5Popup(false)}
                    aria-label="Close message and view full scenery"
                    title="View full scenery photo"
                    style={{
                      background: 'rgba(12, 22, 8, 0.65)',
                      border: '1.5px solid rgba(255, 255, 255, 0.30)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.95)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.55)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.85)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(12, 22, 8, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.30)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                  </button>
                </div>

                {/* Title Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <h2 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '20px',
                    margin: 0,
                    color: '#34D399',
                    lineHeight: 1.25,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.98), 0 0 24px rgba(52, 211, 153, 0.65), 0 0 40px rgba(16, 185, 129, 0.25)'
                  }}>
                    SACRED GROVES
                  </h2>
                </div>

                {/* Info Panel: Content Sections */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {/* Section 1: Protected by Tradition */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#6EE7B7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(110, 231, 183, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🌳</span>
                      <span>Protected by Tradition</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E2E8F0',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Sacred groves are patches of forest protected by local communities because of their cultural or religious importance.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 2: A Home for Wildlife */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#7DD3FC',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(125, 211, 252, 0.4)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🌿</span>
                      <span>A Home for Wildlife</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#E0F2FE',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      They shelter native wildlife and help protect valuable medicinal plants.
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 100%)' }} />

                  {/* Section 3: Community Conservation */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Outfit", sans-serif',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98), 0 0 16px rgba(251, 191, 36, 0.45)'
                    }}>
                      <span style={{ fontSize: '18px' }}>🤝</span>
                      <span>Community Conservation</span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#FEF3C7',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.5)',
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: '"Inter", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      Local rules help prevent tree cutting and harm to animals, keeping these forests safe.
                    </div>
                  </div>

                  {/* Callout box: Think */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.16) 100%)',
                    border: '1.5px solid rgba(167, 243, 208, 0.45)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>💡</span>
                    <div style={{
                      fontSize: '18px',
                      color: '#FCD34D',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1.5,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.95), 0 0 12px rgba(252, 211, 77, 0.3)'
                    }}>
                      Think: How does protecting a forest help the plants and animals living there?
                    </div>
                  </div>
                </div>

                {/* Note: Listen Explanation and View Full Scenery buttons removed as requested */}
              </div>
            </div>
          )}

          {/* Left-Side Center Arrow Trigger: Opens Page 5 Popup */}
          {!showPage5Popup && (
            <button
              type="button"
              onClick={() => setShowPage5Popup(true)}
              title="Open Sacred Groves Notes"
              aria-label="Open Sacred Groves Notes"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px 12px 14px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderLeft: 'none',
                borderRadius: '0 20px 20px 0',
                boxShadow: '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 900,
                fontSize: '15px',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(217, 119, 6, 0.75), 0 2px 12px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 6, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)';
              }}
            >
              <BookOpen size={18} color="#FFFFFF" strokeWidth={2.5} />
              <ChevronRight size={22} color="#FFFFFF" strokeWidth={3} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
