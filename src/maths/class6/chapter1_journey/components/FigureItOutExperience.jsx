import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionNextButton from './SectionNextButton';

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

// Question 2 Data (5 Class-6 Compact Items)
const Q2_ITEMS = [
  {
    id: 'bicycles',
    emoji: '🚲',
    title: 'Bicycles',
    connection: 'Wheel rotation helps calculate distance.',
    accentColor: '#10b981',
    connectionExplanation: 'Every time the circular wheel completes one full turn, it rolls forward by its circumference (Distance = Circumference × Turns).'
  },
  {
    id: 'trains_cars',
    emoji: '🚆',
    title: 'Trains & Cars',
    connection: 'Speed, distance, and time help plan travel.',
    accentColor: '#0284c7',
    connectionExplanation: 'By knowing speed and distance, we can calculate exact travel time (Time = Distance ÷ Speed) and arrive on schedule.'
  },
  {
    id: 'planes',
    emoji: '✈️',
    title: 'Planes',
    connection: 'Angles and measurements help aircraft fly safely.',
    accentColor: '#8b5cf6',
    connectionExplanation: 'Carefully measured wing angles and aerodynamic curves create lift, keeping heavy airplanes safely balanced in the air.'
  },
  {
    id: 'buildings',
    emoji: '🏗️',
    title: 'Buildings & Bridges',
    connection: 'Shapes, angles, and measurements make structures strong.',
    accentColor: '#d97706',
    connectionExplanation: 'Triangles are rigid and do not deform under heavy weight, distributing loads evenly so bridges and buildings stand strong.'
  },
  {
    id: 'technology',
    emoji: '📱',
    title: 'Technology',
    connection: 'Mathematics helps computers, phones, and other technologies work.',
    accentColor: '#ec4899',
    connectionExplanation: 'Computers and phones turn simple mathematical numbers (0s and 1s) into images, sounds, messages, and games.'
  }
];

// Cinematic Real-World 3D Video Sources
const VIDEO_MAP = {
  bicycles: {
    src: '/videos/bicycle.mp4',
    title: 'Bicycle — Real-World Road Motion'
  },
  train: {
    src: '/videos/train.mp4',
    title: 'Passenger Train — Tracks & Continuous Speed'
  },
  car: {
    src: '/videos/car.mp4',
    title: 'Modern Automobile — Highway Driving Dynamics'
  },
  planes: {
    src: '/videos/airplane.mp4',
    title: 'Commercial Airplane — Aerial Flight Motion'
  },
  buildings: {
    src: '/videos/bridge.mp4',
    title: 'Bridge & City Architecture — Real-World Engineering'
  },
  technology: {
    src: '/videos/technology.mp4',
    title: 'Modern Technology — Digital Hardware & Devices'
  }
};

