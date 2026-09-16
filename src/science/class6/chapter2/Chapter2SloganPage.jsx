import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowRight, ArrowLeft, X, Sparkles, Eye } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';

// Cinematic Real Living Nature Photograph (National Geographic Sanctuary)
import cinematicLivingNatureImage from './DiversityInTheLivingWorldNew/images/ch2_cinematic_living_nature.jpg';

// Individual 8K realistic assets for the 4 facts
import biomesImage from './DiversityInTheLivingWorldNew/images/ch2_biodiversity_hero.jpg';
import adaptationImage from './DiversityInTheLivingWorldNew/images/ch2_desert_thar.jpg';
import botanyImage from './DiversityInTheLivingWorldNew/images/ch2_plant_detective.jpg';
import conservationImage from './DiversityInTheLivingWorldNew/images/ch2_sacred_grove.jpg';

const TOTAL_PAGES = 3;

// Golden & Emerald Leafy Vine Branch extending outwards flanking the main title
const TitleVineBranch = ({ side = 'left' }) => (
  <svg
    width="54"
    height="26"
    viewBox="0 0 80 32"
    fill="none"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
      flexShrink: 0,
      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.45))'
    }}
  >
    <path
      d="M75 16 C55 14, 35 8, 8 2"
      stroke="#F59E0B"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M12 4 C16 1, 24 3, 26 8 C26 12, 20 14, 16 12 C12 10, 10 7, 12 4 Z" fill="#D97706" />
    <path d="M28 7 C34 4, 42 7, 43 13 C43 17, 37 19, 33 16 C29 13, 26 10, 28 7 Z" fill="#F59E0B" />
    <path d="M46 11 C52 9, 60 12, 61 17 C61 21, 55 23, 51 20 C47 17, 44 14, 46 11 Z" fill="#34D399" />
    <path d="M22 14 C26 18, 25 24, 21 26 C17 28, 13 25, 14 20 C15 16, 19 13, 22 14 Z" fill="#D97706" />
    <path d="M40 18 C44 22, 43 27, 39 29 C35 31, 31 28, 32 23 C33 20, 37 17, 40 18 Z" fill="#10B981" />
  </svg>
);

// Botanical Sprout Motif directly beneath the title in the center with golden glow
const TitleSprout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' }}>
      <path d="M16 20 C16 12, 16 4, 16 2" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 8 C11 5, 4 8, 3 13 C4 17, 10 17, 14 13 C16 11, 16 9, 16 8 Z" fill="#D97706" />
      <path d="M16 8 C21 5, 28 8, 29 13 C28 17, 22 17, 18 13 C16 11, 16 9, 16 8 Z" fill="#34D399" />
      <path d="M16 3 C14 1, 15 0, 16 0 C17 0, 18 1, 16 3 Z" fill="#FEF08A" />
    </svg>
  </div>
);

// Top Hanging Tree Foliage in corners (matching reference poster design)
const TopCornerFoliage = ({ side = 'left' }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    [side]: 0,
    width: 'clamp(140px, 14vw, 220px)',
    height: 'clamp(80px, 9vh, 120px)',
    pointerEvents: 'none',
    zIndex: 4,
    overflow: 'hidden',
    transform: side === 'right' ? 'scaleX(-1)' : 'none',
    opacity: 0.95
  }}>
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="none" fill="none">
      {/* Primary Vine Branches */}
      <path d="M0 0 C45 22, 100 38, 155 32 C175 30, 192 24, 200 18" stroke="#0D3B24" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M65 28 C88 50, 122 66, 150 70" stroke="#1B4D3E" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 16 C50 38, 72 65, 88 86" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Lush Layered Leaves */}
      <path d="M38 12 C54 2, 74 10, 80 24 C68 31, 48 26, 38 12 Z" fill="#2D6A4F" />
      <path d="M75 22 C96 14, 118 22, 124 38 C110 45, 88 38, 75 22 Z" fill="#14452F" />
      <path d="M118 28 C140 20, 162 27, 168 43 C154 50, 132 43, 118 28 Z" fill="#40916C" />
      <path d="M150 28 C172 22, 188 30, 194 43 C180 49, 164 43, 150 28 Z" fill="#2D6A4F" />
      
      {/* Drooping Tender Leaves */}
      <path d="M55 33 C72 27, 88 38, 90 52 C76 57, 60 49, 55 33 Z" fill="#52B788" />
      <path d="M92 44 C108 38, 125 48, 126 62 C112 67, 97 59, 92 44 Z" fill="#40916C" />
      <path d="M125 54 C142 48, 158 58, 160 72 C146 77, 131 69, 125 54 Z" fill="#52B788" />
      <path d="M60 60 C76 55, 90 68, 90 82 C76 86, 64 76, 60 60 Z" fill="#2D6A4F" />
      <path d="M22 34 C36 28, 50 36, 52 50 C38 54, 26 46, 22 34 Z" fill="#40916C" />
    </svg>
  </div>
);

