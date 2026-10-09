import React, { useEffect } from 'react';
import balancedDietHtml from '../assets/activity_3_8_balanced_diet.html?raw';

// Activity 3.8 — Let us find out: Balanced diet
export default function Activity38BalancedDietPage({ onBack, onNext, onBackToDashboard }) {
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
        background: '#1a0f06',
        overflow: 'hidden',
      }}
    >
      <iframe
        srcDoc={balancedDietHtml}
        title="Activity 3.8 — Let us find out (Balanced diet)"
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
