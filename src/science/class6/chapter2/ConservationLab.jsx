import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Heart, Volume2, VolumeX, Sparkles, Trees, Bird, Award } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../services/elevenLabsService';

import scientist1Img from '../../../assets/Scientist1.jpeg';
import protectWildlifeImg from '../../../assets/protect_wildlife.jpeg';

const CONSERVATION_TOPICS = [
  {
    id: 'salim_ali',
    tag: 'Know a Scientist · Page 27',
    title: 'Dr. Salim Ali (1896–1987)',
    subtitle: 'The "Birdman of India"',
    image: scientist1Img,
    narration: "Dr. Salim Ali conducted the first systematic bird surveys across India. He helped save Keoladeo National Park in Bharatpur and Ranganathittu Bird Sanctuary in Mandya, authoring 10 authoritative volumes on birds of the Indian subcontinent.",
    highlights: [
      'Bird Surveys: Traveled across deserts, wetlands, and mountain peaks documenting migration routes and flight corridors.',
      'Sanctuary Preservation: Championed the formal protection of Keoladeo National Park (Rajasthan) and Ranganathittu Bird Sanctuary (Karnataka).',
      '10-Volume Handbook: Co-authored the landmark handbook on birds of India and Pakistan, awarded the Padma Vibhushan in 1976.'
    ],
    badge: '🦅 Ornithology Legend'
  },
  {
    id: 'wildlife_projects',
    tag: 'National Conservation · Page 28',
    title: 'Protecting Declining Species',
    subtitle: 'Project Tiger, Cheetah & Great Indian Bustard',
    image: protectWildlifeImg,
    narration: "Human habitat encroachment has threatened national fauna. In response, India launched Project Tiger in 1973 and the Cheetah Reintroduction Project in 2022, alongside dedicated protected zones for the Great Indian Bustard.",
    highlights: [
      'Project Tiger (1973): Initiated by the Government of India to protect declining Royal Bengal Tiger populations and their forest ecosystems.',
      'Cheetah Reintroduction (2022): Restoring apex grassland predators to revitalize open savanna ecosystems like Kuno National Park.',
      'Great Indian Bustard: Special breeding and protected grassland enclaves established across Rajasthan, Gujarat, and Maharashtra.'
    ],
    badge: '🐅 Apex Predators'
  }
];