export default function FigureItOutExperience({ onNext }) {
  const [q1Active, setQ1Active] = useState(false); // Default to Q2 to match user's direct request
  
  // Q1 State
  const [droppedCards, setDroppedCards] = useState([]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [lastDropped, setLastDropped] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Q2 State
  const [activeQ2Id, setActiveQ2Id] = useState('bicycles');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Sub-controls for Trains & Cars
  const [transportMode, setTransportMode] = useState('train'); // 'train' | 'car'

  const videoRef = useRef(null);

  // Current Video Config
  const currentVideo = activeQ2Id === 'trains_cars'
    ? (transportMode === 'car' ? VIDEO_MAP.car : VIDEO_MAP.train)
    : VIDEO_MAP[activeQ2Id] || VIDEO_MAP.bicycles;

  // Ensure video auto-plays smoothly whenever category changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlayingVideo) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentVideo.src, isPlayingVideo]);

  // Auto-tour progression across the 5 items
  useEffect(() => {
    if (q1Active || !isAutoPlaying) return;
    const order = ['bicycles', 'trains_cars', 'planes', 'buildings', 'technology'];
    const timer = setInterval(() => {
      setActiveQ2Id(prev => {
        const nextIdx = (order.indexOf(prev) + 1) % order.length;
        return order[nextIdx];
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [q1Active, isAutoPlaying]);

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

  const activeItem = Q2_ITEMS.find(item => item.id === activeQ2Id) || Q2_ITEMS[0];

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
        padding: '8px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1.5px solid #e2d9c8',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '14px' }}>
          <button 
            type="button"
            onClick={() => setQ1Active(true)}
            style={{ 
              padding: '8px 22px',
              background: q1Active ? '#1d4ed8' : '#ffffff',
              color: q1Active ? '#ffffff' : '#050b14', 
              border: `2px solid ${q1Active ? '#1e40af' : '#94a3b8'}`,
              borderRadius: '10px',
              fontSize: 'clamp(1.25rem, 1.42vw, 1.6rem)',
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
            onClick={() => setQ1Active(false)}
            style={{ 
              padding: '8px 24px',
              background: !q1Active ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : '#ffffff',
              color: !q1Active ? '#ffffff' : '#050b14', 
              border: `2px solid ${!q1Active ? '#92400e' : '#94a3b8'}`,
              borderRadius: '10px',
              fontSize: 'clamp(1.25rem, 1.42vw, 1.6rem)',
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

      {/* ── MAIN CONTENT CONTAINER (NO SCROLLBAR) ── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        
        {/* ═══════════════ QUESTION 1: DRAG & DROP ═══════════════ */}
        {q1Active && (
          <div style={{ display: 'flex', gap: '18px', height: '100%', padding: '12px 18px', boxSizing: 'border-box', overflow: 'hidden' }}>
            {/* LEFT SIDE: DROP ZONE & FEEDBACK / LARGE RESULT IMAGE (MAIN VISUAL FOCUS - MAXIMUM SPACE) */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', minHeight: 0, overflow: 'hidden' }}>
              {/* COMPACT DROP ZONE */}
              <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ 
                  flex: '0 0 auto',
                  minHeight: '65px',
                  background: '#1e293b', 
                  borderRadius: '12px', 
                  border: '2px dashed #64748b', 
                  padding: '8px 14px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  position: 'relative',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <p style={{ color: '#94a3b8', margin: '0 0 4px 0', fontWeight: 700, fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  {droppedCards.length === 0 ? "Drag or click activities from the right into this zone" : `Explored (${droppedCards.length}/${CARDS.length})`}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                   {droppedCards.map(c => (
                      <div key={c.id} style={{ background: '#334155', border: '1px solid #475569', padding: '2px 9px', borderRadius: '14px', color: '#f8fafc', fontWeight: 800, fontSize: 'clamp(0.95rem, 1.05vw, 1.15rem)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle2 size={13} color="#38bdf8" />
                        <span>{c.label}</span>
                      </div>
                   ))}
                </div>
              </div>

              {/* ENLARGED MATHEMATICAL CONNECTION / RESULT PANEL (Main Visual Focus) */}
              <div style={{ 
                flex: 1, 
                minHeight: 0,
                background: '#1e293b', 
                borderRadius: '14px', 
                border: '1.5px solid #475569', 
                padding: '12px 16px', 
                display: 'flex', 
                flexDirection: 'column', 
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                overflow: 'hidden'
              }}>
                {lastDropped ? (
                   <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minHeight: 0, overflow: 'hidden' }}>
                     {/* FULL UN-CROPPED ACTIVITY IMAGE AS PRIMARY FOCUS */}
                     <div style={{ 
                       flex: 1, 
                       minHeight: 0, 
                       width: '100%', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       borderRadius: '10px', 
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
                     <div style={{ flexShrink: 0, width: '100%', paddingTop: '10px' }}>
                       <h3 style={{ 
                         color: '#60a5fa', 
                         margin: '0 0 3px 0', 
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
                         lineHeight: 1.4, 
                         fontFamily: '"Times New Roman", Times, Georgia, serif' 
                       }}>
                         {lastDropped.exp}
                       </p>
                     </div>
                   </div>
                ) : (
                   <div style={{ margin: 'auto', textAlign: 'center', padding: '16px' }}>
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
                       Click or drag any activity card from the right into the drop zone to reveal its mathematical connection.
                     </p>
                   </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: CARDS LIST (COMPACT - NO SCROLL) */}
            <div style={{ 
              flex: '0 0 clamp(340px, 28vw, 420px)', 
              width: 'clamp(340px, 28vw, 420px)', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '10px', 
              alignContent: 'center', 
              overflow: 'hidden', 
              boxSizing: 'border-box'
            }}>
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
                      borderRadius: '10px',
                      padding: '8px',
                      border: `1.5px solid ${isDropped ? '#334155' : '#475569'}`,
                      cursor: isDropped ? 'default' : 'grab',
                      opacity: isDropped ? 0.45 : 1,
                      transform: isDropped ? 'scale(0.96)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isDropped ? 'none' : '0 3px 10px rgba(0,0,0,0.25)'
                    }}
                  >
                    <img src={card.img} alt={card.label} style={{ width: '100%', height: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                    <span style={{ color: '#f8fafc', fontWeight: 900, fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', fontFamily: '"Times New Roman", Times, Georgia, serif' }}>{card.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════ QUESTION 2: 2-COLUMN LAYOUT (NO SCROLL) ═══════════════ */}
        {!q1Active && (
          <div style={{
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 18px 10px 18px',
            boxSizing: 'border-box',
            backgroundColor: '#faf7f2',
            overflow: 'hidden'
          }}>
            {/* 2-COLUMN GRID */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) clamp(380px, 32vw, 480px)',
              gap: '16px',
              alignItems: 'stretch',
              overflow: 'hidden'
            }}>
              
              {/* ── LEFT SIDE: PROMINENT REALISTIC 3D ANIMATED VIDEO THEATER (MAIN VISUAL FOCUS) ── */}
              <div style={{
                background: '#070b14',
                borderRadius: '16px',
                border: '2px solid #334155',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                position: 'relative',
                overflow: 'hidden'
              }}>
                
                {/* THEATER TOP BAR (NO "Cinematic 3D Animated Video" SUBTITLE) */}
                <div style={{
                  padding: '10px 18px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  borderBottom: '1.5px solid rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.9rem', lineHeight: 1, flexShrink: 0 }}>{activeItem.emoji}</span>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.35rem, 1.55vw, 1.85rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {currentVideo.title}
                    </h3>
                  </div>

                  {/* Play/Pause & Sub-Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {/* Mode toggles for Trains & Cars */}
                    {activeQ2Id === 'trains_cars' && (
                      <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '3px', border: '1.5px solid #475569' }}>
                        <button
                          type="button"
                          onClick={() => setTransportMode('train')}
                          style={{
                            padding: '6px 14px',
                            background: transportMode === 'train' ? '#0284c7' : 'transparent',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          🚆 Passenger Train
                        </button>
                        <button
                          type="button"
                          onClick={() => setTransportMode('car')}
                          style={{
                            padding: '6px 14px',
                            background: transportMode === 'car' ? '#ef4444' : 'transparent',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          🚗 Modern Car
                        </button>
                      </div>
                    )}

                    {/* Master Play / Pause */}
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        background: isPlayingVideo ? 'rgba(16, 185, 129, 0.28)' : 'rgba(255, 255, 255, 0.12)',
                        border: `2px solid ${isPlayingVideo ? '#34d399' : '#94a3b8'}`,
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                      title="Play or Pause Video"
                    >
                      {isPlayingVideo ? <Pause size={16} color="#34d399" /> : <Play size={16} color="#60a5fa" />}
                      <span>{isPlayingVideo ? 'Playing' : 'Paused'}</span>
                    </button>

                    {/* Auto Tour Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        background: isAutoPlaying ? 'rgba(245, 158, 11, 0.32)' : 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${isAutoPlaying ? '#fbbf24' : '#94a3b8'}`,
                        borderRadius: '8px',
                        color: isAutoPlaying ? '#fbbf24' : '#f1f5f9',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                      title="Cycle through all 5 inventions automatically"
                    >
                      <Sparkles size={16} color={isAutoPlaying ? '#fbbf24' : '#cbd5e1'} />
                      <span>Auto Tour</span>
                    </button>
                  </div>
                </div>

                {/* 16:9 REALISTIC 3D ANIMATED VIDEO THEATER */}
                <div style={{
                  flex: '1 1 auto',
                  minHeight: '240px',
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  background: '#000000'
                }}>
                  <video
                    ref={videoRef}
                    key={currentVideo.src}
                    src={currentVideo.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                </div>

                {/* THEATER BOTTOM BANNER: FIXED BOTTOM CROP, GUARANTEED 100% VISIBLE WITH ~2X FONT SIZE */}
                <div style={{
                  padding: '10px 16px',
                  background: 'linear-gradient(180deg, #0b1120 0%, #151e2e 100%)',
                  borderTop: '2px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexShrink: 0,
                  boxSizing: 'border-box'
                }}>
                  <span style={{ fontSize: '1.8rem', lineHeight: 1.1, flexShrink: 0 }}>💡</span>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.22rem, 1.4vw, 1.62rem)',
                    fontWeight: 700,
                    color: '#f8fafc',
                    lineHeight: 1.4,
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    letterSpacing: '0.01em'
                  }}>
                    <strong style={{ color: '#38bdf8', fontWeight: 900, marginRight: '6px' }}>
                      Connection:
                    </strong>
                    {activeItem.connectionExplanation}
                  </p>
                </div>

              </div>

              {/* ── RIGHT SIDE: CLEAN, CLASS-6-FRIENDLY MATHEMATICAL CONNECTIONS (NO SCROLL) ── */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
                justifyContent: 'space-between',
                gap: '8px',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
                
                {/* Heading & Short Intro */}
                <div style={{ flexShrink: 0 }}>
                  <h2 style={{
                    margin: '0 0 3px 0',
                    fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)',
                    fontWeight: 900,
                    color: '#091124',
                    fontFamily: '"Times New Roman", Times, Georgia, serif',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15
                  }}>
                    How Does Mathematics Help Us Move Forward?
                  </h2>
                  <p style={{
                    margin: 0,
                    fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)',
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1.25,
                    fontFamily: '"Times New Roman", Times, Georgia, serif'
                  }}>
                    Mathematics helps us measure, calculate, design, and improve the things we use every day.
                  </p>
                </div>

                {/* 5 Compact Cards */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flex: 1,
                  justifyContent: 'space-between',
                  minHeight: 0
                }}>
                  {Q2_ITEMS.map((item) => {
                    const isSelected = activeQ2Id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveQ2Id(item.id);
                          setIsAutoPlaying(false);
                        }}
                        style={{
                          background: '#ffffff',
                          border: isSelected ? `2px solid ${item.accentColor}` : '1.5px solid #cbd5e1',
                          borderLeft: isSelected ? `7px solid ${item.accentColor}` : '3px solid #94a3b8',
                          borderRadius: '10px',
                          padding: '6px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: isSelected 
                            ? `0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px ${item.accentColor}26` 
                            : '0 2px 4px rgba(0,0,0,0.02)',
                          transform: isSelected ? 'translateX(3px)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = '#64748b';
                            e.currentTarget.style.transform = 'translateX(2px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = '#cbd5e1';
                            e.currentTarget.style.transform = 'none';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          <span style={{ fontSize: '1.9rem', lineHeight: 1, flexShrink: 0 }}>
                            {item.emoji}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h3 style={{
                                margin: 0,
                                fontSize: 'clamp(1.4rem, 1.6vw, 1.95rem)',
                                fontWeight: 900,
                                color: isSelected ? '#000000' : '#0f172a',
                                fontFamily: '"Times New Roman", Times, Georgia, serif',
                                lineHeight: 1.15
                              }}>
                                {item.title}
                              </h3>
                              {isSelected && (
                                <span style={{
                                  fontSize: '0.86rem',
                                  fontWeight: 800,
                                  background: `${item.accentColor}22`,
                                  color: item.accentColor,
                                  padding: '2px 8px',
                                  borderRadius: '10px',
                                  fontFamily: 'sans-serif',
                                  whiteSpace: 'nowrap'
                                }}>
                                  Active Video
                                </span>
                              )}
                            </div>
                            <p style={{
                              margin: '2px 0 0 0',
                              fontSize: 'clamp(1.18rem, 1.32vw, 1.5rem)',
                              fontWeight: 700,
                              color: isSelected ? '#0f172a' : '#334155',
                              lineHeight: 1.25,
                              fontFamily: '"Times New Roman", Times, Georgia, serif'
                            }}>
                              “{item.connection}”
                            </p>
                          </div>
                        </div>
                        <span style={{
                          fontSize: '1.3rem',
                          color: isSelected ? item.accentColor : '#94a3b8',
                          fontWeight: 900,
                          transition: 'color 0.2s ease',
                          flexShrink: 0
                        }}>
                          ▶
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom-right Next Button */}
                <SectionNextButton onClick={onNext} />

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