// Soft Mountain Silhouette Backdrop behind the title
const TopMountainBackdrop = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: '8%',
    right: '8%',
    height: '100px',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.18,
    overflow: 'hidden'
  }}>
    <svg width="100%" height="100" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none">
      <path d="M0 90 Q160 42 260 70 T520 38 T760 66 T1000 48 L1000 100 L0 100 Z" fill="#52B788" />
      <path d="M100 95 Q290 48 440 75 T720 52 T1000 70 L1000 100 L0 100 Z" fill="#2D6A4F" />
    </svg>
  </div>
);

// Leaf Ivy Corner Flourish SVG matching the reference image's parchment scroll
const CardCornerLeaves = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 52 52"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '8px' : 'auto',
        bottom: position.includes('bottom') ? '8px' : 'auto',
        left: position.includes('left') ? '8px' : 'auto',
        right: position.includes('right') ? '8px' : 'auto',
        transform: transforms[position],
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <path d="M6 6 C18 9, 28 18, 32 30 C34 36, 32 44, 28 50" stroke="#1B4D3E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 12 C18 9, 25 12, 26 18 C27 23, 21 26, 16 23 C12 20, 9 15, 12 12 Z" fill="#1B4D3E" />
      <path d="M22 22 C29 19, 36 22, 37 28 C37 33, 31 36, 26 33 C21 30, 19 25, 22 22 Z" fill="#2D6A4F" />
      <path d="M8 25 C13 22, 19 24, 20 29 C20 33, 15 36, 11 34 C7 32, 6 27, 8 25 Z" fill="#40916C" />
      <path d="M7 38 C11 35, 16 37, 17 41 C17 45, 13 47, 9 45 C6 43, 5 40, 7 38 Z" fill="#1B4D3E" />
    </svg>
  );
};

// Ornate Botanical Divider in Card (matching the reference image)
const CardLeafDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    width: '100%',
    margin: 'clamp(6px, 1.1vh, 12px) 0'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, #2D6A4F)' }} />
    <svg width="34" height="18" viewBox="0 0 40 22" fill="none">
      <path d="M20 20 C20 12, 20 4, 20 2" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10 C14 7, 7 10, 6 15 C7 19, 13 19, 18 15 C20 13, 20 11, 20 10 Z" fill="#2D6A4F" />
      <path d="M20 10 C26 7, 33 10, 34 15 C33 19, 27 19, 22 15 C20 13, 20 11, 20 10 Z" fill="#40916C" />
    </svg>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #2D6A4F, transparent)' }} />
  </div>
);

// Royal Burnished Gold Corner Filigree for Ancient Manuscript Scroll
const RoyalCornerOrnament = ({ position = 'top-left' }) => {
  const transforms = {
    'top-left': 'none',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)'
  };
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 64 64"
      fill="none"
      style={{
        position: 'absolute',
        top: position.includes('top') ? '7px' : 'auto',
        bottom: position.includes('bottom') ? '7px' : 'auto',
        left: position.includes('left') ? '7px' : 'auto',
        right: position.includes('right') ? '7px' : 'auto',
        transform: transforms[position],
        opacity: 0.42,
        pointerEvents: 'none',
        zIndex: 3
      }}
    >
      <path d="M6 34 C6 18, 18 6, 34 6" stroke="rgba(254, 240, 138, 0.8)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 42 C12 24, 24 12, 42 12" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" />
      <polygon points="8,8 14,4 18,8 12,14" fill="rgba(254, 240, 138, 0.75)" />
      <circle cx="8" cy="8" r="2.5" fill="rgba(217, 119, 6, 0.6)" />
      <path d="M18 18 C24 12, 34 16, 36 24 C30 26, 22 22, 18 18 Z" fill="rgba(254, 240, 138, 0.65)" />
      <path d="M18 18 C12 24, 16 34, 24 36 C26 30, 22 22, 18 18 Z" fill="rgba(255, 255, 255, 0.5)" />
      <circle cx="34" cy="34" r="2" fill="rgba(254, 240, 138, 0.8)" />
    </svg>
  );
};

