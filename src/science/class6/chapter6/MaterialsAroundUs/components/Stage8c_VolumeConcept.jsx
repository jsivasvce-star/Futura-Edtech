import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, Star, Box, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Stage8c_VolumeConcept({ onComplete, addXp }) {
  const [activeStep, setActiveStep] = useState(0);
  const [volumesRevealed, setVolumesRevealed] = useState({
    teaCup: false,
    soupBowl: false,
    waterGlass: false,
    bucket: false
  });

  const handleReveal = (item) => {
    if (!volumesRevealed[item]) {
      setVolumesRevealed(prev => ({ ...prev, [item]: true }));
      addXp(20);
    }
  };

  const allRevealed = Object.values(volumesRevealed).every(v => v);
  
  React.useEffect(() => {
    if (allRevealed && onComplete && activeStep === 2) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [allRevealed, onComplete, activeStep]);

  const steps = [
    { id: 0, title: 'WHY?', subtitle: "Why can't I fill the bottle completely?" },
    { id: 1, title: 'UNDERSTAND', subtitle: "Volume in Everyday Life" },
    { id: 2, title: 'EXPLORE', subtitle: "Different Volumes" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', height: '100vh', color: '#3E2723', background: '#F9F6F0', padding: '1rem 1.5rem', boxSizing: 'border-box', overflow: 'hidden' }}>
      

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, background: '#FDFBF7', borderRadius: '16px', border: '1px solid #EAE3D9', boxShadow: '0 4px 6px rgba(87, 65, 51, 0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Dynamic Content Shell */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{ flex: 1, display: 'flex', padding: '1.5rem', boxSizing: 'border-box', overflow: 'hidden' }}
              >
                <div style={{ flex: 1, display: 'flex', gap: '2rem', alignItems: 'stretch', minHeight: 0 }}>
                  {/* Left: Illustration */}
                  <div style={{ flex: '1', borderRadius: '16px', overflow: 'hidden', border: '1px solid #EAE3D9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', minHeight: 0 }}>
                    <img src="/images/volume_overflow.png" alt="Overflowing Bottle" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  
                  {/* Right: Explanation */}
                  <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '3.5rem', color: '#134e4a', margin: '0 0 1rem 0', lineHeight: '1.1', fontWeight: '900', fontFamily: 'serif' }}>WHY CAN&apos;T I ADD MORE WATER?</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ margin: 0, color: '#431407', fontSize: '2.2rem', lineHeight: '1.4' }}>
                        The bottle has <strong style={{ fontWeight: '900' }}>limited space</strong>.
                      </p>
                      <p style={{ margin: 0, color: '#431407', fontSize: '2.2rem', lineHeight: '1.4' }}>
                        Once it is full, no more water can fit.
                      </p>
                    </div>
                    
                    <div style={{ marginTop: '1.25rem', background: '#fef3c7', padding: '1rem 1.5rem', borderRadius: '16px', border: '2px dashed #f59e0b' }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#134e4a', fontSize: '2rem', fontWeight: '800', fontFamily: 'serif' }}>That amount of space is called</p>
                      <div style={{ color: '#431407', background: '#FFFFFF', display: 'inline-block', padding: '0.25rem 1rem', fontSize: '4.5rem', fontWeight: '900', letterSpacing: '2px', borderRadius: '8px' }}>VOLUME</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  flex: 1, 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  padding: '1.5rem', 
                  alignItems: 'start', 
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
              >
                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', height: '100%', justifyContent: 'center' }}>
                  
                  {/* 1. TITLE, SUBTITLE, EXPLANATION */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '2.8rem', color: '#134e4a', margin: '0 0 0.5rem 0', fontWeight: '900', letterSpacing: '-0.5px', fontFamily: 'serif' }}>Volume in Everyday Life</h3>
                    <p style={{ margin: '0 0 0.75rem 0', color: '#c2410c', fontSize: '1.8rem', lineHeight: '1.3', fontWeight: '800' }}>
                      How much space can a container hold?
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#431407', fontSize: '1.6rem', lineHeight: '1.45' }}>
                      Different containers can hold different amounts of liquid.
                    </p>
                    <p style={{ margin: 0, color: '#431407', fontSize: '1.6rem', lineHeight: '1.45' }}>
                      The amount a container can hold is described using <strong style={{ color: '#431407', background: '#FFFFFF', padding: '0.2rem 0.5rem', fontWeight: '900', borderRadius: '6px', border: '1px solid #EAE3D9' }}>volume</strong>.
                    </p>
                  </div>
                  
                  {/* 2. WATER + MILK COMPARISON */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', width: '100%', marginBottom: '1rem' }}>
                    
                    {/* Water */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAE3D9' }}>
                        <img src="/images/3d_water_bottle_1788167284292.jpg" alt="Water Bottle" style={{ width: 'auto', maxHeight: '110px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#431407', margin: '0 0 4px 0' }}>Water</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#134e4a', margin: 0 }}>500 mL</div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div style={{ fontSize: '3rem', color: '#A8A29E', fontWeight: '300', marginBottom: '2rem' }}>&harr;</div>

                    {/* Milk */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAE3D9' }}>
                        <img src="/images/3d_milk_bottle_1788167274008.jpg" alt="Milk Bottle" style={{ width: 'auto', maxHeight: '110px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#431407', margin: '0 0 4px 0' }}>Milk</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#c2410c', margin: 0 }}>500 mL</div>
                      </div>
                    </div>

                  </div>

                  {/* 3. SAME VOLUME BADGE */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: '#fef3c7', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '2px dashed #f59e0b', textAlign: 'center' }}>
                      <span style={{ color: '#431407', fontWeight: '900', fontSize: '1.4rem' }}>SAME VOLUME</span>
                      <span style={{ color: '#431407', fontWeight: 'bold', fontSize: '1.4rem', margin: '0 1rem' }}>•</span>
                      <span style={{ color: '#431407', fontWeight: '900', fontSize: '1.4rem' }}>DIFFERENT MATERIAL</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', height: '100%', justifyContent: 'center' }}>
                  {/* MEASURING VOLUME */}
                  <div style={{ background: '#FDFBF7', border: '2px solid #EAE3D9', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxSizing: 'border-box', boxShadow: '0 4px 12px rgba(87,65,51,0.05)', width: '100%' }}>
                    
                    <div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#134e4a', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Measuring Volume</div>
                      <p style={{ margin: '0 0 0.75rem 0', color: '#431407', fontSize: '1.6rem', lineHeight: '1.45' }}>
                        Labels such as <strong>200 mL, 500 mL</strong> and <strong>1 L</strong> tell us how much a container can hold.
                      </p>
                      <p style={{ margin: '0', color: '#431407', fontSize: '1.6rem', lineHeight: '1.45' }}>
                        Volume is measured in <strong>millilitres (mL)</strong> or <strong>litres (L)</strong>.
                      </p>
                    </div>

                    <div style={{ background: '#fef3c7', border: '2px dashed #f59e0b', padding: '0.75rem', borderRadius: '12px', color: '#431407', fontWeight: '900', fontSize: '2.2rem', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                      1 L = 1000 mL
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#FFFFFF', border: '1px solid #EAE3D9', padding: '0.75rem 1rem', borderRadius: '12px', width: '100%', boxSizing: 'border-box' }}>
                      <Info size={32} color="#c2410c" style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, color: '#431407', fontSize: '1.4rem', lineHeight: '1.4', fontWeight: '600' }}>
                        <strong>Look at the label</strong> on a container to see how much it can hold.
                      </p>
                    </div>

                  </div>

                  {/* FILLER STRIP */}
                  <div style={{ marginTop: '1rem', background: '#FDFBF7', padding: '0.75rem 1.5rem', borderRadius: '16px', border: '1px solid #EAE3D9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#431407', fontSize: '1.4rem', lineHeight: '1.4', fontWeight: '800' }}>
                      Container labels tell us the volume they can hold:
                    </p>
                    <p style={{ margin: 0, fontWeight: '900', color: '#134e4a', fontSize: '1.6rem' }}>
                      200 mL &nbsp;•&nbsp; 500 mL &nbsp;•&nbsp; 1 L
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.25rem', boxSizing: 'border-box', overflow: 'hidden' }}
            >
              <div style={{ flexShrink: 0 }}>
                <h3 style={{ fontSize: '2.8rem', color: '#134e4a', margin: '0 0 0.5rem 0', fontWeight: '900', fontFamily: 'serif' }}>Explore Different Volumes</h3>
                <p style={{ color: '#431407', fontSize: '1.6rem', margin: 0 }}>Click each container to discover how much it can hold.</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', flex: 1, minHeight: 0 }}>
                
                {/* Tea Cup */}
                <div onClick={() => handleReveal('teaCup')} style={{ cursor: volumesRevealed.teaCup ? 'default' : 'pointer', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.teaCup ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.teaCup ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_tea_cup_1788167295553.jpg" alt="Tea Cup" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#431407', marginBottom: '0.5rem' }}>Tea Cup</div>
                    {volumesRevealed.teaCup ? (
                      <div style={{ color: '#134e4a', fontWeight: '900', fontSize: '2rem' }}>150 mL</div>
                    ) : (
                      <button style={{ background: '#c2410c', border: 'none', color: '#FFFFFF', padding: '0.5rem 1.5rem', borderRadius: '24px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(194, 65, 12, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Soup Bowl */}
                <div onClick={() => handleReveal('soupBowl')} style={{ cursor: volumesRevealed.soupBowl ? 'default' : 'pointer', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.soupBowl ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.soupBowl ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_soup_bowl_1788167306592.jpg" alt="Soup Bowl" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#431407', marginBottom: '0.5rem' }}>Soup Bowl</div>
                    {volumesRevealed.soupBowl ? (
                      <div style={{ color: '#134e4a', fontWeight: '900', fontSize: '2rem' }}>300 mL</div>
                    ) : (
                      <button style={{ background: '#c2410c', border: 'none', color: '#FFFFFF', padding: '0.5rem 1.5rem', borderRadius: '24px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(194, 65, 12, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Water Glass */}
                <div onClick={() => handleReveal('waterGlass')} style={{ cursor: volumesRevealed.waterGlass ? 'default' : 'pointer', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.waterGlass ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.waterGlass ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_water_glass_1788167318191.jpg" alt="Water Glass" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#431407', marginBottom: '0.5rem' }}>Water Glass</div>
                    {volumesRevealed.waterGlass ? (
                      <div style={{ color: '#134e4a', fontWeight: '900', fontSize: '2rem' }}>250 mL</div>
                    ) : (
                      <button style={{ background: '#c2410c', border: 'none', color: '#FFFFFF', padding: '0.5rem 1.5rem', borderRadius: '24px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(194, 65, 12, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Bucket */}
                <div onClick={() => handleReveal('bucket')} style={{ cursor: volumesRevealed.bucket ? 'default' : 'pointer', border: '1px solid #EAE3D9', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.bucket ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.bucket ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_realistic_10l_bucket_1788169915490.jpg" alt="Bucket" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#431407', marginBottom: '0.5rem' }}>Bucket</div>
                    {volumesRevealed.bucket ? (
                      <div style={{ color: '#134e4a', fontWeight: '900', fontSize: '2rem' }}>10 L</div>
                    ) : (
                      <button style={{ background: '#c2410c', border: 'none', color: '#FFFFFF', padding: '0.5rem 1.5rem', borderRadius: '24px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(194, 65, 12, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>
                
              </div>

              {/* Key Takeaway Integrated Below Grid */}
              <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'white', width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <Star size={32} color="#059669" />
                </div>
                <div>
                  <h4 style={{ color: '#065f46', margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: '900' }}>Key Takeaway</h4>
                  <p style={{ margin: 0, color: '#064e3b', fontSize: '1.4rem', fontWeight: '600' }}>Volume is the amount of space occupied by an object or substance. Different containers can hold different amounts.</p>
                </div>
              </div>

            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* BOTTOM NAVIGATION FOR MAIN AREA */}
        <div style={{ padding: '0.75rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid #EAE3D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <button 
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.5rem 1.25rem', 
              borderRadius: '24px', 
              border: '1px solid #EAE3D9', 
              background: activeStep === 0 ? 'transparent' : '#FFFFFF',
              color: activeStep === 0 ? 'transparent' : '#431407',
              cursor: activeStep === 0 ? 'default' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: activeStep === 0 ? 'none' : '0 2px 6px rgba(0,0,0,0.05)',
              opacity: activeStep === 0 ? 0 : 1
            }}
          >
            <ChevronLeft size={24} /> Previous
          </button>
          
          <div style={{ color: '#431407', fontWeight: '900', fontSize: '1.4rem' }}>
            Step {activeStep + 1} of 3
          </div>

          <button 
            onClick={() => setActiveStep(Math.min(2, activeStep + 1))}
            disabled={activeStep === 2}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.5rem 1.25rem', 
              borderRadius: '24px', 
              border: 'none', 
              background: activeStep === 2 ? 'transparent' : '#c2410c',
              color: activeStep === 2 ? 'transparent' : 'white',
              cursor: activeStep === 2 ? 'default' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: activeStep === 2 ? 'none' : '0 4px 12px rgba(194, 65, 12, 0.3)',
              opacity: activeStep === 2 ? 0 : 1
            }}
          >
            Next <ChevronRight size={24} />
          </button>
        </div>
      </div>

    </div>
  );
}

Stage8c_VolumeConcept.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func
};
