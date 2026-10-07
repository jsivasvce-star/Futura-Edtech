import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  MapPin, 
  Compass, 
  Award,
  Bus,
  Flag,
  Navigation,
  Check
} from 'lucide-react';
import TownMapReferenceLab from './components/TownMapReferenceLab';
import KabaddiCourtMarker from './components/KabaddiCourtMarker';
import HighwayMilestoneMotion from './components/HighwayMilestoneMotion';
import DescribingPositionQuiz from './components/DescribingPositionQuiz';
import { playPosSound } from './components/audioHelper';
import './DescribingPosition.css';

export default function DescribingPosition({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('town_map'); // 'town_map' | 'kabaddi' | 'milestones' | 'quiz'
  const [completedStages, setCompletedStages] = useState({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const stages = [
    { id: 'town_map', label: '1. School vs Garden Map', icon: MapPin, done: !!completedStages.town_map },
    { id: 'kabaddi', label: '2. Kabaddi Court Marker', icon: Flag, done: !!completedStages.kabaddi },
    { id: 'milestones', label: '3. Delhi Highway & Motion', icon: Bus, done: !!completedStages.milestones },
    { id: 'quiz', label: '4. Quick Check Quiz', icon: HelpCircle, done: !!completedStages.quiz }
  ];

  const handleStageSelect = (stageId) => {
    playPosSound('click');
    setActiveTab(stageId);
  };

  const handleStageComplete = (stageId) => {
    setCompletedStages(prev => ({ ...prev, [stageId]: true }));
    playPosSound('success');
  };

  const handleFinish = () => {
    playPosSound('celebrate');
    setShowCompletionModal(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="pos-viewport">
      {/* Top Header Bar */}
      <header className="pos-top-header">
        <div className="top-left-zone">
          <button
            onClick={onBackToDashboard}
            className="pos-back-btn"
            title="Back to Chapter 5 Flow"
          >
            <ArrowLeft size={17} />
            <span>Chapter 5 Flow</span>
          </button>

          <div className="pos-title-group">
            <span className="pos-badge">SECTION 5.5</span>
            <h1 className="pos-title">Describing Position & Reference Points</h1>
          </div>
        </div>

        {/* Center Stage Navigator Tabs */}
        <div className="pos-stage-tabs">
          {stages.map((st) => {
            const Icon = st.icon;
            const isActive = activeTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStageSelect(st.id)}
                className={`pos-tab-btn ${isActive ? 'active' : ''}`}
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
            className="pos-finish-cta"
            title="Complete Section 5.5"
          >
            <Sparkles size={16} />
            <span>Complete 5.5</span>
          </button>
        </div>
      </header>

      {/* Main Two-Panel Split Layout (Zero Scroll) */}
      <div className="pos-main-split">
        {/* =========================================================================
            LEFT PANEL: Tailored Instructions for Each Stage
            ========================================================================= */}
        <aside className="pos-left-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'town_map' && (
              <motion.div
                key="left_town_map"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="pos-panel-content"
              >
                <div className="pos-inst-header">
                  <div className="inst-badge-row">
                    <span className="stage-num-tag">STAGE 1 OF 4</span>
                    <span className="inst-topic-tag">NCERT Fig. 5.9</span>
                  </div>
                  <h2 className="pos-inst-title">Deepa's Garden Dilemma</h2>
                  <p className="pos-inst-subtitle">
                    Why did everyone give different answers about whether the garden or school was closer?
                  </p>
                </div>

                <div className="pos-inst-body">
                  <div className="pos-concept-card highlight-card">
                    <div className="concept-card-title">
                      <Compass size={16} color="#D97706" />
                      <span>The Big Question</span>
                    </div>
                    <p className="concept-card-text">
                      Tasneem says the <strong>Garden is closer</strong>, while Deepa says the <strong>School is closer</strong>. 
                      Who is right? <em>All of them are right!</em>
                    </p>
                  </div>

                  <div className="pos-steps-box">
                    <h3 className="steps-heading">Try it on the Map:</h3>
                    <ul className="pos-step-list">
                      <li>
                        <span className="step-circle">1</span>
                        <span>Click on each student's house to see their point of view.</span>
                      </li>
                      <li>
                        <span className="step-circle">2</span>
                        <span>Notice how distances change based on where you start!</span>
                      </li>
                      <li>
                        <span className="step-circle">3</span>
                        <span>Click <strong>"Use Bus Stand as Common Point"</strong> to make everyone agree.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pos-takeaway-box">
                    <span className="takeaway-label">KEY DEFINITION</span>
                    <p className="takeaway-text">
                      When distance is measured with respect to a fixed point, that point is called a <strong>Reference Point</strong>.
                    </p>
                  </div>
                </div>

                <div className="pos-inst-footer">
                  <button
                    className="pos-next-btn"
                    onClick={() => {
                      handleStageComplete('town_map');
                      setActiveTab('kabaddi');
                    }}
                  >
                    <span>Next: Kabaddi Court</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'kabaddi' && (
              <motion.div
                key="left_kabaddi"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="pos-panel-content"
              >
                <div className="pos-inst-header">
                  <div className="inst-badge-row">
                    <span className="stage-num-tag">STAGE 2 OF 4</span>
                    <span className="inst-topic-tag">NCERT Fig. 5.10 & 5.11</span>
                  </div>
                  <h2 className="pos-inst-title">Drawing the Kabaddi Court</h2>
                  <p className="pos-inst-subtitle">
                    Hardeep and Deepa are using limestone powder (chuna) to mark court lines for sports day!
                  </p>
                </div>

                <div className="pos-inst-body">
                  <div className="pos-concept-card">
                    <div className="concept-card-title">
                      <Flag size={16} color="#059669" />
                      <span>Deepa's Smart Idea</span>
                    </div>
                    <p className="concept-card-text">
                      <em>"Let us first decide the point on the ground from which we will measure the distances to start drawing the lines. Let us call this our <strong>Reference Point</strong>."</em>
                    </p>
                  </div>

                  <div className="pos-steps-box">
                    <h3 className="steps-heading">Your Mission:</h3>
                    <ul className="pos-step-list">
                      <li>
                        <span className="step-circle">1</span>
                        <span>Click <strong>"Fix Reference Corner (0m)"</strong> to place the start peg.</span>
                      </li>
                      <li>
                        <span className="step-circle">2</span>
                        <span>Pull measuring tape to <strong>13m</strong> to draw the boundary baseline.</span>
                      </li>
                      <li>
                        <span className="step-circle">3</span>
                        <span>Measure <strong>6.5m</strong> for the Mid-Line and <strong>3.75m</strong> for the Baulk line.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pos-takeaway-box">
                    <span className="takeaway-label">PRACTICAL LEARNING</span>
                    <p className="takeaway-text">
                      Without a fixed reference point, the court lines would be crooked and measurements wouldn't align!
                    </p>
                  </div>
                </div>

                <div className="pos-inst-footer">
                  <button
                    className="pos-next-btn"
                    onClick={() => {
                      handleStageComplete('kabaddi');
                      setActiveTab('milestones');
                    }}
                  >
                    <span>Next: Highway & Motion</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'milestones' && (
              <motion.div
                key="left_milestones"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="pos-panel-content"
              >
                <div className="pos-inst-header">
                  <div className="inst-badge-row">
                    <span className="stage-num-tag">STAGE 3 OF 4</span>
                    <span className="inst-topic-tag">NCERT Fig. 5.12 & 5.13</span>
                  </div>
                  <h2 className="pos-inst-title">Padma's Bus Ride to Delhi</h2>
                  <p className="pos-inst-subtitle">
                    Padma reads the kilometre stones on the roadside as her bus travels towards Delhi.
                  </p>
                </div>

                <div className="pos-inst-body">
                  <div className="pos-concept-card highlight-card">
                    <div className="concept-card-title">
                      <Navigation size={16} color="#2563EB" />
                      <span>Reading Milestones</span>
                    </div>
                    <p className="concept-card-text">
                      Stone 1 reads <strong>"Delhi 70 km"</strong>. The next reads <strong>"Delhi 60 km"</strong>.
                      Here, <strong>Delhi is the Reference Point</strong>.
                    </p>
                  </div>

                  <div className="pos-steps-box">
                    <h3 className="steps-heading">Drive & Discover:</h3>
                    <ul className="pos-step-list">
                      <li>
                        <span className="step-circle">1</span>
                        <span>Click <strong>"Drive Bus"</strong> or drag the highway slider.</span>
                      </li>
                      <li>
                        <span className="step-circle">2</span>
                        <span>Watch the distance to Delhi decrease from 70 km to 0 km.</span>
                      </li>
                      <li>
                        <span className="step-circle">3</span>
                        <span>See how position changing over time defines <strong>Motion</strong>.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pos-takeaway-box highlight-blue">
                    <span className="takeaway-label">WHAT IS MOTION?</span>
                    <p className="takeaway-text">
                      When the position of an object changes with respect to a reference point over time, the object is said to be in <strong>MOTION</strong>.
                    </p>
                  </div>
                </div>

                <div className="pos-inst-footer">
                  <button
                    className="pos-next-btn"
                    onClick={() => {
                      handleStageComplete('milestones');
                      setActiveTab('quiz');
                    }}
                  >
                    <span>Next: Quick Quiz</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="left_quiz"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="pos-panel-content"
              >
                <div className="pos-inst-header">
                  <div className="inst-badge-row">
                    <span className="stage-num-tag">STAGE 4 OF 4</span>
                    <span className="inst-topic-tag">Concept Mastery</span>
                  </div>
                  <h2 className="pos-inst-title">Position & Motion Quiz</h2>
                  <p className="pos-inst-subtitle">
                    Test your understanding of reference points, distance measurement, and motion!
                  </p>
                </div>

                <div className="pos-inst-body">
                  <div className="pos-concept-card">
                    <div className="concept-card-title">
                      <Award size={16} color="#D97706" />
                      <span>Review Checklist</span>
                    </div>
                    <ul className="pos-mini-bullets">
                      <li><strong>Reference Point:</strong> A fixed place used to describe position.</li>
                      <li><strong>Relative Distance:</strong> Depends on where you measure from.</li>
                      <li><strong>Milestones:</strong> Show remaining distance to reference destination.</li>
                      <li><strong>Motion:</strong> Change in position relative to reference point over time.</li>
                    </ul>
                  </div>

                  <div className="pos-takeaway-box">
                    <span className="takeaway-label">EXCELLENCE GOAL</span>
                    <p className="takeaway-text">
                      Answer all 4 questions correctly to earn your Section 5.5 Mastery Star!
                    </p>
                  </div>
                </div>

                <div className="pos-inst-footer">
                  <button
                    className="pos-finish-btn"
                    onClick={handleFinish}
                  >
                    <Sparkles size={16} />
                    <span>Complete Section 5.5</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* =========================================================================
            RIGHT PANEL: Interactive Activity Viewport
            ========================================================================= */}
        <main className="pos-right-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'town_map' && (
              <motion.div
                key="town_map_stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="pos-stage-wrapper"
              >
                <TownMapReferenceLab onNext={() => {
                  handleStageComplete('town_map');
                  setActiveTab('kabaddi');
                }} />
              </motion.div>
            )}

            {activeTab === 'kabaddi' && (
              <motion.div
                key="kabaddi_stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="pos-stage-wrapper"
              >
                <KabaddiCourtMarker onNext={() => {
                  handleStageComplete('kabaddi');
                  setActiveTab('milestones');
                }} />
              </motion.div>
            )}

            {activeTab === 'milestones' && (
              <motion.div
                key="milestones_stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="pos-stage-wrapper"
              >
                <HighwayMilestoneMotion onNext={() => {
                  handleStageComplete('milestones');
                  setActiveTab('quiz');
                }} />
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz_stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="pos-stage-wrapper"
              >
                <DescribingPositionQuiz onComplete={() => {
                  handleStageComplete('quiz');
                }} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            className="pos-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="pos-modal-card"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
            >
              <div className="modal-icon-glow">
                <Sparkles size={40} color="#F59E0B" />
              </div>
              <h2 className="modal-title">Congratulations! Section 5.5 Complete!</h2>
              <p className="modal-text">
                You have mastered <strong>Reference Points</strong> and learned how describing positions helps us define <strong>Motion</strong> in science!
              </p>
              
              <div className="modal-summary-grid">
                <div className="summary-item">
                  <span className="summary-val">Town Map</span>
                  <span className="summary-lbl">Reference point concept</span>
                </div>
                <div className="summary-item">
                  <span className="summary-val">Kabaddi Ground</span>
                  <span className="summary-lbl">Practical line marking</span>
                </div>
                <div className="summary-item">
                  <span className="summary-val">Delhi Milestones</span>
                  <span className="summary-lbl">Position & Motion</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-secondary-btn"
                  onClick={() => setShowCompletionModal(false)}
                >
                  Review Section
                </button>
                <button
                  className="modal-primary-btn"
                  onClick={onBackToDashboard}
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
