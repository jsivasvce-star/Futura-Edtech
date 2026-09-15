import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, CheckCircle2, ArrowRight, Award, Map } from 'lucide-react';
import { ALL_SYMBOLS, SYMBOL_GROUPS, SymbolDisplay } from './symbolData';
import ChapterBackFooter from '../ChapterBackFooter';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Ignore audio errors
  }
};

export default function MapSymbols({ onComplete, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [traySymbols, setTraySymbols] = useState([]);
  const [matched, setMatched] = useState({});
  const [connections, setConnections] = useState([]);
  const [drawingLine, setDrawingLine] = useState(null);
  const [errorHighlight, setErrorHighlight] = useState(null);
  const [mainPage, setMainPage] = useState(1);
  const [, setRenderCount] = useState(0);

  const containerRef = React.useRef(null);
  const dotsRef = React.useRef({});

  useEffect(() => {
    const selectedIds = ['railway', 'road', 'river', 'lake', 'forest', 'hospital'];
    const selectedSymbols = ALL_SYMBOLS.filter(s => selectedIds.includes(s.id));
    setQuestions(selectedSymbols);
    
    // Set a constant layout for the right-side symbols: Hospital, Lake, Railway, Forest, Road, River
    const constantTrayIds = ['hospital', 'lake', 'railway', 'forest', 'road', 'river'];
    const constantTraySymbols = constantTrayIds.map(id => ALL_SYMBOLS.find(s => s.id === id));
    setTraySymbols(constantTraySymbols);
    
    setMatched({});
  }, []);

  useEffect(() => {
    // Force a re-render on resize to recalculate line coordinates
    const handleResize = () => setRenderCount(c => c + 1);
    window.addEventListener('resize', handleResize);
    // Also force a render shortly after mount just in case fonts loaded and shifted layout
    setTimeout(handleResize, 100);
    setTimeout(handleResize, 500);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const executeMatch = React.useCallback((leftId, rightId) => {
    if (leftId === rightId) {
      playSound('success');
      setMatched(prev => ({ ...prev, [leftId]: true }));
      setConnections(prev => [...prev, { leftId, rightId, status: 'correct', id: Date.now() }]);
    } else {
      playSound('error');
      setErrorHighlight(leftId);
      const newConn = { leftId, rightId, status: 'error', id: Date.now() };
      setConnections(prev => [...prev, newConn]);
      setTimeout(() => {
        setConnections(prev => prev.filter(c => c.id !== newConn.id));
        setErrorHighlight(null);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (!drawingLine) return;
    
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      setDrawingLine(prev => prev ? {
        ...prev,
        currentX: e.clientX - containerRect.left,
        currentY: e.clientY - containerRect.top
      } : null);
    };
    
    const handlePointerUp = () => {
      if (!drawingLine) return;
      let closestDot = null;
      let minDistance = 150; // Increased snap distance to cover the whole card
      
      Object.values(dotsRef.current).forEach((data) => {
        if (!data || !data.element || data.type === drawingLine.startType) return;
        const rect = data.element.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const dotX = rect.left + rect.width / 2 - containerRect.left;
        const dotY = rect.top + rect.height / 2 - containerRect.top;
        const dist = Math.hypot(dotX - drawingLine.currentX, dotY - drawingLine.currentY);
        if (dist < minDistance) {
          minDistance = dist;
          closestDot = data.id;
        }
      });
      
      if (closestDot) {
        const leftId = drawingLine.startType === 'left' ? drawingLine.startId : closestDot;
        const rightId = drawingLine.startType === 'right' ? drawingLine.startId : closestDot;
        executeMatch(leftId, rightId);
      }
      setDrawingLine(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [drawingLine, executeMatch]);

  const handlePointerDown = (e, id, type) => {
    const isAlreadyConnected = connections.some(c => c.status === 'correct' && (c.leftId === id || c.rightId === id));
    if (isAlreadyConnected || !containerRef.current) return;

    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);

    const rect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - containerRect.left;
    const y = rect.top + rect.height / 2 - containerRect.top;
    
    setDrawingLine({ startId: id, startType: type, startX: x, startY: y, currentX: x, currentY: y });
  };

  const setDotRef = (id, type, el) => {
    if (el) {
      dotsRef.current[`${type}-${id}`] = { id, type, element: el };
    } else {
      delete dotsRef.current[`${type}-${id}`];
    }
  };

  const getDotCoords = (id, type) => {
    const data = dotsRef.current[`${type}-${id}`];
    if (!data || !data.element || !containerRef.current) return null;
    const rect = data.element.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top
    };
  };

  const correctCount = Object.keys(matched).length;
  const isComplete = questions.length > 0 && correctCount === questions.length;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', overflow: 'hidden', fontFamily: '"Space Grotesk", sans-serif' }}>
            {mainPage === 1 && (
        <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '10px 14px', overflow: 'hidden' }}>
          {/* LEFT PANEL: Textbook Content — Light Orange Parchment Card */}
        <div style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          height: '100%',
          background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
          border: '2px solid #F2DFBC',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(60,40,20,0.06)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(12px, 1.6vw, 18px)',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          
          {/* Header */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'inline-block', fontSize: '14.3px', fontWeight: 800, color: '#92400E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px', background: '#FEF3C7', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: '6px' }}>
              CHAPTER 1 • SYMBOLS
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', color: '#78350F', margin: '2px 0 3px 0', fontFamily: '"Fraunces", serif', fontWeight: 900, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Map size={36} color="#D97706" style={{ flexShrink: 0 }} />
              Understanding Map Symbols
            </h1>
            <p style={{ color: '#3D2E24', fontSize: '20px', fontStyle: 'italic', margin: '0 0 8px 0', fontWeight: 600 }}>
              Small drawings and shapes that represent real places on Earth.
            </p>
          </div>

                    {/* Main Content Viewport */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
            {/* What are Symbols? */}
            <div style={{background: '#FFFFFF', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #F2DFBC', boxShadow: '0 2px 6px rgba(60,40,20,0.03)', flexShrink: 0}}>
              <h2 style={{fontSize: '1.8rem', color: '#92400E', margin: '0 0 6px 0', fontFamily: '"Fraunces", serif', fontWeight: 900}}>What are Symbols?</h2>
              <p style={{color: '#3D2E24', fontSize: '19px', lineHeight: 1.5, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word'}}>
                Real places are too big to draw on a map. Instead of drawing real buildings, roads, and rivers, we use simple symbols to make maps easy to read.
              </p>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1, minHeight: 0}}>
              {/* Left Column Table */}
              <div style={{background: '#FFFFFF', border: '1.5px solid #F2DFBC', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <div style={{ display: 'flex', background: '#FEF3C7', padding: '8px 14px', fontWeight: 900, color: '#78350F', borderBottom: '1.5px solid #F2DFBC', fontSize: '16.9px' }}>
                    <div style={{ flex: 1 }}>Feature</div>
                    <div style={{ width: '32px', textAlign: 'center' }}>→</div>
                    <div style={{ flex: 1 }}>Symbol</div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Curved river line</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'river')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#1E40AF', fontWeight: 900}}>River</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Hospital building</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'hospital')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#991B1B', fontWeight: 900}}>Hospital</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Thick forest trees</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'forest')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#166534', fontWeight: 900}}>Forest</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Body of still water</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'lake')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#2563EB', fontWeight: 900}}>Lake</span>
                    </div>
                  </div>
              </div>
              
              {/* Right Column Table */}
              <div style={{background: '#FFFFFF', border: '1.5px solid #F2DFBC', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  <div style={{ display: 'flex', background: '#FEF3C7', padding: '8px 14px', fontWeight: 900, color: '#78350F', borderBottom: '1.5px solid #F2DFBC', fontSize: '16.9px' }}>
                    <div style={{ flex: 1 }}>Feature</div>
                    <div style={{ width: '32px', textAlign: 'center' }}>→</div>
                    <div style={{ flex: 1 }}>Symbol</div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Metal tracks with sleepers</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'railway')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#3D2E24', fontWeight: 900}}>Railway Line</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Paved path for vehicles</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'road')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#52525B', fontWeight: 900}}>Road</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', borderBottom: '1px solid #F2DFBC', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Major connecting road</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'nh')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#4A044E', fontWeight: 900}}>National Highway</span>
                    </div>
                  </div>
                  <div style={{display: 'flex', padding: '6px 14px', alignItems: 'center'}}>
                    <div style={{flex: 1, color: '#3D2E24', fontSize: '17.6px', fontWeight: 700}}>Place for airplanes</div>
                    <div style={{width: '32px', textAlign: 'center', color: '#B45309', fontWeight: 900, fontSize: '18.2px'}}>→</div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <SymbolDisplay Icon={ALL_SYMBOLS.find(s => s.id === 'airport')?.Icon} width={80} height={45} />
                      <span style={{fontSize: '18.2px', color: '#1E3A8A', fontWeight: 900}}>Airport</span>
                    </div>
                  </div>
              </div>
            </div>

            {/* Remember */}
            <div style={{background: '#FEF3C7', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0}}>
              <Lightbulb size={28} color="#D97706" style={{flexShrink: 0}} />
              <p style={{color: '#78350F', margin: 0, fontSize: '19px', lineHeight: 1.45, fontWeight: 700, textAlign: 'justify', textJustify: 'inter-word'}}>
                <strong style={{fontSize: '20px', fontWeight: 900}}>Remember:</strong> Standard symbols and colors help everyone around the world read maps easily.
              </p>
            </div>
          </div>

        </div>
        </div>
      )}

      {mainPage === 2 && (
        <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '10px 14px', overflow: 'hidden' }}>
          {/* RIGHT PANEL: Interactive Match Activity */}
        <div style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          height: '100%',
          background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
          border: '2px solid #F2DFBC',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(60,40,20,0.06)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(12px, 1.6vw, 18px)',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px', flexShrink: 0 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.49rem, 2.1vw, 1.76rem)', color: '#78350F', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Fraunces", serif', fontWeight: 900 }}>
                <Map size={18} color="#D97706" /> Match the Symbols
              </h2>
              <p style={{ margin: '2px 0 0 0', color: '#3D2E24', fontSize: '15.6px', fontWeight: 600 }}>
                Drag or click a symbol to place it in the matching box.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: '#FFF9F0', borderRadius: '999px', border: '1.5px solid #F2DFBC', flexShrink: 0 }}>
              <Award size={15} color={isComplete ? '#16A34A' : '#D97706'} />
              <span style={{ fontSize: '15.6px', fontWeight: 900, color: '#78350F' }}>
                {correctCount} / {questions.length}
              </span>
            </div>
          </div>

              <div ref={containerRef} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'row', gap: '12px', position: 'relative' }}>
                
                {/* SVG Overlay */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10, overflow: 'visible' }}>
                  {connections.map(conn => {
                    const leftCoords = getDotCoords(conn.leftId, 'left');
                    const rightCoords = getDotCoords(conn.rightId, 'right');
                    if (!leftCoords || !rightCoords) return null;
                    return (
                      <motion.line
                        key={conn.id}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        x1={leftCoords.x}
                        y1={leftCoords.y}
                        x2={rightCoords.x}
                        y2={rightCoords.y}
                        stroke={conn.status === 'correct' ? '#16A34A' : '#EF4444'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        style={conn.status === 'error' ? { transformOrigin: 'center' } : {}}
                      />
                    );
                  })}
                  {drawingLine && (
                    <line
                      x1={drawingLine.startX}
                      y1={drawingLine.startY}
                      x2={drawingLine.currentX}
                      y2={drawingLine.currentY}
                      stroke="#D97706"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="8 8"
                    />
                  )}
                </svg>

                {/* Left 6 Matching Target Boxes (Equal 50% Width) */}
                <div style={{ flex: 1, minWidth: 0, background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '14px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 3px 12px rgba(146, 64, 14, 0.05)' }}>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '14.3px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#92400E', fontWeight: 900, textAlign: 'center', flexShrink: 0 }}>
                    Target Boxes
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#B45309', marginTop: '2px', textTransform: 'none' }}>(Draw lines from here)</div>
                  </div>

                  <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridTemplateRows: 'repeat(3, 1fr)', gap: '8px' }}>
                  {questions.map((q) => {
                    const isMatched = matched[q.id];
                    const isError = errorHighlight === q.id;

                    return (
                      <motion.div
                        key={q.id}
                        animate={isError ? { x: [-4, 4, -4, 4, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'relative',
                          background: isMatched ? '#DCFCE7' : isError ? '#FEE2E2' : '#FFFFFF',
                          border: `1.5px ${isMatched ? 'solid #16A34A' : isError ? 'solid #EF4444' : 'solid #E2D2B8'}`,
                          borderRadius: '12px',
                          padding: '6px 8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          transition: 'all 0.2s',
                          boxShadow: isMatched ? '0 3px 8px rgba(22,163,74,0.12)' : '0 1px 4px rgba(60,40,20,0.03)'
                        }}
                      >
                        <div style={{ fontSize: '15.6px', fontWeight: 900, color: isMatched ? '#166534' : '#78350F', textAlign: 'center', lineHeight: 1.2 }}>
                          {q.name}
                        </div>

                        {/* Connection Dot */}
                        <div
                          ref={el => setDotRef(q.id, 'left', el)}
                          onPointerDown={(e) => handlePointerDown(e, q.id, 'left')}
                          style={{
                            position: 'absolute',
                            right: '-11px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '18px',
                            height: '18px',
                            backgroundColor: isMatched ? '#16A34A' : '#D97706',
                            border: '3px solid #FFF9F0',
                            borderRadius: '50%',
                            cursor: 'crosshair',
                            zIndex: 20,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            touchAction: 'none'
                          }}
                        />

                        {isMatched && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#166534', marginTop: '4px' }}>
                            <CheckCircle2 size={14} color="#16A34A" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  </div>
                </div>

                {/* Right 6 Available Symbols Tray (Equal 50% Width) */}
                <div style={{ flex: 1, minWidth: 0, background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '14px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 3px 12px rgba(146, 64, 14, 0.05)' }}>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '14.3px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#92400E', fontWeight: 900, textAlign: 'center', flexShrink: 0 }}>
                    Available Symbols
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#B45309', marginTop: '2px', textTransform: 'none' }}>(Connect symbols to boxes)</div>
                  </div>

                  <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '8px' }}>
                    <AnimatePresence>
                      {traySymbols.map((symbol) => {
                        const isMatched = connections.some(c => c.status === 'correct' && c.rightId === symbol.id);

                        return (
                          <motion.div
                            key={symbol.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            style={{
                              position: 'relative',
                              background: '#FFFFFF',
                              padding: '6px 8px',
                              borderRadius: '12px',
                              border: `2px solid ${isMatched ? '#16A34A' : '#F2DFBC'}`,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: isMatched ? '0 0 0 2.5px rgba(22,163,74,0.3)' : '0 2px 6px rgba(60,40,20,0.04)',
                              transition: 'all 0.15s'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <SymbolDisplay Icon={symbol.Icon} width={90} height={45} />
                            
                            {/* Connection Dot */}
                            <div
                              ref={el => setDotRef(symbol.id, 'right', el)}
                              onPointerDown={(e) => handlePointerDown(e, symbol.id, 'right')}
                              style={{
                                position: 'absolute',
                                left: '-11px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '18px',
                                height: '18px',
                                backgroundColor: isMatched ? '#16A34A' : '#D97706',
                                border: '3px solid #FFF9F0',
                                borderRadius: '50%',
                                cursor: 'crosshair',
                                zIndex: 20,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                touchAction: 'none'
                              }}
                            />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

              </div>

        </div>
        </div>
      )}
      <ChapterBackFooter
        onBack={mainPage === 1 ? onBack : () => setMainPage(1)}
        nextLabel={mainPage === 1 ? 'Continue to Activity' : 'Next Activity'}
        onNext={mainPage === 1 ? () => setMainPage(2) : onComplete}
        nextVariant={mainPage === 1 ? 'blue' : 'green'}
      />
    </div>
  );
}
