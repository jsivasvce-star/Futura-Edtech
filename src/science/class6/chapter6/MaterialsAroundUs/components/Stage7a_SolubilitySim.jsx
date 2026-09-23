/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Droplets, Target, Camera, Play, Pause, RotateCcw } from 'lucide-react';

import sugarVid from '../../../../../assets/sugar_soluble.mp4';
import saltVid from '../../../../../assets/salt_soluble.mp4';
import chalkVid from '../../../../../assets/chalk_insoluble.mp4';
import sandVid from '../../../../../assets/sand_insoluble.mp4';
import sawdustVid from '../../../../../assets/sawdust_insoluble.mp4';
import fpage54Audio from '../../audio/fpage54.mp3?url';
import fpage54Json from '../../json/fpage54.json';
import fpage54_1Audio from '../../audio/fpage54-1.mp3?url';
import fpage54_1Json from '../../json/fpage54-1.json';
import fpage54_2Audio from '../../audio/fpage54-2.mp3?url';
import fpage54_2Json from '../../json/fpage54-2.json';
import fpage54_3Audio from '../../audio/fpage54-3.mp3?url';
import fpage54_3Json from '../../json/fpage54-3.json';
import fpage54_4Audio from '../../audio/fpage54-4.mp3?url';
import fpage54_4Json from '../../json/fpage54-4.json';
import fpage54_5Audio from '../../audio/fpage54-5.mp3?url';
import fpage54_5Json from '../../json/fpage54-5.json';

const materialVideos = {
  sugar: sugarVid,
  salt: saltVid,
  chalk: chalkVid,
  sand: sandVid,
  sawdust: sawdustVid
};

