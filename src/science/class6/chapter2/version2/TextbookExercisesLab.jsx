import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Check,
  Award,
  BookOpen,
  HelpCircle,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  RotateCcw,
  Search,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';
import { habitatAudio } from './AnimalHabitatExplorer/habitatAudio';
import QuestionScienceSimulations from './QuestionScienceSimulations';

// High-Resolution Photographic Visual Assets (10 Distinct, Non-Repeated Images)
import wheatKidneyBeansImg from '../../../../assets/wheat_and_kidney_beans.jpg';
import animalsEcosystemImg from '../../../../assets/activity_animals_image.png';
import radishTaprootImg from '../../../../assets/radish_taproot_macro.jpg';
import mountainPlainsGoatImg from '../../../../assets/mountain_and_plains_goat.jpg';
import animalsGroupImg from './DiversityInTheLivingWorldNew/images/ch2_activity_2.1_animals_8k.jpg';
import sacredGroveImg from '../../../../assets/sacred_grove.png';
import leafVenationImg from '../../../../assets/ch2_leaf_venation_macro.jpg';
import hibiscusShrubImg from '../../../../assets/rose_shrub_ultra.jpg';
import rootSystemsImg from '../../../../assets/ch2_root_systems_macro.jpg';
import duckWebbedFeetImg from '../../../../assets/duck_webbed_feet_macro.jpg';

// ============================================================
// ORNATE BOTANICAL SVG ELEMENTS (EXACT MATCH TO SLOGAN PAGE)
// ============================================================

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
// DATA: 18 KEYWORDS (NCERT CHAPTER 2 GLOSSARY)
// ============================================================

const KEYWORDS = [
  { term: 'Adaptation', category: 'ecology', catLabel: 'Survival & Ecology', icon: '🦎', def: 'Special features or behaviors that enable plants and animals to survive and thrive in a particular habitat.' },
  { term: 'Biodiversity', category: 'ecology', catLabel: 'Global Ecology', icon: '🌍', def: 'The vast variety of all living organisms—plants, animals, and microorganisms—found in a given region.' },
  { term: 'Cotyledon', category: 'seeds', catLabel: 'Seed Anatomy', icon: '🌱', def: 'The initial seed leaf within an embryo that stores vital nutrients to nourish the sprouting seedling.' },
  { term: 'Dicot plants', category: 'seeds', catLabel: 'Plant Types', icon: '🫘', def: 'Plants whose seeds naturally split into two cotyledons (e.g., gram, pea, beans, mango).' },
  { term: 'Habitat', category: 'ecology', catLabel: 'Ecology & Home', icon: '🏡', def: 'The natural dwelling place where an organism lives, finding food, water, air, shelter, and breeding grounds.' },
  { term: 'Fibrous root', category: 'roots', catLabel: 'Root Systems', icon: '🌾', def: 'A bushy root system consisting of numerous similar-sized roots branching directly from the base of the stem.' },
  { term: 'Herbs', category: 'plants', catLabel: 'Growth Habit', icon: '🌿', def: 'Small, non-woody plants with tender green stems that bend easily without breaking (e.g., tomato, mint).' },
  { term: 'Sacred groves', category: 'ecology', catLabel: 'Conservation', icon: '🌲', def: 'Undisturbed forest patches strictly protected by local communities through cultural traditions and taboos.' },
  { term: 'Venation', category: 'roots', catLabel: 'Leaf Morphology', icon: '🍃', def: 'The intricate structural pattern or arrangement of veins traversing a leaf blade.' },
  { term: 'Monocot plants', category: 'seeds', catLabel: 'Plant Types', icon: '🌽', def: 'Plants whose seeds contain only a single cotyledon (e.g., maize, wheat, rice, grass).' },
  { term: 'Reticulate venation', category: 'roots', catLabel: 'Leaf Morphology', icon: '🕸️', def: 'A net-like, webbed vein arrangement with lateral veinlets branching off a central midrib.' },
  { term: 'Parallel venation', category: 'roots', catLabel: 'Leaf Morphology', icon: '📏', def: 'A vein pattern where veins run straight and parallel alongside one another across the entire leaf blade.' },
  { term: 'Taproot', category: 'roots', catLabel: 'Root Systems', icon: '🥕', def: 'A dominant, thick primary root growing vertically downwards with smaller lateral side roots.' },
  { term: 'Shrubs', category: 'plants', catLabel: 'Growth Habit', icon: '🌺', def: 'Medium-height perennial plants featuring hard, thin woody stems that branch profusely close to the ground.' },
  { term: 'Amphibians', category: 'ecology', catLabel: 'Animal Ecology', icon: '🐸', def: 'Animals specially adapted to inhabit both aquatic water bodies and terrestrial land surfaces (e.g., frogs).' },
  { term: 'Aquatic', category: 'ecology', catLabel: 'Habitat Types', icon: '🌊', def: 'Pertaining to water-based ecosystems such as ponds, lakes, rivers, and oceans.' },
  { term: 'Tree', category: 'plants', catLabel: 'Growth Habit', icon: '🌳', def: 'Tall perennial plants possessing a single hard, thick, woody brown trunk whose branches arise high above the ground.' },
  { term: 'Terrestrial', category: 'ecology', catLabel: 'Habitat Types', icon: '⛰️', def: 'Pertaining to land-based ecosystems including forests, grasslands, deserts, and mountain peaks.' }
];

// ============================================================
// DATA: 10 NCERT EXERCISES WITH UNIQUE NON-REPEATED IMAGES
// ============================================================

