import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Ruler, 
  HelpCircle,
  Eye,
  Info,
  Layers,
  Award
} from 'lucide-react';
import HandGraphic from './HandGraphic';
import { playSpanSound } from './audioHelper';

// 5 NCERT Students with their respective Handspan sizes (in cm)
// Table length is exactly 200 cm
// 200 / 15.38 = 13.0 (Padma)
// 200 / 15.65 = 12.78 ("Slightly less than 13" - Tasneem)
// 200 / 15.15 = 13.20 ("Slightly more than 13" - Anish)
// 200 / 14.81 = 13.50 ("Between 13 and 14" - Deepa)
// 200 / 14.28 = 14.00 ("14" - Hardeep)
export const STUDENTS_DATA = [
  {
    id: 'deepa',
    name: 'Deepa',
    role: 'Curious Girl',
    avatar: '👧',
    handspanCm: 14.8,
    skinTone: '#FCD34D',
    expectedSpans: 'Between 13 and 14',
    exactSpans: 13.51,
    color: '#D97706',
    bgColor: '#FEF3C7',
    quote: '“Let us use our handspan! My mother calls it balisht.”'
  },
  {
    id: 'padma',
    name: 'Padma',
    role: 'Observer',
    avatar: '👧🏽',
    handspanCm: 15.38,
    skinTone: '#F59E0B',
    expectedSpans: '13',
    exactSpans: 13.0,
    color: '#059669',
    bgColor: '#D1FAE5',
    quote: '“Oh, the number of handspans is different for all of us!”'
  },
  {
    id: 'tasneem',
    name: 'Tasneem',
    role: 'Thinker',
    avatar: '👧🏻',
    handspanCm: 15.75,
    skinTone: '#FDE68A',
    expectedSpans: 'Slightly less than 13',
    exactSpans: 12.7,
    color: '#2563EB',
    bgColor: '#DBEAFE',
    quote: '“I can guess. Our handspans are of different sizes.”'
  },
  {
    id: 'anish',
    name: 'Anish',
    role: 'Explorer',
    avatar: '👦🏽',
    handspanCm: 15.1,
    skinTone: '#FBBF24',
    expectedSpans: 'Slightly more than 13',
    exactSpans: 13.25,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    quote: '“Let us put our handspans along each other to check!”'
  },
  {
    id: 'hardeep',
    name: 'Hardeep',
    role: 'Investigator',
    avatar: '👦🏾',
    handspanCm: 14.28,
    skinTone: '#F59E0B',
    expectedSpans: '14',
    exactSpans: 14.0,
    color: '#DC2626',
    bgColor: '#FEE2E2',
    quote: '“Why should the number of handspans be different?”'
  }
];

