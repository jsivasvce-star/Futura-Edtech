import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle, BookOpen, Volume2, VolumeX, Sparkles, 
  Award, ArrowRight, RefreshCw, Footprints, Leaf, Check, Heart, ShieldCheck,
  ChevronDown, ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

import sanskritSlogan from '../../../../assets/sanskrit_slogan.png';
import Chapter2CoverPage from './Chapter2CoverPage';
import Chapter2SloganPage from './Chapter2SloganPage';
import IntroStoryteller from './IntroStoryteller';
import activity21TransitionVideo from '../../../../assets/activity21_transition.mp4';
import activity24TransitionVideo from '../../../../assets/activity24_transition.mp4';
import activity24ObservationTransitionVideo from '../../../../assets/activity24_observation_transition.mp4';
import activity25LeafObservationTransitionVideo from '../../../../assets/activity25_leaf_observation_transition.mp4';
import activity26RootObservationTransitionVideo from '../../../../assets/activity26_root_observation_transition.mp4';
import activity27PlantObservationTransitionVideo from '../../../../assets/activity27_plant_observation_transition.mp4';
import coverBgImage from '../../../../assets/cover_page_ch2.png';
import coverBgVideo from '../../../../assets/in_this_video_just_add_those_b (1).mp4';
import natureGreeneryBg from '../../../../assets/nature_greenery_bg.jpg';

// 14 Distinct 8K Realistic Photographic Backgrounds (Zero Duplicates Across Activities)
import ch2GardenPanorama from './DiversityInTheLivingWorldNew/images/ch2_garden_panorama.jpg';
import ch2AerialHabitat from './DiversityInTheLivingWorldNew/images/ch2_aerial_habitat.jpg';
import ch2GardenBiodiversity from './DiversityInTheLivingWorldNew/images/ch2_garden_biodiversity.jpg';
import ch2LivingWorldDiversity from './DiversityInTheLivingWorldNew/images/ch2_living_world_diversity_8k.jpg';
import ch2PlantDetective from './DiversityInTheLivingWorldNew/images/ch2_plant_detective.jpg';
import ch2LeafVenation from './DiversityInTheLivingWorldNew/images/ch2_leaf_venation.jpg';
import ch2RootSystems from './DiversityInTheLivingWorldNew/images/ch2_root_systems.jpg';
import ch2HerbsHabitat from './DiversityInTheLivingWorldNew/images/ch2_herbs_habitat_8k.jpg';
import ch2SeedDissection from './DiversityInTheLivingWorldNew/images/ch2_seed_dissection.jpg';
import ch2HabitatsClassification from './DiversityInTheLivingWorldNew/images/ch2_habitats_classification_8k.jpg';
import ch2AnimalLocomotion from './DiversityInTheLivingWorldNew/images/ch2_animal_locomotion.jpg';
import ch2ExtremeAdaptations from './DiversityInTheLivingWorldNew/images/ch2_extreme_adaptations.jpg';
import ch2SilentValley from './DiversityInTheLivingWorldNew/images/ch2_silent_valley.jpg';
import ch2SacredGrove from './DiversityInTheLivingWorldNew/images/ch2_sacred_grove.jpg';
import cinematicLivingNatureImage from './DiversityInTheLivingWorldNew/images/ch2_cinematic_living_nature.jpg';

// Unified Nature Greenery Background (Living Ecosystem on Slogan Page)
export const getActiveBackground = (step = 1, section1SubTab = 'slogan') => {
  if (step === 1 && section1SubTab === 'slogan') {
    return cinematicLivingNatureImage;
  }
  return natureGreeneryBg;
};

// Unified Theme & Font Colors (Identical to Slogan Page across ALL pages & activities)
export const getActiveTheme = () => ({
  titleColor: '#FBBF24',
  accentGlow: 'rgba(245, 158, 11, 0.45)',
  btnGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  btnBorder: '#FDE68A',
  btnText: '#FFFFFF',
  btnShadow: '0 4px 18px rgba(217, 119, 6, 0.5), 0 0 16px rgba(245, 158, 11, 0.4)',
  cardBg: 'rgba(15, 23, 42, 0.50)',
  cardBorder: '1.5px solid rgba(255, 255, 255, 0.35)'
});

