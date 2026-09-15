import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, Play, Pause, RefreshCw, Layers, Compass, Cpu, Gauge, Vote, Clock, Award } from 'lucide-react';

import imgCooking from '../../../../assets/figure_it_out/math_cooking.jpg';
import imgBuilding from '../../../../assets/figure_it_out/math_building.jpg';
import imgTransport from '../../../../assets/figure_it_out/math_transport.jpg';
import imgTechnology from '../../../../assets/figure_it_out/math_technology.jpg';
import imgWeather from '../../../../assets/figure_it_out/math_weather.jpg';
import imgSports from '../../../../assets/figure_it_out/math_sports.jpg';

// Question 1 Data
const CARDS = [
  { id: 'cooking', label: 'Cooking', img: imgCooking, exp: 'Measuring ingredients, ratios, and baking times all rely on math!' },
  { id: 'building', label: 'Building', img: imgBuilding, exp: 'Geometry ensures structures are stable, straight, and safe.' },
  { id: 'transport', label: 'Transport', img: imgTransport, exp: 'Calculating speed, distance, and routes uses formulas.' },
  { id: 'technology', label: 'Technology', img: imgTechnology, exp: 'Computers use binary code (0s and 1s) to process everything.' },
  { id: 'weather', label: 'Weather', img: imgWeather, exp: 'Meteorologists use probability and data models to predict rain.' },
  { id: 'sports', label: 'Sports', img: imgSports, exp: 'Scores, statistics, angles of a throw, and field dimensions.' }
];

// Question 2 Discovery Areas
const DISCOVERY_AREAS = [
  {
    id: 'science',
    title: 'Scientific Experiments',
    icon: '🔬',
    tag: 'Measurement & Data',
    brief: 'Measuring quantities, recording observations, and discovering patterns.',
    color: '#0891b2',
    bgGradient: 'linear-gradient(135deg, #083344 0%, #0e7490 100%)'
  },
  {
    id: 'buildings',
    title: 'Bridges & Buildings',
    icon: '🏗️',
    tag: 'Geometry & Angles',
    brief: 'Triangles, dimensions, and angles for strong structural stability.',
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #451a03 0%, #b45309 100%)'
  },
  {
    id: 'technology',
    title: 'Technology',
    icon: '📱',
    tag: 'Binary & Computing',
    brief: 'Circuits, pixel coordinates, and binary numbers driving digital devices.',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #2e1065 0%, #6d28d9 100%)'
  },
  {
    id: 'transport',
    title: 'Transport Progression',
    icon: '🚲',
    tag: 'Speed & Rotation',
    brief: 'Bicycle → Train → Car → Airplane: rotations, speed, and aerodynamics.',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #022c22 0%, #047857 100%)'
  },
  {
    id: 'economy',
    title: 'Economy & Democracy',
    icon: '💰',
    tag: 'Counting & Representation',
    brief: 'Counting currency, trade quantities, tallying votes, and bar charts.',
    color: '#be185d',
    bgGradient: 'linear-gradient(135deg, #500724 0%, #be185d 100%)'
  },
  {
    id: 'clocks',
    title: 'Calendars & Clocks',
    icon: '🗓️',
    tag: 'Cycles & Timekeeping',
    brief: 'Counting repeating cycles of 60 minutes, 24 hours, and 365 days.',
    color: '#1d4ed8',
    bgGradient: 'linear-gradient(135deg, #172554 0%, #1d4ed8 100%)'
  }
];

