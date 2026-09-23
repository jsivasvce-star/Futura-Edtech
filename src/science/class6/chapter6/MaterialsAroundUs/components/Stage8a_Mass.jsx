import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Scale, CheckCircle2, AlertCircle, Info, Target, GripHorizontal, Play, Pause } from 'lucide-react';
import { RealisticCup } from './Stage8a_Mass_Components/RealisticCup';
import { WeighingScale } from './Stage8a_Mass_Components/WeighingScale';
import fpage61Audio from '../../audio/fpage61.mp3?url';
import fpage61Json from '../../json/fpage61.json';

export default function Stage8a_Mass({ onComplete, addXp, setExtraRightAction }) {
  const [weighedItems, setWeighedItems] = useState({});
  const [currentOnScale, setCurrentOnScale] = useState(null);

  const instructionAudioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

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

  const handleTimeUpdate = () => {
    if (instructionAudioRef.current) {
      const time = instructionAudioRef.current.currentTime;
      const activeIdx = fpage61Json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    setActiveWordIndex(null);
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
  }, [isAudioPlaying, setExtraRightAction]);

  const cups = [
    { id: 'water', label: 'Cup A', material: 'Water', mass: 44.92 },
    { id: 'sand', label: 'Cup B', material: 'Sand', mass: 85.30 },
    { id: 'pebbles', label: 'Cup C', material: 'Pebbles', mass: 142.15 }
  ];

  const handleCupClick = (id) => {
    const cup = cups.find(c => c.id === id);
    setCurrentOnScale(cup);
    if (!weighedItems[id]) {
      setWeighedItems(prev => ({ ...prev, [id]: true }));
      if (typeof addXp === 'function') addXp(15);
    }
  };

  const progressCount = Object.keys(weighedItems).length;
  const isComplete = progressCount === 3;

  useEffect(() => {
    if (isComplete && typeof onComplete === 'function') {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', height: '100%', color: '#3E2723', background: '#F9F6F0', padding: '0.75rem', boxSizing: 'border-box', overflow: 'hidden' }}>
      <audio
        ref={instructionAudioRef}
        src={fpage61Audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />
      
      {/* Header */}
      <div style={{ background: '#FDFBF7', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#134e4a', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Scale size={32} color="#134e4a" /> Phase 1: How heavy or light?
          </h3>
          <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '600', color: '#4A3B5C' }}>
            Activity 6.8:{' '}
            {fpage61Json.words.map((w, i) => (
              <span
                key={i}
                style={{
                  color: activeWordIndex === i ? '#A94727' : 'inherit',
                  background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                  borderRadius: '4px',
                  padding: '0 2px',
                  transition: 'all 0.15s ease-out'
                }}
              >
                {w.text}{i < fpage61Json.words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Main Content - 3 Column Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(300px, auto) minmax(420px, auto) 1fr', 
        gap: '1.5rem', 
        flex: 1, 
        minHeight: 0,
        alignItems: 'stretch'
      }}>
        
        {/* Left Side: Material Evidence */}
        <div style={{ background: '#FDFBF7', borderRadius: '16px', border: '1px solid #EAE3D9', padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
          <h4 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#134e4a' }}>MATERIAL EVIDENCE</h4>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
            {cups.map(cup => {
              const hasBeenWeighed = weighedItems[cup.id];
              const isCurrentlyOnScale = currentOnScale?.id === cup.id;
              
              return (
                <motion.div 
                  key={cup.id}
                  whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(87, 65, 51, 0.12)' }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => { if (!hasBeenWeighed || hasBeenWeighed) handleCupClick(cup.id) }}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: '#FFFFFF',
                    padding: '0.75rem', borderRadius: '12px', border: '1px solid #EAE3D9',
                    boxShadow: '0 2px 4px rgba(87, 65, 51, 0.04)',
                    position: 'relative',
                    userSelect: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    opacity: isCurrentlyOnScale ? 0.6 : (hasBeenWeighed ? 0.8 : 1)
                  }}
                >
                  <div style={{ flexShrink: 0, width: '70px', height: '90px', zIndex: 10 }}>
                    <RealisticCup material={cup.id} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#134e4a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GripHorizontal size={18} color="#9ca3af" /> {cup.label}
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#431407' }}>{cup.material}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Middle: Weighing Station */}
        <div style={{ background: '#FDFBF7', borderRadius: '16px', border: '1px solid #EAE3D9', padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
          <h4 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#134e4a' }}>DIGITAL WEIGHING STATION</h4>
          
          <div style={{ 
              flex: 1,
              background: '#F6F3EC',
              border: currentOnScale ? '1px solid #EAE3D9' : '1px dashed #d6d3d1', 
              borderRadius: '12px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'visible',
              transition: 'border-color 0.2s ease, background 0.2s ease'
            }}
          >
            {/* Guidance prompt when empty */}
            {!currentOnScale && (
              <div style={{ position: 'absolute', top: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pointerEvents: 'none' }}>
                <div style={{ color: '#78716c', fontSize: '1.2rem', fontWeight: '700', textAlign: 'center', maxWidth: '160px', lineHeight: '1.4' }}>
                  Click a cup to weigh it
                </div>
              </div>
            )}

            {/* Weighing Scale Component */}
            <WeighingScale 
              currentCupOnScale={currentOnScale?.id || null} 
              mass={currentOnScale?.mass || 0} 
              isHovered={false}
            />
          </div>
        </div>

        {/* Right Side: Observation Console & Inference */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: 0 }}>
          {/* Observation Log */}
          <div style={{ background: '#FDFBF7', borderRadius: '16px', border: '1px solid #EAE3D9', padding: isComplete ? '0.75rem 1rem' : '1.25rem', display: 'flex', flexDirection: 'column', gap: isComplete ? '0.5rem' : '1rem', flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold', color: '#c2410c', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={24} color="#c2410c" /> Observation Log
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: isComplete ? '0.5rem' : '0.75rem' }}>
              {cups.map(cup => {
                const isWeighed = weighedItems[cup.id];
                const isPebbles = cup.id === 'pebbles';
                const highlight = isComplete && isPebbles;
                return (
                  <motion.div 
                    key={cup.id}
                    layout
                    style={{ 
                      background: '#FFFFFF', 
                      padding: isComplete ? '0.5rem 0.75rem' : '0.75rem 1rem', 
                      borderRadius: '12px', 
                      border: highlight ? '2px solid #fbbf24' : '1px solid #EAE3D9',
                      boxShadow: highlight ? '0 4px 6px -1px rgba(245, 158, 11, 0.2)' : '0 2px 4px rgba(87, 65, 51, 0.04)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      flex: 1,
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: isComplete ? '30px' : '40px', height: isComplete ? '45px' : '55px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RealisticCup material={cup.id} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ fontWeight: '800', fontSize: '1.2rem', color: highlight ? '#134e4a' : '#134e4a' }}>{cup.label}</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: highlight ? '#c2410c' : '#431407' }}>{cup.material}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <motion.div 
                        key={isWeighed ? 'measured' : 'empty'}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ fontSize: '1.8rem', fontWeight: '800', color: highlight ? '#c2410c' : '#78350f' }}
                      >
                        {isWeighed ? `${cup.mass.toFixed(2)} g` : '??? g'}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Inference Panel (Sits directly underneath Observation Log) */}
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }} 
              style={{ 
                background: '#FDFBF7', 
                padding: '1rem 1.25rem', 
                borderRadius: '16px', 
                border: '1px solid #EAE3D9', 
                boxShadow: '0 4px 6px rgba(87, 65, 51, 0.08)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ color: '#134e4a', fontSize: '1.6rem', fontWeight: '900', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={24} /> INFERENCE
              </div>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#134e4a', lineHeight: '1.4' }}>
                Even though all cups are the same size, they have different weights! 
                This property is called <strong style={{ color: '#c2410c', fontWeight: '900', fontSize: '1.6rem' }}>MASS</strong>.
              </p>
              <div style={{ marginTop: '0.6rem', background: '#fef3c7', padding: '0.6rem 0.75rem', borderRadius: '10px', borderLeft: '4px solid #f59e0b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#134e4a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   Pebbles — 142.15 g <CheckCircle2 size={24} color="#c2410c" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Section: Progress */}
      <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
        {/* Footer Progress */}
        <div style={{ flex: '1', background: '#FDFBF7', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#134e4a' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Weigh all 3 cups to uncover their mass.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3E2723', display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 16px', borderRadius: '20px', border: '1px solid #EAE3D9' }}>
              {progressCount} / 3 Weighed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Stage8a_Mass.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func,
  setExtraRightAction: PropTypes.func
};
