import React, { useState, useEffect, Suspense, lazy } from 'react';
import Chapter2LearningLabV2 from './version2/Chapter2LearningLab';

const Chapter2LearningLabV1 = lazy(() => import('./version1/Chapter2LearningLab'));

export default function Chapter2LearningLab({ onBack, onHeaderVisibilityChange, onSoundButtonVisibilityChange, initialVersion = 'v2' }) {
  const [activeVersion, setActiveVersion] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('version') || initialVersion || 'v2';
  });

  useEffect(() => {
    if (initialVersion) {
      setActiveVersion(initialVersion);
    }
  }, [initialVersion]);

  useEffect(() => {
    const onHashChange = () => {
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      const ver = params.get('version');
      if (ver && (ver === 'v1' || ver === 'v2')) {
        setActiveVersion(ver);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleVersionChange = (ver) => {
    setActiveVersion(ver);
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    params.set('version', ver);
    window.location.hash = params.toString();
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Render Active Version */}
      {activeVersion === 'v2' ? (
        <Chapter2LearningLabV2
          onBack={onBack}
          onHeaderVisibilityChange={onHeaderVisibilityChange}
          onSoundButtonVisibilityChange={onSoundButtonVisibilityChange}
        />
      ) : (
        <Suspense fallback={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            background: '#0a1220',
            color: '#A7F3D0',
            fontSize: '18px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Loading Chapter 2 Version 1...
          </div>
        }>
          <Chapter2LearningLabV1
            onBack={onBack}
            onHeaderVisibilityChange={onHeaderVisibilityChange}
            onSoundButtonVisibilityChange={onSoundButtonVisibilityChange}
          />
        </Suspense>
      )}
    </div>
  );
}
