import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
export default function AirExperiments3D({ onComplete }) {
   const [inflate, setInflate] = useState(false);
   const [weigh, setWeigh] = useState(false);

   useEffect(() => {
      if (inflate && weigh && onComplete) {
         onComplete();
      }
   }, [inflate, weigh, onComplete]);

   return (
      <div style={{ display: 'flex', gap: '16px', width: '100%', height: '100%', minHeight: '340px' }}>
         {/* Experiment 1 */}
         <div style={{ flex: 1, background: '#fff', borderRadius: '16px', border: '1.5px solid var(--line, #ccc)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 12px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '1.2rem', fontWeight: '900', color: 'var(--ink-soft, #333)' }}>
               1. Air occupies space
            </div>
            <motion.div 
               style={{ flex: 1, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
               onClick={() => setInflate(true)}
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.98 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
               <img src="/images/balloon_pump.jpg" alt="Pumping air into a balloon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               {inflate && (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.75)', padding: '16px 24px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white', pointerEvents: 'none', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                     Air occupies space.
                  </motion.div>
               )}
            </motion.div>
         </div>

         {/* Experiment 2 */}
         <div style={{ flex: 1, background: '#fff', borderRadius: '16px', border: '1.5px solid var(--line, #ccc)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 12px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '1.2rem', fontWeight: '900', color: 'var(--ink-soft, #333)' }}>
               2. Air has mass
            </div>
            <motion.div 
               style={{ flex: 1, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
               onClick={() => setWeigh(true)}
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.98 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
               <img src="/images/balloon_scale.jpg" alt="Weighing balloons on a scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               {weigh && (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.75)', padding: '16px 24px', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white', pointerEvents: 'none', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                     Air has mass.
                  </motion.div>
               )}
            </motion.div>
         </div>
      </div>
   );
}
