import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
export default function AirExperiments3D({ onComplete, W = ({i, children}) => <span>{children}</span> }) {
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
            <div style={{ padding: '12px 16px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '26px', fontWeight: '900', color: '#3B2A1F', fontFamily: '"Merriweather", "Georgia", serif' }}>
               <W i={16}>1.</W> <W i={17}>Air</W> <W i={18}>occupies</W> <W i={19}>space</W>
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
                     <W i={20}>Air</W> <W i={21}>occupies</W> <W i={22}>space.</W>
                  </motion.div>
               )}
            </motion.div>
         </div>

         {/* Experiment 2 */}
         <div style={{ flex: 1, background: '#fff', borderRadius: '16px', border: '1.5px solid var(--line, #ccc)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '26px', fontWeight: '900', color: '#3B2A1F', fontFamily: '"Merriweather", "Georgia", serif' }}>
               <W i={23}>2.</W> <W i={24}>Air</W> <W i={25}>has</W> <W i={26}>mass</W>
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
                     <W i={27}>Air</W> <W i={28}>has</W> <W i={29}>mass.</W>
                  </motion.div>
               )}
            </motion.div>
         </div>
      </div>
   );
}
