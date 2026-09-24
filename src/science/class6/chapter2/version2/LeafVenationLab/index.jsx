import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import coverImg from './activity25_cover.jpg';
import { venationAudio } from './venationAudio';

import specimen01HibiscusBlended from './specimen_01_hibiscus_blended.png';
import specimen02BananaBlended from './specimen_02_banana_blended.png';
import specimen03GrassBlended from './specimen_03_grass_blended.png';
import specimen04NeemBlended from './specimen_04_neem_blended.png';
import specimen05MangoBlended from './specimen_05_mango_blended.png';
import specimen06RoseBlended from './specimen_06_rose_blended.png';
import specimen07CompareBlended from './specimen_07_compare_blended.png';

// =========================================================================
// FULLSCREEN SPECIMEN SLIDES (ACTIVITY 2.5) — EXACT 16:9 HD SPECIMENS
// =========================================================================
const VENATION_SPECIMEN_SLIDES = [
  { id: 1, num: '01', name: 'Hibiscus Leaf', venation: 'Reticulate', image: specimen01HibiscusBlended },
  { id: 2, num: '02', name: 'Banana Leaf', venation: 'Parallel', image: specimen02BananaBlended },
  { id: 3, num: '03', name: 'Grass Leaf', venation: 'Parallel', image: specimen03GrassBlended },
  { id: 4, num: '04', name: 'Neem Leaf', venation: 'Reticulate', image: specimen04NeemBlended },
  { id: 5, num: '05', name: 'Mango Leaf', venation: 'Reticulate', image: specimen05MangoBlended },
  { id: 6, num: '06', name: 'Rose Leaf', venation: 'Reticulate', image: specimen06RoseBlended },
  { id: 7, num: '07', name: 'Different Leaves, Different Patterns', venation: 'Compare', image: specimen07CompareBlended }
];

// =========================================================================
// ACTIVITY 2.5 — cover plate plus the fullscreen specimen slide viewer.
// The interactive venation lab was retired; navigation still flows
// Activity 2.4 <- here -> Activity 2.6 Root Systems.
// =========================================================================
export default function LeafVenationLab({ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'cover', initialSpecimenIndex = 0 }) {
  const [phase, setPhase] = useState(initialPhase); // 'cover' | 'specimens'
  const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);

  // Title pill: shown for 7s on each slide, then auto-hides; moving the
  // cursor up near the top of the screen brings it back.
  const [showTitle, setShowTitle] = useState(true);
  const titleHideTimerRef = useRef(null);

  const scheduleTitleHide = () => {
    if (titleHideTimerRef.current) clearTimeout(titleHideTimerRef.current);
    titleHideTimerRef.current = setTimeout(() => setShowTitle(false), 7000);
  };

  useEffect(() => {
    if (phase !== 'specimens') return;
    setShowTitle(true);
    scheduleTitleHide();
    return () => {
      if (titleHideTimerRef.current) clearTimeout(titleHideTimerRef.current);
    };
  }, [phase, specimenIndex]);

  const handleSpecimenStageMouseMove = (e) => {
    if (e.clientY < 90 && !showTitle) {
      setShowTitle(true);
      scheduleTitleHide();
    }
  };

  const navBtn = (tone = 'ghost') => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '999px',
    fontSize: '18px',
    fontWeight: 900,
    fontFamily: '"Outfit", sans-serif',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    ...(tone === 'primary'
      ? {
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: '#FFFBEB',
          border: '2px solid rgba(253, 230, 138, 0.85)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
        }
      : tone === 'slides'
      ? {
          background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
          color: '#ECFDF5',
          border: '2px solid #86EFAC',
          boxShadow: '0 8px 22px rgba(22, 101, 52, 0.5)'
        }
      : {
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: '#FFFBEB',
          border: '2px solid rgba(253, 230, 138, 0.85)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
        })
  });

  // ---------------------------------------------------------------------
  // FULLSCREEN SPECIMEN SLIDES
  // ---------------------------------------------------------------------
  if (phase === 'specimens') {
    const activeSlide = VENATION_SPECIMEN_SLIDES[specimenIndex];
    const isLast = specimenIndex === VENATION_SPECIMEN_SLIDES.length - 1;

    return (
      <div
        onMouseMove={handleSpecimenStageMouseMove}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#07160E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 1000
        }}>
        <style>{`
          html, body, #root {
            overflow: hidden !important;
            height: 100vh !important;
          }
        `}</style>

        {/* Exact 16:9 aspect container, no pixel break */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vh * (16 / 9))',
          maxHeight: 'calc(100vw * (9 / 16))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={activeSlide.image}
            alt={activeSlide.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5))'
            }}
          />
        </div>

        {/* Title pill (Habitats Page style) */}
        {(() => {
          const displayTitle = activeSlide.name.replace(/\s*Leaf$/i, '');
          const isLong = displayTitle.length > 18;
          return (
            <div style={{
              position: 'absolute',
              top: showTitle ? '10px' : '-90px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '78vw',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '2px solid rgba(253, 230, 138, 0.85)',
              borderRadius: '14px',
              padding: isLong ? '8px 24px' : '8px 32px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
              opacity: showTitle ? 1 : 0,
              pointerEvents: showTitle ? 'auto' : 'none',
              transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
              zIndex: 1010
            }}>
              <h1 style={{
                margin: 0,
                fontSize: isLong ? '20px' : '34px',
                fontWeight: 900,
                fontFamily: '"Fraunces", Georgia, serif',
                color: '#FFFBEB',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
              }}>
                {displayTitle}
              </h1>
            </div>
          );
        })()}

        {/* Bottom left: previous slide, or back to the cover */}
        <button
          onClick={() => {
            if (specimenIndex > 0) {
              setSpecimenIndex(prev => prev - 1);
              venationAudio.playSwitch();
            } else {
              setPhase('cover');
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '26px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Bottom right: next slide, or finish */}
        <button
          onClick={() => {
            if (!isLast) {
              setSpecimenIndex(prev => prev + 1);
              venationAudio.playSwitch();
            } else if (onNext) {
              onNext();
            } else {
              setPhase('cover');
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '28px',
            padding: '11px 26px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isLast ? <>Next: Act 2.6 Root Systems <ArrowRight size={20} /></> : <>Next <ArrowRight size={20} /></>}
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // COVER
  // ---------------------------------------------------------------------
  return (
    <div style={{
      flex: 1,
      minHeight: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: `url(${coverImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#123A20',
      fontFamily: '"Outfit", sans-serif'
    }}>

      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '0 1.2rem 1rem',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {(onPreviousPage || onBackToDashboard) && (
            <button type="button" onClick={onPreviousPage || onBackToDashboard} style={navBtn()}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => { setSpecimenIndex(0); setPhase('specimens'); }}
          style={navBtn('primary')}
          aria-label="View the leaf specimens, then continue"
        >
          <span>Next</span>
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}
