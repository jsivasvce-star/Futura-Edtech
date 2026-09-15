import React, { useState, useEffect } from 'react';
import sunImg from '../../../../assets/realistic_sun.jpg';
import moonImg from '../../../../assets/moon_texture.jpg';

export default function PatternWhyExperience() {
  const [stage, setStage] = useState(1);
  const [showDNA, setShowDNA] = useState(false);

  // Auto-advance some stages or handle interactions
  const handlePatternChoice = (isCorrect) => {
    if (isCorrect) {
      setStage(3);
    }
  };

  if (showDNA) {
    return (
      <div style={{
        width: '100%', height: '100%', backgroundColor: '#020617',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* UPPER ANIMATION AREA (85%) */}
        <div style={{
          width: '100%', flex: '0 0 85%', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {/* Simple CSS DNA Approximation */}
          <div style={{ position: 'relative', width: '200px', height: '400px', perspective: '1000px', transform: 'scale(0.8)' }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: `${i * 30}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                animation: `dna-spin 4s linear infinite`,
                animationDelay: `${i * -0.3}s`,
                transformStyle: 'preserve-3d'
              }}>
                <div style={{
                  position: 'absolute', left: '-10px', top: '-8px', width: '20px', height: '20px',
                  borderRadius: '50%', backgroundColor: '#3b82f6',
                  boxShadow: '0 0 15px #3b82f6',
                  transform: 'rotateY(0deg) translateZ(50px)'
                }} />
                <div style={{
                  position: 'absolute', right: '-10px', top: '-8px', width: '20px', height: '20px',
                  borderRadius: '50%', backgroundColor: '#10b981',
                  boxShadow: '0 0 15px #10b981',
                  transform: 'rotateY(180deg) translateZ(50px)'
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* LOWER TEXT PANEL (15%) */}
        <div style={{
          flex: '0 0 15%', width: '100%', backgroundColor: '#fdfcf8',
          borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
          boxShadow: '0 -4px 15px rgba(0,0,0,0.1)', zIndex: 10, boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2rem', gap: '2rem', overflow: 'hidden'
        }}>
          <div style={{ flex: '0 0 25%' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>
              Patterns in Life
            </h2>
          </div>
          <div style={{ flex: '1' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
              Just like orbits in space, our DNA contains repeating mathematical patterns. Recognizing these patterns helps scientists understand genetics and create medical applications to heal and protect life.
            </p>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <button onClick={() => { setShowDNA(false); setStage(1); }} style={btnStyle}>
              Back to Space
            </button>
          </div>
        </div>

        <style>{`
          @keyframes dna-spin {
            0% { transform: translateX(-50%) rotateY(0deg); }
            100% { transform: translateX(-50%) rotateY(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%', backgroundColor: '#000',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* UPPER ANIMATION AREA (85%) */}
      <div style={{
        position: 'relative', width: '100%', flex: '0 0 85%', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1200px', zIndex: 1
      }}>
        {/* Background Stars */}
        <div style={{
          position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #0f172a 0%, #000 100%)', zIndex: 0
        }} />

        {/* Global Scaler to simulate object-fit contain without overflowing */}
        <div style={{ position: 'relative', width: '800px', height: '600px', transform: 'scale(0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Sun */}
          <div style={{
            position: 'absolute', width: '150px', height: '150px',
            borderRadius: '50%',
            background: `url(${sunImg}) center/cover`,
            boxShadow: '0 0 100px #f59e0b, inset 0 0 50px #ea580c',
            zIndex: 2,
            transition: 'all 2s ease-in-out',
            transform: stage >= 4 ? 'scale(0.7) translateX(-250px)' : 'scale(1) translateX(0)',
            animation: 'spin 60s linear infinite'
          }} />

          {/* Orbit Path */}
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.2)',
            opacity: stage >= 2 ? 1 : 0, transition: 'opacity 1s',
            transform: stage >= 4 ? 'scale(0.7) translateX(-250px) rotateX(60deg)' : 'scale(1) translateX(0) rotateX(60deg)',
          }} />

          {/* Gravity Vectors */}
          {stage >= 3 && (
            <div style={{
              position: 'absolute', width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: stage === 4 ? 1 : 0, transition: 'opacity 1s', zIndex: 1
            }}>
              <svg width="600" height="600" style={{ position: 'absolute' }}>
                <circle cx="300" cy="300" r="240" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="4" />
                <line x1="300" y1="300" x2="540" y2="300" stroke="#ef4444" strokeWidth="4" strokeDasharray="10,10">
                  <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="10s" repeatCount="indefinite" />
                </line>
                <text x="400" y="280" fill="#ef4444" fontSize="16" fontWeight="bold">Gravity (Pull)</text>
                <text x="550" y="300" fill="#3b82f6" fontSize="16" fontWeight="bold">Velocity</text>
              </svg>
            </div>
          )}

          {/* Earth Container */}
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            animation: 'orbit 10s linear infinite',
            transformStyle: 'preserve-3d',
            zIndex: 3,
            transition: 'all 2s ease-in-out',
            transform: stage >= 4 ? 'scale(0.7) translateX(-250px)' : 'scale(1) translateX(0)',
          }}>
            {/* Earth */}
            <div style={{
              position: 'absolute', right: '-25px', top: 'calc(50% - 25px)',
              width: '50px', height: '50px', borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1e3a8a)',
              boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.5)',
              transform: 'rotateX(-60deg)',
              animation: 'spin 5s linear infinite'
            }}>
              
              {/* Moon Orbit */}
              <div style={{
                position: 'absolute', width: '100px', height: '100px',
                left: '-25px', top: '-25px',
                animation: 'orbit 4s linear infinite',
                transformStyle: 'preserve-3d'
              }}>
                <div style={{
                  position: 'absolute', right: '0', top: 'calc(50% - 8px)',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: `url(${moonImg}) center/cover`,
                  boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.8)'
                }} />
              </div>

              {/* Satellite / Rocket (Stage 5) */}
              {stage === 5 && (
                <div style={{
                  position: 'absolute', width: '130px', height: '130px',
                  left: '-40px', top: '-40px',
                  animation: 'orbit 3s linear infinite reverse',
                  transformStyle: 'preserve-3d'
                }}>
                  <div style={{
                    position: 'absolute', right: '0', top: 'calc(50% - 6px)',
                    width: '24px', height: '12px', background: '#e2e8f0',
                    borderRadius: '4px', boxShadow: '0 0 8px #fff'
                  }}>
                    <div style={{ position: 'absolute', top: '-8px', left: '8px', width: '8px', height: '24px', background: '#3b82f6', opacity: 0.8 }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LOWER TEXT PANEL (15%) */}
      <div style={{
        flex: '0 0 15%', width: '100%', backgroundColor: '#fdfcf8',
        borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.1)', zIndex: 10, boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', gap: '2rem', overflow: 'hidden'
      }}>
        {stage === 1 && (
          <>
            <div style={{ flex: '0 0 20%' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>Step 1: Observe</h3>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
                Look at the movement of the planets and moons. They move naturally in the vastness of space.
              </p>
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button onClick={() => setStage(2)} style={btnStyle}>Find Pattern</button>
            </div>
          </>
        )}

        {stage === 2 && (
          <>
            <div style={{ flex: '0 0 20%' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>Step 2: Find Pattern</h3>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
                Which of these statements best describes the pattern of their movement?
              </p>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handlePatternChoice(false)} style={outlineBtnStyle}>Random zig-zag</button>
              <button onClick={() => handlePatternChoice(true)} style={btnStyle}>Predictable circular orbits</button>
            </div>
          </>
        )}

        {stage === 3 && (
          <>
            <div style={{ flex: '0 0 20%' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>Step 3: Ask Why</h3>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
                Excellent! They repeat the same path. But <strong>why</strong> does the Earth stay in orbit instead of flying away?
              </p>
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button onClick={() => setStage(4)} style={btnStyle}>Discover the Math</button>
            </div>
          </>
        )}

        {stage === 4 && (
          <>
            <div style={{ flex: '0 0 20%' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>Step 4: Explain</h3>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
                The Sun's gravity pulls the Earth inward, while Earth's speed tries to launch it forward. This perfect mathematical balance creates a continuous curve called an <strong>orbit</strong>.
              </p>
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button onClick={() => setStage(5)} style={btnStyle}>Apply to Technology</button>
            </div>
          </>
        )}

        {stage === 5 && (
          <>
            <div style={{ flex: '0 0 20%' }}>
              <h3 style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: 'bold', margin: 0, fontFamily: '"Space Grotesk", sans-serif' }}>Step 5: Apply</h3>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.4, color: '#1e293b', fontWeight: 'bold', margin: 0, fontFamily: '"Times New Roman", serif' }}>
                By understanding this exact mathematical pattern, scientists can calculate how to launch rockets, place satellites in orbit, and send missions to Mars!
              </p>
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button onClick={() => setShowDNA(true)} style={{ ...btnStyle, background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Explore Patterns in Life →
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin {
          from { background-position: 0% center; transform: rotate(0deg); }
          to { background-position: 100% center; transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const btnStyle = {
  padding: '12px 24px', fontSize: '1.05rem', fontWeight: 'bold', color: 'white',
  background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none',
  borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
  transition: 'transform 0.2s', fontFamily: '"Space Grotesk", sans-serif'
};

const outlineBtnStyle = {
  padding: '12px 24px', fontSize: '1.05rem', color: '#1e293b', fontWeight: 'bold',
  background: 'transparent', border: '2px solid #cbd5e1',
  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
  fontFamily: '"Space Grotesk", sans-serif'
};
