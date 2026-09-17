import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, TestTube2, Trophy, Sparkles, CheckCircle } from 'lucide-react';
import Simulation from './Simulation';
import Questions from './Questions';
import ChallengeMode from './ChallengeMode';
import DidYouKnow from './DidYouKnow';
import './Activity4_6.css';

export default function Activity4_6({ onBackToDashboard, onComplete }) {
  const [activeTab, setActiveTab] = useState('simulation');
  const [simCompleted, setSimCompleted] = useState(false);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [didYouKnowCompleted, setDidYouKnowCompleted] = useState(false);

  const tabs = [
    { id: 'simulation', label: '1. Interactive Lab', icon: TestTube2 },
    { id: 'questions', label: '2. Concept Check', icon: BookOpen, disabled: !simCompleted },
    { id: 'challenge', label: '3. Challenge Mode', icon: Trophy, disabled: !questionsCompleted },
    { id: 'didyouknow', label: '4. Did You Know?', icon: Sparkles, disabled: !challengeCompleted }
  ];

  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
    setActiveTab('didyouknow');
  };

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
      backgroundColor: '#FFFFFF',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Header Bar Container (Enclosing Golden Card) */}
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
        {/* Left Column: Back Button */}
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

        {/* Center Column: Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.42rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', color: '#064E3B', letterSpacing: '-0.02em' }}>
            <Compass size={26} style={{ color: '#D97706' }} />
            Activity 4.7: Compass & Bar Magnet
          </h2>
          <span style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 800 }}>Class 6 Science — Make Your Own Magnet & Explore Induction</span>
        </div>

        {/* Right Column: Active Navigation Tabs */}
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
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={isActive ? "gold-glow-btn" : ""}
                style={{
                  opacity: tab.disabled ? 0.45 : 1,
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.05rem',
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  borderRadius: '20px',
                  background: isActive ? undefined : 'transparent',
                  color: isActive ? '#FFFFFF' : tab.disabled ? '#94A3B8' : '#78350F',
                  border: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={17} color={isActive ? '#FFFFFF' : tab.disabled ? '#94A3B8' : '#78350F'} />
                <span>{tab.label}</span>
                {tab.id === 'simulation' && simCompleted && (
                  <CheckCircle size={15} style={{ color: isActive ? '#FFFFFF' : '#10B981', marginLeft: '0.2rem' }} />
                )}
                {tab.id === 'questions' && questionsCompleted && (
                  <CheckCircle size={15} style={{ color: isActive ? '#FFFFFF' : '#10B981', marginLeft: '0.2rem' }} />
                )}
                {tab.id === 'challenge' && challengeCompleted && (
                  <CheckCircle size={15} style={{ color: isActive ? '#FFFFFF' : '#10B981', marginLeft: '0.2rem' }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

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
              <Questions onComplete={() => setQuestionsCompleted(true)} onNext={() => setActiveTab('challenge')} />
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <ChallengeMode onComplete={handleChallengeComplete} />
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
              <DidYouKnow onComplete={handleDidYouKnowComplete} onBackToQuiz={() => setActiveTab('challenge')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