// Royal Centerpiece Lotus & Sunbeam Gold Divider
const RoyalParchmentDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '84%',
    margin: 'clamp(6px, 1.2vh, 12px) auto'
  }}>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.6))' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ fontSize: '10px', color: '#FEF08A' }}>✦</span>
      <svg width="32" height="18" viewBox="0 0 40 22" fill="none">
        <path d="M20 2 C16 9, 8 13, 2 15 C8 17, 16 21, 20 21 C24 21, 32 17, 38 15 C32 13, 24 9, 20 2 Z" fill="#F59E0B" />
        <circle cx="20" cy="13" r="3.2" fill="#78350F" />
        <circle cx="20" cy="13" r="1.6" fill="#FEF3C7" />
      </svg>
      <span style={{ fontSize: '10px', color: '#FEF08A' }}>✦</span>
    </div>
    <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, rgba(254, 240, 138, 0.6), transparent)' }} />
  </div>
);

// Bottom Nature Silhouette Panorama with trees, deer, birds, and meadow waves (matching reference poster)
const BottomNatureSilhouettes = () => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '56px',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0.32,
    zIndex: 1
  }}>
    <svg width="100%" height="56" viewBox="0 0 1200 56" preserveAspectRatio="none" fill="none">
      {/* Rolling Meadow Grassy Banks */}
      <path d="M0 42 Q220 26 440 38 T880 32 T1200 40 L1200 56 L0 56 Z" fill="#52B788" />
      <path d="M0 46 Q320 34 640 44 T1200 38 L1200 56 L0 56 Z" fill="#2D6A4F" />
      
      {/* Left Trees */}
      <circle cx="110" cy="34" r="14" fill="#1B4D3E" />
      <circle cx="126" cy="30" r="10" fill="#1B4D3E" />
      <rect x="116" y="40" width="4" height="12" fill="#1B4D3E" />
      
      {/* Flying Birds Left */}
      <path d="M210 24 Q215 19 220 24 Q225 19 230 24" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M245 18 Q249 14 253 18 Q257 14 261 18" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Grass Tufts */}
      <path d="M350 42 L352 34 M352 42 L356 32 M354 42 L360 35" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M430 44 L432 36 M432 44 L436 34 M434 44 L440 37" stroke="#1B4D3E" strokeWidth="1.6" strokeLinecap="round" />
      
      {/* Flying Birds Right */}
      <path d="M820 22 Q825 17 830 22 Q835 17 840 22" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Leaping Deer Silhouette (Right side) */}
      <g transform="translate(895, 18) scale(0.65)">
        {/* Antlers */}
        <path d="M16 6 L22 0 M18 4 L23 3 M20 2 L25 1" stroke="#1B4D3E" strokeWidth="1.5" strokeLinecap="round" />
        {/* Head & Body */}
        <path d="M14 8 C16 6, 20 8, 18 12 L15 17 L8 18 C5 19, 2 22, 0 24 L2 28 L5 23 L14 22 L20 30 L22 30 L17 21 C22 20, 24 18, 22 14 Z" fill="#1B4D3E" />
        {/* Legs */}
        <path d="M14 20 L24 28 M16 20 L25 26" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 22 L-3 30 M3 22 L-1 31" stroke="#1B4D3E" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      
      {/* Right Trees & Pine */}
      <circle cx="1020" cy="30" r="16" fill="#1B4D3E" />
      <circle cx="1038" cy="26" r="12" fill="#1B4D3E" />
      <rect x="1026" y="38" width="5" height="14" fill="#1B4D3E" />
      
      <polygon points="1075,14 1065,30 1085,30" fill="#14452F" />
      <polygon points="1075,22 1062,38 1088,38" fill="#14452F" />
      <polygon points="1075,30 1058,46 1092,46" fill="#14452F" />
      <rect x="1073" y="46" width="4" height="8" fill="#14452F" />
    </svg>
  </div>
);

