import React, { useState, useRef, useEffect, useMemo } from 'react';
import sce5Img from './DiversityInTheLivingWorldNew/images/ch2_scene5_fullscreen.jpg';
import { useTheme } from '../../../../ThemeContext';
import useWordSyncAudio from './narration/useWordSyncAudio';
import narrationData from './narration/storytellerNarration.json';

// Real narration audio files (word-level timing lives in narration/storytellerNarration.json)
import audio07 from './narration/audio/07_MorningAtGreenValleySchool.mp3';
import audio08 from './narration/audio/08_NatureWalkBegins.mp3';
import audio09 from './narration/audio/09_ObservingHerbsAndShrubs.mp3';
import audio10 from './narration/audio/10_BirdSounds.mp3';
import audio11 from './narration/audio/11_ButterfliesAndFlowers.mp3';
import audio12 from './narration/audio/12_MonkeyInTheForest.mp3';
import audio13 from './narration/audio/13_RecordingObservations.mp3';

const SCENE_AUDIO = [audio07, audio08, audio09, audio10, audio11, audio12, audio13];

export default function IntroStoryteller({ onComplete, onBack }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { theme = 'light' } = useTheme() || {};
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scenes = [
    {
      img: "/Scene0_realistic.png",
      title: "🌅 A Beautiful Morning",
      text: "A beautiful morning welcomes us to the Green Valley School. The trees are fresh and green, and colourful butterflies move gently through the garden. All around us, nature is full of different forms of life. Let’s begin our journey to discover the amazing diversity of the living world.",
    },
    {
      img: "/Scene1_realistic.png",
      title: "🌱 The Nature Walk Begins",
      text: "The students are ready for an exciting nature walk. They are joined by Dr. Raghu, a scientist from the nearby research laboratory, and Maniram Chacha, who knows a lot about plants, animals, and bird calls. Their science teacher, Madam Sulekha, is also with them. As they enter the forest, Dr. Raghu reminds everyone to observe carefully. The students look around with curiosity, ready to discover the living world.",
    },
    {
      img: "/Scene2_realistic.png",
      title: "🌿 Observing Diverse Plants",
      text: "The students now take a closer look at the plants around them. Dr. Raghu points to a small herb with a soft green stem and then to a woody shrub. He asks the students to notice how different their stems feel. The students observe carefully and record what they find, without disturbing the plants.",
    },
    {
      img: "/Scene3_realistic.png",
      title: "🐦 Listening to Bird Calls",
      text: "The forest suddenly comes alive with the sounds of birds. Maniram Chacha listens carefully to their different calls and begins to mimic them. The students watch with excitement as the birds respond from the trees. They laugh and happily try to copy the bird calls too. Each bird has its own special sound, adding to the wonderful variety of life around them.",
    },
    {
      img: sce5Img,
      title: "🦋 Fluttering Insects & Butterflies",
      text: "The students continue their walk and notice colourful flowers around them. Butterflies move gently from flower to flower, while bees collect nectar. Students notice that one butterfly keeps visiting the same flower again and again. The students watch closely and become curious about the different ways living things interact with nature.",
    },
    {
      img: "/Scene4_realistic.png",
      title: "🐒 Animals in the Canopy & Stream",
      text: "The students continue exploring the forest with their notebooks and magnifying glasses. Dr. Raghu points towards something above the trees, and everyone looks up with curiosity. Maniram Chacha draws their attention to a monkey and reminds them that the forest is its home. The students carefully observe the animals and their surroundings, learning that every living creature has a place to live.",
    },
    {
      img: "/Scene6_color_matched.png",
      title: "📋 Recording in the Table",
      text: "After exploring the forest, the students gather together to share what they have discovered. They look through their notebooks and compare their findings. Dr. Raghu asks them to record their observations in Table 2.1 for plants and Table 2.2 for animals. The students discuss their findings with their classmates and learn how much variety they have seen during their nature walk.",
    }
  ];

  const totalScenes = scenes.length;
  const scene = scenes[currentScene];

  // Word-level timing data for the current scene's narration
  const sceneNarration = narrationData[String(currentScene)];
  const flatWords = useMemo(
    () => (sceneNarration ? sceneNarration.cues.flatMap(c => c.words) : []),
    [sceneNarration]
  );

  const { audioRef, activeWordIndex, isPlaying } = useWordSyncAudio(
    SCENE_AUDIO[currentScene],
    flatWords,
    { autoPlay: true }
  );

  // Which cue (sentence) is currently active, and the base word-index it starts at
  const { activeCue, activeCueBaseIndex } = useMemo(() => {
    if (!sceneNarration) return { activeCue: null, activeCueBaseIndex: 0 };
    let base = 0;
    for (const cue of sceneNarration.cues) {
      if (activeWordIndex >= base && activeWordIndex < base + cue.words.length) {
        return { activeCue: cue, activeCueBaseIndex: base };
      }
      base += cue.words.length;
    }
    // Before narration starts or between cues: show the first cue
    return { activeCue: sceneNarration.cues[0], activeCueBaseIndex: 0 };
  }, [sceneNarration, activeWordIndex]);

  useEffect(() => {
    setImgLoaded(false);
  }, [currentScene]);

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
          ref={(el) => {
            if (el && el.complete && !imgLoaded) {
              setImgLoaded(true);
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.4s ease',
            opacity: imgLoaded ? 1 : 0,
            filter: 'none'
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

      {/* Scene Subtitles with real-narration word-by-word highlight */}
      {activeCue && (
        <div
          className="story-subtitle-wrapper"
          style={{
            position: 'absolute',
            bottom: 'clamp(5.2rem, 10vh, 6.8rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            maxWidth: 'min(1260px, calc(100vw - 4rem))',
            boxSizing: 'border-box',
            zIndex: 15,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '7px 22px',
            background: 'rgba(10, 18, 32, 0.72)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
          }}
        >
          <style>{`
            @keyframes subTextFade {
              0% { opacity: 0; transform: translateY(4px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .story-subtitle-text,
            .story-subtitle-wrapper .story-subtitle-text {
              text-align: center !important;
              text-align-last: center !important;
              justify-content: center !important;
            }
          `}</style>
          <div
            key={`${currentScene}-${activeCueBaseIndex}`}
            className="story-subtitle-text"
            style={{
              margin: 0,
              width: '100%',
              fontSize: 'clamp(15px, 1.35vw, 19.5px)',
              fontWeight: '700',
              lineHeight: '1.4',
              fontFamily: '"Playfair Display", Georgia, serif',
              textAlign: 'center',
              textAlignLast: 'center',
              whiteSpace: 'normal',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              letterSpacing: '0.015em',
              animation: 'subTextFade 0.35s ease-out'
            }}
          >
            {activeCue.words.map((w, i) => {
              const globalIdx = activeCueBaseIndex + i;
              const isActive = globalIdx === activeWordIndex;
              return (
                <span
                  key={globalIdx}
                  style={{
                    display: 'inline-block',
                    color: isActive ? '#FFFFFF' : '#FDE047',
                    background: isActive ? 'rgba(16, 185, 129, 0.90)' : 'transparent',
                    borderRadius: isActive ? '6px' : 0,
                    padding: isActive ? '2px 7px' : '0 1px',
                    margin: '0 3px',
                    boxShadow: isActive ? '0 0 12px rgba(52, 211, 153, 0.7)' : 'none',
                    textShadow: isActive
                      ? '0 2px 6px rgba(0,0,0,0.9)'
                      : '0 2px 4px rgba(0, 0, 0, 1), 0 0 14px rgba(0, 0, 0, 0.95)',
                    transition: 'background 0.12s ease, color 0.12s ease',
                  }}
                >
                  {w.word}
                </span>
              );
            })}
          </div>
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
              backdropFilter: 'blur(4px)',
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
              backdropFilter: 'blur(4px)',
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
