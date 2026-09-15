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
      {/* V1 and V2 Version Switcher Buttons */}
      <div 
        style={{
          position: 'fixed',
          top: '16px',
          right: '80px',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px',
          padding: '4px',
          gap: '4px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          pointerEvents: 'auto'
        }}
        role="group"
        aria-label="Chapter 2 Version Selection"
      >
        <button
          id="btn-version-1"
          type="button"
          onClick={() => handleVersionChange('v1')}
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeVersion === 'v1' 
              ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' 
              : 'transparent',
            color: activeVersion === 'v1' ? '#FFFFFF' : '#94A3B8',
            boxShadow: activeVersion === 'v1' ? '0 2px 10px rgba(217, 119, 6, 0.4)' : 'none',
            transform: activeVersion === 'v1' ? 'scale(1.04)' : 'scale(1)'
          }}
          title="Switch to Version 1"
        >
          Version 1
        </button>

        <button
          id="btn-version-2"
          type="button"
          onClick={() => handleVersionChange('v2')}
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            background: activeVersion === 'v2' 
              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
              : 'transparent',
            color: activeVersion === 'v2' ? '#FFFFFF' : '#94A3B8',
            boxShadow: activeVersion === 'v2' ? '0 2px 10px rgba(16, 185, 129, 0.4)' : 'none',
            transform: activeVersion === 'v2' ? 'scale(1.04)' : 'scale(1)'
          }}
          title="Switch to Version 2"
        >
          Version 2
        </button>
      </div>

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
