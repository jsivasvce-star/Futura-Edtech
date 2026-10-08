import React from 'react';

const IsoCube = ({ size, fillTop = '#f472b6', fillLeft = '#db2777', fillRight = '#be185d', ghost = false }) => {
  const w = size * 0.866;
  const h = size * 0.5;
  const r = size;
  return (
    <svg width={size * 2.5} height={size * 2.5} viewBox={`${-size * 1.2} ${-size * 1.2} ${size * 2.4} ${size * 2.4}`} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
      <polygon 
        points={`${-w},${-h} 0,${-2*h} ${w},${-h} 0,0`} 
        fill={ghost ? 'transparent' : fillTop} 
        stroke={ghost ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
      <polygon 
        points={`0,0 ${w},${-h} ${w},${r-h} 0,${r}`} 
        fill={ghost ? 'transparent' : fillRight} 
        stroke={ghost ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
      <polygon 
        points={`0,0 ${-w},${-h} ${-w},${r-h} 0,${r}`} 
        fill={ghost ? 'transparent' : fillLeft} 
        stroke={ghost ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.4)'} 
        strokeWidth={ghost ? "1.5" : "1"} 
      />
    </svg>
  );
};

export const StaticCube5x5 = ({ ghost = false }) => {
  const n = 5;
  const size = 18;
  const cx = 150;
  const baseY = 240;

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

  return (
    <div style={{ position: 'relative', width: '300px', height: '360px' }}>
       {positions.map(p => (
         <div key={p.id} style={{ position: 'absolute', left: p.px, top: p.py, zIndex: p.layer * 100 + p.x + p.y }}>
           <IsoCube size={size} ghost={ghost} />
         </div>
       ))}
    </div>
  );
};
