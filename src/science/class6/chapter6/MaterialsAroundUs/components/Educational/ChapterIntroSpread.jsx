import React, { useEffect } from 'react';
import htmlUrl from '../../../../../../assets/historical-facts.html?url';

export default function ChapterIntroSpread({ onContinue, onBack }) {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NAVIGATE') {
        if (event.data.direction === 'back') {
          onBack();
        } else if (event.data.direction === 'next') {
          onContinue();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onBack, onContinue]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      background: '#000',
      overflow: 'hidden'
    }}>
      <iframe
        src={htmlUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Historical Facts"
      />
    </div>
  );
}
