import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questionMarkImage from '../qn.png';
import triImage from '../tri.png';
import { Volume2, VolumeX } from 'lucide-react';
import page4Audio from './version-2/audio/page4.mp3';
import page5Audio from './version-2/audio/page5.mp3';
import page6Audio from './audio/page6.mp3';

const STEPS = [
  {
    rows: 1,
    title: "Let's start with 1.",
    subtitle: "One number, one dot.",
    newDots: 0
  },
  {
    rows: 2,
    title: "How could we show 3?",
    subtitle: "Arrange these dots.",
    newDots: 2
  },
  {
    rows: 3,
    title: "We need three more.",
    subtitle: "Where should they go?",
    newDots: 3
  },
  {
    rows: 4,
    title: "Your turn.",
    subtitle: "Where do these four go?",
    newDots: 4
  },
  {
    rows: 4,
    title: "Triangular numbers",
    subtitle: "Now do you see the triangle?",
    newDots: 0,
    showOutline: true
  },
  {
    rows: 4,
    title: "Triangular numbers",
    subtitle: "So THAT'S the triangle!",
    newDots: 0,
    showSequence: true
  }
];

const DOT_SIZE = 40;
const DOT_GAP = 55;
const ROW_HEIGHT = DOT_GAP * 0.866; // sqrt(3)/2

function getDotPositions(rows) {
  const positions = [];
  const startY = 150;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= r; c++) {
      positions.push({
        id: `r${r}-c${c}`,
        row: r,
        col: c,
        x: (c - r / 2) * DOT_GAP,
        y: startY + r * ROW_HEIGHT
      });
    }
  }
  return positions;
}