// Fact 1 & Fact 2 for Page 2
const PAGE_2_FACTS = [
  {
    badge: '01 · BIOSPHERE & HABITATS',
    title: 'Biomes & Habitats',
    icon: '🌍',
    image: biomesImage,
    alt: 'Diverse rainforest and freshwater aquatic biome with wildlife drinking at stream',
    desc: 'Organisms thrive across terrestrial, freshwater, desert, and alpine ecosystems, each uniquely adapted to their ecological niche.'
  },
  {
    badge: '02 · MORPHOLOGY & ADAPTATION',
    title: 'Adaptation & Survival',
    icon: '🐫',
    image: adaptationImage,
    alt: 'Camel exhibiting specialized desert survival adaptations in Thar desert',
    desc: 'Discover how organisms develop specialized anatomical traits over generations to flourish in harsh climatic extremes.'
  }
];

// Fact 3 & Fact 4 for Page 3
const PAGE_3_FACTS = [
  {
    badge: '03 · BOTANICAL TAXONOMY',
    title: 'Botanical Diversity',
    icon: '🌿',
    image: botanyImage,
    alt: 'Botanical classification of tender herbs, shrubs, tree saplings, and vines',
    desc: 'Classify herbs, shrubs, trees, leaf venation patterns, taproots vs fibrous roots, and monocot vs dicot seed cotyledons.'
  },
  {
    badge: '04 · ECOLOGY & CONSERVATION',
    title: 'Conservation & Ethics',
    icon: '🕊️',
    image: conservationImage,
    alt: 'Protected sacred grove in Western Ghats with ancient banyan trees and flying hornbill',
    desc: 'Learn how sacred groves and pioneering botanists like Dr. E.K. Janaki Ammal protected India’s irreplaceable biodiversity.'
  }
];

