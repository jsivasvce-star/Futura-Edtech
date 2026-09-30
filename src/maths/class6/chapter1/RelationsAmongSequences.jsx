import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, RotateCcw, Check, ArrowRight, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RealisticCube3D from './RealisticCube3D';


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

const BoxVisualizer = ({ step, playStep, numPictures, questionPic, renderShapes, bottomValues, connectorLabel, connectorColor, showHint, extraControls, hideArrows, hidePictureText, topLabel, spacing = 220 }) => {
  const totalWidth = (numPictures - 1) * spacing;
  const svgWidth = Math.max(1350, totalWidth + 250);
  const startX = (svgWidth - totalWidth) / 2;

  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {extraControls && <div style={{position: 'absolute', top: -10, zIndex: 10}}>{extraControls}</div>}
      <svg viewBox={`0 0 ${svgWidth} 350`} className="seq-svg">
      <SVGDefs />
      {[1, 2, 3, 4, 5, 6].map((pic, i) => {
        if (pic > numPictures) return null;
        const x = startX + i * spacing;
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

        const arrowStart = -(spacing - 90);
        const arrowEnd = -90;
        const arrowMid = -spacing / 2;

        return (
          <g key={pic} transform={`translate(${x}, 170)`}>
            {!hidePictureText && (
              <text x="0" y="-120" fill={topLabel ? "#e2e8f0" : titleColor} fontSize={topLabel ? "14" : "16"} textAnchor="middle" fontWeight={topLabel ? "600" : "bold"} letterSpacing={topLabel ? "0" : "1"} style={{transition: 'fill 0.4s ease'}}>
                {topLabel ? topLabel(pic) : `PICTURE ${pic}`}
              </text>
            )}
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
                <path d={`M ${arrowStart} -20 Q ${arrowMid} -45 ${arrowEnd} -20`} fill="none" stroke={connectorColor} strokeWidth="2" />
                <text x={arrowMid} y="-45" fill={connectorColor} fontSize="22" textAnchor="middle" fontWeight="bold" style={{opacity: showHint || step === 3 ? 1 : 0, transition: "opacity 0.4s ease"}}>{connectorLabel(i, pic)}</text>
              </motion.g>
            )}
          </g>
        );
      })}
    </svg>
    </div>
  );
};

const AnimatedDiamondSequence = ({ pic, index, playStep, step, palette }) => {
  const [isSquare, setIsSquare] = React.useState(false);
  const isRevealed = index <= playStep || (index === 4 && step >= 3);

  React.useEffect(() => {
    let int, timeout;
    if (isRevealed) {
      timeout = setTimeout(() => {
        setIsSquare(true);
        int = setInterval(() => {
          setIsSquare(prev => !prev);
        }, 4000);
      }, 2500);
    } else {
      setIsSquare(false);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(int);
    };
  }, [isRevealed]);

  const bs = 16;
  const dots = [];
  
  for(let r=0; r<pic; r++){
    for(let c=0; c<pic; c++){
      const i = r + c;
      const numDots = pic - Math.abs(pic - 1 - i);
      const j = r - Math.max(0, i - (pic - 1));
      
      const xDiamond = (j - (numDots - 1)/2) * bs;
      const yDiamond = (i - (pic - 1)) * bs;
      
      const xSquare = (c - (pic-1)/2) * bs;
      const ySquare = (r - (pic-1)/2) * bs;
      
      const xPos = isSquare ? xSquare : xDiamond;
      const yPos = isSquare ? ySquare : yDiamond;
      
      const color = palette[i % palette.length];
      const currentScale = isRevealed ? 1 : 0;

      dots.push(<motion.rect key={`${r}-${c}`} 
        initial={false}
        animate={{ scale: currentScale, x: xPos - 6, y: yPos - 6, fill: color }} 
        transition={{ 
          scale: { type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? i * 0.15 : 0 },
          x: { type: "tween", ease: [0.34, 1.56, 0.64, 1], duration: 0.8 },
          y: { type: "tween", ease: [0.34, 1.56, 0.64, 1], duration: 0.8 },
          fill: { duration: 0.8 }
        }}
        width={12} height={12} rx="6" 
      />);
    }
  }

  let expr = "";
  if (pic === 1) expr = "1";
  else {
     let arr = [];
     for(let i=1; i<=pic; i++) arr.push(i);
     for(let i=pic-1; i>=1; i--) arr.push(i);
     expr = arr.join(' + ');
  }

  return (
    <g>
      {!isSquare ? (
         <text x="0" y="-120" fill="#94a3b8" fontSize="13" textAnchor="middle" fontWeight="bold">
           {expr}
         </text>
      ) : (
         pic === 1 ? (
           <text x="0" y="-120" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
             1 = 1 × 1
           </text>
         ) : (
           <text x="0" y="-128" fill="#e2e8f0" fontSize="12" textAnchor="middle" fontWeight="bold">
             <tspan x="0" dy="0">{expr} = {pic*pic}</tspan>
             <tspan x="0" dy="1.4em">{pic} × {pic} = {pic*pic}</tspan>
           </text>
         )
      )}
      <g>{dots}</g>
    </g>
  );
};

