import React from 'react';
import morningBgUrl from './morning.jpg';
import nightBgUrl from './night_sky_moon_backdrop.jpg';

export default function MagnetActivityBackground({ environmentMode = 'day', style = {}, children }) {
  const isNight = environmentMode === 'night';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#02050D',
        backgroundImage: `url(${isNight ? nightBgUrl : morningBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease',
        ...style
      }}
    >
      {/* Soft atmospheric overlay for UI contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isNight
            ? 'radial-gradient(ellipse at 50% 25%, rgba(99, 102, 241, 0.08) 0%, rgba(2, 6, 23, 0.35) 100%)'
            : 'radial-gradient(ellipse at 50% 30%, transparent 50%, rgba(0, 0, 0, 0.25) 100%)',
          pointerEvents: 'none',
          transition: 'background 0.5s ease'
        }}
      />

      {children}
    </div>
  );
}