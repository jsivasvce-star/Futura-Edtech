import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Ruler, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Globe, 
  Award,
  Search,
  Scale,
  Compass,
  ArrowRightLeft
} from 'lucide-react';
import RulerMillimeterZoom from './components/RulerMillimeterZoom';
import MetricLadderConverter from './components/MetricLadderConverter';
import RealWorldUnitMatcher from './components/RealWorldUnitMatcher';
import StandardUnitsQuiz from './components/StandardUnitsQuiz';
import { playMetricSound } from './components/audioHelper';
import './StandardUnits.css';

export default function StandardUnits({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('ruler'); // 'ruler' | 'ladder' | 'matcher' | 'quiz'
  const [completedStages, setCompletedStages] = useState({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const stages = [
    { id: 'ruler', label: '1. 15-cm Scale & mm Zoom', icon: Ruler, done: !!completedStages.ruler },
    { id: 'ladder', label: '2. Metric Ladder (km, m, cm, mm)', icon: ArrowRightLeft, done: !!completedStages.ladder },
    { id: 'matcher', label: '3. Best Unit Challenge', icon: Scale, done: !!completedStages.matcher },
    { id: 'quiz', label: '4. Concept Check', icon: HelpCircle, done: !!completedStages.quiz }
  ];

  const handleStageSelect = (stageId) => {
    playMetricSound('click');
    setActiveTab(stageId);
  };

  const handleMarkStageDone = (stageId) => {
    setCompletedStages(prev => ({ ...prev, [stageId]: true }));
  };

  const handleFinishModule = () => {
    setShowCompletionModal(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="standard-units-viewport">
      {/* Top Fixed Header Bar */}
      <header className="standard-top-header">
        <div className="header-left-zone">
          <button
            onClick={onBackToDashboard}
            className="std-back-btn"
            title="Back to Chapter 5 Flow"
          >
            <ArrowLeft size={17} />
            <span>Chapter 5 Flow</span>
          </button>

          <div className="std-title-wrap">
            <span className="std-badge">SECTION 5.2</span>
            <h1 className="std-heading">Standard Units of Measurement (SI)</h1>
          </div>
        </div>

        {/* Center Stage Navigator Tabs */}
        <div className="std-stage-nav">
          {stages.map((st) => {
            const Icon = st.icon;
            const isActive = activeTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStageSelect(st.id)}
                className={`std-nav-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} />
                <span>{st.label}</span>
                {st.done && <CheckCircle2 size={13} color="#10B981" />}
              </button>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="header-right-zone">
          <button
            onClick={handleFinishModule}
            className="std-complete-cta"
            title="Complete Section 5.2"
          >
            <Sparkles size={16} />
            <span>Complete 5.2</span>
          </button>
        </div>
      </header>

      {/* Main Two-Panel Non-Scrolling Workspace */}
      <div className="standard-main-split">
        {/* =========================================================================
            LEFT PANEL: Tailored Separate Instructions for Active Stage (No Scroll)
            ========================================================================= */}
        <aside className="standard-left-instructions">
          <AnimatePresence mode="wait">
            {activeTab === 'ruler' && (
              <motion.div
                key="inst-ruler"
                className="instructions-subview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-header-card">
                  <div className="inst-badge-row">
                    <span className="inst-tag">STAGE 1: 15-CM RULER</span>
                    <span className="ncert-fig-ref">Fig. 5.3</span>
                  </div>
                  <h3 className="inst-title">The Centimetre & Millimetre Scale</h3>
                </div>

                <div className="inst-theory-card">
                  <p className="theory-text">
                    A standard classroom scale is <strong>15 cm</strong> long with markings from 0 to 15. The gap between any two consecutive numbers (e.g. 5 to 6) is <strong>1 cm</strong>.
                  </p>
                  <div className="theory-highlight-chip">
                    <span>1 cm is divided into 10 equal parts called Millimetres (mm).</span>
                  </div>
                </div>

                <div className="inst-steps-card">
                  <h4 className="steps-heading">Your Interactive Task:</h4>
                  <ul className="inst-bullets">
                    <li>Click or slide across the <strong>15-cm ruler</strong> on the right.</li>
                    <li>Inspect the <strong>10× Microscope Zoom</strong> to see the 10 micro-divisions.</li>
                    <li>Hover over any tick to verify: <strong>1 mm = 0.1 cm</strong> (Least Count).</li>
                  </ul>
                </div>

                <div className="inst-formula-box">
                  <div className="formula-line">
                    <strong>Least Count:</strong> 1 mm = 0.1 cm (1/10 cm)
                  </div>
                  <div className="formula-line">
                    <strong>Relation:</strong> 1 cm = 10 mm
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ladder' && (
              <motion.div
                key="inst-ladder"
                className="instructions-subview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-header-card">
                  <div className="inst-badge-row">
                    <span className="inst-tag">STAGE 2: METRIC LADDER</span>
                    <span className="ncert-fig-ref">SI Conversions</span>
                  </div>
                  <h3 className="inst-title">Kilometre, Metre, Centimetre & mm</h3>
                </div>

                <div className="inst-theory-card">
                  <p className="theory-text">
                    To prevent global confusion, the <strong>International System of Units (SI)</strong> designated the <strong>Metre (m)</strong> as the base unit of length.
                  </p>
                  <div className="theory-highlight-chip">
                    <span>1 km = 1000 m | 1 m = 100 cm | 1 cm = 10 mm</span>
                  </div>
                </div>

                <div className="inst-steps-card">
                  <h4 className="steps-heading">Your Interactive Task:</h4>
                  <ul className="inst-bullets">
                    <li>Enter any length number or choose an NCERT preset.</li>
                    <li>Observe how all 4 metric units scale simultaneously.</li>
                    <li>Check the <strong>Do you know?</strong> box for traditional <strong>Inches (1 in = 2.54 cm)</strong>.</li>
                  </ul>
                </div>

                <div className="inst-formula-box">
                  <div className="formula-line">
                    <strong>SI Base Unit:</strong> Metre (symbol: m)
                  </div>
                  <div className="formula-line">
                    <strong>Traditional:</strong> 1 inch = 2.54 cm | 1 foot = 12 inches
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'matcher' && (
              <motion.div
                key="inst-matcher"
                className="instructions-subview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-header-card">
                  <div className="inst-badge-row">
                    <span className="inst-tag">STAGE 3: REAL-WORLD CHALLENGE</span>
                    <span className="ncert-fig-ref">NCERT Inquiry</span>
                  </div>
                  <h3 className="inst-title">Choosing the Most Convenient Unit</h3>
                </div>

                <div className="inst-theory-card">
                  <p className="theory-text">
                    Measuring a 250 km railway track in millimetres or a 0.1 mm paper sheet in metres would create clumsy numbers!
                  </p>
                  <div className="theory-highlight-chip">
                    <span>We pick km for cities, m for rooms, cm for books, mm for sheets.</span>
                  </div>
                </div>

                <div className="inst-steps-card">
                  <h4 className="steps-heading">Your Interactive Task:</h4>
                  <ul className="inst-bullets">
                    <li>Select an object on the left (e.g. railway track, pencil).</li>
                    <li>Click the ideal unit bucket: <strong>km, m, cm, or mm</strong>.</li>
                    <li>Match all 6 items to complete this challenge!</li>
                  </ul>
                </div>

                <div className="inst-formula-box">
                  <div className="formula-line">
                    <strong>Rule:</strong> Match the unit scale to the object size!
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="inst-quiz"
                className="instructions-subview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-header-card">
                  <div className="inst-badge-row">
                    <span className="inst-tag">STAGE 4: MASTERY QUIZ</span>
                    <span className="ncert-fig-ref">Assessment</span>
                  </div>
                  <h3 className="inst-title">Test Your Understanding</h3>
                </div>

                <div className="inst-theory-card">
                  <p className="theory-text">
                    Review what you learned about SI units, least count of a 15-cm ruler, and conversion equations.
                  </p>
                  <div className="theory-highlight-chip">
                    <span>Answer all 4 questions on the right to lock in your score!</span>
                  </div>
                </div>

                <div className="inst-steps-card">
                  <h4 className="steps-heading">Quick NCERT Cheatsheet:</h4>
                  <ul className="inst-bullets">
                    <li><strong>SI Unit of Length:</strong> Metre (m)</li>
                    <li><strong>1 m:</strong> = 100 cm = 1,000 mm</li>
                    <li><strong>Least Count of 15-cm Scale:</strong> 1 mm = 0.1 cm</li>
                    <li><strong>1 Inch:</strong> = 2.54 cm</li>
                  </ul>
                </div>

                <div className="inst-formula-box">
                  <div className="formula-line">
                    <strong>Next Chapter Inquiry:</strong> “How do we use a scale correctly without parallax error?”
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* =========================================================================
            RIGHT PANEL: Interactive Activity Viewports (No Scroll)
            ========================================================================= */}
        <main className="standard-right-activity">
          <AnimatePresence mode="wait">
            {activeTab === 'ruler' && (
              <motion.div
                key="view-ruler"
                className="activity-view-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <RulerMillimeterZoom />
              </motion.div>
            )}

            {activeTab === 'ladder' && (
              <motion.div
                key="view-ladder"
                className="activity-view-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <MetricLadderConverter />
              </motion.div>
            )}

            {activeTab === 'matcher' && (
              <motion.div
                key="view-matcher"
                className="activity-view-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <RealWorldUnitMatcher onCompleteAll={() => handleMarkStageDone('matcher')} />
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="view-quiz"
                className="activity-view-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <StandardUnitsQuiz onCompleteQuiz={() => handleMarkStageDone('quiz')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* =========================================================================
          COMPLETION MODAL OVERLAY
          ========================================================================= */}
      {showCompletionModal && (
        <div className="std-modal-overlay">
          <div className="std-modal-card">
            <div className="std-trophy-icon">
              <Award size={48} color="#FFFFFF" />
            </div>
            <div className="std-modal-badge">
              <span>✓</span> Section 5.2 Completed
            </div>
            <h2 className="std-modal-title">SI Standard Units Mastered!</h2>
            <p className="std-modal-desc">
              You explored the 15-cm scale, millimetre subdivisions (least count = 1 mm), SI metre conversion ladder, and why matching the right unit to the object size is essential.
            </p>
            <div className="std-modal-actions">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="std-modal-btn secondary"
              >
                Review Module
              </button>
              <button
                onClick={onBackToDashboard}
                className="std-modal-btn primary"
              >
                <span>Return to Chapter Flow</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
