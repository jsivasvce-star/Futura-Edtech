import React, { useState } from 'react';
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
export default function LeafVenationLab({ onBackToDashboard, onPreviousPage, onNext }) {
  const [phase, setPhase] = useState('cover'); // 'cover' | 'specimens'
  const [specimenIndex, setSpecimenIndex] = useState(0);

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
          background: 'linear-gradient(135deg, #F5B534 0%, #D97706 100%)',
          color: '#FFFFFF',
          border: '2px solid #FDE68A',
          boxShadow: '0 8px 22px rgba(217, 119, 6, 0.45)'
        }
      : tone === 'slides'
      ? {
          background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
          color: '#ECFDF5',
          border: '2px solid #86EFAC',
          boxShadow: '0 8px 22px rgba(22, 101, 52, 0.5)'
        }
      : {
          background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.92) 0%, rgba(4, 24, 15, 0.95) 100%)',
          color: '#F8FAFC',
          border: '2px solid rgba(110, 231, 183, 0.45)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.40)'
        })
  });

  // ---------------------------------------------------------------------
  // FULLSCREEN SPECIMEN SLIDES
  // ---------------------------------------------------------------------
  if (phase === 'specimens') {
    const activeSlide = VENATION_SPECIMEN_SLIDES[specimenIndex];
    const isLast = specimenIndex === VENATION_SPECIMEN_SLIDES.length - 1;

    return (
      <div style={{
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

        {/* Slide counter */}
        <div style={{
          position: 'absolute',
          top: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(7, 22, 14, 0.82)',
          border: '2px solid rgba(134, 239, 172, 0.5)',
          borderRadius: '999px',
          padding: '7px 20px',
          fontSize: '17px',
          fontWeight: 900,
          color: '#D1FAE5',
          fontFamily: '"Outfit", sans-serif',
          zIndex: 1010
        }}>
          {activeSlide.num} / 07 · {activeSlide.name}
        </div>

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
            background: 'rgba(255, 255, 255, 0.92)',
            border: '2px solid #CBD5E1',
            borderRadius: '26px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 800,
            color: '#1E293B',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(4px)',
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
            background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
            border: '2px solid #86EFAC',
            borderRadius: '28px',
            padding: '11px 26px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 6px 22px rgba(22, 101, 52, 0.5)',
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
          {onBackToDashboard && (
            <button type="button" onClick={onBackToDashboard} style={navBtn()}>
              <ArrowLeft size={18} />
              <span>Dashboard</span>
            </button>
          )}
          {onPreviousPage && (
            <button type="button" onClick={onPreviousPage} style={navBtn()}>
              <ArrowLeft size={18} />
              <span>Previous</span>
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
