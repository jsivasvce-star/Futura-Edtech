import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, RotateCcw, Check, ArrowRight, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RealisticCube3D from './RealisticCube3D';
import video36dots from '../36dots.mp4';

// ==========================================
// CONFETTI BURST
// ==========================================
const Confetti = ({ trigger }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (trigger) {
      const colors = ['#fde047', '#4ade80', '#60a5fa', '#f472b6', '#a78bfa'];
      const newParticles = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        velocity: 50 + Math.random() * 150,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        shape: Math.random() > 0.5 ? 'circle' : 'square'
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => setParticles([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!trigger || particles.length === 0) return null;

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 100, pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.velocity * 2,
            y: Math.sin(p.angle) * p.velocity * 2 + 100,
            scale: 0,
            rotate: p.rotation + 360,
            opacity: 0
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            boxShadow: `0 0 8px ${p.color}`
          }}
        />
      ))}
    </div>
  );
};


const SVGDefs = () => (
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3b82f6" /></marker>
    <marker id="arrowhead-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4ade80" /></marker>
    <marker id="arrowhead-yellow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#fbbf24" /></marker>
    <marker id="arrowhead-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#a78bfa" /></marker>
    <marker id="arrowhead-pink" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f472b6" /></marker>
    <marker id="arrowhead-cyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#38bdf8" /></marker>
    <marker id="arrowhead-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#fb7185" /></marker>
  </defs>
);

const BoxVisualizer = ({ step, playStep, numPictures, questionPic, renderShapes, bottomValues, connectorLabel, connectorColor, showHint, extraControls, hideArrows }) => {
  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {extraControls && <div style={{position: 'absolute', top: -10, zIndex: 10}}>{extraControls}</div>}
      <svg viewBox="0 0 1350 350" className="seq-svg">
      <SVGDefs />
      {[1, 2, 3, 4, 5, 6].map((pic, i) => {
        if (pic > numPictures) return null;
        const x = i * 220 + 130;
        const isFocus = playStep >= i;
        const targetPic = questionPic || numPictures;
        const isUnknown = pic === targetPic && step !== 3;

        let boxStroke = isFocus ? "#1a362f" : "rgba(255,255,255,0.05)";
        let boxFill = isFocus ? "rgba(16, 35, 30, 0.4)" : "transparent";
        let boxDash = "none";
        let titleColor = isFocus ? "#64748b" : "#334155";
        
        if (isUnknown) {
          boxStroke = "#334155";
          boxFill = "transparent";
          boxDash = "8,8";
          titleColor = "#334155";
        }

        let arrowhead = "arrowhead";
        if(connectorColor==="#fbbf24") arrowhead = "arrowhead-yellow";
        else if(connectorColor==="#4ade80") arrowhead = "arrowhead-green";
        else if(connectorColor==="#a78bfa") arrowhead = "arrowhead-purple";
        else if(connectorColor==="#f472b6") arrowhead = "arrowhead-pink";
        else if(connectorColor==="#38bdf8") arrowhead = "arrowhead-cyan";
        else if(connectorColor==="#fb7185") arrowhead = "arrowhead-red";

        return (
          <g key={pic} transform={`translate(${x}, 170)`}>
            <text x="0" y="-120" fill={titleColor} fontSize="16" textAnchor="middle" fontWeight="bold" letterSpacing="1" style={{transition: 'fill 0.4s ease'}}>PICTURE {pic}</text>
            <rect x="-90" y="-90" width="180" height="180" rx="20" fill={boxFill} stroke={boxStroke} strokeWidth="2" strokeDasharray={boxDash} style={{transition: 'all 0.4s ease'}} />
            
            <g style={{opacity: (isFocus || isUnknown) ? 1 : 0, transition: 'opacity 0.4s ease-in-out'}}>
              {isUnknown ? (
                <text x="0" y="15" fill="#334155" fontSize="80" textAnchor="middle" fontWeight="800">?</text>
              ) : (
                renderShapes(pic, i, isFocus)
              )}

              <text x="0" y="140" fill={isUnknown ? "#334155" : "#4ade80"} fontSize="50" textAnchor="middle" fontWeight="800">{isUnknown ? "?" : bottomValues[i]}</text>
            </g>
            
            {i > 0 && isFocus && !hideArrows && (
              <motion.g initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.3}}>
                <path d="M -130 -20 Q -110 -45 -90 -20" fill="none" stroke={connectorColor} strokeWidth="2" />
                <text x="-110" y="-45" fill={connectorColor} fontSize="22" textAnchor="middle" fontWeight="bold" style={{opacity: showHint || step === 3 ? 1 : 0, transition: "opacity 0.4s ease"}}>{connectorLabel(i, pic)}</text>
              </motion.g>
            )}
          </g>
        );
      })}
    </svg>
    </div>
  );
};

