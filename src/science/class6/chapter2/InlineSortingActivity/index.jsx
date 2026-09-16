import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle, ChevronRight, ChevronLeft, Award, Sparkles, Layers, ZoomIn, ZoomOut, X, Maximize2, Move, Volume2, VolumeX, Play, Pause, GitBranch, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../ThemeContext.jsx';

import ch2FlowersClassification8k from '../DiversityInTheLivingWorldNew/images/ch2_flowers_classification_8k.jpg';
import ch2StemsClassification8k from '../DiversityInTheLivingWorldNew/images/ch2_stems_classification_8k.jpg';
import ch2NutritionClassification8k from '../DiversityInTheLivingWorldNew/images/ch2_nutrition_classification_8k.jpg';
import ch2HabitatsClassification8k from '../DiversityInTheLivingWorldNew/images/ch2_habitats_classification_8k.jpg';

import specimenMango8k from '../DiversityInTheLivingWorldNew/images/specimen_mango_tree_8k.jpg';
import specimenRose8k from '../DiversityInTheLivingWorldNew/images/specimen_rose_plant_8k.jpg';
import specimenLotus8k from '../DiversityInTheLivingWorldNew/images/specimen_lotus_pond_8k.jpg';
import specimenFern8k from '../DiversityInTheLivingWorldNew/images/specimen_fern_plant_8k.jpg';
import specimenFish8k from '../DiversityInTheLivingWorldNew/images/specimen_freshwater_fish_8k.jpg';
import specimenCow8k from '../DiversityInTheLivingWorldNew/images/specimen_indian_cow_8k.jpg';

import natureAudio from '../DiversityInTheLivingWorldNew/NatureSoundEngine.js';

// ==========================================
// NATURAL WEBAUDIO SOUND SYNTHESIZER
// ==========================================
const playChimeSound = (type = 'success') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.32);
      });
    } else if (type === 'complete') {
      const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    }
  } catch (e) {
    // Audio context not allowed without interaction
  }
};

// ==========================================
// SLOGAN PAGE BOTANICAL DECORATIVE ELEMENTS
// ==========================================

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
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px' }}>
    <svg width="28" height="18" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#1B4D3E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#40916C" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#52B788" />
    </svg>
  </div>
);

const TopCornerFoliage = ({ side = 'left' }) => {
  // Prevent any right corner foliage from ever draping over or encroaching on the Reset button hitbox
  if (side === 'right') return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'clamp(140px, 14vw, 220px)',
      height: 'clamp(80px, 9vh, 120px)',
      pointerEvents: 'none',
      zIndex: 4,
      overflow: 'hidden',
      opacity: 0.85
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
        <path d="M22 34 C36 28, 50 36, 52 50 C38 54, 26 46, 22 34 Z" fill="#40916C" />
      </svg>
    </div>
  );
};

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

// Botanical Corner Leaf Flourish for the left side of the header (matching slogan page foliage)
const HeaderCornerLeaves = ({ side = 'left' }) => (
  <svg
    width="76"
    height="36"
    viewBox="0 0 110 52"
    fill="none"
    style={{
      flexShrink: 0,
      opacity: 0.92,
      pointerEvents: 'none',
      transform: side === 'right' ? 'scaleX(-1)' : 'none'
    }}
  >
    <path d="M0 6 C30 18, 65 22, 105 16" stroke="#0D3B24" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 14 C44 28, 68 38, 88 42" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 10 C26 2, 40 7, 44 17 C36 22, 24 19, 16 10 Z" fill="#2D6A4F" />
    <path d="M42 15 C56 9, 70 15, 74 26 C64 31, 50 26, 42 15 Z" fill="#14452F" />
    <path d="M70 17 C84 11, 96 17, 100 27 C90 32, 78 27, 70 17 Z" fill="#40916C" />
    <path d="M28 19 C40 15, 50 23, 51 32 C41 36, 31 30, 28 19 Z" fill="#52B788" />
    <path d="M54 26 C65 22, 75 29, 76 38 C66 42, 57 36, 54 26 Z" fill="#40916C" />
    <circle cx="26" cy="18" r="2.2" fill="#F59E0B" />
    <circle cx="68" cy="22" r="2.2" fill="#F59E0B" />
  </svg>
);

// Botanical Leaf Vine Flourish to cover space on left and right of the header (matching slogan page aesthetics)
const HeaderVineFlourish = ({ side = 'left', maxWidth = '160px' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth,
    height: '28px',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.90,
    pointerEvents: 'none',
    flexShrink: 1
  }}>
    <svg width="100%" height="100%" viewBox="0 0 170 32" preserveAspectRatio="xMidYMid meet" fill="none">
      <path
        d="M6 24 C45 18, 95 8, 164 16"
        stroke="#14452F"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M22 21 C26 13, 36 14, 38 20 C36 25, 28 27, 22 21 Z" fill="#2D6A4F" />
      <path d="M50 17 C54 9, 64 10, 67 16 C65 21, 57 23, 50 17 Z" fill="#10B981" />
      <path d="M78 14 C82 6, 92 7, 95 13 C93 18, 85 20, 78 14 Z" fill="#2D6A4F" />
      <path d="M108 13 C112 5, 122 6, 125 12 C123 17, 115 19, 108 13 Z" fill="#10B981" />
      <path d="M138 14 C142 7, 151 9, 154 15 C151 19, 144 20, 138 14 Z" fill="#047857" />

      <path d="M34 22 C37 28, 45 28, 47 24 C45 19, 38 18, 34 22 Z" fill="#40916C" />
      <path d="M64 18 C67 24, 75 24, 77 20 C75 15, 68 14, 64 18 Z" fill="#2D6A4F" />
      <path d="M94 15 C97 21, 105 21, 107 17 C105 12, 98 11, 94 15 Z" fill="#40916C" />
      <path d="M124 14 C127 20, 135 20, 137 16 C135 11, 128 10, 124 14 Z" fill="#10B981" />

      <circle cx="28" cy="14" r="2.5" fill="#F59E0B" />
      <circle cx="58" cy="11" r="2.5" fill="#F59E0B" />
      <circle cx="88" cy="8" r="2.5" fill="#F59E0B" />
      <circle cx="118" cy="7" r="2.5" fill="#F59E0B" />
      <circle cx="146" cy="9" r="2.2" fill="#F59E0B" />
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
        opacity: 0.95,
        pointerEvents: 'none',
        zIndex: 6
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

const CardLeafDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    width: '100%',
    margin: 'clamp(6px, 1vh, 10px) 0'
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

const BottomNatureSilhouettes = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '46px',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0.28,
    zIndex: 1
  }}>
    <svg width="100%" height="46" viewBox="0 0 1200 46" preserveAspectRatio="none" fill="none">
      <path d="M0 34 Q220 22 440 32 T880 26 T1200 32 L1200 46 L0 46 Z" fill="#52B788" />
      <path d="M0 38 Q320 28 640 36 T1200 30 L1200 46 L0 46 Z" fill="#2D6A4F" />
      <circle cx="110" cy="26" r="12" fill="#1B4D3E" />
      <circle cx="124" cy="22" r="9" fill="#1B4D3E" />
      <rect x="115" y="32" width="3" height="10" fill="#1B4D3E" />
      <path d="M210 18 Q215 14 220 18 Q225 14 230 18" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M245 14 Q249 10 253 14 Q257 10 261 14" stroke="#1B4D3E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M820 16 Q825 12 830 16 Q835 12 840 16" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="1020" cy="24" r="14" fill="#1B4D3E" />
      <circle cx="1036" cy="20" r="10" fill="#1B4D3E" />
      <rect x="1025" y="30" width="4" height="12" fill="#1B4D3E" />
    </svg>
  </div>
);

