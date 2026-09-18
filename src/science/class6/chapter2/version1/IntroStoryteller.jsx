import React, { useState, useRef, useEffect, useMemo } from 'react';
import sce5Img from '../../../../assets/sce_5.png';
import { useTheme } from '../../../../ThemeContext';

/**
 * Utility to speak narration with Indian English male educator voice
 */
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
  utt.rate = 0.86;  // Slower, clear natural pacing for Class 6 comprehension
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

/**
 * Utility to speak character dialogue popups with distinct character voices
 */
function speakCharacterDialogue(character, text, muteFlag, onEndCallback) {
  if (muteFlag || !('speechSynthesis' in window)) return null;
  window.speechSynthesis.cancel();

  // Strip stage directions like *cups ear* from speech
  const cleanSpeechText = text
    .replace(/\*[^*]*\*/g, '')
    .replace(/[—–]/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  const utt = new SpeechSynthesisUtterance(cleanSpeechText);
  utt.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const indianVoices = voices.filter(v => 
    (v.lang && (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('hi-in') || v.lang.toLowerCase().includes('in'))) ||
    /india|indian|hindi/i.test(v.name)
  );
  const englishVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));

  if (/priya/i.test(character)) {
    // Youthful female student
    utt.pitch = 1.25;
    utt.rate = 0.92;
    const femaleVoice = indianVoices.find(v => /female|veena|heera|neerja/i.test(v.name)) ||
      englishVoices.find(v => /female|zira|samantha|victoria|susan|karen|jessica|jenny/i.test(v.name));
    if (femaleVoice) utt.voice = femaleVoice;
  } else if (/arjun/i.test(character)) {
    // Enthusiastic young male student
    utt.pitch = 1.18;
    utt.rate = 0.94;
    const boyVoice = indianVoices.find(v => !/female|heera|neerja|veena/i.test(v.name)) ||
      englishVoices.find(v => /male|george|alex|daniel/i.test(v.name));
    if (boyVoice) utt.voice = boyVoice;
  } else if (/maniram/i.test(character)) {
    // Warm, wise elder naturalist
    utt.pitch = 0.84;
    utt.rate = 0.86;
    const elderVoice = indianVoices.find(v => /prabhat|ravi|male/i.test(v.name)) ||
      englishVoices.find(v => /male|guy|david/i.test(v.name));
    if (elderVoice) utt.voice = elderVoice;
  } else {
    // Dr. Raghu - Educator mentor
    utt.pitch = 1.0;
    utt.rate = 0.88;
    const mentorVoice = indianVoices.find(v => /prabhat|ravi|male/i.test(v.name) && !/female/i.test(v.name)) ||
      englishVoices.find(v => /male|david|mark|guy/i.test(v.name));
    if (mentorVoice) utt.voice = mentorVoice;
  }

  if (onEndCallback) utt.onend = onEndCallback;
  window.speechSynthesis.speak(utt);
  return utt;
}

