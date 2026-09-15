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
import coverBgImage from '../../../../assets/cover_page_ch2.png';
import coverBgVideo from '../../../../assets/in_this_video_just_add_those_b (1).mp4';

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
import Tables2_5_2_6_Lab from './Tables2_5_2_6_Lab';
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
  { id: 10, title: 'Summary', subtitle: 'NCERT Q&A' },
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
  const [viewMode, setViewMode] = useState('cover'); // 'cover' | 'slogan' | 'scenes' | 'activity'
  const [currentStep, setCurrentStep] = useState(1);
  const [section1SubTab, setSection1SubTab] = useState('slogan'); // 'slogan' | 'scenes'
  const [venationSubTab, setVenationSubTab] = useState('venation'); // 'venation' | 'roots' | 'correlation'
  const [habitatSubTab, setHabitatSubTab] = useState('mission'); // 'mission' | 'tables' | 'adaptations' | 'conservation'
  const [tab10ViewMode, setTab10ViewMode] = useState('exercises'); // 'exercises' | 'summary'
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

  // Hide global floating sound button when in interactive activities so it doesn't overlap UI
  useEffect(() => {
    const isIntroOrCover = viewMode === 'cover' || (viewMode === 'activity' && currentStep === 1);
    onSoundButtonVisibilityChange?.(isIntroOrCover);
  }, [viewMode, currentStep, onSoundButtonVisibilityChange]);

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
          onComplete={() => {
            setViewMode('activity');
            setCurrentStep(2);
          }}
          onBack={() => {
            setViewMode('activity');
            setCurrentStep(1);
            setSection1SubTab('slogan');
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 101,
      boxSizing: 'border-box',
      padding: showProgressBar ? '6px 14px 4px 14px' : '0px',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #D6EDFA 0%, #E8F7EE 16%, #F3FAF5 48%, #E5F5EB 82%, #D5EFE0 100%)',
      overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        .bio-nav-btn {
          background: #14452F;
          color: #D1FAE5;
          border: 1.5px solid #2D6A4F;
          border-radius: 10px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 3px 10px rgba(20, 69, 47, 0.25);
          position: relative;
          z-index: 10;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: #1B5E3C;
          color: #FFFFFF;
          border-color: #10B981;
          transform: translateY(-1px);
          box-shadow: 0 5px 14px rgba(20, 69, 47, 0.35);
        }
        .bio-nav-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .bio-nav-btn:disabled {
          opacity: 0.32;
          cursor: not-allowed;
          box-shadow: none;
        }
        .bio-cta-btn {
          background: linear-gradient(135deg, #14452F 0%, #064E3B 100%);
          color: #FFFFFF;
          border: 1.5px solid #10B981;
          border-radius: 10px;
          padding: 8px 24px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(6, 78, 59, 0.32);
          position: relative;
          z-index: 10;
        }
        .bio-cta-btn:hover {
          background: linear-gradient(135deg, #1B5E3C 0%, #047857 100%);
          border-color: #34D399;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(6, 78, 59, 0.42);
        }
      `}</style>

      {/* Top Hover Sensor */}
      <div
        onMouseEnter={() => setShowProgressBar(true)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '12px',
          zIndex: 9998,
          pointerEvents: showProgressBar ? 'none' : 'auto'
        }}
      />

      {/* Collapsible Top Workflow Header with Toggle Arrow Button */}
      <div
        onMouseEnter={() => setShowProgressBar(true)}
        onMouseLeave={() => setShowProgressBar(false)}
        style={{
          flexShrink: 0,
          width: '100%',
          minWidth: 0,
          zIndex: 9997,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          marginBottom: showProgressBar ? '0.45rem' : '0px',
          transition: 'margin-bottom 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Animated Workflow Bar */}
        <div
          style={{
            width: '100%',
            minWidth: 0,
            maxHeight: showProgressBar ? '80px' : '0px',
            opacity: showProgressBar ? 1 : 0,
            transform: showProgressBar ? 'translateY(0)' : 'translateY(-14px)',
            overflow: showProgressBar ? 'visible' : 'hidden',
            pointerEvents: showProgressBar ? 'auto' : 'none',
            transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: showProgressBar ? '6px' : '0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.45rem', width: '100%', minWidth: 0 }}>
          {/* Back to Chapter Cover Button */}
          <button
            type="button"
            onClick={() => setViewMode('cover')}
            title="Back to Chapter Cover"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.15rem',
              padding: '0.35rem 0.45rem',
              fontSize: '16px',
              fontWeight: '800',
              color: '#14452F',
              border: '1.8px solid #14452F',
              borderRadius: '12px',
              background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
              cursor: 'pointer',
              flexShrink: 0,
              minHeight: '62px',
              width: '84px',
              boxSizing: 'border-box',
              lineHeight: 1.15,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(20, 69, 47, 0.10)',
              transition: 'all 0.2s ease',
              fontFamily: '"Outfit", sans-serif'
            }}
          >
            <ArrowLeft size={16} color="#14452F" strokeWidth={2.4} />
            <span style={{ color: '#14452F', fontWeight: '800', fontSize: '16px' }}>Chapter</span>
            <span style={{ color: '#14452F', fontWeight: '800', fontSize: '16px' }}>Cover</span>
          </button>

          {/* Universal Natural Indian Male Voice Over Controller */}
          <button
            type="button"
            onClick={toggleVoiceOver}
            title={isSpeaking ? "Stop Voice Over" : "Listen to Natural Indian Educator Voice Over"}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.15rem',
              padding: '0.35rem 0.45rem',
              fontSize: '16px',
              fontWeight: '800',
              color: isSpeaking ? '#ffffff' : '#14452F',
              border: isSpeaking ? '1.8px solid #10B981' : '1.8px solid #14452F',
              borderRadius: '12px',
              background: isSpeaking ? 'linear-gradient(135deg, #14452F 0%, #047857 100%)' : 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
              cursor: 'pointer',
              flexShrink: 0,
              minHeight: '62px',
              width: '84px',
              boxSizing: 'border-box',
              lineHeight: 1.15,
              textAlign: 'center',
              boxShadow: isSpeaking ? '0 0 12px rgba(16, 185, 129, 0.35)' : '0 2px 8px rgba(20, 69, 47, 0.10)',
              transition: 'all 0.2s ease',
              fontFamily: '"Outfit", sans-serif'
            }}
          >
            {isSpeaking ? <VolumeX size={16} color="#ffffff" /> : <Volume2 size={16} color="#14452F" strokeWidth={2.4} />}
            <span style={{ color: isSpeaking ? '#ffffff' : '#14452F', fontWeight: '800', fontSize: '16px' }}>
              {isSpeaking ? 'Stop' : 'Voice'}
            </span>
            <span style={{ color: isSpeaking ? '#D1FAE5' : '#2D6A4F', fontWeight: '700', fontSize: '16px' }}>
              {isSpeaking ? 'Audio' : 'Over'}
            </span>
          </button>

          {/* Workflow Step Tabs Bar - Completely hidden scrollbar */}
          <nav
            ref={navRef}
            className="chapter2-nav-tabs hide-scrollbar"
            onWheel={(e) => {
              if (navRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                navRef.current.scrollLeft += e.deltaY;
              }
            }}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
              gap: '0.35rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '2px'
            }}
          >
            {CHAPTER_TABS.map((tab) => {
              const isActive = currentStep === tab.id;
              const isCompleted = currentStep > tab.id;
              return (
                <button
                  key={tab.id}
                  data-active={isActive}
                  onClick={() => setCurrentStep(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.5rem',
                    background: isActive ? '#14452F' : 'linear-gradient(175deg, #FAF8F2 0%, #F4EFE5 100%)',
                    border: `1.8px solid ${isActive ? '#10B981' : '#2D6A4F'}`,
                    borderRadius: '12px',
                    width: '100%',
                    minHeight: '58px',
                    minWidth: 'clamp(100px, 8.5vw, 124px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 16px rgba(20, 69, 47, 0.35)' : '0 2px 6px rgba(20, 69, 47, 0.06)',
                    textAlign: 'left',
                    boxSizing: 'border-box',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '7px',
                    background: isActive ? '#10b981' : (isCompleted ? '#14452F' : '#64748b'),
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '900',
                    flexShrink: 0,
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    {isCompleted ? <CheckCircle size={14} /> : tab.id}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: isActive ? '#ffffff' : '#0A3B24', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
                      {tab.title}
                    </span>
                    <span style={{ fontSize: '16px', color: isActive ? '#D1FAE5' : '#2D6A4F', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', fontWeight: '700', fontFamily: '"Outfit", sans-serif' }}>
                      {tab.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Small Arrow Pill to Toggle / Show / Hide Progress Bar - hidden per user request */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowProgressBar(prev => !prev);
        }}
        title={showProgressBar ? "Hide Section Progress Bar" : "Click to view Section Progress Bar"}
        style={{
          display: 'none',
          background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
          color: '#ffffff',
          border: '1.8px solid #10B981',
          borderRadius: '24px',
          padding: '4px 18px',
          cursor: 'pointer',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(20, 69, 47, 0.30)',
          transition: 'all 0.22s ease',
          fontFamily: '"Outfit", sans-serif',
          fontSize: '16px',
          fontWeight: 800,
          letterSpacing: '0.02em',
          pointerEvents: 'auto'
        }}
      >
        {showProgressBar ? (
          <>
            <ChevronUp size={18} strokeWidth={2.5} color="#D1FAE5" />
            <span>Hide Sections</span>
          </>
        ) : (
          <>
            <ChevronDown size={18} strokeWidth={2.5} color="#D1FAE5" />
            <span>Show Sections</span>
          </>
        )}
      </button>
    </div>

      {/* Main Content Area (Spacious Book Spread Layout) */}
      <div style={{
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative'
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
            background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 55%, #ECE5D5 100%)',
            borderRadius: '20px',
            border: '2px solid #14452F',
            overflow: 'hidden',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            {section1SubTab === 'slogan' && (
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <Chapter2SloganPage
                  chapterNum={2}
                  title="Diversity in the Living World"
                  onBack={() => setViewMode('cover')}
                  onEnterLab={() => setSection1SubTab('scenes')}
                />
              </div>
            )}
            {section1SubTab === 'scenes' && (
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <IntroStoryteller
                  onComplete={() => setCurrentStep(2)}
                  onBack={() => setSection1SubTab('slogan')}
                />
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
              onBackToDashboard={() => setCurrentStep(1)} 
              onNextActivity={() => setCurrentStep(3)} 
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
        {/* TAB 4: ACTIVITY 2.2 — APPRECIATING BIODIVERSITY              */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AppreciatingBiodiversityActivity 
              onBackToDashboard={() => setCurrentStep(3)} 
              onNextActivity={() => setCurrentStep(5)} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: ACTIVITY 2.3 — HOW TO GROUP LIVING THINGS             */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <InlineSortingActivity 
              onBackToDashboard={() => setCurrentStep(4)} 
              onNextActivity={() => setCurrentStep(6)} 
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: ACTIVITY 2.4 — PLANT DETECTIVE (HERBS/SHRUBS/TREES)   */}
        {/* ============================================================ */}
        {currentStep === 6 && (
          <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <PlantDetectiveActivity 
              onBackToDashboard={() => setCurrentStep(5)} 
              onNextActivity={() => setCurrentStep(7)} 
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
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => setCurrentStep(6)}
                onNext={() => setVenationSubTab('roots')}
              />
            )}
            {venationSubTab === 'roots' && (
              <RootSystemsLab 
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => setVenationSubTab('venation')}
                onNext={() => setVenationSubTab('correlation')}
              />
            )}
            {venationSubTab === 'correlation' && (
              <VenationRootCorrelationLab 
                onBackToDashboard={() => setCurrentStep(6)} 
                onPreviousPage={() => setVenationSubTab('roots')}
                onNext={() => setCurrentStep(8)}
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
              onBackToDashboard={() => setCurrentStep(7)} 
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
                onNextActivity={() => setHabitatSubTab('tables')} 
              />
            )}
            {habitatSubTab === 'tables' && (
              <Tables2_5_2_6_Lab 
                onBackToDashboard={() => setHabitatSubTab('mission')} 
                onNextSubModule={() => setHabitatSubTab('adaptations')} 
              />
            )}
            {habitatSubTab === 'adaptations' && (
              <AdaptationsLab 
                onBackToDashboard={() => setHabitatSubTab('tables')} 
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
                background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 55%, #ECE5D5 100%)',
                borderRadius: '20px',
                border: '2px solid #14452F',
                boxShadow: '0 12px 36px rgba(20, 69, 47, 0.12)',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #14452F',
                  paddingBottom: 'clamp(6px, 1vh, 10px)',
                  flexShrink: 0
                }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '0.06em', color: '#14452F', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>
                      Chapter 2 · Final Review &amp; Self-Assessment
                    </div>
                    <h1 style={{ margin: '2px 0 0 0', fontSize: '24px', fontWeight: '900', color: '#0A3B24', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
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
                        background: isSpeaking ? '#10b981' : 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
                        border: '1.8px solid #14452F',
                        borderRadius: '10px',
                        color: isSpeaking ? '#ffffff' : '#14452F',
                        fontWeight: '800',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(20, 69, 47, 0.12)',
                        fontFamily: '"Outfit", sans-serif'
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
                        background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontWeight: '900',
                        fontSize: '16px',
                        border: '1.5px solid #10B981',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
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
                        background: '#EAF7EE',
                        border: '1.8px solid #14452F',
                        borderRadius: '10px',
                        padding: '6px 16px'
                      }}>
                        <Award size={20} color="#14452F" />
                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#0A3B24', fontFamily: '"Outfit", sans-serif' }}>
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
                    background: '#FAF8F2',
                    border: '1.8px solid #14452F',
                    borderRadius: '16px',
                    padding: 'clamp(10px, 1.4vh, 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)',
                    boxSizing: 'border-box'
                  }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '900', color: '#0A3B24', textTransform: 'uppercase', marginBottom: '10px', fontFamily: '"Outfit", sans-serif' }}>
                        📌 Core Scientific Correlations
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ background: '#F5F1E5', border: '1.5px solid #2D6A4F', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0A3B24', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🌱 Plant Classification</div>
                          <div style={{ fontSize: '16px', color: '#0F3822', lineHeight: 1.55, fontWeight: '600' }}>
                            Herbs have soft tender green stems; Shrubs have thin woody stems branching near the base; Trees have tall, thick, hard trunks with high canopies.
                          </div>
                        </div>

                        <div style={{ background: '#F5F1E5', border: '1.5px solid #2D6A4F', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0A3B24', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🍃 The Grand Triad Correlation</div>
                          <div style={{ fontSize: '16px', color: '#0F3822', lineHeight: 1.55, fontWeight: '600' }}>
                            <b>Reticulate Venation ↔ Taproot System ↔ 2 Cotyledons (Dicot)</b><br />
                            <b>Parallel Venation ↔ Fibrous Roots ↔ 1 Cotyledon (Monocot)</b>
                          </div>
                        </div>

                        <div style={{ background: '#F5F1E5', border: '1.5px solid #2D6A4F', borderRadius: '12px', padding: '10px 14px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0A3B24', marginBottom: '4px', fontFamily: '"Outfit", sans-serif' }}>🐾 Habitats &amp; Adaptation</div>
                          <div style={{ fontSize: '16px', color: '#0F3822', lineHeight: 1.55, fontWeight: '600' }}>
                            Living organisms adapt their locomotion and physical structure to thrive across forests, grasslands, freshwater ponds, and tree canopies.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#EAF7EE', padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #2D6A4F' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#0A3B24', fontFamily: '"Outfit", sans-serif' }}>
                        ✓ NCERT Chapter 2 Learning Standards Fulfilled
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 3 Interactive NCERT Questions */}
                  <div style={{
                    background: '#FAF8F2',
                    border: '1.8px solid #14452F',
                    borderRadius: '16px',
                    padding: 'clamp(10px, 1.4vh, 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(20, 69, 47, 0.08)',
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
                              background: '#F5F1E5',
                              border: `1.8px solid ${quizSubmitted ? (isCorrect ? '#10B981' : '#EF4444') : '#2D6A4F'}`,
                              borderRadius: '12px',
                              padding: '10px 14px'
                            }}
                          >
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0A3B24', marginBottom: '8px', lineHeight: 1.35, fontFamily: '"Outfit", sans-serif' }}>
                              {qIdx + 1}. {item.q}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                              {item.opts.map((opt, oIdx) => {
                                const isSelected = chosen === oIdx;
                                let btnBg = '#FAF8F2';
                                let btnBorder = '#2D6A4F';
                                let btnColor = '#0A3B24';

                                if (isSelected) {
                                  btnBg = '#14452F';
                                  btnBorder = '#10B981';
                                  btnColor = '#ffffff';
                                }

                                if (quizSubmitted) {
                                  if (oIdx === item.correct) {
                                    btnBg = '#10B981';
                                    btnBorder = '#059669';
                                    btnColor = '#ffffff';
                                  } else if (isSelected && !isCorrect) {
                                    btnBg = '#FEE2E2';
                                    btnBorder = '#EF4444';
                                    btnColor = '#991B1B';
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
                                fontWeight: '600',
                                color: '#0F3822',
                                background: isCorrect ? '#EAF7EE' : '#FEF2F2',
                                border: `1.5px solid ${isCorrect ? '#10B981' : '#FCA5A5'}`,
                                padding: '8px 12px',
                                borderRadius: '10px',
                                lineHeight: 1.5
                              }}>
                                <b style={{ color: isCorrect ? '#047857' : '#B91C1C' }}>{isCorrect ? '✓ Correct! ' : '✕ Review Note: '}</b>
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
                          background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
                          border: '1.8px solid #14452F',
                          borderRadius: '10px',
                          color: '#14452F',
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
                              ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
                              : '#94A3B8',
                            color: '#ffffff',
                            fontWeight: '900',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.5px solid #10B981',
                            cursor: Object.keys(selectedAnswers).length === SUMMARY_QUIZ.length ? 'pointer' : 'not-allowed',
                            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
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
                            background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
                            color: '#ffffff',
                            fontWeight: '900',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1.5px solid #10B981',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
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