// =========================================================================
// 6 SPECIMENS (NCERT CLASS 6) - 8K ULTRA-DEFINITION DOCUMENTARY PHOTOGRAPHY
// =========================================================================
const SORT_ITEMS = [
  {
    id: 'mango',
    name: 'Mango Tree',
    scientific: 'Mangifera indica',
    kind: 'Plant 🌳',
    badge: 'SPECIMEN · TREE',
    soundAction: 'Breeze',
    image: specimenMango8k,
    alt: '8K National Geographic documentary photo of majestic Mango Tree with thick bark and golden fruit clusters',
    answers: {
      flowers: 'with_flowers',
      stem: 'hard_stem',
      eating: 'make_food',
      habitat: 'land'
    },
    adaptations: {
      flowers: {
        feature: 'Flowering Angiosperm',
        title: 'Floral Clusters & Drupe Seeds',
        observation: 'Produces dense panicles of sweet-scented floral blossoms that attract pollinators and mature into seed-bearing fruits.',
        rationale: 'Classification: Has true reproductive flowers (Angiosperm).',
        loupeTarget: { x: 55, y: 35 }
      },
      stem: {
        feature: 'Hard Woody Trunk',
        title: 'Lignified Bark & Secondary Xylem',
        observation: 'Thick, rugged outer bark and dense woody trunk give massive mechanical strength against fierce monsoon winds.',
        rationale: 'Classification: Hard, woody tree trunk with distinct rings.',
        loupeTarget: { x: 50, y: 75 }
      },
      eating: {
        feature: 'Solar Photosynthesis',
        title: 'Chlorophyll Food Synthesis',
        observation: 'Green canopy leaves harness sunlight, water from subterranean roots, and atmospheric CO2 to manufacture sugars internally.',
        rationale: 'Classification: Autotroph (synthesizes own food).',
        loupeTarget: { x: 45, y: 30 }
      },
      habitat: {
        feature: 'Terrestrial Deep Roots',
        title: 'Aerated Soil Anchoring',
        observation: 'Deep taproot system anchors deeply into terrestrial ground, absorbing aerated water and minerals from soil.',
        rationale: 'Classification: Terrestrial organism (Lives on land).',
        loupeTarget: { x: 50, y: 85 }
      }
    }
  },
  {
    id: 'rose',
    name: 'Rose Plant',
    scientific: 'Rosa indica',
    kind: 'Plant 🌺',
    badge: 'SPECIMEN · SHRUB',
    soundAction: 'Chime',
    image: specimenRose8k,
    alt: '8K National Geographic macro photo of blooming red Indian Rose bush with thorny stems and dewdrops',
    answers: {
      flowers: 'with_flowers',
      stem: 'hard_stem',
      eating: 'make_food',
      habitat: 'land'
    },
    adaptations: {
      flowers: {
        feature: 'Showy Petal Flower',
        title: 'Vibrant Floral Corolla',
        observation: 'Bright scarlet petals with central reproductive stamens and pistil, emitting sweet scent to guide honeybees.',
        rationale: 'Classification: Produces true insect-pollinated flowers.',
        loupeTarget: { x: 48, y: 45 }
      },
      stem: {
        feature: 'Thorny Woody Stems',
        title: 'Rigid Lignified Shrub Stem',
        observation: 'Tough, woody branches armed with protective prickles that defend vegetative tissue from herbivores.',
        rationale: 'Classification: Hard, woody shrub stem with bark.',
        loupeTarget: { x: 40, y: 75 }
      },
      eating: {
        feature: 'Solar Photosynthesis',
        title: 'Green Leaf Photosynthesis',
        observation: 'Pinnately compound serrated leaves contain chloroplasts generating glucose using daylight photons.',
        rationale: 'Classification: Autotroph (synthesizes own food).',
        loupeTarget: { x: 55, y: 40 }
      },
      habitat: {
        feature: 'Terrestrial Garden Soil',
        title: 'Well-Drained Soil Roots',
        observation: 'Fibrous root network thrives in aerated land gardens; submerged roots would rapidly rot without air.',
        rationale: 'Classification: Terrestrial organism (Lives on land).',
        loupeTarget: { x: 50, y: 85 }
      }
    }
  },
  {
    id: 'lotus',
    name: 'Lotus Plant',
    scientific: 'Nelumbo nucifera',
    kind: 'Plant 🪷',
    badge: 'SPECIMEN · AQUATIC',
    soundAction: 'Ripple',
    image: specimenLotus8k,
    alt: '8K National Geographic photo of sacred pink Lotus flower floating in freshwater pond with broad lily pads',
    answers: {
      flowers: 'with_flowers',
      stem: 'soft_stem',
      eating: 'make_food',
      habitat: 'water'
    },
    adaptations: {
      flowers: {
        feature: 'Solitary Water Flower',
        title: 'Emergent Aquatic Blossom',
        observation: 'Magnificent pink floral blossom rising above water surface with a cone-shaped receptacle holding seeds.',
        rationale: 'Classification: Produces emergent water flowers.',
        loupeTarget: { x: 52, y: 40 }
      },
      stem: {
        feature: 'Spongy Air Stem',
        title: 'Buoyant Aerenchyma Channels',
        observation: 'Soft, succulent, flexible underwater stalk filled with microscopic longitudinal air tubes that allow leaves to float.',
        rationale: 'Classification: Soft, flexible, non-woody aquatic stem.',
        loupeTarget: { x: 50, y: 70 }
      },
      eating: {
        feature: 'Pond Photosynthesis',
        title: 'Peltate Floating Leaves',
        observation: 'Broad circular leaves coated with water-repellent wax absorb unobstructed sunlight on the pond surface.',
        rationale: 'Classification: Autotroph (synthesizes own food).',
        loupeTarget: { x: 35, y: 60 }
      },
      habitat: {
        feature: 'Freshwater Aquatic Basin',
        title: 'Submerged Mud Rhizome',
        observation: 'Rhizomes root in the rich organic silt at the bottom of ponds, lakes, and freshwater wetlands.',
        rationale: 'Classification: Aquatic organism (Lives in water).',
        loupeTarget: { x: 50, y: 65 }
      }
    }
  },
  {
    id: 'fern',
    name: 'Fern Plant',
    scientific: 'Polypodiopsida',
    kind: 'Plant 🌿',
    badge: 'SPECIMEN · HERB',
    soundAction: 'Rustle',
    image: specimenFern8k,
    alt: '8K National Geographic macro photo of emerald green Fern fronds with brown spore sori on undersides',
    answers: {
      flowers: 'no_flowers',
      stem: 'soft_stem',
      eating: 'make_food',
      habitat: 'land'
    },
    adaptations: {
      flowers: {
        feature: 'Spore Sori Clusters',
        title: 'Non-Flowering Pteridophyte',
        observation: 'Underside of fronds features neat rows of circular brown spore capsules (sori); never bears floral petals or seeds.',
        rationale: 'Classification: Non-flowering organism (Spore-bearing).',
        loupeTarget: { x: 50, y: 45 }
      },
      stem: {
        feature: 'Soft Herbaceous Rachis',
        title: 'Flexible Fibrous Stipe',
        observation: 'Tender, green herbaceous stalk lacking secondary woody bark; bends softly without snapping.',
        rationale: 'Classification: Soft, flexible herbaceous stem.',
        loupeTarget: { x: 48, y: 70 }
      },
      eating: {
        feature: 'Shade Photosynthesis',
        title: 'Canopy Understory Sunlight',
        observation: 'Broad feathered fronds capture low-intensity diffused sunlight beneath forest trees to synthesize nutrients.',
        rationale: 'Classification: Autotroph (synthesizes own food).',
        loupeTarget: { x: 52, y: 40 }
      },
      habitat: {
        feature: 'Terrestrial Forest Floor',
        title: 'Humus Soil Rhizome',
        observation: 'Grows on shaded, damp terrestrial soil and forest humus; requires moist soil for swimming reproductive cells.',
        rationale: 'Classification: Terrestrial organism (Lives on land).',
        loupeTarget: { x: 50, y: 80 }
      }
    }
  },
  {
    id: 'fish',
    name: 'Freshwater Fish',
    scientific: 'Tor putitora',
    kind: 'Animal 🐟',
    badge: 'SPECIMEN · RIVER FISH',
    soundAction: 'Splash',
    image: specimenFish8k,
    alt: '8K National Geographic wildlife photo of Indian river fish with iridescent scales, fins, and breathing gills',
    answers: {
      flowers: 'no_flowers',
      stem: 'soft_stem',
      eating: 'eat_others',
      habitat: 'water'
    },
    adaptations: {
      flowers: {
        feature: 'Animal Kingdom',
        title: 'Vertebrate Reproduction',
        observation: 'Vertebrate animal reproducing through aquatic roe/eggs; completely lacks plant organs or flowers.',
        rationale: 'Classification: Non-flowering (Animal Kingdom).',
        loupeTarget: { x: 45, y: 45 }
      },
      stem: {
        feature: 'Flexible Muscular Body',
        title: 'Internal Endoskeleton',
        observation: 'Streamlined body supported by flexible cartilaginous/bony spine and muscles, having no plant stem or cellulose.',
        rationale: 'Classification: Soft animal body (No woody stem).',
        loupeTarget: { x: 50, y: 50 }
      },
      eating: {
        feature: 'Heterotroph Consumer',
        title: 'Aquatic Forager',
        observation: 'Cannot photosynthesize; feeds actively on aquatic insects, crustaceans, pond algae, and small detritus.',
        rationale: 'Classification: Heterotroph (Eats other organisms).',
        loupeTarget: { x: 35, y: 48 }
      },
      habitat: {
        feature: 'Freshwater Gills & Fins',
        title: 'Hydrodynamic Aquatic Anatomy',
        observation: 'Operculum covers vascular gills that extract dissolved oxygen from water; caudal fins provide hydrodynamic swimming propulsion.',
        rationale: 'Classification: Aquatic organism (Lives in water).',
        loupeTarget: { x: 50, y: 55 }
      }
    }
  },
  {
    id: 'cow',
    name: 'Indian Cow',
    scientific: 'Bos indicus',
    kind: 'Animal 🐄',
    badge: 'SPECIMEN · MAMMAL',
    soundAction: 'Moo',
    image: specimenCow8k,
    alt: '8K National Geographic documentary photo of gentle Indian Zebu cow grazing in sunlit green pasture meadow',
    answers: {
      flowers: 'no_flowers',
      stem: 'soft_stem',
      eating: 'eat_others',
      habitat: 'land'
    },
    adaptations: {
      flowers: {
        feature: 'Mammalian Animal',
        title: 'Placental Mammal',
        observation: 'Vertebrate warm-blooded mammal giving live birth; completely lacks floral structures or petals.',
        rationale: 'Classification: Non-flowering (Animal Kingdom).',
        loupeTarget: { x: 50, y: 45 }
      },
      stem: {
        feature: 'Quadruped Skeleton',
        title: 'Bony Vertebrate Skeleton',
        observation: 'Sturdy mammalian bony skeleton with articulated limbs and muscles; zero cellulose or woody plant stems.',
        rationale: 'Classification: Soft/muscular animal body (No woody stem).',
        loupeTarget: { x: 50, y: 80 }
      },
      eating: {
        feature: 'Herbivorous Grazing',
        title: 'Ruminant Digestion',
        observation: 'Consumes pasture grasses using flat grinding molars and a specialized 4-chambered stomach (rumen) to digest cellulose.',
        rationale: 'Classification: Heterotroph (Eats other living things).',
        loupeTarget: { x: 40, y: 65 }
      },
      habitat: {
        feature: 'Terrestrial Pasture Grass',
        title: 'Lungs & Cloven Hooves',
        observation: 'Breathes atmospheric oxygen with internal lungs and walks on solid terrestrial ground with resilient cloven hooves.',
        rationale: 'Classification: Terrestrial organism (Lives on land).',
        loupeTarget: { x: 50, y: 75 }
      }
    }
  }
];

// Helper for pedagogical coaching when an incorrect habitat or criterion bin is clicked
const getEducationalCoaching = (item, targetBinKey, criterionId) => {
  if (criterionId === 'habitat') {
    if (item.id === 'cow') return '🐄 Indian Cow is a terrestrial mammal adapted with lungs and hooves to graze on land meadows, not underwater!';
    if (item.id === 'fish') return '🐟 Freshwater Fish has gills & swimming fins; it needs water to breathe and cannot survive on dry land!';
    if (item.id === 'lotus') return '🪷 Lotus is an aquatic water plant with roots submerged in pond mud and buoyant floating leaves!';
    if (item.id === 'mango') return '🌳 Mango Tree is a terrestrial tree with roots requiring deep aerated soil on land!';
    if (item.id === 'rose') return '🌺 Rose Plant thrives in aerated land soil; it cannot survive submerged underwater!';
    if (item.id === 'fern') return '🌿 Fern grows in moist shaded terrestrial forest soil, not submerged in a pond!';
  } else if (criterionId === 'flowers') {
    if (item.id === 'fern') return '🌿 Ferns do not flower! They reproduce via microscopic brown spores (sori) under their fronds.';
    if (item.id === 'fish' || item.id === 'cow') return '🐾 Animals belong to the animal kingdom and never develop floral reproductive organs!';
    if (item.id === 'rose' || item.id === 'mango' || item.id === 'lotus') return '🌸 This plant develops flowers to attract pollinators and create seeds!';
  } else if (criterionId === 'stem') {
    if (item.id === 'mango' || item.id === 'rose') return '🪵 This plant grows a rigid, woody trunk or thorny woody shrub stem for mechanical strength!';
    if (item.id === 'lotus') return '🟢 Lotus has a soft, flexible, air-filled aquatic stem (aerenchyma) that allows it to float and sway with water currents!';
    if (item.id === 'fern') return '🟢 Fern has a soft, tender herbaceous rachis without hard wood or bark!';
    if (item.id === 'fish' || item.id === 'cow') return '🦴 Animals have muscular/skeletal bodies and do not develop plant stems or bark!';
  } else if (criterionId === 'eating') {
    if (item.kind.includes('Plant')) return '☀️ All green plants contain chlorophyll to make their own food using sunlight (Photosynthesis)!';
    if (item.kind.includes('Animal')) return '🥩 Animals cannot synthesize food from sunlight; they must feed on other organisms (Heterotrophs)!';
  }
  return `🤔 Try again! ${item.name} does not belong in this group.`;
};

