import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Scissors, ArrowLeft, ArrowRight, Shapes, HelpCircle, Sparkles } from 'lucide-react';
import Stage1_Investigate from './components/Stage1_Investigate';
import Stage2_BreakingMagnet from './components/Stage2_BreakingMagnet';
import Stage3_Sandbox from './components/Stage3_Sandbox';
import Quiz from './Quiz';
import DidYouKnow from './DidYouKnow';
import './MagneticPoles.css';

const STEPS_NAV = [
  { id: 'investigate', name: '1. Let us Investigate', icon: Compass },
  { id: 'breaking', name: '2. Breaking a Magnet', icon: Scissors },
  { id: 'sandbox', name: '3. Other Magnet Shapes', icon: Shapes },
  { id: 'quiz', name: '4. Quiz', icon: HelpCircle },
  { id: 'didyouknow', name: '5. Did You Know?', icon: Sparkles }
];

export default function MagneticPolesActivity({ onBackToDashboard, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState({
    investigate: false,
    breaking: false,
    sandbox: false,
    quiz: false,
    didyouknow: false
  });

  const handleStage1Complete = () => {
    setProgress(prev => ({ ...prev, investigate: true }));
    setStepIndex(1);
  };

  const handleStage2Complete = () => {
    setProgress(prev => ({ ...prev, breaking: true }));
    setStepIndex(2);
  };

  const handleStage3Complete = () => {
    setProgress(prev => ({ ...prev, sandbox: true }));
    setStepIndex(3);
  };

  const handleQuizComplete = () => {
    setProgress(prev => ({ ...prev, quiz: true }));
    setStepIndex(4);
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
    <div className="magnetic-poles-root" style={{ 
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
      padding: '1.1rem 1.4rem',
      backgroundImage: `url('/SuspendedMagnet/science_lab_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
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
            {stepIndex === 0 && <Stage1_Investigate onComplete={handleStage1Complete} />}
            {stepIndex === 1 && <Stage2_BreakingMagnet onComplete={handleStage2Complete} />}
            {stepIndex === 2 && <Stage3_Sandbox onComplete={handleStage3Complete} />}
            {stepIndex === 3 && <Quiz onComplete={handleQuizComplete} />}
            {stepIndex === 4 && <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setStepIndex(3)} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom Footer Navigation (Identical to Finding Directions / SuspendedMagnet) ── */}
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

        {/* Central Progress indicator - Step Badge */}
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
            Step {stepIndex + 1} of {STEPS_NAV.length}
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
          {stepIndex === STEPS_NAV.length - 1 ? 'Finish Activity' : 'Next'} <ArrowRight size={20} color="#FFFFFF" />
        </button>
      </footer>
    </div>
  );
}
