import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, RefreshCw, CheckCircle, ChevronRight, ChevronLeft, 
  Award, Sparkles, ZoomIn, X, Maximize2, Volume2, VolumeX, 
  Lightbulb, Eye, HelpCircle, Check, ArrowRight, BookOpen, Layers,
  Play, Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext.jsx';
import wingsWithBgHd from '../../../../../assets/wings_with_bg_hd.png';
import wingsWithoutBgHd from '../../../../../assets/wings_without_bg_hd.png';
import wingsIconWith from '../../../../../assets/wings_icon_with.png';
import wingsIconWithout from '../../../../../assets/wings_icon_without.png';
import habitatLandBgHd from '../../../../../assets/habitat_land_bg_hd.png';
import habitatWaterBgHd from '../../../../../assets/habitat_water_bg_hd.png';
import habitatBothBgHd from '../../../../../assets/habitat_both_bg_hd.png';
import habitatIconLand from '../../../../../assets/habitat_icon_land.png';
import habitatIconWater from '../../../../../assets/habitat_icon_water.png';
import habitatIconBoth from '../../../../../assets/habitat_icon_both.png';
import specimen01MangoBlended from './specimen_01_mango_blended.png';
import specimen02RoseBlended from './specimen_02_rose_blended.png';
import specimen03TomatoBlended from './specimen_03_tomato_blended.png';
import specimen04NeemBlended from './specimen_04_neem_blended.png';
import specimen05HibiscusBlended from './specimen_05_hibiscus_blended.png';
import specimen06MintBlended from './specimen_06_mint_blended.png';
import specimen07BanyanBlended from './specimen_07_banyan_blended.png';
import specimen08CottonBlended from './specimen_08_cotton_blended.png';
import specimen09SunflowerBlended from './specimen_09_sunflower_blended.png';
import natureGreeneryBg from '../../../../../assets/nature_greenery_bg.jpg';


// =========================================================================
// ASSET PATH CONSTANTS
// =========================================================================
const BG_MOUNTAIN = '/activities/class6_chapter2/grouping/background image.png';
const BG_TABLE_GARDEN = '/activities/class6_chapter2/grouping/table2_3_garden_bg.jpg';

// Table 2.3: Grouping of plants based on height and nature of stem
const TABLE_2_3_ROWS = [
  { id: 'mango', name: 'Mango' },
  { id: 'rose', name: 'Rose' },
  { id: 'tomato', name: 'Tomato' },
  { id: 'sunflower', name: 'Sunflower' },
  { id: 'hibiscus', name: 'Hibiscus' }
];

const TABLE_2_3_COLUMNS = [
  { id: 'height', label: 'Height', group: 'Height', options: ['Short', 'Medium', 'Tall'] },
  { id: 'stemColor', label: 'Green / Brown', group: 'Nature of stem', options: ['Green', 'Brown'] },
  { id: 'stemTexture', label: 'Tender / Hard', group: 'Nature of stem', options: ['Tender', 'Hard'] },
  { id: 'stemThickness', label: 'Thick / Thin', group: 'Nature of stem', options: ['Thick', 'Thin'] },
  { id: 'branchLow', label: 'Close to the ground', group: 'Appearance of branches', options: ['Yes', 'No'] },
  { id: 'branchHigh', label: 'Higher up on the stem', group: 'Appearance of branches', options: ['Yes', 'No'] },
  { id: 'plantGroup', label: 'Name of plant group', group: null, options: ['Herb', 'Shrub', 'Tree'] }
];

// Fullscreen Specimen Slides 1-9 (Exact complete images from directory)
const SPECIMEN_SLIDES = [
  {
    id: 1,
    num: '01',
    name: 'Mango',
    type: 'Tree',
    image: specimen01MangoBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 2,
    num: '02',
    name: 'Rose',
    type: 'Shrub',
    image: specimen02RoseBlended // Ultra-HD 2.7K crisp blended specimen without pixel break
  },
  {
    id: 3,
    num: '03',
    name: 'Tomato',
    type: 'Herb',
    image: specimen03TomatoBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 4,
    num: '04',
    name: 'Neem',
    type: 'Tree',
    image: specimen04NeemBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 5,
    num: '05',
    name: 'Hibiscus',
    type: 'Shrub',
    image: specimen05HibiscusBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 6,
    num: '06',
    name: 'Mint',
    type: 'Herb',
    image: specimen06MintBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 7,
    num: '07',
    name: 'Banyan',
    type: 'Tree',
    image: specimen07BanyanBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 8,
    num: '08',
    name: 'Cotton',
    type: 'Shrub',
    image: specimen08CottonBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  },
  {
    id: 9,
    num: '09',
    name: 'Sunflower',
    type: 'Herb',
    image: specimen09SunflowerBlended // Ultra-HD 2.7K crisp blended specimen matching rose_fade
  }
];

