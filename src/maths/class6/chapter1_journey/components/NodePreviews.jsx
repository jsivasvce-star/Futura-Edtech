import React, { useEffect, useState } from 'react';

// Node 1 Preview: Repeating dots, numbers, and geometric shapes forming subtle pattern
export function PreviewNode1() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 160 68" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="n1Glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Subtle background glow circle */}
        <circle cx="80" cy="34" r="28" fill="url(#n1Glow)" />
        
        {/* Repeating dot ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 80 + 22 * Math.cos(rad);
          const y = 34 + 22 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 2 === 0 ? 2.5 : 1.8}
              fill={i % 2 === 0 ? '#818cf8' : '#c084fc'}
              opacity="0.85"
            >
              <animate
                attributeName="r"
                values={i % 2 === 0 ? "2.5; 3.2; 2.5" : "1.8; 1.2; 1.8"}
                dur={`${2.5 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Central Geometric Shape (Sacred geometry / triangle in circle) */}
        <polygon
          points="80,20 92,41 68,41"
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="1.2"
          opacity="0.75"
        />
        <circle cx="80" cy="34" r="8" fill="none" stroke="#e0e7ff" strokeWidth="0.8" opacity="0.6" />
        
        {/* Subtle floating math symbols */}
        <text x="32" y="24" fill="#a5b4fc" fontSize="9" fontFamily="serif" opacity="0.65">π</text>
        <text x="120" y="26" fill="#c084fc" fontSize="9" fontFamily="serif" opacity="0.65">∑</text>
        <text x="38" y="52" fill="#818cf8" fontSize="8" fontWeight="600" opacity="0.6">1, 2, 3</text>
        <text x="114" y="50" fill="#a5b4fc" fontSize="9" fontFamily="serif" opacity="0.65">∞</text>
      </svg>
    </div>
  );
}

// Node 2 Preview: 2 → 4 → 6 → 8 → ? with pulsing ?
export function PreviewNode2() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
      padding: '0 0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: '700' }}>
        <span style={{ color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '5px' }}>2</span>
        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>→</span>
        <span style={{ color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '5px' }}>4</span>
        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>→</span>
        <span style={{ color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '5px' }}>6</span>
        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>→</span>
        <span style={{ color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '5px' }}>8</span>
        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>→</span>
        <span style={{
          color: '#fbbf24',
          background: 'rgba(245, 158, 11, 0.25)',
          border: '1px solid rgba(245, 158, 11, 0.6)',
          padding: '0.15rem 0.5rem',
          borderRadius: '6px',
          fontWeight: '800',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)',
          display: 'inline-block',
          animation: 'pulseQuestion 1.8s ease-in-out infinite'
        }}>
          ?
        </span>
      </div>

      <style>{`
        @keyframes pulseQuestion {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(245, 158, 11, 0.3); }
          50% { transform: scale(1.15); box-shadow: 0 0 16px rgba(245, 158, 11, 0.7); }
        }
      `}</style>
    </div>
  );
}

