import React, { useState, useEffect } from 'react';
export default function AirExperiments3D({ onComplete }) {
   const [inflate, setInflate] = useState(false);
   const [weigh, setWeigh] = useState(false);

   useEffect(() => {
      if (inflate && weigh && onComplete) {
         onComplete();
      }
   }, [inflate, weigh, onComplete]);

   return (
      <div style={{ display: 'flex', gap: '12px', width: '100%', height: '100%', minHeight: '260px' }}>
         {/* Experiment 1 */}
         <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1.5px solid var(--line, #ccc)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '6px 8px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '0.75rem', fontWeight: '800', color: 'var(--ink-soft, #333)' }}>
               1. Air occupies space
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
               <img src="/images/balloon_pump.jpg" alt="Pumping air into a balloon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <button 
                  onClick={() => setInflate(true)}
                  style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'var(--amber, #3b82f6)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
               >
                  Pump Air
               </button>
               {inflate && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--green-pale, rgba(255,255,255,0.9))', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--green-deep, #15803d)', pointerEvents: 'none' }}>
                     Volume increases!
                  </div>
               )}
            </div>
         </div>

         {/* Experiment 2 */}
         <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1.5px solid var(--line, #ccc)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '6px 8px', background: 'var(--amber-pale, #f8f9fa)', borderBottom: '1px solid var(--line, #ccc)', fontSize: '0.75rem', fontWeight: '800', color: 'var(--ink-soft, #333)' }}>
               2. Air has mass
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
               <img src="/images/balloon_scale.jpg" alt="Weighing balloons on a scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <button 
                  onClick={() => setWeigh(true)}
                  style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'var(--amber, #3b82f6)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
               >
                  Weigh
               </button>
               {weigh && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--green-pale, rgba(255,255,255,0.9))', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--green-deep, #15803d)', pointerEvents: 'none' }}>
                     Inflated balloon is heavier!
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