const AnimatedLargeDiamond = ({ index, playStep, step, palette }) => {
  const [isSquare, setIsSquare] = React.useState(false);
  const isRevealed = index <= playStep || (index === 4 && step >= 3);

  React.useEffect(() => {
    let int, timeout;
    if (isRevealed) {
      timeout = setTimeout(() => {
        setIsSquare(true);
        int = setInterval(() => {
          setIsSquare(prev => !prev);
        }, 4000);
      }, 3500); // 3.5 seconds to build and look at the large diamond
    } else {
      setIsSquare(false);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(int);
    };
  }, [isRevealed]);

  const bs = 16;
  const topRows = [];
  for(let r=1; r<=3; r++) {
    for(let c=0; c<r; c++) {
      const x = (c - (r-1)/2) * bs;
      const y = (r - 1) * bs - 70;
      topRows.push(<motion.rect key={`t${r}${c}`} initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? r*0.15 : 0}} x={x-6} y={y-6} width={12} height={12} rx={6} fill={palette[r%palette.length]} />);
    }
  }
  
  const bottomRows = [];
  for(let r=1; r<=3; r++) {
    for(let c=0; c<r; c++) {
      const x = (c - (r-1)/2) * bs;
      const y = 70 - (r - 1) * bs;
      bottomRows.push(<motion.rect key={`b${r}${c}`} initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? r*0.15 + 1.5 : 0}} x={x-6} y={y-6} width={12} height={12} rx={6} fill={palette[r%palette.length]} />);
    }
  }

  return (
    <g>
      {!isSquare ? (
         <g>
           <text x="0" y="-135" fill="#94a3b8" fontSize="13" textAnchor="middle" fontWeight="bold">
             <tspan x="0" dy="0">1 + 2 + 3 + ... + 99 + 100</tspan>
             <tspan x="0" dy="1.4em">+ 99 + ... + 3 + 2 + 1</tspan>
           </text>
           
           <motion.g initial={{opacity:0}} animate={{opacity: isRevealed ? 1 : 0}} transition={{duration: 0.5}}>
             {topRows}
             <text x="0" y="-10" fill="#94a3b8" fontSize="16" textAnchor="middle" fontWeight="bold">⋮</text>
             
             <g transform="translate(0, 5)">
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={-4*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={-3*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={-2*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.text initial={{opacity:0}} animate={{opacity:isRevealed?1:0}} transition={{delay: isRevealed ? 1.0 : 0}} x="0" y="4" fill="#94a3b8" fontSize="14" textAnchor="middle" fontWeight="bold">...</motion.text>
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={2*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={3*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.rect initial={{scale:0}} animate={{scale:isRevealed?1:0}} transition={{type: "spring", stiffness: 300, damping: 20, delay: isRevealed ? 1.0 : 0}} x={4*bs-6} y={-6} width={12} height={12} rx={6} fill={palette[4%palette.length]} />
               <motion.text initial={{opacity:0}} animate={{opacity:isRevealed?1:0}} transition={{delay: isRevealed ? 1.2 : 0}} x={5*bs + 10} y="4" fill="#4ade80" fontSize="13" textAnchor="start" fontWeight="bold">← 100</motion.text>
             </g>

             <text x="0" y="40" fill="#94a3b8" fontSize="16" textAnchor="middle" fontWeight="bold">⋮</text>
             {bottomRows}
           </motion.g>
         </g>
      ) : (
         <g>
           <text x="0" y="-135" fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">
             <tspan x="0" dy="0">1 + 2 + 3 + ... + 99 + 100</tspan>
             <tspan x="0" dy="1.4em">+ 99 + ... + 3 + 2 + 1</tspan>
             <tspan x="0" dy="1.8em">100 × 100 = 10,000</tspan>
           </text>
           <motion.g initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}}>
             <rect x="-65" y="-60" width="130" height="130" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,6" rx="8" />
             <text x="0" y="-70" fill="#a855f7" fontSize="13" textAnchor="middle" fontWeight="bold">100 columns</text>
             <text x="-75" y="5" fill="#a855f7" fontSize="13" textAnchor="middle" fontWeight="bold" transform="rotate(-90, -75, 5)">100 rows</text>
             <text x="0" y="10" fill="#e2e8f0" fontSize="22" textAnchor="middle" fontWeight="bold">10,000</text>
           </motion.g>
         </g>
      )}
    </g>
  );
};

const VisualizerOddSums = ({ step, playStep, showHint }) => {
  const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635'];
  
  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={5} hideArrows={false} hidePictureText={true} connectorLabel={(i,pic)=>``} connectorColor="#fbbf24" bottomValues={['1','4','9','16','25']} spacing={265}
      renderShapes={(pic, index) => {
        return <AnimatedDiamondSequence key={pic} pic={pic} index={index} playStep={playStep} step={step} palette={palette} />;
      }} />
  );
};

const VisualizerHundredAndBack = ({ step, playStep, showHint }) => {
  const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635'];
  
  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={5} hideArrows={false} hidePictureText={true} connectorLabel={(i,pic)=>``} connectorColor="#fbbf24" bottomValues={['1','4','9','16', '10,000']} spacing={265}
      renderShapes={(pic, index) => {
        if (index === 4) return <AnimatedLargeDiamond key={pic} index={index} playStep={playStep} step={step} palette={palette} />;
        return <AnimatedDiamondSequence key={pic} pic={pic} index={index} playStep={playStep} step={step} palette={palette} />;
      }} />
  );
};