export default function FigureItOutExperience() {
  const [q1Active, setQ1Active] = useState(false); // Default to Q2 to match user's direct request
  
  // Q1 State
  const [droppedCards, setDroppedCards] = useState([]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [lastDropped, setLastDropped] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Q2 State
  const [q2View, setQ2View] = useState('hub'); // 'hub' | area.id | 'finale'
  const [exploredAreas, setExploredAreas] = useState(new Set());

  // Interactive Mini-Simulation States
  // 1. Science Experiment
  const [scienceVolume, setScienceVolume] = useState(25);
  const [scienceTrials, setScienceTrials] = useState([
    { trial: 1, vol: 25, mass: 50, ratio: 2.0 }
  ]);
  const [scienceMeasuring, setScienceMeasuring] = useState(false);

  // 2. Bridges & Buildings
  const [bridgeStep, setBridgeStep] = useState(1); // 1: Blueprint, 2: Truss Triangles, 3: Traffic Load
  const [trussLoadTesting, setTrussLoadTesting] = useState(false);

  // 3. Technology
  const [binaryBits, setBinaryBits] = useState([1, 0, 1, 1, 0, 1]);
  const [techMode, setTechMode] = useState('pixels'); // 'pixels' | 'circuit'

  // 4. Transport Progression State & Auto-Play
  const [selectedVehicle, setSelectedVehicle] = useState(0); // 0: Bike, 1: Train, 2: Car, 3: Airplane
  const [isTransportPlaying, setIsTransportPlaying] = useState(true);
  const [transportProgress, setTransportProgress] = useState(0);

  // Auto-play progression: Bicycle -> Train -> Car -> Airplane
  useEffect(() => {
    if (q2View !== 'transport' || !isTransportPlaying) return;

    const stepMs = 80;
    const stageDurationMs = 4500; // 4.5s per vehicle stage
    const increment = (stepMs / stageDurationMs) * 100;

    const timer = setInterval(() => {
      setTransportProgress((prev) => {
        if (prev >= 100) {
          setSelectedVehicle((v) => (v + 1) % 4);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [q2View, isTransportPlaying]);

  // Ensure progression starts automatically when transport becomes active
  useEffect(() => {
    if (q2View === 'transport') {
      setIsTransportPlaying(true);
      setTransportProgress(0);
    }
  }, [q2View]);

  // 5. Economy & Democracy
  const [coinCount, setCoinCount] = useState(40);
  const [votes, setVotes] = useState({ library: 14, park: 18, scienceCenter: 22 });

  // 6. Calendars & Clocks
  const [clockHour, setClockHour] = useState(3);
  const [clockMinute, setClockMinute] = useState(15);
  const [calendarDayIndex, setCalendarDayIndex] = useState(2); // Wednesday

  const handleOpenArea = (areaId) => {
    setQ2View(areaId);
    setExploredAreas(prev => new Set([...prev, areaId]));
  };

  // Q1 Handlers
  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.setData('text/plain', card.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedCard && !droppedCards.find(c => c.id === draggedCard.id)) {
      setDroppedCards([...droppedCards, draggedCard]);
      setLastDropped(draggedCard);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
    setDraggedCard(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClickCard = (card) => {
    if (!droppedCards.find(c => c.id === card.id)) {
      setDroppedCards([...droppedCards, card]);
      setLastDropped(card);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  // Helper for Science Experiment additions
  const addScienceTrial = (amount) => {
    setScienceMeasuring(true);
    const newVol = Math.min(100, scienceVolume + amount);
    setScienceVolume(newVol);
    setTimeout(() => {
      const newMass = newVol * 2;
      setScienceTrials(prev => [
        ...prev,
        { trial: prev.length + 1, vol: newVol, mass: newMass, ratio: 2.0 }
      ]);
      setScienceMeasuring(false);
    }, 400);
  };

  const vehicles = [
    { name: 'Bicycle', speed: '15 km/h', formula: 'Rotations × Circumference = Distance', desc: 'Pedal gear ratios and wheel circumference calculate distance covered per turn.' },
    { name: 'Train', speed: '120 km/h', formula: 'Time = Distance ÷ Speed', desc: 'Precise track curvature radius and schedule timing prevent collisions.' },
    { name: 'Car', speed: '80 km/h', formula: 'Speedometer = Revolutions / Minute', desc: 'Transmission gear ratios and fuel consumption calculated per kilometer.' },
    { name: 'Airplane', speed: '850 km/h', formula: 'Lift Force = Coefficient × Angle × Speed²', desc: 'Wing cross-section geometry and angle of attack overcome gravity.' }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const allExplored = exploredAreas.size === 6;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#faf7f2',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Times New Roman", Times, Georgia, serif',
      color: '#0f172a',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* ── TOP QUESTION SWITCHER TABS ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '10px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1.5px solid #e2d9c8',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '14px' }}>
          <button 
            type="button"
            onClick={() => setQ1Active(true)}
            style={{ 
              padding: '10px 24px',
              background: q1Active ? '#1d4ed8' : '#ffffff',
              color: q1Active ? '#ffffff' : '#050b14', 
              border: `2px solid ${q1Active ? '#1e40af' : '#94a3b8'}`,
              borderRadius: '10px',
              fontSize: 'clamp(1.18rem, 1.35vw, 1.45rem)',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              boxShadow: q1Active ? '0 3px 10px rgba(29, 78, 216, 0.3)' : '0 1px 3px rgba(0,0,0,0.05)'
            }}>
            🎮 Q1: Where do you see Mathematics?
          </button>
          <button 
            type="button"
            onClick={() => { setQ1Active(false); setQ2View('hub'); }}
            style={{ 
              padding: '10px 26px',
              background: !q1Active ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : '#ffffff',
              color: !q1Active ? '#ffffff' : '#050b14', 
              border: `2px solid ${!q1Active ? '#92400e' : '#94a3b8'}`,
              borderRadius: '10px',
              fontSize: 'clamp(1.18rem, 1.35vw, 1.45rem)',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: !q1Active ? '0 3px 12px rgba(217, 119, 6, 0.35)' : '0 1px 3px rgba(0,0,0,0.05)',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
            🚀 Q2: How has mathematics helped propel humanity forward?
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflowY: 'auto' }}>
        
        {/* ═══════════════ QUESTION 1: DRAG & DROP ═══════════════ */}
        {q1Active && (
          <div style={{ display: 'flex', gap: '24px', height: '100%', padding: '24px', boxSizing: 'border-box' }}>
            {/* CARDS LIST */}
            <div style={{ flex: '0 0 42%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignContent: 'start', overflowY: 'auto', paddingRight: '6px' }}>
              {CARDS.map(card => {
                const isDropped = droppedCards.find(c => c.id === card.id);
                return (
                  <div
                    key={card.id}
                    draggable={!isDropped}
                    onDragStart={(e) => handleDragStart(e, card)}
                    onClick={() => handleClickCard(card)}
                    style={{
                      background: '#1e293b',
                      borderRadius: '12px',
                      padding: '12px',
                      border: `1.5px solid ${isDropped ? '#334155' : '#475569'}`,
                      cursor: isDropped ? 'default' : 'grab',
                      opacity: isDropped ? 0.45 : 1,
                      transform: isDropped ? 'scale(0.96)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: isDropped ? 'none' : '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    <img src={card.img} alt={card.label} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />
                    <span style={{ color: '#f8fafc', fontWeight: 900, fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>{card.label}</span>
                  </div>
                );
              })}
            </div>

            {/* DROP ZONE & FEEDBACK */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', minHeight: 0 }}>
              {/* COMPACT DROP ZONE (Upper-Right) */}
              <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ 
                  flex: '0 0 24%',
                  minHeight: '95px',
                  background: showSuccess ? 'rgba(59, 130, 246, 0.18)' : 'rgba(30, 41, 59, 0.4)', 
                  border: `2.5px dashed ${showSuccess ? '#3b82f6' : '#64748b'}`,
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '10px 18px',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: 'clamp(1.1rem, 1.25vw, 1.4rem)', color: '#f8fafc', fontWeight: 900, zIndex: 10, maxWidth: '520px', lineHeight: 1.25, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  {droppedCards.length === 0 
                    ? "Drag & Drop each visual card here to see how mathematics is involved!" 
                    : "✓ Mathematics is involved in everyday life!"}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 700, marginTop: '4px', marginBottom: 0, zIndex: 10, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  ({droppedCards.length} of 6 activities placed)
                </p>

                {/* Placed cards preview */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '10px', justifyContent: 'center', alignContent: 'center', pointerEvents: 'none', opacity: 0.15 }}>
                   {droppedCards.map((c, i) => (
                      <div key={i} style={{ width: '46px', height: '46px', borderRadius: '6px', overflow: 'hidden' }}>
                        <img src={c.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                   ))}
                </div>
              </div>

              {/* ENLARGED MATHEMATICAL CONNECTION / RESULT PANEL (Main Visual Focus) */}
              <div style={{ 
                flex: 1, 
                minHeight: 0,
                background: '#1e293b', 
                borderRadius: '16px', 
                border: '1.5px solid #475569', 
                padding: '18px 22px', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                overflow: 'hidden'
              }}>
                {lastDropped ? (
                   <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minHeight: 0 }}>
                     {/* FULL UN-CROPPED ACTIVITY IMAGE AS PRIMARY FOCUS */}
                     <div style={{ 
                       flex: 1, 
                       minHeight: 0, 
                       width: '100%', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       borderRadius: '12px', 
                       overflow: 'hidden', 
                       background: '#0f172a',
                       border: '1.5px solid #334155'
                     }}>
                        <img 
                          src={lastDropped.img} 
                          alt={lastDropped.label} 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            width: 'auto', 
                            height: 'auto', 
                            objectFit: 'contain',
                            display: 'block'
                          }} 
                        />
                     </div>

                     {/* SEPARATE EXPLANATION TEXT CLEARLY BELOW IMAGE */}
                     <div style={{ flexShrink: 0, width: '100%', paddingTop: '14px' }}>
                       <h3 style={{ 
                         color: '#60a5fa', 
                         margin: '0 0 6px 0', 
                         fontSize: 'clamp(1.4rem, 1.7vw, 2rem)', 
                         fontWeight: 900, 
                         fontFamily: '"Times New Roman", Times, Georgia, serif' 
                       }}>
                         {lastDropped.label}
                       </h3>
                       <p style={{ 
                         color: '#f8fafc', 
                         margin: 0, 
                         fontSize: 'clamp(1.15rem, 1.25vw, 1.4rem)', 
                         fontWeight: 700, 
                         lineHeight: 1.45, 
                         fontFamily: '"Times New Roman", Times, Georgia, serif' 
                       }}>
                         {lastDropped.exp}
                       </p>
                     </div>
                   </div>
                ) : (
                   <div style={{ margin: 'auto', textAlign: 'center', padding: '20px' }}>
                     <p style={{ 
                       color: '#94a3b8', 
                       fontSize: 'clamp(1.25rem, 1.4vw, 1.55rem)', 
                       fontWeight: 700, 
                       margin: 0, 
                       fontStyle: 'italic', 
                       maxWidth: '440px', 
                       lineHeight: 1.5, 
                       fontFamily: '"Times New Roman", Times, Georgia, serif' 
                     }}>
                       Click or drag any activity card above to reveal its mathematical connection.
                     </p>
                   </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ QUESTION 2: HUMANITY MOVES FORWARD ═══════════════ */}
        {!q1Active && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '18px 28px', boxSizing: 'border-box', backgroundColor: '#faf7f2' }}>
            
            {/* INSTRUCTION HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '14px', flexShrink: 0 }}>
              <p style={{
                color: '#050b14',
                fontSize: 'clamp(1.65rem, 2.1vw, 2.35rem)',
                fontWeight: 900,
                margin: 0,
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
                fontFamily: '"Times New Roman", Times, Georgia, serif'
              }}>
                Click each area to discover how mathematics helps us in the real world.
              </p>
            </div>

            {/* ── VIEW 1: CENTRAL DISCOVERY HUB ── */}
            {q2View === 'hub' && (
              <div style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '18px',
                position: 'relative',
                boxSizing: 'border-box',
                paddingBottom: '12px'
              }}>
                {DISCOVERY_AREAS.map((area) => {
                  return (
                    <div
                      key={area.id}
                      onClick={() => handleOpenArea(area.id)}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '2.5px solid #cbd5e1',
                        padding: 'clamp(16px, 1.8vh, 22px) clamp(18px, 1.6vw, 24px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.07), 0 2px 5px rgba(0, 0, 0, 0.04)',
                        position: 'relative',
                        boxSizing: 'border-box'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = area.color;
                        e.currentTarget.style.boxShadow = `0 14px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px ${area.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.07), 0 2px 5px rgba(0, 0, 0, 0.04)';
                      }}
                    >
                      {/* Top Bar of Card */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <span style={{ fontSize: 'clamp(2.5rem, 2.9vw, 3.2rem)', lineHeight: 1 }}>{area.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{
                            fontSize: 'clamp(1.05rem, 1.18vw, 1.25rem)',
                            fontWeight: 900,
                            color: area.color,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            display: 'block',
                            marginBottom: '3px',
                            fontFamily: '"Times New Roman", Times, Georgia, serif'
                          }}>
                            {area.tag}
                          </span>
                          <h3 style={{
                            margin: 0,
                            fontSize: 'clamp(1.55rem, 1.75vw, 2rem)',
                            fontWeight: 900,
                            color: '#050b14',
                            lineHeight: 1.2,
                            fontFamily: '"Times New Roman", Times, Georgia, serif'
                          }}>
                            {area.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        color: '#0f172a',
                        fontSize: 'clamp(1.22rem, 1.35vw, 1.48rem)',
                        fontWeight: 700,
                        lineHeight: 1.42,
                        margin: 'clamp(10px, 1.2vh, 14px) 0 clamp(10px, 1.2vh, 14px) 0',
                        fontFamily: '"Times New Roman", Times, Georgia, serif'
                      }}>
                        {area.brief}
                      </p>

                      {/* Bottom Action Prompt */}
                      <div style={{
                        paddingTop: '10px',
                        borderTop: '2px solid #e2d9c8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 'clamp(1.18rem, 1.3vw, 1.42rem)',
                        fontWeight: 900,
                        color: area.color,
                        fontFamily: '"Times New Roman", Times, Georgia, serif'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: area.color }}>
                          <span>▶ Launch Interactive Simulation</span>
                        </span>
                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: area.color }}>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── VIEW 2: INDIVIDUAL INTERACTIVE SIMULATION THEATERS ── */}
            {q2View !== 'hub' && q2View !== 'finale' && (
              <div style={{
                flex: 1,
                minHeight: 0,
                background: '#0d1527',
                borderRadius: '18px',
                border: '1.5px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                {/* Simulation Header */}
                {(() => {
                  const currentArea = DISCOVERY_AREAS.find(a => a.id === q2View);
                  return (
                    <div style={{
                      padding: '12px 24px',
                      background: currentArea?.bgGradient || '#1e293b',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setQ2View('hub')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '8px',
                            padding: '6px 14px',
                            color: '#ffffff',
                            fontWeight: 800,
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontFamily: '"Times New Roman", Times, Georgia, serif'
                          }}
                        >
                          <ArrowLeft size={16} />
                          <span>Back to Central Hub</span>
                        </button>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                            {currentArea?.icon} {currentArea?.title} — {currentArea?.tag}
                          </h3>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 700 }}>
                        Interactive Simulation
                      </span>
                    </div>
                  );
                })()}

                {/* Simulation Body */}
                <div style={{ flex: 1, minHeight: 0, padding: '18px 24px', display: 'flex', gap: '24px', overflowY: 'auto' }}>
                  
                  {/* 🔬 1. SCIENTIFIC EXPERIMENTS */}
                  {q2View === 'science' && (
                    <>
                      <div style={{ flex: 1, background: 'linear-gradient(180deg, #0b1329 0%, #070d1e 100%)', borderRadius: '16px', border: '1.5px solid #1e293b', padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
                        {/* Simulation Title Header */}
                        <div style={{ textAlign: 'center', width: '100%' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#38bdf8', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Precision Laboratory Volumetric & Mass Analysis
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Quantitative Measurement • Constant Density Ratio m/V = 2.00 g/mL
                          </span>
                        </div>

                        {/* Realistic 3D Lab Bench Scene */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          gap: '40px',
                          paddingBottom: '20px',
                          background: 'radial-gradient(ellipse at 50% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)'
                        }}>
                          {/* Benchtop Surface with Depth and Reflection */}
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '24px',
                            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                            borderTop: '2px solid #334155',
                            boxShadow: '0 -4px 15px rgba(0,0,0,0.4)'
                          }} />

                          {/* Precision Calibrated Pipette Suspended Above */}
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: 'calc(50% - 105px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 20
                          }}>
                            {/* Rubber Suction Bulb */}
                            <div style={{ width: '20px', height: '28px', borderRadius: '10px 10px 5px 5px', background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)' }} />
                            {/* Glass Pipette Body */}
                            <div style={{ width: '8px', height: '42px', background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.4) 100%)', border: '1px solid rgba(255,255,255,0.35)', position: 'relative' }}>
                              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: scienceMeasuring ? '8px' : '30px', background: '#38bdf8', transition: 'height 0.3s ease' }} />
                            </div>
                            <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '10px solid rgba(255,255,255,0.6)' }} />
                            {scienceMeasuring && (
                              <div style={{
                                width: '8px',
                                height: '12px',
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                background: 'radial-gradient(circle at 30% 30%, #e0f2fe 0%, #0284c7 100%)',
                                boxShadow: '0 0 8px #38bdf8',
                                animation: 'pipetteDrip 0.4s ease-in infinite'
                              }} />
                            )}
                          </div>

                          {/* 3D Graduated Borosilicate Cylinder */}
                          <div style={{
                            width: '74px',
                            height: '190px',
                            position: 'relative',
                            borderRadius: '0 0 16px 16px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.01) 75%, rgba(255,255,255,0.2) 100%)',
                            border: '1.5px solid rgba(255,255,255,0.35)',
                            borderTop: 'none',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 0 10px rgba(56, 189, 248, 0.1)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            zIndex: 10
                          }}>
                            {/* Glass Lip */}
                            <div style={{
                              position: 'absolute',
                              top: '-6px',
                              left: '-4px',
                              right: '-4px',
                              height: '10px',
                              borderRadius: '50%',
                              background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.5) 100%)',
                              border: '1px solid rgba(255,255,255,0.4)'
                            }} />

                            {/* Graduated Measurement Markings */}
                            {[100, 80, 60, 40, 20].map(val => (
                              <div key={val} style={{
                                position: 'absolute',
                                bottom: `${val * 1.65}px`,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 4px',
                                borderBottom: '1px solid rgba(255,255,255,0.35)',
                                pointerEvents: 'none'
                              }}>
                                <span style={{ fontSize: '0.68rem', color: '#bae6fd', fontWeight: 800, fontFamily: 'monospace' }}>{val}</span>
                                <span style={{ fontSize: '0.62rem', color: '#7dd3fc', opacity: 0.8 }}>mL</span>
                              </div>
                            ))}

                            {/* 3D Volumetric Chemical Solution */}
                            <div style={{
                              width: '100%',
                              height: `${scienceVolume * 1.65}px`,
                              background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 40%, #075985 100%)',
                              borderRadius: '0 0 14px 14px',
                              position: 'relative',
                              transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              boxShadow: '0 0 16px rgba(14, 165, 233, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)'
                            }}>
                              {/* Meniscus Top Surface */}
                              <div style={{
                                position: 'absolute',
                                top: '-4px',
                                left: 0,
                                right: 0,
                                height: '8px',
                                borderRadius: '50%',
                                background: 'linear-gradient(90deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%)',
                                boxShadow: '0 0 6px #38bdf8'
                              }} />
                            </div>

                            {/* Heavy Glass Base */}
                            <div style={{
                              position: 'absolute',
                              bottom: '-10px',
                              left: '-14px',
                              right: '-14px',
                              height: '12px',
                              borderRadius: '50%',
                              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(148, 163, 184, 0.2) 100%)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                            }} />
                          </div>

                          {/* 3D Digital Precision Scale */}
                          <div style={{
                            width: '185px',
                            background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                            borderRadius: '14px',
                            border: '1.5px solid #475569',
                            padding: '14px 16px',
                            boxShadow: '0 12px 28px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            zIndex: 10
                          }}>
                            <div style={{
                              width: '100%',
                              height: '14px',
                              background: 'linear-gradient(90deg, #94a3b8 0%, #f8fafc 40%, #cbd5e1 70%, #64748b 100%)',
                              borderRadius: '6px',
                              boxShadow: '0 3px 8px rgba(0,0,0,0.5)'
                            }} />

                            <div style={{
                              width: '100%',
                              background: '#020617',
                              borderRadius: '8px',
                              border: '1.5px solid #0284c7',
                              padding: '8px 12px',
                              textAlign: 'center',
                              boxShadow: 'inset 0 0 12px rgba(2, 132, 199, 0.3)'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 800 }}>PRECISION SCALE</span>
                                <span style={{ fontSize: '0.62rem', color: '#4ade80', fontWeight: 800 }}>● STABLE</span>
                              </div>
                              <div style={{
                                fontSize: '2rem',
                                fontWeight: 900,
                                color: '#38bdf8',
                                fontFamily: '"Courier New", monospace',
                                letterSpacing: '1px',
                                textShadow: '0 0 10px rgba(56, 189, 248, 0.7)'
                              }}>
                                {(scienceVolume * 2).toFixed(1)} <span style={{ fontSize: '1.1rem', color: '#7dd3fc' }}>g</span>
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '3px', marginTop: '3px' }}>
                                Ratio: <strong style={{ color: '#38bdf8' }}>2.00 g/mL</strong> (Constant)
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Reagent Buttons */}
                        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => addScienceTrial(10)}
                            style={{
                              padding: '9px 16px',
                              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                              color: '#fff',
                              border: '1px solid #38bdf8',
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            + Add 10 mL Solution
                          </button>
                          <button
                            type="button"
                            onClick={() => addScienceTrial(25)}
                            style={{
                              padding: '9px 16px',
                              background: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)',
                              color: '#fff',
                              border: '1px solid #7dd3fc',
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: '0 4px 12px rgba(3, 105, 161, 0.3)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            + Add 25 mL Solution
                          </button>
                          <button
                            type="button"
                            onClick={() => { setScienceVolume(20); setScienceTrials([{ trial: 1, vol: 20, mass: 40, ratio: 2.0 }]); }}
                            style={{
                              padding: '9px 16px',
                              background: 'rgba(51, 65, 85, 0.8)',
                              color: '#cbd5e1',
                              border: '1px solid #64748b',
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            Reset Experiment
                          </button>
                        </div>
                      </div>

                      {/* Observation Data Table & Takeaway */}
                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#38bdf8', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Scientific Observation Log</h4>
                            <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 800, background: 'rgba(74, 222, 128, 0.12)', padding: '2px 8px', borderRadius: '6px', border: '1px solid #4ade80' }}>
                              Linear Pattern Detected
                            </span>
                          </div>
                          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.92rem' }}>
                            <thead>
                              <tr style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc' }}>
                                <th style={{ padding: '6px' }}>Trial</th>
                                <th style={{ padding: '6px' }}>Volume (V)</th>
                                <th style={{ padding: '6px' }}>Mass (m)</th>
                                <th style={{ padding: '6px' }}>Ratio (m ÷ V)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scienceTrials.slice(-4).map((t, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                  <td style={{ padding: '7px', color: '#94a3b8' }}>#{t.trial}</td>
                                  <td style={{ padding: '7px', fontWeight: 800, color: '#38bdf8' }}>{t.vol} mL</td>
                                  <td style={{ padding: '7px', fontWeight: 800, color: '#a5f3fc' }}>{t.mass} g</td>
                                  <td style={{ padding: '7px', color: '#4ade80', fontWeight: 900 }}>2.00 g/mL (Pattern!)</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1.5px solid #06b6d4', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#67e8f9', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#f0fdfa', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Scientists use <strong>measurement</strong> to record quantitative data. By comparing ratios and tables, mathematics reveals the hidden <strong>patterns and natural laws</strong> governing our world.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 🏗️ 2. BRIDGES & BUILDINGS */}
                  {q2View === 'buildings' && (
                    <>
                      <div style={{ flex: 1, background: 'linear-gradient(180deg, #0b1329 0%, #070d1e 100%)', borderRadius: '16px', border: '1.5px solid #1e293b', padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#fbbf24', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            3D Structural Engineering & Triangle Rigidity Simulation
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Isometric View • Equilateral Angles (60°) Distribute Downward Load
                          </span>
                        </div>

                        {/* 3D Cinematic Bridge Construction Viewport */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          background: 'linear-gradient(180deg, #0a1128 0%, #071530 60%, #032147 100%)',
                          borderRadius: '12px',
                          border: '1.5px solid #334155',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
                        }}>
                          <svg width="100%" height="100%" viewBox="0 0 600 240" style={{ overflow: 'hidden' }}>
                            <defs>
                              <linearGradient id="concreteGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="50%" stopColor="#64748b" />
                                <stop offset="100%" stopColor="#334155" />
                              </linearGradient>
                              <linearGradient id="steelIBeam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="40%" stopColor="#fbbf24" />
                                <stop offset="70%" stopColor="#d97706" />
                                <stop offset="100%" stopColor="#78350f" />
                              </linearGradient>
                              <linearGradient id="waterFlow" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="#0369a1" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.4" />
                              </linearGradient>
                            </defs>

                            {/* River Canyon Water with Specular Wave Glints */}
                            <rect x="0" y="180" width="600" height="60" fill="url(#waterFlow)" />
                            <path d="M0,185 Q150,180 300,185 T600,185" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
                            <path d="M0,205 Q200,200 400,205 T600,205" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.4" />

                            {/* Massive 3D Concrete Foundation Piers */}
                            <g>
                              {/* Left Pier */}
                              <polygon points="40,140 85,140 75,230 30,230" fill="url(#concreteGrad)" stroke="#1e293b" strokeWidth="1.5" />
                              <polygon points="85,140 105,130 95,220 75,230" fill="#334155" />
                              {/* Right Pier */}
                              <polygon points="495,140 540,140 550,230 505,230" fill="url(#concreteGrad)" stroke="#1e293b" strokeWidth="1.5" />
                              <polygon points="495,140 475,130 485,220 505,230" fill="#1e293b" />
                            </g>

                            {/* STEP 1: Flat Deck with Sag Deflection when Load applied */}
                            {bridgeStep === 1 && (
                              <g>
                                {/* Sagging Deck Path */}
                                <path d="M50,140 Q300,166 530,140" fill="none" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
                                <path d="M50,140 Q300,166 530,140" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />
                                {/* Stress Deflection Warning */}
                                <g transform="translate(300, 166)">
                                  <polygon points="0,-25 -8,-40 8,-40" fill="#ef4444" />
                                  <text x="0" y="-45" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily="monospace">
                                    ⚠️ 18mm Sag Deflection! (No Triangular Rigidity)
                                  </text>
                                </g>
                                {/* Vehicle causing sag */}
                                <g transform="translate(275, 138)">
                                  <rect x="0" y="0" width="50" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                                  <circle cx="12" cy="18" r="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                                  <circle cx="38" cy="18" r="6" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                                </g>
                              </g>
                            )}

                            {/* STEP 2 & 3: 3D Steel Truss Framework with Triangles */}
                            {bridgeStep >= 2 && (
                              <g>
                                {/* Rigid Straight Deck */}
                                <line x1="50" y1="140" x2="530" y2="140" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                                <line x1="50" y1="144" x2="530" y2="144" stroke="#475569" strokeWidth="4" />

                                {/* Background 3D Truss (Perspective Depth) */}
                                <g stroke="rgba(217, 119, 6, 0.45)" strokeWidth="3" strokeLinecap="round">
                                  <line x1="90" y1="130" x2="150" y2="55" />
                                  <line x1="150" y1="55" x2="210" y2="130" />
                                  <line x1="210" y1="130" x2="270" y2="55" />
                                  <line x1="270" y1="55" x2="330" y2="130" />
                                  <line x1="330" y1="130" x2="390" y2="55" />
                                  <line x1="390" y1="55" x2="450" y2="130" />
                                  <line x1="150" y1="55" x2="390" y2="55" />
                                </g>

                                {/* Transverse Overhead Bracing Struts (Connecting 3D Depth) */}
                                {[150, 270, 390].map(topX => (
                                  <line key={topX} x1={topX - 15} y1="45" x2={topX} y2="55" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" />
                                ))}

                                {/* Foreground 3D Triangular Truss (Warren Truss) */}
                                <g stroke="url(#steelIBeam)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="65" y1="140" x2="135" y2="45" />
                                  <line x1="135" y1="45" x2="205" y2="140" />
                                  <line x1="205" y1="140" x2="275" y2="45" />
                                  <line x1="275" y1="45" x2="345" y2="140" />
                                  <line x1="345" y1="140" x2="415" y2="45" />
                                  <line x1="415" y1="45" x2="485" y2="140" />
                                  <line x1="485" y1="140" x2="520" y2="140" />
                                  {/* Top Chord Beams */}
                                  <line x1="135" y1="45" x2="275" y2="45" />
                                  <line x1="275" y1="45" x2="415" y2="45" />
                                </g>

                                {/* Gusset Node Plates (Steel Connection Hubs) */}
                                {[
                                  [65, 140], [205, 140], [345, 140], [485, 140],
                                  [135, 45], [275, 45], [415, 45]
                                ].map(([nx, ny], i) => (
                                  <circle key={i} cx={nx} cy={ny} r="6" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                                ))}

                                {/* 60° Angle Visual Indicator */}
                                <g transform="translate(135, 45)">
                                  <path d="M-15,20 A 25 25 0 0 0 15,20" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
                                  <text x="0" y="36" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">60°</text>
                                </g>
                              </g>
                            )}

                            {/* STEP 3: Heavy Dynamic Vehicle Load & Load Distribution Vectors */}
                            {bridgeStep === 3 && (
                              <g>
                                {/* Heavy Cargo Transport Truck Driving Across */}
                                <g transform="translate(250, 114)">
                                  <rect x="0" y="0" width="70" height="22" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                                  <rect x="52" y="5" width="22" height="17" rx="3" fill="#0369a1" />
                                  {/* Headlight beam */}
                                  <polygon points="74,15 140,5 140,30 74,22" fill="rgba(254, 240, 138, 0.25)" />
                                  <circle cx="15" cy="22" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                                  <circle cx="32" cy="22" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                                  <circle cx="65" cy="22" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                                </g>

                                {/* Downward Load Force Vector */}
                                <line x1="285" y1="90" x2="285" y2="135" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
                                <text x="285" y="80" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Downward Load (Mass × Gravity)</text>

                                {/* Lateral Compression Force Vectors into the Piers */}
                                <line x1="275" y1="45" x2="205" y2="140" stroke="#22c55e" strokeWidth="4" strokeDasharray="6,4" />
                                <line x1="275" y1="45" x2="345" y2="140" stroke="#22c55e" strokeWidth="4" strokeDasharray="6,4" />
                                <text x="205" y="160" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">← Pier Support</text>
                                <text x="345" y="160" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Pier Support →</text>
                              </g>
                            )}
                          </svg>
                        </div>

                        {/* Step Controls */}
                        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setBridgeStep(1)}
                            style={{
                              padding: '9px 16px',
                              background: bridgeStep === 1 ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : 'rgba(51, 65, 85, 0.8)',
                              color: '#fff',
                              border: `1.5px solid ${bridgeStep === 1 ? '#fbbf24' : '#64748b'}`,
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: bridgeStep === 1 ? '0 4px 12px rgba(217, 119, 6, 0.4)' : 'none',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            1. Flat Deck (Unstable)
                          </button>
                          <button
                            type="button"
                            onClick={() => setBridgeStep(2)}
                            style={{
                              padding: '9px 16px',
                              background: bridgeStep === 2 ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : 'rgba(51, 65, 85, 0.8)',
                              color: '#fff',
                              border: `1.5px solid ${bridgeStep === 2 ? '#fbbf24' : '#64748b'}`,
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: bridgeStep === 2 ? '0 4px 12px rgba(217, 119, 6, 0.4)' : 'none',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            2. Add 60° Triangle Trusses
                          </button>
                          <button
                            type="button"
                            onClick={() => setBridgeStep(3)}
                            style={{
                              padding: '9px 16px',
                              background: bridgeStep === 3 ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : 'rgba(51, 65, 85, 0.8)',
                              color: '#fff',
                              border: `1.5px solid ${bridgeStep === 3 ? '#fbbf24' : '#64748b'}`,
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: bridgeStep === 3 ? '0 4px 12px rgba(217, 119, 6, 0.4)' : 'none',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            3. Test Heavy Vehicle Load
                          </button>
                        </div>
                      </div>

                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#fbbf24', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Geometric Principles Used:</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6, fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <li><strong>Triangles are rigid:</strong> Unlike rectangles, a triangle cannot deform without breaking a side.</li>
                            <li><strong>Equilateral Angles:</strong> 60-degree angles distribute downward vehicle loads equally to the foundations.</li>
                            <li><strong>Dimensions & Scales:</strong> Architects calculate ratios between height and base width for skyscraper wind resistance.</li>
                          </ul>
                        </div>

                        <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1.5px solid #f59e0b', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#fcd34d', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#fef3c7', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Bridges and skyscrapers stand safely because architects use <strong>geometry, angles, and structural arrangements</strong>. Mathematics transforms raw steel into unshakeable human monuments.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 📱 3. TECHNOLOGY */}
                  {q2View === 'technology' && (
                    <>
                      <div style={{ flex: 1, background: 'linear-gradient(180deg, #0b1329 0%, #070d1e 100%)', borderRadius: '16px', border: '1.5px solid #1e293b', padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#c084fc', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            3D Circuit Processor & Digital OLED Pixel Display
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Binary States (0s & 1s) → Bus Traces → High-Definition Display Matrix
                          </span>
                        </div>

                        {/* Interactive Circuit & OLED Screen Setup */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '24px',
                          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
                        }}>
                          {/* 3D Printed Circuit Board (Left) */}
                          <div style={{
                            flex: 1,
                            height: '210px',
                            background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
                            borderRadius: '12px',
                            border: '2px solid #10b981',
                            padding: '14px',
                            position: 'relative',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.6), inset 0 0 15px rgba(16, 185, 129, 0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}>
                            {/* Circuit Traces SVG Background */}
                            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                              <g stroke="#34d399" strokeWidth="2" fill="none" opacity="0.5">
                                <path d="M10,30 L60,30 L80,70 L140,70" />
                                <path d="M10,80 L70,80 L90,110 L150,110" />
                                <path d="M10,140 L50,140 L70,110 L140,110" />
                                <circle cx="140" cy="70" r="3" fill="#fbbf24" />
                                <circle cx="150" cy="110" r="3" fill="#fbbf24" />
                              </g>
                            </svg>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
                              <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 800, letterSpacing: '0.05em' }}>3D LOGIC PCB</span>
                              <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'monospace' }}>BUS: 3.3V</span>
                            </div>

                            {/* 6 Binary Toggle Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 5 }}>
                              {binaryBits.map((bit, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    const copy = [...binaryBits];
                                    copy[idx] = copy[idx] === 1 ? 0 : 1;
                                    setBinaryBits(copy);
                                  }}
                                  style={{
                                    width: '32px',
                                    height: '38px',
                                    background: bit === 1 ? 'linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)' : '#0f172a',
                                    border: `1.5px solid ${bit === 1 ? '#c084fc' : '#334155'}`,
                                    color: '#ffffff',
                                    borderRadius: '6px',
                                    fontSize: '1.1rem',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: bit === 1 ? '0 0 12px rgba(168, 85, 247, 0.7)' : 'none',
                                    fontFamily: 'monospace'
                                  }}
                                >
                                  {bit}
                                </button>
                              ))}
                            </div>

                            {/* 3D Central Microprocessor Chip */}
                            <div style={{
                              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                              border: '1.5px solid #64748b',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                              zIndex: 5
                            }}>
                              <span style={{ fontSize: '0.72rem', color: '#e2e8f0', fontWeight: 800 }}>CPU PROCESSOR</span>
                              <span style={{ fontSize: '0.7rem', color: '#c084fc', fontFamily: 'monospace' }}>
                                0b{binaryBits.join('')}
                              </span>
                            </div>
                          </div>

                          {/* 3D High-Definition Smartphone Display (Right) */}
                          <div style={{
                            width: '160px',
                            height: '210px',
                            background: '#090d16',
                            borderRadius: '18px',
                            border: '2.5px solid #475569',
                            padding: '10px',
                            position: 'relative',
                            boxShadow: '0 12px 28px rgba(0,0,0,0.7), inset 0 0 8px rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            {/* Glass Specular Reflection Overlay */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '40%',
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                              borderRadius: '16px 16px 0 0',
                              pointerEvents: 'none'
                            }} />

                            <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>OLED DISPLAY</span>

                            {/* Pixel Matrix Screen Output */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(6, 18px)',
                              gap: '3px',
                              background: '#000000',
                              padding: '6px',
                              borderRadius: '8px',
                              border: '1px solid #334155'
                            }}>
                              {binaryBits.concat(binaryBits).concat(binaryBits).slice(0, 36).map((b, i) => (
                                <div
                                  key={i}
                                  style={{
                                    width: '18px',
                                    height: '18px',
                                    background: b === 1 ? '#c084fc' : '#111827',
                                    borderRadius: '3px',
                                    transition: 'all 0.25s ease',
                                    boxShadow: b === 1 ? '0 0 8px #a855f7' : 'none'
                                  }}
                                />
                              ))}
                            </div>

                            <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 800 }}>PIXEL GRID: 36 SUBPIXELS</span>
                          </div>
                        </div>

                        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: '4px 0 0 0', textAlign: 'center', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                          Click any binary bit switch (0 or 1) above to change electric signals and observe the screen pixel matrix update in real time!
                        </p>
                      </div>

                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#c084fc', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>How Technology Uses Math:</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6, fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <li><strong>Binary Code:</strong> Computers only understand 0 (off) and 1 (on). Math arranges these into words and videos.</li>
                            <li><strong>Pixel Coordinates:</strong> Every phone screen is a grid ($X, Y$) of millions of colored light dots.</li>
                            <li><strong>Logic Gates:</strong> Mathematical boolean rules (AND, OR, NOT) calculate answers at the speed of light.</li>
                          </ul>
                        </div>

                        <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1.5px solid #8b5cf6', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#e9d5ff', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#f3e8ff', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Modern technology is applied mathematics. Without numbers, formulas, and organized structures, phones, television, and the internet could not exist.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 🚲 4. TRANSPORT */}
                  {q2View === 'transport' && (
                    <>
                      <div style={{ flex: 1, background: '#11192e', borderRadius: '14px', border: '1px solid #1e293b', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: 0, overflowY: 'auto' }}>
                        
                        {/* Header & Sequential Auto-Play Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Auto-Playing Mathematical Progression
                            </span>
                            <h4 style={{ margin: '2px 0 0 0', fontSize: '1.25rem', color: '#f8fafc', fontWeight: 800, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                              Bicycle → Train → Car → Airplane
                            </h4>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => setIsTransportPlaying(!isTransportPlaying)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                background: isTransportPlaying ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
                                border: `1.5px solid ${isTransportPlaying ? '#10b981' : '#64748b'}`,
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontFamily: '"Times New Roman", Times, Georgia, serif'
                              }}
                            >
                              {isTransportPlaying ? <Pause size={14} color="#34d399" /> : <Play size={14} color="#60a5fa" />}
                              <span>{isTransportPlaying ? 'Playing' : 'Paused'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Sequential 4-Step Progression Indicator Bar */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                          {vehicles.map((v, idx) => {
                            const isCurrent = selectedVehicle === idx;
                            const isPassed = selectedVehicle > idx;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setSelectedVehicle(idx);
                                  setTransportProgress(0);
                                }}
                                style={{
                                  padding: '8px 10px',
                                  background: isCurrent 
                                    ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' 
                                    : isPassed 
                                      ? 'rgba(16, 185, 129, 0.12)' 
                                      : '#1e293b',
                                  border: `1.5px solid ${isCurrent ? '#34d399' : isPassed ? '#059669' : '#334155'}`,
                                  borderRadius: '8px',
                                  color: '#ffffff',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  transition: 'all 0.2s ease',
                                  fontFamily: '"Times New Roman", Times, Georgia, serif'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                  <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                                    {idx + 1}. {v.name}
                                  </span>
                                  {isCurrent && (
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                                  )}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: isCurrent ? '#a7f3d0' : '#94a3b8' }}>
                                  {v.speed}
                                </div>

                                {/* Active Stage Filling Timer Bar */}
                                {isCurrent && isTransportPlaying && (
                                  <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '3px',
                                    width: `${transportProgress}%`,
                                    background: '#34d399',
                                    transition: 'width 0.08s linear'
                                  }} />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* ── HIGH-DEFINITION ANIMATED TRANSPORT VIEWPORT ── */}
                        <div style={{
                          width: '100%',
                          height: '210px',
                          background: selectedVehicle === 3
                            ? 'linear-gradient(180deg, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)'
                            : 'linear-gradient(180deg, #0b1329 0%, #070d1e 60%, #030712 100%)',
                          borderRadius: '12px',
                          border: '1.5px solid #334155',
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6)'
                        }}>

                          {/* 1. BICYCLE ANIMATION */}
                          {selectedVehicle === 0 && (
                            <svg width="100%" height="100%" viewBox="0 0 600 200" style={{ overflow: 'hidden' }}>
                              {/* Ground with moving distance ticks */}
                              <line x1="0" y1="160" x2="600" y2="160" stroke="#475569" strokeWidth="4" />
                              <g style={{ animation: isTransportPlaying ? 'moveGroundDashes 1.2s linear infinite' : 'none' }}>
                                {[-60, 0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660].map((x, i) => (
                                  <g key={i}>
                                    <line x1={x} y1="160" x2={x} y2="175" stroke="#94a3b8" strokeWidth="2" />
                                    <text x={x + 5} y="174" fill="#64748b" fontSize="10" fontFamily="monospace">{(i * 2.1).toFixed(1)}m</text>
                                  </g>
                                ))}
                              </g>

                              {/* Bicycle Rear Wheel */}
                              <g transform="translate(180, 125)">
                                <circle cx="0" cy="0" r="35" fill="none" stroke="#64748b" strokeWidth="6" />
                                <circle cx="0" cy="0" r="32" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                                {/* Rotating Spokes */}
                                <g style={{
                                  transformOrigin: '0px 0px',
                                  animation: isTransportPlaying ? 'spinWheel 0.7s linear infinite' : 'none'
                                }}>
                                  {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                    <line key={deg} x1="0" y1="0" x2={32 * Math.cos(deg * Math.PI / 180)} y2={32 * Math.sin(deg * Math.PI / 180)} stroke="#e2e8f0" strokeWidth="1.5" />
                                  ))}
                                  {/* Red spoke reflector for clear visual rotation */}
                                  <circle cx="20" cy="0" r="4" fill="#ef4444" />
                                </g>
                                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                              </g>

                              {/* Bicycle Front Wheel */}
                              <g transform="translate(340, 125)">
                                <circle cx="0" cy="0" r="35" fill="none" stroke="#64748b" strokeWidth="6" />
                                <circle cx="0" cy="0" r="32" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                                {/* Rotating Spokes */}
                                <g style={{
                                  transformOrigin: '0px 0px',
                                  animation: isTransportPlaying ? 'spinWheel 0.7s linear infinite' : 'none'
                                }}>
                                  {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                                    <line key={deg} x1="0" y1="0" x2={32 * Math.cos(deg * Math.PI / 180)} y2={32 * Math.sin(deg * Math.PI / 180)} stroke="#e2e8f0" strokeWidth="1.5" />
                                  ))}
                                  {/* Yellow spoke reflector */}
                                  <circle cx="20" cy="0" r="4" fill="#fbbf24" />
                                </g>
                                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                              </g>

                              {/* Bicycle Frame: Geometric Triangle Truss Structure */}
                              <g stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                                {/* Rear Triangle */}
                                <polyline points="180,125 240,125 220,70 180,125" />
                                {/* Front Triangle */}
                                <polyline points="240,125 320,70 220,70 340,125" />
                                {/* Handlebar stem & fork */}
                                <line x1="340" y1="125" x2="315" y2="55" stroke="#34d399" strokeWidth="4" />
                                <line x1="305" y1="55" x2="330" y2="55" stroke="#f8fafc" strokeWidth="4" />
                                {/* Seat post & saddle */}
                                <line x1="220" y1="70" x2="215" y2="55" stroke="#cbd5e1" strokeWidth="4" />
                                <ellipse cx="215" cy="53" rx="14" ry="4" fill="#f8fafc" stroke="none" />
                              </g>

                              {/* Rotating Crank & Pedals */}
                              <g transform="translate(240, 125)">
                                <circle cx="0" cy="0" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
                                <g style={{
                                  transformOrigin: '0px 0px',
                                  animation: isTransportPlaying ? 'spinWheel 0.7s linear infinite' : 'none'
                                }}>
                                  <line x1="0" y1="0" x2="0" y2="16" stroke="#f8fafc" strokeWidth="3" />
                                  <circle cx="0" cy="16" r="3" fill="#ef4444" />
                                  <line x1="0" y1="0" x2="0" y2="-16" stroke="#f8fafc" strokeWidth="3" />
                                  <circle cx="0" cy="-16" r="3" fill="#ef4444" />
                                </g>
                              </g>

                              {/* Mathematical Annotations Overlay */}
                              <g>
                                <text x="180" y="30" fill="#34d399" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                                  Circumference: C = π × d = 3.14 × 0.68m = 2.14 meters per turn
                                </text>
                                <path d="M180,125 C160,85 180,60 210,70" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                                <text x="145" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">θ = 360°</text>
                              </g>
                            </svg>
                          )}

                          {/* 2. TRAIN ANIMATION */}
                          {selectedVehicle === 1 && (
                            <svg width="100%" height="100%" viewBox="0 0 600 200" style={{ overflow: 'hidden' }}>
                              {/* Parallel Steel Rails & Cross Ties */}
                              <line x1="0" y1="150" x2="600" y2="150" stroke="#94a3b8" strokeWidth="4" />
                              <line x1="0" y1="160" x2="600" y2="160" stroke="#64748b" strokeWidth="4" />
                              <g style={{ animation: isTransportPlaying ? 'moveGroundDashes 0.5s linear infinite' : 'none' }}>
                                {[-50, 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650].map((x, i) => (
                                  <line key={i} x1={x} y1="150" x2={x + 10} y2="165" stroke="#475569" strokeWidth="3" />
                                ))}
                              </g>

                              {/* Overhead Catenary Power Wire */}
                              <line x1="0" y1="35" x2="600" y2="35" stroke="#0284c7" strokeWidth="2" strokeDasharray="6,4" />

                              {/* Modern High-Speed Train Body */}
                              <g transform="translate(130, 75)">
                                {/* Main Fuselage */}
                                <path d="M0,60 L240,60 Q300,60 310,40 Q290,10 240,10 L0,10 Z" fill="linear-gradient(180deg, #f8fafc 0%, #cbd5e1 100%)" stroke="#475569" strokeWidth="2" />
                                {/* Blue Aerodynamic Speed Stripe */}
                                <path d="M0,35 L260,35 Q285,35 295,25 L240,25 L0,25 Z" fill="#0284c7" />
                                {/* Passenger Window Strip */}
                                {[20, 60, 100, 140, 180].map(wx => (
                                  <rect key={wx} x={wx} y="18" width="28" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                                ))}
                                {/* Driver Cockpit Windshield */}
                                <path d="M245,16 Q275,18 285,26 L265,26 Z" fill="#38bdf8" />

                                {/* Headlight Beam Cone */}
                                <polygon points="310,45 520,10 520,75 310,55" fill="rgba(254, 240, 138, 0.18)" />

                                {/* Pantograph Roof Connector */}
                                <polyline points="60,10 80,-20 120,-20 140,10" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                              </g>

                              {/* Bogie Wheels Spinning */}
                              {[170, 210, 310, 350].map((bx, i) => (
                                <g key={i} transform={`translate(${bx}, 145)`}>
                                  <circle cx="0" cy="0" r="14" fill="#334155" stroke="#cbd5e1" strokeWidth="3" />
                                  <g style={{
                                    transformOrigin: '0px 0px',
                                    animation: isTransportPlaying ? 'spinWheel 0.35s linear infinite' : 'none'
                                  }}>
                                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#f59e0b" strokeWidth="2" />
                                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#f59e0b" strokeWidth="2" />
                                  </g>
                                </g>
                              ))}

                              {/* Velocity & Formula Overlay */}
                              <g>
                                <text x="140" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                                  Linear Rail Motion: Speed v = 120 km/h | Time = Distance ÷ Speed
                                </text>
                                <line x1="430" y1="110" x2="490" y2="110" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x="500" y="114" fill="#10b981" fontSize="12" fontWeight="bold">→ Velocity Vector</text>
                              </g>
                            </svg>
                          )}

                          {/* 3. CAR ANIMATION */}
                          {selectedVehicle === 2 && (
                            <svg width="100%" height="100%" viewBox="0 0 600 200" style={{ overflow: 'hidden' }}>
                              {/* Asphalt Road & Dashed Lane Lines */}
                              <rect x="0" y="145" width="600" height="55" fill="#1e293b" />
                              <line x1="0" y1="170" x2="600" y2="170" stroke="#f59e0b" strokeWidth="4" strokeDasharray="24,18" style={{
                                animation: isTransportPlaying ? 'moveGroundDashes 0.7s linear infinite' : 'none'
                              }} />

                              {/* Aerodynamic Sports Car Body */}
                              <g transform="translate(150, 75)">
                                {/* Sleek Streamline Body */}
                                <path d="M10,50 L260,50 Q280,50 285,42 Q280,30 250,28 L200,16 Q150,10 100,16 L40,30 Q10,32 10,50 Z" fill="linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)" stroke="#fca5a5" strokeWidth="2" />
                                {/* Tinted Windshield & Cabin */}
                                <path d="M95,17 L195,17 Q175,28 150,28 L95,28 Z" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
                                {/* Headlights Beam */}
                                <polygon points="285,42 460,30 460,70 285,48" fill="rgba(254, 240, 138, 0.22)" />
                                {/* Aerodynamic Wind Streamlines */}
                                <path d="M0,10 Q140,5 290,20" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
                              </g>

                              {/* Rear Wheel with Rotating Alloy Rim */}
                              <g transform="translate(205, 140)">
                                <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="6" />
                                <g style={{
                                  transformOrigin: '0px 0px',
                                  animation: isTransportPlaying ? 'spinWheel 0.4s linear infinite' : 'none'
                                }}>
                                  {[0, 60, 120, 180, 240, 300].map(deg => (
                                    <line key={deg} x1="0" y1="0" x2={18 * Math.cos(deg * Math.PI / 180)} y2={18 * Math.sin(deg * Math.PI / 180)} stroke="#f8fafc" strokeWidth="2.5" />
                                  ))}
                                  <circle cx="10" cy="0" r="3" fill="#ef4444" />
                                </g>
                                <circle cx="0" cy="0" r="4" fill="#e2e8f0" />
                              </g>

                              {/* Front Wheel with Rotating Alloy Rim */}
                              <g transform="translate(370, 140)">
                                <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="6" />
                                <g style={{
                                  transformOrigin: '0px 0px',
                                  animation: isTransportPlaying ? 'spinWheel 0.4s linear infinite' : 'none'
                                }}>
                                  {[0, 60, 120, 180, 240, 300].map(deg => (
                                    <line key={deg} x1="0" y1="0" x2={18 * Math.cos(deg * Math.PI / 180)} y2={18 * Math.sin(deg * Math.PI / 180)} stroke="#f8fafc" strokeWidth="2.5" />
                                  ))}
                                  <circle cx="10" cy="0" r="3" fill="#ef4444" />
                                </g>
                                <circle cx="0" cy="0" r="4" fill="#e2e8f0" />
                              </g>

                              {/* Overlay Formula */}
                              <g>
                                <text x="140" y="28" fill="#f87171" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                                  Rotary to Linear: Speed = Wheel RPM × Gear Ratio × Tire Radius
                                </text>
                                <text x="350" y="180" fill="#fbbf24" fontSize="11" fontWeight="bold">Friction Grip & Momentum</text>
                              </g>
                            </svg>
                          )}

                          {/* 4. AIRPLANE ANIMATION */}
                          {selectedVehicle === 3 && (
                            <svg width="100%" height="100%" viewBox="0 0 600 200" style={{ overflow: 'hidden' }}>
                              {/* Atmospheric Drifting Clouds */}
                              <g style={{ animation: isTransportPlaying ? 'cloudDriftMove 4s linear infinite' : 'none' }}>
                                <path d="M50,160 Q70,140 100,150 Q130,140 150,160 Z" fill="rgba(255,255,255,0.25)" />
                                <path d="M280,170 Q310,145 350,155 Q390,145 420,170 Z" fill="rgba(255,255,255,0.2)" />
                                <path d="M480,150 Q510,130 540,140 Q570,130 600,150 Z" fill="rgba(255,255,255,0.18)" />
                              </g>

                              {/* Jet Airplane Climbing at Angle of Attack */}
                              <g transform="translate(190, 85) rotate(-6)">
                                {/* Jet Fuselage */}
                                <path d="M0,20 Q60,16 180,18 Q230,18 245,26 Q220,34 180,34 L0,30 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                                {/* Tail Fin */}
                                <polygon points="10,20 -15,-20 15,-20 35,20" fill="#0284c7" />
                                {/* Main Swept-back Wing with Airfoil Shape */}
                                <polygon points="100,24 60,65 95,65 140,24" fill="linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%)" stroke="#94a3b8" strokeWidth="1.5" />
                                {/* Jet Engine Nacelle */}
                                <rect x="90" y="45" width="35" height="14" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
                                {/* Jet Exhaust Glow */}
                                <polygon points="85,47 60,52 85,57" fill="rgba(251, 191, 36, 0.7)" />

                                {/* Aerodynamic Airflow Streamlines over the Wing */}
                                <path d="M50,0 Q120,-15 220,10" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,4" />
                                <path d="M70,38 Q130,42 220,32" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5,4" />

                                {/* Force Vector Arrows */}
                                {/* Lift Force (Green Arrow Upwards) */}
                                <line x1="120" y1="20" x2="120" y2="-35" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x="126" y="-20" fill="#34d399" fontSize="11" fontWeight="bold">Lift Force ↑</text>

                                {/* Weight Gravity (Red Arrow Downwards) */}
                                <line x1="120" y1="30" x2="120" y2="75" stroke="#ef4444" strokeWidth="2.5" />
                                <text x="126" y="65" fill="#fca5a5" fontSize="10">Weight (Gravity) ↓</text>
                              </g>

                              {/* Altitude & Aerodynamics Overlay */}
                              <g>
                                <text x="130" y="26" fill="#f0f9ff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                                  Wing Aerodynamics: Lift = Coefficient × ½ρv² × Area | Pitch Angle α = 7°
                                </text>
                                <text x="400" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold">
                                  Cruising: 850 km/h at 10,000 m
                                </text>
                              </g>
                            </svg>
                          )}

                        </div>

                        {/* Interactive Telemetry & Formula Display HUD */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#064e3b', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #10b981' }}>
                          <Gauge size={36} color="#a7f3d0" />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
                                {vehicles[selectedVehicle].speed}
                              </span>
                              <span style={{ fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 700, textTransform: 'uppercase' }}>
                                Active Stage: {selectedVehicle + 1} of 4 ({vehicles[selectedVehicle].name})
                              </span>
                            </div>
                            <span style={{ fontSize: '0.86rem', color: '#d1fae5', display: 'block' }}>
                              Mathematical Law: <strong>{vehicles[selectedVehicle].formula}</strong>
                            </span>
                          </div>
                        </div>

                        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0, lineHeight: 1.45, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                          {vehicles[selectedVehicle].desc}
                        </p>
                      </div>

                      {/* Right Panel: Educational Principles & Takeaway */}
                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#34d399', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Mathematical Principles in Travel:</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6, fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <li><strong>Wheel Rotation:</strong> Each revolution covers exactly circumference π × diameter, converting rotational angle into linear distance.</li>
                            <li><strong>Speed Formula:</strong> Speed = Distance ÷ Time, allowing trains and vehicles to run on precise schedules.</li>
                            <li><strong>Aerodynamics:</strong> Jet aircraft wing profiles use mathematical pressure differences (Bernoulli's principle) to generate upward lift.</li>
                            <li><strong>Geometric Design:</strong> Diamond triangular frames in bicycles and tapered fuselages in airplanes reduce wind drag.</li>
                          </ul>
                        </div>

                        <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1.5px solid #10b981', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#a7f3d0', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#ecfdf5', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Humanity transitioned from walking to cycling, high-speed rail, automobiles, and supersonic air travel because mathematics allowed engineers to optimize wheel rotations, distance measurements, velocity, and aerodynamic flight angles.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 💰 5. ECONOMY & DEMOCRACY */}
                  {q2View === 'economy' && (
                    <>
                      <div style={{ flex: 1, background: 'linear-gradient(180deg, #0b1329 0%, #070d1e 100%)', borderRadius: '16px', border: '1.5px solid #1e293b', padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#f472b6', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            3D Civic Voting & Extruded Bar-Chart Data Representation
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Physical Ballots/Coins Counted → Base-10 Sorting → Proportional Representation
                          </span>
                        </div>

                        {/* 3D Ballot Sorting & Extruded Bar Chart Chamber */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          gap: '24px',
                          padding: '0 20px 16px 20px',
                          background: 'radial-gradient(ellipse at 50% 60%, rgba(244, 63, 94, 0.08) 0%, transparent 70%)'
                        }}>
                          {[
                            { name: 'Community Solar Park', key: 'park', color: '#f43f5e', grad: 'linear-gradient(180deg, #f43f5e 0%, #be123c 100%)' },
                            { name: 'Public Science Library', key: 'library', color: '#3b82f6', grad: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' },
                            { name: 'Civic Sports Arena', key: 'scienceCenter', color: '#10b981', grad: 'linear-gradient(180deg, #10b981 0%, #047857 100%)' }
                          ].map(opt => {
                            const count = votes[opt.key];
                            const total = votes.park + votes.library + votes.scienceCenter;
                            const pct = Math.round((count / total) * 100);
                            const barHeight = Math.max(30, pct * 1.6);
                            return (
                              <div key={opt.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                                {/* Percentage Badge */}
                                <span style={{ fontSize: '0.88rem', fontWeight: 900, color: opt.color, fontFamily: 'monospace' }}>
                                  {count} ({pct}%)
                                </span>

                                {/* 3D Extruded Bar Column with Beveled Top */}
                                <div style={{
                                  width: '58px',
                                  height: `${barHeight}px`,
                                  position: 'relative',
                                  transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}>
                                  {/* Top Beveled Cap of 3D Column */}
                                  <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '14px',
                                    borderRadius: '50%',
                                    background: opt.color,
                                    boxShadow: `0 0 10px ${opt.color}`,
                                    zIndex: 2
                                  }} />
                                  {/* Column Shaft with Metallic Shadow */}
                                  <div style={{
                                    position: 'absolute',
                                    top: '7px',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    borderRadius: '0 0 8px 8px',
                                    background: opt.grad,
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 2px 0 3px rgba(255,255,255,0.3)',
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                    padding: '4px',
                                    gap: '3px'
                                  }}>
                                    {/* Stacked Token Indicators */}
                                    {Array.from({ length: Math.min(6, Math.floor(count / 4)) }).map((_, i) => (
                                      <div key={i} style={{ height: '4px', background: '#fbbf24', borderRadius: '2px', opacity: 0.8 }} />
                                    ))}
                                  </div>
                                </div>

                                {/* Label & Cast Vote Action Button */}
                                <span style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 700, textAlign: 'center', height: '28px', lineHeight: 1.2 }}>
                                  {opt.name}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => setVotes(prev => ({ ...prev, [opt.key]: prev[opt.key] + 1 }))}
                                  style={{
                                    padding: '6px 12px',
                                    background: opt.color,
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    boxShadow: `0 3px 10px ${opt.color}66`,
                                    transition: 'transform 0.15s ease',
                                    fontFamily: '"Times New Roman", Times, Georgia, serif'
                                  }}
                                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  + Cast 1 Vote
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, textAlign: 'center', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                          Each vote cast aggregates into mathematical sum tallies and dynamically transforms into proportional 3D geometric bar columns.
                        </p>
                      </div>

                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#f472b6', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Math in Organized Society:</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6, fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <li><strong>Currency & Trade:</strong> Standardized numbers allow fair exchange of goods without disputes.</li>
                            <li><strong>Democratic Elections:</strong> Accurate vote tallies guarantee every citizen's voice is counted equally.</li>
                            <li><strong>Data Charts:</strong> Bar charts turn complex numerical information into clear pictures for decision-making.</li>
                          </ul>
                        </div>

                        <div style={{ background: 'rgba(236, 72, 153, 0.12)', border: '1.5px solid #ec4899', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#fbcfe8', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#fdf2f8', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Fair economies and democratic societies depend on mathematics to count money, collect population data, and organize transparent elections.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 🗓️ 6. CALENDARS & CLOCKS */}
                  {q2View === 'clocks' && (
                    <>
                      <div style={{ flex: 1, background: 'linear-gradient(180deg, #0b1329 0%, #070d1e 100%)', borderRadius: '16px', border: '1.5px solid #1e293b', padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', position: 'relative', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#60a5fa', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            3D Horological Skeleton Clock & Astronomical Cycles
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Interlocking Gear Mechanics (1:12 Ratio) • 360° Rotational Geometry
                          </span>
                        </div>

                        {/* 3D Skeleton Clock Viewport */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '30px',
                          background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 70%)'
                        }}>
                          {/* 3D Horological Clock Face */}
                          <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 40% 40%, #1e293b 0%, #0f172a 70%, #020617 100%)',
                            border: '5px solid #94a3b8',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(0,0,0,0.9), 0 0 20px rgba(96, 165, 250, 0.3)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {/* Interlocking Brass Gears (Skeleton Engine) */}
                            <svg width="100%" height="100%" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
                              {/* Central Driving Gear */}
                              <g transform="translate(90, 90)">
                                <circle cx="0" cy="0" r="28" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="5,4" />
                                <circle cx="0" cy="0" r="16" fill="none" stroke="#fbbf24" strokeWidth="3" />
                              </g>
                              {/* Meshing Reduction Gear */}
                              <g transform="translate(60, 65)">
                                <circle cx="0" cy="0" r="20" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeDasharray="4,3" />
                              </g>
                            </svg>

                            {/* Hour Markers (Roman Numerals) */}
                            <span style={{ position: 'absolute', top: '10px', fontWeight: 900, color: '#93c5fd', fontSize: '0.9rem', fontFamily: 'serif' }}>XII</span>
                            <span style={{ position: 'absolute', right: '12px', fontWeight: 900, color: '#93c5fd', fontSize: '0.9rem', fontFamily: 'serif' }}>III</span>
                            <span style={{ position: 'absolute', bottom: '10px', fontWeight: 900, color: '#93c5fd', fontSize: '0.9rem', fontFamily: 'serif' }}>VI</span>
                            <span style={{ position: 'absolute', left: '12px', fontWeight: 900, color: '#93c5fd', fontSize: '0.9rem', fontFamily: 'serif' }}>IX</span>

                            {/* Center Jewel / Pin */}
                            <div style={{ width: '12px', height: '12px', background: 'radial-gradient(circle, #f59e0b 0%, #b45309 100%)', borderRadius: '50%', border: '2px solid #ffffff', zIndex: 10, boxShadow: '0 0 8px #f59e0b' }} />

                            {/* Hour Hand (3D Faceted Luminous Brass) */}
                            <div style={{
                              position: 'absolute',
                              bottom: '50%',
                              left: 'calc(50% - 3px)',
                              width: '6px',
                              height: '46px',
                              background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
                              borderRadius: '4px',
                              transformOrigin: 'bottom center',
                              transform: `rotate(${clockHour * 30 + clockMinute * 0.5}deg)`,
                              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                              zIndex: 6
                            }} />

                            {/* Minute Hand (3D Faceted Blue Steel) */}
                            <div style={{
                              position: 'absolute',
                              bottom: '50%',
                              left: 'calc(50% - 2px)',
                              width: '4px',
                              height: '68px',
                              background: 'linear-gradient(90deg, #38bdf8 0%, #60a5fa 50%, #0284c7 100%)',
                              borderRadius: '3px',
                              transformOrigin: 'bottom center',
                              transform: `rotate(${clockMinute * 6}deg)`,
                              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                              zIndex: 7
                            }} />

                            {/* Glass Dome Highlight Curved Reflection */}
                            <div style={{
                              position: 'absolute',
                              top: '6px',
                              left: '12px',
                              right: '12px',
                              height: '50px',
                              borderRadius: '50%',
                              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                              pointerEvents: 'none'
                            }} />
                          </div>

                          {/* 3D Perpetual Calendar Flip Block */}
                          <div style={{
                            width: '150px',
                            background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                            borderRadius: '14px',
                            border: '1.5px solid #475569',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                          }}>
                            <span style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              7-DAY CYCLE
                            </span>
                            <div style={{
                              width: '100%',
                              background: '#2563eb',
                              color: '#ffffff',
                              padding: '10px 6px',
                              borderRadius: '8px',
                              textAlign: 'center',
                              fontSize: '1.15rem',
                              fontWeight: 900,
                              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}>
                              {weekDays[calendarDayIndex]}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', textAlign: 'center' }}>
                              Hand Angle: <strong style={{ color: '#60a5fa' }}>{Math.abs(Math.round(clockHour * 30 + clockMinute * 0.5 - clockMinute * 6)) % 360}°</strong>
                            </span>
                          </div>
                        </div>

                        {/* Interactive Clock & Calendar Controls */}
                        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const newMin = (clockMinute + 15) % 60;
                              setClockMinute(newMin);
                              if (newMin === 0) setClockHour(h => (h % 12) + 1);
                            }}
                            style={{
                              padding: '9px 16px',
                              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                              color: '#fff',
                              border: '1px solid #60a5fa',
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            + 15 Minutes (90° Rotation)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCalendarDayIndex(d => (d + 1) % 7)}
                            style={{
                              padding: '9px 16px',
                              background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
                              color: '#fff',
                              border: '1px solid #93c5fd',
                              borderRadius: '10px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              fontSize: '0.92rem',
                              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)',
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}
                          >
                            + 1 Day ({weekDays[(calendarDayIndex + 1) % 7]})
                          </button>
                        </div>
                      </div>

                      <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#11192e', borderRadius: '14px', border: '1.5px solid #1e293b', padding: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#60a5fa', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Repeating Mathematical Cycles:</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6, fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <li><strong>Rotational Geometry:</strong> A circular clock has 360 degrees. Each hour tick is exactly $360^\circ \div 12 = 30^\circ$.</li>
                            <li><strong>Base-60 Math:</strong> 60 seconds in a minute and 60 minutes in an hour come from ancient Babylonian base-60 mathematics.</li>
                            <li><strong>Astronomical Repeating Patterns:</strong> 7 days in a week and 365.25 days in a year align humanity's daily schedule with planetary cycles.</li>
                          </ul>
                        </div>

                        <div style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1.5px solid #3b82f6', borderRadius: '14px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#bfdbfe', fontSize: '1.15rem', fontWeight: 900, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Class 6 Mathematical Takeaway:</h4>
                          <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.5, color: '#eff6ff', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                            Timekeeping is applied pattern recognition. Without clocks and calendars dividing repeating solar and lunar cycles, modern coordinated human society could not function.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            )}

            {/* ── VIEW 3: GRAND FINALE MONTAGE (“HUMANITY MOVES FORWARD”) ── */}
            {q2View === 'finale' && (
              <div style={{
                flex: 1,
                minHeight: 0,
                background: 'linear-gradient(180deg, #0f172a 0%, #030712 100%)',
                borderRadius: '18px',
                border: '2px solid #f59e0b',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
                position: 'relative',
                overflowY: 'auto'
              }}>
                <div>
                  <button
                    type="button"
                    onClick={() => setQ2View('hub')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      color: '#ffffff',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      marginBottom: '12px',
                      fontFamily: '"Times New Roman", Times, Georgia, serif'
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>Return to Discovery Hub</span>
                  </button>

                  <h3 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fbbf24', margin: '0 0 8px 0' }}>
                    🌍 HUMANITY MOVES FORWARD
                  </h3>
                  <p style={{ color: '#e2e8f0', fontSize: '1.1rem', maxWidth: '780px', margin: '0 auto', lineHeight: 1.45 }}>
                    Mathematics began as the observation of simple patterns. By understanding those patterns and inventing tools for measurement and reasoning, humanity unlocked the universe.
                  </p>
                </div>

                {/* The 4-Tier Progression Flowchart */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '14px 0', width: '100%', maxWidth: '850px' }}>
                  <div style={{ background: '#d97706', padding: '8px 24px', borderRadius: '30px', fontWeight: 900, fontSize: '1.2rem', color: '#fff', letterSpacing: '0.05em' }}>
                    MATHEMATICS
                  </div>
                  <span style={{ fontSize: '1.2rem', color: '#f59e0b', fontWeight: 800 }}>↓</span>
                  <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid #f59e0b', padding: '6px 20px', borderRadius: '20px', fontWeight: 800, fontSize: '1.05rem', color: '#fef3c7' }}>
                    Patterns • Measurement • Reasoning
                  </div>
                  <span style={{ fontSize: '1.2rem', color: '#f59e0b', fontWeight: 800 }}>↓</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {DISCOVERY_AREAS.map(a => (
                      <span key={a.id} style={{ background: '#1e293b', border: `1.5px solid ${a.color}`, padding: '4px 12px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                        {a.icon} {a.title}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 800 }}>↓</span>
                  <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '10px 28px', borderRadius: '30px', fontWeight: 900, fontSize: '1.3rem', color: '#fff', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                    🚀 HUMAN CIVILIZATION ADVANCES
                  </div>
                </div>

                {/* Core Textbook Message Banner */}
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '14px 24px', maxWidth: '820px' }}>
                  <p style={{ margin: 0, fontSize: '1.05rem', color: '#e0f2fe', fontStyle: 'italic', lineHeight: 1.5 }}>
                    “Mathematics is not only about finding patterns; understanding those patterns allows people to create useful applications, build thriving societies, and propel human civilization forward.”
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

        <style>{`
          @keyframes spinWheel {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes moveGroundDashes {
            0% { transform: translateX(0px); }
            100% { transform: translateX(-60px); }
          }
          @keyframes cloudDriftMove {
            0% { transform: translateX(50px); }
            50% { transform: translateX(-50px); }
            100% { transform: translateX(50px); }
          }
          @keyframes pipetteDrip {
            0% { transform: translateY(0px) scale(0.8); opacity: 1; }
            80% { transform: translateY(35px) scale(1); opacity: 1; }
            100% { transform: translateY(45px) scale(1.2); opacity: 0; }
          }
          @keyframes bubbleDrift {
            0% { transform: translateY(0px) scale(0.8); opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-40px) scale(1.1); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
