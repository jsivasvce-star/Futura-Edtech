import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';
import { useHybridVoice } from '../../../../../hooks/useHybridVoice';
import { ELEVENLABS_VOICES } from '../../../../../services/elevenLabsService';
import '../MagneticPoles.css';

const factsData = [
  {
    id: 'earth_giant_magnet',
    number: '01',
    icon: '🌍',
    title: "Earth is a Giant Magnet",
    content: "Earth acts like a gigantic magnet! Deep within its core, churning molten iron generates an invisible magnetic shield that spans into space, directing compass needles north and deflecting dangerous solar particles.",
    audioUrl: '/audio/earth_giant_magnet.mp3'
  },
  {
    id: 'gilbert_discovery',
    number: '02',
    icon: '🧭',
    title: "William Gilbert's Groundbreaking Discovery",
    content: "In the year 1600, English scientist William Gilbert proved that our planet itself behaves as a giant magnetic sphere. His historic treatise 'De Magnete' laid the foundation for modern navigation and physics.",
    audioUrl: '/audio/gilbert_discovery.mp3'
  },
  {
    id: 'poles_pairs',
    number: '03',
    icon: '🧲',
    title: "Magnetic Poles Always Exist in Pairs",
    content: "No matter how many times you cut or break a magnet in half, each individual piece instantly forms its own North and South poles. An isolated magnetic single pole (monopole) cannot exist!",
    audioUrl: '/audio/poles_pairs.mp3'
  },
  {
    id: 'max_strength',
    number: '04',
    icon: '⚡',
    title: "Poles Hold Maximum Magnetic Force",
    content: "When iron filings are sprinkled over any magnet, they cluster most densely near the two ends. The magnetic field lines converge tightly at the poles, making attraction strongest at the ends.",
    audioUrl: '/audio/max_strength.mp3'
  },
  {
    id: 'modern_marvels',
    number: '05',
    icon: '🚅',
    title: "Modern Marvels: MRI Scanners & Maglev Trains",
    content: "Superconducting magnets in hospitals power MRI scanners to visualize organs without surgery. Meanwhile, bullet-speed Maglev trains levitate above tracks using magnetic repulsion to achieve silent, frictionless travel.",
    audioUrl: null
  }
];

export default function Stage5_DidYouKnowPage({ onComplete, onBackToQuiz }) {
  const [activeFactId, setActiveFactId] = useState(factsData[0].id);
  const { speak, stop, isPlaying, spokenCharIndex } = useHybridVoice();

  const ELEVENLABS_DID_YOU_KNOW_VOICE_ID = ELEVENLABS_VOICES?.did_you_know || 'nPczCjzI2devNBz1zQrb';

  // Stop audio on unmount
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

  // Synchronized word highlighter for the currently playing fact
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

      return (
        <span
          key={i}
          style={{
            color: isCurrentWord ? '#D97706' : '#1E293B',
            fontWeight: isCurrentWord ? 800 : 500,
            backgroundColor: isCurrentWord ? '#FEF3C7' : 'transparent',
            borderRadius: isCurrentWord ? '4px' : '0px',
            padding: isCurrentWord ? '0 3px' : '0',
            transition: 'all 0.1s ease',
            display: 'inline-block',
            marginRight: '0.24rem'
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
      padding: '0.25rem 0.5rem',
      boxSizing: 'border-box',
      position: 'relative'
    }}>

      {/* Main 2-Column Content Area */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '48% 52%',
        gap: '1.15rem',
        overflow: 'hidden'
      }}>
        {/* LEFT COLUMN: Image Container */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 0
        }}>
          {/* Visual Container */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: '#0B132B',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0
          }}>
            <img
              src="/MagneticPoles/did_you_know_earth_magnetism.jpg"
              alt="Earth's Geomagnetic Field and Magnetic Poles"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Each Fact within its own Separate Container */}
        <div
          className="custom-scrollbar"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto',
            maxHeight: '100%',
            minHeight: 0,
            paddingRight: '0.45rem',
            boxSizing: 'border-box'
          }}
        >
          {factsData.map((fact) => {
            const isActive = activeFactId === fact.id;
            const isCurrentlyPlaying = isPlaying && isActive;

            return (
              <div
                key={fact.id}
                onClick={() => setActiveFactId(fact.id)}
                style={{
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                  border: isActive ? '2px solid #D97706' : '1.5px solid #FDE68A',
                  borderRadius: '20px',
                  boxShadow: isActive ? '0 8px 24px rgba(217, 119, 6, 0.18)' : '0 4px 14px rgba(217, 119, 6, 0.08)',
                  padding: '1.25rem 1.45rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                {/* Fact Header Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{
                      background: 'rgba(217, 119, 6, 0.15)',
                      color: '#B45309',
                      fontSize: '13px',
                      fontWeight: 900,
                      borderRadius: '8px',
                      padding: '0.2rem 0.55rem',
                      letterSpacing: '0.04em'
                    }}>
                      FACT {fact.number}
                    </span>
                    <h4 style={{
                      margin: 0,
                      fontSize: '21px',
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
                      padding: '0.42rem 0.8rem',
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

                {/* Fact Content Text with Highlighting */}
                <p style={{
                  margin: 0,
                  fontSize: '16.5px',
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

      {/* Bottom Completion Action Footer */}
      <div style={{
        marginTop: '0.5rem',
        padding: '0.45rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: onBackToQuiz ? 'space-between' : 'flex-end',
        flexShrink: 0,
        background: '#FFFFFF',
        borderTop: '1.5px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isPlaying && (
            <button
              onClick={stop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#FEE2E2',
                border: '1.5px solid #FCA5A5',
                color: '#991B1B',
                borderRadius: '24px',
                padding: '0.55rem 1.15rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <VolumeX size={15} /> Stop Audio
            </button>
          )}

          {onBackToQuiz && (
            <button
              onClick={onBackToQuiz}
              style={{
                background: '#F1F5F9',
                border: '1.5px solid #CBD5E1',
                borderRadius: '24px',
                padding: '0.55rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: 800,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Review Quiz
            </button>
          )}
        </div>

        <button
          onClick={onComplete}
          className="gold-glow-btn"
          style={{
            padding: '0.65rem 1.75rem',
            fontSize: '0.95rem',
            fontWeight: 900,
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Award size={18} color="#FFFFFF" />
          <span>Complete Activity 4.2</span>
          <ArrowRight size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
