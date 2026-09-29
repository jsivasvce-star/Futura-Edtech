import React, { useState } from 'react';
import SectionNextButton from './SectionNextButton';
import SolarSystemSimulation from './SolarSystemSimulation';

export default function PatternWhyExperience({ onNext }) {
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
        display: 'flex', flexDirection: 'row', overflow: 'hidden'
      }}>
        {/* LEFT ANIMATION AREA (MAX SPACE) */}
        <div style={{
          flex: 1, minWidth: 0, height: '100%', position: 'relative', overflow: 'hidden',
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

        {/* RIGHT CONTENT PANEL (MINIMUM REQUIRED SPACE) */}
        <div style={{
          flex: '0 0 clamp(320px, 25vw, 380px)',
          width: 'clamp(320px, 25vw, 380px)',
          height: '100%',
          backgroundColor: '#fdfcf8',
          borderLeft: '1px solid #cbd5e1',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.06)',
          zIndex: 10,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(10px, 1.4vh, 16px) clamp(10px, 1vw, 14px)',
          overflow: 'hidden'
        }}>
          <div style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1rem 0.5rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                Patterns in Life
              </h2>
              <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                Just like orbits in space, our DNA contains repeating mathematical patterns. Recognizing these patterns helps scientists understand genetics and create medical applications to heal and protect life.
              </p>
            </div>
            <div>
              <button onClick={() => { setShowDNA(false); setStage(1); }} style={btnStyle}>
                Back to Space
              </button>
            </div>
          </div>

          {/* Bottom-right pinned Next button: Section 6 -> Section 7 */}
          <SectionNextButton onClick={onNext} />
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
      display: 'flex', flexDirection: 'row', overflow: 'hidden'
    }}>
      {/* LEFT VISUAL AREA: HD SOLAR SYSTEM SIMULATION REPLICATING REFERENCE */}
      <div style={{
        position: 'relative',
        flex: 1,
        minWidth: 0,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        zIndex: 1
      }}>
        <SolarSystemSimulation stage={stage} />
      </div>

      {/* RIGHT CONTENT PANEL (MINIMUM REQUIRED SPACE) */}
      <div style={{
        flex: '0 0 clamp(320px, 25vw, 380px)',
        width: 'clamp(320px, 25vw, 380px)',
        height: '100%',
        backgroundColor: '#fdfcf8',
        borderLeft: '1px solid #cbd5e1',
        boxShadow: '-4px 0 15px rgba(0,0,0,0.06)',
        zIndex: 10,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(10px, 1.4vh, 16px) clamp(10px, 1vw, 14px)',
        overflow: 'hidden'
      }}>
        <div style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '1rem 0.5rem'
        }}>
          {stage === 1 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Step 1: Observe</h3>
                <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  Look at the movement of the planets and moons. They move naturally in the vastness of space.
                </p>
              </div>
              <div>
                <button onClick={() => setStage(2)} style={btnStyle}>Find Pattern</button>
              </div>
            </>
          )}

          {stage === 2 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Step 2: Find Pattern</h3>
                <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  Which of these statements best describes the pattern of their movement?
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => handlePatternChoice(false)} style={outlineBtnStyle}>Random zig-zag</button>
                <button onClick={() => handlePatternChoice(true)} style={btnStyle}>Predictable circular orbits</button>
              </div>
            </>
          )}

          {stage === 3 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Step 3: Ask Why</h3>
                <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  Excellent! They repeat the same path. But <strong>why</strong> does the Earth stay in orbit instead of flying away?
                </p>
              </div>
              <div>
                <button onClick={() => setStage(4)} style={btnStyle}>Discover the Math</button>
              </div>
            </>
          )}

          {stage === 4 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Step 4: Explain</h3>
                <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  The Sun's gravity pulls the Earth inward, while Earth's speed tries to launch it forward. This perfect mathematical balance creates a continuous curve called an <strong>orbit</strong>.
                </p>
              </div>
              <div>
                <button onClick={() => setStage(5)} style={btnStyle}>Apply to Technology</button>
              </div>
            </>
          )}

          {stage === 5 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.75rem, 2.05vw, 2.45rem)', color: '#0f172a', fontWeight: 900, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>Step 5: Apply</h3>
                <p style={{ fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)', lineHeight: 1.4, color: '#1e293b', fontWeight: 700, margin: 0, fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
                  By understanding this exact mathematical pattern, scientists can calculate how to launch rockets, place satellites in orbit, and send missions to Mars!
                </p>
              </div>
              <div>
                <button onClick={() => setShowDNA(true)} style={{ ...btnStyle, background: 'linear-gradient(135deg, #10b981, #059669)', width: '100%' }}>
                  Explore Patterns in Life →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom-right pinned Next button: Section 6 -> Section 7 */}
        <SectionNextButton onClick={onNext} />
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '12px 24px', fontSize: 'clamp(1.25rem, 1.42vw, 1.6rem)', fontWeight: 900, color: 'white',
  background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none',
  borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
  transition: 'transform 0.2s', fontFamily: '"Times New Roman", Times, Georgia, serif'
};

const outlineBtnStyle = {
  padding: '12px 24px', fontSize: 'clamp(1.25rem, 1.42vw, 1.6rem)', color: '#1e293b', fontWeight: 900,
  background: 'transparent', border: '2px solid #cbd5e1',
  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
  fontFamily: '"Times New Roman", Times, Georgia, serif'
};
