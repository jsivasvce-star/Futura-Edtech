import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass, HelpCircle, Sparkles } from 'lucide-react';
import Simulation from './Simulation';
import Questions from './Questions';
import DidYouKnow from './DidYouKnow';
import './Activity4_6.css';

const STEPS_NAV = [
  { id: 'simulation', name: '1. Compass & Bar Magnet', icon: Compass },
  { id: 'questions', name: '2. Quiz', icon: HelpCircle },
  { id: 'didyouknow', name: '3. Did You Know?', icon: Sparkles }
];

export default function Activity4_6({ onBackToDashboard, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState({
    simulation: false,
    questions: false,
    didyouknow: false
  });

  const handleSimComplete = () => {
    setProgress(prev => ({ ...prev, simulation: true }));
  };

  const handleSimNext = () => {
    setProgress(prev => ({ ...prev, simulation: true }));
    setStepIndex(1);
  };

  const handleQuestionsComplete = () => {
    setProgress(prev => ({ ...prev, questions: true }));
  };

  const handleQuestionsNext = () => {
    setProgress(prev => ({ ...prev, questions: true }));
    setStepIndex(2);
  };

  const handleDidYouKnowComplete = () => {
    setProgress(prev => ({ ...prev, didyouknow: true }));
    if (onComplete) onComplete();
    else if (onBackToDashboard) onBackToDashboard();
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  const handleNext = () => {
    if (stepIndex < STEPS_NAV.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleDidYouKnowComplete();
    }
  };

  const currentStep = STEPS_NAV[stepIndex];

  return (
    <div className="activity-4-6-root" style={{ 
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
      padding: '0.6rem 1.2rem',
      backgroundImage: `url('/SuspendedMagnet/science_lab_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* Unified Solid White Top Header Navigation Bar (Matches Finding Directions Navbar) */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.55rem 1.4rem',
        marginBottom: '0.65rem',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        flexShrink: 0,
        zIndex: 100,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left: Back Button */}
        <button
          onClick={handleBack}
          style={{
            padding: '0.55rem 1.25rem',
            fontSize: '1rem',
            fontWeight: 900,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(23, 59, 95, 0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" /> Back
        </button>

        {/* Center: Current Stage Title */}
        <div style={{
          textAlign: 'center',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.85rem',
            fontWeight: 900,
            color: '#173B5F',
            letterSpacing: '-0.02em',
            background: 'transparent',
            border: 'none',
            padding: 0
          }}>
            {currentStep.name}
          </h2>
        </div>

        {/* Right: Next Step Button */}
        <button
          onClick={handleNext}
          className="gold-glow-btn"
          style={{
            padding: '0.55rem 1.45rem',
            fontSize: '1rem',
            fontWeight: 900,
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          {stepIndex === STEPS_NAV.length - 1 ? 'Finish Activity' : 'Next'} <ArrowRight size={18} color="#FFFFFF" />
        </button>
      </header>

      {/* Main Interactive Activity Stage */}
      <main style={{ 
        width: '100%', 
        flex: 1, 
        minHeight: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {stepIndex === 0 && <Simulation onComplete={handleSimComplete} onNext={handleSimNext} />}
            {stepIndex === 1 && <Questions onComplete={handleQuestionsComplete} onNext={handleQuestionsNext} />}
            {stepIndex === 2 && <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setStepIndex(1)} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