// 12 Organisms Database - Pure 8K Ultra HD Photographic Specimen Cards
const ALL_ORGANISMS = {
  neem: {
    id: 'neem',
    name: 'Neem',
    type: 'plant',
    stem: 'woody',
    flowers: true,
    image: '/activities/class6_chapter2/grouping/hd_cards/neem.jpg',
    fact: 'A large tree with a thick woody trunk. It bears small white fragrant flowers and produces medicinal leaves.'
  },
  rose: {
    id: 'rose',
    name: 'Rose',
    type: 'plant',
    stem: 'woody',
    flowers: true,
    image: '/activities/class6_chapter2/grouping/hd_cards/rose.jpg',
    fact: 'A woody shrub with thorns on its branches. Famous for producing vibrant, fragrant flowers.'
  },
  grass: {
    id: 'grass',
    name: 'Grass',
    type: 'plant',
    stem: 'non-woody',
    flowers: true,
    image: '/activities/class6_chapter2/grouping/hd_cards/grass.jpg',
    fact: 'A common plant with soft, flexible green non-woody stems. It produces tiny, wind-pollinated flowers.'
  },
  sunflower: {
    id: 'sunflower',
    name: 'Sunflower',
    type: 'plant',
    stem: 'non-woody',
    flowers: true,
    image: '/activities/class6_chapter2/grouping/hd_cards/sunflower.jpg',
    fact: 'An annual flowering plant with a hairy green non-woody stem and a large bright yellow floral head.'
  },
  fern: {
    id: 'fern',
    name: 'Fern',
    type: 'plant',
    stem: 'non-woody',
    flowers: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/fern.jpg',
    fact: 'An ancient non-flowering plant that reproduces via microscopic spores found on the undersides of its fronds.'
  },
  moss: {
    id: 'moss',
    name: 'Moss',
    type: 'plant',
    stem: 'non-woody',
    flowers: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/moss.jpg',
    fact: 'A tiny, flowerless, spore-bearing green plant that carpets moist shaded rocks and damp soil.'
  },
  cow: {
    id: 'cow',
    name: 'Cow',
    type: 'animal',
    diet: 'herbivore',
    habitat: 'land',
    wings: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/cow.jpg',
    fact: 'A domesticated land herbivore with hooves. Eats grasses and foliage, helping disperse seeds across pastures.'
  },
  spotted_deer: {
    id: 'spotted_deer',
    name: 'Spotted deer',
    type: 'animal',
    diet: 'herbivore',
    habitat: 'land',
    wings: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/spotted_deer.jpg',
    fact: 'A graceful herbivore living in woodland herds. Exhibits a reddish-fawn coat marked with vivid white spots.'
  },
  tiger: {
    id: 'tiger',
    name: 'Tiger',
    type: 'animal',
    diet: 'carnivore',
    habitat: 'land',
    wings: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/tiger.jpg',
    fact: 'An apex carnivore of the forest with iconic dark vertical stripes. Plays an essential role in ecological balance.'
  },
  crow: {
    id: 'crow',
    name: 'Crow',
    type: 'animal',
    diet: 'omnivore',
    habitat: 'land',
    wings: true,
    image: '/activities/class6_chapter2/grouping/hd_cards/crow.jpg',
    fact: 'A highly intelligent winged bird and versatile omnivore, nesting in trees and roaming across grasslands and towns.'
  },
  frog: {
    id: 'frog',
    name: 'Adult frog',
    type: 'animal',
    diet: 'carnivore',
    habitat: 'water_land',
    wings: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/frog.jpg',
    fact: 'An amphibian that breathes through moist skin and lungs. Lives near water bodies and preys on insects with a rapid tongue.'
  },
  goldfish: {
    id: 'goldfish',
    name: 'Goldfish',
    type: 'animal',
    diet: 'omnivore',
    habitat: 'water',
    wings: false,
    image: '/activities/class6_chapter2/grouping/hd_cards/goldfish.jpg',
    fact: 'An aquatic vertebrate with shimmering orange scales. Breathes dissolved oxygen through gills and navigates using delicate fins.'
  }
};

