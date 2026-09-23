import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "Quiz 1",
    question: "What happens when the North pole of a bar magnet is brought close to the North pole of a magnetic compass?",
    options: [
      "The compass needle does not move.",
      "The compass needle moves away from the magnet.",
      "The compass needle points upward.",
      "The compass needle starts spinning continuously."
    ],
    correctAnswer: "The compass needle moves away from the magnet.",
    explanation: "The North pole of the magnet repels the North-seeking end of the compass needle, causing it to move away."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "What happens when the South pole of a bar magnet is brought close to the North pole of a magnetic compass?",
    options: [
      "The compass needle moves away.",
      "The compass needle is attracted towards the magnet.",
      "The compass needle stops moving permanently.",
      "The compass needle points downward."
    ],
    correctAnswer: "The compass needle is attracted towards the magnet.",
    explanation: "Unlike poles attract each other, so the North-seeking end of the compass needle moves towards the South pole of the magnet."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "Why does the compass needle deflect when a bar magnet is brought near it?",
    options: [
      "The magnet changes the colour of the needle.",
      "The magnetic force of the bar magnet acts on the compass needle.",
      "The compass becomes heavier.",
      "Air pushes the compass needle."
    ],
    correctAnswer: "The magnetic force of the bar magnet acts on the compass needle.",
    explanation: "The magnetic field of the bar magnet exerts a force on the magnetic compass needle, causing it to deflect."
  },
  {
    id: 4,
    title: "Quiz 4",
    question: "Which instrument is used in this activity to observe the effect of a nearby magnet?",
    options: [
      "Thermometer",
      "Compass",
      "Spring balance",
      "Measuring cylinder"
    ],
    correctAnswer: "Compass",
    explanation: "A magnetic compass is used to observe how its needle responds when a bar magnet is brought close."
  },
  {
    id: 5,
    title: "Quiz 5",
    question: "What can be concluded from this activity?",
    options: [
      "A nearby magnet can change the direction of a compass needle.",
      "A compass needle is not magnetic.",
      "A magnet attracts every object placed near it.",
      "A compass always points towards a nearby magnet."
    ],
    correctAnswer: "A nearby magnet can change the direction of a compass needle.",
    explanation: "A bar magnet exerts a magnetic force on the compass needle, causing it to deflect from its usual North–South direction."
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
            You scored <strong style={{ color: '#173B5F', fontSize: '1.6rem' }}>{score}</strong> out of {questions.length}
          </p>

          <button
            onClick={() => {
              if (onComplete) onComplete(score);
              if (onNext) onNext();
            }}
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
      padding: '0.5rem 1rem', 
      overflow: 'hidden',
      boxSizing: 'border-box',
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
            Question {currentQuestion + 1} of {questions.length}
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
            {q.title}
          </h3>

          {/* Question Text in Dark Blue */}
          <p style={{ margin: 0, fontSize: '1.55rem', lineHeight: '1.55', fontWeight: 700, color: '#173B5F' }}>
            {q.question}
          </p>

          {/* Option Buttons (Dark Blue #0A1931 Background with Crisp White Text) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {q.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === q.correctAnswer;

              let bgColor = '#0A1931';
              let borderColor = '#1e293b';
              let textColor = '#FFFFFF';
              let icon = null;

              if (showFeedback) {
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
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
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
                    cursor: showFeedback ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(10, 25, 49, 0.25)',
                    opacity: showFeedback && !isCorrect && !isSelected ? 0.55 : 1
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
            <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.2rem 1.8rem', background: '#F0FDF4', borderRadius: '18px', border: '1.5px solid #A7F3D0', borderLeft: '6px solid #059669' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.35rem', fontWeight: 900, color: '#064E3B' }}>Explanation</h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.3rem', lineHeight: '1.55', fontWeight: 600 }}>{q.explanation}</p>
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
