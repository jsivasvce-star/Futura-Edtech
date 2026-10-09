import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, Sparkles, ArrowRight } from 'lucide-react';
import { playSpanSound } from './audioHelper';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is a 'Handspan' (Balisht) accurately defined as in measurement?",
    options: [
      { id: 'A', text: "Distance from the elbow to the tip of the middle finger" },
      { id: 'B', text: "Distance from the tip of the thumb to the tip of the little finger on an outstretched hand", correct: true },
      { id: 'C', text: "Width of all five fingers held together" },
      { id: 'D', text: "Length of the palm only" }
    ],
    explanation: "A handspan (balisht) is the distance from the tip of the thumb to the tip of the little finger when the hand is stretched wide."
  },
  {
    id: 2,
    question: "Why did all five friends (Anish, Padma, Tasneem, Deepa, Hardeep) get different numbers of handspans for the SAME classroom table?",
    options: [
      { id: 'A', text: "The table was changing its length continuously" },
      { id: 'B', text: "Some friends made errors in counting" },
      { id: 'C', text: "Their handspans were of different physical sizes", correct: true },
      { id: 'D', text: "The room temperature caused the table to shrink" }
    ],
    explanation: "Because human bodies differ in size, each child has a unique handspan length. A person with larger hands requires fewer handspans, while a person with smaller hands requires more."
  },
  {
    id: 3,
    question: "When Deepa measures the table as '13 handspans', what does '13' represent and what does 'handspan' represent?",
    options: [
      { id: 'A', text: "13 is the Unit, and Handspan is the Number" },
      { id: 'B', text: "13 is the Number, and Handspan is the selected Unit", correct: true },
      { id: 'C', text: "Both 13 and handspan are units" },
      { id: 'D', text: "Both 13 and handspan are numbers" }
    ],
    explanation: "In science, every physical measurement is expressed in two parts: a NUMBER (magnitude) and a chosen UNIT (e.g. 13 handspans, 2 metres, 50 cm)."
  },
  {
    id: 4,
    question: "Why can body parts like handspan, foot, or arm length NOT be used as universal standard units in trade and science?",
    options: [
      { id: 'A', text: "They are too expensive to use" },
      { id: 'B', text: "They differ from person to person, leading to disagreements and confusion", correct: true },
      { id: 'C', text: "They cannot be seen with naked eyes" },
      { id: 'D', text: "They only work on wooden surfaces" }
    ],
    explanation: "Because body measurements vary widely among people, they cannot provide reproducible, identical values across different individuals."
  }
];

export default function ConceptQuiz({ onCompleteQuiz }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optionId) => {
    if (submitted) return;
    playSpanSound('step');
    setUserAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const correctOpt = q.options.find(o => o.correct);
      if (userAnswers[q.id] === correctOpt.id) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    playSpanSound('success');
    setSubmitted(true);
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const handleReset = () => {
    playSpanSound('switch');
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="concept-quiz-container">
      {/* Quiz Header */}
      <div className="quiz-header-banner">
        <div className="quiz-banner-icon">
          <HelpCircle size={28} color="#D97706" />
        </div>
        <div className="quiz-banner-text">
          <h3 className="quiz-title">Concept Mastery Check (Activity 5.1)</h3>
          <p className="quiz-subtitle">
            Verify your understanding of units, measurements, and why handspans differ.
          </p>
        </div>
      </div>

      {/* Questions List */}
      <div className="quiz-questions-list">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = submitted && q.options.find(o => o.correct)?.id === selected;

          return (
            <div key={q.id} className="quiz-question-card">
              <div className="question-prompt-row">
                <span className="question-number-pill">Q{idx + 1}</span>
                <h4 className="question-text">{q.question}</h4>
              </div>

              <div className="question-options-grid">
                {q.options.map((opt) => {
                  const isOptSelected = selected === opt.id;
                  let optStyleClass = '';

                  if (submitted) {
                    if (opt.correct) optStyleClass = 'correct-opt';
                    else if (isOptSelected) optStyleClass = 'wrong-opt';
                  } else if (isOptSelected) {
                    optStyleClass = 'selected-opt';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      className={`quiz-option-btn ${optStyleClass}`}
                    >
                      <span className="option-letter">{opt.id}</span>
                      <span className="option-text">{opt.text}</span>
                      {submitted && opt.correct && (
                        <CheckCircle2 size={18} color="#059669" className="opt-status-icon" />
                      )}
                      {submitted && isOptSelected && !opt.correct && (
                        <XCircle size={18} color="#DC2626" className="opt-status-icon" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`question-feedback-box ${isCorrect ? 'positive' : 'remedial'}`}>
                  <strong>{isCorrect ? '✓ Correct!' : '✗ Explanation:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Footer & Action Bar */}
      <div className="quiz-actions-footer">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="quiz-submit-cta"
          >
            <span>Submit Answers ({Object.keys(userAnswers).length}/{QUIZ_QUESTIONS.length})</span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <div className="quiz-score-summary-bar">
            <div className="score-badge">
              <Award size={22} color="#D97706" />
              <span>You scored {score} / {QUIZ_QUESTIONS.length}!</span>
            </div>
            <button onClick={handleReset} className="quiz-retry-btn">
              <RotateCcw size={16} />
              <span>Retry Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
