import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, ArrowRight, Compass, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './MagneticCompass.css';

const factsData = [
  {
    id: 'temporary_magnets',
    number: '01',
    icon: '🧲',
    title: "How Temporary Magnets Are Formed",
    content: "A steel needle or iron nail becomes a temporary magnet when stroked repeatedly in one direction with a permanent magnet. This strokes internal magnetic domains into a unified alignment.",
    audioUrl: '/audio/temporary_magnets.mp3'
  },
  {
    id: 'ancient_water_compass',
    number: '02',
    icon: '🧭',
    title: "Ancient Chinese Floating Compasses",
    content: "The earliest known magnetic compasses were made by floating magnetized iron needles through cork or straw in bowls of water. Water eliminated surface friction so the needle freely aligned north.",
    audioUrl: null
  },
  {
    id: 'first_electromagnet',
    number: '03',
    icon: '⚡',
    title: "William Sturgeon's Discovery",
    content: "In 1825, British inventor William Sturgeon built the very first practical electromagnet. By passing current through coiled wire around soft iron, ordinary metal became powerfully magnetic.",
    audioUrl: '/audio/first_electromagnet.mp3'
  },
  {
    id: 'frictionless_floating',
    number: '04',
    icon: '💧',
    title: "Why Floating Works Best",
    content: "Earth's magnetic force on a tiny needle is subtle. Floating the needle on water or balancing it on a jewel pivot minimizes friction, allowing it to swivel easily toward magnetic north.",
    audioUrl: null
  },
  {
    id: 'compass_rose',
    number: '05',
    icon: '🗺️',
    title: "The Navigational Compass Rose",
    content: "Sailors invented the Compass Rose in the 14th century, marking 32 cardinal and intercardinal points to navigate open oceans even when overcast skies hid the stars and Sun.",
    audioUrl: null
  }
];