const VisualizerTenOdds = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={4} questionPic={4} hideArrows={true} hidePictureText={true} connectorLabel={()=>``} connectorColor="#2dd4bf" bottomValues={['4','16','36','100']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 4 : pic === 3 ? 6 : 10;
      const gridSize = 130;
      const stepSize = gridSize / size;
      const lines = [];
      const ox = -50; 
      const oy = -70;
      for(let j=1; j<size; j++) {
        lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*stepSize} x2={ox + gridSize} y2={oy + j*stepSize} stroke="rgba(45,212,191,0.3)" strokeWidth="1" />);
        lines.push(<line key={`v${j}`} x1={ox + j*stepSize} y1={oy} x2={ox + j*stepSize} y2={oy + gridSize} stroke="rgba(45,212,191,0.3)" strokeWidth="1" />);
      }
      return <g>
        <rect x={ox} y={oy} width={gridSize} height={gridSize} rx="4" fill="transparent" stroke="#2dd4bf" strokeWidth="2" />
        {lines}
        <text x="0" y="-115" fill="#ccfbf1" fontSize="13" fontWeight="700" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="-75" y="-5" fill="#ccfbf1" fontSize="12" fontWeight="700" textAnchor="middle" transform="rotate(-90, -75, -5)">{size} rows</text>
        <text x="15" y="78" fill="#ccfbf1" fontSize="12" fontWeight="700" textAnchor="middle">{size} columns</text>
      </g>;
    }} />
);

