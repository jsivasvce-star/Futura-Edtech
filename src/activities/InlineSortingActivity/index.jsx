import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCw, CheckCircle, ChevronRight, ChevronLeft, 
  Award, Sparkles, ZoomIn, X, Maximize2, Volume2, VolumeX, 
  Lightbulb, Eye, HelpCircle, Check, ArrowRight, BookOpen, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../../ThemeContext.jsx';

// =========================================================================
// ASSET PATH CONSTANTS
// =========================================================================
const BG_MOUNTAIN = '/activities/class6_chapter2/grouping/background image.png';

// Fullscreen Specimen Slides 1-9 (Exact complete images from directory)
const SPECIMEN_SLIDES = [
  {
    id: 1,
    num: '01',
    name: 'Mango',
    type: 'Tree',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 1.png'
  },
  {
    id: 2,
    num: '02',
    name: 'Rose',
    type: 'Shrub',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 2.png'
  },
  {
    id: 3,
    num: '03',
    name: 'Tomato',
    type: 'Herb',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 3.png'
  },
  {
    id: 4,
    num: '04',
    name: 'Neem',
    type: 'Tree',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 4.png'
  },
  {
    id: 5,
    num: '05',
    name: 'Hibiscus',
    type: 'Shrub',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 5.png'
  },
  {
    id: 6,
    num: '06',
    name: 'Mint',
    type: 'Herb',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 6.png'
  },
  {
    id: 7,
    num: '07',
    name: 'Banyan',
    type: 'Tree',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 7.png'
  },
  {
    id: 8,
    num: '08',
    name: 'Cotton',
    type: 'Shrub',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 specimen 8.png'
  },
  {
    id: 9,
    num: '09',
    name: 'Sunflower',
    type: 'Herb',
    image: '/activities/class6_chapter2/grouping/plant mystery activity 2.4 speciman 9.png'
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
    rule: 'Group animals according to their natural dwelling habitat.',
    bannerQuote: 'From mountain peaks to ocean depths. 🍃',
    bottomSign: 'Every habitat thrives\nwhen protected. 🍃',
    cards: ['cow', 'spotted_deer', 'tiger', 'frog', 'goldfish'],
    groups: [
      {
        id: 'land',
        title: 'Land dwellers',
        subtitle: 'Animals that live on land and in forests',
        icon: '🌲',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.habitat === 'land'
      },
      {
        id: 'water_amphibian',
        title: 'Water & wetland dwellers',
        subtitle: 'Aquatic and amphibious creatures',
        icon: '🌊',
        bg: '#EFF6FF',
        border: '#93C5FD',
        headerColor: '#1E40AF',
        targetMatch: (card) => card.habitat === 'water' || card.habitat === 'water_land'
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
        subtitle: 'A shared body feature adapted for flight',
        icon: '🪽',
        bg: '#F0FDF4',
        border: '#86EFAC',
        headerColor: '#166534',
        targetMatch: (card) => card.wings === true
      },
      {
        id: 'without_wings',
        title: 'Without wings',
        subtitle: 'Bodies with no wings for flight',
        icon: '🚫',
        bg: '#FEFCE8',
        border: '#FDE68A',
        headerColor: '#854D0E',
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

  // Inspection modal card
  const [inspectedCard, setInspectedCard] = useState(null);

  // Validation feedback per tab
  const [validationResult, setValidationResult] = useState(null);

  // Completed tabs tracker
  const [completedTabs, setCompletedTabs] = useState([]);

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

          {/* Floating Top Left Control: Exit to Lab */}
          <button
            onClick={onBackToDashboard}
            style={{
              position: 'absolute',
              top: '18px',
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
            <ArrowLeft size={20} /> Exit to Lab
          </button>

          {/* Floating Top Right Control: Proceed to Grouping Lab */}
          <button
            onClick={() => {
              playTone('click');
              setPhase('grouping');
            }}
            style={{
              position: 'absolute',
              top: '18px',
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
            Start Grouping Activity <ArrowRight size={20} />
          </button>

          {/* Left Arrow Floating Button */}
          <button
            onClick={() => handleSpecimenNav(-1)}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 50,
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid #CBD5E1',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            title="Previous Specimen"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Right Arrow Floating Button */}
          <button
            onClick={() => handleSpecimenNav(1)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 50,
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid #CBD5E1',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1E293B',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            title="Next Specimen"
          >
            <ChevronRight size={30} />
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
          {/* TOP SECTION: WOOD SIGN, HORIZONTAL TABS, TROPHY & SKY QUOTE          */}
          {/* ===================================================================== */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexShrink: 0
          }}>
            {/* Top Left Rustic Wood Sign */}
            <div style={{
              background: 'linear-gradient(180deg, #E2B97F 0%, #C49255 100%)',
              border: '2.5px solid #8C5E2D',
              borderRadius: '12px',
              padding: '4px 12px',
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
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: 900,
                color: '#2B1705',
                lineHeight: 1.15
              }}>
                Different lives.<br />Shared features.
              </h2>
              <p style={{
                margin: '1px 0 0 0',
                fontSize: '16px',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#3F2309',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Explore. Observe. Group. Learn. 🍃
              </p>
            </div>

            {/* Center Area: Single Sleek Row of 6 Criteria Tabs + Rule Banner */}
            <div style={{
              flex: '1 1 auto',
              minWidth: 0,
              maxWidth: '960px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px'
            }}>
              {/* 6 Criteria Tabs (Single Sleek Row) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flexWrap: 'nowrap',
                background: 'rgba(255, 255, 255, 0.65)',
                padding: '4px 8px',
                borderRadius: '28px',
                backdropFilter: 'blur(6px)',
                width: '100%',
                overflowX: 'auto',
                scrollbarWidth: 'none'
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
                        padding: '5px 12px',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: isActive ? '#FFFFFF' : '#1E293B',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
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

              {/* Grouping Rule Mint Banner */}
              <div style={{
                width: '100%',
                background: 'rgba(236, 253, 245, 0.95)',
                border: '1.5px solid #A7F3D0',
                borderRadius: '12px',
                padding: '5px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                overflow: 'hidden'
              }}>
                <span style={{ fontSize: '18px' }}>💡</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#065F46',
                  whiteSpace: 'nowrap'
                }}>
                  Grouping rule:
                </span>
                <span style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#1E293B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {activeTab.rule}
                </span>
              </div>
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
                padding: '5px 12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FFFFFF'
              }}>
                <span style={{ fontSize: '20px' }}>🏆</span>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#FEF08A', lineHeight: 1 }}>
                    {completedTabs.length} / {CRITERIA_TABS.length}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#E2E8F0', marginTop: '1px' }}>
                    challenges complete
                  </div>
                </div>
              </div>

              {/* Sky Script Quote */}
              <div style={{
                fontFamily: 'cursive, Georgia, serif',
                fontSize: '16px',
                fontWeight: 700,
                color: '#1E293B',
                textAlign: 'right',
                whiteSpace: 'pre-line',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)'
              }}>
                {activeTab.bannerQuote}
              </div>
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
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected 
                          ? '0 6px 18px rgba(245, 158, 11, 0.35)' 
                          : '0 2px 6px rgba(0,0,0,0.05)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        height: currentTabCards.length > 6 ? '100px' : '135px'
                      }}
                    >
                      {/* Zoom Inspector Button (Top Right) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTone('click');
                          setInspectedCard(card);
                        }}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(20, 69, 47, 0.88)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                          fontSize: '16px'
                        }}
                        title={`Inspect ${card.name}`}
                      >
                        <ZoomIn size={16} />
                      </button>

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px' }}>👥</span>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#0F172A' }}>
                    Your groups
                  </h3>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#64748B' }}>
                  {placedCount} / {totalCardsCount} placed
                </span>
              </div>

              {/* Groups List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                flex: '1 1 0',
                minHeight: 0,
                overflow: 'hidden'
              }}>
                {activeTab.groups.map(group => {
                  const cardsInGroup = Object.entries(currentTabPlacements)
                    .filter(([_, gid]) => gid === group.id)
                    .map(([cid]) => ALL_ORGANISMS[cid]);

                  return (
                    <div
                      key={group.id}
                      onClick={() => {
                        if (selectedCardId) {
                          handlePlaceCard(selectedCardId, group.id);
                        }
                      }}
                      style={{
                        background: group.bg,
                        border: `2px solid ${group.border}`,
                        borderRadius: '14px',
                        padding: '6px 10px',
                        transition: 'all 0.15s ease',
                        cursor: selectedCardId ? 'pointer' : 'default',
                        boxShadow: selectedCardId ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                        flex: '1 1 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: 0,
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '22px' }}>{group.icon}</span>
                          <div>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: 900,
                              color: group.headerColor,
                              lineHeight: 1.1
                            }}>
                              {group.title}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 600, color: '#64748B' }}>
                              {group.subtitle}
                            </div>
                          </div>
                        </div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: group.headerColor,
                          background: 'rgba(255,255,255,0.85)',
                          padding: '2px 10px',
                          borderRadius: '10px'
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
                          margin: '3px 0',
                          maxHeight: '66px',
                          overflowY: 'auto',
                          scrollbarWidth: 'none'
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
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                              />
                              <span style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
                                {card.name}
                              </span>
                              <button
                                onClick={(e) => handleRemoveCard(card.id, e)}
                                style={{
                                  background: '#F1F5F9',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#64748B',
                                  fontSize: '16px',
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
                        border: '2px dashed rgba(100, 116, 139, 0.3)',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: selectedCardId ? group.headerColor : '#94A3B8',
                        background: selectedCardId ? 'rgba(255,255,255,0.75)' : 'transparent',
                        flexShrink: 0
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
          {/* BOTTOM BAR: GARDEN SIGN, HELPER NOTE, CLEAR & CHECK BUTTONS           */}
          {/* ===================================================================== */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexShrink: 0,
            paddingTop: '2px'
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
                fontFamily: 'Georgia, serif',
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
