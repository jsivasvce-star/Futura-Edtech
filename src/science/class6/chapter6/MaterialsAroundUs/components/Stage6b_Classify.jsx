import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2, GripVertical, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import imgFrostedGlass from "../../../../../assets/2.froastedjar.jpg";
import imgEraser from "../../../../../assets/2.eraser.jpg";
import imgButterPaper from "../../../../../assets/2.butterpaper.jpg";
import imgGlass from "../../../../../assets/2.glass.jpg";
import imgWoodenBoard from "../../../../../assets/2.woodenboard.jpg";
import imgGlassWindow from "../../../../../assets/2.bottleplastic.jpg";

// ─── Inline SVG object visuals ───────────────────────────────────────────────
function ObjectVisual({ id, size = 90, customStyle = {} }) {
  const images = {
    tumbler: imgGlass,
    butter: imgButterPaper,
    eraser: imgEraser,
    frosted: imgFrostedGlass,
    wood: imgWoodenBoard,
    window: imgGlassWindow
  };
  return <img src={images[id]} alt={id} style={{ width: size, height: size, objectFit: 'contain', borderRadius: '8px', pointerEvents: 'none', ...customStyle }} />;
}

// ─── CSS-Based Realistic Tray Component ───────────────────────────────────────
function Tray({ type, droppedItems, isDragOver, onDragOver, onDragLeave, onDrop, onDragStart }) {
  const isOpaque = type === 'Opaque';
  const isTranslucent = type === 'Translucent';
  const isTransparent = type === 'Transparent';

  const textColor = '#475569';
  
  // Outer Back/Side Shell
  const outerBack = isOpaque ? 'linear-gradient(180deg, #e2e8f0, #94a3b8)' 
                  : isTranslucent ? 'linear-gradient(180deg, rgba(241,245,249,0.5), rgba(203,213,225,0.3))'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(241,245,249,0.4))';

  // Inner Depth / Interior Wall
  const innerDepth = isOpaque ? 'linear-gradient(180deg, #94a3b8, #64748b)' 
                   : isTranslucent ? 'linear-gradient(180deg, rgba(203,213,225,0.7), rgba(148,163,184,0.5))' 
                   : 'linear-gradient(180deg, rgba(241,245,249,0.5), rgba(226,232,240,0.2))';

  // Front Wall Outer Surface
  const frontOuter = isOpaque ? 'linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)' 
                   : isTranslucent ? 'linear-gradient(180deg, rgba(241,245,249,0.3), rgba(203,213,225,0.2))'
                   : 'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(241,245,249,0.2))';

  const rimBorder = isOpaque ? '#f1f5f9' : isTranslucent ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)';

  const icon = isOpaque ? <EyeOff size={20}/> : <Eye size={20}/>;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
      {/* Label above tray */}
      <div style={{ flexShrink: 0, textAlign: 'center', marginBottom: '0.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '1.4rem', letterSpacing: '0.05em', color: textColor }}>
          {icon} {type.toUpperCase()}
        </div>
        <div style={{ fontSize: '1.15rem', color: '#64748b', fontWeight: '700', marginTop: '2px' }}>
          {isOpaque ? 'Cannot see through' : isTranslucent ? 'See, but not clearly' : 'See clearly through'}
        </div>
      </div>

      {/* The physical CSS Drop Container */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          position: 'relative',
          flex: 1,
          marginTop: '0.2rem',
          transform: isDragOver ? 'scale(1.02)' : 'none',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Layer 0: OUTER BACK/SIDE SHELL */}
        <div style={{
          position: 'absolute', top: '0%', left: '0%', right: '0%', bottom: '0%',
          background: outerBack,
          border: `1px solid ${rimBorder}`,
          borderTop: `12px solid ${rimBorder}`, // Thicker back rim for large realistic basket
          borderRadius: '16px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
          zIndex: 0,
        }} />

        {/* Layer 1: INTERIOR BASKET HOLE / DEPTH */}
        <div style={{
          position: 'absolute', top: '8%', left: '4%', right: '4%', bottom: '8%',
          background: innerDepth,
          borderRadius: '8px 8px 12px 12px',
          boxShadow: isDragOver ? 'inset 0 0 0 5px rgba(59,130,246,0.4)' : 'inset 0 20px 30px rgba(0,0,0,0.12), inset 0 4px 8px rgba(0,0,0,0.08)',
          zIndex: 1,
          transition: 'box-shadow 0.2s',
        }}>
          {/* Subtle floor depth line inside the basket */}
          <div style={{
            position: 'absolute', bottom: '15%', left: '8%', right: '8%', height: '4px',
            background: 'rgba(0,0,0,0.08)', borderRadius: '50%'
          }}/>
        </div>

        {/* Layer 2: OBJECTS CONTENT LAYER */}
        {/* Objects start completely below the top edge of the front wall (25%) so they are fully hidden by opaque walls */}
        <div style={{
          position: 'absolute', top: '35%', bottom: '10%', left: '8%', right: '8%',
          display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center',
          gap: '8px', zIndex: 2
        }}>
          <AnimatePresence>
            {droppedItems.map((item, i) => (
              <motion.div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, item.id)}
                initial={{ y: -100, opacity: 0, scale: 0.6 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}
              >
                {/* Physical object remains completely sharp internally. Filtering is handled by the front wall! */}
                <ObjectVisual id={item.id} size={70}/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Layer 3: FRONT WALL & RIM */}
        <div style={{
          position: 'absolute', top: '25%', left: '0%', right: '0%', bottom: '0%',
          background: frontOuter,
          
          /* CRITICAL: Translucent blur is applied to the front wall, which naturally blurs the objects BEHIND it (in layer 2)! */
          backdropFilter: isTranslucent ? 'blur(6px)' : 'none',
          WebkitBackdropFilter: isTranslucent ? 'blur(6px)' : 'none',
          
          border: '1px solid rgba(255,255,255,0.3)',
          borderTop: `8px solid ${rimBorder}`,
          borderRadius: '4px 4px 16px 16px', 
          
          boxShadow: '0 -2px 10px rgba(0,0,0,0.03), 0 15px 30px rgba(0,0,0,0.1), inset 0 8px 20px rgba(255,255,255,0.7), inset 0 -5px 15px rgba(0,0,0,0.06)',
          zIndex: 3,
          overflow: 'hidden'
        }}>
          {/* Handle Cutout */}
          <div style={{
            position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)',
            width: '60px', height: '18px',
            background: isOpaque ? '#94a3b8' : 'rgba(0,0,0,0.08)',
            borderRadius: '20px',
            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.8)'
          }} />

          {/* Glossy Plastic Reflection */}
          {!isOpaque && (
            <div style={{
              position: 'absolute', top: 0, left: '15%', width: '40%', height: '100%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
              transform: 'skewX(-20deg)', pointerEvents: 'none'
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Stage6b_Classify({ onComplete, addXp }) {
  const [objectLocations, setObjectLocations] = useState({});
  const [observationLog, setObservationLog] = useState([]);
  const [testedItems, setTestedItems] = useState(new Set());
  
  const [draggingOver, setDraggingOver] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  const items = [
    { id: 'tumbler', name: 'Glass Tumbler' },
    { id: 'butter', name: 'Butter Paper' },
    { id: 'eraser', name: 'Eraser' },
    { id: 'frosted', name: 'Frosted Jar' },
    { id: 'wood', name: 'Wooden Board' },
    { id: 'window', name: 'Plastic Bottle' },
  ];

  const handleDragStart = (e, id) => { 
    e.dataTransfer.setData('text/plain', id); 
    setDraggingId(id); 
  };
  
  const handleDragEnd = () => setDraggingId(null);

  const handleDrop = (e, category) => {
    e.preventDefault();
    setDraggingOver(null);
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const obj = items.find(i => i.id === id);
    if (!obj) return;
    
    // Add XP once per item tested
    if (!testedItems.has(id)) {
      addXp(10);
      setTestedItems(prev => new Set(prev).add(id));
    }

    // Update location to place object physically in the tray
    setObjectLocations(prev => ({ ...prev, [id]: category }));

    // Formulate the observation string based strictly on the dropped tray
    let visualResult = '';
    if (category === 'Transparent') visualResult = 'The object can be seen clearly.';
    else if (category === 'Translucent') visualResult = 'The object is visible, but appears blurry.';
    else if (category === 'Opaque') visualResult = 'The object cannot be seen through the material.';

    const newLog = { 
      id: Date.now() + Math.random(), // unique key
      text: `${obj.name} → ${category}: ${visualResult}` 
    };
    
    // Replace with only the latest observation
    setObservationLog([newLog]);
  };

  const testedCount = testedItems.size;
  const isComplete = testedCount === items.length;

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  }, [isComplete, onComplete]);

  // Objects that have NOT been dropped into any tray yet
  const availableObjects = items.filter(i => !objectLocations[i.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', height: '100%', color: 'var(--text-primary)', overflow: 'hidden', padding: '0.5rem 0.5rem 0 0.5rem', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <div style={{ flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.5rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 'clamp(26px, 3.2vw, 32px)', fontWeight: '900', color: 'var(--heading-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSearch size={24} color="var(--accent)" /> Phase 2: Activity 6.6 — Let us Classify
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: 'clamp(20px, 2.8vw, 24px)', fontWeight: '600', color: 'var(--heading-sub)', lineHeight: '1.5' }}>
            Explore the Materials — drag any object into a tray and observe how it appears.
          </p>
        </div>
        <div style={{
          background: isComplete ? '#dcfce7' : 'var(--surface)',
          border: `1px solid ${isComplete ? '#bbf7d0' : 'var(--border)'}`,
          borderRadius: '16px', padding: '6px 14px',
          fontWeight: '800', fontSize: '1.1rem',
          color: isComplete ? '#15803d' : 'var(--text-primary)',
          display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.3s',
        }}>
          {isComplete ? <><CheckCircle2 size={18} color="#15803d" /> Completed!</> : <>{testedCount} / 6 Objects Tested</>}
        </div>
      </div>

      {/* Unused Object Source Area */}
      <div style={{ flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.5rem 1rem', minHeight: '135px' }}>
        <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: 'var(--heading-section)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GripVertical size={20} /> Available Objects
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: '85px' }}>
          {availableObjects.length === 0 ? (
             <div style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: '600', fontStyle: 'italic', alignSelf: 'center' }}>
               All objects have been placed in trays. You can drag them between trays to test more!
             </div>
          ) : (
            availableObjects.map(item => {
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  title={item.name}
                  style={{
                    flex: '1 1 0', minWidth: '130px', maxWidth: '170px',
                    background: 'white',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px', padding: '6px 8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    cursor: 'grab',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.2s',
                    userSelect: 'none',
                  }}
                >
                  <div style={{ position: 'absolute', top: '4px', left: '4px' }}><GripVertical size={14} color="#94a3b8" /></div>
                  <ObjectVisual id={item.id} size={54} customStyle={{ width: '100%', height: '70px', mixBlendMode: 'multiply' }} />
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b', textAlign: 'center', lineHeight: 1.1 }}>{item.name}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Three Massive Physical Trays */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: '280px', marginTop: '0.5rem' }}>
        {['Transparent', 'Translucent', 'Opaque'].map(cat => (
          <Tray
            key={cat}
            type={cat}
            droppedItems={items.filter(i => objectLocations[i.id] === cat)}
            isDragOver={draggingOver === cat}
            onDragOver={(e) => { e.preventDefault(); setDraggingOver(cat); }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDraggingOver(null); }}
            onDrop={(e) => handleDrop(e, cat)}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      {/* Single Compact Observation Log */}
      <div style={{ flexShrink: 0, minHeight: '110px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '0.6rem 1.25rem', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.35rem', fontWeight: '900', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={20} /> Observation Log
        </h4>
        <div style={{ flex: 1, overflow: 'hidden', background: '#f8fafc', borderRadius: '8px', border: '1px inset #e2e8f0', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
          {observationLog.length === 0 ? (
            <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '1.15rem', textAlign: 'center', marginTop: '10px' }}>
              Drag an object into any tray above to record your observation.
            </div>
          ) : (
            <AnimatePresence>
              {observationLog.map(log => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: 'white', padding: '6px 12px', borderRadius: '6px', borderLeft: '4px solid var(--accent)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', fontSize: '1.2rem', color: '#334155', fontWeight: '600', flexShrink: 0 }}
                >
                  {log.text}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

    </div>
  );
}
