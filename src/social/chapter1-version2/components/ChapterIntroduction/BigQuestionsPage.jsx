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
      color: '#7C3AED',
      bgLight: '#F3E8FF',
      bgClosed: '#FFFFFF',
      bgOpen: '#FFF9F0',
      borderColor: '#F2DFBC',
      question: 'What are coordinates? How can latitude and longitude be used to mark any location on the Earth?',
      hint: "You'll learn about: Latitude • Longitude • Globe",
      hintColor: '#5B21B6',
      hintBg: '#EDE9FE'
    },
    {
      id: 'time',
      title: 'Time',
      icon: Clock,
      color: '#16A34A',
      bgLight: '#DCFCE7',
      bgClosed: '#FFFFFF',
      bgOpen: '#FFF9F0',
      borderColor: '#F2DFBC',
      question: 'How are local time and standard time related to longitude?',
      hint: "You'll learn about: Time Zones • Standard Time",
      hintColor: '#166534',
      hintBg: '#DCFCE7'
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
            <div style={{ ...columnShell, flex: 1, padding: '20px 24px' }}>
              <div style={headerShell}>
                <h2 style={HEADER_TITLE_STYLE}>Every Place Has an Address</h2>
              </div>
              <div style={{ ...bodyShell, position: 'relative', zIndex: 1, gap: '14px' }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #F2DFBC',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  boxShadow: '0 4px 14px rgba(60,40,20,0.05)',
                  flexShrink: 0
                }}>
                  <p style={{ fontSize: '22px', color: '#3D2E24', lineHeight: 1.6, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                    Your home has an address, and so does every place on Earth. In this chapter you will learn how maps locate places, how latitude and longitude give each one an exact address, and why the time on the clock changes as you travel.
                  </p>
                </div>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', alignSelf: 'stretch', width: '100%', position: 'relative' }}>
                  <RotatingCompass />
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: What Will We Discover? */}
          {slide === 1 && (
            <div style={{ ...columnShell, flex: 1, padding: '20px 24px' }}>
              <div style={headerShell}>
                <h2 style={HEADER_TITLE_STYLE}>What Will We Discover?</h2>
              </div>
              <div style={bodyShell}>
                {/* Accordion Concept Cards */}
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
                  {cards.map((card) => {
                    const isOpen = activeCardId === card.id;
                    return (
                      <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        style={{
                          background: isOpen ? card.bgOpen : card.bgClosed,
                          border: isOpen ? `2px solid ${card.color}` : `1.5px solid ${card.borderColor}`,
                          borderLeft: `6px solid ${card.color}`,
                          padding: '16px 20px',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: isOpen ? '10px' : '0px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isOpen ? '0 4px 14px rgba(60,40,20,0.08)' : '0 2px 6px rgba(60,40,20,0.03)',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              background: card.bgLight,
                              color: card.color,
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <card.icon size={22} />
                            </div>
                            <h4 style={{ margin: 0, color: '#78350F', fontSize: '28px', fontWeight: 900, lineHeight: 1.2, fontFamily: '"Fraunces", serif' }}>
                              {card.title}
                            </h4>
                          </div>
                          <span style={{ color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: isOpen ? card.bgLight : 'transparent', transition: 'all 0.2s' }}>
                            <ChevronRight size={24} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                          </span>
                        </div>
                        {isOpen && (
                          <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ margin: 0, color: '#3D2E24', fontSize: '21px', lineHeight: 1.55, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                              {card.question}
                            </p>
                            <div>
                              <span style={{ background: card.hintBg, color: card.hintColor, display: 'inline-block', padding: '5px 12px', borderRadius: '8px', fontSize: '19px', fontWeight: 800 }}>
                                {card.hint}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Mission Box */}
                <div style={{ flexShrink: 0, marginTop: '8px' }}>
                  <div style={{ background: '#FEF3C7', border: '1.5px solid #FDE68A', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 12px rgba(60,40,20,0.04)' }}>
                    <h4 style={{ color: '#92400E', fontSize: '18px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Mission
                    </h4>
                    <p style={{ color: '#78350F', fontSize: '21px', lineHeight: 1.5, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                      By the end of this chapter, you will be able to locate places on Earth, read maps confidently, and understand how coordinates and time help us navigate our world.
                    </p>
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
