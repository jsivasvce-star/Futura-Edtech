import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Check } from 'lucide-react';

import bgImg from './media/activity28_bg.jpg';
import introVideo from './media/seed_intro.mp4';

const KEY_POINTS = [
  'Seeds absorb water (imbibition).',
  'The seed coat softens and expands.',
  'The size and weight of the seed increases.',
  'You can observe the different parts of a seed (seed coat, cotyledon, embryo).',
  'This helps the seed prepare for germination.'
];

// =========================================================================
// ACTIVITY 2.8 - Seed Dissection & Anatomy Station
// Video briefing over the botany-bench scene.
// =========================================================================
export default function SeedDissectionLab({ onBackToDashboard, onPreviousPage, onNextActivity, onNext }) {
  const videoRef = useRef(null);

  const handleNext = onNextActivity || onNext;

  const chipBtn = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.92) 0%, rgba(4, 24, 15, 0.95) 100%)',
    border: '2px solid rgba(110, 231, 183, 0.45)',
    color: '#F8FAFC',
    borderRadius: '12px',
    padding: '8px 16px',
    fontSize: '18px',
    fontWeight: 900,
    fontFamily: '"Outfit", sans-serif',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.42)'
  };

  return (
    <div style={{
      flex: 1,
      minHeight: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '0.7rem 1rem 0.9rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#12301D',
      fontFamily: '"Outfit", sans-serif'
    }}>

      {/* ------------------------- Body ------------------------- */}
      <div style={{
        flex: 1,
        minHeight: 0,
        marginTop: 'clamp(170px, 22vh, 245px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 62fr) minmax(0, 38fr)',
        gap: '14px'
      }}>
        {/* Video */}
        <div style={{
          minHeight: 0,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxHeight: '100%',
            background: 'rgba(4, 24, 15, 0.55)',
            border: '3px solid rgba(134, 239, 172, 0.65)',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 18px 42px rgba(0, 0, 0, 0.5)',
            lineHeight: 0
          }}>
            <video
              ref={videoRef}
              src={introVideo}
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', display: 'block', background: '#07160E' }}
            />
          </div>
        </div>

        {/* Briefing */}
        <div style={{
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          background: 'linear-gradient(170deg, rgba(14, 62, 39, 0.42) 0%, rgba(6, 34, 21, 0.52) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '3px solid rgba(134, 239, 172, 0.55)',
          borderRadius: '18px',
          padding: '8px 14px',
          boxShadow: '0 18px 42px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(180deg, #1F7A46 0%, #14532D 100%)',
            border: '2px solid rgba(134, 239, 172, 0.6)',
            borderRadius: '12px',
            padding: '6px 14px',
            flexShrink: 0
          }}>
            <Lightbulb size={20} color="#FCD34D" />
            <span style={{ fontSize: '21px', fontWeight: 900, color: '#FFFFFF', fontFamily: '"Fraunces", Georgia, serif' }}>
              What You&rsquo;ll Learn
            </span>
          </div>

          <p style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#EAF7EE',
            flexShrink: 0
          }}>
            In this activity, you will discover how seeds absorb water and how their structure
            changes during hydration. You will also learn to observe the different parts of a seed
            and understand how it prepares for germination.
          </p>

          {/* Key points on a parchment card */}
          <div style={{
            background: 'linear-gradient(170deg, #F6F1DC 0%, #EDE6CA 100%)',
            border: '2px solid rgba(120, 83, 32, 0.35)',
            borderRadius: '14px',
            padding: '7px 12px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 20px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '18px', fontWeight: 900, color: '#14532D',
              fontFamily: '"Fraunces", Georgia, serif', marginBottom: '4px'
            }}>
              <span>🌿</span> Key Points
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {KEY_POINTS.map(point => (
                <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{
                    width: '19px', height: '19px', borderRadius: '50%',
                    background: '#15803D', color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px'
                  }}>
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', lineHeight: 1.25 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {handleNext && (
            <button
              type="button"
              onClick={handleNext}
              style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: '#FFFBEB',
                border: '2px solid rgba(253, 230, 138, 0.85)',
                borderRadius: '26px',
                padding: '10px 22px',
                fontSize: '20px',
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
                flexShrink: 0,
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.borderColor = '#FEF08A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(253, 230, 138, 0.85)';
              }}
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Floating bottom-left: previous page */}
      <button
        type="button"
        onClick={onPreviousPage || onBackToDashboard}
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
        <ArrowLeft size={20} />
        <span>{onPreviousPage ? 'Previous' : 'Dashboard'}</span>
      </button>
    </div>
  );
}
