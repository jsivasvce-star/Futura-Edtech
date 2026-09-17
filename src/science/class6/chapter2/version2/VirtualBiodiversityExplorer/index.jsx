import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RefreshCw, Volume2, VolumeX, CheckCircle, ChevronRight, ChevronLeft, Award, ArrowLeft, BookOpen, Target, Eye, ArrowRight, Sprout, Leaf, Flower2, Sparkles, Footprints, Lightbulb, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import confetti from 'canvas-confetti';
import activityPlantsImage from '../../../../../assets/2.1_plant.png';
import activityAnimalsImage from '../../../../../assets/activity_2.1 animals.png';
import natureForestAudio from '../../../../../assets/nature_forest_sound.mp3';
import ch2GardenPanorama from '../../../../../assets/ch2_garden_panorama.jpg';
import ch2BiodiversityHero from '../../../../../assets/ch2_biodiversity_hero.jpg';
import ch2CrawlersHabitat from '../../../../../assets/ch2_crawlers_habitat.jpg';
import ch2AerialHabitat from '../../../../../assets/ch2_aerial_habitat.jpg';
import ch2WalkersHabitat from '../../../../../assets/ch2_walkers_habitat.jpg';
import ch2HerbsHabitat from '../../../../../assets/ch2_herbs_habitat_8k.jpg';
import ch2ShrubsHabitat from '../../../../../assets/ch2_shrubs_habitat_8k.jpg';
import ch2TreesHabitat from '../../../../../assets/ch2_trees_habitat_8k.jpg';
import grassImage from '../../../../../assets/grass.png';
import roseImage from '../../../../../assets/rose.png';
import sunflowerImage from '../../../../../assets/sunflower.png';
import hibiscusImage from '../../../../../assets/hibiscus.png';
import tulsiImage from '../../../../../assets/tulsi.png';
import neemImage from '../../../../../assets/neem.png';
import waterLilyImage from '../../../../../assets/water_lily.png';
import { useTheme } from '../../../../../ThemeContext.jsx';
import { sounds } from './utils/soundEffects';
import Table21Notebook from './components/Table21Notebook';

import frogImg from '../../../../../assets/frog.png';
import antImg from '../../../../../assets/ant.png';
import crowImg from '../../../../../assets/crow.png';
import butterflyImg from '../../../../../assets/butterfly.png';
import sparrowImg from '../../../../../assets/sparrow.png';
import squirrelImg from '../../../../../assets/squirrel.png';
import cowImg from '../../../../../assets/brown_cow.png';

const PLANT_CROPPED_IMAGES = {
  grass: grassImage,
  rose: roseImage,
  tulsi: tulsiImage,
  hibiscus: hibiscusImage,
  neem: neemImage,
  sunflower: sunflowerImage,
  waterlily: waterLilyImage,
  water_lily: waterLilyImage,
  Grass: grassImage,
  Rose: roseImage,
  Tulsi: tulsiImage,
  Hibiscus: hibiscusImage,
  Neem: neemImage,
  Sunflower: sunflowerImage,
  'Water Lily': waterLilyImage,
  'Pond Water Lilies': waterLilyImage,
};

const GREEN_BUTTON_THEME = {
  bg: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
  border: '1.5px solid #a7f3d0',
  color: '#064e3b',
  shadow: '0 2px 8px rgba(6, 78, 59, 0.08)',
  hoverBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
};

const PLANT_BUTTON_THEMES = {
  hibiscus: GREEN_BUTTON_THEME,
  tulsi: GREEN_BUTTON_THEME,
  grass: GREEN_BUTTON_THEME,
  neem: GREEN_BUTTON_THEME,
  rose: GREEN_BUTTON_THEME,
  sunflower: GREEN_BUTTON_THEME,
  waterlily: GREEN_BUTTON_THEME
};

const ANIMAL_BUTTON_THEMES = {
  crow: GREEN_BUTTON_THEME,
  sparrow: GREEN_BUTTON_THEME,
  cow: GREEN_BUTTON_THEME,
  squirrel: GREEN_BUTTON_THEME,
  butterfly: GREEN_BUTTON_THEME,
  frog: GREEN_BUTTON_THEME,
  ant: GREEN_BUTTON_THEME
};

const ANIMAL_IMAGE_ASSETS = {
  frog: frogImg,
  ant: antImg,
  crow: crowImg,
  butterfly: butterflyImg,
  sparrow: sparrowImg,
  squirrel: squirrelImg,
  cow: cowImg,
  'Indian Pond Frog': frogImg,
  'Ant': antImg,
  'Crow': crowImg,
  'Butterfly': butterflyImg,
  'Sparrow': sparrowImg,
  'Squirrel': squirrelImg,
  'Cow': cowImg
};

const BONUS_ORGANISMS = [
  {
    id: 'water_lily',
    name: 'Pond Water Lilies',
    emoji: '🪷',
    x: 17, y: 77, w: 14, h: 14,
    details: "Water lilies floating in the freshwater pond, supporting small aquatic organisms and adding biological beauty.",
    fact: "Water lily leaves have stomata on their upper surfaces instead of their lower surfaces to breathe directly in contact with air!",
  },
  {
    id: 'snail',
    name: 'Garden Snail',
    emoji: '🐌',
    x: 34, y: 86, w: 10, h: 10,
    details: "A slow-moving mollusc that carries a protective spiral shell on its back and leaves a silvery slime trail.",
    fact: "Snails cannot hear at all — they rely solely on their sense of touch and smell to find their way around!",
  }
];

export const PLANT_CATEGORIES = [
  {
    id: 'herbs',
    name: 'Herbs',
    icon: '🌿',
    tag: 'Tender Green Stem',
    quote: 'Herbs are short, non-woody plants with soft green tender stems that bend easily without snapping.',
    image: ch2HerbsHabitat,
    alt: 'Tulsi, Mint, Tomato, Grass, and Wheat herbs growing with soft green stems',
    caption: '🌿 Tulsi • Mint • Tomato • Grass • Wheat',
    captionTag: 'Soft Tender Stems',
    traits: [
      { label: 'Stem Texture', value: 'Soft, green, non-woody, tender; bends smoothly without snapping' },
      { label: 'Plant Height', value: 'Usually very short (typically under 1 meter in height)' },
      { label: 'Branching Habit', value: 'Few or delicate branches; tender stems arise near the base' },
      { label: 'NCERT Examples', value: 'Tulsi (Holy Basil), Mint, Tomato, Grass, Wheat, Coriander' }
    ],
    didYouKnow: 'Table 2.1 in your science textbook helps you record whether a plant is short, green, and tender-stemmed to classify it as a Herb.'
  },
  {
    id: 'shrubs',
    name: 'Shrubs',
    icon: '🌺',
    tag: 'Hard Woody Base',
    quote: 'Shrubs are bushy plants with hard, thin woody stems branching out right from near the ground base.',
    image: ch2ShrubsHabitat,
    alt: 'Rose, Hibiscus, Lemon, and Henna shrubs growing with woody branches near ground',
    caption: '🌺 Rose • Hibiscus • Lemon • Mehndi',
    captionTag: 'Hard Woody Base',
    traits: [
      { label: 'Stem Texture', value: 'Hard and woody, but relatively thin (not a thick single trunk)' },
      { label: 'Plant Height', value: 'Medium height (about human height, roughly 1 to 3 meters)' },
      { label: 'Branching Habit', value: 'Branches arise profusely right near the base of the stem' },
      { label: 'NCERT Examples', value: 'Rose, Hibiscus (China Rose), Lemon, Mehndi (Henna), Jasmine' }
    ],
    didYouKnow: 'Unlike trees, shrubs have branches starting very close to the soil line, giving them their characteristic bushy appearance.'
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: '🌳',
    tag: 'Massive Woody Trunk',
    quote: 'Trees are tall, grand plants with a single thick, hard brown woody trunk and leafy canopy spreading high above.',
    image: ch2TreesHabitat,
    alt: 'Banyan, Peepal, Neem, Mango, and Gulmohar trees with massive woody trunks and high crowns',
    caption: '🌳 Banyan • Peepal • Neem • Mango • Gulmohar',
    captionTag: 'Massive Woody Trunk',
    traits: [
      { label: 'Stem Texture', value: 'Single, massive, hard brown woody trunk protected by rough bark' },
      { label: 'Plant Height', value: 'Tall and grand, towering many meters into the sky' },
      { label: 'Branching Habit', value: 'Branches arise high up on the trunk, far above ground level' },
      { label: 'NCERT Examples', value: 'Banyan (National Tree), Peepal, Neem, Mango, Gulmohar, Teak' }
    ],
    didYouKnow: 'Trees live for decades or centuries. Their deep taproots anchor the massive crown and pull water from deep subterranean aquifers.'
  }
];

export const ANIMAL_CATEGORIES = [
  {
    id: 'crawlers',
    name: 'Crawlers & Ground Dwellers',
    icon: '🐜',
    tag: 'Crawls / Creeps',
    quote: 'Ground dwellers live in garden soil, leaf litter, and beneath stones, moving by crawling, creeping, or burrowing.',
    image: ch2CrawlersHabitat,
    alt: 'Ants, Earthworms, Snails, and Grasshoppers in rich garden humus and soil',
    caption: '🐜 Ant • 🪱 Earthworm • 🐌 Snail • 🦗 Grasshopper',
    captionTag: 'Moist Soil & Humus',
    traits: [
      { label: 'Primary Habitat', value: 'Moist topsoil, leaf litter, decaying bark, garden pathways' },
      { label: 'Locomotion Mode', value: 'Crawls with multiple jointed legs, creeps by muscle waves, or slithers' },
      { label: 'Ecological Role', value: 'Soil aeration, organic decomposition, garden pollination' },
      { label: 'NCERT Examples', value: 'Black Garden Ant, Earthworm, Garden Snail, Beetle, Millipede' }
    ],
    didYouKnow: 'Table 2.2 in your science textbook helps you observe how soil organisms crawl and enrich garden biodiversity.'
  },
  {
    id: 'aerial',
    name: 'Aerial (Flying Creatures)',
    icon: '🐦',
    tag: 'Can Fly in Air',
    quote: 'Aerial animals are winged birds and flying insects that navigate the open sky and tree canopies.',
    image: ch2AerialHabitat,
    alt: 'House Sparrow, Crow, Butterfly, and Honeybee in tree canopy and blossoms habitat',
    caption: '🐦 Sparrow • 🪶 Crow • 🦋 Butterfly • 🐝 Bee',
    captionTag: 'Canopies & Blossoms',
    traits: [
      { label: 'Primary Habitat', value: 'Open airspace, leafy crowns, high tree perches, garden flowers' },
      { label: 'Locomotion Mode', value: 'Flies using aerodynamic feathered wings or membranous insect wings' },
      { label: 'Ecological Role', value: 'Flower nectar pollination, seed dispersal, natural insect control' },
      { label: 'NCERT Examples', value: 'House Sparrow, Common Crow, Butterfly, Honeybee, Dragon-fly' }
    ],
    didYouKnow: 'Birds have lightweight hollow bones and aerodynamic feathers that minimize drag while soaring between trees.'
  },
  {
    id: 'walkers',
    name: 'Walkers & Swimmers',
    icon: '🐾',
    tag: 'Limbs & Fins',
    quote: 'Walkers and aquatic creatures possess adapted limbs to walk, hop, leap across pastures, or swim in ponds.',
    image: ch2WalkersHabitat,
    alt: 'Gir Cow, Indian Pond Frog, Squirrel, and Dog in meadows, garden path, and pond habitat',
    caption: '🐄 Cow • 🐸 Frog • 🐿️ Squirrel • 🐕 Dog',
    captionTag: 'Meadows & Ponds',
    traits: [
      { label: 'Primary Habitat', value: 'Grassy school fields, meadows, garden fences, freshwater pond edges' },
      { label: 'Locomotion Mode', value: 'Walks or runs on four legs, leaps with hind legs, swims with webbed feet' },
      { label: 'Ecological Role', value: 'Herbivorous grazing, amphibious pest control, seed distribution' },
      { label: 'NCERT Examples', value: 'Desi Cow, Indian Pond Frog, Striped Palm Squirrel, Garden Lizard' }
    ],
    didYouKnow: 'Frogs are amphibians: they breathe with gills in water as tadpoles, and breathe through moist skin and lungs on land as adults!'
  }
];

// Leafy Vine Branch extending outwards flanking the main title (matching slogan page)
const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="50"
    height="24"
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
      stroke="#14452F"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#14452F" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#2D6A4F" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#10B981" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#14452F" />
    <path d="M40 18 C44 22, 43 27, 39 29 C35 31, 31 28, 32 23 C33 20, 37 17, 40 18 Z" fill="#2D6A4F" />
  </svg>
);

// Botanical Sprout Motif directly beneath the title in the center (matching slogan page)
const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px' }}>
    <svg width="28" height="16" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#14452F" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#14452F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#10B981" />
    </svg>
  </div>
);

// Top Hanging Tree Foliage in corners (matching slogan page)
const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: 'clamp(110px, 12vw, 160px)',
    height: 'clamp(60px, 7vh, 90px)',
    pointerEvents: 'none',
    zIndex: 4,
    overflow: 'hidden',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.90
  }}>
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="none" fill="none">
      <path d="M0 0 C45 22, 100 38, 155 32 C175 30, 192 24, 200 18" stroke="#14452F" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M65 28 C88 50, 122 66, 150 70" stroke="#14452F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 16 C50 38, 72 65, 88 86" stroke="#14452F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M38 12 C54 2, 74 10, 80 24 C68 31, 48 26, 38 12 Z" fill="#2D6A4F" />
      <path d="M75 22 C96 14, 118 22, 124 38 C110 45, 88 38, 75 22 Z" fill="#14452F" />
      <path d="M118 28 C140 20, 162 27, 168 43 C154 50, 132 43, 118 28 Z" fill="#2D6A4F" />
      <path d="M150 28 C172 22, 188 30, 194 43 C180 49, 164 43, 150 28 Z" fill="#10B981" />
      <path d="M55 33 C72 27, 88 38, 90 52 C76 57, 60 49, 55 33 Z" fill="#10B981" />
      <path d="M92 44 C108 38, 125 48, 126 62 C112 67, 97 59, 92 44 Z" fill="#2D6A4F" />
      <path d="M125 54 C142 48, 158 58, 160 72 C146 77, 131 69, 125 54 Z" fill="#10B981" />
      <path d="M60 60 C76 55, 90 68, 90 82 C76 86, 64 76, 60 60 Z" fill="#14452F" />
      <path d="M22 34 C36 28, 50 36, 52 50 C38 54, 26 46, 22 34 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

// Soft Mountain Silhouette Backdrop behind the title
const TopMountainBackdrop = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '80px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.15,
    overflow: 'hidden'
  }}>
    <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" fill="none">
      <path d="M0 72 Q160 34 260 56 T520 30 T760 52 T1000 38 L1000 80 L0 80 Z" fill="#10B981" />
      <path d="M100 76 Q290 38 440 60 T720 42 T1000 56 L1000 80 L0 80 Z" fill="#14452F" />
    </svg>
  </div>
);

// Spreading Botanical Leaf Flourish for Card Corners (matching slogan page poster)
const CardCornerLeaves = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 96 96"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '2px' : 'auto',
        bottom: position.includes('bottom') ? '2px' : 'auto',
        left: position.includes('left') ? '2px' : 'auto',
        right: position.includes('right') ? '2px' : 'auto',
        transform: transforms[position],
        opacity: 0.95,
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Primary curving vine stems reaching into the box */}
      <path d="M4 4 C24 14, 48 30, 62 54 C74 72, 82 86, 88 94" stroke="#14452F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M4 22 C18 30, 38 46, 48 66 C56 80, 60 90, 62 94" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 4 C30 18, 46 38, 66 48 C80 56, 90 60, 94 62" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />

      {/* Lush multi-toned leaves spreading gracefully along borders and into box */}
      <path d="M14 6 C26 2, 36 8, 38 18 C26 24, 16 18, 14 6 Z" fill="#14452F" />
      <path d="M6 14 C2 26, 8 36, 18 38 C24 26, 18 16, 6 14 Z" fill="#2D6A4F" />
      <path d="M30 16 C44 10, 56 18, 56 30 C42 36, 32 28, 30 16 Z" fill="#10B981" />
      <path d="M16 30 C10 44, 18 56, 30 56 C36 42, 28 32, 16 30 Z" fill="#2D6A4F" />
      <path d="M46 32 C60 26, 72 36, 70 48 C56 54, 46 44, 46 32 Z" fill="#14452F" />
      <path d="M32 46 C26 60, 36 72, 48 70 C54 56, 44 46, 32 46 Z" fill="#10B981" />
      <path d="M60 52 C74 48, 84 58, 80 70 C68 74, 58 64, 60 52 Z" fill="#2D6A4F" />
      <path d="M52 60 C48 74, 58 84, 70 80 C74 68, 64 58, 52 60 Z" fill="#14452F" />
      <path d="M72 70 C84 70, 92 80, 88 90 C78 92, 72 82, 72 70 Z" fill="#10B981" />
      <path d="M70 72 C70 84, 80 92, 90 88 C92 78, 82 72, 70 72 Z" fill="#2D6A4F" />

      {/* Tender leaf vein details */}
      <path d="M16 8 C24 12, 30 15, 36 17" stroke="#34D399" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M32 18 C40 22, 48 26, 54 28" stroke="#D1FAE5" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M48 34 C56 38, 62 42, 68 44" stroke="#6EE7B7" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
};

// Corner Leaf Sprig for Inner Boxes (Quote Box & Criteria Box)
const InnerBoxLeafSprig = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <div style={{
      position: 'absolute',
      top: position.includes('top') ? '-3px' : 'auto',
      bottom: position.includes('bottom') ? '-3px' : 'auto',
      left: position.includes('left') ? '-3px' : 'auto',
      right: position.includes('right') ? '-3px' : 'auto',
      transform: transforms[position],
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.85
    }}>
      <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
        <path d="M3 3 C15 9, 28 18, 38 34 C42 41, 45 46, 46 47" stroke="#14452F" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 5 C16 2, 23 6, 24 13 C16 17, 9 13, 8 5 Z" fill="#14452F" />
        <path d="M5 8 C2 16, 6 23, 13 24 C17 16, 13 9, 5 8 Z" fill="#2D6A4F" />
        <path d="M19 12 C28 9, 36 14, 35 22 C26 26, 19 20, 19 12 Z" fill="#10B981" />
        <path d="M12 19 C9 28, 14 36, 22 35 C26 26, 20 19, 12 19 Z" fill="#2D6A4F" />
        <path d="M28 24 C37 22, 43 28, 41 36 C33 39, 27 32, 28 24 Z" fill="#14452F" />
      </svg>
    </div>
  );
};

