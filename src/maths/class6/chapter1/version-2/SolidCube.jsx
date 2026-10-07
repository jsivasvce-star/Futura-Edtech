import React from 'react';

const IsoCube = ({ size, fillTop, fillLeft, fillRight }) => {
  const w = size * 0.866;
  const h = size * 0.5;
  const r = size;
  return (
    <svg width={size * 2.5} height={size * 2.5} viewBox={`${-size * 1.2} ${-size * 1.2} ${size * 2.4} ${size * 2.4}`} style={{ overflow: 'visible', position: 'absolute', top: -size * 1.2, left: -size * 1.2 }}>
      <polygon 
        points={`${-w},${-h} 0,${-2*h} ${w},${-h} 0,0`} 
        fill={fillTop} 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
      <polygon 
        points={`0,0 ${w},${-h} ${w},${r-h} 0,${r}`} 
        fill={fillRight} 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
      <polygon 
        points={`0,0 ${-w},${-h} ${-w},${r-h} 0,${r}`} 
        fill={fillLeft} 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export const SolidCube = ({ n, size, colorTheme }) => {
  const cx = 0;
  const baseY = 0;

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

  const width = 2 * n * size * 0.866;
  const height = 2 * n * size;

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
       {positions.map(p => (
         <div key={p.id} style={{ position: 'absolute', left: p.px + width / 2, top: p.py + height / 2, zIndex: p.layer * 100 + p.x + p.y }}>
           <IsoCube size={size} fillTop={colorTheme.top} fillLeft={colorTheme.left} fillRight={colorTheme.right} />
         </div>
       ))}
    </div>
  );
};