const EXERCISES = [
  {
    id: 1,
    page: 31,
    title: 'Q1. Wheat vs. Kidney Beans Comparison',
    question: 'Here are two types of seeds: (a) Wheat and (b) Kidney beans. What differences do you find among the roots and leaf venation of their plants?',
    image: wheatKidneyBeansImg,
    imageLabel: 'Macrophotograph: Wheat Seeds (Monocot) vs Kidney Beans (Dicot)',
    hasSpecimenToggle: true,
    options: [
      { text: 'Wheat: Dicot, Taproot, Reticulate venation; Kidney Bean: Monocot, Fibrous root, Parallel venation', correct: false },
      { text: 'Wheat: Monocot (1 cotyledon), Fibrous root system, Parallel venation; Kidney Bean: Dicot (2 cotyledons), Taproot system, Reticulate venation', correct: true },
      { text: 'Both plants have identical taproots and parallel leaf venation', correct: false }
    ],
    explanation: 'Wheat is a cereal grain with a single cotyledon (monocot), which correlates with fibrous roots and parallel venation. Kidney beans split into two cotyledons (dicot), correlating with a central taproot and net-like reticulate venation.'
  },
  {
    id: 2,
    page: 31,
    title: 'Q2. Habitat Venn Diagram Categorization',
    question: 'Classify 10 animals into Area A (Aquatic), Area B (Terrestrial), or Area C (Both/Amphibious): Horse, Dolphin, Frog, Sheep, Crocodile, Squirrel, Whale, Earthworm, Pigeon, Tortoise.',
    image: animalsEcosystemImg,
    imageLabel: 'Biodiversity Survey: Aquatic, Terrestrial, and Amphibious Wildlife',
    options: [
      { text: 'Area A (Aquatic): Dolphin, Whale; Area B (Terrestrial): Horse, Sheep, Squirrel, Earthworm, Pigeon; Area C (Both): Frog, Crocodile, Tortoise', correct: true },
      { text: 'Area A (Aquatic): Frog, Dolphin, Whale, Crocodile; Area B (Terrestrial): Horse, Sheep; Area C (Both): Earthworm, Squirrel', correct: false },
      { text: 'Area A (Aquatic): Pigeon, Tortoise; Area B (Terrestrial): Whale, Dolphin; Area C (Both): Horse, Sheep', correct: false }
    ],
    explanation: 'Dolphin and Whale live entirely in water (Aquatic A). Horse, Sheep, Squirrel, Earthworm, and Pigeon live on land (Terrestrial B). Frog, Crocodile, and Tortoise can inhabit both water and land environments (Both C).'
  },
  {
    id: 3,
    page: 31,
    title: 'Q3. Radish Root & Leaf Venation Examination',
    question: 'Manu’s mother maintains a kitchen garden and was digging out radish. She explained that radish is a swollen storage root. What type of root is it, and what type of leaf venation would you observe on a radish plant?',
    image: radishTaprootImg,
    imageLabel: 'Excavated White Radish: Swollen Taproot with Lateral Rootlets and Reticulate Leaves',
    options: [
      { text: 'Fibrous root system and parallel leaf venation', correct: false },
      { text: 'Taproot system (dominant central swollen root with side rootlets) and reticulate (net-like) leaf venation', correct: true },
      { text: 'Climbing aerial root and no leaf venation', correct: false }
    ],
    explanation: 'A radish is a modified taproot that swells with stored nutrients, with delicate lateral roots emerging from its sides. As a dicot plant, its leaves exhibit net-like reticulate venation.'
  },
  {
    id: 4,
    page: 31,
    title: 'Q4. Mountain Goat vs. Plains Goat Adaptations',
    question: 'Look at the mountain goat and a goat found in the plains. Point out the primary similarities and differences, and state the reasons for these adaptations.',
    image: mountainPlainsGoatImg,
    imageLabel: 'Comparative Study: Cold Mountain Goat on Cliffs vs Domestic Plains Goat in Meadow',
    options: [
      { text: 'Both have 4 legs and graze, but the mountain goat has thick warm fur and specialized concave hooves for climbing steep rocky cliffs without slipping', correct: true },
      { text: 'Plains goats can fly while mountain goats swim in mountain streams', correct: false },
      { text: 'There are no physical differences between them', correct: false }
    ],
    explanation: 'Both share herbivorous rumination and 4 walking legs. However, mountain goats have evolved dense insulating woolly coats against freezing winds, and specialized concave hooves with rubbery pads that grip sheer mountain rocks.'
  },
  {
    id: 5,
    page: 32,
    title: 'Q5. Alternative Grouping Criteria',
    question: 'Group these animals using a feature other than those discussed in the chapter: Cow, Cockroach, Pigeon, Bat, Tortoise, Whale, Fish, Grasshopper, Lizard.',
    image: animalsGroupImg,
    imageLabel: 'Faunal Classification: Reproductive Modes (Viviparous Mammals vs Oviparous Egg-Layers)',
    options: [
      { text: 'Egg-laying (Oviparous: Cockroach, Pigeon, Tortoise, Fish, Grasshopper, Lizard) vs. Giving birth to young (Viviparous mammals: Cow, Bat, Whale)', correct: true },
      { text: 'Animals that sleep at night vs animals that never sleep', correct: false },
      { text: 'Animals that like fruits vs animals that only drink water', correct: false }
    ],
    explanation: 'A valid alternative grouping basis is reproductive mode: animals that lay eggs (insects, birds, reptiles, fish) versus mammals that give direct birth and nurse their young (cow, bat, whale).'
  },
  {
    id: 6,
    page: 32,
    title: 'Q6. Deforestation & Forest Depletion Challenge',
    question: 'As populations grow, forests are being cut down for urbanization. How does this affect our surroundings, and how can society address this challenge?',
    image: sacredGroveImg,
    imageLabel: 'Ecological Heritage: Community-Protected Sacred Grove Preserving Pristine Biodiversity',
    options: [
      { text: 'Cutting forests improves oxygen levels and has no negative environmental impact', correct: false },
      { text: 'Causes loss of animal habitats, soil erosion, climate warming, and biodiversity loss. Addressed by reforestation, protected sanctuaries, sustainable timber, and sacred groves', correct: true },
      { text: 'Forest loss only affects birds and has no impact on human climate', correct: false }
    ],
    explanation: 'Deforestation destroys animal food and shelter, leads to soil erosion, and disrupts regional water cycles. We address it through afforestation, community-protected sacred groves, and creating National Parks.'
  },
  {
    id: 7,
    page: 32,
    title: 'Q7. Flowchart Classification Puzzle',
    question: 'Analyse the flowchart: Plant ➔ Does it have leaves? (Yes) ➔ Does it have reticulate venation? If YES: [A], If NO: [B]. What are examples of A and B?',
    image: leafVenationImg,
    imageLabel: 'Macrophotograph: Net-like Reticulate Venation with Prominent Midrib and Branchlets',
    options: [
      { text: 'A = Monocot (Grass / Wheat), B = Dicot (Mango / Hibiscus)', correct: false },
      { text: 'A = Dicotyledon with taproot (e.g., Hibiscus, Rose, Mustard), B = Monocotyledon with fibrous roots (e.g., Grass, Banana, Maize)', correct: true },
      { text: 'A = Mushroom, B = Fern', correct: false }
    ],
    explanation: 'Leaves with reticulate venation belong to Dicots (Group A, like hibiscus or mango). Leaves without reticulate venation (i.e. parallel venation) belong to Monocots (Group B, like grass or maize).'
  },
  {
    id: 8,
    page: 32,
    title: 'Q8. Classifying Gudhal (Hibiscus) as a Shrub',
    question: 'Raj argues that “Gudhal (hibiscus) plant is a shrub.” What questions can Sanjay ask to scientifically verify this classification?',
    image: hibiscusShrubImg,
    imageLabel: 'Shrub Architecture: Medium-Height Bush with Multiple Hard Woody Stems from Soil Base',
    options: [
      { text: '“Does it branch near the base of the stem? Is the stem hard and woody but not very thick like a tree trunk?”', correct: true },
      { text: '“Does it produce red flowers during holidays?”', correct: false },
      { text: '“Can it grow inside a cup of water?”', correct: false }
    ],
    explanation: 'According to Table 2.3 criteria, shrubs are medium-height plants with hard, thin woody stems that branch very close to the ground, exactly matching the hibiscus plant.'
  },
  {
    id: 9,
    page: 33,
    title: 'Q9. Group A vs Group B Table Synthesis',
    question: 'Group A: Dicot Seed, Taproot. Group B: Monocot Seed, Fibrous root. What additional similarities do plants in each group share?',
    image: rootSystemsImg,
    imageLabel: 'Root Architecture Comparison: Central Primary Taproot vs Spreading Fibrous Cluster',
    options: [
      { text: 'Group A leaves consistently have Reticulate venation; Group B leaves consistently have Parallel venation', correct: true },
      { text: 'Group A plants have no flowers while Group B plants always have thorns', correct: false },
      { text: 'Group A plants only grow in water while Group B plants grow in deserts', correct: false }
    ],
    explanation: 'This reinforces the grand botanical correlation: Dicotyledons have taproots and reticulate leaf venation; Monocotyledons have fibrous roots and parallel leaf venation.'
  },
  {
    id: 10,
    page: 33,
    title: 'Q10. Duck Webbed Feet Locomotion Adaptation',
    question: 'Observe the feet of a duck compared to a pigeon. What difference do you notice, and what activity can the duck perform with this adaptation?',
    image: duckWebbedFeetImg,
    imageLabel: 'Locomotion Adaptation: Duck Webbed Swimming Foot in Water vs Pigeon Perching Foot',
    options: [
      { text: 'Ducks have skin webs connecting their toes, functioning like paddles to push water efficiently while swimming; pigeons have separated perching toes', correct: true },
      { text: 'Ducks have sharp claws for digging deep tunnels into underground caves', correct: false },
      { text: 'Ducks have hooves for galloping across grasslands', correct: false }
    ],
    explanation: 'The webbing of skin between duck toes creates an increased surface area that acts as an efficient paddle, allowing ducks to swim and maneuver in aquatic habitats.'
  }
];

