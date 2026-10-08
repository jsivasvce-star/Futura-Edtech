import React, { useEffect } from 'react';
import proteinsHtml from '../assets/activity_3_7_test_for_proteins.html?raw';

// Activity 3.7 — Let us investigate: Test for proteins
export default function Activity37TestForProteinsPage({ onBack, onNext, onBackToDashboard }) {
  const handleBack = onBack || onBackToDashboard;

  useEffect(() => {
    const handleMessage = (e) => {
      const type = e.data?.type;
      if (type === 'ACTIVITY_BACK' || type === 'back-activity') {
        handleBack?.();
      } else if (type === 'ACTIVITY_NEXT' || type === 'next-activity') {
        onNext?.();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleBack, onNext]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#3b2412',
        overflow: 'hidden',
      }}
    >
      <iframe
        srcDoc={proteinsHtml}
        title="Activity 3.7 — Let us investigate (Test for proteins)"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          border: 0,
          display: 'block',
        }}
      />
    </div>
  );
}
