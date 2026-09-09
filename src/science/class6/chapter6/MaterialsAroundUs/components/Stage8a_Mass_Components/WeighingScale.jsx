import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { RealisticCup } from './RealisticCup';
import weighingMachineImg from '../../../../../../assets/weighing-machine.png';

export const WeighingScale = ({ currentCupOnScale, mass, isHovered }) => {
  const [displayMass, setDisplayMass] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const prevCupRef = useRef(null);

  // Digital weighing settling simulation (rapid realistic sensor sampling)
  useEffect(() => {
    if (!currentCupOnScale || mass === undefined || mass === 0) {
      setDisplayMass(0);
      setIsSettling(false);
      prevCupRef.current = null;
      return;
    }

    // Only run settling when a new cup is placed
    if (prevCupRef.current !== currentCupOnScale) {
      prevCupRef.current = currentCupOnScale;
      setIsSettling(true);

      const target = mass;
      // 4-step rapid sensor stabilization sequence (~550ms total)
      const step1 = parseFloat((target * 0.42 + (Math.random() * 4 - 2)).toFixed(2));
      const step2 = parseFloat((target * 0.84 + (Math.random() * 2 - 1)).toFixed(2));
      const step3 = parseFloat((target * 0.98 + (Math.random() * 0.8 - 0.4)).toFixed(2));

      setDisplayMass(step1);

      const t1 = setTimeout(() => {
        setDisplayMass(step2);
      }, 160);

      const t2 = setTimeout(() => {
        setDisplayMass(step3);
      }, 340);

      const t3 = setTimeout(() => {
        setDisplayMass(target);
        setIsSettling(false);
      }, 550);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setDisplayMass(mass);
    }
  }, [currentCupOnScale, mass]);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% -20%, #FFFFFF 0%, #f2f0ec 50%, #e5e2db 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      {/* Subtle desk texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.15,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }} />

      {/* Scale Assembly */}
      <div style={{ position: 'relative', width: '380px', height: '260px', marginTop: '20px' }}>
        
        {/* Invisible expanded drop target for extremely forgiving dropping */}
        <div 
          data-droptarget="scale"
          style={{
            position: 'absolute',
            top: '-40px', left: '50%', transform: 'translateX(-50%)',
            width: '320px', height: '160px', 
            borderRadius: '50%',
            background: 'transparent',
            zIndex: 20 
          }}
        />

        {/* Realistic image weighing scale */}
        <img 
          src={weighingMachineImg} 
          alt="Weighing Scale"
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />

        {/* LCD Overlay for live mass reading */}
        <div style={{
          position: 'absolute',
          bottom: '22%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '180px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          {isSettling && (
            <div style={{
              position: 'absolute',
              left: '10px', top: '10px',
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#1a1f1c',
              opacity: 0.7
            }} />
          )}
          <span style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '1.8rem', 
            color: '#1a1f1c', 
            fontWeight: 'bold',
            letterSpacing: '1px',
            textShadow: '0px 0px 1px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap'
          }}>
            {displayMass ? `${displayMass.toFixed(2)} g` : '0.00 g'}
          </span>
        </div>

        {/* Anchor point: Renders ONLY currentCupOnScale if present */}
        <div 
          style={{
            position: 'absolute', top: '30%', left: '50%',
            width: '1px', height: '1px'
          }}
        >
          <AnimatePresence mode="wait">
            {currentCupOnScale && (
              <motion.div
                key={currentCupOnScale}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '-40px',
                  width: '80px', height: '100px',
                  zIndex: 10
                }}
              >
                 <RealisticCup material={currentCupOnScale} velocityX={0} />
                 
                 {/* Realistic Grounding Contact Shadow on the metal pan */}
                 <motion.div 
                   initial={{ opacity: 0.3, scale: 0.9 }}
                   animate={{ opacity: 0.7, scale: 1 }}
                   transition={{ duration: 0.2 }}
                   style={{
                     position: 'absolute', bottom: '-4px', left: '12%', right: '12%', height: '8px',
                     background: 'rgba(0,0,0,0.65)', borderRadius: '50%', filter: 'blur(3px)', zIndex: -1
                   }} 
                 />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

WeighingScale.propTypes = {
  currentCupOnScale: PropTypes.string,
  mass: PropTypes.number,
  isHovered: PropTypes.bool
};
