import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const quizData = [
  {
    id: 1,
    question: "Two magnetic airplane models can move freely along a level track. Their north poles face each other. What do you predict when they are brought close?",
    options: [
      "They tend to move apart because like poles repel.",
      "They lose their magnetism because both poles are north.",
      "They interact only after the two north poles touch.",
      "They tend to move together because like poles attract."
    ],
    correctIndex: 0, // A
    explanation: "Like poles repel, so each model experiences a force away from the other. The track guides the models; this demonstration does not explain how real airplanes fly.",
    tryAgain: "Identify the two facing poles first. N facing N is a like-pole pair."
  },
  {
    id: 2,
    question: "Two model magnets attract with N facing S. Only one magnet is turned end for end, while the gap stays the same. What should happen?",
    options: [
      "They stop interacting because one magnet was turned.",
      "They still attract because the distance has not changed.",
      "They repel because the facing poles are now alike.",
      "They attract more strongly because only one magnet was turned."
    ],
    correctIndex: 2, // C
    explanation: "Turning one magnet exchanges the pole that faces the other. N–S becomes either N–N or S–S, so attraction changes to repulsion even though the gap is unchanged.",
    tryAgain: "Distance matters, but polarity matters too. Work out the new pair of facing poles."
  },
  {
    id: 3,
    question: "Two model magnets repel with N facing N. Both magnets are turned end for end without changing their positions. What is the interaction now?",
    options: [
      "Attraction, because a south pole attracts every other pole.",
      "No force, because turning both magnets cancels their magnetism.",
      "Attraction, because turning any magnet always causes attraction.",
      "Repulsion, because S now faces S."
    ],
    correctIndex: 3, // D
    explanation: "Both north-facing ends become south-facing ends. S–S is still a like-pole pair, so the interaction remains repulsive. Turning both magnets differs from turning just one.",
    tryAgain: "Track both changes, not just the first one. The new facing poles are still the same as each other."
  },
  {
    id: 4,
    question: "On a still, level track, one magnetic model begins moving as another magnet approaches, before they touch. What does this observation support?",
    options: [
      "Magnetic force begins only after direct contact.",
      "A magnetic force can act across a gap.",
      "The moving model is no longer affected by gravity.",
      "All objects on the track must be permanent magnets."
    ],
    correctIndex: 1, // B
    explanation: "The model responds before contact, showing that magnetic force can act at a distance. This does not mean gravity has disappeared or that every object nearby is a magnet.",
    tryAgain: "Focus on what the timing shows: the movement began while a gap was still present."
  },
  {
    id: 5,
    question: "A hidden object inside a model attracts the north pole of a known magnet. Which further result would show that the hidden object is itself a magnet, rather than just unmagnetised iron?",
    options: [
      "One end of the hidden object repels one pole of the known magnet.",
      "The hidden object is heavier than the known magnet.",
      "The hidden object is attracted when the magnet comes closer.",
      "The hidden object has a shiny metallic surface."
    ],
    correctIndex: 0, // A
    explanation: "Unmagnetised iron can be attracted by either pole through induced magnetism. Repulsion with a known magnet is stronger evidence of an existing magnetic pole on the hidden object.",
    tryAgain: "Attraction alone is not enough: ordinary iron can be attracted too. Look for repulsion."
  }
];

export default function Stage4_Quiz({ onComplete }) {
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
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#064E3B' }}>
                  {isCorrect ? "Explanation (Correct)" : "Explanation"}
                </h4>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.35rem', lineHeight: '1.55', fontWeight: 750 }}>
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
                    fontSize: '1.25rem',
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
              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.45rem', fontWeight: 900, color: '#991B1B' }}>
                Try Again
              </h4>
              <p style={{ margin: 0, color: '#B91C1C', fontSize: '1.35rem', lineHeight: '1.55', fontWeight: 750 }}>
                {currentQ.tryAgain}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