const VisualizerHundredOdds = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={5} hideArrows={true} hidePictureText={true} connectorLabel={()=>``} connectorColor="#f472b6" bottomValues={['4','16','25','100','10000']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 4 : pic === 3 ? 5 : pic === 4 ? 10 : 100;
      const gridSize = 130;
      const stepSize = size <= 10 ? gridSize / size : 0;
      const lines = [];
      const ox = -50;
      const oy = -70;
      if (size <= 10) {
        for(let j=1; j<size; j++) {
          lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*stepSize} x2={ox + gridSize} y2={oy + j*stepSize} stroke="rgba(244,114,182,0.3)" strokeWidth="1" />);
          lines.push(<line key={`v${j}`} x1={ox + j*stepSize} y1={oy} x2={ox + j*stepSize} y2={oy + gridSize} stroke="rgba(244,114,182,0.3)" strokeWidth="1" />);
        }
      } else {
        for(let j=1; j<10; j++) {
          lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*(gridSize/10)} x2={ox + gridSize} y2={oy + j*(gridSize/10)} stroke="rgba(244,114,182,0.15)" strokeWidth="1" />);
          lines.push(<line key={`v${j}`} x1={ox + j*(gridSize/10)} y1={oy} x2={ox + j*(gridSize/10)} y2={oy + gridSize} stroke="rgba(244,114,182,0.15)" strokeWidth="1" />);
        }
      }
      return <g>
        <rect x={ox} y={oy} width={gridSize} height={gridSize} rx="4" fill="transparent" stroke="#f472b6" strokeWidth="2" strokeDasharray={size === 100 ? "4 4" : "none"} />
        {lines}
        <text x="0" y="-115" fill="#fbcfe8" fontSize="13" fontWeight="700" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="-75" y="-5" fill="#fbcfe8" fontSize="12" fontWeight="700" textAnchor="middle" transform="rotate(-90, -75, -5)">{size} rows</text>
        <text x="15" y="78" fill="#fbcfe8" fontSize="12" fontWeight="700" textAnchor="middle">{size} columns</text>
      </g>;
    }} />
);

const VisualizerUpAndDown = ({ step, playStep, showHint }) => {
  const [mode, setMode] = useState('diagonal');
  
  const getTopLabel = (pic) => {
    if (pic === 1) return "1";
    if (pic === 2) return "1 + 2 + 1";
    if (pic === 3) return "1 + 2 + 3 + 2 + 1";
    return `1 + 2 + ... + ${pic} + ... + 1`;
  };

  const controls = (
    <div style={{display: 'flex', gap: '4px', background: 'rgba(15,23,42,0.6)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
      <button onClick={() => setMode('square')} style={{padding: '6px 16px', borderRadius: '6px', background: mode === 'square' ? 'rgba(255,255,255,0.15)' : 'transparent', color: mode === 'square' ? '#fff' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '13px', fontWeight: '500'}}>Square grid</button>
      <button onClick={() => setMode('diagonal')} style={{padding: '6px 16px', borderRadius: '6px', background: mode === 'diagonal' ? 'rgba(255,255,255,0.15)' : 'transparent', color: mode === 'diagonal' ? '#fff' : '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '13px', fontWeight: '500'}}>Diagonal rows</button>
    </div>
  );

  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} questionPic={6} hideArrows={true} topLabel={getTopLabel} extraControls={controls} connectorLabel={()=>``} connectorColor="#4ade80" bottomValues={['1','4','9','16','25','36']}
      renderShapes={(pic) => {
        const bs = 16;
        const ds = 12; // diagonal spacing
        const dots = [];
        const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635'];
        for(let r=0; r<pic; r++){
          for(let c=0; c<pic; c++){
            const diag = r + c;
            const layer = Math.max(r, c);
            
            let color, xPos, yPos;
            if (mode === 'diagonal') {
              color = palette[diag % palette.length];
              xPos = (c - r) * ds;
              yPos = (diag - (pic-1)) * ds;
            } else {
              color = palette[layer % palette.length];
              xPos = (c - (pic-1)/2) * bs;
              yPos = (r - (pic-1)/2) * bs;
            }
            
            dots.push(<motion.rect key={`${r}-${c}`} 
              initial={{ scale: 0, x: xPos - 6, y: yPos - 6 }}
              animate={{ scale: 1, x: xPos - 6, y: yPos - 6, fill: color }} 
              transition={{ 
                scale: { delay: mode==='diagonal' ? diag*0.05 : layer*0.1, duration: 0.4 },
                x: { type: "tween", ease: [0.34, 1.56, 0.64, 1], duration: 0.8 },
                y: { type: "tween", ease: [0.34, 1.56, 0.64, 1], duration: 0.8 },
                fill: { duration: 0.8 }
              }}
              width={12} height={12} rx="6" 
              opacity={1}
            />);
          }
        }
        return <g>{dots}</g>;
      }} />
  );
};

const VisualizerUpAndDown100 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={5} hideArrows={true} hidePictureText={true} connectorLabel={()=>``} connectorColor="#a78bfa" bottomValues={['4','16','25','100','10000']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 4 : pic === 3 ? 5 : pic === 4 ? 10 : 100;
      const gridSize = 130;
      const stepSize = size <= 10 ? gridSize / size : 0;
      const lines = [];
      const ox = -50;
      const oy = -70;
      if (size <= 10) {
        for(let j=1; j<size; j++) {
          lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*stepSize} x2={ox + gridSize} y2={oy + j*stepSize} stroke="rgba(74,222,128,0.3)" strokeWidth="1" />);
          lines.push(<line key={`v${j}`} x1={ox + j*stepSize} y1={oy} x2={ox + j*stepSize} y2={oy + gridSize} stroke="rgba(74,222,128,0.3)" strokeWidth="1" />);
        }
      } else {
        for(let j=1; j<10; j++) {
          lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*(gridSize/10)} x2={ox + gridSize} y2={oy + j*(gridSize/10)} stroke="rgba(74,222,128,0.15)" strokeWidth="1" />);
          lines.push(<line key={`v${j}`} x1={ox + j*(gridSize/10)} y1={oy} x2={ox + j*(gridSize/10)} y2={oy + gridSize} stroke="rgba(74,222,128,0.15)" strokeWidth="1" />);
        }
      }
      return <g>
        <rect x={ox} y={oy} width={gridSize} height={gridSize} rx="4" fill="transparent" stroke="#4ade80" strokeWidth="2" strokeDasharray={size === 100 ? "4 4" : "none"} />
        {lines}
        <text x="0" y="-115" fill="#e2e8f0" fontSize="13" fontWeight="700" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="-75" y="-5" fill="#e2e8f0" fontSize="12" fontWeight="700" textAnchor="middle" transform="rotate(-90, -75, -5)">{size} rows</text>
        <text x="15" y="78" fill="#e2e8f0" fontSize="12" fontWeight="700" textAnchor="middle">{size} columns</text>
      </g>;
    }} />
);


