import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Sparkles, Award, ArrowRight } from 'lucide-react';
import { playMetricSound } from './audioHelper';

const REAL_WORLD_ITEMS = [
  {
    id: 'railway',
    name: 'Railway track between two cities',
    icon: '🚆',
    bestUnit: 'km',
    unitName: 'Kilometre (km)',
    explanation: 'Distances between towns and cities are huge (e.g. 250 km). Using metres would produce unnecessarily huge numbers (250,000 m).'
  },
  {
    id: 'table',
    name: 'Length of classroom study table',
    icon: '🏫',
    bestUnit: 'm',
    unitName: 'Metre (m)',
    explanation: 'Furniture, room lengths, and fabric pieces are conveniently measured in metres (e.g. 2 m).'
  },
  {
    id: 'pencil',
    name: 'Length of a pencil / notebook',
    icon: '✏️',
    bestUnit: 'cm',
    unitName: 'Centimetre (cm)',
    explanation: 'School stationery and handheld items fit comfortably on a 15-cm or 30-cm scale.'
  },
  {
    id: 'page',
    name: 'Thickness of a book page',
    icon: '📄',
    bestUnit: 'mm',
    unitName: 'Millimetre (mm)',
    explanation: 'Paper sheets and wire diameters are fractionally thin and require the smallest unit: millimetres (e.g. 0.1 mm).'
  },
  {
    id: 'marathon',
    name: 'Distance of a running marathon',
    icon: '🏃',
    bestUnit: 'km',
    unitName: 'Kilometre (km)',
    explanation: 'Long athletic courses and highways are universally stated in kilometres (e.g. 42 km).'
  },
  {
    id: 'coin',
    name: 'Thickness of a 5-rupee coin',
    icon: '🪙',
    bestUnit: 'mm',
    unitName: 'Millimetre (mm)',
    explanation: 'Coin edges are tiny (approx 2 mm to 3 mm), best expressed in millimetres.'
  }
];

export default function RealWorldUnitMatcher({ onCompleteAll }) {
  const [selectedItem, setSelectedItem] = useState(REAL_WORLD_ITEMS[0]);
  const [assignments, setAssignments] = useState({}); // { [itemId]: 'km' | 'm' | 'cm' | 'mm' }
  const [feedback, setFeedback] = useState(null);

  const handleAssignUnit = (unit) => {
    if (!selectedItem) return;
    const isCorrect = selectedItem.bestUnit === unit;

    if (isCorrect) {
      playMetricSound('correct');
      setFeedback({ type: 'correct', text: `✓ Correct! ${selectedItem.name} is best measured in ${selectedItem.unitName}. ${selectedItem.explanation}` });
      const newAssignments = { ...assignments, [selectedItem.id]: unit };
      setAssignments(newAssignments);

      // Auto-select next unassigned item
      const nextUnassigned = REAL_WORLD_ITEMS.find(item => !newAssignments[item.id] && item.id !== selectedItem.id);
      if (nextUnassigned) {
        setTimeout(() => {
          setSelectedItem(nextUnassigned);
          setFeedback(null);
        }, 1200);
      } else if (Object.keys(newAssignments).length === REAL_WORLD_ITEMS.length) {
        if (onCompleteAll) onCompleteAll();
      }
    } else {
      playMetricSound('wrong');
      setFeedback({ type: 'wrong', text: `✗ Not ideal! Using ${unit.toUpperCase()} for "${selectedItem.name}" would be awkward. Try a more suitable unit!` });
    }
  };

  const handleReset = () => {
    playMetricSound('click');
    setAssignments({});
    setSelectedItem(REAL_WORLD_ITEMS[0]);
    setFeedback(null);
  };

  const completedCount = Object.keys(assignments).length;
  const isAllDone = completedCount === REAL_WORLD_ITEMS.length;

  return (
    <div className="unit-matcher-component">
      {/* Top Inquiry Banner */}
      <div className="matcher-inquiry-card">
        <div className="inquiry-text-group">
          <span className="inquiry-tag">NCERT Challenge Question</span>
          <h4 className="inquiry-heading">
            “Would it be convenient to use metre to measure a railway track or thickness of a page?”
          </h4>
        </div>
        <div className="matcher-progress-badge">
          <Sparkles size={15} color="#D97706" />
          <span>{completedCount} / {REAL_WORLD_ITEMS.length} Matched</span>
        </div>
      </div>

      {/* Main Matching Grid: Left Objects List | Right Target Unit Buckets */}
      <div className="matcher-interactive-workspace">
        {/* Left Column: Real-World Objects to Select */}
        <div className="items-selector-column">
          <span className="col-header-label">1. Choose Object to Measure:</span>
          <div className="items-cards-list">
            {REAL_WORLD_ITEMS.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isAssigned = !!assignments[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setFeedback(null); playMetricSound('click'); }}
                  className={`matcher-item-card ${isSelected ? 'active' : ''} ${isAssigned ? 'assigned' : ''}`}
                >
                  <span className="item-icon">{item.icon}</span>
                  <div className="item-info">
                    <strong className="item-name">{item.name}</strong>
                    {isAssigned && (
                      <span className="assigned-unit-tag">
                        Matched: {assignments[item.id].toUpperCase()}
                      </span>
                    )}
                  </div>
                  {isAssigned && <CheckCircle2 size={16} color="#10B981" className="item-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: 4 Target Standard Unit Drop/Click Buckets */}
        <div className="units-target-column">
          <span className="col-header-label">2. Click Most Suitable Standard Unit:</span>
          <div className="unit-buckets-grid">
            {[
              { id: 'km', name: 'Kilometre (km)', scale: 'Large Distances (> 1000 m)', color: '#D97706', bg: '#FFFBEB' },
              { id: 'm', name: 'Metre (m)', scale: 'Room / Table / Fabric (1 - 100 m)', color: '#2563EB', bg: '#EFF6FF' },
              { id: 'cm', name: 'Centimetre (cm)', scale: 'Pencils / Books (1 - 100 cm)', color: '#059669', bg: '#ECFDF5' },
              { id: 'mm', name: 'Millimetre (mm)', scale: 'Tiny Thickness (< 1 cm)', color: '#7C3AED', bg: '#F5F3FF' }
            ].map((bucket) => (
              <button
                key={bucket.id}
                onClick={() => handleAssignUnit(bucket.id)}
                className="unit-bucket-btn"
                style={{ backgroundColor: bucket.bg, borderColor: bucket.color }}
              >
                <div className="bucket-top-line">
                  <span className="bucket-symbol" style={{ backgroundColor: bucket.color }}>{bucket.id}</span>
                  <strong className="bucket-title" style={{ color: bucket.color }}>{bucket.name}</strong>
                </div>
                <span className="bucket-scale-desc">{bucket.scale}</span>
                <span className="bucket-cta-label">Click to Match "{selectedItem?.name}"</span>
              </button>
            ))}
          </div>

          {/* Feedback & Explanation Box */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className={`matcher-feedback-box ${feedback.type}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {feedback.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Completion Bar */}
      {isAllDone && (
        <div className="all-matched-banner">
          <Award size={22} color="#059669" />
          <div className="all-matched-text">
            <strong>Excellent! All 6 Real-World Objects Matched to their Ideal SI Units!</strong>
            <span>You proved that selecting the right unit prevents huge numbers and tiny fractions.</span>
          </div>
          <button onClick={handleReset} className="matcher-reset-btn">
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
}
