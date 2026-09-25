import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import './MagneticPoles.css';

const quizData = [
  {
    id: 1,
    title: "Quiz 1",
    question: "Where do most iron filings stick on a bar magnet?",
    options: [
      "At the centre",
      "At the poles (ends)",
      "Only on one side",
      "Nowhere"
    ],
    correctAnswer: "At the poles (ends)",
    explanation: "Most iron filings collect at the two ends of a bar magnet, which are called the magnetic poles."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "What do iron filings help us observe about a magnet?",
    options: [
      "The colour of the magnet",
      "The magnetic effect and field lines around the magnet",
      "The weight of the magnet",
      "The temperature of the magnet"
    ],
    correctAnswer: "The magnetic effect and field lines around the magnet",
    explanation: "Iron filings align along the magnetic field lines and show where the magnetic attraction is strongest."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "Which part of a bar magnet attracts the maximum number of iron filings?",
    options: [
      "Middle region",
      "Magnetic Poles (both ends)",
      "Top flat surface only",
      "Entire magnet equally"
    ],
    correctAnswer: "Magnetic Poles (both ends)",
    explanation: "The magnetic pull is concentrated and strongest at the poles, attracting the highest density of filings."
  },
  {
    id: 4,
    title: "Quiz 4",
    question: "Can an isolated single magnetic pole (monopole) exist by itself?",
    options: [
      "Yes, only North Pole",
      "Yes, only South Pole",
      "No, every magnet always has both North and South poles",
      "Only broken magnets have one pole"
    ],
    correctAnswer: "No, every magnet always has both North and South poles",
    explanation: "A magnet always has both a North and a South pole. Magnetic monopoles do not exist in nature."
  },
  {
    id: 5,
    title: "Quiz 5",
    question: "If a bar magnet is broken into two pieces, what will each broken piece become?",
    options: [
      "One piece with North pole, one with South pole",
      "Two complete new magnets, each having North and South poles",
      "Pieces with no magnetic poles",
      "Pieces with only North poles"
    ],
    correctAnswer: "Two complete new magnets, each having North and South poles",
    explanation: "When a magnet is broken in half, each piece automatically develops its own pair of North and South poles."
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
              let icon = null;

              if (showResult) {
                if (isCorrect) {
                  bgColor = '#064e3b';
                  borderColor = '#34d399';
                  textColor = '#FFFFFF';
                  icon = <CheckCircle size={28} color="#34d399" />;
                } else if (isSelected) {
                  bgColor = '#7f1d1d';
                  borderColor = '#f87171';
                  textColor = '#FFFFFF';
                  icon = <XCircle size={28} color="#f87171" />;
                } else {
                  bgColor = '#0A1931';
                  borderColor = '#1e293b';
                  textColor = '#cbd5e1';
                }
              } else if (isSelected) {
                borderColor = '#38bdf8';
                bgColor = '#173b5f';
                textColor = '#FFFFFF';
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
                    border: `2px solid ${borderColor}`,
                    color: textColor,
                    cursor: showResult ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(10, 25, 49, 0.25)',
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