const VENN_ANIMALS = [
  { id: 'horse', name: 'Horse', icon: '🐎', correctArea: 'B' },
  { id: 'dolphin', name: 'Dolphin', icon: '🐬', correctArea: 'A' },
  { id: 'frog', name: 'Frog', icon: '🐸', correctArea: 'C' },
  { id: 'sheep', name: 'Sheep', icon: '🐑', correctArea: 'B' },
  { id: 'crocodile', name: 'Crocodile', icon: '🐊', correctArea: 'C' },
  { id: 'squirrel', name: 'Squirrel', icon: '🐿️', correctArea: 'B' },
  { id: 'whale', name: 'Whale', icon: '🐋', correctArea: 'A' },
  { id: 'earthworm', name: 'Earthworm', icon: '🪱', correctArea: 'B' },
  { id: 'pigeon', name: 'Pigeon', icon: '🐦', correctArea: 'B' },
  { id: 'tortoise', name: 'Tortoise', icon: '🐢', correctArea: 'C' }
];

const INDIAN_BIOLOGISTS = [
  { name: 'Dr. Divya Mudappa', work: 'Pioneered tropical rainforest restoration and wildlife corridor connectivity in the Anamalai Hills of the Western Ghats.' },
  { name: 'Usha Lachungpa', work: 'Eminent field naturalist and wildlife conservation officer in Sikkim, documenting Himalayan alpine biodiversity and high-altitude avifauna.' },
  { name: 'Dr. Vidya Athreya', work: 'World-renowned leopard ecologist who revolutionized human-carnivore coexistence research in rural agricultural landscapes of India.' },
  { name: 'Dr. Uma Ramakrishnan', work: 'Molecular ecologist at NCBS using genetics to track tiger population connectivity and prevent inbreeding in isolated reserves.' }
];

