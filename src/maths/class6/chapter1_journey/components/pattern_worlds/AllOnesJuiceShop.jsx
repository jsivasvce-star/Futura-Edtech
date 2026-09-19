import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Video, Eye, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * 1. ALL 1's — REALISTIC INDIAN KITCHEN / JUICE PREPARATION SETTING
 * Sequence: 1, 1, 1, 1, 1...
 *
 * Visual Concept:
 * - Photorealistic live-action HD video clip recording a clean Indian kitchen prep table.
 * - 5 identical glazed ceramic bowls neatly arranged in a straight horizontal row.
 * - Each bowl contains exactly ONE fresh whole organic orange.
 *
 * Camera Motion:
 * - Wide establishing shot showing all 5 bowls.
 * - Smooth real-camera dolly into Bowl 1 with optical depth-of-field focus.
 * - Smooth continuous pan across Bowl 2, Bowl 3, Bowl 4, Bowl 5.
 * - Clear focus on the single orange in each bowl before panning.
 * - Smooth transition back to wide shot.
 *
 * Pedagogical Goal:
 * - Visually communicates that every single bowl always has the exact same quantity: 1.
 */

const BOWLS = [
  { id: 1, name: 'Bowl 1', variety: 'Nagpur Orange', weight: '185g' },
  { id: 2, name: 'Bowl 2', variety: 'Nagpur Orange', weight: '182g' },
  { id: 3, name: 'Bowl 3', variety: 'Nagpur Orange', weight: '188g' },
  { id: 4, name: 'Bowl 4', variety: 'Nagpur Orange', weight: '184g' },
  { id: 5, name: 'Bowl 5', variety: 'Nagpur Orange', weight: '186g' }
];

// Camera timeline stages: 0 = Wide Shot, 1..5 = Close-up on Bowl 1..5
const SHOTS = [
  { id: 0, label: 'Wide Shot (All 5 Bowls)', bowlId: null, time: '00:00 - 00:03' },
  { id: 1, label: 'Close-Up: Bowl 1 (1 Orange)', bowlId: 1, time: '00:03 - 00:07' },
  { id: 2, label: 'Close-Up: Bowl 2 (1 Orange)', bowlId: 2, time: '00:07 - 00:11' },
  { id: 3, label: 'Close-Up: Bowl 3 (1 Orange)', bowlId: 3, time: '00:11 - 00:15' },
  { id: 4, label: 'Close-Up: Bowl 4 (1 Orange)', bowlId: 4, time: '00:15 - 00:19' },
  { id: 5, label: 'Close-Up: Bowl 5 (1 Orange)', bowlId: 5, time: '00:19 - 00:23' }
];

