import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Volume2, VolumeX, Maximize2, Minimize2, Lightbulb, Check } from 'lucide-react';

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
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef(null);

  const handleNext = onNextActivity || onNext;

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const toggleSound = () => {
    setMuted(prev => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setFullscreen(false);
    }
  };

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
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#12301D',
      fontFamily: '"Outfit", sans-serif'
    }}>

      {/* ------------------------- Header ------------------------- */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexShrink: 0 }}>
        <button type="button" onClick={onPreviousPage || onBackToDashboard} style={chipBtn}>
          <ArrowLeft size={18} />
          <span>{onPreviousPage ? 'Previous' : 'Dashboard'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <button type="button" onClick={toggleSound} style={chipBtn}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{muted ? 'Sound Off' : 'Sound On'}</span>
          </button>
          <button type="button" onClick={handleReset} style={chipBtn}>
            <RefreshCw size={18} />
            <span>Reset</span>
          </button>
          <button type="button" onClick={toggleFullscreen} style={{ ...chipBtn, padding: '8px 12px' }} aria-label="Fullscreen">
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          {handleNext && (
            <button
              type="button"
              onClick={handleNext}
              style={{
                ...chipBtn,
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: '2px solid #FDE68A',
                color: '#FFFFFF',
                boxShadow: '0 4px 18px rgba(217, 119, 6, 0.5), 0 0 16px rgba(245, 158, 11, 0.4)',
                padding: '8px 22px'
              }}
            >
              <span>Next</span>
              <ArrowRight size={19} />
            </button>
          )}
        </div>
      </div>

      {/* ------------------------- Body ------------------------- */}
      <div style={{
        flex: 1,
        minHeight: 0,
        marginTop: 'clamp(95px, 14vh, 160px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 62fr) minmax(0, 38fr)',
        gap: '14px'
      }}>
        {/* Video */}
        <div style={{
          minHeight: 0,
          background: 'rgba(4, 24, 15, 0.55)',
          border: '3px solid rgba(134, 239, 172, 0.65)',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 18px 42px rgba(0, 0, 0, 0.5)',
          display: 'flex'
        }}>
          <video
            ref={videoRef}
            src={introVideo}
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#07160E' }}
          />
        </div>

        {/* Briefing */}
        <div style={{
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: 'linear-gradient(170deg, rgba(14, 62, 39, 0.42) 0%, rgba(6, 34, 21, 0.52) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '3px solid rgba(134, 239, 172, 0.55)',
          borderRadius: '18px',
          padding: '10px 14px',
          boxShadow: '0 18px 42px rgba(0, 0, 0, 0.5)',
          overflowY: 'auto'
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
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', fontFamily: '"Fraunces", Georgia, serif' }}>
              What You&rsquo;ll Learn
            </span>
          </div>

          <p style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.35,
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
            padding: '8px 12px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 20px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '18px', fontWeight: 900, color: '#14532D',
              fontFamily: '"Fraunces", Georgia, serif', marginBottom: '5px'
            }}>
              <span>🌿</span> Key Points
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {KEY_POINTS.map(point => (
                <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: '#15803D', color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px'
                  }}>
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1F2937', lineHeight: 1.3 }}>
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
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderRadius: '14px',
                padding: '10px 22px',
                fontSize: '20px',
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(217, 119, 6, 0.55), 0 0 16px rgba(245, 158, 11, 0.4)',
                flexShrink: 0
              }}
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
