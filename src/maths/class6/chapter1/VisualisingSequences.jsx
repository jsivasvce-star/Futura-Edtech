import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, RotateCcw, Check, ArrowRight, Maximize, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TriangularNumbersRecall from './TriangularNumbersRecall';
import CubeNumbersInteractive from './CubeNumbersInteractive';
import RealisticCube3D from './RealisticCube3D';
import video36dots from '../36dots.mp4';
import VisualisingSequencesV2 from './version-2/VisualisingSequencesV2';
import mathBg13V1 from './math_bg_1_3_v1.jpg';
import page1Audio from './audio/page1.mp3';
import page2Audio from './audio/page2.mp3';
import page3Audio from './audio/page3.mp3';
import page4Audio from './audio/page4.mp3';
import page5Audio from './audio/page5.mp3';
import page6Audio from './audio/page6.mp3';
import page10Audio from './audio/page10.mp3';
import page11Audio from './audio/page11.mp3';
import page12Audio from './audio/page12.mp3';
import page13Audio from './audio/page13.mp3';
import p1CorrectAudioFile from './audio/p1-correct.mp3';
import p2CorrectAudioFile from './audio/p2-correct.mp3';
import p3CorrectAudioFile from './audio/p3-correct.mp3';
import p4CorrectAudioFile from './audio/p4-correct.mp3';
import p5CorrectAudioFile from './audio/p5-correct.mp3';
import p6CorrectAudioFile from './audio/p6-correct.mp3';
import p10CorrectAudioFile from './audio/p10-correct.mp3';
import p11CorrectAudioFile from './audio/p11-correct.mp3';
import p12CorrectAudioFile from './audio/p12-correct.mp3';
import p13CorrectAudioFile from './audio/p13-correct.mp3';
import wrongAudioFile from './audio/p1-wrong.mp3';
import firstWrongAudioFile from './audio/1st-wpage3.mp3';
import secondWrongAudioFile from './audio/2nd-wpage3.mp3';

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

const BoxVisualizer = ({ step, playStep, numPictures, questionPic, renderShapes, bottomValues, connectorLabel, connectorColor, showHint, extraControls, hideArrows, getRightEdge = () => 50 }) => {
  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {extraControls && <div style={{position: 'absolute', top: -10, zIndex: 10}}>{extraControls}</div>}
      <svg viewBox="0 0 1300 350" className="seq-svg">
      <SVGDefs />
      {(() => {
        const xPositions = [];
        let currentX = 70;
        for(let j=1; j<=6; j++) {
           xPositions[j] = currentX;
           if (j < 6) {
               const leftW = getRightEdge(j);
               const rightW = getRightEdge(j+1);
               currentX += leftW + 100 + rightW;
           }
        }
        return [1, 2, 3, 4, 5, 6].map((pic, i) => {
          if (pic > numPictures) return null;
          const x = xPositions[pic];
          const isFocus = playStep >= i;
          const targetPic = questionPic || numPictures;
          const isUnknown = pic === targetPic && step !== 3;
          const canClickNext = playStep === i - 1 && (
            (step === 1 && playStep < (questionPic ? questionPic - 1 : numPictures - 1)) || 
            (step === 3 && playStep < numPictures - 1)
          );

          let titleColor = isFocus ? "#082B66" : "#64748B";
          if (isUnknown) {
            titleColor = "#64748B";
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
                <text x="0" y="-120" fill={titleColor} fontSize="20" textAnchor="middle" fontWeight="800" letterSpacing="1" style={{transition: 'fill 0.4s ease'}}>PICTURE {pic}</text>
              
              <g style={{opacity: isFocus ? 1 : 0, transition: 'opacity 0.4s ease-in-out'}}>
                {isUnknown ? (
                  <text x="0" y="25" fill="#082B66" fontSize="100" textAnchor="middle" fontWeight="900">?</text>
                ) : (
                  renderShapes(pic, i, isFocus)
                )}

                <text x="0" y="140" fill={isUnknown ? "#082B66" : "#0866E8"} fontSize="64" textAnchor="middle" fontWeight="900">{isUnknown ? "?" : bottomValues[i]}</text>
              </g>
              
              {i > 0 && (isFocus || canClickNext) && !hideArrows && (
                <motion.g 
                  initial={{opacity:0, x:-20}} 
                  animate={{opacity:1, x:0}} 
                  transition={{delay:0.3}}
                >
                  {(() => {
                    const endX = -getRightEdge(pic) - 15;
                    const startX = endX - 70;
                    return (
                      <>
                        <motion.path 
                          d={`M ${startX} -20 L ${endX} -20`} 
                          fill="none" 
                          stroke={connectorColor} 
                          strokeWidth="2.5" 
                          markerEnd={`url(#${arrowhead})`} 
                        />
                        <text x={(startX + endX) / 2} y="-30" fill={connectorColor} fontSize="22" textAnchor="middle" fontWeight="800" style={{opacity: showHint || step === 3 ? 1 : 0, transition: "opacity 0.4s ease"}}>{connectorLabel(i, pic)}</text>
                      </>
                    );
                  })()}
                </motion.g>
              )}
            </g>
          );
        });
      })()}
      {/* The separate Next button has been removed in favor of clickable arrows */}
    </svg>
    </div>
  );
};

// --- Custom Visualizers ---
const SEQ_COLORS = [
  '#facc15', '#fb923c', '#f87171', '#f472b6', 
  '#c084fc', '#60a5fa', '#22d3ee', '#34d399'
];