export default function IntroStoryteller({ onComplete, onBack }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isNarrationMuted, setIsNarrationMuted] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const [activeSpeakingChar, setActiveSpeakingChar] = useState(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dialogueTimerRef = useRef(null);
  const { theme = 'light' } = useTheme() || {};

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
        { character: "Dr. Raghu",      avatar: "👨‍🔬", text: "Observe carefully — every living thing has a story to tell!",    top: '5.5rem', left: '2.5rem',  side: 'left' },
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "I know every tree here, children. Come, follow me!",            top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    },
    {
      img: "/Scene2_realistic.png",
      title: "🌿 Observing Diverse Plants",
      text: "As they walk, they observe different kinds of plants. Some are small herbs growing close to the ground, others are bushy shrubs, and some are grand trees with thick trunks. Dr Raghu reminds them to observe gently without plucking any leaves or flowers.",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "This herb has a soft green stem. Can you feel how different it is from this woody shrub?", top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    },
    {
      img: "/Scene5_realistic.png",
      title: "🐦 Listening to Bird Calls",
      text: "Hush! Maniram chacha stops and cups his ear. He mimics a bird song, and suddenly, a beautiful response is heard from the tree canopy! The students learn to listen to the unique calls of birds and respect their home.",
      dialogues: [
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "Shhh... *cups ear* ...listen... coo-koo-koo! 🎵",              top: '5.5rem', left: '2.5rem',  side: 'left' },
        { character: "Priya",          avatar: "👧",    text: "It replied! The bird actually replied to chacha!",             top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    },
    {
      img: sce5Img,
      title: "🦋 Fluttering Insects & Butterflies",
      text: "Near a cluster of wildflowers, butterflies and bees are busy gathering nectar. The students watch closely as a butterfly unfolds its delicate wings. They notice how insects play a vital role in helping flowers grow.",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "Insects help flowers reproduce — that is pollination!",               top: '5.5rem', left: '2.5rem',  side: 'left' },
        { character: "Arjun",     avatar: "👦",    text: "Sir! That butterfly keeps visiting the same flower again and again!", top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    },
    {
      img: "/Scene3_realistic.png",
      title: "🐒 Animals in the Canopy",
      text: "A rustle in the branches reveals monkeys jumping from limb to limb, and a tiny squirrel scurrying down a trunk. The forest is alive with creatures of all sizes, each adapted to live in their part of the woods.",
      dialogues: [
        { character: "Maniram Chacha", avatar: "🧑‍🌾", text: "See that monkey? The treetops are its home — its habitat!", top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    },
    {
      img: "/Scene6_realistic.png",
      title: "📋 Recording in the Table",
      text: "The students take out their notebooks to record their observations in Tables 2.1 and 2.2. They separate their findings into plants and animals, marveling at the incredible diversity of life surrounding them!",
      dialogues: [
        { character: "Dr. Raghu", avatar: "👨‍🔬", text: "Table 2.1 for plants, Table 2.2 for animals. Compare your findings with your classmates!", top: '5.5rem', right: '2.5rem', side: 'right' }
      ]
    }
  ];

  const totalScenes = scenes.length;
  const scene = scenes[currentScene];

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

  // Main Scene Narration & Subtitle Sync
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearTimeout(dialogueTimerRef.current);
    setDialogueStep(0);
    setImgLoaded(false);
    setActiveWordIndex(null);
    setActiveSpeakingChar(null);
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
      // Trigger first dialogue if available
      if (scene.dialogues && scene.dialogues.length > 0) {
        setDialogueStep(1);
      }
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
      }, 150);
    } else {
      // If muted, advance dialogue step after a short reading period
      speakTimer = setTimeout(() => {
        if (scene.dialogues && scene.dialogues.length > 0) {
          setDialogueStep(1);
        }
      }, 2500);
    }

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearTimeout(dialogueTimerRef.current);
      if (speakTimer) clearTimeout(speakTimer);
    };
  }, [currentScene, isNarrationMuted, allWords, scene.text]);

  // Dialogue Step Progression & Character Voice
  useEffect(() => {
    let active = true;

    if (dialogueStep > 0 && dialogueStep <= scene.dialogues.length) {
      const dlgIndex = dialogueStep - 1;
      const dlg = scene.dialogues[dlgIndex];

      if (dlg) {
        setActiveSpeakingChar(dlg.character);

        // Speak the character's voice when dialogue bubble pops up
        if (!isNarrationMuted && 'speechSynthesis' in window) {
          speakCharacterDialogue(
            dlg.character,
            dlg.text,
            isNarrationMuted,
            () => {
              if (active) {
                setActiveSpeakingChar(null);
                // Schedule next dialogue if there are more
                if (dialogueStep < scene.dialogues.length) {
                  dialogueTimerRef.current = setTimeout(() => {
                    if (active) setDialogueStep(prev => prev + 1);
                  }, 1200);
                }
              }
            }
          );
        } else {
          // Fallback reading timer if muted
          const readingDuration = Math.max(3000, Math.min(4500, dlg.text.length * 55));
          dialogueTimerRef.current = setTimeout(() => {
            if (active) {
              setActiveSpeakingChar(null);
              if (dialogueStep < scene.dialogues.length) {
                setDialogueStep(prev => prev + 1);
              }
            }
          }, readingDuration);
        }
      }
    }

    return () => {
      active = false;
      clearTimeout(dialogueTimerRef.current);
    };
  }, [dialogueStep, scene.dialogues, isNarrationMuted]);

  // Replay a specific character's dialogue voice
  const handlePlayCharacterDialogue = (e, dlg) => {
    e.stopPropagation();
    setActiveSpeakingChar(dlg.character);
    speakCharacterDialogue(dlg.character, dlg.text, false, () => {
      setActiveSpeakingChar(null);
    });
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsNarrationMuted(prev => {
      const nextMuted = !prev;
      if (nextMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setActiveWordIndex(null);
        setActiveSpeakingChar(null);
      }
      return nextMuted;
    });
  };

  const handleNext = () => { 
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (currentScene < totalScenes - 1) {
      setCurrentScene(prev => prev + 1); 
    } else if (onComplete) {
      onComplete(); 
    }
  };

  const handlePrev = () => { 
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
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
        @keyframes dialoguePopIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          70% {
            transform: translateY(-2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes speakingPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
      
      {/* Background Scene Container */}
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

        {/* Ambient Contrast Gradient Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.65) 82%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Character Dialogue Popups */}
        {scene.dialogues.map((dlg, idx) => {
          const isVisible = dialogueStep > idx && imgLoaded;
          const isCurrentlySpeaking = activeSpeakingChar === dlg.character;

          return (
            <div
              key={`${currentScene}-dlg-${idx}`}
              style={{
                position: 'absolute',
                top: dlg.top,
                left: dlg.left,
                right: dlg.right,
                zIndex: 13,
                width: 'clamp(280px, 32vw, 360px)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.92)',
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: isVisible ? 'auto' : 'none'
              }}
            >
              <div style={{
                position: 'relative',
                background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 100%)',
                backdropFilter: 'blur(16px)',
                border: isCurrentlySpeaking ? '2.5px solid #10B981' : '2px solid #14452F',
                borderRadius: dlg.side === 'left' ? '6px 20px 20px 20px' : '20px 6px 20px 20px',
                padding: '0.95rem 1.25rem',
                boxShadow: isCurrentlySpeaking 
                  ? '0 12px 32px rgba(16, 185, 129, 0.4), 0 0 16px rgba(16, 185, 129, 0.35)' 
                  : '0 12px 32px rgba(20, 69, 47, 0.28)',
                color: '#0A3B24',
                animation: isCurrentlySpeaking ? 'speakingPulse 1.8s infinite' : 'none'
              }}>
                {/* Header: Avatar, Name Tag, Replay Voice Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ 
                      fontSize: '1.45rem', 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#E6F4EA',
                      border: '1.5px solid #A7F3D0'
                    }}>
                      {dlg.avatar}
                    </span>
                    <div>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '900',
                        color: '#14452F',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Outfit", sans-serif',
                        display: 'block'
                      }}>
                        {dlg.character}
                      </span>
                      {isCurrentlySpeaking && (
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: '#059669',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          Speaking 🔊
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Speaker audio button to replay voice */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayCharacterDialogue(e, dlg)}
                    title={`Listen to ${dlg.character}`}
                    style={{
                      background: isCurrentlySpeaking ? '#10B981' : 'rgba(20, 69, 47, 0.08)',
                      border: '1.5px solid #10B981',
                      color: isCurrentlySpeaking ? '#ffffff' : '#14452F',
                      borderRadius: '8px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s ease',
                      fontFamily: '"Outfit", sans-serif'
                    }}
                  >
                    <span>{isCurrentlySpeaking ? '🔊' : '🔈'}</span>
                    <span>Play</span>
                  </button>
                </div>

                {/* Dialogue Text */}
                <p style={{
                  margin: 0,
                  fontSize: '15.5px',
                  color: '#0F3822',
                  lineHeight: '1.5',
                  fontStyle: 'italic',
                  fontWeight: '600',
                  fontFamily: '"Fraunces", Georgia, serif'
                }}>
                  "{dlg.text}"
                </p>

                {/* Triangular Speech Pointer Tail */}
                <div style={{
                  position: 'absolute',
                  bottom: '-9px',
                  left: dlg.side === 'left' ? '24px' : 'auto',
                  right: dlg.side === 'right' ? '24px' : 'auto',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '9px 9px 0 9px',
                  borderColor: '#FAF8F2 transparent transparent transparent',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Header Bar: Scene Badge + Audio/Fullscreen Controls */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: 'clamp(1rem, 2.5vw, 1.5rem)',
        right: 'clamp(1rem, 2.5vw, 1.5rem)',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}>
        {/* Scene Index Indicator */}
        <div style={{
          background: 'rgba(20, 69, 47, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid #10B981',
          borderRadius: '20px',
          padding: '0.4rem 1.15rem',
          fontSize: '14.5px',
          fontWeight: '800',
          color: '#D1FAE5',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontFamily: '"Outfit", sans-serif',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
          pointerEvents: 'auto'
        }}>
          Class 6 · Scene {currentScene + 1} of {totalScenes}
        </div>

        {/* Top-Right Control Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          pointerEvents: 'auto'
        }}>
          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '14px',
              fontWeight: '800',
              borderRadius: '10px',
              border: isNarrationMuted ? '1.5px solid #EF4444' : '1.5px solid #10B981',
              background: isNarrationMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(20, 69, 47, 0.92)',
              backdropFilter: 'blur(10px)',
              color: isNarrationMuted ? '#FCA5A5' : '#D1FAE5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              fontFamily: '"Outfit", sans-serif'
            }}
            title={isNarrationMuted ? 'Turn narration voice on' : 'Mute narration voice'}
          >
            <span>{isNarrationMuted ? '🔇' : '🔊'}</span>
            <span>{isNarrationMuted ? 'Voice Off' : 'Voice On'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '14px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.5px solid #10B981',
              background: 'rgba(20, 69, 47, 0.92)',
              backdropFilter: 'blur(10px)',
              color: '#D1FAE5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              fontFamily: '"Outfit", sans-serif'
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <span>{isFullscreen ? '✕' : '⛶'}</span>
            <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>

          {/* Quick Jump to Activity */}
          {onComplete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onComplete();
              }}
              style={{
                padding: '0.45rem 1.15rem',
                fontSize: '14px',
                fontWeight: '800',
                borderRadius: '10px',
                border: '1.5px solid #10B981',
                background: 'linear-gradient(135deg, #15803D 0%, #064E3B 100%)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(20, 69, 47, 0.4)',
                transition: 'all 0.2s ease',
                fontFamily: '"Outfit", sans-serif'
              }}
              title="Proceed directly to Activity 2.1 Plants"
            >
              Next: Act 2.1 Plants →
            </button>
          )}
        </div>
      </div>

      {/* Floating Bottom Navigation Controls */}
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
            onClick={(e) => { 
              e.stopPropagation(); 
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onBack(); 
            }}
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '15px',
              fontWeight: '800',
              borderRadius: '10px',
              border: '1.8px solid #14452F',
              background: 'rgba(250, 248, 242, 0.9)',
              backdropFilter: 'blur(8px)',
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
              background: 'rgba(250, 248, 242, 0.9)',
              backdropFilter: 'blur(8px)',
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

      {/* Real Movie-Style Subtitles (Viewport Center-Bottom, Audio-Synced Word Highlight) */}
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
          pointerEvents: 'none',
          padding: '0 1.5rem'
        }}
      >
        <div
          key={`sub-${currentScene}-${subtitleIndex}`}
          style={{
            maxWidth: '82vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            animation: 'movieSubtitleFade 0.35s ease-out'
          }}
        >
          <p style={{
            margin: 0,
            fontSize: 'clamp(19px, 2.1vw, 24px)',
            fontWeight: '800',
            lineHeight: '1.45',
            textAlign: 'center',
            whiteSpace: 'normal',
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
                      ? '0 0 16px rgba(52, 211, 153, 0.95), 0 2px 4px rgba(0, 0, 0, 0.95), -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000'
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