// 6 Grouping Criteria Tabs (Exact layout & content from directory images)
const CRITERIA_TABS = [
  {
    id: 'plants_animals',
    icon: '🐾',
    label: 'Plants & animals',
    rule: 'Look at the kind of living thing.',
    bannerQuote: 'Nature teaches us to see connections. 🍃',
    bottomSign: 'Curious Minds\nGreener Tomorrows 🍃',
    cards: ['neem', 'rose', 'grass', 'sunflower', 'fern', 'moss', 'cow', 'spotted_deer', 'tiger', 'crow', 'frog', 'goldfish'],
    groups: [
      {
        id: 'plants',
        title: 'Plants',
        subtitle: 'Living things such as trees, grasses, and mosses',
        icon: '🌿',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.type === 'plant'
      },
      {
        id: 'animals',
        title: 'Animals',
        subtitle: 'Living things such as cows, birds, and fish',
        icon: '🐾',
        bg: '#FEFCE8',
        border: '#FDE68A',
        headerColor: '#854D0E',
        targetMatch: (card) => card.type === 'animal'
      }
    ]
  },
  {
    id: 'type_stem',
    icon: '🌿',
    label: 'Type of stem',
    rule: 'Compare these plants by the structure of their stems.',
    bannerQuote: 'Same planet. Brighter learners. 🍃',
    bottomSign: 'Plants grow.\nCuriosity grows.\nSo do brighter tomorrows. 🍃',
    cards: ['neem', 'rose', 'grass', 'sunflower'],
    groups: [
      {
        id: 'woody',
        title: 'Hard / woody',
        subtitle: 'Firm, woody stems or trunks',
        icon: '🪵',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.stem === 'woody'
      },
      {
        id: 'non_woody',
        title: 'Soft / non-woody',
        subtitle: 'Green, non-woody stems',
        icon: '🌱',
        bg: '#FEFCE8',
        border: '#FDE68A',
        headerColor: '#854D0E',
        targetMatch: (card) => card.stem === 'non-woody'
      }
    ]
  },
  {
    id: 'flowers',
    icon: '🌸',
    label: 'Flowers',
    rule: 'Group by whether the plant produces flowers — not whether flowers are visible today.',
    bannerQuote: 'Nature makes the world a brighter place. 🍃',
    bottomSign: 'Small features.\nBig connections.\nA brighter tomorrow. 🍃',
    cards: ['neem', 'rose', 'grass', 'sunflower', 'fern', 'moss'],
    groups: [
      {
        id: 'flowering',
        title: 'Flowering plants',
        subtitle: 'Produce flowers, large or small',
        icon: '🌸',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.flowers === true
      },
      {
        id: 'non_flowering',
        title: 'Non-flowering plants',
        subtitle: 'Do not produce flowers',
        icon: '🚫',
        bg: '#FEFCE8',
        border: '#FDE68A',
        headerColor: '#854D0E',
        targetMatch: (card) => card.flowers === false
      }
    ]
  },
  {
    id: 'eating_habits',
    icon: '🍴',
    label: 'Eating habits',
    rule: 'Group animals by the type of food they naturally consume.',
    bannerQuote: 'Every creature has a purpose. 🍃',
    bottomSign: 'Diverse diets.\nBalanced forests. 🍃',
    cards: ['cow', 'spotted_deer', 'tiger', 'crow'],
    groups: [
      {
        id: 'herbivores',
        title: 'Plant eaters (Herbivores)',
        subtitle: 'Feed exclusively on plants and grasses',
        icon: '🌾',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.diet === 'herbivore'
      },
      {
        id: 'carnivores_omnivores',
        title: 'Meat & mixed eaters',
        subtitle: 'Carnivores and omnivores that hunt or forage',
        icon: '🥩',
        bg: '#FEFCE8',
        border: '#FDE68A',
        headerColor: '#854D0E',
        targetMatch: (card) => card.diet === 'carnivore' || card.diet === 'omnivore'
      }
    ]
  },
  {
    id: 'where_they_live',
    icon: '⛰️',
    label: 'Where they live',
    rule: 'Use these broad habitat groups. Flying or swimming briefly does not define an animal’s home.',
    bannerQuote: 'Different habitats. Same beautiful planet. 🍃',
    bottomSign: 'Different habitats.\nMake a balanced world. 🍃',
    cards: ['cow', 'spotted_deer', 'tiger', 'crow', 'frog', 'goldfish'],
    groups: [
      {
        id: 'mainly_land',
        title: 'Mainly land',
        subtitle: 'Including living and nesting in trees',
        icon: '🌲',
        customIcon: habitatIconLand,
        bgImg: habitatLandBgHd,
        bg: '#E6F3E8',
        border: '#A8D5BA',
        headerColor: '#0F172A',
        dropBorder: '1.5px dashed rgba(70, 110, 80, 0.45)',
        dropColor: '#4A6B53',
        targetMatch: (card) => card.habitat === 'land'
      },
      {
        id: 'water',
        title: 'Water',
        subtitle: 'Living in an aquatic habitat',
        icon: '💧',
        customIcon: habitatIconWater,
        bgImg: habitatWaterBgHd,
        bg: '#F6EFE5',
        border: '#E8CCA0',
        headerColor: '#0F172A',
        dropBorder: '1.5px dashed rgba(175, 130, 80, 0.45)',
        dropColor: '#8C6430',
        targetMatch: (card) => card.habitat === 'water'
      },
      {
        id: 'land_water',
        title: 'Land & water',
        subtitle: 'Using both during their lives',
        icon: '🏔️',
        customIcon: habitatIconBoth,
        bgImg: habitatBothBgHd,
        bg: '#E2EEF4',
        border: '#A0C4DF',
        headerColor: '#0F172A',
        dropBorder: '1.5px dashed rgba(80, 130, 165, 0.45)',
        dropColor: '#3B6D8C',
        targetMatch: (card) => card.habitat === 'water_land'
      }
    ]
  },
  {
    id: 'wings',
    icon: '🪽',
    label: 'Wings',
    rule: 'Look at the bodies of these six animals. Which have wings?',
    bannerQuote: 'Different lives. Same sky. 🍃',
    bottomSign: 'Different creatures.\nA shared planet. 🍃',
    cards: ['cow', 'spotted_deer', 'tiger', 'crow', 'frog', 'goldfish'],
    groups: [
      {
        id: 'with_wings',
        title: 'With wings',
        subtitle: 'A shared body feature',
        icon: '🪽',
        customIcon: wingsIconWith,
        bgImg: wingsWithBgHd,
        bg: '#DCEEE0',
        border: '#A8D5BA',
        headerColor: '#0F172A',
        dropBorder: '1.5px dashed rgba(70, 110, 80, 0.45)',
        dropColor: '#4A6B53',
        targetMatch: (card) => card.wings === true
      },
      {
        id: 'without_wings',
        title: 'Without wings',
        subtitle: 'Bodies with no wings',
        icon: '🚫',
        customIcon: wingsIconWithout,
        bgImg: wingsWithoutBgHd,
        bg: '#F5EFE6',
        border: '#D8CCB8',
        headerColor: '#0F172A',
        dropBorder: '1.5px dashed rgba(160, 140, 115, 0.45)',
        dropColor: '#7C6F5A',
        targetMatch: (card) => card.wings === false
      }
    ]
  }
];

// Sound tone feedback synthesizer
const playTone = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.10, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
};

