import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Heart, Volume2, VolumeX, Sparkles, Trees, Bird, Award } from 'lucide-react';
import { speakNaturalIndianMale, stopNarration } from '../../../../services/elevenLabsService';

import scientist1Img from '../../../../assets/Scientist1.jpeg';
import scientist2Img from '../../../../assets/Scientist2.jpeg';
import silentValleyImg from '../../../../assets/silent_valley.jpeg';
import protectWildlifeImg from '../../../../assets/protect_wildlife.jpeg';
import sacredGrovesImg from '../../../../assets/sacred_grove.png';

const CONSERVATION_TOPICS = [
  {
    id: 'janaki',
    tag: 'Know a Scientist · Page 22',
    title: 'Dr. E.K. Janaki Ammal (1897–1984)',
    subtitle: 'Botanist & Guardian of Silent Valley',
    image: scientist2Img,
    narration: "Dr. Janaki Ammal was an eminent Indian botanist who documented India's rich plant biodiversity. She led the Botanical Survey of India and played a key role in the historic Save Silent Valley movement to protect Kerala's moist evergreen rainforest.",
    highlights: [
      'Pioneering Botanist: First Indian woman to obtain a doctorate in botany, documenting thousands of native and medicinal plant varieties.',
      'Head of BSI: Reorganized the Botanical Survey of India to systematically map indigenous flora.',
      'Save Silent Valley: Mobilized national scientific advocacy to prevent the destruction of untouched evergreen forests in Palakkad, Kerala.'
    ],
    badge: '🌿 Plant Biodiversity Icon'
  },
  {
    id: 'silent_valley',
    tag: 'Success Story · Page 23',
    title: 'Save Silent Valley Movement',
    subtitle: 'Citizen Triumph in Palakkad, Kerala',
    image: silentValleyImg,
    narration: "The Save Silent Valley movement was a remarkable 10-year public campaign. Citizens, poets, and scientists successfully stopped a hydroelectric dam across the Kunthipuzha river, permanently preserving pristine rainforest and the endangered Lion-tailed Macaque.",
    highlights: [
      'The Threat (1973): A hydroelectric dam project proposed across the Kunthipuzha river threatened to submerge 8.3 square km of ancient rainforest.',
      'Citizen Mobilization: Common people, students, teachers, and environmentalists held rallies, published petitions, and took legal action without violence.',
      'Historic Victory (1984): The dam was cancelled and Silent Valley was permanently protected as an untouched National Park.'
    ],
    badge: '✊ People\'s Movement'
  },
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
  },
  {
    id: 'sacred_groves',
    tag: 'Traditional Wisdom · Page 29',
    title: 'Sacred Groves of India',
    subtitle: 'Community-Protected Living Sanctuaries',
    image: sacredGrovesImg,
    narration: "Sacred groves are undisturbed forest patches protected by local village communities through sacred tradition. Found in the Western Ghats and Meghalaya, no trees may be cut and no animals harmed, preserving rare medicinal herbs for centuries.",
    highlights: [
      'Traditional Taboos: Strict cultural conventions forbid felling trees, grazing livestock, or harming any living creature within the grove boundary.',
      'Medicinal Plant Refuges: Act as botanical gene banks preserving wild ancestors of crops and valuable healing plants unavailable elsewhere.',
      'Living Treasure: Demonstrates that indigenous Indian communities have practiced decentralized environmental conservation for generations.'
    ],
    badge: '🌳 Sacred Heritage'
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
      background: 'rgba(15, 23, 42, 0.50)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderRadius: '20px',
      border: '2px solid #D4AF37',
      padding: '16px 22px 14px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.30)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid rgba(212, 175, 55, 0.45)',
        paddingBottom: '12px',
        flexShrink: 0
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.06em', color: '#FDE68A', textTransform: 'uppercase', marginBottom: '3px' }}>
            Pages 22–29 · Biodiversity Conservation, Scientists &amp; Sacred Groves
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#FBBF24', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}>
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

      {/* 5-Segment Selection Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
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
                background: isSelected ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(245, 241, 229, 0.6)',
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
          background: 'rgba(15, 23, 42, 0.50)',
          border: '2px solid #D4AF37',
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
              border: '1.8px solid #D4AF37',
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
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif', textAlign: 'center' }}>
              {currentTopic.subtitle}
            </div>
          </div>

          <div style={{ background: '#EDE7D8', border: '1.5px solid rgba(212, 175, 55, 0.6)', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: '900', color: '#F8FAFC' }}>
              {currentTopic.badge}
            </span>
            <span style={{ fontSize: '16px', color: '#F8FAFC', fontWeight: '700' }}>
              NCERT Spotlight
            </span>
          </div>
        </div>

        {/* Right Column: Detailed Scientific Highlights */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.50)',
          border: '2px solid #D4AF37',
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
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', textTransform: 'uppercase' }}>
                {currentTopic.tag}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', background: '#EDE7D8', padding: '2px 8px', borderRadius: '6px', border: '1px solid #14452F' }}>
                Topic {activeTopicIndex + 1} of 5
              </span>
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '900', color: '#F8FAFC', fontFamily: '"Fraunces", Georgia, serif' }}>
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
                      background: 'rgba(15, 23, 42, 0.45)',
                      border: '1.5px solid rgba(212, 175, 55, 0.6)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '16px',
                      color: '#F8FAFC',
                      lineHeight: 1.5,
                      textAlign: 'justify'
                    }}
                  >
                    <b style={{ color: '#F8FAFC' }}>{parts[0]}:</b>{parts.slice(1).join(':')}
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
                border: '1.8px solid #D4AF37',
                background: 'rgba(15, 23, 42, 0.50)',
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
                border: '1.8px solid #D4AF37',
                background: 'rgba(15, 23, 42, 0.50)',
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
        borderTop: '2px solid rgba(212, 175, 55, 0.45)',
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
            background: 'rgba(15, 23, 42, 0.50)',
            border: '1.8px solid #D4AF37',
            borderRadius: '10px',
            color: '#F8FAFC',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <ArrowLeft size={18} color="#14452F" />
          <span>Back to Adaptations Lab</span>
        </button>

        <div style={{ fontSize: '16px', color: '#F8FAFC', fontWeight: '800' }}>
          ✓ Environmental Conservation &amp; Cultural Heritage Module
        </div>

        <button
          onClick={onNextSubModule}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '10px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '16px',
            border: '1.8px solid #FDE68A',
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
