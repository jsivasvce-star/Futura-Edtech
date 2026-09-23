/* eslint-disable react/prop-types, no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, RotateCcw, CheckCircle2 } from 'lucide-react';
import { voiceService, ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './ParchmentScroll.css';
import chap4_1 from '../../../../assets/chap4_1.png';
import chap4_2 from '../../../../assets/chap4_2.png';
import chap4_3 from '../../../../assets/chap4_3.png';
import chap4_4 from '../../../../assets/chap4_4.png';
import chap4_5 from '../../../../assets/chap4_5.png';
import chap4_6 from '../../../../assets/chap4_6.png';

export default function IntroMagnets({ onBackToDashboard, onComplete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(1);
  const [spokenCharIndex, setSpokenCharIndex] = useState(-1);
  const [hasFinishedAudio, setHasFinishedAudio] = useState(false);
  const [scrollState, setScrollState] = useState('rolled'); // 'rolled' | 'unrolled' | 'rolling-up'

  const delayTimerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const unrollTimerRef = useRef(null);
  const rollUpTimerRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);

  const scenes = [
    {
      img: chap4_1,
      subtitle: "Reshma's Birthday Gift",
      lines: [
        {
          role: 'teacher',
          text: "Reshma lived in a coastal town of Kerala and loved writing short stories. Since her grandmother enjoyed listening to her stories, Reshma decided to write a special story as a birthday gift for her grandmother's 60th birthday.",
          pos: { top: '3%', left: '2%', width: '34%' },
          audioUrl: '/IntroMagnets/audio/scene1_line1.mp3'
        },
        {
          role: 'girl',
          text: "Paati will be so happy to hear this story...",
          pos: { top: '28%', left: '55%', width: '18%', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene1_line2.mp3'
        }
      ]
    },
    {
      img: chap4_2,
      subtitle: "The Spice Ship",
      lines: [
        {
          role: 'teacher',
          text: "The Spice Ship. Her story was about a ship carrying spices like pepper, cardamom, and cinnamon from Kerala for trade in the olden days. The sailors used the stars at night to find the right direction across the sea.",
          pos: { top: '3%', left: '2%', width: '34%' },
          audioUrl: '/IntroMagnets/audio/scene2_line1.mp3'
        },
        {
          role: 'ancient_man',
          text: "Look, the North Star... that's our guide tonight.",
          pos: { top: '24%', left: '48%', width: '210px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene2_line2.mp3'
        }
      ]
    },
    {
      img: chap4_3,
      subtitle: "The Storm",
      lines: [
        {
          role: 'teacher',
          text: "The Storm. Suddenly, in her story, the ship was caught in a fierce storm. Thick clouds covered the sky, and the stars disappeared. Reshma wondered how the sailors could continue their journey without seeing the stars.",
          pos: { top: '3%', left: '2%', width: '34%' },
          audioUrl: '/IntroMagnets/audio/scene3_line1.mp3'
        },
        {
          role: 'ancient_man',
          text: "The stars are hidden... how will we find our way?",
          pos: { top: '18%', left: '48%', width: '210px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene3_line2.mp3'
        }
      ]
    },
    {
      img: chap4_4,
      subtitle: "Searching for an Answer",
      lines: [
        {
          role: 'teacher',
          text: "Searching for an Answer. Unable to continue her story, Reshma searched the internet and visited her school library. She discovered that sailors used a magnetic compass to find directions even when the stars were hidden.",
          pos: { top: '3%', left: '2%', width: '34%' },
          audioUrl: '/IntroMagnets/audio/scene4_line1.mp3'
        },
        {
          role: 'girl',
          text: "I can't leave my story here... the sailors must have found a way!",
          pos: { top: '38%', left: '20%', width: '17%', tail: 'right' },
          audioUrl: '/IntroMagnets/audio/scene4_line2.mp3'
        },
        {
          role: 'girl',
          text: "Let me see what the internet says.",
          pos: { top: '9%', left: '60%', width: '15%', tail: 'bottom' },
          audioUrl: '/IntroMagnets/audio/scene4_line3.mp3'
        },
        {
          role: 'girl',
          text: "A magnetic compass! That's how they found directions even when the stars were not visible.",
          pos: { top: '36%', left: '69%', width: '18%', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene4_line4.mp3'
        },
        {
          role: 'girl',
          text: "So, the needle always points to the north... That's amazing!",
          pos: { top: '55%', left: '66%', width: '17%', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene4_line5.mp3'
        },
        {
          role: 'girl',
          text: "This book, sea navigation techniques.",
          pos: { top: '77%', left: '36%', width: '190px', tail: 'right' },
          audioUrl: '/IntroMagnets/audio/scene4_line6.mp3'
        },
        {
          role: 'girl',
          text: "I've seen magnets in my pencil box and the duster on the board... I never looked at them closely.",
          pos: { top: '70%', left: '5%', width: '19%', tail: 'right' },
          audioUrl: '/IntroMagnets/audio/scene4_line7.mp3'
        }
      ]
    },
    {
      img: chap4_5,
      subtitle: "Discovering Magnets",
      lines: [
        {
          role: 'girl',
          text: "Magnets... I've seen them so many times, but never really thought about how they work.",
          pos: { top: '3%', left: '42.5%', width: '200px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene5_line1.mp3'
        },
        {
          role: 'girl',
          text: "Let me read more about them.",
          pos: { top: '18%', left: '79%', width: '180px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene5_line2.mp3'
        },
        {
          role: 'girl',
          text: "My pencil box stays closed because of a magnet!",
          pos: { top: '48%', left: '2%', width: '190px', tail: 'right' },
          audioUrl: '/IntroMagnets/audio/scene5_line3.mp3'
        },
        {
          role: 'girl',
          text: "And the magnet keeps my purse clasp tight.",
          pos: { top: '46%', left: '37%', width: '190px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene5_line4.mp3'
        },
        {
          role: 'girl',
          text: "Even the duster on our whiteboard sticks because of a magnet!",
          pos: { top: '48%', left: '74%', width: '190px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene5_line5.mp3'
        },
        {
          role: 'girl',
          text: "Wow! Magnets have two poles - North and South!",
          pos: { top: '74%', left: '10%', width: '200px', tail: 'right' },
          audioUrl: '/IntroMagnets/audio/scene5_line6.mp3'
        },
        {
          role: 'girl',
          text: "No wonder sailors used a magnetic compass to find directions, even when the stars were hidden!",
          pos: { top: '74%', left: '67%', width: '230px', tail: 'left' },
          audioUrl: '/IntroMagnets/audio/scene5_line7.mp3'
        }
      ]
    },
    {
      img: chap4_6,
      subtitle: "Lodestones to Artificial Magnets",
      lines: [
        {
          role: 'teacher',
          text: "Lodestones. Naturally occurring magnets discovered in ancient times are called lodestones.",
          audioUrl: '/IntroMagnets/audio/scene6_line1.mp3'
        },
        {
          role: 'teacher',
          text: "Used by Sailors. In the olden days, sailors used lodestone-based magnets to navigate and find directions at sea when stars were not visible.",
          audioUrl: '/IntroMagnets/audio/scene6_line2.mp3'
        },
        {
          role: 'teacher',
          text: "Shift to Artificial Magnets. Later on, people learned how to create magnets out of pieces of iron, which eventually led to the modern artificial magnets we use today.",
          audioUrl: '/IntroMagnets/audio/scene6_line3.mp3'
        }
      ]
    }
  ];

  // Stop any active speech
  const stopSpeech = () => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    voiceService.stop();
    setIsPlaying(false);
    setHasFinishedAudio(false);
    setSpokenCharIndex(-1);
  };

  // Render text directly over image with real-time word-by-word karaoke highlighting (Text Color ONLY - No Background/Popups)
  const renderWordByWordText = (text, lineIdx, activeLineIdx, charIndex, isEduCard = false, isScroll = false) => {
    if (!text) return null;
    const isThisLineActive = lineIdx === activeLineIdx && isPlaying;

    const words = text.split(' ');
    let currentPos = 0;

    return words.map((word, i) => {
      const startPos = currentPos;
      const endPos = currentPos + word.length;
      const nextPos = endPos + 1;
      currentPos = nextPos;

      // Single-word active check matching 60fps character index progression
      const isCurrentWord = isThisLineActive && charIndex >= startPos && charIndex < nextPos;
      const isPastWord = isThisLineActive && charIndex >= nextPos;

      let color = isEduCard ? '#EAF2F6' : (isScroll ? '#1E1006' : '#2C221E');
      let fontWeight = isScroll ? 600 : 500;
      let textShadow = 'none';

      if (isCurrentWord) {
        // TEXT COLOR ONLY HIGHLIGHT (No Background, No Popups)
        color = isEduCard ? '#F3C969' : (isScroll ? '#C2410C' : '#2563EB');
        fontWeight = isScroll ? 900 : 800;
        if (isScroll) textShadow = '0 0 2px rgba(194, 65, 12, 0.45)';
      } else if (isPastWord) {
        color = isEduCard ? '#173B5F' : (isScroll ? '#5A260A' : '#1E40AF');
        fontWeight = isScroll ? 750 : 700;
      }

      return (
        <React.Fragment key={i}>
          <span
            style={{
              color,
              fontWeight,
              textShadow,
              transition: 'color 0.15s ease'
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  const triggerRollUpAndNavigate = (actionCallback) => {
    if (isTransitioningRef.current) return;

    stopSpeech();
    if (unrollTimerRef.current) {
      clearTimeout(unrollTimerRef.current);
      unrollTimerRef.current = null;
    }
    if (rollUpTimerRef.current) {
      clearTimeout(rollUpTimerRef.current);
      rollUpTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    // If current scene has a story scroll and is currently unrolled, roll it up first
    if (currentPage <= 4 && scrollState === 'unrolled') {
      isTransitioningRef.current = true;
      setScrollState('rolling-up');
      rollUpTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        if (actionCallback) actionCallback();
      }, 650);
    } else {
      if (actionCallback) actionCallback();
    }
  };

  // Interactive toggle-on-click: Clicking parchment rolls it up if unrolled, or unrolls it if rolled up
  const handleToggleScroll = (e) => {
    if (e) e.stopPropagation();
    if (isTransitioningRef.current) return;

    if (unrollTimerRef.current) {
      clearTimeout(unrollTimerRef.current);
      unrollTimerRef.current = null;
    }
    if (rollUpTimerRef.current) {
      clearTimeout(rollUpTimerRef.current);
      rollUpTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (scrollState === 'unrolled') {
      // Smoothly roll the bottom dowel back up to meet top dowel
      setScrollState('rolling-up');
      rollUpTimerRef.current = setTimeout(() => {
        setScrollState('rolled');
      }, 650);
    } else {
      // If closed/rolled or currently rolling up, trigger downward unrolling animation
      setScrollState('unrolled');
    }
  };

  // Play audio lines sequentially: Next bubble pops up FIRST, then speech & highlighting start!
  const playSceneAudio = (sceneIndex) => {
    stopSpeech();
    if (isCompleted || isMuted) return;

    const currentScene = scenes[sceneIndex - 1];
    if (!currentScene || !currentScene.lines || currentScene.lines.length === 0) return;

    let lineIndex = 0;
    setIsPlaying(true);
    setActiveLineIndex(0);
    setVisibleLineCount(1); // Start with Line 0 visible
    setSpokenCharIndex(-1);

    const speakNextLine = () => {
      if (lineIndex >= currentScene.lines.length) {
        setIsPlaying(false);
        setSpokenCharIndex(-1);
        return;
      }

      setActiveLineIndex(lineIndex);
      setSpokenCharIndex(-1);

      const currentLine = currentScene.lines[lineIndex];

      // Voice IDs for different roles (Approach B)
      const roleVoiceId = currentLine.role === 'girl' 
        ? ELEVENLABS_VOICES.girl 
        : currentLine.role === 'ancient_man' 
          ? ELEVENLABS_VOICES.ancient_man 
          : ELEVENLABS_VOICES.teacher;

      voiceService.speak({
        text: currentLine.text,
        audioUrl: currentLine.audioUrl,
        voiceId: roleVoiceId,
        role: currentLine.role,
        onBoundary: (charIndex) => {
          setSpokenCharIndex(charIndex);
        },
        onEnd: () => {
          lineIndex++;
          if (lineIndex < currentScene.lines.length) {
            // STEP 1: Immediately hide completed bubble for clean 1.5s gap
            setActiveLineIndex(-1);
            setSpokenCharIndex(-1);

            // STEP 2: Pause 1.5s before next bubble appears and starts reading
            delayTimerRef.current = setTimeout(() => {
              speakNextLine();
            }, 1500);
          } else {
            setIsPlaying(false);
            setHasFinishedAudio(true);
            setSpokenCharIndex(-1);

            // Auto Close (Roll-Up Sequence) when narration audio finishes playing
            if (sceneIndex <= 4) {
              autoAdvanceTimerRef.current = setTimeout(() => {
                triggerRollUpAndNavigate(() => {
                  setCurrentPage(p => Math.min(scenes.length, p + 1));
                });
              }, 2500);
            }
          }
        },
        onError: () => {
          setIsPlaying(false);
          setSpokenCharIndex(-1);
        }
      });
    };

    speakNextLine();
  };

  useEffect(() => {
    if (isCompleted) {
      stopSpeech();
      return;
    }

    // Reset transitioning flag & line visibility on scene change
    isTransitioningRef.current = false;
    setVisibleLineCount(1);

    if (unrollTimerRef.current) {
      clearTimeout(unrollTimerRef.current);
      unrollTimerRef.current = null;
    }
    if (rollUpTimerRef.current) {
      clearTimeout(rollUpTimerRef.current);
      rollUpTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (currentPage <= 4) {
      // Initial state: Rolled up upon initial page load / scene change
      setScrollState('rolled');

      // Trigger downward unrolling animation automatically only after a 2-second delay from entering the page
      unrollTimerRef.current = setTimeout(() => {
        setScrollState('unrolled');
      }, 2000);

      // Start narration audio once parchment has smoothly unrolled (2000ms delay + ~850ms unroll animation = 2850ms)
      delayTimerRef.current = setTimeout(() => {
        if (!isCompleted) {
          playSceneAudio(currentPage);
        }
      }, 2850);
    } else {
      delayTimerRef.current = setTimeout(() => {
        if (!isCompleted) {
          playSceneAudio(currentPage);
        }
      }, 1000);
    }

    return () => {
      if (unrollTimerRef.current) clearTimeout(unrollTimerRef.current);
      if (rollUpTimerRef.current) clearTimeout(rollUpTimerRef.current);
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      stopSpeech();
    };
  }, [currentPage, isMuted, isCompleted]);

  const handleNext = () => {
    triggerRollUpAndNavigate(() => {
      setCurrentPage(p => Math.min(scenes.length, p + 1));
    });
  };

  const handleBack = () => {
    triggerRollUpAndNavigate(() => {
      if (currentPage > 1) {
        setCurrentPage(p => p - 1);
      }
    });
  };

  const handleFinish = () => {
    stopSpeech();
    setTimeout(() => {
      setIsCompleted(true);
    }, 1500);
  };

  const toggleMute = () => {
    if (isPlaying || !isMuted) {
      stopSpeech();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      playSceneAudio(currentPage);
    }
  };

  const currentScene = scenes[currentPage - 1];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'linear-gradient(135deg, #0B1026 0%, #101738 100%)', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
      {/* Dark Blue Theme Magnetic Field Vector Lines Background SVG */}
      <svg 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }} 
        viewBox="0 0 1440 900" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-100 450 C 200 100, 500 100, 720 450 C 940 800, 1240 800, 1540 450" stroke="rgba(59, 130, 246, 0.22)" strokeWidth="3" fill="none" />
        <path d="M-100 450 C 200 180, 500 180, 720 450 C 940 720, 1240 720, 1540 450" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="3" fill="none" />
      </svg>


      
      {/* Fullscreen Background Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={currentScene.img}
            alt={currentScene.subtitle}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              imageRendering: '-webkit-optimize-contrast',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              filter: 'contrast(1.02) saturate(1.05)',
              willChange: 'auto'
            }}
          />

        {/* Dynamic Text Overlay Layer */}
        {currentPage === 6 ? (
          /* Scene 6: Educational Summary Cards */
          <>
            {/* Summary Cards Grid — Positioned at the top of the page */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '3%',
              right: '3%',
              zIndex: 20
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem'
              }}>
              {currentScene.lines.map((line, idx) => {
                const isActive = idx === activeLineIndex && isPlaying;
                const titles = ['Lodestones:', 'Used by Sailors:', 'Shift to Artificial Magnets:'];

                return (
                  <div
                    key={idx}
                    style={{
                      background: isActive ? '#0F1926' : 'rgba(15, 25, 38, 0.92)',
                      backdropFilter: 'blur(14px)',
                      border: isActive ? '2px solid #F3C969' : '1.5px solid #173B5F',
                      borderRadius: '18px',
                      padding: '1.15rem 1.35rem',
                      boxShadow: isActive ? '0 12px 35px rgba(212, 175, 55, 0.35)' : '0 8px 24px rgba(0,0,0,0.6)',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      animation: 'fadeInScale 0.4s ease-out'
                    }}
                  >
                    <h3 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#F3C969',
                      letterSpacing: '0.02em',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                      paddingBottom: '0.35rem'
                    }}>
                      {titles[idx]}
                    </h3>
                    <p style={{ margin: 0, fontSize: '1.28rem', lineHeight: 1.6, color: '#EAF2F6', textAlign: 'justify' }}>
                      {renderWordByWordText(line.text, idx, activeLineIndex, spokenCharIndex, true)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Right Controls for Scene 6 — Finish Story matches Back button styling */}
          <div style={{ 
            position: 'absolute', 
            bottom: '1.25rem', 
            right: '1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.85rem', 
            zIndex: 99999 
          }}>
            <button
              onClick={handleFinish}
              style={{
                padding: '0.85rem 2.2rem',
                borderRadius: '35px',
                border: '1.5px solid rgba(255,255,255,0.3)',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(6px)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
              }}
              title="Finish Story"
            >
              Finish Story <ArrowRight size={20} color="#ffffff" />
            </button>
          </div>
        </>
        ) : (
          /* Story Scenes 1-5 Narrative Boxes & Comic Thought Bubbles */
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 20
          }}>
            {currentScene.lines.map((line, idx) => {
              const isActive = idx === activeLineIndex && isPlaying;
              const pos = line.pos || { top: '4%', left: '2%', width: '24%' };
              const isTeacher = line.role === 'teacher';

              if (isTeacher) {
                /* Authentic Unrolled Vertical Parchment Scroll with Turned Teak Dowels & Finials */
                return (
                  <div
                    key={idx}
                    onClick={handleToggleScroll}
                    title={scrollState === 'unrolled' ? 'Click to roll up scroll' : 'Click to unroll scroll'}
                    className={`parchment-scroll-assembly ${
                      scrollState === 'unrolled' 
                        ? 'is-unrolled' 
                        : scrollState === 'rolling-up' 
                          ? 'is-rolling-up' 
                          : 'is-rolled'
                    }`}
                    style={{
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      width: 'clamp(280px, 26vw, 400px)',
                      maxWidth: '400px',
                      zIndex: isActive ? 30 : 22,
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                  >
                    {/* Top Wooden Dowel with Turned Teak Rod & Carved Finials */}
                    <div className="scroll-dowel top-dowel">
                      <div className="dowel-finial finial-left" />
                      <div className="dowel-rod-segment" />
                      <div className="dowel-finial finial-right" />
                    </div>

                    {/* Top Curled Paper Roll with Realistic Contact Shadow */}
                    <div className="scroll-paper-roll top-roll" />

                    {/* Main Parchment Sheet with Organic Deckled Edges & Coastal Sunlight Integration */}
                    <div className="scroll-parchment-body">
                      {/* Golden-Hour Coastal Sunlight Wash (Catching light from window on right) */}
                      <div className="parchment-sunlight-wash" />
                      {/* Aged Fibrous Papyrus Texture & Crease Grain */}
                      <div className="parchment-fiber-grain" />

                      {/* Unroll Clip Container for Synchronized Text Reveal */}
                      <div className="scroll-parchment-unroll-clip">
                        {/* Reading Content Pane with Tight Compact Padding */}
                        <div className="parchment-content">
                          {/* Antique Story Header (Label removed) */}
                          <div className="parchment-story-header">
                            <h2 className="parchment-story-title">{currentScene.subtitle}</h2>
                            <div className="parchment-header-ornament">
                              <span className="ornament-line" />
                              <span className="ornament-gem">✦</span>
                              <span className="ornament-line" />
                            </div>
                          </div>

                          {/* Narrative Paragraph with Maximized Typography Scale & High Readability */}
                          <p className="parchment-narrative-text">
                            {renderWordByWordText(line.text, idx, activeLineIndex, spokenCharIndex, false, true)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Curled Paper Roll with Realistic Contact Shadow */}
                    <div className="scroll-paper-roll bottom-roll" />

                    {/* Bottom Wooden Dowel with Turned Teak Rod & Carved Finials */}
                    <div className="scroll-dowel bottom-dowel">
                      <div className="dowel-finial finial-left" />
                      <div className="dowel-rod-segment" />
                      <div className="dowel-finial finial-right" />
                    </div>
                  </div>
                );
              }

              /* Comic Thought Bubble: Active bubble shows while reading; previous disappears; all show at end of scene */
              const isBubbleVisible = hasFinishedAudio ? true : (isPlaying && idx === activeLineIndex);
              if (!isBubbleVisible) return null;

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    width: pos.width || '230px',
                    background: '#F5E8C7',
                    border: '1.5px solid #5A3E28',
                    borderRadius: '35px',
                    padding: '0.55rem 0.95rem',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    pointerEvents: 'auto',
                    zIndex: isActive ? 25 : 20
                  }}
                >
                  {/* Thought Bubble Tail Dots */}
                  {pos.tail === 'left' && (
                    <div style={{ position: 'absolute', left: '-15px', bottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', transform: 'rotate(-40deg)' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                    </div>
                  )}
                  {pos.tail === 'right' && (
                    <div style={{ position: 'absolute', right: '-15px', bottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', transform: 'rotate(40deg)' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                    </div>
                  )}
                  {pos.tail === 'bottom' && (
                    <div style={{ position: 'absolute', bottom: '-15px', left: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                    </div>
                  )}
                  {pos.tail === 'top' && (
                    <div style={{ position: 'absolute', top: '-15px', left: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F5E8C7', border: '1.5px solid #5A3E28' }} />
                    </div>
                  )}

                  <p style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.55, color: '#2C221E', textAlign: 'center', fontWeight: 600 }}>
                    {renderWordByWordText(line.text, idx, activeLineIndex, spokenCharIndex, false)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>

      {/* Voiceover Controls */}
      {currentPage !== 6 && (
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.75rem', display: 'flex', gap: '0.85rem', zIndex: 99999 }}>
          <button
            onClick={() => {
              if (autoAdvanceTimerRef.current) {
                clearTimeout(autoAdvanceTimerRef.current);
                autoAdvanceTimerRef.current = null;
              }
              if (scrollState !== 'unrolled') {
                setScrollState('unrolled');
              }
              playSceneAudio(currentPage);
            }}
            style={{
              padding: '0.85rem 1.5rem',
              borderRadius: '35px',
              border: '1.5px solid rgba(255,255,255,0.4)',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.05rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.45)'
            }}
            title="Replay Voiceover"
          >
            <RotateCcw size={20} /> Replay Audio
          </button>

          <button
            onClick={toggleMute}
            style={{
              padding: '0.85rem 1.5rem',
              borderRadius: '35px',
              border: '1.5px solid rgba(255,255,255,0.4)',
              background: isMuted ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.05rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.45)'
            }}
            title={isMuted ? 'Unmute Voiceover' : 'Mute Voiceover'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isMuted ? 'Voice Muted' : 'Voice ON'}
          </button>
        </div>
      )}

      {/* Bottom Left Controls - Always present, matching Next button styling & navigating to Chapter 4 flow on page 1 */}
      <div style={{ 
        position: 'absolute', 
        bottom: '1.25rem', 
        left: '1.25rem', 
        display: 'flex', 
        zIndex: 99999 
      }}>
        <button
          onClick={() => {
            if (currentPage > 1) {
              handleBack();
            } else if (onBackToDashboard) {
              triggerRollUpAndNavigate(() => {
                onBackToDashboard();
              });
            }
          }}
          style={{ 
            padding: '0.85rem 2.2rem', 
            borderRadius: '35px', 
            border: '1.5px solid rgba(255,255,255,0.3)', 
            background: 'rgba(0,0,0,0.65)', 
            backdropFilter: 'blur(6px)', 
            color: 'white', 
            cursor: 'pointer', 
            fontWeight: 800, 
            fontSize: '1.05rem',
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem',
            boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
          }}
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Controls - Next button on scenes 1 to 5 */}
      {currentPage < scenes.length && (
        <div style={{ 
          position: 'absolute', 
          bottom: '1.25rem', 
          right: '1.25rem', 
          display: 'flex', 
          zIndex: 99999 
        }}>
          <button 
            onClick={handleNext}
            style={{ 
              padding: '0.85rem 2.5rem', 
              borderRadius: '35px', 
              border: '1.5px solid rgba(255,255,255,0.3)', 
              background: 'rgba(0,0,0,0.65)', 
              backdropFilter: 'blur(6px)', 
              color: 'white', 
              cursor: 'pointer', 
              fontWeight: 800,
              fontSize: '1.05rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.85)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.65)';
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* COMPLETION MODAL */}
      {isCompleted && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(1rem, 2.5vw, 2rem)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          zIndex: 100000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1.5px solid #E2E8F0',
            borderRadius: '36px',
            padding: 'clamp(2rem, 4vh, 3.5rem) clamp(1.75rem, 3vw, 3rem)',
            width: 'min(90vw, 76vh, 670px)',
            height: 'min(90vw, 76vh, 670px)',
            boxShadow: '0 25px 65px -12px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.85rem, 2.2vh, 1.45rem)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            {/* Top Success Icon */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.32)',
              flexShrink: 0
            }}>
              <CheckCircle2 size={40} color="#ffffff" strokeWidth={2.4} />
            </div>

            {/* Outlined Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 1.15rem',
              borderRadius: '9999px',
              border: '1.5px solid #10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              color: '#047857',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              flexShrink: 0
            }}>
              <span>✓</span> Story Completed
            </div>

            {/* Main Heading - Significantly Larger & Prominent */}
            <h2 style={{
              fontSize: 'clamp(2.3rem, 3.6vw, 3.1rem)',
              fontWeight: 900,
              margin: 0,
              color: '#1E293B',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              lineHeight: 1.15
            }}>
              Story Completed!
            </h2>

            {/* Description Text - Large, Bold & Highly Readable */}
            <p style={{
              fontSize: 'clamp(1.35rem, 2.1vw, 1.65rem)',
              color: '#334155',
              lineHeight: 1.48,
              margin: 0,
              fontWeight: 700,
              maxWidth: '560px',
              textAlign: 'center'
            }}>
              Reshma learned that magnets were essential for navigation. Are you ready to explore magnets yourself?
            </p>

            {/* Action Button: fits naturally inside the square modal */}
            <button
              onClick={onComplete}
              style={{
                width: '84%',
                maxWidth: '480px',
                minWidth: '260px',
                padding: '1.2rem 2.4rem',
                fontSize: '1.22rem',
                fontWeight: 800,
                borderRadius: '45px',
                background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.85rem',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.45)',
                transition: 'all 0.25s ease',
                marginTop: '0.35rem',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.015)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(217, 119, 6, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(217, 119, 6, 0.45)';
              }}
            >
              Continue to Activity 4.1 <ArrowRight size={22} color="#ffffff" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