export default function HandspanLab({ onCompleteLab, onUpdateTableResults }) {
  const [selectedStudentId, setSelectedStudentId] = useState('deepa');
  const [placedSpans, setPlacedSpans] = useState(0);
  const [isAutoStepping, setIsAutoStepping] = useState(false);
  const [completedStudents, setCompletedStudents] = useState({});
  const [showRulerOverlay, setShowRulerOverlay] = useState(false);
  const [activeTabSubView, setActiveTabSubView] = useState('measure'); // 'measure' | 'compare'
  
  const currentStudent = STUDENTS_DATA.find(s => s.id === selectedStudentId) || STUDENTS_DATA[0];
  const tableLengthCm = 200; // standard classroom bench length
  const maxSpansForCurrent = Math.ceil(tableLengthCm / currentStudent.handspanCm);

  const autoStepTimerRef = useRef(null);

  // Stop auto stepping when student switches
  const handleSelectStudent = (id) => {
    if (isAutoStepping) {
      clearInterval(autoStepTimerRef.current);
      setIsAutoStepping(false);
    }
    playSpanSound('switch');
    setSelectedStudentId(id);
    setPlacedSpans(0);
  };

  // Reset current measurement
  const handleReset = () => {
    if (isAutoStepping) {
      clearInterval(autoStepTimerRef.current);
      setIsAutoStepping(false);
    }
    playSpanSound('switch');
    setPlacedSpans(0);
  };

  // Step 1 handspan forward
  const handleStepForward = () => {
    if (placedSpans >= maxSpansForCurrent) return;
    const nextCount = placedSpans + 1;
    setPlacedSpans(nextCount);
    playSpanSound('step');

    if (nextCount >= maxSpansForCurrent) {
      // Completed this student
      playSpanSound('success');
      const updated = {
        ...completedStudents,
        [currentStudent.id]: {
          result: currentStudent.expectedSpans,
          exact: currentStudent.exactSpans,
          handspanCm: currentStudent.handspanCm
        }
      };
      setCompletedStudents(updated);
      if (onUpdateTableResults) onUpdateTableResults(updated);
      if (Object.keys(updated).length === STUDENTS_DATA.length && onCompleteLab) {
        onCompleteLab();
      }
    }
  };

  // Auto-measure animation
  const handleAutoMeasure = () => {
    if (placedSpans >= maxSpansForCurrent) {
      setPlacedSpans(0);
    }
    setIsAutoStepping(true);
  };

  useEffect(() => {
    if (isAutoStepping) {
      autoStepTimerRef.current = setInterval(() => {
        setPlacedSpans(prev => {
          if (prev + 1 >= maxSpansForCurrent) {
            clearInterval(autoStepTimerRef.current);
            setIsAutoStepping(false);
            playSpanSound('success');
            const updated = {
              ...completedStudents,
              [currentStudent.id]: {
                result: currentStudent.expectedSpans,
                exact: currentStudent.exactSpans,
                handspanCm: currentStudent.handspanCm
              }
            };
            setCompletedStudents(updated);
            if (onUpdateTableResults) onUpdateTableResults(updated);
            if (Object.keys(updated).length === STUDENTS_DATA.length && onCompleteLab) {
              onCompleteLab();
            }
            return maxSpansForCurrent;
          }
          playSpanSound('step');
          return prev + 1;
        });
      }, 260);
    }
    return () => {
      if (autoStepTimerRef.current) clearInterval(autoStepTimerRef.current);
    };
  }, [isAutoStepping, currentStudent, maxSpansForCurrent, completedStudents, onCompleteLab, onUpdateTableResults]);

  const progressPercent = Math.min(100, Math.round((placedSpans / maxSpansForCurrent) * 100));
  const isFinishedCurrent = placedSpans >= maxSpansForCurrent;
  const allFinished = Object.keys(completedStudents).length === STUDENTS_DATA.length;

  return (
    <div className="handspan-lab-container">
      {/* Sub-view toggle bar (Table Measurement Lab vs Side-by-Side Comparison) */}
      <div className="lab-mode-switch-bar">
        <button
          className={`lab-mode-btn ${activeTabSubView === 'measure' ? 'active' : ''}`}
          onClick={() => { setActiveTabSubView('measure'); playSpanSound('switch'); }}
        >
          <Ruler size={16} />
          <span>1. Measure Table with Handspan</span>
        </button>
        <button
          className={`lab-mode-btn ${activeTabSubView === 'compare' ? 'active' : ''}`}
          onClick={() => { setActiveTabSubView('compare'); playSpanSound('switch'); }}
        >
          <Users size={16} />
          <span>2. Compare All 5 Handspans</span>
          {allFinished && <span className="unlocked-pill">Unlocked!</span>}
        </button>
      </div>

      {activeTabSubView === 'measure' ? (
        <div className="lab-measure-view">
          {/* Top Character Selector Strip */}
          <div className="student-selector-strip">
            <span className="selector-title">Select Student to Measure:</span>
            <div className="student-pills-row">
              {STUDENTS_DATA.map((student) => {
                const isSelected = student.id === selectedStudentId;
                const isDone = !!completedStudents[student.id];
                return (
                  <button
                    key={student.id}
                    onClick={() => handleSelectStudent(student.id)}
                    className={`student-pill-btn ${isSelected ? 'selected' : ''} ${isDone ? 'completed' : ''}`}
                    style={{
                      borderColor: isSelected ? student.color : '#E2E8F0',
                      backgroundColor: isSelected ? student.bgColor : '#FFFFFF'
                    }}
                  >
                    <span className="student-avatar">{student.avatar}</span>
                    <div className="student-pill-info">
                      <strong className="student-name" style={{ color: isSelected ? student.color : '#1E293B' }}>
                        {student.name}
                      </strong>
                      <span className="student-span-tag">
                        Span: {student.handspanCm} cm
                      </span>
                    </div>
                    {isDone && (
                      <CheckCircle2 size={16} color="#10B981" className="student-done-check" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Student Active Banner */}
          <div className="active-student-banner" style={{ borderLeftColor: currentStudent.color }}>
            <div className="banner-left">
              <span className="banner-avatar">{currentStudent.avatar}</span>
              <div>
                <h4 className="banner-name" style={{ color: currentStudent.color }}>
                  {currentStudent.name}'s Handspan (Balisht)
                </h4>
                <p className="banner-quote">{currentStudent.quote}</p>
              </div>
            </div>
            <div className="banner-right">
              <div className="span-metric-chip">
                <span className="chip-label">Handspan Size</span>
                <span className="chip-val" style={{ color: currentStudent.color }}>{currentStudent.handspanCm} cm</span>
              </div>
              <div className="span-metric-chip">
                <span className="chip-label">Table Length</span>
                <span className="chip-val">200 cm</span>
              </div>
            </div>
          </div>

          {/* Interactive Classroom Table Canvas / Stage */}
          <div className="table-stage-box">
            {/* Table Surface Header Indicators */}
            <div className="table-header-meta">
              <span className="table-badge">🏫 Classroom Study Table (200 cm Long)</span>
              <button
                className={`ruler-toggle-btn ${showRulerOverlay ? 'active' : ''}`}
                onClick={() => setShowRulerOverlay(!showRulerOverlay)}
                title="Toggle Centimeter Metric Scale Overlay"
              >
                <Eye size={14} />
                <span>{showRulerOverlay ? 'Hide Metric Scale' : 'Show 200cm Scale'}</span>
              </button>
            </div>

            {/* 3D-styled Classroom Table Graphic */}
            <div className="classroom-table-graphic">
              {/* Wooden Table Top Board */}
              <div className="table-top-surface">
                <div className="wood-grain-overlay" />

                {/* Optional Metric Ruler Grid Overlay along top edge */}
                {showRulerOverlay && (
                  <div className="metric-ruler-overlay">
                    {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((mark) => (
                      <div key={mark} className="ruler-tick" style={{ left: `${(mark / 200) * 100}%` }}>
                        <div className="tick-line" />
                        <span className="tick-text">{mark} cm</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Handspan Placement Steps Container */}
                <div className="handspans-placement-track">
                  {Array.from({ length: placedSpans }).map((_, i) => {
                    const spanWidthPercent = (currentStudent.handspanCm / tableLengthCm) * 100;
                    const leftPos = i * spanWidthPercent;
                    const isLast = i === placedSpans - 1;

                    return (
                      <motion.div
                        key={i}
                        className={`placed-handspan-segment ${isLast ? 'active-pulse' : ''}`}
                        style={{
                          left: `${leftPos}%`,
                          width: `${spanWidthPercent}%`,
                          borderColor: currentStudent.color
                        }}
                        initial={{ scale: 0.7, opacity: 0, y: -8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        {/* Outstretched Hand Graphic Inside Span */}
                        <div className="hand-svg-wrapper">
                          <HandGraphic
                            width={38}
                            height={30}
                            skinTone={currentStudent.skinTone}
                            showMeasureLine={false}
                            label=""
                          />
                        </div>

                        {/* Span Number Marker */}
                        <div className="span-index-bubble" style={{ backgroundColor: currentStudent.color }}>
                          {i + 1}
                        </div>

                        {/* Connection Arrow to Next */}
                        <div className="span-extent-bar" style={{ backgroundColor: currentStudent.color }} />
                      </motion.div>
                    );
                  })}

                  {/* Ghost Preview for next step if not complete */}
                  {!isFinishedCurrent && (
                    <div
                      className="ghost-handspan-preview"
                      style={{
                        left: `${placedSpans * ((currentStudent.handspanCm / tableLengthCm) * 100)}%`,
                        width: `${(currentStudent.handspanCm / tableLengthCm) * 100}%`
                      }}
                      onClick={handleStepForward}
                      title="Click to place next handspan"
                    >
                      <span className="ghost-text">+ Place Span {placedSpans + 1}</span>
                    </div>
                  )}
                </div>

                {/* Start & End Edge Pins */}
                <div className="table-edge-pin left-pin">
                  <span>Start (0 cm)</span>
                </div>
                <div className="table-edge-pin right-pin">
                  <span>End (200 cm)</span>
                </div>
              </div>

              {/* Table Legs for Isometric 3D depth */}
              <div className="table-legs-row">
                <div className="table-leg left-leg" />
                <div className="table-leg right-leg" />
              </div>
            </div>

            {/* Measurement Live Status & Counter Bar */}
            <div className="measurement-live-bar">
              <div className="live-counter-info">
                <span className="live-counter-label">Handspans Placed:</span>
                <span className="live-counter-number" style={{ color: currentStudent.color }}>
                  {placedSpans}
                </span>
                <span className="live-counter-max">/ {maxSpansForCurrent}</span>
              </div>

              {/* Progress Track */}
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%`, backgroundColor: currentStudent.color }}
                />
              </div>

              {/* Controls */}
              <div className="measure-action-buttons">
                <button
                  onClick={handleStepForward}
                  disabled={isFinishedCurrent || isAutoStepping}
                  className="step-btn primary-step"
                  style={{
                    backgroundColor: isFinishedCurrent ? '#94A3B8' : currentStudent.color
                  }}
                >
                  <HandGraphic width={18} height={14} showMeasureLine={false} label="" skinTone={currentStudent.skinTone} />
                  <span>+ Place 1 Handspan</span>
                </button>

                <button
                  onClick={handleAutoMeasure}
                  disabled={isAutoStepping}
                  className="step-btn auto-step"
                >
                  <Play size={16} />
                  <span>Auto-Measure</span>
                </button>

                <button
                  onClick={handleReset}
                  className="step-btn reset-step"
                  title="Reset Measurement"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Measurement Completion Result Callout */}
            <AnimatePresence>
              {isFinishedCurrent && (
                <motion.div
                  className="result-success-callout"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <div className="callout-icon" style={{ backgroundColor: currentStudent.color }}>
                    <CheckCircle2 size={26} color="#FFFFFF" />
                  </div>
                  <div className="callout-body">
                    <h5 className="callout-title">
                      {currentStudent.name}'s Measurement Complete!
                    </h5>
                    <p className="callout-desc">
                      Length of Table = <strong>{currentStudent.expectedSpans} handspans</strong> ({currentStudent.exactSpans.toFixed(2)} exact handspans of {currentStudent.handspanCm} cm).
                    </p>
                  </div>
                  <div className="callout-pill-tag">
                    <span>Recorded in Table 5.1</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Summary Pill Row of Recorded Measurements */}
          <div className="recorded-status-strip">
            <span className="strip-title">NCERT Table 5.1 Live Progress:</span>
            <div className="recorded-chips-list">
              {STUDENTS_DATA.map((s) => {
                const done = completedStudents[s.id];
                return (
                  <div
                    key={s.id}
                    className={`recorded-chip ${done ? 'done' : 'pending'}`}
                    onClick={() => handleSelectStudent(s.id)}
                  >
                    <span className="chip-avatar">{s.avatar}</span>
                    <strong className="chip-name">{s.name}:</strong>
                    <span className="chip-result">
                      {done ? done.result : 'Click to measure'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Side-by-Side Handspan Comparison View */
        <div className="lab-compare-view">
          <div className="compare-header-box">
            <div className="compare-header-text">
              <h3 className="compare-title">
                🔍 Side-by-Side Handspan (Balisht) Comparison
              </h3>
              <p className="compare-desc">
                Anish suggested: <em>“Let us put our handspans along each other to check.”</em><br />
                Notice how handspans vary from <strong>14.28 cm (Hardeep)</strong> to <strong>15.75 cm (Tasneem)</strong>! Because each person's handspan is a different length, the number of handspans needed to measure the 200 cm table is different!
              </p>
            </div>
          </div>

          {/* Calibrated Comparison Board */}
          <div className="calibrated-comparison-board">
            {/* Top Metric Scale */}
            <div className="board-metric-header">
              {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((cm) => (
                <div key={cm} className="board-cm-mark" style={{ left: `${(cm / 20) * 100}%` }}>
                  <div className="board-cm-tick" />
                  <span className="board-cm-label">{cm} cm</span>
                </div>
              ))}
            </div>

            {/* Rows for each of the 5 students */}
            <div className="comparison-students-rows">
              {STUDENTS_DATA.map((s) => {
                const spanPercent = (s.handspanCm / 20) * 100;
                return (
                  <div key={s.id} className="comparison-student-row">
                    <div className="row-student-badge">
                      <span className="row-avatar">{s.avatar}</span>
                      <div className="row-info">
                        <strong className="row-name" style={{ color: s.color }}>{s.name}</strong>
                        <span className="row-quote">{s.expectedSpans} spans</span>
                      </div>
                    </div>

                    <div className="row-span-track">
                      {/* Colored span bar extending to exact cm */}
                      <motion.div
                        className="row-span-bar"
                        style={{
                          width: `${spanPercent}%`,
                          backgroundColor: s.bgColor,
                          borderColor: s.color
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${spanPercent}%` }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <div className="row-hand-icon">
                          <HandGraphic
                            width={32}
                            height={24}
                            skinTone={s.skinTone}
                            showMeasureLine={false}
                            label=""
                          />
                        </div>

                        <span className="row-span-val" style={{ color: s.color }}>
                          {s.handspanCm} cm
                        </span>

                        {/* End Pointer */}
                        <div className="row-end-marker" style={{ backgroundColor: s.color }} />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Takeaway Formula Box */}
          <div className="takeaway-formula-box">
            <div className="formula-icon">
              <Sparkles size={24} color="#D97706" />
            </div>
            <div className="formula-content">
              <h4 className="formula-heading">Crucial Scientific Conclusion:</h4>
              <div className="formula-equation">
                <span className="equation-part">Length</span>
                <span className="equation-eq">=</span>
                <span className="equation-number">Number (e.g. 13)</span>
                <span className="equation-cross">×</span>
                <span className="equation-unit">Unit (e.g. Handspan)</span>
              </div>
              <p className="formula-explanation">
                Because <strong>Handspan</strong> differs from person to person, non-standard units cause confusion. This is why standard units like the <strong>metre (m)</strong> and <strong>centimetre (cm)</strong> were invented!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
