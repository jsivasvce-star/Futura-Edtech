import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import './FunWithMagnets.css';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const quizData = [
  {
    id: 1,
    question: "In a guided model that uses magnetic repulsion to lift a train, the lower face of the train’s magnet is N. Which pole should face it from below?",
    options: [
      "S, because opposite poles always push apart.",
      "Either N or S, because the pole arrangement does not matter.",
      "An unmagnetised iron block, because attraction pushes the train upward.",
      "N, so the facing like poles repel."
    ],
    correctIndex: 3, // D
    explanation: "N facing N produces repulsion and can supply an upward force in this guided model. Real maglev systems use engineered arrangements; some use attraction and others use combinations of magnetic forces.",
    tryAgain: "This model specifies repulsion. Choose like facing poles and remember that guidance is also needed."
  },
  {
    id: 2,
    question: "A maglev model is held above its track but does not move forward. Which explanation is best?",
    options: [
      "A magnetic force can act vertically but never horizontally.",
      "A floating object has no weight and therefore cannot move.",
      "An upward supporting force does not automatically provide a forward driving force.",
      "If levitation works, the model must move forward without another cause."
    ],
    correctIndex: 2, // C
    explanation: "Levitation supports the train against its weight. Propulsion provides force along the track. Maglev trains use controlled magnetic interactions for forward motion as well as systems for support and guidance.",
    tryAgain: "Compare the direction of the force needed to lift the train with the direction needed to drive it."
  },
  {
    id: 3,
    question: "Why are electromagnets useful for controlling a train’s magnetic propulsion?",
    options: [
      "They produce a magnetic effect without any electric current or stored magnetism.",
      "Their magnetic effect can be controlled by changing the electric current.",
      "They can attract other magnets but can never repel them.",
      "Their poles cannot be changed once the coil is built."
    ],
    correctIndex: 1, // B
    explanation: "Current through a coil creates a magnetic field. Controlling the current allows the magnetic effect to be varied, and changing its direction reverses the poles. This makes timed magnetic interactions possible.",
    tryAgain: "Connect the electromagnet’s behaviour to its electric current and the poles that current creates."
  },
  {
    id: 4,
    question: "A coil’s left end acts as N and its right end as S. The current direction is reversed without turning the coil. What happens?",
    options: [
      "The left end becomes S and the right end becomes N.",
      "The left end remains N and the right end remains S.",
      "Both ends become N because the current is reversed.",
      "Both ends become S because the current is reversed."
    ],
    correctIndex: 0, // A
    explanation: "Reversing current reverses the magnetic field of the coil, so its north and south ends exchange roles. Physically rotating the coil is not necessary to change its polarity.",
    tryAgain: "A current reversal changes the direction of the field; it does not create two north poles."
  },
  {
    id: 5,
    question: "A learner says, “A levitating train never needs energy to keep moving because its wheels do not touch the track.” Which response is best?",
    options: [
      "The claim is correct because air cannot exert a force on a floating train.",
      "The claim is correct because levitation removes both weight and resistance.",
      "The claim is wrong only because every maglev train must always roll on wheels.",
      "Wheel–track contact is avoided while levitating, but air resistance and other energy losses remain."
    ],
    correctIndex: 3, // D
    explanation: "Levitation avoids wheel–rail contact during that part of operation, but a moving train still pushes through air. Energy is also needed by its systems. Avoiding one source of resistance does not remove all losses.",
    tryAgain: "Ask whether removing wheel contact also removes the air around the moving train."
  }
];

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizData[currentQuestion];
  const isQuestionResolved = isCorrect || isExhausted;

  const handleOptionSelect = (index) => {
    if (isQuestionResolved || selectedIndices.includes(index)) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (index === currentQ.correctIndex) {
      setIsCorrect(true);
      if (newSelected.length === 1) {
        setScore(prev => prev + 1);
      }
    } else {
      const wrongCount = currentQ.options.length - 1;
      const wrongSelected = newSelected.filter(i => i !== currentQ.correctIndex).length;
      if (wrongSelected >= wrongCount) {
        setIsExhausted(true);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedIndices([]);
      setIsCorrect(false);
      setIsExhausted(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflowY: 'auto', 
        padding: '1rem', 
        boxSizing: 'border-box', 
        backgroundColor: 'transparent',
        fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
      }}>
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
          <h2 style={{ fontSize: '2.2rem', margin: 0, color: '#173B5F', fontWeight: 900 }}>
            Quiz Completed! 🎉
          </h2>
          
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
            Continue to Did You Know <ArrowRight size={22} color="#FFFFFF" />
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
      <div style={{ width: '100%', maxWidth: '1180px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Main Quiz Card */}
        <div className="glass-panel" style={{ 
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
          border: '1.5px solid #E2E8F0', 
          borderRadius: '28px', 
          padding: '2.2rem 3rem', 
          boxShadow: '0 8px 30px rgba(23, 59, 95, 0.08)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}>
          {/* Question Badge inside the quiz container */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <span style={{
              background: '#ECFDF5',
              padding: '0.4rem 1.2rem',
              borderRadius: '16px',
              border: '1.5px solid #A7F3D0',
              color: '#065F46',
              fontWeight: 900,
              fontSize: '1.15rem',
              boxShadow: '0 2px 6px rgba(6, 95, 70, 0.08)'
            }}>
              Question {currentQuestion + 1} of {quizData.length}
            </span>
          </div>

          {/* Question Text */}
          <p style={{ margin: 0, fontSize: '1.45rem', lineHeight: '1.5', fontWeight: 800, color: '#173B5F' }}>
            {currentQ.question}
          </p>

          {/* Option Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((opt, index) => {
              const isSelected = selectedIndices.includes(index);
              const isOptionCorrect = index === currentQ.correctIndex;

              let bgColor = '#0A1931';
              let borderColor = '#1e293b';
              let textColor = '#FFFFFF';
              let boxShadow = '0 4px 14px rgba(10, 25, 49, 0.25)';
              let icon = null;
              let isDisabled = false;

              if (isQuestionResolved) {
                if (isOptionCorrect) {
                  bgColor = 'linear-gradient(135deg, #064E3B 0%, #047857 100%)';
                  borderColor = '#34D399';
                  textColor = '#FFFFFF';
                  boxShadow = '0 0 25px rgba(52, 211, 153, 0.55), 0 4px 14px rgba(6, 78, 59, 0.35)';
                  icon = <CheckCircle size={28} color="#34D399" />;
                } else if (isSelected) {
                  bgColor = 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)';
                  borderColor = '#F87171';
                  textColor = '#FFFFFF';
                  boxShadow = '0 0 25px rgba(248, 113, 113, 0.55), 0 4px 14px rgba(127, 29, 29, 0.35)';
                  icon = <XCircle size={28} color="#F87171" />;
                } else {
                  bgColor = '#0A1931';
                  borderColor = '#1e293b';
                  textColor = '#cbd5e1';
                  boxShadow = 'none';
                }
                isDisabled = true;
              } else {
                if (isSelected) {
                  bgColor = 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)';
                  borderColor = '#F87171';
                  textColor = '#FFFFFF';
                  boxShadow = '0 0 20px rgba(248, 113, 113, 0.45)';
                  icon = <XCircle size={28} color="#F87171" />;
                  isDisabled = true;
                } else {
                  bgColor = '#0A1931';
                  borderColor = '#1e293b';
                  textColor = '#FFFFFF';
                  boxShadow = '0 4px 14px rgba(10, 25, 49, 0.25)';
                  isDisabled = false;
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isDisabled}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.15rem 1.8rem',
                    borderRadius: '20px',
                    background: bgColor,
                    border: `2.5px solid ${borderColor}`,
                    color: textColor,
                    cursor: isDisabled ? 'default' : 'pointer',
                    textAlign: 'left',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    transition: 'all 0.25s ease',
                    boxShadow: boxShadow,
                    opacity: isQuestionResolved && !isOptionCorrect && !isSelected ? 0.55 : 1
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ 
                      fontWeight: 900, 
                      color: isOptionCorrect && isQuestionResolved ? '#6EE7B7' : isSelected ? '#FCA5A5' : '#93C5FD' 
                    }}>
                      {OPTION_PREFIXES[index]}.
                    </span>
                    <span>{opt}</span>
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Feedback & Action Banners */}
          {isQuestionResolved ? (
            <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ 
                padding: '1.15rem 1.65rem', 
                background: '#F0FDF4', 
                borderRadius: '18px', 
                border: '1.5px solid #A7F3D0', 
                borderLeft: '6px solid #059669',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.08)'
              }}>
                <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#064E3B' }}>
                  {isCorrect ? "Explanation (Correct)" : "Explanation"}
                </h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.18rem', lineHeight: '1.5', fontWeight: 600 }}>
                  {currentQ.explanation}
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                <button
                  onClick={handleNext}
                  className="gold-glow-btn"
                  style={{
                    padding: '0.95rem 2.8rem',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={22} color="#FFFFFF" />
                </button>
              </div>
            </div>
          ) : selectedIndices.length > 0 ? (
            <div style={{ 
              marginTop: '0.4rem', 
              padding: '1.15rem 1.65rem', 
              background: '#FEF2F2', 
              borderRadius: '18px', 
              border: '1.5px solid #FECACA', 
              borderLeft: '6px solid #DC2626',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.08)'
            }}>
              <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#991B1B' }}>
                Try Again
              </h4>
              <p style={{ margin: 0, color: '#B91C1C', fontSize: '1.18rem', lineHeight: '1.5', fontWeight: 600 }}>
                {currentQ.tryAgain}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