export default function TriangularNumbersInteractive({ onNext, onPrev }) {
  const [step, setStep] = useState(0);
  const [placedDots, setPlacedDots] = useState([]); // array of ids
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const currentConfig = STEPS[step];
  const allPositions = getDotPositions(currentConfig.rows);
  
  const isComplete = placedDots.length === currentConfig.newDots;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    let audioSrc = null;
    if (step === 0) audioSrc = page4Audio;
    else if (step === 1) audioSrc = page5Audio;
    else if (step === 2) audioSrc = page6Audio;
    
    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      audioRef.current = newAudio;
      
      const handleEnded = () => setIsPlayingAudio(false);
      newAudio.addEventListener('ended', handleEnded);
      
      newAudio.play().then(() => setIsPlayingAudio(true)).catch(err => console.log("Audio play failed:", err));
      
      return () => {
        newAudio.removeEventListener('ended', handleEnded);
        newAudio.pause();
      };
    }
  }, [step]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlayingAudio(true);
    }
  };

  // Initialize placed dots when step changes
  useEffect(() => {
    setPlacedDots([]);
  }, [step]);

  const emptyTargets = allPositions.filter(p => p.row === currentConfig.rows - 1 && !placedDots.includes(p.id));
  const newDotsToDrag = currentConfig.newDots - placedDots.length;

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40vh', pointerEvents: 'none', zIndex: 0 }}>
         <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M 10,100 Q 15,60 30,100 Z" fill="rgba(74, 222, 128, 0.05)" />
           <path d="M -5,100 Q 15,40 40,100 Z" fill="rgba(74, 222, 128, 0.03)" />
           <path d="M 80,100 Q 90,50 105,100 Z" fill="rgba(74, 222, 128, 0.05)" />
           <path d="M 60,100 Q 85,40 110,100 Z" fill="rgba(74, 222, 128, 0.03)" />
         </svg>
      </div>

      {/* Top Header */}
      <div style={{ padding: '32px 40px 24px 40px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '18px', color: '#cbd5e1', letterSpacing: '1px', fontWeight: '800', marginBottom: '8px' }}>
            VISUAL PATTERNS &nbsp;•&nbsp; <span style={{color: '#4ade80'}}>1.3 &nbsp;•&nbsp; CONCEPT 05 / 11</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.5px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            {currentConfig.title}
          </h1>
          <h2 style={{ fontSize: '22px', fontWeight: '500', margin: '0', color: '#cbd5e1', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {currentConfig.subtitle}
          </h2>
        </div>
        <button onClick={toggleAudio} style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', ...(isPlayingAudio ? {backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)'} : {})}}>
          {isPlayingAudio ? <Volume2 size={18} /> : <VolumeX size={18} />} Listen
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: '600px', height: '400px', display: 'flex', justifyContent: 'center' }}>
          
          {/* Render already placed dots (from previous rows + placed in current row) */}
          {allPositions.map(pos => {
            const isPreviousRow = currentConfig.newDots === 0 ? pos.row < currentConfig.rows : pos.row < currentConfig.rows - 1;
            const isPlacedHere = isPreviousRow || placedDots.includes(pos.id);
            
            if (isPlacedHere) {
              return (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: pos.x - DOT_SIZE / 2,
                    top: pos.y,
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #38bdf8, #0369a1)',
                    boxShadow: '0 4px 12px rgba(3,105,161,0.5)'
                  }}
                />
              );
            }

            // Render empty target slot only if it's supposed to be filled
            if (currentConfig.newDots > 0) {
              return (
                <div
                  key={'target-'+pos.id}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: pos.x - DOT_SIZE / 2,
                    top: pos.y,
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderRadius: '50%',
                    border: '2px dashed rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    boxSizing: 'border-box'
                  }}
                />
              );
            }
            return null;
          })}

          {/* Render draggable dots at the bottom */}
          {currentConfig.newDots > 0 && !currentConfig.showSequence && Array.from({ length: newDotsToDrag }).map((_, idx) => {
            // Find the first empty target
            const target = emptyTargets[idx];
            if (!target) return null;
            
            return (
              <motion.div
                key={'drag-'+idx+'-'+step+'-'+placedDots.length}
                drag
                dragConstraints={{ top: -300, bottom: 50, left: -300, right: 300 }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                   if (info.offset.y < -50) {
                      setPlacedDots(prev => [...prev, target.id]);
                   }
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '50%',
                  marginLeft: (idx - (newDotsToDrag - 1) / 2) * (DOT_SIZE + 20) - DOT_SIZE/2,
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #38bdf8, #0369a1)',
                  boxShadow: '0 4px 12px rgba(3,105,161,0.5)',
                  cursor: 'grab',
                  zIndex: 50
                }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
              />
            )
          })}

          {/* Dashed triangle outline */}
          {currentConfig.showOutline && (
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
               <path 
                 d="M 300 119 L 165 353 L 435 353 Z"
                 fill="none" 
                 stroke="#cc9170" 
                 strokeWidth="3" 
                 strokeDasharray="8 9" 
               />
            </svg>
          )}

          {/* Sequence display in final step */}
          <AnimatePresence>
            {currentConfig.showSequence && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '-80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '40px',
                  width: '100%'
                }}
              >
                <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '2px' }}>
                  1, 3, 6, 10, 15 ...
                </div>
                
                <img src={triImage} alt="Triangle graphic" style={{ height: '120px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => onPrev && onPrev()}
            style={{
              background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: '18px', fontWeight: '700', cursor: 'pointer', padding: '10px 20px', borderRadius: '8px', transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,41,59,0.9)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.8)'; e.currentTarget.style.color = '#cbd5e1'; }}
          >
            &larr; Previous concept
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            disabled={!isComplete && !currentConfig.showSequence}
            onClick={() => {
              if (step < STEPS.length - 1) {
                setStep(s => s + 1);
              } else {
                onNext && onNext();
              }
            }}
            style={{
              backgroundColor: (!isComplete && !currentConfig.showSequence) ? 'rgba(255,255,255,0.1)' : '#0ea5e9',
              color: (!isComplete && !currentConfig.showSequence) ? 'rgba(255,255,255,0.3)' : '#fff',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: (!isComplete && !currentConfig.showSequence) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: (!isComplete && !currentConfig.showSequence) ? 'none' : '0 4px 14px 0 rgba(14, 165, 233, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            {step === STEPS.length - 1 ? "I'm ready. Let me try" : 'Continue'} 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
