import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCw, CheckCircle, ChevronRight, ChevronLeft, 
  Award, Sparkles, ZoomIn, X, Maximize2, Volume2, VolumeX, 
  Lightbulb, Eye, HelpCircle, Check, ArrowRight, BookOpen, Layers
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

export default function InlineSortingActivity({ onBackToDashboard, onNextActivity }) {
  const { theme } = useTheme();

  // Mode: 'specimens' (Phase 1) vs 'grouping' (Phase 2)
  const [phase, setPhase] = useState('specimens');

  // Specimen Carousel State (0 to 8)
  const [currentSpecimenIndex, setCurrentSpecimenIndex] = useState(0);

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

  const selectSpecimen = (idx) => {
    playTone('click');
    setCurrentSpecimenIndex(idx);
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
          </div>

          {/* Floating Bottom Left Control: Back */}
          <button
            onClick={() => {
              playTone('click');
              if (currentSpecimenIndex > 0) {
                setCurrentSpecimenIndex(prev => prev - 1);
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
              backdropFilter: 'blur(8px)',
              zIndex: 50,
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ArrowLeft size={20} /> Back
          </button>

          {/* Floating Bottom Right Control: Next Specimen or Enter Lab */}
          <button
            onClick={() => {
              playTone('click');
              if (currentSpecimenIndex < SPECIMEN_SLIDES.length - 1) {
                setCurrentSpecimenIndex(prev => prev + 1);
              } else {
                setPhase('table23');
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
              <>Next <ArrowRight size={20} /></>
            ) : (
              <>Enter Grouping Lab <ArrowRight size={20} /></>
            )}
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHASE 1.5: TABLE 2.3 - GROUPING OF PLANTS BASED ON HEIGHT & STEM         */}
      {/* ========================================================================= */}
      {phase === 'table23' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('${BG_TABLE_GARDEN}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '18px 24px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Header: Wood Sign Title */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '24px',
            background: 'linear-gradient(180deg, #B07D48 0%, #7F4F24 100%)',
            border: '3px solid #5C3A1A',
            borderRadius: '14px',
            padding: '10px 26px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
            transform: 'rotate(-1.5deg)'
          }}>
            <h1 style={{
              margin: 0,
              fontFamily: '"Outfit", sans-serif',
              fontSize: '24px',
              fontWeight: 900,
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              Let's Explore <span style={{ color: '#FDE047' }}>Plants!</span>
            </h1>
            <p style={{
              margin: '2px 0 0',
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FEF3C7',
              letterSpacing: '0.04em'
            }}>
              Observe &bull; Think &bull; Group
            </p>
          </div>

          {/* Main Table Card */}
          <div style={{
            width: 'min(96vw, 1500px)',
            maxWidth: '100%',
            maxHeight: '86vh',
            overflow: 'hidden',
            boxSizing: 'border-box',
            background: 'rgba(240, 253, 244, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: '22px',
            padding: '18px 22px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Table Title Bar */}
            <div style={{
              background: 'linear-gradient(135deg, #14532D 0%, #166534 100%)',
              borderRadius: '14px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
            }}>
              <span style={{ fontSize: '20px' }}>🌿</span>
              <h2 style={{
                margin: 0,
                fontFamily: '"Outfit", sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                textAlign: 'center'
              }}>
                Table 2.3: <span style={{ color: '#FDE047' }}>Grouping of plants based on height and nature of stem</span>
              </h2>
              <span style={{ fontSize: '20px' }}>🌿</span>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', width: '100%', boxSizing: 'border-box' }}>
              <table style={{
                width: '100%',
                tableLayout: 'fixed',
                borderCollapse: 'separate',
                borderSpacing: 0,
                fontFamily: '"Inter", sans-serif'
              }}>
                <thead>
                  <tr>
                    <th rowSpan={2} style={{
                      background: '#BBF7D0', padding: '8px 4px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #86EFAC', width: '5%'
                    }}>S. no.</th>
                    <th rowSpan={2} style={{
                      background: '#BBF7D0', padding: '8px 6px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #86EFAC', width: '11%'
                    }}>Name of the plant</th>
                    <th style={{
                      background: '#86EFAC', padding: '6px 4px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #4ADE80', width: '11%'
                    }}>Height</th>
                    <th colSpan={3} style={{
                      background: '#86EFAC', padding: '6px 4px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #4ADE80', width: '33%'
                    }}>Nature of stem</th>
                    <th colSpan={2} style={{
                      background: '#86EFAC', padding: '6px 4px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #4ADE80', width: '26%'
                    }}>Appearance of branches</th>
                    <th rowSpan={2} style={{
                      background: '#BBF7D0', padding: '8px 6px', fontSize: '16px', fontWeight: 800,
                      color: '#14532D', border: '1px solid #86EFAC', width: '14%'
                    }}>Name of plant group</th>
                  </tr>
                  <tr>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '11%' }}>Short / Medium / Tall</th>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '11%' }}>Green / Brown</th>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '11%' }}>Tender / Hard</th>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '11%' }}>Thick / Thin</th>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '13%' }}>Close to the ground</th>
                    <th style={{ background: '#DCFCE7', padding: '4px 3px', fontSize: '16px', fontWeight: 700, color: '#166534', border: '1px solid #86EFAC', width: '13%' }}>Higher up on the stem</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_2_3_ROWS.map((row, rowIdx) => (
                    <tr key={row.id} style={{ background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(220,252,231,0.5)' }}>
                      <td style={{ padding: '8px', fontSize: '16px', fontWeight: 700, color: '#1E293B', border: '1px solid #D1FAE5', textAlign: 'center' }}>
                        {rowIdx + 1}.
                      </td>
                      <td style={{ padding: '8px', fontSize: '16px', fontWeight: 800, color: '#0F172A', border: '1px solid #D1FAE5' }}>
                        {row.name}
                      </td>
                      {TABLE_2_3_COLUMNS.map(col => {
                        const value = (table23Answers[row.id] && table23Answers[row.id][col.id]) || '';
                        return (
                          <td key={col.id} style={{ padding: '5px 4px', border: '1px solid #D1FAE5', overflow: 'hidden' }}>
                            <select
                              value={value}
                              onChange={(e) => handleTable23Select(row.id, col.id, e.target.value)}
                              style={{
                                width: '100%',
                                maxWidth: '100%',
                                boxSizing: 'border-box',
                                padding: '6px 2px 6px 6px',
                                borderRadius: '8px',
                                border: table23Checked
                                  ? (value ? '2px solid #22C55E' : '2px solid #F87171')
                                  : '1.5px solid #CBD5E1',
                                background: '#FFFFFF',
                                color: '#1E293B',
                                fontSize: '16px',
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              <option value="">Select</option>
                              {col.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', paddingTop: '4px' }}>
              <button
                onClick={handleTable23Check}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                  border: '2px solid #86EFAC',
                  borderRadius: '24px',
                  padding: '10px 28px',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(21, 128, 61, 0.4)',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                <Check size={20} /> Check Answer
              </button>
              <button
                onClick={handleTable23Reset}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: '2px solid #FDBA74',
                  borderRadius: '24px',
                  padding: '10px 28px',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(234, 88, 12, 0.4)',
                  fontFamily: '"Outfit", sans-serif'
                }}
              >
                <RefreshCw size={18} /> Reset
              </button>
            </div>
          </div>

          {/* Back / Next Nav */}
          <button
            onClick={() => { playTone('click'); setPhase('specimens'); }}
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
              zIndex: 50
            }}
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button
            onClick={() => { playTone('click'); setPhase('grouping'); }}
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
              zIndex: 50
            }}
          >
            Next <ArrowRight size={20} />
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
          padding: '8px 18px 6px 18px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* ===================================================================== */}
          {/* TOP SECTION: ROW 1 (TITLES & RULE) + ROW 2 (FULL-WIDTH TABS BAR)      */}
          {/* ===================================================================== */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flexShrink: 0
          }}>
            {/* Top Row: Wood Sign (Left), Grouping Rule Banner (Center), Trophy & Quote (Right) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              width: '100%'
            }}>
              {/* Top Left Rustic Wood Sign */}
              <div style={{
                background: 'linear-gradient(180deg, #E2B97F 0%, #C49255 100%)',
                border: '2.5px solid #8C5E2D',
                borderRadius: '12px',
                padding: '4px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
                position: 'relative',
                flexShrink: 0
              }}>
                {/* Hanging Ropes */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '16px',
                  width: '4px',
                  height: '12px',
                  background: '#5C3814',
                  borderRadius: '2px'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '16px',
                  width: '4px',
                  height: '12px',
                  background: '#5C3814',
                  borderRadius: '2px'
                }} />

                <h2 style={{
                  margin: 0,
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#2B1705',
                  lineHeight: 1.15
                }}>
                  Different lives. Shared features.
                </h2>
                <p style={{
                  margin: '1px 0 0 0',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontFamily: '"Inter", sans-serif',
                  color: '#3F2309',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  Explore. Observe. Group. Learn. 🍃
                </p>
              </div>

              {/* Center: Grouping Rule Mint Banner (Spacious & Clean) */}
              <div style={{
                flex: '1 1 auto',
                minWidth: 0,
                background: 'rgba(236, 253, 245, 0.95)',
                border: '1.8px solid #A7F3D0',
                borderRadius: '12px',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <span style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#065F46',
                  whiteSpace: 'nowrap'
                }}>
                  Grouping rule:
                </span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1E293B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {activeTab.rule}
                </span>
              </div>

              {/* Top Right: Hanging Wood Trophy Sign + Sky Script */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2px',
                flexShrink: 0
              }}>
                {/* Trophy Sign */}
                <div style={{
                  background: 'linear-gradient(180deg, #8C5E2D 0%, #5C3814 100%)',
                  border: '2.5px solid #3F2309',
                  borderRadius: '12px',
                  padding: '4px 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFFFFF'
                }}>
                  <span style={{ fontSize: '20px' }}>🏆</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#FEF08A', lineHeight: 1 }}>
                      {completedTabs.length} / {CRITERIA_TABS.length}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: '"Inter", sans-serif', color: '#E2E8F0', marginTop: '1px' }}>
                      challenges complete
                    </div>
                  </div>
                </div>

                {/* Sky Script Quote */}
                <div style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#1E293B',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 3px rgba(255,255,255,0.9)'
                }}>
                  {activeTab.bannerQuote}
                </div>
              </div>
            </div>

            {/* Row 2: 6 Criteria Tabs (Full Width, Centered, No Overlap) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              background: 'rgba(255, 255, 255, 0.75)',
              padding: '4px 14px',
              borderRadius: '28px',
              backdropFilter: 'blur(8px)',
              width: 'fit-content',
              margin: '0 auto',
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
                      gap: '6px',
                      background: isActive ? '#14452F' : '#FFFFFF',
                      border: isActive ? '2px solid #14452F' : '1.5px solid #CBD5E1',
                      borderRadius: '20px',
                      padding: '5px 14px',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: isActive ? '#FFFFFF' : '#1E293B',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: isActive 
                        ? '0 3px 10px rgba(20, 69, 47, 0.35)' 
                        : '0 2px 5px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isDone && (
                      <span style={{
                        background: isActive ? '#86EFAC' : '#22C55E',
                        color: isActive ? '#14532D' : '#FFFFFF',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '16px',
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
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.08fr)',
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
              padding: '10px 12px',
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
                marginBottom: '6px',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px' }}>🤿</span>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#0F172A' }}>
                    Observation cards
                  </h3>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#64748B' }}>
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
                overflow: 'hidden'
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
                        setSelectedCardId(card.id);
                        e.dataTransfer.effectAllowed = 'move';
                        try { e.dataTransfer.setData('text/plain', String(card.id)); } catch (err) {}
                      }}
                      onDragEnd={() => setDraggedCardId(null)}
                      onClick={() => {
                        playTone('click');
                        setSelectedCardId(isSelected ? null : card.id);
                      }}
                      style={{
                        background: '#FFFFFF',
                        border: isSelected 
                          ? '2.5px solid #F59E0B' 
                          : isPlaced 
                            ? '2px solid #86EFAC' 
                            : '1.5px solid #E2E8F0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: draggedCardId === card.id ? 'grabbing' : 'grab',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected 
                          ? '0 6px 18px rgba(245, 158, 11, 0.35)' 
                          : '0 2px 6px rgba(0,0,0,0.05)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        opacity: draggedCardId === card.id ? 0.5 : 1,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        height: currentTabCards.length > 6 ? '100px' : '135px'
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
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: 900,
                          zIndex: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                        }}>
                          ✓
                        </div>
                      )}

                      {/* 8K Photo */}
                      <div style={{
                        width: '100%',
                        flex: '1 1 0',
                        minHeight: 0,
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
                        justifyContent: 'space-between',
                        background: isSelected ? '#FEF3C7' : '#FFFFFF',
                        flexShrink: 0
                      }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#1E293B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {card.name}
                        </span>
                        {isSelected && (
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#D97706' }}>
                            Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Frog Mascot Speech Bubble at Bottom */}
              <div style={{
                marginTop: '6px',
                background: '#F0FDF4',
                border: '1.5px solid #BBF7D0',
                borderRadius: '12px',
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '22px' }}>🐸</span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#166534',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {selectedCardId 
                    ? `You selected "${ALL_ORGANISMS[selectedCardId]?.name}". Click a group on the right to place it!` 
                    : "Select a card to take a closer look. What features do you notice?"}
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
              padding: '10px 12px',
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
                marginBottom: '6px',
                flexShrink: 0
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#0F172A'
                }}>
                  Your groups
                </h3>
                <span style={{ fontSize: '17px', fontWeight: 600, color: '#1E293B' }}>
                  {placedCount} / {totalCardsCount} placed
                </span>
              </div>

              {/* Groups List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: activeTab.groups.length > 2 ? '6px' : '8px',
                flex: '1 1 0',
                minHeight: 0,
                overflow: 'hidden'
              }}>
                {activeTab.groups.map(group => {
                  const cardsInGroup = Object.entries(currentTabPlacements)
                    .filter(([_, gid]) => gid === group.id)
                    .map(([cid]) => ALL_ORGANISMS[cid]);

                  const isCompact = activeTab.groups.length > 2;

                  return (
                    <div
                      key={group.id}
                      onClick={() => {
                        if (selectedCardId) {
                          handlePlaceCard(selectedCardId, group.id);
                        }
                      }}
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
                        border: dragOverGroupId === group.id ? `2.5px dashed ${group.border}` : `1.5px solid ${group.border}`,
                        borderRadius: '16px',
                        padding: isCompact ? '6px 14px' : '8px 14px',
                        transition: 'all 0.15s ease',
                        cursor: selectedCardId ? 'pointer' : 'default',
                        boxShadow: (selectedCardId || dragOverGroupId === group.id) ? '0 4px 14px rgba(0,0,0,0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                        transform: dragOverGroupId === group.id ? 'scale(1.015)' : 'scale(1)',
                        flex: '1 1 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
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
                        flexShrink: 0
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: isCompact ? '8px' : '10px' }}>
                          {group.customIcon ? (
                            <img
                              src={group.customIcon}
                              alt=""
                              style={{
                                width: isCompact ? '34px' : '42px',
                                height: isCompact ? '34px' : '42px',
                                objectFit: 'contain',
                                flexShrink: 0
                              }}
                            />
                          ) : (
                            <span style={{ fontSize: isCompact ? '18px' : '22px' }}>{group.icon}</span>
                          )}
                          <div>
                            <div style={{
                              fontSize: isCompact ? '19px' : '22px',
                              fontWeight: 900,
                              fontFamily: '"Outfit", sans-serif',
                              color: group.headerColor || '#0F172A',
                              lineHeight: 1.15
                            }}>
                              {group.title}
                            </div>
                            <div style={{
                              fontSize: isCompact ? '16px' : '17px',
                              fontWeight: 600,
                              fontFamily: '"Inter", sans-serif',
                              color: '#475569',
                              marginTop: '2px'
                            }}>
                              {group.subtitle}
                            </div>
                          </div>
                        </div>
                        <span style={{
                          fontSize: isCompact ? '16px' : '17px',
                          fontWeight: 600,
                          fontFamily: '"Inter", sans-serif',
                          color: '#475569',
                          background: group.bgImg ? 'transparent' : 'rgba(255,255,255,0.7)',
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}>
                          {cardsInGroup.length} cards
                        </span>
                      </div>

                      {/* Placed Cards Pill Strip */}
                      {cardsInGroup.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          margin: '2px 0',
                          maxHeight: isCompact ? '50px' : '66px',
                          overflowY: 'auto',
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
                                padding: isCompact ? '1px 7px 1px 3px' : '2px 8px 2px 4px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                              }}
                            >
                              <img
                                src={card.image}
                                alt={card.name}
                                style={{
                                  width: isCompact ? '18px' : '22px',
                                  height: isCompact ? '18px' : '22px',
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                              />
                              <span style={{ fontSize: isCompact ? '16px' : '16px', fontWeight: 800, fontFamily: '"Inter", sans-serif', color: '#1E293B' }}>
                                {card.name}
                              </span>
                              <button
                                onClick={(e) => handleRemoveCard(card.id, e)}
                                style={{
                                  background: '#F1F5F9',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: isCompact ? '17px' : '20px',
                                  height: isCompact ? '17px' : '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#64748B',
                                  fontSize: isCompact ? '16px' : '16px',
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

                      {/* Drop / Click Target Guidance Area */}
                      <div style={{
                        border: group.dropBorder || '2px dashed rgba(100, 116, 139, 0.3)',
                        borderRadius: '12px',
                        padding: isCompact ? '4px 8px' : '6px 12px',
                        textAlign: 'center',
                        fontSize: isCompact ? '16px' : '17px',
                        fontWeight: 600,
                        fontFamily: '"Outfit", sans-serif',
                        color: selectedCardId ? (group.dropColor || group.headerColor) : (group.dropColor || '#64748B'),
                        background: selectedCardId 
                          ? 'rgba(255,255,255,0.92)' 
                          : (group.bgImg ? 'rgba(255,255,255,0.45)' : 'transparent'),
                        backdropFilter: group.bgImg ? 'blur(3px)' : 'none',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                        zIndex: 2
                      }}>
                        {selectedCardId 
                          ? `➔ Click here to place ${ALL_ORGANISMS[selectedCardId]?.name}` 
                          : 'Drop cards here or click to add'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Validation Result Banner */}
              {validationResult && (
                <div style={{
                  marginTop: '5px',
                  background: validationResult.success ? '#DCFCE7' : '#FEE2E2',
                  border: validationResult.success ? '2px solid #86EFAC' : '2px solid #FCA5A5',
                  borderRadius: '10px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '18px' }}>
                    {validationResult.success ? '🎉' : '🤔'}
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: validationResult.success ? '#15803D' : '#B91C1C'
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
            gap: '6px',
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
                fontSize: '16px',
                fontWeight: 800,
                color: '#2B1705',
                whiteSpace: 'pre-line',
                lineHeight: 1.15
              }}>
                {activeTab.bottomSign}
              </p>
            </div>

            {/* Helper Note */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.85)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 700,
              color: '#334155',
              backdropFilter: 'blur(4px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ fontSize: '18px' }}>🍃</span>
              <span>Look for a feature shared by every member of a group.</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => {
                  playTone('click');
                  setPhase('specimens');
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#1E293B',
                  cursor: 'pointer',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
                title="View Fullscreen Specimen Slides 1-9"
              >
                Specimen Slides
              </button>

              <button
                onClick={handleClearGroups}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '20px',
                  padding: '8px 18px',
                  fontSize: '16px',
                  fontWeight: 800,
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
                  padding: '8px 22px',
                  fontSize: '16px',
                  fontWeight: 900,
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
              onClick={() => { playTone('click'); setPhase('specimens'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '2px solid #CBD5E1',
                borderRadius: '20px',
                padding: '8px 18px',
                fontSize: '16px',
                fontWeight: 800,
                color: '#1E293B',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              onClick={() => { playTone('click'); if (onNextActivity) onNextActivity(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
                border: '2px solid #86EFAC',
                borderRadius: '20px',
                padding: '8px 22px',
                fontSize: '16px',
                fontWeight: 900,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(22, 101, 52, 0.45)',
                transition: 'all 0.15s ease'
              }}
            >
              Next <ArrowRight size={18} />
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '520px',
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
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#0F172A'
                }}>
                  {inspectedCard.name}
                </h3>
                <span style={{
                  background: inspectedCard.type === 'plant' ? '#DCFCE7' : '#FEF3C7',
                  color: inspectedCard.type === 'plant' ? '#166534' : '#92400E',
                  fontWeight: 800,
                  fontSize: '16px',
                  padding: '4px 12px',
                  borderRadius: '12px'
                }}>
                  {inspectedCard.type === 'plant' ? '🌿 Plant' : '🐾 Animal'}
                </span>
              </div>

              <p style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#475569'
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
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 800,
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
