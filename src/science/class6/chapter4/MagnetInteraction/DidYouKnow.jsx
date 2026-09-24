import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, ArrowRight, Award } from 'lucide-react';
import { useHybridVoice } from '../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';
import './MagnetInteraction.css';

const factsData = [
  {
    id: 'magnetic_fields',
    number: '01',
    icon: '🌐',
    title: "Invisible Magnetic Fields",
    content: "Magnets exert force without touching! An invisible magnetic field extends through the surrounding space, pulling opposite poles together or pushing matching poles apart across air or water.",
    audioUrl: '/audio/magnetic_fields.mp3'
  },
  {
    id: 'like_repel_unlike_attract',
    number: '02',
    icon: '🧲',
    title: "Attraction vs Repulsion Law",
    content: "The universal law of magnetism states that like poles (North-North or South-South) repel, while unlike poles (North-South) attract. Repulsion is the only sure test for a magnet!",
    audioUrl: null
  },
  {
    id: 'electric_currents',
    number: '03',
    icon: '⚡',
    title: "André-Marie Ampère's Discovery",
    content: "French scientist André-Marie Ampère discovered that magnetic attraction and repulsion originate from microscopic electric currents flowing within the atoms of magnetic materials.",
    audioUrl: '/audio/electric_currents.mp3'
  },
  {
    id: 'maglev_trains',
    number: '04',
    icon: '🚅',
    title: "Maglev Floating Trains",
    content: "High-speed Maglev trains levitate above guide tracks using powerful magnetic repulsion. Because there is no track contact, friction is eliminated, enabling speeds exceeding 600 km/h!",
    audioUrl: '/audio/maglev_trains.mp3'
  },
  {
    id: 'everyday_uses',
    number: '05',
    icon: '🚪',
    title: "Everyday Magnetic Latches",
    content: "Refrigerator doors, cabinet latches, and bag clasps use permanent magnets to seal tightly without mechanical hooks, preventing cold air from escaping and conserving energy.",
    audioUrl: '/audio/everyday_uses.mp3'
  }
];