// Science Chapter 2 Activity Modules
import VirtualBiodiversityExplorer from './VirtualBiodiversityExplorer';
import AppreciatingBiodiversityActivity from './AppreciatingBiodiversityActivity';
import InlineSortingActivity from './InlineSortingActivity';
import PlantDetectiveActivity from './PlantDetective';
import LeafVenationLab from './LeafVenationLab';
import RootSystemsLab from './RootSystemsLab';
import VenationRootCorrelationLab from './VenationRootCorrelationLab';
import SeedDissectionLab from './SeedDissectionLab';
import AnimalHabitatExplorerActivity from './AnimalHabitatExplorer';
import NewActivity29 from './NewActivity29';
import Activity2_10Lab from './Activity2_10Lab';
import AdaptationsLab from './AdaptationsLab';
import ConservationLab from './ConservationLab';
import TextbookExercisesLab from './TextbookExercisesLab';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';

const CHAPTER_TAB_NARRATIONS = {
  1: "Welcome to Chapter Two, Diversity in the Living World. In Section One, explore the ancient Sanskrit wisdom verse on trees and follow Doctor Raghu and Maniram chacha through the interactive school garden story scenes.",
  2: "Activity 2.1, Botanical Lab. Here we investigate plants growing all around us. We observe whether each plant has flowers, inspect their leaves, check their height, and record our observations into Table 2.1.",
  3: "Activity 2.1, Zoological Field Observation. Animals live all around us in diverse habitats. In Table 2.2, we record where each creature is found, whether on trees, ground, flying in the sky, or swimming in water.",
  4: "Activity 2.2, Appreciating School Biodiversity. Observe nature with mindful awareness. Notice how every organism, from an ant and singing bulbul to a caterpillar, plays an essential part in the ecosystem.",
  5: "Activity 2.3, How to Group Living Organisms. Grouping, or scientific classification, is the method of sorting living beings based on shared similarities and differences, making the study of nature orderly.",
  6: "Activity 2.4, The Plant Detective. Plants come in diverse forms. Herbs have soft, green tender stems. Shrubs have thin woody stems branching close to the ground. Trees grow tall with a thick hard trunk and high canopy.",
  7: "Activities 2.5 through 2.7, Leaf Venation and Root Systems. Observe the grand scientific correlation: leaves with net-like reticulate venation possess a taproot, while leaves with parallel venation have fibrous roots.",
  8: "Activity 2.8, Seed Dissection and Cotyledons. When soaked seeds divide into two distinct cotyledons, they are dicotyledons, with reticulate leaves and taproots. Seeds with only one cotyledon are monocotyledons, with parallel venation and fibrous roots.",
  9: "Activities 2.9 and 2.10, Habitats and Adaptations. A habitat provides food, water, air, and shelter. Living organisms adapt their bodies and movements to thrive in deserts, mountains, grasslands, and oceans.",
  10: "Chapter Two Summary and Textbook Exercises. Review the core scientific concepts, explore key glossary terms, and test your understanding with interactive NCERT questions."
};

