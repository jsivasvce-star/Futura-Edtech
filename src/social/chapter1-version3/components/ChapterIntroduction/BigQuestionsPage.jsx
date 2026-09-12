import React, { useState, useEffect } from 'react';
import { Map, MapPin, Clock, Compass, Globe2, ChevronRight, ChevronLeft, Maximize2, X } from 'lucide-react';
import compassMapImg from './assets/CompassMap.jpg';
import RotatingCompass from './RotatingCompass';

const PAGE_PADDING = 'clamp(20px, 2.6vw, 42px)';
const HEADER_TITLE_STYLE = {
  fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)',
  color: '#78350F',
  margin: 0,
  fontFamily: '"Fraunces", serif',
  fontWeight: 900,
  lineHeight: 1.15
};

export default function BigQuestionsPage({ onBack, onMissionUnlock, onBeginChapter }) {
  const [activeCardId, setActiveCardId] = useState('maps');
  const [discoveredCards, setDiscoveredCards] = useState(['maps']);
  const [artZoomed, setArtZoomed] = useState(false);
  
  const [slide, setSlide] = useState(0);
  const [turnDir, setTurnDir] = useState('fwd');
  const isLast = slide === 1;

  useEffect(() => {
    if (!artZoomed) return;
    const onKey = e => { if (e.key === 'Escape') setArtZoomed(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [artZoomed]);

  const handleCardClick = (id) => {
    setActiveCardId(prev => prev === id ? null : id);
    if (!discoveredCards.includes(id)) {
      const nextDiscovered = [...discoveredCards, id];
      setDiscoveredCards(nextDiscovered);
      if (nextDiscovered.length === 3 && onMissionUnlock) {
        onMissionUnlock();
      }
    }
  };

  const goToSlide = (target) => {
    if (target < 0 || target > 1) return;
    setTurnDir(target > slide ? 'fwd' : 'back');
    setSlide(target);
  };

  const cards = [
    {
      id: 'maps',
      title: 'Maps',
      icon: Map,
      color: '#D97706',
      bgLight: '#FEF3C7',
      bgClosed: '#FFFFFF',
      bgOpen: '#FFF9F0',
      borderColor: '#F2DFBC',
      question: 'What is a map and how do we use it? What are its main components?',
      hint: "You'll learn about: Maps • Symbols • Directions • Scale",
      hintColor: '#92400E',
      hintBg: '#FEF3C7'
    },
    {
      id: 'coordinates',
      title: 'Coordinates',
      icon: MapPin,
      color: '#D97706',
      bgLight: '#FEF3C7',
      bgClosed: '#FFFFFF',
      bgOpen: '#FFF9F0',
      borderColor: '#F2DFBC',
      question: 'What are coordinates? How can latitude and longitude be used to mark any location on the Earth?',
      hint: "You'll learn about: Latitude • Longitude • Globe",
      hintColor: '#92400E',
      hintBg: '#FEF3C7'
    },
    {
      id: 'time',
      title: 'Time',
      icon: Clock,
      color: '#D97706',
      bgLight: '#FEF3C7',
      bgClosed: '#FFFFFF',
      bgOpen: '#FFF9F0',
      borderColor: '#F2DFBC',
      question: 'How are local time and standard time related to longitude?',
      hint: "You'll learn about: Time Zones • Standard Time",
      hintColor: '#92400E',
      hintBg: '#FEF3C7'
    }
  ];

  const columnShell = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    minWidth: 0,
    background: 'linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%)',
    boxSizing: 'border-box',
    borderRadius: '16px',
    border: '1.5px solid #E5D5C0',
    overflow: 'hidden'
  };

  const headerShell = {
    flexShrink: 0,
    padding: '0 0 12px 0',
    borderBottom: '1.5px solid #F2DFBC',
    display: 'flex',
    alignItems: 'flex-end',
    boxSizing: 'border-box'
  };

  const bodyShell = {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 0 0 0',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    overflow: 'hidden'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: 0, background: '#fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes bookTurnFwd {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(-14deg) translateX(24px) scale(0.98); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        @keyframes bookTurnBack {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(14deg) translateX(-24px) scale(0.98); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        .book-slide-fwd { animation: bookTurnFwd 0.38s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .book-slide-back { animation: bookTurnBack 0.38s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
      `}</style>

      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', padding: '24px 28px 10px' }}>
        <div key={slide} className={turnDir === 'fwd' ? 'book-slide-fwd' : 'book-slide-back'} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* SLIDE 0: Every Place Has an Address */}
          {slide === 0 && (
            <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
              {/* Left Side: 60% */}
              <div style={{ 
                flex: '0 0 60%', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                gap: '12px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)'
              }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ ...HEADER_TITLE_STYLE, color: '#0A2540' }}>Every Place Has an Address</h2>
                </div>
                
                <div style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #F2DFBC',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  boxShadow: '0 4px 14px rgba(60,40,20,0.05)',
                  flexShrink: 0
                }}>
                  <p style={{ fontSize: '24px', color: '#3D2E24', lineHeight: 1.5, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                    A compass helps us describe where a place is. Explore the four main directions and see how each direction is shown on a compass.
                  </p>
                </div>
                
                <div style={{ flex: 1, minHeight: 0, display: 'flex', width: '100%', position: 'relative' }}>
                  <RotatingCompass />
                </div>
              </div>

              {/* Right Side: 40% (Cardinal Directions Information Panel) */}
              <div style={{ 
                flex: '1 1 auto', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                gap: '12px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)',
                boxSizing: 'border-box',
                minWidth: 0,
                overflow: 'hidden'
              }}>
                {/* Header matching typography hierarchy of the page */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em', 
                    color: '#B45309', 
                    fontFamily: '"Space Grotesk", sans-serif'
                  }}>
                    CARDINAL DIRECTIONS
                  </span>
                  <h3 style={{ 
                    fontFamily: '"Fraunces", serif', 
                    fontSize: 'clamp(1.8rem, 2.2vw, 2.2rem)', 
                    fontWeight: 800, 
                    color: '#0A2540', 
                    margin: 0, 
                    lineHeight: 1.2 
                  }}>
                    The 4 Main Directions
                  </h3>
                </div>

                {/* Unified List of 4 Educational Direction Items */}
                <div style={{ 
                  flex: 1, 
                  minHeight: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px' 
                }}>
                  {[
                    {
                      symbol: 'N',
                      name: 'North',
                      text: 'Points toward the North Pole. A magnetic compass needle always points North, and North is shown at the top of most maps.'
                    },
                    {
                      symbol: 'E',
                      name: 'East',
                      text: 'The direction where the Sun rises each morning. When you face North, East is directly to your right.'
                    },
                    {
                      symbol: 'S',
                      name: 'South',
                      text: 'Opposite to North, pointing toward the South Pole. On most maps, South is shown at the bottom.'
                    },
                    {
                      symbol: 'W',
                      name: 'West',
                      text: 'The direction where the Sun sets each evening. When you face North, West is directly to your left.'
                    }
                  ].map((item) => (
                    <div
                      key={item.symbol}
                      style={{
                        flex: '1 1 0%',
                        minHeight: 0,
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1.5px solid #F2DFBC',
                        padding: '8px 14px',
                        boxShadow: '0 2px 6px rgba(60,40,20,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxSizing: 'border-box'
                      }}
                    >
                      {/* Consistent Compass-Style Indicator */}
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '8px',
                        background: '#FAF4EB',
                        border: '1.5px solid #EADDCB',
                        color: '#0A2540',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '22px',
                        fontFamily: '"Space Grotesk", sans-serif',
                        flexShrink: 0
                      }}>
                        {item.symbol}
                      </div>

                      {/* Direction Info */}
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 800,
                          fontSize: '20px',
                          color: '#0A2540',
                          lineHeight: 1.2,
                          marginBottom: '2px'
                        }}>
                          {item.name}
                        </span>
                        <p style={{
                          margin: 0,
                          fontSize: '17px',
                          lineHeight: 1.38,
                          color: '#3D2E24',
                          fontWeight: 500
                        }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: What Will We Discover? */}
          {slide === 1 && (
            <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
              {/* Left Side: 60% */}
              <div style={{ 
                flex: '0 0 60%', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                gap: '12px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)'
              }}>
                <div style={{ flexShrink: 0, padding: '0 0 8px 0', borderBottom: '1.5px solid #F2DFBC' }}>
                  <h2 style={HEADER_TITLE_STYLE}>What Will We Discover?</h2>
                </div>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '14px', overflow: 'hidden', paddingTop: '8px' }}>
                  {cards.map((card) => {
                    return (
                      <div
                        key={card.id}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1.5px solid #F2DFBC',
                          padding: '16px 20px',
                          boxShadow: '0 2px 6px rgba(60,40,20,0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          boxSizing: 'border-box'
                        }}
                      >
                        {/* Icon Box */}
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '8px',
                          background: '#FAF4EB',
                          border: '1.5px solid #EADDCB',
                          color: '#0A2540',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <card.icon size={24} strokeWidth={2.5} />
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 800,
                            fontSize: '22px',
                            color: '#0A2540',
                            lineHeight: 1.2,
                            marginBottom: '4px'
                          }}>
                            {card.title}
                          </span>
                          <p style={{
                            margin: 0,
                            fontSize: '19px',
                            lineHeight: 1.38,
                            color: '#3D2E24',
                            fontWeight: 500
                          }}>
                            {card.question}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Explorer's Fact Box to fill empty space */}
                  <div style={{
                    marginTop: 'auto',
                    background: '#FEF3C7',
                    borderRadius: '12px',
                    border: '1.5px dashed #F59E0B',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 12px rgba(217,119,6,0.06)'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: '#FFFBEB',
                      color: '#D97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1.5px solid #FDE68A'
                    }}>
                      <Globe2 size={24} strokeWidth={2.5} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 800,
                        fontSize: '18px',
                        color: '#92400E',
                        lineHeight: 1.2,
                        display: 'block',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Explorer's Fact!
                      </span>
                      <p style={{
                        margin: 0,
                        fontSize: '17px',
                        lineHeight: 1.45,
                        color: '#78350F',
                        fontWeight: 600,
                        textAlign: 'justify'
                      }}>
                        Did you know? The oldest surviving world map is over 2,500 years old and was carved onto a tiny clay tablet in ancient Babylon!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: 40% (Mission) */}
              <div style={{ 
                flex: '1 1 auto', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                gap: '12px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)',
                boxSizing: 'border-box',
                minWidth: 0,
                overflow: 'hidden'
              }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '8px', gap: '16px' }}>
                  <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                    <h4 style={{ color: '#92400E', fontSize: '18px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Mission
                    </h4>
                    <p style={{ color: '#78350F', fontSize: '20px', lineHeight: 1.45, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                      By the end of this chapter, you will be able to locate places on Earth, read maps confidently, and understand how coordinates and time help us navigate our world.
                    </p>
                  </div>

                  {/* Why It Matters */}
                  <div style={{ background: '#FFFFFF', border: '1.5px solid #F2DFBC', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                    <h4 style={{ color: '#B45309', fontSize: '18px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Why It Matters
                    </h4>
                    <p style={{ color: '#3D2E24', fontSize: '18px', lineHeight: 1.45, margin: 0, fontWeight: 500, textAlign: 'justify', textJustify: 'inter-word' }}>
                      Imagine you are a sea captain sailing across the ocean, or a pilot flying a huge jet! Without maps, coordinates, and time zones, you wouldn't know where you are or when you'll arrive. Learning these tools turns you into a true Earth explorer!
                    </p>
                  </div>

                  {/* Explorer's Checklist to anchor the bottom */}
                  <div style={{ 
                    marginTop: 'auto', 
                    background: '#FAF4EB', 
                    border: '1.5px dashed #EADDCB', 
                    borderRadius: '16px', 
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <h4 style={{ color: '#92400E', fontSize: '18px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, textAlign: 'center' }}>
                      Explorer's Checklist
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#78350F', fontSize: '17px', fontWeight: 600, paddingLeft: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Compass size={20} color="#D97706" strokeWidth={2.5} /> <span>Grab your compass</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Map size={20} color="#D97706" strokeWidth={2.5} /> <span>Unfold your map</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Clock size={20} color="#D97706" strokeWidth={2.5} /> <span>Check your watch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {artZoomed && (
        <div
          onClick={() => setArtZoomed(false)}
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, zIndex: 100002, background: 'rgba(9,26,44,0.72)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 3vw, 48px)', cursor: 'zoom-out' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '1400px', background: '#FBF7EE', borderRadius: '18px', padding: 'clamp(12px, 1.6vw, 22px)', boxShadow: '0 30px 80px rgba(0,0,0,0.45)', cursor: 'default' }}>
            <button
              type="button"
              onClick={() => setArtZoomed(false)}
              aria-label="Close the figure (Esc)"
              style={{ position: 'absolute', top: '12px', right: '12px', width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #d6e0ec', background: '#fff', color: '#0E3556', display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 6px 16px rgba(14,42,69,0.16)' }}
            >
              <X size={20} />
            </button>
            <img
              src={compassMapImg}
              alt="Authentic brass directional navigation compass on atlas map"
              style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: '12px', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}

      {/* ============ BOOK SLIDE FOOTER ============ */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '14px', padding: '16px 28px', borderTop: '1px solid #E4EBF3', background: '#f8fafc'
      }}>
        {/* Page Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', fontWeight: 700, color: '#5c6b7a', fontSize: '15.5px' }}>
            Slide {slide + 1} of 2
          </span>
          <span style={{ display: 'inline-flex', gap: '8px' }}>
            {[0, 1].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: '11px', height: '11px', padding: 0, borderRadius: '50%', border: 'none',
                  cursor: 'pointer', background: i === slide ? '#D79A2B' : '#DCE4EC',
                  transition: 'all .25s', transform: i === slide ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </span>
        </div>

        {/* Nav Buttons parallel */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => {
              if (slide > 0) {
                goToSlide(slide - 1);
              } else if (onBack) {
                onBack();
              }
            }}
            disabled={slide === 0 && !onBack}
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif', fontWeight: 700, fontSize: '15.5px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0E3556', color: '#fff', border: 'none',
              borderRadius: '999px', padding: '12px 24px',
              cursor: (slide === 0 && !onBack) ? 'not-allowed' : 'pointer',
              opacity: (slide === 0 && !onBack) ? 0.35 : 1,
              boxShadow: '0 6px 16px rgba(14,42,69,.22)'
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} /> Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (isLast) { if (onBeginChapter) onBeginChapter(); return; }
              goToSlide(slide + 1);
            }}
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif', fontWeight: 700, fontSize: '15.5px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: isLast ? '#16a34a' : '#F59E0B', color: '#fff', border: 'none',
              borderRadius: '999px', padding: '12px 26px',
              cursor: 'pointer',
              boxShadow: isLast ? '0 6px 16px rgba(22,163,74,.3)' : '0 6px 16px rgba(245,158,11,.38)'
            }}
          >
            {isLast ? 'Start Exploring' : 'Next'} <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
