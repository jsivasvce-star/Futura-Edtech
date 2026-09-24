import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle, BookOpen, Volume2, VolumeX, Sparkles, 
  Award, ArrowRight, RefreshCw, Footprints, Leaf, Check, Heart, ShieldCheck,
  ChevronDown, ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

import sanskritSlogan from '../../../../assets/sanskrit_slogan.png';
import CoverPage from '../../../../components/CoverPage';
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
  const [correlationPhase, setCorrelationPhase] = useState('specimens'); // controls which phase VenationRootCorrelationLab (re)mounts into: 'specimens' | 'lab'
  const [biodiversityPhase, setBiodiversityPhase] = useState('timer'); // controls which phase AppreciatingBiodiversityActivity (re)mounts into: 'timer' | 'pick' | 'board'
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
    // Step 5: Act 2.3 Grouping -> Step 6: Act 2.4 Detective
    if (currentStep === 5) {
      setCurrentStep(6);
      return;
    }
    // Step 6: Act 2.4 Detective -> Step 7: Venation & Roots (sub-tab: venation)
    if (currentStep === 6) {
      setVenationSubTab('venation');
      setCurrentStep(7);
      return;
    }
    // Step 7: Venation & Roots sub-tabs
    if (currentStep === 7) {
      if (venationSubTab === 'venation') {
        setVenationSubTab('roots');
        return;
      }
      if (venationSubTab === 'roots') {
        setVenationSubTab('correlation');
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
    // Step 2 -> Step 1 Scenes
    if (currentStep === 2) {
      setCurrentStep(1);
      setSection1SubTab('scenes');
      return;
    }
    // Step 3 -> Step 2
    if (currentStep === 3) {
      setCurrentStep(2);
      return;
    }
    // Step 5 -> Step 4
    if (currentStep === 5) {
      setCurrentStep(4);
      return;
    }
    // Step 6 -> Step 5
    if (currentStep === 6) {
      setCurrentStep(5);
      return;
    }
    // Step 7: Venation & Roots sub-tabs
    if (currentStep === 7) {
      if (venationSubTab === 'correlation') {
        setVenationSubTab('roots');
        return;
      }
      if (venationSubTab === 'roots') {
        setVenationSubTab('venation');
        return;
      }
      // Back to Step 6
      setCurrentStep(6);
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
      <CoverPage
        classNum={6}
        subjectName="CHAPTER 2 · BIOLOGY"
        chapterNum={2}
        title="Diversity in the Living World"
        topics="Plants · Animals · Habitats · Adaptation · Classification"
        coverGraphic="diversity"
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
                {isPlayingTransition ? (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
                    <video 
                      src={activity21TransitionVideo} 
                      autoPlay 
                      playsInline 
                      onEnded={() => {
                        setIsTransitionVideoEnded(true);
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Navigation UI that appears when video ends */}
                    {isTransitionVideoEnded && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '32px',
                        background: 'rgba(0, 0, 0, 0.45)', // Subtle dark overlay
                        zIndex: 10000
                      }}>
                        {/* Top empty space to push center card to center */}
                        <div />
                        
                        {/* Center Card */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                          <div style={{
                            background: '#F3EFE0', // cream/light yellow
                            border: '2px solid #84A98C', // subtle green border
                            borderRadius: '24px',
                            padding: '48px 64px',
                            maxWidth: '700px',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                            overflow: 'hidden'
                          }}>
                            {/* Botanical decoration top */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                              <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                              <Leaf color="#4B7F52" size={28} />
                              <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                            </div>
                            
                            <h2 style={{
                              color: '#2D4A22',
                              fontSize: '28px',
                              fontWeight: '800',
                              lineHeight: '1.4',
                              marginBottom: '24px',
                              fontFamily: 'Outfit, sans-serif'
                            }}>
                              We observed many different<br />
                              plants and animals around us.
                            </h2>
                            
                            <div style={{ height: '1px', width: '40px', background: '#84A98C', margin: '0 auto 24px auto' }} />

                            <p style={{
                              color: '#4A5D23',
                              fontSize: '20px',
                              fontWeight: '500',
                              lineHeight: '1.5'
                            }}>
                              Now, let's take a closer look at them<br />
                              and see how they are different.
                            </p>
                            
                            {/* Subtle side leaves decoration */}
                            <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}>
                              <Leaf size={100} color="#4B7F52" />
                            </div>
                            <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.15 }}>
                              <Leaf size={100} color="#4B7F52" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button 
                            onClick={() => {
                              setIsPlayingTransition(false);
                              setIsTransitionVideoEnded(false);
                            }}
                            style={{
                              background: '#F3EFE0',
                              color: '#1E293B',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '12px 28px',
                              fontSize: '18px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                              transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                          >
                            <ArrowLeft size={20} /> Back
                          </button>
                          
                          <button 
                            className="bio-cta-btn"
                            onClick={() => {
                              setIsPlayingTransition(false);
                              setIsTransitionVideoEnded(false);
                              setCurrentStep(2);
                            }}
                          >
                            Next <ArrowRight size={20} style={{ marginLeft: '6px' }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <IntroStoryteller
                    initialScene={introInitialScene}
                    onComplete={() => setIsPlayingTransition(true)}
                    onBack={() => {
                      setSection1SubTab('slogan');
                      setSloganInitialPage(5);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ACTIVITY 2.1 — PLANTS (TABLE 2.1 & 3D BOTANICAL LAB) */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <VirtualBiodiversityExplorer
              typeFilter="plant"
              initialSubPage={plantExplorerSubPage}
              onBackToDashboard={() => {
                setCurrentStep(1);
                setSection1SubTab('scenes');
                setIntroInitialScene(6);
              }}
              onNextActivity={() => {
                setPlantExplorerSubPage(2);
                setCurrentStep(3);
              }}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ACTIVITY 2.1 — ANIMALS (TABLE 2.2 ZOOLOGICAL FIELD)  */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <VirtualBiodiversityExplorer 
              typeFilter="animal" 
              onBackToDashboard={() => setCurrentStep(2)} 
              onNextActivity={() => setCurrentStep(4)} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.4                          */}
        {/* ============================================================ */}
        {isPlayingAct24Transition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video 
              src={activity24TransitionVideo} 
              autoPlay 
              playsInline 
              onEnded={() => {
                setIsAct24TransitionEnded(true);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* UI overlay appears after video ends */}
            {isAct24TransitionEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // dim overlay
                backdropFilter: 'blur(12px)',      // soften/blur the video
                animation: 'fadeIn 1s ease-out forwards',
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0',
                    border: '2px solid #84A98C',
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '28px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      Our plant collection is ready!
                    </h2>
                    
                    <div style={{ height: '1px', width: '40px', background: '#84A98C', margin: '0 auto 24px auto' }} />

                    <p style={{
                      color: '#4A5D23',
                      fontSize: '20px',
                      fontWeight: '500',
                      lineHeight: '1.5'
                    }}>
                      Let’s observe each specimen closely and<br />
                      discover what makes them different.
                    </p>
                    
                    <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}>
                      <Leaf size={100} color="#4B7F52" />
                    </div>
                    <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.15 }}>
                      <Leaf size={100} color="#4B7F52" />
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingAct24Transition(false);
                      setIsAct24TransitionEnded(false);
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlayingAct24Transition(false);
                      setIsAct24TransitionEnded(false);
                      setCurrentStep(5);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '18px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Next <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.4 OBSERVATION              */}
        {/* ============================================================ */}
        {isPlayingAct24ObservationTransition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video 
              src={activity24ObservationTransitionVideo} 
              autoPlay 
              playsInline 
              onEnded={() => {
                setIsAct24ObservationTransitionEnded(true);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* UI overlay appears after video ends */}
            {isAct24ObservationTransitionEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // dim overlay
                backdropFilter: 'blur(12px)',      // soften/blur the video
                animation: 'fadeIn 1s ease-out forwards',
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0',
                    border: '2px solid #84A98C',
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '32px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      Let’s investigate!
                    </h2>

                    <p style={{
                      color: '#475569',
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Now, let’s collect evidence and discover how these plants are different.
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingAct24ObservationTransition(false);
                      setIsAct24ObservationTransitionEnded(false);
                      setCurrentStep(5);
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlayingAct24ObservationTransition(false);
                      setIsAct24ObservationTransitionEnded(false);
                      setCurrentStep(6);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '18px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Begin Investigation <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.5 LEAF OBSERVATION         */}
        {/* ============================================================ */}
        {isPlayingAct25ObservationTransition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video 
              src={activity25LeafObservationTransitionVideo} 
              autoPlay 
              playsInline 
              muted 
              onEnded={() => {
                setIsAct25ObservationTransitionEnded(true);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* UI overlay appears after video ends */}
            {isAct25ObservationTransitionEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // dim overlay
                backdropFilter: 'blur(12px)',      // soften/blur the video
                animation: 'fadeIn 1s ease-out forwards',
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0',
                    border: '2px solid #84A98C',
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '32px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      Let’s compare!
                    </h2>

                    <p style={{
                      color: '#475569',
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      We observed leaves with different shapes and structures.<br/><br/>
                      Now, let’s compare them and discover how they are different.
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingAct25ObservationTransition(false);
                      setIsAct25ObservationTransitionEnded(false);
                      setCurrentStep(6); // Go back to Plant Detective
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlayingAct25ObservationTransition(false);
                      setIsAct25ObservationTransitionEnded(false);
                      setCurrentStep(7); // Proceed to Leaf Venation Lab
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '18px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.6 ROOT OBSERVATION         */}
        {/* ============================================================ */}
        {isPlayingAct26ObservationTransition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video 
              src={activity26RootObservationTransitionVideo} 
              autoPlay 
              playsInline 
              muted 
              onEnded={() => {
                setIsAct26ObservationTransitionEnded(true);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* UI overlay appears after video ends */}
            {isAct26ObservationTransitionEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // dim overlay
                backdropFilter: 'blur(12px)',      // soften/blur the video
                animation: 'fadeIn 1s ease-out forwards',
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0',
                    border: '2px solid #84A98C',
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '32px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      Let’s find out!
                    </h2>

                    <p style={{
                      color: '#475569',
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      We observed two different root systems.<br/><br/>
                      Now, let’s compare them and discover how they are different.
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingAct26ObservationTransition(false);
                      setIsAct26ObservationTransitionEnded(false);
                      // Back goes to Leaf Venation Lab
                      setCurrentStep(7); 
                      setVenationSubTab('venation');
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlayingAct26ObservationTransition(false);
                      setIsAct26ObservationTransitionEnded(false);
                      // Continue goes to Root Systems Lab
                      setCurrentStep(7); 
                      setVenationSubTab('roots');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '18px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.7 VENATION & ROOT CORRELATION */}
        {/* ============================================================ */}
        {isPlayingAct27ObservationTransition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video 
              src={activity27PlantObservationTransitionVideo} 
              autoPlay 
              playsInline 
              muted 
              onEnded={() => {
                setIsAct27ObservationTransitionEnded(true);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* UI overlay appears after video ends */}
            {isAct27ObservationTransitionEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // dim overlay
                backdropFilter: 'blur(12px)',      // soften/blur the video
                animation: 'fadeIn 1s ease-out forwards',
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0',
                    border: '2px solid #84A98C',
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '32px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      Let’s find out!
                    </h2>

                    <p style={{
                      color: '#475569',
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Before planting our saplings, let’s observe their roots and leaf venation and see how they differ.
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingAct27ObservationTransition(false);
                      setIsAct27ObservationTransitionEnded(false);
                      // Back goes to Root Systems Lab
                      setCurrentStep(7); 
                      setVenationSubTab('roots');
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlayingAct27ObservationTransition(false);
                      setIsAct27ObservationTransitionEnded(false);
                      // Continue goes to Venation Root Correlation Lab (Activity 2.7)
                      setCurrentStep(7); 
                      setVenationSubTab('correlation');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '18px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: ACTIVITY 2.2 — APPRECIATING BIODIVERSITY              */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AppreciatingBiodiversityActivity 
              subStep={biodiversityPhase}
              onSubStepChange={setBiodiversityPhase}
              onBackToDashboard={() => setCurrentStep(3)} 
              onNextActivity={() => {
                setIsPlayingAct24Transition(true);
              }} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: ACTIVITY 2.3 — HOW TO GROUP LIVING THINGS             */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <InlineSortingActivity 
              initialPhase={step5Phase}
              initialSpecimenIndex={step5SpecimenIndex}
              onBackToDashboard={() => setCurrentStep(4)} 
              onGoToDetective={() => setCurrentStep(6)}
              onBackToDetective={() => setCurrentStep(6)}
              onNextActivity={() => {
                setIsPlayingAct24ObservationTransition(true);
              }} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: ACTIVITY 2.4 — PLANT DETECTIVE (HERBS/SHRUBS/TREES)   */}
        {/* ============================================================ */}
        {currentStep === 6 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <PlantDetectiveActivity 
              onBackToDashboard={() => {
                setStep5Phase('specimens');
                setStep5SpecimenIndex(8); // Specimen 09 · Sunflower (last slide) — correct order when stepping back
                setCurrentStep(5);
              }} 
              onNextActivity={() => setIsPlayingAct25ObservationTransition(true)}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: ACTIVITIES 2.5–2.7 — VENATION & ROOTS LABORATORY      */}
        {/* ============================================================ */}
        {currentStep === 7 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {venationSubTab === 'venation' && (
              <LeafVenationLab 
                initialPhase={venationPhase}
                initialSpecimenIndex={venationSpecimenIndex}
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => setCurrentStep(6)}
                onNext={() => {
                  setRootsSpecimenIndex(0);
                  setIsPlayingAct26ObservationTransition(true);
                }}
              />
            )}
            {venationSubTab === 'roots' && (
              <RootSystemsLab 
                initialSpecimenIndex={rootsSpecimenIndex}
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => {
                  setVenationPhase('specimens');
                  setVenationSpecimenIndex(6);
                  setVenationSubTab('venation');
                }}
                onNext={() => {
                  setCorrelationPhase('specimens');
                  setIsPlayingAct27ObservationTransition(true);
                }}
              />
            )}
            {venationSubTab === 'correlation' && (
              <VenationRootCorrelationLab 
                initialPhase={correlationPhase}
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => {
                  setRootsSpecimenIndex(6);
                  setVenationSubTab('roots');
                }}
                onNext={() => {
                  setCorrelationPhase('lab');
                  setCurrentStep(8);
                }}
              />
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: ACTIVITY 2.8 — SEED DISSECTION (DICOT / MONOCOT)      */}
        {/* ============================================================ */}
        {currentStep === 8 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <SeedDissectionLab 
              onBackToDashboard={() => {
                setVenationSubTab('correlation');
                setCorrelationPhase('lab');
                setCurrentStep(7);
              }} 
              onPreviousPage={() => {
                setVenationSubTab('correlation');
                setCorrelationPhase('lab');
                setCurrentStep(7);
              }}
              onNextActivity={() => setCurrentStep(9)} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 9: ACTIVITIES 2.9–2.10 — ANIMAL HABITATS & MOVEMENT     */}
        {/* ============================================================ */}
        {currentStep === 9 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {habitatSubTab === 'mission' && (
              <AnimalHabitatExplorerActivity 
                onBackToDashboard={() => setCurrentStep(8)} 
                onNextActivity={() => setHabitatSubTab('new_activity_29')} 
              />
            )}
            {habitatSubTab === 'new_activity_29' && (
              <NewActivity29 
                onBackToDashboard={() => setHabitatSubTab('mission')} 
                onNextActivity={() => setHabitatSubTab('activity2_10')} 
              />
            )}
            {habitatSubTab === 'activity2_10' && (
              <Activity2_10Lab 
                onBack={() => setHabitatSubTab('new_activity_29')} 
                onComplete={() => setHabitatSubTab('adaptations')} 
              />
            )}
            {habitatSubTab === 'adaptations' && (
              <AdaptationsLab 
                onBackToDashboard={() => setHabitatSubTab('activity2_10')} 
                onNextSubModule={() => setHabitatSubTab('conservation')} 
              />
            )}
            {habitatSubTab === 'conservation' && (
              <ConservationLab 
                onBackToDashboard={() => setHabitatSubTab('adaptations')} 
                onNextSubModule={() => setCurrentStep(10)} 
              />
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 10: CHAPTER SUMMARY, MASTERY CHALLENGE & EXERCISES      */}
        {/* ============================================================ */}
        {currentStep === 10 && (
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {tab10ViewMode === 'exercises' ? (
              <TextbookExercisesLab onBackToDashboard={() => setTab10ViewMode('summary')} />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(10px, 1.5vh, 16px) clamp(14px, 1.8vw, 20px)',
                background: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '20px',
                border: '2px solid rgba(245, 158, 11, 0.45)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid rgba(245, 158, 11, 0.35)',
                  paddingBottom: 'clamp(6px, 1vh, 10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '0.06em', color: '#FDE68A', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>
                      Chapter 2 · Final Review &amp; Self-Assessment
                    </div>
                    <h1 style={{ margin: '2px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#FBBF24', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                      🏆 Diversity in the Living World — Mastery Challenge
                    </h1>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => handleReadAloud("Chapter Two Key Summary. First: Plant Classification. Herbs have tender green stems; Shrubs branch near the base with woody stems; Trees have a thick tall trunk. Second: The Grand Triad. Reticulate venation corresponds to taproot systems and two cotyledons in dicot seeds. Parallel venation corresponds to fibrous root systems and single cotyledons in monocot seeds. Third: Habitats and Adaptation. Living organisms modify their bodies and movement to thrive in their natural surroundings.")}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 18px',
                        background: isSpeaking ? '#10b981' : 'rgba(15, 23, 42, 0.65)',
                        border: '1.8px solid #F59E0B',
                        borderRadius: '10px',
                        color: isSpeaking ? '#ffffff' : '#FDE68A',
                        fontWeight: '800',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                        fontFamily: '"Outfit", sans-serif',
                        backdropFilter: 'blur(12px)'
                      }}
                    >
                      {isSpeaking ? <VolumeX size={17} /> : <Volume2 size={17} />}
                      <span>{isSpeaking ? 'Stop Voice' : 'Read Concepts'}</span>
                    </button>

                    <button
                      onClick={() => setTab10ViewMode('exercises')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontWeight: '900',
                        fontSize: '16px',
                        border: '1.8px solid #FDE68A',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)',
                        fontFamily: '"Outfit", sans-serif'
                      }}
                    >
                      <span>Textbook Exercises (Q1–Q10) ➔</span>
                    </button>

                    {quizSubmitted && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(16, 185, 129, 0.25)',
                        border: '1.8px solid #10B981',
                        borderRadius: '10px',
                        padding: '6px 16px'
                      }}>
                        <Award size={20} color="#34D399" />
                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#6EE7B7', fontFamily: '"Outfit", sans-serif' }}>
                          Score: {calculateScore()} / {SUMMARY_QUIZ.length} Correct
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Section: Summary Takeaways + Interactive 3 Questions */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.9fr',
                  gap: 'clamp(10px, 1.5vw, 16px)',
                  flex: 1,
                  minHeight: 0,
                  alignItems: 'stretch',
                  margin: '8px 0'
                }}>
                  {/* Left Column: Key Concept Synthesis Cards */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.52)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.8px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '16px',
                    padding: 'clamp(10px, 1.4vh, 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    boxSizing: 'border-box'
                  }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '900', color: '#FBBF24', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Outfit", sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                        📌 Core Scientific Correlations
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1.5px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#FCD34D', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🌱 Plant Classification</div>
                          <div style={{ fontSize: '16px', color: '#F1F5F9', lineHeight: 1.55, fontWeight: '500', textAlign: 'justify', textJustify: 'inter-word' }}>
                            Herbs have soft tender green stems; Shrubs have thin woody stems branching near the base; Trees have tall, thick, hard trunks with high canopies.
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1.5px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#FCD34D', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🍃 The Grand Triad Correlation</div>
                          <div style={{ fontSize: '16px', color: '#F1F5F9', lineHeight: 1.55, fontWeight: '500', textAlign: 'justify', textJustify: 'inter-word' }}>
                            <b style={{ color: '#6EE7B7' }}>Reticulate Venation ↔ Taproot System ↔ 2 Cotyledons (Dicot)</b><br />
                            <b style={{ color: '#93C5FD' }}>Parallel Venation ↔ Fibrous Roots ↔ 1 Cotyledon (Monocot)</b>
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1.5px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#FCD34D', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🐾 Habitats &amp; Adaptation</div>
                          <div style={{ fontSize: '16px', color: '#F1F5F9', lineHeight: 1.55, fontWeight: '500', textAlign: 'justify', textJustify: 'inter-word' }}>
                            Living organisms adapt their locomotion and physical structure to thrive across forests, grasslands, freshwater ponds, and tree canopies.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(245, 158, 11, 0.18)', padding: '9px 14px', borderRadius: '10px', border: '1.5px solid rgba(245, 158, 11, 0.5)' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#FDE68A', fontFamily: '"Outfit", sans-serif' }}>
                        ✓ Chapter 2 Learning Standards Fulfilled
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 3 Interactive NCERT Questions */}
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.52)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.8px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '16px',
                    padding: 'clamp(10px, 1.4vh, 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {SUMMARY_QUIZ.map((item, qIdx) => {
                        const chosen = selectedAnswers[qIdx];
                        const isAnswered = chosen !== undefined;
                        const isCorrect = isAnswered && chosen === item.correct;
                        return (
                          <div 
                            key={qIdx}
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: `1.8px solid ${quizSubmitted ? (isCorrect ? '#10B981' : '#EF4444') : 'rgba(245, 158, 11, 0.35)'}`,
                              borderRadius: '12px',
                              padding: '10px 14px'
                            }}
                          >
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#FDE68A', marginBottom: '8px', lineHeight: 1.35, fontFamily: '"Outfit", sans-serif' }}>
                              {qIdx + 1}. {item.q}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                              {item.opts.map((opt, oIdx) => {
                                const isSelected = chosen === oIdx;
                                let btnBg = 'rgba(255, 255, 255, 0.08)';
                                let btnBorder = 'rgba(255, 255, 255, 0.25)';
                                let btnColor = '#F8FAFC';

                                if (isSelected) {
                                  btnBg = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
                                  btnBorder = '#FDE68A';
                                  btnColor = '#ffffff';
                                }

                                if (quizSubmitted) {
                                  if (oIdx === item.correct) {
                                    btnBg = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                                    btnBorder = '#A7F3D0';
                                    btnColor = '#ffffff';
                                  } else if (isSelected && !isCorrect) {
                                    btnBg = 'rgba(220, 38, 38, 0.85)';
                                    btnBorder = '#FCA5A5';
                                    btnColor = '#ffffff';
                                  }
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                                    style={{
                                      padding: '9px 12px',
                                      fontSize: '16px',
                                      fontWeight: '700',
                                      borderRadius: '9px',
                                      border: `1.8px solid ${btnBorder}`,
                                      background: btnBg,
                                      color: btnColor,
                                      cursor: quizSubmitted ? 'default' : 'pointer',
                                      textAlign: 'left',
                                      lineHeight: 1.4,
                                      transition: 'all 0.15s ease',
                                      fontFamily: '"Plus Jakarta Sans", sans-serif'
                                    }}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                                background: isCorrect ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                                border: `1.5px solid ${isCorrect ? '#10B981' : '#FCA5A5'}`,
                                padding: '8px 12px',
                                borderRadius: '10px',
                                lineHeight: 1.5,
                                textAlign: 'justify',
                                textJustify: 'inter-word'
                              }}>
                                <b style={{ color: isCorrect ? '#6EE7B7' : '#FCA5A5' }}>{isCorrect ? '✓ Correct! ' : '✕ Review Note: '}</b>
                                {item.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit / Reset Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
                      <button
                        onClick={() => {
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '9px 18px',
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1.8px solid #F59E0B',
                          borderRadius: '10px',
                          color: '#FDE68A',
                          fontWeight: '800',
                          fontSize: '16px',
                          cursor: 'pointer',
                          fontFamily: '"Outfit", sans-serif'
                        }}
                      >
                        <RefreshCw size={17} />
                        <span>Reset Quiz</span>
                      </button>

                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < SUMMARY_QUIZ.length}
                          style={{
                            padding: '10px 24px',
                            background: Object.keys(selectedAnswers).length === SUMMARY_QUIZ.length
                              ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                              : '#64748B',
                            color: '#ffffff',
                            fontWeight: '900',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.8px solid #FDE68A',
                            cursor: Object.keys(selectedAnswers).length === SUMMARY_QUIZ.length ? 'pointer' : 'not-allowed',
                            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)',
                            fontFamily: '"Outfit", sans-serif'
                          }}
                        >
                          Submit Assessment ➔
                        </button>
                      ) : (
                        <button
                          onClick={onBack}
                          style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#ffffff',
                            fontWeight: '900',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.8px solid #FDE68A',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)',
                            fontFamily: '"Outfit", sans-serif'
                          }}
                        >
                          ✓ Complete Chapter &amp; Return to Dashboard
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

