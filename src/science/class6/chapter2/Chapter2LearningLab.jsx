import React, { useState } from 'react';
import Chapter2LearningLabV1 from './version1/Chapter2LearningLab';
import Chapter2LearningLabV2 from './version2/Chapter2LearningLab';

export default function Chapter2LearningLab({ onBack, onHeaderVisibilityChange, onSoundButtonVisibilityChange, initialVersion = 'v1' }) {
  const [activeVersion] = useState(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    return params.get('version') || initialVersion || 'v1';
  });

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {activeVersion === 'v2' ? (
        <Chapter2LearningLabV2
          onBack={onBack}
          onHeaderVisibilityChange={onHeaderVisibilityChange}
          onSoundButtonVisibilityChange={onSoundButtonVisibilityChange}
        />
      ) : (
        <Chapter2LearningLabV1
          onBack={onBack}
          onHeaderVisibilityChange={onHeaderVisibilityChange}
          onSoundButtonVisibilityChange={onSoundButtonVisibilityChange}
        />
      )}
    </div>
  );
}
