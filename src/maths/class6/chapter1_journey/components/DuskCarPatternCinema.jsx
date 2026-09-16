import React, { useState, useEffect, useRef } from 'react';

// ── REALISTIC DUSK DRIVE PATTERN CINEMA ──
// High-end cinematic real-world car footage at dusk with continuous tracking camera,
// realistic roadside milestone markers, natural vehicular physics, physical taxi meter HUD,
// and step-by-step repeated addition progression (+₹15 per KM).

export default function DuskCarPatternCinema() {
  const videoRef = useRef(null);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [totalKm, setTotalKm] = useState(0);

  // Each 2.5 seconds of footage corresponds to 1 Kilometre milestone passed
  const SECONDS_PER_KM = 2.5;

  // Handle continuous tracking and distance/fare sync
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setPlaybackTime(t);
    const km = Math.floor(t / SECONDS_PER_KM);
    setTotalKm(km);
  };

  // Base fare ₹30 at 0 KM, then increases by ₹15 after every single kilometre
  const currentFare = 30 + totalKm * 15;

  // Step progression data for mathematical clarity
  const steps = [
    { km: 0, fare: 30, label: 'Start Fare' },
    { km: 1, fare: 45, inc: '+₹15' },
    { km: 2, fare: 60, inc: '+₹15' },
    { km: 3, fare: 75, inc: '+₹15' },
    { km: 4, fare: 90, inc: '+₹15' }
  ];

  // Milestone marker animation trigger: shows marker flash every time new KM is reached
  const milestoneProgress = (playbackTime % SECONDS_PER_KM) / SECONDS_PER_KM;
  const isPassingMilestone = milestoneProgress > 0.75;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#090d16',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* ── CINEMATIC REAL-WORLD 3D FOOTAGE VIEWPORT ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#000000' }}>
        {/* Real-life dusk drive automobile footage */}
        <video
          ref={videoRef}
          src="/videos/car.mp4"
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Cinematic Lens Vignette & Atmospheric Depth Grading */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 100px rgba(5, 7, 14, 0.7)',
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.65) 100%)'
        }} />

        {/* ── REALISTIC ROADSIDE KILOMETRE MILESTONE MARKER (IN-CAMERA PERSPECTIVE) ── */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          right: '24px',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          transform: isPassingMilestone ? 'scale(1.06) translateY(-4px)' : 'scale(1.0) translateY(0)',
          zIndex: 10
        }}>
          {/* Milestone 3D Post Structure (Indian Highway Style Curved Milestone) */}
          <div style={{
            width: '84px',
            background: '#ffffff',
            borderRadius: '42px 42px 6px 6px',
            border: '2.5px solid #0f172a',
            boxShadow: isPassingMilestone
              ? '0 12px 28px rgba(245, 158, 11, 0.6), 0 4px 12px rgba(0,0,0,0.5)'
              : '0 8px 20px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Curved Yellow Top Section */}
            <div style={{
              width: '100%',
              height: '38px',
              background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '2px solid #0f172a'
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '0.5px'
              }}>
                HIGHWAY
              </span>
            </div>

            {/* White Lower Body with Distance */}
            <div style={{
              padding: '6px 4px 8px 4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1px'
            }}>
              <span style={{
                fontSize: '1.55rem',
                fontWeight: 900,
                color: '#0f172a',
                fontFamily: '"Times New Roman", Times, Georgia, serif',
                lineHeight: 1
              }}>
                {totalKm}
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#475569',
                letterSpacing: '1px'
              }}>
                KM
              </span>
            </div>
          </div>

          {/* Concrete Footing Pedestal */}
          <div style={{
            width: '96px',
            height: '10px',
            background: '#475569',
            borderRadius: '3px',
            marginTop: '-2px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
          }} />

          {/* Milestone Label */}
          <span style={{
            marginTop: '6px',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#fef08a',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.5px'
          }}>
            MILESTONE {totalKm} KM
          </span>
        </div>

        {/* ── IN-CAR DIGITAL TAXI FAREMETER (PHYSICAL VEHICLE INTERIOR STYLE) ── */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(11, 17, 32, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(245, 158, 11, 0.55)',
          borderRadius: '12px',
          padding: '10px 18px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          {/* Fare Amount */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#94a3b8',
              letterSpacing: '1px'
            }}>
              TAXI FARE
            </span>
            <span style={{
              fontSize: '2.1rem',
              fontWeight: 900,
              color: '#fef08a',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              lineHeight: 1.1,
              textShadow: '0 0 14px rgba(234, 179, 8, 0.5)'
            }}>
              ₹{currentFare}
            </span>
          </div>

          <div style={{ width: '1.5px', height: '40px', background: 'rgba(255,255,255,0.18)' }} />

          {/* Distance Covered */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#94a3b8',
              letterSpacing: '1px'
            }}>
              DISTANCE
            </span>
            <span style={{
              fontSize: '1.55rem',
              fontWeight: 900,
              color: '#38bdf8',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              lineHeight: 1.1
            }}>
              {totalKm} <span style={{ fontSize: '0.95rem', color: '#94a3b8' }}>KM</span>
            </span>
          </div>

          <div style={{ width: '1.5px', height: '40px', background: 'rgba(255,255,255,0.18)' }} />

          {/* Rate Per KM badge */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1.5px solid #f59e0b',
            borderRadius: '8px',
            padding: '5px 10px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fde047', display: 'block' }}>
              FIXED STEP RATE
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff' }}>
              +₹15 / KM
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SYNCHRONIZED EQUAL-STEP MATHEMATICAL SEQUENCE BAR ── */}
      <div style={{
        background: 'linear-gradient(180deg, #090d16 0%, #050810 100%)',
        borderTop: '2px solid rgba(245, 158, 11, 0.45)',
        padding: '10px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.15rem' }}>🚕</span>
            <span style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.25rem)',
              fontWeight: 900,
              color: '#f8fafc',
              fontFamily: '"Times New Roman", Times, Georgia, serif'
            }}>
              Equal-Distance Travel & Repeated Addition Pattern:
            </span>
          </div>
          <span style={{
            fontSize: '0.88rem',
            fontWeight: 800,
            color: '#fbbf24',
            background: 'rgba(245, 158, 11, 0.14)',
            padding: '3px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.35)'
          }}>
            Rule: Add ₹15 for every 1 km travelled
          </span>
        </div>

        {/* Step-by-Step Chain */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {steps.map((s, idx) => {
            const hasReached = totalKm >= s.km;
            const isCurrent = totalKm === s.km;

            return (
              <React.Fragment key={s.km}>
                {idx > 0 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1px'
                  }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      color: hasReached ? '#f59e0b' : '#64748b'
                    }}>
                      +₹15
                    </span>
                    <span style={{
                      color: hasReached ? '#f59e0b' : '#475569',
                      fontSize: '1.05rem',
                      lineHeight: 1
                    }}>
                      →
                    </span>
                  </div>
                )}
                <div style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: isCurrent
                    ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)'
                    : hasReached
                    ? 'rgba(30, 41, 59, 0.95)'
                    : 'rgba(15, 23, 42, 0.5)',
                  border: `1.5px solid ${isCurrent ? '#f59e0b' : hasReached ? '#3b82f6' : '#334155'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '70px',
                  transition: 'all 0.25s ease',
                  boxShadow: isCurrent ? '0 0 16px rgba(245, 158, 11, 0.45)' : 'none'
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: isCurrent ? '#fef08a' : hasReached ? '#94a3b8' : '#64748b'
                  }}>
                    {s.km} km
                  </span>
                  <span style={{
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    color: isCurrent ? '#ffffff' : hasReached ? '#38bdf8' : '#64748b',
                    fontFamily: '"Times New Roman", Times, Georgia, serif'
                  }}>
                    ₹{s.fare}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