function getActiveTabNarration(step, section1SubTab, venationSubTab, habitatSubTab, tab10ViewMode) {
  if (step === 1) {
    if (section1SubTab === 'slogan') {
      return "Section 1, Sanskrit Slogan Page. Read and listen to the ancient verse Chhāyām-anyasya kurvanti: Trees stand in the Sun and give shade to others. Their fruits are for others. Good people bear hardships to bring welfare to all.";
    } else {
      return "Section 1, Story Scenes. Join students and Doctor Raghu on their school garden nature walk to observe birds, plants, and animals in the garden.";
    }
  }
  if (step === 7) {
    if (venationSubTab === 'venation') {
      return "Activity 2.5, Leaf Venation. Observe reticulate net-like veins in peepal and hibiscus, and parallel linear veins in grass and banana leaves.";
    } else if (venationSubTab === 'roots') {
      return "Activity 2.6, Root Systems. Compare the deep central taproot with lateral branch roots against the bushy, thread-like fibrous root system.";
    } else if (venationSubTab === 'correlation') {
      return "Activity 2.7, Venation and Root Correlation. Reticulate venation always pairs with taproots, while parallel venation always pairs with fibrous roots.";
    }
  }
  if (step === 9) {
    if (habitatSubTab === 'mission') {
      return "Activity 2.9, Animal Habitat Explorer. Explore terrestrial, aquatic, desert, and mountain habitats to see how organisms move and survive.";
    } else if (habitatSubTab === 'tables') {
      return "Table 2.5 and 2.6 Lab. Examine animal locomotion and explore how different organisms adapt to survive in harsh regions.";
    } else if (habitatSubTab === 'adaptations') {
      return "Special Adaptations Lab. Discover how camels thrive in hot and cold deserts, and how mountain animals brave freezing winters.";
    } else if (habitatSubTab === 'conservation') {
      return "Biodiversity Conservation and Dr. Janaki Ammal. Learn how sacred groves and pioneering scientists protected India's rich biodiversity.";
    }
  }
  if (step === 10) {
    if (tab10ViewMode === 'exercises') {
      return "NCERT Textbook Exercises. Practice questions one through ten to solidify your biological understanding.";
    } else if (tab10ViewMode === 'summary') {
      return "Core Scientific Summary and Quick Quiz. Synthesize the key concepts and test your mastery.";
    }
  }
  return CHAPTER_TAB_NARRATIONS[step] || CHAPTER_TAB_NARRATIONS[1];
}

const CHAPTER_TABS = [
  { id: 1, title: 'Slogan & Scenes', subtitle: 'Living World' },
  { id: 2, title: 'Act 2.1 Plants', subtitle: 'Table 2.1' },
  { id: 3, title: 'Act 2.1 Animals', subtitle: 'Table 2.2' },
  { id: 4, title: 'Act 2.2 Care', subtitle: 'Biodiversity' },
  { id: 5, title: 'Act 2.3 Grouping', subtitle: 'Classification' },
  { id: 6, title: 'Act 2.4 Detective', subtitle: 'Herbs & Trees' },
  { id: 7, title: 'Act 2.5–2.7', subtitle: 'Leaf & Roots' },
  { id: 8, title: 'Act 2.8 Seeds', subtitle: 'Cotyledons' },
  { id: 9, title: 'Act 2.9–2.10', subtitle: 'Adaptations' },
  { id: 10, title: 'Summary', subtitle: 'Q&A' },
];

const SUMMARY_QUIZ = [
  {
    q: 'Who led the students on their school garden nature walk in Chapter 2?',
    opts: [
      'Dr. Raghu (science teacher) and Maniram chacha (gardener)',
      'The school principal and physical education instructor',
      'A team of visiting forest rangers from the state wildlife sanctuary'
    ],
    correct: 0,
    explanation: 'Dr. Raghu and Maniram chacha guided the students through the garden. Maniram chacha demonstrated how to mimic various bird calls and spot wildlife without disturbing nature.'
  },
  {
    q: 'What type of root system is correlated with reticulate (net-like) leaf venation?',
    opts: [
      'Fibrous root system (equal hair-like cluster)',
      'Taproot system (one dominant deep main root with side branches)',
      'Aerial prop root system (roots hanging in mid-air)'
    ],
    correct: 1,
    explanation: 'Plants with reticulate leaf venation (like Hibiscus, Rose, Mustard, and Chickpea) consistently possess a taproot system, while plants with parallel venation (like Grass, Maize, and Wheat) have fibrous roots.'
  },
  {
    q: 'How are seeds categorized based on the number of cotyledons (seed food storage leaves)?',
    opts: [
      'Single-skin vs Double-skin seeds',
      'Monocotyledons (one cotyledon) and Dicotyledons (two cotyledons)',
      'Wet seeds vs Dry seeds'
    ],
    correct: 1,
    explanation: 'Seeds with two cotyledons (like gram, pea, and bean) are called dicotyledons (dicots). Seeds with a single cotyledon (like maize, wheat, and rice) are called monocotyledons (monocots).'
  }
];

