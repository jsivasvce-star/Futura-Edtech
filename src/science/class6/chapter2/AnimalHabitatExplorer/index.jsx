import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Award,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { habitatAudio } from './habitatAudio';

// High-Resolution Wildlife & Habitat Photographic Assets (8K / 4K Authentic Realism)
import spiderMonkeyImg from '../../../../assets/wildlife/spider_monkey_8k.jpg';
import goldenMahseerImg from '../../../../assets/golden_masheer.png';
import girCowImg from '../../../../assets/gir_cow.png';
import leopardFrogImg from '../../../../assets/frog.png';
import jungleCrowImg from '../../../../assets/wildlife/jungle_crow_8k.jpg';

import treeCanopyImg from '../../../../assets/ch2_trees_habitat_8k.jpg';
import freshwaterPondImg from '../../../../assets/quiz_scenes/q7_wetland_park_8k.jpg';
import openGrasslandImg from '../../../../assets/wildlife/open_grassland_4k.jpg';
import pondShorelineImg from '../../../../assets/wildlife/pond_shoreline_4k.jpg';
import nestingBranchesImg from '../../../../assets/quiz_scenes/q3_seed_dispersal_bird_8k.jpg';

// ============================================================
// ORNATE BOTANICAL SVG ELEMENTS (EXACT MATCH TO SLOGAN PAGE)
// ============================================================

const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="46"
    height="22"
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
  </svg>
);

const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-2px', marginBottom: '2px' }}>
    <svg width="24" height="16" viewBox="0 0 32 20" fill="none">
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#1B4D3E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#2D6A4F" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#40916C" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#52B788" />
    </svg>
  </div>
);

const TopCornerFoliage = ({ side = 'left' }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      [side]: 0,
      width: 'clamp(130px, 13vw, 200px)',
      height: 'clamp(70px, 8vh, 100px)',
      pointerEvents: 'none',
      zIndex: 4,
      overflow: 'hidden',
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      opacity: 0.95
    }}
  >
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
    </svg>
  </div>
);

const TopMountainBackdrop = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '8%',
      right: '8%',
      height: '90px',
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.16,
      overflow: 'hidden'
    }}
  >
    <svg width="100%" height="90" viewBox="0 0 1000 90" preserveAspectRatio="none" fill="none">
      <path d="M0 80 Q160 36 260 62 T520 32 T760 58 T1000 42 L1000 90 L0 90 Z" fill="#52B788" />
      <path d="M100 85 Q290 42 440 68 T720 46 T1000 62 L1000 90 L0 90 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

const BottomNatureSilhouettes = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '48px',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.28,
      zIndex: 1
    }}
  >
    <svg width="100%" height="48" viewBox="0 0 1200 48" preserveAspectRatio="none" fill="none">
      <path d="M0 36 Q220 22 440 32 T880 26 T1200 34 L1200 48 L0 48 Z" fill="#52B788" />
      <path d="M0 40 Q320 28 640 38 T1200 32 L1200 48 L0 48 Z" fill="#2D6A4F" />
      <circle cx="110" cy="30" r="12" fill="#1B4D3E" />
      <circle cx="124" cy="26" r="9" fill="#1B4D3E" />
      <rect x="115" y="34" width="4" height="12" fill="#1B4D3E" />
      <path d="M210 20 Q215 16 220 20 Q225 16 230 20" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M820 18 Q825 14 830 18 Q835 14 840 18" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="1020" cy="26" r="14" fill="#1B4D3E" />
      <circle cx="1036" cy="22" r="10" fill="#1B4D3E" />
      <rect x="1025" y="32" width="4" height="14" fill="#1B4D3E" />
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
      width="26"
      height="26"
      viewBox="0 0 52 52"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '4px' : 'auto',
        bottom: position.includes('bottom') ? '4px' : 'auto',
        left: position.includes('left') ? '4px' : 'auto',
        right: position.includes('right') ? '4px' : 'auto',
        transform: transforms[position],
        opacity: 0.8,
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      <path d="M6 6 C18 9, 28 18, 32 30 C34 36, 32 44, 28 50" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 12 C18 9, 25 12, 26 18 C27 23, 21 26, 16 23 C12 20, 9 15, 12 12 Z" fill="#1B4D3E" />
      <path d="M22 22 C29 19, 36 22, 37 28 C37 33, 31 36, 26 33 C21 30, 19 25, 22 22 Z" fill="#2D6A4F" />
    </svg>
  );
};

// ============================================================
// DATA: 5 SPECIES AND THEIR ECOLOGICAL CHARACTERISTICS
// ============================================================