export default function Chapter2SloganPage({
  chapterNum = 2,
  title = "Diversity in the Living World",
  onBack,
  onEnterLab,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingSloganAudio, setIsPlayingSloganAudio] = useState(false);
  const [isPlayingMeaningAudio, setIsPlayingMeaningAudio] = useState(false);
  const [isPlayingWhyStudyAudio, setIsPlayingWhyStudyAudio] = useState(false);
  const [isSloganPopOpen, setIsSloganPopOpen] = useState(true);
  
  const sloganAudioRef = useRef(null);
  const meaningAudioRef = useRef(null);
  const whyStudyAudioRef = useRef(null);
  const containerRef = useRef(null);

  // Stop audio on page change or unmount
  useEffect(() => {
    return () => {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        sloganAudioRef.current = null;
      }
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        meaningAudioRef.current = null;
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        whyStudyAudioRef.current = null;
      }
      stopNarration();
      setIsPlayingSloganAudio(false);
      setIsPlayingMeaningAudio(false);
      setIsPlayingWhyStudyAudio(false);
    };
  }, [currentPage]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentPage < TOTAL_PAGES) {
          setCurrentPage(prev => prev + 1);
        } else if (onEnterLab) {
          onEnterLab();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else if (onBack) {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, onEnterLab, onBack]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Toggle Sanskrit Shloka recitation audio
  const toggleSloganAudio = () => {
    if (isPlayingSloganAudio) {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        sloganAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingSloganAudio(false);
    } else {
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        setIsPlayingMeaningAudio(false);
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        setIsPlayingWhyStudyAudio(false);
      }
      stopNarration();

      if (!sloganAudioRef.current) {
        sloganAudioRef.current = new Audio('/activities/ch2_slogan_voice.mp3');
        sloganAudioRef.current.onended = () => setIsPlayingSloganAudio(false);
        sloganAudioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Subhāshitam.",
            onEnd: () => setIsPlayingSloganAudio(false),
            onError: () => setIsPlayingSloganAudio(false)
          });
          setIsPlayingSloganAudio(true);
        };
      }
      sloganAudioRef.current.currentTime = 0;
      sloganAudioRef.current.play().then(() => {
        setIsPlayingSloganAudio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Subhāshitam.",
          onEnd: () => setIsPlayingSloganAudio(false),
          onError: () => setIsPlayingSloganAudio(false)
        });
        setIsPlayingSloganAudio(true);
      });
    }
  };

  // Toggle English Meaning narration audio
  const toggleMeaningAudio = () => {
    if (isPlayingMeaningAudio) {
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        meaningAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingMeaningAudio(false);
    } else {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        setIsPlayingSloganAudio(false);
      }
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        setIsPlayingWhyStudyAudio(false);
      }
      stopNarration();

      speakNaturalIndianMale({
        text: "Trees stand in the Sun and give shade to others. Their fruits are also for others. Likewise, good people bear all hardships and bring welfare to others. They give to others whatever they have earned.",
        onEnd: () => setIsPlayingMeaningAudio(false),
        onError: () => setIsPlayingMeaningAudio(false)
      });
      setIsPlayingMeaningAudio(true);
    }
  };

  // Toggle "Why study this chapter?" Voiceover
  const toggleWhyStudyAudio = () => {
    if (isPlayingWhyStudyAudio) {
      if (whyStudyAudioRef.current) {
        whyStudyAudioRef.current.pause();
        whyStudyAudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingWhyStudyAudio(false);
    } else {
      if (sloganAudioRef.current) {
        sloganAudioRef.current.pause();
        setIsPlayingSloganAudio(false);
      }
      if (meaningAudioRef.current) {
        meaningAudioRef.current.pause();
        setIsPlayingMeaningAudio(false);
      }
      stopNarration();

      if (!whyStudyAudioRef.current) {
        whyStudyAudioRef.current = new Audio('/activities/ch2_why_study_voice.mp3');
        whyStudyAudioRef.current.onended = () => setIsPlayingWhyStudyAudio(false);
        whyStudyAudioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Why study this chapter? In this chapter, we explore Diversity in the Living World. Just like the trees in this ancient verse selflessly support all other life by offering shade and food, every living organism is interconnected. Plants, animals, and humans depend on each other, forming a beautiful, cooperative web of life.",
            onEnd: () => setIsPlayingWhyStudyAudio(false),
            onError: () => setIsPlayingWhyStudyAudio(false)
          });
          setIsPlayingWhyStudyAudio(true);
        };
      }
      whyStudyAudioRef.current.currentTime = 0;
      whyStudyAudioRef.current.play().then(() => {
        setIsPlayingWhyStudyAudio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Why study this chapter? In this chapter, we explore Diversity in the Living World. Just like the trees in this ancient verse selflessly support all other life by offering shade and food, every living organism is interconnected. Plants, animals, and humans depend on each other, forming a beautiful, cooperative web of life.",
          onEnd: () => setIsPlayingWhyStudyAudio(false),
          onError: () => setIsPlayingWhyStudyAudio(false)
        });
        setIsPlayingWhyStudyAudio(true);
      });
    }
  };

  // Force-hide global floating music / volume button while slogan page is mounted
  useEffect(() => {
    const musicControls = document.getElementById('global-theme-music-controls');
    if (musicControls) {
      musicControls.style.setProperty('display', 'none', 'important');
    }
    return () => {
      if (musicControls) {
        musicControls.style.display = '';
      }
    };
  }, []);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
    } else if (onEnterLab) {
      onEnterLab();
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: currentPage === 1 ? '0px' : 'clamp(6px, 1.2vh, 16px) clamp(16px, 2.2vw, 32px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap');

        @keyframes biologyFadeIn {
          from { opacity: 0; transform: scale(0.992) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-bio-stage {
          animation: biologyFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* Force-hide global floating music / volume controls to prevent any corner overlap */
        #global-theme-music-controls {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          opacity: 0 !important;
        }
        .bio-nav-btn {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          border: 1.8px solid rgba(255, 255, 255, 0.35);
          border-radius: 12px;
          padding: 9px 24px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15);
          position: relative;
          overflow: hidden;
          z-index: 10;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.65);
        }
        .bio-nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg);
          transition: 0.5s ease;
          pointer-events: none;
        }
        .bio-nav-btn:hover:not(:disabled)::before {
          left: 140%;
        }
        .bio-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.14) 100%);
          color: #FFFDF0;
          border-color: #FBBF24;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 0 20px rgba(245, 158, 11, 0.5);
        }
        .bio-nav-btn:active:not(:disabled) {
          transform: translateY(1px) scale(0.99);
        }
        .bio-nav-btn:disabled {
          opacity: 0.28;
          cursor: not-allowed;
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.45);
          box-shadow: none;
        }
        .bio-cta-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.8px solid #FDE68A;
          border-radius: 12px;
          padding: 9px 28px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(217, 119, 6, 0.5), 0 0 16px rgba(245, 158, 11, 0.4);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }
        .bio-cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: skewX(-20deg);
          transition: 0.5s ease;
          pointer-events: none;
        }
        .bio-cta-btn:hover::before {
          left: 140%;
        }
        .bio-cta-btn:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #B45309 100%);
          border-color: #FFFFFF;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(217, 119, 6, 0.7), 0 0 22px rgba(245, 158, 11, 0.6);
        }
        .bio-photo-box {
          flex: 0 0 65%;
          width: 65%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45), inset 0 0 0 2px rgba(212, 175, 55, 0.35);
          border: 2.5px solid #D4AF37;
          background: #071A11;
          position: relative;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-photo-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.55), 0 0 30px rgba(245, 158, 11, 0.35), inset 0 0 0 2.5px rgba(245, 158, 11, 0.6);
          border-color: #F59E0B;
        }
        .bio-shloka-box {
          flex: 0 0 clamp(380px, 35vw, 490px);
          width: clamp(380px, 35vw, 490px);
          max-height: 94%;
          align-self: center;
          background: rgba(15, 23, 42, 0.38);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1.5px 2px rgba(255, 255, 255, 0.50), 0 0 20px rgba(254, 240, 138, 0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          padding: clamp(16px, 2.2vh, 26px) clamp(18px, 2vw, 26px);
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-shloka-box:hover {
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.48);
          border-color: rgba(254, 240, 138, 0.75);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.55), inset 0 1.5px 2px rgba(255, 255, 255, 0.65), 0 0 25px rgba(245, 158, 11, 0.30);
        }
        .bio-glass-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0.08) 100%);
          pointer-events: none;
          opacity: 0.4;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          z-index: 5;
        }
        .bio-shloka-box:hover .bio-glass-glare,
        .bio-photo-box:hover .bio-glass-glare {
          opacity: 0.95;
        }
        .bio-quote-pill {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #FEF3C7;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 22px;
          padding: 6px 24px;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 16px;
          letterSpacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .bio-quote-pill:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.12) 100%);
          border-color: #F59E0B;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 16px rgba(245, 158, 11, 0.4);
        }
        .bio-voice-inline-btn {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #FFFFFF;
          border: 1.5px solid #FDE68A;
          border-radius: 18px;
          padding: 5px 14px;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 10px rgba(217, 119, 6, 0.4);
          transition: all 0.2s ease;
        }
        .bio-voice-inline-btn:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #B45309 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.55);
        }
        .bio-fact-column {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }
        .bio-fact-image-frame {
          width: 100%;
          flex: 1 1 56%;
          min-height: 150px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35), inset 0 0 0 2px rgba(212, 175, 55, 0.35);
          background: #0B3B24;
          border: 2px solid #D4AF37;
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-fact-image-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.45), 0 0 24px rgba(245, 158, 11, 0.35);
          border-color: #F59E0B;
        }
        .bio-fact-card {
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1.8px solid #D4AF37;
          border-radius: 20px;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          padding: clamp(12px, 1.6vh, 18px) clamp(16px, 1.8vw, 22px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 0 0 auto;
          text-align: justify;
          text-justify: inter-word;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bio-fact-card:hover {
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.55);
          border-color: #F59E0B;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 0 0 22px rgba(245, 158, 11, 0.35);
        }
      `}</style>

      {/* ============================================================ */}
      {/* FULLSCREEN LIVING ECOSYSTEM BACKGROUND IMAGE                 */}
      {/* ============================================================ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#04130B'
      }}>
        <img
          src={cinematicLivingNatureImage}
          alt="Living Ecosystem - Diversity in the Living World"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            imageRendering: '-webkit-optimize-contrast',
            imageRendering: 'high-quality',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        />
        {/* Soft atmospheric gradient only on Pages 2 and 3 */}
        {currentPage > 1 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.35) 0%, rgba(10, 20, 15, 0.6) 100%)',
            pointerEvents: 'none'
          }} />
        )}
      </div>

      {/* Floating Fullscreen Control for Page 1 (Top-Right) */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          zIndex: 35
        }}>
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#FEF3C7',
              border: '1.8px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F59E0B';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      )}

      {/* Page 1 Bottom-Left: Back Button */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '24px',
          zIndex: 35
        }}>
          <button
            type="button"
            className="bio-nav-btn"
            onClick={onBack}
            aria-label="Back to Cover"
            style={{
              padding: '7px 20px',
              fontSize: '14px',
              borderRadius: '10px'
            }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Page 1 Bottom-Right: Next Page Button */}
      {currentPage === 1 && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '24px',
          zIndex: 35
        }}>
          <button
            type="button"
            className="bio-cta-btn"
            onClick={handleNext}
            aria-label="Next Page"
            style={{
              padding: '7px 22px',
              fontSize: '14px',
              borderRadius: '10px'
            }}
          >
            <span>Next Page</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* TOP HEADER: VISIBLE ON PAGES 2 & 3 ("Why Study This Chapter?")*/}
      {/* ============================================================ */}
      {currentPage > 1 && (
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1380px',
          textAlign: 'center',
          flexShrink: 0,
          marginBottom: 'clamp(3px, 0.7vh, 8px)',
          zIndex: 20
        }}>
          {/* Top Right Controls: Voiceover & Fullscreen Button */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 30
          }}>
            <button
              type="button"
              className="bio-voice-inline-btn"
              onClick={toggleWhyStudyAudio}
              style={{
                background: isPlayingWhyStudyAudio ? '#047857' : '#F59E0B',
                padding: '6px 14px',
                fontSize: '16px',
                borderRadius: '10px'
              }}
            >
              {isPlayingWhyStudyAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingWhyStudyAudio ? 'Stop' : 'Voiceover'}</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: '#FEF3C7',
                border: '1.8px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 10px rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Top Badges: CLASS 6 • SCIENCE and CHAPTER 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '6px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#FEF3C7',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '20px',
              padding: '4px 18px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 12px rgba(245, 158, 11, 0.2)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.65)'
            }}>
              CLASS 6 • SCIENCE
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#FEF3C7',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '20px',
              padding: '4px 18px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 12px rgba(245, 158, 11, 0.2)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.65)'
            }}>
              CHAPTER 2
            </div>
          </div>

          {/* Main Title Flanked by Golden Vines */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <TitleVineBranch side="left" />
            <h1 style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 900,
              fontSize: 'clamp(26px, 2.3vw, 34px)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FEF08A 25%, #F59E0B 65%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 22px rgba(245, 158, 11, 0.45))'
            }}>
              Why Study This Chapter?
            </h1>
            <TitleVineBranch side="right" />
          </div>
          <TitleSprout />
        </div>
      )}

      {/* ============================================================ */}
      {/* PAGE 1: FULLSCREEN LIVING ECOSYSTEM WITH SANSKRIT SLOGAN     */}
      {/* (NO POP-UP BOX, NO TITLE, INTERACTIVE AUDIO HOTSPOTS)        */}
      {/* ============================================================ */}
      {currentPage === 1 && (
        <div
          className="animate-bio-stage"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            flex: '1 1 auto',
            minHeight: 0,
            overflow: 'hidden',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* ============================================================ */}
      {/* PAGE 2: FACTS 1 & 2 (EACH WITH ITS OWN 8K REALISTIC IMAGE)   */}
      {/* ============================================================ */}
      {currentPage === 2 && (
        <div
          className="animate-bio-stage"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1380px',
            flex: '1 1 auto',
            minHeight: 0,
            display: 'flex',
            alignItems: 'stretch',
            gap: '16px',
            overflow: 'hidden',
            zIndex: 10
          }}
        >
          {PAGE_2_FACTS.map((fact, idx) => (
            <div key={idx} className="bio-fact-column">
              <div className="bio-fact-image-frame">
                <img
                  src={fact.image}
                  alt={fact.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    imageRendering: 'high-quality'
                  }}
                />
              </div>

              <div className="bio-fact-card">
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: '1.2px solid #FDE68A',
                      padding: '4px 18px',
                      borderRadius: '20px',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                    }}>
                      {fact.badge}
                    </span>
                    <span style={{ fontSize: '24px' }}>{fact.icon}</span>
                  </div>

                  <h4 style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 900,
                    color: '#FBBF24',
                    fontSize: '22px',
                    margin: '6px 0 6px 0',
                    lineHeight: 1.2,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    {fact.title}
                  </h4>

                  <div style={{
                    height: '1.5px',
                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                    margin: '6px 0 8px 0',
                    opacity: 0.6
                  }} />
                </div>

                <p style={{
                  position: 'relative',
                  zIndex: 5,
                  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  color: '#F8FAFC',
                  fontSize: '16px',
                  lineHeight: 1.55,
                  margin: 0,
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {fact.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* PAGE 3: FACTS 3 & 4 (EACH WITH ITS OWN 8K REALISTIC IMAGE)   */}
      {/* ============================================================ */}
      {currentPage === 3 && (
        <div
          className="animate-bio-stage"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1380px',
            flex: '1 1 auto',
            minHeight: 0,
            display: 'flex',
            alignItems: 'stretch',
            gap: '16px',
            overflow: 'hidden',
            zIndex: 10
          }}
        >
          {PAGE_3_FACTS.map((fact, idx) => (
            <div key={idx} className="bio-fact-column">
              <div className="bio-fact-image-frame">
                <img
                  src={fact.image}
                  alt={fact.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    imageRendering: 'high-quality'
                  }}
                />
              </div>

              <div className="bio-fact-card">
                <CardCornerLeaves position="top-right" />
                <CardCornerLeaves position="bottom-left" />

                <div style={{ position: 'relative', zIndex: 5 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: '1.2px solid #FDE68A',
                      padding: '4px 18px',
                      borderRadius: '20px',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: '16px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                    }}>
                      {fact.badge}
                    </span>
                    <span style={{ fontSize: '24px' }}>{fact.icon}</span>
                  </div>

                  <h4 style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 900,
                    color: '#FBBF24',
                    fontSize: '22px',
                    margin: '6px 0 6px 0',
                    lineHeight: 1.2,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                  }}>
                    {fact.title}
                  </h4>

                  <div style={{
                    height: '1.5px',
                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                    margin: '6px 0 8px 0',
                    opacity: 0.6
                  }} />
                </div>

                <p style={{
                  position: 'relative',
                  zIndex: 5,
                  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  color: '#F8FAFC',
                  fontSize: '16px',
                  lineHeight: 1.55,
                  margin: 0,
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {fact.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* BOTTOM NAVIGATION BAR: VISIBLE ONLY ON PAGES 2 & 3           */}
      {/* ============================================================ */}
      {currentPage > 1 && (
        <div style={{
          width: '100%',
          maxWidth: '1380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          marginTop: 'clamp(6px, 1.2vh, 12px)',
          padding: '0 4px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 25
        }}>
          {/* Left Navigation Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              className="bio-nav-btn"
              onClick={onBack}
              aria-label="Back to Cover"
            >
              ← Back
            </button>

            <button
              type="button"
              className="bio-nav-btn"
              disabled={currentPage === 1}
              onClick={handlePrev}
              aria-label="Previous Page"
            >
              ← Previous Page
            </button>
          </div>

          {/* Center Decorative Leaves Motif (Clean & elegant, without page text) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <svg width="22" height="15" viewBox="0 0 24 16" fill="none" style={{ transform: 'scaleX(-1)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 12, 2 14 Z" fill="#D97706" />
              <path d="M6 10 C10 6, 16 4, 22 2 C18 8, 12 10, 6 10 Z" fill="#F59E0B" />
            </svg>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.8px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5), 0 0 10px rgba(245, 158, 11, 0.3)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FEF3C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <svg width="22" height="15" viewBox="0 0 24 16" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <path d="M2 14 C8 12, 16 10, 22 2 C18 8, 12 12, 2 14 Z" fill="#D97706" />
              <path d="M6 10 C10 6, 16 4, 22 2 C18 8, 12 10, 6 10 Z" fill="#F59E0B" />
            </svg>
          </div>

          {/* Right Navigation Button */}
          <div>
            {currentPage === TOTAL_PAGES ? (
              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleNext}
                aria-label="Explore Diversity in the Living World"
              >
                <span>🌿 Explore the Living World!</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <button
                type="button"
                className="bio-cta-btn"
                onClick={handleNext}
                aria-label="Next Page"
              >
                <span>Next Page</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
