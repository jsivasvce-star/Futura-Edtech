import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RefreshCw, Volume2, VolumeX, CheckCircle, ChevronRight, ChevronLeft, Award, ArrowLeft, BookOpen, Target, Eye, EyeOff, ArrowRight, Sprout, Leaf, Flower2, Sparkles, Footprints, Lightbulb, ZoomIn, ZoomOut } from 'lucide-react';
import confetti from 'canvas-confetti';
import useWordSyncAudio from '../narration/useWordSyncAudio';
import NarratedWords from '../narration/NarratedWords';
import herbsNarrationAudio from '../narration/audio/14_TenderGreenHerbs.mp3';
import herbsNarrationData from '../narration/herbsNarration.json';
import shrubsNarrationAudio from '../narration/audio/15_BushyWoodyShrubs.mp3';
import shrubsNarrationData from '../narration/shrubsNarration.json';
import treesNarrationAudio from '../narration/audio/16_ToweringWoodyTrees.mp3';
import treesNarrationData from '../narration/treesNarration.json';
import { Play, Pause } from 'lucide-react';
import activityPlantsImage from '../../../../../assets/2.1_plant.png';
import activityAnimalsImage from '../DiversityInTheLivingWorldNew/images/ch2_activity_2.1_animals_8k.jpg';
import natureForestAudio from '../../../../../assets/nature_forest_sound.mp3';
import ch2GardenPanorama from '../../../../../assets/ch2_garden_panorama.jpg';
import ch2BiodiversityHero from '../../../../../assets/ch2_biodiversity_hero.jpg';
import ch2CrawlersHabitat from '../../../../../assets/ch2_crawlers_habitat.jpg';
import ch2AerialHabitat from '../../../../../assets/ch2_aerial_habitat.jpg';
import ch2WalkersHabitat from '../../../../../assets/ch2_walkers_habitat.jpg';
import ch2HerbsHabitat from '../../../../../assets/ch2_herbs_habitat_8k.jpg';
import activity21HerbsImg from '../../../../../assets/activity_2.1_herbs.png';
import activity21ShrubsImg from '../../../../../assets/activity_2.1_shrubs.png';
import activity21TreesImg from '../../../../../assets/activity_2.1_trees.png';
import activity21FieldScannerImg from '../../../../../assets/activity_2.1_field_scanner.png';
import activity21CrawlersImg from '../../../../../assets/activity_2.1_crawlers.png';
import ch2CrawlersSnailFullscreen from '../DiversityInTheLivingWorldNew/images/ch2_crawlers_snail_fullscreen.jpg';
import activity21AerialImg from '../../../../../assets/activity_2.1_aerial.png';
import activity21WalkersImg from '../../../../../assets/activity_2.1_walkers.png';
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
import BotanicalPlantSpecimenModal from './components/BotanicalPlantSpecimenModal';
import ZoologicalAnimalSpecimenModal from './components/ZoologicalAnimalSpecimenModal';

import frogImg from '../../../../../assets/frog.png';
import antImg from '../../../../../assets/ant.png';
import crowImg from '../../../../../assets/crow.png';
import butterflyImg from '../../../../../assets/butterfly.png';
import sparrowImg from '../../../../../assets/sparrow.png';
import squirrelImg from '../../../../../assets/squirrel.png';
import cowImg from '../../../../../assets/brown_cow.png';

import frogWideImg from '../../../../../assets/specimens_wide/frog_wide.jpg';
import antWideImg from '../../../../../assets/specimens_wide/ant_wide.jpg';
import crowWideImg from '../../../../../assets/specimens_wide/crow_wide.jpg';
import butterflyWideImg from '../../../../../assets/specimens_wide/butterfly_wide.jpg';
import sparrowWideImg from '../../../../../assets/specimens_wide/sparrow_wide.jpg';
import squirrelWideImg from '../../../../../assets/specimens_wide/squirrel_wide.jpg';
import cowWideImg from '../../../../../assets/specimens_wide/cow_wide.jpg';

const ANIMAL_WIDE_IMAGES = {
  frog: frogWideImg,
  ant: antWideImg,
  crow: crowWideImg,
  butterfly: butterflyWideImg,
  sparrow: sparrowWideImg,
  squirrel: squirrelWideImg,
  cow: cowWideImg,
  'Indian Pond Frog': frogWideImg,
  'Ant': antWideImg,
  'Crow': crowWideImg,
  'Butterfly': butterflyWideImg,
  'Sparrow': sparrowWideImg,
  'Squirrel': squirrelWideImg,
  'Cow': cowWideImg
};

const ANIMAL_NCERT_RECORDS = {
  crow: {
    habitat: 'Treetops, rooftops and flying in the open sky.',
    movement: 'Flaps its wings to fly and hops on the ground.',
    adaptations: 'A strong, sharp beak, keen eyesight and glossy, dark feathers.',
    feeding: 'Omnivorous—eats both plant and animal food.',
    think: 'How does the crow’s beak help it feed?'
  },
  squirrel: {
    habitat: 'Tree trunks, garden walls, rocks and the ground.',
    movement: 'Scampers quickly and climbs trees.',
    adaptations: 'Sharp, curved claws help it grip surfaces. Its bushy tail helps it balance.',
    think: 'Which features help a squirrel climb and balance?'
  },
  butterfly: {
    habitat: 'Garden flowers, flowering shrubs and sunny spaces.',
    movement: 'Flutters using delicate wings covered with tiny scales.',
    adaptations: 'A coiled feeding tube called a proboscis draws up nectar. Antennae sense the surroundings, and feet have taste receptors.',
    think: 'Which body part helps a butterfly drink nectar?'
  },
  sparrow: {
    habitat: 'Garden hedges, bushes, tree branches and beneath roof edges.',
    movement: 'Flies by flapping its wings and hops on the ground.',
    adaptations: 'A short, strong, cone-shaped beak helps crack seeds. Flight feathers and a skeleton with some hollow bones support flight.',
    think: 'How does the sparrow’s beak help it eat seeds?'
  },
  cow: {
    habitat: 'Open meadows, grassy pastures and farmland.',
    movement: 'Walks on four strong legs with split, or cloven, hooves.',
    adaptations: 'Broad molars grind food. Eyes provide a wide view. A stomach with four compartments helps digest plant food.',
    think: 'Why does a cow need broad grinding teeth?'
  },
  frog: {
    habitat: 'Freshwater ponds, lily pads and moist pond edges.',
    movement: 'Leaps on land and swims using its hind legs and webbed feet.',
    adaptations: 'Muscular hind legs power movement. Moist skin allows oxygen to pass through. Bulging eyes provide a wide view.',
    think: 'How do webbed feet help a frog swim?'
  },
  'indian pond frog': {
    habitat: 'Freshwater ponds, lily pads and moist pond edges.',
    movement: 'Leaps on land and swims using its hind legs and webbed feet.',
    adaptations: 'Muscular hind legs power movement. Moist skin allows oxygen to pass through. Bulging eyes provide a wide view.',
    think: 'How do webbed feet help a frog swim?'
  },
  ant: {
    habitat: 'Soil mounds, underground tunnels and garden paths.',
    movement: 'Crawls quickly on six jointed walking legs.',
    adaptations: 'Strong mandibles for lifting, sensitive antennae for following scent trails.',
    think: 'How do ants carry objects heavier than themselves?'
  }
};

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

