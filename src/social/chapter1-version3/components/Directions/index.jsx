import React, { useState, useRef, useCallback } from 'react';
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
  const handleExploreBack = useCallback(() => setActiveTab('compass'), []);
  const [activeTab, setActiveTab] = useState('compass'); // 'compass' | 'india-map'
  const [currentScreen, setCurrentScreen] = useState('text'); // 'text' | 'compass'
  const [activeDir, setActiveDir] = useState(null);
  const [viewedDirs, setViewedDirs] = useState(new Set());
  const [hoveredDir, setHoveredDir] = useState(null);
  const [pulseCompass, setPulseCompass] = useState(false);
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

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {/* If India Map Activity is active */}
      <div style={{ position: 'absolute', inset: 0, opacity: activeTab === 'india-map' ? 1 : 0, pointerEvents: activeTab === 'india-map' ? 'auto' : 'none', zIndex: activeTab === 'india-map' ? 10 : 1, transition: 'opacity 0.2s ease', display: 'flex', flexDirection: 'column', minHeight: 0, background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', borderRadius: '16px', border: '2px solid #F2DFBC', boxShadow: '0 8px 30px rgba(60,40,20,0.06)', overflow: 'hidden' }}>
        {/* The 6-Location India Map Mission */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <ExploreIndiaActivity 
            onBeginChapter={onComplete} 
            onBack={handleExploreBack} 
          />
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, opacity: activeTab === 'compass' ? 1 : 0, pointerEvents: activeTab === 'compass' ? 'auto' : 'none', zIndex: activeTab === 'compass' ? 10 : 1, transition: 'opacity 0.2s ease', display: 'flex', flexDirection: 'column', minHeight: 0, background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', overflow: 'hidden', borderRadius: '16px', border: '2px solid #F2DFBC', boxShadow: '0 8px 30px rgba(60,40,20,0.06)' }}>
      
      {/* Top Bar (Only shown on compass to provide Back to Reading) */}
      {currentScreen === 'compass' && (
        <div style={{ padding: '0.6rem 1.25rem', borderBottom: '1.5px solid #F2DFBC', background: '#FFF9F0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
          <button 
            onClick={() => {
              setCurrentScreen('text');
              setActiveDir(null);
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', background: '#FFFFFF', border: '1.5px solid #F2DFBC', borderRadius: '999px', color: '#78350F', fontSize: '14.5px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            <ArrowLeft size={14} /> Back to Reading
          </button>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        <AnimatePresence mode="wait">
          {currentScreen === 'text' && (
            <motion.div 
              key="screen-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minHeight: 0, background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)', display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '20px 20px', overflowY: 'auto' }}
            >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px', flex: 1, minHeight: 0 }}>
                
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0 }}>
                  {/* LEFT COLUMN - EXISTING CONTENT */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', borderRight: '2.5px dashed #E5D3B3', paddingRight: '40px' }}>
                
                {/* Text Content - Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'space-between' }}>
                        {/* Section 1 - Intro */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px 24px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: '8px', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              <Compass size={16} color="#D97706" /> Finding Directions
                            </span>
                          </div>
                          <p style={{ color: '#3D2E24', fontSize: '17.5px', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                            Maps have <b>three main parts</b>: Directions, Distance, and Symbols. Directions help us find where places are.
                          </p>
                        </div>

                        {/* Section 2 - The Four Cardinal Directions & Sun */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px 24px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ color: '#78350F', fontSize: '23px', margin: 0, fontWeight: 900, fontFamily: '"Fraunces", serif' }}>Main Directions</h3>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DC2626', fontWeight: 900, fontSize: '17px' }}><ArrowUp size={16} strokeWidth={3} /> NORTH</div>
                              <div style={{ fontSize: '13.5px', color: '#991B1B', marginTop: '6px', fontWeight: 700 }}>Map: Top</div>
                            </div>

                            <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: 900, fontSize: '17px' }}><ArrowRight size={16} strokeWidth={3} /> EAST</div>
                              <div style={{ fontSize: '13.5px', color: '#92400E', marginTop: '6px', fontWeight: 700 }}>Map: Right</div>
                            </div>

                            <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563EB', fontWeight: 900, fontSize: '17px' }}><ArrowDown size={16} strokeWidth={3} /> SOUTH</div>
                              <div style={{ fontSize: '13.5px', color: '#1E40AF', marginTop: '6px', fontWeight: 700 }}>Map: Bottom</div>
                            </div>

                            <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7C3AED', fontWeight: 900, fontSize: '17px' }}><ArrowLeft size={16} strokeWidth={3} /> WEST</div>
                              <div style={{ fontSize: '13.5px', color: '#5B21B6', marginTop: '6px', fontWeight: 700 }}>Map: Left</div>
                            </div>
                          </div>
                        </div>

                        {/* Section 3 - Intermediate Directions */}
                        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px 24px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <h3 style={{ color: '#78350F', fontSize: '23px', margin: 0, fontWeight: 900, fontFamily: '"Fraunces", serif' }}>In-Between Directions</h3>
                            <span style={{ fontSize: '14px', color: '#92400E', fontWeight: 700 }}>Halfway points</span>
                          </div>
                          <p style={{ color: '#3D2E24', margin: '0 0 14px 0', fontSize: '17.5px', fontWeight: 600, lineHeight: 1.4 }}>
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
                                style={{ background: '#FFF9F0', border: '1.5px solid #F2DFBC', borderRadius: '10px', padding: '12px 6px', textAlign: 'center', fontFamily: '"Space Grotesk", sans-serif' }}
                              >
                                <div style={{ fontSize: '20px', fontWeight: 900, color: '#78350F' }}>{item.id}</div>
                                <div style={{ fontSize: '13.5px', color: '#92400E', marginTop: '4px', fontWeight: 700 }}>{item.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
              </div> {/* End Inner Left Column */}
            </div> {/* End Outer Left Column */}

              {/* RIGHT COLUMN - MAP CONVENTIONS & COMPASS */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between', paddingLeft: '40px' }}>
                {/* Section 1 - The North Line on Maps */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px 32px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontSize: '15.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <Navigation size={18} color="#D97706" /> Map Conventions
                    </div>
                    <span style={{ background: '#FEF3C7', color: '#92400E', padding: '5px 12px', borderRadius: '8px', fontSize: '14.5px', fontWeight: 900, border: '1px solid #FDE68A' }}>
                      North Arrow 🧭
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 14px 0', color: '#78350F', fontSize: '24px', fontWeight: 900, fontFamily: '"Fraunces", serif' }}>
                    What is the <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '8px', border: '1px solid #FDE68A' }}>North Line (N)</span>?
                  </h3>
                  <p style={{ color: '#3D2E24', fontSize: '18px', lineHeight: 1.6, margin: '0 0 20px 0', fontWeight: 600 }}>
                    Maps usually show an arrow with <b>'N'</b> at the top right. This is the <b>North Line</b>. Finding North helps you find all other directions easily.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFF9F0', border: '1px dashed #F2DFBC', padding: '14px 18px', borderRadius: '12px', fontSize: '17px', color: '#78350F', fontWeight: 700 }}>
                    <span style={{ fontSize: '22px' }}>📍</span>
                    <span>Remember: <b>North is at the top of every standard map</b>.</span>
                  </div>
                </div>

                {/* Section 2 - The Magnetic Compass Fact & Science */}
                <div style={{ background: '#FFF9F0', borderRadius: '16px', padding: '24px 32px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontSize: '15.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '18px' }}>
                    <Lightbulb size={18} color="#D97706" /> How Does a Compass Work?
                  </div>
                  <p style={{ color: '#3D2E24', margin: '0 0 20px 0', fontSize: '18px', lineHeight: 1.6, fontWeight: 600 }}>
                    A <b>compass</b> is a tool used to find directions. Its needle <b>always points North-South</b> because Earth acts like a giant magnet.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ background: '#FFFFFF', border: '1px solid #F2DFBC', padding: '14px 18px', borderRadius: '12px', fontSize: '16px', color: '#92400E', fontWeight: 700 }}>
                      🧲 <b>Red Tip</b>: Points to Magnetic North
                    </div>
                    <div style={{ background: '#FFFFFF', border: '1px solid #F2DFBC', padding: '14px 18px', borderRadius: '12px', fontSize: '16px', color: '#1E40AF', fontWeight: 700 }}>
                      ⚪ <b>Silver Tip</b>: Points to South
                    </div>
                  </div>
                </div>
              </div>              </div>

              {/* Footer for Text View */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #F2DFBC', paddingTop: '16px', marginTop: 'auto', marginBottom: '10px' }}>
                <button
                  onClick={onBack}
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                    background: '#FFFFFF', color: '#78350F', border: '1.5px solid #F2DFBC',
                    borderRadius: '999px', padding: '10px 24px', cursor: 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <ArrowLeft size={18} /> Previous
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('compass');
                    setActiveDir('N');
                    handleDirClick('N');
                    setPulseCompass(true);
                  }}
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                    background: '#D97706', color: '#FFFFFF', border: 'none', borderRadius: '999px',
                    padding: '10px 24px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px',
                    boxShadow: '0 4px 12px rgba(217,119,6,0.25)'
                  }}
                >
                  Explore Compass <Compass size={18} />
                </button>
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
              style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'row-reverse' }}>
              {/* If no active dir, compass is centered. If active dir, compass is on left, info is on right. */}
              {activeDir !== null && (
                <div style={{ width: '45%', minWidth: '350px', background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)', borderLeft: '2px solid #F2DFBC', display: 'flex', flexDirection: 'column', padding: 'clamp(16px, 2.5vw, 24px)', overflowY: 'auto' }}>
                  
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'space-between' }}>
                    
                    {/* Direction Title Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1.5px solid #F2DFBC' }}>
                      <div style={{ display: 'inline-flex', padding: '0.55rem', background: '#FFF9F0', borderRadius: '12px', border: '1.5px solid #F2DFBC' }}>
                        {getActiveInfo()?.icon}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.85rem', margin: 0, color: '#78350F', lineHeight: 1.15, fontFamily: '"Fraunces", serif', fontWeight: 900 }}>
                          {getActiveInfo()?.label}
                        </h2>
                        <div style={{ fontSize: '15px', color: '#92400E', fontWeight: 700, marginTop: '5px' }}>
                          {getActiveInfo()?.type} • Bearing: {getActiveInfo()?.angle}°
                        </div>
                      </div>
                    </div>

                    {/* Direction Explanation */}
                    <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1.5px solid #F2DFBC' }}>
                      <p style={{ color: '#3D2E24', fontSize: '16.5px', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                        {getActiveInfo()?.description}
                      </p>
                    </div>

                    {/* Quick Check Interactive Question */}
                    <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1.5px solid #F2DFBC', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#78350F', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={18} color="#D97706" /> Quick Check: {getActiveInfo()?.question}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                                padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: 800,
                                cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s', fontFamily: '"Space Grotesk", sans-serif'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {answers[activeDir] && (
                        <div style={{ marginTop: '14px', fontSize: '15px', fontWeight: 800, color: answers[activeDir] === getActiveInfo()?.correct ? '#166534' : '#991B1B', padding: '12px', background: answers[activeDir] === getActiveInfo()?.correct ? '#F0FDF4' : '#FEF2F2', borderRadius: '10px' }}>
                          {answers[activeDir] === getActiveInfo()?.correct ? `✓ Correct! ${getActiveInfo()?.explanation}` : `✗ Not quite! ${getActiveInfo()?.explanation}`}
                        </div>
                      )}
                    </div>

                    {/* Map Tip Box */}
                    <div style={{ background: '#FEF3C7', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #FDE68A', display: 'flex', gap: '12px', alignItems: 'center' }}>
                       <Lightbulb size={22} color="#D97706" style={{ flexShrink: 0 }} />
                       <p style={{ color: '#78350F', fontSize: '15.5px', margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
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

                {/* Realistic Compass */}
                <motion.div 
                  animate={pulseCompass ? { scale: [1, 1.05, 1], boxShadow: ['0 30px 60px rgba(0,0,0,0.7), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)', '0 30px 100px rgba(217,119,6,0.5), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)', '0 30px 60px rgba(0,0,0,0.7), inset 0 2px 10px rgba(255,255,255,0.8), inset 0 -4px 15px rgba(0,0,0,0.6)'] } : {}}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    position: 'relative', width: 'min(520px, 65vh)', height: 'min(520px, 65vh)', borderRadius: '50%', 
                    background: 'conic-gradient(from 0deg, #9ca3af 0%, #f3f4f6 15%, #6b7280 35%, #e5e7eb 50%, #4b5563 65%, #f9fafb 85%, #9ca3af 100%)', 
                    boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -4px 15px rgba(0,0,0,0.8)', 
                    padding: '24px', flexShrink: 0 
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
                      <svg width="7.5%" height="55%" viewBox="0 0 30 240" style={{ position: 'absolute' }}>
                         <path d="M 15 10 L 30 120 L 15 120 Z" fill="url(#redGradRight)" />
                         <path d="M 15 10 L 0 120 L 15 120 Z" fill="url(#redGradLeft)" />
                         <defs>
                           <linearGradient id="redGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#991b1b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient>
                           <linearGradient id="redGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#7f1d1d" /></linearGradient>
                         </defs>
                      </svg>
                      {/* South Half (White/Silver) */}
                      <svg width="7.5%" height="55%" viewBox="0 0 30 240" style={{ position: 'absolute', transform: 'rotate(180deg)' }}>
                         <path d="M 15 10 L 30 120 L 15 120 Z" fill="url(#silverGradRight)" />
                         <path d="M 15 10 L 0 120 L 15 120 Z" fill="url(#silverGradLeft)" />
                         <defs>
                           <linearGradient id="silverGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
                           <linearGradient id="silverGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#475569" /></linearGradient>
                         </defs>
                      </svg>
                      {/* Center Brass Pin */}
                      <div style={{ width: '5%', height: '5%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #b45309 60%, #451a03 100%)', boxShadow: '0 6px 12px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.4)', zIndex: 15 }} />
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
                              position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)',
                              color: isActive ? '#38bdf8' : (isHovered ? '#ffffff' : '#94a3b8'),
                              fontWeight: 900, fontSize: '22px', fontFamily: '"Space Grotesk", sans-serif',
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
                </div>
              </div>

              {/* Footer for Compass View */}
              {activeDir !== null && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #F2DFBC', padding: '16px 24px', background: '#FFF9F0', zIndex: 10 }}>
                  <button
                    onClick={() => {
                      if (activeDir === 'N') {
                        setCurrentScreen('text');
                        setActiveDir(null);
                        return;
                      }
                      const currentIndex = DIRECTIONS.findIndex(d => d.id === activeDir);
                      const prevIndex = (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length;
                      handleDirClick(DIRECTIONS[prevIndex].id);
                    }}
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                      background: '#FFFFFF', color: '#78350F', border: '1.5px solid #F2DFBC',
                      borderRadius: '999px', padding: '10px 24px', cursor: 'pointer',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    <ArrowLeft size={18} /> Previous
                  </button>
                  <button
                    onClick={() => {
                      if (activeDir === 'NW') {
                        setActiveTab('india-map');
                        return;
                      }
                      const currentIndex = DIRECTIONS.findIndex(d => d.id === activeDir);
                      const nextIndex = (currentIndex + 1) % DIRECTIONS.length;
                      handleDirClick(DIRECTIONS[nextIndex].id);
                    }}
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '15px',
                      background: '#D97706', color: '#FFFFFF', border: 'none',
                      borderRadius: '999px', padding: '10px 24px', cursor: 'pointer',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: '0 4px 12px rgba(217,119,6,0.25)'
                    }}
                  >
                    {activeDir === 'NW' ? 'Next Activity' : 'Next'} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
    </div>
  );
}
