import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Award, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './Activity4_1.css';

const factsData = [
  {
    id: 'metal_magnetic',
    number: '01',
    icon: '🧲',
    title: "Not Every Metal is Magnetic",
    content: "A magnet does not attract every metal. Iron, nickel, and cobalt stick firmly, but metals like aluminium, copper, silver, and gold do not attract at all!",
    audioUrl: '/audio/not_every_metal.mp3'
  },
  {
    id: 'electricity_magnetism',
    number: '02',
    icon: '⚡',
    title: "Electricity and Magnetism",
    content: "Over 200 years ago, Danish scientist Hans Christian Ørsted discovered that an electric wire deflects a compass needle, unveiling the unified realm of electromagnetism.",
    audioUrl: '/audio/electricity_magnetism.mp3'
  },
  {
    id: 'recycling_magnets',
    number: '03',
    icon: '♻️',
    title: "Industrial Recycling Separators",
    content: "Modern recycling facilities use powerful overhead electromagnets to automatically pluck steel cans and iron scrap from non-magnetic paper, plastic, and glass.",
    audioUrl: '/audio/recycling_magnets.mp3'
  },
  {
    id: 'data_storage',
    number: '04',
    icon: '💾',
    title: "Microscopic Data Storage",
    content: "Computer hard drives, bank card magnetic stripes, and tape cartridges use millions of microscopic magnetic domains to preserve photos, documents, and code safely.",
    audioUrl: '/audio/data_storage.mp3'
  },
  {
    id: 'ancient_lodestones',
    number: '05',
    icon: '🪨',
    title: "Ancient Discovery of Lodestone",
    content: "Legend tells of an ancient Greek shepherd named Magnes whose iron-nailed boots clung to black magnetite rocks on Mount Ida, introducing mankind to natural magnets.",
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

  const handlePlayAudio = (fact) => {
    if (isPlaying && activeFactId === fact.id) {
      stop();
    } else {
      setActiveFactId(fact.id);
      speak({
        text: `${fact.title}. ${fact.content}`,
        voiceId: ELEVENLABS_DID_YOU_KNOW_VOICE_ID
      });
    }
  };

  const page1Facts = factsData.slice(0, 3);
  const page2Facts = factsData.slice(3, 5);
  const currentFacts = pageIndex === 0 ? page1Facts : page2Facts;

  const renderHighlightedContent = (content, title, charIndex, isCurrentFact) => {
    if (!content) return null;
    if (!isCurrentFact || charIndex === undefined || charIndex === null || charIndex < 0) {
      return <span style={{ color: '#1E293B' }}>{content}</span>;
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
      let fontWeight = 700;

      if (isCurrentWord) {
        color = '#173B5F';
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

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(400px, 1.1fr) minmax(500px, 1.4fr)',
      gap: '1.4rem',
      padding: '0.4rem 0.6rem',
      boxSizing: 'border-box',
      background: 'transparent',
      overflow: 'hidden',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* Left Column: Visual Card */}
      <div style={{
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '28px',
        padding: '1.6rem 1.8rem',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(23, 59, 95, 0.25)'
            }}>
              <Sparkles size={22} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.55rem', fontWeight: 900, color: '#173B5F', letterSpacing: '-0.01em' }}>
                Fascinating Facts
              </h2>
              <span style={{ fontSize: '0.95rem', color: '#065F46', fontWeight: 800 }}>
                Magnetic vs Non-Magnetic Materials
              </span>
            </div>
          </div>

          {/* Visual Illustration */}
          <div style={{
            width: '100%',
            height: '240px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            marginBottom: '1rem',
            background: '#FFFFFF'
          }}>
            <img 
              src="/magnetic_did_you_know_1789617084212.jpg" 
              alt="Magnetic Materials Illustration" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <p style={{
            margin: 0,
            fontSize: '1.05rem',
            lineHeight: '1.55',
            color: '#173B5F',
            fontWeight: 700
          }}>
            Explore curious facts about why only certain metals attract, how magnets sort city waste, and how ancient shepherds discovered the first natural magnets.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          {onBackToQuiz && (
            <button
              onClick={onBackToQuiz}
              className="navy-btn"
              style={{
                flex: 1,
                padding: '0.85rem 1rem',
                borderRadius: '16px',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Compass size={18} color="#FFFFFF" /> Review Quiz
            </button>
          )}

          {onComplete && (
            <button
              onClick={onComplete}
              className="gold-glow-btn"
              style={{
                flex: 1.2,
                padding: '0.85rem 1rem',
                borderRadius: '16px',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Award size={18} color="#FFFFFF" /> Complete Activity
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Sliding Carousel Card Container */}
      <div style={{
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '28px',
        padding: '1.5rem 1.75rem',
        boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Carousel Header with Page Indicator & Arrows */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexShrink: 0
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#173B5F', letterSpacing: '-0.01em' }}>
              Curated Discovery Facts
            </h3>
            <span style={{ fontSize: '0.92rem', color: '#065F46', fontWeight: 700 }}>
              Page {pageIndex + 1} of 2 ({pageIndex === 0 ? 'Facts 1 - 3' : 'Facts 4 - 5'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <button
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                background: pageIndex === 0 ? '#EAF2F6' : '#FFFFFF',
                color: pageIndex === 0 ? '#D4D4D8' : '#173B5F',
                cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: pageIndex === 0 ? 'none' : '0 2px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
              title="Previous Page"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNextPage}
              disabled={pageIndex === 1}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                background: pageIndex === 1 ? '#EAF2F6' : '#FFFFFF',
                color: pageIndex === 1 ? '#D4D4D8' : '#173B5F',
                cursor: pageIndex === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: pageIndex === 1 ? 'none' : '0 2px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
              title="Next Page"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Horizontal Sliding Container */}
        <div style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={pageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: pageIndex === 0 ? '0.85rem' : '1.25rem',
                justifyContent: 'space-between'
              }}
            >
              {currentFacts.map((fact) => {
                const isCurrentActive = isPlaying && activeFactId === fact.id;
                const factFontSize = pageIndex === 0 ? '1.05rem' : '1.15rem';

                return (
                  <div
                    key={fact.id}
                    style={{
                      background: '#FFFFFF',
                      border: isCurrentActive ? '2px solid #173B5F' : '1.5px solid #E2E8F0',
                      borderRadius: '18px',
                      padding: pageIndex === 0 ? '1rem 1.25rem' : '1.35rem 1.55rem',
                      boxShadow: isCurrentActive 
                        ? '0 6px 20px rgba(23, 59, 95, 0.15)' 
                        : '0 3px 12px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      transition: 'all 0.25s ease',
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.35rem' }}>{fact.icon}</span>
                        <span style={{
                          fontSize: '0.82rem',
                          fontWeight: 900,
                          background: '#ECFDF5',
                          color: '#065F46',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          border: '1px solid #A7F3D0'
                        }}>
                          FACT {fact.number}
                        </span>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#173B5F' }}>
                          {fact.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(fact)}
                        style={{
                          background: isCurrentActive ? '#173B5F' : '#F3F7F9',
                          color: isCurrentActive ? '#FFFFFF' : '#173B5F',
                          border: '1.5px solid #E2E8F0',
                          borderRadius: '12px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                        }}
                        title={isCurrentActive ? "Pause Audio" : "Listen to Fact"}
                      >
                        {isCurrentActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        <span>{isCurrentActive ? "Pause" : "Listen"}</span>
                      </button>
                    </div>

                    <p style={{
                      margin: 0,
                      fontSize: factFontSize,
                      lineHeight: 1.5,
                      fontWeight: 700
                    }}>
                      {renderHighlightedContent(fact.content, fact.title, spokenCharIndex, isCurrentActive)}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.55rem',
          marginTop: '0.85rem',
          flexShrink: 0
        }}>
          <button
            onClick={() => { setDirection(-1); setPageIndex(0); }}
            style={{
              width: pageIndex === 0 ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: pageIndex === 0 ? '#173B5F' : '#E2E8F0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title="Page 1"
          />
          <button
            onClick={() => { setDirection(1); setPageIndex(1); }}
            style={{
              width: pageIndex === 1 ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: pageIndex === 1 ? '#173B5F' : '#E2E8F0',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title="Page 2"
          />
        </div>
      </div>
    </div>
  );
}
