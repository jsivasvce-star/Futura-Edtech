import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import page7Audio from './audio/page7.mp3';
import page8Audio from './audio/page8.mp3';
import page9Audio from './audio/page9.mp3';

const STEPS = [
  {
    n: 1,
    title: "Let's start with a cube made of 1 block.",
    subtitle: "1 layer • 1 row • 1 column",
    newBlocks: 1
  },
  {
    n: 2,
    title: "Make a cube with 2 blocks along each side.",
    subtitle: "Build the next layer.",
    newBlocks: 8
  },
  {
    n: 3,
    title: "Now make a cube with 3 blocks along each side.",
    subtitle: "Complete the cube, layer by layer.",
    newBlocks: 27
  }
];

function getCubePositions(n) {
  const positions = [];
  const cx = 300, baseY = 240, size = 65;
  for (let layer = 0; layer < n; layer++) {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        positions.push({
          id: `l${layer}-x${x}-y${y}`,
          layer,
          x_idx: x,
          y_idx: y,
          x: cx + (x - y) * size * 0.81,
          y: baseY + (x + y - (n - 1)) * size * 0.43 - layer * size,
          size
        });
      }
    }
  }
  return positions;
}

const IsoCube = ({ size, fillTop = '#fb7185', fillLeft = '#f43f5e', fillRight = '#e11d48', ghost = false }) => {
  const w = size * 0.78;
  const h = size * 0.42;
  const r = size;
  return (
    <svg width={size * 2} height={size * 2} viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
      <polygon 
        points={`${-w},${-h} 0,${-2*h} ${w},${-h} 0,0`} 
        fill={ghost ? 'rgba(255,255,255,0.15)' : fillTop} 
        stroke={ghost ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'} 
        strokeWidth={ghost ? "3" : "2.5"} 
        strokeDasharray={ghost ? "6 4" : "none"} 
      />
      <polygon 
        points={`0,0 ${w},${-h} ${w},${r-h} 0,${r}`} 
        fill={ghost ? 'rgba(255,255,255,0.15)' : fillRight} 
        stroke={ghost ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'} 
        strokeWidth={ghost ? "3" : "2.5"} 
        strokeDasharray={ghost ? "6 4" : "none"} 
      />
      <polygon 
        points={`0,0 ${-w},${-h} ${-w},${r-h} 0,${r}`} 
        fill={ghost ? 'rgba(255,255,255,0.15)' : fillLeft} 
        stroke={ghost ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'} 
        strokeWidth={ghost ? "3" : "2.5"} 
        strokeDasharray={ghost ? "6 4" : "none"} 
      />
    </svg>
  );
};

const CUBE_COLORS = [
  { top: '#fb7185', left: '#f43f5e', right: '#e11d48', bg: 'rgba(244, 63, 94, 0.05)', bgDim: 'rgba(244, 63, 94, 0.03)', text: '#f43f5e' },
  { top: '#60a5fa', left: '#3b82f6', right: '#2563eb', bg: 'rgba(59, 130, 246, 0.05)', bgDim: 'rgba(59, 130, 246, 0.03)', text: '#3b82f6' },
  { top: '#fbbf24', left: '#f59e0b', right: '#d97706', bg: 'rgba(245, 158, 11, 0.05)', bgDim: 'rgba(245, 158, 11, 0.03)', text: '#f59e0b' }
];


export default function CubeNumbersInteractive({ onNext, onPrev }) {
  const [step, setStep] = useState(0);
  const [placedDots, setPlacedDots] = useState([]);
  const [dragResetToken, setDragResetToken] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const currentConfig = STEPS[step];
  const allPositions = getCubePositions(currentConfig.n);
  
  const isComplete = placedDots.length === currentConfig.newBlocks;

  useEffect(() => {
    setPlacedDots([]);
  }, [step]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    const audioSrc = step === 0 ? page7Audio : (step === 1 ? page8Audio : page9Audio);
    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;
    
    const handleEnded = () => setIsPlayingAudio(false);
    newAudio.addEventListener('ended', handleEnded);
    
    newAudio.play().then(() => setIsPlayingAudio(true)).catch(e => console.log("Audio play failed:", e));
    
    return () => {
      newAudio.removeEventListener('ended', handleEnded);
      newAudio.pause();
    };
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

  const currentLayer = Math.min(currentConfig.n - 1, Math.floor(placedDots.length / (currentConfig.n * currentConfig.n)));
  const emptyTargetsInLayer = allPositions.filter(p => p.layer === currentLayer && !placedDots.includes(p.id));
  
  // Group logic for progressive building
  const getActiveGroups = () => {
    if (emptyTargetsInLayer.length === 0) return [];

    if (currentConfig.n === 1) {
      return [emptyTargetsInLayer];
    }

    if (currentConfig.n === 2) {
      // Group by x_idx (creates rows of 2 cubes)
      const groups = [];
      for (let x = 0; x < 2; x++) {
        const row = emptyTargetsInLayer.filter(p => p.x_idx === x);
        if (row.length > 0) groups.push(row);
      }
      return groups;
    }
    
    if (currentConfig.n === 3) {
      // Group by layer (creates a full 3x3 layer slab of 9 cubes)
      return [emptyTargetsInLayer];
    }
    return [];
  };

  const activeGroups = getActiveGroups();

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
           <path d="M 10,100 Q 15,60 30,100 Z" fill={CUBE_COLORS[step].bg} />
           <path d="M -5,100 Q 15,40 40,100 Z" fill={CUBE_COLORS[step].bgDim} />
           <path d="M 80,100 Q 90,50 105,100 Z" fill={CUBE_COLORS[step].bg} />
           <path d="M 60,100 Q 85,40 110,100 Z" fill={CUBE_COLORS[step].bgDim} />
         </svg>
      </div>

      {/* Top Header */}
      <div style={{ padding: '32px 40px 24px 40px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '18px', color: '#cbd5e1', letterSpacing: '1px', fontWeight: '800', marginBottom: '8px' }}>
            VISUAL PATTERNS &nbsp;•&nbsp; <span style={{color: CUBE_COLORS[step].text}}>1.3 &nbsp;•&nbsp; CONCEPT 06B / 11</span>
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
        <div style={{ position: 'relative', width: '600px', height: '500px', display: 'flex', justifyContent: 'center' }}>
          
          {/* Render target slots for CURRENT layer (Ghost cubes) */}
          {currentConfig.newBlocks > 0 && emptyTargetsInLayer.map(pos => (
            <div
              key={'target-'+pos.id}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: 0, height: 0,
                zIndex: pos.layer * 100 + allPositions.indexOf(pos)
              }}
            >
              <IsoCube size={pos.size} ghost={true} fillTop={CUBE_COLORS[step].top} fillLeft={CUBE_COLORS[step].left} fillRight={CUBE_COLORS[step].right} />
            </div>
          ))}

          {/* Render already placed blocks */}
          {allPositions.map((pos, idx) => {
            const isPlacedHere = currentConfig.newBlocks === 0 || placedDots.includes(pos.id);
            if (isPlacedHere) {
              return (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    width: 0, height: 0,
                    zIndex: pos.layer * 100 + idx
                  }}
                >
                  <IsoCube size={pos.size} fillTop={CUBE_COLORS[step].top} fillLeft={CUBE_COLORS[step].left} fillRight={CUBE_COLORS[step].right} />
                </motion.div>
              );
            }
            return null;
          })}

          {/* Render draggable groups at the bottom tray */}
          {currentConfig.newBlocks > 0 && activeGroups.map((group, idx) => {
            const anchor = group[0];
            const numGroups = activeGroups.length;
            
            const minX = Math.min(...group.map(p => p.x));
            const maxX = Math.max(...group.map(p => p.x));
            const maxY = Math.max(...group.map(p => p.y));
            
            const groupCenterX = (minX + maxX) / 2;
            const max_y_offset = maxY - anchor.y;

            const spacing = currentConfig.n === 3 ? 0 : 160;
            const targetCenterX = 300 + (idx - (numGroups - 1) / 2) * spacing;
            
            const startX = targetCenterX + (anchor.x - groupCenterX);
            const startY = 440 - max_y_offset;
            
            return (
              <motion.div
                key={'drag-group-'+idx+'-'+step+'-'+placedDots.length+'-'+dragResetToken}
                drag
                dragConstraints={{ top: -400, bottom: 50, left: -300, right: 300 }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                   const dropX = startX + info.offset.x;
                   const dropY = startY + info.offset.y;

                   const dx = anchor.x - dropX;
                   const dy = anchor.y - dropY;
                   const dist = Math.sqrt(dx*dx + dy*dy);

                   // Snap threshold is generous because chunks are large
                   if (dist < 120) {
                      setPlacedDots(prev => {
                         const newIds = group.map(p => p.id);
                         return prev.some(id => newIds.includes(id)) ? prev : [...prev, ...newIds];
                      });
                   } else {
                      setDragResetToken(t => t + 1);
                   }
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: startY,
                  left: startX,
                  width: 0, height: 0,
                  cursor: 'grab',
                  zIndex: 1000 + idx
                }}
                whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 9999 }}
              >
                {group.map((p, i) => (
                  <div 
                    key={'drag-cube-'+p.id}
                    style={{
                      position: 'absolute',
                      left: p.x - anchor.x,
                      top: p.y - anchor.y,
                      width: 0, height: 0,
                      zIndex: i 
                    }}
                  >
                    <IsoCube size={p.size} fillTop={CUBE_COLORS[step].top} fillLeft={CUBE_COLORS[step].left} fillRight={CUBE_COLORS[step].right} />
                  </div>
                ))}
              </motion.div>
            )
          })}

          {/* Equation display in final step */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '40px',
                  width: '100%'
                }}
              >
                <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '2px', color: '#a855f7' }}>
                  {currentConfig.n} &times; {currentConfig.n} &times; {currentConfig.n} = {currentConfig.n ** 3}
                </div>
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
            disabled={!isComplete}
            onClick={() => {
              if (step < STEPS.length - 1) {
                setStep(s => s + 1);
              } else {
                onNext && onNext();
              }
            }}
            style={{
              backgroundColor: (!isComplete) ? 'rgba(255,255,255,0.1)' : '#a855f7',
              color: (!isComplete) ? 'rgba(255,255,255,0.3)' : '#fff',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: (!isComplete) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: (!isComplete) ? 'none' : '0 4px 14px 0 rgba(168, 85, 247, 0.4)',
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