export default function Stage7a_SolubilitySim({ onComplete, addXp, setExtraRightAction }) {
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [stirState, setStirState] = useState('idle'); // idle, stirring (video playing), resolved
  const [observations, setObservations] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const instructionAudioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  const obsAudioRef = useRef(null);
  const [isObsAudioPlaying, setIsObsAudioPlaying] = useState(false);
  const [activeObsWordIndex, setActiveObsWordIndex] = useState(null);

  const toggleInstructionAudio = () => {
    if (instructionAudioRef.current) {
      if (isAudioPlaying) {
        instructionAudioRef.current.pause();
      } else {
        instructionAudioRef.current.play().catch(e => console.error(e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (instructionAudioRef.current) {
      const time = instructionAudioRef.current.currentTime;
      const activeIdx = fpage54Json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    setActiveWordIndex(null);
  };

  const toggleObsAudio = () => {
    if (obsAudioRef.current) {
      if (isObsAudioPlaying) {
        obsAudioRef.current.pause();
      } else {
        obsAudioRef.current.play().catch(e => console.error(e));
      }
      setIsObsAudioPlaying(!isObsAudioPlaying);
    }
  };

  const handleObsAudioTimeUpdate = () => {
    if (obsAudioRef.current && selectedSubstance) {
      const time = obsAudioRef.current.currentTime;
      const activeIdx = selectedSubstance.json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeObsWordIndex) {
        setActiveObsWordIndex(activeIdx);
      }
    }
  };

  const handleObsAudioEnded = () => {
    setIsObsAudioPlaying(false);
    setActiveObsWordIndex(null);
  };

  const renderObsWords = (type) => {
    if (!selectedSubstance) return null;
    const range = selectedSubstance.wordsMap[type];
    const words = selectedSubstance.json.words.slice(range[0], range.length > 1 ? range[1] + 1 : range[0] + 1);
    
    return words.map((w, i) => {
      const actualIdx = range[0] + i;
      return (
        <React.Fragment key={actualIdx}>
          <span
            style={{
              color: activeObsWordIndex === actualIdx ? '#A94727' : 'inherit',
              background: activeObsWordIndex === actualIdx ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
              borderRadius: '4px',
              transition: 'all 0.15s ease-out'
            }}
          >
            {w.text}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    if (setExtraRightAction) {
      setExtraRightAction(
        <button
          onClick={toggleInstructionAudio}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'white', color: 'var(--lesson-primary)',
            border: '2px solid var(--lesson-primary)',
            padding: '8px 16px', borderRadius: '8px',
            fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {isAudioPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isAudioPlaying ? "Pause Audio" : "Play Audio"}
        </button>
      );
    }
    return () => {
      if (setExtraRightAction) setExtraRightAction(null);
    };
  }, [setExtraRightAction, isAudioPlaying]);

  const substances = [
    { 
      id: 'sugar', name: 'Sugar', type: 'Soluble', image: '/images/solubility_sugar.png',
      desc: 'Sugar completely disappears when stirred into water.',
      conclusion: 'Materials that dissolve in water are called Soluble.',
      waterColor: '#7dd3fc', turbidity: 0, solidVisible: false,
      audioSrc: fpage54_1Audio, json: fpage54_1Json,
      wordsMap: { material: [0], name: [1], obsLabel: [2], obsTitle: [3, 5], obsDesc: [6, 12], concLabel: [13], concDesc: [14, 21] }
    },
    { 
      id: 'salt', name: 'Salt', type: 'Soluble', image: '/images/solubility_salt.png',
      desc: 'Salt completely disappears when stirred into water.',
      conclusion: 'Materials that dissolve in water are called Soluble.',
      waterColor: '#7dd3fc', turbidity: 0, solidVisible: false,
      audioSrc: fpage54_2Audio, json: fpage54_2Json,
      wordsMap: { material: [0], name: [1], obsLabel: [2], obsTitle: [3, 5], obsDesc: [6, 12], concLabel: [13], concDesc: [14, 21] }
    },
    { 
      id: 'chalk', name: 'Chalk Powder', type: 'Insoluble', image: '/images/solubility_chalk.png',
      desc: 'The water turns cloudy and chalk powder does not disappear.',
      conclusion: 'Materials that do not dissolve in water are Insoluble.',
      waterColor: '#f1f5f9', turbidity: 0.8, solidVisible: true, solidColor: '#f1f5f9', settle: false,
      audioSrc: fpage54_3Audio, json: fpage54_3Json,
      wordsMap: { material: [0], name: [1, 2], obsLabel: [3], obsTitle: [4, 6], obsDesc: [7, 16], concLabel: [17], concDesc: [18, 26] }
    },
    { 
      id: 'sand', name: 'Sand', type: 'Insoluble', image: '/images/solubility_sand.png',
      desc: 'Sand settles down at the bottom of the beaker.',
      conclusion: 'Sand is Insoluble in water.',
      waterColor: '#7dd3fc', turbidity: 0.2, solidVisible: true, solidColor: '#eab308', settle: true,
      audioSrc: fpage54_4Audio, json: fpage54_4Json,
      wordsMap: { material: [0], name: [1], obsLabel: [2], obsTitle: [3, 5], obsDesc: [6, 14], concLabel: [15], concDesc: [16, 20] }
    },
    { 
      id: 'sawdust', name: 'Sawdust', type: 'Insoluble', image: '/images/solubility_sawdust.png',
      desc: 'Sawdust floats on the surface of the water.',
      conclusion: 'Sawdust is Insoluble in water.',
      waterColor: '#7dd3fc', turbidity: 0.1, solidVisible: true, solidColor: '#d97706', float: true,
      audioSrc: fpage54_5Audio, json: fpage54_5Json,
      wordsMap: { material: [0], name: [1], obsLabel: [2], obsTitle: [3, 5], obsDesc: [6, 13], concLabel: [14], concDesc: [15, 19] }
    }
  ];

  const handleSelect = (sub) => {
    if (obsAudioRef.current) {
      obsAudioRef.current.pause();
      obsAudioRef.current.currentTime = 0;
    }
    setIsObsAudioPlaying(false);
    setActiveObsWordIndex(null);

    setSelectedSubstance(sub);
    setStirState('stirring');
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  };

  const handleVideoEnd = () => {
    setStirState('resolved');
    if (!observations[selectedSubstance.id]) {
      setObservations(prev => ({ ...prev, [selectedSubstance.id]: true }));
      addXp(15);
    }
  };

  const obsCount = Object.keys(observations).length;
  const isComplete = obsCount === substances.length;

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', height: '100%', color: '#3E2723' }}>
      
      <audio
        ref={instructionAudioRef}
        src={fpage54Audio}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Header */}
      <div style={{ background: 'var(--lesson-background)', border: '1px solid var(--lesson-border)', borderRadius: '16px', padding: 'clamp(0.5rem, 1.5vh, 1rem) clamp(1rem, 2vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', color: '#2C4E3D', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
            <Search size={32} color="var(--lesson-accent)" /> Phase 1: Solubility Simulator
          </h3>
          <p style={{ margin: 0, fontSize: 'clamp(1rem, 1.5vw, 1.35rem)', color: '#4A3B5C', fontWeight: '500' }}>
            Activity 6.7: {' '}
            {fpage54Json.words.slice(0, 13).map((w, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    color: activeWordIndex === i ? '#A94727' : 'inherit',
                    background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    transition: 'all 0.15s ease-out'
                  }}
                >
                  {w.text}
                </span>
                {i < 12 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)' }}>
          <div style={{ background: 'white', border: '1px solid #D9C9A3', borderRadius: '12px', padding: 'clamp(8px, 1.5vh, 16px) clamp(12px, 2vw, 24px)', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)', color: '#2C4E3D', fontWeight: '600' }}>
              {fpage54Json.words.slice(13, 16).map((w, i) => {
                const idx = i + 13;
                return (
                  <React.Fragment key={idx}>
                    <span
                      style={{
                        color: activeWordIndex === idx ? '#A94727' : 'inherit',
                        background: activeWordIndex === idx ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                        borderRadius: '4px',
                        transition: 'all 0.15s ease-out'
                      }}
                    >
                      {w.text}
                    </span>
                    {i < 2 ? ' ' : ''}
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)', color: '#2C4E3D', fontWeight: '600' }}>
              {fpage54Json.words.slice(22, 27).map((w, i) => {
                const idx = i + 22;
                return (
                  <React.Fragment key={idx}>
                    <span
                      style={{
                        color: activeWordIndex === idx ? '#A94727' : 'inherit',
                        background: activeWordIndex === idx ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                        borderRadius: '4px',
                        transition: 'all 0.15s ease-out'
                      }}
                    >
                      {w.text}
                    </span>
                    {i < 4 ? ' ' : ''}
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{ position: 'absolute', right: '-8px', top: '50%', translateY: '-50%', width: '16px', height: '16px', background: 'white', borderRight: '1px solid #d6d3d1', borderBottom: '1px solid #d6d3d1', transform: 'rotate(-45deg) translateY(-50%)' }} />
          </div>
          <img src="/images/chief_detective_blake.png" alt="Chief" style={{ width: 'clamp(70px, 10vh, 110px)', height: 'clamp(70px, 10vh, 110px)', objectFit: 'contain' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--lesson-border)', overflow: 'hidden' }}>
        
        {/* Left Side: Experiment */}
        <div style={{ flex: '1 1 50%', minWidth: 0, maxWidth: '50%', padding: 'clamp(0.5rem, 1.5vh, 1rem)', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--lesson-border)', boxSizing: 'border-box' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0 }}>
            <h3 style={{ margin: '0 0 clamp(0.5rem, 1.5vh, 1rem) 0', color: '#4A3B5C', display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 'bold' }}>
              Materials to Test
            </h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vh, 1rem)', alignItems: 'center', width: '100%', minHeight: 0 }}>
              <div style={{ display: 'flex', gap: 'clamp(0.5rem, 1.5vw, 2rem)', justifyContent: 'center', width: '100%', flex: 1, minHeight: 0 }}>
                {substances.slice(0, 3).map((sub) => {
                  const isSelected = selectedSubstance?.id === sub.id;
                  const isObserved = observations[sub.id];
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSelect(sub)}
                      style={{
                        background: isSelected ? 'var(--lesson-surface)' : 'white',
                        border: `2px solid ${isSelected ? '#A94727' : 'var(--lesson-border)'}`,
                        color: isSelected ? '#2C4E3D' : '#3E2723',
                        padding: 'clamp(0.25rem, 1vh, 1rem)',
                        borderRadius: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(0.25rem, 1vh, 0.75rem)',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 15px rgba(166, 75, 39, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        width: '100%',
                        maxWidth: '280px',
                        boxSizing: 'border-box',
                        flex: '1 1 0',
                        minHeight: 0
                      }}
                    >
                      <div style={{ position: 'relative', height: 'clamp(50px, min(12vw, 15vh), 120px)', aspectRatio: '1/1' }}>
                        <div style={{ width: '100%', height: '100%', background: '#FFFFFF', borderRadius: '50%', padding: '12%', border: '1px solid var(--lesson-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                          <img src={sub.image} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        {isObserved && (
                          <div style={{ position: 'absolute', top: -5, right: -5, background: '#A94727', color: 'white', borderRadius: '50%', width: 'clamp(20px, 3vh, 32px)', height: 'clamp(20px, 3vh, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.8rem, 1.5vh, 1.2rem)', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>✓</div>
                        )}
                      </div>
                      <span style={{ fontSize: 'clamp(0.9rem, 2vh, 1.5rem)', textAlign: 'center', lineHeight: '1.2', width: '100%', wordWrap: 'break-word', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 'clamp(0.5rem, 1.5vw, 2rem)', justifyContent: 'center', width: '100%', flex: 1, minHeight: 0 }}>
                {substances.slice(3).map((sub) => {
                  const isSelected = selectedSubstance?.id === sub.id;
                  const isObserved = observations[sub.id];
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSelect(sub)}
                      style={{
                        background: isSelected ? 'var(--lesson-surface)' : 'white',
                        border: `2px solid ${isSelected ? '#A94727' : 'var(--lesson-border)'}`,
                        color: isSelected ? '#2C4E3D' : '#3E2723',
                        padding: 'clamp(0.25rem, 1vh, 1rem)',
                        borderRadius: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(0.25rem, 1vh, 0.75rem)',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 15px rgba(166, 75, 39, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        width: '100%',
                        maxWidth: '280px',
                        boxSizing: 'border-box',
                        flex: '1 1 0',
                        minHeight: 0
                      }}
                    >
                      <div style={{ position: 'relative', height: 'clamp(50px, min(12vw, 15vh), 120px)', aspectRatio: '1/1' }}>
                        <div style={{ width: '100%', height: '100%', background: '#FFFFFF', borderRadius: '50%', padding: '12%', border: '1px solid var(--lesson-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                          <img src={sub.image} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        {isObserved && (
                          <div style={{ position: 'absolute', top: -5, right: -5, background: '#A94727', color: 'white', borderRadius: '50%', width: 'clamp(20px, 3vh, 32px)', height: 'clamp(20px, 3vh, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.8rem, 1.5vh, 1.2rem)', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>✓</div>
                        )}
                      </div>
                      <span style={{ fontSize: 'clamp(0.9rem, 2vh, 1.5rem)', textAlign: 'center', lineHeight: '1.2', width: '100%', wordWrap: 'break-word', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Observation Console */}
        <div style={{ flex: '1 1 50%', minWidth: 0, maxWidth: '50%', padding: 'clamp(0.5rem, 1.5vh, 1rem)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#4A3B5C', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--lesson-border)', paddingBottom: 'clamp(0.5rem, 1vh, 1rem)', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
            <Camera size={32} color="var(--lesson-accent)" /> Observation Console
          </h4>
          
          <audio
            ref={obsAudioRef}
            src={selectedSubstance?.audioSrc}
            onTimeUpdate={handleObsAudioTimeUpdate}
            onEnded={handleObsAudioEnded}
          />

          <AnimatePresence mode="wait">
            {selectedSubstance && stirState === 'resolved' ? (
              <motion.div
                key={selectedSubstance.id + stirState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vh, 1rem)', background: 'var(--lesson-background)', borderRadius: '16px', padding: 'clamp(1rem, 2vh, 1.5rem)', border: '1px solid var(--lesson-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflowY: 'auto', position: 'relative' }}
              >
                {/* Play Button for Observation Audio */}
                <button
                  onClick={toggleObsAudio}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'white', color: 'var(--lesson-primary)',
                    border: '2px solid var(--lesson-primary)',
                    padding: '8px 16px', borderRadius: '8px',
                    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {isObsAudioPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isObsAudioPlaying ? "Pause Audio" : "Play Audio"}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flexShrink: 0, paddingRight: '120px' }}>
                  <div style={{ color: '#A94727', fontSize: 'clamp(1.2rem, 2vh, 1.4rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {renderObsWords('material')}
                  </div>
                  <div style={{ fontSize: 'clamp(2rem, 4vh, 3rem)', color: '#2C4E3D', fontWeight: '900' }}>
                    {renderObsWords('name')}
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '16px', padding: 'clamp(1rem, 2vh, 1.5rem)', border: '1px solid #D9C9A3', display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vh, 0.75rem)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexShrink: 0 }}>
                  <div style={{ color: '#4A3B5C', fontSize: 'clamp(1.2rem, 2vh, 1.4rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {renderObsWords('obsLabel')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(1.75rem, 3.5vh, 2.75rem)', fontWeight: '900', color: selectedSubstance.type === 'Soluble' ? 'var(--lesson-success)' : 'var(--lesson-accent)' }}>
                    {renderObsWords('obsTitle')}
                  </div>
                  <div style={{ color: '#44403c', fontSize: 'clamp(1.3rem, 2.5vh, 1.6rem)', lineHeight: '1.4', fontWeight: '600' }}>
                    {renderObsWords('obsDesc')}
                  </div>
                </div>

                <div style={{ background: selectedSubstance.type === 'Soluble' ? 'var(--lesson-success-bg)' : 'var(--lesson-background)', borderRadius: '16px', padding: 'clamp(1rem, 2vh, 1.5rem)', border: `1px solid ${selectedSubstance.type === 'Soluble' ? 'var(--lesson-success-border)' : 'var(--lesson-border)'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexShrink: 0 }}>
                  <div style={{ color: selectedSubstance.type === 'Soluble' ? '#A94727' : '#A94727', fontSize: 'clamp(1.2rem, 2vh, 1.4rem)', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                    {renderObsWords('concLabel')}
                  </div>
                  <div style={{ color: selectedSubstance.type === 'Soluble' ? '#14532d' : '#2C4E3D', fontSize: 'clamp(1.5rem, 3vh, 2rem)', lineHeight: '1.4', fontWeight: '900' }}>
                    {renderObsWords('concDesc')}
                  </div>
                </div>
              </motion.div>
            ) : selectedSubstance && stirState === 'stirring' ? (
              <motion.div 
                key="video-playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: 0, position: 'relative', background: 'transparent', paddingTop: '12px' }}
              >
                <video
                  ref={videoRef}
                  src={materialVideos[selectedSubstance.id]}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '12px', border: '1px solid var(--lesson-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                
                {/* Video Controls Overlay */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.85)', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', backdropFilter: 'blur(4px)' }}>
                  <button 
                    onClick={togglePlayPause}
                    style={{
                      background: '#A94727',
                      border: '3px solid #F5E0A5',
                      borderRadius: '16px',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: '#FAF7F2',
                      boxShadow: '0 0 12px rgba(255,220,150,0.6)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(255,220,150,0.8)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,220,150,0.6)'; }}
                  >
                    {isPlaying ? <Pause size={32} color="#FAF7F2" strokeWidth={3} style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }} /> : <Play size={32} color="#FAF7F2" strokeWidth={3} style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }} />}
                  </button>
                  <button 
                    onClick={handleReplay}
                    style={{
                      background: '#A94727',
                      border: '3px solid #F5E0A5',
                      borderRadius: '16px',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: '#FAF7F2',
                      boxShadow: '0 0 12px rgba(255,220,150,0.6)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(255,220,150,0.8)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,220,150,0.6)'; }}
                  >
                    <RotateCcw size={32} color="#FAF7F2" strokeWidth={3} style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#78716c', textAlign: 'center', border: '2px dashed #d6d3d1', borderRadius: '12px', padding: '1rem', background: '#FFFFFF', minHeight: 0 }}>
                <div style={{ background: 'white', padding: '15px', borderRadius: '50%', border: '1px solid var(--lesson-border)' }}>
                  <Droplets size={40} color="#a8a29e" />
                </div>
                <span style={{ fontSize: 'clamp(1rem, 2vh, 1.1rem)' }}>Select a material and stir to observe its solubility.</span>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Progress */}
      <div style={{ 
        background: 'var(--lesson-background)', 
        border: '1px solid var(--lesson-border)', 
        borderRadius: '16px', 
        padding: 'clamp(0.4rem, 1vh, 0.5rem) clamp(1rem, 2vw, 1.5rem)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A94727' }}>
          <span style={{ color: '#2C4E3D', fontSize: 'clamp(1rem, 1.8vh, 1.35rem)', fontWeight: 'bold' }}>Test all 5 materials to see if they are soluble or insoluble.</span>
        </div>

        <div style={{ 
          fontSize: 'clamp(1rem, 1.8vh, 1.35rem)', 
          fontWeight: 'bold', 
          color: obsCount === substances.length ? '#A94727' : 'var(--lesson-secondary)',
          background: obsCount === substances.length ? 'var(--lesson-success-bg)' : '#f5f5f4',
          padding: '6px 16px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Target size={18} /> {obsCount} / {substances.length} tested
        </div>
      </div>

    </div>
  );
}

Stage7a_SolubilitySim.propTypes = {
  onComplete: PropTypes.func.isRequired,
  addXp: PropTypes.func,
  setExtraRightAction: PropTypes.func
};