export default function InlineSortingActivity({ 
  onBackToDashboard, 
  onNextActivity, 
  onGoToDetective, 
  onBackToDetective, 
  initialPhase = 'specimens', 
  initialSpecimenIndex = 0,
  onStateChange 
}) {
  const { theme } = useTheme();

  // Mode: 'specimens' (Phase 1) | 'table23' (Phase 1.5) | 'grouping' (Phase 2)
  const [phase, setPhase] = useState(initialPhase);

  // Sync phase if initialPhase prop changes externally
  useEffect(() => {
    if (initialPhase && initialPhase !== phase) {
      setPhase(initialPhase);
    }
  }, [initialPhase]);

  // Specimen Carousel State (0 to 8)
  const [currentSpecimenIndex, setCurrentSpecimenIndex] = useState(initialSpecimenIndex);

  // Grouping Activity State
  const [activeTabId, setActiveTabId] = useState('plants_animals');
  
  // Placements map: { [tabId]: { [cardId]: groupId } }
  const [placements, setPlacements] = useState({
    plants_animals: {},
    type_stem: {},
    flowers: {},
    eating_habits: {},
    where_they_live: {},
    wings: {}
  });

  // Selected card ready to be placed via click
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [dragOverGroupId, setDragOverGroupId] = useState(null);

  // Inspection modal card
  const [inspectedCard, setInspectedCard] = useState(null);

  // Validation feedback per tab
  const [validationResult, setValidationResult] = useState(null);

  // Completed tabs tracker
  const [completedTabs, setCompletedTabs] = useState([]);

  // Table 2.3 answers: { [rowId]: { [columnId]: value } }
  const [table23Answers, setTable23Answers] = useState({});
  const [table23Checked, setTable23Checked] = useState(false);

  const handleTable23Select = (rowId, columnId, value) => {
    playTone('click');
    setTable23Answers(prev => ({
      ...prev,
      [rowId]: { ...prev[rowId], [columnId]: value }
    }));
    setTable23Checked(false);
  };

  const handleTable23Reset = () => {
    playTone('click');
    setTable23Answers({});
    setTable23Checked(false);
  };

  const handleTable23Check = () => {
    playTone('click');
    setTable23Checked(true);
    const allFilled = TABLE_2_3_ROWS.every(row =>
      TABLE_2_3_COLUMNS.every(col => !!(table23Answers[row.id] && table23Answers[row.id][col.id]))
    );
    if (allFilled) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const activeTab = CRITERIA_TABS.find(t => t.id === activeTabId) || CRITERIA_TABS[0];
  const currentTabPlacements = placements[activeTab.id] || {};
  const currentTabCards = activeTab.cards.map(id => ALL_ORGANISMS[id]).filter(Boolean);

  const totalCardsCount = currentTabCards.length;
  const placedCount = Object.keys(currentTabPlacements).length;

  const activeSpecimen = SPECIMEN_SLIDES[currentSpecimenIndex];



  // Carousel navigation
  const handleSpecimenNav = (dir) => {
    playTone('click');
    let nextIdx = currentSpecimenIndex + dir;
    if (nextIdx < 0) nextIdx = SPECIMEN_SLIDES.length - 1;
    if (nextIdx >= SPECIMEN_SLIDES.length) nextIdx = 0;
    setCurrentSpecimenIndex(nextIdx);
  };

  const changePhase = (newPhase, newSpecimenIndex = currentSpecimenIndex) => {
    playTone('click');
    setPhase(newPhase);
    if (onStateChange) onStateChange(newPhase, newSpecimenIndex);
  };

  const selectSpecimen = (idx) => {
    playTone('click');
    setCurrentSpecimenIndex(idx);
    if (onStateChange) onStateChange('specimens', idx);
  };

  // Keyboard navigation for full screen specimens
  useEffect(() => {
    if (phase !== 'specimens') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleSpecimenNav(1);
      } else if (e.key === 'ArrowLeft') {
        handleSpecimenNav(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentSpecimenIndex]);

  // Card placement handler
  const handlePlaceCard = (cardId, groupId) => {
    playTone('click');
    setPlacements(prev => ({
      ...prev,
      [activeTab.id]: {
        ...prev[activeTab.id],
        [cardId]: groupId
      }
    }));
    setSelectedCardId(null);
    setValidationResult(null);
  };

  // Remove card from group
  const handleRemoveCard = (cardId, e) => {
    if (e) e.stopPropagation();
    playTone('click');
    setPlacements(prev => {
      const nextMap = { ...prev[activeTab.id] };
      delete nextMap[cardId];
      return {
        ...prev,
        [activeTab.id]: nextMap
      };
    });
    setValidationResult(null);
  };

  // Clear groups for active tab
  const handleClearGroups = () => {
    playTone('click');
    setPlacements(prev => ({
      ...prev,
      [activeTab.id]: {}
    }));
    setSelectedCardId(null);
    setValidationResult(null);
  };

  // Check my groups validation
  const handleCheckGroups = () => {
    if (placedCount < totalCardsCount) {
      playTone('error');
      setValidationResult({
        success: false,
        message: `Please place all ${totalCardsCount} cards before checking! (${placedCount}/${totalCardsCount} placed)`
      });
      return;
    }

    let allCorrect = true;
    const errors = [];

    currentTabCards.forEach(card => {
      const assignedGroupId = currentTabPlacements[card.id];
      const targetGroup = activeTab.groups.find(g => g.id === assignedGroupId);
      if (!targetGroup || !targetGroup.targetMatch(card)) {
        allCorrect = false;
        errors.push(card.name);
      }
    });

    if (allCorrect) {
      playTone('success');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.65 } });
      if (!completedTabs.includes(activeTab.id)) {
        setCompletedTabs(prev => [...prev, activeTab.id]);
      }
      setValidationResult({
        success: true,
        message: `Outstanding! All ${totalCardsCount} cards are placed in the correct groups!`
      });
    } else {
      playTone('error');
      setValidationResult({
        success: false,
        message: `Some cards (${errors.slice(0, 3).join(', ')}${errors.length > 3 ? '...' : ''}) need another look. Re-read the rule and adjust!`
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      zIndex: 1000,
      fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
      color: '#1E293B',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <style>{`
        html, body, #root {
          overflow: hidden !important;
          height: 100vh !important;
          max-height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        * {
          box-sizing: border-box !important;
        }
        ::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          height: 0px !important;
        }
      `}</style>

      

      {/* ========================================================================= */}
      {/* PHASE 1: PURE FULL-SCREEN SPECIMEN SLIDE WITHOUT ANY OVERLAP/PIXEL BREAK */}
      {/* ========================================================================= */}
      {phase === 'specimens' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#07160E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 40
        }}>
          {/* Exact 16:9 Aspect-Ratio Container */}
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
              src={activeSpecimen.image}
              alt={`Specimen ${activeSpecimen.num} - ${activeSpecimen.name}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                userSelect: 'none',
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5))'
              }}
            />


            {/* Direct Clickable Hotspots overlaying the 9 discovery trail items */}
            {SPECIMEN_SLIDES.map((sp, idx) => {
              const leftPct = (1.8 + idx * 10.7) + '%';
              const widthPct = '10.3%';
              return (
                <div
                  key={sp.id}
                  onClick={() => selectSpecimen(idx)}
                  style={{
                    position: 'absolute',
                    bottom: '2.5%',
                    height: '15.5%',
                    left: leftPct,
                    width: widthPct,
                    cursor: 'pointer',
                    borderRadius: '12px',
                    transition: 'background 0.15s ease',
                    zIndex: 45
                  }}
                  title={`Select Specimen ${sp.num}: ${sp.name}`}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(22, 163, 74, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                />
              );
            })}

            {/* Clickable Hotspot for Tree Group on Mango Slide */}
            {currentSpecimenIndex === 0 && (
              <div
                onClick={() => {
                  playTone('success');
                  confetti({ particleCount: 50, spread: 60, origin: { x: 0.86, y: 0.68 } });
                }}
                style={{
                  position: 'absolute',
                  left: '85.1%',
                  top: '58.7%',
                  width: '11.7%',
                  height: '21.1%',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  zIndex: 46
                }}
                title="Select Tree (Correct group!)"
              />
            )}

            {/* Clickable Hotspot for Shrub Group on Rose Slide */}
            {currentSpecimenIndex === 1 && (
              <div
                onClick={() => {
                  playTone('success');
                  confetti({ particleCount: 50, spread: 60, origin: { x: 0.78, y: 0.68 } });
                }}
                style={{
                  position: 'absolute',
                  left: '72.7%',
                  top: '53.0%',
                  width: '11.5%',
                  height: '22.5%',
                  cursor: 'pointer',
                  borderRadius: '14px',
                  zIndex: 46
                }}
                title="Select Shrub (Correct group!)"
              />
            )}
          </div>

          {/* Floating Bottom Left Control: Back */}
          <button
            onClick={() => {
              playTone('click');
              if (currentSpecimenIndex > 0) {
                const nextIdx = currentSpecimenIndex - 1;
                setCurrentSpecimenIndex(nextIdx);
                if (onStateChange) onStateChange('specimens', nextIdx);
              } else if (onBackToDashboard) {
                onBackToDashboard();
              }
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
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
              backdropFilter: 'blur(4px)',
              zIndex: 50,
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {currentSpecimenIndex > 0 ? (
              <><ArrowLeft size={20} /> Previous Specimen</>
            ) : (
              <><ArrowLeft size={20} /> Back to Act 2.2</>
            )}
          </button>

          {/* Floating Bottom Right Control: Next Specimen or Enter Table 2.3 */}
          <button
            onClick={() => {
              playTone('click');
              if (currentSpecimenIndex < SPECIMEN_SLIDES.length - 1) {
                const nextIdx = currentSpecimenIndex + 1;
                setCurrentSpecimenIndex(nextIdx);
                if (onStateChange) onStateChange('specimens', nextIdx);
              } else {
                changePhase('grouping', 0);
              }
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '24px',
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
              zIndex: 50,
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {currentSpecimenIndex < SPECIMEN_SLIDES.length - 1 ? (
              <>Next Specimen <ArrowRight size={20} /></>
            ) : (
              <>Proceed to Activity 2.3: Let Us Group <ArrowRight size={20} /></>
            )}
          </button>


        </div>
      )}

      
      {/* ========================================================================= */}
      {/* PHASE 2: EXACT MOUNTAIN LAKE GROUPING ACTIVITY (STRICT ZERO-SCROLL)      */}
      {/* ========================================================================= */}
      {phase === 'grouping' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('${BG_MOUNTAIN}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '10px 18px 6px 18px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* ===================================================================== */}
          {/* TOP SECTION: ROW 1 (TITLE & TROPHY & QUOTE) + ROW 2 (CRITERIA TABS)  */}
          {/* ===================================================================== */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            flexShrink: 0,
            width: '100%'
          }}>
            {/* Row 1: Flex row with Quote (left), Title Banner (center), and Trophy (right) - ZERO OVERLAP */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              minHeight: '44px',
              padding: '0 4px',
              boxSizing: 'border-box'
            }}>
              {/* Left: Inspiring Nature Quote */}
              <div style={{
                flex: '1 1 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '18px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#0F172A',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                <span style={{ fontStyle: 'normal' }}>🌱</span>
                <span>{activeTab.bannerQuote}</span>
              </div>

              {/* Center Title: Activity 2.3 (Attractive Emerald Banner) */}
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #16A34A 0%, #14532D 100%)',
                border: '2px solid rgba(187, 247, 208, 0.85)',
                borderRadius: '12px',
                padding: '6px 26px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 16px rgba(22, 163, 74, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                flexShrink: 0
              }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '26px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", "Cinzel", Georgia, serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.65), 0 0 10px rgba(0, 0, 0, 0.35)'
                }}>
                  Activity 2.3: Let Us Group
                </h1>
              </div>

              {/* Right: Trophy Sign (Cleanly in Row 1, zero overlap with tabs below) */}
              <div style={{
                flex: '1 1 0',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <div style={{
                  background: 'linear-gradient(180deg, #8C5E2D 0%, #5C3814 100%)',
                  border: '2.5px solid #3F2309',
                  borderRadius: '12px',
                  padding: '4px 14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFFFFF'
                }}>
                  <span style={{ fontSize: '22px' }}>🏆</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: '#FEF08A', lineHeight: 1 }}>
                      {completedTabs.length} / {CRITERIA_TABS.length}
                    </span>
                    <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: '"Inter", sans-serif', color: '#E2E8F0' }}>
                      challenges complete
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: 6 Criteria Tabs (Centered, Independent Row, Zero Overlap) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              background: 'rgba(255, 255, 255, 0.88)',
              padding: '4px 14px',
              borderRadius: '28px',
              backdropFilter: 'blur(8px)',
              width: 'fit-content',
              margin: '3px auto 0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
            }}>
              {CRITERIA_TABS.map(tab => {
                const isActive = tab.id === activeTab.id;
                const isDone = completedTabs.includes(tab.id);

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playTone('click');
                      setActiveTabId(tab.id);
                      setSelectedCardId(null);
                      setValidationResult(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: isActive ? '#14452F' : '#FFFFFF',
                      border: isActive ? '2px solid #14452F' : '1.5px solid #CBD5E1',
                      borderRadius: '20px',
                      padding: '4px 14px',
                      fontSize: '20px',
                      fontWeight: 800,
                      fontFamily: '"Outfit", sans-serif',
                      color: isActive ? '#FFFFFF' : '#1E293B',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: isActive 
                        ? '0 3px 10px rgba(20, 69, 47, 0.35)' 
                        : '0 2px 5px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isDone && (
                      <span style={{
                        background: isActive ? '#86EFAC' : '#22C55E',
                        color: isActive ? '#14532D' : '#FFFFFF',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        fontSize: '18px',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '2px'
                      }}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MAIN WORKBENCH: OBSERVATION CARDS (LEFT) VS YOUR GROUPS (RIGHT)       */}
          {/* ===================================================================== */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.18fr) minmax(0, 1fr)',
            gap: '12px',
            flex: '1 1 0',
            minHeight: 0,
            overflow: 'hidden',
            margin: '3px 0'
          }}>
            {/* ------------------------------------------------------------------- */}
            {/* LEFT CARD PANEL: OBSERVATION CARDS                                  */}
            {/* ------------------------------------------------------------------- */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.96)',
              border: '2px solid rgba(255,255,255,0.85)',
              borderRadius: '18px',
              padding: '8px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 0,
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '26px' }}>🤿</span>
                  <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 900, fontFamily: '"Outfit", sans-serif', color: '#0F172A' }}>
                    Observation cards
                  </h3>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#475569' }}>
                  {currentTabCards.length} to observe
                </span>
              </div>

              {/* Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: currentTabCards.length <= 4 ? 'repeat(2, 1fr)' : currentTabCards.length <= 6 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                gap: '6px',
                flex: '1 1 0',
                alignContent: 'start',
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                {currentTabCards.map(card => {
                  const isPlaced = !!currentTabPlacements[card.id];
                  const isSelected = selectedCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedCardId(card.id);
                        e.dataTransfer.effectAllowed = 'move';
                        try { e.dataTransfer.setData('text/plain', String(card.id)); } catch (err) {}
                      }}
                      onDragEnd={() => setDraggedCardId(null)}
                      title={`Drag ${card.name} into a group`}
                      style={{
                        background: '#FFFFFF',
                        border: isPlaced 
                          ? '2px solid #86EFAC' 
                          : '1.5px solid #E2E8F0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: draggedCardId === card.id ? 'grabbing' : 'grab',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        opacity: draggedCardId === card.id ? 0.5 : 1,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0
                      }}
                    >
                      {/* Placed Status Checkmark (Top Left) */}
                      {isPlaced && (
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: '#16A34A',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: 900,
                          zIndex: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                        }}>
                          ✓
                        </div>
                      )}

                      {/* Photo */}
                      <div style={{
                        width: '100%',
                        aspectRatio: '3 / 4',
                        overflow: 'hidden',
                        background: '#F1F5F9'
                      }}>
                        <img
                          src={card.image}
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </div>

                      {/* Name Label */}
                      <div style={{
                        padding: '3px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        <span style={{
                          fontSize: card.name.length > 9 ? '18px' : '20px',
                          fontWeight: 800,
                          fontFamily: '"Outfit", sans-serif',
                          color: '#1E293B',
                          whiteSpace: 'nowrap',
                          letterSpacing: '-0.01em'
                        }}>
                          {card.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Frog Mascot Speech Bubble at Bottom */}
              <div style={{
                marginTop: '4px',
                background: '#F0FDF4',
                border: '1.5px solid #BBF7D0',
                borderRadius: '12px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>🐸</span>
                <span style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  fontFamily: '"Inter", sans-serif',
                  color: '#166534',
                  lineHeight: 1.35,
                  textAlign: 'justify'
                }}>
                  Drag each card from the left dock and drop it into the correct group on the right.
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT CARD PANEL: YOUR GROUPS                                       */}
            {/* ------------------------------------------------------------------- */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.96)',
              border: '2px solid rgba(255,255,255,0.85)',
              borderRadius: '18px',
              padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                flexShrink: 0
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '26px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#0F172A'
                }}>
                  Your groups
                </h3>
                <span style={{ fontSize: '23px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#1E293B' }}>
                  {placedCount} / {totalCardsCount} placed
                </span>
              </div>

              {/* Groups List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: activeTab.groups.length > 2 ? '8px' : '10px',
                flex: '1 1 0',
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                {activeTab.groups.map(group => {
                  const cardsInGroup = Object.entries(currentTabPlacements)
                    .filter(([_, gid]) => gid === group.id)
                    .map(([cid]) => ALL_ORGANISMS[cid]);

                  const isCompact = activeTab.groups.length > 2;

                  return (
                    <div
                      key={group.id}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                        if (dragOverGroupId !== group.id) setDragOverGroupId(group.id);
                      }}
                      onDragLeave={() => {
                        setDragOverGroupId(prev => (prev === group.id ? null : prev));
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const cid = draggedCardId || e.dataTransfer.getData('text/plain');
                        if (cid) handlePlaceCard(cid, group.id);
                        setDraggedCardId(null);
                        setDragOverGroupId(null);
                      }}
                      style={{
                        background: group.bgImg ? `url('${group.bgImg}') no-repeat center right / cover` : group.bg,
                        border: dragOverGroupId === group.id ? `2.5px dashed ${group.border}` : `2px solid ${group.border}`,
                        borderRadius: '16px',
                        padding: isCompact ? '8px 12px' : '10px 14px',
                        transition: 'all 0.15s ease',
                        cursor: 'default',
                        boxShadow: dragOverGroupId === group.id ? '0 4px 14px rgba(0,0,0,0.08)' : '0 2px 6px rgba(0,0,0,0.03)',
                        transform: dragOverGroupId === group.id ? 'scale(1.01)' : 'scale(1)',
                        flex: '1 1 0',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Group Title & Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexShrink: 0
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 auto', minWidth: 0 }}>
                          {group.customIcon ? (
                            <img
                              src={group.customIcon}
                              alt=""
                              style={{
                                width: isCompact ? '32px' : '38px',
                                height: isCompact ? '32px' : '38px',
                                objectFit: 'contain',
                                flexShrink: 0
                              }}
                            />
                          ) : (
                            <span style={{ fontSize: isCompact ? '24px' : '26px', flexShrink: 0 }}>{group.icon}</span>
                          )}
                          <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                            <div style={{
                              fontSize: isCompact ? '24px' : '26px',
                              fontWeight: 900,
                              fontFamily: '"Outfit", sans-serif',
                              color: group.headerColor || '#0F172A',
                              lineHeight: 1.15
                            }}>
                              {group.title}
                            </div>
                            <div style={{
                              fontSize: isCompact ? '22px' : '24px',
                              fontWeight: 600,
                              fontFamily: '"Inter", sans-serif',
                              color: '#334155',
                              marginTop: '2px',
                              lineHeight: 1.35,
                              textAlign: 'justify'
                            }}>
                              {group.subtitle}
                            </div>
                          </div>
                        </div>
                        <span style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          fontFamily: '"Outfit", sans-serif',
                          color: '#1E293B',
                          background: 'rgba(255,255,255,0.92)',
                          border: '1.5px solid rgba(0,0,0,0.1)',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {cardsInGroup.length} cards
                        </span>
                      </div>

                      {/* Middle: Content Area (either placed cards or full-height drop container) */}
                      <div style={{
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: cardsInGroup.length === 0 ? 'center' : 'flex-start',
                        gap: '6px',
                        marginTop: '8px',
                        minHeight: 0,
                        overflowY: 'auto'
                      }}>
                        {/* Placed Cards Pill Strip */}
                        {cardsInGroup.length > 0 && (
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            overflowY: 'auto',
                            maxHeight: isCompact ? '60px' : '90px',
                            scrollbarWidth: 'none',
                            zIndex: 2
                          }}>
                            {cardsInGroup.map(card => (
                              <div
                                key={card.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: '#FFFFFF',
                                  border: '1.5px solid #CBD5E1',
                                  borderRadius: '18px',
                                  padding: '2px 8px 2px 4px',
                                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                }}
                              >
                                <img
                                  src={card.image}
                                  alt={card.name}
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                                <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#1E293B' }}>
                                  {card.name}
                                </span>
                                <button
                                  onClick={(e) => handleRemoveCard(card.id, e)}
                                  style={{
                                    background: '#F1F5F9',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#64748B',
                                    fontSize: '18px',
                                    marginLeft: '2px'
                                  }}
                                  title="Remove from group"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Drop Target Box */}
                        <div style={{
                          border: group.dropBorder || '2px dashed rgba(100, 116, 139, 0.35)',
                          borderRadius: '12px',
                          padding: cardsInGroup.length === 0 ? (isCompact ? '10px 14px' : '16px 14px') : '6px 12px',
                          textAlign: 'center',
                          fontSize: isCompact ? '22px' : '24px',
                          fontWeight: 700,
                          fontFamily: '"Outfit", sans-serif',
                          color: selectedCardId ? (group.dropColor || group.headerColor) : '#64748B',
                          background: selectedCardId 
                            ? 'rgba(255,255,255,0.95)' 
                            : (group.bgImg ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.5)'),
                          backdropFilter: 'blur(4px)',
                          flex: cardsInGroup.length === 0 ? '1 1 auto' : '0 0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          zIndex: 2
                        }}>
                          {selectedCardId 
                            ? `➔ Click here to place ${ALL_ORGANISMS[selectedCardId]?.name}` 
                            : (cardsInGroup.length === 0 ? 'Drop cards here or click to add' : '+ Drop more cards here')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Validation Result Banner */}
              {validationResult && (
                <div style={{
                  marginTop: '6px',
                  background: validationResult.success ? '#DCFCE7' : '#FEE2E2',
                  border: validationResult.success ? '2px solid #86EFAC' : '2px solid #FCA5A5',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '22px' }}>
                    {validationResult.success ? '🎉' : '🤔'}
                  </span>
                  <span style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    fontFamily: '"Inter", sans-serif',
                    color: validationResult.success ? '#15803D' : '#B91C1C',
                    textAlign: 'justify'
                  }}>
                    {validationResult.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* BOTTOM BAR: NAV ROW (BACK / NEXT) + GARDEN SIGN, HELPER, CLEAR/CHECK */}
          {/* ===================================================================== */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flexShrink: 0,
            paddingTop: '2px'
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexShrink: 0
          }}>
            {/* Bottom Left Angled Wood Sign */}
            <div style={{
              background: 'linear-gradient(180deg, #D4A373 0%, #B07D48 100%)',
              border: '2.5px solid #7F4F24',
              borderRadius: '10px',
              padding: '4px 12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
              maxWidth: '220px',
              transform: 'rotate(-2deg)',
              flexShrink: 0
            }}>
              <p style={{
                margin: 0,
                fontFamily: '"Outfit", sans-serif',
                fontSize: '22px',
                fontWeight: 800,
                color: '#2B1705',
                whiteSpace: 'pre-line',
                lineHeight: 1.25,
                textAlign: 'justify'
              }}>
                {activeTab.bottomSign}
              </p>
            </div>

            {/* Helper Note (Fully visible, no truncation) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: '"Outfit", sans-serif',
              color: '#334155',
              backdropFilter: 'blur(6px)',
              flexShrink: 1,
              minWidth: 0
            }}>
              <span style={{ fontSize: '22px', flexShrink: 0 }}>🍃</span>
              <span style={{ whiteSpace: 'nowrap' }}>Find features shared by all members in a group.</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={handleClearGroups}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '20px',
                  padding: '7px 18px',
                  fontSize: '22px',
                  fontWeight: 800,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#475569',
                  cursor: 'pointer',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
              >
                Clear groups
              </button>

              <button
                onClick={handleCheckGroups}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                  border: '2px solid #86EFAC',
                  borderRadius: '20px',
                  padding: '7px 22px',
                  fontSize: '22px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(20, 69, 47, 0.45)',
                  transition: 'all 0.15s ease'
                }}
              >
                Check my groups →
              </button>
            </div>
          </div>

          {/* Nav Row: Back (left) / Next (right) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexShrink: 0
          }}>
            <button
              onClick={() => { changePhase('specimens', SPECIMEN_SLIDES.length - 1); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '2px solid #CBD5E1',
                borderRadius: '20px',
                padding: '7px 22px',
                fontSize: '22px',
                fontWeight: 800,
                fontFamily: '"Outfit", sans-serif',
                color: '#1E293B',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={20} /> Back to Specimens
            </button>

            <button
              onClick={() => {
                playTone('click');
                if (onNextActivity) onNextActivity();
                else if (onGoToDetective) onGoToDetective();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
                border: '2px solid #86EFAC',
                borderRadius: '20px',
                padding: '7px 24px',
                fontSize: '22px',
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif',
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(22, 101, 52, 0.45)',
                transition: 'all 0.15s ease'
              }}
            >
              Continue to Act 2.4 Detective <ArrowRight size={20} />
            </button>
          </div>
        </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD INSPECTOR MODAL (HIGH RESOLUTION 8K ZOOM & BOTANICAL/ZOOLOGICAL FACTS) */}
      {/* ========================================================================= */}
      {inspectedCard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '540px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '2px solid #CBD5E1',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '300px', background: '#0F172A' }}>
              <img
                src={inspectedCard.image}
                alt={inspectedCard.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => setInspectedCard(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ padding: '22px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '26px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#0F172A'
                }}>
                  {inspectedCard.name}
                </h3>
                <span style={{
                  background: inspectedCard.type === 'plant' ? '#DCFCE7' : '#FEF3C7',
                  color: inspectedCard.type === 'plant' ? '#166534' : '#92400E',
                  fontWeight: 800,
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '24px',
                  padding: '4px 14px',
                  borderRadius: '12px'
                }}>
                  {inspectedCard.type === 'plant' ? '🌿 Plant' : '🐾 Animal'}
                </span>
              </div>

              <p style={{
                margin: '0 0 18px 0',
                fontSize: '22px',
                lineHeight: 1.55,
                color: '#334155',
                fontFamily: '"Inter", sans-serif',
                textAlign: 'justify'
              }}>
                {inspectedCard.fact}
              </p>

              <button
                onClick={() => setInspectedCard(null)}
                style={{
                  width: '100%',
                  background: '#166534',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px',
                  fontSize: '22px',
                  fontWeight: 800,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer'
                }}
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