export default function Chapter2LearningLab({ onBack, onHeaderVisibilityChange, onSoundButtonVisibilityChange }) {
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    if (params.get('sloganPage')) return 'slogan';
    if (params.get('step')) return 'activity';
    return 'cover';
  }); // 'cover' | 'slogan' | 'scenes' | 'activity'
  const [currentStep, setCurrentStep] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const s = parseInt(params.get('step'), 10);
    return !isNaN(s) ? s : 1;
  });
  const [section1SubTab, setSection1SubTab] = useState('slogan'); // 'slogan' | 'scenes'
  const [sloganInitialPage, setSloganInitialPage] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const p = parseInt(params.get('sloganPage'), 10);
    return !isNaN(p) ? p : 1;
  });
  const [introInitialScene, setIntroInitialScene] = useState(0);
  const [venationSubTab, setVenationSubTab] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('subTab') || 'venation';
  }); // 'venation' | 'correlation'
  const [step5Phase, setStep5Phase] = useState('specimens'); // controls which phase InlineSortingActivity (re)mounts into: 'specimens' | 'table23'
  const [step5SpecimenIndex, setStep5SpecimenIndex] = useState(0); // which specimen slide InlineSortingActivity (re)mounts into when returning to the specimens phase
  const [step6Phase, setStep6Phase] = useState('intro');
  const [step6SpecimenIndex, setStep6SpecimenIndex] = useState(0);
  const [correlationPhase, setCorrelationPhase] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('phase') || 'specimens';
  }); // controls which phase VenationRootCorrelationLab (re)mounts into: 'specimens' | 'lab'
  const [biodiversityPhase, setBiodiversityPhase] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('subStep') || 'timer';
  }); // controls which phase AppreciatingBiodiversityActivity (re)mounts into: 'timer' | 'pick' | 'board'
  const [rootsSpecimenIndex, setRootsSpecimenIndex] = useState(0); // controls which specimen slide RootSystemsLab (re)mounts into (0-6)
  const [venationPhase, setVenationPhase] = useState('cover'); // controls which phase LeafVenationLab (re)mounts into: 'cover' | 'specimens'
  const [venationSpecimenIndex, setVenationSpecimenIndex] = useState(0); // controls which specimen slide LeafVenationLab (re)mounts into (0-6)
  const [plantExplorerSubPage, setPlantExplorerSubPage] = useState(1); // controls which subPage the plant VirtualBiodiversityExplorer (re)mounts into: 1 (categories) | 2 (Field Scanner / Table 2.1)
  const [habitatSubTab, setHabitatSubTab] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const tab = params.get('habitatTab');
    if (tab === 'tables') return 'activity2_10';
    return tab || 'mission';
  }); // 'mission' | 'activity2_10' | 'adaptations' | 'conservation'
  const [tab10ViewMode, setTab10ViewMode] = useState('exercises'); // 'exercises' | 'summary'
  const [isPlayingTransition, setIsPlayingTransition] = useState(false);
  const [isTransitionVideoEnded, setIsTransitionVideoEnded] = useState(false);
  const [isPlayingAct24Transition, setIsPlayingAct24Transition] = useState(false);
  const [isAct24TransitionEnded, setIsAct24TransitionEnded] = useState(false);
  const [isPlayingAct24ObservationTransition, setIsPlayingAct24ObservationTransition] = useState(false);
  const [isAct24ObservationTransitionEnded, setIsAct24ObservationTransitionEnded] = useState(false);
  const [isPlayingAct25ObservationTransition, setIsPlayingAct25ObservationTransition] = useState(false);
  const [isAct25ObservationTransitionEnded, setIsAct25ObservationTransitionEnded] = useState(false);
  const [isPlayingAct26ObservationTransition, setIsPlayingAct26ObservationTransition] = useState(false);
  const [isAct26ObservationTransitionEnded, setIsAct26ObservationTransitionEnded] = useState(false);
  const [isPlayingAct27ObservationTransition, setIsPlayingAct27ObservationTransition] = useState(false);
  const [isAct27ObservationTransitionEnded, setIsAct27ObservationTransitionEnded] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [transitionTargetStep, setTransitionTargetStep] = useState(null);
  const [transitionTargetSubTab, setTransitionTargetSubTab] = useState(null);
  const [transitionSourceStep, setTransitionSourceStep] = useState(null);
  const [transitionSourceSubTab, setTransitionSourceSubTab] = useState(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Quiz state in Tab 10
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showProgressBar, setShowProgressBar] = useState(false);
  const navRef = useRef(null);

  // Stop speech synthesis when navigating away or changing sub-tabs
  useEffect(() => {
    stopNarration();
    setIsSpeaking(false);
  }, [currentStep, viewMode, section1SubTab, venationSubTab, habitatSubTab, tab10ViewMode]);

  // Hide global floating sound button when on scenes, slogan page or in interactive activities so it doesn't overlap UI
  useEffect(() => {
    const isScenes = viewMode === 'scenes' || (currentStep === 1 && section1SubTab === 'scenes');
    const showSound = viewMode === 'cover' && !isScenes;
    onSoundButtonVisibilityChange?.(showSound);
  }, [viewMode, currentStep, section1SubTab, onSoundButtonVisibilityChange]);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep, viewMode]);

  const toggleVoiceOver = () => {
    if (isSpeaking) {
      stopNarration();
      setIsSpeaking(false);
      return;
    }
    const narrationText = getActiveTabNarration(currentStep, section1SubTab, venationSubTab, habitatSubTab, tab10ViewMode);
    setIsSpeaking(true);
    speakNaturalIndianMale({
      text: narrationText,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

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

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const calculateScore = () => {
    return SUMMARY_QUIZ.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correct ? 1 : 0);
    }, 0);
  };

  // Universal Chapter Bottom Navigation handlers (Back, Previous, Next)
  const handleLabNext = () => {
    // Step 2: Act 2.1 Plants -> Step 3: Act 2.1 Animals
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }
    // Step 3: Act 2.1 Animals -> Step 4: Act 2.2 Appreciating
    if (currentStep === 3) {
      setCurrentStep(4);
      return;
    }
    // Step 4: Act 2.2 Appreciating -> Step 5: Act 2.3 Grouping
    if (currentStep === 4) {
      setTransitionTargetStep(5);
                setTransitionTargetSubTab(null);
                setTransitionSourceStep(4);
                setTransitionSourceSubTab(null);
                setTransitionDirection('forward');
                setIsPlayingAct24Transition(true);
      return;
    }
    // Step 5: Act 2.3 Grouping -> Step 6: Act 2.4 Detective
    if (currentStep === 5) {
      setTransitionTargetStep(6);
                setTransitionTargetSubTab(null);
                setTransitionSourceStep(5);
                setTransitionSourceSubTab(null);
                setTransitionDirection('forward');
                setIsPlayingAct24ObservationTransition(true);
      return;
    }
    // Step 6: Act 2.4 Detective -> Step 7: Venation & Roots (sub-tab: venation)
    if (currentStep === 6) {
      setTransitionTargetStep(7);
                setTransitionTargetSubTab('venation');
                setTransitionSourceStep(6);
                setTransitionSourceSubTab(null);
                setTransitionDirection('forward');
                setIsPlayingAct25ObservationTransition(true);
      return;
    }
    // Step 7: Venation & Roots sub-tabs
    if (currentStep === 7) {
      if (venationSubTab === 'venation') {
        
        setTransitionTargetStep(7);
                setTransitionTargetSubTab('roots');
                setTransitionSourceStep(7);
                setTransitionSourceSubTab('venation');
                setTransitionDirection('forward');
                setIsPlayingAct26ObservationTransition(true);
        return;
      }
      if (venationSubTab === 'roots') {
        setCorrelationPhase('specimens');
        setTransitionTargetStep(7);
                setTransitionTargetSubTab('correlation');
                setTransitionSourceStep(7);
                setTransitionSourceSubTab('roots');
                setTransitionDirection('forward');
                setIsPlayingAct27ObservationTransition(true);
        return;
      }
      // Finished correlation -> Step 8 Seeds
      setCurrentStep(8);
      return;
    }
    // Step 8: Seeds -> Step 9 Habitats (sub-tab: mission)
    if (currentStep === 8) {
      setHabitatSubTab('mission');
      setCurrentStep(9);
      return;
    }
    // Step 9: Habitats sub-tabs
    if (currentStep === 9) {
      if (habitatSubTab === 'mission') {
        setHabitatSubTab('tables');
        return;
      }
      if (habitatSubTab === 'tables') {
        setHabitatSubTab('adaptations');
        return;
      }
      if (habitatSubTab === 'adaptations') {
        setHabitatSubTab('conservation');
        return;
      }
      // Finished conservation -> Step 10
      setCurrentStep(10);
      return;
    }
    // Step 10: Summary & Exercises
    if (currentStep === 10) {
      if (tab10ViewMode === 'summary') {
        setTab10ViewMode('exercises');
        return;
      }
      if (onBack) onBack();
      return;
    }
  };

  const handleLabPrev = () => {
    // Reset all transition states when navigating backward
    setIsPlayingTransition(false);
    setIsTransitionVideoEnded(false);
    setIsPlayingAct24Transition(false);
    setIsAct24TransitionEnded(false);
    setIsPlayingAct24ObservationTransition(false);
    setIsAct24ObservationTransitionEnded(false);
    setIsPlayingAct25ObservationTransition(false);
    setIsAct25ObservationTransitionEnded(false);
    setIsPlayingAct26ObservationTransition(false);
    setIsAct26ObservationTransitionEnded(false);
    setIsPlayingAct27ObservationTransition(false);
    setIsAct27ObservationTransitionEnded(false);

    // Step 2 -> Step 1 Scenes
    if (currentStep === 2) {
      setTransitionTargetStep(1);
                setTransitionTargetSubTab('scenes');
                setTransitionSourceStep(2);
                setTransitionSourceSubTab(null);
                setTransitionDirection('backward');
                // IMPORTANT: since the transition video is inside step 1, we must switch to step 1 right away
                setCurrentStep(1);
                setSection1SubTab('scenes');
                setIsPlayingTransition(true);
      return;
    }
    // Step 3 -> Step 2
    if (currentStep === 3) {
      setCurrentStep(2);
      return;
    }
    // Step 4 -> Step 3
    if (currentStep === 4) {
      setCurrentStep(3);
      return;
    }
    // Step 5 -> Step 4
    if (currentStep === 5) {
      setTransitionTargetStep(4);
                setTransitionTargetSubTab(null);
                setTransitionSourceStep(5);
                setTransitionSourceSubTab(null);
                setTransitionDirection('backward');
                setIsPlayingAct24Transition(true);
      return;
    }
    // Step 6 -> Step 5
    if (currentStep === 6) {
      setTransitionTargetStep(5);
                setTransitionTargetSubTab(null);
                setTransitionSourceStep(6);
                setTransitionSourceSubTab(null);
                setTransitionDirection('backward');
                setIsPlayingAct24ObservationTransition(true);
      return;
    }
    // Step 7: Venation & Roots sub-tabs
    if (currentStep === 7) {
      if (venationSubTab === 'correlation') {
        setTransitionTargetStep(7);
                setTransitionTargetSubTab('roots');
                setTransitionSourceStep(7);
                setTransitionSourceSubTab('correlation');
                setTransitionDirection('backward');
                setIsPlayingAct27ObservationTransition(true);
        return;
      }
      if (venationSubTab === 'roots') {
        setTransitionTargetStep(7);
                setTransitionTargetSubTab('venation');
                setTransitionSourceStep(7);
                setTransitionSourceSubTab('roots');
                setTransitionDirection('backward');
                setIsPlayingAct26ObservationTransition(true);
        return;
      }
      // Back to Step 6
      setTransitionTargetStep(6);
                setTransitionTargetSubTab(null);
                setTransitionSourceStep(7);
                setTransitionSourceSubTab('venation');
                setTransitionDirection('backward');
                setIsPlayingAct25ObservationTransition(true);
      return;
    }
    // Step 8 -> Step 7 Correlation
    if (currentStep === 8) {
      setVenationSubTab('correlation');
      setCurrentStep(7);
      return;
    }
    // Step 9: Habitats sub-tabs
    if (currentStep === 9) {
      if (habitatSubTab === 'conservation') {
        setHabitatSubTab('adaptations');
        return;
      }
      if (habitatSubTab === 'adaptations') {
        setHabitatSubTab('tables');
        return;
      }
      if (habitatSubTab === 'tables') {
        setHabitatSubTab('mission');
        return;
      }
      // Back to Step 8
      setCurrentStep(8);
      return;
    }
    // Step 10
    if (currentStep === 10) {
      if (tab10ViewMode === 'exercises') {
        setTab10ViewMode('summary');
        return;
      }
      setHabitatSubTab('conservation');
      setCurrentStep(9);
      return;
    }
  };

  const getLabCenterLabel = () => {
    if (currentStep === 7) {
      if (venationSubTab === 'venation') return 'Activity 2.5 · Leaf Venation';
      if (venationSubTab === 'roots') return 'Activity 2.6 · Root Systems';
      return 'Activity 2.7 · Correlation Lab';
    }
    if (currentStep === 9) {
      if (habitatSubTab === 'mission') return 'Activity 2.9 · Habitats Explorer';
      if (habitatSubTab === 'tables') return 'Tables 2.5 & 2.6 · Locomotion';
      if (habitatSubTab === 'adaptations') return 'Activity 2.10 · Adaptations';
      return 'Conservation · Sacred Groves';
    }
    if (currentStep === 10) {
      if (tab10ViewMode === 'exercises') return 'Chapter Evaluation · Exercises';
      return 'Chapter 2 Review · Key Concepts';
    }
    const currentTabObj = CHAPTER_TABS.find(t => t.id === currentStep);
    return `Page ${currentStep} / 10 · ${currentTabObj ? currentTabObj.title : 'Activity'}`;
  };

  const getLabNextLabel = () => {
    if (currentStep === 2) return 'Next: Act 2.1 Animals';
    if (currentStep === 3) return 'Next: Act 2.2 Care';
    if (currentStep === 5) return 'Next: Act 2.4 Detective';
    if (currentStep === 6) return 'Next: Act 2.5 Venation';
    if (currentStep === 7) {
      if (venationSubTab === 'venation') return 'Next: Act 2.6 Roots';
      if (venationSubTab === 'roots') return 'Next: Act 2.7 Correlation';
      return 'Next: Act 2.8 Seeds';
    }
    if (currentStep === 8) return 'Next: Act 2.9 Habitats';
    if (currentStep === 9) {
      if (habitatSubTab === 'mission') return 'Next: Locomotion Tables';
      if (habitatSubTab === 'tables') return 'Next: Adaptations Lab';
      if (habitatSubTab === 'adaptations') return 'Next: Conservation Lab';
      return 'Next: Chapter Evaluation';
    }
    if (currentStep === 10) {
      if (tab10ViewMode === 'summary') return 'Next: Textbook Exercises';
      return 'Finish Chapter & Exit';
    }
    return 'Next Page';
  };

  if (viewMode === 'cover') {
    return (
      <Chapter2CoverPage
        classNum={6}
        subjectName="CHAPTER 2 · BIOLOGY"
        chapterNum={2}
        title="Diversity in the Living World"
        topics="Plants · Animals · Habitats · Adaptation · Classification"
        onBack={onBack}
        onNext={() => {
          setViewMode('activity');
          setCurrentStep(1);
          setSection1SubTab('slogan');
        }}
        bgImage={coverBgImage}
        bgVideo={coverBgVideo}
      />
    );
  }

  if (viewMode === 'slogan') {
    setViewMode('activity');
    setCurrentStep(1);
    setSection1SubTab('slogan');
  }

  if (viewMode === 'scenes') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#0a1220',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        <IntroStoryteller
          initialScene={introInitialScene}
          onComplete={() => {
            setViewMode('activity');
            setCurrentStep(2);
          }}
          onBack={() => {
            setViewMode('activity');
            setCurrentStep(1);
            setSection1SubTab('slogan');
            setSloganInitialPage(5);
          }}
        />
      </div>
    );
  }

  const activeBg = getActiveBackground(currentStep, section1SubTab, venationSubTab, habitatSubTab);
  const activeTheme = getActiveTheme(currentStep, section1SubTab, venationSubTab, habitatSubTab);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 101,
      boxSizing: 'border-box',
      padding: '0px',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${getActiveBackground(currentStep, section1SubTab)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
    }}>
      {/* Dark nature overlay for maximum readability and vibrant glass contrast (only for activities) */}
      {!(currentStep === 1 && (section1SubTab === 'slogan' || section1SubTab === 'scenes')) && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,15,8,0.54) 0%, rgba(5,30,15,0.38) 40%, rgba(2,18,8,0.50) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
      )}
      <style>{`
        /* Global Text Justification per user instruction */
        p, .content-text, .desc-text, .glossary-text, .fact-text {
          text-align: justify !important;
          text-justify: inter-word !important;
          hyphens: auto;
        }

        /* Strict font size between 16px to 24px and zero scrollbar */
        html, body, #root {
          overflow: hidden !important;
          height: 100vh !important;
          max-height: 100vh !important;
        }

        /* Frosted Crystal Glass Panel with Translucent Glass Rim */
        .glass-panel, .bio-parchment-card, .bio-card-box {
          background: rgba(15, 23, 42, 0.45) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.35) !important;
          border-radius: 20px !important;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1.5px 2px rgba(255, 255, 255, 0.45), 0 0 20px rgba(254, 240, 138, 0.12) !important;
          color: #F8FAFC !important;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .glass-panel:hover, .bio-parchment-card:hover, .bio-card-box:hover {
          background: rgba(15, 23, 42, 0.55) !important;
          border-color: rgba(254, 240, 138, 0.70) !important;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.55), 0 0 25px rgba(245, 158, 11, 0.30), inset 0 1.5px 2px rgba(255, 255, 255, 0.60) !important;
          transform: translateY(-2px) !important;
        }

        /* Deep Obsidian-Emerald Glossy Navigation Button (Matching Title Theme) */
        .bio-nav-btn {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          color: #FFFBEB !important;
          border: 2px solid rgba(253, 230, 138, 0.85) !important;
          border-radius: 12px !important;
          padding: 8px 24px !important;
          font-size: 16px !important;
          font-weight: 900 !important;
          font-family: 'Outfit', sans-serif !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55) !important;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55) !important;
          position: relative !important;
          overflow: hidden !important;
          z-index: 10 !important;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 48%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(135deg, rgba(16, 185, 129, 0.88) 0%, rgba(4, 120, 87, 0.94) 100%) !important;
          color: #FFFFFF !important;
          border-color: #FEF08A !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90) !important;
        }
        .bio-nav-btn:active:not(:disabled) {
          transform: translateY(1px) scale(0.99) !important;
        }
        .bio-nav-btn:disabled {
          opacity: 0.28 !important;
          cursor: not-allowed !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          color: rgba(255, 255, 255, 0.45) !important;
          box-shadow: none !important;
        }

        /* Deep Obsidian-Emerald Glossy Action Button (Exact match to Slogan Page Title) */
        .bio-cta-btn {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%) !important;
          color: #FFFBEB !important;
          border: 2px solid rgba(253, 230, 138, 0.85) !important;
          border-radius: 12px !important;
          padding: 8px 24px !important;
          font-size: 16px !important;
          font-weight: 900 !important;
          font-family: 'Outfit', sans-serif !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75), inset 0 -2px 5px rgba(0, 0, 0, 0.55) !important;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55) !important;
          position: relative !important;
          overflow: hidden !important;
          z-index: 10 !important;
        }
        .bio-cta-btn:hover:not(:disabled) {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 48%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(135deg, rgba(16, 185, 129, 0.88) 0%, rgba(4, 120, 87, 0.94) 100%) !important;
          color: #FFFFFF !important;
          border-color: #FEF08A !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.75), 0 0 24px rgba(251, 191, 36, 0.50), inset 0 1.5px 2px rgba(255, 255, 255, 0.90) !important;
        }
      `}</style>

      {/* Main Content Area (Spacious Book Spread Layout) */}
      <div style={{
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        {/* ============================================================ */}
        {/* TAB 1: SECTION 1 — SLOGAN PAGE & STORY SCENES                */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'transparent',
            borderRadius: '20px',
            border: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            {section1SubTab === 'slogan' && (
              <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                <Chapter2SloganPage
                  chapterNum={2}
                  title="Diversity in the Living World"
                  initialPage={sloganInitialPage}
                  onBack={() => setViewMode('cover')}
                  onEnterLab={() => {
                    setSection1SubTab('scenes');
                    setIntroInitialScene(0);
                  }}
                />
              </div>
            )}
            {section1SubTab === 'scenes' && (
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                