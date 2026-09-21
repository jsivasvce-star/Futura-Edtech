import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, ArrowRight, Compass, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './FunWithMagnets.css';

const factsData = [
  {
    id: 'maglev_trains',
    number: '01',
    icon: '🚄',
    title: "Maglev High-Speed Bullet Trains",
    content: "Maglev trains use powerful magnetic levitation to float above the tracks. Because there is no wheel-track friction, these trains can glide smoothly and silently at speeds exceeding 600 km/h!",
    audioUrl: null
  },
  {
    id: 'force_through_materials',
    number: '02',
    icon: '📦',
    title: "Magnetic Force Through Barriers",
    content: "Magnetic fields easily pass through non-magnetic materials like paper, cardboard, plastic, wood, and glass without losing their power, allowing magnets to guide objects without touching directly.",
    audioUrl: null
  },
  {
    id: 'animal_navigation',
    number: '03',
    icon: '🐢',
    title: "Animal Magnetoreception",
    content: "Homing pigeons, migratory sea turtles, and honeybees have microscopic magnetic crystals inside their bodies that act like built-in biological compasses, helping them navigate across oceans and continents.",
    audioUrl: null
  },
  {
    id: 'mri_medicine',
    number: '04',
    icon: '🏥',
    title: "Magnetic Resonance Imaging (MRI)",
    content: "Hospitals use giant superconducting electromagnets in MRI scanners. The intense magnetic field harmlessly aligns hydrogen atoms inside your body to create detailed 3D pictures of internal organs.",
    audioUrl: null
  },
  {
    id: 'magnet_care_keepers',
    number: '05',
    icon: '🧲',
    title: "Caring for Magnets with Keepers",
    content: "Magnets can lose their power if heated, dropped, or hammered. Bar magnets should always be stored in pairs with unlike poles together and soft iron 'keepers' across their ends to preserve their magnetic fields.",
    audioUrl: null
  }
];