export default function TextbookExercisesLab({ onBackToDashboard }) {
  const [viewMode, setViewMode] = useState('exercises'); // 'exercises' | 'glossary' | 'biologists'
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState('all');
  const [glossaryPage, setGlossaryPage] = useState(0);
  const [activeSpecimenTab, setActiveSpecimenTab] = useState('wheat'); // 'wheat' | 'bean' (for Q1 interactive inspection)

  useEffect(() => {
    setGlossaryPage(0);
  }, [glossaryCategory, searchTerm]);

  // Venn Diagram interactive state for Q2
  const [vennPlacements, setVennPlacements] = useState({});
  const [vennChecked, setVennChecked] = useState(false);

  // 10-Second Scientific Simulation State (activates upon correct answer)
  const [simActiveForQ, setSimActiveForQ] = useState(null);

  useEffect(() => {
    setSimActiveForQ(null);
  }, [activeQuestion]);

  const currentQ = EXERCISES[activeQuestion];
  const answered = userAnswers[activeQuestion] !== undefined;
  const isCorrect = answered && userAnswers[activeQuestion] === currentQ.options.findIndex(o => o.correct);

  const handleSelectOption = (idx) => {
    setUserAnswers(prev => ({ ...prev, [activeQuestion]: idx }));
    if (currentQ.options[idx].correct) {
      habitatAudio.playMatchSuccess();
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
      setSimActiveForQ(currentQ.id); // Trigger 10-second realistic simulation!
    } else {
      habitatAudio.playMatchError();
      setSimActiveForQ(null);
    }
  };

  const handlePlaceVennAnimal = (animalId, area) => {
    habitatAudio.playSelect();
    setVennPlacements(prev => {
      if (prev[animalId] === area) {
        const next = { ...prev };
        delete next[animalId];
        return next;
      }
      return { ...prev, [animalId]: area };
    });
    setVennChecked(false);
  };

  const handleCheckVenn = () => {
    setVennChecked(true);
    const correctCount = VENN_ANIMALS.filter(a => vennPlacements[a.id] === a.correctArea).length;
    if (correctCount === VENN_ANIMALS.length) {
      habitatAudio.playMatchSuccess();
      setUserAnswers(prev => ({ ...prev, [activeQuestion]: 0 }));
      confetti({ particleCount: 90, spread: 85, origin: { y: 0.6 } });
      setSimActiveForQ(2); // Trigger 10-second living habitat simulation!
    } else {
      habitatAudio.playMatchError();
    }
  };

  const handleResetVenn = () => {
    habitatAudio.playSelect();
    setVennPlacements({});
    setVennChecked(false);
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[activeQuestion];
      return next;
    });
  };

  const calculateScore = () => {
    return EXERCISES.reduce((score, q, idx) => {
      const correctIdx = q.options.findIndex(o => o.correct);
      return score + (userAnswers[idx] === correctIdx ? 1 : 0);
    }, 0);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [viewMode, activeQuestion]);

  const handleReadAloud = (text) => {
    if (isSpeaking) {
      stopNarration();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakNaturalIndianMale({
      text,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const filteredKeywords = KEYWORDS.filter(k => {
    const matchesCat = glossaryCategory === 'all' || k.category === glossaryCategory;
    const matchesSearch = k.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          k.def.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          k.catLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const GLOSSARY_PER_PAGE = 6;
  const totalGlossaryPages = Math.max(1, Math.ceil(filteredKeywords.length / GLOSSARY_PER_PAGE));
  const currentGlossaryPage = Math.min(glossaryPage, totalGlossaryPages - 1);
  const visibleKeywords = filteredKeywords.slice(
    currentGlossaryPage * GLOSSARY_PER_PAGE,
    (currentGlossaryPage + 1) * GLOSSARY_PER_PAGE
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        boxSizing: 'border-box',
        overflow: 'hidden', // ZERO SCROLL RULE
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        color: '#F8FAFC'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        /* Text Justification & Font Size Constraint (16px to 24px) */
        p, .bio-question-text, .bio-explanation-text, .bio-summary-text {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto;
        }

        .bio-nav-btn {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #F1F5F9;
          border: 1.8px solid rgba(255, 255, 255, 0.25);
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
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: rgba(245, 158, 11, 0.25);
          color: #FBBF24;
          border-color: #F59E0B;
          transform: translateY(-1px);
        }
        .bio-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.8px solid #FDE68A;
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
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.42);
        }
        .bio-cta-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          border-color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(217, 119, 6, 0.55);
        }
        .bio-cta-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .bio-parchment-card {
          background: rgba(15, 23, 42, 0.50);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1.8px solid rgba(245, 158, 11, 0.4);
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          color: #F8FAFC;
          transition: all 0.22s ease;
        }
        .bio-parchment-card:hover {
          border-color: rgba(245, 158, 11, 0.65);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45), 0 0 18px rgba(245, 158, 11, 0.25);
        }

        @keyframes botanicalCardEntrance {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .bio-glossary-card {
          background: linear-gradient(145deg, #FFFFFF 0%, #F5FAF7 100%);
          border: 1.8px solid #1B4D3E;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 14px rgba(20, 69, 47, 0.08);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .bio-glossary-card:hover {
          transform: translateY(-3px);
          border-color: #10B981 !important;
          box-shadow: 0 10px 24px rgba(20, 69, 47, 0.18), 0 0 0 1px #10B981 !important;
        }

        .bio-cat-pill {
          background: rgba(250, 248, 242, 0.55); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1.5px solid #2D6A4F;
          border-radius: 8px;
          padding: 3px 10px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          color: #14452F;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .bio-cat-pill:hover {
          background: #EAF7EE;
          border-color: #10B981;
        }
        .bio-cat-pill.active {
          background: #14452F;
          color: #FFFFFF;
          border-color: #10B981;
          box-shadow: 0 2px 6px rgba(20, 69, 47, 0.25);
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. COMPACT TOP BAR WITH SLOGAN PAGE DESIGN                   */}
      {/* ============================================================ */}
      <header
        style={{
          width: '100%',
          maxWidth: '1380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          marginBottom: '6px',
          zIndex: 20
        }}
      >
        {/* LEFT: BACK BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBackToDashboard}
            aria-label="Back to Previous Activity"
          >
            <ArrowLeft size={16} strokeWidth={2.4} />
            <span>Dashboard</span>
          </button>

          <span
            style={{
              background: '#14452F',
              color: '#34D399',
              padding: '3px 12px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 900,
              fontFamily: "'Outfit', sans-serif",
              border: '1.8px solid #FDE68A',
              boxShadow: '0 2px 6px rgba(20, 69, 47, 0.2)'
            }}
          >
            EVALUATION · PAGES 29–34
          </span>
        </div>

        {/* CENTER: TITLE FLANKED BY VINES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TitleVineBranch side="left" />
          <h1
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 900,
              fontSize: '21px',
              color: '#F8FAFC',
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.01em'
            }}
          >
            Textbook Mastery &amp; Chapter 2 Evaluation
          </h1>
          <TitleVineBranch side="right" />
        </div>

        {/* RIGHT: MODE TOGGLES & LISTEN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.50)', padding: '2px', borderRadius: '10px', border: '1.5px solid rgba(212, 175, 55, 0.6)' }}>
            <button
              onClick={() => setViewMode('exercises')}
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'exercises' ? '#14452F' : 'transparent',
                color: viewMode === 'exercises' ? '#ffffff' : '#14452F'
              }}
            >
              ✍️ Q1–Q10
            </button>
            <button
              onClick={() => setViewMode('glossary')}
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'glossary' ? '#14452F' : 'transparent',
                color: viewMode === 'glossary' ? '#ffffff' : '#14452F'
              }}
            >
              📖 Glossary (18)
            </button>
            <button
              onClick={() => setViewMode('biologists')}
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'biologists' ? '#14452F' : 'transparent',
                color: viewMode === 'biologists' ? '#ffffff' : '#14452F'
              }}
            >
              👩‍🔬 Biologists
            </button>
          </div>

          <button
            onClick={() => handleReadAloud(
              viewMode === 'exercises'
                ? `Question ${currentQ.id}. ${currentQ.title}. ${currentQ.question}`
                : "Chapter 2 keywords. Review essential terms from biodiversity and adaptation to cotyledons, taproots, and sacred groves."
            )}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              background: isSpeaking ? '#FEE2E2' : 'rgba(20, 69, 47, 0.92)',
              border: `1.5px solid ${isSpeaking ? '#EF4444' : '#2D6A4F'}`,
              borderRadius: '8px',
              color: isSpeaking ? '#991B1B' : '#D1FAE5',
              fontWeight: 800,
              fontSize: '16px',
              fontFamily: "'Outfit', sans-serif",
              cursor: 'pointer'
            }}
          >
            {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN ACTIVE WORKSPACE (ZERO SCROLL)                       */}
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
        {/* MODE 1: EXERCISES 1 TO 10                                  */}
        {/* ========================================================== */}
        {viewMode === 'exercises' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', overflow: 'hidden' }}>
            {/* 10-QUESTION STEPPER PILLS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: '6px',
                marginBottom: '6px',
                flexShrink: 0
              }}
            >
              {EXERCISES.map((q, idx) => {
                const isCurrent = activeQuestion === idx;
                const isAnswered = userAnswers[idx] !== undefined;
                const correct = isAnswered && userAnswers[idx] === q.options.findIndex(o => o.correct);

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestion(idx)}
                    style={{
                      padding: '5px 6px',
                      borderRadius: '8px',
                      border: isCurrent ? '2px solid #10B981' : isAnswered ? (correct ? '1.8px solid #10B981' : '1.8px solid #EF4444') : '1.5px solid #2D6A4F',
                      background: isCurrent ? '#14452F' : isAnswered ? (correct ? '#EAF7EE' : '#FEE2E2') : '#FFFFFF',
                      color: isCurrent ? '#FFFFFF' : isAnswered ? (correct ? '#065F46' : '#991B1B') : '#14452F',
                      fontSize: '16px',
                      fontWeight: 900,
                      fontFamily: "'Outfit', sans-serif",
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      boxShadow: isCurrent ? '0 2px 8px rgba(20, 69, 47, 0.35)' : 'none',
                      transition: 'all 0.12s ease'
                    }}
                  >
                    <span>Q{q.id}</span>
                    {isAnswered && (correct ? <Check size={15} color={isCurrent ? '#34D399' : '#065F46'} /> : <span>✕</span>)}
                  </button>
                );
              })}
            </div>

            {/* SPLIT STAGE GRID: 70% IMAGE ALLOCATION & 30% QUESTIONS & ANSWERS */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 3fr)',
                gap: '12px',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}
            >
              {/* ====================================================== */}
              {/* LEFT CARD (70%): LARGE VISUAL & SPECIMEN ALLOCATION    */}
              {/* ====================================================== */}
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

                <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' }}>
                  {/* VISUAL HEADER BAR */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: '#14452F', color: '#34D399', fontSize: '16px', fontWeight: 900, padding: '2px 10px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif" }}>
                        EXERCISE {currentQ.id} OF 10
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#F8FAFC', fontFamily: "'Outfit', sans-serif" }}>
                        PAGE {currentQ.page}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: '#EAF7EE', color: '#064E3B', padding: '2px 12px', borderRadius: '10px', fontSize: '16px', fontWeight: 800, border: '1px solid #10B981' }}>
                        📷 {currentQ.imageLabel}
                      </span>
                      {isCorrect && simActiveForQ !== currentQ.id && (
                        <button
                          type="button"
                          onClick={() => setSimActiveForQ(currentQ.id)}
                          style={{
                            background: 'linear-gradient(135deg, #14452F 0%, #0F3323 100%)',
                            border: '1.8px solid #FDE68A',
                            borderRadius: '8px',
                            padding: '3px 12px',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: 900,
                            fontFamily: "'Outfit', sans-serif",
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            flexShrink: 0
                          }}
                        >
                          <RotateCcw size={15} color="#34D399" />
                          <span>Replay Simulation</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 70% EXPANDED VISUAL: PHOTOREALISTIC IMAGE OR ACTIVE 10-SECOND SIMULATION */}
                  {simActiveForQ === currentQ.id ? (
                    <div
                      style={{
                        flex: 1,
                        minHeight: 0,
                        width: '100%',
                        margin: '2px 0 6px 0',
                        position: 'relative'
                      }}
                    >
                      <QuestionScienceSimulations
                        questionId={currentQ.id}
                        onComplete={() => setSimActiveForQ(null)}
                        onSkip={() => setSimActiveForQ(null)}
                      />
                    </div>
                  ) : (
                    currentQ.image && (
                      <div
                        style={{
                          flex: 1,
                          minHeight: 0,
                          width: '100%',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #D4AF37',
                          background: '#F8FAFC',
                          position: 'relative',
                          boxShadow: '0 4px 16px rgba(20, 69, 47, 0.1)',
                          margin: '2px 0 6px 0'
                        }}
                      >
                        <img
                          src={currentQ.image}
                          alt={currentQ.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </div>
                    )
                  )}

                  {/* INTERACTIVE SPECIMEN TOGGLE INSPECTOR FOR Q1 */}
                  {currentQ.hasSpecimenToggle ? (
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(212, 175, 55, 0.6)',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: '#F8FAFC' }}>
                          🔬 Interactive Comparative Specimen Station:
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setActiveSpecimenTab('wheat')}
                            style={{
                              padding: '3px 12px',
                              borderRadius: '8px',
                              background: activeSpecimenTab === 'wheat' ? '#14452F' : '#EAF7EE',
                              color: activeSpecimenTab === 'wheat' ? '#FFFFFF' : '#14452F',
                              fontSize: '16px',
                              fontWeight: 900,
                              fontFamily: "'Outfit', sans-serif",
                              border: activeSpecimenTab === 'wheat' ? '1.5px solid #10B981' : '1px solid #2D6A4F',
                              cursor: 'pointer'
                            }}
                          >
                            🌾 Specimen A: Wheat Plant
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSpecimenTab('bean')}
                            style={{
                              padding: '3px 12px',
                              borderRadius: '8px',
                              background: activeSpecimenTab === 'bean' ? '#14452F' : '#EAF7EE',
                              color: activeSpecimenTab === 'bean' ? '#FFFFFF' : '#14452F',
                              fontSize: '16px',
                              fontWeight: 900,
                              fontFamily: "'Outfit', sans-serif",
                              border: activeSpecimenTab === 'bean' ? '1.5px solid #10B981' : '1px solid #2D6A4F',
                              cursor: 'pointer'
                            }}
                          >
                            🫘 Specimen B: Kidney Bean Plant
                          </button>
                        </div>
                      </div>

                      <div style={{ fontSize: '16px', lineHeight: 1.3, color: '#064E3B' }}>
                        {activeSpecimenTab === 'wheat' ? (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🌱 <strong>Seed:</strong> 1 Cotyledon (Monocot)
                            </span>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🍃 <strong>Leaf:</strong> Parallel Venation
                            </span>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🌿 <strong>Root:</strong> Fibrous Root Cluster
                            </span>
                          </div>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🌱 <strong>Seed:</strong> 2 Cotyledons (Dicot)
                            </span>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🍃 <strong>Leaf:</strong> Net Reticulate Venation
                            </span>
                            <span style={{ background: '#F0FDF4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #86EFAC' }}>
                              🌿 <strong>Root:</strong> Central Taproot System
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(212, 175, 55, 0.6)', borderRadius: '10px', padding: '6px 12px', flexShrink: 0 }}>
                      <span style={{ fontSize: '16px', color: '#1B4D3E', fontWeight: 700 }}>
                        🔍 <strong>Inquiry Focus:</strong> {currentQ.title} · Observe the anatomical details shown in the 70% viewport above.
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {/* ====================================================== */}
              {/* RIGHT CARD (30%): QUESTIONS & ANSWERS ALLOCATION       */}
              {/* ====================================================== */}
              <section
                className="bio-parchment-card"
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <CardCornerLeaves position="top-right" />

                {/* Q2 SPECIAL: INTERACTIVE VENN DIAGRAM */}
                {currentQ.id === 2 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, justifyContent: 'space-between' }}>
                    <div>
                      <h2 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                        {currentQ.title}
                      </h2>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#2D5A43', fontWeight: 600, lineHeight: 1.25 }}>
                        Classify 10 animals into Aquatic (A), Terrestrial (B), or Both (C):
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <button
                        type="button"
                        onClick={handleResetVenn}
                        style={{ background: 'rgba(15, 23, 42, 0.50)', border: '1.5px solid rgba(212, 175, 55, 0.6)', borderRadius: '6px', padding: '2px 8px', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={handleCheckVenn}
                        style={{ background: '#14452F', color: '#FFFFFF', border: '1.8px solid #FDE68A', borderRadius: '6px', padding: '2px 10px', fontSize: '16px', fontWeight: 900, cursor: 'pointer' }}
                      >
                        Check Placements
                      </button>
                    </div>

                    {/* VENN ZONES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minHeight: 0 }}>
                      {[
                        { id: 'A', name: 'Area A: Aquatic', color: '#0284C7', bg: '#F0F9FF' },
                        { id: 'B', name: 'Area B: Terrestrial', color: '#16A34A', bg: '#F0FDF4' },
                        { id: 'C', name: 'Area C: Both / Amphibious', color: '#D97706', bg: '#FFFBEB' }
                      ].map(zone => (
                        <div
                          key={zone.id}
                          style={{
                            background: zone.bg,
                            border: `1.5px solid ${zone.color}`,
                            borderRadius: '8px',
                            padding: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                          }}
                        >
                          <div style={{ fontSize: '16px', fontWeight: 900, color: zone.color, borderBottom: `1px solid ${zone.color}`, paddingBottom: '2px', marginBottom: '2px' }}>
                            {zone.name}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', flex: 1, overflowY: 'auto' }}>
                            {VENN_ANIMALS.filter(a => vennPlacements[a.id] === zone.id).map(animal => (
                              <span
                                key={animal.id}
                                onClick={() => handlePlaceVennAnimal(animal.id, zone.id)}
                                style={{
                                  background: '#FFFFFF',
                                  border: '1px solid #14452F',
                                  borderRadius: '6px',
                                  padding: '1px 6px',
                                  fontSize: '16px',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                {animal.icon} {animal.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ANIMAL POOL */}
                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(212, 175, 55, 0.6)', borderRadius: '8px', padding: '4px', marginTop: '4px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#F8FAFC', marginBottom: '2px' }}>
                        Tap animal to place:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        {VENN_ANIMALS.filter(a => !vennPlacements[a.id]).map(animal => (
                          <button
                            key={animal.id}
                            type="button"
                            onClick={() => handlePlaceVennAnimal(animal.id, animal.correctArea)}
                            style={{
                              background: 'rgba(15, 23, 42, 0.50)',
                              border: '1px solid #2D6A4F',
                              borderRadius: '5px',
                              padding: '2px 6px',
                              fontSize: '16px',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            {animal.icon} {animal.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 30% QUESTION & ANSWER OPTIONS LIST */
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, justifyContent: 'space-between' }}>
                    {/* QUESTION HEADER & PROMPT */}
                    <div style={{ flexShrink: 0 }}>
                      <h2 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: 900, color: '#F8FAFC', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
                        {currentQ.title}
                      </h2>
                      <p style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#2D5A43', lineHeight: 1.25, fontWeight: 700 }}>
                        {currentQ.question}
                      </p>
                    </div>

                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', marginBottom: '3px', flexShrink: 0 }}>
                      Select the accurate conclusion:
                    </div>

                    {/* OPTIONS (A, B, C) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: 0 }}>
                      {currentQ.options.map((opt, idx) => {
                        const isSelected = userAnswers[activeQuestion] === idx;
                        const isOptCorrect = opt.correct;

                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            style={{
                              background: isSelected ? (isOptCorrect ? '#EAF7EE' : '#FEE2E2') : '#FFFFFF',
                              border: isSelected ? (isOptCorrect ? '2px solid #10B981' : '2px solid #EF4444') : '1.5px solid #2D6A4F',
                              borderRadius: '8px',
                              padding: '5px 8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              boxShadow: isSelected ? '0 3px 8px rgba(0,0,0,0.06)' : '0 1px 2px rgba(0,0,0,0.03)',
                              transition: 'all 0.12s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: isSelected ? (isOptCorrect ? '#10B981' : '#EF4444') : '#14452F',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '16px',
                                  fontWeight: 900,
                                  fontFamily: "'Outfit', sans-serif",
                                  flexShrink: 0
                                }}
                              >
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span style={{ fontSize: '16px', fontWeight: isSelected ? 800 : 700, color: '#1F2937', lineHeight: 1.2 }}>
                                {opt.text}
                              </span>
                            </div>

                            {isSelected && (
                              <span style={{ fontSize: '16px', fontWeight: 900, color: isOptCorrect ? '#10B981' : '#EF4444', flexShrink: 0 }}>
                                {isOptCorrect ? '✓' : '✕'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* SCIENTIFIC EXPLANATION ALERT WHEN ANSWERED */}
                    {answered && (
                      <div
                        style={{
                          background: isCorrect ? '#EAF7EE' : '#FFFBEB',
                          borderLeft: `3px solid ${isCorrect ? '#10B981' : '#F59E0B'}`,
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '16px',
                          lineHeight: 1.2,
                          color: '#064E3B',
                          marginTop: '4px',
                          flexShrink: 0
                        }}
                      >
                        <strong>{isCorrect ? '💡 Principle:' : '🔍 Clue:'}</strong>{' '}
                        {currentQ.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* BOTTOM WORKBENCH BAR */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1.5px solid #14452F' }}>
                  <button
                    type="button"
                    className="bio-nav-btn"
                    onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
                    disabled={activeQuestion === 0}
                    style={{ padding: '4px 10px' }}
                  >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                    <span>Previous</span>
                  </button>

                  <div
                    style={{
                      background: '#14452F',
                      color: '#FCD34D',
                      borderRadius: '10px',
                      padding: '3px 10px',
                      fontSize: '16px',
                      fontWeight: 900,
                      fontFamily: "'Outfit', sans-serif",
                      border: '1.5px solid #F59E0B'
                    }}
                  >
                    {calculateScore()} / 10 Mastered
                  </div>

                  <button
                    type="button"
                    className="bio-cta-btn"
                    style={{ padding: '5px 12px' }}
                    onClick={() => {
                      if (activeQuestion < EXERCISES.length - 1) {
                        setActiveQuestion(prev => prev + 1);
                      } else {
                        confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
                      }
                    }}
                  >
                    <span>{activeQuestion < EXERCISES.length - 1 ? 'Next' : 'Finish'}</span>
                    <ChevronRight size={17} strokeWidth={2.5} />
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* MODE 2: GLOSSARY (18 KEYWORDS - ZERO SCROLL PAGINATED)     */}
        {/* ========================================================== */}
        {viewMode === 'glossary' && (
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

            {/* HEADER: TITLE + CATEGORY PILLS + SEARCH */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexShrink: 0, gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>📖</span>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.15 }}>
                    Chapter 2 Essential Scientific Glossary
                  </div>
                  <div style={{ fontSize: '16px', color: '#2D6A4F', fontWeight: 700 }}>
                    Master key botanical terms, root architectures &amp; ecological adaptations
                  </div>
                </div>
              </div>

              {/* CATEGORY FILTER PILLS */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All (18)' },
                  { id: 'plants', label: '🌿 Plants (3)' },
                  { id: 'seeds', label: '🫘 Seeds (3)' },
                  { id: 'roots', label: '🍃 Leaves & Roots (5)' },
                  { id: 'ecology', label: '🌍 Ecology (7)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`bio-cat-pill ${glossaryCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      habitatAudio.playSelect();
                      setGlossaryCategory(cat.id);
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* SEARCH BAR */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(212, 175, 55, 0.6)',
                    borderRadius: '8px',
                    padding: '5px 12px 5px 32px',
                    fontSize: '16px',
                    fontWeight: 700,
                    outline: 'none',
                    color: '#F8FAFC',
                    width: '180px',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                />
                <Search size={16} style={{ position: 'absolute', left: '10px', color: '#1B4D3E', pointerEvents: 'none' }} />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666',
                      fontSize: '16px',
                      fontWeight: 800
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 3x2 CARD GRID (EXACTLY 6 CARDS PER PAGE - ZERO SCROLL) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '10px',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {visibleKeywords.map((k, i) => (
                <div
                  key={k.term}
                  className="bio-glossary-card"
                  style={{
                    animation: `botanicalCardEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45}ms both`
                  }}
                >
                  {/* TOP ROW: ICON + TERM + CATEGORY TAG */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ fontSize: '22px' }}>{k.icon}</span>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                        {k.term}
                      </span>
                    </div>
                    <span
                      style={{
                        background: '#EAF7EE',
                        color: '#065F46',
                        border: '1px solid #10B981',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {k.catLabel}
                    </span>
                  </div>

                  {/* DEFINITION */}
                  <div style={{ fontSize: '16px', color: '#1F2937', lineHeight: 1.35, fontWeight: 600, padding: '2px 0' }}>
                    {k.def}
                  </div>

                  {/* BOTTOM ACTION ROW */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px solid rgba(45, 106, 79, 0.15)' }}>
                    <button
                      type="button"
                      onClick={() => handleReadAloud(`${k.term}. ${k.def}`)}
                      style={{
                        background: '#EAF7EE',
                        border: '1px solid #10B981',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#065F46',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      <Volume2 size={15} />
                      <span>Pronounce</span>
                    </button>
                    <span style={{ fontSize: '16px', color: '#16A34A', fontWeight: 800 }}>
                      ✓ Core
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM PAGINATION TOOLBAR (ZERO SCROLL) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px',
                paddingTop: '6px',
                borderTop: '1.5px solid rgba(25, 71, 32, 0.2)',
                flexShrink: 0
              }}
            >
              <div style={{ fontSize: '16px', color: '#F8FAFC', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                Showing {filteredKeywords.length > 0 ? currentGlossaryPage * GLOSSARY_PER_PAGE + 1 : 0}–{Math.min((currentGlossaryPage + 1) * GLOSSARY_PER_PAGE, filteredKeywords.length)} of {filteredKeywords.length} terms
              </div>

              {/* PAGE NUMBERS */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button
                  type="button"
                  disabled={currentGlossaryPage === 0}
                  onClick={() => {
                    habitatAudio.playSelect();
                    setGlossaryPage(prev => Math.max(0, prev - 1));
                  }}
                  style={{
                    background: currentGlossaryPage === 0 ? '#E5E7EB' : '#14452F',
                    color: currentGlossaryPage === 0 ? '#9CA3AF' : '#FFFFFF',
                    border: '1.5px solid #2D6A4F',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: currentGlossaryPage === 0 ? 'not-allowed' : 'pointer',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  ◀ Prev
                </button>

                {Array.from({ length: totalGlossaryPages }).map((_, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      habitatAudio.playSelect();
                      setGlossaryPage(pIdx);
                    }}
                    style={{
                      background: currentGlossaryPage === pIdx ? '#14452F' : '#FFFFFF',
                      color: currentGlossaryPage === pIdx ? '#FFFFFF' : '#14452F',
                      border: `1.5px solid ${currentGlossaryPage === pIdx ? '#10B981' : '#2D6A4F'}`,
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    {pIdx + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentGlossaryPage >= totalGlossaryPages - 1}
                  onClick={() => {
                    habitatAudio.playSelect();
                    setGlossaryPage(prev => Math.min(totalGlossaryPages - 1, prev + 1));
                  }}
                  style={{
                    background: currentGlossaryPage >= totalGlossaryPages - 1 ? '#E5E7EB' : '#14452F',
                    color: currentGlossaryPage >= totalGlossaryPages - 1 ? '#9CA3AF' : '#FFFFFF',
                    border: '1.5px solid #2D6A4F',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: currentGlossaryPage >= totalGlossaryPages - 1 ? 'not-allowed' : 'pointer',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  Next ▶
                </button>
              </div>

              <div style={{ fontSize: '16px', color: '#2D6A4F', fontWeight: 800, fontStyle: 'italic' }}>
                💡 Click "Pronounce" to hear natural voice reading
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* MODE 3: INDIAN BIOLOGISTS (ZERO SCROLL 2x2 GRID)           */}
        {/* ========================================================== */}
        {viewMode === 'biologists' && (
          <div
            className="bio-parchment-card"
            style={{
              flex: 1,
              minHeight: 0,
              padding: '12px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <CardCornerLeaves position="top-left" />
            <CardCornerLeaves position="top-right" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>👩‍🔬</span>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.15 }}>
                    Eminent Contemporary Indian Biologists &amp; Field Ecologists
                  </div>
                  <div style={{ fontSize: '16px', color: '#2D6A4F', fontWeight: 700 }}>
                    Pioneering women scientists advancing biodiversity research across India's ecosystems
                  </div>
                </div>
              </div>
              <span
                style={{
                  background: '#EAF7EE',
                  color: '#065F46',
                  border: '1.8px solid #FDE68A',
                  padding: '4px 12px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif"
                }}
              >
                🔬 4 National Icons of Ecology
              </span>
            </div>

            {/* 2x2 BALANCED GRID */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '10px',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {INDIAN_BIOLOGISTS.map((b, i) => (
                <div
                  key={i}
                  className="bio-glossary-card"
                  style={{
                    animation: `botanicalCardEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '19px', fontWeight: 900, color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
                      🧑‍🔬 {b.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleReadAloud(`${b.name}. ${b.work}`)}
                      style={{
                        background: '#EAF7EE',
                        border: '1px solid #10B981',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#065F46',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      <Volume2 size={15} />
                      <span>Listen</span>
                    </button>
                  </div>

                  <div style={{ fontSize: '16px', color: '#1F2937', lineHeight: 1.35, fontWeight: 600 }}>
                    {b.work}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid rgba(45, 106, 79, 0.15)' }}>
                    <span style={{ background: 'rgba(15, 23, 42, 0.50)', border: '1px solid #2D6A4F', padding: '1px 8px', borderRadius: '6px', fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                      🇮🇳 National Conservation Impact
                    </span>
                    <span style={{ fontSize: '16px', color: '#16A34A', fontWeight: 800 }}>
                      ✓ Reference
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* 3. BOTTOM FOOTER BAR (SLOGAN PAGE EXACT MATCH)               */}
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
          aria-label="Back to Summary"
        >
          ← Back to Chapter Summary
        </button>

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
          ✓ Complete 10-Question Learning Assessment
        </div>

        <button
          type="button"
          className="bio-cta-btn"
          onClick={() => {
            confetti({ particleCount: 220, spread: 100, origin: { y: 0.55 } });
            habitatAudio.playComplete();
          }}
          aria-label="Celebrate Mastery"
        >
          <Award size={18} />
          <span>Celebrate Mastery!</span>
        </button>
      </footer>
    </div>
  );
}
