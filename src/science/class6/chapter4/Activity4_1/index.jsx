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

  const tabs = [
    { id: 'table', label: '1. Classification Table', icon: Table, done: isTableCompleted },
    { id: 'quiz', label: '2. Knowledge Quiz', icon: HelpCircle, done: isQuizCompleted, disabled: !isTableCompleted },
    { id: 'didyouknow', label: '3. Did You Know?', icon: Sparkles, done: false, disabled: !isQuizCompleted }
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
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Header Bar (Standard Enclosing Golden Card) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.65rem 1.25rem',
        marginBottom: '0.45rem',
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
            <Compass size={26} style={{ color: '#173B5F' }} />
            Activity 4.1: Magnetic & Non-Magnetic Materials
          </h2>
          <span style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 800 }}>Class 6 Science — Finding Magnetic Materials & Sorting Objects</span>
        </div>

        {/* Right Column: Stage Navigation Pill Tabs */}
        <nav className="tabs-container" style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          margin: 0,
          background: '#FFFFFF',
          padding: '0.35rem 0.5rem',
          borderRadius: '30px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = stage === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setStage(tab.id)}
                disabled={tab.disabled}
                className={isActive ? 'gold-glow-btn' : ''}
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
                  color: isActive ? '#FFFFFF' : tab.disabled ? '#94A3B8' : '#173B5F',
                  border: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={17} color={isActive ? '#FFFFFF' : tab.disabled ? '#94A3B8' : '#173B5F'} />
                <span>{tab.label}</span>
                {tab.done && (
                  <CheckCircle size={15} style={{ color: isActive ? '#FFFFFF' : '#10B981', marginLeft: '0.2rem' }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

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
    </div>
  );
}
