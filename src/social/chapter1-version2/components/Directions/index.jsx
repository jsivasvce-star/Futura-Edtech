import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, Sunrise, Sunset, Navigation, CheckCircle2, ArrowLeft, ArrowUp, ArrowDown, Map, Lightbulb, MapPin, Sun, HelpCircle, BookOpen, Globe } from 'lucide-react';
import ChapterBackFooter from '../ChapterBackFooter';
import { ScrollableWithNav } from '../ContentScrollNav';
import ExploreIndiaActivity from '../LostInTheCity/ExploreIndiaActivity';

const DIRECTIONS = [
  { 
    id: 'N', label: 'North', type: 'Main Direction', angle: 0, 
    description: <>North is one of the four <b>main directions</b>. On a compass, it is at the top. Most maps have a small arrow marked <b>'N'</b> (the <b>North Line</b>) that points North.</>, 
    note: 'Maps usually print a North arrow so you can orient every other direction from it.', 
    question: 'Where is North located on a standard map?',
    options: ['At the top', 'At the bottom', 'On the right', 'On the left'],
    correct: 'At the top',
    explanation: 'Standard maps are always aligned with North pointing to the top.',
    icon: <Navigation size={48} color="#ef4444" style={{ transform: 'rotate(0deg)' }}/> 
  },
  { 
    id: 'NE', label: 'North-East', type: 'Intermediate Direction', angle: 45, 
    description: <>North-East is an <b>intermediate direction</b>. It is exactly halfway between <b>North</b> and <b>East</b>.</>, 
    note: 'Intermediate directions (NE, SE, SW, NW) give you finer bearings between the four main ones.', 
    question: 'Which direction lies halfway between North and East?',
    options: ['North-West', 'North-East', 'South-East', 'South-West'],
    correct: 'North-East',
    explanation: 'North-East (NE) lies between North and East.',
    icon: <Navigation size={48} color="#f59e0b" style={{ transform: 'rotate(45deg)' }}/> 
  },
  { 
    id: 'E', label: 'East', type: 'Main Direction', angle: 90, 
    description: <>East is a <b>main direction</b>, to the right of North. The <b>Sun rises in the East</b> every morning.</>, 
    note: 'Facing the sunrise, North is on your left and South on your right.', 
    question: 'Where does the Sun rise every morning?',
    options: ['In the West', 'In the East', 'In the North', 'In the South'],
    correct: 'In the East',
    explanation: 'The Sun always rises in the East.',
    icon: <Sunrise size={48} color="#f59e0b" /> 
  },
  { 
    id: 'SE', label: 'South-East', type: 'Intermediate Direction', angle: 135, 
    description: <>South-East is an <b>intermediate direction</b>. It is located halfway between <b>South</b> and <b>East</b>.</>, 
    note: "Between two cardinals — useful for describing a spot that isn't due S or due E.", 
    question: 'Which direction sits halfway between South and East?',
    options: ['South-West', 'North-East', 'South-East', 'North-West'],
    correct: 'South-East',
    explanation: 'South-East (SE) is between South and East.',
    icon: <Navigation size={48} color="#f59e0b" style={{ transform: 'rotate(135deg)' }}/> 
  },
  { 
    id: 'S', label: 'South', type: 'Main Direction', angle: 180, 
    description: <>South is a <b>main direction</b>. It is directly opposite North, at the bottom of the compass.</>, 
    note: 'On most maps, down the page is roughly South.', 
    question: 'Which direction is directly opposite to North?',
    options: ['East', 'West', 'South', 'North-East'],
    correct: 'South',
    explanation: 'South is 180° directly opposite to North.',
    icon: <Navigation size={48} color="#3b82f6" style={{ transform: 'rotate(180deg)' }}/> 
  },
  { 
    id: 'SW', label: 'South-West', type: 'Intermediate Direction', angle: 225, 
    description: <>South-West is an <b>intermediate direction</b>. It is located halfway between <b>South</b> and <b>West</b>.</>, 
    note: 'Halfway between two cardinals, like all intermediate points.', 
    question: 'Which direction lies between South and West?',
    options: ['South-West', 'North-West', 'South-East', 'North-East'],
    correct: 'South-West',
    explanation: 'South-West (SW) lies between South and West.',
    icon: <Navigation size={48} color="#f59e0b" style={{ transform: 'rotate(225deg)' }}/> 
  },
  { 
    id: 'W', label: 'West', type: 'Main Direction', angle: 270, 
    description: <>West is a <b>main direction</b>, to the left of North. The <b>Sun sets in the West</b> every evening.</>, 
    note: 'Facing the sunset, South is on your left and North on your right.', 
    question: 'Where does the Sun set in the evening?',
    options: ['In the East', 'In the West', 'In the North', 'In the South'],
    correct: 'In the West',
    explanation: 'The Sun sets in the West in the evening.',
    icon: <Sunset size={48} color="#f59e0b" /> 
  },
  { 
    id: 'NW', label: 'North-West', type: 'Intermediate Direction', angle: 315, 
    description: <>North-West is an <b>intermediate direction</b>. It is located halfway between <b>North</b> and <b>West</b>.</>, 
    note: 'The last of the four intermediate directions.', 
    question: 'Which direction lies halfway between North and West?',
    options: ['North-East', 'South-West', 'North-West', 'South-East'],
    correct: 'North-West',
    explanation: 'North-West (NW) sits between North and West.',
    icon: <Navigation size={48} color="#f59e0b" style={{ transform: 'rotate(315deg)' }}/> 
  }
];

