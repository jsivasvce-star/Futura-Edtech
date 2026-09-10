import React, { useState, useEffect, Suspense } from 'react';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { voiceService, ELEVENLABS_VOICES } from '../../../../services/elevenLabsService';

import traffic1 from '../../../../assets/traffic_1.jpeg';
import traffic2 from '../../../../assets/traffic_2.jpeg';
import traffic3 from '../../../../assets/traffic_3.jpeg';
import traffic4 from '../../../../assets/traffic_4.jpeg';
import traffic5 from '../../../../assets/traffic_5.jpeg';
import traffic6 from '../../../../assets/traffic_6.jpeg';
import traffic7 from '../../../../assets/traffic_7.jpeg';
import traffic8 from '../../../../assets/traffic_8.jpeg';

const TRAFFIC_SLIDES = [
  {
    id: 1,
    src: traffic1,
    alt: 'traffic 1',
    subtitle: "Let's look at this road junction. Right now, the traffic signal is Red, and all the vehicles have stopped."
  },
  {
    id: 2,
    src: traffic2,
    alt: 'traffic 2',
    subtitle: "The signal doesn't stay the same forever. The colours keep changing in a specific order. Let's pause here at Yellow."
  },
  {
    id: 3,
    src: traffic3,
    alt: 'traffic 3',
    subtitle: "Can you guess what comes after Yellow? Before the real signal changes, make your choice!"
  },
  {
    id: 4,
    src: traffic4,
    alt: 'traffic 4',
    subtitle: "Let’s look at the pattern in order: It starts with Red, goes to Green, then Yellow, and finally... another Red."
  },
  {
    id: 5,
    src: traffic5,
    alt: 'traffic 5',
    subtitle: "Did you notice? The sequence doesn't stop. After Yellow, it jumps right back to the beginning!"
  },
  {
    id: 6,
    src: traffic6,
    alt: 'traffic 6',
    subtitle: "Since it keeps repeating, we can arrange it into a circle. This is called a repeating cycle: Red, Green, Yellow, and back to Red."
  },
  {
    id: 7,
    src: traffic7,
    alt: 'traffic 7',
    subtitle: "Now that we know the secret cycle, we can predict what happens next! If we know the pattern, we can always find the next colour."
  },
  {
    id: 8,
    src: traffic8,
    alt: 'traffic 8',
    subtitle: "We can even predict what happens after many changes! By moving 5 steps around our cycle starting from Red, we can easily see we will land on Yellow."
  }
];

