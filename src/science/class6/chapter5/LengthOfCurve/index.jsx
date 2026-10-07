import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Sliders, 
  Award,
  BookOpen,
  Scissors
} from 'lucide-react';
import AnishVerandahStory from './components/AnishVerandahStory';
import ThreadMeasurementLab from './components/ThreadMeasurementLab';
import CustomCurveTracer from './components/CustomCurveTracer';
import CurvedLineQuiz from './components/CurvedLineQuiz';
import { playCurveSound } from './components/audioHelper';
import './LengthOfCurve.css';

export default function LengthOfCurve({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'thread_lab' | 'tracer' | 'quiz'
  const [completedStages, setCompletedStages] = useState({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const stages = [
    { id: 'story', label: '1. Verandah Arch Story', icon: BookOpen, done: !!completedStages.story },
    { id: 'thread_lab', label: '2. Thread & Ruler Lab', icon: Scissors, done: !!completedStages.thread_lab },
    { id: 'tracer', label: '3. Interactive Curve Tracer', icon: Sliders, done: !!completedStages.tracer },
    { id: 'quiz', label: '4. Quick Check', icon: HelpCircle, done: !!completedStages.quiz }
  ];

  const handleStageSelect = (stageId) => {
    playCurveSound('click');
    setActiveTab(stageId);
  };

  const handleFinish = () => {
    setShowCompletionModal(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="length-of-curve-viewport">
      {/* Top Header Bar */}
      <header className="curve-top-header">
        <div className="top-left-zone">
          <button
            onClick={onBackToDashboard}
            className="curve-back-btn"
            title="Back to Chapter 5 Flow"
          >
            <ArrowLeft size={17} />
            <span>Chapter 5 Flow</span>
          </button>

          <div className="curve-title-group">
            <span className="curve-badge">SECTION 5.4</span>
            <h1 className="curve-title">Measuring the Length of a Curved Line</h1>
          </div>
        </div>

        {/* Center Stage Navigator Tabs */}
        <div className="curve-stage-tabs">
          {stages.map((st) => {
            const Icon = st.icon;
            const isActive = activeTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStageSelect(st.id)}
                className={`curve-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} />
                <span>{st.label}</span>
                {st.done && <CheckCircle2 size={13} color="#10B981" />}
              </button>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="top-right-zone">
          <button
            onClick={handleFinish}
            className="curve-finish-cta"
            title="Complete Section 5.4"
          >
            <Sparkles size={16} />
            <span>Complete 5.4</span>
          </button>
        </div>
      </header>

      {/* Main Two-Panel Split Layout (No Scroll) */}
      <div className="curve-main-split">
        {/* =========================================================================
            LEFT PANEL: Tailored Instructions for Each Stage
            ========================================================================= */}
        <aside className="curve-left-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="inst-story"
                className="instructions-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 1: ANISH'S STORY</span>
                  <h3 className="inst-main-title">Electric String Lights on an Arch</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">The Real-World Problem:</h4>
                  <p className="theory-summary">
                    Anish and his parents are decorating the curved arches of their verandah with fairy lights for a celebration (Fig. 5.7).
                  </p>
                  <div className="problem-highlight-box">
                    <strong>Question:</strong> How can they measure the required length of string lights along the curve?
                  </div>
                </div>

                <div className="inst-action-guide">
                  <h4 className="guide-title">Try it on the right:</h4>
                  <p className="guide-text">
                    Test a <strong>rigid metre stick</strong> (leaves huge gaps) vs a <strong>flexible thread</strong> (traces the arch seamlessly)!
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'thread_lab' && (
              <motion.div
                key="inst-lab"
                className="instructions-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 2: THREAD & RULER METHOD</span>
                  <h3 className="inst-main-title">How to Measure Any Curve (Fig. 5.8)</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">The 3-Step Scientific Technique:</h4>
                  <ol className="simple-task-list">
                    <li><strong>Tie a knot</strong> at one end (Point A) and lay the thread along the curve.</li>
                    <li><strong>Place an ink mark</strong> at the other end (Point B).</li>
                    <li><strong>Straighten the thread</strong> and measure the distance between the knot and the ink mark using a metre scale.</li>
                  </ol>
                </div>

                <div className="inst-action-guide">
                  <div className="key-formula-pill">
                    <span>Curved Length = Straightened Thread on Scale</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tracer' && (
              <motion.div
                key="inst-tracer"
                className="instructions-deck"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inst-intro-box">
                  <span className="inst-step-tag">STAGE 3: CURVE SIMULATOR</span>
                  <h3 className="inst-main-title">Curvature vs Shortcut Distance</h3>
                </div>

                <div className="inst-card-section">
                  <h4 className="section-title">Understanding Curve Length:</h4>
                  <p className="theory-summary">
                    A straight shortcut between two ends is always the shortest distance. The more bent or wavy a line is, the longer the thread needed to trace it!
                  </p>
                </div>

                <div className="inst-action-guide">
                  <h4 className="guide-title">Try it on the right:</h4>
                  <p className="guide-text">
                    Adjust the <strong>Curvature Slider</strong> and <strong>Wave count</strong> to see live thread physics in real time!
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="inst-quiz"
                className="instructions-deck"
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
                    <li><strong>Thread method:</strong> Knot at A $\rightarrow$ trace $\rightarrow$ ink mark at B $\rightarrow$ straighten on scale.</li>
                    <li><strong>Alternative tools:</strong> Flexible tailor's tape or fixed divider stepping.</li>
                    <li><strong>Curvature:</strong> Increases true travel length compared to a straight line.</li>
                  </ul>
                </div>

                <div className="inst-action-guide">
                  <p className="guide-text">Complete the 4 questions on the right to master Section 5.4!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* =========================================================================
            RIGHT PANEL: Interactive Activity Viewport
            ========================================================================= */}
        <main className="curve-right-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="tab-story"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <AnishVerandahStory />
              </motion.div>
            )}

            {activeTab === 'thread_lab' && (
              <motion.div
                key="tab-thread_lab"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ThreadMeasurementLab
                  onCompleteLab={() => setCompletedStages(prev => ({ ...prev, thread_lab: true }))}
                />
              </motion.div>
            )}

            {activeTab === 'tracer' && (
              <motion.div
                key="tab-tracer"
                className="stage-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <CustomCurveTracer />
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
                <CurvedLineQuiz
                  onCompleteQuiz={() => setCompletedStages(prev => ({ ...prev, quiz: true }))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="curve-modal-overlay">
          <div className="curve-modal-card">
            <div className="curve-trophy">
              <Award size={46} color="#FFFFFF" />
            </div>
            <div className="curve-modal-badge">
              <span>✓</span> Section 5.4 Mastered
            </div>
            <h2 className="curve-modal-title">Curved Line Measurement Mastered!</h2>
            <p className="curve-modal-desc">
              You discovered how to measure any curved boundary, river, or verandah arch using a flexible thread and straightening it along a standard metre scale!
            </p>
            <div className="curve-modal-buttons">
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