// Rich background botanical leaves pattern visibly spreading across the box interior
const SpreadingLeavesWatermark = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 1,
    opacity: 0.22
  }}>
    <svg width="100%" height="100%" viewBox="0 0 400 620" preserveAspectRatio="none" fill="none">
      {/* Top right leafy branch spreading down and inward */}
      <g transform="translate(250, 10) rotate(22)">
        <path d="M70 0 C60 70, 25 150, -60 210" stroke="#14452F" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M60 30 C84 22, 106 38, 98 64 C72 72, 54 54, 60 30 Z" fill="#14452F" />
        <path d="M48 72 C22 66, 4 84, 10 110 C34 116, 54 98, 48 72 Z" fill="#2D6A4F" />
        <path d="M34 114 C58 108, 80 124, 72 150 C46 158, 28 138, 34 114 Z" fill="#10B981" />
        <path d="M14 156 C-10 150, -30 168, -22 194 C4 200, 24 182, 14 156 Z" fill="#2D6A4F" />
      </g>

      {/* Mid left tender vine branching across center */}
      <g transform="translate(-15, 220) rotate(-12)">
        <path d="M0 70 C60 58, 130 54, 210 80" stroke="#14452F" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 62 C60 36, 88 28, 106 48 C98 72, 72 80, 50 62 Z" fill="#2D6A4F" />
        <path d="M94 56 C110 30, 138 24, 154 44 C144 68, 118 76, 94 56 Z" fill="#10B981" />
        <path d="M138 58 C158 34, 188 32, 202 54 C188 78, 160 82, 138 58 Z" fill="#14452F" />
        <path d="M70 70 C78 96, 104 104, 118 86 C108 62, 82 54, 70 70 Z" fill="#10B981" />
        <path d="M120 68 C132 94, 160 100, 172 80 C160 56, 132 50, 120 68 Z" fill="#2D6A4F" />
      </g>

      {/* Center floating leaf pairs spreading through the box */}
      <g transform="translate(180, 310) rotate(18)">
        <path d="M0 0 C16 -12, 36 -8, 44 8 C32 18, 12 12, 0 0 Z" fill="#10B981" opacity="0.8" />
        <path d="M0 0 C-16 12, -18 32, -4 40 C12 34, 14 16, 0 0 Z" fill="#2D6A4F" opacity="0.8" />
        <path d="M0 0 C4 20, 8 36, 10 46" stroke="#14452F" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <g transform="translate(80, 140) rotate(-28)">
        <path d="M0 0 C18 -8, 34 -2, 40 14 C26 22, 10 16, 0 0 Z" fill="#14452F" opacity="0.75" />
        <path d="M0 0 C4 18, 10 32, 14 42" stroke="#14452F" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <g transform="translate(310, 420) rotate(35)">
        <path d="M0 0 C20 -10, 38 -4, 42 16 C28 24, 12 16, 0 0 Z" fill="#10B981" opacity="0.8" />
        <path d="M0 0 C6 20, 12 36, 16 48" stroke="#14452F" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Bottom right botanical leaves spreading upwards */}
      <g transform="translate(230, 410) rotate(-28)">
        <path d="M0 160 C42 105, 96 50, 165 12" stroke="#14452F" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M30 130 C54 105, 80 110, 84 134 C60 158, 36 154, 30 130 Z" fill="#14452F" />
        <path d="M70 92 C94 68, 118 74, 124 98 C100 122, 76 116, 70 92 Z" fill="#2D6A4F" />
        <path d="M112 56 C136 32, 160 38, 164 62 C140 86, 116 80, 112 56 Z" fill="#10B981" />
        <path d="M42 144 C22 122, 18 98, 38 90 C60 112, 62 136, 42 144 Z" fill="#10B981" />
        <path d="M82 106 C60 84, 58 60, 78 52 C100 74, 102 98, 82 106 Z" fill="#2D6A4F" />
      </g>

      {/* Bottom left delicate sprouts spreading upward */}
      <g transform="translate(25, 490) rotate(14)">
        <path d="M0 80 C44 54, 100 28, 165 14" stroke="#14452F" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M38 62 C56 44, 74 48, 76 64 C58 82, 40 80, 38 62 Z" fill="#2D6A4F" />
        <path d="M82 40 C100 22, 118 26, 120 44 C102 62, 84 60, 82 40 Z" fill="#14452F" />
        <path d="M124 22 C142 4, 160 8, 162 26 C144 44, 126 40, 124 22 Z" fill="#10B981" />
      </g>
    </svg>
  </div>
);

// Ornate Botanical Divider in Card (matching slogan page)
const CardLeafDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    margin: '2px 0 3px 0'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, #2D6A4F)' }} />
    <svg width="24" height="12" viewBox="0 0 40 22" fill="none">
      <path d="M20 20 C20 12, 20 4, 20 2" stroke="#14452F" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10 C14 7, 7 10, 6 15 C7 19, 13 19, 18 15 C20 13, 20 11, 20 10 Z" fill="#2D6A4F" />
      <path d="M20 10 C26 7, 33 10, 34 15 C33 19, 27 19, 22 15 C20 13, 20 11, 20 10 Z" fill="#10B981" />
    </svg>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #2D6A4F, transparent)' }} />
  </div>
);

// Bottom Nature Silhouette Panorama with trees, deer, birds, and meadow waves (matching slogan page)
const BottomNatureSilhouettes = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0.28,
    zIndex: 1
  }}>
    <svg width="100%" height="50" viewBox="0 0 1200 56" preserveAspectRatio="none" fill="none">
      <path d="M0 42 Q220 26 440 38 T880 32 T1200 40 L1200 56 L0 56 Z" fill="#10B981" />
      <path d="M0 46 Q320 34 640 44 T1200 38 L1200 56 L0 56 Z" fill="#14452F" />
      <circle cx="110" cy="34" r="14" fill="#14452F" />
      <circle cx="126" cy="30" r="10" fill="#14452F" />
      <rect x="116" y="40" width="4" height="12" fill="#14452F" />
      <path d="M210 24 Q215 19 220 24 Q225 19 230 24" stroke="#14452F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M245 18 Q249 14 253 18 Q257 14 261 18" stroke="#14452F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M350 42 L352 34 M352 42 L356 32 M354 42 L360 35" stroke="#14452F" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M430 44 L432 36 M432 44 L436 34 M434 44 L440 37" stroke="#14452F" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M820 22 Q825 17 830 22 Q835 17 840 22" stroke="#14452F" strokeWidth="1.8" strokeLinecap="round" />
      <g transform="translate(895, 18) scale(0.65)">
        <path d="M16 6 L22 0 M18 4 L23 3 M20 2 L25 1" stroke="#14452F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 8 C16 6, 20 8, 18 12 L15 17 L8 18 C5 19, 2 22, 0 24 L2 28 L5 23 L14 22 L20 30 L22 30 L17 21 C22 20, 24 18, 22 14 Z" fill="#14452F" />
        <path d="M14 20 L24 28 M16 20 L25 26" stroke="#14452F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 22 L-3 30 M3 22 L-1 31" stroke="#14452F" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <circle cx="1020" cy="30" r="16" fill="#14452F" />
      <circle cx="1038" cy="26" r="12" fill="#14452F" />
      <rect x="1026" y="38" width="5" height="14" fill="#14452F" />
      <polygon points="1075,14 1065,30 1085,30" fill="#14452F" />
      <polygon points="1075,22 1062,38 1088,38" fill="#14452F" />
      <polygon points="1075,30 1058,46 1092,46" fill="#14452F" />
      <rect x="1073" y="46" width="4" height="8" fill="#14452F" />
    </svg>
  </div>
);

// Realistic Photographic Category Icon
const RealisticCategoryIcon = ({ categoryId, size = 28 }) => {
  switch (categoryId) {
    case 'crawlers':
      return (
        <img
          src={antImg}
          alt="Ant"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    case 'aerial':
      return (
        <img
          src={sparrowImg}
          alt="Sparrow"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    case 'walkers':
      return (
        <img
          src={squirrelImg}
          alt="Squirrel"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    case 'herbs':
      return (
        <img
          src={tulsiImage}
          alt="Tulsi"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    case 'shrubs':
      return (
        <img
          src={roseImage}
          alt="Rose"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    case 'trees':
      return (
        <img
          src={neemImage}
          alt="Neem"
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        />
      );
    default:
      return <Sprout size={size} color="#10B981" />;
  }
};

// Realistic Trait Medallion Component for Badge 1 (Photographic Specimen Cutout)
const RealisticSpecimenMedallion = ({ categoryId, size = 30 }) => {
  const imgMap = {
    crawlers: antImg,
    aerial: sparrowImg,
    walkers: squirrelImg,
    herbs: tulsiImage,
    shrubs: roseImage,
    trees: neemImage
  };
  const src = imgMap[categoryId] || tulsiImage;
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #E8F5E9 70%, #C8E6C9 100%)',
      border: '1.8px solid #10B981',
      boxShadow: '0 2px 5px rgba(16, 185, 129, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <img
        src={src}
        alt=""
        style={{ width: `${Math.round(size * 0.72)}px`, height: `${Math.round(size * 0.72)}px`, objectFit: 'contain', filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25))' }}
      />
    </div>
  );
};

// Realistic Trait Medallion Component for Badge 2 (Habitat, Stem Texture, Locomotion)
const RealisticTextureMedallion = ({ categoryId, size = 30 }) => {
  let content = null;
  if (categoryId === 'crawlers') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="24" rx="15" ry="8" fill="#3E2723" />
        <path d="M3 24 Q18 20 33 24 L33 28 Q18 34 3 28 Z" fill="#2E1B13" />
        <circle cx="12" cy="22" r="2.5" fill="#8D6E63" stroke="#4E342E" strokeWidth="0.8" />
        <circle cx="23" cy="25" r="2" fill="#A1887F" />
        <circle cx="17" cy="21" r="1.5" fill="#6D4C41" />
        <path d="M14 20 Q12 16 10 17 Q12 19 14 20 Z" fill="#4ADE80" />
        <path d="M15 20 Q16 15 18 16 Q17 19 15 20 Z" fill="#22C55E" />
        <path d="M13 22 Q10 24 8 23" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  } else if (categoryId === 'aerial') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M4 26 C10 22, 20 12, 32 6 C28 14, 22 22, 12 28 Z" fill="#2563EB" />
        <path d="M8 24 C14 18, 22 13, 30 7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
        <path d="M10 27 C16 23, 23 18, 27 12" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      </svg>
    );
  } else if (categoryId === 'walkers') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="24" rx="7" ry="5.5" fill="#B45309" />
        <circle cx="10" cy="15" r="3.2" fill="#D97706" />
        <circle cx="15.5" cy="12" r="3.4" fill="#D97706" />
        <circle cx="21.5" cy="12" r="3.4" fill="#D97706" />
        <circle cx="27" cy="15" r="3.2" fill="#D97706" />
        <path d="M6 31 L8 26 M10 32 L11 27 M28 31 L26 26" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  } else if (categoryId === 'herbs') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M18 32 C18 24, 16 16, 20 4" stroke="#22C55E" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M18 22 C12 20, 9 14, 11 11 C15 11, 18 16, 18 22 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="0.8" />
        <path d="M18 14 C24 12, 27 6, 25 3 C21 3, 18 8, 18 14 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="0.8" />
      </svg>
    );
  } else if (categoryId === 'shrubs') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M18 32 L18 24 M18 24 L10 16 M18 24 L26 16 M18 24 L18 12 M10 16 L6 10 M26 16 L30 10" stroke="#854D0E" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="6" cy="10" r="3" fill="#15803D" />
        <circle cx="30" cy="10" r="3" fill="#15803D" />
        <circle cx="18" cy="12" r="3.5" fill="#16A34A" />
      </svg>
    );
  } else {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="10" rx="14" ry="5.5" fill="#A16207" stroke="#713F12" strokeWidth="1.2" />
        <ellipse cx="18" cy="10" rx="9" ry="3.5" fill="#CA8A04" />
        <ellipse cx="18" cy="10" rx="4" ry="1.6" fill="#EAB308" />
        <path d="M4 10 L4 28 C4 31, 32 31, 32 28 L32 10" fill="#713F12" />
        <path d="M10 14 L10 27 M18 15 L18 28 M26 14 L26 27" stroke="#54300B" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #FEF3C7 70%, #FDE68A 100%)',
      border: '1.8px solid #F59E0B',
      boxShadow: '0 2px 5px rgba(245, 158, 11, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <div style={{ width: `${Math.round(size * 0.75)}px`, height: `${Math.round(size * 0.75)}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </div>
  );
};

// Realistic Trait Medallion Component for Badge 3 (Ecological Role, Branching Habit)
const RealisticRoleMedallion = ({ categoryId, size = 30 }) => {
  let content = null;
  if (categoryId === 'crawlers') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#10B981" strokeWidth="1.8" strokeDasharray="3 2" />
        <path d="M12 24 C14 20, 16 16, 24 14 C22 19, 18 23, 12 24 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
        <path d="M14 22 L22 15" stroke="#78350F" strokeWidth="0.8" />
        <path d="M22 22 Q24 18 27 19 Q25 23 22 22 Z" fill="#22C55E" />
      </svg>
    );
  } else if (categoryId === 'aerial') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="4" fill="#F59E0B" />
        <circle cx="18" cy="10" r="3.5" fill="#F43F5E" />
        <circle cx="26" cy="18" r="3.5" fill="#F43F5E" />
        <circle cx="18" cy="26" r="3.5" fill="#F43F5E" />
        <circle cx="10" cy="18" r="3.5" fill="#F43F5E" />
        <circle cx="26" cy="10" r="1.4" fill="#FDE047" />
        <circle cx="28" cy="13" r="1" fill="#FDE047" />
      </svg>
    );
  } else if (categoryId === 'walkers') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M4 28 Q18 24 32 28 L32 32 L4 32 Z" fill="#15803D" />
        <path d="M8 27 L9 20 M14 27 L15 18 M20 27 L22 17 M26 27 L25 19" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="26" cy="10" r="4" fill="#F59E0B" />
      </svg>
    );
  } else if (categoryId === 'herbs') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M18 32 C18 20, 19 12, 19 4" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M18 20 C23 18, 27 15, 27 11 C23 11, 19 15, 18 20 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="0.8" />
      </svg>
    );
  } else if (categoryId === 'shrubs') {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <path d="M18 32 L12 22 L6 14 M18 32 L18 20 L16 10 M18 32 L24 22 L30 14" stroke="#A16207" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="6" cy="12" rx="4" ry="3" fill="#22C55E" />
        <ellipse cx="16" cy="8" rx="4.5" ry="3.5" fill="#16A34A" />
        <ellipse cx="30" cy="12" rx="4" ry="3" fill="#22C55E" />
      </svg>
    );
  } else {
    content = (
      <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
        <rect x="16" y="24" width="4" height="10" fill="#713F12" />
        <circle cx="18" cy="14" r="10" fill="#15803D" />
        <circle cx="12" cy="16" r="6.5" fill="#16A34A" />
        <circle cx="24" cy="16" r="6.5" fill="#16A34A" />
        <circle cx="18" cy="9" r="6" fill="#22C55E" />
      </svg>
    );
  }
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #E0E7FF 70%, #C7D2FE 100%)',
      border: '1.8px solid #6366F1',
      boxShadow: '0 2px 5px rgba(99, 102, 241, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <div style={{ width: `${Math.round(size * 0.75)}px`, height: `${Math.round(size * 0.75)}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </div>
  );
};