const SPECIES_LIST = [
  {
    id: 'monkey',
    num: '01',
    name: 'Spider Monkey',
    scientific: 'Ateles geoffroyi',
    tag: 'Arboreal Climber',
    habitatId: 'tree_canopy',
    habitatName: 'Forest Tree Canopy',
    foodId: 'fruits',
    foodName: 'Wild Forest Fruits & Berries',
    movementId: 'climb',
    movementName: 'Branch Brachiation & Climbing',
    adaptationNote: 'Flexible prehensile limbs & tail for climbing treetops.',
    image: spiderMonkeyImg
  },
  {
    id: 'fish',
    num: '02',
    name: 'Golden Mahseer',
    scientific: 'Tor putitora',
    tag: 'Freshwater Swimmer',
    habitatId: 'pond',
    habitatName: 'Freshwater Pond & River',
    foodId: 'algae',
    foodName: 'Aquatic Plants & River Algae',
    movementId: 'swim',
    movementName: 'Hydrodynamic Fin Swimming',
    adaptationNote: 'Streamlined body & paired fins for water propulsion.',
    image: goldenMahseerImg
  },
  {
    id: 'cow',
    num: '03',
    name: 'Gir Cow',
    scientific: 'Bos indicus',
    tag: 'Grassland Grazer',
    habitatId: 'grassland',
    habitatName: 'Open Grassland Pasture',
    foodId: 'grass',
    foodName: 'Fresh Green Pasture Grass',
    movementId: 'walk',
    movementName: 'Quadrupedal Hoofed Walking',
    adaptationNote: 'Four sturdy limbs & hooves for endurance roaming.',
    image: girCowImg
  },
  {
    id: 'frog',
    num: '04',
    name: 'Leopard Frog',
    scientific: 'Lithobates pipiens',
    tag: 'Amphibious Leaper',
    habitatId: 'pond_shore',
    habitatName: 'Moist Pond Shoreline',
    foodId: 'insects',
    foodName: 'Wetland Insects & Worms',
    movementId: 'hop',
    movementName: 'Saltatorial Webbed Leaping',
    adaptationNote: 'Elongated muscular hind legs for explosive leaps.',
    image: leopardFrogImg
  },
  {
    id: 'crow',
    num: '05',
    name: 'Jungle Crow',
    scientific: 'Corvus culminatus',
    tag: 'Aerial Forager',
    habitatId: 'branches',
    habitatName: 'High Nesting Branches',
    foodId: 'seeds',
    foodName: 'Grains, Seeds & Scraps',
    movementId: 'fly',
    movementName: 'Aerodynamic Winged Flight',
    adaptationNote: 'Feathered airfoil wings for soaring through open air.',
    image: jungleCrowImg
  }
];

const HABITAT_BIOMES = [
  {
    id: 'tree_canopy',
    name: 'Forest Tree Canopy',
    description: 'High sunlit treetops laden with wild fruits and dense branches.',
    image: treeCanopyImg,
    correctAnimalId: 'monkey'
  },
  {
    id: 'pond',
    name: 'Freshwater Pond',
    description: 'Freshwater body rich with aquatic flora, plants, and river algae.',
    image: freshwaterPondImg,
    correctAnimalId: 'fish'
  },
  {
    id: 'grassland',
    name: 'Open Grassland Pasture',
    description: 'Expansive fertile plains blanketed in nutrient-rich forage grass.',
    image: openGrasslandImg,
    correctAnimalId: 'cow'
  },
  {
    id: 'pond_shore',
    name: 'Moist Pond Shoreline',
    description: 'Damp riparian bank connecting shallow water with shoreline mud.',
    image: pondShorelineImg,
    correctAnimalId: 'frog'
  },
  {
    id: 'branches',
    name: 'High Nesting Branches',
    description: 'Tall sturdy tree forks offering strategic vantage and safe roosts.',
    image: nestingBranchesImg,
    correctAnimalId: 'crow'
  }
];

const FOOD_ITEMS = [
  { id: 'fruits', name: 'Wild Forest Fruits & Berries', icon: '🍎', desc: 'Forest figs, berries & sweet tree fruits', targetId: 'monkey' },
  { id: 'algae', name: 'Aquatic Plants & River Algae', icon: '🌿', desc: 'Freshwater grasses, microalgae & pond flora', targetId: 'fish' },
  { id: 'grass', name: 'Fresh Green Pasture Grass', icon: '🌾', desc: 'Fibrous prairie grasses and clover forage', targetId: 'cow' },
  { id: 'insects', name: 'Wetland Insects & Worms', icon: '🦗', desc: 'Moist soil bugs, worms & flying insects', targetId: 'frog' },
  { id: 'seeds', name: 'Grains, Seeds & Scraps', icon: '🌽', desc: 'Hard grains, seeds, nuts & scavenged fare', targetId: 'crow' }
];

const MOVEMENT_MODES = [
  { id: 'climb', label: 'Climbing', icon: '🧗' },
  { id: 'swim', label: 'Swimming', icon: '🏊' },
  { id: 'walk', label: 'Walking', icon: '🚶' },
  { id: 'hop', label: 'Leaping', icon: '🦘' },
  { id: 'fly', label: 'Flight', icon: '🦅' }
];

