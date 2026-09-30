import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import confetti from 'canvas-confetti';
import {
  PhotorealisticStackedTrianglesBridge3D,
  Table3KochSnowflake3D
} from './PatternsInShapes';

const PolygonShape = ({ sides }) => {
  const radius = 65;
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    points.push({
      x: 90 + radius * Math.cos(angle),
      y: 90 + radius * Math.sin(angle)
    });
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <path d={path} fill="none" stroke="#38bdf8" strokeWidth="3.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#f8fafc" />
      ))}
      <text x="90" y="100" fill="#f8fafc" fontSize="28" fontWeight="bold" textAnchor="middle">{sides}</text>
    </svg>
  );
};

const VisualizerPolygons = ({ step, playStep, showHint }) => {
  const maxShapes = Math.min(playStep + 1, 6);
  const shapes = [3, 4, 5, 6, 7, 8];

  return (
    <div style={{ width: '100%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
      {shapes.map((sides, idx) => {
        const isVisible = idx < maxShapes;
        const isUnknown = sides === 8 && step !== 3;
        
        let boxBackground = 'rgba(30, 41, 59, 0.4)';
        let boxBorder = '1.5px solid rgba(148, 163, 184, 0.3)';
        let boxStyle = 'solid';
        
        if (isUnknown) {
          boxBackground = 'transparent';
          boxBorder = '2px dashed #475569';
        }

        return (
          <React.Fragment key={sides}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <div style={{ 
                fontSize: '18px', color: '#cbd5e1', marginBottom: '14px', fontWeight: 'bold', 
                opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease" 
              }}>
                {sides} corners
              </div>
              <div style={{ 
                width: '180px', height: '180px', 
                background: boxBackground, 
                border: boxBorder, 
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isUnknown ? 'none' : 'inset 0 0 20px rgba(56, 189, 248, 0.05)'
              }}>
                 {isUnknown ? (
                   <span style={{ fontSize: '80px', color: '#475569', fontWeight: '900' }}>?</span>
                 ) : (
                   <PolygonShape sides={sides} />
                 )}
              </div>
              <div style={{ fontSize: '52px', color: isUnknown ? '#475569' : '#38bdf8', marginTop: '18px', fontWeight: '900' }}>
                {isUnknown ? '?' : sides}
              </div>
            </motion.div>
            
            {idx < shapes.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: (idx < maxShapes - 1) ? 1 : 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)', visibility: (idx < maxShapes - 1) ? 'visible' : 'hidden', width: '36px' }}
              >
                 <div style={{ 
                   color: '#3b82f6', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px',
                   opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease"
                 }}>
                   +1
                 </div>
                 <svg width="36" height="30" viewBox="0 0 36 30" style={{ overflow: 'visible' }}>
                   <path d="M 0 15 Q 18 -5 36 15" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                 </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const HandshakeShape = ({ people }) => {
  const radius = 65;
  const points = [];
  for (let i = 0; i < people; i++) {
    const angle = (i * 2 * Math.PI) / people - Math.PI / 2;
    points.push({
      x: 90 + radius * Math.cos(angle),
      y: 90 + radius * Math.sin(angle)
    });
  }
  
  const lines = [];
  for (let i = 0; i < people; i++) {
    for (let j = i + 1; j < people; j++) {
      lines.push(
        <line 
          key={`${i}-${j}`} 
          x1={points[i].x} 
          y1={points[i].y} 
          x2={points[j].x} 
          y2={points[j].y} 
          stroke="#4ade80" 
          strokeWidth="2.5"
        />
      );
    }
  }

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {lines}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="6" fill="#38bdf8" />
      ))}
    </svg>
  );
};

const VisualizerHandshakes = ({ step, playStep, showHint }) => {
  const maxShapes = Math.min(playStep + 1, 6);
  const sequence = [2, 3, 4, 5, 6, 7];

  return (
    <div style={{ width: '100%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
      {sequence.map((peopleCount, idx) => {
        const isVisible = idx < maxShapes;
        const isUnknown = peopleCount === 7 && step !== 3;
        const handshakes = (peopleCount * (peopleCount - 1)) / 2;
        
        let boxBackground = 'rgba(30, 41, 59, 0.4)';
        let boxBorder = '1.5px solid rgba(148, 163, 184, 0.3)';
        
        if (isUnknown) {
          boxBackground = 'transparent';
          boxBorder = '2px dashed #475569';
        }

        return (
          <React.Fragment key={peopleCount}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <div style={{ 
                fontSize: '18px', color: '#cbd5e1', marginBottom: '14px', fontWeight: 'bold', 
                opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease" 
              }}>
                {peopleCount} people
              </div>
              <div style={{ 
                width: '180px', height: '180px', 
                background: boxBackground, 
                border: boxBorder, 
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isUnknown ? 'none' : 'inset 0 0 20px rgba(74, 222, 128, 0.05)'
              }}>
                 {isUnknown ? (
                   <span style={{ fontSize: '80px', color: '#475569', fontWeight: '900' }}>?</span>
                 ) : (
                   <HandshakeShape people={peopleCount} />
                 )}
              </div>
              <div style={{ fontSize: '52px', color: isUnknown ? '#475569' : '#4ade80', marginTop: '18px', fontWeight: '900' }}>
                {isUnknown ? '?' : handshakes}
              </div>
            </motion.div>
            
            {idx < sequence.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: (idx < maxShapes - 1) ? 1 : 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)', visibility: (idx < maxShapes - 1) ? 'visible' : 'hidden', width: '36px' }}
              >
                 <div style={{ 
                   color: '#3b82f6', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px',
                   opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease"
                 }}>
                   +{peopleCount}
                 </div>
                 <svg width="36" height="30" viewBox="0 0 36 30" style={{ overflow: 'visible' }}>
                   <path d="M 0 15 Q 18 -5 36 15" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                 </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const SquareShape = ({ n }) => {
  const blockSize = 22;
  const gap = 4;
  const totalSize = n * blockSize + (n - 1) * gap;
  const startXY = (180 - totalSize) / 2;

  const blocks = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const layerIndex = Math.max(r, c);
      const x = startXY + c * (blockSize + gap);
      const y = startXY + r * (blockSize + gap);
      blocks.push(
        <rect 
          key={`${r}-${c}`} 
          x={x} 
          y={y} 
          width={blockSize} 
          height={blockSize} 
          rx="6" 
          fill={`url(#sq-layer-grad-${layerIndex})`} 
        />
      );
    }
  }

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="sq-layer-grad-0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="#16a34a" /></linearGradient>
        <linearGradient id="sq-layer-grad-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fde047" /><stop offset="100%" stopColor="#eab308" /></linearGradient>
        <linearGradient id="sq-layer-grad-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb923c" /><stop offset="100%" stopColor="#ea580c" /></linearGradient>
        <linearGradient id="sq-layer-grad-3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#db2777" /></linearGradient>
        <linearGradient id="sq-layer-grad-4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#9333ea" /></linearGradient>
        <linearGradient id="sq-layer-grad-5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#2563eb" /></linearGradient>
        <filter id="sq-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#sq-shadow)">
        {blocks}
      </g>
    </svg>
  );
};

const TrianglePyramid = ({ rows }) => {
  const side = 26;
  const height = side * 0.866;
  const totalHeight = rows * height;
  const startY = (180 - totalHeight) / 2 + height/2;

  const triangles = [];
  for (let r = 0; r < rows; r++) {
    const numTriangles = 2 * r + 1;
    const rowWidth = (r + 1) * side;
    const startX = 90 - rowWidth / 2;

    for (let c = 0; c < numTriangles; c++) {
      const isUp = c % 2 === 0;
      const xCenter = startX + (c * side) / 2 + side / 2;
      const yTop = startY + r * height - height/2;
      const yBottom = startY + r * height + height/2;
      
      let points = "";
      if (isUp) {
        points = `${xCenter},${yTop} ${xCenter - side/2},${yBottom} ${xCenter + side/2},${yBottom}`;
      } else {
        points = `${xCenter - side/2},${yTop} ${xCenter + side/2},${yTop} ${xCenter},${yBottom}`;
      }

      triangles.push(
        <polygon 
          key={`${r}-${c}`} 
          points={points} 
          fill={`url(#tri-layer-grad-${r})`} 
          stroke="rgba(30, 41, 59, 1)" 
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      );
    }
  }

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="tri-layer-grad-0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="#16a34a" /></linearGradient>
        <linearGradient id="tri-layer-grad-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fde047" /><stop offset="100%" stopColor="#eab308" /></linearGradient>
        <linearGradient id="tri-layer-grad-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb923c" /><stop offset="100%" stopColor="#ea580c" /></linearGradient>
        <linearGradient id="tri-layer-grad-3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#db2777" /></linearGradient>
        <linearGradient id="tri-layer-grad-4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#9333ea" /></linearGradient>
        <linearGradient id="tri-layer-grad-5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#2563eb" /></linearGradient>
        <filter id="tri-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#tri-shadow)">
        {triangles}
      </g>
    </svg>
  );
};

const VisualizerBlocks = ({ step, playStep, showHint }) => {
  const maxShapes = Math.min(playStep + 1, 6);
  const sequence = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{ width: '100%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
      {sequence.map((n, idx) => {
        const isVisible = idx < maxShapes;
        const isUnknown = n === 6 && step !== 3;
        const squares = n * n;
        
        let boxBackground = 'rgba(30, 41, 59, 0.4)';
        let boxBorder = '1.5px solid rgba(148, 163, 184, 0.3)';
        
        if (isUnknown) {
          boxBackground = 'transparent';
          boxBorder = '2px dashed #475569';
        }

        return (
          <React.Fragment key={n}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <div style={{ 
                fontSize: '18px', color: '#cbd5e1', marginBottom: '14px', fontWeight: 'bold', 
                opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease" 
              }}>
                {n} × {n}
              </div>
              <div style={{ 
                width: '180px', height: '180px', 
                background: boxBackground, 
                border: boxBorder, 
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isUnknown ? 'none' : 'inset 0 0 20px rgba(234, 179, 8, 0.05)'
              }}>
                 {isUnknown ? (
                   <span style={{ fontSize: '80px', color: '#475569', fontWeight: '900' }}>?</span>
                 ) : (
                   <SquareShape n={n} />
                 )}
              </div>
              <div style={{ fontSize: '52px', color: isUnknown ? '#475569' : '#fcd34d', marginTop: '18px', fontWeight: '900' }}>
                {isUnknown ? '?' : squares}
              </div>
            </motion.div>
            
            {idx < sequence.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: (idx < maxShapes - 1) ? 1 : 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)', visibility: (idx < maxShapes - 1) ? 'visible' : 'hidden', width: '36px' }}
              >
                 <div style={{ 
                   color: '#fcd34d', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px',
                   opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease"
                 }}>
                   +{2 * n + 1}
                 </div>
                 <svg width="36" height="30" viewBox="0 0 36 30" style={{ overflow: 'visible' }}>
                   <path d="M 0 15 Q 18 -5 36 15" fill="none" stroke="#fcd34d" strokeWidth="2.5" />
                 </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const VisualizerTriangles = ({ step, playStep, showHint }) => {
  const maxShapes = Math.min(playStep + 1, 6);
  const sequence = [1, 2, 3, 4, 5, 6];

  const getTopText = (n) => {
    if (n === 1) return '1';
    let text = '1';
    for (let i = 2; i <= n; i++) {
      text += ` + ${2*i - 1}`;
    }
    return text;
  };

  return (
    <div style={{ width: '100%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
      {sequence.map((n, idx) => {
        const isVisible = idx < maxShapes;
        const isUnknown = n === 6 && step !== 3;
        const squares = n * n;
        
        let boxBackground = 'rgba(30, 41, 59, 0.4)';
        let boxBorder = '1.5px solid rgba(148, 163, 184, 0.3)';
        
        if (isUnknown) {
          boxBackground = 'transparent';
          boxBorder = '2px dashed #475569';
        }

        return (
          <React.Fragment key={n}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <div style={{ 
                fontSize: '13px', color: '#cbd5e1', marginBottom: '14px', fontWeight: 'bold', 
                opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease", whiteSpace: 'nowrap'
              }}>
                {getTopText(n)}
              </div>
              <div style={{ 
                width: '180px', height: '180px', 
                background: boxBackground, 
                border: boxBorder, 
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isUnknown ? 'none' : 'inset 0 0 20px rgba(134, 239, 172, 0.05)'
              }}>
                 {isUnknown ? (
                   <span style={{ fontSize: '80px', color: '#475569', fontWeight: '900' }}>?</span>
                 ) : (
                   <TrianglePyramid rows={n} />
                 )}
              </div>
              <div style={{ fontSize: '52px', color: isUnknown ? '#475569' : '#86efac', marginTop: '18px', fontWeight: '900' }}>
                {isUnknown ? '?' : squares}
              </div>
            </motion.div>
            
            {idx < sequence.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: (idx < maxShapes - 1) ? 1 : 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)', visibility: (idx < maxShapes - 1) ? 'visible' : 'hidden', width: '36px' }}
              >
                 <div style={{ 
                   color: '#fcd34d', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px',
                   opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease"
                 }}>
                   +{2 * n + 1}
                 </div>
                 <svg width="36" height="30" viewBox="0 0 36 30" style={{ overflow: 'visible' }}>
                   <path d="M 0 15 Q 18 -5 36 15" fill="none" stroke="#fcd34d" strokeWidth="2.5" />
                 </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

function getKochCurve(p1, p2, depth) {
  if (depth === 0) return [p1, p2];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  
  const pA = { x: p1.x + dx/3, y: p1.y + dy/3 };
  const pC = { x: p1.x + 2*dx/3, y: p1.y + 2*dy/3 };
  
  const angle = Math.PI / 3;
  const vX = pC.x - pA.x;
  const vY = pC.y - pA.y;
  
  const pB = {
    x: pA.x + vX * Math.cos(-angle) - vY * Math.sin(-angle),
    y: pA.y + vX * Math.sin(-angle) + vY * Math.cos(-angle)
  };
  
  return [
    ...getKochCurve(p1, pA, depth - 1),
    ...getKochCurve(pA, pB, depth - 1).slice(1),
    ...getKochCurve(pB, pC, depth - 1).slice(1),
    ...getKochCurve(pC, p2, depth - 1).slice(1)
  ];
}

const KochSnowflakeShape = ({ depth, segments }) => {
  const side = 110;
  const R = side * Math.sqrt(3) / 3;
  const cx = 90, cy = 94; // Centered vertically, slight push down to balance
  
  const p1 = { x: cx, y: cy - R };
  const p2 = { x: cx + side/2, y: cy + R/2 };
  const p3 = { x: cx - side/2, y: cy + R/2 };
  
  let pts = [];
  if (depth === 0) {
    pts = [p1, p2, p3, p1];
  } else {
    const s1 = getKochCurve(p1, p2, depth);
    const s2 = getKochCurve(p2, p3, depth);
    const s3 = getKochCurve(p3, p1, depth);
    pts = [...s1, ...s2.slice(1), ...s3.slice(1)];
  }
  
  const d = "M " + pts.map(p => `${p.x} ${p.y}`).join(" L ");

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ overflow: 'visible' }}>
      <path d={d} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinejoin="round" />
      <text x={cx} y={cy} dominantBaseline="central" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="bold">
        {segments}
      </text>
    </svg>
  );
};

const VisualizerKoch = ({ step, playStep, showHint }) => {
  const maxShapes = Math.min(playStep + 1, 5);
  const sequence = [0, 1, 2, 3, 4]; 

  return (
    <div style={{ width: '100%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
      {sequence.map((n, idx) => {
        const isVisible = idx < maxShapes;
        const isUnknown = n === 4 && step !== 3;
        const segments = 3 * Math.pow(4, n);
        
        let boxBackground = 'rgba(30, 41, 59, 0.4)';
        let boxBorder = '1.5px solid rgba(148, 163, 184, 0.3)';
        
        if (isUnknown) {
          boxBackground = 'transparent';
          boxBorder = '2px dashed #475569';
        }

        return (
          <React.Fragment key={n}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: isVisible ? 'visible' : 'hidden' }}
            >
              <div style={{ 
                fontSize: '13px', color: '#cbd5e1', marginBottom: '14px', fontWeight: 'bold', 
                opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease", whiteSpace: 'nowrap'
              }}>
                3 × 4<sup style={{fontSize: '9px'}}>{n}</sup>
              </div>
              <div style={{ 
                width: '180px', height: '180px', 
                background: boxBackground, 
                border: boxBorder, 
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isUnknown ? 'none' : 'inset 0 0 20px rgba(168, 85, 247, 0.05)'
              }}>
                 {isUnknown ? (
                   <span style={{ fontSize: '80px', color: '#475569', fontWeight: '900' }}>?</span>
                 ) : (
                   <KochSnowflakeShape depth={n} segments={segments} />
                 )}
              </div>
              <div style={{ fontSize: '52px', color: isUnknown ? '#475569' : '#a855f7', marginTop: '18px', fontWeight: '900' }}>
                {isUnknown ? '?' : segments}
              </div>
            </motion.div>
            
            {idx < sequence.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: (idx < maxShapes - 1) ? 1 : 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-20px)', visibility: (idx < maxShapes - 1) ? 'visible' : 'hidden', width: '36px' }}
              >
                 <div style={{ 
                   color: '#fcd34d', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px',
                   opacity: (showHint || step === 3) ? 1 : 0, transition: "opacity 0.4s ease"
                 }}>
                   ×4
                 </div>
                 <svg width="36" height="30" viewBox="0 0 36 30" style={{ overflow: 'visible' }}>
                   <path d="M 0 15 Q 18 -5 36 15" fill="none" stroke="#fcd34d" strokeWidth="2.5" />
                 </svg>
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const CONCEPTS = [
  { 
    id: 1, 
    title: 'Regular Polygons', 
    subtitle: 'Sides equal Vertices', 
    watchQuestion: 'How are the sides and corners related?',
    watchDesc: 'Count the sides and the corners. What do you notice?', 
    watchAnswer: 'Every corner connects two sides.', 
    question: 'How many corners does an 8-sided octagon have?', 
    seqList: '3 sides → 3 corners, 4 sides → 4 corners...', 
    options: [6, 8, 10], 
    correctOption: 8, 
    discoveredTitle: 'Corners = Sides.', 
    discoveredDesc: 'In any simple polygon, the number of sides is always exactly the same as the number of corners.', 
    nextTitle: 'Handshake Network', 
    Visualizer: VisualizerPolygons 
  },
  { 
    id: 2, 
    title: 'The Handshake Network', 
    subtitle: 'Handshakes & Triangular Numbers', 
    watchQuestion: 'How does the number of handshakes grow?',
    watchDesc: 'If everyone shakes hands once, how many handshakes happen?', 
    watchAnswer: 'It builds up as a triangular number.', 
    question: 'If 7 people shake hands, how many handshakes in total?', 
    seqList: '1, 3, 6, 10, 15, ?', 
    options: [15, 21, 28], 
    correctOption: 21, 
    discoveredTitle: 'Handshakes follow Triangular Numbers.', 
    discoveredDesc: 'With 7 people, there are 21 handshakes. In general, N people means N(N-1)/2 handshakes.', 
    nextTitle: 'Stacking Wooden Blocks', 
    Visualizer: VisualizerHandshakes 
  },
  { 
    id: 3, 
    title: 'Stacking Wooden Blocks', 
    subtitle: 'Sum of Odd Numbers = Square', 
    watchQuestion: 'What shape do the stacked blocks form?',
    watchDesc: 'Watch how L-shaped layers stack together.', 
    watchAnswer: 'Each layer is the next odd number. Together they make a square!', 
    question: 'What is the sum of the first 6 odd numbers (1+3+5+7+9+11)?', 
    seqList: '1, 4, 9, 16, 25, ?', 
    options: [30, 36, 42], 
    correctOption: 36, 
    discoveredTitle: 'Odd numbers sum to squares.', 
    discoveredDesc: 'The 6th square is 36. The sum of the first N odd numbers is always N².', 
    nextTitle: 'Little triangles → squares', 
    Visualizer: VisualizerBlocks 
  },
  { 
    id: 4, 
    title: 'Little triangles → squares', 
    subtitle: 'Odd rows add up to a square.', 
    watchQuestion: 'How many triangles are in each new row?',
    watchDesc: 'Count the triangles in the bottom row as the pyramid grows.', 
    watchAnswer: 'The rows contain 1, 3, 5, 7, 9... odd numbers again!', 
    question: 'How many total little triangles are in a pyramid with 6 rows?', 
    seqList: '1+3+5+7+9+11 = ?', 
    options: [30, 36, 42], 
    correctOption: 36, 
    discoveredTitle: '1 + 3 + 5 + 7 + 9 + 11 = 36 little triangles.', 
    discoveredDesc: 'Adding the first N odd numbers gives N², so the totals are 1, 4, 9, 16, 25, 36... — square numbers again.', 
    nextTitle: 'Koch Snowflake', 
    Visualizer: VisualizerTriangles 
  },
  { 
    id: 5, 
    title: 'Koch Snowflake', 
    subtitle: 'Multiply by 4 each Iteration', 
    watchQuestion: 'How do the line segments split?',
    watchDesc: 'Every straight line splits into 4 smaller lines.', 
    watchAnswer: 'The number of lines multiplies by 4 every single time.', 
    question: 'If iteration 3 has 192 lines, how many lines in iteration 4?', 
    seqList: '3, 12, 48, 192, ?', 
    options: [512, 768, 1024], 
    correctOption: 768, 
    discoveredTitle: '192 × 4 = 768 segments.', 
    discoveredDesc: 'Every segment becomes 4 segments, so the count multiplies by 4 each step: 3, 12, 48, 192, 768, ... That is 3 times the powers of 4 — a sequence not shown in Table 1.', 
    nextTitle: 'Finish', 
    Visualizer: VisualizerKoch 
  }
];

export default function ShapesToNumbers({ onNext }) {
  const [conceptIdx, setConceptIdx] = useState(0); 
  const [tab, setTab] = useState('watch');
  const [step, setStep] = useState(1); 
  const [playStep, setPlayStep] = useState(0); 
  const [playing, setPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const concept = CONCEPTS[conceptIdx];
  const Visualizer = concept?.Visualizer || VisualizerPolygons;

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
      }, 1500);
    }
    return () => clearInterval(int);
  }, [playing]);

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    if (opt === concept.correctOption) {
      setStep(3);
      setShowConfetti(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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
        
        <div className="glass-container">
          {/* Header Area */}
          <div className="content-header">
            <div>
              <div className="concept-meta">
                SHAPES TO NUMBERS &nbsp;•&nbsp; <span style={{color: '#4ade80'}}>1.6 &nbsp;•&nbsp; CONCEPT {String(conceptIdx+1).padStart(2, '0')} / {CONCEPTS.length}</span>
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
                    <div className="find-title">OBSERVE THE BRIDGE</div>
                    <div className="find-question" style={{fontSize: '32px', marginBottom: '8px'}}>{concept.watchQuestion}</div>
                    <div className="watch-desc-inline" style={{marginBottom: '12px', fontSize: '22px'}}>{concept.watchDesc}</div>
                    <button className="ready-btn" onClick={() => { setTab('find'); setPlayStep(5); }}>I'm ready. Let me try &rarr;</button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="watch-desc-inline" style={{textAlign: 'left'}}>
                    {concept.watchDesc}
                    <div style={{float: 'right', fontSize: '14px', color: '#64748b'}}>Final Stage</div>
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
          color: #f8fafc; background: #0f172a;
        }

        .bg-image {
          position: absolute; inset: 0; z-index: -2;
          background-image: url('https://images.unsplash.com/photo-1532782356570-5b581b0a5196?q=80&w=2560&auto=format&fit=crop'); 
          background-size: cover; background-position: center;
        }
        
        .bg-overlay {
          position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.95) 100%);
        }

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

        .visualization-area { width: 100%; display: flex; justify-content: center; padding: 12px 0; }
        .seq-svg { width: 100%; max-height: 380px; overflow: visible; }

        .below-visualizer { padding: 0 40px 20px 40px; }
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
        
        @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(0); } }

        .success-inline { background: rgba(16, 35, 30, 0.8); border: 1px solid rgba(74, 222, 128, 0.3); border-radius: 12px; padding: 20px 32px; }
        .success-header { display: flex; align-items: center; gap: 8px; color: #4ade80; font-size: 15px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
        .success-title { font-size: 26px; font-weight: 700; color: #f8fafc; margin-bottom: 4px; }
        .success-desc { font-size: 18px; color: #cbd5e1; line-height: 1.5; font-weight: 500; }

        .bottom-floating-footer {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 40px;
          display: flex; justify-content: space-between;
          background: linear-gradient(0deg, rgba(2,6,23,0.9) 0%, transparent 100%);
          z-index: 50;
        }
        .footer-nav-btn {
          background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2);
          padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s; backdrop-filter: blur(8px);
        }
        .footer-nav-btn:hover { background: rgba(255,255,255,0.15); }
        .footer-nav-btn.primary { background: #3b82f6; border-color: #60a5fa; box-shadow: 0 4px 20px rgba(59,130,246,0.4); }
        .footer-nav-btn.primary:hover { background: #2563eb; }
      `}</style>
    </div>
  );
}
