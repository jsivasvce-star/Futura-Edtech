import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Lock, Sparkles, ArrowRight, CheckCircle, HelpCircle, Table } from 'lucide-react';
import MagneticTable from './MagneticTable';
import DidYouKnow from './DidYouKnow';
import Quiz from './Quiz';
import './Activity4_1.css';

export default function Activity4_1({ onBackToDashboard, onComplete, onNext }) {
  const [stage, setStage] = useState('table');
  const [isTableCompleted, setIsTableCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);

  const handleTableComplete = () => {
    setIsTableCompleted(true);
    setStage('quiz');
  };

  const handleQuizComplete = () => {
    setIsQuizCompleted(true);
    setStage('didyouknow');
  };

  const handleDidYouKnowComplete = () => {
    if (onComplete) onComplete();
    if (onNext) onNext();
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
      {/* Main Content Area */}
      <main style={{ 
        width: '100%', 
        flex: 1, 
        minHeight: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <AnimatePresence mode="wait">
          {stage === 'table' && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <MagneticTable 
                onComplete={handleTableComplete}
                onTableCompleted={(completed) => setIsTableCompleted(completed)}
              />
            </motion.div>
          )}

          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Quiz 
                onComplete={handleQuizComplete} 
                onBack={() => setStage('table')} 
              />
            </motion.div>
          )}

          {stage === 'didyouknow' && (
            <motion.div
              key="didyouknow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <DidYouKnow 
                onComplete={handleDidYouKnowComplete} 
                onBackToQuiz={() => setStage('quiz')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

{/* Top Header Bar (Standard Enclosing Golden Card) */}
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
          onClick={() => {
            if (stage === 'didyouknow') setStage('quiz');
            else if (stage === 'quiz') setStage('table');
            else onBackToDashboard();
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
          <ArrowLeft size={26} color="#FFFFFF" /> BACK
        </button>

        {/* Center Column: Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '2.1rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            Activity 4.1: Magnetic & Non-Magnetic Materials
          </h2>
        </div>

        {/* Right Column: Next Button */}
        <button 
          onClick={() => {
            if (stage === 'table') setStage('quiz');
            else if (stage === 'quiz') setStage('didyouknow');
            else onNext();
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
