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
      {/* Top Header Bar Container (Standard Enclosing Golden Card) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.65rem 1.25rem',
        marginTop: '0.45rem',
        background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100
      }}>
        {/* Left Column: Back Button */}
        <button 
          onClick={onBackToDashboard} 
          className="gold-glow-btn"
          style={{ 
            position: 'relative', zIndex: 100,
            padding: '0.8rem 1.75rem', 
            fontSize: '1.5rem', 
            gap: '0.5rem',
            borderRadius: '16px',
            border: 'none',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={26} color="#FFFFFF" /> BACK
        </button>

        {/* Center Column: Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '2.1rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            Activity 4.8: Attraction & Repulsion Between Magnets
          </h2>
        </div>

        {/* Right Column: Next Button */}
        <button 
          onClick={() => {
            if (activeTab === 'simulation') setActiveTab('questions');
            else if (activeTab === 'questions') setActiveTab('didyouknow');
            else if (onComplete) onComplete();
          }}
          className="gold-glow-btn"
          style={{ 
            position: 'relative', zIndex: 100,
            padding: '0.8rem 1.75rem', 
            fontSize: '1.5rem', 
            gap: '0.5rem',
            borderRadius: '16px',
            border: 'none',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          NEXT <ArrowRight size={26} color="#FFFFFF" />
        </button>
      </div>

    </div>
  );
}