export default function DidYouKnow({ onComplete, onBackToQuiz }) {
  const [activeFactId, setActiveFactId] = useState(factsData[0].id);
  const [pageIndex, setPageIndex] = useState(0); // 0 = First 3 facts, 1 = Next 2 facts
  const [direction, setDirection] = useState(1); // 1 = Next, -1 = Prev
  const { speak, stop, isPlaying, spokenCharIndex } = useHybridVoice();

  const ELEVENLABS_DID_YOU_KNOW_VOICE_ID = ELEVENLABS_VOICES?.did_you_know || 'nPczCjzI2devNBz1zQrb';

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const activeFact = factsData.find(f => f.id === activeFactId) || factsData[0];

  const handleReadAloud = (fact) => {
    if (isPlaying && activeFactId === fact.id) {
      stop();
    } else {
      setActiveFactId(fact.id);
      speak(fact.content, {
        voiceId: ELEVENLABS_DID_YOU_KNOW_VOICE_ID,
        rate: 0.95,
        pitch: 1.0,
        preferBrowser: false
      });
    }
  };

  const handleNextPage = () => {
    if (pageIndex < 1) {
      setDirection(1);
      setPageIndex(1);
      setActiveFactId(factsData[3].id);
      stop();
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex(0);
      setActiveFactId(factsData[0].id);
      stop();
    }
  };

  const currentFacts = pageIndex === 0 ? factsData.slice(0, 3) : factsData.slice(3, 5);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 140 : -140,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -140 : 140,
      opacity: 0
    })
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      gap: '1.25rem',
      padding: '0.5rem 0.75rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* Left Column: Ambient Imagery Card */}
      <div style={{
        flex: '1.1',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        padding: '1.35rem 1.6rem',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#EAF2F6',
            padding: '0.4rem 0.85rem',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            color: '#173B5F',
            fontSize: '0.88rem',
            fontWeight: 800,
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={16} color="#173B5F" />
            <span>DID YOU KNOW?</span>
          </div>

          <h2 style={{ margin: '0 0 0.6rem 0', color: '#1E1B4B', fontSize: '1.65rem', fontWeight: 900, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
            Marvels of Magnetism
          </h2>
          <p style={{ margin: 0, color: '#173B5F', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 600 }}>
            From high-speed bullet trains to animal migration and medical scanners, magnetic forces shape the modern world!
          </p>
        </div>

        {/* Ambient Photographic Image Frame */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          margin: '0.85rem 0',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 8px 20px rgba(217, 119, 6, 0.12)',
          background: '#000000',
          minHeight: '180px'
        }}>
          <img
            src="/ch4_cards/img_9.jpg"
            alt="Fun with Magnets"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Footer Info Pill */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: '1rem',
            flexShrink: 0
          }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E1B4B' }}>Fun with Magnets</div>
            <div style={{ fontSize: '0.8rem', color: '#173B5F', fontWeight: 600 }}>Interactive Science Lab · Grade 6</div>
          </div>
        </div>
      </div>

      {/* Right Column: Sliding Facts Presentation with Pagination Carousel */}
      <div style={{
        flex: '1.6',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        padding: '1.35rem 1.6rem',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header with Page Dots Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(217, 119, 6, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="#173B5F" />
            <h3 style={{ margin: 0, color: '#1E1B4B', fontSize: '1.25rem', fontWeight: 900 }}>
              Curated Scientific Facts
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', color: '#173B5F', fontWeight: 800 }}>
              Page {pageIndex + 1} of 2
            </span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <span style={{ width: pageIndex === 0 ? '18px' : '8px', height: '8px', borderRadius: '4px', background: pageIndex === 0 ? '#173B5F' : '#CBD5E1', transition: 'all 0.2s ease' }} />
              <span style={{ width: pageIndex === 1 ? '18px' : '8px', height: '8px', borderRadius: '4px', background: pageIndex === 1 ? '#173B5F' : '#CBD5E1', transition: 'all 0.2s ease' }} />
            </div>
          </div>
        </div>

        {/* Sliding Facts Body */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '0.75rem 0' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={pageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                justifyContent: 'space-evenly'
              }}
            >
              {currentFacts.map((fact) => {
                const isSelected = activeFactId === fact.id;
                const isThisSpeaking = isPlaying && isSelected;

                return (
                  <div
                    key={fact.id}
                    onClick={() => setActiveFactId(fact.id)}
                    style={{
                      background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                      border: isSelected ? '1.5px solid #173B5F' : '1.5px solid #E2E8F0',
                      borderRadius: '18px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: isSelected ? '0 6px 18px rgba(217, 119, 6, 0.12)' : '0 2px 8px rgba(217, 119, 6, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{fact.icon}</span>
                        <h4 style={{ margin: 0, color: '#1E1B4B', fontSize: '1.25rem', fontWeight: 900 }}>
                          {fact.number}. {fact.title}
                        </h4>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadAloud(fact);
                        }}
                        style={{
                          background: isThisSpeaking ? '#173B5F' : '#EAF2F6',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: isThisSpeaking ? '#FFFFFF' : '#173B5F',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isThisSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        <span>{isThisSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>
                    </div>

                    <p style={{
                      margin: 0,
                      color: '#173B5F',
                      fontSize: '1.15rem',
                      lineHeight: 1.5,
                      fontWeight: 600
                    }}>
                      {fact.content}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid rgba(217, 119, 6, 0.2)' }}>
          {/* Prev/Next Page Toggle Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
              style={{
                padding: '0.65rem 1.15rem',
                borderRadius: '14px',
                border: '1.5px solid #E2E8F0',
                background: pageIndex === 0 ? '#F1F5F9' : '#FFFFFF',
                color: pageIndex === 0 ? '#94A3B8' : '#173B5F',
                fontSize: '0.92rem',
                fontWeight: 900,
                cursor: pageIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft size={18} /> Prev Facts
            </button>

            <button
              onClick={handleNextPage}
              disabled={pageIndex === 1}
              style={{
                padding: '0.65rem 1.15rem',
                borderRadius: '14px',
                border: '1.5px solid #E2E8F0',
                background: pageIndex === 1 ? '#F1F5F9' : '#FFFFFF',
                color: pageIndex === 1 ? '#94A3B8' : '#173B5F',
                fontSize: '0.92rem',
                fontWeight: 900,
                cursor: pageIndex === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              Next Facts <ChevronRight size={18} />
            </button>
          </div>

          {/* Complete / Finish Button */}
          <button
            onClick={() => {
              if (onComplete) onComplete();
            }}
            className="gold-glow-btn"
            style={{
              padding: '0.75rem 1.8rem',
              borderRadius: '20px',
              fontSize: '1.02rem',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Complete Chapter 4 <ArrowRight size={18} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}
