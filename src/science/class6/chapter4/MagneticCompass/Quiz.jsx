import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import './MagneticCompass.css';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const quizData = [
  {
    id: 1,
    question: "Which procedure is suitable for magnetising a steel needle by stroking?",
    options: [
      "Stroke with the same pole in one direction, lifting it before returning.",
      "Tap the needle on a wooden table without using a magnet.",
      "Stroke once with the north pole and once with the south pole, repeatedly.",
      "Rub back and forth while changing poles after every stroke."
    ],
    correctIndex: 0, // A
    explanation: "Repeated strokes with the same pole in one direction help magnetise the steel consistently. Lift the magnet for the return journey instead of rubbing backwards along the needle.",
    tryAgain: "Keep both the pole and the direction of the strokes consistent."
  },
  {
    id: 2,
    question: "Why is the magnetised needle placed on a small piece of cork floating in still water?",
    options: [
      "The water magnetises the needle without any previous stroking.",
      "The cork supports the needle and lets it turn with little resistance.",
      "The cork changes the needle’s south pole into a north pole.",
      "The cork keeps the needle fixed in whichever direction it starts."
    ],
    correctIndex: 1, // B
    explanation: "The needle supplies the magnetic behaviour. The floating cork keeps it at the surface and allows it to rotate, so it can respond to Earth’s magnetic field.",
    tryAgain: "Separate the job of the magnetised needle from the job of the floating support."
  },
  {
    id: 3,
    question: "A learner tests whether the stroked needle attracts an iron pin while the strong bar magnet is still beside them. Why should the bar magnet be moved well away first?",
    options: [
      "Moving an iron pin always reverses the strong magnet’s poles.",
      "An iron pin becomes non-magnetic whenever two magnets are near it.",
      "It might attract the pin and make the needle’s result misleading.",
      "A needle cannot attract anything close to another magnet."
    ],
    correctIndex: 2, // C
    explanation: "The test should show whether the needle has become magnetic. A nearby strong magnet could cause the attraction being observed. Moving it away removes that extra influence.",
    tryAgain: "Make sure the attraction you observe is caused by the needle you are testing."
  },
  {
    id: 4,
    question: "The floating cork touches the bowl’s edge and the needle will not turn. What is the best first step?",
    options: [
      "Add another magnet beside the bowl to force the needle to turn.",
      "Keep blowing on the cork until the needle points north.",
      "Glue the cork to the bowl so it cannot move unexpectedly.",
      "Move the cork away from the edge and let the water become still."
    ],
    correctIndex: 3, // D
    explanation: "Contact with the bowl can stop the cork from rotating. Freeing it and waiting for water movement to stop lets the magnetised needle respond without being pushed by the surroundings.",
    tryAgain: "Check whether the compass is free to turn before deciding that the needle is not magnetic."
  },
  {
    id: 5,
    question: "Which result is the strongest evidence that a homemade compass is working?",
    options: [
      "Its needle floats without sinking for a whole minute.",
      "Its maker completed exactly the number of strokes in the instructions.",
      "Its needle points towards the nearest bar magnet on the desk.",
      "After several gentle turns, its free needle settles along the same line as a reference compass kept well away."
    ],
    correctIndex: 3, // D
    explanation: "A working compass should repeatedly align with the local magnetic north–south direction when other magnets are absent. Floating and counting strokes check parts of the procedure, not whether it finds direction.",
    tryAgain: "Test the purpose of the device: finding direction reliably, not just floating or completing steps."
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
            Finish Activity <ArrowRight size={22} color="#FFFFFF" />
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
