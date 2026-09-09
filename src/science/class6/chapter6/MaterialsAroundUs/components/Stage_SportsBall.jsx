import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';

import imgBallTennis from '../images/b2_ball_tennis.png';
import imgBallCricket from '../images/b2_ball_cricket.png';
import imgBallSponge from '../images/b2_ball_sponge.png';

export default function Stage_SportsBall({ onComplete, addXp }) {
  const [activeBall, setActiveBall] = useState('tennis');
  const [inspected, setInspected] = useState({ tennis: true });
  const [dropState, setDropState] = useState('reset'); // 'reset' or 'dropping'

  const balls = [
    {
      id: 'tennis',
      name: 'Tennis Ball',
      icon: imgBallTennis,
      material: 'Rubber & Felt',
      hardness: 'Medium (Squeezable)',
      weight: 'Lightweight',
      purpose: 'High bounce, safe for rackets',
      bounceAnim: [0, 90, 19, 90, 45, 90, 64, 90, 79, 90, 85, 90, 90]
    },
    {
      id: 'cricket',
      name: 'Cricket Ball',
      icon: imgBallCricket,
      material: 'Leather & Cork',
      hardness: 'Very Hard',
      weight: 'Heavyweight',
      purpose: 'Fast bowling, durable impacts',
      bounceAnim: [0, 90, 79, 90, 85, 90, 90, 90, 90, 90, 90, 90, 90]
    },
    {
      id: 'exercise',
      name: 'Sponge Ball',
      icon: imgBallSponge,
      material: 'Soft Sponge / Foam',
      hardness: 'Very Soft & Flexible',
      weight: 'Very Lightweight',
      purpose: 'Hand exercise, stress relief',
      bounceAnim: [0, 90, 60, 90, 75, 90, 79, 90, 85, 90, 90, 90, 90]
    }
  ];

  const handleInspect = (id) => {
    setActiveBall(id);
    setDropState('reset');
    if (!inspected[id]) {
      setInspected(prev => {
        const next = { ...prev, [id]: true };
        if (Object.keys(next).length === balls.length) {
          addXp(20);
        }
        return next;
      });
    }
  };

  const allInspected = Object.keys(inspected).length === balls.length;

  useEffect(() => {
    if (allInspected) {
      onComplete();
    }
  }, [allInspected, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', flex: 1, minHeight: 0 }}>
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--lesson-accent-border)' }}>
        <h3 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--heading-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={26} style={{ color: '#A64B27' }} />
          Investigation: Sports Equipment Properties
        </h3>
        <p style={{ margin: 0, fontSize: '1.4rem', color: 'var(--heading-sub)' }}>
          Why aren't all balls made of the same material? Click each ball to analyze its properties and discover how its material matches its purpose.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* LEFT: Ball selection and Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0 }}>
          {/* Horizontal Ball selector */}
          <div className="glass-panel" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem' }}>
            {balls.map(ball => (
              <button
                key={ball.id}
                onClick={() => handleInspect(ball.id)}
                className={activeBall === ball.id ? 'primary' : 'outline'}
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontSize: '1.2rem',
                  borderRadius: '8px'
                }}
              >
                <img src={ball.icon} alt={ball.name} style={{ width: '30px', height: '30px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                <span style={{ fontWeight: 'bold' }}>{ball.name}</span>
                {inspected[ball.id] && <CheckCircle size={18} style={{ color: activeBall === ball.id ? 'white' : '#A64B27' }} />}
              </button>
            ))}
          </div>

          {/* Analysis Vertical List */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, padding: '1.5rem 1.2rem', gap: '0.75rem' }}>
            <AnimatePresence mode="wait">
              {activeBall && (
                <motion.div
                  key={activeBall}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-between' }}
                >
                  {(() => {
                    const ball = balls.find(b => b.id === activeBall);
                    return (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--lesson-border)', paddingBottom: '0.5rem' }}>
                          <img src={ball.icon} alt={ball.name} style={{ width: '48px', height: '48px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                          <h2 style={{ margin: 0, color: 'var(--lesson-primary)', fontSize: '2rem' }}>{ball.name}</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1, justifyContent: 'center' }}>
                          {[
                            { label: 'Primary Material', value: ball.material },
                            { label: 'Hardness Level', value: ball.hardness },
                            { label: 'Weight', value: ball.weight },
                            { label: 'Design Purpose', value: ball.purpose, highlight: true }
                          ].map(item => (
                            <div key={item.label} style={{ 
                              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                              background: '#FFFFFF', padding: '1.4rem 1.2rem', borderRadius: '8px', border: '1px solid var(--lesson-border)' 
                            }}>
                              <span style={{ fontSize: '1.4rem', color: 'var(--lesson-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.label}</span>
                              <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: item.highlight ? '#A64B27' : 'var(--lesson-text)', textAlign: 'right', flex: 1, marginLeft: '1rem' }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Drop Test Panel */}
        <div className="glass-panel" style={{ background: 'var(--neutral-bg)', border: '1px solid var(--lesson-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.5rem', flex: 1, minHeight: 0 }}>
          <h4 style={{ margin: 0, color: 'var(--heading-section)', fontSize: '2.2rem' }}>Drop Test: Bounce Comparison</h4>
          <p style={{ margin: 0, fontSize: '1.6rem', color: 'var(--lesson-secondary)', textAlign: 'center', lineHeight: '1.3' }}>Observe how the material's hardness affects its bounce height when dropped from the same level.</p>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: '1rem' }}>
            <svg width="100%" height="100%" style={{ maxHeight: '400px' }} viewBox="0 0 300 220" preserveAspectRatio="xMidYMid meet">
              {/* Ground */}
              <line x1="20" y1="190" x2="280" y2="190" stroke="var(--lesson-border)" strokeWidth="4" strokeLinecap="round" />
              
              {/* Active Ball */}
              <g>
                {(() => {
                   const ball = balls.find(b => b.id === activeBall);
                   return (
                     <motion.image 
                       key={ball.id} 
                       href={ball.icon} 
                       x="100" 
                       width="100" 
                       height="100" 
                       style={{ mixBlendMode: 'multiply' }}
                       animate={dropState === 'dropping' ? { y: ball.bounceAnim } : { y: 0 }} 
                       transition={dropState === 'dropping' ? { duration: 3.5, ease: "easeInOut" } : { duration: 0 }}
                     />
                   );
                })()}
              </g>
            </svg>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: 'auto', paddingTop: '1rem' }}>
            <button 
              onClick={() => setDropState('dropping')} 
              disabled={dropState === 'dropping'}
              className="primary" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              Drop Ball
            </button>
            <button 
              onClick={() => setDropState('reset')} 
              disabled={dropState === 'reset'}
              className="outline" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
