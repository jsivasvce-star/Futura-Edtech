import React, { useState } from 'react';

export default function SectionNextButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      flexShrink: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: '10px',
      paddingBottom: '2px',
      boxSizing: 'border-box'
    }}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 22px',
          fontSize: 'clamp(1.18rem, 1.32vw, 1.52rem)',
          fontWeight: 900,
          fontFamily: '"Times New Roman", Times, Georgia, serif',
          color: '#ffffff',
          background: isHovered
            ? 'linear-gradient(135deg, #b45309 0%, #92400e 100%)'
            : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
          border: '1.5px solid rgba(254, 243, 199, 0.45)',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 6px 18px rgba(217, 119, 6, 0.55)'
            : '0 4px 14px rgba(217, 119, 6, 0.38)',
          transform: isHovered ? 'translateY(-1px) scale(1.02)' : 'none',
          transition: 'all 0.18s ease',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }}
      >
        <span>Next →</span>
      </button>
    </div>
  );
}
