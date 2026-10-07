import React, { useEffect } from 'react';

// Activity 3.5 — Let us investigate (Test for starch)
// Replaces the old "Food Testing Lab" page.
// 1. Put activity_3_5_test_for_starch.html in:  public/activities/
// 2. Point the Activity 3.5 route to this component.
export default function Activity35({ onBackToDashboard, onBack, onNext }) {
  const handleBack = onBack || onBackToDashboard;

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'ACTIVITY_BACK') {
        if (handleBack) {
          handleBack();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleBack]);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 9999, background: '#000' }}>
      <iframe
        src="/activities/activity_3_5_test_for_starch.html"
        title="Activity 3.5 — Let us investigate"
        style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', border: 0, display: 'block' }}
      />
    </div>
  );
}
