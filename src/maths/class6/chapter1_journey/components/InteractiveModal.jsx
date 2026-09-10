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

  // Voice narration synchronization, slower educational pace, and exact 15-second slide duration
  useEffect(() => {
    let slideTimer = null;
    let isMounted = true;
    const slideStartTime = Date.now();
    const TOTAL_SLIDE_DURATION_MS = 15000; // Exactly 15 seconds per Explore image

    setCurrentWordIndex(-1);

    const advanceSlide = () => {
      setCurrentSlide((prev) => {
        if (prev < TRAFFIC_SLIDES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    };

    const textToSpeak = TRAFFIC_SLIDES[currentSlide]?.subtitle;
    if (textToSpeak && voiceService) {
      voiceService.speak({
        text: textToSpeak,
        role: 'young_indian_male',
        voiceId: ELEVENLABS_VOICES?.young_indian_male || '4w024U7w6P92yq0716Qc',
        onBoundary: (charIndex) => {
          if (!isMounted) return;
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
        onEnd: () => {
          if (!isMounted) return;
          // 1. Remove the active-word highlight so complete text displays normally in Times New Roman
          setCurrentWordIndex(-1);

          // 2. Complete the remainder of the exact 15-second total duration
          const elapsed = Date.now() - slideStartTime;
          const remaining = Math.max(1000, TOTAL_SLIDE_DURATION_MS - elapsed);
          
          if (slideTimer) clearTimeout(slideTimer);
          slideTimer = setTimeout(() => {
            if (isMounted) advanceSlide();
          }, remaining);
        },
      });

      // Ensure audio playback rate is set to a calm, comfortable educational speed (0.75x)
      if (voiceService.currentAudio) {
        voiceService.currentAudio.playbackRate = 0.75;
      }
    }

    // Fixed 15-second timer
    slideTimer = setTimeout(() => {
      if (isMounted) advanceSlide();
    }, TOTAL_SLIDE_DURATION_MS);

    return () => {
      isMounted = false;
      if (slideTimer) clearTimeout(slideTimer);
      if (voiceService) voiceService.stop();
    };
  }, [currentSlide, wordsWithOffsets]);

  // Support Escape key to exit fullscreen modal if needed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
      flexDirection: 'column',
      backgroundColor: '#020617',
    }}>
      {/* ── TOP 90%: FULL-WIDTH COMPLETE ORIGINAL IMAGE (ZERO CROPPING, ZERO DISTORTION) ── */}
      <div style={{
        width: '100%',
        height: '90vh',
        flex: '0 0 90vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          key={activeImage.id}
          src={activeImage.src}
          alt={activeImage.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            margin: 0,
            padding: 0,
            userSelect: 'none',
          }}
          loading="eager"
        />
      </div>

      {/* ── BOTTOM 10%: COMPACT CLEAN NARRATION TEXT AREA (TIMES NEW ROMAN) ── */}
      <div style={{
        width: '100%',
        height: '10vh',
        flex: '0 0 10vh',
        backgroundColor: '#0b0f19',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}>
        <p style={{
          fontFamily: '"Times New Roman", Times, Georgia, serif',
          fontSize: 'clamp(1.05rem, 1.55vw, 1.4rem)',
          lineHeight: 1.3,
          color: '#f8fafc',
          margin: 0,
          textAlign: 'center',
          maxWidth: '1200px',
        }}>
          {wordsWithOffsets.map(({ word, idx }) => {
            const isCurrent = currentWordIndex === idx;
            return (
              <span
                key={idx}
                style={{
                  display: 'inline',
                  color: isCurrent ? '#fbbf24' : '#f8fafc',
                  fontWeight: isCurrent ? 700 : 400,
                  textDecoration: isCurrent ? 'underline' : 'none',
                  textUnderlineOffset: '5px',
                  textDecorationColor: '#f59e0b',
                  backgroundColor: isCurrent ? 'rgba(245, 158, 11, 0.16)' : 'transparent',
                  padding: '1px 3px',
                  borderRadius: '3px',
                  transition: 'color 0.12s ease, background-color 0.12s ease',
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
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

