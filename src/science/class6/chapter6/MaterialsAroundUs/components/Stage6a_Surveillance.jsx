import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, ShieldAlert, EyeOff, User, Target, Camera } from 'lucide-react';

export default function Stage6a_Surveillance({ onComplete, addXp }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [observations, setObservations] = useState({});
  const [overlayState, setOverlayState] = useState({ spotId: null, phase: null });
  const activationTimerRef = useRef(null);
  const completionTimerRef = useRef(null);

  const spots = [
    {
      id: 'wall',
      name: 'Behind a Wall',
      type: 'Opaque',
      view: 'No View',
      icon: <EyeOff size={24} color="#dc2626" />,
      desc: 'The suspect is completely hidden behind the solid brick wall. No light passes through.',
      conclusion: 'Materials through which you cannot see at all are Opaque.',
      image: '/images/surveillance_wall.png'
    },
    {
      id: 'frosted',
      name: 'Frosted Glass Door',
      type: 'Translucent',
      view: 'Blurry View',
      icon: <ShieldAlert size={24} color="#ca8a04" />,
      desc: 'You can see a blurry silhouette of the suspect. Some light passes through, but not enough for a clear image.',
      conclusion: 'Materials through which objects can be seen, but not clearly, are Translucent.',
      image: '/images/surveillance_frosted.png'
    },
    {
      id: 'tree',
      name: 'Big Tree',
      type: 'Opaque',
      view: 'No View',
      icon: <EyeOff size={24} color="#dc2626" />,
      desc: 'The suspect is hiding behind a thick wooden tree trunk. Wood blocks all light from passing through.',
      conclusion: 'Wood is an Opaque material.',
      image: '/images/surveillance_tree.png'
    },
    {
      id: 'window',
      name: 'Clear Glass Window',
      type: 'Transparent',
      view: 'Clear View',
      icon: <Eye size={24} color="#16a34a" />,
      desc: 'You have a perfect view of the suspect through the window. Light passes through completely.',
      conclusion: 'Materials through which things can be seen clearly are Transparent.',
      image: '/images/surveillance_window.png'
    }
  ];

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    if (!observations[spot.id]) {
      setObservations(prev => ({ ...prev, [spot.id]: true }));
      addXp(15);
    }

    if (activationTimerRef.current) clearTimeout(activationTimerRef.current);
    if (completionTimerRef.current) clearTimeout(completionTimerRef.current);

    setOverlayState({ spotId: spot.id, phase: 'waiting' });
    
    activationTimerRef.current = setTimeout(() => {
      setOverlayState({ spotId: spot.id, phase: 'active' });
    }, 2000);

    completionTimerRef.current = setTimeout(() => {
      setOverlayState({ spotId: null, phase: null });
    }, 7000);
  };

  const obsCount = Object.keys(observations).length;
  const isComplete = obsCount === spots.length;

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Search size={24} color="var(--accent)" /> Phase 1: Surveillance Simulator
          </h3>
          <p style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
            Chief Blake is running a surveillance simulation! Click on each location to see if the suspect is visible through the material.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/images/chief_detective_blake.png" alt="Chief" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', flex: 1, minHeight: 0 }}>
        
        {/* Main Surveillance Scene (2x2 Grid of CSS Cards) */}
        <div style={{ flex: 1.8, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px' }}>
          
          {spots.map((spot, index) => {
            const isSelected = selectedSpot?.id === spot.id;
            
            return (
              <motion.div
                key={spot.id}
                onClick={() => handleSpotClick(spot)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  border: isSelected ? '4px solid var(--accent)' : '2px solid var(--border)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: isSelected ? '0 0 20px rgba(79, 70, 229, 0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'border 0.2s, box-shadow 0.2s'
                }}
                whileHover={{ scale: 1.02, zIndex: 5, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)' }}
              >
                {/* Scene Content */}
                <AnimatePresence mode="wait">
                  {!observations[spot.id] ? (
                    <motion.div 
                      key="unobserved"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <img src="/images/surveillance_unknown.jpg" alt="Unknown Target" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="observed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Observation Effect Overlay */}
                <AnimatePresence>
                  {overlayState.spotId === spot.id && overlayState.phase === 'active' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 15,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ...(spot.type === 'Transparent' ? {
                          backdropFilter: 'brightness(1.15) contrast(1.1) saturate(1.2)'
                        } : spot.type === 'Translucent' ? {
                          backdropFilter: 'blur(12px) brightness(1.1) grayscale(0.2)'
                        } : {
                          background: 'rgba(20,20,20,0.85)',
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.4) 10px, rgba(0,0,0,0.4) 20px)'
                        })
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{
                          background: spot.type === 'Transparent' ? 'rgba(255,255,255,0.9)' : spot.type === 'Translucent' ? 'rgba(255,255,255,0.8)' : 'rgba(220,38,38,0.9)',
                          color: spot.type === 'Opaque' ? '#ffffff' : '#0f172a',
                          padding: '0.75rem 2rem', borderRadius: '50px',
                          fontSize: '1.4rem', fontWeight: 'bold', textTransform: 'uppercase',
                          border: spot.type === 'Opaque' ? '3px solid #7f1d1d' : '3px solid #cbd5e1',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                          display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                      >
                        {spot.type === 'Transparent' && <Eye size={22} />}
                        {spot.type === 'Translucent' && <ShieldAlert size={22} />}
                        {spot.type === 'Opaque' && <EyeOff size={22} />}
                        {spot.type}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlay Label */}
                <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--text-heading)', color: 'white', padding: '8px 16px', borderRadius: '24px', fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  <div style={{ background: 'var(--accent)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>{index + 1}</div>
                  {!observations[spot.id] ? 'Unknown Target' : spot.name}
                </div>



                {observations[spot.id] && (
                  <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: '#16a34a', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '1.15rem', fontWeight: 'bold', zIndex: 20 }}>
                    Observed
                  </div>
                )}
              </motion.div>
            );
          })}
          
        </div>

        {/* Observation Console */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', fontSize: '1.5rem' }}>
              <Camera size={26} color="var(--accent)" /> Observation Console
            </h4>
            
            <AnimatePresence mode="wait">
              {selectedSpot ? (
                <motion.div
                  key={selectedSpot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Target Location</div>
                    <div style={{ fontSize: '1.7rem', color: 'var(--text-heading)', fontWeight: 'bold' }}>{selectedSpot.name}</div>
                  </div>

                  <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Visibility</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.55rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {selectedSpot.icon} {selectedSpot.view}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: '1.5' }}>
                      {selectedSpot.desc}
                    </div>
                  </div>

                  <div style={{ background: '#f0fdfa', borderRadius: '12px', padding: '1.25rem', border: '1px solid #ccfbf1', marginTop: 'auto' }}>
                    <div style={{ color: '#0d9488', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Conclusion</div>
                    <div style={{ color: '#115e59', fontSize: '1.4rem', lineHeight: '1.5', fontWeight: 'bold' }}>
                      {selectedSpot.conclusion}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)', textAlign: 'center', border: '2px dashed var(--border)', borderRadius: '12px', padding: '2rem' }}>
                  <div style={{ background: 'var(--surface)', padding: '15px', borderRadius: '50%' }}>
                    <Camera size={40} color="var(--border)" />
                  </div>
                  <span style={{ fontSize: '1.15rem' }}>Select a location on the left to begin observation.</span>
                </div>
              )}
            </AnimatePresence>
          </div>



        </div>

      </div>

      {/* Footer Progress */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d97706' }}>
          <div style={{ background: '#fefce8', padding: '8px', borderRadius: '50%' }}>
            <Target size={22} />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>Click on each location (1-4) to check if the suspect is visible through the material.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '1.1rem' }}>
            <img src="/images/chief_detective_blake.png" alt="Hat" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            Observations: <span style={{ color: isComplete ? '#16a34a' : 'var(--text-heading)', fontSize: '1.25rem' }}>{obsCount} / 4</span>
          </div>
        </div>
      </div>

    </div>
  );
}
