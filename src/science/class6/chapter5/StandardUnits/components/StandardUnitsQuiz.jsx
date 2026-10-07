import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { playMetricSound } from './audioHelper';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does 'SI Units' stand for in science, and what is the standard SI unit of length?",
    options: [
      { id: 'A', text: "Standard Indian units; Centimetre (cm)" },
      { id: 'B', text: "International System of Units; Metre (m)", correct: true },
      { id: 'C', text: "Scientific Instrument units; Millimetre (mm)" },
      { id: 'D', text: "Standard Inch units; Foot (ft)" }
    ],
    explanation: "SI stands for the 'International System of Units' (Système International d'Unités). The official SI base unit of length is the Metre (symbol: m)."
  },
  {
    id: 2,
    question: "On a standard 15-cm geometry scale, what is the smallest length (least count) you can measure?",
    options: [
      { id: 'A', text: "1 centimetre (1 cm)" },
      { id: 'B', text: "1 millimetre (1 mm = 0.1 cm)", correct: true },
      { id: 'C', text: "1 inch (2.54 cm)" },
      { id: 'D', text: "1 decimetre (10 cm)" }
    ],
    explanation: "Each 1 cm section is subdivided into 10 equal divisions called millimetres. Thus, 1 mm (0.1 cm) is the smallest value of length measurable."
  },
  {
    id: 3,
    question: "How many millimetres are in 1 metre?",
    options: [
      { id: 'A', text: "100 mm" },
      { id: 'B', text: "10 mm" },
      { id: 'C', text: "1,000 mm", correct: true },
      { id: 'D', text: "10,000 mm" }
    ],
    explanation: "Since 1 m = 100 cm and 1 cm = 10 mm, 1 m = 100 × 10 = 1,000 mm."
  },
  {
    id: 4,
    question: "Which of the following correct relations connects the traditional 'inch' to standard centimetres?",
    options: [
      { id: 'A', text: "1 inch = 10 cm" },
      { id: 'B', text: "1 inch = 2.54 cm", correct: true },
      { id: 'C', text: "1 inch = 0.1 cm" },
      { id: 'D', text: "1 inch = 100 cm" }
    ],
    explanation: "As highlighted in NCERT 'Do you know?', 1 inch is defined as exactly 2.54 centimetres."
  }
];

export default function StandardUnitsQuiz({ onCompleteQuiz }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optionId) => {
    if (submitted) return;
    playMetricSound('click');
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
    playMetricSound('correct');
    setSubmitted(true);
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const handleReset = () => {
    playMetricSound('click');
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="standard-quiz-component">
      <div className="quiz-header-card">
        <div className="quiz-title-group">
          <HelpCircle size={22} color="#D97706" />
          <h4 className="quiz-card-title">Concept Mastery Check — Standard Units (SI)</h4>
        </div>
        <span className="quiz-status-pill">4 Questions</span>
      </div>

      <div className="quiz-questions-grid">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = submitted && q.options.find(o => o.correct)?.id === selected;

          return (
            <div key={q.id} className="quiz-card-item">
              <div className="q-title-row">
                <span className="q-badge">Q{idx + 1}</span>
                <span className="q-text">{q.question}</span>
              </div>

              <div className="q-options-grid">
                {q.options.map((opt) => {
                  const isOptSelected = selected === opt.id;
                  let optClass = '';
                  if (submitted) {
                    if (opt.correct) optClass = 'correct';
                    else if (isOptSelected) optClass = 'wrong';
                  } else if (isOptSelected) {
                    optClass = 'selected';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      className={`q-opt-btn ${optClass}`}
                    >
                      <span className="opt-letter">{opt.id}</span>
                      <span className="opt-desc">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`q-explanation-bar ${isCorrect ? 'positive' : 'remedial'}`}>
                  <strong>{isCorrect ? '✓ Correct:' : '✗ Note:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="quiz-footer-bar">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="quiz-submit-btn"
          >
            <span>Check Answers ({Object.keys(userAnswers).length}/{QUIZ_QUESTIONS.length})</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="quiz-score-row">
            <div className="score-callout">
              <Award size={20} color="#D97706" />
              <span>Score: <strong>{score} / {QUIZ_QUESTIONS.length}</strong></span>
            </div>
            <button onClick={handleReset} className="quiz-retry-btn">
              <RotateCcw size={15} />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