// Node 3 Preview: 3D mathematical blocks building gradually (■, 2x2 grid, 3x3 grid)
export function PreviewNode3() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: '0 0.8rem'
    }}>
      {/* 1x1 block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        opacity: step >= 0 ? 1 : 0.3,
        transition: 'opacity 0.4s'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          background: 'linear-gradient(135deg, #818cf8, #4f46e5)',
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)'
        }} />
        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600' }}>1²</span>
      </div>

      <span style={{ color: '#475569', fontSize: '0.7rem' }}>•</span>

      {/* 2x2 block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        opacity: step >= 1 ? 1 : 0.4,
        transform: step >= 1 ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.4s'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 11px)', gap: '2px' }}>
          {[1, 2, 3, 4].map(k => (
            <div key={k} style={{
              width: '11px',
              height: '11px',
              background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)'
            }} />
          ))}
        </div>
        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600' }}>2²</span>
      </div>

      <span style={{ color: '#475569', fontSize: '0.7rem' }}>•</span>

      {/* 3x3 block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        opacity: step >= 2 ? 1 : 0.4,
        transform: step >= 2 ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.4s'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 9px)', gap: '1.5px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => (
            <div key={k} style={{
              width: '9px',
              height: '9px',
              background: 'linear-gradient(135deg, #c084fc, #8b5cf6)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)'
            }} />
          ))}
        </div>
        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600' }}>3²</span>
      </div>
    </div>
  );
}

// Node 4 Preview: Relations Among Sequences (1, 1+3, 1+3+5, 1+3+5+7 forming square numbers)
export function PreviewNode4() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { expr: '1', result: '= 1', squares: 1 },
    { expr: '1 + 3', result: '= 4', squares: 4 },
    { expr: '1 + 3 + 5', result: '= 9', squares: 9 },
    { expr: '1 + 3 + 5 + 7', result: '= 16', squares: 16 }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem'
    }}>
      {/* Arithmetic Progression Formula */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#f8fafc',
          background: 'rgba(255,255,255,0.06)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          borderLeft: '3px solid #818cf8',
          letterSpacing: '0.02em'
        }}>
          {stages[activeStage].expr}
        </div>
        <span style={{ fontSize: '0.72rem', color: '#a5b4fc', fontWeight: '600', paddingLeft: '0.3rem' }}>
          {stages[activeStage].result} <span style={{ color: '#64748b' }}>({Math.sqrt(stages[activeStage].squares)}²)</span>
        </span>
      </div>

      {/* Visual Square Arrangement */}
      <div style={{
        width: '42px',
        height: '42px',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.sqrt(stages[activeStage].squares)}, 1fr)`,
        gap: '1.5px',
        padding: '2px',
        boxSizing: 'border-box'
      }}>
        {Array.from({ length: stages[activeStage].squares }).map((_, i) => (
          <div
            key={i}
            style={{
              background: i === 0 ? '#38bdf8' : i < 4 ? '#818cf8' : i < 9 ? '#a855f7' : '#f43f5e',
              borderRadius: '1.5px',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Node 5 Preview: Geometric transformation morphing Triangle → Square → Pentagon → Hexagon
export function PreviewNode5() {
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setShapeIndex(prev => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const shapes = [
    { name: 'Triangle (3)', points: '80,16 100,50 60,50' },
    { name: 'Square (4)', points: '63,20 97,20 97,52 63,52' },
    { name: 'Pentagon (5)', points: '80,16 100,31 92,53 68,53 60,31' },
    { name: 'Hexagon (6)', points: '80,16 98,26 98,46 80,56 62,46 62,26' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 160 68">
        <defs>
          <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Ambient circle guide */}
        <circle cx="80" cy="36" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" />

        {/* Smooth polygon shape */}
        <polygon
          points={shapes[shapeIndex].points}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="url(#polyGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {/* Vertex dots */}
        {shapes[shapeIndex].points.split(' ').map((pt, idx) => {
          const [x, y] = pt.split(',').map(Number);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2.5"
              fill="#ffffff"
              filter="drop-shadow(0 0 3px #818cf8)"
              style={{ transition: 'all 0.6s ease' }}
            />
          );
        })}

        {/* Shape Name Label */}
        <text
          x="80"
          y="64"
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="0.05em"
        >
          {shapes[shapeIndex].name}
        </text>
      </svg>
    </div>
  );
}

// Node 6 Preview: Geometric Network Graph (Dots & Lines revealing hidden numbers)
export function PreviewNode6() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(prev => !prev);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 160 68">
        {/* Network connections */}
        <line x1="50" y1="20" x2="110" y2="20" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
        <line x1="110" y1="20" x2="110" y2="50" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
        <line x1="110" y1="50" x2="50" y2="50" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
        <line x1="50" y1="50" x2="50" y2="20" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
        <line x1="50" y1="20" x2="110" y2="50" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.9" />

        {/* Nodes / Vertices */}
        <circle cx="50" cy="20" r="3.5" fill="#38bdf8" />
        <circle cx="110" cy="20" r="3.5" fill="#38bdf8" />
        <circle cx="50" cy="50" r="3.5" fill="#38bdf8" />
        <circle cx="110" cy="50" r="3.5" fill="#38bdf8" />

        {/* Floating Numbers formula tag */}
        <g transform="translate(80, 35)">
          <rect x="-24" y="-8" width="48" height="16" rx="4" fill="rgba(15, 23, 42, 0.85)" stroke="#6366f1" strokeWidth="0.8" />
          <text x="0" y="3" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="700">
            {pulse ? "E = 5" : "V = 4"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// Summary Node Checkpoint Preview: 6 Discovered Worlds Checkmarks
export function PreviewSummary() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2px 8px',
      padding: '0.2rem 0.6rem',
      alignContent: 'center',
      fontSize: '0.65rem'
    }}>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Patterns
      </div>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Sequences
      </div>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Visual blocks
      </div>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Relations
      </div>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Shape rules
      </div>
      <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}>
        <span>✓</span> Graph laws
      </div>
    </div>
  );
}

// Quiz Node Challenge Preview: 🏆 Glowing Trophy
export function PreviewQuiz() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(168, 85, 247, 0.15) 70%, transparent 100%)',
        animation: 'trophyGlow 3s ease-in-out infinite alternate'
      }} />

      <div style={{
        fontSize: '2rem',
        filter: 'drop-shadow(0 4px 10px rgba(245, 158, 11, 0.6))',
        animation: 'floatTrophy 3s ease-in-out infinite'
      }}>
        🏆
      </div>

      <style>{`
        @keyframes floatTrophy {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.06); }
        }
        @keyframes trophyGlow {
          0% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
