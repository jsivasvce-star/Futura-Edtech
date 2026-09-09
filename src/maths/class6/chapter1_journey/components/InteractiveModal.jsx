import React, { Suspense } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ErrorBoundary from '../../../../components/ErrorBoundary';

import WhatMaths from '../../chapter1/WhatMaths';

export default function InteractiveModal({
  node,
  onClose,
  onCompleteNode
}) {
  const renderContent = () => {
    if (node.id === '1.1') {
      return (
        <WhatMaths
          onNext={() => onCompleteNode('1.1')}
          onPrev={onClose}
          onBack={onClose}
        />
      );
    }
    return null;
  };

  return (
    <div className="journey-modal-backdrop">
      {/* Top Navigation Bar */}
      <div className="journey-modal-header">
        <button className="journey-back-btn" onClick={onClose}>
          <ArrowLeft size={16} /> Back to Learning Journey
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '700',
            color: '#a5b4fc',
            background: 'rgba(99, 102, 241, 0.2)',
            padding: '0.25rem 0.65rem',
            borderRadius: '6px'
          }}>
            {node.displayId}
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>
            {node.title}
          </span>
        </div>

        <button
          className="journey-modal-complete-btn"
          onClick={() => onCompleteNode(node.id)}
        >
          Complete & Advance <ArrowRight size={16} />
        </button>
      </div>

      {/* Main Content Body (Empty/Blank for all destination pages) */}
      <div className="journey-modal-content">
        <ErrorBoundary>
          <Suspense fallback={null}>
            {renderContent()}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