const VisualizerAll1s = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"same"} connectorColor="#3b82f6" bottomValues={['1','1','1','1','1','1']} getRightEdge={() => 50}
    renderShapes={(pic) => <motion.circle initial={{scale:0}} animate={{scale:1}} cx="0" cy="0" r="50" fill="#3b82f6" />} />
);
const VisualizerCounting = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+1"} connectorColor="#fbbf24" bottomValues={['1','2','3','4','5','6']} getRightEdge={(pic) => (pic*24 + (pic-1)*8)/2}
    renderShapes={(pic) => {
      const bs = 24, g = 8, w = pic*bs + (pic-1)*g;
      let sx = -w/2 + bs/2;
      return <g>{Array.from({length:pic}).map((_, j) => (
        <motion.circle key={j} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} cx={sx + j*(bs+g)} cy="0" r="9" fill={SEQ_COLORS[j % SEQ_COLORS.length]} />
      ))}</g>;
    }} />
);
const VisualizerOdd = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+2"} connectorColor="#fbbf24" bottomValues={['1','3','5','7','9','11']} getRightEdge={(pic) => (pic*22 + (pic-1)*7)/2}
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
        {Array.from({length:bRow}).map((_, j) => <motion.circle key={`b${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} cx={-bw/2 + bs/2 + j*(bs+g)} cy={botY + bs/2} r="9" fill={SEQ_COLORS[j % SEQ_COLORS.length]} />)}
        {Array.from({length:tRow}).map((_, j) => <motion.circle key={`t${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05+0.1}} cx={-tw/2 + bs/2 + j*(bs+g)} cy={topY + bs/2} r="9" fill={SEQ_COLORS[(j+1) % SEQ_COLORS.length]} />)}
      </g>;
    }} />
);
const VisualizerEven = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>"+2"} connectorColor="#a78bfa" bottomValues={['2','4','6','8','10','12']} getRightEdge={(pic) => (pic*22 + (pic-1)*7)/2}
    renderShapes={(pic) => {
      const bs = 22, g = 7;
      const w = pic*bs + (pic-1)*g;
      const totalH = bs * 2 + g;
      const topY = -totalH / 2;
      const botY = topY + bs + g;
      return <g>
        {Array.from({length:pic}).map((_, j) => <motion.circle key={`b${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05}} cx={-w/2 + bs/2 + j*(bs+g)} cy={botY + bs/2} r="9" fill={SEQ_COLORS[j % SEQ_COLORS.length]} />)}
        {Array.from({length:pic}).map((_, j) => <motion.circle key={`t${j}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: j*0.05+0.1}} cx={-w/2 + bs/2 + j*(bs+g)} cy={topY + bs/2} r="9" fill={SEQ_COLORS[j % SEQ_COLORS.length]} />)}
      </g>;
    }} />
);
const VisualizerTriangular = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${pic}`} connectorColor="#f472b6" bottomValues={['1','3','6','10','15','21']} getRightEdge={(pic) => ((pic-1)/2)*24 + 9}
    renderShapes={(pic, i, isFocus) => {
      const dots = [];
      for (let r=0; r<pic; r++) {
        for (let c=0; c<=r; c++) {
          const cx = (c - r/2)*24;
          const cy = (r - pic/2)*24 + 10;
          if (r < pic - 1 || pic === 1) {
            // Old dots (or the very first dot) appear immediately
            dots.push(
              <motion.circle 
                key={`${r}-${c}`} 
                initial={false} 
                animate={isFocus ? {scale: 1} : {scale: 0}} 
                transition={{duration: 0.2}} 
                cx={cx} cy={cy} r="9" 
                fill={SEQ_COLORS[r % SEQ_COLORS.length]} 
              />
            );
          } else {
            // New dots show a placeholder first, then pop in one by one
            dots.push(
              <circle 
                key={`placeholder-${r}-${c}`} 
                cx={cx} cy={cy} r="9" 
                stroke="rgba(8, 43, 102, 0.25)" 
                strokeWidth="1.5" 
                strokeDasharray="3,3" 
                fill="transparent" 
              />
            );
            dots.push(
              <motion.circle 
                key={`${r}-${c}`} 
                initial={{scale: 0}} 
                animate={isFocus ? {scale: 1} : {scale: 0}} 
                transition={{delay: isFocus ? 1.4 + c * 0.2 : 0, type: 'spring', stiffness: 200, damping: 15}} 
                cx={cx} cy={cy} r="9" 
                fill={SEQ_COLORS[r % SEQ_COLORS.length]} 
              />
            );
          }
        }
      }
      if (pic === 6 && step === 3) {
        dots.push(
          <motion.polygon
            key="triangle-outline"
            points="0,-85 -85,75 85,75"
            fill="transparent"
            stroke="#f472b6"
            strokeWidth="3"
            strokeDasharray="8,8"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        );
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerSquare = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${pic*pic - (pic-1)*(pic-1)}`} connectorColor="#38bdf8" bottomValues={['1','4','9','16','25','36']} getRightEdge={(pic) => (pic/2 - 1)*22 + 18}
    renderShapes={(pic, i, isFocus) => {
      const dots = [];
      for (let r=0; r<pic; r++) {
        for (let c=0; c<pic; c++) {
          const ring = Math.max(r, c);
          const cx = (c - pic/2)*22;
          const cy = (r - pic/2)*22;
          
          if ((r < pic - 1 && c < pic - 1) || pic === 1) {
            dots.push(
              <motion.rect 
                key={`${r}-${c}`} 
                initial={false} 
                animate={isFocus ? {scale: 1} : {scale: 0}} 
                transition={{duration: 0.2}} 
                x={cx} y={cy} width="18" height="18" rx="6" 
                fill={SEQ_COLORS[ring % SEQ_COLORS.length]} 
              />
            );
          } else {
            dots.push(
              <rect 
                key={`placeholder-${r}-${c}`} 
                x={cx} y={cy} width="18" height="18" rx="6" 
                stroke="rgba(8, 43, 102, 0.25)" 
                strokeWidth="1.5" 
                strokeDasharray="3,3" 
                fill="transparent" 
              />
            );
            const popIdx = (r + c) - (pic - 1);
            dots.push(
              <motion.rect 
                key={`${r}-${c}`} 
                initial={{scale: 0}} 
                animate={isFocus ? {scale: 1} : {scale: 0}} 
                transition={{delay: isFocus ? 1.4 + popIdx * 0.2 : 0, type: 'spring', stiffness: 200, damping: 15}} 
                x={cx} y={cy} width="18" height="18" rx="6" 
                fill={SEQ_COLORS[ring % SEQ_COLORS.length]} 
              />
            );
          }
        }
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerCube = ({ step, playStep, showHint }) => {
  const [separate, setSeparate] = useState(false);
  
  const toggleControls = (
    <div style={{display: 'flex', gap: '8px', background: '#E8F2FF', padding: '4px', borderRadius: '10px', border: '2px solid #BAE6FD'}}>
      <button onClick={() => setSeparate(false)} style={{padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: !separate ? '#1769F5' : 'transparent', color: !separate ? '#ffffff' : '#082B66', fontWeight: '800', boxShadow: !separate ? '0 2px 8px rgba(23,105,245,0.25)' : 'none'}}>Solid cubes</button>
      <button onClick={() => setSeparate(true)} style={{padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: separate ? '#1769F5' : 'transparent', color: separate ? '#ffffff' : '#082B66', fontWeight: '800', boxShadow: separate ? '0 2px 8px rgba(23,105,245,0.25)' : 'none'}}>Separate layers</button>
    </div>
  );

  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} extraControls={toggleControls} getRightEdge={() => 65} numPictures={6} questionPic={4} connectorLabel={(i,pic)=>`${pic}x${pic}x${pic}`} connectorColor="#fb7185" bottomValues={['1','8','27','64','125','216']}
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
                  <polygon points={pTop} fill={cols.top} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                  <polygon points={pLeft} fill={cols.left} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                  <polygon points={pRight} fill={cols.right} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
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
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={(i,pic)=>`+${(pic-1)*6}`} connectorColor="#fbbf24" bottomValues={['1','7','19','37','61']} getRightEdge={(pic) => pic === 1 ? 7 : (pic-1)*20 + 5.5}
    renderShapes={(pic, i, isFocus) => {
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
      dots.push(
        <motion.circle 
          key="c" 
          initial={false} 
          animate={isFocus ? {scale: 1} : {scale: 0}} 
          transition={{duration: 0.2}} 
          cx="0" cy="0" r="7" 
          fill={SEQ_COLORS[0]} 
        />
      );
      for (let r=1; r<pic; r++) {
        for (let k=0; k<6; k++) {
          for (let j=0; j<r; j++) {
            const px = r * v[k].x + j * (v[(k+1)%6].x - v[k].x);
            const py = r * v[k].y + j * (v[(k+1)%6].y - v[k].y);
            
            if (r < pic - 1) {
              dots.push(
                <motion.circle 
                  key={`r${r}-k${k}-j${j}`} 
                  initial={false} 
                  animate={isFocus ? {scale: 1} : {scale: 0}} 
                  transition={{duration: 0.2}} 
                  cx={px*S} cy={py*S} r="5.5" 
                  fill={SEQ_COLORS[r % SEQ_COLORS.length]} 
                />
              );
            } else {
              dots.push(
                <circle 
                  key={`placeholder-r${r}-k${k}-j${j}`} 
                  cx={px*S} cy={py*S} r="5.5" 
                  stroke="rgba(8, 43, 102, 0.25)" 
                  strokeWidth="1.5" 
                  strokeDasharray="2,2" 
                  fill="transparent" 
                />
              );
              const popIdx = k * r + j;
              dots.push(
                <motion.circle 
                  key={`r${r}-k${k}-j${j}`} 
                  initial={{scale: 0}} 
                  animate={isFocus ? {scale: 1} : {scale: 0}} 
                  transition={{delay: isFocus ? 1.4 + popIdx * 0.05 : 0, type: 'spring', stiffness: 200, damping: 15}} 
                  cx={px*S} cy={py*S} r="5.5" 
                  fill={SEQ_COLORS[r % SEQ_COLORS.length]} 
                />
              );
            }
          }
        }
      }
      return <g>{dots}</g>;
    }} />
);
const VisualizerPow2 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={()=>`x2`} connectorColor="#60a5fa" bottomValues={['1','2','4','8','16']} getRightEdge={(pic) => pic === 1 ? 12 : ((pic % 2 === 0 ? Math.sqrt(Math.pow(2, pic - 2)) : Math.sqrt(Math.pow(2, pic - 2) / 2)) - 1) * 24 + 15 + 9.5}
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
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} questionPic={4} connectorLabel={()=>`x3`} connectorColor="#4ade80" bottomValues={['1','3','9','27','81']} getRightEdge={(pic) => pic === 1 ? 9.5 : 1.5 * ((pic % 2 === 0 ? Math.sqrt(Math.pow(3, pic - 2)) : Math.sqrt(Math.pow(3, pic - 2) / 3)) - 1) * 16 + 24 + 7.5}
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
        <button onClick={() => setShape('triangle')} style={{ padding: '8px 24px', background: shape === 'triangle' ? '#1769F5' : '#DCEEFF', border: shape === 'triangle' ? '2px solid #1769F5' : '2px solid #93C5FD', borderRadius: '12px', color: shape === 'triangle' ? '#ffffff' : '#082B66', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px', boxShadow: shape === 'triangle' ? '0 4px 14px rgba(23,105,245,0.3)' : 'none', transition: '0.2s' }}>
          <span>△</span> Triangle
        </button>
        <button onClick={() => setShape('square')} style={{ padding: '8px 24px', background: shape === 'square' ? '#1769F5' : '#DCEEFF', border: shape === 'square' ? '2px solid #1769F5' : '2px solid #93C5FD', borderRadius: '12px', color: shape === 'square' ? '#ffffff' : '#082B66', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px', boxShadow: shape === 'square' ? '0 4px 14px rgba(23,105,245,0.3)' : 'none', transition: '0.2s' }}>
          <span>□</span> Square
        </button>
        <button onClick={() => setShape('rectangle')} style={{ padding: '8px 24px', background: shape === 'rectangle' ? '#1769F5' : '#DCEEFF', border: shape === 'rectangle' ? '2px solid #1769F5' : '2px solid #93C5FD', borderRadius: '12px', color: shape === 'rectangle' ? '#ffffff' : '#082B66', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '16px', boxShadow: shape === 'rectangle' ? '0 4px 14px rgba(23,105,245,0.3)' : 'none', transition: '0.2s' }}>
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
          <text x="0" y="-80" fill="#082B66" fontSize="16" fontWeight="900" letterSpacing="2">SAME DOTS</text>
          <text x="0" y="10" fill="#0866E8" fontSize="100" fontWeight="900">{36}</text>
          <text x="0" y="60" fill="#202B3C" fontSize="26" fontWeight="800">
            {shape === 'triangle' ? '1 + 2 + ... + 8' : (shape === 'square' ? '6 x 6 = 36' : '4 x 9 = 36')}
          </text>
          <text x="0" y="100" fill="#123B78" fontSize="18" fontWeight="600">No dots added.</text>
          <text x="0" y="125" fill="#123B78" fontSize="18" fontWeight="600">None removed.</text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// DATA
// ==========================================
const CONCEPTS = [
  { id: 1, title: 'All 1s', subtitle: 'One dot. Again and again.', watchDesc: 'Look inside each picture. How many dots do you see?', watchAnswer: 'New picture. Same number. Nothing is added.', question: 'How many dots belong in picture 6?', seqList: '1, 1, 1, 1, 1, ?', options: [1, 2, 3], correctOption: 1, discoveredTitle: 'One dot in every picture.', discoveredDesc: 'The sequence is 1, 1, 1, 1, 1, ...', nextTitle: 'Counting numbers', questionPic: 6, color: '#3b82f6', Visualizer: VisualizerAll1s },
  { id: 2, title: 'Counting numbers', subtitle: 'One new dot joins the row.', watchDesc: 'Watch one new block join the row in every picture.', watchAnswer: 'One extra block makes the next counting number.', question: 'How many blocks belong in picture 6?', seqList: '1, 2, 3, 4, 5, ?', options: [5, 6, 7], correctOption: 6, discoveredTitle: 'Five blocks plus one new block make six.', discoveredDesc: 'One extra block is added in each step. The sequence is 1, 2, 3, 4, 5, 6, ...', nextTitle: 'Odd numbers', questionPic: 6, color: '#fbbf24', Visualizer: VisualizerCounting },
  { id: 3, title: 'Odd numbers', subtitle: 'There is always one left over.', watchDesc: 'Look at the two rows. One row always has an extra block.', watchAnswer: 'Add two blocks. Keep one row one block longer.', question: 'How many blocks belong in picture 6?', seqList: '1, 3, 5, 7, 9, ?', options: [9, 10, 11, 12], correctOption: 11, discoveredTitle: 'Two growing rows. One unpaired block. Eleven in all.', discoveredDesc: 'At picture 6, that is 6+5=11.', nextTitle: 'Even numbers', questionPic: 6, color: '#fbbf24', Visualizer: VisualizerOdd },
  { id: 4, title: 'Even numbers', subtitle: 'Every block has a partner.', watchDesc: 'Follow the columns. Each new column is one complete pair.', watchAnswer: 'Two equal rows. No block is left over.', question: 'How many blocks belong in picture 6?', seqList: '2, 4, 6, 8, 10, ?', options: [11, 12, 13, 14], correctOption: 12, discoveredTitle: 'Six pairs make twelve blocks.', discoveredDesc: 'Each picture contains pairs. Two rows of 6 give 6+6=12.', nextTitle: 'Triangular numbers', questionPic: 6, color: '#a78bfa', Visualizer: VisualizerEven },
  { id: 5, title: 'Triangular numbers', subtitle: 'One new row. A bigger triangle.', watchDesc: 'Each new row has one more dot than the row above it.', watchAnswer: 'The bottom row grows: 1, 2, 3, 4, 5, 6 dots.', question: 'How many dots belong in picture 6?', seqList: '1, 3, 6, 10, 15, ?', options: [19, 20, 21, 22], correctOption: 21, discoveredTitle: 'Keep the first 15 dots. Add a bottom row of 6.', discoveredDesc: '15 + 6 = 21. These growing rows form a filled triangle.', nextTitle: 'Square numbers', questionPic: 6, color: '#f472b6', Visualizer: VisualizerTriangular },
  { id: 6, title: 'Square numbers', subtitle: 'Make the rows match the columns.', watchDesc: 'Watch the equal rows and columns grow together.', watchAnswer: 'A square grid has the same number of rows and columns.', question: 'How many dots belong in picture 6?', seqList: '1, 4, 9, 16, 25, ?', options: [30, 34, 35, 36], correctOption: 36, discoveredTitle: 'Six rows. Six columns. Thirty-six dots.', discoveredDesc: '6 x 6 = 36.', nextTitle: 'Cube numbers', questionPic: 6, color: '#38bdf8', Visualizer: VisualizerSquare },
  { id: 7, title: 'Cube numbers', subtitle: 'Rows, columns... and one more dimension.', watchDesc: 'Each colour is a layer. Separate the layers to look inside.', watchAnswer: 'A cube of side n contains n layers, each with n x n unit cubes.', question: 'How many unit cubes belong in picture 4?', seqList: '1, 8, 27, ?, 125, 216', options: [36, 48, 64, 125], correctOption: 64, discoveredTitle: 'Four square layers stack into a cube of 64 unit cubes.', discoveredDesc: '4 x 4 x 4 = 64.', nextTitle: 'Hexagonal numbers', questionPic: 4, color: '#fb7185', Visualizer: VisualizerCube },
  { id: 8, title: 'Hexagonal numbers', subtitle: 'A centre dot. Rings with six sides.', watchDesc: 'Follow each new ring around the centre dot.', watchAnswer: 'The rings add 6, 12, 18, then 24 dots.', question: 'How many dots belong in picture 5?', seqList: '1, 7, 19, 37, ?', options: [55, 60, 61, 72], correctOption: 61, discoveredTitle: 'Six more dots in every new ring. The next total is 61.', discoveredDesc: 'Start with one centre dot. Successive rings contain 6, 12, 18, and 24 dots.', nextTitle: 'Powers of 2', questionPic: 5, color: '#10b981', Visualizer: VisualizerHexagonal },
  { id: 9, title: 'Powers of 2', subtitle: 'Make two copies of the whole picture.', watchDesc: 'Each new picture contains two equal copies of the previous picture.', watchAnswer: 'Double the whole amount.', question: 'How many dots belong in picture 5?', seqList: '1, 2, 4, 8, ?', options: [10, 12, 14, 16], correctOption: 16, discoveredTitle: 'Eight dots in each copy. Sixteen in both copies.', discoveredDesc: 'The number of dots doubles: 1, 2, 4, 8, 16... Two equal groups of 8 contain 16 dots.', nextTitle: 'Powers of 3', questionPic: 5, color: '#f87171', Visualizer: VisualizerPow2 },
  { id: 10, title: 'Powers of 3', subtitle: 'Make three copies. Watch it multiply.', watchDesc: 'Each new picture contains three equal copies of the previous picture.', watchAnswer: 'Triple the whole amount.', question: 'How many dots belong in picture 4?', seqList: '1, 3, 9, ?, 81', options: [18, 24, 27, 36], correctOption: 27, discoveredTitle: 'Three groups of 9 make 27 dots.', discoveredDesc: 'The total triples each time: 1, 3, 9, 27, 81... Three equal groups of 9 contain 27 dots.', nextTitle: 'The same 36 dots', questionPic: 4, color: '#fb923c', Visualizer: VisualizerPow3 },
  { id: 11, title: 'The same 36 dots', subtitle: 'Change the shape. Keep every dot.', watchDesc: 'The colours travel with the dots. The total stays the same.', watchAnswer: 'No dots are added or removed during the move.', question: 'What stays the same when the triangle becomes a square?', seqList: 'Count the dots in either shape.', options: [30, 36, 42], correctOption: 36, discoveredTitle: 'The same 36 dots fit into a triangle and a square.', discoveredDesc: 'The triangle has 8 growing rows: 1 + 2 + ... + 8 = 36. The square has 6 equal rows: 6 x 6 = 36.', nextTitle: 'Finish', questionPic: 6, color: '#38bdf8', Visualizer: Visualizer36Dots }
];

export default function VisualisingSequences({ onNext, version = 1 }) {
  const [conceptIdx, setConceptIdx] = useState(0); 
  const [tab, setTab] = useState('watch');
  const [step, setStep] = useState(1); 
  const [playStep, setPlayStep] = useState(0); 
  const [playing, setPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);
  const correctAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);
  const firstWrongAudioRef = useRef(null);
  const secondWrongAudioRef = useRef(null);

  useEffect(() => {
    wrongAudioRef.current = new Audio(wrongAudioFile);
    firstWrongAudioRef.current = new Audio(firstWrongAudioFile);
    secondWrongAudioRef.current = new Audio(secondWrongAudioFile);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    const correctSrc = conceptIdx === 9 ? p13CorrectAudioFile : (conceptIdx === 8 ? p12CorrectAudioFile : (conceptIdx === 7 ? p11CorrectAudioFile : (conceptIdx === 6 ? p10CorrectAudioFile : (conceptIdx === 5 ? p6CorrectAudioFile : (conceptIdx === 4 ? p5CorrectAudioFile : (conceptIdx === 3 ? p4CorrectAudioFile : (conceptIdx === 2 ? p3CorrectAudioFile : (conceptIdx === 1 ? p2CorrectAudioFile : p1CorrectAudioFile))))))));
    correctAudioRef.current = new Audio(correctSrc);
    
    if (tab !== 'watch' || version === 2) {
       return;
    }

    const audioSrc = conceptIdx === 9 ? page13Audio : (conceptIdx === 8 ? page12Audio : (conceptIdx === 7 ? page11Audio : (conceptIdx === 6 ? page10Audio : (conceptIdx === 5 ? page6Audio : (conceptIdx === 4 ? page5Audio : (conceptIdx === 3 ? page4Audio : (conceptIdx === 2 ? page3Audio : (conceptIdx === 1 ? page2Audio : page1Audio))))))));
    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;
    
    const handleEnded = () => setIsPlayingAudio(false);
    newAudio.addEventListener('ended', handleEnded);
    
    newAudio.play().then(() => setIsPlayingAudio(true)).catch(e => {
       console.log("Audio auto-play failed (usually browser policy):", e);
       setIsPlayingAudio(false);
    });
    
    return () => {
      newAudio.removeEventListener('ended', handleEnded);
      stopAllAudio();
    };
  }, [conceptIdx, tab]);

  const stopAllAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (correctAudioRef.current) { correctAudioRef.current.pause(); correctAudioRef.current.currentTime = 0; }
    if (wrongAudioRef.current) { wrongAudioRef.current.pause(); wrongAudioRef.current.currentTime = 0; }
    if (firstWrongAudioRef.current) { firstWrongAudioRef.current.pause(); firstWrongAudioRef.current.currentTime = 0; }
    if (secondWrongAudioRef.current) { secondWrongAudioRef.current.pause(); secondWrongAudioRef.current.currentTime = 0; }
    setIsPlayingAudio(false);
  };

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

  const concept = CONCEPTS[conceptIdx];
  const Visualizer = concept?.Visualizer || VisualizerCounting;

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  };
  const themeColor = concept?.color || '#38bdf8';
  const themeColorRgb = hexToRgb(themeColor);

  useEffect(() => {
    if (tab === 'watch') {
      setPlayStep(0);
      setPlaying(false);
    }
  }, [conceptIdx, tab, concept?.id]);

  useEffect(() => {
    const handler = () => { setPlaying(false); setPlayStep(p => Math.min(p + 1, 5)); };
    document.addEventListener('next-step', handler);
    return () => document.removeEventListener('next-step', handler);
  }, []);

  useEffect(() => {
    let int;
    if (playing) {
      int = setInterval(() => {
        setPlayStep(p => {
          const maxPlay = step === 1 ? (concept.questionPic - 1) : 5;
          if (p >= maxPlay) { setPlaying(false); return maxPlay; }
          return p + 1;
        });
      }, (conceptIdx === 4 || conceptIdx === 5 || conceptIdx === 7) ? 3200 : 2200);
    }
    return () => clearInterval(int);
  }, [playing, step, concept?.questionPic, conceptIdx]);

  const handlePlay = () => { setTab('watch'); setPlayStep(0); setPlaying(true); };
  const handleReplay = () => { setTab('watch'); setPlayStep(0); setTimeout(() => setPlaying(true), 100); };
  const handleStep = () => { setPlaying(false); setPlayStep(p => Math.min(p + 1, 5)); };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    if (opt === concept.correctOption) {
      if (correctAudioRef.current) {
        correctAudioRef.current.currentTime = 0;
        correctAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setStep(3);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      
      let audioToPlay = wrongAudioRef.current;
      if (conceptIdx >= 2 && conceptIdx <= 9) {
        audioToPlay = newAttempts === 1 ? firstWrongAudioRef.current : secondWrongAudioRef.current;
      }
      
      if (audioToPlay) {
        audioToPlay.currentTime = 0;
        audioToPlay.play().catch(e => console.log("Audio play failed:", e));
      }
      setStep(2);
      
      if (conceptIdx >= 2 && conceptIdx <= 9) {
        if (newAttempts >= 2) {
          setShowHint(true);
        }
      } else {
        setShowHint(true);
      }

      setTimeout(() => {
        setStep(1);
        setSelectedOption(null);
      }, 2000);
    }
  };

  const goToNext = () => {
    stopAllAudio();
    if (conceptIdx === 5 && tab !== 'interactive') {
      setConceptIdx(6);
      setTab('interactive');
      return;
    }
    if (conceptIdx === 6 && tab === 'interactive') {
      setTab('watch');
      return;
    }
    if (conceptIdx < CONCEPTS.length - 1) {
      const nextIdx = conceptIdx + 1;
      setConceptIdx(nextIdx);
      // For any other concept, they start at 'watch'. But just in case they jump to 6 from elsewhere (not 5), we handle it.
      if (nextIdx === 6) {
        setTab('interactive');
      } else {
        setTab('watch');
      }
      setStep(1);
      setSelectedOption(null);
      setPlayStep(0);
      setShowConfetti(false);
      setShowHint(false);
      setWrongAttempts(0);
    } else {
      if (onNext) onNext();
    }
  };
  
  const goToPrev = () => {
    stopAllAudio();
    if (conceptIdx === 6 && tab === 'watch') {
      setTab('interactive');
      return;
    }
    if (conceptIdx === 6 && tab === 'interactive') {
      setConceptIdx(5);
      setTab('discovered');
      return;
    }
    if (conceptIdx > 0) {
      const prevIdx = conceptIdx - 1;
      setConceptIdx(prevIdx);
      setTab('watch');
      setStep(1);
      setSelectedOption(null);
      setPlayStep(0);
      setShowConfetti(false);
      setShowHint(false);
      setWrongAttempts(0);
    }
  };

  if (version === 2) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'white', minHeight: '600px' }}>
        <VisualisingSequencesV2 onNext={onNext} />
      </div>
    );
  }

  if (!concept) return null;

  if (conceptIdx === 6 && tab === 'interactive') {
    return <CubeNumbersInteractive onNext={goToNext} onPrev={() => { stopAllAudio(); setConceptIdx(5); setTab('discovered'); }} />;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div>
        {/* Full-Screen Edge-to-Edge Mathematics Background */}
        <div 
          className="bg-image" 
          style={{
            backgroundImage: `url(${mathBg13V1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#fdfbf7'
          }}
        />
      {/* Main Content Area */}
      <div className="main-wrapper">
        <Confetti trigger={showConfetti} />

        <AnimatePresence>
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              style={{
                position: 'absolute',
                top: '18%',
                left: '50%',
                background: 'rgba(255, 255, 255, 0.98)',
                border: '2px solid #FCA5A5',
                color: '#991B1B',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '18px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.15)'
              }}
            >
              <span style={{ fontSize: '20px' }}>🤔</span>
              Not quite right. Look closely at the pattern!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="glass-container">
          {/* Header Area */}
          <div className="content-header">
            <div>
              <div className="concept-meta">
                <span>VISUAL PATTERNS &nbsp;•&nbsp;</span>
                <span className="concept-badge-inactive">1.3</span>
                <span>&nbsp;•&nbsp;</span>
                <span className="concept-badge-active">CONCEPT {String(conceptIdx+1).padStart(2, '0')} / 11</span>
              </div>
              <h1 className="concept-title">{concept.title}</h1>
              <h2 className="concept-subtitle">{concept.subtitle}</h2>
            </div>
            
            <button 
              onClick={toggleAudio}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: isPlayingAudio ? '#1769F5' : '#DCEEFF',
                border: isPlayingAudio ? '2px solid #1769F5' : '2px solid #93C5FD',
                color: isPlayingAudio ? '#ffffff' : '#082B66',
                padding: '10px 20px', borderRadius: '12px',
                fontWeight: '800', fontSize: '15px',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: isPlayingAudio ? '0 4px 14px rgba(23, 105, 245, 0.35)' : 'none'
              }}
            >
              {isPlayingAudio ? <Volume2 size={22} /> : <VolumeX size={22} />}
              {isPlayingAudio ? 'Playing' : 'Listen'}
            </button>
          </div>

          {/* Glass Card Body */}
          <div className="glass-card-body">

            {/* Visualization Area */}
            <div className="visualization-area">
              <Visualizer step={step} playStep={playStep} showHint={showHint} />
            </div>

            {/* Content Below Visualizer */}
            <div className="below-visualizer">
              
              {tab === 'watch' && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', minHeight: '60px' }}>
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
                    {(() => {
                      const isReady = playStep >= (concept.questionPic - 2);
                      const canRevealNext = playStep < (concept.questionPic - 1);
                      return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <button 
                            className="ready-btn" 
                            onClick={() => { setTab('find'); setPlayStep(5); }}
                            disabled={!isReady}
                            style={{
                              opacity: isReady ? 1 : 0.4,
                              cursor: isReady ? 'pointer' : 'not-allowed',
                              filter: isReady ? 'none' : 'grayscale(80%)'
                            }}
                          >
                            I'm ready. Let me try &rarr;
                          </button>
                          
                          {canRevealNext && (
                            <button
                               onClick={() => document.dispatchEvent(new CustomEvent('next-step'))}
                               className="modern-next-btn pulse-glow"
                               title="Reveal next pattern"
                            >
                               <span className="modern-next-icon">
                                 <ChevronRight size={28} strokeWidth={2.5} />
                               </span>
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </motion.div>
                </div>
              )}

              {tab !== 'watch' && (
                <>
                  <div className="watch-desc-inline" style={{textAlign: 'left'}}>
                    {concept.watchDesc}
                    <div style={{float: 'right', fontSize: '15px', color: '#123B78', fontWeight: '700'}}>Picture {conceptIdx===7 || conceptIdx===8 || conceptIdx===9 ? '4 of 5' : '5 of 6'}</div>
                  </div>
                  
                  <div className="find-card-inline">
                    {step === 3 ? (
                      <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="success-inline">
                         <div className="success-header"><Check size={20} color="#087A3D" strokeWidth={3} /> CONCEPT DISCOVERED</div>
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
        .modern-next-btn {
          width: 48px; height: 48px; border-radius: 50%;
          background: #DCEEFF; 
          border: 2px solid #1769F5; 
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1769F5;
          box-shadow: 0 4px 14px rgba(23, 105, 245, 0.2);
          transition: all 0.2s ease-out;
          -webkit-appearance: none;
        }
        .modern-next-btn:focus-visible {
          outline: 2px solid #1769F5;
          outline-offset: 4px;
        }
        .modern-next-icon {
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease-out;
          margin-left: 3px;
        }
        .modern-next-btn:hover { 
          background: #BAE6FD; 
          border-color: #0f56d4;
          transform: translateY(-2px); 
          box-shadow: 0 6px 16px rgba(23, 105, 245, 0.3); 
        }
        .modern-next-btn:hover .modern-next-icon { 
          transform: translateX(3px); 
        }
        .modern-next-btn:active { 
          transform: translateY(1px); 
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(23, 105, 245, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(23, 105, 245, 0); }
          100% { box-shadow: 0 0 0 0 rgba(23, 105, 245, 0); }
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .bg-image {
          position: absolute; inset: 0; z-index: -2;
          background-image: url('${mathBg13V1}'); 
          background-size: cover; background-position: center;
          background-repeat: no-repeat;
          background-color: #fdfbf7;
        }
        
        .bg-overlay {
          display: none;
        }

        .main-wrapper {
          flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;
          padding: 16px 40px; padding-bottom: 50px;
        }

        .glass-container {
          width: 100%; margin: 0 auto;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .content-header { 
          display: flex; justify-content: space-between; align-items: flex-start; 
          margin-bottom: 12px; padding: 0 12px; 
        }
        .concept-meta { 
          font-size: 18px; color: #123B78; letter-spacing: 1px; font-weight: 800; 
          margin-bottom: 8px; display: flex; align-items: center; gap: 8px; 
        }
        .concept-badge-inactive {
          background: #DCEEFF; color: #082B66; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-size: 15px;
        }
        .concept-badge-active {
          background: #FFD629; color: #082B66; padding: 2px 10px; border-radius: 6px; font-weight: 900; font-size: 15px;
        }
        .concept-title { 
          font-size: 46px; font-weight: 900; margin: 0 0 4px 0; color: #082B66; letter-spacing: -0.5px; 
        }
        .concept-subtitle { 
          font-size: 22px; font-weight: 700; margin: 0; color: #123B78; 
        }

        .glass-card-body {
          overflow: visible; display: flex; flex-direction: column;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .visualization-area { 
          width: 100%; display: flex; justify-content: center; padding: 12px 0; 
          background: transparent; border: none; box-shadow: none;
        }
        .seq-svg { 
          width: 100%; max-height: 500px; overflow: visible; margin-top: 40px; 
        }

        .below-visualizer { padding: 0 40px 0px 40px; }
        .watch-desc-inline { 
          font-size: 20px; color: #202B3C; font-weight: 600; margin-bottom: 14px; text-align: center; line-height: 1.5; 
        }
        
        .ready-btn { 
          background: #1769F5; color: #ffffff; border: none; border-radius: 12px; 
          padding: 14px 28px; font-size: 17px; font-weight: 800; cursor: pointer; 
          transition: 0.2s; box-shadow: 0 4px 16px rgba(23, 105, 245, 0.35); 
        }
        .ready-btn:hover { 
          background: #0f56d4; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(23, 105, 245, 0.45); 
        }

        .find-card-inline { margin-bottom: 12px; }
        .checkpoint-container { 
          background: rgba(255, 255, 255, 0.95); border: 2px solid #BAE6FD; 
          border-radius: 16px; padding: 18px 32px; display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 8px 30px rgba(8, 43, 102, 0.08);
        }
        .find-title { 
          font-size: 14px; color: #0866E8; letter-spacing: 1.5px; font-weight: 800; margin-bottom: 8px; text-transform: uppercase; 
        }
        .find-question { 
          font-size: 24px; font-weight: 800; color: #082B66; margin-bottom: 6px; 
        }
        .find-seq { 
          font-size: 19px; color: #202B3C; font-weight: 700; 
        }

        .options-row { display: flex; gap: 12px; justify-content: center; }
        .option-btn { 
          background: #F0F7FF; border: 2px solid #93C5FD; color: #082B66; 
          border-radius: 12px; width: 70px; height: 70px; font-size: 28px; font-weight: 900; 
          cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(8, 43, 102, 0.06); 
        }
        .option-btn:hover { 
          background: #DBEAFE; border-color: #1769F5; color: #082B66; transform: translateY(-2px); 
        }
        .option-btn.correct { 
          background: #087A3D !important; border-color: #055e2e !important; color: #ffffff !important; 
          box-shadow: 0 6px 20px rgba(8, 122, 61, 0.4) !important; transform: scale(1.05); 
        }
        .option-btn.wrong { 
          background: #FEE2E2 !important; border-color: #EF4444 !important; color: #991B1B !important; 
          animation: shake 0.4s; 
        }

        .success-inline { 
          background: rgba(240, 253, 244, 0.96); border: 2px solid #86EFAC; 
          border-radius: 16px; padding: 20px 32px; 
          box-shadow: 0 8px 30px rgba(8, 122, 61, 0.1); 
        }
        .success-header { 
          display: flex; align-items: center; gap: 8px; color: #087A3D; 
          font-size: 15px; font-weight: 900; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; 
        }
        .success-title { 
          font-size: 24px; font-weight: 800; color: #082B66; margin-bottom: 6px; 
        }
        .success-desc { 
          font-size: 18px; color: #202B3C; line-height: 1.5; font-weight: 600; 
        }

        .bottom-floating-footer {
          position: absolute; bottom: 20px; left: 24px; right: 24px;
          display: flex; justify-content: space-between; align-items: center; z-index: 50;
        }
        .footer-nav-btn { 
          background: #DCEEFF; border: 2px solid #93C5FD; color: #082B66; 
          font-size: 18px; font-weight: 800; cursor: pointer; padding: 10px 22px; 
          border-radius: 10px; transition: 0.2s; box-shadow: 0 4px 12px rgba(8, 43, 102, 0.08); 
        }
        .footer-nav-btn:hover { 
          background: #c3e2ff; transform: translateY(-1px); 
        }
        .footer-nav-btn.primary { 
          background: #1769F5; border: 2px solid #1769F5; color: #ffffff; 
          box-shadow: 0 4px 16px rgba(23, 105, 245, 0.35); 
        }
        .footer-nav-btn.primary:hover { 
          background: #0f56d4; border-color: #0f56d4; 
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
      `}</style>
      </div>
    </div>
  );
}
