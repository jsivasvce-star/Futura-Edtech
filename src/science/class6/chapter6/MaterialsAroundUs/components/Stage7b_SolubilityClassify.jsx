import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Search, CheckCircle2, Target, Play, Pause } from 'lucide-react';
import fpage55Audio from '../../audio/fpage55.mp3?url';
import fpage55Json from '../../json/fpage55.json';

export default function Stage7b_SolubilityClassify({ onComplete, addXp, setExtraRightAction }) {
  const [classifications, setClassifications] = useState({});

  const instructionAudioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  const toggleInstructionAudio = () => {
    if (instructionAudioRef.current) {
      if (isAudioPlaying) {
        instructionAudioRef.current.pause();
      } else {
        instructionAudioRef.current.play().catch(e => console.error(e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (instructionAudioRef.current) {
      const time = instructionAudioRef.current.currentTime;
      const activeIdx = fpage55Json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    setActiveWordIndex(null);
  };

  useEffect(() => {
    if (setExtraRightAction) {
      setExtraRightAction(
        <button
          onClick={toggleInstructionAudio}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'white', color: 'var(--lesson-primary)',
            border: '2px solid var(--lesson-primary)',
            padding: '8px 16px', borderRadius: '8px',
            fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {isAudioPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isAudioPlaying ? "Pause Audio" : "Play Audio"}
        </button>
      );
    }
    return () => {
      if (setExtraRightAction) setExtraRightAction(null);
    };
  }, [setExtraRightAction, isAudioPlaying]);

  const renderWords = (startIdx, endIdx, defaultStyles = {}) => {
    return fpage55Json.words.slice(startIdx, endIdx + 1).map((w, i) => {
      const actualIdx = startIdx + i;
      return (
        <span
          key={actualIdx}
          style={{
            ...defaultStyles,
            color: activeWordIndex === actualIdx ? '#A94727' : 'inherit',
            background: activeWordIndex === actualIdx ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
            borderRadius: '4px',
            transition: 'all 0.15s ease-out'
          }}
        >
          {w.text}{' '}
        </span>
      );
    });
  };

  const items = [
    { id: 'sugar', name: 'Sugar', correct: 'Soluble', image: '/images/solubility_sugar.png' },
    { id: 'salt', name: 'Salt', correct: 'Soluble', image: '/images/solubility_salt.png' },
    { id: 'chalk', name: 'Chalk Powder', correct: 'Insoluble', image: '/images/solubility_chalk.png' },
    { id: 'sand', name: 'Sand', correct: 'Insoluble', image: '/images/solubility_sand.png' },
    { id: 'sawdust', name: 'Sawdust', correct: 'Insoluble', image: '/images/solubility_sawdust.png' }
  ];

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    
    const obj = items.find(i => i.id === id);
    if (obj.correct === category) {
      if (!classifications[id]) {
        addXp(10);
      }
      setClassifications(prev => ({ ...prev, [id]: category }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const classifiedCount = Object.keys(classifications).length;
  const isComplete = classifiedCount === items.length;

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  }, [isComplete, onComplete]);

  // Group items for Observation Box
  const solubleItems = items.filter(i => classifications[i.id] === 'Soluble').map(i => i.name).join(', ');
  const insolubleItems = items.filter(i => classifications[i.id] === 'Insoluble').map(i => i.name).join(', ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', height: '100%', color: '#3E2723', overflow: 'hidden' }}>
      
      <audio
        ref={instructionAudioRef}
        src={fpage55Audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Header */}
      <div style={{ background: 'var(--lesson-background)', border: '1px solid var(--lesson-border)', borderRadius: '16px', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#2C4E3D', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
            <Search size={40} color="#A94727" /> Phase 2: Table 6.5
          </h3>
          <p style={{ margin: 0, fontSize: '1.35rem', color: '#4A3B5C', fontWeight: '500' }}>
            {renderWords(0, 15)}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ background: 'white', border: '1px solid #D9C9A3', borderRadius: '12px', padding: '16px 24px', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1.15rem', color: '#2C4E3D', fontWeight: '600' }}>Think about what</div>
            <div style={{ fontSize: '1.15rem', color: '#2C4E3D', fontWeight: '600' }}>happened in the beaker!</div>
            <div style={{ position: 'absolute', right: '-8px', top: '24px', width: '16px', height: '16px', background: 'white', borderRight: '1px solid #d6d3d1', borderBottom: '1px solid #d6d3d1', transform: 'rotate(-45deg)' }} />
          </div>
          <img src="/images/chief_detective_blake.png" alt="Chief" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Main Area: Split */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, background: 'var(--lesson-background)', borderRadius: '16px', border: '1px solid var(--lesson-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        
        {/* LEFT SIDE: Let us classify */}
        <div style={{ flex: 1.35, padding: '1rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--lesson-border)', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '2.25rem', color: '#2C4E3D', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
              <div style={{ background: '#A94727', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', fontWeight: 'bold' }}>2</div>
              Let us classify
            </h4>
          </div>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '1.35rem', color: '#4A3B5C', fontWeight: '500' }}>Drag each material card to the correct group.</p>

          {/* Draggables Row */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            {items.map(item => {
              const isPlaced = classifications[item.id];
              return (
                <div 
                  key={item.id}
                  draggable={!isPlaced}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  style={{ 
                    flex: 1, 
                    background: 'white', 
                    border: '1px solid var(--lesson-border)', 
                    borderRadius: '12px', 
                    padding: '0.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    opacity: isPlaced ? 0.3 : 1,
                    cursor: isPlaced ? 'default' : 'grab',
                    boxShadow: isPlaced ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '50%', padding: '8px', border: '1px solid var(--lesson-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', mixBlendMode: 'multiply' }} draggable={false} />
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2C4E3D', textAlign: 'center', lineHeight: '1.2' }}>{item.name}</div>
                </div>
              );
            })}
          </div>

          {/* Drop Zones */}
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            
            {/* Soluble */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'Soluble')}
              style={{ flex: 1, background: 'var(--lesson-success-bg)', border: '1px solid var(--lesson-success-border)', borderRadius: '16px', padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#A94727', fontWeight: 'bold', fontSize: '1.6rem' }}>SOLUBLE</div>
                <div style={{ color: '#A94727', fontSize: '1.15rem', fontWeight: '500' }}>Disappears completely in water</div>
              </div>
              <div style={{ width: '100%', flex: 1, minHeight: '120px', border: '2px dashed var(--lesson-success-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.75rem' }}>
                {items.filter(i => classifications[i.id] === 'Soluble').length === 0 ? (
                  <div style={{ color: '#A94727', fontSize: '1.25rem', fontWeight: '600' }}>Drop items here</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {items.filter(i => classifications[i.id] === 'Soluble').map(i => (
                      <div key={i.id} style={{ background: 'white', border: '1px solid var(--lesson-success-border)', padding: '6px 12px', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', color: '#A94727', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', padding: '2px', border: '1px solid var(--lesson-success-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={i.image} alt={i.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', mixBlendMode: 'multiply' }} />
                        </div>
                        {i.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Insoluble */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'Insoluble')}
              style={{ flex: 1, background: 'var(--lesson-danger-bg)', border: '1px solid var(--lesson-danger-border)', borderRadius: '16px', padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--lesson-danger)', fontWeight: 'bold', fontSize: '1.6rem' }}>INSOLUBLE</div>
                <div style={{ color: 'var(--lesson-danger)', fontSize: '1.15rem', fontWeight: '500' }}>Does not disappear in water</div>
              </div>
              <div style={{ width: '100%', flex: 1, minHeight: '120px', border: '2px dashed var(--lesson-danger-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.75rem' }}>
                {items.filter(i => classifications[i.id] === 'Insoluble').length === 0 ? (
                  <div style={{ color: 'var(--lesson-danger)', fontSize: '1.25rem', fontWeight: '600' }}>Drop items here</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {items.filter(i => classifications[i.id] === 'Insoluble').map(i => (
                      <div key={i.id} style={{ background: 'white', border: '1px solid var(--lesson-danger-border)', padding: '6px 12px', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--lesson-danger)', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', padding: '2px', border: '1px solid var(--lesson-danger-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={i.image} alt={i.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', mixBlendMode: 'multiply' }} />
                        </div>
                        {i.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: Observation Box */}
        <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '2.75rem', color: '#2C4E3D', fontWeight: '900', textTransform: 'uppercase' }}>
            Case File
          </h4>
          <p style={{ margin: '0 0 1.25rem 0', fontSize: '1.75rem', color: '#4A3B5C', fontWeight: '600' }}>
            Findings from the solubility simulation:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '1.25rem' }}>
            {/* Soluble Finding */}
            <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--lesson-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>
                <div style={{ display: 'inline-block', border: '1px solid var(--lesson-success-border)', background: 'var(--lesson-success-bg)', color: '#A94727', padding: '6px 16px', borderRadius: '10px', fontSize: '2rem', fontWeight: '900', marginBottom: '14px' }}>
                  SOLUBLE
                </div>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1.8rem', color: '#2C4E3D', lineHeight: '1.45', fontWeight: '700' }}>
                Materials that completely dissolve and disappear in water.
              </p>
              <div style={{ fontSize: '1.8rem', color: '#4A3B5C', fontWeight: '600' }}>
                Examples: <span style={{ color: '#A94727', fontWeight: '900' }}>{solubleItems || 'None yet'}</span>
              </div>
            </div>
            
            {/* Insoluble Finding */}
            <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--lesson-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>
                <div style={{ display: 'inline-block', border: '1px solid var(--lesson-danger-border)', background: 'var(--lesson-danger-bg)', color: 'var(--lesson-danger)', padding: '6px 16px', borderRadius: '10px', fontSize: '2rem', fontWeight: '900', marginBottom: '14px' }}>
                  INSOLUBLE
                </div>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1.8rem', color: '#2C4E3D', lineHeight: '1.45', fontWeight: '700' }}>
                Materials that do not dissolve and remain visible in water.
              </p>
              <div style={{ fontSize: '1.8rem', color: '#4A3B5C', fontWeight: '600' }}>
                Examples: <span style={{ color: 'var(--lesson-danger)', fontWeight: '900' }}>{insolubleItems || 'None yet'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--lesson-background)', border: '1px solid var(--lesson-border)', borderRadius: '16px', padding: '0.5rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A94727' }}>
          <span style={{ color: '#2C4E3D', fontSize: '1.35rem', fontWeight: 'bold' }}>Classify all the objects to complete this activity.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#3E2723', display: 'flex', alignItems: 'center', gap: '8px', background: isComplete ? 'var(--lesson-success-bg)' : 'white', padding: '6px 16px', borderRadius: '20px', border: `1px solid ${isComplete ? 'var(--lesson-success-border)' : '#d6d3d1'}`, transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            {isComplete ? (
              <><span style={{ color: '#A94727', fontSize: '1.35rem' }}>Completed!</span> <CheckCircle2 size={24} color="#A94727" /></>
            ) : (
              <span style={{ color: '#2C4E3D', fontSize: '1.35rem' }}>{classifiedCount} / 5 Classified</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

Stage7b_SolubilityClassify.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func,
  setExtraRightAction: PropTypes.func
};
