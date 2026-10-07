import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { playPositionSound } from './audioHelper';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is a 'Reference Point' in science?",
    options: [
      { id: 'A', text: "A moving vehicle on the road" },
      { id: 'B', text: "A fixed object or point with respect to which distance and position are stated", correct: true },
      { id: 'C', text: "A broken wooden scale" },
      { id: 'D', text: "The length of a person's handspan" }
    ],
    explanation: "A reference point is a fixed location (like the Bus Stand or Delhi) used to describe the exact position or distance of an object."
  },
  {
    id: 2,
    question: "Why did Deepa and her friends give different answers about whether the school or garden was closer?",
    options: [
      { id: 'A', text: "The school was moving every day" },
      { id: 'B', text: "Each friend was measuring the distance starting from their OWN house (different reference points)", correct: true },
      { id: 'C', text: "Some friends made errors in math" },
      { id: 'D', text: "The garden was hidden behind trees" }
    ],
    explanation: "All of them were correct because each child used their own house as a different reference point!"
  },
  {
    id: 3,
    question: "When Padma sees a highway milestone reading 'Delhi 60 km', what does it tell her?",
    options: [
      { id: 'A', text: "Delhi is 60 years old" },
      { id: 'B', text: "Her current position is 60 km away from the fixed reference point (Delhi)", correct: true },
      { id: 'C', text: "The bus speed is 60 km per minute" },
      { id: 'D', text: "The bus has 60 seats" }
    ],
    explanation: "Milestones indicate the remaining distance to the reference destination city (Delhi)."
  },
  {
    id: 4,
    question: "When is an object scientifically said to be in 'Motion'?",
    options: [
      { id: 'A', text: "When it stays completely stationary" },
      { id: 'B', text: "When its position changes with time with respect to a reference point", correct: true },
      { id: 'C', text: "When it has a bright color" },
      { id: 'D', text: "When it is made of limestone powder" }
    ],
    explanation: "Motion is defined as the change in position of an object over time relative to a chosen reference point."
  }
];

export default function DescribingPositionQuiz({ onCompleteQuiz }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optId) => {
    if (submitted) return;
    playPositionSound('click');
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
    playPositionSound('success');
    setSubmitted(true);
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const handleReset = () => {
    playPositionSound('click');
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="position-quiz-component">
      <div className="quiz-header-card">
        <div className="quiz-title-line">
          <HelpCircle size={20} color="#D97706" />
          <h4 className="quiz-heading">Quick Check: Reference Points & Motion</h4>
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
