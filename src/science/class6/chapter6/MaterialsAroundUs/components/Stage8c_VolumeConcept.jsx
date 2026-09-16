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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', color: '#3B2A1F', background: '#FDFBF7', padding: '0', boxSizing: 'border-box', overflow: 'hidden' }}>
      
      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, background: '#FDFBF7', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
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
                <div style={{ flex: 1, display: 'flex', gap: '4rem', alignItems: 'center', minHeight: 0, height: '100%' }}>
                  {/* Left: Illustration */}
                  <div style={{ flex: '1', height: '100%', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', minHeight: 0 }}>
                    <img src="/images/volume_overflow.png" alt="Overflowing Bottle" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  
                  {/* Right: Explanation */}
                  <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '3.5rem', color: '#3B2A1F', margin: '0 0 1rem 0', lineHeight: '1.1', fontWeight: '900', fontFamily: '"Merriweather", "Georgia", serif' }}>WHY CAN&apos;T I ADD MORE WATER?</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ margin: 0, color: '#3B2A1F', fontSize: '2.2rem', lineHeight: '1.4' }}>
                        The bottle has <strong style={{ fontWeight: '900', color: '#A64B27' }}>limited space</strong>.
                      </p>
                      <p style={{ margin: 0, color: '#3B2A1F', fontSize: '2.2rem', lineHeight: '1.4' }}>
                        Once it is full, no more water can fit.
                      </p>
                    </div>
                    
                    <div style={{ marginTop: '1.25rem', background: '#FDFBF7', padding: '1rem 1.5rem', borderRadius: '16px', border: '2px dashed #D9C9A3' }}>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#7A6A52', fontSize: '2rem', fontWeight: '800', fontFamily: '"Merriweather", "Georgia", serif' }}>That amount of space is called</p>
                      <div style={{ color: '#A64B27', background: '#FFFFFF', display: 'inline-block', padding: '0.25rem 1rem', fontSize: '4.5rem', fontWeight: '900', letterSpacing: '2px', borderRadius: '8px', border: '2px solid #D9C9A3' }}>VOLUME</div>
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
                  gap: '3rem',
                  padding: '1.5rem 2.5rem', 
                  alignItems: 'center', 
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', height: '100%', justifyContent: 'center' }}>
                  
                  {/* 1. TITLE, SUBTITLE, EXPLANATION */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '3.8rem', color: '#3B2A1F', margin: '0 0 1rem 0', fontWeight: '900', letterSpacing: '-0.5px', fontFamily: '"Merriweather", "Georgia", serif' }}>Volume in Everyday Life</h3>
                    <p style={{ margin: '0 0 1rem 0', color: '#A64B27', fontSize: '2.4rem', lineHeight: '1.3', fontWeight: '800' }}>
                      How much space can a container hold?
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#3B2A1F', fontSize: '2rem', lineHeight: '1.45' }}>
                      Different containers can hold different amounts of liquid.
                    </p>
                    <p style={{ margin: 0, color: '#3B2A1F', fontSize: '2rem', lineHeight: '1.45' }}>
                      The amount a container can hold is described using <strong style={{ color: '#A64B27', background: '#FFFFFF', padding: '0.2rem 0.5rem', fontWeight: '900', borderRadius: '6px', border: '2px solid #D9C9A3' }}>volume</strong>.
                    </p>
                  </div>
                  
                  {/* 2. WATER + MILK COMPARISON */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', width: '100%', marginBottom: '1rem' }}>
                    
                    {/* Water */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', background: '#FFFFFF', borderRadius: '16px', border: '2px solid #D9C9A3' }}>
                        <img src="/images/3d_water_bottle_1788167284292.jpg" alt="Water Bottle" style={{ width: 'auto', maxHeight: '120px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7A6A52', margin: '0 0 4px 0' }}>Water</div>
                        <div style={{ fontSize: '2.6rem', fontWeight: '900', color: '#3B2A1F', margin: 0 }}>500 mL</div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div style={{ fontSize: '4rem', color: '#7A6A52', fontWeight: '300', marginBottom: '1.5rem' }}>&harr;</div>

                    {/* Milk */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', background: '#FFFFFF', borderRadius: '16px', border: '2px solid #D9C9A3' }}>
                        <img src="/images/3d_milk_bottle_1788167274008.jpg" alt="Milk Bottle" style={{ width: 'auto', maxHeight: '120px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7A6A52', margin: '0 0 4px 0' }}>Milk</div>
                        <div style={{ fontSize: '2.6rem', fontWeight: '900', color: '#3B2A1F', margin: 0 }}>500 mL</div>
                      </div>
                    </div>

                  </div>

                  {/* 3. SAME VOLUME BADGE */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: '#FDFBF7', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '2px dashed #D9C9A3', textAlign: 'center' }}>
                      <span style={{ color: '#A64B27', fontWeight: '900', fontSize: '1.8rem' }}>SAME VOLUME</span>
                      <span style={{ color: '#7A6A52', fontWeight: 'bold', fontSize: '1.8rem', margin: '0 1rem' }}>•</span>
                      <span style={{ color: '#A64B27', fontWeight: '900', fontSize: '1.8rem' }}>DIFFERENT MATERIAL</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%', height: '100%', justifyContent: 'center' }}>
                  {/* MEASURING VOLUME */}
                  <div style={{ background: '#FDFBF7', border: '2px solid #D9C9A3', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxSizing: 'border-box', boxShadow: '0 4px 12px rgba(59,42,31,0.05)', width: '100%' }}>
                    
                    <div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#3B2A1F', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: '"Merriweather", "Georgia", serif' }}>Measuring Volume</div>
                      <p style={{ margin: '0 0 0.75rem 0', color: '#3B2A1F', fontSize: '1.8rem', lineHeight: '1.45' }}>
                        Labels such as <strong style={{ color: '#A64B27' }}>200 mL, 500 mL</strong> and <strong style={{ color: '#A64B27' }}>1 L</strong> tell us how much a container can hold.
                      </p>
                      <p style={{ margin: '0', color: '#3B2A1F', fontSize: '1.8rem', lineHeight: '1.45' }}>
                        Volume is measured in <strong style={{ color: '#A64B27' }}>millilitres (mL)</strong> or <strong style={{ color: '#A64B27' }}>litres (L)</strong>.
                      </p>
                    </div>

                    <div style={{ background: '#FDFBF7', border: '2px dashed #D9C9A3', padding: '1rem', borderRadius: '12px', color: '#A64B27', fontWeight: '900', fontSize: '3rem', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                      1 L = 1000 mL
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#FFFFFF', border: '2px solid #D9C9A3', padding: '1rem 1.25rem', borderRadius: '12px', width: '100%', boxSizing: 'border-box' }}>
                      <Info size={36} color="#A64B27" style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, color: '#3B2A1F', fontSize: '1.6rem', lineHeight: '1.4', fontWeight: '600' }}>
                        <strong style={{ color: '#A64B27' }}>Look at the label</strong> on a container to see how much it can hold.
                      </p>
                    </div>

                  </div>

                  {/* FILLER STRIP */}
                  <div style={{ marginTop: '0.75rem', background: '#FDFBF7', padding: '1rem 1.5rem', borderRadius: '16px', border: '2px solid #D9C9A3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#7A6A52', fontSize: '1.8rem', lineHeight: '1.4', fontWeight: '800' }}>
                      Container labels tell us the volume they can hold:
                    </p>
                    <p style={{ margin: 0, fontWeight: '900', color: '#3B2A1F', fontSize: '2.4rem' }}>
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
              style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2.5rem', gap: '3rem', boxSizing: 'border-box', overflow: 'hidden', height: '100%', justifyContent: 'space-between' }}
            >
              <div style={{ flexShrink: 0 }}>
                <h3 style={{ fontSize: '3.8rem', color: '#3B2A1F', margin: '0 0 0.5rem 0', fontWeight: '900', fontFamily: '"Merriweather", "Georgia", serif' }}>Explore Different Volumes</h3>
                <p style={{ color: '#7A6A52', fontSize: '2rem', margin: 0, fontWeight: '600' }}>Click each container to discover how much it can hold.</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', flex: 1, minHeight: 0 }}>
                
                {/* Tea Cup */}
                <div onClick={() => handleReveal('teaCup')} style={{ cursor: volumesRevealed.teaCup ? 'default' : 'pointer', border: '2px solid #D9C9A3', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.teaCup ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.teaCup ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_tea_cup_1788167295553.jpg" alt="Tea Cup" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.8rem', color: '#7A6A52', marginBottom: '0.5rem' }}>Tea Cup</div>
                    {volumesRevealed.teaCup ? (
                      <div style={{ color: '#3B2A1F', fontWeight: '900', fontSize: '2.6rem' }}>150 mL</div>
                    ) : (
                      <button style={{ background: '#A64B27', border: 'none', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '24px', fontSize: '1.6rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(166, 75, 39, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Soup Bowl */}
                <div onClick={() => handleReveal('soupBowl')} style={{ cursor: volumesRevealed.soupBowl ? 'default' : 'pointer', border: '2px solid #D9C9A3', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.soupBowl ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.soupBowl ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_soup_bowl_1788167306592.jpg" alt="Soup Bowl" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.8rem', color: '#7A6A52', marginBottom: '0.5rem' }}>Soup Bowl</div>
                    {volumesRevealed.soupBowl ? (
                      <div style={{ color: '#3B2A1F', fontWeight: '900', fontSize: '2.6rem' }}>300 mL</div>
                    ) : (
                      <button style={{ background: '#A64B27', border: 'none', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '24px', fontSize: '1.6rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(166, 75, 39, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Water Glass */}
                <div onClick={() => handleReveal('waterGlass')} style={{ cursor: volumesRevealed.waterGlass ? 'default' : 'pointer', border: '2px solid #D9C9A3', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.waterGlass ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.waterGlass ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_water_glass_1788167318191.jpg" alt="Water Glass" style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.8rem', color: '#7A6A52', marginBottom: '0.5rem' }}>Water Glass</div>
                    {volumesRevealed.waterGlass ? (
                      <div style={{ color: '#3B2A1F', fontWeight: '900', fontSize: '2.6rem' }}>250 mL</div>
                    ) : (
                      <button style={{ background: '#A64B27', border: 'none', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '24px', fontSize: '1.6rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(166, 75, 39, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>

                {/* Bucket */}
                <div onClick={() => handleReveal('bucket')} style={{ cursor: volumesRevealed.bucket ? 'default' : 'pointer', border: '2px solid #D9C9A3', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#FFFFFF', minHeight: 0, overflow: 'hidden', transition: 'transform 0.2s', transform: volumesRevealed.bucket ? 'none' : 'scale(1)', ':hover': { transform: volumesRevealed.bucket ? 'none' : 'scale(1.02)' } }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
                    <img src="/images/3d_realistic_10l_bucket_1788169915490.jpg" alt="Bucket" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                  </div>
                  <div style={{ textAlign: 'center', width: '100%', flexShrink: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.8rem', color: '#7A6A52', marginBottom: '0.5rem' }}>Bucket</div>
                    {volumesRevealed.bucket ? (
                      <div style={{ color: '#3B2A1F', fontWeight: '900', fontSize: '2.6rem' }}>10 L</div>
                    ) : (
                      <button style={{ background: '#A64B27', border: 'none', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '24px', fontSize: '1.6rem', cursor: 'pointer', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 6px rgba(166, 75, 39, 0.2)' }}>Reveal</button>
                    )}
                  </div>
                </div>
                
              </div>

              {/* Key Takeaway Integrated Below Grid */}
              <div style={{ background: '#FDFBF7', border: '2px solid #4B7A2A', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'white', width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '2px solid #4B7A2A' }}>
                  <Star size={40} color="#4B7A2A" />
                </div>
                <div>
                  <h4 style={{ color: '#4B7A2A', margin: '0 0 0.5rem 0', fontSize: '2.2rem', fontWeight: '900', fontFamily: '"Merriweather", "Georgia", serif' }}>Key Takeaway</h4>
                  <p style={{ margin: 0, color: '#3B2A1F', fontSize: '2rem', fontWeight: '600', lineHeight: '1.4' }}>Volume is the amount of space occupied by an object or substance. Different containers can hold different amounts.</p>
                </div>
              </div>

            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* BOTTOM NAVIGATION FOR MAIN AREA */}
        <div style={{ padding: '0.75rem 1.5rem', background: '#FFFFFF', borderTop: '2px solid #D9C9A3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <button 
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '0.5rem 1.25rem', 
              borderRadius: '24px', 
              border: '2px solid #D9C9A3', 
              background: activeStep === 0 ? 'transparent' : '#FDFBF7',
              color: activeStep === 0 ? 'transparent' : '#7A6A52',
              cursor: activeStep === 0 ? 'default' : 'pointer',
              fontWeight: '900',
              fontSize: '1.4rem',
              boxShadow: activeStep === 0 ? 'none' : '0 2px 6px rgba(59, 42, 31, 0.05)',
              opacity: activeStep === 0 ? 0 : 1
            }}
          >
            <ChevronLeft size={24} /> Previous
          </button>
          
          <div style={{ color: '#3B2A1F', fontWeight: '900', fontSize: '1.6rem', fontFamily: '"Merriweather", "Georgia", serif' }}>
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
              background: activeStep === 2 ? 'transparent' : '#A64B27',
              color: activeStep === 2 ? 'transparent' : '#FFFFFF',
              cursor: activeStep === 2 ? 'default' : 'pointer',
              fontWeight: '900',
              fontSize: '1.4rem',
              boxShadow: activeStep === 2 ? 'none' : '0 4px 12px rgba(166, 75, 39, 0.3)',
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
