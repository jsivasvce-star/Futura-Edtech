import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, HelpCircle, Compass, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Stage1_Build from './components/Stage1_Build';
import Stage3_Explore from './components/Stage3_Explore';
import Stage4_Quiz from './components/Stage4_Quiz';
import DidYouKnow from './DidYouKnow';
import './MagnetInteraction.css';

const STEPS_NAV = [
  { id: 'build', name: '1. Build', icon: Hammer },
  { id: 'explore', name: '2. Explore', icon: Compass },
  { id: 'quiz', name: '3. Quiz', icon: HelpCircle },
  { id: 'didyouknow', name: '4. Did You Know?', icon: Sparkles }
];

export default function MagnetInteractionActivity({ onBackToDashboard, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState({
    build: false,
    explore: false,
    quiz: false,
    didyouknow: false
  });

  const handleStage1Complete = () => {
    setProgress(prev => ({ ...prev, build: true }));
    setStepIndex(1);
  };

  const handleStage3Complete = () => {
    setProgress(prev => ({ ...prev, explore: true }));
    setStepIndex(2);
  };

  const handleStage4Complete = () => {
    setProgress(prev => ({ ...prev, quiz: true }));
    setStepIndex(3);
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
      padding: '0.6rem 1.2rem',
      backgroundImage: `url('/SuspendedMagnet/science_lab_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* Unified Solid White Top Header Navigation Bar (Strictly matching Finding Directions) */}
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

        {/* Center: Current Stage Title (Title Only, Completely Transparent, Crisp Dark Blue) */}
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

        {/* Right: Next / Finish Step Button */}
        <button
          onClick={handleNext}
          style={{
            padding: '0.55rem 1.45rem',
            fontSize: '1rem',
            fontWeight: 900,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#FFFFFF',
            border: '1.5px solid #FDE68A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          {stepIndex === STEPS_NAV.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} color="#FFFFFF" />
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
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {stepIndex === 0 && (
              <Stage1_Build onComplete={handleStage1Complete} onNext={() => setStepIndex(1)} />
            )}
            {stepIndex === 1 && (
              <Stage3_Explore onComplete={handleStage3Complete} onNext={() => setStepIndex(2)} />
            )}
            {stepIndex === 2 && (
              <Stage4_Quiz onComplete={handleStage4Complete} />
            )}
            {stepIndex === 3 && (
              <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setStepIndex(2)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
