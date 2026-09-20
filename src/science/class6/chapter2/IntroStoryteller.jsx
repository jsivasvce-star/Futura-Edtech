import React, { useState, useRef, useEffect } from 'react';
import sce5Img from '../../../assets/sce_5.png';
import { useTheme } from '../../../ThemeContext';

const SCENE_SUBTITLES = {
  0: {
    totalDuration: 23.0,
    cues: [
      { id: 0, text: "A beautiful morning welcomes us to Green Valley School.", duration: 4.5 },
      { id: 1, text: "The trees are fresh and green,", duration: 3.5 },
      { id: 2, text: "and colourful butterflies move gently through the garden.", duration: 4.5 },
      { id: 3, text: "All around us, nature is full of different forms of life.", duration: 5.0 },
      { id: 4, text: "Let’s begin our journey to discover the living world.", duration: 5.5 }
    ]
  },
  1: {
    totalDuration: 26.0,
    cues: [
      { id: 0, text: "The students are ready for an exciting nature walk.", duration: 4.2 },
      { id: 1, text: "They are joined by Dr. Raghu from the research lab,", duration: 4.6 },
      { id: 2, text: "and Maniram Chacha, who knows bird calls and animals.", duration: 4.8 },
      { id: 3, text: "Their science teacher, Madam Sulekha, is also with them.", duration: 4.2 },
      { id: 4, text: "As they enter the forest, Dr. Raghu asks all to observe.", duration: 4.2 },
      { id: 5, text: "The students look around with curiosity and wonder.", duration: 4.0 }
    ]
  },
  2: {
    totalDuration: 24.0,
    cues: [
      { id: 0, text: "The students take a closer look at the plants around them.", duration: 4.5 },
      { id: 1, text: "Dr. Raghu points to a small herb with a soft green stem,", duration: 4.8 },
      { id: 2, text: "and then to a woody shrub.", duration: 3.2 },
      { id: 3, text: "He asks the students to notice how different stems feel.", duration: 4.5 },
      { id: 4, text: "The students observe carefully and record what they find,", duration: 4.2 },
      { id: 5, text: "without disturbing the plants.", duration: 2.8 }
    ]
  },
  3: {
    totalDuration: 26.0,
    cues: [
      { id: 0, text: "The forest suddenly comes alive with the sounds of birds.", duration: 4.5 },
      { id: 1, text: "Maniram Chacha listens carefully to their different calls,", duration: 4.5 },
      { id: 2, text: "and begins to mimic them.", duration: 3.0 },
      { id: 3, text: "The students watch with excitement,", duration: 3.2 },
      { id: 4, text: "as the birds respond from the trees.", duration: 3.5 },
      { id: 5, text: "They laugh and happily try to copy the bird calls too.", duration: 4.2 },
      { id: 6, text: "Each bird has its own special sound,", duration: 3.2 },
      { id: 7, text: "adding to the wonderful variety of life around them.", duration: 4.9 }
    ]
  },
  4: {
    totalDuration: 24.0,
    cues: [
      { id: 0, text: "The students continue their walk,", duration: 3.2 },
      { id: 1, text: "and notice colourful flowers all around them.", duration: 4.2 },
      { id: 2, text: "Butterflies move gently from flower to flower,", duration: 4.2 },
      { id: 3, text: "while bees collect sweet nectar.", duration: 3.4 },
      { id: 4, text: "Students notice that one butterfly,", duration: 3.2 },
      { id: 5, text: "keeps visiting the same flower again and again.", duration: 4.5 },
      { id: 6, text: "The students watch closely and become curious,", duration: 4.2 },
      { id: 7, text: "about how living things interact with nature.", duration: 4.1 }
    ]
  },
  5: {
    totalDuration: 26.0,
    cues: [
      { id: 0, text: "The students continue exploring the forest,", duration: 3.5 },
      { id: 1, text: "with their notebooks and magnifying glasses.", duration: 4.0 },
      { id: 2, text: "Dr. Raghu points towards something above the trees,", duration: 4.5 },
      { id: 3, text: "and everyone looks up with curiosity.", duration: 3.5 },
      { id: 4, text: "Maniram Chacha draws their attention to a monkey,", duration: 4.2 },
      { id: 5, text: "and reminds them that the forest is its home.", duration: 4.0 },
      { id: 6, text: "They carefully observe the animals and their surroundings,", duration: 4.5 },
      { id: 7, text: "learning that every creature has a place to live.", duration: 4.8 }
    ]
  },
  6: {
    totalDuration: 26.0,
    cues: [
      { id: 0, text: "After exploring the forest, the students gather together,", duration: 4.5 },
      { id: 1, text: "to share what they have discovered.", duration: 3.2 },
      { id: 2, text: "They look through notebooks and compare their findings.", duration: 4.2 },
      { id: 3, text: "Dr. Raghu asks them to record their observations,", duration: 4.0 },
      { id: 4, text: "in Table 2.1 for plants and Table 2.2 for animals.", duration: 4.5 },
      { id: 5, text: "The students discuss their findings with classmates,", duration: 4.2 },
      { id: 6, text: "and learn how much variety they have seen today.", duration: 4.4 }
    ]
  }
};

