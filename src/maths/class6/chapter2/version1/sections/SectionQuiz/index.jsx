/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './quiz.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Which of the following geometric figures has two fixed endpoints and a definite length that can be measured?',
    options: [
      'Line',
      'Line Segment',
      'Ray',
      'Angle'
    ],
    correctIndex: 1,
    explanation: 'A line segment has two distinct endpoints (e.g., AB) and a fixed length that can be measured using a ruler.'
  },
  {
    id: 2,
    question: 'What is an angle called whose measure is exactly equal to 90°?',
    options: [
      'Acute Angle',
      'Obtuse Angle',
      'Right Angle',
      'Straight Angle'
    ],
    correctIndex: 2,
    explanation: 'An angle measuring exactly 90° forms a square corner and is called a Right Angle.'
  },
  {
    id: 3,
    question: 'How many fixed endpoints does a Ray have?',
    options: [
      'Zero endpoints',
      'Exactly one endpoint',
      'Exactly two endpoints',
      'Infinite endpoints'
    ],
    correctIndex: 1,
    explanation: 'A ray has exactly one starting point (endpoint) and extends infinitely in one direction.'
  },
  {
    id: 4,
    question: 'An angle whose measure is greater than 0° but strictly less than 90° is classified as an:',
    options: [
      'Acute Angle',
      'Obtuse Angle',
      'Straight Angle',
      'Reflex Angle'
    ],
    correctIndex: 0,
    explanation: 'An acute angle is smaller than a right angle, with a measure between 0° and 90°.'
  }
];

export default function SectionQuiz({ onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // fallback
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="ch2-quiz-page-root" id="ch2-section-quiz">
      {/* Top Header */}
      <header className="ch2-v1-section-topbar">
        <div className="ch2-v1-section-topbar-left">
          <button
            onClick={onBack}
            className="ch2-top-back-btn"
            style={{ position: 'static' }}
            title="Back to Chapter Flow"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="ch2-v1-section-title-wrap">
            <span className="ch2-v1-section-badge">CHAPTER 2 · LINES AND ANGLES</span>
            <h2 className="ch2-v1-section-name">Chapter 2 — Final Quiz</h2>
          </div>
        </div>
      </header>

      {/* Main Quiz Area */}
      <main className="ch2-quiz-body-wrap">
        {!isCompleted ? (
          <div className="ch2-quiz-card-box">
            {/* Progress Bar & Header */}
            <div className="ch2-quiz-card-header">
              <div className="ch2-quiz-stepper">
                <span className="ch2-quiz-step-label">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <div className="ch2-quiz-step-dots">
                  {QUIZ_QUESTIONS.map((q, i) => (
                    <span 
                      key={q.id} 
                      className={`ch2-quiz-dot ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'done' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="ch2-quiz-live-score">
                Score: <strong>{score}</strong>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="ch2-quiz-question-heading">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="ch2-quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optClass = 'ch2-quiz-opt-btn';

                if (isAnswered) {
                  if (isCorrect) optClass += ' opt-correct';
                  else if (isSelected) optClass += ' opt-wrong';
                }

                return (
                  <button
                    key={idx}
                    className={optClass}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                  >
                    <span className="ch2-opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="ch2-opt-text">{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} className="ch2-opt-icon check" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} className="ch2-opt-icon cross" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback */}
            {isAnswered && (
              <div className={`ch2-quiz-expl-box ${selectedOption === currentQ.correctIndex ? 'expl-correct' : 'expl-wrong'}`}>
                <strong>{selectedOption === currentQ.correctIndex ? '🎉 Excellent! ' : '💡 Concept Reminder: '}</strong>
                <span>{currentQ.explanation}</span>
              </div>
            )}

            {/* Action Row */}
            {isAnswered && (
              <div className="ch2-quiz-action-bar">
                <button className="ch2-quiz-primary-btn" onClick={handleNextQuestion}>
                  <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'View Results 🏆'}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Card */
          <div className="ch2-quiz-card-box ch2-quiz-summary-card">
            <div className="ch2-quiz-trophy-wrap">
              <Trophy size={54} className="ch2-trophy-icon" />
              <Sparkles size={24} className="ch2-sparkle-icon" />
            </div>

            <h2 className="ch2-summary-title">Quiz Completed!</h2>
            <p className="ch2-summary-subtitle">You have completed the Chapter 2 Lines and Angles Review Quiz.</p>

            <div className="ch2-score-banner">
              <span className="ch2-score-num">{score}</span>
              <span className="ch2-score-denom">/ {QUIZ_QUESTIONS.length}</span>
              <span className="ch2-score-verdict">
                {score === QUIZ_QUESTIONS.length ? '🌟 Perfect Score! Geometry Master!' : score >= 3 ? '👏 Great job!' : 'Keep practicing, you are getting there!'}
              </span>
            </div>

            <div className="ch2-summary-actions">
              <button className="ch2-quiz-secondary-btn" onClick={handleRestart}>
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
              <button className="ch2-quiz-primary-btn" onClick={onBack}>
                <span>Return to Chapter Flow</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
