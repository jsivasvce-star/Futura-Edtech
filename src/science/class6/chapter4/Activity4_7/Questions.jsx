import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "Quiz 1",
    question: "What is placed between the bar magnet and the compass needle in this activity?",
    options: [
      "An iron sheet",
      "A wooden piece",
      "A steel plate",
      "An aluminium rod"
    ],
    correctAnswer: "A wooden piece",
    explanation: "A wooden piece is placed between the magnet and the compass to observe whether the magnetic effect passes through it."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "Which of the following materials is tested in this activity?",
    options: [
      "Iron",
      "Steel",
      "Plastic",
      "Nickel"
    ],
    correctAnswer: "Plastic",
    explanation: "Plastic is one of the non-magnetic materials tested between the magnet and the compass needle."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "What happens to the compass needle when a cardboard sheet is placed between the magnet and the compass?",
    options: [
      "It stops moving completely.",
      "It still shows deflection.",
      "It points in the opposite direction.",
      "It becomes magnetic."
    ],
    correctAnswer: "It still shows deflection.",
    explanation: "The magnetic effect passes through cardboard, so the compass needle continues to deflect."
  },
  {
    id: 4,
    title: "Quiz 4",
    question: "What can be concluded from this activity?",
    options: [
      "Magnets work only in air.",
      "Magnetic effect cannot pass through any material.",
      "Magnetic effect can pass through non-magnetic materials.",
      "Wood becomes magnetic when placed near a magnet."
    ],
    correctAnswer: "Magnetic effect can pass through non-magnetic materials.",
    explanation: "The activity shows that materials like wood, cardboard, plastic, and glass do not block the magnetic effect."
  },
  {
    id: 5,
    title: "Quiz 5",
    question: "Which observation best supports the conclusion of this activity?",
    options: [
      "The compass needle shows similar deflection even when non-magnetic materials are placed between it and the magnet.",
      "The wooden block sticks to the magnet.",
      "The compass needle changes its colour.",
      "The magnet becomes weaker after the experiment."
    ],
    correctAnswer: "The compass needle shows similar deflection even when non-magnetic materials are placed between it and the magnet.",
    explanation: "The continued deflection of the compass needle shows that the magnetic effect passes through non-magnetic materials such as wood, cardboard, plastic, and glass."
  }
];

export default function Questions({ onComplete, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentQuestion];

  const handleOptionSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === q.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
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
          borderRadius: '30px', 
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#064E3B', fontWeight: 900 }}>Quiz Completed!</h2>
          
          <p style={{ color: '#065F46', margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
            You scored {score} out of {questions.length}
          </p>

          <button
            onClick={() => {
              if (onComplete) onComplete(score);
              if (onNext) onNext();
            }}
            className="gold-glow-btn"
            style={{
              padding: '1rem 3rem',
              borderRadius: '40px',
              fontSize: '1.15rem',
              fontWeight: 900,
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            Proceed to Did You Know?
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
      padding: '0.5rem', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      backgroundColor: 'transparent'
    }}>
      <div style={{ width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.5rem', flexShrink: 0 }}>
          <h3 style={{ margin: 0, color: '#064E3B', fontSize: '1.5rem', fontWeight: 900 }}>Test Your Knowledge</h3>
          <div style={{ color: '#047857', fontSize: '1.25rem', fontWeight: 800 }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Main Quiz Card */}
        <div className="glass-panel" style={{ 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          border: '1.5px solid #E2E8F0',
          borderRadius: '28px', 
          padding: '2.4rem 3.2rem', 
          boxShadow: '0 8px 30px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Title */}
          <h3 style={{ margin: 0, color: '#064E3B', fontSize: '1.75rem', fontWeight: 900 }}>
            {q.title}
          </h3>

          {/* Question Text */}
          <p style={{ fontSize: '1.38rem', margin: 0, lineHeight: '1.6', fontWeight: 600, color: '#064E3B' }}>
            {q.question}
          </p>

          {/* Option Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {q.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === q.correctAnswer;

              let bgColor = '#FFFFFF';
              let borderColor = '#E2E8F0';
              let textColor = '#064E3B';
              let icon = null;

              if (showFeedback) {
                if (isCorrect) {
                  bgColor = '#DCFCE7';
                  borderColor = '#16A34A';
                  textColor = '#065F46';
                  icon = <CheckCircle size={26} color="#16A34A" />;
                } else if (isSelected) {
                  bgColor = '#FEE2E2';
                  borderColor = '#EF4444';
                  textColor = '#991B1B';
                  icon = <XCircle size={26} color="#EF4444" />;
                }
              } else if (isSelected) {
                borderColor = '#173B5F';
                bgColor = '#EAF2F6';
                textColor = '#173B5F';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 1.85rem',
                    borderRadius: '20px',
                    background: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    color: textColor,
                    cursor: showFeedback ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    opacity: showFeedback && !isCorrect && !isSelected ? 0.6 : 1
                  }}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Question Button */}
          {showFeedback && (
            <div style={{ marginTop: '0.6rem', animation: 'fadeIn 0.35s ease' }}>
              <div style={{ padding: '1.1rem 1.6rem', background: '#F0FDF4', borderRadius: '18px', border: '1.5px solid #A7F3D0', borderLeft: '6px solid #173B5F' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.2rem', fontWeight: 900, color: '#064E3B' }}>Explanation</h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.18rem', lineHeight: '1.55', fontWeight: 600 }}>{q.explanation}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  onClick={handleNext}
                  className="gold-glow-btn"
                  style={{
                    padding: '1.1rem 3rem',
                    borderRadius: '32px',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Proceed to Did You Know?' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
