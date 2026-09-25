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

const BoxVisualizer = ({ step, playStep, numPictures, questionPic, renderShapes, bottomValues, connectorLabel, connectorColor, showHint, extraControls, hideArrows, hidePictureText, topLabel }) => {
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

// --- Custom Visualizers for 1.4 ---
const VisualizerOddSums = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${2*pic-1}`} connectorColor="#fbbf24" bottomValues={['1','4','9','16','25','36']}
    renderShapes={(pic) => {
      const bs = 22;
      const dots = [];
      const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635'];
      for(let r=0; r<pic; r++){
        for(let c=0; c<pic; c++){
          const layer = Math.max(r, c);
          const isNew = layer === pic-1 && pic>1;
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: layer*0.1 + (r+c)*0.02}} x={(c - pic/2)*bs} y={(r - pic/2)*bs} width={18} height={18} rx="4" fill={isNew ? "#fde047" : palette[layer]} opacity={isNew ? 1 : 0.8} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerTenOdds = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={3} hideArrows={true} hidePictureText={true} connectorLabel={()=>``} connectorColor="#38bdf8" bottomValues={['4','16','100']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 4 : 10;
      const gridSize = 130;
      const stepSize = gridSize / size;
      const lines = [];
      const ox = -50; 
      const oy = -70;
      for(let j=1; j<size; j++) {
        lines.push(<line key={`h${j}`} x1={ox} y1={oy + j*stepSize} x2={ox + gridSize} y2={oy + j*stepSize} stroke="rgba(56,189,248,0.3)" strokeWidth="1" />);
        lines.push(<line key={`v${j}`} x1={ox + j*stepSize} y1={oy} x2={ox + j*stepSize} y2={oy + gridSize} stroke="rgba(56,189,248,0.3)" strokeWidth="1" />);
      }
      return <g>
        <rect x={ox} y={oy} width={gridSize} height={gridSize} rx="4" fill="transparent" stroke="#38bdf8" strokeWidth="2" />
        {lines}
        <text x="0" y="-115" fill="#bae6fd" fontSize="13" fontWeight="700" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="-75" y="-5" fill="#bae6fd" fontSize="12" fontWeight="700" textAnchor="middle" transform="rotate(-90, -75, -5)">{size} rows</text>
        <text x="15" y="78" fill="#bae6fd" fontSize="12" fontWeight="700" textAnchor="middle">{size} columns</text>
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

const VisualizerGeneric = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={3} connectorLabel={()=>``} connectorColor="#64748b" bottomValues={['?','?','?']}
    renderShapes={(pic) => (
      <g>
        <text x="0" y="10" fill="#94a3b8" fontSize="24" textAnchor="middle">Pattern {pic}</text>
      </g>
    )} />
);

// ==========================================
// DATA
// ==========================================
const CONCEPTS = [
  { id: 1, title: 'Odd sums make squares', subtitle: 'Each odd number adds an L-shaped border.', watchDesc: 'Watch borders of 1, 3, 5 and 7 dots build larger squares.', watchAnswer: 'Each colour is one odd-number group. Separate the borders to inspect them.', question: 'What is 1 + 3 + 5 + 7 + 9 + 11?', seqList: '1, 4, 9, 16, 25, ?', options: [30, 35, 36], correctOption: 36, discoveredTitle: 'The six odd-number groups fill all 36 places.', discoveredDesc: 'The groups contain 1, 3, 5, 7, 9 and 11 dots. Together they fill a 6 x 6 square.', nextTitle: 'The first 10 odd numbers', Visualizer: VisualizerOddSums },
  { id: 2, title: 'The first 10 odd numbers', subtitle: 'Imagine a larger version of the square.', watchDesc: 'Squares of side 2, 4 and 10 use the same odd-border rule.', watchAnswer: 'The first 10 odd numbers end at 19. Their 10 borders fill a 10 x 10 square.', question: 'What is 1 + 3 + 5 + ... + 19?', seqList: '4, 16, ?', options: [90, 100, 110], correctOption: 100, discoveredTitle: 'Ten odd-number borders. A hundred dots.', discoveredDesc: 'The first 10 odd numbers make 10 L-shaped borders. They fill a square of side 10, so the sum is 10 x 10 = 100.', nextTitle: 'The first 100 odd numbers', Visualizer: VisualizerTenOdds },
  { id: 3, title: 'The first 100 odd numbers', subtitle: 'Think of the square without drawing every dot.', watchDesc: 'The first 100 odd numbers end at 199. The 100 x 100 grid is shown schematically.', watchAnswer: '100 rows of 100 columns.', question: 'Why does the same rule work for 100 odd numbers?', seqList: '100, ?', options: [1000, 10000, 20000], correctOption: 10000, discoveredTitle: '100 x 100 = 10,000, without adding a hundred terms one by one.', discoveredDesc: 'The first 100 odd numbers are 1, 3, 5, ..., 199. Their 100 L-shaped borders fill a 100 x 100 square: 10,000 dots.', nextTitle: 'Adding up and down', Visualizer: VisualizerHundredOdds },
  { id: 4, title: 'Adding up and down', subtitle: 'The same square, counted along its diagonals.', watchDesc: 'Follow diagonals of lengths 1, 2, 3, ..., n, ..., 3, 2, 1.', watchAnswer: 'Switch to Diagonal rows: 1+2+3+4+5+4+3+2+1 = 25.', question: 'What is 1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1?', seqList: '1, 4, 9, 16, ?', options: [30, 36, 42], correctOption: 36, discoveredTitle: 'Up to 6 and down to 1 makes 36.', discoveredDesc: 'The diagonal groups fill a 6 x 6 square. Count the peak 6 once.', nextTitle: 'Up to 100 and back', Visualizer: VisualizerUpAndDown },
  { id: 5, title: 'Up to 100 and back', subtitle: 'The peak is counted once.', watchDesc: 'A peak of 2, 5 or 10 produces the square of that number.', watchAnswer: 'The peak 100 occurs once.', question: 'What is 1 + 2 + ... + 100 + 99 + ... + 2 + 1?', seqList: '4, 25, 100, ?', options: [1000, 10000, 20000], correctOption: 10000, discoveredTitle: 'The total is 10,000. The peak is included only once.', discoveredDesc: 'The diagonals of a 100 x 100 square have lengths 1, 2, ..., 100, ..., 2, 1. They fill 10,000 places. Counting 100 twice would give the wrong sum.', nextTitle: 'Adding 1s to counting', Visualizer: VisualizerUpAndDown100 },
  { id: 6, title: 'Adding 1s → counting', subtitle: 'One more 1. One more in the total.', watchDesc: 'Add one unit at a time and read the running totals.', watchAnswer: '1; 1+1; 1+1+1... give 1, 2, 3...', question: 'What is the sum of five 1s?', seqList: '1, 2, 3, 4, ?', options: [4, 5, 6], correctOption: 5, discoveredTitle: 'Five 1s give 5. The totals are counting numbers.', discoveredDesc: 'Adding n copies of 1 gives n.', nextTitle: '1s up and down', Visualizer: VisualizerGeneric },
  { id: 7, title: '1s up and down → odds', subtitle: 'One central 1, with equal wings.', watchDesc: 'At step n, use n ones going up and n - 1 coming down.', watchAnswer: 'Count the peak once: n + (n - 1) = 2n - 1.', question: 'Use five 1s on the way up and four on the way down. Total?', seqList: '1, 3, 5, 7, ?', options: [9, 10, 11], correctOption: 9, discoveredTitle: '5 + 4 = 9. Four pairs and one central unit.', discoveredDesc: 'The peak is included only once. So the totals are 1, 3, 5, 7, 9... each equal to 2n - 1.', nextTitle: 'Counting sums', Visualizer: VisualizerGeneric },
  { id: 8, title: 'Counting sums → triangles', subtitle: 'Stack the next counting number as a row.', watchDesc: 'A row of 1, then 2, then 3: watch the triangle grow.', watchAnswer: 'The totals 1, 3, 6, 10, 15... are triangular numbers.', question: 'What is 1 + 2 + 3 + 4 + 5 + 6?', seqList: '1, 3, 6, 10, 15, ?', options: [20, 21, 25], correctOption: 21, discoveredTitle: 'The six rows contain 21 dots altogether.', discoveredDesc: 'Rows of 1, 2, 3... n dots form a filled triangle.', nextTitle: 'Two triangles', Visualizer: VisualizerGeneric },
  { id: 9, title: 'Two triangles → a square', subtitle: 'Fit consecutive triangles together.', watchDesc: 'Separate the two colours. One triangle has one more row.', watchAnswer: '1+3=4; 3+6=9; 6+10=16...', question: 'What is 15 + 21, the next pair of triangular numbers?', seqList: '4, 9, 16, 25, ?', options: [30, 35, 36], correctOption: 36, discoveredTitle: '15 + 21 = 36. The two triangles fill one square.', discoveredDesc: 'Tn + Tn-1 = n^2. One triangle includes the diagonal of the square; the other fills the remaining spaces.', nextTitle: 'Adding powers of 2', Visualizer: VisualizerGeneric },
  { id: 10, title: 'One short of doubling', subtitle: 'Add powers of 2, then fill the missing place.', watchDesc: 'Coloured groups grow 1, 2, 4, 8... One empty place completes the next power of 2.', watchAnswer: 'The sums are 1, 3, 7, 15, 31... Add 1 to get 2, 4, 8, 16, 32...', question: 'What is 1 + 2 + 4 + 8 + 16, before adding the extra 1?', seqList: '1, 3, 7, 15, ?', options: [31, 32, 30], correctOption: 31, discoveredTitle: 'The sum is 31. One extra unit completes 32.', discoveredDesc: '1+2+...+2^(n-1) = 2^n - 1.', nextTitle: 'Six triangles', Visualizer: VisualizerGeneric },
  { id: 11, title: 'Six triangles + a centre', subtitle: 'Arrange six triangular groups around one dot.', watchDesc: 'The six colours are equal triangular groups. Keep the centre separate.', watchAnswer: '6x1+1=7; 6x3+1=19; 6x6+1=37...', question: 'If each triangle has 15 dots, what is 6 x 15 + 1?', seqList: '7, 19, 37, 61, ?', options: [90, 91, 96], correctOption: 91, discoveredTitle: 'Six triangles of 15, plus the centre, make 91.', discoveredDesc: 'Six copies of a triangular number plus a centre dot make hexagonal numbers.', nextTitle: 'Hexagonal sums', Visualizer: VisualizerGeneric },
  { id: 12, title: 'Hexagonal sums → cubes', subtitle: 'A new shell grows the cube by one.', watchDesc: 'Each golden shell joins the smaller blue cube.', watchAnswer: 'The added shells contain 1, 7, 19, 37, 61... unit cubes.', question: 'What is 1 + 7 + 19 + 37 + 61?', seqList: '1, 8, 27, 64, ?', options: [100, 121, 125], correctOption: 125, discoveredTitle: 'Five shells build 5 x 5 x 5 = 125 unit cubes.', discoveredDesc: 'The difference between consecutive cubes is 1, 7, 19, 37, 61...', nextTitle: 'Discover a new relation', Visualizer: VisualizerGeneric },
  { id: 13, title: 'Discover a new relation', subtitle: 'What hides between two neighbouring squares?', watchDesc: 'Count only the golden border. The blue square is already there.', watchAnswer: '4-1=3; 9-4=5; 16-9=7; 25-16=9...', question: 'How many new dots grow the square from 25 to 36?', seqList: '3, 5, 7, 9, ?', options: [10, 11, 12], correctOption: 11, discoveredTitle: '36 - 25 = 11. The next odd border completes the square.', discoveredDesc: 'n^2 - (n-1)^2 = 2n - 1. The border has n dots on one side and n-1 on the other.', nextTitle: 'Finish', Visualizer: VisualizerGeneric },
  { id: 14, title: 'Finish', subtitle: 'You have mastered pattern connections!', watchDesc: 'Review all the connections you discovered.', watchAnswer: 'Mathematics is full of surprising links.', question: 'Are you ready to continue your journey?', seqList: 'Done', options: ['Yes', 'No', 'Maybe'], correctOption: 'Yes', discoveredTitle: 'Great job!', discoveredDesc: 'You have completed the relations module.', nextTitle: 'Finish', Visualizer: VisualizerGeneric }
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