export default function Directions({ onComplete, onBack }) {
  const [activeTab, setActiveTab] = useState('compass'); // 'compass' | 'india-map'
  const [currentScreen, setCurrentScreen] = useState('text'); // 'text' | 'compass'
  const [activeDir, setActiveDir] = useState(null);
  const [viewedDirs, setViewedDirs] = useState(new Set());
  const [hoveredDir, setHoveredDir] = useState(null);
  const [pulseCompass, setPulseCompass] = useState(false);
  const [infoPage, setInfoPage] = useState(1);
  const [answers, setAnswers] = useState({});

  const isAllViewed = viewedDirs.size === 8;

  const handleDirClick = (id) => {
    setActiveDir(id);
    setViewedDirs(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleAnswerQuestion = (dirId, opt) => {
    setAnswers(prev => ({ ...prev, [dirId]: opt }));
  };

  const getActiveInfo = () => DIRECTIONS.find(d => d.id === activeDir);

  // SVG path for a 45-degree pie slice (one eighth of a circle)
  const createPieSlice = () => {
    const r = 50;
    const startAngle = -22.5 * (Math.PI / 180);
    const endAngle = 22.5 * (Math.PI / 180);
    const x1 = 50 + r * Math.sin(startAngle);
    const y1 = 50 - r * Math.cos(startAngle);
    const x2 = 50 + r * Math.sin(endAngle);
    const y2 = 50 - r * Math.cos(endAngle);
    return `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
  };

  // If India Map Activity is active
  if (activeTab === 'india-map') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', borderRadius: '16px', border: '2px solid #F2DFBC', boxShadow: '0 8px 30px rgba(60,40,20,0.06)', overflow: 'hidden' }}>
        {/* Top Sub-Navigation Switcher Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1.25rem', background: '#FFF9F0', borderBottom: '1.5px solid #F2DFBC', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('compass')}
              style={{ padding: '7px 16px', borderRadius: '999px', border: '1.5px solid #F2DFBC', background: '#FFFFFF', color: '#78350F', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Space Grotesk", sans-serif', transition: 'all 0.2s' }}
            >
              <Compass size={15} color="#D97706" /> Finding Directions (Compass)
            </button>
            <button
              style={{ padding: '7px 16px', borderRadius: '999px', border: 'none', background: '#D97706', color: '#ffffff', fontSize: '15px', fontWeight: 800, cursor: 'default', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Space Grotesk", sans-serif', boxShadow: '0 2px 8px rgba(217,119,6,0.3)' }}
            >
              <Globe size={15} color="#ffffff" /> Travel Across India (6 Locations)
            </button>
          </div>
          <button
            onClick={() => setActiveTab('compass')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '999px', color: '#78350F', fontSize: '14.5px', fontWeight: 800, cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            <ArrowLeft size={14} /> Back to Compass
          </button>
        </div>

        {/* The 6-Location India Map Mission */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <ExploreIndiaActivity 
            onBeginChapter={onComplete} 
            onBack={() => setActiveTab('compass')} 
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', overflow: 'hidden', borderRadius: '16px', border: '2px solid #F2DFBC', boxShadow: '0 8px 30px rgba(60,40,20,0.06)' }}>
      
      {/* Top Bar with Activity Mode Switcher */}
      <div style={{ padding: '0.6rem 1.25rem', borderBottom: '1.5px solid #F2DFBC', background: '#FFF9F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{ padding: '7px 16px', borderRadius: '999px', border: 'none', background: '#D97706', color: '#ffffff', fontSize: '15px', fontWeight: 800, cursor: 'default', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Space Grotesk", sans-serif', boxShadow: '0 2px 8px rgba(217,119,6,0.3)' }}
          >
            <Compass size={15} color="#ffffff" /> Finding Directions (Compass)
          </button>
          <button
            onClick={() => setActiveTab('india-map')}
            style={{ padding: '7px 16px', borderRadius: '999px', border: '1.5px solid #F2DFBC', background: '#FFFFFF', color: '#78350F', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Space Grotesk", sans-serif', transition: 'all 0.2s' }}
          >
            <Globe size={15} color="#D97706" /> Travel Across India (6 Locations)
          </button>
        </div>

        {currentScreen === 'compass' && (
          <button 
            onClick={() => {
              if (activeDir !== null) {
                setActiveDir(null);
              } else {
                setCurrentScreen('text');
              }
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '999px', color: '#78350F', fontSize: '14.5px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            <ArrowLeft size={14} /> {activeDir !== null ? 'Back to Overview' : 'Back to Reading'}
          </button>
        )}
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        <AnimatePresence mode="wait">
          {currentScreen === 'text' && (
            <motion.div 
              key="screen-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minHeight: 0, background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(20px, 3vw, 40px)', overflowY: 'auto' }}
            >
              <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vh, 24px)' }}>
                
                {/* Screen 1: Reading Text */}
                <AnimatePresence mode="wait">
                  <motion.div key={infoPage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vh, 24px)' }}>
                    
                    {infoPage === 1 && (
                      <>
                        {/* Section 1 - Intro */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: 'clamp(16px, 2.5vh, 24px)', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '8px', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              <Compass size={16} color="#D97706" /> Finding Directions
                            </span>
                          </div>
                          <p style={{ color: '#3D2E24', fontSize: 'clamp(16px, 2vh, 18px)', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                            Maps have <b>three main parts</b>: Directions, Distance, and Symbols. Directions help us find where places are.
                          </p>
                        </div>

                        {/* Section 2 - The Four Cardinal Directions & Sun */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: 'clamp(16px, 2.5vh, 24px)', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ color: '#78350F', fontSize: 'clamp(18px, 2.5vh, 22px)', margin: 0, fontWeight: 900, fontFamily: '"Fraunces", serif' }}>Main Directions & the Sun</h3>
                            <span style={{ fontSize: '13px', background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '8px', fontWeight: 800, border: '1px solid #FDE68A', display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <Sun size={15} color="#D97706" /> Face the Sunrise
                            </span>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                            <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DC2626', fontWeight: 900, fontSize: '16px' }}><ArrowUp size={16} strokeWidth={3} /> NORTH</div>
                              <div style={{ fontSize: '13px', color: '#991B1B', marginTop: '6px', fontWeight: 700 }}>Map: Top</div>
                              <div style={{ fontSize: '13px', color: '#991B1B', marginTop: '2px', fontWeight: 600 }}>Sun: 👈 Left Hand</div>
                            </div>

                            <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: 900, fontSize: '16px' }}><ArrowRight size={16} strokeWidth={3} /> EAST</div>
                              <div style={{ fontSize: '13px', color: '#92400E', marginTop: '6px', fontWeight: 700 }}>Map: Right</div>
                              <div style={{ fontSize: '13px', color: '#92400E', marginTop: '2px', fontWeight: 600 }}>Sun: 🌅 Front</div>
                            </div>

                            <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563EB', fontWeight: 900, fontSize: '16px' }}><ArrowDown size={16} strokeWidth={3} /> SOUTH</div>
                              <div style={{ fontSize: '13px', color: '#1E40AF', marginTop: '6px', fontWeight: 700 }}>Map: Bottom</div>
                              <div style={{ fontSize: '13px', color: '#1E40AF', marginTop: '2px', fontWeight: 600 }}>Sun: 👉 Right Hand</div>
                            </div>

                            <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7C3AED', fontWeight: 900, fontSize: '16px' }}><ArrowLeft size={16} strokeWidth={3} /> WEST</div>
                              <div style={{ fontSize: '13px', color: '#5B21B6', marginTop: '6px', fontWeight: 700 }}>Map: Left</div>
                              <div style={{ fontSize: '13px', color: '#5B21B6', marginTop: '2px', fontWeight: 600 }}>Sun: 🌄 Back</div>
                            </div>
                          </div>
                        </div>

                        {/* Section 3 - Intermediate Directions */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: 'clamp(16px, 2.5vh, 24px)', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <h3 style={{ color: '#78350F', fontSize: 'clamp(18px, 2.5vh, 22px)', margin: 0, fontWeight: 900, fontFamily: '"Fraunces", serif' }}>In-Between Directions</h3>
                            <span style={{ fontSize: '13px', color: '#92400E', fontWeight: 700 }}>Halfway points</span>
                          </div>
                          <p style={{ color: '#3D2E24', margin: '0 0 12px 0', fontSize: 'clamp(15px, 2vh, 16px)', fontWeight: 600, lineHeight: 1.5 }}>
                            These directions help us find places exactly. They are halfway between the main directions.
                          </p>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {[
                              { id: 'NE', name: 'North-East', desc: 'Between N & E' },
                              { id: 'SE', name: 'South-East', desc: 'Between S & E' },
                              { id: 'SW', name: 'South-West', desc: 'Between S & W' },
                              { id: 'NW', name: 'North-West', desc: 'Between N & W' },
                            ].map(item => (
                              <div
                                key={item.id}
                                style={{ background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '10px', padding: '12px 8px', textAlign: 'center', fontFamily: '"Space Grotesk", sans-serif' }}
                              >
                                <div style={{ fontSize: '18px', fontWeight: 900, color: '#78350F' }}>{item.id}</div>
                                <div style={{ fontSize: '13px', color: '#92400E', marginTop: '4px', fontWeight: 700 }}>{item.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {infoPage === 2 && (
                      <>
                        {/* Section 1 - The North Line on Maps */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: 'clamp(16px, 2.5vh, 24px)', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              <Navigation size={16} color="#D97706" /> Map Conventions
                            </div>
                            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, border: '1px solid #FDE68A' }}>
                              North Arrow 🧭
                            </span>
                          </div>
                          <h3 style={{ margin: '0 0 10px 0', color: '#78350F', fontSize: 'clamp(18px, 2.5vh, 22px)', fontWeight: 900, fontFamily: '"Fraunces", serif' }}>
                            What is the <span style={{ background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '6px', border: '1px solid #FDE68A' }}>North Line (N)</span>?
                          </h3>
                          <p style={{ color: '#3D2E24', fontSize: 'clamp(15px, 2vh, 17px)', lineHeight: 1.6, margin: '0 0 16px 0', fontWeight: 600 }}>
                            Maps usually show an arrow with <b>'N'</b> at the top right. This is the <b>North Line</b>. Finding North helps you find all other directions easily.
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF9F0', border: '1px dashed #F2DFBC', padding: '10px 14px', borderRadius: '10px', fontSize: '14.5px', color: '#78350F', fontWeight: 700 }}>
                            <span style={{ fontSize: '18px' }}>📍</span>
                            <span>Remember: <b>North is at the top of every standard map</b>.</span>
                          </div>
                        </div>

                        {/* Section 2 - The Magnetic Compass Fact & Science */}
                        <div style={{ background: '#FFF9F0', borderRadius: '16px', padding: 'clamp(16px, 2.5vh, 24px)', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                            <Lightbulb size={16} color="#D97706" /> How Does a Compass Work?
                          </div>
                          <p style={{ color: '#3D2E24', margin: '0 0 16px 0', fontSize: 'clamp(15px, 2vh, 17px)', lineHeight: 1.6, fontWeight: 600 }}>
                            A <b>compass</b> is a tool used to find directions. Its needle <b>always points North-South</b> because Earth acts like a giant magnet.
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ background: '#FFFFFF', border: '1px solid #F2DFBC', padding: '10px 12px', borderRadius: '10px', fontSize: '14px', color: '#92400E', fontWeight: 700 }}>
                              🧲 <b>Red Tip</b>: Points to Magnetic North
                            </div>
                            <div style={{ background: '#FFFFFF', border: '1px solid #F2DFBC', padding: '10px 12px', borderRadius: '10px', fontSize: '14px', color: '#1E40AF', fontWeight: 700 }}>
                              ⚪ <b>Silver Tip</b>: Points to South
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sub-page Navigation Footer for Text View */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #F2DFBC', paddingTop: '20px', marginTop: '10px' }}>
                  <button
                    onClick={() => setInfoPage(1)}
                    disabled={infoPage === 1}
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                      background: infoPage === 1 ? '#F7F1E2' : '#FFFFFF', color: infoPage === 1 ? '#A8A29E' : '#78350F', border: '2px solid #F2DFBC', borderRadius: '999px',
                      padding: '10px 24px', cursor: infoPage === 1 ? 'default' : 'pointer',
                      opacity: infoPage === 1 ? 0.5 : 1, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    <ArrowLeft size={16} /> Overview
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#78350F' }}>
                    <span>Page {infoPage} of 2</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: infoPage === 1 ? '#D97706' : '#F2DFBC' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: infoPage === 2 ? '#D97706' : '#F2DFBC' }} />
                  </div>
                  {infoPage === 1 ? (
                    <button
                      onClick={() => setInfoPage(2)}
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                        background: '#F59E0B', color: '#FFFFFF', border: '2px solid #D97706', borderRadius: '999px',
                        padding: '10px 24px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px',
                        boxShadow: '0 4px 12px rgba(245,158,11,0.25)'
                      }}
                    >
                      Key Concepts <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentScreen('compass');
                        setPulseCompass(true);
                      }}
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                        background: '#D97706', color: '#FFFFFF', border: '2px solid #B45309', borderRadius: '999px',
                        padding: '10px 24px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px',
                        boxShadow: '0 4px 12px rgba(217,119,6,0.25)'
                      }}
                    >
                      Explore Compass <Compass size={18} />
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {currentScreen === 'compass' && (
            <motion.div 
              key="screen-compass"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}
            >
              {/* If no active dir, compass is centered. If active dir, compass is on right, info is on left. */}
              {activeDir !== null && (
                <div style={{ width: '45%', minWidth: '350px', background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)', borderRight: '2px solid #F2DFBC', display: 'flex', flexDirection: 'column', padding: 'clamp(16px, 2vw, 24px)', overflowY: 'auto' }}>
                  
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Direction Title Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1.5px solid #F2DFBC' }}>
                      <div style={{ display: 'inline-flex', padding: '0.5rem', background: '#FFF9F0', borderRadius: '12px', border: '1.5px solid #F2DFBC' }}>
                        {getActiveInfo()?.icon}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.75rem', margin: 0, color: '#78350F', lineHeight: 1.15, fontFamily: '"Fraunces", serif', fontWeight: 900 }}>
                          {getActiveInfo()?.label}
                        </h2>
                        <div style={{ fontSize: '14px', color: '#92400E', fontWeight: 700, marginTop: '4px' }}>
                          {getActiveInfo()?.type} • Bearing: {getActiveInfo()?.angle}°
                        </div>
                      </div>
                    </div>

                    {/* Direction Explanation */}
                    <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1.5px solid #F2DFBC' }}>
                      <p style={{ color: '#3D2E24', fontSize: '15.5px', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                        {getActiveInfo()?.description}
                      </p>
                    </div>

                    {/* Quick Check Interactive Question */}
                    <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#78350F', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={16} color="#D97706" /> Quick Check: {getActiveInfo()?.question}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {getActiveInfo()?.options.map(opt => {
                          const userAns = answers[activeDir];
                          const isCorrect = opt === getActiveInfo()?.correct;
                          const isSelected = userAns === opt;
                          let bg = '#FFF9F0', borderColor = '#F2DFBC', textColor = '#78350F';
                          
                          if (userAns) {
                            if (isCorrect) { bg = '#DCFCE7'; borderColor = '#16A34A'; textColor = '#166534'; }
                            else if (isSelected) { bg = '#FEE2E2'; borderColor = '#EF4444'; textColor = '#991B1B'; }
                          }

                          return (
                            <button
                              key={opt}
                              onClick={() => handleAnswerQuestion(activeDir, opt)}
                              style={{
                                background: bg, border: `1.5px solid ${borderColor}`, color: textColor,
                                padding: '10px', borderRadius: '10px', fontSize: '14.5px', fontWeight: 800,
                                cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s', fontFamily: '"Space Grotesk", sans-serif'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {answers[activeDir] && (
                        <div style={{ marginTop: '12px', fontSize: '14.5px', fontWeight: 800, color: answers[activeDir] === getActiveInfo()?.correct ? '#166534' : '#991B1B', padding: '10px', background: answers[activeDir] === getActiveInfo()?.correct ? '#F0FDF4' : '#FEF2F2', borderRadius: '8px' }}>
                          {answers[activeDir] === getActiveInfo()?.correct ? `✓ Correct! ${getActiveInfo()?.explanation}` : `✗ Not quite! ${getActiveInfo()?.explanation}`}
                        </div>
                      )}
                    </div>

                    {/* Map Tip Box */}
                    <div style={{ background: '#FEF3C7', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #FDE68A', display: 'flex', gap: '10px', alignItems: 'center' }}>
                       <Lightbulb size={20} color="#D97706" style={{ flexShrink: 0 }} />
                       <p style={{ color: '#78350F', fontSize: '14.5px', margin: 0, lineHeight: 1.4, fontWeight: 600 }}>
                         <b>Map Tip:</b> {getActiveInfo()?.note}
                       </p>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Compass Area */}
              <div style={{ flex: 1, position: 'relative', background: 'radial-gradient(circle at center, #2C1B10 0%, #170E08 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Decorative background glow */}
                <div style={{ position: 'absolute', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(254, 243, 199, 0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(253, 230, 138, 0.3)', padding: '6px 18px', borderRadius: '999px', color: '#FEF3C7', fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 10 }}>
                  <Compass size={16} color="#FDE68A" /> Interactive Magnetic Compass
                </div>

                {activeDir === null && (
                  <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <div style={{ background: 'rgba(255,255,255,0.95)', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#78350F', marginBottom: '12px' }}>
                        Directions Explored ({viewedDirs.size}/8)
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {DIRECTIONS.map(d => {
                          const isExplored = viewedDirs.has(d.id);
                          return (
                            <button
                              key={d.id}
                              onClick={() => handleDirClick(d.id)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                padding: '8px 12px', borderRadius: '8px',
                                background: isExplored ? '#DCFCE7' : '#FFF9F0', color: isExplored ? '#166534' : '#78350F',
                                fontSize: '14px', fontWeight: 800, border: isExplored ? '2px solid #86EFAC' : '2px solid #F2DFBC',
                                cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', transition: 'all 0.15s'
                              }}
                            >
                              {d.id} {isExplored && <CheckCircle2 size={14} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Realistic Compass */}
                <motion.div 
                  animate={pulseCompass ? { scale: [1, 1.05, 1], boxShadow: ['0 30px 60px rgba(0,0,0,0.7), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)', '0 30px 100px rgba(217,119,6,0.5), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)', '0 30px 60px rgba(0,0,0,0.7), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)'] } : {}}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    position: 'relative', width: 'min(400px, 50vh)', height: 'min(400px, 50vh)', borderRadius: '50%', 
                    background: 'conic-gradient(from 0deg, #9ca3af 0%, #f3f4f6 15%, #6b7280 35%, #e5e7eb 50%, #4b5563 65%, #f9fafb 85%, #9ca3af 100%)', 
                    boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -4px 15px rgba(0,0,0,0.8)', 
                    padding: '20px', flexShrink: 0 
                  }}
                >
                  
                  {/* Inner Brass Ring */}
                  <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', background: 'conic-gradient(from 45deg, #78350f 0%, #fcd34d 25%, #92400e 50%, #fef3c7 75%, #78350f 100%)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), 0 1px 4px rgba(255,255,255,0.5)' }}></div>

                  {/* Inner Dark Dial */}
                  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 35% 25%, #1e293b 0%, #020617 80%)', boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.9), 0 2px 8px rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                    
                    {/* Fine Grid/Texture on Dial */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

                    {/* Dial Markings */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      {Array.from({length: 72}).map((_, i) => (
                        <line key={i} x1="50" y1="2" x2="50" y2={i % 18 === 0 ? "9" : (i % 9 === 0 ? "6" : "3")} stroke={i % 18 === 0 ? "#fcd34d" : "rgba(255,255,255,0.25)"} strokeWidth={i % 18 === 0 ? "1" : "0.5"} transform={`rotate(${i * 5} 50 50)`} />
                      ))}
                    </svg>

                    {/* The Needle */}
                    <motion.div 
                      animate={{ rotate: getActiveInfo()?.angle || 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 80 }}
                      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.75))', zIndex: 10 }}
                    >
                      {/* North Half (Red/Metallic) */}
                      <svg width="30" height="220" viewBox="0 0 30 240" style={{ position: 'absolute' }}>
                         <path d="M 15 10 L 30 120 L 15 120 Z" fill="url(#redGradRight)" />
                         <path d="M 15 10 L 0 120 L 15 120 Z" fill="url(#redGradLeft)" />
                         <defs>
                           <linearGradient id="redGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#991b1b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient>
                           <linearGradient id="redGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#7f1d1d" /></linearGradient>
                         </defs>
                      </svg>
                      {/* South Half (White/Silver) */}
                      <svg width="30" height="220" viewBox="0 0 30 240" style={{ position: 'absolute', transform: 'rotate(180deg)' }}>
                         <path d="M 15 10 L 30 120 L 15 120 Z" fill="url(#silverGradRight)" />
                         <path d="M 15 10 L 0 120 L 15 120 Z" fill="url(#silverGradLeft)" />
                         <defs>
                           <linearGradient id="silverGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
                           <linearGradient id="silverGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#475569" /></linearGradient>
                         </defs>
                      </svg>
                      {/* Center Brass Pin */}
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #b45309 60%, #451a03 100%)', boxShadow: '0 6px 12px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.4)', zIndex: 15 }} />
                    </motion.div>

                    {/* Glass Dome Reflection Overlay */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none', zIndex: 18 }}></div>
                    <div style={{ position: 'absolute', top: '5%', left: '15%', width: '70%', height: '40%', borderRadius: '50%', background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.25) 0%, transparent 70%)', pointerEvents: 'none', transform: 'rotate(-25deg)', zIndex: 18 }}></div>

                    {DIRECTIONS.map((dir) => {
                      const isActive = activeDir === dir.id;
                      const isHovered = hoveredDir === dir.id;
                      
                      return (
                        <div key={dir.id} style={{ position: 'absolute', inset: 0 }}>
                          {/* Invisible Clickable Pie Slice */}
                          <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, transform: `rotate(${dir.angle}deg)`, zIndex: 20, pointerEvents: 'none' }}>
                            <path 
                              d={createPieSlice()} 
                              fill={isActive ? 'rgba(56, 189, 248, 0.18)' : (isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.001)')}
                              onMouseEnter={() => setHoveredDir(dir.id)}
                              onMouseLeave={() => setHoveredDir(null)}
                              onClick={() => handleDirClick(dir.id)}
                              style={{ pointerEvents: 'all', cursor: 'pointer', transition: 'fill 0.2s' }}
                            />
                          </svg>

                          {/* Outer Direction Labels */}
                          <div style={{ 
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            transform: `rotate(${dir.angle}deg)`,
                          }}>
                            <div style={{ 
                              position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)',
                              color: isActive ? '#38bdf8' : (isHovered ? '#ffffff' : '#94a3b8'),
                              fontWeight: 900, fontSize: '18px', fontFamily: '"Space Grotesk", sans-serif',
                              textShadow: isActive ? '0 0 10px rgba(56,189,248,0.8)' : '0 2px 4px rgba(0,0,0,0.8)',
                              transition: 'all 0.2s'
                            }}>
                              {dir.id}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {activeDir === null && (
                  <div style={{ position: 'absolute', bottom: '24px', color: '#9ca3af', fontSize: '14.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lightbulb size={16} color="#fcd34d" /> Click any quadrant on the compass to point the needle
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