export default function DidYouKnow({ onComplete, onBackToQuiz }) {
  const [activeFactId, setActiveFactId] = useState(factsData[0].id);
  const [pageIndex, setPageIndex] = useState(0); // 0 = First 3 facts, 1 = Next 2 facts
  const [direction, setDirection] = useState(1);
  const { speak, stop, isPlaying, spokenCharIndex } = useHybridVoice();

  const ELEVENLABS_DID_YOU_KNOW_VOICE_ID = ELEVENLABS_VOICES?.did_you_know || 'nPczCjzI2devNBz1zQrb';

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleNextPage = () => {
    if (pageIndex < 1) {
      stop();
      setDirection(1);
      setPageIndex(1);
      setActiveFactId(factsData[3].id);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      stop();
      setDirection(-1);
      setPageIndex(0);
      setActiveFactId(factsData[0].id);
    }
  };

  const handleSelectPage = (idx) => {
    if (idx !== pageIndex) {
      stop();
      setDirection(idx > pageIndex ? 1 : -1);
      setPageIndex(idx);
      setActiveFactId(idx === 0 ? factsData[0].id : factsData[3].id);
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.22 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.18 }
      }
    })
  };

  const handleSpeakFact = (fact) => {
    if (isPlaying && activeFactId === fact.id) {
      stop();
      return;
    }

    setActiveFactId(fact.id);
    const fullSpeech = `${fact.title}. ${fact.content}`;

    speak({
      text: fullSpeech,
      audioUrl: fact.audioUrl,
      voiceId: ELEVENLABS_DID_YOU_KNOW_VOICE_ID,
      role: 'did_you_know'
    });
  };

  const renderHighlightedContent = (content, title, isCurrentlyPlaying, charIndex) => {
    if (!content) return null;
    if (!isCurrentlyPlaying || charIndex === undefined || charIndex === null || charIndex < 0) {
      return <span>{content}</span>;
    }

    const titleOffset = title ? title.length + 2 : 0;
    const adjustedIndex = charIndex - titleOffset;
    const words = content.split(' ');
    let currentPos = 0;

    return words.map((word, i) => {
      const startPos = currentPos;
      const endPos = currentPos + word.length;
      currentPos = endPos + 1;

      const isCurrentWord = adjustedIndex >= startPos && adjustedIndex <= endPos + 2;

      let color = '#1E293B';
      let fontWeight = 600;

      if (isCurrentWord) {
        color = '#D97706';
        fontWeight = 900;
      }

      return (
        <span
          key={i}
          style={{
            color,
            fontWeight,
            transition: 'color 0.1s ease',
            display: 'inline-block',
            marginRight: '0.28rem'
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main 2-Column Responsive Card Arena */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr',
        gap: '1.25rem',
        boxSizing: 'border-box'
      }}>
        {/* LEFT COLUMN: Visual Artwork & Interactive Card */}
        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 50%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
          padding: '1.15rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0
        }}>
          {/* Header Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.65rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(217, 119, 6, 0.12)',
              color: '#B45309',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.04em'
            }}>
              <Compass size={16} /> COMPASS DISCOVERY ARCHIVE
            </div>

            <span style={{
              fontSize: '0.85rem',
              color: '#78350F',
              fontWeight: 800
            }}>
              Activity 4.4 Reference
            </span>
          </div>

          {/* Hero Illustration Card Frame */}
          <div style={{
            flex: 1,
            minHeight: '220px',
            borderRadius: '18px',
            border: '2px solid #FDE68A',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(217, 119, 6, 0.12)',
            background: '#FEF3C7'
          }}>
            <img
              src="/MagneticCompass/bg_image.jpg"
              alt="Making a Magnetic Compass"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30, 27, 75, 0.75) 0%, rgba(30, 27, 75, 0.1) 60%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              right: '16px',
              color: '#FFFFFF',
              zIndex: 2,
              pointerEvents: 'none'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}>
                Magnetizing Iron & Making Compasses
              </h3>
              <p style={{
                margin: '2px 0 0 0',
                fontSize: '0.86rem',
                color: '#FEF3C7',
                fontWeight: 700,
                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
              }}>
                Transforming simple steel needles into navigational instruments
              </p>
            </div>
          </div>

          {/* Bottom Card Footer Actions */}
          <div style={{
            marginTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1.5px solid #FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.1)'
              }}>
                <Award size={20} />
              </div>
              <div>
                <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#1E1B4B' }}>
                  Chapter 4 Mastery
                </h5>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#78350F', fontWeight: 700 }}>
                  Curriculum Class 6 Physics
                </p>
              </div>
            </div>

            {onComplete && (
              <button
                onClick={onComplete}
                className="gold-glow-btn"
                style={{
                  padding: '0.75rem 1.45rem',
                  fontSize: '0.95rem',
                  borderRadius: '16px',
                  fontWeight: 900
                }}
              >
                Finish Activity <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Facts Single Static Page Format with Horizontal Sliding Transition */}
        <div style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 50%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
          padding: '1.15rem 1.35rem',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          position: 'relative'
        }}>
          {/* Header Row: Title & Sliding Carousel Navigation Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '0.75rem',
            borderBottom: '1.5px solid #FDE68A',
            marginBottom: '0.75rem',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1.5px solid #FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.1)'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#1E1B4B' }}>
                  Fascinating Compass Facts
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#78350F', fontWeight: 700 }}>
                  Page {pageIndex + 1} of 2 ● {pageIndex === 0 ? 'Facts 01 - 03' : 'Facts 04 - 05'}
                </span>
              </div>
            </div>

            {/* Slider Pagination Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <button
                onClick={handlePrevPage}
                disabled={pageIndex === 0}
                title="Previous Page"
                className={pageIndex === 1 ? 'gold-glow-btn' : ''}
                style={{
                  background: pageIndex === 0 ? 'rgba(255, 255, 255, 0.4)' : undefined,
                  border: pageIndex === 0 ? '1.5px solid #FDE68A' : 'none',
                  borderRadius: '12px',
                  padding: '0.35rem 0.8rem',
                  cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: pageIndex === 0 ? 0.45 : 1,
                  color: pageIndex === 1 ? '#FFFFFF' : '#78350F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              {/* Page Indicator Dots */}
              <div style={{ display: 'flex', gap: '6px', padding: '0 0.35rem' }}>
                {[0, 1].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPage(idx)}
                    title={`Go to Page ${idx + 1}`}
                    style={{
                      width: pageIndex === idx ? '22px' : '9px',
                      height: '9px',
                      borderRadius: '10px',
                      background: pageIndex === idx ? '#D97706' : '#FDE68A',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={pageIndex === 1}
                title="Next Page"
                className={pageIndex === 0 ? 'gold-glow-btn' : ''}
                style={{
                  background: pageIndex === 1 ? 'rgba(255, 255, 255, 0.4)' : undefined,
                  border: pageIndex === 1 ? '1.5px solid #FDE68A' : 'none',
                  borderRadius: '12px',
                  padding: '0.35rem 0.8rem',
                  cursor: pageIndex === 1 ? 'not-allowed' : 'pointer',
                  opacity: pageIndex === 1 ? 0.45 : 1,
                  color: pageIndex === 0 ? '#FFFFFF' : '#78350F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Slider Content Viewport with Sliding Transition */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: pageIndex === 0 ? '0.65rem' : '0.95rem',
                  justifyContent: 'space-between'
                }}
              >
                {(pageIndex === 0 ? factsData.slice(0, 3) : factsData.slice(3, 5)).map((fact) => {
                  const isActive = activeFactId === fact.id;
                  const isCurrentlyPlaying = isPlaying && isActive;

                  return (
                    <div
                      key={fact.id}
                      onClick={() => setActiveFactId(fact.id)}
                      style={{
                        background: '#FFFFFF',
                        border: isActive ? '2px solid #D97706' : '1.5px solid #FDE68A',
                        borderRadius: '18px',
                        boxShadow: isActive ? '0 6px 18px rgba(217, 119, 6, 0.14)' : '0 2px 8px rgba(217, 119, 6, 0.05)',
                        padding: pageIndex === 0 ? '0.85rem 1.15rem' : '1.15rem 1.35rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: pageIndex === 0 ? '0.45rem' : '0.6rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flex: 1
                      }}
                    >
                      {/* Fact Header Row */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <span style={{
                            background: 'rgba(217, 119, 6, 0.12)',
                            color: '#B45309',
                            fontSize: '12px',
                            fontWeight: 900,
                            borderRadius: '8px',
                            padding: '0.15rem 0.5rem',
                            letterSpacing: '0.04em'
                          }}>
                            FACT {fact.number}
                          </span>
                          <h4 style={{
                            margin: 0,
                            fontSize: pageIndex === 0 ? '19.5px' : '21.5px',
                            fontWeight: 900,
                            color: '#1E1B4B',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.25
                          }}>
                            {fact.title}
                          </h4>
                        </div>

                        {/* Audio Speaker Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeakFact(fact);
                          }}
                          title={isCurrentlyPlaying ? 'Pause Audio' : 'Listen to fact'}
                          style={{
                            background: isCurrentlyPlaying ? '#D97706' : '#FFFFFF',
                            border: '1.5px solid #FDE68A',
                            borderRadius: '12px',
                            padding: '0.38rem 0.8rem',
                            color: isCurrentlyPlaying ? '#FFFFFF' : '#B45309',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: isCurrentlyPlaying ? '0 3px 8px rgba(217, 119, 6, 0.35)' : '0 2px 5px rgba(0,0,0,0.04)',
                            transition: 'all 0.15s ease',
                            flexShrink: 0
                          }}
                        >
                          {isCurrentlyPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          <span>{isCurrentlyPlaying ? 'Speaking' : 'Listen'}</span>
                        </button>
                      </div>

                      {/* Fact Content Text with Highlighting - Enlarged Font */}
                      <p style={{
                        margin: 0,
                        fontSize: pageIndex === 0 ? '17.5px' : '18.5px',
                        lineHeight: pageIndex === 0 ? '1.55' : '1.65',
                        color: '#1E293B',
                        fontWeight: 600
                      }}>
                        {renderHighlightedContent(fact.content, fact.title, isCurrentlyPlaying, spokenCharIndex)}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
