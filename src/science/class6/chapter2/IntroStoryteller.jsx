import React, { useState, useRef, useEffect, useMemo } from 'react';
import sce5Img from '../../../assets/sce_5.png';
import { useTheme } from '../../../ThemeContext';

function speakIndianMaleNarrator(text, muteFlag, onEndCallback, onErrorCallback, onBoundaryCallback) {
  if (muteFlag || !('speechSynthesis' in window)) return null;
  window.speechSynthesis.cancel();

  // Natural pacing & educational pauses for Class 6 students
  let spokenText = text
    .replace(/—/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  const utt = new SpeechSynthesisUtterance(spokenText);
  utt.pitch = 0.98; // Natural, resonant adult male educator pitch
  utt.rate = 0.85;  // Slower, clear natural pacing for Class 6 comprehension (0.85x)
  utt.volume = 1.0;

  if (onEndCallback) utt.onend = onEndCallback;
  if (onErrorCallback) utt.onerror = onErrorCallback;
  if (onBoundaryCallback) {
    utt.onboundary = (e) => {
      if (e.name === 'word') {
        onBoundaryCallback(e);
      }
    };
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    // 1. Prioritize Indian English male voices (en-IN, hi-IN, Prabhat, Ravi, etc.)
    const indianVoices = voices.filter(v => 
      (v.lang && (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('hi-in') || v.lang.toLowerCase().includes('in'))) ||
      /india|indian|hindi|prabhat|ravi|veena|heera|neerja/i.test(v.name)
    );

    let matchedVoice = null;
    if (indianVoices.length > 0) {
      matchedVoice = indianVoices.find(v => /prabhat|ravi|male/i.test(v.name) && !/female|heera|neerja|veena/i.test(v.name));
      if (!matchedVoice) {
        matchedVoice = indianVoices.find(v => !/female|heera|neerja|veena/i.test(v.name));
      }
      if (!matchedVoice) {
        matchedVoice = indianVoices[0];
      }
    }

    if (!matchedVoice) {
      const englishMaleVoices = voices.filter(v => 
        v.lang && v.lang.startsWith('en') &&
        /male|david|mark|guy|james|george|alex|daniel|natural|online/i.test(v.name) &&
        !/female|zira|samantha|victoria|susan|karen|jessica|jenny/i.test(v.name)
      );
      matchedVoice = englishMaleVoices[0] || voices.find(v => v.lang && v.lang.startsWith('en')) || voices[0];
    }

    if (matchedVoice) {
      utt.voice = matchedVoice;
    }
  }

  window.speechSynthesis.speak(utt);
  return utt;
}

export default function IntroStoryteller({ onComplete, onBack }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isNarrationMuted, setIsNarrationMuted] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const dialogueTimerRef = useRef(null);
  const { theme = 'light' } = useTheme() || {};

  const scenes = [
    {
      img: "/Scene0_realistic.png",
      title: "🌿 Welcome to the Living World",
      text: "Welcome to Chapter 2: Diversity in the Living World! Step outside and look around — every tree, flower, bird, and insect is a unique living being. In this chapter, we embark on a nature walk to discover the incredible variety of life on Earth.",
      dialogues: []
    },
    {
      img: "/Scene1_realistic.png",
      title: "🌱 The Nature Walk Begins",
      text: "Dr Raghu and Maniram chacha lead the students out of the classroom into a nearby patch of forest. The air is fresh and filled with the scent of wet soil and leaves. The kids are excited to discover what secrets the nature walk holds!",
      dialogues: [
        { character: "Dr. Raghu",      avatar: "👨‍🔬", text: "Observe carefully — every living thing has a story to tell!",    top: '5%', left: '3%',  side: 'left' },
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "I know every tree here, children. Come, follow me!",            top: '5%', right: '3%', side: 'right' }
      ]
    },
    {
      img: "/Scene2_realistic.png",
      title: "🌿 Observing Diverse Plants",
      text: "As they walk, they observe different kinds of plants. Some are small herbs growing close to the ground, others are bushy shrubs, and some are grand trees with thick trunks. Dr Raghu reminds them to observe gently without plucking any leaves or flowers.",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "This herb has a soft green stem. Can you feel how different it is from this woody shrub?", top: '5%', right: '3%', side: 'right' }
      ]
    },
    {
      img: "/Scene5_realistic.png",
      title: "🐦 Listening to Bird Calls",
      text: "Hush! Maniram chacha stops and cups his ear. He mimics a bird song, and suddenly, a beautiful response is heard from the tree canopy! The students learn to listen to the unique calls of birds and respect their home.",
      dialogues: [
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "Shhh... *cups ear* ...listen... coo-koo-koo! 🎵",              top: '11%', left: '19%', side: 'right' },
        { character: "Priya",          avatar: "👧",    text: "It replied! The bird actually replied to chacha!",             top: '4%',  right: '3%', side: 'right' }
      ]
    },
    {
      img: sce5Img,
      title: "🦋 Fluttering Insects & Butterflies",
      text: "Near a cluster of wildflowers, butterflies and bees are busy gathering nectar. The students watch closely as a butterfly unfolds its delicate wings. They notice how insects play a vital role in helping flowers grow.",
      dialogues: [
        { character: "Arjun",     avatar: "👦",    text: "Sir! That butterfly keeps visiting the same flower again and again!", top: '4%', right: '3%', side: 'right' },
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "Yes — that is pollination! Insects help flowers reproduce.",         top: '4%', left: '3%',  side: 'left' }
      ]
    },
    {
      img: "/Scene3_realistic.png",
      title: "🐒 Animals in the Canopy",
      text: "A rustle in the branches reveals monkeys jumping from limb to limb, and a tiny squirrel scurrying down a trunk. The forest is alive with creatures of all sizes, each adapted to live in their part of the woods.",
      dialogues: [
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "See that monkey? The treetops are its home — its habitat!", top: '4%', right: '3%', side: 'right' }
      ]
    },
    {
      img: "/Scene6_realistic.png",
      title: "📋 Recording in the Table",
      text: "The students take out their notebooks to record their observations in Tables 2.1 and 2.2. They separate their findings into plants and animals, marveling at the incredible diversity of life surrounding them!",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "Table 2.1 for plants, Table 2.2 for animals. Compare your findings with your classmates!", top: '5%', right: '3%', side: 'right' }
      ]
    }
  ];

  const totalScenes = scenes.length;
  const scene = scenes[currentScene];
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  const getSingleLineCues = (text) => {
    const rawSentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const rawCues = [];
    rawSentences.forEach(s => {
      const trimmed = s.trim();
      if (trimmed.length > 55 && trimmed.includes(' — ')) {
        const parts = trimmed.split(' — ');
        parts.forEach(p => rawCues.push(p.trim()));
      } else if (trimmed.length > 65 && trimmed.includes(', and ')) {
        const parts = trimmed.split(', and ');
        rawCues.push(parts[0].trim());
        rawCues.push('and ' + parts[1].trim());
      } else if (trimmed.length > 65 && trimmed.includes(' into a ')) {
        const parts = trimmed.split(' into a ');
        rawCues.push(parts[0].trim());
        rawCues.push('into a ' + parts[1].trim());
      } else if (trimmed.length > 65 && trimmed.includes(' without ')) {
        const parts = trimmed.split(' without ');
        rawCues.push(parts[0].trim());
        rawCues.push('without ' + parts[1].trim());
      } else if (trimmed.length > 65 && trimmed.includes(', others are ')) {
        const parts = trimmed.split(', others are ');
        rawCues.push(parts[0].trim());
        rawCues.push('others are ' + parts[1].trim());
      } else if (trimmed.length > 65 && trimmed.includes(', each ')) {
        const parts = trimmed.split(', each ');
        rawCues.push(parts[0].trim());
        rawCues.push('each ' + parts[1].trim());
      } else if (trimmed.length > 65 && trimmed.includes(', marveling ')) {
        const parts = trimmed.split(', marveling ');
        rawCues.push(parts[0].trim());
        rawCues.push('marveling ' + parts[1].trim());
      } else {
        rawCues.push(trimmed);
      }
    });

    const spokenText = text.replace(/—/g, ', ').replace(/\s+/g, ' ').trim();
    let searchPos = 0;
    let globalWordCounter = 0;

    const structuredCues = rawCues.map((cueText, cueIdx) => {
      const wordTokens = cueText.split(/\s+/).filter(Boolean);
      const words = wordTokens.map((w, wIdxInCue) => {
        const cleanWord = w.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let foundIndex = spokenText.toLowerCase().indexOf(cleanWord, searchPos);
        if (foundIndex === -1) {
          foundIndex = searchPos;
        }
        searchPos = foundIndex + (cleanWord.length || 1);

        return {
          text: w,
          clean: cleanWord,
          cueIndex: cueIdx,
          wordIndexInCue: wIdxInCue,
          globalIndex: globalWordCounter++,
          charStart: foundIndex,
          charEnd: foundIndex + cleanWord.length
        };
      });

      return {
        text: cueText,
        words
      };
    });

    return structuredCues;
  };

  const cues = useMemo(() => getSingleLineCues(scene.text), [scene.text]);
  const allWords = useMemo(() => cues.flatMap(c => c.words), [cues]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearTimeout(dialogueTimerRef.current);
    setDialogueStep(0);
    setImgLoaded(false);
    setActiveWordIndex(null);
    setSubtitleIndex(0);

    const handleBoundary = (event) => {
      const charIdx = event.charIndex;
      let matched = null;
      for (let i = 0; i < allWords.length; i++) {
        const w = allWords[i];
        if (charIdx >= w.charStart && charIdx <= w.charEnd + 2) {
          matched = w;
          break;
        }
      }
      if (!matched) {
        matched = allWords.find((w, i) => {
          const next = allWords[i + 1];
          return charIdx >= w.charStart && (!next || charIdx < (next?.charStart || Infinity));
        });
      }
      if (matched) {
        setSubtitleIndex(matched.cueIndex);
        setActiveWordIndex(matched.wordIndexInCue);
      }
    };

    const handleSpeechEnd = () => {
      setActiveWordIndex(null);
    };

    let speakTimer = null;
    if (!isNarrationMuted && 'speechSynthesis' in window) {
      speakTimer = setTimeout(() => {
        const doSpeak = () => {
          speakIndianMaleNarrator(
            scene.text,
            isNarrationMuted,
            handleSpeechEnd,
            handleSpeechEnd,
            handleBoundary
          );
        };
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          doSpeak();
        } else {
          window.speechSynthesis.onvoiceschanged = () => { doSpeak(); };
        }
      }, 100);
    }

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearTimeout(dialogueTimerRef.current);
      if (speakTimer) clearTimeout(speakTimer);
    };
  }, [currentScene, isNarrationMuted, allWords, scene.text]);

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

      const readingDuration = Math.max(2200, Math.min(3800, dlg.text.length * 45));
      dialogueTimerRef.current = setTimeout(nextStep, readingDuration);
    }

    return () => {
      active = false;
      clearTimeout(dialogueTimerRef.current);
    };
  }, [dialogueStep, currentScene]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsNarrationMuted(prev => {
      if (!prev && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      return !prev;
    });
  };

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
      <style>{`
        @keyframes movieSubtitleFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.68) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {scene.dialogues.map((dlg, idx) => {
          const isVisible = dialogueStep >= idx && imgLoaded;
          return (
            <div key={idx} style={{
              position: 'absolute',
              top: dlg.top,
              left: dlg.left,
              right: dlg.right,
              zIndex: 13,
              width: '320px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.92)',
              transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'none'
            }}>
              <div style={{
                position: 'relative',
                background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
                backdropFilter: 'blur(16px)',
                border: '2px solid #14452F',
                borderRadius: dlg.side === 'left' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                padding: '0.9rem 1.2rem',
                boxShadow: '0 12px 32px rgba(20, 69, 47, 0.25)',
                color: '#0A3B24'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.35rem' }}>{dlg.avatar}</span>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#14452F',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    {dlg.character}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  color: '#0F3822',
                  lineHeight: '1.55',
                  fontStyle: 'italic',
                  fontWeight: '600',
                  fontFamily: '"Fraunces", Georgia, serif'
                }}>
                  "{dlg.text}"
                </p>

                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: dlg.side === 'left' ? '20px' : 'auto',
                  right: dlg.side === 'right' ? '20px' : 'auto',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '8px 8px 0 8px',
                  borderColor: '#FAF8F2 transparent transparent transparent',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Scene Index Indicator */}
      <div style={{
        position: 'absolute', top: '0.9rem', left: '0.9rem', zIndex: 12,
        background: '#14452F',
        border: '1.5px solid #10B981',
        borderRadius: '20px', padding: '0.35rem 1rem',
        fontSize: '15px', fontWeight: '800', color: '#D1FAE5',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        fontFamily: '"Outfit", sans-serif',
        boxShadow: '0 3px 10px rgba(20, 69, 47, 0.3)'
      }}>
        Class 6 · Scene {currentScene + 1} of {totalScenes}
      </div>

      {/* Quick Advance Button to Next Activity */}
      {onComplete && (
        <div style={{
          position: 'absolute', top: '0.9rem', right: '0.9rem', zIndex: 15
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onComplete();
            }}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '16px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.5px solid #10B981',
              background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
              transition: 'all 0.2s ease',
              fontFamily: '"Outfit", sans-serif'
            }}
            title="Proceed directly to Activity 2.1 Plants"
          >
            Next: Act 2.1 Plants →
          </button>
        </div>
      )}

      {/* Floating Bottom Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: '1.2rem',
        left: '1.2rem',
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
              padding: '0.6rem 1.3rem',
              fontSize: '15px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.8px solid #14452F',
              background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
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
              padding: '0.6rem 1.3rem',
              fontSize: '15px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.8px solid #14452F',
              background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
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
        right: '1.2rem',
        zIndex: 16
      }}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{
            padding: '0.6rem 1.4rem',
            fontSize: '15px',
            fontWeight: '900',
            borderRadius: '10px',
            border: '1.5px solid #10B981',
            background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: '"Outfit", sans-serif'
          }}
        >
          <span>{currentScene === totalScenes - 1 ? 'Next: Act 2.1 Plants →' : 'Next Scene →'}</span>
        </button>
      </div>

      {/* Real Movie-Style Subtitles (Exact Viewport Center, One Single Line, Audio-Synced Word Highlight) */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.4rem',
          left: 0,
          right: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 14,
          pointerEvents: 'none'
        }}
      >
        <div
          key={`sub-${currentScene}-${subtitleIndex}`}
          style={{
            maxWidth: '78vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            animation: 'movieSubtitleFade 0.35s ease-out'
          }}
        >
          <p style={{
            margin: 0,
            fontSize: 'clamp(20px, 2.2vw, 24px)',
            fontWeight: '700',
            lineHeight: '1.45',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            letterSpacing: '0.015em'
          }}>
            {(cues[subtitleIndex]?.words || []).map((w, wIdx) => {
              const isSpoken = activeWordIndex === wIdx;
              return (
                <span
                  key={wIdx}
                  style={{
                    display: 'inline-block',
                    margin: '0 0.18em',
                    color: isSpoken ? '#34d399' : '#ffffff',
                    transition: 'color 0.12s ease, text-shadow 0.12s ease',
                    textShadow: isSpoken
                      ? '0 0 16px rgba(52, 211, 153, 0.9), 0 2px 4px rgba(0, 0, 0, 0.95), -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000'
                      : '0 2px 4px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.9), -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000'
                  }}
                >
                  {w.text}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