export default function AnimalHabitatExplorer({ onBackToDashboard, onNextActivity, initialPhase = 1 }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(initialPhase); // 1: Habitat, 2: Feeding, 3: Movement
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Specimen Navigation State (50% - 50% Single Page View)
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState(0);
  const [activeHabitatChoice, setActiveHabitatChoice] = useState(null);

  // Phase 1 Selection & Matching State
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [habitatMatches, setHabitatMatches] = useState({
    monkey: null,
    fish: null,
    cow: null,
    frog: null,
    crow: null
  });

  // Phase 2 Feeding State
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [feedingMatches, setFeedingMatches] = useState({
    monkey: null,
    fish: null,
    cow: null,
    frog: null,
    crow: null
  });

  // Phase 3 Locomotion State
  const [locomotionMatches, setLocomotionMatches] = useState({
    monkey: null,
    fish: null,
    cow: null,
    frog: null,
    crow: null
  });

  const [showCertificate, setShowCertificate] = useState(false);

  // Status checks
  const isHabitatPhaseDone = SPECIES_LIST.every(s => habitatMatches[s.id] === s.habitatId);
  const isFeedingPhaseDone = SPECIES_LIST.every(s => feedingMatches[s.id] === s.foodId);
  const isMovementPhaseDone = SPECIES_LIST.every(s => locomotionMatches[s.id] === s.movementId);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    habitatAudio.setMuted(next);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // 50% - 50% Single Page Specimen & Habitat Derivations
  const currentAnimal = SPECIES_LIST[activeSpecimenIndex];
  const isAnimalMatched = habitatMatches[currentAnimal.id] !== null;
  const currentHabitat = HABITAT_BIOMES.find(h => h.id === (habitatMatches[currentAnimal.id] || activeHabitatChoice || currentAnimal.habitatId)) || HABITAT_BIOMES[0];
  const [matchFeedback, setMatchFeedback] = useState('');

  const handlePrevAnimal = () => {
    habitatAudio.playSelect(isMuted);
    setActiveSpecimenIndex(prev => (prev > 0 ? prev - 1 : SPECIES_LIST.length - 1));
    setActiveHabitatChoice(null);
    setMatchFeedback('');
  };

  const handleNextAnimal = () => {
    habitatAudio.playSelect(isMuted);
    setActiveSpecimenIndex(prev => (prev < SPECIES_LIST.length - 1 ? prev + 1 : 0));
    setActiveHabitatChoice(null);
    setMatchFeedback('');
  };

  const handleTestHabitatMatch = (habitatId) => {
    setActiveHabitatChoice(habitatId);
    const chosenHabitat = HABITAT_BIOMES.find(h => h.id === habitatId);
    if (habitatId === currentAnimal.habitatId) {
      habitatAudio.playMatchSuccess(isMuted);
      setHabitatMatches(prev => ({ ...prev, [currentAnimal.id]: habitatId }));
      setMatchFeedback(`✓ Perfect Match! ${currentAnimal.name} is adapted to thrive in ${chosenHabitat.name}.`);
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    } else {
      habitatAudio.playMatchError(isMuted);
      setMatchFeedback(`❌ Not this ecosystem! ${currentAnimal.name} cannot survive in ${chosenHabitat.name}. Check its physical adaptations!`);
    }
  };

  // Phase 1: Click or Drag Habitat Match
  const handleSelectAnimal = (animalId) => {
    if (habitatMatches[animalId]) return;
    habitatAudio.playSelect(isMuted);
    setSelectedAnimalId(animalId === selectedAnimalId ? null : animalId);
  };

  const handleMatchHabitat = (habitatId) => {
    if (!selectedAnimalId) return;
    const animal = SPECIES_LIST.find(a => a.id === selectedAnimalId);

    if (animal.habitatId === habitatId) {
      habitatAudio.playMatchSuccess(isMuted);
      setHabitatMatches(prev => ({ ...prev, [selectedAnimalId]: habitatId }));
      setSelectedAnimalId(null);

      const nextMatches = { ...habitatMatches, [selectedAnimalId]: habitatId };
      const allDone = SPECIES_LIST.every(s => nextMatches[s.id] === s.habitatId);
      if (allDone) {
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      }
    } else {
      habitatAudio.playMatchError(isMuted);
    }
  };

  const handleDragStartAnimal = (e, animalId) => {
    e.dataTransfer.setData('text/plain', animalId);
    setSelectedAnimalId(animalId);
  };

  const handleDropHabitat = (e, habitatId) => {
    e.preventDefault();
    const animalId = e.dataTransfer.getData('text/plain') || selectedAnimalId;
    if (!animalId) return;

    const animal = SPECIES_LIST.find(a => a.id === animalId);
    if (animal.habitatId === habitatId) {
      habitatAudio.playMatchSuccess(isMuted);
      setHabitatMatches(prev => ({ ...prev, [animalId]: habitatId }));
      setSelectedAnimalId(null);
    } else {
      habitatAudio.playMatchError(isMuted);
    }
  };

  // Phase 2: Feeding Match
  const handleSelectFood = (foodId) => {
    habitatAudio.playSelect(isMuted);
    setSelectedFoodId(foodId === selectedFoodId ? null : foodId);
  };

  const handleFeedAnimal = (animalId) => {
    if (!selectedFoodId) return;
    const animal = SPECIES_LIST.find(a => a.id === animalId);

    if (animal.foodId === selectedFoodId) {
      habitatAudio.playMatchSuccess(isMuted);
      setFeedingMatches(prev => ({ ...prev, [animalId]: selectedFoodId }));
      setSelectedFoodId(null);

      const nextMatches = { ...feedingMatches, [animalId]: selectedFoodId };
      const allDone = SPECIES_LIST.every(s => nextMatches[s.id] === s.foodId);
      if (allDone) {
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      }
    } else {
      habitatAudio.playMatchError(isMuted);
    }
  };

  // Phase 3: Locomotion Selection
  const handleSelectMovement = (animalId, movementId) => {
    habitatAudio.playSelect(isMuted);
    setLocomotionMatches(prev => {
      const updated = { ...prev, [animalId]: movementId };
      const animal = SPECIES_LIST.find(a => a.id === animalId);
      if (animal.movementId === movementId) {
        habitatAudio.playMatchSuccess(isMuted);
      }
      const allDone = SPECIES_LIST.every(s => updated[s.id] === s.movementId);
      if (allDone) {
        confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  const handleResetLab = () => {
    habitatAudio.playSelect(isMuted);
    setHabitatMatches({ monkey: null, fish: null, cow: null, frog: null, crow: null });
    setFeedingMatches({ monkey: null, fish: null, cow: null, frog: null, crow: null });
    setLocomotionMatches({ monkey: null, fish: null, cow: null, frog: null, crow: null });
    setSelectedAnimalId(null);
    setSelectedFoodId(null);
    setPhase(1);
    setShowCertificate(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #D6EDFA 0%, #E8F7EE 18%, #F3FAF5 50%, #E5F5EB 85%, #D5EFE0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(4px, 0.7vh, 8px) clamp(10px, 1.2vw, 20px)',
        boxSizing: 'border-box',
        overflow: 'hidden', // ZERO SCROLL
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        color: '#1F2937'
      }}
    >
      <TopCornerFoliage side="left" />
      <TopCornerFoliage side="right" />
      <TopMountainBackdrop />
      <BottomNatureSilhouettes />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        .bio-nav-btn {
          background: #14452F;
          color: #D1FAE5;
          border: 1.5px solid #2D6A4F;
          border-radius: 9px;
          padding: 6px 14px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(20, 69, 47, 0.2);
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: #1B5E3C;
          color: #FFFFFF;
          border-color: #10B981;
          transform: translateY(-1px);
        }
        .bio-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FCD34D;
          border-radius: 9px;
          padding: 7px 18px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          box-shadow: 0 3px 12px rgba(217, 119, 6, 0.35);
        }
        .bio-cta-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(217, 119, 6, 0.45);
        }
        .bio-cta-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .bio-parchment-card {
          background: rgba(250, 248, 242, 0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 2px solid rgba(25, 71, 32, 0.5);
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(15, 74, 50, 0.1), inset 0 0 0 1px rgba(45, 106, 79, 0.08);
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. TOP HEADER SECTION: SLOGAN PAGE DESIGN, ZERO OVERLAP      */}
      {/* ============================================================ */}
      <header
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1540px',
          textAlign: 'center',
          flexShrink: 0,
          marginBottom: 'clamp(2px, 0.4vh, 4px)',
          zIndex: 20
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '12px'
          }}
        >
          {/* LEFT: DASHBOARD BUTTON */}
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBackToDashboard}
            aria-label="Back to Dashboard"
            style={{ padding: '6px 14px', fontSize: '16px', flexShrink: 0 }}
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
            <span>Dashboard</span>
          </button>

          {/* CENTER: BADGES & TITLE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: '#14452F',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '2px 14px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
                }}
              >
                CLASS 6 • SCIENCE
              </span>
              <span
                style={{
                  background: '#14452F',
                  color: '#34D399',
                  borderRadius: '16px',
                  padding: '2px 14px',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '16px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #10B981',
                  boxShadow: '0 2px 6px rgba(20, 69, 47, 0.25)'
                }}
              >
                ACTIVITY 2.9–2.10 • HABITATS LAB
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TitleVineBranch side="left" />
              <h1
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 900,
                  fontSize: '20px',
                  color: '#0A3B24',
                  margin: 0,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap'
                }}
              >
                Animal Habitats &amp; Living Surroundings
              </h1>
              <TitleVineBranch side="right" />
            </div>
            <TitleSprout />
          </div>

          {/* RIGHT: CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={toggleMute}
              style={{
                background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(20, 69, 47, 0.92)',
                color: isMuted ? '#DC2626' : '#D1FAE5',
                border: `1.5px solid ${isMuted ? '#EF4444' : '#2D6A4F'}`,
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '16px',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetLab}
              title="Reset Mission"
              style={{
                background: 'rgba(20, 69, 47, 0.92)',
                color: '#D1FAE5',
                border: '1.5px solid #2D6A4F',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '16px',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              <RefreshCw size={15} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'rgba(20, 69, 47, 0.92)',
                color: '#D1FAE5',
                border: '1.5px solid #2D6A4F',
                borderRadius: '8px',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* PHASE SUB-BANNER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: 'clamp(2px, 0.4vh, 4px)',
          flexShrink: 0,
          zIndex: 10
        }}
      >
        <span
          style={{
            background: '#14452F',
            color: '#FCD34D',
            padding: '2px 14px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 900,
            fontFamily: "'Outfit', sans-serif",
            border: '1.5px solid #F59E0B',
            boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
          }}
        >
          {phase === 1 && 'Phase 1 of 3: Native Habitat Match'}
          {phase === 2 && 'Phase 2 of 3: Dietary Feeding'}
          {phase === 3 && 'Phase 3 of 3: Locomotion Adaptations'}
        </span>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN ACTIVE WORKSPACE AREA (FITS 100% WITH ZERO OVERLAP)  */}
      {/* ============================================================ */}
      <main
        style={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          maxWidth: '1380px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10,
          boxSizing: 'border-box'
        }}
      >
        {/* ========================================================== */}
        {/* PHASE 1: NATIVE HABITAT MATCHING                           */}
        {/* ========================================================== */}
        {/* ========================================================== */}
        {/* PHASE 1: 50% - 50% SCREEN ALLOCATION: TWO IMAGES IN SINGLE PAGE */}
        {/* ========================================================== */}
        {phase === 1 && (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(8px, 1.2vw, 14px)',
              overflow: 'hidden'
            }}
          >
            {/* LEFT SIDE (50%): WILDLIFE SPECIMEN WITH LARGE IMAGE */}
            <section
              className="bio-parchment-card"
              style={{
                padding: 'clamp(8px, 1vh, 12px) clamp(10px, 1.2vw, 16px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <CardCornerLeaves position="top-left" />

              {/* CARD TOP HEADER */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'clamp(4px, 0.6vh, 8px)',
                  position: 'relative',
                  zIndex: 5,
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    SPECIMEN {currentAnimal.num} OF 05
                  </span>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#0A3B24',
                      fontFamily: '"Fraunces", Georgia, serif',
                      lineHeight: 1.15
                    }}
                  >
                    {currentAnimal.name}
                  </h2>
                </div>

                <span
                  style={{
                    background: '#EAF7EE',
                    color: '#064E3B',
                    border: '1.5px solid #10B981',
                    borderRadius: '8px',
                    padding: '2px 10px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  {currentAnimal.tag}
                </span>
              </div>

              {/* 50% LEFT SIDE IMAGE VIEWPORT */}
              <div
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: 0,
                  background: '#0B291A',
                  borderRadius: '12px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(10, 59, 36, 0.2)',
                  zIndex: 4
                }}
              >
                <img
                  key={`animal-${currentAnimal.id}`}
                  src={currentAnimal.image}
                  alt={currentAnimal.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.45))',
                    transition: 'transform 0.25s ease'
                  }}
                />

                {/* LEFT IMAGE IDENTIFIER BADGE */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(20, 69, 47, 0.90)',
                    backdropFilter: 'blur(6px)',
                    color: '#D1FAE5',
                    borderRadius: '8px',
                    padding: '3px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    zIndex: 6
                  }}
                >
                  🐾 Left Image: {currentAnimal.name}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(10, 59, 36, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#FCD34D',
                    borderRadius: '6px',
                    padding: '2px 10px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    fontStyle: 'italic',
                    zIndex: 6
                  }}
                >
                  {currentAnimal.scientific}
                </div>
              </div>

              {/* SPECIMEN CONTROLS: PREV/NEXT & SPECIMEN SWITCHER */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginTop: 'clamp(4px, 0.6vh, 8px)',
                  position: 'relative',
                  zIndex: 5,
                  flexShrink: 0
                }}
              >
                {/* 5 SPECIMEN SELECTOR BUTTONS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                  {SPECIES_LIST.map((sp, idx) => {
                    const isCurrent = idx === activeSpecimenIndex;
                    const isMatched = habitatMatches[sp.id] !== null;
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => {
                          habitatAudio.playSelect(isMuted);
                          setActiveSpecimenIndex(idx);
                          setActiveHabitatChoice(null);
                        }}
                        style={{
                          padding: '4px 2px',
                          borderRadius: '8px',
                          background: isCurrent ? '#14452F' : isMatched ? '#EAF7EE' : 'rgba(255, 255, 255, 0.85)',
                          color: isCurrent ? '#FFFFFF' : '#14452F',
                          border: isCurrent ? '2px solid #10B981' : isMatched ? '1.5px solid #10B981' : '1.2px solid #2D6A4F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          whiteSpace: 'nowrap',
                          boxShadow: isCurrent ? '0 2px 8px rgba(20, 69, 47, 0.25)' : 'none',
                          transition: 'all 0.12s ease'
                        }}
                      >
                        <span>{sp.num}</span>
                        <span>{sp.name.split(' ')[1] || sp.name}</span>
                        {isMatched && <span style={{ color: '#10B981' }}>✓</span>}
                      </button>
                    );
                  })}
                </div>

                {/* SCIENTIFIC TELEMETRY READOUT */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.90)',
                    border: '1.5px solid #2D6A4F',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div style={{ fontSize: '16px', color: '#0A3B24', lineHeight: 1.3, fontWeight: 700 }}>
                    <strong style={{ color: '#14452F' }}>Adaptation:</strong> {currentAnimal.adaptationNote}
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={handlePrevAnimal}
                      className="bio-nav-btn"
                      style={{ padding: '3px 8px', fontSize: '16px' }}
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={handleNextAnimal}
                      className="bio-nav-btn"
                      style={{ padding: '3px 8px', fontSize: '16px' }}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT SIDE (50%): NATIVE HABITAT BIOME WITH LARGE IMAGE */}
            <section
              className="bio-parchment-card"
              style={{
                padding: 'clamp(8px, 1vh, 12px) clamp(10px, 1.2vw, 16px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <CardCornerLeaves position="top-right" />

              {/* CARD TOP HEADER */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'clamp(4px, 0.6vh, 8px)',
                  position: 'relative',
                  zIndex: 5,
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: '#14452F',
                      color: '#FFFFFF',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    NATIVE HABITAT BIOME
                  </span>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#0A3B24',
                      fontFamily: '"Fraunces", Georgia, serif',
                      lineHeight: 1.15
                    }}
                  >
                    {currentHabitat.name}
                  </h2>
                </div>

                <span
                  style={{
                    background: habitatMatches[currentAnimal.id] ? '#EAF7EE' : '#FEF3C7',
                    color: habitatMatches[currentAnimal.id] ? '#064E3B' : '#92400E',
                    border: `1.5px solid ${habitatMatches[currentAnimal.id] ? '#10B981' : '#F59E0B'}`,
                    borderRadius: '8px',
                    padding: '2px 10px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  {habitatMatches[currentAnimal.id] ? '✓ Native Biome Matched' : 'Explore & Verify Habitat'}
                </span>
              </div>

              {/* 50% RIGHT SIDE IMAGE VIEWPORT */}
              <div
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: 0,
                  background: '#0B291A',
                  borderRadius: '12px',
                  border: '2px solid rgba(20, 69, 47, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(10, 59, 36, 0.2)',
                  zIndex: 4
                }}
              >
                <img
                  key={`habitat-${currentHabitat.id}`}
                  src={currentHabitat.image}
                  alt={currentHabitat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1.04) brightness(0.98)',
                    transition: 'transform 0.25s ease'
                  }}
                />

                {/* RIGHT IMAGE IDENTIFIER BADGE */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(20, 69, 47, 0.90)',
                    backdropFilter: 'blur(6px)',
                    color: '#D1FAE5',
                    borderRadius: '8px',
                    padding: '3px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    zIndex: 6
                  }}
                >
                  🌲 Right Image: {currentHabitat.name}
                </div>

                {/* BIOME DESCRIPTION OVERLAY AT BOTTOM OF IMAGE */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    right: '8px',
                    background: 'rgba(10, 59, 36, 0.88)',
                    backdropFilter: 'blur(6px)',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    lineHeight: 1.3,
                    border: '1px solid rgba(52, 211, 153, 0.25)',
                    zIndex: 6
                  }}
                >
                  {currentHabitat.description}
                </div>
              </div>

              {/* HABITAT MATCHING INTERACTION DOCK */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginTop: 'clamp(4px, 0.6vh, 8px)',
                  position: 'relative',
                  zIndex: 5,
                  flexShrink: 0
                }}
              >
                {/* 5 HABITAT SELECTOR BUTTONS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                  {HABITAT_BIOMES.map((hab) => {
                    const isSelected = hab.id === currentHabitat.id;
                    const isCorrectForAnimal = hab.id === currentAnimal.habitatId;
                    return (
                      <button
                        key={hab.id}
                        type="button"
                        onClick={() => handleTestHabitatMatch(hab.id)}
                        style={{
                          padding: '4px 2px',
                          borderRadius: '8px',
                          background: isSelected ? (isCorrectForAnimal ? '#10B981' : '#F59E0B') : 'rgba(255, 255, 255, 0.85)',
                          color: isSelected ? '#FFFFFF' : '#14452F',
                          border: isSelected ? '2px solid #064E3B' : '1.2px solid #2D6A4F',
                          fontSize: '16px',
                          fontWeight: 800,
                          fontFamily: "'Outfit', sans-serif",
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap',
                          boxShadow: isSelected ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none',
                          transition: 'all 0.12s ease'
                        }}
                      >
                        <span>{hab.name.split(' ')[0]}</span>
                        {isSelected && isCorrectForAnimal && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>

                {/* VERIFICATION BAR + NEXT ANIMAL / NEXT PHASE CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div
                    style={{
                      background: habitatMatches[currentAnimal.id] ? '#EAF7EE' : matchFeedback.startsWith('❌') ? '#FEE2E2' : 'rgba(255, 255, 255, 0.92)',
                      border: `1.5px solid ${habitatMatches[currentAnimal.id] ? '#10B981' : matchFeedback.startsWith('❌') ? '#EF4444' : '#2D6A4F'}`,
                      borderRadius: '8px',
                      padding: '4px 12px',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: habitatMatches[currentAnimal.id] ? '#064E3B' : matchFeedback.startsWith('❌') ? '#991B1B' : '#14452F',
                      flex: 1
                    }}
                  >
                    {matchFeedback || (habitatMatches[currentAnimal.id]
                      ? `✓ Confirmed: ${currentAnimal.name} is adapted to thrive in ${currentHabitat.name}`
                      : `🎯 Choose the native ecosystem above that matches ${currentAnimal.name}!`)}
                  </div>

                  {isHabitatPhaseDone ? (
                    <button
                      type="button"
                      className="bio-cta-btn"
                      onClick={() => setPhase(2)}
                      style={{ padding: '6px 14px', fontSize: '16px', flexShrink: 0 }}
                    >
                      <span>Phase 2: Feeding</span>
                      <ChevronRight size={17} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bio-cta-btn"
                      onClick={handleNextAnimal}
                      style={{ padding: '6px 14px', fontSize: '16px', flexShrink: 0 }}
                    >
                      <span>Next Specimen</span>
                      <ChevronRight size={17} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================== */}
        {/* PHASE 2: NUTRITIONAL FORAGING & DIET MATCHING               */}
        {/* ========================================================== */}
        {phase === 2 && (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(8px, 1.2vw, 14px)',
              overflow: 'hidden'
            }}
          >
            {/* LEFT: 5 NUTRITIONAL FOODS */}
            <section
              className="bio-parchment-card"
              style={{
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
              }}
            >
              <CardCornerLeaves position="top-left" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', position: 'relative', zIndex: 5 }}>
                <span style={{ background: '#14452F', color: '#FFFFFF', padding: '2px 10px', borderRadius: '12px', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '16px' }}>
                  NUTRITIONAL DIETS (5)
                </span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#14452F' }}>
                  Click food then feed species
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-around', position: 'relative', zIndex: 5 }}>
                {FOOD_ITEMS.map((food) => {
                  const isSelected = selectedFoodId === food.id;
                  const isUsed = Object.values(feedingMatches).includes(food.id);

                  return (
                    <div
                      key={food.id}
                      onClick={() => !isUsed && handleSelectFood(food.id)}
                      style={{
                        background: isSelected ? '#14452F' : isUsed ? '#EAF7EE' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#0A3B24',
                        border: isSelected ? '2px solid #10B981' : isUsed ? '1.8px solid #10B981' : '1.5px solid #2D6A4F',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: isUsed ? 'default' : 'pointer',
                        boxShadow: isSelected ? '0 3px 10px rgba(16, 185, 129, 0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'all 0.12s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '22px' }}>{food.icon}</span>
                        <div>
                          <div style={{ fontSize: '17px', fontWeight: 900, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.1 }}>
                            {food.name}
                          </div>
                          <div style={{ fontSize: '16px', color: isSelected ? '#D1FAE5' : '#4B5563', lineHeight: 1.1 }}>
                            {food.desc}
                          </div>
                        </div>
                      </div>

                      <div>
                        {isUsed ? (
                          <span style={{ color: '#10B981', fontSize: '16px', fontWeight: 900 }}>✓ Delivered</span>
                        ) : isSelected ? (
                          <span style={{ color: '#FCD34D', fontSize: '16px', fontWeight: 900 }}>Selected ➔</span>
                        ) : (
                          <span style={{ color: '#14452F', fontSize: '16px', fontWeight: 800 }}>Pick</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* RIGHT: 5 SPECIES FEEDING STATIONS */}
            <section
              className="bio-parchment-card"
              style={{
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
              }}
            >
              <CardCornerLeaves position="top-right" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', position: 'relative', zIndex: 5 }}>
                <span style={{ background: '#14452F', color: '#FFFFFF', padding: '2px 10px', borderRadius: '12px', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '16px' }}>
                  SPECIES NUTRITION STATIONS
                </span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#14452F' }}>
                  {Object.values(feedingMatches).filter(Boolean).length} / 5 Species Fed
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-around', position: 'relative', zIndex: 5 }}>
                {SPECIES_LIST.map((animal) => {
                  const fedFoodId = feedingMatches[animal.id];
                  const fedFood = FOOD_ITEMS.find(f => f.id === fedFoodId);
                  const isEligible = selectedFoodId && !fedFoodId;

                  return (
                    <div
                      key={animal.id}
                      onClick={() => handleFeedAnimal(animal.id)}
                      style={{
                        background: fedFood ? '#FFFFFF' : isEligible ? '#F0FDF4' : 'rgba(255, 255, 255, 0.85)',
                        border: fedFood ? '2px solid #10B981' : isEligible ? '2px dashed #10B981' : '1.5px solid #2D6A4F',
                        borderRadius: '10px',
                        padding: '4px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: isEligible ? 'pointer' : 'default',
                        transition: 'all 0.12s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1.2px solid #14452F',
                            flexShrink: 0
                          }}
                        >
                          <img
                            src={animal.image}
                            alt={animal.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>

                        <div>
                          <div style={{ fontSize: '17px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.1 }}>
                            {animal.name}
                          </div>
                          <div style={{ fontSize: '16px', color: '#059669', fontWeight: 800, lineHeight: 1.1 }}>
                            Habitat: {animal.habitatName}
                          </div>
                        </div>
                      </div>

                      <div>
                        {fedFood ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#EAF7EE', padding: '3px 8px', borderRadius: '8px', border: '1.2px solid #10B981' }}>
                            <span style={{ fontSize: '18px' }}>{fedFood.icon}</span>
                            <span style={{ fontSize: '16px', fontWeight: 900, color: '#064E3B' }}>
                              {fedFood.name.split(' ')[0]}
                            </span>
                            <span style={{ color: '#10B981', fontWeight: 900, fontSize: '16px' }}>✓</span>
                          </div>
                        ) : selectedFoodId ? (
                          <button
                            type="button"
                            style={{
                              background: '#14452F',
                              color: '#FFFFFF',
                              border: '1.5px solid #10B981',
                              borderRadius: '8px',
                              padding: '4px 10px',
                              fontSize: '16px',
                              fontWeight: 800,
                              fontFamily: "'Outfit', sans-serif",
                              cursor: 'pointer'
                            }}
                          >
                            Feed Species ➔
                          </button>
                        ) : (
                          <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 700 }}>
                            Awaiting Food
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* NAVIGATION BUTTONS (BACK & NEXT) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', position: 'relative', zIndex: 5 }}>
                <button
                  type="button"
                  className="bio-nav-btn"
                  onClick={() => setPhase(1)}
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                  <span>Back: Habitat Match</span>
                </button>

                <button
                  type="button"
                  className="bio-cta-btn"
                  onClick={() => setPhase(3)}
                  disabled={!isFeedingPhaseDone}
                >
                  <span>Next Phase: Locomotion Adaptations</span>
                  <ChevronRight size={17} strokeWidth={2.5} />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================== */}
        {/* PHASE 3: LOCOMOTION & BIOMECHANICAL ADAPTATIONS            */}
        {/* ========================================================== */}
        {phase === 3 && (
          <div
            className="bio-parchment-card"
            style={{
              flex: 1,
              minHeight: 0,
              padding: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', position: 'relative', zIndex: 5 }}>
              <div>
                <span style={{ background: '#14452F', color: '#FFFFFF', padding: '2px 10px', borderRadius: '12px', fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '16px' }}>
                  ADAPTIVE BIOMECHANICS MATRIX
                </span>
                <span style={{ marginLeft: '10px', fontSize: '16px', color: '#1B4D3E', fontWeight: 700 }}>
                  Select the anatomical adaptation that enables each animal to move effectively.
                </span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#14452F' }}>
                {Object.values(locomotionMatches).filter(Boolean).length} / 5 Classified
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-around', position: 'relative', zIndex: 5 }}>
              {SPECIES_LIST.map((animal) => {
                const selectedMode = locomotionMatches[animal.id];
                const isCorrect = selectedMode === animal.movementId;

                return (
                  <div
                    key={animal.id}
                    style={{
                      background: '#FFFFFF',
                      border: isCorrect ? '2px solid #10B981' : '1.5px solid #2D6A4F',
                      borderRadius: '10px',
                      padding: '4px 10px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(160px, 1fr) minmax(360px, 2.5fr) minmax(180px, 1.4fr)',
                      gap: '10px',
                      alignItems: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* ANIMAL NAME & PORTRAIT */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1.2px solid #14452F',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={animal.image}
                          alt={animal.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '17px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.1 }}>
                          {animal.name}
                        </div>
                        <div style={{ fontSize: '16px', color: '#10B981', fontWeight: 800, lineHeight: 1.1 }}>
                          {animal.habitatName}
                        </div>
                      </div>
                    </div>

                    {/* MOVEMENT MODE BUTTONS */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                      {MOVEMENT_MODES.map((mode) => {
                        const isChosen = selectedMode === mode.id;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => handleSelectMovement(animal.id, mode.id)}
                            style={{
                              padding: '4px 2px',
                              borderRadius: '7px',
                              background: isChosen ? '#14452F' : 'rgba(240, 253, 244, 0.75)',
                              border: isChosen ? '2px solid #10B981' : '1px solid #2D6A4F',
                              color: isChosen ? '#FFFFFF' : '#14452F',
                              fontSize: '16px',
                              fontWeight: 800,
                              fontFamily: "'Outfit', sans-serif",
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px'
                            }}
                          >
                            <span style={{ fontSize: '16px' }}>{mode.icon}</span>
                            <span>{mode.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* ADAPTATION NOTE / VERIFICATION */}
                    <div style={{ fontSize: '16px', lineHeight: 1.15, color: isCorrect ? '#065F46' : '#6B7280' }}>
                      {isCorrect ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                          <CheckCircle2 size={16} color="#10B981" />
                          <span>{animal.adaptationNote}</span>
                        </div>
                      ) : (
                        <span>Select movement adaptation mode</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION BUTTONS (BACK & COMPLETE) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', position: 'relative', zIndex: 5 }}>
              <button
                type="button"
                className="bio-nav-btn"
                onClick={() => setPhase(2)}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
                <span>Back: Dietary Feeding</span>
              </button>

              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  setShowCertificate(true);
                  habitatAudio.playComplete(isMuted);
                  confetti({ particleCount: 180, spread: 90, origin: { y: 0.55 } });
                }}
                disabled={!isMovementPhaseDone}
              >
                <Sparkles size={17} />
                <span>Complete Expedition &amp; View Certification</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* 3. FIELD BIOLOGIST CERTIFICATION MODAL                       */}
      {/* ============================================================ */}
      {showCertificate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 45, 30, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            className="bio-parchment-card"
            style={{
              width: '100%',
              maxWidth: '800px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              position: 'relative'
            }}
          >
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />
            <CardCornerLeaves position="bottom-left" />
            <CardCornerLeaves position="bottom-right" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 5 }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: '#14452F',
                  color: '#FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Award size={32} />
              </div>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#14452F',
                    color: '#34D399',
                    borderRadius: '14px',
                    padding: '2px 12px',
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: '2px'
                  }}
                >
                  FIELD EXPEDITION COMPLETE
                </div>
                <h2 style={{ margin: 0, fontSize: '23px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif' }}>
                  Field Biologist Certification · Habitats &amp; Adaptations
                </h2>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '16px', color: '#1B4D3E', fontWeight: 600, lineHeight: 1.4, position: 'relative', zIndex: 5 }}>
              Outstanding field investigation! You successfully matched all 5 animal species to their native ecosystems, nutritional foraging diets, and biomechanical adaptations:
            </p>

            {/* KEY SCIENTIFIC DISCOVERIES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', position: 'relative', zIndex: 5 }}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  border: '1.5px solid #14452F'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '2px' }}>
                  🏡 What is a Habitat?
                </div>
                <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.35 }}>
                  The natural environment where an organism lives, providing food, water, air, shelter, and suitable breeding conditions.
                </div>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  border: '1.5px solid #D97706'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0A3B24', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '2px' }}>
                  ⚡ What is an Adaptation?
                </div>
                <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.35 }}>
                  Special bodily features or behavioral traits that enable plants and animals to survive and thrive in their particular surroundings.
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#EAF7EE',
                borderLeft: '4px solid #10B981',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '16px',
                color: '#0F3822',
                lineHeight: 1.4,
                position: 'relative',
                zIndex: 5
              }}
            >
              💡 <strong>Ready for Chapter 2 Next Mission:</strong> Advance to Tables 2.5 &amp; 2.6 to explore animal locomotion and physical movement across terrestrial and aquatic ecosystems!
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', position: 'relative', zIndex: 5 }}>
              <button
                type="button"
                className="bio-cta-btn"
                onClick={() => {
                  setShowCertificate(false);
                  if (onNextActivity) onNextActivity();
                }}
              >
                <span>Advance to Tables 2.5 &amp; 2.6: Animal Locomotion</span>
                <ChevronRight size={17} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. BOTTOM NAVIGATION BAR (MATCHING SLOGAN PAGE EXACTLY)      */}
      {/* ============================================================ */}
      <footer
        style={{
          width: '100%',
          maxWidth: '1380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          padding: '0 2px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 20
        }}
      >
        <button
          type="button"
          className="bio-nav-btn"
          onClick={onBackToDashboard}
          aria-label="Previous Activity"
        >
          ← Previous: Seed Dissection
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div
            style={{
              background: '#14452F',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '3px 16px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.04em',
              boxShadow: '0 2px 8px rgba(20, 69, 47, 0.25)'
            }}
          >
            Activity 2.9–2.10 · Field Mission
          </div>
        </div>

        <button
          type="button"
          className="bio-cta-btn"
          onClick={onNextActivity}
          aria-label="Next Subtab"
        >
          <span>Next: Tables 2.5 &amp; 2.6</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