function FullscreenExplore1_1({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const isFirstSlide = currentSlide === 0;

  // Active state logic:
  // Image 1: ‹ is subdued, › is bright yellow/orange
  // Images 2–8: ‹ is bright yellow/orange, › is bright yellow/orange
  const isPrevHighlighted = !isFirstSlide;
  const isNextHighlighted = true;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < TRAFFIC_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onClose]);

  // Compute character ranges for exact word-by-word tracking
  const wordsWithOffsets = React.useMemo(() => {
    const text = TRAFFIC_SLIDES[currentSlide]?.subtitle || '';
    const wordTokens = text.split(' ');
    let charAcc = 0;
    return wordTokens.map((word, idx) => {
      const start = charAcc;
      const end = start + word.length;
      charAcc += word.length + 1;
      return { word, start, end, idx };
    });
  }, [currentSlide]);

  // Voice narration synchronization with real-time word boundaries
  useEffect(() => {
    setCurrentWordIndex(-1);
    const textToSpeak = TRAFFIC_SLIDES[currentSlide]?.subtitle;
    if (textToSpeak && voiceService) {
      voiceService.speak({
        text: textToSpeak,
        voiceId: ELEVENLABS_VOICES?.teacher || 'Ps8lsQuJKZHMxxDU1tff',
        onBoundary: (charIndex) => {
          if (charIndex === -1) {
            setCurrentWordIndex(-1);
            return;
          }
          const found = wordsWithOffsets.findIndex(w => charIndex >= w.start && charIndex <= w.end);
          if (found !== -1) {
            setCurrentWordIndex(found);
          } else {
            for (let i = wordsWithOffsets.length - 1; i >= 0; i--) {
              if (charIndex >= wordsWithOffsets[i].start) {
                setCurrentWordIndex(i);
                break;
              }
            }
          }
        },
      });
    }

    return () => {
      if (voiceService) {
        voiceService.stop();
      }
    };
  }, [currentSlide, wordsWithOffsets]);

  const activeImage = TRAFFIC_SLIDES[currentSlide];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
    }}>
      {/* ── SEAMLESS AMBIENT BACKDROP (ELIMINATES EMPTY BARS / GAPS) ── */}
      <img
        src={activeImage.src}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          filter: 'blur(32px) brightness(0.35)',
          transform: 'scale(1.15)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* ── FULLY VISIBLE, UNCROPPED, UNDISTORTED FOREGROUND IMAGE ── */}
      <img
        key={activeImage.id}
        src={activeImage.src}
        alt={activeImage.alt}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          display: 'block',
          margin: 0,
          padding: 0,
          userSelect: 'none',
        }}
        loading="eager"
      />

      {/* ── 8 SMALL SLIDE DOTS AT THE TOP (INSIDE IMAGE) ── */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}>
        {TRAFFIC_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                padding: 0,
                margin: 0,
                background: isActive ? '#f59e0b' : 'transparent',
                border: isActive ? '1.5px solid #f59e0b' : '1.5px solid rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.8))',
              }}
            />
          );
        })}
      </div>

      {/* ── CLEAN ACTIVE WORD-BY-WORD SPOKEN TEXT IN CENTRE (NO BOX/CARD) ── */}
      {currentWordIndex >= 0 && wordsWithOffsets[currentWordIndex] && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 25,
            pointerEvents: 'none',
            userSelect: 'none',
            textAlign: 'center',
            width: '90vw',
            maxWidth: '1100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            key={`${currentSlide}-${currentWordIndex}`}
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.95), 0 0 32px rgba(0, 0, 0, 0.85), 0 2px 4px rgba(0, 0, 0, 1)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.35)',
              display: 'inline-block',
            }}
          >
            {wordsWithOffsets[currentWordIndex].word}
          </span>
        </div>
      )}

      {/* ── MINIMAL CHEVRON NAVIGATION: ‹ (BOTTOM-LEFT) ── */}
      <button
        onClick={handlePrev}
        disabled={isFirstSlide}
        aria-label="Previous"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          color: isPrevHighlighted ? '#f59e0b' : 'rgba(255, 255, 255, 0.25)',
          fontSize: '3.5rem',
          lineHeight: 1,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '300',
          cursor: isPrevHighlighted ? 'pointer' : 'not-allowed',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85))',
          transition: 'color 0.2s ease',
          zIndex: 20,
          userSelect: 'none',
        }}
      >
        ‹
      </button>

      {/* ── MINIMAL CHEVRON NAVIGATION: › (BOTTOM-RIGHT) ── */}
      <button
        onClick={handleNext}
        aria-label="Next"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          color: isNextHighlighted ? '#f59e0b' : 'rgba(255, 255, 255, 0.25)',
          fontSize: '3.5rem',
          lineHeight: 1,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '300',
          cursor: currentSlide < TRAFFIC_SLIDES.length - 1 ? 'pointer' : 'default',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85))',
          transition: 'color 0.2s ease',
          zIndex: 20,
          userSelect: 'none',
        }}
      >
        ›
      </button>
    </div>
  );
}

export default function InteractiveModal({
  node,
  onClose,
  onCompleteNode
}) {
  if (node.id === '1.1') {
    return (
      <ErrorBoundary>
        <Suspense fallback={null}>
          <FullscreenExplore1_1 onClose={onClose} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return null;
}