// =========================================================================
// 4 SCIENTIFIC CRITERIA WITH IMMERSIVE 8K REALISTIC HABITAT BACKDROPS
// =========================================================================
const CRITERIA = [
  {
    id: 'flowers',
    label: 'Presence of flowers',
    shortLabel: 'Flowers',
    icon: '🌸',
    questionPrompt: 'Does this living thing produce flowers?',
    bins: [
      {
        key: 'with_flowers',
        label: '🌸 With Flowers',
        subtitle: 'Flowering Plants (Angiosperms)',
        bgImage: ch2FlowersClassification8k,
        bgPosition: '0% 50%',
        color: '#064E3B'
      },
      {
        key: 'no_flowers',
        label: '🌿 Without Flowers',
        subtitle: 'Spore Plants (Fern) & Animals',
        bgImage: ch2FlowersClassification8k,
        bgPosition: '100% 50%',
        color: '#78350F'
      }
    ]
  },
  {
    id: 'stem',
    label: 'Hard / soft stem',
    shortLabel: 'Stem Hardness',
    icon: '🪵',
    questionPrompt: 'Is its stem hard woody trunk or soft & flexible?',
    bins: [
      {
        key: 'hard_stem',
        label: '🪵 Hard Woody Trunk',
        subtitle: 'Trees & Woody Shrubs with Bark',
        bgImage: ch2StemsClassification8k,
        bgPosition: '0% 50%',
        color: '#78350F'
      },
      {
        key: 'soft_stem',
        label: '🟢 Soft / Flexible Stem',
        subtitle: 'Tender Herbs, Water Stems & Animals',
        bgImage: ch2StemsClassification8k,
        bgPosition: '100% 50%',
        color: '#064E3B'
      }
    ]
  },
  {
    id: 'eating',
    label: 'Food & Nutrition Habits',
    shortLabel: 'Food Habits',
    icon: '☀️',
    questionPrompt: 'Does it make food using sunlight or eat others?',
    bins: [
      {
        key: 'make_food',
        label: '☀️ Makes Own Food',
        subtitle: 'Green Plants (Photosynthesis)',
        bgImage: ch2NutritionClassification8k,
        bgPosition: '0% 50%',
        color: '#064E3B'
      },
      {
        key: 'eat_others',
        label: '🥩 Eats Other Organisms',
        subtitle: 'Animals (Heterotrophs)',
        bgImage: ch2NutritionClassification8k,
        bgPosition: '100% 50%',
        color: '#991B1B'
      }
    ]
  },
  {
    id: 'habitat',
    label: 'Place they live (Habitat)',
    shortLabel: 'Home Habitat',
    icon: '🏞️',
    questionPrompt: 'Does this living thing live on land or in water?',
    bins: [
      {
        key: 'land',
        label: '🏞️ Lives on Land',
        subtitle: 'Terrestrial Organisms',
        bgImage: ch2HabitatsClassification8k,
        bgPosition: '0% 50%',
        color: '#1E3A8A'
      },
      {
        key: 'water',
        label: '🌊 Lives in Water',
        subtitle: 'Freshwater Aquatic Organisms',
        bgImage: ch2HabitatsClassification8k,
        bgPosition: '100% 50%',
        color: '#064E3B'
      }
    ]
  }
];

// 4 8K Photographic Lesson Pages (Interactive 8K Guide for 6th Graders - Zero Vast Text)
const CRITERIA_PAGES = [
  {
    pageNumber: 1,
    criterionId: 'flowers',
    pageBadge: 'CRITERION 1 OF 4 · MORPHOLOGY',
    pageTitle: 'Criterion 1: Presence or Absence of Flowers',
    badge: '01 · MORPHOLOGY: FLOWERS',
    title: 'Flowering vs Non-Flowering',
    icon: '🌸',
    image: ch2FlowersClassification8k,
    alt: 'Realistic 8K National Geographic photography of vibrant red blooming rose alongside green woodland sword fern with circular spores',
    leftGroup: '🌸 Flowering Plants',
    rightGroup: '🌿 Non-Flowering Organisms',
    observations: [
      '🌸 Flowering: Petals attract pollinators; reproductive ovaries mature into fruits & seeds.',
      '🌿 Non-Flowering: Ferns reproduce via circular brown spore capsules (sori); animals never flower.'
    ],
    specimensFlowering: 'Rose Plant, Mango Tree, Lotus Plant',
    specimensNonFlowering: 'Fern Plant, Freshwater Fish, Indian Cow',
    quote: '“Flowers are specialized reproductive organs that define one of nature\'s greatest divisions.”',
    takeaway: 'Key Concept: Rose, Mango, and Lotus produce flowers; Fern, Fish, and Cow do not.'
  },
  {
    pageNumber: 2,
    criterionId: 'stem',
    pageBadge: 'CRITERION 2 OF 4 · STEM STRUCTURE',
    pageTitle: 'Criterion 2: Stem Hardness & Structure',
    badge: '02 · STEM HARDNESS & STRUCTURE',
    title: 'Hard Woody vs Soft Stems',
    icon: '🪵',
    image: ch2StemsClassification8k,
    alt: 'Realistic 8K National Geographic photography of thick rugged woody tree bark with lichen vs soft translucent succulent green herb stems with dewdrops',
    leftGroup: '🪵 Hard & Woody Stems',
    rightGroup: '🟢 Soft / Flexible Bodies',
    observations: [
      '🪵 Hard Bark: Rugged woody trunks support huge trees standing tall against strong winds.',
      '🟢 Soft Stems: Succulent herbs and aquatic lotus stems bend flexibly without snapping.'
    ],
    specimensFlowering: 'Mango Tree (Trunk), Rose Plant (Woody Shrub)',
    specimensNonFlowering: 'Lotus (Spongy), Fern (Soft), Fish & Cow',
    quote: '“Woody bark gives mechanical strength, while soft succulent stems provide flexibility.”',
    takeaway: 'Key Concept: Mango and Rose have hard woody stems; Lotus, Fern, Fish, and Cow do not.'
  },
  {
    pageNumber: 3,
    criterionId: 'eating',
    pageBadge: 'CRITERION 3 OF 4 · NUTRITION MODES',
    pageTitle: 'Criterion 3: Food & Nutrition Habits',
    badge: '03 · PHYSIOLOGY: NUTRITION',
    title: 'Autotrophs vs Heterotrophs',
    icon: '☀️',
    image: ch2NutritionClassification8k,
    alt: 'Realistic 8K National Geographic photography of emerald green leaves synthesizing food in radiant sunlight beams alongside a healthy brown cow grazing green pasture grass',
    leftGroup: '☀️ Make Own Food (Autotrophs)',
    rightGroup: '🥩 Eat Others (Heterotrophs)',
    observations: [
      '☀️ Photosynthesis: Green leaves harness sunbeams and chlorophyll to create plant food internally.',
      '🥩 Heterotrophs: Animals cannot make food from sun; cows graze meadow grass and fish eat prey.'
    ],
    specimensFlowering: 'All 4 Plants: Mango, Rose, Lotus, Fern',
    specimensNonFlowering: 'All Animals: Freshwater Fish, Indian Cow',
    quote: '“Green plants capture solar energy to feed the entire living biosphere.”',
    takeaway: 'Key Concept: All four plants synthesize food; Fish and Cow must eat other living things.'
  },
  {
    pageNumber: 4,
    criterionId: 'habitat',
    pageBadge: 'CRITERION 4 OF 4 · HABITATS & BIOMES',
    pageTitle: 'Criterion 4: Living Habitat (Land vs Water)',
    badge: '04 · ECOLOGY: HABITATS',
    title: 'Terrestrial vs Aquatic Habitats',
    icon: '🏞️',
    image: ch2HabitatsClassification8k,
    alt: 'Realistic 8K National Geographic photography of sunlit terrestrial grassland meadow with soil and roots meeting tranquil freshwater pond with pink lotus and swimming fish',
    leftGroup: '🏞️ Live on Land (Terrestrial)',
    rightGroup: '🌊 Live in Water (Aquatic)',
    observations: [
      '🏞️ Land Life: Deep soil roots and atmospheric lungs adapted for open air and sunlight.',
      '🌊 Water Life: Gills for breathing underwater, streamlined fins, and buoyant hollow stems.'
    ],
    specimensFlowering: 'Land: Mango Tree, Rose Plant, Fern, Cow',
    specimensNonFlowering: 'Water: Lotus Plant, Freshwater Fish',
    quote: '“Living organisms develop marvelous adaptations to flourish in their home habitat.”',
    takeaway: 'Key Concept: Mango, Rose, Fern, and Cow live on land; Lotus and Fish live in water.'
  }
];

