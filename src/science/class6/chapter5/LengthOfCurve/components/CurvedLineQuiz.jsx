import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { playCurveSound } from './audioHelper';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Why can we NOT directly measure the length of a curved line using a rigid wooden metre scale?",
    options: [
      { id: 'A', text: "The wooden scale is too short" },
      { id: 'B', text: "A rigid straight scale cannot bend along the curve and measures only a straight shortcut", correct: true },
      { id: 'C', text: "Wood changes length in daylight" },
      { id: 'D', text: "Metre scales only measure circular items" }
    ],
    explanation: "A stiff straight scale cannot follow the bends of a curve, leading to large errors."
  },
  {
    id: 2,
    question: "What is the first step when using a thread to measure a curved line (Fig 5.8)?",
    options: [
      { id: 'A', text: "Cut the thread into small pieces" },
      { id: 'B', text: "Tie a knot at one end of the thread to mark the starting point A", correct: true },
      { id: 'C', text: "Soak the thread in water" },
      { id: 'D', text: "Glue the thread onto paper" }
    ],
    explanation: "Tying a knot provides a clear, unmoving reference starting point (Point A) to begin tracing."
  },
  {
    id: 3,
    question: "After tracing a curved line with a thread to the end (Point B), what do you do next?",
    options: [
      { id: 'A', text: "Throw the thread away" },
      { id: 'B', text: "Mark Point B with ink on the thread, straighten it, and measure it on a metre ruler", correct: true },
      { id: 'C', text: "Measure only the straight distance between the ends" },
      { id: 'D', text: "Count the number of handspans" }
    ],
    explanation: "Marking with ink and straightening the thread allows you to read the exact curved distance on a standard scale."
  },
  {
    id: 4,
    question: "Which of the following is also suitable for measuring curved surfaces, like an arch or waistline?",
    options: [
      { id: 'A', text: "A flexible measuring tape (such as a tailor's tape)", correct: true },
      { id: 'B', text: "A heavy steel rod" },
      { id: 'C', text: "A plastic triangular set-square" },
      { id: 'D', text: "A straight wooden stick" }
    ],
    explanation: "Flexible measuring tapes bend easily around arches, contours, and curved surfaces without needing thread transfer."
  }
];

export default function CurvedLineQuiz({ onCompleteQuiz }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optId) => {
    if (submitted) return;
    playCurveSound('click');
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
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
    playCurveSound('success');
    setSubmitted(true);
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const handleReset = () => {
    playCurveSound('click');
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="curved-quiz-container">
      <div className="quiz-header-card">
        <div className="quiz-title-line">
          <HelpCircle size={20} color="#D97706" />
          <h4 className="quiz-heading">Quick Check: Measuring Curved Lines</h4>
        </div>
        <span className="quiz-badge">4 Questions</span>
      </div>

      <div className="quiz-cards-grid">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = submitted && q.options.find(o => o.correct)?.id === selected;

          return (
            <div key={q.id} className="quiz-card-box">
              <div className="card-q-title">
                <span className="q-index">Q{idx + 1}</span>
                <span className="q-prompt">{q.question}</span>
              </div>

              <div className="card-options-col">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id;
                  let optClass = '';
                  if (submitted) {
                    if (opt.correct) optClass = 'correct';
                    else if (isSelected) optClass = 'wrong';
                  } else if (isSelected) {
                    optClass = 'selected';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      className={`card-opt-btn ${optClass}`}
                    >
                      <span className="opt-letter">{opt.id}</span>
                      <span className="opt-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`card-feedback-bar ${isCorrect ? 'positive' : 'remedial'}`}>
                  <strong>{isCorrect ? '✓ Correct:' : '✗ Note:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="quiz-bottom-actions">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="quiz-submit-cta"
          >
            <span>Check Answers ({Object.keys(userAnswers).length}/{QUIZ_QUESTIONS.length})</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="quiz-score-row">
            <div className="score-badge">
              <Award size={20} color="#D97706" />
              <span>Score: <strong>{score} / {QUIZ_QUESTIONS.length}</strong></span>
            </div>
            <button onClick={handleReset} className="retry-btn">
              <RotateCcw size={15} />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
