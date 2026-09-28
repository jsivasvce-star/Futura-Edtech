import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, TestTube2, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import Simulation from './Simulation';
import Questions from './Questions';
import DidYouKnow from './DidYouKnow';
import './Activity4_7.css';

export default function Activity4_7({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('simulation');
  const [simCompleted, setSimCompleted] = useState(false);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  const [didYouKnowCompleted, setDidYouKnowCompleted] = useState(false);

  const tabs = [
    { id: 'simulation', label: '1. Interactive Lab', icon: TestTube2, done: simCompleted },
    { id: 'questions', label: '2. Concept Check', icon: BookOpen, done: questionsCompleted, disabled: !simCompleted },
    { id: 'didyouknow', label: '3. Did You Know?', icon: Sparkles, done: didYouKnowCompleted, disabled: !questionsCompleted }
  ];

  const handleDidYouKnowComplete = () => {
    setDidYouKnowCompleted(true);
    if (onComplete) onComplete();
  };

  const handleBack = () => {
    if (activeTab === 'didyouknow') setActiveTab('questions');
    else if (activeTab === 'questions') setActiveTab('simulation');
    else if (onBackToDashboard) onBackToDashboard();
  };

  const handleNext = () => {
    if (activeTab === 'simulation') setActiveTab('questions');
    else if (activeTab === 'questions') setActiveTab('didyouknow');
    else if (onComplete) onComplete();
  };

  const currentStepIndex = activeTab === 'simulation' ? 0 : activeTab === 'questions' ? 1 : 2;

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh', 
      zIndex: 101,
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '0.65rem 0.85rem',
      backgroundColor: 'transparent',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main Interactive Stage Container */}
      <main style={{ 
        width: '100%',
        flex: 1, 
        minHeight: 0, 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <AnimatePresence mode="wait">
          {activeTab === 'simulation' && (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Simulation onComplete={() => setSimCompleted(true)} onNext={() => setActiveTab('questions')} />
            </motion.div>
          )}

          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Questions onComplete={() => setQuestionsCompleted(true)} onNext={() => setActiveTab('didyouknow')} />
            </motion.div>
          )}

          {activeTab === 'didyouknow' && (
            <motion.div
              key="didyouknow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setActiveTab('questions')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Bottom Footer Navigation (Standard Step Indicator) ── */}
      <footer style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.75rem',
        marginTop: '0.75rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1.5px solid #FFFFFF',
        borderRadius: '32px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        flexShrink: 0,
        zIndex: 100,
        maxWidth: '98%',
        margin: '0.75rem auto 0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Back Button on Left */}
        <button
          onClick={handleBack}
          className="navy-btn"
          style={{
            padding: '0.65rem 1.8rem',
            fontSize: '1.05rem',
            fontWeight: 900,
            borderRadius: '25px',
            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
            color: '#FFFFFF',
            border: '1.5px solid #2B6CB0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            boxShadow: '0 4px 14px rgba(23, 59, 95, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={20} color="#FFFFFF" /> Back
        </button>

        {/* Central Progress indicator - Step Badge only */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          fontWeight: 900
        }}>
          <span style={{
            background: '#ECFDF5',
            padding: '0.35rem 1.25rem',
            borderRadius: '16px',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            boxShadow: '0 2px 6px rgba(6, 95, 70, 0.08)'
          }}>
            Step {currentStepIndex + 1} of 3
          </span>
        </div>

        {/* Next Button on Right */}
        <button
          onClick={handleNext}
          className="gold-glow-btn"
          style={{
            padding: '0.65rem 2rem',
            fontSize: '1.05rem',
            fontWeight: 900,
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem'
          }}
        >
          {activeTab === 'didyouknow' ? 'Finish Activity' : 'Next'} <ArrowRight size={20} color="#FFFFFF" />
        </button>
      </footer>
    </div>
  );
}
