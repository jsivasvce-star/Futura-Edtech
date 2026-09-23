import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const quizData = [
  {
    id: 1,
    title: "Quiz 1",
    question: "When a bar magnet is suspended freely, which direction does its North pole point towards?",
    options: [
      "Geographic North",
      "Geographic South",
      "Geographic East",
      "Geographic West"
    ],
    correctIndex: 0,
    explanation: "A freely suspended bar magnet always aligns itself along the Earth's North-South magnetic axis. The North-seeking pole points toward Geographic North."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "If you rotate a freely suspended magnet and let it settle, where will it point?",
    options: [
      "Random direction every time",
      "Always along the North-South direction",
      "Always towards the Sun",
      "Always along the East-West direction"
    ],
    correctIndex: 1,
    explanation: "No matter how many times you spin or disturb a freely suspended magnet, it will always come to rest along the exact same North-South line."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "Which ancient device used a freely suspended magnet or magnetic needle to find directions?",
    options: [
      "Sundial",
      "Magnetic Compass",
      "Astrolabe",
      "Telescope"
    ],
    correctIndex: 1,
    explanation: "A magnetic compass contains a light magnetized needle pivoted on a pin that rotates freely to indicate directions."
  }
];

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizData[currentQuestion];

  const handleOptionSelect = (index) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto', padding: '1rem', boxSizing: 'border-box', backgroundColor: 'transparent' }}>
        <div style={{ 
          maxWidth: '520px', 
          width: '90%', 
          padding: '2.5rem 3rem', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          borderRadius: '24px', 
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#064E3B', fontWeight: 900 }}>Quiz Completed! 🎉</h2>
          
          <p style={{ color: '#065F46', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
            You scored <strong style={{ color: '#173B5F' }}>{score}</strong> out of {quizData.length}
          </p>

          <button
            onClick={() => { if (onComplete) onComplete(score); }}
            className="gold-glow-btn"
            style={{
              padding: '0.9rem 2.8rem',
              fontSize: '1.1rem',
              marginTop: '0.6rem',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
            }}
          >
            Finish Activity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '0.75rem 1rem', 
      overflowY: 'auto',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={30} color="#173B5F" />
            <h3 style={{ margin: 0, color: '#064E3B', fontSize: '1.65rem', fontWeight: 900 }}>
              Stage 3: Quiz
            </h3>
          </div>
          <div style={{ color: '#047857', fontSize: '1.18rem', fontWeight: 800 }}>
            Question {currentQuestion + 1} of {quizData.length}
          </div>
        </div>

        {/* Main Quiz Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          border: '1.5px solid #E2E8F0',
          borderRadius: '28px', 
          padding: '2.4rem 3.2rem', 
          boxShadow: '0 10px 35px rgba(217, 119, 6, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Title */}
          <h3 style={{ margin: 0, color: '#064E3B', fontSize: '1.75rem', fontWeight: 900 }}>
            {currentQ.title}
          </h3>

          {/* Question Text Area */}
          <p style={{ margin: 0, fontSize: '1.38rem', lineHeight: 1.6, fontWeight: 700, color: '#065F46' }}>
            {currentQ.question}
          </p>

          {/* Option Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {currentQ.options.map((option, index) => {
              let bgColor = '#FFFFFF';
              let borderColor = '#E2E8F0';
              let textColor = '#064E3B';
              let icon = null;

              if (showResult) {
                if (index === currentQ.correctIndex) {
                  bgColor = '#DCFCE7';
                  borderColor = '#16A34A';
                  textColor = '#064E3B';
                  icon = <CheckCircle size={26} color="#16A34A" />;
                } else if (index === selectedOption) {
                  bgColor = '#FEE2E2';
                  borderColor = '#EF4444';
                  textColor = '#991B1B';
                  icon = <XCircle size={26} color="#EF4444" />;
                }
              } else if (index === selectedOption) {
                borderColor = '#173B5F';
                bgColor = '#EAF2F6';
                textColor = '#173B5F';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showResult}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 1.85rem',
                    borderRadius: '18px',
                    background: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    color: textColor,
                    cursor: showResult ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    opacity: showResult && index !== currentQ.correctIndex && index !== selectedOption ? 0.65 : 1
                  }}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div style={{ marginTop: '0.6rem', animation: 'fadeIn 0.35s ease' }}>
              <div style={{ padding: '1.1rem 1.6rem', background: '#F3F7F9', borderRadius: '18px', borderLeft: '5px solid #173B5F', border: '1.5px solid #E2E8F0', borderLeftWidth: '5px' }}>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.18rem', fontWeight: 900, color: '#064E3B' }}>Explanation</h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 600 }}>{currentQ.explanation}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  onClick={handleNext}
                  className="gold-glow-btn"
                  style={{
                    padding: '0.9rem 2.6rem',
                    borderRadius: '30px',
                    fontSize: '1.2rem'
                  }}
                >
                  {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