// Specimen-Specific Background-Image-Harmonized Color Palettes
// Each palette pulls direct color accents from the specimen's photo while ensuring AAA readability
const SPECIMEN_COLOR_PALETTES = {
  // --- PLANTS ---
  waterlily: {
    cardBg: 'linear-gradient(150deg, rgba(3, 26, 30, 0.88) 0%, rgba(2, 16, 20, 0.94) 100%)',
    cardBorder: 'rgba(56, 189, 248, 0.50)',
    cardGlow: '0 0 35px rgba(56, 189, 248, 0.25)',
    titleColor: '#FDE047',
    titleSubColor: '#F472B6', // Lotus Pink
    badgeBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.30) 0%, rgba(2, 132, 199, 0.22) 100%)',
    badgeBorder: 'rgba(56, 189, 248, 0.55)',
    badgeColor: '#7DD3FC',
    stemTitle: '#2DD4BF', // Aquatic Spongy Stem
    stemBorder: '#14B8A6',
    stemBody: '#E6FFFA',
    leavesTitle: '#34D399', // Floating Round Leaf
    leavesBorder: '#10B981',
    leavesBody: '#ECFDF5',
    flowersTitle: '#F472B6', // Fragrant Lotus Pink Petals
    flowersBorder: '#EC4899',
    flowersBody: '#FDF2F8',
    otherTitle: '#38BDF8', // Pond Water & Mud
    otherBorder: '#0284C7',
    otherBody: '#F0F9FF',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  water_lily: {
    cardBg: 'linear-gradient(150deg, rgba(3, 26, 30, 0.88) 0%, rgba(2, 16, 20, 0.94) 100%)',
    cardBorder: 'rgba(56, 189, 248, 0.50)',
    cardGlow: '0 0 35px rgba(56, 189, 248, 0.25)',
    titleColor: '#FDE047',
    titleSubColor: '#F472B6',
    badgeBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.30) 0%, rgba(2, 132, 199, 0.22) 100%)',
    badgeBorder: 'rgba(56, 189, 248, 0.55)',
    badgeColor: '#7DD3FC',
    stemTitle: '#2DD4BF',
    stemBorder: '#14B8A6',
    stemBody: '#E6FFFA',
    leavesTitle: '#34D399',
    leavesBorder: '#10B981',
    leavesBody: '#ECFDF5',
    flowersTitle: '#F472B6',
    flowersBorder: '#EC4899',
    flowersBody: '#FDF2F8',
    otherTitle: '#38BDF8',
    otherBorder: '#0284C7',
    otherBody: '#F0F9FF',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  hibiscus: {
    cardBg: 'linear-gradient(150deg, rgba(22, 6, 12, 0.88) 0%, rgba(4, 20, 12, 0.94) 100%)',
    cardBorder: 'rgba(248, 113, 113, 0.50)',
    cardGlow: '0 0 35px rgba(248, 113, 113, 0.25)',
    titleColor: '#FDE047',
    titleSubColor: '#F87171', // Hibiscus Crimson
    badgeBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.30) 0%, rgba(185, 28, 28, 0.22) 100%)',
    badgeBorder: 'rgba(248, 113, 113, 0.55)',
    badgeColor: '#FECACA',
    stemTitle: '#FBBF24', // Thin Woody Stem
    stemBorder: '#F59E0B',
    stemBody: '#FFFBEB',
    leavesTitle: '#4ADE80', // Toothed Serrated Leaves
    leavesBorder: '#22C55E',
    leavesBody: '#F0FDF4',
    flowersTitle: '#F87171', // Bright Red Petals
    flowersBorder: '#EF4444',
    flowersBody: '#FFF1F2',
    otherTitle: '#34D399', // Shrub Architecture
    otherBorder: '#10B981',
    otherBody: '#ECFDF5',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  rose: {
    cardBg: 'linear-gradient(150deg, rgba(26, 6, 16, 0.88) 0%, rgba(6, 20, 14, 0.94) 100%)',
    cardBorder: 'rgba(251, 113, 133, 0.50)',
    cardGlow: '0 0 35px rgba(251, 113, 133, 0.25)',
    titleColor: '#FFE4E6',
    titleSubColor: '#FB7185', // Rose Petal Pink
    badgeBg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.30) 0%, rgba(190, 18, 60, 0.22) 100%)',
    badgeBorder: 'rgba(251, 113, 133, 0.55)',
    badgeColor: '#FFE4E6',
    stemTitle: '#FBBF24', // Prickly Thorny Woody Stem
    stemBorder: '#F59E0B',
    stemBody: '#FFFBEB',
    leavesTitle: '#34D399', // Glossy Compound Leaves
    leavesBorder: '#10B981',
    leavesBody: '#ECFDF5',
    flowersTitle: '#FB7185', // Velvety Crimson Petals
    flowersBorder: '#F43F5E',
    flowersBody: '#FFF1F2',
    otherTitle: '#2DD4BF', // Garden Shrub
    otherBorder: '#14B8A6',
    otherBody: '#F0FDFA',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  sunflower: {
    cardBg: 'linear-gradient(150deg, rgba(26, 18, 4, 0.88) 0%, rgba(6, 22, 12, 0.94) 100%)',
    cardBorder: 'rgba(250, 204, 21, 0.50)',
    cardGlow: '0 0 35px rgba(250, 204, 21, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#FACC15', // Radiant Sunflower Gold
    badgeBg: 'linear-gradient(135deg, rgba(234, 179, 8, 0.30) 0%, rgba(161, 98, 7, 0.22) 100%)',
    badgeBorder: 'rgba(250, 204, 21, 0.55)',
    badgeColor: '#FEF08A',
    stemTitle: '#4ADE80', // Thick Fibrous Green Stem
    stemBorder: '#22C55E',
    stemBody: '#F0FDF4',
    leavesTitle: '#4ADE80', // Broad Rough Leaves
    leavesBorder: '#22C55E',
    leavesBody: '#F0FDF4',
    flowersTitle: '#FACC15', // Golden Yellow Ray Florets
    flowersBorder: '#EAB308',
    flowersBody: '#FEFCE8',
    otherTitle: '#F59E0B', // Sun Tracking & Disc Florets
    otherBorder: '#D97706',
    otherBody: '#FEF3C7',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  tulsi: {
    cardBg: 'linear-gradient(150deg, rgba(18, 8, 26, 0.88) 0%, rgba(4, 24, 14, 0.94) 100%)',
    cardBorder: 'rgba(192, 132, 252, 0.50)',
    cardGlow: '0 0 35px rgba(192, 132, 252, 0.25)',
    titleColor: '#FDE047',
    titleSubColor: '#C084FC', // Lavender Blossom
    badgeBg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.30) 0%, rgba(126, 34, 206, 0.22) 100%)',
    badgeBorder: 'rgba(192, 132, 252, 0.55)',
    badgeColor: '#E9D5FF',
    stemTitle: '#86EFAC', // Soft Tender Green Stem
    stemBorder: '#22C55E',
    stemBody: '#F0FDF4',
    leavesTitle: '#34D399', // Aromatic Oval Leaves
    leavesBorder: '#10B981',
    leavesBody: '#ECFDF5',
    flowersTitle: '#C084FC', // Purple Flower Spikes
    flowersBorder: '#A855F7',
    flowersBody: '#FAF5FF',
    otherTitle: '#2DD4BF', // Medicinal Herb
    otherBorder: '#14B8A6',
    otherBody: '#F0FDFA',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  neem: {
    cardBg: 'linear-gradient(150deg, rgba(4, 26, 18, 0.88) 0%, rgba(2, 16, 10, 0.94) 100%)',
    cardBorder: 'rgba(74, 222, 128, 0.50)',
    cardGlow: '0 0 35px rgba(74, 222, 128, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#4ADE80', // Canopy Jade
    badgeBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.30) 0%, rgba(21, 128, 61, 0.22) 100%)',
    badgeBorder: 'rgba(74, 222, 128, 0.55)',
    badgeColor: '#BBF7D0',
    stemTitle: '#F59E0B', // Thick Hard Woody Bark
    stemBorder: '#D97706',
    stemBody: '#FEF3C7',
    leavesTitle: '#4ADE80', // Serrated Compound Leaves
    leavesBorder: '#22C55E',
    leavesBody: '#F0FDF4',
    flowersTitle: '#FDE047', // Small Fragrant White/Cream Flowers
    flowersBorder: '#EAB308',
    flowersBody: '#FEFCE8',
    otherTitle: '#34D399', // Towering Canopy & Medicinal Bark
    otherBorder: '#10B981',
    otherBody: '#ECFDF5',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  grass: {
    cardBg: 'linear-gradient(150deg, rgba(6, 26, 12, 0.88) 0%, rgba(2, 14, 7, 0.94) 100%)',
    cardBorder: 'rgba(134, 239, 172, 0.50)',
    cardGlow: '0 0 35px rgba(134, 239, 172, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#86EFAC', // Meadow Green
    badgeBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.30) 0%, rgba(21, 128, 61, 0.22) 100%)',
    badgeBorder: 'rgba(134, 239, 172, 0.55)',
    badgeColor: '#DCFCE7',
    stemTitle: '#86EFAC', // Slender Flexible Green Stem
    stemBorder: '#22C55E',
    stemBody: '#F0FDF4',
    leavesTitle: '#4ADE80', // Parallel-Veined Narrow Blades
    leavesBorder: '#22C55E',
    leavesBody: '#F0FDF4',
    flowersTitle: '#A3E635', // Green-Yellow Spikelets
    flowersBorder: '#84CC16',
    flowersBody: '#F7FEE7',
    otherTitle: '#34D399', // Fibrous Root Mat & Turf
    otherBorder: '#10B981',
    otherBody: '#ECFDF5',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },

  // --- ANIMALS ---
  frog: {
    cardBg: 'linear-gradient(150deg, rgba(3, 26, 22, 0.88) 0%, rgba(2, 16, 12, 0.94) 100%)',
    cardBorder: 'rgba(52, 211, 153, 0.50)',
    cardGlow: '0 0 35px rgba(52, 211, 153, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#34D399', // Amphibian Green
    badgeBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.30) 0%, rgba(5, 150, 105, 0.22) 100%)',
    badgeBorder: 'rgba(52, 211, 153, 0.55)',
    badgeColor: '#A7F3D0',
    habitatTitle: '#38BDF8', // Freshwater Pond & Lily Pads
    habitatBorder: '#0284C7',
    habitatBody: '#F0F9FF',
    movementTitle: '#4ADE80', // Muscular Leaping Legs & Webbed Feet
    movementBorder: '#22C55E',
    movementBody: '#F0FDF4',
    adaptationsTitle: '#FBBF24', // Moist Respiratory Skin & Bulging Eyes
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  'indian pond frog': {
    cardBg: 'linear-gradient(150deg, rgba(3, 26, 22, 0.88) 0%, rgba(2, 16, 12, 0.94) 100%)',
    cardBorder: 'rgba(52, 211, 153, 0.50)',
    cardGlow: '0 0 35px rgba(52, 211, 153, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#34D399',
    badgeBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.30) 0%, rgba(5, 150, 105, 0.22) 100%)',
    badgeBorder: 'rgba(52, 211, 153, 0.55)',
    badgeColor: '#A7F3D0',
    habitatTitle: '#38BDF8',
    habitatBorder: '#0284C7',
    habitatBody: '#F0F9FF',
    movementTitle: '#4ADE80',
    movementBorder: '#22C55E',
    movementBody: '#F0FDF4',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  butterfly: {
    cardBg: 'linear-gradient(150deg, rgba(26, 14, 4, 0.88) 0%, rgba(6, 20, 12, 0.94) 100%)',
    cardBorder: 'rgba(251, 146, 60, 0.50)',
    cardGlow: '0 0 35px rgba(251, 146, 60, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#FB923C', // Monarch Wing Coral
    badgeBg: 'linear-gradient(135deg, rgba(249, 115, 22, 0.30) 0%, rgba(194, 65, 12, 0.22) 100%)',
    badgeBorder: 'rgba(251, 146, 60, 0.55)',
    badgeColor: '#FFEDD5',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#F472B6',
    movementBorder: '#EC4899',
    movementBody: '#FDF2F8',
    adaptationsTitle: '#FACC15',
    adaptationsBorder: '#EAB308',
    adaptationsBody: '#FEFCE8',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  sparrow: {
    cardBg: 'linear-gradient(150deg, rgba(8, 20, 30, 0.88) 0%, rgba(4, 14, 20, 0.94) 100%)',
    cardBorder: 'rgba(96, 165, 250, 0.50)',
    cardGlow: '0 0 35px rgba(96, 165, 250, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#60A5FA', // Sky Blue
    badgeBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.30) 0%, rgba(29, 78, 216, 0.22) 100%)',
    badgeBorder: 'rgba(96, 165, 250, 0.55)',
    badgeColor: '#BFDBFE',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#38BDF8',
    movementBorder: '#0284C7',
    movementBody: '#F0F9FF',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  crow: {
    cardBg: 'linear-gradient(150deg, rgba(12, 16, 22, 0.88) 0%, rgba(4, 10, 16, 0.94) 100%)',
    cardBorder: 'rgba(148, 163, 184, 0.50)',
    cardGlow: '0 0 35px rgba(148, 163, 184, 0.25)',
    titleColor: '#F8FAFC',
    titleSubColor: '#94A3B8', // Feathery Slate
    badgeBg: 'linear-gradient(135deg, rgba(100, 116, 139, 0.30) 0%, rgba(51, 65, 85, 0.22) 100%)',
    badgeBorder: 'rgba(148, 163, 184, 0.55)',
    badgeColor: '#E2E8F0',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#38BDF8',
    movementBorder: '#0284C7',
    movementBody: '#F0F9FF',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  squirrel: {
    cardBg: 'linear-gradient(150deg, rgba(24, 14, 8, 0.88) 0%, rgba(8, 18, 12, 0.94) 100%)',
    cardBorder: 'rgba(251, 146, 60, 0.50)',
    cardGlow: '0 0 35px rgba(251, 146, 60, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#F59E0B', // Amber Fur
    badgeBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.30) 0%, rgba(180, 83, 9, 0.22) 100%)',
    badgeBorder: 'rgba(251, 146, 60, 0.55)',
    badgeColor: '#FED7AA',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#4ADE80',
    movementBorder: '#22C55E',
    movementBody: '#F0FDF4',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  cow: {
    cardBg: 'linear-gradient(150deg, rgba(8, 26, 16, 0.88) 0%, rgba(3, 16, 10, 0.94) 100%)',
    cardBorder: 'rgba(74, 222, 128, 0.50)',
    cardGlow: '0 0 35px rgba(74, 222, 128, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#4ADE80', // Pasture Green
    badgeBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.30) 0%, rgba(21, 128, 61, 0.22) 100%)',
    badgeBorder: 'rgba(74, 222, 128, 0.55)',
    badgeColor: '#BBF7D0',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#4ADE80',
    movementBorder: '#22C55E',
    movementBody: '#F0FDF4',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  },
  ant: {
    cardBg: 'linear-gradient(150deg, rgba(22, 10, 6, 0.88) 0%, rgba(6, 18, 12, 0.94) 100%)',
    cardBorder: 'rgba(249, 115, 22, 0.50)',
    cardGlow: '0 0 35px rgba(249, 115, 22, 0.25)',
    titleColor: '#FEF08A',
    titleSubColor: '#F97316', // Earth Ant Orange
    badgeBg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.30) 0%, rgba(154, 52, 18, 0.22) 100%)',
    badgeBorder: 'rgba(249, 115, 22, 0.55)',
    badgeColor: '#FED7AA',
    habitatTitle: '#34D399',
    habitatBorder: '#10B981',
    habitatBody: '#ECFDF5',
    movementTitle: '#4ADE80',
    movementBorder: '#22C55E',
    movementBody: '#F0FDF4',
    adaptationsTitle: '#FBBF24',
    adaptationsBorder: '#F59E0B',
    adaptationsBody: '#FFFBEB',
    thinkTitle: '#FDE047',
    thinkBorder: '#F59E0B',
    thinkBody: '#FEF9C3'
  }
};