export default function IntroStoryteller({ onComplete, onBack }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const dialogueTimerRef = useRef(null);
  const { theme = 'light' } = useTheme() || {};
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Subtitle state (supports Scene 1 and Scene 2)
  const [subtitleElapsed, setSubtitleElapsed] = useState(0);
  const [isSubtitlePaused, setIsSubtitlePaused] = useState(false);
  const [activeCueIdx, setActiveCueIdx] = useState(0);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const elapsedRef = useRef(0);
  const isPausedRef = useRef(false);

  const currentSubtitles = SCENE_SUBTITLES[currentScene];

  useEffect(() => {
    isPausedRef.current = isSubtitlePaused;
  }, [isSubtitlePaused]);

  useEffect(() => {
    const subData = SCENE_SUBTITLES[currentScene];
    if (!subData) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      elapsedRef.current = 0;
      setSubtitleElapsed(0);
      setActiveCueIdx(0);
      return;
    }

    elapsedRef.current = 0;
    setSubtitleElapsed(0);
    setActiveCueIdx(0);
    setIsSubtitlePaused(false);
    isPausedRef.current = false;
    lastTimeRef.current = performance.now();

    const loop = (now) => {
      const delta = Math.min(0.1, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      if (!isPausedRef.current) {
        elapsedRef.current = Math.min(subData.totalDuration, elapsedRef.current + delta);
        setSubtitleElapsed(elapsedRef.current);

        let acc = 0;
        let cue = subData.cues.length - 1;
        for (let i = 0; i < subData.cues.length; i++) {
          acc += subData.cues[i].duration;
          if (elapsedRef.current < acc) {
            cue = i;
            break;
          }
        }
        setActiveCueIdx(cue);
      }

      if (elapsedRef.current < subData.totalDuration || !isPausedRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentScene]);

  const scenes = [
    {
      img: "/Scene0_realistic.png",
      title: "🌅 A Beautiful Morning",
      text: "A beautiful morning welcomes us to the Green Valley School. The trees are fresh and green, and colourful butterflies move gently through the garden. All around us, nature is full of different forms of life. Let’s begin our journey to discover the amazing diversity of the living world.",
      dialogues: []
    },
    {
      img: "/Scene1_realistic.png",
      title: "🌱 The Nature Walk Begins",
      text: "The students are ready for an exciting nature walk. They are joined by Dr. Raghu, a scientist from the nearby research laboratory, and Maniram Chacha, who knows a lot about plants, animals, and bird calls. Their science teacher, Madam Sulekha, is also with them. As they enter the forest, Dr. Raghu reminds everyone to observe carefully. The students look around with curiosity, ready to discover the living world.",
      dialogues: []
    },
    {
      img: "/Scene2_realistic.png",
      title: "🌿 Observing Diverse Plants",
      text: "The students now take a closer look at the plants around them. Dr. Raghu points to a small herb with a soft green stem and then to a woody shrub. He asks the students to notice how different their stems feel. The students observe carefully and record what they find, without disturbing the plants.",
      dialogues: []
    },
    {
      img: "/Scene3_realistic.png",
      title: "🐦 Listening to Bird Calls",
      text: "The forest suddenly comes alive with the sounds of birds. Maniram Chacha listens carefully to their different calls and begins to mimic them. The students watch with excitement as the birds respond from the trees. They laugh and happily try to copy the bird calls too. Each bird has its own special sound, adding to the wonderful variety of life around them.",
      dialogues: []
    },
    {
      img: sce5Img,
      title: "🦋 Fluttering Insects & Butterflies",
      text: "The students continue their walk and notice colourful flowers around them. Butterflies move gently from flower to flower, while bees collect nectar. Students notice that one butterfly keeps visiting the same flower again and again. The students watch closely and become curious about the different ways living things interact with nature.",
      dialogues: []
    },
    {
      img: "/Scene4_realistic.png",
      title: "🐒 Animals in the Canopy & Stream",
      text: "The students continue exploring the forest with their notebooks and magnifying glasses. Dr. Raghu points towards something above the trees, and everyone looks up with curiosity. Maniram Chacha draws their attention to a monkey and reminds them that the forest is its home. The students carefully observe the animals and their surroundings, learning that every living creature has a place to live.",
      dialogues: []
    },
    {
      img: "/Scene6_color_matched.png",
      title: "📋 Recording in the Table",
      text: "After exploring the forest, the students gather together to share what they have discovered. They look through their notebooks and compare their findings. Dr. Raghu asks them to record their observations in Table 2.1 for plants and Table 2.2 for animals. The students discuss their findings with their classmates and learn how much variety they have seen during their nature walk.",
      dialogues: []
    }
  ];

  const totalScenes = scenes.length;
  const scene = scenes[currentScene];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearTimeout(dialogueTimerRef.current);
    setDialogueStep(0);
    setImgLoaded(false);

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearTimeout(dialogueTimerRef.current);
    };
  }, [currentScene]);

  useEffect(() => {
    let active = true;

    if (dialogueStep < scene.dialogues.length) {
      const dlg = scene.dialogues[dialogueStep];
      const nextStep = () => {
        if (active) {
          clearTimeout(dialogueTimerRef.current);
          setDialogueStep(p => p + 1);
        }
      };

      const readingDuration = Math.max(2500, Math.min(4200, dlg.text.length * 50));
      dialogueTimerRef.current = setTimeout(nextStep, readingDuration);
    }

    return () => {
      active = false;
      clearTimeout(dialogueTimerRef.current);
    };
  }, [dialogueStep, currentScene, scene.dialogues]);

  const handleNext = () => { 
    if (currentScene < totalScenes - 1) {
      setCurrentScene(prev => prev + 1); 
    } else if (onComplete) {
      onComplete(); 
    }
  };

  const handlePrev = () => { 
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1); 
    }
  };

  // Keyboard navigation for scenes
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, totalScenes, onComplete]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: 'none',
        background: '#0a1220',
        cursor: 'default',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
      }}>
      
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <img
          key={scene.img}
          src={scene.img}
          alt={scene.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease',
            opacity: imgLoaded ? 1 : 0
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: (currentScene <= 5)
            ? 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,0.35) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.68) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

      </div>

      {/* Scene Index Indicator */}
      <div style={{
        position: 'absolute', top: '1rem', left: 'clamp(1rem, 2.5vw, 1.5rem)', zIndex: 12,
        background: '#14452F',
        border: '1.5px solid #10B981',
        borderRadius: '20px', padding: '0.4rem 1.1rem',
        fontSize: '14.5px', fontWeight: '800', color: '#D1FAE5',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        fontFamily: '"Outfit", sans-serif',
        boxShadow: '0 4px 12px rgba(20, 69, 47, 0.35)'
      }}>
        Class 6 · Scene {currentScene + 1} of {totalScenes}
      </div>

      {/* Scene Subtitles: Overlay without green box, font size 30px, Playfair Display */}
      {currentSubtitles && (
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(5.4rem, 10vh, 6.8rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'max-content',
            maxWidth: 'calc(100% - 2.5rem)',
            zIndex: 15,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1rem'
          }}
        >
          <style>{`
            @keyframes subTextFade {
              0% { opacity: 0; transform: translateY(4px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <p
            key={`${currentScene}-${activeCueIdx}`}
            style={{
              margin: 0,
              fontSize: '30px',
              fontWeight: '700',
              lineHeight: '1.3',
              color: '#FDE047',
              fontFamily: '"Playfair Display", Georgia, serif',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 1), 0 0 16px rgba(0, 0, 0, 0.98), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 22px rgba(253, 224, 71, 0.4)',
              animation: 'subTextFade 0.35s ease-out'
            }}
          >
            {currentSubtitles.cues[activeCueIdx]?.text}
          </p>
        </div>
      )}

      {/* Floating Bottom Left Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: '1.2rem',
        left: 'clamp(1rem, 2.5vw, 1.5rem)',
        zIndex: 16,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        {onBack && (
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onBack(); }}
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '15px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.8px solid #14452F',
              background: 'rgba(250, 248, 242, 0.85)',
              backdropFilter: 'blur(2px)',
              color: '#14452F',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.25)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: '"Outfit", sans-serif'
            }}
          >
            ← Back to Slogan
          </button>
        )}
        {currentScene > 0 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '15px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.8px solid #14452F',
              background: 'rgba(250, 248, 242, 0.85)',
              backdropFilter: 'blur(2px)',
              color: '#14452F',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.25)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: '"Outfit", sans-serif'
            }}
          >
            ← Previous Scene
          </button>
        )}
      </div>

      {/* Floating Bottom Right Advance Button */}
      <div style={{
        position: 'absolute',
        bottom: '1.2rem',
        right: 'clamp(1rem, 2.5vw, 1.5rem)',
        zIndex: 16
      }}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{
            padding: '0.65rem 1.45rem',
            fontSize: '15px',
            fontWeight: '800',
            borderRadius: '10px',
            border: '1.5px solid #10B981',
            background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: '"Outfit", sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(74, 222, 128, 0.65), 0 6px 18px rgba(0,0,0,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(20, 69, 47, 0.35)';
          }}
        >
          {currentScene === 0 ? (
            <span>Next →</span>
          ) : (
            <span>{currentScene === totalScenes - 1 ? 'Next: Act 2.1 Plants →' : 'Next Scene →'}</span>
          )}
        </button>
      </div>
    </div>
  );
}
