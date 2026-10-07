import React from 'react';
import Chapter3LearningLabV1 from './version1/Chapter3LearningLab';

export default function Chapter3LearningLab({ onBack, onHeaderVisibilityChange, initialVersion = 'v1' }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Chapter3LearningLabV1
        onBack={onBack}
        onHeaderVisibilityChange={onHeaderVisibilityChange}
      />
    </div>
  );
}