export default function DidYouKnow({ onComplete }) {
  const [activeFactId, setActiveFactId] = useState(factsData[0].id);
  const { speak, stop, isPlaying, spokenCharIndex } = useHybridVoice();

  const ELEVENLABS_DID_YOU_KNOW_VOICE_ID = ELEVENLABS_VOICES?.did_you_know || 'nPczCjzI2devNBz1zQrb';

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

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
            marginRight: '0.35rem'
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
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0.65rem 1rem',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>

      {/* Top Header Row with Title & Finish Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.4rem',
        marginBottom: '0.85rem',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '1.5px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}>
            <Sparkles size={28} color="#D97706" />
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '2.1rem',
            fontWeight: 900,
            color: '#173B5F',
            letterSpacing: '-0.02em'
          }}>
            Did You Know?
          </h2>
        </div>

        {onComplete && (
          <button
            onClick={onComplete}
            className="gold-glow-btn"
            style={{
              padding: '0.85rem 2.2rem',
              fontSize: '1.35rem',
              borderRadius: '20px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <Award size={24} color="#FFFFFF" />
            <span>Finish Activity</span>
            <ArrowRight size={22} color="#FFFFFF" />
          </button>
        )}
      </div>

      {/* Balanced Full-Height Symmetrical 2-Column Grid for Facts 01–05 with 2× Scaled Typography */}
      <div 
        className="custom-scrollbar"
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          overflowY: 'auto',
          paddingRight: '0.35rem',
          boxSizing: 'border-box'
        }}
      >
        {/* LEFT COLUMN: Facts 01 & 02 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {factsData.slice(0, 2).map((fact) => {
            const isActive = activeFactId === fact.id;
            const isCurrentlyPlaying = isPlaying && isActive;

            return (
              <div
                key={fact.id}
                onClick={() => setActiveFactId(fact.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: isActive ? '2.5px solid #173B5F' : '1.5px solid #E2E8F0',
                  borderRadius: '24px',
                  boxShadow: isActive ? '0 10px 30px rgba(23, 59, 95, 0.15)' : '0 6px 20px rgba(0, 0, 0, 0.05)',
                  padding: '1.65rem 1.95rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
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
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      background: 'rgba(23, 59, 95, 0.1)',
                      color: '#173B5F',
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      borderRadius: '10px',
                      padding: '0.25rem 0.75rem',
                      letterSpacing: '0.04em'
                    }}>
                      {fact.number}
                    </span>
                    <h3 style={{
                      margin: 0,
                      fontSize: '2.05rem',
                      fontWeight: 900,
                      color: '#1E1B4B',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25
                    }}>
                      {fact.title}
                    </h3>
                  </div>

                  {/* Audio Speaker Button with 2× Scaled Typography */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakFact(fact);
                    }}
                    title={isCurrentlyPlaying ? 'Pause Audio' : 'Listen to fact'}
                    style={{
                      background: isCurrentlyPlaying ? '#173B5F' : '#F1F5F9',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '16px',
                      padding: '0.65rem 1.35rem',
                      color: isCurrentlyPlaying ? '#FFFFFF' : '#173B5F',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: isCurrentlyPlaying ? '0 4px 14px rgba(23, 59, 95, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'all 0.18s ease',
                      flexShrink: 0
                    }}
                  >
                    {isCurrentlyPlaying ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    <span>{isCurrentlyPlaying ? 'Speaking' : 'Listen'}</span>
                  </button>
                </div>

                {/* Explanatory Body Text with 2× Scaled Typography */}
                <p style={{
                  margin: 0,
                  fontSize: '1.55rem',
                  lineHeight: '1.65',
                  color: '#1E293B',
                  fontWeight: 600
                }}>
                  {renderHighlightedContent(fact.content, fact.title, isCurrentlyPlaying, spokenCharIndex)}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Facts 03, 04 & 05 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {factsData.slice(2, 5).map((fact) => {
            const isActive = activeFactId === fact.id;
            const isCurrentlyPlaying = isPlaying && isActive;

            return (
              <div
                key={fact.id}
                onClick={() => setActiveFactId(fact.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: isActive ? '2.5px solid #173B5F' : '1.5px solid #E2E8F0',
                  borderRadius: '24px',
                  boxShadow: isActive ? '0 10px 30px rgba(23, 59, 95, 0.15)' : '0 6px 20px rgba(0, 0, 0, 0.05)',
                  padding: '1.55rem 1.95rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
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
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      background: 'rgba(23, 59, 95, 0.1)',
                      color: '#173B5F',
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      borderRadius: '10px',
                      padding: '0.25rem 0.75rem',
                      letterSpacing: '0.04em'
                    }}>
                      {fact.number}
                    </span>
                    <h3 style={{
                      margin: 0,
                      fontSize: '2.05rem',
                      fontWeight: 900,
                      color: '#1E1B4B',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25
                    }}>
                      {fact.title}
                    </h3>
                  </div>

                  {/* Audio Speaker Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakFact(fact);
                    }}
                    title={isCurrentlyPlaying ? 'Pause Audio' : 'Listen to fact'}
                    style={{
                      background: isCurrentlyPlaying ? '#173B5F' : '#F1F5F9',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '16px',
                      padding: '0.65rem 1.35rem',
                      color: isCurrentlyPlaying ? '#FFFFFF' : '#173B5F',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: isCurrentlyPlaying ? '0 4px 14px rgba(23, 59, 95, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'all 0.18s ease',
                      flexShrink: 0
                    }}
                  >
                    {isCurrentlyPlaying ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    <span>{isCurrentlyPlaying ? 'Speaking' : 'Listen'}</span>
                  </button>
                </div>

                {/* Explanatory Body Text */}
                <p style={{
                  margin: 0,
                  fontSize: '1.55rem',
                  lineHeight: '1.65',
                  color: '#1E293B',
                  fontWeight: 600
                }}>
                  {renderHighlightedContent(fact.content, fact.title, isCurrentlyPlaying, spokenCharIndex)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
