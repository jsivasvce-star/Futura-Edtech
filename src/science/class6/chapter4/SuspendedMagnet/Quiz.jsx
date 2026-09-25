import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

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
    correctAnswer: "Geographic North",
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
    correctAnswer: "Always along the North-South direction",
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
    correctAnswer: "Magnetic Compass",
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

  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQ.correctAnswer) {
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
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto', padding: '1rem', boxSizing: 'border-box', backgroundColor: 'transparent', fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif" }}>
        <div style={{ 
          maxWidth: '560px', 
          width: '90%', 
          padding: '2.8rem 3.2rem', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          borderRadius: '28px', 
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 12px 40px rgba(23, 59, 95, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.45rem'
        }}>
          <h2 style={{ fontSize: '2.2rem', margin: 0, color: '#173B5F', fontWeight: 900 }}>Quiz Completed! 🎉</h2>
          
          <p style={{ color: '#1E293B', margin: 0, fontSize: '1.45rem', fontWeight: 700 }}>
            You scored <strong style={{ color: '#173B5F', fontSize: '1.6rem' }}>{score}</strong> out of {quizData.length}
          </p>

          <button
            onClick={() => { if (onComplete) onComplete(score); }}
            className="gold-glow-btn"
            style={{
              padding: '1rem 3.2rem',
              borderRadius: '32px',
              fontSize: '1.25rem',
              fontWeight: 900,
              cursor: 'pointer',
              marginTop: '0.6rem'
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
      padding: '0.5rem 1rem', 
      boxSizing: 'border-box',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar (Dark Blue Headers) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.5rem', flexShrink: 0 }}>
          <h3 style={{ margin: 0, color: '#173B5F', fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
            Test Your Knowledge
          </h3>
          <div style={{ color: '#173B5F', fontSize: '1.45rem', fontWeight: 800 }}>
            Question {currentQuestion + 1} of {quizData.length}
          </div>
        </div>

        {/* Main Quiz Card */}
        <div className="glass-panel" style={{ 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          border: '1.5px solid #E2E8F0',
          borderRadius: '28px', 
          padding: '2.4rem 3.2rem', 
          boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.35rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Title in Dark Blue */}
          <h3 style={{ margin: 0, color: '#173B5F', fontSize: '1.9rem', fontWeight: 900 }}>
            {currentQ.title}
          </h3>

          {/* Question Text in Dark Blue */}
          <p style={{ margin: 0, fontSize: '1.55rem', lineHeight: '1.55', fontWeight: 700, color: '#173B5F' }}>
            {currentQ.question}
          </p>

          {/* Option Buttons (Dark Blue #0A1931 Background with Crisp White Text) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let bgColor = '#0A1931';
              let borderColor = '#1e293b';
              let textColor = '#FFFFFF';
              let boxShadow = '0 4px 14px rgba(10, 25, 49, 0.25)';
              let icon = null;

              if (showResult) {
                if (isCorrect) {
                  bgColor = 'linear-gradient(135deg, #064E3B 0%, #047857 100%)';
                  borderColor = '#34D399';
                  textColor = '#FFFFFF';
                  boxShadow = '0 0 25px rgba(52, 211, 153, 0.55), 0 4px 14px rgba(6, 78, 59, 0.35)';
                  icon = <CheckCircle size={30} color="#34D399" />;
                } else if (isSelected) {
                  bgColor = 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)';
                  borderColor = '#F87171';
                  textColor = '#FFFFFF';
                  boxShadow = '0 0 25px rgba(248, 113, 113, 0.55), 0 4px 14px rgba(127, 29, 29, 0.35)';
                  icon = <XCircle size={30} color="#F87171" />;
                } else {
                  bgColor = '#0A1931';
                  borderColor = '#1e293b';
                  textColor = '#cbd5e1';
                  boxShadow = 'none';
                }
              } else if (isSelected) {
                borderColor = '#38bdf8';
                bgColor = '#173b5f';
                textColor = '#FFFFFF';
                boxShadow = '0 0 16px rgba(56, 189, 248, 0.35)';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={showResult}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 2rem',
                    borderRadius: '20px',
                    background: bgColor,
                    border: `2.5px solid ${borderColor}`,
                    color: textColor,
                    cursor: showResult ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    transition: 'all 0.25s ease',
                    boxShadow: boxShadow,
                    opacity: showResult && !isCorrect && !isSelected ? 0.55 : 1
                  }}
                >
                  <span>{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Question Button */}
          {showResult && (
            <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.2rem 1.8rem', background: '#F0FDF4', borderRadius: '18px', border: '1.5px solid #A7F3D0', borderLeft: '6px solid #059669' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#064E3B' }}>Explanation</h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.3rem', lineHeight: '1.55', fontWeight: 600 }}>{currentQ.explanation}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNext}
                  className="gold-glow-btn"
                  style={{
                    padding: '1.15rem 3.2rem',
                    borderRadius: '32px',
                    fontSize: '1.3rem',
                    fontWeight: 900,
                    cursor: 'pointer'
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