const VisualizerAddingOnes = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={()=>`+1`} connectorColor="#3b82f6" bottomValues={['1','2','3','4','5']} spacing={220}
    renderShapes={(pic) => {
      const dots = [];
      const bs = 20;
      const startX = -((pic - 1) * bs) / 2;
      for (let j = 0; j < pic; j++) {
        const isNew = j === pic - 1 && pic > 1;
        dots.push(<motion.circle key={j} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} cx={startX + j * bs} cy={0} r="7" fill={isNew ? "#93c5fd" : "#3b82f6"} />);
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerOnesUpAndDown = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={()=>`+2`} connectorColor="#f472b6" bottomValues={['1','3','5','7','9']} spacing={220}
    renderShapes={(pic) => {
      const dots = [];
      const bs = 16;
      // n ones going up, n-1 coming down
      const totalWidth = (pic * 2 - 2) * bs;
      const startX = -totalWidth / 2;
      for (let j = 0; j < pic; j++) {
        dots.push(<motion.rect key={`u${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} x={startX + j * bs - 6} y={-j * bs - 6} width={12} height={12} rx={6} fill="#ec4899" />);
      }
      for (let j = 1; j < pic; j++) {
        dots.push(<motion.rect key={`d${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: (pic+j)*0.05}} x={startX + (pic - 1 + j) * bs - 6} y={-(pic - 1 - j) * bs - 6} width={12} height={12} rx={6} fill="#fbcfe8" />);
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerCountingSums = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={(i,pic)=>`+${pic}`} connectorColor="#f59e0b" bottomValues={['1','3','6','10','15']} spacing={220}
    renderShapes={(pic) => {
      const dots = [];
      for (let r=0; r<pic; r++) {
        for (let c=0; c<=r; c++) {
          const isNew = r === pic-1 && pic>1;
          dots.push(<motion.circle key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: r*0.05}} cx={(c - r/2)*20} cy={(r - pic/2)*20 + 10} r="7" fill={isNew ? "#fde047" : "#eab308"} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerTwoTriangles = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={4} connectorLabel={(i,pic)=>`+${pic*2-1}`} connectorColor="#10b981" bottomValues={['4','9','16','25']} spacing={260} topLabel={(pic) => `${pic}+${pic+1} = ${pic+1}^2`}
    renderShapes={(pic) => {
      const dots = [];
      const s = pic + 1; // picture 1 => side 2 (1+3=4)
      const bs = 16;
      for (let r=0; r<s; r++) {
        for (let c=0; c<s; c++) {
          const isTopTriangle = c >= r; // one triangle
          const isBottomTriangle = c < r;
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: (r+c)*0.03}} x={(c - s/2)*bs} y={(r - s/2)*bs} width={12} height={12} rx={4} fill={isTopTriangle ? "#34d399" : "#059669"} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerPowersOfTwo = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={5} hideArrows={true} connectorLabel={()=>``} connectorColor="#8b5cf6" bottomValues={['1','3','7','15','31']} spacing={240}
    renderShapes={(pic, i, isFocus) => {
      const n = Math.pow(2, pic - 1);
      let cols, rows;
      if ((pic-1) % 2 === 0) {
        cols = Math.sqrt(n);
        rows = cols;
      } else {
        cols = Math.sqrt(n / 2);
        rows = cols * 2;
      }
      const S = 18;
      const dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (r === rows - 1 && c === cols - 1) {
            // The missing piece
            if (isFocus) {
              dots.push(<motion.rect key="missing" initial={{opacity:0}} animate={{opacity:0.3}} transition={{delay: 1}} x={(c - cols/2)*S + 2} y={(r - rows/2)*S + 2} width={14} height={14} rx={4} fill="#e2e8f0" stroke="#94a3b8" strokeDasharray="2,2" />);
            }
          } else {
            const isNew = pic > 1 && (r >= rows/2 || c >= cols/2); // approximate new half
            dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: (r+c)*0.02}} x={(c - cols/2)*S + 2} y={(r - rows/2)*S + 2} width={14} height={14} rx={4} fill={isNew ? "#a78bfa" : "#7c3aed"} />);
          }
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerSixTriangles = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={4} connectorLabel={(i,pic)=>`+${pic*6}`} connectorColor="#f43f5e" bottomValues={['7','19','37','61']} spacing={260}
    renderShapes={(pic) => {
      const s = pic; // triangle side
      const dots = [];
      const bs = 12;
      dots.push(<motion.circle key="center" initial={{scale:0}} animate={{scale:1}} cx={0} cy={0} r={5} fill="#f43f5e" />);
      
      const ux = 0;
      const uy = -bs;
      const vx = bs * Math.sqrt(3)/2;
      const vy = -bs * 0.5;

      for (let k=0; k<6; k++) {
        for (let r=1; r<=s; r++) {
          for (let c=0; c<r; c++) {
            // position in sector 0
            const bx = r * ux + c * (vx - ux);
            const by = r * uy + c * (vy - uy);
            
            // rotate by k * 60 deg
            const angle = k * Math.PI / 3;
            const px = bx * Math.cos(angle) - by * Math.sin(angle);
            const py = bx * Math.sin(angle) + by * Math.cos(angle);
            
            const isNew = r === s;
            dots.push(<motion.circle key={`${k}-${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: r*0.05}} cx={px} cy={py} r={4.5} fill={isNew ? "#fda4af" : "#e11d48"} />);
          }
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerHexagonalToCubes = ({ step, playStep, showHint }) => {
  const [separate, setSeparate] = useState(false);
  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} hideArrows={true} numPictures={4} connectorLabel={()=>``} connectorColor="#f59e0b" bottomValues={['1','8','27','64']} spacing={260}
      extraControls={<div style={{display: 'flex', gap: '8px', background: 'rgba(15,23,42,0.8)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}><button onClick={() => setSeparate(false)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: !separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: !separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Solid cubes</button><button onClick={() => setSeparate(true)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Separate layers</button></div>}
      renderShapes={(pic, i, isFocus) => {
        const layers = [];
        const S = 16;
        const dx = S * Math.sqrt(3) / 2;
        const dy = S / 2;
        const gap = separate ? S * 0.8 : 0;
        
        const layerColors = [
          { top: '#fde047', left: '#facc15', right: '#eab308' },
          { top: '#bfdbfe', left: '#60a5fa', right: '#3b82f6' },
          { top: '#fbcfe8', left: '#f472b6', right: '#db2777' },
          { top: '#c084fc', left: '#a855f7', right: '#9333ea' }
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
              
              const isOuter = (x === pic-1 || y === pic-1 || z === pic-1) && pic > 1;
              const cols = isOuter ? layerColors[pic-1] : layerColors[Math.max(x,y,z)];
              
              cubesInLayer.push(
                <g key={`${x}-${y}`} transform={`translate(${cx}, ${cy})`}>
                  <polygon points={pTop} fill={cols.top} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pLeft} fill={cols.left} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pRight} fill={cols.right} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                </g>
              );
            }
          }
          layers.push(
            <motion.g key={`layer-${z}`} initial={false} animate={isFocus ? {opacity:1, y: 0, scale: 1} : {opacity:0, y: -40, scale: 0.95}} transition={{delay: z * 0.07, type: 'spring'}}>
              {cubesInLayer}
            </motion.g>
          );
        }
        return <g>{layers}</g>;
      }} />
  );
};

const VisualizerDiscoverRelation = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={4} connectorLabel={(i,pic)=>`+${(pic+1)*2-1}`} connectorColor="#14b8a6" bottomValues={['4','9','16','25']} spacing={260} topLabel={(pic) => `${pic+1}^2`}
    renderShapes={(pic) => {
      const s = pic + 1; // start at 2x2
      const bs = 16;
      const dots = [];
      for (let r=0; r<s; r++) {
        for (let c=0; c<s; c++) {
          const isBorder = (r === s-1 || c === s-1);
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: (r+c)*0.03}} x={(c - s/2)*bs} y={(r - s/2)*bs} width={12} height={12} rx={4} fill={isBorder ? "#5eead4" : "#0f766e"} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);


// ==========================================
// DATA
// ==========================================
const CONCEPTS = [
  { id: 1, title: 'Counting up and down makes squares', subtitle: 'The numbers grow to the middle, then shrink again.', watchDesc: 'Count up to the middle, then count back down.', watchAnswer: 'Watch the same blocks rearrange into a perfect square.', question: 'What is 1 + 2 + 3 + 4 + 5 + 4 + 3 + 2 + 1?', seqList: '1, 4, 9, 16, ?', options: ['20', '24', '25'], correctOption: '25', discoveredTitle: 'Up to 5 and down to 1 makes 25.', discoveredDesc: 'Count up to 5 and then back down to 1. The same 25 blocks can be arranged as a 5 × 5 square.', nextTitle: 'Up to 100 and back', Visualizer: VisualizerOddSums },
  { id: 2, title: 'Up to 100 and back', subtitle: 'The peak is counted once.', watchDesc: 'A peak of 2, 5 or 100 produces the square of that number.', watchAnswer: 'The peak 100 occurs once.', question: 'Can you see the value?\n1 + 2 + 3 + ... + 99 + 100\n+ 99 + ... + 3 + 2 + 1', seqList: '1, 4, 9, 16, ... ?', options: ['9,900', '10,000', '10,100'], correctOption: '10,000', discoveredTitle: 'The pattern makes a 100 × 100 square.', discoveredDesc: '100 × 100 = 10,000', nextTitle: 'All 1s sequence', Visualizer: VisualizerHundredAndBack },
  { id: 3, title: 'All 1s sequence', subtitle: 'One more 1. One more in the total.', watchDesc: 'Add one unit at a time and read the running totals.', watchAnswer: '1; 1+1; 1+1+1... give 1, 2, 3...', question: 'What is the sum of five 1s?', seqList: '1, 2, 3, 4, ?', options: [4, 5, 6], correctOption: 5, discoveredTitle: 'Five 1s give 5. The totals are counting numbers.', discoveredDesc: 'Adding n copies of 1 gives n.', nextTitle: '1s up and down', Visualizer: VisualizerAddingOnes },
  { id: 4, title: '1s up and down', subtitle: 'One central 1, with equal wings.', watchDesc: 'At step n, use n ones going up and n - 1 coming down.', watchAnswer: 'Count the peak once: n + (n - 1) = 2n - 1.', question: 'Use five 1s on the way up and four on the way down. Total?', seqList: '1, 3, 5, 7, ?', options: [9, 10, 11], correctOption: 9, discoveredTitle: '5 + 4 = 9. Four pairs and one central unit.', discoveredDesc: 'The peak is included only once. So the totals are 1, 3, 5, 7, 9... each equal to 2n - 1.', nextTitle: 'Triangular numbers', Visualizer: VisualizerOnesUpAndDown },
  { id: 5, title: 'Counting numbers to triangles', subtitle: 'Stack the next counting number as a row.', watchDesc: 'A row of 1, then 2, then 3: watch the triangle grow.', watchAnswer: 'The totals 1, 3, 6, 10, 15... are triangular numbers.', question: 'What is 1 + 2 + 3 + 4 + 5?', seqList: '1, 3, 6, 10, ?', options: [14, 15, 16], correctOption: 15, discoveredTitle: 'The five rows contain 15 dots altogether.', discoveredDesc: 'Rows of 1, 2, 3... n dots form a filled triangle.', nextTitle: 'Two triangles', Visualizer: VisualizerCountingSums },
  { id: 6, title: 'Two triangles make a square', subtitle: 'Fit consecutive triangles together.', watchDesc: 'Separate the two colours. One triangle has one more row.', watchAnswer: '1+3=4; 3+6=9; 6+10=16...', question: 'How many dots belong in picture 4?', seqList: '4, 9, 16, ?', options: [20, 24, 25], correctOption: 25, discoveredTitle: '10 + 15 = 25. The two triangles fill one square.', discoveredDesc: 'Tn + Tn-1 = n^2. One triangle includes the diagonal of the square; the other fills the remaining spaces.', nextTitle: 'Powers of 2', Visualizer: VisualizerTwoTriangles },
  { id: 7, title: 'Powers of 2', subtitle: 'Add powers of 2, then fill the missing place.', watchDesc: 'Coloured groups grow 1, 2, 4, 8... One empty place completes the next power of 2.', watchAnswer: 'The sums are 1, 3, 7, 15, 31... Add 1 to get 2, 4, 8, 16, 32...', question: 'What is 1 + 2 + 4 + 8 + 16, before adding the extra 1?', seqList: '1, 3, 7, 15, ?', options: [31, 32, 30], correctOption: 31, discoveredTitle: 'The sum is 31. One extra unit completes 32.', discoveredDesc: '1+2+...+2^(n-1) = 2^n - 1.', nextTitle: 'Six triangles', Visualizer: VisualizerPowersOfTwo },
  { id: 8, title: 'Six triangles + a centre', subtitle: 'Arrange six triangular groups around one dot.', watchDesc: 'The six colours are equal triangular groups. Keep the centre separate.', watchAnswer: '6x1+1=7; 6x3+1=19; 6x6+1=37...', question: 'If each triangle has 10 dots, what is 6 x 10 + 1?', seqList: '7, 19, 37, ?', options: [60, 61, 63], correctOption: 61, discoveredTitle: 'Six triangles of 10, plus the centre, make 61.', discoveredDesc: 'Six copies of a triangular number plus a centre dot make hexagonal numbers.', nextTitle: 'Hexagonal to cubes', Visualizer: VisualizerSixTriangles },
  { id: 9, title: 'Hexagonal numbers to cubes', subtitle: 'A new shell grows the cube by one.', watchDesc: 'Each golden shell joins the smaller blue cube.', watchAnswer: 'The added shells contain 1, 7, 19, 37, 61... unit cubes.', question: 'What is 1 + 7 + 19 + 37?', seqList: '1, 8, 27, ?', options: [64, 81, 100], correctOption: 64, discoveredTitle: 'Four shells build 4 x 4 x 4 = 64 unit cubes.', discoveredDesc: 'The difference between consecutive cubes is 1, 7, 19, 37, 61...', nextTitle: 'Find your own patterns', Visualizer: VisualizerHexagonalToCubes },
  { id: 10, title: 'Find your own patterns!', subtitle: 'What hides between two neighbouring squares?', watchDesc: 'Count only the golden border. The blue square is already there.', watchAnswer: '4-1=3; 9-4=5; 16-9=7; 25-16=9...', question: 'What is 16 + 9, the total of the next square?', seqList: '4, 9, 16, ?', options: [20, 25, 36], correctOption: 25, discoveredTitle: '16 + 9 = 25. The 9 new dots complete the 5 × 5 square.', discoveredDesc: 'n^2 - (n-1)^2 = 2n - 1. The border has n dots on one side and n-1 on the other.', nextTitle: 'Finish', Visualizer: VisualizerDiscoverRelation }
];
export default function RelationsAmongSequences({ onNext }) {
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
                VISUAL PATTERNS &nbsp;•&nbsp; <span style={{color: '#4ade80'}}>1.4 &nbsp;•&nbsp; CONCEPT {String(conceptIdx+1).padStart(2, '0')} / {CONCEPTS.length}</span>
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
                          <div className="find-question" style={{whiteSpace: 'pre-wrap'}}>{concept.question}</div>
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