export default function VirtualBiodiversityExplorer({ onBackToDashboard, typeFilter = 'plant', onNextSection, onNextActivity, isFullscreen = false }) {
  const { theme } = useTheme();
  const [notebook, setNotebook] = useState([]);
  const [bonusLog, setBonusLog] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 450 });
  const [infoCardPlant, setInfoCardPlant] = useState(null);
  const [infoCardAnimal, setInfoCardAnimal] = useState(null);
  const [modalPlantPage, setModalPlantPage] = useState(1);
  const [modalAnimalPage, setModalAnimalPage] = useState(1);
  const [fsActive, setFsActive] = useState(false);

  useEffect(() => {
    const handleFs = () => setFsActive(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const openPlantModal = (plant) => {
    setModalPlantPage(1);
    setInfoCardPlant(plant);
  };

  const openAnimalModal = (animal) => {
    setModalAnimalPage(1);
    setInfoCardAnimal(animal);
  };
  const [zoomLevel, setZoomLevel] = useState(2.4); // 2.4x Field Scanner or 4.8x Macro Lens
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState(false);
  const [polaroidSnap, setPolaroidSnap] = useState(null);
  const [discoveryStarToast, setDiscoveryStarToast] = useState(null);
  const natureAudioRef = useRef(null);

  const startAllSoundscape = useCallback(() => {
    try {
      if (natureAudioRef.current) {
        natureAudioRef.current.volume = 0.22;
        natureAudioRef.current.play().catch(() => {});
      }
    } catch (e) {}
    sounds.startSoundscape();
    setIsSoundscapePlaying(true);
  }, []);

  const stopAllSoundscape = useCallback(() => {
    try {
      if (natureAudioRef.current) {
        natureAudioRef.current.pause();
      }
    } catch (e) {}
    sounds.stopSoundscape();
    setIsSoundscapePlaying(false);
  }, []);

  const toggleSoundscape = useCallback(() => {
    if (isSoundscapePlaying) {
      stopAllSoundscape();
    } else {
      startAllSoundscape();
    }
  }, [isSoundscapePlaying, startAllSoundscape, stopAllSoundscape]);

  useEffect(() => {
    return () => {
      try {
        if (natureAudioRef.current) {
          natureAudioRef.current.pause();
        }
      } catch (e) {}
      sounds.stopSoundscape();
    };
  }, []);

  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredTargets = React.useMemo(() => {
    if (typeFilter === 'plant') {
      return [
        {
          id: 'hibiscus',
          name: 'Hibiscus',
          scientificName: 'Hibiscus rosa-sinensis',
          emoji: '🌺',
          type: 'plant',
          category: 'Shrub · Dicot',
          tactileTrait: 'Thin woody stem branching near base · Reticulate Venation',
          specimenPhoto: hibiscusImage,
          x: 29.5, y: 47, radius: 13.5, w: 24, h: 26,
          details: 'Red Hibiscus flowers and bush growing on the center-left.',
          fact: 'Hibiscus flowers have vibrant red petals and are common flowering shrubs!',
          verifyQ: { q: 'Which plant classification does Hibiscus belong to?', opts: ['Herbs', 'Trees', 'Shrubs', 'Aquatic plants'], correct: 2 },
          tableInfo: { 
            stem: 'Thin, hard, woody stem branching out near base', 
            leaves: 'Green simple leaves with serrated margins', 
            flowers: 'Large, bright red flowers', 
            notes: 'Medium height shrub; branches close to ground' 
          },
        },
        {
          id: 'tulsi',
          name: 'Tulsi',
          scientificName: 'Ocimum tenuiflorum',
          emoji: '🌿',
          type: 'plant',
          category: 'Herb · Dicot',
          tactileTrait: 'Soft green aromatic stem · Glandular hairy leaves',
          specimenPhoto: tulsiImage,
          x: 48, y: 80, radius: 12, w: 22, h: 24,
          details: 'Tulsi plant growing in the foreground with vertical flower spikes and aromatic leaves.',
          fact: 'Tulsi (Holy Basil) is an important medicinal herb with soft green stems.',
          verifyQ: { q: 'What type of plant is Tulsi?', opts: ['Tree', 'Shrub', 'Herb', 'Climber'], correct: 2 },
          tableInfo: { 
            stem: 'Soft, green, non-woody herbaceous stem', 
            leaves: 'Small, oval, highly aromatic simple leaves', 
            flowers: 'Tiny purple-white flowers on vertical spikes', 
            notes: 'Short herb; medicinal plant found in home gardens' 
          }
        },
        {
          id: 'grass',
          name: 'Grass',
          scientificName: 'Cynodon dactylon',
          emoji: '🌱',
          type: 'plant',
          category: 'Herb · Monocot',
          tactileTrait: 'Hollow flexible culm stem · Parallel leaf venation',
          specimenPhoto: grassImage,
          x: 73.5, y: 80, radius: 12, w: 20, h: 22,
          details: 'Green grass clump growing on the bottom-right near the tree.',
          fact: 'Grasses are small herbs with narrow leaves and parallel vein patterns.',
          verifyQ: { q: 'Which category does Grass belong to?', opts: ['Tree', 'Herb', 'Shrub', 'Woody climber'], correct: 1 },
          tableInfo: { 
            stem: 'Thin, green, soft, hollow stem', 
            leaves: 'Long, narrow leaves with parallel vein patterns', 
            flowers: 'Tiny inconspicuous spikelets', 
            notes: 'Short herb; covers ground lawns, fibrous roots' 
          }
        },
        {
          id: 'neem',
          name: 'Neem',
          scientificName: 'Azadirachta indica',
          emoji: '🌳',
          type: 'plant',
          category: 'Tree · Dicot',
          tactileTrait: 'Thick scaly brown woody trunk with medicinal bark',
          specimenPhoto: neemImage,
          x: 84.5, y: 44, radius: 14.5, w: 22, h: 26,
          details: 'Grand Neem tree with thick trunk and broad canopy on the right.',
          fact: 'Neem trees are evergreen trees with medicinal properties.',
          verifyQ: { q: 'Which plant classification does a Neem Tree belong to?', opts: ['Herb', 'Shrub', 'Tree', 'Creeper'], correct: 2 },
          tableInfo: { 
            stem: 'Thick, hard, scaly brown woody trunk with bark', 
            leaves: 'Compound pinnate serrated green leaflets', 
            flowers: 'Small, white, fragrant flowers', 
            notes: 'Tall tree; evergreen with broad canopy' 
          }
        },
        {
          id: 'rose',
          name: 'Rose',
          scientificName: 'Rosa rubiginosa',
          emoji: '🌹',
          type: 'plant',
          category: 'Shrub · Dicot',
          tactileTrait: 'Thorny woody stem branching near base · Reticulate Venation',
          specimenPhoto: roseImage,
          x: 52.5, y: 55, radius: 12, w: 22, h: 24,
          details: 'Pink Rose bush with flowering blooms located in the center-right area.',
          fact: 'Roses are thorny flowering shrubs with woody stems branching near the ground.',
          verifyQ: { q: 'What type of stem does a Rose bush have?', opts: ['Soft green stem', 'Thin woody stem with thorns', 'Massive trunk', 'Underwater stem'], correct: 1 },
          tableInfo: { 
            stem: 'Thin woody stem with sharp thorns', 
            leaves: 'Compound leaves with serrated edges', 
            flowers: 'Pink or red fragrant rose blooms', 
            notes: 'Medium height shrub with thorny branches' 
          }
        },
        {
          id: 'sunflower',
          name: 'Sunflower',
          scientificName: 'Helianthus annuus',
          emoji: '🌻',
          type: 'plant',
          category: 'Tall Herb · Dicot',
          tactileTrait: 'Rough hairy green stem · Turns toward sunlight (Heliotropism)',
          specimenPhoto: sunflowerImage,
          x: 67, y: 39, radius: 11.5, w: 20, h: 22,
          details: 'Tall flowering plant with large bright yellow petals turning toward sunlight.',
          fact: 'Sunflowers exhibit heliotropism — young sunflowers follow the sun from east to west every day!',
          verifyQ: { 
            q: 'Which feature is characteristic of a Sunflower?', 
            opts: ['Underwater stem', 'Large yellow flower head with a dark brown central disc', 'Scaly tree trunk', 'No flowers'], 
            correct: 1 
          },
          tableInfo: { 
            stem: 'Tall, strong, green stem with a rough, slightly hairy surface', 
            leaves: 'Large, broad green leaves with a rough texture and prominent veins', 
            flowers: 'Large bright yellow flower head with a dark brown central disc', 
            notes: 'Tall flowering plant; flower head turns toward sunlight; produces edible seeds' 
          }
        },
        {
          id: 'waterlily',
          name: 'Water Lily',
          scientificName: 'Nymphaea alba',
          emoji: '🪷',
          type: 'plant',
          category: 'Aquatic Herb',
          tactileTrait: 'Spongy flexible stem with air cavities · Broad floating waxy leaves',
          specimenPhoto: waterLilyImage,
          x: 18.5, y: 75, radius: 13, w: 22, h: 24,
          details: 'Pink water lilies blooming gracefully on broad floating circular leaves in the garden pond.',
          fact: 'Water lilies have flexible spongy stems with air cavities that let them float easily and absorb dissolved air!',
          verifyQ: { 
            q: 'How is a Water Lily adapted to aquatic life in ponds?', 
            opts: ['Thick heavy bark', 'Flexible spongy stem and broad floating waxy leaves', 'Sharp woody thorns', 'Fibrous dry roots'], 
            correct: 1 
          },
          tableInfo: { 
            stem: 'Soft, long, flexible, spongy stem submerged under water', 
            leaves: 'Broad, round, flat waxy leaves floating on water surface', 
            flowers: 'Large, fragrant pink blossoms opening during daylight', 
            notes: 'Aquatic herb; anchored in pond silt, leaves float on water' 
          }
        }
      ];
    } else {
      return [
        {
          id: 'crow',
          name: 'Crow',
          popupName: 'Crow',
          scientificName: 'Corvus splendens',
          emoji: '🐦‍⬛',
          type: 'animal',
          category: 'Bird · Omnivore',
          tactileTrait: 'Sharp eyes & strong flight wings',
          x: 11, y: 18, radius: 14, w: 18, h: 20,
          details: 'A clever grey-necked bird that flies in the open sky and perches on tree branches. Crows are intelligent scavengers with sharp sight and strong wings.',
          fact: 'Crows are remarkably intelligent — they can recognize individual human faces and use tools to fetch food!',
          verifyQ: { q: 'What is a crow classified as in terms of its diet?', opts: ['Pure herbivore', 'Scavenger that eats scraps and pests', 'Deep-sea predator', 'Insect only feeder'], correct: 1 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Flies using wings. Perches on branches.' },
        },
        {
          id: 'sparrow',
          name: 'Sparrow',
          popupName: 'Sparrow',
          scientificName: 'Passer domesticus',
          emoji: '🐦',
          type: 'animal',
          category: 'Bird · Granivore',
          tactileTrait: 'Short cone beak for tiny seeds & grains',
          x: 48.8, y: 25.1, radius: 14, w: 16, h: 16,
          details: 'A small, friendly bird perched on tree branches. Sparrows chirp cheerfully and feed on tiny seeds, grains, and insects near garden trees.',
          fact: 'House Sparrows have lived alongside humans for over 10,000 years — they are one of the most widespread birds on Earth!',
          verifyQ: { q: 'What do House Sparrows primarily eat?', opts: ['Large mammals', 'Insects and small seeds', 'Big fish', 'Tree bark'], correct: 1 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Flies and hops. Perches on branches.' },
        },
        {
          id: 'cow',
          name: 'Cow',
          popupName: 'Cow',
          scientificName: 'Bos indicus',
          emoji: '🐄',
          type: 'animal',
          category: 'Mammal · Herbivore',
          tactileTrait: 'Four sturdy walking limbs & clover hooves',
          x: 83.5, y: 43, radius: 14, w: 22, h: 24,
          details: 'A large domestic herbivore that grazes peacefully on fresh green grass and hay. Cows move calmly on four legs and provide healthy milk.',
          fact: 'Cows have best friends and get happy when spending time together in green pastures!',
          verifyQ: { q: 'What type of food does a cow eat?', opts: ['Fish and meat', 'Grass and hay', 'Insects only', 'Tree bark'], correct: 1 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Walks on four legs. Terrestrial herbivore.' },
        },
        {
          id: 'squirrel',
          name: 'Squirrel',
          popupName: 'Squirrel',
          scientificName: 'Funambulus palmarum',
          emoji: '🐿️',
          type: 'animal',
          category: 'Rodent · Herbivore',
          tactileTrait: 'Sharp claws & flexible spine for climbing',
          x: 16.5, y: 56, radius: 12, w: 18, h: 20,
          details: 'A quick and nimble rodent with three pale stripes along its back. It climbs tree trunks rapidly and nibbles on nuts, seeds, and berries.',
          fact: 'Squirrels accidentally plant thousands of trees each year by forgetting where they buried their stashes!',
          verifyQ: { q: 'Where would you most likely spot a Three-Striped Palm Squirrel?', opts: ['In the ocean', 'Climbing a tree trunk or rock', 'Flying in the sky', 'Burrowing underground'], correct: 1 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Runs and climbs. Lives on trees and land.' },
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          popupName: 'Butterfly',
          scientificName: 'Papilio demoleus',
          emoji: '🦋',
          type: 'animal',
          category: 'Insect · Pollinator',
          tactileTrait: 'Delicate wings & proboscis for flower nectar',
          x: 49, y: 54.5, radius: 10, w: 12, h: 14,
          details: 'A colorful flying insect with delicate wings fluttering around garden flowers. It feeds on nectar using its long proboscis and helps pollinate flowers.',
          fact: 'Butterflies taste their food using tiny sensory receptors on their feet — not their mouths!',
          verifyQ: { q: 'How does a butterfly help plants?', opts: ['It eats all the leaves', 'It digs up roots', 'It helps in pollination by carrying pollen', 'It blocks sunlight'], correct: 2 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Flies using wings. Feeds on flower nectar.' },
        },
        {
          id: 'frog',
          name: 'Indian Pond Frog',
          popupName: 'Indian Pond Frog',
          scientificName: 'Euphlyctis cyanophlyctis',
          emoji: '🐸',
          type: 'animal',
          category: 'Amphibian · Carnivore',
          tactileTrait: 'Webbed hind feet & moist permeable skin',
          x: 81, y: 84, radius: 11, w: 16, h: 18,
          details: 'An amphibian with smooth green skin resting near ponds and moist shores. It uses its strong hind legs to jump on land and webbed feet to swim swiftly in water.',
          fact: 'Frogs can breathe through their lungs on land and directly through their moist skin underwater — they are true amphibians!',
          verifyQ: { q: 'What type of habitat does an Indian Pond Frog live in?', opts: ['Only on dry land', 'Only in deep ocean', 'Both in freshwater and on moist shores', 'Only in desert sand'], correct: 2 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Jumps and swims. Amphibian. Lives near pond.' },
        },
        {
          id: 'ant',
          name: 'Ant',
          popupName: 'Ant',
          scientificName: 'Camponotus compressus',
          emoji: '🐜',
          type: 'animal',
          category: 'Insect · Social Worker',
          tactileTrait: 'Six crawling legs, powerful lifting mandibles',
          x: 35, y: 91, radius: 11, w: 18, h: 14,
          details: 'Tiny, hardworking social insects crawling together along the soil. Ants communicate using scent trails and can carry loads many times their own weight!',
          fact: 'Ants are incredibly strong — an ant can carry objects up to 50 times its own body weight!',
          verifyQ: { q: 'How do ants move and work together?', opts: ['They fly individually', 'They crawl in social trails using scent clues', 'They swim underwater', 'They jump over trees'], correct: 1 },
          tableInfo: { stem: '—', leaves: '—', flowers: '—', notes: 'Locomotion: Crawls on six legs. Lives in colonies.' },
        }
      ];
    }
  }, [typeFilter]);

  const filteredBonus = React.useMemo(() => {
    return [];
  }, [typeFilter]);

  // Scanner state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInsideImage, setIsInsideImage] = useState(false);
  const [hoveredTarget, setHoveredTarget] = useState(null);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [missMessage, setMissMessage] = useState('');
  const [missPos, setMissPos] = useState({ x: 0, y: 0 });
  const [cameraFlash, setCameraFlash] = useState(false);
  const [beaconTargetId, setBeaconTargetId] = useState(null);
  const lastHoveredIdRef = useRef(null);

  // Hints & Category Stepper (Single page per category like slogan page)
  const [showHints, setShowHints] = useState(true);
  const [categoryStep, setCategoryStep] = useState(0); // 0: Herbs, 1: Shrubs, 2: Trees
  const [projectorZoom, setProjectorZoom] = useState(1); // 1 = 1x, 2 = 1.8x, 3 = 2.6x
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Popup state
  const [scannedOrganism, setScannedOrganism] = useState(null); // target or bonus
  const [isBonusScan, setIsBonusScan] = useState(false);
  const [verifyAnswer, setVerifyAnswer] = useState(null);
  const [verifyChecked, setVerifyChecked] = useState(false);
  const [verifyCorrect, setVerifyCorrect] = useState(false);
  const [subPage, setSubPage] = useState(1);
  const [activeSpecimenId, setActiveSpecimenId] = useState('tulsi');
  const [viewMode, setViewMode] = useState('garden_walk');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [inspectedTraitsByPlant, setInspectedTraitsByPlant] = useState({
    tulsi: { stem: true, leaf: false, flower: false },
    hibiscus: { stem: false, leaf: false, flower: false },
    grass: { stem: false, leaf: false, flower: false },
    neem: { stem: false, leaf: false, flower: false },
    rose: { stem: false, leaf: false, flower: false },
    sunflower: { stem: false, leaf: false, flower: false },
    waterlily: { stem: false, leaf: false, flower: false }
  });

  const selectedPlantSpecimen = React.useMemo(() => {
    return filteredTargets.find(t => t.id === activeSpecimenId) || filteredTargets[0];
  }, [filteredTargets, activeSpecimenId]);

  const categories = typeFilter === 'plant' ? PLANT_CATEGORIES : ANIMAL_CATEGORIES;
  const currentCat = categories[categoryStep] || categories[0];

  const markTraitInspected = useCallback((plantId, trait) => {
    setInspectedTraitsByPlant(prev => {
      const plantTraits = prev[plantId] || { stem: false, leaf: false, flower: false };
      if (plantTraits[trait]) return prev;
      return {
        ...prev,
        [plantId]: { ...plantTraits, [trait]: true }
      };
    });
  }, []);

  const logToNotebookDirect = useCallback((plantId) => {
    if (!notebook.includes(plantId)) {
      setNotebook(prev => [...prev, plantId]);
      sounds.playSuccess();
      if (notebook.length + 1 >= filteredTargets.length) {
        confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
      }
    }
  }, [notebook, filteredTargets.length]);

  const containerRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const hoveredTargetRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Clean up Speech and Intervals - Enable interactive sound effects for plants
  useEffect(() => {
    if (typeFilter === 'plant') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      sounds.stopSpeech();
      sounds.setMuted(false);
    } else {
      sounds.setMuted(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      sounds.stopSpeech();
      sounds.setMuted(false);
      clearInterval(holdIntervalRef.current);
    };
  }, [typeFilter]);

  // Update container size dynamically to keep scanner coordinates precise
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    let ro;
    if (window.ResizeObserver && containerRef.current) {
      ro = new ResizeObserver(updateSize);
      ro.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateSize);
      if (ro) ro.disconnect();
    };
  }, []);

  // Trigger confetti upon completion
  useEffect(() => {
    if (notebook.length === filteredTargets.length && filteredTargets.length > 0) {
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
    }
  }, [notebook, filteredTargets]);

  const stopHolding = useCallback(() => {
    setIsHolding(false);
    setHoldProgress(0);
    clearInterval(holdIntervalRef.current);
  }, []);

  // Mouse move inside canvas - High-precision nearest-target detection
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    mousePosRef.current = { x, y };
    setMousePos({ x, y });

    const baseDim = Math.min(rect.width, rect.height);

    // 1. Calculate visual pixel distance to each target's exact center
    const candidates = filteredTargets
      .map(t => {
        const targetPxX = (t.x / 100) * rect.width;
        const targetPxY = (t.y / 100) * rect.height;
        const distPx = Math.hypot(x - targetPxX, y - targetPxY);
        // Effective activation radius matches the 126px scanner loupe (63px radius) with generous margin
        const radiusPct = t.radius || 12.5;
        const maxDistPx = Math.max(68, (radiusPct / 100) * baseDim + 22);
        return { target: t, distPx, inRange: distPx <= maxDistPx };
      })
      .filter(item => item.inRange)
      .sort((a, b) => a.distPx - b.distPx); // Closest center always takes priority!

    const target = candidates.length > 0 ? candidates[0].target : null;

    // 2. Check bonus targets
    const bonusCandidates = filteredBonus
      .map(b => {
        const bonusPxX = (b.x / 100) * rect.width;
        const bonusPxY = (b.y / 100) * rect.height;
        const distPx = Math.hypot(x - bonusPxX, y - bonusPxY);
        const maxDistPx = Math.max(68, ((b.radius || 12) / 100) * baseDim + 20);
        return { bonus: b, distPx, inRange: distPx <= maxDistPx };
      })
      .filter(item => item.inRange)
      .sort((a, b) => a.distPx - b.distPx);

    const bonus = bonusCandidates.length > 0 ? bonusCandidates[0].bonus : null;

    if (target) {
      const hovered = { data: target, isBonus: false };
      setHoveredTarget(hovered);
      hoveredTargetRef.current = hovered;
      if (lastHoveredIdRef.current !== target.id) {
        if (target.id === 'waterlily' || target.id === 'frog') {
          sounds.playWaterSplash();
        } else if (target.id === 'butterfly' || target.id === 'sparrow' || target.id === 'crow' || target.id === 'squirrel') {
          sounds.playBirdChirp();
        } else {
          sounds.playScannerLock();
        }
        lastHoveredIdRef.current = target.id;
      }
    } else if (bonus) {
      const hovered = { data: bonus, isBonus: true };
      setHoveredTarget(hovered);
      hoveredTargetRef.current = hovered;
      if (lastHoveredIdRef.current !== bonus.id) {
        sounds.playScannerLock();
        lastHoveredIdRef.current = bonus.id;
      }
    } else {
      setHoveredTarget(null);
      hoveredTargetRef.current = null;
      lastHoveredIdRef.current = null;
      if (isHolding) stopHolding();
    }
  }, [filteredTargets, filteredBonus, isHolding, stopHolding]);

  const startHolding = useCallback((e) => {
    if (e.button !== 0) return; // Only left click
    e.preventDefault(); // Prevent text selection and zoom-related drag behaviors

    // Auto-activate garden soundscape on first user interaction in scanner
    if (!isSoundscapePlaying) {
      startAllSoundscape();
    }

    let currentHover = hoveredTargetRef.current;

    // Direct click fallback if mouse hasn't moved yet (e.g. initial touch or quick click)
    if (!currentHover && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const clickY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const baseDim = Math.min(rect.width, rect.height);
      const candidates = filteredTargets
        .map(t => {
          const targetPxX = (t.x / 100) * rect.width;
          const targetPxY = (t.y / 100) * rect.height;
          const distPx = Math.hypot(clickX - targetPxX, clickY - targetPxY);
          const maxDistPx = Math.max(68, ((t.radius || 12.5) / 100) * baseDim + 22);
          return { target: t, distPx, inRange: distPx <= maxDistPx };
        })
        .filter(c => c.inRange)
        .sort((a, b) => a.distPx - b.distPx);

      if (candidates.length > 0) {
        currentHover = { data: candidates[0].target, isBonus: false };
        setHoveredTarget(currentHover);
        hoveredTargetRef.current = currentHover;
      }
    }

    if (!currentHover) {
      if (typeFilter === 'plant') {
        setMissMessage('Move the magnifying scanner over plants to inspect! 🔍');
        setMissPos({ x: mousePosRef.current.x, y: mousePosRef.current.y });
        setTimeout(() => setMissMessage(''), 1800);
      }
      return;
    }

    const { data, isBonus } = currentHover;
    setActiveSpecimenId(data.id);

    // Trigger localized confetti burst at scan position
    const triggerLocalDiscovery = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const originX = (rect.left + mousePosRef.current.x) / window.innerWidth;
        const originY = (rect.top + mousePosRef.current.y) / window.innerHeight;
        confetti({
          particleCount: 28,
          spread: 60,
          startVelocity: 18,
          ticks: 120,
          origin: { x: originX, y: originY },
          colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#FBBF24']
        });
      }
      setDiscoveryStarToast({
        x: mousePosRef.current.x,
        y: mousePosRef.current.y,
        name: data.popupName || data.name,
        emoji: data.emoji
      });
      setTimeout(() => setDiscoveryStarToast(null), 1800);
      sounds.playStar();
    };

    if (typeFilter === 'animal') {
      sounds.playCameraShutter();
      setCameraFlash(true);
      setTimeout(() => setCameraFlash(false), 240);
      setPolaroidSnap({
        data,
        x: mousePosRef.current.x,
        y: mousePosRef.current.y
      });
      setTimeout(() => setPolaroidSnap(null), 1600);
      if (!notebook.includes(data.id)) {
        triggerLocalDiscovery();
        setNotebook(prev => [...prev, data.id]);
      }
      openAnimalModal(data);
      return;
    }

    // Instant realistic camera snapshot for plants
    if (typeFilter === 'plant') {
      sounds.playCameraShutter();
      setCameraFlash(true);
      setTimeout(() => setCameraFlash(false), 240);
      setPolaroidSnap({
        data,
        x: mousePosRef.current.x,
        y: mousePosRef.current.y
      });
      setTimeout(() => setPolaroidSnap(null), 1600);

      const isAlreadyLogged = isBonus 
        ? bonusLog.includes(data.id) 
        : notebook.includes(data.id);

      if (!isAlreadyLogged) {
        triggerLocalDiscovery();
        logToNotebookDirect(data.id);
      }
      openPlantModal(data);
      return;
    }

    setIsHolding(true);
    setHoldProgress(0);
    let prog = 0;

    holdIntervalRef.current = setInterval(() => {
      prog += 8; // charges in ~1.2 seconds
      if (prog >= 100) {
        clearInterval(holdIntervalRef.current);
        setHoldProgress(100);
        setIsHolding(false);
        setScannedOrganism(data);
        setIsBonusScan(isBonus);
        setVerifyAnswer(null);
        setVerifyChecked(false);
        setVerifyCorrect(false);
      } else {
        setHoldProgress(prog);
      }
    }, 100);
  }, [filteredTargets, bonusLog, notebook, typeFilter, logToNotebookDirect, isSoundscapePlaying, startAllSoundscape]);

  // Smart Specimen Locator when clicking bottom specimen buttons
  const locateSpecimen = useCallback((t) => {
    setActiveSpecimenId(t.id);
    if (viewMode === 'garden_walk') {
      const targetX = (t.x / 100) * (containerSize.width || 600);
      const targetY = (t.y / 100) * (containerSize.height || 400);
      setMousePos({ x: targetX, y: targetY });
      mousePosRef.current = { x: targetX, y: targetY };
      setIsInsideImage(true);
      const hovered = { data: t, isBonus: false };
      setHoveredTarget(hovered);
      hoveredTargetRef.current = hovered;
      sounds.playScannerLock();

      setBeaconTargetId(t.id);
      setTimeout(() => setBeaconTargetId(null), 3000);

      if (notebook.includes(t.id)) {
        if (typeFilter === 'animal') {
          openAnimalModal(t);
        } else {
          openPlantModal(t);
        }
      } else {
        setMissMessage(`Target locked on ${t.emoji} ${t.name}! Click to take field snapshot 📸`);
        setMissPos({ x: targetX, y: targetY });
        setTimeout(() => setMissMessage(''), 2500);
      }
    } else {
      if (typeFilter === 'animal') {
        openAnimalModal(t);
      } else {
        openPlantModal(t);
      }
    }
  }, [containerSize, viewMode, notebook, typeFilter]);

  const logToNotebook = () => {
    if (!scannedOrganism) return;
    if (isBonusScan) {
      if (!bonusLog.includes(scannedOrganism.id)) {
        setBonusLog(prev => [...prev, scannedOrganism.id]);
      }
    } else {
      if (!notebook.includes(scannedOrganism.id)) {
        setNotebook(prev => [...prev, scannedOrganism.id]);
      }
    }
    if (scannedOrganism.type === 'plant') {
      openPlantModal(scannedOrganism);
    }
    setScannedOrganism(null);
    setVerifyAnswer(null);
    setVerifyChecked(false);
    setVerifyCorrect(false);
  };

  const handleReset = () => {
    setNotebook([]);
    setBonusLog([]);
    setScannedOrganism(null);
    stopHolding();
    setShowHints(false);
    setCategoryStep(0);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      fontFamily: 'var(--geo-font)',
      color: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* SVG Wave filter for scanner lens distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="scanner-waves">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

            {/* ============================================================ */}
      {/* SINGLE PAGE FULL-WIDTH LAYOUT (ZERO SPLIT, ZERO EMPTY SPACE)  */}
      {/* ============================================================ */}
      <div style={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* ============ PAGE 1: BOTANICAL CATEGORY SPOTLIGHT (HERBS / SHRUBS / TREES SINGLE PAGE EACH LIKE SLOGAN PAGE) ============ */}
        {subPage === 1 && (
          <div style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(8px, 1vh, 12px) clamp(16px, 2.2vw, 32px) clamp(12px, 1.6vh, 18px)',
              background: 'rgba(250, 248, 242, 0.55)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: 0,
              border: 'none',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              {/* Hanging Lush Corner Foliage (matching Slogan Page) */}
              <TopCornerFoliage side="left" />
              <TopCornerFoliage side="right" />

              {/* Soft Mountain Ridge Backdrop behind Title */}
              <TopMountainBackdrop />

              {/* Bottom Nature Silhouette Panorama along bottom edge */}
              <BottomNatureSilhouettes />

              {/* Header: Slogan Page Authentic Botanical Design (Center-aligned, Flanked by Vines, Badges, No top tabs) */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                flexShrink: 0,
                textAlign: 'center',
                borderBottom: '2px solid #14452F',
                paddingBottom: 'clamp(4px, 0.8vh, 8px)',
                marginBottom: 'clamp(6px, 0.9vh, 8px)'
              }}>
                {/* Fullscreen Button at Top-Right (matching Slogan Page) */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  title={fsActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '2px',
                    background: 'rgba(6, 78, 59, 0.90)',
                    backdropFilter: 'blur(8px)',
                    color: '#D1FAE5',
                    border: '1.5px solid #10B981',
                    borderRadius: '10px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.18s ease',
                    zIndex: 30
                  }}
                >
                  {fsActive ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                {/* Top Badges: CLASS 6 • SCIENCE and ACTIVITY 2.1 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    background: '#14452F',
                    color: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '3px 18px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '16px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(20, 69, 47, 0.28)'
                  }}>
                    CLASS 6 • SCIENCE
                  </div>
                  <div style={{
                    background: '#14452F',
                    color: '#FFFFFF',
                    borderRadius: '22px',
                    padding: '3px 18px',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '16px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    boxShadow: '0 2px 8px rgba(20, 69, 47, 0.28)'
                  }}>
                    {typeFilter === 'plant' ? 'ACTIVITY 2.1 · BOTANICAL FIELD WALK' : 'ACTIVITY 2.1 · ZOOLOGICAL FIELD WALK'}
                  </div>
                </div>

                {/* Main Title flanked by graceful Leafy Vine Branches */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <TitleVineBranch side="left" />
                  <h1 style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    color: '#14452F',
                    fontSize: '24px',
                    fontWeight: 900,
                    lineHeight: '1.2',
                    margin: 0,
                    textShadow: '0 2px 6px rgba(10, 59, 36, 0.10)'
                  }}>
                    {typeFilter === 'plant' ? '🌿 Exploring Diversity in Plants Around Us' : '🐾 Observing Diversity in Animals Around Us'}
                  </h1>
                  <TitleVineBranch side="right" />
                </div>

                {/* Botanical Sprout Motif directly beneath the title */}
                <TitleSprout />
              </div>

              {/* Single Category Spotlight Stage (Exact 70% image, 30% card allocation, 16px-24px font size, zero scroll) */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 70%) minmax(0, calc(30% - 12px))',
                gap: '12px',
                flex: 1,
                minHeight: 0,
                alignItems: 'stretch',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                {/* Left: High-Resolution Realistic Habitat Artwork (70% allocation) */}
                <div
                  onMouseMove={(e) => {
                    if (projectorZoom > 1) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                      setZoomOrigin({ x, y });
                    }
                  }}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    border: '2px solid rgba(20, 69, 47, 0.5)',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(20, 69, 47, 0.14)',
                    background: 'radial-gradient(ellipse at center, #0B3B24 0%, #03180F 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    cursor: projectorZoom > 1 ? 'crosshair' : 'zoom-in'
                  }}
                  onClick={() => {
                    setProjectorZoom(prev => (prev >= 3 ? 1 : prev + 1));
                  }}
                  title={projectorZoom > 1 ? "Click to toggle zoom level (1x, 1.8x, 2.6x)" : "Click to zoom into 8K botanical micro-details"}
                >
                  <img
                    src={currentCat.image}
                    alt={currentCat.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      transform: `scale(${projectorZoom === 1 ? 1 : projectorZoom === 2 ? 1.8 : 2.6})`,
                      transition: projectorZoom === 1 ? 'transform 0.3s ease-out' : 'transform 0.15s ease-out',
                      imageRendering: 'high-quality'
                    }}
                  />

                  {/* Projector Zoom Inspector Control */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 15,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setProjectorZoom(prev => (prev >= 3 ? 1 : prev + 1))}
                      title="Toggle Projector Zoom: 1x, 1.8x, 2.6x"
                      style={{
                        background: 'rgba(20, 69, 47, 0.90)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #10B981',
                        borderRadius: '16px',
                        padding: '5px 14px',
                        color: '#FFFFFF',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 800,
                        fontSize: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      {projectorZoom > 1 ? <ZoomOut size={16} color="#34D399" /> : <ZoomIn size={16} color="#34D399" />}
                      <span>{projectorZoom === 1 ? '1x Zoom' : projectorZoom === 2 ? '1.8x Zoom' : '2.6x Zoom'}</span>
                    </button>
                  </div>

                </div>

                {/* Right: Botanical Scientific Profile Card (30% allocation, zero scroll, 16px-24px fonts, no overlap) */}
                <div style={{
                  background: 'rgba(250, 248, 242, 0.55)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  borderRadius: '20px',
                  padding: 'clamp(6px, 1vh, 12px) clamp(8px, 1.1vw, 14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(20, 69, 47, 0.14)',
                  position: 'relative',
                  boxSizing: 'border-box'
                }}>
                  {/* Card Content Framed with clean layout, zero overlap, zero scroll, and 16px-24px fonts */}
                  <div style={{
                    position: 'relative',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    minHeight: 0
                  }}>
                    {/* Top Group: Pill Badge, Title, Leaf Divider & Description Quote */}
                    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                      {/* Top Pill Badge matching Header & Footer Buttons with Realistic Photographic Icon */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#14452F',
                          color: '#FFFFFF',
                          borderRadius: '22px',
                          padding: '2px 14px',
                          border: '1.5px solid #10B981',
                          fontFamily: '"Outfit", sans-serif',
                          fontWeight: 900,
                          fontSize: '16px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          boxShadow: '0 2px 8px rgba(20, 69, 47, 0.28)'
                        }}>
                          <RealisticCategoryIcon categoryId={currentCat.id} size={18} />
                          <span>{currentCat.tag}</span>
                        </div>
                      </div>

                      {/* Category Heading in Fraunces Serif (24px) */}
                      <h2 style={{
                        margin: '1px 0 2px 0',
                        fontFamily: '"Fraunces", Georgia, serif',
                        fontSize: '24px',
                        color: '#14452F',
                        fontWeight: 900,
                        textAlign: 'center',
                        lineHeight: '1.15'
                      }}>
                        {currentCat.name}
                      </h2>

                      {/* Ornate Leaf Divider matching Slogan Page */}
                      <CardLeafDivider />

                      {/* Slogan-Style Descriptive Quote Card (16px) */}
                      <div style={{
                        position: 'relative',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        border: '1.5px solid #14452F',
                        borderLeft: '4.5px solid #10B981',
                        padding: '4px 10px',
                        borderRadius: '9px',
                        marginTop: '2px',
                        boxShadow: '0 2px 8px rgba(20, 69, 47, 0.06)'
                      }}>
                        <p style={{
                          margin: 0,
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: '16px',
                          color: '#14452F',
                          lineHeight: '1.3',
                          fontStyle: 'italic',
                          fontWeight: 700,
                          padding: '0 2px'
                        }}>
                          "{currentCat.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Middle Group: Concise NCERT Field Observation to cover vertical space without overlap */}
                    <div style={{
                      position: 'relative',
                      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                      border: '1.5px solid #F59E0B',
                      borderRadius: '10px',
                      padding: '4px 10px',
                      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
                      <span style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '16px',
                        color: '#78350F',
                        fontWeight: 700,
                        lineHeight: '1.25'
                      }}>
                        {currentCat.id === 'herbs' ? 'Tender green stems bend easily; life cycle spans 1–2 seasons.' :
                         currentCat.id === 'shrubs' ? 'Woody stems branch near the base giving a bushy structure.' :
                         currentCat.id === 'trees' ? 'Single thick woody trunk; deep roots anchor a high crown.' :
                         currentCat.id === 'crawlers' ? 'Soil dwellers crawl and burrow to aerate rich garden earth.' :
                         currentCat.id === 'aerial' ? 'Lightweight hollow bones and wings enable soaring flight.' :
                         'Adapted limbs enable walking on land and swimming in ponds.'}
                      </span>
                    </div>

                    {/* Bottom Group: Visual Classification Pictogram Badges & NCERT Examples Box */}
                    <div style={{
                      position: 'relative',
                      background: 'rgba(255, 255, 255, 0.96)',
                      backdropFilter: 'blur(6px)',
                      border: '1.5px solid #14452F',
                      borderRadius: '12px',
                      padding: '5px 8px',
                      boxShadow: '0 4px 12px rgba(20, 69, 47, 0.07)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      flexShrink: 0
                    }}>
                      {/* Row of 3 Realistic Icon Badges: Perfectly 3-column grid without wrapping */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', alignItems: 'stretch' }}>
                        {/* Height / Specimen Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                          border: '1.5px solid #10B981', borderRadius: '9px',
                          padding: '4px 2px', minWidth: 0,
                          boxShadow: '0 2px 5px rgba(16, 185, 129, 0.12)'
                        }}>
                          <RealisticSpecimenMedallion categoryId={currentCat.id} size={24} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#064E3B', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Short' : currentCat.id === 'shrubs' ? 'Medium' : currentCat.id === 'trees' ? 'Tall' : currentCat.traits[0]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                        {/* Stem / Habitat Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                          border: '1.5px solid #F59E0B', borderRadius: '9px',
                          padding: '4px 2px', minWidth: 0,
                          boxShadow: '0 2px 5px rgba(245, 158, 11, 0.12)'
                        }}>
                          <RealisticTextureMedallion categoryId={currentCat.id} size={24} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#78350F', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Soft Stem' : currentCat.id === 'shrubs' ? 'Woody Base' : currentCat.id === 'trees' ? 'Thick Trunk' : currentCat.traits[1]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                        {/* Branching / Role Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
                          border: '1.5px solid #6366F1', borderRadius: '9px',
                          padding: '4px 2px', minWidth: 0,
                          boxShadow: '0 2px 5px rgba(99, 102, 241, 0.12)'
                        }}>
                          <RealisticRoleMedallion categoryId={currentCat.id} size={24} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#3730A3', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Few Branches' : currentCat.id === 'shrubs' ? 'Bushy Base' : currentCat.id === 'trees' ? 'High Crown' : currentCat.traits[2]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                      </div>

                      {/* NCERT Examples Tag Cloud (16px) */}
                      <div style={{
                        background: 'rgba(250, 248, 242, 0.98)',
                        border: '1.4px solid #14452F',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '6px'
                      }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: '#14452F', fontFamily: '"Outfit", sans-serif', flexShrink: 0 }}>📚 NCERT:</span>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F3822', fontFamily: '"Outfit", sans-serif', lineHeight: '1.25' }}>
                          {currentCat.traits[currentCat.traits.length - 1]?.value || ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Navigation Bar matching Slogan Theme (Unified Single Row, No Overlap, Font sizes 17px - 18px) */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1.8px solid #14452F',
                paddingTop: 'clamp(6px, 1vh, 10px)',
                marginTop: 'clamp(6px, 1vh, 10px)',
                paddingBottom: 'clamp(4px, 0.8vh, 8px)',
                gap: '12px',
                flexWrap: 'nowrap'
              }}>
                {/* Left Navigation Group: Previous Page, Back Category, Reset (Font sizes 17px) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {onBackToDashboard && (
                    <button
                      type="button"
                      onClick={onBackToDashboard}
                      style={{
                        padding: '8px 18px',
                        fontSize: '17px',
                        fontWeight: 800,
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(250, 248, 242, 0.65)',
                        border: '1.8px solid #14452F',
                        color: '#14452F',
                        cursor: 'pointer',
                        fontFamily: '"Outfit", sans-serif',
                        boxShadow: '0 2px 6px rgba(20, 69, 47, 0.12)',
                        transition: 'all 0.18s ease'
                      }}
                      title="Return to Previous Page"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={18} /> Previous Page
                    </button>
                  )}

                  {categoryStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCategoryStep(prev => Math.max(0, prev - 1))}
                      style={{
                        padding: '8px 16px',
                        fontSize: '17px',
                        fontWeight: 800,
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(250, 248, 242, 0.65)',
                        border: '1.5px solid #2D6A4F',
                        color: '#2D6A4F',
                        cursor: 'pointer',
                        fontFamily: '"Outfit", sans-serif',
                        boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <ChevronLeft size={16} /> Back ({categories[categoryStep - 1]?.name.split(' ')[0]})
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      padding: '8px 16px',
                      fontSize: '17px',
                      fontWeight: 800,
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(250, 248, 242, 0.65)',
                      border: '1.5px solid #14452F',
                      color: '#14452F',
                      cursor: 'pointer',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                      transition: 'all 0.18s ease'
                    }}
                    title="Reset to first category"
                  >
                    <RefreshCw size={16} /> Reset
                  </button>
                </div>

                {/* Center Stepper Progress Pill (Font size 17px) */}
                <div style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#14452F',
                  fontFamily: '"Outfit", sans-serif',
                  background: 'rgba(250, 248, 242, 0.65)',
                  border: '1.5px solid #14452F',
                  borderRadius: '20px',
                  padding: '5px 20px',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                  whiteSpace: 'nowrap'
                }}>
                  Step {categoryStep + 1} of {categories.length}: {currentCat.name}
                </div>

                {/* Right Navigation Group: Single Unified Next Button (Font size 18px) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {categoryStep < categories.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCategoryStep(prev => prev + 1)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 24px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                        border: '1.5px solid #10B981',
                        color: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                        fontFamily: '"Outfit", sans-serif',
                        transition: 'all 0.18s ease',
                        whiteSpace: 'nowrap'
                      }}
                      title={`Advance to ${categories[categoryStep + 1]?.name}`}
                      aria-label="Next Category"
                    >
                      <span>Next: {categories[categoryStep + 1]?.name.split(' ')[0]}</span>
                      <ChevronRight size={18} strokeWidth={2.6} />
                    </button>
                  ) : typeFilter === 'plant' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('garden_walk');
                        setSubPage(2);
                        startAllSoundscape();
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 24px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                        border: '1.5px solid #10B981',
                        color: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                        fontFamily: '"Outfit", sans-serif',
                        transition: 'all 0.18s ease',
                        whiteSpace: 'nowrap'
                      }}
                      title="Explore Botanical Field Scanner"
                      aria-label="Field Scanner"
                    >
                      <span>Next: Field Scanner</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  ) : onNextActivity ? (
                    <button
                      type="button"
                      onClick={onNextActivity}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 24px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                        border: '1.5px solid #10B981',
                        color: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                        fontFamily: '"Outfit", sans-serif',
                        transition: 'all 0.18s ease',
                        whiteSpace: 'nowrap'
                      }}
                      title="Advance to next activity"
                    >
                      <span>Complete &amp; Next Activity</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}

        {/* ============ PAGE 2: BOTANICAL GARDEN FIELD SCANNER (MATCHING LEAVES SLOGAN PAGE DESIGN) ============ */}
        {(subPage === 2 || subPage === 3) && (
          <div style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(6px, 1vh, 10px) clamp(10px, 1.4vw, 18px) clamp(10px, 1.4vh, 16px)',
            background: 'rgba(250, 248, 242, 0.55)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: 0,
            border: 'none',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* Hanging Lush Corner Foliage (matching Slogan Page) */}
            <TopCornerFoliage side="left" />
            <TopCornerFoliage side="right" />

            {/* Soft Mountain Ridge Backdrop behind Title */}
            <TopMountainBackdrop />

            {/* Bottom Nature Silhouette Panorama along bottom edge */}
            <BottomNatureSilhouettes />

            {/* Header: Slogan Page Authentic Botanical Design (Center-aligned, Flanked by Vines, Badges) */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
              textAlign: 'center',
              borderBottom: '2px solid #14452F',
              paddingBottom: 'clamp(4px, 0.8vh, 8px)',
              marginBottom: 'clamp(6px, 0.9vh, 8px)'
            }}>
              {/* Fullscreen Button at Top-Right */}
              <button
                type="button"
                onClick={toggleFullscreen}
                title={fsActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '2px',
                  background: 'rgba(6, 78, 59, 0.90)',
                  backdropFilter: 'blur(8px)',
                  color: '#D1FAE5',
                  border: '1.5px solid #10B981',
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.18s ease',
                  zIndex: 30
                }}
              >
                {fsActive ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              {/* Top Badges: CLASS 6 • SCIENCE and ACTIVITY 2.1 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '4px'
              }}>
                <div style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '22px',
                  padding: '3px 18px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(20, 69, 47, 0.28)'
                }}>
                  CLASS 6 • SCIENCE
                </div>
                <div style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '22px',
                  padding: '3px 18px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(20, 69, 47, 0.28)'
                }}>
                  {typeFilter === 'plant' ? 'ACTIVITY 2.1 · BOTANICAL FIELD SCANNER' : 'ACTIVITY 2.1 · ZOOLOGICAL FIELD SCANNER'}
                </div>
              </div>

              {/* Main Title flanked by graceful Leafy Vine Branches (24px Fraunces) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <TitleVineBranch side="left" />
                <h1 style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  color: '#14452F',
                  fontSize: '24px',
                  fontWeight: 900,
                  lineHeight: '1.2',
                  margin: 0,
                  textShadow: '0 2px 6px rgba(10, 59, 36, 0.10)'
                }}>
                  {typeFilter === 'plant' ? '🌿 Botanical Garden Field Walk & Scanner' : '🐾 Wildlife Field Walk & Scanner'}
                </h1>
                <TitleVineBranch side="right" />
              </div>

              {/* Botanical Sprout Motif directly beneath the title */}
              <TitleSprout />
            </div>

            {/* Navigation & Status Toolbar matching Slogan Page (18px typography, no text wrapping) */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'clamp(6px, 1vh, 8px)',
              flexShrink: 0,
              gap: 'clamp(6px, 0.8vw, 12px)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {/* Left: Back to Overview Button */}
              <button
                type="button"
                onClick={() => setSubPage(1)}
                style={{
                  padding: '7px 18px',
                  fontSize: '18px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(250, 248, 242, 0.65)',
                  border: '1.8px solid #14452F',
                  color: '#14452F',
                  cursor: 'pointer',
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <ChevronLeft size={20} /> Back: Overview
              </button>

              {/* Visual Emoji Progress Bar — Each specimen shown as a segment */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                background: 'rgba(250, 248, 242, 0.65)',
                border: '1.8px solid #14452F',
                borderRadius: '22px',
                padding: '4px 12px',
                boxShadow: notebook.length >= filteredTargets.length 
                  ? '0 0 16px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(20, 69, 47, 0.12)'
                  : '0 2px 6px rgba(20, 69, 47, 0.08)',
                flexShrink: 0,
                transition: 'box-shadow 0.5s ease'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#14452F', fontFamily: '"Outfit", sans-serif', marginRight: '6px' }}>
                  📷
                </span>
                {filteredTargets.map((t, idx) => {
                  const found = notebook.includes(t.id);
                  return (
                    <div key={t.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: found 
                        ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
                        : 'rgba(226, 232, 240, 0.5)',
                      border: found ? '2px solid #059669' : '1.5px dashed #94A3B8',
                      fontSize: '16px',
                      transition: 'all 0.4s ease',
                      transform: found ? 'scale(1)' : 'scale(0.85)',
                      opacity: found ? 1 : 0.45,
                      boxShadow: found ? '0 2px 8px rgba(5, 150, 105, 0.3)' : 'none',
                      animation: found ? 'starPop 0.4s ease-out' : 'none',
                      position: 'relative'
                    }}>
                      <span style={{ filter: found ? 'none' : 'grayscale(1)' }}>{t.emoji}</span>
                      {found && (
                        <div style={{
                          position: 'absolute', bottom: '-2px', right: '-2px',
                          width: '12px', height: '12px', borderRadius: '50%',
                          background: '#059669', border: '1.5px solid #ffffff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '8px', color: '#ffffff', fontWeight: 900
                        }}>✓</div>
                      )}
                    </div>
                  );
                })}
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#14452F', fontFamily: '"Outfit", sans-serif', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                  {notebook.length}/{filteredTargets.length}
                </span>
                {notebook.length >= filteredTargets.length && (
                  <span style={{ fontSize: '18px', marginLeft: '4px', animation: 'starPop 0.5s ease-out' }}>🌟</span>
                )}
              </div>

              {/* Right: Show Rings & Reset Controls */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                {/* Macro Zoom Switcher (18px font) */}
                <button
                  type="button"
                  onClick={() => setZoomLevel(z => z === 2.4 ? 4.8 : 2.4)}
                  style={{
                    padding: '7px 16px',
                    fontSize: '18px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: zoomLevel > 3 ? '#ECFDF5' : 'rgba(250, 248, 242, 0.55)',
                    border: zoomLevel > 3 ? '1.8px solid #10B981' : '1.8px solid #14452F',
                    color: zoomLevel > 3 ? '#065F46' : '#14452F',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                  title="Toggle between 2.4x Field Overview and 4.8x Macro Venation Zoom"
                >
                  {zoomLevel > 3 ? <ZoomIn size={20} color="#10B981" /> : <ZoomOut size={20} color="#14452F" />}
                  <span>{zoomLevel > 3 ? 'Macro 4.8x' : 'Field 2.4x'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowHints(h => !h)}
                  style={{
                    padding: '7px 16px',
                    fontSize: '18px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(250, 248, 242, 0.65)',
                    border: '1.8px solid #14452F',
                    color: '#14452F',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <Eye size={20} /> {showHints ? 'Hide Rings' : 'Show Rings'}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: '7px 16px',
                    fontSize: '18px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(250, 248, 242, 0.65)',
                    border: '1.8px solid #14452F',
                    color: '#14452F',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <RefreshCw size={18} /> Reset
                </button>

                {/* Looping ambient nature sound audio element */}
                <audio ref={natureAudioRef} src={natureForestAudio} loop preload="auto" />

                {notebook.length >= filteredTargets.length && (
                  <button
                    type="button"
                    onClick={onNextActivity || onNextSection || onBackToDashboard}
                    style={{
                      padding: '8px 24px',
                      borderRadius: '10px',
                      fontSize: '19px',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                      fontFamily: '"Outfit", sans-serif',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {typeFilter === 'plant' ? (
                      <>Table 2.1 Complete! Continue <ChevronRight size={20} /></>
                    ) : (
                      <>🎉 Walk Completed! Proceed <ArrowRight size={20} /></>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Photographic Garden Scanner Stage Flanked by Slogan-Page Botanical Cards */}
            <div style={{ 
              flex: 1, 
              minHeight: 0, 
              position: 'relative', 
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: 'clamp(8px, 1.2vw, 16px)',
              overflow: 'hidden',
              zIndex: 10,
              width: '100%',
              boxSizing: 'border-box'
            }}>

              {/* CENTER / MAIN: Exact-Aspect Interactive Scanner Board (100% Fully Visible — Crow & All Organisms Completely Shown) */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseDown={startHolding}
                onMouseUp={stopHolding}
                onMouseLeave={() => { setIsInsideImage(false); stopHolding(); setHoveredTarget(null); }}
                onMouseEnter={() => setIsInsideImage(true)}
                style={{ 
                  height: '100%',
                  width: 'auto',
                  aspectRatio: typeFilter === 'plant' ? '1538 / 1023' : '1643 / 957',
                  maxWidth: 'calc(100% - clamp(250px, 24vw, 310px))',
                  maxHeight: '100%',
                  cursor: 'none', 
                  userSelect: 'none', 
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  background: '#041d13',
                  boxShadow: '0 12px 32px rgba(20, 69, 47, 0.18)',
                  flexShrink: 1
                }}
              >
                {/* Inline keyframe animations for living garden atmosphere & DSLR optics */}
                <style>{`
                  @keyframes pollenFloat {
                    0% { transform: translateY(0px) translateX(0px) scale(0.9); opacity: 0.35; }
                    50% { transform: translateY(-16px) translateX(10px) scale(1.15); opacity: 0.85; }
                    100% { transform: translateY(-30px) translateX(-6px) scale(0.95); opacity: 0.4; }
                  }
                  @keyframes pollenDrift {
                    0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.2; }
                    30% { transform: translateY(-12px) translateX(8px) rotate(40deg); opacity: 0.7; }
                    60% { transform: translateY(-22px) translateX(-4px) rotate(80deg); opacity: 0.5; }
                    100% { transform: translateY(-36px) translateX(6px) rotate(120deg); opacity: 0.15; }
                  }
                  @keyframes dandelionSeed {
                    0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.7; }
                    50% { transform: translateY(-40px) translateX(20px) rotate(180deg); opacity: 0.5; }
                    90% { opacity: 0.2; }
                    100% { transform: translateY(-70px) translateX(-10px) rotate(360deg); opacity: 0; }
                  }
                  @keyframes realisticLeafDrift1 {
                    0% {
                      transform: translateY(-35px) translateX(0px) rotateZ(-25deg) rotateY(0deg) rotateX(15deg);
                      opacity: 0;
                    }
                    8% {
                      opacity: 0.85;
                    }
                    22% {
                      transform: translateY(110px) translateX(32px) rotateZ(30deg) rotateY(85deg) rotateX(-10deg);
                    }
                    44% {
                      transform: translateY(240px) translateX(-18px) rotateZ(-35deg) rotateY(190deg) rotateX(25deg);
                      opacity: 0.9;
                    }
                    66% {
                      transform: translateY(390px) translateX(40px) rotateZ(28deg) rotateY(290deg) rotateX(-18deg);
                    }
                    88% {
                      transform: translateY(540px) translateX(-5px) rotateZ(-20deg) rotateY(345deg) rotateX(12deg);
                      opacity: 0.7;
                    }
                    100% {
                      transform: translateY(700px) translateX(25px) rotateZ(45deg) rotateY(420deg) rotateX(-5deg);
                      opacity: 0;
                    }
                  }
                  @keyframes realisticLeafDrift2 {
                    0% {
                      transform: translateY(-35px) translateX(0px) rotateZ(20deg) rotateX(0deg) rotateY(0deg);
                      opacity: 0;
                    }
                    10% {
                      opacity: 0.85;
                    }
                    25% {
                      transform: translateY(120px) translateX(-38px) rotateZ(-40deg) rotateX(50deg) rotateY(95deg);
                    }
                    48% {
                      transform: translateY(270px) translateX(30px) rotateZ(32deg) rotateX(-40deg) rotateY(210deg);
                      opacity: 0.88;
                    }
                    70% {
                      transform: translateY(430px) translateX(-28px) rotateZ(-30deg) rotateX(35deg) rotateY(310deg);
                    }
                    90% {
                      transform: translateY(580px) translateX(15px) rotateZ(22deg) rotateX(-20deg) rotateY(380deg);
                      opacity: 0.65;
                    }
                    100% {
                      transform: translateY(700px) translateX(-8px) rotateZ(-35deg) rotateX(25deg) rotateY(440deg);
                      opacity: 0;
                    }
                  }
                  @keyframes fireflyGlow {
                    0%, 100% { opacity: 0; transform: scale(0.6); }
                    20% { opacity: 0.9; transform: scale(1.2); }
                    50% { opacity: 0.4; transform: scale(0.9); }
                    80% { opacity: 0.95; transform: scale(1.1); }
                  }
                  @keyframes cameraFlashAnim {
                    0% { opacity: 0.85; }
                    100% { opacity: 0; }
                  }
                  @keyframes microShake {
                    0%, 100% { transform: translate(0, 0); }
                    20% { transform: translate(-2px, 1px); }
                    40% { transform: translate(2px, -1px); }
                    60% { transform: translate(-1px, 2px); }
                    80% { transform: translate(1px, -1px); }
                  }
                  @keyframes beaconGlow {
                    0% { transform: translate(-50%, -50%) scale(0.88); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
                    100% { transform: translate(-50%, -50%) scale(0.88); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                  }
                  @keyframes sunbeamBreathe {
                    0%, 100% { opacity: 0.5; transform: rotate(-24deg) scaleY(1); }
                    50% { opacity: 0.85; transform: rotate(-23deg) scaleY(1.06); }
                  }
                  @keyframes waterRipplePulse {
                    0% { transform: scale(0.6); opacity: 0.85; }
                    60% { opacity: 0.45; }
                    100% { transform: scale(2.4); opacity: 0; }
                  }
                  @keyframes waterCaustics {
                    0% { opacity: 0.35; transform: scale(1) translateY(0); }
                    50% { opacity: 0.7; transform: scale(1.05) translateY(-3px); }
                    100% { opacity: 0.35; transform: scale(1) translateY(0); }
                  }
                  @keyframes grassBreeze {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(3deg) skewX(2deg); }
                  }
                  @keyframes autofocusLock {
                    0% { transform: scale(1.4); opacity: 0.3; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  @keyframes polaroidFly {
                    0% { transform: translate(-50%, -50%) scale(0.35) rotate(-12deg); opacity: 0; }
                    20% { transform: translate(-50%, -50%) scale(1.08) rotate(2deg); opacity: 1; }
                    45% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
                    80% { transform: translate(140px, 90px) scale(0.65) rotate(10deg); opacity: 0.9; }
                    100% { transform: translate(280px, 180px) scale(0.18) rotate(22deg); opacity: 0; }
                  }
                  @keyframes starPop {
                    0% { transform: scale(0) rotate(-30deg); opacity: 0; }
                    50% { transform: scale(1.3) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                  }
                  @keyframes breathingHint {
                    0%, 100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.7; box-shadow: 0 0 14px rgba(255, 213, 74, 0.7), inset 0 0 6px rgba(255, 213, 74, 0.3); }
                    50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; box-shadow: 0 0 28px rgba(255, 213, 74, 1), inset 0 0 14px rgba(255, 213, 74, 0.6); }
                  }
                  @keyframes nameSpringBounce {
                    0% { transform: translateX(-50%) scale(0.75); opacity: 0; }
                    60% { transform: translateX(-50%) scale(1.08); opacity: 1; }
                    100% { transform: translateX(-50%) scale(1); opacity: 1; }
                  }
                  @keyframes goldenHourShift {
                    0%, 100% { opacity: 0.12; }
                    50% { opacity: 0.28; }
                  }
                  @keyframes discoveryStarFloat {
                    0% { transform: translateX(-50%) scale(0.6) translateY(8px); opacity: 0; }
                    20% { transform: translateX(-50%) scale(1.08) translateY(-6px); opacity: 1; }
                    35% { transform: translateX(-50%) scale(1) translateY(-10px); opacity: 1; }
                    80% { transform: translateX(-50%) scale(1) translateY(-26px); opacity: 0.95; }
                    100% { transform: translateX(-50%) scale(0.9) translateY(-42px); opacity: 0; }
                  }
                `}</style>

                {/* Nature Walk Scene Background */}
                <img
                  src={typeFilter === 'plant' ? activityPlantsImage : activityAnimalsImage}
                  alt="Nature Walk Scene"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center',
                    display: 'block', 
                    pointerEvents: 'none', 
                    userSelect: 'none' 
                  }}
                  draggable={false}
                />

                {/* 1. Volumetric Golden Sunbeams (God Rays) */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  overflow: 'hidden',
                  zIndex: 4,
                  mixBlendMode: 'screen'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40%',
                    left: '-20%',
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(ellipse at 15% 15%, rgba(254, 240, 138, 0.28) 0%, rgba(253, 224, 71, 0.12) 35%, transparent 70%)',
                    transformOrigin: 'top left',
                    animation: 'sunbeamBreathe 9s ease-in-out infinite'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '10%',
                    width: '140px',
                    height: '150%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(254, 240, 138, 0.12) 40%, transparent 80%)',
                    transform: 'rotate(-26deg)',
                    transformOrigin: 'top left',
                    filter: 'blur(16px)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '32%',
                    width: '180px',
                    height: '150%',
                    background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.18) 0%, rgba(253, 224, 71, 0.08) 45%, transparent 85%)',
                    transform: 'rotate(-24deg)',
                    transformOrigin: 'top left',
                    filter: 'blur(20px)'
                  }} />
                </div>

                {/* 2. Pond Water Caustics & Animated Ripples (Bottom-Left Pond) */}
                {typeFilter === 'plant' && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '38%',
                    height: '42%',
                    pointerEvents: 'none',
                    zIndex: 4,
                    overflow: 'hidden'
                  }}>
                    {/* Water Caustics Light Glimmer */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at 45% 65%, rgba(186, 230, 253, 0.35) 0%, rgba(56, 189, 248, 0.14) 50%, transparent 80%)',
                      mixBlendMode: 'screen',
                      animation: 'waterCaustics 6.5s ease-in-out infinite alternate'
                    }} />

                    {/* Concentric Ripple Waves over Water Lilies */}
                    <div style={{
                      position: 'absolute',
                      left: '42%',
                      top: '64%',
                      width: '56px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1.8px solid rgba(255, 255, 255, 0.75)',
                      boxShadow: '0 0 8px rgba(186, 230, 253, 0.6)',
                      animation: 'waterRipplePulse 4.2s ease-out infinite'
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '42%',
                      top: '64%',
                      width: '56px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1.8px solid rgba(186, 230, 253, 0.8)',
                      animation: 'waterRipplePulse 4.2s ease-out infinite',
                      animationDelay: '2.1s'
                    }} />

                    {/* Secondary gentle ripple near edge */}
                    <div style={{
                      position: 'absolute',
                      left: '20%',
                      top: '48%',
                      width: '42px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1.6px solid rgba(224, 242, 254, 0.7)',
                      animation: 'waterRipplePulse 5s ease-out infinite',
                      animationDelay: '1.2s'
                    }} />
                  </div>
                )}

                {/* Living Breeze Grass Sway Aura (Bottom-Right Corner) */}
                <div style={{
                  position: 'absolute',
                  right: '4%',
                  bottom: '4%',
                  width: '72px',
                  height: '72px',
                  pointerEvents: 'none',
                  zIndex: 5,
                  transformOrigin: 'bottom center',
                  animation: 'grassBreeze 5s ease-in-out infinite alternate'
                }} />

                {/* Living Garden Nature Motes — Golden Pollen, Green Spores, White Dandelion Seeds, Fireflies */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
                  {/* Golden Pollen Dust (warm, floating upward) */}
                  {[
                    { x: '24%', y: '28%', delay: '0s', size: 5, dur: '6s' },
                    { x: '42%', y: '18%', delay: '1.4s', size: 7, dur: '7.2s' },
                    { x: '56%', y: '32%', delay: '0.8s', size: 6, dur: '6.5s' },
                    { x: '72%', y: '22%', delay: '3.1s', size: 5, dur: '8s' },
                    { x: '84%', y: '38%', delay: '1.9s', size: 4, dur: '6.2s' },
                    { x: '30%', y: '58%', delay: '1.1s', size: 5, dur: '7.5s' },
                    { x: '64%', y: '62%', delay: '3.4s', size: 6, dur: '8.5s' },
                    { x: '48%', y: '46%', delay: '2.2s', size: 4, dur: '7s' },
                    { x: '12%', y: '52%', delay: '4.0s', size: 5, dur: '9s' },
                    { x: '90%', y: '55%', delay: '0.5s', size: 4, dur: '6.8s' }
                  ].map((p, idx) => (
                    <div key={`pollen-${idx}`} style={{
                      position: 'absolute', left: p.x, top: p.y,
                      width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 220, 0.95) 0%, rgba(254, 240, 138, 0.5) 60%, transparent 100%)',
                      boxShadow: '0 0 8px rgba(254, 240, 138, 0.7)',
                      animation: `pollenFloat ${p.dur} ease-in-out infinite alternate`,
                      animationDelay: p.delay
                    }} />
                  ))}
                  {/* Green Spore Particles (organic, drifting) */}
                  {[
                    { x: '18%', y: '65%', delay: '0.6s', size: 4, dur: '8s' },
                    { x: '38%', y: '72%', delay: '2.8s', size: 5, dur: '9.5s' },
                    { x: '62%', y: '48%', delay: '1.5s', size: 3, dur: '7.2s' },
                    { x: '78%', y: '68%', delay: '3.8s', size: 4, dur: '8.8s' },
                    { x: '8%', y: '34%', delay: '4.5s', size: 3, dur: '10s' }
                  ].map((p, idx) => (
                    <div key={`spore-${idx}`} style={{
                      position: 'absolute', left: p.x, top: p.y,
                      width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(134, 239, 172, 0.9) 0%, rgba(34, 197, 94, 0.4) 60%, transparent 100%)',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)',
                      animation: `pollenDrift ${p.dur} ease-in-out infinite alternate`,
                      animationDelay: p.delay
                    }} />
                  ))}
                  {/* White Dandelion Seed Wisps (delicate, rising slowly) */}
                  {[
                    { x: '28%', y: '80%', delay: '0s', dur: '12s' },
                    { x: '52%', y: '75%', delay: '4s', dur: '14s' },
                    { x: '74%', y: '82%', delay: '7s', dur: '11s' },
                    { x: '40%', y: '88%', delay: '2s', dur: '13s' }
                  ].map((p, idx) => (
                    <div key={`seed-${idx}`} style={{
                      position: 'absolute', left: p.x, top: p.y,
                      width: '3px', height: '3px', borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.3)',
                      animation: `dandelionSeed ${p.dur} ease-in-out infinite`,
                      animationDelay: p.delay
                    }} />
                  ))}
                  {/* Firefly Glow Points (warm evening ambiance) */}
                  {[
                    { x: '15%', y: '45%', delay: '1s', dur: '4s' },
                    { x: '68%', y: '35%', delay: '2.5s', dur: '5s' },
                    { x: '82%', y: '60%', delay: '0s', dur: '3.5s' },
                    { x: '45%', y: '70%', delay: '3.5s', dur: '4.5s' },
                    { x: '25%', y: '20%', delay: '5s', dur: '3.8s' }
                  ].map((p, idx) => (
                    <div key={`firefly-${idx}`} style={{
                      position: 'absolute', left: p.x, top: p.y,
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(250, 240, 137, 1) 0%, rgba(250, 204, 21, 0.6) 40%, transparent 70%)',
                      boxShadow: '0 0 12px rgba(250, 204, 21, 0.8), 0 0 24px rgba(250, 204, 21, 0.3)',
                      animation: `fireflyGlow ${p.dur} ease-in-out infinite`,
                      animationDelay: p.delay
                    }} />
                  ))}
                </div>

                {/* Gentle Drifting Leaf Rain — Realistic 3D Tumbling Botanical Foliage */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5, perspective: '800px' }}>
                  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                      <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2D6A4F" />
                        <stop offset="60%" stopColor="#1B4332" />
                        <stop offset="100%" stopColor="#081C15" />
                      </linearGradient>
                      <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#52B788" />
                        <stop offset="50%" stopColor="#40916C" />
                        <stop offset="100%" stopColor="#1B4332" />
                      </linearGradient>
                      <linearGradient id="leafGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#74C69D" />
                        <stop offset="65%" stopColor="#52B788" />
                        <stop offset="100%" stopColor="#2D6A4F" />
                      </linearGradient>
                      <linearGradient id="leafGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4A373" />
                        <stop offset="40%" stopColor="#CCD5AE" />
                        <stop offset="100%" stopColor="#52796F" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {[
                    { x: '9%', delay: '0s', dur: '12.5s', w: 18, h: 25, grad: 'url(#leafGrad1)', anim: 'realisticLeafDrift1', type: 'rose' },
                    { x: '24%', delay: '4.2s', dur: '14s', w: 15, h: 28, grad: 'url(#leafGrad2)', anim: 'realisticLeafDrift2', type: 'slender' },
                    { x: '41%', delay: '8.5s', dur: '13s', w: 20, h: 26, grad: 'url(#leafGrad3)', anim: 'realisticLeafDrift1', type: 'broad' },
                    { x: '58%', delay: '1.8s', dur: '15.5s', w: 16, h: 24, grad: 'url(#leafGrad4)', anim: 'realisticLeafDrift2', type: 'rose' },
                    { x: '73%', delay: '6.5s', dur: '13.5s', w: 14, h: 27, grad: 'url(#leafGrad2)', anim: 'realisticLeafDrift1', type: 'slender' },
                    { x: '88%', delay: '3.1s', dur: '16s', w: 19, h: 25, grad: 'url(#leafGrad1)', anim: 'realisticLeafDrift2', type: 'broad' },
                    { x: '33%', delay: '10.2s', dur: '14.5s', w: 17, h: 23, grad: 'url(#leafGrad3)', anim: 'realisticLeafDrift1', type: 'rose' },
                    { x: '67%', delay: '11.8s', dur: '15s', w: 15, h: 26, grad: 'url(#leafGrad4)', anim: 'realisticLeafDrift2', type: 'slender' }
                  ].map((leaf, idx) => (
                    <div
                      key={`leaf-${idx}`}
                      style={{
                        position: 'absolute',
                        left: leaf.x,
                        top: '-35px',
                        width: `${leaf.w}px`,
                        height: `${leaf.h}px`,
                        animation: `${leaf.anim} ${leaf.dur} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                        animationDelay: leaf.delay,
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.22))',
                        willChange: 'transform, opacity'
                      }}
                    >
                      {leaf.type === 'rose' && (
                        <svg viewBox="0 0 24 32" width="100%" height="100%" fill="none">
                          <path
                            d="M12 2 C7 7, 2 15, 4 23 C5 27, 9 29, 12 30 C15 29, 19 27, 20 23 C22 15, 17 7, 12 2 Z"
                            fill={leaf.grad}
                          />
                          <path d="M12 30 C12 24, 12 12, 12 3" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
                          <path d="M12 11 C8 9, 5 12, 5 15" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" strokeLinecap="round" />
                          <path d="M12 17 C8 15, 6 18, 6 21" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" strokeLinecap="round" />
                          <path d="M12 11 C16 9, 19 12, 19 15" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" strokeLinecap="round" />
                          <path d="M12 17 C16 15, 18 18, 18 21" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" strokeLinecap="round" />
                          <path d="M12 30 L12 32" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      )}
                      {leaf.type === 'slender' && (
                        <svg viewBox="0 0 20 34" width="100%" height="100%" fill="none">
                          <path
                            d="M10 1 C6 7, 3 16, 5 26 C6 30, 8 32, 10 33 C12 32, 14 30, 15 26 C17 16, 14 7, 10 1 Z"
                            fill={leaf.grad}
                          />
                          <path d="M10 33 C10 26, 10 12, 10 2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" strokeLinecap="round" />
                          <path d="M10 12 C7 10, 5 13, 6 16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.65" strokeLinecap="round" />
                          <path d="M10 19 C7 17, 5 20, 6 23" stroke="rgba(255,255,255,0.2)" strokeWidth="0.65" strokeLinecap="round" />
                          <path d="M10 12 C13 10, 15 13, 14 16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.65" strokeLinecap="round" />
                          <path d="M10 19 C13 17, 15 20, 14 23" stroke="rgba(255,255,255,0.2)" strokeWidth="0.65" strokeLinecap="round" />
                        </svg>
                      )}
                      {leaf.type === 'broad' && (
                        <svg viewBox="0 0 26 32" width="100%" height="100%" fill="none">
                          <path
                            d="M13 2 C7 6, 2 13, 3 21 C4 26, 9 29, 13 30 C17 29, 22 26, 23 21 C24 13, 19 6, 13 2 Z"
                            fill={leaf.grad}
                          />
                          <path d="M13 30 C13 22, 13 10, 13 3" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" strokeLinecap="round" />
                          <path d="M13 9 C8 7, 5 10, 5 14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
                          <path d="M13 16 C8 14, 5 17, 6 21" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
                          <path d="M13 9 C18 7, 21 10, 21 14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
                          <path d="M13 16 C18 14, 21 17, 20 21" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Golden Hour Warm Ambient Light Shift */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
                  background: 'radial-gradient(ellipse at 30% 20%, rgba(254, 243, 199, 0.18) 0%, transparent 60%)',
                  animation: 'goldenHourShift 12s ease-in-out infinite alternate'
                }} />

                {/* Smart Beacon Highlight when located from bottom buttons */}
                {beaconTargetId && (
                  (() => {
                    const bTarget = filteredTargets.find(t => t.id === beaconTargetId);
                    if (!bTarget) return null;
                    return (
                      <div style={{
                        position: 'absolute',
                        left: `${bTarget.x}%`,
                        top: `${bTarget.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: '3px solid #10B981',
                        animation: 'beaconGlow 1.2s infinite ease-in-out',
                        pointerEvents: 'none',
                        zIndex: 18,
                        boxShadow: '0 0 25px #10B981, inset 0 0 15px #34D399'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '105%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(6, 78, 59, 0.95)',
                          color: '#ffffff',
                          border: '1.5px solid #34D399',
                          borderRadius: '8px',
                          padding: '4px 12px',
                          fontSize: '16px',
                          fontWeight: 900,
                          fontFamily: '"Outfit", sans-serif',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                          pointerEvents: 'none'
                        }}>
                          🎯 {bTarget.popupName || bTarget.name}
                        </div>
                      </div>
                    );
                  })()
                )}

                {/* Breathing Gold Hint Rings with Spring-Bounce Specimen Names */}
                {showHints && filteredTargets.map(t => {
                  const isAnimal = typeFilter === 'animal';
                  const ringSize = isAnimal 
                    ? { width: '60px', height: '60px' }
                    : { width: '42px', height: '42px' };
                  const isHovered = hoveredTarget && hoveredTarget.data.id === t.id;
                  return (
                    <div
                      key={`hint-${t.id}`}
                      style={{
                        position: 'absolute',
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        border: isHovered ? '3.5px solid #34D399' : '3px solid #FFD54A',
                        boxShadow: isHovered 
                          ? '0 0 24px rgba(52, 211, 153, 1), inset 0 0 12px rgba(52, 211, 153, 0.5), 0 0 40px rgba(52, 211, 153, 0.3)'
                          : '0 0 16px rgba(255, 213, 74, 0.9), inset 0 0 8px rgba(255, 213, 74, 0.4)',
                        animation: isHovered ? 'none' : 'breathingHint 2.2s infinite ease-in-out',
                        pointerEvents: 'none',
                        zIndex: 8,
                        transition: 'border 0.3s ease, box-shadow 0.3s ease',
                        ...ringSize
                      }}
                    >
                      {/* Specimen Name Tag — Spring-Bounce on Hover */}
                      <div style={{
                        position: 'absolute',
                        bottom: '112%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: isHovered ? 'rgba(6, 78, 59, 0.96)' : 'rgba(15, 23, 42, 0.88)',
                        color: '#ffffff',
                        border: isHovered ? '2px solid #34D399' : '1.5px solid #fde047',
                        borderRadius: '10px',
                        padding: isHovered ? '5px 14px' : '3px 10px',
                        fontSize: isHovered ? '18px' : '16px',
                        fontWeight: '800',
                        fontFamily: '"Outfit", sans-serif',
                        whiteSpace: 'nowrap',
                        boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.35)',
                        pointerEvents: 'none',
                        animation: isHovered ? 'nameSpringBounce 0.35s ease-out forwards' : 'none',
                        transition: 'all 0.25s ease'
                      }}>
                        {t.emoji} {t.popupName || t.name.split(' ')[0]} {isHovered && '🎯'}
                      </div>
                    </div>
                  );
                })}

                {/* Scanned target badges with Specimen Names (16px Font) */}
                {typeFilter === 'plant' && filteredTargets.map(t => {
                  const logged = notebook.includes(t.id);
                  if (!logged) return null;
                  return (
                    <div key={`chk-${t.id}`} style={{
                      position: 'absolute',
                      left: `${t.x}%`,
                      top: `${t.y}%`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(5, 150, 105, 0.95)',
                      border: '1.5px solid #ffffff',
                      borderRadius: '12px',
                      padding: '3px 10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                      pointerEvents: 'none',
                      zIndex: 10,
                    }}>
                      <CheckCircle size={16} color="#ffffff" strokeWidth={3} />
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', fontFamily: '"Outfit", sans-serif', whiteSpace: 'nowrap' }}>
                        {t.emoji} {t.popupName || t.name.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}

                {/* Camera Shutter Flash Effect with Micro-Shake */}
                {cameraFlash && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#ffffff',
                    pointerEvents: 'none',
                    zIndex: 50,
                    animation: 'cameraFlashAnim 0.24s ease-out forwards'
                  }} />
                )}

                {/* Specimen target notification float (16px Font) */}
                {missMessage && (
                  <div style={{ 
                    position: 'absolute', 
                    left: `${missPos.x}px`, 
                    top: `${Math.max(16, missPos.y - 40)}px`, 
                    transform: 'translateX(-50%)', 
                    background: 'rgba(6, 78, 59, 0.96)', 
                    border: '1.5px solid #34D399',
                    color: '#ffffff', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '10px', 
                    fontSize: '16px', 
                    fontWeight: '800', 
                    fontFamily: '"Outfit", sans-serif', 
                    pointerEvents: 'none', 
                    zIndex: 35,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                    whiteSpace: 'nowrap'
                  }}>
                    {missMessage}
                  </div>
                )}

                {/* Flying Polaroid Journal Snap Animation on Discovery */}
                {polaroidSnap && (
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    pointerEvents: 'none',
                    zIndex: 60,
                    animation: 'polaroidFly 2.2s ease-in-out forwards'
                  }}>
                    <div style={{
                      background: '#ffffff',
                      padding: '10px 10px 18px 10px',
                      borderRadius: '8px',
                      boxShadow: '0 20px 45px rgba(0,0,0,0.45), 0 0 0 2px #10B981',
                      width: '200px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '180px',
                        height: '140px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        background: '#064E3B',
                        margin: '0 auto 8px auto'
                      }}>
                        {(polaroidSnap.data?.specimenPhoto || (typeFilter === 'plant' ? PLANT_CROPPED_IMAGES[polaroidSnap.data?.id] : ANIMAL_IMAGE_ASSETS[polaroidSnap.data?.id])) ? (
                          <img
                            src={polaroidSnap.data?.specimenPhoto || (typeFilter === 'plant' ? PLANT_CROPPED_IMAGES[polaroidSnap.data?.id] : ANIMAL_IMAGE_ASSETS[polaroidSnap.data?.id])}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ fontSize: '48px', lineHeight: '140px' }}>{polaroidSnap.data?.emoji}</div>
                        )}
                      </div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#D1FAE5',
                        color: '#065F46',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 900,
                        fontFamily: '"Outfit", sans-serif',
                        marginBottom: '4px'
                      }}>
                        <span>✓ VERIFIED</span>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 900,
                        color: '#1F2937',
                        fontFamily: '"Outfit", sans-serif'
                      }}>
                        {polaroidSnap.data?.popupName || polaroidSnap.data?.name}
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Discovery Star Toast ("✨ +1 Discovered!") */}
                {discoveryStarToast && (
                  <div style={{
                    position: 'absolute',
                    left: `${discoveryStarToast.x}px`,
                    top: `${Math.max(20, discoveryStarToast.y - 48)}px`,
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
                    border: '2px solid #34D399',
                    borderRadius: '24px',
                    padding: '6px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(52, 211, 153, 0.4)',
                    pointerEvents: 'none',
                    zIndex: 65,
                    animation: 'discoveryStarFloat 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  }}>
                    <span style={{ fontSize: '20px' }}>🌟</span>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#FDE047',
                      fontFamily: '"Outfit", sans-serif',
                      whiteSpace: 'nowrap'
                    }}>
                      +1 Cataloged!
                    </span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#A7F3D0',
                      fontFamily: '"Outfit", sans-serif',
                      whiteSpace: 'nowrap'
                    }}>
                      {discoveryStarToast.emoji} {discoveryStarToast.name}
                    </span>
                  </div>
                )}

                {/* State-of-the-Art Pro DSLR Field Camera Loupe */}
                {isInsideImage && (
                  <div style={{
                    position: 'absolute',
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '144px',
                    height: '144px',
                    borderRadius: '50%',
                    border: hoveredTarget ? '3.5px solid #10B981' : '3px solid #059669',
                    pointerEvents: 'none',
                    zIndex: 25,
                    overflow: 'hidden',
                    boxShadow: hoveredTarget 
                      ? '0 0 0 4px rgba(16, 185, 129, 0.5), 0 14px 34px rgba(0, 0, 0, 0.55), inset 0 0 24px rgba(16, 185, 129, 0.4)' 
                      : '0 0 0 3px rgba(5, 150, 105, 0.35), 0 10px 26px rgba(0, 0, 0, 0.45)',
                    background: '#041d13'
                  }}>
                    {/* Optical Magnified Viewport with Variable Zoom (2.4x Field / 4.8x Macro) */}
                    {containerSize.width > 0 && containerSize.height > 0 && (
                      <div style={{
                        position: 'absolute',
                        width: `${containerSize.width * zoomLevel}px`,
                        height: `${containerSize.height * zoomLevel}px`,
                        left: `${-(mousePos.x * zoomLevel) + 72}px`,
                        top: `${-(mousePos.y * zoomLevel) + 72}px`,
                        pointerEvents: 'none'
                      }}>
                        <img
                          src={typeFilter === 'plant' ? activityPlantsImage : activityAnimalsImage}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            display: 'block'
                          }}
                        />
                      </div>
                    )}

                    {/* DSLR Outer Bezel Ring & Knurled Lens Markings */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '5px solid rgba(15, 23, 42, 0.75)',
                      pointerEvents: 'none'
                    }} />

                    {/* Lens Bezel Printed Telemetry */}
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '16px',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: 800,
                      color: 'rgba(255, 255, 255, 0.92)',
                      letterSpacing: '1px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.85)',
                      whiteSpace: 'nowrap'
                    }}>
                      {zoomLevel}x · f/2.8
                    </div>

                    {/* Optical Lens Glass Reflection Shimmer */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.06) 52%, rgba(0, 0, 0, 0.45) 100%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Reticle Crosshairs */}
                    <div style={{ position: 'absolute', left: '50%', top: '16px', bottom: '16px', width: '1.5px', background: 'rgba(255, 255, 255, 0.55)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '16px', right: '16px', height: '1.5px', background: 'rgba(255, 255, 255, 0.55)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

                    {/* 4 Autofocus Lock Brackets snapping inward when Target Locked */}
                    {hoveredTarget ? (
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '42px',
                        height: '42px',
                        pointerEvents: 'none',
                        animation: 'autofocusLock 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                      }}>
                        {/* Top-Left Bracket */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '2.5px solid #34D399', borderLeft: '2.5px solid #34D399' }} />
                        {/* Top-Right Bracket */}
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: '2.5px solid #34D399', borderRight: '2.5px solid #34D399' }} />
                        {/* Bottom-Left Bracket */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: '2.5px solid #34D399', borderLeft: '2.5px solid #34D399' }} />
                        {/* Bottom-Right Bracket */}
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '2.5px solid #34D399', borderRight: '2.5px solid #34D399' }} />
                        {/* Center Target Dot */}
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
                      </div>
                    ) : (
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1.5px dashed rgba(255,255,255,0.7)',
                        pointerEvents: 'none'
                      }} />
                    )}

                    {/* Scanner In-Lens Action Badge with Specimen Name (18px Font) */}
                    {hoveredTarget && (
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(6, 78, 59, 0.96)',
                        backdropFilter: 'blur(4px)',
                        border: '1.5px solid #34D399',
                        borderRadius: '12px',
                        padding: '4px 14px',
                        fontSize: '18px',
                        fontWeight: 900,
                        fontFamily: '"Outfit", sans-serif',
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.55)'
                      }}>
                        <span>📸 SNAP · {hoveredTarget.data.emoji} {hoveredTarget.data.popupName || hoveredTarget.data.name}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Floating Target Identification Tag above Loupe (20px Font) */}
                {isInsideImage && hoveredTarget && (
                  <div style={{
                    position: 'absolute',
                    left: `${mousePos.x}px`,
                    top: `${Math.max(14, mousePos.y - 88)}px`,
                    transform: 'translateX(-50%)',
                    background: 'rgba(6, 78, 59, 0.98)',
                    border: '2px solid #34D399',
                    borderRadius: '12px',
                    padding: '5px 16px',
                    fontSize: '20px',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                    pointerEvents: 'none',
                    zIndex: 28
                  }}>
                    <span>🎯 {hoveredTarget.data.emoji} {hoveredTarget.data.popupName || hoveredTarget.data.name} Locked</span>
                  </div>
                )}


              </div>

              {/* RIGHT WING: Vertical Specimen Directory Panel (16px to 24px Typography) */}
              <div style={{
                flex: '0 0 clamp(240px, 23vw, 295px)',
                width: 'clamp(240px, 23vw, 295px)',
                height: '100%',
                background: 'rgba(250, 248, 242, 0.55)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '2px solid rgba(20, 69, 47, 0.5)',
                borderRadius: '20px',
                boxShadow: '0 10px 28px rgba(20, 69, 47, 0.12), inset 0 0 0 1.5px rgba(20, 69, 47, 0.08)',
                padding: '14px 12px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                gap: '10px'
              }}>
                {/* Corner Leaf Sprigs */}
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-right" />

                {/* Header: Title & Progress Count */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderBottom: '1.5px solid rgba(20, 69, 47, 0.15)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 5
                }}>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#14452F',
                      fontFamily: '"Fraunces", Georgia, serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{typeFilter === 'plant' ? '🌿' : '🐾'}</span>
                      <span>{typeFilter === 'plant' ? 'Specimens' : 'Wildlife'}</span>
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#4B5563',
                      fontFamily: '"Outfit", sans-serif',
                      marginTop: '2px'
                    }}>
                      Tap to locate on canvas
                    </div>
                  </div>

                  {/* Discovered Counter Badge */}
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    color: '#065F46',
                    background: '#D1FAE5',
                    border: '1.5px solid #10B981',
                    borderRadius: '14px',
                    padding: '4px 10px',
                    whiteSpace: 'nowrap'
                  }}>
                    {notebook.length}/{filteredTargets.length}
                  </div>
                </div>

                {/* Vertical Scrollable List of Specimen Buttons (Hibiscus, Neem, Grass, Rose, etc.) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  flex: 1,
                  overflowY: 'auto',
                  paddingRight: '2px',
                  position: 'relative',
                  zIndex: 5
                }}>
                  {filteredTargets.map((t) => {
                    const logged = notebook.includes(t.id);
                    const isHovered = hoveredTarget && hoveredTarget.data?.id === t.id;
                    const isSelected = activeSpecimenId === t.id || beaconTargetId === t.id || isHovered;

                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => locateSpecimen(t)}
                        style={{
                          fontSize: '18px',
                          fontFamily: '"Outfit", sans-serif',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #10B981' : (logged ? '1.8px solid #A7F3D0' : '1.8px solid #14452F'),
                          background: isSelected
                            ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
                            : (logged ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' : '#FFFFFF'),
                          color: isSelected ? '#FFFFFF' : '#14452F',
                          boxShadow: isSelected
                            ? '0 4px 14px rgba(20, 69, 47, 0.35)'
                            : '0 2px 6px rgba(20, 69, 47, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: isSelected ? '900' : '800',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease',
                          outline: 'none',
                          userSelect: 'none',
                          textAlign: 'left',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                          <span style={{ fontSize: '24px', flexShrink: 0 }}>{t.emoji}</span>
                          <span style={{
                            fontSize: '18px',
                            fontWeight: isSelected ? '900' : '800',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {t.popupName || t.name}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: '6px' }}>
                          {logged ? (
                            <CheckCircle size={20} color={isSelected ? '#34D399' : '#059669'} strokeWidth={2.8} />
                          ) : isSelected ? (
                            <span style={{
                              fontSize: '13px',
                              background: '#10B981',
                              color: '#FFFFFF',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontWeight: 900
                            }}>
                              LOCKED
                            </span>
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BOTTOM NAVIGATION BAR: Next, Previous Page & Back Buttons without overlap (16px to 24px Typography) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1.8px solid #14452F',
              paddingTop: 'clamp(6px, 0.8vh, 10px)',
              marginTop: 'clamp(6px, 0.8vh, 10px)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 20,
              gap: '10px',
              flexWrap: 'nowrap',
              boxSizing: 'border-box'
            }}>
              {/* Left Group: Previous Page & Back to Overview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {onBackToDashboard ? (
                  <button
                    type="button"
                    onClick={onBackToDashboard}
                    style={{
                      padding: '8px 18px',
                      fontSize: '16px',
                      fontWeight: 800,
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(250, 248, 242, 0.65)',
                      border: '1.8px solid #14452F',
                      color: '#14452F',
                      cursor: 'pointer',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.10)',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap'
                    }}
                    title="Return to Previous Page"
                    aria-label="Previous Page"
                  >
                    <ArrowLeft size={18} strokeWidth={2.4} /> Previous Page
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSubPage(1)}
                    style={{
                      padding: '8px 18px',
                      fontSize: '16px',
                      fontWeight: 800,
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(250, 248, 242, 0.65)',
                      border: '1.8px solid #14452F',
                      color: '#14452F',
                      cursor: 'pointer',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.10)',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap'
                    }}
                    title="Return to Previous Page"
                    aria-label="Previous Page"
                  >
                    <ArrowLeft size={18} strokeWidth={2.4} /> Previous Page
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSubPage(1)}
                  style={{
                    padding: '8px 18px',
                    fontSize: '16px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(250, 248, 242, 0.65)',
                    border: '1.8px solid #2D6A4F',
                    color: '#2D6A4F',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap'
                  }}
                  title="Back to Overview"
                  aria-label="Back to Overview"
                >
                  <ChevronLeft size={18} strokeWidth={2.6} /> Back: Overview
                </button>
              </div>

              {/* Right Group: Next Page */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {onNextActivity && (
                  <button
                    type="button"
                    onClick={onNextActivity}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 22px',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      color: '#ffffff',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
                      fontFamily: '"Outfit", sans-serif',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap'
                    }}
                    title="Advance to Next Page"
                    aria-label="Next Page"
                  >
                    <span>{typeFilter === 'plant' ? 'Next Page: Act 2.1 Animals' : 'Next Page: Act 2.2 Appreciating'}</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>


            {/* SCANNED SPECIMEN VERIFICATION MODAL OVERLAY (Slogan theme, strictly 16px to 24px typography) */}
            {scannedOrganism && (
              <div style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999999,
                background: 'rgba(20, 69, 47, 0.45)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  maxWidth: '580px',
                  width: '100%',
                  maxHeight: '90vh',
                  background: 'rgba(250, 248, 242, 0.55)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  borderRadius: '20px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  boxShadow: '0 25px 50px -12px rgba(20, 69, 47, 0.4)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  overflowY: 'auto'
                }}>
                  {/* Modal Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #14452F', paddingBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '24px' }}>{scannedOrganism.emoji}</span>
                      <div>
                        <span style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#14452F', fontWeight: '900', display: 'block', fontFamily: '"Outfit", sans-serif' }}>
                          Specimen Discovery Verified
                        </span>
                        <h3 style={{ margin: 0, fontSize: '24px', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif', fontWeight: '900' }}>
                          {scannedOrganism.name}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setScannedOrganism(null)}
                      style={{
                        background: 'rgba(250, 248, 242, 0.65)',
                        border: '1.8px solid #14452F',
                        color: '#14452F',
                        borderRadius: '10px',
                        padding: '0.45rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.18s ease'
                      }}
                      title="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Specimen Description (18px) */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(6px)',
                    border: '1.8px solid #14452F',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    boxShadow: '0 4px 12px rgba(20, 69, 47, 0.08)'
                  }}>
                    <p style={{
                      fontSize: '18px',
                      color: '#14452F',
                      fontWeight: '600',
                      margin: 0,
                      lineHeight: '1.5',
                      fontFamily: '"Outfit", sans-serif',
                      textAlign: 'justify',
                      textJustify: 'inter-word'
                    }}>
                      {scannedOrganism.details}
                    </p>
                  </div>

                  {/* NCERT Verification Question (18px) */}
                  {scannedOrganism.verifyQ && (
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      border: '1.8px solid #14452F',
                      borderRadius: '14px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 4px 12px rgba(20, 69, 47, 0.08)'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#14452F', fontFamily: '"Outfit", sans-serif' }}>
                        ❓ Verification Check: {scannedOrganism.verifyQ.q}
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                        {scannedOrganism.verifyQ.opts.map((opt, i) => {
                          const isSelected = verifyAnswer === i;
                          let bg = 'rgba(250, 248, 242, 0.55)';
                          let border = '1.8px solid #14452F';
                          let color = '#14452F';

                          if (verifyChecked) {
                            if (i === scannedOrganism.verifyQ.correct) {
                              bg = '#D1FAE5';
                              border = '2px solid #059669';
                              color = '#064E3B';
                            } else if (isSelected) {
                              bg = '#FEE2E2';
                              border = '2px solid #DC2626';
                              color = '#991B1B';
                            }
                          } else if (isSelected) {
                            bg = 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)';
                            border = '1.8px solid #10B981';
                            color = '#FFFFFF';
                          }

                          return (
                            <button
                              key={i}
                              disabled={verifyChecked}
                              onClick={() => setVerifyAnswer(i)}
                              style={{
                                textAlign: 'left',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                border,
                                background: bg,
                                color,
                                fontWeight: isSelected ? '900' : '700',
                                fontSize: '18px',
                                fontFamily: '"Outfit", sans-serif',
                                cursor: verifyChecked ? 'default' : 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Modal Action Buttons (18px) */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '2px solid #14452F', paddingTop: '0.75rem' }}>
                    <button
                      onClick={() => setScannedOrganism(null)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: '800',
                        fontFamily: '"Outfit", sans-serif',
                        background: 'rgba(250, 248, 242, 0.65)',
                        border: '1.8px solid #14452F',
                        color: '#14452F',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(20, 69, 47, 0.08)'
                      }}
                    >
                      Cancel
                    </button>
                    {isBonusScan ? (
                      <button
                        onClick={logToNotebook}
                        style={{
                          padding: '8px 24px',
                          borderRadius: '10px',
                          fontSize: '18px',
                          fontWeight: '900',
                          fontFamily: '"Outfit", sans-serif',
                          background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                          border: '1.5px solid #10B981',
                          color: '#ffffff',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
                        }}
                      >
                        Log Bonus
                      </button>
                    ) : !verifyChecked ? (
                      <button
                        disabled={verifyAnswer === null}
                        onClick={() => {
                          setVerifyChecked(true);
                          setVerifyCorrect(verifyAnswer === scannedOrganism.verifyQ.correct);
                        }}
                        style={{
                          padding: '8px 24px',
                          borderRadius: '10px',
                          fontSize: '18px',
                          fontWeight: '900',
                          fontFamily: '"Outfit", sans-serif',
                          background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                          border: '1.5px solid #10B981',
                          color: '#ffffff',
                          cursor: verifyAnswer === null ? 'not-allowed' : 'pointer',
                          opacity: verifyAnswer === null ? 0.5 : 1,
                          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
                        }}
                      >
                        Verify Answer
                      </button>
                    ) : (
                      <button
                        onClick={logToNotebook}
                        disabled={!verifyCorrect}
                        style={{
                          padding: '8px 24px',
                          borderRadius: '10px',
                          fontSize: '18px',
                          fontWeight: '900',
                          fontFamily: '"Outfit", sans-serif',
                          background: verifyCorrect ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : '#DC2626',
                          border: verifyCorrect ? '1.5px solid #10B981' : '1.5px solid #EF4444',
                          color: '#ffffff',
                          cursor: verifyCorrect ? 'pointer' : 'not-allowed',
                          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
                        }}
                      >
                        {verifyCorrect ? '📔 Log in Table 2.1' : '❌ Incorrect — Try Again'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Textbook Table 2.1 Plant Observations Popup Modal (Unified Single-Page Layout: 70% Image & 30% Content) */}
      {infoCardPlant && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999999,
            background: 'rgba(20, 69, 47, 0.45)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setInfoCardPlant(null)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1360px',
              height: '92vh',
              maxHeight: '740px',
              background: 'rgba(250, 248, 242, 0.55)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: '20px',
              border: '2px solid rgba(20, 69, 47, 0.5)',
              boxShadow: '0 25px 60px rgba(20, 69, 47, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              color: '#14452F',
              fontFamily: '"Outfit", sans-serif',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top Bar Header (Slogan Page Botanical Design) */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.75rem',
              borderBottom: '2.5px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {/* Corner Hanging Foliage (matching Slogan Page) */}
              <TopCornerFoliage side="left" />
              <TopCornerFoliage side="right" />

              {/* Mountain Backdrop */}
              <TopMountainBackdrop />

              {/* Title Content Flanked by Vines & Badges */}
              <div style={{ 
                position: 'relative', 
                zIndex: 5, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem' 
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  border: '2px solid #10B981',
                  boxShadow: '0 4px 12px rgba(20, 69, 47, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  lineHeight: '1',
                  flexShrink: 0
                }}>
                  {infoCardPlant.emoji}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TitleVineBranch side="left" />
                    <h2 style={{ 
                      margin: 0, 
                      fontSize: '24px', 
                      fontWeight: '900', 
                      color: '#14452F', 
                      fontFamily: '"Fraunces", Georgia, serif', 
                      lineHeight: '1.2',
                      letterSpacing: '-0.01em'
                    }}>
                      {infoCardPlant.popupName || infoCardPlant.name}
                    </h2>
                    <TitleVineBranch side="right" />
                    
                    <span style={{
                      fontSize: '16px',
                      color: 'rgba(250, 248, 242, 0.55)',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      padding: '4px 16px',
                      borderRadius: '16px',
                      border: '1.5px solid #10B981',
                      boxShadow: '0 2px 8px rgba(20, 69, 47, 0.2)',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      Textbook Table 2.1
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <TitleSprout />
                    <span style={{ fontSize: '16px', color: '#064E3B', fontWeight: '800', fontFamily: '"Outfit", sans-serif' }}>
                      Botanical Field Observations &amp; High-Resolution Specimen
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button matching Slogan Page */}
              <button 
                onClick={() => setInfoCardPlant(null)}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  background: 'rgba(250, 248, 242, 0.65)',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  color: '#14452F',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 3px 10px rgba(20, 69, 47, 0.15)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#14452F';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(250, 248, 242, 0.55)';
                  e.currentTarget.style.color = '#14452F';
                }}
                title="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* Single Page Layout: 70% Image & 30% Content Allocation */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '7fr 3fr',
              gap: '16px',
              padding: '1rem 1.5rem',
              boxSizing: 'border-box',
              alignItems: 'stretch',
              overflow: 'hidden'
            }}>
              {/* Left 70%: High-Resolution Photographic Specimen Image Framed in Slogan Theme */}
              <div style={{
                position: 'relative',
                height: '100%',
                borderRadius: '20px',
                border: '2.5px solid rgba(20, 69, 47, 0.5)',
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                boxShadow: '0 8px 24px rgba(20, 69, 47, 0.12)'
              }}>
                {/* Botanical Leaf Corner Accents */}
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />
                <CardCornerLeaves position="bottom-right" />

                <img 
                  src={PLANT_CROPPED_IMAGES[infoCardPlant.id] || PLANT_CROPPED_IMAGES[infoCardPlant.name]} 
                  alt={infoCardPlant.name} 
                  style={{ 
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain', 
                    objectPosition: 'center',
                    filter: 'drop-shadow(0 14px 28px rgba(20, 69, 47, 0.15))'
                  }} 
                />
              </div>

              {/* Right 30%: NCERT Table 2.1 Field Observations Stack (Leaf-Designed Boxes) */}
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '8px',
                overflowY: 'auto'
              }}>
                {/* 1. STEM CARD (Leaf-Designed Box) */}
                <div style={{ 
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #F4FBF7 50%, #E8F8EE 100%)', 
                  padding: '8px 12px', 
                  borderRadius: '24px 6px 24px 6px', 
                  border: '2px solid rgba(20, 69, 47, 0.5)', 
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.85, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
                  </svg>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)',
                      flexShrink: 0
                    }}>
                      <Sprout color="#34D399" size={16} strokeWidth={2.6} />
                    </div>
                    <span style={{
                      fontSize: '16px',
                      color: '#14452F',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      • STEM
                    </span>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '6px 10px',
                    color: '#14452F',
                    fontWeight: '600',
                    fontSize: '16px',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: '1.38',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    boxShadow: 'inset 0 1px 3px rgba(20, 69, 47, 0.05)'
                  }}>
                    {infoCardPlant.tableInfo?.stem || '—'}
                  </div>
                </div>

                {/* 2. LEAVES CARD (Leaf-Designed Box) */}
                <div style={{ 
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #F4FBF7 50%, #E8F8EE 100%)', 
                  padding: '8px 12px', 
                  borderRadius: '24px 6px 24px 6px', 
                  border: '2px solid rgba(20, 69, 47, 0.5)', 
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.85, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
                  </svg>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)',
                      flexShrink: 0
                    }}>
                      <Leaf color="#34D399" size={16} strokeWidth={2.6} />
                    </div>
                    <span style={{
                      fontSize: '16px',
                      color: '#14452F',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      • LEAVES
                    </span>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '6px 10px',
                    color: '#14452F',
                    fontWeight: '600',
                    fontSize: '16px',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: '1.38',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    boxShadow: 'inset 0 1px 3px rgba(20, 69, 47, 0.05)'
                  }}>
                    {infoCardPlant.tableInfo?.leaves || '—'}
                  </div>
                </div>

                {/* 3. FLOWERS CARD (Leaf-Designed Box) */}
                <div style={{ 
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #F4FBF7 50%, #E8F8EE 100%)', 
                  padding: '8px 12px', 
                  borderRadius: '24px 6px 24px 6px', 
                  border: '2px solid rgba(20, 69, 47, 0.5)', 
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.85, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
                  </svg>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)',
                      flexShrink: 0
                    }}>
                      <Flower2 color="#34D399" size={16} strokeWidth={2.6} />
                    </div>
                    <span style={{
                      fontSize: '16px',
                      color: '#14452F',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      • FLOWERS
                    </span>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '6px 10px',
                    color: '#14452F',
                    fontWeight: '600',
                    fontSize: '16px',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: '1.38',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    boxShadow: 'inset 0 1px 3px rgba(20, 69, 47, 0.05)'
                  }}>
                    {infoCardPlant.tableInfo?.flowers || '—'}
                  </div>
                </div>

                {/* 4. OTHER OBSERVATIONS CARD (Leaf-Designed Box) */}
                <div style={{ 
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #F4FBF7 50%, #E8F8EE 100%)', 
                  padding: '8px 12px', 
                  borderRadius: '24px 6px 24px 6px', 
                  border: '2px solid rgba(20, 69, 47, 0.5)', 
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.85, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
                  </svg>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 2
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)',
                      flexShrink: 0
                    }}>
                      <BookOpen color="#34D399" size={16} strokeWidth={2.6} />
                    </div>
                    <span style={{
                      fontSize: '16px',
                      color: '#14452F',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      • OTHER OBSERVATIONS
                    </span>
                  </div>

                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '6px 10px',
                    color: '#14452F',
                    fontWeight: '600',
                    fontSize: '16px',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: '1.38',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    boxShadow: 'inset 0 1px 3px rgba(20, 69, 47, 0.05)'
                  }}>
                    {infoCardPlant.tableInfo?.notes || '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Slogan Page Aesthetic with Silhouettes & Controls */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1.75rem',
              borderTop: '2.5px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {/* Bottom Nature Silhouette Panorama */}
              <BottomNatureSilhouettes />

              {/* Left Subtitle Badge in Slogan Theme */}
              <div style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(250, 248, 242, 0.9)',
                backdropFilter: 'blur(4px)',
                padding: '4px 14px',
                borderRadius: '12px',
                border: '1.2px solid #14452F'
              }}>
                <Sprout color="#10B981" size={18} strokeWidth={2.6} />
                <span style={{
                  fontSize: '16px',
                  color: '#14452F',
                  fontWeight: '800',
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  Living World Diversity · Table 2.1 Botanical Record
                </span>
              </div>

              {/* Close Button matching Slogan Page */}
              <button
                onClick={() => setInfoCardPlant(null)}
                style={{
                  position: 'relative',
                  zIndex: 5,
                  padding: '8px 28px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  border: '2px solid #10B981',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '16px',
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(20, 69, 47, 0.35)',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 69, 47, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 69, 47, 0.35)';
                }}
              >
                ✓ Close &amp; Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Textbook Table 2.2 Animal Information Card Modal (Slogan Page Zoological Design) */}
      {infoCardAnimal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999999,
            background: 'rgba(20, 69, 47, 0.45)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setInfoCardAnimal(null)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1360px',
              height: '92vh',
              maxHeight: '740px',
              background: 'rgba(250, 248, 242, 0.55)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: '20px',
              border: '2px solid rgba(20, 69, 47, 0.5)',
              boxShadow: '0 25px 60px rgba(20, 69, 47, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              color: '#14452F',
              fontFamily: '"Outfit", sans-serif',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top Bar Header (Slogan Page Zoological Design) */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.75rem',
              borderBottom: '2.5px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {/* Corner Hanging Foliage (matching Slogan Page) */}
              <TopCornerFoliage side="left" />
              <TopCornerFoliage side="right" />

              {/* Mountain Backdrop */}
              <TopMountainBackdrop />

              {/* Title Content Flanked by Vines & Badges */}
              <div style={{ 
                position: 'relative', 
                zIndex: 5, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem' 
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  border: '2px solid #10B981',
                  boxShadow: '0 4px 12px rgba(20, 69, 47, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  lineHeight: '1',
                  flexShrink: 0
                }}>
                  {infoCardAnimal.emoji}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TitleVineBranch side="left" />
                    <h2 style={{ 
                      margin: 0, 
                      fontSize: '24px', 
                      fontWeight: '900', 
                      color: '#14452F', 
                      fontFamily: '"Fraunces", Georgia, serif', 
                      lineHeight: '1.2',
                      letterSpacing: '-0.01em'
                    }}>
                      {infoCardAnimal.popupName || infoCardAnimal.name}
                    </h2>
                    <TitleVineBranch side="right" />
                    
                    <span style={{
                      fontSize: '16px',
                      color: 'rgba(250, 248, 242, 0.55)',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      padding: '4px 16px',
                      borderRadius: '16px',
                      border: '1.5px solid #10B981',
                      boxShadow: '0 2px 8px rgba(20, 69, 47, 0.2)',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      Textbook Table 2.2
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <TitleSprout />
                    <span style={{ fontSize: '16px', color: '#064E3B', fontWeight: '800', fontFamily: '"Outfit", sans-serif' }}>
                      Zoological Field Observations &amp; High-Resolution Specimen
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button matching Slogan Page */}
              <button 
                onClick={() => setInfoCardAnimal(null)}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  background: 'rgba(250, 248, 242, 0.65)',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  color: '#14452F',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 3px 10px rgba(20, 69, 47, 0.15)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#14452F';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(250, 248, 242, 0.55)';
                  e.currentTarget.style.color = '#14452F';
                }}
                title="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* Single Page Layout: 70% Image & 30% Content Allocation */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '7fr 3fr',
              gap: '16px',
              padding: '1rem 1.5rem',
              boxSizing: 'border-box',
              alignItems: 'stretch',
              overflow: 'hidden'
            }}>
              {/* Left 70%: High-Resolution Animal Specimen Image */}
              <div style={{
                position: 'relative',
                height: '100%',
                borderRadius: '20px',
                border: '2.5px solid rgba(20, 69, 47, 0.5)',
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                boxShadow: '0 8px 24px rgba(20, 69, 47, 0.12)'
              }}>
                {/* Botanical/Nature Leaf Corner Accents */}
                <CardCornerLeaves position="top-left" />
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />
                <CardCornerLeaves position="bottom-right" />

                <img 
                  src={infoCardAnimal.img || ANIMAL_IMAGE_ASSETS[infoCardAnimal.id] || ANIMAL_IMAGE_ASSETS[infoCardAnimal.name]} 
                  alt={infoCardAnimal.name} 
                  style={{ 
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain', 
                    objectPosition: 'center',
                    filter: 'drop-shadow(0 14px 28px rgba(20, 69, 47, 0.15))'
                  }} 
                />
              </div>

              {/* Right 30%: NCERT Table 2.2 Animal Observations Stack (Leaf-Designed Boxes) */}
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                overflowY: 'auto'
              }}>
                {/* 1. Animal Description & Behavior Card (Leaf-Designed Box) */}
                <div style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #F4FBF7 50%, #E8F8EE 100%)',
                  padding: '10px 14px',
                  borderRadius: '24px 6px 24px 6px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flex: 1,
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.85, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
                  </svg>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 2 }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                      border: '1.5px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)',
                      flexShrink: 0
                    }}>
                      <Footprints size={16} color="#34D399" />
                    </div>
                    <div style={{ fontSize: '16px', color: '#14452F', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"Outfit", sans-serif' }}>
                      • DESCRIPTION &amp; BEHAVIOR
                    </div>
                  </div>

                  <div style={{ 
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '16px', 
                    color: '#14452F', 
                    fontWeight: '600', 
                    lineHeight: '1.45', 
                    fontFamily: '"Outfit", sans-serif',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '8px 12px'
                  }}>
                    {infoCardAnimal.details}
                  </div>
                </div>

                {/* 2. Did You Know Card (Leaf-Designed Box) */}
                <div style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #ffffff 0%, #FFFDF5 50%, #FEF9E7 100%)',
                  padding: '10px 14px',
                  borderRadius: '24px 6px 24px 6px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.10), inset 0 0 10px rgba(245, 158, 11, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flex: 1,
                  overflow: 'hidden'
                }}>
                  {/* Decorative Leaf Vein Corner Motif */}
                  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" style={{ position: 'absolute', top: 2, right: 4, opacity: 0.75, pointerEvents: 'none' }}>
                    <path d="M4 32 C12 26, 20 18, 30 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 22 C18 18, 24 18, 28 12" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M20 16 C24 12, 28 10, 30 6" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M28 8 C22 6, 16 10, 14 16 C20 16, 26 12, 28 8 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                  </svg>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 2 }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      border: '1.5px solid #FDE68A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)',
                      flexShrink: 0
                    }}>
                      <Lightbulb size={16} color="#ffffff" />
                    </div>
                    <div style={{ fontSize: '16px', color: '#B45309', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: '"Outfit", sans-serif' }}>
                      💡 DID YOU KNOW?
                    </div>
                  </div>

                  <div style={{ 
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '16px', 
                    color: '#14452F', 
                    fontWeight: '600', 
                    lineHeight: '1.45', 
                    fontFamily: '"Outfit", sans-serif',
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    background: 'rgba(250, 248, 242, 0.96)',
                    border: '1.4px solid #14452F',
                    borderRadius: '14px 4px 14px 4px',
                    padding: '8px 12px'
                  }}>
                    {infoCardAnimal.fact}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Slogan Page Aesthetic with Silhouettes & Controls */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1.75rem',
              borderTop: '2.5px solid #14452F',
              background: 'rgba(250, 248, 242, 0.55)',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              {/* Bottom Nature Silhouette Panorama */}
              <BottomNatureSilhouettes />

              {/* Left Subtitle Badge in Slogan Theme */}
              <div style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(250, 248, 242, 0.9)',
                backdropFilter: 'blur(4px)',
                padding: '4px 14px',
                borderRadius: '12px',
                border: '1.2px solid #14452F'
              }}>
                <Footprints color="#10B981" size={18} strokeWidth={2.6} />
                <span style={{
                  fontSize: '16px',
                  color: '#14452F',
                  fontWeight: '800',
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  Living World Diversity · Table 2.2 Zoological Record
                </span>
              </div>

              {/* Close Button matching Slogan Page */}
              <button
                onClick={() => setInfoCardAnimal(null)}
                style={{
                  position: 'relative',
                  zIndex: 5,
                  padding: '8px 28px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  border: '2px solid #10B981',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '16px',
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(20, 69, 47, 0.35)',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 69, 47, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 69, 47, 0.35)';
                }}
              >
                ✓ Close &amp; Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes hintGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; box-shadow: 0 0 14px rgba(255, 213, 74, 0.9), inset 0 0 8px rgba(255, 213, 74, 0.4); }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; box-shadow: 0 0 22px rgba(255, 213, 74, 1), inset 0 0 12px rgba(255, 213, 74, 0.6); }
        }
      `}</style>

      {/* Full-Screen Image Viewer / Lightbox */}
      {lightboxImage && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              title="Close full-screen view"
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                zIndex: 10,
                background: 'rgba(15, 23, 42, 0.9)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
              }}
            >
              ✕
            </button>
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt} 
              style={{ 
                maxWidth: '90vw', 
                maxHeight: '85vh', 
                objectFit: 'contain', 
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
