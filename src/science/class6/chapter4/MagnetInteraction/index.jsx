import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, HelpCircle, Compass, CheckSquare, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import Stage1_Build from './components/Stage1_Build';
import Stage3_Explore from './components/Stage3_Explore';
import Stage4_Quiz from './components/Stage4_Quiz';
import DidYouKnow from './DidYouKnow';
import './MagnetInteraction.css';

export default function MagnetInteractionActivity({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('build');
  const [progress, setProgress] = useState({
    build: false,
    explore: false,
    quiz: false,
    didyouknow: false
  });

  const handleStage1Complete = () => {
    setProgress(prev => ({ ...prev, build: true }));
  };

  const handleStage3Complete = () => {
    setProgress(prev => ({ ...prev, explore: true }));
  };

  const handleStage4Complete = () => {
    setProgress(prev => ({ ...prev, quiz: true }));
    setActiveTab('didyouknow');
  };

  const handleDidYouKnowComplete = () => {
    setProgress(prev => ({ ...prev, didyouknow: true }));
    if (onComplete) onComplete();
  };

  const tabs = [
    { id: 'build', name: '1. Build', icon: Hammer, component: <Stage1_Build onComplete={handleStage1Complete} onNext={() => setActiveTab('explore')} /> },
    { id: 'explore', name: '2. Explore', icon: Compass, component: <Stage3_Explore onComplete={handleStage3Complete} onNext={() => setActiveTab('quiz')} />, locked: !progress.build },
    { id: 'quiz', name: '3. Quiz', icon: HelpCircle, component: <Stage4_Quiz onComplete={handleStage4Complete} />, locked: !progress.explore },
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
      {/* Top Header Bar Container (Standard Enclosing Golden Card) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.65rem 1.25rem',
        marginBottom: '0.45rem',
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
            fontSize: '0.92rem', 
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
          <ArrowLeft size={18} color="#FFFFFF" /> Back to Chapter 4
        </button>

        {/* Center: Title & Subtitle */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.42rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            <Compass size={26} style={{ color: '#D97706' }} />
            Activity 4.6: Attraction and Repulsion of Magnets
          </h2>
          <span style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 800 }}>Class 6 Science — Attraction & Repulsion Between Magnetic Poles</span>
        </div>

        {/* Right: Tabbed Navigation Bar */}
        <nav className="tabs-container" style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          margin: 0,
          background: '#FFFFFF',
          padding: '0.35rem 0.5rem',
          borderRadius: '30px',
          border: '1.5px solid #FDE68A',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
                  opacity: tab.locked ? 0.45 : 1,
                  cursor: tab.locked ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.05rem',
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  borderRadius: '20px',
                  background: isActive ? undefined : 'transparent',
                  color: isActive ? '#FFFFFF' : tab.locked ? '#94A3B8' : '#78350F',
                  border: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={17} color={isActive ? '#FFFFFF' : tab.locked ? '#94A3B8' : '#78350F'} />
                <span>{tab.name}</span>
                {isCompleted && (
                  <CheckCircle size={15} style={{ color: isActive ? '#FFFFFF' : '#10B981', marginLeft: '0.2rem' }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Active Stage Panel (Non-scrolling standalone flex child) */}
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
