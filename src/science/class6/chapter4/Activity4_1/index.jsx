import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Lock, Sparkles, ArrowRight, X } from 'lucide-react';
import MagneticTable from './MagneticTable';
import DidYouKnow from './DidYouKnow';
import Quiz from './Quiz';
import './Activity4_1.css';

export default function Activity4_1({ onBackToDashboard, onComplete, onNext }) {
  const [stage, setStage] = useState('table');
  const [isTableCompleted, setIsTableCompleted] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);

  const handleTableComplete = () => {
    setIsTableCompleted(true);
    setStage('quiz');
  };

  const handleQuizComplete = () => {
    if (onComplete) onComplete();
    if (onNext) onNext();
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 16px)', 
      maxHeight: '100vh', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '0.65rem 0.85rem',
      backgroundColor: '#FFFFFF',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Introductory Pop-Up Modal */}
      <AnimatePresence>
        {showIntroModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999999,
              padding: '1.5rem',
              boxSizing: 'border-box',
            }}
            onClick={() => setShowIntroModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -10 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '2px solid #A7F3D0',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25), 0 0 35px rgba(16, 185, 129, 0.15)',
                maxWidth: '520px',
                width: '100%',
                padding: '2rem 2.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.25rem',
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowIntroModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Icon / Badge */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                border: '2px solid #A7F3D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)',
              }}>
                <Sparkles size={32} color="#059669" />
              </div>

              {/* Title & Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#059669',
                  background: '#ECFDF5',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid #A7F3D0',
                }}>
                  Activity 4.2 · Exploration
                </span>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#064E3B',
                  letterSpacing: '-0.02em',
                }}>
                  Magnetic & Non-Magnetic Materials
                </h2>
              </div>

              {/* Single Line Explanation */}
              <p style={{
                margin: 0,
                fontSize: '1.05rem',
                lineHeight: 1.55,
                fontWeight: 600,
                color: '#334155',
                padding: '0.75rem 1rem',
                background: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                width: '100%',
                boxSizing: 'border-box',
              }}>
                Click any item from the evidence board to test whether it is attracted by a magnet.
              </p>

              {/* Proceed Button */}
              <button
                onClick={() => setShowIntroModal(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  width: '100%',
                  padding: '0.85rem 1.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(217, 119, 6, 0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Proceed</span>
                <ArrowRight size={19} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto', 
        alignItems: 'center', 
        padding: '0.25rem 0.5rem',
        marginBottom: '0.5rem',
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
            fontSize: '0.9rem', 
            borderRadius: '14px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" /> Back to Chapter 4
        </button>

        {/* Center Column: Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', color: '#064E3B', letterSpacing: '-0.01em' }}>
            <Compass size={24} style={{ color: '#D97706' }} />
            Activity 4.1 & 4.2: Magnetic & Non-Magnetic Materials
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 700 }}>Class 6 Science — Finding Magnetic Materials & Sorting Objects</span>
        </div>

        {/* Right Column: Stage Navigation Pill */}
        <div style={{ display: 'flex', gap: '0.5rem', margin: 0 }}>
          <button
            onClick={() => setStage('table')}
            className={stage === 'table' ? 'gold-glow-btn' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              fontSize: '0.88rem',
              fontWeight: 800,
              borderRadius: '25px',
              background: stage === 'table' ? undefined : '#F8FAFC',
              color: stage === 'table' ? '#FFFFFF' : '#334155',
              border: stage === 'table' ? 'none' : '1.5px solid #CBD5E1',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            1. Classification Table
          </button>
          <button
            onClick={() => isTableCompleted && setStage('quiz')}
            disabled={!isTableCompleted}
            className={stage === 'quiz' ? 'gold-glow-btn' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              fontSize: '0.88rem',
              fontWeight: 800,
              borderRadius: '25px',
              background: stage === 'quiz' ? undefined : isTableCompleted ? '#F8FAFC' : '#F1F5F9',
              color: stage === 'quiz' ? '#FFFFFF' : isTableCompleted ? '#334155' : '#94A3B8',
              border: stage === 'quiz' ? 'none' : isTableCompleted ? '1.5px solid #CBD5E1' : '1.5px dashed #CBD5E1',
              cursor: isTableCompleted ? 'pointer' : 'not-allowed',
              opacity: isTableCompleted ? 1 : 0.65,
              transition: 'all 0.2s ease'
            }}
            title={isTableCompleted ? '2. Knowledge Quiz' : 'Complete the classification table first to unlock the quiz'}
          >
            {!isTableCompleted && <Lock size={14} color="#94A3B8" />}
            2. Knowledge Quiz
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        {stage === 'table' ? (
          <MagneticTable 
            onComplete={handleTableComplete}
            onTableCompleted={(completed) => setIsTableCompleted(completed)}
          />
        ) : (
          <Quiz 
            onComplete={handleQuizComplete} 
            onBack={() => setStage('table')} 
          />
        )}
      </main>

      {/* Bottom Footer Bar */}
      {stage !== 'quiz' && (
        <footer style={{ marginTop: '0.4rem', width: '100%', flexShrink: 0, position: 'relative', zIndex: 99999 }}>
          <DidYouKnow />
        </footer>
      )}
    </div>
  );
}
