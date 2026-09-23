import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, ShieldAlert, EyeOff, User, Target, Camera, Play, Pause } from 'lucide-react';
import fpage47Audio from '../../audio/fpage47.mp3?url';
import fpage47Json from '../../json/fpage47.json';
import fpage47Audio1 from '../../audio/fpage47-1.mp3?url';
import fpage47Json1 from '../../json/fpage47-1.json';
import fpage47Audio2 from '../../audio/fpage47-2.mp3?url';
import fpage47Json2 from '../../json/fpage47-2.json';
import fpage47Audio3 from '../../audio/fpage47-3.mp3?url';
import fpage47Json3 from '../../json/fpage47-3.json';
import fpage47Audio4 from '../../audio/fpage47-4.mp3?url';
import fpage47Json4 from '../../json/fpage47-4.json';

export default function Stage6a_Surveillance({ onComplete, addXp, setExtraRightAction }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [observations, setObservations] = useState({});
  const [overlayState, setOverlayState] = useState({ spotId: null, phase: null });
  const [investigatingSpot, setInvestigatingSpot] = useState(null);
  const [progress, setProgress] = useState(0);
  const activationTimerRef = useRef(null);
  const completionTimerRef = useRef(null);

  const instructionAudioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  const toggleInstructionAudio = useCallback(() => {
    if (instructionAudioRef.current) {
      if (isAudioPlaying) {
        instructionAudioRef.current.pause();
      } else {
        instructionAudioRef.current.play().catch(e => console.error(e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  }, [isAudioPlaying]);

  const handleAudioTimeUpdate = () => {
    if (instructionAudioRef.current) {
      const time = instructionAudioRef.current.currentTime;
      const activeIdx = fpage47Json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    setActiveWordIndex(null);
  };

  const obsAudioRef = useRef(null);
  const [isObsAudioPlaying, setIsObsAudioPlaying] = useState(false);
  const [activeObsWordIndex, setActiveObsWordIndex] = useState(null);

  const toggleObsAudio = useCallback(() => {
    if (obsAudioRef.current) {
      if (isObsAudioPlaying) {
        obsAudioRef.current.pause();
      } else {
        obsAudioRef.current.play().catch(e => console.error(e));
      }
      setIsObsAudioPlaying(!isObsAudioPlaying);
    }
  }, [isObsAudioPlaying]);

  const currentObsJson = selectedSpot?.id === 'wall' ? fpage47Json1 :
                         selectedSpot?.id === 'frosted' ? fpage47Json2 :
                         selectedSpot?.id === 'tree' ? fpage47Json3 :
                         selectedSpot?.id === 'window' ? fpage47Json4 : null;

  const currentObsAudio = selectedSpot?.id === 'wall' ? fpage47Audio1 :
                          selectedSpot?.id === 'frosted' ? fpage47Audio2 :
                          selectedSpot?.id === 'tree' ? fpage47Audio3 :
                          selectedSpot?.id === 'window' ? fpage47Audio4 : null;

  const handleObsAudioTimeUpdate = () => {
    if (obsAudioRef.current && currentObsJson) {
      const time = obsAudioRef.current.currentTime;
      const activeIdx = currentObsJson.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeObsWordIndex) {
        setActiveObsWordIndex(activeIdx);
      }
    }
  };

  const handleObsAudioEnded = () => {
    setIsObsAudioPlaying(false);
    setActiveObsWordIndex(null);
  };

  useEffect(() => {
    if (obsAudioRef.current) {
      obsAudioRef.current.pause();
      obsAudioRef.current.currentTime = 0;
    }
    setIsObsAudioPlaying(false);
    setActiveObsWordIndex(null);
  }, [selectedSpot]);

  useEffect(() => {
    if (setExtraRightAction) {
      setExtraRightAction(
        <button
          onClick={toggleInstructionAudio}
          className="outline"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '0.85rem 1.6rem', borderRadius: '10px',
            background: 'var(--accent)', color: 'white', border: 'none',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
            fontSize: '1.6rem', fontWeight: 'bold'
          }}
        >
          {isAudioPlaying ? <Pause size={22} /> : <Play size={22} />}
          {isAudioPlaying ? "Pause" : "Play"}
        </button>
      );
    }
    return () => {
      if (setExtraRightAction) setExtraRightAction(null);
    };
  }, [setExtraRightAction, isAudioPlaying, toggleInstructionAudio]);

  const spots = [
    {
      id: 'wall',
      name: 'Behind a Wall',
      type: 'Opaque',
      view: 'No View',
      icon: <EyeOff size={24} color="#dc2626" />,
      desc: 'The suspect is completely hidden behind the solid brick wall. No light passes through.',
      conclusion: 'Materials through which you cannot see at all are Opaque.',
      image: '/images/surveillance_wall.png'
    },
    {
      id: 'frosted',
      name: 'Frosted Glass Door',
      type: 'Translucent',
      view: 'Blurry View',
      icon: <ShieldAlert size={24} color="#ca8a04" />,
      desc: 'You can see a blurry silhouette of the suspect. Some light passes through, but not enough for a clear image.',
      conclusion: 'Materials through which objects can be seen, but not clearly, are Translucent.',
      image: '/images/surveillance_frosted.png'
    },
    {
      id: 'tree',
      name: 'Big Tree',
      type: 'Opaque',
      view: 'No View',
      icon: <EyeOff size={24} color="#dc2626" />,
      desc: 'The suspect is hiding behind a thick wooden tree trunk. Wood blocks all light from passing through.',
      conclusion: 'Wood is an Opaque material.',
      image: '/images/surveillance_tree.png'
    },
    {
      id: 'window',
      name: 'Clear Glass Window',
      type: 'Transparent',
      view: 'Clear View',
      icon: <Eye size={24} color="#16a34a" />,
      desc: 'You have a perfect view of the suspect through the window. Light passes through completely.',
      conclusion: 'Materials through which things can be seen clearly are Transparent.',
      image: '/images/surveillance_window.png'
    }
  ];

  const renderMappedText = (text, indexMap, activeIndex, color, bgColor) => {
    const words = text.split(' ');
    return words.map((word, i) => {
      const audioIdx = indexMap[i];
      const isActive = activeIndex === audioIdx;
      return (
        <React.Fragment key={i}>
          <span style={{ 
            color: isActive ? color : 'inherit', 
            background: isActive ? bgColor : 'transparent', 
            borderRadius: '4px', 
            padding: '0 2px', 
            transition: 'all 0.15s ease-out' 
          }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  const handleSpotClick = (spot) => {
    if (investigatingSpot) return; // Prevent clicks while another is loading

    if (observations[spot.id]) {
      setSelectedSpot(spot);
      if (activationTimerRef.current) clearInterval(activationTimerRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
      setOverlayState({ spotId: spot.id, phase: 'active' });
      completionTimerRef.current = setTimeout(() => {
        setOverlayState({ spotId: null, phase: null });
      }, 3000);
      return;
    }

    setInvestigatingSpot(spot.id);
    setProgress(0);

    const startTime = Date.now();
    const duration = 3000;

    if (activationTimerRef.current) clearInterval(activationTimerRef.current);
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);

      if (p >= 100) {
        clearInterval(interval);
        setInvestigatingSpot(null);
        setObservations(prev => ({ ...prev, [spot.id]: true }));
        setSelectedSpot(spot);
        addXp(15);
        
        if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
        setOverlayState({ spotId: spot.id, phase: 'active' });
        completionTimerRef.current = setTimeout(() => {
          setOverlayState({ spotId: null, phase: null });
        }, 3000);
      }
    }, 30);
    
    activationTimerRef.current = interval;
  };

  useEffect(() => {
    return () => {
      if (activationTimerRef.current) clearInterval(activationTimerRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
    };
  }, []);

  const obsCount = Object.keys(observations).length;
  const isComplete = obsCount === spots.length;

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%', color: 'var(--text-primary)' }}>
      
      {/* Audio Element */}
      <audio
        ref={instructionAudioRef}
        src={fpage47Audio}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
      />
      <audio
        ref={obsAudioRef}
        src={currentObsAudio || undefined}
        onTimeUpdate={handleObsAudioTimeUpdate}
        onEnded={handleObsAudioEnded}
      />

      {/* Header */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: 'clamp(29.04px, 3.63vw, 36.3px)', fontWeight: '900', color: 'var(--heading-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Search size={24} color="var(--accent)" /> Phase 1:{' '}
            {fpage47Json.words.slice(0, 2).map((w, i) => (
              <React.Fragment key={`title-${i}`}>
                <span
                  style={{
                    color: activeWordIndex === i ? 'var(--accent)' : 'inherit',
                    background: activeWordIndex === i ? 'rgba(217, 119, 6, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    padding: '0 2px',
                    transition: 'all 0.15s ease-out'
                  }}
                >
                  {w.text.replace('.', '')}
                </span>
                {i < 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h3>
          <p style={{ margin: 0, fontSize: 'clamp(21.78px, 3.025vw, 26.62px)', fontWeight: '600', color: 'var(--heading-sub)', lineHeight: '1.5' }}>
            {fpage47Json.words.slice(2, 16).map((w, i) => (
              <React.Fragment key={`p-${i}`}>
                <span
                  style={{
                    color: activeWordIndex === (i + 2) ? 'var(--accent)' : 'inherit',
                    background: activeWordIndex === (i + 2) ? 'rgba(217, 119, 6, 0.1)' : 'transparent',
                    borderRadius: '4px',
                    padding: '0 2px',
                    transition: 'all 0.15s ease-out'
                  }}
                >
                  {w.text}
                </span>
                {i < 13 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/images/chief_detective_blake.png" alt="Chief" style={{ width: '85px', height: '85px', objectFit: 'contain' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Surveillance Scene (2x2 Grid of CSS Cards) */}
        <div style={{ flex: 1.8, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px' }}>
          
          {spots.map((spot, index) => {
            const isSelected = selectedSpot?.id === spot.id;
            
            return (
              <motion.div
                key={spot.id}
                onClick={() => handleSpotClick(spot)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  border: isSelected ? '4px solid var(--accent)' : '2px solid var(--border)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: isSelected ? '0 0 20px rgba(79, 70, 229, 0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'border 0.2s, box-shadow 0.2s'
                }}
                whileHover={{ scale: 1.02, zIndex: 5, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)' }}
              >
                {/* Scene Content */}
                <AnimatePresence mode="wait">
                  {!observations[spot.id] ? (
                    <motion.div 
                      key="unobserved"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                      <img src="/images/surveillance_unknown.jpg" alt="Unknown Target" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      
                      {!investigatingSpot && (
                        <motion.div
                          animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 16px rgba(59,130,246,0.8)', '0 0 0px rgba(59,130,246,0)'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            position: 'absolute',
                            bottom: '30px',
                            background: 'rgba(15, 23, 42, 0.85)',
                            color: '#60a5fa',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            border: '2px solid rgba(59,130,246,0.5)'
                          }}
                        >
                          <Search size={20} /> Click to investigate
                        </motion.div>
                      )}

                      {investigatingSpot === spot.id && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(6px)',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          gap: '16px', color: 'white', zIndex: 10
                        }}>
                          <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Analyzing visibility...</div>
                          <div style={{ width: '60%', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: '#3b82f6', transition: 'width 0.1s linear' }} />
                          </div>
                          <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#60a5fa' }}>{progress}%</div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="observed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Observation Effect Overlay */}
                <AnimatePresence>
                  {overlayState.spotId === spot.id && overlayState.phase === 'active' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 15,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ...(spot.type === 'Transparent' ? {
                          backdropFilter: 'brightness(1.15) contrast(1.1) saturate(1.2)'
                        } : spot.type === 'Translucent' ? {
                          backdropFilter: 'blur(12px) brightness(1.1) grayscale(0.2)'
                        } : {
                          background: 'rgba(20,20,20,0.85)',
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.4) 10px, rgba(0,0,0,0.4) 20px)'
                        })
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{
                          background: spot.type === 'Transparent' ? 'rgba(255,255,255,0.9)' : spot.type === 'Translucent' ? 'rgba(255,255,255,0.8)' : 'rgba(220,38,38,0.9)',
                          color: spot.type === 'Opaque' ? '#ffffff' : '#0f172a',
                          padding: '0.75rem 2rem', borderRadius: '50px',
                          fontSize: '1.4rem', fontWeight: 'bold', textTransform: 'uppercase',
                          border: spot.type === 'Opaque' ? '3px solid #7f1d1d' : '3px solid #cbd5e1',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                          display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                      >
                        {spot.type === 'Transparent' && <Eye size={22} />}
                        {spot.type === 'Translucent' && <ShieldAlert size={22} />}
                        {spot.type === 'Opaque' && <EyeOff size={22} />}
                        {spot.type}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlay Label */}
                <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--text-heading)', color: 'white', padding: '8px 16px', borderRadius: '24px', fontSize: '1.3125rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  <div style={{ background: 'var(--accent)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>{index + 1}</div>
                  {!observations[spot.id] ? 'Unknown Target' : spot.name}
                </div>



                {observations[spot.id] && (
                  <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: '#16a34a', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '1.2075rem', fontWeight: 'bold', zIndex: 20 }}>
                    Observed
                  </div>
                )}
              </motion.div>
            );
          })}
          
        </div>

        {/* Observation Console */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--heading-section)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: '800' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={26} color="var(--accent)" /> Observation Console
              </span>
              {selectedSpot && (
                <button
                  onClick={toggleObsAudio}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '0.5rem 1rem', borderRadius: '8px',
                    background: 'var(--accent)', color: 'white', border: 'none',
                    cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold'
                  }}
                >
                  {isObsAudioPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isObsAudioPlaying ? "Pause" : "Play"}
                </button>
              )}
            </h4>
            
            <AnimatePresence mode="wait">
              {selectedSpot ? (
                <motion.div
                  key={selectedSpot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2804rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Target Location</div>
                    <div style={{ fontSize: '1.8139rem', color: 'var(--text-heading)', fontWeight: 'bold' }}>
                      {selectedSpot.id === 'wall' && renderMappedText(selectedSpot.name, [3, 4, 5], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'frosted' && renderMappedText(selectedSpot.name, [3, 4, 5], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'tree' && renderMappedText(selectedSpot.name, [3, 4], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'window' && renderMappedText(selectedSpot.name, [3, 4, 5], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                    </div>
                  </div>

                  <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2804rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Visibility</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.65385rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {selectedSpot.icon}
                      {selectedSpot.id === 'wall' && renderMappedText(selectedSpot.view, [10, 11], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'frosted' && renderMappedText(selectedSpot.view, [10, 11], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'tree' && renderMappedText(selectedSpot.view, [9, 10], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                      {selectedSpot.id === 'window' && renderMappedText(selectedSpot.view, [10, 11], activeObsWordIndex, 'var(--accent)', 'rgba(217,119,6,0.1)')}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.3871rem', lineHeight: '1.5' }}>
                      {selectedSpot.id === 'wall' && currentObsJson?.words.slice(12, 26).map((w, i) => (
                        <React.Fragment key={`desc-${i}`}><span style={{ color: activeObsWordIndex === (i + 12) ? 'var(--accent)' : 'inherit', background: activeObsWordIndex === (i + 12) ? 'rgba(217,119,6,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < 13 ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'frosted' && currentObsJson?.words.slice(12, 32).map((w, i) => (
                        <React.Fragment key={`desc-${i}`}><span style={{ color: activeObsWordIndex === (i + 12) ? 'var(--accent)' : 'inherit', background: activeObsWordIndex === (i + 12) ? 'rgba(217,119,6,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < 19 ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'tree' && currentObsJson?.words.slice(11, 28).map((w, i) => (
                        <React.Fragment key={`desc-${i}`}><span style={{ color: activeObsWordIndex === (i + 11) ? 'var(--accent)' : 'inherit', background: activeObsWordIndex === (i + 11) ? 'rgba(217,119,6,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < 16 ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'window' && currentObsJson?.words.slice(12, 27).map((w, i) => (
                        <React.Fragment key={`desc-${i}`}><span style={{ color: activeObsWordIndex === (i + 12) ? 'var(--accent)' : 'inherit', background: activeObsWordIndex === (i + 12) ? 'rgba(217,119,6,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < 14 ? ' ' : ''}</React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: '#f0fdfa', borderRadius: '12px', padding: '1.25rem', border: '1px solid #ccfbf1', marginTop: 'auto' }}>
                    <div style={{ color: '#0d9488', fontSize: '1.2804rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Conclusion</div>
                    <div style={{ color: '#115e59', fontSize: '1.4938rem', lineHeight: '1.5', fontWeight: 'bold' }}>
                      {selectedSpot.id === 'wall' && currentObsJson?.words.slice(27).map((w, i) => (
                        <React.Fragment key={`conc-${i}`}><span style={{ color: activeObsWordIndex === (i + 27) ? '#0f766e' : 'inherit', background: activeObsWordIndex === (i + 27) ? 'rgba(15,118,110,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < (currentObsJson.words.length - 27 - 1) ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'frosted' && currentObsJson?.words.slice(33).map((w, i) => (
                        <React.Fragment key={`conc-${i}`}><span style={{ color: activeObsWordIndex === (i + 33) ? '#0f766e' : 'inherit', background: activeObsWordIndex === (i + 33) ? 'rgba(15,118,110,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < (currentObsJson.words.length - 33 - 1) ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'tree' && currentObsJson?.words.slice(29).map((w, i) => (
                        <React.Fragment key={`conc-${i}`}><span style={{ color: activeObsWordIndex === (i + 29) ? '#0f766e' : 'inherit', background: activeObsWordIndex === (i + 29) ? 'rgba(15,118,110,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < (currentObsJson.words.length - 29 - 1) ? ' ' : ''}</React.Fragment>
                      ))}
                      {selectedSpot.id === 'window' && currentObsJson?.words.slice(28).map((w, i) => (
                        <React.Fragment key={`conc-${i}`}><span style={{ color: activeObsWordIndex === (i + 28) ? '#0f766e' : 'inherit', background: activeObsWordIndex === (i + 28) ? 'rgba(15,118,110,0.1)' : 'transparent', borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s ease-out' }}>{w.text}</span>{i < (currentObsJson.words.length - 28 - 1) ? ' ' : ''}</React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)', textAlign: 'center', border: '2px dashed var(--border)', borderRadius: '12px', padding: '2rem' }}>
                  <div style={{ background: 'var(--surface)', padding: '15px', borderRadius: '50%' }}>
                    <Camera size={40} color="var(--border)" />
                  </div>
                  <span style={{ fontSize: '1.22705rem' }}>
                    {fpage47Json.words.slice(16, 25).map((w, i) => (
                      <React.Fragment key={`obs-${i}`}>
                        <span
                          style={{
                            color: activeWordIndex === (i + 16) ? 'var(--accent)' : 'inherit',
                            background: activeWordIndex === (i + 16) ? 'rgba(217, 119, 6, 0.1)' : 'transparent',
                            borderRadius: '4px',
                            padding: '0 2px',
                            transition: 'all 0.15s ease-out'
                          }}
                        >
                          {w.text}
                        </span>
                        {i < 8 ? ' ' : ''}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>



        </div>

      </div>

      {/* Footer Progress */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d97706' }}>
          <div style={{ background: '#fefce8', padding: '8px', borderRadius: '50%' }}>
            <Target size={22} />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.4375rem' }}>Click on each location (1-4) to check if the suspect is visible through the material.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '1.265rem' }}>
            <img src="/images/chief_detective_blake.png" alt="Hat" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            Observations: <span style={{ color: isComplete ? '#16a34a' : 'var(--text-heading)', fontSize: '1.4375rem' }}>{obsCount} / 4</span>
          </div>
        </div>
      </div>

    </div>
  );
}
