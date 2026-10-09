import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Eye, 
  Scissors, 
  Award,
  BookOpen
} from 'lucide-react';
import ThreeRulesVisualizer from './components/ThreeRulesVisualizer';
import Table5_2MeasurementLab from './components/Table5_2MeasurementLab';
import FlexibleTapeAndRules from './components/FlexibleTapeAndRules';
import CorrectMeasurementQuiz from './components/CorrectMeasurementQuiz';
import { playMeasureSound } from './components/audioHelper';
import './CorrectMeasurement.css';

export default function CorrectMeasurement({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'lab' | 'flexible' | 'quiz'
  const [completedStages, setCompletedStages] = useState({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const stages = [
    { id: 'rules', label: '1. The 3 Core Rules', icon: Ruler, done: !!completedStages.rules },
    { id: 'lab', label: '2. Table 5.2 Lab', icon: BookOpen, done: !!completedStages.lab },
    { id: 'flexible', label: '3. Flexible Tape & Units', icon: Layers, done: !!completedStages.flexible },
    { id: 'quiz', label: '4. Quick Check', icon: HelpCircle, done: !!completedStages.quiz }
  ];

  const handleStageSelect = (stageId) => {
    playMeasureSound('click');
    setActiveTab(stageId);
  };

  const handleFinish = () => {
    setShowCompletionModal(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="correct-measurement-viewport">
      {/* Top Header Bar */}
      <header className="correct-top-header">
        <div className="top-left-zone">
          <button
            onClick={onBackToDashboard}
            className="correct-back-btn"
            title="Back to Chapter 5 Flow"
          >
            <ArrowLeft size={17} />
            <span>Chapter 5 Flow</span>
          </button>

          <div className="correct-title-group">
            <span className="correct-badge">SECTION 5.3</span>
            <h1 className="correct-title">Correct Way of Measuring Length</h1>
          </div>
        </div>

        {/* Center Stage Navigator Tabs */}
        <div className="correct-stage-tabs">
          {stages.map((st) => {
            const Icon = st.icon;
            const isActive = activeTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStageSelect(st.id)}
                className={`correct-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} />
                <span>{st.label}</span>
                {st.done && <CheckCircle2 size={13} color="#10B981" />}
              </button>
            );
          })}
        </div>

        {/* Right Action */}
        <div className="top-right-zone">
          <button
            onClick={handleFinish}
            className="correct-finish-cta"
            title="Complete Section 5.3"
          >
            <Sparkles size={16} />
            <span>Complete 5.3</span>
          </button>
        </div>
      </header>

      {/* Main Split Layout: Left Instructions | Right Interactive Stage */}
      <div className="correct-main-split">
        {/* =========================================================================
            LEFT PANEL: Separate, Easy-to-Understand Instructions per Stage
            ========================================================================= */}
        <aside className="correct-left-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'rules' && (
              <motion.div
                key="inst-rules"
                className="instructions-card-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 1: THE 3 RULES</span>
                  <h3 className="inst-main-title">How to Measure Accurately</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">The 3 Golden Rules:</h4>
                  <div className="easy-rule-item">
                    <span className="rule-number">1</span>
                    <p><strong>Place Straight:</strong> Scale must touch object along its full length (Fig 5.4).</p>
                  </div>
                  <div className="easy-rule-item">
                    <span className="rule-number">2</span>
                    <p><strong>Eye at Position B:</strong> Look vertically from above to avoid parallax error (Fig 5.5).</p>
                  </div>
                  <div className="easy-rule-item">
                    <span className="rule-number">3</span>
                    <p><strong>Broken Zero Mark:</strong> Start from 1.0 cm and subtract the start mark (Fig 5.6).</p>
                  </div>
                </div>

                <div className="inst-action-guide">
                  <h4 className="guide-title">Try it on the right:</h4>
                  <p className="guide-text">Switch between Rule 1, 2, and 3 using the top buttons to see why mistakes happen!</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'lab' && (
              <motion.div
                key="inst-lab"
                className="instructions-card-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 2: TABLE 5.2 LAB</span>
                  <h3 className="inst-main-title">Measuring Everyday Objects</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">Activity 5.1 Instructions:</h4>
                  <p className="theory-summary">
                    Measure everyday school items: <strong>Pencil, Comb, Eraser, Pen, and Key</strong>.
                  </p>
                  <ul className="simple-task-list">
                    <li>Pick an object from the top strip.</li>
                    <li>Toggle <em>"Broken 0 Mark"</em> to practice subtracting 1.0 cm.</li>
                    <li>Click <strong>"+ Record in Table 5.2"</strong> to save each measurement.</li>
                  </ul>
                </div>

                <div className="inst-action-guide">
                  <div className="key-formula-pill">
                    <span>Length = End Mark − Start Mark</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'flexible' && (
              <motion.div
                key="inst-flexible"
                className="instructions-card-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 3: TAPES & WRITING RULES</span>
                  <h3 className="inst-main-title">Flexible Tools & Proper Notation</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">Why Flexible Tapes?</h4>
                  <p className="theory-summary">
                    A straight wooden stick cannot bend around curved objects like a <strong>tree trunk girth</strong> or <strong>chest size</strong>. That's why tailors use flexible ribbon tapes!
                  </p>
                </div>

                <div className="inst-action-guide">
                  <h4 className="guide-title">Writing Rules ("Do You Know?"):</h4>
                  <ul className="simple-task-list">
                    <li>Always lowercase: <code>cm</code>, <code>m</code>, <code>km</code>.</li>
                    <li>Never add 's' for plural: write <code>10 cm</code> (not 10 cms).</li>
                    <li>Leave a space: <code>15 cm</code> (not 15cm).</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="inst-quiz"
                className="instructions-card-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 4: QUICK CHECK</span>
                  <h3 className="inst-main-title">Check Your Understanding</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">Quick Review:</h4>
                  <ul className="simple-task-list">
                    <li><strong>Eye Position:</strong> Directly above (Position B).</li>
                    <li><strong>Broken Scale:</strong> End reading minus start reading.</li>
                    <li><strong>Curved items:</strong> Flexible tailor's tape.</li>
                    <li><strong>SI writing:</strong> Lowercase with space (e.g. <code>10 cm</code>).</li>
                  </ul>
                </div>

                <div className="inst-action-guide">
                  <p className="guide-text">Answer the 4 questions on the right to complete Section 5.3!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* =========================================================================
            RIGHT PANEL: Interactive Activity Stage
            ========================================================================= */}
        <main className="correct-right-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'rules' && (
              <motion.div
                key="tab-rules"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ThreeRulesVisualizer />
              </motion.div>
            )}

            {activeTab === 'lab' && (
              <motion.div
                key="tab-lab"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Table5_2MeasurementLab
                  onCompleteLab={() => setCompletedStages(prev => ({ ...prev, lab: true }))}
                />
              </motion.div>
            )}

            {activeTab === 'flexible' && (
              <motion.div
                key="tab-flexible"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <FlexibleTapeAndRules />
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="tab-quiz"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <CorrectMeasurementQuiz
                  onCompleteQuiz={() => setCompletedStages(prev => ({ ...prev, quiz: true }))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="correct-modal-overlay">
          <div className="correct-modal-card">
            <div className="correct-trophy">
              <Award size={46} color="#FFFFFF" />
            </div>
            <div className="correct-modal-badge">
              <span>✓</span> Section 5.3 Mastered
            </div>
            <h2 className="correct-modal-title">Correct Measurement Mastered!</h2>
            <p className="correct-modal-desc">
              You mastered straight placement, eliminating parallax error (Position B), calculating lengths with broken zero marks, and using flexible tapes for curved surfaces!
            </p>
            <div className="correct-modal-buttons">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="modal-btn secondary"
              >
                Review Module
              </button>
              <button
                onClick={onBackToDashboard}
                className="modal-btn primary"
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