// --- Custom Visualizers ---
const VisualizerAll1s = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"same"} connectorColor="#3b82f6" bottomValues={['1','1','1','1','1','1']}
    renderShapes={(pic) => <motion.rect initial={{scale:0}} animate={{scale:1}} x="-24" y="-24" width="48" height="48" rx="12" fill="#3b82f6" />} />
);
const VisualizerCounting = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+1"} connectorColor="#fbbf24" bottomValues={['1','2','3','4','5','6']}
    renderShapes={(pic) => {
      const bs = 24, g = 8, w = pic*bs + (pic-1)*g;
      let sx = -w/2 + bs/2;
      return <g>{Array.from({length:pic}).map((_, j) => (
        <motion.rect key={j} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} x={sx + j*(bs+g) - bs/2} y="-12" width={bs} height={bs} rx="2" fill={(j===pic-1 && pic>1) ? "#fbbf24" : "#4ade80"} />
      ))}</g>;
    }} />
);
const VisualizerOdd = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+2"} connectorColor="#fbbf24" bottomValues={['1','3','5','7','9','11']}
    renderShapes={(pic) => {
      const bs = 22, g = 7;
      const bRow = pic, tRow = pic-1;
      const bw = bRow*bs + (bRow-1)*g;
      const tw = tRow*bs + (tRow-1)*g;
      const totalH = tRow > 0 ? (bs * 2 + g) : bs;
      const startY = -totalH / 2;
      const botY = tRow > 0 ? startY + bs + g : startY;
      const topY = startY;
      return <g>
        {Array.from({length:bRow}).map((_, j) => <motion.rect key={`b${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} x={-bw/2 + bs/2 + j*(bs+g) - bs/2} y={botY} width={bs} height={bs} rx="4" fill={(j===bRow-1 && pic>1) ? "#fbbf24" : "#f59e0b"} />)}
        {Array.from({length:tRow}).map((_, j) => <motion.rect key={`t${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05+0.1}} x={-tw/2 + bs/2 + j*(bs+g) - bs/2} y={topY} width={bs} height={bs} rx="4" fill={(j===tRow-1 && pic>1) ? "#fbbf24" : "#f59e0b"} />)}
      </g>;
    }} />
);
const VisualizerEven = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+2"} connectorColor="#a78bfa" bottomValues={['2','4','6','8','10','12']}
    renderShapes={(pic) => {
      const bs = 22, g = 7;
      const w = pic*bs + (pic-1)*g;
      const totalH = bs * 2 + g;
      const topY = -totalH / 2;
      const botY = topY + bs + g;
      return <g>
        {Array.from({length:pic}).map((_, j) => <motion.rect key={`b${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} x={-w/2 + bs/2 + j*(bs+g) - bs/2} y={botY} width={bs} height={bs} rx="4" fill={(j===pic-1 && pic>1) ? "#c084fc" : "#9333ea"} />)}
        {Array.from({length:pic}).map((_, j) => <motion.rect key={`t${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05+0.1}} x={-w/2 + bs/2 + j*(bs+g) - bs/2} y={topY} width={bs} height={bs} rx="4" fill={(j===pic-1 && pic>1) ? "#c084fc" : "#9333ea"} />)}
      </g>;
    }} />
);
const VisualizerTriangular = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${pic}`} connectorColor="#f472b6" bottomValues={['1','3','6','10','15','21']}
    renderShapes={(pic) => {
      const dots = [];
      for (let r=0; r<pic; r++) {
        for (let c=0; c<=r; c++) {
          const isNew = r === pic-1 && pic>1;
          dots.push(<motion.circle key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: r*0.05}} cx={(c - r/2)*24} cy={(r - pic/2)*24 + 10} r="9" fill={isNew ? "#fbcfe8" : "#db2777"} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerSquare = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${pic*pic - (pic-1)*(pic-1)}`} connectorColor="#38bdf8" bottomValues={['1','4','9','16','25','36']}
    renderShapes={(pic) => {
      const dots = [];
      for (let r=0; r<pic; r++) {
        for (let c=0; c<pic; c++) {
          const isNew = (r===pic-1 || c===pic-1) && pic>1;
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: (r+c)*0.03}} x={(c - pic/2)*22} y={(r - pic/2)*22} width="18" height="18" rx="6" fill={isNew ? "#bae6fd" : "#0284c7"} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerCube = ({ step, playStep, showHint }) => {
  const [separate, setSeparate] = useState(false);
  
  const toggleControls = (
    <div style={{display: 'flex', gap: '8px', background: 'rgba(15,23,42,0.8)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
      <button onClick={() => setSeparate(false)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: !separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: !separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Solid cubes</button>
      <button onClick={() => setSeparate(true)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Separate layers</button>
    </div>
  );

  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} hideArrows={true} extraControls={toggleControls} numPictures={6} questionPic={4} connectorLabel={(i,pic)=>`+${pic*pic*pic - (pic-1)*(pic-1)*(pic-1)}`} connectorColor="#fb7185" bottomValues={['1','8','27','64','125','216']}
      renderShapes={(pic, i, isFocus) => {
        const layers = [];
        const sizes = [0, 36, 25, 20, 16, 14, 12];
        const S = sizes[pic];
        const dx = S * Math.sqrt(3) / 2;
        const dy = S / 2;
        const gap = separate ? S * 0.8 : 0;
        
        const layerColors = [
          { top: '#c084fc', left: '#a855f7', right: '#9333ea' },
          { top: '#5eead4', left: '#2dd4bf', right: '#14b8a6' },
          { top: '#fbcfe8', left: '#f472b6', right: '#db2777' },
          { top: '#fde047', left: '#facc15', right: '#eab308' },
          { top: '#bfdbfe', left: '#60a5fa', right: '#3b82f6' },
          { top: '#fca5a5', left: '#f87171', right: '#ef4444' }
        ];
        
        for (let z=0; z<pic; z++) {
          const cubesInLayer = [];
          for (let x=0; x<pic; x++) {
            for (let y=0; y<pic; y++) {
              const cx = (y - x) * dx;
              const cy = (x + y) * dy - z * S - z * gap + (pic * gap) / 2;
              
              const pTop = `0,${-S} ${dx},${-dy} 0,0 ${-dx},${-dy}`;
              const pRight = `${dx},${-dy} ${dx},${dy} 0,${S} 0,0`;
              const pLeft = `0,0 0,${S} ${-dx},${dy} ${-dx},${-dy}`;
              
              const cols = layerColors[z];
              
              cubesInLayer.push(
                <g key={`${x}-${y}`} transform={`translate(${cx}, ${cy})`}>
                  <polygon points={pTop} fill={cols.top} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pLeft} fill={cols.left} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pRight} fill={cols.right} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                </g>
              );
            }
          }
          
          const animDelay = z * 0.07;
          const animState = isFocus ? {opacity:1, y: 0, scale: 1} : {opacity:0, y: -40, scale: 0.95};
          layers.push(
            <motion.g key={`layer-${z}`} initial={false} animate={animState} transition={{delay: animDelay, type: 'spring', stiffness: 200, damping: 20}}>
              {cubesInLayer}
            </motion.g>
          );
        }
        return <g>{layers}</g>;
      }} />
  );
};
const VisualizerHexagonal = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={(i,pic)=>`+${(pic-1)*6}`} connectorColor="#fbbf24" bottomValues={['1','7','19','37','61']}
    renderShapes={(pic) => {
      const dots = [];
      const S = 20; // Spacing factor
      const v = [
        {x: 1, y: 0},
        {x: 0.5, y: Math.sqrt(3)/2},
        {x: -0.5, y: Math.sqrt(3)/2},
        {x: -1, y: 0},
        {x: -0.5, y: -Math.sqrt(3)/2},
        {x: 0.5, y: -Math.sqrt(3)/2}
      ];
      dots.push(<motion.circle key="c" initial={{scale:0}} animate={{scale:1}} cx="0" cy="0" r="7" fill="#eab308" />);
      for (let r=1; r<pic; r++) {
        for (let k=0; k<6; k++) {
          for (let j=0; j<r; j++) {
            const px = r * v[k].x + j * (v[(k+1)%6].x - v[k].x);
            const py = r * v[k].y + j * (v[(k+1)%6].y - v[k].y);
            const isNew = r === pic-1 && pic>1;
            dots.push(<motion.circle key={`r${r}-k${k}-j${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: r*0.1}} cx={px*S} cy={py*S} r="5.5" fill={isNew ? "#fef08a" : "#ca8a04"} />);
          }
        }
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerPow2 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={()=>`x2`} connectorColor="#60a5fa" bottomValues={['1','2','4','8','16']}
    renderShapes={(pic, i, isFocus) => {
      if (pic === 1) {
        const animState = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
        return <motion.circle initial={false} animate={animState} transition={{type: 'spring'}} cx="0" cy="0" r="12" fill="#1d4ed8" />;
      }
      
      const n = Math.pow(2, pic - 2);
      let cols, rows;
      if (pic % 2 === 0) {
        cols = Math.sqrt(n);
        rows = cols;
      } else {
        cols = Math.sqrt(n / 2);
        rows = cols * 2;
      }
      
      const S = 24;
      const gap = 30;
      const offset = ((cols - 1) * S) / 2 + gap / 2;
      
      const leftDots = [];
      const rightDots = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const y = (r - rows / 2 + 0.5) * S;
          const lx = -offset + (c - cols / 2 + 0.5) * S;
          const rx = offset + (c - cols / 2 + 0.5) * S;
          leftDots.push(<circle key={`l-${r}-${c}`} cx={lx} cy={y} r="9.5" fill="#1d4ed8" />);
          rightDots.push(<circle key={`r-${r}-${c}`} cx={rx} cy={y} r="9.5" fill="#60a5fa" />);
        }
      }
      
      const animStateLeft = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      const animStateRight = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      
      return (
        <g>
          <motion.g initial={false} animate={animStateLeft} transition={{type: 'spring', stiffness: 200, damping: 20}}>
            {leftDots}
          </motion.g>
          <motion.g initial={false} animate={animStateRight} transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.1}}>
            {rightDots}
          </motion.g>
        </g>
      );
    }} />
);
const VisualizerPow3 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={4} connectorLabel={()=>`x3`} connectorColor="#4ade80" bottomValues={['1','3','9','27','81']}
    renderShapes={(pic, i, isFocus) => {
      if (pic === 1) {
        const animState = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
        return <motion.circle initial={false} animate={animState} transition={{type: 'spring'}} cx="0" cy="0" r="9.5" fill="#15803d" />;
      }
      
      const n = Math.pow(3, pic - 2);
      let cols, rows;
      if (pic % 2 === 0) {
        cols = Math.sqrt(n);
        rows = cols;
      } else {
        cols = Math.sqrt(n / 3);
        rows = cols * 3;
      }
      
      const S = 16;
      const gap = 24;
      const groupWidth = (cols - 1) * S;
      const offset = groupWidth + gap;
      
      const leftDots = [];
      const midDots = [];
      const rightDots = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const y = (r - rows / 2 + 0.5) * S;
          const xBase = (c - cols / 2 + 0.5) * S;
          leftDots.push(<circle key={`l-${r}-${c}`} cx={xBase - offset} cy={y} r="7" fill="#15803d" />);
          midDots.push(<circle key={`m-${r}-${c}`} cx={xBase} cy={y} r="7" fill="#4ade80" />);
          rightDots.push(<circle key={`r-${r}-${c}`} cx={xBase + offset} cy={y} r="7" fill="#4ade80" />);
        }
      }
      
      const animStateLeft = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      const animStateNew = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      
      return (
        <g>
          <motion.g initial={false} animate={animStateLeft} transition={{type: 'spring', stiffness: 200, damping: 20}}>
            {leftDots}
          </motion.g>
          <motion.g initial={false} animate={animStateNew} transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.1}}>
            {midDots}
            {rightDots}
          </motion.g>
        </g>
      );
    }} />
);

const Visualizer36Dots = ({ step, playStep, showHint }) => {
  const [shape, setShape] = useState('triangle');

  const getMorphPositions = (sh) => {
    let raw = [];
    if (sh === 'triangle') {
      for (let r = 1; r <= 8; r++) {
        for (let j = 0; j < r; j++) {
          raw.push({ x: j - (r - 1) / 2, y: (r - 1) * 0.86 });
        }
      }
    } else {
      const rows = sh === 'square' ? 6 : 4;
      const cols = sh === 'square' ? 6 : 9;
      for (let r = 0; r < rows; r++) {
        for (let j = 0; j < cols; j++) {
          raw.push({ x: j, y: r });
        }
      }
    }
    const xs = raw.map(p => p.x), ys = raw.map(p => p.y);
    const xmin = Math.min(...xs), xmax = Math.max(...xs);
    const ymin = Math.min(...ys), ymax = Math.max(...ys);
    const unit = Math.min(35, 310 / (xmax - xmin || 1), 205 / (ymax - ymin || 1));
    return raw.map(p => ({
      x: 500 + (p.x - (xmin + xmax) / 2) * unit,
      y: 190 + (p.y - (ymin + ymax) / 2) * unit
    }));
  };

  const dest = getMorphPositions(shape);
  const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635', '#d946ef', '#5eead4'];
  const source = [];
  let idx = 0;
  for (let r = 0; r < 8; r++) {
    for (let j = 0; j <= r; j++) {
      source.push({ id: idx, color: palette[r] });
      idx++;
    }
  }

  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 10, zIndex: 10, display: 'flex', gap: '16px'}}>
        <button onClick={() => setShape('triangle')} style={{ padding: '8px 24px', background: shape === 'triangle' ? 'rgba(244,114,182,0.15)' : 'transparent', border: shape === 'triangle' ? '1px solid #f472b6' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: shape === 'triangle' ? '#f472b6' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', transition: '0.2s' }}>
          <span>△</span> Triangle
        </button>
        <button onClick={() => setShape('square')} style={{ padding: '8px 24px', background: shape === 'square' ? 'rgba(56,189,248,0.15)' : 'transparent', border: shape === 'square' ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: shape === 'square' ? '#38bdf8' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', transition: '0.2s' }}>
          <span>□</span> Square
        </button>
        <button onClick={() => setShape('rectangle')} style={{ padding: '8px 24px', background: shape === 'rectangle' ? 'rgba(74,222,128,0.15)' : 'transparent', border: shape === 'rectangle' ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: shape === 'rectangle' ? '#4ade80' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', transition: '0.2s' }}>
          <span>▭</span> Rectangle
        </button>
      </div>

      <svg viewBox="0 0 1350 350" className="seq-svg">
        <g>
          {source.map((dot, i) => (
            <motion.g
              key={dot.id}
              initial={false}
              animate={{ x: dest[i].x, y: dest[i].y }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.015 }}
            >
              <circle r="9.5" fill={dot.color} />
              <circle cx="-2.8" cy="-2.8" r="2" fill="#fff" opacity="0.5" />
            </motion.g>
          ))}
        </g>
        
        <g transform="translate(850, 190)">
          <text x="0" y="-80" fill="#94a3b8" fontSize="16" fontWeight="800" letterSpacing="2">SAME DOTS</text>
          <text x="0" y="10" fill="#f472b6" fontSize="100" fontWeight="800">{36}</text>
          <text x="0" y="60" fill="#e2e8f0" fontSize="24" fontWeight="600">
            {shape === 'triangle' ? '1 + 2 + ... + 8' : (shape === 'square' ? '6 x 6 = 36' : '4 x 9 = 36')}
          </text>
          <text x="0" y="100" fill="#64748b" fontSize="16">No dots added.</text>
          <text x="0" y="125" fill="#64748b" fontSize="16">None removed.</text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// DATA
// ==========================================
const CONCEPTS = [
  { id: 1, title: 'All 1s', subtitle: 'One dot. Again and again.', watchDesc: 'Look inside each picture. How many dots do you see?', watchAnswer: 'New picture. Same number. Nothing is added.', question: 'How many dots belong in picture 6?', seqList: '1, 1, 1, 1, 1, ?', options: [1, 2, 3], correctOption: 1, discoveredTitle: 'One dot in every picture.', discoveredDesc: 'The sequence is 1, 1, 1, 1, 1, ...', nextTitle: 'Counting numbers', Visualizer: VisualizerAll1s },
  { id: 2, title: 'Counting numbers', subtitle: 'One new dot joins the row.', watchDesc: 'Watch one new block join the row in every picture.', watchAnswer: 'One extra block makes the next counting number.', question: 'How many blocks belong in picture 6?', seqList: '1, 2, 3, 4, 5, ?', options: [5, 6, 7], correctOption: 6, discoveredTitle: 'Five blocks plus one new block make six.', discoveredDesc: 'One extra block is added in each step. The sequence is 1, 2, 3, 4, 5, 6, ...', nextTitle: 'Odd numbers', Visualizer: VisualizerCounting },
  { id: 3, title: 'Odd numbers', subtitle: 'There is always one left over.', watchDesc: 'Look at the two rows. One row always has an extra block.', watchAnswer: 'Add two blocks. Keep one row one block longer.', question: 'How many blocks belong in picture 6?', seqList: '1, 3, 5, 7, 9, ?', options: [10, 11, 12], correctOption: 11, discoveredTitle: 'Two growing rows. One unpaired block. Eleven in all.', discoveredDesc: 'At picture 6, that is 6+5=11.', nextTitle: 'Even numbers', Visualizer: VisualizerOdd },
  { id: 4, title: 'Even numbers', subtitle: 'Every block has a partner.', watchDesc: 'Follow the columns. Each new column is one complete pair.', watchAnswer: 'Two equal rows. No block is left over.', question: 'How many blocks belong in picture 6?', seqList: '2, 4, 6, 8, 10, ?', options: [11, 12, 14], correctOption: 12, discoveredTitle: 'Six pairs make twelve blocks.', discoveredDesc: 'Each picture contains pairs. Two rows of 6 give 6+6=12.', nextTitle: 'Triangular numbers', Visualizer: VisualizerEven },
  { id: 5, title: 'Triangular numbers', subtitle: 'One new row. A bigger triangle.', watchDesc: 'Each new row has one more dot than the row above it.', watchAnswer: 'The bottom row grows: 1, 2, 3, 4, 5, 6 dots.', question: 'How many dots belong in picture 6?', seqList: '1, 3, 6, 10, 15, ?', options: [20, 21, 22], correctOption: 21, discoveredTitle: 'Keep the first 15 dots. Add a bottom row of 6.', discoveredDesc: '15 + 6 = 21. These growing rows form a filled triangle.', nextTitle: 'Square numbers', Visualizer: VisualizerTriangular },
  { id: 6, title: 'Square numbers', subtitle: 'Make the rows match the columns.', watchDesc: 'Watch the equal rows and columns grow together.', watchAnswer: 'A square grid has the same number of rows and columns.', question: 'How many dots belong in picture 6?', seqList: '1, 4, 9, 16, 25, ?', options: [30, 35, 36], correctOption: 36, discoveredTitle: 'Six rows. Six columns. Thirty-six dots.', discoveredDesc: '6 x 6 = 36.', nextTitle: 'Cube numbers', Visualizer: VisualizerSquare },
  { id: 7, title: 'Cube numbers', subtitle: 'Rows, columns... and one more dimension.', watchDesc: 'Each colour is a layer. Separate the layers to look inside.', watchAnswer: 'A cube of side n contains n layers, each with n x n unit cubes.', question: 'How many unit cubes belong in picture 4?', seqList: '1, 8, 27, ?, 125, 216', options: [36, 64, 125], correctOption: 64, discoveredTitle: 'Four square layers stack into a cube of 64 unit cubes.', discoveredDesc: '4 x 4 x 4 = 64.', nextTitle: 'Hexagonal numbers', Visualizer: VisualizerCube },
  { id: 8, title: 'Hexagonal numbers', subtitle: 'A centre dot. Rings with six sides.', watchDesc: 'Follow each new ring around the centre dot.', watchAnswer: 'The rings add 6, 12, 18, then 24 dots.', question: 'How many dots belong in picture 5?', seqList: '1, 7, 19, 37, ?', options: [55, 60, 61], correctOption: 61, discoveredTitle: 'Six more dots in every new ring. The next total is 61.', discoveredDesc: 'Start with one centre dot. Successive rings contain 6, 12, 18, and 24 dots.', nextTitle: 'Powers of 2', Visualizer: VisualizerHexagonal },
  { id: 9, title: 'Powers of 2', subtitle: 'Make two copies of the whole picture.', watchDesc: 'Each new picture contains two equal copies of the previous picture.', watchAnswer: 'Double the whole amount.', question: 'How many dots belong in picture 5?', seqList: '1, 2, 4, 8, ?', options: [16, 10, 12], correctOption: 16, discoveredTitle: 'Eight dots in each copy. Sixteen in both copies.', discoveredDesc: 'The number of dots doubles: 1, 2, 4, 8, 16... Two equal groups of 8 contain 16 dots.', nextTitle: 'Powers of 3', Visualizer: VisualizerPow2 },
  { id: 10, title: 'Powers of 3', subtitle: 'Make three copies. Watch it multiply.', watchDesc: 'Each new picture contains three equal copies of the previous picture.', watchAnswer: 'Triple the whole amount.', question: 'How many dots belong in picture 5?', seqList: '1, 3, 9, 27, ?', options: [54, 81, 30], correctOption: 81, discoveredTitle: 'Three groups of 27 make 81 dots.', discoveredDesc: 'The total triples each time: 1, 3, 9, 27, 81... Three equal groups of 27 contain 81 dots.', nextTitle: 'The same 36 dots', Visualizer: VisualizerPow3 },
  { id: 11, title: 'The same 36 dots', subtitle: 'Change the shape. Keep every dot.', watchDesc: 'The colours travel with the dots. The total stays the same.', watchAnswer: 'No dots are added or removed during the move.', question: 'What stays the same when the triangle becomes a square?', seqList: 'Count the dots in either shape.', options: [30, 36, 42], correctOption: 36, discoveredTitle: 'The same 36 dots fit into a triangle and a square.', discoveredDesc: 'The triangle has 8 growing rows: 1 + 2 + ... + 8 = 36. The square has 6 equal rows: 6 x 6 = 36.', nextTitle: 'Finish', Visualizer: Visualizer36Dots }
];

export default function VisualisingSequences({ onNext }) {
  const [conceptIdx, setConceptIdx] = useState(0); 
  const [tab, setTab] = useState('watch');
  const [step, setStep] = useState(1); 
  const [playStep, setPlayStep] = useState(0); 
  const [playing, setPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const concept = CONCEPTS[conceptIdx];
  const Visualizer = concept?.Visualizer || VisualizerCounting;

  useEffect(() => {
    if (tab === 'watch') {
      setPlayStep(0);
      setPlaying(true);
    }
  }, [conceptIdx, tab]);

  useEffect(() => {
    let int;
    if (playing) {
      int = setInterval(() => {
        setPlayStep(p => {
          if (p >= 5) { setPlaying(false); return 5; }
          return p + 1;
        });
      }, 1200);
    }
    return () => clearInterval(int);
  }, [playing]);

  const handlePlay = () => { setTab('watch'); setPlayStep(0); setPlaying(true); };
  const handleReplay = () => { setTab('watch'); setPlayStep(0); setTimeout(() => setPlaying(true), 100); };
  const handleStep = () => { setPlaying(false); setPlayStep(p => Math.min(p + 1, 5)); };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    if (opt === concept.correctOption) {
      setStep(3);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStep(2);
      setShowHint(true);
      setTimeout(() => setStep(1), 500);
    }
  };

  const goToNext = () => {
    if (conceptIdx < CONCEPTS.length - 1) {
      setConceptIdx(c => c + 1);
      setTab('watch');
      setStep(1);
      setSelectedOption(null);
      setPlayStep(0);
      setShowConfetti(false);
      setShowHint(false);
    } else {
      if (onNext) onNext();
    }
  };
  
  const goToPrev = () => {
    if (conceptIdx > 0) {
      setConceptIdx(c => c - 1);
      setTab('watch');
      setStep(1);
      setSelectedOption(null);
      setPlayStep(0);
      setShowConfetti(false);
      setShowHint(false);
    }
  };

  if (!concept) return null;

  return (
    <div className="brilliant-layout">
      {/* Dynamic Aurora/Space Background */}
      <div className="bg-image" />
      <div className="bg-overlay" />


      {/* Main Content Area (Glass Card) */}
      <div className="main-wrapper">
        <Confetti trigger={showConfetti} />
        
        <div className="glass-container">
          {/* Header Area */}
          <div className="content-header">
            <div>
              <div className="concept-meta">
                VISUAL PATTERNS &nbsp;•&nbsp; <span style={{color: '#4ade80'}}>1.3 &nbsp;•&nbsp; CONCEPT {String(conceptIdx+1).padStart(2, '0')} / 11</span>
              </div>
              <h1 className="concept-title">{concept.title}</h1>
              <h2 className="concept-subtitle">{concept.subtitle}</h2>
            </div>
          </div>

          {/* Glass Card Body */}
          <div className="glass-card-body">

            {/* Visualization Area */}
            <div className="visualization-area">
              <Visualizer step={step} playStep={playStep} showHint={showHint} />
            </div>

            {/* Content Below Visualizer */}
            <div className="below-visualizer">
              
              {tab === 'watch' ? (
                <div className="find-card-inline">
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="checkpoint-container" style={{flexDirection: 'column', textAlign: 'center'}}>
                    <div className="find-title">WATCH THE PATTERN</div>
                    <div className="find-question" style={{fontSize: '32px', marginBottom: '8px'}}>What changes from picture to picture?</div>
                    <div className="watch-desc-inline" style={{marginBottom: '12px', fontSize: '22px'}}>{concept.watchDesc}</div>
                    <button className="ready-btn" onClick={() => { setTab('find'); setPlayStep(5); }}>I'm ready. Let me try &rarr;</button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="watch-desc-inline" style={{textAlign: 'left'}}>
                    {concept.watchDesc}
                    <div style={{float: 'right', fontSize: '14px', color: '#64748b'}}>Picture {conceptIdx===7 || conceptIdx===8 || conceptIdx===9 ? '4 of 5' : '5 of 6'}</div>
                  </div>
                  
                  <div className="find-card-inline">
                    {step === 3 ? (
                      <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="success-inline">
                         <div className="success-header"><Check size={20} color="#4ade80"/> CONCEPT DISCOVERED</div>
                         <div className="success-title">{concept.discoveredTitle}</div>
                         <div className="success-desc">{concept.discoveredDesc}</div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="checkpoint-container">
                        <div className="checkpoint-left">
                          <div className="find-title">LEARNING CHECKPOINT</div>
                          <div className="find-question">{concept.question}</div>
                          <div className="find-seq">{concept.seqList}</div>
                        </div>
                        <div className="options-row">
                          {concept.options.map(opt => (
                            <button 
                              key={opt} 
                              className={`option-btn ${selectedOption === opt ? (opt === concept.correctOption ? 'correct' : 'wrong') : ''}`}
                              onClick={() => handleOptionClick(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
              

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Footer */}
      <div className="bottom-floating-footer">
        <button className="footer-nav-btn" onClick={goToPrev} style={{visibility: conceptIdx > 0 ? 'visible' : 'hidden'}}>
          &larr; Previous concept
        </button>
        
        <button className="footer-nav-btn primary" onClick={goToNext}>
          Next: {concept.nextTitle} &rarr;
        </button>
      </div>

      <style>{`
        .brilliant-layout {
          width: 100%; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex; flex-direction: column; overflow: hidden; position: absolute; inset: 0; z-index: 9999;
          color: #f8fafc;
        }

        .bg-image {
          position: absolute; inset: 0; z-index: -2;
          background-image: url('https://images.unsplash.com/photo-1532782356570-5b581b0a5196?q=80&w=2560&auto=format&fit=crop'); 
          background-size: cover; background-position: center;
        }
        
        .bg-overlay {
          position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.8) 100%);
        }

        .top-nav {
          display: flex; justify-content: space-between; align-items: center; padding: 0 24px; height: 56px; 
          background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 15px; font-weight: 600; color: #94a3b8; flex-shrink: 0; z-index: 10;
        }
        .nav-left, .nav-center, .nav-right { display: flex; align-items: center; gap: 16px; }
        .nav-tab { padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; }
        .nav-tab:hover { background: rgba(255,255,255,0.1); color: #f8fafc; }
        .nav-tab.active { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
        .progress-badge { background: rgba(255,255,255,0.1); color: #fff; padding: 2px 8px; border-radius: 12px; margin-left: 8px; font-size: 18px; font-weight: 700; }
        .icon-box { color: #fbbf24; margin-right: 6px; font-size: 16px; }
        .icon-text { font-family: serif; font-weight: bold; margin-right: 6px; font-size: 18px; }
        .nav-icon { background: rgba(255,255,255,0.1); padding: 6px; border-radius: 6px; display: flex; cursor: pointer; }

        .main-wrapper {
          flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;
          padding: 16px 40px; padding-bottom: 50px;
        }

        .glass-container {
          width: 100%; margin: 0 auto;
        }

        .content-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; padding: 0 12px; }
        .concept-meta { font-size: 18px; color: #cbd5e1; letter-spacing: 1px; font-weight: 800; margin-bottom: 8px; }
        .concept-title { font-size: 48px; font-weight: 800; margin: 0 0 4px 0; color: #ffffff; letter-spacing: -0.5px; text-shadow: 0 2px 12px rgba(0,0,0,0.5); }
        .concept-subtitle { font-size: 22px; font-weight: 500; margin: 0; color: #cbd5e1; text-shadow: 0 1px 4px rgba(0,0,0,0.5); }

        .glass-card-body {
          background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
          overflow: hidden; display: flex; flex-direction: column;
        }

        .content-tabs-bar { 
          display: flex; justify-content: space-between; align-items: center; 
          border-bottom: 1px solid rgba(255,255,255,0.05); padding: 12px 24px; 
          background: rgba(0,0,0,0.2);
        }
        .tabs-left { display: flex; align-items: center; gap: 16px; }
        .main-tab { background: none; border: none; color: #94a3b8; font-size: 18px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; padding: 6px 12px; border-radius: 8px; }
        .main-tab:hover { color: #f8fafc; background: rgba(255,255,255,0.05); }
        .main-tab.active { color: #4ade80; }
        .tab-num { background: rgba(255,255,255,0.1); color: #cbd5e1; padding: 2px 6px; border-radius: 4px; font-size: 18px; font-weight: 800; }
        .main-tab.active .tab-num { background: #166534; color: #4ade80; }

        .play-controls { display: flex; gap: 6px; align-items: center; }
        .play-controls button { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; border-radius: 6px; padding: 6px 12px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
        .play-controls button:hover { background: rgba(255,255,255,0.1); }
        .play-controls button.active { background: rgba(255,255,255,0.15); color: #fff; }
        .divider { width: 1px; height: 16px; background: rgba(255,255,255,0.1); margin: 0 4px; }

        .visualization-area { width: 100%; display: flex; justify-content: center; padding: 12px 0; }
        .seq-svg { width: 100%; max-height: 380px; overflow: visible; }

        .below-visualizer { padding: 0 40px 0px 40px; }
        .watch-desc-inline { font-size: 18px; color: #cbd5e1; font-weight: 500; margin-bottom: 12px; text-align: center; }
        
        .ready-btn { background: #4ade80; color: #022c22; border: none; border-radius: 8px; padding: 14px 28px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 20px rgba(74,222,128,0.3); }
        .ready-btn:hover { background: #22c55e; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(74,222,128,0.4); }

        .find-card-inline { margin-bottom: 12px; }
        .checkpoint-container { 
          background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 12px; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center;
        }
        .find-title { font-size: 14px; color: #94a3b8; letter-spacing: 1.5px; font-weight: 800; margin-bottom: 8px; text-transform: uppercase; }
        .find-question { font-size: 26px; font-weight: 700; color: #f8fafc; margin-bottom: 4px; }
        .find-seq { font-size: 18px; color: #94a3b8; font-weight: 500; }

        .options-row { display: flex; gap: 12px; justify-content: center; }
        .option-btn { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; border-radius: 8px; width: 70px; height: 70px; font-size: 26px; font-weight: 800; cursor: pointer; transition: 0.2s; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1); }
        .option-btn:hover { background: rgba(30,41,59,1); color: #fff; }
        .option-btn.correct { background: #22c55e; border-color: #4ade80; color: #fff; box-shadow: 0 0 20px rgba(34,197,94,0.4); transform: scale(1.05); }
        .option-btn.wrong { animation: shake 0.4s; background: #ef4444; border-color: #f87171; color: #fff; }

        .success-inline { background: rgba(16, 35, 30, 0.8); border: 1px solid rgba(74, 222, 128, 0.3); border-radius: 12px; padding: 20px 32px; }
        .success-header { display: flex; align-items: center; gap: 8px; color: #4ade80; font-size: 15px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
        .success-title { font-size: 26px; font-weight: 700; color: #f8fafc; margin-bottom: 4px; }
        .success-desc { font-size: 18px; color: #cbd5e1; line-height: 1.5; font-weight: 500; }

        .legend-row { display: flex; justify-content: center; gap: 24px; font-size: 18px; color: #64748b; font-weight: 600; }
        .legend-item { display: flex; align-items: center; gap: 8px; }
        .legend-box { width: 12px; height: 12px; border-radius: 2px; }
        .legend-box.green { background: #4ade80; }
        .legend-box.yellow { background: #fbbf24; }

        .bottom-floating-footer {
          position: absolute; bottom: 20px; left: 24px; right: 24px;
          display: flex; justify-content: space-between; align-items: center; z-index: 50;
        }
        .footer-nav-btn { background: rgba(15,23,42,0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; font-size: 18px; font-weight: 700; cursor: pointer; padding: 10px 20px; border-radius: 8px; transition: 0.2s; }
        .footer-nav-btn:hover { background: rgba(30,41,59,0.9); color: #fff; }
        .footer-nav-btn.primary { background: #3b82f6; border-color: #60a5fa; color: #fff; }
        .footer-nav-btn.primary:hover { background: #2563eb; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
      `}</style>
    </div>
  );
}
