import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import './Activity4_1.css';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const quizData = [
  {
    id: 1,
    question: "A steel paper clip is attracted to a magnet, but a plastic ruler is not. Which difference best explains the results?",
    options: [
      "The different colours of the two objects.",
      "The materials from which the objects are made.",
      "The different lengths of the two objects.",
      "The order in which the objects were tested."
    ],
    correctIndex: 1, // B
    explanation: "Steel containing iron is usually attracted to a classroom magnet. Plastic is not noticeably attracted. An object’s colour or length does not decide whether its material is magnetic.",
    tryAgain: "Think about what each object is made of, rather than how it looks."
  },
  {
    id: 2,
    question: "Only the steel clip on a plastic pen is attracted to a magnet. What should you record?",
    options: [
      "The steel clip is magnetic; the plastic body is non-magnetic.",
      "The plastic body becomes magnetic whenever the clip touches it.",
      "The pen is non-magnetic because most of it is plastic.",
      "Every part of the pen is magnetic because one part moves."
    ],
    correctIndex: 0, // A
    explanation: "One object can contain several materials. The magnet pulls the steel clip and may move the whole pen, but that does not make the plastic body magnetic.",
    tryAgain: "Test and describe the parts separately. Movement of the whole object can be caused by just one part."
  },
  {
    id: 3,
    question: "A student says, “This shiny coin must be magnetic because it is metal.” What is the best response?",
    options: [
      "Accept the claim because all shiny metals are magnetic.",
      "Decide by comparing the coin’s colour with the magnet.",
      "Reject the claim because round objects cannot be magnetic.",
      "Test that coin with a magnet; not all metals are attracted."
    ],
    correctIndex: 3, // D
    explanation: "Iron and many steels are attracted strongly, but metals such as copper and aluminium are not noticeably attracted to a classroom magnet. Coins can have different compositions, so test the actual sample.",
    tryAgain: "Metal and magnetic do not mean the same thing. A direct test gives better evidence than shininess."
  },
  {
    id: 4,
    question: "You want to compare whether a paper clip, an eraser and a wooden pencil are attracted to a magnet. Which plan gives the fairest comparison?",
    options: [
      "Use a different magnet and a different gap for each object.",
      "Shake each object near the magnet and record any movement.",
      "Use the same magnet at the same small gap for each object.",
      "Touch only the paper clip and test the others from far away."
    ],
    correctIndex: 2, // C
    explanation: "The magnet and distance should stay the same so that the material is the main difference. Objects should be free to move, and doubtful results should be checked again.",
    tryAgain: "Change the object being tested while keeping the testing conditions the same."
  },
  {
    id: 5,
    question: "A magnet does not attract one metal water bottle in your test. Which conclusion is justified?",
    options: [
      "This bottle was not noticeably attracted under these test conditions.",
      "The bottle cannot be metal because it was not attracted.",
      "The magnet has stopped working because the bottle stayed still.",
      "No metal water bottle can ever be attracted to a magnet."
    ],
    correctIndex: 0, // A
    explanation: "The observation applies to the tested bottle. Bottles can be made from aluminium or different types of stainless steel, which do not all respond alike. Check the magnet with a known steel clip if needed.",
    tryAgain: "One sample cannot tell you how every bottle behaves. Record what your test actually shows."
  }
];

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]); // array of chosen indices
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
      // Check if all wrong options have now been tried
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
                // In progress: incorrect choices are disabled, unselected are active
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
