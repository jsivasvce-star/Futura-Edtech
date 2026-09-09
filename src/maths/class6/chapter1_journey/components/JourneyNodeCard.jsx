import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function JourneyNodeCard({
  node,
  status, // 'active' | 'completed' | 'upcoming'
  onSelect,
  onHover,
  isHovered
}) {
  const isSummary = node.id === 'summary';
  const isQuiz = node.id === 'quiz';
  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  const getCardClasses = () => {
    let classes = 'journey-node-card';
    if (isActive) classes += ' active-node';
    if (isCompleted) classes += ' completed-node';
    if (!isActive && !isCompleted) classes += ' upcoming-node';
    if (isSummary) classes += ' summary-card';
    if (isQuiz) classes += ' quiz-card';
    return classes;
  };

  const getButtonText = () => {
    if (isQuiz) return <>START QUIZ <ArrowRight size={16} /></>;
    return <>EXPLORE <ArrowRight size={16} /></>;
  };

  return (
    <div
      className={getCardClasses()}
      onClick={() => onSelect(node)}
      onMouseEnter={() => onHover && onHover(node.id)}
      onMouseLeave={() => onHover && onHover(null)}
      id={`journey-node-${node.id.replace('.', '_')}`}
    >
      {/* Top: Section Number / Badge & Complete Checkmark */}
      <div className="node-card-top">
        <span className="node-number-badge">
          {node.displayId}
        </span>

        {isCompleted && (
          <span className="node-check-icon" title="Completed">
            ✓
          </span>
        )}
      </div>

      {/* Center: Exact Section Heading */}
      <div className="node-heading-center">
        <h3 className="node-title">
          {node.title}
        </h3>
      </div>

      {/* Bottom: Explore / Start Quiz Action Button */}
      <button
        className="node-action-btn"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
