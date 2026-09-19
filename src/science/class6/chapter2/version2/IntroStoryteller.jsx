import React, { useState, useRef, useEffect } from 'react';
import sce5Img from '../../../../assets/sce_5.png';
import { useTheme } from '../../../../ThemeContext';

export default function IntroStoryteller({ onComplete, onBack }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const dialogueTimerRef = useRef(null);
  const { theme = 'light' } = useTheme() || {};
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Ensure speech synthesis is completely stopped
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const scenes = [
    {
      img: "/Scene0_realistic.png",
      title: "🌅 A Beautiful Morning",
      text: "Yesterday's rain has made nature fresh and beautiful. Today, a new adventure begins!",
      dialogues: []
    },
    {
      img: "/Scene1_realistic.png",
      title: "🌱 The Nature Walk Begins",
      text: "Dr Raghu and Maniram chacha lead the students out of the classroom into a nearby patch of forest. The air is fresh and filled with the scent of wet soil and leaves. The kids are excited to discover what secrets the nature walk holds!",
      dialogues: [
        { character: "Dr. Raghu",      avatar: "👨‍🔬", text: "Observe carefully — every living thing has a story to tell!", top: '4.5rem', left: 'clamp(1.5rem, 3vw, 2.5rem)',  side: 'left' },
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "I know every tree here, children. Come, follow me!",         top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
    },
    {
      img: "/Scene2_realistic.png",
      title: "🌿 Observing Diverse Plants",
      text: "As they walk, they observe different kinds of plants. Some are small herbs growing close to the ground, others are bushy shrubs, and some are grand trees with thick trunks. Dr Raghu reminds them to observe gently without plucking any leaves or flowers.",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "This herb has a soft green stem. Can you feel how different it is from this woody shrub?", top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
    },
    {
      img: "/Scene3_realistic.png",
      title: "🐦 Listening to Bird Calls",
      text: "Hush! Maniram chacha stops and cups his ear. He mimics a bird song, and suddenly, a beautiful response is heard from the tree canopy! The students learn to listen to the unique calls of birds and respect their home.",
      dialogues: [
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "Shhh... *cups ear* ...listen... coo-koo-koo! 🎵", top: '4.5rem', left: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'left' },
        { character: "Priya",          avatar: "👧",    text: "It replied! The birds actually replied to chacha!",       top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
    },
    {
      img: sce5Img,
      title: "🦋 Fluttering Insects & Butterflies",
      text: "Near a cluster of wildflowers, butterflies and bees are busy gathering nectar. The students watch closely as a butterfly unfolds its delicate wings. They notice how insects play a vital role in helping flowers grow.",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "Yes — that is pollination! Insects help flowers reproduce.",         top: '4.5rem', left: 'clamp(1.5rem, 3vw, 2.5rem)',  side: 'left' },
        { character: "Arjun",     avatar: "👦",    text: "Sir! That butterfly keeps visiting the same flower again and again!", top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
    },
    {
      img: "/Scene4_realistic.png",
      title: "🐒 Animals in the Canopy & Stream",
      text: "A rustle in the branches reveals a monkey sitting in the trees, a kingfisher perched above the water, and a spotted deer drinking by the stream. The students learn that every creature has a unique habitat where it finds food, water, and shelter.",
      dialogues: [
        { character: "Dr. Raghu",      avatar: "👨‍🔬", text: "Look through the binoculars — a monkey and a kingfisher! And a spotted deer by the river!", top: '4.5rem', left: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'left' },
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "The treetops, riverbank, and forest floor are their habitats. Every animal has a home in nature.", top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
    },
    {
      img: "/Scene6_color_matched.png",
      title: "📋 Recording in the Table",
      text: "The students take out their notebooks to record their observations in Tables 2.1 and 2.2. They separate their findings into plants and animals, marveling at the incredible diversity of life surrounding them!",
      dialogues: [
        { character: "Dr. Raghu",      avatar: "👨‍🔬", text: "Table 2.1 for plants, Table 2.2 for animals. Compare your findings with your classmates!", top: '4.5rem', left: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'left' },
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "Every plant and animal has its special place here in nature.", top: '4.5rem', right: 'clamp(1.5rem, 3vw, 2.5rem)', side: 'right' }
      ]
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
            opacity: imgLoaded ? 1 : 0,
            filter: currentScene === 4 ? 'saturate(0.85) hue-rotate(-6deg) brightness(1.02)' : 'none'
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
            padding: currentScene === 0 ? '0.75rem 1.85rem' : '0.65rem 1.45rem',
            fontSize: currentScene === 0 ? '16px' : '15px',
            fontWeight: '900',
            borderRadius: currentScene === 0 ? '30px' : '10px',
            border: currentScene === 0 ? '2px solid #86EFAC' : '1.5px solid #10B981',
            background: currentScene === 0
              ? 'linear-gradient(135deg, #15803D 0%, #166534 50%, #14532D 100%)'
              : 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: currentScene === 0
              ? '0 0 24px rgba(34, 197, 94, 0.65), 0 4px 14px rgba(0, 0, 0, 0.45)'
              : '0 4px 14px rgba(20, 69, 47, 0.35)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: currentScene === 0 ? '0.04em' : 'normal',
            textTransform: currentScene === 0 ? 'uppercase' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 32px rgba(74, 222, 128, 0.85), 0 8px 22px rgba(0,0,0,0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = currentScene === 0
              ? '0 0 24px rgba(34, 197, 94, 0.65), 0 4px 14px rgba(0, 0, 0, 0.45)'
              : '0 4px 14px rgba(20, 69, 47, 0.35)';
          }}
        >
          {currentScene === 0 ? (
            <>
              <span style={{ fontSize: '1.25rem' }}>🍃</span>
              <span>Let's Start Our Adventure! ➔</span>
            </>
          ) : (
            <span>{currentScene === totalScenes - 1 ? 'Next: Act 2.1 Plants →' : 'Next Scene →'}</span>
          )}
        </button>
      </div>
    </div>
  );
}