export default function AllOnesJuiceShop() {
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 100%
  const timerRef = useRef(null);

  const activeShot = SHOTS[currentShotIndex];
  const focusedBowlId = activeShot.bowlId;

  // Auto-play timer simulating natural continuous video playback
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setCurrentShotIndex((prev) => (prev + 1) % SHOTS.length);
    }, 3600);

    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video progress bar animation
  useEffect(() => {
    const totalShots = SHOTS.length;
    const progress = ((currentShotIndex + 1) / totalShots) * 100;
    setVideoProgress(progress);
  }, [currentShotIndex]);

  const handleSelectShot = (shotIdx) => {
    setCurrentShotIndex(shotIdx);
  };

  const handlePrev = () => {
    setCurrentShotIndex((prev) => (prev === 0 ? SHOTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentShotIndex((prev) => (prev + 1) % SHOTS.length);
  };

  const handleReset = () => {
    setCurrentShotIndex(0);
    setIsPlaying(true);
  };

  // Camera pan transform calculations for live camera movement
  // When focusedBowlId is set, camera zooms in and pans to center on that bowl
  const getCameraTransform = () => {
    if (focusedBowlId === null) {
      return {
        scale: 1,
        translateX: 0,
        translateY: 0
      };
    }
    // Bowl horizontal positions: 1: -34%, 2: -17%, 3: 0%, 4: +17%, 5: -34%
    const offsets = { 1: 34, 2: 17, 3: 0, 4: -17, 5: -34 };
    const panX = offsets[focusedBowlId] || 0;
    return {
      scale: 1.78,
      translateX: panX,
      translateY: 8
    };
  };

  const cameraTransform = getCameraTransform();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      userSelect: 'none',
      overflow: 'hidden',
      backgroundColor: '#0a0604',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* ── REALISTIC KITCHEN ENVIRONMENT BACKDROP ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/images/patterns/juice_shop_real.jpg"
          alt="Indian Kitchen Juice Counter Table"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'contrast(1.08) saturate(1.05) brightness(0.88)',
            transform: `scale(${cameraTransform.scale * 1.02}) translate(${cameraTransform.translateX * 0.2}%, ${cameraTransform.translateY * 0.2}%)`,
            transition: 'transform 1.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />

        {/* Natural window daylight gradient from left & warm interior ambience */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 25% 30%, rgba(255,237,213,0.12) 0%, rgba(10,6,4,0.4) 60%, rgba(5,3,2,0.85) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Polished Teak Kitchen Prep Counter Table Surface */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '42%',
          background: 'linear-gradient(180deg, rgba(82, 45, 18, 0.92) 0%, rgba(53, 27, 8, 0.98) 40%, rgba(30, 15, 4, 1) 100%)',
          borderTop: '2px solid rgba(255, 205, 140, 0.25)',
          boxShadow: 'inset 0 4px 18px rgba(255,255,255,0.12), 0 -12px 30px rgba(0,0,0,0.8)'
        }}>
          {/* Subtle wood grain reflection sheen */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,220,180,0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* ── TOP HUD / CAMERA METADATA BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        background: 'rgba(12, 7, 4, 0.88)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              boxShadow: isPlaying ? '0 0 8px #ef4444' : 'none',
              animation: isPlaying ? 'pulse 1.2s infinite' : 'none'
            }} />
            <span style={{ color: '#fca5a5', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em' }}>
              {isPlaying ? 'REC LIVE' : 'PAUSED'}
            </span>
          </div>

          <span style={{ color: '#f8fafc', fontSize: '0.92rem', fontWeight: 800 }}>
            Indian Kitchen Counter: <span style={{ color: '#fed7aa' }}>Row of Identical Ceramic Bowls</span>
          </span>
        </div>

        {/* Video Camera Controls & Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            color: '#cbd5e1',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(255,255,255,0.08)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Video size={13} color="#fb923c" />
            <span>4K UHD • 30 FPS • LENS 50mm f/2.0</span>
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: isPlaying ? 'rgba(249, 115, 22, 0.25)' : 'rgba(34, 197, 94, 0.25)',
              border: isPlaying ? '1px solid #ea580c' : '1px solid #16a34a',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause Clip' : 'Play Clip'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: '#cbd5e1',
              cursor: 'pointer'
            }}
            title="Reset to Wide Shot"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── CINEMATIC CAMERA STAGE: 5 IDENTICAL BOWLS WITH 1 ORANGE EACH ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Dynamic Camera Dolly Rig */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '38px',
          transform: `scale(${cameraTransform.scale}) translate(${cameraTransform.translateX}%, ${cameraTransform.translateY}%)`,
          transition: 'transform 1.4s cubic-bezier(0.25, 1, 0.5, 1)',
          transformOrigin: '50% 75%'
        }}>
          {/* Row of 5 Identical Ceramic Bowls */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '32px',
            padding: '10px'
          }}>
            {BOWLS.map((bowl) => {
              const isFocused = focusedBowlId === bowl.id;
              const isWide = focusedBowlId === null;
              // Depth-of-field optical blur: in close-up, non-focused bowls blur realistically
              const opticalBlur = isWide ? 0 : isFocused ? 0 : 3.5;
              const bowlOpacity = isWide ? 1 : isFocused ? 1 : 0.65;

              return (
                <div
                  key={bowl.id}
                  onClick={() => {
                    setCurrentShotIndex(bowl.id);
                    setIsPlaying(false);
                  }}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'filter 1.2s ease, opacity 1.2s ease, transform 0.4s ease',
                    filter: `blur(${opticalBlur}px)`,
                    opacity: bowlOpacity,
                    position: 'relative'
                  }}
                  title={`Click to focus on ${bowl.name} (1 Orange)`}
                >
                  {/* Camera Focus Reticle on Active Bowl */}
                  {isFocused && (
                    <div style={{
                      position: 'absolute',
                      top: '-32px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(234, 88, 12, 0.95)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                      boxShadow: '0 4px 14px rgba(234, 88, 12, 0.6)',
                      animation: 'fadeIn 0.4s ease'
                    }}>
                      <Eye size={12} strokeWidth={3} />
                      <span>{bowl.name}: EXACTLY 1 ORANGE</span>
                    </div>
                  )}

                  {/* Cast shadow of ceramic bowl onto wooden table surface */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    width: '130px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(10, 5, 2, 0.85) 0%, rgba(10, 5, 2, 0.4) 60%, transparent 100%)',
                    zIndex: 0
                  }} />

                  {/* ── REAL CERAMIC BOWL (White Porcelain with Glaze Highlights) ── */}
                  <div style={{
                    width: '128px',
                    height: '92px',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Outer Bowl Body - Ceramic Glazed Porcelain */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '128px',
                      height: '76px',
                      borderRadius: '8px 8px 60px 60px',
                      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 35%, #cbd5e1 75%, #94a3b8 100%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.85)',
                      boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -6px 14px rgba(0,0,0,0.25), 0 12px 24px rgba(0,0,0,0.6)',
                      overflow: 'hidden'
                    }}>
                      {/* Ceramic Specular Glaze Reflection Sheen */}
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        left: '12px',
                        width: '32px',
                        height: '50px',
                        background: 'radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.7) 0%, transparent 70%)',
                        transform: 'rotate(-20deg)',
                        pointerEvents: 'none'
                      }} />
                    </div>

                    {/* Ceramic Bowl Rim Ellipse with Depth */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      width: '124px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'radial-gradient(ellipse at 50% 50%, #64748b 0%, #94a3b8 40%, #cbd5e1 70%, #f1f5f9 90%, #ffffff 100%)',
                      border: '2px solid #f8fafc',
                      boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.15)'
                    }}>
                      {/* Inner Bowl Concave Shading */}
                      <div style={{
                        position: 'absolute',
                        inset: '3px',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse at 50% 65%, #334155 0%, #475569 50%, #94a3b8 95%)',
                        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.7)'
                      }} />
                    </div>

                    {/* ── THE ONE WHOLE FRESH ORANGE ── */}
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      width: '68px',
                      height: '68px',
                      zIndex: 3,
                      borderRadius: '50%',
                      background: `
                        radial-gradient(circle at 35% 30%, rgba(255,237,213,0.45) 0%, rgba(255,255,255,0) 40%),
                        radial-gradient(circle at 75% 75%, rgba(67,20,7,0.7) 0%, rgba(0,0,0,0) 50%),
                        radial-gradient(circle at 40% 38%, #fb923c 0%, #ea580c 45%, #c2410c 75%, #7c2d12 100%)
                      `,
                      boxShadow: `
                        inset 2px 2px 6px rgba(255,255,255,0.45),
                        inset -4px -4px 10px rgba(0,0,0,0.65),
                        0 8px 18px rgba(0,0,0,0.65)
                      `,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'rotate(-4deg)'
                    }}>
                      {/* Real Orange Rind Texture Overlay using Macro Photo */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        backgroundImage: 'url(/images/patterns/orange_macro.jpg)',
                        backgroundSize: '320%',
                        backgroundPosition: `${(bowl.id * 22) % 80}% ${(bowl.id * 31) % 80}%`,
                        mixBlendMode: 'overlay',
                        opacity: 0.65
                      }} />

                      {/* Natural Stem Calyx Button */}
                      <div style={{
                        position: 'absolute',
                        top: '5px',
                        left: '28px',
                        width: '7px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#14532d',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
                        border: '1px solid #166534'
                      }} />

                      {/* Quantity Label on Orange: Strictly 1 */}
                      <span style={{
                        position: 'relative',
                        zIndex: 4,
                        color: '#ffffff',
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.9)',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        userSelect: 'none'
                      }}>
                        1
                      </span>
                    </div>
                  </div>

                  {/* Bowl Position Tag on Counter Table */}
                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <span style={{
                      color: isFocused ? '#fed7aa' : '#cbd5e1',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textShadow: '0 2px 4px rgba(0,0,0,0.9)'
                    }}>
                      {bowl.name}
                    </span>
                    <span style={{
                      color: isFocused ? '#fb923c' : 'rgba(255,255,255,0.45)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em'
                    }}>
                      Count: 1
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── VIDEO SCRUBBER & CAMERA TIMELINE BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        background: 'rgba(10, 5, 2, 0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '10px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Continuous Video Timeline Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 700 }}>
            {activeShot.time.split(' - ')[0]}
          </span>

          <div style={{
            flex: 1,
            height: '6px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: `${videoProgress}%`,
              backgroundColor: '#ea580c',
              boxShadow: '0 0 10px #ea580c',
              transition: 'width 0.6s linear'
            }} />
          </div>

          <span style={{ color: '#94a3b8', fontSize: '0.74rem', fontFamily: 'monospace', fontWeight: 700 }}>
            00:23
          </span>
        </div>

        {/* Shot Selection Buttons (Wide, Bowl 1, Bowl 2, Bowl 3, Bowl 4, Bowl 5) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={handlePrev}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#f8fafc',
                padding: '4px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Previous Shot"
            >
              <ChevronLeft size={14} />
            </button>

            {SHOTS.map((shot, idx) => {
              const isActive = currentShotIndex === idx;
              return (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => handleSelectShot(idx)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    background: isActive
                      ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
                      : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    border: isActive
                      ? '1px solid #fdba74'
                      : '1px solid rgba(255,255,255,0.12)',
                    boxShadow: isActive ? '0 2px 8px rgba(234, 88, 12, 0.5)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {shot.id === 0 ? 'Wide View' : `Bowl ${shot.id}`}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleNext}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#f8fafc',
                padding: '4px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Next Shot"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Mathematical Discovery Banner */}
          <div style={{
            background: 'rgba(249, 115, 22, 0.16)',
            border: '1.5px solid #ea580c',
            borderRadius: '16px',
            padding: '4px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ffedd5',
            fontSize: '0.86rem',
            fontWeight: 800
          }}>
            <Sparkles size={14} color="#fb923c" />
            <span>
              <strong>All 1s Rule:</strong> Every bowl always has the same quantity: <strong style={{ color: '#fb923c', fontSize: '0.98rem' }}>1</strong> (1, 1, 1, 1, 1...)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
