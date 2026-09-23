import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "Quiz 1",
    question: "When the North pole of Magnet A is brought near the North pole of Magnet B, what happens?",
    options: ["They attract each other.", "They repel each other.", "They stick together permanently.", "Nothing happens."],
    correctAnswer: "They repel each other.",
    explanation: "Like poles (North–North or South–South) repel each other."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "Which pair of magnetic poles will attract each other?",
    options: ["North Pole and North Pole", "South Pole and South Pole", "North Pole and South Pole", "Two North Poles of the same magnet"],
    correctAnswer: "North Pole and South Pole",
    explanation: "Unlike poles (North and South) attract each other."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "What property of a magnet helps identify its poles in this activity?",
    options: ["Colour of the magnet", "Shape of the magnet", "Attraction and repulsion between magnets", "Weight of the magnet"],
    correctAnswer: "Attraction and repulsion between magnets",
    explanation: "By observing whether two poles attract or repel, the poles of a magnet can be identified."
  },
  {
    id: 4,
    title: "Quiz 4",
    question: "A student observes that two poles of different magnets push each other away. What can be concluded?",
    options: ["The magnets are not magnetic.", "The poles facing each other are unlike poles.", "The poles facing each other are like poles.", "The magnets have lost their magnetism."],
    correctAnswer: "The poles facing each other are like poles.",
    explanation: "Repulsion occurs only when like poles (North–North or South–South) face each other."
  },
  {
    id: 5,
    title: "Quiz 5",
    question: "Which statement correctly describes the behaviour of magnetic poles?",
    options: ["Like poles attract and unlike poles repel.", "All poles attract each other.", "Like poles repel and unlike poles attract.", "Magnetic poles neither attract nor repel."],
    correctAnswer: "Like poles repel and unlike poles attract.",
    explanation: "The fundamental property of magnets is that like poles repel, while unlike poles attract. This is confirmed through the activity."
  }
];

export default function Stage4_Quiz({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUESTIONS[currentQ];

  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    
    if (option === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto', padding: '1rem', boxSizing: 'border-box', backgroundColor: 'transparent', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
            You scored <strong style={{ color: '#173B5F', fontSize: '1.6rem' }}>{score}</strong> out of {QUESTIONS.length}
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
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar (Dark Blue Headers) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.5rem', flexShrink: 0 }}>
          <h3 style={{ margin: 0, color: '#173B5F', fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
            Test Your Knowledge
          </h3>
          <div style={{ color: '#173B5F', fontSize: '1.45rem', fontWeight: 800 }}>
            Question {currentQ + 1} of {QUESTIONS.length}
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
            {question.title}
          </h3>

          {/* Question Text in Dark Blue */}
          <p style={{ margin: 0, fontSize: '1.55rem', lineHeight: '1.55', fontWeight: 700, color: '#173B5F' }}>
            {question.question}
          </p>

          {/* Option Buttons (Dark Blue #0a1931 Background with Crisp White Text) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === question.correctAnswer;

              let bgColor = '#0a1931';
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
                  bgColor = '#0a1931';
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
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.3rem', lineHeight: '1.55', fontWeight: 600 }}>{question.explanation}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNextQuestion}
                  className="gold-glow-btn"
                  style={{
                    padding: '1.15rem 3.2rem',
                    borderRadius: '32px',
                    fontSize: '1.3rem',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {currentQ === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
