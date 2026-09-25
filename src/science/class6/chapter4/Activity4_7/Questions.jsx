import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import './Activity4_7.css';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const quizData = [
  {
    id: 1,
    question: "A thin plastic sheet is placed between a bar magnet and a compass without changing their positions. The needle still turns. What is the best conclusion?",
    options: [
      "The magnet’s field can act through the plastic sheet.",
      "Plastic completely blocks magnetic effects, so the result is impossible.",
      "The plastic must have become a permanent magnet.",
      "The compass needle must have touched the bar magnet."
    ],
    correctIndex: 0, // A
    explanation: "A magnetic field can pass through thin plastic and influence the compass beyond it. Passing on the effect does not mean that the plastic itself is magnetic.",
    tryAgain: "Distinguish a field acting through a material from the material becoming a magnet."
  },
  {
    id: 2,
    question: "How should you compare the effects of thin glass and cardboard sheets placed between the same magnet and compass?",
    options: [
      "Move the magnet closer whenever the thicker sheet is inserted.",
      "Change the magnet’s pole and the sheet material together.",
      "Keep the magnet and compass fixed at the same gap and orientation.",
      "Hold the compass differently for each sheet and compare the readings."
    ],
    correctIndex: 2, // C
    explanation: "Magnet strength, orientation, compass position and the gap should stay fixed. Otherwise a change in deflection might be caused by the changed setup rather than by the barrier material.",
    tryAgain: "Only the barrier should change. Keep the other causes of needle deflection under control."
  },
  {
    id: 3,
    question: "A student replaces thin cardboard with a thick wooden block and moves the magnet farther from the compass to make room. The needle turns less. What can the student conclude?",
    options: [
      "The compass has been proved to stop working near wood.",
      "Wood has been proved to block every magnetic field completely.",
      "The larger gap may explain the smaller turn; wood has not been shown to block the field.",
      "Cardboard has been proved to be a stronger magnet than wood."
    ],
    correctIndex: 2, // C
    explanation: "Both the barrier and the magnet–compass distance changed. A larger distance can weaken the bar magnet’s influence. A test at a fixed gap is needed to separate these effects.",
    tryAgain: "Two things changed at once. You cannot confidently blame only the wood."
  },
  {
    id: 4,
    question: "At a fixed small gap, a magnet turns a compass needle through clear glass. What is the best prediction for a thin, opaque cardboard sheet?",
    options: [
      "The needle must turn the opposite way because cardboard is opaque.",
      "The needle can still turn because the field does not need a see-through path.",
      "The needle cannot turn because cardboard blocks visible light.",
      "The magnet must touch the compass because cardboard is not metal."
    ],
    correctIndex: 1, // B
    explanation: "Magnetic effects do not depend on whether we can see through the barrier. Thin cardboard, like glass, can allow the field to affect a compass on the other side.",
    tryAgain: "Light passing through a material and a magnetic field acting through it are different ideas."
  },
  {
    id: 5,
    question: "After testing thin glass, plastic, cardboard and wood, a student says, “A magnet can move anything through any wall, no matter how far away.” Which judgement is best?",
    options: [
      "The claim is proved because all four barriers were tested once.",
      "The claim is false because no magnetic effect can cross any solid material.",
      "The claim is proved because magnetic force never becomes weaker with distance.",
      "The claim goes beyond the evidence; the tests involved a compass, four materials and short distances."
    ],
    correctIndex: 3, // D
    explanation: "The results support magnetic effects through the tested barriers under those conditions. They do not show attraction of every object, unlimited range or identical behaviour for every material.",
    tryAgain: "A scientific conclusion should stay within what the observations actually tested."
  }
];

export default function Questions({ onComplete }) {
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
