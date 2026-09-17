import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const quizData = [
  {
    id: 1,
    title: "Quiz 1",
    question: "What is the main purpose of stroking an iron needle with one pole of a bar magnet repeatedly in the same direction?",
    options: [
      "To clean the needle",
      "To sharpen the needle",
      "To make the needle magnetic",
      "To change the colour of the needle"
    ],
    correctIndex: 2,
    explanation: "Repeated stroking in the same direction transfers magnetic properties to the iron needle, making it a magnet."
  },
  {
    id: 2,
    title: "Quiz 2",
    question: "Why should the bar magnet be lifted after each stroke instead of moving it back over the needle?",
    options: [
      "To avoid scratching the needle",
      "To ensure all strokes are made in the same direction",
      "To cool the magnet",
      "To increase the weight of the needle"
    ],
    correctIndex: 1,
    explanation: "Lifting the magnet after each stroke maintains a single stroking direction, which is necessary to magnetise the needle effectively."
  },
  {
    id: 3,
    title: "Quiz 3",
    question: "How can you confirm that the iron needle has become magnetic?",
    options: [
      "It changes its colour.",
      "It becomes heavier.",
      "It attracts small iron objects such as pins.",
      "It becomes longer."
    ],
    correctIndex: 2,
    explanation: "A magnetised needle attracts iron objects like pins, indicating that it has become magnetic."
  },
  {
    id: 4,
    title: "Quiz 4",
    question: "What happens when the magnetised needle is floated on a cork in water?",
    options: [
      "It sinks immediately.",
      "It remains in a random direction.",
      "It settles in the North–South direction.",
      "It rotates continuously without stopping."
    ],
    correctIndex: 2,
    explanation: "A freely floating magnetised needle aligns itself in the North–South direction due to Earth's magnetic field."
  },
  {
    id: 5,
    title: "Quiz 5",
    question: "What can be concluded if the magnetised needle always points in the same direction after being rotated?",
    options: [
      "The needle has become non-magnetic.",
      "The needle behaves like a freely suspended magnet.",
      "The cork has become magnetic.",
      "The water is magnetic."
    ],
    correctIndex: 1,
    explanation: "A magnetised needle consistently aligns in the North–South direction, just like a freely suspended magnet."
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
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto', padding: '1rem', boxSizing: 'border-box', borderRadius: '24px', border: '1.5px solid #FDE68A', background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)' }}>
        <div style={{ 
          maxWidth: '520px', 
          width: '90%', 
          padding: '2.5rem 3rem', 
          textAlign: 'center', 
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 50%, #FEF3C7 100%)', 
          borderRadius: '24px', 
          border: '1.5px solid #FDE68A',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#064E3B', fontWeight: 900 }}>Quiz Completed! 🎉</h2>
          
          <p style={{ color: '#065F46', margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
            You scored {score} out of {quizData.length}
          </p>

          <button
            onClick={() => { if (onComplete) onComplete(score); }}
            className="gold-glow-btn"
            style={{
              padding: '0.85rem 2.5rem',
              borderRadius: '30px',
              fontSize: '1.05rem',
              fontWeight: 900,
              marginTop: '0.5rem'
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
      padding: '0.85rem 1.25rem', 
      overflowY: 'auto',
      boxSizing: 'border-box',
      borderRadius: '24px',
      border: '1.5px solid #FDE68A',
      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={30} color="#D97706" />
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
          background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 50%, #FEF3C7 100%)', 
          border: '1.5px solid #FDE68A',
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

          {/* Question Text */}
          <p style={{ margin: 0, fontSize: '1.38rem', lineHeight: 1.6, fontWeight: 700, color: '#065F46' }}>
            {currentQ.question}
          </p>

          {/* Option Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {currentQ.options.map((option, index) => {
              let bgColor = '#FFFFFF';
              let borderColor = '#FDE68A';
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
                borderColor = '#D97706';
                bgColor = '#FEF3C7';
                textColor = '#92400E';
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
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    opacity: showResult && index !== currentQ.correctIndex && index !== selectedOption ? 0.6 : 1
                  }}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Question Button */}
          {showResult && (
            <div style={{ marginTop: '0.6rem', animation: 'fadeIn 0.35s ease' }}>
              <div style={{ padding: '1.1rem 1.6rem', background: '#FFFBEB', borderRadius: '18px', borderLeft: '5px solid #D97706', border: '1.5px solid #FDE68A', borderLeftWidth: '5px' }}>
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
                    fontSize: '1.2rem',
                    fontWeight: 900
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
