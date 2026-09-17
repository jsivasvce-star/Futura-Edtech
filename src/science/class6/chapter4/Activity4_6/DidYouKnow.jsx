import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, ArrowRight, Compass, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './Activity4_6.css';

const factsData = [
  {
    id: 'magnetic_induction',
    number: '01',
    icon: '🧲',
    title: "Magnetic Induction",
    content: "When a magnet comes close to a magnetic material like iron, it temporarily turns that material into a magnet itself! This phenomenon is known as magnetic induction.",
    audioUrl: '/audio/magnetic_induction.mp3'
  },
  {
    id: 'permanent_magnets',
    number: '02',
    icon: '🏭',
    title: "Making Permanent Magnets",
    content: "Strong magnets in factories are made by placing iron or steel inside very powerful magnetic fields created by electricity, permanently aligning their magnetic domains.",
    audioUrl: '/audio/permanent_magnets.mp3'
  },
  {
    id: 'stroking_method',
    number: '03',
    icon: '🧵',
    title: "Ancient Stroking Technique",
    content: "For centuries before modern electricity, sailors magnetized their sewing needles by stroking them repeatedly in one direction with naturally magnetic lodestones.",
    audioUrl: null
  },
  {
    id: 'oersted_discovery',
    number: '04',
    icon: '⚡',
    title: "Hans Christian Ørsted's Discovery",
    content: "In 1820, Danish scientist Hans Christian Ørsted accidentally discovered that an electric current flowing through a wire causes a nearby magnetic compass needle to deflect!",
    audioUrl: null
  },
  {
    id: 'earths_magnetic_shield',
    number: '05',
    icon: '🌍',
    title: "Earth's Magnetic Shield",
    content: "Earth's magnetic field acts like a gigantic bar magnet deep inside the planet, deflecting charged solar wind particles and creating the shimmering Aurora lights.",
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
      return <span style={{ color: '#064E3B' }}>{content}</span>;
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

      let color = '#064E3B';
      let fontWeight = 700;

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
      gridTemplateColumns: 'minmax(420px, 1.15fr) minmax(520px, 1.45fr)',
      gap: '1.65rem',
      padding: '0.5rem 1rem',
      boxSizing: 'border-box',
      background: 'transparent',
      overflow: 'hidden'
    }}>
      {/* Left Column: Visual Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '1.5px solid #FDE68A',
        borderRadius: '24px',
        padding: '1.6rem',
        boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
            }}>
              <Sparkles size={22} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, color: '#1E1B4B' }}>
                Fascinating Facts
              </h2>
              <span style={{ fontSize: '0.92rem', color: '#047857', fontWeight: 800 }}>
                Magnetic Induction & Compasses
              </span>
            </div>
          </div>

          {/* Dedicated Did You Know Visual Illustration */}
          <div style={{
            width: '100%',
            height: '240px',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1.5px solid #FDE68A',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            marginBottom: '1rem',
            background: '#FFFFFF'
          }}>
            <img 
              src="/magnetic_did_you_know_1789617084212.jpg" 
              alt="Magnetic Induction & Compass Illustration" 
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
            color: '#78350F',
            fontWeight: 700
          }}>
            Explore scientific curiosities about magnetic induction, compasses, and Earth's invisible shield. Click the speaker on any fact card to listen!
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          {onBackToQuiz && (
            <button
              onClick={onBackToQuiz}
              style={{
                flex: 1,
                padding: '0.85rem 1rem',
                borderRadius: '16px',
                background: '#FFFFFF',
                color: '#78350F',
                border: '1.5px solid #FDE68A',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <Compass size={18} color="#D97706" /> Review Quiz
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
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '1.5px solid #FDE68A',
        borderRadius: '24px',
        padding: '1.5rem 1.65rem',
        boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
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
            <h3 style={{ margin: 0, fontSize: '19.5px', fontWeight: 900, color: '#1E1B4B' }}>
              Curated Discovery Facts
            </h3>
            <span style={{ fontSize: '14.5px', color: '#78350F', fontWeight: 700 }}>
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
                border: '1.5px solid #FDE68A',
                background: pageIndex === 0 ? '#FEF9C3' : '#FFFFFF',
                color: pageIndex === 0 ? '#D4D4D8' : '#78350F',
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
                border: '1.5px solid #FDE68A',
                background: pageIndex === 1 ? '#FEF9C3' : '#FFFFFF',
                color: pageIndex === 1 ? '#D4D4D8' : '#78350F',
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
                const factFontSize = pageIndex === 0 ? '17.5px' : '18.5px';

                return (
                  <div
                    key={fact.id}
                    style={{
                      background: '#FFFFFF',
                      border: isCurrentActive ? '2px solid #D97706' : '1.5px solid #FDE68A',
                      borderRadius: '18px',
                      padding: pageIndex === 0 ? '1rem 1.25rem' : '1.4rem 1.6rem',
                      boxShadow: isCurrentActive 
                        ? '0 6px 20px rgba(217, 119, 6, 0.18)' 
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
                        <span style={{ fontSize: '1.4rem' }}>{fact.icon}</span>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: 900,
                          background: '#FEF3C7',
                          color: '#B45309',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          border: '1px solid #FDE68A'
                        }}>
                          FACT {fact.number}
                        </span>
                        <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1E1B4B' }}>
                          {fact.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(fact)}
                        style={{
                          background: isCurrentActive ? '#D97706' : '#FFFBEB',
                          color: isCurrentActive ? '#FFFFFF' : '#B45309',
                          border: '1.5px solid #FDE68A',
                          borderRadius: '12px',
                          padding: '0.4rem 0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '13.5px',
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
              background: pageIndex === 0 ? '#D97706' : '#FDE68A',
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
              background: pageIndex === 1 ? '#D97706' : '#FDE68A',
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
