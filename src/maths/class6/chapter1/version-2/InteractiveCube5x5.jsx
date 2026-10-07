import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IsoCube = ({ size, fillTop = '#f472b6', fillLeft = '#db2777', fillRight = '#be185d', ghost = false }) => {
  const w = size * 0.866;
  const h = size * 0.5;
  const r = size;
  return (
    <svg width={size * 2.5} height={size * 2.5} viewBox={`${-size * 1.2} ${-size * 1.2} ${size * 2.4} ${size * 2.4}`} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
      <polygon 
        points={`${-w},${-h} 0,${-2*h} ${w},${-h} 0,0`} 
        fill={ghost ? 'rgba(255,255,255,0.4)' : fillTop} 
        stroke={ghost ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
      <polygon 
        points={`0,0 ${w},${-h} ${w},${r-h} 0,${r}`} 
        fill={ghost ? 'rgba(255,255,255,0.2)' : fillRight} 
        stroke={ghost ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
      <polygon 
        points={`0,0 ${-w},${-h} ${-w},${r-h} 0,${r}`} 
        fill={ghost ? 'rgba(255,255,255,0.3)' : fillLeft} 
        stroke={ghost ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
    </svg>
  );
};

export default function InteractiveCube5x5() {
  const [placedLayers, setPlacedLayers] = useState(0);
  const [dragToken, setDragToken] = useState(0);
  const n = 5;
  const size = 18;
  const cx = 160;
  const baseY = 160;
  const startY = 280;

  const positions = [];
  for (let layer = 0; layer < n; layer++) {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        positions.push({
          id: `l${layer}-x${x}-y${y}`,
          layer, x, y,
          px: cx + (y - x) * size * 0.866,
          py: baseY + (x + y) * size * 0.5 - layer * size,
        });
      }
    }
  }

  const isComplete = placedLayers === n;

  return (
    <div style={{ position: 'relative', width: '320px', height: '440px' }}>
       {/* Ghost targets for ALL layers */}
       {positions.map(p => (
         <div key={`ghost-${p.id}`} style={{ position: 'absolute', left: p.px, top: p.py, zIndex: p.layer * 100 + p.x + p.y }}>
           <IsoCube size={size} ghost={true} />
         </div>
       ))}

       {/* Solid placed layers */}
       {positions.filter(p => p.layer < placedLayers).map(p => (
         <motion.div key={`solid-${p.id}`} initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} style={{ position: 'absolute', left: p.px, top: p.py, zIndex: p.layer * 100 + p.x + p.y }}>
           <IsoCube size={size} />
         </motion.div>
       ))}

       {/* Draggable layer (if not complete) */}
       {!isComplete && (
         <motion.div
           key={`drag-${placedLayers}-${dragToken}`}
           drag
           dragConstraints={{ top: -300, bottom: 100, left: -200, right: 200 }}
           dragElastic={0.2}
           dragMomentum={false}
           onDragEnd={(e, info) => {
              const targetOffsetY = baseY - placedLayers * size - startY;
              const dx = info.offset.x;
              const dy = info.offset.y - targetOffsetY;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 60) {
                 setPlacedLayers(prev => prev + 1);
              } else {
                 setDragToken(t => t + 1);
              }
           }}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           style={{ position: 'absolute', top: startY, left: cx, cursor: 'grab', zIndex: 1000 }}
           whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
         >
            {/* The base of this layer should match the expected visual base */}
            {positions.filter(p => p.layer === placedLayers).map((p, i) => (
               <div key={`drag-cube-${p.id}`} style={{ position: 'absolute', left: p.px - cx, top: p.py - (baseY - placedLayers * size), zIndex: i }}>
                 <IsoCube size={size} />
               </div>
            ))}
         </motion.div>
       )}
    </div>
  )
}
