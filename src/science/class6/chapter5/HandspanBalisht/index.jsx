import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Ruler, 
  Users, 
  Layers, 
  Award,
  HelpCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import HandspanLab, { STUDENTS_DATA } from './components/HandspanLab';
import BodyUnitsExplorer from './components/BodyUnitsExplorer';
import ConceptQuiz from './components/ConceptQuiz';
import HandGraphic from './components/HandGraphic';
import './HandspanBalisht.css';

export default function HandspanBalisht({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('lab'); // 'lab' | 'explorer' | 'quiz'
  const [isMuted, setIsMuted] = useState(false);
  const [tableData, setTableData] = useState({});
  const [isLabCompleted, setIsLabCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const tabs = [
    { id: 'lab', label: '1. Handspan Lab (Table 5.1)', icon: Ruler, done: isLabCompleted },
    { id: 'explorer', label: '2. Ancient Body Units', icon: Layers, done: false },
    { id: 'quiz', label: '3. Concept Check', icon: HelpCircle, done: isQuizCompleted }
  ];

  const handleUpdateTable = (newTable) => {
    setTableData(newTable);
    if (Object.keys(newTable).length === STUDENTS_DATA.length) {
      setIsLabCompleted(true);
    }
  };

  const handleQuizDone = () => {
    setIsQuizCompleted(true);
  };

  const handleFinishActivity = () => {
    setShowCompletionModal(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="handspan-module-viewport">
      {/* Top Main Navigation Header Bar */}
      <header className="handspan-top-bar">
        <div className="top-bar-left">
          <button
            onClick={onBackToDashboard}
            className="handspan-back-btn"
            title="Back to Chapter 5 Flow"
          >
            <ArrowLeft size={18} />
            <span>Chapter 5 Flow</span>
          </button>

          <div className="module-title-group">
            <span className="module-ch-tag">ACTIVITY 5.1</span>
            <h1 className="module-title">How do we Measure? (Handspan & Balisht)</h1>
          </div>
        </div>

        {/* Center Tab Switcher */}
        <div className="handspan-tabs-pills">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.done && <CheckCircle2 size={14} color="#10B981" />}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="top-bar-right">
          <button
            onClick={handleFinishActivity}
            className="finish-activity-cta"
            title="Complete Activity 5.1"
          >
            <Sparkles size={16} />
            <span>Complete 5.1</span>
          </button>
        </div>
      </header>

      {/* Main Two-Panel Workspace Split */}
      <div className="handspan-split-layout">
        {/* =========================================================================
            LEFT PANEL: Story Context, Step-by-Step Instructions & NCERT Table 5.1
            ========================================================================= */}
        <aside className="handspan-left-panel">
          <div className="left-panel-scrollable">
            {/* Module Overview & Story Context Card */}
            <div className="story-context-card">
              <div className="story-card-header">
                <span className="story-badge">📖 NCERT Narrative Context</span>
                <span className="section-num">Sec 5.1</span>
              </div>
              <h3 className="story-heading">Measuring Length Using Body Parts</h3>
              
              <div className="dialogue-snippet">
                <p className="dialogue-line">
                  <strong>Hardeep:</strong> “I have seen my grandmother measuring cloth by the length of her arm.”
                </p>
                <p className="dialogue-line">
                  <strong>Padma:</strong> “A farmer walks and counts his strides to divide his field into beds.”
                </p>
                <p className="dialogue-line">
                  <strong>Anish:</strong> “Sometimes they also use the length of their feet.”
                </p>
                <p className="dialogue-line highlight-quote">
                  <strong>Deepa:</strong> “Let us measure the classroom table using our handspan! My mother calls it <em>balisht</em>.”
                </p>
              </div>
            </div>

            {/* Handspan Visual Definition Card */}
            <div className="definition-card">
              <div className="definition-header">
                <HandGraphic width={130} height={90} label="" spanValue="Handspan" />
                <div className="definition-text">
                  <h4 className="def-title">What is a Handspan (Balisht)?</h4>
                  <p className="def-desc">
                    The distance between the <strong>tip of the outstretched thumb</strong> and the <strong>tip of the little finger</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Interactive Instructions */}
            <div className="instructions-card">
              <h4 className="instructions-title">
                <span className="instructions-icon">📋</span>
                Step-by-Step Activity Guide
              </h4>
              <ol className="steps-list">
                <li>
                  <strong>Select a student:</strong> Choose Deepa, Padma, Tasneem, Anish, or Hardeep.
                </li>
                <li>
                  <strong>Place handspans:</strong> Click <em>"+ Place 1 Handspan"</em> or <em>"Auto-Measure"</em> to lay spans end-to-end along the 200 cm classroom table.
                </li>
                <li>
                  <strong>Record the number:</strong> Observe the result recorded automatically into Table 5.1.
                </li>
                <li>
                  <strong>Compare handspans:</strong> Switch to <em>"Compare All 5 Handspans"</em> to discover why the number of handspans differs!
                </li>
              </ol>
            </div>

            {/* NCERT Table 5.1: Measuring the Length of the Table */}
            <div className="ncert-table-card">
              <div className="ncert-table-header">
                <h4 className="ncert-table-title">Table 5.1: Measuring Length of the Table</h4>
                <span className="table-ncert-tag">NCERT Official</span>
              </div>
              
              <table className="ncert-data-table">
                <thead>
                  <tr>
                    <th>Name of Student</th>
                    <th>Number of Handspans</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS_DATA.map((s) => {
                    const rec = tableData[s.id];
                    return (
                      <tr key={s.id} className={rec ? 'row-completed' : 'row-pending'}>
                        <td className="student-name-cell">
                          <span className="table-avatar">{s.avatar}</span>
                          <strong>{s.name}</strong>
                        </td>
                        <td className="spans-count-cell">
                          {rec ? (
                            <span className="count-badge" style={{ backgroundColor: s.bgColor, color: s.color, borderColor: s.color }}>
                              {s.expectedSpans}
                            </span>
                          ) : (
                            <span className="unmeasured-label">Pending</span>
                          )}
                        </td>
                        <td className="status-cell">
                          {rec ? (
                            <span className="status-done-pill">✓ Done</span>
                          ) : (
                            <span className="status-wait-pill">• Measure</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Core Scientific Principle Callout */}
            <div className="concept-callout-card">
              <div className="callout-icon-top">
                <Sparkles size={20} color="#D97706" />
              </div>
              <h4 className="concept-title">What is a Unit?</h4>
              <p className="concept-body">
                The length of the table is expressed in two parts: a <strong>Number</strong> and a <strong>Unit</strong>.
              </p>
              <div className="concept-formula-badge">
                <span>Length = 13 (Number) × Handspan (Unit)</span>
              </div>
              <p className="concept-footer-note">
                Because handspans vary from person to person, standard units (like <strong>metres</strong> and <strong>centimetres</strong>) are required!
              </p>
            </div>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT PANEL: Dynamic Interactive Activity Workstation
            ========================================================================= */}
        <main className="handspan-right-panel">
          <AnimatePresence mode="wait">
            {activeTab === 'lab' && (
              <motion.div
                key="lab"
                className="tab-view-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <HandspanLab
                  onUpdateTableResults={handleUpdateTable}
                  onCompleteLab={() => setIsLabCompleted(true)}
                />
              </motion.div>
            )}

            {activeTab === 'explorer' && (
              <motion.div
                key="explorer"
                className="tab-view-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <BodyUnitsExplorer />
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                className="tab-view-wrapper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ConceptQuiz onCompleteQuiz={handleQuizDone} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* =========================================================================
          ACTIVITY COMPLETION MODAL
          ========================================================================= */}
      {showCompletionModal && (
        <div className="completion-modal-overlay">
          <div className="completion-modal-card">
            <div className="completion-trophy">
              <Award size={48} color="#FFFFFF" />
            </div>
            <div className="completion-badge">
              <span>✓</span> Activity 5.1 Mastered
            </div>
            <h2 className="completion-title">Measurement & Handspans Understood!</h2>
            <p className="completion-desc">
              You discovered how non-standard units like handspans (balisht) vary between individuals, and why standard units (metres and centimetres) are essential for accurate science and trade!
            </p>
            <div className="completion-actions-row">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="modal-secondary-btn"
              >
                Review Activity
              </button>
              <button
                onClick={onBackToDashboard}
                className="modal-primary-btn"
              >
                <span>Return to Chapter Flow</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
