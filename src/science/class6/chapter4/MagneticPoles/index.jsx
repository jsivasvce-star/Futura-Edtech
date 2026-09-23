import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Scissors, ArrowLeft, CheckCircle, Shapes, HelpCircle, Sparkles } from 'lucide-react';
import Stage1_Investigate from './components/Stage1_Investigate';
import Stage2_BreakingMagnet from './components/Stage2_BreakingMagnet';
import Stage3_Sandbox from './components/Stage3_Sandbox';
import Quiz from './Quiz';
import Stage5_DidYouKnowPage from './components/Stage5_DidYouKnowPage';
import './MagneticPoles.css';

export default function MagneticPolesActivity({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('investigate');
  const [progress, setProgress] = useState({
    investigate: false,
    breaking: false,
    sandbox: false,
    quiz: false,
    didyouknow: false
  });

  const handleStage1Complete = () => {
    setProgress(prev => ({ ...prev, investigate: true }));
    setActiveTab('breaking');
  };

  const handleStage2Complete = () => {
    setProgress(prev => ({ ...prev, breaking: true }));
    setActiveTab('sandbox');
  };

  const handleStage3Complete = () => {
    setProgress(prev => ({ ...prev, sandbox: true }));
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
    {
      id: 'investigate',
      name: '1. Let us Investigate',
      icon: Compass,
      component: (
        <Stage1_Investigate
          onComplete={handleStage1Complete}
          onGoToQuiz={() => {
            setProgress(prev => ({ ...prev, investigate: true, breaking: true, sandbox: true, quiz: true }));
            setActiveTab('quiz');
          }}
        />
      )
    },
    { id: 'breaking', name: '2. Breaking a Magnet', icon: Scissors, component: <Stage2_BreakingMagnet onComplete={handleStage2Complete} />, locked: !progress.investigate },
    { id: 'sandbox', name: '3. Other Magnet Shapes', icon: Shapes, component: <Stage3_Sandbox onComplete={handleStage3Complete} />, locked: !progress.breaking },
    { id: 'quiz', name: '4. Quiz', icon: HelpCircle, component: <Quiz onComplete={handleQuizComplete} />, locked: !progress.sandbox && !progress.investigate },
    { id: 'didyouknow', name: '5. Did You Know?', icon: Sparkles, component: <Stage5_DidYouKnowPage onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setActiveTab('quiz')} />, locked: !progress.quiz }
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
      backgroundColor: 'transparent',
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>

      {/* 1. BACK BUTTON: Positioned in the TOP-LEFT CORNER of the page, clearly above and to the left of tab 1 */}
      <button 
        onClick={onBackToDashboard} 
        className="gold-glow-btn magnetic-poles-back-btn"
        style={{ 
          position: 'absolute',
          top: '0.65rem',
          left: '0.85rem',
          zIndex: 1000,
          padding: '0.45rem 1.15rem', 
          fontSize: '17px', 
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderRadius: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          border: 'none'
        }}
      >
        <ArrowLeft size={20} color="#FFFFFF" /> Back
      </button>

      {/* 2. HEADER: Title and Subtitle centered horizontally near the top */}
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        paddingTop: '0.15rem',
        marginBottom: '0.55rem',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '32px', 
          fontWeight: 800, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.75rem', 
          color: '#064E3B', 
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap'
        }}>
          <Compass size={30} style={{ color: '#173B5F' }} />
          Activity 4.2: Poles of a Magnet
        </h1>
        <span style={{ 
          fontSize: '18px', 
          color: '#047857', 
          fontWeight: 600,
          marginTop: '2px'
        }}>
          Class 6 Science — Observe iron filings & magnetic poles
        </span>
      </header>

      {/* 3. TOP ACTIVITY STEPS: 5 small horizontal step/activity cards in one row */}
      <nav className="tabs-container" style={{ 
        display: 'flex', 
        gap: '0.65rem', 
        margin: 0, 
        marginBottom: '0.55rem',
        background: 'transparent', 
        border: 'none', 
        padding: 0,
        width: '100%',
        flexWrap: 'nowrap',
        flexShrink: 0,
        zIndex: 10
      }}>
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
                flex: 1,
                minWidth: 0,
                opacity: tab.locked ? 0.45 : 1,
                cursor: tab.locked ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                padding: '0.55rem 0.75rem',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: '16px',
                background: isActive 
                  ? undefined 
                  : isCompleted 
                    ? '#F0FDF4' 
                    : 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
                color: isActive 
                  ? '#FFFFFF' 
                  : tab.locked 
                    ? '#94A3B8' 
                    : isCompleted 
                      ? '#065F46' 
                      : '#173B5F',
                border: isActive 
                  ? 'none' 
                  : isCompleted 
                    ? '1.5px solid #86EFAC' 
                    : '1.5px solid #CBD5E1',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 14px rgba(217, 119, 6, 0.35)' : '0 2px 6px rgba(0,0,0,0.04)',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={20} color={isActive ? '#FFFFFF' : tab.locked ? '#94A3B8' : isCompleted ? '#10B981' : '#173B5F'} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.name}</span>
              {isCompleted && !isActive && <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0 }} />}
            </button>
          );
        })}
      </nav>

      {/* Main Active Stage Panel (Non-scrolling flex child) */}
      <main style={{ 
        width: '100%', 
        flex: 1, 
        minHeight: 0, 
        display: 'flex', 
        flexDirection: 'column', 
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