export default function InlineSortingActivity({ onBackToDashboard, onNextActivity }) {
  const { theme } = useTheme();

  // Navigation:
  const [subPage, setSubPage] = useState(1);
  const [guidePage, setGuidePage] = useState(1);

  // Interactive 8K Image Zoom Modal
  const [activeZoomImage, setActiveZoomImage] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Interactive Field Specimen Loupe (Anatomy & Adaptation Inspector)
  const [activeLoupeSpecimen, setActiveLoupeSpecimen] = useState(null);

  // Living Ecosystem Simulation Mode
  const [isSimulatingEcosystem, setIsSimulatingEcosystem] = useState(false);

  // Interactive Branching Classification Tree Modal
  const [showClassificationTree, setShowClassificationTree] = useState(false);

  // Visual Reaction on Placed Card: { id, binKey, timestamp }
  const [lastPlacedReaction, setLastPlacedReaction] = useState(null);

  // Sorting Workbench State:
  const [selectedCriterionId, setSelectedCriterionId] = useState('flowers');
  const [selectedItem, setSelectedItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const [progress, setProgress] = useState({
    flowers: {},
    stem: {},
    eating: {},
    habitat: {}
  });

  const [completedCriteria, setCompletedCriteria] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');

  const currentCriterion = CRITERIA.find(c => c.id === selectedCriterionId) || CRITERIA[0];
  const currentCriterionProgress = progress[selectedCriterionId] || {};

  const isCurrentCriterionComplete = SORT_ITEMS.every(
    item => !!currentCriterionProgress[item.id]
  );

  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    setIsMuted(prev => {
      const nextVal = !prev;
      natureAudio.isMuted = nextVal;
      if (!nextVal) {
        natureAudio.playCowMoo();
      }
      return nextVal;
    });
  };

  // Living Ecosystem Simulation Sound & Animation Loop
  useEffect(() => {
    if (!isSimulatingEcosystem) return;

    natureAudio.playMangoTreeRustle();
    const t1 = setTimeout(() => natureAudio.playFishSplash(), 1200);
    const t2 = setTimeout(() => natureAudio.playCowMoo(), 2800);
    const t3 = setTimeout(() => natureAudio.playLotusDrop(), 4600);

    const ambientInterval = setInterval(() => {
      const ambientSounds = [
        () => natureAudio.playFishSplash(),
        () => natureAudio.playCowMoo(),
        () => natureAudio.playMangoTreeRustle(),
        () => natureAudio.playRoseGardenChime(),
        () => natureAudio.playLotusDrop()
      ];
      const randomPlay = ambientSounds[Math.floor(Math.random() * ambientSounds.length)];
      randomPlay();
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(ambientInterval);
    };
  }, [isSimulatingEcosystem]);

  useEffect(() => {
    if (isCurrentCriterionComplete && !completedCriteria.includes(selectedCriterionId)) {
      setCompletedCriteria(prev => [...prev, selectedCriterionId]);
      natureAudio.playCompletionFanfare();
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    }
  }, [isCurrentCriterionComplete, selectedCriterionId, completedCriteria]);

  const handleSelectCriterion = (critId) => {
    setSelectedCriterionId(critId);
    setSelectedItem(null);
    setStatusMsg('');
  };

  const handleItemClick = (item) => {
    natureAudio.playOrganismSound(item.id);
    if (currentCriterionProgress[item.id]) {
      setProgress(prev => {
        const nextCrit = { ...prev[selectedCriterionId] };
        delete nextCrit[item.id];
        return { ...prev, [selectedCriterionId]: nextCrit };
      });
      setSelectedItem(item);
      setStatusMsg(`Picked up ${item.name}. Drop or click its matching habitat tray below!`);
      return;
    }
    setSelectedItem(item);
    setStatusMsg(`Selected ${item.name}. Drag or click its matching habitat tray below!`);
  };

  const handleClassify = (item, targetBinKey) => {
    const correctBinKey = item.answers[selectedCriterionId];
    const targetBinObj = currentCriterion.bins.find(b => b.key === targetBinKey);

    if (targetBinKey === correctBinKey) {
      natureAudio.playOrganismSound(item.id);
      setLastPlacedReaction({ id: item.id, binKey: targetBinKey, time: Date.now() });
      setTimeout(() => {
        natureAudio.playSuccessChime();
      }, 320);
      setProgress(prev => ({
        ...prev,
        [selectedCriterionId]: {
          ...prev[selectedCriterionId],
          [item.id]: targetBinKey
        }
      }));
      setStatusMsg(`🎉 Correct! ${item.name} placed in "${targetBinObj?.label}"!`);
      setSelectedItem(null);
    } else {
      natureAudio.playTryAgain();
      const hint = getEducationalCoaching(item, targetBinKey, selectedCriterionId);
      setStatusMsg(hint);
    }
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    setSelectedItem(item);
  };

  const handleDrop = (e, targetBinKey) => {
    e.preventDefault();
    if (draggedItem) {
      handleClassify(draggedItem, targetBinKey);
      setDraggedItem(null);
    } else if (selectedItem) {
      handleClassify(selectedItem, targetBinKey);
    }
  };

  const handleReset = () => {
    setSelectedItem(null);
    setDraggedItem(null);
    setIsSimulatingEcosystem(false);
    setProgress({
      flowers: {},
      stem: {},
      eating: {},
      habitat: {}
    });
    setCompletedCriteria([]);
    setStatusMsg('');
  };

  const openZoomModal = (imgData) => {
    setActiveZoomImage(imgData);
    setZoomScale(1);
  };

  const closeZoomModal = () => {
    setActiveZoomImage(null);
    setZoomScale(1);
  };

  const currentGuide = CRITERIA_PAGES.find(p => p.pageNumber === guidePage) || CRITERIA_PAGES[0];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#EAE5D9',
      fontFamily: '"Outfit", "Plus Jakarta Sans", system-ui, sans-serif',
      color: '#0F3822',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        /* Slogan Page Custom Buttons */
        .bio-slogan-btn {
          background: linear-gradient(135deg, #14452F 0%, #064E3B 100%);
          color: #FFFFFF;
          border: 1.5px solid #10B981;
          border-radius: 12px;
          padding: 8px 22px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(20, 69, 47, 0.35);
        }
        .bio-slogan-btn:hover {
          background: linear-gradient(135deg, #1B5E3C 0%, #047857 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(20, 69, 47, 0.45);
        }
        .bio-amber-cta {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FDE68A;
          border-radius: 14px;
          padding: 10px 24px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.40);
        }
        .bio-amber-cta:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #B45309 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.50);
        }
        .bio-outline-btn {
          background: rgba(250, 248, 242, 0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          color: #14452F;
          border: 1.8px solid #14452F;
          border-radius: 12px;
          padding: 8px 18px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(20, 69, 47, 0.10);
        }
        .bio-outline-btn:hover {
          background: #F3EEE3;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(20, 69, 47, 0.16);
        }
        .bio-image-zoom-card {
          border-radius: 20px;
          overflow: hidden;
          background: #0B3B24;
          border: 2.5px solid #10B981;
          box-shadow: 0 14px 38px rgba(10, 59, 36, 0.22);
          position: relative;
          cursor: zoom-in;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .bio-image-zoom-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 42px rgba(10, 59, 36, 0.32);
        }
        .bio-image-zoom-card:hover .zoom-badge-pill {
          background: #D97706;
          color: #FFFFFF;
        }
        .zoom-badge-pill {
          position: absolute;
          bottom: 12px;
          right: 14px;
          background: rgba(20, 69, 47, 0.88);
          backdrop-filter: blur(6px);
          color: #D1FAE5;
          border: 1.5px solid #10B981;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          pointer-events: none;
        }
        
        /* 8K Photo Specimen Cards (Pure Visuals, No Dense Text) */
        .photo-specimen-tile {
          background: #FFFFFF;
          border: 2px solid #14452F;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 6px 16px rgba(20, 69, 47, 0.12);
          position: relative;
          user-select: none;
          box-sizing: border-box;
        }
        .photo-specimen-tile:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 26px rgba(20, 69, 47, 0.24);
          border-color: #10B981;
        }
        .photo-specimen-tile.is-selected {
          border: 3px solid #F59E0B;
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 12px 30px rgba(245, 158, 11, 0.40);
          animation: pulseSelectedTile 1.5s infinite ease-in-out;
        }
        @keyframes pulseSelectedTile {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.55); }
          50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }
        .photo-specimen-tile.is-sorted {
          opacity: 0.65;
          border-color: #059669;
          filter: grayscale(0.2);
        }
        .photo-specimen-tile.is-sorted:hover {
          opacity: 0.95;
          filter: none;
          transform: translateY(-2px);
        }

        /* Immersive 8K Habitat Diorama Collector Trays */
        .habitat-diorama-tray {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          border: 2.5px solid rgba(20, 69, 47, 0.5);
          box-shadow: 0 14px 34px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 250px;
          box-sizing: border-box;
          transition: all 0.22s ease;
        }
        .habitat-diorama-tray.is-active-target {
          border-color: #10B981;
          box-shadow: 0 16px 40px rgba(16, 185, 129, 0.35);
          transform: translateY(-3px);
        }
        .diorama-backdrop-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.70) contrast(1.1);
          transition: transform 0.3s ease;
        }
        .habitat-diorama-tray:hover .diorama-backdrop-img {
          transform: scale(1.03);
        }
        .diorama-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 30, 18, 0.65) 0%, rgba(7, 30, 18, 0.25) 45%, rgba(7, 30, 18, 0.75) 100%);
          pointer-events: none;
        }
        .diorama-dropzone {
          position: relative;
          z-index: 5;
          flex: 1;
          margin: 6px 10px 8px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(4px);
          border: 2px dashed rgba(255, 255, 255, 0.5);
          border-radius: 14px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          justifyContent: flex-start;
          transition: all 0.2s ease;
          overflow: hidden;
          min-height: 0;
        }
        .diorama-dropzone.can-drop {
          border-color: #A7F3D0;
          background: rgba(16, 185, 129, 0.22);
          box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.35);
        }

        /* Placed Organism Photo Tile inside Habitat (2x2 Grid Badge) */
        .placed-photo-card {
          background: rgba(250, 248, 242, 0.95);
          border: 2px solid #14452F;
          border-radius: 12px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          cursor: pointer;
          animation: popOrganism 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition: transform 0.18s ease, border-color 0.18s ease;
          min-width: 0;
          box-sizing: border-box;
          height: 48px;
        }
        .placed-photo-card:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: #D97706;
        }
        @keyframes popOrganism {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ============================================================ */
        /* LIVING ENVIRONMENTAL DIORAMA FX (WATER & TERRESTRIAL MEADOW) */
        /* ============================================================ */
        .aquatic-environmental-fx {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
        }
        .water-caustics-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(56, 189, 248, 0.22) 0%, transparent 65%),
                      radial-gradient(circle at 75% 70%, rgba(14, 165, 233, 0.25) 0%, transparent 60%);
          mix-blend-mode: screen;
          animation: causticShimmer 6s ease-in-out infinite alternate;
        }
        @keyframes causticShimmer {
          0% { transform: scale(1) translateY(0); opacity: 0.6; }
          100% { transform: scale(1.08) translateY(-6px); opacity: 0.95; }
        }
        .bubble-stream {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .bubble {
          position: absolute;
          bottom: -10px;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 50%;
          animation: riseBubble 4s ease-in infinite;
        }
        .bubble.b1 { left: 18%; width: 10px; height: 10px; animation-duration: 3.8s; animation-delay: 0.2s; }
        .bubble.b2 { left: 42%; width: 14px; height: 14px; animation-duration: 4.5s; animation-delay: 1.1s; }
        .bubble.b3 { left: 68%; width: 8px; height: 8px; animation-duration: 3.2s; animation-delay: 0.7s; }
        .bubble.b4 { left: 84%; width: 12px; height: 12px; animation-duration: 5.0s; animation-delay: 1.8s; }
        @keyframes riseBubble {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-240px) scale(1.2); opacity: 0; }
        }

        .terrestrial-environmental-fx {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
        }
        .sunbeam-sweep-layer {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: conic-gradient(from 45deg at 20% 0%, rgba(254, 240, 138, 0.22) 0deg, transparent 25deg, rgba(254, 240, 138, 0.18) 45deg, transparent 70deg);
          animation: sunbeamDrift 8s ease-in-out infinite alternate;
        }
        @keyframes sunbeamDrift {
          0% { transform: rotate(-4deg); opacity: 0.7; }
          100% { transform: rotate(4deg); opacity: 1; }
        }
        .leaf-particle-stream {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .leaf {
          position: absolute;
          top: -20px;
          font-size: 18px;
          animation: leafFall 6s linear infinite;
          opacity: 0.8;
        }
        .leaf.l1 { left: 22%; animation-duration: 5.5s; animation-delay: 0.4s; }
        .leaf.l2 { left: 55%; animation-duration: 6.8s; animation-delay: 1.5s; }
        .leaf.l3 { left: 78%; animation-duration: 4.8s; animation-delay: 0.9s; }
        @keyframes leafFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.85; }
          80% { opacity: 0.7; }
          100% { transform: translateY(260px) rotate(360deg); opacity: 0; }
        }

        /* Simulation Animated Actors */
        .simulated-swimming-fish {
          position: absolute;
          bottom: 18px;
          width: 58px;
          height: 36px;
          z-index: 15;
          pointer-events: none;
          animation: swimAcrossPond 9s ease-in-out infinite;
        }
        @keyframes swimAcrossPond {
          0% { left: 5%; transform: scaleX(1) translateY(0); }
          45% { left: 78%; transform: scaleX(1) translateY(-8px); }
          50% { left: 78%; transform: scaleX(-1) translateY(-8px); }
          95% { left: 5%; transform: scaleX(-1) translateY(0); }
          100% { left: 5%; transform: scaleX(1) translateY(0); }
        }

        .simulated-grazing-cow {
          position: absolute;
          bottom: 12px;
          right: 18px;
          z-index: 15;
          pointer-events: none;
          animation: cowGrazeBob 3.5s ease-in-out infinite;
        }
        @keyframes cowGrazeBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(4px) rotate(1.8deg); }
        }
      `}</style>

      {/* Top Hanging Corner Foliage (Left & Right) */}
      <TopCornerFoliage side="left" />
      <TopCornerFoliage side="right" />

      {/* Top Mountain Silhouette Backdrop */}
      <TopMountainBackdrop />

      {/* Bottom Nature Silhouette Panorama */}
      <BottomNatureSilhouettes />

      {/* ============================================================ */}
      {/* GLOBAL SLOGAN HEADER BAR (ALL FONTS STRICTLY 16px - 24px)   */}
      {/* ============================================================ */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'minmax(190px, 1fr) auto minmax(190px, 1fr)',
        alignItems: 'center',
        padding: 'clamp(6px, 0.9vh, 10px) clamp(14px, 1.8vw, 26px)',
        background: 'rgba(250, 248, 242, 0.55)',
        borderBottom: '2px solid #14452F',
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 50,
        flexShrink: 0
      }}>
        {/* Left: Slogan Page Botanical Corner Foliage & Vine Garland */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 'clamp(8px, 1.2vw, 16px)',
          paddingLeft: 'clamp(4px, 0.8vw, 14px)',
          zIndex: 60,
          minWidth: 0,
          pointerEvents: 'none'
        }}>
          <HeaderCornerLeaves side="left" />
          <HeaderVineFlourish side="left" maxWidth="clamp(100px, 12vw, 175px)" />
        </div>

        {/* Center Title with Badges, Vine Branches & Sprout */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60,
          flexShrink: 0
        }}>
          {/* Top Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
            <span style={{
              background: '#14452F',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '3px 16px',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
            }}>
              CLASS 6 • SCIENCE
            </span>
            <span style={{
              background: '#14452F',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '3px 16px',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
            }}>
              ACTIVITY 2.3 · CLASSIFICATION LAB
            </span>
          </div>

          {/* Title flanked by Vine Branches */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <TitleVineBranch side="left" />
            <h1 style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: '24px',
              margin: 0,
              color: '#0A3B24',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              textShadow: '0 1px 3px rgba(10, 59, 36, 0.10)'
            }}>
              Let Us Group Living Things
            </h1>
            <TitleVineBranch side="right" />
          </div>

          <TitleSprout />
        </div>

        {/* Right: Botanical Vine Garland & Reset Action (Completely separated with zero overlap) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 'clamp(10px, 1.4vw, 20px)',
          paddingRight: 'clamp(4px, 0.8vw, 14px)',
          zIndex: 80,
          minWidth: 0
        }}>
          {/* Slogan-style Botanical Vine Garland filling the right space without encroaching on button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            maxWidth: 'clamp(90px, 11vw, 150px)',
            pointerEvents: 'none'
          }}>
            <HeaderVineFlourish side="right" maxWidth="100%" />
          </div>

          {/* Subtle Vertical Botanical Separator */}
          <div style={{
            width: '1.5px',
            height: '24px',
            background: 'linear-gradient(180deg, transparent, rgba(20, 69, 47, 0.25), transparent)',
            flexShrink: 0
          }} />

          {/* Dedicated Safe Clear Zone for Reset Button */}
          <div style={{
            flexShrink: 0,
            position: 'relative',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center'
          }}>
            <button
              onClick={handleReset}
              className="bio-outline-btn"
              style={{
                background: 'rgba(250, 248, 242, 0.55)',
                border: '1.8px solid #14452F',
                borderRadius: '10px',
                padding: '6px 16px',
                fontSize: '16px',
                fontWeight: 800,
                color: '#14452F',
                boxShadow: '0 2px 8px rgba(20, 69, 47, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                whiteSpace: 'nowrap',
                position: 'relative',
                zIndex: 100
              }}
              title="Reset Activity"
            >
              <RefreshCw size={16} color="#14452F" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBPAGE 1: SINGLE IMAGE PER SINGLE PAGE (70% IMAGE & 30% CONTENT)         */}
      {/* ========================================================================= */}
      {subPage === 1 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 'clamp(6px, 1vh, 12px) clamp(14px, 1.8vw, 24px)',
          padding: 'clamp(10px, 1.3vh, 16px) clamp(16px, 1.8vw, 22px)',
          background: 'rgba(250, 248, 242, 0.55)',
          border: '2px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 14px 38px rgba(10, 59, 36, 0.18)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          gap: 'clamp(6px, 1vh, 10px)'
        }}>
          <CardCornerLeaves position="top-left" />
          <CardCornerLeaves position="top-right" />
          <CardCornerLeaves position="bottom-left" />
          <CardCornerLeaves position="bottom-right" />

          {/* 70% IMAGE ON LEFT & 30% CONTENT ON RIGHT (EXACT SCREEN ALLOCATION) */}
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 'clamp(10px, 1.2vw, 16px)',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}>
            {/* LEFT 70%: 8K COMPOSITE IMAGE */}
            <div
              className="bio-image-zoom-card"
              onClick={() => openZoomModal(currentGuide)}
              title="Click to Zoom Ultra-HD 8K view"
              style={{
                flex: '0 0 70%',
                width: '70%',
                height: '100%',
                position: 'relative'
              }}
            >
              <img
                src={currentGuide.image}
                alt={currentGuide.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                  imageRendering: 'high-quality'
                }}
              />

              <CardCornerLeaves position="top-right" />
              <CardCornerLeaves position="bottom-left" />

              <div 
                className="zoom-badge-pill" 
                style={{ 
                  zIndex: 5, 
                  padding: '8px 10px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} 
                title="Click to Zoom Ultra-HD (8K)"
              >
                <ZoomIn size={20} />
              </div>
            </div>

            {/* RIGHT 30%: ELEGANT BOTANICAL CONTENT CARD */}
            <div style={{
              flex: '0 0 30%',
              width: '30%',
              height: '100%',
              background: 'rgba(250, 248, 242, 0.55)',
              border: '2px solid rgba(20, 69, 47, 0.5)',
              borderRadius: '20px',
              boxShadow: '0 12px 36px rgba(15, 74, 50, 0.18), inset 0 0 0 1.5px rgba(45, 106, 79, 0.12)',
              padding: 'clamp(8px, 1.2vh, 12px) clamp(10px, 1.1vw, 14px)',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              gap: '6px'
            }}>
              <CardCornerLeaves position="top-left" />
              <CardCornerLeaves position="top-right" />
              <CardCornerLeaves position="bottom-left" />
              <CardCornerLeaves position="bottom-right" />

              {/* 1. Header (Category Badge + Title + Slim Botanical Leaf Line) */}
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', flexShrink: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#14452F', color: '#FFFFFF', borderRadius: '14px', padding: '3px 12px', fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)', marginBottom: '2px' }}>
                  <span>{currentGuide.icon}</span>
                  <span>{currentGuide.badge}</span>
                </div>

                <h2 style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#0A3B24',
                  margin: '1px 0',
                  lineHeight: 1.15
                }}>
                  {currentGuide.title}
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '2px 0' }}>
                  <div style={{ flex: 1, height: '1.2px', background: 'linear-gradient(90deg, transparent, #2D6A4F)' }} />
                  <span style={{ fontSize: '16px', color: '#14452F' }}>🌿</span>
                  <div style={{ flex: 1, height: '1.2px', background: 'linear-gradient(90deg, #2D6A4F, transparent)' }} />
                </div>
              </div>

              {/* 2. Contrast Groups (Flowering vs Non-Flowering) */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0
              }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1.8px solid #10B981',
                  borderRadius: '10px',
                  padding: '5px 8px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#065F46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {currentGuide.leftGroup}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', lineHeight: 1.25 }}>
                    {currentGuide.specimensFlowering}
                  </span>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  border: '1.8px solid #14452F',
                  borderRadius: '10px',
                  padding: '5px 8px',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.10)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#14452F', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {currentGuide.rightGroup}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', lineHeight: 1.25 }}>
                    {currentGuide.specimensNonFlowering}
                  </span>
                </div>
              </div>

              {/* 3. What Students Observe in 8K */}
              <div style={{
                background: 'rgba(20, 69, 47, 0.05)',
                border: '1.8px solid #14452F',
                borderRadius: '11px',
                padding: '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 900,
                  color: '#14452F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span>🔍</span>
                  <span>What Students Observe in 8K:</span>
                </div>
                {currentGuide.observations?.map((obs, idx) => (
                  <div key={idx} style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '16px',
                    color: '#14452F',
                    lineHeight: 1.3,
                    fontWeight: 700
                  }}>
                    {obs}
                  </div>
                ))}
              </div>

              {/* 4. Bottom Key Concept & Takeaway */}
              <div style={{
                background: 'rgba(250, 248, 242, 0.55)',
                border: '1.5px dashed #14452F',
                borderRadius: '10px',
                padding: '5px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0
              }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
                <div style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '16px',
                  color: '#14452F',
                  fontWeight: 800,
                  lineHeight: 1.25
                }}>
                  {currentGuide.takeaway || currentGuide.quote}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM NAVIGATION (BOTH BACK & NEXT BUTTONS) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(20, 69, 47, 0.22)',
            paddingTop: 'clamp(6px, 0.9vh, 10px)',
            marginTop: 'clamp(4px, 0.6vh, 8px)',
            flexShrink: 0
          }}>
            {/* Left: Back Button */}
            {guidePage > 1 ? (
              <button
                onClick={() => setGuidePage(p => p - 1)}
                className="bio-outline-btn"
                title="Previous Criterion"
              >
                <ChevronLeft size={18} />
                <span>◀ Previous Criterion</span>
              </button>
            ) : (
              <button
                onClick={() => onBackToDashboard ? onBackToDashboard(false) : null}
                className="bio-outline-btn"
                title="Back to Activity 2.2"
              >
                <ArrowLeft size={18} />
                <span>◀ Back to Activity 2.2</span>
              </button>
            )}

            {/* Right: Next Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {guidePage < 4 ? (
                <button
                  onClick={() => setGuidePage(p => p + 1)}
                  className="bio-amber-cta"
                  title="Next Criterion"
                >
                  <span>Next Criterion</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setSubPage(2)}
                  className="bio-amber-cta"
                  title="Proceed to Interactive Sorting Trays"
                >
                  <span>Proceed to Sorting Trays</span>
                  <ChevronRight size={18} />
                </button>
              )}

              {guidePage < 4 && (
                <button
                  onClick={() => setSubPage(2)}
                  className="bio-slogan-btn"
                  title="Jump directly to Interactive Sorting Workbench"
                >
                  <span>Interactive Sorting Trays</span>
                  <span>➔</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBPAGE 2: IMMERSIVE 8K NATURE DIORAMA WORKBENCH (PHOTO-FIRST, ZERO JARGON) */}
      {/* ========================================================================= */}
      {subPage === 2 && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(250, 248, 242, 0.55)',
          border: '2px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 16px 40px rgba(20, 69, 47, 0.14)',
          padding: 'clamp(8px, 1.2vh, 14px) clamp(16px, 1.8vw, 24px)',
          margin: 'clamp(6px, 1vh, 12px) clamp(14px, 1.8vw, 24px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          gap: 'clamp(6px, 1vh, 10px)',
          position: 'relative',
          zIndex: 10
        }}>
          <CardCornerLeaves position="top-left" />
          <CardCornerLeaves position="top-right" />

          {/* Top Bar: Back to 8K Guide + Criteria Selector Tabs + Progress */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            borderBottom: '2px solid rgba(20, 69, 47, 0.22)', 
            paddingBottom: 'clamp(4px, 0.7vh, 8px)',
            flexShrink: 0
          }}>
            <button
              onClick={() => setSubPage(1)}
              className="bio-outline-btn"
              title="Return to the 8K Photographic Guide"
            >
              <ArrowLeft size={16} color="#14452F" />
              <span>Back to 8K Guide</span>
            </button>

            {/* 4 Criteria Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(20, 69, 47, 0.08)', padding: '4px', borderRadius: '14px', border: '1.8px solid #14452F' }}>
              {CRITERIA.map(crit => {
                const isActive = selectedCriterionId === crit.id;
                const isDone = completedCriteria.includes(crit.id);
                return (
                  <button
                    key={crit.id}
                    onClick={() => handleSelectCriterion(crit.id)}
                    style={{
                      padding: 'clamp(6px, 0.8vh, 8px) clamp(14px, 1.4vw, 18px)',
                      borderRadius: '10px',
                      border: isActive ? '2px solid #10B981' : isDone ? '1.5px solid #14452F' : '1px solid transparent',
                      background: isActive ? '#14452F' : isDone ? '#D1FAE5' : 'rgba(250, 248, 242, 0.55)',
                      color: isActive ? '#FFFFFF' : '#14452F',
                      fontWeight: 900,
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 0.18s ease',
                      boxShadow: isActive ? '0 3px 10px rgba(20, 69, 47, 0.35)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{crit.icon}</span>
                    <span>{crit.shortLabel}</span>
                    {isDone && <span style={{ color: isActive ? '#A7F3D0' : '#059669', fontWeight: 900 }}>✓</span>}
                  </button>
                );
              })}
            </div>

            <div style={{
              background: 'rgba(250, 248, 242, 0.55)',
              border: '1.8px solid #14452F',
              borderRadius: '12px',
              padding: '5px 16px',
              fontSize: '16px',
              color: '#14452F',
              fontWeight: 900,
              boxShadow: '0 2px 8px rgba(20, 69, 47, 0.08)'
            }}>
              {SORT_ITEMS.filter(i => !!currentCriterionProgress[i.id]).length} / 6 Placed into Trays
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: RACK OF ALL 6 SPECIMENS (LARGE PHOTO TILES - ZERO TEXT CLUTTER)   */}
          {/* ========================================================================= */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '2px 10px',
                  fontSize: '16px',
                  fontWeight: 900
                }}>
                  STEP 1
                </span>
                <span style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#14452F'
                }}>
                  Select an Organism Photo: <span style={{ color: '#D97706' }}>"{currentCriterion.questionPrompt}"</span>
                </span>
              </div>

              <span style={{ fontSize: '16px', fontWeight: 800, color: '#14452F' }}>
                {selectedItem ? `Selected: ${selectedItem.name} 👉 Click a tray below!` : 'Click any specimen card to sort'}
              </span>
            </div>

            {/* 6 Large Photo Tiles Side-by-Side */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', 
              gap: 'clamp(8px, 1vw, 14px)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {SORT_ITEMS.map(item => {
                const isSorted = !!currentCriterionProgress[item.id];
                const isSelected = selectedItem?.id === item.id;
                const sortedBinKey = currentCriterionProgress[item.id];
                const sortedBinObj = sortedBinKey ? currentCriterion.bins.find(b => b.key === sortedBinKey) : null;

                return (
                  <div
                    key={item.id}
                    draggable={!isSorted}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => handleItemClick(item)}
                    className={`photo-specimen-tile ${isSelected ? 'is-selected' : ''} ${isSorted ? 'is-sorted' : ''}`}
                    style={{
                      height: 'clamp(120px, 16vh, 142px)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    title={isSorted ? `${item.name} is placed! Click to pick up` : `Click to select ${item.name}`}
                  >
                    {/* Big Realistic 8K Photo (Fills 75% of Tile) */}
                    <div style={{
                      flex: 1,
                      width: '100%',
                      background: '#0F291C',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        draggable={false}
                      />

                      {/* 8K Macro Zoom Button on Top-Left */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openZoomModal({
                            badge: item.badge || '8K SPECIMEN',
                            title: `${item.name} (${item.scientific})`,
                            image: item.image,
                            alt: item.alt
                          });
                        }}
                        title={`Zoom ${item.name} in 8K Ultra-HD`}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: 'rgba(10, 35, 20, 0.85)',
                          backdropFilter: 'blur(4px)',
                          border: '1.2px solid #10B981',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          padding: '2px 7px',
                          fontSize: '16px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          zIndex: 6,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        🔍 8K
                      </button>

                      {/* Anatomical Loupe Inspector Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLoupeSpecimen(item);
                        }}
                        title={`Inspect anatomical adaptation of ${item.name}`}
                        style={{
                          position: 'absolute',
                          top: '32px',
                          left: '4px',
                          background: 'rgba(20, 69, 47, 0.90)',
                          backdropFilter: 'blur(4px)',
                          border: '1.2px solid #F59E0B',
                          color: '#FEF3C7',
                          borderRadius: '8px',
                          padding: '2px 7px',
                          fontSize: '16px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          zIndex: 6,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        🔬 Loupe
                      </button>

                      {/* Realistic Sound Button on Bottom-Right */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          natureAudio.playOrganismSound(item.id);
                        }}
                        title={`Listen to realistic sound of ${item.name}`}
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          right: '4px',
                          background: 'rgba(245, 158, 11, 0.95)',
                          border: '1.2px solid #FEF3C7',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          padding: '2px 8px',
                          fontSize: '16px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          zIndex: 8,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        🔊 {item.soundAction}
                      </button>

                      {/* Kind Pill (Top-Right) */}
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(20, 69, 47, 0.90)',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '2px 8px',
                        fontSize: '16px',
                        fontWeight: 900,
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                      }}>
                        {item.kind.includes('Plant') ? 'Plant' : 'Animal'}
                      </span>

                      {/* Placed Status Checkmark */}
                      {isSorted && (
                        <div style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          background: '#059669',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: 900,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                          zIndex: 7
                        }}>
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Specimen Name Banner */}
                    <div style={{
                      background: isSelected ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                      color: isSelected ? '#FFFFFF' : '#14452F',
                      padding: '4px 6px',
                      textAlign: 'center',
                      borderTop: '1.5px solid rgba(20, 69, 47, 0.2)',
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: '17px',
                      fontWeight: 900,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 2: IMMERSIVE 8K HABITAT DIORAMA TRAYS (REALISTIC NATURE LANDSCAPES)  */}
          {/* ========================================================================= */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px',
            flex: 1,
            minHeight: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '2px 10px',
                  fontSize: '16px',
                  fontWeight: 900
                }}>
                  STEP 2
                </span>
                <span style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#14452F'
                }}>
                  Place Organisms into their 8K Habitat Diorama:
                </span>
              </div>

              {/* Action Toolbar: Simulation Mode & Classification Key */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Simulation Mode Button */}
                <button
                  onClick={() => setIsSimulatingEcosystem(s => !s)}
                  title={isSimulatingEcosystem ? 'Pause live nature simulation' : 'Run living ecosystem simulation with active animated organisms & audio'}
                  style={{
                    background: isSimulatingEcosystem ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'rgba(250, 248, 242, 0.55)',
                    color: isSimulatingEcosystem ? '#FFFFFF' : '#14452F',
                    border: '1.8px solid #10B981',
                    borderRadius: '10px',
                    padding: '3px 12px',
                    fontSize: '16px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isSimulatingEcosystem ? '0 0 16px rgba(16, 185, 129, 0.4)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSimulatingEcosystem ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isSimulatingEcosystem ? 'Simulating Ecosystem 🌿' : '▶ Run Living Ecosystem'}</span>
                </button>

                {/* Classification Key Tree Button */}
                <button
                  onClick={() => setShowClassificationTree(true)}
                  title="Open interactive NCERT branching classification tree"
                  style={{
                    background: 'rgba(250, 248, 242, 0.55)',
                    color: '#14452F',
                    border: '1.8px solid #14452F',
                    borderRadius: '10px',
                    padding: '3px 12px',
                    fontSize: '16px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <GitBranch size={16} color="#14452F" />
                  <span>Branching Key</span>
                </button>

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleSound}
                  title={isMuted ? 'Unmute nature sounds' : 'Mute nature sounds'}
                  style={{
                    background: 'rgba(250, 248, 242, 0.55)',
                    border: '1.8px solid #14452F',
                    borderRadius: '10px',
                    padding: '3px 10px',
                    fontSize: '16px',
                    color: '#14452F',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {isMuted ? <VolumeX size={16} color="#991B1B" /> : <Volume2 size={16} color="#14452F" />}
                </button>
              </div>
            </div>
            
            {/* The 2 Large Scenic 8K Habitat Diorama Trays */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 'clamp(12px, 1.8vw, 20px)',
              flex: 1,
              minHeight: 0
            }}>
              {currentCriterion.bins.map(bin => {
                const itemsInBin = SORT_ITEMS.filter(
                  item => currentCriterionProgress[item.id] === bin.key
                );
                const canDrop = !!selectedItem;
                const isAquatic = bin.key.includes('water');

                return (
                  <div
                    key={bin.key}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, bin.key)}
                    onClick={() => selectedItem && handleClassify(selectedItem, bin.key)}
                    className={`habitat-diorama-tray ${canDrop ? 'is-active-target' : ''}`}
                    style={{
                      cursor: canDrop ? 'pointer' : 'default'
                    }}
                  >
                    {/* Realistic 8K Nature Backdrop Image */}
                    <img
                      src={bin.bgImage}
                      alt={bin.label}
                      className="diorama-backdrop-img"
                      style={{ objectPosition: bin.bgPosition }}
                    />

                    {/* Vignette Overlay */}
                    <div className="diorama-overlay" />

                    {/* Procedural Living Environmental FX */}
                    {isAquatic ? (
                      <div className="aquatic-environmental-fx">
                        <div className="water-caustics-layer" />
                        <div className="bubble-stream">
                          <span className="bubble b1" />
                          <span className="bubble b2" />
                          <span className="bubble b3" />
                          <span className="bubble b4" />
                        </div>
                      </div>
                    ) : (
                      <div className="terrestrial-environmental-fx">
                        <div className="sunbeam-sweep-layer" />
                        <div className="leaf-particle-stream">
                          <span className="leaf l1">🍃</span>
                          <span className="leaf l2">✨</span>
                          <span className="leaf l3">🍂</span>
                        </div>
                      </div>
                    )}

                    {/* Active Simulation Animated Actors */}
                    {isSimulatingEcosystem && isAquatic && itemsInBin.some(i => i.id === 'fish') && (
                      <div className="simulated-swimming-fish" title="Freshwater fish swimming with water wake ripples">
                        <img
                          src={specimenFish8k}
                          alt="Swimming Fish"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1.5px solid #38BDF8',
                            boxShadow: '0 4px 12px rgba(56, 189, 248, 0.45)'
                          }}
                        />
                      </div>
                    )}

                    {isSimulatingEcosystem && !isAquatic && itemsInBin.some(i => i.id === 'cow') && (
                      <div className="simulated-grazing-cow" title="Indian Cow grazing in meadow">
                        <img
                          src={specimenCow8k}
                          alt="Grazing Cow"
                          style={{
                            width: '54px',
                            height: '42px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1.5px solid #F59E0B',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.45)'
                          }}
                        />
                      </div>
                    )}

                    {/* Top Floating Badge with Tray Label */}
                    <div style={{
                      position: 'relative',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 14px',
                      background: 'rgba(10, 35, 20, 0.88)',
                      backdropFilter: 'blur(8px)',
                      borderBottom: '1.5px solid rgba(255, 255, 255, 0.25)',
                      flexShrink: 0,
                      gap: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
                        <span style={{
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          color: '#FFFFFF',
                          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                          whiteSpace: 'nowrap'
                        }}>
                          {bin.label}
                        </span>
                        <span style={{
                          color: '#A7F3D0',
                          fontSize: '16px',
                          fontWeight: 800,
                          opacity: 0.95,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          • {bin.subtitle}
                        </span>
                      </div>

                      <span style={{
                        background: 'rgba(250, 248, 242, 0.55)',
                        color: '#14452F',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        fontSize: '16px',
                        fontWeight: 900,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {itemsInBin.length} Organisms
                      </span>
                    </div>

                    {/* Habitat Basin Dropzone with Placed Organism Cards in 2x2 Grid */}
                    <div className={`diorama-dropzone ${canDrop ? 'can-drop' : ''}`}>
                      {itemsInBin.length === 0 ? (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '16px',
                          color: '#FFFFFF',
                          textShadow: '0 2px 8px rgba(0,0,0,0.85)',
                          flex: 1
                        }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: canDrop ? 'rgba(16, 185, 129, 0.40)' : 'rgba(255, 255, 255, 0.20)',
                            border: `2px solid ${canDrop ? '#10B981' : 'rgba(255, 255, 255, 0.5)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            boxShadow: canDrop ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none'
                          }}>
                            {canDrop ? '📥' : isAquatic ? '🌊' : '🌿'}
                          </div>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: 900,
                            textAlign: 'center',
                            background: 'rgba(7, 30, 18, 0.72)',
                            backdropFilter: 'blur(6px)',
                            padding: '4px 14px',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.25)',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                          }}>
                            {canDrop
                              ? `Click to place "${selectedItem.name}" in this habitat!`
                              : 'Empty sanctuary — select or drag a photo from rack'}
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                          gap: '6px',
                          width: '100%',
                          alignContent: 'start',
                          boxSizing: 'border-box'
                        }}>
                          {itemsInBin.map(i => {
                            const adaptObj = i.adaptations?.[selectedCriterionId];
                            return (
                              <div
                                key={i.id}
                                className="placed-photo-card"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleItemClick(i);
                                }}
                                title={`Click to pick up ${i.name}, or click 🔍 to inspect adaptation`}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
                                  <img
                                    src={i.image}
                                    alt={i.name}
                                    style={{
                                      width: '38px',
                                      height: '38px',
                                      borderRadius: '8px',
                                      objectFit: 'cover',
                                      border: '1.5px solid #14452F',
                                      flexShrink: 0
                                    }}
                                  />
                                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                                    <span style={{
                                      fontFamily: '"Fraunces", Georgia, serif',
                                      fontSize: '16px',
                                      fontWeight: 900,
                                      color: '#14452F',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      {i.name}
                                    </span>
                                    <span style={{
                                      fontSize: '16px',
                                      color: '#059669',
                                      fontWeight: 800,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      ✓ {adaptObj?.feature?.split(' ')[0] || 'Placed'}
                                    </span>
                                  </div>
                                </div>

                                {/* Micro Action Buttons */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                                  {/* Field Loupe Inspector Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLoupeSpecimen(i);
                                    }}
                                    title={`Inspect anatomical adaptation of ${i.name}`}
                                    style={{
                                      background: '#14452F',
                                      border: '1px solid #10B981',
                                      color: '#FFFFFF',
                                      borderRadius: '6px',
                                      padding: '2px 5px',
                                      fontSize: '16px',
                                      fontWeight: 900,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    🔍
                                  </button>

                                  {/* Sound Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      natureAudio.playOrganismSound(i.id);
                                    }}
                                    title={`Hear sound of ${i.name}`}
                                    style={{
                                      background: 'rgba(245, 158, 11, 0.18)',
                                      border: '1px solid #D97706',
                                      color: '#B45309',
                                      borderRadius: '6px',
                                      padding: '2px 5px',
                                      fontSize: '16px',
                                      fontWeight: 900,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    🔊
                                  </button>

                                  {/* Remove Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleItemClick(i);
                                    }}
                                    title={`Pick up or remove ${i.name}`}
                                    style={{
                                      background: 'rgba(20, 69, 47, 0.08)',
                                      border: '1px solid rgba(20, 69, 47, 0.25)',
                                      color: '#14452F',
                                      borderRadius: '6px',
                                      padding: '2px 5px',
                                      fontSize: '16px',
                                      fontWeight: 900,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM CONTROLS & STATUS BAR (BACK & NEXT NAV)                            */}
          {/* ========================================================================= */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '12px', 
            paddingTop: 'clamp(4px, 0.6vh, 8px)',
            borderTop: '2px solid rgba(20, 69, 47, 0.22)',
            flexShrink: 0
          }}>
            {/* Left: Back Button */}
            <button
              onClick={() => setSubPage(1)}
              className="bio-outline-btn"
              title="Return to the 8K Photographic Guide"
            >
              <ArrowLeft size={16} color="#14452F" />
              <span>◀ Back to 8K Guide</span>
            </button>

            {/* Status Toast */}
            <div style={{
              flex: 1,
              fontSize: '16px',
              fontWeight: 900,
              padding: '6px 14px',
              borderRadius: '10px',
              textAlign: 'center',
              background: statusMsg.startsWith('🎉') 
                ? 'rgba(16, 185, 129, 0.18)' 
                : statusMsg.startsWith('🤔') 
                  ? 'rgba(239, 68, 68, 0.18)' 
                  : 'rgba(20, 69, 47, 0.06)',
              color: statusMsg.startsWith('🎉') ? '#065F46' : statusMsg.startsWith('🤔') ? '#991B1B' : '#14452F',
              border: `1.5px solid ${statusMsg.startsWith('🎉') ? '#10B981' : statusMsg.startsWith('🤔') ? '#EF4444' : '#14452F'}`,
              transition: 'all 0.2s ease'
            }}>
              {statusMsg || '🎯 Select an organism photo above, then click its matching 8K habitat tray!'}
            </div>

            {/* Right: Next Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isCurrentCriterionComplete ? (
                selectedCriterionId !== 'habitat' ? (
                  <button
                    onClick={() => {
                      const critIds = ['flowers', 'stem', 'eating', 'habitat'];
                      const nextIdx = critIds.indexOf(selectedCriterionId) + 1;
                      if (nextIdx < critIds.length) {
                        handleSelectCriterion(critIds[nextIdx]);
                      }
                    }}
                    className="bio-amber-cta"
                    title="Move to the next scientific criterion"
                  >
                    <span>Next Criterion</span>
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => onNextActivity ? onNextActivity() : onBackToDashboard ? onBackToDashboard('next_activity') : null}
                    className="bio-amber-cta"
                    title="Proceed to Activity 2.4"
                  >
                    <span>Go to Activity 2.4 ➔</span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => onNextActivity ? onNextActivity() : onBackToDashboard ? onBackToDashboard('next_activity') : null}
                  className="bio-outline-btn"
                  title="Proceed to Activity 2.4"
                >
                  <span>Activity 2.4 ➔</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8K ULTRA-DEFINITION HIGH-FIDELITY ZOOM MODAL                             */}
      {/* ========================================================================= */}
      {activeZoomImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 40, 26, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'relative',
            width: '92vw',
            maxWidth: '1350px',
            height: '88vh',
            background: 'rgba(250, 248, 242, 0.55)',
            border: '2.5px solid #10B981',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />
            <CardCornerLeaves position="bottom-left" />
            <CardCornerLeaves position="bottom-right" />

            {/* Modal Top Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px',
              borderBottom: '2px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '4px 18px',
                  fontSize: '16px',
                  fontWeight: 900
                }}>
                  {activeZoomImage.badge}
                </span>
                <span style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#0A3B24'
                }}>
                  {activeZoomImage.title} · 8K Ultra-Definition View
                </span>
              </div>

              {/* Zoom Controls & Close Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(20, 69, 47, 0.10)',
                  borderRadius: '12px',
                  padding: '3px 8px',
                  border: '1.5px solid #14452F'
                }}>
                  <button
                    onClick={() => setZoomScale(s => Math.max(1, s - 0.5))}
                    disabled={zoomScale <= 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: zoomScale <= 1 ? 'not-allowed' : 'pointer',
                      opacity: zoomScale <= 1 ? 0.4 : 1,
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} color="#14452F" />
                  </button>

                  <span style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    color: '#14452F',
                    padding: '0 8px',
                    minWidth: '54px',
                    textAlign: 'center'
                  }}>
                    {Math.round(zoomScale * 100)}%
                  </span>

                  <button
                    onClick={() => setZoomScale(s => Math.min(3, s + 0.5))}
                    disabled={zoomScale >= 3}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: zoomScale >= 3 ? 'not-allowed' : 'pointer',
                      opacity: zoomScale >= 3 ? 0.4 : 1,
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Zoom In"
                  >
                    <ZoomIn size={18} color="#14452F" />
                  </button>

                  <button
                    onClick={() => setZoomScale(1)}
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '3px 10px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      marginLeft: '6px'
                    }}
                  >
                    Reset Fit
                  </button>
                </div>

                <button
                  onClick={closeZoomModal}
                  style={{
                    background: '#14452F',
                    color: '#FFFFFF',
                    border: '1.5px solid #10B981',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    fontSize: '16px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Close Zoom View"
                >
                  <X size={18} />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Scrollable / Panning 8K Image Viewport */}
            <div style={{
              flex: 1,
              minHeight: 0,
              overflow: 'auto',
              background: '#072517',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              position: 'relative',
              cursor: zoomScale > 1 ? 'grab' : 'default'
            }}>
              <img
                src={activeZoomImage.image}
                alt={activeZoomImage.alt}
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.25s ease-out',
                  maxWidth: zoomScale === 1 ? '100%' : 'none',
                  maxHeight: zoomScale === 1 ? '100%' : 'none',
                  objectFit: 'contain',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                  borderRadius: '12px',
                  imageRendering: 'high-quality'
                }}
              />
            </div>

            {/* Modal Bottom Explanation Strip */}
            <div style={{
              padding: '10px 24px',
              background: 'rgba(250, 248, 242, 0.55)',
              borderTop: '2px solid #14452F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 20
            }}>
              <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                🔍 <strong>Pristine 8K Botanical Resolution:</strong> Zoom in up to 300% to inspect microscopic fern spores, tree bark lichen, sunlit leaf vein stomata, and freshwater ripples without pixelation!
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setZoomScale(1.5)}
                  style={{
                    background: zoomScale === 1.5 ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                    color: zoomScale === 1.5 ? '#FFFFFF' : '#14452F',
                    border: '1.5px solid #14452F',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  1.5x
                </button>
                <button
                  onClick={() => setZoomScale(2)}
                  style={{
                    background: zoomScale === 2 ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                    color: zoomScale === 2 ? '#FFFFFF' : '#14452F',
                    border: '1.5px solid #14452F',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  2.0x
                </button>
                <button
                  onClick={() => setZoomScale(3)}
                  style={{
                    background: zoomScale === 3 ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                    color: zoomScale === 3 ? '#FFFFFF' : '#14452F',
                    border: '1.5px solid #14452F',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  3.0x (Ultra-HD)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🔬 INTERACTIVE FIELD SPECIMEN LOUPE (ANATOMY & ADAPTATION INSPECTOR)      */}
      {/* ========================================================================= */}
      {activeLoupeSpecimen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 35, 20, 0.90)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'relative',
            width: '90vw',
            maxWidth: '920px',
            maxHeight: '90vh',
            background: 'rgba(250, 248, 242, 0.55)',
            border: '2.5px solid #10B981',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />
            <CardCornerLeaves position="bottom-left" />
            <CardCornerLeaves position="bottom-right" />

            {/* Loupe Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px',
              borderBottom: '2px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '3px 14px',
                  fontSize: '16px',
                  fontWeight: 900
                }}>
                  🔬 FIELD SPECIMEN LOUPE
                </span>
                <span style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#0A3B24'
                }}>
                  {activeLoupeSpecimen.name} <em style={{ fontSize: '17px', fontWeight: 600, color: '#065F46' }}>({activeLoupeSpecimen.scientific})</em>
                </span>
              </div>

              <button
                onClick={() => setActiveLoupeSpecimen(null)}
                style={{
                  background: 'rgba(20, 69, 47, 0.1)',
                  border: '1.5px solid #14452F',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#14452F',
                  fontWeight: 900
                }}
                title="Close Loupe Inspector"
              >
                ✕
              </button>
            </div>

            {/* Loupe Main Content (2 Columns: Specimen Image with Target Loupe + Anatomical Breakdown) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '20px',
              padding: '20px 24px',
              overflowY: 'auto',
              flex: 1
            }}>
              {/* Left Column: Specimen Image with Glowing Magnifying Target Ring */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid rgba(20, 69, 47, 0.5)',
                background: '#072517',
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={activeLoupeSpecimen.image}
                  alt={activeLoupeSpecimen.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '340px',
                    objectFit: 'cover'
                  }}
                />

                {/* Volumetric Vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, transparent 40%, rgba(7, 37, 23, 0.65) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Illuminated Magnifying Focus Ring on Anatomical Feature */}
                {(() => {
                  const target = activeLoupeSpecimen.adaptations?.[selectedCriterionId]?.loupeTarget || { x: 50, y: 50 };
                  return (
                    <div style={{
                      position: 'absolute',
                      top: `${target.y}%`,
                      left: `${target.x}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      border: '3px solid #F59E0B',
                      boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.35), 0 0 30px rgba(245, 158, 11, 0.8)',
                      pointerEvents: 'none',
                      animation: 'pulseGlow 2s ease-in-out infinite'
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: '-28px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#D97706',
                        color: '#FFFFFF',
                        padding: '2px 10px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: 900,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                      }}>
                        🔍 Focus Area
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Column: NCERT Scientific Analysis & Morphological Rationale */}
              {(() => {
                const adapt = activeLoupeSpecimen.adaptations?.[selectedCriterionId] || {};
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{
                        background: 'rgba(20, 69, 47, 0.08)',
                        border: '1.5px solid #14452F',
                        borderRadius: '14px',
                        padding: '10px 14px'
                      }}>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>
                          CRITERION UNDER INVESTIGATION
                        </span>
                        <div style={{
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          color: '#14452F',
                          marginTop: '2px'
                        }}>
                          {currentCriterion.icon} {currentCriterion.label}
                        </div>
                      </div>

                      <div style={{
                        background: '#FFFFFF',
                        border: '1.8px solid #10B981',
                        borderRadius: '16px',
                        padding: '14px 16px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                      }}>
                        <div style={{
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          color: '#0A3B24',
                          marginBottom: '6px'
                        }}>
                          🔍 {adapt.title || 'Anatomical Feature'}
                        </div>
                        <p style={{
                          fontSize: '16px',
                          lineHeight: '1.45',
                          color: '#1F2937',
                          margin: '0 0 10px 0'
                        }}>
                          {adapt.observation || 'Organism exhibits distinctive adaptations corresponding to this morphological classification.'}
                        </p>
                        <div style={{
                          background: 'rgba(16, 185, 129, 0.12)',
                          borderRadius: '10px',
                          padding: '6px 12px',
                          border: '1px solid #10B981',
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#065F46'
                        }}>
                          💡 {adapt.rationale || 'Key NCERT taxonomic diagnostic trait.'}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: '6px' }}>
                      <button
                        onClick={() => natureAudio.playOrganismSound(activeLoupeSpecimen.id)}
                        style={{
                          background: 'rgba(245, 158, 11, 0.18)',
                          border: '1.5px solid #D97706',
                          color: '#B45309',
                          borderRadius: '12px',
                          padding: '8px 16px',
                          fontSize: '16px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        🔊 Listen to {activeLoupeSpecimen.name}
                      </button>

                      <button
                        onClick={() => setActiveLoupeSpecimen(null)}
                        className="bio-amber-cta"
                        style={{ padding: '8px 20px', fontSize: '16px' }}
                      >
                        <span>Got It! Back to Lab</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🌳 INTERACTIVE NCERT BRANCHING CLASSIFICATION TREE MODAL                  */}
      {/* ========================================================================= */}
      {showClassificationTree && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 35, 20, 0.90)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'relative',
            width: '92vw',
            maxWidth: '1060px',
            maxHeight: '90vh',
            background: 'rgba(250, 248, 242, 0.55)',
            border: '2.5px solid #10B981',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />
            <CardCornerLeaves position="bottom-left" />
            <CardCornerLeaves position="bottom-right" />

            {/* Classification Tree Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px',
              borderBottom: '2px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '3px 14px',
                  fontSize: '16px',
                  fontWeight: 900
                }}>
                  🌳 NCERT CLASS 6 KEY
                </span>
                <span style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#0A3B24'
                }}>
                  Branching Classification Tree of Living Things
                </span>
              </div>

              <button
                onClick={() => setShowClassificationTree(false)}
                style={{
                  background: 'rgba(20, 69, 47, 0.1)',
                  border: '1.5px solid #14452F',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#14452F',
                  fontWeight: 900
                }}
                title="Close Classification Tree"
              >
                ✕
              </button>
            </div>

            {/* Tree Diagrams Body */}
            <div style={{
              padding: '20px 24px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center'
            }}>
              {/* Level 1: Root Node */}
              <div style={{
                background: '#14452F',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '8px 28px',
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: '20px',
                fontWeight: 900,
                boxShadow: '0 6px 18px rgba(20, 69, 47, 0.35)',
                textAlign: 'center'
              }}>
                🌿 All 6 Living Organisms (NCERT Table 2.1)
              </div>

              {/* Tree Connector Line */}
              <div style={{ width: '2px', height: '18px', background: '#10B981' }} />

              {/* Level 2: Two Main Kingdoms (Plants vs Animals) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                width: '100%',
                maxWidth: '920px'
              }}>
                {/* Branch A: Plants */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '2px solid #10B981',
                  borderRadius: '18px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{
                    background: '#065F46',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: 900,
                    textAlign: 'center'
                  }}>
                    🌱 Kingdom Plantae · Autotrophs (Make Own Food)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* Flowering Plants */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#D97706' }}>
                        🌸 Flowering Plants
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Mango Tree (Woody)
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Rose Plant (Woody)
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Lotus Plant (Soft Water)
                      </span>
                    </div>

                    {/* Non-Flowering Plants */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#059669' }}>
                        🌿 Spore-Bearing Plant
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Fern Plant
                      </span>
                      <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 600 }}>
                        (Soft stem · reproduces via brown spores / sori)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Branch B: Animals */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '2px solid #F59E0B',
                  borderRadius: '18px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{
                    background: '#B45309',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: 900,
                    textAlign: 'center'
                  }}>
                    🐾 Kingdom Animalia · Heterotrophs (Eat Others)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* Terrestrial Animal */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#1E3A8A' }}>
                        🏞️ Terrestrial Mammal
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Indian Cow
                      </span>
                      <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 600 }}>
                        (Lungs & hooves · Herbivorous meadow grazer)
                      </span>
                    </div>

                    {/* Aquatic Animal */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#0284C7' }}>
                        🌊 Aquatic Swimmer
                      </span>
                      <span style={{ fontSize: '16px', color: '#14452F', fontWeight: 800 }}>
                        • Freshwater Fish
                      </span>
                      <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 600 }}>
                        (Gills & swimming fins · Freshwater stream forager)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Specimen Avatars Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '10px',
                width: '100%',
                maxWidth: '920px',
                marginTop: '6px'
              }}>
                {SORT_ITEMS.map(sp => (
                  <div
                    key={sp.id}
                    onClick={() => {
                      setShowClassificationTree(false);
                      setActiveLoupeSpecimen(sp);
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'transform 0.18s ease'
                    }}
                    title={`Click to inspect ${sp.name} anatomy`}
                  >
                    <img
                      src={sp.image}
                      alt={sp.name}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #14452F'
                      }}
                    />
                    <span style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#14452F',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}>
                      {sp.name}
                    </span>
                    <span style={{ fontSize: '16px', color: '#D97706', fontWeight: 900 }}>
                      🔍 Loupe
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