export default function ConservationLab({ onBackToDashboard, onNextSubModule }) {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentTopic = CONSERVATION_TOPICS[activeTopicIndex];

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [activeTopicIndex]);

  const handleReadAloud = (text) => {
    if (isSpeaking) {
      stopNarration();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakNaturalIndianMale({
      text,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'rgba(250, 248, 242, 0.55)',
      borderRadius: '20px',
      border: '2px solid rgba(20, 69, 47, 0.5)',
      padding: '16px 22px 14px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(20, 69, 47, 0.08)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #14452F',
        paddingBottom: '12px',
        flexShrink: 0
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.06em', color: '#14452F', textTransform: 'uppercase', marginBottom: '3px' }}>
            Pages 22–28 · Biodiversity Conservation &amp; Scientists
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#14452F', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
            🛡️ Guardians of Nature: Science, Movements &amp; Tradition
          </h2>
        </div>

        <button
          onClick={() => handleReadAloud(currentTopic.narration)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            background: isSpeaking ? '#fee2e2' : 'rgba(250, 248, 242, 0.55)',
            border: `1.8px solid ${isSpeaking ? '#ef4444' : '#14452F'}`,
            borderRadius: '10px',
            color: isSpeaking ? '#991b1b' : '#14452F',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span>{isSpeaking ? 'Stop Narration' : 'Listen Story'}</span>
        </button>
      </div>

      {/* Topic Selection Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '10px 0',
        flexShrink: 0
      }}>
        {CONSERVATION_TOPICS.map((topic, idx) => {
          const isSelected = activeTopicIndex === idx;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setActiveTopicIndex(idx);
                if (isSpeaking && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '8px 12px',
                borderRadius: '12px',
                border: `1.8px solid #14452F`,
                background: isSelected ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)' : 'rgba(245, 241, 229, 0.6)',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 4px 14px rgba(20, 69, 47, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: '800', color: isSelected ? '#A7F3D0' : '#14452F', textTransform: 'uppercase' }}>
                {topic.tag.split('·')[0]}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '900', color: isSelected ? '#ffffff' : '#14452F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', marginTop: '2px' }}>
                {topic.title.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Focused Content Showcase Stage (Zero-Scroll 2-Column Card) */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1.15fr 1.85fr',
        gap: '16px',
        alignItems: 'stretch',
        overflow: 'hidden'
      }}>
        {/* Left Column: Visual Image Poster */}
        <div style={{
          background: 'rgba(250, 248, 242, 0.55)',
          border: '2px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '16px',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(20, 69, 47, 0.06)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              height: '100%',
              maxHeight: '230px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1.8px solid #14452F',
              background: '#0a1220',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img
                src={currentTopic.image}
                alt={currentTopic.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif', textAlign: 'center' }}>
              {currentTopic.subtitle}
            </div>
          </div>

          <div style={{ background: '#EDE7D8', border: '1.5px solid #14452F', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: '900', color: '#14452F' }}>
              {currentTopic.badge}
            </span>
            <span style={{ fontSize: '16px', color: '#14452F', fontWeight: '700' }}>
              NCERT Spotlight
            </span>
          </div>
        </div>

        {/* Right Column: Detailed Scientific Highlights */}
        <div style={{
          background: 'rgba(250, 248, 242, 0.55)',
          border: '2px solid rgba(20, 69, 47, 0.5)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(20, 69, 47, 0.06)',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#14452F', textTransform: 'uppercase' }}>
                {currentTopic.tag}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#14452F', background: '#EDE7D8', padding: '2px 8px', borderRadius: '6px', border: '1px solid #14452F' }}>
                Topic {activeTopicIndex + 1} of {CONSERVATION_TOPICS.length}
              </span>
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
              {currentTopic.title}
            </h3>

            <p style={{
              margin: '0 0 14px 0',
              fontSize: '16px',
              color: '#2A3B2C',
              lineHeight: 1.55,
              textAlign: 'justify'
            }}>
              {currentTopic.narration}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentTopic.highlights.map((item, hIdx) => {
                const parts = item.split(':');
                return (
                  <div
                    key={hIdx}
                    style={{
                      background: 'rgba(245, 241, 229, 0.6)',
                      border: '1.5px solid #14452F',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '16px',
                      color: '#14452F',
                      lineHeight: 1.5,
                      textAlign: 'justify'
                    }}
                  >
                    <b style={{ color: '#14452F' }}>{parts[0]}:</b>{parts.slice(1).join(':')}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1.5px solid #14452F',
            marginTop: '12px'
          }}>
            <button
              onClick={() => setActiveTopicIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeTopicIndex === 0}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: '1.8px solid #14452F',
                background: 'rgba(250, 248, 242, 0.55)',
                color: activeTopicIndex === 0 ? '#94a3b8' : '#14452F',
                cursor: activeTopicIndex === 0 ? 'default' : 'pointer'
              }}
            >
              ◀ Previous Topic
            </button>

            <button
              onClick={() => setActiveTopicIndex((prev) => Math.min(CONSERVATION_TOPICS.length - 1, prev + 1))}
              disabled={activeTopicIndex === CONSERVATION_TOPICS.length - 1}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                border: '1.8px solid #14452F',
                background: 'rgba(250, 248, 242, 0.55)',
                color: activeTopicIndex === CONSERVATION_TOPICS.length - 1 ? '#94a3b8' : '#14452F',
                cursor: activeTopicIndex === CONSERVATION_TOPICS.length - 1 ? 'default' : 'pointer'
              }}
            >
              Next Topic ▶
            </button>
          </div>
        </div>
      </div>

      {/* Footer Nav Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '2px solid #14452F',
        paddingTop: '10px',
        flexShrink: 0
      }}>
        <button
          onClick={onBackToDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(250, 248, 242, 0.55)',
            border: '1.8px solid #14452F',
            borderRadius: '10px',
            color: '#14452F',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <ArrowLeft size={18} color="#14452F" />
          <span>Back to Adaptations Lab</span>
        </button>

        <div style={{ fontSize: '16px', color: '#14452F', fontWeight: '800' }}>
          ✓ Environmental Conservation &amp; Cultural Heritage Module
        </div>

        <button
          onClick={onNextSubModule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
            borderRadius: '10px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '16px',
            border: '1.5px solid #10B981',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(20, 69, 47, 0.35)'
          }}
        >
          <span>Summary &amp; NCERT Exercises ➔</span>
        </button>
      </div>
    </div>
  );
}
