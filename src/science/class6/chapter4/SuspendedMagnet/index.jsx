import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, RotateCw, ArrowLeft, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';
import Stage1_Experiment from './components/Stage1_Experiment';
import Stage2_Conclusion from './components/Stage2_Conclusion';
import Quiz from './Quiz';
import DidYouKnow from './DidYouKnow';
import './SuspendedMagnet.css';

export default function SuspendedMagnetActivity({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('experiment');
  const [progress, setProgress] = useState({
    experiment: false,
    conclusion: false,
    quiz: false,
    didyouknow: false
  });

  const handleStage1Complete = () => {
    setProgress(prev => ({ ...prev, experiment: true }));
    setActiveTab('conclusion');
  };

  const handleStage2Complete = () => {
    setProgress(prev => ({ ...prev, conclusion: true }));
    setActiveTab('quiz');
  };

  const handleQuizComplete = () => {
    setProgress(prev => ({ ...prev, quiz: true }));
    setActiveTab('didyouknow');
  };

  const handleDidYouKnowComplete = () => {
    setProgress(prev => ({ ...prev, didyouknow: true }));
    if (onComplete) onComplete();
  };

  const tabs = [
    { id: 'experiment', name: '1. Let us Experiment', icon: RotateCw, component: <Stage1_Experiment onComplete={handleStage1Complete} /> },
    { id: 'conclusion', name: '2. Conclusion', icon: Compass, component: <Stage2_Conclusion onComplete={handleStage2Complete} />, locked: !progress.experiment },
    { id: 'quiz', name: '3. Quiz', icon: HelpCircle, component: <Quiz onComplete={handleQuizComplete} />, locked: !progress.conclusion },
    { id: 'didyouknow', name: '4. Did You Know?', icon: Sparkles, component: <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setActiveTab('quiz')} />, locked: !progress.quiz }
  ];

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
      backgroundColor: '#FFFFFF',
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>

      {/* Top Header Bar Container (Single Unified Enclosing Container) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.65rem 1.25rem',
        marginBottom: '0.65rem',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        border: '1.5px solid #FDE68A',
        borderRadius: '24px',
        boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100
      }}>
        {/* Left: Back Button */}
        <button 
          onClick={onBackToDashboard} 
          className="gold-glow-btn"
          style={{ 
            position: 'relative', zIndex: 100,
            padding: '0.6rem 1.25rem', 
            fontSize: '0.9rem', 
            gap: '0.5rem',
            borderRadius: '14px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" /> Back to Chapter 4
        </button>

        {/* Center: Title & Subtitle */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.35rem', 
            fontWeight: 900, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.65rem', 
            color: '#1E1B4B', 
            letterSpacing: '-0.01em' 
          }}>
            <Compass size={26} style={{ color: '#D97706' }} />
            Activity 4.3: Finding Directions
          </h2>
          <span style={{ 
            fontSize: '0.82rem', 
            color: '#78350F', 
            fontWeight: 800 
          }}>
            Class 6 Science — A Freely Suspended Bar Magnet
          </span>
        </div>

        {/* Right: Tab Navigation Bar */}
        <nav style={{ display: 'flex', gap: '0.5rem', margin: 0, background: 'rgba(255, 255, 255, 0.75)', border: '1.5px solid #FDE68A', borderRadius: '28px', padding: '0.28rem' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCompleted = progress[tab.id];
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => !tab.locked && setActiveTab(tab.id)}
                disabled={tab.locked}
                className={isActive ? 'gold-glow-btn' : ''}
                style={{
                  opacity: tab.locked ? 0.45 : 1,
                  cursor: tab.locked ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  borderRadius: '24px',
                  background: isActive ? undefined : 'transparent',
                  color: isActive ? '#FFFFFF' : tab.locked ? '#A8A29E' : '#78350F',
                  border: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#FFFFFF' : tab.locked ? '#A8A29E' : '#D97706'} />
                <span>{tab.name}</span>
                {isCompleted && !isActive && <CheckCircle size={14} color="#10B981" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Stage Canvas */}
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
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {tabs.find(t => t.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