const getSpecimenPalette = (specimen) => {
  if (!specimen) return SPECIMEN_COLOR_PALETTES.waterlily;
  const key = (specimen.id || specimen.name || '').toLowerCase().replace(/\s+/g, '_');
  return SPECIMEN_COLOR_PALETTES[key] || SPECIMEN_COLOR_PALETTES[specimen.id] || SPECIMEN_COLOR_PALETTES.waterlily;
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
    image: activity21HerbsImg,
    alt: 'Tulsi, Mint, Tomato, Grass, and Wheat herbs growing with soft green stems',
    caption: '🌿 Tulsi • Mint • Tomato • Grass • Wheat',
    captionTag: 'Soft Tender Stems',
    traits: [
      { label: 'Stem Texture', value: 'Soft, green, non-woody, tender; bends smoothly without snapping' },
      { label: 'Plant Height', value: 'Usually very short (typically under 1 meter in height)' },
      { label: 'Branching Habit', value: 'Few or delicate branches; tender stems arise near the base' },
      { label: 'Examples', value: 'Tulsi (Holy Basil), Mint, Tomato, Grass, Wheat, Coriander' }
    ],
    didYouKnow: 'Table 2.1 in your science textbook helps you record whether a plant is short, green, and tender-stemmed to classify it as a Herb.'
  },
  {
    id: 'shrubs',
    name: 'Shrubs',
    icon: '🌺',
    tag: 'Hard Woody Base',
    quote: 'Shrubs are bushy plants with hard, thin woody stems branching out right from near the ground base.',
    image: activity21ShrubsImg,
    alt: 'Rose, Hibiscus, Lemon, and Henna shrubs growing with woody branches near ground',
    caption: '🌺 Rose • Hibiscus • Lemon • Mehndi',
    captionTag: 'Hard Woody Base',
    traits: [
      { label: 'Stem Texture', value: 'Hard and woody, but relatively thin (not a thick single trunk)' },
      { label: 'Plant Height', value: 'Medium height (about human height, roughly 1 to 3 meters)' },
      { label: 'Branching Habit', value: 'Branches arise profusely right near the base of the stem' },
      { label: 'Examples', value: 'Rose, Hibiscus (China Rose), Lemon, Mehndi (Henna), Jasmine' }
    ],
    didYouKnow: 'Unlike trees, shrubs have branches starting very close to the soil line, giving them their characteristic bushy appearance.'
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: '🌳',
    tag: 'Massive Woody Trunk',
    quote: 'Trees are tall, grand plants with a single thick, hard brown woody trunk and leafy canopy spreading high above.',
    image: activity21TreesImg,
    alt: 'Banyan, Peepal, Neem, Mango, and Gulmohar trees with massive woody trunks and high crowns',
    caption: '🌳 Banyan • Peepal • Neem • Mango • Gulmohar',
    captionTag: 'Massive Woody Trunk',
    traits: [
      { label: 'Stem Texture', value: 'Single, massive, hard brown woody trunk protected by rough bark' },
      { label: 'Plant Height', value: 'Tall and grand, towering many meters into the sky' },
      { label: 'Branching Habit', value: 'Branches arise high up on the trunk, far above ground level' },
      { label: 'Examples', value: 'Banyan (National Tree), Peepal, Neem, Mango, Gulmohar, Teak' }
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
    image: activity21CrawlersImg,
    alt: 'Ants, Earthworms, Snails, and Grasshoppers in rich garden humus and soil',
    caption: '🐜 Ant • 🪱 Earthworm • 🐌 Snail • 🦗 Grasshopper',
    captionTag: 'Moist Soil & Humus',
    traits: [
      { label: 'Primary Habitat', value: 'Moist topsoil, leaf litter, decaying bark, garden pathways' },
      { label: 'Locomotion Mode', value: 'Crawls with multiple jointed legs, creeps by muscle waves, or slithers' },
      { label: 'Ecological Role', value: 'Soil aeration, organic decomposition, garden pollination' },
      { label: 'Examples', value: 'Black Garden Ant, Earthworm, Garden Snail, Beetle, Millipede' }
    ],
    didYouKnow: 'Table 2.2 in your science textbook helps you observe how soil organisms crawl and enrich garden biodiversity.'
  },
  {
    id: 'aerial',
    name: 'Aerial (Flying Creatures)',
    icon: '🐦',
    tag: 'Can Fly in Air',
    quote: 'Aerial animals are winged birds and flying insects that navigate the open sky and tree canopies.',
    image: activity21AerialImg,
    alt: 'House Sparrow, Crow, Butterfly, and Honeybee in tree canopy and blossoms habitat',
    caption: '🐦 Sparrow • 🪶 Crow • 🦋 Butterfly • 🐝 Bee',
    captionTag: 'Canopies & Blossoms',
    traits: [
      { label: 'Primary Habitat', value: 'Open airspace, leafy crowns, high tree perches, garden flowers' },
      { label: 'Locomotion Mode', value: 'Flies using aerodynamic feathered wings or membranous insect wings' },
      { label: 'Ecological Role', value: 'Flower nectar pollination, seed dispersal, natural insect control' },
      { label: 'Examples', value: 'House Sparrow, Common Crow, Butterfly, Honeybee, Dragon-fly' }
    ],
    didYouKnow: 'Birds have lightweight hollow bones and aerodynamic feathers that minimize drag while soaring between trees.'
  },
  {
    id: 'walkers',
    name: 'Walkers & Swimmers',
    icon: '🐾',
    tag: 'Limbs & Fins',
    quote: 'Walkers and aquatic creatures possess adapted limbs to walk, hop, leap across pastures, or swim in ponds.',
    image: activity21WalkersImg,
    alt: 'Gir Cow, Indian Pond Frog, Squirrel, and Dog in meadows, garden path, and pond habitat',
    caption: '🐄 Cow • 🐸 Frog • 🐿️ Squirrel • 🐕 Dog',
    captionTag: 'Meadows & Ponds',
    traits: [
      { label: 'Primary Habitat', value: 'Grassy school fields, meadows, garden fences, freshwater pond edges' },
      { label: 'Locomotion Mode', value: 'Walks or runs on four legs, leaps with hind legs, swims with webbed feet' },
      { label: 'Ecological Role', value: 'Herbivorous grazing, amphibious pest control, seed distribution' },
      { label: 'Examples', value: 'Desi Cow, Indian Pond Frog, Striped Palm Squirrel, Garden Lizard' }
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

export default function VirtualBiodiversityExplorer({ onBackToDashboard, typeFilter = 'plant', onNextSection, onNextActivity, isFullscreen = false, startAtLastPage = false }) {
  const { theme } = useTheme();
  const [notebook, setNotebook] = useState([]);
  const [bonusLog, setBonusLog] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 450 });
  const [infoCardPlant, setInfoCardPlant] = useState(null);
  const [infoCardAnimal, setInfoCardAnimal] = useState(null);
  const [modalPlantPage, setModalPlantPage] = useState(1);
  const [modalAnimalPage, setModalAnimalPage] = useState(1);
  const [categoryStep, setCategoryStep] = useState(0); // 0: Herbs, 1: Shrubs, 2: Trees

  const openPlantModal = (plant) => {
    setModalPlantPage(1);
    setShowPlantDetailPopup(false);
    setInfoCardPlant(plant);
  };

  const openAnimalModal = (animal) => {
    setModalAnimalPage(1);
    setShowAnimalDetailPopup(false);
    setInfoCardAnimal(animal);
  };
  const [zoomLevel, setZoomLevel] = useState(2.4); // 2.4x Field Scanner or 4.8x Macro Lens
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState(false);
  const [polaroidSnap, setPolaroidSnap] = useState(null);
  const [discoveryStarToast, setDiscoveryStarToast] = useState(null);
  const [showHerbsPopup, setShowHerbsPopup] = useState(false);
  // Real narration audio + word-level highlight sync for the Herbs popup
  const {
    isPlaying: isHerbsSpeaking,
    activeWordIndex: herbsActiveWordIndex,
    pause: pauseHerbsNarration,
    toggle: toggleHerbsSpeech,
  } = useWordSyncAudio(herbsNarrationAudio, herbsNarrationData.herbs.words, {
    autoPlay: false,
    onEnd: () => {},
  });

  const [showShrubsPopup, setShowShrubsPopup] = useState(false);
  // Real narration audio + word-level highlight sync for the Shrubs popup
  const {
    isPlaying: isShrubsSpeaking,
    activeWordIndex: shrubsActiveWordIndex,
    pause: pauseShrubsNarration,
    toggle: toggleShrubsSpeech,
  } = useWordSyncAudio(shrubsNarrationAudio, shrubsNarrationData.shrubs.words, {
    autoPlay: false,
    onEnd: () => {},
  });

  const [showTreesPopup, setShowTreesPopup] = useState(false);
  // Real narration audio + word-level highlight sync for the Trees popup
  const {
    isPlaying: isTreesSpeaking,
    activeWordIndex: treesActiveWordIndex,
    pause: pauseTreesNarration,
    toggle: toggleTreesSpeech,
  } = useWordSyncAudio(treesNarrationAudio, treesNarrationData.trees.words, {
    autoPlay: false,
    onEnd: () => {},
  });

  const [showCrawlerPopup, setShowCrawlerPopup] = useState(false);
  const [isCrawlerSpeaking, setIsCrawlerSpeaking] = useState(false);

  const toggleCrawlerSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isCrawlerSpeaking) {
        window.speechSynthesis.cancel();
        setIsCrawlerSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const text = "Garden Snail. It glides slowly on a soft muscular foot, leaving a slimy trail. It pulls inside its hard spiral shell for safety, and feeds on tender green leaves.";
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsCrawlerSpeaking(false);
        utter.onerror = () => setIsCrawlerSpeaking(false);
        setIsCrawlerSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const [showAerialPopup, setShowAerialPopup] = useState(false);
  const [isAerialSpeaking, setIsAerialSpeaking] = useState(false);

  const toggleAerialSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isAerialSpeaking) {
        window.speechSynthesis.cancel();
        setIsAerialSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const text = "Aerial animals and birds. Birds have hollow bones and light feathers to fly easily. Butterflies and bees flap thin wings, sipping nectar and helping flowers make seeds.";
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsAerialSpeaking(false);
        utter.onerror = () => setIsAerialSpeaking(false);
        setIsAerialSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const [showWalkerPopup, setShowWalkerPopup] = useState(false);
  const [isWalkerSpeaking, setIsWalkerSpeaking] = useState(false);

  // Auto-display observation popups after 5 seconds of viewing the full-screen nature image
  useEffect(() => {
    if (typeFilter === 'animal') {
      if (categoryStep === 0) {
        setShowCrawlerPopup(false);
        const timer = setTimeout(() => {
          setShowCrawlerPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      } else if (categoryStep === 1) {
        setShowAerialPopup(false);
        const timer = setTimeout(() => {
          setShowAerialPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      } else if (categoryStep === 2) {
        setShowWalkerPopup(false);
        const timer = setTimeout(() => {
          setShowWalkerPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [typeFilter, categoryStep]);

  // Auto-display observation popups after 5 seconds of viewing the full-screen nature image (plants)
  useEffect(() => {
    if (typeFilter === 'plant') {
      if (categoryStep === 0) {
        setShowHerbsPopup(false);
        const timer = setTimeout(() => {
          setShowHerbsPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      } else if (categoryStep === 1) {
        setShowShrubsPopup(false);
        const timer = setTimeout(() => {
          setShowShrubsPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      } else if (categoryStep === 2) {
        setShowTreesPopup(false);
        const timer = setTimeout(() => {
          setShowTreesPopup(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [typeFilter, categoryStep]);

  const toggleWalkerSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isWalkerSpeaking) {
        window.speechSynthesis.cancel();
        setIsWalkerSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const text = "Walkers and swimmers. Cows and dogs walk on four strong legs with hooves or paws. Squirrels climb trees with sharp claws and balance with bushy tails. Frogs leap on land with long hind legs and swim with webbed feet.";
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsWalkerSpeaking(false);
        utter.onerror = () => setIsWalkerSpeaking(false);
        setIsWalkerSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };
  const [showWildlifePopup, setShowWildlifePopup] = useState(true);
  const [isWildlifeSpeaking, setIsWildlifeSpeaking] = useState(false);

  const toggleWildlifeSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isWildlifeSpeaking) {
        window.speechSynthesis.cancel();
        setIsWildlifeSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const text = "Wildlife field observation. Look closely at how different animals adapt to their natural surroundings. Birds like crows and sparrows use lightweight hollow bones, flight feathers, and sharp beaks to feed and fly. Climbing squirrels scamper rapidly on trees using sharp curved claws and a bushy balancing tail. Gentle cows graze peacefully on green pastures with four sturdy limbs. Tiny ants crawl together in scent trails, and pond frogs use webbed feet to swim swiftly and strong legs to jump on land!";
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsWildlifeSpeaking(false);
        utter.onerror = () => setIsWildlifeSpeaking(false);
        setIsWildlifeSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const [showBotanicalPopup, setShowBotanicalPopup] = useState(true);
  const [isBotanicalSpeaking, setIsBotanicalSpeaking] = useState(false);

  const toggleBotanicalSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isBotanicalSpeaking) {
        window.speechSynthesis.cancel();
        setIsBotanicalSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const text = "Botanical field observation. Look closely at how different plants adapt and grow in the garden. Tender herbs like Tulsi and Grass have soft, green flexible stems. Bushy shrubs like Hibiscus and Rose have multiple thin woody stems branching right at ground level. Giant trees like Neem have a single thick brown woody trunk with high canopy branches. And aquatic plants like the Water Lily have buoyant spongy stems and broad leaves floating on water!";
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsBotanicalSpeaking(false);
        utter.onerror = () => setIsBotanicalSpeaking(false);
        setIsBotanicalSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const [showPlantDetailPopup, setShowPlantDetailPopup] = useState(false);
  const [isPlantSpeaking, setIsPlantSpeaking] = useState(false);

  // Auto-display NCERT Observation Popup after 5 seconds of viewing the full-screen specimen
  useEffect(() => {
    if (infoCardPlant) {
      setShowPlantDetailPopup(false);
      const timer = setTimeout(() => {
        setShowPlantDetailPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowPlantDetailPopup(false);
    }
  }, [infoCardPlant]);

  const togglePlantSpeech = (plant) => {
    if ('speechSynthesis' in window) {
      if (isPlantSpeaking) {
        window.speechSynthesis.cancel();
        setIsPlantSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const pName = plant.popupName || plant.name || 'Plant';
        const stemText = plant.tableInfo?.stem ? `Stem: ${plant.tableInfo.stem} ` : '';
        const leavesText = plant.tableInfo?.leaves ? `Leaves: ${plant.tableInfo.leaves} ` : '';
        const flowersText = plant.tableInfo?.flowers ? `Flowers: ${plant.tableInfo.flowers} ` : '';
        const notesText = plant.tableInfo?.notes ? `Other observations: ${plant.tableInfo.notes} ` : '';
        const thinkText = plant.tableInfo?.think ? `Think: ${plant.tableInfo.think}` : (plant.id === 'sunflower' ? 'Think: Do mature sunflower heads keep following the sun?' : (plant.id === 'rose' ? 'Think: How is a compound leaf different from a simple leaf?' : (plant.id === 'hibiscus' ? 'Think: What makes hibiscus a shrub?' : '')));
        const text = `${pName} Botanical Field Specimen. ${stemText}${leavesText}${flowersText}${notesText}${thinkText}`;
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsPlantSpeaking(false);
        utter.onerror = () => setIsPlantSpeaking(false);
        setIsPlantSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const closePlantModal = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlantSpeaking(false);
    setInfoCardPlant(null);
  };

  const [showAnimalDetailPopup, setShowAnimalDetailPopup] = useState(false);
  const [isAnimalSpeaking, setIsAnimalSpeaking] = useState(false);

  // Auto-display NCERT Observation Popup after 5 seconds of viewing the full-screen specimen
  useEffect(() => {
    if (infoCardAnimal) {
      setShowAnimalDetailPopup(false);
      const timer = setTimeout(() => {
        setShowAnimalDetailPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowAnimalDetailPopup(false);
    }
  }, [infoCardAnimal]);

  const toggleAnimalSpeech = (animal) => {
    if (!animal) return;
    if ('speechSynthesis' in window) {
      if (isAnimalSpeaking) {
        window.speechSynthesis.cancel();
        setIsAnimalSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const aName = animal.popupName || animal.name || 'Animal';
        const animalKey = (animal.id || animal.name || '').toLowerCase();
        const ncert = ANIMAL_NCERT_RECORDS[animalKey] || animal.tableInfo || {};
        const habText = ncert.habitat ? `Where found: ${ncert.habitat} ` : '';
        const movText = ncert.movement ? `Movement: ${ncert.movement} ` : '';
        const adaptText = ncert.adaptations ? `Body adaptations: ${ncert.adaptations} ` : '';
        const feedText = ncert.feeding ? `Feeding: ${ncert.feeding} ` : '';
        const thinkText = ncert.think ? `Think: ${ncert.think}` : '';
        const text = `${aName} Zoological Field Specimen Record. ${habText}${movText}${adaptText}${feedText}${thinkText}`;
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.88;
        utter.pitch = 1.0;
        utter.onend = () => setIsAnimalSpeaking(false);
        utter.onerror = () => setIsAnimalSpeaking(false);
        setIsAnimalSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const closeAnimalModal = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAnimalSpeaking(false);
    setInfoCardAnimal(null);
  };
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
    const audioEl = natureAudioRef.current;
    return () => {
      try {
        if (audioEl) {
          audioEl.pause();
          audioEl.currentTime = 0;
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
          x: 27, y: 43, radius: 18, w: 30, h: 38,
          details: 'Red Hibiscus flowers and bush growing on the center-left.',
          fact: 'Hibiscus flowers have vibrant red petals and are common flowering shrubs!',
          verifyQ: { q: 'Which plant classification does Hibiscus belong to?', opts: ['Herbs', 'Trees', 'Shrubs', 'Aquatic plants'], correct: 2 },
          tableInfo: { 
            stem: 'Thin, hard, woody stems branching near the base.', 
            leaves: 'Green, simple leaves with serrated—toothed—edges.', 
            flowers: 'Large, bright red flowers.', 
            notes: 'A medium-sized shrub with branches close to the ground.',
            think: 'What makes hibiscus a shrub?'
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
          x: 51, y: 78, radius: 16, w: 26, h: 34,
          details: 'Tulsi plant growing in the foreground with vertical flower spikes and aromatic leaves.',
          fact: 'Tulsi (Holy Basil) is an important medicinal herb with soft green stems.',
          verifyQ: { q: 'What type of plant is Tulsi?', opts: ['Tree', 'Shrub', 'Herb', 'Climber'], correct: 2 },
          tableInfo: { 
            stem: 'Young stems are soft and green; older stems may become woody.', 
            leaves: 'Small, oval, simple leaves with a strong aroma.', 
            flowers: 'Tiny purple or whitish flowers in upright clusters.', 
            notes: 'Commonly grown in home gardens and used in traditional medicine.',
            think: 'What does “aromatic” tell us about tulsi leaves?'
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
          x: 75, y: 78, radius: 16, w: 26, h: 32,
          details: 'Green grass clump growing on the bottom-right near the tree.',
          fact: 'Grasses are small herbs with narrow leaves and parallel vein patterns.',
          verifyQ: { q: 'Which category does Grass belong to?', opts: ['Tree', 'Herb', 'Shrub', 'Woody climber'], correct: 1 },
          tableInfo: { 
            stem: 'Thin, green stems, often hollow between the joints.', 
            leaves: 'Long, narrow leaves with parallel veins.', 
            flowers: 'Tiny flowers arranged in groups called spikelets.', 
            notes: 'Lawn grass is a short herb with fibrous roots that forms ground cover.',
            think: 'What pattern can you see in the leaf veins?'
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
          x: 87, y: 38, radius: 24, w: 26, h: 68,
          details: 'Grand Neem tree with thick trunk and broad canopy on the right.',
          fact: 'Neem trees are evergreen trees with medicinal properties.',
          verifyQ: { q: 'Which plant classification does a Neem Tree belong to?', opts: ['Herb', 'Shrub', 'Tree', 'Creeper'], correct: 2 },
          tableInfo: { 
            stem: 'A thick, hard, woody trunk with rough, scaly brown bark.', 
            leaves: 'Compound leaves with toothed green leaflets along a central stalk.', 
            flowers: 'Small, white and fragrant.', 
            notes: 'A tall, usually evergreen tree with a broad canopy.',
            think: 'Which features help you identify neem as a tree?'
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
          x: 53, y: 53, radius: 16, w: 30, h: 32,
          details: 'Pink Rose bush with flowering blooms located in the center-right area.',
          fact: 'Roses are thorny flowering shrubs with woody stems branching near the ground.',
          verifyQ: { q: 'What type of stem does a Rose bush have?', opts: ['Soft green stem', 'Thin woody stem with thorns', 'Massive trunk', 'Underwater stem'], correct: 1 },
          tableInfo: { 
            stem: 'Thin, woody stems with sharp prickles, commonly called thorns.', 
            leaves: 'Compound leaves made of leaflets with toothed edges.', 
            flowers: 'Fragrant pink or red blooms.', 
            notes: 'A medium-sized shrub with prickly branches.',
            think: 'How is a compound leaf different from a simple leaf?'
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
          x: 70, y: 39, radius: 14, w: 20, h: 26,
          details: 'Tall flowering plant with large bright yellow petals turning toward sunlight.',
          fact: 'Sunflowers exhibit heliotropism — young sunflowers follow the sun from east to west every day!',
          verifyQ: { 
            q: 'Which feature is characteristic of a Sunflower?', 
            opts: ['Underwater stem', 'Large yellow flower head with a dark brown central disc', 'Scaly tree trunk', 'No flowers'], 
            correct: 1 
          },
          tableInfo: { 
            stem: 'Tall, strong, green, rough and slightly hairy.', 
            leaves: 'Large, broad and rough, with prominent veins.', 
            flowers: 'A bright yellow flower head with a dark central disc.', 
            notes: 'Produces edible seeds. Young developing heads follow the sun; mature heads usually face east.',
            think: 'Do mature sunflower heads keep following the sun?'
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
          x: 17, y: 76, radius: 16, w: 32, h: 28,
          details: 'Pink water lilies blooming gracefully on broad floating circular leaves in the garden pond.',
          fact: 'Water lilies have flexible spongy stems with air cavities that let them float easily and absorb dissolved air!',
          verifyQ: { 
            q: 'How is a Water Lily adapted to aquatic life in ponds?', 
            opts: ['Thick heavy bark', 'Flexible spongy stem and broad floating waxy leaves', 'Sharp woody thorns', 'Fibrous dry roots'], 
            correct: 1 
          },
          tableInfo: { 
            stem: 'An underwater stem with long, flexible, spongy stalks.', 
            leaves: 'Broad, round, flat, waxy leaves floating on water.', 
            flowers: 'Large, fragrant pink flowers; the type described opens during daylight.', 
            notes: 'An aquatic herb with roots anchored in pond mud.',
            think: 'Which parts float, and which parts anchor the plant?'
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
          x: 10, y: 19, radius: 18, w: 21, h: 36,
          details: 'A clever grey-necked bird that flies in the open sky and perches on tree branches. Crows are intelligent scavengers with sharp sight and strong wings.',
          fact: 'Crows are remarkably intelligent — they can recognize individual human faces and use tools to fetch food!',
          verifyQ: { q: 'What is a crow classified as in terms of its diet?', opts: ['Pure herbivore', 'Scavenger that eats scraps and pests', 'Deep-sea predator', 'Insect only feeder'], correct: 1 },
          tableInfo: { 
            whereFound: 'Treetops, rooftops and flying in the open sky.', 
            movement: 'Flaps its wings to fly and hops on the ground.', 
            adaptations: 'A strong, sharp beak, keen eyesight and glossy, dark feathers.', 
            feeding: 'Omnivorous—eats both plant and animal food.',
            think: 'How does the crow’s beak help it feed?' 
          },
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
          x: 47, y: 29.5, radius: 14, w: 17, h: 20,
          details: 'A small, friendly bird perched on tree branches. Sparrows chirp cheerfully and feed on tiny seeds, grains, and insects near garden trees.',
          fact: 'House Sparrows have lived alongside humans for over 10,000 years — they are one of the most widespread birds on Earth!',
          verifyQ: { q: 'What do House Sparrows primarily eat?', opts: ['Large mammals', 'Insects and small seeds', 'Big fish', 'Tree bark'], correct: 1 },
          tableInfo: { 
            whereFound: 'Garden hedges, bushes, tree branches and beneath roof edges.', 
            movement: 'Flies by flapping its wings and hops on the ground.', 
            adaptations: 'A short, strong, cone-shaped beak helps crack seeds. Flight feathers and a skeleton with some hollow bones support flight.', 
            think: 'How does the sparrow’s beak help it eat seeds?' 
          },
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
          x: 85.8, y: 48.5, radius: 20, w: 29, h: 38,
          details: 'A large domestic herbivore that grazes peacefully on fresh green grass and hay. Cows move calmly on four legs and provide healthy milk.',
          fact: 'Cows have best friends and get happy when spending time together in green pastures!',
          verifyQ: { q: 'What type of food does a cow eat?', opts: ['Fish and meat', 'Grass and hay', 'Insects only', 'Tree bark'], correct: 1 },
          tableInfo: { 
            whereFound: 'Open meadows, grassy pastures and farmland.', 
            movement: 'Walks on four strong legs with split, or cloven, hooves.', 
            adaptations: 'Broad molars grind food. Eyes provide a wide view. A stomach with four compartments helps digest plant food.', 
            think: 'Why does a cow need broad grinding teeth?' 
          },
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
          x: 15.5, y: 61, radius: 18, w: 31, h: 36,
          details: 'A quick and nimble rodent with three pale stripes along its back. It climbs tree trunks rapidly and nibbles on nuts, seeds, and berries.',
          fact: 'Squirrels accidentally plant thousands of trees each year by forgetting where they buried their stashes!',
          verifyQ: { q: 'Where would you most likely spot a Three-Striped Palm Squirrel?', opts: ['In the ocean', 'Climbing a tree trunk or rock', 'Flying in the sky', 'Burrowing underground'], correct: 1 },
          tableInfo: { 
            whereFound: 'Tree trunks, garden walls, rocks and the ground.', 
            movement: 'Scampers quickly and climbs trees.', 
            adaptations: 'Sharp, curved claws help it grip surfaces. Its bushy tail helps it balance.', 
            think: 'Which features help a squirrel climb and balance?' 
          },
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
          x: 48.5, y: 59.5, radius: 14, w: 16, h: 26,
          details: 'A colorful flying insect with delicate wings fluttering around garden flowers. It feeds on nectar using its long proboscis and helps pollinate flowers.',
          fact: 'Butterflies taste their food using tiny sensory receptors on their feet — not their mouths!',
          verifyQ: { q: 'How does a butterfly help plants?', opts: ['It eats all the leaves', 'It digs up roots', 'It helps in pollination by carrying pollen', 'It blocks sunlight'], correct: 2 },
          tableInfo: { 
            whereFound: 'Garden flowers, flowering shrubs and sunny spaces.', 
            movement: 'Flutters using delicate wings covered with tiny scales.', 
            adaptations: 'A coiled feeding tube called a proboscis draws up nectar. Antennae sense the surroundings, and feet have taste receptors.', 
            think: 'Which body part helps a butterfly drink nectar?' 
          },
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
          x: 78, y: 82, radius: 15, w: 15, h: 13,
          details: 'An amphibian with smooth green skin resting near ponds and moist shores. It uses its strong hind legs to jump on land and webbed feet to swim swiftly in water.',
          fact: 'Frogs can breathe through their lungs on land and directly through their moist skin underwater — they are true amphibians!',
          verifyQ: { q: 'What type of habitat does an Indian Pond Frog live in?', opts: ['Only on dry land', 'Only in deep ocean', 'Both in freshwater and on moist shores', 'Only in desert sand'], correct: 2 },
          tableInfo: { 
            whereFound: 'Freshwater ponds, lily pads and moist pond edges.', 
            movement: 'Leaps on land and swims using its hind legs and webbed feet.', 
            adaptations: 'Muscular hind legs power movement. Moist skin allows oxygen to pass through. Bulging eyes provide a wide view.', 
            think: 'How do webbed feet help a frog swim?' 
          },
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
          x: 31, y: 95.5, radius: 14, w: 27, h: 11,
          details: 'Tiny, hardworking social insects crawling together along the soil. Ants communicate using scent trails and can carry loads many times their own weight!',
          fact: 'Ants are incredibly strong — an ant can carry objects up to 50 times its own body weight!',
          verifyQ: { q: 'How do ants move and work together?', opts: ['They fly individually', 'They crawl in social trails using scent clues', 'They swim underwater', 'They jump over trees'], correct: 1 },
          tableInfo: { 
            whereFound: 'Soil mounds, underground tunnels and garden paths.', 
            movement: 'Crawls quickly on six jointed walking legs.', 
            adaptations: 'Strong mandibles for lifting, sensitive antennae for following scent trails.', 
            think: 'How do ants carry objects heavier than themselves?' 
          },
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
  const [projectorZoom, setProjectorZoom] = useState(1); // 1 = 1x, 2 = 1.8x, 3 = 2.6x
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Popup state
  const [scannedOrganism, setScannedOrganism] = useState(null); // target or bonus
  const [isBonusScan, setIsBonusScan] = useState(false);
  const [verifyAnswer, setVerifyAnswer] = useState(null);
  const [verifyChecked, setVerifyChecked] = useState(false);
  const [verifyCorrect, setVerifyCorrect] = useState(false);
  const [subPage, setSubPage] = useState(startAtLastPage ? (typeFilter === 'animal' ? 2 : 3) : (typeFilter === 'animal' ? 2 : 1));
  useEffect(() => {
    if (typeFilter === 'animal') {
      setSubPage(2);
      setViewMode('garden_walk');
    }
  }, [typeFilter]);
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

    // 1. Calculate visual distance to whole plant / organism bounding region
    const candidates = filteredTargets
      .map(t => {
        const targetPxX = (t.x / 100) * rect.width;
        const targetPxY = (t.y / 100) * rect.height;
        const wPx = ((t.w || 22) / 100) * rect.width;
        const hPx = ((t.h || 24) / 100) * rect.height;
        // Elliptical normalized distance to encompass the whole plant body
        const dxNorm = (x - targetPxX) / (wPx / 2 + 15);
        const dyNorm = (y - targetPxY) / (hPx / 2 + 15);
        const ellipseDist = Math.hypot(dxNorm, dyNorm);
        const distPx = Math.hypot(x - targetPxX, y - targetPxY);
        const inRange = ellipseDist <= 1.08;
        return { target: t, distPx, inRange };
      })
      .filter(item => item.inRange)
      .sort((a, b) => a.distPx - b.distPx); // Closest center takes priority!

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

    // Version 1 Field Scanner behavior for plants (no camera lens or snap)
    if (typeFilter === 'plant') {
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
        {subPage === 1 && typeFilter === 'plant' && (
          (typeFilter === 'plant' && categoryStep === 0) ? (
            /* FULLSCREEN HERBS PAGE 1 WITH REALISTIC CORNER CREAM POPUP */
            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0B3B24'
            }}>
              <img
                src={activity21HerbsImg}
                alt="Activity 2.1 - Herbs"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />

              {/* Top Center Title: Activity 2.1 (Attractive Golden Banner, matches Habitats page) */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 35,
                pointerEvents: 'none',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                borderRadius: '14px',
                padding: '7px 30px',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 24px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)'
              }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: '"Cinzel", Georgia, serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#FFFBEB',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 16px rgba(253, 230, 138, 0.55)'
                }}>
                  Activity 2.1: Let us explore and record
                </h1>
              </div>

              {/* Slogan Page Style: 60% Translucent Dark Emerald Glossy Forest Panel */}
              {showHerbsPopup ? (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: 'min(500px, calc(100vw - 40px))',
                  maxHeight: 'calc(100% - 70px)',
                  background: 'transparent',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '20px',
                  boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.22), inset -1px -1px 2px rgba(0, 0, 0, 0.25), 0 16px 45px rgba(0, 0, 0, 0.55), 0 0 35px rgba(16, 185, 129, 0.15)',
                  zIndex: 35,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  animation: 'fadeIn 0.25s ease-out'
                }}>
                  {/* Glossy specular top shine reflection without blur */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '36%',
                      background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 2,
                      borderRadius: '20px 20px 0 0'
                    }}
                  />

                  {/* Inner Content Wrapper */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    flex: 1,
                    padding: '12px 18px',
                    gap: '8px',
                    position: 'relative',
                    zIndex: 5,
                    overflowY: 'auto',
                    scrollbarWidth: 'none'
                  }}>
                    {/* Header Row: Badge & Close Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.2) 100%)',
                        color: '#A7F3D0',
                        border: '1.2px solid rgba(110, 231, 183, 0.45)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 800,
                        fontSize: '18px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                      }}>
                        <span style={{ fontSize: '18px' }}>🌿</span>
                        <span>HERBS</span>
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Play / Pause Narration Button */}
                        <button
                          type="button"
                          onClick={toggleHerbsSpeech}
                          aria-label={isHerbsSpeaking ? 'Pause Narration' : 'Play Narration'}
                          title={isHerbsSpeaking ? 'Pause Narration' : 'Play Narration'}
                          style={{
                            background: isHerbsSpeaking
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                            border: '1.5px solid #34D399',
                            boxShadow: isHerbsSpeaking
                              ? '0 0 14px rgba(16, 185, 129, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                              : '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(16, 185, 129, 0.25)',
                            borderRadius: '16px',
                            padding: '5px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '14px',
                            fontFamily: '"Outfit", sans-serif',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.borderColor = '#6EE7B7';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = '#34D399';
                          }}
                        >
                          {isHerbsSpeaking ? (
                            <>
                              <Pause size={13} fill="#FFFFFF" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play size={13} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        {/* Close popup button */}
                        <button
                          type="button"
                          onClick={() => { pauseHerbsNarration(); setShowHerbsPopup(false); }}
                          aria-label="Close popup and view full scenery"
                          title="View full scenery photo"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1.2px solid rgba(255, 255, 255, 0.22)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                            borderRadius: '10px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.9)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.35)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.65)';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Title Section: 24px Title */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3 style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 900,
                        fontSize: '24px',
                        margin: 0,
                        color: '#FCD34D',
                        lineHeight: 1.2,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 2px #000000, 0 0 16px rgba(252, 211, 77, 0.5)'
                      }}>
                        TENDER GREEN HERBS
                      </h3>
                      <div style={{
                        fontSize: '18px',
                        color: '#6EE7B7',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        fontFamily: '"Outfit", sans-serif',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)'
                      }}>
                        Non-woody • Flexible Stems
                      </div>
                    </div>

                    {/* Info Panel */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {/* Section 1: Soft Green Stems */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #10B981`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#A7F3D0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🌱</span>
                          <span>Soft Green Stems</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={herbsNarrationData.herbs.words.slice(0, 10)}
                            activeIndex={herbsActiveWordIndex}
                            baseIndex={0}
                            activeStyle={{ color: '#34D399', textShadow: '0 0 10px rgba(52, 211, 153, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 2: Size */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #F59E0B`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#FDE68A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>📏</span>
                          <span>Size</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={herbsNarrationData.herbs.words.slice(10, 19)}
                            activeIndex={herbsActiveWordIndex}
                            baseIndex={10}
                            activeStyle={{ color: '#FCD34D', textShadow: '0 0 10px rgba(252, 211, 77, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 3: Life Cycle */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #3B82F6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#BFDBFE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🔄</span>
                          <span>Life Cycle</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={herbsNarrationData.herbs.words.slice(19, 35)}
                            activeIndex={herbsActiveWordIndex}
                            baseIndex={19}
                            activeStyle={{ color: '#93C5FD', textShadow: '0 0 10px rgba(147, 197, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 4: Examples */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #8B5CF6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#DDD6FE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🌿</span>
                          <span>Examples</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FEF08A',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 600,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={herbsNarrationData.herbs.words.slice(35, 40)}
                            activeIndex={herbsActiveWordIndex}
                            baseIndex={35}
                            activeStyle={{ color: '#C4B5FD', textShadow: '0 0 10px rgba(196, 181, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>

                      {/* Think Prompt Box */}
                      <div style={{
                        marginTop: '2px',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(16, 185, 129, 0.18) 100%)',
                        border: '1.2px solid rgba(251, 191, 36, 0.45)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                      }}>
                        <span style={{ fontSize: '20px', lineHeight: 1.2 }}>💡</span>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 800,
                          color: '#FDE047',
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: 'justify',
                          lineHeight: 1.4,
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
                        }}>
                          <span style={{ fontSize: '21px', fontWeight: 900 }}>Think: </span>
                          <span style={{ fontWeight: 500, color: '#FFFFFF' }}>
                            <NarratedWords
                              words={herbsNarrationData.herbs.words.slice(40, 50)}
                              activeIndex={herbsActiveWordIndex}
                              baseIndex={40}
                              activeStyle={{ color: '#FDE047', textShadow: '0 0 10px rgba(253, 224, 71, 0.9), 0 1px 3px #000000' }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Left-Side Center Arrow Trigger: Opens Herbs Details */
                <button
                  type="button"
                  onClick={() => setShowHerbsPopup(true)}
                  title="Open Herbs Details"
                  aria-label="Open Herbs Details"
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
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    color: '#FFFBEB',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    borderLeft: 'none',
                    borderRadius: '0 20px 20px 0',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '15px',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.80), 0 0 24px rgba(251, 191, 36, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                >
                  <Leaf size={18} color="#FFFBEB" strokeWidth={2.5} />
                  <ChevronRight size={22} color="#FEF08A" strokeWidth={3} />
                </button>
              )}

              {/* Bottom-Left: Previous Page */}
              {onBackToDashboard && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '24px',
                  zIndex: 35
                }}>
                  <button
                    type="button"
                    onClick={onBackToDashboard}
                    style={{
                      padding: '8px 24px',
                      fontSize: '16px',
                      fontWeight: 900,
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '2px solid rgba(253, 230, 138, 0.85)',
                      color: '#FFFBEB',
                      cursor: 'pointer',
                      fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.borderColor = '#FEF08A';
                      e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                    }}
                    title="Return to Previous Page"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} /> Previous Page
                  </button>
                </div>
              )}

              {/* Bottom-Right: Next Page (Advance to Shrubs) */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => setCategoryStep(1)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 24px',
                    borderRadius: '10px',
                    fontSize: '17px',
                    fontWeight: 900,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    border: '1.8px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.80)',
                    fontFamily: '"Outfit", sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Advance to Shrubs"
                  aria-label="Next Page"
                >
                  <span>Next: Shrubs</span>
                  <ChevronRight size={18} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          ) : (typeFilter === 'plant' && categoryStep === 1) ? (
            /* FULLSCREEN SHRUBS PAGE 2 WITH SLOGAN-STYLE TRANSLUCENT EMERALD POPUP */
            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0B3B24'
            }}>
              <img
                src={activity21ShrubsImg}
                alt="Activity 2.1 - Shrubs"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />

              {/* Top Center Title: Shrubs (Attractive Golden Banner, matches Habitats page) */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 35,
                pointerEvents: 'none',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                borderRadius: '14px',
                padding: '7px 30px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 24px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)'
              }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: '"Cinzel", Georgia, serif',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FFFBEB',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 16px rgba(253, 230, 138, 0.55)'
                }}>
                  Shrubs
                </h1>
              </div>

              {/* Slogan Page Style: 60% Translucent Dark Emerald Glossy Forest Panel */}
              {showShrubsPopup ? (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: 'min(500px, calc(100vw - 40px))',
                  maxHeight: 'calc(100% - 70px)',
                  background: 'transparent',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '20px',
                  boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.22), inset -1px -1px 2px rgba(0, 0, 0, 0.25), 0 16px 45px rgba(0, 0, 0, 0.55), 0 0 35px rgba(16, 185, 129, 0.15)',
                  zIndex: 35,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  animation: 'fadeIn 0.25s ease-out'
                }}>
                  {/* Glossy specular top shine reflection without blur */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '36%',
                      background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 2,
                      borderRadius: '20px 20px 0 0'
                    }}
                  />

                  {/* Inner Content Wrapper */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    flex: 1,
                    padding: '12px 18px',
                    gap: '8px',
                    position: 'relative',
                    zIndex: 5,
                    overflowY: 'auto',
                    scrollbarWidth: 'none'
                  }}>
                    {/* Header Row: Badge & Close Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.2) 100%)',
                        color: '#A7F3D0',
                        border: '1.2px solid rgba(110, 231, 183, 0.45)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 800,
                        fontSize: '18px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                      }}>
                        <span style={{ fontSize: '18px' }}>🌿</span>
                        <span>SHRUBS</span>
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Play / Pause Narration Button */}
                        <button
                          type="button"
                          onClick={toggleShrubsSpeech}
                          aria-label={isShrubsSpeaking ? 'Pause Narration' : 'Play Narration'}
                          title={isShrubsSpeaking ? 'Pause Narration' : 'Play Narration'}
                          style={{
                            background: isShrubsSpeaking
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                            border: '1.5px solid #34D399',
                            boxShadow: isShrubsSpeaking
                              ? '0 0 14px rgba(16, 185, 129, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                              : '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(16, 185, 129, 0.25)',
                            borderRadius: '16px',
                            padding: '5px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '14px',
                            fontFamily: '"Outfit", sans-serif',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.borderColor = '#6EE7B7';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = '#34D399';
                          }}
                        >
                          {isShrubsSpeaking ? (
                            <>
                              <Pause size={13} fill="#FFFFFF" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play size={13} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        {/* Close popup button */}
                        <button
                          type="button"
                          onClick={() => { pauseShrubsNarration(); setShowShrubsPopup(false); }}
                          aria-label="Close popup and view full scenery"
                          title="View full scenery photo"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1.2px solid rgba(255, 255, 255, 0.22)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                            borderRadius: '10px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.9)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.35)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.65)';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Title Section: 24px Title */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3 style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 900,
                        fontSize: '24px',
                        margin: 0,
                        color: '#FB7185',
                        lineHeight: 1.2,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 2px #000000, 0 0 16px rgba(251, 113, 133, 0.5)'
                      }}>
                        BUSHY WOODY SHRUBS
                      </h3>
                    </div>

                    {/* Info Panel */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {/* Section 1: Hard, Woody Stems */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #10B981`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#A7F3D0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🪵</span>
                          <span>Hard, Woody Stems</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={shrubsNarrationData.shrubs.words.slice(6, 15)}
                            activeIndex={shrubsActiveWordIndex}
                            baseIndex={6}
                            activeStyle={{ color: '#34D399', textShadow: '0 0 10px rgba(52, 211, 153, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 2: Branches Near the Ground */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #F59E0B`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#FDE68A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🌿</span>
                          <span>Branches Near the Ground</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={shrubsNarrationData.shrubs.words.slice(19, 31)}
                            activeIndex={shrubsActiveWordIndex}
                            baseIndex={19}
                            activeStyle={{ color: '#FCD34D', textShadow: '0 0 10px rgba(252, 211, 77, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 3: Medium Height */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #3B82F6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#BFDBFE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>📏</span>
                          <span>Medium Height</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={shrubsNarrationData.shrubs.words.slice(33, 39)}
                            activeIndex={shrubsActiveWordIndex}
                            baseIndex={33}
                            activeStyle={{ color: '#93C5FD', textShadow: '0 0 10px rgba(147, 197, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 4: Examples */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #8B5CF6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#DDD6FE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🌺</span>
                          <span>Examples</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FEF08A',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 600,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={shrubsNarrationData.shrubs.words.slice(40, 44)}
                            activeIndex={shrubsActiveWordIndex}
                            baseIndex={40}
                            activeStyle={{ color: '#C4B5FD', textShadow: '0 0 10px rgba(196, 181, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>

                      {/* Think Prompt Box */}
                      <div style={{
                        marginTop: '2px',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(16, 185, 129, 0.18) 100%)',
                        border: '1.2px solid rgba(251, 191, 36, 0.45)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                      }}>
                        <span style={{ fontSize: '20px', lineHeight: 1.2 }}>💡</span>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 800,
                          color: '#FDE047',
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: 'justify',
                          lineHeight: 1.4,
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
                        }}>
                          <span style={{ fontSize: '21px', fontWeight: 900 }}>Think: </span>
                          <span style={{ fontWeight: 500, color: '#FFFFFF' }}>
                            <NarratedWords
                              words={shrubsNarrationData.shrubs.words.slice(45, 51)}
                              activeIndex={shrubsActiveWordIndex}
                              baseIndex={45}
                              activeStyle={{ color: '#FDE047', textShadow: '0 0 10px rgba(253, 224, 71, 0.9), 0 1px 3px #000000' }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Left-Side Center Arrow Trigger: Opens Shrubs Details */
                <button
                  type="button"
                  onClick={() => setShowShrubsPopup(true)}
                  title="Open Shrubs Details"
                  aria-label="Open Shrubs Details"
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
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    color: '#FFFBEB',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    borderLeft: 'none',
                    borderRadius: '0 20px 20px 0',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '15px',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.80), 0 0 24px rgba(251, 191, 36, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                >
                  <Leaf size={18} color="#FFFBEB" strokeWidth={2.5} />
                  <ChevronRight size={22} color="#FEF08A" strokeWidth={3} />
                </button>
              )}

              {/* Bottom-Left: Back to Herbs */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => setCategoryStep(0)}
                  style={{
                    padding: '8px 24px',
                    fontSize: '16px',
                    fontWeight: 900,
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Return to Herbs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} /> Back: Herbs
                </button>
              </div>

              {/* Bottom-Right: Next Page (Advance to Trees) */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => setCategoryStep(2)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 24px',
                    borderRadius: '10px',
                    fontSize: '17px',
                    fontWeight: 900,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    border: '1.8px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.80)',
                    fontFamily: '"Outfit", sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Advance to Trees"
                  aria-label="Next Page"
                >
                  <span>Next: Trees</span>
                  <ChevronRight size={18} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          ) : (typeFilter === 'plant' && categoryStep === 2) ? (
            /* FULLSCREEN TREES PAGE 3 WITH SLOGAN-STYLE TRANSLUCENT EMERALD POPUP */
            <div style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0B3B24'
            }}>
              <img
                src={activity21TreesImg}
                alt="Activity 2.1 - Trees"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />

              {/* Top Center Title: Trees (Attractive Golden Banner, matches Habitats page) */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 35,
                pointerEvents: 'none',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                borderRadius: '14px',
                padding: '7px 30px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 24px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)'
              }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: '"Cinzel", Georgia, serif',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FFFBEB',
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 16px rgba(253, 230, 138, 0.55)'
                }}>
                  Trees
                </h1>
              </div>

              {/* Slogan Page Style: 60% Translucent Dark Emerald Glossy Forest Panel */}
              {showTreesPopup ? (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: 'min(500px, calc(100vw - 40px))',
                  maxHeight: 'calc(100% - 70px)',
                  background: 'transparent',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '20px',
                  boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.22), inset -1px -1px 2px rgba(0, 0, 0, 0.25), 0 16px 45px rgba(0, 0, 0, 0.55), 0 0 35px rgba(16, 185, 129, 0.15)',
                  zIndex: 35,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  animation: 'fadeIn 0.25s ease-out'
                }}>
                  {/* Glossy specular top shine reflection without blur */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '36%',
                      background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 2,
                      borderRadius: '20px 20px 0 0'
                    }}
                  />

                  {/* Inner Content Wrapper */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    flex: 1,
                    padding: '12px 18px',
                    gap: '8px',
                    position: 'relative',
                    zIndex: 5,
                    overflowY: 'auto',
                    scrollbarWidth: 'none'
                  }}>
                    {/* Header Row: Badge & Audio/Close Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.2) 100%)',
                        color: '#A7F3D0',
                        border: '1.2px solid rgba(110, 231, 183, 0.45)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 800,
                        fontSize: '18px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                      }}>
                        <span style={{ fontSize: '18px' }}>🌳</span>
                        <span>TREES</span>
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Play / Pause Narration Button */}
                        <button
                          type="button"
                          onClick={toggleTreesSpeech}
                          aria-label={isTreesSpeaking ? 'Pause Narration' : 'Play Narration'}
                          title={isTreesSpeaking ? 'Pause Narration' : 'Play Narration'}
                          style={{
                            background: isTreesSpeaking
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.35) 100%)',
                            border: '1.5px solid #34D399',
                            boxShadow: isTreesSpeaking
                              ? '0 0 14px rgba(16, 185, 129, 0.85), 0 2px 8px rgba(0,0,0,0.4)'
                              : '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 8px rgba(16, 185, 129, 0.25)',
                            borderRadius: '16px',
                            padding: '5px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '14px',
                            fontFamily: '"Outfit", sans-serif',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.borderColor = '#6EE7B7';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = '#34D399';
                          }}
                        >
                          {isTreesSpeaking ? (
                            <>
                              <Pause size={13} fill="#FFFFFF" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play size={13} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        {/* Close popup button */}
                        <button
                          type="button"
                          onClick={() => { pauseTreesNarration(); setShowTreesPopup(false); }}
                          aria-label="Close popup and view full scenery"
                          title="View full scenery photo"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1.2px solid rgba(255, 255, 255, 0.22)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                            borderRadius: '10px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.9)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.35)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.65)';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <span style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>✕</span>
                        </button>
                      </div>
                    </div>

                    {/* Title Section: 24px Title */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3 style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontWeight: 900,
                        fontSize: '24px',
                        margin: 0,
                        color: '#FBBF24',
                        lineHeight: 1.2,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 2px #000000, 0 0 16px rgba(251, 191, 36, 0.5)'
                      }}>
                        TOWERING WOODY TREES
                      </h3>
                    </div>

                    {/* Info Panel */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {/* Section 1: Thick, Woody Trunk */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #10B981`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#A7F3D0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🪵</span>
                          <span>Thick, Woody Trunk</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={treesNarrationData.trees.words.slice(6, 22)}
                            activeIndex={treesActiveWordIndex}
                            baseIndex={6}
                            activeStyle={{ color: '#34D399', textShadow: '0 0 10px rgba(52, 211, 153, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 2: Branches and Canopy */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #F59E0B`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#FDE68A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🍃</span>
                          <span>Branches and Canopy</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={treesNarrationData.trees.words.slice(25, 43)}
                            activeIndex={treesActiveWordIndex}
                            baseIndex={25}
                            activeStyle={{ color: '#FCD34D', textShadow: '0 0 10px rgba(252, 211, 77, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 3: Height and Lifespan */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #3B82F6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#BFDBFE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>⏳</span>
                          <span>Height and Lifespan</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={treesNarrationData.trees.words.slice(46, 54)}
                            activeIndex={treesActiveWordIndex}
                            baseIndex={46}
                            activeStyle={{ color: '#93C5FD', textShadow: '0 0 10px rgba(147, 197, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.02) 100%)' }} />

                      {/* Section 4: Examples */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: `3.5px solid #8B5CF6`, paddingLeft: '12px' }}>
                        <div style={{
                          fontSize: '21px',
                          fontWeight: 800,
                          color: '#DDD6FE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.98), 0 0 10px rgba(0, 0, 0, 0.6)'
                        }}>
                          <span style={{ fontSize: '21px' }}>🌳</span>
                          <span>Examples</span>
                        </div>
                        <div style={{
                          fontSize: '18px',
                          color: '#FEF08A',
                          textAlign: 'justify',
                          textShadow: '0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.98)',
                          fontWeight: 600,
                          lineHeight: 1.45,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          <NarratedWords
                            words={treesNarrationData.trees.words.slice(55, 59)}
                            activeIndex={treesActiveWordIndex}
                            baseIndex={55}
                            activeStyle={{ color: '#C4B5FD', textShadow: '0 0 10px rgba(196, 181, 253, 0.9), 0 1px 3px #000000' }}
                          />
                        </div>
                      </div>

                      {/* Think Prompt Box */}
                      <div style={{
                        marginTop: '2px',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(16, 185, 129, 0.18) 100%)',
                        border: '1.2px solid rgba(251, 191, 36, 0.45)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                      }}>
                        <span style={{ fontSize: '20px', lineHeight: 1.2 }}>💡</span>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 800,
                          color: '#FDE047',
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: 'justify',
                          lineHeight: 1.4,
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
                        }}>
                          <span style={{ fontSize: '21px', fontWeight: 900 }}>Think: </span>
                          <span style={{ fontWeight: 500, color: '#FFFFFF' }}>
                            <NarratedWords
                              words={treesNarrationData.trees.words.slice(60, 67)}
                              activeIndex={treesActiveWordIndex}
                              baseIndex={60}
                              activeStyle={{ color: '#FDE047', textShadow: '0 0 10px rgba(253, 224, 71, 0.9), 0 1px 3px #000000' }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Left-Side Center Arrow Trigger: Opens Trees Details */
                <button
                  type="button"
                  onClick={() => setShowTreesPopup(true)}
                  title="Open Trees Details"
                  aria-label="Open Trees Details"
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
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    color: '#FFFBEB',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    borderLeft: 'none',
                    borderRadius: '0 20px 20px 0',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 900,
                    fontSize: '15px',
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.80), 0 0 24px rgba(251, 191, 36, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                >
                  <Leaf size={18} color="#FFFBEB" strokeWidth={2.5} />
                  <ChevronRight size={22} color="#FEF08A" strokeWidth={3} />
                </button>
              )}

              {/* Bottom-Left: Back to Shrubs */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => setCategoryStep(1)}
                  style={{
                    padding: '8px 24px',
                    fontSize: '16px',
                    fontWeight: 900,
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Return to Shrubs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} /> Back: Shrubs
                </button>
              </div>

              {/* Bottom-Right: Next Page (Advance to Botanical Field Scanner) */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '24px',
                zIndex: 35
              }}>
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
                    borderRadius: '12px',
                    fontSize: '17px',
                    fontWeight: 900,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.8px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.80)',
                    fontFamily: '"Outfit", sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Explore Table 2.1"
                  aria-label="Next Page"
                >
                  <span>Next: Table 2.1</span>
                  <ArrowRight size={18} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          ) : (
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
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
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
                        backdropFilter: 'blur(4px)',
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

                {/* Right: Botanical Scientific Profile Card in Slogan Page 60% Translucent Emerald Glass Style */}
                <div style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(6, 38, 22, 0.30) 0%, rgba(4, 28, 16, 0.30) 45%, rgba(2, 18, 11, 0.32) 100%)',
                  backdropFilter: 'blur(4px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(2px) saturate(180%)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '24px',
                  padding: 'clamp(8px, 1.2vh, 14px) clamp(10px, 1.2vw, 16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 0,
                  overflow: 'hidden',
                  boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.22), inset -1px -1px 2px rgba(0, 0, 0, 0.25), 0 16px 45px rgba(0, 0, 0, 0.55), 0 0 35px rgba(16, 185, 129, 0.15)',
                  boxSizing: 'border-box'
                }}>
                  {/* Glossy specular top shine reflection without blur */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '36%',
                      background: 'linear-gradient(175deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                      pointerEvents: 'none',
                      zIndex: 2,
                      borderRadius: '24px 24px 0 0'
                    }}
                  />

                  {/* Card Content Framed with clean layout, zero overlap, zero scroll, and 16px-24px fonts */}
                  <div style={{
                    position: 'relative',
                    zIndex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    minHeight: 0,
                    gap: 'clamp(6px, 1vh, 10px)'
                  }}>
                    {/* Top Group: Pill Badge, Title, Subtitle, Leaf Divider & Description Quote */}
                    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '4px' }}>
                      {/* Top Pill Badge matching Slogan Page with Realistic Photographic Icon */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.2) 100%)',
                          color: '#A7F3D0',
                          border: '1.2px solid rgba(110, 231, 183, 0.45)',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          padding: '4px 16px',
                          borderRadius: '22px',
                          fontFamily: '"Outfit", sans-serif',
                          fontWeight: 800,
                          fontSize: '16px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '7px',
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                        }}>
                          <RealisticCategoryIcon categoryId={currentCat.id} size={16} />
                          <span>{currentCat.tag}</span>
                        </span>
                      </div>

                      {/* Category Heading (24px) & Subtitle (16px) */}
                      <div style={{ textAlign: 'center' }}>
                        <h2 style={{
                          margin: '2px 0 0 0',
                          fontFamily: '"Outfit", sans-serif',
                          fontSize: 'clamp(22px, 2.2vw, 25px)',
                          color: '#FFFFFF',
                          fontWeight: 900,
                          lineHeight: '1.2',
                          letterSpacing: '-0.01em',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 2px #000000'
                        }}>
                          {currentCat.name}
                        </h2>
                        <div style={{
                          fontSize: '16px',
                          color: '#6EE7B7',
                          fontWeight: 600,
                          fontStyle: 'italic',
                          fontFamily: '"Outfit", sans-serif',
                          textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)',
                          marginTop: '1px'
                        }}>
                          {currentCat.id === 'herbs' ? 'Non-woody • Flexible Tender Stems' :
                           currentCat.id === 'shrubs' ? 'Hard Thin Woody Stems • Bushy Structure' :
                           currentCat.id === 'trees' ? 'Single Massive Woody Trunk • Towering Canopy' :
                           'Specialized Survival Adaptations'}
                        </div>
                      </div>

                      {/* Slogan-Style Descriptive Quote Card (16px) */}
                      <div style={{
                        position: 'relative',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(0, 0, 0, 0.32) 100%)',
                        border: '1.2px solid rgba(110, 231, 183, 0.35)',
                        borderLeft: '4px solid #10B981',
                        padding: 'clamp(8px, 1.1vh, 10px) clamp(10px, 1.2vw, 14px)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                        marginTop: '2px'
                      }}>
                        <p style={{
                          margin: 0,
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: '16px',
                          color: '#F0FDF4',
                          lineHeight: '1.38',
                          fontStyle: 'italic',
                          fontWeight: 600,
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)'
                        }}>
                          "{currentCat.quote}"
                        </p>
                      </div>
                    </div>

                    {/* Middle Group: Concise NCERT Field Observation in Amber Glass Card (16px) */}
                    <div style={{
                      position: 'relative',
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(0, 0, 0, 0.32) 100%)',
                      border: '1.2px solid rgba(252, 211, 77, 0.35)',
                      borderLeft: '4px solid #F59E0B',
                      borderRadius: '12px',
                      padding: 'clamp(6px, 1vh, 10px) clamp(10px, 1.2vw, 14px)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
                      <span style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: '16px',
                        color: '#FEF3C7',
                        fontWeight: 600,
                        lineHeight: '1.35',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)'
                      }}>
                        {currentCat.id === 'herbs' ? 'Tender green stems bend easily; life cycle spans 1–2 seasons.' :
                         currentCat.id === 'shrubs' ? 'Woody stems branch near the base giving a bushy structure.' :
                         currentCat.id === 'trees' ? 'Single thick woody trunk; deep roots anchor a high crown.' :
                         currentCat.id === 'crawlers' ? 'Soil dwellers crawl and burrow to aerate rich garden earth.' :
                         currentCat.id === 'aerial' ? 'Lightweight hollow bones and wings enable soaring flight.' :
                         'Adapted limbs enable walking on land and swimming in ponds.'}
                      </span>
                    </div>

                    {/* Bottom Group: Visual Classification Badges & NCERT Examples Box */}
                    <div style={{
                      position: 'relative',
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.38) 100%)',
                      border: '1.2px solid rgba(110, 231, 183, 0.3)',
                      borderRadius: '14px',
                      padding: 'clamp(6px, 1vh, 9px) clamp(8px, 1.1vw, 12px)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      flexShrink: 0
                    }}>
                      {/* Row of 3 Realistic Icon Badges: Perfectly 3-column grid without wrapping */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', alignItems: 'stretch' }}>
                        {/* Height / Specimen Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(6, 78, 59, 0.35) 100%)',
                          border: '1.2px solid rgba(110, 231, 183, 0.45)', borderRadius: '10px',
                          padding: '5px 3px', minWidth: 0,
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
                        }}>
                          <RealisticSpecimenMedallion categoryId={currentCat.id} size={22} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#A7F3D0', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', textShadow: '0 1px 3px rgba(0,0,0,0.9)', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Short' : currentCat.id === 'shrubs' ? 'Medium' : currentCat.id === 'trees' ? 'Tall' : currentCat.traits[0]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                        {/* Stem / Habitat Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.28) 0%, rgba(120, 53, 15, 0.35) 100%)',
                          border: '1.2px solid rgba(252, 211, 77, 0.45)', borderRadius: '10px',
                          padding: '5px 3px', minWidth: 0,
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
                        }}>
                          <RealisticTextureMedallion categoryId={currentCat.id} size={22} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#FDE68A', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', textShadow: '0 1px 3px rgba(0,0,0,0.9)', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Soft Stem' : currentCat.id === 'shrubs' ? 'Woody Base' : currentCat.id === 'trees' ? 'Thick Trunk' : currentCat.traits[1]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                        {/* Branching / Role Realistic Badge */}
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.28) 0%, rgba(49, 46, 129, 0.35) 100%)',
                          border: '1.2px solid rgba(165, 180, 252, 0.45)', borderRadius: '10px',
                          padding: '5px 3px', minWidth: 0,
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
                        }}>
                          <RealisticRoleMedallion categoryId={currentCat.id} size={22} />
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#C7D2FE', fontFamily: '"Outfit", sans-serif', textAlign: 'center', lineHeight: '1.15', textShadow: '0 1px 3px rgba(0,0,0,0.9)', wordBreak: 'break-word' }}>
                            {currentCat.id === 'herbs' ? 'Few Branches' : currentCat.id === 'shrubs' ? 'Bushy Base' : currentCat.id === 'trees' ? 'High Crown' : currentCat.traits[2]?.value?.split(',')[0] || ''}
                          </span>
                        </div>
                      </div>

                      {/* NCERT Examples Box */}
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.16) 0%, rgba(0, 0, 0, 0.32) 100%)',
                        border: '1.2px solid rgba(147, 197, 253, 0.35)',
                        borderLeft: '4px solid #3B82F6',
                        borderRadius: '10px',
                        padding: '5px 10px',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '7px'
                      }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: '#93C5FD', fontFamily: '"Outfit", sans-serif', flexShrink: 0, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                          📚 Examples:
                        </span>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', fontFamily: '"Outfit", sans-serif', lineHeight: '1.3', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
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
                  ) : (
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
                      title={typeFilter === 'plant' ? "Explore Botanical Field Scanner" : "Explore Animal Field Scanner"}
                      aria-label="Field Scanner"
                    >
                      <span>{typeFilter === 'plant' ? 'Next: Table 2.1' : 'Next: Table 2.2'}</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {/* ============ PAGE 2: BOTANICAL GARDEN FIELD SCANNER (MATCHING LEAVES SLOGAN PAGE DESIGN) ============ */}
        {(subPage === 2 || subPage === 3) && (
          typeFilter === 'plant' ? (
            /* FULLSCREEN BOTANICAL FIELD SCANNER WITH HIGH-PRECISION RETICLE LOUPE & SLOGAN POPUP */
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseDown={startHolding}
              onMouseUp={stopHolding}
              onMouseLeave={() => { setIsInsideImage(false); stopHolding(); setHoveredTarget(null); }}
              onMouseEnter={() => setIsInsideImage(true)}
              style={{
                position: 'relative',
                flex: 1,
                minHeight: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#041d13',
                cursor: hoveredTarget ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              {/* Fullscreen High-Resolution Botanical Garden Scene Background */}
              <img
                src={activity21FieldScannerImg}
                alt="Activity 2.1 - Botanical Garden Field Scanner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  imageRendering: '-webkit-optimize-contrast',
                  filter: 'contrast(1.05) saturate(1.08) brightness(1.02)'
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
                  top: '-30%',
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
                  width: '160px',
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

              {/* 2. Whole Plant / Organism Luminous Highlight (When scanner is on this plant) */}
              {filteredTargets.map(t => {
                const isHovered = isInsideImage && hoveredTarget && hoveredTarget.data.id === t.id;
                if (!isHovered) return null;

                return (
                  <div
                    key={`whole-organism-highlight-${t.id}`}
                    style={{
                      position: 'absolute',
                      left: `${t.x}%`,
                      top: `${t.y}%`,
                      width: `${t.w || 22}%`,
                      height: `${t.h || 24}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      zIndex: 18,
                      borderRadius: '24px',
                      border: '2.5px solid #10B981',
                      background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.14) 60%, rgba(4, 120, 87, 0.05) 90%)',
                      boxShadow: '0 0 35px rgba(16, 185, 129, 0.85), inset 0 0 25px rgba(16, 185, 129, 0.4)',
                      filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.75))',
                      animation: 'organismGlowPulse 1.8s infinite ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top Specimen Identification Pill */}
                    <div style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)',
                      border: '2px solid #34D399',
                      borderRadius: '20px',
                      padding: '3px 14px',
                      color: '#ECFDF5',
                      fontSize: '13px',
                      fontWeight: 900,
                      fontFamily: '"Outfit", sans-serif',
                      letterSpacing: '0.04em',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5), 0 0 12px rgba(52, 211, 153, 0.6)',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 19
                    }}>
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                      {t.category && (
                        <span style={{
                          background: 'rgba(52, 211, 153, 0.25)',
                          padding: '1px 7px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          color: '#A7F3D0',
                          fontWeight: 800
                        }}>
                          {t.category.split('·')[0].trim()}
                        </span>
                      )}
                      <span style={{
                        color: '#FDE047',
                        fontSize: '11px',
                        fontWeight: 800,
                        marginLeft: '3px'
                      }}>
                        ✦ Click to Inspect
                      </span>
                    </div>

                    {/* Corner Reticle Brackets */}
                    <div style={{ position: 'absolute', top: '5px', left: '5px', width: '14px', height: '14px', borderTop: '2.5px solid #6EE7B7', borderLeft: '2.5px solid #6EE7B7', borderRadius: '4px 0 0 0' }} />
                    <div style={{ position: 'absolute', top: '5px', right: '5px', width: '14px', height: '14px', borderTop: '2.5px solid #6EE7B7', borderRight: '2.5px solid #6EE7B7', borderRadius: '0 4px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: '5px', left: '5px', width: '14px', height: '14px', borderBottom: '2.5px solid #6EE7B7', borderLeft: '2.5px solid #6EE7B7', borderRadius: '0 0 0 4px' }} />
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '14px', height: '14px', borderBottom: '2.5px solid #6EE7B7', borderRight: '2.5px solid #6EE7B7', borderRadius: '0 0 4px 0' }} />
                  </div>
                );
              })}

              {/* 3. Clickable Hotspots for Plants - Version 1 Style */}
              {filteredTargets.map(t => (
                <div
                  key={`click-area-${t.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openPlantModal(t);
                    if (!notebook.includes(t.id)) {
                      logToNotebookDirect(t.id);
                    }
                  }}
                  title={`Click to inspect ${t.name}`}
                  style={{
                    position: 'absolute',
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${t.w || 20}%`,
                    height: `${t.h || 20}%`,
                    cursor: 'pointer',
                    borderRadius: '8px',
                    zIndex: 20
                  }}
                />
              ))}


              


              

              {/* Top-Center Title: Table 2.1 */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 34,
                padding: '10px 28px',
                borderRadius: '14px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
                pointerEvents: 'none',
                maxWidth: '78%'
              }}>
                <h1 style={{
                  margin: 0,
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 900,
                  fontSize: '19px',
                  color: '#FFFBEB',
                  textAlign: 'center',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}>
                  Table 2.1: Observations of different plants around us
                </h1>
              </div>


              {/* 9. Bottom-Left: Back to Trees */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setSubPage(1);
                    setCategoryStep(2);
                  }}
                  style={{
                    padding: '8px 24px',
                    fontSize: '16px',
                    fontWeight: 900,
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Return to Trees"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} /> Back: Trees
                </button>
              </div>

              {/* 10. Bottom-Right: Advance to Table 2.2 */}
              {(onNextActivity || onNextSection || onBackToDashboard) && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '24px',
                  zIndex: 35
                }}>
                  <button
                    type="button"
                    onClick={onNextActivity || onNextSection || onBackToDashboard}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 24px',
                      borderRadius: '12px',
                      fontSize: '17px',
                      fontWeight: 900,
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.8px solid rgba(253, 230, 138, 0.85)',
                      color: '#FFFBEB',
                      cursor: 'pointer',
                      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.80)',
                      fontFamily: '"Outfit", sans-serif',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.borderColor = '#FEF08A';
                      e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                      e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                    }}
                    title="Advance to Next Activity"
                    aria-label="Next Page"
                  >
                    <span>Next: Table 2.2</span>
                    <ArrowRight size={18} strokeWidth={2.6} />
                  </button>
                </div>
              )}
            </div>
                    ) : (
            /* FULLSCREEN ANIMALS ZOOLOGICAL FIELD SCANNER WITH REALISTIC CREAM CORNER POPUP */
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseDown={startHolding}
              onMouseUp={stopHolding}
              onMouseLeave={() => { setIsInsideImage(false); stopHolding(); setHoveredTarget(null); }}
              onMouseEnter={() => setIsInsideImage(true)}
              style={{
                position: 'relative',
                flex: 1,
                minHeight: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#041d13',
                cursor: hoveredTarget ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              {/* Fullscreen High-Resolution Animals Scene Background */}
              <img
                src={activityAnimalsImage}
                alt="Activity 2.1 - Wildlife & Animals Field Scanner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  imageRendering: 'high-quality',
                  filter: 'none'
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

              {/* 2. Whole Plant / Organism Luminous Highlight (When scanner is on this plant) */}
              {filteredTargets.map(t => {
                const isHovered = isInsideImage && hoveredTarget && hoveredTarget.data.id === t.id;
                if (!isHovered) return null;

                return (
                  <div
                    key={`whole-organism-highlight-${t.id}`}
                    style={{
                      position: 'absolute',
                      left: `${t.x}%`,
                      top: `${t.y}%`,
                      width: `${t.w || 22}%`,
                      height: `${t.h || 24}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      zIndex: 18,
                      borderRadius: '24px',
                      border: '2.5px solid #10B981',
                      background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.14) 60%, rgba(4, 120, 87, 0.05) 90%)',
                      boxShadow: '0 0 35px rgba(16, 185, 129, 0.85), inset 0 0 25px rgba(16, 185, 129, 0.4)',
                      filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.75))',
                      animation: 'organismGlowPulse 1.8s infinite ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top Specimen Identification Pill */}
                    <div style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)',
                      border: '2px solid #34D399',
                      borderRadius: '20px',
                      padding: '3px 14px',
                      color: '#ECFDF5',
                      fontSize: '13px',
                      fontWeight: 900,
                      fontFamily: '"Outfit", sans-serif',
                      letterSpacing: '0.04em',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5), 0 0 12px rgba(52, 211, 153, 0.6)',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 19
                    }}>
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                      {t.category && (
                        <span style={{
                          background: 'rgba(52, 211, 153, 0.25)',
                          padding: '1px 7px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          color: '#A7F3D0',
                          fontWeight: 800
                        }}>
                          {t.category.split('·')[0].trim()}
                        </span>
                      )}
                      <span style={{
                        color: '#FDE047',
                        fontSize: '11px',
                        fontWeight: 800,
                        marginLeft: '3px'
                      }}>
                        ✦ Click to Inspect
                      </span>
                    </div>

                    {/* Corner Reticle Brackets */}
                    <div style={{ position: 'absolute', top: '5px', left: '5px', width: '14px', height: '14px', borderTop: '2.5px solid #6EE7B7', borderLeft: '2.5px solid #6EE7B7', borderRadius: '4px 0 0 0' }} />
                    <div style={{ position: 'absolute', top: '5px', right: '5px', width: '14px', height: '14px', borderTop: '2.5px solid #6EE7B7', borderRight: '2.5px solid #6EE7B7', borderRadius: '0 4px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: '5px', left: '5px', width: '14px', height: '14px', borderBottom: '2.5px solid #6EE7B7', borderLeft: '2.5px solid #6EE7B7', borderRadius: '0 0 0 4px' }} />
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '14px', height: '14px', borderBottom: '2.5px solid #6EE7B7', borderRight: '2.5px solid #6EE7B7', borderRadius: '0 0 4px 0' }} />
                  </div>
                );
              })}

              {/* 3. Clickable Hotspots for Animals - Version 1 Style */}
              {filteredTargets.map(t => (
                <div
                  key={`click-area-${t.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openAnimalModal(t);
                    if (!notebook.includes(t.id)) {
                      setNotebook(prev => [...prev, t.id]);
                      sounds.playStar();
                      confetti({
                        particleCount: 25,
                        spread: 50,
                        origin: { x: t.x / 100, y: t.y / 100 },
                        colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#FBBF24']
                      });
                    }
                  }}
                  title={`Click to inspect ${t.name}`}
                  style={{
                    position: 'absolute',
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${t.w || 18}%`,
                    height: `${t.h || 18}%`,
                    cursor: 'pointer',
                    borderRadius: '8px',
                    zIndex: 20
                  }}
                />
              ))}

              


              

              {/* Top-Center Title: Table 2.2 */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 34,
                padding: '10px 28px',
                borderRadius: '14px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
                pointerEvents: 'none',
                maxWidth: '78%'
              }}>
                <h1 style={{
                  margin: 0,
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 900,
                  fontSize: '19px',
                  color: '#FFFBEB',
                  textAlign: 'center',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2
                }}>
                  Table 2.2: Observations of different animals around us
                </h1>
              </div>

              {/* Bottom-Left: Navigation Back */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={() => {
                    if (onBackToDashboard) onBackToDashboard();
                    else if (onNextSection) onNextSection();
                  }}
                  style={{
                    padding: '8px 24px',
                    fontSize: '16px',
                    fontWeight: 900,
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '2px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Return to Previous Activity"
                  aria-label="Previous Activity"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} /> Back
                </button>
              </div>

              {/* 8. Bottom-Right: Advance to Next Activity */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '24px',
                zIndex: 35
              }}>
                <button
                  type="button"
                  onClick={onNextActivity || onNextSection || onBackToDashboard}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 24px',
                    borderRadius: '10px',
                    fontSize: '17px',
                    fontWeight: 900,
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 48%, rgba(0, 0, 0, 0.20) 52%, rgba(0, 0, 0, 0.55) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.88) 0%, rgba(2, 24, 14, 0.94) 100%)',
                    border: '1.8px solid rgba(253, 230, 138, 0.85)',
                    color: '#FFFBEB',
                    cursor: 'pointer',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.80)',
                    fontFamily: '"Outfit", sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#FEF08A';
                    e.currentTarget.style.boxShadow = '0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25)';
                  }}
                  title="Advance to Botanical Field Scanner"
                  aria-label="Next Page"
                >
                  <span>Next: Field Scanner</span>
                  <ChevronRight size={18} strokeWidth={2.6} />
                </button>
              </div>

              {/* Looping ambient nature sound audio element */}
              <audio ref={natureAudioRef} src={natureForestAudio} loop preload="auto" />

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

              {/* Specimen target notification float */}
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
                      {(polaroidSnap.data?.specimenPhoto || ANIMAL_IMAGE_ASSETS[polaroidSnap.data?.id]) ? (
                        <img
                          src={polaroidSnap.data?.specimenPhoto || ANIMAL_IMAGE_ASSETS[polaroidSnap.data?.id]}
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
                </div>
              )}



            {/* SCANNED SPECIMEN VERIFICATION MODAL OVERLAY (Slogan theme, strictly 16px to 24px typography) */}
            {scannedOrganism && (
              <div style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999999,
                background: 'rgba(20, 69, 47, 0.45)',
                backdropFilter: 'blur(4px)',
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
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
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
                    backdropFilter: 'blur(4px)',
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
                      backdropFilter: 'blur(4px)',
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
        )
      )}
      </div>

      {/* Fullscreen High-Resolution Plant Specimen View with Slogan-Style Translucent Observation Popup & Synchronized Narration */}
      {infoCardPlant && (
        <BotanicalPlantSpecimenModal
          plant={infoCardPlant}
          onClose={closePlantModal}
          plantImage={PLANT_CROPPED_IMAGES[infoCardPlant.id] || PLANT_CROPPED_IMAGES[infoCardPlant.name] || infoCardPlant.specimenPhoto}
        />
      )}

      {/* Fullscreen High-Resolution Animal Specimen View with Slogan-Style Translucent Observation Popup & Synchronized Narration */}
      {infoCardAnimal && (
        <ZoologicalAnimalSpecimenModal
          animal={infoCardAnimal}
          onClose={closeAnimalModal}
          animalImage={ANIMAL_WIDE_IMAGES[infoCardAnimal.id] || ANIMAL_WIDE_IMAGES[infoCardAnimal.name] || infoCardAnimal.img || ANIMAL_IMAGE_ASSETS[infoCardAnimal.id] || ANIMAL_IMAGE_ASSETS[infoCardAnimal.name]}
          ncertRecord={ANIMAL_NCERT_RECORDS[(infoCardAnimal.id || infoCardAnimal.name || '').toLowerCase()] || infoCardAnimal.tableInfo || {}}
        />
      )}

      <style>{`
        @keyframes organismGlowPulse {
          0%, 100% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.85), inset 0 0 20px rgba(16, 185, 129, 0.35); border-color: #10B981; }
          50% { box-shadow: 0 0 45px rgba(52, 211, 153, 1), inset 0 0 35px rgba(52, 211, 153, 0.5); border-color: #34D399; }
        }
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
            backdropFilter: 'blur(4px)',
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
